import{d as Y}from"./utils-CXbrStuA.js";import{B as Z,U as ee,s as b}from"./core-E-lCN-sd.js";import{t as te,u as ne,v as ae,w as re}from"./icons-C9KxCpTf.js";import{R as S}from"./ripple-BoKhGZ72.js";import{s as B}from"./select-B0mE4uEv.js";import{s as oe}from"./inputnumber-DeThhC9L.js";import{o,c as g,m as u,d as I,w as A,e as l,i as v,b as d,s as $,f as V,F as N,p as D,a as ie,r as F,g as R,h as se}from"./runtime-core-Bo7vMbeO.js";import{t as U,n as T,a as pe}from"./shared-7YLTi_yj.js";function C(e){"@babel/helpers - typeof";return C=typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?function(t){return typeof t}:function(t){return t&&typeof Symbol=="function"&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},C(e)}function le(e,t,n){return(t=ue(t))in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function ue(e){var t=ce(e,"string");return C(t)=="symbol"?t:t+""}function ce(e,t){if(C(e)!="object"||!e)return e;var n=e[Symbol.toPrimitive];if(n!==void 0){var r=n.call(e,t||"default");if(C(r)!="object")return r;throw new TypeError("@@toPrimitive must return a primitive value.")}return(t==="string"?String:Number)(e)}var ge=function(t){var n=t.dt;return`
.p-paginator {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-wrap: wrap;
    background: `.concat(n("paginator.background"),`;
    color: `).concat(n("paginator.color"),`;
    padding: `).concat(n("paginator.padding"),`;
    border-radius: `).concat(n("paginator.border.radius"),`;
    gap: `).concat(n("paginator.gap"),`;
}

.p-paginator-content {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-wrap: wrap;
    gap: `).concat(n("paginator.gap"),`;
}

.p-paginator-content-start {
    margin-right: auto;
}

.p-paginator-content-end {
    margin-left: auto;
}

.p-paginator-page,
.p-paginator-next,
.p-paginator-last,
.p-paginator-first,
.p-paginator-prev {
    cursor: pointer;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    line-height: 1;
    user-select: none;
    overflow: hidden;
    position: relative;
    background: `).concat(n("paginator.nav.button.background"),`;
    border: 0 none;
    color: `).concat(n("paginator.nav.button.color"),`;
    min-width: `).concat(n("paginator.nav.button.width"),`;
    height: `).concat(n("paginator.nav.button.height"),`;
    transition: background `).concat(n("paginator.transition.duration"),", color ").concat(n("paginator.transition.duration"),", outline-color ").concat(n("paginator.transition.duration"),", box-shadow ").concat(n("paginator.transition.duration"),`;
    border-radius: `).concat(n("paginator.nav.button.border.radius"),`;
    padding: 0;
    margin: 0;
}

.p-paginator-page:focus-visible,
.p-paginator-next:focus-visible,
.p-paginator-last:focus-visible,
.p-paginator-first:focus-visible,
.p-paginator-prev:focus-visible {
    box-shadow: `).concat(n("paginator.nav.button.focus.ring.shadow"),`;
    outline: `).concat(n("paginator.nav.button.focus.ring.width")," ").concat(n("paginator.nav.button.focus.ring.style")," ").concat(n("paginator.nav.button.focus.ring.color"),`;
    outline-offset: `).concat(n("paginator.nav.button.focus.ring.offset"),`;
}

.p-paginator-page:not(.p-disabled):not(.p-paginator-page-selected):hover,
.p-paginator-first:not(.p-disabled):hover,
.p-paginator-prev:not(.p-disabled):hover,
.p-paginator-next:not(.p-disabled):hover,
.p-paginator-last:not(.p-disabled):hover {
    background: `).concat(n("paginator.nav.button.hover.background"),`;
    color: `).concat(n("paginator.nav.button.hover.color"),`;
}

.p-paginator-page.p-paginator-page-selected {
    background: `).concat(n("paginator.nav.button.selected.background"),`;
    color: `).concat(n("paginator.nav.button.selected.color"),`;
}

.p-paginator-current {
    color: `).concat(n("paginator.current.page.report.color"),`;
}

.p-paginator-pages {
    display: flex;
    align-items: center;
    gap: `).concat(n("paginator.gap"),`;
}

.p-paginator-jtp-input .p-inputtext {
    max-width: `).concat(n("paginator.jump.to.page.input.max.width"),`;
}
`)},de={paginator:function(t){var n=t.instance,r=t.key;return["p-paginator p-component",le({"p-paginator-default":!n.hasBreakpoints()},"p-paginator-".concat(r),n.hasBreakpoints())]},content:"p-paginator-content",contentStart:"p-paginator-content-start",contentEnd:"p-paginator-content-end",first:function(t){var n=t.instance;return["p-paginator-first",{"p-disabled":n.$attrs.disabled}]},firstIcon:"p-paginator-first-icon",prev:function(t){var n=t.instance;return["p-paginator-prev",{"p-disabled":n.$attrs.disabled}]},prevIcon:"p-paginator-prev-icon",next:function(t){var n=t.instance;return["p-paginator-next",{"p-disabled":n.$attrs.disabled}]},nextIcon:"p-paginator-next-icon",last:function(t){var n=t.instance;return["p-paginator-last",{"p-disabled":n.$attrs.disabled}]},lastIcon:"p-paginator-last-icon",pages:"p-paginator-pages",page:function(t){var n=t.props,r=t.pageLink;return["p-paginator-page",{"p-paginator-page-selected":r-1===n.page}]},current:"p-paginator-current",pcRowPerPageDropdown:"p-paginator-rpp-dropdown",pcJumpToPageDropdown:"p-paginator-jtp-dropdown",pcJumpToPageInput:"p-paginator-jtp-input"},fe=Z.extend({name:"paginator",theme:ge,classes:de}),me={name:"BasePaginator",extends:b,props:{totalRecords:{type:Number,default:0},rows:{type:Number,default:0},first:{type:Number,default:0},pageLinkSize:{type:Number,default:5},rowsPerPageOptions:{type:Array,default:null},template:{type:[Object,String],default:"FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown"},currentPageReportTemplate:{type:null,default:"({currentPage} of {totalPages})"},alwaysShow:{type:Boolean,default:!0}},style:fe,provide:function(){return{$pcPaginator:this,$parentInstance:this}}},M={name:"CurrentPageReport",hostName:"Paginator",extends:b,props:{pageCount:{type:Number,default:0},currentPage:{type:Number,default:0},page:{type:Number,default:0},first:{type:Number,default:0},rows:{type:Number,default:0},totalRecords:{type:Number,default:0},template:{type:String,default:"({currentPage} of {totalPages})"}},computed:{text:function(){var t=this.template.replace("{currentPage}",this.currentPage).replace("{totalPages}",this.pageCount).replace("{first}",this.pageCount>0?this.first+1:0).replace("{last}",Math.min(this.first+this.rows,this.totalRecords)).replace("{rows}",this.rows).replace("{totalRecords}",this.totalRecords);return t}}};function he(e,t,n,r,p,a){return o(),g("span",u({class:e.cx("current")},e.ptm("current")),U(a.text),17)}M.render=he;var z={name:"FirstPageLink",hostName:"Paginator",extends:b,props:{template:{type:Function,default:null}},methods:{getPTOptions:function(t){return this.ptm(t,{context:{disabled:this.$attrs.disabled}})}},components:{AngleDoubleLeftIcon:te},directives:{ripple:S}};function be(e,t,n,r,p,a){var i=I("ripple");return A((o(),g("button",u({class:e.cx("first"),type:"button"},a.getPTOptions("first"),{"data-pc-group-section":"pagebutton"}),[(o(),l(v(n.template||"AngleDoubleLeftIcon"),u({class:e.cx("firstIcon")},a.getPTOptions("firstIcon")),null,16,["class"]))],16)),[[i]])}z.render=be;var W={name:"JumpToPageDropdown",hostName:"Paginator",extends:b,emits:["page-change"],props:{page:Number,pageCount:Number,disabled:Boolean,templates:null},methods:{onChange:function(t){this.$emit("page-change",t)}},computed:{pageOptions:function(){for(var t=[],n=0;n<this.pageCount;n++)t.push({label:String(n+1),value:n});return t}},components:{JTPSelect:B}};function Pe(e,t,n,r,p,a){var i=d("JTPSelect");return o(),l(i,{modelValue:n.page,options:a.pageOptions,optionLabel:"label",optionValue:"value","onUpdate:modelValue":t[0]||(t[0]=function(s){return a.onChange(s)}),class:T(e.cx("pcJumpToPageDropdown")),disabled:n.disabled,unstyled:e.unstyled,pt:e.ptm("pcJumpToPageDropdown"),"data-pc-group-section":"pagedropdown"},$({_:2},[n.templates.jumptopagedropdownicon?{name:"dropdownicon",fn:V(function(s){return[(o(),l(v(n.templates.jumptopagedropdownicon),{class:T(s.class)},null,8,["class"]))]}),key:"0"}:void 0]),1032,["modelValue","options","class","disabled","unstyled","pt"])}W.render=Pe;var q={name:"JumpToPageInput",hostName:"Paginator",extends:b,inheritAttrs:!1,emits:["page-change"],props:{page:Number,pageCount:Number,disabled:Boolean},data:function(){return{d_page:this.page}},watch:{page:function(t){this.d_page=t}},methods:{onChange:function(t){t!==this.page&&(this.d_page=t,this.$emit("page-change",t-1))}},computed:{inputArialabel:function(){return this.$primevue.config.locale.aria?this.$primevue.config.locale.aria.jumpToPageInputLabel:void 0}},components:{JTPInput:oe}};function ye(e,t,n,r,p,a){var i=d("JTPInput");return o(),l(i,{ref:"jtpInput",modelValue:p.d_page,class:T(e.cx("pcJumpToPageInput")),"aria-label":a.inputArialabel,disabled:n.disabled,"onUpdate:modelValue":a.onChange,unstyled:e.unstyled,pt:e.ptm("pcJumpToPageInput")},null,8,["modelValue","class","aria-label","disabled","onUpdate:modelValue","unstyled","pt"])}q.render=ye;var H={name:"LastPageLink",hostName:"Paginator",extends:b,props:{template:{type:Function,default:null}},methods:{getPTOptions:function(t){return this.ptm(t,{context:{disabled:this.$attrs.disabled}})}},components:{AngleDoubleRightIcon:ne},directives:{ripple:S}};function ve(e,t,n,r,p,a){var i=I("ripple");return A((o(),g("button",u({class:e.cx("last"),type:"button"},a.getPTOptions("last"),{"data-pc-group-section":"pagebutton"}),[(o(),l(v(n.template||"AngleDoubleRightIcon"),u({class:e.cx("lastIcon")},a.getPTOptions("lastIcon")),null,16,["class"]))],16)),[[i]])}H.render=ve;var K={name:"NextPageLink",hostName:"Paginator",extends:b,props:{template:{type:Function,default:null}},methods:{getPTOptions:function(t){return this.ptm(t,{context:{disabled:this.$attrs.disabled}})}},components:{AngleRightIcon:ae},directives:{ripple:S}};function we(e,t,n,r,p,a){var i=I("ripple");return A((o(),g("button",u({class:e.cx("next"),type:"button"},a.getPTOptions("next"),{"data-pc-group-section":"pagebutton"}),[(o(),l(v(n.template||"AngleRightIcon"),u({class:e.cx("nextIcon")},a.getPTOptions("nextIcon")),null,16,["class"]))],16)),[[i]])}K.render=we;var _={name:"PageLinks",hostName:"Paginator",extends:b,inheritAttrs:!1,emits:["click"],props:{value:Array,page:Number},methods:{getPTOptions:function(t,n){return this.ptm(n,{context:{active:t===this.page}})},onPageLinkClick:function(t,n){this.$emit("click",{originalEvent:t,value:n})},ariaPageLabel:function(t){return this.$primevue.config.locale.aria?this.$primevue.config.locale.aria.pageLabel.replace(/{page}/g,t):void 0}},directives:{ripple:S}},ke=["aria-label","aria-current","onClick","data-p-active"];function Le(e,t,n,r,p,a){var i=I("ripple");return o(),g("span",u({class:e.cx("pages")},e.ptm("pages")),[(o(!0),g(N,null,D(n.value,function(s){return A((o(),g("button",u({key:s,class:e.cx("page",{pageLink:s}),type:"button","aria-label":a.ariaPageLabel(s),"aria-current":s-1===n.page?"page":void 0,onClick:function(f){return a.onPageLinkClick(f,s)},ref_for:!0},a.getPTOptions(s-1,"page"),{"data-p-active":s-1===n.page}),[ie(U(s),1)],16,ke)),[[i]])}),128))],16)}_.render=Le;var G={name:"PrevPageLink",hostName:"Paginator",extends:b,props:{template:{type:Function,default:null}},methods:{getPTOptions:function(t){return this.ptm(t,{context:{disabled:this.$attrs.disabled}})}},components:{AngleLeftIcon:re},directives:{ripple:S}};function Te(e,t,n,r,p,a){var i=I("ripple");return A((o(),g("button",u({class:e.cx("prev"),type:"button"},a.getPTOptions("prev"),{"data-pc-group-section":"pagebutton"}),[(o(),l(v(n.template||"AngleLeftIcon"),u({class:e.cx("prevIcon")},a.getPTOptions("prevIcon")),null,16,["class"]))],16)),[[i]])}G.render=Te;var Q={name:"RowsPerPageDropdown",hostName:"Paginator",extends:b,emits:["rows-change"],props:{options:Array,rows:Number,disabled:Boolean,templates:null},methods:{onChange:function(t){this.$emit("rows-change",t)}},computed:{rowsOptions:function(){var t=[];if(this.options)for(var n=0;n<this.options.length;n++)t.push({label:String(this.options[n]),value:this.options[n]});return t}},components:{RPPSelect:B}};function Ce(e,t,n,r,p,a){var i=d("RPPSelect");return o(),l(i,{modelValue:n.rows,options:a.rowsOptions,optionLabel:"label",optionValue:"value","onUpdate:modelValue":t[0]||(t[0]=function(s){return a.onChange(s)}),class:T(e.cx("pcRowPerPageDropdown")),disabled:n.disabled,unstyled:e.unstyled,pt:e.ptm("pcRowPerPageDropdown"),"data-pc-group-section":"pagedropdown"},$({_:2},[n.templates.rowsperpagedropdownicon?{name:"dropdownicon",fn:V(function(s){return[(o(),l(v(n.templates.rowsperpagedropdownicon),{class:T(s.class)},null,8,["class"]))]}),key:"0"}:void 0]),1032,["modelValue","options","class","disabled","unstyled","pt"])}Q.render=Ce;function Se(e){return Re(e)||Ae(e)||X(e)||Ie()}function Ie(){throw new TypeError(`Invalid attempt to spread non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)}function Ae(e){if(typeof Symbol<"u"&&e[Symbol.iterator]!=null||e["@@iterator"]!=null)return Array.from(e)}function Re(e){if(Array.isArray(e))return x(e)}function j(e){"@babel/helpers - typeof";return j=typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?function(t){return typeof t}:function(t){return t&&typeof Symbol=="function"&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},j(e)}function E(e,t){return De(e)||Oe(e,t)||X(e,t)||Ne()}function Ne(){throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)}function X(e,t){if(e){if(typeof e=="string")return x(e,t);var n={}.toString.call(e).slice(8,-1);return n==="Object"&&e.constructor&&(n=e.constructor.name),n==="Map"||n==="Set"?Array.from(e):n==="Arguments"||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?x(e,t):void 0}}function x(e,t){(t==null||t>e.length)&&(t=e.length);for(var n=0,r=Array(t);n<t;n++)r[n]=e[n];return r}function Oe(e,t){var n=e==null?null:typeof Symbol<"u"&&e[Symbol.iterator]||e["@@iterator"];if(n!=null){var r,p,a,i,s=[],m=!0,f=!1;try{if(a=(n=n.call(e)).next,t===0){if(Object(n)!==n)return;m=!1}else for(;!(m=(r=a.call(n)).done)&&(s.push(r.value),s.length!==t);m=!0);}catch(w){f=!0,p=w}finally{try{if(!m&&n.return!=null&&(i=n.return(),Object(i)!==i))return}finally{if(f)throw p}}return s}}function De(e){if(Array.isArray(e))return e}var je={name:"Paginator",extends:me,inheritAttrs:!1,emits:["update:first","update:rows","page"],data:function(){return{d_first:this.first,d_rows:this.rows}},watch:{first:function(t){this.d_first=t},rows:function(t){this.d_rows=t},totalRecords:function(t){this.page>0&&t&&this.d_first>=t&&this.changePage(this.pageCount-1)}},mounted:function(){this.setPaginatorAttribute(),this.createStyle()},methods:{changePage:function(t){var n=this.pageCount;if(t>=0&&t<n){this.d_first=this.d_rows*t;var r={page:t,first:this.d_first,rows:this.d_rows,pageCount:n};this.$emit("update:first",this.d_first),this.$emit("update:rows",this.d_rows),this.$emit("page",r)}},changePageToFirst:function(t){this.isFirstPage||this.changePage(0),t.preventDefault()},changePageToPrev:function(t){this.changePage(this.page-1),t.preventDefault()},changePageLink:function(t){this.changePage(t.value-1),t.originalEvent.preventDefault()},changePageToNext:function(t){this.changePage(this.page+1),t.preventDefault()},changePageToLast:function(t){this.isLastPage||this.changePage(this.pageCount-1),t.preventDefault()},onRowChange:function(t){this.d_rows=t,this.changePage(this.page)},createStyle:function(){var t=this;if(this.hasBreakpoints()&&!this.isUnstyled){var n;this.styleElement=document.createElement("style"),this.styleElement.type="text/css",Y(this.styleElement,"nonce",(n=this.$primevue)===null||n===void 0||(n=n.config)===null||n===void 0||(n=n.csp)===null||n===void 0?void 0:n.nonce),document.head.appendChild(this.styleElement);var r="",p=Object.keys(this.template),a={};p.sort(function(y,O){return parseInt(y)-parseInt(O)}).forEach(function(y){a[y]=t.template[y]});for(var i=0,s=Object.entries(Object.entries(a));i<s.length;i++){var m=E(s[i],2),f=m[0],w=E(m[1],1),P=w[0],k=void 0,L=void 0;P!=="default"&&typeof Object.keys(a)[f-1]=="string"?L=Number(Object.keys(a)[f-1].slice(0,-2))+1+"px":L=Object.keys(a)[f-1],k=Object.entries(a)[f-1]?"and (min-width:".concat(L,")"):"",P==="default"?r+=`
                            @media screen `.concat(k,` {
                                .paginator[`).concat(this.attributeSelector,`],
                                    display: flex;
                                }
                            }
                        `):r+=`
.paginator[`.concat(this.attributeSelector,"], .p-paginator-").concat(P,` {
    display: none;
}
@media screen `).concat(k," and (max-width: ").concat(P,`) {
    .paginator[`).concat(this.attributeSelector,"], .p-paginator-").concat(P,` {
        display: flex;
    }
    .paginator[`).concat(this.attributeSelector,`],
    .p-paginator-default{
        display: none;
    }
}
                    `)}this.styleElement.innerHTML=r}},hasBreakpoints:function(){return j(this.template)==="object"},setPaginatorAttribute:function(){var t=this;this.$refs.paginator&&this.$refs.paginator.length>=0&&Se(this.$refs.paginator).forEach(function(n){n.setAttribute(t.attributeSelector,"")})},getAriaLabel:function(t){return this.$primevue.config.locale.aria?this.$primevue.config.locale.aria[t]:void 0}},computed:{templateItems:function(){var t={};if(this.hasBreakpoints()){t=this.template,t.default||(t.default="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown");for(var n in t)t[n]=this.template[n].split(" ").map(function(r){return r.trim()});return t}return t.default=this.template.split(" ").map(function(r){return r.trim()}),t},page:function(){return Math.floor(this.d_first/this.d_rows)},pageCount:function(){return Math.ceil(this.totalRecords/this.d_rows)},isFirstPage:function(){return this.page===0},isLastPage:function(){return this.page===this.pageCount-1},calculatePageLinkBoundaries:function(){var t=this.pageCount,n=Math.min(this.pageLinkSize,t),r=Math.max(0,Math.ceil(this.page-n/2)),p=Math.min(t-1,r+n-1),a=this.pageLinkSize-(p-r+1);return r=Math.max(0,r-a),[r,p]},pageLinks:function(){for(var t=[],n=this.calculatePageLinkBoundaries,r=n[0],p=n[1],a=r;a<=p;a++)t.push(a+1);return t},currentState:function(){return{page:this.page,first:this.d_first,rows:this.d_rows}},empty:function(){return this.pageCount===0},currentPage:function(){return this.pageCount>0?this.page+1:0},attributeSelector:function(){return ee()}},components:{CurrentPageReport:M,FirstPageLink:z,LastPageLink:H,NextPageLink:K,PageLinks:_,PrevPageLink:G,RowsPerPageDropdown:Q,JumpToPageDropdown:W,JumpToPageInput:q}};function xe(e,t,n,r,p,a){var i=d("FirstPageLink"),s=d("PrevPageLink"),m=d("NextPageLink"),f=d("LastPageLink"),w=d("PageLinks"),P=d("CurrentPageReport"),k=d("RowsPerPageDropdown"),L=d("JumpToPageDropdown"),y=d("JumpToPageInput");return e.alwaysShow||a.pageLinks&&a.pageLinks.length>1?(o(),g("nav",pe(u({key:0},e.ptmi("paginatorContainer"))),[(o(!0),g(N,null,D(a.templateItems,function(O,J){return o(),g("div",u({key:J,ref_for:!0,ref:"paginator",class:e.cx("paginator",{key:J})},e.ptm("root")),[e.$slots.start?(o(),g("div",u({key:0,class:e.cx("contentStart"),ref_for:!0},e.ptm("contentStart")),[F(e.$slots,"start",{state:a.currentState})],16)):R("",!0),se("div",u({class:e.cx("content"),ref_for:!0},e.ptm("content")),[(o(!0),g(N,null,D(O,function(h){return o(),g(N,{key:h},[h==="FirstPageLink"?(o(),l(i,{key:0,"aria-label":a.getAriaLabel("firstPageLabel"),template:e.$slots.firsticon||e.$slots.firstpagelinkicon,onClick:t[0]||(t[0]=function(c){return a.changePageToFirst(c)}),disabled:a.isFirstPage||a.empty,unstyled:e.unstyled,pt:e.pt},null,8,["aria-label","template","disabled","unstyled","pt"])):h==="PrevPageLink"?(o(),l(s,{key:1,"aria-label":a.getAriaLabel("prevPageLabel"),template:e.$slots.previcon||e.$slots.prevpagelinkicon,onClick:t[1]||(t[1]=function(c){return a.changePageToPrev(c)}),disabled:a.isFirstPage||a.empty,unstyled:e.unstyled,pt:e.pt},null,8,["aria-label","template","disabled","unstyled","pt"])):h==="NextPageLink"?(o(),l(m,{key:2,"aria-label":a.getAriaLabel("nextPageLabel"),template:e.$slots.nexticon||e.$slots.nextpagelinkicon,onClick:t[2]||(t[2]=function(c){return a.changePageToNext(c)}),disabled:a.isLastPage||a.empty,unstyled:e.unstyled,pt:e.pt},null,8,["aria-label","template","disabled","unstyled","pt"])):h==="LastPageLink"?(o(),l(f,{key:3,"aria-label":a.getAriaLabel("lastPageLabel"),template:e.$slots.lasticon||e.$slots.lastpagelinkicon,onClick:t[3]||(t[3]=function(c){return a.changePageToLast(c)}),disabled:a.isLastPage||a.empty,unstyled:e.unstyled,pt:e.pt},null,8,["aria-label","template","disabled","unstyled","pt"])):h==="PageLinks"?(o(),l(w,{key:4,"aria-label":a.getAriaLabel("pageLabel"),value:a.pageLinks,page:a.page,onClick:t[4]||(t[4]=function(c){return a.changePageLink(c)}),unstyled:e.unstyled,pt:e.pt},null,8,["aria-label","value","page","unstyled","pt"])):h==="CurrentPageReport"?(o(),l(P,{key:5,"aria-live":"polite",template:e.currentPageReportTemplate,currentPage:a.currentPage,page:a.page,pageCount:a.pageCount,first:p.d_first,rows:p.d_rows,totalRecords:e.totalRecords,unstyled:e.unstyled,pt:e.pt},null,8,["template","currentPage","page","pageCount","first","rows","totalRecords","unstyled","pt"])):h==="RowsPerPageDropdown"&&e.rowsPerPageOptions?(o(),l(k,{key:6,"aria-label":a.getAriaLabel("rowsPerPageLabel"),rows:p.d_rows,options:e.rowsPerPageOptions,onRowsChange:t[5]||(t[5]=function(c){return a.onRowChange(c)}),disabled:a.empty,templates:e.$slots,unstyled:e.unstyled,pt:e.pt},null,8,["aria-label","rows","options","disabled","templates","unstyled","pt"])):h==="JumpToPageDropdown"?(o(),l(L,{key:7,"aria-label":a.getAriaLabel("jumpToPageDropdownLabel"),page:a.page,pageCount:a.pageCount,onPageChange:t[6]||(t[6]=function(c){return a.changePage(c)}),disabled:a.empty,templates:e.$slots,unstyled:e.unstyled,pt:e.pt},null,8,["aria-label","page","pageCount","disabled","templates","unstyled","pt"])):h==="JumpToPageInput"?(o(),l(y,{key:8,page:a.currentPage,onPageChange:t[7]||(t[7]=function(c){return a.changePage(c)}),disabled:a.empty,unstyled:e.unstyled,pt:e.pt},null,8,["page","disabled","unstyled","pt"])):R("",!0)],64)}),128))],16),e.$slots.end?(o(),g("div",u({key:1,class:e.cx("contentEnd"),ref_for:!0},e.ptm("contentEnd")),[F(e.$slots,"end",{state:a.currentState})],16)):R("",!0)],16)}),128))],16)):R("",!0)}je.render=xe;export{je as s};
