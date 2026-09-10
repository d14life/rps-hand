# Original implementation scripts

These are the exact source-specific scripts used while building the supplied hand, retained to explain the derivation of the method. Their `work/...` and `outputs/...` paths refer to the original working layout and are not portable entrypoints.

Use the parameterized scripts one directory above for a new model. Start at the repository's `HANDOFF.md`. In particular, the old orthographic constants and anatomical landmark coordinates must not be copied blindly to another source. The final shader's rotation and affine/volume correction lives in `mirror/hand/TrackedHand.js`, not in these Blender scripts.
