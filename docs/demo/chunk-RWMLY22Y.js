import {
  NgClass,
  NgStyle
} from "./chunk-5MHPI2FA.js";
import {
  Component,
  Input,
  ViewEncapsulation,
  input,
  setClassMetadata,
  ɵsetClassDebugInfo,
  ɵɵclassProp,
  ɵɵdefineComponent,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵprojection,
  ɵɵprojectionDef,
  ɵɵproperty,
  ɵɵstyleMap
} from "./chunk-6AETQSBA.js";

// src/app/shared/view/ui/layout/gap-row.component.ts
var _c0 = ["*"];
var GapRowComponent = class _GapRowComponent {
  constructor() {
  }
  equal = false;
  center = input(false);
  right = input(false);
  left = input(false);
  strictCenter = input(false);
  bottom = input(false);
  top = input(false);
  fit = input(false);
  mobileMode = input(false);
  relaxed = input(false);
  wrap = input(false);
  cols = input(1);
  size = input("default");
  styles = input({});
  static \u0275fac = function GapRowComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _GapRowComponent)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _GapRowComponent, selectors: [["lg-gap-row"]], inputs: { equal: "equal", center: [1, "center"], right: [1, "right"], left: [1, "left"], strictCenter: [1, "strictCenter"], bottom: [1, "bottom"], top: [1, "top"], fit: [1, "fit"], mobileMode: [1, "mobileMode"], relaxed: [1, "relaxed"], wrap: [1, "wrap"], cols: [1, "cols"], size: [1, "size"], styles: [1, "styles"] }, ngContentSelectors: _c0, decls: 2, vars: 26, consts: [[1, "gap-row", 3, "ngClass", "ngStyle"]], template: function GapRowComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275projectionDef();
      \u0275\u0275elementStart(0, "div", 0);
      \u0275\u0275projection(1);
      \u0275\u0275elementEnd();
    }
    if (rf & 2) {
      \u0275\u0275styleMap("--cols: " + ctx.cols());
      \u0275\u0275classProp("gap-row__bottom", ctx.bottom())("gap-row__center", ctx.center())("gap-row__right", ctx.right())("gap-row__left", ctx.left())("gap-row__strict-center", ctx.strictCenter())("gap-row__fit", ctx.fit())("gap-row__mobile", ctx.mobileMode())("gap-row__relaxed", ctx.relaxed())("gap-row__top", ctx.top())("gap-row__equal", ctx.equal)("gap-row__wrap", ctx.wrap());
      \u0275\u0275property("ngClass", ctx.size())("ngStyle", ctx.styles());
    }
  }, dependencies: [
    NgClass,
    NgStyle
  ], styles: ["/* angular:styles/component:scss;30252aa0266961ba696ec6bb1f721b4548dd6ab5af546a49190550bc26544eb8;/Users/khripunovpavel/Documents/my/lasagna/lasagna/src/app/shared/view/ui/layout/gap-row.component.ts */\n:host {\n  flex: 1;\n  --lg-gap-row-pad-left: 0;\n  --lg-gap-row-pad-right: 0;\n}\n.gap-row {\n  display: flex;\n  --gap: 32px;\n  gap: var(--gap);\n  padding-left: var(--lg-gap-row-pad-left);\n  padding-right: var(--lg-gap-row-pad-right);\n}\n.gap-row__center {\n  align-items: center;\n}\n.gap-row__strict-center {\n  align-items: center;\n  justify-content: center;\n}\n.gap-row__bottom {\n  align-items: flex-end;\n}\n.gap-row__top {\n  align-items: flex-start;\n}\n.gap-row__right {\n  justify-content: flex-end;\n}\n.gap-row__left {\n  justify-content: flex-start;\n}\n.gap-row.small {\n  --gap: 8px;\n}\n.gap-row.medium {\n  --gap: 16px;\n}\n.gap-row.tiny {\n  --gap: 4px;\n}\n.gap-row__fit > * {\n  flex: auto;\n}\n.gap-row__equal > * {\n  flex: 1;\n}\n.gap-row__relaxed {\n  justify-content: space-between;\n}\n.gap-row__wrap {\n  flex-wrap: wrap;\n}\n.gap-row__wrap > * {\n  flex: 0 0 calc(100% / var(--cols) - var(--gap) / var(--cols));\n}\n@media (max-width: 600px) {\n  .gap-row__mobile {\n    flex-direction: column;\n    align-items: flex-start;\n    --gap: 16px;\n  }\n  .gap-row__mobile.small {\n    --gap: 4px;\n  }\n  .gap-row__mobile.medium {\n    --gap: 8px;\n  }\n  .gap-row__mobile.tiny {\n    --gap: 2px;\n  }\n}\n/*# sourceMappingURL=gap-row.component.css.map */\n"], encapsulation: 2 });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(GapRowComponent, [{
    type: Component,
    args: [{ selector: "lg-gap-row", standalone: true, template: `
    <div [class.gap-row__bottom]="bottom()"
         [class.gap-row__center]="center()"
         [class.gap-row__right]="right()"
         [class.gap-row__left]="left()"
         [class.gap-row__strict-center]="strictCenter()"
         [class.gap-row__fit]="fit()"
         [class.gap-row__mobile]="mobileMode()"
         [class.gap-row__relaxed]="relaxed()"
         [class.gap-row__top]="top()"
         [class.gap-row__equal]="equal"
         [class.gap-row__wrap]="wrap()"
         [ngClass]="size()"
         [style]="'--cols: ' + cols()"
         [ngStyle]="styles()"
         class="gap-row">
      <ng-content></ng-content>
    </div>
  `, imports: [
      NgClass,
      NgStyle
    ], encapsulation: ViewEncapsulation.None, styles: ["/* angular:styles/component:scss;30252aa0266961ba696ec6bb1f721b4548dd6ab5af546a49190550bc26544eb8;/Users/khripunovpavel/Documents/my/lasagna/lasagna/src/app/shared/view/ui/layout/gap-row.component.ts */\n:host {\n  flex: 1;\n  --lg-gap-row-pad-left: 0;\n  --lg-gap-row-pad-right: 0;\n}\n.gap-row {\n  display: flex;\n  --gap: 32px;\n  gap: var(--gap);\n  padding-left: var(--lg-gap-row-pad-left);\n  padding-right: var(--lg-gap-row-pad-right);\n}\n.gap-row__center {\n  align-items: center;\n}\n.gap-row__strict-center {\n  align-items: center;\n  justify-content: center;\n}\n.gap-row__bottom {\n  align-items: flex-end;\n}\n.gap-row__top {\n  align-items: flex-start;\n}\n.gap-row__right {\n  justify-content: flex-end;\n}\n.gap-row__left {\n  justify-content: flex-start;\n}\n.gap-row.small {\n  --gap: 8px;\n}\n.gap-row.medium {\n  --gap: 16px;\n}\n.gap-row.tiny {\n  --gap: 4px;\n}\n.gap-row__fit > * {\n  flex: auto;\n}\n.gap-row__equal > * {\n  flex: 1;\n}\n.gap-row__relaxed {\n  justify-content: space-between;\n}\n.gap-row__wrap {\n  flex-wrap: wrap;\n}\n.gap-row__wrap > * {\n  flex: 0 0 calc(100% / var(--cols) - var(--gap) / var(--cols));\n}\n@media (max-width: 600px) {\n  .gap-row__mobile {\n    flex-direction: column;\n    align-items: flex-start;\n    --gap: 16px;\n  }\n  .gap-row__mobile.small {\n    --gap: 4px;\n  }\n  .gap-row__mobile.medium {\n    --gap: 8px;\n  }\n  .gap-row__mobile.tiny {\n    --gap: 2px;\n  }\n}\n/*# sourceMappingURL=gap-row.component.css.map */\n"] }]
  }], () => [], { equal: [{
    type: Input
  }] });
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(GapRowComponent, { className: "GapRowComponent", filePath: "src/app/shared/view/ui/layout/gap-row.component.ts", lineNumber: 128 });
})();

export {
  GapRowComponent
};
//# sourceMappingURL=chunk-RWMLY22Y.js.map
