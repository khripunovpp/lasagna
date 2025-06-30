import {
  PullDirective
} from "./chunk-VV2UI6YY.js";
import {
  CardComponent
} from "./chunk-YLXBTOXB.js";
import {
  GapColumnComponent
} from "./chunk-5CDCXM6R.js";
import {
  ContainerComponent
} from "./chunk-U5POLJOC.js";
import {
  GapRowComponent
} from "./chunk-RWMLY22Y.js";
import {
  TimeAgoPipe
} from "./chunk-63WB3IEN.js";
import {
  TranslatePipe
} from "./chunk-PZVFCWPY.js";
import "./chunk-R64U7JLD.js";
import {
  FadeInComponent
} from "./chunk-JNX3I5QY.js";
import "./chunk-HNJAQDA3.js";
import {
  TitleComponent
} from "./chunk-F2TP5Q2W.js";
import {
  ProductsRepository,
  RecipesRepository
} from "./chunk-LVU2JMH2.js";
import "./chunk-XLVGBYUT.js";
import {
  ButtonComponent
} from "./chunk-EH6A44OR.js";
import {
  RouterLink
} from "./chunk-UGLIF2MQ.js";
import "./chunk-Q4M4NLQD.js";
import "./chunk-5WJUMO7X.js";
import {
  AsyncPipe
} from "./chunk-5MHPI2FA.js";
import {
  Component,
  inject,
  setClassMetadata,
  signal,
  ɵsetClassDebugInfo,
  ɵɵadvance,
  ɵɵconditional,
  ɵɵconditionalBranchCreate,
  ɵɵconditionalCreate,
  ɵɵdefineComponent,
  ɵɵdirectiveInject,
  ɵɵelement,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵpipe,
  ɵɵpipeBind1,
  ɵɵproperty,
  ɵɵpureFunction1,
  ɵɵrepeater,
  ɵɵrepeaterCreate,
  ɵɵstyleMap,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1
} from "./chunk-6AETQSBA.js";
import "./chunk-PZQLIUCM.js";
import "./chunk-46DXP6YY.js";

// src/app/shared/view/application/last-edited-recipes/last-edited-recipes.component.ts
var _c0 = (a0) => ["/recipes/edit/", a0];
var _forTrack0 = ($index, $item) => $item.recipe.uuid;
function LastEditedRecipesComponent_For_6_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "lg-gap-row", 2)(1, "a", 4);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "small", 5);
    \u0275\u0275text(4);
    \u0275\u0275pipe(5, "timeAgo");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const item_r1 = ctx.$implicit;
    \u0275\u0275property("center", true)("size", "medium")("mobileMode", true);
    \u0275\u0275advance();
    \u0275\u0275property("routerLink", \u0275\u0275pureFunction1(8, _c0, item_r1.recipe.uuid));
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", item_r1.recipe.name, " ");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind1(5, 6, item_r1 == null ? null : item_r1.updatedAt), " ");
  }
}
function LastEditedRecipesComponent_ForEmpty_7_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 3);
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
  recipes = signal([]);
  ngOnInit() {
    this._recipesRepository.getLastRecipes().then((recipes) => {
      this.recipes.set(recipes);
    });
  }
  static \u0275fac = function LastEditedRecipesComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _LastEditedRecipesComponent)(\u0275\u0275directiveInject(RecipesRepository));
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _LastEditedRecipesComponent, selectors: [["lg-last-edited-recipes"]], decls: 8, vars: 6, consts: [[3, "level"], [3, "size"], [3, "center", "size", "mobileMode"], [1, "last-edited-recipe-name"], [1, "last-edited-recipe", 3, "routerLink"], ["lgPull", "", 1, "text-muted", "text-cursive"]], template: function LastEditedRecipesComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "lg-gap-column")(1, "lg-title", 0);
      \u0275\u0275text(2);
      \u0275\u0275pipe(3, "translate");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(4, "lg-gap-column", 1);
      \u0275\u0275repeaterCreate(5, LastEditedRecipesComponent_For_6_Template, 6, 10, "lg-gap-row", 2, _forTrack0, false, LastEditedRecipesComponent_ForEmpty_7_Template, 3, 3, "div", 3);
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
    GapColumnComponent,
    RouterLink,
    TitleComponent,
    TimeAgoPipe,
    GapRowComponent,
    PullDirective,
    TranslatePipe
  ], styles: ["\n\n[_nghost-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  width: 100%;\n}\n/*# sourceMappingURL=last-edited-recipes.component.css.map */"] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(LastEditedRecipesComponent, [{
    type: Component,
    args: [{ selector: "lg-last-edited-recipes", template: `
      <lg-gap-column>
          <lg-title [level]="4">{{ 'main.last-recipes'|translate }}</lg-title>

          <lg-gap-column [size]="'medium'">
              @for (item of recipes();track item.recipe.uuid) {
                  <lg-gap-row [center]="true" [size]="'medium'" [mobileMode]="true">
                      <a [routerLink]="['/recipes/edit/', item.recipe.uuid]" class="last-edited-recipe">
                          {{ item.recipe.name }}
                      </a>

                      <small class="text-muted text-cursive" lgPull>
                          {{ (item?.updatedAt) | timeAgo }}
                      </small>
                  </lg-gap-row>
              } @empty {
                  <div class="last-edited-recipe-name">
                      {{ 'no-recipes'|translate }}
                  </div>
              }
          </lg-gap-column>
      </lg-gap-column>
  `, standalone: true, imports: [
      GapColumnComponent,
      RouterLink,
      TitleComponent,
      TimeAgoPipe,
      GapRowComponent,
      PullDirective,
      TranslatePipe
    ], styles: ["/* angular:styles/component:scss;fd4110a686213ca38958bccd5259b139826bf60ce6ef84cb199ef0dbbe65aacb;/Users/khripunovpavel/Documents/my/lasagna/lasagna/src/app/shared/view/application/last-edited-recipes/last-edited-recipes.component.ts */\n:host {\n  display: flex;\n  flex-direction: column;\n  width: 100%;\n}\n/*# sourceMappingURL=last-edited-recipes.component.css.map */\n"] }]
  }], () => [{ type: RecipesRepository }], null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(LastEditedRecipesComponent, { className: "LastEditedRecipesComponent", filePath: "src/app/shared/view/application/last-edited-recipes/last-edited-recipes.component.ts", lineNumber: 58 });
})();

// src/app/shared/view/application/last-edited-products/last-edited-products.component.ts
var _c02 = (a0) => ["/products/edit/", a0];
var _forTrack02 = ($index, $item) => $item.product.uuid;
function LastEditedProductsComponent_For_7_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "lg-gap-row", 3)(1, "a", 5);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "small", 6);
    \u0275\u0275text(4);
    \u0275\u0275pipe(5, "timeAgo");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const item_r1 = ctx.$implicit;
    \u0275\u0275property("center", true)("size", "medium")("mobileMode", true);
    \u0275\u0275advance();
    \u0275\u0275property("routerLink", \u0275\u0275pureFunction1(8, _c02, item_r1.product.uuid));
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", item_r1.product.name, " ");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind1(5, 6, item_r1 == null ? null : item_r1.updatedAt), " ");
  }
}
function LastEditedProductsComponent_ForEmpty_8_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 4);
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
  products = signal([]);
  ngOnInit() {
    this._productsRepository.getLastProducts().then((products) => {
      this.products.set(products);
    });
  }
  static \u0275fac = function LastEditedProductsComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _LastEditedProductsComponent)(\u0275\u0275directiveInject(ProductsRepository));
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _LastEditedProductsComponent, selectors: [["lg-last-edited-products"]], decls: 9, vars: 6, consts: [[3, "level"], [1, "last-edited-recipes"], [3, "size"], [3, "center", "size", "mobileMode"], [1, "last-edited-recipe-name"], [1, "last-edited-product", 3, "routerLink"], ["lgPull", "", 1, "text-muted", "text-cursive"]], template: function LastEditedProductsComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "lg-gap-column")(1, "lg-title", 0);
      \u0275\u0275text(2);
      \u0275\u0275pipe(3, "translate");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(4, "div", 1)(5, "lg-gap-column", 2);
      \u0275\u0275repeaterCreate(6, LastEditedProductsComponent_For_7_Template, 6, 10, "lg-gap-row", 3, _forTrack02, false, LastEditedProductsComponent_ForEmpty_8_Template, 3, 3, "div", 4);
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
    GapColumnComponent,
    RouterLink,
    TitleComponent,
    TimeAgoPipe,
    GapRowComponent,
    PullDirective,
    TranslatePipe
  ], styles: ["\n\n[_nghost-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  width: 100%;\n}\n/*# sourceMappingURL=last-edited-products.component.css.map */"] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(LastEditedProductsComponent, [{
    type: Component,
    args: [{ selector: "lg-last-edited-products", template: `
      <lg-gap-column>
          <lg-title [level]="4">{{ 'main.last-products'|translate }}</lg-title>

          <div class="last-edited-recipes">
              <lg-gap-column [size]="'medium'">
                  @for (item of products();track item.product.uuid) {
                      <lg-gap-row [center]="true" [size]="'medium'" [mobileMode]="true">
                          <a [routerLink]="['/products/edit/', item.product.uuid]" class="last-edited-product">
                              {{ item.product.name }}
                          </a>

                          <small class="text-muted text-cursive" lgPull>
                              {{ (item?.updatedAt) | timeAgo }}
                          </small>
                      </lg-gap-row>
                  } @empty {
                      <div class="last-edited-recipe-name">
                          {{ 'no-products'|translate }}
                      </div>
                  }
              </lg-gap-column>
          </div>
      </lg-gap-column>
  `, standalone: true, imports: [
      GapColumnComponent,
      RouterLink,
      TitleComponent,
      TimeAgoPipe,
      GapRowComponent,
      PullDirective,
      TranslatePipe
    ], styles: ["/* angular:styles/component:scss;fd4110a686213ca38958bccd5259b139826bf60ce6ef84cb199ef0dbbe65aacb;/Users/khripunovpavel/Documents/my/lasagna/lasagna/src/app/shared/view/application/last-edited-products/last-edited-products.component.ts */\n:host {\n  display: flex;\n  flex-direction: column;\n  width: 100%;\n}\n/*# sourceMappingURL=last-edited-products.component.css.map */\n"] }]
  }], () => [{ type: ProductsRepository }], null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(LastEditedProductsComponent, { className: "LastEditedProductsComponent", filePath: "src/app/shared/view/application/last-edited-products/last-edited-products.component.ts", lineNumber: 60 });
})();

// src/app/shared/view/application/application.component.ts
function ApplicationComponent_Conditional_7_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "lg-last-edited-recipes");
  }
}
function ApplicationComponent_Conditional_9_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "lg-button", 1);
    \u0275\u0275text(1);
    \u0275\u0275pipe(2, "translate");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind1(2, 1, "main.recipes.button"), " ");
  }
}
function ApplicationComponent_Conditional_11_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "lg-last-edited-products");
  }
}
function ApplicationComponent_Conditional_13_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "lg-button", 3);
    \u0275\u0275text(1);
    \u0275\u0275pipe(2, "translate");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    \u0275\u0275styleMap("success");
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind1(2, 3, "main.products.button"), " ");
  }
}
var ApplicationComponent = class _ApplicationComponent {
  title = "lasagna";
  recipes = inject(RecipesRepository).length;
  products = inject(ProductsRepository).length;
  static \u0275fac = function ApplicationComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _ApplicationComponent)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _ApplicationComponent, selectors: [["app-application"]], decls: 14, vars: 11, consts: [[3, "mobileMode", "top"], ["link", "/recipes/add"], ["link", "/products/add", 3, "style"], ["link", "/products/add"]], template: function ApplicationComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "lg-fade-in")(1, "lg-container")(2, "lg-title");
      \u0275\u0275text(3);
      \u0275\u0275pipe(4, "translate");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(5, "lg-gap-row", 0)(6, "lg-card");
      \u0275\u0275conditionalCreate(7, ApplicationComponent_Conditional_7_Template, 1, 0, "lg-last-edited-recipes");
      \u0275\u0275pipe(8, "async");
      \u0275\u0275conditionalBranchCreate(9, ApplicationComponent_Conditional_9_Template, 3, 3, "lg-button", 1);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(10, "lg-card");
      \u0275\u0275conditionalCreate(11, ApplicationComponent_Conditional_11_Template, 1, 0, "lg-last-edited-products");
      \u0275\u0275pipe(12, "async");
      \u0275\u0275conditionalBranchCreate(13, ApplicationComponent_Conditional_13_Template, 3, 5, "lg-button", 2);
      \u0275\u0275elementEnd()()()();
    }
    if (rf & 2) {
      \u0275\u0275advance(3);
      \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(4, 5, "main.title"));
      \u0275\u0275advance(2);
      \u0275\u0275property("mobileMode", true)("top", true);
      \u0275\u0275advance(2);
      \u0275\u0275conditional(\u0275\u0275pipeBind1(8, 7, ctx.recipes) ? 7 : 9);
      \u0275\u0275advance(4);
      \u0275\u0275conditional(\u0275\u0275pipeBind1(12, 9, ctx.products) ? 11 : 13);
    }
  }, dependencies: [
    ContainerComponent,
    CardComponent,
    TitleComponent,
    FadeInComponent,
    LastEditedRecipesComponent,
    LastEditedProductsComponent,
    GapRowComponent,
    TranslatePipe,
    AsyncPipe,
    ButtonComponent
  ], styles: ["\n\n.menu[_ngcontent-%COMP%]   ul[_ngcontent-%COMP%] {\n  list-style-type: none;\n  padding: 0;\n  margin: 0;\n  display: flex;\n  justify-content: center;\n  flex-wrap: wrap;\n  gap: 32px;\n}\n.menu[_ngcontent-%COMP%]   ul[_ngcontent-%COMP%]   li[_ngcontent-%COMP%] {\n  flex: 1;\n}\n/*# sourceMappingURL=application.component.css.map */"] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(ApplicationComponent, [{
    type: Component,
    args: [{ selector: "app-application", standalone: true, imports: [
      ContainerComponent,
      CardComponent,
      TitleComponent,
      FadeInComponent,
      LastEditedRecipesComponent,
      LastEditedProductsComponent,
      GapRowComponent,
      TranslatePipe,
      AsyncPipe,
      ButtonComponent
    ], template: `<lg-fade-in>
  <lg-container>
    <lg-title>{{ 'main.title' | translate }}</lg-title>

    <lg-gap-row [mobileMode]="true" [top]="true">
      <lg-card>
        @if (recipes|async) {
          <lg-last-edited-recipes></lg-last-edited-recipes>
        } @else {
          <lg-button link="/recipes/add">
            {{ 'main.recipes.button' | translate }}
          </lg-button>
        }
      </lg-card>

      <lg-card>
        @if (products|async) {
          <lg-last-edited-products></lg-last-edited-products>
        } @else {
          <lg-button link="/products/add" [style]="'success'">
            {{ 'main.products.button' | translate }}
          </lg-button>
        }
      </lg-card>
    </lg-gap-row>
  </lg-container>
</lg-fade-in>
`, styles: ["/* src/app/shared/view/application/application.component.scss */\n.menu ul {\n  list-style-type: none;\n  padding: 0;\n  margin: 0;\n  display: flex;\n  justify-content: center;\n  flex-wrap: wrap;\n  gap: 32px;\n}\n.menu ul li {\n  flex: 1;\n}\n/*# sourceMappingURL=application.component.css.map */\n"] }]
  }], null, null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(ApplicationComponent, { className: "ApplicationComponent", filePath: "src/app/shared/view/application/application.component.ts", lineNumber: 35 });
})();
export {
  ApplicationComponent
};
//# sourceMappingURL=chunk-LJCAY3P3.js.map
