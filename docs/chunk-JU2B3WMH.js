import {
  CardListItemDirective
} from "./chunk-TKD52FJJ.js";
import {
  CheckboxComponent
} from "./chunk-ZVJRZSZB.js";
import {
  MatIcon
} from "./chunk-INPR6HOC.js";
import {
  SelectionZoneService
} from "./chunk-5PDR5QLJ.js";
import {
  generateUuid
} from "./chunk-5WJUMO7X.js";
import {
  TitleComponent
} from "./chunk-6N7S7ZFR.js";
import {
  FormControl,
  FormControlDirective,
  NgControlStatus,
  ReactiveFormsModule,
  injectFragment
} from "./chunk-RTCNHMN6.js";
import {
  ButtonComponent
} from "./chunk-X7NFO2XP.js";
import {
  TranslateService
} from "./chunk-DXRFKXPR.js";
import {
  Router
} from "./chunk-SHM3W5T3.js";
import {
  NgTemplateOutlet,
  ViewportScroller
} from "./chunk-7I2CR6I6.js";
import {
  Component,
  ContentChildren,
  Directive,
  Optional,
  SkipSelf,
  TemplateRef,
  afterNextRender,
  computed,
  contentChild,
  effect,
  input,
  output,
  setClassMetadata,
  signal,
  viewChild,
  ɵsetClassDebugInfo,
  ɵɵadvance,
  ɵɵattribute,
  ɵɵclassProp,
  ɵɵconditional,
  ɵɵconditionalCreate,
  ɵɵcontentQuery,
  ɵɵcontentQuerySignal,
  ɵɵdeclareLet,
  ɵɵdefineComponent,
  ɵɵdefineDirective,
  ɵɵdirectiveInject,
  ɵɵdomElementEnd,
  ɵɵdomElementStart,
  ɵɵdomListener,
  ɵɵdomProperty,
  ɵɵelement,
  ɵɵelementContainer,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵgetCurrentView,
  ɵɵlistener,
  ɵɵloadQuery,
  ɵɵnextContext,
  ɵɵprojection,
  ɵɵprojectionDef,
  ɵɵproperty,
  ɵɵpureFunction1,
  ɵɵpureFunction3,
  ɵɵqueryAdvance,
  ɵɵqueryRefresh,
  ɵɵreadContextLet,
  ɵɵreference,
  ɵɵrepeater,
  ɵɵrepeaterCreate,
  ɵɵresetView,
  ɵɵrestoreView,
  ɵɵstoreLet,
  ɵɵstyleMap,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1,
  ɵɵviewQuerySignal
} from "./chunk-RQATVJ2P.js";

// src/app/shared/view/ui/grouping-tiles/grouping-tile.directive.ts
var GroupingTileDirective = class _GroupingTileDirective {
  templateRef;
  constructor(templateRef) {
    this.templateRef = templateRef;
  }
  static \u0275fac = function GroupingTileDirective_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _GroupingTileDirective)(\u0275\u0275directiveInject(TemplateRef));
  };
  static \u0275dir = /* @__PURE__ */ \u0275\u0275defineDirective({ type: _GroupingTileDirective, selectors: [["", "lgGroupingTile", ""]] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(GroupingTileDirective, [{
    type: Directive,
    args: [{
      selector: "[lgGroupingTile]",
      standalone: true
    }]
  }], () => [{ type: TemplateRef }], null);
})();

// src/app/shared/view/ui/selectable-section.component.ts
var _c0 = ["*"];
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
      return \u0275\u0275resetView(ctx_r1.selectionZoneService.putDelete(ctx_r1.key(), ctx_r1.data()));
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
  key = input(generateUuid(), ...ngDevMode ? [{ debugName: "key" }] : []);
  data = input(null, ...ngDevMode ? [{ debugName: "data" }] : []);
  items;
  selected = new FormControl();
  effectMode = effect(() => {
    if (this.selectionZoneService.selectionMode()) {
      this.selected.reset();
    }
  }, ...ngDevMode ? [{ debugName: "effectMode" }] : []);
  effectSelectAll = effect(() => {
    if (this.selectionZoneService.selectAll()) {
      this.selected.setValue(true);
    } else if (this.selectionZoneService.deselectAll()) {
      this.selected.setValue(false);
    }
  }, ...ngDevMode ? [{ debugName: "effectSelectAll" }] : []);
  onChanges(event) {
    this.selectionZoneService.putSelected([!!event, this.key(), this.data()]);
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
  }, inputs: { key: [1, "key"], data: [1, "data"] }, ngContentSelectors: _c0, decls: 5, vars: 2, consts: [[1, "lg-selectable-section"], [3, "size", "formControl", "value"], [1, "lg-selectable-section__inner"], [3, "style", "size", "icon"], [3, "onCheckboxChanged", "size", "formControl", "value"], [3, "click", "size", "icon"], ["aria-hidden", "false", "fontIcon", "close"]], template: function SelectableSectionComponent_Template(rf, ctx) {
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
                   (click)="selectionZoneService.putDelete(key(),data())">
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

// src/app/shared/view/ui/grouping-tiles/grouping-header.directive.ts
var GroupingHeaderDirective = class _GroupingHeaderDirective {
  templateRef;
  constructor(templateRef) {
    this.templateRef = templateRef;
  }
  static \u0275fac = function GroupingHeaderDirective_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _GroupingHeaderDirective)(\u0275\u0275directiveInject(TemplateRef));
  };
  static \u0275dir = /* @__PURE__ */ \u0275\u0275defineDirective({ type: _GroupingHeaderDirective, selectors: [["", "lgGroupingHeader", ""]] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(GroupingHeaderDirective, [{
    type: Directive,
    args: [{
      selector: "[lgGroupingHeader]",
      standalone: true
    }]
  }], () => [{ type: TemplateRef }], null);
})();

// src/app/shared/view/ui/grouping-tiles/grouping-tiles.component.ts
var _c02 = [[["", "empty-state", ""]]];
var _c1 = ["[empty-state]"];
var _c2 = (a0, a1, a2) => ({ $implicit: a0, items: a1, collapsed: a2 });
var _c3 = (a0) => ({ $implicit: a0 });
var _forTrack0 = ($index, $item) => $item == null ? null : $item.field;
var _forTrack1 = ($index, $item) => $item.uuid;
function GroupingTilesComponent_For_2_Conditional_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementContainer(0, 4);
  }
  if (rf & 2) {
    let tmp_13_0;
    const ctx_r3 = \u0275\u0275nextContext();
    const group_r5 = ctx_r3.$implicit;
    const \u0275$index_3_r2 = ctx_r3.$index;
    const items_r6 = \u0275\u0275readContextLet(1);
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275property("ngTemplateOutlet", (tmp_13_0 = ctx_r2.groupingHeaderDirective()) == null ? null : tmp_13_0.templateRef)("ngTemplateOutletContext", \u0275\u0275pureFunction3(2, _c2, group_r5 == null ? null : group_r5.field, items_r6, !ctx_r2.collapsedStates()[\u0275$index_3_r2]));
  }
}
function GroupingTilesComponent_For_2_Conditional_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "lg-title", 7);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(2, "span", 8);
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const group_r5 = \u0275\u0275nextContext().$implicit;
    const items_r6 = \u0275\u0275readContextLet(1);
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275property("level", 3);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", (group_r5 == null ? null : group_r5.field) || ctx_r2.translateService.instant("without-category-label"), " ");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(items_r6.length);
  }
}
function GroupingTilesComponent_For_2_Conditional_6_For_2_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "lg-selectable-section", 10)(1, "div", 11);
    \u0275\u0275elementContainer(2, 4);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    let tmp_26_0;
    const tile_r7 = \u0275\u0275nextContext().$implicit;
    const ctx_r2 = \u0275\u0275nextContext(3);
    \u0275\u0275property("key", tile_r7.uuid)("data", tile_r7);
    \u0275\u0275advance(2);
    \u0275\u0275property("ngTemplateOutlet", (tmp_26_0 = ctx_r2.groupingTileDirective()) == null ? null : tmp_26_0.templateRef)("ngTemplateOutletContext", \u0275\u0275pureFunction1(4, _c3, tile_r7));
  }
}
function GroupingTilesComponent_For_2_Conditional_6_For_2_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 11);
    \u0275\u0275elementContainer(1, 4);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    let tmp_24_0;
    const tile_r7 = \u0275\u0275nextContext().$implicit;
    const ctx_r2 = \u0275\u0275nextContext(3);
    \u0275\u0275advance();
    \u0275\u0275property("ngTemplateOutlet", (tmp_24_0 = ctx_r2.groupingTileDirective()) == null ? null : tmp_24_0.templateRef)("ngTemplateOutletContext", \u0275\u0275pureFunction1(2, _c3, tile_r7));
  }
}
function GroupingTilesComponent_For_2_Conditional_6_For_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 9);
    \u0275\u0275conditionalCreate(1, GroupingTilesComponent_For_2_Conditional_6_For_2_Conditional_1_Template, 3, 6, "lg-selectable-section", 10)(2, GroupingTilesComponent_For_2_Conditional_6_For_2_Conditional_2_Template, 2, 4, "div", 11);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext(3);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r2.selectable() ? 1 : 2);
  }
}
function GroupingTilesComponent_For_2_Conditional_6_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 6);
    \u0275\u0275repeaterCreate(1, GroupingTilesComponent_For_2_Conditional_6_For_2_Template, 3, 1, "div", 9, _forTrack1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    \u0275\u0275nextContext();
    const items_r6 = \u0275\u0275readContextLet(1);
    \u0275\u0275advance();
    \u0275\u0275repeater(items_r6);
  }
}
function GroupingTilesComponent_For_2_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "section", 2);
    \u0275\u0275declareLet(1);
    \u0275\u0275elementStart(2, "header", 3);
    \u0275\u0275listener("click", function GroupingTilesComponent_For_2_Template_header_click_2_listener() {
      const \u0275$index_3_r2 = \u0275\u0275restoreView(_r1).$index;
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.onHeaderClick(\u0275$index_3_r2));
    });
    \u0275\u0275conditionalCreate(3, GroupingTilesComponent_For_2_Conditional_3_Template, 1, 6, "ng-container", 4)(4, GroupingTilesComponent_For_2_Conditional_4_Template, 4, 3);
    \u0275\u0275element(5, "mat-icon", 5);
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(6, GroupingTilesComponent_For_2_Conditional_6_Template, 3, 0, "div", 6);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const group_r5 = ctx.$implicit;
    const \u0275$index_3_r2 = ctx.$index;
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275classProp("grouping-tiles__section--collapsed", !ctx_r2.collapsedStates()[\u0275$index_3_r2]);
    \u0275\u0275advance();
    \u0275\u0275storeLet(group_r5.items);
    \u0275\u0275advance();
    \u0275\u0275attribute("id", "group-" + \u0275$index_3_r2);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r2.groupingHeaderDirective() ? 3 : 4);
    \u0275\u0275advance(2);
    \u0275\u0275property("fontIcon", ctx_r2.collapsedStates()[\u0275$index_3_r2] ? "expand_more" : "chevron_right");
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r2.groupingTileDirective() ? 6 : -1);
  }
}
function GroupingTilesComponent_ForEmpty_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275projection(0);
  }
}
var GroupingTilesComponent = class _GroupingTilesComponent {
  selectionZoneService;
  translateService;
  router;
  viewportScroller;
  constructor(selectionZoneService, translateService, router, viewportScroller) {
    this.selectionZoneService = selectionZoneService;
    this.translateService = translateService;
    this.router = router;
    this.viewportScroller = viewportScroller;
    afterNextRender(() => {
      const group = this.storedGroup()?.split("-")?.[1];
      if (group == null)
        return;
      this.collapsedStates.set({
        [group]: true
      });
      this.viewportScroller.setOffset([0, 100]);
      setTimeout(() => {
        this.viewportScroller.scrollToAnchor(this.storedGroup(), {
          behavior: "smooth"
        });
      }, 200);
    });
    effect(() => {
      console.log({ sortResult: this.sortResult() });
    });
  }
  storedGroup = injectFragment();
  sortResult = input(...ngDevMode ? [void 0, { debugName: "sortResult" }] : []);
  selectable = input(false, ...ngDevMode ? [{ debugName: "selectable" }] : []);
  empty = computed(() => {
    return !this.sortResult()?.groups.length;
  }, ...ngDevMode ? [{ debugName: "empty" }] : []);
  collapsedStates = signal({}, ...ngDevMode ? [{ debugName: "collapsedStates" }] : []);
  groupingTileDirective = contentChild(GroupingTileDirective, ...ngDevMode ? [{ debugName: "groupingTileDirective" }] : []);
  groupingHeaderDirective = contentChild(GroupingHeaderDirective, ...ngDevMode ? [{ debugName: "groupingHeaderDirective" }] : []);
  onHeaderClick(index) {
    this.collapsedStates.update((state) => {
      state[index] = !state[index];
      return state;
    });
    this.router.navigate([], {
      fragment: `group-${index}`,
      queryParamsHandling: "merge",
      replaceUrl: true
    });
  }
  static \u0275fac = function GroupingTilesComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _GroupingTilesComponent)(\u0275\u0275directiveInject(SelectionZoneService, 8), \u0275\u0275directiveInject(TranslateService), \u0275\u0275directiveInject(Router), \u0275\u0275directiveInject(ViewportScroller));
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _GroupingTilesComponent, selectors: [["lg-grouping-tiles"]], contentQueries: function GroupingTilesComponent_ContentQueries(rf, ctx, dirIndex) {
    if (rf & 1) {
      \u0275\u0275contentQuerySignal(dirIndex, ctx.groupingTileDirective, GroupingTileDirective, 5);
      \u0275\u0275contentQuerySignal(dirIndex, ctx.groupingHeaderDirective, GroupingHeaderDirective, 5);
    }
    if (rf & 2) {
      \u0275\u0275queryAdvance(2);
    }
  }, inputs: { sortResult: [1, "sortResult"], selectable: [1, "selectable"] }, ngContentSelectors: _c1, decls: 4, vars: 1, consts: [[1, "grouping-tiles"], [1, "grouping-tiles__section", 3, "grouping-tiles__section--collapsed"], [1, "grouping-tiles__section"], [1, "grouping-tiles__header", 3, "click"], [3, "ngTemplateOutlet", "ngTemplateOutletContext"], [3, "fontIcon"], [1, "grouping-tiles__content"], [3, "level"], [1, "grouping-tiles__header-count", "text-muted"], [1, "grouping-tiles__item"], [3, "key", "data"], [1, "grouping-tiles__item-inner"]], template: function GroupingTilesComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275projectionDef(_c02);
      \u0275\u0275elementStart(0, "section", 0);
      \u0275\u0275repeaterCreate(1, GroupingTilesComponent_For_2_Template, 7, 7, "section", 1, _forTrack0, false, GroupingTilesComponent_ForEmpty_3_Template, 1, 0);
      \u0275\u0275elementEnd();
    }
    if (rf & 2) {
      let tmp_0_0;
      \u0275\u0275advance();
      \u0275\u0275repeater((tmp_0_0 = ctx.sortResult()) == null ? null : tmp_0_0.groups);
    }
  }, dependencies: [
    TitleComponent,
    NgTemplateOutlet,
    SelectableSectionComponent,
    MatIcon
  ], styles: ["\n\n.grouping-tiles[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 32px;\n}\n.grouping-tiles__section[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 24px;\n}\n.grouping-tiles__section--collapsed[_ngcontent-%COMP%]   .grouping-tiles__content[_ngcontent-%COMP%] {\n  display: none;\n}\n.grouping-tiles__header[_ngcontent-%COMP%] {\n  cursor: pointer;\n  display: flex;\n  align-items: flex-end;\n  justify-content: flex-start;\n  gap: 4px;\n}\n.grouping-tiles__header[_ngcontent-%COMP%]:hover {\n  text-decoration: underline;\n}\n.grouping-tiles__header-count[_ngcontent-%COMP%] {\n  flex-shrink: 0;\n  margin-left: 8px;\n}\n@media (max-width: 600px) {\n  .grouping-tiles__header-count[_ngcontent-%COMP%] {\n    margin-left: auto;\n  }\n}\n.grouping-tiles__header[_ngcontent-%COMP%]   mat-icon[_ngcontent-%COMP%] {\n  flex: 0 0 auto;\n}\n.grouping-tiles__content[_ngcontent-%COMP%] {\n  display: flex;\n  flex-wrap: wrap;\n  gap: 16px;\n}\n.grouping-tiles__item[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: stretch;\n}\n.grouping-tiles__item-inner[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: stretch;\n  width: 100%;\n}\n/*# sourceMappingURL=grouping-tiles.component.css.map */"] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(GroupingTilesComponent, [{
    type: Component,
    args: [{ selector: "lg-grouping-tiles", standalone: true, template: `
    <section class="grouping-tiles">
      @for (group of sortResult()?.groups; track group?.field; let i = $index) {
        <section class="grouping-tiles__section"
                 [class.grouping-tiles__section--collapsed]="!collapsedStates()[i]">
          @let items = group.items;
          <header class="grouping-tiles__header"
                  [attr.id]="'group-' + i"
                  (click)="onHeaderClick(i)">
            @if (groupingHeaderDirective()) {
              <ng-container [ngTemplateOutlet]="groupingHeaderDirective()?.templateRef"
                            [ngTemplateOutletContext]="{ $implicit: group?.field,items: items, collapsed: !collapsedStates()[i] }">
              </ng-container>
            } @else {
              <lg-title [level]="3">
                {{ group?.field || translateService.instant('without-category-label') }}
              </lg-title>

              <span class="grouping-tiles__header-count text-muted">{{ items.length }}</span>
            }

            <mat-icon [fontIcon]="collapsedStates()[i] ? 'expand_more' : 'chevron_right'"></mat-icon>
          </header>
          @if (groupingTileDirective()) {
            <div class="grouping-tiles__content">
              @for (tile of items; track tile.uuid) {
                <div class="grouping-tiles__item">
                  @if (selectable()) {
                    <lg-selectable-section [key]="tile.uuid" [data]="tile">
                      <div class="grouping-tiles__item-inner">
                        <ng-container [ngTemplateOutlet]="groupingTileDirective()?.templateRef"
                                      [ngTemplateOutletContext]="{ $implicit: tile }">
                        </ng-container>
                      </div>
                    </lg-selectable-section>
                  } @else {
                    <div class="grouping-tiles__item-inner">
                      <ng-container [ngTemplateOutlet]="groupingTileDirective()?.templateRef"
                                    [ngTemplateOutletContext]="{ $implicit: tile }">
                      </ng-container>
                    </div>
                  }
                </div>
              }
            </div>
          }
        </section>
      } @empty {
        <ng-content select="[empty-state]">
        </ng-content>
      }
    </section>
  `, imports: [
      TitleComponent,
      NgTemplateOutlet,
      SelectableSectionComponent,
      MatIcon
    ], styles: ["/* angular:styles/component:scss;bd7677aa9c370f3b60e4df1c79f1613a824790af08b8a30517c59dff17888f3c;/Users/khripunovpavel/Documents/my/lasagna/lasagna/src/app/shared/view/ui/grouping-tiles/grouping-tiles.component.ts */\n.grouping-tiles {\n  display: flex;\n  flex-direction: column;\n  gap: 32px;\n}\n.grouping-tiles__section {\n  display: flex;\n  flex-direction: column;\n  gap: 24px;\n}\n.grouping-tiles__section--collapsed .grouping-tiles__content {\n  display: none;\n}\n.grouping-tiles__header {\n  cursor: pointer;\n  display: flex;\n  align-items: flex-end;\n  justify-content: flex-start;\n  gap: 4px;\n}\n.grouping-tiles__header:hover {\n  text-decoration: underline;\n}\n.grouping-tiles__header-count {\n  flex-shrink: 0;\n  margin-left: 8px;\n}\n@media (max-width: 600px) {\n  .grouping-tiles__header-count {\n    margin-left: auto;\n  }\n}\n.grouping-tiles__header mat-icon {\n  flex: 0 0 auto;\n}\n.grouping-tiles__content {\n  display: flex;\n  flex-wrap: wrap;\n  gap: 16px;\n}\n.grouping-tiles__item {\n  display: flex;\n  align-items: stretch;\n}\n.grouping-tiles__item-inner {\n  display: flex;\n  align-items: stretch;\n  width: 100%;\n}\n/*# sourceMappingURL=grouping-tiles.component.css.map */\n"] }]
  }], () => [{ type: SelectionZoneService, decorators: [{
    type: Optional
  }] }, { type: TranslateService }, { type: Router }, { type: ViewportScroller }], null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(GroupingTilesComponent, { className: "GroupingTilesComponent", filePath: "src/app/shared/view/ui/grouping-tiles/grouping-tiles.component.ts", lineNumber: 139 });
})();

// src/app/features/controls/form/upload.component.ts
var _c03 = ["input"];
var _c12 = ["*"];
var UploadComponent = class _UploadComponent {
  filesSelected = output();
  accept = input(".csv", ...ngDevMode ? [{ debugName: "accept" }] : []);
  input = viewChild("input", ...ngDevMode ? [{ debugName: "input" }] : []);
  onFileChange(event) {
    const target = event.target;
    const file = target.files?.[0];
    if (file) {
      this.filesSelected.emit([file]);
    }
  }
  clear() {
    if (!this.input()?.nativeElement) {
      return;
    }
    this.input().nativeElement.value = "";
    this.input().nativeElement.files = null;
  }
  static \u0275fac = function UploadComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _UploadComponent)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _UploadComponent, selectors: [["lg-upload"]], viewQuery: function UploadComponent_Query(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275viewQuerySignal(ctx.input, _c03, 5);
    }
    if (rf & 2) {
      \u0275\u0275queryAdvance();
    }
  }, inputs: { accept: [1, "accept"] }, outputs: { filesSelected: "filesSelected" }, ngContentSelectors: _c12, decls: 5, vars: 1, consts: [["input", ""], [1, "lg-upload", 3, "click"], ["type", "file", 3, "change", "accept"], [1, "lg-upload__content"]], template: function UploadComponent_Template(rf, ctx) {
    if (rf & 1) {
      const _r1 = \u0275\u0275getCurrentView();
      \u0275\u0275projectionDef();
      \u0275\u0275domElementStart(0, "div", 1);
      \u0275\u0275domListener("click", function UploadComponent_Template_div_click_0_listener() {
        \u0275\u0275restoreView(_r1);
        const input_r2 = \u0275\u0275reference(2);
        return \u0275\u0275resetView(input_r2.click());
      });
      \u0275\u0275domElementStart(1, "input", 2, 0);
      \u0275\u0275domListener("change", function UploadComponent_Template_input_change_1_listener($event) {
        \u0275\u0275restoreView(_r1);
        return \u0275\u0275resetView(ctx.onFileChange($event));
      });
      \u0275\u0275domElementEnd();
      \u0275\u0275domElementStart(3, "div", 3);
      \u0275\u0275projection(4);
      \u0275\u0275domElementEnd()();
    }
    if (rf & 2) {
      \u0275\u0275advance();
      \u0275\u0275domProperty("accept", ctx.accept());
    }
  }, styles: ["\n\ninput[_ngcontent-%COMP%] {\n  display: none;\n}\n/*# sourceMappingURL=upload.component.css.map */"] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(UploadComponent, [{
    type: Component,
    args: [{ selector: "lg-upload", standalone: true, template: `
      <div (click)="input.click()" class="lg-upload">
          <input #input
                 (change)="onFileChange($event)"
                 [accept]="accept()"
                 type="file">
          <div class="lg-upload__content">
              <ng-content></ng-content>
          </div>
      </div>
  `, styles: ["/* angular:styles/component:scss;aa66937196ea73175d006d3b4df3a0286a1cd79dffe59a7b4c8902f702b0c4f0;/Users/khripunovpavel/Documents/my/lasagna/lasagna/src/app/features/controls/form/upload.component.ts */\ninput {\n  display: none;\n}\n/*# sourceMappingURL=upload.component.css.map */\n"] }]
  }], null, null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(UploadComponent, { className: "UploadComponent", filePath: "src/app/features/controls/form/upload.component.ts", lineNumber: 25 });
})();

// src/app/shared/service/types/sorting.types.ts
var SortResult = class {
  groups;
  constructor(groups) {
    this.groups = groups;
  }
  get length() {
    return this.groups.reduce((acc, group) => acc + group.items.length, 0);
  }
};

export {
  UploadComponent,
  GroupingTileDirective,
  GroupingHeaderDirective,
  GroupingTilesComponent,
  SortResult
};
//# sourceMappingURL=chunk-JU2B3WMH.js.map
