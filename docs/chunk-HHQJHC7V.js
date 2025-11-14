import {
  NG_VALUE_ACCESSOR
} from "./chunk-4GKKNB6P.js";
import {
  TranslatePipe
} from "./chunk-KKROIGFS.js";
import {
  Component,
  Input,
  ViewEncapsulation,
  effect,
  forwardRef,
  output,
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
  ɵɵprojection,
  ɵɵprojectionDef,
  ɵɵrepeater,
  ɵɵrepeaterCreate,
  ɵɵresetView,
  ɵɵrestoreView,
  ɵɵtext,
  ɵɵtextInterpolate1
} from "./chunk-Z5TNFCCP.js";

// src/app/features/invoices/view/add-invoice/parts/entity-item-selector.component.ts
var _c0 = [[["custom-title"]], [["custom"]], [["products"]], [["recipes"]]];
var _c1 = ["custom-title", "custom", "products", "recipes"];
var _forTrack0 = ($index, $item) => $item.slug;
function EntityItemSelectorComponent_For_3_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275projection(0);
  }
}
function EntityItemSelectorComponent_For_3_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275text(0);
    \u0275\u0275pipe(1, "translate");
  }
  if (rf & 2) {
    const item_r3 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind1(1, 1, item_r3.title), " ");
  }
}
function EntityItemSelectorComponent_For_3_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275domElementStart(0, "button", 5);
    \u0275\u0275domListener("click", function EntityItemSelectorComponent_For_3_Template_button_click_0_listener() {
      const ctx_r1 = \u0275\u0275restoreView(_r1);
      const item_r3 = ctx_r1.$implicit;
      const \u0275$index_5_r4 = ctx_r1.$index;
      const ctx_r4 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r4.onClickItem(item_r3, \u0275$index_5_r4));
    });
    \u0275\u0275conditionalCreate(1, EntityItemSelectorComponent_For_3_Conditional_1_Template, 1, 0)(2, EntityItemSelectorComponent_For_3_Conditional_2_Template, 2, 3);
    \u0275\u0275domElementEnd();
  }
  if (rf & 2) {
    const item_r3 = ctx.$implicit;
    const \u0275$index_5_r4 = ctx.$index;
    const ctx_r4 = \u0275\u0275nextContext();
    \u0275\u0275classProp("active", ctx_r4.activeIndex() === \u0275$index_5_r4);
    \u0275\u0275advance();
    \u0275\u0275conditional(item_r3.slug === "custom" ? 1 : 2);
  }
}
function EntityItemSelectorComponent_For_6_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275projection(0, 1);
  }
}
function EntityItemSelectorComponent_For_6_Conditional_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275projection(0, 2);
  }
}
function EntityItemSelectorComponent_For_6_Conditional_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275projection(0, 3);
  }
}
function EntityItemSelectorComponent_For_6_Template(rf, ctx) {
  if (rf & 1) {
    const _r6 = \u0275\u0275getCurrentView();
    \u0275\u0275domElementStart(0, "div", 6);
    \u0275\u0275domListener("click", function EntityItemSelectorComponent_For_6_Template_div_click_0_listener() {
      const ctx_r6 = \u0275\u0275restoreView(_r6);
      const item_r8 = ctx_r6.$implicit;
      const \u0275$index_15_r9 = ctx_r6.$index;
      const ctx_r4 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r4.onClickItem(item_r8, \u0275$index_15_r9));
    });
    \u0275\u0275domElementStart(1, "div", 7);
    \u0275\u0275conditionalCreate(2, EntityItemSelectorComponent_For_6_Conditional_2_Template, 1, 0);
    \u0275\u0275conditionalCreate(3, EntityItemSelectorComponent_For_6_Conditional_3_Template, 1, 0);
    \u0275\u0275conditionalCreate(4, EntityItemSelectorComponent_For_6_Conditional_4_Template, 1, 0);
    \u0275\u0275domElementEnd()();
  }
  if (rf & 2) {
    const item_r8 = ctx.$implicit;
    const \u0275$index_15_r9 = ctx.$index;
    const ctx_r4 = \u0275\u0275nextContext();
    \u0275\u0275classProp("active", ctx_r4.activeIndex() === \u0275$index_15_r9);
    \u0275\u0275advance(2);
    \u0275\u0275conditional(item_r8.slug === "custom" ? 2 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(item_r8.slug === "product" ? 3 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(item_r8.slug === "recipe" ? 4 : -1);
  }
}
var EntityItemSelectorComponent = class _EntityItemSelectorComponent {
  flat = false;
  items = signal([
    {
      slug: "recipe",
      title: "entity-item.selector.recipe"
    },
    {
      slug: "product",
      title: "entity-item.selector.product"
    },
    {
      slug: "custom",
      title: "entity-item.selector.custom_item"
    }
  ], ...ngDevMode ? [{ debugName: "items" }] : []);
  activeIndex = signal(0, ...ngDevMode ? [{ debugName: "activeIndex" }] : []);
  value = signal("", ...ngDevMode ? [{ debugName: "value" }] : []);
  onChanged = output();
  effect = effect(() => {
    const activeIndex = this.items()?.findIndex((item) => item.slug === this.value()) ?? -1;
    this.activeIndex.set(activeIndex === -1 ? 0 : activeIndex);
  }, ...ngDevMode ? [{ debugName: "effect" }] : []);
  onClickItem(item, index) {
    this.activeIndex.set(index);
    this.writeValue(item.slug);
    this.onChanged.emit(item.slug);
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
  _change(value) {
    this.value.set(value);
    this.onChange(this.value());
  }
  static \u0275fac = function EntityItemSelectorComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _EntityItemSelectorComponent)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _EntityItemSelectorComponent, selectors: [["lg-entity-item-selector"]], inputs: { flat: "flat" }, outputs: { onChanged: "onChanged" }, features: [\u0275\u0275ProvidersFeature([
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => _EntityItemSelectorComponent),
      multi: true
    }
  ])], ngContentSelectors: _c1, decls: 7, vars: 0, consts: [[1, "entity-item-selector"], [1, "entity-item-selector__tabs"], [1, "entity-item-selector__tab", 3, "active"], [1, "entity-item-selector__body"], [1, "entity-item-selector__part", 3, "active"], [1, "entity-item-selector__tab", 3, "click"], [1, "entity-item-selector__part", 3, "click"], [1, "entity-item-selector__control"]], template: function EntityItemSelectorComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275projectionDef(_c0);
      \u0275\u0275domElementStart(0, "div", 0)(1, "div", 1);
      \u0275\u0275repeaterCreate(2, EntityItemSelectorComponent_For_3_Template, 3, 3, "button", 2, _forTrack0);
      \u0275\u0275domElementEnd();
      \u0275\u0275domElementStart(4, "div", 3);
      \u0275\u0275repeaterCreate(5, EntityItemSelectorComponent_For_6_Template, 5, 5, "div", 4, _forTrack0);
      \u0275\u0275domElementEnd()();
    }
    if (rf & 2) {
      \u0275\u0275advance(2);
      \u0275\u0275repeater(ctx.items());
      \u0275\u0275advance(3);
      \u0275\u0275repeater(ctx.items());
    }
  }, dependencies: [TranslatePipe], styles: ["/* angular:styles/component:scss;65fe3452d605f0ad127d5057b528debc718d7c21c82547037a7e3bb6d7c9db37;/Users/khripunovpavel/Documents/my/lasagna/lasagna/src/app/features/invoices/view/add-invoice/parts/entity-item-selector.component.ts */\n.entity-item-selector {\n  display: flex;\n  flex-direction: column;\n  position: relative;\n  padding-top: 27px;\n  --part-color-opacity: 0.5;\n}\n.entity-item-selector__tabs {\n  display: flex;\n  flex: 1;\n  gap: 8px;\n  position: absolute;\n  z-index: 1;\n  top: 0;\n  left: 0;\n  width: 100%;\n  white-space: nowrap;\n}\n.entity-item-selector__tab {\n  background-color: var(--part-color);\n  padding: 4px 12px;\n  border-radius: 8px 8px 0 0;\n  cursor: pointer;\n  opacity: var(--part-color-opacity, 0.2);\n  appearance: none;\n  color: inherit;\n  border: none;\n  font-family: inherit;\n  font-weight: 400;\n  font-size: 16px;\n  transform: translateY(8px) scale(0.95);\n  transition: transform 0.2s ease-in-out, opacity 0.2s ease-in-out;\n}\n.entity-item-selector__tab.active,\n.entity-item-selector__tab:hover {\n  --part-color-opacity: 1;\n  transform: translateY(0) scale(1);\n}\n.entity-item-selector__tab:focus {\n  outline: none;\n  box-shadow: var(--focus-shadow);\n  --part-color-opacity: 0.7;\n  transform: translateY(0) scale(1);\n}\n.entity-item-selector__body {\n  background-color: var(--control-bg);\n  border-radius: 0 12px 12px 12px;\n  gap: 16px;\n  position: relative;\n  z-index: 2;\n}\n.entity-item-selector__control {\n  display: none;\n  flex: 1;\n  width: 100%;\n}\n.entity-item-selector__part:nth-child(1),\n.entity-item-selector__tab:nth-child(1) {\n  --part-color: rgba(105, 185, 255, var(--part-color-opacity, 0.5));\n}\n.entity-item-selector__part:nth-child(2),\n.entity-item-selector__tab:nth-child(2) {\n  --part-color: rgba(108, 190, 108, var(--part-color-opacity, 0.5));\n}\n.entity-item-selector__part:nth-child(3),\n.entity-item-selector__tab:nth-child(3) {\n  --part-color: rgba(249, 189, 90, var(--part-color-opacity, 0.5));\n}\n.entity-item-selector__part {\n  display: flex;\n}\n.entity-item-selector__part.active {\n  flex: 1;\n}\n.entity-item-selector__part.active .entity-item-selector__control {\n  display: block;\n}\n/*# sourceMappingURL=entity-item-selector.component.css.map */\n"], encapsulation: 2 });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(EntityItemSelectorComponent, [{
    type: Component,
    args: [{ selector: "lg-entity-item-selector", standalone: true, template: `
    <div class="entity-item-selector">
      <div class="entity-item-selector__tabs">
        @for (item of items(); track item.slug; let last = $last, first = $first, index = $index) {
          <button class="entity-item-selector__tab"
                  [class.active]="activeIndex() === index"
                  (click)="onClickItem(item, index)">
            @if (item.slug === 'custom') {
              <ng-content select="custom-title"></ng-content>
            } @else {
              {{ item.title | translate }}
            }
          </button>
        }
      </div>
      <div class="entity-item-selector__body">
        @for (item of items(); track item.slug; let last = $last, first = $first, index = $index) {
          <div class="entity-item-selector__part"
               (click)="onClickItem(item, index)"
               [class.active]="activeIndex() === index">
            <div class="entity-item-selector__control">
              @if (item.slug === 'custom') {
                <ng-content select="custom"></ng-content>
              }
              @if (item.slug === 'product') {
                <ng-content select="products"></ng-content>
              }
              @if (item.slug === 'recipe') {
                <ng-content select="recipes"></ng-content>
              }
            </div>
          </div>
        }
      </div>
    </div>
  `, imports: [TranslatePipe], encapsulation: ViewEncapsulation.None, providers: [
      {
        provide: NG_VALUE_ACCESSOR,
        useExisting: forwardRef(() => EntityItemSelectorComponent),
        multi: true
      }
    ], styles: ["/* angular:styles/component:scss;65fe3452d605f0ad127d5057b528debc718d7c21c82547037a7e3bb6d7c9db37;/Users/khripunovpavel/Documents/my/lasagna/lasagna/src/app/features/invoices/view/add-invoice/parts/entity-item-selector.component.ts */\n.entity-item-selector {\n  display: flex;\n  flex-direction: column;\n  position: relative;\n  padding-top: 27px;\n  --part-color-opacity: 0.5;\n}\n.entity-item-selector__tabs {\n  display: flex;\n  flex: 1;\n  gap: 8px;\n  position: absolute;\n  z-index: 1;\n  top: 0;\n  left: 0;\n  width: 100%;\n  white-space: nowrap;\n}\n.entity-item-selector__tab {\n  background-color: var(--part-color);\n  padding: 4px 12px;\n  border-radius: 8px 8px 0 0;\n  cursor: pointer;\n  opacity: var(--part-color-opacity, 0.2);\n  appearance: none;\n  color: inherit;\n  border: none;\n  font-family: inherit;\n  font-weight: 400;\n  font-size: 16px;\n  transform: translateY(8px) scale(0.95);\n  transition: transform 0.2s ease-in-out, opacity 0.2s ease-in-out;\n}\n.entity-item-selector__tab.active,\n.entity-item-selector__tab:hover {\n  --part-color-opacity: 1;\n  transform: translateY(0) scale(1);\n}\n.entity-item-selector__tab:focus {\n  outline: none;\n  box-shadow: var(--focus-shadow);\n  --part-color-opacity: 0.7;\n  transform: translateY(0) scale(1);\n}\n.entity-item-selector__body {\n  background-color: var(--control-bg);\n  border-radius: 0 12px 12px 12px;\n  gap: 16px;\n  position: relative;\n  z-index: 2;\n}\n.entity-item-selector__control {\n  display: none;\n  flex: 1;\n  width: 100%;\n}\n.entity-item-selector__part:nth-child(1),\n.entity-item-selector__tab:nth-child(1) {\n  --part-color: rgba(105, 185, 255, var(--part-color-opacity, 0.5));\n}\n.entity-item-selector__part:nth-child(2),\n.entity-item-selector__tab:nth-child(2) {\n  --part-color: rgba(108, 190, 108, var(--part-color-opacity, 0.5));\n}\n.entity-item-selector__part:nth-child(3),\n.entity-item-selector__tab:nth-child(3) {\n  --part-color: rgba(249, 189, 90, var(--part-color-opacity, 0.5));\n}\n.entity-item-selector__part {\n  display: flex;\n}\n.entity-item-selector__part.active {\n  flex: 1;\n}\n.entity-item-selector__part.active .entity-item-selector__control {\n  display: block;\n}\n/*# sourceMappingURL=entity-item-selector.component.css.map */\n"] }]
  }], null, { flat: [{
    type: Input
  }] });
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(EntityItemSelectorComponent, { className: "EntityItemSelectorComponent", filePath: "src/app/features/invoices/view/add-invoice/parts/entity-item-selector.component.ts", lineNumber: 148 });
})();

export {
  EntityItemSelectorComponent
};
//# sourceMappingURL=chunk-HHQJHC7V.js.map
