# Head-only first-person viewing on a flat screen

No gaze, iris, blink or expression output drives this app. FaceLandmarker runs
with outputFaceBlendshapes:false. Cheeks 234/454 and forehead/chin 10/152 define
head orientation; fixed outer eye corners 33/263 estimate head centre and scale
(anatomical reference points, not eye direction). Roll is ignored.

First person uses absolute head angle relative to Recenter. A 0.025-radian
(1.43-degree) dead zone removes tiny movements, then yaw gain defaults to 5x,
adjustable from 3x to 8x. Pitch gain is 60% of yaw gain. Limits are +/-180 degrees
yaw and +/-74.5 degrees pitch. Roughly 20 degrees physical yaw gives 93 degrees
virtual yaw; 38 degrees reaches the rear view at default gain. Returning the
head to neutral returns the view forward. There is no continuous edge spinning.
150ms exponential smoothing remains. The avatar preview uses separately smoothed
physical angles, so its head does not turn five times as far as the person.

The virtual lens covers 100 degrees on the longer viewport dimension at 1x zoom.
Landscape provides a 100-degree horizontal view; portrait caps vertical FOV at
100 degrees to avoid extreme distortion. Virtual FOV is distinct from the capture
lens HFOV used to reconstruct tracker positions. Higher zoom narrows FOV.

Head translation remains enabled. Neutral distance uses an assumed 90mm outer
eye span and capture FOV, bounded to 0.28-0.9m. Relative translation is smoothed
at 85ms. After 650ms face loss the view eases home; 1.5s loss recalibrates on return.
Prop the phone still, keep the face in frame, look forward, then press Recenter.
This is approximate webcam tracking, not stereo VR or full-body locomotion.

The current page contains no hand renderer, hand detector or object manipulation. Older assets and interaction tests remain available as source history, but the page does not import or run them.

Lean translation uses 65% of estimated physical motion, with forward/back travel capped at 0.15m, sideways at 0.12m and vertical at 0.10m. Forward motion follows horizontal viewing direction. It is an absolute offset from Recenter, never a velocity: remaining still does not drift.

The face CPU module worker shares the existing video stream, captures at most
10fps and 480px width, with one frame in flight. Errors disable only face tracking.
Inference stays in the browser; model/runtime assets load from Google/jsDelivr.

Run node mirror/head/pose.test.mjs for orientation, amplified look direction,
rear-view limits, physical avatar angles, dead zone, no gaze input, recenter,
loss handling, translation and off-axis screen anchoring checks. verify.html
exercises the actual face model on the included photo. Phone feel still needs
device testing; use Head turn sensitivity to adjust the gain.
