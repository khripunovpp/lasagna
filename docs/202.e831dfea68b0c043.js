"use strict";(self.webpackChunklasagna=self.webpackChunklasagna||[]).push([[202],{202:(Q,p,l)=>{l.r(p),l.d(p,{AddRecipeComponent:()=>U});var e=l(1007),f=l(5642),h=l(553),x=l(1086),r=l(9417),C=l(3333),F=l(7504);const R=["*"];function v(o,s){if(1&o&&(e.j41(0,"p",1),e.EFF(1),e.k0s()),2&o){const t=e.XpG();e.R7$(),e.SpI(" ",t.label()," ")}}let j=(()=>{class o{constructor(){}label=(0,e.hFB)("");static \u0275fac=function(n){return new(n||o)};static \u0275cmp=e.VBU({type:o,selectors:[["lg-control-group"]],inputs:{label:[1,"label"]},ngContentSelectors:R,decls:4,vars:1,consts:[[1,"control-group"],[1,"control-group__label"],[1,"control-group__content"]],template:function(n,i){1&n&&(e.NAR(),e.j41(0,"div",0),e.DNE(1,v,2,1,"p",1),e.j41(2,"div",2),e.SdG(3),e.k0s()()),2&n&&(e.R7$(),e.vxM(i.label()?1:-1))},styles:["[_nghost-%COMP%]{display:flex;flex:1}.control-group[_ngcontent-%COMP%]{flex:1;display:flex;flex-direction:column;gap:16px}.control-group__label[_ngcontent-%COMP%]{font-size:1.2rem;margin:0}.control-group__content[_ngcontent-%COMP%]{display:flex;gap:8px;align-items:flex-end}.control-group__content[_ngcontent-%COMP%] > *[_ngcontent-%COMP%]{flex:1}"]})}return o})();var G=l(7782),u=l(1119);const b=["input"];let A=(()=>{class o{constructor(){}input;value="";placeholder=(0,e.hFB)("Enter text here");onChange=()=>{};onTouched=()=>{};writeValue(t){this.changeValue(t)}registerOnChange(t){this.onChange=t}focus(){this.input?.nativeElement.focus()}registerOnTouched(t){this.onTouched=t}changeValue(t){this.value=t,this.onChange(this.value)}onChangeInput(t){this.changeValue(t.target.value)}static \u0275fac=function(n){return new(n||o)};static \u0275cmp=e.VBU({type:o,selectors:[["lg-textarea"]],viewQuery:function(n,i){if(1&n&&e.GBs(b,7),2&n){let c;e.mGM(c=e.lsd())&&(i.input=c.first)}},inputs:{placeholder:[1,"placeholder"]},features:[e.Jv_([{provide:r.kq,useExisting:o,multi:!0}])],decls:2,vars:2,consts:[["input",""],["rows","5",1,"textarea",3,"input","placeholder","value"]],template:function(n,i){if(1&n){const c=e.RV6();e.j41(0,"textarea",1,0),e.bIt("input",function(d){return e.eBV(c),e.Njj(i.onChangeInput(d))}),e.k0s()}2&n&&e.Y8G("placeholder",i.placeholder())("value",i.value)},dependencies:[r.YN],styles:["[_nghost-%COMP%]{display:flex;flex:1}.textarea[_ngcontent-%COMP%]{flex:1;border:none;border-radius:12px;padding:16px;background-color:var(--control-bg);font-family:inherit;font-size:inherit}.textarea[_ngcontent-%COMP%]::placeholder{color:var(--placeholder)}.textarea[_ngcontent-%COMP%]:focus{outline:none;box-shadow:var(--focus-shadow)}"]})}return o})();var k=l(152),T=l(8456),a=l(416),V=l(177),m=l(8536),w=l(9895);const y=["*",[["rowActions"]]],I=["*","rowActions"];let N=(()=>{class o{constructor(){}static \u0275fac=function(n){return new(n||o)};static \u0275cmp=e.VBU({type:o,selectors:[["lg-controls-row"]],ngContentSelectors:I,decls:5,vars:0,consts:[[1,"controls-row"],[1,"controls-row__controls"],[1,"controls-row__actions"]],template:function(n,i){1&n&&(e.NAR(y),e.j41(0,"div",0)(1,"div",1),e.SdG(2),e.k0s(),e.j41(3,"div",2),e.SdG(4,1),e.k0s()())},styles:[":host{display:flex;gap:16px}.controls-row{width:100%;display:flex;align-items:flex-end;gap:16px;flex:1}.controls-row__controls,.controls-row__actions{display:flex;align-items:flex-end;gap:16px}.controls-row__controls{flex:1}.controls-row__actions{flex:0;white-space:nowrap}.controls-row__controls>*,.controls-row__actions>*{flex:1}\n"],encapsulation:2})}return o})(),$=(()=>{class o{constructor(){}width="100%";static \u0275fac=function(n){return new(n||o)};static \u0275dir=e.FsC({type:o,selectors:[["","lgExpand",""]],hostVars:2,hostBindings:function(n,i){2&n&&e.xc7("width",i.width)}})}return o})();var E=l(9512),_=l(5554);const S=(o,s)=>(null==s.value.product_id?null:s.value.product_id.id)||s.value.name||s.value.amount;function B(o,s){if(1&o){const t=e.RV6();e.j41(0,"lg-gap-column",12)(1,"lg-control",16),e.qex(2,17),e.j41(3,"span",18),e.bIt("click",function(){e.eBV(t);const i=e.XpG().$index,c=e.XpG();return e.Njj(c.closeTextField(i))}),e.EFF(4,"Hide"),e.k0s(),e.bVm(),e.nrm(5,"lg-input",19),e.k0s()()}2&o&&(e.Y8G("size","small"),e.R7$(5),e.Y8G("placeholder","Here you can write the name of the ingredient"))}function X(o,s){if(1&o){const t=e.RV6();e.j41(0,"lg-multiselect",25),e.bIt("onSelected",function(){e.eBV(t),e.XpG(2);const i=e.sdS(6);return e.Njj(i.focus())}),e.k0s()}2&o&&e.Y8G("resource","recipes")("autoLoad",!0)}function Y(o,s){if(1&o){const t=e.RV6();e.j41(0,"lg-multiselect",26),e.bIt("onSelected",function(){e.eBV(t),e.XpG(2);const i=e.sdS(6);return e.Njj(i.focus())}),e.k0s()}2&o&&e.Y8G("resource","products")("autoLoad",!0)}function M(o,s){if(1&o){const t=e.RV6();e.j41(0,"lg-gap-column",12)(1,"lg-control"),e.qex(2,20),e.j41(3,"span",21),e.bIt("click",function(){e.eBV(t);const i=e.XpG().$index,c=e.XpG();return e.Njj(c.closeRecipeField(i))}),e.EFF(4," Product "),e.k0s(),e.bVm(),e.qex(5,22),e.j41(6,"span",21),e.bIt("click",function(){e.eBV(t);const i=e.XpG().$index,c=e.XpG();return e.Njj(c.openRecipeField(i))}),e.EFF(7,"Recipe"),e.k0s(),e.bVm(),e.qex(8,17),e.j41(9,"span",18),e.bIt("click",function(){e.eBV(t);const i=e.XpG().$index,c=e.XpG();return e.Njj(c.openTextField(i))}),e.EFF(10,"As text"),e.k0s(),e.bVm(),e.DNE(11,X,1,2,"lg-multiselect",23)(12,Y,1,2,"lg-multiselect",24),e.k0s()()}if(2&o){const t=e.XpG().$index,n=e.XpG();e.Y8G("size","small"),e.R7$(3),e.Y8G("ngClass",n.recipeFieldState()[t]?"":"text-active text-bold"),e.R7$(3),e.Y8G("ngClass",n.recipeFieldState()[t]?"text-active text-bold":""),e.R7$(5),e.vxM(n.recipeFieldState()[t]?11:12)}}function P(o,s){if(1&o){const t=e.RV6();e.qex(0,10),e.j41(1,"lg-controls-row"),e.DNE(2,B,6,2,"lg-gap-column",12)(3,M,13,4,"lg-gap-column",12),e.j41(4,"lg-control",13)(5,"lg-number-input",14,1),e.bIt("onKeydown",function(){e.eBV(t);const i=e.XpG();return e.Njj(i.addLast())}),e.k0s()(),e.qex(7,15),e.j41(8,"lg-button",11),e.bIt("click",function(){const i=e.eBV(t).$index,c=e.XpG();return e.Njj(c.deleteIngredient(i))}),e.EFF(9," Delete Ingredient "),e.k0s(),e.bVm(),e.k0s(),e.bVm()}if(2&o){const t=s.$index,n=e.XpG();e.Y8G("formGroupName",t),e.R7$(2),e.vxM(n.textFieldState()[t]?2:3),e.R7$(3),e.Y8G("placeholder","In grams"),e.R7$(3),e.Aen("danger"),e.Y8G("size","small")}}function O(o,s){if(1&o){const t=e.RV6();e.j41(0,"lg-button",18),e.bIt("click",function(){e.eBV(t);const i=e.XpG();return e.Njj(i.editRecipe(i.value))}),e.EFF(1," Edit Recipe "),e.k0s()}}function z(o,s){if(1&o){const t=e.RV6();e.j41(0,"lg-button",18),e.bIt("click",function(){e.eBV(t);const i=e.XpG();return e.Njj(i.addRecipe(i.value))}),e.EFF(1," Add Recipe "),e.k0s()}}let D=(()=>{class o{_recipesRepository;_selectResourcesService;_router;constructor(t,n,i){this._recipesRepository=t,this._selectResourcesService=n,this._router=i}form=new r.gE({name:new r.MJ(null,r.k0.required),description:new r.MJ("",r.k0.required),ingredients:new r.Yp([this._getIngredientGroup()])});uuid=(0,e.hFB)("");textFieldState=(0,e.vPA)({});recipeFieldState=(0,e.vPA)({});uuidEffect=(0,e.QZP)(()=>{this.uuid()&&this._recipesRepository.getOne(this.uuid(),t=>{this.form.reset({...t,ingredients:[]}),this.form.get("ingredients").clear(),t.ingredients.forEach((n,i)=>{this.ingredients.push(this._getIngredientGroup(n)),n.recipe_id&&this.openRecipeField(i),n.name&&this.openTextField(i)}),this.form.updateValueAndValidity()})});get ingredients(){return this.form.get("ingredients")}get value(){return this.form.value}get _values(){return(0,m.rY)((0,m.rh)(this.form.value))}addLast(){const t=this.ingredients.at(this.ingredients.length-1);(t.value.name||t.value.amount||t.value.product_id)&&this.addIngredient()}ngOnInit(){this.form.valueChanges.pipe((0,k.B)(500)).subscribe({next:t=>{console.log(t)}})}ngAfterViewInit(){this._selectResourcesService.load().then(t=>{})}addIngredient(){this.ingredients.push(new r.gE({name:new r.MJ("",r.k0.required),amount:new r.MJ(0,r.k0.required),product_id:new r.MJ("",r.k0.required)}))}deleteIngredient(t){this.ingredients.removeAt(t)}addRecipe(t){this._recipesRepository.addRecipe(this._values).then(()=>{this._router.navigate(["/recipes"])})}editRecipe(t){this._recipesRepository.editRecipe(this.uuid(),this._values).then(()=>{this._router.navigate(["/recipes"])})}openTextField(t){this.textFieldState.update(n=>({...n,[t]:!0})),this.ingredients.at(t).patchValue({product_id:null,recipe_id:null})}closeTextField(t){this.textFieldState.update(n=>({...n,[t]:!1})),this.ingredients.at(t).patchValue({product_id:null,recipe_id:null,name:""})}openRecipeField(t){this.recipeFieldState.update(n=>({...n,[t]:!0})),this.ingredients.at(t).patchValue({name:"",product_id:null})}closeRecipeField(t){this.recipeFieldState.update(n=>({...n,[t]:!1})),this.ingredients.at(t).patchValue({name:"",product_id:null})}_getIngredientGroup(t){return new r.gE({name:new r.MJ(t?.name),amount:new r.MJ(t?.amount.toString()??null,r.k0.required),product_id:new r.MJ(t?.product_id?{uuid:t.product_id}:null,r.k0.required),recipe_id:new r.MJ(t?.recipe_id?{uuid:t.recipe_id}:null,r.k0.required)})}static \u0275fac=function(n){return new(n||o)(e.rXU(E.m),e.rXU(a.n),e.rXU(_.Ix))};static \u0275cmp=e.VBU({type:o,selectors:[["lg-add-recipe-form"]],inputs:{uuid:[1,"uuid"]},features:[e.Jv_([{provide:a.n,useClass:a.n}])],decls:16,vars:9,consts:[["desc",""],["amount",""],[3,"formGroup"],[3,"position"],["label","Name","lgExpand",""],["formControlName","name",3,"onInputChanged","placeholder"],["label","Description","lgExpand",""],["formControlName","description",3,"placeholder"],["label","Ingredients","lgExpand",""],["formArrayName","ingredients","lgExpand",""],[3,"formGroupName"],[3,"click","size"],[3,"size"],["label","Amount"],["formControlName","amount",3,"onKeydown","placeholder"],["ngProjectAs","rowActions",5,["rowActions"]],["label","Name"],["ngProjectAs","endLabelTpl",5,["endLabelTpl"]],[3,"click"],["formControlName","name",3,"placeholder"],["ngProjectAs","labelTpl",5,["labelTpl"]],[3,"click","ngClass"],["ngProjectAs","afterLabelTpl",5,["afterLabelTpl"]],["formControlName","recipe_id",3,"resource","autoLoad"],["formControlName","product_id",3,"resource","autoLoad"],["formControlName","recipe_id",3,"onSelected","resource","autoLoad"],["formControlName","product_id",3,"onSelected","resource","autoLoad"]],template:function(n,i){if(1&n){const c=e.RV6();e.j41(0,"form",2)(1,"lg-gap-column",3)(2,"lg-control",4)(3,"lg-input",5),e.bIt("onInputChanged",function(){e.eBV(c);const d=e.sdS(6);return e.Njj(d.focus())}),e.k0s()(),e.j41(4,"lg-control",6),e.nrm(5,"lg-textarea",7,0),e.k0s(),e.j41(7,"lg-control-group",8)(8,"lg-gap-column",3)(9,"lg-gap-column",9),e.Z7z(10,P,10,6,"ng-container",10,S),e.k0s(),e.j41(12,"lg-button",11),e.bIt("click",function(){return e.eBV(c),e.Njj(i.addIngredient())}),e.EFF(13," Add Ingredient "),e.k0s()()(),e.DNE(14,O,2,0,"lg-button")(15,z,2,0,"lg-button"),e.k0s()()}2&n&&(e.Y8G("formGroup",i.form),e.R7$(),e.Y8G("position","start"),e.R7$(2),e.Y8G("placeholder","Your recipe name"),e.R7$(2),e.Y8G("placeholder","Describe your recipe, how to make it, what to pay attention to, etc."),e.R7$(3),e.Y8G("position","start"),e.R7$(2),e.Dyx(i.ingredients.controls),e.R7$(2),e.Aen("success"),e.Y8G("size","small"),e.R7$(2),e.vxM(i.uuid()?14:15))},dependencies:[r.X1,r.qT,r.BC,r.cb,r.j4,r.JD,r.$R,r.v8,C.S,F.X,j,G.K,u.Q,A,T.$,w.N,N,$,V.YU],encapsulation:2})}return o})();var J=l(7512);function L(o,s){if(1&o&&(e.j41(0,"lg-button",2),e.EFF(1," Calculate "),e.k0s()),2&o){const t=e.XpG();e.Aen("primary"),e.Y8G("flat",!0)("link","/calc-recipe/"+t.uuid())("size","small")}}let U=(()=>{class o{_aRoute;constructor(t){this._aRoute=t}uuid=(0,e.vPA)("");ngOnInit(){this._aRoute.params.subscribe(t=>{this.uuid.set(t.uuid)})}static \u0275fac=function(n){return new(n||o)(e.rXU(_.nX))};static \u0275cmp=e.VBU({type:o,selectors:[["app-add-recipe"]],decls:9,vars:9,consts:[[3,"center"],[3,"flat","link","size","style"],[3,"flat","link","size"],[3,"uuid"]],template:function(n,i){1&n&&(e.j41(0,"lg-container")(1,"lg-gap-row",0)(2,"lg-title"),e.EFF(3),e.k0s(),e.DNE(4,L,2,5,"lg-button",1),e.j41(5,"lg-button",2),e.EFF(6," Back to list "),e.k0s()(),e.j41(7,"lg-card"),e.nrm(8,"lg-add-recipe-form",3),e.k0s()()),2&n&&(e.R7$(),e.Y8G("center",!0),e.R7$(2),e.SpI("",i.uuid()?"Edit":"Add"," Recipe"),e.R7$(),e.vxM(i.uuid()?4:-1),e.R7$(),e.Aen("warning"),e.Y8G("flat",!0)("link","/recipes")("size","small"),e.R7$(3),e.Y8G("uuid",i.uuid()))},dependencies:[f.H,h.i,x.W,D,u.Q,J.I],encapsulation:2})}return o})()}}]);