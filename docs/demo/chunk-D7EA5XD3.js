import {
  InputComponent
} from "./chunk-MGKNDLQM.js";
import {
  GapColumnComponent
} from "./chunk-5CDCXM6R.js";
import {
  TitleComponent
} from "./chunk-F2TP5Q2W.js";
import {
  FormsModule,
  NgControlStatus,
  NgModel
} from "./chunk-EH6A44OR.js";
import {
  DecimalPipe
} from "./chunk-5MHPI2FA.js";
import {
  Component,
  ViewEncapsulation,
  computed,
  model,
  output,
  setClassMetadata,
  signal,
  ɵsetClassDebugInfo,
  ɵɵadvance,
  ɵɵclassProp,
  ɵɵconditional,
  ɵɵconditionalCreate,
  ɵɵdefineComponent,
  ɵɵelement,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵlistener,
  ɵɵnextContext,
  ɵɵpipe,
  ɵɵpipeBind2,
  ɵɵproperty,
  ɵɵtext,
  ɵɵtextInterpolate1,
  ɵɵtwoWayBindingSet,
  ɵɵtwoWayListener,
  ɵɵtwoWayProperty
} from "./chunk-6AETQSBA.js";

// src/app/shared/view/widgets/eggs-widget/eggs-widget.component.ts
function EggsWidgetComponent_Conditional_8_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275text(0);
    \u0275\u0275pipe(1, "number");
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275textInterpolate1(" ~ ", \u0275\u0275pipeBind2(1, 1, ctx_r0.calculated(), "1."), " grams ");
  }
}
function EggsWidgetComponent_Conditional_12_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275text(0);
    \u0275\u0275pipe(1, "number");
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275textInterpolate1(" ~ ", \u0275\u0275pipeBind2(1, 1, ctx_r0.calculated(), "1."), " grams ");
  }
}
function EggsWidgetComponent_Conditional_16_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275text(0);
    \u0275\u0275pipe(1, "number");
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275textInterpolate1(" ~ ", \u0275\u0275pipeBind2(1, 1, ctx_r0.calculated(), "1."), " grams ");
  }
}
var EggsWidgetComponent = class _EggsWidgetComponent {
  eggs = model(null);
  selected = signal("small");
  calculated = computed(() => {
    const number = parseFloat(this.eggs() ?? "");
    const eggWeight = {
      small: 46,
      medium: 50,
      large: 59
    };
    const weight = eggWeight[this.selected()];
    if (!number || !weight) {
      return "";
    }
    return number * weight;
  });
  changed = output();
  onChooseEggSize(size) {
    this.selected.set(size);
    this.changed.emit(this.calculated());
  }
  static \u0275fac = function EggsWidgetComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _EggsWidgetComponent)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _EggsWidgetComponent, selectors: [["lg-eggs-widget"]], inputs: { eggs: [1, "eggs"] }, outputs: { eggs: "eggsChange", changed: "changed" }, decls: 17, vars: 13, consts: [[3, "size"], [3, "ngModelChange", "ngModel", "placeholder", "theme"], [1, "eggs-widget__eggs"], [1, "eggs-widget__egg", 3, "click"], ["alt", "Egg", "src", "img/egg.svg"]], template: function EggsWidgetComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "lg-gap-column", 0)(1, "lg-title");
      \u0275\u0275text(2, " Convert eggs to grams ");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(3, "lg-input", 1);
      \u0275\u0275twoWayListener("ngModelChange", function EggsWidgetComponent_Template_lg_input_ngModelChange_3_listener($event) {
        \u0275\u0275twoWayBindingSet(ctx.eggs, $event) || (ctx.eggs = $event);
        return $event;
      });
      \u0275\u0275listener("ngModelChange", function EggsWidgetComponent_Template_lg_input_ngModelChange_3_listener() {
        return ctx.changed.emit(ctx.calculated());
      });
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(4, "div", 2)(5, "div", 3);
      \u0275\u0275listener("click", function EggsWidgetComponent_Template_div_click_5_listener() {
        return ctx.onChooseEggSize("small");
      });
      \u0275\u0275element(6, "img", 4);
      \u0275\u0275text(7, " Small ");
      \u0275\u0275conditionalCreate(8, EggsWidgetComponent_Conditional_8_Template, 2, 4);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(9, "div", 3);
      \u0275\u0275listener("click", function EggsWidgetComponent_Template_div_click_9_listener() {
        return ctx.onChooseEggSize("medium");
      });
      \u0275\u0275element(10, "img", 4);
      \u0275\u0275text(11, " Medium ");
      \u0275\u0275conditionalCreate(12, EggsWidgetComponent_Conditional_12_Template, 2, 4);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(13, "div", 3);
      \u0275\u0275listener("click", function EggsWidgetComponent_Template_div_click_13_listener() {
        return ctx.onChooseEggSize("large");
      });
      \u0275\u0275element(14, "img", 4);
      \u0275\u0275text(15, " Large ");
      \u0275\u0275conditionalCreate(16, EggsWidgetComponent_Conditional_16_Template, 2, 4);
      \u0275\u0275elementEnd()()();
    }
    if (rf & 2) {
      \u0275\u0275property("size", "medium");
      \u0275\u0275advance(3);
      \u0275\u0275twoWayProperty("ngModel", ctx.eggs);
      \u0275\u0275property("placeholder", "How many eggs do you have?")("theme", "contrast");
      \u0275\u0275advance(2);
      \u0275\u0275classProp("selected", ctx.selected() === "small");
      \u0275\u0275advance(3);
      \u0275\u0275conditional(ctx.selected() === "small" && ctx.calculated() ? 8 : -1);
      \u0275\u0275advance();
      \u0275\u0275classProp("selected", ctx.selected() === "medium");
      \u0275\u0275advance(3);
      \u0275\u0275conditional(ctx.selected() === "medium" && ctx.calculated() ? 12 : -1);
      \u0275\u0275advance();
      \u0275\u0275classProp("selected", ctx.selected() === "large");
      \u0275\u0275advance(3);
      \u0275\u0275conditional(ctx.selected() === "large" && ctx.calculated() ? 16 : -1);
    }
  }, dependencies: [
    FormsModule,
    NgControlStatus,
    NgModel,
    InputComponent,
    GapColumnComponent,
    TitleComponent,
    DecimalPipe
  ], styles: ["/* angular:styles/component:scss;5a39d192d96ec09463df6f20ba4b5531f431e94c284e4b4879a1ba546f1b7597;/Users/khripunovpavel/Documents/my/lasagna/lasagna/src/app/shared/view/widgets/eggs-widget/eggs-widget.component.ts */\n:host {\n  --control-bg: #fcfcfc;\n}\nlg-eggs-widget {\n  display: flex;\n}\n.eggs-widget {\n  display: flex;\n  flex-direction: column;\n}\n.eggs-widget__eggs {\n  display: flex;\n  align-items: flex-end;\n  gap: 8px;\n}\n.eggs-widget__eggs img {\n  width: 40px;\n}\n.eggs-widget__egg {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  flex: 1;\n  flex-direction: column;\n  white-space: nowrap;\n  gap: 8px;\n  background-color: var(--control-bg);\n  border-radius: 24px;\n  padding: 16px;\n}\n.eggs-widget__egg:first-child img {\n  transform: scale(0.8);\n}\n.eggs-widget__egg:last-child img {\n  transform: scale(1.2);\n}\n.eggs-widget__egg.selected {\n  background-color: #61b789;\n}\n.eggs-widget__egg.selected:first-child {\n  background-color: #b4b8f8;\n}\n.eggs-widget__egg.selected:last-child {\n  background-color: #ff8080;\n}\n/*# sourceMappingURL=eggs-widget.component.css.map */\n"], encapsulation: 2 });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(EggsWidgetComponent, [{
    type: Component,
    args: [{ selector: "lg-eggs-widget", standalone: true, template: `
      <lg-gap-column [size]="'medium'">
          <lg-title>
              Convert eggs to grams
          </lg-title>

          <lg-input [(ngModel)]="eggs"
                    (ngModelChange)="changed.emit(calculated())"
                    [placeholder]="'How many eggs do you have?'"
                    [theme]="'contrast'"></lg-input>
          <div class="eggs-widget__eggs">
              <div (click)="onChooseEggSize('small')"
                   [class.selected]="selected() === 'small'"
                   class="eggs-widget__egg">
                  <img alt="Egg" src="img/egg.svg">
                  Small
                  @if (selected() === 'small' && calculated()) {
                      ~ {{ calculated() | number: '1.' }} grams
                  }
              </div>
              <div (click)="onChooseEggSize('medium')"
                   [class.selected]="selected() === 'medium'"
                   class="eggs-widget__egg">
                  <img alt="Egg" src="img/egg.svg">
                  Medium

                  @if (selected() === 'medium' && calculated()) {
                      ~ {{ calculated() | number: '1.' }} grams
                  }
              </div>
              <div (click)="onChooseEggSize('large')"
                   [class.selected]="selected() === 'large'"
                   class="eggs-widget__egg">
                  <img alt="Egg" src="img/egg.svg">
                  Large

                  @if (selected() === 'large' && calculated()) {
                      ~ {{ calculated() | number: '1.' }} grams
                  }
              </div>
          </div>
      </lg-gap-column>
  `, imports: [
      FormsModule,
      InputComponent,
      GapColumnComponent,
      TitleComponent,
      DecimalPipe
    ], encapsulation: ViewEncapsulation.None, styles: ["/* angular:styles/component:scss;5a39d192d96ec09463df6f20ba4b5531f431e94c284e4b4879a1ba546f1b7597;/Users/khripunovpavel/Documents/my/lasagna/lasagna/src/app/shared/view/widgets/eggs-widget/eggs-widget.component.ts */\n:host {\n  --control-bg: #fcfcfc;\n}\nlg-eggs-widget {\n  display: flex;\n}\n.eggs-widget {\n  display: flex;\n  flex-direction: column;\n}\n.eggs-widget__eggs {\n  display: flex;\n  align-items: flex-end;\n  gap: 8px;\n}\n.eggs-widget__eggs img {\n  width: 40px;\n}\n.eggs-widget__egg {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  flex: 1;\n  flex-direction: column;\n  white-space: nowrap;\n  gap: 8px;\n  background-color: var(--control-bg);\n  border-radius: 24px;\n  padding: 16px;\n}\n.eggs-widget__egg:first-child img {\n  transform: scale(0.8);\n}\n.eggs-widget__egg:last-child img {\n  transform: scale(1.2);\n}\n.eggs-widget__egg.selected {\n  background-color: #61b789;\n}\n.eggs-widget__egg.selected:first-child {\n  background-color: #b4b8f8;\n}\n.eggs-widget__egg.selected:last-child {\n  background-color: #ff8080;\n}\n/*# sourceMappingURL=eggs-widget.component.css.map */\n"] }]
  }], null, null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(EggsWidgetComponent, { className: "EggsWidgetComponent", filePath: "src/app/shared/view/widgets/eggs-widget/eggs-widget.component.ts", lineNumber: 122 });
})();

export {
  EggsWidgetComponent
};
//# sourceMappingURL=chunk-D7EA5XD3.js.map
