# 2D line lab: depth and OK-contact assistance

Changes on `hand-sweep-neck/hands-lines.html` only; other drivers retain their defaults.

- Depth mode uses photo reference segment lengths and camera-ray/sphere intersections. Camera line displacements are retained where geometrically feasible. Tracked relative Z and a small previous-branch preference disambiguate the two possible depths.
- Inconsistent projected lengths preserve bone length and produce visible image residuals.
- OK contact detects thumb/index proximity in preview pixels, with 35 px entry and 50 px release defaults. Symmetric fixed-root, fixed-length chain fitting closes the tips in 3D. This is a contact assumption based on screen proximity, not measured physical contact.
- Both toggles off reproduces the prior attached-root, variable-length flat mode. No flexion limits or curl presets are introduced.

Validation on 2026-09-17:

- Seven Node tests pass: perspective reconstruction at three aspect ratios, anchored screen directions, inconsistent measurements, reachable/unreachable contact, straight-chain contact, and release hysteresis.
- Replayed all 274 available recorded poses (273 clip frames plus OK photo) through the live page's acceptance/render path, using existing detections. All finite; root and length errors below 1e-9 mm (floating-point noise).
- Contact triggered on 100 replayed poses; all resulting numerical tip gaps below 0.5 mm. This does not validate whether every trigger represented actual physical contact. Median computed gap 0.00058 mm.
- Original OK photo: approximately 19.57 mm tip separation with contact off, 0.0149 mm with contact on. Observed tracking gap 31.8 px on the 640 x 853 preview.
- Visually inspected fist, Spider-Man, OK, and extended fingers in front, side, and approximate eye-side views. Recorded video lacks a measured eye position, so these are inspection cameras.
- Turning both switches off restored 0.00 px relative-line mismatch and 0 mm per-finger depth span on the extended-finger pose.
- Local pure-JS benchmark: ten finger solves and one already-closed contact, median 0.206 ms, p95 0.367 ms over 500 iterations. Excludes tracking, rendering, and a difficult contact solve; not a measurement on the user's device.

Remaining uncertainty: monocular depth sign and photo proportions are estimates. Hidden geometry, true anatomical accuracy, phone connection, and live end-to-end latency are not established by this replay. Contact reports joint endpoints, not a skin collision calculation.

Local visual replay harness: ignored `.lab-qa/line-depth-live.mjs`, opened via `hands-lines.html?lineDepthQA=1` on localhost. It uses the existing ignored `clip-replay.json` and source frames. No private photos or recordings were added to publication.
