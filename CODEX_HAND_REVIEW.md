# Current Codex review — hand build 30

This section supersedes the historical build-21 findings below. Movement is explicitly assigned to Codex; the old review-only scope is obsolete.

## Evidence inspected
- Claude RPS Hand mechanics tuning UI: build30 performance comparison and active user follow-up about which phone benchmark link to open. Composer empty, but user interaction was recent (one minute / just now), so no message injected this review.
- run_b30_stills.txt: 5/9 labelled gestures correct; dirty_peace, robbie_v and fist_pump missing, scissors_png classifies PAPER instead of SCISSORS. No runtime errors. Disabled head/body checks are not hand regressions.
- hard_raised_fist.png, visibly labelled build30: reference is a tight fist; mesh shows exposed broad palm and separated hanging finger pads rather than a tight closure. HUD says hands0 despite retained L depth: could be a held stale pose. This frame cannot isolate a rig failure from detection loss. Recapture with timestamped valid landmarks, or freeze a known valid pose, before changing the rig.
- hard_handshake1.png, visibly labelled build30: raw landmarks cover parts of both interlocked hands while a single hand mesh is rendered. This is an occlusion/landmark-assignment limitation; the rendered open hand is not evidence that skin weights alone are wrong. Separate raw tracking from mesh deformation in the report.

## Feedback for next safe handoff
The measured480px input comparison and phone CPU/GPU/one-hand benchmarks are sensible next steps. Do not generalize desktop timings into a phone diagnosis, and do not say the phone is definitively the cause before those measurements arrive. Reprojection/gesture classification does not certify mesh realism. Validate the tight fist with a currently valid raw pose, followed by a short curl sequence for nail roll, thickness changes and intersections. No perfect-hand claim is justified by the inspected stills.

Movement handoff: current public prototype is /movement/?v=27, commit5315c28. It uses camera thumb controls, not the old pinch plan: v23 thumb-base-to-tip lateral measurement; sideways input takes priority to prevent involuntary diagonals; straight thumb forward, partial curl backward, thumb wrapped over other fingers rest; explicit Rest/Resume; separate head/body look. Screen thumbstick and index strokes optional. Source is isolated in C:/Users/D1/Documents/New project/movement-publish-20260910. Preserve docs/movement; do not copy old shared sources over the published version.

---
Historical review follows; do not send it as a current regression report.

# Codex visual review — build 21

The user assigned Codex to review hand tracking and realism alongside Claude. Current scope is hands only, first-person and mirror. Navigation is not the assigned task.

Reviewed the actual local images compare_arm21.png, compare_thing21.png, shot_t_thing.png, shot_t_fist.png, and sheet_t.png. The shot_t images display build 20; the comparison sheets display build 21. Do not treat the older images as proof of a new regression.

## Visual findings

- Both build-21 sheets, raised_fist.jpg (tile 4): the reference closes tightly; the render has an open C-shaped thumb and a broad, exposed palm. Finger pads look like hanging cylinders rather than a compact fist. Needs closer pose matching, especially thumb opposition and PIP/DIP flexion.
- Thing build-21 counting.webm at 1.5 and 4 seconds: oversized finger pads and inconsistent nail roll; the reference has a tighter curl. Compare full-resolution frames before judging individual intersections; these sheets alone cannot prove mesh penetration.
- Thing skin has richer surface detail, but deep radial palm folds and staples read as a creature hand. The arms model is the more natural human baseline. Preserve the user's preferred skin detail while fixing deformation; lighting alone cannot repair anatomy.
- Both sheets, gesture67.webm at 5 seconds: most of one hand is hidden behind the checkerboard floor. Investigate scene occlusion separately from rig deformation. The floor must not obscure hands in this hands-only view.
- Several comparison crops cut hands off at the pane boundary. Add fully framed inspection renders; preserve same-camera uncropped comparison frames for alignment assessment.

## Code findings to investigate

- docs/index.html makeRigSkin: e.off is generated for ANY edge whose rest head differs from its landmark by >0.01, then anchored to the PALM frame. This is appropriate only for a true palm/metacarpal attachment; applying it to phalanges pins a joint to the palm instead of its moving parent. Audit each affected bone and its parent before changing it.
- frameDir / boneFrame rebuild twist independently using a blended global palm reference. This can roll nails and twist neighbouring segments when a finger approaches the reference axis. Inspect nail orientation through a continuous curl; consider preserving rest-relative roll with a coherent per-finger frame.
- makeRigSkin fit=rigged does not call poseFK, unlike makeSkinFrom. Thus the advertised rotation-only fallback does not apply to arm/Thing rigs as written.
- Per-chain ratio uses a peak with 0.999 decay, so a noisy large estimate can keep a finger swollen for many frames. Calibrate stable hand shape using trustworthy frames; separate shape dimensions from pose rather than relying on maxima alone.
- makeHand chooses handedness using thumb-tip displacement dotted with palm normal. Near-coplanar poses can change its sign without changing the real hand. Test chirality continuity with thumb tucked, palm/back rotation and hand crossing.

## Next evidence needed

Fix one cause at a time and return a versioned sheet with photo+raw landmarks, mesh+landmarks, and clean mesh from the identical camera. Include left/right open palm, back of hand, fist, V, thumb opposition, pointing, edge-on wrist and curl sequences. Check actual mesh joint/pad placement, not only the tracker fit HUD. Keep lines off for the normal user view.

Static images cannot establish temporal stability or absence of intersections. Follow with short slow/fast curl and wrist-rotation sequences; report clipping, roll flips, hand swaps and thickness changes explicitly. No claim of perfect tracking is justified by the current evidence.

## Follow-up verification

- Runtime inspection of both `arm` and `thing` variants shows `e.off` is set only on the four metacarpal/base edges (`j = 5, 9, 13, 17`). All phalange edges are zero-offset. The broad anchoring concern above is therefore not the current root cause; keep the metacarpal treatment unless a render proves it wrong.
- `python web_test.py` reaches build 21 and detects `SCISSORS`, but then fails after 30 seconds because it still waits for the removed `#game` element. Update the smoke test to the hands-only DOM before using its exit code as a build gate.
- The smoke-test update is committed on `codex/hand-audit` as `413bda3`; cherry-pick it when the active hand-rig work is settled. It passes against build 21 and still exercises all three tracking modes.
