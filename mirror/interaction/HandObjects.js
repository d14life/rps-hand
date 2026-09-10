import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

export function gripPose(p) {
  if (!p || p.length !== 21) return null;
  const y=p[9].clone().sub(p[0]), x=p[5].clone().sub(p[17]);
  const width=x.length(); if(width<.015 || y.length()<.015) return null;
  y.normalize();x.addScaledVector(y,-x.dot(y));if(x.length()<.005)return null;x.normalize();
  return { position:p[4].clone().add(p[8]).multiplyScalar(.5),
    rotation:new THREE.Quaternion().setFromRotationMatrix(new THREE.Matrix4().makeBasis(x,y,x.clone().cross(y))),
    ratio:p[4].distanceTo(p[8])/width };
}

export class HandObjects {
  constructor(scene,status) {
    this.status=status;this.group=new THREE.Group();scene.add(this.group);
    this.items=[];this.hands=new Map();this.enabled=false;
    const cube=new THREE.Mesh(new THREE.BoxGeometry(.12,.12,.12),[0xf39b63,0x76c4cd,0xe5cc77,0x658bce,0xc390ba,0x8bb58e].map(color=>new THREE.MeshStandardMaterial({color,roughness:.4})));
    this.add(cube,'Cube',[-.23,-.13,-.63],.09);
    const knot=new THREE.Mesh(new THREE.TorusKnotGeometry(.052,.016,80,12),new THREE.MeshStandardMaterial({color:0x70b8db,metalness:.35,roughness:.28}));
    this.add(knot,'Knot',[0,-.13,-.63],.09);
    new GLTFLoader().load(new URL('../avatar/head.glb',import.meta.url).href,gltf=>{
      const model=gltf.scene;model.scale.setScalar(.65);model.rotation.y=Math.PI;
      const box=new THREE.Box3().setFromObject(model),center=box.getCenter(new THREE.Vector3());model.position.sub(center);
      this.add(model,'Sculpture',[.23,-.13,-.63],.10);
    },undefined,()=>{});
  }
  add(model,name,position,radius) {
    const object=new THREE.Group();object.add(model);object.position.fromArray(position);this.group.add(object);
    const halo=new THREE.Mesh(new THREE.SphereGeometry(radius+ .012,16,12),new THREE.MeshBasicMaterial({color:0x96ffc8,wireframe:true,transparent:true,opacity:.28}));
    halo.visible=false;object.add(halo);
    this.items.push({object,name,radius,halo,home:object.position.clone(),owner:null});
  }
  reset() {
    for(const h of this.hands.values()){h.held=null;h.armed=false;h.closed=false;h.pending=null;}
    for(const item of this.items){item.owner=null;item.object.position.copy(item.home);item.object.quaternion.identity();item.halo.visible=false;}
  }
  release(h) {if(h.held)h.held.owner=null;h.held=null;h.pending=null;}
  update(inputs,now,enabled) {
    if(this.enabled!==enabled){this.reset();this.enabled=enabled;}
    this.group.visible=enabled;if(!enabled){this.status.textContent='Choose First person to inspect objects';return;}
    for(const item of this.items)item.halo.visible=false;
    const seen=new Set();let nearby=null,heldName=null;
    for(const input of inputs) {
      if(now-input.stamp>250)continue;
      const grip=gripPose(input.points);if(!grip)continue;seen.add(input.id);
      let h=this.hands.get(input.id);
      if(!h){
        const cursor=new THREE.Mesh(new THREE.SphereGeometry(.009,12,8),new THREE.MeshBasicMaterial({color:0x99b1c3}));this.group.add(cursor);
        h={cursor,held:null,armed:false,closed:false,pending:null,stamp:-1};this.hands.set(input.id,h);
      }
      h.cursor.visible=true;h.cursor.position.copy(grip.position);
      const candidate=this.items.filter(i=>!i.owner || i.owner===input.id).map(i=>({item:i,d:i.object.position.distanceTo(grip.position)-i.radius})).filter(i=>i.d<.055).sort((a,b)=>a.d-b.d)[0]?.item;
      if(candidate){candidate.halo.visible=true;nearby=candidate.name;}
      h.cursor.material.color.set(candidate||h.held?0x96ffc8:0x99b1c3);
      // Consume pinch transitions only on fresh detector frames, never repeatedly
      // from the render loop's predicted copy of the same observation.
      if(h.stamp!==input.stamp){
        h.stamp=input.stamp;
        if(grip.ratio>.55){h.armed=true;h.closed=false;this.release(h);}
        else if(grip.ratio<.33 && h.armed && !h.closed){
          if(!candidate){h.pending=null;}
          else if(h.pending?.item!==candidate){h.pending={item:candidate,since:now};}
          else if(now-h.pending.since>=70){
            h.closed=true;h.held=candidate;candidate.owner=input.id;
            const inverse=grip.rotation.clone().invert();
            h.offset=candidate.object.position.clone().sub(grip.position).applyQuaternion(inverse);
            h.rotation=inverse.multiply(candidate.object.quaternion);
            h.pending=null;
          }
        }else if(grip.ratio>=.33){h.pending=null;}
      }
      if(h.held){
        h.held.object.position.copy(h.offset).applyQuaternion(grip.rotation).add(grip.position);
        h.held.object.quaternion.copy(grip.rotation).multiply(h.rotation);
        h.held.halo.visible=true;heldName=h.held.name;
      }
    }
    for(const [id,h] of this.hands)if(!seen.has(id)){this.release(h);h.cursor.visible=false;h.armed=false;h.closed=false;}
    this.status.textContent=heldName?`${heldName} held · move / turn your wrist · open fingers to release`:nearby?`${nearby} ready · pinch thumb + index to grab`:'Reach toward an object · pinch to grab · Reset objects brings them back';
  }
}
