import {
  CardListComponent
} from "./chunk-CK6S6IQQ.js";
import {
  CardListItemDirective
} from "./chunk-DDKODGJT.js";
import "./chunk-WDQR6V3R.js";
import {
  ExpandDirective
} from "./chunk-M2YGHT4C.js";
import {
  MatIcon
} from "./chunk-L5RYK3YF.js";
import {
  ContainerComponent
} from "./chunk-5DOA7JWI.js";
import {
  FlexRowComponent
} from "./chunk-VT7H7QDZ.js";
import "./chunk-R64U7JLD.js";
import {
  FadeInComponent
} from "./chunk-NYW6IVNI.js";
import "./chunk-R4FNXVZE.js";
import {
  TitleComponent
} from "./chunk-2FAMYL7R.js";
import {
  CategoryRecipesRepository
} from "./chunk-TNNH66C3.js";
import "./chunk-2JX3723C.js";
import "./chunk-GYGQEGQM.js";
import "./chunk-HO3BXY6Z.js";
import {
  NotificationsService
} from "./chunk-BDWFQHRO.js";
import "./chunk-T5CRNY7R.js";
import "./chunk-CT346LCA.js";
import "./chunk-IWOUTMKL.js";
import {
  ButtonComponent
} from "./chunk-ZB5UPSW5.js";
import "./chunk-WSDGGV5V.js";
import "./chunk-5WJUMO7X.js";
import {
  TranslatePipe
} from "./chunk-CQ4TEOHT.js";
import {
  RouterLink
} from "./chunk-OJVTGBZ3.js";
import "./chunk-3B7JG6VR.js";
import "./chunk-S3HQU7AK.js";
import {
  Component,
  setClassMetadata,
  signal,
  ɵsetClassDebugInfo,
  ɵɵadvance,
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
  ɵɵrepeater,
  ɵɵrepeaterCreate,
  ɵɵrepeaterTrackByIndex,
  ɵɵresetView,
  ɵɵrestoreView,
  ɵɵstyleMap,
  ɵɵtemplate,
  ɵɵtext,
  ɵɵtextInterpolate1
} from "./chunk-FOZDM4WI.js";
import "./chunk-PZQLIUCM.js";
import "./chunk-7YWLATDR.js";
import "./chunk-46DXP6YY.js";

// src/app/features/settings/view/categories/category-recipe/list/category-recipe-list.component.ts
function CategoryRecipeListComponent_For_11_ng_template_0_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "lg-flex-row", 0)(1, "a", 3);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "lg-button", 4);
    \u0275\u0275listener("click", function CategoryRecipeListComponent_For_11_ng_template_0_Template_lg_button_click_3_listener() {
      \u0275\u0275restoreView(_r1);
      const category_r2 = \u0275\u0275nextContext().$implicit;
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.deleteCategory(category_r2));
    });
    \u0275\u0275element(4, "mat-icon", 5);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const category_r2 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275property("center", true);
    \u0275\u0275advance();
    \u0275\u0275property("routerLink", "/settings/categories/recipes/edit/" + category_r2.uuid);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", category_r2.name, " ");
    \u0275\u0275advance();
    \u0275\u0275styleMap("danger");
    \u0275\u0275property("size", "tiny")("icon", true);
  }
}
function CategoryRecipeListComponent_For_11_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275template(0, CategoryRecipeListComponent_For_11_ng_template_0_Template, 5, 7, "ng-template", 2);
  }
}
var CategoryRecipeListComponent = class _CategoryRecipeListComponent {
  categoryRepository;
  _notificationsService;
  constructor(categoryRepository, _notificationsService) {
    this.categoryRepository = categoryRepository;
    this._notificationsService = _notificationsService;
  }
  categories = signal([], ...ngDevMode ? [{ debugName: "categories" }] : []);
  deleteCategory(category) {
    if (!category.uuid)
      return Promise.resolve();
    return this.categoryRepository.deleteCategory(category.uuid).then(() => {
      this.loadCategory();
      this._notificationsService.success("categories.deleted");
    });
  }
  async ngOnInit() {
    await this.loadCategory();
  }
  loadCategory() {
    this.categoryRepository.getCategories().then((categories) => {
      const sorted = categories.toSorted((a, b) => a.name.localeCompare(b.name));
      this.categories.set(sorted);
    });
  }
  static \u0275fac = function CategoryRecipeListComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _CategoryRecipeListComponent)(\u0275\u0275directiveInject(CategoryRecipesRepository), \u0275\u0275directiveInject(NotificationsService));
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _CategoryRecipeListComponent, selectors: [["lg-category-recipe-list"]], decls: 12, vars: 12, consts: [[3, "center"], [3, "link", "size", "outlined"], ["lgCardListItem", ""], ["lgExpand", "", 3, "routerLink"], [3, "click", "size", "icon"], ["aria-hidden", "false", "aria-label", "Delete", "fontIcon", "close"]], template: function CategoryRecipeListComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "lg-fade-in")(1, "lg-container")(2, "lg-flex-row", 0)(3, "lg-title");
      \u0275\u0275text(4);
      \u0275\u0275pipe(5, "translate");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(6, "lg-button", 1);
      \u0275\u0275text(7);
      \u0275\u0275pipe(8, "translate");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(9, "lg-card-list");
      \u0275\u0275repeaterCreate(10, CategoryRecipeListComponent_For_11_Template, 1, 0, null, 2, \u0275\u0275repeaterTrackByIndex);
      \u0275\u0275elementEnd()()();
    }
    if (rf & 2) {
      \u0275\u0275advance(2);
      \u0275\u0275property("center", true);
      \u0275\u0275advance(2);
      \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind1(5, 8, "categories.recipes.title"), " ");
      \u0275\u0275advance(2);
      \u0275\u0275styleMap("default");
      \u0275\u0275property("link", "/settings/categories/recipes/add")("size", "tiny")("outlined", true);
      \u0275\u0275advance();
      \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind1(8, 10, "add-label"), " ");
      \u0275\u0275advance(3);
      \u0275\u0275repeater(ctx.categories());
    }
  }, dependencies: [
    FlexRowComponent,
    ButtonComponent,
    MatIcon,
    ContainerComponent,
    TitleComponent,
    CardListComponent,
    CardListItemDirective,
    FadeInComponent,
    ExpandDirective,
    RouterLink,
    TranslatePipe
  ], styles: ["\n\n[_nghost-%COMP%] {\n  display: block;\n}\n/*# sourceMappingURL=category-recipe-list.component.css.map */"] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(CategoryRecipeListComponent, [{
    type: Component,
    args: [{ selector: "lg-category-recipe-list", standalone: true, template: `
    <lg-fade-in>
      <lg-container>
        <lg-flex-row [center]="true">
          <lg-title>
            {{ 'categories.recipes.title' | translate }}
          </lg-title>

          <lg-button [link]="'/settings/categories/recipes/add'"
                     [size]="'tiny'"
                     [outlined]="true"
                     [style]="'default'">
            {{ 'add-label' | translate }}
          </lg-button>
        </lg-flex-row>

        <lg-card-list>
          @for (category of categories(); track $index; let i = $index) {
            <ng-template lgCardListItem>
              <lg-flex-row [center]="true">
                <a [routerLink]="'/settings/categories/recipes/edit/' + category.uuid"
                   lgExpand>
                  {{ category.name }}
                </a>

                <lg-button [style]="'danger'"
                           [size]="'tiny'"
                           [icon]="true"
                           (click)="deleteCategory(category)">
                  <mat-icon aria-hidden="false" aria-label="Delete"
                            fontIcon="close"></mat-icon>
                </lg-button>
              </lg-flex-row>
            </ng-template>
          }
        </lg-card-list>
      </lg-container>
    </lg-fade-in>
  `, imports: [
      FlexRowComponent,
      ButtonComponent,
      MatIcon,
      ContainerComponent,
      TitleComponent,
      CardListComponent,
      CardListItemDirective,
      FadeInComponent,
      TranslatePipe,
      ExpandDirective,
      RouterLink
    ], styles: ["/* angular:styles/component:scss;01c1eed413cbcab17b345a4da1b468b4e2a0a4e51bc2f6ee57d46c1ca65a67bb;/Users/khripunovpavel/Documents/my/lasagna/lasagna/src/app/features/settings/view/categories/category-recipe/list/category-recipe-list.component.ts */\n:host {\n  display: block;\n}\n/*# sourceMappingURL=category-recipe-list.component.css.map */\n"] }]
  }], () => [{ type: CategoryRecipesRepository }, { type: NotificationsService }], null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(CategoryRecipeListComponent, { className: "CategoryRecipeListComponent", filePath: "src/app/features/settings/view/categories/category-recipe/list/category-recipe-list.component.ts", lineNumber: 79 });
})();
export {
  CategoryRecipeListComponent
};
//# sourceMappingURL=chunk-4ERWFYYD.js.map
