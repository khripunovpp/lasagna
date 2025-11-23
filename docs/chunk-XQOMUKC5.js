import {
  ControlExtraTemplateDirective
} from "./chunk-4ABBJ6BG.js";
import {
  removeAllNonMathSymbols
} from "./chunk-IWOUTMKL.js";
import {
  FormsModule,
  NG_VALUE_ACCESSOR
} from "./chunk-2S3NUMNU.js";
import {
  NgTemplateOutlet
} from "./chunk-X2X7GTPW.js";
import {
  Component,
  ContentChildren,
  HostBinding,
  Input,
  Output,
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
} from "./chunk-IYCVPBRB.js";
import {
  __spreadProps,
  __spreadValues
} from "./chunk-46DXP6YY.js";

// src/app/features/controls/form/number-input.component.ts
var _c0 = ["input"];
function NumberInputComponent_Conditional_1_ng_container_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementContainer(0);
  }
}
function NumberInputComponent_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 2);
    \u0275\u0275template(1, NumberInputComponent_Conditional_1_ng_container_1_Template, 1, 0, "ng-container", 8);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275property("ngTemplateOutlet", ctx_r1.topExtraTpl().templateRef);
  }
}
function NumberInputComponent_Conditional_3_ng_container_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementContainer(0);
  }
}
function NumberInputComponent_Conditional_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 4);
    \u0275\u0275template(1, NumberInputComponent_Conditional_3_ng_container_1_Template, 1, 0, "ng-container", 8);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275property("ngTemplateOutlet", ctx_r1.beforeExtraTpl().templateRef);
  }
}
function NumberInputComponent_Conditional_6_ng_container_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementContainer(0);
  }
}
function NumberInputComponent_Conditional_6_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 6);
    \u0275\u0275template(1, NumberInputComponent_Conditional_6_ng_container_1_Template, 1, 0, "ng-container", 8);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275property("ngTemplateOutlet", ctx_r1.afterExtraTpl().templateRef);
  }
}
function NumberInputComponent_Conditional_7_ng_container_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementContainer(0);
  }
}
function NumberInputComponent_Conditional_7_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 7);
    \u0275\u0275template(1, NumberInputComponent_Conditional_7_ng_container_1_Template, 1, 0, "ng-container", 8);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275property("ngTemplateOutlet", ctx_r1.bottomExtraTpl().templateRef);
  }
}
var NumberInputComponent = class _NumberInputComponent {
  constructor() {
  }
  input;
  value = "";
  onInputChange = output();
  onKeydown = output();
  placeholder = input("Enter text here", ...ngDevMode ? [{ debugName: "placeholder" }] : []);
  disable = input(false, ...ngDevMode ? [{ debugName: "disable" }] : []);
  moveBeforeAbove = input(false, ...ngDevMode ? [{ debugName: "moveBeforeAbove" }] : []);
  focused = signal(false, ...ngDevMode ? [{ debugName: "focused" }] : []);
  extraTpl = contentChildren(ControlExtraTemplateDirective, ...ngDevMode ? [{ debugName: "extraTpl", descendants: true }] : [{ descendants: true }]);
  afterExtraTpl = computed(() => {
    return this.extraTpl().find((tpl) => tpl.place() === "after");
  }, ...ngDevMode ? [{ debugName: "afterExtraTpl" }] : []);
  beforeExtraTpl = computed(() => {
    return this.extraTpl().find((tpl) => tpl.place() === "before");
  }, ...ngDevMode ? [{ debugName: "beforeExtraTpl" }] : []);
  topExtraTpl = computed(() => {
    return this.extraTpl().find((tpl) => tpl.place() === "top");
  }, ...ngDevMode ? [{ debugName: "topExtraTpl" }] : []);
  bottomExtraTpl = computed(() => {
    return this.extraTpl().find((tpl) => tpl.place() === "bottom");
  }, ...ngDevMode ? [{ debugName: "bottomExtraTpl" }] : []);
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
  }
  _change(value) {
    this.value = value ? removeAllNonMathSymbols(value) : "";
    if (this.input?.nativeElement) {
      this.input.nativeElement.value = this.value;
    }
    this.onChange(this.value);
  }
  static \u0275fac = function NumberInputComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _NumberInputComponent)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _NumberInputComponent, selectors: [["lg-number-input"]], contentQueries: function NumberInputComponent_ContentQueries(rf, ctx, dirIndex) {
    if (rf & 1) {
      \u0275\u0275contentQuerySignal(dirIndex, ctx.extraTpl, ControlExtraTemplateDirective, 5);
    }
    if (rf & 2) {
      \u0275\u0275queryAdvance();
    }
  }, viewQuery: function NumberInputComponent_Query(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275viewQuery(_c0, 7);
    }
    if (rf & 2) {
      let _t;
      \u0275\u0275queryRefresh(_t = \u0275\u0275loadQuery()) && (ctx.input = _t.first);
    }
  }, hostVars: 2, hostBindings: function NumberInputComponent_HostBindings(rf, ctx) {
    if (rf & 2) {
      \u0275\u0275classProp("focused", ctx.focusedClass);
    }
  }, inputs: { placeholder: [1, "placeholder"], disable: [1, "disable"], moveBeforeAbove: [1, "moveBeforeAbove"] }, outputs: { onInputChange: "onInputChange", onKeydown: "onKeydown" }, features: [\u0275\u0275ProvidersFeature([
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => _NumberInputComponent),
      multi: true
    }
  ])], decls: 8, vars: 11, consts: [["input", ""], [1, "lg-number-input"], [1, "lg-number-input__top"], [1, "lg-number-input__body"], [1, "lg-number-input__before"], ["inputmode", "decimal", "type", "text", 1, "input", 3, "blur", "change", "focus", "input", "keydown", "disabled", "placeholder", "value"], [1, "lg-number-input__after"], [1, "lg-number-input__bottom"], [4, "ngTemplateOutlet"]], template: function NumberInputComponent_Template(rf, ctx) {
    if (rf & 1) {
      const _r1 = \u0275\u0275getCurrentView();
      \u0275\u0275elementStart(0, "div", 1);
      \u0275\u0275conditionalCreate(1, NumberInputComponent_Conditional_1_Template, 2, 1, "div", 2);
      \u0275\u0275elementStart(2, "div", 3);
      \u0275\u0275conditionalCreate(3, NumberInputComponent_Conditional_3_Template, 2, 1, "div", 4);
      \u0275\u0275elementStart(4, "input", 5, 0);
      \u0275\u0275listener("blur", function NumberInputComponent_Template_input_blur_4_listener() {
        \u0275\u0275restoreView(_r1);
        return \u0275\u0275resetView(ctx.focused.set(false));
      })("change", function NumberInputComponent_Template_input_change_4_listener() {
        \u0275\u0275restoreView(_r1);
        return \u0275\u0275resetView(ctx.onInputChange.emit(ctx.value));
      })("focus", function NumberInputComponent_Template_input_focus_4_listener() {
        \u0275\u0275restoreView(_r1);
        return \u0275\u0275resetView(ctx.focused.set(true));
      })("input", function NumberInputComponent_Template_input_input_4_listener($event) {
        \u0275\u0275restoreView(_r1);
        return \u0275\u0275resetView(ctx.onChangeInput($event));
      })("keydown", function NumberInputComponent_Template_input_keydown_4_listener() {
        \u0275\u0275restoreView(_r1);
        return \u0275\u0275resetView(ctx.onKeydown.emit());
      });
      \u0275\u0275elementEnd();
      \u0275\u0275conditionalCreate(6, NumberInputComponent_Conditional_6_Template, 2, 1, "div", 6);
      \u0275\u0275elementEnd();
      \u0275\u0275conditionalCreate(7, NumberInputComponent_Conditional_7_Template, 2, 1, "div", 7);
      \u0275\u0275elementEnd();
    }
    if (rf & 2) {
      let tmp_3_0;
      let tmp_4_0;
      let tmp_8_0;
      let tmp_9_0;
      \u0275\u0275classProp("disabled", ctx.disable())("moveBeforeAbove", ctx.moveBeforeAbove());
      \u0275\u0275advance();
      \u0275\u0275conditional(((tmp_3_0 = ctx.topExtraTpl()) == null ? null : tmp_3_0.templateRef) ? 1 : -1);
      \u0275\u0275advance(2);
      \u0275\u0275conditional(((tmp_4_0 = ctx.beforeExtraTpl()) == null ? null : tmp_4_0.templateRef) ? 3 : -1);
      \u0275\u0275advance();
      \u0275\u0275property("disabled", ctx.disable())("placeholder", ctx.placeholder())("value", ctx.value);
      \u0275\u0275advance(2);
      \u0275\u0275conditional(((tmp_8_0 = ctx.afterExtraTpl()) == null ? null : tmp_8_0.templateRef) ? 6 : -1);
      \u0275\u0275advance();
      \u0275\u0275conditional(((tmp_9_0 = ctx.bottomExtraTpl()) == null ? null : tmp_9_0.templateRef) ? 7 : -1);
    }
  }, dependencies: [
    FormsModule,
    NgTemplateOutlet
  ], styles: ["\n\n[_nghost-%COMP%] {\n  display: flex;\n  flex: 1;\n}\n.focused[_nghost-%COMP%] {\n  box-shadow: var(--focus-shadow);\n  border-radius: 12px;\n}\n.lg-number-input__after[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 16px;\n  padding: 0 8px 0 0;\n}\n.lg-number-input.moveBeforeAbove[_ngcontent-%COMP%] {\n  flex-wrap: wrap;\n}\n.lg-number-input.moveBeforeAbove[_ngcontent-%COMP%]   .lg-number-input__before[_ngcontent-%COMP%] {\n  width: 100%;\n  padding-right: 16px;\n}\n.lg-number-input__before[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 16px;\n  padding: 0 0 0 8px;\n}\n.lg-number-input__top[_ngcontent-%COMP%], \n.lg-number-input__bottom[_ngcontent-%COMP%] {\n  width: 100%;\n  padding: 8px;\n}\n.lg-number-input[_ngcontent-%COMP%] {\n  display: flex;\n  flex: 1;\n  flex-direction: column;\n  background-color: var(--control-bg);\n  border-radius: 12px;\n  padding: 8px;\n}\n.lg-number-input__body[_ngcontent-%COMP%] {\n  display: flex;\n  flex: 1;\n  flex-wrap: wrap;\n}\n.lg-number-input.disabled[_ngcontent-%COMP%] {\n  opacity: 0.7;\n}\n.input[_ngcontent-%COMP%] {\n  flex: 1;\n  border: none;\n  padding: 8px;\n  font-family: inherit;\n  font-size: inherit;\n  background-color: transparent;\n  border-radius: 12px;\n  width: 100%;\n  appearance: none;\n}\n.input[_ngcontent-%COMP%]::placeholder {\n  color: var(--placeholder);\n}\n.input[_ngcontent-%COMP%]:focus {\n  outline: none;\n}\n/*# sourceMappingURL=number-input.component.css.map */"] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(NumberInputComponent, [{
    type: Component,
    args: [{ selector: "lg-number-input", standalone: true, template: `
    <div [class.disabled]="disable()"
         [class.moveBeforeAbove]="moveBeforeAbove()"
         class="lg-number-input">

      @if (topExtraTpl()?.templateRef) {
        <div class="lg-number-input__top">
          <ng-container *ngTemplateOutlet="topExtraTpl()!.templateRef"></ng-container>
        </div>
      }


      <div class="lg-number-input__body">
        @if (beforeExtraTpl()?.templateRef) {
          <div class="lg-number-input__before">
            <ng-container *ngTemplateOutlet="beforeExtraTpl()!.templateRef"></ng-container>
          </div>
        }

        <input #input
               (blur)="focused.set(false)"
               (change)="onInputChange.emit(value)"
               (focus)="focused.set(true)"
               (input)="onChangeInput($event)"
               (keydown)="onKeydown.emit()"
               [disabled]="disable()"
               [placeholder]="placeholder()"
               [value]="value"
               class="input"
               inputmode="decimal"
               type="text">

        @if (afterExtraTpl()?.templateRef) {
          <div class="lg-number-input__after">
            <ng-container *ngTemplateOutlet="afterExtraTpl()!.templateRef"></ng-container>
          </div>
        }
      </div>

      @if (bottomExtraTpl()?.templateRef) {
        <div class="lg-number-input__bottom">
          <ng-container *ngTemplateOutlet="bottomExtraTpl()!.templateRef"></ng-container>
        </div>
      }
    </div>

  `, imports: [
      FormsModule,
      NgTemplateOutlet
    ], providers: [
      {
        provide: NG_VALUE_ACCESSOR,
        useExisting: forwardRef(() => NumberInputComponent),
        multi: true
      }
    ], styles: ["/* angular:styles/component:scss;59ea1c2d9af7150aaa59869b2245a002cb8ab1eb0feccec5d10bcf4b8a9a37c8;/Users/khripunovpavel/Documents/my/lasagna/lasagna/src/app/features/controls/form/number-input.component.ts */\n:host {\n  display: flex;\n  flex: 1;\n}\n:host.focused {\n  box-shadow: var(--focus-shadow);\n  border-radius: 12px;\n}\n.lg-number-input__after {\n  display: flex;\n  align-items: center;\n  gap: 16px;\n  padding: 0 8px 0 0;\n}\n.lg-number-input.moveBeforeAbove {\n  flex-wrap: wrap;\n}\n.lg-number-input.moveBeforeAbove .lg-number-input__before {\n  width: 100%;\n  padding-right: 16px;\n}\n.lg-number-input__before {\n  display: flex;\n  align-items: center;\n  gap: 16px;\n  padding: 0 0 0 8px;\n}\n.lg-number-input__top,\n.lg-number-input__bottom {\n  width: 100%;\n  padding: 8px;\n}\n.lg-number-input {\n  display: flex;\n  flex: 1;\n  flex-direction: column;\n  background-color: var(--control-bg);\n  border-radius: 12px;\n  padding: 8px;\n}\n.lg-number-input__body {\n  display: flex;\n  flex: 1;\n  flex-wrap: wrap;\n}\n.lg-number-input.disabled {\n  opacity: 0.7;\n}\n.input {\n  flex: 1;\n  border: none;\n  padding: 8px;\n  font-family: inherit;\n  font-size: inherit;\n  background-color: transparent;\n  border-radius: 12px;\n  width: 100%;\n  appearance: none;\n}\n.input::placeholder {\n  color: var(--placeholder);\n}\n.input:focus {\n  outline: none;\n}\n/*# sourceMappingURL=number-input.component.css.map */\n"] }]
  }], () => [], { input: [{
    type: ViewChild,
    args: ["input", { static: true }]
  }], onInputChange: [{ type: Output, args: ["onInputChange"] }], onKeydown: [{ type: Output, args: ["onKeydown"] }], placeholder: [{ type: Input, args: [{ isSignal: true, alias: "placeholder", required: false }] }], disable: [{ type: Input, args: [{ isSignal: true, alias: "disable", required: false }] }], moveBeforeAbove: [{ type: Input, args: [{ isSignal: true, alias: "moveBeforeAbove", required: false }] }], extraTpl: [{ type: ContentChildren, args: [forwardRef(() => ControlExtraTemplateDirective), __spreadProps(__spreadValues({}, { descendants: true }), { isSignal: true })] }], focusedClass: [{
    type: HostBinding,
    args: ["class.focused"]
  }] });
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(NumberInputComponent, { className: "NumberInputComponent", filePath: "src/app/features/controls/form/number-input.component.ts", lineNumber: 164 });
})();

export {
  NumberInputComponent
};
//# sourceMappingURL=chunk-XQOMUKC5.js.map
