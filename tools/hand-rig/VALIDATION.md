# Packaging validation

Validated on 2026-09-10 with Blender 5.2.0, Python 3.13, the app's HandLandmarker and Three.js 0.186.0.

- All packaged Python scripts compile.
- `prepare_model.py` imports the included reference rest file, renders both sides, records projection metadata and saves a prepared scene.
- `detect_landmarks.py` detects 21 points in both generated reference views using the local copy of the app's model.
- `bind_model.py` completes both manual-landmark and automatic-detection workflows on that reference.
- The portable manual rebuild has 17,822 mesh vertices, 21 joints and at most four skin weights per vertex. `add_nails.py` exports five nail shells and a Blender file.
- The rebuilt asset, served with the current renderer, passes all five browser fixtures: rest, scissors, thumbs-up, thumbs-down and left pointing. Maximum weight-sum error was below 5e-8; actual bone-to-target error was below 2e-15 m including a mirrored/translated parent. No unweighted vertices or shader failures were reported. Invalid input leaves the previous pose intact.

These checks verify the packaged reference and its transformations, not anatomical correctness for every hand or compatibility with every untested source. A new model needs inspected joint placement, fitted weights and visual/live-camera tests. The CGTrader model requested in the conversation was not available for testing.
