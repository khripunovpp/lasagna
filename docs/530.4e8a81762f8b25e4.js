"use strict";(self.webpackChunklasagna=self.webpackChunklasagna||[]).push([[530],{553:(d,i,e)=>{e.d(i,{i:()=>p});var t=e(1007);const r=["*"];let p=(()=>{class l{constructor(){}flat=(0,t.hFB)(!1);center=(0,t.hFB)(!1);static \u0275fac=function(n){return new(n||l)};static \u0275cmp=t.VBU({type:l,selectors:[["lg-card"]],inputs:{flat:[1,"flat"],center:[1,"center"]},ngContentSelectors:r,decls:2,vars:4,consts:[[1,"card"]],template:function(n,u){1&n&&(t.NAR(),t.j41(0,"div",0),t.SdG(1),t.k0s()),2&n&&t.AVh("flat",u.flat())("center",u.center())},styles:["[_nghost-%COMP%]{display:flex;width:100%}.card[_ngcontent-%COMP%]{background-color:#fff;padding:24px;border-radius:32px;width:100%;display:flex;flex-direction:column}.card.flat[_ngcontent-%COMP%]{padding:0}.card.center[_ngcontent-%COMP%]{justify-content:center;align-items:center}"]})}return l})()},1086:(d,i,e)=>{e.d(i,{W:()=>p});var t=e(1007);const r=["*"];let p=(()=>{class l{level=(0,t.vPA)(1);static \u0275fac=function(n){return new(n||l)};static \u0275cmp=t.VBU({type:l,selectors:[["lg-title"]],ngContentSelectors:r,decls:2,vars:0,consts:[["role","heading",1,"title"]],template:function(n,u){1&n&&(t.NAR(),t.j41(0,"p",0),t.SdG(1),t.k0s())},styles:[".title[_ngcontent-%COMP%]{font-size:1.5em;font-weight:700;margin:0}"]})}return l})()},3333:(d,i,e)=>{e.d(i,{S:()=>o});var t=e(1007),r=e(9417);const p=["input"],l=[[["after"]]],g=["after"];let o=(()=>{class n{constructor(){}input;value="";placeholder=(0,t.hFB)("Enter text here");onInputChanged=(0,t.CGW)();theme=(0,t.hFB)("default");noAfter=(0,t.vPA)(!1);onChange=()=>{};onTouched=()=>{};writeValue(s){this._change(s)}registerOnChange(s){this.onChange=s}registerOnTouched(s){this.onTouched=s}onChangeInput(s){this._change(s.target.value)}focus(){this.input?.nativeElement.focus()}ngAfterViewInit(){0===this.input?.nativeElement.nextElementSibling?.childElementCount&&this.noAfter.set(!0)}_change(s){this.value=s,this.onChange(this.value)}static \u0275fac=function(c){return new(c||n)};static \u0275cmp=t.VBU({type:n,selectors:[["lg-input"]],viewQuery:function(c,a){if(1&c&&t.GBs(p,7),2&c){let _;t.mGM(_=t.lsd())&&(a.input=_.first)}},inputs:{placeholder:[1,"placeholder"],theme:[1,"theme"]},outputs:{onInputChanged:"onInputChanged"},features:[t.Jv_([{provide:r.kq,useExisting:(0,t.Rfq)(()=>n),multi:!0}])],ngContentSelectors:g,decls:5,vars:6,consts:[["input",""],[1,"lg-input"],["type","text",1,"input",3,"change","input","placeholder","value"],[1,"lg-input__after"]],template:function(c,a){if(1&c){const _=t.RV6();t.NAR(l),t.j41(0,"div",1)(1,"input",2,0),t.bIt("change",function(){return t.eBV(_),t.Njj(a.onInputChanged.emit(a.value))})("input",function(h){return t.eBV(_),t.Njj(a.onChangeInput(h))}),t.k0s(),t.j41(3,"div",3),t.SdG(4),t.k0s()()}2&c&&(t.AVh("contrast","contrast"===a.theme()),t.R7$(),t.Y8G("placeholder",a.placeholder())("value",a.value),t.R7$(2),t.xc7("display",a.noAfter()?"none":"flex"))},dependencies:[r.YN],styles:["[_nghost-%COMP%]{display:flex;flex:1}.lg-input[_ngcontent-%COMP%]{display:flex;flex:1;background-color:var(--control-bg);border-radius:12px;gap:16px}.lg-input__after[_ngcontent-%COMP%]{display:flex;align-items:center;gap:16px}.input[_ngcontent-%COMP%]{flex:1;border:none;padding:16px;border-radius:12px;font-family:inherit;font-size:inherit;background-color:transparent}.input[_ngcontent-%COMP%]::placeholder{color:var(--placeholder)}.input[_ngcontent-%COMP%]:focus{outline:none;box-shadow:var(--focus-shadow)}"]})}return n})()},9694:(d,i,e)=>{e.r(i),e.d(i,{WidgetsPageComponent:()=>n});var t=e(8710),r=e(5642),p=e(7512),l=e(1086),g=e(553),o=e(1007);let n=(()=>{class u{static \u0275fac=function(a){return new(a||u)};static \u0275cmp=o.VBU({type:u,selectors:[["lg-widgets-page"]],decls:6,vars:1,consts:[[3,"center"]],template:function(a,_){1&a&&(o.j41(0,"lg-container")(1,"lg-gap-row",0)(2,"lg-title"),o.EFF(3," Widgets "),o.k0s()(),o.j41(4,"lg-card"),o.nrm(5,"lg-eggs-widget"),o.k0s()()),2&a&&(o.R7$(),o.Y8G("center",!0))},dependencies:[t.e,r.H,p.I,l.W,g.i],encapsulation:2})}return u})()}}]);