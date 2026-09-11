# Work order: make the ball-joint doll player correct and fast

Paste everything below the line into ChatGPT (or any coding agent with access to this repository). It is self-contained.

---

## What this is

A browser game at `docs/movement/` (three.js, first person, walking around the Counter-Strike map Dust II). The player's
hands, head and body are tracked with MediaPipe from a webcam, or from a phone that runs the trackers and sends the
landmarks over a public MQTT broker. The player's body is a rigged ball-joint doll.

Live: https://d14life.github.io/rps-hand/movement/?v=74 — repository https://github.com/d14life/rps-hand

Your job: fix the performance collapse first, then work down the defect list. Everything below has been measured on an
AMD Radeon RX 6650 XT with headless Edge; reproduce the measurements before and after each change.

## How to run and measure

```
python -m http.server 8765 --directory docs
```

Then open `http://localhost:8765/movement/?v=74`. Useful URL flags: `?body=off|head|full|seated|standing`,
`?gun=0` (no shooting range or mirror), `?mirror=N` (reflection refreshes every Nth on-screen frame, default 3),
`?arm=` (arm scale), `?doll=0` is NOT supported — `docs/movement/body.mjs` is the retired avatar, kept for reference.

Automated checks exist and use Playwright with a still photo as a fake camera:
- `python -m http.server 8765 --directory docs` first, always.
- A frame-rate probe reports hand tracker fps, face fps, face inference ms and page fps from `window.dbg.handFps`,
  `window.head.perf` and a requestAnimationFrame counter.
- A rig probe reads `window.bodyRig.rig` (the `DollRig`) and `window.handModel`.
- Unit tests that MUST keep passing, unchanged: `node docs/movement/thumb-joystick.test.mjs` (25 tests), plus
  `fist-centre`, `swipe`, `thumbstick`, `held-pose`, `head-look`, `tracking-scheduler`, `controller`, `head` test files
  and `docs/body/pose.test.mjs`, `docs/head/edge.test.mjs`.

## The files that matter

| file | what it is |
| --- | --- |
| `tools/doll/build.py` | Blender 4.5 script: turns the user's FBX into `docs/doll.glb` + `docs/doll-report.json`. Re-runnable, and it re-reads its own output and asserts the result. |
| `tools/doll/render.py` | renders the doll from the front, the side, straight down and three-quarter, in six test poses |
| `docs/doll.glb` | 95 rigid parts, 44,917 triangles, 0.88 MB, 1.75 m tall. No skinning: a ball-joint doll is rigid parts. |
| `docs/doll-report.json` | the 50-joint tree (name, parent, rest position), the part-to-joint map, the eye position, and a `measure` block of proportions |
| `docs/doll/DollRig.js` | runtime rig: rebuilds the tree, attaches parts, two-bone IK, head angles, eye pinning |
| `docs/doll/verify.html` | browser test page: `?pose=rest|arms|ik|legs|fist|head&view=front|side|top|three|hand` |
| `docs/movement/doll-body.mjs` | the driver: eyes to camera, body yaw, head, lean, arm IK, palm, fingers, walking legs |
| `docs/movement/hand-model.mjs` | the hand TRACKER and solver. Still the source of the 21 hand landmarks (the gun grip, the punching and the doll's fingers all read them); its own mesh is no longer drawn. |
| `docs/movement/shooter.mjs` | the shooting range, the gun, and an 8 x 4 m mirror |
| `docs/movement/app.mjs` | the page. Several statements per line — a trailing `//` comment has broken it twice. Run `node --check` and load the page after every edit. |

## PRIORITY 1 — the page lags and the trackers starve

Measured just now, same clip and machine:

| | page | hand tracker | face inference |
| --- | --- | --- | --- |
| full scene | 85 fps | 25 fps | 48 ms |
| `?gun=0` (no range, no mirror) | 154 fps | 31 fps | 31 ms |

The trackers run in workers but share the GPU with rendering, so a heavy frame shows up as a slower tracker AND a
longer inference time. Two causes, both in the main thread / GPU path:

1. **The mirror re-renders the entire scene, and that now includes the 95-part doll.** It is a `Reflector` in
   `shooter.mjs`. It is already throttled (only when on screen, every 3rd frame, less often further away, 512 x 256, no
   multisampling) and it still costs ~45% of the frame rate. Options, in the order worth trying:
   - render the reflection with a *reduced* scene: put the map on one layer and the player plus the range on another,
     and let the reflection camera draw only what is near the mirror;
   - drop to every 6th frame beyond 4 m and every 2nd within 2 m;
   - a smaller target again (384 x 192) — the mirror is seen from 2-6 m;
   - measure each change, do not stack them blind.
2. **`DollRig.setWorldQuat()` calls `updateMatrixWorld(true)` on every joint it sets**, and the driver sets roughly 25
   joints a frame (two arms, 30 finger joints, neck, head, waist, chest, legs). Each call walks that joint's whole
   subtree. An independent review counted ~74,000 node matrix updates and ~8,900 allocations per second in this path.
   Fix: set every local quaternion first and call `root.updateMatrixWorld(true)` **once** at the end of the frame. The
   only places that genuinely need an intermediate update are inside `reach()` between the two bones. While you are
   there, hoist the per-frame `new THREE.Vector3()` allocations in `reach()`, `aim()`, `placeEyes()` and
   `doll-body.mjs` into module-level scratch objects — but note the trap below.

**Trap that has already cost a day here:** `aim()` writes to the shared module scratch vectors `_a`/`_b`. Any caller
that passes one of those in, or holds a value in one across an `aim()` call, silently corrupts it. That bug made the
arm IK miss by up to 39 cm. If you add more shared scratch, give each caller its own named vector and never reuse one
across two live values.

Acceptance: page >= 110 fps and hand tracker >= 28 fps on the full scene with the doll on, with the mirror still
working (you can see yourself in it, with a head).

## PRIORITY 2 — the confirmed defects

An independent review (three critics, every complaint then checked by a separate agent) confirmed 39 faults. These are
the ones still open, worst first. Each one says how to know it is fixed.

### The walk
1. **Both feet leave the ground.** `legs()` in `doll-body.mjs` rotates the thigh and knee on a sine and never
   references the floor; for most of the cycle neither foot is within 2 cm of it. Rewrite as: lock the stance foot to
   its ground contact point in world space, move the root past it, and swing the other foot along an arc to the next
   contact; solve each leg with `rig.reach(Thigh, Shin, Foot, footTarget, kneeHint)`. Verify by sampling both ankle
   world heights over a 3 m walk and asserting at least one foot is within 2 cm of the floor at every sample.
2. **No arm swing, no pelvis rotation.** Add contralateral arm swing (~0.25 rad, opposite phase to the same-side
   thigh) for whichever arm is not being driven by tracking, and a few degrees of counter-rotating pelvis and chest.
3. **Walking backwards or sideways plays a forwards stride.** Project the travel onto the body's forward axis for the
   sign, and at least rotate the stride plane by the travel direction.

### The arm and shoulder
4. **The shoulder tears open when the arm lifts — you look into an empty socket.** The humerus twist is unconstrained
   (`aim()` takes the minimal rotation, which leaves the roll arbitrary) and the clavicle is never driven. Give `aim()`
   a real target frame instead of a free rotation, derive the roll from the elbow's bend plane, and drive
   `LClavicle`/`RClavicle` from the shoulder's elevation (a fraction of how far the upper arm is above horizontal).
5. **No joint limits anywhere.** The elbow bend plane is unconstrained and the fingers are free balls. Project the
   elbow hint into the valid half-space (behind and below the shoulder in body space) before using it, and clamp each
   finger joint to a hinge.
6. **`Hips` and both clavicles are never rotated at all.**

### The hands
7. **The hand parts have stringing holes and open socket cavities bored through the fingers** — this comes from the
   source mesh and is visible whenever the hand fills the screen, which in a first-person game is most of the time.
   Fix in `tools/doll/build.py` before export: cap the holes and sink each phalanx ball so it does not poke through.
8. **The fingers do not close into a fist.** Measure it: drive the rig from a tracked fist and compare each finger
   joint with the tracked landmark. Current mean error 2.9 cm, worst 4.4 cm (the pinky). Target 1.5 cm.
9. **The thumb has no joint at its base** (no CMC), so it cannot oppose. It would have to be added in `build.py` by
   splitting the thumb root.

### The head and the feet
10. **The neck pivot is wrong** — `build.py` uses the centroid of the highest chest island instead of the neck ball the
    doll actually has, so the neck post drives up through the underside of the skull when the head tips.
11. **The doll stands on its toes.** Its ankle is at 0.228 m where a human's is about 0.12, and there is no toe joint,
    so the driver cannot correct it.
12. **`physicalRoll` does not exist** anywhere in the project, so head roll has always been zero. Either compute it
    (the inter-eye line angle, the way `docs/head/spatial.mjs` already does) or delete the parameter.

### Proportions, for reference
The doll is stylised. Measured, on a 1.75 m figure, against a real adult:

| | doll | human | note |
| --- | --- | --- | --- |
| arm reach (shoulder to wrist) | 0.470 m | ~0.52 m | the driver scales each arm 1.1 to compensate |
| upper arm | 0.242 m | ~0.30 m | 27% short |
| thigh vs shank ratio | 0.84 | 1.05-1.15 | thigh too short |
| shoulder width | 0.293 m | ~0.40 m | |
| ankle height | 0.228 m | ~0.12 m | stands on tiptoe |
| shoulder height | 1.406 m | ~1.44 m | close |
| hip height | 1.045 m | ~1.04 m | right |

Whatever you change, keep `docs/doll-report.json`'s `measure` block honest, and add `knee_height`, `ankle_height`,
`thigh` and `shank` to it, since those are the numbers that decide whether the legs can work.

## Rules

- **Measure before and after.** Every claim in this document is a number somebody took. Do not replace one with an
  opinion. For anything visual, render it and look at it — including a straight-down orthographic view, because three
  of the faults above are only visible from directly overhead.
- **Do not break the other agent's tests.** `docs/movement/` is shared with another contributor. If a change genuinely
  supersedes one of their rules, put the new behaviour behind a flag that defaults to the old one and cover it with a
  new test file rather than editing theirs.
- **Deploy:** push to the `fork` remote's `main`; GitHub Pages serves it about 50 seconds later. Never force-push. Bump
  every `?v=NN` in `docs/movement/*.mjs`, `*.html` and `README.md` together, or browsers serve stale modules.
- **The phone path matters.** With `?cam`, the phone runs the trackers and publishes landmarks over MQTT
  (`link.mjs`, `phone.mjs`, `remote.mjs`). Anything that needs new data has to travel over that link or it silently
  stops working in phone mode. Do not add per-frame work to the phone: encoding a small JPEG seven times a second there
  was enough to starve its trackers and had to be removed.
