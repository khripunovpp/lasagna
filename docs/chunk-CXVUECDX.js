import {
  ContainerComponent
} from "./chunk-UX3GX3WK.js";
import {
  RouterOutlet
} from "./chunk-HP5G5POF.js";
import "./chunk-ENTGQEHX.js";
import "./chunk-AL3DWPLK.js";
import {
  Component,
  setClassMetadata,
  setClassMetadataAsync,
  ɵsetClassDebugInfo,
  ɵɵdefer,
  ɵɵdeferOnIdle,
  ɵɵdefineComponent,
  ɵɵelement,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵproperty,
  ɵɵtemplate
} from "./chunk-UQVCVPTQ.js";
import "./chunk-46DXP6YY.js";

// src/app/features/documentation/view/documentation-container.component.ts
var DocumentationContainerComponent_Defer_2_DepsFn = () => [import("./chunk-25QJHYRS.js").then((m) => m.DocsThreeComponent)];
var DocumentationContainerComponent_Defer_7_DepsFn = () => [import("./chunk-TQUKVKIZ.js").then((m) => m.FaqComponent)];
function DocumentationContainerComponent_Defer_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "lg-docs-three");
  }
}
function DocumentationContainerComponent_Defer_6_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "lg-faq");
  }
}
var DocumentationContainerComponent = class _DocumentationContainerComponent {
  static \u0275fac = function DocumentationContainerComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _DocumentationContainerComponent)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _DocumentationContainerComponent, selectors: [["lg-documentation-container"]], hostAttrs: [1, "lg-documentation-container"], decls: 9, vars: 1, consts: [[3, "compact"], [1, "lg-documentation-container__content"]], template: function DocumentationContainerComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "lg-container", 0);
      \u0275\u0275template(1, DocumentationContainerComponent_Defer_1_Template, 1, 0);
      \u0275\u0275defer(2, 1, DocumentationContainerComponent_Defer_2_DepsFn);
      \u0275\u0275deferOnIdle();
      \u0275\u0275elementStart(4, "div", 1);
      \u0275\u0275element(5, "router-outlet");
      \u0275\u0275elementEnd();
      \u0275\u0275template(6, DocumentationContainerComponent_Defer_6_Template, 1, 0);
      \u0275\u0275defer(7, 6, DocumentationContainerComponent_Defer_7_DepsFn);
      \u0275\u0275deferOnIdle();
      \u0275\u0275elementEnd();
    }
    if (rf & 2) {
      \u0275\u0275property("compact", true);
    }
  }, dependencies: [
    RouterOutlet,
    ContainerComponent
  ], styles: ["\n\n/*# sourceMappingURL=documentation-container.component.css.map */"] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadataAsync(DocumentationContainerComponent, () => [import("./chunk-25QJHYRS.js").then((m) => m.DocsThreeComponent), import("./chunk-TQUKVKIZ.js").then((m) => m.FaqComponent)], (DocsThreeComponent, FaqComponent) => {
    setClassMetadata(DocumentationContainerComponent, [{
      type: Component,
      args: [{ selector: "lg-documentation-container", template: `
    <lg-container [compact]="true">
      @defer {
        <lg-docs-three></lg-docs-three>
      }

      <div class="lg-documentation-container__content">
        <router-outlet></router-outlet>
      </div>

      @defer {
        <lg-faq></lg-faq>
      }
    </lg-container>
  `, host: {
        class: "lg-documentation-container"
      }, imports: [
        RouterOutlet,
        ContainerComponent,
        DocsThreeComponent,
        FaqComponent
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
//# sourceMappingURL=chunk-CXVUECDX.js.map
