import {
  CardListComponent
} from "./chunk-4AI6BBTH.js";
import {
  CardListItemDirective
} from "./chunk-I2GJGW5L.js";
import "./chunk-DVCUM2FU.js";
import {
  MatIcon
} from "./chunk-GES6PLRM.js";
import {
  ContainerComponent
} from "./chunk-UX3GX3WK.js";
import {
  FlexRowComponent
} from "./chunk-TYQOT2W3.js";
import "./chunk-R64U7JLD.js";
import {
  FadeInComponent
} from "./chunk-GKY6K6EK.js";
import "./chunk-HNJAQDA3.js";
import {
  TitleComponent
} from "./chunk-LKA4ZC5L.js";
import {
  CategoryProductsRepository
} from "./chunk-CND3ZXGP.js";
import "./chunk-MNQEASKP.js";
import "./chunk-5CZXSK24.js";
import {
  NotificationsService
} from "./chunk-OOSA4LBM.js";
import "./chunk-Q4M4NLQD.js";
import {
  ButtonComponent
} from "./chunk-DWISDMQU.js";
import {
  TranslatePipe
} from "./chunk-UMVMUCIR.js";
import "./chunk-Z6D6OJRN.js";
import "./chunk-5WJUMO7X.js";
import "./chunk-GZS6VQSL.js";
import "./chunk-3RLD5GXV.js";
import "./chunk-76JI64DZ.js";
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
} from "./chunk-UQVCVPTQ.js";
import "./chunk-PZQLIUCM.js";
import "./chunk-7YWLATDR.js";
import "./chunk-46DXP6YY.js";

// src/app/features/settings/view/categories/category-product/list/category-list.component.ts
function CategoryListComponent_For_11_ng_template_0_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "lg-flex-row", 0)(1, "div", 3);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "lg-button", 4);
    \u0275\u0275text(4);
    \u0275\u0275pipe(5, "translate");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "lg-button", 5);
    \u0275\u0275listener("click", function CategoryListComponent_For_11_ng_template_0_Template_lg_button_click_6_listener() {
      \u0275\u0275restoreView(_r1);
      const category_r2 = \u0275\u0275nextContext().$implicit;
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.deleteCategory(category_r2));
    });
    \u0275\u0275element(7, "mat-icon", 6);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const category_r2 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275property("center", true);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", category_r2.name, " ");
    \u0275\u0275advance();
    \u0275\u0275styleMap("primary");
    \u0275\u0275property("size", "small")("link", "/settings/categories/products/edit/" + category_r2.uuid)("flat", true);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind1(5, 12, "edit-label"), " ");
    \u0275\u0275advance(2);
    \u0275\u0275styleMap("danger");
    \u0275\u0275property("size", "tiny")("icon", true);
  }
}
function CategoryListComponent_For_11_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275template(0, CategoryListComponent_For_11_ng_template_0_Template, 8, 14, "ng-template", 2);
  }
}
var CategoryListComponent = class _CategoryListComponent {
  categoryRepository;
  _notificationsService;
  constructor(categoryRepository, _notificationsService) {
    this.categoryRepository = categoryRepository;
    this._notificationsService = _notificationsService;
  }
  categories = signal([]);
  deleteCategory(category) {
    if (!category.uuid) {
      return Promise.resolve();
    }
    return this.categoryRepository.deleteOne(category.uuid).then(() => {
      this.loadCategory();
      this._notificationsService.success("categories.deleted");
    });
  }
  async ngOnInit() {
    await this.loadCategory();
  }
  loadCategory() {
    this.categoryRepository.getAll().then((categories) => {
      const sorted = categories.toSorted((a, b) => a.name.localeCompare(b.name));
      this.categories.set(sorted);
    });
  }
  static \u0275fac = function CategoryListComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _CategoryListComponent)(\u0275\u0275directiveInject(CategoryProductsRepository), \u0275\u0275directiveInject(NotificationsService));
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _CategoryListComponent, selectors: [["lg-category-list"]], decls: 12, vars: 12, consts: [[3, "center"], [3, "flat", "link", "size"], ["lgCardListItem", ""], [1, "expand"], [3, "size", "link", "flat"], [3, "click", "size", "icon"], ["aria-hidden", "false", "aria-label", "Example home icon", "fontIcon", "close"]], template: function CategoryListComponent_Template(rf, ctx) {
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
      \u0275\u0275repeaterCreate(10, CategoryListComponent_For_11_Template, 1, 0, null, 2, \u0275\u0275repeaterTrackByIndex);
      \u0275\u0275elementEnd()()();
    }
    if (rf & 2) {
      \u0275\u0275advance(2);
      \u0275\u0275property("center", true);
      \u0275\u0275advance(2);
      \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind1(5, 8, "categories.products.title"), " ");
      \u0275\u0275advance(2);
      \u0275\u0275styleMap("primary");
      \u0275\u0275property("flat", true)("link", "/settings/categories/products/add")("size", "small");
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
    TranslatePipe
  ], styles: ["\n\n[_nghost-%COMP%] {\n  display: block;\n}\n/*# sourceMappingURL=category-list.component.css.map */"] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(CategoryListComponent, [{
    type: Component,
    args: [{ selector: "lg-category-list", standalone: true, template: `
      <lg-fade-in>
          <lg-container>
              <lg-flex-row [center]="true">
                  <lg-title>
                      {{ 'categories.products.title' | translate }}
                  </lg-title>

                  <lg-button [flat]="true"
                             [link]="'/settings/categories/products/add'"
                             [size]="'small'"
                             [style]="'primary'">
                      {{ 'add-label' | translate }}
                  </lg-button>
              </lg-flex-row>

              <lg-card-list>
                  @for (category of categories();track $index;let i = $index) {
                      <ng-template lgCardListItem>
                          <lg-flex-row [center]="true">
                              <div class="expand">
                                  {{ category.name }}
                              </div>
                              <lg-button [style]="'primary'"
                                         [size]="'small'"
                                         [link]="'/settings/categories/products/edit/' + category.uuid"
                                         [flat]="true">
                                  {{ 'edit-label' | translate }}
                              </lg-button>
                              <lg-button [style]="'danger'"
                                         [size]="'tiny'"
                                         [icon]="true"
                                         (click)="deleteCategory(category)">
                                  <mat-icon aria-hidden="false" aria-label="Example home icon"
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
      TranslatePipe
    ], styles: ["/* angular:styles/component:scss;01c1eed413cbcab17b345a4da1b468b4e2a0a4e51bc2f6ee57d46c1ca65a67bb;/Users/khripunovpavel/Documents/my/lasagna/lasagna/src/app/features/settings/view/categories/category-product/list/category-list.component.ts */\n:host {\n  display: block;\n}\n/*# sourceMappingURL=category-list.component.css.map */\n"] }]
  }], () => [{ type: CategoryProductsRepository }, { type: NotificationsService }], null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(CategoryListComponent, { className: "CategoryListComponent", filePath: "src/app/features/settings/view/categories/category-product/list/category-list.component.ts", lineNumber: 79 });
})();
export {
  CategoryListComponent
};
//# sourceMappingURL=chunk-VCBO3RGC.js.map
