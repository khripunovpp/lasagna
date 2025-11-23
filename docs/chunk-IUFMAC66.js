import {
  CardListComponent
} from "./chunk-G5EJUL2A.js";
import {
  ExpandDirective
} from "./chunk-NZ2BIUGW.js";
import "./chunk-7PXYLFXV.js";
import {
  CardListItemDirective
} from "./chunk-GFM7A3VZ.js";
import {
  FlexRowComponent
} from "./chunk-VVGY6OUS.js";
import "./chunk-R64U7JLD.js";
import {
  MatIcon
} from "./chunk-2SFSXA66.js";
import {
  CategoryProductsRepository
} from "./chunk-CFCFQO5U.js";
import "./chunk-RBDPPOGX.js";
import "./chunk-BUGRPEBT.js";
import "./chunk-BPMAQ256.js";
import "./chunk-OGDPSEDB.js";
import {
  NotificationsService
} from "./chunk-6WNKKHFO.js";
import "./chunk-NLONWH5J.js";
import "./chunk-MV7X5YHM.js";
import {
  IS_CLIENT
} from "./chunk-QHJLSFIB.js";
import "./chunk-3UJV2MM3.js";
import "./chunk-UG5XPMCB.js";
import "./chunk-XXA7PPXB.js";
import {
  errorHandler
} from "./chunk-XIU3WVPC.js";
import "./chunk-T5CRNY7R.js";
import "./chunk-IWOUTMKL.js";
import "./chunk-R5O3TEDB.js";
import "./chunk-KM2DRJZA.js";
import "./chunk-2S3NUMNU.js";
import "./chunk-PHCOZAXM.js";
import "./chunk-AWZMWU52.js";
import "./chunk-5WJUMO7X.js";
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
import "./chunk-2CTN2MPX.js";
import "./chunk-NJX644NS.js";
import "./chunk-CFXQGSQM.js";
import {
  TranslatePipe
} from "./chunk-755Q3QHA.js";
import "./chunk-L34DFTMV.js";
import "./chunk-USF337CA.js";
import "./chunk-VVQKNBNV.js";
import {
  AsyncPipe
} from "./chunk-X2X7GTPW.js";
import "./chunk-PZQLIUCM.js";
import "./chunk-7YWLATDR.js";
import {
  Component,
  EventEmitter,
  Output,
  defer,
  inject,
  setClassMetadata,
  ɵsetClassDebugInfo,
  ɵɵadvance,
  ɵɵdeclareLet,
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
  ɵɵpureFunction0,
  ɵɵrepeater,
  ɵɵrepeaterCreate,
  ɵɵrepeaterTrackByIndex,
  ɵɵresetView,
  ɵɵrestoreView,
  ɵɵstyleMap,
  ɵɵtemplate,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1
} from "./chunk-IYCVPBRB.js";
import "./chunk-46DXP6YY.js";

// src/app/features/settings/view/categories/category-product/list/category-list.component.ts
var _c0 = () => [];
function CategoryListComponent_For_9_ng_template_0_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "lg-flex-row", 4)(1, "div", 5);
    \u0275\u0275listener("click", function CategoryListComponent_For_9_ng_template_0_Template_div_click_1_listener() {
      \u0275\u0275restoreView(_r1);
      const category_r2 = \u0275\u0275nextContext().$implicit;
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.onEdit.emit(category_r2.uuid));
    });
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "lg-button", 6);
    \u0275\u0275listener("click", function CategoryListComponent_For_9_ng_template_0_Template_lg_button_click_3_listener() {
      \u0275\u0275restoreView(_r1);
      const category_r2 = \u0275\u0275nextContext().$implicit;
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.deleteCategory(category_r2));
    });
    \u0275\u0275element(4, "mat-icon", 7);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const category_r2 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275property("center", true);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", category_r2.name, " ");
    \u0275\u0275advance();
    \u0275\u0275styleMap("danger");
    \u0275\u0275property("size", "tiny")("icon", true);
  }
}
function CategoryListComponent_For_9_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275template(0, CategoryListComponent_For_9_ng_template_0_Template, 5, 6, "ng-template", 3);
  }
}
var CategoryListComponent = class _CategoryListComponent {
  categoryRepository;
  _notificationsService;
  constructor(categoryRepository, _notificationsService) {
    this.categoryRepository = categoryRepository;
    this._notificationsService = _notificationsService;
  }
  onEdit = new EventEmitter();
  categories = defer(() => this.categoryRepository.categories$);
  isClient = inject(IS_CLIENT);
  deleteCategory(category) {
    if (!category.uuid) {
      return Promise.resolve();
    }
    return this.categoryRepository.deleteOne(category.uuid).then(() => {
      this.loadCategory();
      this._notificationsService.success("categories.deleted");
    }).catch((e) => {
      this._notificationsService.error(errorHandler(e));
    });
  }
  ngOnInit() {
    if (!this.isClient) {
      return;
    }
    this.loadCategory();
  }
  async loadCategory() {
    try {
      await this.categoryRepository.loadAll();
    } catch (e) {
      this._notificationsService.error(errorHandler(e));
    }
  }
  static \u0275fac = function CategoryListComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _CategoryListComponent)(\u0275\u0275directiveInject(CategoryProductsRepository), \u0275\u0275directiveInject(NotificationsService));
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _CategoryListComponent, selectors: [["lg-category-list"]], outputs: { onEdit: "onEdit" }, decls: 10, vars: 7, consts: [[3, "size"], [1, "text-small"], [2, "--card-list-bg", "var(--control-bg)"], ["lgCardListItem", ""], [3, "center"], ["lgExpand", "", 2, "cursor", "pointer", 3, "click"], [3, "click", "size", "icon"], ["aria-hidden", "false", "aria-label", "Delete", "fontIcon", "close"]], template: function CategoryListComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "lg-fade-in")(1, "lg-flex-column", 0)(2, "div", 1);
      \u0275\u0275text(3);
      \u0275\u0275pipe(4, "translate");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(5, "lg-card-list", 2);
      \u0275\u0275declareLet(6);
      \u0275\u0275pipe(7, "async");
      \u0275\u0275repeaterCreate(8, CategoryListComponent_For_9_Template, 1, 0, null, 3, \u0275\u0275repeaterTrackByIndex);
      \u0275\u0275elementEnd()()();
    }
    if (rf & 2) {
      \u0275\u0275advance();
      \u0275\u0275property("size", "small");
      \u0275\u0275advance(2);
      \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(4, 2, "categories.products.title"));
      const cats_r4 = \u0275\u0275pipeBind1(7, 4, ctx.categories) ?? \u0275\u0275pureFunction0(6, _c0);
      \u0275\u0275advance(5);
      \u0275\u0275repeater(cats_r4);
    }
  }, dependencies: [
    FlexRowComponent,
    ButtonComponent,
    MatIcon,
    CardListComponent,
    CardListItemDirective,
    FadeInComponent,
    ExpandDirective,
    FlexColumnComponent,
    TranslatePipe,
    AsyncPipe
  ], styles: ["\n\n[_nghost-%COMP%] {\n  display: block;\n}\n/*# sourceMappingURL=category-list.component.css.map */"] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(CategoryListComponent, [{
    type: Component,
    args: [{ selector: "lg-category-list", standalone: true, template: `
    <lg-fade-in>
      <lg-flex-column [size]="'small'">
        <div class="text-small">{{ 'categories.products.title' | translate }}</div>

        <lg-card-list style="--card-list-bg: var(--control-bg)">
          @let cats = (categories | async) ?? [];
          @for (category of cats; track i; let i = $index) {
            <ng-template lgCardListItem>
              <lg-flex-row [center]="true">
                <div lgExpand (click)="onEdit.emit(category.uuid)" style="cursor: pointer;">
                  {{ category.name }}
                </div>

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
      </lg-flex-column>
    </lg-fade-in>
  `, imports: [
      FlexRowComponent,
      ButtonComponent,
      MatIcon,
      CardListComponent,
      CardListItemDirective,
      FadeInComponent,
      TranslatePipe,
      ExpandDirective,
      AsyncPipe,
      FlexColumnComponent
    ], styles: ["/* angular:styles/component:scss;01c1eed413cbcab17b345a4da1b468b4e2a0a4e51bc2f6ee57d46c1ca65a67bb;/Users/khripunovpavel/Documents/my/lasagna/lasagna/src/app/features/settings/view/categories/category-product/list/category-list.component.ts */\n:host {\n  display: block;\n}\n/*# sourceMappingURL=category-list.component.css.map */\n"] }]
  }], () => [{ type: CategoryProductsRepository }, { type: NotificationsService }], { onEdit: [{
    type: Output
  }] });
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(CategoryListComponent, { className: "CategoryListComponent", filePath: "src/app/features/settings/view/categories/category-product/list/category-list.component.ts", lineNumber: 69 });
})();
export {
  CategoryListComponent
};
//# sourceMappingURL=chunk-IUFMAC66.js.map
