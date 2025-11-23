import {
  GroupSortService
} from "./chunk-ACED5AZV.js";
import "./chunk-N4BRTEB2.js";
import {
  GroupingHeaderDirective,
  GroupingTilesComponent
} from "./chunk-PVQCZ74O.js";
import "./chunk-7PXYLFXV.js";
import "./chunk-GFM7A3VZ.js";
import {
  GroupingTileDirective
} from "./chunk-MQSB7PK6.js";
import {
  TimeAgoPipe
} from "./chunk-N6SHWPG5.js";
import {
  FlexRowComponent
} from "./chunk-VVGY6OUS.js";
import "./chunk-2SFSXA66.js";
import "./chunk-CFCFQO5U.js";
import "./chunk-RBDPPOGX.js";
import "./chunk-BUGRPEBT.js";
import "./chunk-BPMAQ256.js";
import "./chunk-OGDPSEDB.js";
import {
  LogCenterService
} from "./chunk-6WNKKHFO.js";
import "./chunk-NLONWH5J.js";
import "./chunk-MV7X5YHM.js";
import "./chunk-QHJLSFIB.js";
import "./chunk-3UJV2MM3.js";
import "./chunk-UG5XPMCB.js";
import "./chunk-XXA7PPXB.js";
import "./chunk-XIU3WVPC.js";
import "./chunk-T5CRNY7R.js";
import "./chunk-IWOUTMKL.js";
import "./chunk-R5O3TEDB.js";
import "./chunk-KM2DRJZA.js";
import "./chunk-2S3NUMNU.js";
import "./chunk-PHCOZAXM.js";
import "./chunk-AWZMWU52.js";
import "./chunk-5WJUMO7X.js";
import {
  TitleComponent
} from "./chunk-3AYILQJD.js";
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
  TranslatePipe,
  TranslateService
} from "./chunk-755Q3QHA.js";
import "./chunk-L34DFTMV.js";
import "./chunk-USF337CA.js";
import "./chunk-VVQKNBNV.js";
import {
  CommonModule,
  DatePipe,
  NgTemplateOutlet
} from "./chunk-X2X7GTPW.js";
import "./chunk-PZQLIUCM.js";
import "./chunk-7YWLATDR.js";
import {
  Component,
  EventEmitter,
  HostBinding,
  Injectable,
  Input,
  Output,
  computed,
  inject,
  setClassMetadata,
  signal,
  ɵsetClassDebugInfo,
  ɵɵNgOnChangesFeature,
  ɵɵadvance,
  ɵɵattribute,
  ɵɵclassMap,
  ɵɵconditional,
  ɵɵconditionalCreate,
  ɵɵdefineComponent,
  ɵɵdefineInjectable,
  ɵɵelement,
  ɵɵelementContainer,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵgetCurrentView,
  ɵɵlistener,
  ɵɵnextContext,
  ɵɵpipe,
  ɵɵpipeBind1,
  ɵɵpipeBind2,
  ɵɵproperty,
  ɵɵpureFunction1,
  ɵɵreference,
  ɵɵresetView,
  ɵɵrestoreView,
  ɵɵtemplate,
  ɵɵtemplateRefExtractor,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1
} from "./chunk-IYCVPBRB.js";
import "./chunk-46DXP6YY.js";

// src/app/features/settings/service/providers/logs.grouping.ts
var LogsByMinuteGroupingStrategy = class {
  groupBy(item) {
    const date = new Date(item.timestamp);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    return `${year}-${month}-${day} ${hours}:${minutes}`;
  }
  innerSort(a, b, direction = "desc", field = "timestamp") {
    const dateA = new Date(a.timestamp);
    const dateB = new Date(b.timestamp);
    if (direction === "asc") {
      return dateA.getTime() - dateB.getTime();
    } else {
      return dateB.getTime() - dateA.getTime();
    }
  }
  groupingSort(a, b, direction = "desc") {
    const dateA = new Date(a);
    const dateB = new Date(b);
    if (direction === "asc") {
      return dateA.getTime() - dateB.getTime();
    } else {
      return dateB.getTime() - dateA.getTime();
    }
  }
};

// src/app/shared/view/ui/pagination/pagination.component.ts
function PaginationComponent_Conditional_0_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 0)(1, "lg-flex-row", 1)(2, "lg-button", 2);
    \u0275\u0275listener("click", function PaginationComponent_Conditional_0_Template_lg_button_click_2_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.previousPage());
    });
    \u0275\u0275elementStart(3, "span", 3);
    \u0275\u0275text(4, "\u25C0");
    \u0275\u0275elementEnd();
    \u0275\u0275text(5);
    \u0275\u0275pipe(6, "translate");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "div", 4)(8, "span", 5);
    \u0275\u0275text(9);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(10, "span", 6);
    \u0275\u0275text(11, "/");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(12, "span", 7);
    \u0275\u0275text(13);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(14, "lg-button", 2);
    \u0275\u0275listener("click", function PaginationComponent_Conditional_0_Template_lg_button_click_14_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.nextPage());
    });
    \u0275\u0275text(15);
    \u0275\u0275pipe(16, "translate");
    \u0275\u0275elementStart(17, "span", 3);
    \u0275\u0275text(18, "\u25B6");
    \u0275\u0275elementEnd()()()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275property("center", true);
    \u0275\u0275advance();
    \u0275\u0275property("disabled", ctx_r1.currentPage() === 1);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind1(6, 7, "pagination.previous"), " ");
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(ctx_r1.currentPage());
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(ctx_r1.totalPages());
    \u0275\u0275advance();
    \u0275\u0275property("disabled", ctx_r1.currentPage() === ctx_r1.totalPages());
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind1(16, 9, "pagination.next"), " ");
  }
}
var PaginationComponent = class _PaginationComponent {
  config;
  pageChange = new EventEmitter();
  currentPage = signal(1, ...ngDevMode ? [{ debugName: "currentPage" }] : []);
  totalPages = signal(1, ...ngDevMode ? [{ debugName: "totalPages" }] : []);
  hidden = computed(() => this.totalPages() ? null : true, ...ngDevMode ? [{ debugName: "hidden" }] : []);
  totalItems = signal(0, ...ngDevMode ? [{ debugName: "totalItems" }] : []);
  itemsPerPage = signal(20, ...ngDevMode ? [{ debugName: "itemsPerPage" }] : []);
  ngOnInit() {
    this.updatePagination();
  }
  ngOnChanges(changes) {
    if (changes["config"]) {
      this.updatePagination();
    }
  }
  updatePagination() {
    if (!this.config)
      return;
    this.currentPage.set(this.config.currentPage);
    this.totalItems.set(this.config.totalItems);
    this.itemsPerPage.set(this.config.itemsPerPage);
    this.totalPages.set(Math.ceil(this.config.totalItems / this.config.itemsPerPage));
  }
  previousPage() {
    if (this.currentPage() > 1) {
      const newPage = this.currentPage() - 1;
      this.currentPage.set(newPage);
      this.pageChange.emit(newPage);
    }
  }
  nextPage() {
    if (this.currentPage() < this.totalPages()) {
      const newPage = this.currentPage() + 1;
      this.currentPage.set(newPage);
      this.pageChange.emit(newPage);
    }
  }
  static \u0275fac = function PaginationComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _PaginationComponent)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _PaginationComponent, selectors: [["lg-pagination"]], hostVars: 1, hostBindings: function PaginationComponent_HostBindings(rf, ctx) {
    if (rf & 2) {
      \u0275\u0275attribute("hidden", ctx.hidden);
    }
  }, inputs: { config: "config" }, outputs: { pageChange: "pageChange" }, features: [\u0275\u0275NgOnChangesFeature], decls: 1, vars: 1, consts: [[1, "pagination"], [3, "center"], [1, "pagination__btn", 3, "click", "disabled"], [1, "pagination__icon"], [1, "pagination__info"], [1, "pagination__current"], [1, "pagination__separator"], [1, "pagination__total"]], template: function PaginationComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275conditionalCreate(0, PaginationComponent_Conditional_0_Template, 19, 11, "div", 0);
    }
    if (rf & 2) {
      \u0275\u0275conditional(ctx.totalPages() > 1 ? 0 : -1);
    }
  }, dependencies: [
    ButtonComponent,
    FlexRowComponent,
    TranslatePipe
  ], styles: ["\n\n.pagination[_ngcontent-%COMP%] {\n  margin-top: var(--spacing-lg);\n  padding-top: var(--spacing-lg);\n  border-top: 1px solid var(--color-border);\n}\n.pagination__info[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: var(--spacing-xs);\n  padding: var(--spacing-sm) var(--spacing-lg);\n  background: var(--color-background-secondary);\n  border-radius: var(--border-radius-lg);\n  font-weight: 600;\n}\n.pagination__current[_ngcontent-%COMP%] {\n  color: var(--color-primary);\n}\n.pagination__separator[_ngcontent-%COMP%] {\n  color: var(--color-text-muted);\n}\n.pagination__total[_ngcontent-%COMP%] {\n  color: var(--color-text);\n}\n.pagination__btn[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: var(--spacing-sm);\n  padding: var(--spacing-sm) var(--spacing-lg);\n  border-radius: var(--border-radius-lg);\n  font-weight: 600;\n  transition: all 0.3s ease;\n}\n.pagination__icon[_ngcontent-%COMP%] {\n  font-size: var(--font-size-sm);\n}\n/*# sourceMappingURL=pagination.component.css.map */"] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(PaginationComponent, [{
    type: Component,
    args: [{ selector: "lg-pagination", standalone: true, imports: [
      ButtonComponent,
      FlexRowComponent,
      TranslatePipe
    ], template: `
    @if (totalPages() > 1) {
      <div class="pagination">
        <lg-flex-row [center]="true">
          <lg-button
            (click)="previousPage()"
            [disabled]="currentPage() === 1"
            class="pagination__btn">
            <span class="pagination__icon">\u25C0</span>
            {{ 'pagination.previous' | translate }}
          </lg-button>

          <div class="pagination__info">
            <span class="pagination__current">{{ currentPage() }}</span>
            <span class="pagination__separator">/</span>
            <span class="pagination__total">{{ totalPages() }}</span>
          </div>

          <lg-button
            (click)="nextPage()"
            [disabled]="currentPage() === totalPages()"
            class="pagination__btn">
            {{ 'pagination.next' | translate }}
            <span class="pagination__icon">\u25B6</span>
          </lg-button>
        </lg-flex-row>
      </div>
    }
  `, styles: ["/* angular:styles/component:scss;cb73350e811c2b4594eaa7878eee732e1765b29f859ed183a03544ee52df486d;/Users/khripunovpavel/Documents/my/lasagna/lasagna/src/app/shared/view/ui/pagination/pagination.component.ts */\n.pagination {\n  margin-top: var(--spacing-lg);\n  padding-top: var(--spacing-lg);\n  border-top: 1px solid var(--color-border);\n}\n.pagination__info {\n  display: flex;\n  align-items: center;\n  gap: var(--spacing-xs);\n  padding: var(--spacing-sm) var(--spacing-lg);\n  background: var(--color-background-secondary);\n  border-radius: var(--border-radius-lg);\n  font-weight: 600;\n}\n.pagination__current {\n  color: var(--color-primary);\n}\n.pagination__separator {\n  color: var(--color-text-muted);\n}\n.pagination__total {\n  color: var(--color-text);\n}\n.pagination__btn {\n  display: flex;\n  align-items: center;\n  gap: var(--spacing-sm);\n  padding: var(--spacing-sm) var(--spacing-lg);\n  border-radius: var(--border-radius-lg);\n  font-weight: 600;\n  transition: all 0.3s ease;\n}\n.pagination__icon {\n  font-size: var(--font-size-sm);\n}\n/*# sourceMappingURL=pagination.component.css.map */\n"] }]
  }], null, { config: [{
    type: Input
  }], pageChange: [{
    type: Output
  }], hidden: [{
    type: HostBinding,
    args: ["attr.hidden"]
  }] });
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(PaginationComponent, { className: "PaginationComponent", filePath: "src/app/shared/view/ui/pagination/pagination.component.ts", lineNumber: 105 });
})();

// src/app/shared/service/services/pagination.service.ts
var PaginationService = class _PaginationService {
  _items = signal([], ...ngDevMode ? [{ debugName: "_items" }] : []);
  _currentPage = signal(1, ...ngDevMode ? [{ debugName: "_currentPage" }] : []);
  _itemsPerPage = signal(20, ...ngDevMode ? [{ debugName: "_itemsPerPage" }] : []);
  // Computed values
  totalItems = computed(() => this._items().length, ...ngDevMode ? [{ debugName: "totalItems" }] : []);
  totalPages = computed(() => Math.ceil(this.totalItems() / this._itemsPerPage()), ...ngDevMode ? [{ debugName: "totalPages" }] : []);
  currentPage = computed(() => this._currentPage(), ...ngDevMode ? [{ debugName: "currentPage" }] : []);
  itemsPerPage = computed(() => this._itemsPerPage(), ...ngDevMode ? [{ debugName: "itemsPerPage" }] : []);
  paginatedItems = computed(() => {
    const startIndex = (this.currentPage() - 1) * this.itemsPerPage();
    const endIndex = startIndex + this.itemsPerPage();
    return this._items().slice(startIndex, endIndex);
  }, ...ngDevMode ? [{ debugName: "paginatedItems" }] : []);
  config = computed(() => ({
    itemsPerPage: this.itemsPerPage(),
    currentPage: this.currentPage(),
    totalItems: this.totalItems()
  }), ...ngDevMode ? [{ debugName: "config" }] : []);
  /**
   * Устанавливает массив элементов для пагинации
   */
  setItems(items) {
    this._items.set(items);
    this.resetToFirstPage();
  }
  /**
   * Устанавливает количество элементов на странице
   */
  setItemsPerPage(itemsPerPage) {
    this._itemsPerPage.set(itemsPerPage);
    this.resetToFirstPage();
  }
  /**
   * Переходит на указанную страницу
   */
  goToPage(page) {
    if (page >= 1 && page <= this.totalPages()) {
      this._currentPage.set(page);
    }
  }
  /**
   * Переходит на следующую страницу
   */
  nextPage() {
    if (this.currentPage() < this.totalPages()) {
      this._currentPage.set(this.currentPage() + 1);
    }
  }
  /**
   * Переходит на предыдущую страницу
   */
  previousPage() {
    if (this.currentPage() > 1) {
      this._currentPage.set(this.currentPage() - 1);
    }
  }
  /**
   * Переходит на первую страницу
   */
  firstPage() {
    this._currentPage.set(1);
  }
  /**
   * Переходит на последнюю страницу
   */
  lastPage() {
    this._currentPage.set(this.totalPages());
  }
  /**
   * Сбрасывает на первую страницу
   */
  resetToFirstPage() {
    this._currentPage.set(1);
  }
  /**
   * Проверяет, есть ли следующая страница
   */
  hasNextPage() {
    return this.currentPage() < this.totalPages();
  }
  /**
   * Проверяет, есть ли предыдущая страница
   */
  hasPreviousPage() {
    return this.currentPage() > 1;
  }
  /**
   * Получает информацию о текущем диапазоне элементов
   */
  getRangeInfo() {
    const start = (this.currentPage() - 1) * this.itemsPerPage() + 1;
    const end = Math.min(this.currentPage() * this.itemsPerPage(), this.totalItems());
    return {
      start,
      end,
      total: this.totalItems(),
      currentPage: this.currentPage(),
      totalPages: this.totalPages()
    };
  }
  static \u0275fac = function PaginationService_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _PaginationService)();
  };
  static \u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _PaginationService, factory: _PaginationService.\u0275fac, providedIn: "root" });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(PaginationService, [{
    type: Injectable,
    args: [{
      providedIn: "root"
    }]
  }], null, null);
})();

// src/app/features/settings/view/log-center/log-center.component.ts
var _c0 = (a0) => ({ label: "log-center.total", value: a0, type: "default" });
var _c1 = (a0) => ({ label: "log-center.errors", value: a0, type: "error" });
var _c2 = (a0) => ({ label: "log-center.warnings", value: a0, type: "warning" });
var _c3 = (a0) => ({ label: "log-center.logs", value: a0, type: "info" });
function LogCenterComponent_ng_container_7_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementContainer(0);
  }
}
function LogCenterComponent_ng_container_8_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementContainer(0);
  }
}
function LogCenterComponent_ng_container_9_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementContainer(0);
  }
}
function LogCenterComponent_Conditional_10_ng_container_0_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementContainer(0);
  }
}
function LogCenterComponent_Conditional_10_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275template(0, LogCenterComponent_Conditional_10_ng_container_0_Template, 1, 0, "ng-container", 5);
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    const statItemTemplate_r3 = \u0275\u0275reference(16);
    \u0275\u0275property("ngTemplateOutlet", statItemTemplate_r3)("ngTemplateOutletContext", \u0275\u0275pureFunction1(2, _c3, ctx_r1.paginationService.getRangeInfo().start + "-" + ctx_r1.paginationService.getRangeInfo().end + " / " + ctx_r1.paginationService.totalItems()));
  }
}
function LogCenterComponent_Conditional_12_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "lg-flex-column", 7)(1, "span");
    \u0275\u0275text(2);
    \u0275\u0275pipe(3, "translate");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind1(3, 1, "log-center.no-logs-subtitle"));
  }
}
function LogCenterComponent_Conditional_13_ng_template_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "lg-title", 12);
    \u0275\u0275text(1);
    \u0275\u0275pipe(2, "timeAgo");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const field_r4 = ctx.$implicit;
    \u0275\u0275property("level", 3);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind1(2, 2, field_r4), " ");
  }
}
function LogCenterComponent_Conditional_13_ng_template_2_Conditional_11_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 19)(1, "span", 24);
    \u0275\u0275text(2);
    \u0275\u0275pipe(3, "translate");
    \u0275\u0275elementEnd();
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const log_r5 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1("", \u0275\u0275pipeBind1(3, 2, "log-center.source"), ":");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", log_r5.source, " ");
  }
}
function LogCenterComponent_Conditional_13_ng_template_2_Conditional_17_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 22)(1, "span", 25);
    \u0275\u0275text(2);
    \u0275\u0275pipe(3, "translate");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "span", 26);
    \u0275\u0275text(5);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const log_r5 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1("", \u0275\u0275pipeBind1(3, 2, "log-center.url"), ":");
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(log_r5.url);
  }
}
function LogCenterComponent_Conditional_13_ng_template_2_Conditional_18_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 23)(1, "details")(2, "summary");
    \u0275\u0275text(3);
    \u0275\u0275pipe(4, "translate");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "pre");
    \u0275\u0275text(6);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const log_r5 = \u0275\u0275nextContext().$implicit;
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(4, 2, "log-center.details"));
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(ctx_r1.formatData(log_r5.data));
  }
}
function LogCenterComponent_Conditional_13_ng_template_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 13)(1, "div", 14)(2, "div", 15)(3, "span", 16);
    \u0275\u0275text(4);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(5, "div", 17)(6, "span", 18);
    \u0275\u0275text(7);
    \u0275\u0275pipe(8, "translate");
    \u0275\u0275elementEnd();
    \u0275\u0275text(9);
    \u0275\u0275pipe(10, "date");
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(11, LogCenterComponent_Conditional_13_ng_template_2_Conditional_11_Template, 5, 4, "div", 19);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(12, "div", 20)(13, "span", 21);
    \u0275\u0275text(14);
    \u0275\u0275pipe(15, "translate");
    \u0275\u0275elementEnd();
    \u0275\u0275text(16);
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(17, LogCenterComponent_Conditional_13_ng_template_2_Conditional_17_Template, 6, 4, "div", 22);
    \u0275\u0275conditionalCreate(18, LogCenterComponent_Conditional_13_ng_template_2_Conditional_18_Template, 7, 4, "div", 23);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const log_r5 = ctx.$implicit;
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275classMap("log-entry--" + log_r5.level);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(ctx_r1.getLocalizedLevel(log_r5.level));
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1("", \u0275\u0275pipeBind1(8, 10, "log-center.time"), ":");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind2(10, 12, log_r5.timestamp, "shortTime"), " ");
    \u0275\u0275advance(2);
    \u0275\u0275conditional(log_r5.source ? 11 : -1);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1("", \u0275\u0275pipeBind1(15, 15, "log-center.message"), ":");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", log_r5.message, " ");
    \u0275\u0275advance();
    \u0275\u0275conditional(log_r5.url ? 17 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(log_r5.data ? 18 : -1);
  }
}
function LogCenterComponent_Conditional_13_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "lg-grouping-tiles", 8);
    \u0275\u0275template(1, LogCenterComponent_Conditional_13_ng_template_1_Template, 3, 4, "ng-template", 10)(2, LogCenterComponent_Conditional_13_ng_template_2_Template, 19, 17, "ng-template", 11);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275property("sortResult", ctx_r1.groupedLogs())("selectable", false);
  }
}
function LogCenterComponent_ng_template_15_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "lg-flex-column", 27)(1, "span");
    \u0275\u0275text(2);
    \u0275\u0275pipe(3, "translate");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "b");
    \u0275\u0275text(5);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const label_r6 = ctx.label;
    const value_r7 = ctx.value;
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(3, 2, label_r6));
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(value_r7);
  }
}
var LogCenterComponent = class _LogCenterComponent {
  paginationService = inject(PaginationService);
  logs = signal([], ...ngDevMode ? [{ debugName: "logs" }] : []);
  paginatedLogs = signal([], ...ngDevMode ? [{ debugName: "paginatedLogs" }] : []);
  groupedLogs = signal(null, ...ngDevMode ? [{ debugName: "groupedLogs" }] : []);
  stats = signal({
    total: 0,
    byLevel: { info: 0, warning: 0, error: 0, success: 0 }
  }, ...ngDevMode ? [{ debugName: "stats" }] : []);
  _logCenter = inject(LogCenterService);
  _groupSortService = inject(GroupSortService);
  _translateService = inject(TranslateService);
  ngOnInit() {
    this.loadLogs();
  }
  loadLogs() {
    const allLogs = this._logCenter.getLogs().sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
    this.logs.set(allLogs);
    this.stats.set(this._logCenter.getLogStats());
    this.paginationService.setItems(allLogs);
    this.paginationService.setItemsPerPage(10);
    this.updatePaginatedAndGroupedLogs();
  }
  async updatePaginatedAndGroupedLogs() {
    const paginatedLogs = this.paginationService.paginatedItems();
    this.paginatedLogs.set(paginatedLogs);
    const groupingStrategy = new LogsByMinuteGroupingStrategy();
    const grouped = await this._groupSortService.groupItems(
      paginatedLogs,
      groupingStrategy,
      "desc",
      // новые группы сверху
      "timestamp"
    );
    this.groupedLogs.set(grouped);
  }
  onPageChange(page) {
    this.paginationService.goToPage(page);
    this.updatePaginatedAndGroupedLogs();
  }
  clearLogs() {
    if (confirm("Are you sure you want to clear all logs?")) {
      this._logCenter.clearLogs();
      this.loadLogs();
    }
  }
  formatData(data) {
    if (typeof data === "object") {
      return JSON.stringify(data, null, 2);
    }
    return String(data);
  }
  getLocalizedLevel(level) {
    return this._translateService.instant("log-center.level." + level);
  }
  static \u0275fac = function LogCenterComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _LogCenterComponent)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _LogCenterComponent, selectors: [["lg-log-center"]], decls: 17, vars: 20, consts: [["statItemTemplate", ""], [1, "log-center"], ["size", "medium"], ["size", "small", 3, "click", "disabled"], ["size", "medium", 3, "mobileMode"], [4, "ngTemplateOutlet", "ngTemplateOutletContext"], [1, "log-center__logs"], ["position", "center", "size", "medium"], [3, "sortResult", "selectable"], [3, "pageChange", "config"], ["lgGroupingHeader", ""], ["lgGroupingTile", ""], [3, "level"], [1, "log-entry"], [1, "log-entry__header"], [1, "log-entry__level"], [1, "log-entry__level-badge"], [1, "log-entry__time"], [1, "log-entry__time-label"], [1, "log-entry__source"], [1, "log-entry__message"], [1, "log-entry__message-label"], [1, "log-entry__url"], [1, "log-entry__data"], [1, "log-entry__source-label"], [1, "log-entry__url-label"], [1, "log-entry__url-value"], ["size", "tiny"]], template: function LogCenterComponent_Template(rf, ctx) {
    if (rf & 1) {
      const _r1 = \u0275\u0275getCurrentView();
      \u0275\u0275elementStart(0, "div", 1)(1, "lg-flex-column")(2, "lg-flex-row", 2)(3, "lg-button", 3);
      \u0275\u0275listener("click", function LogCenterComponent_Template_lg_button_click_3_listener() {
        \u0275\u0275restoreView(_r1);
        return \u0275\u0275resetView(ctx.clearLogs());
      });
      \u0275\u0275text(4);
      \u0275\u0275pipe(5, "translate");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(6, "lg-flex-row", 4);
      \u0275\u0275template(7, LogCenterComponent_ng_container_7_Template, 1, 0, "ng-container", 5)(8, LogCenterComponent_ng_container_8_Template, 1, 0, "ng-container", 5)(9, LogCenterComponent_ng_container_9_Template, 1, 0, "ng-container", 5);
      \u0275\u0275conditionalCreate(10, LogCenterComponent_Conditional_10_Template, 1, 4, "ng-container");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(11, "div", 6);
      \u0275\u0275conditionalCreate(12, LogCenterComponent_Conditional_12_Template, 4, 3, "lg-flex-column", 7)(13, LogCenterComponent_Conditional_13_Template, 3, 2, "lg-grouping-tiles", 8);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(14, "lg-pagination", 9);
      \u0275\u0275listener("pageChange", function LogCenterComponent_Template_lg_pagination_pageChange_14_listener($event) {
        \u0275\u0275restoreView(_r1);
        return \u0275\u0275resetView(ctx.onPageChange($event));
      });
      \u0275\u0275elementEnd()()();
      \u0275\u0275template(15, LogCenterComponent_ng_template_15_Template, 6, 4, "ng-template", null, 0, \u0275\u0275templateRefExtractor);
    }
    if (rf & 2) {
      let tmp_11_0;
      const statItemTemplate_r3 = \u0275\u0275reference(16);
      \u0275\u0275advance(3);
      \u0275\u0275property("disabled", ctx.stats().total === 0);
      \u0275\u0275advance();
      \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind1(5, 12, "log-center.clear-all"), " ");
      \u0275\u0275advance(2);
      \u0275\u0275property("mobileMode", true);
      \u0275\u0275advance();
      \u0275\u0275property("ngTemplateOutlet", statItemTemplate_r3)("ngTemplateOutletContext", \u0275\u0275pureFunction1(14, _c0, ctx.stats().total));
      \u0275\u0275advance();
      \u0275\u0275property("ngTemplateOutlet", statItemTemplate_r3)("ngTemplateOutletContext", \u0275\u0275pureFunction1(16, _c1, ctx.stats().byLevel.error));
      \u0275\u0275advance();
      \u0275\u0275property("ngTemplateOutlet", statItemTemplate_r3)("ngTemplateOutletContext", \u0275\u0275pureFunction1(18, _c2, ctx.stats().byLevel.warning));
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.paginationService.totalPages() > 1 ? 10 : -1);
      \u0275\u0275advance(2);
      \u0275\u0275conditional(((tmp_11_0 = ctx.groupedLogs()) == null ? null : tmp_11_0.groups == null ? null : tmp_11_0.groups.length) === 0 ? 12 : 13);
      \u0275\u0275advance(2);
      \u0275\u0275property("config", ctx.paginationService.config());
    }
  }, dependencies: [
    CommonModule,
    NgTemplateOutlet,
    ButtonComponent,
    GroupingTilesComponent,
    GroupingTileDirective,
    GroupingHeaderDirective,
    TitleComponent,
    PaginationComponent,
    FlexColumnComponent,
    FlexRowComponent,
    DatePipe,
    TranslatePipe,
    TimeAgoPipe
  ], styles: ["\n\n.log-center[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: var(--spacing-md);\n  overflow: hidden;\n}\n.log-center__header[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  flex-wrap: wrap;\n  gap: var(--spacing-md);\n}\n.log-center__stat[_ngcontent-%COMP%] {\n  font-size: var(--font-size-sm);\n}\n.log-center__stat--error[_ngcontent-%COMP%] {\n  color: var(--color-error);\n  font-weight: bold;\n}\n.log-center__stat--warning[_ngcontent-%COMP%] {\n  color: var(--color-warning);\n  font-weight: bold;\n}\n.log-center__stat--info[_ngcontent-%COMP%] {\n  color: var(--color-info);\n  font-weight: bold;\n}\n.log-center__actions[_ngcontent-%COMP%] {\n  margin-top: var(--spacing-md);\n  padding-top: var(--spacing-md);\n  border-top: 1px solid var(--color-border);\n}\n.log-center__logs[_ngcontent-%COMP%] {\n  overflow-y: auto;\n}\n.log-center__empty[_ngcontent-%COMP%] {\n  text-align: center;\n  padding: var(--spacing-xl);\n  color: var(--color-text-muted);\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  gap: var(--spacing-md);\n}\n.log-center__empty-icon[_ngcontent-%COMP%] {\n  font-size: 3rem;\n  opacity: 0.5;\n}\n.log-center__empty-title[_ngcontent-%COMP%] {\n  font-size: var(--font-size-lg);\n  font-weight: bold;\n  color: var(--color-text-muted);\n}\n.log-center__empty-subtitle[_ngcontent-%COMP%] {\n  font-size: var(--font-size-sm);\n  color: var(--color-text-muted);\n  opacity: 0.8;\n}\n.log-entry[_ngcontent-%COMP%] {\n  border: 1px solid var(--color-border);\n  border-radius: var(--border-radius);\n  padding: var(--spacing-md);\n  background: var(--color-background);\n  margin-bottom: var(--spacing-sm);\n}\n.log-entry--error[_ngcontent-%COMP%] {\n  border-left: 4px solid var(--color-error);\n}\n.log-entry--warning[_ngcontent-%COMP%] {\n  border-left: 4px solid var(--color-warning);\n}\n.log-entry--info[_ngcontent-%COMP%] {\n  border-left: 4px solid var(--color-info);\n}\n.log-entry--success[_ngcontent-%COMP%] {\n  border-left: 4px solid var(--color-success);\n}\n.log-entry__header[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: var(--spacing-md);\n  margin-bottom: var(--spacing-sm);\n  flex-wrap: wrap;\n}\n.log-entry__level[_ngcontent-%COMP%] {\n  flex-shrink: 0;\n}\n.log-entry__level-badge[_ngcontent-%COMP%] {\n  padding: var(--spacing-xs) var(--spacing-sm);\n  border-radius: var(--border-radius-sm);\n  font-size: var(--font-size-xs);\n  font-weight: bold;\n  text-transform: uppercase;\n}\n.log-entry--error[_ngcontent-%COMP%]   .log-entry__level-badge[_ngcontent-%COMP%] {\n  background: var(--color-error, #ff4d4d);\n  color: white;\n}\n.log-entry--warning[_ngcontent-%COMP%]   .log-entry__level-badge[_ngcontent-%COMP%] {\n  background: var(--color-warning, #ffcc00);\n  color: white;\n}\n.log-entry--info[_ngcontent-%COMP%]   .log-entry__level-badge[_ngcontent-%COMP%] {\n  background: var(--color-info, #007bff);\n  color: white;\n}\n.log-entry--success[_ngcontent-%COMP%]   .log-entry__level-badge[_ngcontent-%COMP%] {\n  background: var(--color-success, #28a745);\n  color: white;\n}\n.log-entry__time[_ngcontent-%COMP%] {\n  color: var(--color-text-muted);\n  font-size: var(--font-size-sm);\n  display: flex;\n  align-items: center;\n  gap: var(--spacing-xs);\n}\n.log-entry__time-label[_ngcontent-%COMP%] {\n  font-weight: bold;\n  color: var(--color-text-muted);\n}\n.log-entry__source[_ngcontent-%COMP%] {\n  color: var(--color-text-muted);\n  font-size: var(--font-size-sm);\n  font-style: italic;\n  display: flex;\n  align-items: center;\n  gap: var(--spacing-xs);\n}\n.log-entry__source-label[_ngcontent-%COMP%] {\n  font-weight: bold;\n  color: var(--color-text-muted);\n}\n.log-entry__message[_ngcontent-%COMP%] {\n  margin-bottom: var(--spacing-sm);\n  word-break: break-word;\n  display: flex;\n  align-items: flex-start;\n  gap: var(--spacing-xs);\n}\n.log-entry__message-label[_ngcontent-%COMP%] {\n  font-weight: bold;\n  color: var(--color-text-muted);\n  flex-shrink: 0;\n  margin-top: 2px;\n}\n.log-entry__url[_ngcontent-%COMP%] {\n  margin-bottom: var(--spacing-sm);\n  font-size: var(--font-size-sm);\n}\n.log-entry__url-label[_ngcontent-%COMP%] {\n  color: var(--color-text-muted);\n  margin-right: var(--spacing-xs);\n}\n.log-entry__url-value[_ngcontent-%COMP%] {\n  color: var(--color-primary);\n  word-break: break-all;\n}\n.log-entry__data[_ngcontent-%COMP%] {\n  margin-top: var(--spacing-sm);\n}\n.log-entry__data[_ngcontent-%COMP%]   details[_ngcontent-%COMP%] {\n  border: 1px solid var(--color-border);\n  border-radius: var(--border-radius-sm);\n  padding: var(--spacing-sm);\n}\n.log-entry__data[_ngcontent-%COMP%]   summary[_ngcontent-%COMP%] {\n  cursor: pointer;\n  color: var(--color-primary);\n  font-weight: bold;\n  margin-bottom: var(--spacing-sm);\n}\n.log-entry__data[_ngcontent-%COMP%]   pre[_ngcontent-%COMP%] {\n  background: var(--color-background-secondary);\n  padding: var(--spacing-sm);\n  border-radius: var(--border-radius-sm);\n  overflow-x: auto;\n  font-size: var(--font-size-sm);\n  white-space: pre-wrap;\n  word-break: break-word;\n}\n@media (max-width: 768px) {\n  .log-center__header[_ngcontent-%COMP%] {\n    flex-direction: column;\n    align-items: flex-start;\n  }\n  .log-center__stats[_ngcontent-%COMP%] {\n    gap: var(--spacing-md);\n  }\n  .log-entry__header[_ngcontent-%COMP%] {\n    flex-direction: column;\n    align-items: flex-start;\n    gap: var(--spacing-sm);\n  }\n}\n/*# sourceMappingURL=log-center.component.css.map */"] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(LogCenterComponent, [{
    type: Component,
    args: [{ selector: "lg-log-center", standalone: true, imports: [
      CommonModule,
      ButtonComponent,
      TranslatePipe,
      GroupingTilesComponent,
      GroupingTileDirective,
      GroupingHeaderDirective,
      TitleComponent,
      PaginationComponent,
      TimeAgoPipe,
      FlexColumnComponent,
      FlexRowComponent
    ], template: `
    <div class="log-center">
      <lg-flex-column>
        <lg-flex-row size="medium">
          <lg-button
            (click)="clearLogs()"
            [disabled]="stats().total === 0"
            size="small">
            {{ 'log-center.clear-all' | translate }}
          </lg-button>
        </lg-flex-row>

        <lg-flex-row [mobileMode]="true" size="medium">
          <ng-container *ngTemplateOutlet="statItemTemplate; context: {
          label: 'log-center.total',
          value: stats().total,
          type: 'default'
        }"></ng-container>
          <ng-container *ngTemplateOutlet="statItemTemplate; context: {
          label: 'log-center.errors',
          value: stats().byLevel.error,
          type: 'error'
        }"></ng-container>
          <ng-container *ngTemplateOutlet="statItemTemplate; context: {
          label: 'log-center.warnings',
          value: stats().byLevel.warning,
          type: 'warning'
        }"></ng-container>
          @if (paginationService.totalPages() > 1) {
            <ng-container *ngTemplateOutlet="statItemTemplate; context: {
            label: 'log-center.logs',
            value: paginationService.getRangeInfo().start + '-' + paginationService.getRangeInfo().end + ' / ' + paginationService.totalItems(),
            type: 'info'
          }"></ng-container>
          }
        </lg-flex-row>

        <div class="log-center__logs">
          @if (groupedLogs()?.groups?.length === 0) {
            <lg-flex-column position="center"
                            size="medium">
              <span> {{ 'log-center.no-logs-subtitle' | translate }}</span>
            </lg-flex-column>
          } @else {
            <lg-grouping-tiles [sortResult]="groupedLogs()" [selectable]="false">
              <ng-template lgGroupingHeader let-field>
                <lg-title [level]="3">
                  {{ field|timeAgo }}
                </lg-title>
              </ng-template>

              <ng-template lgGroupingTile let-log>
                <div class="log-entry" [class]="'log-entry--' + log.level">
                  <div class="log-entry__header">
                    <div class="log-entry__level">
                      <span class="log-entry__level-badge">{{ getLocalizedLevel(log.level) }}</span>
                    </div>
                    <div class="log-entry__time">
                      <span class="log-entry__time-label">{{ 'log-center.time' | translate }}:</span>
                      {{ log.timestamp | date:'shortTime' }}
                    </div>
                    @if (log.source) {
                      <div class="log-entry__source">
                        <span class="log-entry__source-label">{{ 'log-center.source' | translate }}:</span>
                        {{ log.source }}
                      </div>
                    }
                  </div>
                  <div class="log-entry__message">
                    <span class="log-entry__message-label">{{ 'log-center.message' | translate }}:</span>
                    {{ log.message }}
                  </div>
                  @if (log.url) {
                    <div class="log-entry__url">
                      <span class="log-entry__url-label">{{ 'log-center.url' | translate }}:</span>
                      <span class="log-entry__url-value">{{ log.url }}</span>
                    </div>
                  }
                  @if (log.data) {
                    <div class="log-entry__data">
                      <details>
                        <summary>{{ 'log-center.details' | translate }}</summary>
                        <pre>{{ formatData(log.data) }}</pre>
                      </details>
                    </div>
                  }
                </div>
              </ng-template>
            </lg-grouping-tiles>
          }
        </div>

        <lg-pagination
          (pageChange)="onPageChange($event)"
          [config]="paginationService.config()">
        </lg-pagination>
      </lg-flex-column>
    </div>
    <!-- Stat Item Template -->
    <ng-template #statItemTemplate let-label="label" let-type="type" let-value="value">
      <lg-flex-column size="tiny">
        <span>{{ label | translate }}</span>
        <b>{{ value }}</b>
      </lg-flex-column>
    </ng-template>
  `, styles: ["/* angular:styles/component:scss;6c7832472bd2a1d240b02c4afcd1de1951a29f430ee70f840d61076a2fe8818d;/Users/khripunovpavel/Documents/my/lasagna/lasagna/src/app/features/settings/view/log-center/log-center.component.ts */\n.log-center {\n  display: flex;\n  flex-direction: column;\n  gap: var(--spacing-md);\n  overflow: hidden;\n}\n.log-center__header {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  flex-wrap: wrap;\n  gap: var(--spacing-md);\n}\n.log-center__stat {\n  font-size: var(--font-size-sm);\n}\n.log-center__stat--error {\n  color: var(--color-error);\n  font-weight: bold;\n}\n.log-center__stat--warning {\n  color: var(--color-warning);\n  font-weight: bold;\n}\n.log-center__stat--info {\n  color: var(--color-info);\n  font-weight: bold;\n}\n.log-center__actions {\n  margin-top: var(--spacing-md);\n  padding-top: var(--spacing-md);\n  border-top: 1px solid var(--color-border);\n}\n.log-center__logs {\n  overflow-y: auto;\n}\n.log-center__empty {\n  text-align: center;\n  padding: var(--spacing-xl);\n  color: var(--color-text-muted);\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  gap: var(--spacing-md);\n}\n.log-center__empty-icon {\n  font-size: 3rem;\n  opacity: 0.5;\n}\n.log-center__empty-title {\n  font-size: var(--font-size-lg);\n  font-weight: bold;\n  color: var(--color-text-muted);\n}\n.log-center__empty-subtitle {\n  font-size: var(--font-size-sm);\n  color: var(--color-text-muted);\n  opacity: 0.8;\n}\n.log-entry {\n  border: 1px solid var(--color-border);\n  border-radius: var(--border-radius);\n  padding: var(--spacing-md);\n  background: var(--color-background);\n  margin-bottom: var(--spacing-sm);\n}\n.log-entry--error {\n  border-left: 4px solid var(--color-error);\n}\n.log-entry--warning {\n  border-left: 4px solid var(--color-warning);\n}\n.log-entry--info {\n  border-left: 4px solid var(--color-info);\n}\n.log-entry--success {\n  border-left: 4px solid var(--color-success);\n}\n.log-entry__header {\n  display: flex;\n  align-items: center;\n  gap: var(--spacing-md);\n  margin-bottom: var(--spacing-sm);\n  flex-wrap: wrap;\n}\n.log-entry__level {\n  flex-shrink: 0;\n}\n.log-entry__level-badge {\n  padding: var(--spacing-xs) var(--spacing-sm);\n  border-radius: var(--border-radius-sm);\n  font-size: var(--font-size-xs);\n  font-weight: bold;\n  text-transform: uppercase;\n}\n.log-entry--error .log-entry__level-badge {\n  background: var(--color-error, #ff4d4d);\n  color: white;\n}\n.log-entry--warning .log-entry__level-badge {\n  background: var(--color-warning, #ffcc00);\n  color: white;\n}\n.log-entry--info .log-entry__level-badge {\n  background: var(--color-info, #007bff);\n  color: white;\n}\n.log-entry--success .log-entry__level-badge {\n  background: var(--color-success, #28a745);\n  color: white;\n}\n.log-entry__time {\n  color: var(--color-text-muted);\n  font-size: var(--font-size-sm);\n  display: flex;\n  align-items: center;\n  gap: var(--spacing-xs);\n}\n.log-entry__time-label {\n  font-weight: bold;\n  color: var(--color-text-muted);\n}\n.log-entry__source {\n  color: var(--color-text-muted);\n  font-size: var(--font-size-sm);\n  font-style: italic;\n  display: flex;\n  align-items: center;\n  gap: var(--spacing-xs);\n}\n.log-entry__source-label {\n  font-weight: bold;\n  color: var(--color-text-muted);\n}\n.log-entry__message {\n  margin-bottom: var(--spacing-sm);\n  word-break: break-word;\n  display: flex;\n  align-items: flex-start;\n  gap: var(--spacing-xs);\n}\n.log-entry__message-label {\n  font-weight: bold;\n  color: var(--color-text-muted);\n  flex-shrink: 0;\n  margin-top: 2px;\n}\n.log-entry__url {\n  margin-bottom: var(--spacing-sm);\n  font-size: var(--font-size-sm);\n}\n.log-entry__url-label {\n  color: var(--color-text-muted);\n  margin-right: var(--spacing-xs);\n}\n.log-entry__url-value {\n  color: var(--color-primary);\n  word-break: break-all;\n}\n.log-entry__data {\n  margin-top: var(--spacing-sm);\n}\n.log-entry__data details {\n  border: 1px solid var(--color-border);\n  border-radius: var(--border-radius-sm);\n  padding: var(--spacing-sm);\n}\n.log-entry__data summary {\n  cursor: pointer;\n  color: var(--color-primary);\n  font-weight: bold;\n  margin-bottom: var(--spacing-sm);\n}\n.log-entry__data pre {\n  background: var(--color-background-secondary);\n  padding: var(--spacing-sm);\n  border-radius: var(--border-radius-sm);\n  overflow-x: auto;\n  font-size: var(--font-size-sm);\n  white-space: pre-wrap;\n  word-break: break-word;\n}\n@media (max-width: 768px) {\n  .log-center__header {\n    flex-direction: column;\n    align-items: flex-start;\n  }\n  .log-center__stats {\n    gap: var(--spacing-md);\n  }\n  .log-entry__header {\n    flex-direction: column;\n    align-items: flex-start;\n    gap: var(--spacing-sm);\n  }\n}\n/*# sourceMappingURL=log-center.component.css.map */\n"] }]
  }], null, null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(LogCenterComponent, { className: "LogCenterComponent", filePath: "src/app/features/settings/view/log-center/log-center.component.ts", lineNumber: 381 });
})();

// src/app/features/settings/view/log-center/log-center-page.component.ts
var LogCenterPageComponent = class _LogCenterPageComponent {
  static \u0275fac = function LogCenterPageComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _LogCenterPageComponent)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _LogCenterPageComponent, selectors: [["lg-log-center-page"]], decls: 1, vars: 0, template: function LogCenterPageComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275element(0, "lg-log-center");
    }
  }, dependencies: [LogCenterComponent], encapsulation: 2 });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(LogCenterPageComponent, [{
    type: Component,
    args: [{
      selector: "lg-log-center-page",
      standalone: true,
      imports: [LogCenterComponent],
      template: `
    <lg-log-center></lg-log-center>
  `
    }]
  }], null, null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(LogCenterPageComponent, { className: "LogCenterPageComponent", filePath: "src/app/features/settings/view/log-center/log-center-page.component.ts", lineNumber: 12 });
})();
export {
  LogCenterPageComponent
};
//# sourceMappingURL=chunk-3F6VNZV7.js.map
