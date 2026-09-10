import { ViewPose, WindowPose, windowFrustum } from './pose.mjs?v=window2';

export class HeadView {
  constructor(video, camera, { mode, recenter, status, hfov = Math.PI/3 }) {
    this.video = video; this.camera = camera; this.status = status;
    this.pose = new ViewPose(); this.window = new WindowPose(); this.mode = mode.value; this.hfov = hfov; this.busy = false; this.ready = false; this.failed = false;
    this.lastCapture = -Infinity; this.lastVideo = -1;
    this.worker = new Worker(new URL('./worker.mjs?v=window2', import.meta.url), { type: 'module' });
    const fail = () => { this.failed = true; this.busy = false; this.worker.terminate(); clearTimeout(this.timer); };
    this.worker.onerror = fail;
    this.worker.onmessage = ({ data }) => {
      if (data.type === 'error') return fail();
      if (data.type === 'ready') { this.ready = true; clearTimeout(this.timer); }
      if (data.type === 'pose') { this.busy = false; const now=performance.now(); this.pose.receive(data.pose, now); this.window.receive(data.pose, now, video.videoWidth/video.videoHeight, this.hfov); }
    };
    this.timer = setTimeout(fail, 60000);
    mode.onchange = () => { this.mode = mode.value; this.pose.mode = mode.value; this.pose.recenter(); this.window.recenter(); };
    recenter.onclick = () => { this.pose.recenter(); this.window.recenter(); };
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
    const eye = this.window.update(now, dt, this.mode === 'window');
    this.camera.position.set(...eye);
    this.camera.rotation.set(this.mode === 'window' ? 0 : pitch, this.mode === 'window' ? 0 : yaw, 0, 'YXZ');
    this.camera.updateProjectionMatrix();
    if (this.mode === 'window') {
      const f=windowFrustum(eye,this.camera.fov,this.camera.aspect,this.camera.zoom,this.camera.near);
      this.camera.projectionMatrix.makePerspective(f.left,f.right,f.top,f.bottom,this.camera.near,this.camera.far);
      this.camera.projectionMatrixInverse.copy(this.camera.projectionMatrix).invert();
    }
    this.status.textContent = this.mode === 'off' ? 'Fixed mirror view' : this.failed ? 'Head tracking unavailable — hand tracking still works' : !this.ready ? 'Loading head tracking…' : now-this.pose.seen > 650 ? 'Keep your face in view · look straight and Recenter' : this.mode === 'window' ? '3D window · lean sideways, up/down, closer or farther' : this.mode === 'eyes' ? 'Head + eyes · approximate gaze' : 'Head tracking on · turn gently to look around';
  }
}
