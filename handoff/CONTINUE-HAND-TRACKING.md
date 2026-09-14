# Alignment update — 2026-09-14

The old unfinished midpoint description below is historical. The existing PnP page and both Sweep pages now share corrected reference geometry and an image-ray finger driver. See `docs/hand-pnp-photo/README.md` for current implementation and verification.

Done: paired/symmetric thickness centres, palm-base pivot, visible actual model lines on both hands, same source-derived proportions in PnP and Sweep, real screenshot overlay comparison, and PnP/Sweep links on the front page. Image 1 matches the traced reference to <0.001 px; image 2 is approximately 0.408 px RMS / 1.194 px max. Live physical metric accuracy remains unverified; do not describe it as exact.

---

# Cross-PC hand tracking handoff — 2026-09-14

Repository: https://github.com/d14life/rps-hand.git — branch main. GitHub Pages publishes docs/. Last implementation commit: 9d9addf. This handoff is context; do not change every historical version.

## FIRST: unfinished user request

The user wants ALL tracking reference points inside the hand, centred through its thickness at the appropriate joints. Landmark0 must be at the palm base, midway between front/back surfaces, NOT the mechanical wrist ball or a surface vertex.

Latest photo fit moved the wrist reference but **did not guarantee thickness centring**. The assistant admitted this. Next work: inspect actual mesh geometry, establish front/back surface pairs along appropriate local thickness axes, place internal points at their midpoints, and make PnP, rendering, articulation and markers use consistent references. Verify visually and numerically. Do not call a vertex average a measured thickness midpoint. Preserve fixed dimensions during live tracking. Screenshots cannot establish exact physical 3D proportions.

## Current pages

* Photo-hand PnP: https://d14life.github.io/rps-hand/hand-pnp-photo/?v=photo1
* Photo/model comparison: https://d14life.github.io/rps-hand/hand-pnp-photo/reference.html
* PnP Simple + orbit: https://d14life.github.io/rps-hand/hand-pnp-check/?v=check2-orbit
* Non-PnP Sweep + new captures: https://d14life.github.io/rps-hand/hand-sweep-check/?v=sizecheck2
* Original Sweep: https://d14life.github.io/rps-hand/hand-sweep-neck/?v=touch2.4.18
* Older PnP: https://d14life.github.io/rps-hand/hand-sweep-pnp/?v=sweeppnp1
* Earlier Simple: https://d14life.github.io/rps-hand/hand-pnp-simple/?v=pnpsimple2
* Depth experiment: https://d14life.github.io/rps-hand/hand-video-depth/?v=vda2-phone3
* Separate scale experiment: https://d14life.github.io/rps-hand/hand-scale-reference/?v=scale0925v2
* Modelling lab: https://d14life.github.io/rps-hand/hand-lab/

Query strings are cache-busters, NOT immutable archives. Separate directories preserve alternatives. Recent PnP work did not change the original Sweep directory; verify Git rather than guessing.

## User priorities and unresolved observations

* iPhone sends VIDEO ONLY through QR/WebRTC. PC runs MediaPipe and renders with WebGL. Preserve this architecture.
* Both hands should share fixed model dimensions. Closing fingers must not resize bones or directly drive root depth.
* User dislikes extra settings, delayed smoothing, changes to unrelated versions, speculative explanations stated as fact, and claims of live success from sample tests.
* Bringing hands/fists toward screen centre caused unwanted depth changes; moving sideways/rotating also caused errors. Exact live cause remains unverified. Possible landmark changes, projection/rotation error, or enabled contact corrections. Do not claim proven cause without measuring these separately.
* Original failure screenshot:63 motion frames, start0/3, neck5/3, palm outside frame17 checks; previous capture retained. Finishing a timer was not successful calibration.
* Head slider movement should not pull hands. Contact assistance is optional. Simple has no collision pushes or snapping.
* CPU model timing means joint/matrix calculations. CPU render submission is not GPU execution time. Scene uses WebGL; tracking requests GPU. Earlier camera FPS/ICE problems were not conclusively diagnosed and user later said camera recovered.

## PRIMARY code: docs/hand-pnp-photo/

* photo-hand.mjs: fitPhotoHand and PHOTO_POINTS,21 traced pixel centres from first screenshot.
* lab.mjs: applies photo fit after rig.ready, before tips/drivers. PnP reads modified rig.rest. Includes live status and orbit.
* direct.mjs: builds fixed-length chains from rig.rest; sets Hand root at landmark0. This is why consistent origins matter.
* palm-pnp.mjs: OpenCV EPnP then ITERATIVE.
* contact.mjs: geometry tip extraction. lab overrides tip vectors with photo targets; extra tipInset starts at0 to avoid adding length beyond reference.
* reference.html: traced source and model at matching flat-view scale, with orbit. NOT proof of live physical accuracy.
* Shared original model: docs/doll/DollRig.js, docs/doll.glb, docs/doll-report.json. Avoid changing shared assets and breaking other pages.
* tools/doll/build.py anchors Hand at biggest forearmKnot, explaining original wrist-ball origin.

Current fitPhotoHand:
1. Snapshots original geometry, rest joints and tips.
2. Selects largest outer palm mesh, excludes forearmKnot hardware.
3. New origin is centroid of proximal3mm vertex band along wrist-to-middle axis. R shift44.139962 model mm. **Not explicit front/back midpoint.**
4. Fits first screenshot projected knuckle and finger-segment ratios, anchored to model palm length. Preserves old normal-depth offsets because screenshots cannot determine them.
5. Left targets mirror right exactly. rig.rest feeds both PnP and driver.
6. Deforms palm once with inverse-distance weighted control displacements; transforms each finger mesh once between endpoints. Wrist hardware retains original rest location behind new tracking origin.
7. Bakes geometry into parent coordinates and recomputes normals/bounds. Runtime thickness remains .9 by default. No live resizing.

Reference images: handoff/reference-images/hand-landmarks-open.jpg and hand-landmarks-comparison.jpg. They are tracking-line screenshots, not skin/depth scans. Second image is not used to resize the hand because shortening can be foreshortening. Do not claim it measures a physical fist.

Verified: finite vertices, mirrored targets, algebraic2D agreement with traced points, visual comparison, page startup, sample PnP(~0.2px), capture tests. NOT verified: all points thickness-centred, exact physical dimensions, matching all live rotations, user's live neck alignment. Recalibrate after changing geometry.

## PnP assumptions

Five correspondences:[0,5,9,13,17]. Model uses Hand/Index1/Middle1/Ring1/Pinky1 offsets from Hand origin. Real OpenCV solvePnP EPnP seed + ITERATIVE refinement, also previous-pose seed. OUR additions: reject invalid/behind-camera poses, root outside .04..4 model m, normalized RMS>.015; prefer continuity when errors differ<.0005. Invalid result holds previous valid pose; initial placeholder .5m.

Camera K approximates60-degree vertical renderer FoV plus letterbox conversion, centre(.5,.5),zero distortion. This is NOT iPhone lens calibration. Fingers use MediaPipe separately. PnP is not a full articulated hand solver, nor a depth sensor. Latest Simple removed old size-based startup and palmObservation calibration gate.

Two improvements user explicitly said to KEEP FOR LATER: better photo/multi-view hand-proportion calibration, and real camera intrinsics/distortion calibration (checkerboard on iPad). Latest screenshot fit is an approximation, not metric calibration. Exact iPhone14Pro front FOV was NOT verified; Apple's120° refers to rear ultrawide. Native AVFoundation exposes format-specific horizontal FOV; actual browser crop/framing matters.

Sources: https://docs.opencv.org/4.13.0/d5/d1f/calib3d_solvePnP.html ; https://www.epfl.ch/labs/cvlab/software/multi-view-stereo/epnp/ ; https://docs.opencv.org/4.13.0/dc/dbb/tutorial_py_calibration.html

## New calibration in Check/Photo pages

experiment.mjs + capture-check.mjs:
1. Near: one open hand, palm toward user/back toward camera, fingers naturally up, face visible. Hand can be below face. Keep head/phone still. Waits2 steady seconds and10 fresh frames; movement>.025 model m or invalid tracking resets accumulation, not deadline.
2. Neck: move at own pace, press when palm gently touches front neck below jaw; face visible. Another2 steady seconds. Same hand label.
3. Optional check: touch index fingertips.20 paired fresh observations; image gap<.025 normalized; reports median modeled landmark-tip gap(pass<=15mm), no snapping. This checks relative agreement, not absolute distance, and is not another fit.

neck-sweep.mjs uses endpoint samples, not a learned whole trajectory. Requires depth increase>5%, face/neck samples and bounded residual. Fits headScale=sqrt(palmDepth/neckDepth),handScale=1/headScale; headOffset=median(handScale*palm-headScale*neck). Reports scales/offset/residual; attempts next-frame rendered neck-reference check and warns gap>3cm. This is internal consistency, not physical accuracy.

Before/after toggles same fit. Starting near clears prior fit. References are in page memory only. Optional shoulder distance(defaultOFF,50cm) requires captured shoulders; reference-scale.mjs scales all geometry and positions together, deliberately preserving mirror appearance. Contact/collision corrections pause during capture/check. Orbit control rotates/pans/zooms and returns to mirror on calibration.

## Non-PnP Sweep Check sizecheck2

simple-size-depth.mjs: median raw2D edges[0,5],[0,9],[0,13],[0,17],[5,17], aspect-corrected. depth=focal*fixed median model edge/image span. Fingers excluded. No PnP and no angular SIZE compensation. MediaPipe normal only holds unreliable observations when facing<.45 or confidence<.5. Moderate foreshortening can still change depth. Same near/neck calibration. Optional contact controls can separately move the rendered hand.

Tests prove invariance to translating identical landmarks sideways, exclusion of finger endpoints, inverse-size relation and edge-on hold. They do not prove real MediaPipe points stay constant.

## Historical Sweep facts

Old touch2 code at03f1bb8: docs/hand-touch-calibration/experiment.mjs and size-wall-depth.mjs. Also wrist/knuckle spacing only, NOT palm/full-hand ratio. Captured median start/end spans and estimated hand/neck depths. Live t=(startSize/currentSize-1)/(startSize/endSize-1), depth=startDepth+t*(endDepth-startDepth). Close endpoint sizes amplify noise.

Original2.4.18: palm-sweep-depth.mjs rotation/perspective-corrected palm span; whole-hand-placement.mjs actually refines only palm XY at fixed depth. Calibration scales hands/head and shifts head; rear-plane/contact corrections separate. Recent Check/Photo pages did not modify it.

## Depth-map and connection experiments

PeerJS1.5.4 negotiation-failed corresponds to ICE connectivity failure. Public TURN credentials were investigated but no confirmed cross-network fix. User said ignore it; do not resume unless asked. e4a4a7e fixes retry/error/timeouts only in hand-video-depth; copied other senders may have older logic.

VideoDepth2 requires LOCAL Python engine on new PC, not just GitHub page. See tools/setup-vda.ps1,setup-vda-gpu.ps1,start-vda.ps1,video_depth_server.py,prepare_directml.py and docs/hand-video-depth/setup.html. Old PC used AMD RX6600 DirectML,Python3.12/torch2.4.1,localhost8788. Runtime/weights/venvs are not in Git. Upstream https://github.com/DepthAnything/Video-Depth-Anything revision4f5ae23172ba60fd7bc11ef671cca678842c7072,Metric VDA Small. Map is inferred, not TrueDepth.100% blend uses map-relative depth with frozen reference; stale map holds last depth, no palm fallback. GPU timing from old PC is not a guarantee here.

## Continue on another PC

Clone repository and use main. Read applicable AGENTS.md. Serve docs, e.g. python -m http.server 8776 --directory docs. Network needed for Three/MediaPipe/OpenCV assets. Follow available browser skill for QA.

Run:
    node --check docs/hand-pnp-photo/photo-hand.mjs
    node --check docs/hand-pnp-photo/lab.mjs
    node --test docs/hand-pnp-photo/capture-check.test.mjs docs/hand-pnp-photo/reference-scale.test.mjs
    node --test docs/hand-sweep-check/simple-size-depth.test.mjs

For unfinished midpoint fix: visualise local thickness axes, paired outer-surface intersections, and resulting centre points; account for multiple shells, ignore decorative hardware. Test both hands and ensure solver/rig/marker references coincide. Use open/closed/rotated tests, distinguish synthetic geometry validation from actual video. Keep original alternatives intact. Publish scoped changes with git push origin HEAD:main; verify Pages deployment before claiming published.

Old local recordings, unrelated gun archives, .lab-qa files, running servers/browser sessions, weights and environments are NOT transferred. Only latest relevant screenshot pair is included. Ask user for a specific older video if needed; don't assume access to old C: drive.

Recent commits:9d9addf photo fit;64f5916 orbit;6bffad7 raw-size Sweep;6c5c6e1 staged captures;f83f6a8 Simple startup/gates;8c7c056 Simple fork;e4a4a7e phone retry;e3c7f9b PnP/GPU experiments.

Be candid: user has repeatedly been told fixes worked without live validation. The anchor-thickness centring is unfinished. Carry that work through rather than restarting depth experiments.
