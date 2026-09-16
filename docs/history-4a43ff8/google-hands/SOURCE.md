Official Google MediaPipe web samples with a local phone-video adapter
Source: https://github.com/google-ai-edge/mediapipe-samples-web
Commit: bbb8974ffd450650ad5a1e7c1656c9debb8e38bf
Apache-2.0 license included. Google task workers and models unchanged.
Local change: BaseVisionTask offers Phone camera QR with 480p/720p/1080p, receiving video through ../hand-demo/video-link.mjs. All inference runs on the receiving computer.
Select Webcam, then Phone camera QR. Image mode and local webcam remain available.
Build base: /rps-hand/google-hands/. Package self-link removed for npm installation.
Adapter source retained at tools/google-phone/base-vision-task.ts for reproduction against the pinned upstream commit.
