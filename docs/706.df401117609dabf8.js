"use strict";(self.webpackChunklasagna=self.webpackChunklasagna||[]).push([[706],{553:(M,c,t)=>{t.d(c,{i:()=>r});var n=t(1007);const e=["*"];let r=(()=>{class i{constructor(){}flat=(0,n.hFB)(!1);center=(0,n.hFB)(!1);static \u0275fac=function(l){return new(l||i)};static \u0275cmp=n.VBU({type:i,selectors:[["lg-card"]],inputs:{flat:[1,"flat"],center:[1,"center"]},ngContentSelectors:e,decls:2,vars:4,consts:[[1,"card"]],template:function(l,d){1&l&&(n.NAR(),n.j41(0,"div",0),n.SdG(1),n.k0s()),2&l&&n.AVh("flat",d.flat())("center",d.center())},styles:["[_nghost-%COMP%]{display:flex;width:100%}.card[_ngcontent-%COMP%]{background-color:#fff;padding:24px;border-radius:32px;width:100%;display:flex;flex-direction:column;overflow:hidden}.card.flat[_ngcontent-%COMP%]{padding:0}.card.center[_ngcontent-%COMP%]{justify-content:center;align-items:center}"]})}return i})()},1086:(M,c,t)=>{t.d(c,{W:()=>r});var n=t(1007);const e=["*"];let r=(()=>{class i{level=(0,n.vPA)(1);static \u0275fac=function(l){return new(l||i)};static \u0275cmp=n.VBU({type:i,selectors:[["lg-title"]],ngContentSelectors:e,decls:2,vars:0,consts:[["role","heading",1,"title"]],template:function(l,d){1&l&&(n.NAR(),n.j41(0,"p",0),n.SdG(1),n.k0s())},styles:[".title[_ngcontent-%COMP%]{font-size:1.5em;font-weight:700;margin:0}"]})}return i})()},7468:(M,c,t)=>{t.d(c,{p:()=>d});var n=t(1985),e=t(3073),r=t(8750),i=t(9326),C=t(4360),p=t(6450),l=t(8496);function d(...g){const O=(0,i.ms)(g),{args:f,keys:R}=(0,e.D)(g),P=new n.c(m=>{const{length:o}=f;if(!o)return void m.complete();const E=new Array(o);let s=o,_=o;for(let a=0;a<o;a++){let u=!1;(0,r.Tg)(f[a]).subscribe((0,C._)(m,D=>{u||(u=!0,_--),E[a]=D},()=>s--,void 0,()=>{(!s||!u)&&(_||m.next(R?(0,l.e)(R,E):E),m.complete())}))}});return O?P.pipe((0,p.I)(O)):P}},7579:(M,c,t)=>{t.r(c),t.d(c,{RecipesListComponent:()=>m});var n=t(467),e=t(1007),r=t(7512),i=t(1119),C=t(1636),p=t(1072),l=t(5642),d=t(1086),g=t(332),O=t(10),f=t(9512);function R(o,E){if(1&o){const s=e.RV6();e.j41(0,"lg-gap-row",0)(1,"div",3)(2,"a",4),e.EFF(3),e.k0s()(),e.j41(4,"lg-button",5),e.EFF(5," Calculate "),e.k0s(),e.j41(6,"lg-button",6),e.bIt("click",function(){e.eBV(s);const a=e.XpG().$implicit,u=e.XpG();return e.Njj(u.deleteRecipe(a))}),e.nrm(7,"mat-icon",7),e.k0s()()}if(2&o){const s=e.XpG().$implicit;e.Y8G("center",!0),e.R7$(2),e.Y8G("routerLink","/edit-recipe/"+s.uuid),e.R7$(),e.JRh(s.name),e.R7$(),e.Aen("primary"),e.Y8G("size","small")("link","/calc-recipe/"+s.uuid)("flat",!0),e.R7$(2),e.Aen("danger"),e.Y8G("size","small")("icon",!0)}}function P(o,E){1&o&&e.DNE(0,R,8,12,"ng-template",2)}let m=(()=>{class o{_recipesRepository;constructor(s){this._recipesRepository=s}recipes=(0,e.vPA)([]);deleteRecipe(s){this._recipesRepository.deleteRecipe(s.uuid).then(()=>{this.loadRecipes()})}ngOnInit(){var s=this;return(0,n.A)(function*(){yield s.loadRecipes()})()}loadRecipes(){this._recipesRepository.getRecipes().then(s=>{const _=s.toSorted((a,u)=>a.name.localeCompare(u.name));this.recipes.set(_)})}static \u0275fac=function(_){return new(_||o)(e.rXU(f.m))};static \u0275cmp=e.VBU({type:o,selectors:[["lg-recipes-list"]],decls:9,vars:6,consts:[[3,"center"],[3,"flat","link","size"],["lgCardListItem",""],[1,"expand"],[3,"routerLink"],[3,"size","link","flat"],[3,"click","size","icon"],["aria-hidden","false","aria-label","Example home icon","fontIcon","close"]],template:function(_,a){1&_&&(e.j41(0,"lg-container")(1,"lg-gap-row",0)(2,"lg-title"),e.EFF(3," Recipes "),e.k0s(),e.j41(4,"lg-button",1),e.EFF(5," Add "),e.k0s()(),e.j41(6,"lg-card-list"),e.Z7z(7,P,1,0,null,2,e.Vm6),e.k0s()()),2&_&&(e.R7$(),e.Y8G("center",!0),e.R7$(3),e.Aen("primary"),e.Y8G("flat",!0)("link","/add-recipe")("size","small"),e.R7$(3),e.Dyx(a.recipes()))},dependencies:[r.I,i.Q,C.Wk,p.d,l.H,d.W,g.Y,O.p],styles:["[_nghost-%COMP%]{display:block}"]})}return o})()}}]);