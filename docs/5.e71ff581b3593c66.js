"use strict";(self.webpackChunklasagna=self.webpackChunklasagna||[]).push([[5],{8005:(U,d,c)=>{c.r(d),c.d(d,{ProductListComponent:()=>$});var u=c(467),t=c(1007),g=c(7512),v=c(1119),h=c(1072),y=c(5642),C=c(1086),p=c(177),m=c(4625),F=c(553);let f=(()=>{class o{template;constructor(n){this.template=n,console.log(n)}static \u0275fac=function(e){return new(e||o)(t.rXU(t.C4Q))};static \u0275dir=t.FsC({type:o,selectors:[["","lgCardListItem",""]]})}return o})();function j(o,a){if(1&o&&(t.j41(0,"div",2),t.eu8(1,3),t.k0s()),2&o){const n=a.$implicit;t.R7$(),t.Y8G("ngTemplateOutlet",n.template)}}function P(o,a){1&o&&(t.j41(0,"div"),t.EFF(1,"No items found"),t.k0s())}let R=(()=>{class o{constructor(){}items;static \u0275fac=function(e){return new(e||o)};static \u0275cmp=t.VBU({type:o,selectors:[["lg-card-list"]],contentQueries:function(e,r,s){if(1&e&&t.wni(s,f,4),2&e){let l;t.mGM(l=t.lsd())&&(r.items=l)}},decls:5,vars:2,consts:[[3,"flat"],[1,"lg-card-list"],[1,"lg-card-list__item"],[3,"ngTemplateOutlet"]],template:function(e,r){1&e&&(t.j41(0,"lg-card",0)(1,"section",1),t.Z7z(2,j,2,1,"div",2,t.Vm6,!1,P,2,0,"div"),t.k0s()()),2&e&&(t.Y8G("flat",!0),t.R7$(2),t.Dyx(r.items))},dependencies:[F.i,p.T3],styles:[":host{display:flex;width:100%}.lg-card-list{display:flex;flex-direction:column;width:100%;gap:32px;padding:24px 0}.lg-card-list__item{padding:0 24px}\n"],encapsulation:2})}return o})();const _=["*"];let k=(()=>{class o{filesSelected=(0,t.CGW)();accept=(0,t.hFB)(".csv");onFileChange(n){const r=n.target.files?.[0];r&&this.filesSelected.emit([r])}static \u0275fac=function(e){return new(e||o)};static \u0275cmp=t.VBU({type:o,selectors:[["lg-upload"]],inputs:{accept:[1,"accept"]},outputs:{filesSelected:"filesSelected"},ngContentSelectors:_,decls:5,vars:1,consts:[["input",""],[1,"lg-upload",3,"click"],["type","file",3,"change","accept"],[1,"lg-upload__content"]],template:function(e,r){if(1&e){const s=t.RV6();t.NAR(),t.j41(0,"div",1),t.bIt("click",function(){t.eBV(s);const i=t.sdS(2);return t.Njj(i.click())}),t.j41(1,"input",2,0),t.bIt("change",function(i){return t.eBV(s),t.Njj(r.onFileChange(i))}),t.k0s(),t.j41(3,"div",3),t.SdG(4),t.k0s()()}2&e&&(t.R7$(),t.Y8G("accept",r.accept()))},styles:["input[_ngcontent-%COMP%]{display:none}"]})}return o})();var G=c(7201);let T=(()=>{class o{constructor(){}readFromFile(n){return new Promise((e,r)=>{const s=new FileReader;s.onload=()=>{const i=this.parseData(s.result),[L,...I]=i,E=this.arrayToObjects(I,L);e(E)},s.onerror=()=>{r(s.error)},s.readAsText(n)})}parseData(n){return n.split("\r\n").map(e=>e.split(",")).filter(e=>e.length>1&&e.some(r=>r.length>0))}arrayToObjects(n,e){return n.map(r=>{const s={};return e.forEach((l,i)=>{s[l]=r[i]}),s})}static \u0275fac=function(e){return new(e||o)};static \u0275prov=t.jDH({token:o,factory:o.\u0275fac,providedIn:"root"})}return o})();function x(o,a){if(1&o){const n=t.RV6();t.j41(0,"lg-gap-row",0)(1,"div",5)(2,"lg-gap-row",0)(3,"div",6),t.EFF(4),t.k0s(),t.j41(5,"div",7),t.EFF(6),t.k0s(),t.j41(7,"div",8),t.EFF(8),t.nI1(9,"number"),t.k0s()()(),t.j41(10,"lg-button",9),t.EFF(11," Edit "),t.k0s(),t.j41(12,"lg-button",10),t.bIt("click",function(){t.eBV(n);const r=t.XpG().$implicit,s=t.XpG();return t.Njj(s.deleteProduct(r))}),t.nrm(13,"mat-icon",11),t.k0s()()}if(2&o){let n;const e=t.XpG().$implicit,r=t.XpG();t.Y8G("center",!0),t.R7$(2),t.Y8G("center",!0),t.R7$(2),t.JRh(e.name),t.R7$(2),t.SpI(" ",null!==(n=e.source)&&void 0!==n?n:"",""),t.R7$(2),t.SpI("",t.i5U(9,14,r.getPricePerGram(e),"1.2-5")," per gram "),t.R7$(2),t.Aen("primary"),t.Y8G("size","small")("link","/edit-product/"+e.uuid)("flat",!0),t.R7$(2),t.Aen("danger"),t.Y8G("size","small")("icon",!0)}}function S(o,a){1&o&&t.DNE(0,x,14,17,"ng-template",4)}let $=(()=>{class o{_productsRepository;_csvReaderService;constructor(n,e){this._productsRepository=n,this._csvReaderService=e}products=(0,t.vPA)([]);getPricePerGram(n){return((0,m.N)(n.price)||1)/((0,m.N)(n.amount)||1)}uploadProducts(n){var e=this;return this._csvReaderService.readFromFile(n[0]).then(function(){var r=(0,u.A)(function*(s){const l=e._productsRepository.makeFromData(s);for(const i of l)yield e._productsRepository.addProduct({name:i.name,amount:i.amount,price:i.price,source:i.source,category_id:i.category_id});e.loadProducts()});return function(s){return r.apply(this,arguments)}}())}deleteProduct(n){n.uuid&&this._productsRepository.deleteProduct(n.uuid,()=>{this.loadProducts()})}ngOnInit(){var n=this;return(0,u.A)(function*(){yield n.loadProducts()})()}loadProducts(){this._productsRepository.getProducts(n=>{const e=n.toSorted((r,s)=>r.name.localeCompare(s.name));this.products.set(e)})}static \u0275fac=function(e){return new(e||o)(t.rXU(G.d),t.rXU(T))};static \u0275cmp=t.VBU({type:o,selectors:[["lg-product-list"]],decls:12,vars:10,consts:[[3,"center"],[3,"flat","link","size"],[3,"filesSelected"],[3,"flat","size"],["lgCardListItem",""],[1,"expand"],[2,"flex","20%"],[2,"flex","10%"],[2,"flex","70%"],[3,"size","link","flat"],[3,"click","size","icon"],["aria-hidden","false","aria-label","Example home icon","fontIcon","close"]],template:function(e,r){1&e&&(t.j41(0,"lg-container")(1,"lg-title"),t.EFF(2," Products "),t.k0s(),t.j41(3,"lg-gap-row",0)(4,"lg-button",1),t.EFF(5," Add "),t.k0s(),t.j41(6,"lg-upload",2),t.bIt("filesSelected",function(l){return r.uploadProducts(l)}),t.j41(7,"lg-button",3),t.EFF(8," Upload "),t.k0s()()(),t.j41(9,"lg-card-list"),t.Z7z(10,S,1,0,null,4,t.Vm6),t.k0s()()),2&e&&(t.R7$(3),t.Y8G("center",!0),t.R7$(),t.Aen("primary"),t.Y8G("flat",!0)("link","/add-product")("size","small"),t.R7$(3),t.Aen("warning"),t.Y8G("flat",!0)("size","small"),t.R7$(3),t.Dyx(r.products()))},dependencies:[g.I,v.Q,h.d,y.H,C.W,p.QX,R,f,k],styles:["[_nghost-%COMP%]{display:block}"]})}return o})()}}]);