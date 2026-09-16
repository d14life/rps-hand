# Connected upper-body prototype review — 12 September 2026

This is an isolated experimental third tab, not a claim of perfect monocular reconstruction. Stable hand-combined-v20 files were not edited.

## Implemented

- Original rigid doll torso/arms/hands, alien bust attached to the chest with separate neck/head rotations; no leg meshes or pelvis mesh.
- Perspective palm-distance fit from fixed bone offsets, shared camera calibration, and a separate viewer FOV control.
- Fixed local joint translations and scales while tracking. Arm IK, palm frame and individual finger directions drive rotations.
- Separate capture coordinates and front/right/left/rear/eye viewing cameras. The render camera does not enter the pose solver.
- Neutral 468 face markers bound to actual skinned triangles; no expression classifier or mouth/eye animation.
- Full 33-point body packets in connected phone mode, plus hand and head packets. Phone computes tracking; PC renders. Local webcam inference runs locally.
- GPU preferred, CPU fallback, uncapped task dispatch, independent 60 FPS render target. Lite body model default; Full and Heavy optional.
- Optional mapped face/neck/scalp contact, actual triangle closest-point queries, bounded fixed-length finger fitting. These are assisted estimates, not sensed physical contact.
- Generic mesh surface registration for alien bust, room boxes, table, and movable can. Dwell/closing-hand grip hold; opening/loss releases; pull releases fixed surfaces; movable can follows the hand.
- Separate toggles for mapped body contact and surface fitting. Disable mapped body contact while holding a separate object in front of the face.

## Automated checks

`connected-check.html`: 32 arm reaches across four root rotations and both arms; eight complete rotated hand poses; twelve known-distance palm projections and a transformed surface-anchor regression; all local offsets/scales unchanged; transformed surface queries; table/can/head-like grip state matrix; release/open/dwell; small CCD adjustment.

Observed: maximum offset and scale drift 0; arm reach error below 1e-9 m; maximum finger direction error 2.11e-8 rad after correcting the last phalanx to use the mesh tip vector. Browser harness explicitly asserts the result `pass` field.

Existing face-overlay, shared head-depth, landmark-jitter and body-pose test suites pass. Syntax checks and git whitespace checks pass.

## Independent review

Two GPT-5.6-luna reviewers assessed code, test coverage and saved front/side/rear screenshots. Findings led to final-axis correction, stale-face gating, explicit phone-mode defaults, surface-attached grip anchors, camera-selector implementation, first-person rest-frame correction, and broader rotated hand tests.

## Internet photo fixtures

Sources are local test inputs only; full source images are not published with the app.

- Scalp: Eric Paul portrait, https://shop.theheartworm.com/pages/eric-paul
- Cheek: https://www.clinicanovoa.es/bichectomia.aspx
- Neck: https://gladskin.com/blogs/resources/eczema-hope-with-jeremy-paredes
- Temple: Lucas Almeida, https://unsplash.com/photos/man-poses-thoughtfully-with-his-finger-on-his-temple-rfrfpSoVT7I
- Forward thumb: https://www.sport-express.ru/zozh/reviews/glaza-gimnastika-i-uprazhneniya-dlya-uluchsheniya-zreniya-kakie-produkty-polezny-i-kak-sohranit-zrenie-1940866/
- Mug: https://www.azusainaba.com/about

Front, right, left, rear and eye camera captures were used during review. Static image inference rates are not live phone performance benchmarks.

## Unresolved limits — do not mark perfect

- Single-camera depth, hidden fingers and occluded arms remain estimates. A photo cannot establish their ground-truth 3D shape.
- Some body poses (notably the partly occluded opposite arm in the temple photo) do not faithfully match the source. Full body inference did not clearly resolve that example and cost more processing time.
- Face/neck contact nomination is a camera-alignment heuristic. The correction limit is exposed; this can move the wrist away from raw tracking. It must not be described as measured one-to-one depth.
- Contact fitting is bounded and can leave gaps or other segment intersections. It is not complete whole-hand collision physics or guaranteed automatic grasping of every shape.
- Objects must exist as registered 3D meshes. The app does not reconstruct an arbitrary real-world table/cup from the camera.
- Inferred hidden hands are not rendered as confidently detected hands. Static tests cannot verify live recovery or jitter under occlusion.
- Actual iPhone-to-PC live-session performance and physical hand-contact accuracy still require live-device validation; no 30/60 FPS guarantee is made.

The user has been asked whether one-time personal proportion calibration is allowed before locking dimensions; no dynamic proportion changes were introduced.

Latest five-view object check: front, right side, left side, rear and eyes inspected. The dwell state reached held, but side views show incomplete finger wrapping and incorrect opposite-arm placement. This is a failed visual acceptance check despite passing fixed-dimension and anchor tests. No claim of complete grip/contact accuracy. Anchor regression error: 6.21e-17 metres. Proportion-calibration choice remains pending; no model dimensions changed.


## Demo 11: original doll head revision

The user requested the original doll head instead of the alien bust. The connected page now uses only the original rigid doll asset, including its head, neck, shoulders and hands. No joint offsets or scales change during tracking. The previous alien attachment module was removed.

Fixed head quaternion temporary aliasing in an isolated posing helper, and pinned the actual rotated eye point before solving arms. Five head-angle tests pass (zero angular error; eye error below 1e-15 m). The shared stable DollRig module remains unchanged. Neutral face dots bind to the actual rigid head surface, including nearest-surface fallback for ray misses.

Undetected hands now retain an attached neutral mesh instead of exposing an open wrist. This is a fallback, not recovered finger tracking. Grip acquisition now requires opposing digit contacts and considers each candidate object separately. Disconnect resets camera calibration to avoid stale person/camera measurements.

Contact mapping is explicitly assisted: image overlap nominates face-depth contact, then bounded wrist correction and finger fitting use the actual surface. This can misinterpret a separate object or a forward hand overlapping the face: disable mapped contact in those situations. No claim that monocular image overlap measures physical contact.

Six real internet photos reviewed from front, both sides, rear and eyes. Remaining limitations include occluded arms, inaccurate finger depth, and incomplete wrapping. Static photo inference rates are not phone performance benchmarks.

Final capture set: doll-final-{cheek,neck,scalp,temple,forward,mug}-{front,side,left,rear,eyes}.png, saved outside the published site. Each image ran through the actual tracker; final captures waited for hand, face and body inference to start and settle. Forward and mug tests disable mapped face-contact assistance. Review still fails full-pose accuracy: neck/scalp finger placement and occluded opposite arms are unresolved. This is a review build, not a claim of completed accurate full-body contact.

Finger direction fitting now projects the visible image coordinates at estimated depth instead of using separate world-landmark X/Y, to reduce disagreement with camera overlay lines. Bone lengths stay fixed. Estimated Z and occlusion remain limitations.
