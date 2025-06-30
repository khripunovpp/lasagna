import {
  ExpanderComponent,
  ImportComponent,
  ImportRowTplDirective,
  ProductScheme,
  UnitScheme,
  z
} from "./chunk-R5ULYQ7S.js";
import "./chunk-5YMIC7LN.js";
import {
  ControlsBarComponent,
  SelectionToolsComponent
} from "./chunk-TPTHWRXS.js";
import "./chunk-5P76235D.js";
import "./chunk-T4OVB7QS.js";
import {
  CardListComponent,
  CardListItemDirective
} from "./chunk-BSCLEJ6Z.js";
import {
  CheckboxComponent
} from "./chunk-47THLFJI.js";
import {
  CATEGORIZED_RECIPES_LIST
} from "./chunk-55KMMZYH.js";
import "./chunk-LDP7CF7Y.js";
import {
  PullDirective
} from "./chunk-VV2UI6YY.js";
import {
  InlineSeparatedGroupComponent,
  InlineSeparatedGroupDirective
} from "./chunk-2TWTOV7K.js";
import {
  ExpandDirective
} from "./chunk-MJ7CZNNR.js";
import {
  MatIcon
} from "./chunk-JVNP6C27.js";
import "./chunk-YLXBTOXB.js";
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
import "./chunk-R64U7JLD.js";
import {
  FadeInComponent
} from "./chunk-JNX3I5QY.js";
import "./chunk-HNJAQDA3.js";
import {
  TitleComponent
} from "./chunk-F2TP5Q2W.js";
import {
  RecipesRepository,
  TransferDataService
} from "./chunk-LVU2JMH2.js";
import "./chunk-XLVGBYUT.js";
import {
  ButtonComponent,
  FormControl,
  FormControlDirective,
  NgControlStatus,
  NotificationsService,
  ReactiveFormsModule,
  SelectionZoneService,
  injectQueryParams,
  takeUntilDestroyed,
  toSignal
} from "./chunk-EH6A44OR.js";
import {
  ActivatedRoute,
  Router,
  RouterLink,
  Stores
} from "./chunk-UGLIF2MQ.js";
import "./chunk-Q4M4NLQD.js";
import {
  generateUuid
} from "./chunk-5WJUMO7X.js";
import {
  JsonPipe,
  NgTemplateOutlet
} from "./chunk-5MHPI2FA.js";
import {
  Component,
  ContentChild,
  ContentChildren,
  DestroyRef,
  Directive,
  ElementRef,
  EventEmitter,
  HostBinding,
  HostListener,
  Input,
  Optional,
  Output,
  SkipSelf,
  TemplateRef,
  effect,
  inject,
  input,
  setClassMetadata,
  signal,
  ɵsetClassDebugInfo,
  ɵɵProvidersFeature,
  ɵɵadvance,
  ɵɵattribute,
  ɵɵclassProp,
  ɵɵconditional,
  ɵɵconditionalCreate,
  ɵɵcontentQuery,
  ɵɵdefineComponent,
  ɵɵdefineDirective,
  ɵɵdirectiveInject,
  ɵɵelement,
  ɵɵelementContainer,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵgetCurrentView,
  ɵɵlistener,
  ɵɵloadQuery,
  ɵɵnextContext,
  ɵɵpipe,
  ɵɵpipeBind1,
  ɵɵpipeBind2,
  ɵɵprojection,
  ɵɵprojectionDef,
  ɵɵproperty,
  ɵɵpureFunction0,
  ɵɵpureFunction1,
  ɵɵqueryRefresh,
  ɵɵrepeater,
  ɵɵrepeaterCreate,
  ɵɵrepeaterTrackByIdentity,
  ɵɵresetView,
  ɵɵresolveDocument,
  ɵɵrestoreView,
  ɵɵstyleMap,
  ɵɵtemplate,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1,
  ɵɵtextInterpolate2
} from "./chunk-6AETQSBA.js";
import "./chunk-PZQLIUCM.js";
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
  perUnitPriceModifier: z.object({
    action: z.enum(["add", "subtract", "round"]),
    value: z.number().or(z.string()),
    unit: z.enum(["currency", "percent"])
  }).optional()
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
    \u0275\u0275elementStart(0, "lg-gap-row", 6)(1, "a", 7);
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
  ])], decls: 1, vars: 1, consts: [[3, "closeLabel", "openLabel"], ["lgInlineSeparatedGroup", ""], [2, "--card-bg", "#bee5ff", 3, "onDeleteOne", "onSelected", "mode", "selectAll", "deselectAll"], ["lgCardListItem", "", "type", "draft", 3, "uuid"], [3, "click", "flat", "size"], [3, "click", "flat", "disabled", "size"], [3, "center"], ["lgExpand", "", 3, "routerLink"], [1, "text-muted", "text-cursive"]], template: function DraftRecipesListComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275conditionalCreate(0, DraftRecipesListComponent_Conditional_0_Template, 10, 13, "lg-expander", 0);
    }
    if (rf & 2) {
      let tmp_0_0;
      \u0275\u0275conditional(((tmp_0_0 = ctx.drafts()) == null ? null : tmp_0_0.length) ? 0 : -1);
    }
  }, dependencies: [
    GapRowComponent,
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
        GapRowComponent,
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
                      style="--card-bg: #bee5ff">
          @for (item of drafts(); track item.uuid) {
            <ng-template lgCardListItem [uuid]="item.uuid" type="draft">
              <lg-gap-row [center]="true">
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
              </lg-gap-row>
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

// src/app/shared/view/directives/click-outside.directive.ts
var ClickOutsideDirective = class _ClickOutsideDirective {
  elementRef;
  constructor(elementRef) {
    this.elementRef = elementRef;
  }
  lgClickOutside = new EventEmitter();
  onClick(event) {
    if (!this.elementRef.nativeElement.contains(event.target)) {
      this.lgClickOutside.emit(event);
    }
  }
  static \u0275fac = function ClickOutsideDirective_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _ClickOutsideDirective)(\u0275\u0275directiveInject(ElementRef));
  };
  static \u0275dir = /* @__PURE__ */ \u0275\u0275defineDirective({ type: _ClickOutsideDirective, selectors: [["", "lgClickOutside", ""]], hostBindings: function ClickOutsideDirective_HostBindings(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275listener("click", function ClickOutsideDirective_click_HostBindingHandler($event) {
        return ctx.onClick($event);
      }, \u0275\u0275resolveDocument)("touchstart", function ClickOutsideDirective_touchstart_HostBindingHandler($event) {
        return ctx.onClick($event);
      }, \u0275\u0275resolveDocument)("mousedown", function ClickOutsideDirective_mousedown_HostBindingHandler($event) {
        return ctx.onClick($event);
      }, \u0275\u0275resolveDocument)("mouseup", function ClickOutsideDirective_mouseup_HostBindingHandler($event) {
        return ctx.onClick($event);
      }, \u0275\u0275resolveDocument);
    }
  }, outputs: { lgClickOutside: "lgClickOutside" } });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(ClickOutsideDirective, [{
    type: Directive,
    args: [{
      selector: "[lgClickOutside]",
      standalone: true,
      host: {
        "(document:click)": "onClick($event)",
        "(document:touchstart)": "onClick($event)",
        "(document:mousedown)": "onClick($event)",
        "(document:mouseup)": "onClick($event)"
      }
    }]
  }], () => [{ type: ElementRef }], { lgClickOutside: [{
    type: Output
  }] });
})();

// src/app/shared/view/ui/dropdown/dropdown.component.ts
var _c02 = [[["", "lgDropdownAnchor", ""]], "*"];
var _c1 = ["[lgDropdownAnchor]", "*"];
var DropdownComponent = class _DropdownComponent {
  constructor() {
  }
  display = signal(false);
  onClick(event) {
    event.stopPropagation();
  }
  toggleDropdown() {
    this.display.set(!this.display());
  }
  closeDropdown() {
    this.display.set(false);
  }
  static \u0275fac = function DropdownComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _DropdownComponent)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _DropdownComponent, selectors: [["lg-dropdown"]], hostBindings: function DropdownComponent_HostBindings(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275listener("click", function DropdownComponent_click_HostBindingHandler($event) {
        return ctx.onClick($event);
      });
    }
  }, ngContentSelectors: _c1, decls: 5, vars: 2, consts: [[1, "lg-dropdown", 3, "lgClickOutside"], [1, "lg-dropdown-anchor", 3, "click"], [1, "lg-dropdown-content"]], template: function DropdownComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275projectionDef(_c02);
      \u0275\u0275elementStart(0, "div", 0);
      \u0275\u0275listener("lgClickOutside", function DropdownComponent_Template_div_lgClickOutside_0_listener() {
        return ctx.closeDropdown();
      });
      \u0275\u0275elementStart(1, "div", 1);
      \u0275\u0275listener("click", function DropdownComponent_Template_div_click_1_listener() {
        return ctx.toggleDropdown();
      });
      \u0275\u0275projection(2);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(3, "div", 2);
      \u0275\u0275projection(4, 1);
      \u0275\u0275elementEnd()();
    }
    if (rf & 2) {
      \u0275\u0275classProp("lg-dropdown-open", ctx.display());
    }
  }, dependencies: [ClickOutsideDirective], styles: ["\n\n[_nghost-%COMP%] {\n  display: block;\n  position: relative;\n  z-index: 2;\n}\n.lg-dropdown[_ngcontent-%COMP%] {\n  position: relative;\n  display: inline-block;\n}\n.lg-dropdown-content[_ngcontent-%COMP%] {\n  display: none;\n  position: absolute;\n  top: calc(100% + 8px);\n  background-color: #f9f9f9;\n  min-width: 160px;\n  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);\n  z-index: 1;\n  border-radius: 16px;\n  padding: 16px;\n}\n.lg-dropdown-open[_ngcontent-%COMP%]   .lg-dropdown-content[_ngcontent-%COMP%] {\n  display: block;\n}\n.lg-dropdown-item[_ngcontent-%COMP%] {\n  color: black;\n  padding: 12px 16px;\n  text-decoration: none;\n  display: block;\n}\n.lg-dropdown-item[_ngcontent-%COMP%]:hover {\n  background-color: #f1f1f1;\n}\n/*# sourceMappingURL=dropdown.component.css.map */"] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(DropdownComponent, [{
    type: Component,
    args: [{ selector: "lg-dropdown", standalone: true, template: `
    <div class="lg-dropdown"
         (lgClickOutside)="closeDropdown()"
         [class.lg-dropdown-open]="display()">
      <div class="lg-dropdown-anchor" (click)="toggleDropdown()">
        <ng-content select="[lgDropdownAnchor]"></ng-content>
      </div>

      <div class="lg-dropdown-content">
        <ng-content></ng-content>
      </div>
    </div>
  `, imports: [
      ClickOutsideDirective
    ], styles: ["/* angular:styles/component:scss;c7c86030010025d4ab3486346eafa393469f90b5481ba15b8579779ecc6e5ae7;/Users/khripunovpavel/Documents/my/lasagna/lasagna/src/app/shared/view/ui/dropdown/dropdown.component.ts */\n:host {\n  display: block;\n  position: relative;\n  z-index: 2;\n}\n.lg-dropdown {\n  position: relative;\n  display: inline-block;\n}\n.lg-dropdown-content {\n  display: none;\n  position: absolute;\n  top: calc(100% + 8px);\n  background-color: #f9f9f9;\n  min-width: 160px;\n  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);\n  z-index: 1;\n  border-radius: 16px;\n  padding: 16px;\n}\n.lg-dropdown-open .lg-dropdown-content {\n  display: block;\n}\n.lg-dropdown-item {\n  color: black;\n  padding: 12px 16px;\n  text-decoration: none;\n  display: block;\n}\n.lg-dropdown-item:hover {\n  background-color: #f1f1f1;\n}\n/*# sourceMappingURL=dropdown.component.css.map */\n"] }]
  }], () => [], { onClick: [{
    type: HostListener,
    args: ["click", ["$event"]]
  }] });
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(DropdownComponent, { className: "DropdownComponent", filePath: "src/app/shared/view/ui/dropdown/dropdown.component.ts", lineNumber: 63 });
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
  constructor() {
  }
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
  static \u0275fac = function GroupingSortingComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _GroupingSortingComponent)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _GroupingSortingComponent, selectors: [["lg-grouping-sorting"]], contentQueries: function GroupingSortingComponent_ContentQueries(rf, ctx, dirIndex) {
    if (rf & 1) {
      \u0275\u0275contentQuery(dirIndex, GroupingSortingContainerComponent, 5);
    }
    if (rf & 2) {
      let _t;
      \u0275\u0275queryRefresh(_t = \u0275\u0275loadQuery()) && (ctx.context = _t.first);
    }
  }, outputs: { sortChange: "sortChange", groupChange: "groupChange" }, decls: 29, vars: 41, consts: [["lgDropdownAnchor", "", 3, "size"], [3, "size"], [3, "click", "size", "flat"]], template: function GroupingSortingComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "lg-gap-row")(1, "lg-dropdown")(2, "lg-button", 0);
      \u0275\u0275text(3);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(4, "lg-gap-column", 1)(5, "lg-button", 2);
      \u0275\u0275listener("click", function GroupingSortingComponent_Template_lg_button_click_5_listener() {
        return ctx.onSortChange({ group: "category" });
      });
      \u0275\u0275text(6, " Category ");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(7, "lg-button", 2);
      \u0275\u0275listener("click", function GroupingSortingComponent_Template_lg_button_click_7_listener() {
        return ctx.onSortChange({ group: "tag" });
      });
      \u0275\u0275text(8, " Tag ");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(9, "lg-button", 2);
      \u0275\u0275listener("click", function GroupingSortingComponent_Template_lg_button_click_9_listener() {
        return ctx.onSortChange({ group: "createdAt" });
      });
      \u0275\u0275text(10, " Date ");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(11, "lg-button", 2);
      \u0275\u0275listener("click", function GroupingSortingComponent_Template_lg_button_click_11_listener() {
        return ctx.onSortChange({ group: "alphabetical" });
      });
      \u0275\u0275text(12, " Alphabetical ");
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(13, "lg-dropdown")(14, "lg-button", 0);
      \u0275\u0275text(15);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(16, "lg-gap-column", 1)(17, "lg-button", 2);
      \u0275\u0275listener("click", function GroupingSortingComponent_Template_lg_button_click_17_listener() {
        return ctx.onSortChange({ field: "name" });
      });
      \u0275\u0275text(18, " Name ");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(19, "lg-button", 2);
      \u0275\u0275listener("click", function GroupingSortingComponent_Template_lg_button_click_19_listener() {
        return ctx.onSortChange({ field: "createdAt" });
      });
      \u0275\u0275text(20, " Date ");
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(21, "lg-dropdown")(22, "lg-button", 0);
      \u0275\u0275text(23);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(24, "lg-gap-column", 1)(25, "lg-button", 2);
      \u0275\u0275listener("click", function GroupingSortingComponent_Template_lg_button_click_25_listener() {
        return ctx.onSortChange({ direction: "asc" });
      });
      \u0275\u0275text(26, " Ascending ");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(27, "lg-button", 2);
      \u0275\u0275listener("click", function GroupingSortingComponent_Template_lg_button_click_27_listener() {
        return ctx.onSortChange({ direction: "desc" });
      });
      \u0275\u0275text(28, " Descending ");
      \u0275\u0275elementEnd()()()();
    }
    if (rf & 2) {
      \u0275\u0275advance(2);
      \u0275\u0275property("size", "small");
      \u0275\u0275advance();
      \u0275\u0275textInterpolate1(" Group by: ", ctx.sorting().group, " ");
      \u0275\u0275advance();
      \u0275\u0275property("size", "small");
      \u0275\u0275advance();
      \u0275\u0275styleMap("warning");
      \u0275\u0275property("size", "small")("flat", true);
      \u0275\u0275advance(2);
      \u0275\u0275styleMap("warning");
      \u0275\u0275property("size", "small")("flat", true);
      \u0275\u0275advance(2);
      \u0275\u0275styleMap("warning");
      \u0275\u0275property("size", "small")("flat", true);
      \u0275\u0275advance(2);
      \u0275\u0275styleMap("warning");
      \u0275\u0275property("size", "small")("flat", true);
      \u0275\u0275advance(3);
      \u0275\u0275property("size", "small");
      \u0275\u0275advance();
      \u0275\u0275textInterpolate1(" Sort by: ", ctx.sorting().field, " ");
      \u0275\u0275advance();
      \u0275\u0275property("size", "small");
      \u0275\u0275advance();
      \u0275\u0275styleMap("warning");
      \u0275\u0275property("size", "small")("flat", true);
      \u0275\u0275advance(2);
      \u0275\u0275styleMap("warning");
      \u0275\u0275property("size", "small")("flat", true);
      \u0275\u0275advance(3);
      \u0275\u0275property("size", "small");
      \u0275\u0275advance();
      \u0275\u0275textInterpolate1(" Sort direction: ", ctx.sorting().direction, " ");
      \u0275\u0275advance();
      \u0275\u0275property("size", "small");
      \u0275\u0275advance();
      \u0275\u0275styleMap("warning");
      \u0275\u0275property("size", "small")("flat", true);
      \u0275\u0275advance(2);
      \u0275\u0275styleMap("warning");
      \u0275\u0275property("size", "small")("flat", true);
    }
  }, dependencies: [
    GapRowComponent,
    ButtonComponent,
    DropdownComponent,
    GapColumnComponent
  ], encapsulation: 2 });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(GroupingSortingComponent, [{
    type: Component,
    args: [{
      selector: "lg-grouping-sorting",
      standalone: true,
      imports: [
        GapRowComponent,
        ButtonComponent,
        DropdownComponent,
        GapColumnComponent
      ],
      template: `
    <lg-gap-row>
      <lg-dropdown>
        <lg-button lgDropdownAnchor [size]="'small'">
          Group by: {{ sorting().group }}
        </lg-button>

        <lg-gap-column [size]="'small'">
          <lg-button [size]="'small'"
                     (click)="onSortChange({group: 'category'})"
                     [style]="'warning'"
                     [flat]="true">
            Category
          </lg-button>

          <lg-button [size]="'small'"
                     (click)="onSortChange({group: 'tag'})"
                     [style]="'warning'"
                     [flat]="true">
            Tag
          </lg-button>

          <lg-button [size]="'small'"
                     [style]="'warning'"
                     (click)="onSortChange({group: 'createdAt'})"
                     [flat]="true">
            Date
          </lg-button>

          <lg-button [size]="'small'"
                     [style]="'warning'"
                     (click)="onSortChange({group: 'alphabetical'})"
                     [flat]="true">
            Alphabetical
          </lg-button>
        </lg-gap-column>
      </lg-dropdown>

      <lg-dropdown>
        <lg-button [size]="'small'" lgDropdownAnchor>
          Sort by: {{ sorting().field }}
        </lg-button>

        <lg-gap-column [size]="'small'">
          <lg-button [size]="'small'"
                     (click)="onSortChange({field: 'name'})"
                     [style]="'warning'"
                     [flat]="true">
            Name
          </lg-button>

          <lg-button [size]="'small'"
                     (click)="onSortChange({field: 'createdAt'})"
                     [style]="'warning'"
                     [flat]="true">
            Date
          </lg-button>
        </lg-gap-column>
      </lg-dropdown>

      <lg-dropdown>
        <lg-button [size]="'small'" lgDropdownAnchor>
          Sort direction: {{ sorting().direction }}
        </lg-button>

        <lg-gap-column [size]="'small'">
          <lg-button [size]="'small'"
                     (click)="onSortChange({direction: 'asc'})"
                     [style]="'warning'"
                     [flat]="true">
            Ascending
          </lg-button>

          <lg-button [size]="'small'"
                     (click)="onSortChange({direction: 'desc'})"
                     [style]="'warning'"
                     [flat]="true">
            Descending
          </lg-button>
        </lg-gap-column>
      </lg-dropdown>
    </lg-gap-row>
  `
    }]
  }], () => [], { context: [{
    type: ContentChild,
    args: [GroupingSortingContainerComponent]
  }], sortChange: [{
    type: Output
  }], groupChange: [{
    type: Output
  }] });
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(GroupingSortingComponent, { className: "GroupingSortingComponent", filePath: "src/app/shared/view/ui/grouping-sorting/grouping-sorting.component.ts", lineNumber: 103 });
})();

// src/app/shared/view/ui/grouping-tails/grouping-tail.directive.ts
var GroupingTailDirective = class _GroupingTailDirective {
  templateRef;
  constructor(templateRef) {
    this.templateRef = templateRef;
  }
  static \u0275fac = function GroupingTailDirective_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _GroupingTailDirective)(\u0275\u0275directiveInject(TemplateRef));
  };
  static \u0275dir = /* @__PURE__ */ \u0275\u0275defineDirective({ type: _GroupingTailDirective, selectors: [["", "lgGroupingTail", ""]] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(GroupingTailDirective, [{
    type: Directive,
    args: [{
      selector: "[lgGroupingTail]",
      standalone: true
    }]
  }], () => [{ type: TemplateRef }], null);
})();

// src/app/shared/view/ui/selectable-section.component.ts
var _c03 = ["*"];
function SelectableSectionComponent_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "lg-checkbox", 4);
    \u0275\u0275listener("onCheckboxChanged", function SelectableSectionComponent_Conditional_1_Template_lg_checkbox_onCheckboxChanged_0_listener($event) {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.onChanges($event));
    });
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275property("size", "medium")("formControl", ctx_r1.selected)("value", ctx_r1.key());
  }
}
function SelectableSectionComponent_Conditional_4_Template(rf, ctx) {
  if (rf & 1) {
    const _r3 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "lg-button", 5);
    \u0275\u0275listener("click", function SelectableSectionComponent_Conditional_4_Template_lg_button_click_0_listener() {
      \u0275\u0275restoreView(_r3);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.selectionZoneService.putDelete(ctx_r1.key()));
    });
    \u0275\u0275element(1, "mat-icon", 6);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    \u0275\u0275styleMap("danger");
    \u0275\u0275property("size", "tiny")("icon", true);
  }
}
var SelectableSectionComponent = class _SelectableSectionComponent {
  selectionZoneService;
  constructor(selectionZoneService) {
    this.selectionZoneService = selectionZoneService;
  }
  key = input(generateUuid());
  items;
  selected = new FormControl();
  effectMode = effect(() => {
    if (this.selectionZoneService.selectionMode()) {
      this.selected.reset();
    }
  });
  effectSelectAll = effect(() => {
    if (this.selectionZoneService.selectAll()) {
      this.selected.setValue(true);
    } else if (this.selectionZoneService.deselectAll()) {
      this.selected.setValue(false);
    }
  });
  onChanges(event) {
    this.selectionZoneService.putSelected([!!event, this.key()]);
  }
  static \u0275fac = function SelectableSectionComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _SelectableSectionComponent)(\u0275\u0275directiveInject(SelectionZoneService, 12));
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _SelectableSectionComponent, selectors: [["lg-selectable-section"]], contentQueries: function SelectableSectionComponent_ContentQueries(rf, ctx, dirIndex) {
    if (rf & 1) {
      \u0275\u0275contentQuery(dirIndex, CardListItemDirective, 4);
    }
    if (rf & 2) {
      let _t;
      \u0275\u0275queryRefresh(_t = \u0275\u0275loadQuery()) && (ctx.items = _t);
    }
  }, inputs: { key: [1, "key"] }, ngContentSelectors: _c03, decls: 5, vars: 2, consts: [[1, "lg-selectable-section"], [3, "size", "formControl", "value"], [1, "lg-selectable-section__inner"], [3, "style", "size", "icon"], [3, "onCheckboxChanged", "size", "formControl", "value"], [3, "click", "size", "icon"], ["aria-hidden", "false", "fontIcon", "close"]], template: function SelectableSectionComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275projectionDef();
      \u0275\u0275elementStart(0, "section", 0);
      \u0275\u0275conditionalCreate(1, SelectableSectionComponent_Conditional_1_Template, 1, 3, "lg-checkbox", 1);
      \u0275\u0275elementStart(2, "div", 2);
      \u0275\u0275projection(3);
      \u0275\u0275elementEnd();
      \u0275\u0275conditionalCreate(4, SelectableSectionComponent_Conditional_4_Template, 2, 4, "lg-button", 3);
      \u0275\u0275elementEnd();
    }
    if (rf & 2) {
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.selectionZoneService.selectionMode() === "selection" ? 1 : -1);
      \u0275\u0275advance(3);
      \u0275\u0275conditional(ctx.selectionZoneService.selectionMode() === "selection" ? 4 : -1);
    }
  }, dependencies: [
    ReactiveFormsModule,
    NgControlStatus,
    FormControlDirective,
    CheckboxComponent,
    ButtonComponent,
    MatIcon
  ], styles: ["\n\n.lg-checkbox[_ngcontent-%COMP%] {\n  --control-bg: #abc2ff;\n  --control-bg-selected: #abc2ff;\n}\n.lg-selectable-section[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 8px;\n  align-items: center;\n}\n/*# sourceMappingURL=selectable-section.component.css.map */"] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(SelectableSectionComponent, [{
    type: Component,
    args: [{ selector: "lg-selectable-section", standalone: true, template: `
    <section class="lg-selectable-section">
      @if (selectionZoneService.selectionMode() === 'selection') {
        <lg-checkbox [size]="'medium'"
                     [formControl]="selected"
                     [value]="key()"
                     (onCheckboxChanged)="onChanges($event)"></lg-checkbox>
      }
      <div class="lg-selectable-section__inner">
        <ng-content></ng-content>
      </div>
      @if (selectionZoneService.selectionMode() === 'selection') {
        <lg-button [style]="'danger'"
                   [size]="'tiny'"
                   [icon]="true"
                   (click)="selectionZoneService.putDelete(key())">
          <mat-icon aria-hidden="false"
                    fontIcon="close"></mat-icon>
        </lg-button>
      }
    </section>
  `, imports: [
      ReactiveFormsModule,
      CheckboxComponent,
      ButtonComponent,
      MatIcon
    ], styles: ["/* angular:styles/component:scss;9a30e204f1250a95fc53faad9a0810292c8ef53eaa3d2318db57ac5106213253;/Users/khripunovpavel/Documents/my/lasagna/lasagna/src/app/shared/view/ui/selectable-section.component.ts */\n.lg-checkbox {\n  --control-bg: #abc2ff;\n  --control-bg-selected: #abc2ff;\n}\n.lg-selectable-section {\n  display: flex;\n  gap: 8px;\n  align-items: center;\n}\n/*# sourceMappingURL=selectable-section.component.css.map */\n"] }]
  }], () => [{ type: SelectionZoneService, decorators: [{
    type: Optional
  }, {
    type: SkipSelf
  }] }], { items: [{
    type: ContentChildren,
    args: [CardListItemDirective]
  }] });
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(SelectableSectionComponent, { className: "SelectableSectionComponent", filePath: "src/app/shared/view/ui/selectable-section.component.ts", lineNumber: 61 });
})();

// src/app/shared/view/ui/grouping-tails/grouping-tails.component.ts
var _c04 = (a0) => ({ $implicit: a0 });
var _forTrack02 = ($index, $item) => $item == null ? null : $item.field;
function GroupingTailsComponent_For_2_For_6_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 5)(1, "lg-selectable-section", 6)(2, "div", 7);
    \u0275\u0275elementContainer(3, 8);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const tail_r1 = ctx.$implicit;
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275property("key", tail_r1.uuid);
    \u0275\u0275advance(2);
    \u0275\u0275property("ngTemplateOutlet", ctx_r1.groupingTailDirective.templateRef)("ngTemplateOutletContext", \u0275\u0275pureFunction1(3, _c04, tail_r1));
  }
}
function GroupingTailsComponent_For_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "section", 1)(1, "header", 2)(2, "lg-title", 3);
    \u0275\u0275text(3);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(4, "div", 4);
    \u0275\u0275repeaterCreate(5, GroupingTailsComponent_For_2_For_6_Template, 4, 5, "div", 5, \u0275\u0275repeaterTrackByIdentity);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const group_r3 = ctx.$implicit;
    \u0275\u0275advance(2);
    \u0275\u0275property("level", 3);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", (group_r3 == null ? null : group_r3.field) || "Unknown", " ");
    \u0275\u0275advance(2);
    \u0275\u0275repeater(group_r3 == null ? null : group_r3.items);
  }
}
var GroupingTailsComponent = class _GroupingTailsComponent {
  selectionZoneService;
  constructor(selectionZoneService) {
    this.selectionZoneService = selectionZoneService;
  }
  sortResult;
  groupingTailDirective;
  static \u0275fac = function GroupingTailsComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _GroupingTailsComponent)(\u0275\u0275directiveInject(SelectionZoneService, 8));
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _GroupingTailsComponent, selectors: [["lg-grouping-tails"]], contentQueries: function GroupingTailsComponent_ContentQueries(rf, ctx, dirIndex) {
    if (rf & 1) {
      \u0275\u0275contentQuery(dirIndex, GroupingTailDirective, 5);
    }
    if (rf & 2) {
      let _t;
      \u0275\u0275queryRefresh(_t = \u0275\u0275loadQuery()) && (ctx.groupingTailDirective = _t.first);
    }
  }, inputs: { sortResult: "sortResult" }, decls: 3, vars: 0, consts: [[1, "grouping-tails"], [1, "grouping-tails__section"], [1, "grouping-tails__header"], [3, "level"], [1, "grouping-tails__content"], [1, "grouping-tails__item"], [3, "key"], [1, "grouping-tails__item-inner"], [3, "ngTemplateOutlet", "ngTemplateOutletContext"]], template: function GroupingTailsComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "section", 0);
      \u0275\u0275repeaterCreate(1, GroupingTailsComponent_For_2_Template, 7, 2, "section", 1, _forTrack02);
      \u0275\u0275elementEnd();
    }
    if (rf & 2) {
      \u0275\u0275advance();
      \u0275\u0275repeater(ctx.sortResult == null ? null : ctx.sortResult.groups);
    }
  }, dependencies: [
    TitleComponent,
    NgTemplateOutlet,
    SelectableSectionComponent
  ], styles: ["\n\n.grouping-tails[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 32px;\n}\n.grouping-tails__section[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 24px;\n}\n.grouping-tails__content[_ngcontent-%COMP%] {\n  display: flex;\n  flex-wrap: wrap;\n  gap: 16px;\n}\n.grouping-tails__item[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 16px;\n}\n.grouping-tails__item-inner[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 16px;\n  padding: 16px;\n  border-radius: 32px;\n  background-color: #fff;\n}\n/*# sourceMappingURL=grouping-tails.component.css.map */"] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(GroupingTailsComponent, [{
    type: Component,
    args: [{ selector: "lg-grouping-tails", standalone: true, template: `
    <section class="grouping-tails">
      @for (group of sortResult?.groups; track group?.field) {
        <section class="grouping-tails__section">
          <header class="grouping-tails__header">
            <lg-title [level]="3">
              {{ group?.field || 'Unknown' }}
            </lg-title>
          </header>

          <div class="grouping-tails__content">
            @for (tail of group?.items; track tail) {
              <div class="grouping-tails__item">
                <lg-selectable-section [key]="tail.uuid">
                  <div class="grouping-tails__item-inner">
                    <ng-container [ngTemplateOutlet]="groupingTailDirective!.templateRef"
                                  [ngTemplateOutletContext]="{ $implicit: tail }">
                    </ng-container>
                  </div>
                </lg-selectable-section>
              </div>
            }
          </div>
        </section>
      }
    </section>
  `, imports: [
      TitleComponent,
      NgTemplateOutlet,
      SelectableSectionComponent
    ], styles: ["/* angular:styles/component:scss;fe09daaddc61512983cf7b11edc269f3a6c5b295a1848f830d87ce56f53cb008;/Users/khripunovpavel/Documents/my/lasagna/lasagna/src/app/shared/view/ui/grouping-tails/grouping-tails.component.ts */\n.grouping-tails {\n  display: flex;\n  flex-direction: column;\n  gap: 32px;\n}\n.grouping-tails__section {\n  display: flex;\n  flex-direction: column;\n  gap: 24px;\n}\n.grouping-tails__content {\n  display: flex;\n  flex-wrap: wrap;\n  gap: 16px;\n}\n.grouping-tails__item {\n  display: flex;\n  align-items: center;\n  gap: 16px;\n}\n.grouping-tails__item-inner {\n  display: flex;\n  align-items: center;\n  gap: 16px;\n  padding: 16px;\n  border-radius: 32px;\n  background-color: #fff;\n}\n/*# sourceMappingURL=grouping-tails.component.css.map */\n"] }]
  }], () => [{ type: SelectionZoneService, decorators: [{
    type: Optional
  }] }], { sortResult: [{
    type: Input
  }], groupingTailDirective: [{
    type: ContentChild,
    args: [GroupingTailDirective]
  }] });
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(GroupingTailsComponent, { className: "GroupingTailsComponent", filePath: "src/app/shared/view/ui/grouping-tails/grouping-tails.component.ts", lineNumber: 82 });
})();

// src/app/features/recipes/view/list/recipes-list.component.ts
var _c05 = () => ["recipe"];
function RecipesListComponent_ng_template_4_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "lg-button", 8);
    \u0275\u0275listener("click", function RecipesListComponent_ng_template_4_Template_lg_button_click_0_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
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
function RecipesListComponent_ng_template_5_ng_template_2_Template(rf, ctx) {
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
function RecipesListComponent_ng_template_5_Template(rf, ctx) {
  if (rf & 1) {
    const _r3 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "lg-import", 9);
    \u0275\u0275pipe(1, "translate");
    \u0275\u0275listener("onDone", function RecipesListComponent_ng_template_5_Template_lg_import_onDone_0_listener() {
      \u0275\u0275restoreView(_r3);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.loadRecipes());
    });
    \u0275\u0275template(2, RecipesListComponent_ng_template_5_ng_template_2_Template, 2, 1, "ng-template", 10);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275property("label", \u0275\u0275pipeBind1(1, 3, "import-label") + " products")("schema", ctx_r1.RecipeScheme)("storeName", ctx_r1.Stores.RECIPES);
  }
}
function RecipesListComponent_ng_template_17_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "lg-gap-column")(1, "a", 11);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "lg-gap-row")(4, "lg-button", 12);
    \u0275\u0275text(5);
    \u0275\u0275pipe(6, "translate");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "small", 13);
    \u0275\u0275text(8);
    \u0275\u0275pipe(9, "translate");
    \u0275\u0275pipe(10, "timeAgo");
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const recipe_r5 = ctx.$implicit;
    \u0275\u0275advance();
    \u0275\u0275property("routerLink", "/recipes/edit/" + recipe_r5.uuid);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(recipe_r5.name);
    \u0275\u0275advance(2);
    \u0275\u0275styleMap("primary");
    \u0275\u0275property("size", "small")("link", "/recipes/calculate/" + recipe_r5.uuid)("flat", true);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind1(6, 10, "recipes.calculate-btn"), " ");
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate2(" ", \u0275\u0275pipeBind1(9, 12, "edited-at-label"), " ", \u0275\u0275pipeBind1(10, 14, (recipe_r5 == null ? null : recipe_r5.updatedAt) || (recipe_r5 == null ? null : recipe_r5.createdAt)), " ");
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
  ])], decls: 18, vars: 13, consts: [[3, "icon", "link", "size"], ["aria-hidden", "false", "fontIcon", "add"], ["lgInlineSeparatedGroup", ""], [3, "center"], [3, "size"], [3, "selectionTypes"], [3, "sortResult"], ["lgGroupingTail", ""], [3, "click", "flat", "size"], [3, "onDone", "label", "schema", "storeName"], ["lgImportRowTpl", ""], [3, "routerLink"], [3, "size", "link", "flat"], ["lgPull", "", 1, "text-muted", "text-cursive"]], template: function RecipesListComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "lg-controls-bar")(1, "lg-button", 0);
      \u0275\u0275element(2, "mat-icon", 1);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(3, "lg-inline-separated-group");
      \u0275\u0275template(4, RecipesListComponent_ng_template_4_Template, 3, 7, "ng-template", 2)(5, RecipesListComponent_ng_template_5_Template, 3, 5, "ng-template", 2);
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(6, "lg-fade-in")(7, "lg-container")(8, "lg-gap-row", 3)(9, "lg-title");
      \u0275\u0275text(10);
      \u0275\u0275pipe(11, "translate");
      \u0275\u0275elementEnd()();
      \u0275\u0275element(12, "lg-draft-recipes-list");
      \u0275\u0275elementStart(13, "lg-gap-column", 4);
      \u0275\u0275element(14, "lg-grouping-sorting")(15, "lg-selection-tools", 5);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(16, "lg-grouping-tails", 6);
      \u0275\u0275template(17, RecipesListComponent_ng_template_17_Template, 11, 16, "ng-template", 7);
      \u0275\u0275elementEnd()()();
    }
    if (rf & 2) {
      \u0275\u0275advance();
      \u0275\u0275styleMap("success");
      \u0275\u0275property("icon", true)("link", "/recipes/add")("size", "medium");
      \u0275\u0275advance(7);
      \u0275\u0275property("center", true);
      \u0275\u0275advance(2);
      \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind1(11, 10, "recipes.list-title"), " ");
      \u0275\u0275advance(3);
      \u0275\u0275property("size", "medium");
      \u0275\u0275advance(2);
      \u0275\u0275property("selectionTypes", \u0275\u0275pureFunction0(12, _c05));
      \u0275\u0275advance();
      \u0275\u0275property("sortResult", ctx.recipes());
    }
  }, dependencies: [
    GapRowComponent,
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
    GroupingTailsComponent,
    GroupingTailDirective,
    GapColumnComponent
  ], styles: ["\n\n[_nghost-%COMP%] {\n  display: block;\n}\n/*# sourceMappingURL=recipes-list.component.css.map */"] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(RecipesListComponent, [{
    type: Component,
    args: [{ selector: "lg-recipes-list", standalone: true, template: `
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

    <lg-fade-in>
      <lg-container>
        <lg-gap-row [center]="true">
          <lg-title>
            {{ 'recipes.list-title'|translate }}
          </lg-title>
        </lg-gap-row>

        <lg-draft-recipes-list></lg-draft-recipes-list>

        <lg-gap-column [size]="'medium'">
          <lg-grouping-sorting></lg-grouping-sorting>

          <lg-selection-tools [selectionTypes]="['recipe']"></lg-selection-tools>
        </lg-gap-column>

        <lg-grouping-tails [sortResult]="recipes()">
          <ng-template lgGroupingTail let-recipe>
            <lg-gap-column>
              <a [routerLink]="'/recipes/edit/' + recipe.uuid">{{ recipe.name }}</a>

              <lg-gap-row>
                <lg-button [style]="'primary'"
                           [size]="'small'"
                           [link]="'/recipes/calculate/' + recipe.uuid"
                           [flat]="true">
                  {{ 'recipes.calculate-btn'|translate }}
                </lg-button>

                <small class="text-muted text-cursive" lgPull>
                  {{ 'edited-at-label'|translate }} {{ (recipe?.updatedAt || recipe?.createdAt) | timeAgo }}
                </small>
              </lg-gap-row>
            </lg-gap-column>
          </ng-template>
        </lg-grouping-tails>
      </lg-container>
    </lg-fade-in>
  `, providers: [
      SelectionZoneService
    ], imports: [
      GapRowComponent,
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
      GroupingTailsComponent,
      GroupingTailDirective,
      GapColumnComponent,
      JsonPipe
    ], styles: ["/* angular:styles/component:scss;01c1eed413cbcab17b345a4da1b468b4e2a0a4e51bc2f6ee57d46c1ca65a67bb;/Users/khripunovpavel/Documents/my/lasagna/lasagna/src/app/features/recipes/view/list/recipes-list.component.ts */\n:host {\n  display: block;\n}\n/*# sourceMappingURL=recipes-list.component.css.map */\n"] }]
  }], () => [{ type: RecipesRepository }, { type: NotificationsService }, { type: TransferDataService }, { type: SelectionZoneService }], null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(RecipesListComponent, { className: "RecipesListComponent", filePath: "src/app/features/recipes/view/list/recipes-list.component.ts", lineNumber: 140 });
})();
export {
  RecipesListComponent
};
//# sourceMappingURL=chunk-EWNZLAQV.js.map
