"""Blender: import an unrigged hand and render calibrated front/back views.
blender -b --python tools/hand-rig/prepare_model.py -- --input hand.obj --out work/hand
Orientation must be fingers +Y, dorsal side +Z. Inspect renders before binding.
"""
import argparse, json, math, sys
from pathlib import Path
import bpy
from mathutils import Vector

p=argparse.ArgumentParser();p.add_argument('--input',required=True);p.add_argument('--out',required=True)
p.add_argument('--rotate',type=float,nargs=3,default=[0,0,0],help='XYZ degrees applied after import')
p.add_argument('--scale',type=float,default=1);p.add_argument('--mesh',help='Only this mesh object; otherwise join imported meshes')
a=p.parse_args(sys.argv[sys.argv.index('--')+1:]);src=Path(a.input).resolve();out=Path(a.out).resolve();out.mkdir(parents=True,exist_ok=True)
bpy.ops.wm.read_factory_settings(use_empty=True)
if src.suffix.lower()=='.blend':bpy.ops.wm.open_mainfile(filepath=str(src))
elif src.suffix.lower()=='.obj':bpy.ops.wm.obj_import(filepath=str(src))
elif src.suffix.lower()=='.fbx':bpy.ops.import_scene.fbx(filepath=str(src))
elif src.suffix.lower() in ['.glb','.gltf']:bpy.ops.import_scene.gltf(filepath=str(src))
else:raise ValueError('Use OBJ, FBX, GLB, glTF or blend')
meshes=[o for o in bpy.context.scene.objects if o.type=='MESH' and (not a.mesh or o.name==a.mesh)]
if not meshes:raise ValueError('No matching mesh')
if any(m.type=='ARMATURE' for o in meshes for m in o.modifiers):raise ValueError('Input is already rigged: export its rest mesh or preserve/remap the existing rig manually')
bpy.ops.object.select_all(action='DESELECT')
for obj in meshes:
 matrix=obj.matrix_world.copy();obj.parent=None;obj.matrix_world=matrix;obj.select_set(True)
bpy.context.view_layer.objects.active=meshes[0];bpy.ops.object.join();obj=bpy.context.object;obj.name='HumanHand'
bpy.ops.object.transform_apply(location=True,rotation=True,scale=True)
obj.rotation_euler=[math.radians(x) for x in a.rotate];obj.scale=(a.scale,)*3
bpy.ops.object.transform_apply(location=True,rotation=True,scale=True)
for o in list(bpy.context.scene.objects):
 if o!=obj:bpy.data.objects.remove(o,do_unlink=True)
v=[vertex.co for vertex in obj.data.vertices];lo=Vector(tuple(min(x[i] for x in v) for i in range(3)));hi=Vector(tuple(max(x[i] for x in v) for i in range(3)));center=(lo+hi)/2;span=hi-lo
width,height=900,1200;ortho=max(span.y*1.12,span.x*1.12/(width/height));distance=max(span)*3
if not obj.data.materials:
 mat=bpy.data.materials.new('Skin');mat.diffuse_color=(.55,.38,.3,1);obj.data.materials.append(mat)
world=bpy.context.scene.world or bpy.data.worlds.new('World');bpy.context.scene.world=world;world.use_nodes=True;world.node_tree.nodes['Background'].inputs[0].default_value=(.3,.3,.3,1)
def aim(o):o.rotation_euler=(center-o.location).to_track_quat('-Z','Y').to_euler()
for sign in [-1,1]:
 bpy.ops.object.light_add(type='AREA',location=center+Vector((distance*.5,distance*.5,sign*distance)));light=bpy.context.object;light.data.energy=350*(distance/3)**2;light.data.shape='DISK';light.data.size=distance;aim(light)
bpy.ops.object.camera_add();cam=bpy.context.object;cam.data.type='ORTHO';cam.data.ortho_scale=ortho;cam.data.clip_end=distance*10
scene=bpy.context.scene;scene.camera=cam;scene.render.engine='CYCLES';scene.cycles.samples=16;scene.render.resolution_x=width;scene.render.resolution_y=height;scene.render.resolution_percentage=100
for name,sign in [('front',1),('back',-1)]:
 cam.location=center+Vector((0,0,sign*distance));aim(cam);scene.render.filepath=str(out/(name+'.png'));bpy.ops.render.render(write_still=True)
for img in bpy.data.images:
 if img.source=='FILE':img.pack()
(out/'projection.json').write_text(json.dumps({'center':list(center),'orthoHeight':ortho,'width':width,'height':height},indent=2))
bpy.ops.wm.save_as_mainfile(filepath=str(out/'prepared.blend'))
