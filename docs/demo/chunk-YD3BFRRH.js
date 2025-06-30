import {
  FormsModule,
  NG_VALUE_ACCESSOR
} from "./chunk-EH6A44OR.js";
import {
  Component,
  ViewChild,
  input,
  setClassMetadata,
  ɵsetClassDebugInfo,
  ɵɵProvidersFeature,
  ɵɵattribute,
  ɵɵdefineComponent,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵgetCurrentView,
  ɵɵlistener,
  ɵɵloadQuery,
  ɵɵproperty,
  ɵɵqueryRefresh,
  ɵɵresetView,
  ɵɵrestoreView,
  ɵɵviewQuery
} from "./chunk-6AETQSBA.js";

// src/app/shared/view/ui/form/textarea.component.ts
var _c0 = ["input"];
var TextareaComponent = class _TextareaComponent {
  constructor() {
  }
  rows = input(5);
  input;
  value = "";
  placeholder = input("Enter text here");
  readOnly = input(false);
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
  }, inputs: { rows: [1, "rows"], placeholder: [1, "placeholder"], readOnly: [1, "readOnly"] }, features: [\u0275\u0275ProvidersFeature([
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: _TextareaComponent,
      multi: true
    }
  ])], decls: 2, vars: 4, consts: [["input", ""], [1, "textarea", 3, "input", "placeholder", "value", "readOnly"]], template: function TextareaComponent_Template(rf, ctx) {
    if (rf & 1) {
      const _r1 = \u0275\u0275getCurrentView();
      \u0275\u0275elementStart(0, "textarea", 1, 0);
      \u0275\u0275listener("input", function TextareaComponent_Template_textarea_input_0_listener($event) {
        \u0275\u0275restoreView(_r1);
        return \u0275\u0275resetView(ctx.onChangeInput($event));
      });
      \u0275\u0275elementEnd();
    }
    if (rf & 2) {
      \u0275\u0275property("placeholder", ctx.placeholder())("value", ctx.value)("readOnly", ctx.readOnly());
      \u0275\u0275attribute("rows", ctx.rows());
    }
  }, dependencies: [FormsModule], styles: ["\n\n[_nghost-%COMP%] {\n  display: flex;\n  flex: 1;\n}\n.textarea[_ngcontent-%COMP%] {\n  flex: 1;\n  border: none;\n  border-radius: 12px;\n  padding: 16px;\n  background-color: var(--control-bg);\n  font-family: inherit;\n  font-size: inherit;\n}\n.textarea[_ngcontent-%COMP%]::placeholder {\n  color: var(--placeholder);\n}\n.textarea[_ngcontent-%COMP%]:focus {\n  outline: none;\n  box-shadow: var(--focus-shadow);\n}\n/*# sourceMappingURL=textarea.component.css.map */"] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(TextareaComponent, [{
    type: Component,
    args: [{ selector: "lg-textarea", standalone: true, template: `
      <textarea #input
                (input)="onChangeInput($event)"
                [attr.rows]="rows()"
                [placeholder]="placeholder()"
                [value]="value"
                [readOnly]="readOnly()"
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
    ], styles: ["/* angular:styles/component:scss;febf2530c98d949be4d027b53d6b0b9c7bb4e9e902852b190d794c7a11f08f49;/Users/khripunovpavel/Documents/my/lasagna/lasagna/src/app/shared/view/ui/form/textarea.component.ts */\n:host {\n  display: flex;\n  flex: 1;\n}\n.textarea {\n  flex: 1;\n  border: none;\n  border-radius: 12px;\n  padding: 16px;\n  background-color: var(--control-bg);\n  font-family: inherit;\n  font-size: inherit;\n}\n.textarea::placeholder {\n  color: var(--placeholder);\n}\n.textarea:focus {\n  outline: none;\n  box-shadow: var(--focus-shadow);\n}\n/*# sourceMappingURL=textarea.component.css.map */\n"] }]
  }], () => [], { input: [{
    type: ViewChild,
    args: ["input", { static: true }]
  }] });
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(TextareaComponent, { className: "TextareaComponent", filePath: "src/app/shared/view/ui/form/textarea.component.ts", lineNumber: 57 });
})();

export {
  TextareaComponent
};
//# sourceMappingURL=chunk-YD3BFRRH.js.map
