export const PALM_IDS=[0,5,9,13,17];
const sub=(a,b)=>a.map((x,i)=>x-b[i]),dot=(a,b)=>a.reduce((s,x,i)=>s+x*b[i],0),unit=a=>{const n=Math.hypot(...a);return a.map(x=>x/n);};
// One immutable template, scaled by the user's measured wrist-to-middle-knuckle length.
export function fixedPalm(points,length){
 if(points?.length!==5||!points.every(p=>p?.length===3&&p.every(Number.isFinite))||!(length>.02&&length<.2))return null;
 const forward=sub(points[2],points[0]),span=Math.hypot(...forward);if(span<1e-6)return null;
 const y=unit(forward),across=sub(points[1],points[4]),flat=across.map((v,i)=>v-dot(across,y)*y[i]);if(Math.hypot(...flat)<1e-6)return null;
 const x=unit(flat),scale=length/span;
 return points.map(p=>{const v=sub(p,points[0]);return [dot(v,x)*scale,dot(v,y)*scale,0];});
}
export function approximateCamera(aspect){return {fx:1/(2*Math.tan(Math.PI/6)*aspect),fy:1/(2*Math.tan(Math.PI/6)),cx:.5,cy:.5,aspect,distortion:[0,0,0,0,0],approximate:true};}
export function solvePalmPnP(cv,lm,model,k,aspect){
 if(!model||!PALM_IDS.every(i=>lm?.[i]&&Number.isFinite(lm[i].x)&&Number.isFinite(lm[i].y))||!k||Math.abs(aspect/k.aspect-1)>.01)return null;
 const w=640,h=w/aspect,im=PALM_IDS.flatMap(i=>[lm[i].x*w,lm[i].y*h]);
 const obj=cv.matFromArray(5,1,cv.CV_64FC3,model.flat()),img=cv.matFromArray(5,1,cv.CV_64FC2,im),K=cv.matFromArray(3,3,cv.CV_64F,[k.fx*w,0,k.cx*w,0,k.fy*h,k.cy*h,0,0,1]),D=cv.matFromArray(5,1,cv.CV_64F,k.distortion||[0,0,0,0,0]),r=new cv.Mat(),t=new cv.Mat(),projected=new cv.Mat(),R=new cv.Mat();
 try{
  if(!cv.solvePnP(obj,img,K,D,r,t,false,cv.SOLVEPNP_ITERATIVE))return null;
  cv.projectPoints(obj,r,t,K,D,projected);cv.Rodrigues(r,R);
  const depth=t.data64F[2],error=Math.sqrt(im.reduce((s,v,i)=>s+(projected.data64F[i]-v)**2,0)/5);
  const behind=model.some(p=>R.data64F[6]*p[0]+R.data64F[7]*p[1]+depth<=.02);
  return !behind&&depth>.04&&depth<4&&error<8?{depth,error,rotation:Array.from(r.data64F),translation:Array.from(t.data64F)}:null;
 }finally{for(const m of [obj,img,K,D,r,t,projected,R])m.delete();}
}
export function pnpSelfTest(cv){
 const model=[ [0,0,0],[.028,.066,0],[0,.075,0],[-.021,.07,0],[-.04,.057,0] ],k={fx:.95,fy:1.2,cx:.5,cy:.5,aspect:4/3,distortion:[0,0,0,0,0]};let maxError=0,maxFit=0;
 for(const depth of [.25,.5,.9])for(const angle of [0,.5,1.05]){
  const lm=Array.from({length:21},()=>({x:0,y:0}));model.forEach(([x,y,z],j)=>{const X=Math.cos(angle)*x+.025,Y=y-.04,Z=depth-Math.sin(angle)*x;lm[PALM_IDS[j]]={x:k.fx*X/Z+k.cx,y:k.fy*Y/Z+k.cy};});
  const result=solvePalmPnP(cv,lm,model,k,k.aspect);if(!result)throw Error('Known-pose PnP rejected');maxError=Math.max(maxError,Math.abs(result.depth-depth));maxFit=Math.max(maxFit,result.error);
  const curled=lm.map((p,i)=>PALM_IDS.includes(i)?p:{x:.1,y:.9});const second=solvePalmPnP(cv,curled,model,k,k.aspect);if(!second||Math.abs(second.depth-result.depth)>1e-8)throw Error('Finger bending affected the palm solve');
 }
 if(maxError>.001)throw Error('Known depth recovery exceeded 1 mm');return {maxDepthErrorMm:maxError*1000,maxFitPixels:maxFit};
}
