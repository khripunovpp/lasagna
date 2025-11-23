import {
  InputComponent
} from "./chunk-USP6G3VL.js";
import {
  FormsModule,
  NgControlStatus,
  NgModel
} from "./chunk-2S3NUMNU.js";
import {
  TitleComponent
} from "./chunk-3AYILQJD.js";
import {
  FlexColumnComponent
} from "./chunk-K37ECZYU.js";
import {
  TranslatePipe
} from "./chunk-755Q3QHA.js";
import {
  DecimalPipe
} from "./chunk-X2X7GTPW.js";
import {
  Component,
  Input,
  Output,
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
  ɵɵgetCurrentView,
  ɵɵlistener,
  ɵɵnextContext,
  ɵɵpipe,
  ɵɵpipeBind1,
  ɵɵpipeBind2,
  ɵɵproperty,
  ɵɵrepeater,
  ɵɵrepeaterCreate,
  ɵɵrepeaterTrackByIdentity,
  ɵɵresetView,
  ɵɵrestoreView,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1,
  ɵɵtextInterpolate2,
  ɵɵtwoWayBindingSet,
  ɵɵtwoWayListener,
  ɵɵtwoWayProperty
} from "./chunk-IYCVPBRB.js";

// src/app/features/widgets/eggs-widget/eggs-widget.component.ts
function EggsWidgetComponent_For_8_Conditional_5_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span");
    \u0275\u0275text(1);
    \u0275\u0275pipe(2, "number");
    \u0275\u0275pipe(3, "translate");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate2(" ~ ", \u0275\u0275pipeBind2(2, 2, ctx_r2.calculated(), "1."), " ", \u0275\u0275pipeBind1(3, 5, "widgets.eggs.grams"));
  }
}
function EggsWidgetComponent_For_8_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 4);
    \u0275\u0275listener("click", function EggsWidgetComponent_For_8_Template_div_click_0_listener() {
      const z_r2 = \u0275\u0275restoreView(_r1).$implicit;
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.onChooseEggSize(z_r2));
    });
    \u0275\u0275element(1, "img", 5);
    \u0275\u0275elementStart(2, "span");
    \u0275\u0275text(3);
    \u0275\u0275pipe(4, "translate");
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(5, EggsWidgetComponent_For_8_Conditional_5_Template, 4, 7, "span");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const z_r2 = ctx.$implicit;
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275classProp("selected", ctx_r2.selected() === z_r2);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(4, 4, ctx_r2.labels[z_r2]));
    \u0275\u0275advance(2);
    \u0275\u0275conditional(ctx_r2.selected() === z_r2 && ctx_r2.calculated() ? 5 : -1);
  }
}
var EggsWidgetComponent = class _EggsWidgetComponent {
  sizes = ["small", "medium", "large"];
  labels = {
    small: "widgets.eggs.size.small",
    medium: "widgets.eggs.size.medium",
    large: "widgets.eggs.size.large"
  };
  eggs = model(null, ...ngDevMode ? [{ debugName: "eggs" }] : []);
  selected = signal("small", ...ngDevMode ? [{ debugName: "selected" }] : []);
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
  }, ...ngDevMode ? [{ debugName: "calculated" }] : []);
  changed = output();
  onChooseEggSize(size) {
    this.selected.set(size);
    this.changed.emit(this.calculated());
  }
  static \u0275fac = function EggsWidgetComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _EggsWidgetComponent)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _EggsWidgetComponent, selectors: [["lg-eggs-widget"]], inputs: { eggs: [1, "eggs"] }, outputs: { eggs: "eggsChange", changed: "changed" }, decls: 9, vars: 9, consts: [[3, "size"], [3, "ngModelChange", "ngModel", "placeholder", "theme"], [1, "eggs-widget__eggs"], [1, "eggs-widget__egg", 3, "selected"], [1, "eggs-widget__egg", 3, "click"], ["alt", "Egg", "src", "img/egg.svg"]], template: function EggsWidgetComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "lg-flex-column", 0)(1, "lg-title");
      \u0275\u0275text(2);
      \u0275\u0275pipe(3, "translate");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(4, "lg-input", 1);
      \u0275\u0275pipe(5, "translate");
      \u0275\u0275listener("ngModelChange", function EggsWidgetComponent_Template_lg_input_ngModelChange_4_listener() {
        return ctx.changed.emit(ctx.calculated());
      });
      \u0275\u0275twoWayListener("ngModelChange", function EggsWidgetComponent_Template_lg_input_ngModelChange_4_listener($event) {
        \u0275\u0275twoWayBindingSet(ctx.eggs, $event) || (ctx.eggs = $event);
        return $event;
      });
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(6, "div", 2);
      \u0275\u0275repeaterCreate(7, EggsWidgetComponent_For_8_Template, 6, 6, "div", 3, \u0275\u0275repeaterTrackByIdentity);
      \u0275\u0275elementEnd()();
    }
    if (rf & 2) {
      \u0275\u0275property("size", "medium");
      \u0275\u0275advance(2);
      \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind1(3, 5, "widgets.eggs.convert-title"), " ");
      \u0275\u0275advance(2);
      \u0275\u0275twoWayProperty("ngModel", ctx.eggs);
      \u0275\u0275property("placeholder", \u0275\u0275pipeBind1(5, 7, "widgets.eggs.placeholder"))("theme", "contrast");
      \u0275\u0275advance(3);
      \u0275\u0275repeater(ctx.sizes);
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
  ], styles: ["/* angular:styles/component:scss;82692a3d874eaadf7424489de1255dad78a2f96c59b12e81cfeadcffa3daf71b;/Users/khripunovpavel/Documents/my/lasagna/lasagna/src/app/features/widgets/eggs-widget/eggs-widget.component.ts */\n:host {\n  --control-bg: #fcfcfc;\n}\nlg-eggs-widget {\n  display: flex;\n}\n.eggs-widget {\n  display: flex;\n  flex-direction: column;\n}\n.eggs-widget__eggs {\n  display: flex;\n  align-items: flex-end;\n  gap: 8px;\n  max-width: 100vw;\n}\n.eggs-widget__eggs img {\n  width: 40px;\n}\n.eggs-widget__egg {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  flex: 1;\n  flex-direction: column;\n  gap: 8px;\n  background-color: var(--control-bg);\n  border-radius: 24px;\n  padding: 16px;\n  text-align: center;\n}\n.eggs-widget__egg:first-child img {\n  transform: scale(0.8);\n}\n.eggs-widget__egg:last-child img {\n  transform: scale(1.2);\n}\n.eggs-widget__egg.selected {\n  background-color: #61b789;\n}\n.eggs-widget__egg.selected:first-child {\n  background-color: #b4b8f8;\n}\n.eggs-widget__egg.selected:last-child {\n  background-color: #ff8080;\n}\n/*# sourceMappingURL=eggs-widget.component.css.map */\n"], encapsulation: 2 });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(EggsWidgetComponent, [{
    type: Component,
    args: [{ selector: "lg-eggs-widget", standalone: true, template: `
    <lg-flex-column [size]="'medium'">
      <lg-title>
        {{ 'widgets.eggs.convert-title' | translate }}
      </lg-title>

      <lg-input (ngModelChange)="changed.emit(calculated())"
                [(ngModel)]="eggs"
                [placeholder]="'widgets.eggs.placeholder' | translate"
                [theme]="'contrast'"></lg-input>
      <div class="eggs-widget__eggs">
        @for (z of sizes; track z; ) {
          <div (click)="onChooseEggSize(z)"
               [class.selected]="selected() === z"
               class="eggs-widget__egg">
            <img alt="Egg" src="img/egg.svg">
            <span>{{ labels[z] | translate }}</span>
            @if (selected() === z && calculated()) {
              <span> ~ {{ calculated() | number: '1.' }} {{ 'widgets.eggs.grams' | translate }}</span>
            }
          </div>
        }
      </div>
    </lg-flex-column>
  `, imports: [
      FormsModule,
      InputComponent,
      FlexColumnComponent,
      TitleComponent,
      DecimalPipe,
      TranslatePipe
    ], encapsulation: ViewEncapsulation.None, styles: ["/* angular:styles/component:scss;82692a3d874eaadf7424489de1255dad78a2f96c59b12e81cfeadcffa3daf71b;/Users/khripunovpavel/Documents/my/lasagna/lasagna/src/app/features/widgets/eggs-widget/eggs-widget.component.ts */\n:host {\n  --control-bg: #fcfcfc;\n}\nlg-eggs-widget {\n  display: flex;\n}\n.eggs-widget {\n  display: flex;\n  flex-direction: column;\n}\n.eggs-widget__eggs {\n  display: flex;\n  align-items: flex-end;\n  gap: 8px;\n  max-width: 100vw;\n}\n.eggs-widget__eggs img {\n  width: 40px;\n}\n.eggs-widget__egg {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  flex: 1;\n  flex-direction: column;\n  gap: 8px;\n  background-color: var(--control-bg);\n  border-radius: 24px;\n  padding: 16px;\n  text-align: center;\n}\n.eggs-widget__egg:first-child img {\n  transform: scale(0.8);\n}\n.eggs-widget__egg:last-child img {\n  transform: scale(1.2);\n}\n.eggs-widget__egg.selected {\n  background-color: #61b789;\n}\n.eggs-widget__egg.selected:first-child {\n  background-color: #b4b8f8;\n}\n.eggs-widget__egg.selected:last-child {\n  background-color: #ff8080;\n}\n/*# sourceMappingURL=eggs-widget.component.css.map */\n"] }]
  }], null, { eggs: [{ type: Input, args: [{ isSignal: true, alias: "eggs", required: false }] }, { type: Output, args: ["eggsChange"] }], changed: [{ type: Output, args: ["changed"] }] });
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(EggsWidgetComponent, { className: "EggsWidgetComponent", filePath: "src/app/features/widgets/eggs-widget/eggs-widget.component.ts", lineNumber: 107 });
})();

export {
  EggsWidgetComponent
};
//# sourceMappingURL=chunk-FHXD5TRY.js.map
