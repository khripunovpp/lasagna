import {
  GapColumnComponent
} from "./chunk-5CDCXM6R.js";
import {
  TitleComponent
} from "./chunk-F2TP5Q2W.js";
import "./chunk-5MHPI2FA.js";
import {
  Component,
  setClassMetadata,
  ɵsetClassDebugInfo,
  ɵɵdefineComponent,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵproperty,
  ɵɵtext
} from "./chunk-6AETQSBA.js";
import "./chunk-46DXP6YY.js";

// src/app/shared/view/ui/error-page-404.component.ts
var ErrorPage404Component = class _ErrorPage404Component {
  constructor() {
  }
  static \u0275fac = function ErrorPage404Component_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _ErrorPage404Component)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _ErrorPage404Component, selectors: [["lg-error-page-404"]], decls: 5, vars: 1, consts: [[3, "position"]], template: function ErrorPage404Component_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "lg-gap-column", 0)(1, "lg-title");
      \u0275\u0275text(2, "404");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(3, "span");
      \u0275\u0275text(4, "Page not found");
      \u0275\u0275elementEnd()();
    }
    if (rf & 2) {
      \u0275\u0275property("position", "center");
    }
  }, dependencies: [
    GapColumnComponent,
    TitleComponent
  ], encapsulation: 2 });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(ErrorPage404Component, [{
    type: Component,
    args: [{
      selector: "lg-error-page-404",
      template: `
      <lg-gap-column [position]="'center'">
          <lg-title>404</lg-title>
          <span>Page not found</span>
      </lg-gap-column>
  `,
      standalone: true,
      imports: [
        GapColumnComponent,
        TitleComponent
      ]
    }]
  }], () => [], null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(ErrorPage404Component, { className: "ErrorPage404Component", filePath: "src/app/shared/view/ui/error-page-404.component.ts", lineNumber: 20 });
})();
export {
  ErrorPage404Component
};
//# sourceMappingURL=chunk-56RW6QJH.js.map
