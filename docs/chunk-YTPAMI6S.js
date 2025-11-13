import {
  FormsModule,
  NG_VALUE_ACCESSOR
} from "./chunk-RTCNHMN6.js";
import {
  TranslatePipe,
  TranslateService
} from "./chunk-DXRFKXPR.js";
import {
  Component,
  Input,
  ViewChild,
  forwardRef,
  input,
  setClassMetadata,
  signal,
  ɵsetClassDebugInfo,
  ɵɵProvidersFeature,
  ɵɵadvance,
  ɵɵdefineComponent,
  ɵɵdirectiveInject,
  ɵɵdomElement,
  ɵɵdomElementEnd,
  ɵɵdomElementStart,
  ɵɵdomProperty,
  ɵɵloadQuery,
  ɵɵpipe,
  ɵɵpipeBind1,
  ɵɵprojection,
  ɵɵprojectionDef,
  ɵɵqueryRefresh,
  ɵɵstyleProp,
  ɵɵviewQuery
} from "./chunk-RQATVJ2P.js";

// src/app/features/controls/form/readonly-control.component.ts
var _c0 = ["input"];
var _c1 = [[["after"]]];
var _c2 = ["after"];
var ReadonlyControlComponent = class _ReadonlyControlComponent {
  translate;
  constructor(translate) {
    this.translate = translate;
  }
  input;
  value = "";
  placeholder = input("Enter text here", ...ngDevMode ? [{ debugName: "placeholder" }] : []);
  noAfter = signal(false, ...ngDevMode ? [{ debugName: "noAfter" }] : []);
  focus() {
    this.input?.nativeElement.focus();
  }
  onChange = () => {
  };
  onTouched = () => {
  };
  writeValue(value) {
    this.value = value;
  }
  registerOnChange(fn) {
    this.onChange = fn;
  }
  registerOnTouched(fn) {
    this.onTouched = fn;
  }
  ngAfterViewInit() {
    const after = this.input?.nativeElement.nextElementSibling;
    if (after?.childElementCount === 0) {
      this.noAfter.set(true);
    }
  }
  static \u0275fac = function ReadonlyControlComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _ReadonlyControlComponent)(\u0275\u0275directiveInject(TranslateService));
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _ReadonlyControlComponent, selectors: [["lg-readonly-control"]], viewQuery: function ReadonlyControlComponent_Query(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275viewQuery(_c0, 7);
    }
    if (rf & 2) {
      let _t;
      \u0275\u0275queryRefresh(_t = \u0275\u0275loadQuery()) && (ctx.input = _t.first);
    }
  }, inputs: { value: "value", placeholder: [1, "placeholder"] }, features: [\u0275\u0275ProvidersFeature([
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => _ReadonlyControlComponent),
      multi: true
    }
  ])], ngContentSelectors: _c2, decls: 6, vars: 8, consts: [["input", ""], [1, "lg-readonly-control"], ["type", "text", 1, "input", 3, "disabled", "placeholder", "readonly", "value"], [1, "lg-readonly-control__after"]], template: function ReadonlyControlComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275projectionDef(_c1);
      \u0275\u0275domElementStart(0, "div", 1);
      \u0275\u0275domElement(1, "input", 2, 0);
      \u0275\u0275pipe(3, "translate");
      \u0275\u0275domElementStart(4, "div", 3);
      \u0275\u0275projection(5);
      \u0275\u0275domElementEnd()();
    }
    if (rf & 2) {
      \u0275\u0275advance();
      \u0275\u0275domProperty("disabled", true)("placeholder", \u0275\u0275pipeBind1(3, 6, ctx.placeholder()))("readOnly", true)("value", ctx.value);
      \u0275\u0275advance(3);
      \u0275\u0275styleProp("display", ctx.noAfter() ? "none" : "flex");
    }
  }, dependencies: [
    FormsModule,
    TranslatePipe
  ], styles: ['\n\n[_nghost-%COMP%] {\n  display: flex;\n  -webkit-user-select: none;\n  user-select: none;\n  pointer-events: none;\n  width: 100%;\n}\n.lg-readonly-control[_ngcontent-%COMP%] {\n  width: 100%;\n  display: flex;\n  border-radius: 12px;\n  gap: 16px;\n  position: relative;\n  opacity: 0.99;\n  border: 1px solid var(--control-bg);\n}\n.lg-readonly-control[_ngcontent-%COMP%]::after {\n  content: "";\n  position: absolute;\n  z-index: -1;\n  top: 0;\n  left: 0;\n  width: 100%;\n  height: 100%;\n  background-color: var(--control-bg);\n  border-radius: 12px;\n  opacity: 0.4;\n}\n.lg-readonly-control__after[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 16px;\n  padding: 0 16px;\n  white-space: nowrap;\n  flex: 0 0 auto;\n}\n.input[_ngcontent-%COMP%] {\n  border: none;\n  padding: 15px;\n  border-radius: 12px;\n  font-family: inherit;\n  font-size: inherit;\n  background-color: transparent;\n  width: 100%;\n  pointer-events: none;\n  -webkit-user-select: none;\n  user-select: none;\n}\n.input[_ngcontent-%COMP%]::placeholder {\n  color: var(--placeholder);\n}\n.input[_ngcontent-%COMP%]:focus {\n  outline: none;\n  box-shadow: var(--focus-shadow);\n}\n/*# sourceMappingURL=readonly-control.component.css.map */'] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(ReadonlyControlComponent, [{
    type: Component,
    args: [{ selector: "lg-readonly-control", standalone: true, template: `
    <div class="lg-readonly-control">
      <input #input
             [disabled]="true"
             [placeholder]="placeholder() | translate"
             [readonly]="true"
             [value]="value"
             class="input"
             type="text">

      <div [style.display]="noAfter() ? 'none' : 'flex'"
           class="lg-readonly-control__after">
        <ng-content select="after"></ng-content>
      </div>
    </div>
  `, imports: [
      FormsModule,
      TranslatePipe
    ], providers: [
      {
        provide: NG_VALUE_ACCESSOR,
        useExisting: forwardRef(() => ReadonlyControlComponent),
        multi: true
      }
    ], styles: ['/* angular:styles/component:scss;51ce882add8e9517e844d631d4b21099718db4d36e23eed664c964f577c021a9;/Users/khripunovpavel/Documents/my/lasagna/lasagna/src/app/features/controls/form/readonly-control.component.ts */\n:host {\n  display: flex;\n  -webkit-user-select: none;\n  user-select: none;\n  pointer-events: none;\n  width: 100%;\n}\n.lg-readonly-control {\n  width: 100%;\n  display: flex;\n  border-radius: 12px;\n  gap: 16px;\n  position: relative;\n  opacity: 0.99;\n  border: 1px solid var(--control-bg);\n}\n.lg-readonly-control::after {\n  content: "";\n  position: absolute;\n  z-index: -1;\n  top: 0;\n  left: 0;\n  width: 100%;\n  height: 100%;\n  background-color: var(--control-bg);\n  border-radius: 12px;\n  opacity: 0.4;\n}\n.lg-readonly-control__after {\n  display: flex;\n  align-items: center;\n  gap: 16px;\n  padding: 0 16px;\n  white-space: nowrap;\n  flex: 0 0 auto;\n}\n.input {\n  border: none;\n  padding: 15px;\n  border-radius: 12px;\n  font-family: inherit;\n  font-size: inherit;\n  background-color: transparent;\n  width: 100%;\n  pointer-events: none;\n  -webkit-user-select: none;\n  user-select: none;\n}\n.input::placeholder {\n  color: var(--placeholder);\n}\n.input:focus {\n  outline: none;\n  box-shadow: var(--focus-shadow);\n}\n/*# sourceMappingURL=readonly-control.component.css.map */\n'] }]
  }], () => [{ type: TranslateService }], { input: [{
    type: ViewChild,
    args: ["input", { static: true }]
  }], value: [{
    type: Input
  }] });
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(ReadonlyControlComponent, { className: "ReadonlyControlComponent", filePath: "src/app/features/controls/form/readonly-control.component.ts", lineNumber: 100 });
})();

export {
  ReadonlyControlComponent
};
//# sourceMappingURL=chunk-YTPAMI6S.js.map
