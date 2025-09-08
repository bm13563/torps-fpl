import{B as t,s as o}from"./core-CJpRk7Fj.js";import{o as c,c as a,r,m as s}from"./runtime-core-DoRzylV4.js";var d=function(e){var n=e.dt;return`
.p-iconfield {
    position: relative;
}

.p-inputicon {
    position: absolute;
    top: 50%;
    margin-top: calc(-1 * (`.concat(n("icon.size"),` / 2));
    color: `).concat(n("iconfield.icon.color"),`;
    line-height: 1;
}

.p-iconfield .p-inputicon:first-child {
    left: `).concat(n("form.field.padding.x"),`;
}

.p-iconfield .p-inputicon:last-child {
    right: `).concat(n("form.field.padding.x"),`;
}

.p-iconfield .p-inputtext:not(:first-child) {
    padding-left: calc((`).concat(n("form.field.padding.x")," * 2) + ").concat(n("icon.size"),`);
}

.p-iconfield .p-inputtext:not(:last-child) {
    padding-right: calc((`).concat(n("form.field.padding.x")," * 2) + ").concat(n("icon.size"),`);
}
`)},l={root:"p-iconfield"},p=t.extend({name:"iconfield",theme:d,classes:l}),f={name:"BaseIconField",extends:o,style:p,provide:function(){return{$pcIconField:this,$parentInstance:this}}},m={name:"IconField",extends:f,inheritAttrs:!1};function h(i,e,n,u,g,v){return c(),a("div",s({class:i.cx("root")},i.ptmi("root")),[r(i.$slots,"default")],16)}m.render=h;export{m as s};
