# MediaPipe PnP 2

No palm-length entry or measured-palm scaling. Uses all 21 MediaPipe world landmarks, centred at the wrist without rescaling, and their matching image landmarks in OpenCV solvePnP. Camera calibration with the iPad nine-cross target remains available; capture eight or more varied views and click the crosses in order. No printer needed.

Distance inherits MediaPipe's estimated world-coordinate scale. Camera calibration does not independently establish true hand dimensions. No claim of measured physical accuracy. The existing renderer uses the solved wrist depth; finger articulation/orientation remain MediaPipe-driven. Rejected fits visibly fall back to the size baseline. Contact/collision switches remain separate and default off.

Run known-depth self-test checks five-point historical and 21-point production solves against synthetic projections. These numerical checks do not establish live tracking accuracy.
