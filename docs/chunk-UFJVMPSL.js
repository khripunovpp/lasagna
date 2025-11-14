import {
  NgClass,
  NgStyle
} from "./chunk-KBRICXTE.js";
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
} from "./chunk-Z5TNFCCP.js";

// src/app/shared/view/layout/flex-row.component.ts
var _c0 = ["*"];
var FlexRowComponent = class _FlexRowComponent {
  constructor() {
  }
  equal = false;
  center = input(false, ...ngDevMode ? [{ debugName: "center" }] : []);
  right = input(false, ...ngDevMode ? [{ debugName: "right" }] : []);
  left = input(false, ...ngDevMode ? [{ debugName: "left" }] : []);
  strictCenter = input(false, ...ngDevMode ? [{ debugName: "strictCenter" }] : []);
  bottom = input(false, ...ngDevMode ? [{ debugName: "bottom" }] : []);
  top = input(false, ...ngDevMode ? [{ debugName: "top" }] : []);
  fit = input(false, ...ngDevMode ? [{ debugName: "fit" }] : []);
  mobileMode = input(false, ...ngDevMode ? [{ debugName: "mobileMode" }] : []);
  mobileReverse = input(false, ...ngDevMode ? [{ debugName: "mobileReverse" }] : []);
  noResponsive = input(false, ...ngDevMode ? [{ debugName: "noResponsive" }] : []);
  relaxed = input(false, ...ngDevMode ? [{ debugName: "relaxed" }] : []);
  wrap = input(false, ...ngDevMode ? [{ debugName: "wrap" }] : []);
  cols = input(1, ...ngDevMode ? [{ debugName: "cols" }] : []);
  size = input("default", ...ngDevMode ? [{ debugName: "size" }] : []);
  styles = input({}, ...ngDevMode ? [{ debugName: "styles" }] : []);
  static \u0275fac = function FlexRowComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _FlexRowComponent)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _FlexRowComponent, selectors: [["lg-flex-row"]], inputs: { equal: "equal", center: [1, "center"], right: [1, "right"], left: [1, "left"], strictCenter: [1, "strictCenter"], bottom: [1, "bottom"], top: [1, "top"], fit: [1, "fit"], mobileMode: [1, "mobileMode"], mobileReverse: [1, "mobileReverse"], noResponsive: [1, "noResponsive"], relaxed: [1, "relaxed"], wrap: [1, "wrap"], cols: [1, "cols"], size: [1, "size"], styles: [1, "styles"] }, ngContentSelectors: _c0, decls: 2, vars: 30, consts: [[1, "gap-row", 3, "ngClass", "ngStyle"]], template: function FlexRowComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275projectionDef();
      \u0275\u0275elementStart(0, "div", 0);
      \u0275\u0275projection(1);
      \u0275\u0275elementEnd();
    }
    if (rf & 2) {
      \u0275\u0275styleMap("--cols: " + ctx.cols());
      \u0275\u0275classProp("gap-row__bottom", ctx.bottom())("gap-row__center", ctx.center())("gap-row__right", ctx.right())("gap-row__left", ctx.left())("gap-row__strict-center", ctx.strictCenter())("gap-row__fit", ctx.fit())("gap-row__mobile", ctx.mobileMode())("gap-row__responsive", !ctx.noResponsive())("gap-row__relaxed", ctx.relaxed())("gap-row__top", ctx.top())("gap-row__equal", ctx.equal)("gap-row__wrap", ctx.wrap())("gap-row__mobileReverse", ctx.mobileReverse());
      \u0275\u0275property("ngClass", ctx.size())("ngStyle", ctx.styles());
    }
  }, dependencies: [
    NgClass,
    NgStyle
  ], styles: ["/* angular:styles/component:scss;552cf404451ad1028324fbf33f367aac96371d59fc2e6c1de627ec38f0fd13fc;/Users/khripunovpavel/Documents/my/lasagna/lasagna/src/app/shared/view/layout/flex-row.component.ts */\n:host {\n  flex: 1;\n  --lg-gap-row-pad-left: 0;\n  --lg-gap-row-pad-right: 0;\n}\n.gap-row {\n  display: flex;\n  --gap: 32px;\n  gap: var(--gap);\n  padding-left: var(--lg-gap-row-pad-left);\n  padding-right: var(--lg-gap-row-pad-right);\n}\n.gap-row__center {\n  align-items: center;\n}\n.gap-row__strict-center {\n  align-items: center;\n  justify-content: center;\n}\n.gap-row__bottom {\n  align-items: flex-end;\n}\n.gap-row__top {\n  align-items: flex-start;\n}\n.gap-row__right {\n  justify-content: flex-end;\n}\n.gap-row__left {\n  justify-content: flex-start;\n}\n.gap-row.small {\n  --gap: 8px;\n}\n.gap-row.medium {\n  --gap: 16px;\n}\n.gap-row.tiny {\n  --gap: 4px;\n}\n.gap-row__fit > * {\n  flex: auto;\n}\n.gap-row__equal {\n  align-items: stretch;\n}\n.gap-row__equal > * {\n  flex: 1;\n}\n.gap-row__relaxed {\n  justify-content: space-between;\n}\n.gap-row__wrap {\n  flex-wrap: wrap;\n}\n.gap-row__wrap > * {\n  flex: 0 0 calc(100% / var(--cols) - var(--gap) / var(--cols));\n}\n.gap-row__wrap.gap-row__fit > * {\n  flex: 0;\n}\n@media (max-width: 768px) {\n  .gap-row__responsive.gap-row__mobile {\n    flex-direction: column;\n    --gap: 16px;\n  }\n  .gap-row__responsive.gap-row__mobile.small {\n    --gap: 4px;\n  }\n  .gap-row__responsive.gap-row__mobile.medium {\n    --gap: 8px;\n  }\n  .gap-row__responsive.gap-row__mobile.tiny {\n    --gap: 2px;\n  }\n  .gap-row__responsive.gap-row__mobileReverse {\n    flex-direction: column-reverse;\n  }\n}\n/*# sourceMappingURL=flex-row.component.css.map */\n"], encapsulation: 2 });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(FlexRowComponent, [{
    type: Component,
    args: [{ selector: "lg-flex-row", standalone: true, template: `
    <div [class.gap-row__bottom]="bottom()"
         [class.gap-row__center]="center()"
         [class.gap-row__right]="right()"
         [class.gap-row__left]="left()"
         [class.gap-row__strict-center]="strictCenter()"
         [class.gap-row__fit]="fit()"
         [class.gap-row__mobile]="mobileMode()"
         [class.gap-row__responsive]="!noResponsive()"
         [class.gap-row__relaxed]="relaxed()"
         [class.gap-row__top]="top()"
         [class.gap-row__equal]="equal"
         [class.gap-row__wrap]="wrap()"
         [class.gap-row__mobileReverse]="mobileReverse()"
         [ngClass]="size()"
         [style]="'--cols: ' + cols()"
         [ngStyle]="styles()"
         class="gap-row">
      <ng-content></ng-content>
    </div>
  `, imports: [
      NgClass,
      NgStyle
    ], encapsulation: ViewEncapsulation.None, styles: ["/* angular:styles/component:scss;552cf404451ad1028324fbf33f367aac96371d59fc2e6c1de627ec38f0fd13fc;/Users/khripunovpavel/Documents/my/lasagna/lasagna/src/app/shared/view/layout/flex-row.component.ts */\n:host {\n  flex: 1;\n  --lg-gap-row-pad-left: 0;\n  --lg-gap-row-pad-right: 0;\n}\n.gap-row {\n  display: flex;\n  --gap: 32px;\n  gap: var(--gap);\n  padding-left: var(--lg-gap-row-pad-left);\n  padding-right: var(--lg-gap-row-pad-right);\n}\n.gap-row__center {\n  align-items: center;\n}\n.gap-row__strict-center {\n  align-items: center;\n  justify-content: center;\n}\n.gap-row__bottom {\n  align-items: flex-end;\n}\n.gap-row__top {\n  align-items: flex-start;\n}\n.gap-row__right {\n  justify-content: flex-end;\n}\n.gap-row__left {\n  justify-content: flex-start;\n}\n.gap-row.small {\n  --gap: 8px;\n}\n.gap-row.medium {\n  --gap: 16px;\n}\n.gap-row.tiny {\n  --gap: 4px;\n}\n.gap-row__fit > * {\n  flex: auto;\n}\n.gap-row__equal {\n  align-items: stretch;\n}\n.gap-row__equal > * {\n  flex: 1;\n}\n.gap-row__relaxed {\n  justify-content: space-between;\n}\n.gap-row__wrap {\n  flex-wrap: wrap;\n}\n.gap-row__wrap > * {\n  flex: 0 0 calc(100% / var(--cols) - var(--gap) / var(--cols));\n}\n.gap-row__wrap.gap-row__fit > * {\n  flex: 0;\n}\n@media (max-width: 768px) {\n  .gap-row__responsive.gap-row__mobile {\n    flex-direction: column;\n    --gap: 16px;\n  }\n  .gap-row__responsive.gap-row__mobile.small {\n    --gap: 4px;\n  }\n  .gap-row__responsive.gap-row__mobile.medium {\n    --gap: 8px;\n  }\n  .gap-row__responsive.gap-row__mobile.tiny {\n    --gap: 2px;\n  }\n  .gap-row__responsive.gap-row__mobileReverse {\n    flex-direction: column-reverse;\n  }\n}\n/*# sourceMappingURL=flex-row.component.css.map */\n"] }]
  }], () => [], { equal: [{
    type: Input
  }] });
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(FlexRowComponent, { className: "FlexRowComponent", filePath: "src/app/shared/view/layout/flex-row.component.ts", lineNumber: 142 });
})();

export {
  FlexRowComponent
};
//# sourceMappingURL=chunk-UFJVMPSL.js.map
