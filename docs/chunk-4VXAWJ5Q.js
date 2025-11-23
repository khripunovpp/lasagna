import {
  MultiselectComponent
} from "./chunk-IPBDTX37.js";
import {
  SelfStartDirective
} from "./chunk-3OLLO3KC.js";
import {
  ExpandDirective
} from "./chunk-NZ2BIUGW.js";
import {
  FlexRowComponent
} from "./chunk-VVGY6OUS.js";
import {
  ControlComponent
} from "./chunk-UFGIB7QO.js";
import "./chunk-CFCFQO5U.js";
import "./chunk-RBDPPOGX.js";
import "./chunk-BUGRPEBT.js";
import "./chunk-BPMAQ256.js";
import "./chunk-OGDPSEDB.js";
import {
  NotificationsService
} from "./chunk-6WNKKHFO.js";
import "./chunk-NLONWH5J.js";
import {
  SettingsService
} from "./chunk-MV7X5YHM.js";
import "./chunk-QHJLSFIB.js";
import "./chunk-3UJV2MM3.js";
import "./chunk-UG5XPMCB.js";
import "./chunk-XXA7PPXB.js";
import {
  errorHandler
} from "./chunk-XIU3WVPC.js";
import "./chunk-T5CRNY7R.js";
import "./chunk-IWOUTMKL.js";
import "./chunk-R5O3TEDB.js";
import "./chunk-KM2DRJZA.js";
import {
  DefaultValueAccessor,
  FormsModule,
  NG_VALUE_ACCESSOR,
  NgControlStatus,
  NgModel,
  ReactiveFormsModule
} from "./chunk-2S3NUMNU.js";
import "./chunk-PHCOZAXM.js";
import "./chunk-AWZMWU52.js";
import "./chunk-5WJUMO7X.js";
import {
  FlexColumnComponent
} from "./chunk-K37ECZYU.js";
import "./chunk-AESGXZO7.js";
import {
  APP_SERVER_IS_RU
} from "./chunk-2CTN2MPX.js";
import "./chunk-NJX644NS.js";
import {
  WINDOW
} from "./chunk-CFXQGSQM.js";
import {
  TranslatePipe,
  TranslateService
} from "./chunk-755Q3QHA.js";
import "./chunk-L34DFTMV.js";
import "./chunk-USF337CA.js";
import "./chunk-VVQKNBNV.js";
import {
  NgClass
} from "./chunk-X2X7GTPW.js";
import "./chunk-PZQLIUCM.js";
import "./chunk-7YWLATDR.js";
import {
  Component,
  HostListener,
  Input,
  Output,
  ViewEncapsulation,
  computed,
  forwardRef,
  inject,
  input,
  model,
  output,
  setClassMetadata,
  ɵsetClassDebugInfo,
  ɵɵProvidersFeature,
  ɵɵadvance,
  ɵɵattribute,
  ɵɵclassProp,
  ɵɵconditional,
  ɵɵconditionalCreate,
  ɵɵdefineComponent,
  ɵɵdirectiveInject,
  ɵɵelement,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵgetCurrentView,
  ɵɵlistener,
  ɵɵnamespaceSVG,
  ɵɵnextContext,
  ɵɵpipe,
  ɵɵpipeBind1,
  ɵɵprojection,
  ɵɵprojectionDef,
  ɵɵproperty,
  ɵɵrepeater,
  ɵɵrepeaterCreate,
  ɵɵresetView,
  ɵɵrestoreView,
  ɵɵsanitizeHtml,
  ɵɵtext,
  ɵɵtextInterpolate1
} from "./chunk-IYCVPBRB.js";
import "./chunk-46DXP6YY.js";

// src/app/features/controls/form/radio.component.ts
var _c0 = ["*"];
function RadioComponent_Conditional_4_Conditional_0_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "span", 4);
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275property("innerHTML", ctx_r0.customMark(), \u0275\u0275sanitizeHtml);
  }
}
function RadioComponent_Conditional_4_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(0, "svg", 5);
    \u0275\u0275element(1, "path", 6);
    \u0275\u0275elementEnd();
  }
}
function RadioComponent_Conditional_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275conditionalCreate(0, RadioComponent_Conditional_4_Conditional_0_Template, 1, 1, "span", 4)(1, RadioComponent_Conditional_4_Conditional_1_Template, 2, 0, ":svg:svg", 5);
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275conditional(ctx_r0.customMark() ? 0 : 1);
  }
}
var RadioComponent = class _RadioComponent {
  constructor() {
  }
  modelValue = false;
  customMark = input("", ...ngDevMode ? [{ debugName: "customMark" }] : []);
  name = input("", ...ngDevMode ? [{ debugName: "name" }] : []);
  value = input("", ...ngDevMode ? [{ debugName: "value" }] : []);
  // value = input<string>('');
  size = input("default", ...ngDevMode ? [{ debugName: "size" }] : []);
  markOnHover = input(false, ...ngDevMode ? [{ debugName: "markOnHover" }] : []);
  radio = input(false, ...ngDevMode ? [{ debugName: "radio" }] : []);
  noMark = input(false, ...ngDevMode ? [{ debugName: "noMark" }] : []);
  onCheckboxChanged = output();
  onKeydown(event) {
    event.preventDefault();
    this.onChangeCheckbox(!this.modelValue);
  }
  onChange = () => {
  };
  onTouched = () => {
  };
  writeValue(value) {
    this._change(value);
  }
  registerOnChange(fn) {
    this.onChange = fn;
  }
  registerOnTouched(fn) {
    this.onTouched = fn;
  }
  onChangeCheckbox(value) {
    this._change(value);
  }
  _change(value) {
    if (typeof value === "boolean") {
      this.modelValue = value;
    } else {
      this.modelValue = ["true", "false"].includes(value) ? value === "true" : value;
    }
    this.onChange(this.modelValue);
    this.onCheckboxChanged.emit(this.modelValue);
  }
  static \u0275fac = function RadioComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _RadioComponent)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _RadioComponent, selectors: [["lg-radio"]], hostBindings: function RadioComponent_HostBindings(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275listener("keydown.enter", function RadioComponent_keydown_enter_HostBindingHandler($event) {
        return ctx.onKeydown($event);
      })("keydown.space", function RadioComponent_keydown_space_HostBindingHandler($event) {
        return ctx.onKeydown($event);
      });
    }
  }, inputs: { customMark: [1, "customMark"], name: [1, "name"], value: [1, "value"], size: [1, "size"], markOnHover: [1, "markOnHover"], radio: [1, "radio"], noMark: [1, "noMark"] }, outputs: { onCheckboxChanged: "onCheckboxChanged" }, features: [\u0275\u0275ProvidersFeature([
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => _RadioComponent),
      multi: true
    }
  ])], ngContentSelectors: _c0, decls: 6, vars: 11, consts: [["tabindex", "0", 1, "lg-radio", 3, "ngClass"], [1, "checkbox", 3, "ngModelChange", "checked", "ngModel", "type"], [1, "lg-radio__mark"], [1, "lg-radio__mark-inner"], [3, "innerHTML"], ["xmlns", "http://www.w3.org/2000/svg", "width", "24", "height", "24", "viewBox", "0 0 24 24"], ["fill", "currentColor", "d", "M9.5 16.5l-4.25-4.25 1.4-1.4L9.5 13.7l7.35-7.35 1.4 1.4z"]], template: function RadioComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275projectionDef();
      \u0275\u0275elementStart(0, "label", 0)(1, "input", 1);
      \u0275\u0275listener("ngModelChange", function RadioComponent_Template_input_ngModelChange_1_listener($event) {
        return ctx.onChangeCheckbox($event);
      });
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(2, "span", 2)(3, "span", 3);
      \u0275\u0275conditionalCreate(4, RadioComponent_Conditional_4_Template, 2, 1);
      \u0275\u0275elementEnd()();
      \u0275\u0275projection(5);
      \u0275\u0275elementEnd();
    }
    if (rf & 2) {
      \u0275\u0275property("ngClass", ctx.size());
      \u0275\u0275attribute("for", ctx.name() + "-" + ctx.value());
      \u0275\u0275advance();
      \u0275\u0275property("checked", ctx.modelValue)("ngModel", ctx.modelValue)("type", ctx.radio() ? "radio" : "checkbox");
      \u0275\u0275attribute("id", ctx.name() + "-" + ctx.value())("name", ctx.name())("value", ctx.radio() ? ctx.value() : ctx.modelValue);
      \u0275\u0275advance();
      \u0275\u0275classProp("lg-radio__hoverOnly", ctx.markOnHover());
      \u0275\u0275advance(2);
      \u0275\u0275conditional(!ctx.noMark() ? 4 : -1);
    }
  }, dependencies: [FormsModule, DefaultValueAccessor, NgControlStatus, NgModel, NgClass], styles: ["/* angular:styles/component:scss;855696940d7692094d119f28a47304f42366845cf9b16d1afdc08d9c6e266570;/Users/khripunovpavel/Documents/my/lasagna/lasagna/src/app/features/controls/form/radio.component.ts */\n.lg-radio {\n  display: flex;\n  align-items: center;\n  border-radius: 12px;\n  gap: 8px;\n}\n.lg-radio:focus-within {\n  outline-color: var(--active-color);\n}\n.lg-radio__mark {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  width: 51px;\n  height: 51px;\n  border-radius: 12px;\n  background-color: var(--control-bg);\n  opacity: 0.2;\n  cursor: pointer;\n  transition: all 0.2s ease-in-out;\n  border: 1px solid transparent;\n}\n.lg-radio__hoverOnly {\n  background-color: transparent;\n  border-color: var(--text-color);\n}\n.lg-radio__hoverOnly .lg-radio__mark-inner {\n  opacity: 0;\n  transition: all 0.2s ease-in-out;\n}\n@media (hover: hover) {\n  .lg-radio__mark:hover {\n    opacity: 1;\n  }\n  .lg-radio__hoverOnly:hover .lg-radio__mark-inner {\n    opacity: 1;\n  }\n}\n.checkbox {\n  display: none;\n}\n.checkbox:checked + .lg-radio__mark {\n  background-color: var(--control-bg-selected);\n  opacity: 1;\n  font-weight: 700;\n}\n.checkbox:checked + .lg-radio__hoverOnly {\n  border-color: var(--control-bg-selected);\n}\n.checkbox:checked + .lg-radio__hoverOnly .lg-radio__mark-inner {\n  opacity: 1;\n}\n.lg-radio.small .lg-radio__mark {\n  width: 16px;\n  height: 16px;\n  border-radius: 6px;\n}\n/*# sourceMappingURL=radio.component.css.map */\n"], encapsulation: 2 });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(RadioComponent, [{
    type: Component,
    args: [{ selector: "lg-radio", standalone: true, template: `
      <label [attr.for]="name()+'-'+value()"
             [ngClass]="size()"
             class="lg-radio"
             tabindex="0">
          <input (ngModelChange)="onChangeCheckbox($event)"
                 [attr.id]="name()+'-'+value()"
                 [attr.name]="name()"
                 [attr.value]="radio() ? value() : modelValue"
                 [checked]="modelValue"
                 [ngModel]="modelValue"
                 [type]="radio() ? 'radio' : 'checkbox'"
                 class="checkbox">
          <span [class.lg-radio__hoverOnly]="markOnHover()"
                class="lg-radio__mark">
              <span class="lg-radio__mark-inner">
                  @if (!noMark()) {
                      @if (customMark()) {
                          <span [innerHTML]="customMark()"></span>
                      } @else {
                          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                               viewBox="0 0 24 24">
                      <path fill="currentColor"
                            d="M9.5 16.5l-4.25-4.25 1.4-1.4L9.5 13.7l7.35-7.35 1.4 1.4z"/>
                  </svg>
                      }
                  }
              </span>
          </span>

          <ng-content></ng-content>
      </label>
  `, encapsulation: ViewEncapsulation.None, providers: [
      {
        provide: NG_VALUE_ACCESSOR,
        useExisting: forwardRef(() => RadioComponent),
        multi: true
      }
    ], imports: [
      FormsModule,
      NgClass
    ], styles: ["/* angular:styles/component:scss;855696940d7692094d119f28a47304f42366845cf9b16d1afdc08d9c6e266570;/Users/khripunovpavel/Documents/my/lasagna/lasagna/src/app/features/controls/form/radio.component.ts */\n.lg-radio {\n  display: flex;\n  align-items: center;\n  border-radius: 12px;\n  gap: 8px;\n}\n.lg-radio:focus-within {\n  outline-color: var(--active-color);\n}\n.lg-radio__mark {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  width: 51px;\n  height: 51px;\n  border-radius: 12px;\n  background-color: var(--control-bg);\n  opacity: 0.2;\n  cursor: pointer;\n  transition: all 0.2s ease-in-out;\n  border: 1px solid transparent;\n}\n.lg-radio__hoverOnly {\n  background-color: transparent;\n  border-color: var(--text-color);\n}\n.lg-radio__hoverOnly .lg-radio__mark-inner {\n  opacity: 0;\n  transition: all 0.2s ease-in-out;\n}\n@media (hover: hover) {\n  .lg-radio__mark:hover {\n    opacity: 1;\n  }\n  .lg-radio__hoverOnly:hover .lg-radio__mark-inner {\n    opacity: 1;\n  }\n}\n.checkbox {\n  display: none;\n}\n.checkbox:checked + .lg-radio__mark {\n  background-color: var(--control-bg-selected);\n  opacity: 1;\n  font-weight: 700;\n}\n.checkbox:checked + .lg-radio__hoverOnly {\n  border-color: var(--control-bg-selected);\n}\n.checkbox:checked + .lg-radio__hoverOnly .lg-radio__mark-inner {\n  opacity: 1;\n}\n.lg-radio.small .lg-radio__mark {\n  width: 16px;\n  height: 16px;\n  border-radius: 6px;\n}\n/*# sourceMappingURL=radio.component.css.map */\n"] }]
  }], () => [], { customMark: [{ type: Input, args: [{ isSignal: true, alias: "customMark", required: false }] }], name: [{ type: Input, args: [{ isSignal: true, alias: "name", required: false }] }], value: [{ type: Input, args: [{ isSignal: true, alias: "value", required: false }] }], size: [{ type: Input, args: [{ isSignal: true, alias: "size", required: false }] }], markOnHover: [{ type: Input, args: [{ isSignal: true, alias: "markOnHover", required: false }] }], radio: [{ type: Input, args: [{ isSignal: true, alias: "radio", required: false }] }], noMark: [{ type: Input, args: [{ isSignal: true, alias: "noMark", required: false }] }], onCheckboxChanged: [{ type: Output, args: ["onCheckboxChanged"] }], onKeydown: [{
    type: HostListener,
    args: ["keydown.enter", ["$event"]]
  }, {
    type: HostListener,
    args: ["keydown.space", ["$event"]]
  }] });
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(RadioComponent, { className: "RadioComponent", filePath: "src/app/features/controls/form/radio.component.ts", lineNumber: 128 });
})();

// src/app/features/controls/form/currency-select.component.ts
var CurrencySelectComponent = class _CurrencySelectComponent {
  _translate;
  constructor(_translate) {
    this._translate = _translate;
  }
  // Язык передаётся через input-сигнал
  lang = input("en", ...ngDevMode ? [{ debugName: "lang" }] : []);
  globalCurrencyList = computed(() => {
    return [
      { code: "USD", name: this._translate.instant("currency.USD") },
      { code: "EUR", name: this._translate.instant("currency.EUR") },
      { code: "RUB", name: this._translate.instant("currency.RUB") },
      { code: "GBP", name: this._translate.instant("currency.GBP") },
      { code: "JPY", name: this._translate.instant("currency.JPY") },
      { code: "CNY", name: this._translate.instant("currency.CNY") },
      { code: "INR", name: this._translate.instant("currency.INR") },
      { code: "KZT", name: this._translate.instant("currency.KZT") },
      { code: "UAH", name: this._translate.instant("currency.UAH") },
      { code: "PLN", name: this._translate.instant("currency.PLN") },
      { code: "TRY", name: this._translate.instant("currency.TRY") },
      { code: "ILS", name: this._translate.instant("currency.ILS") }
    ];
  }, ...ngDevMode ? [{ debugName: "globalCurrencyList" }] : []);
  ruRegion = inject(APP_SERVER_IS_RU);
  ruRegionCurrency = computed(() => {
    return [
      { code: "RUB", name: this._translate.instant("currency.RUB") },
      { code: "USD", name: this._translate.instant("currency.USD") },
      { code: "EUR", name: this._translate.instant("currency.EUR") }
    ];
  }, ...ngDevMode ? [{ debugName: "ruRegionCurrency" }] : []);
  currencyList = computed(() => {
    return this.ruRegion ? this.ruRegionCurrency() : this.globalCurrencyList();
  }, ...ngDevMode ? [{ debugName: "currencyList" }] : []);
  selectedCurrency = model("USD", ...ngDevMode ? [{ debugName: "selectedCurrency" }] : []);
  writeValue(obj) {
    const currencyCode = obj || "USD";
    this.selectedCurrency.set(currencyCode);
    const foundCurrency = this.currencyList().find((c) => c.code === currencyCode);
    if (foundCurrency) {
      this.selectedCurrency.set(foundCurrency.code);
    }
  }
  registerOnChange(fn) {
    this.onChange = fn;
  }
  registerOnTouched(fn) {
    this.onTouched = fn;
  }
  setDisabledState(isDisabled) {
  }
  onCurrencySelected(currency) {
    const currencyCode = typeof currency === "string" ? currency : currency?.code;
    this.selectedCurrency.set(currency);
    this.onChange(currencyCode);
    this.onTouched();
  }
  onChange = (val) => {
  };
  onTouched = () => {
  };
  static \u0275fac = function CurrencySelectComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _CurrencySelectComponent)(\u0275\u0275directiveInject(TranslateService));
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _CurrencySelectComponent, selectors: [["lg-currency-select"]], inputs: { lang: [1, "lang"], selectedCurrency: [1, "selectedCurrency"] }, outputs: { selectedCurrency: "selectedCurrencyChange" }, features: [\u0275\u0275ProvidersFeature([
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: forwardRef(() => _CurrencySelectComponent)
    }
  ])], decls: 8, vars: 13, consts: [[3, "size"], ["lgExpand", "", 3, "label"], ["compareField", "code", 3, "onSelected", "multi", "ngModel", "placeholder", "staticItems"], [1, "text-small", "text-muted"]], template: function CurrencySelectComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "lg-flex-column", 0)(1, "lg-control", 1);
      \u0275\u0275pipe(2, "translate");
      \u0275\u0275elementStart(3, "lg-multiselect", 2);
      \u0275\u0275pipe(4, "translate");
      \u0275\u0275listener("onSelected", function CurrencySelectComponent_Template_lg_multiselect_onSelected_3_listener($event) {
        return ctx.onCurrencySelected($event);
      });
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(5, "small", 3);
      \u0275\u0275text(6);
      \u0275\u0275pipe(7, "translate");
      \u0275\u0275elementEnd()();
    }
    if (rf & 2) {
      \u0275\u0275property("size", "small");
      \u0275\u0275advance();
      \u0275\u0275property("label", \u0275\u0275pipeBind1(2, 7, "language.settings.currency-title"));
      \u0275\u0275advance(2);
      \u0275\u0275property("multi", false)("ngModel", ctx.selectedCurrency())("placeholder", \u0275\u0275pipeBind1(4, 9, "currency.select-placeholder"))("staticItems", ctx.currencyList());
      \u0275\u0275advance(3);
      \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind1(7, 11, "language.settings.currency-informer"), " ");
    }
  }, dependencies: [
    ReactiveFormsModule,
    NgControlStatus,
    FormsModule,
    NgModel,
    MultiselectComponent,
    ControlComponent,
    ExpandDirective,
    FlexColumnComponent,
    TranslatePipe
  ], styles: ["\n\n[_nghost-%COMP%] {\n  display: flex;\n  flex: 1;\n}\n/*# sourceMappingURL=currency-select.component.css.map */"] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(CurrencySelectComponent, [{
    type: Component,
    args: [{ selector: "lg-currency-select", standalone: true, imports: [
      ReactiveFormsModule,
      FormsModule,
      TranslatePipe,
      MultiselectComponent,
      ControlComponent,
      ExpandDirective,
      FlexColumnComponent
    ], providers: [
      {
        provide: NG_VALUE_ACCESSOR,
        multi: true,
        useExisting: forwardRef(() => CurrencySelectComponent)
      }
    ], template: `
    <lg-flex-column [size]="'small'">
      <lg-control [label]="'language.settings.currency-title' | translate"
                  lgExpand>
        <lg-multiselect
          (onSelected)="onCurrencySelected($event)"
          [multi]="false"
          [ngModel]="selectedCurrency()"
          [placeholder]="'currency.select-placeholder' | translate"
          [staticItems]="currencyList()"
          compareField="code">
        </lg-multiselect>
      </lg-control>
      <small class="text-small text-muted">
        {{ 'language.settings.currency-informer' | translate }}

      </small>
    </lg-flex-column>
  `, styles: ["/* angular:styles/component:scss;7f0a6256fd6fa1c43aa1d91ee52e564eb10f7cdc031a7f39e2d832e3417dd676;/Users/khripunovpavel/Documents/my/lasagna/lasagna/src/app/features/controls/form/currency-select.component.ts */\n:host {\n  display: flex;\n  flex: 1;\n}\n/*# sourceMappingURL=currency-select.component.css.map */\n"] }]
  }], () => [{ type: TranslateService }], { lang: [{ type: Input, args: [{ isSignal: true, alias: "lang", required: false }] }], selectedCurrency: [{ type: Input, args: [{ isSignal: true, alias: "selectedCurrency", required: false }] }, { type: Output, args: ["selectedCurrencyChange"] }] });
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(CurrencySelectComponent, { className: "CurrencySelectComponent", filePath: "src/app/features/controls/form/currency-select.component.ts", lineNumber: 62 });
})();

// src/app/features/settings/view/localisation/localisation-settings.component.ts
var _forTrack0 = ($index, $item) => $item.code;
function LocalisationSettingsComponent_For_6_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span");
    \u0275\u0275text(1);
    \u0275\u0275pipe(2, "translate");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const lang_r1 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind1(2, 1, lang_r1.name));
  }
}
function LocalisationSettingsComponent_For_6_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    const _r2 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "lg-radio", 7);
    \u0275\u0275listener("change", function LocalisationSettingsComponent_For_6_Conditional_2_Template_lg_radio_change_0_listener() {
      \u0275\u0275restoreView(_r2);
      const lang_r1 = \u0275\u0275nextContext().$implicit;
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.changeLang(lang_r1.code));
    });
    \u0275\u0275text(1);
    \u0275\u0275pipe(2, "translate");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r3 = \u0275\u0275nextContext();
    const lang_r1 = ctx_r3.$implicit;
    const \u0275$index_10_r5 = ctx_r3.$index;
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275property("markOnHover", true)("radio", true)("name", "lang")("value", lang_r1.code)("ngModel", ctx_r2.selectedLangModel()[\u0275$index_10_r5])("size", "small")("noMark", true);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind1(2, 8, lang_r1.name), " ");
  }
}
function LocalisationSettingsComponent_For_6_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "lg-flex-row", 4);
    \u0275\u0275conditionalCreate(1, LocalisationSettingsComponent_For_6_Conditional_1_Template, 3, 3, "span")(2, LocalisationSettingsComponent_For_6_Conditional_2_Template, 3, 10, "lg-radio", 6);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275property("center", true)("mobileMode", true)("size", "small");
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r2.onlyOneLanguage() ? 1 : 2);
  }
}
var LocalisationSettingsComponent = class _LocalisationSettingsComponent {
  constructor() {
    this.selectedLangModel.update((oldValue) => {
      return this._settingsService.languages.map(((value) => this._settingsService.settingsSignal()?.getSetting("lang")?.data === value));
    });
    this.currency.set(this._settingsService.settingsSignal()?.getSetting("currency")?.data || "USD");
  }
  currency = model("EUR", ...ngDevMode ? [{ debugName: "currency" }] : []);
  langsMap = {
    "en": "settings.language.english",
    "pt": "settings.language.portuguese",
    "ru": "settings.language.russian"
  };
  selectedLangModel = model([], ...ngDevMode ? [{ debugName: "selectedLangModel" }] : []);
  onlyOneLanguage = computed(() => this.languages().length <= 1, ...ngDevMode ? [{ debugName: "onlyOneLanguage" }] : []);
  _notificationsService = inject(NotificationsService);
  _settingsService = inject(SettingsService);
  selectedLang = this._settingsService.lang;
  languages = computed(() => {
    return this._settingsService.languages.map((lang) => ({
      code: lang,
      name: this.langsMap[lang] ? this.langsMap[lang] : lang
    }));
  }, ...ngDevMode ? [{ debugName: "languages" }] : []);
  _window = inject(WINDOW);
  async changeLang(lang) {
    try {
      await this._settingsService.changeLang(lang);
      this._notificationsService.success("settings.language.changed");
      this._window?.location.reload();
    } catch (error) {
      this._notificationsService.error(errorHandler(error));
    }
  }
  async changeCurrency(currency) {
    try {
      await this._settingsService.changeCurrency(String(currency).toUpperCase());
      this._notificationsService.success("settings.currency.changed");
      this._window?.location.reload();
    } catch (error) {
      this._notificationsService.error(errorHandler(error));
    }
  }
  static \u0275fac = function LocalisationSettingsComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _LocalisationSettingsComponent)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _LocalisationSettingsComponent, selectors: [["lg-language-settings"]], inputs: { currency: [1, "currency"], selectedLangModel: [1, "selectedLangModel"] }, outputs: { currency: "currencyChange", selectedLangModel: "selectedLangModelChange" }, decls: 8, vars: 6, consts: [["size", "medium"], [3, "label"], [1, "language-settings"], [3, "size"], [3, "center", "mobileMode", "size"], [3, "ngModelChange", "lang", "ngModel"], ["lgSelfStart", "", 3, "markOnHover", "radio", "name", "value", "ngModel", "size", "noMark"], ["lgSelfStart", "", 3, "change", "markOnHover", "radio", "name", "value", "ngModel", "size", "noMark"]], template: function LocalisationSettingsComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "lg-flex-column", 0)(1, "lg-control", 1);
      \u0275\u0275pipe(2, "translate");
      \u0275\u0275elementStart(3, "section", 2)(4, "lg-flex-column", 3);
      \u0275\u0275repeaterCreate(5, LocalisationSettingsComponent_For_6_Template, 3, 4, "lg-flex-row", 4, _forTrack0);
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(7, "lg-currency-select", 5);
      \u0275\u0275listener("ngModelChange", function LocalisationSettingsComponent_Template_lg_currency_select_ngModelChange_7_listener($event) {
        return ctx.changeCurrency($event);
      });
      \u0275\u0275elementEnd()();
    }
    if (rf & 2) {
      \u0275\u0275advance();
      \u0275\u0275property("label", \u0275\u0275pipeBind1(2, 4, "language.settings.language-title"));
      \u0275\u0275advance(3);
      \u0275\u0275property("size", "small");
      \u0275\u0275advance();
      \u0275\u0275repeater(ctx.languages());
      \u0275\u0275advance(2);
      \u0275\u0275property("lang", ctx.selectedLang())("ngModel", ctx.currency());
    }
  }, dependencies: [
    FlexRowComponent,
    FlexColumnComponent,
    FormsModule,
    NgControlStatus,
    NgModel,
    RadioComponent,
    CurrencySelectComponent,
    SelfStartDirective,
    ControlComponent,
    TranslatePipe
  ], encapsulation: 2 });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(LocalisationSettingsComponent, [{
    type: Component,
    args: [{ selector: "lg-language-settings", standalone: true, template: `
    <lg-flex-column size="medium">
      <lg-control [label]="'language.settings.language-title' | translate">
        <section class="language-settings">
          <lg-flex-column [size]="'small'">
            @for (lang of languages(); track lang.code; let i = $index) {
              <lg-flex-row [center]="true"
                           [mobileMode]="true"
                           [size]="'small'">
                @if (onlyOneLanguage()) {
                  <span> {{ lang.name | translate }}</span>
                } @else {
                  <lg-radio [markOnHover]="true"
                            [radio]="true"
                            lgSelfStart
                            [name]="'lang'"
                            [value]="lang.code"
                            [ngModel]="selectedLangModel()[i]"
                            (change)="changeLang(lang.code)"
                            [size]="'small'"
                            [noMark]="true">
                    {{ lang.name | translate }}
                  </lg-radio>
                }
              </lg-flex-row>
            }
          </lg-flex-column>
        </section>
      </lg-control>

      <lg-currency-select
        (ngModelChange)="changeCurrency($event)"
        [lang]="selectedLang()"
        [ngModel]="currency()">
      </lg-currency-select>
    </lg-flex-column>
  `, imports: [
      FlexRowComponent,
      FlexColumnComponent,
      FormsModule,
      RadioComponent,
      CurrencySelectComponent,
      TranslatePipe,
      FlexColumnComponent,
      SelfStartDirective,
      ControlComponent
    ] }]
  }], () => [], { currency: [{ type: Input, args: [{ isSignal: true, alias: "currency", required: false }] }, { type: Output, args: ["currencyChange"] }], selectedLangModel: [{ type: Input, args: [{ isSignal: true, alias: "selectedLangModel", required: false }] }, { type: Output, args: ["selectedLangModelChange"] }] });
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(LocalisationSettingsComponent, { className: "LocalisationSettingsComponent", filePath: "src/app/features/settings/view/localisation/localisation-settings.component.ts", lineNumber: 69 });
})();
export {
  LocalisationSettingsComponent
};
//# sourceMappingURL=chunk-4VXAWJ5Q.js.map
