import { ViewPose } from './pose.mjs';

export class HeadView {
  constructor(video, camera, { mode, recenter, status }) {
    this.video = video; this.camera = camera; this.status = status;
    this.pose = new ViewPose(); this.busy = false; this.ready = false; this.failed = false;
    this.lastCapture = -Infinity; this.lastVideo = -1;
    this.worker = new Worker(new URL('./worker.mjs', import.meta.url), { type: 'module' });
    const fail = () => { this.failed = true; this.busy = false; this.worker.terminate(); clearTimeout(this.timer); };
    this.worker.onerror = fail;
    this.worker.onmessage = ({ data }) => {
      if (data.type === 'error') return fail();
      if (data.type === 'ready') { this.ready = true; clearTimeout(this.timer); }
      if (data.type === 'pose') { this.busy = false; this.pose.receive(data.pose, performance.now()); }
    };
    this.timer = setTimeout(fail, 60000);
    mode.onchange = () => { this.pose.mode = mode.value; this.pose.recenter(); };
    recenter.onclick = () => this.pose.recenter();
    addEventListener('pagehide', () => { this.worker.terminate(); clearTimeout(this.timer); }, { once: true });
  }
  async capture(now) {
    if (this.failed || !this.ready || this.busy || this.pose.mode === 'off' || document.hidden || now-this.lastCapture < 100 || this.video.readyState < 2 || this.video.currentTime === this.lastVideo) return;
    this.busy = true; this.lastCapture = now; this.lastVideo = this.video.currentTime;
    try {
      const width = Math.min(480, this.video.videoWidth);
      const frame = await createImageBitmap(this.video, { resizeWidth: width, resizeHeight: Math.round(width*this.video.videoHeight/this.video.videoWidth) });
      this.worker.postMessage({ frame, ts: now }, [frame]);
    } catch { this.busy = false; this.failed = true; this.worker.terminate(); }
  }
  update(now, dt) {
    this.capture(now);
    const { yaw, pitch } = this.pose.update(now, dt);
    this.camera.rotation.set(pitch, yaw, 0, 'YXZ');
    this.status.textContent = this.pose.mode === 'off' ? 'Fixed mirror view' : this.failed ? 'Head tracking unavailable — hand tracking still works' : !this.ready ? 'Loading head tracking…' : now-this.pose.seen > 650 ? 'Keep your face and hand in view · look straight to center' : this.pose.mode === 'eyes' ? 'Head + eyes · approximate gaze' : 'Head tracking on · turn gently to look around';
  }
}
