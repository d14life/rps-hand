import bpy,bmesh,math,json
from mathutils import Vector
from pathlib import Path
root=Path(__file__).resolve().parents[2]
bpy.ops.wm.open_mainfile(filepath=str(root/'assets/head-rig/source-normalized.blend'))
o=next(o for o in bpy.context.scene.objects if o.type=='MESH');bpy.context.view_layer.objects.active=o;o.select_set(True)
bm=bmesh.new();bm.from_mesh(o.data)
bmesh.ops.bisect_plane(bm,geom=list(bm.verts)+list(bm.edges)+list(bm.faces),dist=0.00001,plane_co=(0,0,-.27),plane_no=(0,.4,1),clear_inner=True,clear_outer=False)
edges=[e for e in bm.edges if e.is_boundary]
if edges:bmesh.ops.holes_fill(bm,edges=edges,sides=0)
bmesh.ops.recalc_face_normals(bm,faces=list(bm.faces));bm.to_mesh(o.data);bm.free()
mod=o.modifiers.new('Phone mesh','DECIMATE');mod.ratio=min(1,65000/max(1,len(o.data.polygons)));bpy.ops.object.modifier_apply(modifier=mod.name)
# 24cm crown-to-jaw height, with the pivot between the eyes.
height=max(v.co.z for v in o.data.vertices)-min(v.co.z for v in o.data.vertices)
for v in o.data.vertices:v.co=(v.co-Vector((0,.40,.12)))*(.24/height)
for p in o.data.polygons:p.use_smooth=True
o.name='SculptureHead';mat=bpy.data.materials.new('White sculpture');mat.use_nodes=True
bsdf=mat.node_tree.nodes.get('Principled BSDF');bsdf.inputs['Base Color'].default_value=(.76,.73,.69,1);bsdf.inputs['Roughness'].default_value=.68
o.data.materials.clear();o.data.materials.append(mat)
out=root/'mirror/avatar';out.mkdir(exist_ok=True)
bpy.ops.wm.save_as_mainfile(filepath=str(root/'assets/head-rig/head-only.blend'))
bpy.ops.export_scene.gltf(filepath=str(out/'head.glb'),export_format='GLB',use_selection=True,export_yup=True)
print('RESULT',len(o.data.vertices),len(o.data.polygons),list(o.dimensions))
scene=bpy.context.scene;scene.render.engine='BLENDER_EEVEE';scene.render.resolution_x=600;scene.render.resolution_y=600;scene.render.resolution_percentage=100;scene.world.color=(.15,.15,.15)
for pos in [(.3,.4,.5),(-.3,.2,.1)]:
 bpy.ops.object.light_add(type='AREA',location=pos);bpy.context.object.data.energy=15;bpy.context.object.data.size=.4
for name,pos in [('cut-front',(0,.6,.02)),('cut-side',(.6,0,.02))]:
 bpy.ops.object.camera_add(location=pos);cam=bpy.context.object;cam.rotation_euler=(Vector((0,0,0))-cam.location).to_track_quat('-Z','Y').to_euler();cam.data.type='ORTHO';cam.data.ortho_scale=.31;scene.camera=cam;scene.render.filepath=str(root/('assets/head-rig/'+name+'.png'));bpy.ops.render.render(write_still=True)
