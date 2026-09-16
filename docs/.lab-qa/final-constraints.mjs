import * as T from 'three';
import {finalHandLimits} from '../hand-live-limits/final-hand-limits.mjs?v=constraints3';
import {finalConfig} from '../hand-range/settings.mjs?v=constraints3';
const names=['Thumb','Index','Middle','Ring','Pinky'],rad=Math.PI/180;
let checks=0;const assert=(v,m)=>{checks++;if(!v)throw Error(m);};
try{
 for(const side of ['L','R'])for(let n=0;n<100;n++){
  const rig={rest:{}},sgn=side==='R'?1:-1;
  for(let f=0;f<5;f++)for(let k=1;k<4;k++)rig.rest[side+names[f]+k]={world:new T.Vector3(-f*.04,k*.03,0)};
  const chains=names.map((_,f)=>{const c=[rig.rest[side+names[f]+'1'].world.clone()];for(let k=1;k<4;k++){const flex=(-60+(n*13+k*29)%210)*rad,splay=(-40+(n*7+k*19)%80)*rad;c.push(c[k-1].clone().add(new T.Vector3(Math.sin(splay),Math.cos(splay)*Math.cos(flex),sgn*Math.cos(splay)*Math.sin(flex)).multiplyScalar(.03)));}return c;});
  const lengths=names.map(()=>[.03,.03,.03]),lm=Array.from({length:21},(_,i)=>({x:i*.02,y:.5})),q=new T.Quaternion();
  const original=chains.map(c=>c.map(p=>p.clone()));
  finalHandLimits()(chains,lengths,rig,side,q,lm,1280,1280,{...finalConfig,jointLimits:false});
  assert(chains.every((c,f)=>c.every((p,k)=>p.distanceTo(original[f][k])<1e-10)),'disabled constraints change pose');
  const result=finalHandLimits()(chains,lengths,rig,side,q,lm,1280,1280,finalConfig);
  for(let f=1;f<5;f++){
   const a=result.after[f-1];assert(a.flex>=-35-1e-6&&a.flex<=90+1e-6,'base flex');
   const c=chains[f],dirs=[1,2,3].map(k=>c[k].clone().sub(c[k-1]).normalize());
   const axis=new T.Vector3(1,0,0).addScaledVector(dirs[0],-dirs[0].x).normalize().multiplyScalar(sgn);
   for(let k=1;k<3;k++){assert(Math.abs(dirs[k].dot(axis))<1e-6,'upper sideways');const angle=Math.atan2(axis.dot(new T.Vector3().crossVectors(dirs[k-1],dirs[k])),dirs[k-1].dot(dirs[k]))/rad;assert(angle>=-1e-6&&angle<=(k===1?110:80)+1e-6,'upper signed bend');}
   if(a.flex>=90-1e-6)assert(Math.abs(a.splay)<1e-6,'curl side lock');
  }
  assert(chains[0].every((v,k)=>v.distanceTo(original[0][k])<1e-9),'thumb changed despite no thumb limits');
  for(const c of chains)for(let k=1;k<4;k++)assert(Math.abs(c[k].distanceTo(c[k-1])-.03)<1e-8,'bone length changed');
 }
 document.querySelector('#results').textContent=`PASS: ${checks} assertions across 200 left/right poses. Disabled identity, joint bounds, signed hinges, curl lock and fixed lengths.`;
}catch(e){document.querySelector('#results').textContent='FAIL: '+e.stack;}
