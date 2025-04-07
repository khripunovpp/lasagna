import{b as ee}from"./chunk-ZM37BWPV.js";import{a as $}from"./chunk-GQAWBXZL.js";import{a as X}from"./chunk-7BACYQJQ.js";import{a as J,d as Q}from"./chunk-4K3JQH4K.js";import{$a as D,$b as q,Bb as z,C as d,H as g,Ia as E,Ja as S,Ka as F,M as T,O as j,P as I,Q as c,Qb as B,R as x,Sb as H,Ub as K,Vb as Z,W as L,Xb as G,a as N,ac as Y,ea as W,gb as U,i as C,ia as O,j as w,na as _,qb as V,r as h,ta as y,ua as R,w as l,wa as P,x as A,za as k}from"./chunk-P3KTPPMX.js";var te=[{path:"",children:[{path:"",redirectTo:"home",pathMatch:"full"},{path:"home",loadComponent:()=>import("./chunk-7AMITVLD.js").then(e=>e.ApplicationComponent)},{path:"add-recipe",loadComponent:()=>import("./chunk-SZ6CKW5H.js").then(e=>e.AddRecipeComponent)},{path:"edit-recipe/:uuid",loadComponent:()=>import("./chunk-SZ6CKW5H.js").then(e=>e.AddRecipeComponent)},{path:"calc-recipe/:uuid",loadComponent:()=>import("./chunk-I5HKXK5D.js").then(e=>e.CalculateRecipeComponent)},{path:"recipes",loadComponent:()=>import("./chunk-YXGGZ756.js").then(e=>e.RecipesListComponent)},{path:"add-product",loadComponent:()=>import("./chunk-KT5EPCLR.js").then(e=>e.AddProductComponent)},{path:"edit-product/:uuid",loadComponent:()=>import("./chunk-KT5EPCLR.js").then(e=>e.AddProductComponent)},{path:"products",loadComponent:()=>import("./chunk-LCTAMNVK.js").then(e=>e.ProductListComponent)},{path:"add-category",loadComponent:()=>import("./chunk-W3MSZY7U.js").then(e=>e.AddCategoryComponent)},{path:"edit-category/:uuid",loadComponent:()=>import("./chunk-W3MSZY7U.js").then(e=>e.AddCategoryComponent)},{path:"categories",loadComponent:()=>import("./chunk-AIX7GMW2.js").then(e=>e.CategoryListComponent)},{path:"widgets",loadComponent:()=>import("./chunk-SV2JI3WT.js").then(e=>e.WidgetsPageComponent)}]}];var f="Service workers are disabled or not supported by this browser",u=class{serviceWorker;worker;registration;events;constructor(o,r){if(this.serviceWorker=o,!o)this.worker=this.events=this.registration=new C(n=>n.error(new Error(f)));else{let n=null,t=new w;this.worker=new C(p=>(n!==null&&p.next(n),t.subscribe(b=>p.next(b))));let s=()=>{let{controller:p}=o;p!==null&&(n=p,t.next(n))};o.addEventListener("controllerchange",s),s(),this.registration=this.worker.pipe(g(()=>o.getRegistration()));let i=new w;this.events=i.asObservable();let a=p=>{let{data:b}=p;b?.type&&i.next(b)};o.addEventListener("message",a),r?.get(R,null,{optional:!0})?.onDestroy(()=>{o.removeEventListener("controllerchange",s),o.removeEventListener("message",a)})}}postMessage(o,r){return new Promise(n=>{this.worker.pipe(d(1)).subscribe(t=>{t.postMessage(N({action:o},r)),n()})})}postMessageWithOperation(o,r,n){let t=this.waitForOperationCompleted(n),s=this.postMessage(o,r);return Promise.all([s,t]).then(([,i])=>i)}generateNonce(){return Math.round(Math.random()*1e7)}eventsOfType(o){let r;return typeof o=="string"?r=n=>n.type===o:r=n=>o.includes(n.type),this.events.pipe(A(r))}nextEventOfType(o){return this.eventsOfType(o).pipe(d(1))}waitForOperationCompleted(o){return new Promise((r,n)=>{this.eventsOfType("OPERATION_COMPLETED").pipe(A(t=>t.nonce===o),d(1),h(t=>{if(t.result!==void 0)return t.result;throw new Error(t.error)})).subscribe({next:r,error:n})})}get isEnabled(){return!!this.serviceWorker}},ae=(()=>{class e{sw;messages;notificationClicks;subscription;get isEnabled(){return this.sw.isEnabled}pushManager=null;subscriptionChanges=new w;constructor(r){if(this.sw=r,!r.isEnabled){this.messages=l,this.notificationClicks=l,this.subscription=l;return}this.messages=this.sw.eventsOfType("PUSH").pipe(h(t=>t.data)),this.notificationClicks=this.sw.eventsOfType("NOTIFICATION_CLICK").pipe(h(t=>t.data)),this.pushManager=this.sw.registration.pipe(h(t=>t.pushManager));let n=this.pushManager.pipe(g(t=>t.getSubscription()));this.subscription=new C(t=>{let s=n.subscribe(t),i=this.subscriptionChanges.subscribe(t);return()=>{s.unsubscribe(),i.unsubscribe()}})}requestSubscription(r){if(!this.sw.isEnabled||this.pushManager===null)return Promise.reject(new Error(f));let n={userVisibleOnly:!0},t=this.decodeBase64(r.serverPublicKey.replace(/_/g,"/").replace(/-/g,"+")),s=new Uint8Array(new ArrayBuffer(t.length));for(let i=0;i<t.length;i++)s[i]=t.charCodeAt(i);return n.applicationServerKey=s,new Promise((i,a)=>{this.pushManager.pipe(g(m=>m.subscribe(n)),d(1)).subscribe({next:m=>{this.subscriptionChanges.next(m),i(m)},error:a})})}unsubscribe(){if(!this.sw.isEnabled)return Promise.reject(new Error(f));let r=n=>{if(n===null)throw new Error("Not subscribed to push notifications.");return n.unsubscribe().then(t=>{if(!t)throw new Error("Unsubscribe failed!");this.subscriptionChanges.next(null)})};return new Promise((n,t)=>{this.subscription.pipe(d(1),g(r)).subscribe({next:n,error:t})})}decodeBase64(r){return atob(r)}static \u0275fac=function(n){return new(n||e)(I(u))};static \u0275prov=T({token:e,factory:e.\u0275fac})}return e})(),pe=(()=>{class e{sw;versionUpdates;unrecoverable;get isEnabled(){return this.sw.isEnabled}constructor(r){if(this.sw=r,!r.isEnabled){this.versionUpdates=l,this.unrecoverable=l;return}this.versionUpdates=this.sw.eventsOfType(["VERSION_DETECTED","VERSION_INSTALLATION_FAILED","VERSION_READY","NO_NEW_VERSION_DETECTED"]),this.unrecoverable=this.sw.eventsOfType("UNRECOVERABLE_STATE")}checkForUpdate(){if(!this.sw.isEnabled)return Promise.reject(new Error(f));let r=this.sw.generateNonce();return this.sw.postMessageWithOperation("CHECK_FOR_UPDATES",{nonce:r},r)}activateUpdate(){if(!this.sw.isEnabled)return Promise.reject(new Error(f));let r=this.sw.generateNonce();return this.sw.postMessageWithOperation("ACTIVATE_UPDATE",{nonce:r},r)}static \u0275fac=function(n){return new(n||e)(I(u))};static \u0275prov=T({token:e,factory:e.\u0275fac})}return e})();var ne=new j("");function ce(){let e=c(v);if(!("serviceWorker"in navigator&&e.enabled!==!1))return;let o=c(ne),r=c(W),n=c(R);r.runOutsideAngular(()=>{let t=navigator.serviceWorker,s=()=>t.controller?.postMessage({action:"INITIALIZE"});t.addEventListener("controllerchange",s),n.onDestroy(()=>{t.removeEventListener("controllerchange",s)})}),r.runOutsideAngular(()=>{let t,{registrationStrategy:s}=e;if(typeof s=="function")t=new Promise(i=>s().subscribe(()=>i()));else{let[i,...a]=(s||"registerWhenStable:30000").split(":");switch(i){case"registerImmediately":t=Promise.resolve();break;case"registerWithDelay":t=re(+a[0]||0);break;case"registerWhenStable":t=Promise.race([n.whenStable(),re(+a[0])]);break;default:throw new Error(`Unknown ServiceWorker registration strategy: ${e.registrationStrategy}`)}}t.then(()=>navigator.serviceWorker.register(o,{scope:e.scope}).catch(i=>console.error("Service worker registration failed with:",i)))})}function re(e){return new Promise(o=>setTimeout(o,e))}function le(e,o){return new u(e.enabled!==!1?navigator.serviceWorker:void 0,o)}var v=class{enabled;scope;registrationStrategy};function oe(e,o={}){return x([ae,pe,{provide:ne,useValue:e},{provide:v,useValue:o},{provide:u,useFactory:le,deps:[v,L]},y(ce)])}var ie={providers:[V({eventCoalescing:!0}),q(te),Z(K()),ee(),H(),y(()=>{let e=c(X);return Promise.all([e.preloadCategories()])}),oe("ngsw-worker.js",{enabled:!z(),registrationStrategy:"registerWhenStable:30000"})]};var M=class e{title="lasagna";static \u0275fac=function(r){return new(r||e)};static \u0275cmp=_({type:e,selectors:[["app-root"]],features:[U([])],decls:10,vars:10,consts:[[1,"app"],[3,"flat","link","size"]],template:function(r,n){r&1&&(E(0,"main",0)(1,"lg-gap-column")(2,"lg-container")(3,"lg-gap-row")(4,"lg-button",1),D(5," My store "),S(),E(6,"lg-button",1),D(7," Widgets "),S()()(),E(8,"div"),F(9,"router-outlet"),S()()()),r&2&&(O(4),k("primary"),P("flat",!0)("link","/home")("size","small"),O(2),k("info"),P("flat",!0)("link","/widgets")("size","small"))},dependencies:[G,$,Y,J,Q],styles:[".app[_ngcontent-%COMP%]{padding:32px 0}"]})};B(M,ie).catch(e=>console.error(e));
