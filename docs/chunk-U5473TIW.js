import {
  TranslatePipe
} from "./chunk-755Q3QHA.js";
import {
  ContainerComponent
} from "./chunk-DB3CLH5P.js";
import {
  Component,
  setClassMetadata,
  setClassMetadataAsync,
  ɵsetClassDebugInfo,
  ɵɵdefer,
  ɵɵdeferOnIdle,
  ɵɵdefineComponent,
  ɵɵdomTemplate,
  ɵɵelement,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵpipe,
  ɵɵpipeBind1,
  ɵɵproperty,
  ɵɵtext,
  ɵɵtextInterpolate1
} from "./chunk-IYCVPBRB.js";
import "./chunk-46DXP6YY.js";

// src/app/features/documentation/view/documentation-container.component.ts
var DocumentationContainerComponent_Defer_3_DepsFn = () => [import("./chunk-DT5V5AZD.js").then((m) => m.RouterOutlet), import("./chunk-RSN5L4OL.js").then((m) => m.DocsThreeComponent), import("./chunk-JR32HCN3.js").then((m) => m.FaqComponent)];
function DocumentationContainerComponent_Defer_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "lg-docs-three");
    \u0275\u0275elementStart(1, "div", 1);
    \u0275\u0275element(2, "router-outlet");
    \u0275\u0275elementEnd();
    \u0275\u0275element(3, "lg-faq");
  }
}
function DocumentationContainerComponent_DeferError_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275text(0);
    \u0275\u0275pipe(1, "translate");
  }
  if (rf & 2) {
    \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind1(1, 1, "documents.defer-load-error"), " ");
  }
}
var DocumentationContainerComponent = class _DocumentationContainerComponent {
  static \u0275fac = function DocumentationContainerComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _DocumentationContainerComponent)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _DocumentationContainerComponent, selectors: [["lg-documentation-container"]], hostAttrs: [1, "lg-documentation-container"], decls: 5, vars: 1, consts: [[3, "compact"], [1, "lg-documentation-container__content"]], template: function DocumentationContainerComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "lg-container", 0);
      \u0275\u0275domTemplate(1, DocumentationContainerComponent_Defer_1_Template, 4, 0)(2, DocumentationContainerComponent_DeferError_2_Template, 2, 3);
      \u0275\u0275defer(3, 1, DocumentationContainerComponent_Defer_3_DepsFn, null, null, 2);
      \u0275\u0275deferOnIdle();
      \u0275\u0275elementEnd();
    }
    if (rf & 2) {
      \u0275\u0275property("compact", true);
    }
  }, dependencies: [
    ContainerComponent,
    TranslatePipe
  ], styles: ["\n\n/*# sourceMappingURL=documentation-container.component.css.map */"] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadataAsync(DocumentationContainerComponent, () => [import("./chunk-DT5V5AZD.js").then((m) => m.RouterOutlet), import("./chunk-RSN5L4OL.js").then((m) => m.DocsThreeComponent), import("./chunk-JR32HCN3.js").then((m) => m.FaqComponent)], (RouterOutlet, DocsThreeComponent, FaqComponent) => {
    setClassMetadata(DocumentationContainerComponent, [{
      type: Component,
      args: [{ selector: "lg-documentation-container", template: `
    <lg-container [compact]="true">
      @defer {
        <lg-docs-three></lg-docs-three>
        <div class="lg-documentation-container__content">
          <router-outlet></router-outlet>
        </div>
        <lg-faq></lg-faq>
      } @error {
        {{ 'documents.defer-load-error' | translate }}
      }
    </lg-container>
  `, host: {
        class: "lg-documentation-container"
      }, imports: [
        RouterOutlet,
        ContainerComponent,
        DocsThreeComponent,
        FaqComponent,
        TranslatePipe
      ], styles: ["/* angular:styles/component:scss;3bfdf2868831f9a202dd19f4779cb7dd578cb304561ea415f3e79b11992755b9;/Users/khripunovpavel/Documents/my/lasagna/lasagna/src/app/features/documentation/view/documentation-container.component.ts */\n/*# sourceMappingURL=documentation-container.component.css.map */\n"] }]
    }], null, null);
  });
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(DocumentationContainerComponent, { className: "DocumentationContainerComponent", filePath: "src/app/features/documentation/view/documentation-container.component.ts", lineNumber: 40 });
})();
export {
  DocumentationContainerComponent
};
//# sourceMappingURL=chunk-U5473TIW.js.map
