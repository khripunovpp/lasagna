import {
  CurrencySymbolPipe
} from "./chunk-M53OHGBB.js";
import {
  BaseChartDirective
} from "./chunk-UOL7QAVK.js";
import {
  matchMediaSignal,
  mobileBreakpoint
} from "./chunk-UBZBNBVI.js";
import {
  UnitStringPipe
} from "./chunk-3S3MYWKO.js";
import {
  UserCurrencyPipe
} from "./chunk-CA2SMDMP.js";
import {
  UnitSwitcherComponent
} from "./chunk-4LFZNS4M.js";
import {
  WidthDirective
} from "./chunk-4BCA4DDF.js";
import {
  ParseMathDirective
} from "./chunk-RC7AXQYB.js";
import {
  NumberInputComponent
} from "./chunk-MBRLPJFV.js";
import {
  AnalyticsService
} from "./chunk-4W7NPBPS.js";
import "./chunk-BO3IID47.js";
import {
  ControlExtraTemplateDirective
} from "./chunk-FLD2PPMH.js";
import "./chunk-EROQRXO4.js";
import {
  InlineSeparatedGroupComponent,
  InlineSeparatedGroupDirective
} from "./chunk-ZVGHHFKR.js";
import {
  ExpandDirective
} from "./chunk-OSM632DP.js";
import {
  ContainerComponent
} from "./chunk-5CY226S4.js";
import {
  FlexRowComponent
} from "./chunk-WJNK66FX.js";
import {
  CardComponent
} from "./chunk-UQJSKI6G.js";
import {
  CalculateRecipeService,
  SelectResourcesService
} from "./chunk-NMSYXSQT.js";
import "./chunk-TSXZ5ARA.js";
import "./chunk-AUXPMPTM.js";
import "./chunk-I546HKDL.js";
import {
  NotificationsService,
  RecipePriceModifier,
  SETTINGS,
  SettingsKeysConst,
  SettingsService,
  currencyStringToSymbol,
  errorHandler,
  marker,
  productLabelFactoryProvider,
  require_lodash
} from "./chunk-5PDR5QLJ.js";
import "./chunk-E7RSJ4O4.js";
import "./chunk-OOJ6JS4B.js";
import {
  randomRGB
} from "./chunk-T5CRNY7R.js";
import "./chunk-5WJUMO7X.js";
import {
  FadeInComponent
} from "./chunk-IT3YWXZ6.js";
import {
  TitleComponent
} from "./chunk-6N7S7ZFR.js";
import "./chunk-GGH4TL4E.js";
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
  NgModel,
  ReactiveFormsModule,
  injectParams,
  takeUntilDestroyed,
  toSignal
} from "./chunk-RTCNHMN6.js";
import {
  ButtonComponent
} from "./chunk-4JEN4JYG.js";
import {
  TranslateDirective,
  TranslatePipe
} from "./chunk-DXRFKXPR.js";
import {
  ActivatedRoute,
  RouterLink
} from "./chunk-SHM3W5T3.js";
import "./chunk-VBFW7QHU.js";
import "./chunk-IWOUTMKL.js";
import {
  FlexColumnComponent
} from "./chunk-L3Q75KKL.js";
import {
  CurrencyPipe,
  DecimalPipe,
  NgClass
} from "./chunk-7I2CR6I6.js";
import {
  ChangeDetectionStrategy,
  Component,
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
  ɵɵclassProp,
  ɵɵconditional,
  ɵɵconditionalCreate,
  ɵɵdeclareLet,
  ɵɵdefineComponent,
  ɵɵdirectiveInject,
  ɵɵelement,
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
  ɵɵpureFunction1,
  ɵɵqueryRefresh,
  ɵɵreadContextLet,
  ɵɵrepeater,
  ɵɵrepeaterCreate,
  ɵɵrepeaterTrackByIndex,
  ɵɵresetView,
  ɵɵrestoreView,
  ɵɵstoreLet,
  ɵɵstyleMap,
  ɵɵstyleProp,
  ɵɵtemplate,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1,
  ɵɵtextInterpolate2,
  ɵɵtwoWayBindingSet,
  ɵɵtwoWayListener,
  ɵɵtwoWayProperty,
  ɵɵviewQuery
} from "./chunk-RQATVJ2P.js";
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
function CalculationPriceModifiersComponent_ng_template_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div");
    \u0275\u0275text(1);
    \u0275\u0275pipe(2, "translate");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind1(2, 1, "recipe.calculation.price-modifiers.title"), " ");
  }
}
function CalculationPriceModifiersComponent_ng_template_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "lg-unit-switcher", 5)(1, "lg-unit-switcher", 6);
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275property("items", ctx_r0.additionalPriceType);
    \u0275\u0275advance();
    \u0275\u0275property("items", ctx_r0.additionalPriceAction);
  }
}
function CalculationPriceModifiersComponent_Conditional_5_ng_template_0_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275text(0);
    \u0275\u0275pipe(1, "currencySymbol");
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind1(1, 1, ctx_r0.userSettings()["currency"]), " ");
  }
}
function CalculationPriceModifiersComponent_Conditional_5_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275template(0, CalculationPriceModifiersComponent_Conditional_5_ng_template_0_Template, 2, 3, "ng-template", 4);
  }
}
function CalculationPriceModifiersComponent_Conditional_6_ng_template_0_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "lg-unit-switcher", 7);
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275property("items", ctx_r0.additionalPriceUnit);
  }
}
function CalculationPriceModifiersComponent_Conditional_6_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275template(0, CalculationPriceModifiersComponent_Conditional_6_ng_template_0_Template, 1, 1, "ng-template", 4);
  }
}
var CalculationPriceModifiersComponent = class _CalculationPriceModifiersComponent {
  constructor() {
  }
  recipePriceAdditionsForm = new FormGroup({
    action: new FormControl("add"),
    value: new FormControl(0),
    unit: new FormControl("currency"),
    type: new FormControl("per_unit")
  });
  recipeCost = input(...ngDevMode ? [void 0, { debugName: "recipeCost" }] : []);
  values = toSignal(this.recipePriceAdditionsForm.valueChanges);
  userSettings = inject(SETTINGS);
  additionalPriceUnit = [
    {
      label: currencyStringToSymbol(this.userSettings()["currency"] || "USD"),
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
      label: marker("price-modifier.add"),
      value: "add",
      style: "secondary"
    },
    {
      label: marker("price-modifier.round"),
      value: "round",
      style: "secondary"
    }
  ];
  additionalPriceType = [
    {
      label: marker("price-modifier.per-unit"),
      value: "per_unit",
      style: "secondary"
    },
    {
      label: marker("price-modifier.total"),
      value: "total",
      style: "secondary"
    }
  ];
  onChanged = output();
  isMobile = matchMediaSignal(mobileBreakpoint);
  roundActionSelected = computed(() => {
    return this.values()?.action === "round";
  }, ...ngDevMode ? [{ debugName: "roundActionSelected" }] : []);
  onChangeFn = () => {
  };
  changesEffect = effect(() => {
    this.onChangeFn(this.values());
  }, ...ngDevMode ? [{ debugName: "changesEffect" }] : []);
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
    });
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
  ])], decls: 7, vars: 6, consts: [[3, "formGroup"], ["formControlName", "value", "lgParseMath", "", 3, "moveBeforeAbove", "placeholder"], ["lgExtraTpl", "", "place", "top"], ["lgExtraTpl", "", "place", "before"], ["lgExtraTpl", "", "place", "after"], ["formControlName", "type", 3, "items"], ["formControlName", "action", 3, "items"], ["formControlName", "unit", 3, "items"]], template: function CalculationPriceModifiersComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "lg-flex-row", 0)(1, "lg-number-input", 1);
      \u0275\u0275pipe(2, "translate");
      \u0275\u0275template(3, CalculationPriceModifiersComponent_ng_template_3_Template, 3, 3, "ng-template", 2)(4, CalculationPriceModifiersComponent_ng_template_4_Template, 2, 2, "ng-template", 3);
      \u0275\u0275conditionalCreate(5, CalculationPriceModifiersComponent_Conditional_5_Template, 1, 0, null, 4)(6, CalculationPriceModifiersComponent_Conditional_6_Template, 1, 0, null, 4);
      \u0275\u0275elementEnd()();
    }
    if (rf & 2) {
      \u0275\u0275property("formGroup", ctx.recipePriceAdditionsForm);
      \u0275\u0275advance();
      \u0275\u0275property("moveBeforeAbove", ctx.isMobile())("placeholder", \u0275\u0275pipeBind1(2, 4, "price-modifier.placeholder"));
      \u0275\u0275advance(4);
      \u0275\u0275conditional(ctx.roundActionSelected() ? 5 : 6);
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
    FlexRowComponent,
    CurrencySymbolPipe,
    TranslatePipe
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
      FlexRowComponent,
      TranslatePipe
    ], template: `
    <lg-flex-row [formGroup]="recipePriceAdditionsForm">
      <lg-number-input [moveBeforeAbove]="isMobile()"
                       [placeholder]="'price-modifier.placeholder' | translate"
                       formControlName="value"
                       lgParseMath>
        <ng-template lgExtraTpl place="top">
          <div>
            {{ 'recipe.calculation.price-modifiers.title' | translate }}
          </div>
        </ng-template>

        <ng-template lgExtraTpl place="before">
          <lg-unit-switcher [items]="additionalPriceType"
                            formControlName="type">
          </lg-unit-switcher>
          <lg-unit-switcher [items]="additionalPriceAction"
                            formControlName="action">
          </lg-unit-switcher>
        </ng-template>


        @if (roundActionSelected()) {
          <ng-template lgExtraTpl place="after">
            {{ userSettings()['currency']|currencySymbol }}
          </ng-template>
        } @else {
          <ng-template lgExtraTpl place="after">
            <lg-unit-switcher formControlName="unit"
                              [items]="additionalPriceUnit">
            </lg-unit-switcher>
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
  }], () => [], null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(CalculationPriceModifiersComponent, { className: "CalculationPriceModifiersComponent", filePath: "src/app/features/recipes/view/calculate/calculation-price-modifiers/calculation-price-modifiers.component.ts", lineNumber: 80 });
})();

// src/app/features/recipes/view/calculate/calculate-recipe.component.ts
var _c02 = ["priceChart"];
var _c1 = ["weightChart"];
var _c2 = (a0) => ({ unit: a0 });
var _c3 = (a0) => ["/recipes/edit/", a0];
var _c4 = (a0) => ["/products/edit/", a0];
function CalculateRecipeComponent_Conditional_9_ng_template_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "lg-button", 8);
    \u0275\u0275text(1);
    \u0275\u0275pipe(2, "translate");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    let tmp_6_0;
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275styleMap("default");
    \u0275\u0275property("flat", true)("link", "/recipes/edit/" + ((tmp_6_0 = ctx_r0.result()) == null ? null : tmp_6_0.calculation == null ? null : tmp_6_0.calculation.recipeUuid));
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind1(2, 5, "edit-label"), " ");
  }
}
function CalculateRecipeComponent_Conditional_9_ng_template_2_Template(rf, ctx) {
  if (rf & 1) {
    const _r2 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "lg-button", 9);
    \u0275\u0275listener("onClick", function CalculateRecipeComponent_Conditional_9_ng_template_2_Template_lg_button_onClick_0_listener() {
      \u0275\u0275restoreView(_r2);
      const ctx_r0 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r0.onPdfGenerate());
    });
    \u0275\u0275text(1);
    \u0275\u0275pipe(2, "translate");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    \u0275\u0275styleMap("default");
    \u0275\u0275property("flat", true);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind1(2, 4, "pdf-generate-label"), " ");
  }
}
function CalculateRecipeComponent_Conditional_9_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "lg-inline-separated-group");
    \u0275\u0275template(1, CalculateRecipeComponent_Conditional_9_ng_template_1_Template, 3, 7, "ng-template", 7)(2, CalculateRecipeComponent_Conditional_9_ng_template_2_Template, 3, 6, "ng-template", 7);
    \u0275\u0275elementEnd();
  }
}
function CalculateRecipeComponent_Conditional_10_Conditional_2_Conditional_11_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span");
    \u0275\u0275text(1, "/");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(2, "div");
    \u0275\u0275text(3);
    \u0275\u0275pipe(4, "number");
    \u0275\u0275pipe(5, "translate");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    let tmp_8_0;
    const ctx_r0 = \u0275\u0275nextContext(3);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate2(" ", \u0275\u0275pipeBind2(4, 2, (tmp_8_0 = ctx_r0.result()) == null ? null : tmp_8_0.calculation == null ? null : tmp_8_0.calculation.weightForUnit, ctx_r0.pipesDigits()), " ", \u0275\u0275pipeBind1(5, 5, "recipe.calculation.gram"), " ");
  }
}
function CalculateRecipeComponent_Conditional_10_Conditional_2_Conditional_25_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275text(0);
    \u0275\u0275pipe(1, "userCurrency");
  }
  if (rf & 2) {
    let tmp_8_0;
    const ctx_r0 = \u0275\u0275nextContext(3);
    \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind2(1, 1, (tmp_8_0 = ctx_r0.result()) == null ? null : tmp_8_0.calculation == null ? null : tmp_8_0.calculation.pricePerOutcomeUnit, ctx_r0.pipesDigits()), " ");
  }
}
function CalculateRecipeComponent_Conditional_10_Conditional_2_Conditional_26_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275text(0);
    \u0275\u0275pipe(1, "userCurrency");
  }
  if (rf & 2) {
    let tmp_8_0;
    const ctx_r0 = \u0275\u0275nextContext(3);
    \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind2(1, 1, (tmp_8_0 = ctx_r0.result()) == null ? null : tmp_8_0.calculation == null ? null : tmp_8_0.calculation.pricePerUnit, ctx_r0.pipesDigits()), " ");
  }
}
function CalculateRecipeComponent_Conditional_10_Conditional_2_Conditional_27_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span");
    \u0275\u0275text(1, ">");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(2, "div", 26);
    \u0275\u0275text(3);
    \u0275\u0275pipe(4, "userCurrency");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    let tmp_8_0;
    const ctx_r0 = \u0275\u0275nextContext(3);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1("", \u0275\u0275pipeBind2(4, 1, (tmp_8_0 = ctx_r0.result()) == null ? null : tmp_8_0.calculation == null ? null : tmp_8_0.calculation.pricePerUnitFromTotal, ctx_r0.pipesDigits()), " ");
  }
}
function CalculateRecipeComponent_Conditional_10_Conditional_2_Conditional_28_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "lg-flex-row", 25)(1, "span");
    \u0275\u0275text(2, "(");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "div");
    \u0275\u0275text(4);
    \u0275\u0275pipe(5, "userCurrency");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "span");
    \u0275\u0275text(7, ")");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    \u0275\u0275nextContext();
    const diff_r4 = \u0275\u0275readContextLet(22);
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275property("size", "tiny")("ngClass", diff_r4 > 0 ? "text-success" : "text-danger");
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate2(" ", diff_r4 > 0 ? "+" : "", "", \u0275\u0275pipeBind2(5, 4, diff_r4, ctx_r0.pipesDigits()), " ");
  }
}
function CalculateRecipeComponent_Conditional_10_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "lg-card", 12)(1, "lg-flex-row", 13)(2, "div");
    \u0275\u0275text(3);
    \u0275\u0275pipe(4, "translate");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "lg-flex-row", 14)(6, "div", 24);
    \u0275\u0275text(7);
    \u0275\u0275pipe(8, "number");
    \u0275\u0275pipe(9, "unitString");
    \u0275\u0275pipe(10, "translate");
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(11, CalculateRecipeComponent_Conditional_10_Conditional_2_Conditional_11_Template, 6, 7);
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(12, "lg-card", 12)(13, "lg-flex-row", 13)(14, "div");
    \u0275\u0275text(15);
    \u0275\u0275pipe(16, "translate");
    \u0275\u0275elementStart(17, "b");
    \u0275\u0275text(18);
    \u0275\u0275pipe(19, "unitString");
    \u0275\u0275pipe(20, "translate");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(21, "lg-flex-row", 14);
    \u0275\u0275declareLet(22);
    \u0275\u0275elementStart(23, "lg-flex-row", 2)(24, "div");
    \u0275\u0275conditionalCreate(25, CalculateRecipeComponent_Conditional_10_Conditional_2_Conditional_25_Template, 2, 4)(26, CalculateRecipeComponent_Conditional_10_Conditional_2_Conditional_26_Template, 2, 4);
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(27, CalculateRecipeComponent_Conditional_10_Conditional_2_Conditional_27_Template, 5, 4);
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(28, CalculateRecipeComponent_Conditional_10_Conditional_2_Conditional_28_Template, 8, 7, "lg-flex-row", 25);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    let tmp_10_0;
    let tmp_16_0;
    let tmp_17_0;
    let tmp_19_0;
    let tmp_21_0;
    let tmp_22_0;
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275property("size", "small")("mobileMode", true)("relaxed", true);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(4, 18, "recipe.calculation.outcome.label"));
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate2(" ", \u0275\u0275pipeBind2(8, 20, (tmp_10_0 = ctx_r0.result()) == null ? null : tmp_10_0.calculation == null ? null : tmp_10_0.calculation.outcomeAmount, ctx_r0.pipesDigits()), " ", \u0275\u0275pipeBind1(10, 25, \u0275\u0275pipeBind1(9, 23, (tmp_10_0 = ctx_r0.result()) == null ? null : tmp_10_0.calculation == null ? null : tmp_10_0.calculation.outcomeUnit)), " ");
    \u0275\u0275advance(4);
    \u0275\u0275conditional(ctx_r0.hasPortions() ? 11 : -1);
    \u0275\u0275advance(2);
    \u0275\u0275property("size", "small")("mobileMode", true)("relaxed", true);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind1(16, 27, "recipe.calculation.one-unit.label"), " ");
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(20, 31, \u0275\u0275pipeBind1(19, 29, (tmp_16_0 = ctx_r0.result()) == null ? null : tmp_16_0.calculation == null ? null : tmp_16_0.calculation.outcomeUnit)));
    \u0275\u0275advance(4);
    \u0275\u0275storeLet(((tmp_17_0 = ctx_r0.result()) == null ? null : tmp_17_0.calculation == null ? null : tmp_17_0.calculation.pricePerUnitFromTotalDifference) ?? 0);
    \u0275\u0275advance();
    \u0275\u0275property("size", "tiny");
    \u0275\u0275advance();
    \u0275\u0275classProp("text-bold", !((tmp_19_0 = ctx_r0.result()) == null ? null : tmp_19_0.calculation == null ? null : tmp_19_0.calculation.hasPriceDifference));
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r0.hasPortions() ? 25 : 26);
    \u0275\u0275advance(2);
    \u0275\u0275conditional(((tmp_21_0 = ctx_r0.result()) == null ? null : tmp_21_0.calculation == null ? null : tmp_21_0.calculation.hasPriceDifference) ? 27 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(((tmp_22_0 = ctx_r0.result()) == null ? null : tmp_22_0.calculation == null ? null : tmp_22_0.calculation.hasPriceDifference) ? 28 : -1);
  }
}
function CalculateRecipeComponent_Conditional_10_Conditional_15_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span");
    \u0275\u0275text(1, ">");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(2, "div", 27);
    \u0275\u0275text(3);
    \u0275\u0275pipe(4, "userCurrency");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind2(4, 1, ctx_r0.totalPriceWithAdditions(), ctx_r0.pipesDigits()), " ");
  }
}
function CalculateRecipeComponent_Conditional_10_Conditional_16_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "lg-flex-row", 15)(1, "span");
    \u0275\u0275text(2, "(");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "div", 28);
    \u0275\u0275text(4);
    \u0275\u0275pipe(5, "userCurrency");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "span");
    \u0275\u0275text(7, "/");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "div", 29);
    \u0275\u0275text(9);
    \u0275\u0275pipe(10, "number");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(11, "span");
    \u0275\u0275text(12, ")");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    \u0275\u0275nextContext();
    const diff_r5 = \u0275\u0275readContextLet(10);
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275property("ngClass", diff_r5 > 0 ? "text-success" : "text-danger");
    \u0275\u0275advance(3);
    \u0275\u0275property("ngClass", diff_r5 > 0 ? "text-success" : "text-danger");
    \u0275\u0275advance();
    \u0275\u0275textInterpolate2(" ", diff_r5 > 0 ? "+" : "", "", \u0275\u0275pipeBind2(5, 5, diff_r5, ctx_r0.pipesDigits()), " ");
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate1("", \u0275\u0275pipeBind2(10, 8, ctx_r0.totalPriceProfit(), ctx_r0.totalPipesDigits), "%");
  }
}
function CalculateRecipeComponent_Conditional_10_ng_template_20_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275text(0);
    \u0275\u0275pipe(1, "translate");
  }
  if (rf & 2) {
    \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind1(1, 1, "recipe.calculation.recalculate.label"), " ");
  }
}
function CalculateRecipeComponent_Conditional_10_ng_template_21_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "b");
    \u0275\u0275text(1);
    \u0275\u0275pipe(2, "unitString");
    \u0275\u0275pipe(3, "translate");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    let tmp_6_0;
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind1(3, 3, \u0275\u0275pipeBind1(2, 1, (tmp_6_0 = ctx_r0.result()) == null ? null : tmp_6_0.calculation == null ? null : tmp_6_0.calculation.outcomeUnit)), " ");
  }
}
function CalculateRecipeComponent_Conditional_10_Conditional_31_Template(rf, ctx) {
  if (rf & 1) {
    const _r6 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "lg-card", 21)(1, "lg-flex-column", 22)(2, "lg-title", 5)(3, "div");
    \u0275\u0275text(4);
    \u0275\u0275pipe(5, "translate");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(6, "canvas", 23, 1);
    \u0275\u0275listener("chartHover", function CalculateRecipeComponent_Conditional_10_Conditional_31_Template_canvas_chartHover_6_listener($event) {
      \u0275\u0275restoreView(_r6);
      const ctx_r0 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r0.onChartHover("weight", $event.event, $event.active));
    });
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275property("fill", true)("size", "small");
    \u0275\u0275advance();
    \u0275\u0275property("level", 5);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(5, 7, "recipe.calculation.weight-chart"));
    \u0275\u0275advance(2);
    \u0275\u0275property("data", ctx_r0.doughnutChartData().weight)("options", ctx_r0.doughnutChartOptions)("type", ctx_r0.doughnutChartType);
  }
}
function CalculateRecipeComponent_Conditional_10_Template(rf, ctx) {
  if (rf & 1) {
    const _r3 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "lg-flex-row", 4)(1, "lg-flex-column", 10);
    \u0275\u0275conditionalCreate(2, CalculateRecipeComponent_Conditional_10_Conditional_2_Template, 29, 34);
    \u0275\u0275elementStart(3, "lg-flex-column", 11)(4, "lg-card", 12)(5, "lg-flex-row", 13)(6, "div");
    \u0275\u0275text(7);
    \u0275\u0275pipe(8, "translate");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(9, "lg-flex-row", 2);
    \u0275\u0275declareLet(10);
    \u0275\u0275elementStart(11, "lg-flex-row", 14)(12, "div");
    \u0275\u0275text(13);
    \u0275\u0275pipe(14, "userCurrency");
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(15, CalculateRecipeComponent_Conditional_10_Conditional_15_Template, 5, 4);
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(16, CalculateRecipeComponent_Conditional_10_Conditional_16_Template, 13, 11, "lg-flex-row", 15);
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(17, "lg-flex-column", 16)(18, "lg-number-input", 17);
    \u0275\u0275pipe(19, "translate");
    \u0275\u0275twoWayListener("ngModelChange", function CalculateRecipeComponent_Conditional_10_Template_lg_number_input_ngModelChange_18_listener($event) {
      \u0275\u0275restoreView(_r3);
      const ctx_r0 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r0.recalculateTotalsModel, $event) || (ctx_r0.recalculateTotalsModel = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275template(20, CalculateRecipeComponent_Conditional_10_ng_template_20_Template, 2, 3, "ng-template", 18)(21, CalculateRecipeComponent_Conditional_10_ng_template_21_Template, 4, 5, "ng-template", 19);
    \u0275\u0275elementEnd();
    \u0275\u0275element(22, "lg-calculation-price-modifiers", 20);
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(23, "lg-card", 21)(24, "lg-flex-column", 22)(25, "lg-title", 5)(26, "div");
    \u0275\u0275text(27);
    \u0275\u0275pipe(28, "translate");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(29, "canvas", 23, 0);
    \u0275\u0275listener("chartHover", function CalculateRecipeComponent_Conditional_10_Template_canvas_chartHover_29_listener($event) {
      \u0275\u0275restoreView(_r3);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.onChartHover("price", $event.event, $event.active));
    });
    \u0275\u0275elementEnd()()();
    \u0275\u0275conditionalCreate(31, CalculateRecipeComponent_Conditional_10_Conditional_31_Template, 8, 9, "lg-card", 21);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    let tmp_23_0;
    const ctx_r0 = \u0275\u0275nextContext();
    const calculation_r7 = \u0275\u0275readContextLet(3);
    \u0275\u0275property("mobileMode", true);
    \u0275\u0275advance();
    \u0275\u0275property("position", "stretch");
    \u0275\u0275advance();
    \u0275\u0275conditional((calculation_r7 == null ? null : calculation_r7.hasWeight) ? 2 : -1);
    \u0275\u0275advance();
    \u0275\u0275property("position", "stretch");
    \u0275\u0275advance(2);
    \u0275\u0275property("size", "small")("mobileMode", true)("relaxed", true);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(8, 29, "recipe.calculation.total-price.label"));
    \u0275\u0275advance(2);
    \u0275\u0275property("size", "tiny");
    \u0275\u0275advance();
    \u0275\u0275storeLet(ctx_r0.totalPriceDifference());
    \u0275\u0275advance();
    \u0275\u0275classProp("text-bold", !ctx_r0.totalPriceDifference());
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind2(14, 32, ctx_r0.totalPrice(), ctx_r0.totalPipesDigits));
    \u0275\u0275advance(2);
    \u0275\u0275conditional(ctx_r0.totalPriceDifference() ? 15 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r0.totalPriceDifference() ? 16 : -1);
    \u0275\u0275advance();
    \u0275\u0275styleProp("padding", ctx_r0.isMobile() ? "0" : "0 16px");
    \u0275\u0275property("position", "stretch");
    \u0275\u0275advance();
    \u0275\u0275property("placeholder", \u0275\u0275pipeBind1(19, 35, "recipe.calculation.recalculate.placeholder"));
    \u0275\u0275twoWayProperty("ngModel", ctx_r0.recalculateTotalsModel);
    \u0275\u0275advance(4);
    \u0275\u0275property("formControl", ctx_r0.recipePriceAdditionsForm)("recipeCost", (tmp_23_0 = ctx_r0.result()) == null ? null : tmp_23_0.calculation);
    \u0275\u0275advance(2);
    \u0275\u0275property("fill", true)("size", "small");
    \u0275\u0275advance();
    \u0275\u0275property("level", 5);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(28, 37, "recipe.calculation.price-chart"));
    \u0275\u0275advance(2);
    \u0275\u0275property("data", ctx_r0.doughnutChartData().prices)("options", ctx_r0.doughnutChartOptions)("type", ctx_r0.doughnutChartType);
    \u0275\u0275advance(2);
    \u0275\u0275conditional((calculation_r7 == null ? null : calculation_r7.hasWeight) ? 31 : -1);
  }
}
function CalculateRecipeComponent_Conditional_14_For_26_Conditional_5_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "a", 36);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const row_r8 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275property("routerLink", \u0275\u0275pureFunction1(2, _c3, row_r8.uuid));
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", row_r8.name, " ");
  }
}
function CalculateRecipeComponent_Conditional_14_For_26_Conditional_6_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275text(0);
    \u0275\u0275pipe(1, "translate");
  }
  if (rf & 2) {
    const row_r8 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind1(1, 1, row_r8.name), " ");
  }
}
function CalculateRecipeComponent_Conditional_14_For_26_Conditional_7_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "a", 36);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const row_r8 = \u0275\u0275nextContext().$implicit;
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275property("routerLink", \u0275\u0275pureFunction1(2, _c4, row_r8.uuid));
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r0.productLabelFactory(row_r8.ingredient == null ? null : row_r8.ingredient.product_id), " ");
  }
}
function CalculateRecipeComponent_Conditional_14_For_26_Conditional_9_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275text(0);
    \u0275\u0275pipe(1, "number");
  }
  if (rf & 2) {
    const row_r8 = \u0275\u0275nextContext().$implicit;
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind2(1, 1, row_r8.amount, ctx_r0.pipesDigits()), " ");
  }
}
function CalculateRecipeComponent_Conditional_14_For_26_Conditional_10_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275text(0);
    \u0275\u0275pipe(1, "number");
  }
  if (rf & 2) {
    const row_r8 = \u0275\u0275nextContext().$implicit;
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind2(1, 1, row_r8.amount, ctx_r0.totalPipesDigits), " ");
  }
}
function CalculateRecipeComponent_Conditional_14_For_26_Conditional_15_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275text(0);
    \u0275\u0275pipe(1, "translate");
    \u0275\u0275pipe(2, "currencySymbol");
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(3);
    \u0275\u0275textInterpolate2(" ", \u0275\u0275pipeBind1(1, 2, "micro-amount"), " ", \u0275\u0275pipeBind1(2, 4, ctx_r0.userSettings()["currency"]), " ");
  }
}
function CalculateRecipeComponent_Conditional_14_For_26_Conditional_16_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275text(0);
    \u0275\u0275pipe(1, "userCurrency");
  }
  if (rf & 2) {
    const row_r8 = \u0275\u0275nextContext().$implicit;
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind2(1, 1, row_r8.price_per_unit, ctx_r0.pipesDigits()), " ");
  }
}
function CalculateRecipeComponent_Conditional_14_For_26_Conditional_21_Conditional_0_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275text(0);
    \u0275\u0275pipe(1, "translate");
    \u0275\u0275pipe(2, "currencySymbol");
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(4);
    \u0275\u0275textInterpolate2(" ", \u0275\u0275pipeBind1(1, 2, "micro-amount"), " ", \u0275\u0275pipeBind1(2, 4, ctx_r0.userSettings()["currency"]), " ");
  }
}
function CalculateRecipeComponent_Conditional_14_For_26_Conditional_21_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275text(0);
    \u0275\u0275pipe(1, "userCurrency");
  }
  if (rf & 2) {
    const row_r8 = \u0275\u0275nextContext(2).$implicit;
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind2(1, 1, row_r8.total, ctx_r0.pipesDigits()), " ");
  }
}
function CalculateRecipeComponent_Conditional_14_For_26_Conditional_21_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275conditionalCreate(0, CalculateRecipeComponent_Conditional_14_For_26_Conditional_21_Conditional_0_Template, 3, 6)(1, CalculateRecipeComponent_Conditional_14_For_26_Conditional_21_Conditional_1_Template, 2, 4);
  }
  if (rf & 2) {
    const row_r8 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275conditional((row_r8.ingredient == null ? null : row_r8.ingredient.hasMicroTotalPrice) ? 0 : 1);
  }
}
function CalculateRecipeComponent_Conditional_14_For_26_Conditional_22_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275text(0);
    \u0275\u0275pipe(1, "userCurrency");
  }
  if (rf & 2) {
    const row_r8 = \u0275\u0275nextContext().$implicit;
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind2(1, 1, row_r8.total, ctx_r0.totalPipesDigits), " ");
  }
}
function CalculateRecipeComponent_Conditional_14_For_26_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "tr", 28)(1, "td");
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "td", 34)(4, "div", 35);
    \u0275\u0275conditionalCreate(5, CalculateRecipeComponent_Conditional_14_For_26_Conditional_5_Template, 2, 4, "a", 36)(6, CalculateRecipeComponent_Conditional_14_For_26_Conditional_6_Template, 2, 3)(7, CalculateRecipeComponent_Conditional_14_For_26_Conditional_7_Template, 2, 4, "a", 36);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(8, "td");
    \u0275\u0275conditionalCreate(9, CalculateRecipeComponent_Conditional_14_For_26_Conditional_9_Template, 2, 4)(10, CalculateRecipeComponent_Conditional_14_For_26_Conditional_10_Template, 2, 4);
    \u0275\u0275text(11);
    \u0275\u0275pipe(12, "unitString");
    \u0275\u0275pipe(13, "translate");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(14, "td", 29);
    \u0275\u0275conditionalCreate(15, CalculateRecipeComponent_Conditional_14_For_26_Conditional_15_Template, 3, 6)(16, CalculateRecipeComponent_Conditional_14_For_26_Conditional_16_Template, 2, 4);
    \u0275\u0275element(17, "span", 37);
    \u0275\u0275pipe(18, "unitString");
    \u0275\u0275pipe(19, "translate");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(20, "td", 38);
    \u0275\u0275conditionalCreate(21, CalculateRecipeComponent_Conditional_14_For_26_Conditional_21_Template, 2, 1)(22, CalculateRecipeComponent_Conditional_14_For_26_Conditional_22_Template, 2, 4);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const row_r8 = ctx.$implicit;
    const \u0275$index_246_r9 = ctx.$index;
    \u0275\u0275property("ngClass", row_r8.type);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(\u0275$index_246_r9 + 1);
    \u0275\u0275advance(2);
    \u0275\u0275property("ngClass", "indent-" + row_r8.indent);
    \u0275\u0275advance();
    \u0275\u0275conditional(row_r8.type === "recipe-row" ? 5 : row_r8.type == "total" ? 6 : 7);
    \u0275\u0275advance(4);
    \u0275\u0275conditional(row_r8.type !== "total" ? 9 : 10);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind1(13, 14, \u0275\u0275pipeBind1(12, 12, row_r8.unit)), " ");
    \u0275\u0275advance(3);
    \u0275\u0275classProp("text-muted", row_r8.ingredient == null ? null : row_r8.ingredient.hasMicroPerUnitPrice);
    \u0275\u0275advance();
    \u0275\u0275conditional((row_r8.ingredient == null ? null : row_r8.ingredient.hasMicroPerUnitPrice) ? 15 : 16);
    \u0275\u0275advance(2);
    \u0275\u0275property("translateParams", \u0275\u0275pureFunction1(20, _c2, \u0275\u0275pipeBind1(19, 18, \u0275\u0275pipeBind1(18, 16, row_r8.unit))))("translate", "per-unit.label");
    \u0275\u0275advance(4);
    \u0275\u0275conditional(row_r8.type !== "total" ? 21 : 22);
  }
}
function CalculateRecipeComponent_Conditional_14_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "lg-table-card")(1, "table")(2, "colgroup");
    \u0275\u0275element(3, "col", 30)(4, "col", 31)(5, "col", 32)(6, "col", 33)(7, "col", 32);
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
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(24, "tbody");
    \u0275\u0275repeaterCreate(25, CalculateRecipeComponent_Conditional_14_For_26_Template, 23, 22, "tr", 28, \u0275\u0275repeaterTrackByIndex);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    let tmp_7_0;
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance(13);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(14, 4, "recipe.calculation.table.name.title"));
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(17, 6, "recipe.calculation.table.amount.title"));
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(20, 8, "recipe.calculation.table.price.title"));
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(23, 10, "recipe.calculation.table.total.title"));
    \u0275\u0275advance(3);
    \u0275\u0275repeater((tmp_7_0 = ctx_r0.result()) == null ? null : tmp_7_0.table);
  }
}
function CalculateRecipeComponent_Conditional_15_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "lg-flex-column", 6);
    \u0275\u0275text(1);
    \u0275\u0275pipe(2, "translate");
    \u0275\u0275elementStart(3, "lg-button", 39);
    \u0275\u0275text(4);
    \u0275\u0275pipe(5, "translate");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    let tmp_5_0;
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind1(2, 4, "recipe.calculation.empty-state.text"), " ");
    \u0275\u0275advance(2);
    \u0275\u0275property("size", "medium")("routerLink", "/recipes/edit/" + ((tmp_5_0 = ctx_r0.result()) == null ? null : tmp_5_0.calculation == null ? null : tmp_5_0.calculation.recipeUuid));
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind1(5, 6, "recipe.calculation.empty-state.btn"), " ");
  }
}
var CalculateRecipeComponent = class _CalculateRecipeComponent {
  _aRoute;
  _calculateRecipeService;
  _notificationService;
  _analyticsService;
  _settingsService;
  constructor(_aRoute, _calculateRecipeService, _notificationService, _analyticsService, _settingsService) {
    this._aRoute = _aRoute;
    this._calculateRecipeService = _calculateRecipeService;
    this._notificationService = _notificationService;
    this._analyticsService = _analyticsService;
    this._settingsService = _settingsService;
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
        action: recipePriceModifiers?.action,
        unit: recipePriceModifiers?.unit,
        value: recipePriceModifiers?.value,
        type: recipePriceModifiers?.type
      });
    });
  }
  userSettings = inject(SETTINGS);
  precisions = computed(() => this._settingsService.settingsSignal()?.getSetting(SettingsKeysConst.pricePrecision)?.data ?? 2, ...ngDevMode ? [{ debugName: "precisions" }] : []);
  pipesDigits = computed(() => `1.0-${this.precisions()}`, ...ngDevMode ? [{ debugName: "pipesDigits" }] : []);
  totalPipesDigits = "1.0-2";
  doughnutChartType = "pie";
  uuid = injectParams("uuid");
  result = signal(null, ...ngDevMode ? [{ debugName: "result" }] : []);
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
  }, ...ngDevMode ? [{ debugName: "doughnutChartData" }] : []);
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
  recalculateTotalsModel = model(0, ...ngDevMode ? [{ debugName: "recalculateTotalsModel" }] : []);
  hasPortions = computed(() => {
    return !!this.result()?.calculation?.recipe?.portions;
  }, ...ngDevMode ? [{ debugName: "hasPortions" }] : []);
  recipePriceAdditionsForm = new FormControl();
  values = toSignal(this.recipePriceAdditionsForm.valueChanges);
  isMobile = matchMediaSignal(mobileBreakpoint);
  totalScaleFactor = computed(() => {
    if (!this.recalculateTotalsModel())
      return 1;
    return this.recalculateTotalsModel() / (this.result()?.calculation?.outcomeAmount || 1);
  }, ...ngDevMode ? [{ debugName: "totalScaleFactor" }] : []);
  totalPrice = computed(() => {
    return (this.result()?.calculation?.totalPrice || 0) * this.totalScaleFactor();
  }, ...ngDevMode ? [{ debugName: "totalPrice" }] : []);
  totalPriceDifference = computed(() => {
    const diff = (this.result()?.calculation?.totalPriceDifference || 0) * this.totalScaleFactor();
    const threshold = 1e-6;
    return Math.abs(diff) < threshold ? 0 : diff;
  }, ...ngDevMode ? [{ debugName: "totalPriceDifference" }] : []);
  totalPriceProfit = computed(() => {
    return this.result()?.calculation?.totalPriceProfit || 0;
  }, ...ngDevMode ? [{ debugName: "totalPriceProfit" }] : []);
  totalPriceWithAdditions = computed(() => {
    return (this.result()?.calculation?.totalPriceWithAdditions || 0) * this.totalScaleFactor();
  }, ...ngDevMode ? [{ debugName: "totalPriceWithAdditions" }] : []);
  difference = import_lodash.difference;
  productLabelFactory = inject(productLabelFactoryProvider);
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
  async onPdfGenerate() {
    if (!this.result())
      return;
    try {
      await this._calculateRecipeService.generatePdf(this.result());
    } catch (error) {
      this._notificationService.error(errorHandler(error));
    }
  }
  static \u0275fac = function CalculateRecipeComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _CalculateRecipeComponent)(\u0275\u0275directiveInject(ActivatedRoute), \u0275\u0275directiveInject(CalculateRecipeService), \u0275\u0275directiveInject(NotificationsService), \u0275\u0275directiveInject(AnalyticsService), \u0275\u0275directiveInject(SettingsService));
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
  ])], decls: 16, vars: 15, consts: [["priceChart", ""], ["weightChart", ""], [3, "size"], [3, "center", "mobileMode"], ["lgExpand", "", 2, "max-width", "1200px", 3, "mobileMode"], [3, "level"], ["position", "start", "size", "medium"], ["lgInlineSeparatedGroup", ""], [3, "flat", "link"], [3, "onClick", "flat"], [3, "position"], ["size", "small", 3, "position"], ["size", "small"], [3, "size", "mobileMode", "relaxed"], ["size", "tiny"], ["size", "tiny", 1, "text-bold", 3, "ngClass"], ["size", "small", 2, "--control-bg", "var(--hr-bg-strong)", 3, "position"], ["lgParseMath", "", 3, "ngModelChange", "placeholder", "ngModel"], ["lgExtraTpl", "", "place", "before"], ["lgExtraTpl", "", "place", "after"], [3, "formControl", "recipeCost"], ["lgWidth", "270px", "size", "small"], [3, "fill", "size"], ["baseChart", "", 3, "chartHover", "data", "options", "type"], [1, "text-bold"], [1, "text-bold", 3, "size", "ngClass"], [1, "text-underlined", "text-bold"], [1, "text-bold", "text-underlined"], [3, "ngClass"], [1, "text-no-wrap"], ["span", "1", 2, "width", "1%"], ["span", "1", 2, "width", "20%"], ["span", "1", 2, "width", "10%"], ["span", "1", 2, "width", "7%"], ["width", "200"], [1, "text-no-wrap", 3, "ngClass"], [3, "routerLink"], [3, "translateParams", "translate"], [1, "text-bold", "text-no-wrap"], [3, "size", "routerLink"]], template: function CalculateRecipeComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "lg-fade-in")(1, "lg-container")(2, "lg-flex-column");
      \u0275\u0275declareLet(3);
      \u0275\u0275elementStart(4, "lg-flex-column", 2)(5, "lg-flex-row", 3)(6, "lg-title");
      \u0275\u0275text(7);
      \u0275\u0275pipe(8, "translate");
      \u0275\u0275elementEnd()();
      \u0275\u0275conditionalCreate(9, CalculateRecipeComponent_Conditional_9_Template, 3, 0, "lg-inline-separated-group");
      \u0275\u0275elementEnd();
      \u0275\u0275conditionalCreate(10, CalculateRecipeComponent_Conditional_10_Template, 32, 39, "lg-flex-row", 4);
      \u0275\u0275elementStart(11, "lg-title", 5);
      \u0275\u0275text(12);
      \u0275\u0275pipe(13, "translate");
      \u0275\u0275elementEnd();
      \u0275\u0275conditionalCreate(14, CalculateRecipeComponent_Conditional_14_Template, 27, 12, "lg-table-card")(15, CalculateRecipeComponent_Conditional_15_Template, 6, 8, "lg-flex-column", 6);
      \u0275\u0275elementEnd()()();
    }
    if (rf & 2) {
      let tmp_0_0;
      let tmp_1_0;
      let tmp_5_0;
      let tmp_7_0;
      \u0275\u0275advance(3);
      \u0275\u0275storeLet((tmp_0_0 = ctx.result()) == null ? null : tmp_0_0.calculation);
      const hasIngredients_r10 = (((tmp_1_0 = ctx.result()) == null ? null : tmp_1_0.calculation == null ? null : tmp_1_0.calculation.ingredients == null ? null : tmp_1_0.calculation.ingredients.length) || 0) > 0;
      \u0275\u0275advance();
      \u0275\u0275property("size", "medium");
      \u0275\u0275advance();
      \u0275\u0275property("center", true)("mobileMode", true);
      \u0275\u0275advance(2);
      \u0275\u0275textInterpolate2(" ", (tmp_5_0 = ctx.result()) == null ? null : tmp_5_0.calculation == null ? null : tmp_5_0.calculation.recipeName, " ", \u0275\u0275pipeBind1(8, 11, "recipe.calculation.title.after-text"), " ");
      \u0275\u0275advance(2);
      \u0275\u0275conditional(hasIngredients_r10 ? 9 : -1);
      \u0275\u0275advance();
      \u0275\u0275conditional(((tmp_7_0 = ctx.result()) == null ? null : tmp_7_0.calculation == null ? null : tmp_7_0.calculation.totalPrice) ? 10 : -1);
      \u0275\u0275advance();
      \u0275\u0275property("level", 3);
      \u0275\u0275advance();
      \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind1(13, 13, "recipe.calculation.table.title"), " ");
      \u0275\u0275advance(2);
      \u0275\u0275conditional(hasIngredients_r10 ? 14 : 15);
    }
  }, dependencies: [
    ContainerComponent,
    TitleComponent,
    TableCardComponent,
    NgClass,
    ButtonComponent,
    FlexRowComponent,
    FormsModule,
    NgControlStatus,
    NgModel,
    RouterLink,
    FlexColumnComponent,
    FadeInComponent,
    BaseChartDirective,
    CardComponent,
    WidthDirective,
    ExpandDirective,
    ReactiveFormsModule,
    FormControlDirective,
    CalculationPriceModifiersComponent,
    TranslateDirective,
    NumberInputComponent,
    ParseMathDirective,
    ControlExtraTemplateDirective,
    InlineSeparatedGroupComponent,
    InlineSeparatedGroupDirective,
    DecimalPipe,
    UserCurrencyPipe,
    TranslatePipe,
    UnitStringPipe,
    CurrencySymbolPipe
  ], styles: ["/* angular:styles/component:scss;064d551d6d109f516da0bcfcbc4ae8e532f8260293a0d6b1d530d78dc0fca352;/Users/khripunovpavel/Documents/my/lasagna/lasagna/src/app/features/recipes/view/calculate/calculate-recipe.component.ts */\nlg-number-input .lg-number-input {\n  width: 100px;\n}\n/*# sourceMappingURL=calculate-recipe.component.css.map */\n"], encapsulation: 2, changeDetection: 0 });
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
      FadeInComponent,
      BaseChartDirective,
      CardComponent,
      WidthDirective,
      ExpandDirective,
      UserCurrencyPipe,
      TranslatePipe,
      ReactiveFormsModule,
      CalculationPriceModifiersComponent,
      UnitStringPipe,
      TranslateDirective,
      CurrencySymbolPipe,
      NumberInputComponent,
      ParseMathDirective,
      ControlExtraTemplateDirective,
      InlineSeparatedGroupComponent,
      InlineSeparatedGroupDirective
    ], encapsulation: ViewEncapsulation.None, changeDetection: ChangeDetectionStrategy.OnPush, providers: [
      SelectResourcesService,
      CurrencyPipe
    ], template: `<lg-fade-in>
  <lg-container>
    <lg-flex-column>
      @let calculation = result()?.calculation;
      @let hasIngredients = (result()?.calculation?.ingredients?.length || 0) > 0;

      <lg-flex-column [size]="'medium'">
        <lg-flex-row [center]="true" [mobileMode]="true">
          <lg-title>
            {{ result()?.calculation?.recipeName }} {{ 'recipe.calculation.title.after-text'  | translate }}
          </lg-title>
        </lg-flex-row>

        @if (hasIngredients) {
          <lg-inline-separated-group>
            <ng-template lgInlineSeparatedGroup>
              <lg-button [flat]="true"
                         [link]="'/recipes/edit/' + result()?.calculation?.recipeUuid"
                         [style]="'default'">
                {{ 'edit-label' | translate }}
              </lg-button>
            </ng-template>

            <ng-template lgInlineSeparatedGroup>
              <lg-button [flat]="true"
                         (onClick)="onPdfGenerate()"
                         [style]="'default'">
                {{ 'pdf-generate-label' | translate }}
              </lg-button>
            </ng-template>
          </lg-inline-separated-group>
        }
      </lg-flex-column>

      @if (result()?.calculation?.totalPrice) {
        <lg-flex-row [mobileMode]="true"
                     style="max-width: 1200px"
                     lgExpand>
          <lg-flex-column [position]="'stretch'">
            @if (calculation?.hasWeight) {
              <lg-card size="small">
                <lg-flex-row [size]="'small'"
                             [mobileMode]="true"
                             [relaxed]="true">
                  <div>{{ 'recipe.calculation.outcome.label' | translate }}</div>

                  <lg-flex-row size="tiny">
                    <div class="text-bold">
                      {{ result()?.calculation?.outcomeAmount | number: pipesDigits() }}
                      {{ result()?.calculation?.outcomeUnit | unitString | translate }}
                    </div>

                    @if (hasPortions()) {
                      <span>/</span>

                      <div>
                        {{ result()?.calculation?.weightForUnit |  number: pipesDigits() }} {{ 'recipe.calculation.gram' | translate }}
                      </div>
                    }
                  </lg-flex-row>
                </lg-flex-row>
              </lg-card>

              <lg-card size="small">
                <lg-flex-row [size]="'small'"
                             [mobileMode]="true"
                             [relaxed]="true">
                  <div>
                    {{ 'recipe.calculation.one-unit.label' | translate }}
                    <b>{{ result()?.calculation?.outcomeUnit | unitString | translate }}</b>
                  </div>

                  <lg-flex-row size="tiny">
                    @let diff = result()?.calculation?.pricePerUnitFromTotalDifference ?? 0;
                    <lg-flex-row [size]="'tiny'">
                      <div [class.text-bold]="!result()?.calculation?.hasPriceDifference">
                        @if (hasPortions()) {
                          {{ result()?.calculation?.pricePerOutcomeUnit | userCurrency: pipesDigits() }}
                        } @else {
                          {{ result()?.calculation?.pricePerUnit | userCurrency:pipesDigits() }}
                        }
                      </div>

                      @if (result()?.calculation?.hasPriceDifference) {
                        <span>></span>
                        <div
                          class="text-underlined text-bold">{{ result()?.calculation?.pricePerUnitFromTotal |  userCurrency : pipesDigits() }}
                        </div>
                      }
                    </lg-flex-row>

                    @if (result()?.calculation?.hasPriceDifference) {
                      <lg-flex-row [size]="'tiny'"
                                   class="text-bold"
                                   [ngClass]="diff > 0 ? 'text-success' : 'text-danger'">
                        <span>(</span>
                        <div>
                          {{ diff > 0 ? '+' : '' }}{{ diff |  userCurrency: pipesDigits() }}
                        </div>
                        <span>)</span>
                      </lg-flex-row>
                    }
                  </lg-flex-row>
                </lg-flex-row>
              </lg-card>
            }

            <lg-flex-column [position]="'stretch'" size="small">
              <lg-card size="small">
                <lg-flex-row [size]="'small'"
                             [mobileMode]="true"
                             [relaxed]="true">
                  <div>{{ 'recipe.calculation.total-price.label' | translate }}</div>

                  <lg-flex-row [size]="'tiny'">
                    @let diff = totalPriceDifference();
                    <lg-flex-row [class.text-bold]="!totalPriceDifference()"
                                 size="tiny">
                      <div> {{ totalPrice() | userCurrency: totalPipesDigits }}</div>

                      @if (totalPriceDifference()) {
                        <span>></span>
                        <div class="text-bold text-underlined">
                          {{ totalPriceWithAdditions() |  userCurrency: pipesDigits() }}
                        </div>
                      }
                    </lg-flex-row>

                    @if (totalPriceDifference()) {
                      <lg-flex-row [ngClass]="diff > 0 ? 'text-success' : 'text-danger'"
                                   class="text-bold"
                                   size="tiny">
                        <span>(</span>
                        <div [ngClass]="diff > 0 ? 'text-success' : 'text-danger'">
                          {{ diff > 0 ? '+' : '' }}{{ diff |  userCurrency: pipesDigits() }}
                        </div>
                        <span>/</span>
                        <div class="text-no-wrap">{{ totalPriceProfit() |number:totalPipesDigits }}%</div>
                        <span>)</span>
                      </lg-flex-row>
                    }
                  </lg-flex-row>
                </lg-flex-row>
              </lg-card>

              <lg-flex-column [position]="'stretch'"
                              size="small"
                              [style.padding]="isMobile() ? '0' : '0 16px'"
                              style="--control-bg: var(--hr-bg-strong);">
                <lg-number-input lgParseMath
                                 [placeholder]="'recipe.calculation.recalculate.placeholder' | translate"
                                 [(ngModel)]="recalculateTotalsModel">
                  <ng-template lgExtraTpl place="before">
                    {{ 'recipe.calculation.recalculate.label'  | translate }}
                  </ng-template>

                  <ng-template lgExtraTpl place="after">
                    <b>
                      {{ result()?.calculation?.outcomeUnit | unitString | translate }}
                    </b>
                  </ng-template>
                </lg-number-input>

                <lg-calculation-price-modifiers
                  [formControl]="recipePriceAdditionsForm"
                  [recipeCost]="result()?.calculation"></lg-calculation-price-modifiers>
              </lg-flex-column>
            </lg-flex-column>
          </lg-flex-column>

          <lg-card lgWidth="270px" size="small">
            <lg-flex-column [fill]="true"
                            [size]="'small'">
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

          @if (calculation?.hasWeight) {
            <lg-card lgWidth="270px" size="small">
              <lg-flex-column [fill]="true"
                              [size]="'small'">
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
          }
        </lg-flex-row>
      }


      <lg-title [level]="3">
        {{ 'recipe.calculation.table.title'  | translate }}
      </lg-title>

      @if (hasIngredients) {
        <lg-table-card>
          <table>
            <colgroup>
              <col span="1" style="width: 1%;">
              <col span="1" style="width: 20%;">
              <col span="1" style="width: 10%;">
              <col span="1" style="width: 7%;">
              <col span="1" style="width: 10%;">
            </colgroup>
            <thead>

            <tr>
              <th>#</th>
              <th>{{ 'recipe.calculation.table.name.title' | translate }}</th>
              <th>{{ 'recipe.calculation.table.amount.title' | translate }}</th>
              <th>{{ 'recipe.calculation.table.price.title' | translate }}</th>
              <th>{{ 'recipe.calculation.table.total.title' | translate }}</th>
            </tr>
            </thead>

            <tbody>
              @for (row of result()?.table; track $index; let i = $index) {
                <tr [ngClass]="row.type">
                  <td>{{ i + 1 }}</td>

                  <td width="200">
                    <div class="text-no-wrap"
                         [ngClass]="'indent-' + row.indent">
                      <!--                      <pre>{{row.ingredient|json}}</pre>-->
                      @if (row.type === 'recipe-row') {
                        <a [routerLink]="['/recipes/edit/' ,row.uuid]">
                          {{ row.name }}
                        </a>
                      } @else if (row.type == 'total') {
                        {{ row.name | translate }}
                      } @else {
                        <a [routerLink]="['/products/edit/', row.uuid]">
                          {{ productLabelFactory(row.ingredient?.product_id) }}
                        </a>

                      }
                    </div>
                  </td>

                  <td>
                    @if (row.type !== 'total') {
                      {{ row.amount | number: pipesDigits() }}
                    } @else {
                      {{ row.amount | number: totalPipesDigits }}
                    }
                    {{ row.unit | unitString | translate }}
                  </td>

                  <td class="text-no-wrap"
                      [class.text-muted]="row.ingredient?.hasMicroPerUnitPrice">
                    @if (row.ingredient?.hasMicroPerUnitPrice) {
                      {{ 'micro-amount'|translate }}
                      {{ userSettings()['currency']|currencySymbol }}
                    } @else {
                      {{ row.price_per_unit | userCurrency: pipesDigits() }}
                    }
                    <span [translateParams]="{unit:row.unit | unitString | translate}"
                          [translate]="'per-unit.label'"></span>
                  </td>

                  <td class="text-bold text-no-wrap">
                    @if (row.type !== 'total') {
                      @if (row.ingredient?.hasMicroTotalPrice) {
                        {{ 'micro-amount'|translate }}
                        {{ userSettings()['currency']|currencySymbol }}
                      } @else {
                        {{ row.total | userCurrency: pipesDigits() }}
                      }
                    } @else {
                      {{ row.total | userCurrency: totalPipesDigits }}
                    }
                  </td>
                </tr>
              }
            </tbody>
          </table>
        </lg-table-card>
      } @else {
        <lg-flex-column position="start"
                        size="medium">
          {{ 'recipe.calculation.empty-state.text' | translate }}

          <lg-button [size]="'medium'"
                     [routerLink]="'/recipes/edit/' + result()?.calculation?.recipeUuid">
            {{ 'recipe.calculation.empty-state.btn' | translate }}
          </lg-button>
        </lg-flex-column>
      }
    </lg-flex-column>
  </lg-container>
</lg-fade-in>
`, styles: ["/* angular:styles/component:scss;064d551d6d109f516da0bcfcbc4ae8e532f8260293a0d6b1d530d78dc0fca352;/Users/khripunovpavel/Documents/my/lasagna/lasagna/src/app/features/recipes/view/calculate/calculate-recipe.component.ts */\nlg-number-input .lg-number-input {\n  width: 100px;\n}\n/*# sourceMappingURL=calculate-recipe.component.css.map */\n"] }]
  }], () => [{ type: ActivatedRoute }, { type: CalculateRecipeService }, { type: NotificationsService }, { type: AnalyticsService }, { type: SettingsService }], { chartPrices: [{
    type: ViewChild,
    args: ["priceChart", { read: BaseChartDirective }]
  }], chartWeight: [{
    type: ViewChild,
    args: ["weightChart", { read: BaseChartDirective }]
  }] });
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(CalculateRecipeComponent, { className: "CalculateRecipeComponent", filePath: "src/app/features/recipes/view/calculate/calculate-recipe.component.ts", lineNumber: 107 });
})();
export {
  CalculateRecipeComponent
};
//# sourceMappingURL=chunk-57GK4NBE.js.map
