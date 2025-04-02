"use strict";(self.webpackChunklasagna=self.webpackChunklasagna||[]).push([[892],{416:(b,g,e)=>{e.d(g,{n:()=>m});var t=e(467);const f={products:{name:"products",loaderConfig:{name:"indexDb",storeName:"productsStore"}},categories:{name:"categories",loaderConfig:{name:"indexDb",storeName:"categoryStore"}},recipes:{name:"recipes",loaderConfig:{name:"indexDb",storeName:"recipesStore"}}};var h=e(4412),l=e(1007),a=e(2890);let m=(()=>{class s{_indexDbSelectLoaderService;constructor(n){this._indexDbSelectLoaderService=n}_registry=new Map;_registry$=new h.t(new Map);register(n){if(this._registry.has(n))return;const o=f[n];if(!o)throw new Error(`SelectResource ${n} not found`);this._registry.set(o.name,{name:o.name,list:[],lists:{},loader:{load:()=>this._indexDbSelectLoaderService.load(o.loaderConfig?.storeName)}})}get(n){return this._registry.get(n)}load(n){var o=this;const i=n||Array.from(this._registry.keys());return Promise.all(i.map(function(){var c=(0,t.A)(function*(y){const C=o.get(y),_=yield C.loader.load(C.name);Array.isArray(_)?C.list=_:C.lists=_});return function(y){return c.apply(this,arguments)}}())).then(()=>i.reduce((c,y)=>(c[y]=this.get(y),c),{})).then(()=>{this._registry$.next(this._registry)})}subscribe(n){return this._registry$.subscribe(n)}static \u0275fac=function(o){return new(o||s)(l.KVO(a.L,8))};static \u0275prov=l.jDH({token:s,factory:s.\u0275fac})}return s})()},2890:(b,g,e)=>{e.d(g,{L:()=>h});var t=e(1007),f=e(6659);let h=(()=>{class l{_indexDb;constructor(m){this._indexDb=m}load(m){return this._indexDb.getAll(m)}static \u0275fac=function(s){return new(s||l)(t.KVO(f.j))};static \u0275prov=t.jDH({token:l,factory:l.\u0275fac,providedIn:"root"})}return l})()},2892:(b,g,e)=>{e.r(g),e.d(g,{AddCategoryComponent:()=>A});var t=e(1007),f=e(5642),h=e(553),l=e(1086),a=e(9417),m=e(3333),s=e(7504),v=e(7782),n=e(1119),o=e(416),i=e(2933),c=e(1636);function y(u,E){if(1&u){const r=t.RV6();t.j41(0,"lg-button",3),t.bIt("click",function(){t.eBV(r);const p=t.XpG();return t.Njj(p.editCategory(p.value))}),t.EFF(1," Edit Category "),t.k0s()}}function C(u,E){if(1&u){const r=t.RV6();t.j41(0,"lg-button",3),t.bIt("click",function(){t.eBV(r);const p=t.XpG();return t.Njj(p.addCategory(p.value))}),t.EFF(1," Add Category "),t.k0s()}}let _=(()=>{class u{_categoryRepository;_selectResourcesService;_router;constructor(r,d,p){this._categoryRepository=r,this._selectResourcesService=d,this._router=p}form=new a.gE({name:new a.MJ("",a.k0.required)});uuid=(0,t.hFB)("");uuidEffect=(0,t.QZP)(()=>{this.uuid()&&this._categoryRepository.getOne(this.uuid()).then(r=>{this.form.reset(r),this.form.updateValueAndValidity()})});get value(){return this.form.value}ngOnInit(){}addCategory(r){this._categoryRepository.addCategory(r).then(()=>{this._router.navigate(["/categories"])})}editCategory(r){this._categoryRepository.editCategory(this.uuid(),r).then(()=>{this._router.navigate(["/categories"])})}static \u0275fac=function(d){return new(d||u)(t.rXU(i.P),t.rXU(o.n),t.rXU(c.Ix))};static \u0275cmp=t.VBU({type:u,selectors:[["lg-add-category-form"]],inputs:{uuid:[1,"uuid"]},features:[t.Jv_([{provide:o.n,useClass:o.n}])],decls:6,vars:3,consts:[[3,"formGroup"],["label","Name"],["formControlName","name",3,"placeholder"],[3,"click"]],template:function(d,p){1&d&&(t.j41(0,"form",0)(1,"lg-gap-column")(2,"lg-control",1),t.nrm(3,"lg-input",2),t.k0s(),t.DNE(4,y,2,0,"lg-button")(5,C,2,0,"lg-button"),t.k0s()()),2&d&&(t.Y8G("formGroup",p.form),t.R7$(3),t.Y8G("placeholder","Your category name"),t.R7$(),t.vxM(p.uuid()?4:5))},dependencies:[a.X1,a.qT,a.BC,a.cb,a.j4,a.JD,m.S,s.X,v.K,n.Q],encapsulation:2})}return u})();var x=e(7512);let A=(()=>{class u{_aRoute;constructor(r){this._aRoute=r}uuid=(0,t.vPA)("");ngOnInit(){this._aRoute.params.subscribe(r=>{this.uuid.set(r.uuid)})}static \u0275fac=function(d){return new(d||u)(t.rXU(c.nX))};static \u0275cmp=t.VBU({type:u,selectors:[["lg-add-category"]],decls:8,vars:8,consts:[[3,"center"],[3,"flat","link","size"],[3,"uuid"]],template:function(d,p){1&d&&(t.j41(0,"lg-container")(1,"lg-gap-row",0)(2,"lg-title"),t.EFF(3),t.k0s(),t.j41(4,"lg-button",1),t.EFF(5," Back to list "),t.k0s()(),t.j41(6,"lg-card"),t.nrm(7,"lg-add-category-form",2),t.k0s()()),2&d&&(t.R7$(),t.Y8G("center",!0),t.R7$(2),t.SpI("",p.uuid()?"Edit":"Add"," Category"),t.R7$(),t.Aen("warning"),t.Y8G("flat",!0)("link","/categories")("size","small"),t.R7$(3),t.Y8G("uuid",p.uuid()))},dependencies:[f.H,h.i,l.W,_,x.I,n.Q],encapsulation:2})}return u})()},3333:(b,g,e)=>{e.d(g,{S:()=>m});var t=e(1007),f=e(9417);const h=["input"],l=[[["after"]]],a=["after"];let m=(()=>{class s{constructor(){}input;value="";placeholder=(0,t.hFB)("Enter text here");onInputChanged=(0,t.CGW)();theme=(0,t.hFB)("default");noAfter=(0,t.vPA)(!1);onChange=()=>{};onTouched=()=>{};writeValue(n){this._change(n)}registerOnChange(n){this.onChange=n}registerOnTouched(n){this.onTouched=n}onChangeInput(n){this._change(n.target.value)}focus(){this.input?.nativeElement.focus()}ngAfterViewInit(){0===this.input?.nativeElement.nextElementSibling?.childElementCount&&this.noAfter.set(!0)}_change(n){this.value=n,this.onChange(this.value)}static \u0275fac=function(o){return new(o||s)};static \u0275cmp=t.VBU({type:s,selectors:[["lg-input"]],viewQuery:function(o,i){if(1&o&&t.GBs(h,7),2&o){let c;t.mGM(c=t.lsd())&&(i.input=c.first)}},inputs:{placeholder:[1,"placeholder"],theme:[1,"theme"]},outputs:{onInputChanged:"onInputChanged"},features:[t.Jv_([{provide:f.kq,useExisting:(0,t.Rfq)(()=>s),multi:!0}])],ngContentSelectors:a,decls:5,vars:6,consts:[["input",""],[1,"lg-input"],["type","text",1,"input",3,"change","input","placeholder","value"],[1,"lg-input__after"]],template:function(o,i){if(1&o){const c=t.RV6();t.NAR(l),t.j41(0,"div",1)(1,"input",2,0),t.bIt("change",function(){return t.eBV(c),t.Njj(i.onInputChanged.emit(i.value))})("input",function(C){return t.eBV(c),t.Njj(i.onChangeInput(C))}),t.k0s(),t.j41(3,"div",3),t.SdG(4),t.k0s()()}2&o&&(t.AVh("contrast","contrast"===i.theme()),t.R7$(),t.Y8G("placeholder",i.placeholder())("value",i.value),t.R7$(2),t.xc7("display",i.noAfter()?"none":"flex"))},dependencies:[f.YN],styles:["[_nghost-%COMP%]{display:flex;flex:1}.lg-input[_ngcontent-%COMP%]{display:flex;flex:1;background-color:var(--control-bg);border-radius:12px;gap:16px}.lg-input__after[_ngcontent-%COMP%]{display:flex;align-items:center;gap:16px}.input[_ngcontent-%COMP%]{flex:1;border:none;padding:16px;border-radius:12px;font-family:inherit;font-size:inherit;background-color:transparent}.input[_ngcontent-%COMP%]::placeholder{color:var(--placeholder)}.input[_ngcontent-%COMP%]:focus{outline:none;box-shadow:var(--focus-shadow)}"]})}return s})()},7504:(b,g,e)=>{e.d(g,{X:()=>l});var t=e(1007);const f=[[["beforeLabelTpl"]],[["labelTpl"]],[["afterLabelTpl"]],[["endLabelTpl"]],"*"],h=["beforeLabelTpl","labelTpl","afterLabelTpl","endLabelTpl","*"];let l=(()=>{class a{constructor(){}label=(0,t.hFB)("");static \u0275fac=function(v){return new(v||a)};static \u0275cmp=t.VBU({type:a,selectors:[["lg-control"]],inputs:{label:[1,"label"]},ngContentSelectors:h,decls:11,vars:1,consts:[[1,"control"],[1,"control__label"],[1,"control__label-string"],[1,"control__label-end"],[1,"control__content"]],template:function(v,n){1&v&&(t.NAR(f),t.j41(0,"div",0)(1,"label",1),t.SdG(2),t.j41(3,"span",2),t.SdG(4,1),t.EFF(5),t.k0s(),t.SdG(6,2),t.j41(7,"div",3),t.SdG(8,3),t.k0s()(),t.j41(9,"div",4),t.SdG(10,4),t.k0s()()),2&v&&(t.R7$(5),t.SpI(" ",n.label()," "))},styles:[".control{display:flex;flex-direction:column;gap:8px}.control__label{font-size:.9rem;display:flex;align-items:flex-end;gap:8px}.control__label-end{display:flex;align-items:flex-end;gap:8px;margin-left:auto}.control__content{display:flex}\n"],encapsulation:2})}return a})()}}]);