import {
  stateToBadgeClassMap,
  stateToLabelMap
} from "./chunk-XBVWJL5U.js";
import {
  ControlsBarComponent,
  SelectionToolsComponent
} from "./chunk-HTGIMZ3V.js";
import {
  CardListComponent
} from "./chunk-GW7MY6XY.js";
import {
  CardListItemDirective
} from "./chunk-I2GJGW5L.js";
import "./chunk-ZK4SIRUU.js";
import "./chunk-VWS7U6ZE.js";
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
import {
  TimeAgoPipe
} from "./chunk-RWMTLK2E.js";
import {
  FlexColumnComponent
} from "./chunk-WKEFA3OS.js";
import {
  FadeInComponent
} from "./chunk-GKY6K6EK.js";
import "./chunk-HNJAQDA3.js";
import {
  TitleComponent
} from "./chunk-LKA4ZC5L.js";
import {
  InvoicesRepository,
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
  TranslatePipe,
  TranslateService
} from "./chunk-UMVMUCIR.js";
import {
  Stores,
  USER_LANGUAGE
} from "./chunk-CTLQRZYU.js";
import "./chunk-5WJUMO7X.js";
import {
  Router,
  RouterLink
} from "./chunk-JRXEEUAD.js";
import "./chunk-5MLLJAOM.js";
import {
  CurrencyPipe,
  DatePipe,
  DecimalPipe,
  NgClass
} from "./chunk-76JI64DZ.js";
import {
  Component,
  InjectionToken,
  computed,
  from,
  inject,
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
} from "./chunk-UQVCVPTQ.js";
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
    \u0275\u0275elementStart(0, "lg-controls-bar")(1, "lg-button", 2);
    \u0275\u0275listener("click", function InvoicesListComponent_Conditional_0_Template_lg_button_click_1_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.onAddInvoice());
    });
    \u0275\u0275element(2, "mat-icon", 3);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    \u0275\u0275advance();
    \u0275\u0275styleMap("success");
    \u0275\u0275property("icon", true)("size", "medium");
  }
}
function InvoicesListComponent_Conditional_6_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "lg-selection-tools", 0);
  }
  if (rf & 2) {
    \u0275\u0275property("selectionTypes", \u0275\u0275pureFunction0(1, _c0));
  }
}
function InvoicesListComponent_For_8_For_5_ng_template_0_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "lg-flex-column", 7)(1, "lg-flex-row", 8)(2, "lg-flex-row", 9)(3, "a", 10);
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "div", 11);
    \u0275\u0275text(6);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(7, "small", 12);
    \u0275\u0275pipe(8, "date");
    \u0275\u0275text(9);
    \u0275\u0275pipe(10, "translate");
    \u0275\u0275pipe(11, "timeAgo");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(12, "lg-flex-row", 8)(13, "div");
    \u0275\u0275text(14);
    \u0275\u0275pipe(15, "translate");
    \u0275\u0275pipe(16, "date");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(17, "div");
    \u0275\u0275text(18);
    \u0275\u0275pipe(19, "translate");
    \u0275\u0275pipe(20, "number");
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    let tmp_28_0;
    let tmp_29_0;
    const ctx_r4 = \u0275\u0275nextContext();
    const invoice_r6 = ctx_r4.$implicit;
    const \u0275$index_26_r7 = ctx_r4.$index;
    const \u0275$index_19_r8 = \u0275\u0275nextContext().$index;
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275property("size", "medium");
    \u0275\u0275advance();
    \u0275\u0275property("center", true);
    \u0275\u0275advance();
    \u0275\u0275property("center", true);
    \u0275\u0275advance();
    \u0275\u0275property("routerLink", "/invoices/edit/" + invoice_r6.uuid);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate3(" #", invoice_r6.prefix, "/", invoice_r6.invoice_number, " - ", invoice_r6.name, " ");
    \u0275\u0275advance();
    \u0275\u0275property("ngClass", (tmp_28_0 = ctx_r1.stateBadgeClasses()) == null ? null : tmp_28_0[\u0275$index_19_r8] == null ? null : tmp_28_0[\u0275$index_19_r8][\u0275$index_26_r7]);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", (tmp_29_0 = ctx_r1.stateLabels()) == null ? null : tmp_29_0[\u0275$index_19_r8] == null ? null : tmp_29_0[\u0275$index_19_r8][\u0275$index_26_r7], " ");
    \u0275\u0275advance();
    \u0275\u0275attribute("title", \u0275\u0275pipeBind2(8, 17, (invoice_r6 == null ? null : invoice_r6.updatedAt) || (invoice_r6 == null ? null : invoice_r6.createdAt), "short"));
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate2(" ", \u0275\u0275pipeBind1(10, 20, "edited-at-label"), " ", \u0275\u0275pipeBind1(11, 22, (invoice_r6 == null ? null : invoice_r6.updatedAt) || (invoice_r6 == null ? null : invoice_r6.createdAt)), " ");
    \u0275\u0275advance(3);
    \u0275\u0275property("center", true);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate2(" ", \u0275\u0275pipeBind1(15, 24, "invoices.date-due"), ": ", \u0275\u0275pipeBind2(16, 26, invoice_r6.date_due, "shortDate"), " ");
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate2(" ", \u0275\u0275pipeBind1(19, 29, "invoices.days-left"), " : ", \u0275\u0275pipeBind2(20, 31, (invoice_r6.date_due - ctx_r1.nowDate) / (1e3 * 60 * 60 * 24), "1.0-0"), " ");
  }
}
function InvoicesListComponent_For_8_For_5_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275template(0, InvoicesListComponent_For_8_For_5_ng_template_0_Template, 21, 34, "ng-template", 6);
  }
  if (rf & 2) {
    const invoice_r6 = ctx.$implicit;
    \u0275\u0275property("uuid", invoice_r6.uuid);
  }
}
function InvoicesListComponent_For_8_Template(rf, ctx) {
  if (rf & 1) {
    const _r4 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "lg-title", 4);
    \u0275\u0275text(1);
    \u0275\u0275pipe(2, "translate");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "lg-card-list", 5);
    \u0275\u0275listener("onSelected", function InvoicesListComponent_For_8_Template_lg_card_list_onSelected_3_listener($event) {
      \u0275\u0275restoreView(_r4);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.selectionZoneService.putSelected($event));
    })("onDeleteOne", function InvoicesListComponent_For_8_Template_lg_card_list_onDeleteOne_3_listener($event) {
      \u0275\u0275restoreView(_r4);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.deleteOne($event));
    });
    \u0275\u0275repeaterCreate(4, InvoicesListComponent_For_8_For_5_Template, 1, 1, null, 6, _forTrack0);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const category_r9 = ctx.$implicit;
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275property("level", 3);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", (category_r9 == null ? null : category_r9.group_key) || \u0275\u0275pipeBind1(2, 5, "without-category-label"), " ");
    \u0275\u0275advance(2);
    \u0275\u0275property("mode", ctx_r1.selectionZoneService.selectionMode())("selectAll", ctx_r1.selectionZoneService.selectAll())("deselectAll", ctx_r1.selectionZoneService.deselectAll());
    \u0275\u0275advance();
    \u0275\u0275repeater(category_r9.items);
  }
}
function InvoicesListComponent_ForEmpty_9_Template(rf, ctx) {
  if (rf & 1) {
    const _r3 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "lg-flex-column", 1);
    \u0275\u0275text(1);
    \u0275\u0275pipe(2, "translate");
    \u0275\u0275elementStart(3, "lg-button", 13);
    \u0275\u0275listener("click", function InvoicesListComponent_ForEmpty_9_Template_lg_button_click_3_listener() {
      \u0275\u0275restoreView(_r3);
      const ctx_r1 = \u0275\u0275nextContext();
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
    \u0275\u0275styleMap("success");
    \u0275\u0275property("size", "medium");
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind1(5, 7, "invoices.empty-state.btn"), " ");
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
  _userLang = inject(USER_LANGUAGE);
  nowDate = Date.now();
  invoices = toSignal(inject(CATEGORIZED_INVOICES_LIST));
  stateLabels = computed(() => {
    this._userLang();
    return this.invoices()?.map((prefixGroup) => {
      return prefixGroup?.items?.map((invoice) => {
        const state = invoice.state;
        const key = stateToLabelMap[state];
        return key ? this._translateService.instant(key) : this._translateService.instant("invoices.state.unknown");
      });
    });
  });
  stateBadgeClasses = computed(() => {
    return this.invoices()?.map((prefixGroup) => {
      return prefixGroup?.items?.map((invoice) => {
        const state = invoice.state;
        return stateToBadgeClassMap[state || "draft"];
      });
    });
  });
  Stores = Stores;
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
  ])], decls: 10, vars: 6, consts: [[3, "selectionTypes"], ["position", "center", "size", "medium"], [3, "click", "icon", "size"], ["aria-hidden", "false", "fontIcon", "add"], [3, "level"], [3, "onSelected", "onDeleteOne", "mode", "selectAll", "deselectAll"], ["lgCardListItem", "", "type", "invoice", 3, "uuid"], [3, "size"], [3, "center"], ["lgExpand", "", 3, "center"], [3, "routerLink"], [3, "ngClass"], [1, "text-muted", "text-cursive"], [3, "click", "size"]], template: function InvoicesListComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275conditionalCreate(0, InvoicesListComponent_Conditional_0_Template, 3, 4, "lg-controls-bar");
      \u0275\u0275elementStart(1, "lg-fade-in")(2, "lg-container")(3, "lg-title");
      \u0275\u0275text(4);
      \u0275\u0275pipe(5, "translate");
      \u0275\u0275elementEnd();
      \u0275\u0275conditionalCreate(6, InvoicesListComponent_Conditional_6_Template, 1, 2, "lg-selection-tools", 0);
      \u0275\u0275repeaterCreate(7, InvoicesListComponent_For_8_Template, 6, 7, null, null, \u0275\u0275repeaterTrackByIndex, false, InvoicesListComponent_ForEmpty_9_Template, 6, 9, "lg-flex-column", 1);
      \u0275\u0275elementEnd()();
    }
    if (rf & 2) {
      let tmp_0_0;
      let tmp_2_0;
      \u0275\u0275conditional(((tmp_0_0 = ctx.invoices()) == null ? null : tmp_0_0.length) ? 0 : -1);
      \u0275\u0275advance(4);
      \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind1(5, 4, "invoices.list-title"), " ");
      \u0275\u0275advance(2);
      \u0275\u0275conditional(((tmp_2_0 = ctx.invoices()) == null ? null : tmp_2_0.length) ? 6 : -1);
      \u0275\u0275advance();
      \u0275\u0275repeater(ctx.invoices());
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
    TimeAgoPipe,
    ExpandDirective,
    TranslatePipe,
    FlexColumnComponent,
    DatePipe,
    DecimalPipe,
    NgClass
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
                   [style]="'success'">
          <mat-icon aria-hidden="false" fontIcon="add"></mat-icon>
        </lg-button>
      </lg-controls-bar>
    }

    <lg-fade-in>
      <lg-container>
        <lg-title>
          {{ 'invoices.list-title' | translate }}
        </lg-title>

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
              <ng-template lgCardListItem [uuid]="invoice.uuid" type="invoice">
                <lg-flex-column [size]="'medium'">
                  <lg-flex-row [center]="true">
                    <lg-flex-row [center]="true" lgExpand>
                      <a [routerLink]="'/invoices/edit/' + invoice.uuid">
                        #{{ invoice.prefix }}/{{ invoice.invoice_number }} - {{ invoice.name }}
                      </a>

                      <div [ngClass]="stateBadgeClasses()?.[ic]?.[i]">
                        {{ stateLabels()?.[ic]?.[i] }}
                      </div>
                    </lg-flex-row>

                    <small class="text-muted text-cursive"
                           [attr.title]="(invoice?.updatedAt || invoice?.createdAt) | date:'short'">
                      {{ 'edited-at-label'|translate }} {{ (invoice?.updatedAt || invoice?.createdAt) | timeAgo }}
                    </small>
                  </lg-flex-row>

                  <lg-flex-row [center]="true">
                    <div>
                      {{ 'invoices.date-due' | translate }}: {{ invoice.date_due | date:'shortDate' }}
                    </div>

                    <div>
                      {{ 'invoices.days-left' | translate }}
                      : {{ (invoice.date_due - nowDate) / (1000 * 60 * 60 * 24) | number:'1.0-0' }}
                    </div>
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
                       [size]="'medium'"
                       [style]="'success'">
              {{ 'invoices.empty-state.btn'|translate }}
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
      RouterLink,
      FadeInComponent,
      ControlsBarComponent,
      SelectionToolsComponent,
      TimeAgoPipe,
      ExpandDirective,
      TranslatePipe,
      FlexColumnComponent,
      DatePipe,
      DecimalPipe,
      NgClass
    ], providers: [
      SelectionZoneService,
      CurrencyPipe
    ], styles: ["/* angular:styles/component:scss;01c1eed413cbcab17b345a4da1b468b4e2a0a4e51bc2f6ee57d46c1ca65a67bb;/Users/khripunovpavel/Documents/my/lasagna/lasagna/src/app/features/invoices/view/list/invoices-list.component.ts */\n:host {\n  display: block;\n}\n/*# sourceMappingURL=invoices-list.component.css.map */\n"] }]
  }], () => [{ type: NotificationsService }, { type: SelectionZoneService }, { type: InvoicesRepository }, { type: Router }, { type: TranslateService }], null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(InvoicesListComponent, { className: "InvoicesListComponent", filePath: "src/app/features/invoices/view/list/invoices-list.component.ts", lineNumber: 143 });
})();
export {
  InvoicesListComponent
};
//# sourceMappingURL=chunk-M3H2PCS7.js.map
