"use strict";(self.webpackChunklasagna=self.webpackChunklasagna||[]).push([[579],{7579:(y,a,i)=>{i.r(a),i.d(a,{RecipesListComponent:()=>M});var c=i(467),e=i(1007),r=i(7782),p=i(7512),u=i(1119),m=i(5554),E=i(1072),d=i(5642),R=i(1086),g=i(553),D=i(9512);function O(n,l){if(1&n){const t=e.RV6();e.j41(0,"lg-gap-row",0)(1,"div",2)(2,"a",3),e.EFF(3),e.k0s()(),e.j41(4,"lg-button",4),e.EFF(5," Edit "),e.k0s(),e.j41(6,"lg-button",5),e.bIt("click",function(){const s=e.eBV(t).$implicit,_=e.XpG();return e.Njj(_.deleteRecipe(s))}),e.nrm(7,"mat-icon",6),e.k0s()()}if(2&n){const t=l.$implicit;e.Y8G("center",!0),e.R7$(2),e.Y8G("routerLink","/calc-recipe/"+t.uuid),e.R7$(),e.JRh(t.name),e.R7$(),e.Aen("primary"),e.Y8G("size","small")("link","/edit-recipe/"+t.uuid)("flat",!0),e.R7$(2),e.Aen("danger"),e.Y8G("size","small")("icon",!0)}}function P(n,l){1&n&&(e.j41(0,"div"),e.EFF(1,"No recipes found"),e.k0s())}let M=(()=>{class n{_recipesRepository;constructor(t){this._recipesRepository=t}recipes=(0,e.vPA)([]);deleteRecipe(t){this._recipesRepository.deleteRecipe(t.uuid,()=>{this.loadRecipes()})}ngOnInit(){var t=this;return(0,c.A)(function*(){yield t.loadRecipes()})()}loadRecipes(){this._recipesRepository.getRecipes(t=>{const o=t.toSorted((s,_)=>s.name.localeCompare(_.name));this.recipes.set(o)})}static \u0275fac=function(o){return new(o||n)(e.rXU(D.m))};static \u0275cmp=e.VBU({type:n,selectors:[["lg-recipes-list"]],decls:11,vars:7,consts:[[3,"center"],[3,"flat","link","size"],[1,"expand"],[3,"routerLink"],[3,"size","link","flat"],[3,"click","size","icon"],["aria-hidden","false","aria-label","Example home icon","fontIcon","close"]],template:function(o,s){1&o&&(e.j41(0,"lg-container")(1,"lg-gap-row",0)(2,"lg-title"),e.EFF(3," Recipes "),e.k0s(),e.j41(4,"lg-button",1),e.EFF(5," Add "),e.k0s()(),e.j41(6,"lg-card")(7,"lg-gap-column"),e.Z7z(8,O,8,12,"lg-gap-row",0,e.Vm6,!1,P,2,0,"div"),e.k0s()()()),2&o&&(e.R7$(),e.Y8G("center",!0),e.R7$(3),e.Aen("primary"),e.Y8G("flat",!0)("link","/add-recipe")("size","small"),e.R7$(4),e.Dyx(s.recipes()))},dependencies:[r.K,p.I,u.Q,m.Wk,E.d,d.H,R.W,g.i],styles:["[_nghost-%COMP%]{display:block}"]})}return n})()}}]);