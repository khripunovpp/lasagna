import {
  CurrencySymbolPipe
} from "./chunk-YXHOLK5I.js";
import {
  UserCurrencyPipe
} from "./chunk-Z3GFX2P6.js";
import {
  WidthDirective
} from "./chunk-X7MIVF3B.js";
import {
  BaseChartDirective
} from "./chunk-3UZLXGJI.js";
import "./chunk-OY2YJNFS.js";
import {
  SETTINGS
} from "./chunk-X3TKJTU2.js";
import {
  UnitSwitcherComponent
} from "./chunk-L4SAC6OU.js";
import {
  NumberInputComponent,
  ParseMathDirective
} from "./chunk-WBQUPP7L.js";
import {
  ControlExtraTemplateDirective,
  InputComponent
} from "./chunk-MGKNDLQM.js";
import "./chunk-EROQRXO4.js";
import "./chunk-7YWLATDR.js";
import {
  ExpandDirective
} from "./chunk-MJ7CZNNR.js";
import {
  CardComponent
} from "./chunk-YLXBTOXB.js";
import {
  GapColumnComponent
} from "./chunk-5CDCXM6R.js";
import {
  ContainerComponent
} from "./chunk-U5POLJOC.js";
import {
  GapRowComponent
} from "./chunk-RWMLY22Y.js";
import {
  TranslatePipe
} from "./chunk-PZVFCWPY.js";
import {
  FadeInComponent
} from "./chunk-JNX3I5QY.js";
import "./chunk-HNJAQDA3.js";
import {
  TitleComponent
} from "./chunk-F2TP5Q2W.js";
import {
  CalculateRecipeService,
  FormTemplateService,
  SelectResourcesService
} from "./chunk-LVU2JMH2.js";
import "./chunk-XLVGBYUT.js";
import {
  ButtonComponent,
  FormControl,
  FormControlName,
  FormGroup,
  FormGroupDirective,
  FormsModule,
  NgControlStatus,
  NgControlStatusGroup,
  NgModel,
  NotificationsService,
  ReactiveFormsModule,
  errorHandler,
  injectParams,
  require_lodash,
  takeUntilDestroyed,
  toSignal
} from "./chunk-EH6A44OR.js";
import {
  ActivatedRoute,
  Router,
  RouterLink
} from "./chunk-UGLIF2MQ.js";
import {
  randomRGB
} from "./chunk-Q4M4NLQD.js";
import "./chunk-5WJUMO7X.js";
import {
  CurrencyPipe,
  DecimalPipe,
  NgClass,
  NgTemplateOutlet
} from "./chunk-5MHPI2FA.js";
import {
  Component,
  Injector,
  ViewChild,
  ViewEncapsulation,
  computed,
  debounceTime,
  inject,
  model,
  setClassMetadata,
  signal,
  ɵsetClassDebugInfo,
  ɵɵProvidersFeature,
  ɵɵadvance,
  ɵɵconditional,
  ɵɵconditionalCreate,
  ɵɵdefineComponent,
  ɵɵdirectiveInject,
  ɵɵelement,
  ɵɵelementContainer,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵgetCurrentView,
  ɵɵlistener,
  ɵɵloadQuery,
  ɵɵnextContext,
  ɵɵpipe,
  ɵɵpipeBind1,
  ɵɵpipeBind2,
  ɵɵprojection,
  ɵɵprojectionDef,
  ɵɵproperty,
  ɵɵpureFunction2,
  ɵɵqueryRefresh,
  ɵɵreference,
  ɵɵrepeater,
  ɵɵrepeaterCreate,
  ɵɵrepeaterTrackByIndex,
  ɵɵresetView,
  ɵɵrestoreView,
  ɵɵstyleMap,
  ɵɵtemplate,
  ɵɵtemplateRefExtractor,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1,
  ɵɵtextInterpolate2,
  ɵɵtwoWayBindingSet,
  ɵɵtwoWayListener,
  ɵɵtwoWayProperty,
  ɵɵviewQuery
} from "./chunk-6AETQSBA.js";
import "./chunk-PZQLIUCM.js";
import {
  __toESM
} from "./chunk-46DXP6YY.js";

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

// src/app/features/recipes/view/calculate/calculate-recipe.component.ts
var import_lodash = __toESM(require_lodash());
var _c02 = ["priceChart"];
var _c1 = ["weightChart"];
var _c2 = (a0, a1) => [a0, a1];
function CalculateRecipeComponent_Conditional_10_Conditional_19_ng_container_0_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementContainer(0);
  }
}
function CalculateRecipeComponent_Conditional_10_Conditional_19_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275template(0, CalculateRecipeComponent_Conditional_10_Conditional_19_ng_container_0_Template, 1, 0, "ng-container", 20);
  }
  if (rf & 2) {
    \u0275\u0275nextContext(2);
    const totalAmount_r2 = \u0275\u0275reference(12);
    \u0275\u0275property("ngTemplateOutlet", totalAmount_r2);
  }
}
function CalculateRecipeComponent_Conditional_10_Conditional_20_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275text(0);
    \u0275\u0275pipe(1, "userCurrency");
  }
  if (rf & 2) {
    let tmp_5_0;
    const ctx_r2 = \u0275\u0275nextContext(2);
    \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind2(1, 1, (tmp_5_0 = ctx_r2.result()) == null ? null : tmp_5_0.calculation == null ? null : tmp_5_0.calculation.pricePerUnit, "1.2-5"), " ");
  }
}
function CalculateRecipeComponent_Conditional_10_ng_template_23_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "lg-unit-switcher", 21);
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext(2);
    \u0275\u0275property("items", ctx_r2.additionalPriceAction);
  }
}
function CalculateRecipeComponent_Conditional_10_Conditional_24_ng_template_0_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "lg-unit-switcher", 22);
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext(3);
    \u0275\u0275property("items", ctx_r2.additionalPriceUnit);
  }
}
function CalculateRecipeComponent_Conditional_10_Conditional_24_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275template(0, CalculateRecipeComponent_Conditional_10_Conditional_24_ng_template_0_Template, 1, 1, "ng-template", 13);
  }
}
function CalculateRecipeComponent_Conditional_10_Conditional_25_ng_template_0_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "b");
    \u0275\u0275text(1);
    \u0275\u0275pipe(2, "currencySymbol");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    let tmp_6_0;
    const ctx_r2 = \u0275\u0275nextContext(3);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate2("", \u0275\u0275pipeBind1(2, 2, ctx_r2.userSettings()["currency"]), " / ", (tmp_6_0 = ctx_r2.result()) == null ? null : tmp_6_0.calculation == null ? null : tmp_6_0.calculation.outcomeUnit, " ");
  }
}
function CalculateRecipeComponent_Conditional_10_Conditional_25_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275template(0, CalculateRecipeComponent_Conditional_10_Conditional_25_ng_template_0_Template, 3, 4, "ng-template", 13);
  }
}
function CalculateRecipeComponent_Conditional_10_Conditional_35_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275text(0, " > ");
    \u0275\u0275elementStart(1, "span", 23);
    \u0275\u0275text(2);
    \u0275\u0275pipe(3, "userCurrency");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "span", 24);
    \u0275\u0275text(5);
    \u0275\u0275pipe(6, "userCurrency");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext(2);
    const diff_r4 = ctx_r2.totalPriceDifference();
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind2(3, 4, ctx_r2.totalPriceWithAdditions(), "1.2-2"), " ");
    \u0275\u0275advance(2);
    \u0275\u0275property("ngClass", diff_r4 > 0 ? "text-success" : "text-danger");
    \u0275\u0275advance();
    \u0275\u0275textInterpolate2(" (", diff_r4 > 0 ? "+" : "", " ", \u0275\u0275pipeBind2(6, 7, diff_r4, "1.2-2"), ") ");
  }
}
function CalculateRecipeComponent_Conditional_10_ng_template_38_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275text(0, " Recalculate for ");
  }
}
function CalculateRecipeComponent_Conditional_10_Conditional_39_ng_template_0_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "b");
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    let tmp_6_0;
    const ctx_r2 = \u0275\u0275nextContext(3);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", (tmp_6_0 = ctx_r2.result()) == null ? null : tmp_6_0.calculation == null ? null : tmp_6_0.calculation.outcomeUnit, " ");
  }
}
function CalculateRecipeComponent_Conditional_10_Conditional_39_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275template(0, CalculateRecipeComponent_Conditional_10_Conditional_39_ng_template_0_Template, 2, 1, "ng-template", 13);
  }
}
function CalculateRecipeComponent_Conditional_10_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "lg-gap-row", 5)(1, "lg-gap-column", 6)(2, "lg-card", 7)(3, "lg-gap-row", 8)(4, "div");
    \u0275\u0275text(5);
    \u0275\u0275pipe(6, "translate");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "b");
    \u0275\u0275text(8);
    \u0275\u0275pipe(9, "number");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(10, "lg-gap-column", 9)(11, "lg-card", 7)(12, "lg-gap-row", 8)(13, "div");
    \u0275\u0275text(14);
    \u0275\u0275pipe(15, "translate");
    \u0275\u0275elementStart(16, "b");
    \u0275\u0275text(17);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(18, "b");
    \u0275\u0275conditionalCreate(19, CalculateRecipeComponent_Conditional_10_Conditional_19_Template, 1, 1, "ng-container")(20, CalculateRecipeComponent_Conditional_10_Conditional_20_Template, 2, 4);
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(21, "lg-gap-row", 10)(22, "lg-number-input", 11);
    \u0275\u0275template(23, CalculateRecipeComponent_Conditional_10_ng_template_23_Template, 1, 1, "ng-template", 12);
    \u0275\u0275conditionalCreate(24, CalculateRecipeComponent_Conditional_10_Conditional_24_Template, 1, 0, null, 13);
    \u0275\u0275conditionalCreate(25, CalculateRecipeComponent_Conditional_10_Conditional_25_Template, 1, 0, null, 13);
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(26, "lg-gap-column", 9)(27, "lg-card", 7)(28, "lg-gap-row", 8)(29, "div");
    \u0275\u0275text(30);
    \u0275\u0275pipe(31, "translate");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(32, "b");
    \u0275\u0275text(33);
    \u0275\u0275pipe(34, "userCurrency");
    \u0275\u0275conditionalCreate(35, CalculateRecipeComponent_Conditional_10_Conditional_35_Template, 7, 10);
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(36, "lg-gap-row", 14)(37, "lg-number-input", 15);
    \u0275\u0275twoWayListener("ngModelChange", function CalculateRecipeComponent_Conditional_10_Template_lg_number_input_ngModelChange_37_listener($event) {
      \u0275\u0275restoreView(_r1);
      const ctx_r2 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r2.recalculateTotalsModel, $event) || (ctx_r2.recalculateTotalsModel = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275template(38, CalculateRecipeComponent_Conditional_10_ng_template_38_Template, 1, 0, "ng-template", 12);
    \u0275\u0275conditionalCreate(39, CalculateRecipeComponent_Conditional_10_Conditional_39_Template, 1, 0, null, 13);
    \u0275\u0275elementEnd()()()();
    \u0275\u0275elementStart(40, "lg-card", 16)(41, "lg-gap-column", 17)(42, "lg-title", 18)(43, "div");
    \u0275\u0275text(44);
    \u0275\u0275pipe(45, "translate");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(46, "canvas", 19, 1);
    \u0275\u0275listener("chartHover", function CalculateRecipeComponent_Conditional_10_Template_canvas_chartHover_46_listener($event) {
      \u0275\u0275restoreView(_r1);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.onChartHover("price", $event.event, $event.active));
    });
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(48, "lg-card", 16)(49, "lg-gap-column", 17)(50, "lg-title", 18)(51, "div");
    \u0275\u0275text(52);
    \u0275\u0275pipe(53, "translate");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(54, "canvas", 19, 2);
    \u0275\u0275listener("chartHover", function CalculateRecipeComponent_Conditional_10_Template_canvas_chartHover_54_listener($event) {
      \u0275\u0275restoreView(_r1);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.onChartHover("weight", $event.event, $event.active));
    });
    \u0275\u0275elementEnd()()()();
  }
  if (rf & 2) {
    let tmp_10_0;
    let tmp_15_0;
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275property("center", true)("mobileMode", true);
    \u0275\u0275advance();
    \u0275\u0275property("position", "stretch");
    \u0275\u0275advance(2);
    \u0275\u0275property("size", "small")("relaxed", true);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(6, 41, "recipe.calculation.outcome.label"));
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate2(" ", \u0275\u0275pipeBind2(9, 43, (tmp_10_0 = ctx_r2.result()) == null ? null : tmp_10_0.calculation == null ? null : tmp_10_0.calculation.outcomeAmount, "1.0-2"), " ", (tmp_10_0 = ctx_r2.result()) == null ? null : tmp_10_0.calculation == null ? null : tmp_10_0.calculation.outcomeUnit, " ");
    \u0275\u0275advance(2);
    \u0275\u0275property("position", "stretch");
    \u0275\u0275advance(2);
    \u0275\u0275property("size", "small")("relaxed", true);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind1(15, 46, "recipe.calculation.one-unit.label"), " ");
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1(" ", (tmp_15_0 = ctx_r2.result()) == null ? null : tmp_15_0.calculation == null ? null : tmp_15_0.calculation.outcomeUnit, " ");
    \u0275\u0275advance(2);
    \u0275\u0275conditional(ctx_r2.notInGrams() ? 19 : 20);
    \u0275\u0275advance(2);
    \u0275\u0275property("formGroup", ctx_r2.recipePriceAdditionsForm)("size", "small")("relaxed", true);
    \u0275\u0275advance(3);
    \u0275\u0275conditional(ctx_r2.showPriceAdditionUnits() ? 24 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r2.roundActionSelected() ? 25 : -1);
    \u0275\u0275advance();
    \u0275\u0275property("position", "stretch");
    \u0275\u0275advance(2);
    \u0275\u0275property("size", "small")("relaxed", true);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(31, 48, "recipe.calculation.total-price.label"));
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind2(34, 50, ctx_r2.totalPrice(), "1.2-2"), " ");
    \u0275\u0275advance(2);
    \u0275\u0275conditional(ctx_r2.totalPriceDifference() ? 35 : -1);
    \u0275\u0275advance();
    \u0275\u0275property("size", "small")("relaxed", true);
    \u0275\u0275advance();
    \u0275\u0275twoWayProperty("ngModel", ctx_r2.recalculateTotalsModel);
    \u0275\u0275advance(2);
    \u0275\u0275conditional(ctx_r2.roundActionSelected() ? 39 : -1);
    \u0275\u0275advance(2);
    \u0275\u0275property("size", "small");
    \u0275\u0275advance();
    \u0275\u0275property("level", 5);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(45, 53, "recipe.calculation.price-chart"));
    \u0275\u0275advance(2);
    \u0275\u0275property("data", ctx_r2.doughnutChartData().prices)("options", ctx_r2.doughnutChartOptions)("type", ctx_r2.doughnutChartType);
    \u0275\u0275advance(3);
    \u0275\u0275property("size", "small");
    \u0275\u0275advance();
    \u0275\u0275property("level", 5);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(53, 55, "recipe.calculation.weight-chart"));
    \u0275\u0275advance(2);
    \u0275\u0275property("data", ctx_r2.doughnutChartData().weight)("options", ctx_r2.doughnutChartOptions)("type", ctx_r2.doughnutChartType);
  }
}
function CalculateRecipeComponent_ng_template_11_Conditional_0_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275text(0, " > ");
    \u0275\u0275elementStart(1, "span", 23);
    \u0275\u0275text(2);
    \u0275\u0275pipe(3, "userCurrency");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "span", 24);
    \u0275\u0275text(5);
    \u0275\u0275pipe(6, "userCurrency");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    let tmp_4_0;
    let tmp_5_0;
    const ctx_r2 = \u0275\u0275nextContext(3);
    const diff_r5 = ((tmp_4_0 = ctx_r2.result()) == null ? null : tmp_4_0.calculation == null ? null : tmp_4_0.calculation.pricePerUnitDifference) ?? 0;
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind2(3, 4, (tmp_5_0 = ctx_r2.result()) == null ? null : tmp_5_0.calculation == null ? null : tmp_5_0.calculation.pricePerUnitModified, "1.2-2"), " ");
    \u0275\u0275advance(2);
    \u0275\u0275property("ngClass", diff_r5 > 0 ? "text-success" : "text-danger");
    \u0275\u0275advance();
    \u0275\u0275textInterpolate2(" (", diff_r5 > 0 ? "+" : "", " ", \u0275\u0275pipeBind2(6, 7, diff_r5, "1.2-2"), ") ");
  }
}
function CalculateRecipeComponent_ng_template_11_Conditional_0_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275text(0);
    \u0275\u0275pipe(1, "userCurrency");
    \u0275\u0275conditionalCreate(2, CalculateRecipeComponent_ng_template_11_Conditional_0_Conditional_2_Template, 7, 10);
    \u0275\u0275text(3);
    \u0275\u0275pipe(4, "number");
  }
  if (rf & 2) {
    let tmp_3_0;
    let tmp_4_0;
    let tmp_5_0;
    const ctx_r2 = \u0275\u0275nextContext(2);
    \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind2(1, 3, (tmp_3_0 = ctx_r2.result()) == null ? null : tmp_3_0.calculation == null ? null : tmp_3_0.calculation.pricePerOutcomeUnit, "1.2-2"), " ");
    \u0275\u0275advance(2);
    \u0275\u0275conditional(((tmp_4_0 = ctx_r2.result()) == null ? null : tmp_4_0.calculation == null ? null : tmp_4_0.calculation.totalPriceDifference) ? 2 : -1);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" / ", \u0275\u0275pipeBind2(4, 6, (tmp_5_0 = ctx_r2.result()) == null ? null : tmp_5_0.calculation == null ? null : tmp_5_0.calculation.weightForUnit, "1.0-2"), " gram ");
  }
}
function CalculateRecipeComponent_ng_template_11_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275text(0);
    \u0275\u0275pipe(1, "userCurrency");
  }
  if (rf & 2) {
    let tmp_3_0;
    const ctx_r2 = \u0275\u0275nextContext(2);
    \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind2(1, 1, (tmp_3_0 = ctx_r2.result()) == null ? null : tmp_3_0.calculation == null ? null : tmp_3_0.calculation.totalPrice, "1.2-2"), " ");
  }
}
function CalculateRecipeComponent_ng_template_11_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275conditionalCreate(0, CalculateRecipeComponent_ng_template_11_Conditional_0_Template, 5, 9)(1, CalculateRecipeComponent_ng_template_11_Conditional_1_Template, 2, 4);
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275conditional(ctx_r2.notInGrams() ? 0 : 1);
  }
}
function CalculateRecipeComponent_Conditional_14_For_29_Conditional_5_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "a", 30);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const row_r6 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275property("routerLink", \u0275\u0275pureFunction2(2, _c2, row_r6.type === "recipe-row" ? "/recipes/edit/" : "/products/edit/", row_r6.uuid));
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", row_r6.name, " ");
  }
}
function CalculateRecipeComponent_Conditional_14_For_29_Conditional_6_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275text(0);
    \u0275\u0275pipe(1, "translate");
  }
  if (rf & 2) {
    const row_r6 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind1(1, 1, row_r6.name), " ");
  }
}
function CalculateRecipeComponent_Conditional_14_For_29_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "tr", 24)(1, "td");
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "td")(4, "div", 24);
    \u0275\u0275conditionalCreate(5, CalculateRecipeComponent_Conditional_14_For_29_Conditional_5_Template, 2, 5, "a", 30)(6, CalculateRecipeComponent_Conditional_14_For_29_Conditional_6_Template, 2, 3);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(7, "td");
    \u0275\u0275text(8);
    \u0275\u0275pipe(9, "number");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(10, "td");
    \u0275\u0275text(11);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(12, "td");
    \u0275\u0275text(13);
    \u0275\u0275pipe(14, "userCurrency");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(15, "td");
    \u0275\u0275text(16);
    \u0275\u0275pipe(17, "userCurrency");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const row_r6 = ctx.$implicit;
    const \u0275$index_208_r7 = ctx.$index;
    \u0275\u0275property("ngClass", row_r6.type);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(\u0275$index_208_r7 + 1);
    \u0275\u0275advance(2);
    \u0275\u0275property("ngClass", "indent-" + row_r6.indent);
    \u0275\u0275advance();
    \u0275\u0275conditional(row_r6.type !== "total" ? 5 : 6);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind2(9, 8, row_r6.amount, "1.0-2"));
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(row_r6.unit);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind2(14, 11, row_r6.price_per_gram, "1.2-5"));
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind2(17, 14, row_r6.total, "1.0-2"));
  }
}
function CalculateRecipeComponent_Conditional_14_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "table")(1, "colgroup");
    \u0275\u0275element(2, "col", 25)(3, "col", 26)(4, "col", 27)(5, "col", 28)(6, "col", 27)(7, "col", 29);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "thead")(9, "tr")(10, "th");
    \u0275\u0275text(11, "#");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(12, "th");
    \u0275\u0275text(13);
    \u0275\u0275pipe(14, "translate");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(15, "th");
    \u0275\u0275text(16);
    \u0275\u0275pipe(17, "translate");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(18, "th");
    \u0275\u0275text(19);
    \u0275\u0275pipe(20, "translate");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(21, "th");
    \u0275\u0275text(22);
    \u0275\u0275pipe(23, "translate");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(24, "th");
    \u0275\u0275text(25);
    \u0275\u0275pipe(26, "translate");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(27, "tbody");
    \u0275\u0275repeaterCreate(28, CalculateRecipeComponent_Conditional_14_For_29_Template, 18, 17, "tr", 24, \u0275\u0275repeaterTrackByIndex);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    let tmp_7_0;
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance(13);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(14, 5, "recipe.calculation.table.name.title"));
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(17, 7, "recipe.calculation.table.amount.title"));
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(20, 9, "recipe.calculation.table.unit.title"));
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(23, 11, "recipe.calculation.table.price.title"));
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(26, 13, "recipe.calculation.table.total.title"));
    \u0275\u0275advance(3);
    \u0275\u0275repeater((tmp_7_0 = ctx_r2.result()) == null ? null : tmp_7_0.table);
  }
}
function CalculateRecipeComponent_Conditional_15_Template(rf, ctx) {
}
var CalculateRecipeComponent = class _CalculateRecipeComponent {
  _aRoute;
  _calculateRecipeService;
  _formTemplateService;
  _injector;
  _router;
  _notificationService;
  constructor(_aRoute, _calculateRecipeService, _formTemplateService, _injector, _router, _notificationService) {
    this._aRoute = _aRoute;
    this._calculateRecipeService = _calculateRecipeService;
    this._formTemplateService = _formTemplateService;
    this._injector = _injector;
    this._router = _router;
    this._notificationService = _notificationService;
    this._aRoute.data.pipe(takeUntilDestroyed()).subscribe((data) => {
      this.result.set(data["result"]);
      this.recipePriceAdditionsForm.patchValue({
        action: this.result()?.calculation?.perUnitPriceModifier?.action || "add",
        value: this.result()?.calculation?.perUnitPriceModifier?.value || 0,
        unit: this.result()?.calculation?.perUnitPriceModifier?.unit || "currency"
      });
    });
  }
  userSettings = inject(SETTINGS);
  additionalPriceUnit = [
    {
      label: "$",
      value: "currency",
      style: "secondary"
    },
    {
      label: "%",
      value: "percent",
      style: "secondary"
    }
  ];
  additionalPriceAction = [
    {
      label: "Add",
      value: "add",
      style: "secondary"
    },
    {
      label: "Round to",
      value: "round",
      style: "secondary"
    }
  ];
  doughnutChartType = "pie";
  uuid = injectParams("uuid");
  result = signal(null);
  doughnutChartData = computed(() => {
    const result = this.result();
    const { prices, weight, labels, colors } = result?.calculation?.ingredients?.reduce((acc, item) => {
      acc.prices.push(item.totalPrice);
      acc.weight.push(item.totalWeightGram);
      acc.labels.push(item.generalName);
      acc.colors.push(item.product_id?.ownColor ?? item.recipe_id?.ownColor ?? randomRGB());
      return acc;
    }, {
      prices: [],
      weight: [],
      labels: [],
      colors: []
    }) || {
      prices: [],
      weight: [],
      labels: [],
      colors: []
    };
    return {
      prices: {
        labels,
        datasets: [
          {
            label: "Cost",
            data: prices,
            backgroundColor: colors,
            // hoverBackgroundColor: colors,
            borderWidth: 0
          }
        ]
      },
      weight: {
        labels,
        datasets: [
          {
            label: "Amount",
            data: weight,
            backgroundColor: colors,
            // hoverBackgroundColor: colors,
            borderWidth: 0
          }
        ]
      },
      ingredients: result?.calculation?.ingredients || []
    };
  });
  doughnutChartOptions = {
    plugins: {
      legend: {
        display: false
      }
    },
    onClick: (event, elements, chart) => {
    }
  };
  chartPrices;
  chartWeight;
  recalculateTotalsModel = model(0);
  notInGrams = computed(() => {
    return this.result()?.calculation?.outcomeUnit && this.result()?.calculation?.outcomeUnit !== "gram";
  });
  recipePriceAdditionsForm = new FormGroup({
    action: new FormControl("add"),
    value: new FormControl(0),
    unit: new FormControl("currency")
  });
  values = toSignal(this.recipePriceAdditionsForm.valueChanges);
  roundActionSelected = computed(() => {
    return this.values()?.action === "round";
  });
  showPriceAdditionUnits = computed(() => {
    const action = this.result()?.calculation?.perUnitPriceModifier?.action;
    return action === "add" || !action;
  });
  totalScaleFactor = computed(() => {
    if (!this.recalculateTotalsModel())
      return 1;
    return this.recalculateTotalsModel() / (this.result()?.calculation?.outcomeAmount || 1);
  });
  totalPrice = computed(() => {
    return (this.result()?.calculation?.totalPrice || 0) * this.totalScaleFactor();
  });
  totalPriceDifference = computed(() => {
    return (this.result()?.calculation?.totalPriceDifference || 0) * this.totalScaleFactor();
  });
  totalPriceWithAdditions = computed(() => {
    return (this.result()?.calculation?.totalPriceWithAdditions || 0) * this.totalScaleFactor();
  });
  ngOnInit() {
  }
  ngAfterViewInit() {
    window["chartPrices"] = this.chartPrices;
    window["chartWeight"] = this.chartWeight;
    this.recipePriceAdditionsForm.valueChanges.pipe(debounceTime(300)).subscribe((value) => {
      this.updatePriceAdditions(value);
    });
  }
  onChartHover(sourceChart, event, activeElements) {
    if (!activeElements?.length)
      return;
    const targetChart = sourceChart === "price" ? this.chartWeight : this.chartPrices;
    const index = activeElements[0].index;
    targetChart?.chart?.update();
  }
  async updatePriceAdditions(formValue) {
    try {
      await this._calculateRecipeService.updateRecipe({
        perUnitPriceModifier: {
          action: formValue.action,
          value: parseFloat(formValue.value) || 0,
          unit: formValue.unit
        }
      });
      const result = await this._calculateRecipeService.calculateRecipe(this.uuid());
      this.result.set(result);
    } catch (error) {
      this._notificationService.error(errorHandler(error));
    }
  }
  difference = import_lodash.difference;
  static \u0275fac = function CalculateRecipeComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _CalculateRecipeComponent)(\u0275\u0275directiveInject(ActivatedRoute), \u0275\u0275directiveInject(CalculateRecipeService), \u0275\u0275directiveInject(FormTemplateService), \u0275\u0275directiveInject(Injector), \u0275\u0275directiveInject(Router), \u0275\u0275directiveInject(NotificationsService));
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _CalculateRecipeComponent, selectors: [["lg-calculate-recipe"]], viewQuery: function CalculateRecipeComponent_Query(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275viewQuery(_c02, 5, BaseChartDirective);
      \u0275\u0275viewQuery(_c1, 5, BaseChartDirective);
    }
    if (rf & 2) {
      let _t;
      \u0275\u0275queryRefresh(_t = \u0275\u0275loadQuery()) && (ctx.chartPrices = _t.first);
      \u0275\u0275queryRefresh(_t = \u0275\u0275loadQuery()) && (ctx.chartWeight = _t.first);
    }
  }, inputs: { recalculateTotalsModel: [1, "recalculateTotalsModel"] }, outputs: { recalculateTotalsModel: "recalculateTotalsModelChange" }, features: [\u0275\u0275ProvidersFeature([
    SelectResourcesService,
    CurrencyPipe
  ])], decls: 16, vars: 16, consts: [["totalAmount", ""], ["priceChart", ""], ["weightChart", ""], [3, "center", "mobileMode"], [3, "flat", "link", "size"], ["lgExpand", "", 2, "max-width", "1200px", 3, "center", "mobileMode"], [3, "position"], ["size", "small"], [3, "size", "relaxed"], ["size", "small", 3, "position"], [2, "--control-bg", "#fff", "padding", "0 16px", 3, "formGroup", "size", "relaxed"], ["lgParseMath", "", "placeholder", "extra price", "formControlName", "value"], ["lgExtraTpl", "", "place", "before"], ["lgExtraTpl", "", "place", "after"], [2, "--control-bg", "#fff", "padding", "0 16px", 3, "size", "relaxed"], ["lgParseMath", "", "placeholder", "amount", 3, "ngModelChange", "ngModel"], ["lgWidth", "270px", "size", "small"], [3, "size"], [3, "level"], ["baseChart", "", 3, "chartHover", "data", "options", "type"], [4, "ngTemplateOutlet"], ["formControlName", "action", 3, "items"], ["formControlName", "unit", 3, "items"], [1, "text-underlined"], [3, "ngClass"], ["span", "1", 2, "width", "1%"], ["span", "1", 2, "width", "20%"], ["span", "1", 2, "width", "5%"], ["span", "1", 2, "width", "3%"], ["span", "1", 2, "width", "7%"], [3, "routerLink"]], template: function CalculateRecipeComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "lg-fade-in")(1, "lg-container")(2, "lg-gap-column")(3, "lg-gap-row", 3)(4, "lg-title");
      \u0275\u0275text(5);
      \u0275\u0275pipe(6, "translate");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(7, "lg-button", 4);
      \u0275\u0275text(8);
      \u0275\u0275pipe(9, "translate");
      \u0275\u0275elementEnd()();
      \u0275\u0275conditionalCreate(10, CalculateRecipeComponent_Conditional_10_Template, 56, 57, "lg-gap-row", 5);
      \u0275\u0275template(11, CalculateRecipeComponent_ng_template_11_Template, 2, 1, "ng-template", null, 0, \u0275\u0275templateRefExtractor);
      \u0275\u0275elementStart(13, "lg-table-card");
      \u0275\u0275conditionalCreate(14, CalculateRecipeComponent_Conditional_14_Template, 30, 15, "table")(15, CalculateRecipeComponent_Conditional_15_Template, 0, 0);
      \u0275\u0275elementEnd()()()();
    }
    if (rf & 2) {
      let tmp_3_0;
      let tmp_6_0;
      let tmp_9_0;
      \u0275\u0275advance(3);
      \u0275\u0275property("center", true)("mobileMode", true);
      \u0275\u0275advance(2);
      \u0275\u0275textInterpolate2(" ", (tmp_3_0 = ctx.result()) == null ? null : tmp_3_0.calculation == null ? null : tmp_3_0.calculation.recipeName, " ", \u0275\u0275pipeBind1(6, 12, "recipe.calculation.title.after-text"), " ");
      \u0275\u0275advance(2);
      \u0275\u0275styleMap("primary");
      \u0275\u0275property("flat", true)("link", "/recipes/edit/" + ((tmp_6_0 = ctx.result()) == null ? null : tmp_6_0.calculation == null ? null : tmp_6_0.calculation.recipeUuid))("size", "small");
      \u0275\u0275advance();
      \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind1(9, 14, "edit-label"), " ");
      \u0275\u0275advance(2);
      \u0275\u0275conditional(((tmp_9_0 = ctx.result()) == null ? null : tmp_9_0.calculation == null ? null : tmp_9_0.calculation.totalPrice) ? 10 : -1);
      \u0275\u0275advance(4);
      \u0275\u0275conditional(ctx.result() ? 14 : 15);
    }
  }, dependencies: [
    ContainerComponent,
    TitleComponent,
    TableCardComponent,
    NgClass,
    ButtonComponent,
    GapRowComponent,
    DecimalPipe,
    FormsModule,
    NgControlStatus,
    NgControlStatusGroup,
    NgModel,
    RouterLink,
    GapColumnComponent,
    NgTemplateOutlet,
    FadeInComponent,
    BaseChartDirective,
    CardComponent,
    WidthDirective,
    ExpandDirective,
    UserCurrencyPipe,
    TranslatePipe,
    ReactiveFormsModule,
    FormGroupDirective,
    FormControlName,
    UnitSwitcherComponent,
    ParseMathDirective,
    ControlExtraTemplateDirective,
    CurrencySymbolPipe,
    NumberInputComponent
  ], styles: ["/* angular:styles/component:scss;064d551d6d109f516da0bcfcbc4ae8e532f8260293a0d6b1d530d78dc0fca352;/Users/khripunovpavel/Documents/my/lasagna/lasagna/src/app/features/recipes/view/calculate/calculate-recipe.component.ts */\nlg-number-input .lg-number-input {\n  width: 100px;\n}\n/*# sourceMappingURL=calculate-recipe.component.css.map */\n"], encapsulation: 2 });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(CalculateRecipeComponent, [{
    type: Component,
    args: [{ selector: "lg-calculate-recipe", standalone: true, imports: [
      ContainerComponent,
      TitleComponent,
      TableCardComponent,
      NgClass,
      ButtonComponent,
      GapRowComponent,
      DecimalPipe,
      FormsModule,
      RouterLink,
      GapColumnComponent,
      NgTemplateOutlet,
      FadeInComponent,
      BaseChartDirective,
      CardComponent,
      WidthDirective,
      ExpandDirective,
      UserCurrencyPipe,
      TranslatePipe,
      InputComponent,
      ReactiveFormsModule,
      UnitSwitcherComponent,
      ParseMathDirective,
      ControlExtraTemplateDirective,
      CurrencySymbolPipe,
      NumberInputComponent
    ], encapsulation: ViewEncapsulation.None, providers: [
      SelectResourcesService,
      CurrencyPipe
    ], template: `<lg-fade-in>
  <lg-container>
    <lg-gap-column>
      <lg-gap-row [center]="true" [mobileMode]="true">
        <lg-title>
          {{ result()?.calculation?.recipeName }} {{ 'recipe.calculation.title.after-text'  | translate }}
        </lg-title>

        <lg-button [flat]="true"
                   [link]="'/recipes/edit/' + result()?.calculation?.recipeUuid"
                   [size]="'small'"
                   [style]="'primary'">
          {{ 'edit-label' | translate }}
        </lg-button>
      </lg-gap-row>

      @if (result()?.calculation?.totalPrice) {
        <lg-gap-row [center]="true" [mobileMode]="true" style="max-width: 1200px" lgExpand>
          <lg-gap-column [position]="'stretch'">

            <lg-card size="small">
              <lg-gap-row [size]="'small'" [relaxed]="true">
                <div>{{ 'recipe.calculation.outcome.label' | translate }}</div>

                <b>
                  {{ result()?.calculation?.outcomeAmount | number: '1.0-2' }}
                  {{ result()?.calculation?.outcomeUnit }}
                </b>
              </lg-gap-row>

            </lg-card>


            <lg-gap-column [position]="'stretch'" size="small">
              <lg-card size="small">
                <lg-gap-row [size]="'small'" [relaxed]="true">
                  <div>
                    {{ 'recipe.calculation.one-unit.label' | translate }} <b>
                    {{ result()?.calculation?.outcomeUnit }}
                  </b>
                  </div>

                  <b>
                    @if (notInGrams()) {
                      <ng-container *ngTemplateOutlet="totalAmount"></ng-container>
                    } @else {
                      {{ result()?.calculation?.pricePerUnit | userCurrency:'1.2-5' }}
                    }
                  </b>
                </lg-gap-row>
              </lg-card>


              <lg-gap-row [formGroup]="recipePriceAdditionsForm"
                          [size]="'small'"
                          [relaxed]="true" style="--control-bg: #fff;padding: 0 16px">
                <lg-number-input lgParseMath
                                 placeholder="extra price"
                                 formControlName="value">
                  <ng-template lgExtraTpl place="before">
                    <lg-unit-switcher formControlName="action"
                                      [items]="additionalPriceAction">
                    </lg-unit-switcher>
                  </ng-template>

                  @if (showPriceAdditionUnits()) {
                    <ng-template lgExtraTpl place="after">
                      <lg-unit-switcher formControlName="unit"
                                        [items]="additionalPriceUnit">
                      </lg-unit-switcher>
                    </ng-template>
                  }

                  @if (roundActionSelected()) {
                    <ng-template lgExtraTpl place="after">
                      <b>{{ userSettings()['currency']|currencySymbol }}
                        /
                        {{ result()?.calculation?.outcomeUnit }}
                      </b>
                    </ng-template>
                  }
                </lg-number-input>
              </lg-gap-row>
            </lg-gap-column>

            <lg-gap-column [position]="'stretch'" size="small">
              <lg-card size="small">
                <lg-gap-row [size]="'small'" [relaxed]="true">
                  <div>{{ 'recipe.calculation.total-price.label' | translate }}</div>

                  <b>
                    {{ totalPrice() | userCurrency: '1.2-2' }}

                    @if (totalPriceDifference()) {
                      @let diff = totalPriceDifference();
                      >
                      <span class="text-underlined">
                      {{ totalPriceWithAdditions() |  userCurrency: '1.2-2' }}
                    </span>

                     <span [ngClass]="diff > 0 ? 'text-success' : 'text-danger'">
                      ({{diff > 0 ? '+' : ''}} {{ diff |  userCurrency: '1.2-2' }})
                    </span>
                    }
                  </b>
                </lg-gap-row>
              </lg-card>

              <lg-gap-row [size]="'small'"
                          [relaxed]="true" style="--control-bg: #fff;padding: 0 16px">
                <lg-number-input lgParseMath
                                 placeholder="amount"
                                 [(ngModel)]="recalculateTotalsModel">
                  <ng-template lgExtraTpl place="before">
                    Recalculate for
                  </ng-template>

                  @if (roundActionSelected()) {
                    <ng-template lgExtraTpl place="after">
                      <b>
                        {{ result()?.calculation?.outcomeUnit }}
                      </b>
                    </ng-template>
                  }
                </lg-number-input>
              </lg-gap-row>
            </lg-gap-column>
          </lg-gap-column>

          <lg-card lgWidth="270px" size="small">
            <lg-gap-column [size]="'small'">
              <lg-title [level]="5">
                <div>{{ 'recipe.calculation.price-chart' | translate }}</div>
              </lg-title>

              <canvas [data]="doughnutChartData().prices"
                      [options]="doughnutChartOptions"
                      [type]="doughnutChartType"
                      (chartHover)="onChartHover('price', $event.event, $event.active)"
                      #priceChart
                      baseChart>
              </canvas>
            </lg-gap-column>
          </lg-card>

          <lg-card lgWidth="270px" size="small">
            <lg-gap-column [size]="'small'">
              <lg-title [level]="5">
                <div>{{ 'recipe.calculation.weight-chart' | translate }}</div>
              </lg-title>

              <canvas [data]="doughnutChartData().weight"
                      [options]="doughnutChartOptions"
                      (chartHover)="onChartHover('weight', $event.event, $event.active)"
                      [type]="doughnutChartType"
                      #weightChart
                      baseChart>
              </canvas>
            </lg-gap-column>
          </lg-card>
        </lg-gap-row>
      }

      <ng-template #totalAmount>
        @if (notInGrams()) {
          {{ result()?.calculation?.pricePerOutcomeUnit |  userCurrency: '1.2-2' }}

          @if (result()?.calculation?.totalPriceDifference) {
            @let diff = result()?.calculation?.pricePerUnitDifference ?? 0;
            >
            <span class="text-underlined">
              {{ result()?.calculation?.pricePerUnitModified |  userCurrency: '1.2-2' }}
            </span>

            <span [ngClass]="diff > 0 ? 'text-success' : 'text-danger'">
              ({{diff > 0 ? '+' : ''}} {{ diff |  userCurrency: '1.2-2' }})
            </span>
          }
          /
          {{ result()?.calculation?.weightForUnit |  number: '1.0-2' }} gram
        } @else {
          {{ result()?.calculation?.totalPrice | userCurrency: '1.2-2' }}
        }
      </ng-template>

      <lg-table-card>
        @if (result()) {
          <table>
            <colgroup>
              <col span="1" style="width: 1%;">
              <col span="1" style="width: 20%;">
              <col span="1" style="width: 5%;">
              <col span="1" style="width: 3%;">
              <col span="1" style="width: 5%;">
              <col span="1" style="width: 7%;">
            </colgroup>
            <thead>

            <tr>
              <th>#</th>
              <th>{{ 'recipe.calculation.table.name.title' | translate }}</th>
              <th>{{ 'recipe.calculation.table.amount.title' | translate }}</th>
              <th>{{ 'recipe.calculation.table.unit.title' | translate }}</th>
              <th>{{ 'recipe.calculation.table.price.title' | translate }}</th>
              <th>{{ 'recipe.calculation.table.total.title' | translate }}</th>
            </tr>
            </thead>

            <tbody>
              @for (row of result()?.table;track $index;let i = $index) {
                <tr [ngClass]="row.type">
                  <td>{{ i + 1 }}</td>

                  <td>
                    <div [ngClass]="'indent-' + row.indent">
                      @if (row.type !== 'total') {
                        <a [routerLink]="[row.type === 'recipe-row' ? '/recipes/edit/' : '/products/edit/', row.uuid]">
                          {{ row.name }}
                        </a>
                      } @else {
                        {{ row.name | translate }}
                      }
                    </div>
                  </td>

                  <td>{{ row.amount | number: '1.0-2' }}</td>

                  <td>{{ row.unit }}</td>

                  <td>{{ row.price_per_gram | userCurrency: '1.2-5' }}</td>

                  <td>{{ row.total | userCurrency: '1.0-2' }}</td>
                </tr>
              }
            </tbody>
          </table>
        } @else {
        }
      </lg-table-card>
    </lg-gap-column>
  </lg-container>
</lg-fade-in>
`, styles: ["/* angular:styles/component:scss;064d551d6d109f516da0bcfcbc4ae8e532f8260293a0d6b1d530d78dc0fca352;/Users/khripunovpavel/Documents/my/lasagna/lasagna/src/app/features/recipes/view/calculate/calculate-recipe.component.ts */\nlg-number-input .lg-number-input {\n  width: 100px;\n}\n/*# sourceMappingURL=calculate-recipe.component.css.map */\n"] }]
  }], () => [{ type: ActivatedRoute }, { type: CalculateRecipeService }, { type: FormTemplateService }, { type: Injector }, { type: Router }, { type: NotificationsService }], { chartPrices: [{
    type: ViewChild,
    args: ["priceChart", { read: BaseChartDirective }]
  }], chartWeight: [{
    type: ViewChild,
    args: ["weightChart", { read: BaseChartDirective }]
  }] });
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(CalculateRecipeComponent, { className: "CalculateRecipeComponent", filePath: "src/app/features/recipes/view/calculate/calculate-recipe.component.ts", lineNumber: 99 });
})();
export {
  CalculateRecipeComponent
};
//# sourceMappingURL=chunk-3DASD7RM.js.map
