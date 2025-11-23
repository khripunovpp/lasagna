import {
  GroupSortService
} from "./chunk-ACED5AZV.js";
import "./chunk-N4BRTEB2.js";
import {
  RecipeScheme
} from "./chunk-I6F3XQW5.js";
import "./chunk-EHHQZW7Q.js";
import {
  matchMediaSignal,
  mobileBreakpoint
} from "./chunk-443BUU7J.js";
import {
  CategoryRecipesRepository,
  RecipesRepository,
  TransferDataService
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
  IS_CLIENT,
  Stores
} from "./chunk-QHJLSFIB.js";
import "./chunk-3UJV2MM3.js";
import "./chunk-UG5XPMCB.js";
import "./chunk-XXA7PPXB.js";
import "./chunk-XIU3WVPC.js";
import "./chunk-T5CRNY7R.js";
import "./chunk-IWOUTMKL.js";
import "./chunk-R5O3TEDB.js";
import {
  SelectionZoneService
} from "./chunk-KM2DRJZA.js";
import "./chunk-2S3NUMNU.js";
import {
  injectQueryParams
} from "./chunk-PHCOZAXM.js";
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
import "./chunk-X2X7GTPW.js";
import "./chunk-PZQLIUCM.js";
import "./chunk-7YWLATDR.js";
import {
  Component,
  DestroyRef,
  InjectionToken,
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

// src/app/shared/service/groupings/base-grouping.ts
var BaseGrouping = class {
  innerSort(a, b, direction = "asc") {
    if (direction === "asc") {
      return JSON.stringify(a).localeCompare(JSON.stringify(b));
    } else {
      return JSON.stringify(b).localeCompare(JSON.stringify(a));
    }
  }
  groupingSort(a, b, direction = "asc") {
    if (direction === "asc") {
      return a.localeCompare(b);
    } else {
      return b.localeCompare(a);
    }
  }
  groupBy(item) {
    return JSON.stringify(item);
  }
  fieldTransform(field) {
    return field;
  }
};

// src/app/shared/service/groupings/recipes.grouping.ts
var CategoryRecipeSortStrategy = class extends BaseGrouping {
  categoryRecipesRepository;
  constructor(categoryRecipesRepository) {
    super();
    this.categoryRecipesRepository = categoryRecipesRepository;
  }
  groupBy(item) {
    return item.category_id || "";
  }
  innerSort(a, b, direction, field = "name") {
    return recipeInnerSortFunction(a, b);
  }
  groupingSort(a, b, direction) {
    if (direction === "asc") {
      return a.localeCompare(b);
    } else {
      return b.localeCompare(a);
    }
  }
  async fieldTransform(field) {
    const category = await this.categoryRecipesRepository.getOne(field);
    return category?.name || field;
  }
};
var TagsRecipeSortStrategy = class extends BaseGrouping {
  groupBy(item) {
    return item.tags?.map((tag) => tag.toString()) || "";
  }
  innerSort(a, b, direction, field = "name") {
    return recipeInnerSortFunction(a, b);
  }
};
var RecipeAlphabeticalSortStrategy = class extends BaseGrouping {
  groupBy(item) {
    return item.name.toLowerCase().charAt(0);
  }
  innerSort(a, b, direction, field = "name") {
    return recipeInnerSortFunction(a, b);
  }
  groupingSort(a, b, direction) {
    if (direction === "asc") {
      return a.localeCompare(b);
    } else {
      return b.localeCompare(a);
    }
  }
};
var RecipeCreatedAtMonthSortStrategy = class {
  groupBy(item) {
    const date = item.createdAt ? new Date(item.createdAt) : /* @__PURE__ */ new Date();
    return `${date.getFullYear()}-${date.getMonth() + 1}-${("0" + date.getDate()).slice(-2)}`;
  }
  innerSort(a, b, direction, field = "createdAt") {
    return recipeInnerSortFunction(a, b);
  }
  groupingSort(a, b, direction) {
    const [yearA, monthA, dayA] = a.split("-").map(Number);
    const [yearB, monthB, dayB] = b.split("-").map(Number);
    const dateA = new Date(yearA, monthA - 1, dayA);
    const dateB = new Date(yearB, monthB - 1, dayB);
    if (direction === "asc") {
      return dateA.getTime() - dateB.getTime();
    } else {
      return dateB.getTime() - dateA.getTime();
    }
  }
};
var recipeInnerSortFunction = (a, b, direction = "asc", field = "name") => {
  if (!a || !b)
    return 0;
  if (field === "name") {
    if (direction === "asc") {
      return a[field]?.toString()?.localeCompare(b[field]) || 0;
    } else {
      return b[field]?.toString()?.localeCompare(a[field]) || 0;
    }
  } else if (field === "createdAt") {
    const dateA = new Date(a[field]);
    const dateB = new Date(b[field]);
    return direction === "asc" ? dateA.getTime() - dateB.getTime() : dateB.getTime() - dateA.getTime();
  }
  return 0;
};

// src/app/features/recipes/service/providers/categorized-recipes-list.token.ts
var CATEGORIZED_RECIPES_LIST = new InjectionToken("CategorizedRecipesList", {
  factory: () => {
    const groupSortService = inject(GroupSortService);
    const recipesRepository = inject(RecipesRepository);
    const groupingParam = injectQueryParams("groupBy");
    const sortDirection = injectQueryParams("sortDirection");
    const sortField = injectQueryParams("sortField");
    const filterField = injectQueryParams("filterField");
    const filterValue = injectQueryParams("filterValue");
    const filterOperator = injectQueryParams("filterOperator");
    const categoryRepository = inject(CategoryRecipesRepository);
    const recipes = from(recipesRepository.loadRecipes({
      key: filterField(),
      value: filterValue(),
      operator: "equals"
    })).pipe(switchMap(() => recipesRepository.recipes$), map((recipes2) => recipes2.map((recipe) => recipe.toDTO())));
    const groupingMap = {
      "createdAt": () => new RecipeCreatedAtMonthSortStrategy(),
      "category": () => new CategoryRecipeSortStrategy(categoryRepository),
      "alphabetical": () => new RecipeAlphabeticalSortStrategy(),
      "tag": () => new TagsRecipeSortStrategy()
    };
    return recipes.pipe(switchMap((recipes2) => {
      const grouping = groupingParam();
      const strategy = groupingMap[grouping]?.() ?? groupingMap["category"]();
      return groupSortService.groupItems(recipes2, strategy, sortDirection() ?? "asc", sortField() ?? "name");
    }), shareReplay(1));
  }
});

// src/app/features/recipes/view/list/recipes-list.component.ts
var RecipesListComponent_Defer_2_DepsFn = () => [import("./chunk-5EMI5HZE.js").then((m) => m.FlexRowComponent), import("./chunk-F6T4LHLC.js").then((m) => m.ButtonComponent), import("./chunk-DT5V5AZD.js").then((m) => m.RouterLink), import("./chunk-RPWYILHF.js").then((m) => m.MatIcon), import("./chunk-LGSX6LCO.js").then((m) => m.ContainerComponent), import("./chunk-SYAF33FD.js").then((m) => m.TitleComponent), import("./chunk-J5VDRIFQ.js").then((m) => m.ImportComponent), import("./chunk-BQ5KZETD.js").then((m) => m.ImportRowTplDirective), import("./chunk-Y7ECYNDZ.js").then((m) => m.FadeInComponent), import("./chunk-NCOZKGJL.js").then((m) => m.ControlsBarComponent), import("./chunk-EYJPKDYM.js").then((m) => m.SelectionToolsComponent), import("./chunk-VQCG2RVZ.js").then((m) => m.PullDirective), import("./chunk-IXTDESA5.js").then((m) => m.DraftRecipesListComponent), import("./chunk-Q4Q3HZ6L.js").then((m) => m.InlineSeparatedGroupComponent), import("./chunk-Q4Q3HZ6L.js").then((m) => m.InlineSeparatedGroupDirective), import("./chunk-3OLWD6EL.js").then((m) => m.GroupingSortingComponent), import("./chunk-XT5YHS5Z.js").then((m) => m.GroupingTilesComponent), import("./chunk-GW3SUC4N.js").then((m) => m.GroupingTileDirective), import("./chunk-7H7OXKDA.js").then((m) => m.FlexColumnComponent), import("./chunk-NMTF7W6I.js").then((m) => m.CardComponent), import("./chunk-77KTE3TZ.js").then((m) => m.RecipesFiltersComponent), TranslateDirective, import("./chunk-ZSL4WOCU.js").then((m) => m.TimeAgoPipe), TranslatePipe];
var _c0 = (a0) => ({ length: a0 });
var _c1 = () => ["recipe"];
function RecipesListComponent_Defer_0_Conditional_0_ng_template_4_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "lg-button", 13);
    \u0275\u0275listener("click", function RecipesListComponent_Defer_0_Conditional_0_ng_template_4_Template_lg_button_click_0_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r1.exportRecipes(ctx_r1.selectionZoneService.selected()));
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
function RecipesListComponent_Defer_0_Conditional_0_ng_template_5_ng_template_2_Template(rf, ctx) {
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
function RecipesListComponent_Defer_0_Conditional_0_ng_template_5_Template(rf, ctx) {
  if (rf & 1) {
    const _r3 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "lg-import", 14);
    \u0275\u0275pipe(1, "translate");
    \u0275\u0275listener("onDone", function RecipesListComponent_Defer_0_Conditional_0_ng_template_5_Template_lg_import_onDone_0_listener() {
      \u0275\u0275restoreView(_r3);
      const ctx_r1 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r1.loadRecipes());
    });
    \u0275\u0275template(2, RecipesListComponent_Defer_0_Conditional_0_ng_template_5_ng_template_2_Template, 2, 1, "ng-template", 15);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(3);
    \u0275\u0275property("label", \u0275\u0275pipeBind1(1, 3, "import-label"))("schema", ctx_r1.RecipeScheme)("storeName", ctx_r1.Stores.RECIPES);
  }
}
function RecipesListComponent_Defer_0_Conditional_0_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "lg-controls-bar")(1, "lg-button", 10);
    \u0275\u0275element(2, "mat-icon", 11);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "lg-inline-separated-group");
    \u0275\u0275template(4, RecipesListComponent_Defer_0_Conditional_0_ng_template_4_Template, 3, 7, "ng-template", 12)(5, RecipesListComponent_Defer_0_Conditional_0_ng_template_5_Template, 3, 5, "ng-template", 12);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    \u0275\u0275advance();
    \u0275\u0275styleMap("primary");
    \u0275\u0275property("icon", true)("link", "/recipes/add")("size", "medium");
  }
}
function RecipesListComponent_Defer_0_Conditional_7_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "span", 2);
  }
  if (rf & 2) {
    let tmp_3_0;
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275property("translateParams", \u0275\u0275pureFunction1(2, _c0, (tmp_3_0 = ctx_r1.recipes()) == null ? null : tmp_3_0.length))("translate", "filters.results.length");
  }
}
function RecipesListComponent_Defer_0_Conditional_13_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "lg-selection-tools", 5);
  }
  if (rf & 2) {
    \u0275\u0275property("selectionTypes", \u0275\u0275pureFunction0(1, _c1));
  }
}
function RecipesListComponent_Defer_0_ng_template_16_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "lg-card")(1, "lg-flex-column", 16)(2, "a", 17);
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "lg-flex-row")(5, "lg-button", 18);
    \u0275\u0275text(6);
    \u0275\u0275pipe(7, "translate");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "small", 19);
    \u0275\u0275text(9);
    \u0275\u0275pipe(10, "translate");
    \u0275\u0275pipe(11, "timeAgo");
    \u0275\u0275elementEnd()()()();
  }
  if (rf & 2) {
    const recipe_r5 = ctx.$implicit;
    \u0275\u0275advance(2);
    \u0275\u0275property("routerLink", "/recipes/edit/" + recipe_r5.uuid);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", recipe_r5.name, " ");
    \u0275\u0275advance(2);
    \u0275\u0275styleMap("success");
    \u0275\u0275property("flat", true)("link", "/recipes/calculate/" + recipe_r5.uuid)("size", "small");
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind1(7, 10, "recipes.calculate-btn"), " ");
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate2(" ", \u0275\u0275pipeBind1(10, 12, "edited-at-label"), " ", \u0275\u0275pipeBind1(11, 14, (recipe_r5 == null ? null : recipe_r5.updatedAt) || (recipe_r5 == null ? null : recipe_r5.createdAt)), " ");
  }
}
function RecipesListComponent_Defer_0_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275conditionalCreate(0, RecipesListComponent_Defer_0_Conditional_0_Template, 6, 5, "lg-controls-bar");
    \u0275\u0275elementStart(1, "lg-fade-in")(2, "lg-container")(3, "lg-flex-row", 1)(4, "lg-title");
    \u0275\u0275text(5);
    \u0275\u0275pipe(6, "translate");
    \u0275\u0275conditionalCreate(7, RecipesListComponent_Defer_0_Conditional_7_Template, 1, 4, "span", 2);
    \u0275\u0275elementEnd()();
    \u0275\u0275element(8, "lg-draft-recipes-list");
    \u0275\u0275elementStart(9, "lg-flex-column", 3)(10, "lg-flex-row", 4);
    \u0275\u0275element(11, "lg-recipes-filters")(12, "lg-grouping-sorting");
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(13, RecipesListComponent_Defer_0_Conditional_13_Template, 1, 2, "lg-selection-tools", 5);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(14, "lg-grouping-tiles", 6, 0);
    \u0275\u0275template(16, RecipesListComponent_Defer_0_ng_template_16_Template, 12, 16, "ng-template", 7);
    \u0275\u0275elementStart(17, "lg-flex-column", 8);
    \u0275\u0275text(18);
    \u0275\u0275pipe(19, "translate");
    \u0275\u0275elementStart(20, "lg-button", 9);
    \u0275\u0275text(21);
    \u0275\u0275pipe(22, "translate");
    \u0275\u0275elementEnd()()()()();
  }
  if (rf & 2) {
    const groupingTiles_r6 = \u0275\u0275reference(15);
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275conditional(!groupingTiles_r6.empty() ? 0 : -1);
    \u0275\u0275advance(3);
    \u0275\u0275property("center", true);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind1(6, 17, "recipes.list-title"), " ");
    \u0275\u0275advance(2);
    \u0275\u0275conditional(!groupingTiles_r6.empty() ? 7 : -1);
    \u0275\u0275advance(2);
    \u0275\u0275property("size", "medium");
    \u0275\u0275advance();
    \u0275\u0275property("center", !ctx_r1.isMobile())("mobileMode", true)("size", "medium");
    \u0275\u0275advance(3);
    \u0275\u0275conditional(!groupingTiles_r6.empty() ? 13 : -1);
    \u0275\u0275advance();
    \u0275\u0275property("selectable", true)("sortResult", ctx_r1.recipes());
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind1(19, 19, "recipes.empty-state.text"), " ");
    \u0275\u0275advance(2);
    \u0275\u0275styleMap("primary");
    \u0275\u0275property("link", "/recipes/add")("size", "medium");
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind1(22, 21, "recipes.empty-state.btn"), " ");
  }
}
function RecipesListComponent_DeferError_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275text(0);
    \u0275\u0275pipe(1, "translate");
  }
  if (rf & 2) {
    \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind1(1, 1, "recipes-list.defer-load-error"), " ");
  }
}
var RecipesListComponent = class _RecipesListComponent {
  _recipesRepository;
  _notificationsService;
  _transferDataService;
  selectionZoneService;
  constructor(_recipesRepository, _notificationsService, _transferDataService, selectionZoneService) {
    this._recipesRepository = _recipesRepository;
    this._notificationsService = _notificationsService;
    this._transferDataService = _transferDataService;
    this.selectionZoneService = selectionZoneService;
    this.selectionZoneService.onDelete.pipe(takeUntilDestroyed(this.destroyRef)).subscribe(([key]) => {
      this.deleteRecipe(key);
    });
  }
  destroyRef = inject(DestroyRef);
  isClient = inject(IS_CLIENT);
  recipes = toSignal(inject(CATEGORIZED_RECIPES_LIST));
  isMobile = matchMediaSignal(mobileBreakpoint);
  Stores = Stores;
  RecipeScheme = RecipeScheme;
  ngOnInit() {
    if (!this.isClient) {
      return;
    }
    this.loadRecipes();
  }
  deleteRecipe(uuid) {
    if (!uuid) {
      return;
    }
    this._recipesRepository.deleteOne(uuid).then(() => {
      this._notificationsService.success("recipe.deleted");
      this.loadRecipes();
    });
  }
  loadRecipes() {
    return this._recipesRepository.loadRecipes();
  }
  exportRecipes(selected) {
    return this._transferDataService.exportTable(Stores.RECIPES, "json", {
      selected: Array.from(selected || [])
    });
  }
  static \u0275fac = function RecipesListComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _RecipesListComponent)(\u0275\u0275directiveInject(RecipesRepository), \u0275\u0275directiveInject(NotificationsService), \u0275\u0275directiveInject(TransferDataService), \u0275\u0275directiveInject(SelectionZoneService));
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _RecipesListComponent, selectors: [["lg-recipes-list"]], features: [\u0275\u0275ProvidersFeature([
    SelectionZoneService
  ])], decls: 4, vars: 0, consts: [["groupingTiles", ""], [3, "center"], [1, "text-muted", "text-small", 3, "translateParams", "translate"], [3, "size"], [3, "center", "mobileMode", "size"], [3, "selectionTypes"], [3, "selectable", "sortResult"], ["lgGroupingTile", ""], ["empty-state", "", "position", "center", "size", "medium"], [3, "link", "size"], [3, "icon", "link", "size"], ["aria-hidden", "false", "fontIcon", "add"], ["lgInlineSeparatedGroup", ""], [3, "click", "flat", "size"], [3, "onDone", "label", "schema", "storeName"], ["lgImportRowTpl", ""], ["size", "medium"], [3, "routerLink"], [3, "flat", "link", "size"], ["lgPull", "", 1, "text-muted", "text-cursive"]], template: function RecipesListComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275domTemplate(0, RecipesListComponent_Defer_0_Template, 23, 23)(1, RecipesListComponent_DeferError_1_Template, 2, 3);
      \u0275\u0275defer(2, 0, RecipesListComponent_Defer_2_DepsFn, null, null, 1);
      \u0275\u0275deferOnIdle();
    }
  }, dependencies: [TranslatePipe], styles: ["\n\n[_nghost-%COMP%] {\n  display: block;\n}\n/*# sourceMappingURL=recipes-list.component.css.map */"] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadataAsync(RecipesListComponent, () => [import("./chunk-5EMI5HZE.js").then((m) => m.FlexRowComponent), import("./chunk-F6T4LHLC.js").then((m) => m.ButtonComponent), import("./chunk-DT5V5AZD.js").then((m) => m.RouterLink), import("./chunk-RPWYILHF.js").then((m) => m.MatIcon), import("./chunk-LGSX6LCO.js").then((m) => m.ContainerComponent), import("./chunk-SYAF33FD.js").then((m) => m.TitleComponent), import("./chunk-J5VDRIFQ.js").then((m) => m.ImportComponent), import("./chunk-BQ5KZETD.js").then((m) => m.ImportRowTplDirective), import("./chunk-Y7ECYNDZ.js").then((m) => m.FadeInComponent), import("./chunk-NCOZKGJL.js").then((m) => m.ControlsBarComponent), import("./chunk-EYJPKDYM.js").then((m) => m.SelectionToolsComponent), import("./chunk-VQCG2RVZ.js").then((m) => m.PullDirective), import("./chunk-IXTDESA5.js").then((m) => m.DraftRecipesListComponent), import("./chunk-Q4Q3HZ6L.js").then((m) => m.InlineSeparatedGroupComponent), import("./chunk-Q4Q3HZ6L.js").then((m) => m.InlineSeparatedGroupDirective), import("./chunk-3OLWD6EL.js").then((m) => m.GroupingSortingComponent), import("./chunk-XT5YHS5Z.js").then((m) => m.GroupingTilesComponent), import("./chunk-GW3SUC4N.js").then((m) => m.GroupingTileDirective), import("./chunk-7H7OXKDA.js").then((m) => m.FlexColumnComponent), import("./chunk-NMTF7W6I.js").then((m) => m.CardComponent), import("./chunk-77KTE3TZ.js").then((m) => m.RecipesFiltersComponent), import("./chunk-ZSL4WOCU.js").then((m) => m.TimeAgoPipe)], (FlexRowComponent, ButtonComponent, RouterLink, MatIcon, ContainerComponent, TitleComponent, ImportComponent, ImportRowTplDirective, FadeInComponent, ControlsBarComponent, SelectionToolsComponent, PullDirective, DraftRecipesListComponent, InlineSeparatedGroupComponent, InlineSeparatedGroupDirective, GroupingSortingComponent, GroupingTilesComponent, GroupingTileDirective, FlexColumnComponent, CardComponent, RecipesFiltersComponent, TimeAgoPipe) => {
    setClassMetadata(RecipesListComponent, [{
      type: Component,
      args: [{ selector: "lg-recipes-list", standalone: true, template: `
    @defer {
      @if (!groupingTiles.empty()) {
        <lg-controls-bar>
          <lg-button [icon]="true"
                     [link]="'/recipes/add'"
                     [size]="'medium'"
                     [style]="'primary'">
            <mat-icon aria-hidden="false" fontIcon="add"></mat-icon>
          </lg-button>

          <lg-inline-separated-group>
            <ng-template lgInlineSeparatedGroup>
              <lg-button (click)="exportRecipes(selectionZoneService.selected())"
                         [flat]="true"
                         [size]="'small'"
                         [style]="'solid'">
                {{ 'export-label'|translate }}
              </lg-button>
            </ng-template>
            <ng-template lgInlineSeparatedGroup>
              <lg-import (onDone)="loadRecipes()"
                         [label]="('import-label'|translate)"
                         [schema]="RecipeScheme"
                         [storeName]="Stores.RECIPES">
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
          <lg-flex-row [center]="true">
            <lg-title>
              {{ 'recipes.list-title'|translate }}

              @if (!groupingTiles.empty()) {
                <span [translateParams]="{length:recipes()?.length}"
                      [translate]="'filters.results.length'"
                      class="text-muted text-small"></span>
              }
            </lg-title>
          </lg-flex-row>

          <lg-draft-recipes-list></lg-draft-recipes-list>


          <lg-flex-column [size]="'medium'">
            <lg-flex-row [center]="!isMobile()"
                         [mobileMode]="true"
                         [size]="'medium'">
              <lg-recipes-filters></lg-recipes-filters>

              <lg-grouping-sorting></lg-grouping-sorting>
            </lg-flex-row>

            @if (!groupingTiles.empty()) {
              <lg-selection-tools [selectionTypes]="['recipe']"></lg-selection-tools>
            }
          </lg-flex-column>

          <lg-grouping-tiles #groupingTiles
                             [selectable]="true"
                             [sortResult]="recipes()">
            <ng-template let-recipe lgGroupingTile>
              <lg-card>
                <lg-flex-column size="medium">
                  <a [routerLink]="'/recipes/edit/' + recipe.uuid">
                    {{ recipe.name }}
                  </a>

                  <lg-flex-row>
                    <lg-button [flat]="true"
                               [link]="'/recipes/calculate/' + recipe.uuid"
                               [size]="'small'"
                               [style]="'success'">
                      {{ 'recipes.calculate-btn'|translate }}
                    </lg-button>

                    <small class="text-muted text-cursive" lgPull>
                      {{ 'edited-at-label'|translate }} {{ (recipe?.updatedAt || recipe?.createdAt) | timeAgo }}
                    </small>
                  </lg-flex-row>
                </lg-flex-column>
              </lg-card>
            </ng-template>

            <lg-flex-column empty-state
                            position="center"
                            size="medium">
              {{ 'recipes.empty-state.text'|translate }}

              <lg-button [link]="'/recipes/add'"
                         [size]="'medium'"
                         [style]="'primary'">
                {{ 'recipes.empty-state.btn'|translate }}
              </lg-button>
            </lg-flex-column>
          </lg-grouping-tiles>
        </lg-container>
      </lg-fade-in>
    } @error {
      {{ 'recipes-list.defer-load-error' | translate }}
    }
  `, providers: [
        SelectionZoneService
      ], imports: [
        FlexRowComponent,
        ButtonComponent,
        RouterLink,
        MatIcon,
        ContainerComponent,
        TitleComponent,
        ImportComponent,
        ImportRowTplDirective,
        FadeInComponent,
        ControlsBarComponent,
        SelectionToolsComponent,
        TimeAgoPipe,
        PullDirective,
        TranslatePipe,
        DraftRecipesListComponent,
        InlineSeparatedGroupComponent,
        InlineSeparatedGroupDirective,
        GroupingSortingComponent,
        GroupingTilesComponent,
        GroupingTileDirective,
        FlexColumnComponent,
        CardComponent,
        RecipesFiltersComponent,
        TranslateDirective
      ], styles: ["/* angular:styles/component:scss;01c1eed413cbcab17b345a4da1b468b4e2a0a4e51bc2f6ee57d46c1ca65a67bb;/Users/khripunovpavel/Documents/my/lasagna/lasagna/src/app/features/recipes/view/list/recipes-list.component.ts */\n:host {\n  display: block;\n}\n/*# sourceMappingURL=recipes-list.component.css.map */\n"] }]
    }], () => [{ type: RecipesRepository }, { type: NotificationsService }, { type: TransferDataService }, { type: SelectionZoneService }], null);
  });
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(RecipesListComponent, { className: "RecipesListComponent", filePath: "src/app/features/recipes/view/list/recipes-list.component.ts", lineNumber: 188 });
})();
export {
  RecipesListComponent
};
//# sourceMappingURL=chunk-USULA73F.js.map
