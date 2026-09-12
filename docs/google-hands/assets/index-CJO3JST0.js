(function(){let e=document.createElement(`link`).relList;if(e&&e.supports&&e.supports(`modulepreload`))return;for(let e of document.querySelectorAll(`link[rel="modulepreload"]`))n(e);new MutationObserver(e=>{for(let t of e)if(t.type===`childList`)for(let e of t.addedNodes)e.tagName===`LINK`&&e.rel===`modulepreload`&&n(e)}).observe(document,{childList:!0,subtree:!0});function t(e){let t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),t.credentials=e.crossOrigin===`use-credentials`?`include`:e.crossOrigin===`anonymous`?`omit`:`same-origin`,t}function n(e){if(e.ep)return;e.ep=!0;let n=t(e);fetch(e.href,n)}})();var e=`modulepreload`,t=function(e){return`/rps-hand/google-hands/`+e},n={},r=function(r,i,a){let o=Promise.resolve();if(i&&i.length>0){let r=document.getElementsByTagName(`link`),s=document.querySelector(`meta[property=csp-nonce]`),c=s?.nonce||s?.getAttribute(`nonce`);function l(e){return Promise.all(e.map(e=>Promise.resolve(e).then(e=>({status:`fulfilled`,value:e}),e=>({status:`rejected`,reason:e}))))}function u(e){return import.meta.resolve?import.meta.resolve(e):new URL(e,import.meta.url).href}o=l(i.map(i=>{if(i=t(i,a),i=u(i),i in n)return;n[i]=!0;let o=i.endsWith(`.css`);for(let e=r.length-1;e>=0;e--){let t=r[e];if(t.href===i&&(!o||t.rel===`stylesheet`))return}let s=document.createElement(`link`);if(s.rel=o?`stylesheet`:e,o||(s.as=`script`),s.crossOrigin=``,s.href=i,c&&s.setAttribute(`nonce`,c),document.head.appendChild(s),o)return new Promise((e,t)=>{s.addEventListener(`load`,e),s.addEventListener(`error`,()=>t(Error(`Unable to preload CSS for ${i}`)))})}).filter(e=>e!==void 0))}function s(e){let t=new Event(`vite:preloadError`,{cancelable:!0});if(t.payload=e,window.dispatchEvent(t),!t.defaultPrevented)throw e}return o.then(e=>{for(let t of e||[])t.status===`rejected`&&s(t.reason);return r().catch(s)})},i=typeof self<`u`?self:{};function a(e,t){t:{for(var n=[`CLOSURE_FLAGS`],r=i,a=0;a<n.length;a++)if((r=r[n[a]])==null){n=null;break t}n=r}return(e=n&&n[e])??t}function o(e,t){e=e.split(`.`);for(var n,r=i;e.length&&(n=e.shift());)e.length||t===void 0?r=r[n]&&r[n]!==Object.prototype[n]?r[n]:r[n]={}:r[n]=t}function s(){throw Error(`Invalid UTF8`)}function c(e,t){return t=String.fromCharCode.apply(null,t),e==null?t:e+t}var l,u,d=void 0,ee=typeof TextDecoder<`u`,te=typeof TextEncoder<`u`;function ne(e){if(te)e=(u||=new TextEncoder).encode(e);else{let n=0,r=new Uint8Array(3*e.length);for(let i=0;i<e.length;i++){var t=e.charCodeAt(i);if(t<128)r[n++]=t;else{if(t<2048)r[n++]=t>>6|192;else{if(t>=55296&&t<=57343){if(t<=56319&&i<e.length){let a=e.charCodeAt(++i);if(a>=56320&&a<=57343){t=1024*(t-55296)+a-56320+65536,r[n++]=t>>18|240,r[n++]=t>>12&63|128,r[n++]=t>>6&63|128,r[n++]=63&t|128;continue}i--}t=65533}r[n++]=t>>12|224,r[n++]=t>>6&63|128}r[n++]=63&t|128}}e=n===r.length?r:r.subarray(0,n)}return e}function re(e){i.setTimeout(()=>{throw e},0)}var ie=a(610401301,!1),ae=a(748402147,!0);function oe(){var e=i.navigator;return(e&&=e.userAgent)?e:``}var se,ce=i.navigator;function le(e){return le[` `](e),e}se=ce&&ce.userAgentData||null,le[` `]=function(){};var ue={},de=null;function fe(e){var t=e.length,n=3*t/4;n%3?n=Math.floor(n):`=.`.indexOf(e[t-1])!=-1&&(n=`=.`.indexOf(e[t-2])==-1?n-1:n-2);var r=new Uint8Array(n),i=0;return function(e,t){function n(t){for(;r<e.length;){let t=e.charAt(r++),n=de[t];if(n!=null)return n;if(!/^[\s\xa0]*$/.test(t))throw Error(`Unknown base64 encoding at char: `+t)}return t}pe();for(var r=0;;){let e=n(-1),r=n(0),i=n(64),a=n(64);if(a===64&&e===-1)break;t(e<<2|r>>4),i!=64&&(t(r<<4&240|i>>2),a!=64&&t(i<<6&192|a))}}(e,function(e){r[i++]=e}),i===n?r:r.subarray(0,i)}function pe(){if(!de){de={};var e=`ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789`.split(``),t=[`+/=`,`+/`,`-_=`,`-_.`,`-_`];for(let n=0;n<5;n++){let r=e.concat(t[n].split(``));ue[n]=r;for(let e=0;e<r.length;e++){let t=r[e];de[t]===void 0&&(de[t]=e)}}}}var me=typeof Uint8Array<`u`,he=(!!(ie&&se&&se.brands.length>0)||oe().indexOf(`Trident`)==-1&&oe().indexOf(`MSIE`)==-1)&&typeof btoa==`function`,ge=/[-_.]/g,_e={"-":`+`,_:`/`,".":`=`};function ve(e){return _e[e]||``}function ye(e){if(!he)return fe(e);e=ge.test(e)?e.replace(ge,ve):e,e=atob(e);var t=new Uint8Array(e.length);for(let n=0;n<e.length;n++)t[n]=e.charCodeAt(n);return t}function be(e){return me&&e!=null&&e instanceof Uint8Array}var xe={};function Se(){return we||=new Te(null,xe)}function Ce(e){Ee(xe);var t=e.g;return(t=t==null||be(t)?t:typeof t==`string`?ye(t):null)==null?t:e.g=t}var we,Te=class{h(){return new Uint8Array(Ce(this)||0)}constructor(e,t){if(Ee(t),this.g=e,e!=null&&e.length===0)throw Error(`ByteString should be constructed with non-empty values`)}};function Ee(e){if(e!==xe)throw Error(`illegal external caller`)}function De(e,t){e.__closure__error__context__984382||={},e.__closure__error__context__984382.severity=t}var Oe=void 0;function ke(e){return De(e=Error(e),`warning`),e}function Ae(e,t){if(e!=null){var n=Oe??={},r=n[e]||0;r>=t||(n[e]=r+1,De(e=Error(),`incident`),re(e))}}function je(){return typeof BigInt==`function`}var Me=typeof Symbol==`function`&&typeof Symbol()==`symbol`;function Ne(e,t,n=!1){return typeof Symbol==`function`&&typeof Symbol()==`symbol`?n&&Symbol.for&&e?Symbol.for(e):e==null?Symbol():Symbol(e):t}var Pe,Fe=Ne(`jas`,void 0,!0),Ie=Ne(void 0,`0di`),Le=Ne(void 0,`1oa`),Re=Ne(void 0,Symbol()),ze=Ne(void 0,`0ub`),Be=Ne(void 0,`0ubs`),Ve=Ne(void 0,`0ubsb`),He=Ne(void 0,`0actk`),Ue=Ne(`m_m`,`kb`,!0),We=Ne(),Ge={Va:{value:0,configurable:!0,writable:!0,enumerable:!1}},Ke=Object.defineProperties,f=Me?Fe:`Va`,qe=[];function Je(e,t){Me||f in e||Ke(e,Ge),e[f]|=t}function p(e,t){Me||f in e||Ke(e,Ge),e[f]=t}function Ye(e){return Je(e,34),e}function Xe(e){return Je(e,8192),e}p(qe,7),Pe=Object.freeze(qe);var Ze={};function Qe(e,t){return t===void 0?e.h!==$e&&!!(2&e.A[f]):!!(2&t)&&e.h!==$e}var $e={};function et(e,t){if(e!=null){if(typeof e==`string`)e=e?new Te(e,xe):Se();else if(e.constructor!==Te){if(be(e))e=e.length?new Te(new Uint8Array(e),xe):Se();else{if(!t)throw Error();e=void 0}}}return e}var tt=class{constructor(e,t,n){this.g=e,this.h=t,this.j=n}next(){var e=this.g.next();return e.done||(e.value=this.h.call(this.j,e.value)),e}[Symbol.iterator](){return this}},nt=Object.freeze({});function rt(e,t,n){var r,i=128&t?0:-1,a=e.length;(r=!!a)&&(r=(r=e[a-1])!=null&&typeof r==`object`&&r.constructor===Object);var o=a+(r?-1:0);for(t=128&t?1:0;t<o;t++)n(t-i,e[t]);if(r){e=e[a-1];for(let t in e)!isNaN(t)&&n(+t,e[t])}}var it={};function at(e){return 128&e?it:void 0}function ot(e){return e.ib=!0,e}var st=ot(e=>typeof e==`number`),ct=ot(e=>typeof e==`string`),lt=ot(e=>typeof e==`boolean`),ut=typeof i.BigInt==`function`&&typeof i.BigInt(0)==`bigint`;function m(e){var t=e;if(ct(t)){if(!/^\s*(?:-?[1-9]\d*|0)?\s*$/.test(t))throw Error(String(t))}else if(st(t)&&!Number.isSafeInteger(t))throw Error(String(t));return ut?BigInt(e):e=lt(e)?e?`1`:`0`:ct(e)?e.trim()||`0`:String(e)}var dt=ot(e=>ut?e>=pt&&e<=ht:e[0]===`-`?gt(e,ft):gt(e,mt)),ft=(-(2**53-1)).toString(),pt=ut?BigInt(-(2**53-1)):void 0,mt=(2**53-1).toString(),ht=ut?BigInt(2**53-1):void 0;function gt(e,t){if(e.length>t.length)return!1;if(e.length<t.length||e===t)return!0;for(let n=0;n<e.length;n++){let r=e[n],i=t[n];if(r>i)return!1;if(r<i)return!0}}var _t,vt=typeof Uint8Array.prototype.slice==`function`,h=0,g=0;function yt(e){var t=e>>>0;h=t,g=(e-t)/4294967296>>>0}function bt(e){if(e<0){yt(-e);let[t,n]=kt(h,g);h=t>>>0,g=n>>>0}else yt(e)}function xt(e){var t=_t||=new DataView(new ArrayBuffer(8));t.setFloat32(0,+e,!0),g=0,h=t.getUint32(0,!0)}function St(e,t){var n=4294967296*t+(e>>>0);return Number.isSafeInteger(n)?n:Tt(e,t)}function Ct(e,t){return m(je()?BigInt.asUintN(64,(BigInt(t>>>0)<<BigInt(32))+BigInt(e>>>0)):Tt(e,t))}function wt(e,t){return je()?m(BigInt.asIntN(64,(BigInt.asUintN(32,BigInt(t))<<BigInt(32))+BigInt.asUintN(32,BigInt(e)))):m(Dt(e,t))}function Tt(e,t){if(e>>>=0,(t>>>=0)<=2097151)var n=``+(4294967296*t+e);else je()?n=``+(BigInt(t)<<BigInt(32)|BigInt(e)):(e=(16777215&e)+6777216*(n=16777215&(e>>>24|t<<8))+6710656*(t=t>>16&65535),n+=8147497*t,t*=2,e>=1e7&&(n+=e/1e7>>>0,e%=1e7),n>=1e7&&(t+=n/1e7>>>0,n%=1e7),n=t+Et(n)+Et(e));return n}function Et(e){return e=String(e),`0000000`.slice(e.length)+e}function Dt(e,t){if(2147483648&t){if(je())e=``+(BigInt(0|t)<<BigInt(32)|BigInt(e>>>0));else{let[n,r]=kt(e,t);e=`-`+Tt(n,r)}}else e=Tt(e,t);return e}function Ot(e){if(e.length<16)bt(Number(e));else if(je())e=BigInt(e),h=Number(e&BigInt(4294967295))>>>0,g=Number(e>>BigInt(32)&BigInt(4294967295));else{let t=+(e[0]===`-`);g=h=0;let n=e.length;for(let r=t,i=(n-t)%6+t;i<=n;r=i,i+=6){let t=Number(e.slice(r,i));g*=1e6,(h=1e6*h+t)>=4294967296&&(g+=Math.trunc(h/4294967296),g>>>=0,h>>>=0)}if(t){let[e,t]=kt(h,g);h=e,g=t}}}function kt(e,t){return t=~t,e?e=1+~e:t+=1,[e,t]}function At(e){return Array.prototype.slice.call(e)}var jt=typeof BigInt==`function`?BigInt.asIntN:void 0,Mt=typeof BigInt==`function`?BigInt.asUintN:void 0,Nt=Number.isSafeInteger,Pt=Number.isFinite,Ft=Math.trunc,It=m(0);function Lt(e){if(typeof e!=`number`)throw Error(`Value of float/double field must be a number, found ${typeof e}: ${e}`);return e}function Rt(e){return e==null||typeof e==`number`?e:e===`NaN`||e===`Infinity`||e===`-Infinity`?Number(e):void 0}function zt(e){if(typeof e!=`boolean`){var t=typeof e;throw Error(`Expected boolean but got ${t==`object`?e?Array.isArray(e)?`array`:t:`null`:t}: ${e}`)}return e}var Bt=/^-?([1-9][0-9]*|0)(\.[0-9]+)?$/;function Vt(e){switch(typeof e){case`bigint`:return!0;case`number`:return Pt(e);case`string`:return Bt.test(e);default:return!1}}function Ht(e){if(e!=null){if(!Pt(e))throw ke(`enum`);e|=0}return e}function Ut(e){if(e==null)return e;if(typeof e==`string`&&e)e=+e;else if(typeof e!=`number`)return;return Pt(e)?0|e:void 0}function Wt(e){if(e==null)return e;if(typeof e==`string`&&e)e=+e;else if(typeof e!=`number`)return;return Pt(e)?e>>>0:void 0}function Gt(e,t){if(t??=1024,!Vt(e))throw ke(`int64`);var n=typeof e;switch(t){case 512:switch(n){case`string`:return Zt(e);case`bigint`:return String(jt(64,e));default:return Xt(e)}case 1024:switch(n){case`string`:return Qt(e);case`bigint`:return m(jt(64,e));default:return $t(e)}case 0:switch(n){case`string`:return Zt(e);case`bigint`:return m(jt(64,e));default:return Jt(e)}default:return function(e,t=`unexpected value ${e}!`){throw Error(t)}(t,`Unknown format requested type for int64`)}}function Kt(e){var t=e.length;return(e[0]===`-`?t<20||t===20&&e<=`-9223372036854775808`:t<19||t===19&&e<=`9223372036854775807`)?e:(Ot(e),Dt(h,g))}function qt(e){if(e[0]===`-`)var t=!1;else t=(t=e.length)<20||t===20&&e<=`18446744073709551615`;return t?e:(Ot(e),Tt(h,g))}function Jt(e){if(e=Ft(e),!Nt(e)){bt(e);var t=h,n=g;(e=2147483648&n)&&(n=~n>>>0,(t=1+~t>>>0)==0&&(n=n+1>>>0)),e=typeof(t=St(t,n))==`number`?e?-t:t:e?`-`+t:t}return e}function Yt(e){return(e=Ft(e))>=0&&Nt(e)||(bt(e),e=St(h,g)),e}function Xt(e){return e=Ft(e),Nt(e)?e=String(e):(bt(e),e=Dt(h,g)),e}function Zt(e){var t=Ft(Number(e));return Nt(t)?String(t):((t=e.indexOf(`.`))!==-1&&(e=e.substring(0,t)),Kt(e))}function Qt(e){var t=Ft(Number(e));return Nt(t)?m(t):((t=e.indexOf(`.`))!==-1&&(e=e.substring(0,t)),je()?m(jt(64,BigInt(e))):m(Kt(e)))}function $t(e){return Nt(e)?m(Jt(e)):m(Xt(e))}function en(e){var t=typeof e;return e==null?e:t===`bigint`?m(jt(64,e)):Vt(e)?t===`string`?Qt(e):$t(e):void 0}function tn(e){if(e==null)return e;var t=typeof e;if(t===`bigint`)return String(jt(64,e));if(Vt(e)){if(t===`string`)return Zt(e);if(t===`number`)return Jt(e)}}function nn(e){if(e==null||typeof e==`string`||e instanceof Te)return e}function rn(e){if(typeof e!=`string`)throw Error();return e}function an(e){if(e!=null&&typeof e!=`string`)throw Error();return e}function _(e){return e==null||typeof e==`string`?e:void 0}function on(e,t,n,r){return e!=null&&e[Ue]===Ze?e:Array.isArray(e)?((r=(n=0|e[f])|32&r|2&r)!==n&&p(e,r),new t(e)):(n?2&r?((e=t[Ie])||(Ye((e=new t).A),e=t[Ie]=e),t=e):t=new t:t=void 0,t)}function sn(e,t,n){return(e=t?Gt(e,1024):en(e))??(n?It:void 0)}function cn(e){return e}var ln={},un=function(){try{return le(new class extends Map{constructor(){super()}}),!1}catch{return!0}}(),dn=class{constructor(){this.g=new Map}get(e){return this.g.get(e)}set(e,t){return this.g.set(e,t),this.size=this.g.size,this}delete(e){return e=this.g.delete(e),this.size=this.g.size,e}clear(){this.g.clear(),this.size=this.g.size}has(e){return this.g.has(e)}entries(){return this.g.entries()}keys(){return this.g.keys()}values(){return this.g.values()}forEach(e,t){return this.g.forEach(e,t)}[Symbol.iterator](){return this.entries()}},fn=un?(Object.setPrototypeOf(dn.prototype,Map.prototype),Object.defineProperties(dn.prototype,{size:{value:0,configurable:!0,enumerable:!0,writable:!0}}),dn):class extends Map{constructor(){super()}};function pn(e){return e}function mn(e){if(2&e.M)throw Error(`Cannot mutate an immutable Map`)}var hn,gn=class extends fn{constructor(e,t,n=pn,r=pn){super(),this.M=0|e[f],this.N=t,this.ba=n,this.na=this.N?_n:r;for(let i=0;i<e.length;i++){let a=e[i],o=n(a[0],!1,!0),s=a[1];t?s===void 0&&(s=null):s=r(a[1],!1,!0,void 0,void 0,this.M),super.set(o,s)}}ea(e){return Xe(Array.from(super.entries(),e))}clear(){mn(this),super.clear()}delete(e){return mn(this),super.delete(this.ba(e,!0,!1))}entries(){if(this.N){var e=super.keys();e=new tt(e,vn,this)}else e=super.entries();return e}values(){if(this.N){var e=super.keys();e=new tt(e,gn.prototype.get,this)}else e=super.values();return e}forEach(e,t){this.N?super.forEach((n,r,i)=>{e.call(t,i.get(r),r,i)}):super.forEach(e,t)}set(e,t){return mn(this),(e=this.ba(e,!0,!1))==null?this:t==null?(super.delete(e),this):super.set(e,this.na(t,!0,!0,this.N,!1,this.M))}gb(e){var t=this.ba(e[0],!1,!0);e=e[1],e=this.N?e===void 0?null:e:this.na(e,!1,!0,void 0,!1,this.M),super.set(t,e)}has(e){return super.has(this.ba(e,!1,!1))}get(e){e=this.ba(e,!1,!1);var t=super.get(e);if(t!==void 0){var n=this.N;return n?((n=this.na(t,!1,!0,n,this.Fa,this.M))!==t&&super.set(e,n),n):t}}[Symbol.iterator](){return this.entries()}};function _n(e,t,n,r,i,a){return e=on(e,r,n,a),i&&(e=Rn(e)),e}function vn(e){return[e,this.get(e)]}function yn(){return hn||=new gn(Ye([]),void 0,void 0,void 0,ln)}function bn(e){return Re?e[Re]:void 0}function xn(e,t){for(let n in e)!isNaN(n)&&t(e,+n,e[n])}gn.prototype.toJSON=void 0;var Sn,Cn,wn=class{},Tn={cb:!0};function En(e,t){t<100||Ae(Be,1)}function Dn(e,t,n,r){var i=r!==void 0;r=!!r;var a,o=Re;!i&&Me&&o&&(a=e[o])&&xn(a,En),o=[];var s=e.length;a=4294967295;var c=!1,l=!!(64&t),u=l?128&t?0:-1:void 0;if(!(1&t)){var d=s&&e[s-1];typeof d==`object`&&d&&d.constructor===Object?a=--s:d=void 0,!l||128&t||i||(c=!0,a=cn(a-u,u,e,d,void 0)+u)}t=void 0;for(var ee=0;ee<s;ee++){let i=e[ee];if(i!=null&&(i=n(i,r))!=null){if(l&&ee>=a){let e=ee-u;(t??={})[e]=i}else o[ee]=i}}if(d)for(let e in d){if((s=d[e])==null||(s=n(s,r))==null)continue;let i;ee=+e,l&&!Number.isNaN(ee)&&(i=ee+u)<a?o[i]=s:(t??={})[e]=s}return t&&(c?o.push(t):o[a]=t),i&&Re&&(e=bn(e))&&e instanceof wn&&(o[Re]=function(e){var t=new wn;return xn(e,(e,n,r)=>{t[n]=At(r)}),t.ka=e.ka,t}(e)),o}function On(e){return e[0]=kn(e[0]),e[1]=kn(e[1]),e}function kn(e){switch(typeof e){case`number`:return Number.isFinite(e)?e:``+e;case`bigint`:return dt(e)?Number(e):``+e;case`boolean`:return+!!e;case`object`:if(Array.isArray(e)){var t=0|e[f];return e.length===0&&1&t?void 0:Dn(e,t,kn)}if(e!=null&&e[Ue]===Ze)return An(e);if(e instanceof Te){if((t=e.g)==null)e=``;else if(typeof t==`string`)e=t;else{if(he){for(var n=``,r=0,i=t.length-10240;r<i;)n+=String.fromCharCode.apply(null,t.subarray(r,r+=10240));n+=String.fromCharCode.apply(null,r?t.subarray(r):t),t=btoa(n)}else{n===void 0&&(n=0),pe(),n=ue[n],r=Array(Math.floor(t.length/3)),i=n[64]||``;let e=0,l=0;for(;e<t.length-2;e+=3){var a=t[e],o=t[e+1],s=t[e+2],c=n[a>>2];a=n[(3&a)<<4|o>>4],o=n[(15&o)<<2|s>>6],s=n[63&s],r[l++]=c+a+o+s}switch(c=0,s=i,t.length-e){case 2:s=n[(15&(c=t[e+1]))<<2]||i;case 1:t=t[e],r[l]=n[t>>2]+n[(3&t)<<4|c>>4]+s+i}t=r.join(``)}e=e.g=t}return e}return e instanceof gn?e=e.size===0?void 0:e.ea(On):void 0}return e}function An(e){return Dn(e=e.A,0|e[f],kn)}function jn(e,t){return Mn(e,t[0],t[1])}function Mn(e,t,n,r=0){if(e==null){var i=32;n?(e=[n],i|=128):e=[],t&&(i=-16760833&i|(1023&t)<<14)}else{if(!Array.isArray(e))throw Error(`narr`);if(i=0|e[f],ae&&1&i)throw Error(`rfarr`);if(2048&i&&!(2&i)&&function(){if(ae)throw Error(`carr`);Ae(He,5)}(),256&i)throw Error(`farr`);if(64&i)return(i|r)!==i&&p(e,i|r),e;if(n&&(i|=128,n!==e[0]))throw Error(`mid`);t:{i|=64;var a=(n=e).length;if(a){var o=a-1;let e=n[o];if(typeof e==`object`&&e&&e.constructor===Object){if((o-=t=128&i?0:-1)>=1024)throw Error(`pvtlmt`);for(var s in e)(a=+s)<o&&(n[a+t]=e[s],delete e[s]);i=-16760833&i|(1023&o)<<14;break t}}if(t){if((s=Math.max(t,a-(128&i?0:-1)))>1024)throw Error(`spvt`);i=-16760833&i|(1023&s)<<14}}}return p(e,64|i|r),e}function Nn(e,t){if(typeof e!=`object`)return e;if(Array.isArray(e)){var n=0|e[f];return e.length===0&&1&n?void 0:Pn(e,n,t)}if(e!=null&&e[Ue]===Ze)return In(e);if(e instanceof gn){if(2&(t=e.M))return e;if(!e.size)return;if(n=Ye(e.ea()),e.N)for(e=0;e<n.length;e++){let r=n[e],i=r[1];i=typeof i!=`object`||!i?void 0:i!=null&&i[Ue]===Ze?In(i):Array.isArray(i)?Pn(i,0|i[f],!!(32&t)):void 0,r[1]=i}return n}return e instanceof Te?e:void 0}function Pn(e,t,n){return 2&t||(!n||4096&t||16&t?e=Ln(e,t,!1,n&&!(16&t)):(Je(e,34),4&t&&Object.freeze(e))),e}function Fn(e,t,n){return e=new e.constructor(t),n&&(e.h=$e),e.m=$e,e}function In(e){var t=e.A,n=0|t[f];return Qe(e,n)?e:Hn(e,t,n)?Fn(e,t):Ln(t,n)}function Ln(e,t,n,r){return r??=!!(34&t),e=Dn(e,t,Nn,r),r=32,n&&(r|=2),p(e,t=16769217&t|r),e}function Rn(e){var t=e.A,n=0|t[f];return Qe(e,n)?Hn(e,t,n)?Fn(e,t,!0):new e.constructor(Ln(t,n,!1)):e}function zn(e){if(e.h!==$e)return!1;var t=e.A;return Je(t=Ln(t,0|t[f]),2048),e.A=t,e.h=void 0,e.m=void 0,!0}function Bn(e){if(!zn(e)&&Qe(e,0|e.A[f]))throw Error()}function Vn(e,t){t===void 0&&(t=0|e[f]),32&t&&!(4096&t)&&p(e,4096|t)}function Hn(e,t,n){return!!(2&n)||!(!(32&n)||4096&n)&&(p(t,2|n),e.h=$e,!0)}var Un=m(0),Wn={};function v(e,t,n,r){if((t=Gn(e.A,t,void 0,r))!==null||n&&e.m!==$e)return t}function Gn(e,t,n,r){if(t===-1)return null;var i=t+(n?0:-1),a=e.length-1;if(!(a<1+(n?0:-1))){if(i>=a){var o=e[a];if(typeof o==`object`&&o&&o.constructor===Object){n=o[t];var s=!0}else{if(i!==a)return;n=o}}else n=e[i];if(r&&n!=null){if((r=r(n))==null)return r;if(!Object.is(r,n))return s?o[t]=r:e[i]=r,r}return n}}function y(e,t,n,r){Bn(e);var i=e.A;return b(i,0|i[f],t,n,r),e}function b(e,t,n,r,i){var a=n+(i?0:-1),o=e.length-1;if(o>=1+(i?0:-1)&&a>=o){let i=e[o];if(typeof i==`object`&&i&&i.constructor===Object)return i[n]=r,t}return a<=o?(e[a]=r,t):(r!==void 0&&(n>=(o=(t??=0|e[f])>>14&1023||536870912)?r!=null&&(e[o+(i?0:-1)]={[n]:r}):e[a]=r),t)}function Kn(e,t,n,r){var i=e.A;return cr(i,0|i[f],t,e=rr(e,r)===n?n:-1)!==void 0}function qn(){return nt===void 0?2:4}function Jn(e,t,n,r,i){var a=e.A,o=0|a[f];r=Qe(e,o)?1:r,i=!!i||r===3,r===2&&zn(e)&&(o=0|(a=e.A)[f]);var s=(e=Xn(a,t))===Pe?7:0|e[f],c=Zn(s,o),l=!(4&c);if(l){4&c&&(e=At(e),s=0,c=mr(c,o),o=b(a,o,t,e));let r=0,i=0;for(;r<e.length;r++){let t=n(e[r]);t!=null&&(e[i++]=t)}i<r&&(e.length=i),n=-513&c|4,c=n&=-1025,c&=-4097}return c!==s&&(p(e,c),2&c&&Object.freeze(e)),Yn(e,c,a,o,t,r,l,i)}function Yn(e,t,n,r,i,a,o,s){var c=t;return a===1||a===4&&(2&t||!(16&t)&&32&r)?Qn(t)||((t|=!e.length||o&&!(4096&t)||32&r&&!(4096&t||16&t)?2:256)!==c&&p(e,t),Object.freeze(e)):(a===2&&Qn(t)&&(e=At(e),c=0,t=mr(t,r),r=b(n,r,i,e)),Qn(t)||(s||(t|=16),t!==c&&p(e,t))),2&t||!(4096&t||16&t)||Vn(n,r),e}function Xn(e,t,n){return e=Gn(e,t,n),Array.isArray(e)?e:Pe}function Zn(e,t){return 2&t&&(e|=2),1|e}function Qn(e){return!!(2&e)&&!!(4&e)||!!(256&e)}function $n(e){return et(e,!0)}function er(e){e=At(e);for(let t=0;t<e.length;t++){let n=e[t]=At(e[t]);Array.isArray(n[1])&&(n[1]=Ye(n[1]))}return Xe(e)}function tr(e,t,n,r){Bn(e),b(e=e.A,0|e[f],t,(r===`0`?Number(n)===0:n===r)?void 0:n)}function nr(e,t,n){if(2&t)throw Error();var r=at(t),i=Xn(e,n,r),a=i===Pe?7:0|i[f],o=Zn(a,t);return(2&o||Qn(o)||16&o)&&(o===a||Qn(o)||p(i,o),i=At(i),a=0,o=mr(o,t),b(e,t,n,i,r)),(o&=-13)!==a&&p(i,o),i}function rr(e,t){return or(ir(e=e.A),e,void 0,t)}function ir(e){if(Me)return e[Le]??(e[Le]=new Map);if(Le in e)return e[Le];var t=new Map;return Object.defineProperty(e,Le,{value:t}),t}function ar(e,t,n,r,i){var a=ir(e),o=or(a,e,t,n,i);return o!==r&&(o&&(t=b(e,t,o,void 0,i)),a.set(n,r)),t}function or(e,t,n,r,i){var a=e.get(r);if(a!=null)return a;a=0;for(let e=0;e<r.length;e++){let o=r[e];Gn(t,o,i)!=null&&(a!==0&&(n=b(t,n,a,void 0,i)),a=o)}return e.set(r,a),a}function sr(e,t,n){var r=0|e[f],i=at(r),a=Gn(e,n,i);if(a!=null&&a[Ue]===Ze){if(!Qe(a))return zn(a),a.A;var o=a.A}else Array.isArray(a)&&(o=a);if(o){let e=0|o[f];2&e&&(o=Ln(o,e))}return(o=jn(o,t))!==a&&b(e,r,n,o,i),o}function cr(e,t,n,r,i){var a=!1;if((r=Gn(e,r,i,e=>{var r=on(e,n,!1,t);return a=r!==e&&r!=null,r}))!=null)return a&&!Qe(r)&&Vn(e,t),r}function x(e,t,n,r){var i=e.A,a=0|i[f];if((t=cr(i,a,t,n,r))==null)return t;if(!Qe(e,a=0|i[f])){let o=Rn(t);o!==t&&(zn(e)&&(a=0|(i=e.A)[f]),Vn(i,a=b(i,a,n,t=o,r)))}return t}function lr(e,t,n,r,i,a,o,s){var c=Qe(e,n);a=c?1:a,o=!!o||a===3,c=s&&!c,(a===2||c)&&zn(e)&&(n=0|(t=e.A)[f]);var l=(e=Xn(t,i))===Pe?7:0|e[f],u=Zn(l,n);if(s=!(4&u)){var d=e,ee=n;let t=!!(2&u);t&&(ee|=2);let i=!t,a=!0,o=0,s=0;for(;o<d.length;o++){let e=on(d[o],r,!1,ee);if(e instanceof r){if(!t){let t=Qe(e);i&&=!t,a&&=t}d[s++]=e}}s<o&&(d.length=s),u|=4,u=a?-4097&u:4096|u,u=i?8|u:-9&u}if(u!==l&&(p(e,u),2&u&&Object.freeze(e)),c&&!(8&u||!e.length&&(a===1||a===4&&(2&u||!(16&u)&&32&n)))){for(Qn(u)&&(e=At(e),u=mr(u,n),n=b(t,n,i,e)),r=e,c=u,l=0;l<r.length;l++)(d=r[l])!==(u=Rn(d))&&(r[l]=u);c|=8,p(e,u=c=r.length?4096|c:-4097&c)}return Yn(e,u,t,n,i,a,s,o)}function ur(e,t,n){var r=e.A;return lr(e,r,0|r[f],t,n,qn(),!1,!0)}function dr(e){return e??=void 0,e}function S(e,t,n,r,i){return y(e,n,r=dr(r),i),r&&!Qe(r)&&Vn(e.A),e}function fr(e,t,n,r){t:{var i=r=dr(r);Bn(e);let a=e.A,o=0|a[f];if(i==null){let e=ir(a);if(or(e,a,o,n)!==t)break t;e.set(n,0)}else o=ar(a,o,n,t);b(a,o,t,i)}return r&&!Qe(r)&&Vn(e.A),e}function pr(e,t,n){Bn(e);var r=e.A,i=0|r[f];if(n==null)return b(r,i,t),e;var a=n===Pe?7:0|n[f],o=a,s=Qn(a),c=s||Object.isFrozen(n),l=!0,u=!0;for(let e=0;e<n.length;e++){var d=n[e];s||(d=Qe(d),l&&=!d,u&&=d)}return s||(a=l?13:5,a=u?-4097&a:4096|a),c&&a===o||(n=At(n),o=0,a=mr(a,i)),a!==o&&p(n,a),i=b(r,i,t,n),2&a||!(4096&a||16&a)||Vn(r,i),e}function mr(e,t){return-273&(2&t?2|e:-3&e)}function hr(e,t,n,r){var i=r;Bn(e),e=lr(e,r=e.A,0|r[f],n,t,2,!0),i??=new n,e.push(i),t=n=e===Pe?7:0|e[f],(i=Qe(i))?(n&=-9,e.length===1&&(n&=-4097)):n|=4096,n!==t&&p(e,n),i||Vn(r)}function gr(e,t,n){return Ut(v(e,t,n))}function C(e,t){return v(e,t,void 0,Rt)??0}function _r(e,t,n){return x(e,t,n=rr(e,Yo)===n?n:-1,void 0)}function vr(e,t){tr(e,3,t==null?t:zt(t),!1)}function yr(e,t,n){if(n!=null){if(typeof n!=`number`||!Pt(n))throw ke(`int32`);n|=0}y(e,t,n)}function br(e,t,n){return y(e,t,n==null?n:Gt(n))}function xr(e,t,n){return y(e,t,n==null?n:function(e){if(!Vt(e))throw ke(`uint64`);switch(typeof e){case`string`:var t=Ft(Number(e));return Nt(t)&&t>=0?e=m(t):((t=e.indexOf(`.`))!==-1&&(e=e.substring(0,t)),e=je()?m(Mt(64,BigInt(e))):m(qt(e))),e;case`bigint`:return m(Mt(64,e));default:return Nt(e)?e=m(Yt(e)):((e=Ft(e))>=0&&Nt(e)?e=String(e):(bt(e),e=Tt(h,g)),e=m(e)),e}}(n))}function w(e,t,n){y(e,t,n==null?n:Lt(n))}function Sr(e,t,n){tr(e,t,n==null?n:Lt(n),0)}function Cr(e,t,n){tr(e,t,an(n),``)}function wr(e,t,n){{Bn(e);let o=e.A,s=0|o[f];if(n==null)b(o,s,t);else{var r=e=n===Pe?7:0|n[f],i=Qn(e),a=i||Object.isFrozen(n);for(i||(e=0),a||=(n=At(n),r=0,e=mr(e,s),!1),e|=5,e|=(4&e?512&e?512:1024&e?1024:0:void 0)??1024,i=0;i<n.length;i++){let t=n[i],o=rn(t);Object.is(t,o)||(a&&=(n=At(n),r=0,e=mr(e,s),!1),n[i]=o)}e!==r&&(a&&(n=At(n),e=mr(e,s)),p(n,e)),b(o,s,t,n)}}}function Tr(e,t,n){Bn(e),Jn(e,t,_,2,!0).push(rn(n))}var Er=class{constructor(e,t,n){if(this.buffer=e,n&&!t)throw Error();this.g=t}};function Dr(e,t){if(typeof e==`string`)return new Er(ye(e),t);if(Array.isArray(e))return new Er(new Uint8Array(e),t);if(e.constructor===Uint8Array)return new Er(e,!1);if(e.constructor===ArrayBuffer)return e=new Uint8Array(e),new Er(e,!1);if(e.constructor===Te)return t=Ce(e)||new Uint8Array,new Er(t,!0,e);if(e instanceof Uint8Array)return e=e.constructor===Uint8Array?e:new Uint8Array(e.buffer,e.byteOffset,e.byteLength),new Er(e,!1);throw Error()}function Or(e,t){var n=0,r=0,i=0,a=e.h,o=e.g;do{var s=a[o++];n|=(127&s)<<i,i+=7}while(i<32&&128&s);if(i>32)for(r|=(127&s)>>4,i=3;i<32&&128&s;i+=7)r|=(127&(s=a[o++]))<<i;if(Ir(e,o),!(128&s))return t(n>>>0,r>>>0);throw Error()}function kr(e){for(var t=0,n=e.g,r=n+10,i=e.h;n<r;){let r=i[n++];if(t|=r,!(128&r))return Ir(e,n),!!(127&t)}throw Error()}function Ar(e){var t=e.h,n=e.g,r=t[n++],i=127&r;if(128&r&&(i|=(127&(r=t[n++]))<<7,128&r&&(i|=(127&(r=t[n++]))<<14,128&r&&(i|=(127&(r=t[n++]))<<21,128&r&&(i|=(r=t[n++])<<28,128&r&&128&t[n++]&&128&t[n++]&&128&t[n++]&&128&t[n++]&&128&t[n++])))))throw Error();return Ir(e,n),i}function jr(e){return Ar(e)>>>0}function Mr(e){return Or(e,wt)}function Nr(e){var t=e.h,n=e.g,r=t[n],i=t[n+1],a=t[n+2];return t=t[n+3],Ir(e,e.g+4),(r|i<<8|a<<16|t<<24)>>>0}function Pr(e){var t=Nr(e);e=2*(t>>31)+1;var n=t>>>23&255;return t&=8388607,n==255?t?NaN:1/0*e:n==0?1401298464324817e-60*e*t:e*2**(n-150)*(t+8388608)}function Fr(e){return Ar(e)}function Ir(e,t){if(e.g=t,t>e.j)throw Error()}function Lr(e,t){if(t<0)throw Error();var n=e.g;if((t=n+t)>e.j)throw Error();return e.g=t,n}function Rr(e,t){if(t==0)return Se();var n=Lr(e,t);return e.fa&&e.o?n=e.h.subarray(n,n+t):(e=e.h,n=n===(t=n+t)?new Uint8Array:vt?e.slice(n,t):new Uint8Array(e.subarray(n,t))),n.length==0?Se():new Te(n,xe)}var zr=class{constructor(e,t,n,r){this.h=null,this.o=!1,this.g=this.j=this.m=0,this.init(e,t,n,r)}init(e,t,n,{fa:r=!1,ma:i=!1}={}){this.fa=r,this.ma=i,e&&(e=Dr(e,this.ma),this.h=e.buffer,this.o=e.g,this.m=t||0,this.j=n===void 0?this.h.length:this.m+n,this.g=this.m)}clear(){this.h=null,this.o=!1,this.g=this.j=this.m=0,this.fa=!1}},Br=[],Vr=0;function Hr(e,t,n,r){if(Qr.length){let i=Qr.pop();return i.v(r),i.g.init(e,t,n,r),i}return new Zr(e,t,n,r)}function Ur(e){e.g.clear(),e.j=-1,e.h=-1,Qr.length<100&&Qr.push(e)}function Wr(e){var t=e.g;if(t.g==t.j)return!1;e.m=e.g.g;var n=jr(e.g);if(t=n>>>3,!((n&=7)>=0&&n<=5)||t<1)throw Error();return e.j=t,e.h=n,!0}function Gr(e){try{switch(e.h){case 0:e.h==0?kr(e.g):Gr(e);break;case 1:var t=e.g;Ir(t,t.g+8);break;case 2:if(e.h!=2)Gr(e);else{var n=jr(e.g),r=e.g;Ir(r,r.g+n)}break;case 5:var i=e.g;Ir(i,i.g+4);break;case 3:Kr();let a=e.j;try{for(;;){if(!Wr(e))throw Error();if(e.h==4){if(e.j!=a)throw Error();break}Gr(e)}}catch(e){throw e instanceof RangeError?SyntaxError():e}finally{Vr>0&&Vr--}break;default:throw Error()}}catch(e){throw e instanceof RangeError?SyntaxError():e}}function Kr(){if(Vr>=100)throw SyntaxError();Vr++}function qr(e,t,n){var r=e.g.j,i=jr(e.g),a=(i=e.g.g+i)-r;if(a<=0&&(e.g.j=i,n(t,e,void 0,void 0,void 0),a=i-e.g.g),a)throw Error();return e.g.g=i,e.g.j=r,t}function Jr(e){var t=jr(e.g),n=Lr(e=e.g,t);if(e=e.h,ee){var r,i=e;(r=l)||(r=l=new TextDecoder(`utf-8`,{fatal:!0})),t=n+t,i=n===0&&t===i.length?i:i.subarray(n,t);try{var a=r.decode(i)}catch(e){if(d===void 0){try{r.decode(new Uint8Array([128]))}catch{}try{r.decode(new Uint8Array([97])),d=!0}catch{d=!1}}throw!d&&(l=void 0),e}}else{t=(a=n)+t,n=[];let l,u=null;for(;a<t;){var o=e[a++];o<128?n.push(o):o<224?a>=t?s():(l=e[a++],o<194||(192&l)!=128?(a--,s()):n.push((31&o)<<6|63&l)):o<240?a>=t-1?s():(l=e[a++],(192&l)!=128||o===224&&l<160||o===237&&l>=160||(192&(r=e[a++]))!=128?(a--,s()):n.push((15&o)<<12|(63&l)<<6|63&r)):o<=244?a>=t-2?s():(l=e[a++],(192&l)!=128||l-144+(o<<28)>>30||(192&(r=e[a++]))!=128||(192&(i=e[a++]))!=128?(a--,s()):(o=(7&o)<<18|(63&l)<<12|(63&r)<<6|63&i,o-=65536,n.push(55296+(o>>10&1023),56320+(1023&o)))):s(),n.length>=8192&&(u=c(u,n),n.length=0)}a=c(u,n)}return a}function Yr(e){var t=jr(e.g);return Rr(e.g,t)}function Xr(e,t,n){var r=jr(e.g);for(r=e.g.g+r;e.g.g<r;)n.push(t(e.g))}var Zr=class{constructor(e,t,n,r){if(Br.length){let i=Br.pop();i.init(e,t,n,r),e=i}else e=new zr(e,t,n,r);this.g=e,this.m=this.g.g,this.h=this.j=-1,this.v(r)}v({ra:e=!1}={}){this.ra=e}},Qr=[];function $r(e){return new ni(4294967295&e,Math.floor(e/4294967296))}function ei(e){return e?/^\d+$/.test(e)?(Ot(e),new ni(h,g)):null:ti||=new ni(0,0)}var ti,ni=class{constructor(e,t){this.h=e>>>0,this.g=t>>>0}};function ri(e){return new pi(4294967295&e,Math.floor(e/4294967296))}function ii(e){return e?/^-?\d+$/.test(e)?(Ot(e),new pi(h,g)):null:ai||=new pi(0,0)}var ai,oi,si,ci,li,ui,di,fi,pi=class{constructor(e,t){this.h=e>>>0,this.g=t>>>0}};function mi(e,t,n){return typeof BigInt64Array<`u`?(di||(di=new BigInt64Array(1),fi=new Uint32Array(di.buffer),di[0]=BigInt(1),ui=fi[0]===1),di[0]=e,new t(fi[e=+!ui],fi[1-e])):(li||=(oi=BigInt(-(2**53-1)),si=BigInt(2**53-1),ci=BigInt(4294967295),BigInt(32)),e>=oi&&e<=si?n(Number(e)):(e=BigInt.asUintN(64,e),new t(Number(e&ci),Number(e>>li))))}function hi(e,t,n){for(;n>0||t>127;)e.g.push(127&t|128),t=(t>>>7|n<<25)>>>0,n>>>=7;e.g.push(t)}function gi(e,t){for(;t>127;)e.g.push(127&t|128),t>>>=7;e.g.push(t)}function _i(e,t){if(t>=0)gi(e,t);else{for(let n=0;n<9;n++)e.g.push(127&t|128),t>>=7;e.g.push(1)}}function vi(e,t){Ot(t),function(e){var t=g>>31;e(h<<1^t,(g<<1|h>>>31)^t)}((t,n)=>{hi(e,t>>>0,n>>>0)})}function yi(e,t){e.g.push(t>>>0&255),e.g.push(t>>>8&255),e.g.push(t>>>16&255),e.g.push(t>>>24&255)}var bi=class{constructor(){this.g=[]}length(){return this.g.length}end(){var e=this.g;return this.g=[],e}};function xi(e,t){t.length!==0&&(e.j.push(t),e.h+=t.length)}function Si(e,t,n){gi(e.g,8*t+n)}function Ci(e,t){return Si(e,t,2),t=e.g.end(),xi(e,t),t.push(e.h),t}function wi(e,t){var n=t.pop();for(n=e.h+e.g.length()-n;n>127;)t.push(127&n|128),n>>>=7,e.h++;t.push(n),e.h++}function Ti(e,t,n){if(n!=null)switch(Si(e,t,0),typeof n){case`number`:e=e.g,bt(n),hi(e,h,g);break;case`bigint`:n=mi(n,pi,ri),hi(e.g,n.h,n.g);break;default:n=ii(n),hi(e.g,n.h,n.g)}}function Ei(e,t,n){Si(e,t,2),gi(e.g,n.length),xi(e,e.g.end()),xi(e,n)}function Di(e,t,n,r){n!=null&&(t=Ci(e,t),r(n,e),wi(e,t))}var Oi=class{constructor(){this.j=[],this.h=0,this.g=new bi}};function ki(e){typeof e==`string`&&ii(e)}function Ai(){var e=class{constructor(){throw Error()}};return Object.setPrototypeOf(e,e.prototype),e}var ji=Ai(),Mi=Ai(),Ni=Ai(),Pi=Ai(),Fi=Ai(),Ii=Ai(),Li=Ai(),Ri=Ai(),zi=Ai(),Bi=Ai(),Vi=Ai(),Hi=Ai();function Ui(e,t,n){var r=e.A;Re&&Re in r&&(r=r[Re])&&delete r[t.g],t.h?t.o(e,t.h,t.g,n,t.j):t.o(e,t.g,n,t.j)}var T=class{constructor(e,t){this.A=Mn(e,t,void 0,2048)}toJSON(){return An(this)}o(){var e=Bs,t=this.A,n=e.g,r=Re;if(Me&&r&&t[r]?.[n]!=null&&Ae(ze,3),t=e.g,We&&Re&&We===void 0&&(r=(n=this.A)[Re])&&(r=r.ka))try{r(n,t,Tn)}catch(e){re(e)}return e.h?e.m(this,e.h,e.g,e.j):e.m(this,e.g,e.defaultValue,e.j)}clone(){var e=this.A,t=0|e[f];return Hn(this,e,t)?Fn(this,e,!0):new this.constructor(Ln(e,t,!1))}};T.prototype[Ue]=Ze,T.prototype.toString=function(){return this.A.toString()};var Wi=class{constructor(e,t,n){this.g=e,this.h=t,e=ji,this.j=!!e&&n===e||!1}};function Gi(e,t){return new Wi(e,t,ji)}function Ki(e,t,n,r,i){Di(e,n,ia(t,r),i)}var qi,Ji,Yi=Gi(function(e,t,n,r,i){return e.h===2&&(qr(e,sr(t,r,n),i),!0)},Ki),Xi=Gi(function(e,t,n,r,i){return e.h===2&&(qr(e,sr(t,r,n),i),!0)},Ki),Zi=Symbol(),Qi=Symbol(),$i=Symbol(),ea=Symbol(),ta=Symbol();function na(e,t,n,r){var i=r[e];if(i)return i;(i={}).Ea=r,i.ca=function(e){switch(typeof e){case`boolean`:return Sn||=[0,void 0,!0];case`number`:return e>0?void 0:e===0?Cn||=[0,void 0]:[-e,void 0];case`string`:return[0,e];case`object`:return e}}(r[0]);var a=r[1],o=1;a&&a.constructor===Object&&(i.ia=a,typeof(a=r[++o])==`function`&&(i.wa=!0,qi??=a,Ji??=r[o+1],a=r[o+=2]));for(var s={};a&&Array.isArray(a)&&a.length&&typeof a[0]==`number`&&a[0]>0;){for(var c=0;c<a.length;c++)s[a[c]]=a;a=r[++o]}for(c=1;a!==void 0;){let e;typeof a==`number`&&(c+=a,a=r[++o]);var l=void 0;if(a instanceof Wi?e=a:(e=Yi,o--),e?.j){a=r[++o],l=r;var u=o;typeof a==`function`&&(a=a(),l[u]=a),l=a}for(u=c+1,typeof(a=r[++o])==`number`&&a<0&&(u-=a,a=r[++o]);c<u;c++){let r=s[c];l?n(i,c,e,l,r):t(i,c,e,r)}}return r[e]=i}function ra(e){return Array.isArray(e)?e[0]instanceof Wi?e:[Xi,e]:[e,void 0]}function ia(e,t){return e instanceof T?e.A:Array.isArray(e)?jn(e,t):void 0}function aa(e,t,n,r){var i=n.g;e[t]=r?(e,t,n)=>i(e,t,n,r):i}function oa(e,t,n,r,i){var a,o,s=n.g;e[t]=(e,t,n)=>s(e,t,n,o||=na(Qi,aa,oa,r).ca,a||=sa(r),i)}function sa(e){var t=e[$i];if(t!=null)return t;var n=na(Qi,aa,oa,e);return t=n.wa?(e,t)=>qi(e,t,n):(e,t)=>{t:{Kr();try{for(;Wr(t)&&t.h!=4;){let c=t.j,l=n[c];if(l==null){let e=n.ia;if(e){let t=e[c];if(t){let e=la(t);e!=null&&(l=n[c]=e)}}}if(l==null||!l(t,e,c)){var r=t;let n=r.m;if(Gr(r),r.ra)var i=void 0;else{let e=r.g.g-n;r.g.g=n,i=Rr(r.g,e)}r=void 0;var a=e,o=c,s=i;s&&((r=a[Re]??(a[Re]=new wn))[o]??(r[o]=[])).push(s)}}let l=bn(e);l&&(l.ka=n.Ea[ta]);var c=!0;break t}catch(e){throw e instanceof RangeError?SyntaxError():e}finally{Vr>0&&Vr--}}return c},e[$i]=t,e[ta]=ca.bind(e),t}function ca(e,t,n,r){var i=this[Qi],a=this[$i],o=jn(void 0,i.ca),s=bn(e);if(s){var c=!1,l=i.ia;if(l){if(i=(t,n,i)=>{if(i.length!==0){if(l[n])for(let e of i){t=Hr(e);try{c=!0,a(o,t)}finally{Ur(t)}}else r?.(e,n,i)}},t==null)xn(s,i);else if(s!=null){let e=s[t];e&&i(s,t,e)}if(c){let r=0|e[f];if(2&r&&2048&r&&!n?.cb)throw Error();let i=at(r),a=(t,a)=>{if(Gn(e,t,i)!=null){if(n?.lb===1)return;throw Error()}a!=null&&(r=b(e,r,t,a,i)),delete s[t]};t==null?rt(o,0|o[f],(e,t)=>{a(e,t)}):a(t,Gn(o,t,i))}}}}function la(e){var t=(e=ra(e))[0].g;if(e=e[1]){let n=sa(e),r=na(Qi,aa,oa,e).ca;return(e,i,a)=>t(e,i,a,r,n)}return t}function ua(e,t,n){e[t]=n.h}function da(e,t,n,r){var i,a,o=n.h;e[t]=(e,t,n)=>o(e,t,n,a||=na(Zi,ua,da,r).ca,i||=fa(r))}function fa(e){var t=e[ea];if(!t){let n=na(Zi,ua,da,e);t=(e,t)=>pa(e,t,n),e[ea]=t}return t}function pa(e,t,n){rt(e,0|e[f],(e,r)=>{if(r!=null){var i=function(e,t){var n=e[t];if(n)return n;if((n=e.ia)&&(n=n[t])){var r=(n=ra(n))[0].h;if(n=n[1]){let t=fa(n),i=na(Zi,ua,da,n).ca;n=e.wa?Ji(i,t):(e,n,a)=>r(e,n,a,i,t)}else n=r;return e[t]=n}}(n,e);i?i(t,r,e):e<500||Ae(Ve,3)}}),(e=bn(e))&&xn(e,(e,n,r)=>{for(xi(t,t.g.end()),e=0;e<r.length;e++)xi(t,Ce(r[e])||new Uint8Array)})}var ma=m(0);function ha(e,t,n){if(Array.isArray(t)){var r=0|t[f];if(4&r)return t;for(var i=0,a=0;i<t.length;i++){let n=e(t[i]);n!=null&&(t[a++]=n)}return a<i&&(t.length=a),e=1|r,n&&(e=-1537&e|4),e!==r&&p(t,e),n&&2&e&&Object.freeze(t),t}}var ga=(e,t)=>{var n=new Oi;pa(e.A,n,na(Zi,ua,da,t)),xi(n,n.g.end()),e=new Uint8Array(n.h);var r=(t=n.j).length,i=0;for(let n=0;n<r;n++){let r=t[n];e.set(r,i),i+=r.length}return n.j=[e],e};function E(e,t,n){return new Wi(e,t,n)}function _a(e,t,n){return new Wi(e,t,n)}function D(e,t,n){b(e,0|e[f],t,n,at(0|e[f]))}var va=Gi(function(e,t,n,r,i){if(e.h!==2)return!1;if(e=At(e=qr(e,jn([void 0,void 0],r),i)),i=at(r=0|t[f]),2&r)throw Error();var a=Gn(t,n,i);if(a instanceof gn)2&a.M?((a=a.ea()).push(e),b(t,r,n,a,i)):a.gb(e);else if(Array.isArray(a)){var o=0|a[f];8192&o||p(a,o|=8192),2&o&&b(t,r,n,a=er(a),i),a.push(e)}else b(t,r,n,Xe([e]),i);return!0},function(e,t,n,r,i){if(t instanceof gn)t.forEach((t,a)=>{Di(e,n,jn([a,t],r),i)});else if(Array.isArray(t)){for(let a=0;a<t.length;a++){let o=t[a];Array.isArray(o)&&Di(e,n,jn(o,r),i)}Xe(t)}});function ya(e,t,n){(t=Rt(t))!=null&&(Si(e,n,5),e=e.g,xt(t),yi(e,h))}function ba(e,t,n){(t=tn(t))!=null&&(ki(t),Ti(e,n,t))}function xa(e,t,n){(t=Ut(t))!=null&&t!=null&&(Si(e,n,0),_i(e.g,t))}function Sa(e,t,n){(t=t==null||typeof t==`boolean`?t:typeof t==`number`?!!t:void 0)!=null&&(Si(e,n,0),e.g.g.push(+!!t))}function Ca(e,t,n){(t=_(t))!=null&&Ei(e,n,ne(t))}function wa(e,t,n,r,i){Di(e,n,ia(t,r),i)}function Ta(e,t,n){(t=nn(t))!=null&&Ei(e,n,Dr(t,!0).buffer)}function Ea(e,t,n){(t=Wt(t))!=null&&t!=null&&(Si(e,n,0),gi(e.g,t))}function Da(e,t,n){(t=Ut(t))!=null&&(t=parseInt(t,10),Si(e,n,0),_i(e.g,t))}function Oa(e,t,n){return(e.h===5||e.h===2)&&(t=nr(t,0|t[f],n),e.h==2?Xr(e,Pr,t):t.push(Pr(e.g)),!0)}function ka(e,t,n){return e.h===0&&(D(t,n,Mr(e.g)),!0)}function Aa(e,t,n){return(e.h===0||e.h===2)&&(t=nr(t,0|t[f],n),e.h==2?Xr(e,Ar,t):t.push(Ar(e.g)),!0)}function ja(e,t,n){return e.h===2&&(D(t,n,(e=Yr(e))===Se()?void 0:e),!0)}var Ma=E(function(e,t,n){if(e.h!==1)return!1;var r=e.g;e=Nr(r);var i=Nr(r);r=2*(i>>31)+1;var a=i>>>20&2047;return e=4294967296*(1048575&i)+e,D(t,n,a==2047?e?NaN:1/0*r:a==0?5e-324*r*e:r*2**(a-1075)*(e+4503599627370496)),!0},function(e,t,n){(t=Rt(t))!=null&&(Si(e,n,1),e=e.g,(n=_t||=new DataView(new ArrayBuffer(8))).setFloat64(0,+t,!0),h=n.getUint32(0,!0),g=n.getUint32(4,!0),yi(e,h),yi(e,g))},Bi),O=E(function(e,t,n){return e.h===5&&(D(t,n,Pr(e.g)),!0)},ya,zi),Na=_a(Oa,function(e,t,n){if((t=ha(Rt,t,!0))!=null)for(let o=0;o<t.length;o++){var r=e,i=n,a=t[o];a!=null&&(Si(r,i,5),r=r.g,xt(a),yi(r,h))}},zi),Pa=_a(Oa,function(e,t,n){if((t=ha(Rt,t,!0))!=null&&t.length){Si(e,n,2),gi(e.g,4*t.length);for(let r=0;r<t.length;r++)n=e.g,xt(t[r]),yi(n,h)}},zi),Fa=E(function(e,t,n){return e.h===5&&(D(t,n,(e=Pr(e.g))===0?void 0:e),!0)},ya,zi),Ia=E(function(e,t,n){return ka(e,t,n)},ba,Ii),k=E(function(e,t,n){return ka(e,t,n)},ba,Ii),La=_a(function(e,t,n){return e.h!==0&&e.h!==2?e=!1:(t=nr(t,0|t[f],n),e.h==2?Xr(e,Mr,t):t.push(Mr(e.g)),e=!0),e},function(e,t,n){if((t=ha(tn,t,!1))!=null)for(let r=0;r<t.length;r++)Ti(e,n,t[r])},Ii),Ra=E(function(e,t,n){return e.h===0?(D(t,n,(e=Mr(e.g))===ma?void 0:e),t=!0):t=!1,t},ba,Ii),za=E(function(e,t,n){return e.h===0?(D(t,n,Or(e.g,Ct)),e=!0):e=!1,e},function(e,t,n){if(t=function(e){if(e==null)return e;var t=typeof e;if(t===`bigint`)return String(Mt(64,e));if(Vt(e)){if(t===`string`)return t=Ft(Number(e)),Nt(t)&&t>=0?e=String(t):((t=e.indexOf(`.`))!==-1&&(e=e.substring(0,t)),e=qt(e)),e;if(t===`number`)return Yt(e)}}(t),t!=null&&(typeof t==`string`&&ei(t),t!=null))switch(Si(e,n,0),typeof t){case`number`:e=e.g,bt(t),hi(e,h,g);break;case`bigint`:n=mi(t,ni,$r),hi(e.g,n.h,n.g);break;default:n=ei(t),hi(e.g,n.h,n.g)}},Li),A=E(function(e,t,n){return e.h===0&&(D(t,n,Ar(e.g)),!0)},xa,Pi),Ba=_a(Aa,function(e,t,n){if((t=ha(Ut,t,!0))!=null)for(let o=0;o<t.length;o++){var r=e,i=n,a=t[o];a!=null&&(Si(r,i,0),_i(r.g,a))}},Pi),Va=_a(Aa,function(e,t,n){if((t=ha(Ut,t,!0))!=null&&t.length){n=Ci(e,n);for(let n=0;n<t.length;n++)_i(e.g,t[n]);wi(e,n)}},Pi),Ha=E(function(e,t,n){return e.h===0&&(D(t,n,(e=Ar(e.g))===0?void 0:e),!0)},xa,Pi),j=E(function(e,t,n){return e.h===0&&(D(t,n,kr(e.g)),!0)},Sa,Mi),Ua=E(function(e,t,n){return e.h===0&&(D(t,n,!1===(e=kr(e.g))?void 0:e),!0)},Sa,Mi),M=_a(function(e,t,n){return e.h===2&&(e=Jr(e),nr(t,0|t[f],n).push(e),!0)},function(e,t,n){if((t=ha(_,t,!0))!=null)for(let o=0;o<t.length;o++){var r=e,i=n,a=t[o];a!=null&&Ei(r,i,ne(a))}},Ni),Wa=E(function(e,t,n){return e.h===2&&(D(t,n,(e=Jr(e))===``?void 0:e),!0)},Ca,Ni),N=E(function(e,t,n){return e.h===2&&(D(t,n,Jr(e)),!0)},Ca,Ni),P=function(e,t,n=ji){return new Wi(e,t,n)}(function(e,t,n,r,i){return e.h===2&&(r=jn(void 0,r),nr(t,0|t[f],n).push(r),qr(e,r,i),!0)},function(e,t,n,r,i){if(Array.isArray(t)){for(let a=0;a<t.length;a++)wa(e,t[a],n,r,i);1&(e=0|t[f])||p(t,1|e)}}),F=Gi(function(e,t,n,r,i,a){if(e.h!==2)return!1;var o=0|t[f];return ar(t,o,a,n,at(o)),qr(e,t=sr(t,r,n),i),!0},wa),Ga=E(function(e,t,n){return e.h===2&&(D(t,n,Yr(e)),!0)},Ta,Vi),Ka=_a(function(e,t,n){return e.h===2&&(e=Yr(e),nr(t,0|t[f],n).push(e),!0)},function(e,t,n){if((t=ha(nn,t,!1))!=null)for(let o=0;o<t.length;o++){var r=e,i=n,a=t[o];a!=null&&Ei(r,i,Dr(a,!0).buffer)}},Vi),qa=E(function(e,t,n){return e.h===0&&(D(t,n,jr(e.g)),!0)},Ea,Fi),Ja=_a(function(e,t,n){return(e.h===0||e.h===2)&&(t=nr(t,0|t[f],n),e.h==2?Xr(e,jr,t):t.push(jr(e.g)),!0)},function(e,t,n){if((t=ha(Wt,t,!0))!=null)for(let o=0;o<t.length;o++){var r=e,i=n,a=t[o];a!=null&&(Si(r,i,0),gi(r.g,a))}},Fi),Ya=E(function(e,t,n){return e.h===0&&(D(t,n,(e=jr(e.g))===0?void 0:e),!0)},Ea,Fi),I=E(function(e,t,n){return e.h===0&&(D(t,n,Ar(e.g)),!0)},Da,Hi),Xa=E(function(e,t,n){return e.h===0&&(D(t,n,(e=Ar(e.g))===0?void 0:e),!0)},Da,Hi),Za=E(function(e,t,n){return e.h===0?(D(t,n,function(e){return Or(e,(e,t)=>{var n=-(1&e);return wt(e=(e>>>1|t<<31)^n,t>>>1^n)})}(e.g)),e=!0):e=!1,e},function(e,t,n){if((t=tn(t))!=null&&(ki(t),t!=null))switch(Si(e,n,0),typeof t){case`number`:e=e.g,t=(n=t)<0,yt(n=2*Math.abs(n)),n=h;let r=g;t&&(n==0?r==0?r=n=4294967295:(r--,n=4294967295):n--),hi(e,h=n,g=r);break;case`bigint`:e=e.g,t=t<<BigInt(1)^t>>BigInt(63),h=Number(BigInt.asUintN(32,t)),g=Number(BigInt.asUintN(32,t>>BigInt(32))),hi(e,h,g);break;default:vi(e.g,t)}},Ri),Qa=class{constructor(e,t){var n=yo;this.g=e,this.h=t,this.m=x,this.o=S,this.defaultValue=void 0,this.j=n.jb==null?void 0:it}register(){le(this)}};function $a(e,t){return new Qa(e,t)}function eo(e,t){return(n,r)=>{t:{let a={ma:!0};r&&Object.assign(a,r),n=Hr(n,void 0,void 0,a);try{let r=new e,a=r.A;sa(t)(a,n);var i=r;break t}catch(e){throw e instanceof RangeError?SyntaxError():e}finally{Ur(n)}}return i}}function to(e){return t=>ga(t,e)}function no(e){return function(){return ga(this,e)}}var ro=[0,Ga,Ka,j,N],io=[0,Wa,[0,Xa,[0,Ra,Ha],Xa,-1,[0,I],Xa,-1],E(ja,Ta,Vi)],ao=class extends T{constructor(e){super(e)}},oo=[0,Wa,E(ja,function(e,t,n){if(t!=null){if(t instanceof T){let r=t.mb;r?(t=r(t),t!=null&&Ei(e,n,Dr(t,!0).buffer)):Ae(Ve,3);return}if(Array.isArray(t))return void Ae(Ve,3)}Ta(e,t,n)},Vi)],so=[0,1,[0,12,A,10,j],[0,7,[0,A,-1]]];globalThis.trustedTypes;var co=[0,A,I,j,-1,Va,I,-1,j,-1],lo=[0,I,-1,j],uo=class extends T{constructor(e){super(e)}},fo=[0,j,N,j,I,-1,_a(function(e,t,n){return(e.h===0||e.h===2)&&(t=nr(t,0|t[f],n),e.h==2?Xr(e,Fr,t):t.push(Ar(e.g)),!0)},function(e,t,n){if((t=ha(Ut,t,!0))!=null&&t.length){n=Ci(e,n);for(let n=0;n<t.length;n++)_i(e.g,t[n]);wi(e,n)}},Hi),N,-1,[0,j,-1],I,j,-1,lo],po=[0,3,j,-1,2,[0,[2],A,F,[0,qa]],[0,I,j,I,j,I,4,[0,j,N,-1,j]],[0,[3,4],N,-1,F,[0,A],F,[0,I,-1]],[0]],mo=[0,N,-2],ho=class extends T{constructor(e){super(e)}},go=[0],_o=class extends T{constructor(e){super(e)}},vo=[0,A,j,1,j,-4],yo=class extends T{constructor(e){super(e,2)}},L={};L[336783863]=[0,N,j,-1,A,[0,[1,2,3,4,5,6,7,8,9],F,go,F,fo,F,mo,F,vo,F,co,F,[0,N,-2],F,[0,N,I],F,po,F,lo],[0,N],j,[0,[1,3],[2,4],F,[0,Va],-1,F,[0,M],-1,P,[0,N,-1]],N];var bo=[0,Ra,-1,Ua,-3,Ra,Va,Wa,Ha,Ra,-1,Ua,Ha,Ua,-2,Wa];function R(e,t){Tr(e,3,t)}function z(e,t){Tr(e,4,t)}var xo=class extends T{constructor(e){super(e,500)}v(e){return S(this,0,7,e)}},So=[-1,{}],Co=[0,N,1,So],wo=[0,N,M,So];function To(e,t){hr(e,1,xo,t)}function B(e,t){Tr(e,10,t)}function V(e,t){Tr(e,15,t)}var Eo=class extends T{constructor(e){super(e,500)}v(e){return S(this,0,1001,e)}},Do=[-500,P,[-500,Wa,-1,M,-3,[-2,L,j],P,oo,Ha,-1,Co,wo,P,[0,Wa,Ua],Wa,bo,Ha,M,987,M],4,P,[-500,N,-1,[-1,{}],998,N],P,[-500,N,M,-1,[-2,{},j],997,M,-1],Ha,P,[-500,N,M,So,998,M],M,Ha,Co,wo,P,[0,Wa,-1,So],M,-2,bo,Wa,-1,Ua,[0,Ua,Ya],978,So,P,oo];Eo.prototype.g=no(Do);var Oo=eo(Eo,Do),ko=class extends T{constructor(e){super(e)}},Ao=class extends T{constructor(e){super(e)}g(){return ur(this,ko,1)}},jo=[0,P,[0,A,O,N,-1]],Mo=eo(Ao,jo),No=class extends T{constructor(e){super(e)}},Po=class extends T{constructor(e){super(e)}},Fo=class extends T{constructor(e){super(e)}j(){return x(this,No,2)}g(){return ur(this,Po,5)}},Io=eo(class extends T{constructor(e){super(e)}},[0,M,Va,Pa,[0,I,[0,A,-3],[0,O,-3],[0,A,-1,[0,P,[0,A,-2]]],P,[0,O,-1,N,O]],N,-1,k,P,[0,A,O],M,k]),Lo=class extends T{constructor(e){super(e)}},Ro=eo(class extends T{constructor(e){super(e)}},[0,P,[0,O,-4]]),zo=class extends T{constructor(e){super(e)}},Bo=eo(class extends T{constructor(e){super(e)}},[0,P,[0,O,-4]]),Vo=class extends T{constructor(e){super(e)}},Ho=[0,A,-1,Pa,I],Uo=class extends T{constructor(e){super(e)}};Uo.prototype.g=no([0,O,-4,k]);var Wo=class extends T{constructor(e){super(e)}},Go=eo(class extends T{constructor(e){super(e)}},[0,P,[0,1,A,N,jo],k]),Ko=class extends T{constructor(e){super(e)}},qo=class extends T{constructor(e){super(e)}g(){return v(this,1,void 0,$n)??Se()}},Jo=class extends T{constructor(e){super(e)}},Yo=[1,2],Xo=eo(class extends T{constructor(e){super(e)}},[0,P,[0,Yo,F,[0,Pa],F,[0,Ga],A,N],k]),Zo=class extends T{constructor(e){super(e)}},Qo=[0,N,A,O,M,-1],$o=class extends T{constructor(e){super(e)}},es=[0,j,-1],ts=class extends T{constructor(e){super(e)}g(){return Kn(this,uo,2,ns)}},ns=[1,2,3,4,5,6],rs=class extends T{constructor(e){super(e)}g(){return v(this,1,void 0,$n)!=null}j(){return _(v(this,2))!=null}},H=class extends T{constructor(e){super(e)}},is=[0,Ga,N,[0,A,k,-1],[0,za,k]],U=[0,is,j,[0,ns,F,vo,F,fo,F,co,F,go,F,mo,F,po],I],as=to(U),os=class extends T{constructor(e){super(e)}},ss=[0,U,O,-1,A],cs=$a(502141897,os);L[502141897]=ss;var ls=eo(class extends T{constructor(e){super(e)}},[0,[0,I,-1,Na,Ja],Ho]),us=class extends T{constructor(e){super(e)}},ds=class extends T{constructor(e){super(e)}},fs=[0,U,O,[0,U],j],ps=$a(508968150,ds);L[508968150]=[0,U,ss,fs,O,[0,[0,is]]],L[508968149]=fs;var ms=class extends T{constructor(e){super(e)}j(){return x(this,Zo,2)}g(){y(this,2)}},hs=[0,U,Qo];L[478825465]=hs;var gs=class extends T{constructor(e){super(e)}},_s=class extends T{constructor(e){super(e)}},vs=class extends T{constructor(e){super(e)}},ys=class extends T{constructor(e){super(e)}},bs=class extends T{constructor(e){super(e)}},xs=[0,U,[0,U],hs,-1],Ss=[0,U,O,A],Cs=[0,U,O],ws=[0,U,Ss,Cs,O],Ts=$a(479097054,bs);L[479097054]=[0,U,ws,xs],L[463370452]=xs,L[464864288]=Ss;var Es=$a(462713202,ys);L[462713202]=ws,L[474472470]=Cs;var Ds=class extends T{constructor(e){super(e)}},Os=class extends T{constructor(e){super(e)}},ks=class extends T{constructor(e){super(e)}},As=class extends T{constructor(e){super(e)}},js=[0,U,O,-1,A],Ms=[0,U,O,j];As.prototype.g=no([0,U,Cs,[0,U],ss,fs,js,Ms]);var Ns=class extends T{constructor(e){super(e)}},Ps=$a(456383383,Ns);L[456383383]=[0,U,Qo];var Fs=class extends T{constructor(e){super(e)}},Is=$a(476348187,Fs);L[476348187]=[0,U,es];var Ls=class extends T{constructor(e){super(e)}},Rs=class extends T{constructor(e){super(e)}},zs=[0,I,-1],Bs=$a(458105876,class extends T{constructor(e){super(e)}g(){var e=this.A,t=0|e[f],n=Qe(this,t);return e=function(e,t,n,r){var i=Rs;!r&&zn(e)&&(n=0|(t=e.A)[f]);var a=Gn(t,2);if(e=!1,a==null){if(r)return yn();a=[]}else if(a.constructor===gn){if(!(2&a.M)||r)return a;a=a.ea()}else Array.isArray(a)?e=!!(2&a[f]):a=[];if(r){if(!a.length)return yn();e||(e=!0,Ye(a))}else e&&(e=!1,Xe(a),a=er(a));return!e&&32&n&&Je(a,32),n=b(t,n,2,r=new gn(a,i,sn,void 0)),e||Vn(t,n),r}(this,e,t,n),!n&&Rs&&(e.Fa=!0),e}});L[458105876]=[0,zs,va,[!0,k,[0,N,-1,M]],[0,Va,j,I],j];var Vs=class extends T{constructor(e){super(e)}},Hs=$a(458105758,Vs);L[458105758]=[0,U,N,zs];var Us=class extends T{constructor(e){super(e)}},Ws=class extends T{constructor(e){super(e)}},Gs=class extends T{constructor(e){super(e)}},Ks=to([0,P,[0,Xa,P,[0,Fa,-1],Ua]]),qs=class extends T{constructor(e){super(e)}},Js=[0,Fa,-1,Ua],Ys=class extends T{constructor(e){super(e)}},Xs=class extends T{constructor(e){super(e)}},Zs=[1,2];Xs.prototype.g=no([0,Zs,F,Js,F,[0,P,Js]]);var Qs=class extends T{constructor(e){super(e)}},$s=$a(443442058,Qs);L[443442058]=[0,U,N,A,O,M,-1,j,O],L[514774813]=js;var ec=class extends T{constructor(e){super(e)}},tc=$a(516587230,ec);function nc(e,t){return t=t?t.clone():new Zo,e.displayNamesLocale===void 0?e.displayNamesLocale===void 0&&y(t,1):y(t,1,an(e.displayNamesLocale)),e.maxResults===void 0?`maxResults`in e&&y(t,2):yr(t,2,e.maxResults),e.scoreThreshold===void 0?`scoreThreshold`in e&&y(t,3):w(t,3,e.scoreThreshold),e.categoryAllowlist===void 0?`categoryAllowlist`in e&&y(t,4):wr(t,4,e.categoryAllowlist),e.categoryDenylist===void 0?`categoryDenylist`in e&&y(t,5):wr(t,5,e.categoryDenylist),t}function rc(e){var t=Number(e);return Number.isSafeInteger(t)?t:String(e)}function ic(e,t=-1,n=``){return{categories:e.map(e=>({index:gr(e,1)??0??-1,score:C(e,2)??0,categoryName:_(v(e,3))??``??``,displayName:_(v(e,4))??``??``})),headIndex:t,headName:n}}function ac(e){var t={classifications:ur(e,Wo,1).map(e=>ic(x(e,Ao,4)?.g()??[],gr(e,2)??0,_(v(e,3))??``))};return function(e){return e==null?e:typeof e==`bigint`?(dt(e)?e=Number(e):(e=jt(64,e),e=dt(e)?Number(e):String(e)),e):Vt(e)?typeof e==`number`?Jt(e):Zt(e):void 0}(v(e,2,void 0,en))!=null&&(t.timestampMs=rc(v(e,2,void 0,en)??Un)),t}function oc(e){var t=Jn(e,3,Rt,qn()),n=Jn(e,2,Ut,qn()),r=Jn(e,1,_,qn()),i=Jn(e,9,_,qn()),a={categories:[],keypoints:[]};for(let e=0;e<t.length;e++)a.categories.push({score:t[e],index:n[e]??-1,categoryName:r[e]??``,displayName:i[e]??``});if((t=x(e,Fo,4)?.j())&&(a.boundingBox={originX:gr(t,1,Wn)??0,originY:gr(t,2,Wn)??0,width:gr(t,3,Wn)??0,height:gr(t,4,Wn)??0,angle:0}),x(e,Fo,4)?.g().length)for(let t of x(e,Fo,4).g())a.keypoints.push({x:v(t,1,Wn,Rt)??0,y:v(t,2,Wn,Rt)??0,score:v(t,4,Wn,Rt)??0,label:_(v(t,3,Wn))??``});return a}function sc(e){var t=[];for(let n of ur(e,zo,1))t.push({x:C(n,1)??0,y:C(n,2)??0,z:C(n,3)??0,visibility:C(n,4)??0});return t}function cc(e){var t=[];for(let n of ur(e,Lo,1))t.push({x:C(n,1)??0,y:C(n,2)??0,z:C(n,3)??0,visibility:C(n,4)??0});return t}function lc(e){return Array.from(e,e=>e>127?e-256:e)}function uc(e,t){if(e.length!==t.length)throw Error(`Cannot compute cosine similarity between embeddings of different sizes (${e.length} vs. ${t.length}).`);var n=0,r=0,i=0;for(let a=0;a<e.length;a++)n+=e[a]*t[a],r+=e[a]*e[a],i+=t[a]*t[a];if(r<=0||i<=0)throw Error(`Cannot compute cosine similarity on embedding with 0 norm.`);return n/Math.sqrt(r*i)}L[516587230]=[0,U,js,Ms,O],L[518928384]=Ms,new Uint8Array([0,97,115,109,1,0,0,0,1,5,1,96,0,1,123,3,2,1,0,10,10,1,8,0,65,0,253,15,253,98,11]);function dc(e){return y(new fc,1,Ht(e))}var fc=class extends T{constructor(e){super(e)}},pc=class extends T{constructor(e){super(e)}},mc=[0,I,2,za,-2,k,P,[0,I,k]],hc=class extends T{constructor(e){super(e)}},gc=class extends T{constructor(e){super(e)}};function _c(e,t){return y(e,1,Ht(t))}function vc(e,t){return y(e,2,Ht(t))}var yc=class extends T{constructor(e){super(e)}},bc=[3,4,5,6,7],xc=class extends T{constructor(e){super(e)}},Sc=class extends T{constructor(e){super(e)}};Sc.prototype.g=no([0,[0,I,N,-3,I],[0,bc,I,-1,F,[0,I,N,za],F,mc,F,[0,1,mc],F,[0,I],F,[0,I,N,za]]]);var Cc=class{constructor(){this.g=typeof AbortController<`u`}async send(e,t,n){var r=this.g?new AbortController:void 0,i=r&&e.la>0?setTimeout(()=>{r.abort()},e.la):void 0;try{let i=await fetch(e.url,{method:e.bb,headers:{...e.ab},...e.body&&{body:e.body},...e.withCredentials&&{credentials:`include`},signal:e.la&&r?r.signal:null});i.status===200?t?.(await i.text()):n?.(i.status)}catch(e){e?.name===`AbortError`?n?.(408):n?.(400)}finally{clearTimeout(i)}}},wc=class extends T{constructor(e){super(e,37)}},Tc=[-4,{},so,I,io],Ec=[0,N,I,1,N,-1,I,1,I,1,k],Dc=[0,I,N,-2],Oc=[0,N,I],kc=[0,N,I],Ac=[0,j,-3],jc=[0,I,N,-1,k,A,-1,N,-5,P,[0,N,-4],-1,j,[0,j,-3],I],Mc=class extends T{constructor(e){super(e,19)}},Nc=to([-19,{},[0,I,1,[0,N,-6,k,A,N,-1,k],1,[0,N,1,N,-5],N,-1,[0,I,N,-8],[0,N,-3],[0,N,I,N,-2],[0,N,-1,I,N,-1,I,N,-1,[0,P,[0,N,-1],j,N,-5],[0,I,j,A,-2]],k,[0,N,-3,k,A,N,-1],[0,I,N,-1],[0,N,-9],[0,N,-6,I,N,1,N,j,I,-1,j,N,-2,I,N,I,N,A,-1],1,[0,I],1,[0,N,-4],1,Ec,[0,[1,2,3,4,5,6],F,Ec,F,Oc,F,kc,F,[0,I],F,jc,F,Dc],Oc,kc,jc,[0,[0,I,N,-1,k,A,-1,N,-4,P,[0,N,-4],-1,1,Ac],[0,I,N,-1,k,A,-1,N,-4,Ac]],Dc,[0,N,[0,A,-3,I],I,-2,[0,A,-1],j],4,[0,N,I,N,-1,k,I,N,-1,I,A,-1]],I,P,[-37,{},Ia,N,P,[0,N,-1],Ga,1,Ga,[0,M,-1,Ba,La,-1],N,[0,A,N,-1],j,A,k,N,-1,Za,ro,Ia,Ga,I,Ba,k,-1,[0,I,-1],N,j,N,Va,N,-1,Ma,1,Ma,Tc,j,[0,I,[0,O,A,-2],[0,O]],[0,I,k]],Ia,Ka,N,-1,Ia,I,-1,[0,j,-1,I,j],[0,k,-1,N],[0,Ia,j,k],k,1,qa,1,Tc]),Pc=class{constructor(e){this.h=[],this.m=new Cc,this.j=e??``,this.g=setInterval(()=>{this.flush()},6e4)}close(){this.g!==void 0&&(clearInterval(this.g),this.g=void 0),this.flush()}flush(e,t){if(this.error)t?.(`net-send-failed`);else if(this.h.length===0)e?.();else{var n=this.h;this.h=[],n=function(e){var t=new Mc;return pr(t=y(t,2,Ht(1786)),3,e)}(n),n=Nc(n),this.m.send({url:`https://odml.pa.googleapis.com/v1/log`,bb:`POST`,la:1e4,body:n,hb:2,ab:{"Content-Type":`application/x-protobuf`,"x-goog-api-key":this.j},withCredentials:!1},()=>{e?.()},e=>{this.error=Error(`Logging failed with HTTP error: ${e}`),this.h=[],this.g!==void 0&&(clearInterval(this.g),this.g=void 0),t?.(`net-send-failed`,e)})}}},Fc=class{constructor(){this.aa=this.U=this.X=this.R=this.V=this.T=this.P=0}};function Ic(e,t){var n=new Sc;n=S(n,0,1,e.B),n=S(n,0,2,t),t=y(t=new wc,6,et(n=n.g(),!1)),(e=e.l).error||e.h.push(t)}function Lc(e,t){var n={P:t.P-e.j.P,T:t.T-e.j.T,V:t.V-e.j.V,R:t.R-e.j.R,X:t.X-e.j.X,U:t.U,aa:t.aa},r=vc(_c(new yc,e.C),1);n=Rc(e,n),Ic(e,r=fr(r,4,bc,n)),e.j=t}function Rc(e,t){var n=new pc;return e=xr(e=br(e=y(n,1,Ht(e.D)),7,t.R),5,t.U),e=xr(e,6,t.aa),t.V>0&&xr(e,4,t.X/t.V),t.P!==0&&(n=br(n=dc(3),2,t.P),hr(e,8,fc,n)),t.T!==0&&(t=br(n=dc(4),2,t.T),hr(e,8,fc,t)),e}var zc=class{constructor(e,t,n){this.u=performance.now(),this.m=performance.now(),this.h=new Map,this.o=0,this.g=new Fc,this.j=new Fc,this.l=new Pc(n),this.C=function(e){switch(e){case`AudioClassifier`:return 4;case`AudioEmbedder`:return 5;case`TextClassifier`:return 6;case`TextEmbedder`:return 7;case`GestureRecognizer`:return 8;case`HandDetector`:return 9;case`HandLandmarker`:return 10;case`ImageClassifier`:return 11;case`ImageEmbedder`:return 12;case`ImageSegmenter`:return 13;case`ObjectDetector`:return 14;case`FaceDetector`:return 15;case`FaceLandmarker`:return 16;case`InteractiveSegmenter`:case`InteractiveSegmenterLegacy`:return 18;case`HolisticLandmarker`:return 20;case`LlmInference`:return 21;case`LanguageDetector`:return 22;case`PoseLandmarker`:return 23;default:return 0}}(e),this.D=function(e){switch(e){case`IMAGE`:return 11;case`VIDEO`:return 12;case`LIVE_STREAM`:return 13;case`AUDIO_CLIPS`:return 14;case`AUDIO_STREAM`:return 15;default:return 10}}(t),e=new xc,typeof window>`u`?t=0:(t=navigator.userAgent,t=/Android/i.test(t)?1:/iPhone|iPad|iPod/i.test(t)?2:/Windows/i.test(t)?5:/Macintosh/i.test(t)?4:/Linux/i.test(t)?3:0),e=y(e,1,Ht(t)),e=y(e,2,an(``)),e=y(e,3,an(``)),e=y(e,4,an(`1.0.1`)),e=y(e,5,an(``)),this.B=y(e,6,Ht(4))}ya(){var e=new gc;e=xr(e=y(e,1,Ht(this.D)),3,performance.now()-this.u),Ic(this,e=fr(vc(_c(new yc,this.C),0),3,bc,e)),this.m=performance.now()}za(e){var t=this.h.get(e);if(t!==void 0&&(this.h.delete(e),e=performance.now()-t,++this.g.V,this.g.X+=e,this.g.U=Math.max(this.g.U,e),this.o=Math.max(this.o,e),performance.now()>this.m+3e4)){for(let[n,r]of this.h.entries())e=n,r<t&&(this.g.R++,this.h.delete(e));t={...this.g,aa:performance.now()-this.m},this.g.U=0,this.m=performance.now(),Lc(this,t)}}xa(){var e={...this.g,R:this.g.R+this.h.size,U:this.o,aa:performance.now()-this.u};Lc(this,e);var t=new hc;t=S(t,0,2,e=Rc(this,e)),Ic(this,t=fr(e=vc(_c(new yc,this.C),2),5,bc,t))}close(){var e=this.l;typeof e.close==`function`?e.close():e.flush()}};function Bc(){var e=navigator;return typeof OffscreenCanvas<`u`&&(!function(e=navigator){return(e=e.userAgent).includes(`Safari`)&&!e.includes(`Chrome`)}(e)||!!((e=e.userAgent.match(/Version\/([\d]+).*Safari/))&&e.length>=1&&Number(e[1])>=17))}async function Vc(e){if(typeof importScripts!=`function`){let t=document.createElement(`script`);return t.src=e.toString(),t.crossOrigin=`anonymous`,new Promise((e,n)=>{t.addEventListener(`load`,()=>{e()},!1),t.addEventListener(`error`,e=>{n(e)},!1),document.body.appendChild(t)})}try{importScripts(e.toString())}catch(t){if(!(t instanceof TypeError))throw t;{let t=self.import;t?await t(e.toString()):await r(()=>import(e.toString()),[])}}}function Hc(e){return e.videoWidth===void 0?e.naturalWidth===void 0?e.displayWidth===void 0?[e.width,e.height]:[e.displayWidth,e.displayHeight]:[e.naturalWidth,e.naturalHeight]:[e.videoWidth,e.videoHeight]}function W(e,t,n){e.m||console.error(`No wasm multistream support detected: ensure dependency inclusion of :gl_graph_runner_internal_multi_input target`),n(t=e.i.stringToNewUTF8(t)),e.i._free(t)}function Uc(e,t,n){if(!e.i.canvas)throw Error(`No OpenGL canvas configured.`);if(n?e.i._bindTextureToStream(n):e.i._bindTextureToCanvas(),!(n=e.i.canvas.getContext(`webgl2`)||e.i.canvas.getContext(`webgl`)))throw Error("Failed to obtain WebGL context from the provided canvas. `getContext()` should only be invoked with `webgl` or `webgl2`.");e.i.gpuOriginForWebTexturesIsBottomLeft&&n.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,!0),n.texImage2D(n.TEXTURE_2D,0,n.RGBA,n.RGBA,n.UNSIGNED_BYTE,t),e.i.gpuOriginForWebTexturesIsBottomLeft&&n.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,!1);var[r,i]=Hc(t);return!e.j||r===e.i.canvas.width&&i===e.i.canvas.height||(e.i.canvas.width=r,e.i.canvas.height=i),[r,i]}function Wc(e,t,n){e.m||console.error(`No wasm multistream support detected: ensure dependency inclusion of :gl_graph_runner_internal_multi_input target`);var r=new Uint32Array(t.length);for(let n=0;n<t.length;n++)r[n]=e.i.stringToNewUTF8(t[n]);t=e.i._malloc(4*r.length),e.i.HEAPU32.set(r,t>>2),n(t);for(let t of r)e.i._free(t);e.i._free(t)}function Gc(e,t,n){e.i.simpleListeners=e.i.simpleListeners||{},e.i.simpleListeners[t]=n}function Kc(e,t,n){var r=[];e.i.simpleListeners=e.i.simpleListeners||{},e.i.simpleListeners[t]=(e,t,i)=>{t?(n(r,i),r=[]):r.push(e)}}var qc=class{constructor(e,t){this.j=!0,this.i=e,this.g=null,this.h=0,this.m=typeof this.i._addIntToInputStream==`function`,t===void 0?Bc()?this.i.canvas=new OffscreenCanvas(1,1):(console.warn(`OffscreenCanvas not supported and GraphRunner constructor glCanvas parameter is undefined. Creating backup canvas.`),this.i.canvas=document.createElement(`canvas`)):this.i.canvas=t}async initializeGraph(e){var t=await(await fetch(e)).arrayBuffer();e=!(e.endsWith(`.pbtxt`)||e.endsWith(`.textproto`)),this.setGraph(new Uint8Array(t),e)}setGraphFromString(e){this.setGraph(new TextEncoder().encode(e),!1)}setGraph(e,t){var n=e.length,r=this.i._malloc(n);this.i.HEAPU8.set(e,r),t?this.i._changeBinaryGraph(n,r):this.i._changeTextGraph(n,r),this.i._free(r)}configureAudio(e,t,n,r,i){this.i._configureAudio||console.warn(`Attempting to use configureAudio without support for input audio. Is build dep ":gl_graph_runner_audio" missing?`),W(this,r||`input_audio`,r=>{W(this,i||=`audio_header`,i=>{this.i._configureAudio(r,i,e,t??0,n)})})}setAutoResizeCanvas(e){this.j=e}setAutoRenderToScreen(e){this.i._setAutoRenderToScreen(e)}setGpuBufferVerticalFlip(e){this.i.gpuOriginForWebTexturesIsBottomLeft=e}ja(e){Gc(this,`__graph_config__`,t=>{e(t)}),W(this,`__graph_config__`,e=>{this.i._getGraphConfig(e,void 0)}),delete this.i.simpleListeners.__graph_config__}attachErrorListener(e){this.i.errorListener=e}attachEmptyPacketListener(e,t){this.i.emptyPacketListeners=this.i.emptyPacketListeners||{},this.i.emptyPacketListeners[e]=t}addAudioToStream(e,t,n){this.addAudioToStreamWithShape(e,0,0,t,n)}addAudioToStreamWithShape(e,t,n,r,i){var a=4*e.length;this.h!==a&&(this.g&&this.i._free(this.g),this.g=this.i._malloc(a),this.h=a),this.i.HEAPF32.set(e,this.g/4),W(this,r,e=>{this.i._addAudioToInputStream(this.g,t,n,e,i)})}addGpuBufferToStream(e,t,n){W(this,t,t=>{var[r,i]=Uc(this,e,t);this.i._addBoundTextureToStream(t,r,i,n)})}addBoolToStream(e,t,n){W(this,t,t=>{this.i._addBoolToInputStream(e,t,n)})}addDoubleToStream(e,t,n){W(this,t,t=>{this.i._addDoubleToInputStream(e,t,n)})}addFloatToStream(e,t,n){W(this,t,t=>{this.i._addFloatToInputStream(e,t,n)})}addIntToStream(e,t,n){W(this,t,t=>{this.i._addIntToInputStream(e,t,n)})}addUintToStream(e,t,n){W(this,t,t=>{this.i._addUintToInputStream(e,t,n)})}addStringToStream(e,t,n){W(this,t,t=>{W(this,e,e=>{this.i._addStringToInputStream(e,t,n)})})}addStringRecordToStream(e,t,n){W(this,t,t=>{Wc(this,Object.keys(e),r=>{Wc(this,Object.values(e),i=>{this.i._addFlatHashMapToInputStream(r,i,Object.keys(e).length,t,n)})})})}addProtoToStream(e,t,n,r){W(this,n,n=>{W(this,t,t=>{var i=this.i._malloc(e.length);this.i.HEAPU8.set(e,i),this.i._addProtoToInputStream(i,e.length,t,n,r),this.i._free(i)})})}addEmptyPacketToStream(e,t){W(this,e,e=>{this.i._addEmptyPacketToInputStream(e,t)})}addBoolVectorToStream(e,t,n){W(this,t,t=>{var r=this.i._allocateBoolVector(e.length);if(!r)throw Error(`Unable to allocate new bool vector on heap.`);for(let t of e)this.i._addBoolVectorEntry(r,t);this.i._addBoolVectorToInputStream(r,t,n)})}addDoubleVectorToStream(e,t,n){W(this,t,t=>{var r=this.i._allocateDoubleVector(e.length);if(!r)throw Error(`Unable to allocate new double vector on heap.`);for(let t of e)this.i._addDoubleVectorEntry(r,t);this.i._addDoubleVectorToInputStream(r,t,n)})}addFloatVectorToStream(e,t,n){W(this,t,t=>{var r=this.i._allocateFloatVector(e.length);if(!r)throw Error(`Unable to allocate new float vector on heap.`);for(let t of e)this.i._addFloatVectorEntry(r,t);this.i._addFloatVectorToInputStream(r,t,n)})}addIntVectorToStream(e,t,n){W(this,t,t=>{var r=this.i._allocateIntVector(e.length);if(!r)throw Error(`Unable to allocate new int vector on heap.`);for(let t of e)this.i._addIntVectorEntry(r,t);this.i._addIntVectorToInputStream(r,t,n)})}addUintVectorToStream(e,t,n){W(this,t,t=>{var r=this.i._allocateUintVector(e.length);if(!r)throw Error(`Unable to allocate new unsigned int vector on heap.`);for(let t of e)this.i._addUintVectorEntry(r,t);this.i._addUintVectorToInputStream(r,t,n)})}addStringVectorToStream(e,t,n){W(this,t,t=>{var r=this.i._allocateStringVector(e.length);if(!r)throw Error(`Unable to allocate new string vector on heap.`);for(let t of e)W(this,t,e=>{this.i._addStringVectorEntry(r,e)});this.i._addStringVectorToInputStream(r,t,n)})}addBoolToInputSidePacket(e,t){W(this,t,t=>{this.i._addBoolToInputSidePacket(e,t)})}addDoubleToInputSidePacket(e,t){W(this,t,t=>{this.i._addDoubleToInputSidePacket(e,t)})}addFloatToInputSidePacket(e,t){W(this,t,t=>{this.i._addFloatToInputSidePacket(e,t)})}addIntToInputSidePacket(e,t){W(this,t,t=>{this.i._addIntToInputSidePacket(e,t)})}addUintToInputSidePacket(e,t){W(this,t,t=>{this.i._addUintToInputSidePacket(e,t)})}addStringToInputSidePacket(e,t){W(this,t,t=>{W(this,e,e=>{this.i._addStringToInputSidePacket(e,t)})})}addProtoToInputSidePacket(e,t,n){W(this,n,n=>{W(this,t,t=>{var r=this.i._malloc(e.length);this.i.HEAPU8.set(e,r),this.i._addProtoToInputSidePacket(r,e.length,t,n),this.i._free(r)})})}addBoolVectorToInputSidePacket(e,t){W(this,t,t=>{var n=this.i._allocateBoolVector(e.length);if(!n)throw Error(`Unable to allocate new bool vector on heap.`);for(let t of e)this.i._addBoolVectorEntry(n,t);this.i._addBoolVectorToInputSidePacket(n,t)})}addDoubleVectorToInputSidePacket(e,t){W(this,t,t=>{var n=this.i._allocateDoubleVector(e.length);if(!n)throw Error(`Unable to allocate new double vector on heap.`);for(let t of e)this.i._addDoubleVectorEntry(n,t);this.i._addDoubleVectorToInputSidePacket(n,t)})}addFloatVectorToInputSidePacket(e,t){W(this,t,t=>{var n=this.i._allocateFloatVector(e.length);if(!n)throw Error(`Unable to allocate new float vector on heap.`);for(let t of e)this.i._addFloatVectorEntry(n,t);this.i._addFloatVectorToInputSidePacket(n,t)})}addIntVectorToInputSidePacket(e,t){W(this,t,t=>{var n=this.i._allocateIntVector(e.length);if(!n)throw Error(`Unable to allocate new int vector on heap.`);for(let t of e)this.i._addIntVectorEntry(n,t);this.i._addIntVectorToInputSidePacket(n,t)})}addUintVectorToInputSidePacket(e,t){W(this,t,t=>{var n=this.i._allocateUintVector(e.length);if(!n)throw Error(`Unable to allocate new unsigned int vector on heap.`);for(let t of e)this.i._addUintVectorEntry(n,t);this.i._addUintVectorToInputSidePacket(n,t)})}addStringVectorToInputSidePacket(e,t){W(this,t,t=>{var n=this.i._allocateStringVector(e.length);if(!n)throw Error(`Unable to allocate new string vector on heap.`);for(let t of e)W(this,t,e=>{this.i._addStringVectorEntry(n,e)});this.i._addStringVectorToInputSidePacket(n,t)})}attachBoolListener(e,t){Gc(this,e,t),W(this,e,e=>{this.i._attachBoolListener(e)})}attachBoolVectorListener(e,t){Kc(this,e,t),W(this,e,e=>{this.i._attachBoolVectorListener(e)})}attachIntListener(e,t){Gc(this,e,t),W(this,e,e=>{this.i._attachIntListener(e)})}attachIntVectorListener(e,t){Kc(this,e,t),W(this,e,e=>{this.i._attachIntVectorListener(e)})}attachUintListener(e,t){Gc(this,e,t),W(this,e,e=>{this.i._attachUintListener(e)})}attachUintVectorListener(e,t){Kc(this,e,t),W(this,e,e=>{this.i._attachUintVectorListener(e)})}attachDoubleListener(e,t){Gc(this,e,t),W(this,e,e=>{this.i._attachDoubleListener(e)})}attachDoubleVectorListener(e,t){Kc(this,e,t),W(this,e,e=>{this.i._attachDoubleVectorListener(e)})}attachFloatListener(e,t){Gc(this,e,t),W(this,e,e=>{this.i._attachFloatListener(e)})}attachFloatVectorListener(e,t){Kc(this,e,t),W(this,e,e=>{this.i._attachFloatVectorListener(e)})}attachStringListener(e,t){Gc(this,e,t),W(this,e,e=>{this.i._attachStringListener(e)})}attachStringVectorListener(e,t){Kc(this,e,t),W(this,e,e=>{this.i._attachStringVectorListener(e)})}attachProtoListener(e,t,n){Gc(this,e,t),W(this,e,e=>{this.i._attachProtoListener(e,n||!1)})}attachProtoVectorListener(e,t,n){Kc(this,e,t),W(this,e,e=>{this.i._attachProtoVectorListener(e,n||!1)})}attachAudioListener(e,t,n){this.i._attachAudioListener||console.warn(`Attempting to use attachAudioListener without support for output audio. Is build dep ":gl_graph_runner_audio_out" missing?`),Gc(this,e,(e,n)=>{e=new Float32Array(e.buffer,e.byteOffset,e.length/4),t(e,n)}),W(this,e,e=>{this.i._attachAudioListener(e,n||!1)})}finishProcessing(){this.i._waitUntilIdle()}closeGraph(){this.i._closeGraph(),this.i.simpleListeners=void 0,this.i.emptyPacketListeners=void 0}};function Jc(e){return class extends e{get pa(){return this.i}Sa(){if(typeof this.pa._mediapipeLoggerGetEncodedApiKey==`function`){let e=this.pa._mediapipeLoggerGetEncodedApiKey();return this.pa._decodeBase64(e)}}}}function Yc(e){return class extends e{Za(){this.i._registerModelResourcesGraphService()}}}var Xc=Jc(Yc(qc)),Zc=class extends Xc{};async function Qc(e,t,n,r){return e=await(async(e,t,n,r,i)=>{if(t&&await Vc(t),!self.ModuleFactory||n&&(await Vc(n),!self.ModuleFactory))throw Error(`ModuleFactory not set.`);return self.Module&&i&&((t=self.Module).locateFile=i.locateFile,i.mainScriptUrlOrBlob&&(t.mainScriptUrlOrBlob=i.mainScriptUrlOrBlob)),i=await self.ModuleFactory(self.Module||i),self.ModuleFactory=self.Module=void 0,new e(i,r)})(e,n.wasmLoaderPath,n.assetLoaderPath,t,{locateFile:e=>e.endsWith(`.wasm`)?n.wasmBinaryPath.toString():n.assetBinaryPath&&e.endsWith(`.data`)?n.assetBinaryPath.toString():e}),function(e,t){t=t.runningMode??``;var n=e.g.Sa();e.m=new zc(e.C(),t,n)}(e,r),await e.v(r),e}async function $c(e,t,n,r){return Qc(e,t,n,r)}function el(e,t){var n=x(e.baseOptions,rs,1)||new rs;typeof t==`string`?(y(n,2,an(t)),y(n,1)):t instanceof Uint8Array&&(y(n,1,et(t,!1)),y(n,2)),S(e.baseOptions,0,1,n)}function tl(e){try{let t=e.K.length;if(t===1)throw Error(e.K[0].message);if(t>1)throw Error(`Encountered multiple errors: `+e.K.map(e=>e.message).join(`, `))}finally{e.K=[]}}function G(e,t){e.I=Math.max(e.I,t)}function nl(e,t){e.D=new xo,Cr(e.D,2,`PassThroughCalculator`),R(e.D,`free_memory`),z(e.D,`free_memory_unused_out`),B(t,`free_memory`),To(t,e.D)}function rl(e,t){R(e.D,t),z(e.D,t+`_unused_out`)}function il(e){e.g.addBoolToStream(!0,`free_memory`,e.I)}var al=class{constructor(e){this.g=e,this.K=[],this.I=0,this.g.setAutoRenderToScreen(!1)}j(e,t=!0){if(t){let t=e.baseOptions||{};if(e.baseOptions?.modelAssetBuffer&&e.baseOptions?.modelAssetPath)throw Error(`Cannot set both baseOptions.modelAssetPath and baseOptions.modelAssetBuffer`);if(!(x(this.baseOptions,rs,1)?.g()||x(this.baseOptions,rs,1)?.j()||e.baseOptions?.modelAssetBuffer||e.baseOptions?.modelAssetPath))throw Error(`Either baseOptions.modelAssetPath or baseOptions.modelAssetBuffer must be set`);if(function(e,t){var n=x(e.baseOptions,ts,3);if(!n){var r=n=new ts,i=new ho;fr(r,4,ns,i)}`delegate`in t&&(t.delegate===`GPU`?(t=n,r=new uo,fr(t,2,ns,r)):(t=n,r=new ho,fr(t,4,ns,r))),S(e.baseOptions,0,3,n)}(this,t),t.modelAssetPath)return fetch(t.modelAssetPath.toString()).then(e=>{if(e.ok)return e.arrayBuffer();throw Error(`Failed to fetch model: ${t.modelAssetPath} (${e.status})`)}).then(e=>{try{this.g.i.FS_unlink(`/model.dat`)}catch{}this.g.i.FS_createDataFile(`/`,`model.dat`,new Uint8Array(e),!0,!1,!1),el(this,`/model.dat`),this.o(),this.L()});if(t.modelAssetBuffer instanceof Uint8Array)el(this,t.modelAssetBuffer);else if(t.modelAssetBuffer)return async function(e){for(var t=[],n=0;;){let{done:r,value:i}=await e.read();if(r)break;t.push(i),n+=i.length}if(t.length===0)return new Uint8Array;if(t.length===1)return t[0];e=new Uint8Array(n),n=0;for(let r of t)e.set(r,n),n+=r.length;return e}(t.modelAssetBuffer).then(e=>{el(this,e),this.o(),this.L()})}return this.o(),this.L(),Promise.resolve()}L(){}ja(){var e;if(this.g.ja(t=>{e=Oo(t)}),!e)throw Error(`Failed to retrieve CalculatorGraphConfig`);return e}setGraph(e,t){this.g.attachErrorListener((e,t)=>{this.K.push(Error(t))}),this.g.Za(),this.g.setGraph(e,t),this.m?.ya(),this.D=void 0,tl(this)}finishProcessing(e){this.g.finishProcessing(),tl(this),this.m&&e!==void 0&&this.m.za(e)}close(){this.D=void 0,this.m?.xa(),this.m?.close(),this.g.closeGraph()}};function ol(e,t){if(!e)throw Error(`Unable to obtain required WebGL resource: ${t}`);return e}al.prototype.close=al.prototype.close;var sl=class{constructor(e,t,n,r){this.g=e,this.h=t,this.m=n,this.j=r}bind(){this.g.bindVertexArray(this.h)}close(){this.g.deleteVertexArray(this.h),this.g.deleteBuffer(this.m),this.g.deleteBuffer(this.j)}};function cl(e,t,n){var r=e.g;if(n=ol(r.createShader(n),`Failed to create WebGL shader`),r.shaderSource(n,t),r.compileShader(n),!r.getShaderParameter(n,r.COMPILE_STATUS))throw Error(`Could not compile WebGL shader: ${r.getShaderInfoLog(n)}`);return r.attachShader(e.h,n),n}function ll(e,t){var n=e.g,r=ol(n.createVertexArray(),`Failed to create vertex array`);n.bindVertexArray(r);var i=ol(n.createBuffer(),`Failed to create buffer`);n.bindBuffer(n.ARRAY_BUFFER,i),n.enableVertexAttribArray(e.F),n.vertexAttribPointer(e.F,2,n.FLOAT,!1,0,0),n.bufferData(n.ARRAY_BUFFER,new Float32Array([-1,-1,-1,1,1,1,1,-1]),n.STATIC_DRAW);var a=ol(n.createBuffer(),`Failed to create buffer`);return n.bindBuffer(n.ARRAY_BUFFER,a),n.enableVertexAttribArray(e.K),n.vertexAttribPointer(e.K,2,n.FLOAT,!1,0,0),n.bufferData(n.ARRAY_BUFFER,new Float32Array(t?[0,1,0,0,1,0,1,1]:[0,0,0,1,1,1,1,0]),n.STATIC_DRAW),n.bindBuffer(n.ARRAY_BUFFER,null),n.bindVertexArray(null),new sl(n,r,i,a)}function ul(e,t){if(e.g){if(t!==e.g)throw Error(`Cannot change GL context once initialized`)}else e.g=t}function dl(e,t,n,r){return ul(e,t),e.h||(e.m(),e.I()),n?(e.l||(e.l=ll(e,!0)),n=e.l):(e.D||(e.D=ll(e,!1)),n=e.D),t.useProgram(e.h),n.bind(),e.j(),e=r(),n.g.bindVertexArray(null),e}function fl(e,t,n){return ul(e,t),e=ol(t.createTexture(),`Failed to create texture`),t.bindTexture(t.TEXTURE_2D,e),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_WRAP_S,t.CLAMP_TO_EDGE),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_WRAP_T,t.CLAMP_TO_EDGE),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_MIN_FILTER,n??t.LINEAR),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_MAG_FILTER,n??t.LINEAR),t.bindTexture(t.TEXTURE_2D,null),e}function pl(e,t,n){ul(e,t),e.C||=ol(t.createFramebuffer(),`Failed to create framebuffe.`),t.bindFramebuffer(t.FRAMEBUFFER,e.C),t.framebufferTexture2D(t.FRAMEBUFFER,t.COLOR_ATTACHMENT0,t.TEXTURE_2D,n,0)}function ml(e){e.g?.bindFramebuffer(e.g.FRAMEBUFFER,null)}var hl=class{B(){return`
  precision mediump float;
  varying vec2 vTex;
  uniform sampler2D inputTexture;
  void main() {
    gl_FragColor = texture2D(inputTexture, vTex);
  }
 `}m(){var e=this.g;if(this.h=ol(e.createProgram(),`Failed to create WebGL program`),this.da=cl(this,`
  attribute vec2 aVertex;
  attribute vec2 aTex;
  varying vec2 vTex;
  void main(void) {
    gl_Position = vec4(aVertex, 0.0, 1.0);
    vTex = aTex;
  }`,e.VERTEX_SHADER),this.Z=cl(this,this.B(),e.FRAGMENT_SHADER),e.linkProgram(this.h),!e.getProgramParameter(this.h,e.LINK_STATUS))throw Error(`Error during program linking: ${e.getProgramInfoLog(this.h)}`);this.F=e.getAttribLocation(this.h,`aVertex`),this.K=e.getAttribLocation(this.h,`aTex`)}I(){}j(){}close(){if(this.h){let e=this.g;e.deleteProgram(this.h),e.deleteShader(this.da),e.deleteShader(this.Z)}this.C&&this.g.deleteFramebuffer(this.C),this.D&&this.D.close(),this.l&&this.l.close()}},gl=class extends hl{B(){return`
  precision mediump float;
  uniform sampler2D backgroundTexture;
  uniform sampler2D maskTexture;
  uniform sampler2D colorMappingTexture;
  varying vec2 vTex;
  void main() {
    vec4 backgroundColor = texture2D(backgroundTexture, vTex);
    float category = texture2D(maskTexture, vTex).r;
    vec4 categoryColor = texture2D(colorMappingTexture, vec2(category, 0.0));
    gl_FragColor = mix(backgroundColor, categoryColor, categoryColor.a);
  }
 `}I(){var e=this.g;e.activeTexture(e.TEXTURE1),this.u=fl(this,e,e.LINEAR),e.activeTexture(e.TEXTURE2),this.o=fl(this,e,e.NEAREST)}m(){super.m();var e=this.g;this.O=ol(e.getUniformLocation(this.h,`backgroundTexture`),`Uniform location`),this.Y=ol(e.getUniformLocation(this.h,`colorMappingTexture`),`Uniform location`),this.L=ol(e.getUniformLocation(this.h,`maskTexture`),`Uniform location`)}j(){super.j();var e=this.g;e.uniform1i(this.L,0),e.uniform1i(this.O,1),e.uniform1i(this.Y,2)}close(){this.u&&this.g.deleteTexture(this.u),this.o&&this.g.deleteTexture(this.o),super.close()}},_l=class extends hl{B(){return`
  precision mediump float;
  uniform sampler2D maskTexture;
  uniform sampler2D defaultTexture;
  uniform sampler2D overlayTexture;
  varying vec2 vTex;
  void main() {
    float confidence = texture2D(maskTexture, vTex).r;
    vec4 defaultColor = texture2D(defaultTexture, vTex);
    vec4 overlayColor = texture2D(overlayTexture, vTex);
    // Apply the alpha from the overlay and merge in the default color
    overlayColor = mix(defaultColor, overlayColor, overlayColor.a);
    gl_FragColor = mix(defaultColor, overlayColor, confidence);
  }
 `}I(){var e=this.g;e.activeTexture(e.TEXTURE1),this.o=fl(this,e),e.activeTexture(e.TEXTURE2),this.u=fl(this,e)}m(){super.m();var e=this.g;this.L=ol(e.getUniformLocation(this.h,`defaultTexture`),`Uniform location`),this.O=ol(e.getUniformLocation(this.h,`overlayTexture`),`Uniform location`),this.J=ol(e.getUniformLocation(this.h,`maskTexture`),`Uniform location`)}j(){super.j();var e=this.g;e.uniform1i(this.J,0),e.uniform1i(this.L,1),e.uniform1i(this.O,2)}close(){this.o&&this.g.deleteTexture(this.o),this.u&&this.g.deleteTexture(this.u),super.close()}};function vl(e,t){switch(t){case 0:return e.g.find(e=>e instanceof Uint8Array);case 1:return e.g.find(e=>e instanceof Float32Array);case 2:return e.g.find(e=>typeof WebGLTexture<`u`&&e instanceof WebGLTexture);default:throw Error(`Type is not supported: ${t}`)}}function yl(e){var t=vl(e,1);if(!t){if(t=vl(e,0))t=new Float32Array(t).map(e=>e/255);else{t=new Float32Array(e.width*e.height);let r=xl(e);var n=Cl(e);if(pl(n,r,bl(e)),`iPad Simulator;iPhone Simulator;iPod Simulator;iPad;iPhone;iPod`.split(`;`).includes(navigator.platform)||navigator.userAgent.includes(`Mac`)&&`document`in self&&`ontouchend`in self.document){n=new Float32Array(e.width*e.height*4),r.readPixels(0,0,e.width,e.height,r.RGBA,r.FLOAT,n);for(let e=0,r=0;e<t.length;++e,r+=4)t[e]=n[r]}else r.readPixels(0,0,e.width,e.height,r.RED,r.FLOAT,t)}e.g.push(t)}return t}function bl(e){var t=vl(e,2);if(!t){let n=xl(e);t=wl(e);let r=yl(e),i=Sl(e);n.texImage2D(n.TEXTURE_2D,0,i,e.width,e.height,0,n.RED,n.FLOAT,r),Tl(e)}return t}function xl(e){if(!e.canvas)throw Error(`Conversion to different image formats require that a canvas is passed when initializing the image.`);return e.h||=ol(e.canvas.getContext(`webgl2`),`You cannot use a canvas that is already bound to a different type of rendering context.`),e.h}function Sl(e){if(e=xl(e),!El){if(e.getExtension(`EXT_color_buffer_float`)&&e.getExtension(`OES_texture_float_linear`)&&e.getExtension(`EXT_float_blend`))El=e.R32F;else{if(!e.getExtension(`EXT_color_buffer_half_float`))throw Error(`GPU does not fully support 4-channel float32 or float16 formats`);El=e.R16F}}return El}function Cl(e){return e.j||=new hl,e.j}function wl(e){var t=xl(e);t.viewport(0,0,e.width,e.height),t.activeTexture(t.TEXTURE0);var n=vl(e,2);return n||(n=fl(Cl(e),t,e.m?t.LINEAR:t.NEAREST),e.g.push(n),e.o=!0),t.bindTexture(t.TEXTURE_2D,n),n}function Tl(e){e.h.bindTexture(e.h.TEXTURE_2D,null)}var El,K=class{constructor(e,t,n,r,i,a,o){this.g=e,this.m=t,this.o=n,this.canvas=r,this.j=i,this.width=a,this.height=o,this.o&&--Dl===0&&console.error(`You seem to be creating MPMask instances without invoking .close(). This leaks resources.`)}Ua(){return!!vl(this,0)}ua(){return!!vl(this,1)}W(){return!!vl(this,2)}ta(){return(t=vl(e=this,0))||(t=yl(e),t=new Uint8Array(t.map(e=>Math.round(255*e))),e.g.push(t)),t;var e,t}sa(){return yl(this)}S(){return bl(this)}clone(){var e=[];for(let t of this.g){let n;if(t instanceof Uint8Array)n=new Uint8Array(t);else if(t instanceof Float32Array)n=new Float32Array(t);else{if(!(t instanceof WebGLTexture))throw Error(`Type is not supported: ${t}`);{let e=xl(this),t=Cl(this);e.activeTexture(e.TEXTURE1),n=fl(t,e,this.m?e.LINEAR:e.NEAREST),e.bindTexture(e.TEXTURE_2D,n);let r=Sl(this);e.texImage2D(e.TEXTURE_2D,0,r,this.width,this.height,0,e.RED,e.FLOAT,null),e.bindTexture(e.TEXTURE_2D,null),pl(t,e,n),dl(t,e,!1,()=>{wl(this),e.clearColor(0,0,0,0),e.clear(e.COLOR_BUFFER_BIT),e.drawArrays(e.TRIANGLE_FAN,0,4),Tl(this)}),ml(t),Tl(this)}}e.push(n)}return new K(e,this.m,this.W(),this.canvas,this.j,this.width,this.height)}close(){this.o&&xl(this).deleteTexture(vl(this,2)),Dl=-1}};K.prototype.close=K.prototype.close,K.prototype.clone=K.prototype.clone,K.prototype.getAsWebGLTexture=K.prototype.S,K.prototype.getAsFloat32Array=K.prototype.sa,K.prototype.getAsUint8Array=K.prototype.ta,K.prototype.hasWebGLTexture=K.prototype.W,K.prototype.hasFloat32Array=K.prototype.ua,K.prototype.hasUint8Array=K.prototype.Ua;var Dl=250,Ol={color:`white`,lineWidth:4,radius:6};function kl(e){return{...Ol,fillColor:(e||={}).color,...e}}function Al(e,t){return e instanceof Function?e(t):e}function jl(e,t,n){return Math.max(Math.min(t,n),Math.min(Math.max(t,n),e))}function Ml(e){if(!e.j)throw Error(`CPU rendering requested but CanvasRenderingContext2D not provided.`);return e.j}function Nl(e){if(!e.o)throw Error(`GPU rendering requested but WebGL2RenderingContext not provided.`);return e.o}function Pl(e,t,n){if(t.W())n(t.S());else{let r=t.ua()?t.sa():t.ta();e.m=e.m??new hl;let i=Nl(e);n((e=new K([r],t.m,!1,i.canvas,e.m,t.width,t.height)).S()),e.close()}}function Fl(e,t,n,r){var i=function(e){return e.g||=new gl,e.g}(e),a=Nl(e),o=Array.isArray(n)?new ImageData(new Uint8ClampedArray(n),1,1):n;dl(i,a,!0,()=>{(function(e,t,n,r){var i=e.g;if(i.activeTexture(i.TEXTURE0),i.bindTexture(i.TEXTURE_2D,t),i.activeTexture(i.TEXTURE1),i.bindTexture(i.TEXTURE_2D,e.u),i.texImage2D(i.TEXTURE_2D,0,i.RGBA,i.RGBA,i.UNSIGNED_BYTE,n),e.J&&function(e,t){if(e!==t)return!1;e=e.entries(),t=t.entries();for(let[n,r]of e){e=n;let i=r,a=t.next();if(a.done)return!1;let[o,s]=a.value;if(e!==o||i[0]!==s[0]||i[1]!==s[1]||i[2]!==s[2]||i[3]!==s[3])return!1}return!!t.next().done}(e.J,r))i.activeTexture(i.TEXTURE2),i.bindTexture(i.TEXTURE_2D,e.o);else{e.J=r;let t=Array(1024).fill(0);r.forEach((e,n)=>{if(e.length!==4)throw Error(`Color at index ${n} is not a four-channel value.`);t[4*n]=e[0],t[4*n+1]=e[1],t[4*n+2]=e[2],t[4*n+3]=e[3]}),i.activeTexture(i.TEXTURE2),i.bindTexture(i.TEXTURE_2D,e.o),i.texImage2D(i.TEXTURE_2D,0,i.RGBA,256,1,0,i.RGBA,i.UNSIGNED_BYTE,new Uint8Array(t))}})(i,t,o,r),a.clearColor(0,0,0,0),a.clear(a.COLOR_BUFFER_BIT),a.drawArrays(a.TRIANGLE_FAN,0,4);var e=i.g;e.activeTexture(e.TEXTURE0),e.bindTexture(e.TEXTURE_2D,null),e.activeTexture(e.TEXTURE1),e.bindTexture(e.TEXTURE_2D,null),e.activeTexture(e.TEXTURE2),e.bindTexture(e.TEXTURE_2D,null)})}function Il(e,t,n,r){var i=Nl(e),a=function(e){return e.h||=new _l,e.h}(e),o=Array.isArray(n)?new ImageData(new Uint8ClampedArray(n),1,1):n,s=Array.isArray(r)?new ImageData(new Uint8ClampedArray(r),1,1):r;dl(a,i,!0,()=>{var e=a.g;e.activeTexture(e.TEXTURE0),e.bindTexture(e.TEXTURE_2D,t),e.activeTexture(e.TEXTURE1),e.bindTexture(e.TEXTURE_2D,a.o),e.texImage2D(e.TEXTURE_2D,0,e.RGBA,e.RGBA,e.UNSIGNED_BYTE,o),e.activeTexture(e.TEXTURE2),e.bindTexture(e.TEXTURE_2D,a.u),e.texImage2D(e.TEXTURE_2D,0,e.RGBA,e.RGBA,e.UNSIGNED_BYTE,s),i.clearColor(0,0,0,0),i.clear(i.COLOR_BUFFER_BIT),i.drawArrays(i.TRIANGLE_FAN,0,4),i.bindTexture(i.TEXTURE_2D,null),(e=a.g).activeTexture(e.TEXTURE0),e.bindTexture(e.TEXTURE_2D,null),e.activeTexture(e.TEXTURE1),e.bindTexture(e.TEXTURE_2D,null),e.activeTexture(e.TEXTURE2),e.bindTexture(e.TEXTURE_2D,null)})}var q=class{constructor(e,t){typeof CanvasRenderingContext2D<`u`&&e instanceof CanvasRenderingContext2D||e instanceof OffscreenCanvasRenderingContext2D?(this.j=e,this.o=t):this.o=e}Ma(e,t){if(e){var n=Ml(this);t=kl(t),n.save();var r=n.canvas,i=0;for(let a of e)n.fillStyle=Al(t.fillColor,{index:i,from:a}),n.strokeStyle=Al(t.color,{index:i,from:a}),n.lineWidth=Al(t.lineWidth,{index:i,from:a}),(e=new Path2D).arc(a.x*r.width,a.y*r.height,Al(t.radius,{index:i,from:a}),0,2*Math.PI),n.fill(e),n.stroke(e),++i;n.restore()}}La(e,t,n){if(e&&t){var r=Ml(this);n=kl(n),r.save();var i=r.canvas,a=0;for(let o of t){r.beginPath(),t=e[o.start];let s=e[o.end];t&&s&&(r.strokeStyle=Al(n.color,{index:a,from:t,to:s}),r.lineWidth=Al(n.lineWidth,{index:a,from:t,to:s}),r.moveTo(t.x*i.width,t.y*i.height),r.lineTo(s.x*i.width,s.y*i.height)),++a,r.stroke()}r.restore()}}Ia(e,t){var n=Ml(this);t=kl(t),n.save(),n.beginPath(),n.lineWidth=Al(t.lineWidth,{}),n.strokeStyle=Al(t.color,{}),n.fillStyle=Al(t.fillColor,{}),n.moveTo(e.originX,e.originY),n.lineTo(e.originX+e.width,e.originY),n.lineTo(e.originX+e.width,e.originY+e.height),n.lineTo(e.originX,e.originY+e.height),n.lineTo(e.originX,e.originY),n.stroke(),n.fill(),n.restore()}Ja(e,t,n=[0,0,0,255]){this.j?function(e,t,n,r){var i=Nl(e);Pl(e,t,t=>{Fl(e,t,n,r),(t=Ml(e)).drawImage(i.canvas,0,0,t.canvas.width,t.canvas.height)})}(this,e,n,t):Fl(this,e.S(),n,t)}Ka(e,t,n){this.j?function(e,t,n,r){var i=Nl(e);Pl(e,t,t=>{Il(e,t,n,r),(t=Ml(e)).drawImage(i.canvas,0,0,t.canvas.width,t.canvas.height)})}(this,e,t,n):Il(this,e.S(),t,n)}close(){this.g?.close(),this.g=void 0,this.h?.close(),this.h=void 0,this.m?.close(),this.m=void 0}};function Ll(e,t){switch(t){case 0:return e.g.find(e=>e instanceof ImageData);case 1:return e.g.find(e=>typeof ImageBitmap<`u`&&e instanceof ImageBitmap);case 2:return e.g.find(e=>typeof WebGLTexture<`u`&&e instanceof WebGLTexture);default:throw Error(`Type is not supported: ${t}`)}}function Rl(e){var t=Ll(e,0);if(!t){t=Bl(e);let n=Vl(e),r=new Uint8Array(e.width*e.height*4);pl(n,t,zl(e)),t.readPixels(0,0,e.width,e.height,t.RGBA,t.UNSIGNED_BYTE,r),ml(n),t=new ImageData(new Uint8ClampedArray(r.buffer),e.width,e.height),e.g.push(t)}return t}function zl(e){var t=Ll(e,2);if(!t){let n=Bl(e);t=Hl(e);let r=Ll(e,1)||Rl(e);n.texImage2D(n.TEXTURE_2D,0,n.RGBA,n.RGBA,n.UNSIGNED_BYTE,r),Ul(e)}return t}function Bl(e){if(!e.canvas)throw Error(`Conversion to different image formats require that a canvas is passed when initializing the image.`);return e.h||=ol(e.canvas.getContext(`webgl2`),`You cannot use a canvas that is already bound to a different type of rendering context.`),e.h}function Vl(e){return e.j||=new hl,e.j}function Hl(e){var t=Bl(e);t.viewport(0,0,e.width,e.height),t.activeTexture(t.TEXTURE0);var n=Ll(e,2);return n||(n=fl(Vl(e),t),e.g.push(n),e.m=!0),t.bindTexture(t.TEXTURE_2D,n),n}function Ul(e){e.h.bindTexture(e.h.TEXTURE_2D,null)}function Wl(e){var t=Bl(e);return dl(Vl(e),t,!0,()=>function(e,t){var n=e.canvas;if(n.width===e.width&&n.height===e.height)return t();var r=n.width,i=n.height;return n.width=e.width,n.height=e.height,e=t(),n.width=r,n.height=i,e}(e,()=>{if(t.bindFramebuffer(t.FRAMEBUFFER,null),t.clearColor(0,0,0,0),t.clear(t.COLOR_BUFFER_BIT),t.drawArrays(t.TRIANGLE_FAN,0,4),!(e.canvas instanceof OffscreenCanvas))throw Error(`Conversion to ImageBitmap requires that the MediaPipe Tasks is initialized with an OffscreenCanvas`);return e.canvas.transferToImageBitmap()}))}q.prototype.close=q.prototype.close,q.prototype.drawConfidenceMask=q.prototype.Ka,q.prototype.drawCategoryMask=q.prototype.Ja,q.prototype.drawBoundingBox=q.prototype.Ia,q.prototype.drawConnectors=q.prototype.La,q.prototype.drawLandmarks=q.prototype.Ma,q.lerp=function(e,t,n,r,i){return jl(r*(1-(e-t)/(n-t))+i*(1-(n-e)/(n-t)),r,i)},q.clamp=jl;var J=class{constructor(e,t,n,r,i,a,o){this.g=e,this.o=t,this.m=n,this.canvas=r,this.j=i,this.width=a,this.height=o,(this.o||this.m)&&--Gl===0&&console.error(`You seem to be creating MPImage instances without invoking .close(). This leaks resources.`)}Ta(){return!!Ll(this,0)}va(){return!!Ll(this,1)}W(){return!!Ll(this,2)}Qa(){return Rl(this)}Pa(){var e=Ll(this,1);return e||(zl(this),Hl(this),e=Wl(this),Ul(this),this.g.push(e),this.o=!0),e}S(){return zl(this)}clone(){var e=[];for(let t of this.g){let n;if(t instanceof ImageData)n=new ImageData(t.data,this.width,this.height);else if(t instanceof WebGLTexture){let e=Bl(this),t=Vl(this);e.activeTexture(e.TEXTURE1),n=fl(t,e),e.bindTexture(e.TEXTURE_2D,n),e.texImage2D(e.TEXTURE_2D,0,e.RGBA,this.width,this.height,0,e.RGBA,e.UNSIGNED_BYTE,null),e.bindTexture(e.TEXTURE_2D,null),pl(t,e,n),dl(t,e,!1,()=>{Hl(this),e.clearColor(0,0,0,0),e.clear(e.COLOR_BUFFER_BIT),e.drawArrays(e.TRIANGLE_FAN,0,4),Ul(this)}),ml(t),Ul(this)}else{if(!(t instanceof ImageBitmap))throw Error(`Type is not supported: ${t}`);zl(this),Hl(this),n=Wl(this),Ul(this)}e.push(n)}return new J(e,this.va(),this.W(),this.canvas,this.j,this.width,this.height)}close(){this.o&&Ll(this,1).close(),this.m&&Bl(this).deleteTexture(Ll(this,2)),Gl=-1}};J.prototype.close=J.prototype.close,J.prototype.clone=J.prototype.clone,J.prototype.getAsWebGLTexture=J.prototype.S,J.prototype.getAsImageBitmap=J.prototype.Pa,J.prototype.getAsImageData=J.prototype.Qa,J.prototype.hasWebGLTexture=J.prototype.W,J.prototype.hasImageBitmap=J.prototype.va,J.prototype.hasImageData=J.prototype.Ta;var Gl=250;function Kl(...e){return e.map(([e,t])=>({start:e,end:t}))}var ql,Jl=Yc((ql=Jc(qc),class extends ql{get oa(){return this.i}Da(e,t,n){W(this,t,t=>{var[r,i]=Uc(this,e,t);this.oa._addBoundTextureAsImageToStream(t,r,i,n)})}ga(e,t){Gc(this,e,t),W(this,e,e=>{this.oa._attachImageListener(e)})}ha(e,t){Kc(this,e,t),W(this,e,e=>{this.oa._attachImageVectorListener(e)})}})),Yl=class extends Jl{};async function Y(e,t,n){return $c(e,n.canvas??(Bc()?void 0:document.createElement(`canvas`)),t,n)}function Xl(e,t,n,r){if(e.m&&r!==void 0){if(x(e.baseOptions,ts,3)?.g()){var i=e.m;++i.g.T,i.h.set(r,performance.now())}else++(i=e.m).g.P,i.h.set(r,performance.now())}if(e.qa){if(i=new Uo,n?.regionOfInterest){if(!e.Ca)throw Error(`This task doesn't support region-of-interest.`);var a=n.regionOfInterest;if(a.left>=a.right||a.top>=a.bottom)throw Error(`Expected RectF with left < right and top < bottom.`);if(a.left<0||a.top<0||a.right>1||a.bottom>1)throw Error(`Expected RectF values to be in [0,1].`);w(i,1,(a.left+a.right)/2),w(i,2,(a.top+a.bottom)/2),w(i,4,a.right-a.left),w(i,3,a.bottom-a.top)}else w(i,1,.5),w(i,2,.5),w(i,4,1),w(i,3,1);if(n?.rotationDegrees){if(n?.rotationDegrees%90!=0)throw Error(`Expected rotation to be a multiple of 90°.`);if(w(i,5,-Math.PI*n.rotationDegrees/180),n?.rotationDegrees%180!=0){let[e,r]=Hc(t);n=C(i,3)*r/e,a=C(i,4)*e/r,w(i,4,n),w(i,3,a)}}e.g.addProtoToStream(i.g(),`mediapipe.NormalizedRect`,e.qa,r)}e.g.Da(t,e.Ba,r??performance.now()),e.finishProcessing(r)}function Zl(e,t,n){if(e.J)throw Error(`Task is not initialized with image mode. 'runningMode' must be set to 'IMAGE'.`);Xl(e,t,n,e.I+1)}function Ql(e,t,n,r){if(!e.J)throw Error(`Task is not initialized with video mode. 'runningMode' must be set to 'VIDEO'.`);Xl(e,t,n,r)}function $l(e,t,n,r){var i=t.data,a=t.width,o=a*(t=t.height);if((i instanceof Uint8Array||i instanceof Float32Array)&&i.length!==o)throw Error(`Unsupported channel count: `+i.length/o);return e=new K([i],n,!1,e.g.i.canvas,e.da,a,t),r?e.clone():e}var eu=class extends al{constructor(e,t,n,r){super(e),this.g=e,this.Ba=t,this.qa=n,this.Ca=r,this.da=new hl,this.J=!1}j(e,t=!0){if(`runningMode`in e){var n=this.J=!!e.runningMode&&e.runningMode!==`IMAGE`;y(this.baseOptions,2,n==null?n:zt(n))}if(e.canvas!==void 0&&this.g.i.canvas!==e.canvas)throw Error(`You must create a new task to reset the canvas.`);return super.j(e,t)}close(){this.da.close(),super.close()}};eu.prototype.close=eu.prototype.close;var tu=class extends eu{constructor(e,t){super(new Yl(e,t),`image_in`,`norm_rect_in`,!1),this.l={detections:[]},S(e=this.h=new os,0,1,t=new H),w(this.h,2,.5),w(this.h,3,.3)}C(){return`FaceDetector`}get baseOptions(){return x(this.h,H,1)}set baseOptions(e){S(this.h,0,1,e)}v(e){return`minDetectionConfidence`in e&&w(this.h,2,e.minDetectionConfidence??.5),`minSuppressionThreshold`in e&&w(this.h,3,e.minSuppressionThreshold??.3),this.j(e)}G(e,t){return this.l={detections:[]},Zl(this,e,t),this.l}H(e,t,n){return this.l={detections:[]},Ql(this,e,n,t),this.l}o(){var e=new Eo;B(e,`image_in`),B(e,`norm_rect_in`),V(e,`detections`);var t=new yo;Ui(t,cs,this.h);var n=new xo;Cr(n,2,`mediapipe.tasks.vision.face_detector.FaceDetectorGraph`),R(n,`IMAGE:image_in`),R(n,`NORM_RECT:norm_rect_in`),z(n,`DETECTIONS:detections`),n.v(t),To(e,n),this.g.attachProtoVectorListener(`detections`,(e,t)=>{for(let t of e)e=Io(t),this.l.detections.push(oc(e));G(this,t)}),this.g.attachEmptyPacketListener(`detections`,e=>{G(this,e)}),e=e.g(),this.setGraph(new Uint8Array(e),!0)}};tu.prototype.detectForVideo=tu.prototype.H,tu.prototype.detect=tu.prototype.G,tu.prototype.setOptions=tu.prototype.v,tu.createFromModelPath=async function(e,t){return Y(tu,e,{baseOptions:{modelAssetPath:t}})},tu.createFromModelBuffer=function(e,t){return Y(tu,e,{baseOptions:{modelAssetBuffer:t}})},tu.createFromOptions=function(e,t){return Y(tu,e,t)};var nu=Kl([61,146],[146,91],[91,181],[181,84],[84,17],[17,314],[314,405],[405,321],[321,375],[375,291],[61,185],[185,40],[40,39],[39,37],[37,0],[0,267],[267,269],[269,270],[270,409],[409,291],[78,95],[95,88],[88,178],[178,87],[87,14],[14,317],[317,402],[402,318],[318,324],[324,308],[78,191],[191,80],[80,81],[81,82],[82,13],[13,312],[312,311],[311,310],[310,415],[415,308]),ru=Kl([263,249],[249,390],[390,373],[373,374],[374,380],[380,381],[381,382],[382,362],[263,466],[466,388],[388,387],[387,386],[386,385],[385,384],[384,398],[398,362]),iu=Kl([276,283],[283,282],[282,295],[295,285],[300,293],[293,334],[334,296],[296,336]),au=Kl([474,475],[475,476],[476,477],[477,474]),ou=Kl([33,7],[7,163],[163,144],[144,145],[145,153],[153,154],[154,155],[155,133],[33,246],[246,161],[161,160],[160,159],[159,158],[158,157],[157,173],[173,133]),su=Kl([46,53],[53,52],[52,65],[65,55],[70,63],[63,105],[105,66],[66,107]),cu=Kl([469,470],[470,471],[471,472],[472,469]),lu=Kl([10,338],[338,297],[297,332],[332,284],[284,251],[251,389],[389,356],[356,454],[454,323],[323,361],[361,288],[288,397],[397,365],[365,379],[379,378],[378,400],[400,377],[377,152],[152,148],[148,176],[176,149],[149,150],[150,136],[136,172],[172,58],[58,132],[132,93],[93,234],[234,127],[127,162],[162,21],[21,54],[54,103],[103,67],[67,109],[109,10]),uu=[...nu,...ru,...iu,...ou,...su,...lu],du=Kl([127,34],[34,139],[139,127],[11,0],[0,37],[37,11],[232,231],[231,120],[120,232],[72,37],[37,39],[39,72],[128,121],[121,47],[47,128],[232,121],[121,128],[128,232],[104,69],[69,67],[67,104],[175,171],[171,148],[148,175],[118,50],[50,101],[101,118],[73,39],[39,40],[40,73],[9,151],[151,108],[108,9],[48,115],[115,131],[131,48],[194,204],[204,211],[211,194],[74,40],[40,185],[185,74],[80,42],[42,183],[183,80],[40,92],[92,186],[186,40],[230,229],[229,118],[118,230],[202,212],[212,214],[214,202],[83,18],[18,17],[17,83],[76,61],[61,146],[146,76],[160,29],[29,30],[30,160],[56,157],[157,173],[173,56],[106,204],[204,194],[194,106],[135,214],[214,192],[192,135],[203,165],[165,98],[98,203],[21,71],[71,68],[68,21],[51,45],[45,4],[4,51],[144,24],[24,23],[23,144],[77,146],[146,91],[91,77],[205,50],[50,187],[187,205],[201,200],[200,18],[18,201],[91,106],[106,182],[182,91],[90,91],[91,181],[181,90],[85,84],[84,17],[17,85],[206,203],[203,36],[36,206],[148,171],[171,140],[140,148],[92,40],[40,39],[39,92],[193,189],[189,244],[244,193],[159,158],[158,28],[28,159],[247,246],[246,161],[161,247],[236,3],[3,196],[196,236],[54,68],[68,104],[104,54],[193,168],[168,8],[8,193],[117,228],[228,31],[31,117],[189,193],[193,55],[55,189],[98,97],[97,99],[99,98],[126,47],[47,100],[100,126],[166,79],[79,218],[218,166],[155,154],[154,26],[26,155],[209,49],[49,131],[131,209],[135,136],[136,150],[150,135],[47,126],[126,217],[217,47],[223,52],[52,53],[53,223],[45,51],[51,134],[134,45],[211,170],[170,140],[140,211],[67,69],[69,108],[108,67],[43,106],[106,91],[91,43],[230,119],[119,120],[120,230],[226,130],[130,247],[247,226],[63,53],[53,52],[52,63],[238,20],[20,242],[242,238],[46,70],[70,156],[156,46],[78,62],[62,96],[96,78],[46,53],[53,63],[63,46],[143,34],[34,227],[227,143],[123,117],[117,111],[111,123],[44,125],[125,19],[19,44],[236,134],[134,51],[51,236],[216,206],[206,205],[205,216],[154,153],[153,22],[22,154],[39,37],[37,167],[167,39],[200,201],[201,208],[208,200],[36,142],[142,100],[100,36],[57,212],[212,202],[202,57],[20,60],[60,99],[99,20],[28,158],[158,157],[157,28],[35,226],[226,113],[113,35],[160,159],[159,27],[27,160],[204,202],[202,210],[210,204],[113,225],[225,46],[46,113],[43,202],[202,204],[204,43],[62,76],[76,77],[77,62],[137,123],[123,116],[116,137],[41,38],[38,72],[72,41],[203,129],[129,142],[142,203],[64,98],[98,240],[240,64],[49,102],[102,64],[64,49],[41,73],[73,74],[74,41],[212,216],[216,207],[207,212],[42,74],[74,184],[184,42],[169,170],[170,211],[211,169],[170,149],[149,176],[176,170],[105,66],[66,69],[69,105],[122,6],[6,168],[168,122],[123,147],[147,187],[187,123],[96,77],[77,90],[90,96],[65,55],[55,107],[107,65],[89,90],[90,180],[180,89],[101,100],[100,120],[120,101],[63,105],[105,104],[104,63],[93,137],[137,227],[227,93],[15,86],[86,85],[85,15],[129,102],[102,49],[49,129],[14,87],[87,86],[86,14],[55,8],[8,9],[9,55],[100,47],[47,121],[121,100],[145,23],[23,22],[22,145],[88,89],[89,179],[179,88],[6,122],[122,196],[196,6],[88,95],[95,96],[96,88],[138,172],[172,136],[136,138],[215,58],[58,172],[172,215],[115,48],[48,219],[219,115],[42,80],[80,81],[81,42],[195,3],[3,51],[51,195],[43,146],[146,61],[61,43],[171,175],[175,199],[199,171],[81,82],[82,38],[38,81],[53,46],[46,225],[225,53],[144,163],[163,110],[110,144],[52,65],[65,66],[66,52],[229,228],[228,117],[117,229],[34,127],[127,234],[234,34],[107,108],[108,69],[69,107],[109,108],[108,151],[151,109],[48,64],[64,235],[235,48],[62,78],[78,191],[191,62],[129,209],[209,126],[126,129],[111,35],[35,143],[143,111],[117,123],[123,50],[50,117],[222,65],[65,52],[52,222],[19,125],[125,141],[141,19],[221,55],[55,65],[65,221],[3,195],[195,197],[197,3],[25,7],[7,33],[33,25],[220,237],[237,44],[44,220],[70,71],[71,139],[139,70],[122,193],[193,245],[245,122],[247,130],[130,33],[33,247],[71,21],[21,162],[162,71],[170,169],[169,150],[150,170],[188,174],[174,196],[196,188],[216,186],[186,92],[92,216],[2,97],[97,167],[167,2],[141,125],[125,241],[241,141],[164,167],[167,37],[37,164],[72,38],[38,12],[12,72],[38,82],[82,13],[13,38],[63,68],[68,71],[71,63],[226,35],[35,111],[111,226],[101,50],[50,205],[205,101],[206,92],[92,165],[165,206],[209,198],[198,217],[217,209],[165,167],[167,97],[97,165],[220,115],[115,218],[218,220],[133,112],[112,243],[243,133],[239,238],[238,241],[241,239],[214,135],[135,169],[169,214],[190,173],[173,133],[133,190],[171,208],[208,32],[32,171],[125,44],[44,237],[237,125],[86,87],[87,178],[178,86],[85,86],[86,179],[179,85],[84,85],[85,180],[180,84],[83,84],[84,181],[181,83],[201,83],[83,182],[182,201],[137,93],[93,132],[132,137],[76,62],[62,183],[183,76],[61,76],[76,184],[184,61],[57,61],[61,185],[185,57],[212,57],[57,186],[186,212],[214,207],[207,187],[187,214],[34,143],[143,156],[156,34],[79,239],[239,237],[237,79],[123,137],[137,177],[177,123],[44,1],[1,4],[4,44],[201,194],[194,32],[32,201],[64,102],[102,129],[129,64],[213,215],[215,138],[138,213],[59,166],[166,219],[219,59],[242,99],[99,97],[97,242],[2,94],[94,141],[141,2],[75,59],[59,235],[235,75],[24,110],[110,228],[228,24],[25,130],[130,226],[226,25],[23,24],[24,229],[229,23],[22,23],[23,230],[230,22],[26,22],[22,231],[231,26],[112,26],[26,232],[232,112],[189,190],[190,243],[243,189],[221,56],[56,190],[190,221],[28,56],[56,221],[221,28],[27,28],[28,222],[222,27],[29,27],[27,223],[223,29],[30,29],[29,224],[224,30],[247,30],[30,225],[225,247],[238,79],[79,20],[20,238],[166,59],[59,75],[75,166],[60,75],[75,240],[240,60],[147,177],[177,215],[215,147],[20,79],[79,166],[166,20],[187,147],[147,213],[213,187],[112,233],[233,244],[244,112],[233,128],[128,245],[245,233],[128,114],[114,188],[188,128],[114,217],[217,174],[174,114],[131,115],[115,220],[220,131],[217,198],[198,236],[236,217],[198,131],[131,134],[134,198],[177,132],[132,58],[58,177],[143,35],[35,124],[124,143],[110,163],[163,7],[7,110],[228,110],[110,25],[25,228],[356,389],[389,368],[368,356],[11,302],[302,267],[267,11],[452,350],[350,349],[349,452],[302,303],[303,269],[269,302],[357,343],[343,277],[277,357],[452,453],[453,357],[357,452],[333,332],[332,297],[297,333],[175,152],[152,377],[377,175],[347,348],[348,330],[330,347],[303,304],[304,270],[270,303],[9,336],[336,337],[337,9],[278,279],[279,360],[360,278],[418,262],[262,431],[431,418],[304,408],[408,409],[409,304],[310,415],[415,407],[407,310],[270,409],[409,410],[410,270],[450,348],[348,347],[347,450],[422,430],[430,434],[434,422],[313,314],[314,17],[17,313],[306,307],[307,375],[375,306],[387,388],[388,260],[260,387],[286,414],[414,398],[398,286],[335,406],[406,418],[418,335],[364,367],[367,416],[416,364],[423,358],[358,327],[327,423],[251,284],[284,298],[298,251],[281,5],[5,4],[4,281],[373,374],[374,253],[253,373],[307,320],[320,321],[321,307],[425,427],[427,411],[411,425],[421,313],[313,18],[18,421],[321,405],[405,406],[406,321],[320,404],[404,405],[405,320],[315,16],[16,17],[17,315],[426,425],[425,266],[266,426],[377,400],[400,369],[369,377],[322,391],[391,269],[269,322],[417,465],[465,464],[464,417],[386,257],[257,258],[258,386],[466,260],[260,388],[388,466],[456,399],[399,419],[419,456],[284,332],[332,333],[333,284],[417,285],[285,8],[8,417],[346,340],[340,261],[261,346],[413,441],[441,285],[285,413],[327,460],[460,328],[328,327],[355,371],[371,329],[329,355],[392,439],[439,438],[438,392],[382,341],[341,256],[256,382],[429,420],[420,360],[360,429],[364,394],[394,379],[379,364],[277,343],[343,437],[437,277],[443,444],[444,283],[283,443],[275,440],[440,363],[363,275],[431,262],[262,369],[369,431],[297,338],[338,337],[337,297],[273,375],[375,321],[321,273],[450,451],[451,349],[349,450],[446,342],[342,467],[467,446],[293,334],[334,282],[282,293],[458,461],[461,462],[462,458],[276,353],[353,383],[383,276],[308,324],[324,325],[325,308],[276,300],[300,293],[293,276],[372,345],[345,447],[447,372],[352,345],[345,340],[340,352],[274,1],[1,19],[19,274],[456,248],[248,281],[281,456],[436,427],[427,425],[425,436],[381,256],[256,252],[252,381],[269,391],[391,393],[393,269],[200,199],[199,428],[428,200],[266,330],[330,329],[329,266],[287,273],[273,422],[422,287],[250,462],[462,328],[328,250],[258,286],[286,384],[384,258],[265,353],[353,342],[342,265],[387,259],[259,257],[257,387],[424,431],[431,430],[430,424],[342,353],[353,276],[276,342],[273,335],[335,424],[424,273],[292,325],[325,307],[307,292],[366,447],[447,345],[345,366],[271,303],[303,302],[302,271],[423,266],[266,371],[371,423],[294,455],[455,460],[460,294],[279,278],[278,294],[294,279],[271,272],[272,304],[304,271],[432,434],[434,427],[427,432],[272,407],[407,408],[408,272],[394,430],[430,431],[431,394],[395,369],[369,400],[400,395],[334,333],[333,299],[299,334],[351,417],[417,168],[168,351],[352,280],[280,411],[411,352],[325,319],[319,320],[320,325],[295,296],[296,336],[336,295],[319,403],[403,404],[404,319],[330,348],[348,349],[349,330],[293,298],[298,333],[333,293],[323,454],[454,447],[447,323],[15,16],[16,315],[315,15],[358,429],[429,279],[279,358],[14,15],[15,316],[316,14],[285,336],[336,9],[9,285],[329,349],[349,350],[350,329],[374,380],[380,252],[252,374],[318,402],[402,403],[403,318],[6,197],[197,419],[419,6],[318,319],[319,325],[325,318],[367,364],[364,365],[365,367],[435,367],[367,397],[397,435],[344,438],[438,439],[439,344],[272,271],[271,311],[311,272],[195,5],[5,281],[281,195],[273,287],[287,291],[291,273],[396,428],[428,199],[199,396],[311,271],[271,268],[268,311],[283,444],[444,445],[445,283],[373,254],[254,339],[339,373],[282,334],[334,296],[296,282],[449,347],[347,346],[346,449],[264,447],[447,454],[454,264],[336,296],[296,299],[299,336],[338,10],[10,151],[151,338],[278,439],[439,455],[455,278],[292,407],[407,415],[415,292],[358,371],[371,355],[355,358],[340,345],[345,372],[372,340],[346,347],[347,280],[280,346],[442,443],[443,282],[282,442],[19,94],[94,370],[370,19],[441,442],[442,295],[295,441],[248,419],[419,197],[197,248],[263,255],[255,359],[359,263],[440,275],[275,274],[274,440],[300,383],[383,368],[368,300],[351,412],[412,465],[465,351],[263,467],[467,466],[466,263],[301,368],[368,389],[389,301],[395,378],[378,379],[379,395],[412,351],[351,419],[419,412],[436,426],[426,322],[322,436],[2,164],[164,393],[393,2],[370,462],[462,461],[461,370],[164,0],[0,267],[267,164],[302,11],[11,12],[12,302],[268,12],[12,13],[13,268],[293,300],[300,301],[301,293],[446,261],[261,340],[340,446],[330,266],[266,425],[425,330],[426,423],[423,391],[391,426],[429,355],[355,437],[437,429],[391,327],[327,326],[326,391],[440,457],[457,438],[438,440],[341,382],[382,362],[362,341],[459,457],[457,461],[461,459],[434,430],[430,394],[394,434],[414,463],[463,362],[362,414],[396,369],[369,262],[262,396],[354,461],[461,457],[457,354],[316,403],[403,402],[402,316],[315,404],[404,403],[403,315],[314,405],[405,404],[404,314],[313,406],[406,405],[405,313],[421,418],[418,406],[406,421],[366,401],[401,361],[361,366],[306,408],[408,407],[407,306],[291,409],[409,408],[408,291],[287,410],[410,409],[409,287],[432,436],[436,410],[410,432],[434,416],[416,411],[411,434],[264,368],[368,383],[383,264],[309,438],[438,457],[457,309],[352,376],[376,401],[401,352],[274,275],[275,4],[4,274],[421,428],[428,262],[262,421],[294,327],[327,358],[358,294],[433,416],[416,367],[367,433],[289,455],[455,439],[439,289],[462,370],[370,326],[326,462],[2,326],[326,370],[370,2],[305,460],[460,455],[455,305],[254,449],[449,448],[448,254],[255,261],[261,446],[446,255],[253,450],[450,449],[449,253],[252,451],[451,450],[450,252],[256,452],[452,451],[451,256],[341,453],[453,452],[452,341],[413,464],[464,463],[463,413],[441,413],[413,414],[414,441],[258,442],[442,441],[441,258],[257,443],[443,442],[442,257],[259,444],[444,443],[443,259],[260,445],[445,444],[444,260],[467,342],[342,445],[445,467],[459,458],[458,250],[250,459],[289,392],[392,290],[290,289],[290,328],[328,460],[460,290],[376,433],[433,435],[435,376],[250,290],[290,392],[392,250],[411,416],[416,433],[433,411],[341,463],[463,464],[464,341],[453,464],[464,465],[465,453],[357,465],[465,412],[412,357],[343,412],[412,399],[399,343],[360,363],[363,440],[440,360],[437,399],[399,456],[456,437],[420,456],[456,363],[363,420],[401,435],[435,288],[288,401],[372,383],[383,353],[353,372],[339,255],[255,249],[249,339],[448,261],[261,255],[255,448],[133,243],[243,190],[190,133],[133,155],[155,112],[112,133],[33,246],[246,247],[247,33],[33,130],[130,25],[25,33],[398,384],[384,286],[286,398],[362,398],[398,414],[414,362],[362,463],[463,341],[341,362],[263,359],[359,467],[467,263],[263,249],[249,255],[255,263],[466,467],[467,260],[260,466],[75,60],[60,166],[166,75],[238,239],[239,79],[79,238],[162,127],[127,139],[139,162],[72,11],[11,37],[37,72],[121,232],[232,120],[120,121],[73,72],[72,39],[39,73],[114,128],[128,47],[47,114],[233,232],[232,128],[128,233],[103,104],[104,67],[67,103],[152,175],[175,148],[148,152],[119,118],[118,101],[101,119],[74,73],[73,40],[40,74],[107,9],[9,108],[108,107],[49,48],[48,131],[131,49],[32,194],[194,211],[211,32],[184,74],[74,185],[185,184],[191,80],[80,183],[183,191],[185,40],[40,186],[186,185],[119,230],[230,118],[118,119],[210,202],[202,214],[214,210],[84,83],[83,17],[17,84],[77,76],[76,146],[146,77],[161,160],[160,30],[30,161],[190,56],[56,173],[173,190],[182,106],[106,194],[194,182],[138,135],[135,192],[192,138],[129,203],[203,98],[98,129],[54,21],[21,68],[68,54],[5,51],[51,4],[4,5],[145,144],[144,23],[23,145],[90,77],[77,91],[91,90],[207,205],[205,187],[187,207],[83,201],[201,18],[18,83],[181,91],[91,182],[182,181],[180,90],[90,181],[181,180],[16,85],[85,17],[17,16],[205,206],[206,36],[36,205],[176,148],[148,140],[140,176],[165,92],[92,39],[39,165],[245,193],[193,244],[244,245],[27,159],[159,28],[28,27],[30,247],[247,161],[161,30],[174,236],[236,196],[196,174],[103,54],[54,104],[104,103],[55,193],[193,8],[8,55],[111,117],[117,31],[31,111],[221,189],[189,55],[55,221],[240,98],[98,99],[99,240],[142,126],[126,100],[100,142],[219,166],[166,218],[218,219],[112,155],[155,26],[26,112],[198,209],[209,131],[131,198],[169,135],[135,150],[150,169],[114,47],[47,217],[217,114],[224,223],[223,53],[53,224],[220,45],[45,134],[134,220],[32,211],[211,140],[140,32],[109,67],[67,108],[108,109],[146,43],[43,91],[91,146],[231,230],[230,120],[120,231],[113,226],[226,247],[247,113],[105,63],[63,52],[52,105],[241,238],[238,242],[242,241],[124,46],[46,156],[156,124],[95,78],[78,96],[96,95],[70,46],[46,63],[63,70],[116,143],[143,227],[227,116],[116,123],[123,111],[111,116],[1,44],[44,19],[19,1],[3,236],[236,51],[51,3],[207,216],[216,205],[205,207],[26,154],[154,22],[22,26],[165,39],[39,167],[167,165],[199,200],[200,208],[208,199],[101,36],[36,100],[100,101],[43,57],[57,202],[202,43],[242,20],[20,99],[99,242],[56,28],[28,157],[157,56],[124,35],[35,113],[113,124],[29,160],[160,27],[27,29],[211,204],[204,210],[210,211],[124,113],[113,46],[46,124],[106,43],[43,204],[204,106],[96,62],[62,77],[77,96],[227,137],[137,116],[116,227],[73,41],[41,72],[72,73],[36,203],[203,142],[142,36],[235,64],[64,240],[240,235],[48,49],[49,64],[64,48],[42,41],[41,74],[74,42],[214,212],[212,207],[207,214],[183,42],[42,184],[184,183],[210,169],[169,211],[211,210],[140,170],[170,176],[176,140],[104,105],[105,69],[69,104],[193,122],[122,168],[168,193],[50,123],[123,187],[187,50],[89,96],[96,90],[90,89],[66,65],[65,107],[107,66],[179,89],[89,180],[180,179],[119,101],[101,120],[120,119],[68,63],[63,104],[104,68],[234,93],[93,227],[227,234],[16,15],[15,85],[85,16],[209,129],[129,49],[49,209],[15,14],[14,86],[86,15],[107,55],[55,9],[9,107],[120,100],[100,121],[121,120],[153,145],[145,22],[22,153],[178,88],[88,179],[179,178],[197,6],[6,196],[196,197],[89,88],[88,96],[96,89],[135,138],[138,136],[136,135],[138,215],[215,172],[172,138],[218,115],[115,219],[219,218],[41,42],[42,81],[81,41],[5,195],[195,51],[51,5],[57,43],[43,61],[61,57],[208,171],[171,199],[199,208],[41,81],[81,38],[38,41],[224,53],[53,225],[225,224],[24,144],[144,110],[110,24],[105,52],[52,66],[66,105],[118,229],[229,117],[117,118],[227,34],[34,234],[234,227],[66,107],[107,69],[69,66],[10,109],[109,151],[151,10],[219,48],[48,235],[235,219],[183,62],[62,191],[191,183],[142,129],[129,126],[126,142],[116,111],[111,143],[143,116],[118,117],[117,50],[50,118],[223,222],[222,52],[52,223],[94,19],[19,141],[141,94],[222,221],[221,65],[65,222],[196,3],[3,197],[197,196],[45,220],[220,44],[44,45],[156,70],[70,139],[139,156],[188,122],[122,245],[245,188],[139,71],[71,162],[162,139],[149,170],[170,150],[150,149],[122,188],[188,196],[196,122],[206,216],[216,92],[92,206],[164,2],[2,167],[167,164],[242,141],[141,241],[241,242],[0,164],[164,37],[37,0],[11,72],[72,12],[12,11],[12,38],[38,13],[13,12],[70,63],[63,71],[71,70],[31,226],[226,111],[111,31],[36,101],[101,205],[205,36],[203,206],[206,165],[165,203],[126,209],[209,217],[217,126],[98,165],[165,97],[97,98],[237,220],[220,218],[218,237],[237,239],[239,241],[241,237],[210,214],[214,169],[169,210],[140,171],[171,32],[32,140],[241,125],[125,237],[237,241],[179,86],[86,178],[178,179],[180,85],[85,179],[179,180],[181,84],[84,180],[180,181],[182,83],[83,181],[181,182],[194,201],[201,182],[182,194],[177,137],[137,132],[132,177],[184,76],[76,183],[183,184],[185,61],[61,184],[184,185],[186,57],[57,185],[185,186],[216,212],[212,186],[186,216],[192,214],[214,187],[187,192],[139,34],[34,156],[156,139],[218,79],[79,237],[237,218],[147,123],[123,177],[177,147],[45,44],[44,4],[4,45],[208,201],[201,32],[32,208],[98,64],[64,129],[129,98],[192,213],[213,138],[138,192],[235,59],[59,219],[219,235],[141,242],[242,97],[97,141],[97,2],[2,141],[141,97],[240,75],[75,235],[235,240],[229,24],[24,228],[228,229],[31,25],[25,226],[226,31],[230,23],[23,229],[229,230],[231,22],[22,230],[230,231],[232,26],[26,231],[231,232],[233,112],[112,232],[232,233],[244,189],[189,243],[243,244],[189,221],[221,190],[190,189],[222,28],[28,221],[221,222],[223,27],[27,222],[222,223],[224,29],[29,223],[223,224],[225,30],[30,224],[224,225],[113,247],[247,225],[225,113],[99,60],[60,240],[240,99],[213,147],[147,215],[215,213],[60,20],[20,166],[166,60],[192,187],[187,213],[213,192],[243,112],[112,244],[244,243],[244,233],[233,245],[245,244],[245,128],[128,188],[188,245],[188,114],[114,174],[174,188],[134,131],[131,220],[220,134],[174,217],[217,236],[236,174],[236,198],[198,134],[134,236],[215,177],[177,58],[58,215],[156,143],[143,124],[124,156],[25,110],[110,7],[7,25],[31,228],[228,25],[25,31],[264,356],[356,368],[368,264],[0,11],[11,267],[267,0],[451,452],[452,349],[349,451],[267,302],[302,269],[269,267],[350,357],[357,277],[277,350],[350,452],[452,357],[357,350],[299,333],[333,297],[297,299],[396,175],[175,377],[377,396],[280,347],[347,330],[330,280],[269,303],[303,270],[270,269],[151,9],[9,337],[337,151],[344,278],[278,360],[360,344],[424,418],[418,431],[431,424],[270,304],[304,409],[409,270],[272,310],[310,407],[407,272],[322,270],[270,410],[410,322],[449,450],[450,347],[347,449],[432,422],[422,434],[434,432],[18,313],[313,17],[17,18],[291,306],[306,375],[375,291],[259,387],[387,260],[260,259],[424,335],[335,418],[418,424],[434,364],[364,416],[416,434],[391,423],[423,327],[327,391],[301,251],[251,298],[298,301],[275,281],[281,4],[4,275],[254,373],[373,253],[253,254],[375,307],[307,321],[321,375],[280,425],[425,411],[411,280],[200,421],[421,18],[18,200],[335,321],[321,406],[406,335],[321,320],[320,405],[405,321],[314,315],[315,17],[17,314],[423,426],[426,266],[266,423],[396,377],[377,369],[369,396],[270,322],[322,269],[269,270],[413,417],[417,464],[464,413],[385,386],[386,258],[258,385],[248,456],[456,419],[419,248],[298,284],[284,333],[333,298],[168,417],[417,8],[8,168],[448,346],[346,261],[261,448],[417,413],[413,285],[285,417],[326,327],[327,328],[328,326],[277,355],[355,329],[329,277],[309,392],[392,438],[438,309],[381,382],[382,256],[256,381],[279,429],[429,360],[360,279],[365,364],[364,379],[379,365],[355,277],[277,437],[437,355],[282,443],[443,283],[283,282],[281,275],[275,363],[363,281],[395,431],[431,369],[369,395],[299,297],[297,337],[337,299],[335,273],[273,321],[321,335],[348,450],[450,349],[349,348],[359,446],[446,467],[467,359],[283,293],[293,282],[282,283],[250,458],[458,462],[462,250],[300,276],[276,383],[383,300],[292,308],[308,325],[325,292],[283,276],[276,293],[293,283],[264,372],[372,447],[447,264],[346,352],[352,340],[340,346],[354,274],[274,19],[19,354],[363,456],[456,281],[281,363],[426,436],[436,425],[425,426],[380,381],[381,252],[252,380],[267,269],[269,393],[393,267],[421,200],[200,428],[428,421],[371,266],[266,329],[329,371],[432,287],[287,422],[422,432],[290,250],[250,328],[328,290],[385,258],[258,384],[384,385],[446,265],[265,342],[342,446],[386,387],[387,257],[257,386],[422,424],[424,430],[430,422],[445,342],[342,276],[276,445],[422,273],[273,424],[424,422],[306,292],[292,307],[307,306],[352,366],[366,345],[345,352],[268,271],[271,302],[302,268],[358,423],[423,371],[371,358],[327,294],[294,460],[460,327],[331,279],[279,294],[294,331],[303,271],[271,304],[304,303],[436,432],[432,427],[427,436],[304,272],[272,408],[408,304],[395,394],[394,431],[431,395],[378,395],[395,400],[400,378],[296,334],[334,299],[299,296],[6,351],[351,168],[168,6],[376,352],[352,411],[411,376],[307,325],[325,320],[320,307],[285,295],[295,336],[336,285],[320,319],[319,404],[404,320],[329,330],[330,349],[349,329],[334,293],[293,333],[333,334],[366,323],[323,447],[447,366],[316,15],[15,315],[315,316],[331,358],[358,279],[279,331],[317,14],[14,316],[316,317],[8,285],[285,9],[9,8],[277,329],[329,350],[350,277],[253,374],[374,252],[252,253],[319,318],[318,403],[403,319],[351,6],[6,419],[419,351],[324,318],[318,325],[325,324],[397,367],[367,365],[365,397],[288,435],[435,397],[397,288],[278,344],[344,439],[439,278],[310,272],[272,311],[311,310],[248,195],[195,281],[281,248],[375,273],[273,291],[291,375],[175,396],[396,199],[199,175],[312,311],[311,268],[268,312],[276,283],[283,445],[445,276],[390,373],[373,339],[339,390],[295,282],[282,296],[296,295],[448,449],[449,346],[346,448],[356,264],[264,454],[454,356],[337,336],[336,299],[299,337],[337,338],[338,151],[151,337],[294,278],[278,455],[455,294],[308,292],[292,415],[415,308],[429,358],[358,355],[355,429],[265,340],[340,372],[372,265],[352,346],[346,280],[280,352],[295,442],[442,282],[282,295],[354,19],[19,370],[370,354],[285,441],[441,295],[295,285],[195,248],[248,197],[197,195],[457,440],[440,274],[274,457],[301,300],[300,368],[368,301],[417,351],[351,465],[465,417],[251,301],[301,389],[389,251],[394,395],[395,379],[379,394],[399,412],[412,419],[419,399],[410,436],[436,322],[322,410],[326,2],[2,393],[393,326],[354,370],[370,461],[461,354],[393,164],[164,267],[267,393],[268,302],[302,12],[12,268],[312,268],[268,13],[13,312],[298,293],[293,301],[301,298],[265,446],[446,340],[340,265],[280,330],[330,425],[425,280],[322,426],[426,391],[391,322],[420,429],[429,437],[437,420],[393,391],[391,326],[326,393],[344,440],[440,438],[438,344],[458,459],[459,461],[461,458],[364,434],[434,394],[394,364],[428,396],[396,262],[262,428],[274,354],[354,457],[457,274],[317,316],[316,402],[402,317],[316,315],[315,403],[403,316],[315,314],[314,404],[404,315],[314,313],[313,405],[405,314],[313,421],[421,406],[406,313],[323,366],[366,361],[361,323],[292,306],[306,407],[407,292],[306,291],[291,408],[408,306],[291,287],[287,409],[409,291],[287,432],[432,410],[410,287],[427,434],[434,411],[411,427],[372,264],[264,383],[383,372],[459,309],[309,457],[457,459],[366,352],[352,401],[401,366],[1,274],[274,4],[4,1],[418,421],[421,262],[262,418],[331,294],[294,358],[358,331],[435,433],[433,367],[367,435],[392,289],[289,439],[439,392],[328,462],[462,326],[326,328],[94,2],[2,370],[370,94],[289,305],[305,455],[455,289],[339,254],[254,448],[448,339],[359,255],[255,446],[446,359],[254,253],[253,449],[449,254],[253,252],[252,450],[450,253],[252,256],[256,451],[451,252],[256,341],[341,452],[452,256],[414,413],[413,463],[463,414],[286,441],[441,414],[414,286],[286,258],[258,441],[441,286],[258,257],[257,442],[442,258],[257,259],[259,443],[443,257],[259,260],[260,444],[444,259],[260,467],[467,445],[445,260],[309,459],[459,250],[250,309],[305,289],[289,290],[290,305],[305,290],[290,460],[460,305],[401,376],[376,435],[435,401],[309,250],[250,392],[392,309],[376,411],[411,433],[433,376],[453,341],[341,464],[464,453],[357,453],[453,465],[465,357],[343,357],[357,412],[412,343],[437,343],[343,399],[399,437],[344,360],[360,440],[440,344],[420,437],[437,456],[456,420],[360,420],[420,363],[363,360],[361,401],[401,288],[288,361],[265,372],[372,353],[353,265],[390,339],[339,249],[249,390],[339,448],[448,255],[255,339]);function fu(e){e.l={faceLandmarks:[],faceBlendshapes:[],facialTransformationMatrixes:[]}}var X=class extends eu{constructor(e,t){super(new Yl(e,t),`image_in`,`norm_rect`,!1),this.l={faceLandmarks:[],faceBlendshapes:[],facialTransformationMatrixes:[]},this.outputFacialTransformationMatrixes=this.outputFaceBlendshapes=!1,S(e=this.h=new ds,0,1,t=new H),this.B=new us,S(this.h,0,3,this.B),this.u=new os,S(this.h,0,2,this.u),yr(this.u,4,1),w(this.u,2,.5),w(this.B,2,.5),w(this.h,4,.5)}C(){return`FaceLandmarker`}get baseOptions(){return x(this.h,H,1)}set baseOptions(e){S(this.h,0,1,e)}v(e){return`numFaces`in e&&yr(this.u,4,e.numFaces??1),`minFaceDetectionConfidence`in e&&w(this.u,2,e.minFaceDetectionConfidence??.5),`minTrackingConfidence`in e&&w(this.h,4,e.minTrackingConfidence??.5),`minFacePresenceConfidence`in e&&w(this.B,2,e.minFacePresenceConfidence??.5),`outputFaceBlendshapes`in e&&(this.outputFaceBlendshapes=!!e.outputFaceBlendshapes),`outputFacialTransformationMatrixes`in e&&(this.outputFacialTransformationMatrixes=!!e.outputFacialTransformationMatrixes),this.j(e)}G(e,t){return fu(this),Zl(this,e,t),this.l}H(e,t,n){return fu(this),Ql(this,e,n,t),this.l}o(){var e=new Eo;B(e,`image_in`),B(e,`norm_rect`),V(e,`face_landmarks`);var t=new yo;Ui(t,ps,this.h);var n=new xo;Cr(n,2,`mediapipe.tasks.vision.face_landmarker.FaceLandmarkerGraph`),R(n,`IMAGE:image_in`),R(n,`NORM_RECT:norm_rect`),z(n,`NORM_LANDMARKS:face_landmarks`),n.v(t),To(e,n),this.g.attachProtoVectorListener(`face_landmarks`,(e,t)=>{for(let t of e)e=Bo(t),this.l.faceLandmarks.push(sc(e));G(this,t)}),this.g.attachEmptyPacketListener(`face_landmarks`,e=>{G(this,e)}),this.outputFaceBlendshapes&&(V(e,`blendshapes`),z(n,`BLENDSHAPES:blendshapes`),this.g.attachProtoVectorListener(`blendshapes`,(e,t)=>{if(this.outputFaceBlendshapes)for(let t of e)e=Mo(t),this.l.faceBlendshapes.push(ic(e.g()??[]));G(this,t)}),this.g.attachEmptyPacketListener(`blendshapes`,e=>{G(this,e)})),this.outputFacialTransformationMatrixes&&(V(e,`face_geometry`),z(n,`FACE_GEOMETRY:face_geometry`),this.g.attachProtoVectorListener(`face_geometry`,(e,t)=>{if(this.outputFacialTransformationMatrixes)for(let t of e)(e=x(e=ls(t),Vo,2))&&this.l.facialTransformationMatrixes.push({rows:gr(e,1)??0??0,columns:gr(e,2)??0??0,data:Jn(e,3,Rt,qn()).slice()??[]});G(this,t)}),this.g.attachEmptyPacketListener(`face_geometry`,e=>{G(this,e)})),e=e.g(),this.setGraph(new Uint8Array(e),!0)}};X.prototype.detectForVideo=X.prototype.H,X.prototype.detect=X.prototype.G,X.prototype.setOptions=X.prototype.v,X.createFromModelPath=function(e,t){return Y(X,e,{baseOptions:{modelAssetPath:t}})},X.createFromModelBuffer=function(e,t){return Y(X,e,{baseOptions:{modelAssetBuffer:t}})},X.createFromOptions=function(e,t){return Y(X,e,t)},X.FACE_LANDMARKS_LIPS=nu,o(`module$exports$google3$third_party$mediapipe$tasks$web$vision$face_landmarker$face_landmarker.FaceLandmarker.FACE_LANDMARKS_LIPS`,X.FACE_LANDMARKS_LIPS),X.FACE_LANDMARKS_LEFT_EYE=ru,o(`module$exports$google3$third_party$mediapipe$tasks$web$vision$face_landmarker$face_landmarker.FaceLandmarker.FACE_LANDMARKS_LEFT_EYE`,X.FACE_LANDMARKS_LEFT_EYE),X.FACE_LANDMARKS_LEFT_EYEBROW=iu,o(`module$exports$google3$third_party$mediapipe$tasks$web$vision$face_landmarker$face_landmarker.FaceLandmarker.FACE_LANDMARKS_LEFT_EYEBROW`,X.FACE_LANDMARKS_LEFT_EYEBROW),X.FACE_LANDMARKS_LEFT_IRIS=au,o(`module$exports$google3$third_party$mediapipe$tasks$web$vision$face_landmarker$face_landmarker.FaceLandmarker.FACE_LANDMARKS_LEFT_IRIS`,X.FACE_LANDMARKS_LEFT_IRIS),X.FACE_LANDMARKS_RIGHT_EYE=ou,o(`module$exports$google3$third_party$mediapipe$tasks$web$vision$face_landmarker$face_landmarker.FaceLandmarker.FACE_LANDMARKS_RIGHT_EYE`,X.FACE_LANDMARKS_RIGHT_EYE),X.FACE_LANDMARKS_RIGHT_EYEBROW=su,o(`module$exports$google3$third_party$mediapipe$tasks$web$vision$face_landmarker$face_landmarker.FaceLandmarker.FACE_LANDMARKS_RIGHT_EYEBROW`,X.FACE_LANDMARKS_RIGHT_EYEBROW),X.FACE_LANDMARKS_RIGHT_IRIS=cu,o(`module$exports$google3$third_party$mediapipe$tasks$web$vision$face_landmarker$face_landmarker.FaceLandmarker.FACE_LANDMARKS_RIGHT_IRIS`,X.FACE_LANDMARKS_RIGHT_IRIS),X.FACE_LANDMARKS_FACE_OVAL=lu,o(`module$exports$google3$third_party$mediapipe$tasks$web$vision$face_landmarker$face_landmarker.FaceLandmarker.FACE_LANDMARKS_FACE_OVAL`,X.FACE_LANDMARKS_FACE_OVAL),X.FACE_LANDMARKS_CONTOURS=uu,o(`module$exports$google3$third_party$mediapipe$tasks$web$vision$face_landmarker$face_landmarker.FaceLandmarker.FACE_LANDMARKS_CONTOURS`,X.FACE_LANDMARKS_CONTOURS),X.FACE_LANDMARKS_TESSELATION=du,o(`module$exports$google3$third_party$mediapipe$tasks$web$vision$face_landmarker$face_landmarker.FaceLandmarker.FACE_LANDMARKS_TESSELATION`,X.FACE_LANDMARKS_TESSELATION);var pu=Kl([0,1],[1,2],[2,3],[3,4],[0,5],[5,6],[6,7],[7,8],[5,9],[9,10],[10,11],[11,12],[9,13],[13,14],[14,15],[15,16],[13,17],[0,17],[17,18],[18,19],[19,20]);function mu(e){e.gestures=[],e.landmarks=[],e.worldLandmarks=[],e.handedness=[]}function hu(e){return e.gestures.length===0?{gestures:[],landmarks:[],worldLandmarks:[],handedness:[],handednesses:[]}:{gestures:e.gestures,landmarks:e.landmarks,worldLandmarks:e.worldLandmarks,handedness:e.handedness,handednesses:e.handedness}}function gu(e,t=!0){var n=[];for(let i of e){var r=Mo(i);e=[];for(let n of r.g())r=t&&gr(n,1)!=null?gr(n,1)??0:-1,e.push({score:C(n,2)??0,index:r,categoryName:_(v(n,3))??``??``,displayName:_(v(n,4))??``??``});n.push(e)}return n}var _u=class extends eu{constructor(e,t){super(new Yl(e,t),`image_in`,`norm_rect`,!1),this.gestures=[],this.landmarks=[],this.worldLandmarks=[],this.handedness=[],S(e=this.l=new bs,0,1,t=new H),this.u=new ys,S(this.l,0,2,this.u),this.F=new vs,S(this.u,0,3,this.F),this.B=new _s,S(this.u,0,2,this.B),this.h=new gs,S(this.l,0,3,this.h),w(this.B,2,.5),w(this.u,4,.5),w(this.F,2,.5)}C(){return`GestureRecognizer`}get baseOptions(){return x(this.l,H,1)}set baseOptions(e){S(this.l,0,1,e)}v(e){if(yr(this.B,3,e.numHands??1),`minHandDetectionConfidence`in e&&w(this.B,2,e.minHandDetectionConfidence??.5),`minTrackingConfidence`in e&&w(this.u,4,e.minTrackingConfidence??.5),`minHandPresenceConfidence`in e&&w(this.F,2,e.minHandPresenceConfidence??.5),e.cannedGesturesClassifierOptions){var t=new ms,n=t,r=nc(e.cannedGesturesClassifierOptions,x(this.h,ms,3)?.j());S(n,0,2,r),S(this.h,0,3,t)}else e.cannedGesturesClassifierOptions===void 0&&x(this.h,ms,3)?.g();return e.customGesturesClassifierOptions?(S(n=t=new ms,0,2,r=nc(e.customGesturesClassifierOptions,x(this.h,ms,4)?.j())),S(this.h,0,4,t)):e.customGesturesClassifierOptions===void 0&&x(this.h,ms,4)?.g(),this.j(e)}Xa(e,t){return mu(this),Zl(this,e,t),hu(this)}Ya(e,t,n){return mu(this),Ql(this,e,n,t),hu(this)}o(){var e=new Eo;B(e,`image_in`),B(e,`norm_rect`),V(e,`hand_gestures`),V(e,`hand_landmarks`),V(e,`world_hand_landmarks`),V(e,`handedness`);var t=new yo;Ui(t,Ts,this.l);var n=new xo;Cr(n,2,`mediapipe.tasks.vision.gesture_recognizer.GestureRecognizerGraph`),R(n,`IMAGE:image_in`),R(n,`NORM_RECT:norm_rect`),z(n,`HAND_GESTURES:hand_gestures`),z(n,`LANDMARKS:hand_landmarks`),z(n,`WORLD_LANDMARKS:world_hand_landmarks`),z(n,`HANDEDNESS:handedness`),n.v(t),To(e,n),this.g.attachProtoVectorListener(`hand_landmarks`,(e,t)=>{for(let t of e){e=Bo(t);let n=[];for(let t of ur(e,zo,1))n.push({x:C(t,1)??0,y:C(t,2)??0,z:C(t,3)??0,visibility:C(t,4)??0});this.landmarks.push(n)}G(this,t)}),this.g.attachEmptyPacketListener(`hand_landmarks`,e=>{G(this,e)}),this.g.attachProtoVectorListener(`world_hand_landmarks`,(e,t)=>{for(let t of e){e=Ro(t);let n=[];for(let t of ur(e,Lo,1))n.push({x:C(t,1)??0,y:C(t,2)??0,z:C(t,3)??0,visibility:C(t,4)??0});this.worldLandmarks.push(n)}G(this,t)}),this.g.attachEmptyPacketListener(`world_hand_landmarks`,e=>{G(this,e)}),this.g.attachProtoVectorListener(`hand_gestures`,(e,t)=>{this.gestures.push(...gu(e,!1)),G(this,t)}),this.g.attachEmptyPacketListener(`hand_gestures`,e=>{G(this,e)}),this.g.attachProtoVectorListener(`handedness`,(e,t)=>{this.handedness.push(...gu(e)),G(this,t)}),this.g.attachEmptyPacketListener(`handedness`,e=>{G(this,e)}),e=e.g(),this.setGraph(new Uint8Array(e),!0)}};function vu(e){return{landmarks:e.landmarks,worldLandmarks:e.worldLandmarks,handednesses:e.handedness,handedness:e.handedness}}_u.prototype.recognizeForVideo=_u.prototype.Ya,_u.prototype.recognize=_u.prototype.Xa,_u.prototype.setOptions=_u.prototype.v,_u.createFromModelPath=function(e,t){return Y(_u,e,{baseOptions:{modelAssetPath:t}})},_u.createFromModelBuffer=function(e,t){return Y(_u,e,{baseOptions:{modelAssetBuffer:t}})},_u.createFromOptions=function(e,t){return Y(_u,e,t)},_u.HAND_CONNECTIONS=pu,o(`module$exports$google3$third_party$mediapipe$tasks$web$vision$gesture_recognizer$gesture_recognizer.GestureRecognizer.HAND_CONNECTIONS`,_u.HAND_CONNECTIONS);var Z=class extends eu{constructor(e,t){super(new Yl(e,t),`image_in`,`norm_rect`,!1),this.landmarks=[],this.worldLandmarks=[],this.handedness=[],S(e=this.h=new ys,0,1,t=new H),this.u=new vs,S(this.h,0,3,this.u),this.l=new _s,S(this.h,0,2,this.l),yr(this.l,3,1),w(this.l,2,.5),w(this.u,2,.5),w(this.h,4,.5)}C(){return`HandLandmarker`}get baseOptions(){return x(this.h,H,1)}set baseOptions(e){S(this.h,0,1,e)}v(e){return`numHands`in e&&yr(this.l,3,e.numHands??1),`minHandDetectionConfidence`in e&&w(this.l,2,e.minHandDetectionConfidence??.5),`minTrackingConfidence`in e&&w(this.h,4,e.minTrackingConfidence??.5),`minHandPresenceConfidence`in e&&w(this.u,2,e.minHandPresenceConfidence??.5),this.j(e)}G(e,t){return this.landmarks=[],this.worldLandmarks=[],this.handedness=[],Zl(this,e,t),vu(this)}H(e,t,n){return this.landmarks=[],this.worldLandmarks=[],this.handedness=[],Ql(this,e,n,t),vu(this)}o(){var e=new Eo;B(e,`image_in`),B(e,`norm_rect`),V(e,`hand_landmarks`),V(e,`world_hand_landmarks`),V(e,`handedness`);var t=new yo;Ui(t,Es,this.h);var n=new xo;Cr(n,2,`mediapipe.tasks.vision.hand_landmarker.HandLandmarkerGraph`),R(n,`IMAGE:image_in`),R(n,`NORM_RECT:norm_rect`),z(n,`LANDMARKS:hand_landmarks`),z(n,`WORLD_LANDMARKS:world_hand_landmarks`),z(n,`HANDEDNESS:handedness`),n.v(t),To(e,n),this.g.attachProtoVectorListener(`hand_landmarks`,(e,t)=>{for(let t of e)e=Bo(t),this.landmarks.push(sc(e));G(this,t)}),this.g.attachEmptyPacketListener(`hand_landmarks`,e=>{G(this,e)}),this.g.attachProtoVectorListener(`world_hand_landmarks`,(e,t)=>{for(let t of e)e=Ro(t),this.worldLandmarks.push(cc(e));G(this,t)}),this.g.attachEmptyPacketListener(`world_hand_landmarks`,e=>{G(this,e)}),this.g.attachProtoVectorListener(`handedness`,(e,t)=>{var n=this.handedness,r=n.push,i=[];for(let t of e){e=Mo(t);let n=[];for(let t of e.g())n.push({score:C(t,2)??0,index:gr(t,1)??0??-1,categoryName:_(v(t,3))??``??``,displayName:_(v(t,4))??``??``});i.push(n)}r.call(n,...i),G(this,t)}),this.g.attachEmptyPacketListener(`handedness`,e=>{G(this,e)}),e=e.g(),this.setGraph(new Uint8Array(e),!0)}};Z.prototype.detectForVideo=Z.prototype.H,Z.prototype.detect=Z.prototype.G,Z.prototype.setOptions=Z.prototype.v,Z.createFromModelPath=function(e,t){return Y(Z,e,{baseOptions:{modelAssetPath:t}})},Z.createFromModelBuffer=function(e,t){return Y(Z,e,{baseOptions:{modelAssetBuffer:t}})},Z.createFromOptions=function(e,t){return Y(Z,e,t)},Z.HAND_CONNECTIONS=pu,o(`module$exports$google3$third_party$mediapipe$tasks$web$vision$hand_landmarker$hand_landmarker.HandLandmarker.HAND_CONNECTIONS`,Z.HAND_CONNECTIONS);var yu=Kl([0,1],[1,2],[2,3],[3,7],[0,4],[4,5],[5,6],[6,8],[9,10],[11,12],[11,13],[13,15],[15,17],[15,19],[15,21],[17,19],[12,14],[14,16],[16,18],[16,20],[16,22],[18,20],[11,23],[12,24],[23,24],[23,25],[24,26],[25,27],[26,28],[27,29],[28,30],[29,31],[30,32],[27,31],[28,32]);function bu(e){e.h={faceLandmarks:[],faceBlendshapes:[],poseLandmarks:[],poseWorldLandmarks:[],poseSegmentationMasks:[],leftHandLandmarks:[],leftHandWorldLandmarks:[],rightHandLandmarks:[],rightHandWorldLandmarks:[]}}function xu(e){try{if(!e.F)return e.h;e.F(e.h)}finally{il(e)}}function Su(e,t){e=Bo(e),t.push(sc(e))}var Q=class extends eu{constructor(e,t){super(new Yl(e,t),`input_frames_image`,null,!1),this.h={faceLandmarks:[],faceBlendshapes:[],poseLandmarks:[],poseWorldLandmarks:[],poseSegmentationMasks:[],leftHandLandmarks:[],leftHandWorldLandmarks:[],rightHandLandmarks:[],rightHandWorldLandmarks:[]},this.outputPoseSegmentationMasks=this.outputFaceBlendshapes=!1,S(e=this.l=new As,0,1,t=new H),this.Y=new vs,S(this.l,0,2,this.Y),this.Aa=new Ds,S(this.l,0,3,this.Aa),this.u=new os,S(this.l,0,4,this.u),this.O=new us,S(this.l,0,5,this.O),this.B=new Os,S(this.l,0,6,this.B),this.Z=new ks,S(this.l,0,7,this.Z),w(this.u,2,.5),w(this.u,3,.3),w(this.O,2,.5),w(this.B,2,.5),w(this.B,3,.3),w(this.Z,2,.5),w(this.Y,2,.5)}C(){return`HolisticLandmarker`}get baseOptions(){return x(this.l,H,1)}set baseOptions(e){S(this.l,0,1,e)}v(e){return`minFaceDetectionConfidence`in e&&w(this.u,2,e.minFaceDetectionConfidence??.5),`minFaceSuppressionThreshold`in e&&w(this.u,3,e.minFaceSuppressionThreshold??.3),`minFacePresenceConfidence`in e&&w(this.O,2,e.minFacePresenceConfidence??.5),`outputFaceBlendshapes`in e&&(this.outputFaceBlendshapes=!!e.outputFaceBlendshapes),`minPoseDetectionConfidence`in e&&w(this.B,2,e.minPoseDetectionConfidence??.5),`minPoseSuppressionThreshold`in e&&w(this.B,3,e.minPoseSuppressionThreshold??.3),`minPosePresenceConfidence`in e&&w(this.Z,2,e.minPosePresenceConfidence??.5),`outputPoseSegmentationMasks`in e&&(this.outputPoseSegmentationMasks=!!e.outputPoseSegmentationMasks),`minHandLandmarksConfidence`in e&&w(this.Y,2,e.minHandLandmarksConfidence??.5),this.j(e)}G(e,t,n){var r=typeof t==`function`?{}:t;return this.F=typeof t==`function`?t:n,bu(this),Zl(this,e,r),xu(this)}H(e,t,n,r){var i=typeof n==`function`?{}:n;return this.F=typeof n==`function`?n:r,bu(this),Ql(this,e,i,t),xu(this)}o(){var e=new Eo;B(e,`input_frames_image`),V(e,`pose_landmarks`),V(e,`pose_world_landmarks`),V(e,`face_landmarks`),V(e,`left_hand_landmarks`),V(e,`left_hand_world_landmarks`),V(e,`right_hand_landmarks`),V(e,`right_hand_world_landmarks`);var t=new yo,n=new ao;Cr(n,1,`type.googleapis.com/mediapipe.tasks.vision.holistic_landmarker.proto.HolisticLandmarkerGraphOptions`),function(e,t){if(t!=null){if(Array.isArray(t))y(e,2,Dn(t,0,kn));else{if(!(typeof t==`string`||t instanceof Te||be(t)))throw Error(`invalid value in Any.value field: `+t+` expected a ByteString, a base64 encoded string, a Uint8Array or a jspb array`);tr(e,2,et(t,!1),Se())}}}(n,this.l.g());var r=new xo;Cr(r,2,`mediapipe.tasks.vision.holistic_landmarker.HolisticLandmarkerGraph`),hr(r,8,ao,n),R(r,`IMAGE:input_frames_image`),z(r,`POSE_LANDMARKS:pose_landmarks`),z(r,`POSE_WORLD_LANDMARKS:pose_world_landmarks`),z(r,`FACE_LANDMARKS:face_landmarks`),z(r,`LEFT_HAND_LANDMARKS:left_hand_landmarks`),z(r,`LEFT_HAND_WORLD_LANDMARKS:left_hand_world_landmarks`),z(r,`RIGHT_HAND_LANDMARKS:right_hand_landmarks`),z(r,`RIGHT_HAND_WORLD_LANDMARKS:right_hand_world_landmarks`),r.v(t),To(e,r),nl(this,e),this.g.attachProtoListener(`pose_landmarks`,(e,t)=>{Su(e,this.h.poseLandmarks),G(this,t)}),this.g.attachEmptyPacketListener(`pose_landmarks`,e=>{G(this,e)}),this.g.attachProtoListener(`pose_world_landmarks`,(e,t)=>{var n=this.h.poseWorldLandmarks;e=Ro(e),n.push(cc(e)),G(this,t)}),this.g.attachEmptyPacketListener(`pose_world_landmarks`,e=>{G(this,e)}),this.outputPoseSegmentationMasks&&(z(r,`POSE_SEGMENTATION_MASK:pose_segmentation_mask`),rl(this,`pose_segmentation_mask`),this.g.ga(`pose_segmentation_mask`,(e,t)=>{this.h.poseSegmentationMasks=[$l(this,e,!0,!this.F)],G(this,t)}),this.g.attachEmptyPacketListener(`pose_segmentation_mask`,e=>{this.h.poseSegmentationMasks=[],G(this,e)})),this.g.attachProtoListener(`face_landmarks`,(e,t)=>{Su(e,this.h.faceLandmarks),G(this,t)}),this.g.attachEmptyPacketListener(`face_landmarks`,e=>{G(this,e)}),this.outputFaceBlendshapes&&(V(e,`extra_blendshapes`),z(r,`FACE_BLENDSHAPES:extra_blendshapes`),this.g.attachProtoListener(`extra_blendshapes`,(e,t)=>{var n=this.h.faceBlendshapes;this.outputFaceBlendshapes&&(e=Mo(e),n.push(ic(e.g()??[]))),G(this,t)}),this.g.attachEmptyPacketListener(`extra_blendshapes`,e=>{G(this,e)})),this.g.attachProtoListener(`left_hand_landmarks`,(e,t)=>{Su(e,this.h.leftHandLandmarks),G(this,t)}),this.g.attachEmptyPacketListener(`left_hand_landmarks`,e=>{G(this,e)}),this.g.attachProtoListener(`left_hand_world_landmarks`,(e,t)=>{var n=this.h.leftHandWorldLandmarks;e=Ro(e),n.push(cc(e)),G(this,t)}),this.g.attachEmptyPacketListener(`left_hand_world_landmarks`,e=>{G(this,e)}),this.g.attachProtoListener(`right_hand_landmarks`,(e,t)=>{Su(e,this.h.rightHandLandmarks),G(this,t)}),this.g.attachEmptyPacketListener(`right_hand_landmarks`,e=>{G(this,e)}),this.g.attachProtoListener(`right_hand_world_landmarks`,(e,t)=>{var n=this.h.rightHandWorldLandmarks;e=Ro(e),n.push(cc(e)),G(this,t)}),this.g.attachEmptyPacketListener(`right_hand_world_landmarks`,e=>{G(this,e)}),e=e.g(),this.setGraph(new Uint8Array(e),!0)}};Q.prototype.detectForVideo=Q.prototype.H,Q.prototype.detect=Q.prototype.G,Q.prototype.setOptions=Q.prototype.v,Q.createFromModelPath=function(e,t){return Y(Q,e,{baseOptions:{modelAssetPath:t}})},Q.createFromModelBuffer=function(e,t){return Y(Q,e,{baseOptions:{modelAssetBuffer:t}})},Q.createFromOptions=function(e,t){return Y(Q,e,t)},Q.HAND_CONNECTIONS=pu,o(`module$exports$google3$third_party$mediapipe$tasks$web$vision$holistic_landmarker$holistic_landmarker.HolisticLandmarker.HAND_CONNECTIONS`,Q.HAND_CONNECTIONS),Q.POSE_CONNECTIONS=yu,o(`module$exports$google3$third_party$mediapipe$tasks$web$vision$holistic_landmarker$holistic_landmarker.HolisticLandmarker.POSE_CONNECTIONS`,Q.POSE_CONNECTIONS),Q.FACE_LANDMARKS_LIPS=nu,o(`module$exports$google3$third_party$mediapipe$tasks$web$vision$holistic_landmarker$holistic_landmarker.HolisticLandmarker.FACE_LANDMARKS_LIPS`,Q.FACE_LANDMARKS_LIPS),Q.FACE_LANDMARKS_LEFT_EYE=ru,o(`module$exports$google3$third_party$mediapipe$tasks$web$vision$holistic_landmarker$holistic_landmarker.HolisticLandmarker.FACE_LANDMARKS_LEFT_EYE`,Q.FACE_LANDMARKS_LEFT_EYE),Q.FACE_LANDMARKS_LEFT_EYEBROW=iu,o(`module$exports$google3$third_party$mediapipe$tasks$web$vision$holistic_landmarker$holistic_landmarker.HolisticLandmarker.FACE_LANDMARKS_LEFT_EYEBROW`,Q.FACE_LANDMARKS_LEFT_EYEBROW),Q.FACE_LANDMARKS_LEFT_IRIS=au,o(`module$exports$google3$third_party$mediapipe$tasks$web$vision$holistic_landmarker$holistic_landmarker.HolisticLandmarker.FACE_LANDMARKS_LEFT_IRIS`,Q.FACE_LANDMARKS_LEFT_IRIS),Q.FACE_LANDMARKS_RIGHT_EYE=ou,o(`module$exports$google3$third_party$mediapipe$tasks$web$vision$holistic_landmarker$holistic_landmarker.HolisticLandmarker.FACE_LANDMARKS_RIGHT_EYE`,Q.FACE_LANDMARKS_RIGHT_EYE),Q.FACE_LANDMARKS_RIGHT_EYEBROW=su,o(`module$exports$google3$third_party$mediapipe$tasks$web$vision$holistic_landmarker$holistic_landmarker.HolisticLandmarker.FACE_LANDMARKS_RIGHT_EYEBROW`,Q.FACE_LANDMARKS_RIGHT_EYEBROW),Q.FACE_LANDMARKS_RIGHT_IRIS=cu,o(`module$exports$google3$third_party$mediapipe$tasks$web$vision$holistic_landmarker$holistic_landmarker.HolisticLandmarker.FACE_LANDMARKS_RIGHT_IRIS`,Q.FACE_LANDMARKS_RIGHT_IRIS),Q.FACE_LANDMARKS_FACE_OVAL=lu,o(`module$exports$google3$third_party$mediapipe$tasks$web$vision$holistic_landmarker$holistic_landmarker.HolisticLandmarker.FACE_LANDMARKS_FACE_OVAL`,Q.FACE_LANDMARKS_FACE_OVAL),Q.FACE_LANDMARKS_CONTOURS=uu,o(`module$exports$google3$third_party$mediapipe$tasks$web$vision$holistic_landmarker$holistic_landmarker.HolisticLandmarker.FACE_LANDMARKS_CONTOURS`,Q.FACE_LANDMARKS_CONTOURS),Q.FACE_LANDMARKS_TESSELATION=du,o(`module$exports$google3$third_party$mediapipe$tasks$web$vision$holistic_landmarker$holistic_landmarker.HolisticLandmarker.FACE_LANDMARKS_TESSELATION`,Q.FACE_LANDMARKS_TESSELATION);var Cu=class extends eu{constructor(e,t){super(new Yl(e,t),`input_image`,`norm_rect`,!0),this.l={classifications:[]},S(e=this.h=new Ns,0,1,t=new H)}C(){return`ImageClassifier`}get baseOptions(){return x(this.h,H,1)}set baseOptions(e){S(this.h,0,1,e)}v(e){return S(this.h,0,2,nc(e,x(this.h,Zo,2))),this.j(e)}Ga(e,t){return this.l={classifications:[]},Zl(this,e,t),this.l}Ha(e,t,n){return this.l={classifications:[]},Ql(this,e,n,t),this.l}o(){var e=new Eo;B(e,`input_image`),B(e,`norm_rect`),V(e,`classifications`);var t=new yo;Ui(t,Ps,this.h);var n=new xo;Cr(n,2,`mediapipe.tasks.vision.image_classifier.ImageClassifierGraph`),R(n,`IMAGE:input_image`),R(n,`NORM_RECT:norm_rect`),z(n,`CLASSIFICATIONS:classifications`),n.v(t),To(e,n),this.g.attachProtoListener(`classifications`,(e,t)=>{this.l=ac(Go(e)),G(this,t)}),this.g.attachEmptyPacketListener(`classifications`,e=>{G(this,e)}),e=e.g(),this.setGraph(new Uint8Array(e),!0)}};Cu.prototype.classifyForVideo=Cu.prototype.Ha,Cu.prototype.classify=Cu.prototype.Ga,Cu.prototype.setOptions=Cu.prototype.v,Cu.createFromModelPath=function(e,t){return Y(Cu,e,{baseOptions:{modelAssetPath:t}})},Cu.createFromModelBuffer=function(e,t){return Y(Cu,e,{baseOptions:{modelAssetBuffer:t}})},Cu.createFromOptions=function(e,t){return Y(Cu,e,t)};var wu=class extends eu{constructor(e,t){super(new Yl(e,t),`image_in`,`norm_rect`,!0),this.h=new Fs,this.embeddings={embeddings:[]},S(e=this.h,0,1,t=new H)}C(){return`ImageEmbedder`}get baseOptions(){return x(this.h,H,1)}set baseOptions(e){S(this.h,0,1,e)}v(e){var t=this.h,n=x(this.h,$o,2);if(n=n?n.clone():new $o,e.l2Normalize!==void 0){var r=e.l2Normalize;y(n,1,r==null?r:zt(r))}else`l2Normalize`in e&&y(n,1);return e.quantize===void 0?`quantize`in e&&y(n,2):y(n,2,(r=e.quantize)==null?r:zt(r)),S(t,0,2,n),this.j(e)}Na(e,t){return Zl(this,e,t),this.embeddings}Oa(e,t,n){return Ql(this,e,n,t),this.embeddings}o(){var e=new Eo;B(e,`image_in`),B(e,`norm_rect`),V(e,`embeddings_out`);var t=new yo;Ui(t,Is,this.h);var n=new xo;Cr(n,2,`mediapipe.tasks.vision.image_embedder.ImageEmbedderGraph`),R(n,`IMAGE:image_in`),R(n,`NORM_RECT:norm_rect`),z(n,`EMBEDDINGS:embeddings_out`),n.v(t),To(e,n),this.g.attachProtoListener(`embeddings_out`,(e,t)=>{e=Xo(e),this.embeddings=function(e){return{embeddings:ur(e,Jo,1).map(e=>{var t={headIndex:gr(e,3)??0??-1,headName:_(v(e,4))??``??``};if(Kn(e,Ko,1,Yo))e=Jn(e=_r(e,Ko,1),1,Rt,qn()),t.floatEmbedding=e.slice();else{let n=new Uint8Array;t.quantizedEmbedding=_r(e,qo,2)?.g()?.h()??n}return t}),timestampMs:rc(v(e,2,void 0,en)??Un)}}(e),G(this,t)}),this.g.attachEmptyPacketListener(`embeddings_out`,e=>{G(this,e)}),e=e.g(),this.setGraph(new Uint8Array(e),!0)}};wu.cosineSimilarity=function(e,t){if(e.floatEmbedding&&t.floatEmbedding)e=uc(e.floatEmbedding,t.floatEmbedding);else{if(!e.quantizedEmbedding||!t.quantizedEmbedding)throw Error(`Cannot compute cosine similarity between quantized and float embeddings.`);e=uc(lc(e.quantizedEmbedding),lc(t.quantizedEmbedding))}return e},wu.prototype.embedForVideo=wu.prototype.Oa,wu.prototype.embed=wu.prototype.Na,wu.prototype.setOptions=wu.prototype.v,wu.createFromModelPath=function(e,t){return Y(wu,e,{baseOptions:{modelAssetPath:t}})},wu.createFromModelBuffer=function(e,t){return Y(wu,e,{baseOptions:{modelAssetBuffer:t}})},wu.createFromOptions=function(e,t){return Y(wu,e,t)};var Tu=class{constructor(e,t,n){this.confidenceMasks=e,this.categoryMask=t,this.qualityScores=n}close(){this.confidenceMasks?.forEach(e=>{e.close()}),this.categoryMask?.close()}};function Eu(e){var t=function(e){return ur(e,xo,1)}(e.ja()).filter(e=>(_(v(e,1))??``).includes(`mediapipe.tasks.TensorsToSegmentationCalculator`));if(e.u=[],t.length>1)throw Error(`The graph has more than one mediapipe.tasks.TensorsToSegmentationCalculator.`);t.length===1&&(x(t[0],yo,7)?.o()?.g()??new Map).forEach((t,n)=>{e.u[Number(n)]=_(v(t,1))??``})}function Du(e){e.categoryMask=void 0,e.confidenceMasks=void 0,e.qualityScores=void 0}function Ou(e){try{let t=new Tu(e.confidenceMasks,e.categoryMask,e.qualityScores);if(!e.l)return t;e.l(t)}finally{il(e)}}Tu.prototype.close=Tu.prototype.close;var ku=class extends eu{constructor(e,t){super(new Yl(e,t),`image_in`,`norm_rect`,!1),this.u=[],this.outputCategoryMask=!1,this.outputConfidenceMasks=!0,this.h=new Vs,this.B=new Ls,S(this.h,0,3,this.B),S(e=this.h,0,1,t=new H)}C(){return`ImageSegmenter`}get baseOptions(){return x(this.h,H,1)}set baseOptions(e){S(this.h,0,1,e)}v(e){return e.displayNamesLocale===void 0?`displayNamesLocale`in e&&y(this.h,2):y(this.h,2,an(e.displayNamesLocale)),`outputCategoryMask`in e&&(this.outputCategoryMask=e.outputCategoryMask??!1),`outputConfidenceMasks`in e&&(this.outputConfidenceMasks=e.outputConfidenceMasks??!0),super.j(e)}L(){Eu(this)}segment(e,t,n){var r=typeof t==`function`?{}:t;return this.l=typeof t==`function`?t:n,Du(this),Zl(this,e,r),Ou(this)}eb(e,t,n,r){var i=typeof n==`function`?{}:n;return this.l=typeof n==`function`?n:r,Du(this),Ql(this,e,i,t),Ou(this)}Ra(){return this.u}o(){var e=new Eo;B(e,`image_in`),B(e,`norm_rect`);var t=new yo;Ui(t,Hs,this.h);var n=new xo;Cr(n,2,`mediapipe.tasks.vision.image_segmenter.ImageSegmenterGraph`),R(n,`IMAGE:image_in`),R(n,`NORM_RECT:norm_rect`),n.v(t),To(e,n),nl(this,e),this.outputConfidenceMasks&&(V(e,`confidence_masks`),z(n,`CONFIDENCE_MASKS:confidence_masks`),rl(this,`confidence_masks`),this.g.ha(`confidence_masks`,(e,t)=>{this.confidenceMasks=e.map(e=>$l(this,e,!0,!this.l)),G(this,t)}),this.g.attachEmptyPacketListener(`confidence_masks`,e=>{this.confidenceMasks=[],G(this,e)})),this.outputCategoryMask&&(V(e,`category_mask`),z(n,`CATEGORY_MASK:category_mask`),rl(this,`category_mask`),this.g.ga(`category_mask`,(e,t)=>{this.categoryMask=$l(this,e,!1,!this.l),G(this,t)}),this.g.attachEmptyPacketListener(`category_mask`,e=>{this.categoryMask=void 0,G(this,e)})),V(e,`quality_scores`),z(n,`QUALITY_SCORES:quality_scores`),this.g.attachFloatVectorListener(`quality_scores`,(e,t)=>{this.qualityScores=e,G(this,t)}),this.g.attachEmptyPacketListener(`quality_scores`,e=>{this.categoryMask=void 0,G(this,e)}),e=e.g(),this.setGraph(new Uint8Array(e),!0)}};ku.prototype.getLabels=ku.prototype.Ra,ku.prototype.segmentForVideo=ku.prototype.eb,ku.prototype.segment=ku.prototype.segment,ku.prototype.setOptions=ku.prototype.v,ku.createFromModelPath=function(e,t){return Y(ku,e,{baseOptions:{modelAssetPath:t}})},ku.createFromModelBuffer=function(e,t){return Y(ku,e,{baseOptions:{modelAssetBuffer:t}})},ku.createFromOptions=function(e,t){return Y(ku,e,t)};var Au={0:0,1:1,2:2,3:3};function ju(){return Bc()?void 0:document.createElement(`canvas`)}var Mu=class extends al{constructor(e,t){super(new Zc(e,t)),this.u=new hl,this.delegate=`CPU`,this.h=0,this.baseOptions=new H,this.B=this.l=0}C(){return`InteractiveSegmenter`}get i(){return this.g.i}v(e){return this.delegate=e.baseOptions?.delegate??`CPU`,super.j(e)}fb(e){if(this.h===0)throw Error(`Segmenter is not initialized.`);var t;if(this.l!==0&&(this.i._free(this.l),this.l=0),!(t=typeof ImageData<`u`&&e instanceof ImageData)){if(typeof e!=`object`||!e)t=!1;else{t=e.data;var n=e.width,r=e.height;t=Number.isInteger(n)&&n>0&&Number.isInteger(r)&&r>0&&(t instanceof Uint8ClampedArray||t instanceof Uint8Array)}}if(t)t=e.width,n=e.height,e=e.data;else{if([t,n]=Hc(e),typeof OffscreenCanvas<`u`)r=new OffscreenCanvas(t,n);else{if(typeof document>`u`)throw Error(`Canvas is not supported in this environment.`);r=document.createElement(`canvas`)}if(r.width=t,r.height=n,!(r=r.getContext(`2d`)))throw Error(`Canvas 2D context is not supported in this environment.`);r.drawImage(e,0,0),e=r.getImageData(0,0,t,n).data}if(!e)throw Error(`Unsupported image source or failed to extract image pixels.`);r=function({Wa:e,width:t,height:n}){if(t<=0||n<=0)throw Error(`Invalid image dimensions: ${t}x${n}. Dimensions must be positive.`);if(e%(t*n)!==0)throw Error(`Invalid image dimensions or pixel data length. Pixel data length ${e} is not a multiple of the number of pixels (${t*n}).`);if((e/=t*n)!==4&&e!==3&&e!==1)throw Error(`Invalid image dimensions or pixel data length. Calculated channels: ${e}. Expected 1, 3, or 4.`);return e}({Wa:e.length,width:t,height:n});var i=this.i._malloc(e.length);if(this.i.HEAPU8.set(e,i),this.l=i,!this.i._interactive_segmenter_set_image(this.h,i,t,n,r))throw Error(`Failed to set image on native engine.`)}segment(e){if(this.h===0)throw Error(`Segmenter is not initialized.`);var t=function(e){e=e.map(({isCompleted:e,brushMode:t,point:n})=>{t=Au[t]??0,n=n.map(({x:e,y:t})=>{var n=new Us;return Sr(n,1,e),Sr(n,2,t),n});var r=new Ws;return vr(r,e),tr(r,1,Ht(t),0),pr(r,2,n),r});var t=new Gs;return pr(t,1,e),Ks(t)}(e);e=this.i._malloc(t.length),this.i.HEAPU8.set(t,e);var n=this.i._malloc(12),r=n+4,i=n+8,a=0,o=this.B++;try{if(this.m){if(this.delegate===`GPU`){var s=this.m;++s.g.T,s.h.set(o,performance.now())}else{var c=this.m;++c.g.P,c.h.set(o,performance.now())}}if((a=this.i._interactive_segmenter_segment(this.h,e,t.length,n,r,i))===0)throw Error(`Segmentation failed.`);this.m?.za(o);let u=this.i.HEAPU32[n/4],d=this.i.HEAPU32[r/4],ee=new Float32Array(this.i.HEAPU8.buffer,a,this.i.HEAPU32[i/4]/4);var l=new Float32Array(ee);if(s=u*d,(l instanceof Uint8Array||l instanceof Float32Array)&&l.length!==s)throw Error(`Unsupported channel count: `+l.length/s);return new K([l],!0,!1,this.g.i.canvas??void 0,this.u,u,d)}finally{e!==0&&this.i._free(e),n!==0&&this.i._free(n),a!==0&&this.i._free(a)}}o(){this.h!==0&&(this.m?.xa(),this.i._interactive_segmenter_close(this.h),this.h=0),this.l!==0&&(this.i._free(this.l),this.l=0);var e=new ts;if(this.delegate===`GPU`){var t=new uo;fr(e,2,ns,t)}else yr(t=new _o,1,4),fr(e,1,ns,t);if(S(this.baseOptions,0,3,e),e=as(this.baseOptions),t=this.i._malloc(e.length),this.i.HEAPU8.set(e,t),this.h=this.i._interactive_segmenter_create(t,e.length),this.i._free(t),this.h===0)throw Error(`Failed to create native InteractiveSegmenter engine.`);this.m?.ya()}close(){this.h!==0&&(this.i._interactive_segmenter_close(this.h),this.h=0),this.l!==0&&(this.i._free(this.l),this.l=0),this.u.close(),super.close()}};Mu.prototype.close=Mu.prototype.close,Mu.prototype.segment=Mu.prototype.segment,Mu.prototype.setImage=Mu.prototype.fb,Mu.prototype.setOptions=Mu.prototype.v,Mu.createFromModelPath=function(e,t){return $c(Mu,ju(),e,{baseOptions:{modelAssetPath:t}})},Mu.createFromModelBuffer=function(e,t){return $c(Mu,ju(),e,{baseOptions:{modelAssetBuffer:t}})},Mu.createFromOptions=function(e,t){return $c(Mu,t.canvas??ju(),e,t)};var Nu=class{constructor(e,t,n){this.confidenceMasks=e,this.categoryMask=t,this.qualityScores=n}close(){this.confidenceMasks?.forEach(e=>{e.close()}),this.categoryMask?.close()}};Nu.prototype.close=Nu.prototype.close;var Pu=class extends eu{constructor(e,t){super(new Yl(e,t),`image_in`,`norm_rect_in`,!1),this.outputCategoryMask=!1,this.outputConfidenceMasks=!0,this.h=new Vs,this.u=new Ls,S(this.h,0,3,this.u),S(e=this.h,0,1,t=new H)}C(){return`InteractiveSegmenterLegacy`}get baseOptions(){return x(this.h,H,1)}set baseOptions(e){S(this.h,0,1,e)}v(e){return`outputCategoryMask`in e&&(this.outputCategoryMask=e.outputCategoryMask??!1),`outputConfidenceMasks`in e&&(this.outputConfidenceMasks=e.outputConfidenceMasks??!0),super.j(e)}segment(e,t,n,r){var i=typeof n==`function`?{}:n;if(this.l=typeof n==`function`?n:r,this.qualityScores=this.categoryMask=this.confidenceMasks=void 0,n=this.I+1,r=new Xs,t.keypoint&&t.scribble)throw Error(`Cannot provide both keypoint and scribble.`);if(t.keypoint){var a=new qs;vr(a,!0),Sr(a,1,t.keypoint.x),Sr(a,2,t.keypoint.y),fr(r,1,Zs,a)}else{if(!t.scribble)throw Error(`Must provide either a keypoint or a scribble.`);{let e=new Ys;for(a of t.scribble)vr(t=new qs,!0),Sr(t,1,a.x),Sr(t,2,a.y),hr(e,1,qs,t);fr(r,2,Zs,e)}}this.g.addProtoToStream(r.g(),`mediapipe.tasks.vision.interactive_segmenter_legacy.proto.RegionOfInterest`,`roi_in`,n),Zl(this,e,i);t:{try{let e=new Nu(this.confidenceMasks,this.categoryMask,this.qualityScores);if(!this.l){var o=e;break t}this.l(e)}finally{il(this)}o=void 0}return o}o(){var e=new Eo;B(e,`image_in`),B(e,`roi_in`),B(e,`norm_rect_in`);var t=new yo;Ui(t,Hs,this.h);var n=new xo;Cr(n,2,`mediapipe.tasks.vision.interactive_segmenter_legacy.InteractiveSegmenterGraphV2`),R(n,`IMAGE:image_in`),R(n,`ROI:roi_in`),R(n,`NORM_RECT:norm_rect_in`),n.v(t),To(e,n),nl(this,e),this.outputConfidenceMasks&&(V(e,`confidence_masks`),z(n,`CONFIDENCE_MASKS:confidence_masks`),rl(this,`confidence_masks`),this.g.ha(`confidence_masks`,(e,t)=>{this.confidenceMasks=e.map(e=>$l(this,e,!0,!this.l)),G(this,t)}),this.g.attachEmptyPacketListener(`confidence_masks`,e=>{this.confidenceMasks=[],G(this,e)})),this.outputCategoryMask&&(V(e,`category_mask`),z(n,`CATEGORY_MASK:category_mask`),rl(this,`category_mask`),this.g.ga(`category_mask`,(e,t)=>{this.categoryMask=$l(this,e,!1,!this.l),G(this,t)}),this.g.attachEmptyPacketListener(`category_mask`,e=>{this.categoryMask=void 0,G(this,e)})),V(e,`quality_scores`),z(n,`QUALITY_SCORES:quality_scores`),this.g.attachFloatVectorListener(`quality_scores`,(e,t)=>{this.qualityScores=e,G(this,t)}),this.g.attachEmptyPacketListener(`quality_scores`,e=>{this.categoryMask=void 0,G(this,e)}),e=e.g(),this.setGraph(new Uint8Array(e),!0)}};Pu.prototype.segment=Pu.prototype.segment,Pu.prototype.setOptions=Pu.prototype.v,Pu.createFromModelPath=function(e,t){return Y(Pu,e,{baseOptions:{modelAssetPath:t}})},Pu.createFromModelBuffer=function(e,t){return Y(Pu,e,{baseOptions:{modelAssetBuffer:t}})},Pu.createFromOptions=function(e,t){return Y(Pu,e,t)};var Fu=class extends eu{constructor(e,t){super(new Yl(e,t),`input_frame_gpu`,`norm_rect`,!1),this.l={detections:[]},S(e=this.h=new Qs,0,1,t=new H)}C(){return`ObjectDetector`}get baseOptions(){return x(this.h,H,1)}set baseOptions(e){S(this.h,0,1,e)}v(e){return e.displayNamesLocale===void 0?`displayNamesLocale`in e&&y(this.h,2):y(this.h,2,an(e.displayNamesLocale)),e.maxResults===void 0?`maxResults`in e&&y(this.h,3):yr(this.h,3,e.maxResults),e.scoreThreshold===void 0?`scoreThreshold`in e&&y(this.h,4):w(this.h,4,e.scoreThreshold),e.categoryAllowlist===void 0?`categoryAllowlist`in e&&y(this.h,5):wr(this.h,5,e.categoryAllowlist),e.categoryDenylist===void 0?`categoryDenylist`in e&&y(this.h,6):wr(this.h,6,e.categoryDenylist),this.j(e)}G(e,t){return this.l={detections:[]},Zl(this,e,t),this.l}H(e,t,n){return this.l={detections:[]},Ql(this,e,n,t),this.l}o(){var e=new Eo;B(e,`input_frame_gpu`),B(e,`norm_rect`),V(e,`detections`);var t=new yo;Ui(t,$s,this.h);var n=new xo;Cr(n,2,`mediapipe.tasks.vision.ObjectDetectorGraph`),R(n,`IMAGE:input_frame_gpu`),R(n,`NORM_RECT:norm_rect`),z(n,`DETECTIONS:detections`),n.v(t),To(e,n),this.g.attachProtoVectorListener(`detections`,(e,t)=>{for(let t of e)e=Io(t),this.l.detections.push(oc(e));G(this,t)}),this.g.attachEmptyPacketListener(`detections`,e=>{G(this,e)}),e=e.g(),this.setGraph(new Uint8Array(e),!0)}};Fu.prototype.detectForVideo=Fu.prototype.H,Fu.prototype.detect=Fu.prototype.G,Fu.prototype.setOptions=Fu.prototype.v,Fu.createFromModelPath=async function(e,t){return Y(Fu,e,{baseOptions:{modelAssetPath:t}})},Fu.createFromModelBuffer=function(e,t){return Y(Fu,e,{baseOptions:{modelAssetBuffer:t}})},Fu.createFromOptions=function(e,t){return Y(Fu,e,t)};var Iu=class{constructor(e,t,n){this.landmarks=e,this.worldLandmarks=t,this.segmentationMasks=n}close(){this.segmentationMasks?.forEach(e=>{e.close()})}};function Lu(e){e.landmarks=[],e.worldLandmarks=[],e.segmentationMasks=void 0}function Ru(e){try{let t=new Iu(e.landmarks,e.worldLandmarks,e.segmentationMasks);if(!e.u)return t;e.u(t)}finally{il(e)}}Iu.prototype.close=Iu.prototype.close;var $=class extends eu{constructor(e,t){super(new Yl(e,t),`image_in`,`norm_rect`,!1),this.landmarks=[],this.worldLandmarks=[],this.outputSegmentationMasks=!1,S(e=this.h=new ec,0,1,t=new H),this.B=new ks,S(this.h,0,3,this.B),this.l=new Os,S(this.h,0,2,this.l),yr(this.l,4,1),w(this.l,2,.5),w(this.B,2,.5),w(this.h,4,.5)}C(){return`PoseLandmarker`}get baseOptions(){return x(this.h,H,1)}set baseOptions(e){S(this.h,0,1,e)}v(e){return`numPoses`in e&&yr(this.l,4,e.numPoses??1),`minPoseDetectionConfidence`in e&&w(this.l,2,e.minPoseDetectionConfidence??.5),`minTrackingConfidence`in e&&w(this.h,4,e.minTrackingConfidence??.5),`minPosePresenceConfidence`in e&&w(this.B,2,e.minPosePresenceConfidence??.5),`outputSegmentationMasks`in e&&(this.outputSegmentationMasks=e.outputSegmentationMasks??!1),this.j(e)}G(e,t,n){var r=typeof t==`function`?{}:t;return this.u=typeof t==`function`?t:n,Lu(this),Zl(this,e,r),Ru(this)}H(e,t,n,r){var i=typeof n==`function`?{}:n;return this.u=typeof n==`function`?n:r,Lu(this),Ql(this,e,i,t),Ru(this)}o(){var e=new Eo;B(e,`image_in`),B(e,`norm_rect`),V(e,`normalized_landmarks`),V(e,`world_landmarks`),V(e,`segmentation_masks`);var t=new yo;Ui(t,tc,this.h);var n=new xo;Cr(n,2,`mediapipe.tasks.vision.pose_landmarker.PoseLandmarkerGraph`),R(n,`IMAGE:image_in`),R(n,`NORM_RECT:norm_rect`),z(n,`NORM_LANDMARKS:normalized_landmarks`),z(n,`WORLD_LANDMARKS:world_landmarks`),n.v(t),To(e,n),nl(this,e),this.g.attachProtoVectorListener(`normalized_landmarks`,(e,t)=>{this.landmarks=[];for(let t of e)e=Bo(t),this.landmarks.push(sc(e));G(this,t)}),this.g.attachEmptyPacketListener(`normalized_landmarks`,e=>{this.landmarks=[],G(this,e)}),this.g.attachProtoVectorListener(`world_landmarks`,(e,t)=>{this.worldLandmarks=[];for(let t of e)e=Ro(t),this.worldLandmarks.push(cc(e));G(this,t)}),this.g.attachEmptyPacketListener(`world_landmarks`,e=>{this.worldLandmarks=[],G(this,e)}),this.outputSegmentationMasks&&(z(n,`SEGMENTATION_MASK:segmentation_masks`),rl(this,`segmentation_masks`),this.g.ha(`segmentation_masks`,(e,t)=>{this.segmentationMasks=e.map(e=>$l(this,e,!0,!this.u)),G(this,t)}),this.g.attachEmptyPacketListener(`segmentation_masks`,e=>{this.segmentationMasks=[],G(this,e)})),e=e.g(),this.setGraph(new Uint8Array(e),!0)}};$.prototype.detectForVideo=$.prototype.H,$.prototype.detect=$.prototype.G,$.prototype.setOptions=$.prototype.v,$.createFromModelPath=function(e,t){return Y($,e,{baseOptions:{modelAssetPath:t}})},$.createFromModelBuffer=function(e,t){return Y($,e,{baseOptions:{modelAssetBuffer:t}})},$.createFromOptions=function(e,t){return Y($,e,t)},$.POSE_CONNECTIONS=yu,o(`module$exports$google3$third_party$mediapipe$tasks$web$vision$pose_landmarker$pose_landmarker.PoseLandmarker.POSE_CONNECTIONS`,$.POSE_CONNECTIONS);var zu=class{container;options;callback;activeValue;customStyle;constructor(e,t,n,r,i=`pills`){let a=document.getElementById(e);if(!a)throw Error(`Container element with id '${e}' not found.`);this.container=a,this.options=t,this.callback=r,this.activeValue=n,this.customStyle=i,this.render()}render(){let e=this.customStyle===`tabs`?`tabs-container`:`view-tabs`,t=this.customStyle===`tabs`?`tab-button`:`view-tab`;this.container.classList.add(e),this.container.innerHTML=``,this.options.forEach(e=>{let n=document.createElement(`button`);n.classList.add(t),n.dataset.value=e.value,e.icon?n.innerHTML=`<span class="material-icons">${e.icon}</span> ${e.label}`:n.textContent=e.label,e.value===this.activeValue&&n.classList.add(`active`),n.addEventListener(`click`,()=>{this.setActive(e.value)}),this.container.appendChild(n)})}setActive(e){let t=this.activeValue===e;this.activeValue=e;let n=this.customStyle===`tabs`?`.tab-button`:`.view-tab`;this.container.querySelectorAll(n).forEach(t=>{t.dataset.value===e?t.classList.add(`active`):t.classList.remove(`active`)}),t||this.callback(e)}},Bu=class{container;options;onModelChanged;currentMode=`standard`;viewList;viewUpload;modelSelect;modelUpload;uploadStatus;progressContainer;progressBar;progressText;constructor(e,t,n){let r=document.getElementById(e);if(!r)throw Error(`ModelSelector: container ${e} not found`);this.container=r,this.options=t,this.onModelChanged=n,this.render()}updateOptions(e){this.options=e,this.modelSelect&&(this.modelSelect.innerHTML=``,this.options.forEach(e=>{let t=document.createElement(`option`);t.value=e.value,t.textContent=e.label,e.isDefault&&(t.selected=!0),this.modelSelect.appendChild(t)}))}render(){this.container.innerHTML=`
      <div id="${this.container.id}-toggle" class="tab-container" style="margin-bottom: 12px;"></div>

      <div id="${this.container.id}-view-list" class="tab-content active">
        <div class="select-wrapper">
          <select class="model-select">
            ${this.options.map(e=>`<option value="${e.value}" ${e.isDefault?`selected`:``}>${e.label}</option>`).join(``)}
          </select>
        </div>
      </div>

      <div id="${this.container.id}-view-upload" class="tab-content" style="display: none;">
        <label class="file-upload-btn">
            Choose .tflite File
            <input type="file" class="model-upload" accept=".tflite,.task">
        </label>
        <div class="status-text upload-status">No file chosen</div>
        <div class="progress-container model-loading-progress" style="display: none;">
            <div class="progress-bar"></div>
            <div class="progress-text">Loading Model... 0%</div>
        </div>
      </div>
    `,this.viewList=this.container.querySelector(`#${this.container.id}-view-list`),this.viewUpload=this.container.querySelector(`#${this.container.id}-view-upload`),this.modelSelect=this.container.querySelector(`.model-select`),this.modelUpload=this.container.querySelector(`.model-upload`),this.uploadStatus=this.container.querySelector(`.upload-status`),this.progressContainer=this.container.querySelector(`.model-loading-progress`),this.progressBar=this.container.querySelector(`.progress-bar`),this.progressText=this.container.querySelector(`.progress-text`),new zu(`${this.container.id}-toggle`,[{label:`Standard`,value:`standard`,icon:`grid_view`},{label:`Upload`,value:`upload`,icon:`upload`}],`standard`,e=>{this.currentMode=e,this.currentMode===`standard`?(this.viewList.style.display=`block`,this.viewUpload.style.display=`none`,this.viewList.classList.add(`active`),this.viewUpload.classList.remove(`active`)):(this.viewUpload.style.display=`block`,this.viewList.style.display=`none`,this.viewUpload.classList.add(`active`),this.viewList.classList.remove(`active`))},`tabs`),this.modelSelect.addEventListener(`change`,()=>{this.modelUpload.value=``,this.uploadStatus.innerText=`No file chosen`,this.onModelChanged({type:`standard`,value:this.modelSelect.value})}),this.modelUpload.addEventListener(`change`,e=>{let t=e.target.files?.[0];t&&(this.uploadStatus.innerText=t.name,this.onModelChanged({type:`custom`,file:t}))})}showProgress(e,t){if(this.currentMode===`upload`)return;let n=Math.round(e/t*100);this.progressContainer.style.display=`block`,this.progressBar.style.width=`${n}%`,this.progressText.innerText=`Loading Model... ${n}%`}hideProgress(){this.progressContainer.style.display=`none`}},Vu=class{options;container;worker;currentModel;models={};modelSelector;currentDelegate=`GPU`;isWorkerReady=!1;constructor(e){this.options=e,this.container=e.container,this.currentModel=e.defaultModelName,this.models[e.defaultModelName]=e.defaultModelUrl,e.defaultDelegate&&(this.currentDelegate=e.defaultDelegate)}async initialize(){this.container.innerHTML=this.options.template,this.initWorker(),this.setupUI(),this.onInitializeUI(),this.setupDelegateSelect(),await this.initializeTask()}initWorker(){this.worker||=this.options.workerFactory(),this.worker&&(this.worker.onmessage=this.handleWorkerMessage.bind(this))}hadDelegateFallback=!1;handleWorkerMessage(e){let{type:t}=e.data;switch(t){case`LOAD_PROGRESS`:this.handleLoadProgress(e.data);break;case`INIT_DONE`:this.handleInitDone();break;case`DELEGATE_FALLBACK`:let{reason:t,advice:n}=e.data,r=n?`${t} (${n})`:`GPU unavailable.`;console.warn(`Worker fell back to CPU delegate: ${r}`),this.currentDelegate=`CPU`,this.hadDelegateFallback=!0;let i=document.getElementById(`delegate-select`);i&&(i.value=`CPU`),this.renderFallbackWarning(r);break;case`ERROR`:case`DETECT_ERROR`:case`CLASSIFY_ERROR`:console.error(`Worker error:`,e.data.error),this.updateStatus(`Error: ${e.data.error}`)}}handleLoadProgress(e){let{progress:t,loaded:n,total:r}=e;t===void 0?n!==void 0&&r!==void 0&&(this.modelSelector?.showProgress(n,r),n>=r&&setTimeout(()=>this.modelSelector?.hideProgress(),500)):(this.modelSelector?.showProgress(t*100,100),t>=1&&setTimeout(()=>this.modelSelector?.hideProgress(),500))}handleInitDone(){this.modelSelector?.hideProgress(),document.querySelector(`.viewport`)?.classList.remove(`loading-model`),this.isWorkerReady=!0,this.hadDelegateFallback?(this.updateStatus(`GPU unavailable. Using CPU delegate (Ready).`),this.hadDelegateFallback=!1):this.updateStatus(`Ready`)}setupDelegateSelect(){let e=document.getElementById(`delegate-select`);e&&(e.addEventListener(`change`,async()=>{this.currentDelegate=e.value,await this.initializeTask()}),e.value=this.currentDelegate)}setupUI(){this.modelSelector=new Bu(`model-selector-container`,[{label:this.options.defaultModelName,value:this.options.defaultModelName,isDefault:!0}],async e=>{e.type===`standard`?this.currentModel=e.value:e.type===`custom`&&(this.models.custom=URL.createObjectURL(e.file),this.currentModel=`custom`),await this.initializeTask()})}async initializeTask(){document.querySelector(`.viewport`)?.classList.add(`loading-model`),this.isWorkerReady=!1,this.updateStatus(`Loading Model...`);let e=`/rps-hand/google-hands/`,t=this.models[this.currentModel];this.currentModel===`custom`&&this.models.custom?t=this.models.custom:t.startsWith(`http`)||(t=new URL(t,new URL(e,window.location.origin)).href);let n=this.getWorkerInitParamsInner();this.worker?.postMessage({type:`INIT`,modelAssetPath:t,delegate:this.currentDelegate,baseUrl:e,...n})}getWorkerInitParamsInner(){return this.getWorkerInitParams()}updateStatus(e){let t=document.getElementById(`status-message`);t&&(t.innerText=e)}updateInferenceTime(e){let t=document.getElementById(`inference-time`);t&&(t.innerText=`Inference Time: ${e.toFixed(2)} ms`)}cleanup(){this.worker&&=(this.worker.postMessage({type:`CLEANUP`}),this.worker.terminate(),void 0),this.isWorkerReady=!1}renderFallbackWarning(e){let t=document.getElementById(`fallback-warning`);if(!t){let e=document.querySelector(`.status-group`);e&&(t=document.createElement(`div`),t.id=`fallback-warning`,t.className=`fallback-warning`,t.style.cssText=`color: #d97706; font-size: 0.85rem; margin-top: 4px; font-weight: 500;`,e.appendChild(t))}t&&(t.innerText=`⚠️ GPU Unavailable (${e}). Switched to CPU delegate.`)}onInitializeUI(){}},Hu=class extends Vu{runningMode=`IMAGE`;video;canvasElement;canvasCtx;enableWebcamButton;closePhone;phoneAttempt=0;disposed=!1;lastVideoTimeSeconds=-1;lastTimestampMs=-1;animationFrameId;async initialize(){this.container.innerHTML=this.options.template,this.video=document.getElementById(`webcam`),this.canvasElement=document.getElementById(`output_canvas`),this.canvasElement&&(this.canvasCtx=this.canvasElement.getContext(`2d`)),this.enableWebcamButton=document.getElementById(`webcamButton`),this.initWorker(),this.setupUI(),this.setupViewToggle(),this.setupPhoneCamera(),this.setupImageUpload(),this.onInitializeUI(),this.setupDelegateSelect(),await this.initializeTask()}handleWorkerMessage(e){let{type:t}=e.data;switch(t){case`DETECT_RESULT`:let{mode:t,result:n,inferenceTime:r}=e.data;this.updateStatus(`Done in ${Math.round(r)}ms`),this.updateInferenceTime(r),t===`IMAGE`?this.displayImageResult(n):t===`VIDEO`&&(this.displayVideoResult(n),this.video.srcObject&&!this.video.paused&&(this.animationFrameId=window.requestAnimationFrame(this.predictWebcam.bind(this))));break;default:super.handleWorkerMessage(e)}}handleInitDone(){if(super.handleInitDone(),this.video&&this.video.srcObject&&this.enableWebcamButton?(this.enableWebcamButton.innerText=`Disable Webcam`,this.enableWebcamButton.disabled=!1):this.enableWebcamButton&&this.enableWebcamButton.innerText!==`Starting...`&&(this.enableWebcamButton.innerText=`Enable Webcam`,this.enableWebcamButton.disabled=!1),this.runningMode===`VIDEO`)this.video.srcObject&&this.enableCam();else if(this.runningMode===`IMAGE`){let e=document.getElementById(`test-image`);e&&e.style.display!==`none`&&e.src&&this.triggerImageDetection(e)}}setupViewToggle(){let e=document.getElementById(`view-webcam`),t=document.getElementById(`view-image`);if(!e||!t)return;let n=n=>{localStorage.setItem(`mediapipe-running-mode`,n);let r=document.getElementById(`webcam-controls-container`),i=document.getElementById(`classification-results`);if(i&&(i.innerHTML=``),n===`VIDEO`)e.classList.add(`active`),t.classList.remove(`active`),r&&(r.style.display=`flex`),this.runningMode=`VIDEO`,this.worker?.postMessage({type:`SET_OPTIONS`,runningMode:`VIDEO`}),localStorage.getItem(`mediapipe-webcam-active`)===`true`&&this.enableCam();else if(e.classList.remove(`active`),t.classList.add(`active`),r&&(r.style.display=`none`),this.runningMode=`IMAGE`,this.worker?.postMessage({type:`SET_OPTIONS`,runningMode:`IMAGE`}),this.stopCam(!1),this.isWorkerReady){let e=document.getElementById(`test-image`);e&&e.src&&this.triggerImageDetection(e)}},r=localStorage.getItem(`mediapipe-running-mode`)||`IMAGE`;new zu(`view-mode-toggle`,[{label:`Webcam`,value:`video`},{label:`Image`,value:`image`}],r.toLowerCase(),e=>{n(e===`video`?`VIDEO`:`IMAGE`)}).setActive(r.toLowerCase()),n(r),this.enableWebcamButton&&this.enableWebcamButton.addEventListener(`click`,this.toggleCam.bind(this))}setupPhoneCamera(){let e=document.getElementById(`webcam-controls-container`);if(!e||!this.video)return;let t=document.createElement(`button`);t.textContent=`Phone camera · QR`,t.className=this.enableWebcamButton?.className||``,t.type=`button`;let n=document.createElement(`select`);n.id=`phoneQuality`,n.setAttribute(`aria-label`,`Phone video quality`),n.innerHTML=`<option value="480">480p</option><option value="720" selected>720p</option><option value="1080">1080p</option>`;let i=document.createElement(`span`);i.textContent=`Phone sends video. This computer runs Google tracking.`,e.append(n,t,i),t.onclick=async()=>{this.stopCam(!0);let e=++this.phoneAttempt;t.disabled=!0;let n=(e,t)=>t()?Promise.resolve():new Promise((t,n)=>{let r=document.createElement(`script`);r.src=e,r.onload=()=>t(),r.onerror=()=>n(Error(`Camera connection library failed to load.`)),document.head.append(r)});try{await Promise.all([n(`https://cdnjs.cloudflare.com/ajax/libs/peerjs/1.5.4/peerjs.min.js`,()=>!!window.Peer),n(`https://cdnjs.cloudflare.com/ajax/libs/qrcodejs/1.0.0/qrcode.min.js`,()=>!!window.QRCode)]);let t=new URL(`../hand-demo/video-link.mjs?v=alien15.18`,location.href).href,{receivePhone:i}=await r(async()=>{let{receivePhone:e}=await import(t);return{receivePhone:e}},[]);if(this.disposed||e!==this.phoneAttempt)return;this.closePhone=i(async t=>{if(this.disposed||e!==this.phoneAttempt){t.getTracks().forEach(e=>e.stop());return}try{if(this.runningMode=`VIDEO`,this.worker?.postMessage({type:`SET_OPTIONS`,runningMode:`VIDEO`}),this.video.srcObject=t,this.video.muted=!0,this.video.playsInline=!0,await this.video.play(),this.disposed||e!==this.phoneAttempt)return;this.lastVideoTimeSeconds=-1;let n=document.getElementById(`webcam-placeholder`);n&&(n.style.display=`none`),this.enableWebcamButton.innerText=`Disconnect phone`,this.enableWebcamButton.disabled=!1,this.updateStatus(`Phone video connected · Google tracking on this computer`),this.predictWebcam()}catch(e){this.stopCam(!0),this.updateStatus(`Phone video error: ${e}`)}},e=>this.updateStatus(e),e=>{this.stopCam(!0),this.updateStatus(e)})}catch(e){this.updateStatus(`Phone connection error: ${e}`)}finally{t.disabled=!1}}}setupImageUpload(){let e=document.getElementById(`image-upload`),t=document.getElementById(`image-preview-container`),n=document.getElementById(`test-image`),r=document.querySelector(`.upload-dropzone`),i=document.querySelector(`.dropzone-content`);n&&n.src&&i&&(i.style.display=`none`),r&&r.addEventListener(`click`,t=>{let n=r.querySelector(`.preview-container`);n&&n.contains(t.target)||e?.click()}),e?.addEventListener(`change`,e=>{let r=e.target.files?.[0];if(r){let e=new FileReader;e.onload=e=>{n&&(n.src=e.target?.result),t&&(t.style.display=``);let r=document.querySelector(`.dropzone-content`);r&&(r.style.display=`none`),n&&this.triggerImageDetection(n)},e.readAsDataURL(r)}})}async initializeTask(){this.enableWebcamButton&&(this.enableWebcamButton.disabled=!0,(!this.video||!this.video.srcObject)&&(this.enableWebcamButton.innerText=`Initializing...`)),await super.initializeTask()}getWorkerInitParamsInner(){return{runningMode:this.runningMode,...this.getWorkerInitParams()}}triggerImageDetection(e){e.complete&&e.naturalWidth>0?this.detectImage(e):e.onload=()=>{e.naturalWidth>0&&this.detectImage(e)}}async detectImage(e){if(!this.worker||!this.isWorkerReady)return;this.runningMode!==`IMAGE`&&(this.runningMode=`IMAGE`);let t=await createImageBitmap(e);this.updateStatus(`Processing image...`),this.worker.postMessage({type:`DETECT_IMAGE`,bitmap:t,timestampMs:performance.now()},[t])}async enableCam(){if(!this.worker||!this.video||this.video.srcObject)return;this.enableWebcamButton&&(this.enableWebcamButton.innerText=`Starting...`,this.enableWebcamButton.disabled=!0);let e=++this.phoneAttempt,t={video:!0};try{let n=await navigator.mediaDevices.getUserMedia(t);if(!this.worker||!this.video||this.disposed||e!==this.phoneAttempt){n.getTracks().forEach(e=>e.stop());return}this.video.srcObject=n;let r=document.getElementById(`webcam-placeholder`);r&&(r.style.display=`none`);let i=()=>{this.video&&(this.video.play().catch(console.error),this.predictWebcam())};this.video.readyState>=2?i():this.video.addEventListener(`loadeddata`,i,{once:!0}),this.runningMode=`VIDEO`,localStorage.setItem(`mediapipe-webcam-active`,`true`),this.worker.postMessage({type:`SET_OPTIONS`,runningMode:`VIDEO`}),this.updateStatus(`Webcam running...`),this.enableWebcamButton&&(this.enableWebcamButton.innerText=`Disable Webcam`,this.enableWebcamButton.disabled=!1)}catch(e){console.error(e),this.updateStatus(`Camera error!`),this.enableWebcamButton&&(this.enableWebcamButton.innerText=`Enable Webcam`,this.enableWebcamButton.disabled=!1)}}toggleCam(){this.video&&this.video.srcObject?this.stopCam(!0):this.enableCam()}stopCam(e=!0){this.phoneAttempt++;let t=this.closePhone;if(this.closePhone=void 0,t?.(),this.video&&this.video.srcObject){this.video.srcObject.getTracks().forEach(e=>e.stop()),this.video.srcObject=null;let t=document.getElementById(`webcam-placeholder`);t&&(t.style.display=`flex`),this.enableWebcamButton&&(this.enableWebcamButton.innerText=`Enable Webcam`),this.animationFrameId&&cancelAnimationFrame(this.animationFrameId),this.canvasCtx&&this.canvasElement&&this.canvasCtx.clearRect(0,0,this.canvasElement.width,this.canvasElement.height),e&&localStorage.setItem(`mediapipe-webcam-active`,`false`)}}async predictWebcam(){if(!this.disposed&&this.video?.srcObject&&this.runningMode===`VIDEO`){if(!this.isWorkerReady||!this.worker){this.animationFrameId=window.requestAnimationFrame(this.predictWebcam.bind(this));return}if(this.video.currentTime!==this.lastVideoTimeSeconds){this.lastVideoTimeSeconds=this.video.currentTime;try{let e;if(navigator.webdriver){let t=document.createElement(`canvas`);t.width=this.video.videoWidth||640,t.height=this.video.videoHeight||480,t.getContext(`2d`,{willReadFrequently:!0})?.drawImage(this.video,0,0,t.width,t.height),e=await window.createImageBitmap(t)}else e=await window.createImageBitmap(this.video);let t=performance.now(),n=t>this.lastTimestampMs?t:this.lastTimestampMs+1;this.lastTimestampMs=n,this.worker?.postMessage({type:`DETECT_VIDEO`,bitmap:e,timestampMs:n},[e])}catch(e){console.error(`Failed to create ImageBitmap from video`,e),this.animationFrameId=window.requestAnimationFrame(this.predictWebcam.bind(this))}}else this.animationFrameId=window.requestAnimationFrame(this.predictWebcam.bind(this))}}cleanup(){this.disposed=!0,this.animationFrameId&&cancelAnimationFrame(this.animationFrameId),this.stopCam(!1),this.canvasCtx&&this.canvasElement&&this.canvasCtx.clearRect(0,0,this.canvasElement.width,this.canvasElement.height),super.cleanup()}},Uu=`<div class="task-container">\r
  <!-- Controls on Left -->\r
  <div class="controls-panel">\r
    <!-- Model Section -->\r
    <div class="section-title">Model Selection</div>\r
    <div id="model-selector-container"></div>\r
\r
    <div class="divider"></div>\r
\r
    <!-- Settings Section -->\r
    <div class="section-title">Settings</div>\r
\r
    <div class="control-group">\r
      <div class="control-label">\r
        <span>Max Results</span>\r
        <span id="max-results-value" class="value-badge">3</span>\r
      </div>\r
      <input type="range" id="max-results" min="1" max="10" value="3" class="range-slider" />\r
    </div>\r
\r
    <div class="control-group">\r
      <div class="control-label">\r
        <span>Score Threshold</span>\r
        <span id="score-threshold-value" class="value-badge">0.5</span>\r
      </div>\r
      <input type="range" id="score-threshold" min="0" max="1" step="0.01" value="0.5" class="range-slider" />\r
    </div>\r
\r
    <div class="control-group">\r
      <div class="control-label">\r
        <span>Delegate</span>\r
      </div>\r
      <div class="select-wrapper">\r
        <select id="delegate-select">\r
          <option value="GPU" selected>GPU</option>\r
          <option value="CPU">CPU</option>\r
        </select>\r
      </div>\r
    </div>\r
\r
    <div class="divider"></div>\r
\r
    <div class="status-group">\r
      <div id="status-message" class="status-message">Ready</div>\r
      <div id="inference-time" class="inference-time">Inference Time: - ms</div>\r
    </div>\r
  </div>\r
\r
  <!-- Output on Right -->\r
  <div class="output-panel">\r
    <div class="output-header">\r
      <h2>Object Detection</h2>\r
      <div id="view-mode-toggle"></div>\r
    </div>\r
\r
    <div class="viewport">\r
      <!-- Webcam View -->\r
      <div id="view-webcam" class="view-content">\r
        <div class="cam-container">\r
          <div class="video-wrapper">\r
            <div class="webcam-placeholder" id="webcam-placeholder">\r
              <span class="material-icons">videocam_off</span>\r
              <p>Webcam Disabled</p>\r
            </div>\r
            <video id="webcam" autoplay playsinline muted></video>\r
            <canvas id="output_canvas"></canvas>\r
          </div>\r
        </div>\r
        <div\r
          id="webcam-controls-container"\r
          style="display: none; justify-content: center; width: 100%; margin-top: auto; padding-bottom: 20px"\r
        >\r
          <button id="webcamButton" class="action-button">\r
            <span class="material-icons">videocam</span> Enable Webcam\r
          </button>\r
        </div>\r
      </div>\r
\r
      <!-- Image View -->\r
      <div id="view-image" class="view-content active">\r
        <div class="upload-dropzone">\r
          <div class="dropzone-content" style="display: none">\r
            <span class="material-icons large-icon">image</span>\r
            <p>Drag and drop or click to upload</p>\r
            <input type="file" id="image-upload" accept="image/*" />\r
          </div>\r
          <div id="image-preview-container" class="preview-container">\r
            <div class="canvas-wrapper">\r
              <img id="test-image" src="dog.jpg" crossorigin="anonymous" />\r
              <canvas id="image-canvas"></canvas>\r
            </div>\r
          </div>\r
          <button id="re-upload-btn" class="action-button re-upload" style="display: flex">\r
            <span class="material-icons">upload</span> Upload New Image\r
          </button>\r
        </div>\r
      </div>\r
    </div>\r
  </div>\r
</div>\r
`,Wu=class extends Hu{scoreThreshold=.5;maxResults=3;onInitializeUI(){let e=(e,t)=>{let n=document.getElementById(e),r=document.getElementById(`${e}-value`);n&&r&&n.addEventListener(`input`,()=>{let i=e===`max-results`?parseInt(n.value):parseFloat(n.value);r.innerText=i.toString(),t(i)})};e(`max-results`,e=>{this.maxResults=e,this.worker?.postMessage({type:`SET_OPTIONS`,maxResults:this.maxResults}),this.triggerRedetection()}),e(`score-threshold`,e=>{this.scoreThreshold=e,this.worker?.postMessage({type:`SET_OPTIONS`,scoreThreshold:this.scoreThreshold}),this.triggerRedetection()}),this.models={efficientdet_lite0:`https://storage.googleapis.com/mediapipe-models/object_detector/efficientdet_lite0/float32/1/efficientdet_lite0.tflite`,efficientdet_lite2:`https://storage.googleapis.com/mediapipe-models/object_detector/efficientdet_lite2/float32/1/efficientdet_lite2.tflite`,ssd_mobilenet_v2:`https://storage.googleapis.com/mediapipe-models/object_detector/ssd_mobilenet_v2/float32/1/ssd_mobilenet_v2.tflite`},this.modelSelector&&this.modelSelector.updateOptions([{label:`EfficientDet-Lite0`,value:`efficientdet_lite0`,isDefault:!0},{label:`EfficientDet-Lite2`,value:`efficientdet_lite2`},{label:`SSD MobileNet V2`,value:`ssd_mobilenet_v2`}])}triggerRedetection(){if(this.runningMode===`IMAGE`){let e=document.getElementById(`test-image`);e&&e.src&&this.detectImage(e)}}getWorkerInitParams(){return{scoreThreshold:this.scoreThreshold,maxResults:this.maxResults}}displayImageResult(e){let t=document.getElementById(`image-canvas`),n=document.getElementById(`test-image`),r=t.getContext(`2d`);if(t.width=n.naturalWidth,t.height=n.naturalHeight,r.clearRect(0,0,t.width,t.height),e.detections){for(let t of e.detections)this.drawDetection(r,t,!1);let t=document.createElement(`div`);t.id=`test-results`,t.style.display=`none`,t.textContent=JSON.stringify(e.detections);let n=document.getElementById(`test-results`);n&&n.remove(),document.body.appendChild(t)}}displayVideoResult(e){if(this.canvasElement.width=this.video.videoWidth,this.canvasElement.height=this.video.videoHeight,this.canvasCtx.clearRect(0,0,this.canvasElement.width,this.canvasElement.height),e.detections)for(let t of e.detections)this.drawDetection(this.canvasCtx,t,!0)}drawDetection(e,t,n){new q(e).drawBoundingBox(t.boundingBox,{color:`#007f8b`,lineWidth:4,fillColor:`transparent`});let{originX:r,originY:i}=t.boundingBox,a=r;e.fillStyle=`#007f8b`,e.font=`16px sans-serif`;let o=t.categories[0],s=o.score?Math.round(o.score*100):0,c=`${o.categoryName} - ${s}%`,l=e.measureText(c).width;if(n){e.save();let t=a+(l+10)/2,n=i+12.5;e.translate(t,n),e.scale(-1,1),e.translate(-t,-n),e.fillRect(a,i,l+10,25),e.fillStyle=`#ffffff`,e.fillText(c,a+5,i+18),e.restore()}else e.fillRect(a,i,l+10,25),e.fillStyle=`#ffffff`,e.fillText(c,a+5,i+18)}},Gu=null;async function Ku(e){Gu=new Wu({container:e,template:Uu,defaultModelName:`efficientdet_lite0`,defaultModelUrl:`https://storage.googleapis.com/mediapipe-models/object_detector/efficientdet_lite0/float32/1/efficientdet_lite0.tflite`,workerFactory:()=>new Worker(new URL(`/rps-hand/google-hands/assets/object-detector.worker-COjL4s5z.js`,``+import.meta.url),{type:`module`})}),await Gu.initialize()}function qu(){Gu&&=(Gu.cleanup(),null)}var Ju=`<div class="task-container">\r
  <!-- Controls on Left -->\r
  <div class="controls-panel">\r
    <!-- Model Section -->\r
    <div class="section-title">Model Selection</div>\r
    <div id="model-selector-container"></div>\r
\r
    <div class="divider"></div>\r
\r
    <!-- Settings Section -->\r
    <div class="section-title">Settings</div>\r
\r
    <div class="control-group">\r
      <div class="control-label">\r
        <span>Output Type</span>\r
      </div>\r
      <div class="select-wrapper">\r
        <select id="output-type">\r
          <option value="CATEGORY_MASK" selected>Category Mask</option>\r
          <option value="CONFIDENCE_MASKS">Confidence Mask</option>\r
        </select>\r
      </div>\r
    </div>\r
\r
    <div class="control-group" id="class-select-container" style="display: none">\r
      <div class="control-label">\r
        <span>Select Class</span>\r
      </div>\r
      <div class="select-wrapper">\r
        <select id="class-select"></select>\r
      </div>\r
    </div>\r
\r
    <div class="control-group">\r
      <div class="control-label">\r
        <span>Opacity</span>\r
      </div>\r
      <input type="range" id="opacity" min="0" max="1" step="0.05" value="0.5" class="range-slider" />\r
    </div>\r
\r
    <div class="control-group">\r
      <div class="control-label">\r
        <span>Delegate</span>\r
      </div>\r
      <div class="select-wrapper">\r
        <select id="delegate-select">\r
          <option value="GPU">GPU</option>\r
          <option value="CPU" selected>CPU</option>\r
        </select>\r
      </div>\r
    </div>\r
\r
    <div class="divider"></div>\r
\r
    <div class="status-group">\r
      <div id="status-message" class="status-message">Ready</div>\r
      <div id="inference-time" class="inference-time">Inference Time: - ms</div>\r
    </div>\r
  </div>\r
\r
  <!-- Output on Right -->\r
  <div class="output-panel">\r
    <div class="output-header">\r
      <h2>Image Segmentation</h2>\r
      <div id="view-mode-toggle"></div>\r
    </div>\r
\r
    <div class="viewport">\r
      <!-- Webcam View -->\r
      <div id="view-webcam" class="view-content">\r
        <div class="cam-container">\r
          <div class="video-wrapper">\r
            <div class="webcam-placeholder" id="webcam-placeholder">\r
              <span class="material-icons">videocam_off</span>\r
              <p>Webcam Disabled</p>\r
            </div>\r
            <video id="webcam" autoplay playsinline muted></video>\r
            <canvas id="output_canvas"></canvas>\r
            <!-- Overlay Canvas is created dynamically -->\r
          </div>\r
          <div\r
            id="webcam-controls-container"\r
            style="display: none; justify-content: center; width: 100%; margin-top: auto; padding-bottom: 20px"\r
          >\r
            <button id="webcamButton" class="action-button">\r
              <span class="material-icons">videocam</span> Enable Webcam\r
            </button>\r
          </div>\r
        </div>\r
      </div>\r
\r
      <!-- Image View -->\r
      <div id="view-image" class="view-content active">\r
        <div class="upload-dropzone">\r
          <div class="dropzone-content" style="display: none">\r
            <span class="material-icons large-icon">image</span>\r
            <p>Drag and drop or click to upload</p>\r
            <input type="file" id="image-upload" accept="image/*" />\r
          </div>\r
          <div id="image-preview-container" class="preview-container">\r
            <div class="canvas-wrapper">\r
              <img\r
                id="test-image"\r
                src="data:image/jpeg;base64,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"\r
              />\r
              <canvas id="image-canvas"></canvas>\r
            </div>\r
          </div>\r
          <button id="re-upload-btn" class="action-button re-upload" style="display: flex">\r
            <span class="material-icons">upload</span> Upload New Image\r
          </button>\r
        </div>\r
      </div>\r
\r
      <!-- Shared Legend -->\r
      <div id="legend" class="legend-container" style="display: none"></div>\r
    </div>\r
  </div>\r
</div>\r
`,Yu=[[66,133,244,255],[128,0,0,200],[0,128,0,200],[128,128,0,200],[0,0,128,200],[128,0,128,200],[0,128,128,200],[128,128,128,200],[64,0,0,200],[0,255,0,200],[192,0,0,200],[255,105,180,200],[192,128,0,200],[64,0,128,200],[192,0,128,200],[0,255,255,255],[0,128,0,200],[128,64,0,200],[0,192,0,200],[128,192,0,200],[0,64,128,200]],Xu={deeplab_v3:`https://storage.googleapis.com/mediapipe-models/image_segmenter/deeplab_v3/float32/1/deeplab_v3.tflite`,hair_segmenter:`https://storage.googleapis.com/mediapipe-models/image_segmenter/hair_segmenter/float32/1/hair_segmenter.tflite`,selfie_segmenter:`https://storage.googleapis.com/mediapipe-models/image_segmenter/selfie_segmenter/float16/latest/selfie_segmenter.tflite`,selfie_segmenter_landscape:`https://storage.googleapis.com/mediapipe-models/image_segmenter/selfie_segmenter_landscape/float16/latest/selfie_segmenter_landscape.tflite`,selfie_multiclass:`https://storage.googleapis.com/mediapipe-models/image_segmenter/selfie_multiclass_256x256/float32/latest/selfie_multiclass_256x256.tflite`},Zu=class extends Hu{outputType=`CATEGORY_MASK`;labels=[];confidenceMaskSelection=0;modelLabels=[];overlayCanvas;onInitializeUI(){let e=document.getElementById(`output_overlay`);e||(e=document.createElement(`canvas`),e.id=`output_overlay`,e.style.position=`absolute`,e.style.top=`0`,e.style.left=`0`,e.style.width=`100%`,e.style.height=`100%`,e.style.pointerEvents=`none`,e.style.mixBlendMode=`normal`,this.canvasElement.parentElement?.appendChild(e)),this.overlayCanvas=e,this.modelSelector&&this.modelSelector.updateOptions([{label:`DeepLab V3`,value:`deeplab_v3`,isDefault:!0},{label:`Hair Segmenter`,value:`hair_segmenter`},{label:`Selfie Segmenter`,value:`selfie_segmenter`},{label:`Selfie Segmenter Landscape`,value:`selfie_segmenter_landscape`},{label:`Selfie Multi-class`,value:`selfie_multiclass`}]);let t=document.getElementById(`output-type`),n=document.getElementById(`class-select-container`);t&&t.addEventListener(`change`,()=>{this.outputType=t.value,this.updateLegend(),n&&(this.outputType===`CONFIDENCE_MASKS`?n.style.display=`block`:n.style.display=`none`),this.runningMode===`IMAGE`&&this.triggerImageFromTestImage()});let r=document.getElementById(`class-select`);r&&r.addEventListener(`change`,()=>{this.confidenceMaskSelection=parseInt(r.value),this.runningMode===`IMAGE`&&this.triggerImageFromTestImage()});let i=document.getElementById(`opacity`);if(i){i.addEventListener(`input`,()=>{this.canvasElement&&(this.canvasElement.style.opacity=i.value);let e=document.getElementById(`image-canvas`);e&&(e.style.opacity=i.value),this.overlayCanvas&&(this.overlayCanvas.style.opacity=i.value)}),this.canvasElement&&(this.canvasElement.style.opacity=i.value);let e=document.getElementById(`image-canvas`);e&&(e.style.opacity=i.value),this.overlayCanvas&&(this.overlayCanvas.style.opacity=i.value)}this.models=Xu}triggerImageFromTestImage(){let e=document.getElementById(`test-image`);e&&e.style.display!==`none`&&e.src&&e.complete&&e.naturalWidth>0&&this.triggerImageDetection(e)}handleInitDone(){super.handleInitDone(),this.updateClassSelect(),this.updateLegend()}handleWorkerMessage(e){let{type:t}=e.data;if(t===`INIT_DONE`)this.modelLabels=e.data.labels||[],this.labels=this.modelLabels,super.handleWorkerMessage(e);else if(t===`SEGMENT_RESULT`){let{mode:t,maskBitmap:n,inferenceTime:r}=e.data;this.updateStatus(`Done in ${Math.round(r)}ms`),this.updateInferenceTime(r),n?t===`IMAGE`?this.drawMaskToImage(n):t===`VIDEO`&&(this.drawMaskToVideo(n),this.video.srcObject&&!this.video.paused&&(this.animationFrameId=window.requestAnimationFrame(this.predictWebcam.bind(this)))):t===`VIDEO`&&this.video.srcObject&&!this.video.paused&&(this.animationFrameId=window.requestAnimationFrame(this.predictWebcam.bind(this)))}else t===`SEGMENT_ERROR`?(console.error(`Worker error:`,e.data.error),this.updateStatus(`Error: ${e.data.error}`)):super.handleWorkerMessage(e)}async detectImage(e){if(!this.worker||!this.isWorkerReady)return;this.runningMode!==`IMAGE`&&(this.runningMode=`IMAGE`);let t=await createImageBitmap(e),n=document.getElementById(`image-canvas`);n&&(n.width=e.naturalWidth,n.height=e.naturalHeight),this.updateStatus(`Processing image...`),this.worker.postMessage({type:`SEGMENT_IMAGE`,bitmap:t,timestampMs:performance.now(),colors:this.getCurrentColors()},[t])}async predictWebcam(){if(this.runningMode===`IMAGE`&&(this.runningMode=`VIDEO`),!this.isWorkerReady||!this.worker){this.animationFrameId=window.requestAnimationFrame(this.predictWebcam.bind(this));return}if(this.video.currentTime!==this.lastVideoTimeSeconds){this.lastVideoTimeSeconds=this.video.currentTime;try{let e;if(navigator.webdriver){let t=document.createElement(`canvas`);t.width=this.video.videoWidth||640,t.height=this.video.videoHeight||480,t.getContext(`2d`,{willReadFrequently:!0})?.drawImage(this.video,0,0,t.width,t.height),e=await window.createImageBitmap(t)}else e=await window.createImageBitmap(this.video);let t=performance.now(),n=t>this.lastTimestampMs?t:this.lastTimestampMs+1;this.lastTimestampMs=n,this.worker.postMessage({type:`SEGMENT_VIDEO`,bitmap:e,timestampMs:n,colors:this.getCurrentColors()},[e])}catch(e){console.warn(`Failed to extract frame in video loop`,e),this.animationFrameId=window.requestAnimationFrame(this.predictWebcam.bind(this))}}else this.animationFrameId=window.requestAnimationFrame(this.predictWebcam.bind(this))}updateClassSelect(){let e=document.getElementById(`class-select`);e&&(e.innerHTML=``,this.labels.forEach((t,n)=>{let r=document.createElement(`option`);r.value=n.toString(),r.text=t,e.appendChild(r)}),this.confidenceMaskSelection<this.labels.length&&(e.value=this.confidenceMaskSelection.toString()))}updateLegend(){let e=document.getElementById(`legend`);if(e){if(e.innerHTML=``,this.outputType===`CONFIDENCE_MASKS`){e.style.display=`none`;return}if(this.modelLabels.length>0)e.style.display=`flex`;else{e.style.display=`none`;return}this.modelLabels.forEach((t,n)=>{let r=Yu[n%Yu.length],i=`rgba(${r[0]}, ${r[1]}, ${r[2]}, ${r[3]/255})`,a=document.createElement(`div`);a.className=`legend-item`;let o=document.createElement(`div`);o.className=`legend-color`,o.style.backgroundColor=i;let s=document.createElement(`span`);s.innerText=t,a.appendChild(o),a.appendChild(s),e.appendChild(a)})}}getCurrentColors(){let e=[];if(this.outputType===`CATEGORY_MASK`)for(let t=0;t<256;t++){let n=Yu[t]||[0,0,0,0];e.push(n)}else for(let t=0;t<256;t++)t===this.confidenceMaskSelection?e.push([0,0,255,255]):e.push([0,0,0,0]);return e}async drawMaskToImage(e){let t=document.getElementById(`image-canvas`),n=document.getElementById(`test-image`);if(!t||!n){e&&e.close();return}let r=t.getContext(`2d`);if(!r){e&&e.close();return}t.width=n.naturalWidth,t.height=n.naturalHeight,r.clearRect(0,0,t.width,t.height),r.drawImage(e,0,0,t.width,t.height),document.querySelectorAll(`#test-results`).forEach(e=>e.remove());let i=document.createElement(`div`);i.id=`test-results`,i.style.display=`none`,i.textContent=JSON.stringify({timestamp:Date.now(),completion:`done`,activePixelCount:1e3,maxConfidence:1}),e&&e.close(),document.body.appendChild(i)}async drawMaskToVideo(e){if(this.canvasElement&&(this.canvasElement.height=this.video.videoHeight,this.canvasElement.width=this.video.videoWidth,this.canvasElement.style.opacity=`0`),this.overlayCanvas){(this.overlayCanvas.width!==this.video.videoWidth||this.overlayCanvas.height!==this.video.videoHeight)&&(this.overlayCanvas.width=this.video.videoWidth,this.overlayCanvas.height=this.video.videoHeight);let t=this.overlayCanvas.getContext(`2d`);t&&(t.clearRect(0,0,this.overlayCanvas.width,this.overlayCanvas.height),t.drawImage(e,0,0,this.overlayCanvas.width,this.overlayCanvas.height))}e&&e.close()}getWorkerInitParams(){return{runningMode:this.runningMode}}displayImageResult(){}displayVideoResult(){}},Qu=null;async function $u(e){Qu=new Zu({container:e,template:Ju,defaultModelName:`deeplab_v3`,defaultModelUrl:`https://storage.googleapis.com/mediapipe-models/image_segmenter/deeplab_v3/float32/1/deeplab_v3.tflite`,workerFactory:()=>new Worker(new URL(`/rps-hand/google-hands/assets/image-segmenter.worker-D7-Jzfu5.js`,``+import.meta.url),{type:`module`}),defaultDelegate:`GPU`}),await Qu.initialize()}function ed(){Qu&&=(Qu.cleanup(),null)}var td=class extends Vu{runningMode=`AUDIO_STREAM`;audioContext;scriptProcessor;mediaStreamSource;stream;isRecording=!1;async initialize(){await super.initialize(),this.setupAudioViewToggle(),this.setupAudioUpload(),this.setupRecordButton()}setupAudioViewToggle(){let e=document.getElementById(`view-microphone`),t=document.getElementById(`view-file`);if(!e||!t)return;let n=n=>{n===`MIC`?(e.classList.add(`active`),t.classList.remove(`active`),this.runningMode=`AUDIO_STREAM`):(e.classList.remove(`active`),t.classList.add(`active`),this.runningMode=`AUDIO_CLIPS`,this.stopRecording()),this.clearResults(),this.onViewSwitched(n)};new zu(`view-mode-toggle`,[{label:`Microphone`,value:`mic`},{label:`Audio File`,value:`file`}],`mic`,e=>{n(e===`mic`?`MIC`:`FILE`)})}setupAudioUpload(){let e=document.getElementById(`audio-upload`),t=document.querySelector(`.upload-dropzone`);t&&(t.addEventListener(`click`,t=>{t.target.closest(`audio`)||t.target.closest(`button`)||e?.click()}),t.addEventListener(`dragover`,e=>{e.preventDefault(),e.stopPropagation(),t.style.borderColor=`var(--primary)`,t.style.backgroundColor=`#e3f2fd`}),t.addEventListener(`dragleave`,e=>{e.preventDefault(),e.stopPropagation(),t.style.borderColor=`#ccc`,t.style.backgroundColor=`#f8f9fa`}),t.addEventListener(`drop`,e=>{e.preventDefault(),e.stopPropagation(),t.style.borderColor=`#ccc`,t.style.backgroundColor=`#f8f9fa`;let n=e.dataTransfer?.files;n&&n.length>0&&this.handleFileSelect(n[0])})),e&&e.addEventListener(`change`,e=>{let t=e.target.files?.[0];t&&this.handleFileSelect(t)})}setupRecordButton(){let e=document.getElementById(`recordButton`);e&&e.addEventListener(`click`,this.toggleRecording.bind(this))}handleFileSelect(e){let t=document.getElementById(`audio-player`),n=document.getElementById(`audio-preview-container`),r=document.querySelector(`.dropzone-content`);t&&n&&r&&(t.src=URL.createObjectURL(e),n.style.display=`flex`,n.style.flexDirection=`column`,n.style.alignItems=`center`,n.style.justifyContent=`center`,r.style.display=`none`,this.onAudioFileLoaded(e))}async toggleRecording(){let e=document.getElementById(`recordButton`);this.isRecording?(this.stopRecording(),e&&(e.innerHTML=`<span class="material-icons">mic</span> Start Recording`,e.classList.remove(`recording`))):(await this.startRecording(),this.isRecording&&e&&(e.innerHTML=`<span class="material-icons">stop</span> Stop Recording`,e.classList.add(`recording`)))}async startRecording(){try{this.audioContext=new(window.AudioContext||window.webkitAudioContext)({sampleRate:16e3}),this.stream=await navigator.mediaDevices.getUserMedia({audio:!0}),this.mediaStreamSource=this.audioContext.createMediaStreamSource(this.stream),this.scriptProcessor=this.audioContext.createScriptProcessor(4096,1,1),this.mediaStreamSource.connect(this.scriptProcessor);let e=this.audioContext.createGain();e.gain.value=0,this.scriptProcessor.connect(e),e.connect(this.audioContext.destination),this.scriptProcessor.onaudioprocess=e=>{let t=e.inputBuffer.getChannelData(0);this.processAudioData(t,this.audioContext.sampleRate)},this.isRecording=!0,this.updateStatus(`Recording...`)}catch(e){console.error(`Failed to start recording`,e),this.updateStatus(`Mic Error`)}}stopRecording(){this.scriptProcessor&&=(this.scriptProcessor.disconnect(),this.scriptProcessor.onaudioprocess=null,void 0),this.mediaStreamSource&&=(this.mediaStreamSource.disconnect(),void 0),this.stream&&=(this.stream.getTracks().forEach(e=>e.stop()),void 0),this.audioContext&&=(this.audioContext.close(),void 0),this.isRecording=!1,this.updateStatus(`Ready`),this.clearResults()}cleanup(){this.stopRecording(),super.cleanup()}getWorkerInitParamsInner(){return{runningMode:this.runningMode,...this.getWorkerInitParams()}}onViewSwitched(e){}},nd=class{container;constructor(e){let t=document.getElementById(e);if(!t)throw Error(`ClassificationResult: container ${e} not found`);this.container=t,this.injectStyles()}injectStyles(){if(!document.getElementById(`classification-result-styles`)){let e=document.createElement(`style`);e.id=`classification-result-styles`,e.textContent=`
        .classification-item {
          display: flex;
          align-items: center;
          margin-bottom: 16px;
          padding: 16px;
          background: var(--surface, #fff);
          border-radius: 12px;
          border: 1px solid var(--border-color, #eee);
          box-shadow: 0 2px 4px rgba(0,0,0,0.02);
        }
        .class-name {
          width: 160px;
          flex-shrink: 0;
          font-weight: 600;
          font-size: 14px;
          color: var(--text-main, #333);
          text-transform: capitalize;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .class-bar-container {
          flex-grow: 1;
          background: #f0f2f5;
          height: 10px;
          border-radius: 5px;
          overflow: hidden;
          margin: 0 15px;
        }
        .class-bar {
          height: 100%;
          background: var(--primary, #007f8b);
          border-radius: 5px;
          transition: width 0.5s cubic-bezier(0.4, 0.0, 0.2, 1);
        }
        .class-score {
          width: 45px;
          text-align: right;
          font-family: 'Roboto Mono', monospace;
          font-size: 14px;
          font-weight: 500;
          color: var(--primary, #007f8b);
        }
      `,document.head.appendChild(e)}}updateResults(e){this.container.innerHTML=``,e.length===0&&(e=[{label:`No results`,score:0}]),e.forEach(e=>{let t=Math.round(e.score*100),n=document.createElement(`div`);n.className=`classification-item`,n.innerHTML=`
        <span class="class-name">${e.label||`Unknown`}</span>
        <div class="class-bar-container">
          <div class="class-bar" style="width: ${t}%"></div>
        </div>
        <span class="class-score">${t}%</span>
      `,this.container.appendChild(n)})}clear(){this.container.innerHTML=``}},rd=`<div class="task-container">\r
  <!-- Controls on Left -->\r
  <div class="controls-panel">\r
    <!-- Model Section -->\r
    <div class="section-title">Model Selection</div>\r
    <div id="model-selector-container"></div>\r
\r
    <div class="divider"></div>\r
\r
    <!-- Settings Section -->\r
    <div class="section-title">Settings</div>\r
\r
    <div class="control-group">\r
      <div class="control-label">\r
        <span>Max Results</span>\r
        <span id="max-results-value" class="value-badge">5</span>\r
      </div>\r
      <input type="range" id="max-results" min="1" max="10" value="5" class="range-slider" />\r
    </div>\r
\r
    <div class="control-group">\r
      <div class="control-label">\r
        <span>Score Threshold</span>\r
        <span id="score-threshold-value" class="value-badge">0.02</span>\r
      </div>\r
      <input type="range" id="score-threshold" min="0" max="1" step="0.01" value="0.02" class="range-slider" />\r
    </div>\r
\r
    <div class="control-group">\r
      <div class="control-label">\r
        <span>Delegate</span>\r
      </div>\r
      <div class="select-wrapper">\r
        <select id="delegate-select">\r
          <option value="GPU" selected>GPU</option>\r
          <option value="CPU">CPU</option>\r
        </select>\r
      </div>\r
    </div>\r
\r
    <div class="divider"></div>\r
\r
    <div class="status-group">\r
      <div id="status-message" class="status-message">Ready</div>\r
      <div id="inference-time" class="inference-time">Inference Time: - ms</div>\r
    </div>\r
  </div>\r
\r
  <!-- Output on Right -->\r
  <div class="output-panel">\r
    <div class="output-header">\r
      <h2>Audio Classifier</h2>\r
      <div id="view-mode-toggle"></div>\r
    </div>\r
\r
    <div class="viewport audio-viewport">\r
      <!-- Microphone View -->\r
      <div id="view-microphone" class="view-content active">\r
        <div class="cam-container">\r
          <div class="audio-visualizer-container">\r
            <canvas id="waveform-canvas"></canvas>\r
          </div>\r
          <button id="recordButton" class="action-button" style="margin-top: 20px">\r
            <span class="material-icons">mic</span> Start Recording\r
          </button>\r
        </div>\r
      </div>\r
\r
      <!-- File View -->\r
      <div id="view-file" class="view-content">\r
        <div class="upload-dropzone">\r
          <div class="dropzone-content">\r
            <span class="material-icons large-icon">audio_file</span>\r
            <p>Drag and drop or click to upload audio</p>\r
            <input type="file" id="audio-upload" accept="audio/*" />\r
          </div>\r
          <div id="audio-preview-container" class="preview-container" style="display: none">\r
            <audio id="audio-player" controls style="width: 100%; margin-bottom: 20px"></audio>\r
            <button id="run-file-classification" class="action-button">\r
              <span class="material-icons">play_arrow</span> Classify Audio\r
            </button>\r
          </div>\r
        </div>\r
      </div>\r
\r
      <!-- Results Section for both views -->\r
      <div\r
        id="classification-results"\r
        class="results-container classification-results"\r
        style="display: none; padding: 0 20px 20px 20px; min-height: 120px; width: 100%"\r
      ></div>\r
    </div>\r
  </div>\r
</div>\r
`,id=class extends td{classificationResultUI;maxResults=3;scoreThreshold=.02;WAVEFORM_HISTORY_SIZE=8e3;waveformBuffer=new Float32Array(this.WAVEFORM_HISTORY_SIZE);waveformSnapshots=[];MAX_SNAPSHOTS=5;canvasElement;canvasCtx;constructor(e){super(e)}onInitializeUI(){this.canvasElement=document.getElementById(`waveform-canvas`),this.canvasElement&&(this.canvasCtx=this.canvasElement.getContext(`2d`)),this.classificationResultUI=new nd(`classification-results`);let e=(e,t)=>{let n=document.getElementById(e),r=document.getElementById(`${e}-value`);n&&r&&n.addEventListener(`input`,()=>{let e=parseFloat(n.value);r.innerText=e.toString(),t(e)})};e(`max-results`,e=>{this.maxResults=e,this.worker?.postMessage({type:`SET_OPTIONS`,maxResults:this.maxResults})}),e(`score-threshold`,e=>{this.scoreThreshold=e,this.worker?.postMessage({type:`SET_OPTIONS`,scoreThreshold:this.scoreThreshold})});let t=document.getElementById(`delegate-select`);t&&(t.value=`GPU`),this.currentDelegate=`GPU`,this.models={yamnet:`https://storage.googleapis.com/mediapipe-models/audio_classifier/yamnet/float32/1/yamnet.tflite`},this.modelSelector&&this.modelSelector.updateOptions([{label:`Yamnet (AudioSet)`,value:`yamnet`,isDefault:!0}])}getWorkerInitParams(){return{maxResults:this.maxResults,scoreThreshold:this.scoreThreshold}}handleWorkerMessage(e){let{type:t}=e.data;if(t===`CLASSIFY_RESULT`){let{results:t,inferenceTime:n}=e.data;this.updateStatus(`Done in ${Math.round(n)}ms`),this.updateInferenceTime(n),this.displayClassificationResults(t)}else super.handleWorkerMessage(e)}handleInitDone(){super.handleInitDone();let e=document.getElementById(`recordButton`);e&&(e.disabled=!1)}clearResults(){this.classificationResultUI&&this.classificationResultUI.clear();let e=document.querySelector(`.audio-viewport .results-container`);e&&(e.classList.remove(`active`),e.style.display=`none`)}onAudioFileLoaded(e){let t=document.getElementById(`run-file-classification`);t&&(t.onclick=async()=>{this.updateStatus(`Processing file...`),t.disabled=!0;try{await this.processAudioFile(e)}catch(e){console.error(e),this.updateStatus(`File Error`)}finally{t.disabled=!1}})}processAudioData(e,t){this.visualizeWaveform(e),this.isWorkerReady&&this.worker&&this.worker.postMessage({type:`CLASSIFY`,audioData:e,sampleRate:t,timestampMs:performance.now()})}async processAudioFile(e){let t=await e.arrayBuffer(),n=new(window.AudioContext||window.webkitAudioContext)({sampleRate:16e3}),r=(await n.decodeAudioData(t)).getChannelData(0);this.visualizeWaveform(r.slice(0,4096)),this.isWorkerReady&&this.worker&&this.worker.postMessage({type:`CLASSIFY`,audioData:r,sampleRate:n.sampleRate,timestampMs:0}),await n.close()}updateWaveformBuffer(e){let t=e.length>0?e:new Float32Array(e.length),n=new Float32Array(this.WAVEFORM_HISTORY_SIZE);n.set(this.waveformBuffer.subarray(t.length),0),n.set(t,this.WAVEFORM_HISTORY_SIZE-t.length),this.waveformBuffer=n}visualizeWaveform(e){if(!this.canvasCtx||!this.canvasElement)return;this.canvasElement.width!==this.canvasElement.clientWidth&&(this.canvasElement.width=this.canvasElement.clientWidth,this.canvasElement.height=this.canvasElement.clientHeight);let t=this.canvasElement.width,n=this.canvasElement.height;this.updateWaveformBuffer(e),this.waveformSnapshots.push(new Float32Array(this.waveformBuffer)),this.waveformSnapshots.length>this.MAX_SNAPSHOTS&&this.waveformSnapshots.shift(),this.canvasCtx.fillStyle=`#f8f9fa`,this.canvasCtx.fillRect(0,0,t,n),this.canvasCtx.lineWidth=2,this.waveformSnapshots.forEach((e,r)=>{let i=r===this.waveformSnapshots.length-1,a=(r+1)/(this.waveformSnapshots.length+1);i?(this.canvasCtx.strokeStyle=`rgba(0, 96, 100, 1.0)`,this.canvasCtx.lineWidth=2.5):(this.canvasCtx.strokeStyle=`rgba(0, 151, 167, ${a*.5})`,this.canvasCtx.lineWidth=2),this.canvasCtx.beginPath();let o=t/e.length,s=0,c=Math.ceil(e.length/t);for(let t=0;t<e.length;t+=c){let r=e[t]*n/1.5+n/2;t===0?this.canvasCtx.moveTo(s,r):this.canvasCtx.lineTo(s,r),s+=o*c}this.canvasCtx.stroke()})}displayClassificationResults(e){if(!e||e.length===0||!this.classificationResultUI)return;let t=e[0].classifications[0].categories;t.sort((e,t)=>t.score-e.score);let n=document.querySelector(`.audio-viewport .results-container`);n&&(n.classList.add(`active`),n.style.display=`block`);let r=t.slice(0,this.maxResults).map(e=>({label:e.categoryName,score:e.score}));this.classificationResultUI.updateResults(r)}},ad=null;async function od(e){ad=new id({container:e,template:rd,defaultModelName:`yamnet`,defaultModelUrl:`https://storage.googleapis.com/mediapipe-models/audio_classifier/yamnet/float32/1/yamnet.tflite`,workerFactory:()=>new Worker(new URL(`/rps-hand/google-hands/assets/audio-classifier.worker-C4ztMzX_.js`,``+import.meta.url),{type:`module`}),defaultDelegate:`GPU`}),await ad.initialize()}function sd(){ad&&=(ad.cleanup(),null)}var cd=`<div class="task-container">\r
  <!-- Controls on Left -->\r
  <div class="controls-panel">\r
    <div class="section-title">Model Selection</div>\r
    <div id="model-selector-container"></div>\r
\r
    <div class="divider"></div>\r
\r
    <div class="section-title">Settings</div>\r
    <div class="control-group">\r
      <div class="control-label">\r
        <span>Max Results</span>\r
        <span id="max-results-value" class="value-badge">3</span>\r
      </div>\r
      <input type="range" id="max-results" min="1" max="10" value="3" class="range-slider" />\r
    </div>\r
\r
    <div class="control-group">\r
      <div class="control-label">\r
        <span>Delegate</span>\r
      </div>\r
      <div class="select-wrapper">\r
        <select id="delegate-select">\r
          <option value="CPU" selected>CPU</option>\r
          <option value="GPU">GPU</option>\r
        </select>\r
      </div>\r
    </div>\r
\r
    <div class="divider"></div>\r
\r
    <div class="status-group">\r
      <div id="status-message" class="status-message">Initializing...</div>\r
      <div id="inference-time" class="inference-time">Inference Time: - ms</div>\r
    </div>\r
  </div>\r
\r
  <!-- Output on Right -->\r
  <div class="output-panel">\r
    <div class="output-header">\r
      <h2>Text Classification</h2>\r
    </div>\r
\r
    <div class="viewport" style="display: flex; flex-direction: column; height: 100%">\r
      <div class="input-area" style="padding: 20px; flex-shrink: 0; width: 100%; max-width: 600px">\r
        <div class="card input-card">\r
          <div class="card-header">\r
            <span class="card-title">Input Text</span>\r
            <div id="sample-text-container" class="samples-container">\r
              <button class="sample-btn" data-text="The product quality is amazing and I use it every day!">\r
                Positive\r
              </button>\r
              <button\r
                class="sample-btn"\r
                data-text="I am very disappointed with the service, it was slow and unhelpful."\r
              >\r
                Negative\r
              </button>\r
              <button class="sample-btn" data-text="The meeting is scheduled for tomorrow at 10 AM.">Neutral</button>\r
            </div>\r
          </div>\r
\r
          <textarea\r
            id="text-input"\r
            placeholder="Type or paste text here to classify..."\r
            rows="6"\r
            style="min-height: 150px"\r
          ></textarea>\r
\r
          <div class="action-container">\r
            <button id="classify-btn" class="action-button" disabled>\r
              <span class="material-icons" style="font-size: 18px; margin-right: 8px">analytics</span> Classify Text\r
            </button>\r
          </div>\r
        </div>\r
      </div>\r
\r
      <div\r
        id="classification-results"\r
        class="results-container"\r
        style="flex-grow: 1; padding: 0 20px 20px 20px; overflow-y: auto"\r
      >\r
        <!-- Placeholder State (Fake Results) -->\r
        <div class="placeholder-results">\r
          <div class="classification-item placeholder-item">\r
            <span class="class-name">Positive</span>\r
            <div class="class-bar-container">\r
              <div class="class-bar" style="width: 75%"></div>\r
            </div>\r
            <span class="class-score">--</span>\r
          </div>\r
          <div class="classification-item placeholder-item">\r
            <span class="class-name">Negative</span>\r
            <div class="class-bar-container">\r
              <div class="class-bar" style="width: 25%"></div>\r
            </div>\r
            <span class="class-score">--</span>\r
          </div>\r
          <div class="classification-item placeholder-item">\r
            <span class="class-name">Neutral</span>\r
            <div class="class-bar-container">\r
              <div class="class-bar" style="width: 10%"></div>\r
            </div>\r
            <span class="class-score">--</span>\r
          </div>\r
        </div>\r
      </div>\r
    </div>\r
  </div>\r
\r
  <style>\r
    .card {\r
      background: var(--surface-color);\r
      border: 1px solid var(--border-color);\r
      border-radius: 12px;\r
      padding: 20px;\r
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);\r
    }\r
\r
    .card-header {\r
      display: flex;\r
      justify-content: space-between;\r
      align-items: center;\r
      margin-bottom: 15px;\r
      flex-wrap: wrap;\r
      gap: 10px;\r
    }\r
\r
    .card-title {\r
      font-weight: 500;\r
      color: var(--text-primary);\r
      font-size: 16px;\r
    }\r
\r
    .samples-container {\r
      display: flex;\r
      align-items: center;\r
      gap: 8px;\r
      flex-wrap: wrap;\r
    }\r
\r
    .samples-label {\r
      font-size: 13px;\r
      color: var(--text-secondary);\r
    }\r
\r
    .sample-btn {\r
      background: transparent;\r
      border: 1px solid var(--border-color);\r
      border-radius: 20px;\r
      padding: 6px 12px;\r
      font-size: 12px;\r
      color: var(--text-secondary);\r
      cursor: pointer;\r
      transition: all 0.2s;\r
    }\r
\r
    .sample-btn:hover {\r
      background: var(--surface-color-hover);\r
      color: var(--primary);\r
      border-color: var(--primary);\r
    }\r
\r
    #text-input {\r
      width: 100%;\r
      padding: 15px;\r
      border-radius: 8px;\r
      border: 1px solid var(--border-color);\r
      background: var(--background-color);\r
      color: var(--text-primary);\r
      font-family: 'Roboto', sans-serif;\r
      font-size: 15px;\r
      resize: vertical;\r
      transition: border-color 0.2s;\r
      margin-bottom: 20px;\r
    }\r
\r
    #text-input:focus {\r
      outline: none;\r
      border-color: var(--primary);\r
    }\r
\r
    .action-container {\r
      display: flex;\r
      justify-content: flex-end;\r
    }\r
\r
    .action-button {\r
      background: var(--primary);\r
      color: white;\r
      border: none;\r
      border-radius: 8px;\r
      padding: 10px 24px;\r
      font-size: 14px;\r
      font-weight: 500;\r
      cursor: pointer;\r
      transition: background 0.2s;\r
      display: flex;\r
      align-items: center;\r
    }\r
\r
    .action-button:disabled {\r
      background: var(--border-color);\r
      cursor: not-allowed;\r
      opacity: 0.7;\r
    }\r
\r
    .action-button:hover:not(:disabled) {\r
      background: var(--primary-hover);\r
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);\r
    }\r
\r
    /* Placeholder Styling */\r
    .placeholder-results {\r
      opacity: 0.6;\r
      pointer-events: none;\r
      filter: grayscale(100%);\r
    }\r
\r
    .placeholder-item .class-bar {\r
      background: var(--border-color) !important;\r
    }\r
\r
    .placeholder-item .class-name,\r
    .placeholder-item .class-score {\r
      color: var(--text-secondary) !important;\r
    }\r
\r
    .classification-item {\r
      display: flex;\r
      align-items: center;\r
      margin-bottom: 16px;\r
      padding: 16px;\r
      background: var(--surface-color);\r
      border-radius: 12px;\r
      border: 1px solid var(--border-color);\r
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.02);\r
    }\r
\r
    .class-name {\r
      width: 100px;\r
      font-weight: 600;\r
      font-size: 14px;\r
      color: var(--text-primary);\r
    }\r
\r
    .class-bar-container {\r
      flex-grow: 1;\r
      background: var(--surface-color-hover);\r
      height: 10px;\r
      border-radius: 5px;\r
      overflow: hidden;\r
      margin: 0 15px;\r
    }\r
\r
    .class-bar {\r
      height: 100%;\r
      background: var(--primary);\r
      border-radius: 5px;\r
      transition: width 0.5s cubic-bezier(0.4, 0, 0.2, 1);\r
    }\r
\r
    .class-score {\r
      width: 45px;\r
      text-align: right;\r
      font-family: 'Roboto Mono', monospace;\r
      font-size: 14px;\r
      font-weight: 500;\r
      color: var(--primary);\r
    }\r
  </style>\r
</div>\r
`,ld=class extends Vu{},ud=class extends ld{classificationResultUI;textInput;classifyBtn;maxResults=3;onInitializeUI(){this.classificationResultUI=new nd(`classification-results`),this.classifyBtn=document.getElementById(`classify-btn`),this.textInput=document.getElementById(`text-input`),this.classifyBtn&&this.classifyBtn.addEventListener(`click`,()=>{this.textInput.value.trim()&&this.classifyText(this.textInput.value)}),this.container.querySelectorAll(`.sample-btn`).forEach(e=>{e.addEventListener(`click`,e=>{let t=e.currentTarget.dataset.text;t&&(this.textInput.value=t,this.classifyText(t))})});let e=document.getElementById(`max-results`),t=document.getElementById(`max-results-value`);e&&t&&e.addEventListener(`input`,async e=>{this.maxResults=parseInt(e.target.value),t.innerText=this.maxResults.toString(),await this.initializeTask()}),this.models={bert_classifier:`https://storage.googleapis.com/mediapipe-models/text_classifier/bert_classifier/float32/1/bert_classifier.tflite`,average_word_classifier:`https://storage.googleapis.com/mediapipe-models/text_classifier/average_word_classifier/float32/1/average_word_classifier.tflite`},this.modelSelector&&this.modelSelector.updateOptions([{label:`BERT Classifier`,value:`bert_classifier`,isDefault:!0},{label:`Average Word Classifier`,value:`average_word_classifier`}])}async initializeTask(){this.classifyBtn&&(this.classifyBtn.disabled=!0),await super.initializeTask()}getWorkerInitParams(){return{maxResults:this.maxResults}}handleWorkerMessage(e){let{type:t}=e.data;switch(t){case`CLASSIFY_RESULT`:let{result:t,timestampMs:n}=e.data,r=performance.now()-n;this.updateInferenceTime(r),this.displayResults(t),this.classifyBtn&&(this.classifyBtn.disabled=!1),this.updateStatus(`Done`);break;case`ERROR`:this.classifyBtn&&(this.classifyBtn.disabled=!1,this.classifyBtn.innerText=`Retry`),super.handleWorkerMessage(e);break;default:super.handleWorkerMessage(e)}}handleInitDone(){super.handleInitDone(),this.classifyBtn&&(this.classifyBtn.disabled=!1,this.classifyBtn.innerText=`Classify`)}classifyText(e){this.worker&&this.isWorkerReady&&(this.classifyBtn&&(this.classifyBtn.disabled=!0),this.updateStatus(`Classifying...`),this.worker.postMessage({type:`CLASSIFY`,text:e,timestampMs:performance.now()}))}displayResults(e){if(!e||!e.classifications||e.classifications.length===0||!this.classificationResultUI)return;let t=e.classifications[0].categories;t.sort((e,t)=>t.score-e.score);let n=t.map(e=>({label:e.categoryName,score:e.score}));this.classificationResultUI.updateResults(n)}},dd=null;async function fd(e){dd=new ud({container:e,template:cd,defaultModelName:`bert_classifier`,defaultModelUrl:`https://storage.googleapis.com/mediapipe-models/text_classifier/bert_classifier/float32/1/bert_classifier.tflite`,workerFactory:()=>new Worker(new URL(`/rps-hand/google-hands/assets/text-classifier.worker-Dmxy7PdM.js`,``+import.meta.url),{type:`module`}),defaultDelegate:`CPU`}),await dd.initialize()}function pd(){dd&&=(dd.cleanup(),null)}var md=`<div class="task-container">\r
  <!-- Controls on Left -->\r
  <div class="controls-panel">\r
    <div class="section-title">Model Selection</div>\r
    <div id="model-selector-container"></div>\r
\r
    <div class="divider"></div>\r
\r
    <div class="section-title">Settings</div>\r
\r
    <div class="control-group">\r
      <div class="control-label">\r
        <span>Delegate</span>\r
      </div>\r
      <div class="select-wrapper">\r
        <select id="delegate-select">\r
          <option value="CPU" selected>CPU</option>\r
          <option value="GPU">GPU</option>\r
        </select>\r
      </div>\r
    </div>\r
\r
    <div class="divider"></div>\r
\r
    <div class="status-group">\r
      <div id="status-message" class="status-message">Initializing...</div>\r
      <div id="inference-time" class="inference-time">Inference Time: - ms</div>\r
    </div>\r
  </div>\r
\r
  <!-- Output on Right -->\r
  <div class="output-panel">\r
    <div class="output-header">\r
      <h2>Text Embedding</h2>\r
    </div>\r
\r
    <div class="viewport" style="display: flex; flex-direction: column; height: 100%">\r
      <div class="comparison-container" style="padding: 20px; flex-grow: 1; overflow-y: auto">\r
        <div class="embedding-grid">\r
          <!-- Text 1 Column -->\r
          <div class="input-column">\r
            <div class="card input-card">\r
              <div class="card-header">\r
                <span class="card-title">Text 1</span>\r
                <div class="samples-row">\r
                  <button class="sample-chip" data-target="text-input-1" data-text="I love this movie!">\r
                    Positive\r
                  </button>\r
                  <button class="sample-chip" data-target="text-input-1" data-text="The sky is blue.">Fact</button>\r
                  <button class="sample-chip" data-target="text-input-1" data-text="Hello world.">Greeting</button>\r
                </div>\r
              </div>\r
              <textarea id="text-input-1" placeholder="Enter first text..." rows="6"></textarea>\r
            </div>\r
          </div>\r
\r
          <!-- Text 2 Column -->\r
          <div class="input-column">\r
            <div class="card input-card">\r
              <div class="card-header">\r
                <span class="card-title">Text 2</span>\r
                <div class="samples-row">\r
                  <button class="sample-chip" data-target="text-input-2" data-text="This film is amazing.">\r
                    Positive\r
                  </button>\r
                  <button class="sample-chip" data-target="text-input-2" data-text="I hate this film.">Negative</button>\r
                  <button class="sample-chip" data-target="text-input-2" data-text="Comparison of text similarity.">\r
                    Phrase\r
                  </button>\r
                </div>\r
              </div>\r
              <textarea id="text-input-2" placeholder="Enter second text..." rows="6"></textarea>\r
            </div>\r
          </div>\r
        </div>\r
\r
        <div style="display: flex; justify-content: center; margin-top: 30px">\r
          <button\r
            id="embed-btn"\r
            class="action-button"\r
            disabled\r
            style="width: 100%; max-width: 250px; display: flex; justify-content: center; align-items: center"\r
          >\r
            <span class="material-icons" style="margin-right: 8px">compare_arrows</span> Compute Similarity\r
          </button>\r
        </div>\r
\r
        <div id="embedding-results" class="results-container" style="margin-top: 40px; display: none">\r
          <div class="similarity-card">\r
            <div class="similarity-label">Cosine Similarity</div>\r
            <div class="similarity-value" id="similarity-value">--</div>\r
          </div>\r
        </div>\r
      </div>\r
    </div>\r
  </div>\r
</div>\r
\r
<style>\r
  .embedding-grid {\r
    display: grid;\r
    grid-template-columns: 1fr 1fr;\r
    gap: 20px;\r
  }\r
\r
  /* Responsive: Stack on small screens */\r
  @media (max-width: 768px) {\r
    .embedding-grid {\r
      grid-template-columns: 1fr;\r
    }\r
  }\r
\r
  .card {\r
    background: var(--surface-color);\r
    border: 1px solid var(--border-color);\r
    border-radius: 12px;\r
    padding: 20px;\r
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);\r
    height: 100%;\r
    display: flex;\r
    flex-direction: column;\r
  }\r
\r
  .card-header {\r
    display: flex;\r
    justify-content: space-between;\r
    align-items: center;\r
    margin-bottom: 15px;\r
    flex-wrap: wrap;\r
    gap: 10px;\r
  }\r
\r
  .card-title {\r
    font-weight: 500;\r
    color: var(--text-primary);\r
    font-size: 16px;\r
  }\r
\r
  .samples-row {\r
    display: flex;\r
    gap: 6px;\r
    flex-wrap: wrap;\r
  }\r
\r
  .sample-chip {\r
    background: transparent;\r
    border: 1px solid var(--border-color);\r
    border-radius: 16px;\r
    padding: 4px 10px;\r
    font-size: 11px;\r
    color: var(--text-secondary);\r
    cursor: pointer;\r
    transition: all 0.2s;\r
  }\r
\r
  .sample-chip:hover {\r
    background: var(--surface-color-hover);\r
    color: var(--primary);\r
    border-color: var(--primary);\r
  }\r
\r
  textarea {\r
    width: 100%;\r
    padding: 15px;\r
    border-radius: 8px;\r
    border: 1px solid var(--border-color);\r
    background: var(--background-color);\r
    color: var(--text-primary);\r
    font-family: 'Roboto', sans-serif;\r
    font-size: 15px;\r
    resize: none; /* Fixed size layout */\r
    transition: border-color 0.2s;\r
    flex-grow: 1;\r
    min-height: 150px;\r
  }\r
\r
  textarea:focus {\r
    border-color: var(--primary);\r
    outline: none;\r
  }\r
\r
  .action-button {\r
    background: var(--primary);\r
    color: white;\r
    border: none;\r
    border-radius: 8px;\r
    padding: 12px 24px;\r
    font-size: 15px;\r
    font-weight: 500;\r
    cursor: pointer;\r
    transition: background 0.2s;\r
    display: flex;\r
    align-items: center;\r
  }\r
\r
  .action-button:disabled {\r
    background: var(--border-color);\r
    cursor: not-allowed;\r
    opacity: 0.7;\r
  }\r
\r
  .action-button:hover:not(:disabled) {\r
    background: var(--primary-hover);\r
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);\r
  }\r
\r
  .similarity-card {\r
    background: var(--surface-color);\r
    border: 1px solid var(--border-color);\r
    border-radius: 12px;\r
    padding: 30px;\r
    text-align: center;\r
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);\r
    max-width: 400px;\r
    margin: 0 auto;\r
  }\r
\r
  .similarity-label {\r
    font-size: 14px;\r
    text-transform: uppercase;\r
    letter-spacing: 1px;\r
    color: var(--text-secondary);\r
    margin-bottom: 10px;\r
  }\r
\r
  .similarity-value {\r
    font-size: 48px;\r
    font-weight: 700;\r
    color: var(--primary);\r
    font-family: 'Roboto Mono', monospace;\r
  }\r
</style>\r
`,hd=class extends ld{embedBtn;textInput1;textInput2;onInitializeUI(){this.embedBtn=document.getElementById(`embed-btn`),this.textInput1=document.getElementById(`text-input-1`),this.textInput2=document.getElementById(`text-input-2`),this.embedBtn&&this.embedBtn.addEventListener(`click`,()=>{this.textInput1.value.trim()&&this.textInput2.value.trim()&&this.computeSimilarity(this.textInput1.value,this.textInput2.value)}),this.container.querySelectorAll(`.sample-btn`).forEach(e=>{e.addEventListener(`click`,e=>{let t=e.currentTarget,n=t.dataset.text1,r=t.dataset.text2;n&&r&&(this.textInput1.value=n,this.textInput2.value=r,this.computeSimilarity(n,r))})}),this.container.querySelectorAll(`.sample-chip`).forEach(e=>{e.addEventListener(`click`,e=>{let t=e.currentTarget,n=t.dataset.target,r=t.dataset.text;if(n&&r){let e=document.getElementById(n);e&&(e.value=r,this.textInput1.value.trim()&&this.textInput2.value.trim()&&this.computeSimilarity(this.textInput1.value,this.textInput2.value))}})}),this.models={universal_sentence_encoder:`https://storage.googleapis.com/mediapipe-models/text_embedder/universal_sentence_encoder/float32/1/universal_sentence_encoder.tflite`},this.modelSelector&&this.modelSelector.updateOptions([{label:`Universal Sentence Encoder`,value:`universal_sentence_encoder`,isDefault:!0}])}async initializeTask(){this.embedBtn&&(this.embedBtn.disabled=!0),await super.initializeTask()}getWorkerInitParams(){return{}}handleWorkerMessage(e){let{type:t}=e.data;switch(t){case`EMBED_RESULT`:let{similarity:t,timestampMs:n}=e.data,r=performance.now()-n;this.updateInferenceTime(r),this.displayResults(t),this.embedBtn&&(this.embedBtn.disabled=!1),this.updateStatus(`Done`);break;case`ERROR`:this.embedBtn&&(this.embedBtn.disabled=!1,this.embedBtn.innerText=`Retry`),super.handleWorkerMessage(e);break;default:super.handleWorkerMessage(e)}}handleInitDone(){super.handleInitDone(),this.embedBtn&&(this.embedBtn.disabled=!1,this.embedBtn.innerText=`Compute Similarity`)}computeSimilarity(e,t){this.worker&&this.isWorkerReady&&(this.embedBtn&&(this.embedBtn.disabled=!0),this.updateStatus(`Computing...`),this.worker.postMessage({type:`EMBED`,text1:e,text2:t,timestampMs:performance.now()}))}displayResults(e){let t=document.getElementById(`embedding-results`),n=document.getElementById(`similarity-value`);t&&n&&(t.style.display=`block`,n.innerText=e.toFixed(4))}},gd=null;async function _d(e){gd=new hd({container:e,template:md,defaultModelName:`universal_sentence_encoder`,defaultModelUrl:`https://storage.googleapis.com/mediapipe-models/text_embedder/universal_sentence_encoder/float32/1/universal_sentence_encoder.tflite`,workerFactory:()=>new Worker(new URL(`/rps-hand/google-hands/assets/text-embedder.worker-9hNomJRh.js`,``+import.meta.url),{type:`module`}),defaultDelegate:`CPU`}),await gd.initialize()}function vd(){gd&&=(gd.cleanup(),null)}var yd=`<div class="task-container">\r
  <!-- Controls on Left -->\r
  <div class="controls-panel">\r
    <!-- Model Section -->\r
    <div class="section-title">Model Selection</div>\r
    <div id="model-selector-container"></div>\r
\r
    <div class="divider"></div>\r
\r
    <!-- Settings Section -->\r
    <div class="section-title">Settings</div>\r
\r
    <!-- Face Detector specific settings -->\r
    <div class="control-group">\r
      <div class="control-label">\r
        <span>Min Detection Confidence</span>\r
        <span id="min-detection-confidence-value" class="value-badge">0.5</span>\r
      </div>\r
      <input type="range" id="min-detection-confidence" min="0" max="1" step="0.01" value="0.5" class="range-slider" />\r
    </div>\r
\r
    <div class="control-group">\r
      <div class="control-label">\r
        <span>Min Suppression Threshold</span>\r
        <span id="min-suppression-threshold-value" class="value-badge">0.3</span>\r
      </div>\r
      <input type="range" id="min-suppression-threshold" min="0" max="1" step="0.01" value="0.3" class="range-slider" />\r
    </div>\r
\r
    <div class="control-group">\r
      <div class="control-label">\r
        <span>Delegate</span>\r
      </div>\r
      <div class="select-wrapper">\r
        <select id="delegate-select">\r
          <option value="GPU" selected>GPU</option>\r
          <option value="CPU">CPU</option>\r
        </select>\r
      </div>\r
    </div>\r
\r
    <div class="divider"></div>\r
\r
    <div class="status-group">\r
      <div id="status-message" class="status-message">Ready</div>\r
      <div id="inference-time" class="inference-time">Inference Time: - ms</div>\r
    </div>\r
  </div>\r
\r
  <!-- Output on Right -->\r
  <div class="output-panel">\r
    <div class="output-header">\r
      <h2>Face Detection</h2>\r
      <div id="view-mode-toggle"></div>\r
    </div>\r
\r
    <div class="viewport">\r
      <!-- Webcam View -->\r
      <div id="view-webcam" class="view-content">\r
        <div class="cam-container">\r
          <div class="video-wrapper">\r
            <div class="webcam-placeholder" id="webcam-placeholder">\r
              <span class="material-icons">videocam_off</span>\r
              <p>Webcam Disabled</p>\r
            </div>\r
            <video id="webcam" autoplay playsinline muted></video>\r
            <canvas id="output_canvas"></canvas>\r
          </div>\r
        </div>\r
        <div\r
          id="webcam-controls-container"\r
          style="display: none; justify-content: center; width: 100%; margin-top: auto; padding-bottom: 20px"\r
        >\r
          <button id="webcamButton" class="action-button">\r
            <span class="material-icons">videocam</span> Enable Webcam\r
          </button>\r
        </div>\r
      </div>\r
\r
      <!-- Image View -->\r
      <div id="view-image" class="view-content active">\r
        <div class="upload-dropzone">\r
          <div class="dropzone-content" style="display: none">\r
            <span class="material-icons large-icon">image</span>\r
            <p>Drag and drop or click to upload</p>\r
            <input type="file" id="image-upload" accept="image/*" />\r
          </div>\r
          <div id="image-preview-container" class="preview-container">\r
            <div class="canvas-wrapper">\r
              <img id="test-image" src="face_model.png" crossorigin="anonymous" />\r
              <canvas id="image-canvas"></canvas>\r
            </div>\r
          </div>\r
          <button id="re-upload-btn" class="action-button re-upload" style="display: flex">\r
            <span class="material-icons">upload</span> Upload New Image\r
          </button>\r
        </div>\r
      </div>\r
    </div>\r
  </div>\r
</div>\r
`,bd=class extends Hu{minDetectionConfidence=.5;minSuppressionThreshold=.3;onInitializeUI(){let e=document.getElementById(`min-detection-confidence`),t=document.getElementById(`min-detection-confidence-value`);e&&t&&e.addEventListener(`input`,()=>{if(this.minDetectionConfidence=parseFloat(e.value),t.innerText=this.minDetectionConfidence.toString(),this.worker?.postMessage({type:`SET_OPTIONS`,minDetectionConfidence:this.minDetectionConfidence}),this.runningMode===`IMAGE`){let e=document.getElementById(`test-image`);e&&e.src&&e.naturalWidth>0&&this.isWorkerReady&&this.detectImage(e)}});let n=document.getElementById(`min-suppression-threshold`),r=document.getElementById(`min-suppression-threshold-value`);n&&r&&n.addEventListener(`input`,()=>{if(this.minSuppressionThreshold=parseFloat(n.value),r.innerText=this.minSuppressionThreshold.toString(),this.worker?.postMessage({type:`SET_OPTIONS`,minSuppressionThreshold:this.minSuppressionThreshold}),this.runningMode===`IMAGE`){let e=document.getElementById(`test-image`);e&&e.src&&e.naturalWidth>0&&this.isWorkerReady&&this.detectImage(e)}}),this.models={blaze_face_short_range:`https://storage.googleapis.com/mediapipe-models/face_detector/blaze_face_short_range/float16/1/blaze_face_short_range.tflite`,blaze_face_full_range:`https://storage.googleapis.com/mediapipe-models/face_detector/blaze_face_full_range/float16/1/blaze_face_full_range.tflite`},this.modelSelector&&this.modelSelector.updateOptions([{label:`BlazeFace (Short Range)`,value:`blaze_face_short_range`,isDefault:!0},{label:`BlazeFace (Full Range)`,value:`blaze_face_full_range`}])}getWorkerInitParams(){return{minDetectionConfidence:this.minDetectionConfidence,minSuppressionThreshold:this.minSuppressionThreshold}}displayImageResult(e){let t=document.getElementById(`image-canvas`);if(!t)return;let n=t.getContext(`2d`),r=document.getElementById(`test-image`);if(t.width=r.naturalWidth,t.height=r.naturalHeight,n.clearRect(0,0,t.width,t.height),e.detections)for(let t of e.detections)this.drawDetection(n,t,!1)}displayVideoResult(e){if(this.canvasElement&&this.video&&(this.canvasElement.width=this.video.videoWidth,this.canvasElement.height=this.video.videoHeight,this.canvasCtx.clearRect(0,0,this.canvasElement.width,this.canvasElement.height),e.detections))for(let t of e.detections)this.drawDetection(this.canvasCtx,t,!0)}drawDetection(e,t,n){new q(e).drawBoundingBox(t.boundingBox,{color:`#007f8b`,lineWidth:4,fillColor:`transparent`});let{originX:r,originY:i}=t.boundingBox,a=r;e.fillStyle=`#007f8b`,e.font=`16px sans-serif`;let o=t.categories[0],s=`Face - ${o.score?Math.round(o.score*100):0}%`,c=e.measureText(s).width;if(n){e.save();let t=a+(c+10)/2,n=i+12.5;e.translate(t,n),e.scale(-1,1),e.translate(-t,-n),e.fillRect(a,i,c+10,25),e.fillStyle=`#ffffff`,e.fillText(s,a+5,i+18),e.restore()}else e.fillRect(a,i,c+10,25),e.fillStyle=`#ffffff`,e.fillText(s,a+5,i+18)}},xd=null;async function Sd(e){xd=new bd({container:e,template:yd,defaultModelName:`blaze_face_short_range`,defaultModelUrl:`https://storage.googleapis.com/mediapipe-models/face_detector/blaze_face_short_range/float16/1/blaze_face_short_range.tflite`,defaultDelegate:`CPU`,workerFactory:()=>new Worker(new URL(`/rps-hand/google-hands/assets/face-detector.worker-Dp3UFCiO.js`,``+import.meta.url),{type:`module`})}),await xd.initialize()}function Cd(){xd&&=(xd.cleanup(),null)}var wd=`<div class="task-container">\r
  <!-- Controls on Left -->\r
  <div class="controls-panel">\r
    <!-- Model Section -->\r
    <div class="section-title">Model Selection</div>\r
    <div id="model-selector-container"></div>\r
\r
    <div class="divider"></div>\r
\r
    <!-- Settings Section -->\r
    <div class="section-title">Settings</div>\r
\r
    <div class="control-group">\r
      <div class="control-label">\r
        <span>Num Faces</span>\r
        <span id="num-faces-value" class="value-badge">1</span>\r
      </div>\r
      <input type="range" id="num-faces" min="1" max="10" step="1" value="1" class="range-slider" />\r
    </div>\r
\r
    <div class="control-group">\r
      <div class="control-label">\r
        <span>Min Detection Confidence</span>\r
        <span id="min-face-detection-confidence-value" class="value-badge">0.5</span>\r
      </div>\r
      <input\r
        type="range"\r
        id="min-face-detection-confidence"\r
        min="0"\r
        max="1"\r
        step="0.01"\r
        value="0.5"\r
        class="range-slider"\r
      />\r
    </div>\r
\r
    <div class="control-group">\r
      <div class="control-label">\r
        <span>Min Presence Confidence</span>\r
        <span id="min-face-presence-confidence-value" class="value-badge">0.5</span>\r
      </div>\r
      <input\r
        type="range"\r
        id="min-face-presence-confidence"\r
        min="0"\r
        max="1"\r
        step="0.01"\r
        value="0.5"\r
        class="range-slider"\r
      />\r
    </div>\r
\r
    <div class="control-group">\r
      <div class="control-label">\r
        <span>Min Tracking Confidence</span>\r
        <span id="min-tracking-confidence-value" class="value-badge">0.5</span>\r
      </div>\r
      <input type="range" id="min-tracking-confidence" min="0" max="1" step="0.01" value="0.5" class="range-slider" />\r
    </div>\r
\r
    <div class="control-group">\r
      <div class="control-label">\r
        <span>Delegate</span>\r
      </div>\r
      <div class="select-wrapper">\r
        <select id="delegate-select">\r
          <option value="GPU" selected>GPU</option>\r
          <option value="CPU">CPU</option>\r
        </select>\r
      </div>\r
    </div>\r
\r
    <div class="divider"></div>\r
\r
    <div class="status-group">\r
      <div id="status-message" class="status-message">Ready</div>\r
      <div id="inference-time" class="inference-time">Inference Time: - ms</div>\r
    </div>\r
  </div>\r
\r
  <!-- Output on Right -->\r
  <div class="output-panel">\r
    <div class="output-header">\r
      <h2>Face Landmarker</h2>\r
      <div id="view-mode-toggle"></div>\r
    </div>\r
\r
    <div class="viewport">\r
      <!-- Webcam View -->\r
      <div id="view-webcam" class="view-content">\r
        <div class="cam-container">\r
          <div class="video-wrapper">\r
            <div class="webcam-placeholder" id="webcam-placeholder">\r
              <span class="material-icons">videocam_off</span>\r
              <p>Webcam Disabled</p>\r
            </div>\r
            <video id="webcam" autoplay playsinline muted></video>\r
            <canvas id="output_canvas"></canvas>\r
          </div>\r
        </div>\r
        <div\r
          id="webcam-controls-container"\r
          style="display: none; justify-content: center; width: 100%; margin-top: auto; padding-bottom: 20px"\r
        >\r
          <button id="webcamButton" class="action-button">\r
            <span class="material-icons">videocam</span> Enable Webcam\r
          </button>\r
        </div>\r
      </div>\r
\r
      <!-- Image View -->\r
      <div id="view-image" class="view-content active">\r
        <div class="upload-dropzone">\r
          <div class="dropzone-content" style="display: none">\r
            <span class="material-icons large-icon">image</span>\r
            <p>Drag and drop or click to upload</p>\r
            <input type="file" id="image-upload" accept="image/*" />\r
          </div>\r
          <div id="image-preview-container" class="preview-container">\r
            <div class="canvas-wrapper">\r
              <img id="test-image" src="face_model.png" crossorigin="anonymous" />\r
              <canvas id="image-canvas"></canvas>\r
            </div>\r
          </div>\r
          <button id="re-upload-btn" class="action-button re-upload" style="display: flex">\r
            <span class="material-icons">upload</span> Upload New Image\r
          </button>\r
        </div>\r
      </div>\r
    </div>\r
  </div>\r
</div>\r
`,Td=class extends Hu{drawingUtils;numFaces=1;minFaceDetectionConfidence=.5;minFacePresenceConfidence=.5;minTrackingConfidence=.5;onInitializeUI(){let e=(e,t)=>{let n=document.getElementById(e),r=document.getElementById(`${e}-value`);n&&r&&n.addEventListener(`input`,()=>{let e=parseFloat(n.value);r.innerText=e.toString(),t(e)})};e(`min-face-detection-confidence`,e=>{this.minFaceDetectionConfidence=e,this.worker?.postMessage({type:`SET_OPTIONS`,minFaceDetectionConfidence:this.minFaceDetectionConfidence}),this.triggerRedetection()}),e(`min-face-presence-confidence`,e=>{this.minFacePresenceConfidence=e,this.worker?.postMessage({type:`SET_OPTIONS`,minFacePresenceConfidence:this.minFacePresenceConfidence}),this.triggerRedetection()}),e(`min-tracking-confidence`,e=>{this.minTrackingConfidence=e,this.worker?.postMessage({type:`SET_OPTIONS`,minTrackingConfidence:this.minTrackingConfidence}),this.triggerRedetection()}),e(`num-faces`,e=>{this.numFaces=e,this.worker?.postMessage({type:`SET_OPTIONS`,numFaces:this.numFaces}),this.triggerRedetection()}),this.models={face_landmarker:`https://storage.googleapis.com/mediapipe-models/face_landmarker/face_landmarker/float16/1/face_landmarker.task`},this.modelSelector&&this.modelSelector.updateOptions([{label:`Face Landmarker`,value:`face_landmarker`,isDefault:!0}])}triggerRedetection(){if(this.runningMode===`IMAGE`){let e=document.getElementById(`test-image`);e&&e.src&&this.detectImage(e)}}getWorkerInitParams(){return{numFaces:this.numFaces,minFaceDetectionConfidence:this.minFaceDetectionConfidence,minFacePresenceConfidence:this.minFacePresenceConfidence,minTrackingConfidence:this.minTrackingConfidence,outputFaceBlendshapes:!0,outputFacialTransformationMatrixes:!0}}displayImageResult(e){let t=document.getElementById(`image-canvas`),n=document.getElementById(`test-image`),r=t.getContext(`2d`);if(t.width=n.naturalWidth,t.height=n.naturalHeight,r.clearRect(0,0,t.width,t.height),r.beginPath(),r.rect(0,0,t.width,t.height),r.clip(),e.faceLandmarks){this.drawingUtils=(this.drawingUtils,new q(r));for(let t of e.faceLandmarks)this.drawLandmarks(this.drawingUtils,t)}}displayVideoResult(e){if(this.canvasElement.width=this.video.videoWidth,this.canvasElement.height=this.video.videoHeight,this.canvasCtx.clearRect(0,0,this.canvasElement.width,this.canvasElement.height),this.canvasCtx.beginPath(),this.canvasCtx.rect(0,0,this.canvasElement.width,this.canvasElement.height),this.canvasCtx.clip(),e.faceLandmarks){this.drawingUtils=(this.drawingUtils,new q(this.canvasCtx));for(let t of e.faceLandmarks)this.drawLandmarks(this.drawingUtils,t)}}drawLandmarks(e,t){e.drawConnectors(t,X.FACE_LANDMARKS_TESSELATION,{color:`#C0C0C070`,lineWidth:1}),e.drawConnectors(t,X.FACE_LANDMARKS_RIGHT_EYE,{color:`#FF3030`}),e.drawConnectors(t,X.FACE_LANDMARKS_RIGHT_EYEBROW,{color:`#FF3030`}),e.drawConnectors(t,X.FACE_LANDMARKS_LEFT_EYE,{color:`#30FF30`}),e.drawConnectors(t,X.FACE_LANDMARKS_LEFT_EYEBROW,{color:`#30FF30`}),e.drawConnectors(t,X.FACE_LANDMARKS_FACE_OVAL,{color:`#E0E0E0`}),e.drawConnectors(t,X.FACE_LANDMARKS_LIPS,{color:`#E0E0E0`}),e.drawConnectors(t,X.FACE_LANDMARKS_RIGHT_IRIS,{color:`#FF3030`}),e.drawConnectors(t,X.FACE_LANDMARKS_LEFT_IRIS,{color:`#30FF30`})}},Ed=null;async function Dd(e){Ed=new Td({container:e,template:wd,defaultModelName:`face_landmarker`,defaultModelUrl:`https://storage.googleapis.com/mediapipe-models/face_landmarker/face_landmarker/float16/1/face_landmarker.task`,workerFactory:()=>new Worker(new URL(`/rps-hand/google-hands/assets/face-landmarker.worker-zATDdjJF.js`,``+import.meta.url),{type:`module`})}),await Ed.initialize()}function Od(){Ed&&=(Ed.cleanup(),null)}var kd=`<div class="task-container">\r
  <!-- Controls on Left -->\r
  <div class="controls-panel">\r
    <!-- Model Section -->\r
    <div class="section-title">Model Selection</div>\r
    <div id="model-selector-container"></div>\r
\r
    <div class="divider"></div>\r
\r
    <!-- Settings Section -->\r
    <div class="section-title">Settings</div>\r
\r
    <div class="control-group">\r
      <div class="control-label">\r
        <span>Num Hands</span>\r
        <span id="num-hands-value" class="value-badge">2</span>\r
      </div>\r
      <input type="range" id="num-hands" min="1" max="10" step="1" value="2" class="range-slider" />\r
    </div>\r
\r
    <div class="control-group">\r
      <div class="control-label">\r
        <span>Min Detection Confidence</span>\r
        <span id="min-hand-detection-confidence-value" class="value-badge">0.5</span>\r
      </div>\r
      <input\r
        type="range"\r
        id="min-hand-detection-confidence"\r
        min="0"\r
        max="1"\r
        step="0.01"\r
        value="0.5"\r
        class="range-slider"\r
      />\r
    </div>\r
\r
    <div class="control-group">\r
      <div class="control-label">\r
        <span>Min Presence Confidence</span>\r
        <span id="min-hand-presence-confidence-value" class="value-badge">0.5</span>\r
      </div>\r
      <input\r
        type="range"\r
        id="min-hand-presence-confidence"\r
        min="0"\r
        max="1"\r
        step="0.01"\r
        value="0.5"\r
        class="range-slider"\r
      />\r
    </div>\r
\r
    <div class="control-group">\r
      <div class="control-label">\r
        <span>Min Tracking Confidence</span>\r
        <span id="min-tracking-confidence-value" class="value-badge">0.5</span>\r
      </div>\r
      <input type="range" id="min-tracking-confidence" min="0" max="1" step="0.01" value="0.5" class="range-slider" />\r
    </div>\r
\r
    <div class="control-group">\r
      <div class="control-label">\r
        <span>Delegate</span>\r
      </div>\r
      <div class="select-wrapper">\r
        <select id="delegate-select">\r
          <option value="GPU" selected>GPU</option>\r
          <option value="CPU">CPU</option>\r
        </select>\r
      </div>\r
    </div>\r
\r
    <div class="divider"></div>\r
\r
    <div class="status-group">\r
      <div id="status-message" class="status-message">Ready</div>\r
      <div id="inference-time" class="inference-time">Inference Time: - ms</div>\r
    </div>\r
  </div>\r
\r
  <!-- Output on Right -->\r
  <div class="output-panel">\r
    <div class="output-header">\r
      <h2>Hand Landmarker</h2>\r
      <div id="view-mode-toggle"></div>\r
    </div>\r
\r
    <div class="viewport">\r
      <!-- Webcam View -->\r
      <div id="view-webcam" class="view-content">\r
        <div class="cam-container">\r
          <div class="video-wrapper">\r
            <div class="webcam-placeholder" id="webcam-placeholder">\r
              <span class="material-icons">videocam_off</span>\r
              <p>Webcam Disabled</p>\r
            </div>\r
            <video id="webcam" autoplay playsinline muted></video>\r
            <canvas id="output_canvas"></canvas>\r
          </div>\r
        </div>\r
        <div\r
          id="webcam-controls-container"\r
          style="display: none; justify-content: center; width: 100%; margin-top: auto; padding-bottom: 20px"\r
        >\r
          <button id="webcamButton" class="action-button">\r
            <span class="material-icons">videocam</span> Enable Webcam\r
          </button>\r
        </div>\r
      </div>\r
\r
      <!-- Image View -->\r
      <div id="view-image" class="view-content active">\r
        <div class="upload-dropzone">\r
          <div class="dropzone-content" style="display: none">\r
            <span class="material-icons large-icon">image</span>\r
            <p>Drag and drop or click to upload</p>\r
            <input type="file" id="image-upload" accept="image/*" />\r
          </div>\r
          <div id="image-preview-container" class="preview-container">\r
            <div class="canvas-wrapper">\r
              <img id="test-image" src="hand_model.png" crossorigin="anonymous" />\r
              <canvas id="image-canvas"></canvas>\r
            </div>\r
          </div>\r
          <button id="re-upload-btn" class="action-button re-upload" style="display: flex">\r
            <span class="material-icons">upload</span> Upload New Image\r
          </button>\r
        </div>\r
      </div>\r
    </div>\r
  </div>\r
</div>\r
`,Ad=class extends Hu{drawingUtils;numHands=2;minHandDetectionConfidence=.5;minHandPresenceConfidence=.5;minTrackingConfidence=.5;onInitializeUI(){let e=(e,t)=>{let n=document.getElementById(e),r=document.getElementById(`${e}-value`);n&&r&&n.addEventListener(`input`,()=>{let e=parseFloat(n.value);r.innerText=e.toString(),t(e)})};e(`min-hand-detection-confidence`,e=>{this.minHandDetectionConfidence=e,this.worker?.postMessage({type:`SET_OPTIONS`,minHandDetectionConfidence:this.minHandDetectionConfidence}),this.triggerRedetection()}),e(`min-hand-presence-confidence`,e=>{this.minHandPresenceConfidence=e,this.worker?.postMessage({type:`SET_OPTIONS`,minHandPresenceConfidence:this.minHandPresenceConfidence}),this.triggerRedetection()}),e(`min-tracking-confidence`,e=>{this.minTrackingConfidence=e,this.worker?.postMessage({type:`SET_OPTIONS`,minTrackingConfidence:this.minTrackingConfidence}),this.triggerRedetection()}),e(`num-hands`,e=>{this.numHands=e,this.worker?.postMessage({type:`SET_OPTIONS`,numHands:this.numHands}),this.triggerRedetection()}),this.models={hand_landmarker:`https://storage.googleapis.com/mediapipe-models/hand_landmarker/hand_landmarker/float16/1/hand_landmarker.task`},this.modelSelector&&this.modelSelector.updateOptions([{label:`Hand Landmarker`,value:`hand_landmarker`,isDefault:!0}])}triggerRedetection(){if(this.runningMode===`IMAGE`){let e=document.getElementById(`test-image`);e&&e.src&&this.detectImage(e)}}getWorkerInitParams(){return{numHands:this.numHands,minHandDetectionConfidence:this.minHandDetectionConfidence,minHandPresenceConfidence:this.minHandPresenceConfidence,minTrackingConfidence:this.minTrackingConfidence}}displayImageResult(e){let t=document.getElementById(`image-canvas`),n=document.getElementById(`test-image`),r=t.getContext(`2d`);if(t.width=n.naturalWidth,t.height=n.naturalHeight,r.clearRect(0,0,t.width,t.height),r.beginPath(),r.rect(0,0,t.width,t.height),r.clip(),e.landmarks){this.drawingUtils=(this.drawingUtils,new q(r));for(let t of e.landmarks)this.drawLandmarks(this.drawingUtils,t)}}displayVideoResult(e){if(this.canvasElement.width=this.video.videoWidth,this.canvasElement.height=this.video.videoHeight,this.canvasCtx.clearRect(0,0,this.canvasElement.width,this.canvasElement.height),this.canvasCtx.beginPath(),this.canvasCtx.rect(0,0,this.canvasElement.width,this.canvasElement.height),this.canvasCtx.clip(),e.landmarks){this.drawingUtils=(this.drawingUtils,new q(this.canvasCtx));for(let t of e.landmarks)this.drawLandmarks(this.drawingUtils,t)}}drawLandmarks(e,t){e.drawConnectors(t,Z.HAND_CONNECTIONS,{color:`#00FF00`,lineWidth:5}),e.drawLandmarks(t,{color:`#FF0000`,lineWidth:2})}},jd=null;async function Md(e){jd=new Ad({container:e,template:kd,defaultModelName:`hand_landmarker`,defaultModelUrl:`https://storage.googleapis.com/mediapipe-models/hand_landmarker/hand_landmarker/float16/1/hand_landmarker.task`,workerFactory:()=>new Worker(new URL(`/rps-hand/google-hands/assets/hand-landmarker.worker-5iWYbIj2.js`,``+import.meta.url),{type:`module`})}),await jd.initialize()}function Nd(){jd&&=(jd.cleanup(),null)}var Pd=`<div class="task-container">\r
  <!-- Controls on Left -->\r
  <div class="controls-panel">\r
    <!-- Model Section -->\r
    <div class="section-title">Model Selection</div>\r
    <div id="model-selector-container"></div>\r
\r
    <div class="divider"></div>\r
\r
    <!-- Settings Section -->\r
    <div class="section-title">Settings</div>\r
\r
    <div class="control-group">\r
      <div class="control-label">\r
        <span>Num Poses</span>\r
        <span id="num-poses-value" class="value-badge">1</span>\r
      </div>\r
      <input type="range" id="num-poses" min="1" max="10" step="1" value="1" class="range-slider" />\r
    </div>\r
\r
    <div class="control-group">\r
      <div class="control-label">\r
        <span>Min Detection Confidence</span>\r
        <span id="min-pose-detection-confidence-value" class="value-badge">0.5</span>\r
      </div>\r
      <input\r
        type="range"\r
        id="min-pose-detection-confidence"\r
        min="0"\r
        max="1"\r
        step="0.01"\r
        value="0.5"\r
        class="range-slider"\r
      />\r
    </div>\r
\r
    <div class="control-group">\r
      <div class="control-label">\r
        <span>Min Presence Confidence</span>\r
        <span id="min-pose-presence-confidence-value" class="value-badge">0.5</span>\r
      </div>\r
      <input\r
        type="range"\r
        id="min-pose-presence-confidence"\r
        min="0"\r
        max="1"\r
        step="0.01"\r
        value="0.5"\r
        class="range-slider"\r
      />\r
    </div>\r
\r
    <div class="control-group">\r
      <div class="control-label">\r
        <span>Min Tracking Confidence</span>\r
        <span id="min-tracking-confidence-value" class="value-badge">0.5</span>\r
      </div>\r
      <input type="range" id="min-tracking-confidence" min="0" max="1" step="0.01" value="0.5" class="range-slider" />\r
    </div>\r
\r
    <div class="control-group">\r
      <div class="control-label">\r
        <span>Delegate</span>\r
      </div>\r
      <div class="select-wrapper">\r
        <select id="delegate-select">\r
          <option value="GPU" selected>GPU</option>\r
          <option value="CPU">CPU</option>\r
        </select>\r
      </div>\r
    </div>\r
\r
    <div class="divider"></div>\r
\r
    <div class="status-group">\r
      <div id="status-message" class="status-message">Ready</div>\r
      <div id="inference-time" class="inference-time">Inference Time: - ms</div>\r
    </div>\r
  </div>\r
\r
  <!-- Output on Right -->\r
  <div class="output-panel">\r
    <div class="output-header">\r
      <h2>Pose Landmarker</h2>\r
      <div id="view-mode-toggle"></div>\r
    </div>\r
\r
    <div class="viewport">\r
      <!-- Webcam View -->\r
      <div id="view-webcam" class="view-content">\r
        <div class="cam-container">\r
          <div class="video-wrapper">\r
            <div class="webcam-placeholder" id="webcam-placeholder">\r
              <span class="material-icons">videocam_off</span>\r
              <p>Webcam Disabled</p>\r
            </div>\r
            <video id="webcam" autoplay playsinline muted></video>\r
            <canvas id="output_canvas"></canvas>\r
          </div>\r
        </div>\r
        <div\r
          id="webcam-controls-container"\r
          style="display: none; justify-content: center; width: 100%; margin-top: auto; padding-bottom: 20px"\r
        >\r
          <button id="webcamButton" class="action-button">\r
            <span class="material-icons">videocam</span> Enable Webcam\r
          </button>\r
        </div>\r
      </div>\r
\r
      <!-- Image View -->\r
      <div id="view-image" class="view-content active">\r
        <div class="upload-dropzone">\r
          <div class="dropzone-content" style="display: none">\r
            <span class="material-icons large-icon">image</span>\r
            <p>Drag and drop or click to upload</p>\r
            <input type="file" id="image-upload" accept="image/*" />\r
          </div>\r
          <div id="image-preview-container" class="preview-container">\r
            <div class="canvas-wrapper">\r
              <img id="test-image" src="pose_model.png" crossorigin="anonymous" />\r
              <!-- Using explicit id to avoid conflicts like in hand-landmarker -->\r
              <canvas id="image-canvas"></canvas>\r
            </div>\r
          </div>\r
          <button id="re-upload-btn" class="action-button re-upload" style="display: flex">\r
            <span class="material-icons">upload</span> Upload New Image\r
          </button>\r
        </div>\r
      </div>\r
    </div>\r
  </div>\r
</div>\r
`,Fd=class extends Hu{drawingUtils;minPoseDetectionConfidence=.5;minPosePresenceConfidence=.5;minTrackingConfidence=.5;numPoses=1;outputSegmentationMasks=!1;onInitializeUI(){let e=(e,t)=>{let n=document.getElementById(e),r=document.getElementById(`${e}-value`);n&&r&&n.addEventListener(`input`,()=>{let e=parseFloat(n.value);r.innerText=e.toString(),t(e)})};e(`num-poses`,e=>{this.numPoses=e,this.worker?.postMessage({type:`SET_OPTIONS`,numPoses:this.numPoses}),this.triggerRedetection()});let t=document.getElementById(`output-segmentation-masks`);t&&t.addEventListener(`change`,()=>{this.outputSegmentationMasks=t.checked,this.worker?.postMessage({type:`SET_OPTIONS`,outputSegmentationMasks:this.outputSegmentationMasks}),this.triggerRedetection()}),e(`min-pose-detection-confidence`,e=>{this.minPoseDetectionConfidence=e,this.worker?.postMessage({type:`SET_OPTIONS`,minPoseDetectionConfidence:this.minPoseDetectionConfidence}),this.triggerRedetection()}),e(`min-pose-presence-confidence`,e=>{this.minPosePresenceConfidence=e,this.worker?.postMessage({type:`SET_OPTIONS`,minPosePresenceConfidence:this.minPosePresenceConfidence}),this.triggerRedetection()}),e(`min-tracking-confidence`,e=>{this.minTrackingConfidence=e,this.worker?.postMessage({type:`SET_OPTIONS`,minTrackingConfidence:this.minTrackingConfidence}),this.triggerRedetection()}),this.models={pose_landmarker_lite:`https://storage.googleapis.com/mediapipe-models/pose_landmarker/pose_landmarker_lite/float16/1/pose_landmarker_lite.task`,pose_landmarker_full:`https://storage.googleapis.com/mediapipe-models/pose_landmarker/pose_landmarker_full/float16/1/pose_landmarker_full.task`,pose_landmarker_heavy:`https://storage.googleapis.com/mediapipe-models/pose_landmarker/pose_landmarker_heavy/float16/1/pose_landmarker_heavy.task`},this.modelSelector&&this.modelSelector.updateOptions([{label:`Pose Landmarker (Lite)`,value:`pose_landmarker_lite`,isDefault:!0},{label:`Pose Landmarker (Full)`,value:`pose_landmarker_full`},{label:`Pose Landmarker (Heavy)`,value:`pose_landmarker_heavy`}])}triggerRedetection(){if(this.runningMode===`IMAGE`){let e=document.getElementById(`test-image`);e&&e.src&&this.detectImage(e)}}getWorkerInitParams(){return{minPoseDetectionConfidence:this.minPoseDetectionConfidence,minPosePresenceConfidence:this.minPosePresenceConfidence,minTrackingConfidence:this.minTrackingConfidence,numPoses:this.numPoses,outputSegmentationMasks:this.outputSegmentationMasks}}displayImageResult(e){let t=document.getElementById(`image-canvas`),n=document.getElementById(`test-image`),r=t.getContext(`2d`);if(t.width=n.naturalWidth,t.height=n.naturalHeight,r.clearRect(0,0,t.width,t.height),r.beginPath(),r.rect(0,0,t.width,t.height),r.clip(),e.landmarks){this.drawingUtils=(this.drawingUtils,new q(r));for(let t of e.landmarks)this.drawingUtils.drawLandmarks(t,{radius:e=>q.lerp(e.from.z,-.15,.1,5,1)}),this.drawingUtils.drawConnectors(t,$.POSE_CONNECTIONS)}}displayVideoResult(e){if(this.canvasElement.width=this.video.videoWidth,this.canvasElement.height=this.video.videoHeight,this.canvasCtx.save(),this.canvasCtx.clearRect(0,0,this.canvasElement.width,this.canvasElement.height),this.canvasCtx.beginPath(),this.canvasCtx.rect(0,0,this.canvasElement.width,this.canvasElement.height),this.canvasCtx.clip(),e.landmarks){this.drawingUtils=(this.drawingUtils,new q(this.canvasCtx));for(let t of e.landmarks)this.drawingUtils.drawLandmarks(t,{radius:e=>q.lerp(e.from.z,-.15,.1,5,1)}),this.drawingUtils.drawConnectors(t,$.POSE_CONNECTIONS)}this.canvasCtx.restore()}},Id=null;async function Ld(e){Id=new Fd({container:e,template:Pd,defaultModelName:`pose_landmarker_lite`,defaultModelUrl:`https://storage.googleapis.com/mediapipe-models/pose_landmarker/pose_landmarker_lite/float16/1/pose_landmarker_lite.task`,workerFactory:()=>new Worker(new URL(`/rps-hand/google-hands/assets/pose-landmarker.worker-Bt3Q0kW_.js`,``+import.meta.url),{type:`module`})}),await Id.initialize()}function Rd(){Id&&=(Id.cleanup(),null)}var zd=`<div class="task-container">\r
  <div class="controls-panel">\r
    <div class="section-title">Model Selection</div>\r
    <div id="model-selector-container"></div>\r
    <div class="divider"></div>\r
    <div class="section-title">Settings</div>\r
\r
    <div class="control-group">\r
      <div class="control-label">\r
        <span>Num Hands</span>\r
        <span id="num-hands-value" class="value-badge">2</span>\r
      </div>\r
      <input type="range" id="num-hands" min="1" max="10" value="2" step="1" class="range-slider" />\r
    </div>\r
\r
    <div class="control-group">\r
      <div class="control-label">\r
        <span>Min Hand Detection</span>\r
        <span id="min-hand-detection-confidence-value" class="value-badge">0.5</span>\r
      </div>\r
      <input\r
        type="range"\r
        id="min-hand-detection-confidence"\r
        min="0"\r
        max="1"\r
        value="0.5"\r
        step="0.05"\r
        class="range-slider"\r
      />\r
    </div>\r
\r
    <div class="control-group">\r
      <div class="control-label">\r
        <span>Min Hand Presence</span>\r
        <span id="min-hand-presence-confidence-value" class="value-badge">0.5</span>\r
      </div>\r
      <input\r
        type="range"\r
        id="min-hand-presence-confidence"\r
        min="0"\r
        max="1"\r
        value="0.5"\r
        step="0.05"\r
        class="range-slider"\r
      />\r
    </div>\r
\r
    <div class="control-group">\r
      <div class="control-label">\r
        <span>Min Tracking</span>\r
        <span id="min-tracking-confidence-value" class="value-badge">0.5</span>\r
      </div>\r
      <input type="range" id="min-tracking-confidence" min="0" max="1" value="0.5" step="0.05" class="range-slider" />\r
    </div>\r
\r
    <div class="control-group">\r
      <div class="control-label">\r
        <span>Delegate</span>\r
      </div>\r
      <div class="select-wrapper">\r
        <select id="delegate-select">\r
          <option value="GPU">GPU</option>\r
          <option value="CPU">CPU</option>\r
        </select>\r
      </div>\r
    </div>\r
\r
    <div class="status-group">\r
      <div id="status-message" class="status-message">Initializing...</div>\r
      <div id="inference-time" class="inference-time">Inference Time: 0ms</div>\r
    </div>\r
  </div>\r
\r
  <div class="output-panel">\r
    <div class="output-header">\r
      <h2>Gesture Recognizer</h2>\r
      <div id="view-mode-toggle"></div>\r
    </div>\r
\r
    <div class="viewport">\r
      <div id="view-image" class="view-content active">\r
        <div class="upload-dropzone">\r
          <div class="dropzone-content">\r
            <span class="material-icons large-icon">image</span>\r
            <span>Drag & Drop or Click to Upload</span>\r
            <input type="file" id="image-upload" accept="image/*" />\r
          </div>\r
          <div id="image-preview-container" class="preview-container">\r
            <div class="canvas-wrapper">\r
              <img id="test-image" src="thumbs_up.png" crossorigin="anonymous" />\r
              <canvas id="image-canvas"></canvas>\r
            </div>\r
          </div>\r
        </div>\r
      </div>\r
\r
      <div id="view-webcam" class="view-content">\r
        <div class="cam-container">\r
          <div class="video-wrapper">\r
            <div class="webcam-placeholder" id="webcam-placeholder">\r
              <span class="material-icons">videocam_off</span>\r
              <p>Webcam Disabled</p>\r
            </div>\r
            <video id="webcam" autoplay playsinline></video>\r
            <canvas id="output_canvas"></canvas>\r
          </div>\r
          <div\r
            id="webcam-controls-container"\r
            style="display: none; justify-content: center; width: 100%; margin-top: auto; padding-bottom: 20px"\r
          >\r
            <button id="webcamButton" class="action-button">Enable Webcam</button>\r
          </div>\r
        </div>\r
      </div>\r
      <div\r
        id="classification-results"\r
        class="classification-results"\r
        style="padding: 0 20px; margin-bottom: 20px"\r
      ></div>\r
    </div>\r
  </div>\r
</div>\r
`,Bd=class extends Hu{drawingUtils;classificationResultUI;numHands=2;minHandDetectionConfidence=.5;minHandPresenceConfidence=.5;minTrackingConfidence=.5;onInitializeUI(){this.classificationResultUI=new nd(`classification-results`);let e=(e,t)=>{let n=document.getElementById(e),r=document.getElementById(`${e}-value`);n&&r&&n.addEventListener(`input`,()=>{let e=parseFloat(n.value);r.innerText=e.toString(),t(e)})};e(`num-hands`,e=>{this.numHands=e,this.worker?.postMessage({type:`SET_OPTIONS`,numHands:this.numHands}),this.triggerRedetection()}),e(`min-hand-detection-confidence`,e=>{this.minHandDetectionConfidence=e,this.worker?.postMessage({type:`SET_OPTIONS`,minHandDetectionConfidence:this.minHandDetectionConfidence}),this.triggerRedetection()}),e(`min-hand-presence-confidence`,e=>{this.minHandPresenceConfidence=e,this.worker?.postMessage({type:`SET_OPTIONS`,minHandPresenceConfidence:this.minHandPresenceConfidence}),this.triggerRedetection()}),e(`min-tracking-confidence`,e=>{this.minTrackingConfidence=e,this.worker?.postMessage({type:`SET_OPTIONS`,minTrackingConfidence:this.minTrackingConfidence}),this.triggerRedetection()}),this.models={gesture_recognizer:`https://storage.googleapis.com/mediapipe-models/gesture_recognizer/gesture_recognizer/float16/1/gesture_recognizer.task`},this.modelSelector&&this.modelSelector.updateOptions([{label:`Gesture Recognizer`,value:`gesture_recognizer`,isDefault:!0}])}triggerRedetection(){if(this.runningMode===`IMAGE`){let e=document.getElementById(`test-image`);e&&e.src&&this.detectImage(e)}}getWorkerInitParams(){return{numHands:this.numHands,minHandDetectionConfidence:this.minHandDetectionConfidence,minHandPresenceConfidence:this.minHandPresenceConfidence,minTrackingConfidence:this.minTrackingConfidence}}displayImageResult(e){let t=document.getElementById(`image-canvas`),n=document.getElementById(`test-image`),r=t.getContext(`2d`);if(t.width=n.naturalWidth,t.height=n.naturalHeight,t.style.width=`100%`,t.style.height=`auto`,r.clearRect(0,0,t.width,t.height),e.landmarks){this.drawingUtils=(this.drawingUtils,new q(r));for(let t of e.landmarks)this.drawingUtils.drawConnectors(t,Z.HAND_CONNECTIONS,{color:`#00FF00`,lineWidth:5}),this.drawingUtils.drawLandmarks(t,{color:`#FF0000`,lineWidth:2})}this.displayGestureText(e)}displayVideoResult(e){if(this.canvasElement.width=this.video.videoWidth,this.canvasElement.height=this.video.videoHeight,this.canvasCtx.save(),this.canvasCtx.clearRect(0,0,this.canvasElement.width,this.canvasElement.height),e.landmarks){this.drawingUtils=(this.drawingUtils,new q(this.canvasCtx));for(let t of e.landmarks)this.drawingUtils.drawConnectors(t,Z.HAND_CONNECTIONS,{color:`#00FF00`,lineWidth:5}),this.drawingUtils.drawLandmarks(t,{color:`#FF0000`,lineWidth:2})}this.canvasCtx.restore(),this.displayGestureText(e)}displayGestureText(e){if(this.classificationResultUI){if(e.gestures&&e.gestures.length>0){let t=[];e.gestures.forEach((n,r)=>{let i=e.handedness&&e.handedness[r]?e.handedness[r][0].displayName:`Hand ${r+1}`,a=n[0];a&&a.categoryName!==`None`&&t.push({label:`${i}: ${a.categoryName}`,score:a.score})}),t.length>0?this.classificationResultUI.updateResults(t):this.classificationResultUI.updateResults([])}else this.classificationResultUI.updateResults([])}}},Vd=null;async function Hd(e){Vd=new Bd({container:e,template:zd,defaultModelName:`gesture_recognizer`,defaultModelUrl:`https://storage.googleapis.com/mediapipe-models/gesture_recognizer/gesture_recognizer/float16/1/gesture_recognizer.task`,workerFactory:()=>new Worker(new URL(`/rps-hand/google-hands/assets/gesture-recognizer.worker-mUkbWooB.js`,``+import.meta.url),{type:`module`})}),await Vd.initialize()}function Ud(){Vd&&=(Vd.cleanup(),null)}var Wd=`<div class="task-container">\r
  <!-- Controls on Left -->\r
  <div class="controls-panel">\r
    <div class="section-title">Model Selection</div>\r
    <div id="model-selector-container"></div>\r
\r
    <div class="divider"></div>\r
\r
    <div class="section-title">Settings</div>\r
    <div class="control-group">\r
      <div class="control-label">\r
        <span>Max Results</span>\r
        <span id="max-results-value" class="value-badge">3</span>\r
      </div>\r
      <input type="range" id="max-results" min="1" max="10" value="3" class="range-slider" />\r
    </div>\r
\r
    <div class="control-group">\r
      <div class="control-label">\r
        <span>Score Threshold</span>\r
        <span id="score-threshold-value" class="value-badge">0.0</span>\r
      </div>\r
      <input type="range" id="score-threshold" min="0" max="1" step="0.01" value="0.0" class="range-slider" />\r
    </div>\r
\r
    <div class="control-group">\r
      <div class="control-label">\r
        <span>Delegate</span>\r
      </div>\r
      <div class="select-wrapper">\r
        <select id="delegate-select">\r
          <option value="CPU" selected>CPU</option>\r
          <option value="GPU">GPU</option>\r
        </select>\r
      </div>\r
    </div>\r
\r
    <div class="divider"></div>\r
\r
    <div class="status-group">\r
      <div id="status-message" class="status-message">Initializing...</div>\r
      <div id="inference-time" class="inference-time">Inference Time: - ms</div>\r
    </div>\r
  </div>\r
\r
  <!-- Output on Right -->\r
  <div class="output-panel">\r
    <div class="output-header">\r
      <h2>Language Detection</h2>\r
    </div>\r
\r
    <div class="viewport" style="display: flex; flex-direction: column; height: 100%">\r
      <div class="input-area" style="padding: 20px; flex-shrink: 0; width: 100%; max-width: 600px">\r
        <div class="card input-card">\r
          <div class="card-header">\r
            <span class="card-title">Input Text</span>\r
            <div id="sample-text-container" class="samples-container">\r
              <button class="sample-btn" data-text="To be, or not to be, that is the question.">English</button>\r
              <button class="sample-btn" data-text="Le monde est un livre dont chaque pas nous ouvre une page.">\r
                French\r
              </button>\r
              <button class="sample-btn" data-text="El mundo es un pañuelo.">Spanish</button>\r
              <button class="sample-btn" data-text="你好，世界！">Chinese</button>\r
            </div>\r
          </div>\r
\r
          <textarea\r
            id="text-input"\r
            placeholder="Type or paste text here to identify language..."\r
            rows="6"\r
            style="min-height: 150px"\r
          ></textarea>\r
\r
          <div class="action-container">\r
            <button id="detect-btn" class="action-button" disabled>\r
              <span class="material-icons" style="font-size: 18px; margin-right: 8px">translate</span> Detect Language\r
            </button>\r
          </div>\r
        </div>\r
      </div>\r
\r
      <div\r
        id="detection-results"\r
        class="results-container"\r
        style="flex-grow: 1; padding: 0 20px 20px 20px; overflow-y: auto"\r
      >\r
        <!-- Placeholder State (Fake Results) -->\r
        <div class="placeholder-results">\r
          <div class="classification-item placeholder-item">\r
            <span class="class-name">Language 1</span>\r
            <div class="class-bar-container">\r
              <div class="class-bar" style="width: 85%"></div>\r
            </div>\r
            <span class="class-score">--</span>\r
          </div>\r
          <div class="classification-item placeholder-item">\r
            <span class="class-name">Language 2</span>\r
            <div class="class-bar-container">\r
              <div class="class-bar" style="width: 10%"></div>\r
            </div>\r
            <span class="class-score">--</span>\r
          </div>\r
          <div class="classification-item placeholder-item">\r
            <span class="class-name">Language 3</span>\r
            <div class="class-bar-container">\r
              <div class="class-bar" style="width: 5%"></div>\r
            </div>\r
            <span class="class-score">--</span>\r
          </div>\r
        </div>\r
      </div>\r
    </div>\r
  </div>\r
</div>\r
\r
<style>\r
  .card {\r
    background: var(--surface-color);\r
    border: 1px solid var(--border-color);\r
    border-radius: 12px;\r
    padding: 20px;\r
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);\r
  }\r
\r
  .card-header {\r
    display: flex;\r
    justify-content: space-between;\r
    align-items: center;\r
    margin-bottom: 15px;\r
    flex-wrap: wrap;\r
    gap: 10px;\r
  }\r
\r
  .card-title {\r
    font-weight: 500;\r
    color: var(--text-primary);\r
    font-size: 16px;\r
  }\r
\r
  .samples-container {\r
    display: flex;\r
    align-items: center;\r
    gap: 8px;\r
    flex-wrap: wrap;\r
  }\r
\r
  .samples-label {\r
    font-size: 13px;\r
    color: var(--text-secondary);\r
  }\r
\r
  .sample-btn {\r
    background: transparent;\r
    border: 1px solid var(--border-color);\r
    border-radius: 20px;\r
    padding: 6px 12px;\r
    font-size: 12px;\r
    color: var(--text-secondary);\r
    cursor: pointer;\r
    transition: all 0.2s;\r
  }\r
\r
  .sample-btn:hover {\r
    background: var(--surface-color-hover);\r
    color: var(--primary);\r
    border-color: var(--primary);\r
  }\r
\r
  #text-input {\r
    width: 100%;\r
    padding: 15px;\r
    border-radius: 8px;\r
    border: 1px solid var(--border-color);\r
    background: var(--background-color);\r
    color: var(--text-primary);\r
    font-family: 'Roboto', sans-serif;\r
    font-size: 15px;\r
    resize: vertical;\r
    transition: border-color 0.2s;\r
    margin-bottom: 20px;\r
  }\r
\r
  #text-input:focus {\r
    outline: none;\r
    border-color: var(--primary);\r
  }\r
\r
  .action-container {\r
    display: flex;\r
    justify-content: flex-end;\r
  }\r
\r
  .action-button {\r
    background: var(--primary);\r
    color: white;\r
    border: none;\r
    border-radius: 8px;\r
    padding: 10px 24px;\r
    font-size: 14px;\r
    font-weight: 500;\r
    cursor: pointer;\r
    transition: background 0.2s;\r
    display: flex;\r
    align-items: center;\r
  }\r
\r
  .action-button:disabled {\r
    background: var(--border-color);\r
    cursor: not-allowed;\r
    opacity: 0.7;\r
  }\r
\r
  .action-button:hover:not(:disabled) {\r
    background: var(--primary-hover);\r
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);\r
  }\r
\r
  /* Placeholder Styling */\r
  .placeholder-results {\r
    opacity: 0.6;\r
    pointer-events: none;\r
    filter: grayscale(100%);\r
  }\r
\r
  .placeholder-item .class-bar {\r
    background: var(--border-color) !important;\r
  }\r
\r
  .placeholder-item .class-name,\r
  .placeholder-item .class-score {\r
    color: var(--text-secondary) !important;\r
  }\r
\r
  .classification-item {\r
    display: flex;\r
    align-items: center;\r
    margin-bottom: 16px;\r
    padding: 16px;\r
    background: var(--surface-color);\r
    border-radius: 12px;\r
    border: 1px solid var(--border-color);\r
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.02);\r
  }\r
\r
  .class-name {\r
    width: 100px;\r
    font-weight: 600;\r
    font-size: 14px;\r
    color: var(--text-primary);\r
  }\r
\r
  .class-bar-container {\r
    flex-grow: 1;\r
    background: var(--surface-color-hover);\r
    height: 10px;\r
    border-radius: 5px;\r
    overflow: hidden;\r
    margin: 0 15px;\r
  }\r
\r
  .class-bar {\r
    height: 100%;\r
    background: var(--primary);\r
    border-radius: 5px;\r
    transition: width 0.5s cubic-bezier(0.4, 0, 0.2, 1);\r
  }\r
\r
  .class-score {\r
    width: 45px;\r
    text-align: right;\r
    font-family: 'Roboto Mono', monospace;\r
    font-size: 14px;\r
    font-weight: 500;\r
    color: var(--primary);\r
  }\r
</style>\r
`,Gd=class extends ld{textInput;detectBtn;maxResults=3;scoreThreshold=0;onInitializeUI(){this.detectBtn=document.getElementById(`detect-btn`),this.textInput=document.getElementById(`text-input`),this.detectBtn&&this.detectBtn.addEventListener(`click`,()=>{this.textInput.value.trim()&&this.detectLanguage(this.textInput.value)}),this.container.querySelectorAll(`.sample-btn`).forEach(e=>{e.addEventListener(`click`,e=>{let t=e.currentTarget.dataset.text;t&&(this.textInput.value=t,this.detectLanguage(t))})});let e=document.getElementById(`max-results`),t=document.getElementById(`max-results-value`);e&&t&&e.addEventListener(`input`,async e=>{this.maxResults=parseInt(e.target.value),t.innerText=this.maxResults.toString(),await this.initializeTask()});let n=document.getElementById(`score-threshold`),r=document.getElementById(`score-threshold-value`);n&&r&&n.addEventListener(`input`,async e=>{this.scoreThreshold=parseFloat(e.target.value),r.innerText=this.scoreThreshold.toString(),await this.initializeTask()}),this.models={language_detector:`https://storage.googleapis.com/mediapipe-models/language_detector/language_detector/float32/1/language_detector.tflite`},this.modelSelector&&this.modelSelector.updateOptions([{label:`Language Detector`,value:`language_detector`,isDefault:!0}])}async initializeTask(){this.detectBtn&&(this.detectBtn.disabled=!0),await super.initializeTask()}getWorkerInitParams(){return{maxResults:this.maxResults,scoreThreshold:this.scoreThreshold}}handleWorkerMessage(e){let{type:t}=e.data;switch(t){case`DETECT_RESULT`:let{result:t,timestampMs:n}=e.data,r=performance.now()-n;this.updateInferenceTime(r),this.displayResults(t),this.detectBtn&&(this.detectBtn.disabled=!1),this.updateStatus(`Done`);break;case`ERROR`:this.detectBtn&&(this.detectBtn.disabled=!1,this.detectBtn.innerText=`Retry`),super.handleWorkerMessage(e);break;default:super.handleWorkerMessage(e)}}handleInitDone(){super.handleInitDone(),this.detectBtn&&(this.detectBtn.disabled=!1,this.detectBtn.innerText=`Detect Language`)}detectLanguage(e){this.worker&&this.isWorkerReady&&(this.detectBtn&&(this.detectBtn.disabled=!0),this.updateStatus(`Detecting...`),this.worker.postMessage({type:`DETECT`,text:e,timestampMs:performance.now()}))}displayResults(e){let t=document.getElementById(`detection-results`);if(!t||!e.languages||e.languages.length===0)return;t.innerHTML=``;let n=e.languages;n.sort((e,t)=>t.probability-e.probability),n.forEach(e=>{let n=document.createElement(`div`);n.className=`classification-item`;let r=Math.round(e.probability*100);n.innerHTML=`
        <div class="class-name">${e.languageCode}</div>
        <div class="class-bar-container">
          <div class="class-bar" style="width: ${r}%"></div>
        </div>
        <div class="class-score">${r}%</div>
      `,t.appendChild(n)})}},Kd=null;async function qd(e){Kd=new Gd({container:e,template:Wd,defaultModelName:`language_detector`,defaultModelUrl:`https://storage.googleapis.com/mediapipe-models/language_detector/language_detector/float32/1/language_detector.tflite`,workerFactory:()=>new Worker(new URL(`/rps-hand/google-hands/assets/language-detector.worker-B7lwKAc_.js`,``+import.meta.url),{type:`module`}),defaultDelegate:`CPU`}),await Kd.initialize()}function Jd(){Kd&&=(Kd.cleanup(),null)}var Yd=`<div class="task-container">\r
  <!-- Controls on Left -->\r
  <div class="controls-panel">\r
    <div class="section-title">Model Selection</div>\r
    <div id="model-selector-container"></div>\r
\r
    <div class="divider"></div>\r
\r
    <div class="section-title">Settings</div>\r
    <div class="control-group">\r
      <div class="control-label">\r
        <span>Delegate</span>\r
      </div>\r
      <div class="select-wrapper">\r
        <select id="delegate-select">\r
          <option value="GPU" selected>GPU</option>\r
          <option value="CPU">CPU</option>\r
        </select>\r
      </div>\r
    </div>\r
\r
    <div class="status-group">\r
      <div id="status-message" class="status-message">Initializing...</div>\r
      <div id="inference-time" class="inference-time">Inference Time: - ms</div>\r
    </div>\r
  </div>\r
\r
  <!-- Output on Right -->\r
  <div class="output-panel">\r
    <div class="output-header">\r
      <h2>Image Embedding</h2>\r
    </div>\r
\r
    <div class="viewport" style="display: flex; flex-direction: column; height: 100%">\r
      <div class="comparison-container" style="padding: 20px; flex-grow: 1; overflow-y: auto; width: 100%">\r
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px; min-height: 0; width: 100%">\r
          <!-- Image 1 -->\r
          <div class="image-input-section" style="display: flex; flex-direction: column; min-width: 0">\r
            <label style="display: block; margin-bottom: 8px; font-weight: 500; color: var(--text-secondary)"\r
              >Image 1</label\r
            >\r
            <div class="controls-row">\r
              <button class="sample-btn" data-target="1" data-src="dog.jpg">Dog</button>\r
              <button class="sample-btn" data-target="1" data-src="cat.png">Cat</button>\r
              <button class="sample-btn" data-target="1" data-src="elephant.png">Elephant</button>\r
              <button class="upload-btn" data-target="1">\r
                <span class="material-icons" style="font-size: 18px; margin-right: 4px">upload</span> Upload\r
              </button>\r
              <input type="file" id="image-upload-1" accept="image/*" style="display: none" />\r
            </div>\r
            <div class="image-display-area" id="display-area-1">\r
              <div class="placeholder-text">Select an image</div>\r
              <img id="image-1" class="preview-img" style="display: none" />\r
            </div>\r
          </div>\r
\r
          <!-- Image 2 -->\r
          <div class="image-input-section" style="display: flex; flex-direction: column; min-width: 0">\r
            <label style="display: block; margin-bottom: 8px; font-weight: 500; color: var(--text-secondary)"\r
              >Image 2</label\r
            >\r
            <div class="controls-row">\r
              <button class="sample-btn" data-target="2" data-src="dog.jpg">Dog</button>\r
              <button class="sample-btn" data-target="2" data-src="cat.png">Cat</button>\r
              <button class="sample-btn" data-target="2" data-src="elephant.png">Elephant</button>\r
              <button class="upload-btn" data-target="2">\r
                <span class="material-icons" style="font-size: 18px; margin-right: 4px">upload</span> Upload\r
              </button>\r
              <input type="file" id="image-upload-2" accept="image/*" style="display: none" />\r
            </div>\r
            <div class="image-display-area" id="display-area-2">\r
              <div class="placeholder-text">Select an image</div>\r
              <img id="image-2" class="preview-img" style="display: none" />\r
            </div>\r
          </div>\r
        </div>\r
\r
        <div id="embedding-results" class="results-container" style="margin-top: 20px">\r
          <div class="similarity-card">\r
            <div class="similarity-label">Cosine Similarity</div>\r
            <div class="similarity-value" id="similarity-value">--</div>\r
          </div>\r
        </div>\r
      </div>\r
\r
      <!-- Loading Overlay -->\r
      <div id="loading-overlay" class="loading-overlay">\r
        <div class="spinner"></div>\r
        <div class="loading-text">Loading Model...</div>\r
      </div>\r
    </div>\r
  </div>\r
</div>\r
\r
<style>\r
  .controls-row {\r
    display: flex;\r
    gap: 8px;\r
    margin-bottom: 10px;\r
    flex-wrap: wrap;\r
  }\r
\r
  .sample-btn {\r
    background: transparent;\r
    border: 1px solid var(--border-color);\r
    border-radius: 16px;\r
    padding: 6px 12px;\r
    font-size: 13px;\r
    color: var(--text-secondary);\r
    cursor: pointer;\r
    transition: all 0.2s;\r
  }\r
\r
  .sample-btn:hover {\r
    background: var(--surface-color-hover);\r
    color: var(--primary);\r
    border-color: var(--primary);\r
  }\r
\r
  .upload-btn {\r
    background: var(--surface-color);\r
    border: 1px solid var(--primary);\r
    border-radius: 16px;\r
    padding: 6px 16px;\r
    font-size: 13px;\r
    color: var(--primary);\r
    cursor: pointer;\r
    transition: all 0.2s;\r
    display: flex;\r
    align-items: center;\r
    margin-left: auto;\r
    /* Push to right */\r
  }\r
\r
  .upload-btn:hover {\r
    background: var(--primary);\r
    color: white;\r
  }\r
\r
  .image-display-area {\r
    width: 100%;\r
    height: 350px;\r
    border: 2px dashed var(--border-color);\r
    border-radius: 12px;\r
    background: var(--surface-color);\r
    display: flex;\r
    justify-content: center;\r
    align-items: center;\r
    overflow: hidden;\r
    position: relative;\r
    transition: border-color 0.2s;\r
  }\r
\r
  .image-display-area.has-image {\r
    border-style: solid;\r
    border-color: var(--border-color);\r
  }\r
\r
  .preview-img {\r
    max-width: 100%;\r
    max-height: 100%;\r
    object-fit: contain;\r
  }\r
\r
  .placeholder-text {\r
    color: var(--text-secondary);\r
    font-size: 14px;\r
    pointer-events: none;\r
  }\r
\r
  .similarity-card {\r
    background: var(--surface-color);\r
    border: 1px solid var(--border-color);\r
    border-radius: 12px;\r
    padding: 15px 30px; /* Reduced vertical padding */\r
    text-align: center;\r
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);\r
  }\r
\r
  .similarity-label {\r
    font-size: 14px;\r
    text-transform: uppercase;\r
    letter-spacing: 1px;\r
    color: var(--text-secondary);\r
    margin-bottom: 5px;\r
  }\r
\r
  .similarity-value {\r
    font-size: 40px; /* Slightly smaller */\r
    font-weight: 700;\r
    color: var(--primary);\r
    font-family: 'Roboto Mono', monospace;\r
  }\r
\r
  .loading-overlay {\r
    position: absolute;\r
    top: 0;\r
    left: 0;\r
    right: 0;\r
    bottom: 0;\r
    background: rgba(255, 255, 255, 0.9);\r
    display: flex;\r
    flex-direction: column;\r
    justify-content: center;\r
    align-items: center;\r
    z-index: 100;\r
    backdrop-filter: blur(2px);\r
  }\r
\r
  .spinner {\r
    width: 40px;\r
    height: 40px;\r
    border: 4px solid #f3f3f3;\r
    border-top: 4px solid var(--primary);\r
    border-radius: 50%;\r
    animation: spin 1s linear infinite;\r
    margin-bottom: 16px;\r
  }\r
\r
  @keyframes spin {\r
    0% {\r
      transform: rotate(0deg);\r
    }\r
    100% {\r
      transform: rotate(360deg);\r
    }\r
  }\r
</style>\r
`,Xd=class extends Hu{image1=null;image2=null;onInitializeUI(){this.image1=document.getElementById(`image-1`),this.image2=document.getElementById(`image-2`);let e=document.getElementById(`display-area-1`),t=document.getElementById(`display-area-2`),n=(e,t,n)=>{e.src=n,e.style.display=`block`,t.classList.add(`has-image`);let r=t.querySelector(`.placeholder-text`);r&&(r.style.display=`none`),this.checkEnableButton()},r=(e,t,r)=>{let i=document.getElementById(e);if(i)return i.addEventListener(`change`,e=>{let i=e.target.files?.[0];if(i){let e=new FileReader;e.onload=e=>{n(t,r,e.target?.result)},e.readAsDataURL(i)}}),()=>{i.value=``,i.click()}},i=r(`image-upload-1`,this.image1,e),a=r(`image-upload-2`,this.image2,t);document.querySelectorAll(`.sample-btn`).forEach(r=>{r.addEventListener(`click`,()=>{let i=r.dataset.target,a=r.dataset.src;i===`1`&&a&&this.image1&&n(this.image1,e,a),i===`2`&&a&&this.image2&&n(this.image2,t,a)})}),document.querySelectorAll(`.upload-btn`).forEach(e=>{e.addEventListener(`click`,()=>{let t=e.dataset.target;t===`1`&&i&&i(),t===`2`&&a&&a()})}),e&&i&&e.addEventListener(`click`,i),t&&a&&t.addEventListener(`click`,a),this.image1&&(this.image1.onload=()=>this.checkEnableButton()),this.image2&&(this.image2.onload=()=>this.checkEnableButton()),this.models={mobilenet_v3_small:`https://storage.googleapis.com/mediapipe-models/image_embedder/mobilenet_v3_small/float32/1/mobilenet_v3_small.tflite`,mobilenet_v3_large:`https://storage.googleapis.com/mediapipe-models/image_embedder/mobilenet_v3_large/float32/1/mobilenet_v3_large.tflite`},this.modelSelector&&this.modelSelector.updateOptions([{label:`MobileNet V3 Small`,value:`mobilenet_v3_small`,isDefault:!0},{label:`MobileNet V3 Large`,value:`mobilenet_v3_large`}])}checkEnableButton(){this.image1&&this.image2&&this.image1.src&&this.image2.src&&this.isWorkerReady&&this.computeSimilarity(this.image1,this.image2)}handleInitDone(){super.handleInitDone();let e=document.getElementById(`loading-overlay`);e&&(e.style.display=`none`),this.checkEnableButton()}async initializeTask(){let e=document.getElementById(`loading-overlay`);if(e){e.style.display=`flex`;let t=e.querySelector(`.loading-text`);t&&(t.textContent=`Loading Model...`)}await super.initializeTask()}handleWorkerMessage(e){let{type:t}=e.data;if(t===`EMBED_RESULT`){let{similarity:t,timestampMs:n}=e.data,r=performance.now()-n;this.updateInferenceTime(r),this.displayResults(t),this.updateStatus(`Done`)}else super.handleWorkerMessage(e)}async computeSimilarity(e,t){if(!this.worker||!this.isWorkerReady)return;if(!e||!t||e.naturalWidth===0||t.naturalWidth===0){this.updateStatus(`Select two images`);return}this.updateStatus(`Computing...`);let n=await createImageBitmap(e),r=await createImageBitmap(t);this.worker.postMessage({type:`EMBED`,image1:n,image2:r,timestampMs:performance.now()},[n,r])}displayResults(e){let t=document.getElementById(`similarity-value`);t&&e!==void 0?t.innerText=e.toFixed(4):t&&(t.innerText=`--`)}getWorkerInitParams(){return{}}displayImageResult(){}displayVideoResult(){}},Zd=null;async function Qd(e){Zd=new Xd({container:e,template:Yd,defaultModelName:`mobilenet_v3_small`,defaultModelUrl:`https://storage.googleapis.com/mediapipe-models/image_embedder/mobilenet_v3_small/float32/1/mobilenet_v3_small.tflite`,workerFactory:()=>new Worker(new URL(`/rps-hand/google-hands/assets/image-embedder.worker-C4sR6DXu.js`,``+import.meta.url),{type:`module`}),defaultDelegate:`CPU`}),await Zd.initialize()}function $d(){Zd&&=(Zd.cleanup(),null)}var ef=`<div class="task-container">\r
  <div class="controls-panel">\r
    <div class="section-title">Model Selection</div>\r
    <div id="model-selector-container"></div>\r
\r
    <div class="divider"></div>\r
\r
    <div class="section-title">Settings</div>\r
    <div class="control-group">\r
      <div class="control-label">\r
        <span>Delegate</span>\r
      </div>\r
      <div class="select-wrapper">\r
        <select id="delegate-select">\r
          <option value="GPU" selected>GPU</option>\r
          <option value="CPU">CPU</option>\r
        </select>\r
      </div>\r
    </div>\r
\r
    <div class="control-group" style="margin-top: 12px">\r
      <div class="control-label">\r
        <span>Stroke Mode</span>\r
      </div>\r
      <div class="select-wrapper">\r
        <select id="stroke-mode-select">\r
          <option value="1">Positive</option>\r
          <option value="2">Negative</option>\r
          <option value="3">Lasso</option>\r
        </select>\r
      </div>\r
    </div>\r
\r
    <div class="control-group" style="margin-top: 16px">\r
      <button\r
        id="clear-strokes-btn"\r
        class="action-button secondary"\r
        style="width: 100%; display: flex; align-items: center; justify-content: center; gap: 8px"\r
      >\r
        <span class="material-icons" style="font-size: 18px">clear</span> Clear Strokes\r
      </button>\r
    </div>\r
    <div class="divider"></div>\r
    <div class="status-group">\r
      <div id="status-message" class="status-message">Initializing...</div>\r
      <div id="inference-time" class="inference-time">Inference Time: 0ms</div>\r
    </div>\r
  </div>\r
\r
  <div class="output-panel">\r
    <div class="output-header">\r
      <h2>Interactive Segmenter</h2>\r
      <div id="view-mode-toggle"></div>\r
    </div>\r
\r
    <div\r
      class="instructions-banner"\r
      style="\r
        background-color: #e0f2f1;\r
        color: #00695c;\r
        padding: 14px 24px;\r
        border-radius: 8px;\r
        margin: 0 0 20px 0;\r
        display: flex;\r
        align-items: center;\r
        gap: 12px;\r
        font-weight: 500;\r
        border-left: 4px solid #00897b;\r
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);\r
      "\r
    >\r
      <span class="material-icons" style="color: #00897b">info</span>\r
      <span>Freeze the webcam and draw a stroke on an object to segment it.</span>\r
    </div>\r
\r
    <div class="viewport">\r
      <div id="view-image" class="view-content">\r
        <div class="upload-dropzone">\r
          <div class="dropzone-content" style="display: none">\r
            <span class="material-icons large-icon">image</span>\r
            <span>Drag & Drop or Click to Upload</span>\r
            <input type="file" id="image-upload" accept="image/*" />\r
          </div>\r
          <div id="image-preview-container" class="preview-container">\r
            <div class="canvas-wrapper">\r
              <img id="test-image" src="cat.png" crossorigin="anonymous" />\r
              <canvas id="output_canvas"></canvas>\r
            </div>\r
          </div>\r
          <button id="re-upload-btn" class="action-button re-upload" style="display: flex">\r
            <span class="material-icons">upload</span> Upload New Image\r
          </button>\r
        </div>\r
      </div>\r
\r
      <div id="view-webcam" class="view-content active">\r
        <div class="cam-container">\r
          <div class="video-wrapper">\r
            <div\r
              class="webcam-placeholder"\r
              id="webcam-placeholder"\r
              style="\r
                width: 100%;\r
                aspect-ratio: 4/3;\r
                min-height: 240px;\r
                border: 2px dashed #94a3b8;\r
                border-radius: 12px;\r
                background-color: #f1f5f9;\r
                display: flex;\r
                flex-direction: column;\r
                align-items: center;\r
                justify-content: center;\r
                z-index: 5;\r
                pointer-events: none;\r
                box-sizing: border-box;\r
                grid-area: 1/1;\r
              "\r
            >\r
              <span class="material-icons" style="font-size: 48px; color: #64748b; margin-bottom: 8px"\r
                >videocam_off</span\r
              >\r
              <p style="color: #64748b; font-weight: 500; margin: 0">Webcam Disabled</p>\r
            </div>\r
            <video id="webcam" autoplay playsinline></video>\r
            <canvas id="webcam-capture" class="webcam-capture"></canvas>\r
            <canvas id="webcam-overlay" class="webcam-overlay"></canvas>\r
          </div>\r
          <div\r
            id="webcam-controls-container"\r
            style="display: none; justify-content: center; width: 100%; margin-top: auto; padding-bottom: 20px"\r
          >\r
            <div class="webcam-controls" style="display: flex; gap: 10px">\r
              <button id="webcamButton" class="action-button">\r
                <span class="material-icons">videocam</span> Enable Webcam\r
              </button>\r
              <button id="freezeButton" class="action-button secondary" disabled>\r
                <span class="material-icons">camera</span> Freeze & Segment\r
              </button>\r
            </div>\r
          </div>\r
        </div>\r
      </div>\r
    </div>\r
    <div\r
      id="stroke-progress-container"\r
      style="\r
        position: fixed;\r
        display: none;\r
        pointer-events: none;\r
        z-index: 9999;\r
        width: 48px;\r
        height: 48px;\r
        transform: translate(-50%, -50%);\r
        transition:\r
          opacity 0.2s ease-out,\r
          transform 0.1s linear;\r
        filter: drop-shadow(0 4px 6px rgba(0, 0, 0, 0.3));\r
      "\r
    >\r
      <svg viewBox="0 0 36 36" style="width: 100%; height: 100%">\r
        <path\r
          class="circle-bg"\r
          d="M18 2.0845\r
            a 15.9155 15.9155 0 0 1 0 31.831\r
            a 15.9155 15.9155 0 0 1 0 -31.831"\r
          fill="none"\r
          stroke="rgba(0, 0, 0, 0.5)"\r
          stroke-width="4"\r
        />\r
        <path\r
          id="stroke-progress-circle"\r
          stroke-dasharray="0, 100"\r
          d="M18 2.0845\r
            a 15.9155 15.9155 0 0 1 0 31.831\r
            a 15.9155 15.9155 0 0 1 0 -31.831"\r
          fill="none"\r
          stroke="#ff5722"\r
          stroke-width="4"\r
          stroke-linecap="round"\r
          style="\r
            transition:\r
              stroke-dasharray 0.1s linear,\r
              stroke 0.2s ease;\r
          "\r
        />\r
      </svg>\r
      <div\r
        id="stroke-progress-tooltip"\r
        style="\r
          position: absolute;\r
          top: 54px;\r
          left: 50%;\r
          transform: translateX(-50%);\r
          background: rgba(0, 0, 0, 0.8);\r
          color: white;\r
          padding: 4px 8px;\r
          border-radius: 4px;\r
          font-size: 12px;\r
          font-weight: bold;\r
          white-space: nowrap;\r
          opacity: 0;\r
          transition: opacity 0.2s ease;\r
        "\r
      >\r
        Keep drawing\r
      </div>\r
    </div>\r
  </div>\r
</div>\r
`,tf=class extends Hu{isFrozen=!1;webcamCapture;webcamOverlay;freezeButton;strokeModeSelect;clearStrokesBtn;webcamCtx;overlayCtx;currentStrokeMode=1;accumulatedStrokes=[];isPointerDown=!1;currentStrokePoints=[];currentMaskBitmap=null;imageSet=!1;MIN_STROKE_LENGTH=.05;hasDrawnValidStroke=!1;isWorkerProcessing=!1;hasUnprocessedStrokes=!1;activeRequestId=0;constructor(e){super(e)}async setImageOnWorker(e){if(this.worker&&this.isWorkerReady){this.updateStatus(`Setting image...`);try{let t=await createImageBitmap(e);this.worker.postMessage({type:`SET_IMAGE`,bitmap:t},[t]),this.imageSet=!0,this.updateStatus(`Ready`)}catch(e){console.error(`Failed to set image on worker:`,e),this.updateStatus(`Error setting image`)}}}getStrokeLength(e){let t=0;for(let n=1;n<e.length;n++)t+=Math.hypot(e[n].x-e[n-1].x,e[n].y-e[n-1].y);return t}onInitializeUI(){this.webcamCapture=document.getElementById(`webcam-capture`),this.webcamOverlay=document.getElementById(`webcam-overlay`),this.freezeButton=document.getElementById(`freezeButton`),this.strokeModeSelect=document.getElementById(`stroke-mode-select`),this.clearStrokesBtn=document.getElementById(`clear-strokes-btn`),this.webcamCtx=this.webcamCapture.getContext(`2d`,{willReadFrequently:!0}),this.overlayCtx=this.webcamOverlay.getContext(`2d`,{willReadFrequently:!0}),this.webcamCapture.style.display=`none`,this.webcamOverlay.style.display=`none`,this.webcamOverlay.style.position=`absolute`,this.webcamOverlay.style.top=`0`,this.webcamOverlay.style.left=`0`,this.webcamOverlay.style.pointerEvents=`none`,this.freezeButton&&(this.freezeButton.addEventListener(`click`,this.toggleFreeze.bind(this)),this.freezeButton.disabled=!0),this.strokeModeSelect&&this.strokeModeSelect.addEventListener(`change`,()=>{this.currentStrokeMode=parseInt(this.strokeModeSelect.value,10)||1}),this.clearStrokesBtn&&this.clearStrokesBtn.addEventListener(`click`,()=>{this.clearStrokes()});let e=document.getElementById(`test-image`),t=(e,t,n)=>{let r=t.getBoundingClientRect(),i=e.clientX-r.left,a=e.clientY-r.top,o=i/r.width,s=a/r.height;return n===`webcam`&&(o=1-o),{x:Math.max(0,Math.min(1,o)),y:Math.max(0,Math.min(1,s))}},n=(e,n)=>{e.style.cursor=`crosshair`,n===`image`&&(e.style.pointerEvents=`auto`);let r=document.getElementById(`stroke-progress-container`),i=document.getElementById(`stroke-progress-circle`),a=document.getElementById(`stroke-progress-tooltip`),o=o=>{if(o.button===0&&(n!==`webcam`||this.isFrozen)){this.strokeModeSelect&&(this.currentStrokeMode=parseInt(this.strokeModeSelect.value,10)||1);try{e.setPointerCapture(o.pointerId)}catch{}this.isPointerDown=!0,this.currentStrokePoints=[t(o,e,n)],this.redrawOverlay(n),r&&i&&a&&(r.style.display=`block`,r.style.opacity=`1`,r.style.transform=`translate(-50%, -50%) scale(1)`,r.style.left=`${o.clientX}px`,r.style.top=`${o.clientY}px`,i.setAttribute(`stroke-dasharray`,`0, 100`),i.setAttribute(`stroke`,`#ff5722`),i.style.opacity=`1`,this.hasDrawnValidStroke?a.style.opacity=`0`:a.style.opacity=`1`)}},s=o=>{if(!this.isPointerDown)return;let s=t(o,e,n),c=this.currentStrokePoints[this.currentStrokePoints.length-1];if((!c||Math.hypot(s.x-c.x,s.y-c.y)>.003)&&(this.currentStrokePoints.push(s),this.redrawOverlay(n)),r&&i){r.style.left=`${o.clientX}px`,r.style.top=`${o.clientY}px`;let e=this.getStrokeLength(this.currentStrokePoints),t=Math.min(100,e/this.MIN_STROKE_LENGTH*100);i.setAttribute(`stroke-dasharray`,`${t}, 100`),t>=100?(i.setAttribute(`stroke`,`#4caf50`),a&&(a.style.opacity=`0`)):(i.setAttribute(`stroke`,`#ff5722`),a&&!this.hasDrawnValidStroke&&(a.style.opacity=`1`))}},c=t=>{if(this.isPointerDown){this.isPointerDown=!1;try{e.releasePointerCapture(t.pointerId)}catch{}if(this.currentStrokePoints.length>0){if(this.getStrokeLength(this.currentStrokePoints)<this.MIN_STROKE_LENGTH){r&&a&&(this.hasDrawnValidStroke||(a.style.opacity=`1`),setTimeout(()=>{r.style.opacity=`0`,setTimeout(()=>{r.style.display=`none`},200)},600)),this.currentStrokePoints=[],this.redrawOverlay(n);return}if(this.hasDrawnValidStroke=!0,r&&(r.style.display=`none`),this.accumulatedStrokes.push({brushMode:this.currentStrokeMode,point:[...this.currentStrokePoints],isCompleted:!0}),this.currentStrokePoints=[],this.redrawOverlay(n),n===`image`){let e=document.getElementById(`test-image`);e&&e.classList.add(`breathing-animation`)}else this.webcamCapture.classList.add(`breathing-animation`);this.hasUnprocessedStrokes=!0,this.isWorkerProcessing||this.triggerSegment()}else r&&(r.style.display=`none`)}};e.addEventListener(`pointerdown`,o),e.addEventListener(`pointermove`,s),e.addEventListener(`pointerup`,c),e.addEventListener(`pointercancel`,c)};n(e,`image`),n(this.canvasElement,`image`),n(this.webcamCapture,`webcam`),n(this.webcamOverlay,`webcam`),this.video&&(this.video.style.cursor=`pointer`,this.video.addEventListener(`click`,()=>{!this.isFrozen&&this.video.srcObject&&this.toggleFreeze()}))}async triggerSegment(){if(!this.isWorkerReady)return;if(!this.imageSet){console.warn(`Image not set on worker yet!`),this.updateStatus(`Waiting for image setup...`);return}this.hasUnprocessedStrokes=!1,this.isWorkerProcessing=!0,this.activeRequestId++;let e=this.activeRequestId;this.updateStatus(`Segmenting...`);try{this.worker?.postMessage({type:`SEGMENT`,strokes:this.accumulatedStrokes,reqId:e})}catch(e){console.error(e)}}async initializeTask(){this.clearStrokes(),await super.initializeTask()}setupImageUpload(){super.setupImageUpload(),document.getElementById(`image-upload`)?.addEventListener(`change`,()=>{this.clearStrokes(),this.imageSet=!1})}redrawOverlay(e){let t=e===`webcam`?this.overlayCtx:this.canvasCtx,n=e===`webcam`?this.webcamOverlay:this.canvasElement;if(t&&n){if(e===`image`){let e=document.getElementById(`test-image`);e&&(n.width===0||n.height===0||n.width===300)&&(n.width=e.naturalWidth||e.clientWidth||300,n.height=e.naturalHeight||e.clientHeight||300)}t.clearRect(0,0,n.width,n.height),this.currentMaskBitmap&&t.drawImage(this.currentMaskBitmap,0,0,n.width,n.height);for(let e of this.accumulatedStrokes)this.drawSingleStrokeOnCanvas(t,e);if(this.isPointerDown&&this.currentStrokePoints.length>0){let e={brushMode:this.currentStrokeMode,point:this.currentStrokePoints,isCompleted:!1};this.drawSingleStrokeOnCanvas(t,e)}}}drawSingleStrokeOnCanvas(e,t){if(!t.point||t.point.length===0)return;let n=e.canvas.width,r=e.canvas.height;e.save();let i=`rgba(76, 175, 80, 0.85)`,a=4;if(t.brushMode===2?(i=`rgba(229, 57, 53, 0.85)`,a=4):t.brushMode===3&&(i=`rgba(33, 150, 243, 0.85)`,a=3),e.strokeStyle=i,e.fillStyle=i,e.lineWidth=a,e.lineCap=`round`,e.lineJoin=`round`,t.point.length===1||t.point.length===2&&Math.abs(t.point[0].x-t.point[1].x)<.002&&Math.abs(t.point[0].y-t.point[1].y)<.002){let i=t.point[0];e.beginPath(),e.arc(i.x*n,i.y*r,4,0,2*Math.PI),e.fill(),e.lineWidth=1.5,e.strokeStyle=`#ffffff`,e.stroke()}else{e.beginPath(),e.moveTo(t.point[0].x*n,t.point[0].y*r);for(let i=1;i<t.point.length;i++)e.lineTo(t.point[i].x*n,t.point[i].y*r);t.brushMode===3&&((t.isCompleted||t.point.length>2)&&e.closePath(),e.fillStyle=`rgba(33, 150, 243, 0.15)`,e.fill()),e.stroke()}e.restore()}clearStrokes(){this.accumulatedStrokes=[],this.currentStrokePoints=[],this.isPointerDown=!1,this.isWorkerProcessing=!1,this.hasUnprocessedStrokes=!1,this.activeRequestId++;let e=document.getElementById(`test-image`);e&&e.classList.remove(`breathing-animation`),this.webcamCapture&&this.webcamCapture.classList.remove(`breathing-animation`),this.currentMaskBitmap&&=(this.currentMaskBitmap.close(),null),this.canvasCtx&&this.canvasCtx.clearRect(0,0,this.canvasElement.width,this.canvasElement.height),this.overlayCtx&&this.overlayCtx.clearRect(0,0,this.webcamOverlay.width,this.webcamOverlay.height),this.worker?.postMessage({type:`CLEAR`,reqId:this.activeRequestId}),this.updateStatus(`Strokes cleared`)}async predictWebcam(){}async detectImage(e){this.clearStrokes(),this.imageSet=!1,this.runningMode!==`IMAGE`&&(this.runningMode=`IMAGE`),this.isWorkerReady=!0,this.updateStatus(`Ready`),e&&(this.canvasElement.width=e.naturalWidth,this.canvasElement.height=e.naturalHeight,await this.setImageOnWorker(e))}async enableCam(){this.clearStrokes(),this.imageSet=!1,await super.enableCam(),this.freezeButton&&(this.freezeButton.disabled=!1,this.isFrozen=!1,this.freezeButton.innerText=`Freeze & Segment`,this.webcamCapture.style.display=`none`,this.webcamOverlay.style.display=`none`,this.video.style.display=`block`);let e=document.querySelector(`.instructions-banner span:nth-of-type(2)`);e&&(e.innerText=`Click anywhere on the webcam feed to freeze it, then draw a stroke on the object to segment.`)}stopCam(e=!0){super.stopCam(e),this.freezeButton&&(this.freezeButton.disabled=!0,this.isFrozen=!1,this.webcamCapture.style.display=`none`,this.webcamOverlay.style.display=`none`,this.video.style.display=`block`,this.overlayCtx.clearRect(0,0,this.webcamOverlay.width,this.webcamOverlay.height),this.webcamCtx.clearRect(0,0,this.webcamCapture.width,this.webcamCapture.height));let t=document.querySelector(`.instructions-banner span:nth-of-type(2)`);t&&(t.innerText=`Draw a stroke on an object in the image to segment it.`)}async toggleFreeze(){if(this.video&&this.video.srcObject){if(this.isFrozen)this.isFrozen=!1,this.clearStrokes(),this.imageSet=!1,this.freezeButton.innerText=`Freeze & Segment`,this.video.style.display=`block`,this.webcamCapture.style.display=`none`,this.webcamOverlay.style.display=`none`,this.webcamOverlay.style.pointerEvents=`none`,this.overlayCtx.clearRect(0,0,this.webcamOverlay.width,this.webcamOverlay.height),this.updateStatus(`Ready to freeze`);else{this.webcamCapture.width=this.video.videoWidth,this.webcamCapture.height=this.video.videoHeight,this.webcamOverlay.width=this.video.videoWidth,this.webcamOverlay.height=this.video.videoHeight,this.webcamCtx.drawImage(this.video,0,0),this.video.style.display=`none`,this.webcamCapture.style.display=`block`,this.webcamOverlay.style.display=`block`,this.webcamOverlay.style.pointerEvents=`auto`,this.webcamOverlay.classList.add(`clickable`),this.webcamOverlay.style.width=`100%`,this.isFrozen=!0,this.clearStrokes(),this.imageSet=!1,this.freezeButton.innerText=`Unfreeze`,await this.setImageOnWorker(this.webcamCapture),this.updateStatus(`Frozen! Draw on object to segment`);let e=document.querySelector(`.instructions-banner span:nth-of-type(2)`);e&&(e.innerText=`Draw a stroke on an object to segment it, or click Unfreeze to restart.`)}}}handleWorkerMessage(e){let{type:t}=e.data;if(t===`SEGMENT_RESULT`){let{reqId:t}=e.data;if(t!==void 0&&t!==this.activeRequestId){e.data.maskBitmap&&e.data.maskBitmap.close();return}if(this.hasUnprocessedStrokes)setTimeout(()=>this.triggerSegment(),0);else{this.isWorkerProcessing=!1;let e=document.getElementById(`test-image`);e&&e.classList.remove(`breathing-animation`),this.webcamCapture&&this.webcamCapture.classList.remove(`breathing-animation`)}let{maskBitmap:n,inferenceTime:r}=e.data;r>0&&(this.updateInferenceTime(r),this.updateStatus(`Done in ${Math.round(r)}ms`)),this.currentMaskBitmap&&=(this.currentMaskBitmap.close(),null),this.currentMaskBitmap=n,this.redrawOverlay(this.runningMode===`VIDEO`?`webcam`:`image`)}else super.handleWorkerMessage(e)}getWorkerInitParams(){return{}}displayImageResult(){}displayVideoResult(){}},nf=null;async function rf(e){nf=new tf({container:e,template:ef,defaultModelName:`interactive_segmentation`,defaultModelUrl:`https://storage.googleapis.com/mediapipe-models/interactive_segmenter_v2/magic_touch/int8/1/interactive_segmentation.task`,defaultDelegate:`GPU`,workerFactory:()=>new Worker(new URL(`/rps-hand/google-hands/assets/interactive-segmenter.worker-CjN7grv1.js`,``+import.meta.url),{type:`module`})}),await nf.initialize()}function af(){nf&&=(nf.cleanup(),null)}var of=`<div class="task-container">\r
  <div class="controls-panel">\r
    <div class="section-title">Model Selection</div>\r
    <div id="model-selector-container"></div>\r
\r
    <div class="divider"></div>\r
\r
    <div class="section-title">Settings</div>\r
    <div class="control-group">\r
      <div class="control-label">\r
        <span>Delegate</span>\r
      </div>\r
      <div class="select-wrapper">\r
        <select id="delegate-select">\r
          <option value="GPU">GPU</option>\r
          <option value="CPU">CPU</option>\r
        </select>\r
      </div>\r
    </div>\r
\r
    <div class="status-group">\r
      <div id="status-message" class="status-message">Initializing...</div>\r
      <div id="inference-time" class="inference-time">Inference Time: 0ms</div>\r
    </div>\r
  </div>\r
\r
  <div class="output-panel">\r
    <div class="output-header">\r
      <h2>Holistic Landmarker</h2>\r
      <div id="view-mode-toggle"></div>\r
    </div>\r
\r
    <div class="viewport">\r
      <div id="view-image" class="view-content active">\r
        <div class="upload-dropzone">\r
          <div class="dropzone-content">\r
            <span class="material-icons large-icon">image</span>\r
            <span>Drag & Drop or Click to Upload</span>\r
            <input type="file" id="image-upload" accept="image/*" />\r
          </div>\r
          <div id="image-preview-container" class="preview-container">\r
            <div class="canvas-wrapper">\r
              <img id="test-image" src="pose_model.png" crossorigin="anonymous" />\r
              <canvas id="image-canvas"></canvas>\r
            </div>\r
          </div>\r
        </div>\r
      </div>\r
\r
      <div id="view-webcam" class="view-content">\r
        <div class="cam-container">\r
          <div class="video-wrapper">\r
            <div class="webcam-placeholder" id="webcam-placeholder">\r
              <span class="material-icons">videocam_off</span>\r
              <p>Webcam Disabled</p>\r
            </div>\r
            <video id="webcam" autoplay playsinline></video>\r
            <canvas id="output_canvas"></canvas>\r
          </div>\r
          <div\r
            id="webcam-controls-container"\r
            style="display: none; justify-content: center; width: 100%; margin-top: auto; padding-bottom: 20px"\r
          >\r
            <button id="webcamButton" class="action-button">\r
              <span class="material-icons">videocam</span> Enable Webcam\r
            </button>\r
          </div>\r
        </div>\r
      </div>\r
    </div>\r
  </div>\r
</div>\r
`,sf=class extends Hu{getWorkerInitParams(){return{}}displayImageResult(e){let t=document.getElementById(`image-canvas`);if(!t)return;let n=t.getContext(`2d`),r=document.getElementById(`test-image`);t.width=r.naturalWidth,t.height=r.naturalHeight,n.clearRect(0,0,t.width,t.height),this.drawResults(n,e)}displayVideoResult(e){this.canvasElement&&this.video&&(this.canvasElement.width=this.video.videoWidth,this.canvasElement.height=this.video.videoHeight,this.canvasCtx.save(),this.canvasCtx.clearRect(0,0,this.canvasElement.width,this.canvasElement.height),this.drawResults(this.canvasCtx,e),this.canvasCtx.restore())}drawResults(e,t){let n=new q(e);if(t.faceLandmarks&&t.faceLandmarks.length>0)for(let e of t.faceLandmarks)n.drawConnectors(e,X.FACE_LANDMARKS_TESSELATION,{color:`#C0C0C070`,lineWidth:1}),n.drawConnectors(e,X.FACE_LANDMARKS_RIGHT_EYE,{color:`#FF3030`}),n.drawConnectors(e,X.FACE_LANDMARKS_RIGHT_EYEBROW,{color:`#FF3030`}),n.drawConnectors(e,X.FACE_LANDMARKS_LEFT_EYE,{color:`#30FF30`}),n.drawConnectors(e,X.FACE_LANDMARKS_LEFT_EYEBROW,{color:`#30FF30`}),n.drawConnectors(e,X.FACE_LANDMARKS_LIPS,{color:`#E0E0E0`}),n.drawConnectors(e,X.FACE_LANDMARKS_FACE_OVAL,{color:`#E0E0E0`});if(t.poseLandmarks&&t.poseLandmarks.length>0)for(let e of t.poseLandmarks)n.drawConnectors(e,$.POSE_CONNECTIONS,{color:`#FFFFFF`}),n.drawLandmarks(e,{color:`#FF0000`,radius:1});if(t.leftHandLandmarks&&t.leftHandLandmarks.length>0)for(let e of t.leftHandLandmarks)n.drawConnectors(e,Z.HAND_CONNECTIONS,{color:`#CC0000`,lineWidth:5}),n.drawLandmarks(e,{color:`#00FF00`,lineWidth:2});if(t.rightHandLandmarks&&t.rightHandLandmarks.length>0)for(let e of t.rightHandLandmarks)n.drawConnectors(e,Z.HAND_CONNECTIONS,{color:`#00CC00`,lineWidth:5}),n.drawLandmarks(e,{color:`#FF0000`,lineWidth:2})}},cf=null;async function lf(e){cf=new sf({container:e,template:of,defaultModelName:`holistic_landmarker_lite`,defaultModelUrl:`https://storage.googleapis.com/mediapipe-models/holistic_landmarker/holistic_landmarker/float16/1/holistic_landmarker.task`,defaultDelegate:`GPU`,workerFactory:()=>new Worker(new URL(`/rps-hand/google-hands/assets/holistic-landmarker.worker-DULtxW2w.js`,``+import.meta.url),{type:`module`})}),await cf.initialize()}function uf(){cf&&=(cf.cleanup(),null)}var df=`<div class="task-container">\r
  <div class="controls-panel">\r
    <div class="section-title">Model Selection</div>\r
    <div id="model-selector-container"></div>\r
\r
    <div class="divider"></div>\r
\r
    <div class="section-title">Settings</div>\r
    <div class="control-group">\r
      <div class="control-label">\r
        <span>Delegate</span>\r
      </div>\r
      <div class="select-wrapper">\r
        <select id="delegate-select">\r
          <option value="GPU">GPU</option>\r
          <option value="CPU">CPU</option>\r
        </select>\r
      </div>\r
    </div>\r
\r
    <div class="control-group">\r
      <div class="control-label">\r
        <span>Max Results</span>\r
        <span id="max-results-value" class="value-badge">3</span>\r
      </div>\r
      <input type="range" id="max-results" min="1" max="10" step="1" value="3" class="range-slider" />\r
    </div>\r
\r
    <div class="control-group">\r
      <div class="control-label">\r
        <span>Score Threshold</span>\r
        <span id="score-threshold-value" class="value-badge">0%</span>\r
      </div>\r
      <input type="range" id="score-threshold" min="0" max="100" step="1" value="0" class="range-slider" />\r
    </div>\r
    <div class="status-group">\r
      <div id="status-message" class="status-message">Initializing...</div>\r
      <div id="inference-time" class="inference-time">Inference Time: 0ms</div>\r
    </div>\r
  </div>\r
\r
  <div class="output-panel">\r
    <div class="output-header">\r
      <h2>Image Classifier</h2>\r
      <div id="view-mode-toggle"></div>\r
    </div>\r
\r
    <div class="viewport">\r
      <div id="view-image" class="view-content active">\r
        <div class="upload-dropzone">\r
          <div class="dropzone-content">\r
            <span class="material-icons large-icon">image</span>\r
            <span>Drag & Drop or Click to Upload</span>\r
            <input type="file" id="image-upload" accept="image/*" />\r
          </div>\r
          <div id="image-preview-container" class="preview-container">\r
            <img id="test-image" src="dog.jpg" crossorigin="anonymous" />\r
          </div>\r
        </div>\r
      </div>\r
\r
      <div id="view-webcam" class="view-content">\r
        <div class="cam-container">\r
          <div class="video-wrapper">\r
            <div class="webcam-placeholder" id="webcam-placeholder">\r
              <span class="material-icons">videocam_off</span>\r
              <p>Webcam Disabled</p>\r
            </div>\r
            <video id="webcam" autoplay playsinline></video>\r
            <canvas id="output_canvas" width="640" height="480" style="display: none"></canvas>\r
          </div>\r
          <div\r
            id="webcam-controls-container"\r
            style="display: none; justify-content: center; width: 100%; margin-top: auto; padding-bottom: 20px"\r
          >\r
            <button id="webcamButton" class="action-button">Enable Webcam</button>\r
          </div>\r
        </div>\r
      </div>\r
\r
      <div\r
        id="classification-results"\r
        class="classification-results"\r
        style="padding: 0 20px; margin-bottom: 20px"\r
      ></div>\r
    </div>\r
  </div>\r
</div>\r
`,ff=class extends Hu{classificationResultUI;maxResults=3;scoreThreshold=0;onInitializeUI(){this.classificationResultUI=new nd(`classification-results`);let e=document.getElementById(`max-results`),t=document.getElementById(`max-results-value`);e&&t&&e.addEventListener(`input`,()=>{this.maxResults=parseInt(e.value),t.innerText=this.maxResults.toString(),this.worker?.postMessage({type:`SET_OPTIONS`,maxResults:this.maxResults}),this.triggerRedetection()});let n=document.getElementById(`score-threshold`),r=document.getElementById(`score-threshold-value`);n&&r&&n.addEventListener(`input`,()=>{this.scoreThreshold=parseInt(n.value)/100,r.innerText=`${parseInt(n.value)}%`,this.worker?.postMessage({type:`SET_OPTIONS`,scoreThreshold:this.scoreThreshold}),this.triggerRedetection()}),this.models={efficientnet_lite0:`https://storage.googleapis.com/mediapipe-models/image_classifier/efficientnet_lite0/float32/1/efficientnet_lite0.tflite`,efficientnet_lite2:`https://storage.googleapis.com/mediapipe-models/image_classifier/efficientnet_lite2/float32/1/efficientnet_lite2.tflite`},this.modelSelector&&this.modelSelector.updateOptions([{label:`EfficientNet-Lite0`,value:`efficientnet_lite0`,isDefault:!0},{label:`EfficientNet-Lite2`,value:`efficientnet_lite2`}])}triggerRedetection(){if(this.runningMode===`IMAGE`){let e=document.getElementById(`test-image`);e&&e.src&&this.detectImage(e)}}getWorkerInitParams(){return{maxResults:this.maxResults,scoreThreshold:this.scoreThreshold}}displayImageResult(e){this.displayResult(e)}displayVideoResult(e){this.displayResult(e)}displayResult(e){if(this.classificationResultUI){if(e.classifications&&e.classifications.length>0){let t=e.classifications[0].categories.map(e=>({label:e.categoryName,score:e.score}));this.classificationResultUI.updateResults(t)}else this.classificationResultUI.clear()}}},pf=null;async function mf(e){pf=new ff({container:e,template:df,defaultModelName:`efficientnet_lite0`,defaultModelUrl:`https://storage.googleapis.com/mediapipe-models/image_classifier/efficientnet_lite0/float32/1/efficientnet_lite0.tflite`,workerFactory:()=>new Worker(new URL(`/rps-hand/google-hands/assets/image-classifier.worker-BeXIrM4j.js`,``+import.meta.url),{type:`module`}),defaultDelegate:`GPU`}),await pf.initialize()}function hf(){pf&&=(pf.cleanup(),null)}function gf(e){e.innerHTML=`
    <div class="sidebar-header">
      <button class="menu-toggle material-icons" style="margin-right: 12px; color: var(--text-secondary); background: none; border: none; font-size: 24px; cursor: pointer;">menu_open</button>
      <div class="sidebar-logo-text">
        <span class="material-icons" style="color: var(--primary); font-size: 32px;">analytics</span>
        <span style="font-weight: 600; color: var(--text-main);">MediaPipe Tasks</span>
      </div>
    </div>
    <nav class="sidebar-nav">
      <div class="category-header">Vision</div>
      <ul>
        <li><a href="#/vision/face_detector" class="nav-button" data-task="face-detector">Face Detector</a></li>
        <li><a href="#/vision/face_landmarker" class="nav-button" data-task="face-landmarker">Face Landmarker</a></li>
        <li><a href="#/vision/gesture_recognizer" class="nav-button" data-task="gesture-recognizer">Gesture Recognizer</a></li>
        <li><a href="#/vision/hand_landmarker" class="nav-button" data-task="hand-landmarker">Hand Landmarker</a></li>
        <li><a href="#/vision/holistic_landmarker" class="nav-button" data-task="holistic-landmarker">Holistic Landmarker</a></li>
        <li><a href="#/vision/image_classifier" class="nav-button" data-task="image-classifier">Image Classifier</a></li>
        <li><a href="#/vision/image_embedder" class="nav-button" data-task="image-embedder">Image Embedder</a></li>
        <li><a href="#/vision/image_segmenter" class="nav-button" data-task="image-segmenter">Image Segmenter</a></li>
        <li><a href="#/vision/interactive_segmenter" class="nav-button" data-task="interactive-segmenter">Interactive Segmenter</a></li>
        <li><a href="#/vision/object_detector" class="nav-button" data-task="object-detector">Object Detector</a></li>
        <li><a href="#/vision/pose_landmarker" class="nav-button" data-task="pose-landmarker">Pose Landmarker</a></li>
      </ul>

      <div class="category-header">Audio</div>
      <ul>
        <li><a href="#/audio/audio_classifier" class="nav-button" data-task="audio-classifier">Audio Classifier</a></li>
      </ul>

      <div class="category-header">Text</div>
      <ul>
        <li><a href="#/text/language_detector" class="nav-button" data-task="language-detector">Language Detector</a></li>
        <li><a href="#/text/text_classifier" class="nav-button" data-task="text-classifier">Text Classifier</a></li>
        <li><a href="#/text/text_embedder" class="nav-button" data-task="text-embedder">Text Embedder</a></li>
      </ul>
    </nav>
    <div class="sidebar-footer">
      <a href="https://goo.gle/mediapipe-privacy" target="_blank" rel="noopener noreferrer" class="sidebar-footer-link">
        <span class="material-icons">privacy_tip</span>
        <span>Privacy Notice</span>
      </a>
    </div>
  `}function _f(e){e.innerHTML=`
      <div style="display: flex; align-items: center; margin-right: 10px;">
        <span class="material-icons" style="color: #007f8b; font-size: 24px;">analytics</span>
      </div>
      <select id="mobile-task-select" class="mobile-task-select">
        <option value="#/vision/face_detector">Face Detection</option>
        <option value="#/vision/face_landmarker">Face Landmarker</option>
        <option value="#/vision/hand_landmarker">Hand Landmarker</option>
        <option value="#/vision/pose_landmarker">Pose Landmarker</option>
        <option value="#/vision/holistic_landmarker">Holistic Landmarker</option>
        <option value="#/vision/image_classifier">Image Classifier</option>
        <option value="#/vision/gesture_recognizer">Gesture Recognizer</option>
        <option value="#/vision/image_embedder">Image Embedding</option>
        <option value="#/vision/interactive_segmenter">Interactive Segmenter</option>
        <option value="#/vision/image_segmenter">Image Segmentation</option>
        <option value="#/vision/object_detector">Object Detection</option>
        <option value="#/audio/audio_classifier">Audio Classifier</option>
        <option value="#/text/text_classifier">Text Classification</option>
        <option value="#/text/language_detector">Language Detection</option>
        <option value="#/text/text_embedder">Text Embedding</option>
      </select>
  `;let t=document.getElementById(`mobile-task-select`),n=()=>{let e=window.location.hash||`#/vision/object_detector`;e.includes(`interactive_segmenter`)?t.value=`#/vision/interactive_segmenter`:e.includes(`image_segmenter`)?t.value=`#/vision/image_segmenter`:e.includes(`face_landmarker`)?t.value=`#/vision/face_landmarker`:e.includes(`hand_landmarker`)?t.value=`#/vision/hand_landmarker`:e.includes(`pose_landmarker`)?t.value=`#/vision/pose_landmarker`:e.includes(`holistic_landmarker`)?t.value=`#/vision/holistic_landmarker`:e.includes(`image_classifier`)?t.value=`#/vision/image_classifier`:e.includes(`gesture_recognizer`)?t.value=`#/vision/gesture_recognizer`:e.includes(`face_detector`)?t.value=`#/vision/face_detector`:e.includes(`audio_classifier`)?t.value=`#/audio/audio_classifier`:e.includes(`text_classifier`)?t.value=`#/text/text_classifier`:e.includes(`text_embedder`)?t.value=`#/text/text_embedder`:e.includes(`language_detector`)?t.value=`#/text/language_detector`:t.value=`#/vision/object_detector`};n(),window.addEventListener(`hashchange`,n),t.addEventListener(`change`,e=>{let t=e.target.value;window.location.hash=t})}var vf=document.querySelector(`#app`);vf.innerHTML=`
  <div class="app-container">
    <aside class="sidebar"></aside>
    <div class="mobile-header">
       <button class="menu-toggle material-icons" style="margin-right: 12px; color: var(--text-secondary); background: none; border: none; font-size: 24px; cursor: pointer;">menu</button>
       <div id="mobile-nav-container" style="display: flex; align-items: center; flex-grow: 1;"></div>
    </div>
    <main class="main-content"></main>
  </div>
`;var yf=vf.querySelector(`.sidebar`);gf(yf),_f(vf.querySelector(`#mobile-nav-container`)),vf.querySelectorAll(`.menu-toggle`).forEach(e=>{e.addEventListener(`click`,()=>{yf.classList.toggle(`open`)})}),yf.addEventListener(`click`,e=>{e.target.closest(`a`)&&yf.classList.remove(`open`)});var bf=vf.querySelector(`.main-content`),xf={"/vision/object_detector":{setup:Ku,cleanup:qu,label:`Object Detector`},"/vision/face_detector":{setup:Sd,cleanup:Cd,label:`Face Detector`},"/vision/face_landmarker":{setup:Dd,cleanup:Od,label:`Face Landmarker`},"/vision/hand_landmarker":{setup:Md,cleanup:Nd,label:`Hand Landmarker`},"/vision/pose_landmarker":{setup:Ld,cleanup:Rd,label:`Pose Landmarker`},"/vision/holistic_landmarker":{setup:lf,cleanup:uf,label:`Holistic Landmarker`},"/vision/image_classifier":{setup:mf,cleanup:hf,label:`Image Classifier`},"/vision/gesture_recognizer":{setup:Hd,cleanup:Ud,label:`Gesture Recognizer`},"/vision/interactive_segmenter":{setup:rf,cleanup:af,label:`Interactive Segmenter`},"/vision/image_segmenter":{setup:$u,cleanup:ed,label:`Image Segmenter`},"/vision/image_embedder":{setup:Qd,cleanup:$d,label:`Image Embedder`},"/audio/audio_classifier":{setup:od,cleanup:sd,label:`Audio Classifier`},"/text/text_classifier":{setup:fd,cleanup:pd,label:`Text Classifier`},"/text/language_detector":{setup:qd,cleanup:Jd,label:`Language Detector`},"/text/text_embedder":{setup:_d,cleanup:vd,label:`Text Embedder`}},Sf;async function Cf(){let e=window.location.hash.slice(1);(!e||!xf[e])&&(e=`/vision/object_detector`,window.location.hash=e);let t=xf[e];Sf&&=(Sf(),void 0),bf.innerHTML=``,t&&(await t.setup(bf),Sf=t.cleanup,document.title=`${t.label} - MediaPipe Web Task Demo`,yf.querySelectorAll(`a`).forEach(t=>{t.getAttribute(`href`)===`#${e}`?t.classList.add(`active`):t.classList.remove(`active`)}))}window.addEventListener(`hashchange`,Cf),window.addEventListener(`load`,Cf),Cf(),window.cleanupActiveTask=()=>{Sf&&=(Sf(),void 0)};