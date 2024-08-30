import{j as le,E as ce,i as p,h as U,m as q,a9 as y,aa as W,v as C,a as de,p as A,ab as H,ac as J,q as me}from"./utils-CXbrStuA.js";var he=Object.defineProperty,ue=Object.defineProperties,pe=Object.getOwnPropertyDescriptors,E=Object.getOwnPropertySymbols,Q=Object.prototype.hasOwnProperty,X=Object.prototype.propertyIsEnumerable,Z=(e,t,s)=>t in e?he(e,t,{enumerable:!0,configurable:!0,writable:!0,value:s}):e[t]=s,x=(e,t)=>{for(var s in t||(t={}))Q.call(t,s)&&Z(e,s,t[s]);if(E)for(var s of E(t))X.call(t,s)&&Z(e,s,t[s]);return e},I=(e,t)=>ue(e,pe(t)),O=(e,t)=>{var s={};for(var r in e)Q.call(e,r)&&t.indexOf(r)<0&&(s[r]=e[r]);if(e!=null&&E)for(var r of E(e))t.indexOf(r)<0&&X.call(e,r)&&(s[r]=e[r]);return s};function $e(...e){return le(...e)}var ge=ce(),k=ge;function F(e,t){me(e)?e.push(...t||[]):C(e)&&Object.assign(e,t)}function fe(e){return C(e)&&e.hasOwnProperty("value")&&e.hasOwnProperty("type")?e.value:e}function G(e,t=""){return["opacity","z-index","line-height","font-weight","flex","flex-grow","flex-shrink","order"].some(r=>t.endsWith(r))?e:`${e}`.trim().split(" ").map(n=>J(n)?`${n}px`:n).join(" ")}function _e(e){return e.replaceAll(/ /g,"").replace(/[^\w]/g,"-")}function B(e="",t=""){return _e(`${A(e,!1)&&A(t,!1)?`${e}-`:e}${t}`)}function Y(e="",t=""){return`--${B(e,t)}`}function M(e,t="",s="",r=[],a){if(A(e)){const n=/{([^}]*)}/g,c=e.trim();if(y(c,n)){const o=c.replaceAll(n,i=>{const h=i.replace(/{|}/g,"").split(".").filter(_=>!r.some(u=>y(_,u)));return`var(${Y(s,H(h.join("-")))}${p(a)?`, ${a}`:""})`}),l=/(\d+\s+[\+\-\*\/]\s+\d+)/g,d=/var\([^)]+\)/g;return y(o.replace(d,"0"),l)?`calc(${o})`:o}return G(c,t)}else if(J(e))return G(e,t)}function ve(e,t,s){A(t,!1)&&e.push(`${t}:${s};`)}function R(e,t){return e?`${e}{${t}}`:""}var ke=(...e)=>ye(z.getTheme(),...e),ye=(e={},t,s,r="variable")=>{if(t){const{variable:a,options:n}=z.defaults||{},{prefix:c,transform:o}=(e==null?void 0:e.options)||n||{},d=y(t,/{([^}]*)}/g)?t:`{${t}}`;return r==="value"||o==="strict"?z.getTokenValue(t):M(d,void 0,c,[a.excludedKeyRegex],s)}return""};function Se(e,t={}){const s=z.defaults.variable,{prefix:r=s.prefix,selector:a=s.selector,excludedKeyRegex:n=s.excludedKeyRegex}=t,c=(d,i="")=>Object.entries(d).reduce((m,[h,_])=>{const u=y(h,n)?B(i):B(i,H(h)),g=fe(_);if(C(g)){const{variables:S,tokens:v}=c(g,u);F(m.tokens,v),F(m.variables,S)}else m.tokens.push((r?u.replace(`${r}-`,""):u).replaceAll("-",".")),ve(m.variables,Y(u),M(g,u,r,[n]));return m},{variables:[],tokens:[]}),{variables:o,tokens:l}=c(e,r);return{value:o,tokens:l,declarations:o.join(""),css:R(a,o.join(""))}}var f={regex:{rules:{class:{pattern:/^\.([a-zA-Z][\w-]*)$/,resolve(e){return{type:"class",selector:e,matched:this.pattern.test(e.trim())}}},attr:{pattern:/^\[(.*)\]$/,resolve(e){return{type:"attr",selector:`:root${e}`,matched:this.pattern.test(e.trim())}}},media:{pattern:/^@media (.*)$/,resolve(e){return{type:"media",selector:`${e}{:root{[CSS]}}`,matched:this.pattern.test(e.trim())}}},system:{pattern:/^system$/,resolve(e){return{type:"system",selector:"@media (prefers-color-scheme: dark){:root{[CSS]}}",matched:this.pattern.test(e.trim())}}},custom:{resolve(e){return{type:"custom",selector:e,matched:!0}}}},resolve(e){const t=Object.keys(this.rules).filter(s=>s!=="custom").map(s=>this.rules[s]);return[e].flat().map(s=>{var r;return(r=t.map(a=>a.resolve(s)).find(a=>a.matched))!=null?r:this.rules.custom.resolve(s)})}},_toVariables(e,t){return Se(e,{prefix:t==null?void 0:t.prefix})},getCommon({name:e="",theme:t={},params:s,set:r,defaults:a}){var n,c,o,l;const{preset:d,options:i}=t;let m,h,_,u;if(p(d)){const{primitive:g,semantic:S}=d,v=S||{},{colorScheme:$}=v,b=O(v,["colorScheme"]),N=$||{},{dark:L}=N,P=O(N,["dark"]),j=p(g)?this._toVariables({primitive:g},i):{},V=p(b)?this._toVariables({semantic:b},i):{},w=p(P)?this._toVariables({light:P},i):{},T=p(L)?this._toVariables({dark:L},i):{},[K,D]=[(n=j.declarations)!=null?n:"",j.tokens],[ee,te]=[(c=V.declarations)!=null?c:"",V.tokens||[]],[se,re]=[(o=w.declarations)!=null?o:"",w.tokens||[]],[ie,ae]=[(l=T.declarations)!=null?l:"",T.tokens||[]];m=this.transformCSS(e,K,"light","variable",i,r,a),h=D;const ne=this.transformCSS(e,`${ee}${se}color-scheme:light`,"light","variable",i,r,a),oe=this.transformCSS(e,`${ie}color-scheme:dark`,"dark","variable",i,r,a);_=`${ne}${oe}`,u=[...new Set([...te,...re,...ae])]}return{primitive:{css:m,tokens:h},semantic:{css:_,tokens:u}}},getPreset({name:e="",preset:t={},options:s,params:r,set:a,defaults:n,selector:c}){var o,l,d;const i=e.replace("-directive",""),m=t,{colorScheme:h}=m,_=O(m,["colorScheme"]),u=h||{},{dark:g}=u,S=O(u,["dark"]),v=p(_)?this._toVariables({[i]:_},s):{},$=p(S)?this._toVariables({[i]:S},s):{},b=p(g)?this._toVariables({[i]:g},s):{},[N,L]=[(o=v.declarations)!=null?o:"",v.tokens||[]],[P,j]=[(l=$.declarations)!=null?l:"",$.tokens||[]],[V,w]=[(d=b.declarations)!=null?d:"",b.tokens||[]],T=[...new Set([...L,...j,...w])],K=this.transformCSS(i,`${N}${P}`,"light","variable",s,a,n,c),D=this.transformCSS(i,V,"dark","variable",s,a,n,c);return{css:`${K}${D}`,tokens:T}},getPresetC({name:e="",theme:t={},params:s,set:r,defaults:a}){var n;const{preset:c,options:o}=t,l=(n=c==null?void 0:c.components)==null?void 0:n[e];return this.getPreset({name:e,preset:l,options:o,params:s,set:r,defaults:a})},getPresetD({name:e="",theme:t={},params:s,set:r,defaults:a}){var n;const c=e.replace("-directive",""),{preset:o,options:l}=t,d=(n=o==null?void 0:o.directives)==null?void 0:n[c];return this.getPreset({name:c,preset:d,options:l,params:s,set:r,defaults:a})},getColorSchemeOption(e,t){var s;return this.regex.resolve((s=e.darkModeSelector)!=null?s:t.options.darkModeSelector)},getLayerOrder(e,t={},s,r){const{cssLayer:a}=t;return a?`@layer ${U(a.order||"primeui",s)}`:""},getCommonStyleSheet({name:e="",theme:t={},params:s,props:r={},set:a,defaults:n}){const c=this.getCommon({name:e,theme:t,params:s,set:a,defaults:n}),o=Object.entries(r).reduce((l,[d,i])=>l.push(`${d}="${i}"`)&&l,[]).join(" ");return Object.entries(c||{}).reduce((l,[d,i])=>{if(i!=null&&i.css){const m=q(i==null?void 0:i.css),h=`${d}-variables`;l.push(`<style type="text/css" data-primevue-style-id="${h}" ${o}>${m}</style>`)}return l},[]).join("")},getStyleSheet({name:e="",theme:t={},params:s,props:r={},set:a,defaults:n}){var c;const o={name:e,theme:t,params:s,set:a,defaults:n},l=(c=e.includes("-directive")?this.getPresetD(o):this.getPresetC(o))==null?void 0:c.css,d=Object.entries(r).reduce((i,[m,h])=>i.push(`${m}="${h}"`)&&i,[]).join(" ");return l?`<style type="text/css" data-primevue-style-id="${e}-variables" ${d}>${q(l)}</style>`:""},createTokens(e={},t,s="",r="",a={}){return Object.entries(e).forEach(([n,c])=>{const o=y(n,t.variable.excludedKeyRegex)?s:s?`${s}.${W(n)}`:W(n),l=r?`${r}.${n}`:n;C(c)?this.createTokens(c,t,o,l,a):(a[o]||(a[o]={paths:[],computed(d,i={}){if(d){const m=this.paths.find(h=>h.scheme===d)||this.paths.find(h=>h.scheme==="none");return m==null?void 0:m.computed(d,i.binding)}return this.paths.map(m=>m.computed(m.scheme,i[m.scheme]))}}),a[o].paths.push({path:l,value:c,scheme:l.includes("colorScheme.light")?"light":l.includes("colorScheme.dark")?"dark":"none",computed(d,i={}){const m=/{([^}]*)}/g;let h=c;if(i.name=this.path,i.binding||(i.binding={}),y(c,m)){const u=c.trim().replaceAll(m,v=>{var $,b;const N=v.replace(/{|}/g,"");return(b=($=a[N])==null?void 0:$.computed(d,i))==null?void 0:b.value}),g=/(\d+\w*\s+[\+\-\*\/]\s+\d+\w*)/g,S=/var\([^)]+\)/g;h=y(u.replace(S,"0"),g)?`calc(${u})`:u}return de(i.binding)&&delete i.binding,{colorScheme:d,path:this.path,paths:i,value:h.includes("undefined")?void 0:h}}}))}),a},getTokenValue(e,t,s){var r;const n=(l=>l.split(".").filter(i=>!y(i.toLowerCase(),s.variable.excludedKeyRegex)).join("."))(t),c=t.includes("colorScheme.light")?"light":t.includes("colorScheme.dark")?"dark":void 0,o=[(r=e[n])==null?void 0:r.computed(c)].flat().filter(l=>l);return o.length===1?o[0].value:o.reduce((l={},d)=>{const i=d,{colorScheme:m}=i,h=O(i,["colorScheme"]);return l[m]=h,l},void 0)},transformCSS(e,t,s,r,a={},n,c,o){if(p(t)){const{cssLayer:l}=a;if(r!=="style"){const d=this.getColorSchemeOption(a,c),i=o?R(o,t):t;t=s==="dark"?d.reduce((m,{selector:h})=>(p(h)&&(m+=h.includes("[CSS]")?h.replace("[CSS]",i):R(h,i)),m),""):R(o??":root",t)}if(l){const d={name:"primeui",order:"primeui"};C(l)&&(d.name=U(l.name,{name:e,type:r})),p(d.name)&&(t=R(`@layer ${d.name}`,t),n==null||n.layerNames(d.name))}return t}return""}},z={defaults:{variable:{prefix:"p",selector:":root",excludedKeyRegex:/^(primitive|semantic|components|directives|variables|colorscheme|light|dark|common|root|states)$/gi},options:{prefix:"p",darkModeSelector:"system",cssLayer:!1}},_theme:void 0,_layerNames:new Set,_loadedStyleNames:new Set,_loadingStyles:new Set,_tokens:{},update(e={}){const{theme:t}=e;t&&(this._theme=I(x({},t),{options:x(x({},this.defaults.options),t.options)}),this._tokens=f.createTokens(this.preset,this.defaults),this.clearLoadedStyleNames())},get theme(){return this._theme},get preset(){var e;return((e=this.theme)==null?void 0:e.preset)||{}},get options(){var e;return((e=this.theme)==null?void 0:e.options)||{}},get tokens(){return this._tokens},getTheme(){return this.theme},setTheme(e){this.update({theme:e}),k.emit("theme:change",e)},getPreset(){return this.preset},setPreset(e){this._theme=I(x({},this.theme),{preset:e}),this._tokens=f.createTokens(e,this.defaults),this.clearLoadedStyleNames(),k.emit("preset:change",e),k.emit("theme:change",this.theme)},getOptions(){return this.options},setOptions(e){this._theme=I(x({},this.theme),{options:e}),this.clearLoadedStyleNames(),k.emit("options:change",e),k.emit("theme:change",this.theme)},getLayerNames(){return[...this._layerNames]},setLayerNames(e){this._layerNames.add(e)},getLoadedStyleNames(){return this._loadedStyleNames},isStyleNameLoaded(e){return this._loadedStyleNames.has(e)},setLoadedStyleName(e){this._loadedStyleNames.add(e)},deleteLoadedStyleName(e){this._loadedStyleNames.delete(e)},clearLoadedStyleNames(){this._loadedStyleNames.clear()},getTokenValue(e){return f.getTokenValue(this.tokens,e,this.defaults)},getCommon(e="",t){return f.getCommon({name:e,theme:this.theme,params:t,defaults:this.defaults,set:{layerNames:this.setLayerNames.bind(this)}})},getComponent(e="",t){const s={name:e,theme:this.theme,params:t,defaults:this.defaults,set:{layerNames:this.setLayerNames.bind(this)}};return f.getPresetC(s)},getDirective(e="",t){const s={name:e,theme:this.theme,params:t,defaults:this.defaults,set:{layerNames:this.setLayerNames.bind(this)}};return f.getPresetD(s)},getCustomPreset(e="",t,s,r){const a={name:e,preset:t,options:this.options,selector:s,params:r,defaults:this.defaults,set:{layerNames:this.setLayerNames.bind(this)}};return f.getPreset(a)},getLayerOrderCSS(e=""){return f.getLayerOrder(e,this.options,{names:this.getLayerNames()},this.defaults)},transformCSS(e="",t,s="style",r){return f.transformCSS(e,t,r,s,this.options,{layerNames:this.setLayerNames.bind(this)},this.defaults)},getCommonStyleSheet(e="",t,s={}){return f.getCommonStyleSheet({name:e,theme:this.theme,params:t,props:s,defaults:this.defaults,set:{layerNames:this.setLayerNames.bind(this)}})},getStyleSheet(e,t,s={}){return f.getStyleSheet({name:e,theme:this.theme,params:t,props:s,defaults:this.defaults,set:{layerNames:this.setLayerNames.bind(this)}})},onStyleMounted(e){this._loadingStyles.add(e)},onStyleUpdated(e){this._loadingStyles.add(e)},onStyleLoaded(e,{name:t}){this._loadingStyles.size&&(this._loadingStyles.delete(t),k.emit(`theme:${t}:load`,e),!this._loadingStyles.size&&k.emit("theme:load"))}};export{$e as a,z as c,ke as d,k as s};
