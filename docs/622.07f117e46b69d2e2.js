"use strict";(self.webpackChunklasagna=self.webpackChunklasagna||[]).push([[622],{622:(X,i,n)=>{n.r(i),n.d(i,{AddProductComponent:()=>y});var t=n(1007),a=n(5642),m=n(553),p=n(1086),e=n(9417),g=n(3333),f=n(7504),v=n(7782),h=n(1119),s=n(416),C=n(8456),d=n(8536),P=n(9895),R=n(7201),l=n(5554);function F(r,N){if(1&r){const o=t.RV6();t.j41(0,"lg-button",11),t.bIt("click",function(){t.eBV(o);const c=t.XpG();return t.Njj(c.editProduct(c.value))}),t.EFF(1," Edit Product "),t.k0s()}}function j(r,N){if(1&r){const o=t.RV6();t.j41(0,"lg-button",11),t.bIt("click",function(){t.eBV(o);const c=t.XpG();return t.Njj(c.addProduct(c.value))}),t.EFF(1," Add Product "),t.k0s()}}let A=(()=>{class r{_productsRepository;_selectResourcesService;_router;constructor(o,u,c){this._productsRepository=o,this._selectResourcesService=u,this._router=c}form=new e.gE({name:new e.MJ("",e.k0.required),amount:new e.MJ(0,e.k0.required),price:new e.MJ(0,e.k0.required),source:new e.MJ(""),category_id:new e.MJ(null,e.k0.required)});uuid=(0,t.hFB)("");uuidEffect=(0,t.QZP)(()=>{this.uuid()&&this._productsRepository.getOne(this.uuid(),o=>{console.log(o),this.form.reset(o)})});get value(){return this.form.value}ngOnInit(){}addProduct(o){this._productsRepository.addProduct((0,d.rh)(o)).then(()=>{this._router.navigate(["/home"])})}editProduct(o){this._productsRepository.editProduct(this.uuid(),(0,d.rh)(o)).then(()=>{this._router.navigate(["/home"])})}ngAfterViewInit(){this._selectResourcesService.load().then(o=>{console.log({resources:o})})}static \u0275fac=function(u){return new(u||r)(t.rXU(R.d),t.rXU(s.n),t.rXU(l.Ix))};static \u0275cmp=t.VBU({type:r,selectors:[["lg-add-product-form"]],inputs:{uuid:[1,"uuid"]},features:[t.Jv_([{provide:s.n,useClass:s.n}])],decls:14,vars:3,consts:[[3,"formGroup"],["label","Name"],["formControlName","name"],["label","Amount"],["formControlName","amount"],["label","Price per unit"],["formControlName","price"],["label","Source"],["formControlName","source"],["label","Category"],["formControlName","category_id",3,"resource"],[3,"click"]],template:function(u,c){1&u&&(t.j41(0,"form",0)(1,"lg-gap-column")(2,"lg-control",1),t.nrm(3,"lg-input",2),t.k0s(),t.j41(4,"lg-control",3),t.nrm(5,"lg-number-input",4),t.k0s(),t.j41(6,"lg-control",5),t.nrm(7,"lg-number-input",6),t.k0s(),t.j41(8,"lg-control",7),t.nrm(9,"lg-input",8),t.k0s(),t.j41(10,"lg-control",9),t.nrm(11,"lg-multiselect",10),t.k0s(),t.DNE(12,F,2,0,"lg-button")(13,j,2,0,"lg-button"),t.k0s()()),2&u&&(t.Y8G("formGroup",c.form),t.R7$(11),t.Y8G("resource","categories"),t.R7$(),t.vxM(c.uuid()?12:13))},dependencies:[e.X1,e.qT,e.BC,e.cb,e.j4,e.JD,g.S,f.X,v.K,h.Q,C.$,P.N],encapsulation:2})}return r})(),y=(()=>{class r{_aRoute;constructor(o){this._aRoute=o}uuid=(0,t.vPA)("");ngOnInit(){this._aRoute.params.subscribe(o=>{this.uuid.set(o.uuid)})}static \u0275fac=function(u){return new(u||r)(t.rXU(l.nX))};static \u0275cmp=t.VBU({type:r,selectors:[["app-add-recipe"]],decls:5,vars:2,consts:[[3,"uuid"]],template:function(u,c){1&u&&(t.j41(0,"lg-container")(1,"lg-title"),t.EFF(2),t.k0s(),t.j41(3,"lg-card"),t.nrm(4,"lg-add-product-form",0),t.k0s()()),2&u&&(t.R7$(2),t.SpI("",c.uuid()?"Edit":"Add"," Product"),t.R7$(2),t.Y8G("uuid",c.uuid()))},dependencies:[a.H,m.i,p.W,A],encapsulation:2})}return r})()}}]);