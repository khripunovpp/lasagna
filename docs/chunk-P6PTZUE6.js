import {
  UnitSwitcherComponent
} from "./chunk-TAOTFCCS.js";
import {
  matchMediaSignal,
  mobileBreakpoint
} from "./chunk-443BUU7J.js";
import {
  NumberInputComponent
} from "./chunk-XQOMUKC5.js";
import {
  ParseMathDirective
} from "./chunk-A4UCVHPC.js";
import {
  CurrencySymbolPipe
} from "./chunk-JMGG6I2O.js";
import {
  FlexRowComponent
} from "./chunk-VVGY6OUS.js";
import {
  ControlExtraTemplateDirective
} from "./chunk-4ABBJ6BG.js";
import "./chunk-UG5XPMCB.js";
import {
  SETTINGS
} from "./chunk-XXA7PPXB.js";
import "./chunk-IWOUTMKL.js";
import {
  currencyStringToSymbol
} from "./chunk-R5O3TEDB.js";
import {
  FormControl,
  FormControlName,
  FormGroup,
  FormGroupDirective,
  NG_VALUE_ACCESSOR,
  NgControlStatus,
  NgControlStatusGroup,
  ReactiveFormsModule
} from "./chunk-2S3NUMNU.js";
import {
  toSignal
} from "./chunk-AWZMWU52.js";
import {
  marker
} from "./chunk-NJX644NS.js";
import "./chunk-CFXQGSQM.js";
import {
  TranslatePipe
} from "./chunk-755Q3QHA.js";
import "./chunk-X2X7GTPW.js";
import "./chunk-EROQRXO4.js";
import "./chunk-7YWLATDR.js";
import {
  Component,
  Input,
  Output,
  computed,
  effect,
  forwardRef,
  inject,
  input,
  output,
  setClassMetadata,
  ɵsetClassDebugInfo,
  ɵɵProvidersFeature,
  ɵɵadvance,
  ɵɵconditional,
  ɵɵconditionalCreate,
  ɵɵdefineComponent,
  ɵɵelement,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵnextContext,
  ɵɵpipe,
  ɵɵpipeBind1,
  ɵɵproperty,
  ɵɵtemplate,
  ɵɵtext,
  ɵɵtextInterpolate1
} from "./chunk-IYCVPBRB.js";
import "./chunk-46DXP6YY.js";

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
  }], () => [], { recipeCost: [{ type: Input, args: [{ isSignal: true, alias: "recipeCost", required: false }] }], onChanged: [{ type: Output, args: ["onChanged"] }] });
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(CalculationPriceModifiersComponent, { className: "CalculationPriceModifiersComponent", filePath: "src/app/features/recipes/view/calculate/calculation-price-modifiers/calculation-price-modifiers.component.ts", lineNumber: 80 });
})();
export {
  CalculationPriceModifiersComponent
};
//# sourceMappingURL=chunk-P6PTZUE6.js.map
