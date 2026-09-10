import { FilesetResolver, FaceLandmarker } from 'https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@1.0.1/vision_bundle.mjs';
import { facePose } from './pose.mjs?v=headonly4';

let tracker;
try {
  const files = await FilesetResolver.forVisionTasks('https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@1.0.1/wasm', true);
  const opts = { baseOptions: { modelAssetPath: 'https://storage.googleapis.com/mediapipe-models/face_landmarker/face_landmarker/float16/1/face_landmarker.task', delegate: 'CPU' }, runningMode: 'VIDEO', numFaces: 1, outputFaceBlendshapes: false };
  // CPU worker keeps the extra tracker off the UI and avoids competing WebGL contexts.
  tracker = await FaceLandmarker.createFromOptions(files, opts);
  postMessage({ type: 'ready' });
} catch (e) { postMessage({ type: 'error', message: e.message }); }

onmessage = ({ data }) => {
  const { frame, ts } = data;
  if (!frame) return;
  try {
    const result = tracker.detectForVideo(frame, ts);
    postMessage({ type: 'pose', pose: facePose(result.faceLandmarks[0], frame.width / frame.height) });
  } catch (e) { postMessage({ type: 'error', message: e.message }); }
  finally { frame.close(); }
};
