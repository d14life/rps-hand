const clamp = (v, max) => Math.max(-max, Math.min(max, v));

// Face mesh coordinates: x right, y down (height units), z away (width units).
// A cheek/forehead/chin plane estimates orientation without depending on mouth shape.
export function facePose(points, categories = [], aspect = 1) {
  if (!points || points.length < 455) return null;
  const sub = (a, b) => [a.x-b.x, (a.y-b.y)/aspect, a.z-b.z];
  const x = sub(points[454], points[234]), y = sub(points[152], points[10]);
  const n = [x[1]*y[2]-x[2]*y[1], x[2]*y[0]-x[0]*y[2], x[0]*y[1]-x[1]*y[0]];
  if (n[2] < 0) n.forEach((_, i) => n[i] *= -1);
  if (Math.hypot(...n) < 1e-7) return null;
  const scores = Object.fromEntries(categories.map(c => [c.categoryName, c.score]));
  const s = name => scores[name] || 0;
  const blink = Math.max(s('eyeBlinkLeft'), s('eyeBlinkRight')) > .45;
  const pose = {
    yaw: Math.atan2(n[0], n[2]),
    pitch: Math.atan2(n[1], Math.hypot(n[0], n[2])),
    eyeX: (s('eyeLookInLeft') + s('eyeLookOutRight') - s('eyeLookOutLeft') - s('eyeLookInRight')) / 2,
    eyeY: (s('eyeLookUpLeft') + s('eyeLookUpRight') - s('eyeLookDownLeft') - s('eyeLookDownRight')) / 2,
    blink
  };
  return Object.values(pose).every(v => typeof v === 'boolean' || Number.isFinite(v)) ? pose : null;
}

export class ViewPose {
  constructor() { this.mode = 'head'; this.neutral = null; this.latest = null; this.seen = -Infinity; this.yaw = 0; this.pitch = 0; }
  recenter() { this.neutral = null; this.latest = null; }
  receive(pose, now) {
    if (!pose) return;
    // Reacquisition uses a fresh neutral rather than jumping to an old offset.
    if (now - this.seen > 1500) this.neutral = null;
    this.latest = pose; this.seen = now;
    this.neutral ??= { ...pose };
  }
  update(now, dt) {
    let yaw = 0, pitch = 0;
    if (this.mode !== 'off' && this.latest && this.neutral && now - this.seen < 650) {
      // n points INTO the head (+z), opposite the viewing direction. With the
      // image mirrored, a positive plane yaw looks screen-right (negative camera yaw).
      yaw = -(this.latest.yaw - this.neutral.yaw) * .65;
      pitch = (this.latest.pitch - this.neutral.pitch) * .65;
      if (this.mode === 'eyes' && !this.latest.blink) {
        yaw -= (this.latest.eyeX - this.neutral.eyeX) * .12;
        pitch += (this.latest.eyeY - this.neutral.eyeY) * .12;
      }
    }
    const a = 1 - Math.exp(-Math.min(dt, .1) / .15);
    this.yaw += (clamp(yaw, .24) - this.yaw) * a;
    this.pitch += (clamp(pitch, .18) - this.pitch) * a;
    if (this.mode === 'off') this.yaw = this.pitch = 0;
    return { yaw: this.yaw, pitch: this.pitch };
  }
}
