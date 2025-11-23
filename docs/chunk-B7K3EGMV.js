import {
  ProductScheme
} from "./chunk-FGDO7MWV.js";
import {
  SortResult
} from "./chunk-N4BRTEB2.js";
import "./chunk-EHHQZW7Q.js";
import {
  CategoryProductsRepository,
  ProductsRepository,
  TransferDataService
} from "./chunk-CFCFQO5U.js";
import "./chunk-RBDPPOGX.js";
import "./chunk-BUGRPEBT.js";
import "./chunk-BPMAQ256.js";
import "./chunk-OGDPSEDB.js";
import {
  NotificationsService,
  productLabelFactoryProvider
} from "./chunk-6WNKKHFO.js";
import "./chunk-NLONWH5J.js";
import {
  SettingsKeysConst,
  SettingsService
} from "./chunk-MV7X5YHM.js";
import {
  IS_CLIENT,
  Stores
} from "./chunk-QHJLSFIB.js";
import "./chunk-3UJV2MM3.js";
import "./chunk-UG5XPMCB.js";
import {
  SETTINGS
} from "./chunk-XXA7PPXB.js";
import {
  errorHandler,
  groupBy,
  hasMicroPrice
} from "./chunk-XIU3WVPC.js";
import "./chunk-T5CRNY7R.js";
import "./chunk-IWOUTMKL.js";
import "./chunk-R5O3TEDB.js";
import {
  SelectionZoneService
} from "./chunk-KM2DRJZA.js";
import "./chunk-2S3NUMNU.js";
import "./chunk-PHCOZAXM.js";
import {
  takeUntilDestroyed,
  toSignal
} from "./chunk-AWZMWU52.js";
import "./chunk-5WJUMO7X.js";
import "./chunk-AESGXZO7.js";
import "./chunk-2CTN2MPX.js";
import "./chunk-NJX644NS.js";
import "./chunk-CFXQGSQM.js";
import {
  TranslateDirective,
  TranslatePipe
} from "./chunk-755Q3QHA.js";
import "./chunk-L34DFTMV.js";
import "./chunk-USF337CA.js";
import "./chunk-VVQKNBNV.js";
import {
  CurrencyPipe
} from "./chunk-X2X7GTPW.js";
import "./chunk-PZQLIUCM.js";
import "./chunk-7YWLATDR.js";
import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  InjectionToken,
  catchError,
  computed,
  from,
  inject,
  map,
  setClassMetadata,
  setClassMetadataAsync,
  shareReplay,
  switchMap,
  ɵsetClassDebugInfo,
  ɵɵProvidersFeature,
  ɵɵadvance,
  ɵɵconditional,
  ɵɵconditionalCreate,
  ɵɵdefer,
  ɵɵdeferOnIdle,
  ɵɵdefineComponent,
  ɵɵdirectiveInject,
  ɵɵdomTemplate,
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
  ɵɵresetView,
  ɵɵrestoreView,
  ɵɵstyleMap,
  ɵɵtemplate,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1,
  ɵɵtextInterpolate2
} from "./chunk-IYCVPBRB.js";
import "./chunk-46DXP6YY.js";

// src/app/features/products/service/categorized-products-list.token.ts
var CATEGORIZED_PRODUCTS_LIST = new InjectionToken("CategorizedProductsList", {
  factory: () => {
    const productsRepository = inject(ProductsRepository);
    const categoryRepository = inject(CategoryProductsRepository);
    const notificationsService = inject(NotificationsService);
    const products = from(productsRepository.loadAll()).pipe(switchMap(() => productsRepository.products$));
    return products.pipe(map((products2) => products2.toSorted((a, b) => a?.name?.localeCompare(b?.name))), map((products2) => groupBy(products2, "category_id")), switchMap(async (grouped) => {
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
    }), shareReplay(1));
  }
});

// src/app/features/products/view/list/product-list.component.ts
var ProductListComponent_Defer_2_DepsFn = () => [import("./chunk-5EMI5HZE.js").then((m) => m.FlexRowComponent), import("./chunk-F6T4LHLC.js").then((m) => m.ButtonComponent), import("./chunk-RPWYILHF.js").then((m) => m.MatIcon), import("./chunk-LGSX6LCO.js").then((m) => m.ContainerComponent), import("./chunk-SYAF33FD.js").then((m) => m.TitleComponent), import("./chunk-J5VDRIFQ.js").then((m) => m.ImportComponent), import("./chunk-DT5V5AZD.js").then((m) => m.RouterLink), import("./chunk-BQ5KZETD.js").then((m) => m.ImportRowTplDirective), import("./chunk-Y7ECYNDZ.js").then((m) => m.FadeInComponent), import("./chunk-NCOZKGJL.js").then((m) => m.ControlsBarComponent), import("./chunk-EYJPKDYM.js").then((m) => m.SelectionToolsComponent), import("./chunk-DX3QDPKD.js").then((m) => m.ExpandDirective), import("./chunk-NM6BBYE3.js").then((m) => m.DraftProductsListCompoent), import("./chunk-Q4Q3HZ6L.js").then((m) => m.InlineSeparatedGroupComponent), import("./chunk-Q4Q3HZ6L.js").then((m) => m.InlineSeparatedGroupDirective), import("./chunk-7H7OXKDA.js").then((m) => m.FlexColumnComponent), TranslateDirective, import("./chunk-NMTF7W6I.js").then((m) => m.CardComponent), import("./chunk-GW3SUC4N.js").then((m) => m.GroupingTileDirective), import("./chunk-XT5YHS5Z.js").then((m) => m.GroupingTilesComponent), import("./chunk-ZSL4WOCU.js").then((m) => m.TimeAgoPipe), TranslatePipe, import("./chunk-HPVTN6L6.js").then((m) => m.UserCurrencyPipe), import("./chunk-BRN7EI7W.js").then((m) => m.UnitStringPipe), import("./chunk-DCI6UGN5.js").then((m) => m.CurrencySymbolPipe)];
var _c0 = (a0) => ({ length: a0 });
var _c1 = () => ["product"];
var _c2 = (a0) => ({ unit: a0 });
function ProductListComponent_Defer_0_Conditional_0_ng_template_4_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "lg-button", 10);
    \u0275\u0275listener("click", function ProductListComponent_Defer_0_Conditional_0_ng_template_4_Template_lg_button_click_0_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext(3);
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
function ProductListComponent_Defer_0_Conditional_0_ng_template_5_ng_template_2_Template(rf, ctx) {
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
function ProductListComponent_Defer_0_Conditional_0_ng_template_5_Template(rf, ctx) {
  if (rf & 1) {
    const _r3 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "lg-import", 11);
    \u0275\u0275pipe(1, "translate");
    \u0275\u0275listener("onDone", function ProductListComponent_Defer_0_Conditional_0_ng_template_5_Template_lg_import_onDone_0_listener() {
      \u0275\u0275restoreView(_r3);
      const ctx_r1 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r1.loadProducts());
    });
    \u0275\u0275template(2, ProductListComponent_Defer_0_Conditional_0_ng_template_5_ng_template_2_Template, 2, 1, "ng-template", 12);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(3);
    \u0275\u0275property("label", \u0275\u0275pipeBind1(1, 3, "import-label"))("schema", ctx_r1.ProductScheme)("storeName", ctx_r1.Stores.PRODUCTS);
  }
}
function ProductListComponent_Defer_0_Conditional_0_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "lg-controls-bar")(1, "lg-button", 7);
    \u0275\u0275element(2, "mat-icon", 8);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "lg-inline-separated-group");
    \u0275\u0275template(4, ProductListComponent_Defer_0_Conditional_0_ng_template_4_Template, 3, 7, "ng-template", 9)(5, ProductListComponent_Defer_0_Conditional_0_ng_template_5_Template, 3, 5, "ng-template", 9);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    \u0275\u0275advance();
    \u0275\u0275styleMap("primary");
    \u0275\u0275property("icon", true)("link", "/products/add")("size", "medium");
  }
}
function ProductListComponent_Defer_0_Conditional_6_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "span", 1);
  }
  if (rf & 2) {
    let tmp_3_0;
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275property("translateParams", \u0275\u0275pureFunction1(2, _c0, (tmp_3_0 = ctx_r1.products()) == null ? null : tmp_3_0.length))("translate", "filters.results.length");
  }
}
function ProductListComponent_Defer_0_Conditional_8_Template(rf, ctx) {
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
function ProductListComponent_Defer_0_ng_template_11_Conditional_6_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275text(0);
    \u0275\u0275pipe(1, "translate");
    \u0275\u0275pipe(2, "currencySymbol");
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(3);
    \u0275\u0275textInterpolate2(" ", \u0275\u0275pipeBind1(1, 2, "micro-amount"), " ", \u0275\u0275pipeBind1(2, 4, ctx_r1.userSettings()["currency"]), " ");
  }
}
function ProductListComponent_Defer_0_ng_template_11_Conditional_7_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275text(0);
    \u0275\u0275pipe(1, "userCurrency");
  }
  if (rf & 2) {
    const product_r5 = \u0275\u0275nextContext().$implicit;
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind2(1, 1, product_r5.pricePerUnit, ctx_r1.pipesDigits()), " ");
  }
}
function ProductListComponent_Defer_0_ng_template_11_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "lg-card")(1, "lg-flex-column", 14)(2, "lg-flex-row", 15)(3, "a", 16);
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "div");
    \u0275\u0275conditionalCreate(6, ProductListComponent_Defer_0_ng_template_11_Conditional_6_Template, 3, 6)(7, ProductListComponent_Defer_0_ng_template_11_Conditional_7_Template, 2, 4);
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
    const ctx_r1 = \u0275\u0275nextContext(2);
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
function ProductListComponent_Defer_0_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275conditionalCreate(0, ProductListComponent_Defer_0_Conditional_0_Template, 6, 5, "lg-controls-bar");
    \u0275\u0275elementStart(1, "lg-fade-in")(2, "lg-container")(3, "lg-title");
    \u0275\u0275text(4);
    \u0275\u0275pipe(5, "translate");
    \u0275\u0275conditionalCreate(6, ProductListComponent_Defer_0_Conditional_6_Template, 1, 4, "span", 1);
    \u0275\u0275elementEnd();
    \u0275\u0275element(7, "lg-draft-products-list");
    \u0275\u0275conditionalCreate(8, ProductListComponent_Defer_0_Conditional_8_Template, 2, 3, "lg-flex-column", 2);
    \u0275\u0275elementStart(9, "lg-grouping-tiles", 3, 0);
    \u0275\u0275template(11, ProductListComponent_Defer_0_ng_template_11_Template, 15, 18, "ng-template", 4);
    \u0275\u0275elementStart(12, "lg-flex-column", 5);
    \u0275\u0275text(13);
    \u0275\u0275pipe(14, "translate");
    \u0275\u0275elementStart(15, "lg-button", 6);
    \u0275\u0275text(16);
    \u0275\u0275pipe(17, "translate");
    \u0275\u0275elementEnd()()()()();
  }
  if (rf & 2) {
    let tmp_2_0;
    let tmp_4_0;
    const groupingTiles_r6 = \u0275\u0275reference(10);
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275conditional(((tmp_2_0 = ctx_r1.products()) == null ? null : tmp_2_0.length) ? 0 : -1);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind1(5, 12, "products.list-title"), " ");
    \u0275\u0275advance(2);
    \u0275\u0275conditional(((tmp_4_0 = ctx_r1.products()) == null ? null : tmp_4_0.length) ? 6 : -1);
    \u0275\u0275advance(2);
    \u0275\u0275conditional(!groupingTiles_r6.empty() ? 8 : -1);
    \u0275\u0275advance();
    \u0275\u0275property("selectable", true)("sortResult", ctx_r1.products());
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind1(14, 14, "products.empty-state.text"), " ");
    \u0275\u0275advance(2);
    \u0275\u0275styleMap("primary");
    \u0275\u0275property("link", "/products/add")("size", "medium");
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind1(17, 16, "products.empty-state.btn"), " ");
  }
}
function ProductListComponent_DeferError_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275text(0);
    \u0275\u0275pipe(1, "translate");
  }
  if (rf & 2) {
    \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind1(1, 1, "products-list.defer-load-error"), " ");
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
  isClient = inject(IS_CLIENT);
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
    if (!this.isClient) {
      return;
    }
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
  ])], decls: 4, vars: 0, consts: [["groupingTiles", ""], [1, "text-muted", "text-small", 3, "translateParams", "translate"], [3, "size"], [3, "selectable", "sortResult"], ["lgGroupingTile", ""], ["empty-state", "", "position", "center", "size", "medium"], [3, "link", "size"], [3, "icon", "link", "size"], ["aria-hidden", "false", "fontIcon", "add"], ["lgInlineSeparatedGroup", ""], [3, "click", "flat", "size"], [3, "onDone", "label", "schema", "storeName"], ["lgImportRowTpl", ""], [3, "selectionTypes"], ["size", "medium"], ["lgExpand", "", 3, "center"], [3, "routerLink"], [3, "translateParams", "translate"], [1, "text-muted", "text-cursive"]], template: function ProductListComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275domTemplate(0, ProductListComponent_Defer_0_Template, 18, 18)(1, ProductListComponent_DeferError_1_Template, 2, 3);
      \u0275\u0275defer(2, 0, ProductListComponent_Defer_2_DepsFn, null, null, 1);
      \u0275\u0275deferOnIdle();
    }
  }, dependencies: [TranslatePipe], styles: ["\n\n[_nghost-%COMP%] {\n  display: block;\n}\n/*# sourceMappingURL=product-list.component.css.map */"], changeDetection: 0 });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadataAsync(ProductListComponent, () => [import("./chunk-5EMI5HZE.js").then((m) => m.FlexRowComponent), import("./chunk-F6T4LHLC.js").then((m) => m.ButtonComponent), import("./chunk-RPWYILHF.js").then((m) => m.MatIcon), import("./chunk-LGSX6LCO.js").then((m) => m.ContainerComponent), import("./chunk-SYAF33FD.js").then((m) => m.TitleComponent), import("./chunk-J5VDRIFQ.js").then((m) => m.ImportComponent), import("./chunk-DT5V5AZD.js").then((m) => m.RouterLink), import("./chunk-BQ5KZETD.js").then((m) => m.ImportRowTplDirective), import("./chunk-Y7ECYNDZ.js").then((m) => m.FadeInComponent), import("./chunk-NCOZKGJL.js").then((m) => m.ControlsBarComponent), import("./chunk-EYJPKDYM.js").then((m) => m.SelectionToolsComponent), import("./chunk-DX3QDPKD.js").then((m) => m.ExpandDirective), import("./chunk-NM6BBYE3.js").then((m) => m.DraftProductsListCompoent), import("./chunk-Q4Q3HZ6L.js").then((m) => m.InlineSeparatedGroupComponent), import("./chunk-Q4Q3HZ6L.js").then((m) => m.InlineSeparatedGroupDirective), import("./chunk-7H7OXKDA.js").then((m) => m.FlexColumnComponent), import("./chunk-NMTF7W6I.js").then((m) => m.CardComponent), import("./chunk-GW3SUC4N.js").then((m) => m.GroupingTileDirective), import("./chunk-XT5YHS5Z.js").then((m) => m.GroupingTilesComponent), import("./chunk-ZSL4WOCU.js").then((m) => m.TimeAgoPipe), import("./chunk-HPVTN6L6.js").then((m) => m.UserCurrencyPipe), import("./chunk-BRN7EI7W.js").then((m) => m.UnitStringPipe), import("./chunk-DCI6UGN5.js").then((m) => m.CurrencySymbolPipe)], (FlexRowComponent, ButtonComponent, MatIcon, ContainerComponent, TitleComponent, ImportComponent, RouterLink, ImportRowTplDirective, FadeInComponent, ControlsBarComponent, SelectionToolsComponent, ExpandDirective, DraftProductsListCompoent, InlineSeparatedGroupComponent, InlineSeparatedGroupDirective, FlexColumnComponent, CardComponent, GroupingTileDirective, GroupingTilesComponent, TimeAgoPipe, UserCurrencyPipe, UnitStringPipe, CurrencySymbolPipe) => {
    setClassMetadata(ProductListComponent, [{
      type: Component,
      args: [{ selector: "lg-product-list", changeDetection: ChangeDetectionStrategy.OnPush, template: `
    @defer {
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
    } @error {
      {{ 'products-list.defer-load-error' | translate }}
    }
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
  });
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(ProductListComponent, { className: "ProductListComponent", filePath: "src/app/features/products/view/list/product-list.component.ts", lineNumber: 188 });
})();
export {
  ProductListComponent
};
//# sourceMappingURL=chunk-B7K3EGMV.js.map
