import {
  CardListComponent,
  CardListItemDirective
} from "./chunk-BSCLEJ6Z.js";
import "./chunk-47THLFJI.js";
import {
  MatIcon
} from "./chunk-JVNP6C27.js";
import {
  ContainerComponent
} from "./chunk-U5POLJOC.js";
import {
  GapRowComponent
} from "./chunk-RWMLY22Y.js";
import "./chunk-R64U7JLD.js";
import {
  FadeInComponent
} from "./chunk-JNX3I5QY.js";
import "./chunk-HNJAQDA3.js";
import {
  TitleComponent
} from "./chunk-F2TP5Q2W.js";
import {
  CategoryProductsRepository
} from "./chunk-LVU2JMH2.js";
import "./chunk-XLVGBYUT.js";
import {
  ButtonComponent,
  NotificationsService
} from "./chunk-EH6A44OR.js";
import "./chunk-UGLIF2MQ.js";
import "./chunk-Q4M4NLQD.js";
import "./chunk-5WJUMO7X.js";
import "./chunk-5MHPI2FA.js";
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
} from "./chunk-6AETQSBA.js";
import "./chunk-PZQLIUCM.js";
import "./chunk-46DXP6YY.js";

// src/app/features/settings/view/categories/category-product/list/category-list.component.ts
function CategoryListComponent_For_9_ng_template_0_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "lg-gap-row", 0)(1, "div", 3);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "lg-button", 4);
    \u0275\u0275text(4, " Edit ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "lg-button", 5);
    \u0275\u0275listener("click", function CategoryListComponent_For_9_ng_template_0_Template_lg_button_click_5_listener() {
      \u0275\u0275restoreView(_r1);
      const category_r2 = \u0275\u0275nextContext().$implicit;
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.deleteCategory(category_r2));
    });
    \u0275\u0275element(6, "mat-icon", 6);
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
    \u0275\u0275advance(2);
    \u0275\u0275styleMap("danger");
    \u0275\u0275property("size", "tiny")("icon", true);
  }
}
function CategoryListComponent_For_9_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275template(0, CategoryListComponent_For_9_ng_template_0_Template, 7, 11, "ng-template", 2);
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
      this._notificationsService.success("Category deleted");
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
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _CategoryListComponent, selectors: [["lg-category-list"]], decls: 10, vars: 6, consts: [[3, "center"], [3, "flat", "link", "size"], ["lgCardListItem", ""], [1, "expand"], [3, "size", "link", "flat"], [3, "click", "size", "icon"], ["aria-hidden", "false", "aria-label", "Example home icon", "fontIcon", "close"]], template: function CategoryListComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "lg-fade-in")(1, "lg-container")(2, "lg-gap-row", 0)(3, "lg-title");
      \u0275\u0275text(4, " Products' categories ");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(5, "lg-button", 1);
      \u0275\u0275text(6, " Add ");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(7, "lg-card-list");
      \u0275\u0275repeaterCreate(8, CategoryListComponent_For_9_Template, 1, 0, null, 2, \u0275\u0275repeaterTrackByIndex);
      \u0275\u0275elementEnd()()();
    }
    if (rf & 2) {
      \u0275\u0275advance(2);
      \u0275\u0275property("center", true);
      \u0275\u0275advance(3);
      \u0275\u0275styleMap("primary");
      \u0275\u0275property("flat", true)("link", "/settings/categories/products/add")("size", "small");
      \u0275\u0275advance(3);
      \u0275\u0275repeater(ctx.categories());
    }
  }, dependencies: [
    GapRowComponent,
    ButtonComponent,
    MatIcon,
    ContainerComponent,
    TitleComponent,
    CardListComponent,
    CardListItemDirective,
    FadeInComponent
  ], styles: ["\n\n[_nghost-%COMP%] {\n  display: block;\n}\n/*# sourceMappingURL=category-list.component.css.map */"] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(CategoryListComponent, [{
    type: Component,
    args: [{ selector: "lg-category-list", standalone: true, template: `
      <lg-fade-in>
          <lg-container>
              <lg-gap-row [center]="true">
                  <lg-title>
                      Products' categories
                  </lg-title>

                  <lg-button [flat]="true"
                             [link]="'/settings/categories/products/add'"
                             [size]="'small'"
                             [style]="'primary'">
                      Add
                  </lg-button>
              </lg-gap-row>

              <lg-card-list>
                  @for (category of categories();track $index;let i = $index) {
                      <ng-template lgCardListItem>
                          <lg-gap-row [center]="true">
                              <div class="expand">
                                  {{ category.name }}
                              </div>
                              <lg-button [style]="'primary'"
                                         [size]="'small'"
                                         [link]="'/settings/categories/products/edit/' + category.uuid"
                                         [flat]="true">
                                  Edit
                              </lg-button>
                              <lg-button [style]="'danger'"
                                         [size]="'tiny'"
                                         [icon]="true"
                                         (click)="deleteCategory(category)">
                                  <mat-icon aria-hidden="false" aria-label="Example home icon"
                                            fontIcon="close"></mat-icon>
                              </lg-button>
                          </lg-gap-row>
                      </ng-template>
                  }
              </lg-card-list>
          </lg-container>
      </lg-fade-in>
  `, imports: [
      GapRowComponent,
      ButtonComponent,
      MatIcon,
      ContainerComponent,
      TitleComponent,
      CardListComponent,
      CardListItemDirective,
      FadeInComponent
    ], styles: ["/* angular:styles/component:scss;01c1eed413cbcab17b345a4da1b468b4e2a0a4e51bc2f6ee57d46c1ca65a67bb;/Users/khripunovpavel/Documents/my/lasagna/lasagna/src/app/features/settings/view/categories/category-product/list/category-list.component.ts */\n:host {\n  display: block;\n}\n/*# sourceMappingURL=category-list.component.css.map */\n"] }]
  }], () => [{ type: CategoryProductsRepository }, { type: NotificationsService }], null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(CategoryListComponent, { className: "CategoryListComponent", filePath: "src/app/features/settings/view/categories/category-product/list/category-list.component.ts", lineNumber: 77 });
})();
export {
  CategoryListComponent
};
//# sourceMappingURL=chunk-FMIJMGBX.js.map
