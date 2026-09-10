import assert from 'node:assert/strict';
import { facePose, ViewPose } from './pose.mjs';
const mesh = (yaw=0, pitch=0, aspect=4/3) => {
  const p = Array.from({length:478}, () => ({x:.5,y:.5,z:0}));
  for (const [i,x,y] of [[234,-.15,0],[454,.15,0],[10,0,-.2],[152,0,.2]]) {
    const yy=y*Math.cos(pitch), z=y*Math.sin(pitch);
    p[i]={x:.5+x*Math.cos(yaw)+z*Math.sin(yaw),y:.5+yy*aspect,z:-x*Math.sin(yaw)+z*Math.cos(yaw)};
  }
  return p;
};
for (const aspect of [4/3, 3/4, 16/9]) {
  const p=facePose(mesh(.3,0,aspect),[],aspect);
  assert.ok(Math.abs(p.yaw-.3)<1e-8); assert.ok(Math.abs(p.pitch)<1e-8);
}
assert.equal(facePose([]),null);
const v=new ViewPose(), neutral=facePose(mesh());
v.receive(neutral,0); v.receive(facePose(mesh(.3,0)),100);
assert.ok(v.update(100,.1).yaw<0);
v.recenter(); v.receive(facePose(mesh(.3,0)),200);
for(let i=0;i<40;i++) v.update(200,.1);
assert.ok(Math.abs(v.yaw)<1e-8);
v.receive({...neutral,yaw:20,pitch:20},300);
for(let i=0;i<40;i++) v.update(300,.1);
assert.ok(Math.abs(v.yaw)<=.24 && Math.abs(v.pitch)<=.18);
for(let i=0;i<40;i++) v.update(2000,.1);
assert.ok(Math.abs(v.yaw)<1e-8 && Math.abs(v.pitch)<1e-8);
v.receive({...neutral,yaw:.6},2200); assert.equal(v.neutral.yaw,.6);
v.mode='off'; assert.deepEqual(v.update(2200,.1),{yaw:0,pitch:0});
v.mode='eyes'; v.recenter(); v.receive(neutral,2300);
v.receive({...neutral,eyeX:1,eyeY:1},2400); assert.ok(v.update(2400,.1).yaw<0); assert.ok(v.pitch>0);
v.receive({...neutral,eyeX:1,eyeY:1,blink:true},2500);
for(let i=0;i<40;i++) v.update(2500,.1);
assert.ok(Math.abs(v.yaw)<1e-8);
console.log('PASS: orientation, aspect, recenter, limits, dropout, fixed mode, eyes and blinks');
