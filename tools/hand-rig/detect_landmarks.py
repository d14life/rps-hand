"""Regular Python, not Blender. Use the exact app HandLandmarker on calibrated renders."""
import argparse,json,urllib.request
from pathlib import Path
import mediapipe as mp
from mediapipe.tasks.python import BaseOptions
from mediapipe.tasks.python.vision import HandLandmarker,HandLandmarkerOptions,RunningMode
MODEL='https://storage.googleapis.com/mediapipe-models/hand_landmarker/hand_landmarker/float16/latest/hand_landmarker.task'
p=argparse.ArgumentParser();p.add_argument('--directory',required=True);p.add_argument('--model');a=p.parse_args()
root=Path(a.directory);model=Path(a.model) if a.model else root/'hand_landmarker.task'
if not model.exists():urllib.request.urlretrieve(MODEL,model)
opts=HandLandmarkerOptions(base_options=BaseOptions(model_asset_path=str(model)),running_mode=RunningMode.IMAGE,num_hands=1,min_hand_detection_confidence=.3,min_hand_presence_confidence=.3)
results={}
with HandLandmarker.create_from_options(opts) as tracker:
 for side in ['front','back']:
  result=tracker.detect(mp.Image.create_from_file(str(root/(side+'.png'))))
  if not result.hand_landmarks:raise RuntimeError(f'No hand detected in {side}; correct orientation/material/render or supply manual landmarks')
  results[side]={'image':[{'x':p.x,'y':p.y,'z':p.z} for p in result.hand_landmarks[0]],'handedness':result.handedness[0][0].category_name}
(root/'detections.json').write_text(json.dumps(results,indent=2));print('Saved detections. Inspect both renders; these are estimates, not anatomical measurements.')
