(globalThis.TURBOPACK||(globalThis.TURBOPACK=[])).push(["object"==typeof document?document.currentScript:void 0,94744,e=>{"use strict";let t,r;var n,i=e.i(30668);let o={data:""},a=/(?:([\u0080-\uFFFF\w-%@]+) *:? *([^{;]+?);|([^;}{]*?) *{)|(}\s*)/g,l=/\/\*[^]*?\*\/|  +/g,s=/\n+/g,d=(e,t)=>{let r="",n="",i="";for(let o in e){let a=e[o];"@"==o[0]?"i"==o[1]?r=o+" "+a+";":n+="f"==o[1]?d(a,o):o+"{"+d(a,"k"==o[1]?"":t)+"}":"object"==typeof a?n+=d(a,t?t.replace(/([^,])+/g,e=>o.replace(/([^,]*:\S+\([^)]*\))|([^,])+/g,t=>/&/.test(t)?t.replace(/&/g,e):e?e+" "+t:t)):o):null!=a&&(o=/^--/.test(o)?o:o.replace(/[A-Z]/g,"-$&").toLowerCase(),i+=d.p?d.p(o,a):o+":"+a+";")}return r+(t&&i?t+"{"+i+"}":i)+n},c={},u=e=>{if("object"==typeof e){let t="";for(let r in e)t+=r+u(e[r]);return t}return e};function p(e){let t,r,n=this||{},i=e.call?e(n.p):e;return((e,t,r,n,i)=>{var o;let p=u(e),m=c[p]||(c[p]=(e=>{let t=0,r=11;for(;t<e.length;)r=101*r+e.charCodeAt(t++)>>>0;return"go"+r})(p));if(!c[m]){let t=p!==e?e:(e=>{let t,r,n=[{}];for(;t=a.exec(e.replace(l,""));)t[4]?n.shift():t[3]?(r=t[3].replace(s," ").trim(),n.unshift(n[0][r]=n[0][r]||{})):n[0][t[1]]=t[2].replace(s," ").trim();return n[0]})(e);c[m]=d(i?{["@keyframes "+m]:t}:t,r?"":"."+m)}let f=r&&c.g?c.g:null;return r&&(c.g=c[m]),o=c[m],f?t.data=t.data.replace(f,o):-1===t.data.indexOf(o)&&(t.data=n?o+t.data:t.data+o),m})(i.unshift?i.raw?(t=[].slice.call(arguments,1),r=n.p,i.reduce((e,n,i)=>{let o=t[i];if(o&&o.call){let e=o(r),t=e&&e.props&&e.props.className||/^go/.test(e)&&e;o=t?"."+t:e&&"object"==typeof e?e.props?"":d(e,""):!1===e?"":e}return e+n+(null==o?"":o)},"")):i.reduce((e,t)=>Object.assign(e,t&&t.call?t(n.p):t),{}):i,(e=>{if("object"==typeof window){let t=(e?e.querySelector("#_goober"):window._goober)||Object.assign(document.createElement("style"),{innerHTML:" ",id:"_goober"});return t.nonce=window.__nonce__,t.parentNode||(e||document.head).appendChild(t),t.firstChild}return e||o})(n.target),n.g,n.o,n.k)}p.bind({g:1});let m,f,g,h=p.bind({k:1});function y(e,t){let r=this||{};return function(){let n=arguments;function i(o,a){let l=Object.assign({},o),s=l.className||i.className;r.p=Object.assign({theme:f&&f()},l),r.o=/ *go\d+/.test(s),l.className=p.apply(r,n)+(s?" "+s:""),t&&(l.ref=a);let d=e;return e[0]&&(d=l.as||e,delete l.as),g&&d[0]&&g(l),m(d,l)}return t?t(i):i}}var b=(e,t)=>"function"==typeof e?e(t):e,v=(t=0,()=>(++t).toString()),w=()=>{if(void 0===r&&"u">typeof window){let e=matchMedia("(prefers-reduced-motion: reduce)");r=!e||e.matches}return r},E="default",x=(e,t)=>{let{toastLimit:r}=e.settings;switch(t.type){case 0:return{...e,toasts:[t.toast,...e.toasts].slice(0,r)};case 1:return{...e,toasts:e.toasts.map(e=>e.id===t.toast.id?{...e,...t.toast}:e)};case 2:let{toast:n}=t;return x(e,{type:+!!e.toasts.find(e=>e.id===n.id),toast:n});case 3:let{toastId:i}=t;return{...e,toasts:e.toasts.map(e=>e.id===i||void 0===i?{...e,dismissed:!0,visible:!1}:e)};case 4:return void 0===t.toastId?{...e,toasts:[]}:{...e,toasts:e.toasts.filter(e=>e.id!==t.toastId)};case 5:return{...e,pausedAt:t.time};case 6:let o=t.time-(e.pausedAt||0);return{...e,pausedAt:void 0,toasts:e.toasts.map(e=>({...e,pauseDuration:e.pauseDuration+o}))}}},S=[],I={toasts:[],pausedAt:void 0,settings:{toastLimit:20}},C={},L=(e,t=E)=>{C[t]=x(C[t]||I,e),S.forEach(([e,r])=>{e===t&&r(C[t])})},A=e=>Object.keys(C).forEach(t=>L(e,t)),R=(e=E)=>t=>{L(t,e)},z={blank:4e3,error:4e3,success:2e3,loading:1/0,custom:4e3},N=(e={},t=E)=>{let[r,n]=(0,i.useState)(C[t]||I),o=(0,i.useRef)(C[t]);(0,i.useEffect)(()=>(o.current!==C[t]&&n(C[t]),S.push([t,n]),()=>{let e=S.findIndex(([e])=>e===t);e>-1&&S.splice(e,1)}),[t]);let a=r.toasts.map(t=>{var r,n,i;return{...e,...e[t.type],...t,removeDelay:t.removeDelay||(null==(r=e[t.type])?void 0:r.removeDelay)||(null==e?void 0:e.removeDelay),duration:t.duration||(null==(n=e[t.type])?void 0:n.duration)||(null==e?void 0:e.duration)||z[t.type],style:{...e.style,...null==(i=e[t.type])?void 0:i.style,...t.style}}});return{...r,toasts:a}},T=e=>(t,r)=>{let n,i=((e,t="blank",r)=>({createdAt:Date.now(),visible:!0,dismissed:!1,type:t,ariaProps:{role:"status","aria-live":"polite"},message:e,pauseDuration:0,...r,id:(null==r?void 0:r.id)||v()}))(t,e,r);return R(i.toasterId||(n=i.id,Object.keys(C).find(e=>C[e].toasts.some(e=>e.id===n))))({type:2,toast:i}),i.id},M=(e,t)=>T("blank")(e,t);M.error=T("error"),M.success=T("success"),M.loading=T("loading"),M.custom=T("custom"),M.dismiss=(e,t)=>{let r={type:3,toastId:e};t?R(t)(r):A(r)},M.dismissAll=e=>M.dismiss(void 0,e),M.remove=(e,t)=>{let r={type:4,toastId:e};t?R(t)(r):A(r)},M.removeAll=e=>M.remove(void 0,e),M.promise=(e,t,r)=>{let n=M.loading(t.loading,{...r,...null==r?void 0:r.loading});return"function"==typeof e&&(e=e()),e.then(e=>{let i=t.success?b(t.success,e):void 0;return i?M.success(i,{id:n,...r,...null==r?void 0:r.success}):M.dismiss(n),e}).catch(e=>{let i=t.error?b(t.error,e):void 0;i?M.error(i,{id:n,...r,...null==r?void 0:r.error}):M.dismiss(n)}),e};var O=1e3,D=(e,t="default")=>{let{toasts:r,pausedAt:n}=N(e,t),o=(0,i.useRef)(new Map).current,a=(0,i.useCallback)((e,t=O)=>{if(o.has(e))return;let r=setTimeout(()=>{o.delete(e),l({type:4,toastId:e})},t);o.set(e,r)},[]);(0,i.useEffect)(()=>{if(n)return;let e=Date.now(),i=r.map(r=>{if(r.duration===1/0)return;let n=(r.duration||0)+r.pauseDuration-(e-r.createdAt);if(n<0){r.visible&&M.dismiss(r.id);return}return setTimeout(()=>M.dismiss(r.id,t),n)});return()=>{i.forEach(e=>e&&clearTimeout(e))}},[r,n,t]);let l=(0,i.useCallback)(R(t),[t]),s=(0,i.useCallback)(()=>{l({type:5,time:Date.now()})},[l]),d=(0,i.useCallback)((e,t)=>{l({type:1,toast:{id:e,height:t}})},[l]),c=(0,i.useCallback)(()=>{n&&l({type:6,time:Date.now()})},[n,l]),u=(0,i.useCallback)((e,t)=>{let{reverseOrder:n=!1,gutter:i=8,defaultPosition:o}=t||{},a=r.filter(t=>(t.position||o)===(e.position||o)&&t.height),l=a.findIndex(t=>t.id===e.id),s=a.filter((e,t)=>t<l&&e.visible).length;return a.filter(e=>e.visible).slice(...n?[s+1]:[0,s]).reduce((e,t)=>e+(t.height||0)+i,0)},[r]);return(0,i.useEffect)(()=>{r.forEach(e=>{if(e.dismissed)a(e.id,e.removeDelay);else{let t=o.get(e.id);t&&(clearTimeout(t),o.delete(e.id))}})},[r,a]),{toasts:r,handlers:{updateHeight:d,startPause:s,endPause:c,calculateOffset:u}}},k=h`
from {
  transform: scale(0) rotate(45deg);
	opacity: 0;
}
to {
 transform: scale(1) rotate(45deg);
  opacity: 1;
}`,_=h`
from {
  transform: scale(0);
  opacity: 0;
}
to {
  transform: scale(1);
  opacity: 1;
}`,P=h`
from {
  transform: scale(0) rotate(90deg);
	opacity: 0;
}
to {
  transform: scale(1) rotate(90deg);
	opacity: 1;
}`,j=y("div")`
  width: 20px;
  opacity: 0;
  height: 20px;
  border-radius: 10px;
  background: ${e=>e.primary||"#ff4b4b"};
  position: relative;
  transform: rotate(45deg);

  animation: ${k} 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)
    forwards;
  animation-delay: 100ms;

  &:after,
  &:before {
    content: '';
    animation: ${_} 0.15s ease-out forwards;
    animation-delay: 150ms;
    position: absolute;
    border-radius: 3px;
    opacity: 0;
    background: ${e=>e.secondary||"#fff"};
    bottom: 9px;
    left: 4px;
    height: 2px;
    width: 12px;
  }

  &:before {
    animation: ${P} 0.15s ease-out forwards;
    animation-delay: 180ms;
    transform: rotate(90deg);
  }
`,$=h`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`,F=y("div")`
  width: 12px;
  height: 12px;
  box-sizing: border-box;
  border: 2px solid;
  border-radius: 100%;
  border-color: ${e=>e.secondary||"#e0e0e0"};
  border-right-color: ${e=>e.primary||"#616161"};
  animation: ${$} 1s linear infinite;
`,B=h`
from {
  transform: scale(0) rotate(45deg);
	opacity: 0;
}
to {
  transform: scale(1) rotate(45deg);
	opacity: 1;
}`,H=h`
0% {
	height: 0;
	width: 0;
	opacity: 0;
}
40% {
  height: 0;
	width: 6px;
	opacity: 1;
}
100% {
  opacity: 1;
  height: 10px;
}`,U=y("div")`
  width: 20px;
  opacity: 0;
  height: 20px;
  border-radius: 10px;
  background: ${e=>e.primary||"#61d345"};
  position: relative;
  transform: rotate(45deg);

  animation: ${B} 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)
    forwards;
  animation-delay: 100ms;
  &:after {
    content: '';
    box-sizing: border-box;
    animation: ${H} 0.2s ease-out forwards;
    opacity: 0;
    animation-delay: 200ms;
    position: absolute;
    border-right: 2px solid;
    border-bottom: 2px solid;
    border-color: ${e=>e.secondary||"#fff"};
    bottom: 6px;
    left: 6px;
    height: 10px;
    width: 6px;
  }
`,V=y("div")`
  position: absolute;
`,q=y("div")`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  min-width: 20px;
  min-height: 20px;
`,W=h`
from {
  transform: scale(0.6);
  opacity: 0.4;
}
to {
  transform: scale(1);
  opacity: 1;
}`,Y=y("div")`
  position: relative;
  transform: scale(0.6);
  opacity: 0.4;
  min-width: 20px;
  animation: ${W} 0.3s 0.12s cubic-bezier(0.175, 0.885, 0.32, 1.275)
    forwards;
`,J=({toast:e})=>{let{icon:t,type:r,iconTheme:n}=e;return void 0!==t?"string"==typeof t?i.createElement(Y,null,t):t:"blank"===r?null:i.createElement(q,null,i.createElement(F,{...n}),"loading"!==r&&i.createElement(V,null,"error"===r?i.createElement(j,{...n}):i.createElement(U,{...n})))},X=y("div")`
  display: flex;
  align-items: center;
  background: #fff;
  color: #363636;
  line-height: 1.3;
  will-change: transform;
  box-shadow: 0 3px 10px rgba(0, 0, 0, 0.1), 0 3px 3px rgba(0, 0, 0, 0.05);
  max-width: 350px;
  pointer-events: auto;
  padding: 8px 10px;
  border-radius: 8px;
`,K=y("div")`
  display: flex;
  justify-content: center;
  margin: 4px 10px;
  color: inherit;
  flex: 1 1 auto;
  white-space: pre-line;
`,Z=i.memo(({toast:e,position:t,style:r,children:n})=>{let o=e.height?((e,t)=>{let r=e.includes("top")?1:-1,[n,i]=w()?["0%{opacity:0;} 100%{opacity:1;}","0%{opacity:1;} 100%{opacity:0;}"]:[`
0% {transform: translate3d(0,${-200*r}%,0) scale(.6); opacity:.5;}
100% {transform: translate3d(0,0,0) scale(1); opacity:1;}
`,`
0% {transform: translate3d(0,0,-1px) scale(1); opacity:1;}
100% {transform: translate3d(0,${-150*r}%,-1px) scale(.6); opacity:0;}
`];return{animation:t?`${h(n)} 0.35s cubic-bezier(.21,1.02,.73,1) forwards`:`${h(i)} 0.4s forwards cubic-bezier(.06,.71,.55,1)`}})(e.position||t||"top-center",e.visible):{opacity:0},a=i.createElement(J,{toast:e}),l=i.createElement(K,{...e.ariaProps},b(e.message,e));return i.createElement(X,{className:e.className,style:{...o,...r,...e.style}},"function"==typeof n?n({icon:a,message:l}):i.createElement(i.Fragment,null,a,l))});n=i.createElement,d.p=void 0,m=n,f=void 0,g=void 0;var G=({id:e,className:t,style:r,onHeightUpdate:n,children:o})=>{let a=i.useCallback(t=>{if(t){let r=()=>{n(e,t.getBoundingClientRect().height)};r(),new MutationObserver(r).observe(t,{subtree:!0,childList:!0,characterData:!0})}},[e,n]);return i.createElement("div",{ref:a,className:t,style:r},o)},Q=p`
  z-index: 9999;
  > * {
    pointer-events: auto;
  }
`,ee=({reverseOrder:e,position:t="top-center",toastOptions:r,gutter:n,children:o,toasterId:a,containerStyle:l,containerClassName:s})=>{let{toasts:d,handlers:c}=D(r,a);return i.createElement("div",{"data-rht-toaster":a||"",style:{position:"fixed",zIndex:9999,top:16,left:16,right:16,bottom:16,pointerEvents:"none",...l},className:s,onMouseEnter:c.startPause,onMouseLeave:c.endPause},d.map(r=>{let a,l,s=r.position||t,d=c.calculateOffset(r,{reverseOrder:e,gutter:n,defaultPosition:t}),u=(a=s.includes("top"),l=s.includes("center")?{justifyContent:"center"}:s.includes("right")?{justifyContent:"flex-end"}:{},{left:0,right:0,display:"flex",position:"absolute",transition:w()?void 0:"all 230ms cubic-bezier(.21,1.02,.73,1)",transform:`translateY(${d*(a?1:-1)}px)`,...a?{top:0}:{bottom:0},...l});return i.createElement(G,{id:r.id,key:r.id,onHeightUpdate:c.updateHeight,className:r.visible?Q:"",style:u},"custom"===r.type?b(r.message,r):o?o(r):i.createElement(Z,{toast:r,position:s}))}))};e.s(["CheckmarkIcon",()=>U,"ErrorIcon",()=>j,"LoaderIcon",()=>F,"ToastBar",()=>Z,"ToastIcon",()=>J,"Toaster",()=>ee,"default",()=>M,"resolveValue",()=>b,"toast",()=>M,"useToaster",()=>D,"useToasterStore",()=>N],94744)},65876,e=>{"use strict";var t=e.i(8399);let r="luxerent_wishlist";function n(e){try{localStorage.setItem(r,JSON.stringify(e))}catch{}}let i={productIds:function(){try{let e=localStorage.getItem(r);if(!e)return[];let t=JSON.parse(e);return Array.isArray(t)?t:[]}catch{return[]}}()},o=(0,t.createSlice)({name:"wishlist",initialState:i,reducers:{addToWishlist:(e,t)=>{let r=t.payload;e.productIds.includes(r)||(e.productIds.push(r),n(e.productIds))},removeFromWishlist:(e,t)=>{e.productIds=e.productIds.filter(e=>e!==t.payload),n(e.productIds)},toggleWishlist:(e,t)=>{let r=t.payload;e.productIds.indexOf(r)>=0?e.productIds=e.productIds.filter(e=>e!==r):e.productIds.push(r),n(e.productIds)}}}),{addToWishlist:a,removeFromWishlist:l,toggleWishlist:s}=o.actions,d=o.reducer;e.s(["default",0,d,"toggleWishlist",0,s])},37848,e=>{"use strict";var t=e.i(8399);let r={category:"All",priceMin:"",priceMax:"",duration:"",availabilityStart:"",availabilityEnd:"",ratingMin:""},n=(0,t.createSlice)({name:"filters",initialState:r,reducers:{setCategory:(e,t)=>{e.category=t.payload},setPriceRange:(e,t)=>{void 0!==t.payload.min&&(e.priceMin=t.payload.min),void 0!==t.payload.max&&(e.priceMax=t.payload.max)},setDuration:(e,t)=>{e.duration=t.payload},setAvailability:(e,t)=>{void 0!==t.payload.start&&(e.availabilityStart=t.payload.start),void 0!==t.payload.end&&(e.availabilityEnd=t.payload.end)},setRatingMin:(e,t)=>{e.ratingMin=t.payload},resetFilters:()=>r}}),{setCategory:i,setPriceRange:o,setDuration:a,setAvailability:l,setRatingMin:s,resetFilters:d}=n.actions,c=n.reducer;e.s(["default",0,c,"resetFilters",0,d,"setAvailability",0,l,"setCategory",0,i,"setDuration",0,a,"setPriceRange",0,o,"setRatingMin",0,s])},63185,e=>{"use strict";var t=e.i(8399);let r="luxerent_recently_viewed";function n(e){try{localStorage.setItem(r,JSON.stringify(e.slice(0,20)))}catch{}}let i={productIds:function(){try{let e=localStorage.getItem(r);if(!e)return[];let t=JSON.parse(e);return Array.isArray(t)?t.slice(0,20):[]}catch{return[]}}()},o=(0,t.createSlice)({name:"recentlyViewed",initialState:i,reducers:{addViewed:(e,t)=>{let r=t.payload;e.productIds=[r,...e.productIds.filter(e=>e!==r)].slice(0,20),n(e.productIds)},clearViewed:e=>{e.productIds=[],n(e.productIds)}}}),{addViewed:a,clearViewed:l}=o.actions,s=o.reducer;e.s(["addViewed",0,a,"default",0,s])},51987,e=>{"use strict";var t=e.i(48277),r=e.i(79036),n=e.i(8399),i=e.i(40672),o=e.i(5619),a=e.i(65876),l=e.i(37848),s=e.i(63185);let d=(0,n.configureStore)({reducer:{auth:i.default,cart:o.default,wishlist:a.default,filters:l.default,recentlyViewed:s.default}});function c({children:e}){return(0,t.jsx)(r.Provider,{store:d,children:e})}e.s(["ReduxProvider",()=>c],51987)},97218,(e,t,r)=>{"use strict";var n=Object.defineProperty,i=Object.getOwnPropertyDescriptor,o=Object.getOwnPropertyNames,a=Object.prototype.hasOwnProperty,l={},s={CHANNEL:()=>p,default:()=>S};for(var d in s)n(l,d,{get:s[d],enumerable:!0});t.exports=((e,t,r,l)=>{if(t&&"object"==typeof t||"function"==typeof t)for(let s of o(t))a.call(e,s)||s===r||n(e,s,{get:()=>t[s],enumerable:!(l=i(t,s))||l.enumerable});return e})(n({},"__esModule",{value:!0}),l);var c=e.r(30668),u=e.r(48277),p="ORCHIDS_HOVER_v1",m="orchids_visual_edit_mode",f="orchids_focused_element",g="",h=e=>{try{let t=JSON.stringify(e);if(t===g)return;g=t}catch{}window.parent.postMessage(e,"*")},y=e=>{let t=e.tagName.toLowerCase();if("true"===e.contentEditable||"input"===t||"textarea"===t)return!0;if(["p","h1","h2","h3","h4","h5","h6","span","div","li","td","th","label","a","button"].includes(t)&&e.textContent?.trim()){let t=Array.from(e.childNodes).some(e=>e.nodeType===Node.TEXT_NODE&&e.textContent?.trim());if(0===e.childElementCount||e.childElementCount<=1&&t)return!0}return!1},b=e=>{let t="";for(let r of e.childNodes)r.nodeType===Node.TEXT_NODE&&(t+=r.textContent||"");return t},v=e=>{let t=e.split(":");if(t.length<3)return null;let r=parseInt(t.pop()||"0"),n=parseInt(t.pop()||"0"),i=t.join(":");return isNaN(n)||isNaN(r)?null:{filePath:i,line:n,column:r}},w=e=>{let t=window.getComputedStyle(e),r=(e,t)=>{if("backgroundColor"===t&&("rgba(0, 0, 0, 0)"===e||"rgb(0, 0, 0, 0)"===e||"transparent"===e||""===e))return"transparent";if("backgroundImage"===t&&("none"===e||""===e)||"textDecoration"===t&&(e.includes("none")||""===e))return"none";if("fontStyle"===t&&("normal"===e||""===e))return"normal";if("fontWeight"===t){let t=parseInt(e);return isNaN(t)?e||"400":String(t)}return"opacity"===t&&("1"===e||""===e)?"1":(t.includes("padding")||t.includes("margin"))&&("0px"===e||"0"===e)||"borderRadius"===t&&("0px"===e||"0"===e)?"0":"letterSpacing"===t&&("normal"===e||"0px"===e)||"gap"===t&&("normal"===e||"0px"===e)?"normal":e};return{fontSize:r(t.fontSize,"fontSize"),color:r(t.color,"color"),fontWeight:r(t.fontWeight,"fontWeight"),fontStyle:r(t.fontStyle,"fontStyle"),textDecoration:r(t.textDecoration,"textDecoration"),textAlign:r(t.textAlign,"textAlign"),lineHeight:r(t.lineHeight,"lineHeight"),letterSpacing:r(t.letterSpacing,"letterSpacing"),paddingLeft:r(t.paddingLeft,"paddingLeft"),paddingRight:r(t.paddingRight,"paddingRight"),paddingTop:r(t.paddingTop,"paddingTop"),paddingBottom:r(t.paddingBottom,"paddingBottom"),marginLeft:r(t.marginLeft,"marginLeft"),marginRight:r(t.marginRight,"marginRight"),marginTop:r(t.marginTop,"marginTop"),marginBottom:r(t.marginBottom,"marginBottom"),backgroundColor:r(t.backgroundColor,"backgroundColor"),backgroundImage:r(t.backgroundImage,"backgroundImage"),borderRadius:r(t.borderRadius,"borderRadius"),fontFamily:r(t.fontFamily,"fontFamily"),opacity:r(t.opacity,"opacity"),display:r(t.display,"display"),flexDirection:r(t.flexDirection,"flexDirection"),alignItems:r(t.alignItems,"alignItems"),justifyContent:r(t.justifyContent,"justifyContent"),gap:r(t.gap,"gap")}},E=e=>{if(!e)return"";try{let t=new URL(e,window.location.origin);if("/_next/image"===t.pathname){let e=t.searchParams.get("url");if(e)return decodeURIComponent(e)}return t.href}catch{return e}},x=e=>{if(e.includes("\n")){let t=e.replace(/\n/g,"\\n");return`{\`${t}\`}`}return e};function S(){let[e,t]=(0,c.useState)(null),[r,n]=(0,c.useState)([]),[i,o]=(0,c.useState)(null),[a,l]=(0,c.useState)(null),[s,d]=(0,c.useState)(()=>"u">typeof window&&"true"===localStorage.getItem(m)),[g,S]=(0,c.useState)(!1),[I,C]=(0,c.useState)(null),[L,A]=(0,c.useState)(null),[R,z]=(0,c.useState)(!1),[N,T]=(0,c.useState)(null),[M,O]=(0,c.useState)(null),D=(0,c.useRef)(!1),k=(0,c.useRef)(null),_=(0,c.useRef)(null),P=(0,c.useRef)(null),j=(0,c.useRef)(!1),$=(0,c.useRef)(null),F=(0,c.useRef)(""),B=(0,c.useRef)(""),H=(0,c.useRef)(null),U=(0,c.useRef)(null),V=(0,c.useRef)(!1),q=(0,c.useRef)(null),W=(0,c.useRef)({}),Y=(0,c.useRef)(new Map),J=(0,c.useRef)(!1),X=(0,c.useRef)(0),K=(0,c.useRef)(null),Z=(0,c.useRef)(new Set),G=(0,c.useRef)(new Map),Q=(0,c.useRef)(new Map);(0,c.useEffect)(()=>{j.current=s,"u">typeof window&&localStorage.setItem(m,String(s))},[s]),(0,c.useEffect)(()=>{s&&(window.parent.postMessage({type:p,msg:"VISUAL_EDIT_MODE_ACK",active:!0},"*"),window.parent.postMessage({type:p,msg:"VISUAL_EDIT_MODE_RESTORED",active:!0},"*"),setTimeout(()=>{if("u">typeof window){let e=localStorage.getItem(f);if(e)try{let{id:t}=JSON.parse(e),r=document.querySelector(`[data-orchids-id="${t}"]`);if(r){let e=r.getBoundingClientRect(),t=new MouseEvent("click",{clientX:e.left+e.width/2,clientY:e.top+e.height/2,bubbles:!0,cancelable:!0});r.dispatchEvent(t)}}catch{}}},500))},[]);let ee=e=>({top:e.top-4,left:e.left-4,width:e.width+8,height:e.height+8}),et=()=>{P.current&&o(ee(P.current.getBoundingClientRect()))};(0,c.useEffect)(()=>{if(s&&!q.current){let e=document.createElement("style");e.textContent=`
        [contenteditable="true"]:focus {
          outline: none !important;
          box-shadow: none !important;
          border-color: inherit !important;
        }
        [contenteditable="true"] {
          cursor: text !important;
        }
        /* Prevent the default blue highlight on contenteditable */
        [contenteditable="true"]::selection {
          background-color: rgba(59, 130, 246, 0.3);
        }
        [contenteditable="true"]::-moz-selection {
          background-color: rgba(59, 130, 246, 0.3);
        }
        /* Prevent child elements from being editable */
        [contenteditable="true"] [contenteditable="false"] {
          user-select: none !important;
          -webkit-user-select: none !important;
          -moz-user-select: none !important;
          -ms-user-select: none !important;
          opacity: 0.7 !important;
          cursor: default !important;
        }
        /* Ensure protected elements can't be selected */
        [data-orchids-protected="true"] {
          user-select: none !important;
          -webkit-user-select: none !important;
          -moz-user-select: none !important;
          -ms-user-select: none !important;
        }
        /* Visual edit overlay styles */
        .orchids-hover-box {
          position: fixed;
          pointer-events: none;
          border: 0.5px dashed #38bdf8;
          background-color: rgba(191, 219, 254, 0.2);
          border-radius: 0.125rem;
        }
        .orchids-hover-tag {
          position: fixed;
          pointer-events: none;
          font-size: 10px;
          color: white;
          background-color: #38bdf8;
          padding: 0.125rem 0.25rem;
          border-radius: 0.125rem;
        }
        .orchids-focus-tag {
          position: fixed;
          font-size: 10px;
          font-weight: 600;
          color: white;
          background-color: #3b82f6;
          padding: 0 0.25rem;
          border-radius: 0.125rem;
          pointer-events: none;
          user-select: none;
        }
        .orchids-focus-box {
          position: fixed;
          pointer-events: none;
          border: 1.5px solid #38bdf8;
          border-radius: 0.125rem;
        }
        .orchids-resize-handle {
          position: fixed;
          width: 0.5rem;
          height: 0.5rem;
          background-color: #38bdf8;
          border-radius: 50%;
          pointer-events: auto;
        }
        .orchids-resize-handle-nw {
          cursor: nw-resize;
        }
        .orchids-resize-handle-ne {
          cursor: ne-resize;
        }
        .orchids-resize-handle-sw {
          cursor: sw-resize;
        }
        .orchids-resize-handle-se {
          cursor: se-resize;
        }
        .orchids-resize-handle-n {
          cursor: n-resize;
        }
        .orchids-resize-handle-s {
          cursor: s-resize;
        }
        .orchids-resize-handle-w {
          cursor: w-resize;
        }
        .orchids-resize-handle-e {
          cursor: e-resize;
        }
      `,document.head.appendChild(e),q.current=e}else!s&&q.current&&(q.current.remove(),q.current=null);return()=>{q.current&&(q.current.remove(),q.current=null)}},[s]);let er=e=>{let t,r;if(e!==U.current)return void console.warn("Attempting to handle text change for non-editing element");let n=e.getAttribute("data-orchids-id");if(n&&(t=e.childElementCount>0?b(e):e.innerText||e.textContent||"")!==(r=F.current)){let e=v(n);if(!e)return;h({type:p,msg:"TEXT_CHANGED",id:n,oldText:x(r),newText:x(t),filePath:e.filePath,line:e.line,column:e.column}),F.current=t}},en=e=>{if(!J.current)return;let t=e.getAttribute("data-orchids-id");if(!t)return;let r=v(t);if(!r)return;let n=Y.current.get(t);n&&0!==Object.keys(n).length&&(h({type:p,msg:"STYLE_BLUR",id:t,styles:n,className:e.getAttribute("class")||"",filePath:r.filePath,line:r.line,column:r.column}),J.current=!1)},ei=()=>{let e=H.current;if(!e)return;let t=e.getAttribute("data-orchids-id");if(!t)return;let r=v(t);if(!r)return;let n=E(e.src),i=E(B.current);n&&n!==i&&(h({type:p,msg:"IMAGE_BLUR",id:t,oldSrc:i,newSrc:n,filePath:r.filePath,line:r.line,column:r.column}),B.current=n,H.current=null)};(0,c.useEffect)(()=>{function e(e){if(e.data?.type==="ORCHIDS_STYLE_UPDATE"){let{elementId:t,styles:r}=e.data,n=document.querySelectorAll(`[data-orchids-id="${t}"]`);if(n.length>0){let e=r.fontFamily||r.fontFamily;if(e){let t=e.replace(/['\s]+/g,"+");if(!Z.current.has(t)){let e=document.createElement("link");e.rel="stylesheet",e.href=`https://fonts.googleapis.com/css2?family=${t}:wght@400&display=swap`,document.head.appendChild(e),Z.current.add(t)}}if(e){G.current.set(t,e);let r=Q.current.get(t);r&&clearTimeout(r);let n=window.setTimeout(()=>{G.current.delete(t),Q.current.delete(t)},2e3);Q.current.set(t,n)}n.forEach(e=>{P.current===e?((e,t)=>{let r=e.getAttribute("data-orchids-id");if(!r||!v(r))return;document.querySelectorAll(`[data-orchids-id="${r}"]`).forEach(e=>{Object.entries(t).forEach(([t,r])=>{let n=t.replace(/([A-Z])/g,"-$1").toLowerCase(),i=r;"backgroundColor"===t&&("transparent"===r||"rgba(0, 0, 0, 0)"===r||"rgb(0, 0, 0, 0)"===r)&&(i="transparent"),"backgroundColor"===t&&"transparent"===i||"backgroundImage"===t&&"none"===r||"textDecoration"===t&&"none"===r||"fontStyle"===t&&"normal"===r||"opacity"===t&&"1"===r||(t.includes("padding")||t.includes("margin"))&&"0"===r||"borderRadius"===t&&"0"===r||"letterSpacing"===t&&"normal"===r||"gap"===t&&"normal"===r?e.style.removeProperty(n):e.style.setProperty(n,i,"important")})});let n=Y.current.get(r)||{};Y.current.set(r,{...n,...t}),J.current=!0,requestAnimationFrame(()=>{et()})})(e,r):Object.entries(r).forEach(([t,r])=>{let n=t.replace(/([A-Z])/g,"-$1").toLowerCase(),i=String(r);"backgroundColor"===t&&("transparent"===r||"rgba(0, 0, 0, 0)"===r||"rgb(0, 0, 0, 0)"===r)&&(i="transparent"),"backgroundColor"===t&&"transparent"===i||"backgroundImage"===t&&"none"===r||"textDecoration"===t&&"none"===r||"fontStyle"===t&&"normal"===r||"opacity"===t&&"1"===r||(t.includes("padding")||t.includes("margin"))&&"0"===r||"borderRadius"===t&&"0"===r||"letterSpacing"===t&&"normal"===r||"gap"===t&&"normal"===r?e.style.removeProperty(n):e.style.setProperty(n,i,"important")})})}}else if(e.data?.type==="ORCHIDS_IMAGE_UPDATE"){let{elementId:t,src:r,oldSrc:n}=e.data,i=null;if(document.querySelectorAll(`[data-orchids-id="${t}"]`).forEach(e=>{if("img"===e.tagName.toLowerCase()){let t=E(e.src);i||(i=e),n&&E(n)===t&&(i=e)}}),!i)return;if("img"===i.tagName.toLowerCase()){let e=i;e.removeAttribute("srcset"),e.srcset="",e.src=r,B.current=E(r),H.current=e,e.onload=()=>et()}}else if(e.data?.type==="RESIZE_ELEMENT"){let{elementId:t,width:r,height:n}=e.data,i=document.querySelector(`[data-orchids-id="${t}"]`);i&&P.current===i&&(i.style.setProperty("width",`${r}px`,"important"),i.style.setProperty("height",`${n}px`,"important"),et())}}return window.addEventListener("message",e),()=>window.removeEventListener("message",e)},[]);let eo=(e,r)=>{if(!P.current)return;e.preventDefault(),e.stopPropagation();let n=P.current.getBoundingClientRect();t(null),k.current=null,document.body.style.pointerEvents="none",document.querySelectorAll(".resize-handle").forEach(e=>{e.style.pointerEvents="auto"}),S(!0),D.current=!0,C(r),A({x:e.clientX,y:e.clientY,width:n.width,height:n.height})};(0,c.useEffect)(()=>{if(!g||!L||!I||!P.current)return;let r=r=>{let n=r.clientX-L.x,i=r.clientY-L.y,o=L.width,l=L.height;I.includes("e")&&(o=L.width+n),I.includes("w")&&(o=L.width-n),I.includes("s")&&(l=L.height+i),I.includes("n")&&(l=L.height-i);let s=P.current?.parentElement;if(s){let e=s.getBoundingClientRect(),t=window.getComputedStyle(s),r=parseFloat(t.paddingLeft)||0,n=parseFloat(t.paddingRight)||0,i=parseFloat(t.paddingTop)||0,a=parseFloat(t.paddingBottom)||0,d=e.width-r-n,c=e.height-i-a,u=l>c;o=Math.max(20,o>d?o:Math.min(o,d)),l=Math.max(20,u?l:Math.min(l,c))}else o=Math.max(20,o),l=Math.max(20,l);e&&t(null),a&&window.parent.postMessage({type:p,msg:"RESIZE_ELEMENT",elementId:a,width:Math.round(o),height:Math.round(l)},"*")},n=()=>{if(P.current&&a){let e=P.current,t=window.getComputedStyle(e),r=parseFloat(t.width)||e.offsetWidth,n=parseFloat(t.height)||e.offsetHeight,i=t.maxWidth,o=t.maxHeight,l=e.parentElement,s=`${Math.round(r)}px`,d=`${Math.round(n)}px`;if(l){let e=l.getBoundingClientRect(),t=window.getComputedStyle(l),i=parseFloat(t.paddingLeft)||0,o=parseFloat(t.paddingRight)||0,a=parseFloat(t.paddingTop)||0,c=parseFloat(t.paddingBottom)||0,u=e.width-i-o,p=e.height-a-c,m=r/u*100,f=n/p*100;(.1>Math.abs(m-Math.round(m))||[25,33.333,50,66.667,75,100].some(e=>.5>Math.abs(m-e)))&&(s=`${Math.round(10*m)/10}%`),.1>Math.abs(f-Math.round(f))&&[25,50,75,100].includes(Math.round(f))&&(d=`${Math.round(f)}%`)}let c={};c.width=s,c.height=d,i&&"none"!==i&&"initial"!==i&&(c.maxWidth=s),o&&"none"!==o&&"initial"!==o&&(c.maxHeight=d);let u={type:p,msg:"STYLE_BLUR",id:a,styles:c,filePath:"",line:0,column:0,className:e.getAttribute("class")||""},m=e.getAttribute("data-orchids-id");if(m){let e=v(m);e&&(u.filePath=e.filePath,u.line=e.line,u.column=e.column)}window.parent.postMessage(u,"*")}S(!1),D.current=!1,C(null),A(null),document.body.style.pointerEvents="",k.current=null};return document.addEventListener("mousemove",r),document.addEventListener("mouseup",n),()=>{document.removeEventListener("mousemove",r),document.removeEventListener("mouseup",n)}},[g,L,I,a,e]);let ea=()=>{if(U.current){let e=U.current;U.current=null,en(e),er(e),e.childElementCount>0&&e.querySelectorAll('[data-orchids-protected="true"]').forEach(e=>{e.removeAttribute("contenteditable"),e.removeAttribute("data-orchids-protected"),e.style.userSelect="",e.style.webkitUserSelect=""}),V.current||(e.contentEditable="false");let t=(e.getAttribute("style")||"").replace(/outline:\s*none\s*!important;?/gi,"").replace(/box-shadow:\s*none\s*!important;?/gi,"").trim().replace(/;\s*;/g,";").replace(/^;|;$/g,"");t?e.setAttribute("style",t):e.removeAttribute("style"),e.blur();let r=e._editHandlers;r&&(e.removeEventListener("focus",r.focus),e.removeEventListener("blur",r.blur),e.removeEventListener("input",r.input),delete e._editHandlers),V.current=!1,F.current=""}};return(0,c.useEffect)(()=>{if(!s)return;let e=e=>{let t=e.target.closest("a");t&&!t.isContentEditable&&(e.preventDefault(),e.stopPropagation())},t=e=>{e.preventDefault(),e.stopPropagation()};return document.addEventListener("click",e,!0),document.addEventListener("submit",t,!0),()=>{document.removeEventListener("click",e,!0),document.removeEventListener("submit",t,!0)}},[s]),(0,c.useEffect)(()=>{s||(ea(),Y.current.clear(),J.current=!1,H.current=null)},[s]),(0,c.useEffect)(()=>{if(P.current){let e=()=>{if(et(),P.current&&a){let e=ee(P.current.getBoundingClientRect());h({type:p,msg:"FOCUS_MOVED",id:a,rect:{top:e.top,left:e.left,width:e.width,height:e.height}})}};window.addEventListener("scroll",e,!0),window.addEventListener("resize",e);let t=new ResizeObserver(e);return t.observe(P.current),()=>{window.removeEventListener("scroll",e,!0),window.removeEventListener("resize",e),t.disconnect()}}},[a]),(0,c.useEffect)(()=>{function e(e){if(D.current||!j.current||R)return;let r=document.elementFromPoint(e.clientX,e.clientY)?.closest("[data-orchids-id]")??null;if(r!==k.current){if(k.current=r,!r){t(null),n([]),T(null),_.current=null,ei(),h({type:p,msg:"HIT",id:null,tag:null,rect:null});return}let e=r.getAttribute("data-orchids-id");if(e===_.current)return;_.current=e;let i=r.getAttribute("data-orchids-name")||r.tagName.toLowerCase(),o=document.querySelectorAll(`[data-orchids-id="${e}"]`),l=[];o.forEach(e=>{if(e.getAttribute("data-orchids-id")===a)return;let t=e.getBoundingClientRect();l.push(ee(t))}),n(l),e!==a?t(ee(r.getBoundingClientRect())):t(null),T(i),h({type:p,msg:"HIT",id:e,tag:i,rect:e!==a?ee(r.getBoundingClientRect()):null})}}function r(){j.current&&!D.current&&(t(null),n([]),T(null),ei(),k.current=null,_.current=null,h({type:p,msg:"HIT",id:null,tag:null,rect:null}))}function i(e){if(D.current||!j.current)return;let t=e.target?.closest("[data-orchids-id]");if(t&&y(t)&&(V.current="true"===t.contentEditable,!V.current)){let e=t.getAttribute("style")||"";t.setAttribute("style",`${e}; outline: none !important; box-shadow: none !important;`),t.contentEditable="true",t.childElementCount>0&&t.querySelectorAll("*").forEach(e=>{e.contentEditable="false",e.setAttribute("data-orchids-protected","true"),e.style.userSelect="none",e.style.webkitUserSelect="none"})}}function s(e){if(D.current||!j.current)return;let r=Date.now();if(r-X.current<100)return;X.current=r;let i=e.target.closest("[data-orchids-id]");if(i){let r=i.getAttribute("data-orchids-name")||i.tagName.toLowerCase(),a=i.getAttribute("data-orchids-id"),s=y(i),d="a"===i.tagName.toLowerCase()||!!i.closest("a"),c="button"===i.tagName.toLowerCase()||"button"===i.getAttribute("role");(d||c||!s)&&(e.preventDefault(),e.stopPropagation());let u=P.current;P.current=i,l(a),O(r),a&&"u">typeof window&&localStorage.setItem(f,JSON.stringify({id:a,tag:r}));let m=document.querySelectorAll(`[data-orchids-id="${a}"]`),g=[];if(m.forEach(e=>{if(e===i)return;let t=e.getBoundingClientRect();g.push(ee(t))}),n(g),g.length>0&&T(r),"img"===i.tagName.toLowerCase()?H.current=i:H.current=null,W.current=w(i),s&&(K.current&&(clearTimeout(K.current),K.current=null),U.current&&U.current!==i&&(U.current.blur(),ea()),i!==U.current)){U.current=i,i.childElementCount>0?F.current=b(i):F.current=i.innerText||i.textContent||"";let e={handleFocus:()=>{i===U.current&&(en(i),i.childElementCount>0?F.current=b(i):F.current=i.innerText||i.textContent||"",J.current=!1)},handleBlur:()=>{i===U.current&&(en(i),er(i))},handleInput:()=>{if(i!==U.current)return}};i.addEventListener("focus",e.handleFocus),i.addEventListener("blur",e.handleBlur),i.addEventListener("input",e.handleInput),i._editHandlers={focus:e.handleFocus,blur:e.handleBlur,input:e.handleInput}}let v=ee(i.getBoundingClientRect());o(v),t(null);let x=i.getAttribute("class")||"",S="img"===i.tagName.toLowerCase()?i.src:void 0;S&&(B.current=E(S));let I=w(i);h({type:p,msg:"ELEMENT_CLICKED",id:a,tag:r,rect:{top:v.top,left:v.left,width:v.width,height:v.height},clickPosition:{x:e.clientX,y:e.clientY},isEditable:s,currentStyles:I,className:x,src:S}),setTimeout(()=>{ei(),u&&u!==i&&en(u),U.current&&U.current!==i&&ea()},0)}else P.current&&(ei(),en(P.current),ea(),P.current=null,l(null),O(null),o(null),t(null),n([]),T(null),"u">typeof window&&localStorage.removeItem(f),h({type:p,msg:"ELEMENT_CLICKED",id:null,tag:null,rect:{top:0,left:0,width:0,height:0},clickPosition:{x:e.clientX,y:e.clientY},isEditable:!1,currentStyles:{},className:""}))}function c(e){if(e.data?.type===p){if("PREVIEW_FONT"===e.data.msg&&"elementId"in e.data){let{elementId:t,fontFamily:r}=e.data;if(G.current.has(t))return;let n=document.querySelector(`[data-orchids-id="${t}"]`);if(!n)return;let i=r.replace(/\s+/g,"+");if(!Z.current.has(i)){let e=document.createElement("link");e.rel="stylesheet",e.href=`https://fonts.googleapis.com/css2?family=${i}:wght@400&display=swap`,document.head.appendChild(e),Z.current.add(i)}n.style.fontFamily=`'${r}', sans-serif`;return}if("SCROLL"===e.data.msg&&"dx"in e.data&&"dy"in e.data&&window.scrollBy(e.data.dx,e.data.dy),"VISUAL_EDIT_MODE"===e.data.msg&&"active"in e.data){let r=e.data.active;d(r),!r&&"u">typeof window&&(localStorage.removeItem(m),localStorage.removeItem(f)),window.parent.postMessage({type:p,msg:"VISUAL_EDIT_MODE_ACK",active:r},"*"),r||(ei(),ea(),H.current=null,t(null),n([]),o(null),l(null),k.current=null,P.current=null,J.current=!1,T(null),O(null),h({type:p,msg:"HIT",id:null,tag:null,rect:null}))}if("CLEAR_INLINE_STYLES"===e.data.msg&&"elementId"in e.data&&(document.querySelectorAll(`[data-orchids-id="${e.data.elementId}"]`).forEach(e=>{["fontSize","color","fontWeight","fontStyle","textDecoration","textAlign","paddingLeft","paddingRight","paddingTop","paddingBottom","marginLeft","marginRight","marginTop","marginBottom","backgroundColor","backgroundImage"].forEach(t=>{e.style[t]=""})}),Y.current.delete(e.data.elementId)),"SHOW_ELEMENT_HOVER"===e.data.msg&&"elementId"in e.data){let{elementId:t}=e.data;if(!t){n([]),T(null);return}let r=document.querySelectorAll(`[data-orchids-id="${t}"]`);if(r.length>0){let e=[],t="";r.forEach(r=>{if(r===P.current)return;let n=r.getBoundingClientRect();e.push(ee(n)),t||(t=r.getAttribute("data-orchids-name")||r.tagName.toLowerCase())}),n(e),T(e.length>0?t:null)}}}}function u(){!D.current&&j.current&&(z(!0),t(null),n([]),h({type:p,msg:"SCROLL_STARTED"}),$.current&&clearTimeout($.current),$.current=window.setTimeout(()=>{z(!1),h({type:p,msg:"SCROLL_STOPPED"})},16))}return document.addEventListener("pointermove",e,{passive:!0}),document.addEventListener("pointerleave",r),document.addEventListener("mousedown",i,{capture:!0}),document.addEventListener("click",s,{capture:!0}),window.addEventListener("message",c),window.addEventListener("scroll",u,!0),()=>{document.removeEventListener("pointermove",e),document.removeEventListener("pointerleave",r),document.removeEventListener("mousedown",i,!0),document.removeEventListener("click",s,!0),window.removeEventListener("message",c),window.removeEventListener("scroll",u,!0),$.current&&clearTimeout($.current)}},[a,g]),(0,u.jsxs)(u.Fragment,{children:[s&&!g&&(0,u.jsx)(u.Fragment,{children:r.filter(e=>null!==e).map((e,t)=>(0,u.jsxs)("div",{children:[(0,u.jsx)("div",{className:"orchids-hover-box",style:{zIndex:1e5,left:e.left,top:e.top,width:e.width,height:e.height}}),N&&(0,u.jsx)("div",{className:"orchids-hover-tag",style:{zIndex:100001,left:e.left,top:e.top-20},children:N})]},t))}),s&&i&&(0,u.jsxs)(u.Fragment,{children:[M&&(0,u.jsx)("div",{className:"orchids-focus-tag",style:{zIndex:100003,left:i.left-4,top:i.top-16},children:M}),(0,u.jsx)("div",{className:"orchids-focus-box",style:{zIndex:100001,left:i.left,top:i.top,width:i.width,height:i.height}}),!g&&(0,u.jsxs)(u.Fragment,{children:[(0,u.jsx)("div",{className:"orchids-resize-handle orchids-resize-handle-nw resize-handle",style:{zIndex:100002,left:i.left-4,top:i.top-4},onMouseDown:e=>eo(e,"nw")}),(0,u.jsx)("div",{className:"orchids-resize-handle orchids-resize-handle-ne resize-handle",style:{zIndex:100002,left:i.left+i.width-4,top:i.top-4},onMouseDown:e=>eo(e,"ne")}),(0,u.jsx)("div",{className:"orchids-resize-handle orchids-resize-handle-sw resize-handle",style:{zIndex:100002,left:i.left-4,top:i.top+i.height-4},onMouseDown:e=>eo(e,"sw")}),(0,u.jsx)("div",{className:"orchids-resize-handle orchids-resize-handle-se resize-handle",style:{zIndex:100002,left:i.left+i.width-4,top:i.top+i.height-4},onMouseDown:e=>eo(e,"se")}),(0,u.jsx)("div",{className:"orchids-resize-handle orchids-resize-handle-n resize-handle",style:{zIndex:100002,left:i.left+i.width/2-4,top:i.top-4},onMouseDown:e=>eo(e,"n")}),(0,u.jsx)("div",{className:"orchids-resize-handle orchids-resize-handle-s resize-handle",style:{zIndex:100002,left:i.left+i.width/2-4,top:i.top+i.height-4},onMouseDown:e=>eo(e,"s")}),(0,u.jsx)("div",{className:"orchids-resize-handle orchids-resize-handle-w resize-handle",style:{zIndex:100002,left:i.left-4,top:i.top+i.height/2-4},onMouseDown:e=>eo(e,"w")}),(0,u.jsx)("div",{className:"orchids-resize-handle orchids-resize-handle-e resize-handle",style:{zIndex:100002,left:i.left+i.width-4,top:i.top+i.height/2-4},onMouseDown:e=>eo(e,"e")})]})]})]})}},66669,(e,t,r)=>{"use strict";let n,i,o;var a=Object.create,l=Object.defineProperty,s=Object.getOwnPropertyDescriptor,d=Object.getOwnPropertyNames,c=Object.getPrototypeOf,u=Object.prototype.hasOwnProperty,p=(e,t,r,n)=>{if(t&&"object"==typeof t||"function"==typeof t)for(let i of d(t))u.call(e,i)||i===r||l(e,i,{get:()=>t[i],enumerable:!(n=s(t,i))||n.enumerable});return e},m={},f={CHANNEL:()=>y.CHANNEL,VisualEditsMessenger:()=>h.default};for(var g in f)l(m,g,{get:f[g],enumerable:!0});t.exports=p(l({},"__esModule",{value:!0}),m);var h=(o=null!=(n=e.r(97218))?a(c(n)):{},p(!i&&n&&n.__esModule?o:l(o,"default",{value:n,enumerable:!0}),n)),y=e.r(97218)},58320,e=>{"use strict";var t=e.i(30668),r=e.i(79036),n=e.i(40672);function i(){let e=(0,r.useDispatch)();return(0,t.useEffect)(()=>{e((0,n.fetchMe)()).catch(()=>{})},[e]),null}e.s(["default",()=>i])},23331,e=>{"use strict";var t=e.i(30668),r=e.i(79036),n=e.i(5619);let i="luxerent-cart:";function o(e){return e&&e.id?`${i}${e.id}`:`${i}guest`}function a(){let e=(0,r.useDispatch)(),i=(0,r.useSelector)(e=>e.auth.user),a=(0,r.useSelector)(e=>e.cart.items),l=(0,t.useRef)(null);return(0,t.useEffect)(()=>{let t=o(i);l.current=t;try{let r=window.localStorage.getItem(t),i=r?JSON.parse(r):[];e((0,n.hydrateCart)(Array.isArray(i)?i:[]))}catch{e((0,n.hydrateCart)([]))}},[i?.id,e]),(0,t.useEffect)(()=>{let e=l.current||o(i);try{window.localStorage.setItem(e,JSON.stringify(a||[]))}catch{}},[a,i]),null}e.s(["default",()=>a])}]);