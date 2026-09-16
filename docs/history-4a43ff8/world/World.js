// The 3D map world (build 17, HANDOFF §24): a procedural 120 x 120 m stylised low-poly map around the "home" table at the
// origin. Terrain heightfield (64 x 64, value noise, flat at home / town / river banks, ring of hills at the edge), a loop
// road with two straight roads through it (three bridges over the river), a town block of window-textured boxes, a park
// with instanced trees and lamp posts, a tower and two statue pedestals, a sky dome, fog and a sun whose shadow camera
// follows the player. Everything is generated at load (no downloads) and merged: one draw call per material
// (terrain, roads, walls, flat-coloured props, trees, lamps, water, sky = 8 draw calls, ~40 k triangles).
// Physics: a Rapier heightfield collider for the terrain and one static cuboid per building / tower / pedestal.
// Navigation: heightAt(x, z) gives the ground under the player; clampMove(from, to) keeps the player out of buildings,
// trees, the tower, deep water and off the map edge (slide along the obstacle, never through it).
import * as THREE from "three";

const SIZE = 120, N = 64, CELL = SIZE / N, HALF = SIZE / 2;
const PLAYER_R = 0.45;                       // player radius for the building/tree clamp
const WATER_DEPTH = 1.1, WADE = 0.35;        // water surface below the bank; how deep the player may wade
const LOOP = 40, CORNER = 10, ROAD_W = 6;    // loop road half-size, corner radius, road width
const ROAD_A_Z = 8, ROAD_B_X = -14;          // the two straight roads (A along x, B along z)
const PLAZA_R = 8;                           // paved disc around the home table
const TOWN = { x0: -36, x1: 36, z0: 18, z1: 38 };   // flat town block north of road A (starts 18 m from home so the start is not walled in)
const PARK = { x0: -34, x1: -18, z0: -13, z1: 3 };  // the park west of the plaza

// --- deterministic noise / random -----------------------------------------------------------------------------------
function hash(i, j) { let h = Math.imul(i, 374761393) + Math.imul(j, 668265263) ^ 0x5bd1e995; h = Math.imul(h ^ (h >>> 13), 1274126177); h ^= h >>> 16; return (h >>> 0) / 4294967296; }
function vnoise(x, z) {   // value noise in [-1, 1], smooth
  const i = Math.floor(x), j = Math.floor(z), fx = x - i, fz = z - j, sx = fx * fx * (3 - 2 * fx), sz = fz * fz * (3 - 2 * fz);
  const a = hash(i, j), b = hash(i + 1, j), c = hash(i, j + 1), d = hash(i + 1, j + 1);
  return (a + (b - a) * sx + (c - a) * sz + (a - b - c + d) * sx * sz) * 2 - 1;
}
function rng(seed) { let s = seed >>> 0; return () => { s += 0x6D2B79F5; let t = Math.imul(s ^ (s >>> 15), 1 | s); t = t + Math.imul(t ^ (t >>> 7), 61 | t) ^ t; return ((t ^ (t >>> 14)) >>> 0) / 4294967296; }; }
const smooth = (a, b, x) => { const t = Math.min(1, Math.max(0, (x - a) / (b - a))); return t * t * (3 - 2 * t); };

// --- the height functions (metres above FLOOR_Y) --------------------------------------------------------------------
const riverZ = x => -22 + 3 * Math.sin(x / 17 + 0.5);            // river centreline
const riverD = (x, z) => Math.abs(z - riverZ(x));
function hBase(x, z) {                                             // rolling ground, flat where things stand, hills at the rim
  let n = 2.4 * vnoise(x / 48 + 7.3, z / 48 + 2.1) + 0.9 * vnoise(x / 16 + 3.7, z / 16 + 9.2) + 0.25 * vnoise(x / 6, z / 6);
  let m = smooth(PLAZA_R + 1, PLAZA_R + 9, Math.hypot(x, z));      // plaza: flat
  m = Math.min(m, smooth(6, 14, riverD(x, z)));                     // river banks: flat (so the water level is one number)
  const tx = Math.max(TOWN.x0 - x, x - TOWN.x1, TOWN.z0 - z, z - TOWN.z1); m = Math.min(m, smooth(0, 8, tx));   // town block: flat
  const rim = smooth(46, 60, Math.max(Math.abs(x), Math.abs(z)));  // ring of hills hides the map edge
  return n * m + 7 * rim + 1.5 * rim * vnoise(x / 9, z / 9);
}
function carve(x, z) { const t = 1 - Math.min(1, riverD(x, z) / 5.5); return 2.6 * t * t * (3 - 2 * t); }   // river channel, 11 m wide, 2.6 m deep
const hTerrain = (x, z) => hBase(x, z) - carve(x, z);

// --- geometry accumulator (positions / normals / colours / uvs, non-indexed) ----------------------------------------
class Geo {
  constructor() { this.p = []; this.n = []; this.c = []; this.uv = []; }
  tri(a, b, c, col, uva, uvb, uvc) {
    const ux = b[0] - a[0], uy = b[1] - a[1], uz = b[2] - a[2], vx = c[0] - a[0], vy = c[1] - a[1], vz = c[2] - a[2];
    let nx = uy * vz - uz * vy, ny = uz * vx - ux * vz, nz = ux * vy - uy * vx; const l = Math.hypot(nx, ny, nz) || 1; nx /= l; ny /= l; nz /= l;
    for (const q of [a, b, c]) { this.p.push(q[0], q[1], q[2]); this.n.push(nx, ny, nz); this.c.push(col[0], col[1], col[2]); }
    this.uv.push(...(uva || [0, 0]), ...(uvb || [0, 0]), ...(uvc || [0, 0]));
  }
  quad(a, b, c, d, col, uvs) { this.tri(a, b, c, col, uvs?.[0], uvs?.[1], uvs?.[2]); this.tri(a, c, d, col, uvs?.[0], uvs?.[2], uvs?.[3]); }
  box(cx, cy, cz, w, h, d, col, roofCol) {   // axis-aligned box (no bottom); roofCol for the top face
    const x0 = cx - w / 2, x1 = cx + w / 2, y0 = cy - h / 2, y1 = cy + h / 2, z0 = cz - d / 2, z1 = cz + d / 2;
    this.quad([x0, y0, z1], [x1, y0, z1], [x1, y1, z1], [x0, y1, z1], col); this.quad([x1, y0, z0], [x0, y0, z0], [x0, y1, z0], [x1, y1, z0], col);
    this.quad([x1, y0, z1], [x1, y0, z0], [x1, y1, z0], [x1, y1, z1], col); this.quad([x0, y0, z0], [x0, y0, z1], [x0, y1, z1], [x0, y1, z0], col);
    this.quad([x0, y1, z1], [x1, y1, z1], [x1, y1, z0], [x0, y1, z0], roofCol || col);
  }
  add(geo, matrix, col) {   // a three.js geometry, transformed, flat colour
    const g = geo.index ? geo.toNonIndexed() : geo; const pos = g.attributes.position, nor = g.attributes.normal; const v = new THREE.Vector3(), nm = new THREE.Matrix3().getNormalMatrix(matrix);
    for (let i = 0; i < pos.count; i++) {
      v.fromBufferAttribute(pos, i).applyMatrix4(matrix); this.p.push(v.x, v.y, v.z);
      v.fromBufferAttribute(nor, i).applyMatrix3(nm).normalize(); this.n.push(v.x, v.y, v.z); this.c.push(col[0], col[1], col[2]); this.uv.push(0, 0);
    }
  }
  build() {
    const g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.Float32BufferAttribute(this.p, 3)); g.setAttribute("normal", new THREE.Float32BufferAttribute(this.n, 3));
    g.setAttribute("color", new THREE.Float32BufferAttribute(this.c, 3)); g.setAttribute("uv", new THREE.Float32BufferAttribute(this.uv, 2));
    return g;
  }
}
const rgb = hex => [((hex >> 16) & 255) / 255, ((hex >> 8) & 255) / 255, (hex & 255) / 255];
const mix = (a, b, t) => [a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t, a[2] + (b[2] - a[2]) * t];

// --- roads: polylines -> terrain-hugging strips ----------------------------------------------------------------------
function loopPath() {   // rounded rectangle, counter-clockwise, ~3 m spacing
  const pts = [], L = LOOP - CORNER;
  const corner = (cx, cz, a0) => { for (let k = 0; k <= 8; k++) { const a = a0 + k / 8 * Math.PI / 2; pts.push([cx + CORNER * Math.cos(a), cz + CORNER * Math.sin(a)]); } };
  corner(L, L, 0); corner(-L, L, Math.PI / 2); corner(-L, -L, Math.PI); corner(L, -L, 3 * Math.PI / 2);
  return subdivide(pts, 3, true);
}
function subdivide(pts, step, closed) {
  const out = [], n = closed ? pts.length : pts.length - 1;
  for (let i = 0; i < n; i++) { const a = pts[i], b = pts[(i + 1) % pts.length], L = Math.hypot(b[0] - a[0], b[1] - a[1]), k = Math.max(1, Math.ceil(L / step)); for (let j = 0; j < k; j++) out.push([a[0] + (b[0] - a[0]) * j / k, a[1] + (b[1] - a[1]) * j / k]); }
  if (!closed) out.push(pts[pts.length - 1]);
  return out;
}
const ROADS = [
  { pts: loopPath(), closed: true, y: 0.05 },
  { pts: subdivide([[-LOOP, ROAD_A_Z], [LOOP, ROAD_A_Z]], 3, false), closed: false, y: 0.065 },
  { pts: subdivide([[ROAD_B_X, -LOOP], [ROAD_B_X, LOOP]], 3, false), closed: false, y: 0.08 },
];
function distToRoads(x, z) {   // distance from (x, z) to the nearest road centreline
  let best = Infinity;
  for (const r of ROADS) { const n = r.closed ? r.pts.length : r.pts.length - 1; for (let i = 0; i < n; i++) { const a = r.pts[i], b = r.pts[(i + 1) % r.pts.length]; const dx = b[0] - a[0], dz = b[1] - a[1], L2 = dx * dx + dz * dz || 1; const t = Math.min(1, Math.max(0, ((x - a[0]) * dx + (z - a[1]) * dz) / L2)); best = Math.min(best, Math.hypot(x - a[0] - dx * t, z - a[1] - dz * t)); } }
  return best;
}
function strip(geo, pts, closed, width, yOf, col, colEdge) {   // yOf(x, z) = surface height; a lighter edge line along both sides
  const n = pts.length, m = closed ? n : n - 1, row = [];
  for (let i = 0; i < n; i++) {
    const p = pts[i], a = pts[(i - 1 + n) % n], b = pts[(i + 1) % n];
    let tx = (closed || i < n - 1 ? b[0] : p[0]) - (closed || i > 0 ? a[0] : p[0]), tz = (closed || i < n - 1 ? b[1] : p[1]) - (closed || i > 0 ? a[1] : p[1]); const l = Math.hypot(tx, tz) || 1; tx /= l; tz /= l;
    const nx = -tz, nz = tx, at = (s) => { const x = p[0] + nx * s, z = p[1] + nz * s; return [x, yOf(x, z), z]; };
    row.push([at(-width / 2), at(-width / 2 + 0.35), at(width / 2 - 0.35), at(width / 2)]);
  }
  for (let i = 0; i < m; i++) { const r0 = row[i], r1 = row[(i + 1) % n]; for (let k = 0; k < 3; k++) geo.quad(r0[k], r0[k + 1], r1[k + 1], r1[k], k === 1 ? col : colEdge); }
}
function dashes(geo, pts, closed, yOf, col) {   // centre line dashes every 6 m, 2.5 m long
  let acc = 0; const n = closed ? pts.length : pts.length - 1;
  for (let i = 0; i < n; i++) {
    const a = pts[i], b = pts[(i + 1) % pts.length], dx = b[0] - a[0], dz = b[1] - a[1], L = Math.hypot(dx, dz); if (L < 1e-6) continue; const tx = dx / L, tz = dz / L, nx = -tz, nz = tx;
    for (let s = -acc; s < L; s += 6) {
      const s0 = Math.max(0, s), s1 = Math.min(L, s + 2.5); if (s1 - s0 < 0.3) continue;
      const P = (t, w) => { const x = a[0] + tx * t + nx * w, z = a[1] + tz * t + nz * w; return [x, yOf(x, z) + 0.006, z]; };
      geo.quad(P(s0, -0.12), P(s0, 0.12), P(s1, 0.12), P(s1, -0.12), col);
    }
    acc = (acc + L) % 6;
  }
}

// --- window texture for the buildings (one tile = 12 m x 12 m = 4 x 4 windows) -----------------------------------------
function windowTexture() {
  const c = document.createElement("canvas"); c.width = c.height = 256; const g = c.getContext("2d");
  g.fillStyle = "#ffffff"; g.fillRect(0, 0, 256, 256);
  for (let y = 0; y < 4; y++) for (let x = 0; x < 4; x++) {
    g.fillStyle = hash(x, y + 11) > 0.35 ? "#2b3f66" : "#c9d9f0"; g.fillRect(x * 64 + 16, y * 64 + 12, 30, 38);   // window (lit or dark)
    g.fillStyle = "#c8c8c8"; g.fillRect(x * 64 + 16, y * 64 + 12, 30, 3);                                            // lintel
  }
  const t = new THREE.CanvasTexture(c); t.wrapS = t.wrapT = THREE.RepeatWrapping; t.colorSpace = THREE.SRGBColorSpace; t.anisotropy = 4; return t;
}

export function createWorld({ RAPIER, physics, scene, key, hemi, floorY, minimap, Q }) {
  const group = new THREE.Group(); group.name = "world"; scene.add(group);
  const rand = rng(1234);
  const H = (x, z) => hTerrain(x, z), Y = (x, z) => floorY + H(x, z);   // absolute heights

  // ---- terrain: 65 x 65 grid, per-vertex colour, faceted (flat shading in the material) ----
  const grid = new Float32Array((N + 1) * (N + 1));
  const tPos = [], tCol = [], tIdx = [];
  const GRASS = rgb(0x6da657), GRASS2 = rgb(0x8bbf5e), SAND = rgb(0xcdbb8a), ROCK = rgb(0x8c8a80), PAVE = rgb(0x9a9c9f), PARKC = rgb(0x5c9e47), HILL = rgb(0x5d8f4a);
  const waterY = -WATER_DEPTH;   // relative to floorY (banks are at 0)
  for (let i = 0; i <= N; i++) for (let j = 0; j <= N; j++) {   // i = row (z), j = column (x)
    const x = -HALF + j * CELL, z = -HALF + i * CELL, h = H(x, z); grid[i * (N + 1) + j] = h;
    tPos.push(x, floorY + h, z);
    const slope = Math.hypot(H(x + 1, z) - H(x - 1, z), H(x, z + 1) - H(x, z - 1)) / 2;
    let col = mix(GRASS, GRASS2, 0.5 + 0.5 * vnoise(x / 7, z / 7));
    if (x > TOWN.x0 && x < TOWN.x1 && z > TOWN.z0 && z < TOWN.z1) col = PAVE;
    if (x > PARK.x0 - 2 && x < PARK.x1 + 2 && z > PARK.z0 - 2 && z < PARK.z1 + 2) col = PARKC;
    if (Math.max(Math.abs(x), Math.abs(z)) > 47) col = mix(col, HILL, smooth(47, 56, Math.max(Math.abs(x), Math.abs(z))));
    if (slope > 0.45) col = mix(col, ROCK, Math.min(1, (slope - 0.45) / 0.4));
    if (h < waterY + 0.5) col = mix(SAND, rgb(0x8a7a5a), Math.min(1, (waterY + 0.5 - h) / 1.5));   // shore and river bed
    tCol.push(col[0], col[1], col[2]);
  }
  for (let i = 0; i < N; i++) for (let j = 0; j < N; j++) { const a = i * (N + 1) + j, b = a + 1, c = a + N + 1, d = c + 1; tIdx.push(a, c, b, b, c, d); }
  const tGeo = new THREE.BufferGeometry(); tGeo.setAttribute("position", new THREE.Float32BufferAttribute(tPos, 3)); tGeo.setAttribute("color", new THREE.Float32BufferAttribute(tCol, 3)); tGeo.setIndex(tIdx); tGeo.computeVertexNormals();
  const terrain = new THREE.Mesh(tGeo, new THREE.MeshStandardMaterial({ vertexColors: true, roughness: 1, flatShading: true })); terrain.receiveShadow = true; terrain.name = "terrain"; group.add(terrain);
  function heightAt(x, z) {   // bilinear over the grid = what the mesh / heightfield show (within a few cm)
    const u = Math.min(N - 1e-6, Math.max(0, (x + HALF) / CELL)), v = Math.min(N - 1e-6, Math.max(0, (z + HALF) / CELL)), j = Math.floor(u), i = Math.floor(v), fu = u - j, fv = v - i;
    const g = (ii, jj) => grid[ii * (N + 1) + jj];
    return floorY + (g(i, j) * (1 - fu) + g(i, j + 1) * fu) * (1 - fv) + (g(i + 1, j) * (1 - fu) + g(i + 1, j + 1) * fu) * fv;
  }
  // Rapier heightfield: (nrows + 1) x (ncols + 1) heights in column-major order, rows along z, columns along x, centred at the translation
  const hf = new Float32Array((N + 1) * (N + 1));
  for (let i = 0; i <= N; i++) for (let j = 0; j <= N; j++) hf[j * (N + 1) + i] = grid[i * (N + 1) + j];
  const hfCollider = physics.createCollider(RAPIER.ColliderDesc.heightfield(N, N, hf, { x: SIZE, y: 1, z: SIZE }).setTranslation(0, floorY, 0).setFriction(0.9));

  // ---- roads (one geometry, vertex colours) ----
  const rGeo = new Geo(), ASPH = rgb(0x44464c), EDGE = rgb(0x7d7f86), DASH = rgb(0xe9d977);
  for (const r of ROADS) { const yOf = (x, z) => floorY + hBase(x, z) + r.y; strip(rGeo, r.pts, r.closed, ROAD_W, yOf, ASPH, EDGE); dashes(rGeo, r.pts, r.closed, yOf, DASH); }
  const roads = new THREE.Mesh(rGeo.build(), new THREE.MeshStandardMaterial({ vertexColors: true, roughness: 0.95 })); roads.receiveShadow = true; roads.name = "roads"; group.add(roads);

  // ---- buildings: axis-aligned boxes on the town lots, walls with the window texture, roofs in the flat geometry ----
  const wGeo = new Geo(), fGeo = new Geo(), boxes = [], circles = [];   // boxes / circles = navigation obstacles
  const TINTS = [0xd8c9b0, 0xc6d3dc, 0xe0b8a0, 0xbfc9a8, 0xd9d2c4, 0xa9b7c9, 0xe3d3a1, 0xcdb9c8];
  const LOTS = [];
  for (const x of [-4, 6, 16, 26]) for (const z of [23, 33]) LOTS.push([x, z]);
  for (const x of [-32, -22]) for (const z of [23, 33]) LOTS.push([x, z]);
  for (const x of [16, 26]) for (const z of [-9, 0]) LOTS.push([x, z]);
  const buildings = LOTS.map(([x, z], k) => {
    const w = 5 + Math.floor(rand() * 3), d = 5 + Math.floor(rand() * 3), floors = 2 + Math.floor(rand() * 5) + (k % 3 === 0 ? 2 : 0), h = floors * 3;
    const base = Y(x, z) - 0.8, tint = rgb(TINTS[k % TINTS.length]);   // sunk 0.8 m so a sloping lot never shows a gap
    const x0 = x - w / 2, x1 = x + w / 2, z0 = z - d / 2, z1 = z + d / 2, y0 = base, y1 = base + h + 0.8;
    const U = 1 / 12;   // texture tile = 12 m
    wGeo.quad([x0, y0, z1], [x1, y0, z1], [x1, y1, z1], [x0, y1, z1], tint, [[x0 * U, 0], [x1 * U, 0], [x1 * U, (h + 0.8) * U], [x0 * U, (h + 0.8) * U]]);
    wGeo.quad([x1, y0, z0], [x0, y0, z0], [x0, y1, z0], [x1, y1, z0], tint, [[x1 * U, 0], [x0 * U, 0], [x0 * U, (h + 0.8) * U], [x1 * U, (h + 0.8) * U]]);
    wGeo.quad([x1, y0, z1], [x1, y0, z0], [x1, y1, z0], [x1, y1, z1], tint, [[z1 * U, 0], [z0 * U, 0], [z0 * U, (h + 0.8) * U], [z1 * U, (h + 0.8) * U]]);
    wGeo.quad([x0, y0, z0], [x0, y0, z1], [x0, y1, z1], [x0, y1, z0], tint, [[z0 * U, 0], [z1 * U, 0], [z1 * U, (h + 0.8) * U], [z0 * U, (h + 0.8) * U]]);
    const roof = mix(tint, rgb(0x55504a), 0.55); fGeo.quad([x0, y1, z1], [x1, y1, z1], [x1, y1, z0], [x0, y1, z0], roof);
    fGeo.box(x, y1 + 0.35, z, w - 1.2, 0.7, d - 1.2, mix(roof, rgb(0x333), 0.3));                                        // roof cap
    fGeo.box(x, y1 + 0.9 + 0.7, z + (d - 1.2) / 4, 1.2, 1.4, 1.2, rgb(0x8a8f96));                                          // stair house
    physics.createCollider(RAPIER.ColliderDesc.cuboid(w / 2, (y1 - y0) / 2, d / 2).setTranslation(x, (y0 + y1) / 2, z));
    boxes.push({ x0, x1, z0, z1, h, y: y1 }); return { x, z, w, d, h: y1 - y0, y: y1 };
  });

  // ---- landmarks: tower, two statue pedestals on the plaza, three bridges, the plaza disc, the table stays at home ----
  const TOWER = { x: 26, z: -32, r: 3, h: 30 };
  { const y = Y(TOWER.x, TOWER.z) - 0.5, M = new THREE.Matrix4();
    fGeo.add(new THREE.CylinderGeometry(TOWER.r * 0.75, TOWER.r, TOWER.h, 12, 1, false), M.makeTranslation(TOWER.x, y + TOWER.h / 2, TOWER.z), rgb(0xc9c3b8));
    fGeo.add(new THREE.CylinderGeometry(TOWER.r * 1.1, TOWER.r * 0.75, 2.5, 12, 1, false), M.makeTranslation(TOWER.x, y + TOWER.h + 1.25, TOWER.z), rgb(0x8e3b3b));
    fGeo.add(new THREE.ConeGeometry(TOWER.r * 1.1, 4, 12), M.makeTranslation(TOWER.x, y + TOWER.h + 2.5 + 2, TOWER.z), rgb(0x6b2f2f));
    fGeo.add(new THREE.CylinderGeometry(0.12, 0.12, 6, 5, 1, false), M.makeTranslation(TOWER.x, y + TOWER.h + 4.5 + 3, TOWER.z), rgb(0x333));
    physics.createCollider(RAPIER.ColliderDesc.cuboid(TOWER.r, TOWER.h / 2, TOWER.r).setTranslation(TOWER.x, y + TOWER.h / 2, TOWER.z));
    circles.push({ x: TOWER.x, z: TOWER.z, r: TOWER.r + 0.3 }); }
  const STATUES = [[5.5, -4], [-5.5, -4]];
  for (const [x, z] of STATUES) { const y = Y(x, z), M = new THREE.Matrix4();
    fGeo.add(new THREE.CylinderGeometry(0.9, 1.1, 1.2, 10, 1, false), M.makeTranslation(x, y + 0.6, z), rgb(0xb9b3a8));
    fGeo.add(new THREE.CylinderGeometry(0.45, 0.6, 0.25, 10, 1, false), M.makeTranslation(x, y + 1.32, z), rgb(0x8f8a80));
    fGeo.add(new THREE.BoxGeometry(0.5, 1.4, 0.35), M.makeTranslation(x, y + 2.15, z), rgb(0x6f7f8f));                         // an abstract figure: torso
    fGeo.add(new THREE.SphereGeometry(0.22, 8, 6), M.makeTranslation(x, y + 3.05, z), rgb(0x6f7f8f));                          // head
    fGeo.add(new THREE.BoxGeometry(1.3, 0.16, 0.2), new THREE.Matrix4().makeRotationZ(0.35).setPosition(x, y + 2.6, z), rgb(0x6f7f8f));   // arms
    physics.createCollider(RAPIER.ColliderDesc.cuboid(1.1, 1.6, 1.1).setTranslation(x, y + 1.6, z)); circles.push({ x, z, r: 1.3 }); }
  fGeo.add(new THREE.CircleGeometry(PLAZA_R, 40), new THREE.Matrix4().makeRotationX(-Math.PI / 2).setPosition(0, floorY + 0.02, 0), rgb(0xa8a49c));   // paved plaza
  for (let k = 0; k < 8; k++) { const a = k / 8 * Math.PI * 2 + 0.2, x = Math.cos(a) * (PLAZA_R - 0.6), z = Math.sin(a) * (PLAZA_R - 0.6); if (z > 4.5) continue;   // low bollards around the plaza (none toward the road)
    fGeo.add(new THREE.CylinderGeometry(0.18, 0.2, 0.8, 6, 1, false), new THREE.Matrix4().makeTranslation(x, floorY + 0.4, z), rgb(0x4a4f58)); }
  const bridges = [ROAD_B_X, -LOOP, LOOP].map(x => ({ x, z: riverZ(x) }));
  for (const b of bridges) { const y = floorY + hBase(b.x, b.z);
    fGeo.box(b.x, y - 0.35, b.z, ROAD_W + 1.2, 0.7, 15, rgb(0x7a7268));                                                       // deck
    for (const s of [-1, 1]) { fGeo.box(b.x + s * (ROAD_W / 2 + 0.45), y + 0.55, b.z, 0.2, 1.0, 15, rgb(0x9c8f7c)); for (let k = -3; k <= 3; k++) fGeo.box(b.x + s * (ROAD_W / 2 + 0.45), y + 0.6, b.z + k * 2.2, 0.35, 1.3, 0.35, rgb(0x6d6157)); }
    for (const s of [-1, 1]) fGeo.add(new THREE.CylinderGeometry(0.7, 0.9, 3.2, 8, 1, false), new THREE.Matrix4().makeTranslation(b.x, y - 2.1, b.z + s * 4.2), rgb(0x6d6a66));   // piers
    boxes.push({ x0: b.x - ROAD_W / 2 - 0.65, x1: b.x - ROAD_W / 2 - 0.25, z0: b.z - 7.5, z1: b.z + 7.5 }, { x0: b.x + ROAD_W / 2 + 0.25, x1: b.x + ROAD_W / 2 + 0.65, z0: b.z - 7.5, z1: b.z + 7.5 }); }   // railings block the player
  const flat = new THREE.Mesh(fGeo.build(), new THREE.MeshStandardMaterial({ vertexColors: true, roughness: 0.85, flatShading: true })); flat.castShadow = flat.receiveShadow = true; flat.name = "props"; group.add(flat);
  const walls = new THREE.Mesh(wGeo.build(), new THREE.MeshStandardMaterial({ map: windowTexture(), vertexColors: true, roughness: 0.8 })); walls.castShadow = walls.receiveShadow = true; walls.name = "walls"; group.add(walls);

  // ---- water: a strip along the river, 1.1 m below the banks ----
  const waGeo = new Geo(); strip(waGeo, subdivide([[-HALF - 5, riverZ(-HALF - 5)], [HALF + 5, riverZ(HALF + 5)]].concat(), 2, false).map(p => [p[0], riverZ(p[0])]), false, 11, () => floorY - WATER_DEPTH, rgb(0x3f86c7), rgb(0x4d95d2));
  const water = new THREE.Mesh(waGeo.build(), new THREE.MeshStandardMaterial({ vertexColors: true, roughness: 0.25, metalness: 0.1, transparent: true, opacity: 0.85 })); water.name = "water"; group.add(water);

  // ---- trees (instanced: two cones + trunk in one geometry) and lamp posts (instanced) ----
  const treeG = new Geo(); { const M = new THREE.Matrix4();
    treeG.add(new THREE.CylinderGeometry(0.14, 0.2, 1.5, 5, 1, false), M.makeTranslation(0, 0.75, 0), rgb(0x6b4a2e));
    treeG.add(new THREE.ConeGeometry(1.25, 2.0, 7), M.makeTranslation(0, 2.2, 0), rgb(0x4f9a3f));
    treeG.add(new THREE.ConeGeometry(0.85, 1.7, 7), M.makeTranslation(0, 3.4, 0), rgb(0x5cab48)); }
  const treeGeo = treeG.build();
  const treeOK = (x, z) => Math.abs(x) < 57 && Math.abs(z) < 57 && distToRoads(x, z) > 4.6 && riverD(x, z) > 7.5 && Math.hypot(x, z) > PLAZA_R + 2.5 && Math.hypot(x - TOWER.x, z - TOWER.z) > 6
    && !buildings.some(b => x > b.x - b.w / 2 - 2.5 && x < b.x + b.w / 2 + 2.5 && z > b.z - b.d / 2 - 2.5 && z < b.z + b.d / 2 + 2.5) && !(x > TOWN.x0 && x < TOWN.x1 && z > TOWN.z0 && z < TOWN.z1 && !(rand() < 0.15));
  const trees = [];
  const drop = (x, z, s) => { if (treeOK(x, z) && !trees.some(t => Math.hypot(t.x - x, t.z - z) < 2.2)) trees.push({ x, z, s }); };
  for (let k = 0; k < 220 && trees.length < 70; k++) drop(PARK.x0 + rand() * (PARK.x1 - PARK.x0), PARK.z0 + rand() * (PARK.z1 - PARK.z0), 0.8 + rand() * 0.5);   // the park
  for (let k = 0; k < 2500 && trees.length < 320; k++) { const x = (rand() * 2 - 1) * 57, z = (rand() * 2 - 1) * 57; if (Math.max(Math.abs(x), Math.abs(z)) > LOOP + 4 || rand() < 0.35) drop(x, z, 0.8 + rand() * 0.7); }   // mostly outside the loop
  const treeMesh = new THREE.InstancedMesh(treeGeo, new THREE.MeshStandardMaterial({ vertexColors: true, roughness: 0.9, flatShading: true }), trees.length);
  { const M = new THREE.Matrix4(), col = new THREE.Color(); trees.forEach((t, i) => { M.makeRotationY(rand() * 6.28).scale(new THREE.Vector3(t.s, t.s, t.s)).setPosition(t.x, Y(t.x, t.z) - 0.05, t.z); treeMesh.setMatrixAt(i, M); treeMesh.setColorAt(i, col.setHSL(0.28 + rand() * 0.07, 0.5, 0.5 + rand() * 0.15)); circles.push({ x: t.x, z: t.z, r: 0.3 * t.s }); }); }
  treeMesh.castShadow = true; treeMesh.receiveShadow = true; treeMesh.name = "trees"; group.add(treeMesh);
  const lampG = new Geo(); { const M = new THREE.Matrix4();
    lampG.add(new THREE.CylinderGeometry(0.06, 0.09, 4.2, 5, 1, false), M.makeTranslation(0, 2.1, 0), rgb(0x3b3f47));
    lampG.add(new THREE.BoxGeometry(0.9, 0.12, 0.12), M.makeTranslation(0.4, 4.2, 0), rgb(0x3b3f47));
    lampG.add(new THREE.BoxGeometry(0.5, 0.22, 0.32), M.makeTranslation(0.8, 4.1, 0), rgb(0xfff0c0)); }
  const lamps = [];
  for (let x = -30; x <= 30; x += 10) lamps.push({ x, z: ROAD_A_Z + ROAD_W / 2 + 1.0, a: Math.PI / 2 });                     // road A, north side, arm over the road
  for (let z = -34; z <= 34; z += 10) if (Math.abs(z - riverZ(ROAD_B_X)) > 9) lamps.push({ x: ROAD_B_X - ROAD_W / 2 - 1.0, z, a: 0 });   // road B, west side
  for (let k = 0; k < 6; k++) { const a = k / 6 * Math.PI * 2 + 0.5, x = Math.cos(a) * (PLAZA_R + 1.2), z = Math.sin(a) * (PLAZA_R + 1.2); if (z < 4.5) lamps.push({ x, z, a: Math.atan2(-x, -z) + Math.PI / 2 }); }   // around the plaza, arms inward
  const lampMesh = new THREE.InstancedMesh(lampG.build(), new THREE.MeshStandardMaterial({ vertexColors: true, roughness: 0.6, metalness: 0.2 }), lamps.length);
  { const M = new THREE.Matrix4(); lamps.forEach((l, i) => { M.makeRotationY(l.a).setPosition(l.x, Y(l.x, l.z) + (distToRoads(l.x, l.z) < ROAD_W / 2 + 1.5 ? 0.06 : 0), l.z); lampMesh.setMatrixAt(i, M); circles.push({ x: l.x, z: l.z, r: 0.25 }); }); }
  lampMesh.castShadow = true; lampMesh.name = "lamps"; group.add(lampMesh);

  // ---- sky dome (follows the camera), fog, sun ----
  const SKY_TOP = new THREE.Color(0x5a9be0), SKY_HOR = new THREE.Color(0xd9e8f5);
  const skyGeo = new THREE.SphereGeometry(200, 20, 10), sc = []; { const p = skyGeo.attributes.position, v = new THREE.Vector3(), c = new THREE.Color(); for (let i = 0; i < p.count; i++) { v.fromBufferAttribute(p, i); c.copy(SKY_HOR).lerp(SKY_TOP, smooth(-0.02, 0.5, v.y / 200)); sc.push(c.r, c.g, c.b); } }
  skyGeo.setAttribute("color", new THREE.Float32BufferAttribute(sc, 3));
  const sky = new THREE.Mesh(skyGeo, new THREE.MeshBasicMaterial({ vertexColors: true, side: THREE.BackSide, fog: false, depthWrite: false })); sky.name = "sky"; sky.renderOrder = -1; group.add(sky);
  const topdown = Q?.get("topdown");   // ?topdown=1 (or a half-extent in metres): true orthographic projection for layout checks, with ?cam= above the map (fog off)
  const FOG = topdown ? [1000, 2000] : [22, 105]; scene.background = SKY_HOR.clone(); scene.fog.color.copy(SKY_HOR);
  const SUN = new THREE.Vector3(0.55, 1.0, 0.4).normalize();
  key.color.set(0xfff3dc); key.intensity = 2.0; Object.assign(key.shadow.camera, { left: -7, right: 7, top: 7, bottom: -7, near: 1, far: 90 }); key.shadow.camera.updateProjectionMatrix(); key.shadow.mapSize.set(1024, 1024); key.shadow.bias = -0.001; key.shadow.normalBias = 0.02;
  if (key.shadow.map) { key.shadow.map.dispose(); key.shadow.map = null; }
  hemi.color.set(0xdfeeff); hemi.groundColor.set(0x6f7d5c); hemi.intensity = 0.9;

  // ---- navigation clamp ----
  const waterOK = (x, z) => heightAt(x, z) > floorY - WATER_DEPTH - WADE;
  const inside = (x, z) => boxes.find(b => x > b.x0 - PLAYER_R && x < b.x1 + PLAYER_R && z > b.z0 - PLAYER_R && z < b.z1 + PLAYER_R) || circles.find(c => Math.hypot(x - c.x, z - c.z) < c.r + PLAYER_R);
  function clampMove(fx, fz, tx, tz) {   // returns [x, z]: the target, pushed out of obstacles (slides), or the start if nothing works
    let x = Math.max(-56, Math.min(56, tx)), z = Math.max(-56, Math.min(56, tz));
    for (let pass = 0; pass < 4; pass++) {
      const b = boxes.find(b => x > b.x0 - PLAYER_R && x < b.x1 + PLAYER_R && z > b.z0 - PLAYER_R && z < b.z1 + PLAYER_R);
      if (b) { const d = [x - (b.x0 - PLAYER_R), (b.x1 + PLAYER_R) - x, z - (b.z0 - PLAYER_R), (b.z1 + PLAYER_R) - z], k = d.indexOf(Math.min(...d)) ; if (k === 0) x = b.x0 - PLAYER_R - 0.01; else if (k === 1) x = b.x1 + PLAYER_R + 0.01; else if (k === 2) z = b.z0 - PLAYER_R - 0.01; else z = b.z1 + PLAYER_R + 0.01; continue; }
      const c = circles.find(c => Math.hypot(x - c.x, z - c.z) < c.r + PLAYER_R);
      if (c) { const dx = x - c.x, dz = z - c.z, l = Math.hypot(dx, dz) || 1e-3, r = c.r + PLAYER_R + 0.01; x = c.x + dx / l * r; z = c.z + dz / l * r; continue; }
      break;
    }
    if (inside(x, z)) return [fx, fz];
    if (!waterOK(x, z)) { if (waterOK(x, fz) && !inside(x, fz)) return [x, fz]; if (waterOK(fx, z) && !inside(fx, z)) return [fx, z]; return [fx, fz]; }
    return [x, z];
  }

  // ---- mini-map: a pre-drawn top-down image (north = +z up) plus the player arrow ----
  const mm = minimap, MM = 160, base = document.createElement("canvas"); base.width = base.height = MM; mm.width = mm.height = MM;
  const S = MM / SIZE, px = x => (x + HALF) * S, pz = z => (HALF - z) * S;
  { const g = base.getContext("2d");
    for (let i = 0; i < N; i++) for (let j = 0; j < N; j++) { const h = grid[i * (N + 1) + j], x = -HALF + j * CELL, z = -HALF + i * CELL;
      let c = h < waterY + 0.2 ? "#3f86c7" : h < waterY + 0.7 ? "#cdbb8a" : x > TOWN.x0 && x < TOWN.x1 && z > TOWN.z0 && z < TOWN.z1 ? "#9a9c9f" : h > 3 ? "#5d8f4a" : "#6da657";
      g.fillStyle = c; g.fillRect(px(x), pz(z + CELL), CELL * S + 0.5, CELL * S + 0.5); }
    g.fillStyle = "#5c9e47"; g.fillRect(px(PARK.x0), pz(PARK.z1), (PARK.x1 - PARK.x0) * S, (PARK.z1 - PARK.z0) * S);
    g.fillStyle = "#3e6b33"; for (const t of trees) g.fillRect(px(t.x) - 0.7, pz(t.z) - 0.7, 1.4, 1.4);
    g.fillStyle = "#a8a49c"; g.beginPath(); g.arc(px(0), pz(0), PLAZA_R * S, 0, 6.29); g.fill();
    g.strokeStyle = "#44464c"; g.lineWidth = ROAD_W * S; g.lineJoin = "round";
    for (const r of ROADS) { g.beginPath(); r.pts.forEach((p, i) => i ? g.lineTo(px(p[0]), pz(p[1])) : g.moveTo(px(p[0]), pz(p[1]))); if (r.closed) g.closePath(); g.stroke(); }
    g.fillStyle = "#d8c9b0"; for (const b of buildings) g.fillRect(px(b.x - b.w / 2), pz(b.z + b.d / 2), b.w * S, b.d * S);
    g.fillStyle = "#c9c3b8"; g.beginPath(); g.arc(px(TOWER.x), pz(TOWER.z), TOWER.r * S, 0, 6.29); g.fill();
    g.fillStyle = "#e0a040"; g.fillRect(px(0) - 2, pz(0) - 2, 4, 4);   // home
  }
  let mmLast = 0;
  function drawMinimap(nav, now) {
    if (mm.hidden || now - mmLast < 100) return; mmLast = now;
    const g = mm.getContext("2d"); g.clearRect(0, 0, MM, MM); g.drawImage(base, 0, 0);
    const x = px(nav.x), y = pz(nav.z), a = nav.yaw;   // facing (sin yaw, cos yaw) in world = (sin, -cos) on the canvas
    g.save(); g.translate(x, y); g.rotate(a);   // the arrow points up (canvas -y = world +z) at yaw 0; canvas rotation is clockwise, so rotate(yaw) turns it toward (sin yaw, cos yaw)
    g.fillStyle = "#ff5050"; g.strokeStyle = "#fff"; g.lineWidth = 1; g.beginPath(); g.moveTo(0, -6); g.lineTo(4, 5); g.lineTo(0, 3); g.lineTo(-4, 5); g.closePath(); g.fill(); g.stroke(); g.restore();
  }

  // ---- per-frame: sun and shadow camera follow the player, sky follows the camera ----
  const _s = new THREE.Vector3();
  function update(now, nav, camera) {
    key.position.set(nav.x, nav.y, nav.z).addScaledVector(SUN, 40); key.target.position.set(nav.x, nav.y, nav.z);
    sky.position.copy(camera.position);
    drawMinimap(nav, now);
  }
  let tris = 0; group.traverse(o => { if (o.isMesh) { const g = o.geometry, n = (g.index ? g.index.count : g.attributes.position.count) / 3; tris += n * (o.isInstancedMesh ? o.count : 1); } });
  const ortho = topdown ? new THREE.OrthographicCamera(-1, 1, 1, -1, 0.1, 400) : null;
  return {
    group, heightAt, clampMove, update, FOG, tris, hfCollider, buildings, trees, boxes, circles, roads: ROADS, riverZ, hBase, hTerrain, distToRoads,
    groundAt: (x, z) => heightAt(x, z) - floorY,   // the player's nav.y: height above the room's ground (0 at home)
    fixCamera(camera) {   // called after applyView: the orthographic debug projection
      if (!ortho) return; const e = topdown === "1" ? 62 : +topdown, a = camera.aspect; ortho.left = -e * a; ortho.right = e * a; ortho.top = e; ortho.bottom = -e; ortho.updateProjectionMatrix();
      camera.projectionMatrix.copy(ortho.projectionMatrix); camera.projectionMatrixInverse.copy(ortho.projectionMatrixInverse);
    },
  };
}
