import {
  PortalComponent
} from "./chunk-QJZQOK7U.js";
import {
  DEMO_MODE,
  DemoService
} from "./chunk-YWPUYK7V.js";
import "./chunk-QHJLSFIB.js";
import "./chunk-UG5XPMCB.js";
import "./chunk-5WJUMO7X.js";
import "./chunk-CFXQGSQM.js";
import {
  TranslatePipe
} from "./chunk-755Q3QHA.js";
import "./chunk-VVQKNBNV.js";
import "./chunk-X2X7GTPW.js";
import "./chunk-PZQLIUCM.js";
import {
  ChangeDetectionStrategy,
  Component,
  HostListener,
  ViewEncapsulation,
  inject,
  setClassMetadata,
  signal,
  ɵsetClassDebugInfo,
  ɵɵadvance,
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
  ɵɵproperty,
  ɵɵreference,
  ɵɵresetView,
  ɵɵresolveDocument,
  ɵɵrestoreView,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1
} from "./chunk-IYCVPBRB.js";
import "./chunk-46DXP6YY.js";

// src/app/features/home/view/demo-informer.component.ts
function DemoInformerComponent_Conditional_0_Conditional_4_Template(rf, ctx) {
  if (rf & 1) {
    const _r3 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "span", 3, 0);
    \u0275\u0275listener("click", function DemoInformerComponent_Conditional_0_Conditional_4_Template_span_click_0_listener() {
      \u0275\u0275restoreView(_r3);
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.toggle());
    });
    \u0275\u0275text(2);
    \u0275\u0275pipe(3, "translate");
    \u0275\u0275element(4, "br")(5, "br");
    \u0275\u0275elementStart(6, "strong", 4);
    \u0275\u0275listener("click", function DemoInformerComponent_Conditional_0_Conditional_4_Template_strong_click_6_listener($event) {
      \u0275\u0275restoreView(_r3);
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.switchOff($event));
    });
    \u0275\u0275text(7);
    \u0275\u0275pipe(8, "translate");
    \u0275\u0275elementEnd()();
    \u0275\u0275element(9, "lg-portal", 5);
  }
  if (rf & 2) {
    const element_r4 = \u0275\u0275reference(1);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind1(3, 5, "demo.message"), " ");
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(8, 7, "demo.switch-off"));
    \u0275\u0275advance(2);
    \u0275\u0275property("appendTarget", "body")("targetElement", element_r4)("wrapClass", "lg-demo-informer-tooltip");
  }
}
function DemoInformerComponent_Conditional_0_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 2);
    \u0275\u0275listener("click", function DemoInformerComponent_Conditional_0_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.toggle());
    });
    \u0275\u0275elementStart(1, "b");
    \u0275\u0275text(2);
    \u0275\u0275pipe(3, "translate");
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(4, DemoInformerComponent_Conditional_0_Conditional_4_Template, 10, 9);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(3, 2, "demo.title"));
    \u0275\u0275advance(2);
    \u0275\u0275conditional(ctx_r1.visible() ? 4 : -1);
  }
}
var DemoInformerComponent = class _DemoInformerComponent {
  constructor() {
  }
  isDemoMode = inject(DEMO_MODE);
  demoService = inject(DemoService);
  visible = signal(false, ...ngDevMode ? [{ debugName: "visible" }] : []);
  toggle() {
    this.visible.set(!this.visible());
  }
  switchOff(event) {
    event.stopPropagation();
    this.demoService.switchOffDemoMode();
  }
  onDocumentClick(event) {
    const target = event.target;
    if (!target.closest(".lg-demo-informer__btn") && !target.closest(".lg-demo-informer-tooltip")) {
      this.visible.set(false);
    }
  }
  static \u0275fac = function DemoInformerComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _DemoInformerComponent)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _DemoInformerComponent, selectors: [["lg-demo-informer"]], hostBindings: function DemoInformerComponent_HostBindings(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275listener("click", function DemoInformerComponent_click_HostBindingHandler($event) {
        return ctx.onDocumentClick($event);
      }, \u0275\u0275resolveDocument);
    }
  }, decls: 1, vars: 1, consts: [["element", ""], [1, "lg-demo-informer__btn"], [1, "lg-demo-informer__btn", 3, "click"], [3, "click"], [1, "text-underlined", 3, "click"], [3, "appendTarget", "targetElement", "wrapClass"]], template: function DemoInformerComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275conditionalCreate(0, DemoInformerComponent_Conditional_0_Template, 5, 4, "button", 1);
    }
    if (rf & 2) {
      \u0275\u0275conditional(ctx.isDemoMode ? 0 : -1);
    }
  }, dependencies: [
    PortalComponent,
    TranslatePipe
  ], styles: ["/* angular:styles/component:scss;761bf4882936eea7cbb7833f44b21a1cbd79af6d3ce4fe0ea9b5895ad9f0de6b;/Users/khripunovpavel/Documents/my/lasagna/lasagna/src/app/features/home/view/demo-informer.component.ts */\n.lg-demo-informer__btn {\n  display: flex;\n  background-color: #007bff;\n  color: white;\n  border: none;\n  padding: 10px;\n  cursor: pointer;\n  text-align: center;\n  text-decoration: none;\n  appearance: none;\n  font-family: inherit;\n  font-size: inherit;\n  font-weight: 400;\n  line-height: 1;\n  border-radius: 50px;\n  position: relative;\n  animation: shineDemoBtn 2s infinite;\n}\n.lg-demo-informer__btn:hover {\n  background-color: #007bff;\n}\n.lg-demo-informer-tooltip span {\n  background-color: #007bff;\n  color: white;\n  padding: 10px;\n  border-radius: 8px;\n  position: absolute;\n  z-index: 2;\n  top: 50%;\n  left: 50%;\n  transform: translateX(-50%) translateY(-50%);\n  text-wrap: balance;\n  text-align: center;\n}\n@keyframes shineDemoBtn {\n  0% {\n    background-color: #007bff;\n  }\n  50% {\n    background-color: #0056b3;\n  }\n  100% {\n    background-color: #007bff;\n  }\n}\n/*# sourceMappingURL=demo-informer.component.css.map */\n"], encapsulation: 2, changeDetection: 0 });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(DemoInformerComponent, [{
    type: Component,
    args: [{ selector: "lg-demo-informer", standalone: true, encapsulation: ViewEncapsulation.None, template: `
    @if (isDemoMode) {
      <button (click)="toggle()"
              class="lg-demo-informer__btn">
        <b>{{ 'demo.title' | translate }}</b>

        @if (visible()) {
          <span #element (click)="toggle()">
            {{ 'demo.message' | translate }}
            <br><br><strong class="text-underlined" (click)="switchOff($event)">{{ 'demo.switch-off' | translate }}</strong>
          </span>

          <lg-portal [appendTarget]="'body'"
                     [targetElement]="element"
                     [wrapClass]="'lg-demo-informer-tooltip'">
          </lg-portal>
        }
      </button>
    }
  `, imports: [
      PortalComponent,
      TranslatePipe
    ], changeDetection: ChangeDetectionStrategy.OnPush, styles: ["/* angular:styles/component:scss;761bf4882936eea7cbb7833f44b21a1cbd79af6d3ce4fe0ea9b5895ad9f0de6b;/Users/khripunovpavel/Documents/my/lasagna/lasagna/src/app/features/home/view/demo-informer.component.ts */\n.lg-demo-informer__btn {\n  display: flex;\n  background-color: #007bff;\n  color: white;\n  border: none;\n  padding: 10px;\n  cursor: pointer;\n  text-align: center;\n  text-decoration: none;\n  appearance: none;\n  font-family: inherit;\n  font-size: inherit;\n  font-weight: 400;\n  line-height: 1;\n  border-radius: 50px;\n  position: relative;\n  animation: shineDemoBtn 2s infinite;\n}\n.lg-demo-informer__btn:hover {\n  background-color: #007bff;\n}\n.lg-demo-informer-tooltip span {\n  background-color: #007bff;\n  color: white;\n  padding: 10px;\n  border-radius: 8px;\n  position: absolute;\n  z-index: 2;\n  top: 50%;\n  left: 50%;\n  transform: translateX(-50%) translateY(-50%);\n  text-wrap: balance;\n  text-align: center;\n}\n@keyframes shineDemoBtn {\n  0% {\n    background-color: #007bff;\n  }\n  50% {\n    background-color: #0056b3;\n  }\n  100% {\n    background-color: #007bff;\n  }\n}\n/*# sourceMappingURL=demo-informer.component.css.map */\n"] }]
  }], () => [], { onDocumentClick: [{
    type: HostListener,
    args: ["document:click", ["$event"]]
  }] });
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(DemoInformerComponent, { className: "DemoInformerComponent", filePath: "src/app/features/home/view/demo-informer.component.ts", lineNumber: 88 });
})();
export {
  DemoInformerComponent
};
//# sourceMappingURL=chunk-XO4AEVKJ.js.map
