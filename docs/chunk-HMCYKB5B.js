import{a as ve}from"./chunk-OKGIZKL6.js";import{a as ue,b as j,d as fe,e as _e}from"./chunk-2MQQJLC4.js";import{a as ge,b as Ce}from"./chunk-UNGG2BEL.js";import{c as he}from"./chunk-OEFCFFOM.js";import{b as T}from"./chunk-B554CIE5.js";import{a as de}from"./chunk-UZBYRUYP.js";import{a as pe}from"./chunk-KYYDJ2CN.js";import"./chunk-C4ZIA7Z2.js";import{a as oe,c as P,e as ne,f as ie,g as re,h as b,j as le,k as ae,n as se,q as ce}from"./chunk-32O7IJMM.js";import{a as me}from"./chunk-NTM2FENS.js";import{a as F}from"./chunk-NEKHWACR.js";import{a as I}from"./chunk-XVXTNF3J.js";import{a as ee,b as te}from"./chunk-AYZPP7UL.js";import{f as Q,h as X}from"./chunk-VHR6F3YK.js";import{Db as y,Eb as c,Fb as u,Gb as Y,Hb as G,Nc as Z,Pb as S,Qb as p,Sa as L,Sb as E,Ta as r,Xb as V,Ya as w,Z as B,ab as d,ja as f,jc as J,ka as C,kb as z,lb as s,lc as K,mc as A,nb as x,ob as $,pa as _,rb as h,sb as v,ub as H,vb as q,wb as U,xb as l,yb as i,zb as m}from"./chunk-EXR2ZECX.js";var be=["*",[["content"]]],we=["*","content"];function Pe(n,e){n&1&&(l(0,"div",3),G(1,1),i())}var M=class n{constructor(){}displayed=_(!1);onClick(e){e.target instanceof HTMLElement&&(e.target.closest(".tooltip")||this.displayed.set(!1))}static \u0275fac=function(t){return new(t||n)};static \u0275cmp=d({type:n,selectors:[["lg-tooltip"]],hostBindings:function(t,o){t&1&&c("click",function(g){return o.onClick(g)},L)},ngContentSelectors:we,decls:5,vars:1,consts:[[1,"tooltip"],[1,"tooltip__anchor"],[3,"click"],[1,"tooltip__content"]],template:function(t,o){t&1&&(Y(be),l(0,"div",0)(1,"div",1)(2,"div",2),c("click",function(){return o.displayed.set(!o.displayed())}),G(3),i(),h(4,Pe,2,0,"div",3),i()()),t&2&&(r(4),v(o.displayed()?4:-1))},styles:[".tooltip[_ngcontent-%COMP%]{position:relative;display:inline-block}.tooltip__anchor[_ngcontent-%COMP%]{position:relative}.tooltip__content[_ngcontent-%COMP%]{position:absolute;bottom:50%;right:calc(100% + 16px);transform:translateY(50%);background-color:#fff;border-radius:16px;padding:16px;box-shadow:0 4px 8px #0000001a;z-index:100}"]})};function xe(n,e){if(n&1){let t=y();l(0,"div",3)(1,"lg-eggs-widget",4),c("changed",function(a){f(t);let g=u();return C(g.onEggsChanged(a))}),i()()}}var N=class n{constructor(){}eggsChanged=K();selectedWidget=_(null);onWidgetSelect(e){this.selectedWidget.set(e)}onEggsChanged(e){e&&this.eggsChanged.emit(e)}static \u0275fac=function(t){return new(t||n)};static \u0275cmp=d({type:n,selectors:[["lg-amount-widgets"]],outputs:{eggsChanged:"eggsChanged"},decls:5,vars:3,consts:[[1,"amount-widgets"],[1,"amount-widgets__buttons"],[1,"amount-widgets__button",3,"click"],[1,"amount-widgets__wrapper"],[3,"changed"]],template:function(t,o){t&1&&(l(0,"div",0)(1,"div",1)(2,"button",2),c("click",function(){return o.onWidgetSelect("eggs")}),p(3,"Eggs "),i()(),h(4,xe,2,0,"div",3),i()),t&2&&(x("selected",o.selectedWidget()!=null),r(4),v(o.selectedWidget()==="eggs"?4:-1))},dependencies:[ve],styles:[".amount-widgets[_ngcontent-%COMP%]{display:flex;gap:16px;flex-direction:column}.amount-widgets__input[_ngcontent-%COMP%]{flex:1}.amount-widgets__buttons[_ngcontent-%COMP%]{display:flex;gap:16px;flex-wrap:wrap;padding:16px;background-color:#fafafa;border-radius:12px;margin:-16px}.amount-widgets.selected[_ngcontent-%COMP%]   .amount-widgets__buttons[_ngcontent-%COMP%]{margin-bottom:0}.amount-widgets__button[_ngcontent-%COMP%]{display:flex;padding:8px 16px;border-radius:16px;background-color:#e5de38;appearance:none;border:none;font-family:inherit;font-size:inherit}"]})};function Se(n,e){if(n&1){let t=y();l(0,"span",2),c("click",function(){let a=f(t).$implicit,g=u();return C(g.onSelect(a))}),p(1),i()}if(n&2){let t=e.$implicit,o=e.$index,a=e.$count,g=u();x("selected",t.value===g.value),z("data-last",o===a-1?!0:null),r(),E(" ",t.label," ")}}var D=class n{constructor(){}control=A();items=[];onChangeFn;value;selectedItem;onSelect=e=>{this.applyValue(e.value)};registerOnChange(e){this.onChangeFn=e}registerOnTouched(e){}writeValue(e){this.applyValue(e)}applyValue(e){this.value=e,this.onChangeFn?.(e),this.control()?.writeValue(e)}ngOnInit(){}static \u0275fac=function(t){return new(t||n)};static \u0275cmp=d({type:n,selectors:[["lg-chips-list"]],inputs:{control:[1,"control"],items:"items"},features:[V([{provide:oe,useExisting:B(()=>n),multi:!0}])],decls:3,vars:0,consts:[[1,"chips-list"],[1,"chip",3,"selected"],[1,"chip",3,"click"]],template:function(t,o){t&1&&(l(0,"div",0),q(1,Se,2,4,"span",1,H),i()),t&2&&(r(),U(o.items))},styles:[".chips-list[_ngcontent-%COMP%]{display:flex;flex-wrap:wrap;gap:8px}.chip[_ngcontent-%COMP%]{background-color:#007bff;color:#fff;padding:4px 8px;border-radius:16px;font-size:.875rem;display:inline-block;cursor:pointer}.chip.selected[_ngcontent-%COMP%]{background-color:#0d59ab}"]})};function Ve(n,e){if(n&1&&m(0,"lg-chips-list",17),n&2){let t=u(),o=S(19);s("control",o)("items",t.topSources())}}function Ae(n,e){if(n&1&&m(0,"lg-chips-list",17),n&2){let t=u(),o=S(24);s("control",o)("items",t.topCategories())}}function Fe(n,e){if(n&1){let t=y();l(0,"lg-button",20),c("click",function(){f(t);let a=u();return C(a.editProduct(a.value))}),p(1," Edit Product "),i()}}function Te(n,e){if(n&1){let t=y();l(0,"lg-button",20),c("click",function(){f(t);let a=u();return C(a.addProduct(a.value))}),p(1," Add Product "),i()}}var O=class n{constructor(e,t,o){this._productsRepository=e;this._selectResourcesService=t;this._router=o}form=new re({name:new b("",P.required),amount:new b(null,P.required),price:new b(null,P.required),unit:new b("gram"),source:new b(""),category_id:new b(null,P.required)});buttons=[{label:"Grams",value:"gram",style:"secondary",onClick:()=>{console.log("Grams")}},{label:"Pieces",value:"piece",style:"secondary",onClick:()=>{console.log("Piece")}}];uuid=A("");topCategories=_([]);topSources=_([]);uuidEffect=J(()=>{this.uuid()&&this._productsRepository.getOne(this.uuid()).then(e=>{this.form.reset(e)})});get value(){return this.form.value}eggsChanged(e){this.form.patchValue({amount:e})}ngOnInit(){this.form.valueChanges.subscribe(e=>{console.log(e)}),this._productsRepository.getTopCategories().then(e=>{this.topCategories.set(e.map(t=>({label:t.name,value:t.uuid})))}),this._productsRepository.getTopSources().then(e=>{this.topSources.set(e.map(t=>({label:t,value:t})))})}addProduct(e){this._productsRepository.addProduct(j(e)).then(()=>{this._router.navigate(["/products"])})}editProduct(e){this._productsRepository.editProduct(this.uuid(),j(e)).then(()=>{this._router.navigate(["/products"])})}ngAfterViewInit(){this._selectResourcesService.load().then(e=>{})}static \u0275fac=function(t){return new(t||n)(w(he),w(T),w(X))};static \u0275cmp=d({type:n,selectors:[["lg-add-product-form"]],inputs:{uuid:[1,"uuid"]},features:[V([{provide:T,useClass:T}])],decls:28,vars:12,consts:[["priceInput",""],["sourceInput",""],["categorySelect",""],[3,"formGroup"],["label","Name"],["formControlName","name",3,"placeholder"],[3,"bottom","mobileMode"],["label","Amount","lgExpand",""],["formControlName","amount","lgParseMath","",3,"onInputChange","placeholder"],["ngProjectAs","after",5,["after"]],["ngProjectAs","content",5,["content"]],[3,"eggsChanged"],["formControlName","unit",3,"items"],["label","Price"],["formControlName","price","lgParseMath","",3,"placeholder"],["label","Source"],["formControlName","source",3,"placeholder"],[3,"control","items"],["label","Category"],["formControlName","category_id",3,"resource"],[3,"click"]],template:function(t,o){if(t&1){let a=y();l(0,"form",3)(1,"lg-gap-column")(2,"lg-control",4),m(3,"lg-input",5),i(),l(4,"lg-gap-row",6)(5,"lg-control",7)(6,"lg-number-input",8),c("onInputChange",function(){f(a);let W=S(15);return C(W.focus())}),l(7,"div",9)(8,"lg-tooltip"),p(9," Widgets "),l(10,"div",10)(11,"lg-amount-widgets",11),c("eggsChanged",function(W){return f(a),C(o.eggsChanged(W))}),i()()()()()(),m(12,"lg-buttons-group",12),i(),l(13,"lg-control",13),m(14,"lg-number-input",14,0),i(),l(16,"lg-gap-column")(17,"lg-control",15),m(18,"lg-input",16,1),i(),h(20,Ve,1,2,"lg-chips-list",17),i(),l(21,"lg-gap-column")(22,"lg-control",18),m(23,"lg-multiselect",19,2),i(),h(25,Ae,1,2,"lg-chips-list",17),i(),h(26,Fe,2,0,"lg-button")(27,Te,2,0,"lg-button"),i()()}t&2&&(s("formGroup",o.form),r(3),s("placeholder","Your product name"),r(),s("bottom",!0)("mobileMode",!0),r(2),s("placeholder","In "+o.form.value.unit),r(6),s("items",o.buttons),r(2),s("placeholder","For the entire product in your currency"),r(4),s("placeholder","Where do you buy it?"),r(2),v(o.topSources().length?20:-1),r(3),s("resource","categories"),r(2),v(o.topCategories().length?25:-1),r(),v(o.uuid()?26:27))},dependencies:[ce,le,ne,ie,ae,se,pe,de,me,F,ue,ge,M,N,Ce,I,_e,fe,D],styles:[`lg-eggs-widget{min-width:300px}
`],encapsulation:2})};var ye=class n{constructor(e){this._aRoute=e}uuid=_("");ngOnInit(){this._aRoute.params.subscribe(e=>{this.uuid.set(e.uuid)})}static \u0275fac=function(t){return new(t||n)(w(Q))};static \u0275cmp=d({type:n,selectors:[["app-add-recipe"]],decls:8,vars:8,consts:[[3,"center"],[3,"flat","link","size"],[3,"uuid"]],template:function(t,o){t&1&&(l(0,"lg-container")(1,"lg-gap-row",0)(2,"lg-title"),p(3),i(),l(4,"lg-button",1),p(5," Back to list "),i()(),l(6,"lg-card"),m(7,"lg-add-product-form",2),i()()),t&2&&(r(),s("center",!0),r(2),E("",o.uuid()?"Edit":"Add"," Product"),r(),$("warning"),s("flat",!0)("link","/products")("size","small"),r(3),s("uuid",o.uuid()))},dependencies:[Z,ee,te,O,F,I],encapsulation:2})};export{ye as AddProductComponent};
