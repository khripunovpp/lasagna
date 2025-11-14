import {
  PullDirective
} from "./chunk-BQKWFYYP.js";
import {
  ContainerComponent
} from "./chunk-5CY226S4.js";
import {
  FlexRowComponent
} from "./chunk-WJNK66FX.js";
import "./chunk-R64U7JLD.js";
import {
  CardComponent
} from "./chunk-UQJSKI6G.js";
import {
  TimeAgoPipe
} from "./chunk-UYTKJ4B2.js";
import {
  ProductsRepository,
  RecipesRepository
} from "./chunk-NMSYXSQT.js";
import {
  OnboardingService
} from "./chunk-TSXZ5ARA.js";
import "./chunk-AUXPMPTM.js";
import "./chunk-I546HKDL.js";
import {
  productLabelFactoryProvider
} from "./chunk-5PDR5QLJ.js";
import {
  APP_SERVER_IS_RU
} from "./chunk-E7RSJ4O4.js";
import "./chunk-OOJ6JS4B.js";
import "./chunk-T5CRNY7R.js";
import "./chunk-5WJUMO7X.js";
import {
  FadeInComponent
} from "./chunk-IT3YWXZ6.js";
import {
  TitleComponent
} from "./chunk-6N7S7ZFR.js";
import "./chunk-GGH4TL4E.js";
import "./chunk-RTCNHMN6.js";
import {
  ButtonComponent
} from "./chunk-4JEN4JYG.js";
import {
  TranslatePipe
} from "./chunk-DXRFKXPR.js";
import {
  Router,
  RouterLink
} from "./chunk-SHM3W5T3.js";
import "./chunk-VBFW7QHU.js";
import "./chunk-IWOUTMKL.js";
import {
  FlexColumnComponent
} from "./chunk-L3Q75KKL.js";
import {
  AsyncPipe
} from "./chunk-7I2CR6I6.js";
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  setClassMetadata,
  signal,
  ɵsetClassDebugInfo,
  ɵɵadvance,
  ɵɵclassProp,
  ɵɵconditional,
  ɵɵconditionalCreate,
  ɵɵdefineComponent,
  ɵɵdirectiveInject,
  ɵɵelement,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵgetCurrentView,
  ɵɵlistener,
  ɵɵnextContext,
  ɵɵpipe,
  ɵɵpipeBind1,
  ɵɵproperty,
  ɵɵpureFunction1,
  ɵɵrepeater,
  ɵɵrepeaterCreate,
  ɵɵresetView,
  ɵɵrestoreView,
  ɵɵstyleMap,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1
} from "./chunk-RQATVJ2P.js";
import "./chunk-PZQLIUCM.js";
import "./chunk-7YWLATDR.js";
import "./chunk-46DXP6YY.js";

// src/app/features/home/view/last-edited-recipes/last-edited-recipes.component.ts
var _c0 = (a0) => ["/recipes/edit/", a0];
var _forTrack0 = ($index, $item) => $item.recipe.uuid;
function LastEditedRecipesComponent_For_6_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "lg-flex-row", 3)(1, "a", 5);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "small", 6);
    \u0275\u0275text(4);
    \u0275\u0275pipe(5, "timeAgo");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const item_r1 = ctx.$implicit;
    \u0275\u0275property("size", "medium")("mobileMode", true);
    \u0275\u0275advance();
    \u0275\u0275property("routerLink", \u0275\u0275pureFunction1(7, _c0, item_r1.recipe.uuid));
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", item_r1.recipe.name, " ");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind1(5, 5, item_r1 == null ? null : item_r1.updatedAt), " ");
  }
}
function LastEditedRecipesComponent_ForEmpty_7_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 4);
    \u0275\u0275text(1);
    \u0275\u0275pipe(2, "translate");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind1(2, 1, "no-recipes"), " ");
  }
}
var LastEditedRecipesComponent = class _LastEditedRecipesComponent {
  _recipesRepository;
  constructor(_recipesRepository) {
    this._recipesRepository = _recipesRepository;
  }
  recipes = signal([], ...ngDevMode ? [{ debugName: "recipes" }] : []);
  ngOnInit() {
    this._recipesRepository.getLastRecipes().then((recipes) => {
      this.recipes.set(recipes);
    });
  }
  static \u0275fac = function LastEditedRecipesComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _LastEditedRecipesComponent)(\u0275\u0275directiveInject(RecipesRepository));
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _LastEditedRecipesComponent, selectors: [["lg-last-edited-recipes"]], decls: 8, vars: 6, consts: [["size", "medium"], [3, "level"], [3, "size"], [3, "size", "mobileMode"], [1, "last-edited-recipe-name"], [1, "last-edited-recipe", 3, "routerLink"], ["lgPull", "", 1, "text-muted", "text-right", "text-cursive"]], template: function LastEditedRecipesComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "lg-flex-column", 0)(1, "lg-title", 1);
      \u0275\u0275text(2);
      \u0275\u0275pipe(3, "translate");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(4, "lg-flex-column", 2);
      \u0275\u0275repeaterCreate(5, LastEditedRecipesComponent_For_6_Template, 6, 9, "lg-flex-row", 3, _forTrack0, false, LastEditedRecipesComponent_ForEmpty_7_Template, 3, 3, "div", 4);
      \u0275\u0275elementEnd()();
    }
    if (rf & 2) {
      \u0275\u0275advance();
      \u0275\u0275property("level", 4);
      \u0275\u0275advance();
      \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(3, 4, "main.last-recipes"));
      \u0275\u0275advance(2);
      \u0275\u0275property("size", "medium");
      \u0275\u0275advance();
      \u0275\u0275repeater(ctx.recipes());
    }
  }, dependencies: [
    FlexColumnComponent,
    RouterLink,
    TitleComponent,
    FlexRowComponent,
    PullDirective,
    TimeAgoPipe,
    TranslatePipe
  ], styles: ["\n\n[_nghost-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  width: 100%;\n}\n/*# sourceMappingURL=last-edited-recipes.component.css.map */"] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(LastEditedRecipesComponent, [{
    type: Component,
    args: [{ selector: "lg-last-edited-recipes", template: `
      <lg-flex-column size="medium">
          <lg-title [level]="4">{{ 'main.last-recipes'|translate }}</lg-title>

          <lg-flex-column [size]="'medium'">
              @for (item of recipes();track item.recipe.uuid) {
                  <lg-flex-row [size]="'medium'" [mobileMode]="true">
                      <a [routerLink]="['/recipes/edit/', item.recipe.uuid]" class="last-edited-recipe">
                          {{ item.recipe.name }}
                      </a>

                      <small class="text-muted text-right text-cursive" lgPull>
                          {{ (item?.updatedAt) | timeAgo }}
                      </small>
                  </lg-flex-row>
              } @empty {
                  <div class="last-edited-recipe-name">
                      {{ 'no-recipes'|translate }}
                  </div>
              }
          </lg-flex-column>
      </lg-flex-column>
  `, standalone: true, imports: [
      FlexColumnComponent,
      RouterLink,
      TitleComponent,
      TimeAgoPipe,
      FlexRowComponent,
      PullDirective,
      TranslatePipe
    ], styles: ["/* angular:styles/component:scss;fd4110a686213ca38958bccd5259b139826bf60ce6ef84cb199ef0dbbe65aacb;/Users/khripunovpavel/Documents/my/lasagna/lasagna/src/app/features/home/view/last-edited-recipes/last-edited-recipes.component.ts */\n:host {\n  display: flex;\n  flex-direction: column;\n  width: 100%;\n}\n/*# sourceMappingURL=last-edited-recipes.component.css.map */\n"] }]
  }], () => [{ type: RecipesRepository }], null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(LastEditedRecipesComponent, { className: "LastEditedRecipesComponent", filePath: "src/app/features/home/view/last-edited-recipes/last-edited-recipes.component.ts", lineNumber: 58 });
})();

// src/app/features/home/view/last-edited-products/last-edited-products.component.ts
var _c02 = (a0) => ["/products/edit/", a0];
var _forTrack02 = ($index, $item) => $item.product.uuid;
function LastEditedProductsComponent_For_7_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "lg-flex-row", 4)(1, "a", 6);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "small", 7);
    \u0275\u0275text(4);
    \u0275\u0275pipe(5, "timeAgo");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const item_r1 = ctx.$implicit;
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275property("size", "medium")("mobileMode", true);
    \u0275\u0275advance();
    \u0275\u0275property("routerLink", \u0275\u0275pureFunction1(7, _c02, item_r1.product.uuid));
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r1.productLabelFactory(item_r1.product), " ");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind1(5, 5, item_r1 == null ? null : item_r1.updatedAt), " ");
  }
}
function LastEditedProductsComponent_ForEmpty_8_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 5);
    \u0275\u0275text(1);
    \u0275\u0275pipe(2, "translate");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind1(2, 1, "no-products"), " ");
  }
}
var LastEditedProductsComponent = class _LastEditedProductsComponent {
  _productsRepository;
  constructor(_productsRepository) {
    this._productsRepository = _productsRepository;
  }
  products = signal([], ...ngDevMode ? [{ debugName: "products" }] : []);
  productLabelFactory = inject(productLabelFactoryProvider);
  ngOnInit() {
    this._productsRepository.getLastProducts().then((products) => {
      this.products.set(products);
    });
  }
  static \u0275fac = function LastEditedProductsComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _LastEditedProductsComponent)(\u0275\u0275directiveInject(ProductsRepository));
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _LastEditedProductsComponent, selectors: [["lg-last-edited-products"]], decls: 9, vars: 6, consts: [["size", "medium"], [3, "level"], [1, "last-edited-recipes"], [3, "size"], [3, "size", "mobileMode"], [1, "last-edited-recipe-name"], [1, "last-edited-product", 3, "routerLink"], ["lgPull", "", 1, "text-muted", "text-right", "text-cursive"]], template: function LastEditedProductsComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "lg-flex-column", 0)(1, "lg-title", 1);
      \u0275\u0275text(2);
      \u0275\u0275pipe(3, "translate");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(4, "div", 2)(5, "lg-flex-column", 3);
      \u0275\u0275repeaterCreate(6, LastEditedProductsComponent_For_7_Template, 6, 9, "lg-flex-row", 4, _forTrack02, false, LastEditedProductsComponent_ForEmpty_8_Template, 3, 3, "div", 5);
      \u0275\u0275elementEnd()()();
    }
    if (rf & 2) {
      \u0275\u0275advance();
      \u0275\u0275property("level", 4);
      \u0275\u0275advance();
      \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(3, 4, "main.last-products"));
      \u0275\u0275advance(3);
      \u0275\u0275property("size", "medium");
      \u0275\u0275advance();
      \u0275\u0275repeater(ctx.products());
    }
  }, dependencies: [
    FlexColumnComponent,
    RouterLink,
    TitleComponent,
    FlexRowComponent,
    PullDirective,
    TimeAgoPipe,
    TranslatePipe
  ], styles: ["\n\n[_nghost-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  width: 100%;\n}\n/*# sourceMappingURL=last-edited-products.component.css.map */"], changeDetection: 0 });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(LastEditedProductsComponent, [{
    type: Component,
    args: [{ selector: "lg-last-edited-products", template: `
    <lg-flex-column size="medium">
      <lg-title [level]="4">{{ 'main.last-products'|translate }}</lg-title>

      <div class="last-edited-recipes">
        <lg-flex-column [size]="'medium'">
          @for (item of products(); track item.product.uuid) {
            <lg-flex-row [size]="'medium'" [mobileMode]="true">
              <a [routerLink]="['/products/edit/', item.product.uuid]"
                 class="last-edited-product">
                {{ productLabelFactory(item.product) }}
              </a>

              <small class="text-muted text-right text-cursive" lgPull>
                {{ (item?.updatedAt) | timeAgo }}
              </small>
            </lg-flex-row>
          } @empty {
            <div class="last-edited-recipe-name">
              {{ 'no-products'|translate }}
            </div>
          }
        </lg-flex-column>
      </div>
    </lg-flex-column>
  `, imports: [
      FlexColumnComponent,
      RouterLink,
      TitleComponent,
      TimeAgoPipe,
      FlexRowComponent,
      PullDirective,
      TranslatePipe
    ], changeDetection: ChangeDetectionStrategy.OnPush, styles: ["/* angular:styles/component:scss;fd4110a686213ca38958bccd5259b139826bf60ce6ef84cb199ef0dbbe65aacb;/Users/khripunovpavel/Documents/my/lasagna/lasagna/src/app/features/home/view/last-edited-products/last-edited-products.component.ts */\n:host {\n  display: flex;\n  flex-direction: column;\n  width: 100%;\n}\n/*# sourceMappingURL=last-edited-products.component.css.map */\n"] }]
  }], () => [{ type: ProductsRepository }], null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(LastEditedProductsComponent, { className: "LastEditedProductsComponent", filePath: "src/app/features/home/view/last-edited-products/last-edited-products.component.ts", lineNumber: 62 });
})();

// src/app/features/onboarding/onboarding.component.ts
var _forTrack03 = ($index, $item) => $item.key;
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
    \u0275\u0275repeaterCreate(12, OnboardingComponent_Conditional_0_For_13_Template, 12, 14, "div", 5, _forTrack03);
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
    this._router.navigate(["/docs"]);
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
function ApplicationComponent_Conditional_5_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "lg-card");
    \u0275\u0275element(1, "lg-onboarding");
    \u0275\u0275elementEnd();
  }
}
function ApplicationComponent_Conditional_7_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "lg-card");
    \u0275\u0275element(1, "lg-last-edited-recipes");
    \u0275\u0275elementEnd();
  }
}
function ApplicationComponent_Conditional_9_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "lg-card");
    \u0275\u0275element(1, "lg-last-edited-products");
    \u0275\u0275elementEnd();
  }
}
var ApplicationComponent = class _ApplicationComponent {
  title = "lasagna";
  recipes = inject(RecipesRepository).length;
  products = inject(ProductsRepository).length;
  _onboardingService = inject(OnboardingService);
  // Используем сигнал из сервиса напрямую
  isOnboardingComplete = this._onboardingService.isOnboardingComplete;
  static \u0275fac = function ApplicationComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _ApplicationComponent)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _ApplicationComponent, selectors: [["app-application"]], decls: 11, vars: 13, consts: [["cols", "2", 3, "mobileMode", "top", "wrap"]], template: function ApplicationComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "lg-fade-in")(1, "lg-container")(2, "lg-title");
      \u0275\u0275text(3);
      \u0275\u0275pipe(4, "translate");
      \u0275\u0275elementEnd();
      \u0275\u0275conditionalCreate(5, ApplicationComponent_Conditional_5_Template, 2, 0, "lg-card");
      \u0275\u0275elementStart(6, "lg-flex-row", 0);
      \u0275\u0275conditionalCreate(7, ApplicationComponent_Conditional_7_Template, 2, 0, "lg-card");
      \u0275\u0275pipe(8, "async");
      \u0275\u0275conditionalCreate(9, ApplicationComponent_Conditional_9_Template, 2, 0, "lg-card");
      \u0275\u0275pipe(10, "async");
      \u0275\u0275elementEnd()()();
    }
    if (rf & 2) {
      \u0275\u0275advance(3);
      \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(4, 7, "main.title"));
      \u0275\u0275advance(2);
      \u0275\u0275conditional(!ctx.isOnboardingComplete() ? 5 : -1);
      \u0275\u0275advance();
      \u0275\u0275property("mobileMode", true)("top", true)("wrap", true);
      \u0275\u0275advance();
      \u0275\u0275conditional(\u0275\u0275pipeBind1(8, 9, ctx.recipes) ? 7 : -1);
      \u0275\u0275advance(2);
      \u0275\u0275conditional(\u0275\u0275pipeBind1(10, 11, ctx.products) ? 9 : -1);
    }
  }, dependencies: [
    ContainerComponent,
    CardComponent,
    TitleComponent,
    FadeInComponent,
    LastEditedRecipesComponent,
    LastEditedProductsComponent,
    FlexRowComponent,
    OnboardingComponent,
    TranslatePipe,
    AsyncPipe
  ], styles: ["\n\n.menu[_ngcontent-%COMP%]   ul[_ngcontent-%COMP%] {\n  list-style-type: none;\n  padding: 0;\n  margin: 0;\n  display: flex;\n  justify-content: center;\n  flex-wrap: wrap;\n  gap: 32px;\n}\n.menu[_ngcontent-%COMP%]   ul[_ngcontent-%COMP%]   li[_ngcontent-%COMP%] {\n  flex: 1;\n}\n/*# sourceMappingURL=application.component.css.map */"] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(ApplicationComponent, [{
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

    <lg-flex-row [mobileMode]="true"
                 [top]="true"
                 [wrap]="true"
                 cols="2">
      @if (recipes|async) {
        <lg-card>
          <lg-last-edited-recipes></lg-last-edited-recipes>
        </lg-card>
      }

      @if (products|async) {
        <lg-card>
          <lg-last-edited-products></lg-last-edited-products>
        </lg-card>
      }
    </lg-flex-row>
  </lg-container>
</lg-fade-in>
`, styles: ["/* src/app/features/home/view/application/application.component.scss */\n.menu ul {\n  list-style-type: none;\n  padding: 0;\n  margin: 0;\n  display: flex;\n  justify-content: center;\n  flex-wrap: wrap;\n  gap: 32px;\n}\n.menu ul li {\n  flex: 1;\n}\n/*# sourceMappingURL=application.component.css.map */\n"] }]
  }], null, null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(ApplicationComponent, { className: "ApplicationComponent", filePath: "src/app/features/home/view/application/application.component.ts", lineNumber: 33 });
})();
export {
  ApplicationComponent
};
//# sourceMappingURL=chunk-NNJDNTAT.js.map
