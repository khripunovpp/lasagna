import {
  CardComponent
} from "./chunk-G3SIWE5M.js";
import "./chunk-X2X7GTPW.js";
import {
  Component,
  ViewEncapsulation,
  setClassMetadata,
  ɵsetClassDebugInfo,
  ɵɵdefineComponent,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵprojection,
  ɵɵprojectionDef,
  ɵɵproperty
} from "./chunk-IYCVPBRB.js";
import "./chunk-46DXP6YY.js";

// src/app/shared/view/ui/card/table-card.component.ts
var _c0 = ["*"];
var TableCardComponent = class _TableCardComponent {
  constructor() {
  }
  static \u0275fac = function TableCardComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _TableCardComponent)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _TableCardComponent, selectors: [["lg-table-card"]], ngContentSelectors: _c0, decls: 4, vars: 1, consts: [[3, "flat"], [1, "table"], [1, "table__scroll"]], template: function TableCardComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275projectionDef();
      \u0275\u0275elementStart(0, "lg-card", 0)(1, "div", 1)(2, "div", 2);
      \u0275\u0275projection(3);
      \u0275\u0275elementEnd()()();
    }
    if (rf & 2) {
      \u0275\u0275property("flat", true);
    }
  }, dependencies: [CardComponent], styles: ["/* angular:styles/component:scss;77cd3e5afef6cd05841b671623d97c58a3b677743ef93336d8ab4d82044ae461;/Users/khripunovpavel/Documents/my/lasagna/lasagna/src/app/shared/view/ui/card/table-card.component.ts */\n:host {\n  display: flex;\n  width: 100%;\n}\n.table__scroll {\n  overflow-x: auto;\n}\ntable {\n  width: 100%;\n  border-collapse: collapse;\n  --border-color: #efefef;\n}\ntable thead tr {\n  border-bottom: 1px solid var(--border-color);\n}\ntable thead th {\n  text-align: left;\n  padding: 16px 24px;\n  opacity: 0.4;\n  font-size: 0.8em;\n}\ntable tbody tr {\n  border-bottom: 1px solid var(--border-color);\n}\ntable tbody tr:last-child {\n  border-bottom: none;\n}\ntd {\n  padding: 16px 24px;\n}\n/*# sourceMappingURL=table-card.component.css.map */\n"], encapsulation: 2 });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(TableCardComponent, [{
    type: Component,
    args: [{ selector: "lg-table-card", standalone: true, imports: [
      CardComponent
    ], template: `
      <lg-card [flat]="true">
          <div class="table">
              <div class="table__scroll">
                  <ng-content></ng-content>
              </div>
          </div>
      </lg-card>
  `, encapsulation: ViewEncapsulation.None, styles: ["/* angular:styles/component:scss;77cd3e5afef6cd05841b671623d97c58a3b677743ef93336d8ab4d82044ae461;/Users/khripunovpavel/Documents/my/lasagna/lasagna/src/app/shared/view/ui/card/table-card.component.ts */\n:host {\n  display: flex;\n  width: 100%;\n}\n.table__scroll {\n  overflow-x: auto;\n}\ntable {\n  width: 100%;\n  border-collapse: collapse;\n  --border-color: #efefef;\n}\ntable thead tr {\n  border-bottom: 1px solid var(--border-color);\n}\ntable thead th {\n  text-align: left;\n  padding: 16px 24px;\n  opacity: 0.4;\n  font-size: 0.8em;\n}\ntable tbody tr {\n  border-bottom: 1px solid var(--border-color);\n}\ntable tbody tr:last-child {\n  border-bottom: none;\n}\ntd {\n  padding: 16px 24px;\n}\n/*# sourceMappingURL=table-card.component.css.map */\n"] }]
  }], () => [], null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(TableCardComponent, { className: "TableCardComponent", filePath: "src/app/shared/view/ui/card/table-card.component.ts", lineNumber: 62 });
})();
export {
  TableCardComponent
};
//# sourceMappingURL=chunk-RADQOUZX.js.map
