(function(){"use strict";const zn={FULL_WIDTH:0,FITTING:1,SMUSHING:2,CONTROLLED_SMUSHING:3};class Qn{constructor(){this.comment="",this.numChars=0,this.options={}}}const o$=["1Row","3-D","3D Diagonal","3D-ASCII","3x5","4Max","5 Line Oblique","AMC 3 Line","AMC 3 Liv1","AMC AAA01","AMC Neko","AMC Razor","AMC Razor2","AMC Slash","AMC Slider","AMC Thin","AMC Tubes","AMC Untitled","ANSI Regular","ANSI Shadow","ANSI-Compact","ASCII 12","ASCII 9","ASCII New Roman","Acrobatic","Alligator","Alligator2","Alpha","Alphabet","Arrows","Avatar","B1FF","Babyface Lame","Babyface Leet","Banner","Banner3-D","Banner3","Banner4","Barbwire","Basic","Bear","Bell","Benjamin","Big ASCII 12","Big ASCII 9","Big Chief","Big Money-ne","Big Money-nw","Big Money-se","Big Money-sw","Big Mono 12","Big Mono 9","Big","Bigfig","Binary","Block","Blocks","Bloody","BlurVision ASCII","Bolger","Braced","Bright","Broadway KB","Broadway","Bubble","Bulbhead","Caligraphy","Caligraphy2","Calvin S","Cards","Catwalk","Chiseled","Chunky","Circle","Coinstak","Cola","Colossal","Computer","Contessa","Contrast","Cosmike","Cosmike2","Crawford","Crawford2","Crazy","Cricket","Cursive","Cyberlarge","Cybermedium","Cybersmall","Cygnet","DANC4","DOS Rebel","DWhistled","Dancing Font","Decimal","Def Leppard","Delta Corps Priest 1","DiamFont","Diamond","Diet Cola","Digital","Doh","Doom","Dot Matrix","Double Shorts","Double","Dr Pepper","Efti Chess","Efti Font","Efti Italic","Efti Piti","Efti Robot","Efti Wall","Efti Water","Electronic","Elite","Emboss 2","Emboss","Epic","Fender","Filter","Fire Font-k","Fire Font-s","Flipped","Flower Power","Four Tops","Fraktur","Fun Face","Fun Faces","Future","Fuzzy","Georgi16","Georgia11","Ghost","Ghoulish","Glenyn","Goofy","Gothic","Graceful","Gradient","Graffiti","Greek","Heart Left","Heart Right","Henry 3D","Hex","Hieroglyphs","Hollywood","Horizontal Left","Horizontal Right","ICL-1900","Impossible","Invita","Isometric1","Isometric2","Isometric3","Isometric4","Italic","Ivrit","JS Block Letters","JS Bracket Letters","JS Capital Curves","JS Cursive","JS Stick Letters","Jacky","Jazmine","Jerusalem","Katakana","Kban","Keyboard","Knob","Konto Slant","Konto","LCD","Larry 3D 2","Larry 3D","Lean","Letter","Letters","Lil Devil","Line Blocks","Linux","Lockergnome","Madrid","Marquee","Maxfour","Merlin1","Merlin2","Mike","Mini","Mirror","Mnemonic","Modular","Mono 12","Mono 9","Morse","Morse2","Moscow","Mshebrew210","Muzzle","NScript","NT Greek","NV Script","Nancyj-Fancy","Nancyj-Improved","Nancyj-Underlined","Nancyj","Nipples","O8","OS2","Octal","Ogre","Old Banner","Pagga","Patorjk's Cheese","Patorjk-HeX","Pawp","Peaks Slant","Peaks","Pebbles","Pepper","Poison","Puffy","Puzzle","Pyramid","Rammstein","Rebel","Rectangles","Red Phoenix","Relief","Relief2","Reverse","Roman","Rot13","Rotated","Rounded","Rowan Cap","Rozzo","RubiFont","Runic","Runyc","S Blood","SL Script","Santa Clara","Script","Serifcap","Shaded Blocky","Shadow","Shimrod","Short","Slant Relief","Slant","Slide","Small ASCII 12","Small ASCII 9","Small Block","Small Braille","Small Caps","Small Isometric1","Small Keyboard","Small Mono 12","Small Mono 9","Small Poison","Small Script","Small Shadow","Small Slant","Small Tengwar","Small","Soft","Speed","Spliff","Stacey","Stampate","Stampatello","Standard","Star Strips","Star Wars","Stellar","Stforek","Stick Letters","Stop","Straight","Stronger Than All","Sub-Zero","Swamp Land","Swan","Sweet","THIS","Tanja","Tengwar","Term","Terrace","Test1","The Edge","Thick","Thin","Thorned","Three Point","Ticks Slant","Ticks","Tiles","Tinker-Toy","Tmplr","Tombstone","Train","Trek","Tsalagi","Tubular","Twisted","Two Point","USA Flag","Univers","Upside Down Text","Varsity","Wavescape","Wavy","Weird","Wet Letter","Whimsy","WideTerm","Wow","miniwi"];function Jn(_){return/[.*+?^${}()|[\]\\]/.test(_)?"\\"+_:_}const ye=(()=>{const{FULL_WIDTH:_=0,FITTING:$,SMUSHING:e,CONTROLLED_SMUSHING:t}=zn,n={},r={font:"Standard",fontPath:"./fonts",fetchFontIfMissing:!0};function i(E,A,a){const L=Jn(E.trim().slice(-1))||"@",l=A===a-1?new RegExp(L+L+"?\\s*$"):new RegExp(L+"\\s*$");return E.replace(l,"")}function T(E=-1,A=null){let a={},L,l=[[16384,"vLayout",e],[8192,"vLayout",$],[4096,"vRule5",!0],[2048,"vRule4",!0],[1024,"vRule3",!0],[512,"vRule2",!0],[256,"vRule1",!0],[128,"hLayout",e],[64,"hLayout",$],[32,"hRule6",!0],[16,"hRule5",!0],[8,"hRule4",!0],[4,"hRule3",!0],[2,"hRule2",!0],[1,"hRule1",!0]];L=A!==null?A:E;for(const[c,h,f]of l)L>=c?(L-=c,a[h]===void 0&&(a[h]=f)):h!=="vLayout"&&h!=="hLayout"&&(a[h]=!1);return typeof a.hLayout>"u"?E===0?a.hLayout=$:E===-1?a.hLayout=_:a.hRule1||a.hRule2||a.hRule3||a.hRule4||a.hRule5||a.hRule6?a.hLayout=t:a.hLayout=e:a.hLayout===e&&(a.hRule1||a.hRule2||a.hRule3||a.hRule4||a.hRule5||a.hRule6)&&(a.hLayout=t),typeof a.vLayout>"u"?a.vRule1||a.vRule2||a.vRule3||a.vRule4||a.vRule5?a.vLayout=t:a.vLayout=_:a.vLayout===e&&(a.vRule1||a.vRule2||a.vRule3||a.vRule4||a.vRule5)&&(a.vLayout=t),a}function o(E,A,a=""){return E===A&&E!==a?E:!1}function s(E,A){let a="|/\\[]{}()<>";if(E==="_"){if(a.indexOf(A)!==-1)return A}else if(A==="_"&&a.indexOf(E)!==-1)return E;return!1}function I(E,A){let a="| /\\ [] {} () <>",L=a.indexOf(E),l=a.indexOf(A);if(L!==-1&&l!==-1&&L!==l&&Math.abs(L-l)!==1){const c=Math.max(L,l),h=c+1;return a.substring(c,h)}return!1}function R(E,A){let a="[] {} ()",L=a.indexOf(E),l=a.indexOf(A);return L!==-1&&l!==-1&&Math.abs(L-l)<=1?"|":!1}function d(E,A){return{"/\\":"|","\\/":"Y","><":"X"}[E+A]||!1}function g(E,A,a=""){return E===a&&A===a?a:!1}function C(E,A){return E===A?E:!1}function S(E,A){return s(E,A)}function u(E,A){return I(E,A)}function M(E,A){return E==="-"&&A==="_"||E==="_"&&A==="-"?"=":!1}function W(E,A){return E==="|"&&A==="|"?"|":!1}function P(E,A,a){return A===" "||A===""||A===a&&E!==" "?E:A}function U(E,A,a){if(a.fittingRules&&a.fittingRules.vLayout===_)return"invalid";let L,l=Math.min(E.length,A.length),c,h,f=!1,N;if(l===0)return"invalid";for(L=0;L<l;L++)if(c=E.substring(L,L+1),h=A.substring(L,L+1),c!==" "&&h!==" "){if(a.fittingRules&&a.fittingRules.vLayout===$)return"invalid";if(a.fittingRules&&a.fittingRules.vLayout===e)return"end";if(W(c,h)){f=f||!1;continue}if(N=!1,N=a.fittingRules&&a.fittingRules.vRule1?C(c,h):N,N=!N&&a.fittingRules&&a.fittingRules.vRule2?S(c,h):N,N=!N&&a.fittingRules&&a.fittingRules.vRule3?u(c,h):N,N=!N&&a.fittingRules&&a.fittingRules.vRule4?M(c,h):N,f=!0,!N)return"invalid"}return f?"end":"valid"}function G(E,A,a){let L=E.length,l=E.length,c,h,f,N=1,p,O,m;for(;N<=L;){for(c=E.slice(Math.max(0,l-N),l),h=A.slice(0,Math.min(L,N)),f=h.length,m="",p=0;p<f;p++)if(O=U(c[p],h[p],a),O==="end")m=O;else if(O==="invalid"){m=O;break}else m===""&&(m="valid");if(m==="invalid"){N--;break}if(m==="end")break;m==="valid"&&N++}return Math.min(L,N)}function A_(E,A,a){let L,l=Math.min(E.length,A.length),c,h,f="",N;const p=a.fittingRules||{};for(L=0;L<l;L++)c=E.substring(L,L+1),h=A.substring(L,L+1),c!==" "&&h!==" "?p.vLayout===$||p.vLayout===e?f+=P(c,h):(N=!1,N=p.vRule5?W(c,h):N,N=!N&&p.vRule1?C(c,h):N,N=!N&&p.vRule2?S(c,h):N,N=!N&&p.vRule3?u(c,h):N,N=!N&&p.vRule4?M(c,h):N,f+=N):f+=P(c,h);return f}function T$(E,A,a,L){let l=E.length,c=A.length,h=E.slice(0,Math.max(0,l-a)),f=E.slice(Math.max(0,l-a),l),N=A.slice(0,Math.min(a,c)),p,O,m,H=[],x;for(O=f.length,p=0;p<O;p++)p>=c?m=f[p]:m=A_(f[p],N[p],L),H.push(m);return x=A.slice(Math.min(a,c),c),[...h,...H,...x]}function a$(E,A){const a=" ".repeat(A);return E.map(L=>L+a)}function xe(E,A,a){let L=E[0].length,l=A[0].length,c;return L>l?A=a$(A,L-l):l>L&&(E=a$(E,l-L)),c=G(E,A,a),T$(E,A,c,a)}function We(E,A,a){const L=a.fittingRules||{};if(L.hLayout===_)return 0;let l,c=E.length,h=A.length,f=c,N=1,p=!1,O,m,H,x;if(c===0)return 0;_:for(;N<=f;){const Y=c-N;for(O=E.substring(Y,Y+N),m=A.substring(0,Math.min(N,h)),l=0;l<Math.min(N,h);l++)if(H=O.substring(l,l+1),x=m.substring(l,l+1),H!==" "&&x!==" "){if(L.hLayout===$){N=N-1;break _}else if(L.hLayout===e){(H===a.hardBlank||x===a.hardBlank)&&(N=N-1);break _}else if(p=!0,!(L.hRule1&&o(H,x,a.hardBlank)||L.hRule2&&s(H,x)||L.hRule3&&I(H,x)||L.hRule4&&R(H,x)||L.hRule5&&d(H,x)||L.hRule6&&g(H,x,a.hardBlank))){N=N-1;break _}}if(p)break;N++}return Math.min(f,N)}function De(E,A,a,L){let l,c,h=[],f,N,p,O,m,H,x,Y;const F=L.fittingRules||{};if(typeof L.height!="number")throw new Error("height is not defined.");for(l=0;l<L.height;l++){x=E[l],Y=A[l],m=x.length,H=Y.length,f=m-a,N=x.slice(0,Math.max(0,f)),p="";const G_=Math.max(0,m-a);let j=x.substring(G_,G_+a),I_=Y.substring(0,Math.min(a,H));for(c=0;c<a;c++){let k=c<m?j.substring(c,c+1):" ",B=c<H?I_.substring(c,c+1):" ";if(k!==" "&&B!==" ")if(F.hLayout===$||F.hLayout===e)p+=P(k,B,L.hardBlank);else{const Ca=F.hRule1&&o(k,B,L.hardBlank)||F.hRule2&&s(k,B)||F.hRule3&&I(k,B)||F.hRule4&&R(k,B)||F.hRule5&&d(k,B)||F.hRule6&&g(k,B,L.hardBlank)||P(k,B,L.hardBlank);p+=Ca}else p+=P(k,B,L.hardBlank)}a>=H?O="":O=Y.substring(a,a+Math.max(0,H-a)),h[l]=N+p+O}return h}function p_(E){return new Array(E).fill("")}const b_=function(E){return Math.max(...E.map(A=>A.length))};function g_(E,A,a){return E.reduce(function(L,l){return De(L,l.fig,l.overlap||0,a)},p_(A))}function da(E,A,a){for(let L=E.length-1;L>0;L--){const l=g_(E.slice(0,L),A,a);if(b_(l)<=a.width)return{outputFigText:l,chars:E.slice(L)}}return{outputFigText:p_(A),chars:E}}function ha(E,A,a){let L,l,c=0,h,f,N,p=a.height,O=[],m,H={chars:[],overlap:c},x=[],Y,F,G_,j,I_;if(typeof p!="number")throw new Error("height is not defined.");f=p_(p);const k=a.fittingRules||{};for(a.printDirection===1&&(E=E.split("").reverse().join("")),N=E.length,L=0;L<N;L++)if(Y=E.substring(L,L+1),F=Y.match(/\s/),l=A[Y.charCodeAt(0)],j=null,l){if(k.hLayout!==_){for(c=1e4,h=0;h<p;h++)c=Math.min(c,We(f[h],l[h],a));c=c===1e4?0:c}if(a.width>0&&(a.whitespaceBreak?(G_=g_(H.chars.concat([{fig:l,overlap:c}]),p,a),j=g_(x.concat([{fig:G_,overlap:H.overlap}]),p,a),m=b_(j)):(j=De(f,l,c,a),m=b_(j)),m>=a.width&&L>0&&(a.whitespaceBreak?(f=g_(x.slice(0,-1),p,a),x.length>1&&(O.push(f),f=p_(p)),x=[]):(O.push(f),f=p_(p)))),a.width>0&&a.whitespaceBreak&&((!F||L===N-1)&&H.chars.push({fig:l,overlap:c}),F||L===N-1)){for(I_=null;j=g_(H.chars,p,a),m=b_(j),m>=a.width;)I_=da(H.chars,p,a),H={chars:I_.chars},O.push(I_.outputFigText);m>0&&(I_?x.push({fig:j,overlap:1}):x.push({fig:j,overlap:H.overlap})),F&&(x.push({fig:l,overlap:c}),f=p_(p)),L===N-1&&(f=g_(x,p,a)),H={chars:[],overlap:c};continue}f=De(f,l,c,a)}return b_(f)>0&&O.push(f),a.showHardBlanks||O.forEach(function(B){for(N=B.length,h=0;h<N;h++)B[h]=B[h].replace(new RegExp("\\"+a.hardBlank,"g")," ")}),E===""&&O.length===0&&O.push(new Array(p).fill("")),O}const Na=function(E,A){let a;const L=A.fittingRules||{};if(E==="default")a={hLayout:L.hLayout,hRule1:L.hRule1,hRule2:L.hRule2,hRule3:L.hRule3,hRule4:L.hRule4,hRule5:L.hRule5,hRule6:L.hRule6};else if(E==="full")a={hLayout:_,hRule1:!1,hRule2:!1,hRule3:!1,hRule4:!1,hRule5:!1,hRule6:!1};else if(E==="fitted")a={hLayout:$,hRule1:!1,hRule2:!1,hRule3:!1,hRule4:!1,hRule5:!1,hRule6:!1};else if(E==="controlled smushing")a={hLayout:t,hRule1:!0,hRule2:!0,hRule3:!0,hRule4:!0,hRule5:!0,hRule6:!0};else if(E==="universal smushing")a={hLayout:e,hRule1:!1,hRule2:!1,hRule3:!1,hRule4:!1,hRule5:!1,hRule6:!1};else return;return a},Sa=function(E,A){let a={};const L=A.fittingRules||{};if(E==="default")a={vLayout:L.vLayout,vRule1:L.vRule1,vRule2:L.vRule2,vRule3:L.vRule3,vRule4:L.vRule4,vRule5:L.vRule5};else if(E==="full")a={vLayout:_,vRule1:!1,vRule2:!1,vRule3:!1,vRule4:!1,vRule5:!1};else if(E==="fitted")a={vLayout:$,vRule1:!1,vRule2:!1,vRule3:!1,vRule4:!1,vRule5:!1};else if(E==="controlled smushing")a={vLayout:t,vRule1:!0,vRule2:!0,vRule3:!0,vRule4:!0,vRule5:!0};else if(E==="universal smushing")a={vLayout:e,vRule1:!1,vRule2:!1,vRule3:!1,vRule4:!1,vRule5:!1};else return;return a},jn=function(E,A,a){a=a.replace(/\r\n/g,`
`).replace(/\r/g,`
`);let L=a.split(`
`),l=[],c,h,f;for(h=L.length,c=0;c<h;c++)l=l.concat(ha(L[c],n[E],A));for(h=l.length,f=l[0],c=1;c<h;c++)f=xe(f,l[c],A);return f?f.join(`
`):""};function qn(E,A){let a;if(typeof structuredClone<"u"?a=structuredClone(E):a=JSON.parse(JSON.stringify(E)),a.showHardBlanks=A.showHardBlanks||!1,a.width=A.width||-1,a.whitespaceBreak=A.whitespaceBreak||!1,A.horizontalLayout){const L=Na(A.horizontalLayout,E);L&&Object.assign(a.fittingRules,L)}if(A.verticalLayout){const L=Sa(A.verticalLayout,E);L&&Object.assign(a.fittingRules,L)}return a.printDirection=A.printDirection!==null&&A.printDirection!==void 0?A.printDirection:E.printDirection,a}const w=async function(E,A,a){return w.text(E,A,a)};return w.text=async function(E,A,a){E=E+"";let L,l;typeof A=="function"?(l=A,L={font:r.font}):typeof A=="string"?(L={font:A},l=a):A?(L=A,l=a):(L={font:r.font},l=a);const c=L.font||r.font;try{const h=await w.loadFont(c),f=h?jn(c,qn(h,L),E):"";return l&&l(null,f),f}catch(h){const f=h instanceof Error?h:new Error(String(h));if(l)return l(f),"";throw f}},w.textSync=function(E,A){E=E+"",typeof A=="string"?A={font:A}:A=A||{};const a=A.font||r.font;let L=qn(w.loadFontSync(a),A);return jn(a,L,E)},w.metadata=async function(E,A){E=E+"";try{const a=await w.loadFont(E);if(!a)throw new Error("Error loading font.");const L=n[E]||{},l=[a,L.comment||""];return A&&A(null,a,L.comment),l}catch(a){const L=a instanceof Error?a:new Error(String(a));if(A)return A(L),null;throw L}},w.defaults=function(E){return E&&typeof E=="object"&&Object.assign(r,E),typeof structuredClone<"u"?structuredClone(r):JSON.parse(JSON.stringify(r))},w.parseFont=function(E,A,a=!0){if(n[E]&&!a)return n[E].options;A=A.replace(/\r\n/g,`
`).replace(/\r/g,`
`);const L=new Qn,l=A.split(`
`),c=l.shift();if(!c)throw new Error("Invalid font file: missing header");const h=c.split(" "),f={hardBlank:h[0].substring(5,6),height:parseInt(h[1],10),baseline:parseInt(h[2],10),maxLength:parseInt(h[3],10),oldLayout:parseInt(h[4],10),numCommentLines:parseInt(h[5],10),printDirection:h[6]?parseInt(h[6],10):0,fullLayout:h[7]?parseInt(h[7],10):null,codeTagCount:h[8]?parseInt(h[8],10):null};if((f.hardBlank||"").length!==1||[f.height,f.baseline,f.maxLength,f.oldLayout,f.numCommentLines].some(O=>O==null||isNaN(O)))throw new Error("FIGlet header contains invalid values.");if(f.height==null||f.numCommentLines==null)throw new Error("FIGlet header contains invalid values.");f.fittingRules=T(f.oldLayout,f.fullLayout),L.options=f;const p=[];for(let O=32;O<=126;O++)p.push(O);if(p.push(196,214,220,228,246,252,223),l.length<f.numCommentLines+f.height*p.length)throw new Error(`FIGlet file is missing data. Line length: ${l.length}. Comment lines: ${f.numCommentLines}. Height: ${f.height}. Num chars: ${p.length}.`);for(L.comment=l.splice(0,f.numCommentLines).join(`
`),L.numChars=0;l.length>0&&L.numChars<p.length;){const O=p[L.numChars];L[O]=l.splice(0,f.height);for(let m=0;m<f.height;m++)typeof L[O][m]>"u"?L[O][m]="":L[O][m]=i(L[O][m],m,f.height);L.numChars++}for(;l.length>0;){const O=l.shift();if(!O||O.trim()==="")break;let m=O.split(" ")[0],H;if(/^-?0[xX][0-9a-fA-F]+$/.test(m))H=parseInt(m,16);else if(/^-?0[0-7]+$/.test(m))H=parseInt(m,8);else if(/^-?[0-9]+$/.test(m))H=parseInt(m,10);else throw new Error(`Error parsing data. Invalid data: ${m}`);if(H===-1||H<-2147483648||H>2147483647){const x=H===-1?"The char code -1 is not permitted.":`The char code cannot be ${H<-2147483648?"less than -2147483648":"greater than 2147483647"}.`;throw new Error(`Error parsing data. ${x}`)}L[H]=l.splice(0,f.height);for(let x=0;x<f.height;x++)typeof L[H][x]>"u"?L[H][x]="":L[H][x]=i(L[H][x],x,f.height);L.numChars++}return n[E]=L,f},w.loadedFonts=()=>Object.keys(n),w.clearLoadedFonts=()=>{Object.keys(n).forEach(E=>{delete n[E]})},w.loadFont=async function(E,A){if(n[E]){const a=n[E].options;return A&&A(null,a),Promise.resolve(a)}try{if(!r.fetchFontIfMissing)throw new Error(`Font is not loaded: ${E}`);const a=await fetch(`${r.fontPath}/${E}.flf`);if(!a.ok)throw new Error(`Network response was not ok: ${a.status}`);const L=await a.text(),l=w.parseFont(E,L);return A&&A(null,l),l}catch(a){const L=a instanceof Error?a:new Error(String(a));if(A)return A(L),null;throw L}},w.loadFontSync=function(E){if(n[E])return n[E].options;throw new Error("Synchronous font loading is not implemented for the browser, it will only work for fonts already loaded.")},w.preloadFonts=async function(E,A){try{for(const a of E){const L=await fetch(`${r.fontPath}/${a}.flf`);if(!L.ok)throw new Error(`Failed to preload fonts. Error fetching font: ${a}, status code: ${L.statusText}`);const l=await L.text();w.parseFont(a,l)}A&&A()}catch(a){const L=a instanceof Error?a:new Error(String(a));if(A){A(L);return}throw a}},w.fonts=function(E){return new Promise(function(A,a){A(o$),E&&E(null,o$)})},w.fontsSync=function(){return o$},w.figFonts=n,w})(),Zn=`flf2a$ 8 7 54 0 12 0 64 185
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
`,_r=`flf2a$ 8 6 59 15 10 0 24463
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
`,$r=`flf2a$ 8 6 27 0 10 0 576
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
`,er=`flf2a$ 8 6 14 15 16
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
`,tr=`flf2a$ 8 6 27 0 10 0 576
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
`,nr=`flf2a$ 4 3 10 0 10 0 1920
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
`,rr=`flf2a$ 7 5 16 0 10 0 3904 96
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
`,ir=`flf2a$ 5 4 16 0 14 0 4992
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
`,Tr=`flf2a$ 6 5 16 15 10 0 18319
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
`,ar=`flf2a$ 5 4 13 15 10 0 22415
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
`,or=`flf2a$ 6 5 16 15 16
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
`,Lr=`flf2a$ 6 5 16 15 13 0 24463 229
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
         `;let Ue=!1;function sr(){if(Ue)return;[["Standard",Lr],["Banner",Zn],["Big",_r],["Block",$r],["Doom",er],["Lean",tr],["Mini",nr],["Script",rr],["Shadow",ir],["Slant",Tr],["Small",ar],["Speed",or]].forEach(([$,e])=>{ye.parseFont($,e)}),Ue=!0}var L$=!1,s$=!1,e_=[],E$=-1;function Er(_){Ar(_)}function Ar(_){e_.includes(_)||e_.push(_),lr()}function Ir(_){let $=e_.indexOf(_);$!==-1&&$>E$&&e_.splice($,1)}function lr(){!s$&&!L$&&(L$=!0,queueMicrotask(ur))}function ur(){L$=!1,s$=!0;for(let _=0;_<e_.length;_++)e_[_](),E$=_;e_.length=0,E$=-1,s$=!1}var l_,t_,u_,ve,A$=!0;function cr(_){A$=!1,_(),A$=!0}function fr(_){l_=_.reactive,u_=_.release,t_=$=>_.effect($,{scheduler:e=>{A$?Er(e):e()}}),ve=_.raw}function we(_){t_=_}function Rr(_){let $=()=>{};return[t=>{let n=t_(t);return _._x_effects||(_._x_effects=new Set,_._x_runEffects=()=>{_._x_effects.forEach(r=>r())}),_._x_effects.add(n),$=()=>{n!==void 0&&(_._x_effects.delete(n),u_(n))},n},()=>{$()}]}function be(_,$){let e=!0,t,n=t_(()=>{let r=_();JSON.stringify(r),e?t=r:queueMicrotask(()=>{$(r,t),t=r}),e=!1});return()=>u_(n)}var Ge=[],Fe=[],Be=[];function dr(_){Be.push(_)}function I$(_,$){typeof $=="function"?(_._x_cleanups||(_._x_cleanups=[]),_._x_cleanups.push($)):($=_,Fe.push($))}function Ve(_){Ge.push(_)}function ke(_,$,e){_._x_attributeCleanups||(_._x_attributeCleanups={}),_._x_attributeCleanups[$]||(_._x_attributeCleanups[$]=[]),_._x_attributeCleanups[$].push(e)}function Ke(_,$){_._x_attributeCleanups&&Object.entries(_._x_attributeCleanups).forEach(([e,t])=>{($===void 0||$.includes(e))&&(t.forEach(n=>n()),delete _._x_attributeCleanups[e])})}function hr(_){for(_._x_effects?.forEach(Ir);_._x_cleanups?.length;)_._x_cleanups.pop()()}var l$=new MutationObserver(R$),u$=!1;function c$(){l$.observe(document,{subtree:!0,childList:!0,attributes:!0,attributeOldValue:!0}),u$=!0}function Xe(){Nr(),l$.disconnect(),u$=!1}var m_=[];function Nr(){let _=l$.takeRecords();m_.push(()=>_.length>0&&R$(_));let $=m_.length;queueMicrotask(()=>{if(m_.length===$)for(;m_.length>0;)m_.shift()()})}function y(_){if(!u$)return _();Xe();let $=_();return c$(),$}var f$=!1,F_=[];function Sr(){f$=!0}function Cr(){f$=!1,R$(F_),F_=[]}function R$(_){if(f$){F_=F_.concat(_);return}let $=[],e=new Set,t=new Map,n=new Map;for(let r=0;r<_.length;r++)if(!_[r].target._x_ignoreMutationObserver&&(_[r].type==="childList"&&(_[r].removedNodes.forEach(i=>{i.nodeType===1&&i._x_marker&&e.add(i)}),_[r].addedNodes.forEach(i=>{if(i.nodeType===1){if(e.has(i)){e.delete(i);return}i._x_marker||$.push(i)}})),_[r].type==="attributes")){let i=_[r].target,T=_[r].attributeName,o=_[r].oldValue,s=()=>{t.has(i)||t.set(i,[]),t.get(i).push({name:T,value:i.getAttribute(T)})},I=()=>{n.has(i)||n.set(i,[]),n.get(i).push(T)};i.hasAttribute(T)&&o===null?s():i.hasAttribute(T)?(I(),s()):I()}n.forEach((r,i)=>{Ke(i,r)}),t.forEach((r,i)=>{Ge.forEach(T=>T(i,r))});for(let r of e)$.some(i=>i.contains(r))||Fe.forEach(i=>i(r));for(let r of $)r.isConnected&&Be.forEach(i=>i(r));$=null,e=null,t=null,n=null}function Ye(_){return r_(n_(_))}function O_(_,$,e){return _._x_dataStack=[$,...n_(e||_)],()=>{_._x_dataStack=_._x_dataStack.filter(t=>t!==$)}}function n_(_){return _._x_dataStack?_._x_dataStack:typeof ShadowRoot=="function"&&_ instanceof ShadowRoot?n_(_.host):_.parentNode?n_(_.parentNode):[]}function r_(_){return new Proxy({objects:_},pr)}var pr={ownKeys({objects:_}){return Array.from(new Set(_.flatMap($=>Object.keys($))))},has({objects:_},$){return $==Symbol.unscopables?!1:_.some(e=>Object.prototype.hasOwnProperty.call(e,$)||Reflect.has(e,$))},get({objects:_},$,e){return $=="toJSON"?gr:Reflect.get(_.find(t=>Reflect.has(t,$))||{},$,e)},set({objects:_},$,e,t){const n=_.find(i=>Object.prototype.hasOwnProperty.call(i,$))||_[_.length-1],r=Object.getOwnPropertyDescriptor(n,$);return r?.set&&r?.get?r.set.call(t,e)||!0:Reflect.set(n,$,e)}};function gr(){return Reflect.ownKeys(this).reduce(($,e)=>($[e]=Reflect.get(this,e),$),{})}function d$(_){let $=t=>typeof t=="object"&&!Array.isArray(t)&&t!==null,e=(t,n="")=>{Object.entries(Object.getOwnPropertyDescriptors(t)).forEach(([r,{value:i,enumerable:T}])=>{if(T===!1||i===void 0||typeof i=="object"&&i!==null&&i.__v_skip)return;let o=n===""?r:`${n}.${r}`;typeof i=="object"&&i!==null&&i._x_interceptor?t[r]=i.initialize(_,o,r):$(i)&&i!==t&&!(i instanceof Element)&&e(i,o)})};return e(_)}function je(_,$=()=>{}){let e={initialValue:void 0,_x_interceptor:!0,initialize(t,n,r){return _(this.initialValue,()=>mr(t,n),i=>h$(t,n,i),n,r)}};return $(e),t=>{if(typeof t=="object"&&t!==null&&t._x_interceptor){let n=e.initialize.bind(e);e.initialize=(r,i,T)=>{let o=t.initialize(r,i,T);return e.initialValue=o,n(r,i,T)}}else e.initialValue=t;return e}}function mr(_,$){return $.split(".").reduce((e,t)=>e[t],_)}function h$(_,$,e){if(typeof $=="string"&&($=$.split(".")),$.length===1)_[$[0]]=e;else{if($.length===0)throw error;return _[$[0]]||(_[$[0]]={}),h$(_[$[0]],$.slice(1),e)}}var qe={};function K(_,$){qe[_]=$}function H_(_,$){let e=Or($);return Object.entries(qe).forEach(([t,n])=>{Object.defineProperty(_,`$${t}`,{get(){return n($,e)},enumerable:!1})}),_}function Or(_){let[$,e]=tt(_),t={interceptor:je,...$};return I$(_,e),t}function Hr(_,$,e,...t){try{return e(...t)}catch(n){M_(n,_,$)}}function M_(..._){return ze(..._)}var ze=Pr;function Mr(_){ze=_}function Pr(_,$,e=void 0){_=Object.assign(_??{message:"No error message given."},{el:$,expression:e}),console.warn(`Alpine Expression Error: ${_.message}

${e?'Expression: "'+e+`"

`:""}`,$),setTimeout(()=>{throw _},0)}var c_=!0;function Qe(_){let $=c_;c_=!1;let e=_();return c_=$,e}function i_(_,$,e={}){let t;return b(_,$)(n=>t=n,e),t}function b(..._){return Je(..._)}var Je=_t;function xr(_){Je=_}var Ze;function Wr(_){Ze=_}function _t(_,$){let e={};H_(e,_);let t=[e,...n_(_)],n=typeof $=="function"?Dr(t,$):Ur(t,$,_);return Hr.bind(null,_,$,n)}function Dr(_,$){return(e=()=>{},{scope:t={},params:n=[],context:r}={})=>{if(!c_){P_(e,$,r_([t,..._]),n);return}let i=$.apply(r_([t,..._]),n);P_(e,i)}}var N$={};function yr(_,$){if(N$[_])return N$[_];let e=Object.getPrototypeOf(async function(){}).constructor,t=/^[\n\s]*if.*\(.*\)/.test(_.trim())||/^(let|const)\s/.test(_.trim())?`(async()=>{ ${_} })()`:_,r=(()=>{try{let i=new e(["__self","scope"],`with (scope) { __self.result = ${t} }; __self.finished = true; return __self.result;`);return Object.defineProperty(i,"name",{value:`[Alpine] ${_}`}),i}catch(i){return M_(i,$,_),Promise.resolve()}})();return N$[_]=r,r}function Ur(_,$,e){let t=yr($,e);return(n=()=>{},{scope:r={},params:i=[],context:T}={})=>{t.result=void 0,t.finished=!1;let o=r_([r,..._]);if(typeof t=="function"){let s=t.call(T,t,o).catch(I=>M_(I,e,$));t.finished?(P_(n,t.result,o,i,e),t.result=void 0):s.then(I=>{P_(n,I,o,i,e)}).catch(I=>M_(I,e,$)).finally(()=>t.result=void 0)}}}function P_(_,$,e,t,n){if(c_&&typeof $=="function"){let r=$.apply(e,t);r instanceof Promise?r.then(i=>P_(_,i,e,t)).catch(i=>M_(i,n,$)):_(r)}else typeof $=="object"&&$ instanceof Promise?$.then(r=>_(r)):_($)}function vr(..._){return Ze(..._)}function wr(_,$,e={}){let t={};H_(t,_);let n=[t,...n_(_)],r=r_([e.scope??{},...n]),i=e.params??[];if($.includes("await")){let T=Object.getPrototypeOf(async function(){}).constructor,o=/^[\n\s]*if.*\(.*\)/.test($.trim())||/^(let|const)\s/.test($.trim())?`(async()=>{ ${$} })()`:$;return new T(["scope"],`with (scope) { let __result = ${o}; return __result }`).call(e.context,r)}else{let T=/^[\n\s]*if.*\(.*\)/.test($.trim())||/^(let|const)\s/.test($.trim())?`(()=>{ ${$} })()`:$,s=new Function(["scope"],`with (scope) { let __result = ${T}; return __result }`).call(e.context,r);return typeof s=="function"&&c_?s.apply(r,i):s}}var S$="x-";function f_(_=""){return S$+_}function br(_){S$=_}var B_={};function v(_,$){return B_[_]=$,{before(e){if(!B_[e]){console.warn(String.raw`Cannot find directive \`${e}\`. \`${_}\` will use the default order of execution`);return}const t=T_.indexOf(e);T_.splice(t>=0?t:T_.indexOf("DEFAULT"),0,_)}}}function Gr(_){return Object.keys(B_).includes(_)}function C$(_,$,e){if($=Array.from($),_._x_virtualDirectives){let r=Object.entries(_._x_virtualDirectives).map(([T,o])=>({name:T,value:o})),i=$t(r);r=r.map(T=>i.find(o=>o.name===T.name)?{name:`x-bind:${T.name}`,value:`"${T.value}"`}:T),$=$.concat(r)}let t={};return $.map(it((r,i)=>t[r]=i)).filter(at).map(Vr(t,e)).sort(kr).map(r=>Br(_,r))}function $t(_){return Array.from(_).map(it()).filter($=>!at($))}var p$=!1,x_=new Map,et=Symbol();function Fr(_){p$=!0;let $=Symbol();et=$,x_.set($,[]);let e=()=>{for(;x_.get($).length;)x_.get($).shift()();x_.delete($)},t=()=>{p$=!1,e()};_(e),t()}function tt(_){let $=[],e=T=>$.push(T),[t,n]=Rr(_);return $.push(n),[{Alpine:d_,effect:t,cleanup:e,evaluateLater:b.bind(b,_),evaluate:i_.bind(i_,_)},()=>$.forEach(T=>T())]}function Br(_,$){let e=()=>{},t=B_[$.type]||e,[n,r]=tt(_);ke(_,$.original,r);let i=()=>{_._x_ignore||_._x_ignoreSelf||(t.inline&&t.inline(_,$,n),t=t.bind(t,_,$,n),p$?x_.get(et).push(t):t())};return i.runCleanups=r,i}var nt=(_,$)=>({name:e,value:t})=>(e.startsWith(_)&&(e=e.replace(_,$)),{name:e,value:t}),rt=_=>_;function it(_=()=>{}){return({name:$,value:e})=>{let{name:t,value:n}=Tt.reduce((r,i)=>i(r),{name:$,value:e});return t!==$&&_(t,$),{name:t,value:n}}}var Tt=[];function g$(_){Tt.push(_)}function at({name:_}){return ot().test(_)}var ot=()=>new RegExp(`^${S$}([^:^.]+)\\b`);function Vr(_,$){return({name:e,value:t})=>{e===t&&(t="");let n=e.match(ot()),r=e.match(/:([a-zA-Z0-9\-_:]+)/),i=e.match(/\.[^.\]]+(?=[^\]]*$)/g)||[],T=$||_[e]||e;return{type:n?n[1]:null,value:r?r[1]:null,modifiers:i.map(o=>o.replace(".","")),expression:t,original:T}}}var m$="DEFAULT",T_=["ignore","ref","data","id","anchor","bind","init","for","model","modelable","transition","show","if",m$,"teleport"];function kr(_,$){let e=T_.indexOf(_.type)===-1?m$:_.type,t=T_.indexOf($.type)===-1?m$:$.type;return T_.indexOf(e)-T_.indexOf(t)}function W_(_,$,e={}){_.dispatchEvent(new CustomEvent($,{detail:e,bubbles:!0,composed:!0,cancelable:!0}))}function a_(_,$){if(typeof ShadowRoot=="function"&&_ instanceof ShadowRoot){Array.from(_.children).forEach(n=>a_(n,$));return}let e=!1;if($(_,()=>e=!0),e)return;let t=_.firstElementChild;for(;t;)a_(t,$),t=t.nextElementSibling}function V(_,...$){console.warn(`Alpine Warning: ${_}`,...$)}var Lt=!1;function Kr(){Lt&&V("Alpine has already been initialized on this page. Calling Alpine.start() more than once can cause problems."),Lt=!0,document.body||V("Unable to initialize. Trying to load Alpine before `<body>` is available. Did you forget to add `defer` in Alpine's `<script>` tag?"),W_(document,"alpine:init"),W_(document,"alpine:initializing"),c$(),dr($=>z($,a_)),I$($=>R_($)),Ve(($,e)=>{C$($,e).forEach(t=>t())});let _=$=>!V_($.parentElement,!0);Array.from(document.querySelectorAll(At().join(","))).filter(_).forEach($=>{z($)}),W_(document,"alpine:initialized"),setTimeout(()=>{qr()})}var O$=[],st=[];function Et(){return O$.map(_=>_())}function At(){return O$.concat(st).map(_=>_())}function It(_){O$.push(_)}function lt(_){st.push(_)}function V_(_,$=!1){return o_(_,e=>{if(($?At():Et()).some(n=>e.matches(n)))return!0})}function o_(_,$){if(_){if($(_))return _;if(_._x_teleportBack&&(_=_._x_teleportBack),_.parentNode instanceof ShadowRoot)return o_(_.parentNode.host,$);if(_.parentElement)return o_(_.parentElement,$)}}function Xr(_){return Et().some($=>_.matches($))}var ut=[];function Yr(_){ut.push(_)}var jr=1;function z(_,$=a_,e=()=>{}){o_(_,t=>t._x_ignore)||Fr(()=>{$(_,(t,n)=>{t._x_marker||(e(t,n),ut.forEach(r=>r(t,n)),C$(t,t.attributes).forEach(r=>r()),t._x_ignore||(t._x_marker=jr++),t._x_ignore&&n())})})}function R_(_,$=a_){$(_,e=>{hr(e),Ke(e),delete e._x_marker})}function qr(){[["ui","dialog",["[x-dialog], [x-popover]"]],["anchor","anchor",["[x-anchor]"]],["sort","sort",["[x-sort]"]]].forEach(([$,e,t])=>{Gr(e)||t.some(n=>{if(document.querySelector(n))return V(`found "${n}", but missing ${$} plugin`),!0})})}var H$=[],M$=!1;function P$(_=()=>{}){return queueMicrotask(()=>{M$||setTimeout(()=>{x$()})}),new Promise($=>{H$.push(()=>{_(),$()})})}function x$(){for(M$=!1;H$.length;)H$.shift()()}function zr(){M$=!0}function W$(_,$){return Array.isArray($)?ct(_,$.join(" ")):typeof $=="object"&&$!==null?Qr(_,$):typeof $=="function"?W$(_,$()):ct(_,$)}function ct(_,$){let e=n=>n.split(" ").filter(r=>!_.classList.contains(r)).filter(Boolean),t=n=>(_.classList.add(...n),()=>{_.classList.remove(...n)});return $=$===!0?$="":$||"",t(e($))}function Qr(_,$){let e=T=>T.split(" ").filter(Boolean),t=Object.entries($).flatMap(([T,o])=>o?e(T):!1).filter(Boolean),n=Object.entries($).flatMap(([T,o])=>o?!1:e(T)).filter(Boolean),r=[],i=[];return n.forEach(T=>{_.classList.contains(T)&&(_.classList.remove(T),i.push(T))}),t.forEach(T=>{_.classList.contains(T)||(_.classList.add(T),r.push(T))}),()=>{i.forEach(T=>_.classList.add(T)),r.forEach(T=>_.classList.remove(T))}}function k_(_,$){return typeof $=="object"&&$!==null?Jr(_,$):Zr(_,$)}function Jr(_,$){let e={};return Object.entries($).forEach(([t,n])=>{e[t]=_.style[t],t.startsWith("--")||(t=_i(t)),_.style.setProperty(t,n)}),setTimeout(()=>{_.style.length===0&&_.removeAttribute("style")}),()=>{k_(_,e)}}function Zr(_,$){let e=_.getAttribute("style",$);return _.setAttribute("style",$),()=>{_.setAttribute("style",e||"")}}function _i(_){return _.replace(/([a-z])([A-Z])/g,"$1-$2").toLowerCase()}function D$(_,$=()=>{}){let e=!1;return function(){e?$.apply(this,arguments):(e=!0,_.apply(this,arguments))}}v("transition",(_,{value:$,modifiers:e,expression:t},{evaluate:n})=>{typeof t=="function"&&(t=n(t)),t!==!1&&(!t||typeof t=="boolean"?ei(_,e,$):$i(_,t,$))});function $i(_,$,e){ft(_,W$,""),{enter:n=>{_._x_transition.enter.during=n},"enter-start":n=>{_._x_transition.enter.start=n},"enter-end":n=>{_._x_transition.enter.end=n},leave:n=>{_._x_transition.leave.during=n},"leave-start":n=>{_._x_transition.leave.start=n},"leave-end":n=>{_._x_transition.leave.end=n}}[e]($)}function ei(_,$,e){ft(_,k_);let t=!$.includes("in")&&!$.includes("out")&&!e,n=t||$.includes("in")||["enter"].includes(e),r=t||$.includes("out")||["leave"].includes(e);$.includes("in")&&!t&&($=$.filter((M,W)=>W<$.indexOf("out"))),$.includes("out")&&!t&&($=$.filter((M,W)=>W>$.indexOf("out")));let i=!$.includes("opacity")&&!$.includes("scale"),T=i||$.includes("opacity"),o=i||$.includes("scale"),s=T?0:1,I=o?D_($,"scale",95)/100:1,R=D_($,"delay",0)/1e3,d=D_($,"origin","center"),g="opacity, transform",C=D_($,"duration",150)/1e3,S=D_($,"duration",75)/1e3,u="cubic-bezier(0.4, 0.0, 0.2, 1)";n&&(_._x_transition.enter.during={transformOrigin:d,transitionDelay:`${R}s`,transitionProperty:g,transitionDuration:`${C}s`,transitionTimingFunction:u},_._x_transition.enter.start={opacity:s,transform:`scale(${I})`},_._x_transition.enter.end={opacity:1,transform:"scale(1)"}),r&&(_._x_transition.leave.during={transformOrigin:d,transitionDelay:`${R}s`,transitionProperty:g,transitionDuration:`${S}s`,transitionTimingFunction:u},_._x_transition.leave.start={opacity:1,transform:"scale(1)"},_._x_transition.leave.end={opacity:s,transform:`scale(${I})`})}function ft(_,$,e={}){_._x_transition||(_._x_transition={enter:{during:e,start:e,end:e},leave:{during:e,start:e,end:e},in(t=()=>{},n=()=>{}){y$(_,$,{during:this.enter.during,start:this.enter.start,end:this.enter.end},t,n)},out(t=()=>{},n=()=>{}){y$(_,$,{during:this.leave.during,start:this.leave.start,end:this.leave.end},t,n)}})}window.Element.prototype._x_toggleAndCascadeWithTransitions=function(_,$,e,t){const n=document.visibilityState==="visible"?requestAnimationFrame:setTimeout;let r=()=>n(e);if($){_._x_transition&&(_._x_transition.enter||_._x_transition.leave)?_._x_transition.enter&&(Object.entries(_._x_transition.enter.during).length||Object.entries(_._x_transition.enter.start).length||Object.entries(_._x_transition.enter.end).length)?_._x_transition.in(e):r():_._x_transition?_._x_transition.in(e):r();return}_._x_hidePromise=_._x_transition?new Promise((i,T)=>{_._x_transition.out(()=>{},()=>i(t)),_._x_transitioning&&_._x_transitioning.beforeCancel(()=>T({isFromCancelledTransition:!0}))}):Promise.resolve(t),queueMicrotask(()=>{let i=Rt(_);i?(i._x_hideChildren||(i._x_hideChildren=[]),i._x_hideChildren.push(_)):n(()=>{let T=o=>{let s=Promise.all([o._x_hidePromise,...(o._x_hideChildren||[]).map(T)]).then(([I])=>I?.());return delete o._x_hidePromise,delete o._x_hideChildren,s};T(_).catch(o=>{if(!o.isFromCancelledTransition)throw o})})})};function Rt(_){let $=_.parentNode;if($)return $._x_hidePromise?$:Rt($)}function y$(_,$,{during:e,start:t,end:n}={},r=()=>{},i=()=>{}){if(_._x_transitioning&&_._x_transitioning.cancel(),Object.keys(e).length===0&&Object.keys(t).length===0&&Object.keys(n).length===0){r(),i();return}let T,o,s;ti(_,{start(){T=$(_,t)},during(){o=$(_,e)},before:r,end(){T(),s=$(_,n)},after:i,cleanup(){o(),s()}})}function ti(_,$){let e,t,n,r=D$(()=>{y(()=>{e=!0,t||$.before(),n||($.end(),x$()),$.after(),_.isConnected&&$.cleanup(),delete _._x_transitioning})});_._x_transitioning={beforeCancels:[],beforeCancel(i){this.beforeCancels.push(i)},cancel:D$(function(){for(;this.beforeCancels.length;)this.beforeCancels.shift()();r()}),finish:r},y(()=>{$.start(),$.during()}),zr(),requestAnimationFrame(()=>{if(e)return;let i=Number(getComputedStyle(_).transitionDuration.replace(/,.*/,"").replace("s",""))*1e3,T=Number(getComputedStyle(_).transitionDelay.replace(/,.*/,"").replace("s",""))*1e3;i===0&&(i=Number(getComputedStyle(_).animationDuration.replace("s",""))*1e3),y(()=>{$.before()}),t=!0,requestAnimationFrame(()=>{e||(y(()=>{$.end()}),x$(),setTimeout(_._x_transitioning.finish,i+T),n=!0)})})}function D_(_,$,e){if(_.indexOf($)===-1)return e;const t=_[_.indexOf($)+1];if(!t||$==="scale"&&isNaN(t))return e;if($==="duration"||$==="delay"){let n=t.match(/([0-9]+)ms/);if(n)return n[1]}return $==="origin"&&["top","right","left","center","bottom"].includes(_[_.indexOf($)+2])?[t,_[_.indexOf($)+2]].join(" "):t}var Q=!1;function J(_,$=()=>{}){return(...e)=>Q?$(...e):_(...e)}function ni(_){return(...$)=>Q&&_(...$)}var dt=[];function K_(_){dt.push(_)}function ri(_,$){dt.forEach(e=>e(_,$)),Q=!0,ht(()=>{z($,(e,t)=>{t(e,()=>{})})}),Q=!1}var U$=!1;function ii(_,$){$._x_dataStack||($._x_dataStack=_._x_dataStack),Q=!0,U$=!0,ht(()=>{Ti($)}),Q=!1,U$=!1}function Ti(_){let $=!1;z(_,(t,n)=>{a_(t,(r,i)=>{if($&&Xr(r))return i();$=!0,n(r,i)})})}function ht(_){let $=t_;we((e,t)=>{let n=$(e);return u_(n),()=>{}}),_(),we($)}function Nt(_,$,e,t=[]){switch(_._x_bindings||(_._x_bindings=l_({})),_._x_bindings[$]=e,$=t.includes("camel")?li($):$,$){case"value":ai(_,e);break;case"style":Li(_,e);break;case"class":oi(_,e);break;case"selected":case"checked":si(_,$,e);break;default:St(_,$,e);break}}function ai(_,$){if(mt(_))_.attributes.value===void 0&&(_.value=$),window.fromModel&&(typeof $=="boolean"?_.checked=X_(_.value)===$:_.checked=Ct(_.value,$));else if(v$(_))Number.isInteger($)?_.value=$:!Array.isArray($)&&typeof $!="boolean"&&![null,void 0].includes($)?_.value=String($):Array.isArray($)?_.checked=$.some(e=>Ct(e,_.value)):_.checked=!!$;else if(_.tagName==="SELECT")Ii(_,$);else{if(_.value===$)return;_.value=$===void 0?"":$}}function oi(_,$){_._x_undoAddedClasses&&_._x_undoAddedClasses(),_._x_undoAddedClasses=W$(_,$)}function Li(_,$){_._x_undoAddedStyles&&_._x_undoAddedStyles(),_._x_undoAddedStyles=k_(_,$)}function si(_,$,e){St(_,$,e),Ai(_,$,e)}function St(_,$,e){[null,void 0,!1].includes(e)&&ci($)?_.removeAttribute($):(pt($)&&(e=$),Ei(_,$,e))}function Ei(_,$,e){_.getAttribute($)!=e&&_.setAttribute($,e)}function Ai(_,$,e){_[$]!==e&&(_[$]=e)}function Ii(_,$){const e=[].concat($).map(t=>t+"");Array.from(_.options).forEach(t=>{t.selected=e.includes(t.value)})}function li(_){return _.toLowerCase().replace(/-(\w)/g,($,e)=>e.toUpperCase())}function Ct(_,$){return _==$}function X_(_){return[1,"1","true","on","yes",!0].includes(_)?!0:[0,"0","false","off","no",!1].includes(_)?!1:_?!!_:null}var ui=new Set(["allowfullscreen","async","autofocus","autoplay","checked","controls","default","defer","disabled","formnovalidate","inert","ismap","itemscope","loop","multiple","muted","nomodule","novalidate","open","playsinline","readonly","required","reversed","selected","shadowrootclonable","shadowrootdelegatesfocus","shadowrootserializable"]);function pt(_){return ui.has(_)}function ci(_){return!["aria-pressed","aria-checked","aria-expanded","aria-selected"].includes(_)}function fi(_,$,e){return _._x_bindings&&_._x_bindings[$]!==void 0?_._x_bindings[$]:gt(_,$,e)}function Ri(_,$,e,t=!0){if(_._x_bindings&&_._x_bindings[$]!==void 0)return _._x_bindings[$];if(_._x_inlineBindings&&_._x_inlineBindings[$]!==void 0){let n=_._x_inlineBindings[$];return n.extract=t,Qe(()=>i_(_,n.expression))}return gt(_,$,e)}function gt(_,$,e){let t=_.getAttribute($);return t===null?typeof e=="function"?e():e:t===""?!0:pt($)?!![$,"true"].includes(t):t}function v$(_){return _.type==="checkbox"||_.localName==="ui-checkbox"||_.localName==="ui-switch"}function mt(_){return _.type==="radio"||_.localName==="ui-radio"}function Ot(_,$){let e;return function(){const t=this,n=arguments,r=function(){e=null,_.apply(t,n)};clearTimeout(e),e=setTimeout(r,$)}}function Ht(_,$){let e;return function(){let t=this,n=arguments;e||(_.apply(t,n),e=!0,setTimeout(()=>e=!1,$))}}function Mt({get:_,set:$},{get:e,set:t}){let n=!0,r,i=t_(()=>{let T=_(),o=e();if(n)t(w$(T)),n=!1;else{let s=JSON.stringify(T),I=JSON.stringify(o);s!==r?t(w$(T)):s!==I&&$(w$(o))}r=JSON.stringify(_()),JSON.stringify(e())});return()=>{u_(i)}}function w$(_){return typeof _=="object"?JSON.parse(JSON.stringify(_)):_}function di(_){(Array.isArray(_)?_:[_]).forEach(e=>e(d_))}var L_={},Pt=!1;function hi(_,$){if(Pt||(L_=l_(L_),Pt=!0),$===void 0)return L_[_];L_[_]=$,d$(L_[_]),typeof $=="object"&&$!==null&&$.hasOwnProperty("init")&&typeof $.init=="function"&&L_[_].init()}function Ni(){return L_}var xt={};function Si(_,$){let e=typeof $!="function"?()=>$:$;return _ instanceof Element?Wt(_,e()):(xt[_]=e,()=>{})}function Ci(_){return Object.entries(xt).forEach(([$,e])=>{Object.defineProperty(_,$,{get(){return(...t)=>e(...t)}})}),_}function Wt(_,$,e){let t=[];for(;t.length;)t.pop()();let n=Object.entries($).map(([i,T])=>({name:i,value:T})),r=$t(n);return n=n.map(i=>r.find(T=>T.name===i.name)?{name:`x-bind:${i.name}`,value:`"${i.value}"`}:i),C$(_,n,e).map(i=>{t.push(i.runCleanups),i()}),()=>{for(;t.length;)t.pop()()}}var Dt={};function pi(_,$){Dt[_]=$}function gi(_,$){return Object.entries(Dt).forEach(([e,t])=>{Object.defineProperty(_,e,{get(){return(...n)=>t.bind($)(...n)},enumerable:!1})}),_}var mi={get reactive(){return l_},get release(){return u_},get effect(){return t_},get raw(){return ve},version:"3.15.4",flushAndStopDeferringMutations:Cr,dontAutoEvaluateFunctions:Qe,disableEffectScheduling:cr,startObservingMutations:c$,stopObservingMutations:Xe,setReactivityEngine:fr,onAttributeRemoved:ke,onAttributesAdded:Ve,closestDataStack:n_,skipDuringClone:J,onlyDuringClone:ni,addRootSelector:It,addInitSelector:lt,setErrorHandler:Mr,interceptClone:K_,addScopeToNode:O_,deferMutations:Sr,mapAttributes:g$,evaluateLater:b,interceptInit:Yr,initInterceptors:d$,injectMagics:H_,setEvaluator:xr,setRawEvaluator:Wr,mergeProxies:r_,extractProp:Ri,findClosest:o_,onElRemoved:I$,closestRoot:V_,destroyTree:R_,interceptor:je,transition:y$,setStyles:k_,mutateDom:y,directive:v,entangle:Mt,throttle:Ht,debounce:Ot,evaluate:i_,evaluateRaw:vr,initTree:z,nextTick:P$,prefixed:f_,prefix:br,plugin:di,magic:K,store:hi,start:Kr,clone:ii,cloneNode:ri,bound:fi,$data:Ye,watch:be,walk:a_,data:pi,bind:Si},d_=mi;function Oi(_,$){const e=Object.create(null),t=_.split(",");for(let n=0;n<t.length;n++)e[t[n]]=!0;return n=>!!e[n]}var Hi=Object.freeze({}),Mi=Object.prototype.hasOwnProperty,Y_=(_,$)=>Mi.call(_,$),s_=Array.isArray,y_=_=>yt(_)==="[object Map]",Pi=_=>typeof _=="string",b$=_=>typeof _=="symbol",j_=_=>_!==null&&typeof _=="object",xi=Object.prototype.toString,yt=_=>xi.call(_),Ut=_=>yt(_).slice(8,-1),G$=_=>Pi(_)&&_!=="NaN"&&_[0]!=="-"&&""+parseInt(_,10)===_,Wi=_=>{const $=Object.create(null);return e=>$[e]||($[e]=_(e))},Di=Wi(_=>_.charAt(0).toUpperCase()+_.slice(1)),vt=(_,$)=>_!==$&&(_===_||$===$),F$=new WeakMap,U_=[],q,E_=Symbol("iterate"),B$=Symbol("Map key iterate");function yi(_){return _&&_._isEffect===!0}function Ui(_,$=Hi){yi(_)&&(_=_.raw);const e=bi(_,$);return $.lazy||e(),e}function vi(_){_.active&&(wt(_),_.options.onStop&&_.options.onStop(),_.active=!1)}var wi=0;function bi(_,$){const e=function(){if(!e.active)return _();if(!U_.includes(e)){wt(e);try{return Fi(),U_.push(e),q=e,_()}finally{U_.pop(),bt(),q=U_[U_.length-1]}}};return e.id=wi++,e.allowRecurse=!!$.allowRecurse,e._isEffect=!0,e.active=!0,e.raw=_,e.deps=[],e.options=$,e}function wt(_){const{deps:$}=_;if($.length){for(let e=0;e<$.length;e++)$[e].delete(_);$.length=0}}var h_=!0,V$=[];function Gi(){V$.push(h_),h_=!1}function Fi(){V$.push(h_),h_=!0}function bt(){const _=V$.pop();h_=_===void 0?!0:_}function X(_,$,e){if(!h_||q===void 0)return;let t=F$.get(_);t||F$.set(_,t=new Map);let n=t.get(e);n||t.set(e,n=new Set),n.has(q)||(n.add(q),q.deps.push(n),q.options.onTrack&&q.options.onTrack({effect:q,target:_,type:$,key:e}))}function Z(_,$,e,t,n,r){const i=F$.get(_);if(!i)return;const T=new Set,o=I=>{I&&I.forEach(R=>{(R!==q||R.allowRecurse)&&T.add(R)})};if($==="clear")i.forEach(o);else if(e==="length"&&s_(_))i.forEach((I,R)=>{(R==="length"||R>=t)&&o(I)});else switch(e!==void 0&&o(i.get(e)),$){case"add":s_(_)?G$(e)&&o(i.get("length")):(o(i.get(E_)),y_(_)&&o(i.get(B$)));break;case"delete":s_(_)||(o(i.get(E_)),y_(_)&&o(i.get(B$)));break;case"set":y_(_)&&o(i.get(E_));break}const s=I=>{I.options.onTrigger&&I.options.onTrigger({effect:I,target:_,key:e,type:$,newValue:t,oldValue:n,oldTarget:r}),I.options.scheduler?I.options.scheduler(I):I()};T.forEach(s)}var Bi=Oi("__proto__,__v_isRef,__isVue"),Gt=new Set(Object.getOwnPropertyNames(Symbol).map(_=>Symbol[_]).filter(b$)),Vi=Bt(),ki=Bt(!0),Ft=Ki();function Ki(){const _={};return["includes","indexOf","lastIndexOf"].forEach($=>{_[$]=function(...e){const t=D(this);for(let r=0,i=this.length;r<i;r++)X(t,"get",r+"");const n=t[$](...e);return n===-1||n===!1?t[$](...e.map(D)):n}}),["push","pop","shift","unshift","splice"].forEach($=>{_[$]=function(...e){Gi();const t=D(this)[$].apply(this,e);return bt(),t}}),_}function Bt(_=!1,$=!1){return function(t,n,r){if(n==="__v_isReactive")return!_;if(n==="__v_isReadonly")return _;if(n==="__v_raw"&&r===(_?$?rT:zt:$?nT:qt).get(t))return t;const i=s_(t);if(!_&&i&&Y_(Ft,n))return Reflect.get(Ft,n,r);const T=Reflect.get(t,n,r);return(b$(n)?Gt.has(n):Bi(n))||(_||X(t,"get",n),$)?T:j$(T)?!i||!G$(n)?T.value:T:j_(T)?_?Qt(T):Y$(T):T}}var Xi=Yi();function Yi(_=!1){return function(e,t,n,r){let i=e[t];if(!_&&(n=D(n),i=D(i),!s_(e)&&j$(i)&&!j$(n)))return i.value=n,!0;const T=s_(e)&&G$(t)?Number(t)<e.length:Y_(e,t),o=Reflect.set(e,t,n,r);return e===D(r)&&(T?vt(n,i)&&Z(e,"set",t,n,i):Z(e,"add",t,n)),o}}function ji(_,$){const e=Y_(_,$),t=_[$],n=Reflect.deleteProperty(_,$);return n&&e&&Z(_,"delete",$,void 0,t),n}function qi(_,$){const e=Reflect.has(_,$);return(!b$($)||!Gt.has($))&&X(_,"has",$),e}function zi(_){return X(_,"iterate",s_(_)?"length":E_),Reflect.ownKeys(_)}var Qi={get:Vi,set:Xi,deleteProperty:ji,has:qi,ownKeys:zi},Ji={get:ki,set(_,$){return console.warn(`Set operation on key "${String($)}" failed: target is readonly.`,_),!0},deleteProperty(_,$){return console.warn(`Delete operation on key "${String($)}" failed: target is readonly.`,_),!0}},k$=_=>j_(_)?Y$(_):_,K$=_=>j_(_)?Qt(_):_,X$=_=>_,q_=_=>Reflect.getPrototypeOf(_);function z_(_,$,e=!1,t=!1){_=_.__v_raw;const n=D(_),r=D($);$!==r&&!e&&X(n,"get",$),!e&&X(n,"get",r);const{has:i}=q_(n),T=t?X$:e?K$:k$;if(i.call(n,$))return T(_.get($));if(i.call(n,r))return T(_.get(r));_!==n&&_.get($)}function Q_(_,$=!1){const e=this.__v_raw,t=D(e),n=D(_);return _!==n&&!$&&X(t,"has",_),!$&&X(t,"has",n),_===n?e.has(_):e.has(_)||e.has(n)}function J_(_,$=!1){return _=_.__v_raw,!$&&X(D(_),"iterate",E_),Reflect.get(_,"size",_)}function Vt(_){_=D(_);const $=D(this);return q_($).has.call($,_)||($.add(_),Z($,"add",_,_)),this}function kt(_,$){$=D($);const e=D(this),{has:t,get:n}=q_(e);let r=t.call(e,_);r?jt(e,t,_):(_=D(_),r=t.call(e,_));const i=n.call(e,_);return e.set(_,$),r?vt($,i)&&Z(e,"set",_,$,i):Z(e,"add",_,$),this}function Kt(_){const $=D(this),{has:e,get:t}=q_($);let n=e.call($,_);n?jt($,e,_):(_=D(_),n=e.call($,_));const r=t?t.call($,_):void 0,i=$.delete(_);return n&&Z($,"delete",_,void 0,r),i}function Xt(){const _=D(this),$=_.size!==0,e=y_(_)?new Map(_):new Set(_),t=_.clear();return $&&Z(_,"clear",void 0,void 0,e),t}function Z_(_,$){return function(t,n){const r=this,i=r.__v_raw,T=D(i),o=$?X$:_?K$:k$;return!_&&X(T,"iterate",E_),i.forEach((s,I)=>t.call(n,o(s),o(I),r))}}function _$(_,$,e){return function(...t){const n=this.__v_raw,r=D(n),i=y_(r),T=_==="entries"||_===Symbol.iterator&&i,o=_==="keys"&&i,s=n[_](...t),I=e?X$:$?K$:k$;return!$&&X(r,"iterate",o?B$:E_),{next(){const{value:R,done:d}=s.next();return d?{value:R,done:d}:{value:T?[I(R[0]),I(R[1])]:I(R),done:d}},[Symbol.iterator](){return this}}}}function __(_){return function(...$){{const e=$[0]?`on key "${$[0]}" `:"";console.warn(`${Di(_)} operation ${e}failed: target is readonly.`,D(this))}return _==="delete"?!1:this}}function Zi(){const _={get(r){return z_(this,r)},get size(){return J_(this)},has:Q_,add:Vt,set:kt,delete:Kt,clear:Xt,forEach:Z_(!1,!1)},$={get(r){return z_(this,r,!1,!0)},get size(){return J_(this)},has:Q_,add:Vt,set:kt,delete:Kt,clear:Xt,forEach:Z_(!1,!0)},e={get(r){return z_(this,r,!0)},get size(){return J_(this,!0)},has(r){return Q_.call(this,r,!0)},add:__("add"),set:__("set"),delete:__("delete"),clear:__("clear"),forEach:Z_(!0,!1)},t={get(r){return z_(this,r,!0,!0)},get size(){return J_(this,!0)},has(r){return Q_.call(this,r,!0)},add:__("add"),set:__("set"),delete:__("delete"),clear:__("clear"),forEach:Z_(!0,!0)};return["keys","values","entries",Symbol.iterator].forEach(r=>{_[r]=_$(r,!1,!1),e[r]=_$(r,!0,!1),$[r]=_$(r,!1,!0),t[r]=_$(r,!0,!0)}),[_,e,$,t]}var[_T,$T]=Zi();function Yt(_,$){const e=_?$T:_T;return(t,n,r)=>n==="__v_isReactive"?!_:n==="__v_isReadonly"?_:n==="__v_raw"?t:Reflect.get(Y_(e,n)&&n in t?e:t,n,r)}var eT={get:Yt(!1)},tT={get:Yt(!0)};function jt(_,$,e){const t=D(e);if(t!==e&&$.call(_,t)){const n=Ut(_);console.warn(`Reactive ${n} contains both the raw and reactive versions of the same object${n==="Map"?" as keys":""}, which can lead to inconsistencies. Avoid differentiating between the raw and reactive versions of an object and only use the reactive version if possible.`)}}var qt=new WeakMap,nT=new WeakMap,zt=new WeakMap,rT=new WeakMap;function iT(_){switch(_){case"Object":case"Array":return 1;case"Map":case"Set":case"WeakMap":case"WeakSet":return 2;default:return 0}}function TT(_){return _.__v_skip||!Object.isExtensible(_)?0:iT(Ut(_))}function Y$(_){return _&&_.__v_isReadonly?_:Jt(_,!1,Qi,eT,qt)}function Qt(_){return Jt(_,!0,Ji,tT,zt)}function Jt(_,$,e,t,n){if(!j_(_))return console.warn(`value cannot be made reactive: ${String(_)}`),_;if(_.__v_raw&&!($&&_.__v_isReactive))return _;const r=n.get(_);if(r)return r;const i=TT(_);if(i===0)return _;const T=new Proxy(_,i===2?t:e);return n.set(_,T),T}function D(_){return _&&D(_.__v_raw)||_}function j$(_){return!!(_&&_.__v_isRef===!0)}K("nextTick",()=>P$),K("dispatch",_=>W_.bind(W_,_)),K("watch",(_,{evaluateLater:$,cleanup:e})=>(t,n)=>{let r=$(t),T=be(()=>{let o;return r(s=>o=s),o},n);e(T)}),K("store",Ni),K("data",_=>Ye(_)),K("root",_=>V_(_)),K("refs",_=>(_._x_refs_proxy||(_._x_refs_proxy=r_(aT(_))),_._x_refs_proxy));function aT(_){let $=[];return o_(_,e=>{e._x_refs&&$.push(e._x_refs)}),$}var q$={};function Zt(_){return q$[_]||(q$[_]=0),++q$[_]}function oT(_,$){return o_(_,e=>{if(e._x_ids&&e._x_ids[$])return!0})}function LT(_,$){_._x_ids||(_._x_ids={}),_._x_ids[$]||(_._x_ids[$]=Zt($))}K("id",(_,{cleanup:$})=>(e,t=null)=>{let n=`${e}${t?`-${t}`:""}`;return sT(_,n,$,()=>{let r=oT(_,e),i=r?r._x_ids[e]:Zt(e);return t?`${e}-${i}-${t}`:`${e}-${i}`})}),K_((_,$)=>{_._x_id&&($._x_id=_._x_id)});function sT(_,$,e,t){if(_._x_id||(_._x_id={}),_._x_id[$])return _._x_id[$];let n=t();return _._x_id[$]=n,e(()=>{delete _._x_id[$]}),n}K("el",_=>_),_n("Focus","focus","focus"),_n("Persist","persist","persist");function _n(_,$,e){K($,t=>V(`You can't use [$${$}] without first installing the "${_}" plugin here: https://alpinejs.dev/plugins/${e}`,t))}v("modelable",(_,{expression:$},{effect:e,evaluateLater:t,cleanup:n})=>{let r=t($),i=()=>{let I;return r(R=>I=R),I},T=t(`${$} = __placeholder`),o=I=>T(()=>{},{scope:{__placeholder:I}}),s=i();o(s),queueMicrotask(()=>{if(!_._x_model)return;_._x_removeModelListeners.default();let I=_._x_model.get,R=_._x_model.set,d=Mt({get(){return I()},set(g){R(g)}},{get(){return i()},set(g){o(g)}});n(d)})}),v("teleport",(_,{modifiers:$,expression:e},{cleanup:t})=>{_.tagName.toLowerCase()!=="template"&&V("x-teleport can only be used on a <template> tag",_);let n=$n(e),r=_.content.cloneNode(!0).firstElementChild;_._x_teleport=r,r._x_teleportBack=_,_.setAttribute("data-teleport-template",!0),r.setAttribute("data-teleport-target",!0),_._x_forwardEvents&&_._x_forwardEvents.forEach(T=>{r.addEventListener(T,o=>{o.stopPropagation(),_.dispatchEvent(new o.constructor(o.type,o))})}),O_(r,{},_);let i=(T,o,s)=>{s.includes("prepend")?o.parentNode.insertBefore(T,o):s.includes("append")?o.parentNode.insertBefore(T,o.nextSibling):o.appendChild(T)};y(()=>{i(r,n,$),J(()=>{z(r)})()}),_._x_teleportPutBack=()=>{let T=$n(e);y(()=>{i(_._x_teleport,T,$)})},t(()=>y(()=>{r.remove(),R_(r)}))});var ET=document.createElement("div");function $n(_){let $=J(()=>document.querySelector(_),()=>ET)();return $||V(`Cannot find x-teleport element for selector: "${_}"`),$}var en=()=>{};en.inline=(_,{modifiers:$},{cleanup:e})=>{$.includes("self")?_._x_ignoreSelf=!0:_._x_ignore=!0,e(()=>{$.includes("self")?delete _._x_ignoreSelf:delete _._x_ignore})},v("ignore",en),v("effect",J((_,{expression:$},{effect:e})=>{e(b(_,$))}));function z$(_,$,e,t){let n=_,r=o=>t(o),i={},T=(o,s)=>I=>s(o,I);if(e.includes("dot")&&($=AT($)),e.includes("camel")&&($=IT($)),e.includes("passive")&&(i.passive=!0),e.includes("capture")&&(i.capture=!0),e.includes("window")&&(n=window),e.includes("document")&&(n=document),e.includes("debounce")){let o=e[e.indexOf("debounce")+1]||"invalid-wait",s=$$(o.split("ms")[0])?Number(o.split("ms")[0]):250;r=Ot(r,s)}if(e.includes("throttle")){let o=e[e.indexOf("throttle")+1]||"invalid-wait",s=$$(o.split("ms")[0])?Number(o.split("ms")[0]):250;r=Ht(r,s)}return e.includes("prevent")&&(r=T(r,(o,s)=>{s.preventDefault(),o(s)})),e.includes("stop")&&(r=T(r,(o,s)=>{s.stopPropagation(),o(s)})),e.includes("once")&&(r=T(r,(o,s)=>{o(s),n.removeEventListener($,r,i)})),(e.includes("away")||e.includes("outside"))&&(n=document,r=T(r,(o,s)=>{_.contains(s.target)||s.target.isConnected!==!1&&(_.offsetWidth<1&&_.offsetHeight<1||_._x_isShown!==!1&&o(s))})),e.includes("self")&&(r=T(r,(o,s)=>{s.target===_&&o(s)})),(uT($)||tn($))&&(r=T(r,(o,s)=>{cT(s,e)||o(s)})),n.addEventListener($,r,i),()=>{n.removeEventListener($,r,i)}}function AT(_){return _.replace(/-/g,".")}function IT(_){return _.toLowerCase().replace(/-(\w)/g,($,e)=>e.toUpperCase())}function $$(_){return!Array.isArray(_)&&!isNaN(_)}function lT(_){return[" ","_"].includes(_)?_:_.replace(/([a-z])([A-Z])/g,"$1-$2").replace(/[_\s]/,"-").toLowerCase()}function uT(_){return["keydown","keyup"].includes(_)}function tn(_){return["contextmenu","click","mouse"].some($=>_.includes($))}function cT(_,$){let e=$.filter(r=>!["window","document","prevent","stop","once","capture","self","away","outside","passive","preserve-scroll"].includes(r));if(e.includes("debounce")){let r=e.indexOf("debounce");e.splice(r,$$((e[r+1]||"invalid-wait").split("ms")[0])?2:1)}if(e.includes("throttle")){let r=e.indexOf("throttle");e.splice(r,$$((e[r+1]||"invalid-wait").split("ms")[0])?2:1)}if(e.length===0||e.length===1&&nn(_.key).includes(e[0]))return!1;const n=["ctrl","shift","alt","meta","cmd","super"].filter(r=>e.includes(r));return e=e.filter(r=>!n.includes(r)),!(n.length>0&&n.filter(i=>((i==="cmd"||i==="super")&&(i="meta"),_[`${i}Key`])).length===n.length&&(tn(_.type)||nn(_.key).includes(e[0])))}function nn(_){if(!_)return[];_=lT(_);let $={ctrl:"control",slash:"/",space:" ",spacebar:" ",cmd:"meta",esc:"escape",up:"arrow-up",down:"arrow-down",left:"arrow-left",right:"arrow-right",period:".",comma:",",equal:"=",minus:"-",underscore:"_"};return $[_]=_,Object.keys($).map(e=>{if($[e]===_)return e}).filter(e=>e)}v("model",(_,{modifiers:$,expression:e},{effect:t,cleanup:n})=>{let r=_;$.includes("parent")&&(r=_.parentNode);let i=b(r,e),T;typeof e=="string"?T=b(r,`${e} = __placeholder`):typeof e=="function"&&typeof e()=="string"?T=b(r,`${e()} = __placeholder`):T=()=>{};let o=()=>{let d;return i(g=>d=g),rn(d)?d.get():d},s=d=>{let g;i(C=>g=C),rn(g)?g.set(d):T(()=>{},{scope:{__placeholder:d}})};typeof e=="string"&&_.type==="radio"&&y(()=>{_.hasAttribute("name")||_.setAttribute("name",e)});let I=_.tagName.toLowerCase()==="select"||["checkbox","radio"].includes(_.type)||$.includes("lazy")?"change":"input",R=Q?()=>{}:z$(_,I,$,d=>{s(Q$(_,$,d,o()))});if($.includes("fill")&&([void 0,null,""].includes(o())||v$(_)&&Array.isArray(o())||_.tagName.toLowerCase()==="select"&&_.multiple)&&s(Q$(_,$,{target:_},o())),_._x_removeModelListeners||(_._x_removeModelListeners={}),_._x_removeModelListeners.default=R,n(()=>_._x_removeModelListeners.default()),_.form){let d=z$(_.form,"reset",[],g=>{P$(()=>_._x_model&&_._x_model.set(Q$(_,$,{target:_},o())))});n(()=>d())}_._x_model={get(){return o()},set(d){s(d)}},_._x_forceModelUpdate=d=>{d===void 0&&typeof e=="string"&&e.match(/\./)&&(d=""),window.fromModel=!0,y(()=>Nt(_,"value",d)),delete window.fromModel},t(()=>{let d=o();$.includes("unintrusive")&&document.activeElement.isSameNode(_)||_._x_forceModelUpdate(d)})});function Q$(_,$,e,t){return y(()=>{if(e instanceof CustomEvent&&e.detail!==void 0)return e.detail!==null&&e.detail!==void 0?e.detail:e.target.value;if(v$(_))if(Array.isArray(t)){let n=null;return $.includes("number")?n=J$(e.target.value):$.includes("boolean")?n=X_(e.target.value):n=e.target.value,e.target.checked?t.includes(n)?t:t.concat([n]):t.filter(r=>!fT(r,n))}else return e.target.checked;else{if(_.tagName.toLowerCase()==="select"&&_.multiple)return $.includes("number")?Array.from(e.target.selectedOptions).map(n=>{let r=n.value||n.text;return J$(r)}):$.includes("boolean")?Array.from(e.target.selectedOptions).map(n=>{let r=n.value||n.text;return X_(r)}):Array.from(e.target.selectedOptions).map(n=>n.value||n.text);{let n;return mt(_)?e.target.checked?n=e.target.value:n=t:n=e.target.value,$.includes("number")?J$(n):$.includes("boolean")?X_(n):$.includes("trim")?n.trim():n}}})}function J$(_){let $=_?parseFloat(_):null;return RT($)?$:_}function fT(_,$){return _==$}function RT(_){return!Array.isArray(_)&&!isNaN(_)}function rn(_){return _!==null&&typeof _=="object"&&typeof _.get=="function"&&typeof _.set=="function"}v("cloak",_=>queueMicrotask(()=>y(()=>_.removeAttribute(f_("cloak"))))),lt(()=>`[${f_("init")}]`),v("init",J((_,{expression:$},{evaluate:e})=>typeof $=="string"?!!$.trim()&&e($,{},!1):e($,{},!1))),v("text",(_,{expression:$},{effect:e,evaluateLater:t})=>{let n=t($);e(()=>{n(r=>{y(()=>{_.textContent=r})})})}),v("html",(_,{expression:$},{effect:e,evaluateLater:t})=>{let n=t($);e(()=>{n(r=>{y(()=>{_.innerHTML=r,_._x_ignoreSelf=!0,z(_),delete _._x_ignoreSelf})})})}),g$(nt(":",rt(f_("bind:"))));var Tn=(_,{value:$,modifiers:e,expression:t,original:n},{effect:r,cleanup:i})=>{if(!$){let o={};Ci(o),b(_,t)(I=>{Wt(_,I,n)},{scope:o});return}if($==="key")return dT(_,t);if(_._x_inlineBindings&&_._x_inlineBindings[$]&&_._x_inlineBindings[$].extract)return;let T=b(_,t);r(()=>T(o=>{o===void 0&&typeof t=="string"&&t.match(/\./)&&(o=""),y(()=>Nt(_,$,o,e))})),i(()=>{_._x_undoAddedClasses&&_._x_undoAddedClasses(),_._x_undoAddedStyles&&_._x_undoAddedStyles()})};Tn.inline=(_,{value:$,modifiers:e,expression:t})=>{$&&(_._x_inlineBindings||(_._x_inlineBindings={}),_._x_inlineBindings[$]={expression:t,extract:!1})},v("bind",Tn);function dT(_,$){_._x_keyExpression=$}It(()=>`[${f_("data")}]`),v("data",(_,{expression:$},{cleanup:e})=>{if(hT(_))return;$=$===""?"{}":$;let t={};H_(t,_);let n={};gi(n,t);let r=i_(_,$,{scope:n});(r===void 0||r===!0)&&(r={}),H_(r,_);let i=l_(r);d$(i);let T=O_(_,i);i.init&&i_(_,i.init),e(()=>{i.destroy&&i_(_,i.destroy),T()})}),K_((_,$)=>{_._x_dataStack&&($._x_dataStack=_._x_dataStack,$.setAttribute("data-has-alpine-state",!0))});function hT(_){return Q?U$?!0:_.hasAttribute("data-has-alpine-state"):!1}v("show",(_,{modifiers:$,expression:e},{effect:t})=>{let n=b(_,e);_._x_doHide||(_._x_doHide=()=>{y(()=>{_.style.setProperty("display","none",$.includes("important")?"important":void 0)})}),_._x_doShow||(_._x_doShow=()=>{y(()=>{_.style.length===1&&_.style.display==="none"?_.removeAttribute("style"):_.style.removeProperty("display")})});let r=()=>{_._x_doHide(),_._x_isShown=!1},i=()=>{_._x_doShow(),_._x_isShown=!0},T=()=>setTimeout(i),o=D$(R=>R?i():r(),R=>{typeof _._x_toggleAndCascadeWithTransitions=="function"?_._x_toggleAndCascadeWithTransitions(_,R,i,r):R?T():r()}),s,I=!0;t(()=>n(R=>{!I&&R===s||($.includes("immediate")&&(R?T():r()),o(R),s=R,I=!1)}))}),v("for",(_,{expression:$},{effect:e,cleanup:t})=>{let n=ST($),r=b(_,n.items),i=b(_,_._x_keyExpression||"index");_._x_prevKeys=[],_._x_lookup={},e(()=>NT(_,n,r,i)),t(()=>{Object.values(_._x_lookup).forEach(T=>y(()=>{R_(T),T.remove()})),delete _._x_prevKeys,delete _._x_lookup})});function NT(_,$,e,t){let n=i=>typeof i=="object"&&!Array.isArray(i),r=_;e(i=>{CT(i)&&i>=0&&(i=Array.from(Array(i).keys(),u=>u+1)),i===void 0&&(i=[]);let T=_._x_lookup,o=_._x_prevKeys,s=[],I=[];if(n(i))i=Object.entries(i).map(([u,M])=>{let W=an($,M,u,i);t(P=>{I.includes(P)&&V("Duplicate key on x-for",_),I.push(P)},{scope:{index:u,...W}}),s.push(W)});else for(let u=0;u<i.length;u++){let M=an($,i[u],u,i);t(W=>{I.includes(W)&&V("Duplicate key on x-for",_),I.push(W)},{scope:{index:u,...M}}),s.push(M)}let R=[],d=[],g=[],C=[];for(let u=0;u<o.length;u++){let M=o[u];I.indexOf(M)===-1&&g.push(M)}o=o.filter(u=>!g.includes(u));let S="template";for(let u=0;u<I.length;u++){let M=I[u],W=o.indexOf(M);if(W===-1)o.splice(u,0,M),R.push([S,u]);else if(W!==u){let P=o.splice(u,1)[0],U=o.splice(W-1,1)[0];o.splice(u,0,U),o.splice(W,0,P),d.push([P,U])}else C.push(M);S=M}for(let u=0;u<g.length;u++){let M=g[u];M in T&&(y(()=>{R_(T[M]),T[M].remove()}),delete T[M])}for(let u=0;u<d.length;u++){let[M,W]=d[u],P=T[M],U=T[W],G=document.createElement("div");y(()=>{U||V('x-for ":key" is undefined or invalid',r,W,T),U.after(G),P.after(U),U._x_currentIfEl&&U.after(U._x_currentIfEl),G.before(P),P._x_currentIfEl&&P.after(P._x_currentIfEl),G.remove()}),U._x_refreshXForScope(s[I.indexOf(W)])}for(let u=0;u<R.length;u++){let[M,W]=R[u],P=M==="template"?r:T[M];P._x_currentIfEl&&(P=P._x_currentIfEl);let U=s[W],G=I[W],A_=document.importNode(r.content,!0).firstElementChild,T$=l_(U);O_(A_,T$,r),A_._x_refreshXForScope=a$=>{Object.entries(a$).forEach(([xe,We])=>{T$[xe]=We})},y(()=>{P.after(A_),J(()=>z(A_))()}),typeof G=="object"&&V("x-for key cannot be an object, it must be a string or an integer",r),T[G]=A_}for(let u=0;u<C.length;u++)T[C[u]]._x_refreshXForScope(s[I.indexOf(C[u])]);r._x_prevKeys=I})}function ST(_){let $=/,([^,\}\]]*)(?:,([^,\}\]]*))?$/,e=/^\s*\(|\)\s*$/g,t=/([\s\S]*?)\s+(?:in|of)\s+([\s\S]*)/,n=_.match(t);if(!n)return;let r={};r.items=n[2].trim();let i=n[1].replace(e,"").trim(),T=i.match($);return T?(r.item=i.replace($,"").trim(),r.index=T[1].trim(),T[2]&&(r.collection=T[2].trim())):r.item=i,r}function an(_,$,e,t){let n={};return/^\[.*\]$/.test(_.item)&&Array.isArray($)?_.item.replace("[","").replace("]","").split(",").map(i=>i.trim()).forEach((i,T)=>{n[i]=$[T]}):/^\{.*\}$/.test(_.item)&&!Array.isArray($)&&typeof $=="object"?_.item.replace("{","").replace("}","").split(",").map(i=>i.trim()).forEach(i=>{n[i]=$[i]}):n[_.item]=$,_.index&&(n[_.index]=e),_.collection&&(n[_.collection]=t),n}function CT(_){return!Array.isArray(_)&&!isNaN(_)}function on(){}on.inline=(_,{expression:$},{cleanup:e})=>{let t=V_(_);t._x_refs||(t._x_refs={}),t._x_refs[$]=_,e(()=>delete t._x_refs[$])},v("ref",on),v("if",(_,{expression:$},{effect:e,cleanup:t})=>{_.tagName.toLowerCase()!=="template"&&V("x-if can only be used on a <template> tag",_);let n=b(_,$),r=()=>{if(_._x_currentIfEl)return _._x_currentIfEl;let T=_.content.cloneNode(!0).firstElementChild;return O_(T,{},_),y(()=>{_.after(T),J(()=>z(T))()}),_._x_currentIfEl=T,_._x_undoIf=()=>{y(()=>{R_(T),T.remove()}),delete _._x_currentIfEl},T},i=()=>{_._x_undoIf&&(_._x_undoIf(),delete _._x_undoIf)};e(()=>n(T=>{T?r():i()})),t(()=>_._x_undoIf&&_._x_undoIf())}),v("id",(_,{expression:$},{evaluate:e})=>{e($).forEach(n=>LT(_,n))}),K_((_,$)=>{_._x_ids&&($._x_ids=_._x_ids)}),g$(nt("@",rt(f_("on:")))),v("on",J((_,{value:$,modifiers:e,expression:t},{cleanup:n})=>{let r=t?b(_,t):()=>{};_.tagName.toLowerCase()==="template"&&(_._x_forwardEvents||(_._x_forwardEvents=[]),_._x_forwardEvents.includes($)||_._x_forwardEvents.push($));let i=z$(_,$,e,T=>{r(()=>{},{scope:{$event:T},params:[T]})});n(()=>i())})),e$("Collapse","collapse","collapse"),e$("Intersect","intersect","intersect"),e$("Focus","trap","focus"),e$("Mask","mask","mask");function e$(_,$,e){v($,t=>V(`You can't use [x-${$}] without first installing the "${_}" plugin here: https://alpinejs.dev/plugins/${e}`,t))}d_.setEvaluator(_t),d_.setRawEvaluator(wr),d_.setReactivityEngine({reactive:Y$,effect:Ui,release:vi,raw:D});var pT=d_,$_=pT;const gT=typeof document<"u"&&document.documentMode,mT={rootMargin:"0px",threshold:0,load(_){if(_.nodeName.toLowerCase()==="picture"){let e=_.querySelector("img"),t=!1;e===null&&(e=document.createElement("img"),t=!0),gT&&_.getAttribute("data-iesrc")&&(e.src=_.getAttribute("data-iesrc")),_.getAttribute("data-alt")&&(e.alt=_.getAttribute("data-alt")),t&&_.append(e)}if(_.nodeName.toLowerCase()==="video"&&!_.getAttribute("data-src")&&_.children){const e=_.children;let t;for(let n=0;n<=e.length-1;n++)t=e[n].getAttribute("data-src"),t&&(e[n].src=t);_.load()}_.getAttribute("data-poster")&&(_.poster=_.getAttribute("data-poster")),_.getAttribute("data-src")&&(_.src=_.getAttribute("data-src")),_.getAttribute("data-srcset")&&_.setAttribute("srcset",_.getAttribute("data-srcset"));let $=",";if(_.getAttribute("data-background-delimiter")&&($=_.getAttribute("data-background-delimiter")),_.getAttribute("data-background-image"))_.style.backgroundImage=`url('${_.getAttribute("data-background-image").split($).join("'),url('")}')`;else if(_.getAttribute("data-background-image-set")){const e=_.getAttribute("data-background-image-set").split($);let t=e[0].substr(0,e[0].indexOf(" "))||e[0];t=t.indexOf("url(")===-1?`url(${t})`:t,e.length===1?_.style.backgroundImage=t:_.setAttribute("style",(_.getAttribute("style")||"")+`background-image: ${t}; background-image: -webkit-image-set(${e}); background-image: image-set(${e})`)}_.getAttribute("data-toggle-class")&&_.classList.toggle(_.getAttribute("data-toggle-class"))},loaded(){}};function Z$(_){_.setAttribute("data-loaded",!0)}function OT(_){_.getAttribute("data-placeholder-background")&&(_.style.background=_.getAttribute("data-placeholder-background"))}const _e=_=>_.getAttribute("data-loaded")==="true",HT=(_,$)=>(e,t)=>{e.forEach(n=>{(n.intersectionRatio>0||n.isIntersecting)&&(t.unobserve(n.target),_e(n.target)||(_(n.target),Z$(n.target),$(n.target)))})},Ln=(_,$=document)=>_ instanceof Element?[_]:_ instanceof NodeList?_:$.querySelectorAll(_);function MT(_=".lozad",$={}){const{root:e,rootMargin:t,threshold:n,load:r,loaded:i}=Object.assign({},mT,$);let T;typeof window<"u"&&window.IntersectionObserver&&(T=new IntersectionObserver(HT(r,i),{root:e,rootMargin:t,threshold:n}));const o=Ln(_,e);for(let s=0;s<o.length;s++)OT(o[s]);return{observe(){const s=Ln(_,e);for(let I=0;I<s.length;I++)if(!_e(s[I])){if(T){T.observe(s[I]);continue}r(s[I]),Z$(s[I]),i(s[I])}},triggerLoad(s){_e(s)||(r(s),Z$(s),i(s))},observer:T}}function PT(_){return _&&_.__esModule&&Object.prototype.hasOwnProperty.call(_,"default")?_.default:_}var t$={exports:{}},$e,sn;function N_(){return sn||(sn=1,$e=function(_,$,e){return _ instanceof HTMLCollection||_ instanceof NodeList||_ instanceof Array?Array.prototype.forEach.call(_,$,e):$.call(e,_)}),$e}var ee,En;function xT(){return En||(En=1,ee=function(_){var $=_.text||_.textContent||_.innerHTML||"",e=_.src||"",t=_.parentNode||document.querySelector("head")||document.documentElement,n=document.createElement("script");if($.match("document.write"))return console&&console.log&&console.log("Script contains document.write. Can’t be executed correctly. Code skipped ",_),!1;if(n.type="text/javascript",n.id=_.id,e!==""&&(n.src=e,n.async=!1),$!=="")try{n.appendChild(document.createTextNode($))}catch{n.text=$}return t.appendChild(n),(t instanceof HTMLHeadElement||t instanceof HTMLBodyElement)&&t.contains(n)&&t.removeChild(n),!0}),ee}var te,An;function WT(){if(An)return te;An=1;var _=N_(),$=xT();return te=function(e){e.tagName.toLowerCase()==="script"&&$(e),_(e.querySelectorAll("script"),function(t){(!t.type||t.type.toLowerCase()==="text/javascript")&&(t.parentNode&&t.parentNode.removeChild(t),$(t))})},te}var ne,In;function n$(){if(In)return ne;In=1;var _=N_();return ne=function($,e,t,n){e=typeof e=="string"?e.split(" "):e,e.forEach(function(r){_($,function(i){i.addEventListener(r,t,n)})})},ne}var re,ln;function ie(){if(ln)return re;ln=1;var _=n$();return re={outerHTML:function($,e){$.outerHTML=e.outerHTML,this.onSwitch()},innerHTML:function($,e){$.innerHTML=e.innerHTML,e.className===""?$.removeAttribute("class"):$.className=e.className,this.onSwitch()},switchElementsAlt:function($,e){if($.innerHTML=e.innerHTML,e.hasAttributes())for(var t=e.attributes,n=0;n<t.length;n++)$.attributes.setNamedItem(t[n].cloneNode());this.onSwitch()},replaceNode:function($,e){$.parentNode.replaceChild(e,$),this.onSwitch()},sideBySide:function($,e,t,n){var r=Array.prototype.forEach,i=[],T=[],o=document.createDocumentFragment(),s="animationend webkitAnimationEnd MSAnimationEnd oanimationend",I=0,R=(function(d){d.target===d.currentTarget&&(I--,I<=0&&i&&(i.forEach(function(g){g.parentNode&&g.parentNode.removeChild(g)}),T.forEach(function(g){g.className=g.className.replace(g.getAttribute("data-pjax-classes"),""),g.removeAttribute("data-pjax-classes")}),T=null,i=null,this.onSwitch()))}).bind(this);n=n||{},r.call($.childNodes,function(d){i.push(d),d.classList&&!d.classList.contains("js-Pjax-remove")&&(d.hasAttribute("data-pjax-classes")&&(d.className=d.className.replace(d.getAttribute("data-pjax-classes"),""),d.removeAttribute("data-pjax-classes")),d.classList.add("js-Pjax-remove"),n.callbacks&&n.callbacks.removeElement&&n.callbacks.removeElement(d),n.classNames&&(d.className+=" "+n.classNames.remove+" "+(t.backward?n.classNames.backward:n.classNames.forward)),I++,_(d,s,R,!0))}),r.call(e.childNodes,function(d){if(d.classList){var g="";n.classNames&&(g=" js-Pjax-add "+n.classNames.add+" "+(t.backward?n.classNames.forward:n.classNames.backward)),n.callbacks&&n.callbacks.addElement&&n.callbacks.addElement(d),d.className+=g,d.setAttribute("data-pjax-classes",g),T.push(d),o.appendChild(d),I++,_(d,s,R,!0)}}),$.className=e.className,$.appendChild(o)}},re}var Te,un;function DT(){if(un)return Te;un=1;var _=ie();Te=function(e){return e=e||{},e.elements=e.elements||"a[href], form[action]",e.selectors=e.selectors||["title",".js-Pjax"],e.switches=e.switches||{},e.switchesOptions=e.switchesOptions||{},e.history=typeof e.history>"u"?!0:e.history,e.analytics=typeof e.analytics=="function"||e.analytics===!1?e.analytics:$,e.scrollTo=typeof e.scrollTo>"u"?0:e.scrollTo,e.scrollRestoration=typeof e.scrollRestoration<"u"?e.scrollRestoration:!0,e.cacheBust=typeof e.cacheBust>"u"?!0:e.cacheBust,e.debug=e.debug||!1,e.timeout=e.timeout||0,e.currentUrlFullReload=typeof e.currentUrlFullReload>"u"?!1:e.currentUrlFullReload,e.switches.head||(e.switches.head=_.switchElementsAlt),e.switches.body||(e.switches.body=_.switchElementsAlt),e};function $(){window._gaq&&_gaq.push(["_trackPageview"]),window.ga&&ga("send","pageview",{page:location.pathname,title:document.title})}return Te}var ae,cn;function fn(){return cn||(cn=1,ae=(function(){var _=0;return function(){var $="pjax"+new Date().getTime()+"_"+_;return _++,$}})()),ae}var oe,Rn;function dn(){if(Rn)return oe;Rn=1;var _=N_();return oe=function($,e,t){e=typeof e=="string"?e.split(" "):e,e.forEach(function(n){var r;r=document.createEvent("HTMLEvents"),r.initEvent(n,!0,!0),r.eventName=n,t&&Object.keys(t).forEach(function(i){r[i]=t[i]}),_($,function(i){var T=!1;!i.parentNode&&i!==document&&i!==window&&(T=!0,document.body.appendChild(i)),i.dispatchEvent(r),T&&i.parentNode.removeChild(i)})})},oe}var Le,hn;function r$(){return hn||(hn=1,Le=function(_){if(_===null||typeof _!="object")return _;var $=_.constructor();for(var e in _)_.hasOwnProperty(e)&&($[e]=_[e]);return $}),Le}var se,Nn;function yT(){return Nn||(Nn=1,se=function($,e,t){for(var n=0;n<e.length;n++)for(var r=$.querySelectorAll(e[n]),i=0;i<r.length;i++)if(r[i].contains(t))return!0;return!1}),se}var Ee,Sn;function UT(){return Sn||(Sn=1,Ee=function(_){if(_==null)return null;for(var $=Object(_),e=1;e<arguments.length;e++){var t=arguments[e];if(t!=null)for(var n in t)Object.prototype.hasOwnProperty.call(t,n)&&($[n]=t[n])}return $}),Ee}var Ae,Cn;function pn(){return Cn||(Cn=1,Ae=function(){}),Ae}var Ie,gn;function vT(){return gn||(gn=1,Ie=function(){this.options.debug&&console&&(typeof console.log=="function"?console.log.apply(console,arguments):console.log&&console.log(arguments))}),Ie}var le,mn;function wT(){if(mn)return le;mn=1;var _="data-pjax-state";return le=function($){switch($.tagName.toLowerCase()){case"a":$.hasAttribute(_)||this.attachLink($);break;case"form":$.hasAttribute(_)||this.attachForm($);break;default:throw"Pjax can only be applied on <a> or <form> submit"}},le}var ue,On;function bT(){if(On)return ue;On=1;var _=n$(),$=r$(),e="data-pjax-state",t=function(i,T){if(!r(T)){var o=$(this.options),s=n(i,T);if(s){i.setAttribute(e,s);return}if(T.preventDefault(),this.options.currentUrlFullReload&&i.href===window.location.href.split("#")[0]){i.setAttribute(e,"reload"),this.reload();return}i.setAttribute(e,"load"),o.triggerElement=i,this.loadUrl(i.href,o)}};function n(i,T){if(T.which>1||T.metaKey||T.ctrlKey||T.shiftKey||T.altKey)return"modifier";if(i.protocol!==window.location.protocol||i.host!==window.location.host)return"external";if(i.hash&&i.href.replace(i.hash,"")===window.location.href.replace(location.hash,""))return"anchor";if(i.href===window.location.href.split("#")[0]+"#")return"anchor-empty"}var r=function(i){return i.defaultPrevented||i.returnValue===!1};return ue=function(i){var T=this;i.setAttribute(e,""),_(i,"click",function(o){t.call(T,i,o)}),_(i,"keyup",(function(o){o.keyCode===13&&t.call(T,i,o)}).bind(this))},ue}var ce,Hn;function GT(){if(Hn)return ce;Hn=1;var _=n$(),$=r$(),e="data-pjax-state",t=function(T,o){if(!i(o)){var s=$(this.options);s.requestOptions={requestUrl:T.getAttribute("action")||window.location.href,requestMethod:T.getAttribute("method")||"GET"};var I=document.createElement("a");I.setAttribute("href",s.requestOptions.requestUrl);var R=r(I,s);if(R){T.setAttribute(e,R);return}o.preventDefault(),T.enctype==="multipart/form-data"?s.requestOptions.formData=new FormData(T):s.requestOptions.requestParams=n(T),T.setAttribute(e,"submit"),s.triggerElement=T,this.loadUrl(I.href,s)}};function n(T){for(var o=[],s=T.elements,I=0;I<s.length;I++){var R=s[I],d=R.tagName.toLowerCase();if(R.name&&R.attributes!==void 0&&d!=="button"){var g=R.attributes.type;if(!g||g.value!=="checkbox"&&g.value!=="radio"||R.checked){var C=[];if(d==="select")for(var S,u=0;u<R.options.length;u++)S=R.options[u],S.selected&&!S.disabled&&C.push(S.hasAttribute("value")?S.value:S.text);else C.push(R.value);for(var M=0;M<C.length;M++)o.push({name:encodeURIComponent(R.name),value:encodeURIComponent(C[M])})}}}return o}function r(T,o){if(T.protocol!==window.location.protocol||T.host!==window.location.host)return"external";if(T.hash&&T.href.replace(T.hash,"")===window.location.href.replace(location.hash,""))return"anchor";if(T.href===window.location.href.split("#")[0]+"#")return"anchor-empty";if(o.currentUrlFullReload&&T.href===window.location.href.split("#")[0])return"reload"}var i=function(T){return T.defaultPrevented||T.returnValue===!1};return ce=function(T){var o=this;T.setAttribute(e,""),_(T,"submit",function(s){t.call(o,T,s)})},ce}var fe,Mn;function FT(){if(Mn)return fe;Mn=1;var _=N_();return fe=function($,e,t,n){n=n||document,$.forEach(function(r){_(n.querySelectorAll(r),e,t)})},fe}var Re,Pn;function BT(){if(Pn)return Re;Pn=1;var _=N_(),$=ie();return Re=function(e,t,n,r,i,T){var o=[];n.forEach(function(s){var I=r.querySelectorAll(s),R=i.querySelectorAll(s);if(this.log&&this.log("Pjax switch",s,I,R),I.length!==R.length)throw"DOM doesn’t look the same on new loaded page: ’"+s+"’ - new "+I.length+", old "+R.length;_(I,function(d,g){var C=R[g];this.log&&this.log("newEl",d,"oldEl",C);var S=e[s]?e[s].bind(this,C,d,T,t[s]):$.outerHTML.bind(this,C,d,T);o.push(S)},this)},this),this.state.numPendingSwitches=o.length,o.forEach(function(s){s()})},Re}var de,xn;function VT(){if(xn)return de;xn=1;var _=pn();return de=function($){$&&$.readyState<4&&($.onreadystatechange=_,$.abort())},de}var he,Wn;function kT(){return Wn||(Wn=1,he=function(_,$,e){var t=new RegExp("([?&])"+$+"=.*?(&|$)","i"),n=_.indexOf("?")!==-1?"&":"?";return _.match(t)?_.replace(t,"$1"+$+"="+e+"$2"):_+n+$+"="+e}),he}var Ne,Dn;function KT(){if(Dn)return Ne;Dn=1;var _=kT();return Ne=function($,e,t){e=e||{};var n,r=e.requestOptions||{},i=(r.requestMethod||"GET").toUpperCase(),T=r.requestParams||null,o=r.formData||null,s=null,I=new XMLHttpRequest,R=e.timeout||0;if(I.onreadystatechange=function(){I.readyState===4&&(I.status===200?t(I.responseText,I,$,e):I.status!==0&&t(null,I,$,e))},I.onerror=function(d){console.log(d),t(null,I,$,e)},I.ontimeout=function(){t(null,I,$,e)},T&&T.length)switch(n=T.map(function(d){return d.name+"="+d.value}).join("&"),i){case"GET":$=$.split("?")[0],$+="?"+n;break;case"POST":s=n;break}else o&&(s=o);return e.cacheBust&&($=_($,"t",Date.now())),I.open(i,$,!0),I.timeout=R,I.setRequestHeader("X-Requested-With","XMLHttpRequest"),I.setRequestHeader("X-PJAX","true"),I.setRequestHeader("X-PJAX-Selectors",JSON.stringify(e.selectors)),s&&i==="POST"&&!o&&I.setRequestHeader("Content-Type","application/x-www-form-urlencoded"),I.send(s),I},Ne}var Se,yn;function XT(){if(yn)return Se;yn=1;var _=r$(),$=fn(),e=dn();return Se=function(t,n,r,i){if(i=_(i||this.options),i.request=n,t===!1){e(document,"pjax:complete pjax:error",i);return}var T=window.history.state||{};window.history.replaceState({url:T.url||window.location.href,title:T.title||document.title,uid:T.uid||$(),scrollPos:[document.documentElement.scrollLeft||document.body.scrollLeft,document.documentElement.scrollTop||document.body.scrollTop]},document.title,window.location.href);var o=r;n.responseURL?r!==n.responseURL&&(r=n.responseURL):n.getResponseHeader("X-PJAX-URL")?r=n.getResponseHeader("X-PJAX-URL"):n.getResponseHeader("X-XHR-Redirected-To")&&(r=n.getResponseHeader("X-XHR-Redirected-To"));var s=document.createElement("a");s.href=o;var I=s.hash;s.href=r,I&&!s.hash&&(s.hash=I,r=s.href),this.state.href=r,this.state.options=i;try{this.loadContent(t,i)}catch(R){if(e(document,"pjax:error",i),this.options.debug)throw R;return console&&console.error&&console.error("Pjax switch fail: ",R),this.latestChance(r)}},Se}var Ce,Un;function YT(){return Un||(Un=1,Ce=function(){return window.history&&window.history.pushState&&window.history.replaceState&&!navigator.userAgent.match(/((iPod|iPhone|iPad).+\bOS\s+[1-4]\D|WebApps\/.+CFNetwork)/)}),Ce}var vn;function jT(){if(vn)return t$.exports;vn=1;var _=WT(),$=N_(),e=DT(),t=ie(),n=fn(),r=n$(),i=dn(),T=r$(),o=yT(),s=UT(),I=pn(),R=function(C){this.state={numPendingSwitches:0,href:null,options:null},this.options=e(C),this.log("Pjax options",this.options),this.options.scrollRestoration&&"scrollRestoration"in history&&(history.scrollRestoration="manual"),this.maxUid=this.lastUid=n(),this.parseDOM(document),r(window,"popstate",(function(S){if(S.state){var u=T(this.options);u.url=S.state.url,u.title=S.state.title,u.history=!1,u.scrollPos=S.state.scrollPos,S.state.uid<this.lastUid?u.backward=!0:u.forward=!0,this.lastUid=S.state.uid,this.loadUrl(S.state.url,u)}}).bind(this))};if(R.switches=t,R.prototype={log:vT(),getElements:function(C){return C.querySelectorAll(this.options.elements)},parseDOM:function(C){var S=wT();$(this.getElements(C),S,this)},refresh:function(C){this.parseDOM(C||document)},reload:function(){window.location.reload()},attachLink:bT(),attachForm:GT(),forEachSelectors:function(C,S,u){return FT().bind(this)(this.options.selectors,C,S,u)},switchSelectors:function(C,S,u,M){return BT().bind(this)(this.options.switches,this.options.switchesOptions,C,S,u,M)},latestChance:function(C){window.location=C},onSwitch:function(){i(window,"resize scroll"),this.state.numPendingSwitches--,this.state.numPendingSwitches===0&&this.afterAllSwitches()},loadContent:function(C,S){if(typeof C!="string"){i(document,"pjax:complete pjax:error",S);return}var u=document.implementation.createHTMLDocument("pjax"),M=/<html[^>]+>/gi,W=/\s?[a-z:]+(?:=['"][^'">]+['"])*/gi,P=C.match(M);if(P&&P.length&&(P=P[0].match(W),P.length&&(P.shift(),P.forEach(function(U){var G=U.trim().split("=");G.length===1?u.documentElement.setAttribute(G[0],!0):u.documentElement.setAttribute(G[0],G[1].slice(1,-1))}))),u.documentElement.innerHTML=C,this.log("load content",u.documentElement.attributes,u.documentElement.innerHTML.length),document.activeElement&&o(document,this.options.selectors,document.activeElement))try{document.activeElement.blur()}catch{}this.switchSelectors(this.options.selectors,u,document,S)},abortRequest:VT(),doRequest:KT(),handleResponse:XT(),loadUrl:function(C,S){S=typeof S=="object"?s({},this.options,S):T(this.options),this.log("load href",C,S),this.abortRequest(this.request),i(document,"pjax:send",S),this.request=this.doRequest(C,S,this.handleResponse.bind(this))},afterAllSwitches:function(){var C=Array.prototype.slice.call(document.querySelectorAll("[autofocus]")).pop();C&&document.activeElement!==C&&C.focus(),this.options.selectors.forEach(function(U){$(document.querySelectorAll(U),function(G){_(G)})});var S=this.state;if(S.options.history&&(window.history.state||(this.lastUid=this.maxUid=n(),window.history.replaceState({url:window.location.href,title:document.title,uid:this.maxUid,scrollPos:[0,0]},document.title)),this.lastUid=this.maxUid=n(),window.history.pushState({url:S.href,title:S.options.title,uid:this.maxUid,scrollPos:[0,0]},S.options.title,S.href)),this.forEachSelectors(function(U){this.parseDOM(U)},this),i(document,"pjax:complete pjax:success",S.options),typeof S.options.analytics=="function"&&S.options.analytics(),S.options.history){var u=document.createElement("a");if(u.href=this.state.href,u.hash){var M=u.hash.slice(1);M=decodeURIComponent(M);var W=0,P=document.getElementById(M)||document.getElementsByName(M)[0];if(P&&P.offsetParent)do W+=P.offsetTop,P=P.offsetParent;while(P);window.scrollTo(0,W)}else S.options.scrollTo!==!1&&(S.options.scrollTo.length>1?window.scrollTo(S.options.scrollTo[0],S.options.scrollTo[1]):window.scrollTo(0,S.options.scrollTo))}else S.options.scrollRestoration&&S.options.scrollPos&&window.scrollTo(S.options.scrollPos[0],S.options.scrollPos[1]);this.state={numPendingSwitches:0,href:null,options:null}}},R.isSupported=YT(),R.isSupported())t$.exports=R;else{var d=I;for(var g in R.prototype)R.prototype.hasOwnProperty(g)&&typeof R.prototype[g]=="function"&&(d[g]=I);t$.exports=d}return t$.exports}var qT=jT();const zT=PT(qT);let pe=null;const QT=["/login","/logout","/password-reset","/signup"];function JT(_){pe=_}function ZT(_){return _.origin!==window.location.origin||_.protocol!==window.location.protocol?!0:QT.some($=>_.pathname===$||_.pathname.startsWith(`${$}/`))}function v_(_){const $=new URL(_,window.location.origin);if(ZT($)||!pe){window.location.assign($.toString());return}pe.loadUrl(`${$.pathname}${$.search}${$.hash}`)}const _a="halo-page-data";let wn=[];function S_(_){return Array.isArray(_)?_:[]}function $a(_){switch(_){case"index":case"categories":case"category":case"tags":case"tag":case"post":return _;default:return"unknown"}}function bn(_,$){const e=_[0],t=e?.status?.permalink,n=e?.spec?.slug??e?.metadata?.name;if(!t||!n)return $;const r=t.endsWith("/")?t.slice(0,-1):t;return r.endsWith(`/${n}`)?r.slice(0,r.length-n.length-1):$}function ea(){const _=document.getElementById(_a);if(!(_ instanceof HTMLScriptElement))return null;const $=_.textContent?.trim();if(!$)return null;try{return JSON.parse($)}catch(e){return console.error("[Theme] Failed to parse halo page data.",e),null}}function ge(_){return!_||!_.displayName&&!_.permalink&&!_.slug&&!_.title?null:_}function Gn(){const _=ea();if(!_){window.haloData=void 0;return}const $=$a(_.pageType);if($==="index"){const t=S_(_.currentPosts);t.length>0&&(wn=t)}const e={categories:S_(_.categories),currentCategory:ge(_.currentCategory),currentPost:ge(_.currentPost),currentPosts:S_(_.currentPosts),currentTag:ge(_.currentTag),homePosts:wn,nextPost:_.nextPost??null,pageType:$,pagination:_.pagination,prevPost:_.prevPost??null,tags:S_(_.tags),urls:{archives:"/archives",categories:bn(S_(_.categories),"/categories"),home:"/",tags:bn(S_(_.tags),"/tags")},user:typeof _.user=="string"?_.user:"guest"};return window.haloData=e,e}function Fn(){document.querySelectorAll('ul[data-type="taskList"] li[data-type="taskItem"]').forEach(_=>{const $=_.querySelector("label");!$||$.dataset.boundTaskList==="true"||($.dataset.boundTaskList="true",$.addEventListener("click",e=>{e.preventDefault();const t=$.closest('li[data-type="taskItem"]');if(!t)return;const n=t.getAttribute("data-checked")==="true";t.setAttribute("data-checked",n?"false":"true");const r=t.querySelector('input[type="checkbox"]');r&&(r.checked=!n)}))})}let me=null;function ta(){me=MT(".lozad",{loaded:_=>{_.classList.add("loaded")}}),me.observe()}function na(){const _=new zT({analytics:!1,cacheBust:!1,elements:'a[href]:not([target="_blank"]):not([data-pjax="false"]):not([href^="javascript:"]):not([href^="/login"]):not([href^="/signup"]):not([href^="/password-reset"]):not([href^="/logout"])',scrollRestoration:!1,selectors:["title","#main"]});JT(_)}function ra(){document.addEventListener("pjax:send",()=>{const _=document.getElementById("main");_&&_.classList.add("loading")}),document.addEventListener("pjax:complete",()=>{const _=document.getElementById("main");Gn(),_&&(_.classList.remove("loading"),$_.initTree(_),me?.observe(),_.scrollTo({top:0})),Fn()}),document.addEventListener("pjax:error",()=>{console.error("[Theme] Pjax navigation failed.")})}function ia(){Gn(),window.Alpine=$_,$_.start(),ta(),na(),ra(),Fn()}function Ta(){$_.data("asciiTitle",(_="",$="Standard")=>({asciiArt:"",font:$,init(){this.title&&ye.text(this.title,{font:this.font||"Standard",horizontalLayout:"default",verticalLayout:"default"},(e,t)=>{!e&&t&&(this.asciiArt=t)})},title:_}))}function aa(){$_.data("fileListNav",()=>({focusInHandler:null,items:[],keydownHandler:null,selectedIndex:-1,destroy(){this.keydownHandler&&window.removeEventListener("keydown",this.keydownHandler),this.focusInHandler&&window.removeEventListener("focusin",this.focusInHandler)},handleFocusIn(_){const $=_.target;$&&($.tagName==="INPUT"||$.tagName==="TEXTAREA")&&(this.selectedIndex=-1)},handleKeydown(_){const $=_.target;if(!$||$.tagName==="INPUT"||$.tagName==="TEXTAREA"||this.items.length===0)return;if(_.key==="ArrowDown"){_.preventDefault(),this.selectedIndex=(this.selectedIndex+1)%this.items.length,this.scrollToSelected();return}if(_.key==="ArrowUp"){_.preventDefault(),this.selectedIndex=(this.selectedIndex-1+this.items.length)%this.items.length,this.scrollToSelected();return}if(_.key!=="Enter"||(_.preventDefault(),this.selectedIndex<0||this.selectedIndex>=this.items.length))return;const e=this.items[this.selectedIndex],t=e instanceof HTMLAnchorElement?e:e.querySelector("a");t?.href&&v_(t.href)},init(){this.items=Array.from(this.$el.querySelectorAll("[data-nav-item]")),this.items.length>0&&(this.selectedIndex=0),this.keydownHandler=_=>this.handleKeydown(_),this.focusInHandler=_=>this.handleFocusIn(_),window.addEventListener("keydown",this.keydownHandler),window.addEventListener("focusin",this.focusInHandler)},scrollToSelected(){const _=this.items[this.selectedIndex];_&&_.scrollIntoView({behavior:"smooth",block:"nearest"})}}))}function oa(){$_.data("postViewer",()=>({handleKeydown(_){const $=_.target;if(!$||$.tagName==="INPUT"||$.tagName==="TEXTAREA")return;const e=document.getElementById("main");if(e)switch(_.key){case"ArrowDown":case"j":_.preventDefault(),e.scrollBy({behavior:"smooth",top:this.scrollAmount});break;case"ArrowUp":case"k":_.preventDefault(),e.scrollBy({behavior:"smooth",top:-this.scrollAmount});break;case" ":case"PageDown":_.preventDefault(),e.scrollBy({behavior:"smooth",top:e.clientHeight*.8});break;case"End":_.preventDefault(),e.scrollTo({behavior:"smooth",top:e.scrollHeight});break;case"Home":_.preventDefault(),e.scrollTo({behavior:"smooth",top:0});break;case"PageUp":_.preventDefault(),e.scrollBy({behavior:"smooth",top:-e.clientHeight*.8});break}},init(){},scrollAmount:100}))}function Oe(_){return _.spec?.displayName||_.spec?.slug||_.metadata?.name||"unknown"}function C_(_){return _.spec?.slug||_.metadata?.name||Oe(_)}function Bn(_){return _.spec?.title||_.spec?.slug||_.metadata?.name||"untitled"}function La(_){return _.spec?.slug||_.metadata?.name||Bn(_)}function sa(_){return(_||"unknown").replaceAll("/","-")}function w_(_){return sa(_?.slug||_?.title||_?.displayName||"unknown")}function Ea(){return window.haloData?.user||"user"}function He(_){return _.map($=>({date:$.spec?.publishTime||$.metadata?.creationTimestamp||null,name:Bn($),permalink:$.status?.permalink||null,slug:La($),type:"file"}))}function i$(_){if(_==="~/blog")return[{count:window.haloData?.categories.length||0,name:"categories",type:"dir"},{count:window.haloData?.tags.length||0,name:"tags",type:"dir"},...He(window.haloData?.homePosts||[])];if(_==="~/blog/categories")return(window.haloData?.categories||[]).map($=>({count:$.postCount||0,date:$.metadata?.creationTimestamp||null,name:Oe($),permalink:$.status?.permalink||null,slug:C_($),type:"dir"}));if(_==="~/blog/tags")return(window.haloData?.tags||[]).map($=>({count:$.postCount||0,date:$.metadata?.creationTimestamp||null,name:Oe($),permalink:$.status?.permalink||null,slug:C_($),type:"dir"}));if(_.startsWith("~/blog/categories/")){const $=_.slice(18),e=w_(window.haloData?.currentCategory);return window.haloData?.pageType==="category"&&e===$?He(window.haloData.currentPosts):(window.haloData?.categories||[]).find(n=>C_(n)===$)?[]:null}if(_.startsWith("~/blog/tags/")){const $=_.slice(12),e=w_(window.haloData?.currentTag);return window.haloData?.pageType==="tag"&&e===$?He(window.haloData.currentPosts):(window.haloData?.tags||[]).find(n=>C_(n)===$)?[]:null}return null}function Vn(_){let $=_;$==="~"?$="~/blog":$.startsWith("~/")&&!$.startsWith("~/blog")&&($=`~/blog${$.slice(1)}`),$.startsWith("~/blog")||($=$.startsWith("/")?`~/blog${$}`:`~/blog/${$}`);const e=[];return $.split("/").forEach(t=>{if(!(!t||t===".")){if(t===".."){e.length>2&&e.pop();return}e.push(t)}}),e.length<2?"~/blog":e.join("/")}function Me(_,$){if(_.startsWith("/")||_.startsWith("~"))return Vn(_);const e=$.endsWith("/")?$:`${$}/`;return Vn(`${e}${_}`)}function kn(_){if(_==="~/blog")return"~/blog";const $=_.split("/");return $.pop(),$.length<2?"~/blog":$.join("/")}function Kn(_){if(_==="~/blog")return window.haloData?.urls.home||"/";if(_==="~/blog/categories")return window.haloData?.urls.categories||"/categories";if(_==="~/blog/tags")return window.haloData?.urls.tags||"/tags";if(_.startsWith("~/blog/categories/")){const $=_.slice(18);return(window.haloData?.categories||[]).find(t=>C_(t)===$)?.status?.permalink||null}if(_.startsWith("~/blog/tags/")){const $=_.slice(12);return(window.haloData?.tags||[]).find(t=>C_(t)===$)?.status?.permalink||null}return null}function Pe(){switch(window.haloData?.pageType){case"categories":return"~/blog/categories";case"category":return`~/blog/categories/${w_(window.haloData.currentCategory)}`;case"post":return`~/blog/${w_(window.haloData.currentPost)}`;case"tag":return`~/blog/tags/${w_(window.haloData.currentTag)}`;case"tags":return"~/blog/tags";default:return"~/blog"}}const Aa=`
List Page Commands:
  ls            - List directory contents
  cd <path>     - Navigate to path
  pd / npage    - Next page
  pu / ppage    - Previous page
  back          - Browser back
  help          - Show this help
  clear         - Clear output

Navigation:
  ↑/↓           - Command history
  Tab           - Auto-complete
  Enter         - Execute
`.trim(),Ia=`
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
`.trim();function la(_,$){if(!_||_===".")return{};if(_===".."||_==="../"){const o=kn($),s=Kn(o);return s?{navigate:s}:{newPath:o}}const e=Me(_,$);if(i$(e)!==null){const o=Kn(e);return o?{navigate:o}:{newPath:e}}const n=kn(e),r=e.slice(e.lastIndexOf("/")+1),T=i$(n)?.find(o=>(o.name===r||o.slug===r)&&o.permalink);return T?.permalink?{navigate:T.permalink}:{output:`bash: cd: ${_}: No such file or directory`}}function ua(_,$){const e=_?Me(_,$):$,t=i$(e);if(t===null)return`ls: ${_}: No such file or directory`;if(t.length===0)return _&&e!==$?"Directory is empty.":"Total 0";const n=t.map(r=>{const i=r.date||new Date().toISOString().slice(0,10),T=r.type==="dir"?"drwxr-xr-x":"-rw-r--r--",o=r.count?String(r.count).padStart(3):"  1",s=r.type==="dir"?"/":"";return`${T}  ${o} ${Ea()}  staff  ${i}  ${r.name}${s}`});return`Total ${t.length}
${n.join(`
`)}`}function Xn(_){const $=_==="next"?window.haloData?.nextPost:window.haloData?.prevPost;return $?(v_($),null):_==="next"?"No next article available.":"No previous article available."}function Yn(_){const $=window.haloData?.pagination;if(!$)return"Pagination not available on this page.";const e=_?$.nextUrl:$.prevUrl;return e?(v_(e),null):_?"Already at the last page.":"Already at the first page."}function ca(_,$,e){const t=_.toLowerCase();if(!_.includes(" ")){const C=e?["cd","next","prev","back","help","clear"]:["cd","ls","ll","pd","pu","npage","ppage","back","help","clear"],S=["help","clear","back","next","prev","pd","pu","npage","ppage","ls","ll"];return C.filter(u=>u.startsWith(t)).map(u=>S.includes(u)?u:`${u} `)}const n=_.indexOf(" "),r=_.slice(0,n).toLowerCase(),i=_.slice(n+1),T=i.toLowerCase();if(!["cd","ls","ll"].includes(r))return[];const o=[];let s="",I=T;const R=i.lastIndexOf("/");R!==-1&&(s=i.slice(0,R+1),I=i.slice(R+1).toLowerCase());const d=Me(s||".",$);return i$(d)?.forEach(C=>{if(!C.name.toLowerCase().startsWith(I))return;const S=C.type==="dir"?"/":"";o.push(`${r} ${s}${C.name}${S}`)}),!s&&"..".startsWith(I)&&o.push(`${r} ../`),!s&&"~".startsWith(I)&&o.push(`${r} ~/`),o}function fa(){$_.data("terminalInput",(_="~/blog")=>({command:"",completionState:{candidates:[],index:0},currentPath:_,history:[],historyIndex:-1,output:"",showHelp:!1,autoComplete(){const $=this.command,e=this.completionState.candidates[this.completionState.index];this.completionState.candidates.length>0&&$===e?this.completionState.index=(this.completionState.index+1)%this.completionState.candidates.length:(this.completionState.candidates=ca($,String(this.currentPath),this.isPostPage()),this.completionState.index=0),this.completionState.candidates.length>0&&(this.command=this.completionState.candidates[this.completionState.index])},async executeCommand(){const $=this.command.trim();if(!$)return;this.history[this.history.length-1]!==$&&this.history.push($),this.historyIndex=this.history.length;const[e,...t]=$.split(/\s+/),n=t.join(" ");switch(this.showHelp=!1,this.output="",e.toLowerCase()){case"back":window.history.back();break;case"cd":this.applyCdResult(la(n,String(this.currentPath)));break;case"clear":break;case"help":this.showHelp=!0;break;case"ll":case"ls":this.output="Loading...",await new Promise(r=>window.setTimeout(r,50)),this.output=ua(n,String(this.currentPath));break;case"next":this.output=Xn("next")||"";break;case"npage":case"pd":this.output=Yn(!0)||"";break;case"ppage":case"pu":this.output=Yn(!1)||"";break;case"prev":this.output=Xn("prev")||"";break;case"search":if(!n){this.output="Usage: search <keyword>";break}v_(`/search?keyword=${encodeURIComponent(n)}`);break;default:this.output=`bash: ${e}: command not found. Type 'help' for available commands.`}this.command=""},applyCdResult($){$.navigate?v_($.navigate):$.newPath?(this.currentPath=$.newPath,this.output=""):$.output&&(this.output=$.output)},get helpText(){return this.isPostPage()?Ia:Aa},handleKeydown($){if(!$.isComposing)switch($.key){case"ArrowDown":$.preventDefault(),this.navigateHistory(1);break;case"ArrowUp":$.preventDefault(),this.navigateHistory(-1);break;case"Enter":$.preventDefault(),this.executeCommand();break;case"Escape":$.preventDefault(),this.command="",this.output="",this.showHelp=!1,this.$refs.cmdInput?.blur();break;case"Tab":$.preventDefault(),this.autoComplete();break}},init(){this.currentPath=Pe(),document.addEventListener("pjax:complete",()=>{this.currentPath=Pe()}),window.addEventListener("popstate",()=>{this.currentPath=Pe()}),this.$nextTick(()=>{this.$refs.cmdInput?.focus()})},isPostPage(){return window.haloData?.pageType==="post"},navigateHistory($){if(this.history.length!==0){if(this.historyIndex+=$,this.historyIndex<0&&(this.historyIndex=0),this.historyIndex>=this.history.length){this.historyIndex=this.history.length,this.command="";return}this.command=this.history[this.historyIndex]}}}))}function Ra(){$_.data("typewriter",(_="",$=50)=>({display:"",init(){let e=0;this.display="";const t=typeof $=="number"?$:50,n=window.setInterval(()=>{if(e<this.text.length){this.display+=this.text.charAt(e),e+=1;return}window.clearInterval(n)},t)},text:_}))}sr(),Ta(),Ra(),fa(),aa(),oa(),ia()})();
