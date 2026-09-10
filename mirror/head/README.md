# Head-controlled mirror camera

The mirror starts in Head mode. Keep your face and hand in the front camera frame,
look straight ahead on acquisition, then turn gently. Recenter records a fresh
neutral on the next detected frame. Fixed restores the original mirror projection.
Head + eyes (beta) adds a small, approximate eye-direction contribution; this is
not calibrated screen gaze or a precise eye tracker.

`HeadView.js` owns an independent module worker, sharing the existing video stream.
It caps capture at 10 fps and 480px width; only one face frame may be in flight.
`worker.mjs` uses MediaPipe FaceLandmarker 1.0.1, one face, CPU in a worker,
and blendshapes. All inference stays in the browser; models load from Google/CDN.
Failure or timeout disables only the face worker, leaving the hands running.

`pose.mjs` estimates the face plane from landmarks 234/454 (cheeks) and 10/152
(forehead/chin). Correct normalized y by image aspect before the cross product.
Yaw and pitch are relative to the acquired neutral; roll is intentionally ignored.
The face plane normal points into the head, opposite its viewing direction.
The mirror camera maps yaw with -0.65 gain and pitch with +0.65 gain, then caps
them at 0.24 and 0.18 radians and smooths with a 150ms exponential time constant.
Eye look-in/out and up/down blendshapes add at most a small contribution; blinks
above 0.45 suppress it. This plane estimate is approximate, especially at extremes.

After 650ms without a face, the view eases home. After 1.5s, reacquisition resets
neutral to prevent a jump. No hand joints or rig transforms are modified: the
camera Euler rotation is applied after `applyView` and before rendering. When
camera movement is enabled the model intentionally no longer projects onto the
same video pixels. Use Fixed when debugging hand-to-landmark alignment.

Run `node mirror/head/pose.test.mjs` for synthetic direction, aspect, limits,
recenter, dropout and eye/blink tests. `verify.html` also runs a real face-model
worker against the included two-hands photo, without requesting webcam access.
Live webcam direction and eye sensitivity still need a device check.
