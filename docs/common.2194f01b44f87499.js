"use strict";(self.webpackChunklasagna=self.webpackChunklasagna||[]).push([[76],{8710:(f,m,s)=>{s.d(m,{e:()=>p});var e=s(1007),l=s(9417),c=s(3333),u=s(7782),E=s(1086),o=s(177);function C(n,d){if(1&n&&(e.EFF(0),e.nI1(1,"number")),2&n){const i=e.XpG();e.SpI(" ~ ",e.i5U(1,1,i.calculated(),"1.")," grams ")}}function g(n,d){if(1&n&&(e.EFF(0),e.nI1(1,"number")),2&n){const i=e.XpG();e.SpI(" ~ ",e.i5U(1,1,i.calculated(),"1.")," grams ")}}function a(n,d){if(1&n&&(e.EFF(0),e.nI1(1,"number")),2&n){const i=e.XpG();e.SpI(" ~ ",e.i5U(1,1,i.calculated(),"1.")," grams ")}}let p=(()=>{class n{eggs=(0,e.geq)(null);selected=(0,e.vPA)("small");calculated=(0,e.EWP)(()=>{const i=parseFloat(this.eggs()??""),t={small:46,medium:50,large:59}[this.selected()];return i&&t?i*t:""});changed=(0,e.CGW)();onChooseEggSize(i){this.selected.set(i),this.changed.emit(this.calculated())}static \u0275fac=function(_){return new(_||n)};static \u0275cmp=e.VBU({type:n,selectors:[["lg-eggs-widget"]],inputs:{eggs:[1,"eggs"]},outputs:{eggs:"eggsChange",changed:"changed"},decls:17,vars:13,consts:[[3,"size"],[3,"ngModelChange","ngModel","placeholder","theme"],[1,"eggs-widget__eggs"],[1,"eggs-widget__egg",3,"click"],["alt","Egg","src","img/egg.svg"]],template:function(_,t){1&_&&(e.j41(0,"lg-gap-column",0)(1,"lg-title"),e.EFF(2," Convert eggs to grams "),e.k0s(),e.j41(3,"lg-input",1),e.mxI("ngModelChange",function(h){return e.DH7(t.eggs,h)||(t.eggs=h),h}),e.bIt("ngModelChange",function(){return t.changed.emit(t.calculated())}),e.k0s(),e.j41(4,"div",2)(5,"div",3),e.bIt("click",function(){return t.onChooseEggSize("small")}),e.nrm(6,"img",4),e.EFF(7," Small "),e.DNE(8,C,2,4),e.k0s(),e.j41(9,"div",3),e.bIt("click",function(){return t.onChooseEggSize("medium")}),e.nrm(10,"img",4),e.EFF(11," Medium "),e.DNE(12,g,2,4),e.k0s(),e.j41(13,"div",3),e.bIt("click",function(){return t.onChooseEggSize("large")}),e.nrm(14,"img",4),e.EFF(15," Large "),e.DNE(16,a,2,4),e.k0s()()()),2&_&&(e.Y8G("size","medium"),e.R7$(3),e.R50("ngModel",t.eggs),e.Y8G("placeholder","How many eggs do you have?")("theme","contrast"),e.R7$(2),e.AVh("selected","small"===t.selected()),e.R7$(3),e.vxM("small"===t.selected()&&t.calculated()?8:-1),e.R7$(),e.AVh("selected","medium"===t.selected()),e.R7$(3),e.vxM("medium"===t.selected()&&t.calculated()?12:-1),e.R7$(),e.AVh("selected","large"===t.selected()),e.R7$(3),e.vxM("large"===t.selected()&&t.calculated()?16:-1))},dependencies:[l.YN,l.BC,l.vS,c.S,u.K,E.W,o.QX],styles:[":host{--control-bg: #fcfcfc}lg-eggs-widget{display:flex}.eggs-widget{display:flex;flex-direction:column}.eggs-widget__eggs{display:flex;align-items:flex-end;gap:8px}.eggs-widget__eggs img{width:40px}.eggs-widget__egg{display:flex;align-items:center;justify-content:center;flex:1;flex-direction:column;white-space:nowrap;gap:8px;background-color:var(--control-bg);border-radius:24px;padding:16px}.eggs-widget__egg:first-child img{transform:scale(.8)}.eggs-widget__egg:last-child img{transform:scale(1.2)}.eggs-widget__egg.selected{background-color:#61b789}.eggs-widget__egg.selected:first-child{background-color:#b4b8f8}.eggs-widget__egg.selected:last-child{background-color:#ff8080}\n"],encapsulation:2})}return n})()},9512:(f,m,s)=>{s.d(m,{m:()=>E});var e=s(467),l=s(4374),c=s(1007),u=s(6659);let E=(()=>{class o{_indexDbService;constructor(g){this._indexDbService=g}addRecipe(g){var a=this;return(0,e.A)(function*(){return a._indexDbService.addData(l.F.RECIPES,g)})()}getRecipes(){return this._indexDbService.getAll(l.F.RECIPES)}getOne(g){var a=this;return(0,e.A)(function*(){return new Promise(function(){var p=(0,e.A)(function*(n,d){g?(g=g.uuid||g,yield a._indexDbService.getOne(l.F.RECIPES,g).then(i=>{n(i)})):n(void 0)});return function(n,d){return p.apply(this,arguments)}}())})()}editRecipe(g,a){return this._indexDbService.replaceData(l.F.RECIPES,g,a)}deleteRecipe(g){return this._indexDbService.remove(l.F.RECIPES,g)}static \u0275fac=function(a){return new(a||o)(c.KVO(u.j))};static \u0275prov=c.jDH({token:o,factory:o.\u0275fac,providedIn:"root"})}return o})()}}]);