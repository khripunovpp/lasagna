import {
  stateToBadgeClassMap,
  stateToLabelMap
} from "./chunk-XBVWJL5U.js";
import {
  SelectionToolsComponent
} from "./chunk-5RCX5W3R.js";
import {
  CardListComponent,
  CardListItemDirective
} from "./chunk-TKD52FJJ.js";
import {
  PullDirective
} from "./chunk-BQKWFYYP.js";
import {
  ControlsBarComponent
} from "./chunk-FXCCID5U.js";
import "./chunk-ZVGHHFKR.js";
import "./chunk-ZVJRZSZB.js";
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
import {
  TimeAgoPipe
} from "./chunk-UYTKJ4B2.js";
import {
  InvoicesRepository,
  NotificationsService,
  SelectionZoneService,
  groupBy
} from "./chunk-5PDR5QLJ.js";
import "./chunk-E7RSJ4O4.js";
import {
  Stores,
  USER_LANGUAGE
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
  toSignal
} from "./chunk-RTCNHMN6.js";
import {
  ButtonComponent
} from "./chunk-X7NFO2XP.js";
import {
  TranslatePipe,
  TranslateService
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
  CurrencyPipe,
  DatePipe,
  NgClass
} from "./chunk-7I2CR6I6.js";
import {
  Component,
  InjectionToken,
  computed,
  from,
  inject,
  isDevMode,
  map,
  mergeMap,
  setClassMetadata,
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
  ɵɵrepeater,
  ɵɵrepeaterCreate,
  ɵɵrepeaterTrackByIndex,
  ɵɵresetView,
  ɵɵrestoreView,
  ɵɵstyleMap,
  ɵɵtemplate,
  ɵɵtext,
  ɵɵtextInterpolate1,
  ɵɵtextInterpolate2,
  ɵɵtextInterpolate3
} from "./chunk-RQATVJ2P.js";
import "./chunk-PZQLIUCM.js";
import "./chunk-7YWLATDR.js";
import "./chunk-46DXP6YY.js";

// src/app/features/invoices/view/list/categorized-invoices-list.token.ts
var CATEGORIZED_INVOICES_LIST = new InjectionToken("CategorizedInvoicesList", {
  factory: () => {
    const invoicesRepository = inject(InvoicesRepository);
    const invoices = from(invoicesRepository.loadToObservable()).pipe(switchMap(() => invoicesRepository.items$));
    return invoices.pipe(map((invoices2) => invoices2.toSorted((a, b) => a.prefix.localeCompare(b.prefix))), map((invoices2) => groupBy(invoices2, "prefix")), mergeMap(async (grouped) => {
      const list = [];
      for (const groupedKey in grouped) {
        list.push({
          group_key: groupedKey,
          items: grouped[groupedKey]?.toSorted((a, b) => a.createdAt > b.createdAt ? -1 : 1) || []
        });
      }
      if (!list.length)
        return [];
      const [first, ...sortedList] = list.toSorted((a, b) => a.group_key > b.group_key ? 1 : -1);
      if (first?.group_key) {
        return [first].concat(sortedList);
      }
      return sortedList.concat([first]);
    }));
  }
});

// src/app/features/invoices/view/list/invoices-list.component.ts
var _c0 = () => ["invoice"];
var _forTrack0 = ($index, $item) => ($item.uuid ?? "") + $index;
function InvoicesListComponent_Conditional_0_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "lg-controls-bar")(1, "lg-button", 0);
    \u0275\u0275listener("click", function InvoicesListComponent_Conditional_0_Template_lg_button_click_1_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.onAddInvoice());
    });
    \u0275\u0275element(2, "mat-icon", 1);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    \u0275\u0275advance();
    \u0275\u0275styleMap("primary");
    \u0275\u0275property("icon", true)("size", "medium");
  }
}
function InvoicesListComponent_Conditional_6_Conditional_0_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "lg-selection-tools", 2);
  }
  if (rf & 2) {
    \u0275\u0275property("selectionTypes", \u0275\u0275pureFunction0(1, _c0));
  }
}
function InvoicesListComponent_Conditional_6_For_2_For_5_ng_template_0_Conditional_7_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div");
    \u0275\u0275text(1);
    \u0275\u0275pipe(2, "translate");
    \u0275\u0275pipe(3, "date");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const invoice_r5 = \u0275\u0275nextContext(2).$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate2(" ", \u0275\u0275pipeBind1(2, 2, "invoices.date-due"), ": ", \u0275\u0275pipeBind2(3, 4, invoice_r5.date_due, "shortDate"), " ");
  }
}
function InvoicesListComponent_Conditional_6_For_2_For_5_ng_template_0_Conditional_8_Conditional_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275text(0);
    \u0275\u0275pipe(1, "translate");
  }
  if (rf & 2) {
    \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind1(1, 1, "invoices.days-left.overdue"), " ");
  }
}
function InvoicesListComponent_Conditional_6_For_2_For_5_ng_template_0_Conditional_8_Conditional_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275text(0);
  }
  if (rf & 2) {
    const invoice_r5 = \u0275\u0275nextContext(3).$implicit;
    \u0275\u0275textInterpolate1(" ", invoice_r5.daysLeft, " ");
  }
}
function InvoicesListComponent_Conditional_6_For_2_For_5_ng_template_0_Conditional_8_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div");
    \u0275\u0275text(1);
    \u0275\u0275pipe(2, "translate");
    \u0275\u0275conditionalCreate(3, InvoicesListComponent_Conditional_6_For_2_For_5_ng_template_0_Conditional_8_Conditional_3_Template, 2, 3)(4, InvoicesListComponent_Conditional_6_For_2_For_5_ng_template_0_Conditional_8_Conditional_4_Template, 1, 1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const invoice_r5 = \u0275\u0275nextContext(2).$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind1(2, 2, "invoices.days-left"), ": ");
    \u0275\u0275advance(2);
    \u0275\u0275conditional(invoice_r5.overdue ? 3 : 4);
  }
}
function InvoicesListComponent_Conditional_6_For_2_For_5_ng_template_0_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "lg-flex-column", 7)(1, "lg-flex-row", 8)(2, "a", 9);
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "div", 10);
    \u0275\u0275text(5);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(6, "lg-flex-row", 8);
    \u0275\u0275conditionalCreate(7, InvoicesListComponent_Conditional_6_For_2_For_5_ng_template_0_Conditional_7_Template, 4, 7, "div");
    \u0275\u0275conditionalCreate(8, InvoicesListComponent_Conditional_6_For_2_For_5_ng_template_0_Conditional_8_Template, 5, 4, "div");
    \u0275\u0275elementStart(9, "small", 11);
    \u0275\u0275pipe(10, "date");
    \u0275\u0275text(11);
    \u0275\u0275pipe(12, "translate");
    \u0275\u0275pipe(13, "timeAgo");
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    let tmp_28_0;
    let tmp_29_0;
    const ctx_r5 = \u0275\u0275nextContext();
    const invoice_r5 = ctx_r5.$implicit;
    const \u0275$index_27_r7 = ctx_r5.$index;
    const \u0275$index_20_r8 = \u0275\u0275nextContext().$index;
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275property("mobileMode", true)("left", true);
    \u0275\u0275advance();
    \u0275\u0275property("routerLink", "/invoices/edit/" + invoice_r5.uuid);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate3(" ", invoice_r5.name, " - #", invoice_r5.prefix, "/", invoice_r5.invoice_number, " ");
    \u0275\u0275advance();
    \u0275\u0275property("ngClass", (tmp_28_0 = ctx_r1.stateBadgeClasses()) == null ? null : tmp_28_0[\u0275$index_20_r8] == null ? null : tmp_28_0[\u0275$index_20_r8][\u0275$index_27_r7]);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", (tmp_29_0 = ctx_r1.stateLabels()) == null ? null : tmp_29_0[\u0275$index_20_r8] == null ? null : tmp_29_0[\u0275$index_20_r8][\u0275$index_27_r7], " ");
    \u0275\u0275advance();
    \u0275\u0275property("mobileMode", true)("left", true);
    \u0275\u0275advance();
    \u0275\u0275conditional(!invoice_r5.cancelled ? 7 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(invoice_r5.issued ? 8 : -1);
    \u0275\u0275advance();
    \u0275\u0275attribute("title", \u0275\u0275pipeBind2(10, 15, (invoice_r5 == null ? null : invoice_r5.updatedAt) || (invoice_r5 == null ? null : invoice_r5.createdAt), "short"));
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate2(" ", \u0275\u0275pipeBind1(12, 18, "edited-at-label"), " ", \u0275\u0275pipeBind1(13, 20, (invoice_r5 == null ? null : invoice_r5.updatedAt) || (invoice_r5 == null ? null : invoice_r5.createdAt)), " ");
  }
}
function InvoicesListComponent_Conditional_6_For_2_For_5_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275template(0, InvoicesListComponent_Conditional_6_For_2_For_5_ng_template_0_Template, 14, 22, "ng-template", 6);
  }
  if (rf & 2) {
    const invoice_r5 = ctx.$implicit;
    \u0275\u0275property("uuid", invoice_r5.uuid)("bgColor", invoice_r5.overdue ? "#ffcfcb" : "");
  }
}
function InvoicesListComponent_Conditional_6_For_2_Template(rf, ctx) {
  if (rf & 1) {
    const _r4 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "lg-title", 4);
    \u0275\u0275text(1);
    \u0275\u0275pipe(2, "translate");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "lg-card-list", 5);
    \u0275\u0275listener("onSelected", function InvoicesListComponent_Conditional_6_For_2_Template_lg_card_list_onSelected_3_listener($event) {
      \u0275\u0275restoreView(_r4);
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.selectionZoneService.putSelected($event));
    })("onDeleteOne", function InvoicesListComponent_Conditional_6_For_2_Template_lg_card_list_onDeleteOne_3_listener($event) {
      \u0275\u0275restoreView(_r4);
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.deleteOne($event));
    });
    \u0275\u0275repeaterCreate(4, InvoicesListComponent_Conditional_6_For_2_For_5_Template, 1, 2, null, 6, _forTrack0);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const category_r9 = ctx.$implicit;
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275property("level", 3);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", (category_r9 == null ? null : category_r9.group_key) || \u0275\u0275pipeBind1(2, 5, "without-category-label"), " ");
    \u0275\u0275advance(2);
    \u0275\u0275property("mode", ctx_r1.selectionZoneService.selectionMode())("selectAll", ctx_r1.selectionZoneService.selectAll())("deselectAll", ctx_r1.selectionZoneService.deselectAll());
    \u0275\u0275advance();
    \u0275\u0275repeater(category_r9.items);
  }
}
function InvoicesListComponent_Conditional_6_ForEmpty_3_Template(rf, ctx) {
  if (rf & 1) {
    const _r3 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "lg-flex-column", 3);
    \u0275\u0275text(1);
    \u0275\u0275pipe(2, "translate");
    \u0275\u0275elementStart(3, "lg-button", 12);
    \u0275\u0275listener("click", function InvoicesListComponent_Conditional_6_ForEmpty_3_Template_lg_button_click_3_listener() {
      \u0275\u0275restoreView(_r3);
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.onAddInvoice());
    });
    \u0275\u0275text(4);
    \u0275\u0275pipe(5, "translate");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind1(2, 5, "invoices.empty-state.text"), " ");
    \u0275\u0275advance(2);
    \u0275\u0275styleMap("primary");
    \u0275\u0275property("size", "medium");
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind1(5, 7, "invoices.empty-state.btn"), " ");
  }
}
function InvoicesListComponent_Conditional_6_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275conditionalCreate(0, InvoicesListComponent_Conditional_6_Conditional_0_Template, 1, 2, "lg-selection-tools", 2);
    \u0275\u0275repeaterCreate(1, InvoicesListComponent_Conditional_6_For_2_Template, 6, 7, null, null, \u0275\u0275repeaterTrackByIndex, false, InvoicesListComponent_Conditional_6_ForEmpty_3_Template, 6, 9, "lg-flex-column", 3);
  }
  if (rf & 2) {
    let tmp_1_0;
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275conditional(((tmp_1_0 = ctx_r1.invoices()) == null ? null : tmp_1_0.length) ? 0 : -1);
    \u0275\u0275advance();
    \u0275\u0275repeater(ctx_r1.invoices());
  }
}
function InvoicesListComponent_Conditional_7_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275text(0);
    \u0275\u0275pipe(1, "translate");
  }
  if (rf & 2) {
    \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind1(1, 1, "invoices.soon.text"), " ");
  }
}
var InvoicesListComponent = class _InvoicesListComponent {
  _notificationsService;
  selectionZoneService;
  _invoicesRepository;
  _router;
  _translateService;
  constructor(_notificationsService, selectionZoneService, _invoicesRepository, _router, _translateService) {
    this._notificationsService = _notificationsService;
    this.selectionZoneService = selectionZoneService;
    this._invoicesRepository = _invoicesRepository;
    this._router = _router;
    this._translateService = _translateService;
  }
  isDevMode = isDevMode;
  nowDate = Date.now();
  invoices = toSignal(inject(CATEGORIZED_INVOICES_LIST));
  stateBadgeClasses = computed(() => {
    return this.invoices()?.map((prefixGroup) => {
      return prefixGroup?.items?.map((invoice) => {
        const state = invoice.state;
        return stateToBadgeClassMap[state || "draft"];
      });
    });
  }, ...ngDevMode ? [{ debugName: "stateBadgeClasses" }] : []);
  Stores = Stores;
  _userLang = inject(USER_LANGUAGE);
  stateLabels = computed(() => {
    this._userLang();
    return this.invoices()?.map((prefixGroup) => {
      return prefixGroup?.items?.map((invoice) => {
        const state = invoice.state;
        const key = stateToLabelMap[state];
        return key ? this._translateService.instant(key) : this._translateService.instant("invoices.state.unknown");
      });
    });
  }, ...ngDevMode ? [{ debugName: "stateLabels" }] : []);
  deleteOne(event) {
    if (!event?.uuid) {
      return;
    }
    this._invoicesRepository.deleteOne(event.uuid).then(() => {
      this._notificationsService.success("invoices.deleted");
      this.loadItems();
    });
  }
  ngOnInit() {
    this.loadItems();
  }
  loadItems() {
    this._invoicesRepository.loadToObservable();
  }
  onAddInvoice() {
    this._invoicesRepository.createEmpty().then((resp) => {
      this._router.navigate(["/invoices/edit", resp]);
    });
  }
  static \u0275fac = function InvoicesListComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _InvoicesListComponent)(\u0275\u0275directiveInject(NotificationsService), \u0275\u0275directiveInject(SelectionZoneService), \u0275\u0275directiveInject(InvoicesRepository), \u0275\u0275directiveInject(Router), \u0275\u0275directiveInject(TranslateService));
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _InvoicesListComponent, selectors: [["lg-invoices-list"]], features: [\u0275\u0275ProvidersFeature([
    SelectionZoneService,
    CurrencyPipe
  ])], decls: 8, vars: 5, consts: [[3, "click", "icon", "size"], ["aria-hidden", "false", "fontIcon", "add"], [3, "selectionTypes"], ["position", "center", "size", "medium"], [3, "level"], [3, "onSelected", "onDeleteOne", "mode", "selectAll", "deselectAll"], ["lgCardListItem", "", "type", "invoice", 3, "uuid", "bgColor"], ["size", "medium"], ["size", "small", 3, "mobileMode", "left"], ["lgExpand", "", 3, "routerLink"], [3, "ngClass"], ["lgPull", "", 1, "text-muted", "text-cursive"], [3, "click", "size"]], template: function InvoicesListComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275conditionalCreate(0, InvoicesListComponent_Conditional_0_Template, 3, 4, "lg-controls-bar");
      \u0275\u0275elementStart(1, "lg-fade-in")(2, "lg-container")(3, "lg-title");
      \u0275\u0275text(4);
      \u0275\u0275pipe(5, "translate");
      \u0275\u0275elementEnd();
      \u0275\u0275conditionalCreate(6, InvoicesListComponent_Conditional_6_Template, 4, 2)(7, InvoicesListComponent_Conditional_7_Template, 2, 3);
      \u0275\u0275elementEnd()();
    }
    if (rf & 2) {
      let tmp_0_0;
      \u0275\u0275conditional(((tmp_0_0 = ctx.invoices()) == null ? null : tmp_0_0.length) ? 0 : -1);
      \u0275\u0275advance(4);
      \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind1(5, 3, "invoices.list-title"), " ");
      \u0275\u0275advance(2);
      \u0275\u0275conditional(ctx.isDevMode() ? 6 : 7);
    }
  }, dependencies: [
    FlexRowComponent,
    ButtonComponent,
    MatIcon,
    ContainerComponent,
    TitleComponent,
    CardListComponent,
    CardListItemDirective,
    RouterLink,
    FadeInComponent,
    ControlsBarComponent,
    SelectionToolsComponent,
    ExpandDirective,
    FlexColumnComponent,
    NgClass,
    PullDirective,
    TimeAgoPipe,
    TranslatePipe,
    DatePipe
  ], styles: ["\n\n[_nghost-%COMP%] {\n  display: block;\n}\n/*# sourceMappingURL=invoices-list.component.css.map */"] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(InvoicesListComponent, [{
    type: Component,
    args: [{ selector: "lg-invoices-list", standalone: true, template: `
    @if (invoices()?.length) {
      <lg-controls-bar>
        <lg-button (click)="onAddInvoice()"
                   [icon]="true"
                   [size]="'medium'"
                   [style]="'primary'">
          <mat-icon aria-hidden="false" fontIcon="add"></mat-icon>
        </lg-button>
      </lg-controls-bar>
    }

    <lg-fade-in>
      <lg-container>
        <lg-title>
          {{ 'invoices.list-title' | translate }}
        </lg-title>

        @if (isDevMode()) {

          @if (invoices()?.length) {
            <lg-selection-tools [selectionTypes]="['invoice']"></lg-selection-tools>
          }

          @for (category of invoices(); track $index; let ic = $index) {
            <lg-title [level]="3">
              {{ category?.group_key || ('without-category-label'|translate) }}
            </lg-title>

            <lg-card-list [mode]="selectionZoneService.selectionMode()"
                          (onSelected)="selectionZoneService.putSelected($event)"
                          (onDeleteOne)="deleteOne($event)"
                          [selectAll]="selectionZoneService.selectAll()"
                          [deselectAll]="selectionZoneService.deselectAll()">
              @for (invoice of category.items; track (invoice.uuid ?? '') + $index; let i = $index) {
                <ng-template lgCardListItem
                             [uuid]="invoice.uuid"
                             [bgColor]="invoice.overdue ? '#ffcfcb' : ''"
                             type="invoice">
                  <lg-flex-column size="medium">
                    <lg-flex-row [mobileMode]="true"
                                 size="small"
                                 [left]="true">
                      <a [routerLink]="'/invoices/edit/' + invoice.uuid" lgExpand>
                        {{ invoice.name }} - #{{ invoice.prefix }}/{{ invoice.invoice_number }}
                      </a>

                      <div [ngClass]="stateBadgeClasses()?.[ic]?.[i]">
                        {{ stateLabels()?.[ic]?.[i] }}
                      </div>

                    </lg-flex-row>

                    <lg-flex-row [mobileMode]="true"
                                 size="small"
                                 [left]="true">

                      @if (!invoice.cancelled) {
                        <div>
                          {{ 'invoices.date-due' | translate }}: {{ invoice.date_due | date:'shortDate' }}
                        </div>
                      }

                      @if (invoice.issued) {
                        <div>
                          {{ 'invoices.days-left' | translate }}:
                          @if (invoice.overdue) {
                            {{ 'invoices.days-left.overdue' | translate }}
                          } @else {
                            {{ invoice.daysLeft }}
                          }
                        </div>
                      }


                      <small class="text-muted text-cursive"
                             lgPull
                             [attr.title]="(invoice?.updatedAt || invoice?.createdAt) | date:'short'">
                        {{ 'edited-at-label'|translate }} {{ (invoice?.updatedAt || invoice?.createdAt) | timeAgo }}
                      </small>
                    </lg-flex-row>
                  </lg-flex-column>
                </ng-template>
              }
            </lg-card-list>
          } @empty {
            <lg-flex-column position="center"
                            size="medium">
              {{ 'invoices.empty-state.text'|translate }}

              <lg-button (click)="onAddInvoice()"
                         [style]="'primary'"
                         [size]="'medium'">
                {{ 'invoices.empty-state.btn'|translate }}
              </lg-button>
            </lg-flex-column>
          }
        } @else {
          {{ 'invoices.soon.text'|translate }}
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
      RouterLink,
      FadeInComponent,
      ControlsBarComponent,
      SelectionToolsComponent,
      TimeAgoPipe,
      ExpandDirective,
      TranslatePipe,
      FlexColumnComponent,
      DatePipe,
      NgClass,
      PullDirective
    ], providers: [
      SelectionZoneService,
      CurrencyPipe
    ], styles: ["/* angular:styles/component:scss;01c1eed413cbcab17b345a4da1b468b4e2a0a4e51bc2f6ee57d46c1ca65a67bb;/Users/khripunovpavel/Documents/my/lasagna/lasagna/src/app/features/invoices/view/list/invoices-list.component.ts */\n:host {\n  display: block;\n}\n/*# sourceMappingURL=invoices-list.component.css.map */\n"] }]
  }], () => [{ type: NotificationsService }, { type: SelectionZoneService }, { type: InvoicesRepository }, { type: Router }, { type: TranslateService }], null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(InvoicesListComponent, { className: "InvoicesListComponent", filePath: "src/app/features/invoices/view/list/invoices-list.component.ts", lineNumber: 167 });
})();
export {
  InvoicesListComponent
};
//# sourceMappingURL=chunk-AIYQLDFH.js.map
