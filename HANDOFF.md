# RPS Hand — project handoff

Rock-paper-scissors game where the camera tracks every finger joint of the player's hand and a 3D hand
copies the motion live. Built 2026-09-10 by Claude for Tagir and his brother. This document is written so a
different AI model (or person) can continue the work with no other context.

Everything lives in `C:\Users\tagir\Downloads\rps_hand\` on Tagir's PC.

---

## 1. Goal, in the owner's words

> The interface is: you see yourself, and you see your opponent's 3D hand (just the wrist part) showing
> rock, paper, scissors. Two parts: (1) software that detects every part of every finger, how it moves and
> folds; (2) a 3D hand that exactly follows that motion. All hands are the same, size doesn't matter, only
> the exact motion. Later: apply skins to the hand. Main idea: play rock-paper-scissors with it, detecting
> rock/paper/scissors in any form. First, just build hand detection and the 3D recreation.

Later message from the owner, parked for after the current work:

> Instead of a 3D model, maybe cut everything out of the video except the hand. Could NVIDIA Cosmos do that?

Answer already given: Cosmos is a world-simulation / video-generation model family, not a segmenter, and
not real-time. The right tools are MediaPipe's multiclass selfie segmenter (body-skin class, masked to the
hand's bounding box from the landmarks) for live in-browser cutouts, and SAM 2 for high quality offline.
Tradeoffs: a cutout is flat (no skins, hands no longer "all the same") and must be streamed as video to an
opponent, whereas the 3D approach only sends 21 points per frame. No decision has been made yet.

## 2. What exists and works

| Deliverable | Path | Status |
|---|---|---|
| Desktop app source | `rps_hand.py` | Working, self-check passes |
| Desktop exe, single file | `dist/RPSHand.exe` (243 MB) | Working. ~15 s startup (self-extracts each launch) |
| Desktop exe, folder | `dist/RPSHand-folder/RPSHand-folder.exe` (582 MB folder) | Working. ~5 s startup |
| Web app (for phones) | `web/index.html` | Working, live |
| Live URL | https://tagirz500.github.io/rps-hand/ | GitHub Pages, deploys from `main` in ~30 s |
| Public repo | https://github.com/tagirz500/rps-hand | Only the `web/` folder is in git |
| QR code to the URL | `qr.png` | Sent to the owner |
| Self-check | `test_rps_hand.py` | Runs the script or an exe headless on a photo |
| Model | `assets/gesture_recognizer.task` (8.4 MB) | Google's canned gesture model, bundled into the exe |
| Sample photos | `assets/victory.jpg`, `thumbs_up.jpg`, `pointing_up.jpg`, `thumbs_down.jpg` | From Google's MediaPipe samples |

The desktop exe has NOT been tried with a real webcam by a human yet, and the web page has NOT been tried
on a real phone by a human yet (see the hardware gotcha in section 7). Everything else is verified.

## 3. How it works (both versions share the same design)

**Tracking.** MediaPipe's `GestureRecognizer` task, VIDEO running mode, one hand. Per frame it returns:
- 21 image landmarks (normalised 0..1, used for the on-camera overlay),
- 21 world landmarks (metres, origin at the hand centre, used to drive the 3D hand),
- a canned gesture label: `Closed_Fist`, `Open_Palm`, `Victory`, `Pointing_Up`, `Thumb_Up`,
  `Thumb_Down`, `ILoveYou`, `None`.

**Gesture → move.** `Closed_Fist`→ROCK, `Open_Palm`→PAPER, `Victory`→SCISSORS. If the label maps to
nothing, a fallback counts extended fingers (a finger is extended when its tip is further from the wrist
than its middle joint): 0 → ROCK, 4 → PAPER, index+middle only → SCISSORS, anything else → no move. This is
what makes sideways or sloppy gestures still work.

**3D hand.** No rigged mesh, no asset. The hand is drawn procedurally from the landmarks:
- **Retargeting**: walk the skeleton tree from the wrist, keep each bone's *direction* from the tracked
  landmarks but replace its *length* with a fixed canonical length (table in code). Result: every player's
  hand renders identically sized, only motion is copied. Exactly what the owner asked for. Then the palm
  centre is moved to the origin, so hand translation in the frame is ignored (only pose and orientation).
- **Drawing**: one capsule per bone (cylinder + spheres at the joints), thicker for thumb and palm bones,
  a two-sided filled polygon for the palm, and a forearm capsule pointing from the wrist away from the
  middle-finger knuckle. Flat skin-coloured material. Grey when no hand is visible (last pose is kept).
- **Coordinates**: MediaPipe world landmarks are x right, y down, z away from camera. Converted to GL as
  `(x, -y, -z)` on desktop (frame is flipped before detection) and `(-x, -y, -z)` on web (video is
  mirrored with CSS instead). Both give a mirror-consistent selfie view.
- **Smoothing**: exponential, new pose weighted 0.55.

**Skeleton.** MediaPipe indices: 0 wrist; thumb 1-4; index 5-8; middle 9-12; ring 13-16; pinky 17-20.
`PARENT` maps each joint to its parent (all finger bases parent to the wrist). Palm edges 5-9, 9-13,
13-17 are drawn but are not part of the tree.

**Game.** PLAY / SPACE starts a 3-second countdown, then the current move is locked, the computer picks
randomly, the result shows for 3 seconds, score is kept. No networking, no second player yet: the 3D hand
currently mirrors *your own* hand, standing in for the opponent view.

## 4. Desktop version (`rps_hand.py`)

- Python 3.13, `mediapipe 1.0.1`, `opencv-python 5.0`, `pygame 2.6`, `PyOpenGL`, `pyinstaller`.
  MediaPipe 1.0 still uses the Tasks API at `mediapipe.tasks.python.vision`.
- One pygame window 1280×720 with an OpenGL context. Left half: the camera frame uploaded as a texture,
  with HUD text drawn onto the frame by OpenCV. Right half: the 3D hand in legacy immediate-mode OpenGL
  with GLU quadrics (works on any Windows GL driver, no shaders).
- Keys: SPACE play, ESC quit.
- CLI: `--source <camera index | video path | image path>` (default camera 0);
  `--shot <png>` renders 45 frames then saves the window to that PNG plus a sidecar `<png>.txt` with
  `gesture=… move=…` and exits. The sidecar exists because a `--windowed` exe has no stdout.
- Crash handling: any exception is written to `rps_hand_error.log` next to the exe/script and shown in a
  Windows message box when frozen.

Run from source:
```
python rps_hand.py
python rps_hand.py --source assets/victory.jpg --shot out.png
```

Build (both variants were built with these exact commands):
```
python -m PyInstaller --noconfirm --clean --onefile --windowed --name RPSHand --add-data "assets/gesture_recognizer.task;assets" --collect-all mediapipe rps_hand.py
python -m PyInstaller --noconfirm --onedir  --windowed --name RPSHand-folder --add-data "assets/gesture_recognizer.task;assets" --collect-all mediapipe rps_hand.py
```
`--collect-all mediapipe` is required or the frozen exe cannot find MediaPipe's binaries.
`--add-data` uses `;` as the separator on Windows. Build takes 3–5 minutes.

Test (script, or pass an exe path):
```
python test_rps_hand.py
python test_rps_hand.py dist/RPSHand.exe
```
Expected output: `OK gesture=Victory move=SCISSORS`. It asserts retargeting preserves bone lengths, the
finger-count fallback classifies synthetic hands, and a headless run on `victory.jpg` produces a PNG.
Always open the PNG and look at it; numeric checks passed in the past while a render was wrong.

Desktop-only gap: the landmark overlay / stats readout from section 5 is not in the Python version yet.

## 5. Web version (`web/index.html`)

Single file, no build step. Loads:
- `three@0.186.0` ES module from jsdelivr (import map),
- `@mediapipe/tasks-vision@1.0.1` `vision_bundle.mjs` from jsdelivr, WASM from the same package's
  `wasm/` folder,
- the gesture model from `https://storage.googleapis.com/mediapipe-models/gesture_recognizer/gesture_recognizer/float16/latest/gesture_recognizer.task`.

Layout: portrait = camera on top, 3D below; landscape = side by side (CSS grid + orientation media
query). Video is mirrored with `transform: scaleX(-1)`. Same logic as Python, ported to JS: `retarget`,
`moveFromLandmarks`, the game state machine. The 3D hand uses unit cylinders scaled per bone plus joint
spheres, a `BufferGeometry` palm fan, and `MeshStandardMaterial`.

Debug/testing aids added at the owner's request:
- A `<canvas id="ov">` overlay on the camera draws bone lines and joint dots from the image landmarks
  (fingertips yellow, wrist red). It has the same CSS as the video, so it aligns pixel-exact.
- `LineSegments` + `Points` with `depthTest:false` draw the skeleton on top of the 3D capsules.
- A readout `tracker: <ms> | <fps> | hands: <n>` under the move label.
- `?img=<file>` query parameter replaces the camera with a still image (must be same-origin). Used for
  headless verification: `https://tagirz500.github.io/rps-hand/?img=victory.jpg` must show
  `GESTURE: Victory` / `MOVE: SCISSORS`.

Delegate: tries `GPU` then falls back to `CPU`. Camera: `getUserMedia` with `facingMode:"user"`, 640×480
ideal. Camera access needs HTTPS (or localhost), which is why the page is hosted rather than opened as a
file.

Deploy: the `web/` folder is its own git repo (`main`, remote `origin` = the GitHub repo). Commit and push;
GitHub Pages rebuilds in about 30 seconds. `gh` CLI is logged in as `tagirz500` on this PC.

Verify a deploy headlessly (this is what was used, Python Playwright is installed with Chromium):
```
python - <<'EOF'
import asyncio
from playwright.async_api import async_playwright
async def run():
    async with async_playwright() as p:
        b = await p.chromium.launch(headless=True, args=["--use-gl=angle","--use-angle=swiftshader","--enable-unsafe-swiftshader","--ignore-gpu-blocklist"])
        pg = await b.new_page(viewport={"width":900,"height":600})
        await pg.goto("https://tagirz500.github.io/rps-hand/?img=victory.jpg", wait_until="load")
        await pg.wait_for_function("document.getElementById('move').textContent.includes('SCISSORS')", timeout=90000)
        print(await pg.inner_text("#top")); await pg.screenshot(path="web_check.png"); await b.close()
asyncio.run(run())
EOF
```
For a pre-push check, serve `web/` locally first (`python -m http.server 8765 --directory web`) and test
`http://localhost:8765/?img=victory.jpg`. Do not test from a `file://` URL: the image counts as
cross-origin for WebGL and MediaPipe throws a `texImage2D` SecurityError that has nothing to do with the page.

## 6. Decisions and why

- **Procedural capsule hand instead of a rigged GLB.** The owner wants identical hands and exact motion,
  and skins "later". A capsule skeleton needs no asset, no rig, no bone-name mapping, and gives the
  motion exactly. Swapping in a skinned mesh later is a contained change: bind a mesh's bones to the same
  21 retargeted points.
- **GestureRecognizer instead of HandLandmarker.** Same 21 landmarks plus free rock/paper/scissors labels.
- **Canonical bone lengths (retargeting) instead of raw world landmarks.** Enforces "all hands the same".
- **Two exe variants.** The owner asked for "an exe"; the single file is easiest to share, the folder starts
  3× faster. Both are built from the same source.
- **GitHub Pages instead of Vercel/artifacts.** The Vercel CLI is not installed/logged in, and claude.ai
  artifacts block MediaPipe's runtime WASM and model fetches by CSP. Pages was zero-setup with the
  logged-in `gh` CLI.
- **Web page added after the exe.** The owner wanted to test on a phone via QR; the PC has no camera.

## 7. Gotchas already hit (don't rediscover these)

- **Tagir's PC has no physical webcam.** `cv2.VideoCapture(0)` opens the "AMD Privacy View camera", a
  software device that feeds the desktop back at ~1 fps (an "OBS Virtual Camera" also exists). Live
  tracking must be tested on the brother's machine or a phone. Verify renders by looking at `--shot` /
  `?img=` screenshots.
- **The desktop app's `--windowed` build has no stdout**, so results are written to a sidecar file.
- **MediaPipe VIDEO mode needs strictly increasing timestamps**; both versions clamp `ts = max(ts+1, now)`.
- **`--source 1` must be converted to an int** or OpenCV treats it as a filename (fixed).
- **The per-hand gesture list can be empty** even when a hand is present (guarded).
- **Web: the error handler used to write into the loading box after it was removed**, masking the real
  exception (fixed; it now logs first and falls back to the game text line).
- **The Claude Code Browser pane refuses `github.io` origins** and drops query strings; use headless
  Playwright for verification instead.
- **pip on this PC needs `NO_PROXY=*`** because a VPN sets a system SOCKS proxy.
- **PyInstaller onefile is slow to start** (243 MB self-extraction, ~15 s). The folder build is ~5 s.

## 8. Known limits (deliberate, not bugs)

- A round locks the move at the exact instant the countdown ends. A hand mid-transition can register as
  "NO MOVE SEEN". A 0.3 s majority vote over recent frames would fix it.
- A trailing `--source` / `--shot` flag with no value crashes to the error log instead of printing usage.
- The 3D hand ignores where the hand is in the frame (palm is pinned to the origin); only pose is copied.
- One hand only. `numHands: 1` in both versions.
- No sound, no menus, no settings.

## 9. Suggested next steps, in the owner's priority order

1. **Get a human test on a real camera** (phone via the QR, or the brother's PC with the exe). Watch the
   `tracker:` readout and the overlay first; if `hands: 0` with a hand in frame, it is lighting/tracking,
   not the game.
2. **Add the overlay + stats to the desktop version** (`cv2.line`/`cv2.circle` on `res.hand_landmarks`
   before the texture upload) and rebuild both exes with the commands above.
3. **Stable-gesture hold** before locking a round (see section 8).
4. **Opponent view / two players.** Cheapest path: send the 21 retargeted points (~250 bytes per frame)
   over WebRTC data channel or a tiny WebSocket relay; render the opponent's points with the same
   `drawHand`. This is far cheaper than streaming video and keeps the "identical hands" property.
5. **Skins.** Replace the capsule drawing with a skinned mesh bound to the 21 points, or simply swap
   materials/colours per player as a first version.
6. **Decide on the cutout idea** (section 1). If pursued in the browser: MediaPipe `ImageSegmenter` with the
   multiclass selfie model, keep body-skin pixels inside the landmark bounding box, composite onto a
   canvas. Keep the 3D hand as an alternative "skin".

## 10. File map

```
rps_hand/
  rps_hand.py            desktop app (single file)
  test_rps_hand.py       self-check for script or exe
  HANDOFF.md             this file
  assets/                gesture_recognizer.task + sample photos
  dist/RPSHand.exe       single-file build
  dist/RPSHand-folder/   folder build
  build/, *.spec, build*.log   PyInstaller leftovers, safe to delete
  selfcheck.png(.txt)    last self-check output
  web_check*.png         last headless web checks
  qr.png                 QR code for the live URL
  web/                   git repo -> github.com/tagirz500/rps-hand (GitHub Pages)
    index.html           the whole web app
    victory.jpg          sample used by ?img=victory.jpg
```

## 11. Tracking v2 (2026-09-10, later the same day)

Phone test feedback: motion was good but LATE, and a fast shake lost the hand. Researched predictive tracking
(VR-style pose extrapolation), the One Euro filter (Casiez 2012) and Snap/Columbia's N-euro predictor. Rebuilt
the web pipeline in `web/index.html`:

- **HandLandmarker** instead of GestureRecognizer (lighter). Rock/paper/scissors now come only from the
  finger-count rule (0 up = ROCK, 3+ up = PAPER, index+middle only = SCISSORS).
- **Inference in a Web Worker** (module worker built from an inline Blob). Rendering runs at display rate
  and never waits on the tracker. `FilesetResolver.forVisionTasks(path, true)` is REQUIRED in a module
  worker or the library throws "ModuleFactory not set". Falls back to the main thread if the worker fails.
- **One Euro filter** on the 63 world coordinates (minCutoff 1.5, beta 15, dCutoff 3; metres, so beta is
  large). Its filtered velocity drives **prediction**: pose is extrapolated by (now - last result time)
  capped at 150 ms. Retargeting runs AFTER filtering/prediction so bone lengths stay canonical.
- **Dead reckoning**: when the tracker drops the hand, keep predicting for 250 ms, then grey out.
- Camera requests 60 fps; presence/tracking confidence lowered to 0.3 so it holds on through blur.
- **MODE button** on the phone cycles predict / smooth / raw so the difference can be felt live.
- Readout: `tracker: <ms> | <fps> | latency <ms>` and `worker/GPU` (or main/CPU etc.) + mode.
- `web_test.py [url]` is the headless check (defaults to http://localhost:8765/; serve `web/` first).
  Expected: `RESULT: SCISSORS`, `worker/GPU`, three modes all report SCISSORS, no errors.

Tuning knobs if the phone still feels off: `OneEuro(63, minCutoff, beta, dCutoff)`, `MAX_LEAD`, `HOLD_MS`,
`TRACKER_OPTS` thresholds. Next research-grade step is an N-euro style learned predictor.

Also looked at `Downloads/WebcamMotionCapture_Win_1.12.1.exe` (KWCL K.K., signed): closed-source Qt app in an
Inno Setup 6.4.3 installer that innoextract 1.9 cannot open. Not run, not decompiled; nothing reusable.

## 12. Free 3D placement: position + depth (2026-09-10, v3)

Owner wants the replica to move like a real hand in a real room: top-left on camera = top-left in 3D,
closer = bigger, further = smaller. One phone camera cannot measure depth, so depth comes from apparent
size vs known metric shape (what one eye does):

- `locate(world, image, W, H)`: MediaPipe world landmarks are metric AND already oriented to the camera,
  only their translation is unknown. With a pinhole camera of assumed horizontal FOV (`HFOV`, default 60°,
  `?fov=70` to override) the translation T is a 3-unknown linear least squares over the 21 joints
  (`-Tx + xu*Tz = X - xu*Z`, `-Ty + yv*Tz = Y - yv*Z`), solved in closed form. Also returns the mean
  reprojection error as a fraction of frame width, shown as `fit x.x%` on the HUD (2% on the sample photo;
  a big value means pose and picture disagree, e.g. wrong FOV or a bad detection).
- Lateral (x, y) position is independent of the FOV guess; only absolute depth scales with it.
- `toGL(world, T)` adds T then mirrors x. `retarget()` now keeps canonical bone lengths but places the
  palm centre where the tracked palm is (was: pinned at the origin).
- three.js camera sits at the origin looking down -z, with FOV chosen to match the video pane's
  `object-fit: cover` crop (`resize()`), so the replica appears at the same place and size as the hand
  in the video pane. A `GridHelper` at y = -0.35 m gives a depth cue.
- Filtering/prediction unchanged and now applies to absolute coordinates, so position is predicted too.
- HUD shows `depth 0.xx m` (distance of the palm centre from the camera).
- Verified with `web_test.py` on the sample photo: depth 0.29 m, fit 2.0 %, replica lands on the same
  side and size as the photographed hand. Live at the same URL.

True depth (stereo, ToF, TrueDepth) is not reachable from a mobile browser; a native app could use ARKit /
ARCore depth or two phones as a stereo pair if monocular scale-from-size is not enough.

## 13. Two hands, physics, a room (2026-09-10, v4)

Owner asked for two hands that "interact", physics, a background and things on the floor.

- **Two hands**: `numHands: 2`. Each detected hand is routed to a slot keyed by MediaPipe's handedness
  label (`Right` / `Left`); a duplicate label goes to the free slot. Each slot has its own One Euro filter,
  replica, colliders, depth and fit. The RPS move comes from the Right hand if visible, else Left.
- **Physics**: Rapier (`@dimforge/rapier3d-compat@0.20.0/dist/rapier.mjs` from jsdelivr, WASM inlined, so it
  needs no extra fetch). Each hand = 22 kinematic-position rigid bodies (a ball per joint + one for the
  palm) moved with `setNextKinematicTranslation` every frame from the drawn (predicted) points; parked at
  y = 10 m when the hand is out of view. Six dynamic props (3 balls, 3 boxes) rest on a static floor
  collider at `FLOOR_Y` (default -0.28 m below the camera, `?floor=-0.2` to raise). Hands push props and can
  pass them to each other; hands do NOT collide with each other (both are tracking-driven, so nothing
  could yield). `world.timestep` = real frame dt capped at 1/30. RESET OBJECTS button re-homes the props.
- **Room**: procedural checkerboard floor (canvas texture), back wall, fog, hemisphere + shadow-casting key
  light. Hands and props cast shadows (`renderer.shadowMap`), which is the strongest depth cue.
- **Adaptive hold**: `hold = max(250 ms, 2.5 × tracker interval)` so slow devices don't flicker hands off
  between results (the fixed 250 ms hold flickered at 2 fps in headless tests).
- `web/woman_hands.jpg` (Google's sample) is the two-hand self-check: `?img=woman_hands.jpg` must show
  `hands 2` and both `R` and `L` in the HANDS line. `web/victory.jpg` remains the one-hand check.
- Verified headless: victory → SCISSORS, R 0.30 m; woman_hands → R 0.52 m 4up, L 0.40 m 4up, PAPER;
  no console errors. Headless runs at ~2 fps because everything is software-rendered there; irrelevant
  on a phone.

Known: prediction mode can fling props hard on a fast swipe (kinematic bodies teleport); tune `MAX_LEAD`
or switch to smooth mode if that annoys. Prop positions in `PROPS` are metres from the camera.

## 14. First person + opponent hand, hand-only, auto-remove (2026-09-10, v5)

Owner: "first-person FOV: my hand vs the opponent's hand in one 3D environment, like I'm standing holding my
hand out"; "remove the lower arm, hand only after the wrist"; "when the hand is not in view remove the 3D
model, now it just hangs there".

- **Coordinates are now TRUE positions** (`toGL` no longer mirrors x). The phone plane is the middle of the
  table (z = 0); you are at z < 0, the opponent at z > 0.
- **VIEW button**: `first person` (default) puts the camera at your eyes (0, 0.12, -0.85) looking across the
  table, FOV 62°, so your right hand appears on your right. `camera` puts it at the phone camera with the
  cover-crop-matched FOV and mirrors the render (`worldGroup.scale.x = -1`; three.js flips face winding
  automatically for negative scale) so it matches the mirrored video pane.
- **Opponent hand** (`synthHand`, a darker skin): a posed hand built on the same skeleton from per-finger
  curl angles (`CURL`, `POSE`), placed at `OPP.at` (0.08, -0.04, 0.30) facing you. Idle = relaxed; during the
  countdown it pumps a fist (3 bobs in 3 s); at the result it shows the computer's move. Points lerp toward
  the target pose (0.25/frame) so transitions are smooth. This is the stand-in until a real opponent's 21
  points arrive over the network; the same `makeHand().draw(pts)` will render those.
- **Hand only**: forearm capsule removed. **No ghost**: after the adaptive hold expires the hand is hidden
  (`hand.hide()`), colliders parked far away.
- Props moved to the middle of the table (z -0.40 … -0.10) so they sit between the players; a wall behind
  each player; floor collider centred at z = 0.
- `?cpu=ROCK|PAPER|SCISSORS` forces the computer's move (used by the headless test).
- Verified headless: SCISSORS vs forced PAPER → YOU WIN, opponent pose visibly changes idle → fist → open;
  camera view mirrors correctly; two-hand photo still tracks both. Screenshots `web_check6..11.png`.

## 15. Tracking precision pass (2026-09-10, build 7)

Owner's phone (iPhone, Safari): tracker 37 ms, 21 fps with two hands, latency 41 ms, worker/GPU. Reported
"tracking is bugging" and "does not follow the hand precisely". Three causes fixed:

- **Joints now come from the IMAGE landmarks** back-projected at world-model depth (`toGL(world, T, xu, yv)`:
  X = xu*(Zw+Tz), Y = yv*(Zw+Tz)). Before, x/y came from the world landmarks, which disagree with the picture
  by roughly the `fit` value (~1 cm per joint at 0.4 m). Lateral positions now match the video exactly; only
  depth is modelled. Still FOV-independent laterally.
- **Slot assignment by nearest position** (`assign()`): MediaPipe's Left/Right label flickers; keying slots by
  label made a hand jump into the other slot's stale filter and leave a lingering copy. Now: nearest
  recently-seen slot within a quarter of the frame, else a free slot (label as tie-breaker). Duplicate
  detections of the same physical hand (centres closer than 0.6 × hand span) are dropped, keeping the higher
  handedness score. HUD shows the detected label (R/L) per slot.
- **Rigid prediction**: `OneEuro.predict()` applies the mean palm velocity to every joint instead of each
  joint's own velocity, which amplified fingertip noise into wobble. Finger articulation comes from the
  smoothed pose. One Euro now minCutoff 1.0, beta 20.
- Thresholds back to presence 0.5 / tracking 0.4 (fewer phantom hands; dead reckoning bridges drops).
- HUD shows `build N` so a cached page is obvious (GitHub Pages sends max-age=600; phones showed build 4
  after v5 was live).

Verified headless: victory → SCISSORS, fit 2.6 % (fit is now purely the world/image disagreement, no longer
affects placement); woman_hands → R 0.52 m, L 0.40 m via nearest-slot assignment; no errors.

## 16. Build 8: opponent parked, mirror view default, lag diagnostic (2026-09-10)

Owner: "remove the opponent for now, just 2 hands in 3D space, we need to make tracking perfect" and
"make a reflection like a mirror mode".

- **Opponent hand removed** (`synthHand`, `OPP`, `CURL`, `POSE` deleted). Recover from git history
  (commit "First-person view with posed opponent hand…") when the networked opponent is built; the
  `makeHand().draw(pts)` path it used is unchanged.
- **VIEW: mirror** is now the default (was "camera"): room seen from the phone position, render mirrored,
  matches the video pane one-for-one. "first person" is the other option.
- **Prediction lead fixed**: measured from the frame's CAPTURE time (`s.capT`) + one display frame (16 ms),
  not from result arrival. It was under-predicting by the whole pipeline latency (~40 ms on the phone).
- **Cyan overlay** on the video: the displayed 3D hand (filtered + predicted, before retargeting) projected
  back onto the frame via `toImage()` (inverse of `toGL`/`locate`). Green = raw tracker landmarks of the
  latest frame. On a still image cyan sits exactly on green (verified, `web_check14_zoom.png`); while
  moving, the gap between them IS the lag/filtering the player feels. MODE raw/smooth/predict changes the
  cyan, never the green.
- Verified headless: victory → SCISSORS; woman_hands → two hands in mirror view; no errors.

Tuning knobs for "perfect": `OneEuro(63, minCutoff, beta, dCutoff)` (1.0 / 20 / 3), `MAX_LEAD` (0.15),
`HOLD_MS` (250), `TRACKER_OPTS` thresholds (0.5 / 0.5 / 0.4), `HFOV` (`?fov=`).

## 17. Build 9: handshake stability, exact lines, thenar web (2026-09-10)

Owner: "two hands should interact (handshake) without the tracking constantly moving and without the hand
going crazy; the 3D lines must follow the video lines exactly"; and (photo with a red line) "a real hand has
tissue between the thumb and the index base, the tracking doesn't".

- **Per-joint speed limit** in `OneEuro.push`: a joint may move at most `VMAX_REL` = 1.5 m/s relative to the
  palm per frame; faster = occlusion spike, clamped. Fast real flicks take one extra frame to catch up.
- **Filter**: minCutoff 0.6 (stiller when still), dCutoff 1.5 (velocity estimate rejects alternating noise),
  beta 20. **Prediction gated by speed**: zero below 0.05 m/s, full above 0.3 m/s (no jitter amplification
  when still).
- **Handshake rule** (`OCCL_HOLD` 1500 ms): each slot remembers the other hand's palm at its last update and
  their distance. If a hand vanishes while within 0.25 m of the other hand and the other is still tracked,
  the lost hand keeps its last pose and is translated by the other palm's motion (they move together in a
  handshake). HUD shows "held". Otherwise the normal 250 ms hold applies.
- **Slot assignment** now adds a 0.08-frame penalty for a label mismatch so two touching hands don't swap.
- **SIZE button**: `real` (default) = the tracked geometry itself (3D skeleton lines project exactly onto the
  video lines in mirror view); `same` = canonical bone lengths (every hand identical, the original design).
- **Thenar web**: `WEB = [2, 5]` added to `CONNECTIONS` (green line on video + 3D skeleton) and two membrane
  triangles (0,1,5) (1,2,5) added to the palm mesh (`PALM_TRIS`). The capsule model still has no volume
  (thenar eminence); that needs a skinned mesh, see section 18.
- Verified headless: victory → SCISSORS, SIZE toggles, web line + membrane visible; woman_hands → both hands;
  no errors.

## 18. Research: how hands move, and how to get a real hand into 3D

- **Degrees of freedom.** Fingers: MCP 2 DoF (flex + spread), PIP 1, DIP 1 with DIP coupled to PIP (~2/3).
  Thumb: CMC is a saddle joint, 2 primary DoF (flex/extend, abduct/adduct) plus coupled rotation that gives
  opposition; MCP 2, IP 1. Wrist 2 (+ forearm rotation). The palm is not rigid: ring and pinky metacarpals
  fold (palm cupping). MediaPipe's 21 points capture all of this as positions, not angles.
- **Why the thumb web is missing.** The 21-point skeleton is a stick figure; the thenar eminence and the web
  are skin volume, not joints. Any joint-only renderer (ours, VTube-style debug skeletons) shows the gap.
- **The standard fix is a skinned mesh, not more sticks.** MANO (Romero et al.) is the reference hand mesh:
  778 vertices, 16 joints, 45 pose + 10 shape parameters, learned from ~1000 scans, includes the thenar and
  webbing. Pipelines fit MANO to MediaPipe's 21 keypoints by minimising keypoint distance (see HandTailor,
  and many "mediapipe-to-MANO" repos); MediaPipe's 21 points map 1:1 to MANO's joint keypoints.
- **Practical path for this project** (cheapest first):
  1. Now: web line + membrane (done).
  2. Rigged hand GLB (any modelled hand with MediaPipe-compatible bones, or MANO exported from Blender via
     the MANO Blender add-on) driven by joint rotations computed from our bone directions, exactly as
     `three-mediapipe-rig` does. Linear blend skinning then gives thenar volume, webbing and knuckles for
     free and is the "skins" feature the owner wanted.
  3. Later: fit MANO shape parameters once per player (hand size/proportions) if "real" size matters.
- Sources: MediaPipe hand landmarker docs; MANO (Embodied Hands, SIGGRAPH Asia 2017); HandTailor
  (arXiv 2102.09244); "Monocular 3D hand pose estimation with implicit camera alignment" (arXiv 2506.11133);
  Anthro-Thumb CMC saddle joint (Frontiers Robotics & AI 2025); passive biomechanics of the thumb CMC
  (PMC11154835).

## 19. Builds 10-12: exactness, harder tests, tilt (2026-09-10)

Owner feedback after build 9: predict and smooth both drift from the hand on fast moves; crossing fingers
still bugs; depth good but HEIGHT wrong; use exact video lines on the model; work on mechanics only (a
separate session builds the hand mesh).

**Harness.** `web_hard_test.py` now runs in the system Edge (`channel="msedge"`, new headless, real GPU):
the tracker runs at 30 fps / 20 ms like the phone. The Playwright chromium binary is blocked ("spawn
UNKNOWN" / permission denied) and the headless shell is software-only (2-3 fps, useless for motion).
Test media (Wikimedia Commons, CC) in `web/test/` (gitignored): handshake photos, crossed-finger photos,
`cleanhands.webm` (23 s) and `handwash.webm` (114 s, the hardest case: hands rubbing and interlacing).
`?video=test/x.webm` loops a clip; `?img=` a still; `?delegate=CPU` forces the CPU delegate. `window.dbg`
holds metrics: two-hand %, held, spikes/snaps/handovers, dispJumps (displayed palm moved >10 cm between
rendered frames), reproj (mean distance displayed lines vs video lines, % frame width).

**Findings (30 fps, real GPU).** On clasped/interlaced hands MediaPipe returns ONE hand ~96 % of frames and
none at all on the handshake photos; its single hand's landmarks jump >10 cm between consecutive frames
in 6-8 % of frames (it switches physical hands). Reprojection fit rises from ~1-2 % to 3.6-3.8 % when
fingers cross, so fit is a usable confidence signal. Stills reproject exactly (0.01-0.06 %).

**Changes.**
- Build 10: `HandFilter` replaces One Euro: error-adaptive gain (deadband 3 mm lateral / 8 mm depth, full
  follow at 15 / 30 mm, A_MIN 0.12) - no onset lag because it reacts to error, not to a late speed
  estimate. Duplicate suppression by mean joint distance (overlapping real hands are not duplicates).
  Unmatched detections prefer stale slots with the same label. SIZE removed (always real geometry;
  `retarget`/`LENGTH` deleted). Phone tilt: `deviceorientation` beta -> camera pitch; `level()` rotates
  points into a gravity-aligned frame; mirror camera looks along the phone axis; `toImage` undoes it.
- Build 11: two-frame confirmation for whole-hand jumps > `JUMP` 12 cm (spike = rejected, confirmed =
  snap); filter trust = f(fit) (fit 3 % -> 1, 6 % -> 0.15); exactness metrics.
- Build 12: MAX_LEAD 40 ms and prediction damped by palm acceleration (halved at 20 m/s²): rubbing /
  pumping motions no longer overshoot. Confirmed relocation onto the other hand's last position hands the
  detection to that slot ("handover") instead of teleporting. Tilt listener attached at load (desktop
  Chromium also exposes requestPermission, which had stalled the iOS-only path); iOS permission asked on
  every tap until granted.

| clip / mode | dispJumps b11 -> b12 | reproj b11 -> b12 |
|---|---|---|
| cleanhands predict | 75 -> 24 | 6.64 % -> 1.89 % |
| handwash predict | 97 -> 59 | 1.91 % -> 0.50 % |
| handwash raw | 45 -> 41 | 0 (by construction) |

Tilt simulation (beta 60 = camera 30° up): reproj 0.03 %, hand rises in the room, floor stays level.

**Contract for the hand-mesh session.** The renderer calls `hand.draw(pts)` with `pts` = 21
`THREE.Vector3` in metres, MediaPipe index order (0 wrist, 1-4 thumb, 5-8 index, 9-12 middle, 13-16 ring,
17-20 pinky), TRUE world positions in a y-up, gravity-levelled frame with the phone camera at the origin
looking down -z (your right hand has x < 0). `hand.hide()` removes it. Bone lengths are the tracked ones
(not canonical). Replace `makeHand()` with a skinned mesh that binds to these 21 points and nothing else
in the pipeline changes. Thenar web = points 1-2-5, palm = 0-5-9-13-17.
