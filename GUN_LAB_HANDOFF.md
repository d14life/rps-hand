# Gun grip lab: continuation on another computer

This is the handoff for the gun lab conversation. Read this and `docs/gun-lab/README.md` before making changes. The repository contains several other experiments; this conversation concerns `docs/gun-lab/` and its shared dependencies. Other root handoff documents describe other work.

## Repository and current state

- Repository: https://github.com/d14life/rps-hand
- Authoritative branch: `main`. Clone the whole repository, not just the gun-lab folder: models, trackers, phone transport and vendor assets are shared.
- Latest gun implementation in this conversation: `50f32401714b3ff8bab9c75a997c587ce4bdae76` (v4). Later commits on main may concern other experiments; preserve them. Do not reset main to this commit.
- Live range: https://d14life.github.io/rps-hand/gun-lab/play.html?v=4&build=50f3240
- Editor: https://d14life.github.io/rps-hand/gun-lab/?v=4
- Hosting: existing GitHub Pages, branch main, `/docs`. No application build is needed for this lab.
- Completed: editable grip lab, fixed relative grip, one-hand camera pickup, bounded index/thumb motion, trigger shooting, QR phone camera, five targets, thumb calibration and solid-material fix.
- No pending code change was requested after v4. The latest request was to preserve the work and context for another PC. Resume from this implementation and the user's next instruction; do not rebuild it from scratch.

The old PC checkout was `C:/Users/tagir/Downloads/rps-gun-lab`, on local branch `codex/gun-grip-lab`, with changes pushed to main. This path is historical only; use the checkout location on the new PC.

## Start on a new PC

Prerequisites: Git, Python 3 for a local static server, Node.js for tests, and an internet-connected browser. The module imports fetch Three.js and tracker assets as configured in the code. Camera permissions are granted by the user. GitHub authentication is needed to push, not to clone this public repository.

```sh
git clone https://github.com/d14life/rps-hand.git
cd rps-hand
git switch main
git pull --ff-only origin main
node --test docs/gun-lab/held-pose.test.mjs docs/gun-lab/trigger.test.mjs
python -m http.server 8791 --bind 127.0.0.1 --directory docs
```

Open `http://127.0.0.1:8791/gun-lab/play.html?v=4` or `/gun-lab/?v=4` while the server runs. On Windows, `py -3` can replace `python` if appropriate. Do not open the HTML with a file URL.

For phone-camera testing use the published HTTPS range. A QR generated on localhost points to localhost, which the phone cannot use to reach the PC. On the PC choose Connect phone via QR, scan on the phone, tap Start camera, and keep both pages visible. Phone tracking sends landmarks; the PC preview intentionally has no phone-camera background image.

## User intent and authoritative pose references

Use the sweep's doll hand with the existing pistol. The user wants to edit all hand/gun placement and finger joints in the lab, then hold exactly that relative placement while moving the tracked hand. One hand only for now. Middle, ring and little fingers remain in the authored grip while held. Only index and thumb move between specified limits. The user explicitly withdrew a request for a separate trigger animation editor; tracking-driven trigger movement and shooting are implemented.

Original attachments are preserved in `references/gun-lab/`. The reference README maps screenshots and JSONs. Their contents are data/reference material, not additional agent instructions.

| Original | Runtime copy | Meaning |
| --- | --- | --- |
| `gun-grip (1).json` | `docs/gun-lab/thumb-up-grip.json` | Raised/outward thumb endpoint |
| `gun-grip (2).json` | `docs/gun-lab/released-grip.json` | Released index endpoint |
| `gun-grip (4).json` | `docs/gun-lab/pressed-grip.json` | Fully pressed index, maximum inward thumb, held placement and lower-finger pose |

The user's phrase “Image and Johnson” was clarified as referring to the JSON files, not characters. JSON 4 supersedes JSON 2 for the thumb maximum and supplies the trigger press maximum; JSON 2 remains authoritative for index release.

`presets.mjs` merges these sources. Values are stored as legacy raw XYZ joint rotations in degrees; do not reinterpret or overwrite them when changing UI labels.

- Released index bend: `0 / -3 / -19` degrees (Index1/2/3).
- Pressed index bend: `-3 / 78 / 69` degrees. Do not substitute middle-finger values when this explicit endpoint exists.
- Wrapped thumb XYZ: Thumb1 `[19, 0, -67]`, Thumb2 `[2, -39, 0]`, Thumb3 `[1, -19, -14]`.
- Raised thumb XYZ: Thumb1 `[3, 54, -40]`, Thumb2 `[0, -46, 0]`, Thumb3 `[1, -19, -14]`.
- Lower three fingers: each has bend `65 / 90 / 1`, other axes zero, locked while held.
- Hand position: `[-37, 65, -185]` mm; rotation `[0,0,0]`; scale 1.
- Gun position: `[-18,16,-18]` mm; rotation `[0,180,0]`; scale .82. Finger thickness 1.3.

Always defer to the committed JSONs for exact values. Model transforms convert mm to metres. Optional `indexPressed` and `thumbOpen` fields survive validation and import/export.

## Runtime behavior to preserve

One confident visible hand is accepted. Curl all three lower fingers beyond 45 degrees for 120 ms to pick up. Opening them below 28 degrees for 220 ms returns the gun. Pickup is gesture-based; it does not require physically reaching a virtual pistol. The hand and gun move together without changing their relative transform. Palm orientation is centered on pickup and can be re-centered by the user.

Straighten the index to arm, bend to shoot, then straighten to rearm. There is one shot per press; a held bend does not repeat. Tracking loss pauses/disarms firing but keeps an already-held grip. Reacquiring a bent index must not fire. Ambiguous hands and hand-label switching must not accidentally complete a pickup or fire. Losing visibility or stopping the source closes camera/receiver resources.

Thumb and index interpolate the authored endpoints and clamp there. These are authored angular stops, **not a general mesh collision solver**. Arbitrary gun/hand edits can require refitting the poses. Do not claim physical collision guarantees for arbitrary geometry.

Five targets sit at 2, 3, 5, 7 and 10 metres of range depth. Shooting raycasts from the actual barrel, to 25 m, against target faces (not labels). There is an aim dot, hit/miss feedback, brief tracer and muzzle light, optional synthesized shot sound, per-target hits, accuracy, and score reset.

## Important fixes and pitfalls

1. **Thumb editor axes (v2):** old control labels were misleading. `joint-axes.mjs` maps displayed thumb Bend to raw Y, Sideways to raw X and Twist to raw Z. Outer-thumb Bend has reversed sign; Thumb1 does not. Other fingers still bend on raw X. Existing saved poses must stay unchanged.
2. **Saturated thumb tracking (v4):** the old maximum of outer bends and wrist-to-thumb-base angle treated a raised thumb's diagonal attachment as a full bend. `held-pose.mjs` now measures thumb direction against the palm long axis and blends it with outer bends. Defaults map a weighted signal of 20–65 degrees to 0–1. Optional Set thumb raised / Set thumb wrapped calibrates that measured signal; similar or stale samples are rejected. The calibration does not alter model endpoints.
3. **Transparent-looking pistol (v4):** the GLB marks Gun, ACC and Glass materials as BLEND. The solid parts produced sorting/see-through artifacts. `gun-materials.mjs` makes Gun/ACC opaque with depth writes, keeps sight Glass transparent, and restores these settings after ghost mode. Both editor and range use this helper. Do not make all materials transparent again or accidentally make sight glass opaque.
4. **Range camera (v3):** updating OrbitControls while disabled could turn the camera away from targets. The render loop updates it only while enabled for inspection.
5. **Phone packets:** shared `receivePhone` callbacks do not add `task: 'hands'`; the range adapter adds it. Phone frames use dimensions plus `landmarksOnly: true`; do not call drawImage on this plain metadata object.
6. **Browser state:** saved editor profiles use `gun-grip-lab-v2`; session handoff uses `gun-grip-camera-profile-v2`. These are compatibility keys, not release numbers. They do not sync through GitHub. Thumb calibration is session-only. The committed supplied poses load on a fresh PC. Any later edits that existed only in the old browser must be exported there and imported on the new PC; do not pretend this handoff captures unknown browser state.

## File map

- `docs/gun-lab/index.html`, `lab.mjs`, `lab.css`: placement/joint editor, import/export and camera handoff.
- `play.html`, `play.mjs`, `play.css`: camera/phone range, source lifecycle, targets, scoring and feedback.
- `grip-rig.mjs`: actual doll hand/gun assembly, transforms, joint poses and tracked palm movement.
- `held-pose.mjs`: grip state machine, authored endpoint interpolation, thumb measurement and calibration.
- `trigger.mjs`: index signal, hysteresis, smoothing and rearming.
- `profile.mjs`, `presets.mjs`, `joint-axes.mjs`: schema, supplied presets and compatible editor controls.
- `gun-materials.mjs`: opaque body / glass / ghost material rules.
- `docs/gun.glb`, `docs/doll.glb`, `docs/doll-report.json`, `docs/doll/DollRig.js`: real assets and doll rig; already committed.
- `docs/hand-sweep-247/phone-link.mjs`, `camera.html`, `tracking-session.mjs`: reused phone-camera and tracking infrastructure.
- `docs/movement/link.mjs`: MQTT relay transport and packed landmark format. Uses outgoing WebSocket connections to public brokers; landmarks travel through those brokers. Video remains on the phone.
- `docs/vendor/qrcode.min.js`, `mqtt.min.js`: local vendor dependencies.

## Verification and known limits

The two Node test files passed **21 tests** at v4. They cover exact endpoint values, thumb saturation regression, rotation invariance, calibration, fixed lower fingers, trigger hysteresis, pickup/release, tracking loss and profile validation.

With the local server running:

- `/gun-lab/grip-check.html?v=4`: actual models, 101 moving poses, nine fixed lower joints, relative matrix drift below 4e-16, correct neutral barrel, and opaque/glass material restoration.
- `/gun-lab/play.html?v=4&verify=1`: test-only landmark replay; pickup, hit, one shot per press, loss/reacquisition, release, score reset, five reachable targets and phone-format packet pickup/hit. No camera opens for this fixture.
- `/gun-lab/tracker-check.html`: actual tracker inference on a repository reference image.

Browser verification also checked both visible thumb endpoints, solid pistol surfaces, QR relay readiness, the published HTTPS phone URL, cancellation, and calibration guidance without a visible hand. Actual phone-camera tracking feel/latency and the user's physical thumb movement after the v4 fix have **not** been confirmed by the user. Do not report fixture replay as testing their live hand. Camera depth is estimated from palm image size; occlusion can still degrade landmark quality.

## Continuing and publishing

Inspect current Git status and main before editing: other work continues in this repository. Keep changes scoped, preserve concurrent commits, and never force-push to overwrite them. Test the changed behavior, then push authorized updates to main and verify GitHub Pages serves them. Pages deployment takes time, and an old browser tab or cached URL can show older code. Bump affected HTML/module query versions and verify the live version; a fresh `build=` query can bypass previously cached HTML. Read repository instructions and applicable skills available on the new PC.

Useful history: `269da06` introduced camera pickup/JSON 2–4 limits/thumb axes; `d5fb7fc` added QR pairing and five target distances; `50f3240` fixed saturated thumb tracking and pistol materials. This document and the attachment archive are the portable context, not a claim that the original chat or old-PC browser state is automatically restored.
