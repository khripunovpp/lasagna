import {
  animate,
  style,
  transition,
  trigger
} from "./chunk-57RA4QZQ.js";
import {
  Component,
  setClassMetadata,
  ɵsetClassDebugInfo,
  ɵɵdefineComponent,
  ɵɵdomElementEnd,
  ɵɵdomElementStart,
  ɵɵprojection,
  ɵɵprojectionDef,
  ɵɵproperty
} from "./chunk-IYCVPBRB.js";

// src/app/shared/view/ui/fade-in.component.ts
var _c0 = ["*"];
var FadeInComponent = class _FadeInComponent {
  constructor() {
  }
  fadeIn = false;
  ngOnInit() {
    setTimeout(() => {
      this.fadeIn = true;
    }, 0);
  }
  static \u0275fac = function FadeInComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _FadeInComponent)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _FadeInComponent, selectors: [["lg-fade-in"]], ngContentSelectors: _c0, decls: 2, vars: 1, consts: [[1, "fade-in"]], template: function FadeInComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275projectionDef();
      \u0275\u0275domElementStart(0, "div", 0);
      \u0275\u0275projection(1);
      \u0275\u0275domElementEnd();
    }
    if (rf & 2) {
      \u0275\u0275property("@fadeIn", void 0);
    }
  }, encapsulation: 2, data: { animation: [
    trigger("fadeIn", [
      transition(":enter", [
        style({ opacity: 0 }),
        animate("300ms ease-in-out", style({ opacity: 1 }))
      ]),
      transition(":leave", [
        style({ opacity: 1 }),
        animate("300ms ease-in-out", style({ opacity: 0 }))
      ])
    ])
  ] } });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(FadeInComponent, [{
    type: Component,
    args: [{ selector: "lg-fade-in", standalone: true, template: `
      <div @fadeIn class="fade-in">
          <ng-content></ng-content>
      </div>
  `, animations: [
      trigger("fadeIn", [
        transition(":enter", [
          style({ opacity: 0 }),
          animate("300ms ease-in-out", style({ opacity: 1 }))
        ]),
        transition(":leave", [
          style({ opacity: 1 }),
          animate("300ms ease-in-out", style({ opacity: 0 }))
        ])
      ])
    ], imports: [] }]
  }], () => [], null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(FadeInComponent, { className: "FadeInComponent", filePath: "src/app/shared/view/ui/fade-in.component.ts", lineNumber: 31 });
})();

export {
  FadeInComponent
};
//# sourceMappingURL=chunk-TPJKAC4G.js.map
