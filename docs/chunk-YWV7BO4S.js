import{a as h,b as M}from"./chunk-AYZPP7UL.js";import{i as _,j as x}from"./chunk-VHR6F3YK.js";import{Db as P,Eb as w,Fb as v,Nc as y,Qb as r,Ta as a,ab as l,f as m,ja as u,ka as d,lb as p,rb as f,sb as C,xb as i,yb as o,zb as g}from"./chunk-EXR2ZECX.js";function L(n,t){if(n&1){let e=P();i(0,"button",0),w("click",function(){u(e);let k=v();return d(k.installPWA())}),r(1,"\u0423\u0441\u0442\u0430\u043D\u043E\u0432\u0438\u0442\u044C PWA"),o()}}var c=class n{deferredPrompt=null;showButton=!1;ngOnInit(){window.addEventListener("beforeinstallprompt",t=>{t.preventDefault(),this.deferredPrompt=t,this.showButton=!0})}installPWA(){return m(this,null,function*(){if(!this.deferredPrompt)return;this.deferredPrompt.prompt();let{outcome:t}=yield this.deferredPrompt.userChoice;console.log(t==="accepted"?"PWA \u0443\u0441\u0442\u0430\u043D\u043E\u0432\u043B\u0435\u043D\u0430!":"\u041F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u0442\u0435\u043B\u044C \u043E\u0442\u043A\u0430\u0437\u0430\u043B\u0441\u044F \u043E\u0442 \u0443\u0441\u0442\u0430\u043D\u043E\u0432\u043A\u0438"),this.deferredPrompt=null,this.showButton=!1})}static \u0275fac=function(e){return new(e||n)};static \u0275cmp=l({type:n,selectors:[["app-pwa-install"]],decls:1,vars:1,consts:[[3,"click"]],template:function(e,s){e&1&&f(0,L,2,0,"button"),e&2&&C(s.showButton?0:-1)},encapsulation:2})};var O=class n{title="lasagna";static \u0275fac=function(e){return new(e||n)};static \u0275cmp=l({type:n,selectors:[["app-application"]],decls:19,vars:3,consts:[[1,"menu"],["routerLink","/recipes","routerLinkActive","active"],[3,"center"],["routerLink","/products","routerLinkActive","active"],["routerLink","/categories","routerLinkActive","active"]],template:function(e,s){e&1&&(i(0,"lg-container")(1,"lg-title"),r(2,"Hey"),o(),g(3,"app-pwa-install"),i(4,"section",0)(5,"nav")(6,"ul")(7,"li")(8,"a",1)(9,"lg-card",2),r(10," Recipes "),o()()(),i(11,"li")(12,"a",3)(13,"lg-card",2),r(14," Products "),o()()(),i(15,"li")(16,"a",4)(17,"lg-card",2),r(18," Categories "),o()()()()()()()),e&2&&(a(9),p("center",!0),a(4),p("center",!0),a(4),p("center",!0))},dependencies:[y,_,x,h,M,c],styles:[".menu[_ngcontent-%COMP%]   ul[_ngcontent-%COMP%]{list-style-type:none;padding:0;margin:0;display:flex;justify-content:center;flex-wrap:wrap;gap:32px}.menu[_ngcontent-%COMP%]   ul[_ngcontent-%COMP%]   li[_ngcontent-%COMP%]{flex:1}.menu[_ngcontent-%COMP%]   ul[_ngcontent-%COMP%]   li[_ngcontent-%COMP%]   lg-card[_ngcontent-%COMP%]{height:200px}"]})};export{O as ApplicationComponent};
