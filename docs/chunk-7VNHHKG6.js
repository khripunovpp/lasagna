import {
  DropdownComponent
} from "./chunk-Z3LTI72N.js";
import {
  ImportComponent,
  ImportRowTplDirective
} from "./chunk-TUWXO5WU.js";
import {
  SelectionToolsComponent
} from "./chunk-NTLDDQHV.js";
import {
  GroupSortService
} from "./chunk-MFMKMC64.js";
import {
  GroupingTileDirective,
  GroupingTilesComponent
} from "./chunk-UO3JCBBV.js";
import {
  CardListComponent,
  CardListItemDirective
} from "./chunk-X6OMBN5U.js";
import {
  matchMediaSignal,
  mobileBreakpoint
} from "./chunk-JNKATJIU.js";
import {
  ExpanderComponent
} from "./chunk-QB5ZZ3XF.js";
import {
  PullDirective
} from "./chunk-7OMQICDX.js";
import {
  RecipeScheme
} from "./chunk-B6BXXPI6.js";
import "./chunk-AYB6SB63.js";
import {
  ControlsBarComponent
} from "./chunk-EEM4H4NM.js";
import {
  InlineSeparatedGroupComponent,
  InlineSeparatedGroupDirective
} from "./chunk-VUN3T56G.js";
import "./chunk-IWKECZQN.js";
import "./chunk-SSW253TQ.js";
import {
  ExpandDirective
} from "./chunk-STX6NIUK.js";
import {
  MatIcon
} from "./chunk-MKQIBRI6.js";
import {
  ContainerComponent
} from "./chunk-WON5FF4H.js";
import {
  FlexRowComponent
} from "./chunk-UFJVMPSL.js";
import "./chunk-R64U7JLD.js";
import {
  CardComponent
} from "./chunk-PJDK3IYM.js";
import {
  TimeAgoPipe
} from "./chunk-FDNQMWQM.js";
import {
  CategoryRecipesRepository,
  RecipesRepository,
  TransferDataService
} from "./chunk-WZJWRJIG.js";
import "./chunk-PWIGGAMT.js";
import "./chunk-ETIKHZBE.js";
import "./chunk-IGVRSL6U.js";
import {
  NotificationsService,
  SelectionZoneService
} from "./chunk-JVOZ4YPY.js";
import "./chunk-GRS3SI4M.js";
import {
  Stores
} from "./chunk-7REZCGNQ.js";
import "./chunk-T5CRNY7R.js";
import "./chunk-5WJUMO7X.js";
import {
  FadeInComponent
} from "./chunk-YUWU6IJY.js";
import {
  TitleComponent
} from "./chunk-T6NLT234.js";
import "./chunk-GGH4TL4E.js";
import {
  injectQueryParams,
  takeUntilDestroyed,
  toSignal
} from "./chunk-4GKKNB6P.js";
import {
  ButtonComponent
} from "./chunk-IHCVSUQN.js";
import {
  TranslateDirective,
  TranslatePipe,
  TranslateService
} from "./chunk-KKROIGFS.js";
import {
  ActivatedRoute,
  Router,
  RouterLink
} from "./chunk-UUUEGOMT.js";
import "./chunk-CE7BC4LB.js";
import "./chunk-IWOUTMKL.js";
import {
  FlexColumnComponent
} from "./chunk-3KXU4X6J.js";
import "./chunk-KBRICXTE.js";
import {
  ChangeDetectionStrategy,
  Component,
  ContentChild,
  DestroyRef,
  Directive,
  EventEmitter,
  HostBinding,
  InjectionToken,
  Output,
  TemplateRef,
  computed,
  effect,
  from,
  inject,
  map,
  setClassMetadata,
  shareReplay,
  signal,
  switchMap,
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
} from "./chunk-Z5TNFCCP.js";
import "./chunk-PZQLIUCM.js";
import "./chunk-7YWLATDR.js";
import "./chunk-46DXP6YY.js";

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
  drafts = signal([], ...ngDevMode ? [{ debugName: "drafts" }] : []);
  Stores = Stores;
  get hidden() {
    return this.drafts()?.length === 0 ? true : null;
  }
  ngOnInit() {
    const draft = this._recipesRepository.getDraftRecipe();
    if (draft) {
      this.drafts.set(draft.toSorted((a, b) => {
        const dateA = a.updatedAt || a.createdAt;
        const dateB = b.updatedAt || b.createdAt;
        return dateB - dateA;
      }));
    }
  }
  deleteAllDrafts() {
    this._recipesRepository.removeDraftMany(this.drafts().map((item) => item.uuid)).then(() => {
      this.drafts.set([]);
      this._notificationsService.success("notifications.drafts.deleted");
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
      this._notificationsService.success("notifications.drafts.deleted");
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
    ExpandDirective,
    ExpanderComponent,
    InlineSeparatedGroupComponent,
    InlineSeparatedGroupDirective,
    TimeAgoPipe,
    TranslatePipe
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
  sorting = signal({ field: "name", direction: this.defaultDirection, group: "category" }, ...ngDevMode ? [{ debugName: "sorting" }] : []);
  sortingEffect = effect(() => {
    const sort = this.sorting();
    this.sortChange.emit(sort);
  }, ...ngDevMode ? [{ debugName: "sortingEffect" }] : []);
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
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(GroupingSortingComponent, { className: "GroupingSortingComponent", filePath: "src/app/shared/view/ui/grouping-sorting/grouping-sorting.component.ts", lineNumber: 116 });
})();

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
      window.location.reload();
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
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(RecipesFiltersComponent, { className: "RecipesFiltersComponent", filePath: "src/app/features/recipes/view/list/recipes-filters.component.ts", lineNumber: 56 });
})();

// src/app/features/recipes/view/list/recipes-list.component.ts
var _c02 = (a0) => ({ length: a0 });
var _c1 = () => ["recipe"];
function RecipesListComponent_Conditional_0_ng_template_4_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "lg-button", 13);
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
    \u0275\u0275styleMap("solid");
    \u0275\u0275property("flat", true)("size", "small");
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind1(2, 5, "export-label"), " ");
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
    \u0275\u0275elementStart(0, "lg-import", 14);
    \u0275\u0275pipe(1, "translate");
    \u0275\u0275listener("onDone", function RecipesListComponent_Conditional_0_ng_template_5_Template_lg_import_onDone_0_listener() {
      \u0275\u0275restoreView(_r3);
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.loadRecipes());
    });
    \u0275\u0275template(2, RecipesListComponent_Conditional_0_ng_template_5_ng_template_2_Template, 2, 1, "ng-template", 15);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275property("label", \u0275\u0275pipeBind1(1, 3, "import-label"))("schema", ctx_r1.RecipeScheme)("storeName", ctx_r1.Stores.RECIPES);
  }
}
function RecipesListComponent_Conditional_0_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "lg-controls-bar")(1, "lg-button", 10);
    \u0275\u0275element(2, "mat-icon", 11);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "lg-inline-separated-group");
    \u0275\u0275template(4, RecipesListComponent_Conditional_0_ng_template_4_Template, 3, 7, "ng-template", 12)(5, RecipesListComponent_Conditional_0_ng_template_5_Template, 3, 5, "ng-template", 12);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    \u0275\u0275advance();
    \u0275\u0275styleMap("primary");
    \u0275\u0275property("icon", true)("link", "/recipes/add")("size", "medium");
  }
}
function RecipesListComponent_Conditional_7_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "span", 2);
  }
  if (rf & 2) {
    let tmp_2_0;
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275property("translateParams", \u0275\u0275pureFunction1(2, _c02, (tmp_2_0 = ctx_r1.recipes()) == null ? null : tmp_2_0.length))("translate", "filters.results.length");
  }
}
function RecipesListComponent_Conditional_13_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "lg-selection-tools", 5);
  }
  if (rf & 2) {
    \u0275\u0275property("selectionTypes", \u0275\u0275pureFunction0(1, _c1));
  }
}
function RecipesListComponent_ng_template_16_Template(rf, ctx) {
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
  recipes = toSignal(inject(CATEGORIZED_RECIPES_LIST));
  isMobile = matchMediaSignal(mobileBreakpoint);
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
  ])], decls: 23, vars: 23, consts: [["groupingTiles", ""], [3, "center"], [1, "text-muted", "text-small", 3, "translateParams", "translate"], [3, "size"], [3, "center", "mobileMode", "size"], [3, "selectionTypes"], [3, "selectable", "sortResult"], ["lgGroupingTile", ""], ["empty-state", "", "position", "center", "size", "medium"], [3, "link", "size"], [3, "icon", "link", "size"], ["aria-hidden", "false", "fontIcon", "add"], ["lgInlineSeparatedGroup", ""], [3, "click", "flat", "size"], [3, "onDone", "label", "schema", "storeName"], ["lgImportRowTpl", ""], ["size", "medium"], [3, "routerLink"], [3, "flat", "link", "size"], ["lgPull", "", 1, "text-muted", "text-cursive"]], template: function RecipesListComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275conditionalCreate(0, RecipesListComponent_Conditional_0_Template, 6, 5, "lg-controls-bar");
      \u0275\u0275elementStart(1, "lg-fade-in")(2, "lg-container")(3, "lg-flex-row", 1)(4, "lg-title");
      \u0275\u0275text(5);
      \u0275\u0275pipe(6, "translate");
      \u0275\u0275conditionalCreate(7, RecipesListComponent_Conditional_7_Template, 1, 4, "span", 2);
      \u0275\u0275elementEnd()();
      \u0275\u0275element(8, "lg-draft-recipes-list");
      \u0275\u0275elementStart(9, "lg-flex-column", 3)(10, "lg-flex-row", 4);
      \u0275\u0275element(11, "lg-recipes-filters")(12, "lg-grouping-sorting");
      \u0275\u0275elementEnd();
      \u0275\u0275conditionalCreate(13, RecipesListComponent_Conditional_13_Template, 1, 2, "lg-selection-tools", 5);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(14, "lg-grouping-tiles", 6, 0);
      \u0275\u0275template(16, RecipesListComponent_ng_template_16_Template, 12, 16, "ng-template", 7);
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
      \u0275\u0275property("center", !ctx.isMobile())("mobileMode", true)("size", "medium");
      \u0275\u0275advance(3);
      \u0275\u0275conditional(!groupingTiles_r6.empty() ? 13 : -1);
      \u0275\u0275advance();
      \u0275\u0275property("selectable", true)("sortResult", ctx.recipes());
      \u0275\u0275advance(4);
      \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind1(19, 19, "recipes.empty-state.text"), " ");
      \u0275\u0275advance(2);
      \u0275\u0275styleMap("primary");
      \u0275\u0275property("link", "/recipes/add")("size", "medium");
      \u0275\u0275advance();
      \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind1(22, 21, "recipes.empty-state.btn"), " ");
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
    PullDirective,
    DraftRecipesListComponent,
    InlineSeparatedGroupComponent,
    InlineSeparatedGroupDirective,
    GroupingSortingComponent,
    GroupingTilesComponent,
    GroupingTileDirective,
    FlexColumnComponent,
    CardComponent,
    RecipesFiltersComponent,
    TranslateDirective,
    TimeAgoPipe,
    TranslatePipe
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
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(RecipesListComponent, { className: "RecipesListComponent", filePath: "src/app/features/recipes/view/list/recipes-list.component.ts", lineNumber: 183 });
})();
export {
  RecipesListComponent
};
//# sourceMappingURL=chunk-7VNHHKG6.js.map
