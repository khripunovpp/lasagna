"use strict";(self.webpackChunklasagna=self.webpackChunklasagna||[]).push([[757],{8757:(Y,p,s)=>{s.r(p),s.d(p,{AddProductComponent:()=>W});var t=s(1007),C=s(5642),v=s(553),_=s(1086),r=s(9417),b=s(3333),y=s(7504),P=s(7782),g=s(1119),a=s(416),k=s(8456),m=s(8536),R=s(9895);const x=["*",[["content"]]],F=["*","content"];function j(o,c){1&o&&(t.j41(0,"div",3),t.SdG(1,1),t.k0s())}let A=(()=>{class o{constructor(){}displayed=(0,t.vPA)(!1);onClick(e){e.target instanceof HTMLElement&&(e.target.closest(".tooltip")||this.displayed.set(!1))}static \u0275fac=function(n){return new(n||o)};static \u0275cmp=t.VBU({type:o,selectors:[["lg-tooltip"]],hostBindings:function(n,i){1&n&&t.bIt("click",function(d){return i.onClick(d)},!1,t.EBC)},ngContentSelectors:F,decls:5,vars:1,consts:[[1,"tooltip"],[1,"tooltip__anchor"],[3,"click"],[1,"tooltip__content"]],template:function(n,i){1&n&&(t.NAR(x),t.j41(0,"div",0)(1,"div",1)(2,"div",2),t.bIt("click",function(){return i.displayed.set(!i.displayed())}),t.SdG(3),t.k0s(),t.DNE(4,j,2,0,"div",3),t.k0s()()),2&n&&(t.R7$(4),t.vxM(i.displayed()?4:-1))},styles:[".tooltip[_ngcontent-%COMP%]{position:relative;display:inline-block}.tooltip__anchor[_ngcontent-%COMP%]{position:relative}.tooltip__content[_ngcontent-%COMP%]{position:absolute;bottom:50%;right:calc(100% + 16px);transform:translateY(50%);background-color:#fff;border-radius:16px;padding:16px;box-shadow:0 4px 8px #0000001a;z-index:100}"]})}return o})();var T=s(8710);function I(o,c){if(1&o){const e=t.RV6();t.j41(0,"div",3)(1,"lg-eggs-widget",4),t.bIt("changed",function(i){t.eBV(e);const l=t.XpG();return t.Njj(l.onEggsChanged(i))}),t.k0s()()}}let M=(()=>{class o{constructor(){}eggsChanged=(0,t.CGW)();selectedWidget=(0,t.vPA)(null);onWidgetSelect(e){this.selectedWidget.set(e)}onEggsChanged(e){e&&this.eggsChanged.emit(e)}static \u0275fac=function(n){return new(n||o)};static \u0275cmp=t.VBU({type:o,selectors:[["lg-amount-widgets"]],outputs:{eggsChanged:"eggsChanged"},decls:5,vars:3,consts:[[1,"amount-widgets"],[1,"amount-widgets__buttons"],[1,"amount-widgets__button",3,"click"],[1,"amount-widgets__wrapper"],[3,"changed"]],template:function(n,i){1&n&&(t.j41(0,"div",0)(1,"div",1)(2,"button",2),t.bIt("click",function(){return i.onWidgetSelect("eggs")}),t.EFF(3,"Eggs "),t.k0s()(),t.DNE(4,I,2,0,"div",3),t.k0s()),2&n&&(t.AVh("selected",null!=i.selectedWidget()),t.R7$(4),t.vxM("eggs"===i.selectedWidget()?4:-1))},dependencies:[T.e],styles:[".amount-widgets[_ngcontent-%COMP%]{display:flex;gap:16px;flex-direction:column}.amount-widgets__input[_ngcontent-%COMP%]{flex:1}.amount-widgets__buttons[_ngcontent-%COMP%]{display:flex;gap:16px;flex-wrap:wrap;padding:16px;background-color:#fafafa;border-radius:12px;margin:-16px}.amount-widgets.selected[_ngcontent-%COMP%]   .amount-widgets__buttons[_ngcontent-%COMP%]{margin-bottom:0}.amount-widgets__button[_ngcontent-%COMP%]{display:flex;padding:8px 16px;border-radius:16px;background-color:#e5de38;appearance:none;border:none;font-family:inherit;font-size:inherit}"]})}return o})();var V=s(7480),f=s(7512),w=s(5130),G=s(9170);function $(o,c){if(1&o){const e=t.RV6();t.j41(0,"span",2),t.bIt("click",function(){const i=t.eBV(e).$implicit,l=t.XpG();return t.Njj(l.onSelect(i))}),t.EFF(1),t.k0s()}if(2&o){const e=c.$implicit,n=c.$index,i=c.$count,l=t.XpG();t.AVh("selected",e.value===l.value),t.BMQ("data-last",n===i-1||null),t.R7$(),t.SpI(" ",e.label," ")}}let E=(()=>{class o{constructor(){}control=(0,t.hFB)();items=[];onChangeFn;value;selectedItem;onSelect=e=>{this.applyValue(e.value)};registerOnChange(e){this.onChangeFn=e}registerOnTouched(e){}writeValue(e){this.applyValue(e)}applyValue(e){this.value=e,this.onChangeFn?.(e),this.control()?.writeValue(e)}ngOnInit(){}static \u0275fac=function(n){return new(n||o)};static \u0275cmp=t.VBU({type:o,selectors:[["lg-chips-list"]],inputs:{control:[1,"control"],items:"items"},features:[t.Jv_([{provide:r.kq,useExisting:(0,t.Rfq)(()=>o),multi:!0}])],decls:3,vars:0,consts:[[1,"chips-list"],[1,"chip",3,"selected"],[1,"chip",3,"click"]],template:function(n,i){1&n&&(t.j41(0,"div",0),t.Z7z(1,$,2,4,"span",1,t.fX1),t.k0s()),2&n&&(t.R7$(),t.Dyx(i.items))},styles:[".chips-list[_ngcontent-%COMP%]{display:flex;flex-wrap:wrap;gap:8px}.chip[_ngcontent-%COMP%]{background-color:#007bff;color:#fff;padding:4px 8px;border-radius:16px;font-size:.875rem;display:inline-block;cursor:pointer}.chip.selected[_ngcontent-%COMP%]{background-color:#0d59ab}"]})}return o})();var B=s(7201),h=s(1636);function N(o,c){if(1&o){const e=t.RV6();t.j41(0,"lg-button",19),t.bIt("click",function(){t.eBV(e);const i=t.XpG();return t.Njj(i.editProduct(i.value))}),t.EFF(1," Edit Product "),t.k0s()}}function O(o,c){if(1&o){const e=t.RV6();t.j41(0,"lg-button",19),t.bIt("click",function(){t.eBV(e);const i=t.XpG();return t.Njj(i.addProduct(i.value))}),t.EFF(1," Add Product "),t.k0s()}}let S=(()=>{class o{_productsRepository;_selectResourcesService;_router;constructor(e,n,i){this._productsRepository=e,this._selectResourcesService=n,this._router=i}form=new r.gE({name:new r.MJ("",r.k0.required),amount:new r.MJ(null,r.k0.required),price:new r.MJ(null,r.k0.required),unit:new r.MJ("gram"),source:new r.MJ(""),category_id:new r.MJ(null,r.k0.required)});buttons=[{label:"Grams",value:"gram",style:"secondary",onClick:()=>{console.log("Grams")}},{label:"Pieces",value:"piece",style:"secondary",onClick:()=>{console.log("Piece")}}];uuid=(0,t.hFB)("");topCategories=(0,t.vPA)([]);uuidEffect=(0,t.QZP)(()=>{this.uuid()&&this._productsRepository.getOne(this.uuid()).then(e=>{this.form.reset(e)})});get value(){return this.form.value}eggsChanged(e){this.form.patchValue({amount:e})}ngOnInit(){this.form.valueChanges.subscribe(e=>{console.log(e)}),this._productsRepository.getTopCategories().then(e=>{this.topCategories.set(e.map(n=>({label:n.name,value:n.uuid})))})}addProduct(e){this._productsRepository.addProduct((0,m.rh)(e)).then(()=>{this._router.navigate(["/products"])})}editProduct(e){this._productsRepository.editProduct(this.uuid(),(0,m.rh)(e)).then(()=>{this._router.navigate(["/products"])})}ngAfterViewInit(){this._selectResourcesService.load().then(e=>{})}static \u0275fac=function(n){return new(n||o)(t.rXU(B.d),t.rXU(a.n),t.rXU(h.Ix))};static \u0275cmp=t.VBU({type:o,selectors:[["lg-add-product-form"]],inputs:{uuid:[1,"uuid"]},features:[t.Jv_([{provide:a.n,useClass:a.n}])],decls:25,vars:11,consts:[["priceInput",""],["categorySelect",""],[3,"formGroup"],["label","Name"],["formControlName","name",3,"placeholder"],[3,"bottom"],["label","Amount","lgExpand",""],["formControlName","amount","lsParseMath","",3,"onInputChange","placeholder"],["ngProjectAs","after",5,["after"]],["ngProjectAs","content",5,["content"]],[3,"eggsChanged"],["formControlName","unit",3,"items"],["label","Price"],["formControlName","price","lsParseMath","",3,"placeholder"],["label","Source"],["formControlName","source",3,"placeholder"],["label","Category"],["formControlName","category_id",3,"resource"],[3,"items","control"],[3,"click"]],template:function(n,i){if(1&n){const l=t.RV6();t.j41(0,"form",2)(1,"lg-gap-column")(2,"lg-control",3),t.nrm(3,"lg-input",4),t.k0s(),t.j41(4,"lg-gap-row",5)(5,"lg-control",6)(6,"lg-number-input",7),t.bIt("onInputChange",function(){t.eBV(l);const u=t.sdS(15);return t.Njj(u.focus())}),t.j41(7,"div",8)(8,"lg-tooltip"),t.EFF(9," Widgets "),t.j41(10,"div",9)(11,"lg-amount-widgets",10),t.bIt("eggsChanged",function(u){return t.eBV(l),t.Njj(i.eggsChanged(u))}),t.k0s()()()()()(),t.nrm(12,"lg-buttons-group",11),t.k0s(),t.j41(13,"lg-control",12),t.nrm(14,"lg-number-input",13,0),t.k0s(),t.j41(16,"lg-control",14),t.nrm(17,"lg-input",15),t.k0s(),t.j41(18,"lg-gap-column")(19,"lg-control",16),t.nrm(20,"lg-multiselect",17,1),t.k0s(),t.nrm(22,"lg-chips-list",18),t.k0s(),t.DNE(23,N,2,0,"lg-button")(24,O,2,0,"lg-button"),t.k0s()()}if(2&n){const l=t.sdS(21);t.Y8G("formGroup",i.form),t.R7$(3),t.Y8G("placeholder","Your product name"),t.R7$(),t.Y8G("bottom",!0),t.R7$(2),t.Y8G("placeholder","In grams"),t.R7$(6),t.Y8G("items",i.buttons),t.R7$(2),t.Y8G("placeholder","For the entire product in your currency"),t.R7$(3),t.Y8G("placeholder","Where do you buy it?"),t.R7$(3),t.Y8G("resource","categories"),t.R7$(2),t.Y8G("items",i.topCategories())("control",l),t.R7$(),t.vxM(i.uuid()?23:24)}},dependencies:[r.X1,r.qT,r.BC,r.cb,r.j4,r.JD,b.S,y.X,P.K,g.Q,k.$,R.N,A,M,V.t,f.I,w.i,G.A,E],styles:["lg-eggs-widget{min-width:300px}\n"],encapsulation:2})}return o})(),W=(()=>{class o{_aRoute;constructor(e){this._aRoute=e}uuid=(0,t.vPA)("");ngOnInit(){this._aRoute.params.subscribe(e=>{this.uuid.set(e.uuid)})}static \u0275fac=function(n){return new(n||o)(t.rXU(h.nX))};static \u0275cmp=t.VBU({type:o,selectors:[["app-add-recipe"]],decls:8,vars:8,consts:[[3,"center"],[3,"flat","link","size"],[3,"uuid"]],template:function(n,i){1&n&&(t.j41(0,"lg-container")(1,"lg-gap-row",0)(2,"lg-title"),t.EFF(3),t.k0s(),t.j41(4,"lg-button",1),t.EFF(5," Back to list "),t.k0s()(),t.j41(6,"lg-card"),t.nrm(7,"lg-add-product-form",2),t.k0s()()),2&n&&(t.R7$(),t.Y8G("center",!0),t.R7$(2),t.SpI("",i.uuid()?"Edit":"Add"," Product"),t.R7$(),t.Aen("warning"),t.Y8G("flat",!0)("link","/products")("size","small"),t.R7$(3),t.Y8G("uuid",i.uuid()))},dependencies:[C.H,v.i,_.W,S,g.Q,f.I],encapsulation:2})}return o})()}}]);