import {
  NgClass
} from "./chunk-5MHPI2FA.js";
import {
  ChangeDetectionStrategy,
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
  ɵɵproperty,
  ɵɵstyleProp
} from "./chunk-6AETQSBA.js";

// src/app/shared/view/ui/layout/gap-column.component.ts
var _c0 = ["*"];
var GapColumnComponent = class _GapColumnComponent {
  constructor() {
  }
  fill = false;
  expandMobile = false;
  size = "default";
  position = "stretch";
  get alignItems() {
    const position = this.position;
    if (position === "start") {
      return "flex-start";
    } else if (position === "center") {
      return "center";
    } else if (position === "end") {
      return "flex-end";
    } else {
      return "stretch";
    }
  }
  static \u0275fac = function GapColumnComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _GapColumnComponent)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _GapColumnComponent, selectors: [["lg-gap-column"]], inputs: { fill: "fill", expandMobile: "expandMobile", size: "size", position: "position" }, ngContentSelectors: _c0, decls: 2, vars: 7, consts: [[1, "gap-column", 3, "ngClass"]], template: function GapColumnComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275projectionDef();
      \u0275\u0275elementStart(0, "div", 0);
      \u0275\u0275projection(1);
      \u0275\u0275elementEnd();
    }
    if (rf & 2) {
      \u0275\u0275styleProp("align-items", ctx.alignItems);
      \u0275\u0275classProp("expand-mobile", ctx.expandMobile)("fill", ctx.fill);
      \u0275\u0275property("ngClass", ctx.size);
    }
  }, dependencies: [NgClass], styles: ["\n\n[_nghost-%COMP%] {\n  flex: 1;\n}\n@media (max-width: 768px) {\n  [_nghost-%COMP%] {\n    width: 100%;\n  }\n}\n.gap-column[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 32px;\n}\n.gap-column.small[_ngcontent-%COMP%] {\n  gap: 8px;\n}\n.gap-column.medium[_ngcontent-%COMP%] {\n  gap: 16px;\n}\n.gap-column.tiny[_ngcontent-%COMP%] {\n  gap: 4px;\n}\n.gap-column.fill[_ngcontent-%COMP%] {\n  justify-content: space-between;\n  height: 100%;\n}\n@media (max-width: 600px) {\n  .gap-column[_ngcontent-%COMP%] {\n    display: flex;\n    flex-direction: column;\n    gap: 16px;\n  }\n  .gap-column.small[_ngcontent-%COMP%] {\n    gap: 4px;\n  }\n  .gap-column.medium[_ngcontent-%COMP%] {\n    gap: 8px;\n  }\n  .gap-column.tiny[_ngcontent-%COMP%] {\n    gap: 2px;\n  }\n}\n/*# sourceMappingURL=gap-column.component.css.map */"], changeDetection: 0 });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(GapColumnComponent, [{
    type: Component,
    args: [{ selector: "lg-gap-column", standalone: true, template: `
      <div [class.expand-mobile]="expandMobile"
           [class.fill]="fill"
           [ngClass]="size"
           [style.align-items]="alignItems"
           class="gap-column">
          <ng-content></ng-content>
      </div>
  `, imports: [
      NgClass
    ], changeDetection: ChangeDetectionStrategy.OnPush, styles: ["/* angular:styles/component:scss;b6904f803bb4e26d88ffee627fc8f6747b4618fd0597fc3867ce7fe8db861eb7;/Users/khripunovpavel/Documents/my/lasagna/lasagna/src/app/shared/view/ui/layout/gap-column.component.ts */\n:host {\n  flex: 1;\n}\n@media (max-width: 768px) {\n  :host {\n    width: 100%;\n  }\n}\n.gap-column {\n  display: flex;\n  flex-direction: column;\n  gap: 32px;\n}\n.gap-column.small {\n  gap: 8px;\n}\n.gap-column.medium {\n  gap: 16px;\n}\n.gap-column.tiny {\n  gap: 4px;\n}\n.gap-column.fill {\n  justify-content: space-between;\n  height: 100%;\n}\n@media (max-width: 600px) {\n  .gap-column {\n    display: flex;\n    flex-direction: column;\n    gap: 16px;\n  }\n  .gap-column.small {\n    gap: 4px;\n  }\n  .gap-column.medium {\n    gap: 8px;\n  }\n  .gap-column.tiny {\n    gap: 2px;\n  }\n}\n/*# sourceMappingURL=gap-column.component.css.map */\n"] }]
  }], () => [], { fill: [{
    type: Input
  }], expandMobile: [{
    type: Input
  }], size: [{
    type: Input
  }], position: [{
    type: Input
  }] });
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(GapColumnComponent, { className: "GapColumnComponent", filePath: "src/app/shared/view/ui/layout/gap-column.component.ts", lineNumber: 74 });
})();

export {
  GapColumnComponent
};
//# sourceMappingURL=chunk-5CDCXM6R.js.map
