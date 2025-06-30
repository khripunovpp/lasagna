import {
  TabDirective,
  TabsComponent
} from "./chunk-KOE2WISM.js";
import {
  SelfCenterDirective,
  TaxesSettingsComponent
} from "./chunk-E6NCLLWD.js";
import "./chunk-X7MIVF3B.js";
import {
  CredentialsRepository
} from "./chunk-D4V74QBD.js";
import {
  Credential,
  CredentialsType,
  SettingsService
} from "./chunk-NDBDMDB3.js";
import {
  UploadComponent
} from "./chunk-T4OVB7QS.js";
import "./chunk-47THLFJI.js";
import "./chunk-YD3BFRRH.js";
import {
  ShrinkDirective
} from "./chunk-G7ZEKDCM.js";
import {
  NumberInputComponent
} from "./chunk-WBQUPP7L.js";
import {
  InputComponent
} from "./chunk-MGKNDLQM.js";
import "./chunk-EROQRXO4.js";
import "./chunk-7YWLATDR.js";
import {
  ExpandDirective
} from "./chunk-MJ7CZNNR.js";
import {
  MatIcon
} from "./chunk-JVNP6C27.js";
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
  TimeAgoPipe
} from "./chunk-63WB3IEN.js";
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
  TransferDataService
} from "./chunk-LVU2JMH2.js";
import "./chunk-XLVGBYUT.js";
import {
  ButtonComponent,
  DefaultValueAccessor,
  FormArray,
  FormArrayName,
  FormControl,
  FormControlName,
  FormGroup,
  FormGroupDirective,
  FormGroupName,
  FormsModule,
  NG_VALUE_ACCESSOR,
  NgControlStatus,
  NgControlStatusGroup,
  NgModel,
  NotificationsService,
  ReactiveFormsModule,
  errorHandler,
  injectQueryParams,
  takeUntilDestroyed
} from "./chunk-EH6A44OR.js";
import {
  RouterLink,
  RouterLinkActive
} from "./chunk-UGLIF2MQ.js";
import "./chunk-Q4M4NLQD.js";
import "./chunk-5WJUMO7X.js";
import {
  CommonModule,
  NgClass,
  NgIf
} from "./chunk-5MHPI2FA.js";
import {
  Component,
  DestroyRef,
  HostListener,
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
  ɵɵattribute,
  ɵɵclassProp,
  ɵɵconditional,
  ɵɵconditionalCreate,
  ɵɵdefineComponent,
  ɵɵdirectiveInject,
  ɵɵelement,
  ɵɵelementContainerEnd,
  ɵɵelementContainerStart,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵgetCurrentView,
  ɵɵinterpolate,
  ɵɵlistener,
  ɵɵloadQuery,
  ɵɵnamespaceSVG,
  ɵɵnextContext,
  ɵɵpipe,
  ɵɵpipeBind1,
  ɵɵprojection,
  ɵɵprojectionDef,
  ɵɵproperty,
  ɵɵqueryRefresh,
  ɵɵreference,
  ɵɵrepeater,
  ɵɵrepeaterCreate,
  ɵɵresetView,
  ɵɵrestoreView,
  ɵɵsanitizeHtml,
  ɵɵsanitizeUrl,
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
} from "./chunk-6AETQSBA.js";
import "./chunk-PZQLIUCM.js";
import "./chunk-46DXP6YY.js";

// src/app/shared/view/ui/form/radio.component.ts
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
  customMark = input("");
  name = input("");
  value = input("");
  // value = input<string>('');
  size = input("default");
  markOnHover = input(false);
  radio = input(false);
  noMark = input(false);
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
  }, dependencies: [FormsModule, DefaultValueAccessor, NgControlStatus, NgModel, NgClass], styles: ["/* angular:styles/component:scss;60b431270baff1bcc0e7031a260ea9ebb07b364aba74474adcfda907c532f5a1;/Users/khripunovpavel/Documents/my/lasagna/lasagna/src/app/shared/view/ui/form/radio.component.ts */\n.lg-radio {\n  display: flex;\n  border-radius: 12px;\n  gap: 8px;\n}\n.lg-radio:focus-within {\n  outline-color: var(--active-color);\n}\n.lg-radio__mark {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  width: 51px;\n  height: 51px;\n  border-radius: 12px;\n  background-color: var(--control-bg);\n  opacity: 0.2;\n  cursor: pointer;\n  transition: all 0.2s ease-in-out;\n  border: 1px solid transparent;\n}\n.lg-radio__hoverOnly {\n  background-color: transparent;\n  border-color: var(--text-color);\n}\n.lg-radio__hoverOnly .lg-radio__mark-inner {\n  opacity: 0;\n  transition: all 0.2s ease-in-out;\n}\n@media (hover: hover) {\n  .lg-radio__mark:hover {\n    opacity: 1;\n  }\n  .lg-radio__hoverOnly:hover .lg-radio__mark-inner {\n    opacity: 1;\n  }\n}\n.checkbox {\n  display: none;\n}\n.checkbox:checked + .lg-radio__mark {\n  background-color: var(--control-bg-selected);\n  opacity: 1;\n  font-weight: 700;\n}\n.checkbox:checked + .lg-radio__hoverOnly {\n  border-color: var(--control-bg-selected);\n}\n.checkbox:checked + .lg-radio__hoverOnly .lg-radio__mark-inner {\n  opacity: 1;\n}\n.lg-radio.small .lg-radio__mark {\n  width: 16px;\n  height: 16px;\n  border-radius: 6px;\n}\n/*# sourceMappingURL=radio.component.css.map */\n"], encapsulation: 2 });
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
    ], styles: ["/* angular:styles/component:scss;60b431270baff1bcc0e7031a260ea9ebb07b364aba74474adcfda907c532f5a1;/Users/khripunovpavel/Documents/my/lasagna/lasagna/src/app/shared/view/ui/form/radio.component.ts */\n.lg-radio {\n  display: flex;\n  border-radius: 12px;\n  gap: 8px;\n}\n.lg-radio:focus-within {\n  outline-color: var(--active-color);\n}\n.lg-radio__mark {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  width: 51px;\n  height: 51px;\n  border-radius: 12px;\n  background-color: var(--control-bg);\n  opacity: 0.2;\n  cursor: pointer;\n  transition: all 0.2s ease-in-out;\n  border: 1px solid transparent;\n}\n.lg-radio__hoverOnly {\n  background-color: transparent;\n  border-color: var(--text-color);\n}\n.lg-radio__hoverOnly .lg-radio__mark-inner {\n  opacity: 0;\n  transition: all 0.2s ease-in-out;\n}\n@media (hover: hover) {\n  .lg-radio__mark:hover {\n    opacity: 1;\n  }\n  .lg-radio__hoverOnly:hover .lg-radio__mark-inner {\n    opacity: 1;\n  }\n}\n.checkbox {\n  display: none;\n}\n.checkbox:checked + .lg-radio__mark {\n  background-color: var(--control-bg-selected);\n  opacity: 1;\n  font-weight: 700;\n}\n.checkbox:checked + .lg-radio__hoverOnly {\n  border-color: var(--control-bg-selected);\n}\n.checkbox:checked + .lg-radio__hoverOnly .lg-radio__mark-inner {\n  opacity: 1;\n}\n.lg-radio.small .lg-radio__mark {\n  width: 16px;\n  height: 16px;\n  border-radius: 6px;\n}\n/*# sourceMappingURL=radio.component.css.map */\n"] }]
  }], () => [], { onKeydown: [{
    type: HostListener,
    args: ["keydown.enter", ["$event"]]
  }, {
    type: HostListener,
    args: ["keydown.space", ["$event"]]
  }] });
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(RadioComponent, { className: "RadioComponent", filePath: "src/app/shared/view/ui/form/radio.component.ts", lineNumber: 127 });
})();

// src/app/features/settings/view/localisation/localisation-settings.component.ts
var _forTrack0 = ($index, $item) => $item.code;
function LocalisationSettingsComponent_For_8_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "lg-gap-row", 4)(1, "lg-radio", 7);
    \u0275\u0275listener("change", function LocalisationSettingsComponent_For_8_Template_lg_radio_change_1_listener() {
      const lang_r2 = \u0275\u0275restoreView(_r1).$implicit;
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.changeLang(lang_r2.code));
    });
    \u0275\u0275text(2);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const lang_r2 = ctx.$implicit;
    const \u0275$index_13_r4 = ctx.$index;
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275property("center", true)("mobileMode", true)("size", "small");
    \u0275\u0275advance();
    \u0275\u0275property("markOnHover", true)("radio", true)("name", "lang")("value", lang_r2.code)("ngModel", ctx_r2.selectedLangModel()[\u0275$index_13_r4])("size", "small")("noMark", true);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", lang_r2.name, " ");
  }
}
var LocalisationSettingsComponent = class _LocalisationSettingsComponent {
  _settingsService;
  constructor(_settingsService) {
    this._settingsService = _settingsService;
    this.selectedLang = this._settingsService.lang;
    this.selectedLangModel.update((oldValue) => {
      return this._settingsService.languages.map((value) => this.selectedLang() === value);
    });
    this.currency.set(this._settingsService.settingsSignal()?.getSetting("currency")?.data || "USD");
  }
  currency = model("EUR");
  langsMap = {
    "en": "English",
    "pt": "Portugu\xEAs",
    "ru": "\u0420\u0443\u0441\u0441\u043A\u0438\u0439"
  };
  selectedLang;
  selectedLangModel = model([]);
  languages = computed(() => {
    return this._settingsService.languages.map((lang) => ({
      code: lang,
      name: this.langsMap[lang] || lang
    }));
  });
  changeLang(lang) {
    this._settingsService.changeLang(lang);
  }
  changeCurrency(currency) {
    this._settingsService.changeCurrency(String(currency).toUpperCase());
  }
  static \u0275fac = function LocalisationSettingsComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _LocalisationSettingsComponent)(\u0275\u0275directiveInject(SettingsService));
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _LocalisationSettingsComponent, selectors: [["lg-language-settings"]], inputs: { currency: [1, "currency"], selectedLangModel: [1, "selectedLangModel"] }, outputs: { currency: "currencyChange", selectedLangModel: "selectedLangModelChange" }, decls: 16, vars: 11, consts: [["size", "medium"], [3, "level"], [1, "language-settings"], [3, "size"], [3, "center", "mobileMode", "size"], ["href", "https://en.wikipedia.org/wiki/ISO_4217", "target", "_blank"], [3, "ngModelChange", "ngModel"], [3, "change", "markOnHover", "radio", "name", "value", "ngModel", "size", "noMark"]], template: function LocalisationSettingsComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "lg-gap-column", 0)(1, "lg-title", 1);
      \u0275\u0275text(2);
      \u0275\u0275pipe(3, "translate");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(4, "section", 2)(5, "lg-gap-column", 3)(6, "lg-gap-column", 3);
      \u0275\u0275repeaterCreate(7, LocalisationSettingsComponent_For_8_Template, 3, 11, "lg-gap-row", 4, _forTrack0);
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(9, "lg-title", 1);
      \u0275\u0275text(10);
      \u0275\u0275pipe(11, "translate");
      \u0275\u0275elementStart(12, "a", 5);
      \u0275\u0275text(13, "ISO 4217");
      \u0275\u0275elementEnd();
      \u0275\u0275text(14, ") ");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(15, "lg-input", 6);
      \u0275\u0275listener("ngModelChange", function LocalisationSettingsComponent_Template_lg_input_ngModelChange_15_listener($event) {
        return ctx.changeCurrency($event);
      });
      \u0275\u0275twoWayListener("ngModelChange", function LocalisationSettingsComponent_Template_lg_input_ngModelChange_15_listener($event) {
        \u0275\u0275twoWayBindingSet(ctx.currency, $event) || (ctx.currency = $event);
        return $event;
      });
      \u0275\u0275elementEnd()();
    }
    if (rf & 2) {
      \u0275\u0275advance();
      \u0275\u0275property("level", 6);
      \u0275\u0275advance();
      \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(3, 7, "language.settings.language-title"));
      \u0275\u0275advance(3);
      \u0275\u0275property("size", "medium");
      \u0275\u0275advance();
      \u0275\u0275property("size", "small");
      \u0275\u0275advance();
      \u0275\u0275repeater(ctx.languages());
      \u0275\u0275advance(2);
      \u0275\u0275property("level", 6);
      \u0275\u0275advance();
      \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind1(11, 9, "language.settings.currency-title"), " (");
      \u0275\u0275advance(5);
      \u0275\u0275twoWayProperty("ngModel", ctx.currency);
    }
  }, dependencies: [
    GapRowComponent,
    GapColumnComponent,
    FormsModule,
    NgControlStatus,
    NgModel,
    RadioComponent,
    InputComponent,
    TitleComponent,
    TranslatePipe
  ], encapsulation: 2 });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(LocalisationSettingsComponent, [{
    type: Component,
    args: [{ selector: "lg-language-settings", standalone: true, template: `
      <lg-gap-column size="medium">
          <lg-title [level]="6">{{ 'language.settings.language-title'|translate }}</lg-title>

          <section class="language-settings">
              <lg-gap-column [size]="'medium'">

                  <lg-gap-column [size]="'small'">
                      @for (lang of languages();track lang.code;let i = $index) {
                          <lg-gap-row [center]="true" [mobileMode]="true" [size]="'small'">
                              <lg-radio [markOnHover]="true"
                                        [radio]="true"
                                        [name]="'lang'"
                                        [value]="lang.code"
                                        [ngModel]="selectedLangModel()[i]"
                                        (change)="changeLang(lang.code)"
                                        [size]="'small'"
                                        [noMark]="true">
                                  {{ lang.name }}
                              </lg-radio>
                          </lg-gap-row>
                      }
                  </lg-gap-column>
              </lg-gap-column>
          </section>

          <lg-title [level]="6">
              {{ 'language.settings.currency-title'|translate }}
              (<a href="https://en.wikipedia.org/wiki/ISO_4217" target="_blank">ISO 4217</a>)
          </lg-title>

          <lg-input (ngModelChange)="changeCurrency($event)"
                    [(ngModel)]="currency"></lg-input>
      </lg-gap-column>
  `, imports: [
      GapRowComponent,
      GapColumnComponent,
      FormsModule,
      RadioComponent,
      InputComponent,
      TitleComponent,
      TranslatePipe,
      GapColumnComponent
    ] }]
  }], () => [{ type: SettingsService }], null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(LocalisationSettingsComponent, { className: "LocalisationSettingsComponent", filePath: "src/app/features/settings/view/localisation/localisation-settings.component.ts", lineNumber: 62 });
})();

// src/app/features/settings/view/backup/backup-settings.component.ts
function BackupSettingsComponent_Conditional_5_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275text(0);
    \u0275\u0275pipe(1, "translate");
    \u0275\u0275pipe(2, "timeAgo");
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275textInterpolate2(" ", \u0275\u0275pipeBind1(1, 2, "backup.last-label"), " ", \u0275\u0275pipeBind1(2, 4, ctx_r0.transferDataService.currenBackupDate), " ");
  }
}
var BackupSettingsComponent = class _BackupSettingsComponent {
  constructor() {
  }
  downloadBackupParam = injectQueryParams("download_backup");
  transferDataService = inject(TransferDataService);
  notificationsService = inject(NotificationsService);
  ngAfterViewInit() {
    if (this.downloadBackupParam()) {
      this.onBackup();
    }
  }
  async onBackup() {
    const loader = this.notificationsService.loading("Creating backup");
    try {
      await this.transferDataService.exportAll("json");
      this.notificationsService.success("Backup created successfully");
      localStorage.setItem("lastBackupDate", Date.now().toString());
    } catch (e) {
      this.notificationsService.showJsonErrors([JSON.stringify(e)], "Backup failed");
      console.error(e);
    } finally {
      loader.close();
    }
  }
  async onRestore(event) {
    const loader = this.notificationsService.loading("Restoring backup");
    try {
      await this.transferDataService.restoreAllData(event);
      this.notificationsService.success("Restore completed successfully");
    } catch (e) {
      this.notificationsService.showJsonErrors([JSON.stringify(e)], "Restore failed");
      console.error(e);
    } finally {
      loader.close();
    }
  }
  static \u0275fac = function BackupSettingsComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _BackupSettingsComponent)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _BackupSettingsComponent, selectors: [["lg-backup-settings"]], decls: 15, vars: 18, consts: [[3, "center", "mobileMode"], [3, "click"], [3, "filesSelected", "accept"], [2, "--card-bg", "#e78888"], [3, "position"], [1, "text-center", "text-inverse"]], template: function BackupSettingsComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "lg-gap-column")(1, "lg-gap-row", 0)(2, "lg-button", 1);
      \u0275\u0275listener("click", function BackupSettingsComponent_Template_lg_button_click_2_listener() {
        return ctx.onBackup();
      });
      \u0275\u0275text(3);
      \u0275\u0275pipe(4, "translate");
      \u0275\u0275elementEnd();
      \u0275\u0275conditionalCreate(5, BackupSettingsComponent_Conditional_5_Template, 3, 6);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(6, "lg-upload", 2);
      \u0275\u0275listener("filesSelected", function BackupSettingsComponent_Template_lg_upload_filesSelected_6_listener($event) {
        return ctx.onRestore($event);
      });
      \u0275\u0275elementStart(7, "lg-card", 3)(8, "lg-gap-column", 4)(9, "div", 5);
      \u0275\u0275text(10);
      \u0275\u0275pipe(11, "translate");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(12, "lg-button");
      \u0275\u0275text(13);
      \u0275\u0275pipe(14, "translate");
      \u0275\u0275elementEnd()()()()();
    }
    if (rf & 2) {
      \u0275\u0275advance();
      \u0275\u0275property("center", true)("mobileMode", true);
      \u0275\u0275advance();
      \u0275\u0275styleMap("success");
      \u0275\u0275advance();
      \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind1(4, 12, "backup.make-btn"), " ");
      \u0275\u0275advance(2);
      \u0275\u0275conditional(ctx.transferDataService.currenBackupDate ? 5 : -1);
      \u0275\u0275advance();
      \u0275\u0275property("accept", ".json");
      \u0275\u0275advance(2);
      \u0275\u0275property("position", "center");
      \u0275\u0275advance(2);
      \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind1(11, 14, "backup.restore-informer"), " ");
      \u0275\u0275advance(2);
      \u0275\u0275styleMap("danger");
      \u0275\u0275advance();
      \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind1(14, 16, "backup.restore-btn"), " ");
    }
  }, dependencies: [
    CardComponent,
    GapRowComponent,
    GapColumnComponent,
    FormsModule,
    TimeAgoPipe,
    ButtonComponent,
    UploadComponent,
    TranslatePipe
  ], encapsulation: 2 });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(BackupSettingsComponent, [{
    type: Component,
    args: [{ selector: "lg-backup-settings", standalone: true, template: `
      <lg-gap-column>
          <lg-gap-row [center]="true" [mobileMode]="true">
              <lg-button (click)="onBackup()"
                         [style]="'success'">
                  {{ 'backup.make-btn'|translate }}
              </lg-button>

              @if (transferDataService.currenBackupDate) {
                  {{ 'backup.last-label'|translate }} {{ transferDataService.currenBackupDate | timeAgo }}
              }
          </lg-gap-row>


          <lg-upload (filesSelected)="onRestore($event)" [accept]="'.json'">
              <lg-card style="--card-bg:#e78888">
                  <lg-gap-column [position]="'center'">
                      <div class="text-center text-inverse">
                          {{ 'backup.restore-informer'|translate }}
                      </div>

                      <lg-button [style]="'danger'">
                          {{ 'backup.restore-btn'|translate }}
                      </lg-button>
                  </lg-gap-column>
              </lg-card>
          </lg-upload>
      </lg-gap-column>
  `, imports: [
      CardComponent,
      GapRowComponent,
      GapColumnComponent,
      FormsModule,
      TimeAgoPipe,
      ButtonComponent,
      UploadComponent,
      TranslatePipe
    ] }]
  }], () => [], null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(BackupSettingsComponent, { className: "BackupSettingsComponent", filePath: "src/app/features/settings/view/backup/backup-settings.component.ts", lineNumber: 57 });
})();

// src/app/shared/view/ui/form/file-input.component.ts
var _c02 = ["fileInput"];
var _c1 = [[["after"]]];
var _c2 = ["after"];
function FileInputComponent_span_7_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 6);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r2.errorMessage());
  }
}
var FileInputComponent = class _FileInputComponent {
  fileInput;
  accept = input("");
  // image/*, .pdf и т.п.
  multiple = input(false);
  disable = input(false);
  theme = input("default");
  base64Mode = input(false);
  buttonStyle = input("default");
  // стиль lg-button
  buttonText = input("\u0417\u0430\u0433\u0440\u0443\u0437\u0438\u0442\u044C \u0444\u0430\u0439\u043B");
  // текст на кнопке
  fileSizeLimitMb = input(2);
  // Лимит по умолчанию: 2MB
  noAfter = signal(false);
  errorMessage = signal(null);
  writeValue(value) {
  }
  registerOnChange(fn) {
    this.onChange = fn;
  }
  registerOnTouched(fn) {
    this.onTouched = fn;
  }
  async onFileChange(event) {
    const inputEl = event.target;
    const files = inputEl.files;
    if (!files || files.length === 0) {
      this.onChange(null);
      return;
    }
    const overLimitFiles = Array.from(files).filter((file) => file.size > this.fileSizeLimitMb() * 1024 * 1024);
    if (overLimitFiles.length > 0) {
      this.errorMessage.set(`\u0424\u0430\u0439\u043B \u043F\u0440\u0435\u0432\u044B\u0448\u0430\u0435\u0442 ${this.fileSizeLimitMb()}MB`);
      this.onChange(null);
      return;
    } else {
      this.errorMessage.set(null);
    }
    let result;
    if (this.base64Mode()) {
      const base64List = await Promise.all(Array.from(files).map((file) => this.readFileAsBase64(file)));
      result = this.multiple() ? base64List : base64List[0];
    } else {
      result = this.multiple() ? Array.from(files) : files[0];
    }
    this.onChange(result);
    this.onTouched();
  }
  ngAfterViewInit() {
    const after = this.fileInput?.nativeElement.nextElementSibling?.nextElementSibling;
    if (after?.childElementCount === 0) {
      this.noAfter.set(true);
    }
  }
  focus() {
    this.fileInput?.nativeElement.focus();
  }
  onChange = () => {
  };
  onTouched = () => {
  };
  readFileAsBase64(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result);
      reader.onerror = () => reject(reader.error);
      reader.readAsDataURL(file);
    });
  }
  static \u0275fac = function FileInputComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _FileInputComponent)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _FileInputComponent, selectors: [["lg-file-input"]], viewQuery: function FileInputComponent_Query(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275viewQuery(_c02, 7);
    }
    if (rf & 2) {
      let _t;
      \u0275\u0275queryRefresh(_t = \u0275\u0275loadQuery()) && (ctx.fileInput = _t.first);
    }
  }, inputs: { accept: [1, "accept"], multiple: [1, "multiple"], disable: [1, "disable"], theme: [1, "theme"], base64Mode: [1, "base64Mode"], buttonStyle: [1, "buttonStyle"], buttonText: [1, "buttonText"], fileSizeLimitMb: [1, "fileSizeLimitMb"] }, features: [\u0275\u0275ProvidersFeature([{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => _FileInputComponent),
    multi: true
  }])], ngContentSelectors: _c2, decls: 8, vars: 12, consts: [["fileInput", ""], [1, "lg-file-input"], ["type", "file", 1, "hidden-input", 3, "change", "disabled"], ["size", "small", 3, "onClick", "disabled"], [1, "lg-file-input__after"], ["class", "error-message", 4, "ngIf"], [1, "error-message"]], template: function FileInputComponent_Template(rf, ctx) {
    if (rf & 1) {
      const _r1 = \u0275\u0275getCurrentView();
      \u0275\u0275projectionDef(_c1);
      \u0275\u0275elementStart(0, "div", 1)(1, "input", 2, 0);
      \u0275\u0275listener("change", function FileInputComponent_Template_input_change_1_listener($event) {
        \u0275\u0275restoreView(_r1);
        return \u0275\u0275resetView(ctx.onFileChange($event));
      });
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(3, "lg-button", 3);
      \u0275\u0275listener("onClick", function FileInputComponent_Template_lg_button_onClick_3_listener() {
        \u0275\u0275restoreView(_r1);
        const fileInput_r2 = \u0275\u0275reference(2);
        return \u0275\u0275resetView(fileInput_r2.click());
      });
      \u0275\u0275text(4);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(5, "div", 4);
      \u0275\u0275projection(6);
      \u0275\u0275template(7, FileInputComponent_span_7_Template, 2, 1, "span", 5);
      \u0275\u0275elementEnd()();
    }
    if (rf & 2) {
      \u0275\u0275classProp("contrast", ctx.theme() === "contrast");
      \u0275\u0275advance();
      \u0275\u0275property("disabled", ctx.disable());
      \u0275\u0275attribute("accept", ctx.accept())("multiple", ctx.multiple() ? "" : null);
      \u0275\u0275advance(2);
      \u0275\u0275styleMap(ctx.buttonStyle());
      \u0275\u0275property("disabled", ctx.disable());
      \u0275\u0275advance();
      \u0275\u0275textInterpolate1(" ", ctx.buttonText(), " ");
      \u0275\u0275advance();
      \u0275\u0275styleProp("display", ctx.noAfter() && !ctx.errorMessage() ? "none" : "flex");
      \u0275\u0275advance(2);
      \u0275\u0275property("ngIf", ctx.errorMessage());
    }
  }, dependencies: [CommonModule, NgIf, ButtonComponent], styles: ["\n\n[_nghost-%COMP%] {\n  display: flex;\n  flex: 1;\n}\n.lg-file-input[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: row;\n  align-items: center;\n  gap: 16px;\n  flex: 1;\n}\n.lg-file-input__after[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 16px;\n  padding: 0 16px;\n  white-space: nowrap;\n  flex: 0 0 auto;\n}\n.hidden-input[_ngcontent-%COMP%] {\n  display: none;\n}\n.error-message[_ngcontent-%COMP%] {\n  color: #d32f2f;\n  font-size: 13px;\n  white-space: nowrap;\n}\n/*# sourceMappingURL=file-input.component.css.map */"] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(FileInputComponent, [{
    type: Component,
    args: [{ selector: "lg-file-input", standalone: true, imports: [CommonModule, ButtonComponent], template: `
      <div [class.contrast]="theme() === 'contrast'" class="lg-file-input">
          <input #fileInput
                 (change)="onFileChange($event)"
                 [attr.accept]="accept()"
                 [attr.multiple]="multiple() ? '' : null"
                 [disabled]="disable()"
                 class="hidden-input"
                 type="file">

          <lg-button (onClick)="fileInput.click()"
                     [disabled]="disable()"
                     [style]="buttonStyle()"
                     size="small">
              {{ buttonText() }}
          </lg-button>

          <div [style.display]="noAfter() && !errorMessage() ? 'none' : 'flex'" class="lg-file-input__after">
              <ng-content select="after"></ng-content>
              <span *ngIf="errorMessage()" class="error-message">{{ errorMessage() }}</span>
          </div>
      </div>
  `, providers: [{
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => FileInputComponent),
      multi: true
    }], styles: ["/* angular:styles/component:scss;979fcae3008e4ac4099b3be2b8bc473d070148625fee500472447fef7e46b64f;/Users/khripunovpavel/Documents/my/lasagna/lasagna/src/app/shared/view/ui/form/file-input.component.ts */\n:host {\n  display: flex;\n  flex: 1;\n}\n.lg-file-input {\n  display: flex;\n  flex-direction: row;\n  align-items: center;\n  gap: 16px;\n  flex: 1;\n}\n.lg-file-input__after {\n  display: flex;\n  align-items: center;\n  gap: 16px;\n  padding: 0 16px;\n  white-space: nowrap;\n  flex: 0 0 auto;\n}\n.hidden-input {\n  display: none;\n}\n.error-message {\n  color: #d32f2f;\n  font-size: 13px;\n  white-space: nowrap;\n}\n/*# sourceMappingURL=file-input.component.css.map */\n"] }]
  }], null, { fileInput: [{
    type: ViewChild,
    args: ["fileInput", { static: true }]
  }] });
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(FileInputComponent, { className: "FileInputComponent", filePath: "src/app/shared/view/ui/form/file-input.component.ts", lineNumber: 72 });
})();

// src/app/features/settings/view/finance-settings/invoices-settings/invoices-settings.component.ts
function InvoicesSettingsComponent_Conditional_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 3);
    \u0275\u0275element(1, "img", 10);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275property("src", ctx_r0.logoBase64(), \u0275\u0275sanitizeUrl);
  }
}
var InvoicesSettingsComponent = class _InvoicesSettingsComponent {
  _settingsService;
  constructor(_settingsService) {
    this._settingsService = _settingsService;
  }
  prefix;
  form = new FormGroup({
    prefix: new FormControl(null),
    precisionRows: new FormControl(null),
    precisionTotals: new FormControl(null),
    logo: new FormControl(null)
  });
  logoBase64 = signal(null);
  destroyRef = inject(DestroyRef);
  ngAfterViewInit() {
    const precisions = this._settingsService.getInvoicePrecision();
    this.form.patchValue({
      prefix: this._settingsService.getInvoicePrefix(),
      precisionRows: precisions[0] ?? 2,
      precisionTotals: precisions[1] ?? 2
    });
    this.logoBase64.set(this._settingsService.getInvoiceLogo() ?? null);
    this.form.valueChanges.pipe(takeUntilDestroyed(this.destroyRef), debounceTime(500)).subscribe(async (value) => {
      if (value.logo) {
        this.logoBase64.set(await this.resizeAndCropImageToBase64(value.logo));
      }
      this._settingsService.setInvoiceLogo(this.logoBase64());
      this._settingsService.setInvoicePrefix(value.prefix ?? "");
      this._settingsService.setInvoicePrecisions(value.precisionRows ?? 2, value.precisionTotals ?? 2);
      await this._settingsService.saveSettings();
    });
  }
  resizeAndCropImageToBase64(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        const img = new Image();
        img.onload = () => {
          const canvas = document.createElement("canvas");
          const ctx = canvas.getContext("2d");
          canvas.width = 200;
          canvas.height = 200;
          const imgWidth = img.width;
          const imgHeight = img.height;
          const x = (canvas.width - imgWidth) / 2;
          const y = (canvas.height - imgHeight) / 2;
          ctx.drawImage(img, x, y);
          const base64 = canvas.toDataURL("image/png");
          document.body.appendChild(canvas);
          resolve(base64);
        };
        img.onerror = reject;
        img.src = reader.result;
      };
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  }
  static \u0275fac = function InvoicesSettingsComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _InvoicesSettingsComponent)(\u0275\u0275directiveInject(SettingsService));
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _InvoicesSettingsComponent, selectors: [["lg-invoices-settings"]], decls: 22, vars: 11, consts: [[3, "formGroup"], ["size", "medium"], [3, "level"], [1, "lg-invoices-settings__logo"], ["formControlName", "logo", 3, "buttonStyle", "buttonText"], ["formControlName", "prefix"], ["size", "small"], [3, "flat", "level"], ["formControlName", "precisionRows"], ["formControlName", "precisionTotals"], ["alt", "Logo", 3, "src"]], template: function InvoicesSettingsComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "lg-gap-column", 0)(1, "lg-gap-column", 1)(2, "lg-title", 2);
      \u0275\u0275text(3, " Logo ");
      \u0275\u0275elementEnd();
      \u0275\u0275conditionalCreate(4, InvoicesSettingsComponent_Conditional_4_Template, 2, 1, "div", 3);
      \u0275\u0275element(5, "lg-file-input", 4);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(6, "lg-gap-column", 1)(7, "lg-title", 2);
      \u0275\u0275text(8, " Prefix for invoices ");
      \u0275\u0275elementEnd();
      \u0275\u0275element(9, "lg-input", 5);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(10, "lg-gap-column", 1)(11, "lg-title", 2);
      \u0275\u0275text(12, " Precision ");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(13, "lg-gap-row")(14, "lg-gap-column", 6)(15, "lg-title", 7);
      \u0275\u0275text(16, " For rows ");
      \u0275\u0275elementEnd();
      \u0275\u0275element(17, "lg-number-input", 8);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(18, "lg-gap-column", 6)(19, "lg-title", 7);
      \u0275\u0275text(20, " For totals ");
      \u0275\u0275elementEnd();
      \u0275\u0275element(21, "lg-number-input", 9);
      \u0275\u0275elementEnd()()()();
    }
    if (rf & 2) {
      \u0275\u0275property("formGroup", ctx.form);
      \u0275\u0275advance(2);
      \u0275\u0275property("level", 5);
      \u0275\u0275advance(2);
      \u0275\u0275conditional(ctx.logoBase64() ? 4 : -1);
      \u0275\u0275advance();
      \u0275\u0275property("buttonStyle", ctx.logoBase64() ? "danger" : "default")("buttonText", ctx.logoBase64() ? "Replace with new one" : "Upload logo");
      \u0275\u0275advance(2);
      \u0275\u0275property("level", 5);
      \u0275\u0275advance(4);
      \u0275\u0275property("level", 5);
      \u0275\u0275advance(4);
      \u0275\u0275property("flat", true)("level", 6);
      \u0275\u0275advance(4);
      \u0275\u0275property("flat", true)("level", 6);
    }
  }, dependencies: [
    GapColumnComponent,
    InputComponent,
    TitleComponent,
    ReactiveFormsModule,
    NgControlStatus,
    NgControlStatusGroup,
    FormGroupDirective,
    FormControlName,
    GapRowComponent,
    NumberInputComponent,
    FileInputComponent
  ], styles: ["\n\n.lg-invoices-settings__logo[_ngcontent-%COMP%] {\n  width: 100%;\n  max-width: 200px;\n  height: auto;\n  border-radius: 12px;\n  object-fit: cover;\n  background-color: var(--control-bg);\n  padding: 15px;\n}\n.lg-invoices-settings__logo[_ngcontent-%COMP%]   img[_ngcontent-%COMP%] {\n  width: 100%;\n  height: auto;\n}\n/*# sourceMappingURL=invoices-settings.component.css.map */"] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(InvoicesSettingsComponent, [{
    type: Component,
    args: [{ selector: "lg-invoices-settings", standalone: true, template: `
      <lg-gap-column [formGroup]="form">
          <lg-gap-column size="medium">
              <lg-title [level]="5">
                  Logo
              </lg-title>

              @if (logoBase64()) {
                  <div class="lg-invoices-settings__logo">
                      <img [src]="logoBase64()"
                           alt="Logo">
                  </div>
              }

              <lg-file-input [buttonStyle]="logoBase64() ? 'danger' : 'default'"
                             [buttonText]="logoBase64() ? 'Replace with new one' : 'Upload logo'"
                             formControlName="logo"></lg-file-input>
          </lg-gap-column>

          <lg-gap-column size="medium">
              <lg-title [level]="5">
                  Prefix for invoices
              </lg-title>

              <lg-input formControlName="prefix"></lg-input>
          </lg-gap-column>

          <lg-gap-column size="medium">
              <lg-title [level]="5">
                  Precision
              </lg-title>

              <lg-gap-row>
                  <lg-gap-column size="small">
                      <lg-title [flat]="true" [level]="6">
                          For rows
                      </lg-title>
                      <lg-number-input formControlName="precisionRows"></lg-number-input>
                  </lg-gap-column>

                  <lg-gap-column size="small">
                      <lg-title [flat]="true" [level]="6">
                          For totals
                      </lg-title>
                      <lg-number-input formControlName="precisionTotals"></lg-number-input>
                  </lg-gap-column>
              </lg-gap-row>
          </lg-gap-column>
      </lg-gap-column>
  `, imports: [
      GapColumnComponent,
      InputComponent,
      TitleComponent,
      ReactiveFormsModule,
      GapRowComponent,
      NumberInputComponent,
      FileInputComponent
    ], styles: ["/* angular:styles/component:scss;e0d8895451349280e2981e26c8683aa89ea24fd1dd236064a375bce82ab76a62;/Users/khripunovpavel/Documents/my/lasagna/lasagna/src/app/features/settings/view/finance-settings/invoices-settings/invoices-settings.component.ts */\n.lg-invoices-settings__logo {\n  width: 100%;\n  max-width: 200px;\n  height: auto;\n  border-radius: 12px;\n  object-fit: cover;\n  background-color: var(--control-bg);\n  padding: 15px;\n}\n.lg-invoices-settings__logo img {\n  width: 100%;\n  height: auto;\n}\n/*# sourceMappingURL=invoices-settings.component.css.map */\n"] }]
  }], () => [{ type: SettingsService }], null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(InvoicesSettingsComponent, { className: "InvoicesSettingsComponent", filePath: "src/app/features/settings/view/finance-settings/invoices-settings/invoices-settings.component.ts", lineNumber: 94 });
})();

// src/app/features/settings/view/finance-settings/credentials/create-credential.component.ts
var _forTrack02 = ($index, $item) => $item.name + $item.uuid;
function CreateCredentialComponent_For_4_Conditional_16_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "hr", 17);
  }
}
function CreateCredentialComponent_For_4_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "section", 4)(1, "div", 5)(2, "lg-gap-column", 6);
    \u0275\u0275element(3, "lg-input", 7);
    \u0275\u0275elementStart(4, "lg-gap-row", 8)(5, "lg-gap-column", 6);
    \u0275\u0275element(6, "lg-input", 9)(7, "lg-input", 10);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "lg-gap-column", 6);
    \u0275\u0275element(9, "lg-input", 11)(10, "lg-input", 12);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(11, "lg-gap-column", 6);
    \u0275\u0275element(12, "lg-input", 13)(13, "lg-input", 14);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(14, "lg-button", 15);
    \u0275\u0275listener("click", function CreateCredentialComponent_For_4_Template_lg_button_click_14_listener() {
      const \u0275$index_7_r2 = \u0275\u0275restoreView(_r1).$index;
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.deleteRow(\u0275$index_7_r2));
    });
    \u0275\u0275element(15, "mat-icon", 16);
    \u0275\u0275elementEnd()()()()();
    \u0275\u0275conditionalCreate(16, CreateCredentialComponent_For_4_Conditional_16_Template, 1, 0, "hr", 17);
  }
  if (rf & 2) {
    const \u0275$index_7_r2 = ctx.$index;
    const \u0275$count_7_r4 = ctx.$count;
    const ctx_r2 = \u0275\u0275nextContext();
    ctx_r2.form.controls.rows.controls[\u0275$index_7_r2];
    \u0275\u0275property("formGroupName", \u0275$index_7_r2);
    \u0275\u0275advance();
    \u0275\u0275classProp("credentials__row--odd", \u0275$index_7_r2 % 2 !== 0);
    \u0275\u0275advance(2);
    \u0275\u0275property("placeholder", "Private Name");
    \u0275\u0275advance();
    \u0275\u0275property("top", true)("fit", true);
    \u0275\u0275advance(2);
    \u0275\u0275property("placeholder", "Tax ID");
    \u0275\u0275advance();
    \u0275\u0275property("placeholder", "Name");
    \u0275\u0275advance(2);
    \u0275\u0275property("placeholder", "Country");
    \u0275\u0275advance();
    \u0275\u0275property("placeholder", "Address");
    \u0275\u0275advance(2);
    \u0275\u0275property("placeholder", "Phone");
    \u0275\u0275advance();
    \u0275\u0275property("placeholder", "Email");
    \u0275\u0275advance();
    \u0275\u0275styleMap("danger");
    \u0275\u0275property("size", "tiny")("icon", true);
    \u0275\u0275advance(2);
    \u0275\u0275conditional(!(\u0275$index_7_r2 === \u0275$count_7_r4 - 1) ? 16 : -1);
  }
}
function CreateCredentialComponent_Conditional_7_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275text(0, " Save changes ");
  }
}
function CreateCredentialComponent_Conditional_8_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275text(0, " No changes ");
  }
}
var CreateCredentialComponent = class _CreateCredentialComponent {
  _credentialsRepository;
  _notificationService;
  constructor(_credentialsRepository, _notificationService) {
    this._credentialsRepository = _credentialsRepository;
    this._notificationService = _notificationService;
  }
  type = input(CredentialsType.system);
  credentials = signal([]);
  form = new FormGroup({
    rows: new FormArray([
      this._getRowGroup()
    ])
  });
  rowsEffect = effect(() => {
    this._rowsFormArray.clear();
    this.credentials().forEach((row, index) => {
      this._rowsFormArray.push(this._getRowGroup(row));
    });
    this.form.updateValueAndValidity();
    this.form.markAsPristine();
  });
  typeEffect = effect(() => {
    this._credentialsRepository.getAllByType(this.type()).then((credentials) => {
      this.credentials.set(credentials);
    });
  });
  formValues = this.form.valueChanges.pipe(takeUntilDestroyed());
  get _rowsFormArray() {
    return this.form.get("rows");
  }
  deleteRow(index) {
    const credential = this.form.value.rows?.[index]?.uuid;
    this._rowsFormArray.removeAt(index);
    this.credentials.update((current) => {
      return current.filter((_, i) => i !== index);
    });
    this.form.markAsDirty();
    if (credential) {
      this._credentialsRepository.deleteOne(credential);
    }
  }
  addRow() {
    this._rowsFormArray.push(this._getRowGroup());
    const newCredential = new Credential({
      type: this.type()
    });
    this.credentials.update((current) => [...current, newCredential]);
    this.form.markAsDirty();
  }
  async save() {
    try {
      await this._credentialsRepository.updateMany(this._formValueToCredentials());
      this._notificationService.success("Credentials saved successfully");
      this.form.markAsPristine();
    } catch (e) {
      this._notificationService.error(errorHandler(e));
    }
  }
  _formValueToCredentials() {
    return this._rowsFormArray.controls.map((control) => {
      const value = control.value;
      return new Credential({
        name: value.name,
        privateName: value.privateName,
        country: value.country,
        address: value.address,
        taxId: value.taxId,
        phone: value.phone,
        email: value.email,
        type: this.type(),
        uuid: value.uuid
      });
    });
  }
  _getRowGroup(value) {
    return new FormGroup({
      name: new FormControl(value?.name || ""),
      privateName: new FormControl(value?.privateName || ""),
      country: new FormControl(value?.country || ""),
      address: new FormControl(value?.address || ""),
      taxId: new FormControl(value?.taxId || ""),
      phone: new FormControl(value?.phone || ""),
      email: new FormControl(value?.email || ""),
      uuid: new FormControl(value?.uuid || "")
    });
  }
  static \u0275fac = function CreateCredentialComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _CreateCredentialComponent)(\u0275\u0275directiveInject(CredentialsRepository), \u0275\u0275directiveInject(NotificationsService));
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _CreateCredentialComponent, selectors: [["lg-create-credential"]], inputs: { type: [1, "type"] }, decls: 11, vars: 7, consts: [[3, "formGroup"], ["formArrayName", "rows"], ["lgSelfCenter", "", "lgShrink", "", 3, "click", "disabled"], ["lgSelfCenter", "", "lgShrink", "", 3, "click"], [1, "credentials", 3, "formGroupName"], [1, "credentials__row"], ["size", "small"], ["formControlName", "privateName", 3, "placeholder"], [3, "top", "fit"], ["formControlName", "taxId", 3, "placeholder"], ["formControlName", "name", 3, "placeholder"], ["formControlName", "country", 3, "placeholder"], ["formControlName", "address", 3, "placeholder"], ["formControlName", "phone", 3, "placeholder"], ["formControlName", "email", 3, "placeholder"], ["lgShrink", "", 3, "click", "size", "icon"], ["aria-hidden", "false", "aria-label", "Example home icon", "fontIcon", "close"], ["color", "#fafafa", "lgExpand", "", "size", "2"]], template: function CreateCredentialComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "lg-gap-column");
      \u0275\u0275elementContainerStart(1, 0)(2, 1);
      \u0275\u0275repeaterCreate(3, CreateCredentialComponent_For_4_Template, 17, 17, null, null, _forTrack02);
      \u0275\u0275elementContainerEnd()();
      \u0275\u0275elementStart(5, "lg-gap-row")(6, "lg-button", 2);
      \u0275\u0275listener("click", function CreateCredentialComponent_Template_lg_button_click_6_listener() {
        return ctx.save();
      });
      \u0275\u0275conditionalCreate(7, CreateCredentialComponent_Conditional_7_Template, 1, 0)(8, CreateCredentialComponent_Conditional_8_Template, 1, 0);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(9, "lg-button", 3);
      \u0275\u0275listener("click", function CreateCredentialComponent_Template_lg_button_click_9_listener() {
        return ctx.addRow();
      });
      \u0275\u0275text(10, " Add row ");
      \u0275\u0275elementEnd()()();
    }
    if (rf & 2) {
      \u0275\u0275advance();
      \u0275\u0275property("formGroup", ctx.form);
      \u0275\u0275advance(2);
      \u0275\u0275repeater(ctx.credentials());
      \u0275\u0275advance(3);
      \u0275\u0275styleMap("success");
      \u0275\u0275property("disabled", !ctx.form.dirty);
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.form.dirty ? 7 : 8);
      \u0275\u0275advance(2);
      \u0275\u0275styleMap("warning");
    }
  }, dependencies: [
    GapRowComponent,
    FormsModule,
    NgControlStatus,
    NgControlStatusGroup,
    ButtonComponent,
    InputComponent,
    MatIcon,
    ReactiveFormsModule,
    FormGroupDirective,
    FormControlName,
    FormGroupName,
    FormArrayName,
    SelfCenterDirective,
    ShrinkDirective,
    GapColumnComponent,
    ExpandDirective
  ], encapsulation: 2 });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(CreateCredentialComponent, [{
    type: Component,
    args: [{ selector: "lg-create-credential", standalone: true, template: `
      <lg-gap-column>
          <ng-container [formGroup]="form">
              <ng-container formArrayName="rows">
                  @for (row of credentials();track (row.name + row.uuid);let i = $index, odd = $odd,last=$last) {
                      @let tacControl = form.controls.rows.controls[i];
                      <section class="credentials" [formGroupName]="i">
                          <div class="credentials__row"
                               [class.credentials__row--odd]="odd">
                              <lg-gap-column size="small">
                                  <lg-input formControlName="privateName"
                                            [placeholder]="'Private Name'"></lg-input>

                                  <lg-gap-row [top]="true" [fit]="true">

                                      <lg-gap-column size="small">
                                          <lg-input formControlName="taxId"
                                                    [placeholder]="'Tax ID'"></lg-input>

                                          <lg-input formControlName="name"
                                                    [placeholder]="'Name'"></lg-input>

                                      </lg-gap-column>

                                      <lg-gap-column size="small">
                                          <lg-input formControlName="country"
                                                    [placeholder]="'Country'"></lg-input>

                                          <lg-input formControlName="address"
                                                    [placeholder]="'Address'"></lg-input>
                                      </lg-gap-column>

                                      <lg-gap-column size="small">
                                          <lg-input formControlName="phone"
                                                    [placeholder]="'Phone'"></lg-input>

                                          <lg-input formControlName="email"
                                                    [placeholder]="'Email'"></lg-input>
                                      </lg-gap-column>

                                      <lg-button [style]="'danger'"
                                                 lgShrink
                                                 [size]="'tiny'"
                                                 [icon]="true"
                                                 (click)="deleteRow(i)">
                                          <mat-icon aria-hidden="false" aria-label="Example home icon"
                                                    fontIcon="close"></mat-icon>
                                      </lg-button>
                                  </lg-gap-row>
                              </lg-gap-column>
                          </div>
                      </section>

                      @if (!last) {
                          <hr color="#fafafa" lgExpand size="2"/>
                      }
                  }
              </ng-container>
          </ng-container>

          <lg-gap-row>
              <lg-button (click)="save()"
                         [disabled]="!form.dirty"
                         [style]="'success'"
                         lgSelfCenter
                         lgShrink>
                  @if (form.dirty) {
                      Save changes
                  } @else {
                      No changes
                  }
              </lg-button>

              <lg-button (click)="addRow()"
                         [style]="'warning'"
                         lgSelfCenter
                         lgShrink>
                  Add row
              </lg-button>
          </lg-gap-row>
      </lg-gap-column>
  `, imports: [
      GapRowComponent,
      FormsModule,
      ButtonComponent,
      InputComponent,
      MatIcon,
      ReactiveFormsModule,
      SelfCenterDirective,
      ShrinkDirective,
      GapColumnComponent,
      GapColumnComponent,
      ReactiveFormsModule,
      GapRowComponent,
      InputComponent,
      ButtonComponent,
      MatIcon,
      SelfCenterDirective,
      ShrinkDirective,
      ExpandDirective
    ] }]
  }], () => [{ type: CredentialsRepository }, { type: NotificationsService }], null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(CreateCredentialComponent, { className: "CreateCredentialComponent", filePath: "src/app/features/settings/view/finance-settings/credentials/create-credential.component.ts", lineNumber: 134 });
})();

// src/app/features/settings/view/finance-settings/credentials/credential-settings.component.ts
function CredentialSettingsComponent_ng_template_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "lg-create-credential", 3);
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275property("type", ctx_r0.CredentialsType.system);
  }
}
function CredentialSettingsComponent_ng_template_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "lg-create-credential", 3);
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275property("type", ctx_r0.CredentialsType.customer);
  }
}
var CredentialSettingsComponent = class _CredentialSettingsComponent {
  _credentialsRepository;
  _notificationService;
  constructor(_credentialsRepository, _notificationService) {
    this._credentialsRepository = _credentialsRepository;
    this._notificationService = _notificationService;
  }
  CredentialsType = CredentialsType;
  static \u0275fac = function CredentialSettingsComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _CredentialSettingsComponent)(\u0275\u0275directiveInject(CredentialsRepository), \u0275\u0275directiveInject(NotificationsService));
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _CredentialSettingsComponent, selectors: [["lg-credentials-settings"]], decls: 3, vars: 2, consts: [[3, "flat", "silent"], ["alias", "system", "label", "System", "lgTab", ""], ["alias", "customers", "label", "Customer", "lgTab", ""], [3, "type"]], template: function CredentialSettingsComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "lg-tabs", 0);
      \u0275\u0275template(1, CredentialSettingsComponent_ng_template_1_Template, 1, 1, "ng-template", 1)(2, CredentialSettingsComponent_ng_template_2_Template, 1, 1, "ng-template", 2);
      \u0275\u0275elementEnd();
    }
    if (rf & 2) {
      \u0275\u0275property("flat", true)("silent", true);
    }
  }, dependencies: [
    TabsComponent,
    CreateCredentialComponent,
    TabDirective
  ], encapsulation: 2 });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(CredentialSettingsComponent, [{
    type: Component,
    args: [{ selector: "lg-credentials-settings", standalone: true, template: `
      <lg-tabs [flat]="true" [silent]="true">
          <ng-template alias="system" label="System" lgTab>
              <lg-create-credential [type]="CredentialsType.system"></lg-create-credential>
          </ng-template>

          <ng-template alias="customers" label="Customer" lgTab>
              <lg-create-credential [type]="CredentialsType.customer"></lg-create-credential>
          </ng-template>
      </lg-tabs>

  `, imports: [
      TabsComponent,
      CreateCredentialComponent,
      TabDirective
    ] }]
  }], () => [{ type: CredentialsRepository }, { type: NotificationsService }], null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(CredentialSettingsComponent, { className: "CredentialSettingsComponent", filePath: "src/app/features/settings/view/finance-settings/credentials/credential-settings.component.ts", lineNumber: 31 });
})();

// src/app/features/settings/view/settings.component.ts
function SettingsComponent_ng_template_6_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "lg-language-settings");
  }
}
function SettingsComponent_ng_template_8_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "lg-gap-row", 6)(1, "a", 7);
    \u0275\u0275text(2);
    \u0275\u0275pipe(3, "translate");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "a", 8);
    \u0275\u0275text(5);
    \u0275\u0275pipe(6, "translate");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    \u0275\u0275property("mobileMode", true)("top", true);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind1(3, 4, "categories.products.link-label"), " ");
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind1(6, 6, "categories.recipes.link-label"), " ");
  }
}
function SettingsComponent_ng_template_10_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "lg-invoices-settings");
  }
}
function SettingsComponent_ng_template_11_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "lg-credentials-settings");
  }
}
function SettingsComponent_ng_template_12_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "lg-taxes-settings");
  }
}
function SettingsComponent_ng_template_13_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "lg-backup-settings");
  }
}
var SettingsComponent = class _SettingsComponent {
  settingsService;
  constructor(settingsService) {
    this.settingsService = settingsService;
  }
  static \u0275fac = function SettingsComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _SettingsComponent)(\u0275\u0275directiveInject(SettingsService));
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _SettingsComponent, selectors: [["lg-settings"]], decls: 15, vars: 15, consts: [["alias", "language", "lgTab", "", 3, "label"], ["alias", "categoires", "lgTab", "", 3, "label"], ["alias", "invoice", "label", "Invoice settings", "lgTab", ""], ["alias", "credentials", "label", "Credentials", "lgTab", ""], ["alias", "taxes", "label", "Taxes", "lgTab", ""], ["alias", "backup", "lgTab", "", 3, "label"], [3, "mobileMode", "top"], ["lgExpand", "", "routerLink", "/settings/categories/products", "routerLinkActive", "active"], ["lgExpand", "", "routerLink", "/settings/categories/recipes", "routerLinkActive", "active"]], template: function SettingsComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "lg-fade-in")(1, "lg-container")(2, "lg-title");
      \u0275\u0275text(3);
      \u0275\u0275pipe(4, "translate");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(5, "lg-tabs");
      \u0275\u0275template(6, SettingsComponent_ng_template_6_Template, 1, 0, "ng-template", 0);
      \u0275\u0275pipe(7, "translate");
      \u0275\u0275template(8, SettingsComponent_ng_template_8_Template, 7, 8, "ng-template", 1);
      \u0275\u0275pipe(9, "translate");
      \u0275\u0275template(10, SettingsComponent_ng_template_10_Template, 1, 0, "ng-template", 2)(11, SettingsComponent_ng_template_11_Template, 1, 0, "ng-template", 3)(12, SettingsComponent_ng_template_12_Template, 1, 0, "ng-template", 4)(13, SettingsComponent_ng_template_13_Template, 1, 0, "ng-template", 5);
      \u0275\u0275pipe(14, "translate");
      \u0275\u0275elementEnd()()();
    }
    if (rf & 2) {
      \u0275\u0275advance(3);
      \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(4, 7, "settings.title"));
      \u0275\u0275advance(3);
      \u0275\u0275property("label", \u0275\u0275interpolate(\u0275\u0275pipeBind1(7, 9, "language.settings-title")));
      \u0275\u0275advance(2);
      \u0275\u0275property("label", \u0275\u0275interpolate(\u0275\u0275pipeBind1(9, 11, "categories.settings-title")));
      \u0275\u0275advance(5);
      \u0275\u0275property("label", \u0275\u0275interpolate(\u0275\u0275pipeBind1(14, 13, "backup.settings-title")));
    }
  }, dependencies: [
    ContainerComponent,
    GapRowComponent,
    TitleComponent,
    RouterLink,
    RouterLinkActive,
    FadeInComponent,
    ExpandDirective,
    LocalisationSettingsComponent,
    BackupSettingsComponent,
    TranslatePipe,
    TabDirective,
    TabsComponent,
    InvoicesSettingsComponent,
    CredentialSettingsComponent,
    TaxesSettingsComponent
  ], encapsulation: 2 });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(SettingsComponent, [{
    type: Component,
    args: [{ selector: "lg-settings", standalone: true, imports: [
      ContainerComponent,
      GapRowComponent,
      TitleComponent,
      RouterLink,
      RouterLinkActive,
      FadeInComponent,
      ExpandDirective,
      LocalisationSettingsComponent,
      BackupSettingsComponent,
      TranslatePipe,
      TabDirective,
      TabsComponent,
      InvoicesSettingsComponent,
      CredentialSettingsComponent,
      TaxesSettingsComponent
    ], template: `<lg-fade-in>
  <lg-container>
    <lg-title>{{ 'settings.title'|translate }}</lg-title>

    <lg-tabs>
      <ng-template alias="language" label="{{ 'language.settings-title'|translate }}" lgTab>
        <lg-language-settings></lg-language-settings>
      </ng-template>

      <ng-template alias="categoires" label="{{ 'categories.settings-title'|translate }}" lgTab>
        <lg-gap-row [mobileMode]="true" [top]="true">
          <a lgExpand routerLink="/settings/categories/products" routerLinkActive="active">
            {{ 'categories.products.link-label'|translate }}
          </a>

          <a lgExpand routerLink="/settings/categories/recipes" routerLinkActive="active">
            {{ 'categories.recipes.link-label'|translate }}
          </a>
        </lg-gap-row>
      </ng-template>

      <ng-template alias="invoice" label="Invoice settings" lgTab>
        <lg-invoices-settings></lg-invoices-settings>
      </ng-template>

      <ng-template alias="credentials" label="Credentials" lgTab>
        <lg-credentials-settings></lg-credentials-settings>
      </ng-template>

      <ng-template alias="taxes" label="Taxes" lgTab>
        <lg-taxes-settings></lg-taxes-settings>
      </ng-template>

      <ng-template alias="backup" label="{{ 'backup.settings-title'|translate }}" lgTab>
        <lg-backup-settings></lg-backup-settings>
      </ng-template>
    </lg-tabs>
  </lg-container>
</lg-fade-in>

` }]
  }], () => [{ type: SettingsService }], null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(SettingsComponent, { className: "SettingsComponent", filePath: "src/app/features/settings/view/settings.component.ts", lineNumber: 43 });
})();
export {
  SettingsComponent
};
//# sourceMappingURL=chunk-LXD3BXDJ.js.map
