import {
  Component,
  setClassMetadata,
  ɵsetClassDebugInfo,
  ɵɵdefineComponent,
  ɵɵprojection,
  ɵɵprojectionDef
} from "./chunk-RQATVJ2P.js";

// src/app/features/controls/form/control-box.component.ts
var _c0 = ["*"];
var ControlBoxComponent = class _ControlBoxComponent {
  static \u0275fac = function ControlBoxComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _ControlBoxComponent)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _ControlBoxComponent, selectors: [["lg-control-box"]], ngContentSelectors: _c0, decls: 1, vars: 0, template: function ControlBoxComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275projectionDef();
      \u0275\u0275projection(0);
    }
  }, styles: ["\n\n[_nghost-%COMP%] {\n  display: flex;\n  flex: 1;\n  background-color: var(--control-box-bg);\n  border-radius: 12px;\n  gap: 8px;\n  padding: 16px;\n}\n/*# sourceMappingURL=control-box.component.css.map */"] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(ControlBoxComponent, [{
    type: Component,
    args: [{ selector: "lg-control-box", template: `
    <ng-content></ng-content>
  `, styles: ["/* angular:styles/component:scss;77e156edd15d7a7b50287d32e08652d70bb3fefd366998edccaa4793fabc27e8;/Users/khripunovpavel/Documents/my/lasagna/lasagna/src/app/features/controls/form/control-box.component.ts */\n:host {\n  display: flex;\n  flex: 1;\n  background-color: var(--control-box-bg);\n  border-radius: 12px;\n  gap: 8px;\n  padding: 16px;\n}\n/*# sourceMappingURL=control-box.component.css.map */\n"] }]
  }], null, null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(ControlBoxComponent, { className: "ControlBoxComponent", filePath: "src/app/features/controls/form/control-box.component.ts", lineNumber: 21 });
})();

export {
  ControlBoxComponent
};
//# sourceMappingURL=chunk-GGP5XEQ3.js.map
