import * as THREE from 'three';
import {TrackedHand} from './TrackedHand.js?v=fold-2';
export class LiveHands {
  constructor(scene,video,status,preview=false){
    this.video=video;this.status=status;this.group=new THREE.Group();scene.add(this.group);this.group.rotation.y=Math.PI;
    this.slots=[];this.busy=false;this.lastTime=-1;this.preview=preview;
    this.init().catch(()=>{status.textContent='Hands unavailable; head tracking still works';});
  }
  async init(){
    const models=await Promise.all([TrackedHand.load(),TrackedHand.load()]);
    for(let i=0;i<2;i++){const model=models[i];this.group.add(model.object);model.object.visible=false;model.showJoints(false);this.slots.push({model,filter:new OneEuro(63),seen:-Infinity,center:[0,0],side:i?'Left':'Right'});}
    if(this.preview){
      const fixture=await (await fetch(new URL('./fixtures.json',import.meta.url))).json();
      for(let i=0;i<2;i++){
        const s=this.slots[i],f=fixture[i?'victory':'skin_back'];s.side=f.handedness;
        const a=new Float32Array(f.world.flatMap(p=>[p.x+(i?.13:-.13),-p.y-.10,-p.z-.30]));
        s.filter.push(a,performance.now()/1000);s.seen=performance.now();
      }
      this.status.textContent='Recorded hand poses · live mode uses your hands';return;
    }
    this.tracker=await makeTracker();
  }
  async pump(now){
    if(!this.tracker||this.busy||this.video.readyState<2||this.video.currentTime===this.lastTime)return;
    this.busy=true;this.lastTime=this.video.currentTime;
    try{
      const result=await this.tracker.detect(this.video,now),free=[...this.slots];
      for(const h of result.hands.sort((a,b)=>b.score-a.score)){
        if(!free.length)break;
        const c=[h.landmarks[9].x,h.landmarks[9].y];
        const recent=free.filter(s=>now-s.seen<400).sort((a,b)=>Math.hypot(a.center[0]-c[0],a.center[1]-c[1])-Math.hypot(b.center[0]-c[0],b.center[1]-c[1]));
        const slot=recent[0]??free.find(s=>s.side===h.name)??free[0];free.splice(free.indexOf(slot),1);
        const [translation,fit,xu,yv]=locate(h.world,h.landmarks,this.video.videoWidth,this.video.videoHeight);
        if(!translation.every(Number.isFinite)||fit>.15)continue;
        if(now-slot.seen>400){slot.filter=new OneEuro(63);slot.side=h.name;}
        slot.filter.push(toGL(h.world,translation,xu,yv),now/1000);slot.seen=now;slot.center=c;
      }
    }catch{this.status.textContent='Hand frame missed';}finally{this.busy=false;}
  }
  update(now,head){
    if(!this.preview)this.pump(now);const origin=head?.origin??[0,.1,.6];this.group.position.set(-origin[0],-origin[1],-origin[2]-.3);
    let count=0;
    for(const s of this.slots){s.model.object.visible=!!s.filter.x&&(this.preview||now-s.seen<300);if(s.model.object.visible){s.model.update(toVecs(s.filter.predict(this.preview?0:Math.min(.06,(now-s.seen)/1000))),s.side);count++;}}
    if(this.tracker)this.status.textContent=count?`${count} hand${count===1?'':'s'} tracked`:'Hold your hands in front of the camera';
  }
}
const HFOV=Math.PI/3, PALM=[0,5,9,13,17];
const MP = "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@1.0.1";
const MODEL = "https://storage.googleapis.com/mediapipe-models/hand_landmarker/hand_landmarker/float16/latest/hand_landmarker.task";
// Lower presence/tracking thresholds = the tracker holds on longer through motion blur before giving up.
const TRACKER_OPTS = { runningMode: "VIDEO", numHands: 2, minHandDetectionConfidence: 0.5, minHandPresenceConfidence: 0.5, minTrackingConfidence: 0.4 };

function locate(world, image, W, H) {
  const k = 2 * Math.tan(HFOV / 2), n = 21;
  const xu = new Float32Array(n), yv = new Float32Array(n);
  let Sx = 0, Sy = 0, Sxx = 0, Sbu = 0, Sbv = 0, Sxb = 0;
  for (let i = 0; i < n; i++) {
    xu[i] = (image[i].x - 0.5) * k; yv[i] = (image[i].y - 0.5) * k * H / W;
    const bu = world[i].x - xu[i] * world[i].z, bv = world[i].y - yv[i] * world[i].z;
    Sx += xu[i]; Sy += yv[i]; Sxx += xu[i] * xu[i] + yv[i] * yv[i]; Sbu += bu; Sbv += bv; Sxb += xu[i] * bu + yv[i] * bv;
  }
  const Tz = (Sxb - (Sx * Sbu + Sy * Sbv) / n) / (Sxx - (Sx * Sx + Sy * Sy) / n);
  const Tx = (Sx * Tz - Sbu) / n, Ty = (Sy * Tz - Sbv) / n;
  let err = 0;
  for (let i = 0; i < n; i++) { const z = world[i].z + Tz; err += Math.hypot((world[i].x + Tx) / z - xu[i], (world[i].y + Ty) / z - yv[i]); }
  return [[Tx, Ty, Tz], err / n / k, xu, yv];
}

// Each joint's 3D position: where the camera SEES it (image landmark, back-projected) at the depth the world
// model gives it (world z + Tz). Lateral positions therefore match the video exactly; only depth is modelled.
// -> flat GL array (y up, z toward the phone camera), TRUE positions: your right hand has x < 0 (the camera's
// left); the selfie view mirrors the render instead.
function toGL(world, T, xu, yv) {
  const a = new Float32Array(63);
  for (let i = 0; i < 21; i++) { const z = world[i].z + T[2]; a[3*i] = xu[i] * z; a[3*i+1] = -yv[i] * z; a[3*i+2] = -z; }
  return a;
}
const vec = (a, i) => new THREE.Vector3(a[3*i], a[3*i+1], a[3*i+2]);
const toVecs = a => Array.from({ length: 21 }, (_, i) => vec(a, i));
class OneEuro {
  constructor(n, minCutoff = 1.0, beta = 20, dCutoff = 3) { this.x = null; this.dx = new Float32Array(n); this.t = 0; this.minCutoff = minCutoff; this.beta = beta; this.dCutoff = dCutoff; }
  alpha(cut, dt) { const tau = 1 / (2 * Math.PI * cut); return 1 / (1 + tau / dt); }
  push(x, t) {                     // t in seconds (capture time of the frame)
    if (!this.x) { this.x = Float32Array.from(x); this.t = t; return; }
    const dt = Math.max(1e-3, t - this.t); this.t = t;
    const ad = this.alpha(this.dCutoff, dt);
    for (let i = 0; i < x.length; i++) {
      const dx = (x[i] - this.x[i]) / dt;
      this.dx[i] += ad * (dx - this.dx[i]);
      const a = this.alpha(this.minCutoff + this.beta * Math.abs(this.dx[i]), dt);
      this.x[i] += a * (x[i] - this.x[i]);
    }
  }
  predict(lead) {                  // extrapolate the hand as a rigid body: mean palm velocity applied to every joint (per-joint
    const v = [0, 0, 0];             // extrapolation amplifies fingertip noise into wobble); finger articulation stays smoothed
    for (const i of PALM) for (let k = 0; k < 3; k++) v[k] += this.dx[3 * i + k] / PALM.length;
    const out = new Float32Array(this.x.length);
    for (let i = 0; i < out.length; i++) out[i] = this.x[i] + v[i % 3] * lead;
    return out;
  }
}
const MAX_LEAD = 0.15;             // never extrapolate more than 150 ms ahead
const HOLD_MS = 250;               // keep a hand alive this long after tracking drops (dead reckoning), then remove it

// --- tracker: HandLandmarker in a Web Worker so rendering never waits on inference -----------------
const WORKER_SRC = `
import { FilesetResolver, HandLandmarker } from "${MP}/vision_bundle.mjs";
let lm, delegate;
const pack = r => r.landmarks.map((landmarks, i) => ({ landmarks, world: r.worldLandmarks[i], name: r.handedness[i]?.[0]?.categoryName ?? "?", score: r.handedness[i]?.[0]?.score ?? 0 }));
onmessage = async e => {
  if (e.data.init) {
    const vision = await FilesetResolver.forVisionTasks("${MP}/wasm", true);  // true = ES-module loader, required inside a module worker
    for (delegate of ["GPU", "CPU"]) {
      try { lm = await HandLandmarker.createFromOptions(vision, { baseOptions: { modelAssetPath: ${JSON.stringify(MODEL)}, delegate }, ...e.data.opts }); postMessage({ ready: true, delegate }); return; }
      catch (err) { console.warn(delegate + " failed in worker", err); }
    }
    postMessage({ ready: false }); return;
  }
  const t = performance.now();
  const r = lm.detectForVideo(e.data.frame, e.data.ts);
  e.data.frame.close();
  postMessage({ id: e.data.id, ms: performance.now() - t, hands: pack(r) });
};`;

async function makeTracker() {
  // 1) worker (preferred). 2) main-thread fallback if the worker cannot start (old Safari, no OffscreenCanvas).
  try {
    const w = new Worker(URL.createObjectURL(new Blob([WORKER_SRC], { type: "text/javascript" })), { type: "module" });
    const ready = await new Promise((res, rej) => {
      w.onmessage = e => res(e.data); w.onerror = e => rej(e.message || "worker error");
      w.postMessage({ init: true, opts: TRACKER_OPTS });
      setTimeout(() => rej("worker init timeout"), 60000);
    });
    if (!ready.ready) throw new Error("no delegate in worker");
    const waiting = new Map(); let id = 0;
    w.onmessage = e => { waiting.get(e.data.id)?.(e.data); waiting.delete(e.data.id); };
    return {
      where: "worker/" + ready.delegate,
      async detect(src, ts) {
        const frame = await createImageBitmap(src);
        return new Promise(res => { const my = ++id; waiting.set(my, res); w.postMessage({ id: my, frame, ts }, [frame]); });
      },
    };
  } catch (e) {
    console.warn("worker unavailable, tracking on main thread:", e);
    const { FilesetResolver, HandLandmarker } = await import(`${MP}/vision_bundle.mjs`);
    const vision = await FilesetResolver.forVisionTasks(`${MP}/wasm`);
    const pack = r => r.landmarks.map((landmarks, i) => ({ landmarks, world: r.worldLandmarks[i], name: r.handedness[i]?.[0]?.categoryName ?? "?", score: r.handedness[i]?.[0]?.score ?? 0 }));
    for (const delegate of ["GPU", "CPU"]) {
      try {
        const lm = await HandLandmarker.createFromOptions(vision, { baseOptions: { modelAssetPath: MODEL, delegate }, ...TRACKER_OPTS });
        return { where: "main/" + delegate, async detect(src, ts) { const t = performance.now(); const r = lm.detectForVideo(src, ts); return { ms: performance.now() - t, hands: pack(r) }; } };
      } catch (err) { console.warn(delegate + " failed", err); }
    }
    throw new Error("Hand tracker failed to load. Check the connection and reload.");
  }
}

