import {
  NG_VALUE_ACCESSOR
} from "./chunk-35FYRUF7.js";
import {
  Component,
  HostBinding,
  Input,
  forwardRef,
  input,
  setClassMetadata,
  ɵsetClassDebugInfo,
  ɵɵProvidersFeature,
  ɵɵadvance,
  ɵɵattribute,
  ɵɵclassProp,
  ɵɵdefineComponent,
  ɵɵdomElementEnd,
  ɵɵdomElementStart,
  ɵɵdomListener,
  ɵɵgetCurrentView,
  ɵɵnextContext,
  ɵɵrepeater,
  ɵɵrepeaterCreate,
  ɵɵresetView,
  ɵɵrestoreView,
  ɵɵstyleProp,
  ɵɵtext,
  ɵɵtextInterpolate1
} from "./chunk-CHNANXCD.js";

// src/app/features/controls/form/chips-list.component.ts
var _forTrack0 = ($index, $item) => $item.label;
function ChipsListComponent_For_2_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275domElementStart(0, "span", 2);
    \u0275\u0275domListener("click", function ChipsListComponent_For_2_Template_span_click_0_listener() {
      const item_r2 = \u0275\u0275restoreView(_r1).$implicit;
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.onSelect(item_r2));
    });
    \u0275\u0275text(1);
    \u0275\u0275domElementEnd();
  }
  if (rf & 2) {
    const item_r2 = ctx.$implicit;
    const \u0275$index_3_r4 = ctx.$index;
    const \u0275$count_3_r5 = ctx.$count;
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275styleProp("--chip-color", item_r2.color);
    \u0275\u0275classProp("selected", item_r2.value === ctx_r2.value);
    \u0275\u0275attribute("data-last", \u0275$index_3_r4 === \u0275$count_3_r5 - 1 ? true : null);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", item_r2.label, " ");
  }
}
var ChipsListComponent = class _ChipsListComponent {
  constructor() {
  }
  chipColor = "var(--chip-default-bg)";
  control = input(...ngDevMode ? [void 0, { debugName: "control" }] : []);
  items = [];
  onChangeFn;
  value;
  selectedItem;
  onSelect = (item) => {
    this.applyValue(item.value);
  };
  registerOnChange(fn) {
    this.onChangeFn = fn;
  }
  registerOnTouched(fn) {
  }
  writeValue(obj) {
    this.applyValue(obj);
  }
  applyValue(value) {
    this.value = value;
    this.onChangeFn?.(value);
    this.control()?.writeValue(value);
  }
  ngOnInit() {
  }
  clearSelected() {
    this.value = null;
  }
  static \u0275fac = function ChipsListComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _ChipsListComponent)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _ChipsListComponent, selectors: [["lg-chips-list"]], hostVars: 2, hostBindings: function ChipsListComponent_HostBindings(rf, ctx) {
    if (rf & 2) {
      \u0275\u0275styleProp("--chip-color", ctx.chipColor);
    }
  }, inputs: { control: [1, "control"], items: "items" }, features: [\u0275\u0275ProvidersFeature([
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => _ChipsListComponent),
      multi: true
    }
  ])], decls: 3, vars: 0, consts: [[1, "chips-list"], [1, "chip", 3, "--chip-color", "selected"], [1, "chip", 3, "click"]], template: function ChipsListComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275domElementStart(0, "div", 0);
      \u0275\u0275repeaterCreate(1, ChipsListComponent_For_2_Template, 2, 6, "span", 1, _forTrack0);
      \u0275\u0275domElementEnd();
    }
    if (rf & 2) {
      \u0275\u0275advance();
      \u0275\u0275repeater(ctx.items);
    }
  }, styles: ["\n\n.chips-list[_ngcontent-%COMP%] {\n  display: flex;\n  flex-wrap: wrap;\n  gap: 8px;\n}\n.chip[_ngcontent-%COMP%] {\n  background-color: var(--chip-color);\n  color: #fff;\n  padding: 4px 8px;\n  border-radius: 16px;\n  font-size: 0.875rem;\n  display: inline-block;\n  cursor: pointer;\n  transition: all 0.2s;\n  transition-timing-function: cubic-bezier(0.47, 1.64, 0.41, 0.8);\n}\n.chip.selected[_ngcontent-%COMP%] {\n  opacity: 0.5;\n}\n.chip[_ngcontent-%COMP%]:hover {\n  transform: scale(1.1);\n}\n/*# sourceMappingURL=chips-list.component.css.map */"] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(ChipsListComponent, [{
    type: Component,
    args: [{ selector: "lg-chips-list", standalone: true, template: `
      <div class="chips-list">
          @for (item of items;track item.label;let last = $last) {
              <span class="chip"
                    [style.--chip-color]="item.color"
                    (click)="onSelect(item)"
                    [class.selected]="item.value === value"
                    [attr.data-last]="last ? true : null">
                  {{ item.label }}
              </span>
          }
      </div>
  `, providers: [
      {
        provide: NG_VALUE_ACCESSOR,
        useExisting: forwardRef(() => ChipsListComponent),
        multi: true
      }
    ], imports: [], styles: ["/* angular:styles/component:scss;7777a42021a68d218ff8fb9b2102972de2059f6854fb59cb8a43fbea6e671dc0;/Users/khripunovpavel/Documents/my/lasagna/lasagna/src/app/features/controls/form/chips-list.component.ts */\n.chips-list {\n  display: flex;\n  flex-wrap: wrap;\n  gap: 8px;\n}\n.chip {\n  background-color: var(--chip-color);\n  color: #fff;\n  padding: 4px 8px;\n  border-radius: 16px;\n  font-size: 0.875rem;\n  display: inline-block;\n  cursor: pointer;\n  transition: all 0.2s;\n  transition-timing-function: cubic-bezier(0.47, 1.64, 0.41, 0.8);\n}\n.chip.selected {\n  opacity: 0.5;\n}\n.chip:hover {\n  transform: scale(1.1);\n}\n/*# sourceMappingURL=chips-list.component.css.map */\n"] }]
  }], () => [], { chipColor: [{
    type: HostBinding,
    args: ["style.--chip-color"]
  }], items: [{
    type: Input
  }] });
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(ChipsListComponent, { className: "ChipsListComponent", filePath: "src/app/features/controls/form/chips-list.component.ts", lineNumber: 60 });
})();

export {
  ChipsListComponent
};
//# sourceMappingURL=chunk-7ZHPBI2T.js.map
