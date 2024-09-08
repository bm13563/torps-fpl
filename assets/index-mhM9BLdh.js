import{a as j}from"../js/vendor/styled-BqWM25Q9.js";import{i as Y}from"../js/vendor/themes-DL8JkT7U.js";import{c as z}from"../js/vendor/runtime-dom-DPieCLYf.js";import{b as W,o,e as p,c as k,E as $,q as T,f as K,F as I,p as J,v as A,l as D,k as Q,h as y,g,G as X,H as Z}from"../js/vendor/runtime-core-Bo7vMbeO.js";import{u as ee,a as te,c as ae,b as se}from"../js/vendor/dist-Bdb8ILV-.js";import{s as le}from"../js/vendor/toggleswitch-By79tnAC.js";import{s as re}from"../js/vendor/selectbutton-CmFX74ex.js";import{s as oe}from"../js/vendor/progressspinner-D6wsPu61.js";import{s as ne}from"../js/vendor/select-B0mE4uEv.js";import{d as ie}from"../js/vendor/lib-oVxhnyrt.js";import{s as ue}from"../js/vendor/column-BTyuqk1b.js";import{s as de}from"../js/vendor/datatable-BhFyI10z.js";import{u as a,r as S}from"../js/vendor/reactivity-Dhx2IWMo.js";import{n as ce,t as fe}from"../js/vendor/shared-7YLTi_yj.js";import{P as pe}from"../js/vendor/core-E-lCN-sd.js";import"../js/vendor/utils-CXbrStuA.js";import"../js/vendor/ripple-BoKhGZ72.js";import"../js/vendor/togglebutton-C-a0e0_C.js";import"../js/vendor/icons-C9KxCpTf.js";import"../js/vendor/iconfield-CrOWoswL.js";import"../js/vendor/inputicon-CEN7Asii.js";import"../js/vendor/inputtext-DhJGGmea.js";import"../js/vendor/overlayeventbus-BSK1J2z9.js";import"../js/vendor/portal-Dzph0WyN.js";import"../js/vendor/virtualscroller-BQVYF_MY.js";import"../js/vendor/paginator-Bnv_e104.js";import"../js/vendor/inputnumber-DeThhC9L.js";import"../js/vendor/button-CVa3KTbL.js";import"../js/vendor/badge-DSBxIqxw.js";import"../js/vendor/checkbox-CN1GMljm.js";import"../js/vendor/radiobutton-SBnvdo6z.js";import"../js/vendor/focustrap-DwTpslTT.js";(function(){const n=document.createElement("link").relList;if(n&&n.supports&&n.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))s(e);new MutationObserver(e=>{for(const l of e)if(l.type==="childList")for(const m of l.addedNodes)m.tagName==="LINK"&&m.rel==="modulepreload"&&s(m)}).observe(document,{childList:!0,subtree:!0});function i(e){const l={};return e.integrity&&(l.integrity=e.integrity),e.referrerPolicy&&(l.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?l.credentials="include":e.crossOrigin==="anonymous"?l.credentials="omit":l.credentials="same-origin",l}function s(e){if(e.ep)return;e.ep=!0;const l=i(e);fetch(e.href,l)}})();const M=(t,n)=>{const i=t.__vccOpts||t;for(const[s,e]of n)i[s]=e;return i},me={};function he(t,n){const i=W("router-view");return o(),p(i)}const ge=M(me,[["render",he]]),ye="/torps-fpl/assets/torps_logo-DaOS8Yjd.png",ve={__name:"Table",props:["data","columns","tableHeight","display","sortable"],setup(t){const n=t;return(i,s)=>(o(),k("div",{class:ce({hidden:!t.display})},[s[0]||($(-1),(s[0]=T(a(de),{value:t.data,scrollable:"",scrollHeight:`${n.tableHeight}px`,"virtual-scroller-options":{itemSize:39,appendOnly:!0}},{default:K(()=>[(o(!0),k(I,null,J(t.columns,e=>(o(),p(a(ue),{key:e.field,field:e.field,header:e.header,frozen:e.field==="player",sortable:t.sortable},null,8,["field","header","frozen","sortable"]))),128))]),_:1},8,["value","scrollHeight"])).cacheIndex=0,$(1),s[0])],2))}},w=M(ve,[["__scopeId","data-v-580904d4"]]),x=t=>(t="/torps-fpl/"+t,new Promise((n,i)=>{fetch(t).then(s=>{if(!s.ok)throw new Error(`HTTP error! status: ${s.status}`);return s.json()}).then(s=>{n(s)}).catch(s=>{i(s)})})),U=t=>x(`${t}_render_players.json`),F=t=>x(`${t}_render_teams.json`),be=()=>x("last_updated.json"),V=t=>(X("data-v-4aba83ac"),t=t(),Z(),t),_e={class:"container"},we={class:"title"},Pe=V(()=>y("img",{src:ye,alt:"logo"},null,-1)),He={class:"text"},ke=V(()=>y("h1",null,"Torps Fantasy League",-1)),Se={class:"actions"},Te={key:0,class:"show-extended"},Oe=V(()=>y("p",null,"Show all player data",-1)),N=["Players","Teams"],R=["Club","Firsts"],q=[{field:"rank",header:"Rank",default:!0},{field:"name",header:"Team Name",default:!0},{field:"owner",header:"Owner",default:!0},{field:"points",header:"Points",default:!0},{field:"points",header:"Total",default:!0}],L=[{field:"player",header:"Player",default:!0},{field:"position",header:"Position",default:!1},{field:"games",header:"Games",default:!0},{field:"Goals",header:"Goals",default:!0},{field:"Assists",header:"Assists",default:!0},{field:"Wins",header:"Wins",default:!1},{field:"Losses",header:"Losses",default:!1},{field:"Draws",header:"Draws",default:!1},{field:"Minutes Played",header:"Minutes",default:!1},{field:"MOTM Votes",header:"Votes",default:!1},{field:"Yellow Cards",header:"Yellows",default:!1},{field:"Red Cards",header:"Reds",default:!1},{field:"Own Goals",header:"Own Goals",default:!1},{field:"Clean Sheet",header:"Clean Sheets",default:!1},{field:"Penalty Saves",header:"Penalty Saves",default:!1},{field:"Points",header:"Points",default:!0},{field:"Total",header:"Total",default:!0}],B=L.filter(t=>t.default),Le={__name:"Main",setup(t){const n=ee(),i=te();let s,e,l,m,P,h,O=[];const E=S(!0),v=S(n.query.tab||N[0]),b=S(n.query.source||R[0]),f=S(window.innerHeight>768),d=A(()=>b.value==="Firsts"),u=A(()=>v.value==="Players"),G=()=>{const c=document.querySelector(".actions").getBoundingClientRect().bottom;return window.visualViewport.height-c-32},_=(c,r)=>c||O.includes(r)?(O.includes(r)||O.push(r),!0):!1;return D(v,c=>{i.push({query:{tab:c,source:b.value}})}),D(b,c=>{i.push({query:{tab:v.value,source:c}})}),Q(async()=>{h=G(),s=await U("firsts"),e=await U("club"),l=await F("firsts"),l=l.map((c,r)=>({...c,rank:r+1})),m=await F("club"),m=m.map((c,r)=>({...c,rank:r+1})),P=await be(),P=new Date(P.lastUpdated),i.push({query:{tab:v.value,source:b.value}}),E.value=!1}),(c,r)=>(o(),k("div",_e,[y("div",we,[Pe,y("span",He,[ke,y("p",null,"Last updated: "+fe(a(P)?a(ie)(a(P),"yyyy-mm-dd HH:MM"):""),1)])]),T(a(re),{modelValue:v.value,"onUpdate:modelValue":r[0]||(r[0]=H=>v.value=H),options:N,allowEmpty:!1,class:"selector"},null,8,["modelValue"]),y("div",Se,[T(a(ne),{modelValue:b.value,"onUpdate:modelValue":r[1]||(r[1]=H=>b.value=H),options:R,allowEmpty:!1},null,8,["modelValue"]),u.value?(o(),k("div",Te,[Oe,T(a(le),{modelValue:f.value,"onUpdate:modelValue":r[2]||(r[2]=H=>f.value=H)},null,8,["modelValue"])])):g("",!0)]),E.value?(o(),p(a(oe),{key:0,style:{width:"50px",height:"50px"},strokeWidth:"4",fill:"transparent",animationDuration:".5s"})):(o(),k(I,{key:1},[_(d.value&&u.value&&f.value,"firstsPlayersExtended")?(o(),p(w,{key:0,data:a(s),columns:L,tableHeight:a(h),display:d.value&&u.value&&f.value,sortable:!0},null,8,["data","tableHeight","display"])):g("",!0),_(d.value&&u.value&&!f.value,"firstsPlayersDefault")?(o(),p(w,{key:1,data:a(s),columns:a(B),tableHeight:a(h),display:d.value&&u.value&&!f.value,sortable:!1},null,8,["data","columns","tableHeight","display"])):g("",!0),_(!d.value&&u.value&&f.value,"clubPlayersExtended")?(o(),p(w,{key:2,data:a(e),columns:L,tableHeight:a(h),display:!d.value&&u.value&&f.value,sortable:!0},null,8,["data","tableHeight","display"])):g("",!0),_(!d.value&&u.value&&!f.value,"clubPlayersDefault")?(o(),p(w,{key:3,data:a(e),columns:a(B),tableHeight:a(h),display:!d.value&&u.value&&!f.value,sortable:!1},null,8,["data","columns","tableHeight","display"])):g("",!0),_(d.value&&!u.value,"firstsTeams")?(o(),p(w,{key:4,data:a(l),columns:q,tableHeight:a(h),display:d.value&&!u.value,sortable:!1},null,8,["data","tableHeight","display"])):g("",!0),_(!d.value&&!u.value,"clubTeams")?(o(),p(w,{key:5,data:a(m),columns:q,tableHeight:a(h),display:!d.value&&!u.value,sortable:!1},null,8,["data","tableHeight","display"])):g("",!0)],64))]))}},Me=M(Le,[["__scopeId","data-v-4aba83ac"]]),xe=[{path:"/",component:Me}],Ve=ae({history:se("/torps-fpl/"),routes:xe}),Ce=j(Y,{semantic:{transitionDuration:"0.05s",primary:{50:"{orange.50}",100:"{orange.100}",200:"{orange.200}",300:"{orange.300}",400:"{orange.400}",500:"{orange.500}",600:"{orange.600}",700:"{orange.700}",800:"{orange.800}",900:"{orange.900}",950:"{orange.950}"},colorScheme:{light:{surface:{0:"#fffdf9",50:"{orange.50}",100:"{orange.100}",200:"{orange.200}",300:"{orange.300}",400:"{orange.400}",500:"{orange.500}",600:"{orange.600}",700:"{orange.700}",800:"{orange.800}",900:"{orange.900}",950:"{orange.950}"},formField:{disabledBackground:"#f5f5f5",disabledColor:"#b3b3b3"},text:{color:"#000"}}}}}),C=z(ge);C.use(Ve);C.mount("#app");C.use(pe,{theme:{preset:Ce,options:{darkModeSelector:".fake-dark-selector"}}});