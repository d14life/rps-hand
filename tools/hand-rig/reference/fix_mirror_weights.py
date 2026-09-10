import bpy,os,numpy as np
bpy.ops.wm.open_mainfile(filepath=os.path.abspath('outputs/tracked-hand/tracked-hand.blend'))
obj=bpy.data.objects['HumanHand'];rig=bpy.data.objects['TrackedHandRig'];N=len(obj.data.vertices)
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
for _ in range(32):
 accum=np.zeros_like(w);np.add.at(accum,a,w[b]*strength[:,None]);w=.45*w+.55*accum/np.maximum(sums[:,None],1e-10);w[fixed]=original[fixed]
for v in obj.data.vertices:
 vals=w[v.index];keep=np.argsort(vals)[-4:];vals0=vals[keep];vals0/=vals0.sum()
 for g in list(v.groups):obj.vertex_groups[g.group].remove([v.index])
 for g,value in zip(keep,vals0):
  if value>1e-6:obj.vertex_groups[int(g)].add([v.index],float(value),'REPLACE')
bpy.ops.wm.save_as_mainfile(filepath=os.path.abspath('work/fixed-skin.blend'))
print('Smoothed surface weights',N)
