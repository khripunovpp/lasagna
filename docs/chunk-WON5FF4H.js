import {
  Component,
  input,
  setClassMetadata,
  ɵsetClassDebugInfo,
  ɵɵclassProp,
  ɵɵdefineComponent,
  ɵɵdomElementEnd,
  ɵɵdomElementStart,
  ɵɵprojection,
  ɵɵprojectionDef
} from "./chunk-Z5TNFCCP.js";

// src/app/shared/view/layout/container.component.ts
var _c0 = ["*"];
var ContainerComponent = class _ContainerComponent {
  compact = input(false, ...ngDevMode ? [{ debugName: "compact" }] : []);
  static \u0275fac = function ContainerComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _ContainerComponent)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _ContainerComponent, selectors: [["lg-container"]], inputs: { compact: [1, "compact"] }, ngContentSelectors: _c0, decls: 2, vars: 2, consts: [[1, "container"]], template: function ContainerComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275projectionDef();
      \u0275\u0275domElementStart(0, "section", 0);
      \u0275\u0275projection(1);
      \u0275\u0275domElementEnd();
    }
    if (rf & 2) {
      \u0275\u0275classProp("compact", ctx.compact());
    }
  }, styles: ["\n\n[_nghost-%COMP%] {\n  display: flex;\n  height: 100%;\n  padding: 0 32px;\n}\n@media (max-width: 768px) {\n  [_nghost-%COMP%] {\n    padding: 0 16px;\n  }\n}\n.container[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  margin: 0 auto;\n  width: 100%;\n  max-width: var(--container-width);\n  gap: 32px;\n}\n@media (max-width: 768px) {\n  .container[_ngcontent-%COMP%] {\n    gap: 16px;\n  }\n}\n.container.compact[_ngcontent-%COMP%] {\n  gap: 0 !important;\n}\n/*# sourceMappingURL=container.component.css.map */"] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(ContainerComponent, [{
    type: Component,
    args: [{ selector: "lg-container", standalone: true, template: `
    <section [class.compact]="compact()"
             class="container">
      <ng-content></ng-content>
    </section>`, styles: ["/* angular:styles/component:scss;bcf4c1f386517b03fd146acfb19358969312f154c6d5378abb9c7ed04686c406;/Users/khripunovpavel/Documents/my/lasagna/lasagna/src/app/shared/view/layout/container.component.ts */\n:host {\n  display: flex;\n  height: 100%;\n  padding: 0 32px;\n}\n@media (max-width: 768px) {\n  :host {\n    padding: 0 16px;\n  }\n}\n.container {\n  display: flex;\n  flex-direction: column;\n  margin: 0 auto;\n  width: 100%;\n  max-width: var(--container-width);\n  gap: 32px;\n}\n@media (max-width: 768px) {\n  .container {\n    gap: 16px;\n  }\n}\n.container.compact {\n  gap: 0 !important;\n}\n/*# sourceMappingURL=container.component.css.map */\n"] }]
  }], null, null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(ContainerComponent, { className: "ContainerComponent", filePath: "src/app/shared/view/layout/container.component.ts", lineNumber: 44 });
})();

export {
  ContainerComponent
};
//# sourceMappingURL=chunk-WON5FF4H.js.map
