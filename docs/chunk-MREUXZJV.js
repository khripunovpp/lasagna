import {
  FormsModule,
  NG_VALUE_ACCESSOR
} from "./chunk-4GKKNB6P.js";
import {
  Component,
  ViewChild,
  input,
  setClassMetadata,
  ɵsetClassDebugInfo,
  ɵɵProvidersFeature,
  ɵɵattribute,
  ɵɵclassProp,
  ɵɵdefineComponent,
  ɵɵdomElementEnd,
  ɵɵdomElementStart,
  ɵɵdomListener,
  ɵɵdomProperty,
  ɵɵgetCurrentView,
  ɵɵloadQuery,
  ɵɵqueryRefresh,
  ɵɵresetView,
  ɵɵrestoreView,
  ɵɵviewQuery
} from "./chunk-Z5TNFCCP.js";

// src/app/features/controls/form/textarea.component.ts
var _c0 = ["input"];
var TextareaComponent = class _TextareaComponent {
  constructor() {
  }
  rows = input(5, ...ngDevMode ? [{ debugName: "rows" }] : []);
  input;
  value = "";
  placeholder = input("Enter text here", ...ngDevMode ? [{ debugName: "placeholder" }] : []);
  readOnly = input(false, ...ngDevMode ? [{ debugName: "readOnly" }] : []);
  maxlength = input(null, ...ngDevMode ? [{ debugName: "maxlength" }] : []);
  onChange = () => {
  };
  onTouched = () => {
  };
  writeValue(value) {
    this.changeValue(value);
  }
  registerOnChange(fn) {
    this.onChange = fn;
  }
  focus() {
    this.input?.nativeElement.focus();
  }
  registerOnTouched(fn) {
    this.onTouched = fn;
  }
  changeValue(value) {
    this.value = String(value || "").trim();
    this.onChange(this.value);
  }
  onChangeInput(event) {
    this.changeValue(event.target.value);
  }
  static \u0275fac = function TextareaComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _TextareaComponent)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _TextareaComponent, selectors: [["lg-textarea"]], viewQuery: function TextareaComponent_Query(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275viewQuery(_c0, 7);
    }
    if (rf & 2) {
      let _t;
      \u0275\u0275queryRefresh(_t = \u0275\u0275loadQuery()) && (ctx.input = _t.first);
    }
  }, hostVars: 2, hostBindings: function TextareaComponent_HostBindings(rf, ctx) {
    if (rf & 2) {
      \u0275\u0275classProp("readonly", ctx.readOnly());
    }
  }, inputs: { rows: [1, "rows"], placeholder: [1, "placeholder"], readOnly: [1, "readOnly"], maxlength: [1, "maxlength"] }, features: [\u0275\u0275ProvidersFeature([
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: _TextareaComponent,
      multi: true
    }
  ])], decls: 2, vars: 5, consts: [["input", ""], [1, "textarea", 3, "input", "placeholder", "readonly", "value"]], template: function TextareaComponent_Template(rf, ctx) {
    if (rf & 1) {
      const _r1 = \u0275\u0275getCurrentView();
      \u0275\u0275domElementStart(0, "textarea", 1, 0);
      \u0275\u0275domListener("input", function TextareaComponent_Template_textarea_input_0_listener($event) {
        \u0275\u0275restoreView(_r1);
        return \u0275\u0275resetView(ctx.onChangeInput($event));
      });
      \u0275\u0275domElementEnd();
    }
    if (rf & 2) {
      \u0275\u0275domProperty("placeholder", ctx.placeholder())("readOnly", ctx.readOnly())("value", ctx.value);
      \u0275\u0275attribute("rows", ctx.rows())("maxlength", ctx.maxlength() || null);
    }
  }, dependencies: [FormsModule], styles: ['\n\n[_nghost-%COMP%] {\n  display: flex;\n  flex: 1;\n  position: relative;\n  opacity: 0.99;\n}\n.textarea[_ngcontent-%COMP%] {\n  flex: 1;\n  border: none;\n  border-radius: 12px;\n  padding: 16px;\n  background-color: var(--control-bg);\n  font-family: inherit;\n  font-size: inherit;\n}\n.textarea[_ngcontent-%COMP%]::placeholder {\n  color: var(--placeholder);\n}\n.textarea[_ngcontent-%COMP%]:focus {\n  outline: none;\n  box-shadow: var(--focus-shadow);\n}\n.textarea[readonly][_ngcontent-%COMP%] {\n  background-color: transparent;\n  border: 1px solid var(--control-bg);\n}\n.readonly[_nghost-%COMP%]::after {\n  content: "";\n  position: absolute;\n  z-index: -1;\n  top: 0;\n  left: 0;\n  width: 100%;\n  height: 100%;\n  background-color: var(--control-bg);\n  border-radius: 12px;\n  opacity: 0.4;\n}\n/*# sourceMappingURL=textarea.component.css.map */'] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(TextareaComponent, [{
    type: Component,
    args: [{ selector: "lg-textarea", host: {
      "[class.readonly]": "readOnly()"
    }, template: `
    <textarea #input
              (input)="onChangeInput($event)"
              [attr.rows]="rows()"
              [attr.maxlength]="maxlength() || null"
              [placeholder]="placeholder()"
              [readonly]="readOnly()"
              [value]="value"
              class="textarea"
    ></textarea>
  `, imports: [
      FormsModule
    ], providers: [
      {
        provide: NG_VALUE_ACCESSOR,
        useExisting: TextareaComponent,
        multi: true
      }
    ], styles: ['/* angular:styles/component:scss;e4b9bc583e6b5e04e295ad877631fd8ba721364e90956f22f3e7e04d1e6f4738;/Users/khripunovpavel/Documents/my/lasagna/lasagna/src/app/features/controls/form/textarea.component.ts */\n:host {\n  display: flex;\n  flex: 1;\n  position: relative;\n  opacity: 0.99;\n}\n.textarea {\n  flex: 1;\n  border: none;\n  border-radius: 12px;\n  padding: 16px;\n  background-color: var(--control-bg);\n  font-family: inherit;\n  font-size: inherit;\n}\n.textarea::placeholder {\n  color: var(--placeholder);\n}\n.textarea:focus {\n  outline: none;\n  box-shadow: var(--focus-shadow);\n}\n.textarea[readonly] {\n  background-color: transparent;\n  border: 1px solid var(--control-bg);\n}\n:host.readonly::after {\n  content: "";\n  position: absolute;\n  z-index: -1;\n  top: 0;\n  left: 0;\n  width: 100%;\n  height: 100%;\n  background-color: var(--control-bg);\n  border-radius: 12px;\n  opacity: 0.4;\n}\n/*# sourceMappingURL=textarea.component.css.map */\n'] }]
  }], () => [], { input: [{
    type: ViewChild,
    args: ["input", { static: true }]
  }] });
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(TextareaComponent, { className: "TextareaComponent", filePath: "src/app/features/controls/form/textarea.component.ts", lineNumber: 80 });
})();

export {
  TextareaComponent
};
//# sourceMappingURL=chunk-MREUXZJV.js.map
