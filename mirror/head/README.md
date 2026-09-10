# First-person tracked hands (default)

First person places the viewpoint on the user's side of the hands, inside a room.
Both head rotation and translation drive the camera. The hand group uses a proper
180-degree Y rotation (positive scale, not the old mirror reflection), then subtracts
the neutral eye origin. This reveals the anatomical opposite side of a palm held
toward the phone. Joint coordinates and skinning remain unchanged; hands are in
world space, not parented to the moving camera. A table/floor supply depth cues.

Neutral eye distance is estimated from a 90mm outer-eye span and camera FOV,
bounded to 0.28–0.9m. The neutral eye midpoint determines the origin. Relative head
translation scales the window tracker by that neutral distance, while yaw/pitch
use 1.4 gain with limits of 0.8/0.55 radians so small turns can explore the room.
Recenter resets both. This is approximate monocular tracking, not calibrated VR
or whole-body locomotion. Keep the phone still and both face/hands visible.
The first-person lens is 70 degrees vertically. A fixed 0.30m forward reach
offset is applied to the hand group because the face and hand models estimate
scale independently; it prevents typical close hands intersecting the near plane.
This is a comfort mapping, not exact physical eye-to-hand registration.

## Head-tracked 3D window (optional)

The 3D window option provides a full-screen, head-coupled window into the scene. It tracks
the midpoint of outer eye corners 33/263 and their 3D span to estimate lateral,
vertical and distance changes relative to Recenter. Camera translation and an
asymmetric perspective frustum keep the virtual screen plane at z=-0.35 fixed.
There is no lookAt rotation in this mode. Background room/grid gives depth cues.
Show camera restores the split view. Turn to look retains the earlier rotation mode.

WindowPose assumes a neutral viewing distance of 0.45m and uses the capture FOV.
Span ratios estimate distance; this is relative webcam head tracking, not measured
screen geometry or stereo VR. Physical screen size, eye distance and lens calibration
would be required for precise metric registration. Eye gaze does not rotate this
window: moving the eye position produces parallax. Translation is clamped and
smoothed (85ms), then returns home after face loss. No opponent is added.

Projection tests verify all screen corners stay anchored as the eye translates,
and points behind the window exhibit differential parallax. Device testing is
still needed to tune the scale for a particular phone and viewing distance.

## Optional rotation modes

In Turn to look mode, keep your face and hand in the front camera frame,
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
