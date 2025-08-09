import {
  DropdownComponent
} from "./chunk-JRFQU5NU.js";
import {
  ExpanderComponent,
  ImportComponent,
  ImportRowTplDirective,
  ProductScheme,
  UnitScheme,
  z
} from "./chunk-DIZVTS3O.js";
import {
  ControlsBarComponent,
  SelectionToolsComponent
} from "./chunk-ULKYNLJB.js";
import "./chunk-IKAOX7AI.js";
import {
  GroupingTileDirective,
  GroupingTilesComponent
} from "./chunk-AWOESVYR.js";
import "./chunk-3LSKCD37.js";
import {
  CardListComponent
} from "./chunk-CWA3CPZ5.js";
import {
  CardListItemDirective
} from "./chunk-I2GJGW5L.js";
import "./chunk-SDHSF2EG.js";
import {
  CATEGORIZED_RECIPES_LIST
} from "./chunk-YVI4JC4E.js";
import "./chunk-OAK3DILL.js";
import "./chunk-ZLF4HQCJ.js";
import {
  PullDirective
} from "./chunk-JRXVPNYC.js";
import {
  InlineSeparatedGroupComponent,
  InlineSeparatedGroupDirective
} from "./chunk-T6J5UPYT.js";
import {
  ExpandDirective
} from "./chunk-OCPTIUJK.js";
import {
  MatIcon
} from "./chunk-2S7K7J4C.js";
import {
  CardComponent
} from "./chunk-QPE4CQHK.js";
import {
  ContainerComponent
} from "./chunk-UX3GX3WK.js";
import {
  FlexRowComponent
} from "./chunk-O73UITIU.js";
import {
  TimeAgoPipe
} from "./chunk-ZNRV6A27.js";
import {
  FlexColumnComponent
} from "./chunk-ZIFIR5EQ.js";
import "./chunk-R64U7JLD.js";
import {
  FadeInComponent
} from "./chunk-GKY6K6EK.js";
import "./chunk-HNJAQDA3.js";
import {
  TitleComponent
} from "./chunk-OZKYQV4U.js";
import {
  RecipesRepository,
  TransferDataService
} from "./chunk-NIPIUAKD.js";
import "./chunk-IQVSZDRJ.js";
import "./chunk-SB6NPMDM.js";
import {
  NotificationsService,
  SelectionZoneService,
  injectQueryParams,
  takeUntilDestroyed,
  toSignal
} from "./chunk-ZKFFSLQI.js";
import "./chunk-Q4M4NLQD.js";
import {
  ButtonComponent
} from "./chunk-UXLMBQY2.js";
import {
  TranslatePipe,
  TranslateService
} from "./chunk-UMVMUCIR.js";
import {
  Stores
} from "./chunk-Z6D6OJRN.js";
import "./chunk-5WJUMO7X.js";
import {
  ActivatedRoute,
  Router,
  RouterLink
} from "./chunk-HP5G5POF.js";
import "./chunk-ENTGQEHX.js";
import "./chunk-AL3DWPLK.js";
import {
  Component,
  ContentChild,
  DestroyRef,
  Directive,
  EventEmitter,
  HostBinding,
  Output,
  TemplateRef,
  effect,
  inject,
  setClassMetadata,
  signal,
  ɵsetClassDebugInfo,
  ɵɵProvidersFeature,
  ɵɵadvance,
  ɵɵattribute,
  ɵɵconditional,
  ɵɵconditionalCreate,
  ɵɵcontentQuery,
  ɵɵdefineComponent,
  ɵɵdefineDirective,
  ɵɵdirectiveInject,
  ɵɵelement,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵgetCurrentView,
  ɵɵlistener,
  ɵɵloadQuery,
  ɵɵnextContext,
  ɵɵpipe,
  ɵɵpipeBind1,
  ɵɵpipeBind2,
  ɵɵproperty,
  ɵɵpureFunction0,
  ɵɵpureFunction1,
  ɵɵqueryRefresh,
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
} from "./chunk-UQVCVPTQ.js";
import "./chunk-PZQLIUCM.js";
import "./chunk-7YWLATDR.js";
import "./chunk-46DXP6YY.js";

// src/app/features/recipes/service/Ingredient.scheme.ts
var IngredientScheme = z.object({
  name: z.string(),
  amount: z.number().or(z.string()),
  uuid: z.string().optional(),
  product_id: ProductScheme,
  recipe_id: z.lazy(() => RecipeScheme),
  unit: z.enum(["gram", "portion", "piece"])
});

// src/app/features/recipes/service/Recipe.scheme.ts
var RecipeScheme = z.object({
  name: z.string(),
  uuid: z.string().optional(),
  description: z.string(),
  ingredients: z.array(z.lazy(() => IngredientScheme)),
  outcome_unit: UnitScheme,
  outcome_amount: z.number().or(z.string()),
  taxTemplateName: z.string().optional(),
  category_id: z.string().nullable().optional(),
  createdAt: z.union([z.string(), z.number()]).optional(),
  updatedAt: z.union([z.string(), z.number()]).optional(),
  tags: z.array(z.string()).optional(),
  color: z.string().optional(),
  priceModifiers: z.array(z.object({
    action: z.enum(["add", "subtract", "round"]),
    value: z.number().or(z.string()),
    unit: z.enum(["currency", "percent"])
  })).optional()
});

// src/app/features/recipes/view/list/draft-recipes-list.component.ts
var _c0 = (a0) => ({ length: a0 });
var _forTrack0 = ($index, $item) => $item.uuid;
function DraftRecipesListComponent_Conditional_0_ng_template_4_Template(rf, ctx) {
  if (rf & 1) {
    const _r2 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "lg-button", 4);
    \u0275\u0275listener("click", function DraftRecipesListComponent_Conditional_0_ng_template_4_Template_lg_button_click_0_listener() {
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
function DraftRecipesListComponent_Conditional_0_ng_template_5_Template(rf, ctx) {
  if (rf & 1) {
    const _r4 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "lg-button", 4);
    \u0275\u0275listener("click", function DraftRecipesListComponent_Conditional_0_ng_template_5_Template_lg_button_click_0_listener() {
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
function DraftRecipesListComponent_Conditional_0_Conditional_6_ng_template_0_Template(rf, ctx) {
  if (rf & 1) {
    const _r5 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "lg-button", 5);
    \u0275\u0275listener("click", function DraftRecipesListComponent_Conditional_0_Conditional_6_ng_template_0_Template_lg_button_click_0_listener() {
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
function DraftRecipesListComponent_Conditional_0_Conditional_6_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275template(0, DraftRecipesListComponent_Conditional_0_Conditional_6_ng_template_0_Template, 3, 8, "ng-template", 1);
  }
}
function DraftRecipesListComponent_Conditional_0_For_9_ng_template_0_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275text(0);
    \u0275\u0275pipe(1, "translate");
  }
  if (rf & 2) {
    \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind1(1, 1, "draft.list-prefix.existing"), " ");
  }
}
function DraftRecipesListComponent_Conditional_0_For_9_ng_template_0_Conditional_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275text(0);
    \u0275\u0275pipe(1, "translate");
  }
  if (rf & 2) {
    \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind1(1, 1, "draft.list-prefix.new"), " ");
  }
}
function DraftRecipesListComponent_Conditional_0_For_9_ng_template_0_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "lg-flex-row", 6)(1, "a", 7);
    \u0275\u0275conditionalCreate(2, DraftRecipesListComponent_Conditional_0_For_9_ng_template_0_Conditional_2_Template, 2, 3)(3, DraftRecipesListComponent_Conditional_0_For_9_ng_template_0_Conditional_3_Template, 2, 3);
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
    \u0275\u0275property("routerLink", "/recipes/draft/" + (item_r7 == null ? null : item_r7.uuid));
    \u0275\u0275advance();
    \u0275\u0275conditional((item_r7 == null ? null : item_r7.meta == null ? null : item_r7.meta["uuid"]) ? 2 : 3);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", (item_r7 == null ? null : item_r7.data == null ? null : item_r7.data.name) ?? "", " ");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate2(" ", \u0275\u0275pipeBind1(7, 6, "edited-at-label"), " ", \u0275\u0275pipeBind1(8, 8, (item_r7 == null ? null : item_r7.updatedAt) || (item_r7 == null ? null : item_r7.createdAt)), " ");
  }
}
function DraftRecipesListComponent_Conditional_0_For_9_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275template(0, DraftRecipesListComponent_Conditional_0_For_9_ng_template_0_Template, 9, 10, "ng-template", 3);
  }
  if (rf & 2) {
    const item_r7 = ctx.$implicit;
    \u0275\u0275property("uuid", item_r7.uuid);
  }
}
function DraftRecipesListComponent_Conditional_0_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "lg-expander", 0);
    \u0275\u0275pipe(1, "translate");
    \u0275\u0275pipe(2, "translate");
    \u0275\u0275elementStart(3, "lg-inline-separated-group");
    \u0275\u0275template(4, DraftRecipesListComponent_Conditional_0_ng_template_4_Template, 3, 7, "ng-template", 1)(5, DraftRecipesListComponent_Conditional_0_ng_template_5_Template, 3, 7, "ng-template", 1);
    \u0275\u0275conditionalCreate(6, DraftRecipesListComponent_Conditional_0_Conditional_6_Template, 1, 0, null, 1);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "lg-card-list", 2);
    \u0275\u0275listener("onDeleteOne", function DraftRecipesListComponent_Conditional_0_Template_lg_card_list_onDeleteOne_7_listener($event) {
      \u0275\u0275restoreView(_r1);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.deleteDraft($event == null ? null : $event.uuid));
    })("onSelected", function DraftRecipesListComponent_Conditional_0_Template_lg_card_list_onSelected_7_listener($event) {
      \u0275\u0275restoreView(_r1);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.selectionZoneService.putSelected($event));
    });
    \u0275\u0275repeaterCreate(8, DraftRecipesListComponent_Conditional_0_For_9_Template, 1, 1, null, 3, _forTrack0);
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
var DraftRecipesListComponent = class _DraftRecipesListComponent {
  _recipesRepository;
  _notificationsService;
  selectionZoneService;
  constructor(_recipesRepository, _notificationsService, selectionZoneService) {
    this._recipesRepository = _recipesRepository;
    this._notificationsService = _notificationsService;
    this.selectionZoneService = selectionZoneService;
  }
  drafts = signal([]);
  Stores = Stores;
  get hidden() {
    return this.drafts()?.length === 0 ? true : null;
  }
  ngOnInit() {
    const draft = this._recipesRepository.getDraftRecipe();
    if (draft) {
      this.drafts.set(draft);
    }
  }
  deleteAllDrafts() {
    this._recipesRepository.removeDraftMany(this.drafts().map((item) => item.uuid)).then(() => {
      this.drafts.set([]);
      this._notificationsService.success("Drafts deleted");
    });
  }
  deletedSelectedDrafts() {
    const selected = this.selectionZoneService.selected();
    if (!selected)
      return;
    this._recipesRepository.removeDraftMany(Array.from(selected)).then(() => {
      this.drafts.update((drafts) => {
        return drafts.filter((item) => !selected.has(item.uuid));
      });
      this._notificationsService.success("Drafts deleted");
    });
  }
  deleteDraft(draftUUID) {
    if (!draftUUID) {
      return;
    }
    this._recipesRepository.removeDraftRecipe(draftUUID);
    this.drafts.update((drafts) => {
      return drafts.filter((item) => item?.uuid !== draftUUID);
    });
  }
  static \u0275fac = function DraftRecipesListComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _DraftRecipesListComponent)(\u0275\u0275directiveInject(RecipesRepository), \u0275\u0275directiveInject(NotificationsService), \u0275\u0275directiveInject(SelectionZoneService));
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _DraftRecipesListComponent, selectors: [["lg-draft-recipes-list"]], hostVars: 1, hostBindings: function DraftRecipesListComponent_HostBindings(rf, ctx) {
    if (rf & 2) {
      \u0275\u0275attribute("hidden", ctx.hidden);
    }
  }, features: [\u0275\u0275ProvidersFeature([
    SelectionZoneService
  ])], decls: 1, vars: 1, consts: [[3, "closeLabel", "openLabel"], ["lgInlineSeparatedGroup", ""], [2, "--card-bg", "var(--card-bg-draft)", 3, "onDeleteOne", "onSelected", "mode", "selectAll", "deselectAll"], ["lgCardListItem", "", "type", "draft", 3, "uuid"], [3, "click", "flat", "size"], [3, "click", "flat", "disabled", "size"], [3, "center"], ["lgExpand", "", 3, "routerLink"], [1, "text-muted", "text-cursive"]], template: function DraftRecipesListComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275conditionalCreate(0, DraftRecipesListComponent_Conditional_0_Template, 10, 13, "lg-expander", 0);
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
    TranslatePipe,
    ExpanderComponent,
    InlineSeparatedGroupComponent,
    InlineSeparatedGroupDirective
  ], encapsulation: 2 });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(DraftRecipesListComponent, [{
    type: Component,
    args: [{
      selector: "lg-draft-recipes-list",
      standalone: true,
      imports: [
        FlexRowComponent,
        ButtonComponent,
        CardListComponent,
        CardListItemDirective,
        RouterLink,
        TimeAgoPipe,
        ExpandDirective,
        TranslatePipe,
        ExpanderComponent,
        InlineSeparatedGroupComponent,
        InlineSeparatedGroupDirective
      ],
      providers: [
        SelectionZoneService
      ],
      template: `
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
                      (onDeleteOne)="deleteDraft($event?.uuid)"
                      (onSelected)="selectionZoneService.putSelected($event)"
                      [selectAll]="selectionZoneService.selectAll()"
                      [deselectAll]="selectionZoneService.deselectAll()"
                      style="--card-bg: var(--card-bg-draft)">
          @for (item of drafts(); track item.uuid) {
            <ng-template lgCardListItem [uuid]="item.uuid" type="draft">
              <lg-flex-row [center]="true">
                <a [routerLink]="'/recipes/draft/' + item?.uuid" lgExpand>
                  @if (item?.meta?.['uuid']) {
                    {{ 'draft.list-prefix.existing'|translate }}
                  } @else {
                    {{ 'draft.list-prefix.new'|translate }}
                  }
                  {{ item?.data?.name ?? '' }}
                </a>

                <small class="text-muted text-cursive">
                  {{ 'edited-at-label'|translate }} {{ (item?.updatedAt || item?.createdAt) | timeAgo }}
                </small>
              </lg-flex-row>
            </ng-template>
          }
        </lg-card-list>
      </lg-expander>
    }
  `
    }]
  }], () => [{ type: RecipesRepository }, { type: NotificationsService }, { type: SelectionZoneService }], { hidden: [{
    type: HostBinding,
    args: ["attr.hidden"]
  }] });
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(DraftRecipesListComponent, { className: "DraftRecipesListComponent", filePath: "src/app/features/recipes/view/list/draft-recipes-list.component.ts", lineNumber: 104 });
})();

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
  sorting = signal({ field: "name", direction: this.defaultDirection, group: "category" });
  sortingEffect = effect(() => {
    const sort = this.sorting();
    this.sortChange.emit(sort);
  });
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
      relativeTo: this.aRouter
    }).then(() => {
      window.location.reload();
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
  }, outputs: { sortChange: "sortChange", groupChange: "groupChange" }, decls: 27, vars: 42, consts: [["lgDropdownAnchor", "", 3, "size"], [3, "size"], [3, "click", "flat", "size"]], template: function GroupingSortingComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "lg-flex-row")(1, "lg-dropdown")(2, "lg-button", 0);
      \u0275\u0275text(3);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(4, "lg-flex-column", 1)(5, "span");
      \u0275\u0275text(6);
      \u0275\u0275pipe(7, "translate");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(8, "lg-button", 2);
      \u0275\u0275listener("click", function GroupingSortingComponent_Template_lg_button_click_8_listener() {
        return ctx.onSortChange({ group: "category" });
      });
      \u0275\u0275text(9);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(10, "lg-button", 2);
      \u0275\u0275listener("click", function GroupingSortingComponent_Template_lg_button_click_10_listener() {
        return ctx.onSortChange({ group: "tag" });
      });
      \u0275\u0275text(11);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(12, "lg-button", 2);
      \u0275\u0275listener("click", function GroupingSortingComponent_Template_lg_button_click_12_listener() {
        return ctx.onSortChange({ group: "createdAt" });
      });
      \u0275\u0275text(13);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(14, "lg-button", 2);
      \u0275\u0275listener("click", function GroupingSortingComponent_Template_lg_button_click_14_listener() {
        return ctx.onSortChange({ group: "alphabetical" });
      });
      \u0275\u0275text(15);
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(16, "lg-dropdown")(17, "lg-button", 0);
      \u0275\u0275text(18);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(19, "lg-flex-column", 1)(20, "span");
      \u0275\u0275text(21);
      \u0275\u0275pipe(22, "translate");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(23, "lg-button", 2);
      \u0275\u0275listener("click", function GroupingSortingComponent_Template_lg_button_click_23_listener() {
        return ctx.onSortChange({ direction: "asc" });
      });
      \u0275\u0275text(24);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(25, "lg-button", 2);
      \u0275\u0275listener("click", function GroupingSortingComponent_Template_lg_button_click_25_listener() {
        return ctx.onSortChange({ direction: "desc" });
      });
      \u0275\u0275text(26);
      \u0275\u0275elementEnd()()()();
    }
    if (rf & 2) {
      \u0275\u0275advance(2);
      \u0275\u0275property("size", "small");
      \u0275\u0275advance();
      \u0275\u0275textInterpolate1(" ", ctx.getGroupingLabel(ctx.sorting().group), " ");
      \u0275\u0275advance();
      \u0275\u0275property("size", "small");
      \u0275\u0275advance(2);
      \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(7, 38, "grouping.title"));
      \u0275\u0275advance(2);
      \u0275\u0275styleMap("warning");
      \u0275\u0275property("flat", true)("size", "small");
      \u0275\u0275advance();
      \u0275\u0275textInterpolate1(" ", ctx.groupingToLabel["category"], " ");
      \u0275\u0275advance();
      \u0275\u0275styleMap("warning");
      \u0275\u0275property("flat", true)("size", "small");
      \u0275\u0275advance();
      \u0275\u0275textInterpolate1(" ", ctx.groupingToLabel["tag"], " ");
      \u0275\u0275advance();
      \u0275\u0275styleMap("warning");
      \u0275\u0275property("flat", true)("size", "small");
      \u0275\u0275advance();
      \u0275\u0275textInterpolate1(" ", ctx.groupingToLabel["createdAt"], " ");
      \u0275\u0275advance();
      \u0275\u0275styleMap("warning");
      \u0275\u0275property("flat", true)("size", "small");
      \u0275\u0275advance();
      \u0275\u0275textInterpolate1(" ", ctx.groupingToLabel["alphabetical"], " ");
      \u0275\u0275advance(2);
      \u0275\u0275property("size", "small");
      \u0275\u0275advance();
      \u0275\u0275textInterpolate1(" ", ctx.getGroupingDirectionLabel(ctx.sorting().direction), " ");
      \u0275\u0275advance();
      \u0275\u0275property("size", "small");
      \u0275\u0275advance(2);
      \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(22, 40, "grouping.direction.title"));
      \u0275\u0275advance(2);
      \u0275\u0275styleMap("warning");
      \u0275\u0275property("flat", true)("size", "small");
      \u0275\u0275advance();
      \u0275\u0275textInterpolate1(" ", ctx.groupingDirectionToLabel["asc"], " ");
      \u0275\u0275advance();
      \u0275\u0275styleMap("warning");
      \u0275\u0275property("flat", true)("size", "small");
      \u0275\u0275advance();
      \u0275\u0275textInterpolate1(" ", ctx.groupingDirectionToLabel["desc"], " ");
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
    <lg-flex-row>
      <lg-dropdown>
        <lg-button [size]="'small'" lgDropdownAnchor>
          {{ getGroupingLabel(sorting().group) }}
        </lg-button>

        <lg-flex-column [size]="'small'">
          <span>{{ 'grouping.title' | translate }}</span>

          <lg-button (click)="onSortChange({group: 'category'})"
                     [flat]="true"
                     [size]="'small'"
                     [style]="'warning'">
            {{ groupingToLabel['category'] }}
          </lg-button>

          <lg-button (click)="onSortChange({group: 'tag'})"
                     [flat]="true"
                     [size]="'small'"
                     [style]="'warning'">
            {{ groupingToLabel['tag'] }}
          </lg-button>

          <lg-button (click)="onSortChange({group: 'createdAt'})"
                     [flat]="true"
                     [size]="'small'"
                     [style]="'warning'">
            {{ groupingToLabel['createdAt'] }}
          </lg-button>

          <lg-button (click)="onSortChange({group: 'alphabetical'})"
                     [flat]="true"
                     [size]="'small'"
                     [style]="'warning'">
            {{ groupingToLabel['alphabetical'] }}
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
        <lg-button [size]="'small'" lgDropdownAnchor>
          {{ getGroupingDirectionLabel(sorting().direction) }}
        </lg-button>

        <lg-flex-column [size]="'small'">
          <span>{{ 'grouping.direction.title' | translate }}</span>

          <lg-button (click)="onSortChange({direction: 'asc'})"
                     [flat]="true"
                     [size]="'small'"
                     [style]="'warning'">
            {{ groupingDirectionToLabel['asc'] }}
          </lg-button>

          <lg-button (click)="onSortChange({direction: 'desc'})"
                     [flat]="true"
                     [size]="'small'"
                     [style]="'warning'">
            {{ groupingDirectionToLabel['desc'] }}
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
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(GroupingSortingComponent, { className: "GroupingSortingComponent", filePath: "src/app/shared/view/ui/grouping-sorting/grouping-sorting.component.ts", lineNumber: 109 });
})();

// src/app/features/recipes/view/list/recipes-list.component.ts
var _c02 = () => ["recipe"];
function RecipesListComponent_Conditional_0_ng_template_4_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "lg-button", 10);
    \u0275\u0275listener("click", function RecipesListComponent_Conditional_0_ng_template_4_Template_lg_button_click_0_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.exportRecipes(ctx_r1.selectionZoneService.selected()));
    });
    \u0275\u0275text(1);
    \u0275\u0275pipe(2, "translate");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    \u0275\u0275styleMap("info");
    \u0275\u0275property("flat", true)("size", "small");
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind1(2, 5, "export-label"), " recipes ");
  }
}
function RecipesListComponent_Conditional_0_ng_template_5_ng_template_2_Template(rf, ctx) {
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
function RecipesListComponent_Conditional_0_ng_template_5_Template(rf, ctx) {
  if (rf & 1) {
    const _r3 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "lg-import", 11);
    \u0275\u0275pipe(1, "translate");
    \u0275\u0275listener("onDone", function RecipesListComponent_Conditional_0_ng_template_5_Template_lg_import_onDone_0_listener() {
      \u0275\u0275restoreView(_r3);
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.loadRecipes());
    });
    \u0275\u0275template(2, RecipesListComponent_Conditional_0_ng_template_5_ng_template_2_Template, 2, 1, "ng-template", 12);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275property("label", \u0275\u0275pipeBind1(1, 3, "import-label") + " products")("schema", ctx_r1.RecipeScheme)("storeName", ctx_r1.Stores.RECIPES);
  }
}
function RecipesListComponent_Conditional_0_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "lg-controls-bar")(1, "lg-button", 7);
    \u0275\u0275element(2, "mat-icon", 8);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "lg-inline-separated-group");
    \u0275\u0275template(4, RecipesListComponent_Conditional_0_ng_template_4_Template, 3, 7, "ng-template", 9)(5, RecipesListComponent_Conditional_0_ng_template_5_Template, 3, 5, "ng-template", 9);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    \u0275\u0275advance();
    \u0275\u0275styleMap("success");
    \u0275\u0275property("icon", true)("link", "/recipes/add")("size", "medium");
  }
}
function RecipesListComponent_Conditional_8_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "lg-flex-column", 2);
    \u0275\u0275element(1, "lg-grouping-sorting")(2, "lg-selection-tools", 13);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    \u0275\u0275property("size", "medium");
    \u0275\u0275advance(2);
    \u0275\u0275property("selectionTypes", \u0275\u0275pureFunction0(2, _c02));
  }
}
function RecipesListComponent_ng_template_11_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "lg-card")(1, "lg-flex-column")(2, "a", 14);
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "lg-flex-row")(5, "lg-button", 15);
    \u0275\u0275text(6);
    \u0275\u0275pipe(7, "translate");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "small", 16);
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
    \u0275\u0275textInterpolate(recipe_r5.name);
    \u0275\u0275advance(2);
    \u0275\u0275styleMap("primary");
    \u0275\u0275property("flat", true)("link", "/recipes/calculate/" + recipe_r5.uuid)("size", "small");
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind1(7, 10, "recipes.calculate-btn"), " ");
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate2(" ", \u0275\u0275pipeBind1(10, 12, "edited-at-label"), " ", \u0275\u0275pipeBind1(11, 14, (recipe_r5 == null ? null : recipe_r5.updatedAt) || (recipe_r5 == null ? null : recipe_r5.createdAt)), " ");
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
    this._recipesRepository.recipes$.subscribe({
      next: (recipes) => {
        console.log("recipes loaded", recipes);
      },
      error: (err) => {
      }
    });
    this.selectionZoneService.onDelete.pipe(takeUntilDestroyed(this.destroyRef)).subscribe((key) => {
      this.deleteRecipe(key);
    });
  }
  destroyRef = inject(DestroyRef);
  recipes = toSignal(inject(CATEGORIZED_RECIPES_LIST));
  Stores = Stores;
  RecipeScheme = RecipeScheme;
  ngOnInit() {
    this.loadRecipes();
  }
  deleteRecipe(uuid) {
    if (!uuid) {
      return;
    }
    this._recipesRepository.deleteOne(uuid).then(() => {
      this._notificationsService.success("Recipe deleted");
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
  ])], decls: 18, vars: 18, consts: [["groupingTiles", ""], [3, "center"], [3, "size"], [3, "selectable", "sortResult"], ["lgGroupingTile", ""], ["empty-state", "", "position", "center", "size", "medium"], [3, "link", "size"], [3, "icon", "link", "size"], ["aria-hidden", "false", "fontIcon", "add"], ["lgInlineSeparatedGroup", ""], [3, "click", "flat", "size"], [3, "onDone", "label", "schema", "storeName"], ["lgImportRowTpl", ""], [3, "selectionTypes"], [3, "routerLink"], [3, "flat", "link", "size"], ["lgPull", "", 1, "text-muted", "text-cursive"]], template: function RecipesListComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275conditionalCreate(0, RecipesListComponent_Conditional_0_Template, 6, 5, "lg-controls-bar");
      \u0275\u0275elementStart(1, "lg-fade-in")(2, "lg-container")(3, "lg-flex-row", 1)(4, "lg-title");
      \u0275\u0275text(5);
      \u0275\u0275pipe(6, "translate");
      \u0275\u0275elementEnd()();
      \u0275\u0275element(7, "lg-draft-recipes-list");
      \u0275\u0275conditionalCreate(8, RecipesListComponent_Conditional_8_Template, 3, 3, "lg-flex-column", 2);
      \u0275\u0275elementStart(9, "lg-grouping-tiles", 3, 0);
      \u0275\u0275template(11, RecipesListComponent_ng_template_11_Template, 12, 16, "ng-template", 4);
      \u0275\u0275elementStart(12, "lg-flex-column", 5);
      \u0275\u0275text(13);
      \u0275\u0275pipe(14, "translate");
      \u0275\u0275elementStart(15, "lg-button", 6);
      \u0275\u0275text(16);
      \u0275\u0275pipe(17, "translate");
      \u0275\u0275elementEnd()()()()();
    }
    if (rf & 2) {
      const groupingTiles_r6 = \u0275\u0275reference(10);
      \u0275\u0275conditional(!groupingTiles_r6.empty() ? 0 : -1);
      \u0275\u0275advance(3);
      \u0275\u0275property("center", true);
      \u0275\u0275advance(2);
      \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind1(6, 12, "recipes.list-title"), " ");
      \u0275\u0275advance(3);
      \u0275\u0275conditional(!groupingTiles_r6.empty() ? 8 : -1);
      \u0275\u0275advance();
      \u0275\u0275property("selectable", true)("sortResult", ctx.recipes());
      \u0275\u0275advance(4);
      \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind1(14, 14, "recipes.empty-state.text"), " ");
      \u0275\u0275advance(2);
      \u0275\u0275styleMap("success");
      \u0275\u0275property("link", "/recipes/add")("size", "medium");
      \u0275\u0275advance();
      \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind1(17, 16, "recipes.empty-state.btn"), " ");
    }
  }, dependencies: [
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
    CardComponent
  ], styles: ["\n\n[_nghost-%COMP%] {\n  display: block;\n}\n/*# sourceMappingURL=recipes-list.component.css.map */"] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(RecipesListComponent, [{
    type: Component,
    args: [{ selector: "lg-recipes-list", standalone: true, template: `
    @if (!groupingTiles.empty()) {
      <lg-controls-bar>
        <lg-button [icon]="true"
                   [link]="'/recipes/add'"
                   [size]="'medium'"
                   [style]="'success'">
          <mat-icon aria-hidden="false" fontIcon="add"></mat-icon>
        </lg-button>

        <lg-inline-separated-group>
          <ng-template lgInlineSeparatedGroup>
            <lg-button (click)="exportRecipes(selectionZoneService.selected())"
                       [flat]="true"
                       [size]="'small'"
                       [style]="'info'">
              {{ 'export-label'|translate }} recipes
            </lg-button>
          </ng-template>
          <ng-template lgInlineSeparatedGroup>
            <lg-import (onDone)="loadRecipes()"
                       [label]="('import-label'|translate) + ' products'"
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
          </lg-title>
        </lg-flex-row>

        <lg-draft-recipes-list></lg-draft-recipes-list>

        @if (!groupingTiles.empty()) {
          <lg-flex-column [size]="'medium'">
            <lg-grouping-sorting></lg-grouping-sorting>

            <lg-selection-tools [selectionTypes]="['recipe']"></lg-selection-tools>
          </lg-flex-column>
        }

        <lg-grouping-tiles #groupingTiles
                           [selectable]="true"
                           [sortResult]="recipes()">
          <ng-template let-recipe lgGroupingTile>
            <lg-card>
              <lg-flex-column>
                <a [routerLink]="'/recipes/edit/' + recipe.uuid">{{ recipe.name }}</a>

                <lg-flex-row>
                  <lg-button [flat]="true"
                             [link]="'/recipes/calculate/' + recipe.uuid"
                             [size]="'small'"
                             [style]="'primary'">
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
                       [style]="'success'">
              {{ 'recipes.empty-state.btn'|translate }}
            </lg-button>
          </lg-flex-column>
        </lg-grouping-tiles>
      </lg-container>
    </lg-fade-in>
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
      CardComponent
    ], styles: ["/* angular:styles/component:scss;01c1eed413cbcab17b345a4da1b468b4e2a0a4e51bc2f6ee57d46c1ca65a67bb;/Users/khripunovpavel/Documents/my/lasagna/lasagna/src/app/features/recipes/view/list/recipes-list.component.ts */\n:host {\n  display: block;\n}\n/*# sourceMappingURL=recipes-list.component.css.map */\n"] }]
  }], () => [{ type: RecipesRepository }, { type: NotificationsService }, { type: TransferDataService }, { type: SelectionZoneService }], null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(RecipesListComponent, { className: "RecipesListComponent", filePath: "src/app/features/recipes/view/list/recipes-list.component.ts", lineNumber: 162 });
})();
export {
  RecipesListComponent
};
//# sourceMappingURL=chunk-CZK7WFAY.js.map
