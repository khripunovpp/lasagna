import {
  DocsService
} from "./chunk-AUXPMPTM.js";
import "./chunk-I546HKDL.js";
import {
  USER_LANGUAGE
} from "./chunk-OOJ6JS4B.js";
import "./chunk-5WJUMO7X.js";
import "./chunk-DXRFKXPR.js";
import {
  ActivatedRoute,
  NavigationEnd,
  Router
} from "./chunk-SHM3W5T3.js";
import "./chunk-VBFW7QHU.js";
import {
  AsyncPipe
} from "./chunk-7I2CR6I6.js";
import {
  Component,
  defer,
  filter,
  inject,
  map,
  setClassMetadata,
  startWith,
  switchMap,
  ɵsetClassDebugInfo,
  ɵɵadvance,
  ɵɵconditional,
  ɵɵconditionalCreate,
  ɵɵdefineComponent,
  ɵɵdirectiveInject,
  ɵɵdomElement,
  ɵɵdomElementEnd,
  ɵɵdomElementStart,
  ɵɵdomProperty,
  ɵɵpipe,
  ɵɵpipeBind1,
  ɵɵsanitizeHtml
} from "./chunk-RQATVJ2P.js";
import "./chunk-PZQLIUCM.js";
import "./chunk-46DXP6YY.js";

// src/app/features/documentation/view/article.component.ts
function ArticleComponent_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275domElement(0, "div", 1);
  }
  if (rf & 2) {
    \u0275\u0275domProperty("innerHTML", ctx, \u0275\u0275sanitizeHtml);
  }
}
var ArticleComponent = class _ArticleComponent {
  _docsService;
  route;
  router;
  constructor(_docsService, route, router) {
    this._docsService = _docsService;
    this.route = route;
    this.router = router;
  }
  _userLang = inject(USER_LANGUAGE);
  content = defer(() => this.router.events.pipe(filter((event) => event instanceof NavigationEnd), startWith(null), switchMap(() => this._docsService.getDocs()), map((data) => ({
    data,
    url: this.route.snapshot.url.map((segment) => segment.path).join("/")
  })), map(({ data, url }) => {
    if (!url) {
      return "";
    }
    const doc = data.filter((doc2) => doc2.path.includes(url));
    const targetByLang = doc.find((d) => d.language === this._userLang());
    if (!doc.length) {
      return "Start";
    }
    if (doc.length > 1 && targetByLang) {
      return targetByLang.html;
    }
    return doc[0]?.html || "404 Not Found";
  })));
  static \u0275fac = function ArticleComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _ArticleComponent)(\u0275\u0275directiveInject(DocsService), \u0275\u0275directiveInject(ActivatedRoute), \u0275\u0275directiveInject(Router));
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _ArticleComponent, selectors: [["lg-article"]], decls: 3, vars: 3, consts: [[1, "lg-article"], [3, "innerHTML"]], template: function ArticleComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275domElementStart(0, "div", 0);
      \u0275\u0275conditionalCreate(1, ArticleComponent_Conditional_1_Template, 1, 1, "div", 1);
      \u0275\u0275pipe(2, "async");
      \u0275\u0275domElementEnd();
    }
    if (rf & 2) {
      let tmp_0_0;
      \u0275\u0275advance();
      \u0275\u0275conditional((tmp_0_0 = \u0275\u0275pipeBind1(2, 1, ctx.content)) ? 1 : -1, tmp_0_0);
    }
  }, dependencies: [AsyncPipe], styles: ["\n\n.lg-article[_ngcontent-%COMP%] {\n  display: flex;\n}\n/*# sourceMappingURL=article.component.css.map */"] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(ArticleComponent, [{
    type: Component,
    args: [{ selector: "lg-article", template: `
    <div class="lg-article">
      @if (content | async; as contentHTML) {
        <div [innerHTML]="contentHTML"></div>
      }
    </div>
  `, imports: [
      AsyncPipe
    ], styles: ["/* angular:styles/component:scss;e075a6200c15ff7eeaf84369addbf03be5bdadb73cc604faeb24acfbe0d4d6b4;/Users/khripunovpavel/Documents/my/lasagna/lasagna/src/app/features/documentation/view/article.component.ts */\n.lg-article {\n  display: flex;\n}\n/*# sourceMappingURL=article.component.css.map */\n"] }]
  }], () => [{ type: DocsService }, { type: ActivatedRoute }, { type: Router }], null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(ArticleComponent, { className: "ArticleComponent", filePath: "src/app/features/documentation/view/article.component.ts", lineNumber: 28 });
})();
export {
  ArticleComponent
};
//# sourceMappingURL=chunk-LHMXDNOY.js.map
