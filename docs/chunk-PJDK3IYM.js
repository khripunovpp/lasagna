import {
  NgClass
} from "./chunk-KBRICXTE.js";
import {
  Component,
  Input,
  setClassMetadata,
  ɵsetClassDebugInfo,
  ɵɵclassProp,
  ɵɵdefineComponent,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵprojection,
  ɵɵprojectionDef,
  ɵɵproperty
} from "./chunk-Z5TNFCCP.js";

// src/app/shared/view/ui/card/card.component.ts
var _c0 = ["*"];
var CardComponent = class _CardComponent {
  constructor() {
  }
  flat = false;
  center = false;
  size = "default";
  static \u0275fac = function CardComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _CardComponent)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _CardComponent, selectors: [["lg-card"]], inputs: { flat: "flat", center: "center", size: "size" }, ngContentSelectors: _c0, decls: 2, vars: 5, consts: [[1, "card", 3, "ngClass"]], template: function CardComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275projectionDef();
      \u0275\u0275elementStart(0, "div", 0);
      \u0275\u0275projection(1);
      \u0275\u0275elementEnd();
    }
    if (rf & 2) {
      \u0275\u0275classProp("center", ctx.center)("flat", ctx.flat);
      \u0275\u0275property("ngClass", ctx.size);
    }
  }, dependencies: [NgClass], styles: ["\n\n[_nghost-%COMP%] {\n  display: flex;\n  width: 100%;\n}\n.card[_ngcontent-%COMP%] {\n  background-color: var(--card-bg);\n  padding: 24px;\n  border-radius: 32px;\n  width: 100%;\n  display: flex;\n  flex-direction: column;\n  overflow: hidden;\n}\n.card.flat[_ngcontent-%COMP%] {\n  padding: 0;\n}\n.card.center[_ngcontent-%COMP%] {\n  justify-content: center;\n  align-items: center;\n}\n.card.small[_ngcontent-%COMP%] {\n  padding: 16px;\n  border-radius: 16px;\n}\n/*# sourceMappingURL=card.component.css.map */"] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(CardComponent, [{
    type: Component,
    args: [{ selector: "lg-card", standalone: true, template: `
      <div [class.center]="center"
           [class.flat]="flat"
           [ngClass]="size"
           class="card">
          <ng-content></ng-content>
      </div>
  `, imports: [
      NgClass
    ], styles: ["/* angular:styles/component:scss;abbd87395ca0f602bfd8f53cda1d32ecd3cbafd40a6b2de4b3e02bfaec1c4878;/Users/khripunovpavel/Documents/my/lasagna/lasagna/src/app/shared/view/ui/card/card.component.ts */\n:host {\n  display: flex;\n  width: 100%;\n}\n.card {\n  background-color: var(--card-bg);\n  padding: 24px;\n  border-radius: 32px;\n  width: 100%;\n  display: flex;\n  flex-direction: column;\n  overflow: hidden;\n}\n.card.flat {\n  padding: 0;\n}\n.card.center {\n  justify-content: center;\n  align-items: center;\n}\n.card.small {\n  padding: 16px;\n  border-radius: 16px;\n}\n/*# sourceMappingURL=card.component.css.map */\n"] }]
  }], () => [], { flat: [{
    type: Input
  }], center: [{
    type: Input
  }], size: [{
    type: Input
  }] });
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(CardComponent, { className: "CardComponent", filePath: "src/app/shared/view/ui/card/card.component.ts", lineNumber: 51 });
})();

export {
  CardComponent
};
//# sourceMappingURL=chunk-PJDK3IYM.js.map
