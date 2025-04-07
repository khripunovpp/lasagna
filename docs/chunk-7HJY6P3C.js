import{a as et}from"./chunk-PLSDI45O.js";import{a as Ve,b as Me}from"./chunk-F6GYIIQL.js";import{a as Ke,b as Je}from"./chunk-44CGF4BV.js";import{a as ee}from"./chunk-SWZ37IPE.js";import"./chunk-AQZ6ONQL.js";import{a as qe}from"./chunk-LGCELEXB.js";import{a as Y,b as Z}from"./chunk-6AFDTC2Q.js";import{a as Xe,b as Ye,c as Ze}from"./chunk-2PNTZ6X2.js";import"./chunk-T3OWWN6A.js";import{a as Qe}from"./chunk-PI4O6TCW.js";import{a as $e,b as Ue}from"./chunk-JAG6QPDF.js";import"./chunk-ZD7QV46A.js";import{a as Oe,b as Be,e as M,f as Ge,g as pe,h as D,i as Q,k as Le,l as Pe,m as ze,n as je,o as He,p as q,q as We}from"./chunk-AJ3UBX7E.js";import{a as J}from"./chunk-MCS5HOGQ.js";import{c as X,d as te}from"./chunk-KZEI6RKT.js";import{a as Ne,b as K}from"./chunk-VLWAUHYT.js";import{$a as p,$b as De,Ab as ce,Ca as u,Da as d,Ea as he,Ga as z,Ha as j,Ia as l,Ib as ke,Ja as r,Ka as E,Kb as Ae,L as de,La as Te,Ma as ve,Mb as Ee,Na as S,Oa as b,Pa as C,Qa as s,Ra as I,Sa as V,U as _,V as x,Vb as Fe,W as _e,Ya as we,Yb as Ie,Z as h,Za as be,_a as w,ab as R,bb as g,db as H,eb as W,fb as $,gb as U,ia as i,ib as ye,la as O,lb as k,na as v,nb as A,ob as B,pa as xe,ra as T,sb as Se,tb as re,va as Ce,wa as c,wb as G,xa as ge,xb as L,ya as fe,yb as Re,za as y}from"./chunk-7BPNVVWP.js";var it=["*"],ne=class n{constructor(){}static \u0275fac=function(e){return new(e||n)};static \u0275cmp=v({type:n,selectors:[["lg-table-card"]],ngContentSelectors:it,decls:4,vars:1,consts:[[3,"flat"],[1,"table"],[1,"table__scroll"]],template:function(e,o){e&1&&(I(),l(0,"lg-card",0)(1,"div",1)(2,"div",2),V(3),r()()()),e&2&&c("flat",!0)},dependencies:[Ne],styles:[`:host{display:flex;width:100%}.table__scroll{overflow-x:auto}table{width:100%;border-collapse:collapse;--border-color: #efefef}table thead tr{border-bottom:1px solid var(--border-color)}table thead th{text-align:left;padding:16px 24px;opacity:.4;font-size:.8em}table tbody tr{border-bottom:1px solid var(--border-color)}table tbody tr:last-child{border-bottom:none}td{padding:16px 24px}
`],encapsulation:2})};var at=["*"];function lt(n,t){if(n&1&&p(0),n&2){let e=s();g(" ",e.customMark()," ")}}var ie=class n{constructor(){}value=!1;customMark=L("");onKeydown(t){t.preventDefault(),this.onChangeCheckbox(!this.value)}onCheckboxChanged=G();onChange=()=>{};onTouched=()=>{};writeValue(t){this._change(t)}registerOnChange(t){this.onChange=t}registerOnTouched(t){this.onTouched=t}onChangeCheckbox(t){this._change(t)}_change(t){this.value=t,this.onChange(this.value),this.onCheckboxChanged.emit(this.value)}static \u0275fac=function(e){return new(e||n)};static \u0275cmp=v({type:n,selectors:[["lg-checkbox"]],hostBindings:function(e,o){e&1&&C("keydown.enter",function(m){return o.onKeydown(m)})("keydown.space",function(m){return o.onKeydown(m)})},inputs:{customMark:[1,"customMark"]},outputs:{onCheckboxChanged:"onCheckboxChanged"},features:[U([{provide:Oe,useExisting:de(()=>n),multi:!0}])],ngContentSelectors:at,decls:5,vars:2,consts:[["tabindex","0",1,"lg-checkbox"],["type","checkbox",1,"checkbox",3,"ngModelChange","ngModel"],[1,"lg-checkbox__mark"]],template:function(e,o){e&1&&(I(),l(0,"label",0)(1,"input",1),C("ngModelChange",function(m){return o.onChangeCheckbox(m)}),r(),l(2,"span",2),u(3,lt,1,1),r(),V(4),r()),e&2&&(i(),c("ngModel",o.value),i(2),d(o.customMark()?3:-1))},dependencies:[q,Be,M,Q],styles:[`.lg-checkbox{display:flex;border-radius:12px}.lg-checkbox:focus-within{outline-color:var(--active-color)}.lg-checkbox__mark{display:flex;align-items:center;justify-content:center;width:51px;height:51px;border-radius:12px;background-color:var(--control-bg);opacity:.2;cursor:pointer;transition:all .2s ease-in-out}.lg-checkbox__mark:hover{opacity:1}.checkbox{display:none}.checkbox:checked+.lg-checkbox__mark{background-color:var(--control-bg-selected);opacity:1;font-weight:700}
`],encapsulation:2})};var ae=class n{constructor(){}selfAlign="center";static \u0275fac=function(e){return new(e||n)};static \u0275dir=xe({type:n,selectors:[["","lgSelfCenter",""]],hostVars:2,hostBindings:function(e,o){e&2&&ge("align-self",o.selfAlign)}})};var rt=(n,t)=>t.value.name&&t.value.amount;function ct(n,t){if(n&1){let e=b();l(0,"section",6)(1,"div",7)(2,"lg-gap-row",8)(3,"small"),p(4,"Apply for all"),r(),l(5,"lg-control",9),E(6,"lg-input",10),r(),l(7,"lg-control",9),E(8,"lg-textarea",11),r(),l(9,"lg-control",9)(10,"lg-number-input",12),C("onInputChange",function(){_(e);let a=s().$index,m=s();return x(m.onTaxValueChange(a))}),r()(),l(11,"lg-control",9)(12,"lg-checkbox",13),C("onCheckboxChanged",function(){_(e);let a=s().$index,m=s();return x(m.onTaxValueChange(a))}),r()(),l(13,"lg-control",9),E(14,"lg-number-input",14),r(),l(15,"lg-button",15),C("click",function(){_(e);let a=s().$index,m=s();return x(m.deleteTxRow(a))}),E(16,"mat-icon",16),r()()()()}if(n&2){let e=s().$index;c("formGroupName",e),i(),fe("taxes__row--odd",e%2!==0),i(),c("bottom",!0)("fit",!0),i(3),c("label","Name"),i(),c("placeholder","Name"),i(),c("label","Description"),i(),c("rows",3)("placeholder","Description"),i(),c("label","Value"),i(),c("placeholder","Value"),i(),c("label","Use percentage"),i(),c("customMark","%"),i(),c("label","Amount"),i(),c("disabled",!0)("placeholder","Amount"),i(),y("danger"),c("size","small")("icon",!0)}}function pt(n,t){n&1&&T(0,ct,17,21,"ng-template",2)}var N=class n{constructor(){}totalTaxesChanged=G();taxesChanged=G();rows=L([]);total=L(0);taxesForm=new pe({rows:new He([this._getRowGroup()])});rowsEffect=re(()=>{debugger;this._rowsFormArray.clear(),this.rows().forEach((t,e)=>{this._rowsFormArray.push(this._getRowGroup(t))}),this.taxesForm.updateValueAndValidity(),this._recalculateTaxes()});totalTaxes=h(0);totalEffect=re(()=>{this._recalculateTaxes()});formValues=this.taxesForm.valueChanges.pipe(ee());get _rowsFormArray(){return this.taxesForm.get("rows")}ngOnInit(){this.formValues.subscribe(t=>{this.totalTaxes.set(this._getTotalTaxes()),this.totalTaxesChanged.emit(this.totalTaxes()),this.taxesChanged.emit(this.taxesForm.value.rows)})}onTaxValueChange(t){let e=this._rowsFormArray.at(t),o=this._getAmount(e.value.value,e.value.percentage);e.get("amount")?.patchValue(o.toFixed(2))}deleteTxRow(t){this._rowsFormArray.removeAt(t)}addTxRow(){this._rowsFormArray.push(this._getRowGroup())}_getTotalTaxes(){return this._rowsFormArray.controls.reduce((t,e)=>{let o=parseFloat(e.get("amount")?.value);return t+(isNaN(o)?0:o)},0)}_getAmount(t,e){let o=parseFloat(t.toString());return e?o*this.total():o}_recalculateTaxes(t=!1){this._rowsFormArray.controls.forEach((e,o)=>{let a=this._getAmount(e.get("value")?.value,e.get("percentage")?.value);e.get("amount")?.patchValue(a.toFixed(2),{emitEvent:!t})})}_getRowGroup(t=null){return new pe({name:new D(t?.name||""),description:new D(t?.description||""),value:new D(t?.value||0),amount:new D(0),percentage:new D(t?.percentage||!1)})}static \u0275fac=function(e){return new(e||n)};static \u0275cmp=v({type:n,selectors:[["lg-taxes-and-fees-list"]],inputs:{rows:[1,"rows"],total:[1,"total"]},outputs:{totalTaxesChanged:"totalTaxesChanged",taxesChanged:"taxesChanged"},decls:12,vars:6,consts:[[3,"formGroup"],["formArrayName","rows"],["lgCardListItem",""],[3,"level"],[3,"center","mobileMode","relaxed"],["lgSelfCenter","","lgShrink","",3,"click"],[1,"taxes",3,"formGroupName"],[1,"taxes__row"],[3,"bottom","fit"],[3,"label"],["formControlName","name",3,"placeholder"],["formControlName","description",3,"rows","placeholder"],["lgParseMath","","formControlName","value",3,"onInputChange","placeholder"],["formControlName","percentage",3,"onCheckboxChanged","customMark"],["formControlName","amount",3,"disabled","placeholder"],["lgSelfCenter","","lgShrink","",3,"click","size","icon"],["aria-hidden","false","aria-label","Example home icon","fontIcon","close"]],template:function(e,o){e&1&&(l(0,"lg-gap-column")(1,"lg-card-list",0),Te(2,1),z(3,pt,1,0,null,2,rt),ve(),r(),l(5,"lg-title",3)(6,"lg-gap-row",4),p(7," Total taxes and fees "),l(8,"b"),p(9),r()()(),l(10,"lg-button",5),C("click",function(){return o.addTxRow()}),p(11," Add tax "),r()()),e&2&&(i(),c("formGroup",o.taxesForm),i(2),j(o.taxesForm.controls.rows.controls),i(2),c("level",4),i(),c("center",!0)("mobileMode",!0)("relaxed",!0),i(3),R(o.totalTaxes()))},dependencies:[Ye,Xe,te,We,M,Ge,Le,je,Pe,ze,Ue,$e,ie,Y,X,Ze,ae,et,J,Z,K,Ke],styles:[".taxes__row--odd[_ngcontent-%COMP%]{--control-bg: #fff}"]})};var mt=["*"];function st(n,t){n&1&&V(0)}var le=class n{constructor(){}showed=h(!1);get hidden(){return this.showed()?null:!0}show=()=>{this.showed.set(!0)};hide=()=>{this.showed.set(!1)};static \u0275fac=function(e){return new(e||n)};static \u0275cmp=v({type:n,selectors:[["lg-view-show"]],hostVars:1,hostBindings:function(e,o){e&2&&Ce("hidden",o.hidden)},ngContentSelectors:mt,decls:1,vars:1,template:function(e,o){e&1&&(I(),u(0,st,1,0)),e&2&&d(o.showed()?0:-1)},encapsulation:2})};var nt=[{name:"VAT",description:"Value-Added Tax applied to ingredient purchases or product sales",value:.23,percentage:!0},{name:"Delivery Fee",description:"Fee charged for delivery services",value:.1,percentage:!1}];var ut=(n,t)=>[n,t];function dt(n,t){n&1&&S(0)}function _t(n,t){n&1&&S(0)}function xt(n,t){n&1&&S(0)}function Ct(n,t){if(n&1){let e=b();l(0,"lg-gap-row",10)(1,"lg-gap-row",11)(2,"div"),p(3," Calculation outcome: "),r(),l(4,"div")(5,"lg-number-input",12),$("ngModelChange",function(a){_(e);let m=s(2);return W(m.outcome_amount,a)||(m.outcome_amount=a),x(a)}),C("onInputChange",function(a){_(e);let m=s(2);return x(m.onOutcomeChange(a))}),r()(),l(6,"b"),p(7),r()(),l(8,"lg-gap-row",13)(9,"div"),p(10," one "),l(11,"b"),p(12),r()(),l(13,"div"),p(14," costs: "),T(15,dt,1,0,"ng-container",14),p(16," ( "),T(17,_t,1,0,"ng-container",14),p(18," + "),T(19,xt,1,0,"ng-container",14),p(20," of taxes and fees) "),r()()()}if(n&2){let e,o,a=s(2),m=w(11),f=w(13),F=w(15);c("fit",!0)("center",!0)("mobileMode",!0),i(),c("size","small")("center",!0),i(4),H("ngModel",a.outcome_amount),c("placeholder","Amount"),i(2),g(" ",(e=a.result())==null||e.recipe==null?null:e.recipe.outcome_unit," "),i(),c("size","small")("mobileMode",!0),i(4),g(" ",(o=a.result())==null||o.recipe==null?null:o.recipe.outcome_unit," "),i(3),c("ngTemplateOutlet",F),i(2),c("ngTemplateOutlet",f),i(2),c("ngTemplateOutlet",m)}}function gt(n,t){n&1&&S(0)}function ft(n,t){n&1&&S(0)}function ht(n,t){n&1&&S(0)}function Tt(n,t){n&1&&S(0)}function vt(n,t){if(n&1){let e=b();l(0,"lg-gap-row",11)(1,"div"),p(2," Calculation outcome: "),r(),l(3,"div")(4,"lg-number-input",12),$("ngModelChange",function(a){_(e);let m=s(2);return W(m.outcome_amount,a)||(m.outcome_amount=a),x(a)}),C("onInputChange",function(a){_(e);let m=s(2);return x(m.onOutcomeChange(a))}),r()(),l(5,"div"),p(6," costs: "),T(7,gt,1,0,"ng-container",14),p(8," ( "),T(9,ft,1,0,"ng-container",14),p(10," + "),T(11,ht,1,0,"ng-container",14),p(12," of taxes and fees) "),r(),l(13,"div"),p(14," per gram: "),T(15,Tt,1,0,"ng-container",14),r()()}if(n&2){let e=s(2),o=w(11),a=w(13),m=w(15),f=w(17);c("size","small")("center",!0),i(4),H("ngModel",e.outcome_amount),c("placeholder","Amount"),i(3),c("ngTemplateOutlet",m),i(2),c("ngTemplateOutlet",a),i(2),c("ngTemplateOutlet",o),i(4),c("ngTemplateOutlet",f)}}function wt(n,t){if(n&1&&(l(0,"lg-gap-row",7),u(1,Ct,21,14,"lg-gap-row",10)(2,vt,16,8,"lg-gap-row",11),r()),n&2){let e=s();c("center",!0),i(),d(e.notInGrams()?1:2)}}function bt(n,t){if(n&1&&(p(0),k(1,"number")),n&2){let e=s(2);g(" ",A(1,1,e.totalTaxes()/e.showedOutcome(),"1.2-2")," ")}}function yt(n,t){if(n&1&&(p(0),k(1,"number")),n&2){let e=s(2);g(" ",A(1,1,e.totalTaxes(),"1.2-2")," ")}}function St(n,t){if(n&1&&u(0,bt,2,4)(1,yt,2,4),n&2){let e=s();d(e.notInGrams()?0:1)}}function Rt(n,t){if(n&1&&(p(0),k(1,"number")),n&2){let e,o=s(2);g(" ",A(1,1,(((e=o.result())==null?null:e.total)||1)/(o.showedOutcome()||1),"1.2-2")," ")}}function kt(n,t){if(n&1&&(p(0),k(1,"number")),n&2){let e,o=s(2);g(" ",A(1,1,(e=o.result())==null?null:e.total,"1.2-2")," ")}}function At(n,t){if(n&1&&u(0,Rt,2,4)(1,kt,2,4),n&2){let e=s();d(e.notInGrams()?0:1)}}function Et(n,t){if(n&1&&(p(0),k(1,"number")),n&2){let e,o=s(2);g(" ",A(1,1,((((e=o.result())==null?null:e.total)||1)+o.totalTaxes())/(o.showedOutcome()||1),"1.2-2")," ")}}function Ft(n,t){if(n&1&&(p(0),k(1,"number")),n&2){let e,o=s(2);g(" ",A(1,1,(((e=o.result())==null?null:e.total)||1)+o.totalTaxes(),"1.2-2")," ")}}function It(n,t){if(n&1&&u(0,Et,2,4)(1,Ft,2,4),n&2){let e=s();d(e.notInGrams()?0:1)}}function Vt(n,t){}function Mt(n,t){if(n&1&&(p(0),k(1,"number")),n&2){let e,o=s(2);g(" ",A(1,1,((((e=o.result())==null?null:e.total)||1)+o.totalTaxes())/o.outcome_amount(),"1.2-2")," ")}}function Dt(n,t){if(n&1&&u(0,Vt,0,0)(1,Mt,2,4),n&2){let e=s();d(e.notInGrams()?0:1)}}function Nt(n,t){if(n&1&&(l(0,"a",21),p(1),r()),n&2){let e=s().$implicit;c("routerLink",ye(2,ut,e.type==="recipe-row"?"/edit-recipe/":"/edit-product/",e.uuid)),i(),g(" ",e.name," ")}}function Ot(n,t){if(n&1&&p(0),n&2){let e=s().$implicit;g(" ",e.name," ")}}function Bt(n,t){if(n&1&&(l(0,"tr",20)(1,"td"),p(2),r(),l(3,"td")(4,"span",20),u(5,Nt,2,5,"a",21)(6,Ot,1,1),r()(),l(7,"td"),p(8),r(),l(9,"td"),p(10),r(),l(11,"td"),p(12),r(),l(13,"td"),p(14),r()()),n&2){let e=t.$implicit,o=t.$index;c("ngClass",e.type),i(2),R(o+1),i(2),c("ngClass","indent-"+e.indent),i(),d(e.type!=="total"?5:6),i(3),R(e.amount),i(2),R(e.unit),i(2),R(e.price_per_gram),i(2),R(e.total)}}function Gt(n,t){if(n&1&&(l(0,"table")(1,"colgroup"),E(2,"col",15)(3,"col",16)(4,"col",17)(5,"col",18)(6,"col",17)(7,"col",19),r(),l(8,"thead")(9,"tr")(10,"th"),p(11,"#"),r(),l(12,"th"),p(13,"Name"),r(),l(14,"th"),p(15,"Amount"),r(),l(16,"th"),p(17,"Unit"),r(),l(18,"th"),p(19,"Price per unit"),r(),l(20,"th"),p(21,"Total"),r()()(),l(22,"tbody"),z(23,Bt,15,8,"tr",20,he),r()()),n&2){let e,o=s();i(23),j((e=o.result())==null?null:e.result)}}function Lt(n,t){n&1&&(l(0,"div"),p(1,"Loading..."),r())}function Pt(n,t){if(n&1){let e=b();l(0,"lg-button",22),C("click",function(){_(e);let a=s();return x(a.saveDefaultTaxTemplate())}),p(1," Save as default template "),r()}n&2&&(y("primary"),c("flat",!0)("size","small"))}function zt(n,t){if(n&1){let e=b();l(0,"lg-button",22),C("click",function(){_(e),s();let a=w(3);return x(a.show())}),p(1," Apply template "),r()}n&2&&(y("warning"),c("flat",!0)("size","small"))}function jt(n,t){if(n&1){let e=b();l(0,"lg-gap-row",7),u(1,zt,2,4,"lg-button",8),l(2,"lg-view-show",23,4)(4,"lg-gap-row",24)(5,"lg-multiselect",25),$("ngModelChange",function(a){_(e);let m=s();return W(m.taxTemplateToApply,a)||(m.taxTemplateToApply=a),x(a)}),r(),l(6,"lg-button",22),C("click",function(){_(e);let a=s();return x(a.loadTaxTemplate())}),p(7," Apply "),r()()()()}if(n&2){let e=w(3),o=s();c("center",!0),i(),d(e.showed()?-1:1),i(3),c("center",!0)("size","small"),i(),H("ngModel",o.taxTemplateToApply),c("autoLoad",!0)("resource","taxTemplates"),i(),y("primary"),c("flat",!0)("size","small")}}var ot=class n{constructor(t,e,o,a){this._aRoute=t;this._calculateRecipeService=e;this._formTemplateService=o;this._injector=a;this._aRoute.data.pipe(ee()).subscribe(m=>{console.log("data",m),this.result.set(m.result);let f=m.result?.recipe?.outcome_amount,F=m.result?.recipe?.ingredients?.reduce((se,ue)=>ue.unit!=="gram"?se:se+(+ue.amount||0),0),me=f||F;this.outcome_amount.set(me),this.showedOutcome.set(me),this.loadRecipeTaxTemplate()})}uuid=Je("uuid");result=h(null);outcome_amount=ce(0);showedOutcome=h(0);totalTaxes=h(0);notInGrams=Se(()=>this.result()?.recipe?.outcome_unit&&this.result()?.recipe?.outcome_unit!=="gram");taxesComponent=Re(N);taxRows=h([]);taxTemplateToApply=ce();canApplyTemplates=h(!0);canSaveDefaultTemplate=h(!0);onTaxTemplateChange(t){this.linkTaxTemplate(t.name)}onOutcomeChange=t=>{this._calculateRecipeService.calculateRecipe(this.uuid(),t).then(e=>{this.result.set(e),this.showedOutcome.set(t)})};saveDefaultTaxTemplate(){this._formTemplateService.saveTemplate("tax",{name:"Default Tax Template",createdAt:new Date().toISOString(),id:new Date().toISOString(),data:this.taxesComponent()?.taxesForm.value.rows?.map(t=>({name:t.name,description:t.description,value:t.value,percentage:t.percentage}))||[]}),this.canSaveDefaultTemplate.set(!1)}loadRecipeTemplate(){return this._formTemplateService.getTemplateByName("tax",this._taxTemplateName(this.result()?.recipe))}loadRecipeTaxTemplate(){let t=this.loadRecipeTemplate();if(t){this.taxRows.set(t.data.map(a=>({name:a.name,description:a.description,value:a.value,percentage:a.percentage})));return}let e=this._formTemplateService.getTemplateByName("tax","Default Tax Template");e?this.taxRows.set(e.data.map(a=>({name:a.name,description:a.description,value:a.value,percentage:a.percentage}))):this.taxRows.set(nt);let o=this._taxTemplateName(this.result()?.recipe);this.saveTaxTemplate(o,this.taxesComponent()?.taxesForm.value.rows??[]),this.linkTaxTemplate(o)}saveTaxTemplate(t,e){this._formTemplateService.saveTemplate("tax",{name:t,createdAt:new Date().toISOString(),id:new Date().toISOString(),data:e.map(o=>({name:o.name,description:o.description,value:o.value,percentage:o.percentage}))||[]})}loadTaxTemplate(){let t=this.taxTemplateToApply()?.name;if(!t||t===this.result()?.recipe?.taxTemplateName)return;let e=this._formTemplateService.getTemplateByName("tax",t);e&&(this.taxRows.set(e.data.map(o=>({name:o.name,description:o.description,value:o.value,percentage:o.percentage}))),this.onTaxTemplateChange(e))}ngOnInit(){}linkTaxTemplate(t){this._calculateRecipeService.linkTaxTemplate(this.uuid(),t).then(()=>{console.log("Tax template linked")})}onTotalTaxesChanged=t=>{this.totalTaxes.set(t)};onTaxesChanged=t=>{this.saveTaxTemplate(this._taxTemplateName(this.result()?.recipe),t)};_taxTemplateName(t){return t.name+" Tax Template"}static \u0275fac=function(e){return new(e||n)(O(Fe),O(Ve),O(Me),O(_e))};static \u0275cmp=v({type:n,selectors:[["lg-calculate-recipe"]],viewQuery:function(e,o){e&1&&we(o.taxesComponent,N,5),e&2&&be()},inputs:{outcome_amount:[1,"outcome_amount"],taxTemplateToApply:[1,"taxTemplateToApply"]},outputs:{outcome_amount:"outcome_amountChange",taxTemplateToApply:"taxTemplateToApplyChange"},features:[U([Qe])],decls:27,vars:21,consts:[["taxAmount",""],["rawAmount",""],["totalAmount",""],["perGramAmount",""],["taxTemplateForm",""],[3,"center","mobileMode"],[3,"flat","link","size"],[3,"center"],[3,"flat","size","style"],[3,"totalTaxesChanged","taxesChanged","rows","total"],[2,"--control-bg","white",3,"fit","center","mobileMode"],[3,"size","center"],["lgParseMath","",3,"ngModelChange","onInputChange","ngModel","placeholder"],[3,"size","mobileMode"],[4,"ngTemplateOutlet"],["span","1",2,"width","1%"],["span","1",2,"width","20%"],["span","1",2,"width","5%"],["span","1",2,"width","3%"],["span","1",2,"width","7%"],[3,"ngClass"],["target","_blank",3,"routerLink"],[3,"click","flat","size"],[2,"--control-bg","white"],[3,"center","size"],[3,"ngModelChange","ngModel","autoLoad","resource"]],template:function(e,o){if(e&1){let a=b();l(0,"lg-container")(1,"lg-gap-column")(2,"lg-gap-row",5)(3,"lg-title"),p(4),r(),l(5,"lg-button",6),p(6," Edit "),r(),l(7,"lg-button",6),p(8," Back to list "),r()(),u(9,wt,3,2,"lg-gap-row",7),T(10,St,2,1,"ng-template",null,0,B)(12,At,2,1,"ng-template",null,1,B)(14,It,2,1,"ng-template",null,2,B)(16,Dt,2,1,"ng-template",null,3,B),l(18,"lg-table-card"),u(19,Gt,25,0,"table")(20,Lt,2,0,"div"),r(),l(21,"lg-gap-row",5)(22,"lg-title"),p(23," Taxes and fees "),r(),u(24,Pt,2,4,"lg-button",8),u(25,jt,8,11,"lg-gap-row",7),r(),l(26,"lg-taxes-and-fees-list",9),C("totalTaxesChanged",function(f){return _(a),x(o.onTotalTaxesChanged(f))})("taxesChanged",function(f){return _(a),x(o.onTaxesChanged(f))}),r()()()}if(e&2){let a,m,f,F;i(2),c("center",!0)("mobileMode",!0),i(2),g(" ",(a=o.result())==null||a.recipe==null?null:a.recipe.name," cost calculation "),i(),y("primary"),c("flat",!0)("link","/edit-recipe/"+((m=o.result())==null||m.recipe==null?null:m.recipe.uuid))("size","small"),i(2),y("warning"),c("flat",!0)("link","/recipes")("size","small"),i(2),d((f=o.result())!=null&&f.total?9:-1),i(10),d(o.result()?19:20),i(2),c("center",!0)("mobileMode",!0),i(3),d(o.canSaveDefaultTemplate()?24:-1),i(),d(o.canApplyTemplates()?25:-1),i(),c("rows",o.taxRows())("total",((F=o.result())==null?null:F.total)??0)}},dependencies:[De,K,ne,ke,X,te,Ee,Y,q,M,Q,Z,Ie,J,N,Ae,le,qe],styles:[`lg-number-input .lg-number-input{width:100px}
`],encapsulation:2})};export{ot as CalculateRecipeComponent};
