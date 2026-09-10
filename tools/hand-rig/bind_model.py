"""Blender: bind a prepared right-hand mesh to the 21 tracker points.
See HANDOFF.md. Prepared scene must have an unrigged, identity-transform HumanHand mesh.
"""
import bpy,bmesh,json,os,sys,argparse,numpy as np
from pathlib import Path
from mathutils import Vector
p=argparse.ArgumentParser();p.add_argument('--blend',required=True);p.add_argument('--out',required=True)
p.add_argument('--landmarks',help='JSON with points: 21 Blender-space [x,y,z] centres')
p.add_argument('--detections');p.add_argument('--projection');p.add_argument('--decimate',type=float,default=1)
p.add_argument('--keep-forearm',action='store_true');p.add_argument('--smooth-iterations',type=int,default=32)
args=p.parse_args(sys.argv[sys.argv.index('--')+1:]);output=Path(args.out).resolve();output.mkdir(parents=True,exist_ok=True)
bpy.ops.wm.open_mainfile(filepath=str(Path(args.blend).resolve()))
obj=bpy.data.objects.get('HumanHand')
if not obj or obj.type!='MESH':raise ValueError('Need HumanHand mesh')
if any(m.type=='ARMATURE' for m in obj.modifiers):raise ValueError('Use an unrigged rest mesh')
bpy.context.view_layer.objects.active=obj;bpy.ops.object.select_all(action='DESELECT');obj.select_set(True)
if args.landmarks:
 data=json.loads(Path(args.landmarks).read_text());points=[Vector(v) for v in data['points']]
else:
 if not args.detections or not args.projection:raise ValueError('Supply --landmarks or both --detections and --projection')
 data=json.loads(Path(args.detections).read_text());projection=json.loads(Path(args.projection).read_text())
 front=data['front']['image'];back=data['back']['image'];cx,cy,cz=projection['center'];height=projection['orthoHeight'];aspect=projection['width']/projection['height'];points=[]
 vv=np.array([v.co[:] for v in obj.data.vertices]);extent=max(np.ptp(vv,axis=0))*4
 for i in range(21):
  x=cx+(front[i]['x']-back[i]['x'])*.5*height*aspect
  y=cy+(.5-(front[i]['y']+back[i]['y'])*.5)*height
  ok1,v1,_,_=obj.ray_cast(Vector((x,y,cz+extent)),Vector((0,0,-1)))
  ok2,v2,_,_=obj.ray_cast(Vector((x,y,cz-extent)),Vector((0,0,1)))
  if not(ok1 and ok2):raise ValueError(f'Joint {i} misses mesh. Correct its landmark manually; do not guess silently.')
  points.append(Vector((x,y,(v1.z+v2.z)*.5)))
if len(points)!=21 or not np.isfinite(np.array(points)).all():raise ValueError('Exactly 21 finite centres are required')
if (points[12]-points[0]).length<1e-8:raise ValueError('Degenerate reference hand')
# Centre the wrist and set an approximately 18 cm wrist-to-middle-tip length.
origin=points[0].copy();scale=.18/(points[12]-origin).length
for v in obj.data.vertices:v.co=(v.co-origin)*scale
points=[(p-origin)*scale for p in points]
bpy.ops.object.mode_set(mode='EDIT');bpy.ops.mesh.select_all(action='SELECT');bpy.ops.mesh.remove_doubles(threshold=.000001);bpy.ops.object.mode_set(mode='OBJECT')
dec=obj.modifiers.new('Realtime surface','DECIMATE');dec.ratio=args.decimate;bpy.ops.object.modifier_apply(modifier=dec.name)
# Keep the hand and a short wrist edge, matching the app's hand-only design.
if not args.keep_forearm:
 bm=bmesh.new();bm.from_mesh(obj.data)
 bmesh.ops.bisect_plane(bm,geom=list(bm.verts)+list(bm.edges)+list(bm.faces),dist=1e-7,plane_co=(0,-.012,0),plane_no=(0,1,0),clear_inner=True,clear_outer=False)
 cut=[e for e in bm.edges if e.is_boundary and all(abs(v.co.y+.012)<1e-5 for v in e.verts)]
 if cut:bmesh.ops.holes_fill(bm,edges=cut,sides=0)
 bm.to_mesh(obj.data);bm.free();obj.data.update()
names=['wrist','thumb_cmc','thumb_mcp','thumb_ip','thumb_tip','index_mcp','index_pip','index_dip','index_tip','middle_mcp','middle_pip','middle_dip','middle_tip','ring_mcp','ring_pip','ring_dip','ring_tip','pinky_mcp','pinky_pip','pinky_dip','pinky_tip']
parents=[None,0,1,2,3,0,5,6,7,0,9,10,11,0,13,14,15,0,17,18,19];tips=[4,8,12,16,20]
bpy.ops.object.select_all(action='DESELECT');bpy.ops.object.armature_add();rig=bpy.context.object;rig.name='TrackedHandRig';rig.show_in_front=True;bpy.ops.object.mode_set(mode='EDIT');rig.data.edit_bones.remove(rig.data.edit_bones[0])
for i,p in enumerate(points):
 bone=rig.data.edit_bones.new(names[i]);bone.head=p;bone.tail=points[9] if i==0 else (p+(p-points[i-1]).normalized()*.006 if i in tips else points[i+1]);bone.align_roll(Vector((0,0,1)));bone.use_deform=i not in tips
 if parents[i] is not None:bone.parent=rig.data.edit_bones[names[parents[i]]]
bpy.ops.object.mode_set(mode='OBJECT');obj.parent=rig
arm=obj.modifiers.new('Tracked skeleton','ARMATURE');arm.object=rig
obj.vertex_groups.clear()
for n in names:obj.vertex_groups.new(name=n)
# Bind each digit only to its own three phalanges. Heat weighting leaks between
# adjacent fingers on this scanned surface, so use centreline domains instead.
vv=np.array([v.co[:] for v in obj.data.vertices]);pp=np.array([p[:] for p in points]);chains=[[1,2,3,4],[5,6,7,8],[9,10,11,12],[13,14,15,16],[17,18,19,20]]
domains=[]
for ids in chains:
 lengths=np.linalg.norm(np.diff(pp[ids],axis=0),axis=1);cumulative=np.r_[0,np.cumsum(lengths)]
 distances=[];positions=[]
 for j in range(3):
  aa=pp[ids[j]];d=pp[ids[j+1]]-aa;t=(vv-aa)@d/(d@d);closest=aa+np.clip(t,0,1)[:,None]*d
  arc_t=np.minimum(t,1) if j==0 else np.maximum(t,0) if j==2 else np.clip(t,0,1)
  distances.append(np.linalg.norm(vv-closest,axis=1));positions.append(cumulative[j]+arc_t*lengths[j])
 distances=np.array(distances).T;positions=np.array(positions).T;nearest=np.argmin(distances,axis=1);rr=np.arange(len(vv))
 domains.append((distances[rr,nearest],positions[rr,nearest],cumulative,ids))
winner=np.argmin(np.array([d[0] for d in domains]),axis=0)
def smooth(a,b,x):
 t=max(0,min(1,(x-a)/(b-a)));return t*t*(3-2*t)
for v in obj.data.vertices:
 fi=winner[v.index];dist,s,cum,ids=domains[fi];s=s[v.index]
 activation=smooth(-.012,.008,s) if fi else smooth(-.012,.025,s)
 weights={0:1-activation};segment=0
 for joint in [1,2]:
  width=min(.010,(cum[joint]-cum[joint-1])*.45,(cum[joint+1]-cum[joint])*.48)
  if s<cum[joint]-width:break
  if s<=cum[joint]+width:
   blend=smooth(cum[joint]-width,cum[joint]+width,s)
   weights[ids[joint-1]]=activation*(1-blend);weights[ids[joint]]=activation*blend;segment=None;break
  segment=joint
 if segment is not None:weights[ids[segment]]=activation
 for i,w in weights.items():
  if w>1e-8:obj.vertex_groups[names[i]].add([v.index],w,'REPLACE')
N=len(obj.data.vertices)
w=np.zeros((N,len(obj.vertex_groups)),dtype=np.float64)
for v in obj.data.vertices:
 for g in v.groups:w[v.index,g.group]=g.weight
original=w.copy();pos=np.array([v.co[:] for v in obj.data.vertices]);edges=np.array([e.vertices[:] for e in obj.data.edges]);a=np.r_[edges[:,0],edges[:,1]];b=np.r_[edges[:,1],edges[:,0]]
strength=1/np.maximum(np.linalg.norm(pos[a]-pos[b],axis=1),.0002);sums=np.bincount(a,weights=strength,minlength=N)
# Smooth along connected mesh edges, never across the gaps between fingers.
# Keep fingertip cores and wrist anchored; only the transition surface softens.
fixed=pos[:,1]<.015
for bone in rig.data.bones:
 if bone.name.endswith('_tip'):fixed |= np.linalg.norm(pos-np.array(bone.head_local),axis=1)<.006
for _ in range(args.smooth_iterations):
 accum=np.zeros_like(w);np.add.at(accum,a,w[b]*strength[:,None]);w=.45*w+.55*accum/np.maximum(sums[:,None],1e-10);w[fixed]=original[fixed]
for v in obj.data.vertices:
 vals=w[v.index];keep=np.argsort(vals)[-4:];vals0=vals[keep];vals0/=vals0.sum()
 for g in list(v.groups):obj.vertex_groups[g.group].remove([v.index])
 for g,value in zip(keep,vals0):
  if value>1e-6:obj.vertex_groups[int(g)].add([v.index],float(value),'REPLACE')
next(m for m in obj.modifiers if m.type=='ARMATURE').use_deform_preserve_volume=True
for i,n in enumerate(names):rig.data.bones[n]['mediapipe_index']=i
out=str(output)
manifest={'version':2,'source':Path(args.blend).name,'sourceHandedness':'Right','units':'metres','jointNames':names,'parents':parents,'restLandmarks':[[p.x,p.z,-p.y] for p in points],'fingers':{'thumb':[1,2,3],'index':[5,6,7],'middle':[9,10,11],'ring':[13,14,15],'pinky':[17,18,19]},'jointPlacement':'Manual landmarks' if args.landmarks else 'Detector estimates back-projected between mesh surfaces; not anatomical ground truth'}
json.dump(manifest,open(out+'/rig.json','w'),indent=2)
for img in bpy.data.images:
 if img.source=='FILE':
  if max(img.size)>2048:img.scale(2048,2048)
  img.pack()
bpy.ops.object.select_all(action='DESELECT');obj.select_set(True);rig.select_set(True)
bpy.ops.export_scene.gltf(filepath=out+'/tracked-hand.glb',export_format='GLB',use_selection=True,export_animations=False,export_yup=True)
bpy.ops.wm.save_as_mainfile(filepath=str(output/'rigged-hand.blend'))
print('VALIDATED',len(obj.data.vertices),'vertices',len(rig.data.bones),'joints',max(len(v.groups) for v in obj.data.vertices),'max weights')
