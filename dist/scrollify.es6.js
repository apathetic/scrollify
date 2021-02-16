/*!
 * Scrollify 1.0.0
 *
 * @link https://github.com/apathetic/scrollify
 * @copyright (c) 2021 wes hatch
 * @license MIT https://github.com/apathetic/scrollify/blob/master/LICENSE
 */
var t=function(t){return"function"==typeof t},n=function(t){return t instanceof HTMLElement?t:document.querySelector(t)},e=function(t){var n=t.getBoundingClientRect();return{left:n.left+window.pageXOffset,right:n.right+window.pageXOffset,top:n.top+window.pageYOffset,bottom:n.bottom+window.pageYOffset,height:n.height,width:n.width}},r=function(t,n,e){return(n-t)*e+t},o=function(t){var n=t.transforms,e=t.options;return function(t){n.position[1]=r.apply(void 0,e.concat([t]))}},a=o,i=function(t){var n=t.transforms,e=t.options;return function(t){n.rotation[2]=r.apply(void 0,e.concat([t]))}},s=i,u=function(t){var n=t.element,e=t.options;return function(t){n.style.opacity=r.apply(void 0,e.concat([t]))}},c=function(t){var n=t.element,e=t.options;return function(t){n.style.filter="blur("+r.apply(void 0,e.concat([t]))+"px)"}},f=function(t){var n=t.element,e=t.options,r=Object.keys(e);return function(t){r.forEach((function(r){var o=e[r];n.classList.toggle(o,t>+r)}))}},l=function(t){var n=t.element;function e(t){var e=n.__currentState;if(e!==t){if("sticky"==t){var r=n.getBoundingClientRect();n.style.top=r.top+"px",n.style.left=r.left+"px",n.style.width=r.width+"px"}else n.style.top="",n.style.left="",n.style.width="";n.classList.remove(e),n.classList.add(t),n.__currentState=t}}return function(t){e(t<=0?"normal":t>=1?"bottom":"sticky")}};[l,f,c,u].forEach((function(t){Object.defineProperty(t,"skipMatrix",{value:!0})}));var p=Object.freeze({__proto__:null,translateX:function(t){var n=t.transforms,e=t.options;return function(t){n.position[0]=r.apply(void 0,e.concat([t]))}},translateY:o,parallax:a,rotateX:function(t){var n=t.transforms,e=t.options;return function(t){n.rotation[0]=r.apply(void 0,e.concat([t]))}},rotateY:function(t){var n=t.transforms,e=t.options;return function(t){n.rotation[1]=r.apply(void 0,e.concat([t]))}},rotateZ:i,rotate:s,scaleX:function(t){var n=t.transforms,e=t.options;return function(t){n.scale[0]=r.apply(void 0,e.concat([t]))}},scaleY:function(t){var n=t.transforms,e=t.options;return void 0===e&&(e=[n.scale[1],1]),function(t){n.scale[1]=r.apply(void 0,e.concat([t]))}},scale:function(t){var n=t.transforms,e=t.options;return function(t){n.scale[0]=n.scale[1]=r.apply(void 0,e.concat([t]))}},skewX:function(t){var n=t.transforms,e=t.options;return function(t){n.skew[0]=r.apply(void 0,e.concat([t]))}},skewY:function(t){var n=t.transforms,e=t.options;return function(t){n.skew[1]=r.apply(void 0,e.concat([t]))}},skew:function(t){var n=t.transforms,e=t.options;return function(t){n.skew[0]=n.skew[1]=r.apply(void 0,e.concat([t]))}},fade:u,blur:c,toggle:f,stick:l});var h=Object.freeze({__proto__:null,oscillate:function(t,n,e,r){return t/=r,t=4*Math.PI*t,t=Math.sin(t)*e,(t=Math.abs(t))+n},easeInQuad:function(t,n,e,r){return e*(t/=r)*t+n},easeOutQuad:function(t,n,e,r){return-e*(t/=r)*(t-2)+n},easeInOutQuad:function(t,n,e,r){return(t/=r/2)<1?e/2*t*t+n:-e/2*(--t*(t-2)-1)+n},easeInCubic:function(t,n,e,r){return e*(t/=r)*t*t+n},easeOutCubic:function(t,n,e,r){return e*((t=t/r-1)*t*t+1)+n},easeInOutCubic:function(t,n,e,r){return(t/=r/2)<1?e/2*t*t*t+n:e/2*((t-=2)*t*t+2)+n},easeInQuart:function(t,n,e,r){return e*(t/=r)*t*t*t+n},easeOutQuart:function(t,n,e,r){return-e*((t=t/r-1)*t*t*t-1)+n},easeInOutQuart:function(t,n,e,r){return(t/=r/2)<1?e/2*t*t*t*t+n:-e/2*((t-=2)*t*t*t-2)+n},easeInQuint:function(t,n,e,r){return e*(t/=r)*t*t*t*t+n},easeOutQuint:function(t,n,e,r){return e*((t=t/r-1)*t*t*t*t+1)+n},easeInOutQuint:function(t,n,e,r){return(t/=r/2)<1?e/2*t*t*t*t*t+n:e/2*((t-=2)*t*t*t*t+2)+n},easeInSine:function(t,n,e,r){return-e*Math.cos(t/r*(Math.PI/2))+e+n},easeOutSine:function(t,n,e,r){return e*Math.sin(t/r*(Math.PI/2))+n},easeInOutSine:function(t,n,e,r){return-e/2*(Math.cos(Math.PI*t/r)-1)+n},easeInExpo:function(t,n,e,r){return 0==t?n:e*Math.pow(2,10*(t/r-1))+n},easeOutExpo:function(t,n,e,r){return t==r?n+e:e*(1-Math.pow(2,-10*t/r))+n},easeInOutExpo:function(t,n,e,r){return 0==t?n:t==r?n+e:(t/=r/2)<1?e/2*Math.pow(2,10*(t-1))+n:e/2*(2-Math.pow(2,-10*--t))+n},easeInCirc:function(t,n,e,r){return-e*(Math.sqrt(1-(t/=r)*t)-1)+n},easeOutCirc:function(t,n,e,r){return e*Math.sqrt(1-(t=t/r-1)*t)+n},easeInOutCirc:function(t,n,e,r){return(t/=r/2)<1?-e/2*(Math.sqrt(1-t*t)-1)+n:e/2*(Math.sqrt(1-(t-=2)*t)+1)+n},easeInElastic:function(t,n,e,r){var o=1.70158,a=0,i=e;if(0==t)return n;if(1==(t/=r))return n+e;if(a||(a=.3*r),i<Math.abs(e)){i=e;o=a/4}else o=a/(2*Math.PI)*Math.asin(e/i);return-i*Math.pow(2,10*(t-=1))*Math.sin((t*r-o)*(2*Math.PI)/a)+n},easeOutElastic:function(t,n,e,r){var o=1.70158,a=0,i=e;if(0==t)return n;if(1==(t/=r))return n+e;if(a||(a=.3*r),i<Math.abs(e)){i=e;o=a/4}else o=a/(2*Math.PI)*Math.asin(e/i);return i*Math.pow(2,-10*t)*Math.sin((t*r-o)*(2*Math.PI)/a)+e+n},easeInOutElastic:function(t,n,e,r){var o=1.70158,a=0,i=e;if(0==t)return n;if(2==(t/=r/2))return n+e;if(a||(a=r*(.3*1.5)),i<Math.abs(e)){i=e;o=a/4}else o=a/(2*Math.PI)*Math.asin(e/i);return t<1?i*Math.pow(2,10*(t-=1))*Math.sin((t*r-o)*(2*Math.PI)/a)*-.5+n:i*Math.pow(2,-10*(t-=1))*Math.sin((t*r-o)*(2*Math.PI)/a)*.5+e+n},easeInBack:function(t,n,e,r,o){return null==o&&(o=1.70158),e*(t/=r)*t*((o+1)*t-o)+n},easeOutBack:function(t,n,e,r,o){return null==o&&(o=1.70158),e*((t=t/r-1)*t*((o+1)*t+o)+1)+n},easeInOutBack:function(t,n,e,r,o){return null==o&&(o=1.70158),(t/=r/2)<1?e/2*(t*t*((1+(o*=1.525))*t-o))+n:e/2*((t-=2)*t*((1+(o*=1.525))*t+o)+2)+n},easeOutBounce:function(t,n,e,r){return(t/=r<1/2.75)?e*(7.5625*t*t)+n:t<2/2.75?e*(7.5625*(t-=1.5/2.75)*t+.75)+n:t<2.5/2.75?e*(7.5625*(t-=2.25/2.75)*t+.9375)+n:e*(7.5625*(t-=2.625/2.75)*t+.984375)+n}});function d(t,n,e){return e[0]=t[0]*n[0]+t[1]*n[4]+t[2]*n[8]+t[3]*n[12],e[1]=t[0]*n[1]+t[1]*n[5]+t[2]*n[9]+t[3]*n[13],e[2]=t[0]*n[2]+t[1]*n[6]+t[2]*n[10]+t[3]*n[14],e[3]=t[0]*n[3]+t[1]*n[7]+t[2]*n[11]+t[3]*n[15],e[4]=t[4]*n[0]+t[5]*n[4]+t[6]*n[8]+t[7]*n[12],e[5]=t[4]*n[1]+t[5]*n[5]+t[6]*n[9]+t[7]*n[13],e[6]=t[4]*n[2]+t[5]*n[6]+t[6]*n[10]+t[7]*n[14],e[7]=t[4]*n[3]+t[5]*n[7]+t[6]*n[11]+t[7]*n[15],e[8]=t[8]*n[0]+t[9]*n[4]+t[10]*n[8]+t[11]*n[12],e[9]=t[8]*n[1]+t[9]*n[5]+t[10]*n[9]+t[11]*n[13],e[10]=t[8]*n[2]+t[9]*n[6]+t[10]*n[10]+t[11]*n[14],e[11]=t[8]*n[3]+t[9]*n[7]+t[10]*n[11]+t[11]*n[15],e[12]=t[12]*n[0]+t[13]*n[4]+t[14]*n[8]+t[15]*n[12],e[13]=t[12]*n[1]+t[13]*n[5]+t[14]*n[9]+t[15]*n[13],e[14]=t[12]*n[2]+t[13]*n[6]+t[14]*n[10]+t[15]*n[14],e[15]=t[12]*n[3]+t[13]*n[7]+t[14]*n[11]+t[15]*n[15],e}function v(t){t[0]=1,t[1]=0,t[2]=0,t[3]=0,t[4]=0,t[5]=1,t[6]=0,t[7]=0,t[8]=0,t[9]=0,t[10]=1,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1}function M(t,n){n[0]=t[0],n[1]=t[1],n[2]=t[2],n[3]=t[3],n[4]=t[4],n[5]=t[5],n[6]=t[6],n[7]=t[7],n[8]=t[8],n[9]=t[9],n[10]=t[10],n[11]=t[11],n[12]=t[12],n[13]=t[13],n[14]=t[14],n[15]=t[15]}function w(){var t=new Float32Array(16),n=new Float32Array(16),e=new Float32Array(16);return v(t),{data:t,asCSS:function(){for(var n="matrix3d(",e=0;e<15;++e)Math.abs(t[e])<1e-4?n+="0,":n+=t[e].toFixed(10)+",";return Math.abs(t[15])<1e-4?n+="0)":n+=t[15].toFixed(10)+")",n},clear:function(){v(t)},translate:function(r,o,a){return M(t,n),function(t,n,e,r){t[0]=1,t[1]=0,t[2]=0,t[3]=0,t[4]=0,t[5]=1,t[6]=0,t[7]=0,t[8]=0,t[9]=0,t[10]=1,t[11]=0,t[12]=n,t[13]=e,t[14]=r,t[15]=1}(e,r,o,a),d(n,e,t),this},rotateX:function(r){var o,a;return M(t,n),a=r,(o=e)[0]=1,o[1]=0,o[2]=0,o[3]=0,o[4]=0,o[5]=Math.cos(a),o[6]=-Math.sin(a),o[7]=0,o[8]=0,o[9]=Math.sin(a),o[10]=Math.cos(a),o[11]=0,o[12]=0,o[13]=0,o[14]=0,o[15]=1,d(n,e,t),this},rotateY:function(r){var o,a;return M(t,n),a=r,(o=e)[0]=Math.cos(a),o[1]=0,o[2]=Math.sin(a),o[3]=0,o[4]=0,o[5]=1,o[6]=0,o[7]=0,o[8]=-Math.sin(a),o[9]=0,o[10]=Math.cos(a),o[11]=0,o[12]=0,o[13]=0,o[14]=0,o[15]=1,d(n,e,t),this},rotateZ:function(r){var o,a;return M(t,n),a=r,(o=e)[0]=Math.cos(a),o[1]=-Math.sin(a),o[2]=0,o[3]=0,o[4]=Math.sin(a),o[5]=Math.cos(a),o[6]=0,o[7]=0,o[8]=0,o[9]=0,o[10]=1,o[11]=0,o[12]=0,o[13]=0,o[14]=0,o[15]=1,d(n,e,t),this},scale:function(r,o){return M(t,n),function(t,n,e){t[0]=n,t[1]=0,t[2]=0,t[3]=0,t[4]=0,t[5]=e,t[6]=0,t[7]=0,t[8]=0,t[9]=0,t[10]=1,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1}(e,r,o),d(n,e,t),this},skew:function(r,o){return M(t,n),function(t,n,e){t[0]=1,t[1]=Math.tan(n),t[2]=0,t[3]=0,t[4]=Math.tan(e),t[5]=1,t[6]=0,t[7]=0,t[8]=0,t[9]=0,t[10]=1,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1}(e,r,o),d(n,e,t),this}}}function m(t,n,e){if(void 0===n&&(n=[]),"number"==typeof t)return t;document.body.scrollHeight,document.body.scrollWidth;var r=window.innerWidth,o=window.innerHeight;return new Function("refs","el","'use strict';return ("+t.replace(/(\d*)vw/g,(function(t,n){return.01*n*r})).replace(/(\d*)vh/g,(function(t,n){return.01*n*o})).replace(/px/g,"")+");")(n,e)}var y=function t(e){var r=this;(e=n(e))?(e.dataset.scrollify,this.scenes=[],this.element=e,this.ticking=!1,this.active=!0,this.matrix=w(),this.transforms={scale:[1,1],rotation:[0,0,0],position:[0,0,0]},e.style.willChange="transform",window.addEventListener("scroll",(function(){return r.onScroll()}),{passive:!0}),window.addEventListener("resize",(function(){return r.onResize()}),{passive:!0})):document.querySelectorAll("[data-scrollify]").forEach((function(n){return new t(n)}))};y.prototype.parseDataAttribute=function(t){var n;return n=t.dataset.scrollify,Function("'use strict';return ("+n+")")()},y.prototype.addScene=function(r){var o=this,a=this.element,i=this.transforms,s=r.start;void 0===s&&(s="el.top - 100vh");var u=r.end;void 0===u&&(u="el.bottom");var c=r.easing,f=r.refs;void 0===f&&(f=[]);var l=r.effects;void 0===l&&(l={});var d=function(n,e){return Object.keys(l).reduce((function(r,o){var s,u,c,f=l[o];return t(f)?s=f:(s=p[o],c=f,u=Array.isArray(c)?f.map((function(t){return m(t,n,e)})):f),r.push(s({element:a,transforms:i,options:u})),r}),[])},v={start:0,duration:0,state:"",easing:t(c)?c:h[c],effects:[],reset:function(){var t=window.scrollY,r=e(a),i=function(t){return t.map(n).map(e)}(f),c=m(s,i,r),l=m(u,i,r),p=d(i,r);v.effects=p,v.start=c,v.duration=l-c,v.state=t>c?t>l?"after":"active":"before",o.update(v)}};return r.skipMatrix&&(v.skipMatrix=!0),v.reset(),r.debug&&console.log("Scrollify scene: ",v),this.scenes.push(v),this},y.prototype.onScroll=function(){var t=this;this.active&&window.requestAnimationFrame((function(){t.scenes.forEach((function(n){return t.update(n)}),t)}))},y.prototype.onResize=function(){this.scenes.forEach((function(t){return t.reset()}))},y.prototype.update=function(t){var n,e=t.start,r=t.duration,o=t.easing,a=t.effects,i=window.scrollY;if(i-e>r){if("after"===t.state)return;t.state="after",n=1}else if(i-e<0){if("before"===t.state)return;t.state="before",n=0}else t.state="active",n=o?o(i-e,0,1,r):(i-e)/r;a.forEach((function(t){return t(n)})),t.skipMatrix||(this.element.style.transform=this.updateMatrix().asCSS())},y.prototype.updateMatrix=function(){var t=this.matrix,n=this.transforms;return t.clear(),n.transformOrigin&&t.translate(-n.transformOrigin[0],-n.transformOrigin[1],-n.transformOrigin[2]),n.scale&&t.scale(n.scale[0],n.scale[1]),n.skew&&t.skew(n.skew[0],n.skew[1]),n.rotation&&(t.rotateX(n.rotation[0]),t.rotateY(n.rotation[1]),t.rotateZ(n.rotation[2])),n.position&&t.translate(n.position[0],n.position[1],n.position[2]),n.transformOrigin&&t.translate(n.transformOrigin[0],n.transformOrigin[1],n.transformOrigin[2]),t},y.prototype.disable=function(){this.active=!1};export default y;export{y as Scrollify,h as easings,p as fx};
