import {
  ControlExtraTemplateDirective
} from "./chunk-222CPMRQ.js";
import {
  FormsModule,
  NG_VALUE_ACCESSOR
} from "./chunk-FGMQFOLX.js";
import {
  NgTemplateOutlet
} from "./chunk-76JI64DZ.js";
import {
  Component,
  HostBinding,
  ViewChild,
  computed,
  contentChildren,
  forwardRef,
  input,
  output,
  setClassMetadata,
  signal,
  ɵsetClassDebugInfo,
  ɵɵProvidersFeature,
  ɵɵadvance,
  ɵɵclassProp,
  ɵɵconditional,
  ɵɵconditionalCreate,
  ɵɵcontentQuerySignal,
  ɵɵdefineComponent,
  ɵɵelementContainer,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵgetCurrentView,
  ɵɵlistener,
  ɵɵloadQuery,
  ɵɵnextContext,
  ɵɵproperty,
  ɵɵqueryAdvance,
  ɵɵqueryRefresh,
  ɵɵresetView,
  ɵɵrestoreView,
  ɵɵtemplate,
  ɵɵviewQuery
} from "./chunk-UQVCVPTQ.js";

// src/app/features/controls/form/input.component.ts
var _c0 = ["input"];
function InputComponent_Conditional_1_ng_container_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementContainer(0);
  }
}
function InputComponent_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 2);
    \u0275\u0275template(1, InputComponent_Conditional_1_ng_container_1_Template, 1, 0, "ng-container", 5);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275property("ngTemplateOutlet", ctx_r1.beforeExtraTpl().templateRef);
  }
}
function InputComponent_Conditional_4_ng_container_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementContainer(0);
  }
}
function InputComponent_Conditional_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 4);
    \u0275\u0275template(1, InputComponent_Conditional_4_ng_container_1_Template, 1, 0, "ng-container", 5);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275property("ngTemplateOutlet", ctx_r1.afterExtraTpl().templateRef);
  }
}
var InputComponent = class _InputComponent {
  constructor() {
  }
  input;
  value = "";
  focused = signal(false);
  placeholder = input("Enter text here");
  autoFocus = input(false);
  disable = input(false);
  onInputChanged = output();
  onEnter = output();
  theme = input("default");
  noAfter = signal(false);
  extraTpl = contentChildren(ControlExtraTemplateDirective, { descendants: true });
  afterExtraTpl = computed(() => {
    return this.extraTpl().find((tpl) => tpl.place() === "after");
  });
  beforeExtraTpl = computed(() => {
    return this.extraTpl().find((tpl) => tpl.place() === "before");
  });
  get focusedClass() {
    return this.focused();
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
  onChangeInput(event) {
    this._change(event.target.value);
  }
  focus() {
    this.input?.nativeElement.focus();
  }
  ngAfterViewInit() {
    if (this.autoFocus()) {
      this.focus();
    }
  }
  _change(value) {
    this.value = String(value || "").trim();
    this.onChange(this.value);
  }
  static \u0275fac = function InputComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _InputComponent)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _InputComponent, selectors: [["lg-input"]], contentQueries: function InputComponent_ContentQueries(rf, ctx, dirIndex) {
    if (rf & 1) {
      \u0275\u0275contentQuerySignal(dirIndex, ctx.extraTpl, ControlExtraTemplateDirective, 5);
    }
    if (rf & 2) {
      \u0275\u0275queryAdvance();
    }
  }, viewQuery: function InputComponent_Query(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275viewQuery(_c0, 7);
    }
    if (rf & 2) {
      let _t;
      \u0275\u0275queryRefresh(_t = \u0275\u0275loadQuery()) && (ctx.input = _t.first);
    }
  }, hostVars: 2, hostBindings: function InputComponent_HostBindings(rf, ctx) {
    if (rf & 2) {
      \u0275\u0275classProp("focused", ctx.focusedClass);
    }
  }, inputs: { placeholder: [1, "placeholder"], autoFocus: [1, "autoFocus"], disable: [1, "disable"], theme: [1, "theme"] }, outputs: { onInputChanged: "onInputChanged", onEnter: "onEnter" }, features: [\u0275\u0275ProvidersFeature([
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => _InputComponent),
      multi: true
    }
  ])], decls: 5, vars: 7, consts: [["input", ""], [1, "lg-input"], [1, "lg-input__before"], ["type", "text", 1, "input", 3, "blur", "change", "focus", "input", "keydown.enter", "disabled", "placeholder", "value"], [1, "lg-input__after"], [4, "ngTemplateOutlet"]], template: function InputComponent_Template(rf, ctx) {
    if (rf & 1) {
      const _r1 = \u0275\u0275getCurrentView();
      \u0275\u0275elementStart(0, "div", 1);
      \u0275\u0275conditionalCreate(1, InputComponent_Conditional_1_Template, 2, 1, "div", 2);
      \u0275\u0275elementStart(2, "input", 3, 0);
      \u0275\u0275listener("blur", function InputComponent_Template_input_blur_2_listener() {
        \u0275\u0275restoreView(_r1);
        return \u0275\u0275resetView(ctx.focused.set(false));
      })("change", function InputComponent_Template_input_change_2_listener() {
        \u0275\u0275restoreView(_r1);
        return \u0275\u0275resetView(ctx.onInputChanged.emit(ctx.value));
      })("focus", function InputComponent_Template_input_focus_2_listener() {
        \u0275\u0275restoreView(_r1);
        return \u0275\u0275resetView(ctx.focused.set(true));
      })("input", function InputComponent_Template_input_input_2_listener($event) {
        \u0275\u0275restoreView(_r1);
        return \u0275\u0275resetView(ctx.onChangeInput($event));
      })("keydown.enter", function InputComponent_Template_input_keydown_enter_2_listener() {
        \u0275\u0275restoreView(_r1);
        return \u0275\u0275resetView(ctx.onEnter.emit(ctx.value));
      });
      \u0275\u0275elementEnd();
      \u0275\u0275conditionalCreate(4, InputComponent_Conditional_4_Template, 2, 1, "div", 4);
      \u0275\u0275elementEnd();
    }
    if (rf & 2) {
      let tmp_2_0;
      let tmp_6_0;
      \u0275\u0275classProp("contrast", ctx.theme() === "contrast");
      \u0275\u0275advance();
      \u0275\u0275conditional(((tmp_2_0 = ctx.beforeExtraTpl()) == null ? null : tmp_2_0.templateRef) ? 1 : -1);
      \u0275\u0275advance();
      \u0275\u0275property("disabled", ctx.disable())("placeholder", ctx.placeholder())("value", ctx.value);
      \u0275\u0275advance(2);
      \u0275\u0275conditional(((tmp_6_0 = ctx.afterExtraTpl()) == null ? null : tmp_6_0.templateRef) ? 4 : -1);
    }
  }, dependencies: [
    FormsModule,
    NgTemplateOutlet
  ], styles: ["\n\n[_nghost-%COMP%] {\n  display: flex;\n  flex: 1;\n}\n.focused[_nghost-%COMP%] {\n  box-shadow: var(--focus-shadow);\n  border-radius: 12px;\n}\n.lg-input[_ngcontent-%COMP%] {\n  display: flex;\n  flex: 1;\n  background-color: var(--control-bg);\n  border-radius: 12px;\n  gap: 16px;\n}\n.lg-input__after[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 16px;\n  padding: 0 16px;\n  white-space: nowrap;\n  flex: 0 0 auto;\n}\n.lg-input__before[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 16px;\n  padding: 0 16px;\n  white-space: nowrap;\n  flex: 0 0 auto;\n}\n.input[_ngcontent-%COMP%] {\n  flex: 1;\n  border: none;\n  padding: 16px;\n  border-radius: 12px;\n  font-family: inherit;\n  font-size: inherit;\n  background-color: transparent;\n  width: 100%;\n}\n.input[_ngcontent-%COMP%]::placeholder {\n  color: var(--placeholder);\n}\n.input[_ngcontent-%COMP%]:focus {\n  outline: none;\n}\n/*# sourceMappingURL=input.component.css.map */"] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(InputComponent, [{
    type: Component,
    args: [{ selector: "lg-input", standalone: true, template: `
      <div [class.contrast]="theme() === 'contrast'"
           class="lg-input">
          @if (beforeExtraTpl()?.templateRef) {
              <div class="lg-input__before">
                  <ng-container *ngTemplateOutlet="beforeExtraTpl()!.templateRef"></ng-container>
              </div>
          }
          <input #input
                 (blur)="focused.set(false)"
                 (change)="onInputChanged.emit(value)"
                 (focus)="focused.set(true)"
                 (input)="onChangeInput($event)"
                 (keydown.enter)="onEnter.emit(value)"
                 [disabled]="disable()"
                 [placeholder]="placeholder()"
                 [value]="value"
                 class="input"
                 type="text">

          @if (afterExtraTpl()?.templateRef) {
              <div class="lg-input__after">
                  <ng-container *ngTemplateOutlet="afterExtraTpl()!.templateRef"></ng-container>
              </div>
          }
      </div>
  `, imports: [
      FormsModule,
      NgTemplateOutlet
    ], providers: [
      {
        provide: NG_VALUE_ACCESSOR,
        useExisting: forwardRef(() => InputComponent),
        multi: true
      }
    ], styles: ["/* angular:styles/component:scss;4b961b3a35db017c9965fb09656c2e44fc4b38273166670ddd9aba46569f9a0b;/Users/khripunovpavel/Documents/my/lasagna/lasagna/src/app/features/controls/form/input.component.ts */\n:host {\n  display: flex;\n  flex: 1;\n}\n:host.focused {\n  box-shadow: var(--focus-shadow);\n  border-radius: 12px;\n}\n.lg-input {\n  display: flex;\n  flex: 1;\n  background-color: var(--control-bg);\n  border-radius: 12px;\n  gap: 16px;\n}\n.lg-input__after {\n  display: flex;\n  align-items: center;\n  gap: 16px;\n  padding: 0 16px;\n  white-space: nowrap;\n  flex: 0 0 auto;\n}\n.lg-input__before {\n  display: flex;\n  align-items: center;\n  gap: 16px;\n  padding: 0 16px;\n  white-space: nowrap;\n  flex: 0 0 auto;\n}\n.input {\n  flex: 1;\n  border: none;\n  padding: 16px;\n  border-radius: 12px;\n  font-family: inherit;\n  font-size: inherit;\n  background-color: transparent;\n  width: 100%;\n}\n.input::placeholder {\n  color: var(--placeholder);\n}\n.input:focus {\n  outline: none;\n}\n/*# sourceMappingURL=input.component.css.map */\n"] }]
  }], () => [], { input: [{
    type: ViewChild,
    args: ["input", { static: true }]
  }], focusedClass: [{
    type: HostBinding,
    args: ["class.focused"]
  }] });
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(InputComponent, { className: "InputComponent", filePath: "src/app/features/controls/form/input.component.ts", lineNumber: 119 });
})();

export {
  InputComponent
};
//# sourceMappingURL=chunk-24GIFUTY.js.map
