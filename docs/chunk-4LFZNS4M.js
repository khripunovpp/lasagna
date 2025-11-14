import {
  marker
} from "./chunk-5PDR5QLJ.js";
import {
  UnitValue
} from "./chunk-OOJ6JS4B.js";
import {
  NG_VALUE_ACCESSOR
} from "./chunk-RTCNHMN6.js";
import {
  TranslatePipe
} from "./chunk-DXRFKXPR.js";
import {
  Component,
  Input,
  ViewEncapsulation,
  effect,
  forwardRef,
  input,
  setClassMetadata,
  signal,
  ɵsetClassDebugInfo,
  ɵɵProvidersFeature,
  ɵɵadvance,
  ɵɵclassProp,
  ɵɵconditional,
  ɵɵconditionalCreate,
  ɵɵdefineComponent,
  ɵɵdomElementEnd,
  ɵɵdomElementStart,
  ɵɵdomListener,
  ɵɵgetCurrentView,
  ɵɵnextContext,
  ɵɵpipe,
  ɵɵpipeBind1,
  ɵɵrepeater,
  ɵɵrepeaterCreate,
  ɵɵresetView,
  ɵɵrestoreView,
  ɵɵstyleMap,
  ɵɵtext,
  ɵɵtextInterpolate1
} from "./chunk-RQATVJ2P.js";

// src/app/shared/view/ui/unit-switcher.component.ts
var _forTrack0 = ($index, $item) => $item.value;
function UnitSwitcherComponent_For_2_Conditional_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275domElementStart(0, "span", 2);
    \u0275\u0275text(1, "/");
    \u0275\u0275domElementEnd();
  }
}
function UnitSwitcherComponent_For_2_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275domElementStart(0, "button", 1);
    \u0275\u0275domListener("click", function UnitSwitcherComponent_For_2_Template_button_click_0_listener() {
      const ctx_r1 = \u0275\u0275restoreView(_r1);
      const item_r3 = ctx_r1.$implicit;
      const \u0275$index_3_r4 = ctx_r1.$index;
      const ctx_r4 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r4.onClickItem(item_r3, \u0275$index_3_r4));
    });
    \u0275\u0275text(1);
    \u0275\u0275pipe(2, "translate");
    \u0275\u0275domElementEnd();
    \u0275\u0275conditionalCreate(3, UnitSwitcherComponent_For_2_Conditional_3_Template, 2, 0, "span", 2);
  }
  if (rf & 2) {
    const item_r3 = ctx.$implicit;
    const \u0275$index_3_r4 = ctx.$index;
    const \u0275$count_3_r6 = ctx.$count;
    const ctx_r4 = \u0275\u0275nextContext();
    \u0275\u0275styleMap(item_r3.style || "default");
    \u0275\u0275classProp("active", ctx_r4.activeIndex() == \u0275$index_3_r4)("unit-switcher__item--active", ctx_r4.activeIndex() == \u0275$index_3_r4);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind1(2, 8, item_r3.label), " ");
    \u0275\u0275advance(2);
    \u0275\u0275conditional(!(\u0275$index_3_r4 === \u0275$count_3_r6 - 1) ? 3 : -1);
  }
}
var UnitSwitcherComponent = class _UnitSwitcherComponent {
  flat = false;
  disable = false;
  items = input([
    {
      label: marker("unit.gram"),
      value: UnitValue.GRAM,
      style: "secondary"
    },
    {
      label: marker("unit.kilogram"),
      value: UnitValue.KILOGRAM,
      style: "secondary"
    },
    {
      label: marker("unit.piece"),
      value: UnitValue.PIECE,
      style: "secondary"
    }
  ], ...ngDevMode ? [{ debugName: "items" }] : []);
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
  static \u0275fac = function UnitSwitcherComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _UnitSwitcherComponent)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _UnitSwitcherComponent, selectors: [["lg-unit-switcher"]], inputs: { flat: "flat", disable: "disable", items: [1, "items"] }, features: [\u0275\u0275ProvidersFeature([
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => _UnitSwitcherComponent),
      multi: true
    }
  ])], decls: 3, vars: 2, consts: [[1, "unit-switcher"], [1, "unit-switcher__item", 3, "click"], [1, "unit-switcher__item-separator"]], template: function UnitSwitcherComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275domElementStart(0, "div", 0);
      \u0275\u0275repeaterCreate(1, UnitSwitcherComponent_For_2_Template, 4, 10, null, null, _forTrack0);
      \u0275\u0275domElementEnd();
    }
    if (rf & 2) {
      \u0275\u0275classProp("disable", ctx.disable);
      \u0275\u0275advance();
      \u0275\u0275repeater(ctx.items());
    }
  }, dependencies: [TranslatePipe], styles: ["/* angular:styles/component:scss;aea7cd97eb069367c72dd24cbe368a1f946009472360f01d829ee769e54b3384;/Users/khripunovpavel/Documents/my/lasagna/lasagna/src/app/shared/view/ui/unit-switcher.component.ts */\n.unit-switcher {\n  --unit-switcher-gap: 2px;\n  display: flex;\n  gap: var(--unit-switcher-gap);\n  align-items: center;\n  justify-content: center;\n}\n.unit-switcher.disable {\n  opacity: 0.5;\n  pointer-events: none;\n}\n.unit-switcher__item {\n  display: flex;\n  gap: var(--unit-switcher-gap);\n  align-items: center;\n  justify-content: center;\n  cursor: pointer;\n  padding: var(--unit-switcher-gap);\n  appearance: none;\n  border: none;\n  background: none;\n  color: inherit;\n  font-family: inherit;\n  font-size: 0.8rem;\n}\n.unit-switcher__item.active {\n  color: var(--active-color);\n}\n.unit-switcher__item.active .unit-switcher__item-separator {\n  color: var(--text-color);\n}\n/*# sourceMappingURL=unit-switcher.component.css.map */\n"], encapsulation: 2 });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(UnitSwitcherComponent, [{
    type: Component,
    args: [{ selector: "lg-unit-switcher", standalone: true, template: `
      <div class="unit-switcher"
           [class.disable]="disable">
          @for (item of items();track item.value;let last = $last, first = $first, index = $index) {
              <button (click)="onClickItem(item,index)"
                      [style]="item.style || 'default'"
                      [class.active]="activeIndex() == index"
                      class="unit-switcher__item"
                      [class.unit-switcher__item--active]="activeIndex() == index">
                  {{ item.label | translate }}
              </button>@if (!last) {
                  <span class="unit-switcher__item-separator">/</span>
              }
          }
      </div>
  `, imports: [
      TranslatePipe
    ], encapsulation: ViewEncapsulation.None, providers: [
      {
        provide: NG_VALUE_ACCESSOR,
        useExisting: forwardRef(() => UnitSwitcherComponent),
        multi: true
      }
    ], styles: ["/* angular:styles/component:scss;aea7cd97eb069367c72dd24cbe368a1f946009472360f01d829ee769e54b3384;/Users/khripunovpavel/Documents/my/lasagna/lasagna/src/app/shared/view/ui/unit-switcher.component.ts */\n.unit-switcher {\n  --unit-switcher-gap: 2px;\n  display: flex;\n  gap: var(--unit-switcher-gap);\n  align-items: center;\n  justify-content: center;\n}\n.unit-switcher.disable {\n  opacity: 0.5;\n  pointer-events: none;\n}\n.unit-switcher__item {\n  display: flex;\n  gap: var(--unit-switcher-gap);\n  align-items: center;\n  justify-content: center;\n  cursor: pointer;\n  padding: var(--unit-switcher-gap);\n  appearance: none;\n  border: none;\n  background: none;\n  color: inherit;\n  font-family: inherit;\n  font-size: 0.8rem;\n}\n.unit-switcher__item.active {\n  color: var(--active-color);\n}\n.unit-switcher__item.active .unit-switcher__item-separator {\n  color: var(--text-color);\n}\n/*# sourceMappingURL=unit-switcher.component.css.map */\n"] }]
  }], null, { flat: [{
    type: Input
  }], disable: [{
    type: Input
  }] });
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(UnitSwitcherComponent, { className: "UnitSwitcherComponent", filePath: "src/app/shared/view/ui/unit-switcher.component.ts", lineNumber: 88 });
})();

export {
  UnitSwitcherComponent
};
//# sourceMappingURL=chunk-4LFZNS4M.js.map
