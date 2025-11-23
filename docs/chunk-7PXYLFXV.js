import {
  CheckboxControlValueAccessor,
  FormsModule,
  NG_VALUE_ACCESSOR,
  NgControlStatus,
  NgModel
} from "./chunk-2S3NUMNU.js";
import {
  NgClass
} from "./chunk-X2X7GTPW.js";
import {
  Component,
  HostListener,
  Input,
  Output,
  ViewEncapsulation,
  forwardRef,
  input,
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
  ɵɵelement,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵlistener,
  ɵɵnamespaceSVG,
  ɵɵnextContext,
  ɵɵprojection,
  ɵɵprojectionDef,
  ɵɵproperty,
  ɵɵsanitizeHtml
} from "./chunk-IYCVPBRB.js";

// src/app/features/controls/form/chckbox.component.ts
var _c0 = ["*"];
function CheckboxComponent_Conditional_4_Conditional_0_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "span", 4);
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275property("innerHTML", ctx_r0.customMark(), \u0275\u0275sanitizeHtml);
  }
}
function CheckboxComponent_Conditional_4_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(0, "svg", 5);
    \u0275\u0275element(1, "path", 6);
    \u0275\u0275elementEnd();
  }
}
function CheckboxComponent_Conditional_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275conditionalCreate(0, CheckboxComponent_Conditional_4_Conditional_0_Template, 1, 1, "span", 4)(1, CheckboxComponent_Conditional_4_Conditional_1_Template, 2, 0, ":svg:svg", 5);
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275conditional(ctx_r0.customMark() ? 0 : 1);
  }
}
var CheckboxComponent = class _CheckboxComponent {
  constructor() {
  }
  value = "";
  modelValue = false;
  name = input("", ...ngDevMode ? [{ debugName: "name" }] : []);
  labelId = input("", ...ngDevMode ? [{ debugName: "labelId" }] : []);
  size = input("default", ...ngDevMode ? [{ debugName: "size" }] : []);
  markOnHover = input(false, ...ngDevMode ? [{ debugName: "markOnHover" }] : []);
  noMark = input(false, ...ngDevMode ? [{ debugName: "noMark" }] : []);
  customMark = input("", ...ngDevMode ? [{ debugName: "customMark" }] : []);
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
    this.modelValue = value;
    this.onChange(this.modelValue);
    this.onCheckboxChanged.emit(this.modelValue);
  }
  static \u0275fac = function CheckboxComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _CheckboxComponent)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _CheckboxComponent, selectors: [["lg-checkbox"]], hostBindings: function CheckboxComponent_HostBindings(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275listener("keydown.enter", function CheckboxComponent_keydown_enter_HostBindingHandler($event) {
        return ctx.onKeydown($event);
      })("keydown.space", function CheckboxComponent_keydown_space_HostBindingHandler($event) {
        return ctx.onKeydown($event);
      });
    }
  }, inputs: { value: "value", name: [1, "name"], labelId: [1, "labelId"], size: [1, "size"], markOnHover: [1, "markOnHover"], noMark: [1, "noMark"], customMark: [1, "customMark"] }, outputs: { onCheckboxChanged: "onCheckboxChanged" }, features: [\u0275\u0275ProvidersFeature([
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => _CheckboxComponent),
      multi: true
    }
  ])], ngContentSelectors: _c0, decls: 6, vars: 8, consts: [["tabindex", "0", 1, "lg-checkbox", 3, "ngClass"], ["type", "checkbox", 1, "checkbox", 3, "ngModelChange", "ngModel"], [1, "lg-checkbox__mark"], [1, "lg-checkbox__mark-inner"], [3, "innerHTML"], ["xmlns", "http://www.w3.org/2000/svg", "width", "24", "height", "24", "viewBox", "0 0 24 24"], ["fill", "currentColor", "d", "M9.5 16.5l-4.25-4.25 1.4-1.4L9.5 13.7l7.35-7.35 1.4 1.4z"]], template: function CheckboxComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275projectionDef();
      \u0275\u0275elementStart(0, "label", 0)(1, "input", 1);
      \u0275\u0275listener("ngModelChange", function CheckboxComponent_Template_input_ngModelChange_1_listener($event) {
        return ctx.onChangeCheckbox($event);
      });
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(2, "span", 2)(3, "span", 3);
      \u0275\u0275conditionalCreate(4, CheckboxComponent_Conditional_4_Template, 2, 1);
      \u0275\u0275elementEnd()();
      \u0275\u0275projection(5);
      \u0275\u0275elementEnd();
    }
    if (rf & 2) {
      \u0275\u0275property("ngClass", ctx.size());
      \u0275\u0275attribute("for", ctx.name() + "-" + ctx.value);
      \u0275\u0275advance();
      \u0275\u0275property("ngModel", ctx.modelValue);
      \u0275\u0275attribute("id", ctx.name() + "-" + ctx.value)("name", ctx.name());
      \u0275\u0275advance();
      \u0275\u0275classProp("lg-checkbox__hoverOnly", ctx.markOnHover());
      \u0275\u0275advance(2);
      \u0275\u0275conditional(!ctx.noMark() ? 4 : -1);
    }
  }, dependencies: [FormsModule, CheckboxControlValueAccessor, NgControlStatus, NgModel, NgClass], styles: ["/* angular:styles/component:scss;f73117871e3a6dbc0309066c2bb05e0fff1dffd8b4914780c5dab3626a41964b;/Users/khripunovpavel/Documents/my/lasagna/lasagna/src/app/features/controls/form/chckbox.component.ts */\n.lg-checkbox {\n  display: flex;\n  align-items: center;\n  border-radius: 12px;\n  gap: 8px;\n}\n.lg-checkbox:focus-within {\n  outline-color: var(--active-color);\n}\n.lg-checkbox__mark {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  width: 51px;\n  height: 51px;\n  border-radius: 12px;\n  background-color: var(--control-bg);\n  opacity: 0.5;\n  cursor: pointer;\n  transition: all 0.2s ease-in-out;\n  border: 1px solid transparent;\n}\n.lg-checkbox__mark-inner {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n}\n.lg-checkbox__hoverOnly {\n  background-color: transparent;\n  border-color: var(--text-color);\n}\n.lg-checkbox__hoverOnly .lg-checkbox__mark-inner {\n  opacity: 0;\n  transition: all 0.2s ease-in-out;\n}\n@media (hover: hover) {\n  .lg-checkbox__mark:hover {\n    opacity: 1;\n  }\n  .lg-checkbox__hoverOnly:hover .lg-checkbox__mark-inner {\n    opacity: 1;\n  }\n}\n.checkbox {\n  display: none;\n}\n.checkbox:checked + .lg-checkbox__mark {\n  background-color: var(--control-bg-selected);\n  opacity: 1;\n  font-weight: 700;\n}\n.checkbox:checked + .lg-checkbox__hoverOnly {\n  border-color: var(--control-bg-selected);\n}\n.checkbox:checked + .lg-checkbox__hoverOnly .lg-checkbox__mark-inner {\n  opacity: 1;\n}\n.lg-checkbox.small .lg-checkbox__mark {\n  width: 16px;\n  height: 16px;\n  border-radius: 6px;\n}\n.lg-checkbox.medium .lg-checkbox__mark {\n  width: 24px;\n  height: 24px;\n  border-radius: 8px;\n}\n/*# sourceMappingURL=chckbox.component.css.map */\n"], encapsulation: 2 });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(CheckboxComponent, [{
    type: Component,
    args: [{ selector: "lg-checkbox", standalone: true, template: `
    <label [attr.for]="name()+'-'+value"
           [ngClass]="size()"
           class="lg-checkbox"
           tabindex="0">
      <input (ngModelChange)="onChangeCheckbox($event)"
             [attr.id]="name()+'-'+value"
             [attr.name]="name()"
             [ngModel]="modelValue"
             class="checkbox"
             type="checkbox"/>
      <span [class.lg-checkbox__hoverOnly]="markOnHover()"
            class="lg-checkbox__mark">
              <span class="lg-checkbox__mark-inner">
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
        useExisting: forwardRef(() => CheckboxComponent),
        multi: true
      }
    ], imports: [
      FormsModule,
      NgClass
    ], styles: ["/* angular:styles/component:scss;f73117871e3a6dbc0309066c2bb05e0fff1dffd8b4914780c5dab3626a41964b;/Users/khripunovpavel/Documents/my/lasagna/lasagna/src/app/features/controls/form/chckbox.component.ts */\n.lg-checkbox {\n  display: flex;\n  align-items: center;\n  border-radius: 12px;\n  gap: 8px;\n}\n.lg-checkbox:focus-within {\n  outline-color: var(--active-color);\n}\n.lg-checkbox__mark {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  width: 51px;\n  height: 51px;\n  border-radius: 12px;\n  background-color: var(--control-bg);\n  opacity: 0.5;\n  cursor: pointer;\n  transition: all 0.2s ease-in-out;\n  border: 1px solid transparent;\n}\n.lg-checkbox__mark-inner {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n}\n.lg-checkbox__hoverOnly {\n  background-color: transparent;\n  border-color: var(--text-color);\n}\n.lg-checkbox__hoverOnly .lg-checkbox__mark-inner {\n  opacity: 0;\n  transition: all 0.2s ease-in-out;\n}\n@media (hover: hover) {\n  .lg-checkbox__mark:hover {\n    opacity: 1;\n  }\n  .lg-checkbox__hoverOnly:hover .lg-checkbox__mark-inner {\n    opacity: 1;\n  }\n}\n.checkbox {\n  display: none;\n}\n.checkbox:checked + .lg-checkbox__mark {\n  background-color: var(--control-bg-selected);\n  opacity: 1;\n  font-weight: 700;\n}\n.checkbox:checked + .lg-checkbox__hoverOnly {\n  border-color: var(--control-bg-selected);\n}\n.checkbox:checked + .lg-checkbox__hoverOnly .lg-checkbox__mark-inner {\n  opacity: 1;\n}\n.lg-checkbox.small .lg-checkbox__mark {\n  width: 16px;\n  height: 16px;\n  border-radius: 6px;\n}\n.lg-checkbox.medium .lg-checkbox__mark {\n  width: 24px;\n  height: 24px;\n  border-radius: 8px;\n}\n/*# sourceMappingURL=chckbox.component.css.map */\n"] }]
  }], () => [], { value: [{
    type: Input
  }], name: [{ type: Input, args: [{ isSignal: true, alias: "name", required: false }] }], labelId: [{ type: Input, args: [{ isSignal: true, alias: "labelId", required: false }] }], size: [{ type: Input, args: [{ isSignal: true, alias: "size", required: false }] }], markOnHover: [{ type: Input, args: [{ isSignal: true, alias: "markOnHover", required: false }] }], noMark: [{ type: Input, args: [{ isSignal: true, alias: "noMark", required: false }] }], customMark: [{ type: Input, args: [{ isSignal: true, alias: "customMark", required: false }] }], onCheckboxChanged: [{ type: Output, args: ["onCheckboxChanged"] }], onKeydown: [{
    type: HostListener,
    args: ["keydown.enter", ["$event"]]
  }, {
    type: HostListener,
    args: ["keydown.space", ["$event"]]
  }] });
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(CheckboxComponent, { className: "CheckboxComponent", filePath: "src/app/features/controls/form/chckbox.component.ts", lineNumber: 138 });
})();

export {
  CheckboxComponent
};
//# sourceMappingURL=chunk-7PXYLFXV.js.map
