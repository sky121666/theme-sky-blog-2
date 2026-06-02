(function(){"use strict";var A$=!1,I$=!1,n_=[],u$=-1,c$=!1;function nr(_){Tr(_)}function rr(){c$=!0}function ir(){c$=!1,Fe()}function Tr(_){n_.includes(_)||n_.push(_),Fe()}function ar(_){let $=n_.indexOf(_);$!==-1&&$>u$&&n_.splice($,1)}function Fe(){if(!I$&&!A$){if(c$)return;A$=!0,queueMicrotask(or)}}function or(){A$=!1,I$=!0;for(let _=0;_<n_.length;_++)n_[_](),u$=_;n_.length=0,u$=-1,I$=!1}var I_,r_,u_,Ve,f$=!0;function sr(_){f$=!1,_(),f$=!0}function Lr(_){I_=_.reactive,u_=_.release,r_=$=>_.effect($,{scheduler:e=>{f$?nr(e):e()}}),Ve=_.raw}function ke(_){r_=_}function Er(_){let $=()=>{};return[t=>{let n=r_(t);return _._x_effects||(_._x_effects=new Set,_._x_runEffects=()=>{_._x_effects.forEach(r=>r())}),_._x_effects.add(n),$=()=>{n!==void 0&&(_._x_effects.delete(n),u_(n))},n},()=>{$()}]}function Ke(_,$){let e=!0,t,n,r=r_(()=>{let i=_(),T=JSON.stringify(i);if(!e&&(typeof i=="object"||i!==t)){let o=typeof t=="object"?JSON.parse(n):t;queueMicrotask(()=>{$(i,o)})}t=i,n=T,e=!1});return()=>u_(r)}async function lr(_){rr();try{await _(),await Promise.resolve()}finally{ir()}}var je=[],Xe=[],Ye=[];function Ar(_){Ye.push(_)}function R$(_,$){typeof $=="function"?(_._x_cleanups||(_._x_cleanups=[]),_._x_cleanups.push($)):($=_,Xe.push($))}function qe(_){je.push(_)}function ze(_,$,e){_._x_attributeCleanups||(_._x_attributeCleanups={}),_._x_attributeCleanups[$]||(_._x_attributeCleanups[$]=[]),_._x_attributeCleanups[$].push(e)}function Qe(_,$){_._x_attributeCleanups&&Object.entries(_._x_attributeCleanups).forEach(([e,t])=>{($===void 0||$.includes(e))&&(t.forEach(n=>n()),delete _._x_attributeCleanups[e])})}function Ir(_){for(_._x_effects?.forEach(ar);_._x_cleanups?.length;)_._x_cleanups.pop()()}var d$=new MutationObserver(C$),h$=!1;function S$(){d$.observe(document,{subtree:!0,childList:!0,attributes:!0,attributeOldValue:!0}),h$=!0}function Je(){ur(),d$.disconnect(),h$=!1}var m_=[];function ur(){let _=d$.takeRecords();m_.push(()=>_.length>0&&C$(_));let $=m_.length;queueMicrotask(()=>{if(m_.length===$)for(;m_.length>0;)m_.shift()()})}function y(_){if(!h$)return _();Je();let $=_();return S$(),$}var N$=!1,V_=[];function cr(){N$=!0}function fr(){N$=!1,C$(V_),V_=[]}function C$(_){if(N$){V_=V_.concat(_);return}let $=[],e=new Set,t=new Map,n=new Map;for(let r=0;r<_.length;r++)if(!_[r].target._x_ignoreMutationObserver&&(_[r].type==="childList"&&(_[r].removedNodes.forEach(i=>{i.nodeType===1&&i._x_marker&&e.add(i)}),_[r].addedNodes.forEach(i=>{if(i.nodeType===1){if(e.has(i)){e.delete(i);return}i._x_marker||$.push(i)}})),_[r].type==="attributes")){let i=_[r].target,T=_[r].attributeName,o=_[r].oldValue,L=()=>{t.has(i)||t.set(i,[]),t.get(i).push({name:T,value:i.getAttribute(T)})},l=()=>{n.has(i)||n.set(i,[]),n.get(i).push(T)};i.hasAttribute(T)&&o===null?L():i.hasAttribute(T)?(l(),L()):l()}n.forEach((r,i)=>{Qe(i,r)}),t.forEach((r,i)=>{je.forEach(T=>T(i,r))});for(let r of e)$.some(i=>i.contains(r))||Xe.forEach(i=>i(r));for(let r of $)r.isConnected&&Ye.forEach(i=>i(r));$=null,e=null,t=null,n=null}function Ze(_){return T_(i_(_))}function O_(_,$,e){return _._x_dataStack=[$,...i_(e||_)],()=>{_._x_dataStack=_._x_dataStack.filter(t=>t!==$)}}function i_(_){return _._x_dataStack?_._x_dataStack:typeof ShadowRoot=="function"&&_ instanceof ShadowRoot?i_(_.host):_.parentNode?i_(_.parentNode):[]}function T_(_){return new Proxy({objects:_},Rr)}function _t(_,$){return _===null||_===Object.prototype?null:Object.prototype.hasOwnProperty.call(_,$)?_:_t(Object.getPrototypeOf(_),$)}var Rr={ownKeys({objects:_}){return Array.from(new Set(_.flatMap($=>Object.keys($))))},has({objects:_},$){return $==Symbol.unscopables?!1:_.some(e=>Object.prototype.hasOwnProperty.call(e,$)||Reflect.has(e,$))},get({objects:_},$,e){return $=="toJSON"?dr:Reflect.get(_.find(t=>Reflect.has(t,$))||{},$,e)},set({objects:_},$,e,t){let n;for(const i of _)if(n=_t(i,$),n)break;n||(n=_[_.length-1]);const r=Object.getOwnPropertyDescriptor(n,$);return r?.set&&r?.get?r.set.call(t,e)||!0:Reflect.set(n,$,e)}};function dr(){return Reflect.ownKeys(this).reduce(($,e)=>($[e]=Reflect.get(this,e),$),{})}function p$(_){let $=t=>typeof t=="object"&&!Array.isArray(t)&&t!==null,e=(t,n="")=>{Object.entries(Object.getOwnPropertyDescriptors(t)).forEach(([r,{value:i,enumerable:T}])=>{if(T===!1||i===void 0||typeof i=="object"&&i!==null&&i.__v_skip)return;let o=n===""?r:`${n}.${r}`;typeof i=="object"&&i!==null&&i._x_interceptor?t[r]=i.initialize(_,o,r):$(i)&&i!==t&&!(i instanceof Element)&&e(i,o)})};return e(_)}function $t(_,$=()=>{}){let e={initialValue:void 0,_x_interceptor:!0,initialize(t,n,r){return _(this.initialValue,()=>hr(t,n),i=>g$(t,n,i),n,r)}};return $(e),t=>{if(typeof t=="object"&&t!==null&&t._x_interceptor){let n=e.initialize.bind(e);e.initialize=(r,i,T)=>{let o=t.initialize(r,i,T);return e.initialValue=o,n(r,i,T)}}else e.initialValue=t;return e}}function hr(_,$){return $.split(".").reduce((e,t)=>e[t],_)}function g$(_,$,e){if(typeof $=="string"&&($=$.split(".")),$.length===1)_[$[0]]=e;else{if($.length===0)throw error;return _[$[0]]||(_[$[0]]={}),g$(_[$[0]],$.slice(1),e)}}var et={};function F(_,$){et[_]=$}function H_(_,$){let e=Sr($);return Object.entries(et).forEach(([t,n])=>{Object.defineProperty(_,`$${t}`,{get(){return n($,e)},enumerable:!1})}),_}function Sr(_){let[$,e]=ot(_),t={interceptor:$t,...$};return R$(_,e),t}function Nr(_,$,e,...t){try{return e(...t)}catch(n){M_(n,_,$)}}function M_(..._){return tt(..._)}var tt=pr;function Cr(_){tt=_}function pr(_,$,e=void 0){_=Object.assign(_??{message:"No error message given."},{el:$,expression:e}),console.warn(`Alpine Expression Error: ${_.message}

${e?'Expression: "'+e+`"

`:""}`,$),setTimeout(()=>{throw _},0)}var c_=!0;function nt(_){let $=c_;c_=!1;let e=_();return c_=$,e}function a_(_,$,e={}){let t;return v(_,$)(n=>t=n,e),t}function v(..._){return rt(..._)}var rt=()=>{};function gr(_){rt=_}var it;function mr(_){it=_}function Or(_,$){let e={};H_(e,_);let t=[e,...i_(_)],n=typeof $=="function"?Hr(t,$):Pr(t,$,_);return Nr.bind(null,_,$,n)}function Hr(_,$){return(e=()=>{},{scope:t={},params:n=[],context:r}={})=>{if(!c_){P_(e,$,T_([t,..._]),n);return}let i=$.apply(T_([t,..._]),n);P_(e,i)}}var m$={};function Mr(_,$){if(m$[_])return m$[_];let e=Object.getPrototypeOf(async function(){}).constructor,t=/^[\n\s]*if.*\(.*\)/.test(_.trim())||/^(let|const)\s/.test(_.trim())?`(async()=>{ ${_} })()`:_,r=(()=>{try{let i=new e(["__self","scope"],`with (scope) { __self.result = ${t} }; __self.finished = true; return __self.result;`);return Object.defineProperty(i,"name",{value:`[Alpine] ${_}`}),i}catch(i){return M_(i,$,_),Promise.resolve()}})();return m$[_]=r,r}function Pr(_,$,e){let t=Mr($,e);return(n=()=>{},{scope:r={},params:i=[],context:T}={})=>{t.result=void 0,t.finished=!1;let o=T_([r,..._]);if(typeof t=="function"){let L=t.call(T,t,o).catch(l=>M_(l,e,$));t.finished?(P_(n,t.result,o,i,e),t.result=void 0):L.then(l=>{P_(n,l,o,i,e)}).catch(l=>M_(l,e,$)).finally(()=>t.result=void 0)}}}function P_(_,$,e,t,n){if(c_&&typeof $=="function"){let r=$.apply(e,t);r instanceof Promise?r.then(i=>P_(_,i,e,t)).catch(i=>M_(i,n,$)):_(r)}else typeof $=="object"&&$ instanceof Promise?$.then(r=>_(r)):_($)}function xr(..._){return it(..._)}function yr(_,$,e={}){let t={};H_(t,_);let n=[t,...i_(_)],r=T_([e.scope??{},...n]),i=e.params??[];if($.includes("await")){let T=Object.getPrototypeOf(async function(){}).constructor,o=/^[\n\s]*if.*\(.*\)/.test($.trim())||/^(let|const)\s/.test($.trim())?`(async()=>{ ${$} })()`:$;return new T(["scope"],`with (scope) { let __result = ${o}; return __result }`).call(e.context,r)}else{let T=/^[\n\s]*if.*\(.*\)/.test($.trim())||/^(let|const)\s/.test($.trim())?`(()=>{ ${$} })()`:$,L=new Function(["scope"],`with (scope) { let __result = ${T}; return __result }`).call(e.context,r);return typeof L=="function"&&c_?L.apply(r,i):L}}var O$="x-";function f_(_=""){return O$+_}function Wr(_){O$=_}var k_={};function D(_,$){return k_[_]=$,{before(e){if(!k_[e]){console.warn(String.raw`Cannot find directive \`${e}\`. \`${_}\` will use the default order of execution`);return}const t=o_.indexOf(e);o_.splice(t>=0?t:o_.indexOf("DEFAULT"),0,_)}}}function Dr(_){return Object.keys(k_).includes(_)}function H$(_,$,e){if($=Array.from($),_._x_virtualDirectives){let r=Object.entries(_._x_virtualDirectives).map(([T,o])=>({name:T,value:o})),i=Tt(r);r=r.map(T=>i.find(o=>o.name===T.name)?{name:`x-bind:${T.name}`,value:`"${T.value}"`}:T),$=$.concat(r)}let t={};return $.map(Et((r,i)=>t[r]=i)).filter(At).map(wr(t,e)).sort(Ur).map(r=>vr(_,r))}function Tt(_){return Array.from(_).map(Et()).filter($=>!At($))}var M$=!1,x_=new Map,at=Symbol();function br(_){M$=!0;let $=Symbol();at=$,x_.set($,[]);let e=()=>{for(;x_.get($).length;)x_.get($).shift()();x_.delete($)},t=()=>{M$=!1,e()};_(e),t()}function ot(_){let $=[],e=T=>$.push(T),[t,n]=Er(_);return $.push(n),[{Alpine:d_,effect:t,cleanup:e,evaluateLater:v.bind(v,_),evaluate:a_.bind(a_,_)},()=>$.forEach(T=>T())]}function vr(_,$){let e=()=>{},t=k_[$.type]||e,[n,r]=ot(_);ze(_,$.original,r);let i=()=>{_._x_ignore||_._x_ignoreSelf||(t.inline&&t.inline(_,$,n),t=t.bind(t,_,$,n),M$?x_.get(at).push(t):t())};return i.runCleanups=r,i}var st=(_,$)=>({name:e,value:t})=>(e.startsWith(_)&&(e=e.replace(_,$)),{name:e,value:t}),Lt=_=>_;function Et(_=()=>{}){return({name:$,value:e})=>{let{name:t,value:n}=lt.reduce((r,i)=>i(r),{name:$,value:e});return t!==$&&_(t,$),{name:t,value:n}}}var lt=[];function P$(_){lt.push(_)}function At({name:_}){return It().test(_)}var It=()=>new RegExp(`^${O$}([^:^.]+)\\b`);function wr(_,$){return({name:e,value:t})=>{e===t&&(t="");let n=e.match(It()),r=e.match(/:([a-zA-Z0-9\-_:]+)/),i=e.match(/\.[^.\]]+(?=[^\]]*$)/g)||[],T=$||_[e]||e;return{type:n?n[1]:null,value:r?r[1]:null,modifiers:i.map(o=>o.replace(".","")),expression:t,original:T}}}var x$="DEFAULT",o_=["ignore","ref","id","data","anchor","bind","init","for","model","modelable","transition","show","if",x$,"teleport"];function Ur(_,$){let e=o_.indexOf(_.type)===-1?x$:_.type,t=o_.indexOf($.type)===-1?x$:$.type;return o_.indexOf(e)-o_.indexOf(t)}function y_(_,$,e={},t={}){return _.dispatchEvent(new CustomEvent($,{detail:e,bubbles:!0,composed:!0,cancelable:!0,...t}))}function s_(_,$){if(typeof ShadowRoot=="function"&&_ instanceof ShadowRoot){Array.from(_.children).forEach(n=>s_(n,$));return}let e=!1;if($(_,()=>e=!0),e)return;let t=_.firstElementChild;for(;t;)s_(t,$),t=t.nextElementSibling}function j(_,...$){console.warn(`Alpine Warning: ${_}`,...$)}var ut=!1;function Gr(){ut&&j("Alpine has already been initialized on this page. Calling Alpine.start() more than once can cause problems."),ut=!0,document.body||j("Unable to initialize. Trying to load Alpine before `<body>` is available. Did you forget to add `defer` in Alpine's `<script>` tag?"),y_(document,"alpine:init"),y_(document,"alpine:initializing"),S$(),Ar($=>q($,s_)),R$($=>R_($)),qe(($,e)=>{H$($,e).forEach(t=>t())});let _=$=>!K_($.parentElement,!0);Array.from(document.querySelectorAll(Rt().join(","))).filter(_).forEach($=>{q($)}),y_(document,"alpine:initialized"),setTimeout(()=>{kr()})}var y$=[],ct=[];function ft(){return y$.map(_=>_())}function Rt(){return y$.concat(ct).map(_=>_())}function dt(_){y$.push(_)}function ht(_){ct.push(_)}function K_(_,$=!1){return Y(_,e=>{if(($?Rt():ft()).some(n=>e.matches(n)))return!0})}function Y(_,$){if(_){if($(_))return _;if(_._x_teleportBack)return Y(_._x_teleportBack,$);if(_.parentNode instanceof ShadowRoot)return Y(_.parentNode.host,$);if(_.parentElement)return Y(_.parentElement,$)}}function Br(_){return ft().some($=>_.matches($))}var St=[];function Fr(_){St.push(_)}var Vr=1;function q(_,$=s_,e=()=>{}){Y(_,t=>t._x_ignore)||br(()=>{$(_,(t,n)=>{t._x_marker||(e(t,n),St.forEach(r=>r(t,n)),H$(t,t.attributes).forEach(r=>r()),t._x_ignore||(t._x_marker=Vr++),t._x_ignore&&n())})})}function R_(_,$=s_){$(_,e=>{Ir(e),Qe(e),delete e._x_marker})}function kr(){[["ui","dialog",["[x-dialog], [x-popover]"]],["anchor","anchor",["[x-anchor]"]],["sort","sort",["[x-sort]"]]].forEach(([$,e,t])=>{Dr(e)||t.some(n=>{if(document.querySelector(n))return j(`found "${n}", but missing ${$} plugin`),!0})})}var W$=[],D$=!1;function b$(_=()=>{}){return queueMicrotask(()=>{D$||setTimeout(()=>{v$()})}),new Promise($=>{W$.push(()=>{_(),$()})})}function v$(){for(D$=!1;W$.length;)W$.shift()()}function Kr(){D$=!0}function w$(_,$){return Array.isArray($)?Nt(_,$.join(" ")):typeof $=="object"&&$!==null?jr(_,$):typeof $=="function"?w$(_,$()):Nt(_,$)}function U$(_){return _.split(/\s/).filter(Boolean)}function Nt(_,$){let e=n=>U$(n).filter(r=>!_.classList.contains(r)).filter(Boolean),t=n=>(_.classList.add(...n),()=>{_.classList.remove(...n)});return $=$===!0?$="":$||"",t(e($))}function jr(_,$){let e=Object.entries($).flatMap(([i,T])=>T?U$(i):!1).filter(Boolean),t=Object.entries($).flatMap(([i,T])=>T?!1:U$(i)).filter(Boolean),n=[],r=[];return t.forEach(i=>{_.classList.contains(i)&&(_.classList.remove(i),r.push(i))}),e.forEach(i=>{_.classList.contains(i)||(_.classList.add(i),n.push(i))}),()=>{r.forEach(i=>_.classList.add(i)),n.forEach(i=>_.classList.remove(i))}}function j_(_,$){return typeof $=="object"&&$!==null?Xr(_,$):Yr(_,$)}function Xr(_,$){let e={};return Object.entries($).forEach(([t,n])=>{e[t]=_.style[t],t.startsWith("--")||(t=qr(t)),_.style.setProperty(t,n)}),setTimeout(()=>{_.style.length===0&&_.removeAttribute("style")}),()=>{j_(_,e)}}function Yr(_,$){let e=_.getAttribute("style",$);return _.setAttribute("style",$),()=>{_.setAttribute("style",e||"")}}function qr(_){return _.replace(/([a-z])([A-Z])/g,"$1-$2").toLowerCase()}function G$(_,$=()=>{}){let e=!1;return function(){e?$.apply(this,arguments):(e=!0,_.apply(this,arguments))}}D("transition",(_,{value:$,modifiers:e,expression:t},{evaluate:n})=>{typeof t=="function"&&(t=n(t)),t!==!1&&(!t||typeof t=="boolean"?Qr(_,e,$):zr(_,t,$))});function zr(_,$,e){Ct(_,w$,""),{enter:n=>{_._x_transition.enter.during=n},"enter-start":n=>{_._x_transition.enter.start=n},"enter-end":n=>{_._x_transition.enter.end=n},leave:n=>{_._x_transition.leave.during=n},"leave-start":n=>{_._x_transition.leave.start=n},"leave-end":n=>{_._x_transition.leave.end=n}}[e]($)}function Qr(_,$,e){Ct(_,j_);let t=!$.includes("in")&&!$.includes("out")&&!e,n=t||$.includes("in")||["enter"].includes(e),r=t||$.includes("out")||["leave"].includes(e);$.includes("in")&&!t&&($=$.filter((P,w)=>w<$.indexOf("out"))),$.includes("out")&&!t&&($=$.filter((P,w)=>w>$.indexOf("out")));let i=!$.includes("opacity")&&!$.includes("scale"),T=i||$.includes("opacity"),o=i||$.includes("scale"),L=T?0:1,l=o?W_($,"scale",95)/100:1,c=W_($,"delay",0)/1e3,S=W_($,"origin","center"),N="opacity, transform",C=W_($,"duration",150)/1e3,I=W_($,"duration",75)/1e3,g="cubic-bezier(0.4, 0.0, 0.2, 1)";n&&(_._x_transition.enter.during={transformOrigin:S,transitionDelay:`${c}s`,transitionProperty:N,transitionDuration:`${C}s`,transitionTimingFunction:g},_._x_transition.enter.start={opacity:L,transform:`scale(${l})`},_._x_transition.enter.end={opacity:1,transform:"scale(1)"}),r&&(_._x_transition.leave.during={transformOrigin:S,transitionDelay:`${c}s`,transitionProperty:N,transitionDuration:`${I}s`,transitionTimingFunction:g},_._x_transition.leave.start={opacity:1,transform:"scale(1)"},_._x_transition.leave.end={opacity:L,transform:`scale(${l})`})}function Ct(_,$,e={}){_._x_transition||(_._x_transition={enter:{during:e,start:e,end:e},leave:{during:e,start:e,end:e},in(t=()=>{},n=()=>{}){B$(_,$,{during:this.enter.during,start:this.enter.start,end:this.enter.end},t,n)},out(t=()=>{},n=()=>{}){B$(_,$,{during:this.leave.during,start:this.leave.start,end:this.leave.end},t,n)}})}window.Element.prototype._x_toggleAndCascadeWithTransitions=function(_,$,e,t){const n=document.visibilityState==="visible"?requestAnimationFrame:setTimeout;let r=()=>n(e);if($){_._x_transition&&(_._x_transition.enter||_._x_transition.leave)?_._x_transition.enter&&(Object.entries(_._x_transition.enter.during).length||Object.entries(_._x_transition.enter.start).length||Object.entries(_._x_transition.enter.end).length)?_._x_transition.in(e):r():_._x_transition?_._x_transition.in(e):r();return}_._x_hidePromise=_._x_transition?new Promise((i,T)=>{_._x_transition.out(()=>{},()=>i(t)),_._x_transitioning&&_._x_transitioning.beforeCancel(()=>T({isFromCancelledTransition:!0}))}):Promise.resolve(t),queueMicrotask(()=>{let i=pt(_);i?(i._x_hideChildren||(i._x_hideChildren=[]),i._x_hideChildren.push(_)):n(()=>{let T=o=>{let L=Promise.all([o._x_hidePromise,...(o._x_hideChildren||[]).map(T)]).then(([l])=>l?.());return delete o._x_hidePromise,delete o._x_hideChildren,L};T(_).catch(o=>{if(!o.isFromCancelledTransition)throw o})})})};function pt(_){let $=_.parentNode;if($)return $._x_hidePromise?$:pt($)}function B$(_,$,{during:e,start:t,end:n}={},r=()=>{},i=()=>{}){if(_._x_transitioning&&_._x_transitioning.cancel(),Object.keys(e).length===0&&Object.keys(t).length===0&&Object.keys(n).length===0){r(),i();return}let T,o,L;Jr(_,{start(){T=$(_,t)},during(){o=$(_,e)},before:r,end(){T(),L=$(_,n)},after:i,cleanup(){o(),L()}})}function Jr(_,$){let e,t,n,r=G$(()=>{y(()=>{e=!0,t||$.before(),n||($.end(),v$()),$.after(),_.isConnected&&$.cleanup(),delete _._x_transitioning})});_._x_transitioning={beforeCancels:[],beforeCancel(i){this.beforeCancels.push(i)},cancel:G$(function(){for(;this.beforeCancels.length;)this.beforeCancels.shift()();r()}),finish:r},y(()=>{$.start(),$.during()}),Kr(),requestAnimationFrame(()=>{if(e)return;let i=Number(getComputedStyle(_).transitionDuration.replace(/,.*/,"").replace("s",""))*1e3,T=Number(getComputedStyle(_).transitionDelay.replace(/,.*/,"").replace("s",""))*1e3;i===0&&(i=Number(getComputedStyle(_).animationDuration.replace("s",""))*1e3),y(()=>{$.before()}),t=!0,requestAnimationFrame(()=>{e||(y(()=>{$.end()}),v$(),setTimeout(_._x_transitioning.finish,i+T),n=!0)})})}function W_(_,$,e){if(_.indexOf($)===-1)return e;const t=_[_.indexOf($)+1];if(!t||$==="scale"&&isNaN(t))return e;if($==="duration"||$==="delay"){let n=t.match(/([0-9]+)ms/);if(n)return n[1]}return $==="origin"&&["top","right","left","center","bottom"].includes(_[_.indexOf($)+2])?[t,_[_.indexOf($)+2]].join(" "):t}var z=!1;function Q(_,$=()=>{}){return(...e)=>z?$(...e):_(...e)}function Zr(_){return(...$)=>z&&_(...$)}var gt=[];function X_(_){gt.push(_)}function _i(_,$){gt.forEach(e=>e(_,$)),z=!0,mt(()=>{q($,(e,t)=>{t(e,()=>{})})}),z=!1}var F$=!1;function $i(_,$){$._x_dataStack||($._x_dataStack=_._x_dataStack),z=!0,F$=!0,mt(()=>{ei($)}),z=!1,F$=!1}function ei(_){let $=!1;q(_,(t,n)=>{s_(t,(r,i)=>{if($&&Br(r))return i();$=!0,n(r,i)})})}function mt(_){let $=r_;ke((e,t)=>{let n=$(e);return u_(n),()=>{}}),_(),ke($)}function Ot(_,$,e,t=[]){switch(_._x_bindings||(_._x_bindings=I_({})),_._x_bindings[$]=e,$=t.includes("camel")?si($):$,$){case"value":ti(_,e);break;case"style":ri(_,e);break;case"class":ni(_,e);break;case"selected":case"checked":ii(_,$,e);break;default:Ht(_,$,e);break}}function ti(_,$){if(V$(_))_.attributes.value===void 0&&(_.value=$);else if(q_(_))Number.isInteger($)?_.value=$:!Array.isArray($)&&typeof $!="boolean"&&![null,void 0].includes($)?_.value=String($):Array.isArray($)?_.checked=$.some(e=>Li(e,_.value)):_.checked=!!$;else if(_.tagName==="SELECT")oi(_,$);else{if(_.value===$)return;_.value=$===void 0?"":$}}function ni(_,$){_._x_undoAddedClasses&&_._x_undoAddedClasses(),_._x_undoAddedClasses=w$(_,$)}function ri(_,$){_._x_undoAddedStyles&&_._x_undoAddedStyles(),_._x_undoAddedStyles=j_(_,$)}function ii(_,$,e){Ht(_,$,e),ai(_,$,e)}function Ht(_,$,e){[null,void 0,!1].includes(e)&&li($)?_.removeAttribute($):(Mt($)&&(e=$),Ti(_,$,e))}function Ti(_,$,e){_.getAttribute($)!=e&&_.setAttribute($,e)}function ai(_,$,e){_[$]!==e&&(_[$]=e)}function oi(_,$){const e=[].concat($).map(t=>t+"");Array.from(_.options).forEach(t=>{t.selected=e.includes(t.value)})}function si(_){return _.toLowerCase().replace(/-(\w)/g,($,e)=>e.toUpperCase())}function Li(_,$){return _==$}function Y_(_){return[1,"1","true","on","yes",!0].includes(_)?!0:[0,"0","false","off","no",!1].includes(_)?!1:_?!!_:null}var Ei=new Set(["allowfullscreen","async","autofocus","autoplay","checked","controls","default","defer","disabled","formnovalidate","inert","ismap","itemscope","loop","multiple","muted","nomodule","novalidate","open","playsinline","readonly","required","reversed","selected","shadowrootclonable","shadowrootdelegatesfocus","shadowrootserializable"]);function Mt(_){return Ei.has(_)}function li(_){return!["aria-pressed","aria-checked","aria-expanded","aria-selected"].includes(_)}function Ai(_,$,e){return _._x_bindings&&_._x_bindings[$]!==void 0?_._x_bindings[$]:Pt(_,$,e)}function Ii(_,$,e,t=!0){if(_._x_bindings&&_._x_bindings[$]!==void 0)return _._x_bindings[$];if(_._x_inlineBindings&&_._x_inlineBindings[$]!==void 0){let n=_._x_inlineBindings[$];return n.extract=t,nt(()=>a_(_,n.expression))}return Pt(_,$,e)}function Pt(_,$,e){let t=_.getAttribute($);return t===null?typeof e=="function"?e():e:t===""?!0:Mt($)?!![$,"true"].includes(t):t}function q_(_){return _.type==="checkbox"||_.localName==="ui-checkbox"||_.localName==="ui-switch"}function V$(_){return _.type==="radio"||_.localName==="ui-radio"}function xt(_,$){let e;return function(){const t=this,n=arguments,r=function(){e=null,_.apply(t,n)};clearTimeout(e),e=setTimeout(r,$)}}function yt(_,$){let e;return function(){let t=this,n=arguments;e||(_.apply(t,n),e=!0,setTimeout(()=>e=!1,$))}}function Wt({get:_,set:$},{get:e,set:t}){let n=!0,r,i=r_(()=>{let T=_(),o=e();if(n)t(k$(T)),n=!1;else{let L=JSON.stringify(T),l=JSON.stringify(o);L!==r?t(k$(T)):L!==l&&$(k$(o))}r=JSON.stringify(_()),JSON.stringify(e())});return()=>{u_(i)}}function k$(_){return typeof _=="object"?JSON.parse(JSON.stringify(_)):_}function ui(_){(Array.isArray(_)?_:[_]).forEach(e=>e(d_))}var L_={},Dt=!1;function ci(_,$){if(Dt||(L_=I_(L_),Dt=!0),$===void 0)return L_[_];L_[_]=$,p$(L_[_]),typeof $=="object"&&$!==null&&$.hasOwnProperty("init")&&typeof $.init=="function"&&L_[_].init()}function fi(){return L_}var bt={};function Ri(_,$){let e=typeof $!="function"?()=>$:$;return _ instanceof Element?vt(_,e()):(bt[_]=e,()=>{})}function di(_){return Object.entries(bt).forEach(([$,e])=>{Object.defineProperty(_,$,{get(){return(...t)=>e(...t)}})}),_}function vt(_,$,e){let t=[];for(;t.length;)t.pop()();let n=Object.entries($).map(([i,T])=>({name:i,value:T})),r=Tt(n);return n=n.map(i=>r.find(T=>T.name===i.name)?{name:`x-bind:${i.name}`,value:`"${i.value}"`}:i),H$(_,n,e).map(i=>{t.push(i.runCleanups),i()}),()=>{for(;t.length;)t.pop()()}}var wt={};function hi(_,$){wt[_]=$}function Si(_,$){return Object.entries(wt).forEach(([e,t])=>{Object.defineProperty(_,e,{get(){return(...n)=>t.bind($)(...n)},enumerable:!1})}),_}var Ni={get reactive(){return I_},get release(){return u_},get effect(){return r_},get raw(){return Ve},get transaction(){return lr},version:"3.15.12",flushAndStopDeferringMutations:fr,dontAutoEvaluateFunctions:nt,disableEffectScheduling:sr,startObservingMutations:S$,stopObservingMutations:Je,setReactivityEngine:Lr,onAttributeRemoved:ze,onAttributesAdded:qe,closestDataStack:i_,skipDuringClone:Q,onlyDuringClone:Zr,addRootSelector:dt,addInitSelector:ht,setErrorHandler:Cr,interceptClone:X_,addScopeToNode:O_,deferMutations:cr,mapAttributes:P$,evaluateLater:v,interceptInit:Fr,initInterceptors:p$,injectMagics:H_,setEvaluator:gr,setRawEvaluator:mr,mergeProxies:T_,extractProp:Ii,findClosest:Y,onElRemoved:R$,closestRoot:K_,destroyTree:R_,interceptor:$t,transition:B$,setStyles:j_,mutateDom:y,directive:D,entangle:Wt,throttle:yt,debounce:xt,evaluate:a_,evaluateRaw:xr,initTree:q,nextTick:b$,prefixed:f_,prefix:Wr,plugin:ui,magic:F,store:ci,start:Gr,clone:$i,cloneNode:_i,bound:Ai,$data:Ze,watch:Ke,walk:s_,data:hi,bind:Ri},d_=Ni;function Ci(_,$){const e=Object.create(null),t=_.split(",");for(let n=0;n<t.length;n++)e[t[n]]=!0;return n=>!!e[n]}var pi=Object.freeze({}),gi=Object.prototype.hasOwnProperty,z_=(_,$)=>gi.call(_,$),E_=Array.isArray,D_=_=>Ut(_)==="[object Map]",mi=_=>typeof _=="string",K$=_=>typeof _=="symbol",Q_=_=>_!==null&&typeof _=="object",Oi=Object.prototype.toString,Ut=_=>Oi.call(_),Gt=_=>Ut(_).slice(8,-1),j$=_=>mi(_)&&_!=="NaN"&&_[0]!=="-"&&""+parseInt(_,10)===_,Hi=_=>{const $=Object.create(null);return e=>$[e]||($[e]=_(e))},Mi=Hi(_=>_.charAt(0).toUpperCase()+_.slice(1)),Bt=(_,$)=>_!==$&&(_===_||$===$),X$=new WeakMap,b_=[],X,l_=Symbol("iterate"),Y$=Symbol("Map key iterate");function Pi(_){return _&&_._isEffect===!0}function xi(_,$=pi){Pi(_)&&(_=_.raw);const e=Di(_,$);return $.lazy||e(),e}function yi(_){_.active&&(Ft(_),_.options.onStop&&_.options.onStop(),_.active=!1)}var Wi=0;function Di(_,$){const e=function(){if(!e.active)return _();if(!b_.includes(e)){Ft(e);try{return vi(),b_.push(e),X=e,_()}finally{b_.pop(),Vt(),X=b_[b_.length-1]}}};return e.id=Wi++,e.allowRecurse=!!$.allowRecurse,e._isEffect=!0,e.active=!0,e.raw=_,e.deps=[],e.options=$,e}function Ft(_){const{deps:$}=_;if($.length){for(let e=0;e<$.length;e++)$[e].delete(_);$.length=0}}var h_=!0,q$=[];function bi(){q$.push(h_),h_=!1}function vi(){q$.push(h_),h_=!0}function Vt(){const _=q$.pop();h_=_===void 0?!0:_}function V(_,$,e){if(!h_||X===void 0)return;let t=X$.get(_);t||X$.set(_,t=new Map);let n=t.get(e);n||t.set(e,n=new Set),n.has(X)||(n.add(X),X.deps.push(n),X.options.onTrack&&X.options.onTrack({effect:X,target:_,type:$,key:e}))}function J(_,$,e,t,n,r){const i=X$.get(_);if(!i)return;const T=new Set,o=l=>{l&&l.forEach(c=>{(c!==X||c.allowRecurse)&&T.add(c)})};if($==="clear")i.forEach(o);else if(e==="length"&&E_(_))i.forEach((l,c)=>{(c==="length"||c>=t)&&o(l)});else switch(e!==void 0&&o(i.get(e)),$){case"add":E_(_)?j$(e)&&o(i.get("length")):(o(i.get(l_)),D_(_)&&o(i.get(Y$)));break;case"delete":E_(_)||(o(i.get(l_)),D_(_)&&o(i.get(Y$)));break;case"set":D_(_)&&o(i.get(l_));break}const L=l=>{l.options.onTrigger&&l.options.onTrigger({effect:l,target:_,key:e,type:$,newValue:t,oldValue:n,oldTarget:r}),l.options.scheduler?l.options.scheduler(l):l()};T.forEach(L)}var wi=Ci("__proto__,__v_isRef,__isVue"),kt=new Set(Object.getOwnPropertyNames(Symbol).map(_=>Symbol[_]).filter(K$)),Ui=jt(),Gi=jt(!0),Kt=Bi();function Bi(){const _={};return["includes","indexOf","lastIndexOf"].forEach($=>{_[$]=function(...e){const t=x(this);for(let r=0,i=this.length;r<i;r++)V(t,"get",r+"");const n=t[$](...e);return n===-1||n===!1?t[$](...e.map(x)):n}}),["push","pop","shift","unshift","splice"].forEach($=>{_[$]=function(...e){bi();const t=x(this)[$].apply(this,e);return Vt(),t}}),_}function jt(_=!1,$=!1){return function(t,n,r){if(n==="__v_isReactive")return!_;if(n==="__v_isReadonly")return _;if(n==="__v_raw"&&r===(_?$?$T:_n:$?_T:Zt).get(t))return t;const i=E_(t);if(!_&&i&&z_(Kt,n))return Reflect.get(Kt,n,r);const T=Reflect.get(t,n,r);return(K$(n)?kt.has(n):wi(n))||(_||V(t,"get",n),$)?T:_e(T)?!i||!j$(n)?T.value:T:Q_(T)?_?$n(T):Z$(T):T}}var Fi=Vi();function Vi(_=!1){return function(e,t,n,r){let i=e[t];if(!_&&(n=x(n),i=x(i),!E_(e)&&_e(i)&&!_e(n)))return i.value=n,!0;const T=E_(e)&&j$(t)?Number(t)<e.length:z_(e,t),o=Reflect.set(e,t,n,r);return e===x(r)&&(T?Bt(n,i)&&J(e,"set",t,n,i):J(e,"add",t,n)),o}}function ki(_,$){const e=z_(_,$),t=_[$],n=Reflect.deleteProperty(_,$);return n&&e&&J(_,"delete",$,void 0,t),n}function Ki(_,$){const e=Reflect.has(_,$);return(!K$($)||!kt.has($))&&V(_,"has",$),e}function ji(_){return V(_,"iterate",E_(_)?"length":l_),Reflect.ownKeys(_)}var Xi={get:Ui,set:Fi,deleteProperty:ki,has:Ki,ownKeys:ji},Yi={get:Gi,set(_,$){return console.warn(`Set operation on key "${String($)}" failed: target is readonly.`,_),!0},deleteProperty(_,$){return console.warn(`Delete operation on key "${String($)}" failed: target is readonly.`,_),!0}},z$=_=>Q_(_)?Z$(_):_,Q$=_=>Q_(_)?$n(_):_,J$=_=>_,J_=_=>Reflect.getPrototypeOf(_);function Z_(_,$,e=!1,t=!1){_=_.__v_raw;const n=x(_),r=x($);$!==r&&!e&&V(n,"get",$),!e&&V(n,"get",r);const{has:i}=J_(n),T=t?J$:e?Q$:z$;if(i.call(n,$))return T(_.get($));if(i.call(n,r))return T(_.get(r));_!==n&&_.get($)}function _$(_,$=!1){const e=this.__v_raw,t=x(e),n=x(_);return _!==n&&!$&&V(t,"has",_),!$&&V(t,"has",n),_===n?e.has(_):e.has(_)||e.has(n)}function $$(_,$=!1){return _=_.__v_raw,!$&&V(x(_),"iterate",l_),Reflect.get(_,"size",_)}function Xt(_){_=x(_);const $=x(this);return J_($).has.call($,_)||($.add(_),J($,"add",_,_)),this}function Yt(_,$){$=x($);const e=x(this),{has:t,get:n}=J_(e);let r=t.call(e,_);r?Jt(e,t,_):(_=x(_),r=t.call(e,_));const i=n.call(e,_);return e.set(_,$),r?Bt($,i)&&J(e,"set",_,$,i):J(e,"add",_,$),this}function qt(_){const $=x(this),{has:e,get:t}=J_($);let n=e.call($,_);n?Jt($,e,_):(_=x(_),n=e.call($,_));const r=t?t.call($,_):void 0,i=$.delete(_);return n&&J($,"delete",_,void 0,r),i}function zt(){const _=x(this),$=_.size!==0,e=D_(_)?new Map(_):new Set(_),t=_.clear();return $&&J(_,"clear",void 0,void 0,e),t}function e$(_,$){return function(t,n){const r=this,i=r.__v_raw,T=x(i),o=$?J$:_?Q$:z$;return!_&&V(T,"iterate",l_),i.forEach((L,l)=>t.call(n,o(L),o(l),r))}}function t$(_,$,e){return function(...t){const n=this.__v_raw,r=x(n),i=D_(r),T=_==="entries"||_===Symbol.iterator&&i,o=_==="keys"&&i,L=n[_](...t),l=e?J$:$?Q$:z$;return!$&&V(r,"iterate",o?Y$:l_),{next(){const{value:c,done:S}=L.next();return S?{value:c,done:S}:{value:T?[l(c[0]),l(c[1])]:l(c),done:S}},[Symbol.iterator](){return this}}}}function Z(_){return function(...$){{const e=$[0]?`on key "${$[0]}" `:"";console.warn(`${Mi(_)} operation ${e}failed: target is readonly.`,x(this))}return _==="delete"?!1:this}}function qi(){const _={get(r){return Z_(this,r)},get size(){return $$(this)},has:_$,add:Xt,set:Yt,delete:qt,clear:zt,forEach:e$(!1,!1)},$={get(r){return Z_(this,r,!1,!0)},get size(){return $$(this)},has:_$,add:Xt,set:Yt,delete:qt,clear:zt,forEach:e$(!1,!0)},e={get(r){return Z_(this,r,!0)},get size(){return $$(this,!0)},has(r){return _$.call(this,r,!0)},add:Z("add"),set:Z("set"),delete:Z("delete"),clear:Z("clear"),forEach:e$(!0,!1)},t={get(r){return Z_(this,r,!0,!0)},get size(){return $$(this,!0)},has(r){return _$.call(this,r,!0)},add:Z("add"),set:Z("set"),delete:Z("delete"),clear:Z("clear"),forEach:e$(!0,!0)};return["keys","values","entries",Symbol.iterator].forEach(r=>{_[r]=t$(r,!1,!1),e[r]=t$(r,!0,!1),$[r]=t$(r,!1,!0),t[r]=t$(r,!0,!0)}),[_,e,$,t]}var[zi,Qi]=qi();function Qt(_,$){const e=_?Qi:zi;return(t,n,r)=>n==="__v_isReactive"?!_:n==="__v_isReadonly"?_:n==="__v_raw"?t:Reflect.get(z_(e,n)&&n in t?e:t,n,r)}var Ji={get:Qt(!1)},Zi={get:Qt(!0)};function Jt(_,$,e){const t=x(e);if(t!==e&&$.call(_,t)){const n=Gt(_);console.warn(`Reactive ${n} contains both the raw and reactive versions of the same object${n==="Map"?" as keys":""}, which can lead to inconsistencies. Avoid differentiating between the raw and reactive versions of an object and only use the reactive version if possible.`)}}var Zt=new WeakMap,_T=new WeakMap,_n=new WeakMap,$T=new WeakMap;function eT(_){switch(_){case"Object":case"Array":return 1;case"Map":case"Set":case"WeakMap":case"WeakSet":return 2;default:return 0}}function tT(_){return _.__v_skip||!Object.isExtensible(_)?0:eT(Gt(_))}function Z$(_){return _&&_.__v_isReadonly?_:en(_,!1,Xi,Ji,Zt)}function $n(_){return en(_,!0,Yi,Zi,_n)}function en(_,$,e,t,n){if(!Q_(_))return console.warn(`value cannot be made reactive: ${String(_)}`),_;if(_.__v_raw&&!($&&_.__v_isReactive))return _;const r=n.get(_);if(r)return r;const i=tT(_);if(i===0)return _;const T=new Proxy(_,i===2?t:e);return n.set(_,T),T}function x(_){return _&&x(_.__v_raw)||_}function _e(_){return!!(_&&_.__v_isRef===!0)}F("nextTick",()=>b$),F("dispatch",_=>y_.bind(y_,_)),F("watch",(_,{evaluateLater:$,cleanup:e})=>(t,n)=>{let r=$(t),T=Ke(()=>{let o;return r(L=>o=L),o},n);e(T)}),F("store",fi),F("data",_=>Ze(_)),F("root",_=>K_(_)),F("refs",_=>(_._x_refs_proxy||(_._x_refs_proxy=T_(nT(_))),_._x_refs_proxy));function nT(_){let $=[];return Y(_,e=>{e._x_refs&&$.push(e._x_refs)}),$}var $e={};function tn(_){return $e[_]||($e[_]=0),++$e[_]}function rT(_,$){return Y(_,e=>{if(e._x_ids&&e._x_ids[$])return!0})}function iT(_,$){_._x_ids||(_._x_ids={}),_._x_ids[$]||(_._x_ids[$]=tn($))}F("id",(_,{cleanup:$})=>(e,t=null)=>{let n=`${e}${t?`-${t}`:""}`;return TT(_,n,$,()=>{let r=rT(_,e),i=r?r._x_ids[e]:tn(e);return t?`${e}-${i}-${t}`:`${e}-${i}`})}),X_((_,$)=>{_._x_id&&($._x_id=_._x_id)});function TT(_,$,e,t){if(_._x_id||(_._x_id={}),_._x_id[$])return _._x_id[$];let n=t();return _._x_id[$]=n,e(()=>{delete _._x_id[$]}),n}F("el",_=>_),nn("Focus","focus","focus"),nn("Persist","persist","persist");function nn(_,$,e){F($,t=>j(`You can't use [$${$}] without first installing the "${_}" plugin here: https://alpinejs.dev/plugins/${e}`,t))}D("modelable",(_,{expression:$},{effect:e,evaluateLater:t,cleanup:n})=>{let r=t($),i=()=>{let l;return r(c=>l=c),l},T=t(`${$} = __placeholder`),o=l=>T(()=>{},{scope:{__placeholder:l}}),L=i();o(L),queueMicrotask(()=>{if(!_._x_model)return;_._x_removeModelListeners.default();let l=_._x_model.get,c=_._x_model.setWithModifiers,S=Wt({get(){return l()},set(N){c(N)}},{get(){return i()},set(N){o(N)}});n(S)})}),D("teleport",(_,{modifiers:$,expression:e},{cleanup:t})=>{_.tagName.toLowerCase()!=="template"&&j("x-teleport can only be used on a <template> tag",_);let n=rn(e),r=_.content.cloneNode(!0).firstElementChild;_._x_teleport=r,r._x_teleportBack=_,_.setAttribute("data-teleport-template",!0),r.setAttribute("data-teleport-target",!0),_._x_forwardEvents&&_._x_forwardEvents.forEach(T=>{r.addEventListener(T,o=>{o.stopPropagation(),_.dispatchEvent(new o.constructor(o.type,o))})}),O_(r,{},_);let i=(T,o,L)=>{L.includes("prepend")?o.parentNode.insertBefore(T,o):L.includes("append")?o.parentNode.insertBefore(T,o.nextSibling):o.appendChild(T)};y(()=>{Q(()=>{i(r,n,$),q(r)})()}),_._x_teleportPutBack=()=>{let T=rn(e);y(()=>{i(_._x_teleport,T,$)})},t(()=>y(()=>{r.remove(),R_(r)}))});var aT=document.createElement("div");function rn(_){let $=Q(()=>document.querySelector(_),()=>aT)();return $||j(`Cannot find x-teleport element for selector: "${_}"`),$}var Tn=()=>{};Tn.inline=(_,{modifiers:$},{cleanup:e})=>{$.includes("self")?_._x_ignoreSelf=!0:_._x_ignore=!0,e(()=>{$.includes("self")?delete _._x_ignoreSelf:delete _._x_ignore})},D("ignore",Tn),D("effect",Q((_,{expression:$},{effect:e})=>{e(v(_,$))}));function S_(_,$,e,t){let n=_,r=o=>t(o),i={},T=(o,L)=>l=>L(o,l);return e.includes("dot")&&($=oT($)),e.includes("camel")&&($=sT($)),e.includes("capture")&&(i.capture=!0),e.includes("window")&&(n=window),e.includes("document")&&(n=document),e.includes("passive")&&(i.passive=e[e.indexOf("passive")+1]!=="false"),r=an(e,r),e.includes("prevent")&&(r=T(r,(o,L)=>{L.preventDefault(),o(L)})),e.includes("stop")&&(r=T(r,(o,L)=>{L.stopPropagation(),o(L)})),e.includes("once")&&(r=T(r,(o,L)=>{o(L),n.removeEventListener($,r,i)})),(e.includes("away")||e.includes("outside"))&&(n=document,r=T(r,(o,L)=>{_.contains(L.target)||L.target.isConnected!==!1&&(_.offsetWidth<1&&_.offsetHeight<1||_._x_isShown!==!1&&o(L))})),e.includes("self")&&(r=T(r,(o,L)=>{L.target===_&&o(L)})),$==="submit"&&(r=T(r,(o,L)=>{L.target._x_pendingModelUpdates&&L.target._x_pendingModelUpdates.forEach(l=>l()),o(L)})),(ET($)||on($))&&(r=T(r,(o,L)=>{lT(L,e)||o(L)})),n.addEventListener($,r,i),()=>{n.removeEventListener($,r,i)}}function an(_,$){if(_.includes("debounce")){let e=_[_.indexOf("debounce")+1]||"invalid-wait",t=n$(e.split("ms")[0])?Number(e.split("ms")[0]):250;$=xt($,t)}if(_.includes("throttle")){let e=_[_.indexOf("throttle")+1]||"invalid-wait",t=n$(e.split("ms")[0])?Number(e.split("ms")[0]):250;$=yt($,t)}return $}function oT(_){return _.replace(/-/g,".")}function sT(_){return _.toLowerCase().replace(/-(\w)/g,($,e)=>e.toUpperCase())}function n$(_){return!Array.isArray(_)&&!isNaN(_)}function LT(_){return[" ","_"].includes(_)?_:_.replace(/([a-z])([A-Z])/g,"$1-$2").replace(/[_\s]/,"-").toLowerCase()}function ET(_){return["keydown","keyup"].includes(_)}function on(_){return["contextmenu","click","mouse"].some($=>_.includes($))}function lT(_,$){let e=$.filter(r=>!["window","document","prevent","stop","once","capture","self","away","outside","passive","preserve-scroll","blur","change","lazy"].includes(r));if(e.includes("debounce")){let r=e.indexOf("debounce");e.splice(r,n$((e[r+1]||"invalid-wait").split("ms")[0])?2:1)}if(e.includes("throttle")){let r=e.indexOf("throttle");e.splice(r,n$((e[r+1]||"invalid-wait").split("ms")[0])?2:1)}if(e.length===0||e.length===1&&sn(_.key).includes(e[0]))return!1;const n=["ctrl","shift","alt","meta","cmd","super"].filter(r=>e.includes(r));return e=e.filter(r=>!n.includes(r)),!(n.length>0&&n.filter(i=>((i==="cmd"||i==="super")&&(i="meta"),_[`${i}Key`])).length===n.length&&(on(_.type)||sn(_.key).includes(e[0])))}function sn(_){if(!_)return[];_=LT(_);let $={ctrl:"control",slash:"/",space:" ",spacebar:" ",cmd:"meta",esc:"escape",up:"arrow-up",down:"arrow-down",left:"arrow-left",right:"arrow-right",period:".",comma:",",equal:"=",minus:"-",underscore:"_"};return $[_]=_,Object.keys($).map(e=>{if($[e]===_)return e}).filter(e=>e)}D("model",(_,{modifiers:$,expression:e},{effect:t,cleanup:n})=>{let r=_;$.includes("parent")&&(r=Y(_,I=>I!==_));let i=v(r,e),T;typeof e=="string"?T=v(r,`${e} = __placeholder`):typeof e=="function"&&typeof e()=="string"?T=v(r,`${e()} = __placeholder`):T=()=>{};let o=()=>{let I;return i(g=>I=g),Ln(I)?I.get():I},L=I=>{let g;i(P=>g=P),Ln(g)?g.set(I):T(()=>{},{scope:{__placeholder:I}})};typeof e=="string"&&_.type==="radio"&&y(()=>{_.hasAttribute("name")||_.setAttribute("name",e)});let l=$.includes("change")||$.includes("lazy"),c=$.includes("blur"),S=$.includes("enter"),N=l||c||S,C;if(z)C=()=>{};else if(N){let I=[],g=P=>L(r$(_,$,P,o()));if(l&&I.push(S_(_,"change",$,g)),c&&(I.push(S_(_,"blur",$,g)),_.form)){let P=_.form,w=()=>g({target:_});P._x_pendingModelUpdates||(P._x_pendingModelUpdates=[]),P._x_pendingModelUpdates.push(w),n(()=>{P._x_pendingModelUpdates&&P._x_pendingModelUpdates.splice(P._x_pendingModelUpdates.indexOf(w),1)})}S&&I.push(S_(_,"keydown",$,P=>{P.key==="Enter"&&g(P)})),C=()=>I.forEach(P=>P())}else{let I=_.tagName.toLowerCase()==="select"||["checkbox","radio"].includes(_.type)?"change":"input";C=S_(_,I,$,g=>{L(r$(_,$,g,o()))})}if($.includes("fill")&&([void 0,null,""].includes(o())||q_(_)&&Array.isArray(o())||_.tagName.toLowerCase()==="select"&&_.multiple)&&L(r$(_,$,{target:_},o())),_._x_removeModelListeners||(_._x_removeModelListeners={}),_._x_removeModelListeners.default=C,n(()=>_._x_removeModelListeners.default()),_.form){let I=S_(_.form,"reset",[],g=>{b$(()=>_._x_model&&_._x_model.set(r$(_,$,{target:_},o())))});n(()=>I())}_._x_model={get(){return o()},set(I){L(I)},setWithModifiers:an($,L)},_._x_forceModelUpdate=I=>{I===void 0&&typeof e=="string"&&e.match(/\./)&&(I=""),y(()=>{q_(_)?Array.isArray(I)?_.checked=I.some(g=>g==_.value):_.checked=!!I:V$(_)?typeof I=="boolean"?_.checked=Y_(_.value)===I:_.checked=_.value==I:Ot(_,"value",I)})},t(()=>{let I=o();$.includes("unintrusive")&&document.activeElement.isSameNode(_)||_._x_forceModelUpdate(I)})});function r$(_,$,e,t){return y(()=>{if(e instanceof CustomEvent&&e.detail!==void 0)return e.detail!==null&&e.detail!==void 0?e.detail:e.target.value;if(q_(_))if(Array.isArray(t)){let n=null;return $.includes("number")?n=ee(e.target.value):$.includes("boolean")?n=Y_(e.target.value):n=e.target.value,e.target.checked?t.includes(n)?t:t.concat([n]):t.filter(r=>!AT(r,n))}else return e.target.checked;else{if(_.tagName.toLowerCase()==="select"&&_.multiple)return $.includes("number")?Array.from(e.target.selectedOptions).map(n=>{let r=n.value||n.text;return ee(r)}):$.includes("boolean")?Array.from(e.target.selectedOptions).map(n=>{let r=n.value||n.text;return Y_(r)}):Array.from(e.target.selectedOptions).map(n=>n.value||n.text);{let n;return V$(_)?e.target.checked?n=e.target.value:n=t:n=e.target.value,$.includes("number")?ee(n):$.includes("boolean")?Y_(n):$.includes("trim")?n.trim():n}}})}function ee(_){let $=_?parseFloat(_):null;return IT($)?$:_}function AT(_,$){return _==$}function IT(_){return!Array.isArray(_)&&!isNaN(_)}function Ln(_){return _!==null&&typeof _=="object"&&typeof _.get=="function"&&typeof _.set=="function"}D("cloak",_=>queueMicrotask(()=>y(()=>_.removeAttribute(f_("cloak"))))),ht(()=>`[${f_("init")}]`),D("init",Q((_,{expression:$},{evaluate:e})=>typeof $=="string"?!!$.trim()&&e($,{},!1):e($,{},!1))),D("text",(_,{expression:$},{effect:e,evaluateLater:t})=>{let n=t($);e(()=>{n(r=>{y(()=>{_.textContent=r})})})}),D("html",(_,{expression:$},{effect:e,evaluateLater:t})=>{let n=t($);e(()=>{n(r=>{y(()=>{_.innerHTML=r??"",_._x_ignoreSelf=!0,q(_),delete _._x_ignoreSelf})})})}),P$(st(":",Lt(f_("bind:"))));var En=(_,{value:$,modifiers:e,expression:t,original:n},{effect:r,cleanup:i})=>{if(!$){let o={};di(o),v(_,t)(l=>{vt(_,l,n)},{scope:o});return}if($==="key")return uT(_,t);if(_._x_inlineBindings&&_._x_inlineBindings[$]&&_._x_inlineBindings[$].extract)return;let T=v(_,t);r(()=>T(o=>{o===void 0&&typeof t=="string"&&t.match(/\./)&&(o=""),y(()=>Ot(_,$,o,e))})),i(()=>{_._x_undoAddedClasses&&_._x_undoAddedClasses(),_._x_undoAddedStyles&&_._x_undoAddedStyles()})};En.inline=(_,{value:$,modifiers:e,expression:t})=>{$&&(_._x_inlineBindings||(_._x_inlineBindings={}),_._x_inlineBindings[$]={expression:t,extract:!1})},D("bind",En);function uT(_,$){_._x_keyExpression=$}dt(()=>`[${f_("data")}]`),D("data",(_,{expression:$},{cleanup:e})=>{if(cT(_))return;$=$===""?"{}":$;let t={};H_(t,_);let n={};Si(n,t);let r=a_(_,$,{scope:n});(r===void 0||r===!0)&&(r={}),H_(r,_);let i=I_(r);p$(i);let T=O_(_,i);i.init&&a_(_,i.init),e(()=>{i.destroy&&a_(_,i.destroy),T()})}),X_((_,$)=>{_._x_dataStack&&($._x_dataStack=_._x_dataStack,$.setAttribute("data-has-alpine-state",!0))});function cT(_){return z?F$?!0:_.hasAttribute("data-has-alpine-state"):!1}D("show",(_,{modifiers:$,expression:e},{effect:t})=>{let n=v(_,e);_._x_doHide||(_._x_doHide=()=>{y(()=>{_.style.setProperty("display","none",$.includes("important")?"important":void 0)})}),_._x_doShow||(_._x_doShow=()=>{y(()=>{_.style.length===1&&_.style.display==="none"?_.removeAttribute("style"):_.style.removeProperty("display")})});let r=()=>{_._x_doHide(),_._x_isShown=!1},i=()=>{_._x_doShow(),_._x_isShown=!0},T=()=>setTimeout(i),o=G$(c=>c?i():r(),c=>{typeof _._x_toggleAndCascadeWithTransitions=="function"?_._x_toggleAndCascadeWithTransitions(_,c,i,r):c?T():r()}),L,l=!0;t(()=>n(c=>{!l&&c===L||($.includes("immediate")&&(c?T():r()),o(c),L=c,l=!1)}))}),D("for",(_,{expression:$},{effect:e,cleanup:t})=>{let n=dT($),r=v(_,n.items),i=v(_,_._x_keyExpression||"index");_._x_lookup=new Map,e(()=>RT(_,n,r,i)),t(()=>{_._x_lookup.forEach(T=>y(()=>{R_(T),T.remove()})),delete _._x_lookup})});function fT(_){return $=>{Object.entries($).forEach(([e,t])=>{_[e]=t})}}function RT(_,$,e,t){e(n=>{ST(n)&&(n=Array.from({length:n},(L,l)=>l+1)),n==null&&(n=[]),n instanceof Set&&(n=Array.from(n)),n instanceof Map&&(n=Array.from(n));let r=_._x_lookup,i=new Map;_._x_lookup=i;let T=NT(n),o=Object.entries(n).map(([L,l])=>{T||(L=parseInt(L));let c=hT($,l,L,n),S;return t(N=>{typeof N=="object"&&j("x-for key cannot be an object, it must be a string or an integer",_),r.has(N)&&(i.set(N,r.get(N)),r.delete(N)),S=N},{scope:{index:L,...c}}),[S,c]});y(()=>{r.forEach(c=>{R_(c),c.remove()});let L=new Set,l=_;o.forEach(([c,S])=>{if(i.has(c)){let I=i.get(c);I._x_refreshXForScope(S),l.nextElementSibling!==I&&(l.nextElementSibling&&I.replaceWith(l.nextElementSibling),l.after(I)),l=I,I._x_currentIfEl&&(I.nextElementSibling!==I._x_currentIfEl&&l.after(I._x_currentIfEl),l=I._x_currentIfEl);return}_.content.children.length>1&&j("x-for templates require a single root element, additional elements will be ignored.",_);let N=document.importNode(_.content,!0).firstElementChild,C=I_(S);O_(N,C,_),N._x_refreshXForScope=fT(C),i.set(c,N),L.add(N),l.after(N),l=N}),Q(()=>L.forEach(c=>q(c)))()})})}function dT(_){let $=/,([^,\}\]]*)(?:,([^,\}\]]*))?$/,e=/^\s*\(|\)\s*$/g,t=/([\s\S]*?)\s+(?:in|of)\s+([\s\S]*)/,n=_.match(t);if(!n)return;let r={};r.items=n[2].trim();let i=n[1].replace(e,"").trim(),T=i.match($);return T?(r.item=i.replace($,"").trim(),r.index=T[1].trim(),T[2]&&(r.collection=T[2].trim())):r.item=i,r}function hT(_,$,e,t){let n={};return/^\[.*\]$/.test(_.item)&&Array.isArray($)?_.item.replace("[","").replace("]","").split(",").map(i=>i.trim()).forEach((i,T)=>{n[i]=$[T]}):/^\{.*\}$/.test(_.item)&&!Array.isArray($)&&typeof $=="object"?_.item.replace("{","").replace("}","").split(",").map(i=>i.trim()).forEach(i=>{n[i]=$[i]}):n[_.item]=$,_.index&&(n[_.index]=e),_.collection&&(n[_.collection]=t),n}function ST(_){return typeof _!="object"&&!isNaN(_)}function NT(_){return typeof _=="object"&&!Array.isArray(_)}function ln(){}ln.inline=(_,{expression:$},{cleanup:e})=>{let t=K_(_);t&&(t._x_refs||(t._x_refs={}),t._x_refs[$]=_,e(()=>delete t._x_refs[$]))},D("ref",ln),D("if",(_,{expression:$},{effect:e,cleanup:t})=>{_.tagName.toLowerCase()!=="template"&&j("x-if can only be used on a <template> tag",_);let n=v(_,$),r=()=>{if(_._x_currentIfEl)return _._x_currentIfEl;let T=_.content.cloneNode(!0).firstElementChild;return O_(T,{},_),y(()=>{_.after(T),Q(()=>q(T))()}),_._x_currentIfEl=T,_._x_undoIf=()=>{y(()=>{R_(T),T.remove()}),delete _._x_currentIfEl},T},i=()=>{_._x_undoIf&&(_._x_undoIf(),delete _._x_undoIf)};e(()=>n(T=>{T?r():i()})),t(()=>_._x_undoIf&&_._x_undoIf())}),D("id",(_,{expression:$},{evaluate:e})=>{e($).forEach(n=>iT(_,n))}),X_((_,$)=>{_._x_ids&&($._x_ids=_._x_ids)}),P$(st("@",Lt(f_("on:")))),D("on",Q((_,{value:$,modifiers:e,expression:t},{cleanup:n})=>{let r=t?v(_,t):()=>{};_.tagName.toLowerCase()==="template"&&(_._x_forwardEvents||(_._x_forwardEvents=[]),_._x_forwardEvents.includes($)||_._x_forwardEvents.push($));let i=S_(_,$,e,T=>{r(()=>{},{scope:{$event:T},params:[T]})});n(()=>i())})),i$("Collapse","collapse","collapse"),i$("Intersect","intersect","intersect"),i$("Focus","trap","focus"),i$("Mask","mask","mask");function i$(_,$,e){D($,t=>j(`You can't use [x-${$}] without first installing the "${_}" plugin here: https://alpinejs.dev/plugins/${e}`,t))}d_.setEvaluator(Or),d_.setRawEvaluator(yr),d_.setReactivityEngine({reactive:Z$,effect:xi,release:yi,raw:x});var CT=d_,__=CT;const pT=typeof document<"u"&&document.documentMode,gT={rootMargin:"0px",threshold:0,load(_){if(_.nodeName.toLowerCase()==="picture"){let e=_.querySelector("img"),t=!1;e===null&&(e=document.createElement("img"),t=!0),pT&&_.getAttribute("data-iesrc")&&(e.src=_.getAttribute("data-iesrc")),_.getAttribute("data-alt")&&(e.alt=_.getAttribute("data-alt")),t&&_.append(e)}if(_.nodeName.toLowerCase()==="video"&&!_.getAttribute("data-src")&&_.children){const e=_.children;let t;for(let n=0;n<=e.length-1;n++)t=e[n].getAttribute("data-src"),t&&(e[n].src=t);_.load()}_.getAttribute("data-poster")&&(_.poster=_.getAttribute("data-poster")),_.getAttribute("data-src")&&(_.src=_.getAttribute("data-src")),_.getAttribute("data-srcset")&&_.setAttribute("srcset",_.getAttribute("data-srcset"));let $=",";if(_.getAttribute("data-background-delimiter")&&($=_.getAttribute("data-background-delimiter")),_.getAttribute("data-background-image"))_.style.backgroundImage=`url('${_.getAttribute("data-background-image").split($).join("'),url('")}')`;else if(_.getAttribute("data-background-image-set")){const e=_.getAttribute("data-background-image-set").split($);let t=e[0].substr(0,e[0].indexOf(" "))||e[0];t=t.indexOf("url(")===-1?`url(${t})`:t,e.length===1?_.style.backgroundImage=t:_.setAttribute("style",(_.getAttribute("style")||"")+`background-image: ${t}; background-image: -webkit-image-set(${e}); background-image: image-set(${e})`)}_.getAttribute("data-toggle-class")&&_.classList.toggle(_.getAttribute("data-toggle-class"))},loaded(){}};function te(_){_.setAttribute("data-loaded",!0)}function mT(_){_.getAttribute("data-placeholder-background")&&(_.style.background=_.getAttribute("data-placeholder-background"))}const ne=_=>_.getAttribute("data-loaded")==="true",OT=(_,$)=>(e,t)=>{e.forEach(n=>{(n.intersectionRatio>0||n.isIntersecting)&&(t.unobserve(n.target),ne(n.target)||(_(n.target),te(n.target),$(n.target)))})},An=(_,$=document)=>_ instanceof Element?[_]:_ instanceof NodeList?_:$.querySelectorAll(_);function HT(_=".lozad",$={}){const{root:e,rootMargin:t,threshold:n,load:r,loaded:i}=Object.assign({},gT,$);let T;typeof window<"u"&&window.IntersectionObserver&&(T=new IntersectionObserver(OT(r,i),{root:e,rootMargin:t,threshold:n}));const o=An(_,e);for(let L=0;L<o.length;L++)mT(o[L]);return{observe(){const L=An(_,e);for(let l=0;l<L.length;l++)if(!ne(L[l])){if(T){T.observe(L[l]);continue}r(L[l]),te(L[l]),i(L[l])}},triggerLoad(L){ne(L)||(r(L),te(L),i(L))},observer:T}}function MT(_){return _&&_.__esModule&&Object.prototype.hasOwnProperty.call(_,"default")?_.default:_}var T$={exports:{}},re,In;function N_(){return In||(In=1,re=function(_,$,e){return _ instanceof HTMLCollection||_ instanceof NodeList||_ instanceof Array?Array.prototype.forEach.call(_,$,e):$.call(e,_)}),re}var ie,un;function PT(){return un||(un=1,ie=function(_){var $=_.text||_.textContent||_.innerHTML||"",e=_.src||"",t=_.parentNode||document.querySelector("head")||document.documentElement,n=document.createElement("script");if($.match("document.write"))return console&&console.log&&console.log("Script contains document.write. Can’t be executed correctly. Code skipped ",_),!1;if(n.type="text/javascript",n.id=_.id,e!==""&&(n.src=e,n.async=!1),$!=="")try{n.appendChild(document.createTextNode($))}catch{n.text=$}return t.appendChild(n),(t instanceof HTMLHeadElement||t instanceof HTMLBodyElement)&&t.contains(n)&&t.removeChild(n),!0}),ie}var Te,cn;function xT(){if(cn)return Te;cn=1;var _=N_(),$=PT();return Te=function(e){e.tagName.toLowerCase()==="script"&&$(e),_(e.querySelectorAll("script"),function(t){(!t.type||t.type.toLowerCase()==="text/javascript")&&(t.parentNode&&t.parentNode.removeChild(t),$(t))})},Te}var ae,fn;function a$(){if(fn)return ae;fn=1;var _=N_();return ae=function($,e,t,n){e=typeof e=="string"?e.split(" "):e,e.forEach(function(r){_($,function(i){i.addEventListener(r,t,n)})})},ae}var oe,Rn;function se(){if(Rn)return oe;Rn=1;var _=a$();return oe={outerHTML:function($,e){$.outerHTML=e.outerHTML,this.onSwitch()},innerHTML:function($,e){$.innerHTML=e.innerHTML,e.className===""?$.removeAttribute("class"):$.className=e.className,this.onSwitch()},switchElementsAlt:function($,e){if($.innerHTML=e.innerHTML,e.hasAttributes())for(var t=e.attributes,n=0;n<t.length;n++)$.attributes.setNamedItem(t[n].cloneNode());this.onSwitch()},replaceNode:function($,e){$.parentNode.replaceChild(e,$),this.onSwitch()},sideBySide:function($,e,t,n){var r=Array.prototype.forEach,i=[],T=[],o=document.createDocumentFragment(),L="animationend webkitAnimationEnd MSAnimationEnd oanimationend",l=0,c=(function(S){S.target===S.currentTarget&&(l--,l<=0&&i&&(i.forEach(function(N){N.parentNode&&N.parentNode.removeChild(N)}),T.forEach(function(N){N.className=N.className.replace(N.getAttribute("data-pjax-classes"),""),N.removeAttribute("data-pjax-classes")}),T=null,i=null,this.onSwitch()))}).bind(this);n=n||{},r.call($.childNodes,function(S){i.push(S),S.classList&&!S.classList.contains("js-Pjax-remove")&&(S.hasAttribute("data-pjax-classes")&&(S.className=S.className.replace(S.getAttribute("data-pjax-classes"),""),S.removeAttribute("data-pjax-classes")),S.classList.add("js-Pjax-remove"),n.callbacks&&n.callbacks.removeElement&&n.callbacks.removeElement(S),n.classNames&&(S.className+=" "+n.classNames.remove+" "+(t.backward?n.classNames.backward:n.classNames.forward)),l++,_(S,L,c,!0))}),r.call(e.childNodes,function(S){if(S.classList){var N="";n.classNames&&(N=" js-Pjax-add "+n.classNames.add+" "+(t.backward?n.classNames.forward:n.classNames.backward)),n.callbacks&&n.callbacks.addElement&&n.callbacks.addElement(S),S.className+=N,S.setAttribute("data-pjax-classes",N),T.push(S),o.appendChild(S),l++,_(S,L,c,!0)}}),$.className=e.className,$.appendChild(o)}},oe}var Le,dn;function yT(){if(dn)return Le;dn=1;var _=se();Le=function(e){return e=e||{},e.elements=e.elements||"a[href], form[action]",e.selectors=e.selectors||["title",".js-Pjax"],e.switches=e.switches||{},e.switchesOptions=e.switchesOptions||{},e.history=typeof e.history>"u"?!0:e.history,e.analytics=typeof e.analytics=="function"||e.analytics===!1?e.analytics:$,e.scrollTo=typeof e.scrollTo>"u"?0:e.scrollTo,e.scrollRestoration=typeof e.scrollRestoration<"u"?e.scrollRestoration:!0,e.cacheBust=typeof e.cacheBust>"u"?!0:e.cacheBust,e.debug=e.debug||!1,e.timeout=e.timeout||0,e.currentUrlFullReload=typeof e.currentUrlFullReload>"u"?!1:e.currentUrlFullReload,e.switches.head||(e.switches.head=_.switchElementsAlt),e.switches.body||(e.switches.body=_.switchElementsAlt),e};function $(){window._gaq&&_gaq.push(["_trackPageview"]),window.ga&&ga("send","pageview",{page:location.pathname,title:document.title})}return Le}var Ee,hn;function Sn(){return hn||(hn=1,Ee=(function(){var _=0;return function(){var $="pjax"+new Date().getTime()+"_"+_;return _++,$}})()),Ee}var le,Nn;function Cn(){if(Nn)return le;Nn=1;var _=N_();return le=function($,e,t){e=typeof e=="string"?e.split(" "):e,e.forEach(function(n){var r;r=document.createEvent("HTMLEvents"),r.initEvent(n,!0,!0),r.eventName=n,t&&Object.keys(t).forEach(function(i){r[i]=t[i]}),_($,function(i){var T=!1;!i.parentNode&&i!==document&&i!==window&&(T=!0,document.body.appendChild(i)),i.dispatchEvent(r),T&&i.parentNode.removeChild(i)})})},le}var Ae,pn;function o$(){return pn||(pn=1,Ae=function(_){if(_===null||typeof _!="object")return _;var $=_.constructor();for(var e in _)_.hasOwnProperty(e)&&($[e]=_[e]);return $}),Ae}var Ie,gn;function WT(){return gn||(gn=1,Ie=function($,e,t){for(var n=0;n<e.length;n++)for(var r=$.querySelectorAll(e[n]),i=0;i<r.length;i++)if(r[i].contains(t))return!0;return!1}),Ie}var ue,mn;function DT(){return mn||(mn=1,ue=function(_){if(_==null)return null;for(var $=Object(_),e=1;e<arguments.length;e++){var t=arguments[e];if(t!=null)for(var n in t)Object.prototype.hasOwnProperty.call(t,n)&&($[n]=t[n])}return $}),ue}var ce,On;function Hn(){return On||(On=1,ce=function(){}),ce}var fe,Mn;function bT(){return Mn||(Mn=1,fe=function(){this.options.debug&&console&&(typeof console.log=="function"?console.log.apply(console,arguments):console.log&&console.log(arguments))}),fe}var Re,Pn;function vT(){if(Pn)return Re;Pn=1;var _="data-pjax-state";return Re=function($){switch($.tagName.toLowerCase()){case"a":$.hasAttribute(_)||this.attachLink($);break;case"form":$.hasAttribute(_)||this.attachForm($);break;default:throw"Pjax can only be applied on <a> or <form> submit"}},Re}var de,xn;function wT(){if(xn)return de;xn=1;var _=a$(),$=o$(),e="data-pjax-state",t=function(i,T){if(!r(T)){var o=$(this.options),L=n(i,T);if(L){i.setAttribute(e,L);return}if(T.preventDefault(),this.options.currentUrlFullReload&&i.href===window.location.href.split("#")[0]){i.setAttribute(e,"reload"),this.reload();return}i.setAttribute(e,"load"),o.triggerElement=i,this.loadUrl(i.href,o)}};function n(i,T){if(T.which>1||T.metaKey||T.ctrlKey||T.shiftKey||T.altKey)return"modifier";if(i.protocol!==window.location.protocol||i.host!==window.location.host)return"external";if(i.hash&&i.href.replace(i.hash,"")===window.location.href.replace(location.hash,""))return"anchor";if(i.href===window.location.href.split("#")[0]+"#")return"anchor-empty"}var r=function(i){return i.defaultPrevented||i.returnValue===!1};return de=function(i){var T=this;i.setAttribute(e,""),_(i,"click",function(o){t.call(T,i,o)}),_(i,"keyup",(function(o){o.keyCode===13&&t.call(T,i,o)}).bind(this))},de}var he,yn;function UT(){if(yn)return he;yn=1;var _=a$(),$=o$(),e="data-pjax-state",t=function(T,o){if(!i(o)){var L=$(this.options);L.requestOptions={requestUrl:T.getAttribute("action")||window.location.href,requestMethod:T.getAttribute("method")||"GET"};var l=document.createElement("a");l.setAttribute("href",L.requestOptions.requestUrl);var c=r(l,L);if(c){T.setAttribute(e,c);return}o.preventDefault(),T.enctype==="multipart/form-data"?L.requestOptions.formData=new FormData(T):L.requestOptions.requestParams=n(T),T.setAttribute(e,"submit"),L.triggerElement=T,this.loadUrl(l.href,L)}};function n(T){for(var o=[],L=T.elements,l=0;l<L.length;l++){var c=L[l],S=c.tagName.toLowerCase();if(c.name&&c.attributes!==void 0&&S!=="button"){var N=c.attributes.type;if(!N||N.value!=="checkbox"&&N.value!=="radio"||c.checked){var C=[];if(S==="select")for(var I,g=0;g<c.options.length;g++)I=c.options[g],I.selected&&!I.disabled&&C.push(I.hasAttribute("value")?I.value:I.text);else C.push(c.value);for(var P=0;P<C.length;P++)o.push({name:encodeURIComponent(c.name),value:encodeURIComponent(C[P])})}}}return o}function r(T,o){if(T.protocol!==window.location.protocol||T.host!==window.location.host)return"external";if(T.hash&&T.href.replace(T.hash,"")===window.location.href.replace(location.hash,""))return"anchor";if(T.href===window.location.href.split("#")[0]+"#")return"anchor-empty";if(o.currentUrlFullReload&&T.href===window.location.href.split("#")[0])return"reload"}var i=function(T){return T.defaultPrevented||T.returnValue===!1};return he=function(T){var o=this;T.setAttribute(e,""),_(T,"submit",function(L){t.call(o,T,L)})},he}var Se,Wn;function GT(){if(Wn)return Se;Wn=1;var _=N_();return Se=function($,e,t,n){n=n||document,$.forEach(function(r){_(n.querySelectorAll(r),e,t)})},Se}var Ne,Dn;function BT(){if(Dn)return Ne;Dn=1;var _=N_(),$=se();return Ne=function(e,t,n,r,i,T){var o=[];n.forEach(function(L){var l=r.querySelectorAll(L),c=i.querySelectorAll(L);if(this.log&&this.log("Pjax switch",L,l,c),l.length!==c.length)throw"DOM doesn’t look the same on new loaded page: ’"+L+"’ - new "+l.length+", old "+c.length;_(l,function(S,N){var C=c[N];this.log&&this.log("newEl",S,"oldEl",C);var I=e[L]?e[L].bind(this,C,S,T,t[L]):$.outerHTML.bind(this,C,S,T);o.push(I)},this)},this),this.state.numPendingSwitches=o.length,o.forEach(function(L){L()})},Ne}var Ce,bn;function FT(){if(bn)return Ce;bn=1;var _=Hn();return Ce=function($){$&&$.readyState<4&&($.onreadystatechange=_,$.abort())},Ce}var pe,vn;function VT(){return vn||(vn=1,pe=function(_,$,e){var t=new RegExp("([?&])"+$+"=.*?(&|$)","i"),n=_.indexOf("?")!==-1?"&":"?";return _.match(t)?_.replace(t,"$1"+$+"="+e+"$2"):_+n+$+"="+e}),pe}var ge,wn;function kT(){if(wn)return ge;wn=1;var _=VT();return ge=function($,e,t){e=e||{};var n,r=e.requestOptions||{},i=(r.requestMethod||"GET").toUpperCase(),T=r.requestParams||null,o=r.formData||null,L=null,l=new XMLHttpRequest,c=e.timeout||0;if(l.onreadystatechange=function(){l.readyState===4&&(l.status===200?t(l.responseText,l,$,e):l.status!==0&&t(null,l,$,e))},l.onerror=function(S){console.log(S),t(null,l,$,e)},l.ontimeout=function(){t(null,l,$,e)},T&&T.length)switch(n=T.map(function(S){return S.name+"="+S.value}).join("&"),i){case"GET":$=$.split("?")[0],$+="?"+n;break;case"POST":L=n;break}else o&&(L=o);return e.cacheBust&&($=_($,"t",Date.now())),l.open(i,$,!0),l.timeout=c,l.setRequestHeader("X-Requested-With","XMLHttpRequest"),l.setRequestHeader("X-PJAX","true"),l.setRequestHeader("X-PJAX-Selectors",JSON.stringify(e.selectors)),L&&i==="POST"&&!o&&l.setRequestHeader("Content-Type","application/x-www-form-urlencoded"),l.send(L),l},ge}var me,Un;function KT(){if(Un)return me;Un=1;var _=o$(),$=Sn(),e=Cn();return me=function(t,n,r,i){if(i=_(i||this.options),i.request=n,t===!1){e(document,"pjax:complete pjax:error",i);return}var T=window.history.state||{};window.history.replaceState({url:T.url||window.location.href,title:T.title||document.title,uid:T.uid||$(),scrollPos:[document.documentElement.scrollLeft||document.body.scrollLeft,document.documentElement.scrollTop||document.body.scrollTop]},document.title,window.location.href);var o=r;n.responseURL?r!==n.responseURL&&(r=n.responseURL):n.getResponseHeader("X-PJAX-URL")?r=n.getResponseHeader("X-PJAX-URL"):n.getResponseHeader("X-XHR-Redirected-To")&&(r=n.getResponseHeader("X-XHR-Redirected-To"));var L=document.createElement("a");L.href=o;var l=L.hash;L.href=r,l&&!L.hash&&(L.hash=l,r=L.href),this.state.href=r,this.state.options=i;try{this.loadContent(t,i)}catch(c){if(e(document,"pjax:error",i),this.options.debug)throw c;return console&&console.error&&console.error("Pjax switch fail: ",c),this.latestChance(r)}},me}var Oe,Gn;function jT(){return Gn||(Gn=1,Oe=function(){return window.history&&window.history.pushState&&window.history.replaceState&&!navigator.userAgent.match(/((iPod|iPhone|iPad).+\bOS\s+[1-4]\D|WebApps\/.+CFNetwork)/)}),Oe}var Bn;function XT(){if(Bn)return T$.exports;Bn=1;var _=xT(),$=N_(),e=yT(),t=se(),n=Sn(),r=a$(),i=Cn(),T=o$(),o=WT(),L=DT(),l=Hn(),c=function(C){this.state={numPendingSwitches:0,href:null,options:null},this.options=e(C),this.log("Pjax options",this.options),this.options.scrollRestoration&&"scrollRestoration"in history&&(history.scrollRestoration="manual"),this.maxUid=this.lastUid=n(),this.parseDOM(document),r(window,"popstate",(function(I){if(I.state){var g=T(this.options);g.url=I.state.url,g.title=I.state.title,g.history=!1,g.scrollPos=I.state.scrollPos,I.state.uid<this.lastUid?g.backward=!0:g.forward=!0,this.lastUid=I.state.uid,this.loadUrl(I.state.url,g)}}).bind(this))};if(c.switches=t,c.prototype={log:bT(),getElements:function(C){return C.querySelectorAll(this.options.elements)},parseDOM:function(C){var I=vT();$(this.getElements(C),I,this)},refresh:function(C){this.parseDOM(C||document)},reload:function(){window.location.reload()},attachLink:wT(),attachForm:UT(),forEachSelectors:function(C,I,g){return GT().bind(this)(this.options.selectors,C,I,g)},switchSelectors:function(C,I,g,P){return BT().bind(this)(this.options.switches,this.options.switchesOptions,C,I,g,P)},latestChance:function(C){window.location=C},onSwitch:function(){i(window,"resize scroll"),this.state.numPendingSwitches--,this.state.numPendingSwitches===0&&this.afterAllSwitches()},loadContent:function(C,I){if(typeof C!="string"){i(document,"pjax:complete pjax:error",I);return}var g=document.implementation.createHTMLDocument("pjax"),P=/<html[^>]+>/gi,w=/\s?[a-z:]+(?:=['"][^'">]+['"])*/gi,W=C.match(P);if(W&&W.length&&(W=W[0].match(w),W.length&&(W.shift(),W.forEach(function(e_){var t_=e_.trim().split("=");t_.length===1?g.documentElement.setAttribute(t_[0],!0):g.documentElement.setAttribute(t_[0],t_[1].slice(1,-1))}))),g.documentElement.innerHTML=C,this.log("load content",g.documentElement.attributes,g.documentElement.innerHTML.length),document.activeElement&&o(document,this.options.selectors,document.activeElement))try{document.activeElement.blur()}catch{}this.switchSelectors(this.options.selectors,g,document,I)},abortRequest:FT(),doRequest:kT(),handleResponse:KT(),loadUrl:function(C,I){I=typeof I=="object"?L({},this.options,I):T(this.options),this.log("load href",C,I),this.abortRequest(this.request),i(document,"pjax:send",I),this.request=this.doRequest(C,I,this.handleResponse.bind(this))},afterAllSwitches:function(){var C=Array.prototype.slice.call(document.querySelectorAll("[autofocus]")).pop();C&&document.activeElement!==C&&C.focus(),this.options.selectors.forEach(function(e_){$(document.querySelectorAll(e_),function(t_){_(t_)})});var I=this.state;if(I.options.history&&(window.history.state||(this.lastUid=this.maxUid=n(),window.history.replaceState({url:window.location.href,title:document.title,uid:this.maxUid,scrollPos:[0,0]},document.title)),this.lastUid=this.maxUid=n(),window.history.pushState({url:I.href,title:I.options.title,uid:this.maxUid,scrollPos:[0,0]},I.options.title,I.href)),this.forEachSelectors(function(e_){this.parseDOM(e_)},this),i(document,"pjax:complete pjax:success",I.options),typeof I.options.analytics=="function"&&I.options.analytics(),I.options.history){var g=document.createElement("a");if(g.href=this.state.href,g.hash){var P=g.hash.slice(1);P=decodeURIComponent(P);var w=0,W=document.getElementById(P)||document.getElementsByName(P)[0];if(W&&W.offsetParent)do w+=W.offsetTop,W=W.offsetParent;while(W);window.scrollTo(0,w)}else I.options.scrollTo!==!1&&(I.options.scrollTo.length>1?window.scrollTo(I.options.scrollTo[0],I.options.scrollTo[1]):window.scrollTo(0,I.options.scrollTo))}else I.options.scrollRestoration&&I.options.scrollPos&&window.scrollTo(I.options.scrollPos[0],I.options.scrollPos[1]);this.state={numPendingSwitches:0,href:null,options:null}}},c.isSupported=jT(),c.isSupported())T$.exports=c;else{var S=l;for(var N in c.prototype)c.prototype.hasOwnProperty(N)&&typeof c.prototype[N]=="function"&&(S[N]=l);T$.exports=S}return T$.exports}var YT=XT();const qT=MT(YT),zT="[Theme]";function QT(){return document.documentElement.hasAttribute("data-debug")}function JT(_,...$){QT()&&console.error(zT,_,...$)}let He=null;const ZT=["/login","/logout","/password-reset","/signup"];function _a(_){He=_}function $a(_){return _.origin!==window.location.origin||_.protocol!==window.location.protocol?!0:ZT.some($=>_.pathname===$||_.pathname.startsWith(`${$}/`))}function s$(_){const $=new URL(_,window.location.origin);if($a($)||!He){window.location.assign($.toString());return}He.loadUrl(`${$.pathname}${$.search}${$.hash}`)}const Fn="halo-page-data",ea="/apis/api.content.halo.run/v1alpha1/posts?sort=spec.publishTime%2Cdesc&size=50";let v_=[],w_=null;function C_(_){return Array.isArray(_)?_:[]}function ta(_){switch(_){case"index":case"categories":case"category":case"tags":case"tag":case"post":return _;default:return"unknown"}}function Vn(_,$){const e=_[0],t=e?.status?.permalink,n=e?.spec?.slug??e?.metadata?.name;if(!t||!n)return $;const r=t.endsWith("/")?t.slice(0,-1):t;return r.endsWith(`/${n}`)?r.slice(0,r.length-n.length-1):$}function na(){const _=document.getElementById(Fn);if(!(_ instanceof HTMLScriptElement))return null;const $=_.textContent?.trim();if(!$)return null;try{return JSON.parse($)}catch(e){return console.error("[Theme] Failed to parse halo page data.",e),null}}function Me(_){return!_||!_.displayName&&!_.permalink&&!_.slug&&!_.title?null:_}function kn(){const _=na();if(!_){window.haloData=void 0;return}const $=ta(_.pageType);if($==="index"){const t=C_(_.currentPosts);t.length>0&&(v_=t)}const e={categories:C_(_.categories),currentCategory:Me(_.currentCategory),currentPost:Me(_.currentPost),currentPosts:C_(_.currentPosts),currentTag:Me(_.currentTag),homePosts:v_,nextPost:_.nextPost??null,pageType:$,pagination:_.pagination,prevPost:_.prevPost??null,tags:C_(_.tags),urls:{archives:"/archives",categories:Vn(C_(_.categories),"/categories"),home:"/",tags:Vn(C_(_.tags),"/tags")},user:typeof _.user=="string"?_.user:"guest"};return window.haloData=e,$!=="index"&&v_.length===0&&ia(),e}function ra(_){return _.map($=>({metadata:{creationTimestamp:$.metadata?.creationTimestamp??null,name:$.metadata?.name??null},spec:{owner:$.spec?.owner??null,publishTime:$.spec?.publishTime??null,slug:$.spec?.slug??null,title:$.spec?.title??null},status:{permalink:$.status?.permalink??null}}))}function ia(){return w_||(w_=(async()=>{try{const _=await fetch(ea);if(!_.ok)return;const e=(await _.json()).items;if(!Array.isArray(e)||e.length===0)return;v_=ra(e),window.haloData&&(window.haloData.homePosts=v_)}catch{}finally{w_=null}})(),w_)}function $_(_,$){const e=document.querySelector(_);e&&$&&(e.content=$)}function Ta(_,$){const e=document.querySelector(_);e&&$&&(e.href=$)}function Kn(_,$,e,t){const n=document.querySelector(_);if(!t){n?.remove();return}if(n){n.content=t;return}const r=document.createElement("meta");r.setAttribute($,e),r.content=t,document.head.appendChild(r)}function aa(){const _=document.getElementById(Fn);if(_ instanceof HTMLScriptElement)try{const $=JSON.parse(_.textContent?.trim()??"{}"),e=$.seo;if(!e)return;$_('meta[name="description"]',e.description),Ta('link[rel="canonical"]',e.canonical),$_('meta[property="og:title"]',e.title),$_('meta[property="og:description"]',e.description),$_('meta[property="og:url"]',e.canonical),$_('meta[property="og:site_name"]',e.siteTitle??e.title?.split(" - ").pop()??null),Kn('meta[property="og:image"]',"property","og:image",e.ogImage??null),$_('meta[property="og:type"]',$.pageType==="post"?"article":"website"),$_('meta[name="twitter:title"]',e.title),$_('meta[name="twitter:description"]',e.description),Kn('meta[name="twitter:image"]',"name","twitter:image",e.ogImage??null)}catch{}}function jn(){document.querySelectorAll('ul[data-type="taskList"] li[data-type="taskItem"]').forEach(_=>{const $=_.querySelector("label");!$||$.dataset.boundTaskList==="true"||($.dataset.boundTaskList="true",$.addEventListener("click",e=>{e.preventDefault();const t=$.closest('li[data-type="taskItem"]');if(!t)return;const n=t.getAttribute("data-checked")==="true";t.setAttribute("data-checked",n?"false":"true");const r=t.querySelector('input[type="checkbox"]');r&&(r.checked=!n)}))})}let Pe=null;function oa(){Pe=HT(".lozad",{loaded:_=>{_.classList.add("loaded")}}),Pe.observe()}function sa(){const _=new qT({analytics:!1,cacheBust:!1,elements:'a[href]:not([target="_blank"]):not([data-pjax="false"]):not([href^="javascript:"]):not([href^="/login"]):not([href^="/signup"]):not([href^="/password-reset"]):not([href^="/logout"])',scrollRestoration:!1,selectors:["title","#main"]});_a(_)}function La(){document.addEventListener("pjax:send",()=>{const _=document.getElementById("main");_&&_.classList.add("loading")}),document.addEventListener("pjax:complete",()=>{const _=document.getElementById("main");kn(),aa(),_&&(_.classList.remove("loading"),__.initTree(_),Pe?.observe(),_.scrollTo({top:0})),jn()}),document.addEventListener("pjax:error",()=>{JT("Pjax navigation failed.")})}function Ea(){kn(),window.Alpine=__,__.start(),oa(),sa(),La(),jn()}const la={FULL_WIDTH:0,FITTING:1,SMUSHING:2,CONTROLLED_SMUSHING:3};class Aa{constructor(){this.comment="",this.numChars=0,this.options={}}}const xe=["1Row","3-D","3D Diagonal","3D-ASCII","3x5","4Max","5 Line Oblique","AMC 3 Line","AMC 3 Liv1","AMC AAA01","AMC Neko","AMC Razor","AMC Razor2","AMC Slash","AMC Slider","AMC Thin","AMC Tubes","AMC Untitled","ANSI Compact","ANSI Regular","ANSI Shadow","ASCII 12","ASCII 9","ASCII New Roman","Acrobatic","Alligator","Alligator2","Alpha","Alphabet","Arrows","Avatar","B1FF","Babyface Lame","Babyface Leet","Banner","Banner3-D","Banner3","Banner4","Barbwire","Basic","Bear","Bell","Benjamin","Big ASCII 12","Big ASCII 9","Big Chief","Big Money-ne","Big Money-nw","Big Money-se","Big Money-sw","Big Mono 12","Big Mono 9","Big","Bigfig","Binary","Block","Blocks","Bloody","BlurVision ASCII","Bolger","Braced","Bright","Broadway KB","Broadway","Bubble","Bulbhead","Caligraphy","Caligraphy2","Calvin S","Cards","Catwalk","Chiseled","Chunky","Circle","Classy","Coder Mini","Coinstak","Cola","Colossal","Computer","Contessa","Contrast","Cosmike","Cosmike2","Crawford","Crawford2","Crazy","Cricket","Cursive","Cyberlarge","Cybermedium","Cybersmall","Cygnet","DANC4","DOS Rebel","DWhistled","Dancing Font","Decimal","Def Leppard","Delta Corps Priest 1","DiamFont","Diamond","Diet Cola","Digital","Doh","Doom","Dot Matrix","Double Shorts","Double","Dr Pepper","Efti Chess","Efti Font","Efti Italic","Efti Piti","Efti Robot","Efti Wall","Efti Water","Electronic","Elite","Emboss 2","Emboss","Epic","Fender","Filter","Fire Font-k","Fire Font-s","Flipped","Flower Power","Font Font","Four Tops","Fraktur","Fun Face","Fun Faces","Future Smooth","Future Thin","Future","Fuzzy","Georgi16","Georgia11","Ghost","Ghoulish","Glenyn","Goofy","Gothic","Graceful","Gradient","Graffiti","Greek","Heart Left","Heart Right","Henry 3D","Hex","Hieroglyphs","Hollywood","Horizontal Left","Horizontal Right","ICL-1900","Impossible","Invita","Isometric1","Isometric2","Isometric3","Isometric4","Italic","Ivrit","JS Block Letters","JS Bracket Letters","JS Capital Curves","JS Cursive","JS Stick Letters","Jacky","Jazmine","Jerusalem","Katakana","Kban","Keyboard","Knob","Konto Slant","Konto","LCD","Larry 3D 2","Larry 3D","Lean","Letter","Letters","Lil Devil","Line Blocks","Linux","Lockergnome","Madrid","Marquee","Maxfour","Merlin1","Merlin2","Mike","Mini","Mirror","Mnemonic","Modular","Mono 12","Mono 9","Morse","Morse2","Moscow","Mshebrew210","Muzzle","NScript","NT Greek","NV Script","Nancyj-Fancy","Nancyj-Improved","Nancyj-Underlined","Nancyj","Nipples","O8","OS2","Octal","Ogre","Old Banner","Pagga","Patorjk's Cheese","Patorjk-HeX","Pawp","Peaks Slant","Peaks","Pebbles","Pepper","Poison","Puffy","Puzzle","Pyramid","Rammstein","Rebel","Rectangles","Red Phoenix","Relief","Relief2","Reverse","Roman","Rot13","Rotated","Rounded","Rowan Cap","Rozzo","RubiFont","Runic","Runyc","S Blood","SL Script","Santa Clara","Script","Serifcap","Shaded Blocky","Shadow","Shimrod","Short","Slant Relief","Slant","Slide","Small ASCII 12","Small ASCII 9","Small Block","Small Braille","Small Caps","Small Isometric1","Small Keyboard","Small Mono 12","Small Mono 9","Small Poison","Small Script","Small Shadow","Small Slant","Small Tengwar","Small","Soft","Speed","Spliff","Stacey","Stampate","Stampatello","Standard","Star Strips","Star Wars","Stellar","Stforek","Stick Letters","Stop","Straight","Stronger Than All","Sub-Zero","Swamp Land","Swan","Sweet","THIS","Tanja","Tengwar","Term","Terrace","Test1","The Edge","Thick","Thin","Thorned","Three Point","Ticks Slant","Ticks","Tiles","Tinker-Toy","Tmplr","Tombstone","Train","Trek","Tsalagi","Tubular","Twisted","Two Point","USA Flag","Univers","Upside Down Text","Varsity","Wavescape","Wavy","Weird","Wet Letter","Whimsy","WideTerm","Wow","miniwi"],Xn={"ANSI-Compact":"ANSI Compact"},U_=_=>Xn[_]?Xn[_]:_;function Ia(_){return/[.*+?^${}()|[\]\\]/.test(_)?"\\"+_:_}const Yn=(()=>{const{FULL_WIDTH:_=0,FITTING:$,SMUSHING:e,CONTROLLED_SMUSHING:t}=la,n={},r={font:"Standard",fontPath:"./fonts",fetchFontIfMissing:!0};function i(E,A,a){const s=Ia(E.trim().slice(-1))||"@",u=A===a-1?new RegExp(s+s+"?\\s*$"):new RegExp(s+"\\s*$");return E.replace(u,"")}function T(E=-1,A=null){let a={},s,u=[[16384,"vLayout",e],[8192,"vLayout",$],[4096,"vRule5",!0],[2048,"vRule4",!0],[1024,"vRule3",!0],[512,"vRule2",!0],[256,"vRule1",!0],[128,"hLayout",e],[64,"hLayout",$],[32,"hRule6",!0],[16,"hRule5",!0],[8,"hRule4",!0],[4,"hRule3",!0],[2,"hRule2",!0],[1,"hRule1",!0]];s=A!==null?A:E;for(const[f,R,d]of u)s>=f?(s-=f,a[R]===void 0&&(a[R]=d)):R!=="vLayout"&&R!=="hLayout"&&(a[R]=!1);return typeof a.hLayout>"u"?E===0?a.hLayout=$:E===-1?a.hLayout=_:a.hRule1||a.hRule2||a.hRule3||a.hRule4||a.hRule5||a.hRule6?a.hLayout=t:a.hLayout=e:a.hLayout===e&&(a.hRule1||a.hRule2||a.hRule3||a.hRule4||a.hRule5||a.hRule6)&&(a.hLayout=t),typeof a.vLayout>"u"?a.vRule1||a.vRule2||a.vRule3||a.vRule4||a.vRule5?a.vLayout=t:a.vLayout=_:a.vLayout===e&&(a.vRule1||a.vRule2||a.vRule3||a.vRule4||a.vRule5)&&(a.vLayout=t),a}function o(E,A,a=""){return E===A&&E!==a?E:!1}function L(E,A){let a="|/\\[]{}()<>";if(E==="_"){if(a.indexOf(A)!==-1)return A}else if(A==="_"&&a.indexOf(E)!==-1)return E;return!1}function l(E,A){let a="| /\\ [] {} () <>",s=a.indexOf(E),u=a.indexOf(A);if(s!==-1&&u!==-1&&s!==u&&Math.abs(s-u)!==1){const f=Math.max(s,u),R=f+1;return a.substring(f,R)}return!1}function c(E,A){let a="[] {} ()",s=a.indexOf(E),u=a.indexOf(A);return s!==-1&&u!==-1&&Math.abs(s-u)<=1?"|":!1}function S(E,A){return{"/\\":"|","\\/":"Y","><":"X"}[E+A]||!1}function N(E,A,a=""){return E===a&&A===a?a:!1}function C(E,A){return E===A?E:!1}function I(E,A){return L(E,A)}function g(E,A){return l(E,A)}function P(E,A){return E==="-"&&A==="_"||E==="_"&&A==="-"?"=":!1}function w(E,A){return E==="|"&&A==="|"?"|":!1}function W(E,A,a){return A===" "||A===""||A===a&&E!==" "?E:A}function e_(E,A,a){if(a.fittingRules&&a.fittingRules.vLayout===_)return"invalid";let s,u=Math.min(E.length,A.length),f,R,d=!1,h;if(u===0)return"invalid";for(s=0;s<u;s++)if(f=E.substring(s,s+1),R=A.substring(s,s+1),f!==" "&&R!==" "){if(a.fittingRules&&a.fittingRules.vLayout===$)return"invalid";if(a.fittingRules&&a.fittingRules.vLayout===e)return"end";if(w(f,R)){d=d||!1;continue}if(h=!1,h=a.fittingRules&&a.fittingRules.vRule1?C(f,R):h,h=!h&&a.fittingRules&&a.fittingRules.vRule2?I(f,R):h,h=!h&&a.fittingRules&&a.fittingRules.vRule3?g(f,R):h,h=!h&&a.fittingRules&&a.fittingRules.vRule4?P(f,R):h,d=!0,!h)return"invalid"}return d?"end":"valid"}function t_(E,A,a){let s=E.length,u=E.length,f,R,d,h=1,p,O,m;for(;h<=s;){for(f=E.slice(Math.max(0,u-h),u),R=A.slice(0,Math.min(s,h)),d=R.length,m="",p=0;p<d;p++)if(O=e_(f[p],R[p],a),O==="end")m=O;else if(O==="invalid"){m=O;break}else m===""&&(m="valid");if(m==="invalid"){h--;break}if(m==="end")break;m==="valid"&&h++}return Math.min(s,h)}function ro(E,A,a){let s,u=Math.min(E.length,A.length),f,R,d="",h;const p=a.fittingRules||{};for(s=0;s<u;s++)f=E.substring(s,s+1),R=A.substring(s,s+1),f!==" "&&R!==" "?p.vLayout===$||p.vLayout===e?d+=W(f,R):(h=!1,h=p.vRule5?w(f,R):h,h=!h&&p.vRule1?C(f,R):h,h=!h&&p.vRule2?I(f,R):h,h=!h&&p.vRule3?g(f,R):h,h=!h&&p.vRule4?P(f,R):h,d+=h):d+=W(f,R);return d}function io(E,A,a,s){let u=E.length,f=A.length,R=E.slice(0,Math.max(0,u-a)),d=E.slice(Math.max(0,u-a),u),h=A.slice(0,Math.min(a,f)),p,O,m,H=[],M;for(O=d.length,p=0;p<O;p++)p>=f?m=d[p]:m=ro(d[p],h[p],s),H.push(m);return M=A.slice(Math.min(a,f),f),[...R,...H,...M]}function $r(E,A){const a=" ".repeat(A);return E.map(s=>s+a)}function To(E,A,a){let s=E[0].length,u=A[0].length,f;return s>u?A=$r(A,s-u):u>s&&(E=$r(E,u-s)),f=t_(E,A,a),io(E,A,f,a)}function ao(E,A,a){const s=a.fittingRules||{};if(s.hLayout===_)return 0;let u,f=E.length,R=A.length,d=f,h=1,p=!1,O,m,H,M;if(f===0)return 0;_:for(;h<=d;){const k=f-h;for(O=E.substring(k,k+h),m=A.substring(0,Math.min(h,R)),u=0;u<Math.min(h,R);u++)if(H=O.substring(u,u+1),M=m.substring(u,u+1),H!==" "&&M!==" "){if(s.hLayout===$){h=h-1;break _}else if(s.hLayout===e){(H===a.hardBlank||M===a.hardBlank)&&(h=h-1);break _}else if(p=!0,!(s.hRule1&&o(H,M,a.hardBlank)||s.hRule2&&L(H,M)||s.hRule3&&l(H,M)||s.hRule4&&c(H,M)||s.hRule5&&S(H,M)||s.hRule6&&N(H,M,a.hardBlank))){h=h-1;break _}}if(p)break;h++}return Math.min(d,h)}function Be(E,A,a,s){let u,f,R=[],d,h,p,O,m,H,M,k;const U=s.fittingRules||{};if(typeof s.height!="number")throw new Error("height is not defined.");for(u=0;u<s.height;u++){M=E[u],k=A[u],m=M.length,H=k.length,d=m-a,h=M.slice(0,Math.max(0,d)),p="";const F_=Math.max(0,m-a);let K=M.substring(F_,F_+a),A_=k.substring(0,Math.min(a,H));for(f=0;f<a;f++){let B=f<m?K.substring(f,f+1):" ",G=f<H?A_.substring(f,f+1):" ";if(B!==" "&&G!==" ")if(U.hLayout===$||U.hLayout===e)p+=W(B,G,s.hardBlank);else{const lo=U.hRule1&&o(B,G,s.hardBlank)||U.hRule2&&L(B,G)||U.hRule3&&l(B,G)||U.hRule4&&c(B,G)||U.hRule5&&S(B,G)||U.hRule6&&N(B,G,s.hardBlank)||W(B,G,s.hardBlank);p+=lo}else p+=W(B,G,s.hardBlank)}a>=H?O="":O=k.substring(a,a+Math.max(0,H-a)),R[u]=h+p+O}return R}function p_(E){return new Array(E).fill("")}const B_=function(E){return Math.max(...E.map(A=>A.length))};function g_(E,A,a){return E.reduce(function(s,u){return Be(s,u.fig,u.overlap||0,a)},p_(A))}function oo(E,A,a){for(let s=E.length-1;s>0;s--){const u=g_(E.slice(0,s),A,a);if(B_(u)<=a.width)return{outputFigText:u,chars:E.slice(s)}}return{outputFigText:p_(A),chars:E}}function so(E,A,a){let s,u,f=0,R,d,h,p=a.height,O=[],m,H={chars:[],overlap:f},M=[],k,U,F_,K,A_;if(typeof p!="number")throw new Error("height is not defined.");d=p_(p);const B=a.fittingRules||{};for(a.printDirection===1&&(E=E.split("").reverse().join("")),h=E.length,s=0;s<h;s++)if(k=E.substring(s,s+1),U=k.match(/\s/),u=A[k.charCodeAt(0)],K=null,u){if(B.hLayout!==_){for(f=1e4,R=0;R<p;R++)f=Math.min(f,ao(d[R],u[R],a));f=f===1e4?0:f}if(a.width>0&&(a.whitespaceBreak?(F_=g_(H.chars.concat([{fig:u,overlap:f}]),p,a),K=g_(M.concat([{fig:F_,overlap:H.overlap}]),p,a),m=B_(K)):(K=Be(d,u,f,a),m=B_(K)),m>=a.width&&s>0&&(a.whitespaceBreak?(d=g_(M.slice(0,-1),p,a),M.length>1&&(O.push(d),d=p_(p)),M=[]):(O.push(d),d=p_(p)))),a.width>0&&a.whitespaceBreak&&((!U||s===h-1)&&H.chars.push({fig:u,overlap:f}),U||s===h-1)){for(A_=null;K=g_(H.chars,p,a),m=B_(K),m>=a.width;)A_=oo(H.chars,p,a),H={chars:A_.chars},O.push(A_.outputFigText);m>0&&(A_?M.push({fig:K,overlap:1}):M.push({fig:K,overlap:H.overlap})),U&&(M.push({fig:u,overlap:f}),d=p_(p)),s===h-1&&(d=g_(M,p,a)),H={chars:[],overlap:f};continue}d=Be(d,u,f,a)}return B_(d)>0&&O.push(d),a.showHardBlanks||O.forEach(function(G){for(h=G.length,R=0;R<h;R++)G[R]=G[R].replace(new RegExp("\\"+a.hardBlank,"g")," ")}),E===""&&O.length===0&&O.push(new Array(p).fill("")),O}const Lo=function(E,A){let a;const s=A.fittingRules||{};if(E==="default")a={hLayout:s.hLayout,hRule1:s.hRule1,hRule2:s.hRule2,hRule3:s.hRule3,hRule4:s.hRule4,hRule5:s.hRule5,hRule6:s.hRule6};else if(E==="full")a={hLayout:_,hRule1:!1,hRule2:!1,hRule3:!1,hRule4:!1,hRule5:!1,hRule6:!1};else if(E==="fitted")a={hLayout:$,hRule1:!1,hRule2:!1,hRule3:!1,hRule4:!1,hRule5:!1,hRule6:!1};else if(E==="controlled smushing")a={hLayout:t,hRule1:!0,hRule2:!0,hRule3:!0,hRule4:!0,hRule5:!0,hRule6:!0};else if(E==="universal smushing")a={hLayout:e,hRule1:!1,hRule2:!1,hRule3:!1,hRule4:!1,hRule5:!1,hRule6:!1};else return;return a},Eo=function(E,A){let a={};const s=A.fittingRules||{};if(E==="default")a={vLayout:s.vLayout,vRule1:s.vRule1,vRule2:s.vRule2,vRule3:s.vRule3,vRule4:s.vRule4,vRule5:s.vRule5};else if(E==="full")a={vLayout:_,vRule1:!1,vRule2:!1,vRule3:!1,vRule4:!1,vRule5:!1};else if(E==="fitted")a={vLayout:$,vRule1:!1,vRule2:!1,vRule3:!1,vRule4:!1,vRule5:!1};else if(E==="controlled smushing")a={vLayout:t,vRule1:!0,vRule2:!0,vRule3:!0,vRule4:!0,vRule5:!0};else if(E==="universal smushing")a={vLayout:e,vRule1:!1,vRule2:!1,vRule3:!1,vRule4:!1,vRule5:!1};else return;return a},er=function(E,A,a){a=a.replace(/\r\n/g,`
`).replace(/\r/g,`
`);const s=U_(E);let u=a.split(`
`),f=[],R,d,h;for(d=u.length,R=0;R<d;R++)f=f.concat(so(u[R],n[s],A));for(d=f.length,h=f[0],R=1;R<d;R++)h=To(h,f[R],A);return h?h.join(`
`):""};function tr(E,A){let a;if(typeof structuredClone<"u"?a=structuredClone(E):a=JSON.parse(JSON.stringify(E)),a.showHardBlanks=A.showHardBlanks||!1,a.width=A.width||-1,a.whitespaceBreak=A.whitespaceBreak||!1,A.horizontalLayout){const s=Lo(A.horizontalLayout,E);s&&Object.assign(a.fittingRules,s)}if(A.verticalLayout){const s=Eo(A.verticalLayout,E);s&&Object.assign(a.fittingRules,s)}return a.printDirection=A.printDirection!==null&&A.printDirection!==void 0?A.printDirection:E.printDirection,a}const b=async function(E,A,a){return b.text(E,A,a)};return b.text=async function(E,A,a){E=E+"";let s,u;typeof A=="function"?(u=A,s={font:r.font}):typeof A=="string"?(s={font:A},u=a):A?(s=A,u=a):(s={font:r.font},u=a);const f=s.font||r.font;try{const R=await b.loadFont(f),d=R?er(f,tr(R,s),E):"";return u&&u(null,d),d}catch(R){const d=R instanceof Error?R:new Error(String(R));if(u)return u(d),"";throw d}},b.textSync=function(E,A){E=E+"",typeof A=="string"?A={font:A}:A=A||{};const a=A.font||r.font;let s=tr(b.loadFontSync(a),A);return er(a,s,E)},b.metadata=async function(E,A){E=E+"";try{const a=await b.loadFont(E);if(!a)throw new Error("Error loading font.");const s=U_(E),u=n[s]||{},f=[a,u.comment||""];return A&&A(null,a,u.comment),f}catch(a){const s=a instanceof Error?a:new Error(String(a));if(A)return A(s),null;throw s}},b.defaults=function(E){return E&&typeof E=="object"&&Object.assign(r,E),typeof structuredClone<"u"?structuredClone(r):JSON.parse(JSON.stringify(r))},b.parseFont=function(E,A,a=!0){if(n[E]&&!a)return n[E].options;A=A.replace(/\r\n/g,`
`).replace(/\r/g,`
`);const s=new Aa,u=A.split(`
`),f=u.shift();if(!f)throw new Error("Invalid font file: missing header");const R=f.split(" "),d={hardBlank:R[0].substring(5,6),height:parseInt(R[1],10),baseline:parseInt(R[2],10),maxLength:parseInt(R[3],10),oldLayout:parseInt(R[4],10),numCommentLines:parseInt(R[5],10),printDirection:R[6]?parseInt(R[6],10):0,fullLayout:R[7]?parseInt(R[7],10):null,codeTagCount:R[8]?parseInt(R[8],10):null};if((d.hardBlank||"").length!==1||[d.height,d.baseline,d.maxLength,d.oldLayout,d.numCommentLines].some(O=>O==null||isNaN(O)))throw new Error("FIGlet header contains invalid values.");if(d.height==null||d.numCommentLines==null)throw new Error("FIGlet header contains invalid values.");d.fittingRules=T(d.oldLayout,d.fullLayout),s.options=d;const p=[];for(let O=32;O<=126;O++)p.push(O);if(p.push(196,214,220,228,246,252,223),u.length<d.numCommentLines+d.height*p.length)throw new Error(`FIGlet file is missing data. Line length: ${u.length}. Comment lines: ${d.numCommentLines}. Height: ${d.height}. Num chars: ${p.length}.`);for(s.comment=u.splice(0,d.numCommentLines).join(`
`),s.numChars=0;u.length>0&&s.numChars<p.length;){const O=p[s.numChars];s[O]=u.splice(0,d.height);for(let m=0;m<d.height;m++)typeof s[O][m]>"u"?s[O][m]="":s[O][m]=i(s[O][m],m,d.height);s.numChars++}for(;u.length>0;){const O=u.shift();if(!O||O.trim()==="")break;let m=O.split(" ")[0],H;if(/^-?0[xX][0-9a-fA-F]+$/.test(m))H=parseInt(m,16);else if(/^-?0[0-7]+$/.test(m))H=parseInt(m,8);else if(/^-?[0-9]+$/.test(m))H=parseInt(m,10);else throw new Error(`Error parsing data. Invalid data: ${m}`);if(H===-1||H<-2147483648||H>2147483647){const M=H===-1?"The char code -1 is not permitted.":`The char code cannot be ${H<-2147483648?"less than -2147483648":"greater than 2147483647"}.`;throw new Error(`Error parsing data. ${M}`)}s[H]=u.splice(0,d.height);for(let M=0;M<d.height;M++)typeof s[H][M]>"u"?s[H][M]="":s[H][M]=i(s[H][M],M,d.height);s.numChars++}return n[E]=s,d},b.loadedFonts=()=>Object.keys(n),b.clearLoadedFonts=()=>{Object.keys(n).forEach(E=>{delete n[E]})},b.loadFont=async function(E,A){const a=U_(E);if(n[a]){const s=n[a].options;return A&&A(null,s),Promise.resolve(s)}try{if(!r.fetchFontIfMissing)throw new Error(`Font is not loaded: ${a}`);const s=await fetch(`${r.fontPath}/${a}.flf`);if(!s.ok)throw new Error(`Network response was not ok: ${s.status}`);const u=await s.text(),f=b.parseFont(a,u);return A&&A(null,f),f}catch(s){const u=s instanceof Error?s:new Error(String(s));if(A)return A(u),null;throw u}},b.loadFontSync=function(E){const A=U_(E);if(n[A])return n[A].options;throw new Error("Synchronous font loading is not implemented for the browser, it will only work for fonts already loaded.")},b.preloadFonts=async function(E,A){try{for(const a of E){const s=U_(a),u=await fetch(`${r.fontPath}/${s}.flf`);if(!u.ok)throw new Error(`Failed to preload fonts. Error fetching font: ${s}, status code: ${u.statusText}`);const f=await u.text();b.parseFont(s,f)}A&&A()}catch(a){const s=a instanceof Error?a:new Error(String(a));if(A){A(s);return}throw a}},b.fonts=function(E){return new Promise(function(A,a){A(xe),E&&E(null,xe)})},b.fontsSync=function(){return xe},b.figFonts=n,b})();let qn=!1,L$=null;function ua(){return qn?Promise.resolve():L$||(L$=(async()=>{const[{default:_},{default:$},{default:e},{default:t},{default:n},{default:r},{default:i},{default:T},{default:o},{default:L},{default:l},{default:c}]=await Promise.all([Promise.resolve().then(()=>Xa),Promise.resolve().then(()=>Ya),Promise.resolve().then(()=>qa),Promise.resolve().then(()=>za),Promise.resolve().then(()=>Qa),Promise.resolve().then(()=>Ja),Promise.resolve().then(()=>Za),Promise.resolve().then(()=>_o),Promise.resolve().then(()=>$o),Promise.resolve().then(()=>eo),Promise.resolve().then(()=>to),Promise.resolve().then(()=>no)]);[["Standard",c],["Banner",_],["Big",$],["Block",e],["Doom",t],["Lean",n],["Mini",r],["Script",i],["Shadow",T],["Slant",o],["Small",L],["Speed",l]].forEach(([N,C])=>{Yn.parseFont(N,C)}),qn=!0})(),L$)}function ca(){__.data("asciiTitle",(_="",$="Standard")=>({asciiArt:"",font:$,async init(){this.title&&(await ua(),Yn.text(this.title,{font:this.font||"Standard",horizontalLayout:"default",verticalLayout:"default"},(e,t)=>{!e&&t&&(this.asciiArt=t)}))},title:_}))}function fa(){__.data("fileListNav",()=>({focusInHandler:null,items:[],keydownHandler:null,pjaxSendHandler:null,selectedIndex:-1,bindListeners(){this.keydownHandler=_=>this.handleKeydown(_),this.focusInHandler=_=>this.handleFocusIn(_),window.addEventListener("keydown",this.keydownHandler),window.addEventListener("focusin",this.focusInHandler)},destroy(){this.unbindListeners(),this.pjaxSendHandler&&(document.removeEventListener("pjax:send",this.pjaxSendHandler),this.pjaxSendHandler=null)},handleFocusIn(_){const $=_.target;$&&($.tagName==="INPUT"||$.tagName==="TEXTAREA")&&(this.selectedIndex=-1)},handleKeydown(_){const $=_.target;if(!$||$.tagName==="INPUT"||$.tagName==="TEXTAREA"||this.items.length===0)return;if(_.key==="ArrowDown"){_.preventDefault(),this.selectedIndex=(this.selectedIndex+1)%this.items.length,this.scrollToSelected();return}if(_.key==="ArrowUp"){_.preventDefault(),this.selectedIndex=(this.selectedIndex-1+this.items.length)%this.items.length,this.scrollToSelected();return}if(_.key!=="Enter"||(_.preventDefault(),this.selectedIndex<0||this.selectedIndex>=this.items.length))return;const e=this.items[this.selectedIndex],t=e instanceof HTMLAnchorElement?e:e.querySelector("a");t?.href&&s$(t.href)},init(){this.items=Array.from(this.$el.querySelectorAll("[data-nav-item]")),this.items.length>0&&(this.selectedIndex=0),this.bindListeners(),this.pjaxSendHandler=()=>this.unbindListeners(),document.addEventListener("pjax:send",this.pjaxSendHandler)},scrollToSelected(){const _=this.items[this.selectedIndex];_&&_.scrollIntoView({behavior:"smooth",block:"nearest"})},unbindListeners(){this.keydownHandler&&(window.removeEventListener("keydown",this.keydownHandler),this.keydownHandler=null),this.focusInHandler&&(window.removeEventListener("focusin",this.focusInHandler),this.focusInHandler=null)}}))}const Ra=".terminal-content",da="h2, h3";function zn(){return document.getElementById("main")}function ye(){return window.matchMedia("(prefers-reduced-motion: reduce)").matches?"auto":"smooth"}function ha(_,$){return`toc-${_.trim().toLowerCase().replace(/[^\p{L}\p{N}]+/gu,"-").replace(/^-+|-+$/g,"")||"section"}-${$+1}`}function We(){const _=document.querySelector(Ra);return _?Array.from(_.querySelectorAll(da)).map(($,e)=>{const t=$.textContent?.trim()??"";return t?($.id||($.id=ha(t,e)),{id:$.id,level:Number($.tagName.slice(1)),text:t}):null}).filter($=>$!==null):[]}function Sa(_=We()){return window.haloData?.pageType!=="post"?"toc: only available on post pages":_.length===0?"toc: no headings found in this article":_.map(($,e)=>{const t=$.level>2?"  ":"";return`${String(e+1).padStart(2,"0")}. ${t}${$.text}`}).join(`
`)}function Na(_){if(window.haloData?.pageType!=="post")return"jump: only available on post pages";const e=We()[_-1];return e?(document.getElementById(e.id)?.scrollIntoView({behavior:ye(),block:"start"}),null):`jump: heading ${_} not found`}function Ca(){zn()?.scrollTo({behavior:ye(),top:0})}function pa(){const _=zn();_?.scrollTo({behavior:ye(),top:_.scrollHeight})}async function ma(){if(window.haloData?.pageType!=="post")return"copy: only available on post pages";const _=window.haloData.currentPost?.permalink??window.location.href;try{return await navigator.clipboard.writeText(_),"Copied current article link."}catch{return`Copy unavailable. Link: ${_}`}}function Oa(){__.data("postViewer",()=>({keydownHandler:null,pjaxSendHandler:null,readingProgress:0,scrollHandler:null,tocItems:[],destroy(){this.unbindListeners(),this.pjaxSendHandler&&(document.removeEventListener("pjax:send",this.pjaxSendHandler),this.pjaxSendHandler=null)},get scrollBehavior(){return window.matchMedia("(prefers-reduced-motion: reduce)").matches?"auto":"smooth"},handleKeydown(_){const $=_.target;if(!$||$.tagName==="INPUT"||$.tagName==="TEXTAREA")return;const e=document.getElementById("main");if(e)switch(_.key){case"ArrowDown":case"j":_.preventDefault(),e.scrollBy({behavior:this.scrollBehavior,top:this.scrollAmount});break;case"ArrowUp":case"k":_.preventDefault(),e.scrollBy({behavior:this.scrollBehavior,top:-this.scrollAmount});break;case" ":case"PageDown":_.preventDefault(),e.scrollBy({behavior:this.scrollBehavior,top:e.clientHeight*.8});break;case"End":_.preventDefault(),e.scrollTo({behavior:this.scrollBehavior,top:e.scrollHeight});break;case"Home":_.preventDefault(),e.scrollTo({behavior:this.scrollBehavior,top:0});break;case"PageUp":_.preventDefault(),e.scrollBy({behavior:this.scrollBehavior,top:-e.clientHeight*.8});break}},init(){this.refreshToc(),this.updateReadingProgress(),this.keydownHandler=$=>this.handleKeydown($),window.addEventListener("keydown",this.keydownHandler);const _=document.getElementById("main");this.scrollHandler=()=>this.updateReadingProgress(),_?.addEventListener("scroll",this.scrollHandler,{passive:!0}),this.pjaxSendHandler=()=>this.unbindListeners(),document.addEventListener("pjax:send",this.pjaxSendHandler)},jumpToHeading(_){document.getElementById(_)?.scrollIntoView({behavior:this.scrollBehavior,block:"start"})},refreshToc(){this.tocItems=We()},scrollAmount:100,unbindListeners(){this.keydownHandler&&(window.removeEventListener("keydown",this.keydownHandler),this.keydownHandler=null),this.scrollHandler&&(document.getElementById("main")?.removeEventListener("scroll",this.scrollHandler),this.scrollHandler=null)},updateReadingProgress(){const _=document.getElementById("main");if(!_){this.readingProgress=0;return}const $=_.scrollHeight-_.clientHeight;this.readingProgress=$>0?Math.min(100,Math.max(0,Math.round(_.scrollTop/$*100))):100}}))}function De(_){return _.spec?.displayName||_.spec?.slug||_.metadata?.name||"unknown"}function E$(_){return _.spec?.slug||_.metadata?.name||De(_)}function Qn(_){return _.spec?.title||_.spec?.slug||_.metadata?.name||"untitled"}function Ha(_){return _.spec?.slug||_.metadata?.name||Qn(_)}function Ma(_){return(_||"unknown").replaceAll("/","-")}function G_(_){return Ma(_?.slug||_?.title||_?.displayName||"unknown")}function Pa(){return window.haloData?.user||"user"}function be(_){return _.map($=>({date:$.spec?.publishTime||$.metadata?.creationTimestamp||null,name:Qn($),permalink:$.status?.permalink||null,slug:Ha($),type:"file"}))}function ve(_){if(_==="~/blog")return[{count:window.haloData?.categories.length||0,name:"categories",type:"dir"},{count:window.haloData?.tags.length||0,name:"tags",type:"dir"},...be(window.haloData?.homePosts||[])];if(_==="~/blog/categories")return(window.haloData?.categories||[]).map($=>({count:$.postCount||0,date:$.metadata?.creationTimestamp||null,name:De($),permalink:$.status?.permalink||null,slug:E$($),type:"dir"}));if(_==="~/blog/tags")return(window.haloData?.tags||[]).map($=>({count:$.postCount||0,date:$.metadata?.creationTimestamp||null,name:De($),permalink:$.status?.permalink||null,slug:E$($),type:"dir"}));if(_.startsWith("~/blog/categories/")){const $=_.slice(18),e=G_(window.haloData?.currentCategory);return window.haloData?.pageType==="category"&&e===$?be(window.haloData.currentPosts):null}if(_.startsWith("~/blog/tags/")){const $=_.slice(12),e=G_(window.haloData?.currentTag);return window.haloData?.pageType==="tag"&&e===$?be(window.haloData.currentPosts):null}return null}function Jn(_){let $=_;$==="~"?$="~/blog":$.startsWith("~/")&&!$.startsWith("~/blog")&&($=`~/blog${$.slice(1)}`),$.startsWith("~/blog")||($=$.startsWith("/")?`~/blog${$}`:`~/blog/${$}`);const e=[];return $.split("/").forEach(t=>{if(!(!t||t===".")){if(t===".."){e.length>2&&e.pop();return}e.push(t)}}),e.length<2?"~/blog":e.join("/")}function we(_,$){if(_.startsWith("/")||_.startsWith("~"))return Jn(_);const e=$.endsWith("/")?$:`${$}/`;return Jn(`${e}${_}`)}function xa(_){if(_==="~/blog")return"~/blog";const $=_.split("/");return $.pop(),$.length<2?"~/blog":$.join("/")}function Ue(_){if(_==="~/blog")return window.haloData?.urls.home||"/";if(_==="~/blog/categories")return window.haloData?.urls.categories||"/categories";if(_==="~/blog/tags")return window.haloData?.urls.tags||"/tags";if(_.startsWith("~/blog/categories/")){const $=_.slice(18);return(window.haloData?.categories||[]).find(t=>E$(t)===$)?.status?.permalink||null}if(_.startsWith("~/blog/tags/")){const $=_.slice(12);return(window.haloData?.tags||[]).find(t=>E$(t)===$)?.status?.permalink||null}return null}function Ge(){switch(window.haloData?.pageType){case"categories":return"~/blog/categories";case"category":return`~/blog/categories/${G_(window.haloData.currentCategory)}`;case"post":return`~/blog/${G_(window.haloData.currentPost)}`;case"tag":return`~/blog/tags/${G_(window.haloData.currentTag)}`;case"tags":return"~/blog/tags";default:return"~/blog"}}const ya=["cd","ls","ll","pd","pu","npage","ppage","back","help","clear","search"],Wa=["cd","next","prev","back","help","clear"],Da=new Set(["help","clear","back","next","prev","pd","pu","npage","ppage","ls","ll"]),ba=new Set(["cd","ls","ll"]);function va(_,$,e){const t=_.toLowerCase();if(!_.includes(" "))return(e?Wa:ya).filter(I=>I.startsWith(t)).map(I=>Da.has(I)?I:`${I} `);const n=_.indexOf(" "),r=_.slice(0,n).toLowerCase(),i=_.slice(n+1);if(!ba.has(r))return[];const T=i.lastIndexOf("/"),o=T>=0?i.slice(0,T+1):"",l=(T>=0?i.slice(T+1):i).toLowerCase(),c=o?we(o,$):$,S=ve(c);if(!S)return[];const N=[];return S.forEach(C=>{if(!C.name.toLowerCase().startsWith(l))return;const I=C.type==="dir"?"/":"";N.push(`${r} ${o}${C.name}${I}`)}),!o&&"..".startsWith(l)&&N.push(`${r} ../`),!o&&"~".startsWith(l)&&N.push(`${r} ~/`),N}const wa=`
List Page Commands:
  ls            - List directory contents
  cd <path>     - Navigate to path
  pd / npage    - Next page
  pu / ppage    - Previous page
  back          - Browser back
  help          - Show this help
  clear         - Clear output
  top           - Scroll to top
  bottom        - Scroll to bottom
  search        - Open search

Navigation:
  ↑/↓           - Command history
  Tab           - Auto-complete
  Enter         - Execute
`.trim(),Ua=`
Post Page Commands:
  cd ..         - Go back to list
  next          - Next article
  prev          - Previous article
  back          - Browser back
  toc           - Show article table of contents
  jump <n>      - Jump to TOC item number
  top           - Scroll to top
  bottom        - Scroll to bottom
  copy          - Copy article link
  help          - Show this help
  clear         - Clear output

Navigation:
  ↑/↓           - Command history
  Tab           - Auto-complete
  Enter         - Execute
`.trim();function Ga(_,$){if(!_||_===".")return{};if(_===".."||_==="../"){const i=xa($),T=Ue(i);return T?{navigate:T}:{newPath:i}}const e=we(_,$),t=ve(e);if(!t){const i=Ue(e);return i?{navigate:i}:{output:`cd: no such file or directory: ${_}`}}const n=t.find(i=>i.type==="file"&&i.name===_.split("/").pop());if(n?.permalink)return{navigate:n.permalink};const r=Ue(e);return r?{navigate:r}:{newPath:e}}function Zn(_,$){const e=_?we(_,$):$,t=ve(e);if(!t)return`ls: cannot access '${e}': No such file or directory`;if(t.length===0)return"(empty directory)";const n=t.map(r=>{const i=r.type==="dir"?"drwxr-xr-x":"-rw-r--r--",T=r.type==="dir"?"-":"4.0K",o=r.date??"Mar 30 12:00",L=r.type==="dir"?"/":"";return`${i}  ${T} ${Pa()}  staff  ${o}  ${r.name}${L}`});return`Total ${t.length}
${n.join(`
`)}`}function _r(_){const $=_==="next"?window.haloData?.nextPost:window.haloData?.prevPost;return $?(s$($),{}):{output:_==="next"?"No next article available.":"No previous article available."}}function l$(_){const $=window.haloData?.pagination;if(!$)return{output:"Pagination not available on this page."};const e=_?$.nextUrl:$.prevUrl;return e?(s$(e),{}):{output:_?"Already at the last page.":"Already at the first page."}}function Ba(_){const $=window.SearchWidget;return typeof $<"u"&&$&&typeof $.open=="function"?($.open(),_?{output:`Search widget opened. Type keyword in the search box: ${_}`}:{}):{output:"SearchWidget is not loaded. Please install and enable the official Halo search widget plugin."}}function Fa(_){const $=Number.parseInt(_,10);if(!Number.isFinite($)||$<1)return{output:"jump: usage: jump <number>"};const e=Na($);return e?{output:e}:{}}const Va=new Map([["back",()=>(window.history.back(),{})],["cd",(_,$)=>Ga(_,$)],["clear",()=>({})],["bottom",()=>(pa(),{})],["copy",async()=>({output:await ma()})],["help",()=>({showHelp:!0})],["jump",_=>Fa(_)],["ll",(_,$)=>({output:Zn(_,$)})],["ls",(_,$)=>({output:Zn(_,$)})],["next",()=>_r("next")],["npage",()=>l$(!0)],["pd",()=>l$(!0)],["ppage",()=>l$(!1)],["prev",()=>_r("prev")],["pu",()=>l$(!1)],["search",_=>Ba(_)],["toc",()=>({output:Sa()})],["top",()=>(Ca(),{})]]);async function ka(_,$,e){const t=Va.get(_.toLowerCase());return t?t($,e):{output:`bash: ${_}: command not found. Type 'help' for available commands.`}}function Ka(){__.data("terminalInput",(_="~/blog")=>({command:"",completionState:{candidates:[],index:0},currentPath:_,history:[],historyIndex:-1,output:"",showHelp:!1,autoComplete(){const $=this.command,e=this.completionState.candidates[this.completionState.index];this.completionState.candidates.length>0&&$===e?this.completionState.index=(this.completionState.index+1)%this.completionState.candidates.length:(this.completionState.candidates=va($,String(this.currentPath),this.isPostPage()),this.completionState.index=0),this.completionState.candidates.length>0&&(this.command=this.completionState.candidates[this.completionState.index])},async executeCommand(){const $=this.command.trim();if(!$)return;this.history[this.history.length-1]!==$&&this.history.push($),this.historyIndex=this.history.length;const[e,...t]=$.split(/\s+/),n=t.join(" ");this.showHelp=!1,this.output="",(e.toLowerCase()==="ls"||e.toLowerCase()==="ll")&&(this.output="Loading...",await new Promise(i=>window.setTimeout(i,50)));const r=await ka(e,n,String(this.currentPath));this.applyResult(r),this.command=""},applyResult($){$.navigate?s$($.navigate):$.newPath?(this.currentPath=$.newPath,this.output=""):$.showHelp?this.showHelp=!0:$.output&&(this.output=$.output)},get helpText(){return this.isPostPage()?Ua:wa},handleKeydown($){if(!$.isComposing)switch($.key){case"ArrowDown":$.preventDefault(),this.navigateHistory(1);break;case"ArrowUp":$.preventDefault(),this.navigateHistory(-1);break;case"Enter":$.preventDefault(),this.executeCommand();break;case"Escape":$.preventDefault(),this.command="",this.output="",this.showHelp=!1,this.$refs.cmdInput?.blur();break;case"Tab":$.preventDefault(),this.autoComplete();break}},init(){this.currentPath=Ge(),document.addEventListener("pjax:complete",()=>{this.currentPath=Ge()}),window.addEventListener("popstate",()=>{this.currentPath=Ge()}),this.$nextTick(()=>{this.$refs.cmdInput?.focus()})},isPostPage(){return window.haloData?.pageType==="post"},navigateHistory($){if(this.history.length!==0){if(this.historyIndex+=$,this.historyIndex<0&&(this.historyIndex=0),this.historyIndex>=this.history.length){this.historyIndex=this.history.length,this.command="";return}this.command=this.history[this.historyIndex]}}}))}function ja(){__.data("typewriter",(_="",$=50)=>({_timerId:null,destroy(){this._timerId!==null&&(window.clearInterval(this._timerId),this._timerId=null)},display:"",init(){let e=0;this.display="";const t=typeof $=="number"?$:50;this._timerId=window.setInterval(()=>{if(e<this.text.length){this.display+=this.text.charAt(e),e+=1;return}this._timerId!==null&&(window.clearInterval(this._timerId),this._timerId=null)},t)},text:_}))}ca(),ja(),Ka(),fa(),Oa(),Ea();const Xa=Object.freeze(Object.defineProperty({__proto__:null,default:`flf2a$ 8 7 54 0 12 0 64 185
banner.flf version 2 by Ryan Youck (youck@cs.uregina.ca)
(From a unix program called banner)
I am not responsible for use of this font  
Thanks to Glenn Chappell for his help
Katakana characters by Vinney Thai <ssfiit@eris.cs.umb.edu>
Cyrillic characters from "koi8x8" BDF font.
Date: August 11, 1994

Merged by John Cowan <cowan@ccil.org>
Modified by Paul Burton <solution@earthlink.net> 12/96 to include new parameter
supported by FIGlet and FIGWin.  May also be slightly modified for better use
of new full-width/kern/smush alternatives, but default output is NOT changed.
 $ $@
 $ $@
 $ $@
 $ $@
 $ $@
 $ $@
 $ $@
 $ $@@
 ###$@
 ###$@
 ###$@
  # $@
    $@
 ###$@
 ###$@
    $@@
 ### ###$@
 ### ###$@
  #   # $@
 $      $@
 $      $@
        $@
        $@
        $@@
   # #  $@
   # #  $@
 #######$@
   # #  $@
 #######$@
   # #  $@
   # #  $@
        $@@
  ##### $@
 #  #  #$@
 #  #   $@
  ##### $@
    #  #$@
 #  #  #$@
  ##### $@
        $@@
 ###   #$@
 # #  # $@
 ### #  $@
    #   $@
   # ###$@
  #  # #$@
 #   ###$@
        $@@
   ##   $@
  #  #  $@
   ##   $@
  ###   $@
 #   # #$@
 #    # $@
  ###  #$@
        $@@
 ###$@
 ###$@
  # $@
 #  $@
    $@
    $@
    $@
    $@@
   ##$@
  #  $@
 #   $@
 #   $@
 #   $@
  #  $@
   ##$@
     $@@
 ##  $@
   # $@
    #$@
    #$@
    #$@
   # $@
 ##  $@
     $@@
        $@
  #   # $@
   # #  $@
 #######$@
   # #  $@
  #   # $@
        $@
        $@@
      $@
   #  $@
   #  $@
 #####$@
   #  $@
   #  $@
      $@
      $@@
    $@
    $@
    $@
    $@
 ###$@
 ###$@
  # $@
 #  $@@
      $@
      $@
      $@
 #####$@
      $@
      $@
      $@
      $@@
    $@
    $@
    $@
    $@
 ###$@
 ###$@
 ###$@
    $@@
       #$@
      # $@
     #  $@
    #   $@
   #    $@
  #     $@
 #      $@
        $@@
   ###  $@
  #   # $@
 #     #$@
 #     #$@
 #     #$@
  #   # $@
   ###  $@
        $@@
   #  $@
  ##  $@
 # #  $@
   #  $@
   #  $@
   #  $@
 #####$@
      $@@
  ##### $@
 #     #$@
       #$@
  ##### $@
 #      $@
 #      $@
 #######$@
        $@@
  ##### $@
 #     #$@
       #$@
  ##### $@
       #$@
 #     #$@
  ##### $@
        $@@
 #      $@
 #    # $@
 #    # $@
 #    # $@
 #######$@
      # $@
      # $@
        $@@
 #######$@
 #      $@
 #      $@
 ###### $@
       #$@
 #     #$@
  ##### $@
        $@@
  ##### $@
 #     #$@
 #      $@
 ###### $@
 #     #$@
 #     #$@
  ##### $@
        $@@
 #######$@
 #    # $@
     #  $@
    #   $@
   #    $@
   #    $@
   #    $@
        $@@
  ##### $@
 #     #$@
 #     #$@
  ##### $@
 #     #$@
 #     #$@
  ##### $@
        $@@
  ##### $@
 #     #$@
 #     #$@
  ######$@
       #$@
 #     #$@
  ##### $@
        $@@
  # $@
 ###$@
  # $@
    $@
  # $@
 ###$@
  # $@
    $@@
    $@
 ###$@
 ###$@
    $@
 ###$@
 ###$@
  # $@
 #  $@@
    #$@
   # $@
  #  $@
 #   $@
  #  $@
   # $@
    #$@
     $@@
      $@
      $@
 #####$@
      $@
 #####$@
      $@
      $@
      $@@
 #   $@
  #  $@
   # $@
    #$@
   # $@
  #  $@
 #   $@
     $@@
  ##### $@
 #     #$@
       #$@
    ### $@
    #   $@
        $@
    #   $@
        $@@
  ##### $@
 #     #$@
 # ### #$@
 # ### #$@
 # #### $@
 #      $@
  ##### $@
        $@@
    #   $@
   # #  $@
  #   # $@
 #     #$@
 #######$@
 #     #$@
 #     #$@
        $@@
 ###### $@
 #     #$@
 #     #$@
 ###### $@
 #     #$@
 #     #$@
 ###### $@
        $@@
  ##### $@
 #     #$@
 #      $@
 #      $@
 #      $@
 #     #$@
  ##### $@
        $@@
 ###### $@
 #     #$@
 #     #$@
 #     #$@
 #     #$@
 #     #$@
 ###### $@
        $@@
 #######$@
 #      $@
 #      $@
 #####  $@
 #      $@
 #      $@
 #######$@
        $@@
 #######$@
 #      $@
 #      $@
 #####  $@
 #      $@
 #      $@
 #      $@
        $@@
  ##### $@
 #     #$@
 #      $@
 #  ####$@
 #     #$@
 #     #$@
  ##### $@
        $@@
 #     #$@
 #     #$@
 #     #$@
 #######$@
 #     #$@
 #     #$@
 #     #$@
        $@@
 ###$@
  # $@
  # $@
  # $@
  # $@
  # $@
 ###$@
    $@@
       #$@
       #$@
       #$@
       #$@
 #     #$@
 #     #$@
  ##### $@
        $@@
 #    #$@
 #   # $@
 #  #  $@
 ###   $@
 #  #  $@
 #   # $@
 #    #$@
       $@@
 #      $@
 #      $@
 #      $@
 #      $@
 #      $@
 #      $@
 #######$@
        $@@
 #     #$@
 ##   ##$@
 # # # #$@
 #  #  #$@
 #     #$@
 #     #$@
 #     #$@
        $@@
 #     #$@
 ##    #$@
 # #   #$@
 #  #  #$@
 #   # #$@
 #    ##$@
 #     #$@
        $@@
 #######$@
 #     #$@
 #     #$@
 #     #$@
 #     #$@
 #     #$@
 #######$@
        $@@
 ###### $@
 #     #$@
 #     #$@
 ###### $@
 #      $@
 #      $@
 #      $@
        $@@
  ##### $@
 #     #$@
 #     #$@
 #     #$@
 #   # #$@
 #    # $@
  #### #$@
        $@@
 ###### $@
 #     #$@
 #     #$@
 ###### $@
 #   #  $@
 #    # $@
 #     #$@
        $@@
  ##### $@
 #     #$@
 #      $@
  ##### $@
       #$@
 #     #$@
  ##### $@
        $@@
 #######$@
    #   $@
    #   $@
    #   $@
    #   $@
    #   $@
    #   $@
        $@@
 #     #$@
 #     #$@
 #     #$@
 #     #$@
 #     #$@
 #     #$@
  ##### $@
        $@@
 #     #$@
 #     #$@
 #     #$@
 #     #$@
  #   # $@
   # #  $@
    #   $@
        $@@
 #     #$@
 #  #  #$@
 #  #  #$@
 #  #  #$@
 #  #  #$@
 #  #  #$@
  ## ## $@
        $@@
 #     #$@
  #   # $@
   # #  $@
    #   $@
   # #  $@
  #   # $@
 #     #$@
        $@@
 #     #$@
  #   # $@
   # #  $@
    #   $@
    #   $@
    #   $@
    #   $@
        $@@
 #######$@
      # $@
     #  $@
    #   $@
   #    $@
  #     $@
 #######$@
        $@@
 #####$@
 #    $@
 #    $@
 #    $@
 #    $@
 #    $@
 #####$@
      $@@
 #      $@
  #     $@
   #    $@
    #   $@
     #  $@
      # $@
       #$@
        $@@
 #####$@
     #$@
     #$@
     #$@
     #$@
     #$@
 #####$@
      $@@
   #  $@
  # # $@
 #   #$@
      $@
      $@
      $@
      $@
      $@@
        $@
        $@
        $@
        $@
        $@
        $@
        $@
 #######$@@
 ###$@
 ###$@
  # $@
   #$@
    $@
    $@
    $@
    $@@
       $@
   ##  $@
  #  # $@
 #    #$@
 ######$@
 #    #$@
 #    #$@
       $@@
       $@
 ##### $@
 #    #$@
 ##### $@
 #    #$@
 #    #$@
 ##### $@
       $@@
       $@
  #### $@
 #    #$@
 #     $@
 #     $@
 #    #$@
  #### $@
       $@@
       $@
 ##### $@
 #    #$@
 #    #$@
 #    #$@
 #    #$@
 ##### $@
       $@@
       $@
 ######$@
 #     $@
 ##### $@
 #     $@
 #     $@
 ######$@
       $@@
       $@
 ######$@
 #     $@
 ##### $@
 #     $@
 #     $@
 #     $@
       $@@
       $@
  #### $@
 #    #$@
 #     $@
 #  ###$@
 #    #$@
  #### $@
       $@@
       $@
 #    #$@
 #    #$@
 ######$@
 #    #$@
 #    #$@
 #    #$@
       $@@
  $@
 #$@
 #$@
 #$@
 #$@
 #$@
 #$@
  $@@
       $@
      #$@
      #$@
      #$@
      #$@
 #    #$@
  #### $@
       $@@
       $@
 #    #$@
 #   # $@
 ####  $@
 #  #  $@
 #   # $@
 #    #$@
       $@@
       $@
 #     $@
 #     $@
 #     $@
 #     $@
 #     $@
 ######$@
       $@@
       $@
 #    #$@
 ##  ##$@
 # ## #$@
 #    #$@
 #    #$@
 #    #$@
       $@@
       $@
 #    #$@
 ##   #$@
 # #  #$@
 #  # #$@
 #   ##$@
 #    #$@
       $@@
       $@
  #### $@
 #    #$@
 #    #$@
 #    #$@
 #    #$@
  #### $@
       $@@
       $@
 ##### $@
 #    #$@
 #    #$@
 ##### $@
 #     $@
 #     $@
       $@@
       $@
  #### $@
 #    #$@
 #    #$@
 #  # #$@
 #   # $@
  ### #$@
       $@@
       $@
 ##### $@
 #    #$@
 #    #$@
 ##### $@
 #   # $@
 #    #$@
       $@@
       $@
  #### $@
 #     $@
  #### $@
      #$@
 #    #$@
  #### $@
       $@@
      $@
 #####$@
   #  $@
   #  $@
   #  $@
   #  $@
   #  $@
      $@@
       $@
 #    #$@
 #    #$@
 #    #$@
 #    #$@
 #    #$@
  #### $@
       $@@
       $@
 #    #$@
 #    #$@
 #    #$@
 #    #$@
  #  # $@
   ##  $@
       $@@
       $@
 #    #$@
 #    #$@
 #    #$@
 # ## #$@
 ##  ##$@
 #    #$@
       $@@
       $@
 #    #$@
  #  # $@
   ##  $@
   ##  $@
  #  # $@
 #    #$@
       $@@
      $@
 #   #$@
  # # $@
   #  $@
   #  $@
   #  $@
   #  $@
      $@@
       $@
 ######$@
     # $@
    #  $@
   #   $@
  #    $@
 ######$@
       $@@
   ###$@
  #   $@
  #   $@
 ##   $@
  #   $@
  #   $@
   ###$@
      $@@
 #$@
 #$@
 #$@
  $@
 #$@
 #$@
 #$@
  $@@
 ###  $@
    # $@
    # $@
    ##$@
    # $@
    # $@
 ###  $@
      $@@
  ##    $@
 #  #  #$@
     ## $@
        $@
        $@
        $@
        $@
        $@@
 #  #  #$@
   # #  $@
  #   # $@
 #     #$@
 #######$@
 #     #$@
 #     #$@
        $@@
 #     #$@
  ##### $@
 #     #$@
 #     #$@
 #     #$@
 #     #$@
  ##### $@
        $@@
 #     #$@
        $@
 #     #$@
 #     #$@
 #     #$@
 #     #$@
  ##### $@
        $@@
       $@
 #    #$@
  #### $@
 #    #$@
 ######$@
 #    #$@
 #    #$@
       $@@
       $@
 #    #$@
  #### $@
 #    #$@
 #    #$@
 #    #$@
  #### $@
       $@@
       $@
 #    #$@
       $@
 #    #$@
 #    #$@
 #    #$@
  #### $@
       $@@
 ###### $@
 #     #$@
 #     #$@
 ###### $@
 #     #$@
 #     #$@
 ###### $@
 #      $@@
160  NO-BREAK SPACE
         $@
         $@
         $@
         $@
 ########$@
    ##   $@
    ##   $@
    ##   $@@
169  COPYRIGHT SIGN
 $@
 $@
 $@
 $@
 $@
 $@
 $@
 $@@
176  DEGREE SIGN
         $@
         $@
         $@
         $@
 ########$@
         $@
         $@
         $@@
178  SUPERSCRIPT TWO
    ##   $@
    ##   $@
    ##   $@
    ##   $@
 ########$@
    ##   $@
    ##   $@
    ##   $@@
183  MIDDLE DOT
 ##   $@
 ##   $@
 #####$@
 ##   $@
 #####$@
 ##   $@
 ##   $@
 ##   $@@
196  LATIN CAPITAL LETTER A WITH DIAERESIS
 #  #  #$@
   # #  $@
  #   # $@
 #     #$@
 #######$@
 #     #$@
 #     #$@
        $@@
214  LATIN CAPITAL LETTER O WITH DIAERESIS
 #     #$@
  ##### $@
 #     #$@
 #     #$@
 #     #$@
 #     #$@
  ##### $@
        $@@
220  LATIN CAPITAL LETTER U WITH DIAERESIS
 #     #$@
        $@
 #     #$@
 #     #$@
 #     #$@
 #     #$@
  ##### $@
        $@@
223  LATIN SMALL LETTER SHARP S
 ###### $@
 #     #$@
 #     #$@
 ###### $@
 #     #$@
 #     #$@
 ###### $@
 #      $@@
228  LATIN SMALL LETTER A WITH DIAERESIS
       $@
 #    #$@
  #### $@
 #    #$@
 ######$@
 #    #$@
 #    #$@
       $@@
246  LATIN SMALL LETTER O WITH DIAERESIS
       $@
 #    #$@
  #### $@
 #    #$@
 #    #$@
 #    #$@
  #### $@
       $@@
247  DIVISION SIGN
 #### $@
 #### $@
 #### $@
 #### $@
 #####$@
 #### $@
 #### $@
 #### $@@
252  LATIN SMALL LETTER U WITH DIAERESIS
       $@
 #    #$@
       $@
 #    #$@
 #    #$@
 #    #$@
  #### $@
       $@@
0x0401  CYRILLIC CAPITAL LETTER IO
 ########$@
 ########$@
 ########$@
 ########$@
 ########$@
 ########$@
 ########$@
 ########$@@
0x0410  CYRILLIC CAPITAL LETTER A
    ####$@
   ## ##$@
  ##  ##$@
 ##   ##$@
 #######$@
 ##   ##$@
 ##   ##$@
        $@@
0x0411  CYRILLIC CAPITAL LETTER BE
 #######$@
 ##     $@
 ##     $@
 ###### $@
 ##   ##$@
 ##   ##$@
 ###### $@
        $@@
0x0412  CYRILLIC CAPITAL LETTER VE
 ###### $@
 ##   ##$@
 ##   ##$@
 ###### $@
 ##   ##$@
 ##   ##$@
 ###### $@
        $@@
0x0413  CYRILLIC CAPITAL LETTER GHE
 #######$@
 ##     $@
 ##     $@
 ##     $@
 ##     $@
 ##     $@
 ##     $@
        $@@
0x0414  CYRILLIC CAPITAL LETTER DE
   #### $@
  ## ## $@
  ## ## $@
  ## ## $@
  ## ## $@
 #######$@
 ##   ##$@
        $@@
0x0415  CYRILLIC CAPITAL LETTER IE
 #######$@
 ##     $@
 ##     $@
 ###### $@
 ##     $@
 ##     $@
 #######$@
        $@@
0x0416  CYRILLIC CAPITAL LETTER ZHE
 ## # ##$@
  # # # $@
   ###  $@
   ###  $@
  # # # $@
  # # # $@
 ## # ##$@
        $@@
0x0417  CYRILLIC CAPITAL LETTER ZE
  ##### $@
 ##   ##$@
      ##$@
    ##  $@
      ##$@
 ##   ##$@
  ##### $@
        $@@
0x0418  CYRILLIC CAPITAL LETTER I
 ##   ##$@
 ##  ###$@
 ##  ###$@
 ## # ##$@
 ###  ##$@
 ##   ##$@
 ##   ##$@
        $@@
0x0419  CYRILLIC CAPITAL LETTER SHORT I
 ## ## #$@
 ##   ##$@
 ##  ###$@
 ## # ##$@
 ###  ##$@
 ##   ##$@
 ##   ##$@
        $@@
0x041A  CYRILLIC CAPITAL LETTER KA
 ##   ##$@
 ##  ## $@
 ## ##  $@
 #####  $@
 ##  ## $@
 ##   ##$@
 ##   ##$@
        $@@
0x041B  CYRILLIC CAPITAL LETTER EL
   #####$@
  ##  ##$@
  ##  ##$@
  ##  ##$@
  ##  ##$@
  ##  ##$@
 ##   ##$@
        $@@
0x041C  CYRILLIC CAPITAL LETTER EM
 ##   ##$@
 ##   ##$@
 ### ###$@
 ## # ##$@
 ##   ##$@
 ##   ##$@
 ##   ##$@
        $@@
0x041D  CYRILLIC CAPITAL LETTER EN
 ##   ##$@
 ##   ##$@
 ##   ##$@
 #######$@
 ##   ##$@
 ##   ##$@
 ##   ##$@
        $@@
0x041E  CYRILLIC CAPITAL LETTER O
  ##### $@
 ##   ##$@
 ##   ##$@
 ##   ##$@
 ##   ##$@
 ##   ##$@
  ##### $@
        $@@
0x041F  CYRILLIC CAPITAL LETTER PE
 #######$@
 ##   ##$@
 ##   ##$@
 ##   ##$@
 ##   ##$@
 ##   ##$@
 ##   ##$@
        $@@
0x0420  CYRILLIC CAPITAL LETTER ER
 ###### $@
 ##   ##$@
 ##   ##$@
 ###### $@
 ##     $@
 ##     $@
 ##     $@
        $@@
0x0421  CYRILLIC CAPITAL LETTER ES
  ##### $@
 ##   ##$@
 ##     $@
 ##     $@
 ##     $@
 ##   ##$@
  ##### $@
        $@@
0x0422  CYRILLIC CAPITAL LETTER TE
 ###### $@
   ##   $@
   ##   $@
   ##   $@
   ##   $@
   ##   $@
   ##   $@
        $@@
0x0423  CYRILLIC CAPITAL LETTER U
 ##   ##$@
 ##   ##$@
 ##   ##$@
  ######$@
      ##$@
 ##   ##$@
  ##### $@
        $@@
0x0424  CYRILLIC CAPITAL LETTER EF
    #   $@
  ##### $@
 ## # ##$@
 ## # ##$@
 ## # ##$@
  ##### $@
    #   $@
        $@@
0x0425  CYRILLIC CAPITAL LETTER HA
 ##   ##$@
  ## ## $@
   ###  $@
   ###  $@
   ###  $@
  ## ## $@
 ##   ##$@
        $@@
0x0426  CYRILLIC CAPITAL LETTER TSE
 ##  ## $@
 ##  ## $@
 ##  ## $@
 ##  ## $@
 ##  ## $@
 ##  ## $@
 #######$@
       #$@@
0x0427  CYRILLIC CAPITAL LETTER CHE
 ##   ##$@
 ##   ##$@
 ##   ##$@
  ######$@
      ##$@
      ##$@
      ##$@
        $@@
0x0428  CYRILLIC CAPITAL LETTER SHA
 ## # ##$@
 ## # ##$@
 ## # ##$@
 ## # ##$@
 ## # ##$@
 ## # ##$@
 #######$@
        $@@
0x0429  CYRILLIC CAPITAL LETTER SHCHA
 ## # ##$@
 ## # ##$@
 ## # ##$@
 ## # ##$@
 ## # ##$@
 ## # ##$@
 #######$@
       #$@@
0x042A  CYRILLIC CAPITAL LETTER HARD SIGN
 ###    $@
 ###    $@
  ##    $@
  ##### $@
  ##  ##$@
  ##  ##$@
  ##### $@
        $@@
0x042B  CYRILLIC CAPITAL LETTER YERU
 ##   ##$@
 ##   ##$@
 ##   ##$@
 ####  #$@
 ##  # #$@
 ##  # #$@
 ####  #$@
        $@@
0x042C  CYRILLIC CAPITAL LETTER SOFT SIGN
 ##     $@
 ##     $@
 ##     $@
 ###### $@
 ##   ##$@
 ##   ##$@
 ###### $@
        $@@
0x042D  CYRILLIC CAPITAL LETTER E
  ##### $@
 ##   ##$@
      ##$@
   #####$@
      ##$@
 ##   ##$@
  ##### $@
        $@@
0x042E  CYRILLIC CAPITAL LETTER YU
 ##  ## $@
 ## # ##$@
 ## # ##$@
 #### ##$@
 ## # ##$@
 ## # ##$@
 ##  ## $@
        $@@
0x042F  CYRILLIC CAPITAL LETTER YA
   #####$@
  ##  ##$@
  ##  ##$@
   #####$@
   ## ##$@
  ##  ##$@
 ##   ##$@
        $@@
0x0430  CYRILLIC SMALL LETTER A
        $@
        $@
  ####  $@
     ## $@
  ##### $@
 ##  ## $@
  ######$@
        $@@
0x0431  CYRILLIC SMALL LETTER BE
        $@
     ## $@
  ####  $@
 ##     $@
 ###### $@
 ##   ##$@
  ##### $@
        $@@
0x0432  CYRILLIC SMALL LETTER VE
        $@
        $@
 #####  $@
 ##  ## $@
 ###### $@
 ##   ##$@
 ###### $@
        $@@
0x0433  CYRILLIC SMALL LETTER GHE
        $@
        $@
  ##### $@
      ##$@
  ##### $@
 ##     $@
  ######$@
        $@@
0x0434  CYRILLIC SMALL LETTER DE
        $@
   #### $@
      ##$@
   #####$@
  ##  ##$@
 ##   ##$@
  ##### $@
        $@@
0x0435  CYRILLIC SMALL LETTER IE
        $@
        $@
  ##### $@
 ##   ##$@
 ###### $@
 ##     $@
  ##### $@
        $@@
0x0436  CYRILLIC SMALL LETTER ZHE
        $@
        $@
 ## # ##$@
  # # # $@
   ###  $@
  # # # $@
 ## # ##$@
        $@@
0x0437  CYRILLIC SMALL LETTER ZE
        $@
        $@
  ##### $@
 ##   ##$@
    ### $@
 ##   ##$@
  ##### $@
        $@@
0x0438  CYRILLIC SMALL LETTER I
        $@
        $@
 ##   ##$@
 ##  ###$@
 ## # ##$@
 ###  ##$@
 ##   ##$@
        $@@
0x0439  CYRILLIC SMALL LETTER SHORT I
        $@
    ##  $@
 ##   ##$@
 ##  ###$@
 ## # ##$@
 ###  ##$@
 ##   ##$@
        $@@
0x043A  CYRILLIC SMALL LETTER KA
        $@
        $@
 ##   ##$@
 ##  ## $@
 #####  $@
 ##  ## $@
 ##   ##$@
        $@@
0x043B  CYRILLIC SMALL LETTER EL
        $@
        $@
   #####$@
  ##  ##$@
  ##  ##$@
  ##  ##$@
 ##   ##$@
        $@@
0x043C  CYRILLIC SMALL LETTER EM
        $@
        $@
 ##   ##$@
 ### ###$@
 ## # ##$@
 ##   ##$@
 ##   ##$@
        $@@
0x043D  CYRILLIC SMALL LETTER EN
        $@
        $@
 ##   ##$@
 ##   ##$@
 #######$@
 ##   ##$@
 ##   ##$@
        $@@
0x043E  CYRILLIC SMALL LETTER O
        $@
        $@
  ##### $@
 ##   ##$@
 ##   ##$@
 ##   ##$@
  ##### $@
        $@@
0x043F  CYRILLIC SMALL LETTER PE
        $@
        $@
 ###### $@
 ##   ##$@
 ##   ##$@
 ##   ##$@
 ##   ##$@
        $@@
0x0440  CYRILLIC SMALL LETTER ER
        $@
        $@
 ###### $@
 ##   ##$@
 ###### $@
 ##     $@
 ##     $@
        $@@
0x0441  CYRILLIC SMALL LETTER ES
        $@
        $@
  ##### $@
 ##     $@
 ##     $@
 ##     $@
  ##### $@
        $@@
0x0442  CYRILLIC SMALL LETTER TE
        $@
        $@
 ###### $@
   ##   $@
   ##   $@
   ##   $@
   ##   $@
        $@@
0x0443  CYRILLIC SMALL LETTER U
        $@
        $@
 ##   ##$@
 ##   ##$@
 ##   ##$@
  ######$@
      ##$@
  ##### $@@
0x0444  CYRILLIC SMALL LETTER EF
        $@
    #   $@
  ##### $@
 ## # ##$@
 ## # ##$@
  ##### $@
    #   $@
        $@@
0x0445  CYRILLIC SMALL LETTER HA
        $@
        $@
 ##   ##$@
  ## ## $@
   ###  $@
  ## ## $@
 ##   ##$@
        $@@
0x0446  CYRILLIC SMALL LETTER TSE
        $@
        $@
 ##   ##$@
 ##   ##$@
 ##   ##$@
 ##  ## $@
  ### ##$@
       #$@@
0x0447  CYRILLIC SMALL LETTER CHE
        $@
        $@
 ##   ##$@
 ##   ##$@
  ######$@
      ##$@
      ##$@
        $@@
0x0448  CYRILLIC SMALL LETTER SHA
        $@
        $@
 ## # ##$@
 ## # ##$@
 ## # ##$@
 ## # ##$@
 #######$@
        $@@
0x0449  CYRILLIC SMALL LETTER SHCHA
        $@
        $@
 ## # ##$@
 ## # ##$@
 ## # ##$@
 ## # ##$@
 #######$@
       #$@@
0x044A  CYRILLIC SMALL LETTER HARD SIGN
        $@
        $@
 ###    $@
  ##    $@
  ##### $@
  ##  ##$@
  ##### $@
        $@@
0x044B  CYRILLIC SMALL LETTER YERU
        $@
        $@
 ##   ##$@
 ##   ##$@
 ####  #$@
 ##  # #$@
 ####  #$@
        $@@
0x044C  CYRILLIC SMALL LETTER SOFT SIGN
        $@
        $@
 ##     $@
 ##     $@
 ###### $@
 ##   ##$@
 ###### $@
        $@@
0x044D  CYRILLIC SMALL LETTER E
        $@
        $@
 ###### $@
      ##$@
   #####$@
      ##$@
 ###### $@
        $@@
0x044E  CYRILLIC SMALL LETTER YU
        $@
        $@
 #  ### $@
 # ## ##$@
 #### ##$@
 # ## ##$@
 #  ### $@
        $@@
0x044F  CYRILLIC SMALL LETTER YA
        $@
        $@
   #####$@
  ##  ##$@
   #####$@
  ##  ##$@
 ##   ##$@
        $@@
0x0451  CYRILLIC SMALL LETTER IO
         $@
         $@
 ########$@
         $@
 #### ###$@
   ## ## $@
   ## ## $@
   ## ## $@@
0x2219  BULLET OPERATOR
   ## ##$@
   ## ##$@
   ## ##$@
   ## ##$@
 #######$@
        $@
        $@
        $@@
0x221A  SQUARE ROOT
    ## $@
    ## $@
 ##### $@
    ## $@
 ##### $@
       $@
       $@
       $@@
0x2248  ALMOST EQUAL TO
       $@
       $@
       $@
       $@
 ##### $@
    ## $@
    ## $@
    ## $@@
0x2264  LESS-THAN OR EQUAL TO
 ##   $@
 ##   $@
 ##   $@
 ##   $@
 #####$@
      $@
      $@
      $@@
0x2265  GREATER-THAN OR EQUAL TO
    ##   $@
    ##   $@
    ##   $@
    ##   $@
 ########$@
         $@
         $@
         $@@
0x2320  TOP HALF INTEGRAL
        $@
        $@
 #######$@
      ##$@
 #### ##$@
   ## ##$@
   ## ##$@
   ## ##$@@
0x2321  BOTTOM HALF INTEGRAL
 ##   $@
 ##   $@
 ##   $@
 ##   $@
 #####$@
 ##   $@
 ##   $@
 ##   $@@
0x2500  BOX DRAWINGS LIGHT HORIZONTAL
   ##  $@
       $@
   ##  $@
  ##   $@
 ##    $@
 ##  ##$@
  #### $@
       $@@
0x2502  BOX DRAWINGS LIGHT VERTICAL
       $@
       $@
       $@
 ######$@
 ##    $@
 ##    $@
       $@
       $@@
0x250C  BOX DRAWINGS LIGHT DOWN AND RIGHT
       $@
       $@
       $@
 ######$@
     ##$@
     ##$@
       $@
       $@@
0x2510  BOX DRAWINGS LIGHT DOWN AND LEFT
 ##    ##$@
 ##   ## $@
 ##  ##  $@
 ## #### $@
   ##  ##$@
  ##  ## $@
 ##  ##  $@
     ####$@@
0x2514  BOX DRAWINGS LIGHT UP AND RIGHT
 ##    ##$@
 ##   ## $@
 ##  ##  $@
 ## ## ##$@
   ## ###$@
  ## ####$@
 ##  ####$@
       ##$@@
0x2518  BOX DRAWINGS LIGHT UP AND LEFT
 ## $@
 ## $@
    $@
 ## $@
 ## $@
 ## $@
 ## $@
    $@@
0x251C  BOX DRAWINGS LIGHT VERTICAL AND RIGHT
         $@
   ##  ##$@
  ##  ## $@
 ##  ##  $@
  ##  ## $@
   ##  ##$@
         $@
         $@@
0x2524  BOX DRAWINGS LIGHT VERTICAL AND LEFT
         $@
 ##  ##  $@
  ##  ## $@
   ##  ##$@
  ##  ## $@
 ##  ##  $@
         $@
         $@@
0x252C  BOX DRAWINGS LIGHT DOWN AND HORIZONTAL
  # #$@
 # # $@
  # #$@
 # # $@
  # #$@
 # # $@
  # #$@
 # # $@@
0x2534  BOX DRAWINGS LIGHT UP AND HORIZONTAL
  # # # #$@
 # # # # $@
  # # # #$@
 # # # # $@
  # # # #$@
 # # # # $@
  # # # #$@
 # # # # $@@
0x253C  BOX DRAWINGS LIGHT VERTICAL AND HORIZONTAL
 ## ## ##$@
  ### ###$@
 ## ## ##$@
 ### ### $@
 ## ## ##$@
  ### ###$@
 ## ## ##$@
 ### ### $@@
0x2550  BOX DRAWINGS DOUBLE HORIZONTAL
 ## ## $@
 ## ## $@
 ## ###$@
 ##    $@
 ######$@
       $@
       $@
       $@@
0x2551  BOX DRAWINGS DOUBLE VERTICAL
       $@
       $@
 ######$@
 ##    $@
 ## ###$@
 ## ## $@
 ## ## $@
 ## ## $@@
0x2552  BOX DRAWINGS DOWN SINGLE AND RIGHT DOUBLE
   ## ## $@
   ## ## $@
 #### ###$@
         $@
 ########$@
         $@
         $@
         $@@
0x2553  BOX DRAWINGS DOWN DOUBLE AND RIGHT SINGLE
 #### $@
 #### $@
 #####$@
 ##   $@
 #####$@
 #### $@
 #### $@
 #### $@@
0x2554  BOX DRAWINGS DOUBLE DOWN AND RIGHT
         $@
         $@
 ########$@
         $@
 ########$@
         $@
         $@
         $@@
0x2555  BOX DRAWINGS DOWN SINGLE AND LEFT DOUBLE
   #### $@
   #### $@
 #######$@
        $@
 #######$@
   #### $@
   #### $@
   #### $@@
0x2556  BOX DRAWINGS DOWN DOUBLE AND LEFT SINGLE
    ##   $@
    ##   $@
 ########$@
         $@
 ########$@
         $@
         $@
         $@@
0x2557  BOX DRAWINGS DOUBLE DOWN AND LEFT
   ## ## $@
   ## ## $@
   ## ## $@
   ## ## $@
 ########$@
         $@
         $@
         $@@
0x2558  BOX DRAWINGS UP SINGLE AND RIGHT DOUBLE
         $@
         $@
 ########$@
         $@
 ########$@
    ##   $@
    ##   $@
    ##   $@@
0x2559  BOX DRAWINGS UP DOUBLE AND RIGHT SINGLE
         $@
         $@
         $@
         $@
 ########$@
   ## ## $@
   ## ## $@
   ## ## $@@
0x255A  BOX DRAWINGS DOUBLE UP AND RIGHT
 ## ## $@
 ## ## $@
 ## ## $@
 ## ## $@
 ######$@
       $@
       $@
       $@@
0x255B  BOX DRAWINGS UP SINGLE AND LEFT DOUBLE
 ##   $@
 ##   $@
 #####$@
 ##   $@
 #####$@
      $@
      $@
      $@@
0x255C  BOX DRAWINGS UP DOUBLE AND LEFT SINGLE
      $@
      $@
 #####$@
 ##   $@
 #####$@
 ##   $@
 ##   $@
 ##   $@@
0x255D  BOX DRAWINGS DOUBLE UP AND LEFT
       $@
       $@
       $@
       $@
 ######$@
 ## ## $@
 ## ## $@
 ## ## $@@
0x255E  BOX DRAWINGS VERTICAL SINGLE AND RIGHT DOUBLE
   ## ## $@
   ## ## $@
   ## ## $@
   ## ## $@
 ########$@
   ## ## $@
   ## ## $@
   ## ## $@@
0x255F  BOX DRAWINGS VERTICAL DOUBLE AND RIGHT SINGLE
    ##   $@
    ##   $@
 ########$@
    ##   $@
 ########$@
    ##   $@
    ##   $@
    ##   $@@
0x2560  BOX DRAWINGS DOUBLE VERTICAL AND RIGHT
    ## $@
    ## $@
    ## $@
    ## $@
 ##### $@
       $@
       $@
       $@@
0x2561  BOX DRAWINGS VERTICAL SINGLE AND LEFT DOUBLE
      $@
      $@
      $@
      $@
 #####$@
 ##   $@
 ##   $@
 ##   $@@
0x2562  BOX DRAWINGS VERTICAL DOUBLE AND LEFT SINGLE
         $@
         $@
         $@
         $@
 ########$@
 ########$@
 ########$@
 ########$@@
0x2563  BOX DRAWINGS DOUBLE VERTICAL AND LEFT
 ####  $@
 ####  $@
 ####  $@
 ####  $@
 ####  $@
 ####  $@
 ####  $@
 ####  $@@
0x2564  BOX DRAWINGS DOWN SINGLE AND HORIZONTAL DOUBLE
 ####$@
 ####$@
 ####$@
 ####$@
 ####$@
 ####$@
 ####$@
 ####$@@
0x2565  BOX DRAWINGS DOWN DOUBLE AND HORIZONTAL SINGLE
 ########$@
 ########$@
 ########$@
 ########$@
         $@
         $@
         $@
         $@@
0x2566  BOX DRAWINGS DOUBLE DOWN AND HORIZONTAL
  ###  $@
 ## ## $@
 ## ## $@
  ###  $@
       $@
       $@
       $@
       $@@
0x2567  BOX DRAWINGS UP SINGLE AND HORIZONTAL DOUBLE
    $@
    $@
    $@
 ## $@
 ## $@
    $@
    $@
    $@@
0x2568  BOX DRAWINGS UP DOUBLE AND HORIZONTAL SINGLE
    $@
    $@
    $@
    $@
 ## $@
    $@
    $@
    $@@
0x2569  BOX DRAWINGS DOUBLE UP AND HORIZONTAL
     ####$@
     ##  $@
     ##  $@
     ##  $@
 ### ##  $@
  ## ##  $@
   ####  $@
    ###  $@@
0x256A  BOX DRAWINGS VERTICAL SINGLE AND HORIZONTAL DOUBLE
 ####  $@
 ## ## $@
 ## ## $@
 ## ## $@
 ## ## $@
       $@
       $@
       $@@
0x256B  BOX DRAWINGS VERTICAL DOUBLE AND HORIZONTAL SINGLE
 ###  $@
   ## $@
  ##  $@
 ##   $@
 #### $@
      $@
      $@
      $@@
0x256C  BOX DRAWINGS DOUBLE VERTICAL AND HORIZONTAL
      $@
      $@
 #### $@
 #### $@
 #### $@
 #### $@
      $@
      $@@
0x2580  UPPER HALF BLOCK
 ## $@
 ## $@
 ## $@
 ## $@
 ## $@
 ## $@
 ## $@
 ## $@@
0x2584  LOWER HALF BLOCK
    ## $@
    ## $@
    ## $@
    ## $@
 ##### $@
    ## $@
    ## $@
    ## $@@
0x2588  FULL BLOCK
    ## $@
    ## $@
 ##### $@
    ## $@
 ##### $@
    ## $@
    ## $@
    ## $@@
0x258C  LEFT HALF BLOCK
   ####$@
   ####$@
   ####$@
   ####$@
 ######$@
   ####$@
   ####$@
   ####$@@
0x2590  RIGHT HALF BLOCK
        $@
        $@
        $@
        $@
 #######$@
   ## ##$@
   ## ##$@
   ## ##$@@
0x2591  LIGHT SHADE
       $@
       $@
 ##### $@
    ## $@
 ##### $@
    ## $@
    ## $@
    ## $@@
0x2592  MEDIUM SHADE
   ####$@
   ####$@
 ######$@
     ##$@
 ######$@
   ####$@
   ####$@
   ####$@@
0x2593  DARK SHADE
 ####$@
 ####$@
 ####$@
 ####$@
 ####$@
 ####$@
 ####$@
 ####$@@
0x25A0  BLACK SQUARE
   ## ##$@
   ## ##$@
 #### ##$@
      ##$@
 #######$@
        $@
        $@
        $@@
0x30A2  A
 ##########$@
       ### $@
      #    $@
     #     $@
    #      $@
   #       $@
  #        $@
           $@@
0x30A4  I
       ##$@
     ##  $@
   ## #  $@
 ##   #  $@
      #  $@
      #  $@
      #  $@
         $@@
0x30A6  U
     #     $@
 ##########$@
 #        #$@
        ## $@
      ##   $@
    ##     $@
  ##       $@
           $@@
0x30A8  E
           $@
   ####### $@
      #    $@
      #    $@
      #    $@
      #    $@
 ##########$@
           $@@
0x30AA  O
        #  $@
 ##########$@
       ##  $@
     ## #  $@
   ##   #  $@
 ##    ##  $@
        #  $@
           $@@
0x30AB  KA
      #    $@
 ##########$@
     #    #$@
     #    #$@
    #     #$@
   #   # # $@
  #     #  $@
           $@@
0x30AD  KI
 # #    $@
  #   # $@
 # # #  $@
    #   $@
   # #  $@
  #   # $@
       #$@
        $@@
0x30AF  KU
    #      $@
   ########$@
  #       #$@
 #      ## $@
      ##   $@
    ##     $@
  ##       $@
           $@@
0x30B1  KE
    #      $@
   ########$@
  #    #   $@
 #    #    $@
     #     $@
    #      $@
   #       $@
           $@@
0x30B3  KO
           $@
 ##########$@
          #$@
          #$@
          #$@
          #$@
 ######### $@
           $@@
0x30B5  SA
   #    #  $@
 ##########$@
   #    #  $@
        #  $@
       #   $@
      #    $@
    #      $@
           $@@
0x30B7  SI (SHI)
   #       #$@
 #  #     # $@
  #      #  $@
       ##   $@
     ##     $@
   ##       $@
 ##         $@
            $@@
0x30B9  SU
 ########$@
        #$@
       # $@
     ##  $@
   ## #  $@
  ##   # $@
 #      #$@
         $@@
0x30BB  SE
   #       $@
   #       $@
 ##########$@
   #     # $@
   #       $@
   #       $@
    ###### $@
           $@@
0x30BD  SO
 #       #$@
 #       #$@
        # $@
       #  $@
     ##   $@
   ##     $@
 ##       $@
          $@@
0x30BF  TA
    #     $@
   #######$@
  #     # $@
 # #   #  $@
    ###   $@
   ##     $@
 ##       $@
          $@@
0x30C1  TI (CHI)
        ## $@
  ######   $@
      #    $@
 ##########$@
      #    $@
      #    $@
    ##     $@
           $@@
0x30C4  TU (TSU)
 # #     #$@
 # #     #$@
        # $@
       #  $@
     ##   $@
   ##     $@
 ##       $@
          $@@
0x30C6  TE
   ######  $@
           $@
 ##########$@
      #    $@
      #    $@
     #     $@
   ##      $@
           $@@
0x30C8  TO
 #   $@
 #   $@
 ##  $@
 # # $@
 #  #$@
 #   $@
 #   $@
     $@@
0x30CA  NA
      #    $@
 ##########$@
      #    $@
      #    $@
     #     $@
    #      $@
  ##       $@
           $@@
0x30CB  NI
           $@
           $@
   ######  $@
           $@
           $@
 ##########$@
           $@
           $@@
0x30CC  NU
 ##########$@
          #$@
    #    # $@
     # ##  $@
     ##    $@
   ##  #   $@
 ##     #  $@
           $@@
0x30CD  NE
      #    $@
 ##########$@
         # $@
      ###  $@
   ######  $@
 ##   #  ##$@
      #    $@
           $@@
0x30CE  NO
         #$@
         #$@
        # $@
       #  $@
     ##   $@
   ##     $@
 ##       $@
          $@@
0x30CF  HA
          $@
          $@
    #  #  $@
   #    # $@
  #      #$@
 #        $@
          $@
          $@@
0x30D2  HI
 #       $@
 #   ### $@
 ####    $@
 #       $@
 #       $@
 #       $@
  #######$@
         $@@
0x30D5  HU (FU)
 ########$@
        #$@
        #$@
       # $@
     ##  $@
   ##    $@
 ##      $@
         $@@
0x30D8  HE
           $@
           $@
   ##      $@
  #  ##    $@
 #     ##  $@
         ##$@
           $@
           $@@
0x30DB  HO
      #    $@
 ##########$@
      #    $@
   #  # #  $@
  #   #  # $@
 #   ##   #$@
      #    $@
           $@@
0x30DE  MA
           $@
 ##########$@
         # $@
        #  $@
     # #   $@
      #    $@
       #   $@
           $@@
0x30DF  MI
 ####  $@
     ##$@
 ###   $@
    ###$@
       $@
 ###   $@
    ###$@
       $@@
0x30E0  MU
      #    $@
     #     $@
    #      $@
   #       $@
  #     #  $@
 ######### $@
          #$@
           $@@
0x30E1  ME
         #$@
        # $@
   #   #  $@
    # #   $@
     #    $@
   ## #   $@
 ##    #  $@
          $@@
0x30E2  MO
   ######  $@
     #     $@
 ##########$@
     #     $@
     #     $@
     #     $@
      #### $@
           $@@
0x30E4  YA
 #     ##  $@
  #  ## #  $@
  ###      $@
 #  #      $@
     #     $@
      #    $@
       #   $@
           $@@
0x30E6  YU
           $@
   ######  $@
        #  $@
        #  $@
        #  $@
 ##########$@
           $@
           $@@
0x30E8  YO
           $@
   ######  $@
       #   $@
      #    $@
      #    $@
 ##########$@
           $@
           $@@
0x30E9  RA
   ######  $@
           $@
 ##########$@
 #        #$@
        ## $@
      ##   $@
    ##     $@
           $@@
0x30EA  RI
 #   #$@
 #   #$@
 #   #$@
 #   #$@
    # $@
   #  $@
 ##   $@
      $@@
0x30EB  RU
    # #    $@
    # #    $@
    # #    $@
    # #   #$@
   #  #  # $@
  #   # #  $@
 #    ##   $@
           $@@
0x30EC  RE
 #       $@
 #       $@
 #       $@
 #     ##$@
 #   ##  $@
 # ##    $@
 ##      $@
         $@@
0x30ED  RO
          $@
 #########$@
 #       #$@
 #       #$@
 #       #$@
 #########$@
          $@
          $@@
0x30EF  WA
 ##########$@
 #        #$@
         # $@
        #  $@
       #   $@
     ##    $@
   ##      $@
           $@@
0x30F0  WI
      #    $@
   ####### $@
    # #    $@
    # #    $@
 ##########$@
      #    $@
      #    $@
           $@@
0x30F1  WE
 #########$@
         #$@
         #$@
 ######## $@
        # $@
        # $@
 ######## $@
          $@@
0x30F2  WO
 ##########$@
          #$@
         # $@
 ########  $@
     ##    $@
   ##      $@
 ##        $@
           $@@
0x30F3  N
         #$@
 #       #$@
  #     # $@
       #  $@
     ##   $@
   ##     $@
 ##       $@
          $@@
-0x0004  KATAMAP
                                                    @
a-A i-B u-C e-D o-E ka-F ki-G ku-H ke-I ko-J        @
sa-K shi-L su-M se-N so-O ta-P chi-Q tsu-R te-S to-T@
na-U ni-V nu-W ne-X no-Y ha-Z hi-a fu-b he-c ho-d   @
ma-e mi-f mu-g me-h mo-i ya-j yu-k we-l yo-m        @
ra-n ri-o ru-p re-q ro-r wa-s wi-t wo-u             @
n-v                                                 @
                                                    @@
-0x0006  MOSCOWMAP
a-a, b-b, v-v, g-g, d-d, e-e, zh-j, z-z, i-i@
short i->, k-k, l-l, m-m, n-n, o-o, p-p, r-r@
s-s, t-t, u-u, f-f, kh-h, ts-q, ch-c, sh-w  @
shch-x, hard-\\, yeru-|, soft-/, reverse e-~ @
yu-\`, ya-y                                  @
Capitals use Latin capital letters, except: @
Reverse E-<, Yu-@                           @
No caps for short i, hard, yeru, soft.      @@
`},Symbol.toStringTag,{value:"Module"})),Ya=Object.freeze(Object.defineProperty({__proto__:null,default:`flf2a$ 8 6 59 15 10 0 24463
Big by Glenn Chappell 4/93 -- based on Standard
Includes ISO Latin-1
Greek characters by Bruce Jakeway <pbjakeway@neumann.uwaterloo.ca>
figlet release 2.2 -- November 1996
Permission is hereby given to modify this font, as long as the
modifier's name is placed on a comment line.

Modified by Paul Burton <solution@earthlink.net> 12/96 to include new parameter
supported by FIGlet and FIGWin.  May also be slightly modified for better use
of new full-width/kern/smush alternatives, but default output is NOT changed.
 $@
 $@
 $@
 $@
 $@
 $@
 $@
 $@@
  _ @
 | |@
 | |@
 | |@
 |_|@
 (_)@
    @
    @@
  _ _ @
 ( | )@
  V V @
   $  @
   $  @
   $  @
      @
      @@
    _  _   @
  _| || |_ @
 |_  __  _|@
  _| || |_ @
 |_  __  _|@
   |_||_|  @
           @
           @@
   _  @
  | | @
 / __)@
 \\__ \\@
 (   /@
  |_| @
      @
      @@
  _   __@
 (_) / /@
    / / @
   / /  @
  / / _ @
 /_/ (_)@
        @
        @@
         @
   ___   @
  ( _ )  @
  / _ \\/\\@
 | (_>  <@
  \\___/\\/@
         @
         @@
  _ @
 ( )@
 |/ @
  $ @
  $ @
  $ @
    @
    @@
   __@
  / /@
 | | @
 | | @
 | | @
 | | @
  \\_\\@
     @@
 __  @
 \\ \\ @
  | |@
  | |@
  | |@
  | |@
 /_/ @
     @@
     _    @
  /\\| |/\\ @
  \\ \` ' / @
 |_     _|@
  / , . \\ @
  \\/|_|\\/ @
          @
          @@
        @
    _   @
  _| |_ @
 |_   _|@
   |_|  @
    $   @
        @
        @@
    @
    @
    @
    @
  _ @
 ( )@
 |/ @
    @@
         @
         @
  ______ @
 |______|@
     $   @
     $   @
         @
         @@
    @
    @
    @
    @
  _ @
 (_)@
    @
    @@
      __@
     / /@
    / / @
   / /  @
  / /   @
 /_/    @
        @
        @@
   ___  @
  / _ \\ @
 | | | |@
 | | | |@
 | |_| |@
  \\___/ @
        @
        @@
  __ @
 /_ |@
  | |@
  | |@
  | |@
  |_|@
     @
     @@
  ___  @
 |__ \\ @
   $) |@
   / / @
  / /_ @
 |____|@
       @
       @@
  ____  @
 |___ \\ @
   __) |@
  |__ < @
  ___) |@
 |____/ @
        @
        @@
  _  _   @
 | || |  @
 | || |_ @
 |__   _|@
    | |  @
    |_|  @
         @
         @@
  _____ @
 | ____|@
 | |__  @
 |___ \\ @
  ___) |@
 |____/ @
        @
        @@
    __  @
   / /  @
  / /_  @
 | '_ \\ @
 | (_) |@
  \\___/ @
        @
        @@
  ______ @
 |____  |@
    $/ / @
    / /  @
   / /   @
  /_/    @
         @
         @@
   ___  @
  / _ \\ @
 | (_) |@
  > _ < @
 | (_) |@
  \\___/ @
        @
        @@
   ___  @
  / _ \\ @
 | (_) |@
  \\__, |@
    / / @
   /_/  @
        @
        @@
    @
  _ @
 (_)@
  $ @
  _ @
 (_)@
    @
    @@
    @
  _ @
 (_)@
  $ @
  _ @
 ( )@
 |/ @
    @@
    __@
   / /@
  / / @
 < <  @
  \\ \\ @
   \\_\\@
      @
      @@
         @
  ______ @
 |______|@
  ______ @
 |______|@
         @
         @
         @@
 __   @
 \\ \\  @
  \\ \\ @
   > >@
  / / @
 /_/  @
      @
      @@
  ___  @
 |__ \\ @
    ) |@
   / / @
  |_|  @
  (_)  @
       @
       @@
          @
    ____  @
   / __ \\ @
  / / _\` |@
 | | (_| |@
  \\ \\__,_|@
   \\____/ @
          @@
           @
     /\\    @
    /  \\   @
   / /\\ \\  @
  / ____ \\ @
 /_/    \\_\\@
           @
           @@
  ____  @
 |  _ \\ @
 | |_) |@
 |  _ < @
 | |_) |@
 |____/ @
        @
        @@
   _____ @
  / ____|@
 | | $   @
 | | $   @
 | |____ @
  \\_____|@
         @
         @@
  _____  @
 |  __ \\ @
 | |  | |@
 | |  | |@
 | |__| |@
 |_____/ @
         @
         @@
  ______ @
 |  ____|@
 | |__   @
 |  __|  @
 | |____ @
 |______|@
         @
         @@
  ______ @
 |  ____|@
 | |__   @
 |  __|  @
 | |     @
 |_|     @
         @
         @@
   _____ @
  / ____|@
 | |  __ @
 | | |_ |@
 | |__| |@
  \\_____|@
         @
         @@
  _    _ @
 | |  | |@
 | |__| |@
 |  __  |@
 | |  | |@
 |_|  |_|@
         @
         @@
  _____ @
 |_   _|@
   | |  @
   | |  @
  _| |_ @
 |_____|@
        @
        @@
       _ @
      | |@
      | |@
  _   | |@
 | |__| |@
  \\____/ @
         @
         @@
  _  __@
 | |/ /@
 | ' / @
 |  <  @
 | . \\ @
 |_|\\_\\@
       @
       @@
  _      @
 | |     @
 | |     @
 | |     @
 | |____ @
 |______|@
         @
         @@
  __  __ @
 |  \\/  |@
 | \\  / |@
 | |\\/| |@
 | |  | |@
 |_|  |_|@
         @
         @@
  _   _ @
 | \\ | |@
 |  \\| |@
 | . \` |@
 | |\\  |@
 |_| \\_|@
        @
        @@
   ____  @
  / __ \\ @
 | |  | |@
 | |  | |@
 | |__| |@
  \\____/ @
         @
         @@
  _____  @
 |  __ \\ @
 | |__) |@
 |  ___/ @
 | |     @
 |_|     @
         @
         @@
   ____  @
  / __ \\ @
 | |  | |@
 | |  | |@
 | |__| |@
  \\___\\_\\@
         @
         @@
  _____  @
 |  __ \\ @
 | |__) |@
 |  _  / @
 | | \\ \\ @
 |_|  \\_\\@
         @
         @@
   _____ @
  / ____|@
 | (___  @
  \\___ \\ @
  ____) |@
 |_____/ @
         @
         @@
  _______ @
 |__   __|@
    | |   @
    | |   @
    | |   @
    |_|   @
          @
          @@
  _    _ @
 | |  | |@
 | |  | |@
 | |  | |@
 | |__| |@
  \\____/ @
         @
         @@
 __      __@
 \\ \\    / /@
  \\ \\  / / @
   \\ \\/ /  @
    \\  /   @
     \\/    @
           @
           @@
 __          __@
 \\ \\        / /@
  \\ \\  /\\  / / @
   \\ \\/  \\/ /  @
    \\  /\\  /   @
     \\/  \\/    @
               @
               @@
 __   __@
 \\ \\ / /@
  \\ V / @
   > <  @
  / . \\ @
 /_/ \\_\\@
        @
        @@
 __     __@
 \\ \\   / /@
  \\ \\_/ / @
   \\   /  @
    | |   @
    |_|   @
          @
          @@
  ______@
 |___  /@
   $/ / @
   / /  @
  / /__ @
 /_____|@
        @
        @@
  ___ @
 |  _|@
 | |  @
 | |  @
 | |  @
 | |_ @
 |___|@
      @@
 __     @
 \\ \\    @
  \\ \\   @
   \\ \\  @
    \\ \\ @
     \\_\\@
        @
        @@
  ___ @
 |_  |@
   | |@
   | |@
   | |@
  _| |@
 |___|@
      @@
  /\\ @
 |/\\|@
   $ @
   $ @
   $ @
   $ @
     @
     @@
         @
         @
         @
         @
         @
     $   @
  ______ @
 |______|@@
  _ @
 ( )@
  \\|@
  $ @
  $ @
  $ @
    @
    @@
        @
        @
   __ _ @
  / _\` |@
 | (_| |@
  \\__,_|@
        @
        @@
  _     @
 | |    @
 | |__  @
 | '_ \\ @
 | |_) |@
 |_.__/ @
        @
        @@
       @
       @
   ___ @
  / __|@
 | (__ @
  \\___|@
       @
       @@
      _ @
     | |@
   __| |@
  / _\` |@
 | (_| |@
  \\__,_|@
        @
        @@
       @
       @
   ___ @
  / _ \\@
 |  __/@
  \\___|@
       @
       @@
   __ @
  / _|@
 | |_ @
 |  _|@
 | |  @
 |_|  @
      @
      @@
        @
        @
   __ _ @
  / _\` |@
 | (_| |@
  \\__, |@
   __/ |@
  |___/ @@
  _     @
 | |    @
 | |__  @
 | '_ \\ @
 | | | |@
 |_| |_|@
        @
        @@
  _ @
 (_)@
  _ @
 | |@
 | |@
 |_|@
    @
    @@
    _ @
   (_)@
    _ @
   | |@
   | |@
   | |@
  _/ |@
 |__/ @@
  _    @
 | |   @
 | | __@
 | |/ /@
 |   < @
 |_|\\_\\@
       @
       @@
  _ @
 | |@
 | |@
 | |@
 | |@
 |_|@
    @
    @@
            @
            @
  _ __ ___  @
 | '_ \` _ \\ @
 | | | | | |@
 |_| |_| |_|@
            @
            @@
        @
        @
  _ __  @
 | '_ \\ @
 | | | |@
 |_| |_|@
        @
        @@
        @
        @
   ___  @
  / _ \\ @
 | (_) |@
  \\___/ @
        @
        @@
        @
        @
  _ __  @
 | '_ \\ @
 | |_) |@
 | .__/ @
 | |    @
 |_|    @@
        @
        @
   __ _ @
  / _\` |@
 | (_| |@
  \\__, |@
     | |@
     |_|@@
       @
       @
  _ __ @
 | '__|@
 | |   @
 |_|   @
       @
       @@
      @
      @
  ___ @
 / __|@
 \\__ \\@
 |___/@
      @
      @@
  _   @
 | |  @
 | |_ @
 | __|@
 | |_ @
  \\__|@
      @
      @@
        @
        @
  _   _ @
 | | | |@
 | |_| |@
  \\__,_|@
        @
        @@
        @
        @
 __   __@
 \\ \\ / /@
  \\ V / @
   \\_/  @
        @
        @@
           @
           @
 __      __@
 \\ \\ /\\ / /@
  \\ V  V / @
   \\_/\\_/  @
           @
           @@
       @
       @
 __  __@
 \\ \\/ /@
  >  < @
 /_/\\_\\@
       @
       @@
        @
        @
  _   _ @
 | | | |@
 | |_| |@
  \\__, |@
   __/ |@
  |___/ @@
      @
      @
  ____@
 |_  /@
  / / @
 /___|@
      @
      @@
    __@
   / /@
  | | @
 / /  @
 \\ \\  @
  | | @
   \\_\\@
      @@
  _ @
 | |@
 | |@
 | |@
 | |@
 | |@
 | |@
 |_|@@
 __   @
 \\ \\  @
  | | @
   \\ \\@
   / /@
  | | @
 /_/  @
      @@
  /\\/|@
 |/\\/ @
   $  @
   $  @
   $  @
   $  @
      @
      @@
   _   _  @
  (_)_(_) @
    / \\   @
   / _ \\  @
  / ___ \\ @
 /_/   \\_\\@
          @
          @@
  _   _ @
 (_)_(_)@
  / _ \\ @
 | | | |@
 | |_| |@
  \\___/ @
        @
        @@
  _   _ @
 (_) (_)@
 | | | |@
 | | | |@
 | |_| |@
  \\___/ @
        @
        @@
  _   _ @
 (_) (_)@
   __ _ @
  / _\` |@
 | (_| |@
  \\__,_|@
        @
        @@
  _   _ @
 (_) (_)@
   ___  @
  / _ \\ @
 | (_) |@
  \\___/ @
        @
        @@
  _   _ @
 (_) (_)@
  _   _ @
 | | | |@
 | |_| |@
  \\__,_|@
        @
        @@
   ___  @
  / _ \\ @
 | | ) |@
 | |< < @
 | | ) |@
 | ||_/ @
 |_|    @
        @@
160  NO-BREAK SPACE
 $@
 $@
 $@
 $@
 $@
 $@
 $@
 $@@
161  INVERTED EXCLAMATION MARK
  _ @
 (_)@
 | |@
 | |@
 | |@
 |_|@
    @
    @@
162  CENT SIGN
       @
    _  @
   | | @
  / __)@
 | (__ @
  \\   )@
   |_| @
       @@
163  POUND SIGN
     ___   @
    / ,_\\  @
  _| |_    @
 |__ __|   @
   | |____ @
  (_,_____|@
           @
           @@
164  CURRENCY SIGN
        @
 /\\___/\\@
 \\  _  /@
 | (_) |@
 / ___ \\@
 \\/   \\/@
        @
        @@
165  YEN SIGN
  __   __ @
  \\ \\ / / @
  _\\ V /_ @
 |___ ___|@
 |___ ___|@
    |_|   @
          @
          @@
166  BROKEN BAR
  _ @
 | |@
 | |@
 |_|@
  _ @
 | |@
 | |@
 |_|@@
167  SECTION SIGN
    __ @
  _/ _)@
 / \\ \\ @
 \\ \\\\ \\@
  \\ \\_/@
 (__/  @
       @
       @@
168  DIAERESIS
  _   _ @
 (_) (_)@
  $   $ @
  $   $ @
  $   $ @
  $   $ @
        @
        @@
169  COPYRIGHT SIGN
    ________   @
   /  ____  \\  @
  /  / ___|  \\ @
 |  | |       |@
 |  | |___    |@
  \\  \\____|  / @
   \\________/  @
               @@
170  FEMININE ORDINAL INDICATOR
   __ _ @
  / _\` |@
 | (_| |@
  \\__,_|@
 |_____|@
    $   @
        @
        @@
171  LEFT-POINTING DOUBLE ANGLE QUOTATION MARK
    ____@
   / / /@
  / / / @
 < < <  @
  \\ \\ \\ @
   \\_\\_\\@
        @
        @@
172  NOT SIGN
         @
         @
  ______ @
 |____  |@
      |_|@
     $   @
         @
         @@
173  SOFT HYPHEN
        @
        @
  _____ @
 |_____|@
    $   @
    $   @
        @
        @@
174  REGISTERED SIGN
    ________   @
   /  ____  \\  @
  /  |  _ \\  \\ @
 |   | |_) |  |@
 |   |  _ <   |@
  \\  |_| \\_\\ / @
   \\________/  @
               @@
175  MACRON
  ______ @
 |______|@
     $   @
     $   @
     $   @
     $   @
         @
         @@
176  DEGREE SIGN
   __  @
  /  \\ @
 | () |@
  \\__/ @
    $  @
    $  @
       @
       @@
177  PLUS-MINUS SIGN
    _   @
  _| |_ @
 |_   _|@
   |_|  @
  _____ @
 |_____|@
        @
        @@
178  SUPERSCRIPT TWO
  ___ @
 |_  )@
  / / @
 /___|@
   $  @
   $  @
      @
      @@
179  SUPERSCRIPT THREE
  ____@
 |__ /@
  |_ \\@
 |___/@
   $  @
   $  @
      @
      @@
180  ACUTE ACCENT
  __@
 /_/@
  $ @
  $ @
  $ @
  $ @
    @
    @@
181  MICRO SIGN
        @
        @
  _   _ @
 | | | |@
 | |_| |@
 | ._,_|@
 | |    @
 |_|    @@
182  PILCROW SIGN
   ______ @
  /      |@
 | (| || |@
  \\__ || |@
    | || |@
    |_||_|@
          @
          @@
183  MIDDLE DOT
    @
    @
  _ @
 (_)@
  $ @
  $ @
    @
    @@
184  CEDILLA
    @
    @
    @
    @
    @
  _ @
 )_)@
    @@
185  SUPERSCRIPT ONE
  _ @
 / |@
 | |@
 |_|@
  $ @
  $ @
    @
    @@
186  MASCULINE ORDINAL INDICATOR
   ___  @
  / _ \\ @
 | (_) |@
  \\___/ @
 |_____|@
    $   @
        @
        @@
187  RIGHT-POINTING DOUBLE ANGLE QUOTATION MARK
 ____   @
 \\ \\ \\  @
  \\ \\ \\ @
   > > >@
  / / / @
 /_/_/  @
        @
        @@
188  VULGAR FRACTION ONE QUARTER
  _   __   @
 / | / /   @
 | |/ / _  @
 |_/ / | | @
  / /|_  _|@
 /_/   |_| @
           @
           @@
189  VULGAR FRACTION ONE HALF
  _   __  @
 / | / /  @
 | |/ /__ @
 |_/ /_  )@
  / / / / @
 /_/ /___|@
          @
          @@
190  VULGAR FRACTION THREE QUARTERS
  ____  __   @
 |__ / / /   @
  |_ \\/ / _  @
 |___/ / | | @
    / /|_  _|@
   /_/   |_| @
             @
             @@
191  INVERTED QUESTION MARK
    _  @
   (_) @
   | | @
  / /  @
 | (__ @
  \\___|@
       @
       @@
192  LATIN CAPITAL LETTER A WITH GRAVE
    __    @
    \\_\\   @
    / \\   @
   / _ \\  @
  / ___ \\ @
 /_/   \\_\\@
          @
          @@
193  LATIN CAPITAL LETTER A WITH ACUTE
     __   @
    /_/   @
    / \\   @
   / _ \\  @
  / ___ \\ @
 /_/   \\_\\@
          @
          @@
194  LATIN CAPITAL LETTER A WITH CIRCUMFLEX
    //\\   @
   |/_\\|  @
    / \\   @
   / _ \\  @
  / ___ \\ @
 /_/   \\_\\@
          @
          @@
195  LATIN CAPITAL LETTER A WITH TILDE
    /\\/|  @
   |/\\/   @
    / \\   @
   / _ \\  @
  / ___ \\ @
 /_/   \\_\\@
          @
          @@
196  LATIN CAPITAL LETTER A WITH DIAERESIS
   _   _  @
  (_)_(_) @
    / \\   @
   / _ \\  @
  / ___ \\ @
 /_/   \\_\\@
          @
          @@
197  LATIN CAPITAL LETTER A WITH RING ABOVE
     _    @
    (o)   @
    / \\   @
   / _ \\  @
  / ___ \\ @
 /_/   \\_\\@
          @
          @@
198  LATIN CAPITAL LETTER AE
      _______ @
     /   ____|@
    /   |__   @
   / /|  __|  @
  / ___ |____ @
 /_/  |______|@
              @
              @@
199  LATIN CAPITAL LETTER C WITH CEDILLA
   _____ @
  / ____|@
 | | $   @
 | | $   @
 | |____ @
  \\_____|@
    )_)  @
         @@
200  LATIN CAPITAL LETTER E WITH GRAVE
   __   @
  _\\_\\_ @
 | ____|@
 |  _|  @
 | |___ @
 |_____|@
        @
        @@
201  LATIN CAPITAL LETTER E WITH ACUTE
    __  @
  _/_/_ @
 | ____|@
 |  _|  @
 | |___ @
 |_____|@
        @
        @@
202  LATIN CAPITAL LETTER E WITH CIRCUMFLEX
   //\\  @
  |/ \\| @
 | ____|@
 |  _|  @
 | |___ @
 |_____|@
        @
        @@
203  LATIN CAPITAL LETTER E WITH DIAERESIS
  _   _ @
 (_) (_)@
 | ____|@
 |  _|  @
 | |___ @
 |_____|@
        @
        @@
204  LATIN CAPITAL LETTER I WITH GRAVE
  __  @
  \\_\\ @
 |_ _|@
  | | @
  | | @
 |___|@
      @
      @@
205  LATIN CAPITAL LETTER I WITH ACUTE
   __ @
  /_/ @
 |_ _|@
  | | @
  | | @
 |___|@
      @
      @@
206  LATIN CAPITAL LETTER I WITH CIRCUMFLEX
  //\\ @
 |/_\\|@
 |_ _|@
  | | @
  | | @
 |___|@
      @
      @@
207  LATIN CAPITAL LETTER I WITH DIAERESIS
  _   _ @
 (_)_(_)@
  |_ _| @
   | |  @
   | |  @
  |___| @
        @
        @@
208  LATIN CAPITAL LETTER ETH
    _____  @
   |  __ \\ @
  _| |_ | |@
 |__ __|| |@
   | |__| |@
   |_____/ @
           @
           @@
209  LATIN CAPITAL LETTER N WITH TILDE
   /\\/| @
  |/\\/_ @
 | \\ | |@
 |  \\| |@
 | |\\  |@
 |_| \\_|@
        @
        @@
210  LATIN CAPITAL LETTER O WITH GRAVE
   __   @
   \\_\\  @
  / _ \\ @
 | | | |@
 | |_| |@
  \\___/ @
        @
        @@
211  LATIN CAPITAL LETTER O WITH ACUTE
    __  @
   /_/  @
  / _ \\ @
 | | | |@
 | |_| |@
  \\___/ @
        @
        @@
212  LATIN CAPITAL LETTER O WITH CIRCUMFLEX
   //\\  @
  |/_\\| @
  / _ \\ @
 | | | |@
 | |_| |@
  \\___/ @
        @
        @@
213  LATIN CAPITAL LETTER O WITH TILDE
   /\\/| @
  |/\\/  @
  / _ \\ @
 | | | |@
 | |_| |@
  \\___/ @
        @
        @@
214  LATIN CAPITAL LETTER O WITH DIAERESIS
  _   _ @
 (_)_(_)@
  / _ \\ @
 | | | |@
 | |_| |@
  \\___/ @
        @
        @@
215  MULTIPLICATION SIGN
     @
     @
 /\\/\\@
 >  <@
 \\/\\/@
   $ @
     @
     @@
216  LATIN CAPITAL LETTER O WITH STROKE
   _____ @
  / __// @
 | | // |@
 | |//| |@
 | //_| |@
  //___/ @
         @
         @@
217  LATIN CAPITAL LETTER U WITH GRAVE
   __   @
  _\\_\\_ @
 | | | |@
 | | | |@
 | |_| |@
  \\___/ @
        @
        @@
218  LATIN CAPITAL LETTER U WITH ACUTE
    __  @
  _/_/_ @
 | | | |@
 | | | |@
 | |_| |@
  \\___/ @
        @
        @@
219  LATIN CAPITAL LETTER U WITH CIRCUMFLEX
   //\\  @
  |/ \\| @
 | | | |@
 | | | |@
 | |_| |@
  \\___/ @
        @
        @@
220  LATIN CAPITAL LETTER U WITH DIAERESIS
  _   _ @
 (_) (_)@
 | | | |@
 | | | |@
 | |_| |@
  \\___/ @
        @
        @@
221  LATIN CAPITAL LETTER Y WITH ACUTE
    __  @
 __/_/__@
 \\ \\ / /@
  \\ V / @
   | |  @
   |_|  @
        @
        @@
222  LATIN CAPITAL LETTER THORN
  _      @
 | |___  @
 |  __ \\ @
 | |__) |@
 |  ___/ @
 |_|     @
         @
         @@
223  LATIN SMALL LETTER SHARP S
   ___  @
  / _ \\ @
 | | ) |@
 | |< < @
 | | ) |@
 | ||_/ @
 |_|    @
        @@
224  LATIN SMALL LETTER A WITH GRAVE
   __   @
   \\_\\  @
   __ _ @
  / _\` |@
 | (_| |@
  \\__,_|@
        @
        @@
225  LATIN SMALL LETTER A WITH ACUTE
    __  @
   /_/  @
   __ _ @
  / _\` |@
 | (_| |@
  \\__,_|@
        @
        @@
226  LATIN SMALL LETTER A WITH CIRCUMFLEX
   //\\  @
  |/ \\| @
   __ _ @
  / _\` |@
 | (_| |@
  \\__,_|@
        @
        @@
227  LATIN SMALL LETTER A WITH TILDE
   /\\/| @
  |/\\/  @
   __ _ @
  / _\` |@
 | (_| |@
  \\__,_|@
        @
        @@
228  LATIN SMALL LETTER A WITH DIAERESIS
  _   _ @
 (_) (_)@
   __ _ @
  / _\` |@
 | (_| |@
  \\__,_|@
        @
        @@
229  LATIN SMALL LETTER A WITH RING ABOVE
    __  @
   (()) @
   __ _ @
  / _\` |@
 | (_| |@
  \\__,_|@
        @
        @@
230  LATIN SMALL LETTER AE
           @
           @
   __ ____ @
  / _\`  _ \\@
 | (_|  __/@
  \\__,____|@
           @
           @@
231  LATIN SMALL LETTER C WITH CEDILLA
       @
       @
   ___ @
  / __|@
 | (__ @
  \\___|@
   )_) @
       @@
232  LATIN SMALL LETTER E WITH GRAVE
   __  @
   \\_\\ @
   ___ @
  / _ \\@
 |  __/@
  \\___|@
       @
       @@
233  LATIN SMALL LETTER E WITH ACUTE
    __ @
   /_/ @
   ___ @
  / _ \\@
 |  __/@
  \\___|@
       @
       @@
234  LATIN SMALL LETTER E WITH CIRCUMFLEX
   //\\ @
  |/ \\|@
   ___ @
  / _ \\@
 |  __/@
  \\___|@
       @
       @@
235  LATIN SMALL LETTER E WITH DIAERESIS
  _   _ @
 (_) (_)@
   ___  @
  / _ \\ @
 |  __/ @
  \\___| @
        @
        @@
236  LATIN SMALL LETTER I WITH GRAVE
 __ @
 \\_\\@
  _ @
 | |@
 | |@
 |_|@
    @
    @@
237  LATIN SMALL LETTER I WITH ACUTE
  __@
 /_/@
  _ @
 | |@
 | |@
 |_|@
    @
    @@
238  LATIN SMALL LETTER I WITH CIRCUMFLEX
  //\\ @
 |/ \\|@
   _  @
  | | @
  | | @
  |_| @
      @
      @@
239  LATIN SMALL LETTER I WITH DIAERESIS
  _   _ @
 (_) (_)@
    _   @
   | |  @
   | |  @
   |_|  @
        @
        @@
240  LATIN SMALL LETTER ETH
  /\\/\\  @
  >  <  @
  \\/\\ \\ @
  / _\` |@
 | (_) |@
  \\___/ @
        @
        @@
241  LATIN SMALL LETTER N WITH TILDE
   /\\/| @
  |/\\/  @
  _ __  @
 | '_ \\ @
 | | | |@
 |_| |_|@
        @
        @@
242  LATIN SMALL LETTER O WITH GRAVE
   __   @
   \\_\\  @
   ___  @
  / _ \\ @
 | (_) |@
  \\___/ @
        @
        @@
243  LATIN SMALL LETTER O WITH ACUTE
    __  @
   /_/  @
   ___  @
  / _ \\ @
 | (_) |@
  \\___/ @
        @
        @@
244  LATIN SMALL LETTER O WITH CIRCUMFLEX
   //\\  @
  |/ \\| @
   ___  @
  / _ \\ @
 | (_) |@
  \\___/ @
        @
        @@
245  LATIN SMALL LETTER O WITH TILDE
   /\\/| @
  |/\\/  @
   ___  @
  / _ \\ @
 | (_) |@
  \\___/ @
        @
        @@
246  LATIN SMALL LETTER O WITH DIAERESIS
  _   _ @
 (_) (_)@
   ___  @
  / _ \\ @
 | (_) |@
  \\___/ @
        @
        @@
247  DIVISION SIGN
     _    @
    (_)   @
  _______ @
 |_______|@
     _    @
    (_)   @
          @
          @@
248  LATIN SMALL LETTER O WITH STROKE
         @
         @
   ____  @
  / _//\\ @
 | (//) |@
  \\//__/ @
         @
         @@
249  LATIN SMALL LETTER U WITH GRAVE
   __   @
   \\_\\  @
  _   _ @
 | | | |@
 | |_| |@
  \\__,_|@
        @
        @@
250  LATIN SMALL LETTER U WITH ACUTE
    __  @
   /_/  @
  _   _ @
 | | | |@
 | |_| |@
  \\__,_|@
        @
        @@
251  LATIN SMALL LETTER U WITH CIRCUMFLEX
   //\\  @
  |/ \\| @
  _   _ @
 | | | |@
 | |_| |@
  \\__,_|@
        @
        @@
252  LATIN SMALL LETTER U WITH DIAERESIS
  _   _ @
 (_) (_)@
  _   _ @
 | | | |@
 | |_| |@
  \\__,_|@
        @
        @@
253  LATIN SMALL LETTER Y WITH ACUTE
    __  @
   /_/  @
  _   _ @
 | | | |@
 | |_| |@
  \\__, |@
   __/ |@
  |___/ @@
254  LATIN SMALL LETTER THORN
  _     @
 | |    @
 | |__  @
 | '_ \\ @
 | |_) |@
 | .__/ @
 | |    @
 |_|    @@
255  LATIN SMALL LETTER Y WITH DIAERESIS
  _   _ @
 (_) (_)@
  _   _ @
 | | | |@
 | |_| |@
  \\__, |@
   __/ |@
  |___/ @@
0x02BC  MODIFIER LETTER APOSTROPHE
   @
   @
 ))@
   @
   @
   @
   @
   @@
0x02BD  MODIFIER LETTER REVERSED COMMA
   @
   @
 ((@
   @
   @
   @
   @
   @@
0x037A  GREEK YPOGEGRAMMENI
   @
   @
   @
   @
   @
   @
   @
 ||@@
0x0387  GREEK ANO TELEIA
    @
  $ @
  _ @
 (_)@
    @
  $ @
    @
    @@
0x0391  GREEK CAPITAL LETTER ALPHA
   ___  @
  / _ \\ @
 | |_| |@
 |  _  |@
 | | | |@
 |_| |_|@
        @
        @@
0x0392  GREEK CAPITAL LETTER BETA
  ____  @
 |  _ \\ @
 | |_) )@
 |  _ ( @
 | |_) )@
 |____/ @
        @
        @@
0x0393  GREEK CAPITAL LETTER GAMMA
  _____ @
 |  ___)@
 | |$   @
 | |$   @
 | |    @
 |_|    @
        @
        @@
0x0394  GREEK CAPITAL LETTER DELTA
           @
     /\\    @
    /  \\   @
   / /\\ \\  @
  / /__\\ \\ @
 /________\\@
           @
           @@
0x0395  GREEK CAPITAL LETTER EPSILON
  _____ @
 |  ___)@
 | |_   @
 |  _)  @
 | |___ @
 |_____)@
        @
        @@
0x0396  GREEK CAPITAL LETTER ZETA
  ______@
 (___  /@
    / / @
   / /  @
  / /__ @
 /_____)@
        @
        @@
0x0397  GREEK CAPITAL LETTER ETA
  _   _ @
 | | | |@
 | |_| |@
 |  _  |@
 | | | |@
 |_| |_|@
        @
        @@
0x0398  GREEK CAPITAL LETTER THETA
   ____  @
  / __ \\ @
 | |__| |@
 |  __  |@
 | |__| |@
  \\____/ @
         @
         @@
0x0399  GREEK CAPITAL LETTER IOTA
  ___ @
 (   )@
  | | @
  | | @
  | | @
 (___)@
      @
      @@
0x039A  GREEK CAPITAL LETTER KAPPA
  _   __@
 | | / /@
 | |/ / @
 |   <  @
 | |\\ \\ @
 |_| \\_\\@
        @
        @@
0x039B  GREEK CAPITAL LETTER LAMDA
           @
     /\\    @
    /  \\   @
   / /\\ \\  @
  / /  \\ \\ @
 /_/    \\_\\@
           @
           @@
0x039C  GREEK CAPITAL LETTER MU
  __   __ @
 |  \\ /  |@
 |   v   |@
 | |\\_/| |@
 | |   | |@
 |_|   |_|@
          @
          @@
0x039D  GREEK CAPITAL LETTER NU
  _   _ @
 | \\ | |@
 |  \\| |@
 |     |@
 | |\\  |@
 |_| \\_|@
        @
        @@
0x039E  GREEK CAPITAL LETTER XI
  _____ @
 (_____)@
   ___  @
  (___) @
  _____ @
 (_____)@
        @
        @@
0x039F  GREEK CAPITAL LETTER OMICRON
   ___  @
  / _ \\ @
 | | | |@
 | | | |@
 | |_| |@
  \\___/ @
        @
        @@
0x03A0  GREEK CAPITAL LETTER PI
  _______ @
 (   _   )@
  | | | | @
  | | | | @
  | | | | @
  |_| |_| @
          @
          @@
0x03A1  GREEK CAPITAL LETTER RHO
  ____  @
 |  _ \\ @
 | |_) )@
 |  __/ @
 | |    @
 |_|    @
        @
        @@
0x03A3  GREEK CAPITAL LETTER SIGMA
 ______ @
 \\  ___)@
  \\ \\   @
   > >  @
  / /__ @
 /_____)@
        @
        @@
0x03A4  GREEK CAPITAL LETTER TAU
  _____ @
 (_   _)@
   | |  @
   | |  @
   | |  @
   |_|  @
        @
        @@
0x03A5  GREEK CAPITAL LETTER UPSILON
  __   __ @
 (_ \\ / _)@
   \\ v /  @
    | |   @
    | |   @
    |_|   @
          @
          @@
0x03A6  GREEK CAPITAL LETTER PHI
     _    @
   _| |_  @
  /     \\ @
 ( (| |) )@
  \\_   _/ @
    |_|   @
          @
          @@
0x03A7  GREEK CAPITAL LETTER CHI
 __   __@
 \\ \\ / /@
  \\ v / @
   > <  @
  / ^ \\ @
 /_/ \\_\\@
        @
        @@
0x03A8  GREEK CAPITAL LETTER PSI
  _  _  _ @
 | || || |@
 | \\| |/ |@
  \\_   _/ @
    | |   @
    |_|   @
          @
          @@
0x03A9  GREEK CAPITAL LETTER OMEGA
    ____   @
   / __ \\  @
  | |  | | @
  | |  | | @
  _\\ \\/ /_ @
 (___||___)@
           @
           @@
0x03B1  GREEK SMALL LETTER ALPHA
         @
         @
   __  __@
  /  \\/ /@
 ( ()  < @
  \\__/\\_\\@
         @
         @@
0x03B2  GREEK SMALL LETTER BETA
   ___  @
  / _ \\ @
 | |_) )@
 |  _ < @
 | |_) )@
 |  __/ @
 | |    @
 |_|    @@
0x03B3  GREEK SMALL LETTER GAMMA
        @
        @
  _   _ @
 ( \\ / )@
  \\ v / @
   | |  @
   | |  @
   |_|  @@
0x03B4  GREEK SMALL LETTER DELTA
    __  @
   / _) @
   \\ \\  @
  / _ \\ @
 ( (_) )@
  \\___/ @
        @
        @@
0x03B5  GREEK SMALL LETTER EPSILON
      @
      @
  ___ @
 / __)@
 > _) @
 \\___)@
      @
      @@
0x03B6  GREEK SMALL LETTER ZETA
 _____  @
 \\__  ) @
   / /  @
  / /   @
 | |__  @
  \\__ \\ @
     ) )@
    (_/ @@
0x03B7  GREEK SMALL LETTER ETA
        @
        @
  _ __  @
 | '_ \\ @
 | | | |@
 |_| | |@
     | |@
     |_|@@
0x03B8  GREEK SMALL LETTER THETA
   ___  @
  / _ \\ @
 | |_| |@
 |  _  |@
 | |_| |@
  \\___/ @
        @
        @@
0x03B9  GREEK SMALL LETTER IOTA
     @
     @
  _  @
 | | @
 | | @
  \\_)@
     @
     @@
0x03BA  GREEK SMALL LETTER KAPPA
       @
       @
  _  __@
 | |/ /@
 |   < @
 |_|\\_\\@
       @
       @@
0x03BB  GREEK SMALL LETTER LAMDA
 __     @
 \\ \\    @
  \\ \\   @
   > \\  @
  / ^ \\ @
 /_/ \\_\\@
        @
        @@
0x03BC  GREEK SMALL LETTER MU
        @
        @
  _   _ @
 | | | |@
 | |_| |@
 | ._,_|@
 | |    @
 |_|    @@
0x03BD  GREEK SMALL LETTER NU
       @
       @
  _  __@
 | |/ /@
 | / / @
 |__/  @
       @
       @@
0x03BE  GREEK SMALL LETTER XI
 \\=\\__  @
  > __) @
 ( (_   @
  > _)  @
 ( (__  @
  \\__ \\ @
     ) )@
    (_/ @@
0x03BF  GREEK SMALL LETTER OMICRON
        @
        @
   ___  @
  / _ \\ @
 ( (_) )@
  \\___/ @
        @
        @@
0x03C0  GREEK SMALL LETTER PI
         @
         @
  ______ @
 (  __  )@
  | || | @
  |_||_| @
         @
         @@
0x03C1  GREEK SMALL LETTER RHO
        @
        @
   ___  @
  / _ \\ @
 | |_) )@
 |  __/ @
 | |    @
 |_|    @@
0x03C2  GREEK SMALL LETTER FINAL SIGMA
        @
        @
   ____ @
  / ___)@
 ( (__  @
  \\__ \\ @
    _) )@
   (__/ @@
0x03C3  GREEK SMALL LETTER SIGMA
        @
        @
   ____ @
  /  ._)@
 ( () ) @
  \\__/  @
        @
        @@
0x03C4  GREEK SMALL LETTER TAU
      @
      @
  ___ @
 (   )@
  | | @
   \\_)@
      @
      @@
0x03C5  GREEK SMALL LETTER UPSILON
        @
        @
  _   _ @
 | | | |@
 | |_| |@
  \\___/ @
        @
        @@
0x03C6  GREEK SMALL LETTER PHI
     _    @
    | |   @
   _| |_  @
  /     \\ @
 ( (| |) )@
  \\_   _/ @
    | |   @
    |_|   @@
0x03C7  GREEK SMALL LETTER CHI
        @
        @
 __   __@
 \\ \\ / /@
  \\ v / @
   > <  @
  / ^ \\ @
 /_/ \\_\\@@
0x03C8  GREEK SMALL LETTER PSI
          @
          @
  _  _  _ @
 | || || |@
 | \\| |/ |@
  \\_   _/ @
    | |   @
    |_|   @@
0x03C9  GREEK SMALL LETTER OMEGA
            @
            @
   __   __  @
  / / _ \\ \\ @
 | |_/ \\_| |@
  \\___^___/ @
            @
            @@
0x03D1  GREEK THETA SYMBOL
     ___    @
    / _ \\   @
   ( (_| |_ @
  _ \\ _   _)@
 | |___| |  @
  \\_____/   @
            @
            @@
0x03D5  GREEK PHI SYMBOL
          @
          @
  _   __  @
 | | /  \\ @
 | || || )@
  \\_   _/ @
    | |   @
    |_|   @@
0x03D6  GREEK PI SYMBOL
            @
            @
  _________ @
 (  _____  )@
 | |_/ \\_| |@
  \\___^___/ @
            @
            @@
-0x0005  
alpha = a, beta = b, gamma = g, delta = d, epsilon = e   @
zeta = z, eta = h, theta = q, iota = i, lamda = l, mu = m@
nu = n, xi = x, omicron = o, pi = p, rho = r, sigma = s  @
phi = f, chi = c, psi = y, omega = w, final sigma = V    @
     pi symbol = v, theta symbol = J, phi symbol = j     @
     middle dot = :, ypogegrammeni = _                   @
     rough breathing = (, smooth breathing = )           @
     acute accent = ', grave accent = \`, dialytika = ^   @@
`},Symbol.toStringTag,{value:"Module"})),qa=Object.freeze(Object.defineProperty({__proto__:null,default:`flf2a$ 8 6 27 0 10 0 576
Block by Glenn Chappell 4/93 -- straight version of Lean
Includes ISO Latin-1
figlet release 2.1 -- 12 Aug 1994
Permission is hereby given to modify this font, as long as the
modifier's name is placed on a comment line.

Modified by Paul Burton <solution@earthlink.net> 12/96 to include new parameter
supported by FIGlet and FIGWin.  May also be slightly modified for better use
of new full-width/kern/smush alternatives, but default output is NOT changed.

$  $@
$  $@
$  $@
$  $@
$  $@
$  $@
$  $@
$  $@@
   $$@
 _| $@
 _| $@
 _| $@
   $$@
 _| $@
   $$@
     @@
 _|  _| $@
 _|  _| $@
       $$@
   $$    @
   $$    @
   $$    @
         @
         @@
         $$  @
   _|  _|   $@
 _|_|_|_|_| $@
   _|  _|   $@
 _|_|_|_|_| $@
   _|  _|   $@
         $$  @
             @@
     $$  @
   _|   $@
 _|_|_| $@
 _|_|   $@
   _|_| $@
 _|_|_| $@
   _|   $@
     $$  @@
           $$@
 _|_|    _| $@
 _|_|  _|   $@
     _|     $@
   _|  _|_| $@
 _|    _|_| $@
           $$@
             @@
     $$      @
   _|   $    @
 _|  _|     $@
   _|_|  _| $@
 _|    _|   $@
   _|_|  _| $@
           $$@
             @@
   _| $@
 _|   $@
   $$  @
 $$    @
 $$    @
 $$    @
       @
       @@
   _| $@
 _|   $@
 _| $  @
 _| $  @
 _| $  @
 _|   $@
   _| $@
     $$@@
 _|   $@
   _| $@
   _| $@
   _| $@
   _| $@
   _| $@
 _|   $@
   $$  @@
           $$@
 _|  _|  _| $@
   _|_|_|   $@
 _|_|_|_|_| $@
   _|_|_|   $@
 _|  _|  _| $@
           $$@
             @@
       $$    @
     _| $    @
     _|     $@
 _|_|_|_|_| $@
     _|     $@
     _| $    @
       $$    @
             @@
       @
       @
       @
       @
     $$@
   _| $@
 _|   $@
   $$  @@
             @
             @
           $$@
 _|_|_|_|_| $@
           $$@
             @
             @
             @@
     @
     @
     @
     @
   $$@
 _| $@
   $$@
     @@
           $$@
         _| $@
       _|   $@
     _|   $  @
   _|   $    @
 _|   $      @
   $$        @
             @@
     $$  @
   _|   $@
 _|  _| $@
 _|  _| $@
 _|  _| $@
   _|   $@
     $$  @
         @@
     $$@
   _| $@
 _|_| $@
   _| $@
   _| $@
   _| $@
     $$@
       @@
       $$  @
   _|_|   $@
 _|    _| $@
     _|   $@
   _|     $@
 _|_|_|_| $@
         $$@
           @@
       $$  @
 _|_|_|   $@
       _| $@
   _|_|   $@
       _| $@
 _|_|_|   $@
       $$  @
           @@
       $$  @
 _|  _| $  @
 _|  _|   $@
 _|_|_|_| $@
     _|   $@
     _| $  @
       $$  @
           @@
         $$@
 _|_|_|_| $@
 _|       $@
 _|_|_|   $@
       _| $@
 _|_|_|   $@
       $$  @
           @@
         $$@
   _|_|_| $@
 _|       $@
 _|_|_|   $@
 _|    _| $@
   _|_|   $@
       $$  @
           @@
           $$@
 _|_|_|_|_| $@
         _| $@
       _|   $@
     _|   $  @
   _|   $    @
     $$      @
             @@
       $$  @
   _|_|   $@
 _|    _| $@
   _|_|   $@
 _|    _| $@
   _|_|   $@
       $$  @
           @@
       $$  @
   _|_|   $@
 _|    _| $@
   _|_|_| $@
       _| $@
 _|_|_|   $@
       $$  @
           @@
     @
   $$@
 _| $@
   $$@
   $$@
 _| $@
   $$@
     @@
       @
     $$@
   _| $@
     $$@
     $$@
   _| $@
 _|   $@
   $$  @@
       $$@
     _| $@
   _|   $@
 _|   $  @
   _|   $@
     _| $@
       $$@
         @@
             @
           $$@
 _|_|_|_|_| $@
           $$@
 _|_|_|_|_| $@
           $$@
             @
             @@
   $$    @
 _|   $  @
   _|   $@
     _| $@
   _|   $@
 _|   $  @
   $$    @
         @@
     $$  @
 _|_|   $@
     _| $@
 _|_|   $@
     $$  @
 _| $    @
   $$    @
         @@
               $$  @
     _|_|_|_|_|   $@
   _|          _| $@
 _|    _|_|_|  _| $@
 _|  _|    _|  _| $@
 _|    _|_|_|_|   $@
   _|             $@
     _|_|_|_|_|_| $@@
       $$  @
   _|_|   $@
 _|    _| $@
 _|_|_|_| $@
 _|    _| $@
 _|    _| $@
         $$@
           @@
       $$  @
 _|_|_|   $@
 _|    _| $@
 _|_|_|   $@
 _|    _| $@
 _|_|_|   $@
       $$  @
           @@
         $$@
   _|_|_| $@
 _|       $@
 _|   $    @
 _|       $@
   _|_|_| $@
         $$@
           @@
       $$  @
 _|_|_|   $@
 _|    _| $@
 _|    _| $@
 _|    _| $@
 _|_|_|   $@
       $$  @
           @@
         $$@
 _|_|_|_| $@
 _|       $@
 _|_|_| $  @
 _|       $@
 _|_|_|_| $@
         $$@
           @@
         $$@
 _|_|_|_| $@
 _|       $@
 _|_|_| $  @
 _|     $  @
 _| $      @
   $$      @
           @@
         $$@
   _|_|_| $@
 _|       $@
 _|  _|_| $@
 _|    _| $@
   _|_|_| $@
         $$@
           @@
         $$@
 _|    _| $@
 _|    _| $@
 _|_|_|_| $@
 _|    _| $@
 _|    _| $@
         $$@
           @@
       $$@
 _|_|_| $@
   _|   $@
   _| $  @
   _|   $@
 _|_|_| $@
       $$@
         @@
         $$@
       _| $@
       _| $@
       _| $@
 _|    _| $@
   _|_|   $@
       $$  @
           @@
         $$@
 _|    _| $@
 _|  _|   $@
 _|_|   $  @
 _|  _|   $@
 _|    _| $@
         $$@
           @@
   $$      @
 _| $      @
 _| $      @
 _| $      @
 _|       $@
 _|_|_|_| $@
         $$@
           @@
           $$@
 _|      _| $@
 _|_|  _|_| $@
 _|  _|  _| $@
 _|      _| $@
 _|      _| $@
           $$@
             @@
           $$@
 _|      _| $@
 _|_|    _| $@
 _|  _|  _| $@
 _|    _|_| $@
 _|      _| $@
           $$@
             @@
       $$  @
   _|_|   $@
 _|    _| $@
 _|    _| $@
 _|    _| $@
   _|_|   $@
       $$  @
           @@
       $$  @
 _|_|_|   $@
 _|    _| $@
 _|_|_|   $@
 _|     $  @
 _| $      @
   $$      @
           @@
       $$    @
   _|_|   $  @
 _|    _| $  @
 _|  _|_| $  @
 _|    _|   $@
   _|_|  _| $@
           $$@
             @@
       $$  @
 _|_|_|   $@
 _|    _| $@
 _|_|_|   $@
 _|    _| $@
 _|    _| $@
         $$@
           @@
         $$@
   _|_|_| $@
 _|       $@
   _|_|   $@
       _| $@
 _|_|_|   $@
       $$  @
           @@
           $$@
 _|_|_|_|_| $@
     _|     $@
     _| $    @
     _| $    @
     _| $    @
       $$    @
             @@
         $$@
 _|    _| $@
 _|    _| $@
 _|    _| $@
 _|    _| $@
   _|_|   $@
       $$  @
           @@
           $$@
 _|      _| $@
 _|      _| $@
 _|      _| $@
   _|  _|   $@
     _|   $  @
       $$    @
             @@
               $$@
 _|          _| $@
 _|          _| $@
 _|    _|    _| $@
   _|  _|  _|   $@
     _|  _|   $  @
           $$    @
                 @@
           $$@
 _|      _| $@
   _|  _|   $@
     _|   $  @
   _|  _|   $@
 _|      _| $@
           $$@
             @@
           $$@
 _|      _| $@
   _|  _|   $@
     _|   $  @
     _| $    @
     _| $    @
       $$    @
             @@
           $$@
 _|_|_|_|_| $@
       _|   $@
     _|   $  @
   _|       $@
 _|_|_|_|_| $@
           $$@
             @@
 _|_| $@
 _|   $@
 _| $  @
 _| $  @
 _| $  @
 _|   $@
 _|_| $@
     $$@@
   $$        @
 _|   $      @
   _|   $    @
     _|   $  @
       _|   $@
         _| $@
           $$@
             @@
 _|_| $@
   _| $@
   _| $@
   _| $@
   _| $@
   _| $@
 _|_| $@
     $$@@
   _|   $@
 _|  _| $@
       $$@
   $$    @
   $$    @
   $$    @
         @
         @@
             @
             @
     $$      @
     $$      @
     $$      @
     $$      @
           $$@
 _|_|_|_|_| $@@
 _|   $@
   _| $@
     $$@
   $$  @
   $$  @
   $$  @
       @
       @@
           @
         $$@
   _|_|_| $@
 _|    _| $@
 _|    _| $@
   _|_|_| $@
         $$@
           @@
   $$      @
 _|     $  @
 _|_|_|   $@
 _|    _| $@
 _|    _| $@
 _|_|_|   $@
       $$  @
           @@
           @
         $$@
   _|_|_| $@
 _|       $@
 _|       $@
   _|_|_| $@
         $$@
           @@
         $$@
       _| $@
   _|_|_| $@
 _|    _| $@
 _|    _| $@
   _|_|_| $@
         $$@
           @@
           @
       $$  @
   _|_|   $@
 _|_|_|_| $@
 _|       $@
   _|_|_| $@
         $$@
           @@
         $$@
     _|_| $@
   _|     $@
 _|_|_|_| $@
   _|     $@
   _| $    @
     $$    @
           @@
           @
         $$@
   _|_|_| $@
 _|    _| $@
 _|    _| $@
   _|_|_| $@
       _| $@
   _|_|   $@@
   $$      @
 _|     $  @
 _|_|_|   $@
 _|    _| $@
 _|    _| $@
 _|    _| $@
         $$@
           @@
   $$@
 _| $@
   $$@
 _| $@
 _| $@
 _| $@
   $$@
     @@
     $$@
   _| $@
     $$@
   _| $@
   _| $@
   _| $@
   _| $@
 _|   $@@
   $$      @
 _|     $  @
 _|  _| $  @
 _|_|   $  @
 _|  _|   $@
 _|    _| $@
         $$@
           @@
   $$@
 _| $@
 _| $@
 _| $@
 _| $@
 _| $@
   $$@
     @@
                 @
             $$  @
 _|_|_|  _|_|   $@
 _|    _|    _| $@
 _|    _|    _| $@
 _|    _|    _| $@
               $$@
                 @@
           @
       $$  @
 _|_|_|   $@
 _|    _| $@
 _|    _| $@
 _|    _| $@
         $$@
           @@
           @
       $$  @
   _|_|   $@
 _|    _| $@
 _|    _| $@
   _|_|   $@
       $$  @
           @@
           @
       $$  @
 _|_|_|   $@
 _|    _| $@
 _|    _| $@
 _|_|_|   $@
 _|     $  @
 _| $      @@
           @
         $$@
   _|_|_| $@
 _|    _| $@
 _|    _| $@
   _|_|_| $@
       _| $@
       _| $@@
           @
         $$@
 _|  _|_| $@
 _|_|     $@
 _|   $    @
 _| $      @
   $$      @
           @@
           @
         $$@
   _|_|_| $@
 _|_|     $@
     _|_| $@
 _|_|_|   $@
       $$  @
           @@
     $$    @
   _|     $@
 _|_|_|_|  @
   _|     $@
   _|     $@
     _|_| $@
         $$@
           @@
           @
         $$@
 _|    _| $@
 _|    _| $@
 _|    _| $@
   _|_|_| $@
         $$@
           @@
             @
           $$@
 _|      _| $@
 _|      _| $@
   _|  _|   $@
     _|   $  @
       $$    @
             @@
                     @
                   $$@
 _|      _|      _| $@
 _|      _|      _| $@
   _|  _|  _|  _|   $@
     _|      _|   $  @
               $$    @
                     @@
           @
         $$@
 _|    _| $@
   _|_|   $@
 _|    _| $@
 _|    _| $@
         $$@
           @@
           @
         $$@
 _|    _| $@
 _|    _| $@
 _|    _| $@
   _|_|_| $@
       _| $@
   _|_|   $@@
           @
         $$@
 _|_|_|_| $@
     _|   $@
   _|     $@
 _|_|_|_| $@
         $$@
           @@
     _| $@
   _|   $@
   _|   $@
 _|   $  @
   _|   $@
   _|   $@
     _| $@
       $$@@
 _| $@
 _| $@
 _| $@
 _| $@
 _| $@
 _| $@
 _| $@
 _| $@@
 _|   $  @
   _|   $@
   _|   $@
     _| $@
   _|   $@
   _|   $@
 _|   $  @
   $$    @@
   _|  _| $@
 _|  _|   $@
       $$  @
     $$    @
     $$    @
     $$    @
           @
           @@
 _|    _| $@
         $$@
   _|_|   $@
 _|    _| $@
 _|_|_|_| $@
 _|    _| $@
         $$@
           @@
 _|    _| $@
         $$@
   _|_|   $@
 _|    _| $@
 _|    _| $@
   _|_|   $@
       $$  @
           @@
 _|    _| $@
         $$@
 _|    _| $@
 _|    _| $@
 _|    _| $@
   _|_|   $@
       $$  @
           @@
 _|    _| $@
         $$@
   _|_|_| $@
 _|    _| $@
 _|    _| $@
   _|_|_| $@
         $$@
           @@
 _|    _| $@
         $$@
   _|_|   $@
 _|    _| $@
 _|    _| $@
   _|_|   $@
       $$  @
           @@
 _|    _| $@
         $$@
 _|    _| $@
 _|    _| $@
 _|    _| $@
   _|_|_| $@
         $$@
           @@
       $$  @
   _|_|   $@
 _|    _| $@
 _|  _|   $@
 _|    _| $@
 _|  _|   $@
 _|     $  @
   $$      @@
160  NO-BREAK SPACE
 $  $@
 $  $@
 $  $@
 $  $@
 $  $@
 $  $@
 $  $@
 $  $@@
161  INVERTED EXCLAMATION MARK
   $$@
 _| $@
   $$@
 _| $@
 _| $@
 _| $@
   $$@
     @@
162  CENT SIGN
       $$  @
     _|   $@
   _|_|_| $@
 _|  _|   $@
 _|  _|   $@
   _|_|_| $@
     _|   $@
       $$  @@
163  POUND SIGN
         $$    @
     _|_|   $  @
   _|    _| $  @
 _|_|_|     $  @
   _|         $@
 _|_|_|    _| $@
 _|_|  _|_|   $@
               @@
164  CURRENCY SIGN
             $$@
 _|        _| $@
   _|_|_|_|   $@
   _|    _| $  @
   _|    _| $  @
   _|_|_|_|   $@
 _|        _| $@
             $$@@
165  YEN SIGN
           $$@
 _|      _| $@
   _|  _|   $@
 _|_|_|_|_| $@
     _|     $@
 _|_|_|_|_| $@
     _|     $@
       $$    @@
166  BROKEN BAR
 _| $@
 _| $@
 _| $@
   $$@
   $$@
 _| $@
 _| $@
 _| $@@
167  SECTION SIGN
   _|_| $@
 _|     $@
   _|   $@
 _|  _| $@
   _|   $@
     _| $@
 _|_|   $@
     $$  @@
168  DIAERESIS
 _|    _| $@
         $$@
 $      $  @
 $      $  @
 $      $  @
 $      $  @
           @
           @@
169  COPYRIGHT SIGN
     _|_|_|_|   $  @
   _|        _|   $@
 _|    _|_|_|  _| $@
 _|  _|        _| $@
 _|  _|        _| $@
 _|    _|_|_|  _| $@
   _|        _|   $@
     _|_|_|_|   $  @@
170  FEMININE ORDINAL INDICATOR
         $$@
   _|_|_| $@
 _|    _| $@
   _|_|_| $@
         $$@
 _|_|_|_| $@
           @
           @@
171  LEFT-POINTING DOUBLE ANGLE QUOTATION MARK
           $$@
     _|  _| $@
   _|  _|   $@
 _|  _|   $  @
   _|  _|   $@
     _|  _| $@
           $$@
             @@
172  NOT SIGN
             @
             @
           $$@
 _|_|_|_|_| $@
         _| $@
           $$@
             @
             @@
173  SOFT HYPHEN
           @
           @
         $$@
 _|_|_|_| $@
         $$@
     $$    @
           @
           @@
174  REGISTERED SIGN
     _|_|_|_|   $  @
   _|        _|   $@
 _|  _|_|_|    _| $@
 _|  _|    _|  _| $@
 _|  _|_|_|    _| $@
 _|  _|    _|  _| $@
   _|        _|   $@
     _|_|_|_|   $  @@
175  MACRON
 _|_|_|_|_| $@
           $$@
     $$      @
     $$      @
     $$      @
     $$      @
             @
             @@
176  DEGREE SIGN
   _|   $@
 _|  _| $@
   _|   $@
     $$  @
   $$    @
   $$    @
         @
         @@
177  PLUS-MINUS SIGN
       $$    @
     _| $    @
     _|     $@
 _|_|_|_|_| $@
     _|     $@
 _|_|_|_|_| $@
           $$@
             @@
178  SUPERSCRIPT TWO
     $$  @
 _|_|   $@
     _| $@
   _|   $@
 _|_|_| $@
       $$@
         @
         @@
179  SUPERSCRIPT THREE
       $$@
 _|_|_| $@
   _|   $@
     _| $@
 _|_|   $@
     $$  @
         @
         @@
180  ACUTE ACCENT
   _| $@
 _|   $@
   $$  @
 $$    @
 $$    @
 $$    @
       @
       @@
181  MICRO SIGN
           @
         $$@
 _|    _| $@
 _|    _| $@
 _|    _| $@
 _|_|_|_| $@
 _|       $@
 _| $      @@
182  PILCROW SIGN
           $$@
   _|_|_|_| $@
 _|_|_|  _| $@
   _|_|  _| $@
     _|  _| $@
     _|  _| $@
           $$@
             @@
183  MIDDLE DOT
     @
     @
   $$@
 _| $@
   $$@
 $$  @
     @
     @@
184  CEDILLA
       @
       @
       @
       @
       @
     $$@
   _| $@
 _|_| $@@
185  SUPERSCRIPT ONE
     $$@
   _| $@
 _|_| $@
   _| $@
   _| $@
     $$@
       @
       @@
186  MASCULINE ORDINAL INDICATOR
       $$  @
   _|_|   $@
 _|    _| $@
   _|_|   $@
         $$@
 _|_|_|_| $@
           @
           @@
187  RIGHT-POINTING DOUBLE ANGLE QUOTATION MARK
       $$    @
 _|  _|   $  @
   _|  _|   $@
     _|  _| $@
   _|  _|   $@
 _|  _|   $  @
       $$    @
             @@
188  VULGAR FRACTION ONE QUARTER
               $$        @
   _|        _|       $  @
 _|_|      _|  _|  _| $  @
   _|    _|    _|  _|   $@
   _|  _|      _|_|_|_| $@
     _|            _|   $@
                     $$  @
                         @@
189  VULGAR FRACTION ONE HALF
               $$      @
   _|        _|     $  @
 _|_|      _|  _|_|   $@
   _|    _|        _| $@
   _|  _|        _|   $@
     _|        _|_|_| $@
                     $$@
                       @@
190  VULGAR FRACTION THREE QUARTERS
               $$        @
 _|_|_|      _|       $  @
   _|      _|  _|  _| $  @
     _|  _|    _|  _|   $@
 _|_|  _|      _|_|_|_| $@
     _|            _|   $@
                     $$  @
                         @@
191  INVERTED QUESTION MARK
       $$@
     _| $@
       $$@
   _|_| $@
 _|     $@
   _|_| $@
       $$@
         @@
192  LATIN CAPITAL LETTER A WITH GRAVE
   _|   $  @
     _| $  @
   _|_|   $@
 _|    _| $@
 _|_|_|_| $@
 _|    _| $@
         $$@
           @@
193  LATIN CAPITAL LETTER A WITH ACUTE
     _| $  @
   _|   $  @
   _|_|   $@
 _|    _| $@
 _|_|_|_| $@
 _|    _| $@
         $$@
           @@
194  LATIN CAPITAL LETTER A WITH CIRCUMFLEX
   _|_|   $@
 _|    _| $@
         $$@
   _|_|   $@
 _|_|_|_| $@
 _|    _| $@
         $$@
           @@
195  LATIN CAPITAL LETTER A WITH TILDE
   _|  _| $@
 _|  _|   $@
       $$  @
   _|_|   $@
 _|_|_|_| $@
 _|    _| $@
         $$@
           @@
196  LATIN CAPITAL LETTER A WITH DIAERESIS
 _|    _| $@
         $$@
   _|_|   $@
 _|    _| $@
 _|_|_|_| $@
 _|    _| $@
         $$@
           @@
197  LATIN CAPITAL LETTER A WITH RING ABOVE
   _|_|   $@
 _|    _| $@
   _|_|   $@
 _|    _| $@
 _|_|_|_| $@
 _|    _| $@
         $$@
           @@
198  LATIN CAPITAL LETTER AE
               $$@
   _|_|_|_|_|_| $@
 _|    _|       $@
 _|_|_|_|_|_| $  @
 _|    _|       $@
 _|    _|_|_|_| $@
               $$@
                 @@
199  LATIN CAPITAL LETTER C WITH CEDILLA
         $$@
   _|_|_| $@
 _|       $@
 _|   $    @
 _|       $@
   _|_|_| $@
     _|   $@
   _|_| $  @@
200  LATIN CAPITAL LETTER E WITH GRAVE
   _|   $  @
     _|   $@
 _|_|_|_| $@
 _|_|_| $  @
 _|       $@
 _|_|_|_| $@
         $$@
           @@
201  LATIN CAPITAL LETTER E WITH ACUTE
     _| $  @
   _|     $@
 _|_|_|_| $@
 _|_|_| $  @
 _|       $@
 _|_|_|_| $@
         $$@
           @@
202  LATIN CAPITAL LETTER E WITH CIRCUMFLEX
   _|_|   $@
 _|    _| $@
 _|_|_|_| $@
 _|_|_| $  @
 _|       $@
 _|_|_|_| $@
         $$@
           @@
203  LATIN CAPITAL LETTER E WITH DIAERESIS
 _|    _| $@
         $$@
 _|_|_|_| $@
 _|_|_| $  @
 _|       $@
 _|_|_|_| $@
         $$@
           @@
204  LATIN CAPITAL LETTER I WITH GRAVE
 _|   $  @
   _|   $@
 _|_|_| $@
   _|   $@
   _|   $@
 _|_|_| $@
       $$@
         @@
205  LATIN CAPITAL LETTER I WITH ACUTE
     _| $@
   _|   $@
 _|_|_| $@
   _|   $@
   _|   $@
 _|_|_| $@
       $$@
         @@
206  LATIN CAPITAL LETTER I WITH CIRCUMFLEX
   _|   $@
 _|  _| $@
 _|_|_| $@
   _|   $@
   _|   $@
 _|_|_| $@
       $$@
         @@
207  LATIN CAPITAL LETTER I WITH DIAERESIS
 _|  _| $@
       $$@
 _|_|_| $@
   _|   $@
   _|   $@
 _|_|_| $@
       $$@
         @@
208  LATIN CAPITAL LETTER ETH
         $$  @
   _|_|_|   $@
   _|    _| $@
 _|_|_|  _| $@
   _|    _| $@
   _|_|_|   $@
         $$  @
             @@
209  LATIN CAPITAL LETTER N WITH TILDE
   _|  _| $@
 _|  _|   $@
 _|    _| $@
 _|_|  _| $@
 _|  _|_| $@
 _|    _| $@
         $$@
           @@
210  LATIN CAPITAL LETTER O WITH GRAVE
   _|   $  @
     _| $  @
   _|_|   $@
 _|    _| $@
 _|    _| $@
   _|_|   $@
       $$  @
           @@
211  LATIN CAPITAL LETTER O WITH ACUTE
     _| $  @
   _|   $  @
   _|_|   $@
 _|    _| $@
 _|    _| $@
   _|_|   $@
       $$  @
           @@
212  LATIN CAPITAL LETTER O WITH CIRCUMFLEX
   _|_|   $@
 _|    _| $@
   _|_|   $@
 _|    _| $@
 _|    _| $@
   _|_|   $@
       $$  @
           @@
213  LATIN CAPITAL LETTER O WITH TILDE
   _|  _| $@
 _|  _|   $@
   _|_|   $@
 _|    _| $@
 _|    _| $@
   _|_|   $@
       $$  @
           @@
214  LATIN CAPITAL LETTER O WITH DIAERESIS
 _|    _| $@
         $$@
   _|_|   $@
 _|    _| $@
 _|    _| $@
   _|_|   $@
       $$  @
           @@
215  MULTIPLICATION SIGN
         @
       $$@
 _|  _| $@
   _|   $@
 _|  _| $@
       $$@
         @
         @@
216  LATIN CAPITAL LETTER O WITH STROKE
           $$@
   _|_|_|_| $@
 _|    _|_| $@
 _|  _|  _| $@
 _|_|    _| $@
 _|_|_|_|   $@
         $$  @
             @@
217  LATIN CAPITAL LETTER U WITH GRAVE
   _|   $  @
     _| $  @
         $$@
 _|    _| $@
 _|    _| $@
   _|_|   $@
       $$  @
           @@
218  LATIN CAPITAL LETTER U WITH ACUTE
     _| $  @
   _|   $  @
         $$@
 _|    _| $@
 _|    _| $@
   _|_|   $@
       $$  @
           @@
219  LATIN CAPITAL LETTER U WITH CIRCUMFLEX
   _|_|   $@
 _|    _| $@
         $$@
 _|    _| $@
 _|    _| $@
   _|_|   $@
       $$  @
           @@
220  LATIN CAPITAL LETTER U WITH DIAERESIS
 _|    _| $@
         $$@
 _|    _| $@
 _|    _| $@
 _|    _| $@
   _|_|   $@
       $$  @
           @@
221  LATIN CAPITAL LETTER Y WITH ACUTE
       _| $  @
     _|     $@
 _|      _| $@
   _|  _|   $@
     _|   $  @
     _| $    @
       $$    @
             @@
222  LATIN CAPITAL LETTER THORN
   $$      @
 _|     $  @
 _|_|_|   $@
 _|    _| $@
 _|_|_|   $@
 _|     $  @
   $$      @
           @@
223  LATIN SMALL LETTER SHARP S
       $$  @
   _|_|   $@
 _|    _| $@
 _|  _|   $@
 _|    _| $@
 _|  _|   $@
 _|     $  @
   $$      @@
224  LATIN SMALL LETTER A WITH GRAVE
   _|   $  @
     _| $  @
         $$@
   _|_|_| $@
 _|    _| $@
   _|_|_| $@
         $$@
           @@
225  LATIN SMALL LETTER A WITH ACUTE
       _| $@
     _|   $@
         $$@
   _|_|_| $@
 _|    _| $@
   _|_|_| $@
         $$@
           @@
226  LATIN SMALL LETTER A WITH CIRCUMFLEX
     _|   $@
   _|  _| $@
         $$@
   _|_|_| $@
 _|    _| $@
   _|_|_| $@
         $$@
           @@
227  LATIN SMALL LETTER A WITH TILDE
   _|  _| $@
 _|  _|   $@
         $$@
   _|_|_| $@
 _|    _| $@
   _|_|_| $@
         $$@
           @@
228  LATIN SMALL LETTER A WITH DIAERESIS
 _|    _| $@
         $$@
   _|_|_| $@
 _|    _| $@
 _|    _| $@
   _|_|_| $@
         $$@
           @@
229  LATIN SMALL LETTER A WITH RING ABOVE
     _|   $@
   _|  _| $@
     _|   $@
   _|_|_| $@
 _|    _| $@
   _|_|_| $@
         $$@
           @@
230  LATIN SMALL LETTER AE
                   @
               $$  @
   _|_|_|  _|_|   $@
 _|    _|_|_|_|_| $@
 _|    _|_|       $@
   _|_|_|  _|_|_| $@
                 $$@
                   @@
231  LATIN SMALL LETTER C WITH CEDILLA
           @
         $$@
   _|_|_| $@
 _|       $@
 _|       $@
   _|_|_| $@
     _|   $@
   _|_| $  @@
232  LATIN SMALL LETTER E WITH GRAVE
   _|     $@
     _| $  @
   _|_|   $@
 _|_|_|_| $@
 _|       $@
   _|_|_| $@
         $$@
           @@
233  LATIN SMALL LETTER E WITH ACUTE
       _| $@
     _|   $@
   _|_|   $@
 _|_|_|_| $@
 _|       $@
   _|_|_| $@
         $$@
           @@
234  LATIN SMALL LETTER E WITH CIRCUMFLEX
   _|_|   $@
 _|    _| $@
   _|_|   $@
 _|_|_|_| $@
 _|       $@
   _|_|_| $@
         $$@
           @@
235  LATIN SMALL LETTER E WITH DIAERESIS
 _|    _| $@
         $$@
   _|_|   $@
 _|_|_|_| $@
 _|       $@
   _|_|_| $@
         $$@
           @@
236  LATIN SMALL LETTER I WITH GRAVE
 _|   $@
   _| $@
     $$@
   _| $@
   _| $@
   _| $@
     $$@
       @@
237  LATIN SMALL LETTER I WITH ACUTE
   _| $@
 _|   $@
   $$  @
 _| $  @
 _| $  @
 _| $  @
   $$  @
       @@
238  LATIN SMALL LETTER I WITH CIRCUMFLEX
   _|   $@
 _|  _| $@
       $$@
   _| $  @
   _| $  @
   _| $  @
     $$  @
         @@
239  LATIN SMALL LETTER I WITH DIAERESIS
 _|  _| $@
       $$@
   _| $  @
   _| $  @
   _| $  @
   _| $  @
     $$  @
         @@
240  LATIN SMALL LETTER ETH
 _|  _| $  @
   _|   $  @
 _|  _|   $@
   _|_|_| $@
 _|    _| $@
   _|_|   $@
       $$  @
           @@
241  LATIN SMALL LETTER N WITH TILDE
   _|  _| $@
 _|  _|   $@
       $$  @
 _|_|_|   $@
 _|    _| $@
 _|    _| $@
         $$@
           @@
242  LATIN SMALL LETTER O WITH GRAVE
   _|   $  @
     _| $  @
       $$  @
   _|_|   $@
 _|    _| $@
   _|_|   $@
       $$  @
           @@
243  LATIN SMALL LETTER O WITH ACUTE
     _| $  @
   _|   $  @
       $$  @
   _|_|   $@
 _|    _| $@
   _|_|   $@
       $$  @
           @@
244  LATIN SMALL LETTER O WITH CIRCUMFLEX
   _|_|   $@
 _|    _| $@
         $$@
   _|_|   $@
 _|    _| $@
   _|_|   $@
       $$  @
           @@
245  LATIN SMALL LETTER O WITH TILDE
   _|_|_| $@
 _|  _|   $@
       $$  @
   _|_|   $@
 _|    _| $@
   _|_|   $@
       $$  @
           @@
246  LATIN SMALL LETTER O WITH DIAERESIS
 _|    _| $@
         $$@
   _|_|   $@
 _|    _| $@
 _|    _| $@
   _|_|   $@
       $$  @
           @@
247  DIVISION SIGN
       $$    @
     _| $    @
           $$@
 _|_|_|_|_| $@
           $$@
     _| $    @
       $$    @
             @@
248  LATIN SMALL LETTER O WITH STROKE
           @
         $$@
   _|_|_| $@
 _|  _|_| $@
 _|_|  _| $@
 _|_|_|   $@
       $$  @
           @@
249  LATIN SMALL LETTER U WITH GRAVE
 _|   $    @
   _| $    @
         $$@
 _|    _| $@
 _|    _| $@
   _|_|_| $@
         $$@
           @@
250  LATIN SMALL LETTER U WITH ACUTE
       _| $@
     _|   $@
         $$@
 _|    _| $@
 _|    _| $@
   _|_|_| $@
         $$@
           @@
251  LATIN SMALL LETTER U WITH CIRCUMFLEX
   _|_|   $@
 _|    _| $@
         $$@
 _|    _| $@
 _|    _| $@
   _|_|_| $@
         $$@
           @@
252  LATIN SMALL LETTER U WITH DIAERESIS
 _|    _| $@
         $$@
 _|    _| $@
 _|    _| $@
 _|    _| $@
   _|_|_| $@
         $$@
           @@
253  LATIN SMALL LETTER Y WITH ACUTE
     _| $  @
   _|   $  @
         $$@
 _|    _| $@
 _|    _| $@
   _|_|_| $@
       _| $@
   _|_|   $@@
254  LATIN SMALL LETTER THORN
   $$      @
 _|     $  @
 _|_|_|   $@
 _|    _| $@
 _|    _| $@
 _|_|_|   $@
 _|     $  @
 _| $      @@
255  LATIN SMALL LETTER Y WITH DIAERESIS
 _|    _| $@
         $$@
 _|    _| $@
 _|    _| $@
 _|    _| $@
   _|_|_| $@
       _| $@
   _|_|   $@@
`},Symbol.toStringTag,{value:"Module"})),za=Object.freeze(Object.defineProperty({__proto__:null,default:`flf2a$ 8 6 14 15 16
DOOM by Frans P. de Vries <fpv@xymph.iaf.nl>  18 Jun 1996
based on Big by Glenn Chappell 4/93 -- based on Standard
figlet release 2.1 -- 12 Aug 1994
Permission is hereby given to modify this font, as long as the
modifier's name is placed on a comment line.

Explanation of first line:
flf2 - "magic number" for file identification
a    - should always be \`a', for now
$    - the "hardblank" -- prints as a blank, but can't be smushed
8    - height of a character
6    - height of a character, not including descenders
14   - max line length (excluding comment lines) + a fudge factor
15   - default smushmode for this font
16   - number of comment lines

$@
$@
$@
$@
$@
$@
$@
$@@
 _ @
| |@
| |@
| |@
|_|@
(_)@
   @
   @@
 _ _ @
( | )@
 V V @
  $  @
  $  @
  $  @
     @
     @@
   _  _   @
 _| || |_ @
|_  __  _|@
 _| || |_ @
|_  __  _|@
  |_||_|  @
          @
          @@
  _  @
 | | @
/ __)@
\\__ \\@
(   /@
 |_| @
     @
     @@
 _   __@
(_) / /@
   / / @
  / /  @
 / / _ @
/_/ (_)@
       @
       @@
        @
  ___   @
 ( _ )  @
 / _ \\/\\@
| (_>  <@
 \\___/\\/@
        @
        @@
 _ @
( )@
|/ @
 $ @
 $ @
 $ @
   @
   @@
  __@
 / /@
| | @
| | @
| | @
| | @
 \\_\\@
    @@
__  @
\\ \\ @
 | |@
 | |@
 | |@
 | |@
/_/ @
    @@
    _    @
 /\\| |/\\ @
 \\ \` ' / @
|_     _|@
 / , . \\ @
 \\/|_|\\/ @
         @
         @@
       @
   _   @
 _| |_ @
|_   _|@
  |_|  @
   $   @
       @
       @@
   @
   @
   @
   @
 _ @
( )@
|/ @
   @@
        @
        @
 ______ @
|______|@
    $   @
    $   @
        @
        @@
   @
   @
   @
   @
 _ @
(_)@
   @
   @@
     __@
    / /@
   / / @
  / /  @
 / /   @
/_/    @
       @
       @@
 _____ @
|  _  |@
| |/' |@
|  /| |@
\\ |_/ /@
 \\___/ @
       @
       @@
 __  @
/  | @
\`| | @
 | | @
_| |_@
\\___/@
     @
     @@
 _____ @
/ __  \\@
\`' / /'@
  / /  @
./ /___@
\\_____/@
       @
       @@
 _____ @
|____ |@
    / /@
  $ \\ \\@
.___/ /@
\\____/ @
       @
       @@
   ___ @
  /   |@
 / /| |@
/ /_| |@
\\___  |@
    |_/@
       @
       @@
 _____ @
|  ___|@
|___ \\ @
    \\ \\@
/\\__/ /@
\\____/ @
       @
       @@
  ____ @
 / ___|@
/ /___ @
| ___ \\@
| \\_/ |@
\\_____/@
       @
       @@
 ______@
|___  /@
  $/ / @
  / /  @
./ /   @
\\_/    @
       @
       @@
 _____ @
|  _  |@
 \\ V / @
 / _ \\ @
| |_| |@
\\_____/@
       @
       @@
 _____ @
|  _  |@
| |_| |@
\\____ |@
.___/ /@
\\____/ @
       @
       @@
   @
 _ @
(_)@
 $ @
 _ @
(_)@
   @
   @@
   @
 _ @
(_)@
 $ @
 _ @
( )@
|/ @
   @@
   __@
  / /@
 / / @
< <  @
 \\ \\ @
  \\_\\@
     @
     @@
        @
 ______ @
|______|@
 ______ @
|______|@
        @
        @
        @@
__   @
\\ \\  @
 \\ \\ @
  > >@
 / / @
/_/  @
     @
     @@
 ___  @
|__ \\ @
   ) |@
  / / @
 |_|  @
 (_)  @
      @
      @@
         @
   ____  @
  / __ \\ @
 / / _\` |@
| | (_| |@
 \\ \\__,_|@
  \\____/ @
         @@
  ___  @
 / _ \\ @
/ /_\\ \\@
|  _  |@
| | | |@
\\_| |_/@
       @
       @@
______ @
| ___ \\@
| |_/ /@
| ___ \\@
| |_/ /@
\\____/ @
       @
       @@
 _____ @
/  __ \\@
| /  \\/@
| |    @
| \\__/\\@
 \\____/@
       @
       @@
______ @
|  _  \\@
| | | |@
| | | |@
| |/ / @
|___/  @
       @
       @@
 _____ @
|  ___|@
| |__  @
|  __| @
| |___ @
\\____/ @
       @
       @@
______ @
|  ___|@
| |_   @
|  _|  @
| |    @
\\_|    @
       @
       @@
 _____ @
|  __ \\@
| |  \\/@
| | __ @
| |_\\ \\@
 \\____/@
       @
       @@
 _   _ @
| | | |@
| |_| |@
|  _  |@
| | | |@
\\_| |_/@
       @
       @@
 _____ @
|_   _|@
  | |  @
  | |  @
 _| |_ @
 \\___/ @
       @
       @@
   ___ @
  |_  |@
  $ | |@
    | |@
/\\__/ /@
\\____/ @
       @
       @@
 _   __@
| | / /@
| |/ / @
|    \\ @
| |\\  \\@
\\_| \\_/@
       @
       @@
 _     @
| | $  @
| | $  @
| |    @
| |____@
\\_____/@
       @
       @@
___  ___@
|  \\/  |@
| .  . |@
| |\\/| |@
| |  | |@
\\_|  |_/@
        @
        @@
 _   _ @
| \\ | |@
|  \\| |@
| . \` |@
| |\\  |@
\\_| \\_/@
       @
       @@
 _____ @
|  _  |@
| | | |@
| | | |@
\\ \\_/ /@
 \\___/ @
       @
       @@
______ @
| ___ \\@
| |_/ /@
|  __/ @
| |    @
\\_|    @
       @
       @@
 _____ @
|  _  |@
| | | |@
| | | |@
\\ \\/' /@
 \\_/\\_\\@
       @
       @@
______ @
| ___ \\@
| |_/ /@
|    / @
| |\\ \\ @
\\_| \\_|@
       @
       @@
 _____ @
/  ___|@
\\ \`--. @
 \`--. \\@
/\\__/ /@
\\____/ @
       @
       @@
 _____ @
|_   _|@
  | |  @
  | |  @
  | |  @
  \\_/  @
       @
       @@
 _   _ @
| | | |@
| | | |@
| | | |@
| |_| |@
 \\___/ @
       @
       @@
 _   _ @
| | | |@
| | | |@
| | | |@
\\ \\_/ /@
 \\___/ @
       @
       @@
 _    _ @
| |  | |@
| |  | |@
| |/\\| |@
\\  /\\  /@
 \\/  \\/ @
        @
        @@
__   __@
\\ \\ / /@
 \\ V / @
 /   \\ @
/ /^\\ \\@
\\/   \\/@
       @
       @@
__   __@
\\ \\ / /@
 \\ V / @
  \\ /  @
  | |  @
  \\_/  @
       @
       @@
 ______@
|___  /@
  $/ / @
  / /  @
./ /___@
\\_____/@
       @
       @@
 ___ @
|  _|@
| |  @
| |  @
| |  @
| |_ @
|___|@
     @@
__     @
\\ \\    @
 \\ \\   @
  \\ \\  @
   \\ \\ @
    \\_\\@
       @
       @@
 ___ @
|_  |@
  | |@
  | |@
  | |@
 _| |@
|___|@
     @@
 /\\ @
|/\\|@
  $ @
  $ @
  $ @
  $ @
    @
    @@
        @
        @
        @
        @
        @
    $   @
 ______ @
|______|@@
 _ @
( )@
 \\|@
 $ @
 $ @
 $ @
   @
   @@
       @
       @
  __ _ @
 / _\` |@
| (_| |@
 \\__,_|@
       @
       @@
 _     @
| |    @
| |__  @
| '_ \\ @
| |_) |@
|_.__/ @
       @
       @@
      @
      @
  ___ @
 / __|@
| (__ @
 \\___|@
      @
      @@
     _ @
    | |@
  __| |@
 / _\` |@
| (_| |@
 \\__,_|@
       @
       @@
      @
      @
  ___ @
 / _ \\@
|  __/@
 \\___|@
      @
      @@
  __ @
 / _|@
| |_ @
|  _|@
| |  @
|_|  @
     @
     @@
       @
       @
  __ _ @
 / _\` |@
| (_| |@
 \\__, |@
  __/ |@
 |___/ @@
 _     @
| |    @
| |__  @
| '_ \\ @
| | | |@
|_| |_|@
       @
       @@
 _ @
(_)@
 _ @
| |@
| |@
|_|@
   @
   @@
   _ @
  (_)@
   _ @
  | |@
  | |@
  | |@
 _/ |@
|__/ @@
 _    @
| |   @
| | __@
| |/ /@
|   < @
|_|\\_\\@
      @
      @@
 _ @
| |@
| |@
| |@
| |@
|_|@
   @
   @@
           @
           @
 _ __ ___  @
| '_ \` _ \\ @
| | | | | |@
|_| |_| |_|@
           @
           @@
       @
       @
 _ __  @
| '_ \\ @
| | | |@
|_| |_|@
       @
       @@
       @
       @
  ___  @
 / _ \\ @
| (_) |@
 \\___/ @
       @
       @@
       @
       @
 _ __  @
| '_ \\ @
| |_) |@
| .__/ @
| |    @
|_|    @@
       @
       @
  __ _ @
 / _\` |@
| (_| |@
 \\__, |@
    | |@
    |_|@@
      @
      @
 _ __ @
| '__|@
| |   @
|_|   @
      @
      @@
     @
     @
 ___ @
/ __|@
\\__ \\@
|___/@
     @
     @@
 _   @
| |  @
| |_ @
| __|@
| |_ @
 \\__|@
     @
     @@
       @
       @
 _   _ @
| | | |@
| |_| |@
 \\__,_|@
       @
       @@
       @
       @
__   __@
\\ \\ / /@
 \\ V / @
  \\_/  @
       @
       @@
          @
          @
__      __@
\\ \\ /\\ / /@
 \\ V  V / @
  \\_/\\_/  @
          @
          @@
      @
      @
__  __@
\\ \\/ /@
 >  < @
/_/\\_\\@
      @
      @@
       @
       @
 _   _ @
| | | |@
| |_| |@
 \\__, |@
  __/ |@
 |___/ @@
     @
     @
 ____@
|_  /@
 / / @
/___|@
     @
     @@
   __@
  / /@
 | | @
/ /  @
\\ \\  @
 | | @
  \\_\\@
     @@
 _ @
| |@
| |@
| |@
| |@
| |@
| |@
|_|@@
__   @
\\ \\  @
 | | @
  \\ \\@
  / /@
 | | @
/_/  @
     @@
 /\\/|@
|/\\/ @
  $  @
  $  @
  $  @
  $  @
     @
     @@
 _   _ @
(_)_(_)@
 / _ \\ @
/ /_\\ \\@
|  _  |@
\\_| |_/@
       @
       @@
 _   _ @
(_)_(_)@
|  _  |@
| | | |@
\\ \\_/ /@
 \\___/ @
       @
       @@
 _   _ @
(_) (_)@
| | | |@
| | | |@
| |_| |@
 \\___/ @
       @
       @@
 _   _ @
(_) (_)@
  __ _ @
 / _\` |@
| (_| |@
 \\__,_|@
       @
       @@
 _   _ @
(_) (_)@
  ___  @
 / _ \\ @
| (_) |@
 \\___/ @
       @
       @@
 _   _ @
(_) (_)@
 _   _ @
| | | |@
| |_| |@
 \\__,_|@
       @
       @@
  ___  @
 / _ \\ @
| | ) |@
| |< < @
| | ) |@
| ||_/ @
\\_|    @
       @@
`},Symbol.toStringTag,{value:"Module"})),Qa=Object.freeze(Object.defineProperty({__proto__:null,default:`flf2a$ 8 6 27 0 10 0 576
Lean by Glenn Chappell 4/93 -- based on various .sig's
Includes ISO Latin-1
figlet release 2.1 -- 12 Aug 1994
Permission is hereby given to modify this font, as long as the
modifier's name is placed on a comment line.

Modified by Paul Burton <solution@earthlink.net> 12/96 to include new parameter
supported by FIGlet and FIGWin.  May also be slightly modified for better use
of new full-width/kern/smush alternatives, but default output is NOT changed.

       $  $@
      $  $ @
     $  $  @
    $  $   @
   $  $    @
  $  $     @
 $  $      @
$  $       @@
       $$@
    _/ $ @
   _/ $  @
  _/ $   @
   $$    @
_/ $     @
 $$      @
         @@
   _/  _/ $@
  _/  _/ $ @
       $$  @
  $$       @
 $$        @
$$         @
           @
           @@
            $$ @
     _/  _/   $@
  _/_/_/_/_/ $ @
   _/  _/   $  @
_/_/_/_/_/ $   @
 _/  _/   $    @
      $$       @
               @@
         $$ @
      _/   $@
   _/_/_/ $ @
  _/_/   $  @
   _/_/ $   @
_/_/_/ $    @
 _/   $     @
  $$        @@
               $$@
    _/_/    _/ $ @
   _/_/  _/   $  @
      _/     $   @
   _/  _/_/ $    @
_/    _/_/ $     @
         $$      @
                 @@
        $$    @
     _/   $   @
  _/  _/     $@
   _/_/  _/ $ @
_/    _/   $  @
 _/_/  _/ $   @
        $$    @
              @@
       _/ $@
    _/   $ @
     $$    @
  $$       @
 $$        @
$$         @
           @
           @@
       _/ $@
    _/   $ @
   _/ $    @
  _/ $     @
 _/ $      @
_/   $     @
 _/ $      @
  $$       @@
      _/   $@
       _/ $ @
      _/ $  @
     _/ $   @
    _/ $    @
   _/ $     @
_/   $      @
 $$         @@
               $$@
    _/  _/  _/ $ @
     _/_/_/   $  @
  _/_/_/_/_/ $   @
   _/_/_/   $    @
_/  _/  _/ $     @
         $$      @
                 @@
         $$  @
      _/ $   @
     _/     $@
_/_/_/_/_/ $ @
   _/     $  @
  _/ $       @
   $$        @
             @@
        @
        @
        @
        @
      $$@
   _/ $ @
_/   $  @
 $$     @@
             @
             @
           $$@
_/_/_/_/_/ $ @
         $$  @
             @
             @
             @@
     @
     @
     @
     @
   $$@
_/ $ @
 $$  @
     @@
               $$@
            _/ $ @
         _/   $  @
      _/   $     @
   _/   $        @
_/   $           @
 $$              @
                 @@
        $$ @
     _/   $@
  _/  _/ $ @
 _/  _/ $  @
_/  _/ $   @
 _/   $    @
  $$       @
           @@
       $$@
    _/ $ @
 _/_/ $  @
  _/ $   @
 _/ $    @
_/ $     @
 $$      @
         @@
           $$ @
      _/_/   $@
   _/    _/ $ @
      _/   $  @
   _/     $   @
_/_/_/_/ $    @
       $$     @
              @@
           $$ @
    _/_/_/   $@
         _/ $ @
    _/_/   $  @
       _/ $   @
_/_/_/   $    @
     $$       @
              @@
         $$@
  _/  _/ $ @
 _/  _/   $@
_/_/_/_/ $ @
   _/   $  @
  _/ $     @
   $$      @
           @@
             $$@
    _/_/_/_/ $ @
   _/       $  @
  _/_/_/   $   @
       _/ $    @
_/_/_/   $     @
     $$        @
               @@
            $$@
     _/_/_/ $ @
  _/       $  @
 _/_/_/   $   @
_/    _/ $    @
 _/_/   $     @
    $$        @
              @@
             $$@
  _/_/_/_/_/ $ @
         _/ $  @
      _/   $   @
   _/   $      @
_/   $         @
 $$            @
               @@
          $$ @
     _/_/   $@
  _/    _/ $ @
   _/_/   $  @
_/    _/ $   @
 _/_/   $    @
    $$       @
             @@
           $$ @
      _/_/   $@
   _/    _/ $ @
    _/_/_/ $  @
       _/ $   @
_/_/_/   $    @
     $$       @
              @@
        @
      $$@
   _/ $ @
    $$  @
   $$   @
_/ $    @
 $$     @
        @@
           @
         $$@
      _/ $ @
       $$  @
      $$   @
   _/ $    @
_/   $     @
 $$        @@
         $$@
      _/ $ @
   _/   $  @
_/   $     @
 _/   $    @
  _/ $     @
   $$      @
           @@
               @
             $$@
  _/_/_/_/_/ $ @
           $$  @
_/_/_/_/_/ $   @
         $$    @
               @
               @@
       $$  @
    _/   $ @
     _/   $@
      _/ $ @
   _/   $  @
_/   $     @
 $$        @
           @@
         $$ @
    _/_/   $@
       _/ $ @
  _/_/   $  @
     $$     @
_/ $        @
 $$         @
            @@
                   $$ @
        _/_/_/_/_/   $@
     _/          _/ $ @
  _/    _/_/_/  _/ $  @
 _/  _/    _/  _/ $   @
_/    _/_/_/_/   $    @
 _/             $     @
  _/_/_/_/_/_/ $      @@
           $$ @
      _/_/   $@
   _/    _/ $ @
  _/_/_/_/ $  @
 _/    _/ $   @
_/    _/ $    @
       $$     @
              @@
           $$ @
    _/_/_/   $@
   _/    _/ $ @
  _/_/_/   $  @
 _/    _/ $   @
_/_/_/   $    @
     $$       @
              @@
            $$@
     _/_/_/ $ @
  _/       $  @
 _/   $       @
_/       $    @
 _/_/_/ $     @
      $$      @
              @@
           $$ @
    _/_/_/   $@
   _/    _/ $ @
  _/    _/ $  @
 _/    _/ $   @
_/_/_/   $    @
     $$       @
              @@
             $$@
    _/_/_/_/ $ @
   _/       $  @
  _/_/_/ $     @
 _/       $    @
_/_/_/_/ $     @
       $$      @
               @@
             $$@
    _/_/_/_/ $ @
   _/       $  @
  _/_/_/ $     @
 _/     $      @
_/ $           @
 $$            @
               @@
            $$@
     _/_/_/ $ @
  _/       $  @
 _/  _/_/ $   @
_/    _/ $    @
 _/_/_/ $     @
      $$      @
              @@
             $$@
    _/    _/ $ @
   _/    _/ $  @
  _/_/_/_/ $   @
 _/    _/ $    @
_/    _/ $     @
       $$      @
               @@
           $$@
    _/_/_/ $ @
     _/   $  @
    _/ $     @
   _/   $    @
_/_/_/ $     @
     $$      @
             @@
            $$@
         _/ $ @
        _/ $  @
       _/ $   @
_/    _/ $    @
 _/_/   $     @
    $$        @
              @@
             $$@
    _/    _/ $ @
   _/  _/   $  @
  _/_/   $     @
 _/  _/   $    @
_/    _/ $     @
       $$      @
               @@
       $$  @
    _/ $   @
   _/ $    @
  _/ $     @
 _/       $@
_/_/_/_/ $ @
       $$  @
           @@
               $$@
    _/      _/ $ @
   _/_/  _/_/ $  @
  _/  _/  _/ $   @
 _/      _/ $    @
_/      _/ $     @
         $$      @
                 @@
               $$@
    _/      _/ $ @
   _/_/    _/ $  @
  _/  _/  _/ $   @
 _/    _/_/ $    @
_/      _/ $     @
         $$      @
                 @@
          $$ @
     _/_/   $@
  _/    _/ $ @
 _/    _/ $  @
_/    _/ $   @
 _/_/   $    @
    $$       @
             @@
           $$ @
    _/_/_/   $@
   _/    _/ $ @
  _/_/_/   $  @
 _/     $     @
_/ $          @
 $$           @
              @@
          $$ @
     _/_/   $@
  _/    _/ $ @
 _/  _/_/ $  @
_/    _/   $ @
 _/_/  _/ $  @
        $$   @
             @@
           $$ @
    _/_/_/   $@
   _/    _/ $ @
  _/_/_/   $  @
 _/    _/ $   @
_/    _/ $    @
       $$     @
              @@
             $$@
      _/_/_/ $ @
   _/       $  @
    _/_/   $   @
       _/ $    @
_/_/_/   $     @
     $$        @
               @@
           $$@
_/_/_/_/_/ $ @
   _/     $  @
  _/ $       @
 _/ $        @
_/ $         @
 $$          @
             @@
            $$@
   _/    _/ $ @
  _/    _/ $  @
 _/    _/ $   @
_/    _/ $    @
 _/_/   $     @
    $$        @
              @@
             $$@
  _/      _/ $ @
 _/      _/ $  @
_/      _/ $   @
 _/  _/   $    @
  _/   $       @
   $$          @
               @@
                 $$@
  _/          _/ $ @
 _/          _/ $  @
_/    _/    _/ $   @
 _/  _/  _/   $    @
  _/  _/   $       @
       $$          @
                   @@
               $$@
    _/      _/ $ @
     _/  _/   $  @
      _/   $     @
   _/  _/   $    @
_/      _/ $     @
         $$      @
                 @@
           $$@
_/      _/ $ @
 _/  _/   $  @
  _/   $     @
 _/ $        @
_/ $         @
 $$          @
             @@
               $$@
    _/_/_/_/_/ $ @
         _/   $  @
      _/   $     @
   _/       $    @
_/_/_/_/_/ $     @
         $$      @
                 @@
      _/_/ $@
     _/   $ @
    _/ $    @
   _/ $     @
  _/ $      @
 _/   $     @
_/_/ $      @
   $$       @@
   $$    @
_/   $   @
 _/   $  @
  _/   $ @
   _/   $@
    _/ $ @
     $$  @
         @@
      _/_/ $@
       _/ $ @
      _/ $  @
     _/ $   @
    _/ $    @
   _/ $     @
_/_/ $      @
   $$       @@
     _/   $@
  _/  _/ $ @
       $$  @
  $$       @
 $$        @
$$         @
           @
           @@
             @
             @
             @
             @
             @
      $$     @
           $$@
_/_/_/_/_/ $ @@
   _/   $@
    _/ $ @
     $$  @
  $$     @
 $$      @
$$       @
         @
         @@
             @
           $$@
    _/_/_/ $ @
 _/    _/ $  @
_/    _/ $   @
 _/_/_/ $    @
      $$     @
             @@
       $$    @
    _/     $ @
   _/_/_/   $@
  _/    _/ $ @
 _/    _/ $  @
_/_/_/   $   @
     $$      @
             @@
             @
           $$@
    _/_/_/ $ @
 _/       $  @
_/       $   @
 _/_/_/ $    @
      $$     @
             @@
            $$@
         _/ $ @
    _/_/_/ $  @
 _/    _/ $   @
_/    _/ $    @
 _/_/_/ $     @
      $$      @
              @@
            @
         $$ @
    _/_/   $@
 _/_/_/_/ $ @
_/       $  @
 _/_/_/ $   @
      $$    @
            @@
           $$@
      _/_/ $ @
   _/     $  @
_/_/_/_/     @
 _/     $    @
_/ $         @
 $$          @
             @@
              @
            $$@
     _/_/_/ $ @
  _/    _/ $  @
 _/    _/ $   @
  _/_/_/ $    @
     _/ $     @
_/_/   $      @@
       $$    @
    _/     $ @
   _/_/_/   $@
  _/    _/ $ @
 _/    _/ $  @
_/    _/ $   @
       $$    @
             @@
       $$@
    _/ $ @
     $$  @
  _/ $   @
 _/ $    @
_/ $     @
 $$      @
         @@
           $$@
        _/ $ @
         $$  @
      _/ $   @
     _/ $    @
    _/ $     @
   _/ $      @
_/   $       @@
       $$   @
    _/     $@
   _/  _/ $ @
  _/_/   $  @
 _/  _/   $ @
_/    _/ $  @
       $$   @
            @@
       $$@
    _/ $ @
   _/ $  @
  _/ $   @
 _/ $    @
_/ $     @
 $$      @
         @@
                   @
                $$ @
   _/_/_/  _/_/   $@
  _/    _/    _/ $ @
 _/    _/    _/ $  @
_/    _/    _/ $   @
             $$    @
                   @@
             @
          $$ @
   _/_/_/   $@
  _/    _/ $ @
 _/    _/ $  @
_/    _/ $   @
       $$    @
             @@
            @
         $$ @
    _/_/   $@
 _/    _/ $ @
_/    _/ $  @
 _/_/   $   @
    $$      @
            @@
               @
            $$ @
     _/_/_/   $@
    _/    _/ $ @
   _/    _/ $  @
  _/_/_/   $   @
 _/     $      @
_/ $           @@
             @
           $$@
    _/_/_/ $ @
 _/    _/ $  @
_/    _/ $   @
 _/_/_/ $    @
    _/ $     @
   _/ $      @@
              @
            $$@
   _/  _/_/ $ @
  _/_/     $  @
 _/   $       @
_/ $          @
 $$           @
              @@
              @
            $$@
     _/_/_/ $ @
  _/_/     $  @
     _/_/ $   @
_/_/_/   $    @
     $$       @
              @@
      $$   @
   _/     $@
_/_/_/_/   @
 _/     $  @
_/     $   @
 _/_/ $    @
    $$     @
           @@
             @
           $$@
  _/    _/ $ @
 _/    _/ $  @
_/    _/ $   @
 _/_/_/ $    @
      $$     @
             @@
              @
            $$@
 _/      _/ $ @
_/      _/ $  @
 _/  _/   $   @
  _/   $      @
   $$         @
              @@
                      @
                    $$@
 _/      _/      _/ $ @
_/      _/      _/ $  @
 _/  _/  _/  _/   $   @
  _/      _/   $      @
           $$         @
                      @@
              @
            $$@
   _/    _/ $ @
    _/_/   $  @
 _/    _/ $   @
_/    _/ $    @
       $$     @
              @@
              @
            $$@
   _/    _/ $ @
  _/    _/ $  @
 _/    _/ $   @
  _/_/_/ $    @
     _/ $     @
_/_/   $      @@
              @
            $$@
   _/_/_/_/ $ @
      _/   $  @
   _/     $   @
_/_/_/_/ $    @
       $$     @
              @@
       _/ $@
    _/   $ @
   _/   $  @
_/   $     @
 _/   $    @
_/   $     @
 _/ $      @
  $$       @@
       _/ $@
      _/ $ @
     _/ $  @
    _/ $   @
   _/ $    @
  _/ $     @
 _/ $      @
_/ $       @@
      _/   $ @
       _/   $@
      _/   $ @
       _/ $  @
    _/   $   @
   _/   $    @
_/   $       @
 $$          @@
   _/  _/ $@
_/  _/   $ @
     $$    @
  $$       @
 $$        @
$$         @
           @
           @@
     _/    _/ $@
            $$ @
     _/_/   $  @
  _/    _/ $   @
 _/_/_/_/ $    @
_/    _/ $     @
       $$      @
               @@
    _/    _/ $@
           $$ @
    _/_/   $  @
 _/    _/ $   @
_/    _/ $    @
 _/_/   $     @
    $$        @
              @@
    _/    _/ $@
           $$ @
  _/    _/ $  @
 _/    _/ $   @
_/    _/ $    @
 _/_/   $     @
    $$        @
              @@
    _/    _/ $@
           $$ @
    _/_/_/ $  @
 _/    _/ $   @
_/    _/ $    @
 _/_/_/ $     @
      $$      @
              @@
    _/    _/ $@
           $$ @
    _/_/   $  @
 _/    _/ $   @
_/    _/ $    @
 _/_/   $     @
    $$        @
              @@
    _/    _/ $@
           $$ @
  _/    _/ $  @
 _/    _/ $   @
_/    _/ $    @
 _/_/_/ $     @
      $$      @
              @@
            $$ @
       _/_/   $@
    _/    _/ $ @
   _/  _/   $  @
  _/    _/ $   @
 _/  _/   $    @
_/     $       @
 $$            @@
160  NO-BREAK SPACE
       $  $@
      $  $ @
     $  $  @
    $  $   @
   $  $    @
  $  $     @
 $  $      @
$  $       @@
161  INVERTED EXCLAMATION MARK
       $$@
    _/ $ @
     $$  @
  _/ $   @
 _/ $    @
_/ $     @
 $$      @
         @@
162  CENT SIGN
          $$ @
       _/   $@
    _/_/_/ $ @
 _/  _/   $  @
_/  _/   $   @
 _/_/_/ $    @
  _/   $     @
   $$        @@
163  POUND SIGN
              $$ @
         _/_/   $@
      _/    _/ $ @
   _/_/_/     $  @
    _/         $ @
 _/_/_/    _/ $  @
_/_/  _/_/   $   @
                 @@
164  CURRENCY SIGN
                  $$@
     _/        _/ $ @
      _/_/_/_/   $  @
     _/    _/ $     @
    _/    _/ $      @
   _/_/_/_/   $     @
_/        _/ $      @
           $$       @@
165  YEN SIGN
               $$@
    _/      _/ $ @
     _/  _/   $  @
  _/_/_/_/_/ $   @
     _/     $    @
_/_/_/_/_/ $     @
   _/     $      @
    $$           @@
166  BROKEN BAR
       _/ $@
      _/ $ @
     _/ $  @
      $$   @
     $$    @
  _/ $     @
 _/ $      @
_/ $       @@
167  SECTION SIGN
        _/_/ $@
     _/     $ @
      _/   $  @
   _/  _/ $   @
    _/   $    @
     _/ $     @
_/_/   $      @
   $$         @@
168  DIAERESIS
     _/    _/ $@
            $$ @
   $      $    @
  $      $     @
 $      $      @
$      $       @
               @
               @@
169  COPYRIGHT SIGN
         _/_/_/_/   $ @
      _/        _/   $@
   _/    _/_/_/  _/ $ @
  _/  _/        _/ $  @
 _/  _/        _/ $   @
_/    _/_/_/  _/ $    @
 _/        _/   $     @
  _/_/_/_/   $        @@
170  FEMININE ORDINAL INDICATOR
             $$@
      _/_/_/ $ @
   _/    _/ $  @
    _/_/_/ $   @
         $$    @
_/_/_/_/ $     @
               @
               @@
171  LEFT-POINTING DOUBLE ANGLE QUOTATION MARK
             $$@
      _/  _/ $ @
   _/  _/   $  @
_/  _/   $     @
 _/  _/   $    @
  _/  _/ $     @
       $$      @
               @@
172  NOT SIGN
             @
             @
           $$@
_/_/_/_/_/ $ @
       _/ $  @
        $$   @
             @
             @@
173  SOFT HYPHEN
           @
           @
         $$@
_/_/_/_/ $ @
       $$  @
  $$       @
           @
           @@
174  REGISTERED SIGN
         _/_/_/_/   $ @
      _/        _/   $@
   _/  _/_/_/    _/ $ @
  _/  _/    _/  _/ $  @
 _/  _/_/_/    _/ $   @
_/  _/    _/  _/ $    @
 _/        _/   $     @
  _/_/_/_/   $        @@
175  MACRON
 _/_/_/_/_/ $@
          $$ @
   $$        @
  $$         @
 $$          @
$$           @
             @
             @@
176  DEGREE SIGN
     _/   $@
  _/  _/ $ @
   _/   $  @
    $$     @
 $$        @
$$         @
           @
           @@
177  PLUS-MINUS SIGN
           $$  @
        _/ $   @
       _/     $@
  _/_/_/_/_/ $ @
     _/     $  @
_/_/_/_/_/ $   @
         $$    @
               @@
178  SUPERSCRIPT TWO
        $$ @
   _/_/   $@
      _/ $ @
   _/   $  @
_/_/_/ $   @
     $$    @
           @
           @@
179  SUPERSCRIPT THREE
          $$@
   _/_/_/ $ @
    _/   $  @
     _/ $   @
_/_/   $    @
   $$       @
            @
            @@
180  ACUTE ACCENT
       _/ $@
    _/   $ @
     $$    @
  $$       @
 $$        @
$$         @
           @
           @@
181  MICRO SIGN
                @
              $$@
     _/    _/ $ @
    _/    _/ $  @
   _/    _/ $   @
  _/_/_/_/ $    @
 _/       $     @
_/ $            @@
182  PILCROW SIGN
            $$@
   _/_/_/_/ $ @
_/_/_/  _/ $  @
 _/_/  _/ $   @
  _/  _/ $    @
 _/  _/ $     @
      $$      @
              @@
183  MIDDLE DOT
       @
       @
     $$@
  _/ $ @
   $$  @
$$     @
       @
       @@
184  CEDILLA
        @
        @
        @
        @
        @
      $$@
   _/ $ @
_/_/ $  @@
185  SUPERSCRIPT ONE
      $$@
   _/ $ @
_/_/ $  @
 _/ $   @
_/ $    @
 $$     @
        @
        @@
186  MASCULINE ORDINAL INDICATOR
           $$ @
      _/_/   $@
   _/    _/ $ @
    _/_/   $  @
         $$   @
_/_/_/_/ $    @
              @
              @@
187  RIGHT-POINTING DOUBLE ANGLE QUOTATION MARK
           $$  @
    _/  _/   $ @
     _/  _/   $@
      _/  _/ $ @
   _/  _/   $  @
_/  _/   $     @
     $$        @
               @@
188  VULGAR FRACTION ONE QUARTER
                $$     @
   _/        _/       $@
_/_/      _/  _/  _/ $ @
 _/    _/    _/  _/   $@
_/  _/      _/_/_/_/ $ @
 _/            _/   $  @
                $$     @
                       @@
189  VULGAR FRACTION ONE HALF
                $$    @
   _/        _/     $ @
_/_/      _/  _/_/   $@
 _/    _/        _/ $ @
_/  _/        _/   $  @
 _/        _/_/_/ $   @
                $$    @
                      @@
190  VULGAR FRACTION THREE QUARTERS
                  $$     @
   _/_/_/      _/       $@
    _/      _/  _/  _/ $ @
     _/  _/    _/  _/   $@
_/_/  _/      _/_/_/_/ $ @
   _/            _/   $  @
                  $$     @
                         @@
191  INVERTED QUESTION MARK
          $$@
       _/ $ @
        $$  @
   _/_/ $   @
_/     $    @
 _/_/ $     @
    $$      @
            @@
192  LATIN CAPITAL LETTER A WITH GRAVE
       _/   $@
        _/ $ @
     _/_/   $@
  _/    _/ $ @
 _/_/_/_/ $  @
_/    _/ $   @
       $$    @
             @@
193  LATIN CAPITAL LETTER A WITH ACUTE
         _/ $@
      _/   $ @
     _/_/   $@
  _/    _/ $ @
 _/_/_/_/ $  @
_/    _/ $   @
       $$    @
             @@
194  LATIN CAPITAL LETTER A WITH CIRCUMFLEX
       _/_/   $@
    _/    _/ $ @
           $$  @
    _/_/   $   @
 _/_/_/_/ $    @
_/    _/ $     @
       $$      @
               @@
195  LATIN CAPITAL LETTER A WITH TILDE
       _/  _/ $@
    _/  _/   $ @
         $$    @
    _/_/   $   @
 _/_/_/_/ $    @
_/    _/ $     @
       $$      @
               @@
196  LATIN CAPITAL LETTER A WITH DIAERESIS
     _/    _/ $@
            $$ @
     _/_/   $  @
  _/    _/ $   @
 _/_/_/_/ $    @
_/    _/ $     @
       $$      @
               @@
197  LATIN CAPITAL LETTER A WITH RING ABOVE
       _/_/   $@
    _/    _/ $ @
     _/_/   $  @
  _/    _/ $   @
 _/_/_/_/ $    @
_/    _/ $     @
       $$      @
               @@
198  LATIN CAPITAL LETTER AE
                   $$@
      _/_/_/_/_/_/ $ @
   _/    _/       $  @
  _/_/_/_/_/_/ $     @
 _/    _/       $    @
_/    _/_/_/_/ $     @
             $$      @
                     @@
199  LATIN CAPITAL LETTER C WITH CEDILLA
             $$@
      _/_/_/ $ @
   _/       $  @
  _/   $       @
 _/       $    @
  _/_/_/ $     @
   _/   $      @
_/_/ $         @@
200  LATIN CAPITAL LETTER E WITH GRAVE
       _/   $ @
        _/   $@
   _/_/_/_/ $ @
  _/_/_/ $    @
 _/       $   @
_/_/_/_/ $    @
       $$     @
              @@
201  LATIN CAPITAL LETTER E WITH ACUTE
         _/ $ @
      _/     $@
   _/_/_/_/ $ @
  _/_/_/ $    @
 _/       $   @
_/_/_/_/ $    @
       $$     @
              @@
202  LATIN CAPITAL LETTER E WITH CIRCUMFLEX
       _/_/   $@
    _/    _/ $ @
   _/_/_/_/ $  @
  _/_/_/ $     @
 _/       $    @
_/_/_/_/ $     @
       $$      @
               @@
203  LATIN CAPITAL LETTER E WITH DIAERESIS
     _/    _/ $@
            $$ @
   _/_/_/_/ $  @
  _/_/_/ $     @
 _/       $    @
_/_/_/_/ $     @
       $$      @
               @@
204  LATIN CAPITAL LETTER I WITH GRAVE
     _/   $ @
      _/   $@
   _/_/_/ $ @
    _/   $  @
   _/   $   @
_/_/_/ $    @
     $$     @
            @@
205  LATIN CAPITAL LETTER I WITH ACUTE
         _/ $@
      _/   $ @
   _/_/_/ $  @
    _/   $   @
   _/   $    @
_/_/_/ $     @
     $$      @
             @@
206  LATIN CAPITAL LETTER I WITH CIRCUMFLEX
       _/   $@
    _/  _/ $ @
   _/_/_/ $  @
    _/   $   @
   _/   $    @
_/_/_/ $     @
     $$      @
             @@
207  LATIN CAPITAL LETTER I WITH DIAERESIS
     _/  _/ $@
          $$ @
   _/_/_/ $  @
    _/   $   @
   _/   $    @
_/_/_/ $     @
     $$      @
             @@
208  LATIN CAPITAL LETTER ETH
           $$ @
    _/_/_/   $@
   _/    _/ $ @
_/_/_/  _/ $  @
 _/    _/ $   @
_/_/_/   $    @
     $$       @
              @@
209  LATIN CAPITAL LETTER N WITH TILDE
       _/  _/ $@
    _/  _/   $ @
   _/    _/ $  @
  _/_/  _/ $   @
 _/  _/_/ $    @
_/    _/ $     @
       $$      @
               @@
210  LATIN CAPITAL LETTER O WITH GRAVE
      _/   $@
       _/ $ @
    _/_/   $@
 _/    _/ $ @
_/    _/ $  @
 _/_/   $   @
    $$      @
            @@
211  LATIN CAPITAL LETTER O WITH ACUTE
        _/ $@
     _/   $ @
    _/_/   $@
 _/    _/ $ @
_/    _/ $  @
 _/_/   $   @
    $$      @
            @@
212  LATIN CAPITAL LETTER O WITH CIRCUMFLEX
      _/_/   $@
   _/    _/ $ @
    _/_/   $  @
 _/    _/ $   @
_/    _/ $    @
 _/_/   $     @
    $$        @
              @@
213  LATIN CAPITAL LETTER O WITH TILDE
      _/  _/ $@
   _/  _/   $ @
    _/_/   $  @
 _/    _/ $   @
_/    _/ $    @
 _/_/   $     @
    $$        @
              @@
214  LATIN CAPITAL LETTER O WITH DIAERESIS
    _/    _/ $@
           $$ @
    _/_/   $  @
 _/    _/ $   @
_/    _/ $    @
 _/_/   $     @
    $$        @
              @@
215  MULTIPLICATION SIGN
           @
         $$@
  _/  _/ $ @
   _/   $  @
_/  _/ $   @
     $$    @
           @
           @@
216  LATIN CAPITAL LETTER O WITH STROKE
               $$@
      _/_/_/_/ $ @
   _/    _/_/ $  @
  _/  _/  _/ $   @
 _/_/    _/ $    @
_/_/_/_/   $     @
       $$        @
                 @@
217  LATIN CAPITAL LETTER U WITH GRAVE
      _/   $@
       _/ $ @
          $$@
 _/    _/ $ @
_/    _/ $  @
 _/_/   $   @
    $$      @
            @@
218  LATIN CAPITAL LETTER U WITH ACUTE
        _/ $@
     _/   $ @
          $$@
 _/    _/ $ @
_/    _/ $  @
 _/_/   $   @
    $$      @
            @@
219  LATIN CAPITAL LETTER U WITH CIRCUMFLEX
      _/_/   $@
   _/    _/ $ @
          $$  @
 _/    _/ $   @
_/    _/ $    @
 _/_/   $     @
    $$        @
              @@
220  LATIN CAPITAL LETTER U WITH DIAERESIS
    _/    _/ $@
           $$ @
  _/    _/ $  @
 _/    _/ $   @
_/    _/ $    @
 _/_/   $     @
    $$        @
              @@
221  LATIN CAPITAL LETTER Y WITH ACUTE
        _/ $ @
     _/     $@
_/      _/ $ @
 _/  _/   $  @
  _/   $     @
 _/ $        @
  $$         @
             @@
222  LATIN CAPITAL LETTER THORN
       $$    @
    _/     $ @
   _/_/_/   $@
  _/    _/ $ @
 _/_/_/   $  @
_/     $     @
 $$          @
             @@
223  LATIN SMALL LETTER SHARP S
            $$ @
       _/_/   $@
    _/    _/ $ @
   _/  _/   $  @
  _/    _/ $   @
 _/  _/   $    @
_/     $       @
 $$            @@
224  LATIN SMALL LETTER A WITH GRAVE
      _/   $@
       _/ $ @
          $$@
   _/_/_/ $ @
_/    _/ $  @
 _/_/_/ $   @
      $$    @
            @@
225  LATIN SMALL LETTER A WITH ACUTE
          _/ $@
       _/   $ @
          $$  @
   _/_/_/ $   @
_/    _/ $    @
 _/_/_/ $     @
      $$      @
              @@
226  LATIN SMALL LETTER A WITH CIRCUMFLEX
        _/   $@
     _/  _/ $ @
          $$  @
   _/_/_/ $   @
_/    _/ $    @
 _/_/_/ $     @
      $$      @
              @@
227  LATIN SMALL LETTER A WITH TILDE
      _/  _/ $@
   _/  _/   $ @
          $$  @
   _/_/_/ $   @
_/    _/ $    @
 _/_/_/ $     @
      $$      @
              @@
228  LATIN SMALL LETTER A WITH DIAERESIS
    _/    _/ $@
           $$ @
    _/_/_/ $  @
 _/    _/ $   @
_/    _/ $    @
 _/_/_/ $     @
      $$      @
              @@
229  LATIN SMALL LETTER A WITH RING ABOVE
        _/   $@
     _/  _/ $ @
      _/   $  @
   _/_/_/ $   @
_/    _/ $    @
 _/_/_/ $     @
      $$      @
              @@
230  LATIN SMALL LETTER AE
                    @
                 $$ @
    _/_/_/  _/_/   $@
 _/    _/_/_/_/_/ $ @
_/    _/_/       $  @
 _/_/_/  _/_/_/ $   @
              $$    @
                    @@
231  LATIN SMALL LETTER C WITH CEDILLA
              @
            $$@
     _/_/_/ $ @
  _/       $  @
 _/       $   @
  _/_/_/ $    @
   _/   $     @
_/_/ $        @@
232  LATIN SMALL LETTER E WITH GRAVE
      _/     $@
       _/ $   @
    _/_/   $  @
 _/_/_/_/ $   @
_/       $    @
 _/_/_/ $     @
      $$      @
              @@
233  LATIN SMALL LETTER E WITH ACUTE
          _/ $@
       _/   $ @
    _/_/   $  @
 _/_/_/_/ $   @
_/       $    @
 _/_/_/ $     @
      $$      @
              @@
234  LATIN SMALL LETTER E WITH CIRCUMFLEX
      _/_/   $@
   _/    _/ $ @
    _/_/   $  @
 _/_/_/_/ $   @
_/       $    @
 _/_/_/ $     @
      $$      @
              @@
235  LATIN SMALL LETTER E WITH DIAERESIS
    _/    _/ $@
           $$ @
    _/_/   $  @
 _/_/_/_/ $   @
_/       $    @
 _/_/_/ $     @
      $$      @
              @@
236  LATIN SMALL LETTER I WITH GRAVE
   _/   $@
    _/ $ @
     $$  @
  _/ $   @
 _/ $    @
_/ $     @
 $$      @
         @@
237  LATIN SMALL LETTER I WITH ACUTE
       _/ $@
    _/   $ @
     $$    @
  _/ $     @
 _/ $      @
_/ $       @
 $$        @
           @@
238  LATIN SMALL LETTER I WITH CIRCUMFLEX
     _/   $@
  _/  _/ $ @
       $$  @
  _/ $     @
 _/ $      @
_/ $       @
 $$        @
           @@
239  LATIN SMALL LETTER I WITH DIAERESIS
   _/  _/ $@
        $$ @
   _/ $    @
  _/ $     @
 _/ $      @
_/ $       @
 $$        @
           @@
240  LATIN SMALL LETTER ETH
    _/  _/ $@
     _/   $ @
  _/  _/   $@
   _/_/_/ $ @
_/    _/ $  @
 _/_/   $   @
    $$      @
            @@
241  LATIN SMALL LETTER N WITH TILDE
       _/  _/ $@
    _/  _/   $ @
         $$    @
  _/_/_/   $   @
 _/    _/ $    @
_/    _/ $     @
       $$      @
               @@
242  LATIN SMALL LETTER O WITH GRAVE
      _/   $@
       _/ $ @
        $$  @
   _/_/   $ @
_/    _/ $  @
 _/_/   $   @
    $$      @
            @@
243  LATIN SMALL LETTER O WITH ACUTE
        _/ $@
     _/   $ @
        $$  @
   _/_/   $ @
_/    _/ $  @
 _/_/   $   @
    $$      @
            @@
244  LATIN SMALL LETTER O WITH CIRCUMFLEX
      _/_/   $@
   _/    _/ $ @
          $$  @
   _/_/   $   @
_/    _/ $    @
 _/_/   $     @
    $$        @
              @@
245  LATIN SMALL LETTER O WITH TILDE
      _/_/_/ $@
   _/  _/   $ @
        $$    @
   _/_/   $   @
_/    _/ $    @
 _/_/   $     @
    $$        @
              @@
246  LATIN SMALL LETTER O WITH DIAERESIS
    _/    _/ $@
           $$ @
    _/_/   $  @
 _/    _/ $   @
_/    _/ $    @
 _/_/   $     @
    $$        @
              @@
247  DIVISION SIGN
         $$  @
      _/ $   @
           $$@
_/_/_/_/_/ $ @
         $$  @
  _/ $       @
   $$        @
             @@
248  LATIN SMALL LETTER O WITH STROKE
              @
            $$@
     _/_/_/ $ @
  _/  _/_/ $  @
 _/_/  _/ $   @
_/_/_/   $    @
     $$       @
              @@
249  LATIN SMALL LETTER U WITH GRAVE
    _/   $  @
     _/ $   @
          $$@
 _/    _/ $ @
_/    _/ $  @
 _/_/_/ $   @
      $$    @
            @@
250  LATIN SMALL LETTER U WITH ACUTE
          _/ $@
       _/   $ @
          $$  @
 _/    _/ $   @
_/    _/ $    @
 _/_/_/ $     @
      $$      @
              @@
251  LATIN SMALL LETTER U WITH CIRCUMFLEX
      _/_/   $@
   _/    _/ $ @
          $$  @
 _/    _/ $   @
_/    _/ $    @
 _/_/_/ $     @
      $$      @
              @@
252  LATIN SMALL LETTER U WITH DIAERESIS
    _/    _/ $@
           $$ @
  _/    _/ $  @
 _/    _/ $   @
_/    _/ $    @
 _/_/_/ $     @
      $$      @
              @@
253  LATIN SMALL LETTER Y WITH ACUTE
         _/ $@
      _/   $ @
           $$@
  _/    _/ $ @
 _/    _/ $  @
  _/_/_/ $   @
     _/ $    @
_/_/   $     @@
254  LATIN SMALL LETTER THORN
         $$    @
      _/     $ @
     _/_/_/   $@
    _/    _/ $ @
   _/    _/ $  @
  _/_/_/   $   @
 _/     $      @
_/ $           @@
255  LATIN SMALL LETTER Y WITH DIAERESIS
     _/    _/ $@
            $$ @
   _/    _/ $  @
  _/    _/ $   @
 _/    _/ $    @
  _/_/_/ $     @
     _/ $      @
_/_/   $       @@
`},Symbol.toStringTag,{value:"Module"})),Ja=Object.freeze(Object.defineProperty({__proto__:null,default:`flf2a$ 4 3 10 0 10 0 1920
Mini by Glenn Chappell 4/93
Includes ISO Latin-1
figlet release 2.1 -- 12 Aug 1994
Permission is hereby given to modify this font, as long as the
modifier's name is placed on a comment line.

Modified by Paul Burton <solution@earthlink.net> 12/96 to include new parameter
supported by FIGlet and FIGWin.  May also be slightly modified for better use
of new full-width/kern/smush alternatives, but default output is NOT changed.

$$@
$$@
$$@
$$@@
   @
 |$@
 o$@
   @@
    @
 ||$@
    @
    @@
       @
 -|-|-$@
 -|-|-$@
       @@
   _$@
 (|$ @
 _|)$@
     @@
    @
 O/$@
 /O$@
    @@
     @
 ()$ @
 (_X$@
     @@
   @
 /$@
   @
   @@
    @
  /$@
 |$ @
  \\$@@
    @
 \\$ @
  |$@
 /$ @@
     @
 \\|/$@
 /|\\$@
     @@
     @
 _|_$@
  |$ @
     @@
   @
   @
 o$@
 /$@@
    @
 __$@
    @
    @@
   @
   @
 o$@
   @@
    @
  /$@
 /$ @
    @@
  _$ @
 / \\$@
 \\_/$@
     @@
    @
 /|$@
  |$@
    @@
 _$ @
  )$@
 /_$@
    @@
 _$ @
 _)$@
 _)$@
    @@
      @
 |_|_$@
   |$ @
      @@
  _$ @
 |_$ @
  _)$@
     @@
  _$ @
 |_$ @
 |_)$@
     @@
 __$@
  /$@
 /$ @
    @@
  _$ @
 (_)$@
 (_)$@
     @@
  _$ @
 (_|$@
   |$@
     @@
   @
 o$@
 o$@
   @@
   @
 o$@
 o$@
 /$@@
   @
 /$@
 \\$@
   @@
    @
 --$@
 --$@
    @@
   @
 \\$@
 /$@
   @@
 _$ @
  )$@
 o$ @
    @@
   __$ @
  /  \\$@
 | (|/$@
  \\__$ @@
      @
  /\\$ @
 /--\\$@
      @@
  _$ @
 |_)$@
 |_)$@
     @@
  _$@
 /$ @
 \\_$@
    @@
  _$ @
 | \\$@
 |_/$@
     @@
  _$@
 |_$@
 |_$@
    @@
  _$@
 |_$@
 |$ @
    @@
  __$@
 /__$@
 \\_|$@
     @@
     @
 |_|$@
 | |$@
     @@
 ___$@
  |$ @
 _|_$@
     @@
     @
   |$@
 \\_|$@
     @@
    @
 |/$@
 |\\$@
    @@
    @
 |$ @
 |_$@
    @@
      @
 |\\/|$@
 |  |$@
      @@
      @
 |\\ |$@
 | \\|$@
      @@
  _$ @
 / \\$@
 \\_/$@
     @@
  _$ @
 |_)$@
 |$  @
     @@
  _$ @
 / \\$@
 \\_X$@
     @@
  _$ @
 |_)$@
 | \\$@
     @@
  __$@
 (_$ @
 __)$@
     @@
 ___$@
  |$ @
  |$ @
     @@
     @
 | |$@
 |_|$@
     @@
      @
 \\  /$@
  \\/$ @
      @@
        @
 \\    /$@
  \\/\\/$ @
        @@
    @
 \\/$@
 /\\$@
    @@
     @
 \\_/$@
  |$ @
     @@
 __$@
  /$@
 /_$@
    @@
  _$@
 |$ @
 |_$@
    @@
    @
 \\$ @
  \\$@
    @@
 _$ @
  |$@
 _|$@
    @@
 /\\$@
    @
    @
    @@
    @
    @
    @
 __$@@
   @
 \\$@
   @
   @@
     @
  _.$@
 (_|$@
     @@
     @
 |_$ @
 |_)$@
     @@
    @
  _$@
 (_$@
    @@
     @
  _|$@
 (_|$@
     @@
     @
  _$ @
 (/_$@
     @@
   _$@
 _|_$@
  |$ @
     @@
     @
  _$ @
 (_|$@
  _|$@@
     @
 |_$ @
 | |$@
     @@
   @
 o$@
 |$@
   @@
    @
  o$@
  |$@
 _|$@@
    @
 |$ @
 |<$@
    @@
   @
 |$@
 |$@
   @@
       @
 ._ _$ @
 | | |$@
       @@
     @
 ._$ @
 | |$@
     @@
     @
  _$ @
 (_)$@
     @@
     @
 ._$ @
 |_)$@
 |$  @@
     @
  _.$@
 (_|$@
   |$@@
    @
 ._$@
 |$ @
    @@
    @
  _$@
 _>$@
    @@
     @
 _|_$@
  |_$@
     @@
     @
     @
 |_|$@
     @@
    @
    @
 \\/$@
    @@
      @
      @
 \\/\\/$@
      @@
    @
    @
 ><$@
    @@
    @
    @
 \\/$@
 /$ @@
    @
 _$ @
 /_$@
    @@
  ,-$@
 _|$ @
  |$ @
  \`-$@@
 |$@
 |$@
 |$@
 |$@@
 -.$ @
  |_$@
  |$ @
 -'$ @@
 /\\/$@
     @
     @
     @@
 o  o$@
  /\\$ @
 /--\\$@
      @@
 o_o$@
 / \\$@
 \\_/$@
     @@
 o o$@
 | |$@
 |_|$@
     @@
 o o$@
  _.$@
 (_|$@
     @@
 o o$@
  _$ @
 (_)$@
     @@
 o o$@
     @
 |_|$@
     @@
  _$ @
 | )$@
 | )$@
 |$  @@
160  NO-BREAK SPACE
 $$@
 $$@
 $$@
 $$@@
161  INVERTED EXCLAMATION MARK
   @
 o$@
 |$@
   @@
162  CENT SIGN
     @
  |_$@
 (__$@
  |$ @@
163  POUND SIGN
    _$  @
  _/_\`$ @
   |___$@
        @@
164  CURRENCY SIGN
     @
 \`o'$@
 ' \`$@
     @@
165  YEN SIGN
       @
 _\\_/_$@
 --|--$@
       @@
166  BROKEN BAR
 |$@
 |$@
 |$@
 |$@@
167  SECTION SIGN
  _$@
 ($ @
 ()$@
 _)$@@
168  DIAERESIS
 o o$@
     @
     @
     @@
169  COPYRIGHT SIGN
  _$ @
 |C|$@
 \`-'$@
     @@
170  FEMININE ORDINAL INDICATOR
  _.$@
 (_|$@
 ---$@
     @@
171  LEFT-POINTING DOUBLE ANGLE QUOTATION MARK
    @
 //$@
 \\\\$@
    @@
172  NOT SIGN
     @
 __$ @
   |$@
     @@
173  SOFT HYPHEN
   @
 _$@
   @
   @@
174  REGISTERED SIGN
  _$ @
 |R|$@
 \`-'$@
     @@
175  MACRON
 __$@
    @
    @
    @@
176  DEGREE SIGN
 O$@
   @
   @
   @@
177  PLUS-MINUS SIGN
     @
 _|_$@
 _|_$@
     @@
178  SUPERSCRIPT TWO
 2$@
   @
   @
   @@
179  SUPERSCRIPT THREE
 3$@
   @
   @
   @@
180  ACUTE ACCENT
 /$@
   @
   @
   @@
181  MICRO SIGN
     @
     @
 |_|$@
 |$  @@
182  PILCROW SIGN
  __$ @
 (| |$@
  | |$@
      @@
183  MIDDLE DOT
   @
 o$@
   @
   @@
184  CEDILLA
   @
   @
   @
 S$@@
185  SUPERSCRIPT ONE
 1$@
   @
   @
   @@
186  MASCULINE ORDINAL INDICATOR
  _$ @
 (_)$@
 ---$@
     @@
187  RIGHT-POINTING DOUBLE ANGLE QUOTATION MARK
    @
 \\\\$@
 //$@
    @@
188  VULGAR FRACTION ONE QUARTER
    @
 1/$@
 /4$@
    @@
189  VULGAR FRACTION ONE HALF
    @
 1/$@
 /2$@
    @@
190  VULGAR FRACTION THREE QUARTERS
    @
 3/$@
 /4$@
    @@
191  INVERTED QUESTION MARK
    @
  o$@
 (_$@
    @@
192  LATIN CAPITAL LETTER A WITH GRAVE
   \\$ @
  /\\$ @
 /--\\$@
      @@
193  LATIN CAPITAL LETTER A WITH ACUTE
  /$  @
  /\\$ @
 /--\\$@
      @@
194  LATIN CAPITAL LETTER A WITH CIRCUMFLEX
  /\\$ @
  /\\$ @
 /--\\$@
      @@
195  LATIN CAPITAL LETTER A WITH TILDE
  /\\/$@
  /\\$ @
 /--\\$@
      @@
196  LATIN CAPITAL LETTER A WITH DIAERESIS
 o  o$@
  /\\$ @
 /--\\$@
      @@
197  LATIN CAPITAL LETTER A WITH RING ABOVE
   O$  @
  / \\$ @
 /---\\$@
       @@
198  LATIN CAPITAL LETTER AE
    _$@
  /|_$@
 /-|_$@
      @@
199  LATIN CAPITAL LETTER C WITH CEDILLA
  _$@
 /$ @
 \\_$@
  S$@@
200  LATIN CAPITAL LETTER E WITH GRAVE
 \\_$@
 |_$@
 |_$@
    @@
201  LATIN CAPITAL LETTER E WITH ACUTE
  _/$@
 |_$ @
 |_$ @
     @@
202  LATIN CAPITAL LETTER E WITH CIRCUMFLEX
  /\\$@
 |_$ @
 |_$ @
     @@
203  LATIN CAPITAL LETTER E WITH DIAERESIS
 o_o$@
 |_$ @
 |_$ @
     @@
204  LATIN CAPITAL LETTER I WITH GRAVE
 \\__$@
  |$ @
 _|_$@
     @@
205  LATIN CAPITAL LETTER I WITH ACUTE
 __/$@
  |$ @
 _|_$@
     @@
206  LATIN CAPITAL LETTER I WITH CIRCUMFLEX
  /\\$@
 ___$@
 _|_$@
     @@
207  LATIN CAPITAL LETTER I WITH DIAERESIS
 o_o$@
  |$ @
 _|_$@
     @@
208  LATIN CAPITAL LETTER ETH
   _$ @
 _|_\\$@
  |_/$@
      @@
209  LATIN CAPITAL LETTER N WITH TILDE
  /\\/$@
 |\\ |$@
 | \\|$@
      @@
210  LATIN CAPITAL LETTER O WITH GRAVE
  \\$ @
 / \\$@
 \\_/$@
     @@
211  LATIN CAPITAL LETTER O WITH ACUTE
  /$ @
 / \\$@
 \\_/$@
     @@
212  LATIN CAPITAL LETTER O WITH CIRCUMFLEX
  /\\$@
 / \\$@
 \\_/$@
     @@
213  LATIN CAPITAL LETTER O WITH TILDE
 /\\/$@
 / \\$@
 \\_/$@
     @@
214  LATIN CAPITAL LETTER O WITH DIAERESIS
 o_o$@
 / \\$@
 \\_/$@
     @@
215  MULTIPLICATION SIGN
   @
   @
 X$@
   @@
216  LATIN CAPITAL LETTER O WITH STROKE
  __$ @
 / /\\$@
 \\/_/$@
      @@
217  LATIN CAPITAL LETTER U WITH GRAVE
  \\$ @
 | |$@
 |_|$@
     @@
218  LATIN CAPITAL LETTER U WITH ACUTE
  /$ @
 | |$@
 |_|$@
     @@
219  LATIN CAPITAL LETTER U WITH CIRCUMFLEX
  /\\$@
 | |$@
 |_|$@
     @@
220  LATIN CAPITAL LETTER U WITH DIAERESIS
 o o$@
 | |$@
 |_|$@
     @@
221  LATIN CAPITAL LETTER Y WITH ACUTE
  /$ @
 \\_/$@
  |$ @
     @@
222  LATIN CAPITAL LETTER THORN
 |_$ @
 |_)$@
 |$  @
     @@
223  LATIN SMALL LETTER SHARP S
  _$ @
 | )$@
 | )$@
 |$  @@
224  LATIN SMALL LETTER A WITH GRAVE
  \\$ @
  _.$@
 (_|$@
     @@
225  LATIN SMALL LETTER A WITH ACUTE
  /$ @
  _.$@
 (_|$@
     @@
226  LATIN SMALL LETTER A WITH CIRCUMFLEX
  /\\$@
  _.$@
 (_|$@
     @@
227  LATIN SMALL LETTER A WITH TILDE
 /\\/$@
  _.$@
 (_|$@
     @@
228  LATIN SMALL LETTER A WITH DIAERESIS
 o o$@
  _.$@
 (_|$@
     @@
229  LATIN SMALL LETTER A WITH RING ABOVE
  O$ @
  _.$@
 (_|$@
     @@
230  LATIN SMALL LETTER AE
       @
  ___$ @
 (_|/_$@
       @@
231  LATIN SMALL LETTER C WITH CEDILLA
    @
  _$@
 (_$@
  S$@@
232  LATIN SMALL LETTER E WITH GRAVE
  \\$ @
  _$ @
 (/_$@
     @@
233  LATIN SMALL LETTER E WITH ACUTE
  /$ @
  _$ @
 (/_$@
     @@
234  LATIN SMALL LETTER E WITH CIRCUMFLEX
  /\\$@
  _$ @
 (/_$@
     @@
235  LATIN SMALL LETTER E WITH DIAERESIS
 o o$@
  _$ @
 (/_$@
     @@
236  LATIN SMALL LETTER I WITH GRAVE
 \\$@
   @
 |$@
   @@
237  LATIN SMALL LETTER I WITH ACUTE
 /$@
   @
 |$@
   @@
238  LATIN SMALL LETTER I WITH CIRCUMFLEX
 /\\$@
    @
 |$ @
    @@
239  LATIN SMALL LETTER I WITH DIAERESIS
 o o$@
     @
  |$ @
     @@
240  LATIN SMALL LETTER ETH
 X$  @
  \\$ @
 (_|$@
     @@
241  LATIN SMALL LETTER N WITH TILDE
 /\\/$@
 ._$ @
 | |$@
     @@
242  LATIN SMALL LETTER O WITH GRAVE
  \\$ @
  _$ @
 (_)$@
     @@
243  LATIN SMALL LETTER O WITH ACUTE
  /$ @
  _$ @
 (_)$@
     @@
244  LATIN SMALL LETTER O WITH CIRCUMFLEX
  /\\$@
  _$ @
 (_)$@
     @@
245  LATIN SMALL LETTER O WITH TILDE
 /\\/$@
  _$ @
 (_)$@
     @@
246  LATIN SMALL LETTER O WITH DIAERESIS
 o o$@
  _$ @
 (_)$@
     @@
247  DIVISION SIGN
  o$ @
 ---$@
  o$ @
     @@
248  LATIN SMALL LETTER O WITH STROKE
     @
  _$ @
 (/)$@
     @@
249  LATIN SMALL LETTER U WITH GRAVE
  \\$ @
     @
 |_|$@
     @@
250  LATIN SMALL LETTER U WITH ACUTE
  /$ @
     @
 |_|$@
     @@
251  LATIN SMALL LETTER U WITH CIRCUMFLEX
  /\\$@
     @
 |_|$@
     @@
252  LATIN SMALL LETTER U WITH DIAERESIS
 o o$@
     @
 |_|$@
     @@
253  LATIN SMALL LETTER Y WITH ACUTE
  /$@
    @
 \\/$@
 /$ @@
254  LATIN SMALL LETTER THORN
     @
 |_$ @
 |_)$@
 |$  @@
255  LATIN SMALL LETTER Y WITH DIAERESIS
 oo$@
    @
 \\/$@
 /$ @@
`},Symbol.toStringTag,{value:"Module"})),Za=Object.freeze(Object.defineProperty({__proto__:null,default:`flf2a$ 7 5 16 0 10 0 3904 96
Script by Glenn Chappell 4/93
Includes ISO Latin-1
figlet release 2.1 -- 12 Aug 1994
Permission is hereby given to modify this font, as long as the
modifier's name is placed on a comment line.

Modified by Paul Burton <solution@earthlink.net> 12/96 to include new parameter
supported by FIGlet and FIGWin.  May also be slightly modified for better use
of new full-width/kern/smush alternatives, but default output is NOT changed.

$$@
$$@
$$@
$$@
$$@
$$@
$$@@
  @
 |@
 |@
 |@
 o@
  @
  @@
 oo@
 ||@
 $$@
 $$@
 $$@
   @
   @@
         @
   |  |  @
 --+--+--@
 --+--+--@
   |  |  @
         @
         @@
      @
  |_|_@
 (|_| @
 _|_|)@
  | | @
      @
      @@
     @
 () /@
   / @
  /  @
 / ()@
     @
     @@
      @
  ()  @
  /\\  @
 /  \\/@
 \\__/\\@
      @
      @@
 o@
 /@
 $@
 $@
 $@
  @
  @@
   @
  /@
 | @
 | @
 | @
  \\@
   @@
   @
 \\ @
  |@
  |@
  |@
 / @
   @@
      @
      @
  \\|/ @
 --*--@
  /|\\ @
      @
      @@
      @
      @
   |  @
 --+--@
   |  @
      @
      @@
  @
  @
  @
  @
 o@
 /@
  @@
      @
      @
      @
 -----@
   $  @
      @
      @@
  @
  @
  @
  @
 o@
  @
  @@
     @
    /@
   / @
  /  @
 /   @
     @
     @@
   __  @
  /  \\ @
 |    |@
 |    |@
  \\__/ @
       @
       @@
  ,@
 /|@
  |@
  |@
  |@
   @
   @@
  __ @
 /  )@
  $/ @
  /  @
 /___@
     @
     @@
  ___ @
 /   \\@
  $__/@
  $  \\@
 \\___/@
      @
      @@
      @
 |  | @
 |__|_@
    | @
    | @
      @
      @@
  ____@
 |    @
 |___ @
  $  \\@
 \\___/@
      @
      @@
   __ @
  /$  @
 | __ @
 |/  \\@
  \\__/@
      @
      @@
 _____@
  $  /@
  $ / @
  $/  @
  /   @
      @
      @@
  __ @
 /  \\@
 \\__/@
 /  \\@
 \\__/@
     @
     @@
  __ @
 /  |@
 \\_/|@
    |@
    |@
     @
     @@
  @
 o@
 $@
 $@
 o@
  @
  @@
  @
 o@
 $@
 $@
 o@
 /@
  @@
   @
  /@
 / @
 \\ @
  \\@
   @
   @@
      @
      @
 -----@
 -----@
      @
      @
      @@
   @
 \\ @
  \\@
  /@
 / @
   @
   @@
  __ @
 /  \\@
  $_/@
  |  @
  o  @
     @
     @@
         @
   ____  @
  / __,\\ @
 | /  | |@
 | \\_/|/ @
  \\____/ @
         @@
   ___,  @
  /   |  @
 |    |  @
 |    |  @
  \\__/\\_/@
         @
         @@
  , __ @
 /|/  \\@
  | __/@
  |   \\@
  |(__/@
       @
       @@
   ___$@
  / (_)@
 |   $ @
 |   $ @
  \\___/@
       @
       @@
  $____  @
  (|   \\ @
   |    |@
 $_|    |@
 (/\\___/ @
         @
         @@
  ___$@
 / (_)@
 \\__$ @
 /  $ @
 \\___/@
      @
      @@
 $______@
 (_) |$ @
    _|_$@
   / | |@
  (_/   @
        @
        @@
       @
   () |@
   /\\/|@
  /   |@
 /(__/ @
       @
       @@
  ,     @
 /|   | @
  |___| @
  |   |\\@
  |   |/@
        @
        @@
    _ @
   | |@
   | |@
 _ |/ @
 \\_/\\/@
      @
      @@
      @
  /\\  @
 |  | @
 |  | @
  \\_|/@
   /| @
   \\| @@
  ,     @
 /|   / @
  |__/  @
  | \\$  @
  |  \\_/@
        @
        @@
   $_$  @
 \\_|_)  @
   |$   @
 $_|$   @
 (/\\___/@
        @
        @@
  ,__ __   @
 /|  |  |  @
  |  |  |  @
  |  |  |  @
  |  |  |_/@
           @
           @@
  , _    @
 /|/ \\   @
  |   |  @
  |   |  @
  |   |_/@
         @
         @@
   __  @
  /\\_\\/@
 |    |@
 |    |@
  \\__/ @
       @
       @@
  , __ @
 /|/  \\@
  |___/@
  |   $@
  |   $@
       @
       @@
   __    @
  /  \\   @
 | __ |  @
 |/  \\|  @
  \\__/\\_/@
         @
         @@
  , __  @
 /|/  \\ @
  |___/ @
  | \\$  @
  |  \\_/@
        @
        @@
      @
   () @
   /\\ @
  /  \\@
 /(__/@
      @
      @@
 $______@
 (_) |  @
   $ |  @
  $_ |  @
  (_/   @
        @
        @@
 $_        @
 (_|    |  @
   |    |  @
   |    |  @
    \\__/\\_/@
           @
           @@
 $_       @
 (_|   |_/@
   |   |  @
   |   |  @
    \\_/   @
          @
          @@
 $_           @
 (_|   |   |_/@
   |   |   |  @
   |   |   |  @
    \\_/ \\_/   @
              @
              @@
 $_      @
 (_\\  /  @
   $\\/   @
   $/\\   @
  _/  \\_/@
         @
         @@
 $_      @
 (_|   | @
   |   | @
   |   | @
    \\_/|/@
      /| @
      \\| @@
 $__  @
 (_ \\ @
   $/ @
   /  @
  /__/@
   /| @
   \\| @@
  _@
 | @
 | @
 | @
 | @
 |_@
   @@
     @
 \\   @
  \\  @
   \\ @
    \\@
     @
     @@
 _ @
  |@
  |@
  |@
  |@
 _|@
   @@
 /\\@
  $@
  $@
  $@
  $@
   @
   @@
      @
      @
      @
      @
   $  @
   $  @
 _____@@
 o@
 \\@
 $@
 $@
 $@
  @
  @@
       @
       @
  __,  @
 /  |  @
 \\_/|_/@
       @
       @@
 $_$  @
 | |  @
 | |  @
 |/ \\_@
  \\_/ @
      @
      @@
      @
      @
  __  @
 /$   @
 \\___/@
      @
      @@
       @
    |  @
  __|  @
 /  |  @
 \\_/|_/@
       @
       @@
     @
     @
  _  @
 |/  @
 |__/@
     @
     @@
 $_$ @
 | | @
 | | @
 |/  @
 |__/@
 |\\  @
 |/  @@
      @
      @
  __, @
 /  | @
 \\_/|/@
   /| @
   \\| @@
 $_$    @
 | |    @
 | |    @
 |/ \\   @
 |   |_/@
        @
        @@
    @
 o  @
    @
 |  @
 |_/@
    @
    @@
    @
  o @
    @
  | @
  |/@
 /| @
 \\| @@
 $_$  @
 | |  @
 | |  @
 |/_) @
 | \\_/@
      @
      @@
 $_$ @
 | | @
 | | @
 |/  @
 |__/@
     @
     @@
            @
            @
  _  _  _   @
 / |/ |/ |  @
 $ |  |  |_/@
            @
            @@
         @
         @
  _  _   @
 / |/ |  @
 $ |  |_/@
         @
         @@
      @
      @
  __  @
 /  \\_@
 \\__/ @
      @
      @@
       @
       @
    _  @
  |/ \\_@
  |__/ @
 /|    @
 \\|    @@
       @
       @
  __,  @
 /  |  @
 \\_/|_/@
    |\\ @
    |/ @@
       @
       @
  ,_   @
 /  |  @
 $  |_/@
       @
       @@
     @
     @
  ,  @
 / \\_@
 $\\/ @
     @
     @@
     @
     @
 _|_ @
  |  @
  |_/@
     @
     @@
        @
        @
        @
 |   |  @
 $\\_/|_/@
        @
        @@
      @
      @
      @
 |  |_@
 $\\/  @
      @
      @@
         @
         @
         @
 |  |  |_@
 $\\/ \\/  @
         @
         @@
      @
      @
      @
 /\\/  @
 $/\\_/@
      @
      @@
       @
       @
       @
 |   | @
 $\\_/|/@
    /| @
    \\| @@
      @
      @
  __  @
 / / _@
 $/_/ @
   /| @
   \\| @@
    @
   /@
  | @
 <  @
  | @
   \\@
    @@
 |@
 |@
 |@
 |@
 |@
 |@
 |@@
    @
 \\  @
  | @
   >@
  | @
 /  @
    @@
 /\\/@
  $ @
  $ @
  $ @
  $ @
    @
    @@
  o   o  @
   ___,  @
  /   |  @
 |    |  @
  \\__/\\_/@
         @
         @@
  o  o @
   __  @
  /\\_\\/@
 |    |@
  \\__/ @
       @
       @@
    o  o   @
 $_        @
 (_|    |  @
   |    |  @
    \\__/\\_/@
           @
           @@
 o  o  @
       @
  __,  @
 /  |  @
 \\_/|_/@
       @
       @@
 o  o @
      @
  __  @
 /  \\_@
 \\__/ @
      @
      @@
 o   o  @
        @
        @
 |   |  @
 $\\_/|_/@
        @
        @@
   _ @
  / \\@
 |  /@
 |  \\@
 | _/@
 |   @
     @@
160  NO-BREAK SPACE
 $$@
 $$@
 $$@
 $$@
 $$@
 $$@
 $$@@
161  INVERTED EXCLAMATION MARK
  @
 o@
 |@
 |@
 |@
  @
  @@
162  CENT SIGN
      @
      @
  _|_ @
 / |  @
 \\_|_/@
   |  @
      @@
163  POUND SIGN
     _  @
    / \\ @
 __|__  @
  _| $  @
 (/ \\__/@
        @
        @@
164  CURRENCY SIGN
      @
 \\ _ /@
  / \\ @
  \\_/ @
 /   \\@
      @
      @@
165  YEN SIGN
      @
 \\   /@
 _\\_/_@
 __|__@
   |  @
      @
      @@
166  BROKEN BAR
 |@
 |@
 |@
  @
 |@
 |@
 |@@
167  SECTION SIGN
  _@
 ( @
 /\\@
 \\/@
 _)@
   @
   @@
168  DIAERESIS
 o  o@
 $  $@
 $  $@
 $  $@
 $  $@
     @
     @@
169  COPYRIGHT SIGN
    ____   @
   / __ \\  @
  / / () \\ @
 | |      |@
  \\ \\__/ / @
   \\____/  @
           @@
170  FEMININE ORDINAL INDICATOR
  __, @
 /  | @
 \\_/|_@
 ---- @
   $  @
      @
      @@
171  LEFT-POINTING DOUBLE ANGLE QUOTATION MARK
    @
  //@
 // @
 \\\\ @
  \\\\@
    @
    @@
172  NOT SIGN
     @
 ___ @
    |@
   $ @
   $ @
     @
     @@
173  SOFT HYPHEN
     @
     @
     @
 ----@
   $ @
     @
     @@
174  REGISTERED SIGN
    ____   @
   /, _ \\  @
  //|/ \\ \\ @
 |  |__/  |@
  \\ | \\_// @
   \\____/  @
           @@
175  MACRON
 _____@
   $  @
   $  @
   $  @
   $  @
      @
      @@
176  DEGREE SIGN
  _ @
 / \\@
 \\_/@
    @
  $ @
    @
    @@
177  PLUS-MINUS SIGN
      @
      @
   |  @
 --+--@
 __|__@
      @
      @@
178  SUPERSCRIPT TWO
 _ @
  )@
 /_@
   @
  $@
   @
   @@
179  SUPERSCRIPT THREE
 ___@
  _/@
 __)@
    @
  $ @
    @
    @@
180  ACUTE ACCENT
 /@
 $@
 $@
 $@
 $@
  @
  @@
181  MICRO SIGN
        @
        @
        @
 |   |  @
 |\\_/|_/@
 |      @
 |      @@
182  PILCROW SIGN
  ____ @
 / |  |@
 \\_|  |@
   |  |@
   |  |@
       @
       @@
183  MIDDLE DOT
    @
    @
 $O$@
  $ @
  $ @
    @
    @@
184  CEDILLA
   @
   @
   @
   @
 $ @
 _)@
   @@
185  SUPERSCRIPT ONE
  ,@
 /|@
  |@
   @
  $@
   @
   @@
186  MASCULINE ORDINAL INDICATOR
  __  @
 /  \\_@
 \\__/ @
 ---- @
   $  @
      @
      @@
187  RIGHT-POINTING DOUBLE ANGLE QUOTATION MARK
    @
 \\\\ @
  \\\\@
  //@
 // @
    @
    @@
188  VULGAR FRACTION ONE QUARTER
  ,    @
 /| /  @
  |/   @
  /|_|_@
 /   | @
       @
       @@
189  VULGAR FRACTION ONE HALF
  ,   @
 /| / @
  |/_ @
  /  )@
 /  /_@
      @
      @@
190  VULGAR FRACTION THREE QUARTERS
 ___    @
  _/ /  @
 __)/   @
   /|_|_@
  /   | @
        @
        @@
191  INVERTED QUESTION MARK
     @
   o @
  _| @
 /$  @
 \\__/@
     @
     @@
192  LATIN CAPITAL LETTER A WITH GRAVE
    \\    @
   ___,  @
  /   |  @
 |    |  @
  \\__/\\_/@
         @
         @@
193  LATIN CAPITAL LETTER A WITH ACUTE
    /    @
   ___,  @
  /   |  @
 |    |  @
  \\__/\\_/@
         @
         @@
194  LATIN CAPITAL LETTER A WITH CIRCUMFLEX
    /\\   @
   ___,  @
  /   |  @
 |    |  @
  \\__/\\_/@
         @
         @@
195  LATIN CAPITAL LETTER A WITH TILDE
   /\\/   @
   ___,  @
  /   |  @
 |    |  @
  \\__/\\_/@
         @
         @@
196  LATIN CAPITAL LETTER A WITH DIAERESIS
  o   o  @
   ___,  @
  /   |  @
 |    |  @
  \\__/\\_/@
         @
         @@
197  LATIN CAPITAL LETTER A WITH RING ABOVE
    _    @
   (_),  @
  /   |  @
 |    |  @
  \\__/\\_/@
         @
         @@
198  LATIN CAPITAL LETTER AE
   ___,___$@
  /   | (_)@
 |    |__  @
 |    |    @
  \\__/\\___/@
           @
           @@
199  LATIN CAPITAL LETTER C WITH CEDILLA
   ___$@
  / (_)@
 |   $ @
 |   $ @
  \\___/@
   _)  @
       @@
200  LATIN CAPITAL LETTER E WITH GRAVE
   \\   @
  ___$ @
 / (_) @
 >--$  @
 \\____/@
       @
       @@
201  LATIN CAPITAL LETTER E WITH ACUTE
   /   @
  ___$ @
 / (_) @
 >--$  @
 \\____/@
       @
       @@
202  LATIN CAPITAL LETTER E WITH CIRCUMFLEX
  /\\   @
  ___$ @
 / (_) @
 >--$  @
 \\____/@
       @
       @@
203  LATIN CAPITAL LETTER E WITH DIAERESIS
 o   o @
  ___$ @
 / (_) @
 >--$  @
 \\____/@
       @
       @@
204  LATIN CAPITAL LETTER I WITH GRAVE
    \\  @
   $_$ @
   | | @
 _ |/  @
 \\_/\\_/@
       @
       @@
205  LATIN CAPITAL LETTER I WITH ACUTE
    /  @
   $_$ @
   | | @
 _ |/  @
 \\_/\\_/@
       @
       @@
206  LATIN CAPITAL LETTER I WITH CIRCUMFLEX
   /\\  @
   $_$ @
   | | @
 _ |/  @
 \\_/\\_/@
       @
       @@
207  LATIN CAPITAL LETTER I WITH DIAERESIS
  o  o @
   $_$ @
   | | @
 _ |/  @
 \\_/\\_/@
       @
       @@
208  LATIN CAPITAL LETTER ETH
  $____  @
  (|   \\ @
 __|__  |@
 $_|    |@
 (/\\___/ @
         @
         @@
209  LATIN CAPITAL LETTER N WITH TILDE
   /\\/   @
  , _    @
 /|/ \\   @
  |   |  @
  |   |_/@
         @
         @@
210  LATIN CAPITAL LETTER O WITH GRAVE
   \\   @
   __  @
  /\\_\\/@
 |    |@
  \\__/ @
       @
       @@
211  LATIN CAPITAL LETTER O WITH ACUTE
    /  @
   __  @
  /\\_\\/@
 |    |@
  \\__/ @
       @
       @@
212  LATIN CAPITAL LETTER O WITH CIRCUMFLEX
   /\\  @
   __  @
  /\\_\\/@
 |    |@
  \\__/ @
       @
       @@
213  LATIN CAPITAL LETTER O WITH TILDE
   /\\/ @
   __  @
  /\\_\\/@
 |    |@
  \\__/ @
       @
       @@
214  LATIN CAPITAL LETTER O WITH DIAERESIS
  o  o @
   __  @
  /\\_\\/@
 |    |@
  \\__/ @
       @
       @@
215  MULTIPLICATION SIGN
     @
     @
 $\\/$@
 $/\\$@
 $  $@
     @
     @@
216  LATIN CAPITAL LETTER O WITH STROKE
   __ /@
  /\\_//@
 |  / |@
 | /  |@
  /__/ @
 /     @
       @@
217  LATIN CAPITAL LETTER U WITH GRAVE
     \\     @
 $_        @
 (_|    |  @
   |    |  @
    \\__/\\_/@
           @
           @@
218  LATIN CAPITAL LETTER U WITH ACUTE
      /    @
 $_        @
 (_|    |  @
   |    |  @
    \\__/\\_/@
           @
           @@
219  LATIN CAPITAL LETTER U WITH CIRCUMFLEX
     /\\    @
 $_        @
 (_|    |  @
   |    |  @
    \\__/\\_/@
           @
           @@
220  LATIN CAPITAL LETTER U WITH DIAERESIS
    o  o   @
 $_        @
 (_|    |  @
   |    |  @
    \\__/\\_/@
           @
           @@
221  LATIN CAPITAL LETTER Y WITH ACUTE
     /   @
 $_      @
 (_|   | @
   |   | @
    \\_/|/@
      /| @
      \\| @@
222  LATIN CAPITAL LETTER THORN
  ,    @
  | __ @
 /|/  \\@
  |___/@
  |   $@
       @
       @@
223  LATIN SMALL LETTER SHARP S
   _ @
  / \\@
 |  /@
 |  \\@
 | _/@
 |   @
     @@
224  LATIN SMALL LETTER A WITH GRAVE
   \\   @
       @
  __,  @
 /  |  @
 \\_/|_/@
       @
       @@
225  LATIN SMALL LETTER A WITH ACUTE
   /   @
       @
  __,  @
 /  |  @
 \\_/|_/@
       @
       @@
226  LATIN SMALL LETTER A WITH CIRCUMFLEX
  /\\   @
       @
  __,  @
 /  |  @
 \\_/|_/@
       @
       @@
227  LATIN SMALL LETTER A WITH TILDE
  /\\/  @
       @
  __,  @
 /  |  @
 \\_/|_/@
       @
       @@
228  LATIN SMALL LETTER A WITH DIAERESIS
 o  o  @
       @
  __,  @
 /  |  @
 \\_/|_/@
       @
       @@
229  LATIN SMALL LETTER A WITH RING ABOVE
       @
  ()   @
  __,  @
 /  |  @
 \\_/|_/@
       @
       @@
230  LATIN SMALL LETTER AE
        @
        @
  __,_  @
 /  |/  @
 \\_/|__/@
        @
        @@
231  LATIN SMALL LETTER C WITH CEDILLA
      @
      @
  __  @
 /    @
 \\___/@
  _)  @
      @@
232  LATIN SMALL LETTER E WITH GRAVE
  \\  @
     @
  _  @
 |/  @
 |__/@
     @
     @@
233  LATIN SMALL LETTER E WITH ACUTE
  /  @
     @
  _  @
 |/  @
 |__/@
     @
     @@
234  LATIN SMALL LETTER E WITH CIRCUMFLEX
 /\\  @
     @
  _  @
 |/  @
 |__/@
     @
     @@
235  LATIN SMALL LETTER E WITH DIAERESIS
 o o @
     @
  _  @
 |/  @
 |__/@
     @
     @@
236  LATIN SMALL LETTER I WITH GRAVE
 \\  @
    @
    @
 |  @
 |_/@
    @
    @@
237  LATIN SMALL LETTER I WITH ACUTE
 /  @
    @
    @
 |  @
 |_/@
    @
    @@
238  LATIN SMALL LETTER I WITH CIRCUMFLEX
 /\\ @
    @
    @
 |  @
 |_/@
    @
    @@
239  LATIN SMALL LETTER I WITH DIAERESIS
 o o @
     @
     @
 |   @
 |__/@
     @
     @@
240  LATIN SMALL LETTER ETH
     @
   \\/@
  _'|@
 /  |@
 \\_/ @
     @
     @@
241  LATIN SMALL LETTER N WITH TILDE
   /\\/   @
         @
  _  _   @
 / |/ |  @
 $ |  |_/@
         @
         @@
242  LATIN SMALL LETTER O WITH GRAVE
  \\   @
      @
  __  @
 /  \\_@
 \\__/ @
      @
      @@
243  LATIN SMALL LETTER O WITH ACUTE
   /  @
      @
  __  @
 /  \\_@
 \\__/ @
      @
      @@
244  LATIN SMALL LETTER O WITH CIRCUMFLEX
  /\\  @
      @
  __  @
 /  \\_@
 \\__/ @
      @
      @@
245  LATIN SMALL LETTER O WITH TILDE
  /\\/ @
      @
  __  @
 /  \\_@
 \\__/ @
      @
      @@
246  LATIN SMALL LETTER O WITH DIAERESIS
 o  o @
      @
  __  @
 /  \\_@
 \\__/ @
      @
      @@
247  DIVISION SIGN
      @
      @
   O  @
 -----@
   O  @
      @
      @@
248  LATIN SMALL LETTER O WITH STROKE
      @
      @
  __/ @
 / /\\_@
 \\/_/ @
 /    @
      @@
249  LATIN SMALL LETTER U WITH GRAVE
   \\    @
        @
        @
 |   |  @
 $\\_/|_/@
        @
        @@
250  LATIN SMALL LETTER U WITH ACUTE
   /    @
        @
        @
 |   |  @
 $\\_/|_/@
        @
        @@
251  LATIN SMALL LETTER U WITH CIRCUMFLEX
   /\\   @
        @
        @
 |   |  @
 $\\_/|_/@
        @
        @@
252  LATIN SMALL LETTER U WITH DIAERESIS
 o   o  @
        @
        @
 |   |  @
 $\\_/|_/@
        @
        @@
253  LATIN SMALL LETTER Y WITH ACUTE
   /   @
       @
       @
 |   | @
 $\\_/|/@
    /| @
    \\| @@
254  LATIN SMALL LETTER THORN
   _   @
  | |  @
  | |  @
  |/ \\_@
  |__/ @
 /|    @
 \\|    @@
255  LATIN SMALL LETTER Y WITH DIAERESIS
 o   o @
       @
       @
 |   | @
 $\\_/|/@
    /| @
    \\| @@
`},Symbol.toStringTag,{value:"Module"})),_o=Object.freeze(Object.defineProperty({__proto__:null,default:`flf2a$ 5 4 16 0 14 0 4992
Shadow by Glenn Chappell 6/93 -- based on Standard & SmShadow
Includes ISO Latin-1
figlet release 2.1 -- 12 Aug 1994
Permission is hereby given to modify this font, as long as the
modifier's name is placed on a comment line.

Modified by Paul Burton <solution@earthlink.net> 12/96 to include new parameter
supported by FIGlet and FIGWin.  May also be slightly modified for better use
of new full-width/kern/smush alternatives, but default output is NOT changed.

---

Font modified June 17, 2007 by patorjk 
This was to widen the space character.
$ $$@
$ $$@
$ $$@
$ $$@
$ $$@@
 $|$@
 $|$@
 _|$@
 _)$@
    @@
 $| )$@
 V V$ @
  $$  @
  $$  @
      @@
   $|  |$  @
 _  |_ |_|$@
 _  |_ |_|$@
   _| _|$  @
           @@
   $|$ @
 $ __)$@
 \\__ \\$@
 (   /$@
   _|$ @@
 _)  /$@
   $/$ @
  $/$  @
 _/ _)$@
       @@
 $ _ )$  @
  $_ \\ \\$@
 $( \`  <$@
 \\___/\\/$@
         @@
 $)$@
 /$ @
 $$ @
 $$ @
    @@
  $/$@
 $|$ @
 $|$ @
 $|$ @
 \\_\\$@@
 \\ \\$ @
   $|$@
   $|$@
   $|$@
  _/$ @@
   $\\$  @
 \\    /$@
 $_  _\\$@
   \\/$  @
        @@
        @
   $|$  @
 _   _|$@
   _|$  @
        @@
    @
    @
    @
 $)$@
 /$ @@
        @
        @
 _____|$@
   $$   @
        @@
    @
    @
    @
 _)$@
    @@
    $/$@
   $/$ @
  $/$  @
 _/$   @
       @@
  $_ \\$ @
 $|   |$@
 $|   |$@
 \\___/$ @
        @@
 _ |$@
  $|$@
  $|$@
  _|$@
     @@
 ___ \\$ @
    ) |$@
  $__/$ @
 _____|$@
        @@
 ___ /$ @
   _ \\$ @
    ) |$@
 ____/$ @
        @@
 $|  |$  @
 $|  |$  @
 ___ __|$@
    _|$  @
         @@
 $___|$ @
 $__ \\$ @
    ) |$@
 ____/$ @
        @@
  $/$   @
 $ _ \\$ @
 $(   |$@
 \\___/$ @
        @@
 ___  |$@
    $/$ @
   $/$  @
  _/$   @
        @@
 $ _ )$ @
  $_ \\$ @
 $(   |$@
 \\___/$ @
        @@
  $_ \\$ @
 $(   |$@
 \\__  |$@
   __/$ @
        @@
    @
 _)$@
 $$ @
 _)$@
    @@
    @
 _)$@
 $$ @
 $)$@
 /$ @@
   $/$@
  $/$ @
 \\ \\$ @
  \\_\\$@
      @@
        @
 _____|$@
 _____|$@
        @
        @@
 \\ \\$ @
  \\ \\$@
   $/$@
  _/$ @
      @@
 __ \\$@
   $/$@
  _|$ @
  _)$ @
      @@
   $__ \\$ @
  $/ _\` |$@
 $| (   |$@
 \\ \\__,_|$@
  \\____/$ @@
    $\\$   @
   $_ \\$  @
  $___ \\$ @
 _/    _\\$@
          @@
 $__ )$ @
 $__ \\$ @
 $|   |$@
 ____/$ @
        @@
  $___|$@
 $|$    @
 $|$    @
 \\____|$@
        @@
 $__ \\$ @
 $|   |$@
 $|   |$@
 ____/$ @
        @@
 $____|$@
 $__|$  @
 $|$    @
 _____|$@
        @@
 $____|$@
 $|$    @
 $__|$  @
 _|$    @
        @@
  $___|$@
 $|$    @
 $|   |$@
 \\____|$@
        @@
 $|   |$@
 $|   |$@
 $___ |$@
 _|  _|$@
        @@
 _ _|$@
  $|$ @
  $|$ @
 ___|$@
      @@
     $|$@
     $|$@
 $\\   |$@
 \\___/$ @
        @@
 $|  /$@
 $' /$ @
 $. \\$ @
 _|\\_\\$@
       @@
 $|$    @
 $|$    @
 $|$    @
 _____|$@
        @@
 $ \\  |$@
 $|\\/ |$@
 $|   |$@
 _|  _|$@
        @@
 $ \\  |$@
 $  \\ |$@
 $|\\  |$@
 _| \\_|$@
        @@
  $_ \\$ @
 $|   |$@
 $|   |$@
 \\___/$ @
        @@
 $ _ \\$ @
 $|   |$@
 $___/$ @
 _|$    @
        @@
  $_ \\$ @
 $|   |$@
 $|   |$@
 \\__\\_\\$@
        @@
 $ _ \\$ @
 $|   |$@
 $__ <$ @
 _| \\_\\$@
        @@
  $___|$ @
 \\___ \\$ @
      $|$@
 _____/$ @
         @@
 __ __|$@
   $|$  @
   $|$  @
   _|$  @
        @@
 $|   |$@
 $|   |$@
 $|   |$@
 \\___/$ @
        @@
 \\ \\     /$@
  \\ \\   /$ @
   \\ \\ /$  @
    \\_/$   @
           @@
 \\ \\        /$@
  \\ \\  \\   /$ @
   \\ \\  \\ /$  @
    \\_/\\_/$   @
              @@
 \\ \\  /$@
  \\  /$ @
   $ \\$ @
  _/\\_\\$@
        @@
 \\ \\   /$@
  \\   /$ @
    $|$  @
    _|$  @
         @@
 __  /$@
   $/$ @
  $/$  @
 ____|$@
       @@
 $_|$@
 $|$ @
 $|$ @
 $|$ @
 __|$@@
 \\ \\$   @
  \\ \\$  @
   \\ \\$ @
    \\_\\$@
        @@
 _ |$@
  $|$@
  $|$@
  $|$@
 __|$@@
 /\\\\$@
  $$ @
  $$ @
  $$ @
     @@
        @
        @
        @
   $$   @
 _____|$@@
 $)$@
 \\|$@
 $$ @
 $$ @
    @@
        @
  $_\` |$@
 $(   |$@
 \\__,_|$@
        @@
 $|$    @
 $__ \\$ @
 $|   |$@
 _.__/$ @
        @@
       @
  $__|$@
 $($   @
 \\___|$@
       @@
     $|$@
  $_\` |$@
 $(   |$@
 \\__,_|$@
        @@
       @
  $_ \\$@
 $ __/$@
 \\___|$@
       @@
  $_|$@
 $|$  @
 $__|$@
 _|$  @
      @@
        @
  $_\` |$@
 $(   |$@
 \\__, |$@
 |___/$ @@
 $|$    @
 $__ \\$ @
 $| | |$@
 _| |_|$@
        @@
 _)$@
 $|$@
 $|$@
 _|$@
    @@
    _)$@
    $|$@
    $|$@
    $|$@
 ___/$ @@
 $|$   @
 $|  /$@
 $  <$ @
 _|\\_\\$@
       @@
 $|$@
 $|$@
 $|$@
 _|$@
    @@
            @
 $__ \`__ \\$ @
 $|   |   |$@
 _|  _|  _|$@
            @@
        @
 $__ \\$ @
 $|   |$@
 _|  _|$@
        @@
        @
  $_ \\$ @
 $(   |$@
 \\___/$ @
        @@
        @
 $__ \\$ @
 $|   |$@
 $.__/$ @
 _|$    @@
        @
  $_\` |$@
 $(   |$@
 \\__, |$@
     _|$@@
       @
 $ __|$@
 $|$   @
 _|$   @
       @@
       @
  $__|$@
 \\__ \\$@
 ____/$@
       @@
 $|$  @
 $__|$@
 $|$  @
 \\__|$@
      @@
        @
 $|   |$@
 $|   |$@
 \\__,_|$@
        @@
         @
 \\ \\   /$@
  \\ \\ /$ @
   \\_/$  @
         @@
            @
 \\ \\  \\   /$@
  \\ \\  \\ /$ @
   \\_/\\_/$  @
            @@
        @
 \\ \\  /$@
  \`  <$ @
  _/\\_\\$@
        @@
        @
 $|   |$@
 $|   |$@
 \\__, |$@
 ____/$ @@
      @
 _  /$@
  $/$ @
 ___|$@
      @@
    $/$@
   $|$ @
 < <$  @
   $|$ @
   \\_\\$@@
 $|$@
 $|$@
 $|$@
 $|$@
 _|$@@
 \\ \\$  @
   $|$ @
   \` >$@
   $|$ @
  _/$  @@
 / _/$@
  $$  @
  $$  @
  $$  @
      @@
  _) \\ _)$@
   $_ \\$  @
  $___ \\$ @
 _/    _\\$@
          @@
 _)  _)$@
  $_ \\$ @
 $|   |$@
 \\___/$ @
        @@
 _)  _)$@
 $|   |$@
 $|   |$@
 \\___/$ @
        @@
 _)  _)$@
  $_\` |$@
 $(   |$@
 \\__,_|$@
        @@
 _)  _)$@
  $_ \\$ @
 $(   |$@
 \\___/$ @
        @@
 _)  _)$@
 $|   |$@
 $|   |$@
 \\__,_|$@
        @@
  $_ \\$@
 $|  /$@
 $|\\ \\$@
 $|__/$@
 _|$   @@
160  NO-BREAK SPACE
 $ $@
 $ $@
 $ $@
 $ $@
 $ $@@
161  INVERTED EXCLAMATION MARK
 _)$@
 $|$@
 $|$@
 _|$@
    @@
162  CENT SIGN
   $|$ @
  $__)$@
 $($   @
 \\   )$@
   _|$ @@
163  POUND SIGN
    $,_\\$ @
 _  |_$   @
   $|$    @
  _,____|$@
          @@
164  CURRENCY SIGN
 \\  _  /$@
  $(   |$@
  $___ \\$@
 \\/    /$@
         @@
165  YEN SIGN
 \\ \\ /$ @
 __ __|$@
 __ __|$@
   _|$  @
        @@
166  BROKEN BAR
 $|$@
 _|$@
    @
 $|$@
 _|$@@
167  SECTION SIGN
    $_)$@
  $\\ \\$ @
 \\ \\\\ \\$@
  \\ \\_/$@
 (__/$  @@
168  DIAERESIS
 _)  _)$@
 $    $ @
 $    $ @
 $    $ @
        @@
169  COPYRIGHT SIGN
   $    \\$  @
  $  __| \\$ @
 $  (     |$@
 \\ \\___| /$ @
  \\_____/$  @@
170  FEMININE ORDINAL INDICATOR
  $_\` |$@
 \\__,_|$@
 _____|$@
   $$   @
        @@
171  LEFT-POINTING DOUBLE ANGLE QUOTATION MARK
   $/ /$@
  $/ /$ @
 \\ \\ \\$ @
  \\_\\_\\$@
        @@
172  NOT SIGN
         @
 _____ |$@
      _|$@
    $$   @
         @@
173  SOFT HYPHEN
        @
        @
 _____|$@
   $$   @
        @@
174  REGISTERED SIGN
   $    \\$  @
  $  _ \\ \\$ @
 $     /  |$@
 \\  _|_\\ /$ @
  \\_____/$  @@
175  MACRON
 _____|$@
   $$   @
   $$   @
   $$   @
        @@
176  DEGREE SIGN
  $ \\$ @
 $(  |$@
 \\__/$ @
   $$  @
       @@
177  PLUS-MINUS SIGN
   $|$  @
 _   _|$@
   _|$  @
 _____|$@
        @@
178  SUPERSCRIPT TWO
 _  )$@
  $/$ @
 ___|$@
  $$  @
      @@
179  SUPERSCRIPT THREE
 __ /$@
  _ \\$@
 ___/$@
  $$  @
      @@
180  ACUTE ACCENT
 _/$@
 $$ @
 $$ @
 $$ @
    @@
181  MICRO SIGN
        @
 $|   |$@
 $|   |$@
 $._,_|$@
 _|$    @@
182  PILCROW SIGN
  $    |$@
 $(  | |$@
 \\__ | |$@
    _|_|$@
         @@
183  MIDDLE DOT
    @
 _)$@
 $$ @
 $$ @
    @@
184  CEDILLA
    @
    @
    @
 $$ @
 _)$@@
185  SUPERSCRIPT ONE
 _ |$@
  $|$@
  _|$@
  $$ @
     @@
186  MASCULINE ORDINAL INDICATOR
  $_ \\$@
 \\___/$@
 ____|$@
   $$  @
       @@
187  RIGHT-POINTING DOUBLE ANGLE QUOTATION MARK
 \\ \\ \\$ @
  \\ \\ \\$@
   $/ /$@
  _/_/$ @
        @@
188  VULGAR FRACTION ONE QUARTER
 _ |   /$    @
  $|  / | |$ @
  _| / __ _|$@
   _/    _|$ @
             @@
189  VULGAR FRACTION ONE HALF
 _ |   /$   @
  $|  /_  )$@
  _| /   /$ @
   _/  ___|$@
            @@
190  VULGAR FRACTION THREE QUARTERS
 __ /   /$    @
  _ \\  / | |$ @
 ___/ / __ _|$@
    _/    _|$ @
              @@
191  INVERTED QUESTION MARK
   _)$ @
   $|$ @
  $/$  @
 \\___|$@
       @@
192  LATIN CAPITAL LETTER A WITH GRAVE
  \\_\\$  @
   $\\$  @
  $_ \\$ @
 _/  _\\$@
        @@
193  LATIN CAPITAL LETTER A WITH ACUTE
   _/$  @
   $\\$  @
  $_ \\$ @
 _/  _\\$@
        @@
194  LATIN CAPITAL LETTER A WITH CIRCUMFLEX
   /\\\\$ @
   $\\$  @
  $_ \\$ @
 _/  _\\$@
        @@
195  LATIN CAPITAL LETTER A WITH TILDE
  / _/$ @
   $\\$  @
  $_ \\$ @
 _/  _\\$@
        @@
196  LATIN CAPITAL LETTER A WITH DIAERESIS
  _) \\ _)$@
   $_ \\$  @
  $___ \\$ @
 _/    _\\$@
          @@
197  LATIN CAPITAL LETTER A WITH RING ABOVE
    ( )$  @
   $_ \\$  @
  $___ \\$ @
 _/    _\\$@
          @@
198  LATIN CAPITAL LETTER AE
    $ ____|$@
   $/ __|$  @
  $__ |$    @
 _/  _____|$@
            @@
199  LATIN CAPITAL LETTER C WITH CEDILLA
  $___|$@
 $|$    @
 $|$    @
 \\____|$@
    _)$ @@
200  LATIN CAPITAL LETTER E WITH GRAVE
  \\_\\$  @
 $____|$@
 $ _|$  @
 _____|$@
        @@
201  LATIN CAPITAL LETTER E WITH ACUTE
   _/$  @
 $____|$@
 $ _|$  @
 _____|$@
        @@
202  LATIN CAPITAL LETTER E WITH CIRCUMFLEX
   /\\\\$ @
 $____|$@
 $ _|_$ @
 _____|$@
        @@
203  LATIN CAPITAL LETTER E WITH DIAERESIS
 _)  _)$@
 $____|$@
 $ _|$  @
 _____|$@
        @@
204  LATIN CAPITAL LETTER I WITH GRAVE
 \\_\\$ @
 _ _|$@
 | |$ @
 ___|$@
      @@
205  LATIN CAPITAL LETTER I WITH ACUTE
  _/$ @
 _ _|$@
  $|$ @
 ___|$@
      @@
206  LATIN CAPITAL LETTER I WITH CIRCUMFLEX
 /\\\\$ @
 _ _|$@
  $|$ @
 ___|$@
      @@
207  LATIN CAPITAL LETTER I WITH DIAERESIS
 _)  _)$@
  _ _|$ @
   $|$  @
  ___|$ @
        @@
208  LATIN CAPITAL LETTER ETH
    __ \\$ @
    |   |$@
 __ __| |$@
   ____/$ @
          @@
209  LATIN CAPITAL LETTER N WITH TILDE
  / _/$@
 $ \\ |$@
 $.  |$@
 _|\\_|$@
       @@
210  LATIN CAPITAL LETTER O WITH GRAVE
  \\_\\$  @
  $_ \\$ @
 $|   |$@
 \\___/$ @
        @@
211  LATIN CAPITAL LETTER O WITH ACUTE
   _/$  @
  $_ \\$ @
 $|   |$@
 \\___/$ @
        @@
212  LATIN CAPITAL LETTER O WITH CIRCUMFLEX
   /\\\\$ @
  $_ \\$ @
 $|   |$@
 \\___/$ @
        @@
213  LATIN CAPITAL LETTER O WITH TILDE
  / _/$ @
  $_ \\$ @
 $|   |$@
 \\___/$ @
        @@
214  LATIN CAPITAL LETTER O WITH DIAERESIS
 _)  _)$@
  $_ \\$ @
 $|   |$@
 \\___/$ @
        @@
215  MULTIPLICATION SIGN
      @
  \\ \\$@
 ,  '$@
 \\/\\/$@
      @@
216  LATIN CAPITAL LETTER O WITH STROKE
  $_ /$ @
 $| / |$@
 $ /  |$@
 _/__/$ @
        @@
217  LATIN CAPITAL LETTER U WITH GRAVE
  \\_\\$  @
 $|   |$@
 $|   |$@
 \\___/$ @
        @@
218  LATIN CAPITAL LETTER U WITH ACUTE
   _/$  @
 $|   |$@
 $|   |$@
 \\___/$ @
        @@
219  LATIN CAPITAL LETTER U WITH CIRCUMFLEX
   /\\\\$ @
 $|   |$@
 $|   |$@
 \\___/$ @
        @@
220  LATIN CAPITAL LETTER U WITH DIAERESIS
 _)  _)$@
 $|   |$@
 $|   |$@
 \\___/$ @
        @@
221  LATIN CAPITAL LETTER Y WITH ACUTE
    _/$ @
 \\ \\  /$@
  \\  /$ @
   _|$  @
        @@
222  LATIN CAPITAL LETTER THORN
 $|$    @
 $ __ \\$@
 $ ___/$@
 _|$    @
        @@
223  LATIN SMALL LETTER SHARP S
  $_ \\$@
 $|  /$@
 $|\\ \\$@
 $|__/$@
 _|$   @@
224  LATIN SMALL LETTER A WITH GRAVE
  \\_\\$  @
  $_\` |$@
 $(   |$@
 \\__,_|$@
        @@
225  LATIN SMALL LETTER A WITH ACUTE
   _/_$ @
  $_\` |$@
 $(   |$@
 \\__,_|$@
        @@
226  LATIN SMALL LETTER A WITH CIRCUMFLEX
   /\\\\$ @
  $_\` |$@
 $(   |$@
 \\__,_|$@
        @@
227  LATIN SMALL LETTER A WITH TILDE
  / _/$ @
  $_\` |$@
 $(   |$@
 \\__,_|$@
        @@
228  LATIN SMALL LETTER A WITH DIAERESIS
 _)  _)$@
  $_\` |$@
 $(   |$@
 \\__,_|$@
        @@
229  LATIN SMALL LETTER A WITH RING ABOVE
   ( )$ @
  $_ '|$@
 $(   |$@
 \\__,_|$@
        @@
230  LATIN SMALL LETTER AE
           @
  $_\`  _ \\$@
 $(    __/$@
 \\__,____|$@
           @@
231  LATIN SMALL LETTER C WITH CEDILLA
       @
  $__|$@
 $($   @
 \\___|$@
   _)$ @@
232  LATIN SMALL LETTER E WITH GRAVE
  \\_\\$ @
  $_ \\$@
 $ __/$@
 \\___|$@
       @@
233  LATIN SMALL LETTER E WITH ACUTE
   _/$ @
  $_ \\$@
 $ __/$@
 \\___|$@
       @@
234  LATIN SMALL LETTER E WITH CIRCUMFLEX
  /\\\\$ @
  $_ \\$@
 $ __/$@
 \\___|$@
       @@
235  LATIN SMALL LETTER E WITH DIAERESIS
 _)  _)$@
  $_ \\$ @
 $ __/$ @
 \\___|$ @
        @@
236  LATIN SMALL LETTER I WITH GRAVE
 \\_\\$@
  $|$@
  $|$@
  _|$@
     @@
237  LATIN SMALL LETTER I WITH ACUTE
 _/$@
 $|$@
 $|$@
 _|$@
    @@
238  LATIN SMALL LETTER I WITH CIRCUMFLEX
 /\\\\$@
 $|$ @
 $|$ @
 _|$ @
     @@
239  LATIN SMALL LETTER I WITH DIAERESIS
 _)  _)$@
   $|$  @
   $|$  @
   _|$  @
        @@
240  LATIN SMALL LETTER ETH
   \`  <$ @
   \\/\\ |$@
  $__\` |$@
 \\____/$ @
         @@
241  LATIN SMALL LETTER N WITH TILDE
  / _/$ @
 $'_ \\$ @
 $|   |$@
 _|  _|$@
        @@
242  LATIN SMALL LETTER O WITH GRAVE
  \\_\\$  @
  $_ \\$ @
 $(   |$@
 \\___/$ @
        @@
243  LATIN SMALL LETTER O WITH ACUTE
   _/$  @
  $_ \\$ @
 $(   |$@
 \\___/$ @
        @@
244  LATIN SMALL LETTER O WITH CIRCUMFLEX
   /\\\\$ @
  $_ \\$ @
 $(   |$@
 \\___/$ @
        @@
245  LATIN SMALL LETTER O WITH TILDE
  / _/$ @
  $_ \\$ @
 $(   |$@
 \\___/$ @
        @@
246  LATIN SMALL LETTER O WITH DIAERESIS
 _)  _)$@
  $_ \\$ @
 $(   |$@
 \\___/$ @
        @@
247  DIVISION SIGN
        @
   _)$  @
 _____|$@
   _)$  @
        @@
248  LATIN SMALL LETTER O WITH STROKE
         @
  $_ /\\$ @
 $( /  |$@
 \\_/__/$ @
         @@
249  LATIN SMALL LETTER U WITH GRAVE
  \\_\\$  @
 $|   |$@
 $|   |$@
 \\__,_|$@
        @@
250  LATIN SMALL LETTER U WITH ACUTE
   _/$  @
 $|   |$@
 $|   |$@
 \\__,_|$@
        @@
251  LATIN SMALL LETTER U WITH CIRCUMFLEX
   /\\\\$ @
 $|   |$@
 $|   |$@
 \\__,_|$@
        @@
252  LATIN SMALL LETTER U WITH DIAERESIS
 _)  _)$@
 $|   |$@
 $|   |$@
 \\__,_|$@
        @@
253  LATIN SMALL LETTER Y WITH ACUTE
   _/$  @
 $|   |$@
 $|   |$@
 \\__, |$@
 ____/$ @@
254  LATIN SMALL LETTER THORN
 $|$    @
 $__ \\$ @
 $|   |$@
 $.__/$ @
 _|$    @@
255  LATIN SMALL LETTER Y WITH DIAERESIS
 _)  _)$@
 $|   |$@
 $|   |$@
 \\__, |$@
 ____/$ @@
`},Symbol.toStringTag,{value:"Module"})),$o=Object.freeze(Object.defineProperty({__proto__:null,default:`flf2a$ 6 5 16 15 10 0 18319
Slant by Glenn Chappell 3/93 -- based on Standard
Includes ISO Latin-1
figlet release 2.1 -- 12 Aug 1994
Permission is hereby given to modify this font, as long as the
modifier's name is placed on a comment line.

Modified by Paul Burton <solution@earthlink.net> 12/96 to include new parameter
supported by FIGlet and FIGWin.  May also be slightly modified for better use
of new full-width/kern/smush alternatives, but default output is NOT changed.

     $$@
    $$ @
   $$  @
  $$   @
 $$    @
$$     @@
    __@
   / /@
  / / @
 /_/  @
(_)   @
      @@
 _ _ @
( | )@
|/|/ @
 $   @
$    @
     @@
     __ __ @
  __/ // /_@
 /_  _  __/@
/_  _  __/ @
 /_//_/    @
           @@
     __@
   _/ /@
  / __/@
 (_  ) @
/  _/  @
/_/    @@
   _   __@
  (_)_/_/@
   _/_/  @
 _/_/_   @
/_/ (_)  @
         @@
   ___   @
  ( _ )  @
 / __ \\/|@
/ /_/  < @
\\____/\\/ @
         @@
  _ @
 ( )@
 |/ @
 $  @
$   @
    @@
     __@
   _/_/@
  / /  @
 / /   @
/ /    @
|_|    @@
     _ @
    | |@
    / /@
   / / @
 _/_/  @
/_/    @@
       @
  __/|_@
 |    /@
/_ __| @
 |/    @
       @@
       @
    __ @
 __/ /_@
/_  __/@
 /_/   @
       @@
   @
   @
   @
 _ @
( )@
|/ @@
       @
       @
 ______@
/_____/@
  $    @
       @@
   @
   @
   @
 _ @
(_)@
   @@
       __@
     _/_/@
   _/_/  @
 _/_/    @
/_/      @
         @@
   ____ @
  / __ \\@
 / / / /@
/ /_/ / @
\\____/  @
        @@
   ___@
  <  /@
  / / @
 / /  @
/_/   @
      @@
   ___ @
  |__ \\@
  __/ /@
 / __/ @
/____/ @
       @@
   _____@
  |__  /@
   /_ < @
 ___/ / @
/____/  @
        @@
   __ __@
  / // /@
 / // /_@
/__  __/@
  /_/   @
        @@
    ______@
   / ____/@
  /___ \\  @
 ____/ /  @
/_____/   @
          @@
   _____@
  / ___/@
 / __ \\ @
/ /_/ / @
\\____/  @
        @@
 _____@
/__  /@
  / / @
 / /  @
/_/   @
      @@
   ____ @
  ( __ )@
 / __  |@
/ /_/ / @
\\____/  @
        @@
   ____ @
  / __ \\@
 / /_/ /@
 \\__, / @
/____/  @
        @@
     @
   _ @
  (_)@
 _   @
(_)  @
     @@
     @
   _ @
  (_)@
 _   @
( )  @
|/   @@
  __@
 / /@
/ / @
\\ \\ @
 \\_\\@
    @@
       @
  _____@
 /____/@
/____/ @
  $    @
       @@
__  @
\\ \\ @
 \\ \\@
 / /@
/_/ @
    @@
  ___ @
 /__ \\@
  / _/@
 /_/  @
(_)   @
      @@
   ______ @
  / ____ \\@
 / / __ \`/@
/ / /_/ / @
\\ \\__,_/  @
 \\____/   @@
    ___ @
   /   |@
  / /| |@
 / ___ |@
/_/  |_|@
        @@
    ____ @
   / __ )@
  / __  |@
 / /_/ / @
/_____/  @
         @@
   ______@
  / ____/@
 / /     @
/ /___   @
\\____/   @
         @@
    ____ @
   / __ \\@
  / / / /@
 / /_/ / @
/_____/  @
         @@
    ______@
   / ____/@
  / __/   @
 / /___   @
/_____/   @
          @@
    ______@
   / ____/@
  / /_    @
 / __/    @
/_/       @
          @@
   ______@
  / ____/@
 / / __  @
/ /_/ /  @
\\____/   @
         @@
    __  __@
   / / / /@
  / /_/ / @
 / __  /  @
/_/ /_/   @
          @@
    ____@
   /  _/@
   / /  @
 _/ /   @
/___/   @
        @@
       __@
      / /@
 __  / / @
/ /_/ /  @
\\____/   @
         @@
    __ __@
   / //_/@
  / ,<   @
 / /| |  @
/_/ |_|  @
         @@
    __ @
   / / @
  / /  @
 / /___@
/_____/@
       @@
    __  ___@
   /  |/  /@
  / /|_/ / @
 / /  / /  @
/_/  /_/   @
           @@
    _   __@
   / | / /@
  /  |/ / @
 / /|  /  @
/_/ |_/   @
          @@
   ____ @
  / __ \\@
 / / / /@
/ /_/ / @
\\____/  @
        @@
    ____ @
   / __ \\@
  / /_/ /@
 / ____/ @
/_/      @
         @@
   ____ @
  / __ \\@
 / / / /@
/ /_/ / @
\\___\\_\\ @
        @@
    ____ @
   / __ \\@
  / /_/ /@
 / _, _/ @
/_/ |_|  @
         @@
   _____@
  / ___/@
  \\__ \\ @
 ___/ / @
/____/  @
        @@
  ______@
 /_  __/@
  / /   @
 / /    @
/_/     @
        @@
   __  __@
  / / / /@
 / / / / @
/ /_/ /  @
\\____/   @
         @@
 _    __@
| |  / /@
| | / / @
| |/ /  @
|___/   @
        @@
 _       __@
| |     / /@
| | /| / / @
| |/ |/ /  @
|__/|__/   @
           @@
   _  __@
  | |/ /@
  |   / @
 /   |  @
/_/|_|  @
        @@
__  __@
\\ \\/ /@
 \\  / @
 / /  @
/_/   @
      @@
 _____@
/__  /@
  / / @
 / /__@
/____/@
      @@
     ___@
    / _/@
   / /  @
  / /   @
 / /    @
/__/    @@
__    @
\\ \\   @
 \\ \\  @
  \\ \\ @
   \\_\\@
      @@
     ___@
    /  /@
    / / @
   / /  @
 _/ /   @
/__/    @@
  //|@
 |/||@
  $  @
 $   @
$    @
     @@
       @
       @
       @
       @
 ______@
/_____/@@
  _ @
 ( )@
  V @
 $  @
$   @
    @@
        @
  ____ _@
 / __ \`/@
/ /_/ / @
\\__,_/  @
        @@
    __  @
   / /_ @
  / __ \\@
 / /_/ /@
/_.___/ @
        @@
       @
  _____@
 / ___/@
/ /__  @
\\___/  @
       @@
       __@
  ____/ /@
 / __  / @
/ /_/ /  @
\\__,_/   @
         @@
      @
  ___ @
 / _ \\@
/  __/@
\\___/ @
      @@
    ____@
   / __/@
  / /_  @
 / __/  @
/_/     @
        @@
         @
   ____ _@
  / __ \`/@
 / /_/ / @
 \\__, /  @
/____/   @@
    __  @
   / /_ @
  / __ \\@
 / / / /@
/_/ /_/ @
        @@
    _ @
   (_)@
  / / @
 / /  @
/_/   @
      @@
       _ @
      (_)@
     / / @
    / /  @
 __/ /   @
/___/    @@
    __  @
   / /__@
  / //_/@
 / ,<   @
/_/|_|  @
        @@
    __@
   / /@
  / / @
 / /  @
/_/   @
      @@
            @
   ____ ___ @
  / __ \`__ \\@
 / / / / / /@
/_/ /_/ /_/ @
            @@
        @
   ____ @
  / __ \\@
 / / / /@
/_/ /_/ @
        @@
       @
  ____ @
 / __ \\@
/ /_/ /@
\\____/ @
       @@
         @
    ____ @
   / __ \\@
  / /_/ /@
 / .___/ @
/_/      @@
        @
  ____ _@
 / __ \`/@
/ /_/ / @
\\__, /  @
  /_/   @@
        @
   _____@
  / ___/@
 / /    @
/_/     @
        @@
        @
   _____@
  / ___/@
 (__  ) @
/____/  @
        @@
   __ @
  / /_@
 / __/@
/ /_  @
\\__/  @
      @@
        @
  __  __@
 / / / /@
/ /_/ / @
\\__,_/  @
        @@
       @
 _   __@
| | / /@
| |/ / @
|___/  @
       @@
          @
 _      __@
| | /| / /@
| |/ |/ / @
|__/|__/  @
          @@
        @
   _  __@
  | |/_/@
 _>  <  @
/_/|_|  @
        @@
         @
   __  __@
  / / / /@
 / /_/ / @
 \\__, /  @
/____/   @@
     @
 ____@
/_  /@
 / /_@
/___/@
     @@
     __@
   _/_/@
 _/_/  @
< <    @
/ /    @
\\_\\    @@
     __@
    / /@
   / / @
  / /  @
 / /   @
/_/    @@
     _ @
    | |@
    / /@
   _>_>@
 _/_/  @
/_/    @@
  /\\//@
 //\\/ @
  $   @
 $    @
$     @
      @@
    _  _ @
   (_)(_)@
  / _ |  @
 / __ |  @
/_/ |_|  @
         @@
   _   _ @
  (_)_(_)@
 / __ \\  @
/ /_/ /  @
\\____/   @
         @@
   _   _ @
  (_) (_)@
 / / / / @
/ /_/ /  @
\\____/   @
         @@
   _   _ @
  (_)_(_)@
 / __ \`/ @
/ /_/ /  @
\\__,_/   @
         @@
   _   _ @
  (_)_(_)@
 / __ \\  @
/ /_/ /  @
\\____/   @
         @@
   _   _ @
  (_) (_)@
 / / / / @
/ /_/ /  @
\\__,_/   @
         @@
     ____ @
    / __ \\@
   / / / /@
  / /_| | @
 / //__/  @
/_/       @@
160  NO-BREAK SPACE
     $$@
    $$ @
   $$  @
  $$   @
 $$    @
$$     @@
161  INVERTED EXCLAMATION MARK
    _ @
   (_)@
  / / @
 / /  @
/_/   @
      @@
162  CENT SIGN
     __@
  __/ /@
 / ___/@
/ /__  @
\\  _/  @
/_/    @@
163  POUND SIGN
     ____ @
    / ,__\\@
 __/ /_   @
 _/ /___  @
(_,____/  @
          @@
164  CURRENCY SIGN
    /|___/|@
   | __  / @
  / /_/ /  @
 /___  |   @
|/   |/    @
           @@
165  YEN SIGN
    ____@
  _| / /@
 /_  __/@
/_  __/ @
 /_/    @
        @@
166  BROKEN BAR
     __@
    / /@
   /_/ @
  __   @
 / /   @
/_/    @@
167  SECTION SIGN
     __ @
   _/ _)@
  / | | @
 | || | @
 | |_/  @
(__/    @@
168  DIAERESIS
  _   _ @
 (_) (_)@
  $   $ @
 $   $  @
$   $   @
        @@
169  COPYRIGHT SIGN
    ______  @
   / _____\\ @
  / / ___/ |@
 / / /__  / @
|  \\___/ /  @
 \\______/   @@
170  FEMININE ORDINAL INDICATOR
   ___ _@
  / _ \`/@
 _\\_,_/ @
/____/  @
 $      @
        @@
171  LEFT-POINTING DOUBLE ANGLE QUOTATION MARK
  ____@
 / / /@
/ / / @
\\ \\ \\ @
 \\_\\_\\@
      @@
172  NOT SIGN
       @
 ______@
/___  /@
   /_/ @
 $     @
       @@
173  SOFT HYPHEN
      @
      @
 _____@
/____/@
  $   @
      @@
174  REGISTERED SIGN
    ______  @
   / ___  \\ @
  / / _ \\  |@
 / / , _/ / @
| /_/|_| /  @
 \\______/   @@
175  MACRON
 ______@
/_____/@
  $    @
 $     @
$      @
       @@
176  DEGREE SIGN
  ___ @
 / _ \\@
/ // /@
\\___/ @
 $    @
      @@
177  PLUS-MINUS SIGN
      __ @
   __/ /_@
  /_  __/@
 __/_/_  @
/_____/  @
         @@
178  SUPERSCRIPT TWO
   ___ @
  |_  |@
 / __/ @
/____/ @
 $     @
       @@
179  SUPERSCRIPT THREE
   ____@
  |_  /@
 _/_ < @
/____/ @
 $     @
       @@
180  ACUTE ACCENT
  __@
 /_/@
  $ @
 $  @
$   @
    @@
181  MICRO SIGN
          @
    __  __@
   / / / /@
  / /_/ / @
 / ._,_/  @
/_/       @@
182  PILCROW SIGN
  _______@
 / _    /@
/ (/ / / @
\\_  / /  @
 /_/_/   @
         @@
183  MIDDLE DOT
   @
 _ @
(_)@
 $ @
$  @
   @@
184  CEDILLA
   @
   @
   @
   @
 _ @
/_)@@
185  SUPERSCRIPT ONE
  ___@
 <  /@
 / / @
/_/  @
$    @
     @@
186  MASCULINE ORDINAL INDICATOR
   ___ @
  / _ \\@
 _\\___/@
/____/ @
 $     @
       @@
187  RIGHT-POINTING DOUBLE ANGLE QUOTATION MARK
____  @
\\ \\ \\ @
 \\ \\ \\@
 / / /@
/_/_/ @
      @@
188  VULGAR FRACTION ONE QUARTER
  ___   __ @
 <  / _/_/ @
 / /_/_/___@
/_//_// / /@
 /_/ /_  _/@
      /_/  @@
189  VULGAR FRACTION ONE HALF
  ___   __   @
 <  / _/_/__ @
 / /_/_/|_  |@
/_//_/ / __/ @
 /_/  /____/ @
             @@
190  VULGAR FRACTION THREE QUARTERS
   ____    __ @
  |_  /  _/_/ @
 _/_ < _/_/___@
/____//_// / /@
    /_/ /_  _/@
         /_/  @@
191  INVERTED QUESTION MARK
    _ @
   (_)@
 _/ / @
/ _/_ @
\\___/ @
      @@
192  LATIN CAPITAL LETTER A WITH GRAVE
    __ @
   _\\_\\@
  / _ |@
 / __ |@
/_/ |_|@
       @@
193  LATIN CAPITAL LETTER A WITH ACUTE
     __@
   _/_/@
  / _ |@
 / __ |@
/_/ |_|@
       @@
194  LATIN CAPITAL LETTER A WITH CIRCUMFLEX
     //|@
   _|/||@
  / _ | @
 / __ | @
/_/ |_| @
        @@
195  LATIN CAPITAL LETTER A WITH TILDE
     /\\//@
   _//\\/ @
  / _ |  @
 / __ |  @
/_/ |_|  @
         @@
196  LATIN CAPITAL LETTER A WITH DIAERESIS
    _  _ @
   (_)(_)@
  / _ |  @
 / __ |  @
/_/ |_|  @
         @@
197  LATIN CAPITAL LETTER A WITH RING ABOVE
    (())@
   /   |@
  / /| |@
 / ___ |@
/_/  |_|@
        @@
198  LATIN CAPITAL LETTER AE
    __________@
   /     ____/@
  / /|  __/   @
 / __  /___   @
/_/ /_____/   @
              @@
199  LATIN CAPITAL LETTER C WITH CEDILLA
   ______@
  / ____/@
 / /     @
/ /___   @
\\____/   @
 /_)     @@
200  LATIN CAPITAL LETTER E WITH GRAVE
    __ @
   _\\_\\@
  / __/@
 / _/  @
/___/  @
       @@
201  LATIN CAPITAL LETTER E WITH ACUTE
     __@
   _/_/@
  / __/@
 / _/  @
/___/  @
       @@
202  LATIN CAPITAL LETTER E WITH CIRCUMFLEX
     //|@
   _|/||@
  / __/ @
 / _/   @
/___/   @
        @@
203  LATIN CAPITAL LETTER E WITH DIAERESIS
    _  _ @
   (_)(_)@
  / __/  @
 / _/    @
/___/    @
         @@
204  LATIN CAPITAL LETTER I WITH GRAVE
    __ @
   _\\_\\@
  /  _/@
 _/ /  @
/___/  @
       @@
205  LATIN CAPITAL LETTER I WITH ACUTE
     __@
   _/_/@
  /  _/@
 _/ /  @
/___/  @
       @@
206  LATIN CAPITAL LETTER I WITH CIRCUMFLEX
     //|@
   _|/||@
  /  _/ @
 _/ /   @
/___/   @
        @@
207  LATIN CAPITAL LETTER I WITH DIAERESIS
    _  _ @
   (_)(_)@
  /  _/  @
 _/ /    @
/___/    @
         @@
208  LATIN CAPITAL LETTER ETH
     ____ @
    / __ \\@
 __/ /_/ /@
/_  __/ / @
 /_____/  @
          @@
209  LATIN CAPITAL LETTER N WITH TILDE
     /\\//@
   _//\\/ @
  / |/ / @
 /    /  @
/_/|_/   @
         @@
210  LATIN CAPITAL LETTER O WITH GRAVE
    __ @
  __\\_\\@
 / __ \\@
/ /_/ /@
\\____/ @
       @@
211  LATIN CAPITAL LETTER O WITH ACUTE
     __@
  __/_/@
 / __ \\@
/ /_/ /@
\\____/ @
       @@
212  LATIN CAPITAL LETTER O WITH CIRCUMFLEX
    //|@
  _|/||@
 / __ \\@
/ /_/ /@
\\____/ @
       @@
213  LATIN CAPITAL LETTER O WITH TILDE
    /\\//@
  _//\\/ @
 / __ \\ @
/ /_/ / @
\\____/  @
        @@
214  LATIN CAPITAL LETTER O WITH DIAERESIS
   _   _ @
  (_)_(_)@
 / __ \\  @
/ /_/ /  @
\\____/   @
         @@
215  MULTIPLICATION SIGN
     @
     @
 /|/|@
 > < @
|/|/ @
     @@
216  LATIN CAPITAL LETTER O WITH STROKE
   _____ @
  / _// \\@
 / //// /@
/ //// / @
\\_//__/  @
         @@
217  LATIN CAPITAL LETTER U WITH GRAVE
    __  @
  __\\_\\_@
 / / / /@
/ /_/ / @
\\____/  @
        @@
218  LATIN CAPITAL LETTER U WITH ACUTE
     __ @
  __/_/_@
 / / / /@
/ /_/ / @
\\____/  @
        @@
219  LATIN CAPITAL LETTER U WITH CIRCUMFLEX
    //| @
  _|/||_@
 / / / /@
/ /_/ / @
\\____/  @
        @@
220  LATIN CAPITAL LETTER U WITH DIAERESIS
   _   _ @
  (_) (_)@
 / / / / @
/ /_/ /  @
\\____/   @
         @@
221  LATIN CAPITAL LETTER Y WITH ACUTE
   __ @
__/_/_@
\\ \\/ /@
 \\  / @
 /_/  @
      @@
222  LATIN CAPITAL LETTER THORN
    __  @
   / /_ @
  / __ \\@
 / ____/@
/_/     @
        @@
223  LATIN SMALL LETTER SHARP S
     ____ @
    / __ \\@
   / / / /@
  / /_| | @
 / //__/  @
/_/       @@
224  LATIN SMALL LETTER A WITH GRAVE
    __  @
  __\\_\\_@
 / __ \`/@
/ /_/ / @
\\__,_/  @
        @@
225  LATIN SMALL LETTER A WITH ACUTE
     __ @
  __/_/_@
 / __ \`/@
/ /_/ / @
\\__,_/  @
        @@
226  LATIN SMALL LETTER A WITH CIRCUMFLEX
    //| @
  _|/||_@
 / __ \`/@
/ /_/ / @
\\__,_/  @
        @@
227  LATIN SMALL LETTER A WITH TILDE
    /\\//@
  _//\\/_@
 / __ \`/@
/ /_/ / @
\\__,_/  @
        @@
228  LATIN SMALL LETTER A WITH DIAERESIS
   _   _ @
  (_)_(_)@
 / __ \`/ @
/ /_/ /  @
\\__,_/   @
         @@
229  LATIN SMALL LETTER A WITH RING ABOVE
     __ @
  __(())@
 / __ \`/@
/ /_/ / @
\\__,_/  @
        @@
230  LATIN SMALL LETTER AE
           @
  ____ ___ @
 / __ \` _ \\@
/ /_/   __/@
\\__,_____/ @
           @@
231  LATIN SMALL LETTER C WITH CEDILLA
       @
  _____@
 / ___/@
/ /__  @
\\___/  @
/_)    @@
232  LATIN SMALL LETTER E WITH GRAVE
   __ @
  _\\_\\@
 / _ \\@
/  __/@
\\___/ @
      @@
233  LATIN SMALL LETTER E WITH ACUTE
    __@
  _/_/@
 / _ \\@
/  __/@
\\___/ @
      @@
234  LATIN SMALL LETTER E WITH CIRCUMFLEX
    //|@
  _|/||@
 / _ \\ @
/  __/ @
\\___/  @
       @@
235  LATIN SMALL LETTER E WITH DIAERESIS
   _  _ @
  (_)(_)@
 / _ \\  @
/  __/  @
\\___/   @
        @@
236  LATIN SMALL LETTER I WITH GRAVE
   __ @
   \\_\\@
  / / @
 / /  @
/_/   @
      @@
237  LATIN SMALL LETTER I WITH ACUTE
    __@
   /_/@
  / / @
 / /  @
/_/   @
      @@
238  LATIN SMALL LETTER I WITH CIRCUMFLEX
    //|@
   |/||@
  / /  @
 / /   @
/_/    @
       @@
239  LATIN SMALL LETTER I WITH DIAERESIS
  _   _ @
 (_)_(_)@
  / /   @
 / /    @
/_/     @
        @@
240  LATIN SMALL LETTER ETH
     || @
    =||=@
 ___ || @
/ __\` | @
\\____/  @
        @@
241  LATIN SMALL LETTER N WITH TILDE
     /\\//@
   _//\\/ @
  / __ \\ @
 / / / / @
/_/ /_/  @
         @@
242  LATIN SMALL LETTER O WITH GRAVE
    __ @
  __\\_\\@
 / __ \\@
/ /_/ /@
\\____/ @
       @@
243  LATIN SMALL LETTER O WITH ACUTE
     __@
  __/_/@
 / __ \\@
/ /_/ /@
\\____/ @
       @@
244  LATIN SMALL LETTER O WITH CIRCUMFLEX
    //|@
  _|/||@
 / __ \\@
/ /_/ /@
\\____/ @
       @@
245  LATIN SMALL LETTER O WITH TILDE
    /\\//@
  _//\\/ @
 / __ \\ @
/ /_/ / @
\\____/  @
        @@
246  LATIN SMALL LETTER O WITH DIAERESIS
   _   _ @
  (_)_(_)@
 / __ \\  @
/ /_/ /  @
\\____/   @
         @@
247  DIVISION SIGN
       @
    _  @
 __(_)_@
/_____/@
 (_)   @
       @@
248  LATIN SMALL LETTER O WITH STROKE
        @
  _____ @
 / _// \\@
/ //// /@
\\_//__/ @
        @@
249  LATIN SMALL LETTER U WITH GRAVE
    __  @
  __\\_\\_@
 / / / /@
/ /_/ / @
\\__,_/  @
        @@
250  LATIN SMALL LETTER U WITH ACUTE
     __ @
  __/_/_@
 / / / /@
/ /_/ / @
\\__,_/  @
        @@
251  LATIN SMALL LETTER U WITH CIRCUMFLEX
    //| @
  _|/||_@
 / / / /@
/ /_/ / @
\\__,_/  @
        @@
252  LATIN SMALL LETTER U WITH DIAERESIS
   _   _ @
  (_) (_)@
 / / / / @
/ /_/ /  @
\\__,_/   @
         @@
253  LATIN SMALL LETTER Y WITH ACUTE
      __ @
   __/_/_@
  / / / /@
 / /_/ / @
 \\__, /  @
/____/   @@
254  LATIN SMALL LETTER THORN
     __  @
    / /_ @
   / __ \\@
  / /_/ /@
 / .___/ @
/_/      @@
255  LATIN SMALL LETTER Y WITH DIAERESIS
    _   _ @
   (_) (_)@
  / / / / @
 / /_/ /  @
 \\__, /   @
/____/    @@
`},Symbol.toStringTag,{value:"Module"})),eo=Object.freeze(Object.defineProperty({__proto__:null,default:`flf2a$ 5 4 13 15 10 0 22415
Small by Glenn Chappell 4/93 -- based on Standard
Includes ISO Latin-1
figlet release 2.1 -- 12 Aug 1994
Permission is hereby given to modify this font, as long as the
modifier's name is placed on a comment line.

Modified by Paul Burton <solution@earthlink.net> 12/96 to include new parameter
supported by FIGlet and FIGWin.  May also be slightly modified for better use
of new full-width/kern/smush alternatives, but default output is NOT changed.

 $@
 $@
 $@
 $@
 $@@
  _ @
 | |@
 |_|@
 (_)@
    @@
  _ _ @
 ( | )@
  V V @
   $  @
      @@
    _ _   @
  _| | |_ @
 |_  .  _|@
 |_     _|@
   |_|_|  @@
     @
  ||_@
 (_-<@
 / _/@
  || @@
  _  __ @
 (_)/ / @
   / /_ @
  /_/(_)@
        @@
  __     @
 / _|___ @
 > _|_ _|@
 \\_____| @
         @@
  _ @
 ( )@
 |/ @
  $ @
    @@
   __@
  / /@
 | | @
 | | @
  \\_\\@@
 __  @
 \\ \\ @
  | |@
  | |@
 /_/ @@
     @
 _/\\_@
 >  <@
  \\/ @
     @@
    _   @
  _| |_ @
 |_   _|@
   |_|  @
        @@
    @
    @
  _ @
 ( )@
 |/ @@
      @
  ___ @
 |___|@
   $  @
      @@
    @
    @
  _ @
 (_)@
    @@
    __@
   / /@
  / / @
 /_/  @
      @@
   __  @
  /  \\ @
 | () |@
  \\__/ @
       @@
  _ @
 / |@
 | |@
 |_|@
    @@
  ___ @
 |_  )@
  / / @
 /___|@
      @@
  ____@
 |__ /@
  |_ \\@
 |___/@
      @@
  _ _  @
 | | | @
 |_  _|@
   |_| @
       @@
  ___ @
 | __|@
 |__ \\@
 |___/@
      @@
   __ @
  / / @
 / _ \\@
 \\___/@
      @@
  ____ @
 |__  |@
   / / @
  /_/  @
       @@
  ___ @
 ( _ )@
 / _ \\@
 \\___/@
      @@
  ___ @
 / _ \\@
 \\_, /@
  /_/ @
      @@
  _ @
 (_)@
  _ @
 (_)@
    @@
  _ @
 (_)@
  _ @
 ( )@
 |/ @@
   __@
  / /@
 < < @
  \\_\\@
     @@
      @
  ___ @
 |___|@
 |___|@
      @@
 __  @
 \\ \\ @
  > >@
 /_/ @
     @@
  ___ @
 |__ \\@
   /_/@
  (_) @
      @@
   ____  @
  / __ \\ @
 / / _\` |@
 \\ \\__,_|@
  \\____/ @@
    _   @
   /_\\  @
  / _ \\ @
 /_/ \\_\\@
        @@
  ___ @
 | _ )@
 | _ \\@
 |___/@
      @@
   ___ @
  / __|@
 | (__ @
  \\___|@
       @@
  ___  @
 |   \\ @
 | |) |@
 |___/ @
       @@
  ___ @
 | __|@
 | _| @
 |___|@
      @@
  ___ @
 | __|@
 | _| @
 |_|  @
      @@
   ___ @
  / __|@
 | (_ |@
  \\___|@
       @@
  _  _ @
 | || |@
 | __ |@
 |_||_|@
       @@
  ___ @
 |_ _|@
  | | @
 |___|@
      @@
     _ @
  _ | |@
 | || |@
  \\__/ @
       @@
  _  __@
 | |/ /@
 | ' < @
 |_|\\_\\@
       @@
  _    @
 | |   @
 | |__ @
 |____|@
       @@
  __  __ @
 |  \\/  |@
 | |\\/| |@
 |_|  |_|@
         @@
  _  _ @
 | \\| |@
 | .\` |@
 |_|\\_|@
       @@
   ___  @
  / _ \\ @
 | (_) |@
  \\___/ @
        @@
  ___ @
 | _ \\@
 |  _/@
 |_|  @
      @@
   ___  @
  / _ \\ @
 | (_) |@
  \\__\\_\\@
        @@
  ___ @
 | _ \\@
 |   /@
 |_|_\\@
      @@
  ___ @
 / __|@
 \\__ \\@
 |___/@
      @@
  _____ @
 |_   _|@
   | |  @
   |_|  @
        @@
  _   _ @
 | | | |@
 | |_| |@
  \\___/ @
        @@
 __   __@
 \\ \\ / /@
  \\ V / @
   \\_/  @
        @@
 __      __@
 \\ \\    / /@
  \\ \\/\\/ / @
   \\_/\\_/  @
           @@
 __  __@
 \\ \\/ /@
  >  < @
 /_/\\_\\@
       @@
 __   __@
 \\ \\ / /@
  \\ V / @
   |_|  @
        @@
  ____@
 |_  /@
  / / @
 /___|@
      @@
  __ @
 | _|@
 | | @
 | | @
 |__|@@
 __   @
 \\ \\  @
  \\ \\ @
   \\_\\@
      @@
  __ @
 |_ |@
  | |@
  | |@
 |__|@@
  /\\ @
 |/\\|@
   $ @
   $ @
     @@
      @
      @
      @
  ___ @
 |___|@@
  _ @
 ( )@
  \\|@
  $ @
    @@
       @
  __ _ @
 / _\` |@
 \\__,_|@
       @@
  _    @
 | |__ @
 | '_ \\@
 |_.__/@
       @@
     @
  __ @
 / _|@
 \\__|@
     @@
     _ @
  __| |@
 / _\` |@
 \\__,_|@
       @@
      @
  ___ @
 / -_)@
 \\___|@
      @@
   __ @
  / _|@
 |  _|@
 |_|  @
      @@
       @
  __ _ @
 / _\` |@
 \\__, |@
 |___/ @@
  _    @
 | |_  @
 | ' \\ @
 |_||_|@
       @@
  _ @
 (_)@
 | |@
 |_|@
    @@
    _ @
   (_)@
   | |@
  _/ |@
 |__/ @@
  _   @
 | |__@
 | / /@
 |_\\_\\@
      @@
  _ @
 | |@
 | |@
 |_|@
    @@
        @
  _ __  @
 | '  \\ @
 |_|_|_|@
        @@
       @
  _ _  @
 | ' \\ @
 |_||_|@
       @@
      @
  ___ @
 / _ \\@
 \\___/@
      @@
       @
  _ __ @
 | '_ \\@
 | .__/@
 |_|   @@
       @
  __ _ @
 / _\` |@
 \\__, |@
    |_|@@
      @
  _ _ @
 | '_|@
 |_|  @
      @@
     @
  ___@
 (_-<@
 /__/@
     @@
  _   @
 | |_ @
 |  _|@
  \\__|@
      @@
       @
  _  _ @
 | || |@
  \\_,_|@
       @@
      @
 __ __@
 \\ V /@
  \\_/ @
      @@
         @
 __ __ __@
 \\ V  V /@
  \\_/\\_/ @
         @@
      @
 __ __@
 \\ \\ /@
 /_\\_\\@
      @@
       @
  _  _ @
 | || |@
  \\_, |@
  |__/ @@
     @
  ___@
 |_ /@
 /__|@
     @@
    __@
   / /@
 _| | @
  | | @
   \\_\\@@
  _ @
 | |@
 | |@
 | |@
 |_|@@
 __   @
 \\ \\  @
  | |_@
  | | @
 /_/  @@
  /\\/|@
 |/\\/ @
   $  @
   $  @
      @@
  _  _ @
 (_)(_)@
  /--\\ @
 /_/\\_\\@
       @@
  _  _ @
 (_)(_)@
 / __ \\@
 \\____/@
       @@
  _   _ @
 (_) (_)@
 | |_| |@
  \\___/ @
        @@
  _  _ @
 (_)(_)@
 / _\` |@
 \\__,_|@
       @@
  _   _ @
 (_)_(_)@
  / _ \\ @
  \\___/ @
        @@
  _  _ @
 (_)(_)@
 | || |@
  \\_,_|@
       @@
   ___ @
  / _ \\@
 | |< <@
 | ||_/@
 |_|   @@
160  NO-BREAK SPACE
 $@
 $@
 $@
 $@
 $@@
161  INVERTED EXCLAMATION MARK
  _ @
 (_)@
 | |@
 |_|@
    @@
162  CENT SIGN
     @
  || @
 / _)@
 \\ _)@
  || @@
163  POUND SIGN
    __  @
  _/ _\\ @
 |_ _|_ @
 (_,___|@
        @@
164  CURRENCY SIGN
 /\\_/\\@
 \\ . /@
 / _ \\@
 \\/ \\/@
      @@
165  YEN SIGN
  __ __ @
  \\ V / @
 |__ __|@
 |__ __|@
   |_|  @@
166  BROKEN BAR
  _ @
 | |@
 |_|@
 | |@
 |_|@@
167  SECTION SIGN
    __ @
   / _)@
  /\\ \\ @
  \\ \\/ @
 (__/  @@
168  DIAERESIS
  _  _ @
 (_)(_)@
  $  $ @
  $  $ @
       @@
169  COPYRIGHT SIGN
   ____  @
  / __ \\ @
 / / _| \\@
 \\ \\__| /@
  \\____/ @@
170  FEMININE ORDINAL INDICATOR
  __ _ @
 / _\` |@
 \\__,_|@
 |____|@
       @@
171  LEFT-POINTING DOUBLE ANGLE QUOTATION MARK
   ____@
  / / /@
 < < < @
  \\_\\_\\@
       @@
172  NOT SIGN
  ____ @
 |__  |@
    |_|@
   $   @
       @@
173  SOFT HYPHEN
     @
  __ @
 |__|@
   $ @
     @@
174  REGISTERED SIGN
   ____  @
  / __ \\ @
 / | -) \\@
 \\ ||\\\\ /@
  \\____/ @@
175  MACRON
  ___ @
 |___|@
   $  @
   $  @
      @@
176  DEGREE SIGN
  _ @
 /.\\@
 \\_/@
  $ @
    @@
177  PLUS-MINUS SIGN
    _   @
  _| |_ @
 |_   _|@
  _|_|_ @
 |_____|@@
178  SUPERSCRIPT TWO
  __ @
 |_ )@
 /__|@
   $ @
     @@
179  SUPERSCRIPT THREE
  ___@
 |_ /@
 |__)@
   $ @
     @@
180  ACUTE ACCENT
  __@
 /_/@
  $ @
  $ @
    @@
181  MICRO SIGN
       @
  _  _ @
 | || |@
 | .,_|@
 |_|   @@
182  PILCROW SIGN
  ____ @
 /    |@
 \\_ | |@
  |_|_|@
       @@
183  MIDDLE DOT
    @
  _ @
 (_)@
  $ @
    @@
184  CEDILLA
    @
    @
    @
  _ @
 )_)@@
185  SUPERSCRIPT ONE
  _ @
 / |@
 |_|@
  $ @
    @@
186  MASCULINE ORDINAL INDICATOR
  ___ @
 / _ \\@
 \\___/@
 |___|@
      @@
187  RIGHT-POINTING DOUBLE ANGLE QUOTATION MARK
 ____  @
 \\ \\ \\ @
  > > >@
 /_/_/ @
       @@
188  VULGAR FRACTION ONE QUARTER
  _  __   @
 / |/ /__ @
 |_/ /_' |@
  /_/  |_|@
          @@
189  VULGAR FRACTION ONE HALF
  _  __  @
 / |/ /_ @
 |_/ /_ )@
  /_//__|@
         @@
190  VULGAR FRACTION THREE QUARTERS
  ___ __   @
 |_ // /__ @
 |__) /_' |@
   /_/  |_|@
           @@
191  INVERTED QUESTION MARK
   _  @
  (_) @
 / /_ @
 \\___|@
      @@
192  LATIN CAPITAL LETTER A WITH GRAVE
  __   @
  \\_\\  @
  /--\\ @
 /_/\\_\\@
       @@
193  LATIN CAPITAL LETTER A WITH ACUTE
    __ @
   /_/ @
  /--\\ @
 /_/\\_\\@
       @@
194  LATIN CAPITAL LETTER A WITH CIRCUMFLEX
   /\\  @
  |/\\| @
  /--\\ @
 /_/\\_\\@
       @@
195  LATIN CAPITAL LETTER A WITH TILDE
   /\\/|@
  |/\\/ @
  /--\\ @
 /_/\\_\\@
       @@
196  LATIN CAPITAL LETTER A WITH DIAERESIS
  _  _ @
 (_)(_)@
  /--\\ @
 /_/\\_\\@
       @@
197  LATIN CAPITAL LETTER A WITH RING ABOVE
   __  @
  (()) @
  /--\\ @
 /_/\\_\\@
       @@
198  LATIN CAPITAL LETTER AE
    ____ @
   /, __|@
  / _ _| @
 /_/|___|@
         @@
199  LATIN CAPITAL LETTER C WITH CEDILLA
   ___ @
  / __|@
 | (__ @
  \\___|@
   )_) @@
200  LATIN CAPITAL LETTER E WITH GRAVE
  __ @
  \\_\\@
 | -<@
 |__<@
     @@
201  LATIN CAPITAL LETTER E WITH ACUTE
   __@
  /_/@
 | -<@
 |__<@
     @@
202  LATIN CAPITAL LETTER E WITH CIRCUMFLEX
  /\\ @
 |/\\|@
 | -<@
 |__<@
     @@
203  LATIN CAPITAL LETTER E WITH DIAERESIS
  _  _ @
 (_)(_)@
  | -< @
  |__< @
       @@
204  LATIN CAPITAL LETTER I WITH GRAVE
  __  @
  \\_\\ @
 |_ _|@
 |___|@
      @@
205  LATIN CAPITAL LETTER I WITH ACUTE
   __ @
  /_/ @
 |_ _|@
 |___|@
      @@
206  LATIN CAPITAL LETTER I WITH CIRCUMFLEX
  //\\ @
 |/_\\|@
 |_ _|@
 |___|@
      @@
207  LATIN CAPITAL LETTER I WITH DIAERESIS
  _   _ @
 (_)_(_)@
  |_ _| @
  |___| @
        @@
208  LATIN CAPITAL LETTER ETH
   ____  @
  | __ \\ @
 |_ _|) |@
  |____/ @
         @@
209  LATIN CAPITAL LETTER N WITH TILDE
   /\\/|@
  |/\\/ @
 | \\| |@
 |_|\\_|@
       @@
210  LATIN CAPITAL LETTER O WITH GRAVE
  __   @
  \\_\\_ @
 / __ \\@
 \\____/@
       @@
211  LATIN CAPITAL LETTER O WITH ACUTE
    __ @
  _/_/ @
 / __ \\@
 \\____/@
       @@
212  LATIN CAPITAL LETTER O WITH CIRCUMFLEX
   /\\  @
  |/\\| @
 / __ \\@
 \\____/@
       @@
213  LATIN CAPITAL LETTER O WITH TILDE
   /\\/|@
  |/\\/ @
 / __ \\@
 \\____/@
       @@
214  LATIN CAPITAL LETTER O WITH DIAERESIS
  _  _ @
 (_)(_)@
 / __ \\@
 \\____/@
       @@
215  MULTIPLICATION SIGN
     @
 /\\/\\@
 >  <@
 \\/\\/@
     @@
216  LATIN CAPITAL LETTER O WITH STROKE
   ____  @
  / _//\\ @
 | (//) |@
  \\//__/ @
         @@
217  LATIN CAPITAL LETTER U WITH GRAVE
   __   @
  _\\_\\_ @
 | |_| |@
  \\___/ @
        @@
218  LATIN CAPITAL LETTER U WITH ACUTE
    __  @
  _/_/_ @
 | |_| |@
  \\___/ @
        @@
219  LATIN CAPITAL LETTER U WITH CIRCUMFLEX
   //\\  @
  |/ \\| @
 | |_| |@
  \\___/ @
        @@
220  LATIN CAPITAL LETTER U WITH DIAERESIS
  _   _ @
 (_) (_)@
 | |_| |@
  \\___/ @
        @@
221  LATIN CAPITAL LETTER Y WITH ACUTE
   __ @
 _/_/_@
 \\ V /@
  |_| @
      @@
222  LATIN CAPITAL LETTER THORN
  _   @
 | |_ @
 | -_)@
 |_|  @
      @@
223  LATIN SMALL LETTER SHARP S
   ___ @
  / _ \\@
 | |< <@
 | ||_/@
 |_|   @@
224  LATIN SMALL LETTER A WITH GRAVE
  __   @
  \\_\\_ @
 / _\` |@
 \\__,_|@
       @@
225  LATIN SMALL LETTER A WITH ACUTE
    __ @
  _/_/ @
 / _\` |@
 \\__,_|@
       @@
226  LATIN SMALL LETTER A WITH CIRCUMFLEX
   /\\  @
  |/\\| @
 / _\` |@
 \\__,_|@
       @@
227  LATIN SMALL LETTER A WITH TILDE
   /\\/|@
  |/\\/ @
 / _\` |@
 \\__,_|@
       @@
228  LATIN SMALL LETTER A WITH DIAERESIS
  _  _ @
 (_)(_)@
 / _\` |@
 \\__,_|@
       @@
229  LATIN SMALL LETTER A WITH RING ABOVE
   __  @
  (()) @
 / _\` |@
 \\__,_|@
       @@
230  LATIN SMALL LETTER AE
         @
  __ ___ @
 / _\` -_)@
 \\__,___|@
         @@
231  LATIN SMALL LETTER C WITH CEDILLA
     @
  __ @
 / _|@
 \\__|@
  )_)@@
232  LATIN SMALL LETTER E WITH GRAVE
  __  @
  \\_\\ @
 / -_)@
 \\___|@
      @@
233  LATIN SMALL LETTER E WITH ACUTE
   __ @
  /_/ @
 / -_)@
 \\___|@
      @@
234  LATIN SMALL LETTER E WITH CIRCUMFLEX
  //\\ @
 |/_\\|@
 / -_)@
 \\___|@
      @@
235  LATIN SMALL LETTER E WITH DIAERESIS
  _   _ @
 (_)_(_)@
  / -_) @
  \\___| @
        @@
236  LATIN SMALL LETTER I WITH GRAVE
 __ @
 \\_\\@
 | |@
 |_|@
    @@
237  LATIN SMALL LETTER I WITH ACUTE
  __@
 /_/@
 | |@
 |_|@
    @@
238  LATIN SMALL LETTER I WITH CIRCUMFLEX
  //\\ @
 |/_\\|@
  | | @
  |_| @
      @@
239  LATIN SMALL LETTER I WITH DIAERESIS
  _   _ @
 (_)_(_)@
   | |  @
   |_|  @
        @@
240  LATIN SMALL LETTER ETH
  \\\\/\\ @
  \\/\\\\ @
 / _\` |@
 \\___/ @
       @@
241  LATIN SMALL LETTER N WITH TILDE
  /\\/| @
 |/\\/  @
 | ' \\ @
 |_||_|@
       @@
242  LATIN SMALL LETTER O WITH GRAVE
  __  @
  \\_\\ @
 / _ \\@
 \\___/@
      @@
243  LATIN SMALL LETTER O WITH ACUTE
   __ @
  /_/ @
 / _ \\@
 \\___/@
      @@
244  LATIN SMALL LETTER O WITH CIRCUMFLEX
  //\\ @
 |/_\\|@
 / _ \\@
 \\___/@
      @@
245  LATIN SMALL LETTER O WITH TILDE
  /\\/|@
 |/\\/ @
 / _ \\@
 \\___/@
      @@
246  LATIN SMALL LETTER O WITH DIAERESIS
  _   _ @
 (_)_(_)@
  / _ \\ @
  \\___/ @
        @@
247  DIVISION SIGN
   _  @
  (_) @
 |___|@
  (_) @
      @@
248  LATIN SMALL LETTER O WITH STROKE
      @
  ___ @
 / //\\@
 \\//_/@
      @@
249  LATIN SMALL LETTER U WITH GRAVE
  __   @
  \\_\\_ @
 | || |@
  \\_,_|@
       @@
250  LATIN SMALL LETTER U WITH ACUTE
    __ @
  _/_/ @
 | || |@
  \\_,_|@
       @@
251  LATIN SMALL LETTER U WITH CIRCUMFLEX
   /\\  @
  |/\\| @
 | || |@
  \\_,_|@
       @@
252  LATIN SMALL LETTER U WITH DIAERESIS
  _  _ @
 (_)(_)@
 | || |@
  \\_,_|@
       @@
253  LATIN SMALL LETTER Y WITH ACUTE
    __ @
  _/_/ @
 | || |@
  \\_, |@
  |__/ @@
254  LATIN SMALL LETTER THORN
  _    @
 | |__ @
 | '_ \\@
 | .__/@
 |_|   @@
255  LATIN SMALL LETTER Y WITH DIAERESIS
  _  _ @
 (_)(_)@
 | || |@
  \\_, |@
  |__/ @@
`},Symbol.toStringTag,{value:"Module"})),to=Object.freeze(Object.defineProperty({__proto__:null,default:`flf2a$ 6 5 16 15 16
Speed by Claude Martins 2/95 -- based on Slant
Includes ISO Latin-1
figlet release 2.1 -- 12 Aug 1994
Permission is hereby given to modify this font, as long as the
modifier's name is placed on a comment line.

Explanation of first line:
flf2 - "magic number" for file identification
a    - should always be \`a', for now
$    - the "hardblank" -- prints as a blank, but can't be smushed
6    - height of a character
5    - height of a character, not including descenders
14   - max line length (excluding comment lines) + a fudge factor
15   - default smushmode for this font
16   - number of comment lines

     $$@
    $$ @
   $$  @
  $$   @
 $$    @
$$     @@
______@
___  /@
__  / @
 /_/  @
(_)   @
      @@
___ _ @
_( | )@
_|/|/ @
  $   @
 $    @
      @@
_______ __ @
____/ // /_@
_ _  _  __/@
/_  _  __/ @
 /_//_/    @
           @@
_______@
____/ /@
__  __/@
_(_  ) @
/  _/  @
/_/    @@
____   __@
__(_)_/_/@
____/_/  @
__/_/_   @
/_/ (_)  @
         @@
______   @
__( _ )  @
_  __ \\/|@
/ /_/  < @
\\____/\\/ @
         @@
___ @
_( )@
_|/ @
 $  @
$   @
    @@
_______@
____/_/@
__  /  @
_  /   @
/ /    @
|_|    @@
______ @
____| |@
____  /@
___  / @
__/_/  @
/_/    @@
_____  @
____/|_@
_|    /@
/_ __| @
 |/    @
       @@
       @
______ @
___/ /_@
/_  __/@
 /_/   @
       @@
    @
    @
    @
___ @
_( )@
_|/ @@
        @
        @
________@
_/_____/@
   $    @
        @@
    @
    @
    @
___ @
_(_)@
    @@
_________@
______/_/@
____/_/  @
__/_/    @
/_/      @
         @@
_______ @
__  __ \\@
_  / / /@
/ /_/ / @
\\____/  @
        @@
______@
__<  /@
__  / @
_  /  @
/_/   @
      @@
______ @
__|__ \\@
____/ /@
_  __/ @
/____/ @
       @@
________@
__|__  /@
___/_ < @
____/ / @
/____/  @
        @@
_____ __@
__  // /@
_  // /_@
/__  __/@
  /_/   @
        @@
__________@
___  ____/@
______ \\  @
 ____/ /  @
/_____/   @
          @@
________@
__  ___/@
_  __ \\ @
/ /_/ / @
\\____/  @
        @@
______@
/__  /@
__  / @
_  /  @
/_/   @
      @@
_______ @
__( __ )@
_  __  |@
/ /_/ / @
\\____/  @
        @@
_______ @
__  __ \\@
_  /_/ /@
_\\__, / @
/____/  @
        @@
      @
_____ @
___(_)@
___   @
_(_)  @
      @@
      @
_____ @
___(_)@
___   @
_( )  @
_|/   @@
____@
_  /@
/ / @
\\ \\ @
 \\_\\@
    @@
       @
_______@
_ ____/@
/____/ @
  $    @
       @@
___  @
__ \\ @
___ \\@
__  /@
_/_/ @
     @@
_____ @
_ __ \\@
__/ _/@
_/_/  @
(_)   @
      @@
_________ @
__  ____ \\@
_  / __ \`/@
/ / /_/ / @
\\ \\__,_/  @
 \\____/   @@
_______ @
___    |@
__  /| |@
_  ___ |@
/_/  |_|@
        @@
________ @
___  __ )@
__  __  |@
_  /_/ / @
/_____/  @
         @@
_________@
__  ____/@
_  /     @
/ /___   @
\\____/   @
         @@
________ @
___  __ \\@
__  / / /@
_  /_/ / @
/_____/  @
         @@
__________@
___  ____/@
__  __/   @
_  /___   @
/_____/   @
          @@
__________@
___  ____/@
__  /_    @
_  __/    @
/_/       @
          @@
_________@
__  ____/@
_  / __  @
/ /_/ /  @
\\____/   @
         @@
______  __@
___  / / /@
__  /_/ / @
_  __  /  @
/_/ /_/   @
          @@
________@
____  _/@
 __  /  @
__/ /   @
/___/   @
        @@
_________@
______  /@
___ _  / @
/ /_/ /  @
\\____/   @
         @@
______ __@
___  //_/@
__  ,<   @
_  /| |  @
/_/ |_|  @
         @@
______ @
___  / @
__  /  @
_  /___@
/_____/@
       @@
______  ___@
___   |/  /@
__  /|_/ / @
_  /  / /  @
/_/  /_/   @
           @@
_____   __@
___  | / /@
__   |/ / @
_  /|  /  @
/_/ |_/   @
          @@
_______ @
__  __ \\@
_  / / /@
/ /_/ / @
\\____/  @
        @@
________ @
___  __ \\@
__  /_/ /@
_  ____/ @
/_/      @
         @@
_______ @
__  __ \\@
_  / / /@
/ /_/ / @
\\___\\_\\ @
        @@
________ @
___  __ \\@
__  /_/ /@
_  _, _/ @
/_/ |_|  @
         @@
________@
__  ___/@
_____ \\ @
____/ / @
/____/  @
        @@
________@
___  __/@
__  /   @
_  /    @
/_/     @
        @@
_____  __@
__  / / /@
_  / / / @
/ /_/ /  @
\\____/   @
         @@
___    __@
__ |  / /@
__ | / / @
__ |/ /  @
_____/   @
         @@
___       __@
__ |     / /@
__ | /| / / @
__ |/ |/ /  @
____/|__/   @
            @@
____  __@
__  |/ /@
__    / @
_    |  @
/_/|_|  @
        @@
__  __@
_ \\/ /@
__  / @
_  /  @
/_/   @
      @@
______@
___  /@
__  / @
_  /__@
/____/@
      @@
________@
____  _/@
___  /  @
__  /   @
_  /    @
/__/    @@
___    @
__ \\   @
___ \\  @
____ \\ @
______\\@
       @@
________@
____/  /@
____  / @
___  /  @
__/ /   @
/__/    @@
_ //|@
_|/||@
  $  @
 $   @
$    @
     @@
        @
        @
        @
        @
________@
_/_____/@@
___ @
_( )@
__V @
 $  @
$   @
    @@
        @
______ _@
_  __ \`/@
/ /_/ / @
\\__,_/  @
        @@
______  @
___  /_ @
__  __ \\@
_  /_/ /@
/_.___/ @
        @@
       @
_______@
_  ___/@
/ /__  @
\\___/  @
       @@
_________@
______  /@
_  __  / @
/ /_/ /  @
\\__,_/   @
         @@
      @
_____ @
_  _ \\@
/  __/@
\\___/ @
      @@
________@
___  __/@
__  /_  @
_  __/  @
/_/     @
        @@
         @
_______ _@
__  __ \`/@
_  /_/ / @
_\\__, /  @
/____/   @@
______  @
___  /_ @
__  __ \\@
_  / / /@
/_/ /_/ @
        @@
_____ @
___(_)@
__  / @
_  /  @
/_/   @
      @@
________ @
______(_)@
_____  / @
____  /  @
___  /   @
/___/    @@
______  @
___  /__@
__  //_/@
_  ,<   @
/_/|_|  @
        @@
______@
___  /@
__  / @
_  /  @
/_/   @
      @@
            @
_______ ___ @
__  __ \`__ \\@
_  / / / / /@
/_/ /_/ /_/ @
            @@
        @
_______ @
__  __ \\@
_  / / /@
/_/ /_/ @
        @@
       @
______ @
_  __ \\@
/ /_/ /@
\\____/ @
       @@
         @
________ @
___  __ \\@
__  /_/ /@
_  .___/ @
/_/      @@
        @
______ _@
_  __ \`/@
/ /_/ / @
\\__, /  @
  /_/   @@
        @
________@
__  ___/@
_  /    @
/_/     @
        @@
        @
________@
__  ___/@
_(__  ) @
/____/  @
        @@
_____ @
__  /_@
_  __/@
/ /_  @
\\__/  @
      @@
        @
____  __@
_  / / /@
/ /_/ / @
\\__,_/  @
        @@
        @
___   __@
__ | / /@
__ |/ / @
_____/  @
        @@
           @
___      __@
__ | /| / /@
__ |/ |/ / @
____/|__/  @
           @@
        @
____  __@
__  |/_/@
__>  <  @
/_/|_|  @
        @@
         @
_____  __@
__  / / /@
_  /_/ / @
_\\__, /  @
/____/   @@
      @
______@
___  /@
__  /_@
_____/@
      @@
_______@
____/_/@
__/_/  @
< <    @
/ /    @
\\_\\    @@
_______@
____  /@
___  / @
__  /  @
_  /   @
/_/    @@
____ _ @
____| |@
____/ /@
____>_>@
__/_/  @
/_/    @@
__/\\//@
_//\\/ @
  $   @
 $    @
$     @
      @@
_____  _ @
___(_)(_)@
__  _ |  @
_  __ |  @
/_/ |_|  @
         @@
____   _ @
__(_)_(_)@
_  __ \\  @
/ /_/ /  @
\\____/   @
         @@
____   _ @
__(_) (_)@
_  / / / @
/ /_/ /  @
\\____/   @
         @@
____   _ @
__(_)_(_)@
_  __ \`/ @
/ /_/ /  @
\\__,_/   @
         @@
____   _ @
__(_)_(_)@
_  __ \\  @
/ /_/ /  @
\\____/   @
         @@
____   _ @
__(_) (_)@
_  / / / @
/ /_/ /  @
\\__,_/   @
         @@
_________ @
____  __ \\@
___  / / /@
__  /_| | @
_  //__/  @
/_/       @@
160
     $$@
    $$ @
   $$  @
  $$   @
 $$    @
$$     @@
161
_____ @
___(_)@
__  / @
_  /  @
/_/   @
      @@
162
_______@
____/ /@
_  ___/@
/ /__  @
\\  _/  @
/_/    @@
163
_________ @
____  ,__\\@
___/ /_   @
__/ /___  @
(_,____/  @
          @@
164
___ /|___/|@
___| __  / @
__  /_/ /  @
_ ___  |   @
|/   |/    @
           @@
165
___ ____@
___| / /@
_ _  __/@
/_  __/ @
 /_/    @
        @@
166
_______@
____  /@
_____/ @
____   @
_  /   @
/_/    @@
167
_______ @
____/ _)@
__  | | @
_| || | @
_| |_/  @
(__/    @@
168
___   _ @
_(_) (_)@
  $   $ @
 $   $  @
$   $   @
        @@
169
__________  @
___  _____\\ @
__  / ___/ |@
_  / /__  / @
|  \\___/ /  @
 \\______/   @@
170
______ _@
__  _ \`/@
__\\_,_/ @
/____/  @
 $      @
        @@
171
______@
_  / /@
/ / / @
\\ \\ \\ @
 \\_\\_\\@
      @@
172
        @
________@
_/___  /@
    /_/ @
  $     @
        @@
173
       @
       @
_______@
_/____/@
   $   @
       @@
174
__________  @
___  ___  \\ @
__  / _ \\  |@
_  / , _/ / @
| /_/|_| /  @
 \\______/   @@
175
________@
_/_____/@
   $    @
  $     @
 $      @
        @@
176
_____ @
_  _ \\@
/ // /@
\\___/ @
 $    @
      @@
177
________ @
_____/ /_@
____  __/@
___/_/_  @
/_____/  @
         @@
178
__ ___ @
__|_  |@
_  __/ @
/____/ @
 $     @
       @@
179
__ ____@
__|_  /@
__/_ < @
/____/ @
 $     @
       @@
180
____@
_/_/@
  $ @
 $  @
$   @
    @@
181
          @
______  __@
___  / / /@
__  /_/ / @
_  ._,_/  @
/_/       @@
182
_________@
_  _    /@
/ (/ / / @
\\_  / /  @
 /_/_/   @
         @@
183
    @
___ @
_(_)@
  $ @
 $  @
    @@
184 
    @
    @
    @
    @
___ @
_/_)@@
185
_____@
_<  /@
_  / @
/_/  @
$    @
     @@
186
______ @
__  _ \\@
__\\___/@
/____/ @
 $     @
       @@
187
_____  @
__ \\ \\ @
___ \\ \\@
__  / /@
___/_/ @
       @@
188
_____   __ @
_<  / _/_/ @
_/ /_/_/___@
/_//_// / /@
 /_/ /_  _/@
      /_/  @@
189
_____   __   @
_<  / _/_/__ @
_/ /_/_/|_  |@
/_//_/ / __/ @
 /_/  /____/ @
             @@
190
__ ____    __ @
__|_  /  _/_/ @
__/_ < _/_/___@
/____//_// / /@
    /_/ /_  _/@
         /_/  @@
191
___ _ @
___(_)@
__  / @
/ _/_ @
\\___/ @
      @@
192
______ @
____\\_\\@
__  _ |@
_  __ |@
/_/ |_|@
       @@
193
_______@
____/_/@
__  _ |@
_  __ |@
/_/ |_|@
       @@
194
____ //|@
____|/||@
__  _ | @
_  __ | @
/_/ |_| @
        @@
195
_____/\\//@
____//\\/ @
__  _ |  @
_  __ |  @
/_/ |_|  @
         @@
196
_____  _ @
___(_)(_)@
__  _ |  @
_  __ |  @
/_/ |_|  @
         @@
197
____(())@
___    |@
__  /| |@
_  ___ |@
/_/  |_|@
        @@
198
______________@
___      ____/@
__  /|  __/   @
_  __  /___   @
/_/ /_____/   @
              @@
199
_________@
__  ____/@
_  /     @
/ /___   @
\\____/   @
 /_)     @@
200
______ @
____\\_\\@
__  __/@
_  _/  @
/___/  @
       @@
201
_______@
____/_/@
__  __/@
_  _/  @
/___/  @
       @@
202
____ //|@
____|/||@
__  __/ @
_  _/   @
/___/   @
        @@
203
_____  _ @
___(_)(_)@
__  __/  @
_  _/    @
/___/    @
         @@
204
______ @
____\\_\\@
__   _/@
__/ /  @
/___/  @
       @@
205
_______@
____/_/@
__   _/@
__/ /  @
/___/  @
       @@
206
____ //|@
____|/||@
__   _/ @
__/ /   @
/___/   @
        @@
207
_____  _ @
___(_)(_)@
__   _/  @
__/ /    @
/___/    @
         @@
208
_________ @
____  __ \\@
___  /_/ /@
/_  __/ / @
 /_____/  @
          @@
209
_____/\\//@
____//\\/ @
__  |/ / @
_     /  @
/_/|_/   @
         @@
210
______ @
____\\_\\@
_  __ \\@
/ /_/ /@
\\____/ @
       @@
211
_______@
____/_/@
_  __ \\@
/ /_/ /@
\\____/ @
       @@
212
___ //|@
___|/||@
_  __ \\@
/ /_/ /@
\\____/ @
       @@
213
____/\\//@
___//\\/ @
_  __ \\ @
/ /_/ / @
\\____/  @
        @@
214
____   _ @
__(_)_(_)@
_  __ \\  @
/ /_/ /  @
\\____/   @
         @@
215
     @
__   @
_/|/|@
 > < @
|/|/ @
     @@
216
________ @
__  _// \\@
_  //// /@
/ //// / @
\\_//__/  @
         @@
217
______  @
____\\_\\_@
_  / / /@
/ /_/ / @
\\____/  @
        @@
218
_______ @
____/_/_@
_  / / /@
/ /_/ / @
\\____/  @
        @@
219
___ //| @
___|/||_@
_  / / /@
/ /_/ / @
\\____/  @
        @@
220
____   _ @
__(_) (_)@
_  / / / @
/ /_/ /  @
\\____/   @
         @@
221
______ @
___/_/_@
__ \\/ /@
___  / @
__/_/  @
       @@
222
______  @
___  /_ @
__  __ \\@
_  ____/@
/_/     @
        @@
223
_________ @
____  __ \\@
___  / / /@
__  /_| | @
_  //__/  @
/_/       @@
224
______  @
____\\_\\_@
_  __ \`/@
/ /_/ / @
\\__,_/  @
        @@
225
_______ @
____/_/_@
_  __ \`/@
/ /_/ / @
\\__,_/  @
        @@
226
___ //| @
___|/||_@
_  __ \`/@
/ /_/ / @
\\__,_/  @
        @@
227
____/\\//@
___//\\/_@
_  __ \`/@
/ /_/ / @
\\__,_/  @
        @@
228
____   _ @
__(_)_(_)@
_  __ \`/ @
/ /_/ /  @
\\__,_/   @
         @@
229
_______ @
____(())@
_  __ \`/@
/ /_/ / @
\\__,_/  @
        @@
230
           @
______ ___ @
_  __ \` _ \\@
/ /_/   __/@
\\__,_____/ @
           @@
231
       @
_______@
_  ___/@
/ /__  @
\\___/  @
/_)    @@
232
_____ @
___\\_\\@
_  _ \\@
/  __/@
\\___/ @
      @@
233
______@
___/_/@
_  _ \\@
/  __/@
\\___/ @
      @@
234
___ //|@
___|/||@
_  _ \\ @
/  __/ @
\\___/  @
       @@
235
____  _ @
__(_)(_)@
_  _ \\  @
/  __/  @
\\___/   @
        @@
236
_____ @
___\\_\\@
__  / @
_  /  @
/_/   @
      @@
237
______@
___/_/@
__  / @
_  /  @
/_/   @
      @@
238
___ //|@
___|/||@
__  /  @
_  /   @
/_/    @
       @@
239
_ _   _ @
_(_)_(_)@
__/ /   @
_  /    @
/_/     @
        @@
240
____ || @
____=||=@
____ || @
/ __\` | @
\\____/  @
        @@
241
_____/\\//@
____//\\/ @
__  __ \\ @
_  / / / @
/_/ /_/  @
         @@
242
______ @
____\\_\\@
_  __ \\@
/ /_/ /@
\\____/ @
       @@
243
_______@
____/_/@
_  __ \\@
/ /_/ /@
\\____/ @
       @@
244
___ //|@
___|/||@
_  __ \\@
/ /_/ /@
\\____/ @
       @@
245
____/\\//@
___//\\/ @
_  __ \\ @
/ /_/ / @
\\____/  @
        @@
246
____   _ @
__(_)_(_)@
_  __ \\  @
/ /_/ /  @
\\____/   @
         @@
247
       @
_____  @
___(_)_@
/_____/@
 (_)   @
       @@
248
        @
_______ @
_  _// \\@
/ //// /@
\\_//__/ @
        @@
249
______  @
____\\_\\_@
_  / / /@
/ /_/ / @
\\__,_/  @
        @@
250
_______ @
____/_/_@
_  / / /@
/ /_/ / @
\\__,_/  @
        @@
251
___ //| @
___|/||_@
_  / / /@
/ /_/ / @
\\__,_/  @
        @@
252
____   _ @
__(_) (_)@
_  / / / @
/ /_/ /  @
\\__,_/   @
         @@
253
________ @
_____/_/_@
__  / / /@
_  /_/ / @
_\\__, /  @
/____/   @@
254
_______  @
____  /_ @
___  __ \\@
__  /_/ /@
_  .___/ @
/_/      @@
255
_____   _ @
___(_) (_)@
__  / / / @
_  /_/ /  @
_\\__, /   @
/____/    @@
`},Symbol.toStringTag,{value:"Module"})),no=Object.freeze(Object.defineProperty({__proto__:null,default:`flf2a$ 6 5 16 15 13 0 24463 229
Standard by Glenn Chappell & Ian Chai 3/93 -- based on Frank's .sig
Includes ISO Latin-1
figlet release 2.1 -- 12 Aug 1994
Modified for figlet 2.2 by John Cowan <cowan@ccil.org>
  to add Latin-{2,3,4,5} support (Unicode U+0100-017F).
Permission is hereby given to modify this font, as long as the
modifier's name is placed on a comment line.

Modified by Paul Burton <solution@earthlink.net> 12/96 to include new parameter
supported by FIGlet and FIGWin.  May also be slightly modified for better use
of new full-width/kern/smush alternatives, but default output is NOT changed.

Font modified May 20, 2012 by patorjk to add the 0xCA0 character
 $@
 $@
 $@
 $@
 $@
 $@@
  _ @
 | |@
 | |@
 |_|@
 (_)@
    @@
  _ _ @
 ( | )@
  V V @
   $  @
   $  @
      @@
    _  _   @
  _| || |_ @
 |_  ..  _|@
 |_      _|@
   |_||_|  @
           @@
   _  @
  | | @
 / __)@
 \\__ \\@
 (   /@
  |_| @@
  _  __@
 (_)/ /@
   / / @
  / /_ @
 /_/(_)@
       @@
   ___   @
  ( _ )  @
  / _ \\/\\@
 | (_>  <@
  \\___/\\/@
         @@
  _ @
 ( )@
 |/ @
  $ @
  $ @
    @@
   __@
  / /@
 | | @
 | | @
 | | @
  \\_\\@@
 __  @
 \\ \\ @
  | |@
  | |@
  | |@
 /_/ @@
       @
 __/\\__@
 \\    /@
 /_  _\\@
   \\/  @
       @@
        @
    _   @
  _| |_ @
 |_   _|@
   |_|  @
        @@
    @
    @
    @
  _ @
 ( )@
 |/ @@
        @
        @
  _____ @
 |_____|@
    $   @
        @@
    @
    @
    @
  _ @
 (_)@
    @@
     __@
    / /@
   / / @
  / /  @
 /_/   @
       @@
   ___  @
  / _ \\ @
 | | | |@
 | |_| |@
  \\___/ @
        @@
  _ @
 / |@
 | |@
 | |@
 |_|@
    @@
  ____  @
 |___ \\ @
   __) |@
  / __/ @
 |_____|@
        @@
  _____ @
 |___ / @
   |_ \\ @
  ___) |@
 |____/ @
        @@
  _  _   @
 | || |  @
 | || |_ @
 |__   _|@
    |_|  @
         @@
  ____  @
 | ___| @
 |___ \\ @
  ___) |@
 |____/ @
        @@
   __   @
  / /_  @
 | '_ \\ @
 | (_) |@
  \\___/ @
        @@
  _____ @
 |___  |@
    / / @
   / /  @
  /_/   @
        @@
   ___  @
  ( _ ) @
  / _ \\ @
 | (_) |@
  \\___/ @
        @@
   ___  @
  / _ \\ @
 | (_) |@
  \\__, |@
    /_/ @
        @@
    @
  _ @
 (_)@
  _ @
 (_)@
    @@
    @
  _ @
 (_)@
  _ @
 ( )@
 |/ @@
   __@
  / /@
 / / @
 \\ \\ @
  \\_\\@
     @@
        @
  _____ @
 |_____|@
 |_____|@
    $   @
        @@
 __  @
 \\ \\ @
  \\ \\@
  / /@
 /_/ @
     @@
  ___ @
 |__ \\@
   / /@
  |_| @
  (_) @
      @@
    ____  @
   / __ \\ @
  / / _\` |@
 | | (_| |@
  \\ \\__,_|@
   \\____/ @@
     _    @
    / \\   @
   / _ \\  @
  / ___ \\ @
 /_/   \\_\\@
          @@
  ____  @
 | __ ) @
 |  _ \\ @
 | |_) |@
 |____/ @
        @@
   ____ @
  / ___|@
 | |    @
 | |___ @
  \\____|@
        @@
  ____  @
 |  _ \\ @
 | | | |@
 | |_| |@
 |____/ @
        @@
  _____ @
 | ____|@
 |  _|  @
 | |___ @
 |_____|@
        @@
  _____ @
 |  ___|@
 | |_   @
 |  _|  @
 |_|    @
        @@
   ____ @
  / ___|@
 | |  _ @
 | |_| |@
  \\____|@
        @@
  _   _ @
 | | | |@
 | |_| |@
 |  _  |@
 |_| |_|@
        @@
  ___ @
 |_ _|@
  | | @
  | | @
 |___|@
      @@
      _ @
     | |@
  _  | |@
 | |_| |@
  \\___/ @
        @@
  _  __@
 | |/ /@
 | ' / @
 | . \\ @
 |_|\\_\\@
       @@
  _     @
 | |    @
 | |    @
 | |___ @
 |_____|@
        @@
  __  __ @
 |  \\/  |@
 | |\\/| |@
 | |  | |@
 |_|  |_|@
         @@
  _   _ @
 | \\ | |@
 |  \\| |@
 | |\\  |@
 |_| \\_|@
        @@
   ___  @
  / _ \\ @
 | | | |@
 | |_| |@
  \\___/ @
        @@
  ____  @
 |  _ \\ @
 | |_) |@
 |  __/ @
 |_|    @
        @@
   ___  @
  / _ \\ @
 | | | |@
 | |_| |@
  \\__\\_\\@
        @@
  ____  @
 |  _ \\ @
 | |_) |@
 |  _ < @
 |_| \\_\\@
        @@
  ____  @
 / ___| @
 \\___ \\ @
  ___) |@
 |____/ @
        @@
  _____ @
 |_   _|@
   | |  @
   | |  @
   |_|  @
        @@
  _   _ @
 | | | |@
 | | | |@
 | |_| |@
  \\___/ @
        @@
 __     __@
 \\ \\   / /@
  \\ \\ / / @
   \\ V /  @
    \\_/   @
          @@
 __        __@
 \\ \\      / /@
  \\ \\ /\\ / / @
   \\ V  V /  @
    \\_/\\_/   @
             @@
 __  __@
 \\ \\/ /@
  \\  / @
  /  \\ @
 /_/\\_\\@
       @@
 __   __@
 \\ \\ / /@
  \\ V / @
   | |  @
   |_|  @
        @@
  _____@
 |__  /@
   / / @
  / /_ @
 /____|@
       @@
  __ @
 | _|@
 | | @
 | | @
 | | @
 |__|@@
 __    @
 \\ \\   @
  \\ \\  @
   \\ \\ @
    \\_\\@
       @@
  __ @
 |_ |@
  | |@
  | |@
  | |@
 |__|@@
  /\\ @
 |/\\|@
   $ @
   $ @
   $ @
     @@
        @
        @
        @
        @
  _____ @
 |_____|@@
  _ @
 ( )@
  \\|@
  $ @
  $ @
    @@
        @
   __ _ @
  / _\` |@
 | (_| |@
  \\__,_|@
        @@
  _     @
 | |__  @
 | '_ \\ @
 | |_) |@
 |_.__/ @
        @@
       @
   ___ @
  / __|@
 | (__ @
  \\___|@
       @@
      _ @
   __| |@
  / _\` |@
 | (_| |@
  \\__,_|@
        @@
       @
   ___ @
  / _ \\@
 |  __/@
  \\___|@
       @@
   __ @
  / _|@
 | |_ @
 |  _|@
 |_|  @
      @@
        @
   __ _ @
  / _\` |@
 | (_| |@
  \\__, |@
  |___/ @@
  _     @
 | |__  @
 | '_ \\ @
 | | | |@
 |_| |_|@
        @@
  _ @
 (_)@
 | |@
 | |@
 |_|@
    @@
    _ @
   (_)@
   | |@
   | |@
  _/ |@
 |__/ @@
  _    @
 | | __@
 | |/ /@
 |   < @
 |_|\\_\\@
       @@
  _ @
 | |@
 | |@
 | |@
 |_|@
    @@
            @
  _ __ ___  @
 | '_ \` _ \\ @
 | | | | | |@
 |_| |_| |_|@
            @@
        @
  _ __  @
 | '_ \\ @
 | | | |@
 |_| |_|@
        @@
        @
   ___  @
  / _ \\ @
 | (_) |@
  \\___/ @
        @@
        @
  _ __  @
 | '_ \\ @
 | |_) |@
 | .__/ @
 |_|    @@
        @
   __ _ @
  / _\` |@
 | (_| |@
  \\__, |@
     |_|@@
       @
  _ __ @
 | '__|@
 | |   @
 |_|   @
       @@
      @
  ___ @
 / __|@
 \\__ \\@
 |___/@
      @@
  _   @
 | |_ @
 | __|@
 | |_ @
  \\__|@
      @@
        @
  _   _ @
 | | | |@
 | |_| |@
  \\__,_|@
        @@
        @
 __   __@
 \\ \\ / /@
  \\ V / @
   \\_/  @
        @@
           @
 __      __@
 \\ \\ /\\ / /@
  \\ V  V / @
   \\_/\\_/  @
           @@
       @
 __  __@
 \\ \\/ /@
  >  < @
 /_/\\_\\@
       @@
        @
  _   _ @
 | | | |@
 | |_| |@
  \\__, |@
  |___/ @@
      @
  ____@
 |_  /@
  / / @
 /___|@
      @@
    __@
   / /@
  | | @
 < <  @
  | | @
   \\_\\@@
  _ @
 | |@
 | |@
 | |@
 | |@
 |_|@@
 __   @
 \\ \\  @
  | | @
   > >@
  | | @
 /_/  @@
  /\\/|@
 |/\\/ @
   $  @
   $  @
   $  @
      @@
  _   _ @
 (_)_(_)@
   /_\\  @
  / _ \\ @
 /_/ \\_\\@
        @@
  _   _ @
 (_)_(_)@
  / _ \\ @
 | |_| |@
  \\___/ @
        @@
  _   _ @
 (_) (_)@
 | | | |@
 | |_| |@
  \\___/ @
        @@
  _   _ @
 (_)_(_)@
  / _\` |@
 | (_| |@
  \\__,_|@
        @@
  _   _ @
 (_)_(_)@
  / _ \\ @
 | (_) |@
  \\___/ @
        @@
  _   _ @
 (_) (_)@
 | | | |@
 | |_| |@
  \\__,_|@
        @@
   ___ @
  / _ \\@
 | |/ /@
 | |\\ \\@
 | ||_/@
 |_|   @@
160  NO-BREAK SPACE
 $@
 $@
 $@
 $@
 $@
 $@@
161  INVERTED EXCLAMATION MARK
  _ @
 (_)@
 | |@
 | |@
 |_|@
    @@
162  CENT SIGN
    _  @
   | | @
  / __)@
 | (__ @
  \\   )@
   |_| @@
163  POUND SIGN
    ___  @
   / ,_\\ @
 _| |_   @
  | |___ @
 (_,____|@
         @@
164  CURRENCY SIGN
 /\\___/\\@
 \\  _  /@
 | (_) |@
 / ___ \\@
 \\/   \\/@
        @@
165  YEN SIGN
  __ __ @
  \\ V / @
 |__ __|@
 |__ __|@
   |_|  @
        @@
166  BROKEN BAR
  _ @
 | |@
 |_|@
  _ @
 | |@
 |_|@@
167  SECTION SIGN
    __ @
  _/ _)@
 / \\ \\ @
 \\ \\\\ \\@
  \\ \\_/@
 (__/  @@
168  DIAERESIS
  _   _ @
 (_) (_)@
  $   $ @
  $   $ @
  $   $ @
        @@
169  COPYRIGHT SIGN
    _____   @
   / ___ \\  @
  / / __| \\ @
 | | (__   |@
  \\ \\___| / @
   \\_____/  @@
170  FEMININE ORDINAL INDICATOR
  __ _ @
 / _\` |@
 \\__,_|@
 |____|@
    $  @
       @@
171  LEFT-POINTING DOUBLE ANGLE QUOTATION MARK
   ____@
  / / /@
 / / / @
 \\ \\ \\ @
  \\_\\_\\@
       @@
172  NOT SIGN
        @
  _____ @
 |___  |@
     |_|@
    $   @
        @@
173  SOFT HYPHEN
       @
       @
  ____ @
 |____|@
    $  @
       @@
174  REGISTERED SIGN
    _____   @
   / ___ \\  @
  / | _ \\ \\ @
 |  |   /  |@
  \\ |_|_\\ / @
   \\_____/  @@
175  MACRON
  _____ @
 |_____|@
    $   @
    $   @
    $   @
        @@
176  DEGREE SIGN
   __  @
  /  \\ @
 | () |@
  \\__/ @
    $  @
       @@
177  PLUS-MINUS SIGN
    _   @
  _| |_ @
 |_   _|@
  _|_|_ @
 |_____|@
        @@
178  SUPERSCRIPT TWO
  ___ @
 |_  )@
  / / @
 /___|@
   $  @
      @@
179  SUPERSCRIPT THREE
  ____@
 |__ /@
  |_ \\@
 |___/@
   $  @
      @@
180  ACUTE ACCENT
  __@
 /_/@
  $ @
  $ @
  $ @
    @@
181  MICRO SIGN
        @
  _   _ @
 | | | |@
 | |_| |@
 | ._,_|@
 |_|    @@
182  PILCROW SIGN
   _____ @
  /     |@
 | (| | |@
  \\__ | |@
    |_|_|@
         @@
183  MIDDLE DOT
    @
  _ @
 (_)@
  $ @
  $ @
    @@
184  CEDILLA
    @
    @
    @
    @
  _ @
 )_)@@
185  SUPERSCRIPT ONE
  _ @
 / |@
 | |@
 |_|@
  $ @
    @@
186  MASCULINE ORDINAL INDICATOR
  ___ @
 / _ \\@
 \\___/@
 |___|@
   $  @
      @@
187  RIGHT-POINTING DOUBLE ANGLE QUOTATION MARK
 ____  @
 \\ \\ \\ @
  \\ \\ \\@
  / / /@
 /_/_/ @
       @@
188  VULGAR FRACTION ONE QUARTER
  _   __    @
 / | / / _  @
 | |/ / | | @
 |_/ /|_  _|@
  /_/   |_| @
            @@
189  VULGAR FRACTION ONE HALF
  _   __   @
 / | / /__ @
 | |/ /_  )@
 |_/ / / / @
  /_/ /___|@
           @@
190  VULGAR FRACTION THREE QUARTERS
  ____  __    @
 |__ / / / _  @
  |_ \\/ / | | @
 |___/ /|_  _|@
    /_/   |_| @
              @@
191  INVERTED QUESTION MARK
   _  @
  (_) @
  | | @
 / /_ @
 \\___|@
      @@
192  LATIN CAPITAL LETTER A WITH GRAVE
   __   @
   \\_\\  @
   /_\\  @
  / _ \\ @
 /_/ \\_\\@
        @@
193  LATIN CAPITAL LETTER A WITH ACUTE
    __  @
   /_/  @
   /_\\  @
  / _ \\ @
 /_/ \\_\\@
        @@
194  LATIN CAPITAL LETTER A WITH CIRCUMFLEX
   //\\  @
  |/_\\| @
   /_\\  @
  / _ \\ @
 /_/ \\_\\@
        @@
195  LATIN CAPITAL LETTER A WITH TILDE
   /\\/| @
  |/\\/  @
   /_\\  @
  / _ \\ @
 /_/ \\_\\@
        @@
196  LATIN CAPITAL LETTER A WITH DIAERESIS
  _   _ @
 (_)_(_)@
   /_\\  @
  / _ \\ @
 /_/ \\_\\@
        @@
197  LATIN CAPITAL LETTER A WITH RING ABOVE
    _   @
   (o)  @
   /_\\  @
  / _ \\ @
 /_/ \\_\\@
        @@
198  LATIN CAPITAL LETTER AE
     ______ @
    /  ____|@
   / _  _|  @
  / __ |___ @
 /_/ |_____|@
            @@
199  LATIN CAPITAL LETTER C WITH CEDILLA
   ____ @
  / ___|@
 | |    @
 | |___ @
  \\____|@
    )_) @@
200  LATIN CAPITAL LETTER E WITH GRAVE
   __   @
  _\\_\\_ @
 | ____|@
 |  _|_ @
 |_____|@
        @@
201  LATIN CAPITAL LETTER E WITH ACUTE
    __  @
  _/_/_ @
 | ____|@
 |  _|_ @
 |_____|@
        @@
202  LATIN CAPITAL LETTER E WITH CIRCUMFLEX
   //\\  @
  |/_\\| @
 | ____|@
 |  _|_ @
 |_____|@
        @@
203  LATIN CAPITAL LETTER E WITH DIAERESIS
  _   _ @
 (_)_(_)@
 | ____|@
 |  _|_ @
 |_____|@
        @@
204  LATIN CAPITAL LETTER I WITH GRAVE
  __  @
  \\_\\ @
 |_ _|@
  | | @
 |___|@
      @@
205  LATIN CAPITAL LETTER I WITH ACUTE
   __ @
  /_/ @
 |_ _|@
  | | @
 |___|@
      @@
206  LATIN CAPITAL LETTER I WITH CIRCUMFLEX
  //\\ @
 |/_\\|@
 |_ _|@
  | | @
 |___|@
      @@
207  LATIN CAPITAL LETTER I WITH DIAERESIS
  _   _ @
 (_)_(_)@
  |_ _| @
   | |  @
  |___| @
        @@
208  LATIN CAPITAL LETTER ETH
    ____  @
   |  _ \\ @
  _| |_| |@
 |__ __| |@
   |____/ @
          @@
209  LATIN CAPITAL LETTER N WITH TILDE
   /\\/|@
  |/\\/ @
 | \\| |@
 | .\` |@
 |_|\\_|@
       @@
210  LATIN CAPITAL LETTER O WITH GRAVE
   __   @
   \\_\\  @
  / _ \\ @
 | |_| |@
  \\___/ @
        @@
211  LATIN CAPITAL LETTER O WITH ACUTE
    __  @
   /_/  @
  / _ \\ @
 | |_| |@
  \\___/ @
        @@
212  LATIN CAPITAL LETTER O WITH CIRCUMFLEX
   //\\  @
  |/_\\| @
  / _ \\ @
 | |_| |@
  \\___/ @
        @@
213  LATIN CAPITAL LETTER O WITH TILDE
   /\\/| @
  |/\\/  @
  / _ \\ @
 | |_| |@
  \\___/ @
        @@
214  LATIN CAPITAL LETTER O WITH DIAERESIS
  _   _ @
 (_)_(_)@
  / _ \\ @
 | |_| |@
  \\___/ @
        @@
215  MULTIPLICATION SIGN
     @
     @
 /\\/\\@
 >  <@
 \\/\\/@
     @@
216  LATIN CAPITAL LETTER O WITH STROKE
   ____ @
  / _// @
 | |// |@
 | //| |@
  //__/ @
        @@
217  LATIN CAPITAL LETTER U WITH GRAVE
   __   @
  _\\_\\_ @
 | | | |@
 | |_| |@
  \\___/ @
        @@
218  LATIN CAPITAL LETTER U WITH ACUTE
    __  @
  _/_/_ @
 | | | |@
 | |_| |@
  \\___/ @
        @@
219  LATIN CAPITAL LETTER U WITH CIRCUMFLEX
   //\\  @
  |/ \\| @
 | | | |@
 | |_| |@
  \\___/ @
        @@
220  LATIN CAPITAL LETTER U WITH DIAERESIS
  _   _ @
 (_) (_)@
 | | | |@
 | |_| |@
  \\___/ @
        @@
221  LATIN CAPITAL LETTER Y WITH ACUTE
    __  @
 __/_/__@
 \\ \\ / /@
  \\ V / @
   |_|  @
        @@
222  LATIN CAPITAL LETTER THORN
  _     @
 | |___ @
 |  __ \\@
 |  ___/@
 |_|    @
        @@
223  LATIN SMALL LETTER SHARP S
   ___ @
  / _ \\@
 | |/ /@
 | |\\ \\@
 | ||_/@
 |_|   @@
224  LATIN SMALL LETTER A WITH GRAVE
   __   @
   \\_\\_ @
  / _\` |@
 | (_| |@
  \\__,_|@
        @@
225  LATIN SMALL LETTER A WITH ACUTE
    __  @
   /_/_ @
  / _\` |@
 | (_| |@
  \\__,_|@
        @@
226  LATIN SMALL LETTER A WITH CIRCUMFLEX
   //\\  @
  |/_\\| @
  / _\` |@
 | (_| |@
  \\__,_|@
        @@
227  LATIN SMALL LETTER A WITH TILDE
   /\\/| @
  |/\\/_ @
  / _\` |@
 | (_| |@
  \\__,_|@
        @@
228  LATIN SMALL LETTER A WITH DIAERESIS
  _   _ @
 (_)_(_)@
  / _\` |@
 | (_| |@
  \\__,_|@
        @@
229  LATIN SMALL LETTER A WITH RING ABOVE
    __  @
   (()) @
  / _ '|@
 | (_| |@
  \\__,_|@
        @@
230  LATIN SMALL LETTER AE
           @
   __ ____ @
  / _\`  _ \\@
 | (_|  __/@
  \\__,____|@
           @@
231  LATIN SMALL LETTER C WITH CEDILLA
       @
   ___ @
  / __|@
 | (__ @
  \\___|@
   )_) @@
232  LATIN SMALL LETTER E WITH GRAVE
   __  @
   \\_\\ @
  / _ \\@
 |  __/@
  \\___|@
       @@
233  LATIN SMALL LETTER E WITH ACUTE
    __ @
   /_/ @
  / _ \\@
 |  __/@
  \\___|@
       @@
234  LATIN SMALL LETTER E WITH CIRCUMFLEX
   //\\ @
  |/_\\|@
  / _ \\@
 |  __/@
  \\___|@
       @@
235  LATIN SMALL LETTER E WITH DIAERESIS
  _   _ @
 (_)_(_)@
  / _ \\ @
 |  __/ @
  \\___| @
        @@
236  LATIN SMALL LETTER I WITH GRAVE
 __ @
 \\_\\@
 | |@
 | |@
 |_|@
    @@
237  LATIN SMALL LETTER I WITH ACUTE
  __@
 /_/@
 | |@
 | |@
 |_|@
    @@
238  LATIN SMALL LETTER I WITH CIRCUMFLEX
  //\\ @
 |/_\\|@
  | | @
  | | @
  |_| @
      @@
239  LATIN SMALL LETTER I WITH DIAERESIS
  _   _ @
 (_)_(_)@
   | |  @
   | |  @
   |_|  @
        @@
240  LATIN SMALL LETTER ETH
   /\\/\\ @
   >  < @
  _\\/\\ |@
 / __\` |@
 \\____/ @
        @@
241  LATIN SMALL LETTER N WITH TILDE
   /\\/| @
  |/\\/  @
 | '_ \\ @
 | | | |@
 |_| |_|@
        @@
242  LATIN SMALL LETTER O WITH GRAVE
   __   @
   \\_\\  @
  / _ \\ @
 | (_) |@
  \\___/ @
        @@
243  LATIN SMALL LETTER O WITH ACUTE
    __  @
   /_/  @
  / _ \\ @
 | (_) |@
  \\___/ @
        @@
244  LATIN SMALL LETTER O WITH CIRCUMFLEX
   //\\  @
  |/_\\| @
  / _ \\ @
 | (_) |@
  \\___/ @
        @@
245  LATIN SMALL LETTER O WITH TILDE
   /\\/| @
  |/\\/  @
  / _ \\ @
 | (_) |@
  \\___/ @
        @@
246  LATIN SMALL LETTER O WITH DIAERESIS
  _   _ @
 (_)_(_)@
  / _ \\ @
 | (_) |@
  \\___/ @
        @@
247  DIVISION SIGN
        @
    _   @
  _(_)_ @
 |_____|@
   (_)  @
        @@
248  LATIN SMALL LETTER O WITH STROKE
         @
   ____  @
  / _//\\ @
 | (//) |@
  \\//__/ @
         @@
249  LATIN SMALL LETTER U WITH GRAVE
   __   @
  _\\_\\_ @
 | | | |@
 | |_| |@
  \\__,_|@
        @@
250  LATIN SMALL LETTER U WITH ACUTE
    __  @
  _/_/_ @
 | | | |@
 | |_| |@
  \\__,_|@
        @@
251  LATIN SMALL LETTER U WITH CIRCUMFLEX
   //\\  @
  |/ \\| @
 | | | |@
 | |_| |@
  \\__,_|@
        @@
252  LATIN SMALL LETTER U WITH DIAERESIS
  _   _ @
 (_) (_)@
 | | | |@
 | |_| |@
  \\__,_|@
        @@
253  LATIN SMALL LETTER Y WITH ACUTE
    __  @
  _/_/_ @
 | | | |@
 | |_| |@
  \\__, |@
  |___/ @@
254  LATIN SMALL LETTER THORN
  _     @
 | |__  @
 | '_ \\ @
 | |_) |@
 | .__/ @
 |_|    @@
255  LATIN SMALL LETTER Y WITH DIAERESIS
  _   _ @
 (_) (_)@
 | | | |@
 | |_| |@
  \\__, |@
  |___/ @@
0x0100  LATIN CAPITAL LETTER A WITH MACRON
   ____ @
  /___/ @
   /_\\  @
  / _ \\ @
 /_/ \\_\\@
        @@
0x0101  LATIN SMALL LETTER A WITH MACRON
    ___ @
   /_ _/@
  / _\` |@
 | (_| |@
  \\__,_|@
        @@
0x0102  LATIN CAPITAL LETTER A WITH BREVE
  _   _ @
  \\\\_// @
   /_\\  @
  / _ \\ @
 /_/ \\_\\@
        @@
0x0103  LATIN SMALL LETTER A WITH BREVE
   \\_/  @
   ___  @
  / _\` |@
 | (_| |@
  \\__,_|@
        @@
0x0104  LATIN CAPITAL LETTER A WITH OGONEK
        @
    _   @
   /_\\  @
  / _ \\ @
 /_/ \\_\\@
     (_(@@
0x0105  LATIN SMALL LETTER A WITH OGONEK
        @
   __ _ @
  / _\` |@
 | (_| |@
  \\__,_|@
     (_(@@
0x0106  LATIN CAPITAL LETTER C WITH ACUTE
     __ @
   _/_/ @
  / ___|@
 | |___ @
  \\____|@
        @@
0x0107  LATIN SMALL LETTER C WITH ACUTE
    __ @
   /__/@
  / __|@
 | (__ @
  \\___|@
       @@
0x0108  LATIN CAPITAL LETTER C WITH CIRCUMFLEX
     /\\ @
   _//\\\\@
  / ___|@
 | |___ @
  \\____|@
        @@
0x0109  LATIN SMALL LETTER C WITH CIRCUMFLEX
    /\\ @
   /_\\ @
  / __|@
 | (__ @
  \\___|@
       @@
0x010A  LATIN CAPITAL LETTER C WITH DOT ABOVE
    []  @
   ____ @
  / ___|@
 | |___ @
  \\____|@
        @@
0x010B  LATIN SMALL LETTER C WITH DOT ABOVE
   []  @
   ___ @
  / __|@
 | (__ @
  \\___|@
       @@
0x010C  LATIN CAPITAL LETTER C WITH CARON
   \\\\// @
   _\\/_ @
  / ___|@
 | |___ @
  \\____|@
        @@
0x010D  LATIN SMALL LETTER C WITH CARON
   \\\\//@
   _\\/ @
  / __|@
 | (__ @
  \\___|@
       @@
0x010E  LATIN CAPITAL LETTER D WITH CARON
   \\\\// @
  __\\/  @
 |  _ \\ @
 | |_| |@
 |____/ @
        @@
0x010F  LATIN SMALL LETTER D WITH CARON
  \\/  _ @
   __| |@
  / _\` |@
 | (_| |@
  \\__,_|@
        @@
0x0110  LATIN CAPITAL LETTER D WITH STROKE
   ____   @
  |_ __ \\ @
 /| |/ | |@
 /|_|/_| |@
  |_____/ @
          @@
0x0111  LATIN SMALL LETTER D WITH STROKE
    ---|@
   __| |@
  / _\` |@
 | (_| |@
  \\__,_|@
        @@
0x0112  LATIN CAPITAL LETTER E WITH MACRON
   ____ @
  /___/ @
 | ____|@
 |  _|_ @
 |_____|@
        @@
0x0113  LATIN SMALL LETTER E WITH MACRON
    ____@
   /_ _/@
  / _ \\ @
 |  __/ @
  \\___| @
        @@
0x0114  LATIN CAPITAL LETTER E WITH BREVE
  _   _ @
  \\\\_// @
 | ____|@
 |  _|_ @
 |_____|@
        @@
0x0115  LATIN SMALL LETTER E WITH BREVE
  \\\\  //@
    --  @
  / _ \\ @
 |  __/ @
  \\___| @
        @@
0x0116  LATIN CAPITAL LETTER E WITH DOT ABOVE
    []  @
  _____ @
 | ____|@
 |  _|_ @
 |_____|@
        @@
0x0117  LATIN SMALL LETTER E WITH DOT ABOVE
    [] @
    __ @
  / _ \\@
 |  __/@
  \\___|@
       @@
0x0118  LATIN CAPITAL LETTER E WITH OGONEK
        @
  _____ @
 | ____|@
 |  _|_ @
 |_____|@
    (__(@@
0x0119  LATIN SMALL LETTER E WITH OGONEK
       @
   ___ @
  / _ \\@
 |  __/@
  \\___|@
    (_(@@
0x011A  LATIN CAPITAL LETTER E WITH CARON
   \\\\// @
  __\\/_ @
 | ____|@
 |  _|_ @
 |_____|@
        @@
0x011B  LATIN SMALL LETTER E WITH CARON
   \\\\//@
    \\/ @
  / _ \\@
 |  __/@
  \\___|@
       @@
0x011C  LATIN CAPITAL LETTER G WITH CIRCUMFLEX
   _/\\_ @
  / ___|@
 | |  _ @
 | |_| |@
  \\____|@
        @@
0x011D  LATIN SMALL LETTER G WITH CIRCUMFLEX
     /\\ @
   _/_ \\@
  / _\` |@
 | (_| |@
  \\__, |@
  |___/ @@
0x011E  LATIN CAPITAL LETTER G WITH BREVE
   _\\/_ @
  / ___|@
 | |  _ @
 | |_| |@
  \\____|@
        @@
0x011F  LATIN SMALL LETTER G WITH BREVE
  \\___/ @
   __ _ @
  / _\` |@
 | (_| |@
  \\__, |@
  |___/ @@
0x0120  LATIN CAPITAL LETTER G WITH DOT ABOVE
   _[]_ @
  / ___|@
 | |  _ @
 | |_| |@
  \\____|@
        @@
0x0121  LATIN SMALL LETTER G WITH DOT ABOVE
   []   @
   __ _ @
  / _\` |@
 | (_| |@
  \\__, |@
  |___/ @@
0x0122  LATIN CAPITAL LETTER G WITH CEDILLA
   ____ @
  / ___|@
 | |  _ @
 | |_| |@
  \\____|@
   )__) @@
0x0123  LATIN SMALL LETTER G WITH CEDILLA
        @
   __ _ @
  / _\` |@
 | (_| |@
  \\__, |@
  |_))))@@
0x0124  LATIN CAPITAL LETTER H WITH CIRCUMFLEX
  _/ \\_ @
 | / \\ |@
 | |_| |@
 |  _  |@
 |_| |_|@
        @@
0x0125  LATIN SMALL LETTER H WITH CIRCUMFLEX
  _  /\\ @
 | |//\\ @
 | '_ \\ @
 | | | |@
 |_| |_|@
        @@
0x0126  LATIN CAPITAL LETTER H WITH STROKE
  _   _ @
 | |=| |@
 | |_| |@
 |  _  |@
 |_| |_|@
        @@
0x0127  LATIN SMALL LETTER H WITH STROKE
  _     @
 |=|__  @
 | '_ \\ @
 | | | |@
 |_| |_|@
        @@
0x0128  LATIN CAPITAL LETTER I WITH TILDE
  /\\//@
 |_ _|@
  | | @
  | | @
 |___|@
      @@
0x0129  LATIN SMALL LETTER I WITH TILDE
    @
 /\\/@
 | |@
 | |@
 |_|@
    @@
0x012A  LATIN CAPITAL LETTER I WITH MACRON
 /___/@
 |_ _|@
  | | @
  | | @
 |___|@
      @@
0x012B  LATIN SMALL LETTER I WITH MACRON
  ____@
 /___/@
  | | @
  | | @
  |_| @
      @@
0x012C  LATIN CAPITAL LETTER I WITH BREVE
  \\__/@
 |_ _|@
  | | @
  | | @
 |___|@
      @@
0x012D  LATIN SMALL LETTER I WITH BREVE
    @
 \\_/@
 | |@
 | |@
 |_|@
    @@
0x012E  LATIN CAPITAL LETTER I WITH OGONEK
  ___ @
 |_ _|@
  | | @
  | | @
 |___|@
  (__(@@
0x012F  LATIN SMALL LETTER I WITH OGONEK
  _  @
 (_) @
 | | @
 | | @
 |_|_@
  (_(@@
0x0130  LATIN CAPITAL LETTER I WITH DOT ABOVE
  _[] @
 |_ _|@
  | | @
  | | @
 |___|@
      @@
0x0131  LATIN SMALL LETTER DOTLESS I
    @
  _ @
 | |@
 | |@
 |_|@
    @@
0x0132  LATIN CAPITAL LIGATURE IJ
  ___  _ @
 |_ _|| |@
  | | | |@
  | |_| |@
 |__|__/ @
         @@
0x0133  LATIN SMALL LIGATURE IJ
  _   _ @
 (_) (_)@
 | | | |@
 | | | |@
 |_|_/ |@
   |__/ @@
0x0134  LATIN CAPITAL LETTER J WITH CIRCUMFLEX
      /\\ @
     /_\\|@
  _  | | @
 | |_| | @
  \\___/  @
         @@
0x0135  LATIN SMALL LETTER J WITH CIRCUMFLEX
    /\\@
   /_\\@
   | |@
   | |@
  _/ |@
 |__/ @@
0x0136  LATIN CAPITAL LETTER K WITH CEDILLA
  _  _  @
 | |/ / @
 | ' /  @
 | . \\  @
 |_|\\_\\ @
    )__)@@
0x0137  LATIN SMALL LETTER K WITH CEDILLA
  _    @
 | | __@
 | |/ /@
 |   < @
 |_|\\_\\@
    )_)@@
0x0138  LATIN SMALL LETTER KRA
       @
  _ __ @
 | |/ \\@
 |   < @
 |_|\\_\\@
       @@
0x0139  LATIN CAPITAL LETTER L WITH ACUTE
  _   //@
 | | // @
 | |    @
 | |___ @
 |_____|@
        @@
0x013A  LATIN SMALL LETTER L WITH ACUTE
  //@
 | |@
 | |@
 | |@
 |_|@
    @@
0x013B  LATIN CAPITAL LETTER L WITH CEDILLA
  _     @
 | |    @
 | |    @
 | |___ @
 |_____|@
    )__)@@
0x013C  LATIN SMALL LETTER L WITH CEDILLA
  _   @
 | |  @
 | |  @
 | |  @
 |_|  @
   )_)@@
0x013D  LATIN CAPITAL LETTER L WITH CARON
  _ \\\\//@
 | | \\/ @
 | |    @
 | |___ @
 |_____|@
        @@
0x013E  LATIN SMALL LETTER L WITH CARON
  _ \\\\//@
 | | \\/ @
 | |    @
 | |    @
 |_|    @
        @@
0x013F  LATIN CAPITAL LETTER L WITH MIDDLE DOT
  _     @
 | |    @
 | | [] @
 | |___ @
 |_____|@
        @@
0x0140  LATIN SMALL LETTER L WITH MIDDLE DOT
  _    @
 | |   @
 | | []@
 | |   @
 |_|   @
       @@
0x0141  LATIN CAPITAL LETTER L WITH STROKE
  __    @
 | //   @
 |//|   @
 // |__ @
 |_____|@
        @@
0x0142  LATIN SMALL LETTER L WITH STROKE
  _ @
 | |@
 |//@
 //|@
 |_|@
    @@
0x0143  LATIN CAPITAL LETTER N WITH ACUTE
  _/ /_ @
 | \\ | |@
 |  \\| |@
 | |\\  |@
 |_| \\_|@
        @@
0x0144  LATIN SMALL LETTER N WITH ACUTE
     _  @
  _ /_/ @
 | '_ \\ @
 | | | |@
 |_| |_|@
        @@
0x0145  LATIN CAPITAL LETTER N WITH CEDILLA
  _   _ @
 | \\ | |@
 |  \\| |@
 | |\\  |@
 |_| \\_|@
 )_)    @@
0x0146  LATIN SMALL LETTER N WITH CEDILLA
        @
  _ __  @
 | '_ \\ @
 | | | |@
 |_| |_|@
 )_)    @@
0x0147  LATIN CAPITAL LETTER N WITH CARON
  _\\/ _ @
 | \\ | |@
 |  \\| |@
 | |\\  |@
 |_| \\_|@
        @@
0x0148  LATIN SMALL LETTER N WITH CARON
  \\\\//  @
  _\\/_  @
 | '_ \\ @
 | | | |@
 |_| |_|@
        @@
0x0149  LATIN SMALL LETTER N PRECEDED BY APOSTROPHE
          @
  _  __   @
 ( )| '_\\ @
 |/| | | |@
   |_| |_|@
          @@
0x014A  LATIN CAPITAL LETTER ENG
  _   _ @
 | \\ | |@
 |  \\| |@
 | |\\  |@
 |_| \\ |@
     )_)@@
0x014B  LATIN SMALL LETTER ENG
  _ __  @
 | '_ \\ @
 | | | |@
 |_| | |@
     | |@
    |__ @@
0x014C  LATIN CAPITAL LETTER O WITH MACRON
   ____ @
  /_ _/ @
  / _ \\ @
 | (_) |@
  \\___/ @
        @@
0x014D  LATIN SMALL LETTER O WITH MACRON
   ____ @
  /_ _/ @
  / _ \\ @
 | (_) |@
  \\___/ @
        @@
0x014E  LATIN CAPITAL LETTER O WITH BREVE
  \\   / @
   _-_  @
  / _ \\ @
 | |_| |@
  \\___/ @
        @@
0x014F  LATIN SMALL LETTER O WITH BREVE
  \\   / @
   _-_  @
  / _ \\ @
 | |_| |@
  \\___/ @
        @@
0x0150  LATIN CAPITAL LETTER O WITH DOUBLE ACUTE
    ___ @
   /_/_/@
  / _ \\ @
 | |_| |@
  \\___/ @
        @@
0x0151  LATIN SMALL LETTER O WITH DOUBLE ACUTE
    ___ @
   /_/_/@
  / _ \\ @
 | |_| |@
  \\___/ @
        @@
0x0152  LATIN CAPITAL LIGATURE OE
   ___  ___ @
  / _ \\| __|@
 | | | |  | @
 | |_| | |__@
  \\___/|____@
            @@
0x0153  LATIN SMALL LIGATURE OE
             @
   ___   ___ @
  / _ \\ / _ \\@
 | (_) |  __/@
  \\___/ \\___|@
             @@
0x0154  LATIN CAPITAL LETTER R WITH ACUTE
  _/_/  @
 |  _ \\ @
 | |_) |@
 |  _ < @
 |_| \\_\\@
        @@
0x0155  LATIN SMALL LETTER R WITH ACUTE
     __@
  _ /_/@
 | '__|@
 | |   @
 |_|   @
       @@
0x0156  LATIN CAPITAL LETTER R WITH CEDILLA
  ____  @
 |  _ \\ @
 | |_) |@
 |  _ < @
 |_| \\_\\@
 )_)    @@
0x0157  LATIN SMALL LETTER R WITH CEDILLA
       @
  _ __ @
 | '__|@
 | |   @
 |_|   @
   )_) @@
0x0158  LATIN CAPITAL LETTER R WITH CARON
  _\\_/  @
 |  _ \\ @
 | |_) |@
 |  _ < @
 |_| \\_\\@
        @@
0x0159  LATIN SMALL LETTER R WITH CARON
  \\\\// @
  _\\/_ @
 | '__|@
 | |   @
 |_|   @
       @@
0x015A  LATIN CAPITAL LETTER S WITH ACUTE
  _/_/  @
 / ___| @
 \\___ \\ @
  ___) |@
 |____/ @
        @@
0x015B  LATIN SMALL LETTER S WITH ACUTE
    __@
  _/_/@
 / __|@
 \\__ \\@
 |___/@
      @@
0x015C  LATIN CAPITAL LETTER S WITH CIRCUMFLEX
  _/\\_  @
 / ___| @
 \\___ \\ @
  ___) |@
 |____/ @
        @@
0x015D  LATIN SMALL LETTER S WITH CIRCUMFLEX
      @
  /_\\_@
 / __|@
 \\__ \\@
 |___/@
      @@
0x015E  LATIN CAPITAL LETTER S WITH CEDILLA
  ____  @
 / ___| @
 \\___ \\ @
  ___) |@
 |____/ @
    )__)@@
0x015F  LATIN SMALL LETTER S WITH CEDILLA
      @
  ___ @
 / __|@
 \\__ \\@
 |___/@
   )_)@@
0x0160  LATIN CAPITAL LETTER S WITH CARON
  _\\_/  @
 / ___| @
 \\___ \\ @
  ___) |@
 |____/ @
        @@
0x0161  LATIN SMALL LETTER S WITH CARON
  \\\\//@
  _\\/ @
 / __|@
 \\__ \\@
 |___/@
      @@
0x0162  LATIN CAPITAL LETTER T WITH CEDILLA
  _____ @
 |_   _|@
   | |  @
   | |  @
   |_|  @
    )__)@@
0x0163  LATIN SMALL LETTER T WITH CEDILLA
  _   @
 | |_ @
 | __|@
 | |_ @
  \\__|@
   )_)@@
0x0164  LATIN CAPITAL LETTER T WITH CARON
  _____ @
 |_   _|@
   | |  @
   | |  @
   |_|  @
        @@
0x0165  LATIN SMALL LETTER T WITH CARON
  \\/  @
 | |_ @
 | __|@
 | |_ @
  \\__|@
      @@
0x0166  LATIN CAPITAL LETTER T WITH STROKE
  _____ @
 |_   _|@
   | |  @
  -|-|- @
   |_|  @
        @@
0x0167  LATIN SMALL LETTER T WITH STROKE
  _   @
 | |_ @
 | __|@
 |-|_ @
  \\__|@
      @@
0x0168  LATIN CAPITAL LETTER U WITH TILDE
        @
  _/\\/_ @
 | | | |@
 | |_| |@
  \\___/ @
        @@
0x0169  LATIN SMALL LETTER U WITH TILDE
        @
  _/\\/_ @
 | | | |@
 | |_| |@
  \\__,_|@
        @@
0x016A  LATIN CAPITAL LETTER U WITH MACRON
   ____ @
  /__ _/@
 | | | |@
 | |_| |@
  \\___/ @
        @@
0x016B  LATIN SMALL LETTER U WITH MACRON
   ____ @
  / _  /@
 | | | |@
 | |_| |@
  \\__,_|@
        @@
0x016C  LATIN CAPITAL LETTER U WITH BREVE
        @
   \\_/_ @
 | | | |@
 | |_| |@
  \\____|@
        @@
0x016D  LATIN SMALL LETTER U WITH BREVE
        @
   \\_/_ @
 | | | |@
 | |_| |@
  \\__,_|@
        @@
0x016E  LATIN CAPITAL LETTER U WITH RING ABOVE
    O   @
  __  _ @
 | | | |@
 | |_| |@
  \\___/ @
        @@
0x016F  LATIN SMALL LETTER U WITH RING ABOVE
    O   @
  __ __ @
 | | | |@
 | |_| |@
  \\__,_|@
        @@
0x0170  LATIN CAPITAL LETTER U WITH DOUBLE ACUTE
   -- --@
  /_//_/@
 | | | |@
 | |_| |@
  \\___/ @
        @@
0x0171  LATIN SMALL LETTER U WITH DOUBLE ACUTE
    ____@
  _/_/_/@
 | | | |@
 | |_| |@
  \\__,_|@
        @@
0x0172  LATIN CAPITAL LETTER U WITH OGONEK
  _   _ @
 | | | |@
 | | | |@
 | |_| |@
  \\___/ @
    (__(@@
0x0173  LATIN SMALL LETTER U WITH OGONEK
        @
  _   _ @
 | | | |@
 | |_| |@
  \\__,_|@
     (_(@@
0x0174  LATIN CAPITAL LETTER W WITH CIRCUMFLEX
 __    /\\  __@
 \\ \\  //\\\\/ /@
  \\ \\ /\\ / / @
   \\ V  V /  @
    \\_/\\_/   @
             @@
0x0175  LATIN SMALL LETTER W WITH CIRCUMFLEX
      /\\   @
 __  //\\\\__@
 \\ \\ /\\ / /@
  \\ V  V / @
   \\_/\\_/  @
           @@
0x0176  LATIN CAPITAL LETTER Y WITH CIRCUMFLEX
    /\\  @
 __//\\\\ @
 \\ \\ / /@
  \\ V / @
   |_|  @
        @@
0x0177  LATIN SMALL LETTER Y WITH CIRCUMFLEX
    /\\  @
   //\\\\ @
 | | | |@
 | |_| |@
  \\__, |@
  |___/ @@
0x0178  LATIN CAPITAL LETTER Y WITH DIAERESIS
  []  []@
 __    _@
 \\ \\ / /@
  \\ V / @
   |_|  @
        @@
0x0179  LATIN CAPITAL LETTER Z WITH ACUTE
  __/_/@
 |__  /@
   / / @
  / /_ @
 /____|@
       @@
0x017A  LATIN SMALL LETTER Z WITH ACUTE
    _ @
  _/_/@
 |_  /@
  / / @
 /___|@
      @@
0x017B  LATIN CAPITAL LETTER Z WITH DOT ABOVE
  __[]_@
 |__  /@
   / / @
  / /_ @
 /____|@
       @@
0x017C  LATIN SMALL LETTER Z WITH DOT ABOVE
   [] @
  ____@
 |_  /@
  / / @
 /___|@
      @@
0x017D  LATIN CAPITAL LETTER Z WITH CARON
  _\\_/_@
 |__  /@
   / / @
  / /_ @
 /____|@
       @@
0x017E  LATIN SMALL LETTER Z WITH CARON
  \\\\//@
  _\\/_@
 |_  /@
  / / @
 /___|@
      @@
0x017F  LATIN SMALL LETTER LONG S
     __ @
    / _|@
 |-| |  @
 |-| |  @
   |_|  @
        @@
0x02C7  CARON
 \\\\//@
  \\/ @
    $@
    $@
    $@
    $@@
0x02D8  BREVE
 \\\\_//@
  \\_/ @
     $@
     $@
     $@
     $@@
0x02D9  DOT ABOVE
 []@
  $@
  $@
  $@
  $@
  $@@
0x02DB  OGONEK
    $@
    $@
    $@
    $@
    $@
 )_) @@
0x02DD  DOUBLE ACUTE ACCENT
  _ _ @
 /_/_/@
     $@
     $@
     $@
     $@@
0xCA0  KANNADA LETTER TTHA
   _____)@
  /_ ___/@
  / _ \\  @
 | (_) | @
 $\\___/$ @
         @@
         `},Symbol.toStringTag,{value:"Module"}))})();
