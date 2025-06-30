import {
  InvoicesRepository
} from "./chunk-PGLJJCT4.js";
import "./chunk-OY2YJNFS.js";
import "./chunk-X3TKJTU2.js";
import "./chunk-NDBDMDB3.js";
import {
  ControlsBarComponent,
  SelectionToolsComponent
} from "./chunk-TPTHWRXS.js";
import {
  CardListComponent,
  CardListItemDirective
} from "./chunk-BSCLEJ6Z.js";
import "./chunk-47THLFJI.js";
import "./chunk-7YWLATDR.js";
import "./chunk-2TWTOV7K.js";
import {
  ExpandDirective
} from "./chunk-MJ7CZNNR.js";
import {
  MatIcon
} from "./chunk-JVNP6C27.js";
import {
  GapColumnComponent
} from "./chunk-5CDCXM6R.js";
import {
  ContainerComponent
} from "./chunk-U5POLJOC.js";
import {
  GapRowComponent
} from "./chunk-RWMLY22Y.js";
import {
  TimeAgoPipe
} from "./chunk-63WB3IEN.js";
import {
  TranslatePipe
} from "./chunk-PZVFCWPY.js";
import {
  FadeInComponent
} from "./chunk-JNX3I5QY.js";
import "./chunk-HNJAQDA3.js";
import {
  TitleComponent
} from "./chunk-F2TP5Q2W.js";
import {
  ButtonComponent,
  NotificationsService,
  SelectionZoneService,
  groupBy,
  toSignal
} from "./chunk-EH6A44OR.js";
import {
  Router,
  RouterLink,
  Stores
} from "./chunk-UGLIF2MQ.js";
import "./chunk-Q4M4NLQD.js";
import "./chunk-5WJUMO7X.js";
import {
  CurrencyPipe,
  DatePipe,
  DecimalPipe
} from "./chunk-5MHPI2FA.js";
import {
  Component,
  InjectionToken,
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
} from "./chunk-6AETQSBA.js";
import "./chunk-PZQLIUCM.js";
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
var _c0 = () => ["product"];
var _forTrack0 = ($index, $item) => ($item.uuid ?? "") + $index;
function InvoicesListComponent_For_9_For_5_ng_template_0_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "lg-gap-column", 7)(1, "lg-gap-row", 3)(2, "lg-gap-row", 8)(3, "a", 9);
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
    \u0275\u0275element(5, "div");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "small", 10);
    \u0275\u0275pipe(7, "date");
    \u0275\u0275text(8);
    \u0275\u0275pipe(9, "translate");
    \u0275\u0275pipe(10, "timeAgo");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(11, "lg-gap-row", 3)(12, "div");
    \u0275\u0275text(13);
    \u0275\u0275pipe(14, "date");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(15, "div");
    \u0275\u0275text(16);
    \u0275\u0275pipe(17, "number");
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const invoice_r3 = \u0275\u0275nextContext().$implicit;
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275property("size", "medium");
    \u0275\u0275advance();
    \u0275\u0275property("center", true);
    \u0275\u0275advance();
    \u0275\u0275property("center", true);
    \u0275\u0275advance();
    \u0275\u0275property("routerLink", "/invoices/edit/" + invoice_r3.uuid);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate3(" #", invoice_r3.prefix, "/", invoice_r3.invoice_number, " - ", invoice_r3.name, " ");
    \u0275\u0275advance(2);
    \u0275\u0275attribute("title", \u0275\u0275pipeBind2(7, 13, (invoice_r3 == null ? null : invoice_r3.updatedAt) || (invoice_r3 == null ? null : invoice_r3.createdAt), "short"));
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate2(" ", \u0275\u0275pipeBind1(9, 16, "edited-at-label"), " ", \u0275\u0275pipeBind1(10, 18, (invoice_r3 == null ? null : invoice_r3.updatedAt) || (invoice_r3 == null ? null : invoice_r3.createdAt)), " ");
    \u0275\u0275advance(3);
    \u0275\u0275property("center", true);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" Date due: ", \u0275\u0275pipeBind2(14, 20, invoice_r3.date_due, "shortDate"), " ");
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1(" Days left: ", \u0275\u0275pipeBind2(17, 23, (invoice_r3.date_due - ctx_r1.nowDate) / (1e3 * 60 * 60 * 24), "1.0-0"), " ");
  }
}
function InvoicesListComponent_For_9_For_5_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275template(0, InvoicesListComponent_For_9_For_5_ng_template_0_Template, 18, 26, "ng-template", 6);
  }
  if (rf & 2) {
    const invoice_r3 = ctx.$implicit;
    \u0275\u0275property("uuid", invoice_r3.uuid);
  }
}
function InvoicesListComponent_For_9_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "lg-title", 4);
    \u0275\u0275text(1);
    \u0275\u0275pipe(2, "translate");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "lg-card-list", 5);
    \u0275\u0275listener("onSelected", function InvoicesListComponent_For_9_Template_lg_card_list_onSelected_3_listener($event) {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.selectionZoneService.putSelected($event));
    })("onDeleteOne", function InvoicesListComponent_For_9_Template_lg_card_list_onDeleteOne_3_listener($event) {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.deleteOne($event));
    });
    \u0275\u0275repeaterCreate(4, InvoicesListComponent_For_9_For_5_Template, 1, 1, null, 6, _forTrack0);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const category_r4 = ctx.$implicit;
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275property("level", 3);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", (category_r4 == null ? null : category_r4.group_key) || \u0275\u0275pipeBind1(2, 5, "without-category-label"), " ");
    \u0275\u0275advance(2);
    \u0275\u0275property("mode", ctx_r1.selectionZoneService.selectionMode())("selectAll", ctx_r1.selectionZoneService.selectAll())("deselectAll", ctx_r1.selectionZoneService.deselectAll());
    \u0275\u0275advance();
    \u0275\u0275repeater(category_r4.items);
  }
}
function InvoicesListComponent_ForEmpty_10_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "lg-gap-row", 3)(1, "lg-title", 4);
    \u0275\u0275text(2);
    \u0275\u0275pipe(3, "translate");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    \u0275\u0275property("center", true);
    \u0275\u0275advance();
    \u0275\u0275property("level", 5);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind1(3, 3, "no-products"), " ");
  }
}
var InvoicesListComponent = class _InvoicesListComponent {
  _notificationsService;
  selectionZoneService;
  _invoicesRepository;
  _router;
  constructor(_notificationsService, selectionZoneService, _invoicesRepository, _router) {
    this._notificationsService = _notificationsService;
    this.selectionZoneService = selectionZoneService;
    this._invoicesRepository = _invoicesRepository;
    this._router = _router;
  }
  nowDate = Date.now();
  invoices = toSignal(inject(CATEGORIZED_INVOICES_LIST));
  Stores = Stores;
  deleteOne(event) {
    if (!event?.uuid) {
      return;
    }
    this._invoicesRepository.deleteOne(event.uuid).then(() => {
      this._notificationsService.success("invoice.deleted");
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
    return new (__ngFactoryType__ || _InvoicesListComponent)(\u0275\u0275directiveInject(NotificationsService), \u0275\u0275directiveInject(SelectionZoneService), \u0275\u0275directiveInject(InvoicesRepository), \u0275\u0275directiveInject(Router));
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _InvoicesListComponent, selectors: [["lg-invoices-list"]], features: [\u0275\u0275ProvidersFeature([
    SelectionZoneService,
    CurrencyPipe
  ])], decls: 11, vars: 7, consts: [[3, "click", "icon", "size"], ["aria-hidden", "false", "fontIcon", "add"], [3, "selectionTypes"], [3, "center"], [3, "level"], [3, "onSelected", "onDeleteOne", "mode", "selectAll", "deselectAll"], ["lgCardListItem", "", "type", "product", 3, "uuid"], [3, "size"], ["lgExpand", "", 3, "center"], [3, "routerLink"], [1, "text-muted", "text-cursive"]], template: function InvoicesListComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "lg-controls-bar")(1, "lg-button", 0);
      \u0275\u0275listener("click", function InvoicesListComponent_Template_lg_button_click_1_listener() {
        return ctx.onAddInvoice();
      });
      \u0275\u0275element(2, "mat-icon", 1);
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(3, "lg-fade-in")(4, "lg-container")(5, "lg-title");
      \u0275\u0275text(6, " Invoices ");
      \u0275\u0275elementEnd();
      \u0275\u0275element(7, "lg-selection-tools", 2);
      \u0275\u0275repeaterCreate(8, InvoicesListComponent_For_9_Template, 6, 7, null, null, \u0275\u0275repeaterTrackByIndex, false, InvoicesListComponent_ForEmpty_10_Template, 4, 5, "lg-gap-row", 3);
      \u0275\u0275elementEnd()();
    }
    if (rf & 2) {
      \u0275\u0275advance();
      \u0275\u0275styleMap("success");
      \u0275\u0275property("icon", true)("size", "medium");
      \u0275\u0275advance(6);
      \u0275\u0275property("selectionTypes", \u0275\u0275pureFunction0(6, _c0));
      \u0275\u0275advance();
      \u0275\u0275repeater(ctx.invoices());
    }
  }, dependencies: [
    GapRowComponent,
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
    GapColumnComponent,
    DatePipe,
    DecimalPipe
  ], styles: ["\n\n[_nghost-%COMP%] {\n  display: block;\n}\n/*# sourceMappingURL=invoices-list.component.css.map */"] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(InvoicesListComponent, [{
    type: Component,
    args: [{ selector: "lg-invoices-list", standalone: true, template: `
    <lg-controls-bar>
      <lg-button [icon]="true"
                 (click)="onAddInvoice()"
                 [size]="'medium'"
                 [style]="'success'">
        <mat-icon aria-hidden="false" fontIcon="add"></mat-icon>
      </lg-button>
    </lg-controls-bar>

    <lg-fade-in>
      <lg-container>
        <lg-title>
          <!--          {{ 'products.list-title'|translate }}-->
          Invoices
        </lg-title>

        <lg-selection-tools [selectionTypes]="['product']"></lg-selection-tools>

        @for (category of invoices(); track $index; let i = $index) {
          <lg-title [level]="3">
            {{ category?.group_key || ('without-category-label'|translate) }}
          </lg-title>

          <lg-card-list [mode]="selectionZoneService.selectionMode()"
                        (onSelected)="selectionZoneService.putSelected($event)"
                        (onDeleteOne)="deleteOne($event)"
                        [selectAll]="selectionZoneService.selectAll()"
                        [deselectAll]="selectionZoneService.deselectAll()">
            @for (invoice of category.items; track (invoice.uuid ?? '') + $index; let i = $index) {
              <ng-template lgCardListItem [uuid]="invoice.uuid" type="product">
                <lg-gap-column [size]="'medium'">
                  <lg-gap-row [center]="true">
                    <lg-gap-row [center]="true" lgExpand>
                      <a [routerLink]="'/invoices/edit/' + invoice.uuid">
                        #{{ invoice.prefix }}/{{ invoice.invoice_number }} - {{ invoice.name }}
                      </a>

                      <div>
                        <!--                        {{ $any(invoice).pricePerUnit | userCurrency:'1.0-5' }}-->
                        <!--                        {{ $any(invoice).perUnitLabel }}-->
                      </div>
                    </lg-gap-row>

                    <small class="text-muted text-cursive"
                           [attr.title]="(invoice?.updatedAt || invoice?.createdAt) | date:'short'">
                      {{ 'edited-at-label'|translate }} {{ (invoice?.updatedAt || invoice?.createdAt) | timeAgo }}
                    </small>
                  </lg-gap-row>

                  <lg-gap-row [center]="true">
                    <div>
                      Date due: {{ invoice.date_due | date:'shortDate' }}
                    </div>

                    <div>
                      Days left: {{ (invoice.date_due - nowDate) / (1000 * 60 * 60 * 24) | number:'1.0-0' }}
                    </div>
                  </lg-gap-row>
                </lg-gap-column>
              </ng-template>
            }
          </lg-card-list>
        } @empty {
          <lg-gap-row [center]="true">
            <lg-title [level]="5">
              {{ 'no-products'|translate }}
            </lg-title>
          </lg-gap-row>
        }
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
      RouterLink,
      FadeInComponent,
      ControlsBarComponent,
      SelectionToolsComponent,
      TimeAgoPipe,
      ExpandDirective,
      TranslatePipe,
      GapColumnComponent,
      DatePipe,
      DecimalPipe
    ], providers: [
      SelectionZoneService,
      CurrencyPipe
    ], styles: ["/* angular:styles/component:scss;01c1eed413cbcab17b345a4da1b468b4e2a0a4e51bc2f6ee57d46c1ca65a67bb;/Users/khripunovpavel/Documents/my/lasagna/lasagna/src/app/features/invoices/view/list/invoices-list.component.ts */\n:host {\n  display: block;\n}\n/*# sourceMappingURL=invoices-list.component.css.map */\n"] }]
  }], () => [{ type: NotificationsService }, { type: SelectionZoneService }, { type: InvoicesRepository }, { type: Router }], null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(InvoicesListComponent, { className: "InvoicesListComponent", filePath: "src/app/features/invoices/view/list/invoices-list.component.ts", lineNumber: 132 });
})();
export {
  InvoicesListComponent
};
//# sourceMappingURL=chunk-4SMVBZSR.js.map
