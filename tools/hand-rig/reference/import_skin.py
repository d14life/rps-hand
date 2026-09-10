import bpy,xml.etree.ElementTree as E,numpy as np,os,math,json
from mathutils import Vector
bpy.ops.wm.read_factory_settings(use_empty=True)
r=E.parse('work/hand/source/model/model/model.dae').getroot();ns={'c':r.tag.split('}')[0][1:]};m=r.find('.//c:geometry/c:mesh',ns)
sources={}
for s in m.findall('c:source',ns):
 stride=int(s.find('.//c:accessor',ns).get('stride'));sources[s.get('id')]=np.array(s.find('c:float_array',ns).text.split(),dtype=float).reshape(-1,stride)
poly=m.find('c:polylist',ns);inputs={x.get('semantic'):(int(x.get('offset')),x.get('source')[1:]) for x in poly.findall('c:input',ns)};print(inputs)
stride=max(o for o,s in inputs.values())+1;ind=np.array(poly.find('c:p',ns).text.split(),dtype=int).reshape(-1,stride);counts=np.array(poly.find('c:vcount',ns).text.split(),dtype=int)
v=sources['meshId0-positions'];coords=np.column_stack((-v[:,2],-.8*v[:,1]+.6*v[:,0],.8*v[:,0]+.6*v[:,1]));coords[:,1]+=1.3
faces=[];start=0
for n in counts:faces.append(ind[start:start+n,inputs['VERTEX'][0]].tolist());start+=n
me=bpy.data.meshes.new('HumanHand');me.from_pydata(coords.tolist(),[],faces);me.update();obj=bpy.data.objects.new('HumanHand',me);bpy.context.collection.objects.link(obj);bpy.context.view_layer.objects.active=obj;obj.select_set(True)
uv=me.uv_layers.new();uvvalues=sources[inputs['TEXCOORD'][1]];uvind=ind[:,inputs['TEXCOORD'][0]]
for l in me.loops:uv.data[l.index].uv=uvvalues[uvind[l.index]][:2]
mat=bpy.data.materials.new('Original skin');mat.use_nodes=True;p=mat.node_tree.nodes.get('Principled BSDF');obj.data.materials.append(mat)
for file,socket in [('Hands_Low_defaultMat1_albedo.jpeg','Base Color'),('Hands_Low_defaultMat1_roughness.jpeg','Roughness'),('Hands_Low_defaultMat1_normal.png','Normal')]:
 t=mat.node_tree.nodes.new('ShaderNodeTexImage');t.image=bpy.data.images.load(os.path.abspath('work/hand/textures/'+file))
 if socket!='Base Color':t.image.colorspace_settings.name='Non-Color'
 if socket=='Normal':
  n=mat.node_tree.nodes.new('ShaderNodeNormalMap');n.inputs['Strength'].default_value=.5;mat.node_tree.links.new(t.outputs['Color'],n.inputs['Color']);mat.node_tree.links.new(n.outputs[0],p.inputs[socket])
 else:mat.node_tree.links.new(t.outputs['Color'],p.inputs[socket])
p.inputs['Subsurface Weight'].default_value=.08
for p in me.polygons:p.use_smooth=True
world=bpy.data.worlds.new('Studio');world.use_nodes=True;world.node_tree.nodes['Background'].inputs[0].default_value=(.25,.25,.25,1);bpy.context.scene.world=world
def aim(o,pt):o.rotation_euler=(Vector(pt)-o.location).to_track_quat('-Z','Y').to_euler()
for loc,power in [((2,3,4),350),((-2,2,-4),350)]:
 bpy.ops.object.light_add(type='AREA',location=loc);l=bpy.context.object;l.data.energy=power;l.data.size=4;aim(l,(0,1.3,0))
bpy.ops.object.camera_add();cam=bpy.context.object;cam.data.type='ORTHO';cam.data.ortho_scale=3.1;s=bpy.context.scene;s.camera=cam;s.render.engine='CYCLES';s.cycles.samples=16;s.render.resolution_x=850;s.render.resolution_y=1000;s.render.resolution_percentage=100
for name,z in [('skin_front',5),('skin_back',-5)]:
 cam.location=(0,1.3,z);aim(cam,(0,1.3,0));s.render.filepath=os.path.abspath('work/'+name+'.png');bpy.ops.render.render(write_still=True)
json.dump(coords.tolist(),open('work/skin_vertices.json','w'));bpy.ops.wm.save_as_mainfile(filepath=os.path.abspath('work/skin-prepared.blend'))
