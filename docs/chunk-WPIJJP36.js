import{a as k}from"./chunk-AJ3UBX7E.js";import{c as B}from"./chunk-KZEI6RKT.js";import{$a as v,Ga as y,Ha as _,Ia as a,Ja as l,L as p,Oa as C,Pa as x,Qa as c,U as d,V as m,Z as r,bb as b,gb as I,ia as u,na as f,tb as R,wa as g,xb as w,za as h}from"./chunk-7BPNVVWP.js";var G=n=>{let t={};for(let e in n)Array.isArray(n[e])?t[e]=n[e].reduce((i,o)=>(i.push(G(o)),i),[]):n[e]?.uuid!=null?t[e]=n[e].uuid:t[e]=n[e];return t},$=n=>{let t={};for(let e in n)Array.isArray(n[e])?t[e]=n[e].filter(i=>i!=null).map($):n[e]!=null&&(t[e]=n[e]);return t};var A=(n,t)=>t.value;function S(n,t){if(n&1){let e=C();a(0,"lg-button",2),x("click",function(){let o=d(e),s=o.$implicit,E=o.$index,V=c();return m(V.onClickItem(s,E))}),v(1),l()}if(n&2){let e=t.$implicit,i=t.$index,o=t.$count,s=c();h(e.style||"default"),g("active",s.activeIndex()==i)("noLeftRadius",i===o-1)("noRightRadius",i===0)("noRadius",i!==0&&i!==o-1),u(),b(" ",e.label," ")}}var T=class n{items=w();activeIndex=r(0);onClickItem(t,e){this.activeIndex.set(e),this.writeValue(t.value),t.onClick()}value=r("");effect=R(()=>{let t=this.items()?.findIndex(e=>e.value===this.value())??-1;this.activeIndex.set(t===-1?0:t)});onChange=()=>{};onTouched=()=>{};writeValue(t){this._change(t)}registerOnChange(t){this.onChange=t}registerOnTouched(t){this.onTouched=t}onChangeInput(t){this._change(t.target.value)}_change(t){this.value.set(t),this.onChange(this.value())}static \u0275fac=function(e){return new(e||n)};static \u0275cmp=f({type:n,selectors:[["lg-buttons-group"]],inputs:{items:[1,"items"]},features:[I([{provide:k,useExisting:p(()=>n),multi:!0}])],decls:3,vars:0,consts:[[1,"buttons-group"],[3,"active","style","noLeftRadius","noRightRadius","noRadius"],[3,"click","active","noLeftRadius","noRightRadius","noRadius"]],template:function(e,i){e&1&&(a(0,"div",0),y(1,S,2,7,"lg-button",1,A),l()),e&2&&(u(),_(i.items()))},dependencies:[B],styles:[`.buttons-group{display:flex}.buttons-group lg-button{flex:1}.buttons-group lg-button button{width:100%}
`],encapsulation:2})};export{G as a,$ as b,T as c};
