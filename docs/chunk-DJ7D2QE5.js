import {
  ShrinkDirective
} from "./chunk-UP2DFZRF.js";
import {
  NumberInputComponent
} from "./chunk-XQOMUKC5.js";
import {
  ParseMathDirective
} from "./chunk-A4UCVHPC.js";
import {
  FlexRowComponent
} from "./chunk-VVGY6OUS.js";
import {
  PullDirective
} from "./chunk-V7C6GQ6Z.js";
import {
  ControlExtraTemplateDirective
} from "./chunk-4ABBJ6BG.js";
import "./chunk-IWOUTMKL.js";
import {
  DefaultValueAccessor,
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
  RangeValueAccessor,
  ReactiveFormsModule,
  ɵNgNoValidate
} from "./chunk-2S3NUMNU.js";
import {
  takeUntilDestroyed
} from "./chunk-AWZMWU52.js";
import {
  ButtonComponent
} from "./chunk-MP6JNYP6.js";
import {
  FlexColumnComponent
} from "./chunk-K37ECZYU.js";
import {
  TranslatePipe
} from "./chunk-755Q3QHA.js";
import "./chunk-L34DFTMV.js";
import "./chunk-USF337CA.js";
import "./chunk-VVQKNBNV.js";
import {
  DecimalPipe
} from "./chunk-X2X7GTPW.js";
import "./chunk-EROQRXO4.js";
import "./chunk-7YWLATDR.js";
import {
  Component,
  DestroyRef,
  Input,
  ViewEncapsulation,
  effect,
  forwardRef,
  inject,
  input,
  setClassMetadata,
  signal,
  ɵsetClassDebugInfo,
  ɵɵProvidersFeature,
  ɵɵadvance,
  ɵɵclassProp,
  ɵɵconditional,
  ɵɵconditionalCreate,
  ɵɵdeclareLet,
  ɵɵdefineComponent,
  ɵɵelement,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵgetCurrentView,
  ɵɵlistener,
  ɵɵnextContext,
  ɵɵpipe,
  ɵɵpipeBind1,
  ɵɵpipeBind2,
  ɵɵproperty,
  ɵɵreadContextLet,
  ɵɵrepeater,
  ɵɵrepeaterCreate,
  ɵɵrepeaterTrackByIdentity,
  ɵɵresetView,
  ɵɵrestoreView,
  ɵɵstoreLet,
  ɵɵstyleMap,
  ɵɵstyleProp,
  ɵɵtemplate,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1,
  ɵɵtwoWayBindingSet,
  ɵɵtwoWayListener,
  ɵɵtwoWayProperty
} from "./chunk-IYCVPBRB.js";
import "./chunk-46DXP6YY.js";

// src/app/features/controls/form/buttons-group.component.ts
var _forTrack0 = ($index, $item) => $item.value;
function ButtonsGroupComponent_For_2_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "lg-button", 2);
    \u0275\u0275listener("click", function ButtonsGroupComponent_For_2_Template_lg_button_click_0_listener() {
      const ctx_r1 = \u0275\u0275restoreView(_r1);
      const item_r3 = ctx_r1.$implicit;
      const \u0275$index_3_r4 = ctx_r1.$index;
      const ctx_r4 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r4.onClickItem(item_r3, \u0275$index_3_r4));
    });
    \u0275\u0275text(1);
    \u0275\u0275pipe(2, "translate");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const item_r3 = ctx.$implicit;
    const \u0275$index_3_r4 = ctx.$index;
    const \u0275$count_3_r6 = ctx.$count;
    const ctx_r4 = \u0275\u0275nextContext();
    \u0275\u0275styleMap(item_r3.style || "default");
    \u0275\u0275classProp("buttons-group__item--active", ctx_r4.activeIndex() == \u0275$index_3_r4);
    \u0275\u0275property("active", ctx_r4.activeIndex() == \u0275$index_3_r4)("flat", ctx_r4.flat)("noScale", true)("size", item_r3.size || "regular")("noLeftRadius", \u0275$index_3_r4 === \u0275$count_3_r6 - 1)("noRightRadius", \u0275$index_3_r4 === 0)("noRadius", !(\u0275$index_3_r4 === 0) && !(\u0275$index_3_r4 === \u0275$count_3_r6 - 1));
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind1(2, 12, item_r3.label), " ");
  }
}
var ButtonsGroupComponent = class _ButtonsGroupComponent {
  flat = false;
  items = input(...ngDevMode ? [void 0, { debugName: "items" }] : []);
  activeIndex = signal(0, ...ngDevMode ? [{ debugName: "activeIndex" }] : []);
  value = signal("", ...ngDevMode ? [{ debugName: "value" }] : []);
  effect = effect(() => {
    const activeIndex = this.items()?.findIndex((item) => item.value === this.value()) ?? -1;
    this.activeIndex.set(activeIndex === -1 ? 0 : activeIndex);
  }, ...ngDevMode ? [{ debugName: "effect" }] : []);
  onClickItem(item, index) {
    this.activeIndex.set(index);
    this.writeValue(item.value);
    item.onClick?.();
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
  _change(value) {
    this.value.set(value);
    this.onChange(this.value());
  }
  static \u0275fac = function ButtonsGroupComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _ButtonsGroupComponent)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _ButtonsGroupComponent, selectors: [["lg-buttons-group"]], inputs: { flat: "flat", items: [1, "items"] }, features: [\u0275\u0275ProvidersFeature([
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => _ButtonsGroupComponent),
      multi: true
    }
  ])], decls: 3, vars: 2, consts: [[1, "buttons-group"], [1, "buttons-group__item", 3, "active", "flat", "noScale", "style", "size", "noLeftRadius", "noRightRadius", "noRadius", "buttons-group__item--active"], [1, "buttons-group__item", 3, "click", "active", "flat", "noScale", "size", "noLeftRadius", "noRightRadius", "noRadius"]], template: function ButtonsGroupComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "div", 0);
      \u0275\u0275repeaterCreate(1, ButtonsGroupComponent_For_2_Template, 3, 14, "lg-button", 1, _forTrack0);
      \u0275\u0275elementEnd();
    }
    if (rf & 2) {
      \u0275\u0275classProp("buttons-group--flat", ctx.flat);
      \u0275\u0275advance();
      \u0275\u0275repeater(ctx.items());
    }
  }, dependencies: [
    ButtonComponent,
    TranslatePipe
  ], styles: ["/* angular:styles/component:scss;63d697a2fbda6e5b7bb22c3d1c660a21b49f172829c70d6948f749d6e521994e;/Users/khripunovpavel/Documents/my/lasagna/lasagna/src/app/features/controls/form/buttons-group.component.ts */\n.buttons-group {\n  display: flex;\n}\n.buttons-group lg-button {\n  flex: 1;\n}\n.buttons-group lg-button button {\n  width: 100%;\n}\n.buttons-group--flat {\n  gap: 16px;\n  width: 100%;\n}\n/*# sourceMappingURL=buttons-group.component.css.map */\n"], encapsulation: 2 });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(ButtonsGroupComponent, [{
    type: Component,
    args: [{ selector: "lg-buttons-group", standalone: true, template: `
    <div [class.buttons-group--flat]="flat"
         class="buttons-group">
      @for (item of items(); track item.value; let last = $last, first = $first, index = $index) {
        <lg-button (click)="onClickItem(item,index)"
                   [active]="activeIndex() == index"
                   [flat]="flat"
                   [noScale]="true"
                   [style]="item.style || 'default'"
                   [size]="item.size || 'regular'"
                   [noLeftRadius]="last"
                   [noRightRadius]="first"
                   class="buttons-group__item"
                   [noRadius]="!first && !last"
                   [class.buttons-group__item--active]="activeIndex() == index">
          {{ item.label | translate }}
        </lg-button>
      }
    </div>
  `, imports: [
      ButtonComponent,
      TranslatePipe
    ], encapsulation: ViewEncapsulation.None, providers: [
      {
        provide: NG_VALUE_ACCESSOR,
        useExisting: forwardRef(() => ButtonsGroupComponent),
        multi: true
      }
    ], styles: ["/* angular:styles/component:scss;63d697a2fbda6e5b7bb22c3d1c660a21b49f172829c70d6948f749d6e521994e;/Users/khripunovpavel/Documents/my/lasagna/lasagna/src/app/features/controls/form/buttons-group.component.ts */\n.buttons-group {\n  display: flex;\n}\n.buttons-group lg-button {\n  flex: 1;\n}\n.buttons-group lg-button button {\n  width: 100%;\n}\n.buttons-group--flat {\n  gap: 16px;\n  width: 100%;\n}\n/*# sourceMappingURL=buttons-group.component.css.map */\n"] }]
  }], null, { flat: [{
    type: Input
  }], items: [{ type: Input, args: [{ isSignal: true, alias: "items", required: false }] }] });
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(ButtonsGroupComponent, { className: "ButtonsGroupComponent", filePath: "src/app/features/controls/form/buttons-group.component.ts", lineNumber: 70 });
})();

// src/app/features/widgets/jelly-widget/jelly-calculation.model.ts
var convertPairs = {
  powder: {
    mass: (amount) => {
      return amount * 5 + amount;
    }
  },
  leaf: {
    mass: (amount) => {
      return amount * 5 + amount;
    }
  },
  mass: {
    powder: (amount) => {
      return amount / 6;
    },
    leaf: (amount) => {
      return amount / 6;
    }
  }
};
var waterCalculationFromMass = (jellyAmount, ratio = 5) => {
  return jellyAmount * ratio;
};
var waterCalculationToMass = (waterAmount, ratio = 5) => {
  return waterAmount * ratio / 6;
};
var bloomRatio = (fromBloom, toBloom) => {
  return fromBloom / toBloom;
};
var JellyCalculationModel = class {
  type;
  bloom;
  ratio;
  constructor(type, bloom = 1, ratio = 5) {
    this.type = type;
    this.bloom = bloom;
    this.ratio = ratio;
  }
  convertToBase(type, amount, bloomTo = 1) {
    const ratio = bloomRatio(this.bloom, bloomTo);
    const handlers = convertPairs[this.type];
    return (handlers?.[type]?.(amount) || amount) * ratio;
  }
  convertToWater(type, jellyAmount) {
    if (this.type === "mass" && type === "mass" || this.type === "leaf" || type === "leaf") {
      return 0;
    }
    if (this.type === "mass") {
      return waterCalculationFromMass(jellyAmount, this.ratio);
    } else if (type === "mass") {
      return waterCalculationToMass(jellyAmount, this.ratio);
    }
    return 0;
  }
};

// src/app/features/controls/form/range.component.ts
function RangeComponent_For_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 4);
    \u0275\u0275element(1, "div", 5);
    \u0275\u0275elementStart(2, "div", 6);
    \u0275\u0275text(3);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const tick_r1 = ctx.$implicit;
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275styleProp("left", (tick_r1 - ctx_r1.min) / (ctx_r1.max - ctx_r1.min) * 100, "%");
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(tick_r1);
  }
}
var RangeComponent = class _RangeComponent {
  constructor() {
  }
  min = 0;
  max = 100;
  step = 1;
  tickInterval;
  customTicks;
  value = "";
  get ticks() {
    if (this.customTicks)
      return this.customTicks;
    if (this.tickInterval) {
      const ticks = [];
      for (let i = this.min; i <= this.max; i += this.tickInterval) {
        ticks.push(i);
      }
      return ticks;
    }
    return [];
  }
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
  registerOnTouched(fn) {
    this.onTouched = fn;
  }
  changeValue(value) {
    this.value = value;
    this.onChange(this.value);
  }
  static \u0275fac = function RangeComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _RangeComponent)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _RangeComponent, selectors: [["lg-range"]], inputs: { min: "min", max: "max", step: "step", tickInterval: "tickInterval", customTicks: "customTicks" }, features: [\u0275\u0275ProvidersFeature([
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: _RangeComponent,
      multi: true
    }
  ])], decls: 5, vars: 4, consts: [[1, "range-wrapper"], ["type", "range", 1, "custom-range", 3, "ngModelChange", "min", "max", "step", "ngModel"], [1, "ticks"], [1, "tick", 3, "left"], [1, "tick"], [1, "tick-line"], [1, "label"]], template: function RangeComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "div", 0)(1, "input", 1);
      \u0275\u0275twoWayListener("ngModelChange", function RangeComponent_Template_input_ngModelChange_1_listener($event) {
        \u0275\u0275twoWayBindingSet(ctx.value, $event) || (ctx.value = $event);
        return $event;
      });
      \u0275\u0275listener("ngModelChange", function RangeComponent_Template_input_ngModelChange_1_listener($event) {
        return ctx.changeValue($event);
      });
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(2, "div", 2);
      \u0275\u0275repeaterCreate(3, RangeComponent_For_4_Template, 4, 3, "div", 3, \u0275\u0275repeaterTrackByIdentity);
      \u0275\u0275elementEnd()();
    }
    if (rf & 2) {
      \u0275\u0275advance();
      \u0275\u0275property("min", ctx.min)("max", ctx.max)("step", ctx.step);
      \u0275\u0275twoWayProperty("ngModel", ctx.value);
      \u0275\u0275advance(2);
      \u0275\u0275repeater(ctx.ticks);
    }
  }, dependencies: [FormsModule, DefaultValueAccessor, RangeValueAccessor, NgControlStatus, NgModel], styles: ["\n\n.range-wrapper[_ngcontent-%COMP%] {\n  position: relative;\n  width: 100%;\n  padding-bottom: 30px;\n}\n.custom-range[_ngcontent-%COMP%] {\n  width: 100%;\n  -webkit-appearance: none;\n  background: transparent;\n  position: relative;\n  z-index: 2;\n  margin: 0;\n}\n.custom-range[_ngcontent-%COMP%]::-webkit-slider-runnable-track {\n  height: 6px;\n  background: var(--range-track-bg);\n  border-radius: 3px;\n}\n.custom-range[_ngcontent-%COMP%]::-moz-range-track {\n  height: 6px;\n  background: var(--range-track-bg);\n  border-radius: 3px;\n}\n.custom-range[_ngcontent-%COMP%]::-webkit-slider-thumb {\n  -webkit-appearance: none;\n  height: 20px;\n  width: 20px;\n  background: var(--accent-color);\n  border-radius: 50%;\n  margin-top: -7px;\n  cursor: pointer;\n}\n.custom-range[_ngcontent-%COMP%]::-moz-range-thumb {\n  height: 20px;\n  width: 20px;\n  background: var(--accent-color);\n  border-radius: 50%;\n  cursor: pointer;\n}\n.ticks[_ngcontent-%COMP%] {\n  position: absolute;\n  top: 28px;\n  left: 2.4%;\n  right: 2.4%;\n  height: 30px;\n  pointer-events: none;\n}\n.tick[_ngcontent-%COMP%] {\n  position: absolute;\n  text-align: center;\n  transform: translateX(-50%);\n}\n.tick-line[_ngcontent-%COMP%] {\n  width: 1px;\n  height: 10px;\n  background-color: var(--range-tick-color);\n  margin: 0 auto;\n}\n.label[_ngcontent-%COMP%] {\n  font-size: 10px;\n  color: var(--range-tick-color);\n  margin-top: 2px;\n  display: block;\n}\n/*# sourceMappingURL=range.component.css.map */"] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(RangeComponent, [{
    type: Component,
    args: [{ selector: "lg-range", standalone: true, template: `
    <div class="range-wrapper">
      <input
        type="range"
        [min]="min"
        [max]="max"
        [step]="step"
        [(ngModel)]="value"
        (ngModelChange)="changeValue($event)"
        class="custom-range"
      />

      <div class="ticks">
        @for (tick of ticks; track tick) {
          <div
            class="tick"
            [style.left.%]="((tick - min) / (max - min)) * 100"
          >
            <div class="tick-line"></div>
            <div class="label">{{ tick }}</div>
          </div>
        }
      </div>
    </div>
  `, imports: [
      FormsModule
    ], providers: [
      {
        provide: NG_VALUE_ACCESSOR,
        useExisting: RangeComponent,
        multi: true
      }
    ], styles: ["/* angular:styles/component:scss;40aa7aa84c02efa422a88a0257c26b90ebb0635ef5cefe34c2e5b1d11730eb4a;/Users/khripunovpavel/Documents/my/lasagna/lasagna/src/app/features/controls/form/range.component.ts */\n.range-wrapper {\n  position: relative;\n  width: 100%;\n  padding-bottom: 30px;\n}\n.custom-range {\n  width: 100%;\n  -webkit-appearance: none;\n  background: transparent;\n  position: relative;\n  z-index: 2;\n  margin: 0;\n}\n.custom-range::-webkit-slider-runnable-track {\n  height: 6px;\n  background: var(--range-track-bg);\n  border-radius: 3px;\n}\n.custom-range::-moz-range-track {\n  height: 6px;\n  background: var(--range-track-bg);\n  border-radius: 3px;\n}\n.custom-range::-webkit-slider-thumb {\n  -webkit-appearance: none;\n  height: 20px;\n  width: 20px;\n  background: var(--accent-color);\n  border-radius: 50%;\n  margin-top: -7px;\n  cursor: pointer;\n}\n.custom-range::-moz-range-thumb {\n  height: 20px;\n  width: 20px;\n  background: var(--accent-color);\n  border-radius: 50%;\n  cursor: pointer;\n}\n.ticks {\n  position: absolute;\n  top: 28px;\n  left: 2.4%;\n  right: 2.4%;\n  height: 30px;\n  pointer-events: none;\n}\n.tick {\n  position: absolute;\n  text-align: center;\n  transform: translateX(-50%);\n}\n.tick-line {\n  width: 1px;\n  height: 10px;\n  background-color: var(--range-tick-color);\n  margin: 0 auto;\n}\n.label {\n  font-size: 10px;\n  color: var(--range-tick-color);\n  margin-top: 2px;\n  display: block;\n}\n/*# sourceMappingURL=range.component.css.map */\n"] }]
  }], () => [], { min: [{
    type: Input
  }], max: [{
    type: Input
  }], step: [{
    type: Input
  }], tickInterval: [{
    type: Input
  }], customTicks: [{
    type: Input
  }] });
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(RangeComponent, { className: "RangeComponent", filePath: "src/app/features/controls/form/range.component.ts", lineNumber: 121 });
})();

// src/app/features/widgets/jelly-widget/jelly-widget.component.ts
function JellyWidgetComponent_ng_template_9_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275text(0);
    \u0275\u0275pipe(1, "translate");
  }
  if (rf & 2) {
    \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind1(1, 1, "jelly.grams-of"), " ");
  }
}
function JellyWidgetComponent_Case_23_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275text(0, " \u{1F35A} ");
  }
}
function JellyWidgetComponent_Case_24_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275text(0, " \u{1F343} ");
  }
}
function JellyWidgetComponent_Case_25_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275text(0, " \u{1F9EB} ");
  }
}
function JellyWidgetComponent_Conditional_29_Case_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div");
    \u0275\u0275text(1);
    \u0275\u0275pipe(2, "translate");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind1(2, 1, "jelly.with"), " ");
  }
}
function JellyWidgetComponent_Conditional_29_Case_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div");
    \u0275\u0275text(1);
    \u0275\u0275pipe(2, "translate");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind1(2, 1, "jelly.and"), " ");
  }
}
function JellyWidgetComponent_Conditional_29_Case_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div");
    \u0275\u0275text(1);
    \u0275\u0275pipe(2, "translate");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind1(2, 1, "jelly.and"), " ");
  }
}
function JellyWidgetComponent_Conditional_29_Case_13_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "br");
    \u0275\u0275text(1);
    \u0275\u0275pipe(2, "translate");
  }
  if (rf & 2) {
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1("", \u0275\u0275pipeBind1(2, 1, "jelly.included"), " ");
  }
}
function JellyWidgetComponent_Conditional_29_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "lg-flex-column", 12)(1, "div");
    \u0275\u0275conditionalCreate(2, JellyWidgetComponent_Conditional_29_Case_2_Template, 3, 3, "div");
    \u0275\u0275conditionalCreate(3, JellyWidgetComponent_Conditional_29_Case_3_Template, 3, 3, "div")(4, JellyWidgetComponent_Conditional_29_Case_4_Template, 3, 3, "div");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "lg-flex-row", 11)(6, "div");
    \u0275\u0275text(7);
    \u0275\u0275pipe(8, "number");
    \u0275\u0275elementEnd();
    \u0275\u0275text(9, " \u{1F4A7} ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(10, "div");
    \u0275\u0275text(11);
    \u0275\u0275pipe(12, "translate");
    \u0275\u0275conditionalCreate(13, JellyWidgetComponent_Conditional_29_Case_13_Template, 3, 3);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    let tmp_6_0;
    let tmp_7_0;
    let tmp_11_0;
    const ctx_r1 = \u0275\u0275nextContext();
    const toType_r3 = \u0275\u0275readContextLet(13);
    \u0275\u0275property("size", "small")("position", "center");
    \u0275\u0275advance(2);
    \u0275\u0275conditional((tmp_6_0 = toType_r3) === "mass" ? 2 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional((tmp_7_0 = toType_r3) === "powder" ? 3 : tmp_7_0 === "leaf" ? 4 : -1);
    \u0275\u0275advance(2);
    \u0275\u0275property("size", "small");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind2(8, 8, ctx_r1.waterNeeded(), "1.0-2"));
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind1(12, 11, "jelly.ml-of-water"), " ");
    \u0275\u0275advance(2);
    \u0275\u0275conditional((tmp_11_0 = toType_r3) === "mass" ? 13 : -1);
  }
}
var JellyWidgetComponent = class _JellyWidgetComponent {
  constructor() {
    this.form.valueChanges.pipe(takeUntilDestroyed(this.destroyRef)).subscribe((value) => {
      const amount = parseFloat(String(value?.from?.amount));
      if (isNaN(amount)) {
        return;
      }
      const model = new JellyCalculationModel(value?.from?.type, value?.from?.bloom, value?.ratio);
      const convertedAmount = model.convertToBase(value?.to?.type, amount, value?.to?.bloom);
      const waterNeeded = model.convertToWater(value?.to?.type, convertedAmount);
      this.result.set(convertedAmount);
      this.waterNeeded.set(waterNeeded);
    });
  }
  result = signal(0, ...ngDevMode ? [{ debugName: "result" }] : []);
  waterNeeded = signal(0, ...ngDevMode ? [{ debugName: "waterNeeded" }] : []);
  destroyRef = inject(DestroyRef);
  form = new FormGroup({
    from: new FormGroup({
      type: new FormControl("mass"),
      amount: new FormControl(null),
      bloom: new FormControl(140)
    }),
    to: new FormGroup({
      type: new FormControl("powder"),
      bloom: new FormControl(140)
    }),
    ratio: new FormControl(5)
  });
  typeButtons = [
    {
      label: "jelly.type.powder",
      value: "powder",
      style: "secondary"
    },
    {
      label: "jelly.type.leaf",
      value: "leaf",
      style: "secondary"
    },
    {
      label: "jelly.type.mass",
      value: "mass",
      style: "secondary"
    }
  ];
  changeRatio(ratio) {
    this.form.get("ratio")?.setValue(ratio);
  }
  static \u0275fac = function JellyWidgetComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _JellyWidgetComponent)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _JellyWidgetComponent, selectors: [["lg-jelly-widget"]], decls: 41, vars: 47, consts: [[3, "formGroup"], [3, "size"], [3, "bottom", "mobileMode"], ["formGroupName", "from"], ["formControlName", "amount", "lgParseMath", "", 3, "placeholder"], ["lgExtraTpl", "", "place", "after"], ["formControlName", "bloom", 3, "max", "min", "step", "tickInterval"], ["formControlName", "type", 3, "items"], ["formGroupName", "to"], [1, "text-center", 3, "strictCenter"], ["lgShrink", "", 3, "position", "size"], [2, "font-size", "2rem", 3, "size"], ["lgShrink", "", 3, "size", "position"], ["lgPull", "", 1, "text-small"], [3, "onClick", "outlined", "size"]], template: function JellyWidgetComponent_Template(rf, ctx) {
    if (rf & 1) {
      const _r1 = \u0275\u0275getCurrentView();
      \u0275\u0275elementStart(0, "lg-flex-column")(1, "form", 0)(2, "lg-flex-column", 1)(3, "lg-flex-row", 2)(4, "lg-flex-column", 3)(5, "span");
      \u0275\u0275text(6);
      \u0275\u0275pipe(7, "translate");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(8, "lg-number-input", 4);
      \u0275\u0275template(9, JellyWidgetComponent_ng_template_9_Template, 2, 3, "ng-template", 5);
      \u0275\u0275elementEnd();
      \u0275\u0275element(10, "lg-range", 6)(11, "lg-buttons-group", 7);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(12, "lg-flex-column", 8);
      \u0275\u0275declareLet(13);
      \u0275\u0275elementStart(14, "lg-flex-row", 9)(15, "lg-flex-column", 10)(16, "div");
      \u0275\u0275text(17);
      \u0275\u0275pipe(18, "translate");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(19, "lg-flex-row", 11)(20, "div");
      \u0275\u0275text(21);
      \u0275\u0275pipe(22, "number");
      \u0275\u0275elementEnd();
      \u0275\u0275conditionalCreate(23, JellyWidgetComponent_Case_23_Template, 1, 0)(24, JellyWidgetComponent_Case_24_Template, 1, 0)(25, JellyWidgetComponent_Case_25_Template, 1, 0);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(26, "div");
      \u0275\u0275text(27);
      \u0275\u0275pipe(28, "translate");
      \u0275\u0275elementEnd()();
      \u0275\u0275conditionalCreate(29, JellyWidgetComponent_Conditional_29_Template, 14, 13, "lg-flex-column", 12);
      \u0275\u0275elementEnd();
      \u0275\u0275element(30, "lg-range", 6)(31, "lg-buttons-group", 7);
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(32, "div", 13)(33, "lg-flex-row", 1)(34, "span");
      \u0275\u0275text(35);
      \u0275\u0275pipe(36, "translate");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(37, "lg-button", 14);
      \u0275\u0275listener("onClick", function JellyWidgetComponent_Template_lg_button_onClick_37_listener() {
        \u0275\u0275restoreView(_r1);
        return \u0275\u0275resetView(ctx.changeRatio(5));
      });
      \u0275\u0275text(38, " 1/5 ");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(39, "lg-button", 14);
      \u0275\u0275listener("onClick", function JellyWidgetComponent_Template_lg_button_onClick_39_listener() {
        \u0275\u0275restoreView(_r1);
        return \u0275\u0275resetView(ctx.changeRatio(6));
      });
      \u0275\u0275text(40, " 1/6 ");
      \u0275\u0275elementEnd()()()()()();
    }
    if (rf & 2) {
      let tmp_19_0;
      \u0275\u0275advance();
      \u0275\u0275property("formGroup", ctx.form);
      \u0275\u0275advance();
      \u0275\u0275property("size", "medium");
      \u0275\u0275advance();
      \u0275\u0275property("bottom", true)("mobileMode", true);
      \u0275\u0275advance(3);
      \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(7, 35, "jelly.in-recipe-you-have"));
      \u0275\u0275advance(2);
      \u0275\u0275property("placeholder", "");
      \u0275\u0275advance(2);
      \u0275\u0275property("max", 220)("min", 120)("step", 10)("tickInterval", 20);
      \u0275\u0275advance();
      \u0275\u0275property("items", ctx.typeButtons);
      ctx.form.value == null ? null : ctx.form.value.from == null ? null : ctx.form.value.from.type;
      \u0275\u0275advance(2);
      const toType_r4 = \u0275\u0275storeLet(ctx.form.value == null ? null : ctx.form.value.to == null ? null : ctx.form.value.to.type);
      \u0275\u0275advance();
      \u0275\u0275property("strictCenter", true);
      \u0275\u0275advance();
      \u0275\u0275property("position", "center")("size", "small");
      \u0275\u0275advance(2);
      \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind1(18, 38, "jelly.you-need"), " ");
      \u0275\u0275advance(2);
      \u0275\u0275property("size", "small");
      \u0275\u0275advance(2);
      \u0275\u0275textInterpolate(\u0275\u0275pipeBind2(22, 40, ctx.result(), "1.0-2"));
      \u0275\u0275advance(2);
      \u0275\u0275conditional((tmp_19_0 = toType_r4) === "powder" ? 23 : tmp_19_0 === "leaf" ? 24 : tmp_19_0 === "mass" ? 25 : -1);
      \u0275\u0275advance(4);
      \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind1(28, 43, "jelly.grams-of"), " ");
      \u0275\u0275advance(2);
      \u0275\u0275conditional(ctx.waterNeeded() ? 29 : -1);
      \u0275\u0275advance();
      \u0275\u0275property("max", 220)("min", 120)("step", 10)("tickInterval", 20);
      \u0275\u0275advance();
      \u0275\u0275property("items", ctx.typeButtons);
      const currentRatio_r5 = ctx.form.value == null ? null : ctx.form.value.ratio;
      \u0275\u0275advance(2);
      \u0275\u0275property("size", "small");
      \u0275\u0275advance(2);
      \u0275\u0275textInterpolate1("", \u0275\u0275pipeBind1(36, 45, "jelly.proportion-label"), ":");
      \u0275\u0275advance(2);
      \u0275\u0275styleMap(currentRatio_r5 === 5 ? "primary" : "secondary-dark");
      \u0275\u0275property("outlined", true)("size", "tiny");
      \u0275\u0275advance(2);
      \u0275\u0275styleMap(currentRatio_r5 === 6 ? "primary" : "secondary-dark");
      \u0275\u0275property("outlined", true)("size", "tiny");
    }
  }, dependencies: [
    FormsModule,
    \u0275NgNoValidate,
    NgControlStatus,
    NgControlStatusGroup,
    ReactiveFormsModule,
    FormGroupDirective,
    FormControlName,
    FormGroupName,
    FlexColumnComponent,
    FlexRowComponent,
    ButtonsGroupComponent,
    ShrinkDirective,
    RangeComponent,
    NumberInputComponent,
    ParseMathDirective,
    ControlExtraTemplateDirective,
    PullDirective,
    ButtonComponent,
    DecimalPipe,
    TranslatePipe
  ], styles: ["/* angular:styles/component:scss;5a39d192d96ec09463df6f20ba4b5531f431e94c284e4b4879a1ba546f1b7597;/Users/khripunovpavel/Documents/my/lasagna/lasagna/src/app/features/widgets/jelly-widget/jelly-widget.component.ts */\n:host {\n  --control-bg: #fcfcfc;\n}\nlg-eggs-widget {\n  display: flex;\n}\n.eggs-widget {\n  display: flex;\n  flex-direction: column;\n}\n.eggs-widget__eggs {\n  display: flex;\n  align-items: flex-end;\n  gap: 8px;\n}\n.eggs-widget__eggs img {\n  width: 40px;\n}\n.eggs-widget__egg {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  flex: 1;\n  flex-direction: column;\n  white-space: nowrap;\n  gap: 8px;\n  background-color: var(--control-bg);\n  border-radius: 24px;\n  padding: 16px;\n}\n.eggs-widget__egg:first-child img {\n  transform: scale(0.8);\n}\n.eggs-widget__egg:last-child img {\n  transform: scale(1.2);\n}\n.eggs-widget__egg.selected {\n  background-color: #61b789;\n}\n.eggs-widget__egg.selected:first-child {\n  background-color: #b4b8f8;\n}\n.eggs-widget__egg.selected:last-child {\n  background-color: #ff8080;\n}\n/*# sourceMappingURL=jelly-widget.component.css.map */\n"], encapsulation: 2 });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(JellyWidgetComponent, [{
    type: Component,
    args: [{ selector: "lg-jelly-widget", standalone: true, template: `
    <lg-flex-column>
      <form [formGroup]="form">
        <lg-flex-column [size]="'medium'">
          <lg-flex-row [bottom]="true" [mobileMode]="true">
            <lg-flex-column formGroupName="from">
              <span>{{ 'jelly.in-recipe-you-have' | translate }}</span>

              <lg-number-input [placeholder]="''"
                               formControlName="amount"
                               lgParseMath>
                <ng-template lgExtraTpl place="after">
                  {{ 'jelly.grams-of' | translate }}
                </ng-template>
              </lg-number-input>

              <lg-range
                [max]="220"
                [min]="120"
                [step]="10"
                [tickInterval]="20"
                formControlName="bloom"
              ></lg-range>

              <lg-buttons-group [items]="typeButtons" formControlName="type"></lg-buttons-group>
            </lg-flex-column>


            <lg-flex-column formGroupName="to">
              @let fromType = form.value?.from?.type;
              @let toType = form.value?.to?.type;
              <lg-flex-row [strictCenter]="true" class="text-center">
                <lg-flex-column [position]="'center'" [size]="'small'" lgShrink>
                  <div>
                    {{ 'jelly.you-need' | translate }}
                  </div>

                  <lg-flex-row [size]="'small'" style="font-size: 2rem">
                    <div>{{ result() | number: '1.0-2' }}</div>
                    @switch (toType) {
                      @case ("powder") {
                        \u{1F35A}
                      }
                      @case ("leaf") {
                        \u{1F343}
                      }
                      @case ("mass") {
                        \u{1F9EB}
                      }
                    }
                  </lg-flex-row>

                  <div>
                    {{ 'jelly.grams-of' | translate }}
                  </div>
                </lg-flex-column>
                @if (waterNeeded()) {
                  <lg-flex-column lgShrink [size]="'small'" [position]="'center'">
                    <div>
                      @switch (toType) {
                        @case ("mass") {
                          <div>
                            {{ 'jelly.with' | translate }}
                          </div>
                        }
                      }

                      @switch (toType) {
                        @case ("powder") {
                          <div>
                            {{ 'jelly.and' | translate }}
                          </div>
                        }
                        @case ("leaf") {
                          <div>
                            {{ 'jelly.and' | translate }}
                          </div>
                        }
                      }
                    </div>

                    <lg-flex-row [size]="'small'" style="font-size: 2rem">
                      <div>{{ waterNeeded() | number: '1.0-2' }}</div>
                      \u{1F4A7}
                    </lg-flex-row>

                    <div>
                      {{ 'jelly.ml-of-water' | translate }}
                      @switch (toType) {
                        @case ("mass") {
                          <br>{{ 'jelly.included' | translate }}
                        }
                      }
                    </div>
                  </lg-flex-column>
                }
              </lg-flex-row>

              <lg-range
                [max]="220"
                [min]="120"
                [step]="10"
                [tickInterval]="20"
                formControlName="bloom"
              ></lg-range>

              <lg-buttons-group [items]="typeButtons" formControlName="type"></lg-buttons-group>
            </lg-flex-column>
          </lg-flex-row>

          <div class="text-small" lgPull>
            @let currentRatio = form.value?.ratio;
            <lg-flex-row [size]="'small'">
              <span>{{ 'jelly.proportion-label' | translate }}:</span>
              <lg-button (onClick)="changeRatio(5)"
                         [outlined]="true"
                         [size]="'tiny'"
                         [style]="currentRatio === 5 ? 'primary' : 'secondary-dark'">
                1/5
              </lg-button>
              <lg-button (onClick)="changeRatio(6)"
                         [outlined]="true"
                         [size]="'tiny'"
                         [style]="currentRatio === 6 ? 'primary' : 'secondary-dark'">
                1/6
              </lg-button>
            </lg-flex-row>
          </div>
        </lg-flex-column>
      </form>
    </lg-flex-column>
  `, imports: [
      FormsModule,
      ReactiveFormsModule,
      FlexColumnComponent,
      FlexRowComponent,
      ButtonsGroupComponent,
      DecimalPipe,
      ShrinkDirective,
      RangeComponent,
      NumberInputComponent,
      ParseMathDirective,
      ControlExtraTemplateDirective,
      TranslatePipe,
      PullDirective,
      ButtonComponent
    ], encapsulation: ViewEncapsulation.None, styles: ["/* angular:styles/component:scss;5a39d192d96ec09463df6f20ba4b5531f431e94c284e4b4879a1ba546f1b7597;/Users/khripunovpavel/Documents/my/lasagna/lasagna/src/app/features/widgets/jelly-widget/jelly-widget.component.ts */\n:host {\n  --control-bg: #fcfcfc;\n}\nlg-eggs-widget {\n  display: flex;\n}\n.eggs-widget {\n  display: flex;\n  flex-direction: column;\n}\n.eggs-widget__eggs {\n  display: flex;\n  align-items: flex-end;\n  gap: 8px;\n}\n.eggs-widget__eggs img {\n  width: 40px;\n}\n.eggs-widget__egg {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  flex: 1;\n  flex-direction: column;\n  white-space: nowrap;\n  gap: 8px;\n  background-color: var(--control-bg);\n  border-radius: 24px;\n  padding: 16px;\n}\n.eggs-widget__egg:first-child img {\n  transform: scale(0.8);\n}\n.eggs-widget__egg:last-child img {\n  transform: scale(1.2);\n}\n.eggs-widget__egg.selected {\n  background-color: #61b789;\n}\n.eggs-widget__egg.selected:first-child {\n  background-color: #b4b8f8;\n}\n.eggs-widget__egg.selected:last-child {\n  background-color: #ff8080;\n}\n/*# sourceMappingURL=jelly-widget.component.css.map */\n"] }]
  }], () => [], null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(JellyWidgetComponent, { className: "JellyWidgetComponent", filePath: "src/app/features/widgets/jelly-widget/jelly-widget.component.ts", lineNumber: 232 });
})();
export {
  JellyWidgetComponent
};
//# sourceMappingURL=chunk-DJ7D2QE5.js.map
