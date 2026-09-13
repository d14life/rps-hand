# Palm PnP 1

Separate depth experiment based on Sweep 2.4. Open `index.html` through a web server.

## Use

1. Connect the PC camera or scan **Phone camera · QR**. The phone streams ordinary video; MediaPipe, OpenCV and rendering run automatically on the PC.
2. Select **OpenCV PnP**. Approximate camera intrinsics let you preview immediately, but the displayed centimetres are not calibrated measurements.
3. Measure wrist landmark to middle-finger base knuckle and enter millimetres. The default 75 mm is only an assumption. The same physical reference length applies to both hands.
4. For a calibrated test, expand **Calibrate camera with an iPad target**, open its target link on the iPad, and capture at least eight views. Keep the phone fixed; move and tilt the iPad across the frame, keeping all nine crosses visible. Click their centres in order 1–9 in each frozen snapshot, then press **Calibrate camera**. Keep the lens, zoom and crop unchanged. Calibration lasts for the current page session.
5. Compare against **Palm-size baseline**. This bypasses PnP solving. Optional contact and collisions default off so they do not conceal differences between the depth methods.

The live preview shows tracking lines on black. Calibration snapshots show the actual target to allow clicking. No printer is needed: intrinsic calibration uses the grid's relative geometry; measured palm size supplies the hand's metric scale.

## Method and limits

OpenCV `solvePnP` fits a fixed planar template of landmarks 0, 5, 9, 13 and 17 (wrist and four base knuckles) to their image coordinates, using camera intrinsics and distortion. The template's proportions come from the fixed doll palm, scaled to the entered length. It is not reconstructed from live MediaPipe world coordinates. Distal finger points do not affect this solve. A larger measured palm produces a proportionally larger estimated distance for the same image.

PnP estimates rotation and translation together; this variant uses its wrist depth for hand placement. Finger articulation and palm orientation remain driven by the existing MediaPipe retargeting. The virtual mirror retains its existing projection and head positioning. This is a depth-method comparison, not full calibrated 3D registration of the face and both hands. The fixed planar palm approximation, landmark noise, occlusion and nearly edge-on views can still cause error; a low reprojection error alone does not prove the true distance is correct.

The displayed PnP timing measures the small solve on each new hand observation, not camera latency or total tracking cost. Rejected solutions explicitly fall back to the original size method. Known-camera aspect changes also trigger fallback. A same-aspect lens/crop change cannot be detected automatically; recalibrate after such a change.

No TrueDepth capture is implemented here. That requires a native iOS depth capture source and synchronization/transport of depth with RGB frames; ordinary browser camera video does not carry the required depth map in this application.

## Verification

`pnp-check.html` runs actual OpenCV.js checks: known distance/rotation recovery, independence from distal finger curling, proportional physical palm scale, invalid input rejection and intrinsic/radial-distortion calibration recovery from twelve synthetic target views. The main page also includes a nine-pose known-depth self-test. These numerical checks are not validation of a user's camera or live tracking accuracy.

Official references:
- https://docs.opencv.org/4.13.0/d5/d1f/calib3d_solvePnP.html
- https://docs.opencv.org/4.13.0/d9/d0c/group__calib3d.html
- https://developer.apple.com/documentation/avfoundation/streaming-depth-data-from-the-truedepth-camera
