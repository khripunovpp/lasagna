"use strict";(self.webpackChunklasagna=self.webpackChunklasagna||[]).push([[628],{628:(B,u,r)=>{r.r(u),r.d(u,{AddProductComponent:()=>W});var t=r(1007),f=r(5642),h=r(553),C=r(1086),s=r(9417),v=r(3333),_=r(7504),P=r(7782),g=r(1119),l=r(416),y=r(8456),p=r(8536),b=r(9895);const k=["*",[["content"]]],A=["*","content"];function R(o,d){1&o&&(t.j41(0,"div",3),t.SdG(1,1),t.k0s())}let x=(()=>{class o{constructor(){}displayed=(0,t.vPA)(!1);onClick(e){e.target instanceof HTMLElement&&(e.target.closest(".tooltip")||this.displayed.set(!1))}static \u0275fac=function(n){return new(n||o)};static \u0275cmp=t.VBU({type:o,selectors:[["lg-tooltip"]],hostBindings:function(n,i){1&n&&t.bIt("click",function(a){return i.onClick(a)},!1,t.EBC)},ngContentSelectors:A,decls:5,vars:1,consts:[[1,"tooltip"],[1,"tooltip__anchor"],[3,"click"],[1,"tooltip__content"]],template:function(n,i){1&n&&(t.NAR(k),t.j41(0,"div",0)(1,"div",1)(2,"div",2),t.bIt("click",function(){return i.displayed.set(!i.displayed())}),t.SdG(3),t.k0s(),t.DNE(4,R,2,0,"div",3),t.k0s()()),2&n&&(t.R7$(4),t.vxM(i.displayed()?4:-1))},styles:[".tooltip[_ngcontent-%COMP%]{position:relative;display:inline-block}.tooltip__anchor[_ngcontent-%COMP%]{position:relative}.tooltip__content[_ngcontent-%COMP%]{position:absolute;bottom:50%;right:calc(100% + 16px);transform:translateY(50%);background-color:#fff;border-radius:16px;padding:16px;box-shadow:0 4px 8px #0000001a;z-index:100}"]})}return o})();var j=r(8710);function F(o,d){if(1&o){const e=t.RV6();t.j41(0,"div",3)(1,"lg-eggs-widget",4),t.bIt("changed",function(i){t.eBV(e);const c=t.XpG();return t.Njj(c.onEggsChanged(i))}),t.k0s()()}}let T=(()=>{class o{constructor(){}eggsChanged=(0,t.CGW)();selectedWidget=(0,t.vPA)(null);onWidgetSelect(e){this.selectedWidget.set(e)}onEggsChanged(e){this.eggsChanged.emit(e)}static \u0275fac=function(n){return new(n||o)};static \u0275cmp=t.VBU({type:o,selectors:[["lg-amount-widgets"]],outputs:{eggsChanged:"eggsChanged"},decls:5,vars:3,consts:[[1,"amount-widgets"],[1,"amount-widgets__buttons"],[1,"amount-widgets__button",3,"click"],[1,"amount-widgets__wrapper"],[3,"changed"]],template:function(n,i){1&n&&(t.j41(0,"div",0)(1,"div",1)(2,"button",2),t.bIt("click",function(){return i.onWidgetSelect("eggs")}),t.EFF(3,"Eggs "),t.k0s()(),t.DNE(4,F,2,0,"div",3),t.k0s()),2&n&&(t.AVh("selected",null!=i.selectedWidget()),t.R7$(4),t.vxM("eggs"===i.selectedWidget()?4:-1))},dependencies:[j.e],styles:[".amount-widgets[_ngcontent-%COMP%]{display:flex;gap:16px;flex-direction:column}.amount-widgets__input[_ngcontent-%COMP%]{flex:1}.amount-widgets__buttons[_ngcontent-%COMP%]{display:flex;gap:16px;flex-wrap:wrap;padding:16px;background-color:#fafafa;border-radius:12px;margin:-16px}.amount-widgets.selected[_ngcontent-%COMP%]   .amount-widgets__buttons[_ngcontent-%COMP%]{margin-bottom:0}.amount-widgets__button[_ngcontent-%COMP%]{display:flex;padding:8px 16px;border-radius:16px;background-color:#e5de38;appearance:none;border:none;font-family:inherit;font-size:inherit}"]})}return o})();var w=r(7201),m=r(5554);function E(o,d){if(1&o){const e=t.RV6();t.j41(0,"lg-button",14),t.bIt("click",function(){t.eBV(e);const i=t.XpG();return t.Njj(i.editProduct(i.value))}),t.EFF(1," Edit Product "),t.k0s()}}function M(o,d){if(1&o){const e=t.RV6();t.j41(0,"lg-button",14),t.bIt("click",function(){t.eBV(e);const i=t.XpG();return t.Njj(i.addProduct(i.value))}),t.EFF(1," Add Product "),t.k0s()}}let G=(()=>{class o{_productsRepository;_selectResourcesService;_router;constructor(e,n,i){this._productsRepository=e,this._selectResourcesService=n,this._router=i}form=new s.gE({name:new s.MJ("",s.k0.required),amount:new s.MJ(null,s.k0.required),price:new s.MJ(null,s.k0.required),source:new s.MJ(""),category_id:new s.MJ(null,s.k0.required)});eggsChanged(e){this.form.patchValue({amount:e})}uuid=(0,t.hFB)("");uuidEffect=(0,t.QZP)(()=>{this.uuid()&&this._productsRepository.getOne(this.uuid(),e=>{this.form.reset(e)})});get value(){return this.form.value}ngOnInit(){}addProduct(e){this._productsRepository.addProduct((0,p.rh)(e)).then(()=>{this._router.navigate(["/products"])})}editProduct(e){this._productsRepository.editProduct(this.uuid(),(0,p.rh)(e)).then(()=>{this._router.navigate(["/products"])})}ngAfterViewInit(){this._selectResourcesService.load().then(e=>{})}static \u0275fac=function(n){return new(n||o)(t.rXU(w.d),t.rXU(l.n),t.rXU(m.Ix))};static \u0275cmp=t.VBU({type:o,selectors:[["lg-add-product-form"]],inputs:{uuid:[1,"uuid"]},features:[t.Jv_([{provide:l.n,useClass:l.n}])],decls:19,vars:7,consts:[[3,"formGroup"],["label","Name"],["formControlName","name",3,"placeholder"],["label","Amount"],["formControlName","amount",3,"placeholder"],["ngProjectAs","after",5,["after"]],["ngProjectAs","content",5,["content"]],[3,"eggsChanged"],["label","Price per unit"],["formControlName","price",3,"placeholder"],["label","Source"],["formControlName","source",3,"placeholder"],["label","Category"],["formControlName","category_id",3,"resource"],[3,"click"]],template:function(n,i){1&n&&(t.j41(0,"form",0)(1,"lg-gap-column")(2,"lg-control",1),t.nrm(3,"lg-input",2),t.k0s(),t.j41(4,"lg-control",3)(5,"lg-number-input",4)(6,"div",5)(7,"lg-tooltip"),t.EFF(8," Widgets "),t.j41(9,"div",6)(10,"lg-amount-widgets",7),t.bIt("eggsChanged",function(a){return i.eggsChanged(a)}),t.k0s()()()()()(),t.j41(11,"lg-control",8),t.nrm(12,"lg-number-input",9),t.k0s(),t.j41(13,"lg-control",10),t.nrm(14,"lg-input",11),t.k0s(),t.j41(15,"lg-control",12),t.nrm(16,"lg-multiselect",13),t.k0s(),t.DNE(17,E,2,0,"lg-button")(18,M,2,0,"lg-button"),t.k0s()()),2&n&&(t.Y8G("formGroup",i.form),t.R7$(3),t.Y8G("placeholder","Your product name"),t.R7$(2),t.Y8G("placeholder","In grams"),t.R7$(7),t.Y8G("placeholder","In your currency"),t.R7$(2),t.Y8G("placeholder","Where do you buy it?"),t.R7$(2),t.Y8G("resource","categories"),t.R7$(),t.vxM(i.uuid()?17:18))},dependencies:[s.X1,s.qT,s.BC,s.cb,s.j4,s.JD,v.S,_.X,P.K,g.Q,y.$,b.N,x,T],styles:["lg-eggs-widget{min-width:300px}\n"],encapsulation:2})}return o})();var I=r(7512);let W=(()=>{class o{_aRoute;constructor(e){this._aRoute=e}uuid=(0,t.vPA)("");ngOnInit(){this._aRoute.params.subscribe(e=>{this.uuid.set(e.uuid)})}static \u0275fac=function(n){return new(n||o)(t.rXU(m.nX))};static \u0275cmp=t.VBU({type:o,selectors:[["app-add-recipe"]],decls:8,vars:8,consts:[[3,"center"],[3,"flat","link","size"],[3,"uuid"]],template:function(n,i){1&n&&(t.j41(0,"lg-container")(1,"lg-gap-row",0)(2,"lg-title"),t.EFF(3),t.k0s(),t.j41(4,"lg-button",1),t.EFF(5," Back to list "),t.k0s()(),t.j41(6,"lg-card"),t.nrm(7,"lg-add-product-form",2),t.k0s()()),2&n&&(t.R7$(),t.Y8G("center",!0),t.R7$(2),t.SpI("",i.uuid()?"Edit":"Add"," Product"),t.R7$(),t.Aen("warning"),t.Y8G("flat",!0)("link","/products")("size","small"),t.R7$(3),t.Y8G("uuid",i.uuid()))},dependencies:[f.H,h.i,C.W,G,g.Q,I.I],encapsulation:2})}return o})()}}]);