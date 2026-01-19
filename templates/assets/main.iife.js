(function(){"use strict";var r$=!1,T$=!1,e_=[],i$=-1;function Hn(_){Mn(_)}function Mn(_){e_.includes(_)||e_.push(_),xn()}function mn(_){let $=e_.indexOf(_);$!==-1&&$>i$&&e_.splice($,1)}function xn(){!T$&&!r$&&(r$=!0,queueMicrotask(Pn))}function Pn(){r$=!1,T$=!0;for(let _=0;_<e_.length;_++)e_[_](),i$=_;e_.length=0,i$=-1,T$=!1}var u_,t_,c_,Ce,L$=!0;function Wn(_){L$=!1,_(),L$=!0}function Dn(_){u_=_.reactive,c_=_.release,t_=$=>_.effect($,{scheduler:e=>{L$?Hn(e):e()}}),Ce=_.raw}function pe(_){t_=_}function yn(_){let $=()=>{};return[t=>{let n=t_(t);return _._x_effects||(_._x_effects=new Set,_._x_runEffects=()=>{_._x_effects.forEach(r=>r())}),_._x_effects.add(n),$=()=>{n!==void 0&&(_._x_effects.delete(n),c_(n))},n},()=>{$()}]}function ge(_,$){let e=!0,t,n=t_(()=>{let r=_();JSON.stringify(r),e?t=r:queueMicrotask(()=>{$(r,t),t=r}),e=!1});return()=>c_(n)}var Oe=[],He=[],Me=[];function Un(_){Me.push(_)}function o$(_,$){typeof $=="function"?(_._x_cleanups||(_._x_cleanups=[]),_._x_cleanups.push($)):($=_,He.push($))}function me(_){Oe.push(_)}function xe(_,$,e){_._x_attributeCleanups||(_._x_attributeCleanups={}),_._x_attributeCleanups[$]||(_._x_attributeCleanups[$]=[]),_._x_attributeCleanups[$].push(e)}function Pe(_,$){_._x_attributeCleanups&&Object.entries(_._x_attributeCleanups).forEach(([e,t])=>{($===void 0||$.includes(e))&&(t.forEach(n=>n()),delete _._x_attributeCleanups[e])})}function vn(_){for(_._x_effects?.forEach(mn);_._x_cleanups?.length;)_._x_cleanups.pop()()}var a$=new MutationObserver(I$),E$=!1;function s$(){a$.observe(document,{subtree:!0,childList:!0,attributes:!0,attributeOldValue:!0}),E$=!0}function We(){bn(),a$.disconnect(),E$=!1}var g_=[];function bn(){let _=a$.takeRecords();g_.push(()=>_.length>0&&I$(_));let $=g_.length;queueMicrotask(()=>{if(g_.length===$)for(;g_.length>0;)g_.shift()()})}function y(_){if(!E$)return _();We();let $=_();return s$(),$}var A$=!1,b_=[];function Gn(){A$=!0}function wn(){A$=!1,I$(b_),b_=[]}function I$(_){if(A$){b_=b_.concat(_);return}let $=[],e=new Set,t=new Map,n=new Map;for(let r=0;r<_.length;r++)if(!_[r].target._x_ignoreMutationObserver&&(_[r].type==="childList"&&(_[r].removedNodes.forEach(T=>{T.nodeType===1&&T._x_marker&&e.add(T)}),_[r].addedNodes.forEach(T=>{if(T.nodeType===1){if(e.has(T)){e.delete(T);return}T._x_marker||$.push(T)}})),_[r].type==="attributes")){let T=_[r].target,i=_[r].attributeName,o=_[r].oldValue,E=()=>{t.has(T)||t.set(T,[]),t.get(T).push({name:i,value:T.getAttribute(i)})},I=()=>{n.has(T)||n.set(T,[]),n.get(T).push(i)};T.hasAttribute(i)&&o===null?E():T.hasAttribute(i)?(I(),E()):I()}n.forEach((r,T)=>{Pe(T,r)}),t.forEach((r,T)=>{Oe.forEach(i=>i(T,r))});for(let r of e)$.some(T=>T.contains(r))||He.forEach(T=>T(r));for(let r of $)r.isConnected&&Me.forEach(T=>T(r));$=null,e=null,t=null,n=null}function De(_){return r_(n_(_))}function O_(_,$,e){return _._x_dataStack=[$,...n_(e||_)],()=>{_._x_dataStack=_._x_dataStack.filter(t=>t!==$)}}function n_(_){return _._x_dataStack?_._x_dataStack:typeof ShadowRoot=="function"&&_ instanceof ShadowRoot?n_(_.host):_.parentNode?n_(_.parentNode):[]}function r_(_){return new Proxy({objects:_},Fn)}var Fn={ownKeys({objects:_}){return Array.from(new Set(_.flatMap($=>Object.keys($))))},has({objects:_},$){return $==Symbol.unscopables?!1:_.some(e=>Object.prototype.hasOwnProperty.call(e,$)||Reflect.has(e,$))},get({objects:_},$,e){return $=="toJSON"?Bn:Reflect.get(_.find(t=>Reflect.has(t,$))||{},$,e)},set({objects:_},$,e,t){const n=_.find(T=>Object.prototype.hasOwnProperty.call(T,$))||_[_.length-1],r=Object.getOwnPropertyDescriptor(n,$);return r?.set&&r?.get?r.set.call(t,e)||!0:Reflect.set(n,$,e)}};function Bn(){return Reflect.ownKeys(this).reduce(($,e)=>($[e]=Reflect.get(this,e),$),{})}function l$(_){let $=t=>typeof t=="object"&&!Array.isArray(t)&&t!==null,e=(t,n="")=>{Object.entries(Object.getOwnPropertyDescriptors(t)).forEach(([r,{value:T,enumerable:i}])=>{if(i===!1||T===void 0||typeof T=="object"&&T!==null&&T.__v_skip)return;let o=n===""?r:`${n}.${r}`;typeof T=="object"&&T!==null&&T._x_interceptor?t[r]=T.initialize(_,o,r):$(T)&&T!==t&&!(T instanceof Element)&&e(T,o)})};return e(_)}function ye(_,$=()=>{}){let e={initialValue:void 0,_x_interceptor:!0,initialize(t,n,r){return _(this.initialValue,()=>Vn(t,n),T=>u$(t,n,T),n,r)}};return $(e),t=>{if(typeof t=="object"&&t!==null&&t._x_interceptor){let n=e.initialize.bind(e);e.initialize=(r,T,i)=>{let o=t.initialize(r,T,i);return e.initialValue=o,n(r,T,i)}}else e.initialValue=t;return e}}function Vn(_,$){return $.split(".").reduce((e,t)=>e[t],_)}function u$(_,$,e){if(typeof $=="string"&&($=$.split(".")),$.length===1)_[$[0]]=e;else{if($.length===0)throw error;return _[$[0]]||(_[$[0]]={}),u$(_[$[0]],$.slice(1),e)}}var Ue={};function X(_,$){Ue[_]=$}function H_(_,$){let e=Kn($);return Object.entries(Ue).forEach(([t,n])=>{Object.defineProperty(_,`$${t}`,{get(){return n($,e)},enumerable:!1})}),_}function Kn(_){let[$,e]=Ke(_),t={interceptor:ye,...$};return o$(_,e),t}function kn(_,$,e,...t){try{return e(...t)}catch(n){M_(n,_,$)}}function M_(..._){return ve(..._)}var ve=Yn;function Xn(_){ve=_}function Yn(_,$,e=void 0){_=Object.assign(_??{message:"No error message given."},{el:$,expression:e}),console.warn(`Alpine Expression Error: ${_.message}

${e?'Expression: "'+e+`"

`:""}`,$),setTimeout(()=>{throw _},0)}var R_=!0;function be(_){let $=R_;R_=!1;let e=_();return R_=$,e}function T_(_,$,e={}){let t;return G(_,$)(n=>t=n,e),t}function G(..._){return Ge(..._)}var Ge=Fe;function jn(_){Ge=_}var we;function qn(_){we=_}function Fe(_,$){let e={};H_(e,_);let t=[e,...n_(_)],n=typeof $=="function"?zn(t,$):Jn(t,$,_);return kn.bind(null,_,$,n)}function zn(_,$){return(e=()=>{},{scope:t={},params:n=[],context:r}={})=>{if(!R_){m_(e,$,r_([t,..._]),n);return}let T=$.apply(r_([t,..._]),n);m_(e,T)}}var c$={};function Qn(_,$){if(c$[_])return c$[_];let e=Object.getPrototypeOf(async function(){}).constructor,t=/^[\n\s]*if.*\(.*\)/.test(_.trim())||/^(let|const)\s/.test(_.trim())?`(async()=>{ ${_} })()`:_,r=(()=>{try{let T=new e(["__self","scope"],`with (scope) { __self.result = ${t} }; __self.finished = true; return __self.result;`);return Object.defineProperty(T,"name",{value:`[Alpine] ${_}`}),T}catch(T){return M_(T,$,_),Promise.resolve()}})();return c$[_]=r,r}function Jn(_,$,e){let t=Qn($,e);return(n=()=>{},{scope:r={},params:T=[],context:i}={})=>{t.result=void 0,t.finished=!1;let o=r_([r,..._]);if(typeof t=="function"){let E=t.call(i,t,o).catch(I=>M_(I,e,$));t.finished?(m_(n,t.result,o,T,e),t.result=void 0):E.then(I=>{m_(n,I,o,T,e)}).catch(I=>M_(I,e,$)).finally(()=>t.result=void 0)}}}function m_(_,$,e,t,n){if(R_&&typeof $=="function"){let r=$.apply(e,t);r instanceof Promise?r.then(T=>m_(_,T,e,t)).catch(T=>M_(T,n,$)):_(r)}else typeof $=="object"&&$ instanceof Promise?$.then(r=>_(r)):_($)}function Zn(..._){return we(..._)}function _r(_,$,e={}){let t={};H_(t,_);let n=[t,...n_(_)],r=r_([e.scope??{},...n]),T=e.params??[];if($.includes("await")){let i=Object.getPrototypeOf(async function(){}).constructor,o=/^[\n\s]*if.*\(.*\)/.test($.trim())||/^(let|const)\s/.test($.trim())?`(async()=>{ ${$} })()`:$;return new i(["scope"],`with (scope) { let __result = ${o}; return __result }`).call(e.context,r)}else{let i=/^[\n\s]*if.*\(.*\)/.test($.trim())||/^(let|const)\s/.test($.trim())?`(()=>{ ${$} })()`:$,E=new Function(["scope"],`with (scope) { let __result = ${i}; return __result }`).call(e.context,r);return typeof E=="function"&&R_?E.apply(r,T):E}}var R$="x-";function f_(_=""){return R$+_}function $r(_){R$=_}var G_={};function v(_,$){return G_[_]=$,{before(e){if(!G_[e]){console.warn(String.raw`Cannot find directive \`${e}\`. \`${_}\` will use the default order of execution`);return}const t=i_.indexOf(e);i_.splice(t>=0?t:i_.indexOf("DEFAULT"),0,_)}}}function er(_){return Object.keys(G_).includes(_)}function f$(_,$,e){if($=Array.from($),_._x_virtualDirectives){let r=Object.entries(_._x_virtualDirectives).map(([i,o])=>({name:i,value:o})),T=Be(r);r=r.map(i=>T.find(o=>o.name===i.name)?{name:`x-bind:${i.name}`,value:`"${i.value}"`}:i),$=$.concat(r)}let t={};return $.map(Ye((r,T)=>t[r]=T)).filter(qe).map(rr(t,e)).sort(Tr).map(r=>nr(_,r))}function Be(_){return Array.from(_).map(Ye()).filter($=>!qe($))}var d$=!1,x_=new Map,Ve=Symbol();function tr(_){d$=!0;let $=Symbol();Ve=$,x_.set($,[]);let e=()=>{for(;x_.get($).length;)x_.get($).shift()();x_.delete($)},t=()=>{d$=!1,e()};_(e),t()}function Ke(_){let $=[],e=i=>$.push(i),[t,n]=yn(_);return $.push(n),[{Alpine:h_,effect:t,cleanup:e,evaluateLater:G.bind(G,_),evaluate:T_.bind(T_,_)},()=>$.forEach(i=>i())]}function nr(_,$){let e=()=>{},t=G_[$.type]||e,[n,r]=Ke(_);xe(_,$.original,r);let T=()=>{_._x_ignore||_._x_ignoreSelf||(t.inline&&t.inline(_,$,n),t=t.bind(t,_,$,n),d$?x_.get(Ve).push(t):t())};return T.runCleanups=r,T}var ke=(_,$)=>({name:e,value:t})=>(e.startsWith(_)&&(e=e.replace(_,$)),{name:e,value:t}),Xe=_=>_;function Ye(_=()=>{}){return({name:$,value:e})=>{let{name:t,value:n}=je.reduce((r,T)=>T(r),{name:$,value:e});return t!==$&&_(t,$),{name:t,value:n}}}var je=[];function h$(_){je.push(_)}function qe({name:_}){return ze().test(_)}var ze=()=>new RegExp(`^${R$}([^:^.]+)\\b`);function rr(_,$){return({name:e,value:t})=>{e===t&&(t="");let n=e.match(ze()),r=e.match(/:([a-zA-Z0-9\-_:]+)/),T=e.match(/\.[^.\]]+(?=[^\]]*$)/g)||[],i=$||_[e]||e;return{type:n?n[1]:null,value:r?r[1]:null,modifiers:T.map(o=>o.replace(".","")),expression:t,original:i}}}var N$="DEFAULT",i_=["ignore","ref","data","id","anchor","bind","init","for","model","modelable","transition","show","if",N$,"teleport"];function Tr(_,$){let e=i_.indexOf(_.type)===-1?N$:_.type,t=i_.indexOf($.type)===-1?N$:$.type;return i_.indexOf(e)-i_.indexOf(t)}function P_(_,$,e={}){_.dispatchEvent(new CustomEvent($,{detail:e,bubbles:!0,composed:!0,cancelable:!0}))}function L_(_,$){if(typeof ShadowRoot=="function"&&_ instanceof ShadowRoot){Array.from(_.children).forEach(n=>L_(n,$));return}let e=!1;if($(_,()=>e=!0),e)return;let t=_.firstElementChild;for(;t;)L_(t,$),t=t.nextElementSibling}function K(_,...$){console.warn(`Alpine Warning: ${_}`,...$)}var Qe=!1;function ir(){Qe&&K("Alpine has already been initialized on this page. Calling Alpine.start() more than once can cause problems."),Qe=!0,document.body||K("Unable to initialize. Trying to load Alpine before `<body>` is available. Did you forget to add `defer` in Alpine's `<script>` tag?"),P_(document,"alpine:init"),P_(document,"alpine:initializing"),s$(),Un($=>Q($,L_)),o$($=>d_($)),me(($,e)=>{f$($,e).forEach(t=>t())});let _=$=>!w_($.parentElement,!0);Array.from(document.querySelectorAll(_t().join(","))).filter(_).forEach($=>{Q($)}),P_(document,"alpine:initialized"),setTimeout(()=>{Er()})}var S$=[],Je=[];function Ze(){return S$.map(_=>_())}function _t(){return S$.concat(Je).map(_=>_())}function $t(_){S$.push(_)}function et(_){Je.push(_)}function w_(_,$=!1){return o_(_,e=>{if(($?_t():Ze()).some(n=>e.matches(n)))return!0})}function o_(_,$){if(_){if($(_))return _;if(_._x_teleportBack&&(_=_._x_teleportBack),_.parentNode instanceof ShadowRoot)return o_(_.parentNode.host,$);if(_.parentElement)return o_(_.parentElement,$)}}function Lr(_){return Ze().some($=>_.matches($))}var tt=[];function or(_){tt.push(_)}var ar=1;function Q(_,$=L_,e=()=>{}){o_(_,t=>t._x_ignore)||tr(()=>{$(_,(t,n)=>{t._x_marker||(e(t,n),tt.forEach(r=>r(t,n)),f$(t,t.attributes).forEach(r=>r()),t._x_ignore||(t._x_marker=ar++),t._x_ignore&&n())})})}function d_(_,$=L_){$(_,e=>{vn(e),Pe(e),delete e._x_marker})}function Er(){[["ui","dialog",["[x-dialog], [x-popover]"]],["anchor","anchor",["[x-anchor]"]],["sort","sort",["[x-sort]"]]].forEach(([$,e,t])=>{er(e)||t.some(n=>{if(document.querySelector(n))return K(`found "${n}", but missing ${$} plugin`),!0})})}var C$=[],p$=!1;function g$(_=()=>{}){return queueMicrotask(()=>{p$||setTimeout(()=>{O$()})}),new Promise($=>{C$.push(()=>{_(),$()})})}function O$(){for(p$=!1;C$.length;)C$.shift()()}function sr(){p$=!0}function H$(_,$){return Array.isArray($)?nt(_,$.join(" ")):typeof $=="object"&&$!==null?Ar(_,$):typeof $=="function"?H$(_,$()):nt(_,$)}function nt(_,$){let e=n=>n.split(" ").filter(r=>!_.classList.contains(r)).filter(Boolean),t=n=>(_.classList.add(...n),()=>{_.classList.remove(...n)});return $=$===!0?$="":$||"",t(e($))}function Ar(_,$){let e=i=>i.split(" ").filter(Boolean),t=Object.entries($).flatMap(([i,o])=>o?e(i):!1).filter(Boolean),n=Object.entries($).flatMap(([i,o])=>o?!1:e(i)).filter(Boolean),r=[],T=[];return n.forEach(i=>{_.classList.contains(i)&&(_.classList.remove(i),T.push(i))}),t.forEach(i=>{_.classList.contains(i)||(_.classList.add(i),r.push(i))}),()=>{T.forEach(i=>_.classList.add(i)),r.forEach(i=>_.classList.remove(i))}}function F_(_,$){return typeof $=="object"&&$!==null?Ir(_,$):lr(_,$)}function Ir(_,$){let e={};return Object.entries($).forEach(([t,n])=>{e[t]=_.style[t],t.startsWith("--")||(t=ur(t)),_.style.setProperty(t,n)}),setTimeout(()=>{_.style.length===0&&_.removeAttribute("style")}),()=>{F_(_,e)}}function lr(_,$){let e=_.getAttribute("style",$);return _.setAttribute("style",$),()=>{_.setAttribute("style",e||"")}}function ur(_){return _.replace(/([a-z])([A-Z])/g,"$1-$2").toLowerCase()}function M$(_,$=()=>{}){let e=!1;return function(){e?$.apply(this,arguments):(e=!0,_.apply(this,arguments))}}v("transition",(_,{value:$,modifiers:e,expression:t},{evaluate:n})=>{typeof t=="function"&&(t=n(t)),t!==!1&&(!t||typeof t=="boolean"?Rr(_,e,$):cr(_,t,$))});function cr(_,$,e){rt(_,H$,""),{enter:n=>{_._x_transition.enter.during=n},"enter-start":n=>{_._x_transition.enter.start=n},"enter-end":n=>{_._x_transition.enter.end=n},leave:n=>{_._x_transition.leave.during=n},"leave-start":n=>{_._x_transition.leave.start=n},"leave-end":n=>{_._x_transition.leave.end=n}}[e]($)}function Rr(_,$,e){rt(_,F_);let t=!$.includes("in")&&!$.includes("out")&&!e,n=t||$.includes("in")||["enter"].includes(e),r=t||$.includes("out")||["leave"].includes(e);$.includes("in")&&!t&&($=$.filter((m,W)=>W<$.indexOf("out"))),$.includes("out")&&!t&&($=$.filter((m,W)=>W>$.indexOf("out")));let T=!$.includes("opacity")&&!$.includes("scale"),i=T||$.includes("opacity"),o=T||$.includes("scale"),E=i?0:1,I=o?W_($,"scale",95)/100:1,c=W_($,"delay",0)/1e3,u=W_($,"origin","center"),p="opacity, transform",g=W_($,"duration",150)/1e3,S=W_($,"duration",75)/1e3,d="cubic-bezier(0.4, 0.0, 0.2, 1)";n&&(_._x_transition.enter.during={transformOrigin:u,transitionDelay:`${c}s`,transitionProperty:p,transitionDuration:`${g}s`,transitionTimingFunction:d},_._x_transition.enter.start={opacity:E,transform:`scale(${I})`},_._x_transition.enter.end={opacity:1,transform:"scale(1)"}),r&&(_._x_transition.leave.during={transformOrigin:u,transitionDelay:`${c}s`,transitionProperty:p,transitionDuration:`${S}s`,transitionTimingFunction:d},_._x_transition.leave.start={opacity:1,transform:"scale(1)"},_._x_transition.leave.end={opacity:E,transform:`scale(${I})`})}function rt(_,$,e={}){_._x_transition||(_._x_transition={enter:{during:e,start:e,end:e},leave:{during:e,start:e,end:e},in(t=()=>{},n=()=>{}){m$(_,$,{during:this.enter.during,start:this.enter.start,end:this.enter.end},t,n)},out(t=()=>{},n=()=>{}){m$(_,$,{during:this.leave.during,start:this.leave.start,end:this.leave.end},t,n)}})}window.Element.prototype._x_toggleAndCascadeWithTransitions=function(_,$,e,t){const n=document.visibilityState==="visible"?requestAnimationFrame:setTimeout;let r=()=>n(e);if($){_._x_transition&&(_._x_transition.enter||_._x_transition.leave)?_._x_transition.enter&&(Object.entries(_._x_transition.enter.during).length||Object.entries(_._x_transition.enter.start).length||Object.entries(_._x_transition.enter.end).length)?_._x_transition.in(e):r():_._x_transition?_._x_transition.in(e):r();return}_._x_hidePromise=_._x_transition?new Promise((T,i)=>{_._x_transition.out(()=>{},()=>T(t)),_._x_transitioning&&_._x_transitioning.beforeCancel(()=>i({isFromCancelledTransition:!0}))}):Promise.resolve(t),queueMicrotask(()=>{let T=Tt(_);T?(T._x_hideChildren||(T._x_hideChildren=[]),T._x_hideChildren.push(_)):n(()=>{let i=o=>{let E=Promise.all([o._x_hidePromise,...(o._x_hideChildren||[]).map(i)]).then(([I])=>I?.());return delete o._x_hidePromise,delete o._x_hideChildren,E};i(_).catch(o=>{if(!o.isFromCancelledTransition)throw o})})})};function Tt(_){let $=_.parentNode;if($)return $._x_hidePromise?$:Tt($)}function m$(_,$,{during:e,start:t,end:n}={},r=()=>{},T=()=>{}){if(_._x_transitioning&&_._x_transitioning.cancel(),Object.keys(e).length===0&&Object.keys(t).length===0&&Object.keys(n).length===0){r(),T();return}let i,o,E;fr(_,{start(){i=$(_,t)},during(){o=$(_,e)},before:r,end(){i(),E=$(_,n)},after:T,cleanup(){o(),E()}})}function fr(_,$){let e,t,n,r=M$(()=>{y(()=>{e=!0,t||$.before(),n||($.end(),O$()),$.after(),_.isConnected&&$.cleanup(),delete _._x_transitioning})});_._x_transitioning={beforeCancels:[],beforeCancel(T){this.beforeCancels.push(T)},cancel:M$(function(){for(;this.beforeCancels.length;)this.beforeCancels.shift()();r()}),finish:r},y(()=>{$.start(),$.during()}),sr(),requestAnimationFrame(()=>{if(e)return;let T=Number(getComputedStyle(_).transitionDuration.replace(/,.*/,"").replace("s",""))*1e3,i=Number(getComputedStyle(_).transitionDelay.replace(/,.*/,"").replace("s",""))*1e3;T===0&&(T=Number(getComputedStyle(_).animationDuration.replace("s",""))*1e3),y(()=>{$.before()}),t=!0,requestAnimationFrame(()=>{e||(y(()=>{$.end()}),O$(),setTimeout(_._x_transitioning.finish,T+i),n=!0)})})}function W_(_,$,e){if(_.indexOf($)===-1)return e;const t=_[_.indexOf($)+1];if(!t||$==="scale"&&isNaN(t))return e;if($==="duration"||$==="delay"){let n=t.match(/([0-9]+)ms/);if(n)return n[1]}return $==="origin"&&["top","right","left","center","bottom"].includes(_[_.indexOf($)+2])?[t,_[_.indexOf($)+2]].join(" "):t}var J=!1;function Z(_,$=()=>{}){return(...e)=>J?$(...e):_(...e)}function dr(_){return(...$)=>J&&_(...$)}var it=[];function B_(_){it.push(_)}function hr(_,$){it.forEach(e=>e(_,$)),J=!0,Lt(()=>{Q($,(e,t)=>{t(e,()=>{})})}),J=!1}var x$=!1;function Nr(_,$){$._x_dataStack||($._x_dataStack=_._x_dataStack),J=!0,x$=!0,Lt(()=>{Sr($)}),J=!1,x$=!1}function Sr(_){let $=!1;Q(_,(t,n)=>{L_(t,(r,T)=>{if($&&Lr(r))return T();$=!0,n(r,T)})})}function Lt(_){let $=t_;pe((e,t)=>{let n=$(e);return c_(n),()=>{}}),_(),pe($)}function ot(_,$,e,t=[]){switch(_._x_bindings||(_._x_bindings=u_({})),_._x_bindings[$]=e,$=t.includes("camel")?xr($):$,$){case"value":Cr(_,e);break;case"style":gr(_,e);break;case"class":pr(_,e);break;case"selected":case"checked":Or(_,$,e);break;default:at(_,$,e);break}}function Cr(_,$){if(It(_))_.attributes.value===void 0&&(_.value=$),window.fromModel&&(typeof $=="boolean"?_.checked=V_(_.value)===$:_.checked=Et(_.value,$));else if(P$(_))Number.isInteger($)?_.value=$:!Array.isArray($)&&typeof $!="boolean"&&![null,void 0].includes($)?_.value=String($):Array.isArray($)?_.checked=$.some(e=>Et(e,_.value)):_.checked=!!$;else if(_.tagName==="SELECT")mr(_,$);else{if(_.value===$)return;_.value=$===void 0?"":$}}function pr(_,$){_._x_undoAddedClasses&&_._x_undoAddedClasses(),_._x_undoAddedClasses=H$(_,$)}function gr(_,$){_._x_undoAddedStyles&&_._x_undoAddedStyles(),_._x_undoAddedStyles=F_(_,$)}function Or(_,$,e){at(_,$,e),Mr(_,$,e)}function at(_,$,e){[null,void 0,!1].includes(e)&&Wr($)?_.removeAttribute($):(st($)&&(e=$),Hr(_,$,e))}function Hr(_,$,e){_.getAttribute($)!=e&&_.setAttribute($,e)}function Mr(_,$,e){_[$]!==e&&(_[$]=e)}function mr(_,$){const e=[].concat($).map(t=>t+"");Array.from(_.options).forEach(t=>{t.selected=e.includes(t.value)})}function xr(_){return _.toLowerCase().replace(/-(\w)/g,($,e)=>e.toUpperCase())}function Et(_,$){return _==$}function V_(_){return[1,"1","true","on","yes",!0].includes(_)?!0:[0,"0","false","off","no",!1].includes(_)?!1:_?!!_:null}var Pr=new Set(["allowfullscreen","async","autofocus","autoplay","checked","controls","default","defer","disabled","formnovalidate","inert","ismap","itemscope","loop","multiple","muted","nomodule","novalidate","open","playsinline","readonly","required","reversed","selected","shadowrootclonable","shadowrootdelegatesfocus","shadowrootserializable"]);function st(_){return Pr.has(_)}function Wr(_){return!["aria-pressed","aria-checked","aria-expanded","aria-selected"].includes(_)}function Dr(_,$,e){return _._x_bindings&&_._x_bindings[$]!==void 0?_._x_bindings[$]:At(_,$,e)}function yr(_,$,e,t=!0){if(_._x_bindings&&_._x_bindings[$]!==void 0)return _._x_bindings[$];if(_._x_inlineBindings&&_._x_inlineBindings[$]!==void 0){let n=_._x_inlineBindings[$];return n.extract=t,be(()=>T_(_,n.expression))}return At(_,$,e)}function At(_,$,e){let t=_.getAttribute($);return t===null?typeof e=="function"?e():e:t===""?!0:st($)?!![$,"true"].includes(t):t}function P$(_){return _.type==="checkbox"||_.localName==="ui-checkbox"||_.localName==="ui-switch"}function It(_){return _.type==="radio"||_.localName==="ui-radio"}function lt(_,$){let e;return function(){const t=this,n=arguments,r=function(){e=null,_.apply(t,n)};clearTimeout(e),e=setTimeout(r,$)}}function ut(_,$){let e;return function(){let t=this,n=arguments;e||(_.apply(t,n),e=!0,setTimeout(()=>e=!1,$))}}function ct({get:_,set:$},{get:e,set:t}){let n=!0,r,T=t_(()=>{let i=_(),o=e();if(n)t(W$(i)),n=!1;else{let E=JSON.stringify(i),I=JSON.stringify(o);E!==r?t(W$(i)):E!==I&&$(W$(o))}r=JSON.stringify(_()),JSON.stringify(e())});return()=>{c_(T)}}function W$(_){return typeof _=="object"?JSON.parse(JSON.stringify(_)):_}function Ur(_){(Array.isArray(_)?_:[_]).forEach(e=>e(h_))}var a_={},Rt=!1;function vr(_,$){if(Rt||(a_=u_(a_),Rt=!0),$===void 0)return a_[_];a_[_]=$,l$(a_[_]),typeof $=="object"&&$!==null&&$.hasOwnProperty("init")&&typeof $.init=="function"&&a_[_].init()}function br(){return a_}var ft={};function Gr(_,$){let e=typeof $!="function"?()=>$:$;return _ instanceof Element?dt(_,e()):(ft[_]=e,()=>{})}function wr(_){return Object.entries(ft).forEach(([$,e])=>{Object.defineProperty(_,$,{get(){return(...t)=>e(...t)}})}),_}function dt(_,$,e){let t=[];for(;t.length;)t.pop()();let n=Object.entries($).map(([T,i])=>({name:T,value:i})),r=Be(n);return n=n.map(T=>r.find(i=>i.name===T.name)?{name:`x-bind:${T.name}`,value:`"${T.value}"`}:T),f$(_,n,e).map(T=>{t.push(T.runCleanups),T()}),()=>{for(;t.length;)t.pop()()}}var ht={};function Fr(_,$){ht[_]=$}function Br(_,$){return Object.entries(ht).forEach(([e,t])=>{Object.defineProperty(_,e,{get(){return(...n)=>t.bind($)(...n)},enumerable:!1})}),_}var Vr={get reactive(){return u_},get release(){return c_},get effect(){return t_},get raw(){return Ce},version:"3.15.4",flushAndStopDeferringMutations:wn,dontAutoEvaluateFunctions:be,disableEffectScheduling:Wn,startObservingMutations:s$,stopObservingMutations:We,setReactivityEngine:Dn,onAttributeRemoved:xe,onAttributesAdded:me,closestDataStack:n_,skipDuringClone:Z,onlyDuringClone:dr,addRootSelector:$t,addInitSelector:et,setErrorHandler:Xn,interceptClone:B_,addScopeToNode:O_,deferMutations:Gn,mapAttributes:h$,evaluateLater:G,interceptInit:or,initInterceptors:l$,injectMagics:H_,setEvaluator:jn,setRawEvaluator:qn,mergeProxies:r_,extractProp:yr,findClosest:o_,onElRemoved:o$,closestRoot:w_,destroyTree:d_,interceptor:ye,transition:m$,setStyles:F_,mutateDom:y,directive:v,entangle:ct,throttle:ut,debounce:lt,evaluate:T_,evaluateRaw:Zn,initTree:Q,nextTick:g$,prefixed:f_,prefix:$r,plugin:Ur,magic:X,store:vr,start:ir,clone:Nr,cloneNode:hr,bound:Dr,$data:De,watch:ge,walk:L_,data:Fr,bind:Gr},h_=Vr;function Kr(_,$){const e=Object.create(null),t=_.split(",");for(let n=0;n<t.length;n++)e[t[n]]=!0;return n=>!!e[n]}var kr=Object.freeze({}),Xr=Object.prototype.hasOwnProperty,K_=(_,$)=>Xr.call(_,$),E_=Array.isArray,D_=_=>Nt(_)==="[object Map]",Yr=_=>typeof _=="string",D$=_=>typeof _=="symbol",k_=_=>_!==null&&typeof _=="object",jr=Object.prototype.toString,Nt=_=>jr.call(_),St=_=>Nt(_).slice(8,-1),y$=_=>Yr(_)&&_!=="NaN"&&_[0]!=="-"&&""+parseInt(_,10)===_,qr=_=>{const $=Object.create(null);return e=>$[e]||($[e]=_(e))},zr=qr(_=>_.charAt(0).toUpperCase()+_.slice(1)),Ct=(_,$)=>_!==$&&(_===_||$===$),U$=new WeakMap,y_=[],z,s_=Symbol("iterate"),v$=Symbol("Map key iterate");function Qr(_){return _&&_._isEffect===!0}function Jr(_,$=kr){Qr(_)&&(_=_.raw);const e=$T(_,$);return $.lazy||e(),e}function Zr(_){_.active&&(pt(_),_.options.onStop&&_.options.onStop(),_.active=!1)}var _T=0;function $T(_,$){const e=function(){if(!e.active)return _();if(!y_.includes(e)){pt(e);try{return tT(),y_.push(e),z=e,_()}finally{y_.pop(),gt(),z=y_[y_.length-1]}}};return e.id=_T++,e.allowRecurse=!!$.allowRecurse,e._isEffect=!0,e.active=!0,e.raw=_,e.deps=[],e.options=$,e}function pt(_){const{deps:$}=_;if($.length){for(let e=0;e<$.length;e++)$[e].delete(_);$.length=0}}var N_=!0,b$=[];function eT(){b$.push(N_),N_=!1}function tT(){b$.push(N_),N_=!0}function gt(){const _=b$.pop();N_=_===void 0?!0:_}function Y(_,$,e){if(!N_||z===void 0)return;let t=U$.get(_);t||U$.set(_,t=new Map);let n=t.get(e);n||t.set(e,n=new Set),n.has(z)||(n.add(z),z.deps.push(n),z.options.onTrack&&z.options.onTrack({effect:z,target:_,type:$,key:e}))}function __(_,$,e,t,n,r){const T=U$.get(_);if(!T)return;const i=new Set,o=I=>{I&&I.forEach(c=>{(c!==z||c.allowRecurse)&&i.add(c)})};if($==="clear")T.forEach(o);else if(e==="length"&&E_(_))T.forEach((I,c)=>{(c==="length"||c>=t)&&o(I)});else switch(e!==void 0&&o(T.get(e)),$){case"add":E_(_)?y$(e)&&o(T.get("length")):(o(T.get(s_)),D_(_)&&o(T.get(v$)));break;case"delete":E_(_)||(o(T.get(s_)),D_(_)&&o(T.get(v$)));break;case"set":D_(_)&&o(T.get(s_));break}const E=I=>{I.options.onTrigger&&I.options.onTrigger({effect:I,target:_,key:e,type:$,newValue:t,oldValue:n,oldTarget:r}),I.options.scheduler?I.options.scheduler(I):I()};i.forEach(E)}var nT=Kr("__proto__,__v_isRef,__isVue"),Ot=new Set(Object.getOwnPropertyNames(Symbol).map(_=>Symbol[_]).filter(D$)),rT=Mt(),TT=Mt(!0),Ht=iT();function iT(){const _={};return["includes","indexOf","lastIndexOf"].forEach($=>{_[$]=function(...e){const t=D(this);for(let r=0,T=this.length;r<T;r++)Y(t,"get",r+"");const n=t[$](...e);return n===-1||n===!1?t[$](...e.map(D)):n}}),["push","pop","shift","unshift","splice"].forEach($=>{_[$]=function(...e){eT();const t=D(this)[$].apply(this,e);return gt(),t}}),_}function Mt(_=!1,$=!1){return function(t,n,r){if(n==="__v_isReactive")return!_;if(n==="__v_isReadonly")return _;if(n==="__v_raw"&&r===(_?$?hT:vt:$?dT:Ut).get(t))return t;const T=E_(t);if(!_&&T&&K_(Ht,n))return Reflect.get(Ht,n,r);const i=Reflect.get(t,n,r);return(D$(n)?Ot.has(n):nT(n))||(_||Y(t,"get",n),$)?i:V$(i)?!T||!y$(n)?i.value:i:k_(i)?_?bt(i):B$(i):i}}var LT=oT();function oT(_=!1){return function(e,t,n,r){let T=e[t];if(!_&&(n=D(n),T=D(T),!E_(e)&&V$(T)&&!V$(n)))return T.value=n,!0;const i=E_(e)&&y$(t)?Number(t)<e.length:K_(e,t),o=Reflect.set(e,t,n,r);return e===D(r)&&(i?Ct(n,T)&&__(e,"set",t,n,T):__(e,"add",t,n)),o}}function aT(_,$){const e=K_(_,$),t=_[$],n=Reflect.deleteProperty(_,$);return n&&e&&__(_,"delete",$,void 0,t),n}function ET(_,$){const e=Reflect.has(_,$);return(!D$($)||!Ot.has($))&&Y(_,"has",$),e}function sT(_){return Y(_,"iterate",E_(_)?"length":s_),Reflect.ownKeys(_)}var AT={get:rT,set:LT,deleteProperty:aT,has:ET,ownKeys:sT},IT={get:TT,set(_,$){return console.warn(`Set operation on key "${String($)}" failed: target is readonly.`,_),!0},deleteProperty(_,$){return console.warn(`Delete operation on key "${String($)}" failed: target is readonly.`,_),!0}},G$=_=>k_(_)?B$(_):_,w$=_=>k_(_)?bt(_):_,F$=_=>_,X_=_=>Reflect.getPrototypeOf(_);function Y_(_,$,e=!1,t=!1){_=_.__v_raw;const n=D(_),r=D($);$!==r&&!e&&Y(n,"get",$),!e&&Y(n,"get",r);const{has:T}=X_(n),i=t?F$:e?w$:G$;if(T.call(n,$))return i(_.get($));if(T.call(n,r))return i(_.get(r));_!==n&&_.get($)}function j_(_,$=!1){const e=this.__v_raw,t=D(e),n=D(_);return _!==n&&!$&&Y(t,"has",_),!$&&Y(t,"has",n),_===n?e.has(_):e.has(_)||e.has(n)}function q_(_,$=!1){return _=_.__v_raw,!$&&Y(D(_),"iterate",s_),Reflect.get(_,"size",_)}function mt(_){_=D(_);const $=D(this);return X_($).has.call($,_)||($.add(_),__($,"add",_,_)),this}function xt(_,$){$=D($);const e=D(this),{has:t,get:n}=X_(e);let r=t.call(e,_);r?yt(e,t,_):(_=D(_),r=t.call(e,_));const T=n.call(e,_);return e.set(_,$),r?Ct($,T)&&__(e,"set",_,$,T):__(e,"add",_,$),this}function Pt(_){const $=D(this),{has:e,get:t}=X_($);let n=e.call($,_);n?yt($,e,_):(_=D(_),n=e.call($,_));const r=t?t.call($,_):void 0,T=$.delete(_);return n&&__($,"delete",_,void 0,r),T}function Wt(){const _=D(this),$=_.size!==0,e=D_(_)?new Map(_):new Set(_),t=_.clear();return $&&__(_,"clear",void 0,void 0,e),t}function z_(_,$){return function(t,n){const r=this,T=r.__v_raw,i=D(T),o=$?F$:_?w$:G$;return!_&&Y(i,"iterate",s_),T.forEach((E,I)=>t.call(n,o(E),o(I),r))}}function Q_(_,$,e){return function(...t){const n=this.__v_raw,r=D(n),T=D_(r),i=_==="entries"||_===Symbol.iterator&&T,o=_==="keys"&&T,E=n[_](...t),I=e?F$:$?w$:G$;return!$&&Y(r,"iterate",o?v$:s_),{next(){const{value:c,done:u}=E.next();return u?{value:c,done:u}:{value:i?[I(c[0]),I(c[1])]:I(c),done:u}},[Symbol.iterator](){return this}}}}function $_(_){return function(...$){{const e=$[0]?`on key "${$[0]}" `:"";console.warn(`${zr(_)} operation ${e}failed: target is readonly.`,D(this))}return _==="delete"?!1:this}}function lT(){const _={get(r){return Y_(this,r)},get size(){return q_(this)},has:j_,add:mt,set:xt,delete:Pt,clear:Wt,forEach:z_(!1,!1)},$={get(r){return Y_(this,r,!1,!0)},get size(){return q_(this)},has:j_,add:mt,set:xt,delete:Pt,clear:Wt,forEach:z_(!1,!0)},e={get(r){return Y_(this,r,!0)},get size(){return q_(this,!0)},has(r){return j_.call(this,r,!0)},add:$_("add"),set:$_("set"),delete:$_("delete"),clear:$_("clear"),forEach:z_(!0,!1)},t={get(r){return Y_(this,r,!0,!0)},get size(){return q_(this,!0)},has(r){return j_.call(this,r,!0)},add:$_("add"),set:$_("set"),delete:$_("delete"),clear:$_("clear"),forEach:z_(!0,!0)};return["keys","values","entries",Symbol.iterator].forEach(r=>{_[r]=Q_(r,!1,!1),e[r]=Q_(r,!0,!1),$[r]=Q_(r,!1,!0),t[r]=Q_(r,!0,!0)}),[_,e,$,t]}var[uT,cT]=lT();function Dt(_,$){const e=_?cT:uT;return(t,n,r)=>n==="__v_isReactive"?!_:n==="__v_isReadonly"?_:n==="__v_raw"?t:Reflect.get(K_(e,n)&&n in t?e:t,n,r)}var RT={get:Dt(!1)},fT={get:Dt(!0)};function yt(_,$,e){const t=D(e);if(t!==e&&$.call(_,t)){const n=St(_);console.warn(`Reactive ${n} contains both the raw and reactive versions of the same object${n==="Map"?" as keys":""}, which can lead to inconsistencies. Avoid differentiating between the raw and reactive versions of an object and only use the reactive version if possible.`)}}var Ut=new WeakMap,dT=new WeakMap,vt=new WeakMap,hT=new WeakMap;function NT(_){switch(_){case"Object":case"Array":return 1;case"Map":case"Set":case"WeakMap":case"WeakSet":return 2;default:return 0}}function ST(_){return _.__v_skip||!Object.isExtensible(_)?0:NT(St(_))}function B$(_){return _&&_.__v_isReadonly?_:Gt(_,!1,AT,RT,Ut)}function bt(_){return Gt(_,!0,IT,fT,vt)}function Gt(_,$,e,t,n){if(!k_(_))return console.warn(`value cannot be made reactive: ${String(_)}`),_;if(_.__v_raw&&!($&&_.__v_isReactive))return _;const r=n.get(_);if(r)return r;const T=ST(_);if(T===0)return _;const i=new Proxy(_,T===2?t:e);return n.set(_,i),i}function D(_){return _&&D(_.__v_raw)||_}function V$(_){return!!(_&&_.__v_isRef===!0)}X("nextTick",()=>g$),X("dispatch",_=>P_.bind(P_,_)),X("watch",(_,{evaluateLater:$,cleanup:e})=>(t,n)=>{let r=$(t),i=ge(()=>{let o;return r(E=>o=E),o},n);e(i)}),X("store",br),X("data",_=>De(_)),X("root",_=>w_(_)),X("refs",_=>(_._x_refs_proxy||(_._x_refs_proxy=r_(CT(_))),_._x_refs_proxy));function CT(_){let $=[];return o_(_,e=>{e._x_refs&&$.push(e._x_refs)}),$}var K$={};function wt(_){return K$[_]||(K$[_]=0),++K$[_]}function pT(_,$){return o_(_,e=>{if(e._x_ids&&e._x_ids[$])return!0})}function gT(_,$){_._x_ids||(_._x_ids={}),_._x_ids[$]||(_._x_ids[$]=wt($))}X("id",(_,{cleanup:$})=>(e,t=null)=>{let n=`${e}${t?`-${t}`:""}`;return OT(_,n,$,()=>{let r=pT(_,e),T=r?r._x_ids[e]:wt(e);return t?`${e}-${T}-${t}`:`${e}-${T}`})}),B_((_,$)=>{_._x_id&&($._x_id=_._x_id)});function OT(_,$,e,t){if(_._x_id||(_._x_id={}),_._x_id[$])return _._x_id[$];let n=t();return _._x_id[$]=n,e(()=>{delete _._x_id[$]}),n}X("el",_=>_),Ft("Focus","focus","focus"),Ft("Persist","persist","persist");function Ft(_,$,e){X($,t=>K(`You can't use [$${$}] without first installing the "${_}" plugin here: https://alpinejs.dev/plugins/${e}`,t))}v("modelable",(_,{expression:$},{effect:e,evaluateLater:t,cleanup:n})=>{let r=t($),T=()=>{let I;return r(c=>I=c),I},i=t(`${$} = __placeholder`),o=I=>i(()=>{},{scope:{__placeholder:I}}),E=T();o(E),queueMicrotask(()=>{if(!_._x_model)return;_._x_removeModelListeners.default();let I=_._x_model.get,c=_._x_model.set,u=ct({get(){return I()},set(p){c(p)}},{get(){return T()},set(p){o(p)}});n(u)})}),v("teleport",(_,{modifiers:$,expression:e},{cleanup:t})=>{_.tagName.toLowerCase()!=="template"&&K("x-teleport can only be used on a <template> tag",_);let n=Bt(e),r=_.content.cloneNode(!0).firstElementChild;_._x_teleport=r,r._x_teleportBack=_,_.setAttribute("data-teleport-template",!0),r.setAttribute("data-teleport-target",!0),_._x_forwardEvents&&_._x_forwardEvents.forEach(i=>{r.addEventListener(i,o=>{o.stopPropagation(),_.dispatchEvent(new o.constructor(o.type,o))})}),O_(r,{},_);let T=(i,o,E)=>{E.includes("prepend")?o.parentNode.insertBefore(i,o):E.includes("append")?o.parentNode.insertBefore(i,o.nextSibling):o.appendChild(i)};y(()=>{T(r,n,$),Z(()=>{Q(r)})()}),_._x_teleportPutBack=()=>{let i=Bt(e);y(()=>{T(_._x_teleport,i,$)})},t(()=>y(()=>{r.remove(),d_(r)}))});var HT=document.createElement("div");function Bt(_){let $=Z(()=>document.querySelector(_),()=>HT)();return $||K(`Cannot find x-teleport element for selector: "${_}"`),$}var Vt=()=>{};Vt.inline=(_,{modifiers:$},{cleanup:e})=>{$.includes("self")?_._x_ignoreSelf=!0:_._x_ignore=!0,e(()=>{$.includes("self")?delete _._x_ignoreSelf:delete _._x_ignore})},v("ignore",Vt),v("effect",Z((_,{expression:$},{effect:e})=>{e(G(_,$))}));function k$(_,$,e,t){let n=_,r=o=>t(o),T={},i=(o,E)=>I=>E(o,I);if(e.includes("dot")&&($=MT($)),e.includes("camel")&&($=mT($)),e.includes("passive")&&(T.passive=!0),e.includes("capture")&&(T.capture=!0),e.includes("window")&&(n=window),e.includes("document")&&(n=document),e.includes("debounce")){let o=e[e.indexOf("debounce")+1]||"invalid-wait",E=J_(o.split("ms")[0])?Number(o.split("ms")[0]):250;r=lt(r,E)}if(e.includes("throttle")){let o=e[e.indexOf("throttle")+1]||"invalid-wait",E=J_(o.split("ms")[0])?Number(o.split("ms")[0]):250;r=ut(r,E)}return e.includes("prevent")&&(r=i(r,(o,E)=>{E.preventDefault(),o(E)})),e.includes("stop")&&(r=i(r,(o,E)=>{E.stopPropagation(),o(E)})),e.includes("once")&&(r=i(r,(o,E)=>{o(E),n.removeEventListener($,r,T)})),(e.includes("away")||e.includes("outside"))&&(n=document,r=i(r,(o,E)=>{_.contains(E.target)||E.target.isConnected!==!1&&(_.offsetWidth<1&&_.offsetHeight<1||_._x_isShown!==!1&&o(E))})),e.includes("self")&&(r=i(r,(o,E)=>{E.target===_&&o(E)})),(PT($)||Kt($))&&(r=i(r,(o,E)=>{WT(E,e)||o(E)})),n.addEventListener($,r,T),()=>{n.removeEventListener($,r,T)}}function MT(_){return _.replace(/-/g,".")}function mT(_){return _.toLowerCase().replace(/-(\w)/g,($,e)=>e.toUpperCase())}function J_(_){return!Array.isArray(_)&&!isNaN(_)}function xT(_){return[" ","_"].includes(_)?_:_.replace(/([a-z])([A-Z])/g,"$1-$2").replace(/[_\s]/,"-").toLowerCase()}function PT(_){return["keydown","keyup"].includes(_)}function Kt(_){return["contextmenu","click","mouse"].some($=>_.includes($))}function WT(_,$){let e=$.filter(r=>!["window","document","prevent","stop","once","capture","self","away","outside","passive","preserve-scroll"].includes(r));if(e.includes("debounce")){let r=e.indexOf("debounce");e.splice(r,J_((e[r+1]||"invalid-wait").split("ms")[0])?2:1)}if(e.includes("throttle")){let r=e.indexOf("throttle");e.splice(r,J_((e[r+1]||"invalid-wait").split("ms")[0])?2:1)}if(e.length===0||e.length===1&&kt(_.key).includes(e[0]))return!1;const n=["ctrl","shift","alt","meta","cmd","super"].filter(r=>e.includes(r));return e=e.filter(r=>!n.includes(r)),!(n.length>0&&n.filter(T=>((T==="cmd"||T==="super")&&(T="meta"),_[`${T}Key`])).length===n.length&&(Kt(_.type)||kt(_.key).includes(e[0])))}function kt(_){if(!_)return[];_=xT(_);let $={ctrl:"control",slash:"/",space:" ",spacebar:" ",cmd:"meta",esc:"escape",up:"arrow-up",down:"arrow-down",left:"arrow-left",right:"arrow-right",period:".",comma:",",equal:"=",minus:"-",underscore:"_"};return $[_]=_,Object.keys($).map(e=>{if($[e]===_)return e}).filter(e=>e)}v("model",(_,{modifiers:$,expression:e},{effect:t,cleanup:n})=>{let r=_;$.includes("parent")&&(r=_.parentNode);let T=G(r,e),i;typeof e=="string"?i=G(r,`${e} = __placeholder`):typeof e=="function"&&typeof e()=="string"?i=G(r,`${e()} = __placeholder`):i=()=>{};let o=()=>{let u;return T(p=>u=p),Xt(u)?u.get():u},E=u=>{let p;T(g=>p=g),Xt(p)?p.set(u):i(()=>{},{scope:{__placeholder:u}})};typeof e=="string"&&_.type==="radio"&&y(()=>{_.hasAttribute("name")||_.setAttribute("name",e)});let I=_.tagName.toLowerCase()==="select"||["checkbox","radio"].includes(_.type)||$.includes("lazy")?"change":"input",c=J?()=>{}:k$(_,I,$,u=>{E(X$(_,$,u,o()))});if($.includes("fill")&&([void 0,null,""].includes(o())||P$(_)&&Array.isArray(o())||_.tagName.toLowerCase()==="select"&&_.multiple)&&E(X$(_,$,{target:_},o())),_._x_removeModelListeners||(_._x_removeModelListeners={}),_._x_removeModelListeners.default=c,n(()=>_._x_removeModelListeners.default()),_.form){let u=k$(_.form,"reset",[],p=>{g$(()=>_._x_model&&_._x_model.set(X$(_,$,{target:_},o())))});n(()=>u())}_._x_model={get(){return o()},set(u){E(u)}},_._x_forceModelUpdate=u=>{u===void 0&&typeof e=="string"&&e.match(/\./)&&(u=""),window.fromModel=!0,y(()=>ot(_,"value",u)),delete window.fromModel},t(()=>{let u=o();$.includes("unintrusive")&&document.activeElement.isSameNode(_)||_._x_forceModelUpdate(u)})});function X$(_,$,e,t){return y(()=>{if(e instanceof CustomEvent&&e.detail!==void 0)return e.detail!==null&&e.detail!==void 0?e.detail:e.target.value;if(P$(_))if(Array.isArray(t)){let n=null;return $.includes("number")?n=Y$(e.target.value):$.includes("boolean")?n=V_(e.target.value):n=e.target.value,e.target.checked?t.includes(n)?t:t.concat([n]):t.filter(r=>!DT(r,n))}else return e.target.checked;else{if(_.tagName.toLowerCase()==="select"&&_.multiple)return $.includes("number")?Array.from(e.target.selectedOptions).map(n=>{let r=n.value||n.text;return Y$(r)}):$.includes("boolean")?Array.from(e.target.selectedOptions).map(n=>{let r=n.value||n.text;return V_(r)}):Array.from(e.target.selectedOptions).map(n=>n.value||n.text);{let n;return It(_)?e.target.checked?n=e.target.value:n=t:n=e.target.value,$.includes("number")?Y$(n):$.includes("boolean")?V_(n):$.includes("trim")?n.trim():n}}})}function Y$(_){let $=_?parseFloat(_):null;return yT($)?$:_}function DT(_,$){return _==$}function yT(_){return!Array.isArray(_)&&!isNaN(_)}function Xt(_){return _!==null&&typeof _=="object"&&typeof _.get=="function"&&typeof _.set=="function"}v("cloak",_=>queueMicrotask(()=>y(()=>_.removeAttribute(f_("cloak"))))),et(()=>`[${f_("init")}]`),v("init",Z((_,{expression:$},{evaluate:e})=>typeof $=="string"?!!$.trim()&&e($,{},!1):e($,{},!1))),v("text",(_,{expression:$},{effect:e,evaluateLater:t})=>{let n=t($);e(()=>{n(r=>{y(()=>{_.textContent=r})})})}),v("html",(_,{expression:$},{effect:e,evaluateLater:t})=>{let n=t($);e(()=>{n(r=>{y(()=>{_.innerHTML=r,_._x_ignoreSelf=!0,Q(_),delete _._x_ignoreSelf})})})}),h$(ke(":",Xe(f_("bind:"))));var Yt=(_,{value:$,modifiers:e,expression:t,original:n},{effect:r,cleanup:T})=>{if(!$){let o={};wr(o),G(_,t)(I=>{dt(_,I,n)},{scope:o});return}if($==="key")return UT(_,t);if(_._x_inlineBindings&&_._x_inlineBindings[$]&&_._x_inlineBindings[$].extract)return;let i=G(_,t);r(()=>i(o=>{o===void 0&&typeof t=="string"&&t.match(/\./)&&(o=""),y(()=>ot(_,$,o,e))})),T(()=>{_._x_undoAddedClasses&&_._x_undoAddedClasses(),_._x_undoAddedStyles&&_._x_undoAddedStyles()})};Yt.inline=(_,{value:$,modifiers:e,expression:t})=>{$&&(_._x_inlineBindings||(_._x_inlineBindings={}),_._x_inlineBindings[$]={expression:t,extract:!1})},v("bind",Yt);function UT(_,$){_._x_keyExpression=$}$t(()=>`[${f_("data")}]`),v("data",(_,{expression:$},{cleanup:e})=>{if(vT(_))return;$=$===""?"{}":$;let t={};H_(t,_);let n={};Br(n,t);let r=T_(_,$,{scope:n});(r===void 0||r===!0)&&(r={}),H_(r,_);let T=u_(r);l$(T);let i=O_(_,T);T.init&&T_(_,T.init),e(()=>{T.destroy&&T_(_,T.destroy),i()})}),B_((_,$)=>{_._x_dataStack&&($._x_dataStack=_._x_dataStack,$.setAttribute("data-has-alpine-state",!0))});function vT(_){return J?x$?!0:_.hasAttribute("data-has-alpine-state"):!1}v("show",(_,{modifiers:$,expression:e},{effect:t})=>{let n=G(_,e);_._x_doHide||(_._x_doHide=()=>{y(()=>{_.style.setProperty("display","none",$.includes("important")?"important":void 0)})}),_._x_doShow||(_._x_doShow=()=>{y(()=>{_.style.length===1&&_.style.display==="none"?_.removeAttribute("style"):_.style.removeProperty("display")})});let r=()=>{_._x_doHide(),_._x_isShown=!1},T=()=>{_._x_doShow(),_._x_isShown=!0},i=()=>setTimeout(T),o=M$(c=>c?T():r(),c=>{typeof _._x_toggleAndCascadeWithTransitions=="function"?_._x_toggleAndCascadeWithTransitions(_,c,T,r):c?i():r()}),E,I=!0;t(()=>n(c=>{!I&&c===E||($.includes("immediate")&&(c?i():r()),o(c),E=c,I=!1)}))}),v("for",(_,{expression:$},{effect:e,cleanup:t})=>{let n=GT($),r=G(_,n.items),T=G(_,_._x_keyExpression||"index");_._x_prevKeys=[],_._x_lookup={},e(()=>bT(_,n,r,T)),t(()=>{Object.values(_._x_lookup).forEach(i=>y(()=>{d_(i),i.remove()})),delete _._x_prevKeys,delete _._x_lookup})});function bT(_,$,e,t){let n=T=>typeof T=="object"&&!Array.isArray(T),r=_;e(T=>{wT(T)&&T>=0&&(T=Array.from(Array(T).keys(),d=>d+1)),T===void 0&&(T=[]);let i=_._x_lookup,o=_._x_prevKeys,E=[],I=[];if(n(T))T=Object.entries(T).map(([d,m])=>{let W=jt($,m,d,T);t(x=>{I.includes(x)&&K("Duplicate key on x-for",_),I.push(x)},{scope:{index:d,...W}}),E.push(W)});else for(let d=0;d<T.length;d++){let m=jt($,T[d],d,T);t(W=>{I.includes(W)&&K("Duplicate key on x-for",_),I.push(W)},{scope:{index:d,...m}}),E.push(m)}let c=[],u=[],p=[],g=[];for(let d=0;d<o.length;d++){let m=o[d];I.indexOf(m)===-1&&p.push(m)}o=o.filter(d=>!p.includes(d));let S="template";for(let d=0;d<I.length;d++){let m=I[d],W=o.indexOf(m);if(W===-1)o.splice(d,0,m),c.push([S,d]);else if(W!==d){let x=o.splice(d,1)[0],U=o.splice(W-1,1)[0];o.splice(d,0,U),o.splice(W,0,x),u.push([x,U])}else g.push(m);S=m}for(let d=0;d<p.length;d++){let m=p[d];m in i&&(y(()=>{d_(i[m]),i[m].remove()}),delete i[m])}for(let d=0;d<u.length;d++){let[m,W]=u[d],x=i[m],U=i[W],w=document.createElement("div");y(()=>{U||K('x-for ":key" is undefined or invalid',r,W,i),U.after(w),x.after(U),U._x_currentIfEl&&U.after(U._x_currentIfEl),w.before(x),x._x_currentIfEl&&x.after(x._x_currentIfEl),w.remove()}),U._x_refreshXForScope(E[I.indexOf(W)])}for(let d=0;d<c.length;d++){let[m,W]=c[d],x=m==="template"?r:i[m];x._x_currentIfEl&&(x=x._x_currentIfEl);let U=E[W],w=I[W],I_=document.importNode(r.content,!0).firstElementChild,t$=u_(U);O_(I_,t$,r),I_._x_refreshXForScope=n$=>{Object.entries(n$).forEach(([he,Ne])=>{t$[he]=Ne})},y(()=>{x.after(I_),Z(()=>Q(I_))()}),typeof w=="object"&&K("x-for key cannot be an object, it must be a string or an integer",r),i[w]=I_}for(let d=0;d<g.length;d++)i[g[d]]._x_refreshXForScope(E[I.indexOf(g[d])]);r._x_prevKeys=I})}function GT(_){let $=/,([^,\}\]]*)(?:,([^,\}\]]*))?$/,e=/^\s*\(|\)\s*$/g,t=/([\s\S]*?)\s+(?:in|of)\s+([\s\S]*)/,n=_.match(t);if(!n)return;let r={};r.items=n[2].trim();let T=n[1].replace(e,"").trim(),i=T.match($);return i?(r.item=T.replace($,"").trim(),r.index=i[1].trim(),i[2]&&(r.collection=i[2].trim())):r.item=T,r}function jt(_,$,e,t){let n={};return/^\[.*\]$/.test(_.item)&&Array.isArray($)?_.item.replace("[","").replace("]","").split(",").map(T=>T.trim()).forEach((T,i)=>{n[T]=$[i]}):/^\{.*\}$/.test(_.item)&&!Array.isArray($)&&typeof $=="object"?_.item.replace("{","").replace("}","").split(",").map(T=>T.trim()).forEach(T=>{n[T]=$[T]}):n[_.item]=$,_.index&&(n[_.index]=e),_.collection&&(n[_.collection]=t),n}function wT(_){return!Array.isArray(_)&&!isNaN(_)}function qt(){}qt.inline=(_,{expression:$},{cleanup:e})=>{let t=w_(_);t._x_refs||(t._x_refs={}),t._x_refs[$]=_,e(()=>delete t._x_refs[$])},v("ref",qt),v("if",(_,{expression:$},{effect:e,cleanup:t})=>{_.tagName.toLowerCase()!=="template"&&K("x-if can only be used on a <template> tag",_);let n=G(_,$),r=()=>{if(_._x_currentIfEl)return _._x_currentIfEl;let i=_.content.cloneNode(!0).firstElementChild;return O_(i,{},_),y(()=>{_.after(i),Z(()=>Q(i))()}),_._x_currentIfEl=i,_._x_undoIf=()=>{y(()=>{d_(i),i.remove()}),delete _._x_currentIfEl},i},T=()=>{_._x_undoIf&&(_._x_undoIf(),delete _._x_undoIf)};e(()=>n(i=>{i?r():T()})),t(()=>_._x_undoIf&&_._x_undoIf())}),v("id",(_,{expression:$},{evaluate:e})=>{e($).forEach(n=>gT(_,n))}),B_((_,$)=>{_._x_ids&&($._x_ids=_._x_ids)}),h$(ke("@",Xe(f_("on:")))),v("on",Z((_,{value:$,modifiers:e,expression:t},{cleanup:n})=>{let r=t?G(_,t):()=>{};_.tagName.toLowerCase()==="template"&&(_._x_forwardEvents||(_._x_forwardEvents=[]),_._x_forwardEvents.includes($)||_._x_forwardEvents.push($));let T=k$(_,$,e,i=>{r(()=>{},{scope:{$event:i},params:[i]})});n(()=>T())})),Z_("Collapse","collapse","collapse"),Z_("Intersect","intersect","intersect"),Z_("Focus","trap","focus"),Z_("Mask","mask","mask");function Z_(_,$,e){v($,t=>K(`You can't use [x-${$}] without first installing the "${_}" plugin here: https://alpinejs.dev/plugins/${e}`,t))}h_.setEvaluator(Fe),h_.setRawEvaluator(_r),h_.setReactivityEngine({reactive:B$,effect:Jr,release:Zr,raw:D});var FT=h_,A_=FT;function BT(_){return _&&_.__esModule&&Object.prototype.hasOwnProperty.call(_,"default")?_.default:_}var _$={exports:{}},j$,zt;function S_(){return zt||(zt=1,j$=function(_,$,e){return _ instanceof HTMLCollection||_ instanceof NodeList||_ instanceof Array?Array.prototype.forEach.call(_,$,e):$.call(e,_)}),j$}var q$,Qt;function VT(){return Qt||(Qt=1,q$=function(_){var $=_.text||_.textContent||_.innerHTML||"",e=_.src||"",t=_.parentNode||document.querySelector("head")||document.documentElement,n=document.createElement("script");if($.match("document.write"))return console&&console.log&&console.log("Script contains document.write. Can’t be executed correctly. Code skipped ",_),!1;if(n.type="text/javascript",n.id=_.id,e!==""&&(n.src=e,n.async=!1),$!=="")try{n.appendChild(document.createTextNode($))}catch{n.text=$}return t.appendChild(n),(t instanceof HTMLHeadElement||t instanceof HTMLBodyElement)&&t.contains(n)&&t.removeChild(n),!0}),q$}var z$,Jt;function KT(){if(Jt)return z$;Jt=1;var _=S_(),$=VT();return z$=function(e){e.tagName.toLowerCase()==="script"&&$(e),_(e.querySelectorAll("script"),function(t){(!t.type||t.type.toLowerCase()==="text/javascript")&&(t.parentNode&&t.parentNode.removeChild(t),$(t))})},z$}var Q$,Zt;function $$(){if(Zt)return Q$;Zt=1;var _=S_();return Q$=function($,e,t,n){e=typeof e=="string"?e.split(" "):e,e.forEach(function(r){_($,function(T){T.addEventListener(r,t,n)})})},Q$}var J$,_n;function Z$(){if(_n)return J$;_n=1;var _=$$();return J$={outerHTML:function($,e){$.outerHTML=e.outerHTML,this.onSwitch()},innerHTML:function($,e){$.innerHTML=e.innerHTML,e.className===""?$.removeAttribute("class"):$.className=e.className,this.onSwitch()},switchElementsAlt:function($,e){if($.innerHTML=e.innerHTML,e.hasAttributes())for(var t=e.attributes,n=0;n<t.length;n++)$.attributes.setNamedItem(t[n].cloneNode());this.onSwitch()},replaceNode:function($,e){$.parentNode.replaceChild(e,$),this.onSwitch()},sideBySide:function($,e,t,n){var r=Array.prototype.forEach,T=[],i=[],o=document.createDocumentFragment(),E="animationend webkitAnimationEnd MSAnimationEnd oanimationend",I=0,c=(function(u){u.target===u.currentTarget&&(I--,I<=0&&T&&(T.forEach(function(p){p.parentNode&&p.parentNode.removeChild(p)}),i.forEach(function(p){p.className=p.className.replace(p.getAttribute("data-pjax-classes"),""),p.removeAttribute("data-pjax-classes")}),i=null,T=null,this.onSwitch()))}).bind(this);n=n||{},r.call($.childNodes,function(u){T.push(u),u.classList&&!u.classList.contains("js-Pjax-remove")&&(u.hasAttribute("data-pjax-classes")&&(u.className=u.className.replace(u.getAttribute("data-pjax-classes"),""),u.removeAttribute("data-pjax-classes")),u.classList.add("js-Pjax-remove"),n.callbacks&&n.callbacks.removeElement&&n.callbacks.removeElement(u),n.classNames&&(u.className+=" "+n.classNames.remove+" "+(t.backward?n.classNames.backward:n.classNames.forward)),I++,_(u,E,c,!0))}),r.call(e.childNodes,function(u){if(u.classList){var p="";n.classNames&&(p=" js-Pjax-add "+n.classNames.add+" "+(t.backward?n.classNames.forward:n.classNames.backward)),n.callbacks&&n.callbacks.addElement&&n.callbacks.addElement(u),u.className+=p,u.setAttribute("data-pjax-classes",p),i.push(u),o.appendChild(u),I++,_(u,E,c,!0)}}),$.className=e.className,$.appendChild(o)}},J$}var _e,$n;function kT(){if($n)return _e;$n=1;var _=Z$();_e=function(e){return e=e||{},e.elements=e.elements||"a[href], form[action]",e.selectors=e.selectors||["title",".js-Pjax"],e.switches=e.switches||{},e.switchesOptions=e.switchesOptions||{},e.history=typeof e.history>"u"?!0:e.history,e.analytics=typeof e.analytics=="function"||e.analytics===!1?e.analytics:$,e.scrollTo=typeof e.scrollTo>"u"?0:e.scrollTo,e.scrollRestoration=typeof e.scrollRestoration<"u"?e.scrollRestoration:!0,e.cacheBust=typeof e.cacheBust>"u"?!0:e.cacheBust,e.debug=e.debug||!1,e.timeout=e.timeout||0,e.currentUrlFullReload=typeof e.currentUrlFullReload>"u"?!1:e.currentUrlFullReload,e.switches.head||(e.switches.head=_.switchElementsAlt),e.switches.body||(e.switches.body=_.switchElementsAlt),e};function $(){window._gaq&&_gaq.push(["_trackPageview"]),window.ga&&ga("send","pageview",{page:location.pathname,title:document.title})}return _e}var $e,en;function tn(){return en||(en=1,$e=(function(){var _=0;return function(){var $="pjax"+new Date().getTime()+"_"+_;return _++,$}})()),$e}var ee,nn;function rn(){if(nn)return ee;nn=1;var _=S_();return ee=function($,e,t){e=typeof e=="string"?e.split(" "):e,e.forEach(function(n){var r;r=document.createEvent("HTMLEvents"),r.initEvent(n,!0,!0),r.eventName=n,t&&Object.keys(t).forEach(function(T){r[T]=t[T]}),_($,function(T){var i=!1;!T.parentNode&&T!==document&&T!==window&&(i=!0,document.body.appendChild(T)),T.dispatchEvent(r),i&&T.parentNode.removeChild(T)})})},ee}var te,Tn;function e$(){return Tn||(Tn=1,te=function(_){if(_===null||typeof _!="object")return _;var $=_.constructor();for(var e in _)_.hasOwnProperty(e)&&($[e]=_[e]);return $}),te}var ne,Ln;function XT(){return Ln||(Ln=1,ne=function($,e,t){for(var n=0;n<e.length;n++)for(var r=$.querySelectorAll(e[n]),T=0;T<r.length;T++)if(r[T].contains(t))return!0;return!1}),ne}var re,on;function YT(){return on||(on=1,re=function(_){if(_==null)return null;for(var $=Object(_),e=1;e<arguments.length;e++){var t=arguments[e];if(t!=null)for(var n in t)Object.prototype.hasOwnProperty.call(t,n)&&($[n]=t[n])}return $}),re}var Te,an;function En(){return an||(an=1,Te=function(){}),Te}var ie,sn;function jT(){return sn||(sn=1,ie=function(){this.options.debug&&console&&(typeof console.log=="function"?console.log.apply(console,arguments):console.log&&console.log(arguments))}),ie}var Le,An;function qT(){if(An)return Le;An=1;var _="data-pjax-state";return Le=function($){switch($.tagName.toLowerCase()){case"a":$.hasAttribute(_)||this.attachLink($);break;case"form":$.hasAttribute(_)||this.attachForm($);break;default:throw"Pjax can only be applied on <a> or <form> submit"}},Le}var oe,In;function zT(){if(In)return oe;In=1;var _=$$(),$=e$(),e="data-pjax-state",t=function(T,i){if(!r(i)){var o=$(this.options),E=n(T,i);if(E){T.setAttribute(e,E);return}if(i.preventDefault(),this.options.currentUrlFullReload&&T.href===window.location.href.split("#")[0]){T.setAttribute(e,"reload"),this.reload();return}T.setAttribute(e,"load"),o.triggerElement=T,this.loadUrl(T.href,o)}};function n(T,i){if(i.which>1||i.metaKey||i.ctrlKey||i.shiftKey||i.altKey)return"modifier";if(T.protocol!==window.location.protocol||T.host!==window.location.host)return"external";if(T.hash&&T.href.replace(T.hash,"")===window.location.href.replace(location.hash,""))return"anchor";if(T.href===window.location.href.split("#")[0]+"#")return"anchor-empty"}var r=function(T){return T.defaultPrevented||T.returnValue===!1};return oe=function(T){var i=this;T.setAttribute(e,""),_(T,"click",function(o){t.call(i,T,o)}),_(T,"keyup",(function(o){o.keyCode===13&&t.call(i,T,o)}).bind(this))},oe}var ae,ln;function QT(){if(ln)return ae;ln=1;var _=$$(),$=e$(),e="data-pjax-state",t=function(i,o){if(!T(o)){var E=$(this.options);E.requestOptions={requestUrl:i.getAttribute("action")||window.location.href,requestMethod:i.getAttribute("method")||"GET"};var I=document.createElement("a");I.setAttribute("href",E.requestOptions.requestUrl);var c=r(I,E);if(c){i.setAttribute(e,c);return}o.preventDefault(),i.enctype==="multipart/form-data"?E.requestOptions.formData=new FormData(i):E.requestOptions.requestParams=n(i),i.setAttribute(e,"submit"),E.triggerElement=i,this.loadUrl(I.href,E)}};function n(i){for(var o=[],E=i.elements,I=0;I<E.length;I++){var c=E[I],u=c.tagName.toLowerCase();if(c.name&&c.attributes!==void 0&&u!=="button"){var p=c.attributes.type;if(!p||p.value!=="checkbox"&&p.value!=="radio"||c.checked){var g=[];if(u==="select")for(var S,d=0;d<c.options.length;d++)S=c.options[d],S.selected&&!S.disabled&&g.push(S.hasAttribute("value")?S.value:S.text);else g.push(c.value);for(var m=0;m<g.length;m++)o.push({name:encodeURIComponent(c.name),value:encodeURIComponent(g[m])})}}}return o}function r(i,o){if(i.protocol!==window.location.protocol||i.host!==window.location.host)return"external";if(i.hash&&i.href.replace(i.hash,"")===window.location.href.replace(location.hash,""))return"anchor";if(i.href===window.location.href.split("#")[0]+"#")return"anchor-empty";if(o.currentUrlFullReload&&i.href===window.location.href.split("#")[0])return"reload"}var T=function(i){return i.defaultPrevented||i.returnValue===!1};return ae=function(i){var o=this;i.setAttribute(e,""),_(i,"submit",function(E){t.call(o,i,E)})},ae}var Ee,un;function JT(){if(un)return Ee;un=1;var _=S_();return Ee=function($,e,t,n){n=n||document,$.forEach(function(r){_(n.querySelectorAll(r),e,t)})},Ee}var se,cn;function ZT(){if(cn)return se;cn=1;var _=S_(),$=Z$();return se=function(e,t,n,r,T,i){var o=[];n.forEach(function(E){var I=r.querySelectorAll(E),c=T.querySelectorAll(E);if(this.log&&this.log("Pjax switch",E,I,c),I.length!==c.length)throw"DOM doesn’t look the same on new loaded page: ’"+E+"’ - new "+I.length+", old "+c.length;_(I,function(u,p){var g=c[p];this.log&&this.log("newEl",u,"oldEl",g);var S=e[E]?e[E].bind(this,g,u,i,t[E]):$.outerHTML.bind(this,g,u,i);o.push(S)},this)},this),this.state.numPendingSwitches=o.length,o.forEach(function(E){E()})},se}var Ae,Rn;function _i(){if(Rn)return Ae;Rn=1;var _=En();return Ae=function($){$&&$.readyState<4&&($.onreadystatechange=_,$.abort())},Ae}var Ie,fn;function $i(){return fn||(fn=1,Ie=function(_,$,e){var t=new RegExp("([?&])"+$+"=.*?(&|$)","i"),n=_.indexOf("?")!==-1?"&":"?";return _.match(t)?_.replace(t,"$1"+$+"="+e+"$2"):_+n+$+"="+e}),Ie}var le,dn;function ei(){if(dn)return le;dn=1;var _=$i();return le=function($,e,t){e=e||{};var n,r=e.requestOptions||{},T=(r.requestMethod||"GET").toUpperCase(),i=r.requestParams||null,o=r.formData||null,E=null,I=new XMLHttpRequest,c=e.timeout||0;if(I.onreadystatechange=function(){I.readyState===4&&(I.status===200?t(I.responseText,I,$,e):I.status!==0&&t(null,I,$,e))},I.onerror=function(u){console.log(u),t(null,I,$,e)},I.ontimeout=function(){t(null,I,$,e)},i&&i.length)switch(n=i.map(function(u){return u.name+"="+u.value}).join("&"),T){case"GET":$=$.split("?")[0],$+="?"+n;break;case"POST":E=n;break}else o&&(E=o);return e.cacheBust&&($=_($,"t",Date.now())),I.open(T,$,!0),I.timeout=c,I.setRequestHeader("X-Requested-With","XMLHttpRequest"),I.setRequestHeader("X-PJAX","true"),I.setRequestHeader("X-PJAX-Selectors",JSON.stringify(e.selectors)),E&&T==="POST"&&!o&&I.setRequestHeader("Content-Type","application/x-www-form-urlencoded"),I.send(E),I},le}var ue,hn;function ti(){if(hn)return ue;hn=1;var _=e$(),$=tn(),e=rn();return ue=function(t,n,r,T){if(T=_(T||this.options),T.request=n,t===!1){e(document,"pjax:complete pjax:error",T);return}var i=window.history.state||{};window.history.replaceState({url:i.url||window.location.href,title:i.title||document.title,uid:i.uid||$(),scrollPos:[document.documentElement.scrollLeft||document.body.scrollLeft,document.documentElement.scrollTop||document.body.scrollTop]},document.title,window.location.href);var o=r;n.responseURL?r!==n.responseURL&&(r=n.responseURL):n.getResponseHeader("X-PJAX-URL")?r=n.getResponseHeader("X-PJAX-URL"):n.getResponseHeader("X-XHR-Redirected-To")&&(r=n.getResponseHeader("X-XHR-Redirected-To"));var E=document.createElement("a");E.href=o;var I=E.hash;E.href=r,I&&!E.hash&&(E.hash=I,r=E.href),this.state.href=r,this.state.options=T;try{this.loadContent(t,T)}catch(c){if(e(document,"pjax:error",T),this.options.debug)throw c;return console&&console.error&&console.error("Pjax switch fail: ",c),this.latestChance(r)}},ue}var ce,Nn;function ni(){return Nn||(Nn=1,ce=function(){return window.history&&window.history.pushState&&window.history.replaceState&&!navigator.userAgent.match(/((iPod|iPhone|iPad).+\bOS\s+[1-4]\D|WebApps\/.+CFNetwork)/)}),ce}var Sn;function ri(){if(Sn)return _$.exports;Sn=1;var _=KT(),$=S_(),e=kT(),t=Z$(),n=tn(),r=$$(),T=rn(),i=e$(),o=XT(),E=YT(),I=En(),c=function(g){this.state={numPendingSwitches:0,href:null,options:null},this.options=e(g),this.log("Pjax options",this.options),this.options.scrollRestoration&&"scrollRestoration"in history&&(history.scrollRestoration="manual"),this.maxUid=this.lastUid=n(),this.parseDOM(document),r(window,"popstate",(function(S){if(S.state){var d=i(this.options);d.url=S.state.url,d.title=S.state.title,d.history=!1,d.scrollPos=S.state.scrollPos,S.state.uid<this.lastUid?d.backward=!0:d.forward=!0,this.lastUid=S.state.uid,this.loadUrl(S.state.url,d)}}).bind(this))};if(c.switches=t,c.prototype={log:jT(),getElements:function(g){return g.querySelectorAll(this.options.elements)},parseDOM:function(g){var S=qT();$(this.getElements(g),S,this)},refresh:function(g){this.parseDOM(g||document)},reload:function(){window.location.reload()},attachLink:zT(),attachForm:QT(),forEachSelectors:function(g,S,d){return JT().bind(this)(this.options.selectors,g,S,d)},switchSelectors:function(g,S,d,m){return ZT().bind(this)(this.options.switches,this.options.switchesOptions,g,S,d,m)},latestChance:function(g){window.location=g},onSwitch:function(){T(window,"resize scroll"),this.state.numPendingSwitches--,this.state.numPendingSwitches===0&&this.afterAllSwitches()},loadContent:function(g,S){if(typeof g!="string"){T(document,"pjax:complete pjax:error",S);return}var d=document.implementation.createHTMLDocument("pjax"),m=/<html[^>]+>/gi,W=/\s?[a-z:]+(?:=['"][^'">]+['"])*/gi,x=g.match(m);if(x&&x.length&&(x=x[0].match(W),x.length&&(x.shift(),x.forEach(function(U){var w=U.trim().split("=");w.length===1?d.documentElement.setAttribute(w[0],!0):d.documentElement.setAttribute(w[0],w[1].slice(1,-1))}))),d.documentElement.innerHTML=g,this.log("load content",d.documentElement.attributes,d.documentElement.innerHTML.length),document.activeElement&&o(document,this.options.selectors,document.activeElement))try{document.activeElement.blur()}catch{}this.switchSelectors(this.options.selectors,d,document,S)},abortRequest:_i(),doRequest:ei(),handleResponse:ti(),loadUrl:function(g,S){S=typeof S=="object"?E({},this.options,S):i(this.options),this.log("load href",g,S),this.abortRequest(this.request),T(document,"pjax:send",S),this.request=this.doRequest(g,S,this.handleResponse.bind(this))},afterAllSwitches:function(){var g=Array.prototype.slice.call(document.querySelectorAll("[autofocus]")).pop();g&&document.activeElement!==g&&g.focus(),this.options.selectors.forEach(function(U){$(document.querySelectorAll(U),function(w){_(w)})});var S=this.state;if(S.options.history&&(window.history.state||(this.lastUid=this.maxUid=n(),window.history.replaceState({url:window.location.href,title:document.title,uid:this.maxUid,scrollPos:[0,0]},document.title)),this.lastUid=this.maxUid=n(),window.history.pushState({url:S.href,title:S.options.title,uid:this.maxUid,scrollPos:[0,0]},S.options.title,S.href)),this.forEachSelectors(function(U){this.parseDOM(U)},this),T(document,"pjax:complete pjax:success",S.options),typeof S.options.analytics=="function"&&S.options.analytics(),S.options.history){var d=document.createElement("a");if(d.href=this.state.href,d.hash){var m=d.hash.slice(1);m=decodeURIComponent(m);var W=0,x=document.getElementById(m)||document.getElementsByName(m)[0];if(x&&x.offsetParent)do W+=x.offsetTop,x=x.offsetParent;while(x);window.scrollTo(0,W)}else S.options.scrollTo!==!1&&(S.options.scrollTo.length>1?window.scrollTo(S.options.scrollTo[0],S.options.scrollTo[1]):window.scrollTo(0,S.options.scrollTo))}else S.options.scrollRestoration&&S.options.scrollPos&&window.scrollTo(S.options.scrollPos[0],S.options.scrollPos[1]);this.state={numPendingSwitches:0,href:null,options:null}}},c.isSupported=ni(),c.isSupported())_$.exports=c;else{var u=I;for(var p in c.prototype)c.prototype.hasOwnProperty(p)&&typeof c.prototype[p]=="function"&&(u[p]=I);_$.exports=u}return _$.exports}var Ti=ri();const ii=BT(Ti);const Li=typeof document<"u"&&document.documentMode,oi={rootMargin:"0px",threshold:0,load(_){if(_.nodeName.toLowerCase()==="picture"){let e=_.querySelector("img"),t=!1;e===null&&(e=document.createElement("img"),t=!0),Li&&_.getAttribute("data-iesrc")&&(e.src=_.getAttribute("data-iesrc")),_.getAttribute("data-alt")&&(e.alt=_.getAttribute("data-alt")),t&&_.append(e)}if(_.nodeName.toLowerCase()==="video"&&!_.getAttribute("data-src")&&_.children){const e=_.children;let t;for(let n=0;n<=e.length-1;n++)t=e[n].getAttribute("data-src"),t&&(e[n].src=t);_.load()}_.getAttribute("data-poster")&&(_.poster=_.getAttribute("data-poster")),_.getAttribute("data-src")&&(_.src=_.getAttribute("data-src")),_.getAttribute("data-srcset")&&_.setAttribute("srcset",_.getAttribute("data-srcset"));let $=",";if(_.getAttribute("data-background-delimiter")&&($=_.getAttribute("data-background-delimiter")),_.getAttribute("data-background-image"))_.style.backgroundImage=`url('${_.getAttribute("data-background-image").split($).join("'),url('")}')`;else if(_.getAttribute("data-background-image-set")){const e=_.getAttribute("data-background-image-set").split($);let t=e[0].substr(0,e[0].indexOf(" "))||e[0];t=t.indexOf("url(")===-1?`url(${t})`:t,e.length===1?_.style.backgroundImage=t:_.setAttribute("style",(_.getAttribute("style")||"")+`background-image: ${t}; background-image: -webkit-image-set(${e}); background-image: image-set(${e})`)}_.getAttribute("data-toggle-class")&&_.classList.toggle(_.getAttribute("data-toggle-class"))},loaded(){}};function Re(_){_.setAttribute("data-loaded",!0)}function ai(_){_.getAttribute("data-placeholder-background")&&(_.style.background=_.getAttribute("data-placeholder-background"))}const fe=_=>_.getAttribute("data-loaded")==="true",Ei=(_,$)=>(e,t)=>{e.forEach(n=>{(n.intersectionRatio>0||n.isIntersecting)&&(t.unobserve(n.target),fe(n.target)||(_(n.target),Re(n.target),$(n.target)))})},Cn=(_,$=document)=>_ instanceof Element?[_]:_ instanceof NodeList?_:$.querySelectorAll(_);function si(_=".lozad",$={}){const{root:e,rootMargin:t,threshold:n,load:r,loaded:T}=Object.assign({},oi,$);let i;typeof window<"u"&&window.IntersectionObserver&&(i=new IntersectionObserver(Ei(r,T),{root:e,rootMargin:t,threshold:n}));const o=Cn(_,e);for(let E=0;E<o.length;E++)ai(o[E]);return{observe(){const E=Cn(_,e);for(let I=0;I<E.length;I++)if(!fe(E[I])){if(i){i.observe(E[I]);continue}r(E[I]),Re(E[I]),T(E[I])}},triggerLoad(E){fe(E)||(r(E),Re(E),T(E))},observer:i}}const Ai={FULL_WIDTH:0,FITTING:1,SMUSHING:2,CONTROLLED_SMUSHING:3};class Ii{constructor(){this.comment="",this.numChars=0,this.options={}}}const de=["1Row","3-D","3D Diagonal","3D-ASCII","3x5","4Max","5 Line Oblique","AMC 3 Line","AMC 3 Liv1","AMC AAA01","AMC Neko","AMC Razor","AMC Razor2","AMC Slash","AMC Slider","AMC Thin","AMC Tubes","AMC Untitled","ANSI Regular","ANSI Shadow","ANSI-Compact","ASCII 12","ASCII 9","ASCII New Roman","Acrobatic","Alligator","Alligator2","Alpha","Alphabet","Arrows","Avatar","B1FF","Babyface Lame","Babyface Leet","Banner","Banner3-D","Banner3","Banner4","Barbwire","Basic","Bear","Bell","Benjamin","Big ASCII 12","Big ASCII 9","Big Chief","Big Money-ne","Big Money-nw","Big Money-se","Big Money-sw","Big Mono 12","Big Mono 9","Big","Bigfig","Binary","Block","Blocks","Bloody","BlurVision ASCII","Bolger","Braced","Bright","Broadway KB","Broadway","Bubble","Bulbhead","Caligraphy","Caligraphy2","Calvin S","Cards","Catwalk","Chiseled","Chunky","Circle","Coinstak","Cola","Colossal","Computer","Contessa","Contrast","Cosmike","Cosmike2","Crawford","Crawford2","Crazy","Cricket","Cursive","Cyberlarge","Cybermedium","Cybersmall","Cygnet","DANC4","DOS Rebel","DWhistled","Dancing Font","Decimal","Def Leppard","Delta Corps Priest 1","DiamFont","Diamond","Diet Cola","Digital","Doh","Doom","Dot Matrix","Double Shorts","Double","Dr Pepper","Efti Chess","Efti Font","Efti Italic","Efti Piti","Efti Robot","Efti Wall","Efti Water","Electronic","Elite","Emboss 2","Emboss","Epic","Fender","Filter","Fire Font-k","Fire Font-s","Flipped","Flower Power","Four Tops","Fraktur","Fun Face","Fun Faces","Future","Fuzzy","Georgi16","Georgia11","Ghost","Ghoulish","Glenyn","Goofy","Gothic","Graceful","Gradient","Graffiti","Greek","Heart Left","Heart Right","Henry 3D","Hex","Hieroglyphs","Hollywood","Horizontal Left","Horizontal Right","ICL-1900","Impossible","Invita","Isometric1","Isometric2","Isometric3","Isometric4","Italic","Ivrit","JS Block Letters","JS Bracket Letters","JS Capital Curves","JS Cursive","JS Stick Letters","Jacky","Jazmine","Jerusalem","Katakana","Kban","Keyboard","Knob","Konto Slant","Konto","LCD","Larry 3D 2","Larry 3D","Lean","Letter","Letters","Lil Devil","Line Blocks","Linux","Lockergnome","Madrid","Marquee","Maxfour","Merlin1","Merlin2","Mike","Mini","Mirror","Mnemonic","Modular","Mono 12","Mono 9","Morse","Morse2","Moscow","Mshebrew210","Muzzle","NScript","NT Greek","NV Script","Nancyj-Fancy","Nancyj-Improved","Nancyj-Underlined","Nancyj","Nipples","O8","OS2","Octal","Ogre","Old Banner","Pagga","Patorjk's Cheese","Patorjk-HeX","Pawp","Peaks Slant","Peaks","Pebbles","Pepper","Poison","Puffy","Puzzle","Pyramid","Rammstein","Rebel","Rectangles","Red Phoenix","Relief","Relief2","Reverse","Roman","Rot13","Rotated","Rounded","Rowan Cap","Rozzo","RubiFont","Runic","Runyc","S Blood","SL Script","Santa Clara","Script","Serifcap","Shaded Blocky","Shadow","Shimrod","Short","Slant Relief","Slant","Slide","Small ASCII 12","Small ASCII 9","Small Block","Small Braille","Small Caps","Small Isometric1","Small Keyboard","Small Mono 12","Small Mono 9","Small Poison","Small Script","Small Shadow","Small Slant","Small Tengwar","Small","Soft","Speed","Spliff","Stacey","Stampate","Stampatello","Standard","Star Strips","Star Wars","Stellar","Stforek","Stick Letters","Stop","Straight","Stronger Than All","Sub-Zero","Swamp Land","Swan","Sweet","THIS","Tanja","Tengwar","Term","Terrace","Test1","The Edge","Thick","Thin","Thorned","Three Point","Ticks Slant","Ticks","Tiles","Tinker-Toy","Tmplr","Tombstone","Train","Trek","Tsalagi","Tubular","Twisted","Two Point","USA Flag","Univers","Upside Down Text","Varsity","Wavescape","Wavy","Weird","Wet Letter","Whimsy","WideTerm","Wow","miniwi"];function li(_){return/[.*+?^${}()|[\]\\]/.test(_)?"\\"+_:_}const V=(()=>{const{FULL_WIDTH:_=0,FITTING:$,SMUSHING:e,CONTROLLED_SMUSHING:t}=Ai,n={},r={font:"Standard",fontPath:"./fonts",fetchFontIfMissing:!0};function T(s,A,L){const a=li(s.trim().slice(-1))||"@",l=A===L-1?new RegExp(a+a+"?\\s*$"):new RegExp(a+"\\s*$");return s.replace(l,"")}function i(s=-1,A=null){let L={},a,l=[[16384,"vLayout",e],[8192,"vLayout",$],[4096,"vRule5",!0],[2048,"vRule4",!0],[1024,"vRule3",!0],[512,"vRule2",!0],[256,"vRule1",!0],[128,"hLayout",e],[64,"hLayout",$],[32,"hRule6",!0],[16,"hRule5",!0],[8,"hRule4",!0],[4,"hRule3",!0],[2,"hRule2",!0],[1,"hRule1",!0]];a=A!==null?A:s;for(const[R,h,f]of l)a>=R?(a-=R,L[h]===void 0&&(L[h]=f)):h!=="vLayout"&&h!=="hLayout"&&(L[h]=!1);return typeof L.hLayout>"u"?s===0?L.hLayout=$:s===-1?L.hLayout=_:L.hRule1||L.hRule2||L.hRule3||L.hRule4||L.hRule5||L.hRule6?L.hLayout=t:L.hLayout=e:L.hLayout===e&&(L.hRule1||L.hRule2||L.hRule3||L.hRule4||L.hRule5||L.hRule6)&&(L.hLayout=t),typeof L.vLayout>"u"?L.vRule1||L.vRule2||L.vRule3||L.vRule4||L.vRule5?L.vLayout=t:L.vLayout=_:L.vLayout===e&&(L.vRule1||L.vRule2||L.vRule3||L.vRule4||L.vRule5)&&(L.vLayout=t),L}function o(s,A,L=""){return s===A&&s!==L?s:!1}function E(s,A){let L="|/\\[]{}()<>";if(s==="_"){if(L.indexOf(A)!==-1)return A}else if(A==="_"&&L.indexOf(s)!==-1)return s;return!1}function I(s,A){let L="| /\\ [] {} () <>",a=L.indexOf(s),l=L.indexOf(A);if(a!==-1&&l!==-1&&a!==l&&Math.abs(a-l)!==1){const R=Math.max(a,l),h=R+1;return L.substring(R,h)}return!1}function c(s,A){let L="[] {} ()",a=L.indexOf(s),l=L.indexOf(A);return a!==-1&&l!==-1&&Math.abs(a-l)<=1?"|":!1}function u(s,A){return{"/\\":"|","\\/":"Y","><":"X"}[s+A]||!1}function p(s,A,L=""){return s===L&&A===L?L:!1}function g(s,A){return s===A?s:!1}function S(s,A){return E(s,A)}function d(s,A){return I(s,A)}function m(s,A){return s==="-"&&A==="_"||s==="_"&&A==="-"?"=":!1}function W(s,A){return s==="|"&&A==="|"?"|":!1}function x(s,A,L){return A===" "||A===""||A===L&&s!==" "?s:A}function U(s,A,L){if(L.fittingRules&&L.fittingRules.vLayout===_)return"invalid";let a,l=Math.min(s.length,A.length),R,h,f=!1,N;if(l===0)return"invalid";for(a=0;a<l;a++)if(R=s.substring(a,a+1),h=A.substring(a,a+1),R!==" "&&h!==" "){if(L.fittingRules&&L.fittingRules.vLayout===$)return"invalid";if(L.fittingRules&&L.fittingRules.vLayout===e)return"end";if(W(R,h)){f=f||!1;continue}if(N=!1,N=L.fittingRules&&L.fittingRules.vRule1?g(R,h):N,N=!N&&L.fittingRules&&L.fittingRules.vRule2?S(R,h):N,N=!N&&L.fittingRules&&L.fittingRules.vRule3?d(R,h):N,N=!N&&L.fittingRules&&L.fittingRules.vRule4?m(R,h):N,f=!0,!N)return"invalid"}return f?"end":"valid"}function w(s,A,L){let a=s.length,l=s.length,R,h,f,N=1,C,H,O;for(;N<=a;){for(R=s.slice(Math.max(0,l-N),l),h=A.slice(0,Math.min(a,N)),f=h.length,O="",C=0;C<f;C++)if(H=U(R[C],h[C],L),H==="end")O=H;else if(H==="invalid"){O=H;break}else O===""&&(O="valid");if(O==="invalid"){N--;break}if(O==="end")break;O==="valid"&&N++}return Math.min(a,N)}function I_(s,A,L){let a,l=Math.min(s.length,A.length),R,h,f="",N;const C=L.fittingRules||{};for(a=0;a<l;a++)R=s.substring(a,a+1),h=A.substring(a,a+1),R!==" "&&h!==" "?C.vLayout===$||C.vLayout===e?f+=x(R,h):(N=!1,N=C.vRule5?W(R,h):N,N=!N&&C.vRule1?g(R,h):N,N=!N&&C.vRule2?S(R,h):N,N=!N&&C.vRule3?d(R,h):N,N=!N&&C.vRule4?m(R,h):N,f+=N):f+=x(R,h);return f}function t$(s,A,L,a){let l=s.length,R=A.length,h=s.slice(0,Math.max(0,l-L)),f=s.slice(Math.max(0,l-L),l),N=A.slice(0,Math.min(L,R)),C,H,O,M=[],P;for(H=f.length,C=0;C<H;C++)C>=R?O=f[C]:O=I_(f[C],N[C],a),M.push(O);return P=A.slice(Math.min(L,R),R),[...h,...M,...P]}function n$(s,A){const L=" ".repeat(A);return s.map(a=>a+L)}function he(s,A,L){let a=s[0].length,l=A[0].length,R;return a>l?A=n$(A,a-l):l>a&&(s=n$(s,l-a)),R=w(s,A,L),t$(s,A,R,L)}function Ne(s,A,L){const a=L.fittingRules||{};if(a.hLayout===_)return 0;let l,R=s.length,h=A.length,f=R,N=1,C=!1,H,O,M,P;if(R===0)return 0;_:for(;N<=f;){const j=R-N;for(H=s.substring(j,j+N),O=A.substring(0,Math.min(N,h)),l=0;l<Math.min(N,h);l++)if(M=H.substring(l,l+1),P=O.substring(l,l+1),M!==" "&&P!==" "){if(a.hLayout===$){N=N-1;break _}else if(a.hLayout===e){(M===L.hardBlank||P===L.hardBlank)&&(N=N-1);break _}else if(C=!0,!(a.hRule1&&o(M,P,L.hardBlank)||a.hRule2&&E(M,P)||a.hRule3&&I(M,P)||a.hRule4&&c(M,P)||a.hRule5&&u(M,P)||a.hRule6&&p(M,P,L.hardBlank))){N=N-1;break _}}if(C)break;N++}return Math.min(f,N)}function Se(s,A,L,a){let l,R,h=[],f,N,C,H,O,M,P,j;const F=a.fittingRules||{};if(typeof a.height!="number")throw new Error("height is not defined.");for(l=0;l<a.height;l++){P=s[l],j=A[l],O=P.length,M=j.length,f=O-L,N=P.slice(0,Math.max(0,f)),C="";const v_=Math.max(0,O-L);let q=P.substring(v_,v_+L),l_=j.substring(0,Math.min(L,M));for(R=0;R<L;R++){let k=R<O?q.substring(R,R+1):" ",B=R<M?l_.substring(R,R+1):" ";if(k!==" "&&B!==" ")if(F.hLayout===$||F.hLayout===e)C+=x(k,B,a.hardBlank);else{const Pi=F.hRule1&&o(k,B,a.hardBlank)||F.hRule2&&E(k,B)||F.hRule3&&I(k,B)||F.hRule4&&c(k,B)||F.hRule5&&u(k,B)||F.hRule6&&p(k,B,a.hardBlank)||x(k,B,a.hardBlank);C+=Pi}else C+=x(k,B,a.hardBlank)}L>=M?H="":H=j.substring(L,L+Math.max(0,M-L)),h[l]=N+C+H}return h}function C_(s){return new Array(s).fill("")}const U_=function(s){return Math.max(...s.map(A=>A.length))};function p_(s,A,L){return s.reduce(function(a,l){return Se(a,l.fig,l.overlap||0,L)},C_(A))}function Hi(s,A,L){for(let a=s.length-1;a>0;a--){const l=p_(s.slice(0,a),A,L);if(U_(l)<=L.width)return{outputFigText:l,chars:s.slice(a)}}return{outputFigText:C_(A),chars:s}}function Mi(s,A,L){let a,l,R=0,h,f,N,C=L.height,H=[],O,M={chars:[],overlap:R},P=[],j,F,v_,q,l_;if(typeof C!="number")throw new Error("height is not defined.");f=C_(C);const k=L.fittingRules||{};for(L.printDirection===1&&(s=s.split("").reverse().join("")),N=s.length,a=0;a<N;a++)if(j=s.substring(a,a+1),F=j.match(/\s/),l=A[j.charCodeAt(0)],q=null,l){if(k.hLayout!==_){for(R=1e4,h=0;h<C;h++)R=Math.min(R,Ne(f[h],l[h],L));R=R===1e4?0:R}if(L.width>0&&(L.whitespaceBreak?(v_=p_(M.chars.concat([{fig:l,overlap:R}]),C,L),q=p_(P.concat([{fig:v_,overlap:M.overlap}]),C,L),O=U_(q)):(q=Se(f,l,R,L),O=U_(q)),O>=L.width&&a>0&&(L.whitespaceBreak?(f=p_(P.slice(0,-1),C,L),P.length>1&&(H.push(f),f=C_(C)),P=[]):(H.push(f),f=C_(C)))),L.width>0&&L.whitespaceBreak&&((!F||a===N-1)&&M.chars.push({fig:l,overlap:R}),F||a===N-1)){for(l_=null;q=p_(M.chars,C,L),O=U_(q),O>=L.width;)l_=Hi(M.chars,C,L),M={chars:l_.chars},H.push(l_.outputFigText);O>0&&(l_?P.push({fig:q,overlap:1}):P.push({fig:q,overlap:M.overlap})),F&&(P.push({fig:l,overlap:R}),f=C_(C)),a===N-1&&(f=p_(P,C,L)),M={chars:[],overlap:R};continue}f=Se(f,l,R,L)}return U_(f)>0&&H.push(f),L.showHardBlanks||H.forEach(function(B){for(N=B.length,h=0;h<N;h++)B[h]=B[h].replace(new RegExp("\\"+L.hardBlank,"g")," ")}),s===""&&H.length===0&&H.push(new Array(C).fill("")),H}const mi=function(s,A){let L;const a=A.fittingRules||{};if(s==="default")L={hLayout:a.hLayout,hRule1:a.hRule1,hRule2:a.hRule2,hRule3:a.hRule3,hRule4:a.hRule4,hRule5:a.hRule5,hRule6:a.hRule6};else if(s==="full")L={hLayout:_,hRule1:!1,hRule2:!1,hRule3:!1,hRule4:!1,hRule5:!1,hRule6:!1};else if(s==="fitted")L={hLayout:$,hRule1:!1,hRule2:!1,hRule3:!1,hRule4:!1,hRule5:!1,hRule6:!1};else if(s==="controlled smushing")L={hLayout:t,hRule1:!0,hRule2:!0,hRule3:!0,hRule4:!0,hRule5:!0,hRule6:!0};else if(s==="universal smushing")L={hLayout:e,hRule1:!1,hRule2:!1,hRule3:!1,hRule4:!1,hRule5:!1,hRule6:!1};else return;return L},xi=function(s,A){let L={};const a=A.fittingRules||{};if(s==="default")L={vLayout:a.vLayout,vRule1:a.vRule1,vRule2:a.vRule2,vRule3:a.vRule3,vRule4:a.vRule4,vRule5:a.vRule5};else if(s==="full")L={vLayout:_,vRule1:!1,vRule2:!1,vRule3:!1,vRule4:!1,vRule5:!1};else if(s==="fitted")L={vLayout:$,vRule1:!1,vRule2:!1,vRule3:!1,vRule4:!1,vRule5:!1};else if(s==="controlled smushing")L={vLayout:t,vRule1:!0,vRule2:!0,vRule3:!0,vRule4:!0,vRule5:!0};else if(s==="universal smushing")L={vLayout:e,vRule1:!1,vRule2:!1,vRule3:!1,vRule4:!1,vRule5:!1};else return;return L},gn=function(s,A,L){L=L.replace(/\r\n/g,`
`).replace(/\r/g,`
`);let a=L.split(`
`),l=[],R,h,f;for(h=a.length,R=0;R<h;R++)l=l.concat(Mi(a[R],n[s],A));for(h=l.length,f=l[0],R=1;R<h;R++)f=he(f,l[R],A);return f?f.join(`
`):""};function On(s,A){let L;if(typeof structuredClone<"u"?L=structuredClone(s):L=JSON.parse(JSON.stringify(s)),L.showHardBlanks=A.showHardBlanks||!1,L.width=A.width||-1,L.whitespaceBreak=A.whitespaceBreak||!1,A.horizontalLayout){const a=mi(A.horizontalLayout,s);a&&Object.assign(L.fittingRules,a)}if(A.verticalLayout){const a=xi(A.verticalLayout,s);a&&Object.assign(L.fittingRules,a)}return L.printDirection=A.printDirection!==null&&A.printDirection!==void 0?A.printDirection:s.printDirection,L}const b=async function(s,A,L){return b.text(s,A,L)};return b.text=async function(s,A,L){s=s+"";let a,l;typeof A=="function"?(l=A,a={font:r.font}):typeof A=="string"?(a={font:A},l=L):A?(a=A,l=L):(a={font:r.font},l=L);const R=a.font||r.font;try{const h=await b.loadFont(R),f=h?gn(R,On(h,a),s):"";return l&&l(null,f),f}catch(h){const f=h instanceof Error?h:new Error(String(h));if(l)return l(f),"";throw f}},b.textSync=function(s,A){s=s+"",typeof A=="string"?A={font:A}:A=A||{};const L=A.font||r.font;let a=On(b.loadFontSync(L),A);return gn(L,a,s)},b.metadata=async function(s,A){s=s+"";try{const L=await b.loadFont(s);if(!L)throw new Error("Error loading font.");const a=n[s]||{},l=[L,a.comment||""];return A&&A(null,L,a.comment),l}catch(L){const a=L instanceof Error?L:new Error(String(L));if(A)return A(a),null;throw a}},b.defaults=function(s){return s&&typeof s=="object"&&Object.assign(r,s),typeof structuredClone<"u"?structuredClone(r):JSON.parse(JSON.stringify(r))},b.parseFont=function(s,A,L=!0){if(n[s]&&!L)return n[s].options;A=A.replace(/\r\n/g,`
`).replace(/\r/g,`
`);const a=new Ii,l=A.split(`
`),R=l.shift();if(!R)throw new Error("Invalid font file: missing header");const h=R.split(" "),f={hardBlank:h[0].substring(5,6),height:parseInt(h[1],10),baseline:parseInt(h[2],10),maxLength:parseInt(h[3],10),oldLayout:parseInt(h[4],10),numCommentLines:parseInt(h[5],10),printDirection:h[6]?parseInt(h[6],10):0,fullLayout:h[7]?parseInt(h[7],10):null,codeTagCount:h[8]?parseInt(h[8],10):null};if((f.hardBlank||"").length!==1||[f.height,f.baseline,f.maxLength,f.oldLayout,f.numCommentLines].some(H=>H==null||isNaN(H)))throw new Error("FIGlet header contains invalid values.");if(f.height==null||f.numCommentLines==null)throw new Error("FIGlet header contains invalid values.");f.fittingRules=i(f.oldLayout,f.fullLayout),a.options=f;const C=[];for(let H=32;H<=126;H++)C.push(H);if(C.push(196,214,220,228,246,252,223),l.length<f.numCommentLines+f.height*C.length)throw new Error(`FIGlet file is missing data. Line length: ${l.length}. Comment lines: ${f.numCommentLines}. Height: ${f.height}. Num chars: ${C.length}.`);for(a.comment=l.splice(0,f.numCommentLines).join(`
`),a.numChars=0;l.length>0&&a.numChars<C.length;){const H=C[a.numChars];a[H]=l.splice(0,f.height);for(let O=0;O<f.height;O++)typeof a[H][O]>"u"?a[H][O]="":a[H][O]=T(a[H][O],O,f.height);a.numChars++}for(;l.length>0;){const H=l.shift();if(!H||H.trim()==="")break;let O=H.split(" ")[0],M;if(/^-?0[xX][0-9a-fA-F]+$/.test(O))M=parseInt(O,16);else if(/^-?0[0-7]+$/.test(O))M=parseInt(O,8);else if(/^-?[0-9]+$/.test(O))M=parseInt(O,10);else throw new Error(`Error parsing data. Invalid data: ${O}`);if(M===-1||M<-2147483648||M>2147483647){const P=M===-1?"The char code -1 is not permitted.":`The char code cannot be ${M<-2147483648?"less than -2147483648":"greater than 2147483647"}.`;throw new Error(`Error parsing data. ${P}`)}a[M]=l.splice(0,f.height);for(let P=0;P<f.height;P++)typeof a[M][P]>"u"?a[M][P]="":a[M][P]=T(a[M][P],P,f.height);a.numChars++}return n[s]=a,f},b.loadedFonts=()=>Object.keys(n),b.clearLoadedFonts=()=>{Object.keys(n).forEach(s=>{delete n[s]})},b.loadFont=async function(s,A){if(n[s]){const L=n[s].options;return A&&A(null,L),Promise.resolve(L)}try{if(!r.fetchFontIfMissing)throw new Error(`Font is not loaded: ${s}`);const L=await fetch(`${r.fontPath}/${s}.flf`);if(!L.ok)throw new Error(`Network response was not ok: ${L.status}`);const a=await L.text(),l=b.parseFont(s,a);return A&&A(null,l),l}catch(L){const a=L instanceof Error?L:new Error(String(L));if(A)return A(a),null;throw a}},b.loadFontSync=function(s){if(n[s])return n[s].options;throw new Error("Synchronous font loading is not implemented for the browser, it will only work for fonts already loaded.")},b.preloadFonts=async function(s,A){try{for(const L of s){const a=await fetch(`${r.fontPath}/${L}.flf`);if(!a.ok)throw new Error(`Failed to preload fonts. Error fetching font: ${L}, status code: ${a.statusText}`);const l=await a.text();b.parseFont(L,l)}A&&A()}catch(L){const a=L instanceof Error?L:new Error(String(L));if(A){A(a);return}throw L}},b.fonts=function(s){return new Promise(function(A,L){A(de),s&&s(null,de)})},b.fontsSync=function(){return de},b.figFonts=n,b})(),ui=`flf2a$ 6 5 16 15 13 0 24463 229
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
         `,ci=`flf2a$ 8 7 54 0 12 0 64 185
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
`,Ri=`flf2a$ 8 6 59 15 10 0 24463
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
`,fi=`flf2a$ 8 6 27 0 10 0 576
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
`,di=`flf2a$ 8 6 14 15 16
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
`,hi=`flf2a$ 8 6 27 0 10 0 576
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
`,Ni=`flf2a$ 4 3 10 0 10 0 1920
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
`,Si=`flf2a$ 7 5 16 0 10 0 3904 96
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
`,Ci=`flf2a$ 5 4 16 0 14 0 4992
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
`,pi=`flf2a$ 6 5 16 15 10 0 18319
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
`,gi=`flf2a$ 5 4 13 15 10 0 22415
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
`,Oi=`flf2a$ 6 5 16 15 16
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
`;V.parseFont("Standard",ui),V.parseFont("Banner",ci),V.parseFont("Big",Ri),V.parseFont("Block",fi),V.parseFont("Doom",di),V.parseFont("Lean",hi),V.parseFont("Mini",Ni),V.parseFont("Script",Si),V.parseFont("Shadow",Ci),V.parseFont("Slant",pi),V.parseFont("Small",gi),V.parseFont("Speed",Oi),A_.data("asciiTitle",(_="",$="Standard")=>({title:_,font:$,asciiArt:"",init(){this.title&&V.text(this.title,{font:this.font||"Standard",horizontalLayout:"default",verticalLayout:"default"},(e,t)=>{!e&&t&&(this.asciiArt=t)})}})),A_.data("typewriter",(_="",$=50)=>({text:_,display:"",init(){let e=0;this.display="";const t=setInterval(()=>{e<this.text.length?(this.display+=this.text.charAt(e),e++):clearInterval(t)},$)}})),A_.data("terminalInput",(_="~/blog")=>({command:"",currentPath:_,history:[],historyIndex:-1,suggestions:[],showHelp:!1,helpText:`
Available commands:
  cd <path>     - Navigate to a path (e.g. 'cd categories/ai')
  ls            - List directory contents
  search <key>  - Search posts by keyword
  help          - Show this help message
  clear         - Clear command output

Navigation:
  ↑/↓           - History
  Tab           - Auto-complete
  Enter         - Execute
`.trim(),output:"",init(){console.log("[VFS] Terminal initialized at ~/blog (fixed path)"),this.currentPath="~/blog",this.$nextTick(()=>{const $=this.$refs.cmdInput;$&&$.focus()})},handleKeydown($){$.isComposing||($.key==="Enter"?($.preventDefault(),this.executeCommand()):$.key==="ArrowUp"?($.preventDefault(),this.navigateHistory(-1)):$.key==="ArrowDown"?($.preventDefault(),this.navigateHistory(1)):$.key==="Tab"?($.preventDefault(),this.autoComplete()):$.key==="Escape"&&($.preventDefault(),this.command="",this.showHelp=!1,this.output=""))},navigateHistory($){if(this.history.length!==0){if(this.historyIndex+=$,this.historyIndex<0&&(this.historyIndex=0),this.historyIndex>=this.history.length){this.historyIndex=this.history.length,this.command="";return}this.command=this.history[this.historyIndex]}},completionState:{candidates:[],index:0,original:""},autoComplete(){const $=this.command,e=this.completionState.candidates[this.completionState.index];this.completionState.candidates.length>0&&$===e?this.completionState.index=(this.completionState.index+1)%this.completionState.candidates.length:(this.completionState.original=$,this.completionState.candidates=this.getSuggestions($),this.completionState.index=0),this.completionState.candidates.length>0&&(this.command=this.completionState.candidates[this.completionState.index])},getSuggestions($){const e=$.toLowerCase();if(!$.includes(" "))return["cd","ls","search","help","clear"].filter(o=>o.startsWith(e)).map(o=>o+(o==="help"||o==="clear"?"":" "));const t=$.split(" "),n=t[0].toLowerCase(),r=t.slice(1).join(" "),T=r.toLowerCase();if(n==="cd"||n==="ls"||n==="ll"){const i=[],o=["categories/","tags/","../","/","~"];if((!r||!r.includes("/"))&&o.filter(E=>E.startsWith(T)).forEach(E=>i.push(`${n} ${E}`)),T.startsWith("categories/")){const E=r.substring(11);(window.haloData?.categories||[]).forEach(c=>{const u=c.spec?.slug||"",p=c.spec?.displayName||"";u.toLowerCase().startsWith(E.toLowerCase())?i.push(`${n} categories/${u}`):p.toLowerCase().startsWith(E.toLowerCase())&&i.push(`${n} categories/${p}`)})}if(T.startsWith("tags/")){const E=r.substring(5);(window.haloData?.tags||[]).forEach(c=>{const u=c.spec?.slug||"";u.toLowerCase().startsWith(E.toLowerCase())&&i.push(`${n} tags/${u}`)})}return i}return[]},async executeCommand(){const $=this.command.trim();if(!$)return;this.history[this.history.length-1]!==$&&this.history.push($),this.historyIndex=this.history.length;const e=$.split(/\s+/),t=e[0].toLowerCase(),n=e.slice(1).join(" ");switch(this.showHelp=!1,this.output="",t){case"cd":this.handleCd(n);break;case"ls":case"ll":await this.handleLs(n);break;case"search":n?window.location.href=`/search?keyword=${encodeURIComponent(n)}`:this.output="Usage: search <keyword>";break;case"help":this.showHelp=!0;break;case"clear":this.output="",this.showHelp=!1;break;default:this.output=`bash: ${t}: command not found. Type 'help' for available commands.`}this.command=""},async handleLs($){this.output="Loading...",await new Promise(r=>setTimeout(r,50));const e=$?this.resolvePath($):this.currentPath,t=this.getDirectoryContent(e);if(t===null){this.output=`ls: ${$}: No such file or directory`;return}if(t.length===0){$&&e!==this.currentPath?this.output="Directory is empty or content not accessible remotely.":this.output="Total 0";return}const n=t.map(r=>{const T=r.date||new Date().toISOString().slice(0,10),i=r.type==="dir"?"drwxr-xr-x":"-rw-r--r--",o=r.count?String(r.count).padStart(3):"  1",E=window.haloData?.user||"user",I="staff",c=r.type==="dir"?"/":"";return`${i}  ${o} ${E}  ${I}  ${T}  ${r.name}${c}`});this.output=`Total ${t.length}
`+n.join(`
`)},handleCd($){if(console.log("[VFS] handleCd called with:",$),!$||$===".")return;const e=this.resolvePath($);console.log("[VFS] handleCd target:",e);const t=this.getDirectoryContent(e);if(console.log("[VFS] handleCd content:",t),t!==null){const i=this.virtualPathToUrl(e);if(console.log("[VFS] handleCd url:",i),i){console.log("[VFS] handleCd navigating to:",i),window.location.href=i;return}else{this.currentPath=e,this.output="";return}}const n=e.substring(0,e.lastIndexOf("/")),r=e.substring(e.lastIndexOf("/")+1);console.log("[VFS] handleCd checking file:",r,"in parent:",n);const T=this.getDirectoryContent(n);if(T){const i=T.find(o=>o.name===r&&o.type==="file");if(i&&i.permalink){console.log("[VFS] handleCd file found, navigating to:",i.permalink),window.location.href=i.permalink;return}}console.log("[VFS] handleCd failed - no such file or directory"),this.output=`bash: cd: ${$}: No such file or directory`},resolvePath($){console.log("[VFS] resolvePath input:",$,"currentPath:",this.currentPath);let e;if($.startsWith("/")||$.startsWith("~"))e=this.normalize($);else{const t=this.currentPath.endsWith("/")?this.currentPath:this.currentPath+"/";e=this.normalize(t+$)}return console.log("[VFS] resolvePath result:",e),e},normalize($){console.log("[VFS] normalize input:",$);let e=$;e==="~"?e="~/blog":e.startsWith("~/")&&!e.startsWith("~/blog")&&(e="~/blog"+e.substring(1)),e.startsWith("~/blog")||(e.startsWith("/")?e="~/blog"+e:e="~/blog/"+e);const t=e.split("/"),n=[];for(const T of t)T===""||T==="."||(T===".."?n.length>2&&n.pop():n.push(T));const r=n.length<2?"~/blog":n.join("/");return console.log("[VFS] normalize result:",r),r},getDirectoryContent($){return console.log("[VFS] getDirectoryContent called with:",$),console.log("[VFS] haloData:",window.haloData),$==="~/blog"?(console.log("[VFS] getDirectoryContent matched: ~/blog (root)"),[{name:"categories",type:"dir",count:(window.haloData?.categories||[]).length},{name:"tags",type:"dir",count:(window.haloData?.tags||[]).length}]):(console.log("[VFS] getDirectoryContent - path not supported (root-only mode)"),null)},virtualPathToUrl($){if(console.log("[VFS] virtualPathToUrl called with:",$),$==="~/blog")return window.haloData?.urls?.home||"/";if($==="~/blog/categories"){const e=window.haloData?.urls?.categories||"/categories";return console.log("[VFS] virtualPathToUrl -> categories URL:",e),e}if($==="~/blog/tags"){const e=window.haloData?.urls?.tags||"/tags";return console.log("[VFS] virtualPathToUrl -> tags URL:",e),e}return console.log("[VFS] virtualPathToUrl - no URL mapping found"),null}})),A_.data("fileListNav",()=>({selectedIndex:-1,items:[],init(){this.items=Array.from(this.$el.querySelectorAll("[data-nav-item]")),this.items.length>0&&(this.selectedIndex=0),window.addEventListener("keydown",this.handleKeydown.bind(this))},destroy(){window.removeEventListener("keydown",this.handleKeydown.bind(this))},handleKeydown(_){if(this.items.length!==0){if(_.key==="ArrowDown")_.preventDefault(),this.selectedIndex=(this.selectedIndex+1)%this.items.length,this.scrollToSelected();else if(_.key==="ArrowUp")_.preventDefault(),this.selectedIndex=(this.selectedIndex-1+this.items.length)%this.items.length,this.scrollToSelected();else if(_.key==="Enter"&&(_.preventDefault(),this.selectedIndex>=0&&this.selectedIndex<this.items.length)){const $=this.items[this.selectedIndex];if($.tagName==="A")$.click();else{const e=$.querySelector("a");e&&e.click()}}}},scrollToSelected(){this.selectedIndex>=0&&this.items[this.selectedIndex]&&this.items[this.selectedIndex].scrollIntoView({block:"nearest",behavior:"smooth"})}})),window.Alpine=A_,A_.start();const pn=si(".lozad",{loaded:_=>{_.classList.add("loaded")}});pn.observe(),new ii({elements:'a[href]:not([target="_blank"])',selectors:["title","#main"],cacheBust:!1,analytics:!1,scrollRestoration:!1}),document.addEventListener("click",_=>{_.target.tagName==="A"||_.target.tagName}),document.addEventListener("pjax:send",()=>{const _=document.getElementById("main");_&&_.classList.add("loading")}),document.addEventListener("pjax:complete",()=>{const _=document.getElementById("main");_&&(_.classList.remove("loading"),A_.initTree(_),pn.observe(),window.scrollTo(0,0))}),document.addEventListener("pjax:error",()=>{console.error("Pjax error")})})();
