import {
  Component,
  setClassMetadata,
  ɵsetClassDebugInfo,
  ɵɵdefineComponent,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵprojection,
  ɵɵprojectionDef
} from "./chunk-6AETQSBA.js";

// src/app/shared/view/ui/layout/container/container.component.ts
var _c0 = ["*"];
var ContainerComponent = class _ContainerComponent {
  static \u0275fac = function ContainerComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _ContainerComponent)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _ContainerComponent, selectors: [["lg-container"]], ngContentSelectors: _c0, decls: 2, vars: 0, consts: [[1, "container"]], template: function ContainerComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275projectionDef();
      \u0275\u0275elementStart(0, "section", 0);
      \u0275\u0275projection(1);
      \u0275\u0275elementEnd();
    }
  }, styles: ["\n\n[_nghost-%COMP%] {\n  display: flex;\n  height: 100%;\n  padding: 0 32px;\n}\n@media (max-width: 768px) {\n  [_nghost-%COMP%] {\n    padding: 0 16px;\n  }\n}\n.container[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  margin: 0 auto;\n  width: 100%;\n  max-width: var(--container-width);\n  gap: 32px;\n}\n@media (max-width: 600px) {\n  .container[_ngcontent-%COMP%] {\n    gap: 16px;\n  }\n}\n/*# sourceMappingURL=container.component.css.map */"] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(ContainerComponent, [{
    type: Component,
    args: [{ selector: "lg-container", standalone: true, template: `
      <section class="container">
          <ng-content></ng-content>
      </section>`, styles: ["/* angular:styles/component:scss;74963c26d8c7b460f38a9169b8f2d5107b2ede8b9c66e361f2f30101dff5379e;/Users/khripunovpavel/Documents/my/lasagna/lasagna/src/app/shared/view/ui/layout/container/container.component.ts */\n:host {\n  display: flex;\n  height: 100%;\n  padding: 0 32px;\n}\n@media (max-width: 768px) {\n  :host {\n    padding: 0 16px;\n  }\n}\n.container {\n  display: flex;\n  flex-direction: column;\n  margin: 0 auto;\n  width: 100%;\n  max-width: var(--container-width);\n  gap: 32px;\n}\n@media (max-width: 600px) {\n  .container {\n    gap: 16px;\n  }\n}\n/*# sourceMappingURL=container.component.css.map */\n"] }]
  }], null, null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(ContainerComponent, { className: "ContainerComponent", filePath: "src/app/shared/view/ui/layout/container/container.component.ts", lineNumber: 39 });
})();

export {
  ContainerComponent
};
//# sourceMappingURL=chunk-U5POLJOC.js.map
