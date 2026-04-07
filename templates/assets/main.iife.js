(function(){"use strict";var A$=!1,I$=!1,t_=[],l$=-1;function _r(_){$r(_)}function $r(_){t_.includes(_)||t_.push(_),tr()}function er(_){let $=t_.indexOf(_);$!==-1&&$>l$&&t_.splice($,1)}function tr(){!I$&&!A$&&(A$=!0,queueMicrotask(nr))}function nr(){A$=!1,I$=!0;for(let _=0;_<t_.length;_++)t_[_](),l$=_;t_.length=0,l$=-1,I$=!1}var u_,n_,c_,Fe,u$=!0;function rr(_){u$=!1,_(),u$=!0}function ir(_){u_=_.reactive,c_=_.release,n_=$=>_.effect($,{scheduler:e=>{u$?_r(e):e()}}),Fe=_.raw}function Be(_){n_=_}function Tr(_){let $=()=>{};return[t=>{let n=n_(t);return _._x_effects||(_._x_effects=new Set,_._x_runEffects=()=>{_._x_effects.forEach(r=>r())}),_._x_effects.add(n),$=()=>{n!==void 0&&(_._x_effects.delete(n),c_(n))},n},()=>{$()}]}function Ve(_,$){let e=!0,t,n=n_(()=>{let r=_();JSON.stringify(r),e?t=r:queueMicrotask(()=>{$(r,t),t=r}),e=!1});return()=>c_(n)}var ke=[],Ke=[],Xe=[];function ar(_){Xe.push(_)}function c$(_,$){typeof $=="function"?(_._x_cleanups||(_._x_cleanups=[]),_._x_cleanups.push($)):($=_,Ke.push($))}function je(_){ke.push(_)}function Ye(_,$,e){_._x_attributeCleanups||(_._x_attributeCleanups={}),_._x_attributeCleanups[$]||(_._x_attributeCleanups[$]=[]),_._x_attributeCleanups[$].push(e)}function qe(_,$){_._x_attributeCleanups&&Object.entries(_._x_attributeCleanups).forEach(([e,t])=>{($===void 0||$.includes(e))&&(t.forEach(n=>n()),delete _._x_attributeCleanups[e])})}function or(_){for(_._x_effects?.forEach(er);_._x_cleanups?.length;)_._x_cleanups.pop()()}var f$=new MutationObserver(S$),R$=!1;function d$(){f$.observe(document,{subtree:!0,childList:!0,attributes:!0,attributeOldValue:!0}),R$=!0}function ze(){sr(),f$.disconnect(),R$=!1}var O_=[];function sr(){let _=f$.takeRecords();O_.push(()=>_.length>0&&S$(_));let $=O_.length;queueMicrotask(()=>{if(O_.length===$)for(;O_.length>0;)O_.shift()()})}function D(_){if(!R$)return _();ze();let $=_();return d$(),$}var h$=!1,V_=[];function Lr(){h$=!0}function Er(){h$=!1,S$(V_),V_=[]}function S$(_){if(h$){V_=V_.concat(_);return}let $=[],e=new Set,t=new Map,n=new Map;for(let r=0;r<_.length;r++)if(!_[r].target._x_ignoreMutationObserver&&(_[r].type==="childList"&&(_[r].removedNodes.forEach(i=>{i.nodeType===1&&i._x_marker&&e.add(i)}),_[r].addedNodes.forEach(i=>{if(i.nodeType===1){if(e.has(i)){e.delete(i);return}i._x_marker||$.push(i)}})),_[r].type==="attributes")){let i=_[r].target,T=_[r].attributeName,o=_[r].oldValue,E=()=>{t.has(i)||t.set(i,[]),t.get(i).push({name:T,value:i.getAttribute(T)})},I=()=>{n.has(i)||n.set(i,[]),n.get(i).push(T)};i.hasAttribute(T)&&o===null?E():i.hasAttribute(T)?(I(),E()):I()}n.forEach((r,i)=>{qe(i,r)}),t.forEach((r,i)=>{ke.forEach(T=>T(i,r))});for(let r of e)$.some(i=>i.contains(r))||Ke.forEach(i=>i(r));for(let r of $)r.isConnected&&Xe.forEach(i=>i(r));$=null,e=null,t=null,n=null}function Qe(_){return i_(r_(_))}function H_(_,$,e){return _._x_dataStack=[$,...r_(e||_)],()=>{_._x_dataStack=_._x_dataStack.filter(t=>t!==$)}}function r_(_){return _._x_dataStack?_._x_dataStack:typeof ShadowRoot=="function"&&_ instanceof ShadowRoot?r_(_.host):_.parentNode?r_(_.parentNode):[]}function i_(_){return new Proxy({objects:_},Ar)}var Ar={ownKeys({objects:_}){return Array.from(new Set(_.flatMap($=>Object.keys($))))},has({objects:_},$){return $==Symbol.unscopables?!1:_.some(e=>Object.prototype.hasOwnProperty.call(e,$)||Reflect.has(e,$))},get({objects:_},$,e){return $=="toJSON"?Ir:Reflect.get(_.find(t=>Reflect.has(t,$))||{},$,e)},set({objects:_},$,e,t){const n=_.find(i=>Object.prototype.hasOwnProperty.call(i,$))||_[_.length-1],r=Object.getOwnPropertyDescriptor(n,$);return r?.set&&r?.get?r.set.call(t,e)||!0:Reflect.set(n,$,e)}};function Ir(){return Reflect.ownKeys(this).reduce(($,e)=>($[e]=Reflect.get(this,e),$),{})}function N$(_){let $=t=>typeof t=="object"&&!Array.isArray(t)&&t!==null,e=(t,n="")=>{Object.entries(Object.getOwnPropertyDescriptors(t)).forEach(([r,{value:i,enumerable:T}])=>{if(T===!1||i===void 0||typeof i=="object"&&i!==null&&i.__v_skip)return;let o=n===""?r:`${n}.${r}`;typeof i=="object"&&i!==null&&i._x_interceptor?t[r]=i.initialize(_,o,r):$(i)&&i!==t&&!(i instanceof Element)&&e(i,o)})};return e(_)}function Je(_,$=()=>{}){let e={initialValue:void 0,_x_interceptor:!0,initialize(t,n,r){return _(this.initialValue,()=>lr(t,n),i=>C$(t,n,i),n,r)}};return $(e),t=>{if(typeof t=="object"&&t!==null&&t._x_interceptor){let n=e.initialize.bind(e);e.initialize=(r,i,T)=>{let o=t.initialize(r,i,T);return e.initialValue=o,n(r,i,T)}}else e.initialValue=t;return e}}function lr(_,$){return $.split(".").reduce((e,t)=>e[t],_)}function C$(_,$,e){if(typeof $=="string"&&($=$.split(".")),$.length===1)_[$[0]]=e;else{if($.length===0)throw error;return _[$[0]]||(_[$[0]]={}),C$(_[$[0]],$.slice(1),e)}}var Ze={};function K(_,$){Ze[_]=$}function M_(_,$){let e=ur($);return Object.entries(Ze).forEach(([t,n])=>{Object.defineProperty(_,`$${t}`,{get(){return n($,e)},enumerable:!1})}),_}function ur(_){let[$,e]=Tt(_),t={interceptor:Je,...$};return c$(_,e),t}function cr(_,$,e,...t){try{return e(...t)}catch(n){P_(n,_,$)}}function P_(..._){return _t(..._)}var _t=Rr;function fr(_){_t=_}function Rr(_,$,e=void 0){_=Object.assign(_??{message:"No error message given."},{el:$,expression:e}),console.warn(`Alpine Expression Error: ${_.message}

${e?'Expression: "'+e+`"

`:""}`,$),setTimeout(()=>{throw _},0)}var f_=!0;function $t(_){let $=f_;f_=!1;let e=_();return f_=$,e}function T_(_,$,e={}){let t;return U(_,$)(n=>t=n,e),t}function U(..._){return et(..._)}var et=nt;function dr(_){et=_}var tt;function hr(_){tt=_}function nt(_,$){let e={};M_(e,_);let t=[e,...r_(_)],n=typeof $=="function"?Sr(t,$):Cr(t,$,_);return cr.bind(null,_,$,n)}function Sr(_,$){return(e=()=>{},{scope:t={},params:n=[],context:r}={})=>{if(!f_){x_(e,$,i_([t,..._]),n);return}let i=$.apply(i_([t,..._]),n);x_(e,i)}}var p$={};function Nr(_,$){if(p$[_])return p$[_];let e=Object.getPrototypeOf(async function(){}).constructor,t=/^[\n\s]*if.*\(.*\)/.test(_.trim())||/^(let|const)\s/.test(_.trim())?`(async()=>{ ${_} })()`:_,r=(()=>{try{let i=new e(["__self","scope"],`with (scope) { __self.result = ${t} }; __self.finished = true; return __self.result;`);return Object.defineProperty(i,"name",{value:`[Alpine] ${_}`}),i}catch(i){return P_(i,$,_),Promise.resolve()}})();return p$[_]=r,r}function Cr(_,$,e){let t=Nr($,e);return(n=()=>{},{scope:r={},params:i=[],context:T}={})=>{t.result=void 0,t.finished=!1;let o=i_([r,..._]);if(typeof t=="function"){let E=t.call(T,t,o).catch(I=>P_(I,e,$));t.finished?(x_(n,t.result,o,i,e),t.result=void 0):E.then(I=>{x_(n,I,o,i,e)}).catch(I=>P_(I,e,$)).finally(()=>t.result=void 0)}}}function x_(_,$,e,t,n){if(f_&&typeof $=="function"){let r=$.apply(e,t);r instanceof Promise?r.then(i=>x_(_,i,e,t)).catch(i=>P_(i,n,$)):_(r)}else typeof $=="object"&&$ instanceof Promise?$.then(r=>_(r)):_($)}function pr(..._){return tt(..._)}function gr(_,$,e={}){let t={};M_(t,_);let n=[t,...r_(_)],r=i_([e.scope??{},...n]),i=e.params??[];if($.includes("await")){let T=Object.getPrototypeOf(async function(){}).constructor,o=/^[\n\s]*if.*\(.*\)/.test($.trim())||/^(let|const)\s/.test($.trim())?`(async()=>{ ${$} })()`:$;return new T(["scope"],`with (scope) { let __result = ${o}; return __result }`).call(e.context,r)}else{let T=/^[\n\s]*if.*\(.*\)/.test($.trim())||/^(let|const)\s/.test($.trim())?`(()=>{ ${$} })()`:$,E=new Function(["scope"],`with (scope) { let __result = ${T}; return __result }`).call(e.context,r);return typeof E=="function"&&f_?E.apply(r,i):E}}var g$="x-";function R_(_=""){return g$+_}function mr(_){g$=_}var k_={};function b(_,$){return k_[_]=$,{before(e){if(!k_[e]){console.warn(String.raw`Cannot find directive \`${e}\`. \`${_}\` will use the default order of execution`);return}const t=a_.indexOf(e);a_.splice(t>=0?t:a_.indexOf("DEFAULT"),0,_)}}}function Or(_){return Object.keys(k_).includes(_)}function m$(_,$,e){if($=Array.from($),_._x_virtualDirectives){let r=Object.entries(_._x_virtualDirectives).map(([T,o])=>({name:T,value:o})),i=rt(r);r=r.map(T=>i.find(o=>o.name===T.name)?{name:`x-bind:${T.name}`,value:`"${T.value}"`}:T),$=$.concat(r)}let t={};return $.map(st((r,i)=>t[r]=i)).filter(Et).map(Pr(t,e)).sort(xr).map(r=>Mr(_,r))}function rt(_){return Array.from(_).map(st()).filter($=>!Et($))}var O$=!1,y_=new Map,it=Symbol();function Hr(_){O$=!0;let $=Symbol();it=$,y_.set($,[]);let e=()=>{for(;y_.get($).length;)y_.get($).shift()();y_.delete($)},t=()=>{O$=!1,e()};_(e),t()}function Tt(_){let $=[],e=T=>$.push(T),[t,n]=Tr(_);return $.push(n),[{Alpine:h_,effect:t,cleanup:e,evaluateLater:U.bind(U,_),evaluate:T_.bind(T_,_)},()=>$.forEach(T=>T())]}function Mr(_,$){let e=()=>{},t=k_[$.type]||e,[n,r]=Tt(_);Ye(_,$.original,r);let i=()=>{_._x_ignore||_._x_ignoreSelf||(t.inline&&t.inline(_,$,n),t=t.bind(t,_,$,n),O$?y_.get(it).push(t):t())};return i.runCleanups=r,i}var at=(_,$)=>({name:e,value:t})=>(e.startsWith(_)&&(e=e.replace(_,$)),{name:e,value:t}),ot=_=>_;function st(_=()=>{}){return({name:$,value:e})=>{let{name:t,value:n}=Lt.reduce((r,i)=>i(r),{name:$,value:e});return t!==$&&_(t,$),{name:t,value:n}}}var Lt=[];function H$(_){Lt.push(_)}function Et({name:_}){return At().test(_)}var At=()=>new RegExp(`^${g$}([^:^.]+)\\b`);function Pr(_,$){return({name:e,value:t})=>{e===t&&(t="");let n=e.match(At()),r=e.match(/:([a-zA-Z0-9\-_:]+)/),i=e.match(/\.[^.\]]+(?=[^\]]*$)/g)||[],T=$||_[e]||e;return{type:n?n[1]:null,value:r?r[1]:null,modifiers:i.map(o=>o.replace(".","")),expression:t,original:T}}}var M$="DEFAULT",a_=["ignore","ref","data","id","anchor","bind","init","for","model","modelable","transition","show","if",M$,"teleport"];function xr(_,$){let e=a_.indexOf(_.type)===-1?M$:_.type,t=a_.indexOf($.type)===-1?M$:$.type;return a_.indexOf(e)-a_.indexOf(t)}function W_(_,$,e={}){_.dispatchEvent(new CustomEvent($,{detail:e,bubbles:!0,composed:!0,cancelable:!0}))}function o_(_,$){if(typeof ShadowRoot=="function"&&_ instanceof ShadowRoot){Array.from(_.children).forEach(n=>o_(n,$));return}let e=!1;if($(_,()=>e=!0),e)return;let t=_.firstElementChild;for(;t;)o_(t,$),t=t.nextElementSibling}function V(_,...$){console.warn(`Alpine Warning: ${_}`,...$)}var It=!1;function yr(){It&&V("Alpine has already been initialized on this page. Calling Alpine.start() more than once can cause problems."),It=!0,document.body||V("Unable to initialize. Trying to load Alpine before `<body>` is available. Did you forget to add `defer` in Alpine's `<script>` tag?"),W_(document,"alpine:init"),W_(document,"alpine:initializing"),d$(),ar($=>z($,o_)),c$($=>d_($)),je(($,e)=>{m$($,e).forEach(t=>t())});let _=$=>!K_($.parentElement,!0);Array.from(document.querySelectorAll(ct().join(","))).filter(_).forEach($=>{z($)}),W_(document,"alpine:initialized"),setTimeout(()=>{br()})}var P$=[],lt=[];function ut(){return P$.map(_=>_())}function ct(){return P$.concat(lt).map(_=>_())}function ft(_){P$.push(_)}function Rt(_){lt.push(_)}function K_(_,$=!1){return s_(_,e=>{if(($?ct():ut()).some(n=>e.matches(n)))return!0})}function s_(_,$){if(_){if($(_))return _;if(_._x_teleportBack&&(_=_._x_teleportBack),_.parentNode instanceof ShadowRoot)return s_(_.parentNode.host,$);if(_.parentElement)return s_(_.parentElement,$)}}function Wr(_){return ut().some($=>_.matches($))}var dt=[];function Dr(_){dt.push(_)}var vr=1;function z(_,$=o_,e=()=>{}){s_(_,t=>t._x_ignore)||Hr(()=>{$(_,(t,n)=>{t._x_marker||(e(t,n),dt.forEach(r=>r(t,n)),m$(t,t.attributes).forEach(r=>r()),t._x_ignore||(t._x_marker=vr++),t._x_ignore&&n())})})}function d_(_,$=o_){$(_,e=>{or(e),qe(e),delete e._x_marker})}function br(){[["ui","dialog",["[x-dialog], [x-popover]"]],["anchor","anchor",["[x-anchor]"]],["sort","sort",["[x-sort]"]]].forEach(([$,e,t])=>{Or(e)||t.some(n=>{if(document.querySelector(n))return V(`found "${n}", but missing ${$} plugin`),!0})})}var x$=[],y$=!1;function W$(_=()=>{}){return queueMicrotask(()=>{y$||setTimeout(()=>{D$()})}),new Promise($=>{x$.push(()=>{_(),$()})})}function D$(){for(y$=!1;x$.length;)x$.shift()()}function wr(){y$=!0}function v$(_,$){return Array.isArray($)?ht(_,$.join(" ")):typeof $=="object"&&$!==null?Ur(_,$):typeof $=="function"?v$(_,$()):ht(_,$)}function ht(_,$){let e=n=>n.split(" ").filter(r=>!_.classList.contains(r)).filter(Boolean),t=n=>(_.classList.add(...n),()=>{_.classList.remove(...n)});return $=$===!0?$="":$||"",t(e($))}function Ur(_,$){let e=T=>T.split(" ").filter(Boolean),t=Object.entries($).flatMap(([T,o])=>o?e(T):!1).filter(Boolean),n=Object.entries($).flatMap(([T,o])=>o?!1:e(T)).filter(Boolean),r=[],i=[];return n.forEach(T=>{_.classList.contains(T)&&(_.classList.remove(T),i.push(T))}),t.forEach(T=>{_.classList.contains(T)||(_.classList.add(T),r.push(T))}),()=>{i.forEach(T=>_.classList.add(T)),r.forEach(T=>_.classList.remove(T))}}function X_(_,$){return typeof $=="object"&&$!==null?Gr(_,$):Fr(_,$)}function Gr(_,$){let e={};return Object.entries($).forEach(([t,n])=>{e[t]=_.style[t],t.startsWith("--")||(t=Br(t)),_.style.setProperty(t,n)}),setTimeout(()=>{_.style.length===0&&_.removeAttribute("style")}),()=>{X_(_,e)}}function Fr(_,$){let e=_.getAttribute("style",$);return _.setAttribute("style",$),()=>{_.setAttribute("style",e||"")}}function Br(_){return _.replace(/([a-z])([A-Z])/g,"$1-$2").toLowerCase()}function b$(_,$=()=>{}){let e=!1;return function(){e?$.apply(this,arguments):(e=!0,_.apply(this,arguments))}}b("transition",(_,{value:$,modifiers:e,expression:t},{evaluate:n})=>{typeof t=="function"&&(t=n(t)),t!==!1&&(!t||typeof t=="boolean"?kr(_,e,$):Vr(_,t,$))});function Vr(_,$,e){St(_,v$,""),{enter:n=>{_._x_transition.enter.during=n},"enter-start":n=>{_._x_transition.enter.start=n},"enter-end":n=>{_._x_transition.enter.end=n},leave:n=>{_._x_transition.leave.during=n},"leave-start":n=>{_._x_transition.leave.start=n},"leave-end":n=>{_._x_transition.leave.end=n}}[e]($)}function kr(_,$,e){St(_,X_);let t=!$.includes("in")&&!$.includes("out")&&!e,n=t||$.includes("in")||["enter"].includes(e),r=t||$.includes("out")||["leave"].includes(e);$.includes("in")&&!t&&($=$.filter((M,y)=>y<$.indexOf("out"))),$.includes("out")&&!t&&($=$.filter((M,y)=>y>$.indexOf("out")));let i=!$.includes("opacity")&&!$.includes("scale"),T=i||$.includes("opacity"),o=i||$.includes("scale"),E=T?0:1,I=o?D_($,"scale",95)/100:1,R=D_($,"delay",0)/1e3,u=D_($,"origin","center"),p="opacity, transform",C=D_($,"duration",150)/1e3,S=D_($,"duration",75)/1e3,d="cubic-bezier(0.4, 0.0, 0.2, 1)";n&&(_._x_transition.enter.during={transformOrigin:u,transitionDelay:`${R}s`,transitionProperty:p,transitionDuration:`${C}s`,transitionTimingFunction:d},_._x_transition.enter.start={opacity:E,transform:`scale(${I})`},_._x_transition.enter.end={opacity:1,transform:"scale(1)"}),r&&(_._x_transition.leave.during={transformOrigin:u,transitionDelay:`${R}s`,transitionProperty:p,transitionDuration:`${S}s`,transitionTimingFunction:d},_._x_transition.leave.start={opacity:1,transform:"scale(1)"},_._x_transition.leave.end={opacity:E,transform:`scale(${I})`})}function St(_,$,e={}){_._x_transition||(_._x_transition={enter:{during:e,start:e,end:e},leave:{during:e,start:e,end:e},in(t=()=>{},n=()=>{}){w$(_,$,{during:this.enter.during,start:this.enter.start,end:this.enter.end},t,n)},out(t=()=>{},n=()=>{}){w$(_,$,{during:this.leave.during,start:this.leave.start,end:this.leave.end},t,n)}})}window.Element.prototype._x_toggleAndCascadeWithTransitions=function(_,$,e,t){const n=document.visibilityState==="visible"?requestAnimationFrame:setTimeout;let r=()=>n(e);if($){_._x_transition&&(_._x_transition.enter||_._x_transition.leave)?_._x_transition.enter&&(Object.entries(_._x_transition.enter.during).length||Object.entries(_._x_transition.enter.start).length||Object.entries(_._x_transition.enter.end).length)?_._x_transition.in(e):r():_._x_transition?_._x_transition.in(e):r();return}_._x_hidePromise=_._x_transition?new Promise((i,T)=>{_._x_transition.out(()=>{},()=>i(t)),_._x_transitioning&&_._x_transitioning.beforeCancel(()=>T({isFromCancelledTransition:!0}))}):Promise.resolve(t),queueMicrotask(()=>{let i=Nt(_);i?(i._x_hideChildren||(i._x_hideChildren=[]),i._x_hideChildren.push(_)):n(()=>{let T=o=>{let E=Promise.all([o._x_hidePromise,...(o._x_hideChildren||[]).map(T)]).then(([I])=>I?.());return delete o._x_hidePromise,delete o._x_hideChildren,E};T(_).catch(o=>{if(!o.isFromCancelledTransition)throw o})})})};function Nt(_){let $=_.parentNode;if($)return $._x_hidePromise?$:Nt($)}function w$(_,$,{during:e,start:t,end:n}={},r=()=>{},i=()=>{}){if(_._x_transitioning&&_._x_transitioning.cancel(),Object.keys(e).length===0&&Object.keys(t).length===0&&Object.keys(n).length===0){r(),i();return}let T,o,E;Kr(_,{start(){T=$(_,t)},during(){o=$(_,e)},before:r,end(){T(),E=$(_,n)},after:i,cleanup(){o(),E()}})}function Kr(_,$){let e,t,n,r=b$(()=>{D(()=>{e=!0,t||$.before(),n||($.end(),D$()),$.after(),_.isConnected&&$.cleanup(),delete _._x_transitioning})});_._x_transitioning={beforeCancels:[],beforeCancel(i){this.beforeCancels.push(i)},cancel:b$(function(){for(;this.beforeCancels.length;)this.beforeCancels.shift()();r()}),finish:r},D(()=>{$.start(),$.during()}),wr(),requestAnimationFrame(()=>{if(e)return;let i=Number(getComputedStyle(_).transitionDuration.replace(/,.*/,"").replace("s",""))*1e3,T=Number(getComputedStyle(_).transitionDelay.replace(/,.*/,"").replace("s",""))*1e3;i===0&&(i=Number(getComputedStyle(_).animationDuration.replace("s",""))*1e3),D(()=>{$.before()}),t=!0,requestAnimationFrame(()=>{e||(D(()=>{$.end()}),D$(),setTimeout(_._x_transitioning.finish,i+T),n=!0)})})}function D_(_,$,e){if(_.indexOf($)===-1)return e;const t=_[_.indexOf($)+1];if(!t||$==="scale"&&isNaN(t))return e;if($==="duration"||$==="delay"){let n=t.match(/([0-9]+)ms/);if(n)return n[1]}return $==="origin"&&["top","right","left","center","bottom"].includes(_[_.indexOf($)+2])?[t,_[_.indexOf($)+2]].join(" "):t}var Q=!1;function J(_,$=()=>{}){return(...e)=>Q?$(...e):_(...e)}function Xr(_){return(...$)=>Q&&_(...$)}var Ct=[];function j_(_){Ct.push(_)}function jr(_,$){Ct.forEach(e=>e(_,$)),Q=!0,pt(()=>{z($,(e,t)=>{t(e,()=>{})})}),Q=!1}var U$=!1;function Yr(_,$){$._x_dataStack||($._x_dataStack=_._x_dataStack),Q=!0,U$=!0,pt(()=>{qr($)}),Q=!1,U$=!1}function qr(_){let $=!1;z(_,(t,n)=>{o_(t,(r,i)=>{if($&&Wr(r))return i();$=!0,n(r,i)})})}function pt(_){let $=n_;Be((e,t)=>{let n=$(e);return c_(n),()=>{}}),_(),Be($)}function gt(_,$,e,t=[]){switch(_._x_bindings||(_._x_bindings=u_({})),_._x_bindings[$]=e,$=t.includes("camel")?ti($):$,$){case"value":zr(_,e);break;case"style":Jr(_,e);break;case"class":Qr(_,e);break;case"selected":case"checked":Zr(_,$,e);break;default:mt(_,$,e);break}}function zr(_,$){if(Pt(_))_.attributes.value===void 0&&(_.value=$),window.fromModel&&(typeof $=="boolean"?_.checked=Y_(_.value)===$:_.checked=Ot(_.value,$));else if(G$(_))Number.isInteger($)?_.value=$:!Array.isArray($)&&typeof $!="boolean"&&![null,void 0].includes($)?_.value=String($):Array.isArray($)?_.checked=$.some(e=>Ot(e,_.value)):_.checked=!!$;else if(_.tagName==="SELECT")ei(_,$);else{if(_.value===$)return;_.value=$===void 0?"":$}}function Qr(_,$){_._x_undoAddedClasses&&_._x_undoAddedClasses(),_._x_undoAddedClasses=v$(_,$)}function Jr(_,$){_._x_undoAddedStyles&&_._x_undoAddedStyles(),_._x_undoAddedStyles=X_(_,$)}function Zr(_,$,e){mt(_,$,e),$i(_,$,e)}function mt(_,$,e){[null,void 0,!1].includes(e)&&ri($)?_.removeAttribute($):(Ht($)&&(e=$),_i(_,$,e))}function _i(_,$,e){_.getAttribute($)!=e&&_.setAttribute($,e)}function $i(_,$,e){_[$]!==e&&(_[$]=e)}function ei(_,$){const e=[].concat($).map(t=>t+"");Array.from(_.options).forEach(t=>{t.selected=e.includes(t.value)})}function ti(_){return _.toLowerCase().replace(/-(\w)/g,($,e)=>e.toUpperCase())}function Ot(_,$){return _==$}function Y_(_){return[1,"1","true","on","yes",!0].includes(_)?!0:[0,"0","false","off","no",!1].includes(_)?!1:_?!!_:null}var ni=new Set(["allowfullscreen","async","autofocus","autoplay","checked","controls","default","defer","disabled","formnovalidate","inert","ismap","itemscope","loop","multiple","muted","nomodule","novalidate","open","playsinline","readonly","required","reversed","selected","shadowrootclonable","shadowrootdelegatesfocus","shadowrootserializable"]);function Ht(_){return ni.has(_)}function ri(_){return!["aria-pressed","aria-checked","aria-expanded","aria-selected"].includes(_)}function ii(_,$,e){return _._x_bindings&&_._x_bindings[$]!==void 0?_._x_bindings[$]:Mt(_,$,e)}function Ti(_,$,e,t=!0){if(_._x_bindings&&_._x_bindings[$]!==void 0)return _._x_bindings[$];if(_._x_inlineBindings&&_._x_inlineBindings[$]!==void 0){let n=_._x_inlineBindings[$];return n.extract=t,$t(()=>T_(_,n.expression))}return Mt(_,$,e)}function Mt(_,$,e){let t=_.getAttribute($);return t===null?typeof e=="function"?e():e:t===""?!0:Ht($)?!![$,"true"].includes(t):t}function G$(_){return _.type==="checkbox"||_.localName==="ui-checkbox"||_.localName==="ui-switch"}function Pt(_){return _.type==="radio"||_.localName==="ui-radio"}function xt(_,$){let e;return function(){const t=this,n=arguments,r=function(){e=null,_.apply(t,n)};clearTimeout(e),e=setTimeout(r,$)}}function yt(_,$){let e;return function(){let t=this,n=arguments;e||(_.apply(t,n),e=!0,setTimeout(()=>e=!1,$))}}function Wt({get:_,set:$},{get:e,set:t}){let n=!0,r,i=n_(()=>{let T=_(),o=e();if(n)t(F$(T)),n=!1;else{let E=JSON.stringify(T),I=JSON.stringify(o);E!==r?t(F$(T)):E!==I&&$(F$(o))}r=JSON.stringify(_()),JSON.stringify(e())});return()=>{c_(i)}}function F$(_){return typeof _=="object"?JSON.parse(JSON.stringify(_)):_}function ai(_){(Array.isArray(_)?_:[_]).forEach(e=>e(h_))}var L_={},Dt=!1;function oi(_,$){if(Dt||(L_=u_(L_),Dt=!0),$===void 0)return L_[_];L_[_]=$,N$(L_[_]),typeof $=="object"&&$!==null&&$.hasOwnProperty("init")&&typeof $.init=="function"&&L_[_].init()}function si(){return L_}var vt={};function Li(_,$){let e=typeof $!="function"?()=>$:$;return _ instanceof Element?bt(_,e()):(vt[_]=e,()=>{})}function Ei(_){return Object.entries(vt).forEach(([$,e])=>{Object.defineProperty(_,$,{get(){return(...t)=>e(...t)}})}),_}function bt(_,$,e){let t=[];for(;t.length;)t.pop()();let n=Object.entries($).map(([i,T])=>({name:i,value:T})),r=rt(n);return n=n.map(i=>r.find(T=>T.name===i.name)?{name:`x-bind:${i.name}`,value:`"${i.value}"`}:i),m$(_,n,e).map(i=>{t.push(i.runCleanups),i()}),()=>{for(;t.length;)t.pop()()}}var wt={};function Ai(_,$){wt[_]=$}function Ii(_,$){return Object.entries(wt).forEach(([e,t])=>{Object.defineProperty(_,e,{get(){return(...n)=>t.bind($)(...n)},enumerable:!1})}),_}var li={get reactive(){return u_},get release(){return c_},get effect(){return n_},get raw(){return Fe},version:"3.15.4",flushAndStopDeferringMutations:Er,dontAutoEvaluateFunctions:$t,disableEffectScheduling:rr,startObservingMutations:d$,stopObservingMutations:ze,setReactivityEngine:ir,onAttributeRemoved:Ye,onAttributesAdded:je,closestDataStack:r_,skipDuringClone:J,onlyDuringClone:Xr,addRootSelector:ft,addInitSelector:Rt,setErrorHandler:fr,interceptClone:j_,addScopeToNode:H_,deferMutations:Lr,mapAttributes:H$,evaluateLater:U,interceptInit:Dr,initInterceptors:N$,injectMagics:M_,setEvaluator:dr,setRawEvaluator:hr,mergeProxies:i_,extractProp:Ti,findClosest:s_,onElRemoved:c$,closestRoot:K_,destroyTree:d_,interceptor:Je,transition:w$,setStyles:X_,mutateDom:D,directive:b,entangle:Wt,throttle:yt,debounce:xt,evaluate:T_,evaluateRaw:pr,initTree:z,nextTick:W$,prefixed:R_,prefix:mr,plugin:ai,magic:K,store:oi,start:yr,clone:Yr,cloneNode:jr,bound:ii,$data:Qe,watch:Ve,walk:o_,data:Ai,bind:Li},h_=li;function ui(_,$){const e=Object.create(null),t=_.split(",");for(let n=0;n<t.length;n++)e[t[n]]=!0;return n=>!!e[n]}var ci=Object.freeze({}),fi=Object.prototype.hasOwnProperty,q_=(_,$)=>fi.call(_,$),E_=Array.isArray,v_=_=>Ut(_)==="[object Map]",Ri=_=>typeof _=="string",B$=_=>typeof _=="symbol",z_=_=>_!==null&&typeof _=="object",di=Object.prototype.toString,Ut=_=>di.call(_),Gt=_=>Ut(_).slice(8,-1),V$=_=>Ri(_)&&_!=="NaN"&&_[0]!=="-"&&""+parseInt(_,10)===_,hi=_=>{const $=Object.create(null);return e=>$[e]||($[e]=_(e))},Si=hi(_=>_.charAt(0).toUpperCase()+_.slice(1)),Ft=(_,$)=>_!==$&&(_===_||$===$),k$=new WeakMap,b_=[],q,A_=Symbol("iterate"),K$=Symbol("Map key iterate");function Ni(_){return _&&_._isEffect===!0}function Ci(_,$=ci){Ni(_)&&(_=_.raw);const e=mi(_,$);return $.lazy||e(),e}function pi(_){_.active&&(Bt(_),_.options.onStop&&_.options.onStop(),_.active=!1)}var gi=0;function mi(_,$){const e=function(){if(!e.active)return _();if(!b_.includes(e)){Bt(e);try{return Hi(),b_.push(e),q=e,_()}finally{b_.pop(),Vt(),q=b_[b_.length-1]}}};return e.id=gi++,e.allowRecurse=!!$.allowRecurse,e._isEffect=!0,e.active=!0,e.raw=_,e.deps=[],e.options=$,e}function Bt(_){const{deps:$}=_;if($.length){for(let e=0;e<$.length;e++)$[e].delete(_);$.length=0}}var S_=!0,X$=[];function Oi(){X$.push(S_),S_=!1}function Hi(){X$.push(S_),S_=!0}function Vt(){const _=X$.pop();S_=_===void 0?!0:_}function X(_,$,e){if(!S_||q===void 0)return;let t=k$.get(_);t||k$.set(_,t=new Map);let n=t.get(e);n||t.set(e,n=new Set),n.has(q)||(n.add(q),q.deps.push(n),q.options.onTrack&&q.options.onTrack({effect:q,target:_,type:$,key:e}))}function Z(_,$,e,t,n,r){const i=k$.get(_);if(!i)return;const T=new Set,o=I=>{I&&I.forEach(R=>{(R!==q||R.allowRecurse)&&T.add(R)})};if($==="clear")i.forEach(o);else if(e==="length"&&E_(_))i.forEach((I,R)=>{(R==="length"||R>=t)&&o(I)});else switch(e!==void 0&&o(i.get(e)),$){case"add":E_(_)?V$(e)&&o(i.get("length")):(o(i.get(A_)),v_(_)&&o(i.get(K$)));break;case"delete":E_(_)||(o(i.get(A_)),v_(_)&&o(i.get(K$)));break;case"set":v_(_)&&o(i.get(A_));break}const E=I=>{I.options.onTrigger&&I.options.onTrigger({effect:I,target:_,key:e,type:$,newValue:t,oldValue:n,oldTarget:r}),I.options.scheduler?I.options.scheduler(I):I()};T.forEach(E)}var Mi=ui("__proto__,__v_isRef,__isVue"),kt=new Set(Object.getOwnPropertyNames(Symbol).map(_=>Symbol[_]).filter(B$)),Pi=Xt(),xi=Xt(!0),Kt=yi();function yi(){const _={};return["includes","indexOf","lastIndexOf"].forEach($=>{_[$]=function(...e){const t=W(this);for(let r=0,i=this.length;r<i;r++)X(t,"get",r+"");const n=t[$](...e);return n===-1||n===!1?t[$](...e.map(W)):n}}),["push","pop","shift","unshift","splice"].forEach($=>{_[$]=function(...e){Oi();const t=W(this)[$].apply(this,e);return Vt(),t}}),_}function Xt(_=!1,$=!1){return function(t,n,r){if(n==="__v_isReactive")return!_;if(n==="__v_isReadonly")return _;if(n==="__v_raw"&&r===(_?$?ji:_n:$?Xi:Zt).get(t))return t;const i=E_(t);if(!_&&i&&q_(Kt,n))return Reflect.get(Kt,n,r);const T=Reflect.get(t,n,r);return(B$(n)?kt.has(n):Mi(n))||(_||X(t,"get",n),$)?T:Q$(T)?!i||!V$(n)?T.value:T:z_(T)?_?$n(T):z$(T):T}}var Wi=Di();function Di(_=!1){return function(e,t,n,r){let i=e[t];if(!_&&(n=W(n),i=W(i),!E_(e)&&Q$(i)&&!Q$(n)))return i.value=n,!0;const T=E_(e)&&V$(t)?Number(t)<e.length:q_(e,t),o=Reflect.set(e,t,n,r);return e===W(r)&&(T?Ft(n,i)&&Z(e,"set",t,n,i):Z(e,"add",t,n)),o}}function vi(_,$){const e=q_(_,$),t=_[$],n=Reflect.deleteProperty(_,$);return n&&e&&Z(_,"delete",$,void 0,t),n}function bi(_,$){const e=Reflect.has(_,$);return(!B$($)||!kt.has($))&&X(_,"has",$),e}function wi(_){return X(_,"iterate",E_(_)?"length":A_),Reflect.ownKeys(_)}var Ui={get:Pi,set:Wi,deleteProperty:vi,has:bi,ownKeys:wi},Gi={get:xi,set(_,$){return console.warn(`Set operation on key "${String($)}" failed: target is readonly.`,_),!0},deleteProperty(_,$){return console.warn(`Delete operation on key "${String($)}" failed: target is readonly.`,_),!0}},j$=_=>z_(_)?z$(_):_,Y$=_=>z_(_)?$n(_):_,q$=_=>_,Q_=_=>Reflect.getPrototypeOf(_);function J_(_,$,e=!1,t=!1){_=_.__v_raw;const n=W(_),r=W($);$!==r&&!e&&X(n,"get",$),!e&&X(n,"get",r);const{has:i}=Q_(n),T=t?q$:e?Y$:j$;if(i.call(n,$))return T(_.get($));if(i.call(n,r))return T(_.get(r));_!==n&&_.get($)}function Z_(_,$=!1){const e=this.__v_raw,t=W(e),n=W(_);return _!==n&&!$&&X(t,"has",_),!$&&X(t,"has",n),_===n?e.has(_):e.has(_)||e.has(n)}function _$(_,$=!1){return _=_.__v_raw,!$&&X(W(_),"iterate",A_),Reflect.get(_,"size",_)}function jt(_){_=W(_);const $=W(this);return Q_($).has.call($,_)||($.add(_),Z($,"add",_,_)),this}function Yt(_,$){$=W($);const e=W(this),{has:t,get:n}=Q_(e);let r=t.call(e,_);r?Jt(e,t,_):(_=W(_),r=t.call(e,_));const i=n.call(e,_);return e.set(_,$),r?Ft($,i)&&Z(e,"set",_,$,i):Z(e,"add",_,$),this}function qt(_){const $=W(this),{has:e,get:t}=Q_($);let n=e.call($,_);n?Jt($,e,_):(_=W(_),n=e.call($,_));const r=t?t.call($,_):void 0,i=$.delete(_);return n&&Z($,"delete",_,void 0,r),i}function zt(){const _=W(this),$=_.size!==0,e=v_(_)?new Map(_):new Set(_),t=_.clear();return $&&Z(_,"clear",void 0,void 0,e),t}function $$(_,$){return function(t,n){const r=this,i=r.__v_raw,T=W(i),o=$?q$:_?Y$:j$;return!_&&X(T,"iterate",A_),i.forEach((E,I)=>t.call(n,o(E),o(I),r))}}function e$(_,$,e){return function(...t){const n=this.__v_raw,r=W(n),i=v_(r),T=_==="entries"||_===Symbol.iterator&&i,o=_==="keys"&&i,E=n[_](...t),I=e?q$:$?Y$:j$;return!$&&X(r,"iterate",o?K$:A_),{next(){const{value:R,done:u}=E.next();return u?{value:R,done:u}:{value:T?[I(R[0]),I(R[1])]:I(R),done:u}},[Symbol.iterator](){return this}}}}function __(_){return function(...$){{const e=$[0]?`on key "${$[0]}" `:"";console.warn(`${Si(_)} operation ${e}failed: target is readonly.`,W(this))}return _==="delete"?!1:this}}function Fi(){const _={get(r){return J_(this,r)},get size(){return _$(this)},has:Z_,add:jt,set:Yt,delete:qt,clear:zt,forEach:$$(!1,!1)},$={get(r){return J_(this,r,!1,!0)},get size(){return _$(this)},has:Z_,add:jt,set:Yt,delete:qt,clear:zt,forEach:$$(!1,!0)},e={get(r){return J_(this,r,!0)},get size(){return _$(this,!0)},has(r){return Z_.call(this,r,!0)},add:__("add"),set:__("set"),delete:__("delete"),clear:__("clear"),forEach:$$(!0,!1)},t={get(r){return J_(this,r,!0,!0)},get size(){return _$(this,!0)},has(r){return Z_.call(this,r,!0)},add:__("add"),set:__("set"),delete:__("delete"),clear:__("clear"),forEach:$$(!0,!0)};return["keys","values","entries",Symbol.iterator].forEach(r=>{_[r]=e$(r,!1,!1),e[r]=e$(r,!0,!1),$[r]=e$(r,!1,!0),t[r]=e$(r,!0,!0)}),[_,e,$,t]}var[Bi,Vi]=Fi();function Qt(_,$){const e=_?Vi:Bi;return(t,n,r)=>n==="__v_isReactive"?!_:n==="__v_isReadonly"?_:n==="__v_raw"?t:Reflect.get(q_(e,n)&&n in t?e:t,n,r)}var ki={get:Qt(!1)},Ki={get:Qt(!0)};function Jt(_,$,e){const t=W(e);if(t!==e&&$.call(_,t)){const n=Gt(_);console.warn(`Reactive ${n} contains both the raw and reactive versions of the same object${n==="Map"?" as keys":""}, which can lead to inconsistencies. Avoid differentiating between the raw and reactive versions of an object and only use the reactive version if possible.`)}}var Zt=new WeakMap,Xi=new WeakMap,_n=new WeakMap,ji=new WeakMap;function Yi(_){switch(_){case"Object":case"Array":return 1;case"Map":case"Set":case"WeakMap":case"WeakSet":return 2;default:return 0}}function qi(_){return _.__v_skip||!Object.isExtensible(_)?0:Yi(Gt(_))}function z$(_){return _&&_.__v_isReadonly?_:en(_,!1,Ui,ki,Zt)}function $n(_){return en(_,!0,Gi,Ki,_n)}function en(_,$,e,t,n){if(!z_(_))return console.warn(`value cannot be made reactive: ${String(_)}`),_;if(_.__v_raw&&!($&&_.__v_isReactive))return _;const r=n.get(_);if(r)return r;const i=qi(_);if(i===0)return _;const T=new Proxy(_,i===2?t:e);return n.set(_,T),T}function W(_){return _&&W(_.__v_raw)||_}function Q$(_){return!!(_&&_.__v_isRef===!0)}K("nextTick",()=>W$),K("dispatch",_=>W_.bind(W_,_)),K("watch",(_,{evaluateLater:$,cleanup:e})=>(t,n)=>{let r=$(t),T=Ve(()=>{let o;return r(E=>o=E),o},n);e(T)}),K("store",si),K("data",_=>Qe(_)),K("root",_=>K_(_)),K("refs",_=>(_._x_refs_proxy||(_._x_refs_proxy=i_(zi(_))),_._x_refs_proxy));function zi(_){let $=[];return s_(_,e=>{e._x_refs&&$.push(e._x_refs)}),$}var J$={};function tn(_){return J$[_]||(J$[_]=0),++J$[_]}function Qi(_,$){return s_(_,e=>{if(e._x_ids&&e._x_ids[$])return!0})}function Ji(_,$){_._x_ids||(_._x_ids={}),_._x_ids[$]||(_._x_ids[$]=tn($))}K("id",(_,{cleanup:$})=>(e,t=null)=>{let n=`${e}${t?`-${t}`:""}`;return Zi(_,n,$,()=>{let r=Qi(_,e),i=r?r._x_ids[e]:tn(e);return t?`${e}-${i}-${t}`:`${e}-${i}`})}),j_((_,$)=>{_._x_id&&($._x_id=_._x_id)});function Zi(_,$,e,t){if(_._x_id||(_._x_id={}),_._x_id[$])return _._x_id[$];let n=t();return _._x_id[$]=n,e(()=>{delete _._x_id[$]}),n}K("el",_=>_),nn("Focus","focus","focus"),nn("Persist","persist","persist");function nn(_,$,e){K($,t=>V(`You can't use [$${$}] without first installing the "${_}" plugin here: https://alpinejs.dev/plugins/${e}`,t))}b("modelable",(_,{expression:$},{effect:e,evaluateLater:t,cleanup:n})=>{let r=t($),i=()=>{let I;return r(R=>I=R),I},T=t(`${$} = __placeholder`),o=I=>T(()=>{},{scope:{__placeholder:I}}),E=i();o(E),queueMicrotask(()=>{if(!_._x_model)return;_._x_removeModelListeners.default();let I=_._x_model.get,R=_._x_model.set,u=Wt({get(){return I()},set(p){R(p)}},{get(){return i()},set(p){o(p)}});n(u)})}),b("teleport",(_,{modifiers:$,expression:e},{cleanup:t})=>{_.tagName.toLowerCase()!=="template"&&V("x-teleport can only be used on a <template> tag",_);let n=rn(e),r=_.content.cloneNode(!0).firstElementChild;_._x_teleport=r,r._x_teleportBack=_,_.setAttribute("data-teleport-template",!0),r.setAttribute("data-teleport-target",!0),_._x_forwardEvents&&_._x_forwardEvents.forEach(T=>{r.addEventListener(T,o=>{o.stopPropagation(),_.dispatchEvent(new o.constructor(o.type,o))})}),H_(r,{},_);let i=(T,o,E)=>{E.includes("prepend")?o.parentNode.insertBefore(T,o):E.includes("append")?o.parentNode.insertBefore(T,o.nextSibling):o.appendChild(T)};D(()=>{i(r,n,$),J(()=>{z(r)})()}),_._x_teleportPutBack=()=>{let T=rn(e);D(()=>{i(_._x_teleport,T,$)})},t(()=>D(()=>{r.remove(),d_(r)}))});var _T=document.createElement("div");function rn(_){let $=J(()=>document.querySelector(_),()=>_T)();return $||V(`Cannot find x-teleport element for selector: "${_}"`),$}var Tn=()=>{};Tn.inline=(_,{modifiers:$},{cleanup:e})=>{$.includes("self")?_._x_ignoreSelf=!0:_._x_ignore=!0,e(()=>{$.includes("self")?delete _._x_ignoreSelf:delete _._x_ignore})},b("ignore",Tn),b("effect",J((_,{expression:$},{effect:e})=>{e(U(_,$))}));function Z$(_,$,e,t){let n=_,r=o=>t(o),i={},T=(o,E)=>I=>E(o,I);if(e.includes("dot")&&($=$T($)),e.includes("camel")&&($=eT($)),e.includes("passive")&&(i.passive=!0),e.includes("capture")&&(i.capture=!0),e.includes("window")&&(n=window),e.includes("document")&&(n=document),e.includes("debounce")){let o=e[e.indexOf("debounce")+1]||"invalid-wait",E=t$(o.split("ms")[0])?Number(o.split("ms")[0]):250;r=xt(r,E)}if(e.includes("throttle")){let o=e[e.indexOf("throttle")+1]||"invalid-wait",E=t$(o.split("ms")[0])?Number(o.split("ms")[0]):250;r=yt(r,E)}return e.includes("prevent")&&(r=T(r,(o,E)=>{E.preventDefault(),o(E)})),e.includes("stop")&&(r=T(r,(o,E)=>{E.stopPropagation(),o(E)})),e.includes("once")&&(r=T(r,(o,E)=>{o(E),n.removeEventListener($,r,i)})),(e.includes("away")||e.includes("outside"))&&(n=document,r=T(r,(o,E)=>{_.contains(E.target)||E.target.isConnected!==!1&&(_.offsetWidth<1&&_.offsetHeight<1||_._x_isShown!==!1&&o(E))})),e.includes("self")&&(r=T(r,(o,E)=>{E.target===_&&o(E)})),(nT($)||an($))&&(r=T(r,(o,E)=>{rT(E,e)||o(E)})),n.addEventListener($,r,i),()=>{n.removeEventListener($,r,i)}}function $T(_){return _.replace(/-/g,".")}function eT(_){return _.toLowerCase().replace(/-(\w)/g,($,e)=>e.toUpperCase())}function t$(_){return!Array.isArray(_)&&!isNaN(_)}function tT(_){return[" ","_"].includes(_)?_:_.replace(/([a-z])([A-Z])/g,"$1-$2").replace(/[_\s]/,"-").toLowerCase()}function nT(_){return["keydown","keyup"].includes(_)}function an(_){return["contextmenu","click","mouse"].some($=>_.includes($))}function rT(_,$){let e=$.filter(r=>!["window","document","prevent","stop","once","capture","self","away","outside","passive","preserve-scroll"].includes(r));if(e.includes("debounce")){let r=e.indexOf("debounce");e.splice(r,t$((e[r+1]||"invalid-wait").split("ms")[0])?2:1)}if(e.includes("throttle")){let r=e.indexOf("throttle");e.splice(r,t$((e[r+1]||"invalid-wait").split("ms")[0])?2:1)}if(e.length===0||e.length===1&&on(_.key).includes(e[0]))return!1;const n=["ctrl","shift","alt","meta","cmd","super"].filter(r=>e.includes(r));return e=e.filter(r=>!n.includes(r)),!(n.length>0&&n.filter(i=>((i==="cmd"||i==="super")&&(i="meta"),_[`${i}Key`])).length===n.length&&(an(_.type)||on(_.key).includes(e[0])))}function on(_){if(!_)return[];_=tT(_);let $={ctrl:"control",slash:"/",space:" ",spacebar:" ",cmd:"meta",esc:"escape",up:"arrow-up",down:"arrow-down",left:"arrow-left",right:"arrow-right",period:".",comma:",",equal:"=",minus:"-",underscore:"_"};return $[_]=_,Object.keys($).map(e=>{if($[e]===_)return e}).filter(e=>e)}b("model",(_,{modifiers:$,expression:e},{effect:t,cleanup:n})=>{let r=_;$.includes("parent")&&(r=_.parentNode);let i=U(r,e),T;typeof e=="string"?T=U(r,`${e} = __placeholder`):typeof e=="function"&&typeof e()=="string"?T=U(r,`${e()} = __placeholder`):T=()=>{};let o=()=>{let u;return i(p=>u=p),sn(u)?u.get():u},E=u=>{let p;i(C=>p=C),sn(p)?p.set(u):T(()=>{},{scope:{__placeholder:u}})};typeof e=="string"&&_.type==="radio"&&D(()=>{_.hasAttribute("name")||_.setAttribute("name",e)});let I=_.tagName.toLowerCase()==="select"||["checkbox","radio"].includes(_.type)||$.includes("lazy")?"change":"input",R=Q?()=>{}:Z$(_,I,$,u=>{E(_e(_,$,u,o()))});if($.includes("fill")&&([void 0,null,""].includes(o())||G$(_)&&Array.isArray(o())||_.tagName.toLowerCase()==="select"&&_.multiple)&&E(_e(_,$,{target:_},o())),_._x_removeModelListeners||(_._x_removeModelListeners={}),_._x_removeModelListeners.default=R,n(()=>_._x_removeModelListeners.default()),_.form){let u=Z$(_.form,"reset",[],p=>{W$(()=>_._x_model&&_._x_model.set(_e(_,$,{target:_},o())))});n(()=>u())}_._x_model={get(){return o()},set(u){E(u)}},_._x_forceModelUpdate=u=>{u===void 0&&typeof e=="string"&&e.match(/\./)&&(u=""),window.fromModel=!0,D(()=>gt(_,"value",u)),delete window.fromModel},t(()=>{let u=o();$.includes("unintrusive")&&document.activeElement.isSameNode(_)||_._x_forceModelUpdate(u)})});function _e(_,$,e,t){return D(()=>{if(e instanceof CustomEvent&&e.detail!==void 0)return e.detail!==null&&e.detail!==void 0?e.detail:e.target.value;if(G$(_))if(Array.isArray(t)){let n=null;return $.includes("number")?n=$e(e.target.value):$.includes("boolean")?n=Y_(e.target.value):n=e.target.value,e.target.checked?t.includes(n)?t:t.concat([n]):t.filter(r=>!iT(r,n))}else return e.target.checked;else{if(_.tagName.toLowerCase()==="select"&&_.multiple)return $.includes("number")?Array.from(e.target.selectedOptions).map(n=>{let r=n.value||n.text;return $e(r)}):$.includes("boolean")?Array.from(e.target.selectedOptions).map(n=>{let r=n.value||n.text;return Y_(r)}):Array.from(e.target.selectedOptions).map(n=>n.value||n.text);{let n;return Pt(_)?e.target.checked?n=e.target.value:n=t:n=e.target.value,$.includes("number")?$e(n):$.includes("boolean")?Y_(n):$.includes("trim")?n.trim():n}}})}function $e(_){let $=_?parseFloat(_):null;return TT($)?$:_}function iT(_,$){return _==$}function TT(_){return!Array.isArray(_)&&!isNaN(_)}function sn(_){return _!==null&&typeof _=="object"&&typeof _.get=="function"&&typeof _.set=="function"}b("cloak",_=>queueMicrotask(()=>D(()=>_.removeAttribute(R_("cloak"))))),Rt(()=>`[${R_("init")}]`),b("init",J((_,{expression:$},{evaluate:e})=>typeof $=="string"?!!$.trim()&&e($,{},!1):e($,{},!1))),b("text",(_,{expression:$},{effect:e,evaluateLater:t})=>{let n=t($);e(()=>{n(r=>{D(()=>{_.textContent=r})})})}),b("html",(_,{expression:$},{effect:e,evaluateLater:t})=>{let n=t($);e(()=>{n(r=>{D(()=>{_.innerHTML=r,_._x_ignoreSelf=!0,z(_),delete _._x_ignoreSelf})})})}),H$(at(":",ot(R_("bind:"))));var Ln=(_,{value:$,modifiers:e,expression:t,original:n},{effect:r,cleanup:i})=>{if(!$){let o={};Ei(o),U(_,t)(I=>{bt(_,I,n)},{scope:o});return}if($==="key")return aT(_,t);if(_._x_inlineBindings&&_._x_inlineBindings[$]&&_._x_inlineBindings[$].extract)return;let T=U(_,t);r(()=>T(o=>{o===void 0&&typeof t=="string"&&t.match(/\./)&&(o=""),D(()=>gt(_,$,o,e))})),i(()=>{_._x_undoAddedClasses&&_._x_undoAddedClasses(),_._x_undoAddedStyles&&_._x_undoAddedStyles()})};Ln.inline=(_,{value:$,modifiers:e,expression:t})=>{$&&(_._x_inlineBindings||(_._x_inlineBindings={}),_._x_inlineBindings[$]={expression:t,extract:!1})},b("bind",Ln);function aT(_,$){_._x_keyExpression=$}ft(()=>`[${R_("data")}]`),b("data",(_,{expression:$},{cleanup:e})=>{if(oT(_))return;$=$===""?"{}":$;let t={};M_(t,_);let n={};Ii(n,t);let r=T_(_,$,{scope:n});(r===void 0||r===!0)&&(r={}),M_(r,_);let i=u_(r);N$(i);let T=H_(_,i);i.init&&T_(_,i.init),e(()=>{i.destroy&&T_(_,i.destroy),T()})}),j_((_,$)=>{_._x_dataStack&&($._x_dataStack=_._x_dataStack,$.setAttribute("data-has-alpine-state",!0))});function oT(_){return Q?U$?!0:_.hasAttribute("data-has-alpine-state"):!1}b("show",(_,{modifiers:$,expression:e},{effect:t})=>{let n=U(_,e);_._x_doHide||(_._x_doHide=()=>{D(()=>{_.style.setProperty("display","none",$.includes("important")?"important":void 0)})}),_._x_doShow||(_._x_doShow=()=>{D(()=>{_.style.length===1&&_.style.display==="none"?_.removeAttribute("style"):_.style.removeProperty("display")})});let r=()=>{_._x_doHide(),_._x_isShown=!1},i=()=>{_._x_doShow(),_._x_isShown=!0},T=()=>setTimeout(i),o=b$(R=>R?i():r(),R=>{typeof _._x_toggleAndCascadeWithTransitions=="function"?_._x_toggleAndCascadeWithTransitions(_,R,i,r):R?T():r()}),E,I=!0;t(()=>n(R=>{!I&&R===E||($.includes("immediate")&&(R?T():r()),o(R),E=R,I=!1)}))}),b("for",(_,{expression:$},{effect:e,cleanup:t})=>{let n=LT($),r=U(_,n.items),i=U(_,_._x_keyExpression||"index");_._x_prevKeys=[],_._x_lookup={},e(()=>sT(_,n,r,i)),t(()=>{Object.values(_._x_lookup).forEach(T=>D(()=>{d_(T),T.remove()})),delete _._x_prevKeys,delete _._x_lookup})});function sT(_,$,e,t){let n=i=>typeof i=="object"&&!Array.isArray(i),r=_;e(i=>{ET(i)&&i>=0&&(i=Array.from(Array(i).keys(),d=>d+1)),i===void 0&&(i=[]);let T=_._x_lookup,o=_._x_prevKeys,E=[],I=[];if(n(i))i=Object.entries(i).map(([d,M])=>{let y=En($,M,d,i);t(P=>{I.includes(P)&&V("Duplicate key on x-for",_),I.push(P)},{scope:{index:d,...y}}),E.push(y)});else for(let d=0;d<i.length;d++){let M=En($,i[d],d,i);t(y=>{I.includes(y)&&V("Duplicate key on x-for",_),I.push(y)},{scope:{index:d,...M}}),E.push(M)}let R=[],u=[],p=[],C=[];for(let d=0;d<o.length;d++){let M=o[d];I.indexOf(M)===-1&&p.push(M)}o=o.filter(d=>!p.includes(d));let S="template";for(let d=0;d<I.length;d++){let M=I[d],y=o.indexOf(M);if(y===-1)o.splice(d,0,M),R.push([S,d]);else if(y!==d){let P=o.splice(d,1)[0],v=o.splice(y-1,1)[0];o.splice(d,0,v),o.splice(y,0,P),u.push([P,v])}else C.push(M);S=M}for(let d=0;d<p.length;d++){let M=p[d];M in T&&(D(()=>{d_(T[M]),T[M].remove()}),delete T[M])}for(let d=0;d<u.length;d++){let[M,y]=u[d],P=T[M],v=T[y],G=document.createElement("div");D(()=>{v||V('x-for ":key" is undefined or invalid',r,y,T),v.after(G),P.after(v),v._x_currentIfEl&&v.after(v._x_currentIfEl),G.before(P),P._x_currentIfEl&&P.after(P._x_currentIfEl),G.remove()}),v._x_refreshXForScope(E[I.indexOf(y)])}for(let d=0;d<R.length;d++){let[M,y]=R[d],P=M==="template"?r:T[M];P._x_currentIfEl&&(P=P._x_currentIfEl);let v=E[y],G=I[y],I_=document.importNode(r.content,!0).firstElementChild,L$=u_(v);H_(I_,L$,r),I_._x_refreshXForScope=E$=>{Object.entries(E$).forEach(([we,Ue])=>{L$[we]=Ue})},D(()=>{P.after(I_),J(()=>z(I_))()}),typeof G=="object"&&V("x-for key cannot be an object, it must be a string or an integer",r),T[G]=I_}for(let d=0;d<C.length;d++)T[C[d]]._x_refreshXForScope(E[I.indexOf(C[d])]);r._x_prevKeys=I})}function LT(_){let $=/,([^,\}\]]*)(?:,([^,\}\]]*))?$/,e=/^\s*\(|\)\s*$/g,t=/([\s\S]*?)\s+(?:in|of)\s+([\s\S]*)/,n=_.match(t);if(!n)return;let r={};r.items=n[2].trim();let i=n[1].replace(e,"").trim(),T=i.match($);return T?(r.item=i.replace($,"").trim(),r.index=T[1].trim(),T[2]&&(r.collection=T[2].trim())):r.item=i,r}function En(_,$,e,t){let n={};return/^\[.*\]$/.test(_.item)&&Array.isArray($)?_.item.replace("[","").replace("]","").split(",").map(i=>i.trim()).forEach((i,T)=>{n[i]=$[T]}):/^\{.*\}$/.test(_.item)&&!Array.isArray($)&&typeof $=="object"?_.item.replace("{","").replace("}","").split(",").map(i=>i.trim()).forEach(i=>{n[i]=$[i]}):n[_.item]=$,_.index&&(n[_.index]=e),_.collection&&(n[_.collection]=t),n}function ET(_){return!Array.isArray(_)&&!isNaN(_)}function An(){}An.inline=(_,{expression:$},{cleanup:e})=>{let t=K_(_);t._x_refs||(t._x_refs={}),t._x_refs[$]=_,e(()=>delete t._x_refs[$])},b("ref",An),b("if",(_,{expression:$},{effect:e,cleanup:t})=>{_.tagName.toLowerCase()!=="template"&&V("x-if can only be used on a <template> tag",_);let n=U(_,$),r=()=>{if(_._x_currentIfEl)return _._x_currentIfEl;let T=_.content.cloneNode(!0).firstElementChild;return H_(T,{},_),D(()=>{_.after(T),J(()=>z(T))()}),_._x_currentIfEl=T,_._x_undoIf=()=>{D(()=>{d_(T),T.remove()}),delete _._x_currentIfEl},T},i=()=>{_._x_undoIf&&(_._x_undoIf(),delete _._x_undoIf)};e(()=>n(T=>{T?r():i()})),t(()=>_._x_undoIf&&_._x_undoIf())}),b("id",(_,{expression:$},{evaluate:e})=>{e($).forEach(n=>Ji(_,n))}),j_((_,$)=>{_._x_ids&&($._x_ids=_._x_ids)}),H$(at("@",ot(R_("on:")))),b("on",J((_,{value:$,modifiers:e,expression:t},{cleanup:n})=>{let r=t?U(_,t):()=>{};_.tagName.toLowerCase()==="template"&&(_._x_forwardEvents||(_._x_forwardEvents=[]),_._x_forwardEvents.includes($)||_._x_forwardEvents.push($));let i=Z$(_,$,e,T=>{r(()=>{},{scope:{$event:T},params:[T]})});n(()=>i())})),n$("Collapse","collapse","collapse"),n$("Intersect","intersect","intersect"),n$("Focus","trap","focus"),n$("Mask","mask","mask");function n$(_,$,e){b($,t=>V(`You can't use [x-${$}] without first installing the "${_}" plugin here: https://alpinejs.dev/plugins/${e}`,t))}h_.setEvaluator(nt),h_.setRawEvaluator(gr),h_.setReactivityEngine({reactive:z$,effect:Ci,release:pi,raw:W});var AT=h_,$_=AT;const IT=typeof document<"u"&&document.documentMode,lT={rootMargin:"0px",threshold:0,load(_){if(_.nodeName.toLowerCase()==="picture"){let e=_.querySelector("img"),t=!1;e===null&&(e=document.createElement("img"),t=!0),IT&&_.getAttribute("data-iesrc")&&(e.src=_.getAttribute("data-iesrc")),_.getAttribute("data-alt")&&(e.alt=_.getAttribute("data-alt")),t&&_.append(e)}if(_.nodeName.toLowerCase()==="video"&&!_.getAttribute("data-src")&&_.children){const e=_.children;let t;for(let n=0;n<=e.length-1;n++)t=e[n].getAttribute("data-src"),t&&(e[n].src=t);_.load()}_.getAttribute("data-poster")&&(_.poster=_.getAttribute("data-poster")),_.getAttribute("data-src")&&(_.src=_.getAttribute("data-src")),_.getAttribute("data-srcset")&&_.setAttribute("srcset",_.getAttribute("data-srcset"));let $=",";if(_.getAttribute("data-background-delimiter")&&($=_.getAttribute("data-background-delimiter")),_.getAttribute("data-background-image"))_.style.backgroundImage=`url('${_.getAttribute("data-background-image").split($).join("'),url('")}')`;else if(_.getAttribute("data-background-image-set")){const e=_.getAttribute("data-background-image-set").split($);let t=e[0].substr(0,e[0].indexOf(" "))||e[0];t=t.indexOf("url(")===-1?`url(${t})`:t,e.length===1?_.style.backgroundImage=t:_.setAttribute("style",(_.getAttribute("style")||"")+`background-image: ${t}; background-image: -webkit-image-set(${e}); background-image: image-set(${e})`)}_.getAttribute("data-toggle-class")&&_.classList.toggle(_.getAttribute("data-toggle-class"))},loaded(){}};function ee(_){_.setAttribute("data-loaded",!0)}function uT(_){_.getAttribute("data-placeholder-background")&&(_.style.background=_.getAttribute("data-placeholder-background"))}const te=_=>_.getAttribute("data-loaded")==="true",cT=(_,$)=>(e,t)=>{e.forEach(n=>{(n.intersectionRatio>0||n.isIntersecting)&&(t.unobserve(n.target),te(n.target)||(_(n.target),ee(n.target),$(n.target)))})},In=(_,$=document)=>_ instanceof Element?[_]:_ instanceof NodeList?_:$.querySelectorAll(_);function fT(_=".lozad",$={}){const{root:e,rootMargin:t,threshold:n,load:r,loaded:i}=Object.assign({},lT,$);let T;typeof window<"u"&&window.IntersectionObserver&&(T=new IntersectionObserver(cT(r,i),{root:e,rootMargin:t,threshold:n}));const o=In(_,e);for(let E=0;E<o.length;E++)uT(o[E]);return{observe(){const E=In(_,e);for(let I=0;I<E.length;I++)if(!te(E[I])){if(T){T.observe(E[I]);continue}r(E[I]),ee(E[I]),i(E[I])}},triggerLoad(E){te(E)||(r(E),ee(E),i(E))},observer:T}}function RT(_){return _&&_.__esModule&&Object.prototype.hasOwnProperty.call(_,"default")?_.default:_}var r$={exports:{}},ne,ln;function N_(){return ln||(ln=1,ne=function(_,$,e){return _ instanceof HTMLCollection||_ instanceof NodeList||_ instanceof Array?Array.prototype.forEach.call(_,$,e):$.call(e,_)}),ne}var re,un;function dT(){return un||(un=1,re=function(_){var $=_.text||_.textContent||_.innerHTML||"",e=_.src||"",t=_.parentNode||document.querySelector("head")||document.documentElement,n=document.createElement("script");if($.match("document.write"))return console&&console.log&&console.log("Script contains document.write. Can’t be executed correctly. Code skipped ",_),!1;if(n.type="text/javascript",n.id=_.id,e!==""&&(n.src=e,n.async=!1),$!=="")try{n.appendChild(document.createTextNode($))}catch{n.text=$}return t.appendChild(n),(t instanceof HTMLHeadElement||t instanceof HTMLBodyElement)&&t.contains(n)&&t.removeChild(n),!0}),re}var ie,cn;function hT(){if(cn)return ie;cn=1;var _=N_(),$=dT();return ie=function(e){e.tagName.toLowerCase()==="script"&&$(e),_(e.querySelectorAll("script"),function(t){(!t.type||t.type.toLowerCase()==="text/javascript")&&(t.parentNode&&t.parentNode.removeChild(t),$(t))})},ie}var Te,fn;function i$(){if(fn)return Te;fn=1;var _=N_();return Te=function($,e,t,n){e=typeof e=="string"?e.split(" "):e,e.forEach(function(r){_($,function(i){i.addEventListener(r,t,n)})})},Te}var ae,Rn;function oe(){if(Rn)return ae;Rn=1;var _=i$();return ae={outerHTML:function($,e){$.outerHTML=e.outerHTML,this.onSwitch()},innerHTML:function($,e){$.innerHTML=e.innerHTML,e.className===""?$.removeAttribute("class"):$.className=e.className,this.onSwitch()},switchElementsAlt:function($,e){if($.innerHTML=e.innerHTML,e.hasAttributes())for(var t=e.attributes,n=0;n<t.length;n++)$.attributes.setNamedItem(t[n].cloneNode());this.onSwitch()},replaceNode:function($,e){$.parentNode.replaceChild(e,$),this.onSwitch()},sideBySide:function($,e,t,n){var r=Array.prototype.forEach,i=[],T=[],o=document.createDocumentFragment(),E="animationend webkitAnimationEnd MSAnimationEnd oanimationend",I=0,R=(function(u){u.target===u.currentTarget&&(I--,I<=0&&i&&(i.forEach(function(p){p.parentNode&&p.parentNode.removeChild(p)}),T.forEach(function(p){p.className=p.className.replace(p.getAttribute("data-pjax-classes"),""),p.removeAttribute("data-pjax-classes")}),T=null,i=null,this.onSwitch()))}).bind(this);n=n||{},r.call($.childNodes,function(u){i.push(u),u.classList&&!u.classList.contains("js-Pjax-remove")&&(u.hasAttribute("data-pjax-classes")&&(u.className=u.className.replace(u.getAttribute("data-pjax-classes"),""),u.removeAttribute("data-pjax-classes")),u.classList.add("js-Pjax-remove"),n.callbacks&&n.callbacks.removeElement&&n.callbacks.removeElement(u),n.classNames&&(u.className+=" "+n.classNames.remove+" "+(t.backward?n.classNames.backward:n.classNames.forward)),I++,_(u,E,R,!0))}),r.call(e.childNodes,function(u){if(u.classList){var p="";n.classNames&&(p=" js-Pjax-add "+n.classNames.add+" "+(t.backward?n.classNames.forward:n.classNames.backward)),n.callbacks&&n.callbacks.addElement&&n.callbacks.addElement(u),u.className+=p,u.setAttribute("data-pjax-classes",p),T.push(u),o.appendChild(u),I++,_(u,E,R,!0)}}),$.className=e.className,$.appendChild(o)}},ae}var se,dn;function ST(){if(dn)return se;dn=1;var _=oe();se=function(e){return e=e||{},e.elements=e.elements||"a[href], form[action]",e.selectors=e.selectors||["title",".js-Pjax"],e.switches=e.switches||{},e.switchesOptions=e.switchesOptions||{},e.history=typeof e.history>"u"?!0:e.history,e.analytics=typeof e.analytics=="function"||e.analytics===!1?e.analytics:$,e.scrollTo=typeof e.scrollTo>"u"?0:e.scrollTo,e.scrollRestoration=typeof e.scrollRestoration<"u"?e.scrollRestoration:!0,e.cacheBust=typeof e.cacheBust>"u"?!0:e.cacheBust,e.debug=e.debug||!1,e.timeout=e.timeout||0,e.currentUrlFullReload=typeof e.currentUrlFullReload>"u"?!1:e.currentUrlFullReload,e.switches.head||(e.switches.head=_.switchElementsAlt),e.switches.body||(e.switches.body=_.switchElementsAlt),e};function $(){window._gaq&&_gaq.push(["_trackPageview"]),window.ga&&ga("send","pageview",{page:location.pathname,title:document.title})}return se}var Le,hn;function Sn(){return hn||(hn=1,Le=(function(){var _=0;return function(){var $="pjax"+new Date().getTime()+"_"+_;return _++,$}})()),Le}var Ee,Nn;function Cn(){if(Nn)return Ee;Nn=1;var _=N_();return Ee=function($,e,t){e=typeof e=="string"?e.split(" "):e,e.forEach(function(n){var r;r=document.createEvent("HTMLEvents"),r.initEvent(n,!0,!0),r.eventName=n,t&&Object.keys(t).forEach(function(i){r[i]=t[i]}),_($,function(i){var T=!1;!i.parentNode&&i!==document&&i!==window&&(T=!0,document.body.appendChild(i)),i.dispatchEvent(r),T&&i.parentNode.removeChild(i)})})},Ee}var Ae,pn;function T$(){return pn||(pn=1,Ae=function(_){if(_===null||typeof _!="object")return _;var $=_.constructor();for(var e in _)_.hasOwnProperty(e)&&($[e]=_[e]);return $}),Ae}var Ie,gn;function NT(){return gn||(gn=1,Ie=function($,e,t){for(var n=0;n<e.length;n++)for(var r=$.querySelectorAll(e[n]),i=0;i<r.length;i++)if(r[i].contains(t))return!0;return!1}),Ie}var le,mn;function CT(){return mn||(mn=1,le=function(_){if(_==null)return null;for(var $=Object(_),e=1;e<arguments.length;e++){var t=arguments[e];if(t!=null)for(var n in t)Object.prototype.hasOwnProperty.call(t,n)&&($[n]=t[n])}return $}),le}var ue,On;function Hn(){return On||(On=1,ue=function(){}),ue}var ce,Mn;function pT(){return Mn||(Mn=1,ce=function(){this.options.debug&&console&&(typeof console.log=="function"?console.log.apply(console,arguments):console.log&&console.log(arguments))}),ce}var fe,Pn;function gT(){if(Pn)return fe;Pn=1;var _="data-pjax-state";return fe=function($){switch($.tagName.toLowerCase()){case"a":$.hasAttribute(_)||this.attachLink($);break;case"form":$.hasAttribute(_)||this.attachForm($);break;default:throw"Pjax can only be applied on <a> or <form> submit"}},fe}var Re,xn;function mT(){if(xn)return Re;xn=1;var _=i$(),$=T$(),e="data-pjax-state",t=function(i,T){if(!r(T)){var o=$(this.options),E=n(i,T);if(E){i.setAttribute(e,E);return}if(T.preventDefault(),this.options.currentUrlFullReload&&i.href===window.location.href.split("#")[0]){i.setAttribute(e,"reload"),this.reload();return}i.setAttribute(e,"load"),o.triggerElement=i,this.loadUrl(i.href,o)}};function n(i,T){if(T.which>1||T.metaKey||T.ctrlKey||T.shiftKey||T.altKey)return"modifier";if(i.protocol!==window.location.protocol||i.host!==window.location.host)return"external";if(i.hash&&i.href.replace(i.hash,"")===window.location.href.replace(location.hash,""))return"anchor";if(i.href===window.location.href.split("#")[0]+"#")return"anchor-empty"}var r=function(i){return i.defaultPrevented||i.returnValue===!1};return Re=function(i){var T=this;i.setAttribute(e,""),_(i,"click",function(o){t.call(T,i,o)}),_(i,"keyup",(function(o){o.keyCode===13&&t.call(T,i,o)}).bind(this))},Re}var de,yn;function OT(){if(yn)return de;yn=1;var _=i$(),$=T$(),e="data-pjax-state",t=function(T,o){if(!i(o)){var E=$(this.options);E.requestOptions={requestUrl:T.getAttribute("action")||window.location.href,requestMethod:T.getAttribute("method")||"GET"};var I=document.createElement("a");I.setAttribute("href",E.requestOptions.requestUrl);var R=r(I,E);if(R){T.setAttribute(e,R);return}o.preventDefault(),T.enctype==="multipart/form-data"?E.requestOptions.formData=new FormData(T):E.requestOptions.requestParams=n(T),T.setAttribute(e,"submit"),E.triggerElement=T,this.loadUrl(I.href,E)}};function n(T){for(var o=[],E=T.elements,I=0;I<E.length;I++){var R=E[I],u=R.tagName.toLowerCase();if(R.name&&R.attributes!==void 0&&u!=="button"){var p=R.attributes.type;if(!p||p.value!=="checkbox"&&p.value!=="radio"||R.checked){var C=[];if(u==="select")for(var S,d=0;d<R.options.length;d++)S=R.options[d],S.selected&&!S.disabled&&C.push(S.hasAttribute("value")?S.value:S.text);else C.push(R.value);for(var M=0;M<C.length;M++)o.push({name:encodeURIComponent(R.name),value:encodeURIComponent(C[M])})}}}return o}function r(T,o){if(T.protocol!==window.location.protocol||T.host!==window.location.host)return"external";if(T.hash&&T.href.replace(T.hash,"")===window.location.href.replace(location.hash,""))return"anchor";if(T.href===window.location.href.split("#")[0]+"#")return"anchor-empty";if(o.currentUrlFullReload&&T.href===window.location.href.split("#")[0])return"reload"}var i=function(T){return T.defaultPrevented||T.returnValue===!1};return de=function(T){var o=this;T.setAttribute(e,""),_(T,"submit",function(E){t.call(o,T,E)})},de}var he,Wn;function HT(){if(Wn)return he;Wn=1;var _=N_();return he=function($,e,t,n){n=n||document,$.forEach(function(r){_(n.querySelectorAll(r),e,t)})},he}var Se,Dn;function MT(){if(Dn)return Se;Dn=1;var _=N_(),$=oe();return Se=function(e,t,n,r,i,T){var o=[];n.forEach(function(E){var I=r.querySelectorAll(E),R=i.querySelectorAll(E);if(this.log&&this.log("Pjax switch",E,I,R),I.length!==R.length)throw"DOM doesn’t look the same on new loaded page: ’"+E+"’ - new "+I.length+", old "+R.length;_(I,function(u,p){var C=R[p];this.log&&this.log("newEl",u,"oldEl",C);var S=e[E]?e[E].bind(this,C,u,T,t[E]):$.outerHTML.bind(this,C,u,T);o.push(S)},this)},this),this.state.numPendingSwitches=o.length,o.forEach(function(E){E()})},Se}var Ne,vn;function PT(){if(vn)return Ne;vn=1;var _=Hn();return Ne=function($){$&&$.readyState<4&&($.onreadystatechange=_,$.abort())},Ne}var Ce,bn;function xT(){return bn||(bn=1,Ce=function(_,$,e){var t=new RegExp("([?&])"+$+"=.*?(&|$)","i"),n=_.indexOf("?")!==-1?"&":"?";return _.match(t)?_.replace(t,"$1"+$+"="+e+"$2"):_+n+$+"="+e}),Ce}var pe,wn;function yT(){if(wn)return pe;wn=1;var _=xT();return pe=function($,e,t){e=e||{};var n,r=e.requestOptions||{},i=(r.requestMethod||"GET").toUpperCase(),T=r.requestParams||null,o=r.formData||null,E=null,I=new XMLHttpRequest,R=e.timeout||0;if(I.onreadystatechange=function(){I.readyState===4&&(I.status===200?t(I.responseText,I,$,e):I.status!==0&&t(null,I,$,e))},I.onerror=function(u){console.log(u),t(null,I,$,e)},I.ontimeout=function(){t(null,I,$,e)},T&&T.length)switch(n=T.map(function(u){return u.name+"="+u.value}).join("&"),i){case"GET":$=$.split("?")[0],$+="?"+n;break;case"POST":E=n;break}else o&&(E=o);return e.cacheBust&&($=_($,"t",Date.now())),I.open(i,$,!0),I.timeout=R,I.setRequestHeader("X-Requested-With","XMLHttpRequest"),I.setRequestHeader("X-PJAX","true"),I.setRequestHeader("X-PJAX-Selectors",JSON.stringify(e.selectors)),E&&i==="POST"&&!o&&I.setRequestHeader("Content-Type","application/x-www-form-urlencoded"),I.send(E),I},pe}var ge,Un;function WT(){if(Un)return ge;Un=1;var _=T$(),$=Sn(),e=Cn();return ge=function(t,n,r,i){if(i=_(i||this.options),i.request=n,t===!1){e(document,"pjax:complete pjax:error",i);return}var T=window.history.state||{};window.history.replaceState({url:T.url||window.location.href,title:T.title||document.title,uid:T.uid||$(),scrollPos:[document.documentElement.scrollLeft||document.body.scrollLeft,document.documentElement.scrollTop||document.body.scrollTop]},document.title,window.location.href);var o=r;n.responseURL?r!==n.responseURL&&(r=n.responseURL):n.getResponseHeader("X-PJAX-URL")?r=n.getResponseHeader("X-PJAX-URL"):n.getResponseHeader("X-XHR-Redirected-To")&&(r=n.getResponseHeader("X-XHR-Redirected-To"));var E=document.createElement("a");E.href=o;var I=E.hash;E.href=r,I&&!E.hash&&(E.hash=I,r=E.href),this.state.href=r,this.state.options=i;try{this.loadContent(t,i)}catch(R){if(e(document,"pjax:error",i),this.options.debug)throw R;return console&&console.error&&console.error("Pjax switch fail: ",R),this.latestChance(r)}},ge}var me,Gn;function DT(){return Gn||(Gn=1,me=function(){return window.history&&window.history.pushState&&window.history.replaceState&&!navigator.userAgent.match(/((iPod|iPhone|iPad).+\bOS\s+[1-4]\D|WebApps\/.+CFNetwork)/)}),me}var Fn;function vT(){if(Fn)return r$.exports;Fn=1;var _=hT(),$=N_(),e=ST(),t=oe(),n=Sn(),r=i$(),i=Cn(),T=T$(),o=NT(),E=CT(),I=Hn(),R=function(C){this.state={numPendingSwitches:0,href:null,options:null},this.options=e(C),this.log("Pjax options",this.options),this.options.scrollRestoration&&"scrollRestoration"in history&&(history.scrollRestoration="manual"),this.maxUid=this.lastUid=n(),this.parseDOM(document),r(window,"popstate",(function(S){if(S.state){var d=T(this.options);d.url=S.state.url,d.title=S.state.title,d.history=!1,d.scrollPos=S.state.scrollPos,S.state.uid<this.lastUid?d.backward=!0:d.forward=!0,this.lastUid=S.state.uid,this.loadUrl(S.state.url,d)}}).bind(this))};if(R.switches=t,R.prototype={log:pT(),getElements:function(C){return C.querySelectorAll(this.options.elements)},parseDOM:function(C){var S=gT();$(this.getElements(C),S,this)},refresh:function(C){this.parseDOM(C||document)},reload:function(){window.location.reload()},attachLink:mT(),attachForm:OT(),forEachSelectors:function(C,S,d){return HT().bind(this)(this.options.selectors,C,S,d)},switchSelectors:function(C,S,d,M){return MT().bind(this)(this.options.switches,this.options.switchesOptions,C,S,d,M)},latestChance:function(C){window.location=C},onSwitch:function(){i(window,"resize scroll"),this.state.numPendingSwitches--,this.state.numPendingSwitches===0&&this.afterAllSwitches()},loadContent:function(C,S){if(typeof C!="string"){i(document,"pjax:complete pjax:error",S);return}var d=document.implementation.createHTMLDocument("pjax"),M=/<html[^>]+>/gi,y=/\s?[a-z:]+(?:=['"][^'">]+['"])*/gi,P=C.match(M);if(P&&P.length&&(P=P[0].match(y),P.length&&(P.shift(),P.forEach(function(v){var G=v.trim().split("=");G.length===1?d.documentElement.setAttribute(G[0],!0):d.documentElement.setAttribute(G[0],G[1].slice(1,-1))}))),d.documentElement.innerHTML=C,this.log("load content",d.documentElement.attributes,d.documentElement.innerHTML.length),document.activeElement&&o(document,this.options.selectors,document.activeElement))try{document.activeElement.blur()}catch{}this.switchSelectors(this.options.selectors,d,document,S)},abortRequest:PT(),doRequest:yT(),handleResponse:WT(),loadUrl:function(C,S){S=typeof S=="object"?E({},this.options,S):T(this.options),this.log("load href",C,S),this.abortRequest(this.request),i(document,"pjax:send",S),this.request=this.doRequest(C,S,this.handleResponse.bind(this))},afterAllSwitches:function(){var C=Array.prototype.slice.call(document.querySelectorAll("[autofocus]")).pop();C&&document.activeElement!==C&&C.focus(),this.options.selectors.forEach(function(v){$(document.querySelectorAll(v),function(G){_(G)})});var S=this.state;if(S.options.history&&(window.history.state||(this.lastUid=this.maxUid=n(),window.history.replaceState({url:window.location.href,title:document.title,uid:this.maxUid,scrollPos:[0,0]},document.title)),this.lastUid=this.maxUid=n(),window.history.pushState({url:S.href,title:S.options.title,uid:this.maxUid,scrollPos:[0,0]},S.options.title,S.href)),this.forEachSelectors(function(v){this.parseDOM(v)},this),i(document,"pjax:complete pjax:success",S.options),typeof S.options.analytics=="function"&&S.options.analytics(),S.options.history){var d=document.createElement("a");if(d.href=this.state.href,d.hash){var M=d.hash.slice(1);M=decodeURIComponent(M);var y=0,P=document.getElementById(M)||document.getElementsByName(M)[0];if(P&&P.offsetParent)do y+=P.offsetTop,P=P.offsetParent;while(P);window.scrollTo(0,y)}else S.options.scrollTo!==!1&&(S.options.scrollTo.length>1?window.scrollTo(S.options.scrollTo[0],S.options.scrollTo[1]):window.scrollTo(0,S.options.scrollTo))}else S.options.scrollRestoration&&S.options.scrollPos&&window.scrollTo(S.options.scrollPos[0],S.options.scrollPos[1]);this.state={numPendingSwitches:0,href:null,options:null}}},R.isSupported=DT(),R.isSupported())r$.exports=R;else{var u=I;for(var p in R.prototype)R.prototype.hasOwnProperty(p)&&typeof R.prototype[p]=="function"&&(u[p]=I);r$.exports=u}return r$.exports}var bT=vT();const wT=RT(bT),UT="[Theme]";function GT(){return document.documentElement.hasAttribute("data-debug")}function FT(_,...$){GT()&&console.error(UT,_,...$)}let Oe=null;const BT=["/login","/logout","/password-reset","/signup"];function VT(_){Oe=_}function kT(_){return _.origin!==window.location.origin||_.protocol!==window.location.protocol?!0:BT.some($=>_.pathname===$||_.pathname.startsWith(`${$}/`))}function C_(_){const $=new URL(_,window.location.origin);if(kT($)||!Oe){window.location.assign($.toString());return}Oe.loadUrl(`${$.pathname}${$.search}${$.hash}`)}const Bn="halo-page-data",KT="/apis/api.content.halo.run/v1alpha1/posts?sort=spec.publishTime%2Cdesc&size=50";let w_=[],U_=null;function p_(_){return Array.isArray(_)?_:[]}function XT(_){switch(_){case"index":case"categories":case"category":case"tags":case"tag":case"post":return _;default:return"unknown"}}function Vn(_,$){const e=_[0],t=e?.status?.permalink,n=e?.spec?.slug??e?.metadata?.name;if(!t||!n)return $;const r=t.endsWith("/")?t.slice(0,-1):t;return r.endsWith(`/${n}`)?r.slice(0,r.length-n.length-1):$}function jT(){const _=document.getElementById(Bn);if(!(_ instanceof HTMLScriptElement))return null;const $=_.textContent?.trim();if(!$)return null;try{return JSON.parse($)}catch(e){return console.error("[Theme] Failed to parse halo page data.",e),null}}function He(_){return!_||!_.displayName&&!_.permalink&&!_.slug&&!_.title?null:_}function kn(){const _=jT();if(!_){window.haloData=void 0;return}const $=XT(_.pageType);if($==="index"){const t=p_(_.currentPosts);t.length>0&&(w_=t)}const e={categories:p_(_.categories),currentCategory:He(_.currentCategory),currentPost:He(_.currentPost),currentPosts:p_(_.currentPosts),currentTag:He(_.currentTag),homePosts:w_,nextPost:_.nextPost??null,pageType:$,pagination:_.pagination,prevPost:_.prevPost??null,tags:p_(_.tags),urls:{archives:"/archives",categories:Vn(p_(_.categories),"/categories"),home:"/",tags:Vn(p_(_.tags),"/tags")},user:typeof _.user=="string"?_.user:"guest"};return window.haloData=e,$!=="index"&&w_.length===0&&qT(),e}function YT(_){return _.map($=>({metadata:{creationTimestamp:$.metadata?.creationTimestamp??null,name:$.metadata?.name??null},spec:{owner:$.spec?.owner??null,publishTime:$.spec?.publishTime??null,slug:$.spec?.slug??null,title:$.spec?.title??null},status:{permalink:$.status?.permalink??null}}))}function qT(){return U_||(U_=(async()=>{try{const _=await fetch(KT);if(!_.ok)return;const e=(await _.json()).items;if(!Array.isArray(e)||e.length===0)return;w_=YT(e),window.haloData&&(window.haloData.homePosts=w_)}catch{}finally{U_=null}})(),U_)}function e_(_,$){const e=document.querySelector(_);e&&$&&(e.content=$)}function zT(_,$){const e=document.querySelector(_);e&&$&&(e.href=$)}function QT(){const _=document.getElementById(Bn);if(_ instanceof HTMLScriptElement)try{const $=JSON.parse(_.textContent?.trim()??"{}"),e=$.seo;if(!e)return;e_('meta[name="description"]',e.description),zT('link[rel="canonical"]',e.canonical),e_('meta[property="og:title"]',e.title),e_('meta[property="og:description"]',e.description),e_('meta[property="og:url"]',e.canonical),e_('meta[property="og:site_name"]',e.title?.split(" - ").pop()??null);const t=document.querySelector('meta[property="og:image"]');if(e.ogImage)if(t)t.content=e.ogImage;else{const n=document.createElement("meta");n.setAttribute("property","og:image"),n.content=e.ogImage,document.head.appendChild(n)}else t&&t.remove();e_('meta[property="og:type"]',$.pageType==="post"?"article":"website"),e_('meta[name="twitter:title"]',e.title),e_('meta[name="twitter:description"]',e.description)}catch{}}function Kn(){document.querySelectorAll('ul[data-type="taskList"] li[data-type="taskItem"]').forEach(_=>{const $=_.querySelector("label");!$||$.dataset.boundTaskList==="true"||($.dataset.boundTaskList="true",$.addEventListener("click",e=>{e.preventDefault();const t=$.closest('li[data-type="taskItem"]');if(!t)return;const n=t.getAttribute("data-checked")==="true";t.setAttribute("data-checked",n?"false":"true");const r=t.querySelector('input[type="checkbox"]');r&&(r.checked=!n)}))})}let Me=null;function JT(){Me=fT(".lozad",{loaded:_=>{_.classList.add("loaded")}}),Me.observe()}function ZT(){const _=new wT({analytics:!1,cacheBust:!1,elements:'a[href]:not([target="_blank"]):not([data-pjax="false"]):not([href^="javascript:"]):not([href^="/login"]):not([href^="/signup"]):not([href^="/password-reset"]):not([href^="/logout"])',scrollRestoration:!1,selectors:["title","#main"]});VT(_)}function _a(){document.addEventListener("pjax:send",()=>{const _=document.getElementById("main");_&&_.classList.add("loading")}),document.addEventListener("pjax:complete",()=>{const _=document.getElementById("main");kn(),QT(),_&&(_.classList.remove("loading"),$_.initTree(_),Me?.observe(),_.scrollTo({top:0})),Kn()}),document.addEventListener("pjax:error",()=>{FT("Pjax navigation failed.")})}function $a(){kn(),window.Alpine=$_,$_.start(),JT(),ZT(),_a(),Kn()}const ea={FULL_WIDTH:0,FITTING:1,SMUSHING:2,CONTROLLED_SMUSHING:3};class ta{constructor(){this.comment="",this.numChars=0,this.options={}}}const Pe=["1Row","3-D","3D Diagonal","3D-ASCII","3x5","4Max","5 Line Oblique","AMC 3 Line","AMC 3 Liv1","AMC AAA01","AMC Neko","AMC Razor","AMC Razor2","AMC Slash","AMC Slider","AMC Thin","AMC Tubes","AMC Untitled","ANSI Regular","ANSI Shadow","ANSI-Compact","ASCII 12","ASCII 9","ASCII New Roman","Acrobatic","Alligator","Alligator2","Alpha","Alphabet","Arrows","Avatar","B1FF","Babyface Lame","Babyface Leet","Banner","Banner3-D","Banner3","Banner4","Barbwire","Basic","Bear","Bell","Benjamin","Big ASCII 12","Big ASCII 9","Big Chief","Big Money-ne","Big Money-nw","Big Money-se","Big Money-sw","Big Mono 12","Big Mono 9","Big","Bigfig","Binary","Block","Blocks","Bloody","BlurVision ASCII","Bolger","Braced","Bright","Broadway KB","Broadway","Bubble","Bulbhead","Caligraphy","Caligraphy2","Calvin S","Cards","Catwalk","Chiseled","Chunky","Circle","Coinstak","Cola","Colossal","Computer","Contessa","Contrast","Cosmike","Cosmike2","Crawford","Crawford2","Crazy","Cricket","Cursive","Cyberlarge","Cybermedium","Cybersmall","Cygnet","DANC4","DOS Rebel","DWhistled","Dancing Font","Decimal","Def Leppard","Delta Corps Priest 1","DiamFont","Diamond","Diet Cola","Digital","Doh","Doom","Dot Matrix","Double Shorts","Double","Dr Pepper","Efti Chess","Efti Font","Efti Italic","Efti Piti","Efti Robot","Efti Wall","Efti Water","Electronic","Elite","Emboss 2","Emboss","Epic","Fender","Filter","Fire Font-k","Fire Font-s","Flipped","Flower Power","Four Tops","Fraktur","Fun Face","Fun Faces","Future","Fuzzy","Georgi16","Georgia11","Ghost","Ghoulish","Glenyn","Goofy","Gothic","Graceful","Gradient","Graffiti","Greek","Heart Left","Heart Right","Henry 3D","Hex","Hieroglyphs","Hollywood","Horizontal Left","Horizontal Right","ICL-1900","Impossible","Invita","Isometric1","Isometric2","Isometric3","Isometric4","Italic","Ivrit","JS Block Letters","JS Bracket Letters","JS Capital Curves","JS Cursive","JS Stick Letters","Jacky","Jazmine","Jerusalem","Katakana","Kban","Keyboard","Knob","Konto Slant","Konto","LCD","Larry 3D 2","Larry 3D","Lean","Letter","Letters","Lil Devil","Line Blocks","Linux","Lockergnome","Madrid","Marquee","Maxfour","Merlin1","Merlin2","Mike","Mini","Mirror","Mnemonic","Modular","Mono 12","Mono 9","Morse","Morse2","Moscow","Mshebrew210","Muzzle","NScript","NT Greek","NV Script","Nancyj-Fancy","Nancyj-Improved","Nancyj-Underlined","Nancyj","Nipples","O8","OS2","Octal","Ogre","Old Banner","Pagga","Patorjk's Cheese","Patorjk-HeX","Pawp","Peaks Slant","Peaks","Pebbles","Pepper","Poison","Puffy","Puzzle","Pyramid","Rammstein","Rebel","Rectangles","Red Phoenix","Relief","Relief2","Reverse","Roman","Rot13","Rotated","Rounded","Rowan Cap","Rozzo","RubiFont","Runic","Runyc","S Blood","SL Script","Santa Clara","Script","Serifcap","Shaded Blocky","Shadow","Shimrod","Short","Slant Relief","Slant","Slide","Small ASCII 12","Small ASCII 9","Small Block","Small Braille","Small Caps","Small Isometric1","Small Keyboard","Small Mono 12","Small Mono 9","Small Poison","Small Script","Small Shadow","Small Slant","Small Tengwar","Small","Soft","Speed","Spliff","Stacey","Stampate","Stampatello","Standard","Star Strips","Star Wars","Stellar","Stforek","Stick Letters","Stop","Straight","Stronger Than All","Sub-Zero","Swamp Land","Swan","Sweet","THIS","Tanja","Tengwar","Term","Terrace","Test1","The Edge","Thick","Thin","Thorned","Three Point","Ticks Slant","Ticks","Tiles","Tinker-Toy","Tmplr","Tombstone","Train","Trek","Tsalagi","Tubular","Twisted","Two Point","USA Flag","Univers","Upside Down Text","Varsity","Wavescape","Wavy","Weird","Wet Letter","Whimsy","WideTerm","Wow","miniwi"];function na(_){return/[.*+?^${}()|[\]\\]/.test(_)?"\\"+_:_}const Xn=(()=>{const{FULL_WIDTH:_=0,FITTING:$,SMUSHING:e,CONTROLLED_SMUSHING:t}=ea,n={},r={font:"Standard",fontPath:"./fonts",fetchFontIfMissing:!0};function i(L,A,a){const s=na(L.trim().slice(-1))||"@",l=A===a-1?new RegExp(s+s+"?\\s*$"):new RegExp(s+"\\s*$");return L.replace(l,"")}function T(L=-1,A=null){let a={},s,l=[[16384,"vLayout",e],[8192,"vLayout",$],[4096,"vRule5",!0],[2048,"vRule4",!0],[1024,"vRule3",!0],[512,"vRule2",!0],[256,"vRule1",!0],[128,"hLayout",e],[64,"hLayout",$],[32,"hRule6",!0],[16,"hRule5",!0],[8,"hRule4",!0],[4,"hRule3",!0],[2,"hRule2",!0],[1,"hRule1",!0]];s=A!==null?A:L;for(const[c,h,f]of l)s>=c?(s-=c,a[h]===void 0&&(a[h]=f)):h!=="vLayout"&&h!=="hLayout"&&(a[h]=!1);return typeof a.hLayout>"u"?L===0?a.hLayout=$:L===-1?a.hLayout=_:a.hRule1||a.hRule2||a.hRule3||a.hRule4||a.hRule5||a.hRule6?a.hLayout=t:a.hLayout=e:a.hLayout===e&&(a.hRule1||a.hRule2||a.hRule3||a.hRule4||a.hRule5||a.hRule6)&&(a.hLayout=t),typeof a.vLayout>"u"?a.vRule1||a.vRule2||a.vRule3||a.vRule4||a.vRule5?a.vLayout=t:a.vLayout=_:a.vLayout===e&&(a.vRule1||a.vRule2||a.vRule3||a.vRule4||a.vRule5)&&(a.vLayout=t),a}function o(L,A,a=""){return L===A&&L!==a?L:!1}function E(L,A){let a="|/\\[]{}()<>";if(L==="_"){if(a.indexOf(A)!==-1)return A}else if(A==="_"&&a.indexOf(L)!==-1)return L;return!1}function I(L,A){let a="| /\\ [] {} () <>",s=a.indexOf(L),l=a.indexOf(A);if(s!==-1&&l!==-1&&s!==l&&Math.abs(s-l)!==1){const c=Math.max(s,l),h=c+1;return a.substring(c,h)}return!1}function R(L,A){let a="[] {} ()",s=a.indexOf(L),l=a.indexOf(A);return s!==-1&&l!==-1&&Math.abs(s-l)<=1?"|":!1}function u(L,A){return{"/\\":"|","\\/":"Y","><":"X"}[L+A]||!1}function p(L,A,a=""){return L===a&&A===a?a:!1}function C(L,A){return L===A?L:!1}function S(L,A){return E(L,A)}function d(L,A){return I(L,A)}function M(L,A){return L==="-"&&A==="_"||L==="_"&&A==="-"?"=":!1}function y(L,A){return L==="|"&&A==="|"?"|":!1}function P(L,A,a){return A===" "||A===""||A===a&&L!==" "?L:A}function v(L,A,a){if(a.fittingRules&&a.fittingRules.vLayout===_)return"invalid";let s,l=Math.min(L.length,A.length),c,h,f=!1,N;if(l===0)return"invalid";for(s=0;s<l;s++)if(c=L.substring(s,s+1),h=A.substring(s,s+1),c!==" "&&h!==" "){if(a.fittingRules&&a.fittingRules.vLayout===$)return"invalid";if(a.fittingRules&&a.fittingRules.vLayout===e)return"end";if(y(c,h)){f=f||!1;continue}if(N=!1,N=a.fittingRules&&a.fittingRules.vRule1?C(c,h):N,N=!N&&a.fittingRules&&a.fittingRules.vRule2?S(c,h):N,N=!N&&a.fittingRules&&a.fittingRules.vRule3?d(c,h):N,N=!N&&a.fittingRules&&a.fittingRules.vRule4?M(c,h):N,f=!0,!N)return"invalid"}return f?"end":"valid"}function G(L,A,a){let s=L.length,l=L.length,c,h,f,N=1,g,O,m;for(;N<=s;){for(c=L.slice(Math.max(0,l-N),l),h=A.slice(0,Math.min(s,N)),f=h.length,m="",g=0;g<f;g++)if(O=v(c[g],h[g],a),O==="end")m=O;else if(O==="invalid"){m=O;break}else m===""&&(m="valid");if(m==="invalid"){N--;break}if(m==="end")break;m==="valid"&&N++}return Math.min(s,N)}function I_(L,A,a){let s,l=Math.min(L.length,A.length),c,h,f="",N;const g=a.fittingRules||{};for(s=0;s<l;s++)c=L.substring(s,s+1),h=A.substring(s,s+1),c!==" "&&h!==" "?g.vLayout===$||g.vLayout===e?f+=P(c,h):(N=!1,N=g.vRule5?y(c,h):N,N=!N&&g.vRule1?C(c,h):N,N=!N&&g.vRule2?S(c,h):N,N=!N&&g.vRule3?d(c,h):N,N=!N&&g.vRule4?M(c,h):N,f+=N):f+=P(c,h);return f}function L$(L,A,a,s){let l=L.length,c=A.length,h=L.slice(0,Math.max(0,l-a)),f=L.slice(Math.max(0,l-a),l),N=A.slice(0,Math.min(a,c)),g,O,m,H=[],x;for(O=f.length,g=0;g<O;g++)g>=c?m=f[g]:m=I_(f[g],N[g],s),H.push(m);return x=A.slice(Math.min(a,c),c),[...h,...H,...x]}function E$(L,A){const a=" ".repeat(A);return L.map(s=>s+a)}function we(L,A,a){let s=L[0].length,l=A[0].length,c;return s>l?A=E$(A,s-l):l>s&&(L=E$(L,l-s)),c=G(L,A,a),L$(L,A,c,a)}function Ue(L,A,a){const s=a.fittingRules||{};if(s.hLayout===_)return 0;let l,c=L.length,h=A.length,f=c,N=1,g=!1,O,m,H,x;if(c===0)return 0;_:for(;N<=f;){const j=c-N;for(O=L.substring(j,j+N),m=A.substring(0,Math.min(N,h)),l=0;l<Math.min(N,h);l++)if(H=O.substring(l,l+1),x=m.substring(l,l+1),H!==" "&&x!==" "){if(s.hLayout===$){N=N-1;break _}else if(s.hLayout===e){(H===a.hardBlank||x===a.hardBlank)&&(N=N-1);break _}else if(g=!0,!(s.hRule1&&o(H,x,a.hardBlank)||s.hRule2&&E(H,x)||s.hRule3&&I(H,x)||s.hRule4&&R(H,x)||s.hRule5&&u(H,x)||s.hRule6&&p(H,x,a.hardBlank))){N=N-1;break _}}if(g)break;N++}return Math.min(f,N)}function Ge(L,A,a,s){let l,c,h=[],f,N,g,O,m,H,x,j;const F=s.fittingRules||{};if(typeof s.height!="number")throw new Error("height is not defined.");for(l=0;l<s.height;l++){x=L[l],j=A[l],m=x.length,H=j.length,f=m-a,N=x.slice(0,Math.max(0,f)),g="";const B_=Math.max(0,m-a);let Y=x.substring(B_,B_+a),l_=j.substring(0,Math.min(a,H));for(c=0;c<a;c++){let k=c<m?Y.substring(c,c+1):" ",B=c<H?l_.substring(c,c+1):" ";if(k!==" "&&B!==" ")if(F.hLayout===$||F.hLayout===e)g+=P(k,B,s.hardBlank);else{const Va=F.hRule1&&o(k,B,s.hardBlank)||F.hRule2&&E(k,B)||F.hRule3&&I(k,B)||F.hRule4&&R(k,B)||F.hRule5&&u(k,B)||F.hRule6&&p(k,B,s.hardBlank)||P(k,B,s.hardBlank);g+=Va}else g+=P(k,B,s.hardBlank)}a>=H?O="":O=j.substring(a,a+Math.max(0,H-a)),h[l]=N+g+O}return h}function g_(L){return new Array(L).fill("")}const F_=function(L){return Math.max(...L.map(A=>A.length))};function m_(L,A,a){return L.reduce(function(s,l){return Ge(s,l.fig,l.overlap||0,a)},g_(A))}function Ua(L,A,a){for(let s=L.length-1;s>0;s--){const l=m_(L.slice(0,s),A,a);if(F_(l)<=a.width)return{outputFigText:l,chars:L.slice(s)}}return{outputFigText:g_(A),chars:L}}function Ga(L,A,a){let s,l,c=0,h,f,N,g=a.height,O=[],m,H={chars:[],overlap:c},x=[],j,F,B_,Y,l_;if(typeof g!="number")throw new Error("height is not defined.");f=g_(g);const k=a.fittingRules||{};for(a.printDirection===1&&(L=L.split("").reverse().join("")),N=L.length,s=0;s<N;s++)if(j=L.substring(s,s+1),F=j.match(/\s/),l=A[j.charCodeAt(0)],Y=null,l){if(k.hLayout!==_){for(c=1e4,h=0;h<g;h++)c=Math.min(c,Ue(f[h],l[h],a));c=c===1e4?0:c}if(a.width>0&&(a.whitespaceBreak?(B_=m_(H.chars.concat([{fig:l,overlap:c}]),g,a),Y=m_(x.concat([{fig:B_,overlap:H.overlap}]),g,a),m=F_(Y)):(Y=Ge(f,l,c,a),m=F_(Y)),m>=a.width&&s>0&&(a.whitespaceBreak?(f=m_(x.slice(0,-1),g,a),x.length>1&&(O.push(f),f=g_(g)),x=[]):(O.push(f),f=g_(g)))),a.width>0&&a.whitespaceBreak&&((!F||s===N-1)&&H.chars.push({fig:l,overlap:c}),F||s===N-1)){for(l_=null;Y=m_(H.chars,g,a),m=F_(Y),m>=a.width;)l_=Ua(H.chars,g,a),H={chars:l_.chars},O.push(l_.outputFigText);m>0&&(l_?x.push({fig:Y,overlap:1}):x.push({fig:Y,overlap:H.overlap})),F&&(x.push({fig:l,overlap:c}),f=g_(g)),s===N-1&&(f=m_(x,g,a)),H={chars:[],overlap:c};continue}f=Ge(f,l,c,a)}return F_(f)>0&&O.push(f),a.showHardBlanks||O.forEach(function(B){for(N=B.length,h=0;h<N;h++)B[h]=B[h].replace(new RegExp("\\"+a.hardBlank,"g")," ")}),L===""&&O.length===0&&O.push(new Array(g).fill("")),O}const Fa=function(L,A){let a;const s=A.fittingRules||{};if(L==="default")a={hLayout:s.hLayout,hRule1:s.hRule1,hRule2:s.hRule2,hRule3:s.hRule3,hRule4:s.hRule4,hRule5:s.hRule5,hRule6:s.hRule6};else if(L==="full")a={hLayout:_,hRule1:!1,hRule2:!1,hRule3:!1,hRule4:!1,hRule5:!1,hRule6:!1};else if(L==="fitted")a={hLayout:$,hRule1:!1,hRule2:!1,hRule3:!1,hRule4:!1,hRule5:!1,hRule6:!1};else if(L==="controlled smushing")a={hLayout:t,hRule1:!0,hRule2:!0,hRule3:!0,hRule4:!0,hRule5:!0,hRule6:!0};else if(L==="universal smushing")a={hLayout:e,hRule1:!1,hRule2:!1,hRule3:!1,hRule4:!1,hRule5:!1,hRule6:!1};else return;return a},Ba=function(L,A){let a={};const s=A.fittingRules||{};if(L==="default")a={vLayout:s.vLayout,vRule1:s.vRule1,vRule2:s.vRule2,vRule3:s.vRule3,vRule4:s.vRule4,vRule5:s.vRule5};else if(L==="full")a={vLayout:_,vRule1:!1,vRule2:!1,vRule3:!1,vRule4:!1,vRule5:!1};else if(L==="fitted")a={vLayout:$,vRule1:!1,vRule2:!1,vRule3:!1,vRule4:!1,vRule5:!1};else if(L==="controlled smushing")a={vLayout:t,vRule1:!0,vRule2:!0,vRule3:!0,vRule4:!0,vRule5:!0};else if(L==="universal smushing")a={vLayout:e,vRule1:!1,vRule2:!1,vRule3:!1,vRule4:!1,vRule5:!1};else return;return a},Jn=function(L,A,a){a=a.replace(/\r\n/g,`
`).replace(/\r/g,`
`);let s=a.split(`
`),l=[],c,h,f;for(h=s.length,c=0;c<h;c++)l=l.concat(Ga(s[c],n[L],A));for(h=l.length,f=l[0],c=1;c<h;c++)f=we(f,l[c],A);return f?f.join(`
`):""};function Zn(L,A){let a;if(typeof structuredClone<"u"?a=structuredClone(L):a=JSON.parse(JSON.stringify(L)),a.showHardBlanks=A.showHardBlanks||!1,a.width=A.width||-1,a.whitespaceBreak=A.whitespaceBreak||!1,A.horizontalLayout){const s=Fa(A.horizontalLayout,L);s&&Object.assign(a.fittingRules,s)}if(A.verticalLayout){const s=Ba(A.verticalLayout,L);s&&Object.assign(a.fittingRules,s)}return a.printDirection=A.printDirection!==null&&A.printDirection!==void 0?A.printDirection:L.printDirection,a}const w=async function(L,A,a){return w.text(L,A,a)};return w.text=async function(L,A,a){L=L+"";let s,l;typeof A=="function"?(l=A,s={font:r.font}):typeof A=="string"?(s={font:A},l=a):A?(s=A,l=a):(s={font:r.font},l=a);const c=s.font||r.font;try{const h=await w.loadFont(c),f=h?Jn(c,Zn(h,s),L):"";return l&&l(null,f),f}catch(h){const f=h instanceof Error?h:new Error(String(h));if(l)return l(f),"";throw f}},w.textSync=function(L,A){L=L+"",typeof A=="string"?A={font:A}:A=A||{};const a=A.font||r.font;let s=Zn(w.loadFontSync(a),A);return Jn(a,s,L)},w.metadata=async function(L,A){L=L+"";try{const a=await w.loadFont(L);if(!a)throw new Error("Error loading font.");const s=n[L]||{},l=[a,s.comment||""];return A&&A(null,a,s.comment),l}catch(a){const s=a instanceof Error?a:new Error(String(a));if(A)return A(s),null;throw s}},w.defaults=function(L){return L&&typeof L=="object"&&Object.assign(r,L),typeof structuredClone<"u"?structuredClone(r):JSON.parse(JSON.stringify(r))},w.parseFont=function(L,A,a=!0){if(n[L]&&!a)return n[L].options;A=A.replace(/\r\n/g,`
`).replace(/\r/g,`
`);const s=new ta,l=A.split(`
`),c=l.shift();if(!c)throw new Error("Invalid font file: missing header");const h=c.split(" "),f={hardBlank:h[0].substring(5,6),height:parseInt(h[1],10),baseline:parseInt(h[2],10),maxLength:parseInt(h[3],10),oldLayout:parseInt(h[4],10),numCommentLines:parseInt(h[5],10),printDirection:h[6]?parseInt(h[6],10):0,fullLayout:h[7]?parseInt(h[7],10):null,codeTagCount:h[8]?parseInt(h[8],10):null};if((f.hardBlank||"").length!==1||[f.height,f.baseline,f.maxLength,f.oldLayout,f.numCommentLines].some(O=>O==null||isNaN(O)))throw new Error("FIGlet header contains invalid values.");if(f.height==null||f.numCommentLines==null)throw new Error("FIGlet header contains invalid values.");f.fittingRules=T(f.oldLayout,f.fullLayout),s.options=f;const g=[];for(let O=32;O<=126;O++)g.push(O);if(g.push(196,214,220,228,246,252,223),l.length<f.numCommentLines+f.height*g.length)throw new Error(`FIGlet file is missing data. Line length: ${l.length}. Comment lines: ${f.numCommentLines}. Height: ${f.height}. Num chars: ${g.length}.`);for(s.comment=l.splice(0,f.numCommentLines).join(`
`),s.numChars=0;l.length>0&&s.numChars<g.length;){const O=g[s.numChars];s[O]=l.splice(0,f.height);for(let m=0;m<f.height;m++)typeof s[O][m]>"u"?s[O][m]="":s[O][m]=i(s[O][m],m,f.height);s.numChars++}for(;l.length>0;){const O=l.shift();if(!O||O.trim()==="")break;let m=O.split(" ")[0],H;if(/^-?0[xX][0-9a-fA-F]+$/.test(m))H=parseInt(m,16);else if(/^-?0[0-7]+$/.test(m))H=parseInt(m,8);else if(/^-?[0-9]+$/.test(m))H=parseInt(m,10);else throw new Error(`Error parsing data. Invalid data: ${m}`);if(H===-1||H<-2147483648||H>2147483647){const x=H===-1?"The char code -1 is not permitted.":`The char code cannot be ${H<-2147483648?"less than -2147483648":"greater than 2147483647"}.`;throw new Error(`Error parsing data. ${x}`)}s[H]=l.splice(0,f.height);for(let x=0;x<f.height;x++)typeof s[H][x]>"u"?s[H][x]="":s[H][x]=i(s[H][x],x,f.height);s.numChars++}return n[L]=s,f},w.loadedFonts=()=>Object.keys(n),w.clearLoadedFonts=()=>{Object.keys(n).forEach(L=>{delete n[L]})},w.loadFont=async function(L,A){if(n[L]){const a=n[L].options;return A&&A(null,a),Promise.resolve(a)}try{if(!r.fetchFontIfMissing)throw new Error(`Font is not loaded: ${L}`);const a=await fetch(`${r.fontPath}/${L}.flf`);if(!a.ok)throw new Error(`Network response was not ok: ${a.status}`);const s=await a.text(),l=w.parseFont(L,s);return A&&A(null,l),l}catch(a){const s=a instanceof Error?a:new Error(String(a));if(A)return A(s),null;throw s}},w.loadFontSync=function(L){if(n[L])return n[L].options;throw new Error("Synchronous font loading is not implemented for the browser, it will only work for fonts already loaded.")},w.preloadFonts=async function(L,A){try{for(const a of L){const s=await fetch(`${r.fontPath}/${a}.flf`);if(!s.ok)throw new Error(`Failed to preload fonts. Error fetching font: ${a}, status code: ${s.statusText}`);const l=await s.text();w.parseFont(a,l)}A&&A()}catch(a){const s=a instanceof Error?a:new Error(String(a));if(A){A(s);return}throw a}},w.fonts=function(L){return new Promise(function(A,a){A(Pe),L&&L(null,Pe)})},w.fontsSync=function(){return Pe},w.figFonts=n,w})();let jn=!1,a$=null;function ra(){return jn?Promise.resolve():a$||(a$=(async()=>{const[{default:_},{default:$},{default:e},{default:t},{default:n},{default:r},{default:i},{default:T},{default:o},{default:E},{default:I},{default:R}]=await Promise.all([Promise.resolve().then(()=>ma),Promise.resolve().then(()=>Oa),Promise.resolve().then(()=>Ha),Promise.resolve().then(()=>Ma),Promise.resolve().then(()=>Pa),Promise.resolve().then(()=>xa),Promise.resolve().then(()=>ya),Promise.resolve().then(()=>Wa),Promise.resolve().then(()=>Da),Promise.resolve().then(()=>va),Promise.resolve().then(()=>ba),Promise.resolve().then(()=>wa)]);[["Standard",R],["Banner",_],["Big",$],["Block",e],["Doom",t],["Lean",n],["Mini",r],["Script",i],["Shadow",T],["Slant",o],["Small",E],["Speed",I]].forEach(([p,C])=>{Xn.parseFont(p,C)}),jn=!0})(),a$)}function ia(){$_.data("asciiTitle",(_="",$="Standard")=>({asciiArt:"",font:$,async init(){this.title&&(await ra(),Xn.text(this.title,{font:this.font||"Standard",horizontalLayout:"default",verticalLayout:"default"},(e,t)=>{!e&&t&&(this.asciiArt=t)}))},title:_}))}function Ta(){$_.data("fileListNav",()=>({focusInHandler:null,items:[],keydownHandler:null,pjaxSendHandler:null,selectedIndex:-1,bindListeners(){this.keydownHandler=_=>this.handleKeydown(_),this.focusInHandler=_=>this.handleFocusIn(_),window.addEventListener("keydown",this.keydownHandler),window.addEventListener("focusin",this.focusInHandler)},destroy(){this.unbindListeners(),this.pjaxSendHandler&&(document.removeEventListener("pjax:send",this.pjaxSendHandler),this.pjaxSendHandler=null)},handleFocusIn(_){const $=_.target;$&&($.tagName==="INPUT"||$.tagName==="TEXTAREA")&&(this.selectedIndex=-1)},handleKeydown(_){const $=_.target;if(!$||$.tagName==="INPUT"||$.tagName==="TEXTAREA"||this.items.length===0)return;if(_.key==="ArrowDown"){_.preventDefault(),this.selectedIndex=(this.selectedIndex+1)%this.items.length,this.scrollToSelected();return}if(_.key==="ArrowUp"){_.preventDefault(),this.selectedIndex=(this.selectedIndex-1+this.items.length)%this.items.length,this.scrollToSelected();return}if(_.key!=="Enter"||(_.preventDefault(),this.selectedIndex<0||this.selectedIndex>=this.items.length))return;const e=this.items[this.selectedIndex],t=e instanceof HTMLAnchorElement?e:e.querySelector("a");t?.href&&C_(t.href)},init(){this.items=Array.from(this.$el.querySelectorAll("[data-nav-item]")),this.items.length>0&&(this.selectedIndex=0),this.bindListeners(),this.pjaxSendHandler=()=>this.unbindListeners(),document.addEventListener("pjax:send",this.pjaxSendHandler)},scrollToSelected(){const _=this.items[this.selectedIndex];_&&_.scrollIntoView({behavior:"smooth",block:"nearest"})},unbindListeners(){this.keydownHandler&&(window.removeEventListener("keydown",this.keydownHandler),this.keydownHandler=null),this.focusInHandler&&(window.removeEventListener("focusin",this.focusInHandler),this.focusInHandler=null)}}))}function aa(){$_.data("postViewer",()=>({keydownHandler:null,pjaxSendHandler:null,destroy(){this.unbindListeners(),this.pjaxSendHandler&&(document.removeEventListener("pjax:send",this.pjaxSendHandler),this.pjaxSendHandler=null)},handleKeydown(_){const $=_.target;if(!$||$.tagName==="INPUT"||$.tagName==="TEXTAREA")return;const e=document.getElementById("main");if(e)switch(_.key){case"ArrowDown":case"j":_.preventDefault(),e.scrollBy({behavior:"smooth",top:this.scrollAmount});break;case"ArrowUp":case"k":_.preventDefault(),e.scrollBy({behavior:"smooth",top:-this.scrollAmount});break;case" ":case"PageDown":_.preventDefault(),e.scrollBy({behavior:"smooth",top:e.clientHeight*.8});break;case"End":_.preventDefault(),e.scrollTo({behavior:"smooth",top:e.scrollHeight});break;case"Home":_.preventDefault(),e.scrollTo({behavior:"smooth",top:0});break;case"PageUp":_.preventDefault(),e.scrollBy({behavior:"smooth",top:-e.clientHeight*.8});break}},init(){this.keydownHandler=_=>this.handleKeydown(_),window.addEventListener("keydown",this.keydownHandler),this.pjaxSendHandler=()=>this.unbindListeners(),document.addEventListener("pjax:send",this.pjaxSendHandler)},scrollAmount:100,unbindListeners(){this.keydownHandler&&(window.removeEventListener("keydown",this.keydownHandler),this.keydownHandler=null)}}))}function xe(_){return _.spec?.displayName||_.spec?.slug||_.metadata?.name||"unknown"}function o$(_){return _.spec?.slug||_.metadata?.name||xe(_)}function Yn(_){return _.spec?.title||_.spec?.slug||_.metadata?.name||"untitled"}function oa(_){return _.spec?.slug||_.metadata?.name||Yn(_)}function sa(_){return(_||"unknown").replaceAll("/","-")}function G_(_){return sa(_?.slug||_?.title||_?.displayName||"unknown")}function La(){return window.haloData?.user||"user"}function ye(_){return _.map($=>({date:$.spec?.publishTime||$.metadata?.creationTimestamp||null,name:Yn($),permalink:$.status?.permalink||null,slug:oa($),type:"file"}))}function We(_){if(_==="~/blog")return[{count:window.haloData?.categories.length||0,name:"categories",type:"dir"},{count:window.haloData?.tags.length||0,name:"tags",type:"dir"},...ye(window.haloData?.homePosts||[])];if(_==="~/blog/categories")return(window.haloData?.categories||[]).map($=>({count:$.postCount||0,date:$.metadata?.creationTimestamp||null,name:xe($),permalink:$.status?.permalink||null,slug:o$($),type:"dir"}));if(_==="~/blog/tags")return(window.haloData?.tags||[]).map($=>({count:$.postCount||0,date:$.metadata?.creationTimestamp||null,name:xe($),permalink:$.status?.permalink||null,slug:o$($),type:"dir"}));if(_.startsWith("~/blog/categories/")){const $=_.slice(18),e=G_(window.haloData?.currentCategory);return window.haloData?.pageType==="category"&&e===$?ye(window.haloData.currentPosts):null}if(_.startsWith("~/blog/tags/")){const $=_.slice(12),e=G_(window.haloData?.currentTag);return window.haloData?.pageType==="tag"&&e===$?ye(window.haloData.currentPosts):null}return null}function qn(_){let $=_;$==="~"?$="~/blog":$.startsWith("~/")&&!$.startsWith("~/blog")&&($=`~/blog${$.slice(1)}`),$.startsWith("~/blog")||($=$.startsWith("/")?`~/blog${$}`:`~/blog/${$}`);const e=[];return $.split("/").forEach(t=>{if(!(!t||t===".")){if(t===".."){e.length>2&&e.pop();return}e.push(t)}}),e.length<2?"~/blog":e.join("/")}function De(_,$){if(_.startsWith("/")||_.startsWith("~"))return qn(_);const e=$.endsWith("/")?$:`${$}/`;return qn(`${e}${_}`)}function Ea(_){if(_==="~/blog")return"~/blog";const $=_.split("/");return $.pop(),$.length<2?"~/blog":$.join("/")}function ve(_){if(_==="~/blog")return window.haloData?.urls.home||"/";if(_==="~/blog/categories")return window.haloData?.urls.categories||"/categories";if(_==="~/blog/tags")return window.haloData?.urls.tags||"/tags";if(_.startsWith("~/blog/categories/")){const $=_.slice(18);return(window.haloData?.categories||[]).find(t=>o$(t)===$)?.status?.permalink||null}if(_.startsWith("~/blog/tags/")){const $=_.slice(12);return(window.haloData?.tags||[]).find(t=>o$(t)===$)?.status?.permalink||null}return null}function be(){switch(window.haloData?.pageType){case"categories":return"~/blog/categories";case"category":return`~/blog/categories/${G_(window.haloData.currentCategory)}`;case"post":return`~/blog/${G_(window.haloData.currentPost)}`;case"tag":return`~/blog/tags/${G_(window.haloData.currentTag)}`;case"tags":return"~/blog/tags";default:return"~/blog"}}const Aa=["cd","ls","ll","pd","pu","npage","ppage","back","help","clear","search"],Ia=["cd","next","prev","back","help","clear"],la=new Set(["help","clear","back","next","prev","pd","pu","npage","ppage","ls","ll"]),ua=new Set(["cd","ls","ll"]);function ca(_,$,e){const t=_.toLowerCase();if(!_.includes(" "))return(e?Ia:Aa).filter(S=>S.startsWith(t)).map(S=>la.has(S)?S:`${S} `);const n=_.indexOf(" "),r=_.slice(0,n).toLowerCase(),i=_.slice(n+1);if(!ua.has(r))return[];const T=i.lastIndexOf("/"),o=T>=0?i.slice(0,T+1):"",I=(T>=0?i.slice(T+1):i).toLowerCase(),R=o?De(o,$):$,u=We(R);if(!u)return[];const p=[];return u.forEach(C=>{if(!C.name.toLowerCase().startsWith(I))return;const S=C.type==="dir"?"/":"";p.push(`${r} ${o}${C.name}${S}`)}),!o&&"..".startsWith(I)&&p.push(`${r} ../`),!o&&"~".startsWith(I)&&p.push(`${r} ~/`),p}const fa=`
List Page Commands:
  ls            - List directory contents
  cd <path>     - Navigate to path
  pd / npage    - Next page
  pu / ppage    - Previous page
  back          - Browser back
  help          - Show this help
  clear         - Clear output
  search        - Open search

Navigation:
  ↑/↓           - Command history
  Tab           - Auto-complete
  Enter         - Execute
`.trim(),Ra=`
Post Page Commands:
  cd ..         - Go back to list
  next          - Next article
  prev          - Previous article
  back          - Browser back
  help          - Show this help
  clear         - Clear output

Navigation:
  ↑/↓           - Command history
  Tab           - Auto-complete
  Enter         - Execute
`.trim();function da(_,$){if(!_||_===".")return{};if(_===".."||_==="../"){const i=Ea($),T=ve(i);return T?{navigate:T}:{newPath:i}}const e=De(_,$),t=We(e);if(!t){const i=ve(e);return i?{navigate:i}:{output:`cd: no such file or directory: ${_}`}}const n=t.find(i=>i.type==="file"&&i.name===_.split("/").pop());if(n?.permalink)return{navigate:n.permalink};const r=ve(e);return r?{navigate:r}:{newPath:e}}function zn(_,$){const e=_?De(_,$):$,t=We(e);if(!t)return`ls: cannot access '${e}': No such file or directory`;if(t.length===0)return"(empty directory)";const n=t.map(r=>{const i=r.type==="dir"?"drwxr-xr-x":"-rw-r--r--",T=r.type==="dir"?"-":"4.0K",o=r.date??"Mar 30 12:00",E=r.type==="dir"?"/":"";return`${i}  ${T} ${La()}  staff  ${o}  ${r.name}${E}`});return`Total ${t.length}
${n.join(`
`)}`}function Qn(_){const $=_==="next"?window.haloData?.nextPost:window.haloData?.prevPost;return $?(C_($),{}):{output:_==="next"?"No next article available.":"No previous article available."}}function s$(_){const $=window.haloData?.pagination;if(!$)return{output:"Pagination not available on this page."};const e=_?$.nextUrl:$.prevUrl;return e?(C_(e),{}):{output:_?"Already at the last page.":"Already at the first page."}}function ha(_){if(!_){const $=window.SearchWidget;return typeof $<"u"&&$&&typeof $.open=="function"?$.open():C_("/search"),{}}return C_(`/search?keyword=${encodeURIComponent(_)}`),{}}const Sa=new Map([["back",()=>(window.history.back(),{})],["cd",(_,$)=>da(_,$)],["clear",()=>({})],["help",()=>({showHelp:!0})],["ll",(_,$)=>({output:zn(_,$)})],["ls",(_,$)=>({output:zn(_,$)})],["next",()=>Qn("next")],["npage",()=>s$(!0)],["pd",()=>s$(!0)],["ppage",()=>s$(!1)],["prev",()=>Qn("prev")],["pu",()=>s$(!1)],["search",_=>ha(_)]]);async function Na(_,$,e){const t=Sa.get(_.toLowerCase());return t?t($,e):{output:`bash: ${_}: command not found. Type 'help' for available commands.`}}function Ca(){$_.data("terminalInput",(_="~/blog")=>({command:"",completionState:{candidates:[],index:0},currentPath:_,history:[],historyIndex:-1,output:"",showHelp:!1,autoComplete(){const $=this.command,e=this.completionState.candidates[this.completionState.index];this.completionState.candidates.length>0&&$===e?this.completionState.index=(this.completionState.index+1)%this.completionState.candidates.length:(this.completionState.candidates=ca($,String(this.currentPath),this.isPostPage()),this.completionState.index=0),this.completionState.candidates.length>0&&(this.command=this.completionState.candidates[this.completionState.index])},async executeCommand(){const $=this.command.trim();if(!$)return;this.history[this.history.length-1]!==$&&this.history.push($),this.historyIndex=this.history.length;const[e,...t]=$.split(/\s+/),n=t.join(" ");this.showHelp=!1,this.output="",(e.toLowerCase()==="ls"||e.toLowerCase()==="ll")&&(this.output="Loading...",await new Promise(i=>window.setTimeout(i,50)));const r=await Na(e,n,String(this.currentPath));this.applyResult(r),this.command=""},applyResult($){$.navigate?C_($.navigate):$.newPath?(this.currentPath=$.newPath,this.output=""):$.showHelp?this.showHelp=!0:$.output&&(this.output=$.output)},get helpText(){return this.isPostPage()?Ra:fa},handleKeydown($){if(!$.isComposing)switch($.key){case"ArrowDown":$.preventDefault(),this.navigateHistory(1);break;case"ArrowUp":$.preventDefault(),this.navigateHistory(-1);break;case"Enter":$.preventDefault(),this.executeCommand();break;case"Escape":$.preventDefault(),this.command="",this.output="",this.showHelp=!1,this.$refs.cmdInput?.blur();break;case"Tab":$.preventDefault(),this.autoComplete();break}},init(){this.currentPath=be(),document.addEventListener("pjax:complete",()=>{this.currentPath=be()}),window.addEventListener("popstate",()=>{this.currentPath=be()}),this.$nextTick(()=>{this.$refs.cmdInput?.focus()})},isPostPage(){return window.haloData?.pageType==="post"},navigateHistory($){if(this.history.length!==0){if(this.historyIndex+=$,this.historyIndex<0&&(this.historyIndex=0),this.historyIndex>=this.history.length){this.historyIndex=this.history.length,this.command="";return}this.command=this.history[this.historyIndex]}}}))}function pa(){$_.data("typewriter",(_="",$=50)=>({_timerId:null,destroy(){this._timerId!==null&&(window.clearInterval(this._timerId),this._timerId=null)},display:"",init(){let e=0;this.display="";const t=typeof $=="number"?$:50;this._timerId=window.setInterval(()=>{if(e<this.text.length){this.display+=this.text.charAt(e),e+=1;return}this._timerId!==null&&(window.clearInterval(this._timerId),this._timerId=null)},t)},text:_}))}ia(),pa(),Ca(),Ta(),aa(),$a();const ma=Object.freeze(Object.defineProperty({__proto__:null,default:`flf2a$ 8 7 54 0 12 0 64 185
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
`},Symbol.toStringTag,{value:"Module"})),Oa=Object.freeze(Object.defineProperty({__proto__:null,default:`flf2a$ 8 6 59 15 10 0 24463
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
`},Symbol.toStringTag,{value:"Module"})),Ha=Object.freeze(Object.defineProperty({__proto__:null,default:`flf2a$ 8 6 27 0 10 0 576
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
`},Symbol.toStringTag,{value:"Module"})),Ma=Object.freeze(Object.defineProperty({__proto__:null,default:`flf2a$ 8 6 14 15 16
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
`},Symbol.toStringTag,{value:"Module"})),Pa=Object.freeze(Object.defineProperty({__proto__:null,default:`flf2a$ 8 6 27 0 10 0 576
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
`},Symbol.toStringTag,{value:"Module"})),xa=Object.freeze(Object.defineProperty({__proto__:null,default:`flf2a$ 4 3 10 0 10 0 1920
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
`},Symbol.toStringTag,{value:"Module"})),ya=Object.freeze(Object.defineProperty({__proto__:null,default:`flf2a$ 7 5 16 0 10 0 3904 96
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
`},Symbol.toStringTag,{value:"Module"})),Wa=Object.freeze(Object.defineProperty({__proto__:null,default:`flf2a$ 5 4 16 0 14 0 4992
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
`},Symbol.toStringTag,{value:"Module"})),Da=Object.freeze(Object.defineProperty({__proto__:null,default:`flf2a$ 6 5 16 15 10 0 18319
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
`},Symbol.toStringTag,{value:"Module"})),va=Object.freeze(Object.defineProperty({__proto__:null,default:`flf2a$ 5 4 13 15 10 0 22415
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
`},Symbol.toStringTag,{value:"Module"})),ba=Object.freeze(Object.defineProperty({__proto__:null,default:`flf2a$ 6 5 16 15 16
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
`},Symbol.toStringTag,{value:"Module"})),wa=Object.freeze(Object.defineProperty({__proto__:null,default:`flf2a$ 6 5 16 15 13 0 24463 229
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
