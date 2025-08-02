import {
  InputComponent
} from "./chunk-AO5PP7UL.js";
import {
  FlexColumnComponent
} from "./chunk-54ALPN33.js";
import {
  TitleComponent
} from "./chunk-HAWQY6NL.js";
import {
  FormsModule,
  NgControlStatus,
  NgModel,
  TranslatePipe
} from "./chunk-RPP3IG6S.js";
import {
  DecimalPipe
} from "./chunk-U34SFCSO.js";
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
  ɵɵpipeBind1,
  ɵɵpipeBind2,
  ɵɵproperty,
  ɵɵtext,
  ɵɵtextInterpolate1,
  ɵɵtextInterpolate2,
  ɵɵtwoWayBindingSet,
  ɵɵtwoWayListener,
  ɵɵtwoWayProperty
} from "./chunk-KM6KLH7M.js";

// src/app/shared/view/widgets/eggs-widget/eggs-widget.component.ts
function EggsWidgetComponent_Conditional_11_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275text(0);
    \u0275\u0275pipe(1, "number");
    \u0275\u0275pipe(2, "translate");
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275textInterpolate2(" ~ ", \u0275\u0275pipeBind2(1, 2, ctx_r0.calculated(), "1."), " ", \u0275\u0275pipeBind1(2, 5, "widgets.eggs.grams"), " ");
  }
}
function EggsWidgetComponent_Conditional_16_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275text(0);
    \u0275\u0275pipe(1, "number");
    \u0275\u0275pipe(2, "translate");
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275textInterpolate2(" ~ ", \u0275\u0275pipeBind2(1, 2, ctx_r0.calculated(), "1."), " ", \u0275\u0275pipeBind1(2, 5, "widgets.eggs.grams"), " ");
  }
}
function EggsWidgetComponent_Conditional_21_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275text(0);
    \u0275\u0275pipe(1, "number");
    \u0275\u0275pipe(2, "translate");
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275textInterpolate2(" ~ ", \u0275\u0275pipeBind2(1, 2, ctx_r0.calculated(), "1."), " ", \u0275\u0275pipeBind1(2, 5, "widgets.eggs.grams"), " ");
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
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _EggsWidgetComponent, selectors: [["lg-eggs-widget"]], inputs: { eggs: [1, "eggs"] }, outputs: { eggs: "eggsChange", changed: "changed" }, decls: 22, vars: 27, consts: [[3, "size"], [3, "ngModelChange", "ngModel", "placeholder", "theme"], [1, "eggs-widget__eggs"], [1, "eggs-widget__egg", 3, "click"], ["alt", "Egg", "src", "img/egg.svg"]], template: function EggsWidgetComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "lg-flex-column", 0)(1, "lg-title");
      \u0275\u0275text(2);
      \u0275\u0275pipe(3, "translate");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(4, "lg-input", 1);
      \u0275\u0275pipe(5, "translate");
      \u0275\u0275twoWayListener("ngModelChange", function EggsWidgetComponent_Template_lg_input_ngModelChange_4_listener($event) {
        \u0275\u0275twoWayBindingSet(ctx.eggs, $event) || (ctx.eggs = $event);
        return $event;
      });
      \u0275\u0275listener("ngModelChange", function EggsWidgetComponent_Template_lg_input_ngModelChange_4_listener() {
        return ctx.changed.emit(ctx.calculated());
      });
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(6, "div", 2)(7, "div", 3);
      \u0275\u0275listener("click", function EggsWidgetComponent_Template_div_click_7_listener() {
        return ctx.onChooseEggSize("small");
      });
      \u0275\u0275element(8, "img", 4);
      \u0275\u0275text(9);
      \u0275\u0275pipe(10, "translate");
      \u0275\u0275conditionalCreate(11, EggsWidgetComponent_Conditional_11_Template, 3, 7);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(12, "div", 3);
      \u0275\u0275listener("click", function EggsWidgetComponent_Template_div_click_12_listener() {
        return ctx.onChooseEggSize("medium");
      });
      \u0275\u0275element(13, "img", 4);
      \u0275\u0275text(14);
      \u0275\u0275pipe(15, "translate");
      \u0275\u0275conditionalCreate(16, EggsWidgetComponent_Conditional_16_Template, 3, 7);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(17, "div", 3);
      \u0275\u0275listener("click", function EggsWidgetComponent_Template_div_click_17_listener() {
        return ctx.onChooseEggSize("large");
      });
      \u0275\u0275element(18, "img", 4);
      \u0275\u0275text(19);
      \u0275\u0275pipe(20, "translate");
      \u0275\u0275conditionalCreate(21, EggsWidgetComponent_Conditional_21_Template, 3, 7);
      \u0275\u0275elementEnd()()();
    }
    if (rf & 2) {
      \u0275\u0275property("size", "medium");
      \u0275\u0275advance(2);
      \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind1(3, 17, "widgets.eggs.convert-title"), " ");
      \u0275\u0275advance(2);
      \u0275\u0275twoWayProperty("ngModel", ctx.eggs);
      \u0275\u0275property("placeholder", \u0275\u0275pipeBind1(5, 19, "widgets.eggs.placeholder"))("theme", "contrast");
      \u0275\u0275advance(3);
      \u0275\u0275classProp("selected", ctx.selected() === "small");
      \u0275\u0275advance(2);
      \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind1(10, 21, "widgets.eggs.size.small"), " ");
      \u0275\u0275advance(2);
      \u0275\u0275conditional(ctx.selected() === "small" && ctx.calculated() ? 11 : -1);
      \u0275\u0275advance();
      \u0275\u0275classProp("selected", ctx.selected() === "medium");
      \u0275\u0275advance(2);
      \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind1(15, 23, "widgets.eggs.size.medium"), " ");
      \u0275\u0275advance(2);
      \u0275\u0275conditional(ctx.selected() === "medium" && ctx.calculated() ? 16 : -1);
      \u0275\u0275advance();
      \u0275\u0275classProp("selected", ctx.selected() === "large");
      \u0275\u0275advance(2);
      \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind1(20, 25, "widgets.eggs.size.large"), " ");
      \u0275\u0275advance(2);
      \u0275\u0275conditional(ctx.selected() === "large" && ctx.calculated() ? 21 : -1);
    }
  }, dependencies: [
    FormsModule,
    NgControlStatus,
    NgModel,
    InputComponent,
    FlexColumnComponent,
    TitleComponent,
    DecimalPipe,
    TranslatePipe
  ], styles: ["/* angular:styles/component:scss;5a39d192d96ec09463df6f20ba4b5531f431e94c284e4b4879a1ba546f1b7597;/Users/khripunovpavel/Documents/my/lasagna/lasagna/src/app/shared/view/widgets/eggs-widget/eggs-widget.component.ts */\n:host {\n  --control-bg: #fcfcfc;\n}\nlg-eggs-widget {\n  display: flex;\n}\n.eggs-widget {\n  display: flex;\n  flex-direction: column;\n}\n.eggs-widget__eggs {\n  display: flex;\n  align-items: flex-end;\n  gap: 8px;\n}\n.eggs-widget__eggs img {\n  width: 40px;\n}\n.eggs-widget__egg {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  flex: 1;\n  flex-direction: column;\n  white-space: nowrap;\n  gap: 8px;\n  background-color: var(--control-bg);\n  border-radius: 24px;\n  padding: 16px;\n}\n.eggs-widget__egg:first-child img {\n  transform: scale(0.8);\n}\n.eggs-widget__egg:last-child img {\n  transform: scale(1.2);\n}\n.eggs-widget__egg.selected {\n  background-color: #61b789;\n}\n.eggs-widget__egg.selected:first-child {\n  background-color: #b4b8f8;\n}\n.eggs-widget__egg.selected:last-child {\n  background-color: #ff8080;\n}\n/*# sourceMappingURL=eggs-widget.component.css.map */\n"], encapsulation: 2 });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(EggsWidgetComponent, [{
    type: Component,
    args: [{ selector: "lg-eggs-widget", standalone: true, template: `
      <lg-flex-column [size]="'medium'">
          <lg-title>
              {{ 'widgets.eggs.convert-title' | translate }}
          </lg-title>

          <lg-input [(ngModel)]="eggs"
                    (ngModelChange)="changed.emit(calculated())"
                    [placeholder]="'widgets.eggs.placeholder' | translate"
                    [theme]="'contrast'"></lg-input>
          <div class="eggs-widget__eggs">
              <div (click)="onChooseEggSize('small')"
                   [class.selected]="selected() === 'small'"
                   class="eggs-widget__egg">
                  <img alt="Egg" src="img/egg.svg">
                  {{ 'widgets.eggs.size.small' | translate }}
                  @if (selected() === 'small' && calculated()) {
                      ~ {{ calculated() | number: '1.' }} {{ 'widgets.eggs.grams' | translate }}
                  }
              </div>
              <div (click)="onChooseEggSize('medium')"
                   [class.selected]="selected() === 'medium'"
                   class="eggs-widget__egg">
                  <img alt="Egg" src="img/egg.svg">
                  {{ 'widgets.eggs.size.medium' | translate }}

                  @if (selected() === 'medium' && calculated()) {
                      ~ {{ calculated() | number: '1.' }} {{ 'widgets.eggs.grams' | translate }}
                  }
              </div>
              <div (click)="onChooseEggSize('large')"
                   [class.selected]="selected() === 'large'"
                   class="eggs-widget__egg">
                  <img alt="Egg" src="img/egg.svg">
                  {{ 'widgets.eggs.size.large' | translate }}

                  @if (selected() === 'large' && calculated()) {
                      ~ {{ calculated() | number: '1.' }} {{ 'widgets.eggs.grams' | translate }}
                  }
              </div>
          </div>
      </lg-flex-column>
  `, imports: [
      FormsModule,
      InputComponent,
      FlexColumnComponent,
      TitleComponent,
      DecimalPipe,
      TranslatePipe
    ], encapsulation: ViewEncapsulation.None, styles: ["/* angular:styles/component:scss;5a39d192d96ec09463df6f20ba4b5531f431e94c284e4b4879a1ba546f1b7597;/Users/khripunovpavel/Documents/my/lasagna/lasagna/src/app/shared/view/widgets/eggs-widget/eggs-widget.component.ts */\n:host {\n  --control-bg: #fcfcfc;\n}\nlg-eggs-widget {\n  display: flex;\n}\n.eggs-widget {\n  display: flex;\n  flex-direction: column;\n}\n.eggs-widget__eggs {\n  display: flex;\n  align-items: flex-end;\n  gap: 8px;\n}\n.eggs-widget__eggs img {\n  width: 40px;\n}\n.eggs-widget__egg {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  flex: 1;\n  flex-direction: column;\n  white-space: nowrap;\n  gap: 8px;\n  background-color: var(--control-bg);\n  border-radius: 24px;\n  padding: 16px;\n}\n.eggs-widget__egg:first-child img {\n  transform: scale(0.8);\n}\n.eggs-widget__egg:last-child img {\n  transform: scale(1.2);\n}\n.eggs-widget__egg.selected {\n  background-color: #61b789;\n}\n.eggs-widget__egg.selected:first-child {\n  background-color: #b4b8f8;\n}\n.eggs-widget__egg.selected:last-child {\n  background-color: #ff8080;\n}\n/*# sourceMappingURL=eggs-widget.component.css.map */\n"] }]
  }], null, null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(EggsWidgetComponent, { className: "EggsWidgetComponent", filePath: "src/app/shared/view/widgets/eggs-widget/eggs-widget.component.ts", lineNumber: 124 });
})();

export {
  EggsWidgetComponent
};
//# sourceMappingURL=chunk-27QURH5K.js.map
