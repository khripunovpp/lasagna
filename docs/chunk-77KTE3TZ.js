import {
  DropdownComponent
} from "./chunk-5TLZ2DWD.js";
import {
  FlexRowComponent
} from "./chunk-VVGY6OUS.js";
import "./chunk-XIU3WVPC.js";
import "./chunk-T5CRNY7R.js";
import "./chunk-IWOUTMKL.js";
import {
  injectQueryParams
} from "./chunk-PHCOZAXM.js";
import "./chunk-AWZMWU52.js";
import "./chunk-5WJUMO7X.js";
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
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  setClassMetadata,
  signal,
  ɵsetClassDebugInfo,
  ɵɵadvance,
  ɵɵdefineComponent,
  ɵɵdirectiveInject,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵlistener,
  ɵɵpipe,
  ɵɵpipeBind1,
  ɵɵproperty,
  ɵɵstyleMap,
  ɵɵtext,
  ɵɵtextInterpolate1
} from "./chunk-IYCVPBRB.js";
import "./chunk-46DXP6YY.js";

// src/app/features/recipes/view/list/recipes-filters.component.ts
var RecipesFiltersComponent = class _RecipesFiltersComponent {
  translateService;
  constructor(translateService) {
    this.translateService = translateService;
  }
  router = inject(Router);
  aRouter = inject(ActivatedRoute);
  filterValue = injectQueryParams("filterValue");
  filterField = injectQueryParams("filterField");
  filters = signal({}, ...ngDevMode ? [{ debugName: "filters" }] : []);
  filterLabel = computed(() => {
    if (this.filters().field === "master") {
      if (this.filters().value === "true") {
        return this.translateService.instant("recipes.filters.master");
      } else if (this.filters().value === "false") {
        return this.translateService.instant("recipes.filters.chunk");
      }
    }
    return this.translateService.instant("recipes.filters.all");
  }, ...ngDevMode ? [{ debugName: "filterLabel" }] : []);
  _window = inject(WINDOW);
  ngOnInit() {
    const value = this.filterValue();
    const field = this.filterField();
    this.filters.set({
      field: field?.toString() || void 0,
      value: value?.toString() || void 0
    });
  }
  onFilterChange(props) {
    this.router.navigate([], {
      queryParams: {
        filterField: props.field,
        filterValue: props.value
      },
      relativeTo: this.aRouter,
      queryParamsHandling: "merge"
    }).then(() => {
      this._window?.location.reload();
    });
  }
  static \u0275fac = function RecipesFiltersComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _RecipesFiltersComponent)(\u0275\u0275directiveInject(TranslateService));
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _RecipesFiltersComponent, selectors: [["lg-recipes-filters"]], decls: 14, vars: 28, consts: [["size", "medium", 3, "mobileMode"], ["lgDropdownAnchor", "", 3, "outlined", "size"], [3, "size"], [3, "click", "flat", "size"]], template: function RecipesFiltersComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "lg-flex-row", 0)(1, "lg-dropdown")(2, "lg-button", 1);
      \u0275\u0275text(3);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(4, "lg-flex-column", 2)(5, "lg-button", 3);
      \u0275\u0275listener("click", function RecipesFiltersComponent_Template_lg_button_click_5_listener() {
        return ctx.onFilterChange({ field: "master", value: "true" });
      });
      \u0275\u0275text(6);
      \u0275\u0275pipe(7, "translate");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(8, "lg-button", 3);
      \u0275\u0275listener("click", function RecipesFiltersComponent_Template_lg_button_click_8_listener() {
        return ctx.onFilterChange({ field: "master", value: "false" });
      });
      \u0275\u0275text(9);
      \u0275\u0275pipe(10, "translate");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(11, "lg-button", 3);
      \u0275\u0275listener("click", function RecipesFiltersComponent_Template_lg_button_click_11_listener() {
        return ctx.onFilterChange({ field: void 0, value: void 0 });
      });
      \u0275\u0275text(12);
      \u0275\u0275pipe(13, "translate");
      \u0275\u0275elementEnd()()()();
    }
    if (rf & 2) {
      \u0275\u0275property("mobileMode", true);
      \u0275\u0275advance(2);
      \u0275\u0275styleMap("default");
      \u0275\u0275property("outlined", true)("size", "small");
      \u0275\u0275advance();
      \u0275\u0275textInterpolate1(" ", ctx.filterLabel(), " ");
      \u0275\u0275advance();
      \u0275\u0275property("size", "small");
      \u0275\u0275advance();
      \u0275\u0275styleMap("warning");
      \u0275\u0275property("flat", true)("size", "small");
      \u0275\u0275advance();
      \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind1(7, 22, "recipes.filters.master"), " ");
      \u0275\u0275advance(2);
      \u0275\u0275styleMap("warning");
      \u0275\u0275property("flat", true)("size", "small");
      \u0275\u0275advance();
      \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind1(10, 24, "recipes.filters.chunk"), " ");
      \u0275\u0275advance(2);
      \u0275\u0275styleMap("warning");
      \u0275\u0275property("flat", true)("size", "small");
      \u0275\u0275advance();
      \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind1(13, 26, "recipes.filters.all"), " ");
    }
  }, dependencies: [
    FlexRowComponent,
    ButtonComponent,
    DropdownComponent,
    FlexColumnComponent,
    TranslatePipe
  ], encapsulation: 2, changeDetection: 0 });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(RecipesFiltersComponent, [{
    type: Component,
    args: [{
      selector: "lg-recipes-filters",
      changeDetection: ChangeDetectionStrategy.OnPush,
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
                   [style]="'default'"
                   lgDropdownAnchor>
          {{ filterLabel() }}
        </lg-button>

        <lg-flex-column [size]="'small'">
          <lg-button (click)="onFilterChange({field: 'master', value: 'true'})"
                     [flat]="true"
                     [size]="'small'"
                     [style]="'warning'">
            {{ 'recipes.filters.master' | translate }}
          </lg-button>
          <lg-button (click)="onFilterChange({field: 'master', value: 'false'})"
                     [flat]="true"
                     [size]="'small'"
                     [style]="'warning'">
            {{ 'recipes.filters.chunk' | translate }}
          </lg-button>

          <lg-button (click)="onFilterChange({field: undefined, value: undefined})"
                     [flat]="true"
                     [size]="'small'"
                     [style]="'warning'">
            {{ 'recipes.filters.all' | translate }}
          </lg-button>
        </lg-flex-column>
      </lg-dropdown>
    </lg-flex-row>
  `
    }]
  }], () => [{ type: TranslateService }], null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(RecipesFiltersComponent, { className: "RecipesFiltersComponent", filePath: "src/app/features/recipes/view/list/recipes-filters.component.ts", lineNumber: 57 });
})();
export {
  RecipesFiltersComponent
};
//# sourceMappingURL=chunk-77KTE3TZ.js.map
