import{a as k}from"./utils-DJmc-F4Z.js";import{s as y}from"./icons-BcUEpkMI.js";import{s as m}from"./badge-JWr2y0kS.js";import{R as x}from"./ripple-DfDPvZex.js";import{B as w,s as S}from"./core-BvHsUG4k.js";import{m as e,b as s,d as B,w as $,o as a,e as l,f as z,r as b,c as p,g,h as I,i as P}from"./runtime-core-ynBvhIh5.js";import{n as d,t as A}from"./shared-7YLTi_yj.js";function u(n){"@babel/helpers - typeof";return u=typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?function(t){return typeof t}:function(t){return t&&typeof Symbol=="function"&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},u(n)}function c(n,t,o){return(t=C(t))in n?Object.defineProperty(n,t,{value:o,enumerable:!0,configurable:!0,writable:!0}):n[t]=o,n}function C(n){var t=T(n,"string");return u(t)=="symbol"?t:t+""}function T(n,t){if(u(n)!="object"||!n)return n;var o=n[Symbol.toPrimitive];if(o!==void 0){var r=o.call(n,t||"default");if(u(r)!="object")return r;throw new TypeError("@@toPrimitive must return a primitive value.")}return(t==="string"?String:Number)(n)}var O=function(t){var o=t.dt;return`
.p-button {
    display: inline-flex;
    cursor: pointer;
    user-select: none;
    align-items: center;
    justify-content: center;
    overflow: hidden;
    position: relative;
    color: `.concat(o("button.primary.color"),`;
    background: `).concat(o("button.primary.background"),`;
    border: 1px solid `).concat(o("button.primary.border.color"),`;
    padding: `).concat(o("button.padding.y")," ").concat(o("button.padding.x"),`;
    font-size: 1rem;
    font-family: inherit;
    font-feature-settings: inherit;
    transition: background `).concat(o("button.transition.duration"),", color ").concat(o("button.transition.duration"),", border-color ").concat(o("button.transition.duration"),`,
            outline-color `).concat(o("button.transition.duration"),", box-shadow ").concat(o("button.transition.duration"),`;
    border-radius: `).concat(o("button.border.radius"),`;
    outline-color: transparent;
    gap: `).concat(o("button.gap"),`;
}

.p-button:disabled {
    cursor: default;
}

.p-button-icon-right {
    order: 1;
}

.p-button-icon-bottom {
    order: 2;
}

.p-button-icon-only {
    width: `).concat(o("button.icon.only.width"),`;
    padding-left: 0;
    padding-right: 0;
    gap: 0;
}

.p-button-icon-only.p-button-rounded {
    border-radius: 50%;
    height: `).concat(o("button.icon.only.width"),`;
}

.p-button-icon-only .p-button-label {
    visibility: hidden;
    width: 0;
}

.p-button-sm {
    font-size: `).concat(o("button.sm.font.size"),`;
    padding: `).concat(o("button.sm.padding.y")," ").concat(o("button.sm.padding.x"),`;
}

.p-button-sm .p-button-icon {
    font-size: `).concat(o("button.sm.font.size"),`;
}

.p-button-lg {
    font-size: `).concat(o("button.lg.font.size"),`;
    padding: `).concat(o("button.lg.padding.y")," ").concat(o("button.lg.padding.x"),`;
}

.p-button-lg .p-button-icon {
    font-size: `).concat(o("button.lg.font.size"),`;
}

.p-button-vertical {
    flex-direction: column;
}

.p-button-label {
    font-weight: `).concat(o("button.label.font.weight"),`;
}

.p-button-fluid {
    width: 100%;
}

.p-button-fluid.p-button-icon-only {
    width: `).concat(o("button.icon.only.width"),`;
}

.p-button:not(:disabled):hover {
    background: `).concat(o("button.primary.hover.background"),`;
    border: 1px solid `).concat(o("button.primary.hover.border.color"),`;
    color: `).concat(o("button.primary.hover.color"),`;
}

.p-button:not(:disabled):active {
    background: `).concat(o("button.primary.active.background"),`;
    border: 1px solid `).concat(o("button.primary.active.border.color"),`;
    color: `).concat(o("button.primary.active.color"),`;
}

.p-button:focus-visible {
    box-shadow: `).concat(o("button.primary.focus.ring.shadow"),`;
    outline: `).concat(o("button.focus.ring.width")," ").concat(o("button.focus.ring.style")," ").concat(o("button.primary.focus.ring.color"),`;
    outline-offset: `).concat(o("button.focus.ring.offset"),`;
}

.p-button .p-badge {
    min-width: `).concat(o("button.badge.size"),`;
    height: `).concat(o("button.badge.size"),`;
    line-height: `).concat(o("button.badge.size"),`;
}

.p-button-raised {
    box-shadow: `).concat(o("button.raised.shadow"),`;
}

.p-button-rounded {
    border-radius: `).concat(o("button.rounded.border.radius"),`;
}

.p-button-secondary {
    background: `).concat(o("button.secondary.background"),`;
    border: 1px solid `).concat(o("button.secondary.border.color"),`;
    color: `).concat(o("button.secondary.color"),`;
}

.p-button-secondary:not(:disabled):hover {
    background: `).concat(o("button.secondary.hover.background"),`;
    border: 1px solid `).concat(o("button.secondary.hover.border.color"),`;
    color: `).concat(o("button.secondary.hover.color"),`;
}

.p-button-secondary:not(:disabled):active {
    background: `).concat(o("button.secondary.active.background"),`;
    border: 1px solid `).concat(o("button.secondary.active.border.color"),`;
    color: `).concat(o("button.secondary.active.color"),`;
}

.p-button-secondary:focus-visible {
    outline-color: `).concat(o("button.secondary.focus.ring.color"),`;
    box-shadow: `).concat(o("button.secondary.focus.ring.shadow"),`;
}

.p-button-success {
    background: `).concat(o("button.success.background"),`;
    border: 1px solid `).concat(o("button.success.border.color"),`;
    color: `).concat(o("button.success.color"),`;
}

.p-button-success:not(:disabled):hover {
    background: `).concat(o("button.success.hover.background"),`;
    border: 1px solid `).concat(o("button.success.hover.border.color"),`;
    color: `).concat(o("button.success.hover.color"),`;
}

.p-button-success:not(:disabled):active {
    background: `).concat(o("button.success.active.background"),`;
    border: 1px solid `).concat(o("button.success.active.border.color"),`;
    color: `).concat(o("button.success.active.color"),`;
}

.p-button-success:focus-visible {
    outline-color: `).concat(o("button.success.focus.ring.color"),`;
    box-shadow: `).concat(o("button.success.focus.ring.shadow"),`;
}

.p-button-info {
    background: `).concat(o("button.info.background"),`;
    border: 1px solid `).concat(o("button.info.border.color"),`;
    color: `).concat(o("button.info.color"),`;
}

.p-button-info:not(:disabled):hover {
    background: `).concat(o("button.info.hover.background"),`;
    border: 1px solid `).concat(o("button.info.hover.border.color"),`;
    color: `).concat(o("button.info.hover.color"),`;
}

.p-button-info:not(:disabled):active {
    background: `).concat(o("button.info.active.background"),`;
    border: 1px solid `).concat(o("button.info.active.border.color"),`;
    color: `).concat(o("button.info.active.color"),`;
}

.p-button-info:focus-visible {
    outline-color: `).concat(o("button.info.focus.ring.color"),`;
    box-shadow: `).concat(o("button.info.focus.ring.shadow"),`;
}

.p-button-warn {
    background: `).concat(o("button.warn.background"),`;
    border: 1px solid `).concat(o("button.warn.border.color"),`;
    color: `).concat(o("button.warn.color"),`;
}

.p-button-warn:not(:disabled):hover {
    background: `).concat(o("button.warn.hover.background"),`;
    border: 1px solid `).concat(o("button.warn.hover.border.color"),`;
    color: `).concat(o("button.warn.hover.color"),`;
}

.p-button-warn:not(:disabled):active {
    background: `).concat(o("button.warn.active.background"),`;
    border: 1px solid `).concat(o("button.warn.active.border.color"),`;
    color: `).concat(o("button.warn.active.color"),`;
}

.p-button-warn:focus-visible {
    outline-color: `).concat(o("button.warn.focus.ring.color"),`;
    box-shadow: `).concat(o("button.warn.focus.ring.shadow"),`;
}

.p-button-help {
    background: `).concat(o("button.help.background"),`;
    border: 1px solid `).concat(o("button.help.border.color"),`;
    color: `).concat(o("button.help.color"),`;
}

.p-button-help:not(:disabled):hover {
    background: `).concat(o("button.help.hover.background"),`;
    border: 1px solid `).concat(o("button.help.hover.border.color"),`;
    color: `).concat(o("button.help.hover.color"),`;
}

.p-button-help:not(:disabled):active {
    background: `).concat(o("button.help.active.background"),`;
    border: 1px solid `).concat(o("button.help.active.border.color"),`;
    color: `).concat(o("button.help.active.color"),`;
}

.p-button-help:focus-visible {
    outline-color: `).concat(o("button.help.focus.ring.color"),`;
    box-shadow: `).concat(o("button.help.focus.ring.shadow"),`;
}

.p-button-danger {
    background: `).concat(o("button.danger.background"),`;
    border: 1px solid `).concat(o("button.danger.border.color"),`;
    color: `).concat(o("button.danger.color"),`;
}

.p-button-danger:not(:disabled):hover {
    background: `).concat(o("button.danger.hover.background"),`;
    border: 1px solid `).concat(o("button.danger.hover.border.color"),`;
    color: `).concat(o("button.danger.hover.color"),`;
}

.p-button-danger:not(:disabled):active {
    background: `).concat(o("button.danger.active.background"),`;
    border: 1px solid `).concat(o("button.danger.active.border.color"),`;
    color: `).concat(o("button.danger.active.color"),`;
}

.p-button-danger:focus-visible {
    outline-color: `).concat(o("button.danger.focus.ring.color"),`;
    box-shadow: `).concat(o("button.danger.focus.ring.shadow"),`;
}

.p-button-contrast {
    background: `).concat(o("button.contrast.background"),`;
    border: 1px solid `).concat(o("button.contrast.border.color"),`;
    color: `).concat(o("button.contrast.color"),`;
}

.p-button-contrast:not(:disabled):hover {
    background: `).concat(o("button.contrast.hover.background"),`;
    border: 1px solid `).concat(o("button.contrast.hover.border.color"),`;
    color: `).concat(o("button.contrast.hover.color"),`;
}

.p-button-contrast:not(:disabled):active {
    background: `).concat(o("button.contrast.active.background"),`;
    border: 1px solid `).concat(o("button.contrast.active.border.color"),`;
    color: `).concat(o("button.contrast.active.color"),`;
}

.p-button-contrast:focus-visible {
    outline-color: `).concat(o("button.contrast.focus.ring.color"),`;
    box-shadow: `).concat(o("button.contrast.focus.ring.shadow"),`;
}

.p-button-outlined {
    background: transparent;
    border-color: `).concat(o("button.outlined.primary.border.color"),`;
    color: `).concat(o("button.outlined.primary.color"),`;
}

.p-button-outlined:not(:disabled):hover {
    background: `).concat(o("button.outlined.primary.hover.background"),`;
    border-color: `).concat(o("button.outlined.primary.border.color"),`;
    color: `).concat(o("button.outlined.primary.color"),`;
}

.p-button-outlined:not(:disabled):active {
    background: `).concat(o("button.outlined.primary.active.background"),`;
    border-color: `).concat(o("button.outlined.primary.border.color"),`;
    color: `).concat(o("button.outlined.primary.color"),`;
}

.p-button-outlined.p-button-secondary {
    border-color: `).concat(o("button.outlined.secondary.border.color"),`;
    color: `).concat(o("button.outlined.secondary.color"),`;
}

.p-button-outlined.p-button-secondary:not(:disabled):hover {
    background: `).concat(o("button.outlined.secondary.hover.background"),`;
    border-color: `).concat(o("button.outlined.secondary.border.color"),`;
    color: `).concat(o("button.outlined.secondary.color"),`;
}

.p-button-outlined.p-button-secondary:not(:disabled):active {
    background: `).concat(o("button.outlined.secondary.active.background"),`;
    border-color: `).concat(o("button.outlined.secondary.border.color"),`;
    color: `).concat(o("button.outlined.secondary.color"),`;
}

.p-button-outlined.p-button-success {
    border-color: `).concat(o("button.outlined.success.border.color"),`;
    color: `).concat(o("button.outlined.success.color"),`;
}

.p-button-outlined.p-button-success:not(:disabled):hover {
    background: `).concat(o("button.outlined.success.hover.background"),`;
    border-color: `).concat(o("button.outlined.success.border.color"),`;
    color: `).concat(o("button.outlined.success.color"),`;
}

.p-button-outlined.p-button-success:not(:disabled):active {
    background: `).concat(o("button.outlined.success.active.background"),`;
    border-color: `).concat(o("button.outlined.success.border.color"),`;
    color: `).concat(o("button.outlined.success.color"),`;
}

.p-button-outlined.p-button-info {
    border-color: `).concat(o("button.outlined.info.border.color"),`;
    color: `).concat(o("button.outlined.info.color"),`;
}

.p-button-outlined.p-button-info:not(:disabled):hover {
    background: `).concat(o("button.outlined.info.hover.background"),`;
    border-color: `).concat(o("button.outlined.info.border.color"),`;
    color: `).concat(o("button.outlined.info.color"),`;
}

.p-button-outlined.p-button-info:not(:disabled):active {
    background: `).concat(o("button.outlined.info.active.background"),`;
    border-color: `).concat(o("button.outlined.info.border.color"),`;
    color: `).concat(o("button.outlined.info.color"),`;
}

.p-button-outlined.p-button-warn {
    border-color: `).concat(o("button.outlined.warn.border.color"),`;
    color: `).concat(o("button.outlined.warn.color"),`;
}

.p-button-outlined.p-button-warn:not(:disabled):hover {
    background: `).concat(o("button.outlined.warn.hover.background"),`;
    border-color: `).concat(o("button.outlined.warn.border.color"),`;
    color: `).concat(o("button.outlined.warn.color"),`;
}

.p-button-outlined.p-button-warn:not(:disabled):active {
    background: `).concat(o("button.outlined.warn.active.background"),`;
    border-color: `).concat(o("button.outlined.warn.border.color"),`;
    color: `).concat(o("button.outlined.warn.color"),`;
}

.p-button-outlined.p-button-help {
    border-color: `).concat(o("button.outlined.help.border.color"),`;
    color: `).concat(o("button.outlined.help.color"),`;
}

.p-button-outlined.p-button-help:not(:disabled):hover {
    background: `).concat(o("button.outlined.help.hover.background"),`;
    border-color: `).concat(o("button.outlined.help.border.color"),`;
    color: `).concat(o("button.outlined.help.color"),`;
}

.p-button-outlined.p-button-help:not(:disabled):active {
    background: `).concat(o("button.outlined.help.active.background"),`;
    border-color: `).concat(o("button.outlined.help.border.color"),`;
    color: `).concat(o("button.outlined.help.color"),`;
}

.p-button-outlined.p-button-danger {
    border-color: `).concat(o("button.outlined.danger.border.color"),`;
    color: `).concat(o("button.outlined.danger.color"),`;
}

.p-button-outlined.p-button-danger:not(:disabled):hover {
    background: `).concat(o("button.outlined.danger.hover.background"),`;
    border-color: `).concat(o("button.outlined.danger.border.color"),`;
    color: `).concat(o("button.outlined.danger.color"),`;
}

.p-button-outlined.p-button-danger:not(:disabled):active {
    background: `).concat(o("button.outlined.danger.active.background"),`;
    border-color: `).concat(o("button.outlined.danger.border.color"),`;
    color: `).concat(o("button.outlined.danger.color"),`;
}

.p-button-outlined.p-button-contrast {
    border-color: `).concat(o("button.outlined.contrast.border.color"),`;
    color: `).concat(o("button.outlined.contrast.color"),`;
}

.p-button-outlined.p-button-contrast:not(:disabled):hover {
    background: `).concat(o("button.outlined.contrast.hover.background"),`;
    border-color: `).concat(o("button.outlined.contrast.border.color"),`;
    color: `).concat(o("button.outlined.contrast.color"),`;
}

.p-button-outlined.p-button-contrast:not(:disabled):active {
    background: `).concat(o("button.outlined.contrast.active.background"),`;
    border-color: `).concat(o("button.outlined.contrast.border.color"),`;
    color: `).concat(o("button.outlined.contrast.color"),`;
}

.p-button-outlined.p-button-plain {
    border-color: `).concat(o("button.outlined.plain.border.color"),`;
    color: `).concat(o("button.outlined.plain.color"),`;
}

.p-button-outlined.p-button-plain:not(:disabled):hover {
    background: `).concat(o("button.outlined.plain.hover.background"),`;
    border-color: `).concat(o("button.outlined.plain.border.color"),`;
    color: `).concat(o("button.outlined.plain.color"),`;
}

.p-button-outlined.p-button-plain:not(:disabled):active {
    background: `).concat(o("button.outlined.plain.active.background"),`;
    border-color: `).concat(o("button.outlined.plain.border.color"),`;
    color: `).concat(o("button.outlined.plain.color"),`;
}

.p-button-text {
    background: transparent;
    border-color: transparent;
    color: `).concat(o("button.text.primary.color"),`;
}

.p-button-text:not(:disabled):hover {
    background: `).concat(o("button.text.primary.hover.background"),`;
    border-color: transparent;
    color: `).concat(o("button.text.primary.color"),`;
}

.p-button-text:not(:disabled):active {
    background: `).concat(o("button.text.primary.active.background"),`;
    border-color: transparent;
    color: `).concat(o("button.text.primary.color"),`;
}

.p-button-text.p-button-secondary {
    background: transparent;
    border-color: transparent;
    color: `).concat(o("button.text.secondary.color"),`;
}

.p-button-text.p-button-secondary:not(:disabled):hover {
    background: `).concat(o("button.text.secondary.hover.background"),`;
    border-color: transparent;
    color: `).concat(o("button.text.secondary.color"),`;
}

.p-button-text.p-button-secondary:not(:disabled):active {
    background: `).concat(o("button.text.secondary.active.background"),`;
    border-color: transparent;
    color: `).concat(o("button.text.secondary.color"),`;
}

.p-button-text.p-button-success {
    background: transparent;
    border-color: transparent;
    color: `).concat(o("button.text.success.color"),`;
}

.p-button-text.p-button-success:not(:disabled):hover {
    background: `).concat(o("button.text.success.hover.background"),`;
    border-color: transparent;
    color: `).concat(o("button.text.success.color"),`;
}

.p-button-text.p-button-success:not(:disabled):active {
    background: `).concat(o("button.text.success.active.background"),`;
    border-color: transparent;
    color: `).concat(o("button.text.success.color"),`;
}

.p-button-text.p-button-info {
    background: transparent;
    border-color: transparent;
    color: `).concat(o("button.text.info.color"),`;
}

.p-button-text.p-button-info:not(:disabled):hover {
    background: `).concat(o("button.text.info.hover.background"),`;
    border-color: transparent;
    color: `).concat(o("button.text.info.color"),`;
}

.p-button-text.p-button-info:not(:disabled):active {
    background: `).concat(o("button.text.info.active.background"),`;
    border-color: transparent;
    color: `).concat(o("button.text.info.color"),`;
}

.p-button-text.p-button-warn {
    background: transparent;
    border-color: transparent;
    color: `).concat(o("button.text.warn.color"),`;
}

.p-button-text.p-button-warn:not(:disabled):hover {
    background: `).concat(o("button.text.warn.hover.background"),`;
    border-color: transparent;
    color: `).concat(o("button.text.warn.color"),`;
}

.p-button-text.p-button-warn:not(:disabled):active {
    background: `).concat(o("button.text.warn.active.background"),`;
    border-color: transparent;
    color: `).concat(o("button.text.warn.color"),`;
}

.p-button-text.p-button-help {
    background: transparent;
    border-color: transparent;
    color: `).concat(o("button.text.help.color"),`;
}

.p-button-text.p-button-help:not(:disabled):hover {
    background: `).concat(o("button.text.help.hover.background"),`;
    border-color: transparent;
    color: `).concat(o("button.text.help.color"),`;
}

.p-button-text.p-button-help:not(:disabled):active {
    background: `).concat(o("button.text.help.active.background"),`;
    border-color: transparent;
    color: `).concat(o("button.text.help.color"),`;
}

.p-button-text.p-button-danger {
    background: transparent;
    border-color: transparent;
    color: `).concat(o("button.text.danger.color"),`;
}

.p-button-text.p-button-danger:not(:disabled):hover {
    background: `).concat(o("button.text.danger.hover.background"),`;
    border-color: transparent;
    color: `).concat(o("button.text.danger.color"),`;
}

.p-button-text.p-button-danger:not(:disabled):active {
    background: `).concat(o("button.text.danger.active.background"),`;
    border-color: transparent;
    color: `).concat(o("button.text.danger.color"),`;
}

.p-button-text.p-button-plain {
    background: transparent;
    border-color: transparent;
    color: `).concat(o("button.text.plain.color"),`;
}

.p-button-text.p-button-plain:not(:disabled):hover {
    background: `).concat(o("button.text.plain.hover.background"),`;
    border-color: transparent;
    color: `).concat(o("button.text.plain.color"),`;
}

.p-button-text.p-button-plain:not(:disabled):active {
    background: `).concat(o("button.text.plain.active.background"),`;
    border-color: transparent;
    color: `).concat(o("button.text.plain.color"),`;
}

.p-button-link {
    background: transparent;
    border-color: transparent;
    color: `).concat(o("button.link.color"),`;
}

.p-button-link:not(:disabled):hover {
    background: transparent;
    border-color: transparent;
    color: `).concat(o("button.link.hover.color"),`;
}

.p-button-link:not(:disabled):hover .p-button-label {
    text-decoration: underline;
}

.p-button-link:not(:disabled):active {
    background: transparent;
    border-color: transparent;
    color: `).concat(o("button.link.active.color"),`;
}
`)},j={root:function(t){var o=t.instance,r=t.props;return["p-button p-component",c(c(c(c(c(c(c(c(c({"p-button-icon-only":o.hasIcon&&!r.label&&!r.badge,"p-button-vertical":(r.iconPos==="top"||r.iconPos==="bottom")&&r.label,"p-button-loading":r.loading,"p-button-link":r.link},"p-button-".concat(r.severity),r.severity),"p-button-raised",r.raised),"p-button-rounded",r.rounded),"p-button-text",r.text),"p-button-outlined",r.outlined),"p-button-sm",r.size==="small"),"p-button-lg",r.size==="large"),"p-button-plain",r.plain),"p-button-fluid",o.hasFluid)]},loadingIcon:"p-button-loading-icon",icon:function(t){var o=t.props;return["p-button-icon",c({},"p-button-icon-".concat(o.iconPos),o.label)]},label:"p-button-label"},F=w.extend({name:"button",theme:O,classes:j}),N={name:"BaseButton",extends:S,props:{label:{type:String,default:null},icon:{type:String,default:null},iconPos:{type:String,default:"left"},iconClass:{type:String,default:null},badge:{type:String,default:null},badgeClass:{type:String,default:null},badgeSeverity:{type:String,default:"secondary"},loading:{type:Boolean,default:!1},loadingIcon:{type:String,default:void 0},as:{type:[String,Object],default:"BUTTON"},asChild:{type:Boolean,default:!1},link:{type:Boolean,default:!1},severity:{type:String,default:null},raised:{type:Boolean,default:!1},rounded:{type:Boolean,default:!1},text:{type:Boolean,default:!1},outlined:{type:Boolean,default:!1},size:{type:String,default:null},plain:{type:Boolean,default:!1},fluid:{type:Boolean,default:null}},style:F,provide:function(){return{$pcButton:this,$parentInstance:this}}},D={name:"Button",extends:N,inheritAttrs:!1,inject:{$pcFluid:{default:null}},methods:{getPTOptions:function(t){var o=t==="root"?this.ptmi:this.ptm;return o(t,{context:{disabled:this.disabled}})}},computed:{disabled:function(){return this.$attrs.disabled||this.$attrs.disabled===""||this.loading},defaultAriaLabel:function(){return this.label?this.label+(this.badge?" "+this.badge:""):this.$attrs.ariaLabel},hasIcon:function(){return this.icon||this.$slots.icon},attrs:function(){return e(this.asAttrs,this.a11yAttrs,this.getPTOptions("root"))},asAttrs:function(){return this.as==="BUTTON"?{type:"button",disabled:this.disabled}:void 0},a11yAttrs:function(){return{"aria-label":this.defaultAriaLabel,"data-pc-name":"button","data-p-disabled":this.disabled,"data-p-severity":this.severity}},hasFluid:function(){return k(this.fluid)?!!this.$pcFluid:this.fluid}},components:{SpinnerIcon:y,Badge:m},directives:{ripple:x}};function L(n,t,o,r,E,i){var v=s("SpinnerIcon"),h=s("Badge"),f=B("ripple");return n.asChild?b(n.$slots,"default",{key:1,class:d(n.cx("root")),a11yAttrs:i.a11yAttrs}):$((a(),l(P(n.as),e({key:0,class:n.cx("root")},i.attrs),{default:z(function(){return[b(n.$slots,"default",{},function(){return[n.loading?b(n.$slots,"loadingicon",{key:0,class:d([n.cx("loadingIcon"),n.cx("icon")])},function(){return[n.loadingIcon?(a(),p("span",e({key:0,class:[n.cx("loadingIcon"),n.cx("icon"),n.loadingIcon]},n.ptm("loadingIcon")),null,16)):(a(),l(v,e({key:1,class:[n.cx("loadingIcon"),n.cx("icon")],spin:""},n.ptm("loadingIcon")),null,16,["class"]))]}):b(n.$slots,"icon",{key:1,class:d([n.cx("icon")])},function(){return[n.icon?(a(),p("span",e({key:0,class:[n.cx("icon"),n.icon,n.iconClass]},n.ptm("icon")),null,16)):g("",!0)]}),I("span",e({class:n.cx("label")},n.ptm("label")),A(n.label||" "),17),n.badge?(a(),l(h,e({key:2,value:n.badge,class:n.badgeClass,severity:n.badgeSeverity,unstyled:n.unstyled},n.ptm("pcBadge")),null,16,["value","class","severity","unstyled"])):g("",!0)]})]}),_:3},16,["class"])),[[f]])}D.render=L;export{D as s};
