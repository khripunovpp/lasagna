import {
  NumberInputComponent
} from "./chunk-XQOMUKC5.js";
import {
  InputComponent
} from "./chunk-USP6G3VL.js";
import {
  ControlComponent
} from "./chunk-UFGIB7QO.js";
import "./chunk-4ABBJ6BG.js";
import {
  SettingsService
} from "./chunk-MV7X5YHM.js";
import "./chunk-QHJLSFIB.js";
import "./chunk-UG5XPMCB.js";
import "./chunk-IWOUTMKL.js";
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
  takeUntilDestroyed
} from "./chunk-AWZMWU52.js";
import "./chunk-5WJUMO7X.js";
import {
  ButtonComponent
} from "./chunk-MP6JNYP6.js";
import {
  FlexColumnComponent
} from "./chunk-K37ECZYU.js";
import "./chunk-AESGXZO7.js";
import "./chunk-2CTN2MPX.js";
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
import "./chunk-X2X7GTPW.js";
import "./chunk-PZQLIUCM.js";
import {
  Component,
  DestroyRef,
  Input,
  ViewChild,
  debounceTime,
  forwardRef,
  inject,
  input,
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
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵgetCurrentView,
  ɵɵlistener,
  ɵɵloadQuery,
  ɵɵnextContext,
  ɵɵpipe,
  ɵɵpipeBind1,
  ɵɵprojection,
  ɵɵprojectionDef,
  ɵɵproperty,
  ɵɵqueryRefresh,
  ɵɵreference,
  ɵɵresetView,
  ɵɵrestoreView,
  ɵɵsanitizeUrl,
  ɵɵstyleMap,
  ɵɵstyleProp,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1,
  ɵɵviewQuery
} from "./chunk-IYCVPBRB.js";
import "./chunk-46DXP6YY.js";

// src/app/features/controls/form/file-input.component.ts
var _c0 = ["fileInput"];
var _c1 = [[["after"]]];
var _c2 = ["after"];
function FileInputComponent_Conditional_8_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 5);
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
  translateService = inject(TranslateService);
  fileInput;
  accept = input("", ...ngDevMode ? [{ debugName: "accept" }] : []);
  // image/*, .pdf и т.п.
  multiple = input(false, ...ngDevMode ? [{ debugName: "multiple" }] : []);
  disable = input(false, ...ngDevMode ? [{ debugName: "disable" }] : []);
  theme = input("default", ...ngDevMode ? [{ debugName: "theme" }] : []);
  base64Mode = input(false, ...ngDevMode ? [{ debugName: "base64Mode" }] : []);
  buttonStyle = input("default", ...ngDevMode ? [{ debugName: "buttonStyle" }] : []);
  // стиль lg-button
  buttonText = input("file-input.upload-file", ...ngDevMode ? [{ debugName: "buttonText" }] : []);
  // button text translation key
  fileSizeLimitMb = input(2, ...ngDevMode ? [{ debugName: "fileSizeLimitMb" }] : []);
  // Лимит по умолчанию: 2MB
  noAfter = signal(false, ...ngDevMode ? [{ debugName: "noAfter" }] : []);
  errorMessage = signal(null, ...ngDevMode ? [{ debugName: "errorMessage" }] : []);
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
      this.errorMessage.set(this.translateService.instant("errors.file-input.size-exceeded", { limit: this.fileSizeLimitMb() }));
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
      \u0275\u0275viewQuery(_c0, 7);
    }
    if (rf & 2) {
      let _t;
      \u0275\u0275queryRefresh(_t = \u0275\u0275loadQuery()) && (ctx.fileInput = _t.first);
    }
  }, inputs: { accept: [1, "accept"], multiple: [1, "multiple"], disable: [1, "disable"], theme: [1, "theme"], base64Mode: [1, "base64Mode"], buttonStyle: [1, "buttonStyle"], buttonText: [1, "buttonText"], fileSizeLimitMb: [1, "fileSizeLimitMb"] }, features: [\u0275\u0275ProvidersFeature([{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => _FileInputComponent),
    multi: true
  }])], ngContentSelectors: _c2, decls: 9, vars: 15, consts: [["fileInput", ""], [1, "lg-file-input"], ["type", "file", 1, "hidden-input", 3, "change", "disabled"], ["size", "small", 3, "onClick", "disabled", "outlined"], [1, "lg-file-input__after"], [1, "error-message"]], template: function FileInputComponent_Template(rf, ctx) {
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
      \u0275\u0275pipe(5, "translate");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(6, "div", 4);
      \u0275\u0275projection(7);
      \u0275\u0275conditionalCreate(8, FileInputComponent_Conditional_8_Template, 2, 1, "span", 5);
      \u0275\u0275elementEnd()();
    }
    if (rf & 2) {
      \u0275\u0275classProp("contrast", ctx.theme() === "contrast");
      \u0275\u0275advance();
      \u0275\u0275property("disabled", ctx.disable());
      \u0275\u0275attribute("accept", ctx.accept())("multiple", ctx.multiple() ? "" : null);
      \u0275\u0275advance(2);
      \u0275\u0275styleMap(ctx.buttonStyle());
      \u0275\u0275property("disabled", ctx.disable())("outlined", true);
      \u0275\u0275advance();
      \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind1(5, 13, ctx.buttonText()), " ");
      \u0275\u0275advance(2);
      \u0275\u0275styleProp("display", ctx.noAfter() && !ctx.errorMessage() ? "none" : "flex");
      \u0275\u0275advance(2);
      \u0275\u0275conditional(ctx.errorMessage() ? 8 : -1);
    }
  }, dependencies: [ButtonComponent, TranslatePipe], styles: ["\n\n[_nghost-%COMP%] {\n  display: flex;\n  flex: 1;\n}\n.lg-file-input[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: row;\n  align-items: center;\n  gap: 16px;\n  flex: 1;\n}\n.lg-file-input__after[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 16px;\n  padding: 0 16px;\n  white-space: nowrap;\n  flex: 0 0 auto;\n}\n.hidden-input[_ngcontent-%COMP%] {\n  display: none;\n}\n.error-message[_ngcontent-%COMP%] {\n  color: #d32f2f;\n  font-size: 13px;\n  white-space: nowrap;\n}\n/*# sourceMappingURL=file-input.component.css.map */"] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(FileInputComponent, [{
    type: Component,
    args: [{ selector: "lg-file-input", standalone: true, imports: [ButtonComponent, TranslatePipe], template: `
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
          [outlined]="true"
          size="small">
          {{ buttonText() | translate }}
        </lg-button>

        <div [style.display]="noAfter() && !errorMessage() ? 'none' : 'flex'" class="lg-file-input__after">
          <ng-content select="after"></ng-content>
          @if (errorMessage()) {
            <span class="error-message">{{ errorMessage() }}</span>
          }
        </div>
      </div>
      `, providers: [{
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => FileInputComponent),
      multi: true
    }], styles: ["/* angular:styles/component:scss;979fcae3008e4ac4099b3be2b8bc473d070148625fee500472447fef7e46b64f;/Users/khripunovpavel/Documents/my/lasagna/lasagna/src/app/features/controls/form/file-input.component.ts */\n:host {\n  display: flex;\n  flex: 1;\n}\n.lg-file-input {\n  display: flex;\n  flex-direction: row;\n  align-items: center;\n  gap: 16px;\n  flex: 1;\n}\n.lg-file-input__after {\n  display: flex;\n  align-items: center;\n  gap: 16px;\n  padding: 0 16px;\n  white-space: nowrap;\n  flex: 0 0 auto;\n}\n.hidden-input {\n  display: none;\n}\n.error-message {\n  color: #d32f2f;\n  font-size: 13px;\n  white-space: nowrap;\n}\n/*# sourceMappingURL=file-input.component.css.map */\n"] }]
  }], null, { fileInput: [{
    type: ViewChild,
    args: ["fileInput", { static: true }]
  }], accept: [{ type: Input, args: [{ isSignal: true, alias: "accept", required: false }] }], multiple: [{ type: Input, args: [{ isSignal: true, alias: "multiple", required: false }] }], disable: [{ type: Input, args: [{ isSignal: true, alias: "disable", required: false }] }], theme: [{ type: Input, args: [{ isSignal: true, alias: "theme", required: false }] }], base64Mode: [{ type: Input, args: [{ isSignal: true, alias: "base64Mode", required: false }] }], buttonStyle: [{ type: Input, args: [{ isSignal: true, alias: "buttonStyle", required: false }] }], buttonText: [{ type: Input, args: [{ isSignal: true, alias: "buttonText", required: false }] }], fileSizeLimitMb: [{ type: Input, args: [{ isSignal: true, alias: "fileSizeLimitMb", required: false }] }] });
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(FileInputComponent, { className: "FileInputComponent", filePath: "src/app/features/controls/form/file-input.component.ts", lineNumber: 76 });
})();

// src/app/features/settings/view/finance-settings/invoices-settings/invoices-settings.component.ts
function InvoicesSettingsComponent_Conditional_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 2);
    \u0275\u0275element(1, "img", 6);
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
    precision: new FormControl(null),
    logo: new FormControl(null)
  });
  logoBase64 = signal(null, ...ngDevMode ? [{ debugName: "logoBase64" }] : []);
  destroyRef = inject(DestroyRef);
  _window = inject(WINDOW);
  ngAfterViewInit() {
    const precisions = this._settingsService.getInvoicePrecision();
    this.form.patchValue({
      prefix: this._settingsService.getInvoicePrefix(),
      precision: precisions[0] ?? 2
    });
    this.logoBase64.set(this._settingsService.getInvoiceLogo() ?? null);
    this.form.valueChanges.pipe(takeUntilDestroyed(this.destroyRef), debounceTime(500)).subscribe(async (value) => {
      if (value.logo) {
        this.logoBase64.set(await this.resizeAndCropImageToBase64(value.logo));
      }
      this._settingsService.setInvoiceLogo(this.logoBase64());
      this._settingsService.setInvoicePrefix(value.prefix ?? "");
      this._settingsService.setInvoicePrecisions(value.precision ?? 2);
      await this._settingsService.saveSettings();
    });
  }
  resizeAndCropImageToBase64(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        if (!this._window) {
          resolve("");
          return;
        }
        const img = new Image();
        img.onload = () => {
          const canvas = this._window.document.createElement("canvas");
          const ctx = canvas.getContext("2d");
          canvas.width = 200;
          canvas.height = 200;
          const imgWidth = img.width;
          const imgHeight = img.height;
          const x = (canvas.width - imgWidth) / 2;
          const y = (canvas.height - imgHeight) / 2;
          ctx.drawImage(img, x, y);
          const base64 = canvas.toDataURL("image/png");
          this._window.document.body.appendChild(canvas);
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
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _InvoicesSettingsComponent, selectors: [["lg-invoices-settings"]], decls: 13, vars: 17, consts: [["size", "medium", 3, "formGroup"], [3, "label"], [1, "lg-invoices-settings__logo"], ["formControlName", "logo", 3, "buttonStyle", "buttonText"], ["formControlName", "prefix"], ["formControlName", "precision"], ["alt", "Logo", 3, "src"]], template: function InvoicesSettingsComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "lg-flex-column", 0)(1, "lg-control", 1);
      \u0275\u0275pipe(2, "translate");
      \u0275\u0275conditionalCreate(3, InvoicesSettingsComponent_Conditional_3_Template, 2, 1, "div", 2);
      \u0275\u0275element(4, "lg-file-input", 3);
      \u0275\u0275pipe(5, "translate");
      \u0275\u0275pipe(6, "translate");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(7, "lg-control", 1);
      \u0275\u0275pipe(8, "translate");
      \u0275\u0275element(9, "lg-input", 4);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(10, "lg-control", 1);
      \u0275\u0275pipe(11, "translate");
      \u0275\u0275element(12, "lg-number-input", 5);
      \u0275\u0275elementEnd()();
    }
    if (rf & 2) {
      \u0275\u0275property("formGroup", ctx.form);
      \u0275\u0275advance();
      \u0275\u0275property("label", \u0275\u0275pipeBind1(2, 7, "settings.invoices.logo"));
      \u0275\u0275advance(2);
      \u0275\u0275conditional(ctx.logoBase64() ? 3 : -1);
      \u0275\u0275advance();
      \u0275\u0275property("buttonStyle", ctx.logoBase64() ? "danger" : "default")("buttonText", ctx.logoBase64() ? \u0275\u0275pipeBind1(5, 9, "settings.invoices.replace-logo") : \u0275\u0275pipeBind1(6, 11, "settings.invoices.upload-logo"));
      \u0275\u0275advance(3);
      \u0275\u0275property("label", \u0275\u0275pipeBind1(8, 13, "settings.invoices.prefix"));
      \u0275\u0275advance(3);
      \u0275\u0275property("label", \u0275\u0275pipeBind1(11, 15, "settings.invoices.precision"));
    }
  }, dependencies: [
    FlexColumnComponent,
    InputComponent,
    ReactiveFormsModule,
    NgControlStatus,
    NgControlStatusGroup,
    FormGroupDirective,
    FormControlName,
    NumberInputComponent,
    FileInputComponent,
    ControlComponent,
    TranslatePipe
  ], styles: ["\n\n.lg-invoices-settings__logo[_ngcontent-%COMP%] {\n  width: 100%;\n  max-width: 200px;\n  height: auto;\n  border-radius: 12px;\n  object-fit: cover;\n  background-color: var(--control-bg);\n  padding: 15px;\n}\n.lg-invoices-settings__logo[_ngcontent-%COMP%]   img[_ngcontent-%COMP%] {\n  width: 100%;\n  height: auto;\n}\n/*# sourceMappingURL=invoices-settings.component.css.map */"] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(InvoicesSettingsComponent, [{
    type: Component,
    args: [{ selector: "lg-invoices-settings", standalone: true, template: `
    <lg-flex-column [formGroup]="form"
                    size="medium">
      <lg-control [label]=" 'settings.invoices.logo' | translate">
        @if (logoBase64()) {
          <div class="lg-invoices-settings__logo">
            <img [src]="logoBase64()"
                 alt="Logo">
          </div>
        }

        <lg-file-input [buttonStyle]="logoBase64() ? 'danger' : 'default'"
                       [buttonText]="logoBase64() ? ('settings.invoices.replace-logo' | translate) : ('settings.invoices.upload-logo' | translate)"
                       formControlName="logo"></lg-file-input>
      </lg-control>

      <lg-control [label]=" 'settings.invoices.prefix' | translate">
        <lg-input formControlName="prefix"></lg-input>
      </lg-control>

      <lg-control [label]=" 'settings.invoices.precision' | translate">
        <lg-number-input formControlName="precision"></lg-number-input>
      </lg-control>
    </lg-flex-column>
  `, imports: [
      FlexColumnComponent,
      InputComponent,
      ReactiveFormsModule,
      NumberInputComponent,
      FileInputComponent,
      TranslatePipe,
      ControlComponent
    ], styles: ["/* angular:styles/component:scss;e0d8895451349280e2981e26c8683aa89ea24fd1dd236064a375bce82ab76a62;/Users/khripunovpavel/Documents/my/lasagna/lasagna/src/app/features/settings/view/finance-settings/invoices-settings/invoices-settings.component.ts */\n.lg-invoices-settings__logo {\n  width: 100%;\n  max-width: 200px;\n  height: auto;\n  border-radius: 12px;\n  object-fit: cover;\n  background-color: var(--control-bg);\n  padding: 15px;\n}\n.lg-invoices-settings__logo img {\n  width: 100%;\n  height: auto;\n}\n/*# sourceMappingURL=invoices-settings.component.css.map */\n"] }]
  }], () => [{ type: SettingsService }], null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(InvoicesSettingsComponent, { className: "InvoicesSettingsComponent", filePath: "src/app/features/settings/view/finance-settings/invoices-settings/invoices-settings.component.ts", lineNumber: 72 });
})();
export {
  InvoicesSettingsComponent
};
//# sourceMappingURL=chunk-PVVWUORA.js.map
