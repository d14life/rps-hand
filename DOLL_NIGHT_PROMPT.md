# Night work order: replace every character model with the ball-joint doll, and drive it from full upper-body tracking

Paste everything below this line as the prompt. It is self-contained: it assumes no memory of the session that wrote it.

---

## 0. Mission

Replace every character model in the RPS Hand movement page with the user's ball-joint doll, and drive the whole visible
body from MediaPipe: head and neck in 3D, shoulders, elbows, wrists, hands with individual fingers, torso, hips, legs and
feet. The old models (a skinned upper-body rig and a separate pair of arm meshes) are to be retired once the doll matches
or beats them on every measure in the ledger. Work until every item in the acceptance ledger passes. Do not stop early,
do not report anything as done that has not been rendered and inspected.

The user has explicitly asked for multi-agent orchestration on this task, so the `Workflow` tool is authorised: use it to
fan out reading, rigging experiments, retarget tuning and per-image verification. Run agents in parallel wherever the
work is independent.

## 1. Facts already established — do not re-derive these

### The model

- Source: `C:\Users\D1\Downloads\ball-joint-doll-basemesh.zip`, one entry: `source/Ball Joint Doll Rigged Basemesh.fbx`
  (25,973,004 bytes). Extracted copy already at
  `C:\Users\D1\AppData\Local\Temp\claude\C--Users-D1-Downloads\fccd22a0-58fb-404f-9e2e-06a23827fc30\scratchpad\doll\`.
- **It is not rigged, despite the file name.** Blender 4.5 import reports: 105 mesh objects, **zero armatures, zero
  vertex groups, zero skin weights, zero shape keys, zero textures**, no object parenting. Materials are only `check`
  and `outline`. Total 818,184 triangles / 409,130 vertices.
- The file holds **three copies** of the same 35-part set:
  - `base` (34 parts): loose parts scattered as a layout sheet. Not assembled.
  - **`.001` (35 parts): the assembled standing doll. Use this one.** 316,512 triangles, 158,266 vertices, 1.619 m tall
    (z from -0.003 to 1.616), standing on +Z, translated to y ≈ 2.0. Arms hang in an A-pose.
  - `.003` (34 parts): another scattered arrangement. Not assembled.
- Blender imports it Z-up: the figure stands along **+Z**, **+Y is depth**, +X is across. three.js is Y-up, so the export
  must convert.
- Left and right limb parts are **merged inside one mesh object per family**: e.g. `shoulder.001` spans 0.359 m across X
  centred on 0, `palm.001` spans 0.489 m. Split them into loose parts by connected components and assign left/right by
  the sign of each island's centre X. Single parts (head, chest, hip, waist) stay whole.
- The 35 part families: `calf, chest, clavicleKnot, elbow, foot, foreArm, forearmKnot, head, hip, indexRoot, inderMid,
  indexTip, indexKnot, knee, middleRoot, middleMid, middleTip, middleKnot, palm, pinkyRoot, pinkyMid, pinkyTip,
  pinkyKnot, ringRoot, ringMid, ringTip, ringKnot, shoulder, thumbRoot, thumbMid, thumbTip, thunbKnot, tight, upperArm,
  waist`. Note the source's own spelling mistakes: `inderMid` is the index middle phalanx, `thunbKnot` is the thumb knot,
  `tight` is the thigh.
- Part centres in the `.001` copy, useful for building the skeleton (z, metres): head 1.504, chest 1.317, hip 0.963,
  waist between them, shoulder 1.295, upperArm 1.187, elbow 1.092, foreArm 0.981, palm 0.818, indexTip 0.715,
  tight 0.761, knee 0.519, calf 0.309, foot 0.071.
- **A ball-joint doll is an advantage, not a problem.** Every part is a rigid body, so there is no skinning to get wrong:
  parent each part to a bone and rotate the bones. Joints are literal spheres, so rotation never tears the surface. Do
  not attempt to weight-paint a continuous skin onto it.

### The project

- Repo: `C:\Users\D1\Downloads\rps_hand`, a clone of `tagirz500/rps-hand`. `gh` here is **d14life**, which has no push
  rights to the owner's repo. Deploy by pushing to the fork `fork` (d14life/rps-hand); GitHub Pages serves it about
  30-50 s later at https://d14life.github.io/rps-hand/ .
- Push procedure, because another agent (Codex) shares this checkout and usually has dirty notes:
  `git stash push -q -- CODEX_HAND_REVIEW.md MOVEMENT_HANDOFF.md`, `git pull -q --rebase fork main`,
  `git push -q fork main`, `git stash pop -q`. **Never force-push.** Commit as
  `-c user.name="Claude (for d14life)" -c user.email="letanyknow123@gmail.com"`.
- The live page is `docs/movement/` (currently v68). Bump every `?v=NN` in `docs/movement/*.mjs` and `*.html` and in
  `README.md` when shipping, or browsers serve stale modules.
- What exists today, and what the doll replaces:

  | Now | File | Size | Replace with |
  | --- | --- | --- | --- |
  | Skinned 15-bone upper body (head, spine, arms, no hands, no legs) | `docs/avatar/upper-body.glb` + `RiggedAvatar.js` | 3.0 MB, 37.5k verts | the doll, full body including legs and fingers |
  | Two separate arm/hand meshes driven by a 21-point FK solver | `docs/arm_L.glb`, `docs/arm_R.glb`, `docs/movement/hand-model.mjs` | 950 KB each | the doll's `palm`, finger `Root/Mid/Tip/Knot` and `foreArm` parts |
  | Body wiring: eyes glued to the camera, facing yaw, right-arm IK to the tracked hand | `docs/movement/body.mjs` | — | rewrite for the doll |
  | MediaPipe Pose Lite, 8 joints (shoulders, elbows, wrists, hips) | `docs/body/worker.mjs`, `pose.mjs`, `BodyView.js` | — | extend: more landmarks, feet, better neck |
  | Face tracker: yaw, pitch, eye centre and span | `docs/head/` | — | keep, add head position for the neck |

- Tracking runs either on this PC's webcam or on the user's phone. In phone mode (`?cam`) the phone runs the trackers and
  publishes landmarks over a public MQTT broker: `docs/movement/link.mjs` (transport and int16 packing), `phone.mjs`
  (phone side), `remote.mjs` (PC side, feeds worker-shaped messages into the page). **Any new tracking data must travel
  over that link too, or phone mode silently loses the feature.**
- Performance measured on this PC (headless Edge, AMD RX 6650 XT) at v68, full scene, seated test clip:
  page 111 fps, hand tracker 26 fps, face tracker 14 fps at 24 ms inference, body tracker off by default.
  These are the numbers to beat or hold.
- The mirror (`docs/movement/shooter.mjs`) redraws the whole map, so it is throttled to every third on-screen frame. Any
  new per-frame cost lands on top of that. Keep it in mind when adding a 20-bone doll plus legs.

### The harness (already written, in the session scratchpad — copy what you need)

`C:\Users\D1\AppData\Local\Temp\claude\C--Users-D1-Downloads\fccd22a0-58fb-404f-9e2e-06a23827fc30\scratchpad\`

- `make_y4m.py photo.jpg out.y4m [frames] [width]` — turns a still into a fake camera clip for
  `--use-file-for-fake-video-capture`. This is how every test image gets into the page.
- `rate.py clip.y4m [query]` — hand fps, face fps, face inference ms, page fps, GPU name.
- `cost.py clip.y4m` — what each object costs in frames per second.
- `handsize.py clip.y4m [query] [out.png]` — the hand's on-screen bounding box as a percentage of the viewport.
- `move_body.py clip prefix [wait]` — rig checks plus look-down, mirror and close-up screenshots.
- `probe_reach.py`, `probe_punch.py` — the gun grab and the punching bag.
- `link_test.py` — two browsers, the second acting as the phone, end to end over the broker.
- Serve with `python -m http.server 8765 --directory docs` before any of them.
- Blender: `"C:\Program Files\Blender Foundation\Blender 4.5\blender.exe" -b --python script.py -- args`.

### Traps that have already cost time

- The `Bash` tool truncates commands over about 10 KB with `unexpected EOF`. Write long patch scripts to a file with the
  `Write` tool, then run the file.
- Appending a `//` comment to a patched line in `docs/movement/app.mjs` **comments out the rest of that line**, because
  that file packs several statements per line. This has broken the page twice. After every edit to it, run
  `node --check` **and** load the page in the harness and assert zero console errors.
- `docs/movement/app.mjs` already has a variable called `remote` (the other player). Do not shadow it.
- Codex owns `docs/movement/`. Their unit tests must keep passing: `node docs/movement/thumb-joystick.test.mjs` (25
  tests), plus `swipe`, `thumbstick`, `held-pose`, `head-look`, `tracking-scheduler`, `controller`, `head` test files and
  `docs/body/pose.test.mjs`, `docs/head/edge.test.mjs`, `docs/movement/fist-centre.test.mjs`. If a change genuinely
  supersedes one of their rules, put the new behaviour behind a flag that defaults to the old one and cover it with a new
  test file, rather than editing theirs.
- Never publish the user's own photos. `docs/test/user_fist.jpg` and `user_cross.jpg` are already in public history; do
  not add more, and do not rewrite history.

## 2. What the user asked for, in their words

> "would that be easy to rig? currently our whole models suck, can you use this for full upper body tracking including
> hand, head, shoulder, elbows, wrists and other ones from MediaPipe … as this model is rigged you can try to make better
> use of it than what we have now. Furthermore make when it moves the legs move too and obviously the whole body moves
> when the user's body moves … and don't forget about the neck, as the head can move in 3D plane space, and the body and
> feet can just stay on the ground as long as the joystick has not been moved. Please make this perfect upper body
> tracking and model, perfectly following all details, and yes do the hand too of this model instead of the ones we have
> been working on. Please use multiple agents and pictures from the internet, a lot of pictures of upper body for
> testing, and many agents to do all of this work."

Read that as five deliverables: **one model**, **one rig**, **one retarget from MediaPipe**, **legs and feet that
behave**, and **the hand replaced too**.

## 3. Acceptance ledger

Nothing ships until every line here is measured and passes. Write the ledger into a file early, tick items off with the
measured number next to them, and paste the final table in the last report.

**A. Asset**

1. `docs/doll.glb` exists, is **≤ 1.6 MB** and **≤ 60,000 triangles**, and loads in the page in ≤ 400 ms (measured).
2. Every one of the 35 part families is present, split left/right where the source merged them, and every part is
   parented to exactly one bone. Zero orphan meshes, zero parts left at the origin.
3. The skeleton has named bones, three.js convention (Y up, facing -Z, left is -X, right is +X, metres, eyes at the
   origin of the rig's local space so the rig can be pinned to the camera): `Hips, Waist, Chest, Neck, Head,
   {L,R}Clavicle, {L,R}UpperArm, {L,R}Forearm, {L,R}Hand, {L,R}{Thumb,Index,Middle,Ring,Pinky}{1,2,3},
   {L,R}Thigh, {L,R}Shin, {L,R}Foot`.
4. Rendered front, side and **top-down orthographic** views of the rest pose show no part intersecting another beyond
   the ball sockets, and no gaps at any joint. A hero angle alone is not evidence.
5. A `rig-report.json` next to the GLB records: bone count, part-to-bone map, triangle count per part, height, the
   measured eye position, and the bone lengths.

**B. Rig quality**

6. Ten synthetic poses (arms forward, arms up, elbows bent 90°, head turned 60°, head down 40°, torso twisted 30°,
   seated, one arm across the chest, fist, open hand) render with no self-intersection and no detached part.
7. Every joint respects a stated limit, and the limits are in the code with a comment: no elbow hyper-extension, no
   knee bending forward, head yaw ≤ ±80°, head pitch ≤ ±60°, neck length fixed.
8. Bone lengths never change: assert local bone positions are identical before and after 1000 update calls, to 1e-6.

**C. Tracking and retarget**

9. **At least 25 internet photographs** of people at webcam distance, saved under `docs/test/upperbody/` with a
   `SOURCES.md` recording each URL, author and licence — permissive licences only (CC0, CC BY, public domain). Cover:
   seated at a desk, standing, arms raised, one arm raised, arms crossed, hands near the face, hands out of frame,
   turned 30° and 60°, head tilted, low light, back-lit, partial upper body cut off by the frame edge, more than one
   person, dark and light skin, long sleeves and bare arms.
10. For each photo, the doll's rendered joints reproject to within **30 px at 640 px wide** of the MediaPipe landmarks
    for shoulders, elbows and wrists, and within **20 px** for the nose and eyes. Record a per-image table. At least
    **22 of 25** must pass; every failure must have a written reason.
11. Fingers: with a hand landmarked in the frame, each fingertip of the doll lands within **1.5 cm** of the tracked
    fingertip in the hand's own frame, and no finger part intersects another (the existing solid-hand test applies).
12. Neck: the head follows the tracked head position in three dimensions. Moving the head 15 cm left, right, up, down,
    forward and back moves the doll's head by the same amount within **3 cm**, and the neck never stretches beyond
    **15%** of its rest length.
13. The whole body follows: when the tracked shoulders translate, the hips, thighs and feet follow so the figure stays
    one piece; no part is left behind by more than 2 cm.

**D. Legs and feet**

14. While the joystick is neutral, both feet stay on the floor: world Y within **2 mm** of the floor height and total
    horizontal drift under **3 cm** over 10 s of tracking.
15. When the joystick moves the player, the legs walk: the feet alternate, each step is at least **0.3 m**, the planted
    foot does not slide more than **4 cm** while planted, and the gait keeps pace with the camera's actual speed.
16. Leaning, crouching and turning the tracked body bends the legs plausibly: the knees never invert, and the hips stay
    between the feet.

**E. Integration, no regressions**

17. The gun still works: the hand picks it up (palm to grip ≤ 0.05 m at pickup), the fingers wrap the grip without any
    finger or palm part intersecting the gun mesh, the trigger finger still moves the trigger, and firing still hits.
18. The punching bag still registers a hit and swings. The hand is still stopped by the bag and the table top.
19. The mirror shows the whole doll, not a floating head.
20. Phone as camera still works end to end (`link_test.py`), including whatever new tracking data the doll needs.
21. Every Node test listed in section 1 passes, unchanged.
22. Zero page errors in the console on every harness run.

**F. Performance, measured with `rate.py` on the seated clip, full scene**

23. Page **≥ 90 fps** (v68 baseline 111).
24. Hand tracker **≥ 22 fps** (v68 baseline 26).
25. Face tracker **≥ 12 fps** (v68 baseline 14).
26. Total download for the character **≤ 2.0 MB** (v68: 3.0 MB avatar + 2 × 950 KB arms = 4.9 MB; this must go down).

## 4. Phase plan

Run the phases in order; fan out inside each one.

**Phase 1 — Understand and prepare (parallel).**
Agents: (a) read `docs/movement/body.mjs`, `hand-model.mjs`, `app.mjs` and report exactly how the current avatar and hand
are placed and driven each frame; (b) read `docs/body/` and `docs/head/` and report every landmark currently extracted,
its frame and units, and what else MediaPipe Pose offers (33 landmarks including feet: heel, foot index, and the face
points) that we are not using; (c) collect and licence-check the 25+ test photographs and write `SOURCES.md`; (d) inspect
the FBX in Blender and produce a part inventory with exact bounding boxes and the connected-component split for the
merged left/right parts.

**Phase 2 — Build the model.**
A Blender script, checked into `tools/doll/build.py`, that runs headless and is re-runnable from the untouched FBX:
import, keep the `.001` copy, split merged parts into left and right, convert Z-up to Y-up, scale so the doll is 1.75 m
tall, move the origin so the eyes sit at the rig's origin, decimate each part to the triangle budget while keeping the
ball sockets round, build the armature, parent each part rigidly to its bone, name everything, export
`docs/doll.glb` plus `rig-report.json`. Verify with ledger items 1-5, rendering front, side and top-down.

**Phase 3 — The runtime rig.**
`docs/doll/DollRig.js`: load the GLB, expose the bones, and offer one method per driver — set the head pose, set a hand's
21 landmarks, set the body joints, set the walk state. Rigid parts mean the rig is a transform hierarchy, not a skinned
mesh; keep it that way, it is cheap. Cover with a synthetic-pose test page like the existing `docs/avatar/verify.html`
and with ledger items 6-8.

**Phase 4 — Retarget from MediaPipe.**
Two-bone analytic IK for each arm and each leg, the neck from the face tracker's 3D head position, the torso from the
shoulder and hip landmarks, and the fingers from the hand landmarks. Everything in the player's own frame, eye-relative,
metres, exactly as `docs/body/pose.mjs` already produces. Then run it over all 25 photographs and tune until ledger
items 9-13 pass. This is the phase that deserves the most agents: one per photograph for the measurement pass, then a
synthesis agent that proposes the next parameter change.

**Phase 5 — Legs, feet and walking.**
Feet planted while the joystick is neutral; a simple two-step gait driven by the camera's actual displacement when it is
not; hips following the tracked body; knees constrained. Ledger items 14-16.

**Phase 6 — Swap in, delete the old.**
Replace `RiggedAvatar.js`/`upper-body.glb` and `arm_L/R.glb`/the hand driver with the doll, keeping the public interface
`body.mjs` and `shooter.mjs` expect. Re-run every regression: gun, punch, mirror, phone link, all Node tests, all
performance numbers. Only when ledger items 17-26 pass, delete the old assets in the same commit that stops referencing
them.

**Phase 7 — Ship and report.**
Bump the version everywhere, update `README.md`, commit with a message that states what was measured, push to the fork,
wait for Pages, re-run `link_test.py` and `rate.py` **against the live URL**, and write the final report with the ledger
table and before/after screenshots.

## 5. How to verify anything visual

Render it and look at it. Every claim about geometry needs a front view, a side view and a **straight-down orthographic
view** — overlap and scale errors hide in hero angles. For tracking claims, overlay the MediaPipe landmarks on the
rendered doll in the same image and measure the pixel error, do not eyeball it. Save every comparison sheet; name them so
the final report can reference them.

## 6. Working rules

- Measure before you place. Never assume a dimension; every number in the code that matters comes from a measurement
  recorded somewhere.
- A fix is not a fix until it has been re-rendered and re-measured.
- Report only what the evidence supports. State failures first and plainly.
- Commit working increments as you go, with the measured numbers in the message. Do not leave the tree broken overnight.
- If something in this brief turns out to be wrong, say so in the report with the evidence, and carry on with the
  corrected fact.

## 7. When to stop

Stop when every ledger item passes and the live page has been re-verified, or when you are blocked on something only the
user can decide. If you run out of a way forward on one item, park it with a written reason, finish everything else, and
list the parked item first in the report. Do not stop because the session is long.

## 8. Final report

One page: the ledger table with measured values, what changed, what the before/after numbers are, the screenshots, what
is still not right, and the live URL.
