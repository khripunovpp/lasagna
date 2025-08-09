import {
  CurrencySymbolPipe
} from "./chunk-4VZTH2RE.js";
import {
  UserCurrencyPipe
} from "./chunk-YGQ77ALH.js";
import {
  matchMediaSignal,
  mobileBreakpoint
} from "./chunk-YIUZO3M7.js";
import {
  BaseChartDirective
} from "./chunk-CQ6QXFFO.js";
import {
  WidthDirective
} from "./chunk-F2QJ6SGJ.js";
import {
  AnalyticsService,
  UnitSwitcherComponent
} from "./chunk-FAUVFVNX.js";
import {
  NumberInputComponent,
  ParseMathDirective
} from "./chunk-NPH6KIW3.js";
import {
  SelfStartDirective
} from "./chunk-D5PO2G4L.js";
import {
  ControlExtraTemplateDirective
} from "./chunk-KX57H5F3.js";
import "./chunk-EROQRXO4.js";
import {
  ExpandDirective
} from "./chunk-OCPTIUJK.js";
import {
  CardComponent
} from "./chunk-QPE4CQHK.js";
import {
  ContainerComponent
} from "./chunk-UX3GX3WK.js";
import {
  FlexRowComponent
} from "./chunk-O73UITIU.js";
import {
  FlexColumnComponent
} from "./chunk-ZIFIR5EQ.js";
import {
  FadeInComponent
} from "./chunk-GKY6K6EK.js";
import "./chunk-HNJAQDA3.js";
import {
  TitleComponent
} from "./chunk-OZKYQV4U.js";
import {
  CalculateRecipeService,
  FormTemplateService,
  SelectResourcesService
} from "./chunk-NIPIUAKD.js";
import "./chunk-IQVSZDRJ.js";
import "./chunk-SB6NPMDM.js";
import {
  FormControl,
  FormControlDirective,
  FormControlName,
  FormGroup,
  FormGroupDirective,
  FormsModule,
  NG_VALUE_ACCESSOR,
  NgControlStatus,
  NgControlStatusGroup,
  NotificationsService,
  ReactiveFormsModule,
  RecipePriceModifier,
  SETTINGS,
  errorHandler,
  injectParams,
  require_lodash,
  takeUntilDestroyed,
  toSignal
} from "./chunk-ZKFFSLQI.js";
import {
  randomRGB
} from "./chunk-Q4M4NLQD.js";
import {
  ButtonComponent
} from "./chunk-UXLMBQY2.js";
import {
  TranslatePipe
} from "./chunk-UMVMUCIR.js";
import "./chunk-Z6D6OJRN.js";
import "./chunk-5WJUMO7X.js";
import {
  ActivatedRoute,
  Router,
  RouterLink
} from "./chunk-HP5G5POF.js";
import "./chunk-ENTGQEHX.js";
import {
  CurrencyPipe,
  DecimalPipe,
  NgClass,
  NgTemplateOutlet
} from "./chunk-AL3DWPLK.js";
import {
  Component,
  Injector,
  ViewChild,
  ViewEncapsulation,
  computed,
  debounceTime,
  effect,
  forwardRef,
  inject,
  input,
  model,
  output,
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
  ɵɵstyleProp,
  ɵɵtemplate,
  ɵɵtemplateRefExtractor,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1,
  ɵɵtextInterpolate2,
  ɵɵviewQuery
} from "./chunk-UQVCVPTQ.js";
import "./chunk-PZQLIUCM.js";
import "./chunk-7YWLATDR.js";
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

// src/app/features/recipes/view/calculate/calculation-price-modifiers/calculation-price-modifiers.component.ts
function CalculationPriceModifiersComponent_ng_template_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "lg-unit-switcher", 4)(1, "lg-unit-switcher", 5);
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275property("items", ctx_r0.additionalPriceType);
    \u0275\u0275advance();
    \u0275\u0275property("items", ctx_r0.additionalPriceAction);
  }
}
function CalculationPriceModifiersComponent_Conditional_3_ng_template_0_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "lg-unit-switcher", 6);
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275property("items", ctx_r0.additionalPriceUnit);
  }
}
function CalculationPriceModifiersComponent_Conditional_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275template(0, CalculationPriceModifiersComponent_Conditional_3_ng_template_0_Template, 1, 1, "ng-template", 3);
  }
}
function CalculationPriceModifiersComponent_Conditional_4_ng_template_0_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "b");
    \u0275\u0275text(1);
    \u0275\u0275pipe(2, "currencySymbol");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    let tmp_2_0;
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate2("", \u0275\u0275pipeBind1(2, 2, ctx_r0.userSettings()["currency"]), " / ", (tmp_2_0 = ctx_r0.recipeCost()) == null ? null : tmp_2_0.outcomeUnit, " ");
  }
}
function CalculationPriceModifiersComponent_Conditional_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275template(0, CalculationPriceModifiersComponent_Conditional_4_ng_template_0_Template, 3, 4, "ng-template", 3);
  }
}
var CalculationPriceModifiersComponent = class _CalculationPriceModifiersComponent {
  recipePriceAdditionsForm = new FormGroup({
    action: new FormControl("add"),
    value: new FormControl(0),
    unit: new FormControl("currency"),
    type: new FormControl("per_unit")
  });
  recipeCost = input();
  values = toSignal(this.recipePriceAdditionsForm.valueChanges);
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
  additionalPriceType = [
    {
      label: "Per unit",
      value: "per_unit",
      style: "secondary"
    },
    {
      label: "Total",
      value: "total",
      style: "secondary"
    }
  ];
  onChanged = output();
  isMobile = matchMediaSignal(mobileBreakpoint);
  showPriceAdditionUnits = computed(() => {
    return true;
  });
  roundActionSelected = computed(() => {
    return this.values()?.action === "round";
  });
  onChangeFn = () => {
  };
  changesEffect = effect(() => {
    this.onChangeFn(this.values());
  });
  registerOnChange(fn) {
    this.onChangeFn = fn;
  }
  registerOnTouched(fn) {
  }
  writeValue(obj) {
    this.recipePriceAdditionsForm.patchValue({
      action: obj?.action || "add",
      value: obj?.value || 0,
      unit: obj?.unit || "currency",
      type: obj?.type || "per_unit"
    }, { emitEvent: false });
  }
  static \u0275fac = function CalculationPriceModifiersComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _CalculationPriceModifiersComponent)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _CalculationPriceModifiersComponent, selectors: [["lg-calculation-price-modifiers"]], inputs: { recipeCost: [1, "recipeCost"] }, outputs: { onChanged: "onChanged" }, features: [\u0275\u0275ProvidersFeature([
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => _CalculationPriceModifiersComponent),
      multi: true
    }
  ])], decls: 5, vars: 4, consts: [[3, "formGroup"], ["formControlName", "value", "lgParseMath", "", "placeholder", "extra price", 3, "moveBeforeAbove"], ["lgExtraTpl", "", "place", "before"], ["lgExtraTpl", "", "place", "after"], ["formControlName", "type", 3, "items"], ["formControlName", "action", 3, "items"], ["formControlName", "unit", 3, "items"]], template: function CalculationPriceModifiersComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "lg-flex-row", 0)(1, "lg-number-input", 1);
      \u0275\u0275template(2, CalculationPriceModifiersComponent_ng_template_2_Template, 2, 2, "ng-template", 2);
      \u0275\u0275conditionalCreate(3, CalculationPriceModifiersComponent_Conditional_3_Template, 1, 0, null, 3);
      \u0275\u0275conditionalCreate(4, CalculationPriceModifiersComponent_Conditional_4_Template, 1, 0, null, 3);
      \u0275\u0275elementEnd()();
    }
    if (rf & 2) {
      \u0275\u0275property("formGroup", ctx.recipePriceAdditionsForm);
      \u0275\u0275advance();
      \u0275\u0275property("moveBeforeAbove", ctx.isMobile());
      \u0275\u0275advance(2);
      \u0275\u0275conditional(ctx.showPriceAdditionUnits() ? 3 : -1);
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.roundActionSelected() ? 4 : -1);
    }
  }, dependencies: [
    NumberInputComponent,
    ParseMathDirective,
    ReactiveFormsModule,
    NgControlStatus,
    NgControlStatusGroup,
    FormGroupDirective,
    FormControlName,
    UnitSwitcherComponent,
    ControlExtraTemplateDirective,
    CurrencySymbolPipe,
    FlexRowComponent
  ], styles: ["\n\n[_nghost-%COMP%] {\n  width: 100%;\n}\n/*# sourceMappingURL=calculation-price-modifiers.component.css.map */"] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(CalculationPriceModifiersComponent, [{
    type: Component,
    args: [{ selector: "lg-calculation-price-modifiers", imports: [
      NumberInputComponent,
      ParseMathDirective,
      ReactiveFormsModule,
      UnitSwitcherComponent,
      ControlExtraTemplateDirective,
      CurrencySymbolPipe,
      FlexRowComponent
    ], template: `
    <lg-flex-row [formGroup]="recipePriceAdditionsForm">
      <lg-number-input [moveBeforeAbove]="isMobile()"
                       formControlName="value"
                       lgParseMath
                       placeholder="extra price">
        <ng-template lgExtraTpl place="before">
          <lg-unit-switcher [items]="additionalPriceType"
                            formControlName="type">
          </lg-unit-switcher>
          <lg-unit-switcher [items]="additionalPriceAction"
                            formControlName="action">
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
              {{ recipeCost()?.outcomeUnit }}
            </b>
          </ng-template>
        }
      </lg-number-input>
    </lg-flex-row>

  `, providers: [
      {
        provide: NG_VALUE_ACCESSOR,
        useExisting: forwardRef(() => CalculationPriceModifiersComponent),
        multi: true
      }
    ], styles: ["/* angular:styles/component:scss;14e881af935180b22b68ccc68b4f13155618549aaf92cd70df292b3324465246;/Users/khripunovpavel/Documents/my/lasagna/lasagna/src/app/features/recipes/view/calculate/calculation-price-modifiers/calculation-price-modifiers.component.ts */\n:host {\n  width: 100%;\n}\n/*# sourceMappingURL=calculation-price-modifiers.component.css.map */\n"] }]
  }], null, null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(CalculationPriceModifiersComponent, { className: "CalculationPriceModifiersComponent", filePath: "src/app/features/recipes/view/calculate/calculation-price-modifiers/calculation-price-modifiers.component.ts", lineNumber: 75 });
})();

// src/app/features/recipes/view/calculate/calculate-recipe.component.ts
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
    \u0275\u0275template(0, CalculateRecipeComponent_Conditional_10_Conditional_19_ng_container_0_Template, 1, 0, "ng-container", 17);
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
function CalculateRecipeComponent_Conditional_10_Conditional_31_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275text(0, " > ");
    \u0275\u0275elementStart(1, "span", 18);
    \u0275\u0275text(2);
    \u0275\u0275pipe(3, "userCurrency");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "span", 19);
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
function CalculateRecipeComponent_Conditional_10_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "lg-flex-row", 5)(1, "lg-flex-column", 6)(2, "lg-card", 7)(3, "lg-flex-row", 8)(4, "div");
    \u0275\u0275text(5);
    \u0275\u0275pipe(6, "translate");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "b");
    \u0275\u0275text(8);
    \u0275\u0275pipe(9, "number");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(10, "lg-flex-column", 9)(11, "lg-card", 7)(12, "lg-flex-row", 8)(13, "div");
    \u0275\u0275text(14);
    \u0275\u0275pipe(15, "translate");
    \u0275\u0275elementStart(16, "b");
    \u0275\u0275text(17);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(18, "b");
    \u0275\u0275conditionalCreate(19, CalculateRecipeComponent_Conditional_10_Conditional_19_Template, 1, 1, "ng-container")(20, CalculateRecipeComponent_Conditional_10_Conditional_20_Template, 2, 4);
    \u0275\u0275elementEnd()()();
    \u0275\u0275element(21, "lg-flex-row", 10);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(22, "lg-flex-column", 9)(23, "lg-card", 7)(24, "lg-flex-row", 8)(25, "div");
    \u0275\u0275text(26);
    \u0275\u0275pipe(27, "translate");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(28, "b");
    \u0275\u0275text(29);
    \u0275\u0275pipe(30, "userCurrency");
    \u0275\u0275conditionalCreate(31, CalculateRecipeComponent_Conditional_10_Conditional_31_Template, 7, 10);
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(32, "lg-flex-column", 11)(33, "div");
    \u0275\u0275text(34);
    \u0275\u0275pipe(35, "translate");
    \u0275\u0275elementEnd();
    \u0275\u0275element(36, "lg-calculation-price-modifiers", 12);
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(37, "lg-card", 13)(38, "lg-flex-column", 14)(39, "lg-title", 15)(40, "div");
    \u0275\u0275text(41);
    \u0275\u0275pipe(42, "translate");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(43, "canvas", 16, 1);
    \u0275\u0275listener("chartHover", function CalculateRecipeComponent_Conditional_10_Template_canvas_chartHover_43_listener($event) {
      \u0275\u0275restoreView(_r1);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.onChartHover("price", $event.event, $event.active));
    });
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(45, "lg-card", 13)(46, "lg-flex-column", 14)(47, "lg-title", 15)(48, "div");
    \u0275\u0275text(49);
    \u0275\u0275pipe(50, "translate");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(51, "canvas", 16, 2);
    \u0275\u0275listener("chartHover", function CalculateRecipeComponent_Conditional_10_Template_canvas_chartHover_51_listener($event) {
      \u0275\u0275restoreView(_r1);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.onChartHover("weight", $event.event, $event.active));
    });
    \u0275\u0275elementEnd()()()();
  }
  if (rf & 2) {
    let tmp_10_0;
    let tmp_15_0;
    let tmp_29_0;
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275property("center", true)("mobileMode", true);
    \u0275\u0275advance();
    \u0275\u0275property("position", "stretch");
    \u0275\u0275advance(2);
    \u0275\u0275property("size", "small")("relaxed", true);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(6, 40, "recipe.calculation.outcome.label"));
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate2(" ", \u0275\u0275pipeBind2(9, 42, (tmp_10_0 = ctx_r2.result()) == null ? null : tmp_10_0.calculation == null ? null : tmp_10_0.calculation.outcomeAmount, "1.0-2"), " ", (tmp_10_0 = ctx_r2.result()) == null ? null : tmp_10_0.calculation == null ? null : tmp_10_0.calculation.outcomeUnit, " ");
    \u0275\u0275advance(2);
    \u0275\u0275property("position", "stretch");
    \u0275\u0275advance(2);
    \u0275\u0275property("size", "small")("relaxed", true);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind1(15, 45, "recipe.calculation.one-unit.label"), " ");
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1(" ", (tmp_15_0 = ctx_r2.result()) == null ? null : tmp_15_0.calculation == null ? null : tmp_15_0.calculation.outcomeUnit, " ");
    \u0275\u0275advance(2);
    \u0275\u0275conditional(ctx_r2.notInGrams() ? 19 : 20);
    \u0275\u0275advance(2);
    \u0275\u0275property("size", "small")("relaxed", true);
    \u0275\u0275advance();
    \u0275\u0275property("position", "stretch");
    \u0275\u0275advance(2);
    \u0275\u0275property("size", "small")("relaxed", true);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(27, 47, "recipe.calculation.total-price.label"));
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind2(30, 49, ctx_r2.totalPrice(), "1.2-2"), " ");
    \u0275\u0275advance(2);
    \u0275\u0275conditional(ctx_r2.totalPriceDifference() ? 31 : -1);
    \u0275\u0275advance();
    \u0275\u0275styleProp("padding", ctx_r2.isMobile() ? "0" : "0 16px");
    \u0275\u0275property("position", "stretch");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind1(35, 52, "recipe.calculation.price-modifiers.title"), " ");
    \u0275\u0275advance(2);
    \u0275\u0275property("formControl", ctx_r2.recipePriceAdditionsForm)("recipeCost", (tmp_29_0 = ctx_r2.result()) == null ? null : tmp_29_0.calculation);
    \u0275\u0275advance(2);
    \u0275\u0275property("size", "small");
    \u0275\u0275advance();
    \u0275\u0275property("level", 5);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(42, 54, "recipe.calculation.price-chart"));
    \u0275\u0275advance(2);
    \u0275\u0275property("data", ctx_r2.doughnutChartData().prices)("options", ctx_r2.doughnutChartOptions)("type", ctx_r2.doughnutChartType);
    \u0275\u0275advance(3);
    \u0275\u0275property("size", "small");
    \u0275\u0275advance();
    \u0275\u0275property("level", 5);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(50, 56, "recipe.calculation.weight-chart"));
    \u0275\u0275advance(2);
    \u0275\u0275property("data", ctx_r2.doughnutChartData().weight)("options", ctx_r2.doughnutChartOptions)("type", ctx_r2.doughnutChartType);
  }
}
function CalculateRecipeComponent_ng_template_11_Conditional_0_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275text(0, " > ");
    \u0275\u0275elementStart(1, "span", 18);
    \u0275\u0275text(2);
    \u0275\u0275pipe(3, "userCurrency");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "span", 19);
    \u0275\u0275text(5);
    \u0275\u0275pipe(6, "userCurrency");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    let tmp_4_0;
    let tmp_5_0;
    const ctx_r2 = \u0275\u0275nextContext(3);
    const diff_r5 = ((tmp_4_0 = ctx_r2.result()) == null ? null : tmp_4_0.calculation == null ? null : tmp_4_0.calculation.pricePerUnitFromTotalDifference) ?? 0;
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind2(3, 4, (tmp_5_0 = ctx_r2.result()) == null ? null : tmp_5_0.calculation == null ? null : tmp_5_0.calculation.pricePerUnitFromTotal, "1.2-2"), " ");
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
    \u0275\u0275pipe(5, "translate");
  }
  if (rf & 2) {
    let tmp_3_0;
    let tmp_4_0;
    let tmp_5_0;
    const ctx_r2 = \u0275\u0275nextContext(2);
    \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind2(1, 4, (tmp_3_0 = ctx_r2.result()) == null ? null : tmp_3_0.calculation == null ? null : tmp_3_0.calculation.pricePerOutcomeUnit, "1.2-2"), " ");
    \u0275\u0275advance(2);
    \u0275\u0275conditional(((tmp_4_0 = ctx_r2.result()) == null ? null : tmp_4_0.calculation == null ? null : tmp_4_0.calculation.hasPriceDifference) ? 2 : -1);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate2(" / ", \u0275\u0275pipeBind2(4, 7, (tmp_5_0 = ctx_r2.result()) == null ? null : tmp_5_0.calculation == null ? null : tmp_5_0.calculation.weightForUnit, "1.0-2"), " ", \u0275\u0275pipeBind1(5, 10, "recipe.calculation.gram"), " ");
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
    \u0275\u0275conditionalCreate(0, CalculateRecipeComponent_ng_template_11_Conditional_0_Template, 6, 12)(1, CalculateRecipeComponent_ng_template_11_Conditional_1_Template, 2, 4);
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275conditional(ctx_r2.notInGrams() ? 0 : 1);
  }
}
function CalculateRecipeComponent_Conditional_14_For_29_Conditional_5_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "a", 26);
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
    \u0275\u0275elementStart(0, "tr", 19)(1, "td");
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "td", 25)(4, "div", 19);
    \u0275\u0275conditionalCreate(5, CalculateRecipeComponent_Conditional_14_For_29_Conditional_5_Template, 2, 5, "a", 26)(6, CalculateRecipeComponent_Conditional_14_For_29_Conditional_6_Template, 2, 3);
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
    const \u0275$index_186_r7 = ctx.$index;
    \u0275\u0275property("ngClass", row_r6.type);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(\u0275$index_186_r7 + 1);
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
    \u0275\u0275element(2, "col", 20)(3, "col", 21)(4, "col", 22)(5, "col", 23)(6, "col", 22)(7, "col", 24);
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
    \u0275\u0275repeaterCreate(28, CalculateRecipeComponent_Conditional_14_For_29_Template, 18, 17, "tr", 19, \u0275\u0275repeaterTrackByIndex);
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
  _analyticsService;
  constructor(_aRoute, _calculateRecipeService, _formTemplateService, _injector, _router, _notificationService, _analyticsService) {
    this._aRoute = _aRoute;
    this._calculateRecipeService = _calculateRecipeService;
    this._formTemplateService = _formTemplateService;
    this._injector = _injector;
    this._router = _router;
    this._notificationService = _notificationService;
    this._analyticsService = _analyticsService;
    this._aRoute.data.pipe(takeUntilDestroyed()).subscribe((data) => {
      this.result.set(data["result"]);
      if (data["result"]) {
        const calculation = data["result"];
        this._analyticsService.trackRecipeCalculated(calculation.calculation?.recipe?.name, calculation.calculation?.outcomeAmount, {
          recipe_uuid: this.uuid(),
          total_price: calculation.calculation?.totalPrice,
          ingredients_count: calculation.calculation?.ingredients?.length || 0,
          outcome_unit: calculation.calculation?.outcomeUnit
        });
      }
      const [recipePriceModifiers] = this.result()?.calculation?.recipe?.priceModifiers || [];
      this.recipePriceAdditionsForm.patchValue({
        action: recipePriceModifiers?.action || "add",
        unit: recipePriceModifiers?.unit || "gram",
        value: recipePriceModifiers?.value || 0,
        type: recipePriceModifiers?.type || "per_unit"
      });
    });
  }
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
  recipePriceAdditionsForm = new FormControl();
  values = toSignal(this.recipePriceAdditionsForm.valueChanges);
  isMobile = matchMediaSignal(mobileBreakpoint);
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
  difference = import_lodash.difference;
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
        priceModifiers: [
          new RecipePriceModifier(formValue.action, formValue.unit, parseFloat(formValue.value) || 0, formValue.type || "per_unit")
        ]
      });
      const result = await this._calculateRecipeService.calculateRecipe(this.uuid());
      this.result.set(result);
    } catch (error) {
      this._notificationService.error(errorHandler(error));
    }
  }
  static \u0275fac = function CalculateRecipeComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _CalculateRecipeComponent)(\u0275\u0275directiveInject(ActivatedRoute), \u0275\u0275directiveInject(CalculateRecipeService), \u0275\u0275directiveInject(FormTemplateService), \u0275\u0275directiveInject(Injector), \u0275\u0275directiveInject(Router), \u0275\u0275directiveInject(NotificationsService), \u0275\u0275directiveInject(AnalyticsService));
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
  ])], decls: 16, vars: 16, consts: [["totalAmount", ""], ["priceChart", ""], ["weightChart", ""], [3, "center", "mobileMode"], ["lgSelfStart", "", 3, "flat", "link", "size"], ["lgExpand", "", 2, "max-width", "1200px", 3, "center", "mobileMode"], [3, "position"], ["size", "small"], [3, "size", "relaxed"], ["size", "small", 3, "position"], [2, "--control-bg", "var(--hr-bg-strong)", "padding", "0 16px", 3, "size", "relaxed"], ["size", "small", 2, "--control-bg", "var(--hr-bg-strong)", 3, "position"], [3, "formControl", "recipeCost"], ["lgWidth", "270px", "size", "small"], [3, "size"], [3, "level"], ["baseChart", "", 3, "chartHover", "data", "options", "type"], [4, "ngTemplateOutlet"], [1, "text-underlined"], [3, "ngClass"], ["span", "1", 2, "width", "1%"], ["span", "1", 2, "width", "20%"], ["span", "1", 2, "width", "5%"], ["span", "1", 2, "width", "3%"], ["span", "1", 2, "width", "7%"], ["width", "200"], [3, "routerLink"]], template: function CalculateRecipeComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "lg-fade-in")(1, "lg-container")(2, "lg-flex-column")(3, "lg-flex-row", 3)(4, "lg-title");
      \u0275\u0275text(5);
      \u0275\u0275pipe(6, "translate");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(7, "lg-button", 4);
      \u0275\u0275text(8);
      \u0275\u0275pipe(9, "translate");
      \u0275\u0275elementEnd()();
      \u0275\u0275conditionalCreate(10, CalculateRecipeComponent_Conditional_10_Template, 53, 58, "lg-flex-row", 5);
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
    FlexRowComponent,
    DecimalPipe,
    FormsModule,
    NgControlStatus,
    RouterLink,
    FlexColumnComponent,
    NgTemplateOutlet,
    FadeInComponent,
    BaseChartDirective,
    CardComponent,
    WidthDirective,
    ExpandDirective,
    UserCurrencyPipe,
    TranslatePipe,
    ReactiveFormsModule,
    FormControlDirective,
    CalculationPriceModifiersComponent,
    SelfStartDirective
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
      FlexRowComponent,
      DecimalPipe,
      FormsModule,
      RouterLink,
      FlexColumnComponent,
      NgTemplateOutlet,
      FadeInComponent,
      BaseChartDirective,
      CardComponent,
      WidthDirective,
      ExpandDirective,
      UserCurrencyPipe,
      TranslatePipe,
      ReactiveFormsModule,
      CalculationPriceModifiersComponent,
      SelfStartDirective
    ], encapsulation: ViewEncapsulation.None, providers: [
      SelectResourcesService,
      CurrencyPipe
    ], template: `<lg-fade-in>
  <lg-container>
    <lg-flex-column>
      <lg-flex-row [center]="true" [mobileMode]="true">
        <lg-title>
          {{ result()?.calculation?.recipeName }} {{ 'recipe.calculation.title.after-text'  | translate }}
        </lg-title>

        <lg-button [flat]="true"
                   [link]="'/recipes/edit/' + result()?.calculation?.recipeUuid"
                   [size]="'small'"
                   [style]="'primary'"
                   lgSelfStart>
          {{ 'edit-label' | translate }}
        </lg-button>
      </lg-flex-row>

      @if (result()?.calculation?.totalPrice) {
        <lg-flex-row [center]="true" [mobileMode]="true" style="max-width: 1200px" lgExpand>
          <lg-flex-column [position]="'stretch'">

            <lg-card size="small">
              <lg-flex-row [size]="'small'" [relaxed]="true">
                <div>{{ 'recipe.calculation.outcome.label' | translate }}</div>

                <b>
                  {{ result()?.calculation?.outcomeAmount | number: '1.0-2' }}
                  {{ result()?.calculation?.outcomeUnit }}
                </b>
              </lg-flex-row>

            </lg-card>


            <lg-flex-column [position]="'stretch'" size="small">
              <lg-card size="small">
                <lg-flex-row [size]="'small'" [relaxed]="true">
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
                </lg-flex-row>
              </lg-card>


              <lg-flex-row [size]="'small'"
                           [relaxed]="true" style="--control-bg: var(--hr-bg-strong);padding: 0 16px">
              </lg-flex-row>
            </lg-flex-column>

            <lg-flex-column [position]="'stretch'" size="small">
              <lg-card size="small">
                <lg-flex-row [size]="'small'" [relaxed]="true">
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
                      ({{ diff > 0 ? '+' : '' }} {{ diff |  userCurrency: '1.2-2' }})
                    </span>
                    }
                  </b>
                </lg-flex-row>
              </lg-card>

              <lg-flex-column [position]="'stretch'"
                              size="small"
                              [style.padding]="isMobile() ? '0' : '0 16px'"
                              style="--control-bg: var(--hr-bg-strong);">

                <!--                <lg-number-input lgParseMath-->
                <!--                                 placeholder="amount"-->
                <!--                                 [(ngModel)]="recalculateTotalsModel">-->
                <!--                  <ng-template lgExtraTpl place="before">-->
                <!--                    Recalculate for-->
                <!--                  </ng-template>-->

                <!--                  &lt;!&ndash;                  @if (roundActionSelected()) {&ndash;&gt;-->
                <!--                  &lt;!&ndash;                    <ng-template lgExtraTpl place="after">&ndash;&gt;-->
                <!--                  &lt;!&ndash;                      <b>&ndash;&gt;-->
                <!--                  &lt;!&ndash;                        {{ result()?.calculation?.outcomeUnit }}&ndash;&gt;-->
                <!--                  &lt;!&ndash;                      </b>&ndash;&gt;-->
                <!--                  &lt;!&ndash;                    </ng-template>&ndash;&gt;-->
                <!--                  &lt;!&ndash;                  }&ndash;&gt;-->
                <!--                </lg-number-input>-->

                <div>
                  {{ 'recipe.calculation.price-modifiers.title' | translate }}
                </div>

                <lg-calculation-price-modifiers
                  [formControl]="recipePriceAdditionsForm"
                  [recipeCost]="result()?.calculation"></lg-calculation-price-modifiers>
              </lg-flex-column>
            </lg-flex-column>
          </lg-flex-column>

          <lg-card lgWidth="270px" size="small">
            <lg-flex-column [size]="'small'">
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
            </lg-flex-column>
          </lg-card>

          <lg-card lgWidth="270px" size="small">
            <lg-flex-column [size]="'small'">
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
            </lg-flex-column>
          </lg-card>
        </lg-flex-row>
      }

      <ng-template #totalAmount>
        @if (notInGrams()) {
          {{ result()?.calculation?.pricePerOutcomeUnit |  userCurrency: '1.2-2' }}

          @if (result()?.calculation?.hasPriceDifference) {
            @let diff = result()?.calculation?.pricePerUnitFromTotalDifference ?? 0;
            >
            <span class="text-underlined">
              {{ result()?.calculation?.pricePerUnitFromTotal |  userCurrency: '1.2-2' }}
            </span>

            <span [ngClass]="diff > 0 ? 'text-success' : 'text-danger'">
              ({{ diff > 0 ? '+' : '' }} {{ diff |  userCurrency: '1.2-2' }})
            </span>
          }
          /
          {{ result()?.calculation?.weightForUnit |  number: '1.0-2' }} {{ 'recipe.calculation.gram' | translate }}
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
              @for (row of result()?.table; track $index; let i = $index) {
                <tr [ngClass]="row.type">
                  <td>{{ i + 1 }}</td>

                  <td width="200">
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
    </lg-flex-column>
  </lg-container>
</lg-fade-in>
`, styles: ["/* angular:styles/component:scss;064d551d6d109f516da0bcfcbc4ae8e532f8260293a0d6b1d530d78dc0fca352;/Users/khripunovpavel/Documents/my/lasagna/lasagna/src/app/features/recipes/view/calculate/calculate-recipe.component.ts */\nlg-number-input .lg-number-input {\n  width: 100px;\n}\n/*# sourceMappingURL=calculate-recipe.component.css.map */\n"] }]
  }], () => [{ type: ActivatedRoute }, { type: CalculateRecipeService }, { type: FormTemplateService }, { type: Injector }, { type: Router }, { type: NotificationsService }, { type: AnalyticsService }], { chartPrices: [{
    type: ViewChild,
    args: ["priceChart", { read: BaseChartDirective }]
  }], chartWeight: [{
    type: ViewChild,
    args: ["weightChart", { read: BaseChartDirective }]
  }] });
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(CalculateRecipeComponent, { className: "CalculateRecipeComponent", filePath: "src/app/features/recipes/view/calculate/calculate-recipe.component.ts", lineNumber: 96 });
})();
export {
  CalculateRecipeComponent
};
//# sourceMappingURL=chunk-EHAZAIHH.js.map
