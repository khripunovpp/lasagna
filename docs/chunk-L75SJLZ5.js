import {
  CurrencySymbolPipe
} from "./chunk-M53OHGBB.js";
import {
  ImportComponent,
  ImportRowTplDirective
} from "./chunk-BIEPUQKF.js";
import {
  SelectionToolsComponent
} from "./chunk-4VIOKKDW.js";
import {
  GroupingTileDirective,
  GroupingTilesComponent,
  SortResult
} from "./chunk-C3HNT7UU.js";
import {
  CardListComponent,
  CardListItemDirective
} from "./chunk-R4GVGQKK.js";
import {
  ExpanderComponent
} from "./chunk-5SBCRB6Y.js";
import {
  PullDirective
} from "./chunk-BQKWFYYP.js";
import {
  UnitStringPipe
} from "./chunk-3S3MYWKO.js";
import {
  UserCurrencyPipe
} from "./chunk-CA2SMDMP.js";
import {
  UnitScheme,
  z
} from "./chunk-GOI3JMTN.js";
import {
  ControlsBarComponent
} from "./chunk-FXCCID5U.js";
import {
  InlineSeparatedGroupComponent,
  InlineSeparatedGroupDirective
} from "./chunk-ZVGHHFKR.js";
import "./chunk-ZVJRZSZB.js";
import "./chunk-426Q7OK4.js";
import {
  ExpandDirective
} from "./chunk-OSM632DP.js";
import {
  MatIcon
} from "./chunk-INPR6HOC.js";
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
  CategoryProductsRepository,
  ProductsRepository,
  TransferDataService
} from "./chunk-NMSYXSQT.js";
import "./chunk-TSXZ5ARA.js";
import "./chunk-AUXPMPTM.js";
import "./chunk-I546HKDL.js";
import {
  NotificationsService,
  SETTINGS,
  SelectionZoneService,
  SettingsKeysConst,
  SettingsService,
  errorHandler,
  groupBy,
  hasMicroPrice,
  productLabelFactoryProvider
} from "./chunk-5PDR5QLJ.js";
import "./chunk-E7RSJ4O4.js";
import {
  Stores
} from "./chunk-OOJ6JS4B.js";
import "./chunk-T5CRNY7R.js";
import "./chunk-5WJUMO7X.js";
import {
  FadeInComponent
} from "./chunk-IT3YWXZ6.js";
import {
  TitleComponent
} from "./chunk-6N7S7ZFR.js";
import "./chunk-GGH4TL4E.js";
import {
  takeUntilDestroyed,
  toSignal
} from "./chunk-RTCNHMN6.js";
import {
  ButtonComponent
} from "./chunk-4JEN4JYG.js";
import {
  TranslateDirective,
  TranslatePipe
} from "./chunk-DXRFKXPR.js";
import {
  RouterLink
} from "./chunk-SHM3W5T3.js";
import "./chunk-VBFW7QHU.js";
import "./chunk-IWOUTMKL.js";
import {
  FlexColumnComponent
} from "./chunk-L3Q75KKL.js";
import {
  CurrencyPipe
} from "./chunk-7I2CR6I6.js";
import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  HostBinding,
  InjectionToken,
  catchError,
  computed,
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
  ɵɵreference,
  ɵɵrepeater,
  ɵɵrepeaterCreate,
  ɵɵresetView,
  ɵɵrestoreView,
  ɵɵstyleMap,
  ɵɵtemplate,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1,
  ɵɵtextInterpolate2
} from "./chunk-RQATVJ2P.js";
import "./chunk-PZQLIUCM.js";
import "./chunk-7YWLATDR.js";
import "./chunk-46DXP6YY.js";

// src/app/features/products/service/categorized-products-list.token.ts
var CATEGORIZED_PRODUCTS_LIST = new InjectionToken("CategorizedProductsList", {
  factory: () => {
    const productsRepository = inject(ProductsRepository);
    const categoryRepository = inject(CategoryProductsRepository);
    const notificationsService = inject(NotificationsService);
    const products = from(productsRepository.loadAll()).pipe(switchMap(() => productsRepository.products$));
    return products.pipe(map((products2) => products2.toSorted((a, b) => a?.name?.localeCompare(b?.name))), map((products2) => groupBy(products2, "category_id")), mergeMap(async (grouped) => {
      const list = [];
      const withoutGroup = [];
      const uuids = Object.keys(grouped).filter((uuid) => uuid !== "");
      const categories = await categoryRepository.getMany(uuids);
      for (const groupKey in grouped) {
        const products2 = grouped[groupKey];
        if (products2 && products2.length) {
          const category = categories.find((c) => c.uuid === groupKey);
          const group = {
            category: category?.name || "",
            products: products2
          };
          if (category?.name) {
            list.push(group);
          } else {
            withoutGroup.push(...products2);
          }
        }
      }
      const sortedList = list.toSorted((a, b) => a.category > b.category ? 1 : -1);
      if (withoutGroup.length) {
        return [{
          category: "",
          products: withoutGroup
        }].concat(sortedList);
      }
      return sortedList;
    }), map((list) => new SortResult(list.map((c) => ({
      field: c.category || "",
      items: c.products || []
    })) ?? [])), catchError((error, caught) => {
      notificationsService.error(errorHandler(error));
      return caught;
    }));
  }
});

// src/app/features/products/service/Product.scheme.ts
var ProductScheme = z.object({
  name: z.string(),
  price: z.number().or(z.string()),
  amount: z.number().or(z.string()),
  source: z.string(),
  brand: z.string(),
  notes: z.string(),
  category_id: z.string().nullable().optional(),
  uuid: z.string().optional(),
  unit: UnitScheme.or(z.string()).optional(),
  createdAt: z.union([z.string(), z.number()]).optional(),
  updatedAt: z.union([z.string(), z.number()]).optional(),
  color: z.string().optional(),
  system: z.boolean().optional()
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
  drafts = signal([], ...ngDevMode ? [{ debugName: "drafts" }] : []);
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
    ExpandDirective,
    PullDirective,
    ExpanderComponent,
    InlineSeparatedGroupComponent,
    InlineSeparatedGroupDirective,
    TimeAgoPipe,
    TranslatePipe
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
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(DraftProductsListCompoent, { className: "DraftProductsListCompoent", filePath: "src/app/features/products/view/list/draft-products-list.compoent.ts", lineNumber: 109 });
})();

// src/app/features/products/view/list/product-list.component.ts
var _c02 = (a0) => ({ length: a0 });
var _c1 = () => ["product"];
var _c2 = (a0) => ({ unit: a0 });
function ProductListComponent_Conditional_0_ng_template_4_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "lg-button", 10);
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
    \u0275\u0275styleMap("solid");
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
    \u0275\u0275elementStart(0, "lg-import", 11);
    \u0275\u0275pipe(1, "translate");
    \u0275\u0275listener("onDone", function ProductListComponent_Conditional_0_ng_template_5_Template_lg_import_onDone_0_listener() {
      \u0275\u0275restoreView(_r3);
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.loadProducts());
    });
    \u0275\u0275template(2, ProductListComponent_Conditional_0_ng_template_5_ng_template_2_Template, 2, 1, "ng-template", 12);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275property("label", \u0275\u0275pipeBind1(1, 3, "import-label"))("schema", ctx_r1.ProductScheme)("storeName", ctx_r1.Stores.PRODUCTS);
  }
}
function ProductListComponent_Conditional_0_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "lg-controls-bar")(1, "lg-button", 7);
    \u0275\u0275element(2, "mat-icon", 8);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "lg-inline-separated-group");
    \u0275\u0275template(4, ProductListComponent_Conditional_0_ng_template_4_Template, 3, 7, "ng-template", 9)(5, ProductListComponent_Conditional_0_ng_template_5_Template, 3, 5, "ng-template", 9);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    \u0275\u0275advance();
    \u0275\u0275styleMap("primary");
    \u0275\u0275property("icon", true)("link", "/products/add")("size", "medium");
  }
}
function ProductListComponent_Conditional_6_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "span", 1);
  }
  if (rf & 2) {
    let tmp_2_0;
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275property("translateParams", \u0275\u0275pureFunction1(2, _c02, (tmp_2_0 = ctx_r1.products()) == null ? null : tmp_2_0.length))("translate", "filters.results.length");
  }
}
function ProductListComponent_Conditional_8_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "lg-flex-column", 2);
    \u0275\u0275element(1, "lg-selection-tools", 13);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    \u0275\u0275property("size", "medium");
    \u0275\u0275advance();
    \u0275\u0275property("selectionTypes", \u0275\u0275pureFunction0(2, _c1));
  }
}
function ProductListComponent_ng_template_11_Conditional_6_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275text(0);
    \u0275\u0275pipe(1, "translate");
    \u0275\u0275pipe(2, "currencySymbol");
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275textInterpolate2(" ", \u0275\u0275pipeBind1(1, 2, "micro-amount"), " ", \u0275\u0275pipeBind1(2, 4, ctx_r1.userSettings()["currency"]), " ");
  }
}
function ProductListComponent_ng_template_11_Conditional_7_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275text(0);
    \u0275\u0275pipe(1, "userCurrency");
  }
  if (rf & 2) {
    const product_r5 = \u0275\u0275nextContext().$implicit;
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind2(1, 1, product_r5.pricePerUnit, ctx_r1.pipesDigits()), " ");
  }
}
function ProductListComponent_ng_template_11_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "lg-card")(1, "lg-flex-column", 14)(2, "lg-flex-row", 15)(3, "a", 16);
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "div");
    \u0275\u0275conditionalCreate(6, ProductListComponent_ng_template_11_Conditional_6_Template, 3, 6)(7, ProductListComponent_ng_template_11_Conditional_7_Template, 2, 4);
    \u0275\u0275element(8, "span", 17);
    \u0275\u0275pipe(9, "unitString");
    \u0275\u0275pipe(10, "translate");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(11, "small", 18);
    \u0275\u0275text(12);
    \u0275\u0275pipe(13, "translate");
    \u0275\u0275pipe(14, "timeAgo");
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const product_r5 = ctx.$implicit;
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(2);
    \u0275\u0275property("center", true);
    \u0275\u0275advance();
    \u0275\u0275property("routerLink", "/products/edit/" + product_r5.uuid);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r1.productLabelFactory(product_r5), " ");
    \u0275\u0275advance(2);
    \u0275\u0275conditional(ctx_r1.hasMicroPrice(product_r5.pricePerUnit) ? 6 : 7);
    \u0275\u0275advance(2);
    \u0275\u0275property("translateParams", \u0275\u0275pureFunction1(16, _c2, \u0275\u0275pipeBind1(10, 10, \u0275\u0275pipeBind1(9, 8, product_r5 == null ? null : product_r5.unit))))("translate", "per-unit.label");
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate2(" ", \u0275\u0275pipeBind1(13, 12, "edited-at-label"), " ", \u0275\u0275pipeBind1(14, 14, (product_r5 == null ? null : product_r5.updatedAt) || (product_r5 == null ? null : product_r5.createdAt)), " ");
  }
}
var ProductListComponent = class _ProductListComponent {
  _productsRepository;
  _transferDataService;
  _notificationsService;
  selectionZoneService;
  _settingsService;
  constructor(_productsRepository, _transferDataService, _notificationsService, selectionZoneService, _settingsService) {
    this._productsRepository = _productsRepository;
    this._transferDataService = _transferDataService;
    this._notificationsService = _notificationsService;
    this.selectionZoneService = selectionZoneService;
    this._settingsService = _settingsService;
    this.selectionZoneService.onDelete.pipe(takeUntilDestroyed(this.destroyRef)).subscribe(([key]) => {
      this.deleteProduct(key);
    });
  }
  userSettings = inject(SETTINGS);
  precisions = computed(() => this._settingsService.settingsSignal()?.getSetting(SettingsKeysConst.pricePrecision)?.data ?? 2, ...ngDevMode ? [{ debugName: "precisions" }] : []);
  pipesDigits = computed(() => `1.0-${this.precisions()}`, ...ngDevMode ? [{ debugName: "pipesDigits" }] : []);
  destroyRef = inject(DestroyRef);
  products = toSignal(inject(CATEGORIZED_PRODUCTS_LIST));
  ProductDbInputScheme = ProductScheme;
  Stores = Stores;
  ProductScheme = ProductScheme;
  productLabelFactory = inject(productLabelFactoryProvider);
  hasMicroPrice = hasMicroPrice;
  exportProducts(selected) {
    this._transferDataService.exportTable(Stores.PRODUCTS, "json", {
      selected: Array.from(selected ?? [])
    }).catch((error) => {
      this._notificationsService.error(errorHandler(error));
    });
  }
  deleteProduct(uuid) {
    if (!uuid) {
      return;
    }
    this._productsRepository.deleteProduct(uuid).then(() => {
      this._notificationsService.success("notifications.product.deleted");
      this.loadProducts();
    }).catch((error) => {
      this._notificationsService.error(errorHandler(error));
    });
  }
  ngOnInit() {
    this.loadProducts();
  }
  loadProducts() {
    this._productsRepository.loadAll().catch((error) => {
      this._notificationsService.error(errorHandler(error));
    });
  }
  static \u0275fac = function ProductListComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _ProductListComponent)(\u0275\u0275directiveInject(ProductsRepository), \u0275\u0275directiveInject(TransferDataService), \u0275\u0275directiveInject(NotificationsService), \u0275\u0275directiveInject(SelectionZoneService), \u0275\u0275directiveInject(SettingsService));
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _ProductListComponent, selectors: [["lg-product-list"]], features: [\u0275\u0275ProvidersFeature([
    SelectionZoneService,
    CurrencyPipe
  ])], decls: 18, vars: 18, consts: [["groupingTiles", ""], [1, "text-muted", "text-small", 3, "translateParams", "translate"], [3, "size"], [3, "selectable", "sortResult"], ["lgGroupingTile", ""], ["empty-state", "", "position", "center", "size", "medium"], [3, "link", "size"], [3, "icon", "link", "size"], ["aria-hidden", "false", "fontIcon", "add"], ["lgInlineSeparatedGroup", ""], [3, "click", "flat", "size"], [3, "onDone", "label", "schema", "storeName"], ["lgImportRowTpl", ""], [3, "selectionTypes"], ["size", "medium"], ["lgExpand", "", 3, "center"], [3, "routerLink"], [3, "translateParams", "translate"], [1, "text-muted", "text-cursive"]], template: function ProductListComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275conditionalCreate(0, ProductListComponent_Conditional_0_Template, 6, 5, "lg-controls-bar");
      \u0275\u0275elementStart(1, "lg-fade-in")(2, "lg-container")(3, "lg-title");
      \u0275\u0275text(4);
      \u0275\u0275pipe(5, "translate");
      \u0275\u0275conditionalCreate(6, ProductListComponent_Conditional_6_Template, 1, 4, "span", 1);
      \u0275\u0275elementEnd();
      \u0275\u0275element(7, "lg-draft-products-list");
      \u0275\u0275conditionalCreate(8, ProductListComponent_Conditional_8_Template, 2, 3, "lg-flex-column", 2);
      \u0275\u0275elementStart(9, "lg-grouping-tiles", 3, 0);
      \u0275\u0275template(11, ProductListComponent_ng_template_11_Template, 15, 18, "ng-template", 4);
      \u0275\u0275elementStart(12, "lg-flex-column", 5);
      \u0275\u0275text(13);
      \u0275\u0275pipe(14, "translate");
      \u0275\u0275elementStart(15, "lg-button", 6);
      \u0275\u0275text(16);
      \u0275\u0275pipe(17, "translate");
      \u0275\u0275elementEnd()()()()();
    }
    if (rf & 2) {
      let tmp_1_0;
      let tmp_3_0;
      const groupingTiles_r6 = \u0275\u0275reference(10);
      \u0275\u0275conditional(((tmp_1_0 = ctx.products()) == null ? null : tmp_1_0.length) ? 0 : -1);
      \u0275\u0275advance(4);
      \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind1(5, 12, "products.list-title"), " ");
      \u0275\u0275advance(2);
      \u0275\u0275conditional(((tmp_3_0 = ctx.products()) == null ? null : tmp_3_0.length) ? 6 : -1);
      \u0275\u0275advance(2);
      \u0275\u0275conditional(!groupingTiles_r6.empty() ? 8 : -1);
      \u0275\u0275advance();
      \u0275\u0275property("selectable", true)("sortResult", ctx.products());
      \u0275\u0275advance(4);
      \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind1(14, 14, "products.empty-state.text"), " ");
      \u0275\u0275advance(2);
      \u0275\u0275styleMap("primary");
      \u0275\u0275property("link", "/products/add")("size", "medium");
      \u0275\u0275advance();
      \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind1(17, 16, "products.empty-state.btn"), " ");
    }
  }, dependencies: [
    FlexRowComponent,
    ButtonComponent,
    MatIcon,
    ContainerComponent,
    TitleComponent,
    ImportComponent,
    RouterLink,
    ImportRowTplDirective,
    FadeInComponent,
    ControlsBarComponent,
    SelectionToolsComponent,
    ExpandDirective,
    DraftProductsListCompoent,
    InlineSeparatedGroupComponent,
    InlineSeparatedGroupDirective,
    FlexColumnComponent,
    TranslateDirective,
    CardComponent,
    GroupingTileDirective,
    GroupingTilesComponent,
    TimeAgoPipe,
    TranslatePipe,
    UserCurrencyPipe,
    UnitStringPipe,
    CurrencySymbolPipe
  ], styles: ["\n\n[_nghost-%COMP%] {\n  display: block;\n}\n/*# sourceMappingURL=product-list.component.css.map */"], changeDetection: 0 });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(ProductListComponent, [{
    type: Component,
    args: [{ selector: "lg-product-list", changeDetection: ChangeDetectionStrategy.OnPush, template: `
    @if (products()?.length) {
      <lg-controls-bar>
        <lg-button [icon]="true"
                   [link]="'/products/add'"
                   [size]="'medium'"
                   [style]="'primary'">
          <mat-icon aria-hidden="false" fontIcon="add"></mat-icon>
        </lg-button>

        <lg-inline-separated-group>
          <ng-template lgInlineSeparatedGroup>
            <lg-button (click)="exportProducts(selectionZoneService.selected())"
                       [flat]="true"
                       [size]="'small'"
                       [style]="'solid'">
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

          @if (products()?.length) {
            <span [translateParams]="{length:products()?.length}"
                  [translate]="'filters.results.length'"
                  class="text-muted text-small"></span>
          }
        </lg-title>

        <lg-draft-products-list></lg-draft-products-list>

        @if (!groupingTiles.empty()) {
          <lg-flex-column [size]="'medium'">
            <lg-selection-tools [selectionTypes]="['product']"></lg-selection-tools>
          </lg-flex-column>
        }

        <lg-grouping-tiles #groupingTiles
                           [selectable]="true"
                           [sortResult]="products()">
          <ng-template let-product lgGroupingTile>
            <lg-card>
              <lg-flex-column size="medium">
                <lg-flex-row [center]="true" lgExpand>
                  <a [routerLink]="'/products/edit/' + product.uuid">
                    {{ productLabelFactory(product) }}
                  </a>

                  <div>
                    @if (hasMicroPrice(product.pricePerUnit)) {
                      {{ 'micro-amount'|translate }}
                      {{ userSettings()['currency']|currencySymbol }}
                    } @else {
                      {{ $any(product).pricePerUnit | userCurrency: pipesDigits() }}
                    }
                    <span [translateParams]="{unit:$any(product)?.unit | unitString | translate}"
                          [translate]="'per-unit.label'"></span>
                  </div>
                </lg-flex-row>

                <small class="text-muted text-cursive">
                  {{ 'edited-at-label'|translate }} {{ (product?.updatedAt || product?.createdAt) | timeAgo }}
                </small>
              </lg-flex-column>
            </lg-card>
          </ng-template>

          <lg-flex-column empty-state
                          position="center"
                          size="medium">
            {{ 'products.empty-state.text'|translate }}

            <lg-button [link]="'/products/add'"
                       [size]="'medium'"
                       [style]="'primary'">
              {{ 'products.empty-state.btn'|translate }}
            </lg-button>
          </lg-flex-column>
        </lg-grouping-tiles>
      </lg-container>
    </lg-fade-in>
  `, imports: [
      FlexRowComponent,
      ButtonComponent,
      MatIcon,
      ContainerComponent,
      TitleComponent,
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
      FlexColumnComponent,
      UnitStringPipe,
      TranslateDirective,
      CardComponent,
      GroupingTileDirective,
      GroupingTilesComponent,
      CurrencySymbolPipe
    ], providers: [
      SelectionZoneService,
      CurrencyPipe
    ], styles: ["/* angular:styles/component:scss;01c1eed413cbcab17b345a4da1b468b4e2a0a4e51bc2f6ee57d46c1ca65a67bb;/Users/khripunovpavel/Documents/my/lasagna/lasagna/src/app/features/products/view/list/product-list.component.ts */\n:host {\n  display: block;\n}\n/*# sourceMappingURL=product-list.component.css.map */\n"] }]
  }], () => [{ type: ProductsRepository }, { type: TransferDataService }, { type: NotificationsService }, { type: SelectionZoneService }, { type: SettingsService }], null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(ProductListComponent, { className: "ProductListComponent", filePath: "src/app/features/products/view/list/product-list.component.ts", lineNumber: 194 });
})();
export {
  ProductListComponent
};
//# sourceMappingURL=chunk-L75SJLZ5.js.map
