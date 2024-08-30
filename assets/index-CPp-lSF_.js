import{a as G}from"../js/vendor/styled-BqWM25Q9.js";import{i as Y}from"../js/vendor/themes-DL8JkT7U.js";import{c as z}from"../js/vendor/runtime-dom-DPieCLYf.js";import{b as W,o,e as p,c as T,E as $,q as O,f as K,F as I,p as J,v as U,l as A,k as Q,n as X,h as y,g,G as Z,H as ee}from"../js/vendor/runtime-core-Bo7vMbeO.js";import{u as te,a as ae,c as se,b as le}from"../js/vendor/dist-Bdb8ILV-.js";import{s as re}from"../js/vendor/toggleswitch-By79tnAC.js";import{s as oe}from"../js/vendor/selectbutton-CmFX74ex.js";import{s as ie}from"../js/vendor/progressspinner-D6wsPu61.js";import{s as ne}from"../js/vendor/select-B0mE4uEv.js";import{d as ue}from"../js/vendor/lib-oVxhnyrt.js";import{s as de}from"../js/vendor/column-BTyuqk1b.js";import{s as ce}from"../js/vendor/datatable-BhFyI10z.js";import{u as t,r as w}from"../js/vendor/reactivity-Dhx2IWMo.js";import{n as fe,t as pe}from"../js/vendor/shared-7YLTi_yj.js";import{P as me}from"../js/vendor/core-E-lCN-sd.js";import"../js/vendor/utils-CXbrStuA.js";import"../js/vendor/ripple-BoKhGZ72.js";import"../js/vendor/togglebutton-C-a0e0_C.js";import"../js/vendor/icons-C9KxCpTf.js";import"../js/vendor/iconfield-CrOWoswL.js";import"../js/vendor/inputicon-CEN7Asii.js";import"../js/vendor/inputtext-DhJGGmea.js";import"../js/vendor/overlayeventbus-BSK1J2z9.js";import"../js/vendor/portal-Dzph0WyN.js";import"../js/vendor/virtualscroller-BQVYF_MY.js";import"../js/vendor/paginator-Bnv_e104.js";import"../js/vendor/inputnumber-DeThhC9L.js";import"../js/vendor/button-CVa3KTbL.js";import"../js/vendor/badge-DSBxIqxw.js";import"../js/vendor/checkbox-CN1GMljm.js";import"../js/vendor/radiobutton-SBnvdo6z.js";import"../js/vendor/focustrap-DwTpslTT.js";(function(){const n=document.createElement("link").relList;if(n&&n.supports&&n.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))a(s);new MutationObserver(s=>{for(const r of s)if(r.type==="childList")for(const m of r.addedNodes)m.tagName==="LINK"&&m.rel==="modulepreload"&&a(m)}).observe(document,{childList:!0,subtree:!0});function l(s){const r={};return s.integrity&&(r.integrity=s.integrity),s.referrerPolicy&&(r.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?r.credentials="include":s.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function a(s){if(s.ep)return;s.ep=!0;const r=l(s);fetch(s.href,r)}})();const x=(e,n)=>{const l=e.__vccOpts||e;for(const[a,s]of n)l[a]=s;return l},he={};function ve(e,n){const l=W("router-view");return o(),p(l)}const ge=x(he,[["render",ve]]),ye="/torps-fpl/assets/torps_logo-DaOS8Yjd.png",be={__name:"Table",props:["data","columns","tableHeight","display","sortable"],setup(e){return(n,l)=>(o(),T("div",{class:fe({hidden:!e.display})},[l[0]||($(-1),(l[0]=O(t(ce),{value:e.data,scrollable:"","scroll-height":e.tableHeight},{default:K(()=>[(o(!0),T(I,null,J(e.columns,a=>(o(),p(t(de),{key:a.field,field:a.field,header:a.header,frozen:a.field==="player",sortable:e.sortable},null,8,["field","header","frozen","sortable"]))),128))]),_:1},8,["value","scroll-height"])).cacheIndex=0,$(1),l[0])],2))}},P=x(be,[["__scopeId","data-v-705c6dbf"]]),V=e=>(e="/torps-fpl/"+e,new Promise((n,l)=>{fetch(e).then(a=>{if(!a.ok)throw new Error(`HTTP error! status: ${a.status}`);return a.json()}).then(a=>{n(a)}).catch(a=>{l(a)})})),F=e=>V(`${e}_render_players.json`),N=e=>V(`${e}_render_teams.json`),_e=()=>V("last_updated.json"),M=e=>(Z("data-v-22f363c1"),e=e(),ee(),e),we={class:"container"},Pe={class:"title"},ke=M(()=>y("img",{src:ye,alt:"logo"},null,-1)),He={class:"text"},Te=M(()=>y("h1",null,"Torps Fantasy League",-1)),Se={class:"actions"},Oe={key:0,class:"show-extended"},Le=M(()=>y("p",null,"Show all player data",-1)),R=["Players","Teams"],q=["Club","Firsts"],B=[{field:"rank",header:"Rank",default:!0},{field:"name",header:"Team Name",default:!0},{field:"owner",header:"Owner",default:!0},{field:"currentPoints",header:"Points",default:!0},{field:"points",header:"Total",default:!0}],L=[{field:"player",header:"Player",default:!0},{field:"position",header:"Position",default:!1},{field:"games",header:"Games",default:!0},{field:"goals",header:"Goals",default:!0},{field:"assists",header:"Assists",default:!0},{field:"wins",header:"Wins",default:!1},{field:"losses",header:"Losses",default:!1},{field:"draws",header:"Draws",default:!1},{field:"minutes_played",header:"Minutes",default:!1},{field:"motm_votes",header:"Votes",default:!1},{field:"yellow_card",header:"Yellows",default:!1},{field:"red_card",header:"Reds",default:!1},{field:"own_goal",header:"Own Goals",default:!1},{field:"clean_sheet",header:"Clean Sheets",default:!1},{field:"penalty_save",header:"Penalty Saves",default:!1},{field:"currentPoints",header:"Points",default:!0},{field:"points",header:"Total",default:!0}],D=L.filter(e=>e.default),xe={__name:"Main",setup(e){const n=te(),l=ae();let a,s,r,m,k,h;const E=w(!0),v=w(!1),S=w(!1),b=w(n.query.tab||R[0]),_=w(n.query.source||q[0]),c=w(window.innerHeight>768),u=U(()=>_.value==="Firsts"),i=U(()=>b.value==="Players"),j=()=>{const f=document.querySelector(".actions").getBoundingClientRect().bottom;return window.visualViewport.height-f-32+"px"};return A(b,f=>{l.push({query:{tab:f,source:_.value}})}),A(_,f=>{l.push({query:{tab:b.value,source:f}})}),Q(async()=>{h=j(),a=await F("firsts"),s=await F("club"),r=await N("firsts"),r=r.map((f,d)=>({...f,rank:d+1})),m=await N("club"),m=m.map((f,d)=>({...f,rank:d+1})),k=await _e(),k=new Date(k.lastUpdated),l.push({query:{tab:b.value,source:_.value}}),setTimeout(()=>{v.value=!0,X(()=>{S.value=!0})},1),E.value=!1}),(f,d)=>(o(),T("div",we,[y("div",Pe,[ke,y("span",He,[Te,y("p",null,"Last updated: "+pe(t(k)?t(ue)(t(k),"yyyy-mm-dd HH:MM"):""),1)])]),O(t(oe),{modelValue:b.value,"onUpdate:modelValue":d[0]||(d[0]=H=>b.value=H),options:R,allowEmpty:!1,class:"selector",disabled:!S.value},null,8,["modelValue","disabled"]),y("div",Se,[O(t(ne),{modelValue:_.value,"onUpdate:modelValue":d[1]||(d[1]=H=>_.value=H),options:q,allowEmpty:!1,disabled:!S.value},null,8,["modelValue","disabled"]),i.value?(o(),T("div",Oe,[Le,O(t(re),{modelValue:c.value,"onUpdate:modelValue":d[2]||(d[2]=H=>c.value=H),disabled:!S.value},null,8,["modelValue","disabled"])])):g("",!0)]),E.value?(o(),p(t(ie),{key:0,style:{width:"50px",height:"50px"},strokeWidth:"4",fill:"transparent",animationDuration:".5s"})):(o(),T(I,{key:1},[u.value&&i.value&&c.value||v.value?(o(),p(P,{key:0,data:t(a),columns:L,tableHeight:t(h),display:u.value&&i.value&&c.value,sortable:!0},null,8,["data","tableHeight","display"])):g("",!0),u.value&&i.value&&!c.value||v.value?(o(),p(P,{key:1,data:t(a),columns:t(D),tableHeight:t(h),display:u.value&&i.value&&!c.value,sortable:!1},null,8,["data","columns","tableHeight","display"])):g("",!0),!u.value&&i.value&&c.value||v.value?(o(),p(P,{key:2,data:t(s),columns:L,tableHeight:t(h),display:!u.value&&i.value&&c.value,sortable:!0},null,8,["data","tableHeight","display"])):g("",!0),!u.value&&i.value&&!c.value||v.value?(o(),p(P,{key:3,data:t(s),columns:t(D),tableHeight:t(h),display:!u.value&&i.value&&!c.value,sortable:!1},null,8,["data","columns","tableHeight","display"])):g("",!0),u.value&&!i.value||v.value?(o(),p(P,{key:4,data:t(r),columns:B,tableHeight:t(h),display:u.value&&!i.value,sortable:!1},null,8,["data","tableHeight","display"])):g("",!0),!u.value&&!i.value||v.value?(o(),p(P,{key:5,data:t(m),columns:B,tableHeight:t(h),display:!u.value&&!i.value,sortable:!1},null,8,["data","tableHeight","display"])):g("",!0)],64))]))}},Ve=x(xe,[["__scopeId","data-v-22f363c1"]]),Me=[{path:"/",component:Ve}],Ce=se({history:le("/torps-fpl/"),routes:Me}),Ee=G(Y,{semantic:{transitionDuration:"0.05s",primary:{50:"{orange.50}",100:"{orange.100}",200:"{orange.200}",300:"{orange.300}",400:"{orange.400}",500:"{orange.500}",600:"{orange.600}",700:"{orange.700}",800:"{orange.800}",900:"{orange.900}",950:"{orange.950}"},colorScheme:{light:{surface:{0:"#fffdf9",50:"{orange.50}",100:"{orange.100}",200:"{orange.200}",300:"{orange.300}",400:"{orange.400}",500:"{orange.500}",600:"{orange.600}",700:"{orange.700}",800:"{orange.800}",900:"{orange.900}",950:"{orange.950}"},formField:{disabledBackground:"#f5f5f5",disabledColor:"#b3b3b3"},text:{color:"#000"}}}}}),C=z(ge);C.use(Ce);C.mount("#app");C.use(me,{theme:{preset:Ee,options:{darkModeSelector:".fake-dark-selector"}}});
