# RPS hand and tracked mesh workflow

For replacing the hand model in another coding session, start with **[HANDOFF.md](HANDOFF.md)**. It contains the complete method, runnable commands, coordinate conventions, model-swap checklist, and known limits.

- [Mirror app](mirror/index.html): current textured rig, nails and corrected folded-finger deformation.
- [Blender pipeline](tools/hand-rig/): import/render, detect, bind, smooth and export a new model.
- [Editable hand assets](assets/hand-rig/): unrigged reference, paired landmark template and current rig.
- [Runtime renderer](mirror/hand/TrackedHand.js): connect all 21 joints to the existing detector.
- [Pose checks](mirror/hand/verify.html): rest, scissors, thumbs-up/down and left pointing.

The root app retains upstream build 9. The mirror is a separate reproducible mesh example. This branch does not substitute its older tracker snapshot for the root app's newer tracking changes.

Run `python -m http.server 8000` from this directory, then open `http://localhost:8000/mirror/?img=thumbs_down.jpg`.
