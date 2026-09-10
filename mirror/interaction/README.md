# Inspect objects with tracked hands

First-person mode provides a cube, knot and a copy of the supplied sculpture.
Move thumb/index near an object until its cage turns green, pinch, then translate
or rotate the wrist. Open fingers to release. Objects remain where released;
there is no gravity, throwing, collision physics or two-hand scaling in this demo.
Reset objects restores the initial arrangement. Photo fixtures display objects
but cannot manipulate them; live hand frames drive interaction.

Grip coordinates use the same filtered/predicted points and worldGroup matrix
as the rendered hand (including first-person rotation, head origin and reach
offset). Thumb/index midpoint is the grip; wrist/middle and index/pinky bases
define its orthonormal rotation. Head camera rotation is not applied to the grip.

Pinch distance / palm width closes below .33 and releases above .55. A fresh
open observation is required before pickup, with 70ms sustained closure near an
unowned object. Transitions consume only fresh detector timestamps. One hand
owns an object at a time. Relative position/rotation at pickup is retained,
preventing snapping. A >250ms stale observation releases the object in place.

Run interaction/verify.html to test acquisition, no-snap pickup, translation,
rotation, release, open-before-grab, regrab, loss handling and reset with synthetic
landmarks through the actual controller. Camera accuracy and gesture feel still
require live device testing; this is approximate webcam spatial interaction.
