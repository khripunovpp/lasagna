import {
  Component,
  ViewEncapsulation,
  setClassMetadata,
  ɵsetClassDebugInfo,
  ɵɵdefineComponent,
  ɵɵdomElementEnd,
  ɵɵdomElementStart,
  ɵɵprojection,
  ɵɵprojectionDef
} from "./chunk-IYCVPBRB.js";
import "./chunk-46DXP6YY.js";

// src/app/shared/view/ui/overlay-actions/overlay-actions.component.ts
var _c0 = ["*"];
var OverlayActionsComponent = class _OverlayActionsComponent {
  static \u0275fac = function OverlayActionsComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _OverlayActionsComponent)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _OverlayActionsComponent, selectors: [["lg-overlay-actions"]], ngContentSelectors: _c0, decls: 2, vars: 0, consts: [[1, "overlay-actions"]], template: function OverlayActionsComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275projectionDef();
      \u0275\u0275domElementStart(0, "div", 0);
      \u0275\u0275projection(1);
      \u0275\u0275domElementEnd();
    }
  }, styles: ["/* angular:styles/component:scss;ce25b2e5d80110e22c40be25165ef8433986155f543a87ad5d5a5a66ca2db4d3;/Users/khripunovpavel/Documents/my/lasagna/lasagna/src/app/shared/view/ui/overlay-actions/overlay-actions.component.ts */\n.overlay-actions {\n  position: fixed;\n  top: 50%;\n  left: 0;\n  transform: translateY(-50%);\n  z-index: 20;\n  display: flex;\n  gap: 8px;\n  flex-direction: column;\n  justify-content: flex-start;\n  align-items: flex-start;\n  pointer-events: none;\n}\n.overlay-actions * {\n  pointer-events: auto;\n}\n@media (max-width: 599px) {\n  :host {\n    inset: auto 8px 12px 8px;\n  }\n  .overlay-actions {\n    justify-content: flex-start;\n    flex-wrap: wrap;\n  }\n}\n/*# sourceMappingURL=overlay-actions.component.css.map */\n"], encapsulation: 2 });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(OverlayActionsComponent, [{
    type: Component,
    args: [{ selector: "lg-overlay-actions", standalone: true, encapsulation: ViewEncapsulation.None, template: `
    <div class="overlay-actions">
      <ng-content></ng-content>
    </div>
  `, styles: ["/* angular:styles/component:scss;ce25b2e5d80110e22c40be25165ef8433986155f543a87ad5d5a5a66ca2db4d3;/Users/khripunovpavel/Documents/my/lasagna/lasagna/src/app/shared/view/ui/overlay-actions/overlay-actions.component.ts */\n.overlay-actions {\n  position: fixed;\n  top: 50%;\n  left: 0;\n  transform: translateY(-50%);\n  z-index: 20;\n  display: flex;\n  gap: 8px;\n  flex-direction: column;\n  justify-content: flex-start;\n  align-items: flex-start;\n  pointer-events: none;\n}\n.overlay-actions * {\n  pointer-events: auto;\n}\n@media (max-width: 599px) {\n  :host {\n    inset: auto 8px 12px 8px;\n  }\n  .overlay-actions {\n    justify-content: flex-start;\n    flex-wrap: wrap;\n  }\n}\n/*# sourceMappingURL=overlay-actions.component.css.map */\n"] }]
  }], null, null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(OverlayActionsComponent, { className: "OverlayActionsComponent", filePath: "src/app/shared/view/ui/overlay-actions/overlay-actions.component.ts", lineNumber: 43 });
})();
export {
  OverlayActionsComponent
};
//# sourceMappingURL=chunk-WACWWYJK.js.map
