import {
  StorageQuotaService
} from "./chunk-RBDPPOGX.js";
import "./chunk-CFXQGSQM.js";
import {
  TranslatePipe
} from "./chunk-755Q3QHA.js";
import {
  RouterLink
} from "./chunk-L34DFTMV.js";
import "./chunk-USF337CA.js";
import "./chunk-VVQKNBNV.js";
import "./chunk-X2X7GTPW.js";
import {
  Component,
  computed,
  inject,
  setClassMetadata,
  ɵsetClassDebugInfo,
  ɵɵadvance,
  ɵɵconditional,
  ɵɵconditionalCreate,
  ɵɵdefineComponent,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵnextContext,
  ɵɵpipe,
  ɵɵpipeBind2,
  ɵɵproperty,
  ɵɵpureFunction0,
  ɵɵpureFunction1,
  ɵɵtext,
  ɵɵtextInterpolate1
} from "./chunk-IYCVPBRB.js";
import "./chunk-46DXP6YY.js";

// src/app/features/home/view/storage-quota-warning.component.ts
var _c0 = () => ({ tab: "backup" });
var _c1 = () => ["/settings"];
var _c2 = (a0) => ({ percent: a0 });
function StorageQuotaWarningComponent_Conditional_0_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "a", 0);
    \u0275\u0275text(1);
    \u0275\u0275pipe(2, "translate");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275property("queryParams", \u0275\u0275pureFunction0(6, _c0))("routerLink", \u0275\u0275pureFunction0(7, _c1));
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind2(2, 3, "quota.near-limit", \u0275\u0275pureFunction1(8, _c2, ctx_r0.percentUsed())), " ");
  }
}
var StorageQuotaWarningComponent = class _StorageQuotaWarningComponent {
  quota = inject(StorageQuotaService).snapshot;
  percentUsed = computed(() => {
    const total = this.quota().total;
    if (!total.quotaBytes || !total.usageBytes)
      return 0;
    return Math.round(total.usageBytes / total.quotaBytes * 100);
  }, ...ngDevMode ? [{ debugName: "percentUsed" }] : []);
  shouldShow = computed(() => {
    const total = this.quota().total;
    if (!total.quotaBytes || !total.usageBytes)
      return false;
    const percent = total.usageBytes / total.quotaBytes * 100;
    return percent >= 85;
  }, ...ngDevMode ? [{ debugName: "shouldShow" }] : []);
  static \u0275fac = function StorageQuotaWarningComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _StorageQuotaWarningComponent)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _StorageQuotaWarningComponent, selectors: [["lg-storage-quota-warning"]], decls: 1, vars: 1, consts: [[3, "queryParams", "routerLink"]], template: function StorageQuotaWarningComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275conditionalCreate(0, StorageQuotaWarningComponent_Conditional_0_Template, 3, 10, "a", 0);
    }
    if (rf & 2) {
      \u0275\u0275conditional(ctx.shouldShow() ? 0 : -1);
    }
  }, dependencies: [RouterLink, TranslatePipe], styles: ["\n\n[_nghost-%COMP%] {\n  display: contents;\n}\na[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  border: 0;\n  padding: 10px 16px;\n  cursor: pointer;\n  border-radius: 0 16px 16px 0;\n  color: var(--text-color-inverse);\n  background:\n    linear-gradient(\n      45deg,\n      #ff6b6b,\n      #ffd93d);\n  background-size: calc(100% + 70px) 100%;\n  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.15);\n  transition: background-position 0.3s ease;\n  text-decoration: none;\n  white-space: nowrap;\n}\na[_ngcontent-%COMP%]:hover {\n  background-position: -70px 0;\n}\n.overlay-actions__item--danger[_ngcontent-%COMP%] {\n  background: var(--button-danger-bg);\n  color: var(--button-danger-text);\n}\n/*# sourceMappingURL=storage-quota-warning.component.css.map */"] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(StorageQuotaWarningComponent, [{
    type: Component,
    args: [{ selector: "lg-storage-quota-warning", standalone: true, imports: [RouterLink, TranslatePipe], template: `
    @if (shouldShow()) {
      <a [queryParams]="{tab:'backup'}"
         [routerLink]="['/settings']">
        {{ 'quota.near-limit' | translate:{percent: percentUsed()} }}
      </a>
    }
  `, styles: ["/* angular:styles/component:scss;6cb735ebd20f86c1d089947f4be4ca0e7abdb7b108e4ac113f168fe979f07758;/Users/khripunovpavel/Documents/my/lasagna/lasagna/src/app/features/home/view/storage-quota-warning.component.ts */\n:host {\n  display: contents;\n}\na {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  border: 0;\n  padding: 10px 16px;\n  cursor: pointer;\n  border-radius: 0 16px 16px 0;\n  color: var(--text-color-inverse);\n  background:\n    linear-gradient(\n      45deg,\n      #ff6b6b,\n      #ffd93d);\n  background-size: calc(100% + 70px) 100%;\n  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.15);\n  transition: background-position 0.3s ease;\n  text-decoration: none;\n  white-space: nowrap;\n}\na:hover {\n  background-position: -70px 0;\n}\n.overlay-actions__item--danger {\n  background: var(--button-danger-bg);\n  color: var(--button-danger-text);\n}\n/*# sourceMappingURL=storage-quota-warning.component.css.map */\n"] }]
  }], null, null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(StorageQuotaWarningComponent, { className: "StorageQuotaWarningComponent", filePath: "src/app/features/home/view/storage-quota-warning.component.ts", lineNumber: 50 });
})();
export {
  StorageQuotaWarningComponent
};
//# sourceMappingURL=chunk-OLRZ7UBL.js.map
