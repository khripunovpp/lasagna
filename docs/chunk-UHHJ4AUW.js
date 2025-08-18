import {
  Component,
  ViewEncapsulation,
  input,
  setClassMetadata,
  ɵsetClassDebugInfo,
  ɵɵclassProp,
  ɵɵdefineComponent,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵprojection,
  ɵɵprojectionDef
} from "./chunk-UQVCVPTQ.js";

// src/app/features/controls/form/controls-row.component.ts
var _c0 = ["*", [["rowActions"]]];
var _c1 = ["*", "rowActions"];
var ControlsRowComponent = class _ControlsRowComponent {
  constructor() {
  }
  mobileMode = input(false);
  equal = input(false);
  static \u0275fac = function ControlsRowComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _ControlsRowComponent)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _ControlsRowComponent, selectors: [["lg-controls-row"]], inputs: { mobileMode: [1, "mobileMode"], equal: [1, "equal"] }, ngContentSelectors: _c1, decls: 5, vars: 4, consts: [[1, "controls-row"], [1, "controls-row__controls"], [1, "controls-row__actions"]], template: function ControlsRowComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275projectionDef(_c0);
      \u0275\u0275elementStart(0, "div", 0)(1, "div", 1);
      \u0275\u0275projection(2);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(3, "div", 2);
      \u0275\u0275projection(4, 1);
      \u0275\u0275elementEnd()();
    }
    if (rf & 2) {
      \u0275\u0275classProp("controls-row__equal", ctx.equal())("controls-row__mobile", ctx.mobileMode());
    }
  }, styles: ["/* angular:styles/component:scss;b62426b5c15b34f5b14600def1b6749e5882d7492ea4b57c012c4e78c9d41412;/Users/khripunovpavel/Documents/my/lasagna/lasagna/src/app/features/controls/form/controls-row.component.ts */\n:host {\n  display: flex;\n  gap: 16px;\n}\n.controls-row {\n  --gap: 16px;\n  width: 100%;\n  display: flex;\n  align-items: flex-end;\n  gap: var(--gap);\n  flex: 1;\n}\n.controls-row__controls,\n.controls-row__actions {\n  display: flex;\n  align-items: flex-end;\n  gap: 16px;\n}\n.controls-row__controls {\n  flex: 1;\n}\n.controls-row__actions {\n  flex: 0;\n  white-space: nowrap;\n}\n.controls-row__controls > *,\n.controls-row__actions > * {\n  flex: 1;\n}\n.controls-row__equal .controls-row__controls > *,\n.controls-row__equal .controls-row__actions > * {\n  flex: 1;\n}\n@media (max-width: 768px) {\n  .controls-row__mobile {\n    align-items: stretch;\n  }\n  .controls-row__mobile .controls-row__controls {\n    flex-direction: column;\n    align-items: stretch;\n  }\n  .controls-row__mobile .controls-row__actions {\n    align-self: flex-end;\n  }\n}\n/*# sourceMappingURL=controls-row.component.css.map */\n"], encapsulation: 2 });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(ControlsRowComponent, [{
    type: Component,
    args: [{ selector: "lg-controls-row", standalone: true, template: `
      <div class="controls-row"
            [class.controls-row__equal]="equal()"
            [class.controls-row__mobile]="mobileMode()">
          <div class="controls-row__controls">
              <ng-content></ng-content>
          </div>
          <div class="controls-row__actions">
              <ng-content select="rowActions"></ng-content>
          </div>
      </div>
  `, encapsulation: ViewEncapsulation.None, styles: ["/* angular:styles/component:scss;b62426b5c15b34f5b14600def1b6749e5882d7492ea4b57c012c4e78c9d41412;/Users/khripunovpavel/Documents/my/lasagna/lasagna/src/app/features/controls/form/controls-row.component.ts */\n:host {\n  display: flex;\n  gap: 16px;\n}\n.controls-row {\n  --gap: 16px;\n  width: 100%;\n  display: flex;\n  align-items: flex-end;\n  gap: var(--gap);\n  flex: 1;\n}\n.controls-row__controls,\n.controls-row__actions {\n  display: flex;\n  align-items: flex-end;\n  gap: 16px;\n}\n.controls-row__controls {\n  flex: 1;\n}\n.controls-row__actions {\n  flex: 0;\n  white-space: nowrap;\n}\n.controls-row__controls > *,\n.controls-row__actions > * {\n  flex: 1;\n}\n.controls-row__equal .controls-row__controls > *,\n.controls-row__equal .controls-row__actions > * {\n  flex: 1;\n}\n@media (max-width: 768px) {\n  .controls-row__mobile {\n    align-items: stretch;\n  }\n  .controls-row__mobile .controls-row__controls {\n    flex-direction: column;\n    align-items: stretch;\n  }\n  .controls-row__mobile .controls-row__actions {\n    align-self: flex-end;\n  }\n}\n/*# sourceMappingURL=controls-row.component.css.map */\n"] }]
  }], () => [], null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(ControlsRowComponent, { className: "ControlsRowComponent", filePath: "src/app/features/controls/form/controls-row.component.ts", lineNumber: 81 });
})();

export {
  ControlsRowComponent
};
//# sourceMappingURL=chunk-UHHJ4AUW.js.map
