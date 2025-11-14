import {
  CardComponent
} from "./chunk-PJDK3IYM.js";
import {
  Component,
  ViewEncapsulation,
  input,
  setClassMetadata,
  ɵsetClassDebugInfo,
  ɵɵadvance,
  ɵɵclassMap,
  ɵɵdefineComponent,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵprojection,
  ɵɵprojectionDef,
  ɵɵproperty,
  ɵɵpureFunction1
} from "./chunk-Z5TNFCCP.js";

// src/app/shared/view/ui/card/table-card.component.ts
var _c0 = ["*"];
var _c1 = (a0) => ["table", a0];
var TableCardComponent = class _TableCardComponent {
  constructor() {
  }
  size = input("large", ...ngDevMode ? [{ debugName: "size" }] : []);
  static \u0275fac = function TableCardComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _TableCardComponent)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _TableCardComponent, selectors: [["lg-table-card"]], inputs: { size: [1, "size"] }, ngContentSelectors: _c0, decls: 4, vars: 5, consts: [[3, "flat"], [1, "table__scroll"]], template: function TableCardComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275projectionDef();
      \u0275\u0275elementStart(0, "lg-card", 0)(1, "div")(2, "div", 1);
      \u0275\u0275projection(3);
      \u0275\u0275elementEnd()()();
    }
    if (rf & 2) {
      \u0275\u0275property("flat", true);
      \u0275\u0275advance();
      \u0275\u0275classMap(\u0275\u0275pureFunction1(3, _c1, ctx.size()));
    }
  }, dependencies: [CardComponent], styles: ["/* angular:styles/component:scss;13d01f031c92b1727b3ce47628328ec9db58880219283b109a41d5dcf9b6230d;/Users/khripunovpavel/Documents/my/lasagna/lasagna/src/app/shared/view/ui/card/table-card.component.ts */\n:host {\n  display: flex;\n  width: 100%;\n}\n.table__scroll {\n  overflow-x: auto;\n}\ntable {\n  width: 100%;\n  border-collapse: collapse;\n  --border-color: #efefef;\n}\n.table.large td,\n.table.large thead th {\n  padding: 16px 24px;\n}\ntable thead tr {\n  border-bottom: 1px solid var(--border-color);\n}\ntable thead th {\n  text-align: left;\n  padding: 8px 12px;\n  opacity: 0.4;\n  font-size: 0.8em;\n}\ntable tbody tr {\n  border-bottom: 1px solid var(--border-color);\n}\ntable tbody tr:last-child {\n  border-bottom: none;\n}\ntd {\n  padding: 8px 12px;\n}\n/*# sourceMappingURL=table-card.component.css.map */\n"], encapsulation: 2 });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(TableCardComponent, [{
    type: Component,
    args: [{ selector: "lg-table-card", standalone: true, imports: [
      CardComponent
    ], template: `
    <lg-card [flat]="true">
      <div [class]="['table',size()]">
        <div class="table__scroll">
          <ng-content></ng-content>
        </div>
      </div>
    </lg-card>
  `, encapsulation: ViewEncapsulation.None, styles: ["/* angular:styles/component:scss;13d01f031c92b1727b3ce47628328ec9db58880219283b109a41d5dcf9b6230d;/Users/khripunovpavel/Documents/my/lasagna/lasagna/src/app/shared/view/ui/card/table-card.component.ts */\n:host {\n  display: flex;\n  width: 100%;\n}\n.table__scroll {\n  overflow-x: auto;\n}\ntable {\n  width: 100%;\n  border-collapse: collapse;\n  --border-color: #efefef;\n}\n.table.large td,\n.table.large thead th {\n  padding: 16px 24px;\n}\ntable thead tr {\n  border-bottom: 1px solid var(--border-color);\n}\ntable thead th {\n  text-align: left;\n  padding: 8px 12px;\n  opacity: 0.4;\n  font-size: 0.8em;\n}\ntable tbody tr {\n  border-bottom: 1px solid var(--border-color);\n}\ntable tbody tr:last-child {\n  border-bottom: none;\n}\ntd {\n  padding: 8px 12px;\n}\n/*# sourceMappingURL=table-card.component.css.map */\n"] }]
  }], () => [], null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(TableCardComponent, { className: "TableCardComponent", filePath: "src/app/shared/view/ui/card/table-card.component.ts", lineNumber: 68 });
})();

export {
  TableCardComponent
};
//# sourceMappingURL=chunk-Y47DSHMD.js.map
