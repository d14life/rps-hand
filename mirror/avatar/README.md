# User-provided sculpture head

Source: `the-head-of-the-sculpture-use-zbrush.zip` supplied by the user, containing
`source/basicfacerenew7.zip.zip` and `basicfacerenew7.OBJ`. The archive contained
geometry only, no textures or material maps. A white, rough sculpture material is used.

Neck removed with an oblique plane just under the jaw; opening capped. Mesh reduced
from 294,336 vertices to 32,695 vertices / 65,139 faces (about 1.18MB GLB).
Height is 0.24m. Pivot is approximately between the eyes. Blender forward +Y
exports as glTF forward -Z, matching the first-person camera.

`TrackedHead.js` places the head at the tracked viewpoint. The local first-person
camera excludes its layer (1), avoiding the inside of the face blocking vision.
A collapsible preview shows a mirrored copy following smoothed yaw/pitch without
navigation gain. The preview is labelled when no face is detected. This is rigid
head tracking; the sculpture does not contain an expression/blink rig.

Editable cropped source and the processing script are included in the GitHub
handoff under `assets/head-rig/` and `tools/head-rig/`.

The main room now includes a framed planar mirror using Three.js Reflector. Its reflection camera enables layer 1 to show the local head; the first-person camera still excludes that layer. Avatar transforms update before the main scene render to keep reflections current. The 768x768 reflection target has MSAA disabled for mobile cost.
