import {
  NgClass
} from "./chunk-KBRICXTE.js";
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
} from "./chunk-Z5TNFCCP.js";

// src/app/shared/view/layout/flex-column.component.ts
var _c0 = ["*"];
var FlexColumnComponent = class _FlexColumnComponent {
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
  static \u0275fac = function FlexColumnComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _FlexColumnComponent)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _FlexColumnComponent, selectors: [["lg-flex-column"]], inputs: { fill: "fill", expandMobile: "expandMobile", size: "size", position: "position" }, ngContentSelectors: _c0, decls: 2, vars: 7, consts: [[1, "gap-column", 3, "ngClass"]], template: function FlexColumnComponent_Template(rf, ctx) {
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
  }, dependencies: [NgClass], styles: ["\n\n[_nghost-%COMP%] {\n  flex: 1;\n}\n@media (max-width: 768px) {\n  [_nghost-%COMP%] {\n    width: 100%;\n  }\n}\n.gap-column[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 32px;\n}\n.gap-column.small[_ngcontent-%COMP%] {\n  gap: 8px;\n}\n.gap-column.medium[_ngcontent-%COMP%] {\n  gap: 16px;\n}\n.gap-column.tiny[_ngcontent-%COMP%] {\n  gap: 4px;\n}\n.gap-column.fill[_ngcontent-%COMP%] {\n  justify-content: space-between;\n  height: 100%;\n}\n@media (max-width: 768px) {\n  .gap-column[_ngcontent-%COMP%] {\n    display: flex;\n    flex-direction: column;\n    gap: 16px;\n  }\n  .gap-column.small[_ngcontent-%COMP%] {\n    gap: 4px;\n  }\n  .gap-column.medium[_ngcontent-%COMP%] {\n    gap: 8px;\n  }\n  .gap-column.tiny[_ngcontent-%COMP%] {\n    gap: 2px;\n  }\n}\n/*# sourceMappingURL=flex-column.component.css.map */"], changeDetection: 0 });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(FlexColumnComponent, [{
    type: Component,
    args: [{ selector: "lg-flex-column", standalone: true, template: `
    <div [class.expand-mobile]="expandMobile"
         [class.fill]="fill"
         [ngClass]="size"
         [style.align-items]="alignItems"
         class="gap-column">
      <ng-content></ng-content>
    </div>
  `, imports: [
      NgClass
    ], changeDetection: ChangeDetectionStrategy.OnPush, styles: ["/* angular:styles/component:scss;624c658dacbe3d3722e43fda799c237075128a304b52c375b77c25ef186a9ffa;/Users/khripunovpavel/Documents/my/lasagna/lasagna/src/app/shared/view/layout/flex-column.component.ts */\n:host {\n  flex: 1;\n}\n@media (max-width: 768px) {\n  :host {\n    width: 100%;\n  }\n}\n.gap-column {\n  display: flex;\n  flex-direction: column;\n  gap: 32px;\n}\n.gap-column.small {\n  gap: 8px;\n}\n.gap-column.medium {\n  gap: 16px;\n}\n.gap-column.tiny {\n  gap: 4px;\n}\n.gap-column.fill {\n  justify-content: space-between;\n  height: 100%;\n}\n@media (max-width: 768px) {\n  .gap-column {\n    display: flex;\n    flex-direction: column;\n    gap: 16px;\n  }\n  .gap-column.small {\n    gap: 4px;\n  }\n  .gap-column.medium {\n    gap: 8px;\n  }\n  .gap-column.tiny {\n    gap: 2px;\n  }\n}\n/*# sourceMappingURL=flex-column.component.css.map */\n"] }]
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
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(FlexColumnComponent, { className: "FlexColumnComponent", filePath: "src/app/shared/view/layout/flex-column.component.ts", lineNumber: 74 });
})();

export {
  FlexColumnComponent
};
//# sourceMappingURL=chunk-3KXU4X6J.js.map
