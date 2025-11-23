import {
  DropdownComponent
} from "./chunk-5TLZ2DWD.js";
import {
  FlexRowComponent
} from "./chunk-VVGY6OUS.js";
import {
  injectQueryParams
} from "./chunk-PHCOZAXM.js";
import "./chunk-AWZMWU52.js";
import {
  ButtonComponent
} from "./chunk-MP6JNYP6.js";
import {
  FlexColumnComponent
} from "./chunk-K37ECZYU.js";
import {
  WINDOW
} from "./chunk-CFXQGSQM.js";
import {
  TranslatePipe,
  TranslateService
} from "./chunk-755Q3QHA.js";
import {
  ActivatedRoute,
  Router
} from "./chunk-L34DFTMV.js";
import "./chunk-USF337CA.js";
import "./chunk-VVQKNBNV.js";
import "./chunk-X2X7GTPW.js";
import {
  Component,
  ContentChild,
  Directive,
  EventEmitter,
  Output,
  TemplateRef,
  effect,
  inject,
  setClassMetadata,
  signal,
  ɵsetClassDebugInfo,
  ɵɵadvance,
  ɵɵcontentQuery,
  ɵɵdefineComponent,
  ɵɵdefineDirective,
  ɵɵdirectiveInject,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵlistener,
  ɵɵloadQuery,
  ɵɵpipe,
  ɵɵpipeBind1,
  ɵɵproperty,
  ɵɵqueryRefresh,
  ɵɵstyleMap,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1
} from "./chunk-IYCVPBRB.js";
import "./chunk-46DXP6YY.js";

// src/app/shared/view/ui/grouping-sorting/grouping-sorting.directive.ts
var GroupingSortingContainerComponent = class _GroupingSortingContainerComponent {
  templateRef;
  constructor(templateRef) {
    this.templateRef = templateRef;
  }
  static \u0275fac = function GroupingSortingContainerComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _GroupingSortingContainerComponent)(\u0275\u0275directiveInject(TemplateRef));
  };
  static \u0275dir = /* @__PURE__ */ \u0275\u0275defineDirective({ type: _GroupingSortingContainerComponent, selectors: [["", "lgGroupingSortingContainer", ""]] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(GroupingSortingContainerComponent, [{
    type: Directive,
    args: [{
      selector: "[lgGroupingSortingContainer]",
      standalone: true
    }]
  }], () => [{ type: TemplateRef }], null);
})();

// src/app/shared/view/ui/grouping-sorting/grouping-sorting.component.ts
var GroupingSortingComponent = class _GroupingSortingComponent {
  translateService;
  constructor(translateService) {
    this.translateService = translateService;
  }
  groupingToLabel = {
    category: "grouping.by-category",
    tag: "grouping.by-tag",
    createdAt: "grouping.by-creation-date",
    alphabetical: "grouping.by-first-letter"
  };
  groupingDirectionToLabel = {
    asc: "grouping.direction.asc",
    desc: "grouping.direction.desc"
  };
  router = inject(Router);
  aRouter = inject(ActivatedRoute);
  context;
  sortChange = new EventEmitter();
  groupChange = new EventEmitter();
  groupingParam = injectQueryParams("groupBy");
  sortDirection = injectQueryParams("sortDirection");
  sortField = injectQueryParams("sortField");
  defaultDirection = "asc";
  sorting = signal({ field: "name", direction: this.defaultDirection, group: "category" }, ...ngDevMode ? [{ debugName: "sorting" }] : []);
  sortingEffect = effect(() => {
    const sort = this.sorting();
    this.sortChange.emit(sort);
  }, ...ngDevMode ? [{ debugName: "sortingEffect" }] : []);
  _window = inject(WINDOW);
  ngOnInit() {
    const params = this.aRouter.snapshot.queryParams;
    const groupBy = this.groupingParam();
    const sortDirection = this.sortDirection();
    const sortField = this.sortField();
    this.sorting.set({
      field: sortField?.toString() || "name",
      direction: sortDirection ? sortDirection === "asc" ? "asc" : "desc" : this.defaultDirection,
      group: groupBy?.toString() || "category"
    });
  }
  onSortChange(props) {
    this.sorting.set({
      field: props.field || this.sorting().field,
      direction: props.direction || this.sorting().direction,
      group: props.group || this.sorting().group
    });
    this.sortChange.emit(this.sorting());
    this.router.navigate([], {
      queryParams: {
        sortField: props.field || this.sorting().field,
        sortDirection: props.direction || this.sorting().direction,
        groupBy: props.group || this.sorting().group
      },
      relativeTo: this.aRouter,
      queryParamsHandling: "merge"
    }).then(() => {
      this._window?.location.reload();
    });
  }
  getGroupingLabel(group) {
    const key = this.groupingToLabel[group];
    return key ? this.translateService.instant(key) : group;
  }
  getGroupingDirectionLabel(direction) {
    const key = this.groupingDirectionToLabel[direction];
    return key ? this.translateService.instant(key) : direction;
  }
  static \u0275fac = function GroupingSortingComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _GroupingSortingComponent)(\u0275\u0275directiveInject(TranslateService));
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _GroupingSortingComponent, selectors: [["lg-grouping-sorting"]], contentQueries: function GroupingSortingComponent_ContentQueries(rf, ctx, dirIndex) {
    if (rf & 1) {
      \u0275\u0275contentQuery(dirIndex, GroupingSortingContainerComponent, 5);
    }
    if (rf & 2) {
      let _t;
      \u0275\u0275queryRefresh(_t = \u0275\u0275loadQuery()) && (ctx.context = _t.first);
    }
  }, outputs: { sortChange: "sortChange", groupChange: "groupChange" }, decls: 33, vars: 61, consts: [["size", "medium", 3, "mobileMode"], ["lgDropdownAnchor", "", 3, "outlined", "size"], [3, "size"], [3, "click", "flat", "size"]], template: function GroupingSortingComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "lg-flex-row", 0)(1, "lg-dropdown")(2, "lg-button", 1);
      \u0275\u0275text(3);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(4, "lg-flex-column", 2)(5, "span");
      \u0275\u0275text(6);
      \u0275\u0275pipe(7, "translate");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(8, "lg-button", 3);
      \u0275\u0275listener("click", function GroupingSortingComponent_Template_lg_button_click_8_listener() {
        return ctx.onSortChange({ group: "category" });
      });
      \u0275\u0275text(9);
      \u0275\u0275pipe(10, "translate");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(11, "lg-button", 3);
      \u0275\u0275listener("click", function GroupingSortingComponent_Template_lg_button_click_11_listener() {
        return ctx.onSortChange({ group: "tag" });
      });
      \u0275\u0275text(12);
      \u0275\u0275pipe(13, "translate");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(14, "lg-button", 3);
      \u0275\u0275listener("click", function GroupingSortingComponent_Template_lg_button_click_14_listener() {
        return ctx.onSortChange({ group: "createdAt" });
      });
      \u0275\u0275text(15);
      \u0275\u0275pipe(16, "translate");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(17, "lg-button", 3);
      \u0275\u0275listener("click", function GroupingSortingComponent_Template_lg_button_click_17_listener() {
        return ctx.onSortChange({ group: "alphabetical" });
      });
      \u0275\u0275text(18);
      \u0275\u0275pipe(19, "translate");
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(20, "lg-dropdown")(21, "lg-button", 1);
      \u0275\u0275text(22);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(23, "lg-flex-column", 2)(24, "span");
      \u0275\u0275text(25);
      \u0275\u0275pipe(26, "translate");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(27, "lg-button", 3);
      \u0275\u0275listener("click", function GroupingSortingComponent_Template_lg_button_click_27_listener() {
        return ctx.onSortChange({ direction: "asc" });
      });
      \u0275\u0275text(28);
      \u0275\u0275pipe(29, "translate");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(30, "lg-button", 3);
      \u0275\u0275listener("click", function GroupingSortingComponent_Template_lg_button_click_30_listener() {
        return ctx.onSortChange({ direction: "desc" });
      });
      \u0275\u0275text(31);
      \u0275\u0275pipe(32, "translate");
      \u0275\u0275elementEnd()()()();
    }
    if (rf & 2) {
      \u0275\u0275property("mobileMode", true);
      \u0275\u0275advance(2);
      \u0275\u0275styleMap("primary");
      \u0275\u0275property("outlined", true)("size", "small");
      \u0275\u0275advance();
      \u0275\u0275textInterpolate1(" ", ctx.getGroupingLabel(ctx.sorting().group), " ");
      \u0275\u0275advance();
      \u0275\u0275property("size", "small");
      \u0275\u0275advance(2);
      \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(7, 45, "grouping.title"));
      \u0275\u0275advance(2);
      \u0275\u0275styleMap("warning");
      \u0275\u0275property("flat", true)("size", "small");
      \u0275\u0275advance();
      \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind1(10, 47, ctx.groupingToLabel["category"]), " ");
      \u0275\u0275advance(2);
      \u0275\u0275styleMap("warning");
      \u0275\u0275property("flat", true)("size", "small");
      \u0275\u0275advance();
      \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind1(13, 49, ctx.groupingToLabel["tag"]), " ");
      \u0275\u0275advance(2);
      \u0275\u0275styleMap("warning");
      \u0275\u0275property("flat", true)("size", "small");
      \u0275\u0275advance();
      \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind1(16, 51, ctx.groupingToLabel["createdAt"]), " ");
      \u0275\u0275advance(2);
      \u0275\u0275styleMap("warning");
      \u0275\u0275property("flat", true)("size", "small");
      \u0275\u0275advance();
      \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind1(19, 53, ctx.groupingToLabel["alphabetical"]), " ");
      \u0275\u0275advance(3);
      \u0275\u0275styleMap("primary");
      \u0275\u0275property("outlined", true)("size", "small");
      \u0275\u0275advance();
      \u0275\u0275textInterpolate1(" ", ctx.getGroupingDirectionLabel(ctx.sorting().direction), " ");
      \u0275\u0275advance();
      \u0275\u0275property("size", "small");
      \u0275\u0275advance(2);
      \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(26, 55, "grouping.direction.title"));
      \u0275\u0275advance(2);
      \u0275\u0275styleMap("warning");
      \u0275\u0275property("flat", true)("size", "small");
      \u0275\u0275advance();
      \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind1(29, 57, ctx.groupingDirectionToLabel["asc"]), " ");
      \u0275\u0275advance(2);
      \u0275\u0275styleMap("warning");
      \u0275\u0275property("flat", true)("size", "small");
      \u0275\u0275advance();
      \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind1(32, 59, ctx.groupingDirectionToLabel["desc"]), " ");
    }
  }, dependencies: [
    FlexRowComponent,
    ButtonComponent,
    DropdownComponent,
    FlexColumnComponent,
    TranslatePipe
  ], encapsulation: 2 });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(GroupingSortingComponent, [{
    type: Component,
    args: [{
      selector: "lg-grouping-sorting",
      standalone: true,
      imports: [
        FlexRowComponent,
        ButtonComponent,
        DropdownComponent,
        FlexColumnComponent,
        TranslatePipe
      ],
      template: `
    <lg-flex-row [mobileMode]="true"
                 size="medium">
      <lg-dropdown>
        <lg-button [outlined]="true"
                   [size]="'small'"
                   [style]="'primary'"
                   lgDropdownAnchor>
          {{ getGroupingLabel(sorting().group) }}
        </lg-button>

        <lg-flex-column [size]="'small'">
          <span>{{ 'grouping.title' | translate }}</span>

          <lg-button (click)="onSortChange({group: 'category'})"
                     [flat]="true"
                     [size]="'small'"
                     [style]="'warning'">
            {{ groupingToLabel['category']  | translate }}
          </lg-button>

          <lg-button (click)="onSortChange({group: 'tag'})"
                     [flat]="true"
                     [size]="'small'"
                     [style]="'warning'">
            {{ groupingToLabel['tag']  | translate }}
          </lg-button>

          <lg-button (click)="onSortChange({group: 'createdAt'})"
                     [flat]="true"
                     [size]="'small'"
                     [style]="'warning'">
            {{ groupingToLabel['createdAt'] | translate }}
          </lg-button>

          <lg-button (click)="onSortChange({group: 'alphabetical'})"
                     [flat]="true"
                     [size]="'small'"
                     [style]="'warning'">
            {{ groupingToLabel['alphabetical'] | translate }}
          </lg-button>
        </lg-flex-column>
      </lg-dropdown>

      <!--      <lg-dropdown>-->
      <!--        <lg-button [size]="'small'" lgDropdownAnchor>-->
      <!--          Sort by: {{ sorting().field }}-->
      <!--        </lg-button>-->

      <!--        <lg-gap-column [size]="'small'">-->
      <!--          <lg-button [size]="'small'"-->
      <!--                     (click)="onSortChange({field: 'name'})"-->
      <!--                     [style]="'warning'"-->
      <!--                     [flat]="true">-->
      <!--            Name-->
      <!--          </lg-button>-->

      <!--          <lg-button [size]="'small'"-->
      <!--                     (click)="onSortChange({field: 'createdAt'})"-->
      <!--                     [style]="'warning'"-->
      <!--                     [flat]="true">-->
      <!--            Date-->
      <!--          </lg-button>-->
      <!--        </lg-gap-column>-->
      <!--      </lg-dropdown>-->

      <lg-dropdown>
        <lg-button [outlined]="true"
                   [size]="'small'"
                   [style]="'primary'"
                   lgDropdownAnchor>
          {{ getGroupingDirectionLabel(sorting().direction) }}
        </lg-button>

        <lg-flex-column [size]="'small'">
          <span>{{ 'grouping.direction.title' | translate }}</span>

          <lg-button (click)="onSortChange({direction: 'asc'})"
                     [flat]="true"
                     [size]="'small'"
                     [style]="'warning'">
            {{ groupingDirectionToLabel['asc'] | translate }}
          </lg-button>

          <lg-button (click)="onSortChange({direction: 'desc'})"
                     [flat]="true"
                     [size]="'small'"
                     [style]="'warning'">
            {{ groupingDirectionToLabel['desc']  | translate }}
          </lg-button>
        </lg-flex-column>
      </lg-dropdown>
    </lg-flex-row>
  `
    }]
  }], () => [{ type: TranslateService }], { context: [{
    type: ContentChild,
    args: [GroupingSortingContainerComponent]
  }], sortChange: [{
    type: Output
  }], groupChange: [{
    type: Output
  }] });
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(GroupingSortingComponent, { className: "GroupingSortingComponent", filePath: "src/app/shared/view/ui/grouping-sorting/grouping-sorting.component.ts", lineNumber: 117 });
})();
export {
  GroupingSortingComponent
};
//# sourceMappingURL=chunk-3OLWD6EL.js.map
