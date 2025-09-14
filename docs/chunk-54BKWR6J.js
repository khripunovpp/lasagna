import {
  CardListComponent
} from "./chunk-52UDSYPE.js";
import {
  CardListItemDirective
} from "./chunk-LO7OU7O6.js";
import "./chunk-A6I5NIXC.js";
import {
  ExpandDirective
} from "./chunk-MZW34F72.js";
import {
  MatIcon
} from "./chunk-B75WIWDC.js";
import {
  ContainerComponent
} from "./chunk-I5TV5PZO.js";
import {
  FlexRowComponent
} from "./chunk-HD3CIKT2.js";
import "./chunk-R64U7JLD.js";
import {
  FadeInComponent
} from "./chunk-CFXO4QN2.js";
import "./chunk-R4FNXVZE.js";
import {
  TitleComponent
} from "./chunk-XDUS4EDS.js";
import {
  CategoryProductsRepository
} from "./chunk-UR2JK3SC.js";
import "./chunk-B7U2Y5MS.js";
import "./chunk-2EB4YEVS.js";
import "./chunk-M36IWQ2M.js";
import {
  NotificationsService
} from "./chunk-47KQBWHW.js";
import "./chunk-T5CRNY7R.js";
import "./chunk-35FYRUF7.js";
import "./chunk-IWOUTMKL.js";
import {
  ButtonComponent
} from "./chunk-WXEPVKGR.js";
import "./chunk-2WAYXBXK.js";
import "./chunk-5WJUMO7X.js";
import {
  TranslatePipe
} from "./chunk-5DXDC4YK.js";
import {
  RouterLink
} from "./chunk-4GIPLJK3.js";
import "./chunk-GWD65WQG.js";
import "./chunk-NOT5QO64.js";
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
} from "./chunk-CHNANXCD.js";
import "./chunk-PZQLIUCM.js";
import "./chunk-7YWLATDR.js";
import "./chunk-46DXP6YY.js";

// src/app/features/settings/view/categories/category-product/list/category-list.component.ts
function CategoryListComponent_For_11_ng_template_0_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "lg-flex-row", 0)(1, "a", 3);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "lg-button", 4);
    \u0275\u0275listener("click", function CategoryListComponent_For_11_ng_template_0_Template_lg_button_click_3_listener() {
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
    \u0275\u0275property("routerLink", "/settings/categories/products/edit/" + category_r2.uuid);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", category_r2.name, " ");
    \u0275\u0275advance();
    \u0275\u0275styleMap("danger");
    \u0275\u0275property("size", "tiny")("icon", true);
  }
}
function CategoryListComponent_For_11_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275template(0, CategoryListComponent_For_11_ng_template_0_Template, 5, 7, "ng-template", 2);
  }
}
var CategoryListComponent = class _CategoryListComponent {
  categoryRepository;
  _notificationsService;
  constructor(categoryRepository, _notificationsService) {
    this.categoryRepository = categoryRepository;
    this._notificationsService = _notificationsService;
  }
  categories = signal([], ...ngDevMode ? [{ debugName: "categories" }] : []);
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
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _CategoryListComponent, selectors: [["lg-category-list"]], decls: 12, vars: 12, consts: [[3, "center"], [3, "link", "size", "outlined"], ["lgCardListItem", ""], ["lgExpand", "", 3, "routerLink"], [3, "click", "size", "icon"], ["aria-hidden", "false", "aria-label", "Delete", "fontIcon", "close"]], template: function CategoryListComponent_Template(rf, ctx) {
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
      \u0275\u0275styleMap("default");
      \u0275\u0275property("link", "/settings/categories/products/add")("size", "tiny")("outlined", true);
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
    RouterLink,
    ExpandDirective,
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

          <lg-button [link]="'/settings/categories/products/add'"
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
                <a [routerLink]="'/settings/categories/products/edit/' + category.uuid"
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
      RouterLink,
      ExpandDirective
    ], styles: ["/* angular:styles/component:scss;01c1eed413cbcab17b345a4da1b468b4e2a0a4e51bc2f6ee57d46c1ca65a67bb;/Users/khripunovpavel/Documents/my/lasagna/lasagna/src/app/features/settings/view/categories/category-product/list/category-list.component.ts */\n:host {\n  display: block;\n}\n/*# sourceMappingURL=category-list.component.css.map */\n"] }]
  }], () => [{ type: CategoryProductsRepository }, { type: NotificationsService }], null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(CategoryListComponent, { className: "CategoryListComponent", filePath: "src/app/features/settings/view/categories/category-product/list/category-list.component.ts", lineNumber: 79 });
})();
export {
  CategoryListComponent
};
//# sourceMappingURL=chunk-54BKWR6J.js.map
