import {
  Component,
  ViewEncapsulation,
  input,
  setClassMetadata,
  ɵsetClassDebugInfo,
  ɵɵadvance,
  ɵɵdefineComponent,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵprojection,
  ɵɵprojectionDef,
  ɵɵtext,
  ɵɵtextInterpolate1
} from "./chunk-6AETQSBA.js";

// src/app/shared/view/ui/form/control.component.ts
var _c0 = [[["beforeLabelTpl"]], [["labelTpl"]], [["afterLabelTpl"]], [["endLabelTpl"]], "*"];
var _c1 = ["beforeLabelTpl", "labelTpl", "afterLabelTpl", "endLabelTpl", "*"];
var ControlComponent = class _ControlComponent {
  constructor() {
  }
  label = input("");
  static \u0275fac = function ControlComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _ControlComponent)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _ControlComponent, selectors: [["lg-control"]], inputs: { label: [1, "label"] }, ngContentSelectors: _c1, decls: 11, vars: 1, consts: [[1, "control"], [1, "control__label"], [1, "control__label-string"], [1, "control__label-end"], [1, "control__content"]], template: function ControlComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275projectionDef(_c0);
      \u0275\u0275elementStart(0, "div", 0)(1, "label", 1);
      \u0275\u0275projection(2);
      \u0275\u0275elementStart(3, "span", 2);
      \u0275\u0275projection(4, 1);
      \u0275\u0275text(5);
      \u0275\u0275elementEnd();
      \u0275\u0275projection(6, 2);
      \u0275\u0275elementStart(7, "div", 3);
      \u0275\u0275projection(8, 3);
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(9, "div", 4);
      \u0275\u0275projection(10, 4);
      \u0275\u0275elementEnd()();
    }
    if (rf & 2) {
      \u0275\u0275advance(5);
      \u0275\u0275textInterpolate1(" ", ctx.label());
    }
  }, styles: ["/* angular:styles/component:scss;bcf294dfc0e8c4f5fa394712144c898e7d83a60505913baa254bdb98635c8cb2;/Users/khripunovpavel/Documents/my/lasagna/lasagna/src/app/shared/view/ui/form/control.component.ts */\n.control__label {\n  font-size: 0.9rem;\n  display: flex;\n  align-items: flex-end;\n  gap: 8px;\n}\n.control__label-end {\n  display: flex;\n  align-items: flex-end;\n  gap: 8px;\n  margin-left: auto;\n}\n.control__label-end:empty {\n  display: none;\n}\n.control__label-string:empty {\n  display: none;\n}\n.control__content {\n  display: flex;\n}\n/*# sourceMappingURL=control.component.css.map */\n"], encapsulation: 2 });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(ControlComponent, [{
    type: Component,
    args: [{ selector: "lg-control", standalone: true, template: `
      <div class="control">
          <label class="control__label">
              <ng-content select="beforeLabelTpl"></ng-content>

              <span class="control__label-string"><ng-content select="labelTpl"></ng-content>
                  {{ label() }}</span>
              <ng-content select="afterLabelTpl"></ng-content>

              <div class="control__label-end">
                  <ng-content select="endLabelTpl"></ng-content>
              </div>
          </label>

          <div class="control__content">
              <ng-content></ng-content>
          </div>
      </div>
  `, encapsulation: ViewEncapsulation.None, styles: ["/* angular:styles/component:scss;bcf294dfc0e8c4f5fa394712144c898e7d83a60505913baa254bdb98635c8cb2;/Users/khripunovpavel/Documents/my/lasagna/lasagna/src/app/shared/view/ui/form/control.component.ts */\n.control__label {\n  font-size: 0.9rem;\n  display: flex;\n  align-items: flex-end;\n  gap: 8px;\n}\n.control__label-end {\n  display: flex;\n  align-items: flex-end;\n  gap: 8px;\n  margin-left: auto;\n}\n.control__label-end:empty {\n  display: none;\n}\n.control__label-string:empty {\n  display: none;\n}\n.control__content {\n  display: flex;\n}\n/*# sourceMappingURL=control.component.css.map */\n"] }]
  }], () => [], null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(ControlComponent, { className: "ControlComponent", filePath: "src/app/shared/view/ui/form/control.component.ts", lineNumber: 59 });
})();

export {
  ControlComponent
};
//# sourceMappingURL=chunk-7D43YVDH.js.map
