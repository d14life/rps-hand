# Tracked mesh hand

Replaces the capsule renderer in `rps-hand` with the rigged human hand from the user's `hand.zip`. The marble sculpture and curl presets are not used by this implementation.

## Mapping

The asset has the same 21 landmarks as MediaPipe: wrist 0, thumb 1-4, index 5-8, middle 9-12, ring 13-16, pinky 17-20. Joint centres were initialized with the project's HandLandmarker model on front/back orthographic renders, then projected into the mesh between its front and rear surfaces. This is estimated geometry, not anatomical ground truth.

At runtime the renderer accepts the existing filtered/predicted world coordinates after `toGL`, before the old canonical-length `retarget`. Every rig joint is placed at its corresponding tracked point. Each segment rotates toward its next point and stretches along its length; finger thickness follows palm scale. The existing tracker, image overlay, camera placement, prediction, game, two-hand slots, and physics remain in place. Collider centres use the same points as the rig.

The `JOINTS` overlay reads the actual bone positions. It does not draw an independent decorative skeleton. Inputs use true GL coordinates (x, -y, -z). Left hands reflect the right-hand source; the parent world group handles the camera-view selfie reflection. The first-person view and opponent pose logic remain intact. Invalid, nonfinite or collapsed poses are rejected without corrupting the previous pose.

## Deformation

The scanned mesh's automatic heat weights leaked into adjacent fingers. The delivered weights instead assign each digit to its own phalanges, blending within that finger around each joint and into the palm near the base. All vertices have normalized weights; terminal finger vertices follow the corresponding distal phalanx.

`TrackedHand.js` uses dual-quaternion rotation with blended stretch to retain volume while matching tracked segment lengths. It supplies the same deformation to shadow materials. The GLB remains a normal skinned asset, but other viewers use their own skinning implementation and won't automatically apply the custom volume shader.

## Checks

Serve the repository and open `hand/verify.html` to inspect rest, scissors, thumbs-up and left-hand pointing fixtures. The fixtures were detected using the same HandLandmarker model URL as the application. The page reports exported joint alignment, actual joint-to-target error, weight normalization, shader compilation, and invalid-input rejection.

The app's sample selector runs actual inference on the chosen photograph. `?img=victory.jpg`, `?img=thumbs_up.jpg`, `?img=pointing_up.jpg`, and `?img=woman_hands.jpg` allow checks without a webcam. `open-hand.jpg` is a render of the source mesh, labelled as a reference rather than a real-camera test.

No physical webcam session has been verified here. The tracker can misestimate occluded joints, and extreme finger contact can still cause skin intersections. Exact numerical bone placement does not establish anatomical accuracy or guarantee realistic tissue deformation.

## Asset provenance

Source mesh and textures: user-supplied `hand.zip`, internally `model.dae`. Original texture appearance retained at 1024 px for this web asset. Runtime mesh has 17,822 vertices before glTF seam splitting. `rig.json` contains its rest coordinates and names. The existing sample photos came from the original project's MediaPipe assets; `woman_hands.jpg` is unchanged from upstream.

MediaPipe model documentation: https://ai.google.dev/edge/mediapipe/solutions/vision/hand_landmarker

## Mirror test variant

This separate `/mirror/` page removes the opponent, game and physics scene. It uses the phone-camera projection and a single selfie reflection with a 1x�2x zoom control. Live detection and joint mapping are unchanged.

Skin uses original source albedo, normal and roughness maps at 2048 px, with a fair-skin color transform that retains the source detail. Five curved nail shells are projected onto the source mesh and follow its local skin weights to prevent sinking during deformation. Vertex colors distinguish the pink nail bed, lunula and ivory free edge; the nail material has a smoother coated response than the skin.

## Fold deformation correction

Finger rotations now propagate along each digit instead of solving each segment independently against the palm. Surface weights are smoothed over connected mesh edges, with wrist and fingertip anchors retained. A 75% affine / 25% volume-preserving blend limits deep-fold bulging; normals use the same blend. Nail shells inherit the corrected nearby skin weights. The default zoom is 1x and joint markers are enabled for direct comparison. Thumb-down is included in the regression fixture page.
