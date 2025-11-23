import "./chunk-R64U7JLD.js";
import {
  ProductsRepository,
  RecipesRepository
} from "./chunk-CFCFQO5U.js";
import "./chunk-RBDPPOGX.js";
import {
  OnboardingService
} from "./chunk-BUGRPEBT.js";
import "./chunk-BPMAQ256.js";
import "./chunk-OGDPSEDB.js";
import "./chunk-6WNKKHFO.js";
import "./chunk-NLONWH5J.js";
import "./chunk-MV7X5YHM.js";
import "./chunk-QHJLSFIB.js";
import "./chunk-3UJV2MM3.js";
import "./chunk-UG5XPMCB.js";
import "./chunk-XXA7PPXB.js";
import "./chunk-XIU3WVPC.js";
import "./chunk-T5CRNY7R.js";
import "./chunk-IWOUTMKL.js";
import "./chunk-R5O3TEDB.js";
import "./chunk-KM2DRJZA.js";
import "./chunk-2S3NUMNU.js";
import "./chunk-PHCOZAXM.js";
import "./chunk-AWZMWU52.js";
import "./chunk-5WJUMO7X.js";
import {
  CardComponent
} from "./chunk-G3SIWE5M.js";
import {
  TitleComponent
} from "./chunk-3AYILQJD.js";
import {
  FadeInComponent
} from "./chunk-TPJKAC4G.js";
import "./chunk-2JX6TDC6.js";
import "./chunk-57RA4QZQ.js";
import {
  ButtonComponent
} from "./chunk-MP6JNYP6.js";
import {
  FlexColumnComponent
} from "./chunk-K37ECZYU.js";
import "./chunk-AESGXZO7.js";
import {
  APP_SERVER_IS_RU
} from "./chunk-2CTN2MPX.js";
import "./chunk-NJX644NS.js";
import "./chunk-CFXQGSQM.js";
import {
  TranslatePipe
} from "./chunk-755Q3QHA.js";
import {
  Router
} from "./chunk-L34DFTMV.js";
import "./chunk-USF337CA.js";
import "./chunk-VVQKNBNV.js";
import "./chunk-X2X7GTPW.js";
import "./chunk-PZQLIUCM.js";
import "./chunk-7YWLATDR.js";
import {
  ContainerComponent
} from "./chunk-DB3CLH5P.js";
import {
  Component,
  computed,
  inject,
  setClassMetadata,
  setClassMetadataAsync,
  ɵsetClassDebugInfo,
  ɵɵadvance,
  ɵɵclassProp,
  ɵɵconditional,
  ɵɵconditionalCreate,
  ɵɵdefer,
  ɵɵdeferOnIdle,
  ɵɵdefineComponent,
  ɵɵdomTemplate,
  ɵɵelement,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵgetCurrentView,
  ɵɵlistener,
  ɵɵnextContext,
  ɵɵpipe,
  ɵɵpipeBind1,
  ɵɵproperty,
  ɵɵrepeater,
  ɵɵrepeaterCreate,
  ɵɵresetView,
  ɵɵrestoreView,
  ɵɵstyleMap,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1
} from "./chunk-IYCVPBRB.js";
import "./chunk-46DXP6YY.js";

// src/app/features/onboarding/onboarding.component.ts
var _forTrack0 = ($index, $item) => $item.key;
function OnboardingComponent_Conditional_0_For_13_Conditional_9_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275text(0);
    \u0275\u0275pipe(1, "translate");
  }
  if (rf & 2) {
    \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind1(1, 1, "onboarding.done"), " ");
  }
}
function OnboardingComponent_Conditional_0_For_13_Conditional_10_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275text(0);
    \u0275\u0275pipe(1, "translate");
  }
  if (rf & 2) {
    \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind1(1, 1, "onboarding.go"), " ");
  }
}
function OnboardingComponent_Conditional_0_For_13_Conditional_11_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275text(0);
    \u0275\u0275pipe(1, "translate");
  }
  if (rf & 2) {
    \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind1(1, 1, "onboarding.unavailable"), " ");
  }
}
function OnboardingComponent_Conditional_0_For_13_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 6)(1, "div", 7)(2, "span", 8);
    \u0275\u0275text(3);
    \u0275\u0275pipe(4, "translate");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "span", 9);
    \u0275\u0275text(6);
    \u0275\u0275pipe(7, "translate");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(8, "lg-button", 10);
    \u0275\u0275listener("onClick", function OnboardingComponent_Conditional_0_For_13_Template_lg_button_onClick_8_listener() {
      const step_r2 = \u0275\u0275restoreView(_r1).$implicit;
      return \u0275\u0275resetView(step_r2.action());
    });
    \u0275\u0275conditionalCreate(9, OnboardingComponent_Conditional_0_For_13_Conditional_9_Template, 2, 3)(10, OnboardingComponent_Conditional_0_For_13_Conditional_10_Template, 2, 3)(11, OnboardingComponent_Conditional_0_For_13_Conditional_11_Template, 2, 3);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const step_r2 = ctx.$implicit;
    const ctx_r2 = \u0275\u0275nextContext(2);
    \u0275\u0275classProp("onboarding__step--done", step_r2.done)("onboarding__step--disabled", !step_r2.done && !ctx_r2.isCurrentStep(step_r2));
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(4, 10, step_r2.label));
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(7, 12, step_r2.description));
    \u0275\u0275advance(2);
    \u0275\u0275styleMap(step_r2.done ? "secondary" : "primary");
    \u0275\u0275property("disabled", step_r2.done || !ctx_r2.isCurrentStep(step_r2));
    \u0275\u0275advance();
    \u0275\u0275conditional(step_r2.done ? 9 : ctx_r2.isCurrentStep(step_r2) ? 10 : 11);
  }
}
function OnboardingComponent_Conditional_0_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "section", 0)(1, "lg-flex-column", 1)(2, "lg-title", 2);
    \u0275\u0275text(3);
    \u0275\u0275pipe(4, "translate");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "p", 3);
    \u0275\u0275text(6);
    \u0275\u0275pipe(7, "translate");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "p", 3);
    \u0275\u0275text(9);
    \u0275\u0275pipe(10, "translate");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(11, "lg-flex-column", 4);
    \u0275\u0275repeaterCreate(12, OnboardingComponent_Conditional_0_For_13_Template, 12, 14, "div", 5, _forTrack0);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance(2);
    \u0275\u0275property("level", 4);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(4, 5, "onboarding.title"));
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(7, 7, "onboarding.about"));
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(10, 9, "onboarding.welcome"));
    \u0275\u0275advance(2);
    \u0275\u0275property("size", "medium");
    \u0275\u0275advance();
    \u0275\u0275repeater(ctx_r2.steps());
  }
}
var OnboardingComponent = class _OnboardingComponent {
  // Текущий активный шаг (первый незавершённый)
  currentStep = computed(() => {
    return this.steps().find((step) => !step.done);
  }, ...ngDevMode ? [{ debugName: "currentStep" }] : []);
  _router = inject(Router);
  _onboarding = inject(OnboardingService);
  // Используем сигнал из сервиса напрямую
  allDone = this._onboarding.isOnboardingComplete;
  _isRuRegion = inject(APP_SERVER_IS_RU);
  steps = computed(() => {
    const settingsItems = {
      key: "settings",
      label: "onboarding.settings.label",
      description: "onboarding.settings.description",
      done: this._onboarding.isSettingsDone(),
      action: () => this.goToSettings()
    };
    const steps = [
      {
        key: "product",
        label: "onboarding.product.label",
        description: "onboarding.product.description",
        done: this._onboarding.isProductDone(),
        action: () => this.goToAddProduct()
      },
      {
        key: "recipe",
        label: "onboarding.recipe.label",
        description: "onboarding.recipe.description",
        done: this._onboarding.isRecipeDone(),
        action: () => this.goToAddRecipe()
      },
      {
        key: "faq",
        label: "onboarding.faq.label",
        description: "onboarding.faq.description",
        done: this._onboarding.isFaqDone(),
        action: () => this.goToFaq()
      }
    ];
    return this._isRuRegion ? steps : [settingsItems].concat(steps);
  }, ...ngDevMode ? [{ debugName: "steps" }] : []);
  // Проверка, является ли шаг текущим активным
  isCurrentStep(step) {
    return !step.done && step.key === this.currentStep()?.key;
  }
  goToSettings() {
    this._router.navigate(["/settings"]);
  }
  goToFaq() {
    this._router.navigate(["/documents"]);
  }
  goToAddProduct() {
    this._router.navigate(["/products/add"]);
  }
  goToAddRecipe() {
    this._router.navigate(["/recipes/add"]);
  }
  static \u0275fac = function OnboardingComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _OnboardingComponent)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _OnboardingComponent, selectors: [["lg-onboarding"]], decls: 1, vars: 1, consts: [[1, "onboarding"], ["size", "medium"], [3, "level"], [1, "no-margin", "text-wrap"], [3, "size"], [1, "onboarding__step", 3, "onboarding__step--done", "onboarding__step--disabled"], [1, "onboarding__step"], [1, "onboarding__step-content"], [1, "onboarding__step-label"], [1, "onboarding__step-desc"], [3, "onClick", "disabled"]], template: function OnboardingComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275conditionalCreate(0, OnboardingComponent_Conditional_0_Template, 14, 11, "section", 0);
    }
    if (rf & 2) {
      \u0275\u0275conditional(!ctx.allDone() ? 0 : -1);
    }
  }, dependencies: [
    ButtonComponent,
    TitleComponent,
    FlexColumnComponent,
    TranslatePipe
  ], styles: ["\n\n[_nghost-%COMP%] {\n  display: block;\n}\n.onboarding__step[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  gap: 8px;\n  background: var(--onboarding-bg);\n  border-radius: 16px;\n  padding: 16px;\n  border: 1px solid var(--onboarding-border);\n  transition: background 0.2s;\n}\n@media screen and (max-width: 600px) {\n  .onboarding__step[_ngcontent-%COMP%] {\n    flex-direction: column;\n  }\n  .onboarding__step[_ngcontent-%COMP%]   lg-button[_ngcontent-%COMP%] {\n    align-self: flex-end;\n  }\n}\n.onboarding__step--done[_ngcontent-%COMP%]   .onboarding__step-content[_ngcontent-%COMP%] {\n  opacity: 0.5;\n}\n.onboarding__step--disabled[_ngcontent-%COMP%]   .onboarding__step-content[_ngcontent-%COMP%] {\n  opacity: 0.5;\n}\n.onboarding__step-content[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 4px;\n}\n.onboarding__step-label[_ngcontent-%COMP%] {\n  font-weight: 600;\n}\n.onboarding__step-desc[_ngcontent-%COMP%] {\n  color: var(--onboarding-text);\n}\n/*# sourceMappingURL=onboarding.component.css.map */"] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(OnboardingComponent, [{
    type: Component,
    args: [{ selector: "lg-onboarding", standalone: true, imports: [
      ButtonComponent,
      TitleComponent,
      FlexColumnComponent,
      TranslatePipe
    ], template: `
    @if (!allDone()) {
      <section class="onboarding">
        <lg-flex-column size="medium">
          <lg-title [level]="4">{{ 'onboarding.title' | translate }}</lg-title>

          <p class="no-margin text-wrap">{{ 'onboarding.about' | translate }}</p>

          <p class="no-margin text-wrap">{{ 'onboarding.welcome' | translate }}</p>

          <lg-flex-column [size]="'medium'">
            @for (step of steps(); track step.key) {
              <div class="onboarding__step"
                   [class.onboarding__step--done]="step.done"
                   [class.onboarding__step--disabled]="!step.done && !isCurrentStep(step)">
                <div class="onboarding__step-content">
                  <span class="onboarding__step-label">{{ step.label | translate }}</span>
                  <span class="onboarding__step-desc">{{ step.description | translate }}</span>
                </div>

                <lg-button [disabled]="step.done || !isCurrentStep(step)"
                           [style]="step.done ? 'secondary' : 'primary'"
                           (onClick)="step.action()">
                  @if (step.done) {
                    {{ 'onboarding.done' | translate }}
                  } @else if (isCurrentStep(step)) {
                    {{ 'onboarding.go' | translate }}
                  } @else {
                    {{ 'onboarding.unavailable' | translate }}
                  }
                </lg-button>
              </div>
            }
          </lg-flex-column>
        </lg-flex-column>
      </section>
    }
  `, styles: ["/* angular:styles/component:scss;5e3b68f0b258d21293280ed3fc3d0501ab5efa1fdb4241933c75e7c5f5372654;/Users/khripunovpavel/Documents/my/lasagna/lasagna/src/app/features/onboarding/onboarding.component.ts */\n:host {\n  display: block;\n}\n.onboarding__step {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  gap: 8px;\n  background: var(--onboarding-bg);\n  border-radius: 16px;\n  padding: 16px;\n  border: 1px solid var(--onboarding-border);\n  transition: background 0.2s;\n}\n@media screen and (max-width: 600px) {\n  .onboarding__step {\n    flex-direction: column;\n  }\n  .onboarding__step lg-button {\n    align-self: flex-end;\n  }\n}\n.onboarding__step--done .onboarding__step-content {\n  opacity: 0.5;\n}\n.onboarding__step--disabled .onboarding__step-content {\n  opacity: 0.5;\n}\n.onboarding__step-content {\n  display: flex;\n  flex-direction: column;\n  gap: 4px;\n}\n.onboarding__step-label {\n  font-weight: 600;\n}\n.onboarding__step-desc {\n  color: var(--onboarding-text);\n}\n/*# sourceMappingURL=onboarding.component.css.map */\n"] }]
  }], null, null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(OnboardingComponent, { className: "OnboardingComponent", filePath: "src/app/features/onboarding/onboarding.component.ts", lineNumber: 118 });
})();

// src/app/features/home/view/application/application.component.ts
var ApplicationComponent_Defer_8_DepsFn = () => [CardComponent, import("./chunk-3M4G3SLH.js").then((m) => m.LastEditedRecipesComponent), import("./chunk-X6A3MGAK.js").then((m) => m.LastEditedProductsComponent), import("./chunk-5EMI5HZE.js").then((m) => m.FlexRowComponent), import("./chunk-DXGXIKJ2.js").then((m) => m.AsyncPipe)];
function ApplicationComponent_Conditional_5_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "lg-card");
    \u0275\u0275element(1, "lg-onboarding");
    \u0275\u0275elementEnd();
  }
}
function ApplicationComponent_Defer_6_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "lg-card");
    \u0275\u0275element(1, "lg-last-edited-recipes");
    \u0275\u0275elementEnd();
  }
}
function ApplicationComponent_Defer_6_Conditional_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "lg-card");
    \u0275\u0275element(1, "lg-last-edited-products");
    \u0275\u0275elementEnd();
  }
}
function ApplicationComponent_Defer_6_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "lg-flex-row", 0);
    \u0275\u0275conditionalCreate(1, ApplicationComponent_Defer_6_Conditional_1_Template, 2, 0, "lg-card");
    \u0275\u0275pipe(2, "async");
    \u0275\u0275conditionalCreate(3, ApplicationComponent_Defer_6_Conditional_3_Template, 2, 0, "lg-card");
    \u0275\u0275pipe(4, "async");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275property("mobileMode", true)("top", true)("wrap", true);
    \u0275\u0275advance();
    \u0275\u0275conditional(\u0275\u0275pipeBind1(2, 5, ctx_r0.recipes.length) ? 1 : -1);
    \u0275\u0275advance(2);
    \u0275\u0275conditional(\u0275\u0275pipeBind1(4, 7, ctx_r0.products.length) ? 3 : -1);
  }
}
function ApplicationComponent_DeferError_7_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275text(0);
    \u0275\u0275pipe(1, "translate");
  }
  if (rf & 2) {
    \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind1(1, 1, "main.defer-load-error"), " ");
  }
}
var ApplicationComponent = class _ApplicationComponent {
  title = "lasagna";
  recipes = inject(RecipesRepository);
  products = inject(ProductsRepository);
  _onboardingService = inject(OnboardingService);
  // Используем сигнал из сервиса напрямую
  isOnboardingComplete = this._onboardingService.isOnboardingComplete;
  static \u0275fac = function ApplicationComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _ApplicationComponent)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _ApplicationComponent, selectors: [["app-application"]], decls: 10, vars: 4, consts: [["cols", "2", 3, "mobileMode", "top", "wrap"]], template: function ApplicationComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "lg-fade-in")(1, "lg-container")(2, "lg-title");
      \u0275\u0275text(3);
      \u0275\u0275pipe(4, "translate");
      \u0275\u0275elementEnd();
      \u0275\u0275conditionalCreate(5, ApplicationComponent_Conditional_5_Template, 2, 0, "lg-card");
      \u0275\u0275domTemplate(6, ApplicationComponent_Defer_6_Template, 5, 9)(7, ApplicationComponent_DeferError_7_Template, 2, 3);
      \u0275\u0275defer(8, 6, ApplicationComponent_Defer_8_DepsFn, null, null, 7);
      \u0275\u0275deferOnIdle();
      \u0275\u0275elementEnd()();
    }
    if (rf & 2) {
      \u0275\u0275advance(3);
      \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(4, 2, "main.title"));
      \u0275\u0275advance(2);
      \u0275\u0275conditional(!ctx.isOnboardingComplete() ? 5 : -1);
    }
  }, dependencies: [
    ContainerComponent,
    CardComponent,
    TitleComponent,
    FadeInComponent,
    OnboardingComponent,
    TranslatePipe
  ], styles: ["\n\n.menu[_ngcontent-%COMP%]   ul[_ngcontent-%COMP%] {\n  list-style-type: none;\n  padding: 0;\n  margin: 0;\n  display: flex;\n  justify-content: center;\n  flex-wrap: wrap;\n  gap: 32px;\n}\n.menu[_ngcontent-%COMP%]   ul[_ngcontent-%COMP%]   li[_ngcontent-%COMP%] {\n  flex: 1;\n}\n/*# sourceMappingURL=application.component.css.map */"] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadataAsync(ApplicationComponent, () => [import("./chunk-3M4G3SLH.js").then((m) => m.LastEditedRecipesComponent), import("./chunk-X6A3MGAK.js").then((m) => m.LastEditedProductsComponent), import("./chunk-5EMI5HZE.js").then((m) => m.FlexRowComponent), import("./chunk-DXGXIKJ2.js").then((m) => m.AsyncPipe)], (LastEditedRecipesComponent, LastEditedProductsComponent, FlexRowComponent, AsyncPipe) => {
    setClassMetadata(ApplicationComponent, [{
      type: Component,
      args: [{ selector: "app-application", imports: [
        ContainerComponent,
        CardComponent,
        TitleComponent,
        FadeInComponent,
        LastEditedRecipesComponent,
        LastEditedProductsComponent,
        FlexRowComponent,
        TranslatePipe,
        AsyncPipe,
        OnboardingComponent
      ], template: `<lg-fade-in>
  <lg-container>
    <lg-title>{{ 'main.title' | translate }}</lg-title>

    @if (!isOnboardingComplete()) {
      <lg-card>
        <lg-onboarding></lg-onboarding>
      </lg-card>
    }

    @defer {
      <lg-flex-row [mobileMode]="true"
                   [top]="true"
                   [wrap]="true"
                   cols="2">
        @if (recipes.length|async) {
          <lg-card>
            <lg-last-edited-recipes></lg-last-edited-recipes>
          </lg-card>
        }

        @if (products.length|async) {
          <lg-card>
            <lg-last-edited-products></lg-last-edited-products>
          </lg-card>
        }
      </lg-flex-row>
    } @error {
      {{'main.defer-load-error' | translate }}
    }
  </lg-container>
</lg-fade-in>
`, styles: ["/* src/app/features/home/view/application/application.component.scss */\n.menu ul {\n  list-style-type: none;\n  padding: 0;\n  margin: 0;\n  display: flex;\n  justify-content: center;\n  flex-wrap: wrap;\n  gap: 32px;\n}\n.menu ul li {\n  flex: 1;\n}\n/*# sourceMappingURL=application.component.css.map */\n"] }]
    }], null, null);
  });
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(ApplicationComponent, { className: "ApplicationComponent", filePath: "src/app/features/home/view/application/application.component.ts", lineNumber: 33 });
})();
export {
  ApplicationComponent
};
//# sourceMappingURL=chunk-6N3IP5K7.js.map
