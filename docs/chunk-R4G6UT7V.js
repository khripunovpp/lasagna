import {
  DocsService
} from "./chunk-BPMAQ256.js";
import "./chunk-OGDPSEDB.js";
import {
  USER_LANGUAGE
} from "./chunk-NLONWH5J.js";
import "./chunk-QHJLSFIB.js";
import "./chunk-UG5XPMCB.js";
import "./chunk-5WJUMO7X.js";
import {
  TranslatePipe
} from "./chunk-755Q3QHA.js";
import {
  ActivatedRoute,
  NavigationEnd,
  Router
} from "./chunk-L34DFTMV.js";
import "./chunk-USF337CA.js";
import "./chunk-VVQKNBNV.js";
import "./chunk-X2X7GTPW.js";
import "./chunk-PZQLIUCM.js";
import {
  Component,
  defer,
  filter,
  inject,
  map,
  setClassMetadata,
  setClassMetadataAsync,
  startWith,
  switchMap,
  ɵsetClassDebugInfo,
  ɵɵadvance,
  ɵɵconditional,
  ɵɵconditionalCreate,
  ɵɵdefer,
  ɵɵdeferOnIdle,
  ɵɵdefineComponent,
  ɵɵdirectiveInject,
  ɵɵdomElement,
  ɵɵdomElementEnd,
  ɵɵdomElementStart,
  ɵɵdomProperty,
  ɵɵdomTemplate,
  ɵɵnextContext,
  ɵɵpipe,
  ɵɵpipeBind1,
  ɵɵsanitizeHtml,
  ɵɵtext,
  ɵɵtextInterpolate1
} from "./chunk-IYCVPBRB.js";
import "./chunk-46DXP6YY.js";

// src/app/features/documentation/view/article.component.ts
var ArticleComponent_Defer_2_DepsFn = () => [import("./chunk-DXGXIKJ2.js").then((m) => m.AsyncPipe)];
function ArticleComponent_Defer_0_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275domElement(0, "div", 1);
  }
  if (rf & 2) {
    \u0275\u0275domProperty("innerHTML", ctx, \u0275\u0275sanitizeHtml);
  }
}
function ArticleComponent_Defer_0_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275domElementStart(0, "div", 0);
    \u0275\u0275conditionalCreate(1, ArticleComponent_Defer_0_Conditional_1_Template, 1, 1, "div", 1);
    \u0275\u0275pipe(2, "async");
    \u0275\u0275domElementEnd();
  }
  if (rf & 2) {
    let tmp_1_0;
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275conditional((tmp_1_0 = \u0275\u0275pipeBind1(2, 1, ctx_r0.content)) ? 1 : -1, tmp_1_0);
  }
}
function ArticleComponent_DeferError_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275text(0);
    \u0275\u0275pipe(1, "translate");
  }
  if (rf & 2) {
    \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind1(1, 1, "article.defer-load-error"), " ");
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
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _ArticleComponent, selectors: [["lg-article"]], decls: 4, vars: 0, consts: [[1, "lg-article"], [3, "innerHTML"]], template: function ArticleComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275domTemplate(0, ArticleComponent_Defer_0_Template, 3, 3)(1, ArticleComponent_DeferError_1_Template, 2, 3);
      \u0275\u0275defer(2, 0, ArticleComponent_Defer_2_DepsFn, null, null, 1);
      \u0275\u0275deferOnIdle();
    }
  }, dependencies: [TranslatePipe], styles: ["\n\n.lg-article[_ngcontent-%COMP%] {\n  display: flex;\n}\n/*# sourceMappingURL=article.component.css.map */"] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadataAsync(ArticleComponent, () => [import("./chunk-DXGXIKJ2.js").then((m) => m.AsyncPipe)], (AsyncPipe) => {
    setClassMetadata(ArticleComponent, [{
      type: Component,
      args: [{ selector: "lg-article", template: `
    @defer {
      <div class="lg-article">
        @if (content | async; as contentHTML) {
          <div [innerHTML]="contentHTML"></div>
        }
      </div>
    } @error {
      {{ 'article.defer-load-error' | translate }}
    }
  `, imports: [
        AsyncPipe,
        TranslatePipe
      ], styles: ["/* angular:styles/component:scss;e075a6200c15ff7eeaf84369addbf03be5bdadb73cc604faeb24acfbe0d4d6b4;/Users/khripunovpavel/Documents/my/lasagna/lasagna/src/app/features/documentation/view/article.component.ts */\n.lg-article {\n  display: flex;\n}\n/*# sourceMappingURL=article.component.css.map */\n"] }]
    }], () => [{ type: DocsService }, { type: ActivatedRoute }, { type: Router }], null);
  });
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(ArticleComponent, { className: "ArticleComponent", filePath: "src/app/features/documentation/view/article.component.ts", lineNumber: 34 });
})();
export {
  ArticleComponent
};
//# sourceMappingURL=chunk-R4G6UT7V.js.map
