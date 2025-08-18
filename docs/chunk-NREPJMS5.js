import {
  UserCurrencyPipe
} from "./chunk-7Y6GLMQD.js";
import {
  ExpanderComponent,
  ImportComponent,
  ImportRowTplDirective,
  ProductScheme
} from "./chunk-CP3ACIWG.js";
import {
  ControlsBarComponent,
  SelectionToolsComponent
} from "./chunk-HTGIMZ3V.js";
import "./chunk-DN4XY2UK.js";
import {
  CardListComponent
} from "./chunk-GW7MY6XY.js";
import {
  CardListItemDirective
} from "./chunk-I2GJGW5L.js";
import "./chunk-ZK4SIRUU.js";
import "./chunk-OAK3DILL.js";
import "./chunk-ZCQS34BO.js";
import {
  PullDirective
} from "./chunk-JRXVPNYC.js";
import {
  InlineSeparatedGroupComponent,
  InlineSeparatedGroupDirective
} from "./chunk-VWS7U6ZE.js";
import {
  ExpandDirective
} from "./chunk-OCPTIUJK.js";
import {
  MatIcon
} from "./chunk-DHMDFBEO.js";
import {
  ContainerComponent
} from "./chunk-UX3GX3WK.js";
import {
  FlexRowComponent
} from "./chunk-TYQOT2W3.js";
import "./chunk-C7YIU4ER.js";
import {
  TimeAgoPipe
} from "./chunk-RWMTLK2E.js";
import {
  FlexColumnComponent
} from "./chunk-WKEFA3OS.js";
import "./chunk-R64U7JLD.js";
import {
  FadeInComponent
} from "./chunk-GKY6K6EK.js";
import "./chunk-HNJAQDA3.js";
import {
  TitleComponent
} from "./chunk-LKA4ZC5L.js";
import {
  CategoryProductsRepository,
  ProductsRepository,
  TransferDataService
} from "./chunk-P4V7CRMQ.js";
import "./chunk-HLCLXN3F.js";
import "./chunk-UFXGBGSU.js";
import {
  NotificationsService,
  SelectionZoneService,
  groupBy,
  toSignal
} from "./chunk-44YNW6NC.js";
import "./chunk-Q4M4NLQD.js";
import {
  ButtonComponent
} from "./chunk-PTCGLHTR.js";
import {
  TranslatePipe
} from "./chunk-UMVMUCIR.js";
import {
  Stores
} from "./chunk-CTLQRZYU.js";
import "./chunk-5WJUMO7X.js";
import {
  RouterLink
} from "./chunk-JRXEEUAD.js";
import "./chunk-5MLLJAOM.js";
import {
  CurrencyPipe
} from "./chunk-76JI64DZ.js";
import {
  Component,
  HostBinding,
  InjectionToken,
  from,
  inject,
  map,
  mergeMap,
  setClassMetadata,
  signal,
  switchMap,
  ɵsetClassDebugInfo,
  ɵɵProvidersFeature,
  ɵɵadvance,
  ɵɵattribute,
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
  ɵɵpipeBind2,
  ɵɵproperty,
  ɵɵpureFunction0,
  ɵɵpureFunction1,
  ɵɵrepeater,
  ɵɵrepeaterCreate,
  ɵɵrepeaterTrackByIndex,
  ɵɵresetView,
  ɵɵrestoreView,
  ɵɵstyleMap,
  ɵɵtemplate,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1,
  ɵɵtextInterpolate2
} from "./chunk-UQVCVPTQ.js";
import "./chunk-PZQLIUCM.js";
import "./chunk-7YWLATDR.js";
import "./chunk-46DXP6YY.js";

// src/app/features/products/service/categorized-products-list.token.ts
var CATEGORIZED_PRODUCTS_LIST = new InjectionToken("CategorizedProductsList", {
  factory: () => {
    const productsRepository = inject(ProductsRepository);
    const categoryRepository = inject(CategoryProductsRepository);
    const products = from(productsRepository.loadAll()).pipe(switchMap(() => productsRepository.products$));
    return products.pipe(map((products2) => products2.toSorted((a, b) => a.name.localeCompare(b.name))), map((products2) => groupBy(products2, "category_id")), mergeMap(async (grouped) => {
      const list = [];
      const uuids = Object.keys(grouped).filter((uuid) => uuid !== "");
      const categories = await categoryRepository.getMany(uuids);
      for (const groupKey in grouped) {
        const products2 = grouped[groupKey];
        if (products2 && products2.length) {
          list.push({
            category: groupKey,
            products: products2
          });
        }
      }
      if (!list.length)
        return [];
      const [first, ...sortedList] = list.toSorted((a, b) => a.category > b.category ? 1 : -1);
      if (first?.category) {
        return [first].concat(sortedList);
      }
      return sortedList.concat([first]);
    }));
  }
});

// src/app/features/products/view/list/draft-products-list.compoent.ts
var _c0 = (a0) => ({ length: a0 });
var _forTrack0 = ($index, $item) => $item.uuid;
function DraftProductsListCompoent_Conditional_0_ng_template_4_Template(rf, ctx) {
  if (rf & 1) {
    const _r2 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "lg-button", 4);
    \u0275\u0275listener("click", function DraftProductsListCompoent_Conditional_0_ng_template_4_Template_lg_button_click_0_listener() {
      \u0275\u0275restoreView(_r2);
      const ctx_r2 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r2.selectionZoneService.onSelection());
    });
    \u0275\u0275text(1);
    \u0275\u0275pipe(2, "translate");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    \u0275\u0275styleMap("success");
    \u0275\u0275property("flat", true)("size", "small");
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind1(2, 5, "select-many-label"), " ");
  }
}
function DraftProductsListCompoent_Conditional_0_ng_template_5_Template(rf, ctx) {
  if (rf & 1) {
    const _r4 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "lg-button", 4);
    \u0275\u0275listener("click", function DraftProductsListCompoent_Conditional_0_ng_template_5_Template_lg_button_click_0_listener() {
      \u0275\u0275restoreView(_r4);
      const ctx_r2 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r2.deleteAllDrafts());
    });
    \u0275\u0275text(1);
    \u0275\u0275pipe(2, "translate");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    \u0275\u0275styleMap("danger");
    \u0275\u0275property("flat", true)("size", "small");
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind1(2, 5, "delete-all-label"), " ");
  }
}
function DraftProductsListCompoent_Conditional_0_Conditional_6_ng_template_0_Template(rf, ctx) {
  if (rf & 1) {
    const _r5 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "lg-button", 5);
    \u0275\u0275listener("click", function DraftProductsListCompoent_Conditional_0_Conditional_6_ng_template_0_Template_lg_button_click_0_listener() {
      \u0275\u0275restoreView(_r5);
      const ctx_r2 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r2.deletedSelectedDrafts());
    });
    \u0275\u0275text(1);
    \u0275\u0275pipe(2, "translate");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const selected_r6 = \u0275\u0275nextContext();
    \u0275\u0275styleMap("danger");
    \u0275\u0275property("flat", true)("disabled", !(selected_r6 == null ? null : selected_r6.size))("size", "small");
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind1(2, 6, "delete-selected-label"), " ");
  }
}
function DraftProductsListCompoent_Conditional_0_Conditional_6_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275template(0, DraftProductsListCompoent_Conditional_0_Conditional_6_ng_template_0_Template, 3, 8, "ng-template", 1);
  }
}
function DraftProductsListCompoent_Conditional_0_For_9_ng_template_0_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275text(0);
    \u0275\u0275pipe(1, "translate");
  }
  if (rf & 2) {
    \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind1(1, 1, "draft.list-prefix.existing"), " ");
  }
}
function DraftProductsListCompoent_Conditional_0_For_9_ng_template_0_Conditional_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275text(0);
    \u0275\u0275pipe(1, "translate");
  }
  if (rf & 2) {
    \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind1(1, 1, "draft.list-prefix.new"), " ");
  }
}
function DraftProductsListCompoent_Conditional_0_For_9_ng_template_0_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "lg-flex-row", 6)(1, "a", 7);
    \u0275\u0275conditionalCreate(2, DraftProductsListCompoent_Conditional_0_For_9_ng_template_0_Conditional_2_Template, 2, 3)(3, DraftProductsListCompoent_Conditional_0_For_9_ng_template_0_Conditional_3_Template, 2, 3);
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "small", 8);
    \u0275\u0275text(6);
    \u0275\u0275pipe(7, "translate");
    \u0275\u0275pipe(8, "timeAgo");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const item_r7 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275property("center", true);
    \u0275\u0275advance();
    \u0275\u0275property("routerLink", "/products/draft/" + (item_r7 == null ? null : item_r7.uuid));
    \u0275\u0275advance();
    \u0275\u0275conditional((item_r7 == null ? null : item_r7.meta == null ? null : item_r7.meta["uuid"]) ? 2 : 3);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", (item_r7 == null ? null : item_r7.data == null ? null : item_r7.data.name) || "Unknown", " ");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate2(" ", \u0275\u0275pipeBind1(7, 6, "edited-at-label"), " ", \u0275\u0275pipeBind1(8, 8, (item_r7 == null ? null : item_r7.updatedAt) || (item_r7 == null ? null : item_r7.createdAt)), " ");
  }
}
function DraftProductsListCompoent_Conditional_0_For_9_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275template(0, DraftProductsListCompoent_Conditional_0_For_9_ng_template_0_Template, 9, 10, "ng-template", 3);
  }
  if (rf & 2) {
    const item_r7 = ctx.$implicit;
    \u0275\u0275property("uuid", item_r7.uuid);
  }
}
function DraftProductsListCompoent_Conditional_0_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "lg-expander", 0);
    \u0275\u0275pipe(1, "translate");
    \u0275\u0275pipe(2, "translate");
    \u0275\u0275elementStart(3, "lg-inline-separated-group");
    \u0275\u0275template(4, DraftProductsListCompoent_Conditional_0_ng_template_4_Template, 3, 7, "ng-template", 1)(5, DraftProductsListCompoent_Conditional_0_ng_template_5_Template, 3, 7, "ng-template", 1);
    \u0275\u0275conditionalCreate(6, DraftProductsListCompoent_Conditional_0_Conditional_6_Template, 1, 0, null, 1);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "lg-card-list", 2);
    \u0275\u0275listener("onSelected", function DraftProductsListCompoent_Conditional_0_Template_lg_card_list_onSelected_7_listener($event) {
      \u0275\u0275restoreView(_r1);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.selectionZoneService.putSelected($event));
    })("onDeleteOne", function DraftProductsListCompoent_Conditional_0_Template_lg_card_list_onDeleteOne_7_listener($event) {
      \u0275\u0275restoreView(_r1);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.deleteDraft($event == null ? null : $event.uuid));
    });
    \u0275\u0275repeaterCreate(8, DraftProductsListCompoent_Conditional_0_For_9_Template, 1, 1, null, 3, _forTrack0);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    let tmp_2_0;
    let tmp_3_0;
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275property("closeLabel", \u0275\u0275pipeBind1(1, 6, "drafts-close-label"))("openLabel", \u0275\u0275pipeBind2(2, 8, "drafts-label", \u0275\u0275pureFunction1(11, _c0, (tmp_2_0 = ctx_r2.drafts()) == null ? null : tmp_2_0.length)));
    \u0275\u0275advance(6);
    \u0275\u0275conditional((tmp_3_0 = ctx_r2.selectionZoneService.selected()) ? 6 : -1, tmp_3_0);
    \u0275\u0275advance();
    \u0275\u0275property("mode", ctx_r2.selectionZoneService.selectionMode())("selectAll", ctx_r2.selectionZoneService.selectAll())("deselectAll", ctx_r2.selectionZoneService.deselectAll());
    \u0275\u0275advance();
    \u0275\u0275repeater(ctx_r2.drafts());
  }
}
var DraftProductsListCompoent = class _DraftProductsListCompoent {
  _productsRepository;
  _notificationsService;
  selectionZoneService;
  constructor(_productsRepository, _notificationsService, selectionZoneService) {
    this._productsRepository = _productsRepository;
    this._notificationsService = _notificationsService;
    this.selectionZoneService = selectionZoneService;
  }
  products = toSignal(inject(CATEGORIZED_PRODUCTS_LIST));
  drafts = signal([]);
  ProductDbInputScheme = ProductScheme;
  get hidden() {
    return this.drafts()?.length === 0 ? true : null;
  }
  deleteDraft(draftUUID) {
    if (!draftUUID) {
      return;
    }
    this._productsRepository.removeDraftProduct(draftUUID);
    this.drafts.update((drafts) => {
      return drafts.filter((item) => item?.uuid !== draftUUID);
    });
  }
  deleteAllDrafts() {
    this._productsRepository.removeDraftMany(this.drafts().map((item) => item.uuid)).then(() => {
      this.drafts.set([]);
      this._notificationsService.success("notifications.drafts.deleted");
    });
  }
  deletedSelectedDrafts() {
    const selected = this.selectionZoneService.selected();
    if (!selected)
      return;
    this._productsRepository.removeDraftMany(Array.from(selected)).then(() => {
      this.drafts.update((drafts) => {
        return drafts.filter((item) => !selected.has(item.uuid));
      });
      this._notificationsService.success("notifications.drafts.deleted");
    });
  }
  ngOnInit() {
    const draft = this._productsRepository.getDraftProducts();
    if (draft) {
      this.drafts.set(draft);
    }
  }
  static \u0275fac = function DraftProductsListCompoent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _DraftProductsListCompoent)(\u0275\u0275directiveInject(ProductsRepository), \u0275\u0275directiveInject(NotificationsService), \u0275\u0275directiveInject(SelectionZoneService));
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _DraftProductsListCompoent, selectors: [["lg-draft-products-list"]], hostVars: 1, hostBindings: function DraftProductsListCompoent_HostBindings(rf, ctx) {
    if (rf & 2) {
      \u0275\u0275attribute("hidden", ctx.hidden);
    }
  }, features: [\u0275\u0275ProvidersFeature([
    SelectionZoneService
  ])], decls: 1, vars: 1, consts: [[3, "closeLabel", "openLabel"], ["lgInlineSeparatedGroup", ""], [2, "--card-bg", "var(--card-bg-draft)", 3, "onSelected", "onDeleteOne", "mode", "selectAll", "deselectAll"], ["lgCardListItem", "", "type", "draft", 3, "uuid"], [3, "click", "flat", "size"], [3, "click", "flat", "disabled", "size"], [3, "center"], ["lgExpand", "", 3, "routerLink"], ["lgPull", "", 1, "text-muted", "text-cursive"]], template: function DraftProductsListCompoent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275conditionalCreate(0, DraftProductsListCompoent_Conditional_0_Template, 10, 13, "lg-expander", 0);
    }
    if (rf & 2) {
      let tmp_0_0;
      \u0275\u0275conditional(((tmp_0_0 = ctx.drafts()) == null ? null : tmp_0_0.length) ? 0 : -1);
    }
  }, dependencies: [
    FlexRowComponent,
    ButtonComponent,
    CardListComponent,
    CardListItemDirective,
    RouterLink,
    TimeAgoPipe,
    ExpandDirective,
    PullDirective,
    TranslatePipe,
    ExpanderComponent,
    InlineSeparatedGroupComponent,
    InlineSeparatedGroupDirective
  ], encapsulation: 2 });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(DraftProductsListCompoent, [{
    type: Component,
    args: [{ selector: "lg-draft-products-list", standalone: true, template: `
    @if (drafts()?.length) {
      <lg-expander [closeLabel]="'drafts-close-label'|translate"
                   [openLabel]="'drafts-label'|translate:{length:drafts()?.length}">

        <lg-inline-separated-group>
          <ng-template lgInlineSeparatedGroup>
            <lg-button (click)="selectionZoneService.onSelection()"
                       [flat]="true"
                       [size]="'small'"
                       [style]="'success'">
              {{ 'select-many-label'|translate }}
            </lg-button>
          </ng-template>

          <ng-template lgInlineSeparatedGroup>
            <lg-button [flat]="true"
                       [size]="'small'"
                       [style]="'danger'"
                       (click)="deleteAllDrafts()">
              {{ 'delete-all-label' | translate }}
            </lg-button>
          </ng-template>

          @if (selectionZoneService.selected(); as selected) {
            <ng-template lgInlineSeparatedGroup>
              <lg-button [flat]="true"
                         [disabled]="!selected?.size"
                         [size]="'small'"
                         [style]="'danger'"
                         (click)="deletedSelectedDrafts()">
                {{ 'delete-selected-label' | translate }}
              </lg-button>
            </ng-template>
          }
        </lg-inline-separated-group>

        <lg-card-list [mode]="selectionZoneService.selectionMode()"
                      (onSelected)="selectionZoneService.putSelected($event)"
                      (onDeleteOne)="deleteDraft($event?.uuid)"
                      [selectAll]="selectionZoneService.selectAll()"
                      [deselectAll]="selectionZoneService.deselectAll()"
                      style="--card-bg: var(--card-bg-draft)">
          @for (item of drafts(); track item.uuid) {
            <ng-template lgCardListItem [uuid]="item.uuid" type="draft">
              <lg-flex-row [center]="true">
                <a [routerLink]="'/products/draft/' + item?.uuid" lgExpand>
                  @if (item?.meta?.['uuid']) {
                    {{ 'draft.list-prefix.existing'|translate }}
                  } @else {
                    {{ 'draft.list-prefix.new'|translate }}
                  }
                  {{ item?.data?.name || 'Unknown' }}
                </a>

                <small class="text-muted text-cursive" lgPull>
                  {{ 'edited-at-label'|translate }} {{ (item?.updatedAt || item?.createdAt) | timeAgo }}
                </small>
              </lg-flex-row>
            </ng-template>
          }
        </lg-card-list>
      </lg-expander>
    }
  `, imports: [
      FlexRowComponent,
      ButtonComponent,
      CardListComponent,
      CardListItemDirective,
      RouterLink,
      TimeAgoPipe,
      ExpandDirective,
      PullDirective,
      TranslatePipe,
      ExpanderComponent,
      InlineSeparatedGroupComponent,
      InlineSeparatedGroupDirective
    ], providers: [
      SelectionZoneService
    ] }]
  }], () => [{ type: ProductsRepository }, { type: NotificationsService }, { type: SelectionZoneService }], { hidden: [{
    type: HostBinding,
    args: ["attr.hidden"]
  }] });
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(DraftProductsListCompoent, { className: "DraftProductsListCompoent", filePath: "src/app/features/products/view/list/draft-products-list.compoent.ts", lineNumber: 110 });
})();

// src/app/features/products/view/list/product-list.component.ts
var _c02 = () => ["product"];
var _forTrack02 = ($index, $item) => ($item.uuid ?? "") + $index;
function ProductListComponent_Conditional_0_ng_template_4_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "lg-button", 5);
    \u0275\u0275listener("click", function ProductListComponent_Conditional_0_ng_template_4_Template_lg_button_click_0_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.exportProducts(ctx_r1.selectionZoneService.selected()));
    });
    \u0275\u0275text(1);
    \u0275\u0275pipe(2, "translate");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    \u0275\u0275styleMap("info");
    \u0275\u0275property("flat", true)("size", "small");
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind1(2, 5, "export-label"), " ");
  }
}
function ProductListComponent_Conditional_0_ng_template_5_ng_template_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span");
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const row_r4 = ctx.$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(row_r4 == null ? null : row_r4.name);
  }
}
function ProductListComponent_Conditional_0_ng_template_5_Template(rf, ctx) {
  if (rf & 1) {
    const _r3 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "lg-import", 6);
    \u0275\u0275pipe(1, "translate");
    \u0275\u0275listener("onDone", function ProductListComponent_Conditional_0_ng_template_5_Template_lg_import_onDone_0_listener() {
      \u0275\u0275restoreView(_r3);
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.loadProducts());
    });
    \u0275\u0275template(2, ProductListComponent_Conditional_0_ng_template_5_ng_template_2_Template, 2, 1, "ng-template", 7);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275property("label", \u0275\u0275pipeBind1(1, 3, "import-label"))("schema", ctx_r1.ProductScheme)("storeName", ctx_r1.Stores.PRODUCTS);
  }
}
function ProductListComponent_Conditional_0_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "lg-controls-bar")(1, "lg-button", 2);
    \u0275\u0275element(2, "mat-icon", 3);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "lg-inline-separated-group");
    \u0275\u0275template(4, ProductListComponent_Conditional_0_ng_template_4_Template, 3, 7, "ng-template", 4)(5, ProductListComponent_Conditional_0_ng_template_5_Template, 3, 5, "ng-template", 4);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    \u0275\u0275advance();
    \u0275\u0275styleMap("success");
    \u0275\u0275property("icon", true)("link", "/products/add")("size", "medium");
  }
}
function ProductListComponent_Conditional_7_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "lg-selection-tools", 0);
  }
  if (rf & 2) {
    \u0275\u0275property("selectionTypes", \u0275\u0275pureFunction0(1, _c02));
  }
}
function ProductListComponent_For_9_For_5_ng_template_0_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "lg-flex-row", 11)(1, "div", 12)(2, "lg-flex-row", 11)(3, "lg-flex-row", 13)(4, "a", 14);
    \u0275\u0275text(5);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "div");
    \u0275\u0275text(7);
    \u0275\u0275pipe(8, "userCurrency");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(9, "small", 15);
    \u0275\u0275text(10);
    \u0275\u0275pipe(11, "translate");
    \u0275\u0275pipe(12, "timeAgo");
    \u0275\u0275elementEnd()()()();
  }
  if (rf & 2) {
    const product_r6 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275property("center", true);
    \u0275\u0275advance(2);
    \u0275\u0275property("center", true);
    \u0275\u0275advance();
    \u0275\u0275property("center", true);
    \u0275\u0275advance();
    \u0275\u0275property("routerLink", "/products/edit/" + product_r6.uuid);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate2(" ", product_r6.name, " ", product_r6.source ? "- " + product_r6.source : "", " ");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate2(" ", \u0275\u0275pipeBind2(8, 10, product_r6.pricePerUnit, "1.0-5"), " ", product_r6.perUnitLabel, " ");
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate2(" ", \u0275\u0275pipeBind1(11, 13, "edited-at-label"), " ", \u0275\u0275pipeBind1(12, 15, (product_r6 == null ? null : product_r6.updatedAt) || (product_r6 == null ? null : product_r6.createdAt)), " ");
  }
}
function ProductListComponent_For_9_For_5_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275template(0, ProductListComponent_For_9_For_5_ng_template_0_Template, 13, 17, "ng-template", 10);
  }
  if (rf & 2) {
    const product_r6 = ctx.$implicit;
    \u0275\u0275property("uuid", product_r6.uuid);
  }
}
function ProductListComponent_For_9_Template(rf, ctx) {
  if (rf & 1) {
    const _r5 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "lg-title", 8);
    \u0275\u0275text(1);
    \u0275\u0275pipe(2, "translate");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "lg-card-list", 9);
    \u0275\u0275listener("onSelected", function ProductListComponent_For_9_Template_lg_card_list_onSelected_3_listener($event) {
      \u0275\u0275restoreView(_r5);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.selectionZoneService.putSelected($event));
    })("onDeleteOne", function ProductListComponent_For_9_Template_lg_card_list_onDeleteOne_3_listener($event) {
      \u0275\u0275restoreView(_r5);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.deleteProduct($event));
    });
    \u0275\u0275repeaterCreate(4, ProductListComponent_For_9_For_5_Template, 1, 1, null, 10, _forTrack02);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const category_r7 = ctx.$implicit;
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275property("level", 3);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", (category_r7 == null ? null : category_r7.category) || \u0275\u0275pipeBind1(2, 5, "without-category-label"), " ");
    \u0275\u0275advance(2);
    \u0275\u0275property("mode", ctx_r1.selectionZoneService.selectionMode())("selectAll", ctx_r1.selectionZoneService.selectAll())("deselectAll", ctx_r1.selectionZoneService.deselectAll());
    \u0275\u0275advance();
    \u0275\u0275repeater(category_r7.products);
  }
}
function ProductListComponent_ForEmpty_10_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "lg-flex-column", 1);
    \u0275\u0275text(1);
    \u0275\u0275pipe(2, "translate");
    \u0275\u0275elementStart(3, "lg-button", 16);
    \u0275\u0275text(4);
    \u0275\u0275pipe(5, "translate");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind1(2, 6, "products.empty-state.text"), " ");
    \u0275\u0275advance(2);
    \u0275\u0275styleMap("success");
    \u0275\u0275property("link", "/products/add")("size", "medium");
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind1(5, 8, "products.empty-state.btn"), " ");
  }
}
var ProductListComponent = class _ProductListComponent {
  _productsRepository;
  _transferDataService;
  _notificationsService;
  selectionZoneService;
  constructor(_productsRepository, _transferDataService, _notificationsService, selectionZoneService) {
    this._productsRepository = _productsRepository;
    this._transferDataService = _transferDataService;
    this._notificationsService = _notificationsService;
    this.selectionZoneService = selectionZoneService;
  }
  products = toSignal(inject(CATEGORIZED_PRODUCTS_LIST));
  ProductDbInputScheme = ProductScheme;
  Stores = Stores;
  ProductScheme = ProductScheme;
  exportProducts(selected) {
    this._transferDataService.exportTable(Stores.PRODUCTS, "json", {
      selected: Array.from(selected ?? [])
    });
  }
  deleteProduct(event) {
    if (!event?.uuid) {
      return;
    }
    this._productsRepository.deleteProduct(event.uuid).then(() => {
      this._notificationsService.success("notifications.product.deleted");
      this.loadProducts();
    });
  }
  ngOnInit() {
    this.loadProducts();
  }
  loadProducts() {
    this._productsRepository.loadAll();
  }
  static \u0275fac = function ProductListComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _ProductListComponent)(\u0275\u0275directiveInject(ProductsRepository), \u0275\u0275directiveInject(TransferDataService), \u0275\u0275directiveInject(NotificationsService), \u0275\u0275directiveInject(SelectionZoneService));
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _ProductListComponent, selectors: [["lg-product-list"]], features: [\u0275\u0275ProvidersFeature([
    SelectionZoneService,
    CurrencyPipe
  ])], decls: 11, vars: 6, consts: [[3, "selectionTypes"], ["position", "center", "size", "medium"], [3, "icon", "link", "size"], ["aria-hidden", "false", "fontIcon", "add"], ["lgInlineSeparatedGroup", ""], [3, "click", "flat", "size"], [3, "onDone", "label", "schema", "storeName"], ["lgImportRowTpl", ""], [3, "level"], [3, "onSelected", "onDeleteOne", "mode", "selectAll", "deselectAll"], ["lgCardListItem", "", "type", "product", 3, "uuid"], [3, "center"], [1, "expand"], ["lgExpand", "", 3, "center"], [3, "routerLink"], [1, "text-muted", "text-cursive"], [3, "link", "size"]], template: function ProductListComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275conditionalCreate(0, ProductListComponent_Conditional_0_Template, 6, 5, "lg-controls-bar");
      \u0275\u0275elementStart(1, "lg-fade-in")(2, "lg-container")(3, "lg-title");
      \u0275\u0275text(4);
      \u0275\u0275pipe(5, "translate");
      \u0275\u0275elementEnd();
      \u0275\u0275element(6, "lg-draft-products-list");
      \u0275\u0275conditionalCreate(7, ProductListComponent_Conditional_7_Template, 1, 2, "lg-selection-tools", 0);
      \u0275\u0275repeaterCreate(8, ProductListComponent_For_9_Template, 6, 7, null, null, \u0275\u0275repeaterTrackByIndex, false, ProductListComponent_ForEmpty_10_Template, 6, 10, "lg-flex-column", 1);
      \u0275\u0275elementEnd()();
    }
    if (rf & 2) {
      let tmp_0_0;
      let tmp_2_0;
      \u0275\u0275conditional(((tmp_0_0 = ctx.products()) == null ? null : tmp_0_0.length) ? 0 : -1);
      \u0275\u0275advance(4);
      \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind1(5, 4, "products.list-title"), " ");
      \u0275\u0275advance(3);
      \u0275\u0275conditional(((tmp_2_0 = ctx.products()) == null ? null : tmp_2_0.length) ? 7 : -1);
      \u0275\u0275advance();
      \u0275\u0275repeater(ctx.products());
    }
  }, dependencies: [
    FlexRowComponent,
    ButtonComponent,
    MatIcon,
    ContainerComponent,
    TitleComponent,
    CardListComponent,
    CardListItemDirective,
    ImportComponent,
    RouterLink,
    ImportRowTplDirective,
    FadeInComponent,
    ControlsBarComponent,
    SelectionToolsComponent,
    TimeAgoPipe,
    ExpandDirective,
    TranslatePipe,
    DraftProductsListCompoent,
    InlineSeparatedGroupComponent,
    InlineSeparatedGroupDirective,
    UserCurrencyPipe,
    FlexColumnComponent
  ], styles: ["\n\n[_nghost-%COMP%] {\n  display: block;\n}\n/*# sourceMappingURL=product-list.component.css.map */"] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(ProductListComponent, [{
    type: Component,
    args: [{ selector: "lg-product-list", standalone: true, template: `
    @if (products()?.length) {
      <lg-controls-bar>
        <lg-button [icon]="true"
                   [link]="'/products/add'"
                   [size]="'medium'"
                   [style]="'success'">
          <mat-icon aria-hidden="false" fontIcon="add"></mat-icon>
        </lg-button>

        <lg-inline-separated-group>
          <ng-template lgInlineSeparatedGroup>
            <lg-button (click)="exportProducts(selectionZoneService.selected())"
                       [flat]="true"
                       [size]="'small'"
                       [style]="'info'">
              {{ 'export-label'|translate }}
            </lg-button>
          </ng-template>
          <ng-template lgInlineSeparatedGroup>
            <lg-import (onDone)="loadProducts()"
                       [label]="('import-label'|translate)"
                       [schema]="ProductScheme"
                       [storeName]="Stores.PRODUCTS">
              <ng-template let-flow="flow" let-row lgImportRowTpl>
                <span>{{ row?.name }}</span>
              </ng-template>
            </lg-import>
          </ng-template>
        </lg-inline-separated-group>
      </lg-controls-bar>
    }

    <lg-fade-in>
      <lg-container>
        <lg-title>
          {{ 'products.list-title'|translate }}
        </lg-title>

        <lg-draft-products-list></lg-draft-products-list>

        @if (products()?.length) {
          <lg-selection-tools [selectionTypes]="['product']"></lg-selection-tools>
        }

        @for (category of products(); track ic; let ic = $index) {
          <lg-title [level]="3">
            {{ category?.category || ('without-category-label'|translate) }}
          </lg-title>

          <lg-card-list [mode]="selectionZoneService.selectionMode()"
                        (onSelected)="selectionZoneService.putSelected($event)"
                        (onDeleteOne)="deleteProduct($event)"
                        [selectAll]="selectionZoneService.selectAll()"
                        [deselectAll]="selectionZoneService.deselectAll()">
            @for (product of category.products; track (product.uuid ?? '') + i; let i = $index) {
              <ng-template lgCardListItem [uuid]="product.uuid" type="product">
                <lg-flex-row [center]="true">
                  <div class="expand">
                    <lg-flex-row [center]="true">
                      <lg-flex-row [center]="true" lgExpand>
                        <a [routerLink]="'/products/edit/' + product.uuid">
                          {{ product.name }} {{ product.source ? '- ' + product.source : '' }}
                        </a>

                        <div>
                          {{ $any(product).pricePerUnit | userCurrency:'1.0-5' }}
                          {{ $any(product).perUnitLabel }}
                        </div>
                      </lg-flex-row>

                      <small class="text-muted text-cursive">
                        {{ 'edited-at-label'|translate }} {{ (product?.updatedAt || product?.createdAt) | timeAgo }}
                      </small>
                    </lg-flex-row>
                  </div>
                </lg-flex-row>
              </ng-template>
            }
          </lg-card-list>
        } @empty {
          <lg-flex-column position="center"
                          size="medium">
            {{ 'products.empty-state.text'|translate }}

            <lg-button [link]="'/products/add'"
                       [size]="'medium'"
                       [style]="'success'">
              {{ 'products.empty-state.btn'|translate }}
            </lg-button>
          </lg-flex-column>
        }
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
      ImportComponent,
      RouterLink,
      ImportRowTplDirective,
      FadeInComponent,
      ControlsBarComponent,
      SelectionToolsComponent,
      TimeAgoPipe,
      ExpandDirective,
      TranslatePipe,
      DraftProductsListCompoent,
      InlineSeparatedGroupComponent,
      InlineSeparatedGroupDirective,
      UserCurrencyPipe,
      FlexColumnComponent
    ], providers: [
      SelectionZoneService,
      CurrencyPipe
    ], styles: ["/* angular:styles/component:scss;01c1eed413cbcab17b345a4da1b468b4e2a0a4e51bc2f6ee57d46c1ca65a67bb;/Users/khripunovpavel/Documents/my/lasagna/lasagna/src/app/features/products/view/list/product-list.component.ts */\n:host {\n  display: block;\n}\n/*# sourceMappingURL=product-list.component.css.map */\n"] }]
  }], () => [{ type: ProductsRepository }, { type: TransferDataService }, { type: NotificationsService }, { type: SelectionZoneService }], null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(ProductListComponent, { className: "ProductListComponent", filePath: "src/app/features/products/view/list/product-list.component.ts", lineNumber: 165 });
})();
export {
  ProductListComponent
};
//# sourceMappingURL=chunk-NREPJMS5.js.map
