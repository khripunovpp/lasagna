import {
  DocsService
} from "./chunk-XLVGBYUT.js";
import {
  ActivatedRoute,
  NavigationEnd,
  Router
} from "./chunk-UGLIF2MQ.js";
import "./chunk-5WJUMO7X.js";
import {
  AsyncPipe
} from "./chunk-5MHPI2FA.js";
import {
  Component,
  defer,
  filter,
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
  ɵɵelement,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵpipe,
  ɵɵpipeBind1,
  ɵɵproperty,
  ɵɵsanitizeHtml
} from "./chunk-6AETQSBA.js";
import "./chunk-PZQLIUCM.js";
import "./chunk-46DXP6YY.js";

// src/app/shared/view/documentation/article.component.ts
function ArticleComponent_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "div", 1);
  }
  if (rf & 2) {
    \u0275\u0275property("innerHTML", ctx, \u0275\u0275sanitizeHtml);
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
  content = defer(() => this.router.events.pipe(filter((event) => event instanceof NavigationEnd), startWith(null), switchMap(() => this._docsService.getDocs()), map((data) => ({
    data,
    url: this.route.snapshot.url.map((segment) => segment.path).join("/")
  })), map(({ data, url }) => {
    if (!url) {
      return "Start";
    }
    const doc = data.find((doc2) => doc2.path.includes(url));
    return doc?.html || "404 Not Found";
  })));
  static \u0275fac = function ArticleComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _ArticleComponent)(\u0275\u0275directiveInject(DocsService), \u0275\u0275directiveInject(ActivatedRoute), \u0275\u0275directiveInject(Router));
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _ArticleComponent, selectors: [["lg-article"]], decls: 3, vars: 3, consts: [[1, "lg-article"], [3, "innerHTML"]], template: function ArticleComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "div", 0);
      \u0275\u0275conditionalCreate(1, ArticleComponent_Conditional_1_Template, 1, 1, "div", 1);
      \u0275\u0275pipe(2, "async");
      \u0275\u0275elementEnd();
    }
    if (rf & 2) {
      let tmp_0_0;
      \u0275\u0275advance();
      \u0275\u0275conditional((tmp_0_0 = \u0275\u0275pipeBind1(2, 1, ctx.content)) ? 1 : -1, tmp_0_0);
    }
  }, dependencies: [AsyncPipe], encapsulation: 2 });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(ArticleComponent, [{
    type: Component,
    args: [{
      selector: "lg-article",
      template: `
      <div class="lg-article">
          @if (content | async;as contentHTML) {
              <div [innerHTML]="contentHTML"></div>
          }

      </div>
  `,
      standalone: true,
      imports: [
        AsyncPipe
      ]
    }]
  }], () => [{ type: DocsService }, { type: ActivatedRoute }, { type: Router }], null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(ArticleComponent, { className: "ArticleComponent", filePath: "src/app/shared/view/documentation/article.component.ts", lineNumber: 22 });
})();
export {
  ArticleComponent
};
//# sourceMappingURL=chunk-23KYLIJF.js.map
