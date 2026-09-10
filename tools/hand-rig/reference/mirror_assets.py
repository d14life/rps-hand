import bpy,os,math
from mathutils import Vector
from mathutils.kdtree import KDTree
bpy.ops.wm.open_mainfile(filepath=os.path.abspath('outputs/tracked-hand/tracked-hand.blend'))
obj=bpy.data.objects['HumanHand'];rig=bpy.data.objects['TrackedHandRig']
tree=KDTree(len(obj.data.vertices))
for vertex in obj.data.vertices:tree.insert(vertex.co,vertex.index)
tree.balance()
# Restore source detail rather than upsampling the mobile export.
for img in list(bpy.data.images):
 if img.source=='FILE' and img.filepath:
  path=os.path.abspath('work/hand/textures/'+os.path.basename(img.filepath))
  if os.path.exists(path):
   fresh=bpy.data.images.load(path,check_existing=False)
   fresh.colorspace_settings.name=img.colorspace_settings.name
   if max(fresh.size)>2048:fresh.scale(2048,2048)
   for mat in bpy.data.materials:
    if mat.use_nodes:
     for node in mat.node_tree.nodes:
      if node.type=='TEX_IMAGE' and node.image==img:node.image=fresh
   fresh.pack()
mat=bpy.data.materials.new('Natural nail keratin');mat.use_nodes=True
bs=mat.node_tree.nodes.get('Principled BSDF');bs.inputs['Roughness'].default_value=.28;bs.inputs['Coat Weight'].default_value=.35;bs.inputs['Coat Roughness'].default_value=.24
col=mat.node_tree.nodes.new('ShaderNodeVertexColor');col.layer_name='Nail tint';mat.node_tree.links.new(col.outputs['Color'],bs.inputs['Base Color'])
nails=[]
for name,width,length in [('thumb',.0062,.013),('index',.0045,.011),('middle',.0048,.012),('ring',.0045,.011),('pinky',.0037,.009)]:
 distal=name+('_ip' if name=='thumb' else '_dip');bone=rig.data.bones[distal];tip=rig.data.bones[name+'_tip'].head_local
 d=(tip-bone.head_local).normalized();n=Vector((0,0,1));n=(n-d*n.dot(d)).normalized();x=d.cross(n).normalized()
 center=tip-d*(length*.37)
 vs=[];colors=[];faces=[];segments=48;rings=10
 # A curved nail shell follows the scanned dorsal surface, with an ivory free edge.
 for ring in range(rings+1):
  r=max(.001,ring/rings)
  for j in range(segments):
   angle=2*math.pi*j/segments;u=r*math.cos(angle);v=r*math.sin(angle)
   p=center+x*(u*width)+d*(v*length*.5)
   hit,q,normal,_=obj.ray_cast(p+n*.05,-n)
   if not hit:q=p+n*.004
   vs.append(q+n*(.00045+.00022*(1-r*r)))
   edge=max(0,min(1,(v-.64)/.13));moon=max(0,1-((u/.75)**2+((v+.86)/.27)**2))*.35
   bed=Vector((.69,.43,.40));ivory=Vector((.86,.82,.73));c=bed.lerp(ivory,max(edge,moon));colors.append((*c,1))
   if ring:
    a=(ring-1)*segments+j;b=(ring-1)*segments+(j+1)%segments;c0=ring*segments+(j+1)%segments;e=ring*segments+j;faces.append((a,e,c0,b))
 me=bpy.data.meshes.new(name+' nail');me.from_pydata(vs,[],faces);me.update();nail=bpy.data.objects.new(name+' nail',me);bpy.context.collection.objects.link(nail);nail.data.materials.append(mat)
 attr=me.color_attributes.new(name='Nail tint',type='FLOAT_COLOR',domain='POINT')
 for i,c in enumerate(colors):attr.data[i].color=c
 for f in me.polygons:f.use_smooth=True
 nail.parent=rig
 for group in obj.vertex_groups:nail.vertex_groups.new(name=group.name)
 for vi,pos in enumerate(vs):
  _,nearest,_=tree.find(pos)
  for weight in obj.data.vertices[nearest].groups:nail.vertex_groups[weight.group].add([vi],weight.weight,'REPLACE')
 arm=nail.modifiers.new('Tracked distal joint','ARMATURE');arm.object=rig;nails.append(nail)
bpy.ops.object.select_all(action='DESELECT');obj.select_set(True);rig.select_set(True)
for nail in nails:nail.select_set(True)
bpy.ops.export_scene.gltf(filepath=os.path.abspath('work/hand-preview/dist/mirror/hand/tracked-hand.glb'),export_format='GLB',use_selection=True,export_animations=False,export_yup=True)
print('NAILS',len(nails),'independent curved shells')
