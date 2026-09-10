from pathlib import Path
p=Path('CODEX_HAND_REVIEW.md');old=p.read_text(encoding='utf-8')
new='''# Current Codex review — hand build 30

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

'''
p.write_text(new+old,encoding='utf-8')
p=Path('MOVEMENT_HANDOFF.md');p.write_text(p.read_text(encoding='utf-8')+'''\n\n## Current movement27 — supersedes earlier controller instructions
Public /movement/?v=27, commit5315c28. User requested v23 lateral steering restored and removal of index-knuckle connection. Restored exact thumb-base(2) to tip(4) lateral measurement, existing gain/deadzone; removed cyan index line; sideways takes priority over depth, so straight thumb does not force diagonal walking. Straight=forward, partial curl=backward, wrapped thumb=rest; Rest/Resume and head/body separation preserved. No photo matching/calibration. Screen joystick and index optional.17 tests pass. User phone drift reports motivated this change; do not claim phone validation. Latest automatic review in CODEX_HAND_REVIEW.md covers handbuild30. Handoff injection deferred due active user exchange in Claude; no user draft touched.\n''',encoding='utf-8')
