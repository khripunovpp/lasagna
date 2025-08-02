import {
  CardListItemDirective
} from "./chunk-6JSKWGL2.js";
import {
  CheckboxComponent
} from "./chunk-CBQ3TFJX.js";
import {
  MatIcon
} from "./chunk-NEK7DTWJ.js";
import {
  TitleComponent
} from "./chunk-HAWQY6NL.js";
import {
  ButtonComponent,
  FormControl,
  FormControlDirective,
  NgControlStatus,
  ReactiveFormsModule,
  SelectionZoneService,
  TranslateService
} from "./chunk-RPP3IG6S.js";
import {
  generateUuid
} from "./chunk-5WJUMO7X.js";
import {
  NgTemplateOutlet
} from "./chunk-U34SFCSO.js";
import {
  Component,
  ContentChild,
  ContentChildren,
  Directive,
  Input,
  Optional,
  SkipSelf,
  TemplateRef,
  effect,
  input,
  setClassMetadata,
  ɵsetClassDebugInfo,
  ɵɵadvance,
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
  ɵɵprojection,
  ɵɵprojectionDef,
  ɵɵproperty,
  ɵɵpureFunction1,
  ɵɵqueryRefresh,
  ɵɵrepeater,
  ɵɵrepeaterCreate,
  ɵɵrepeaterTrackByIdentity,
  ɵɵresetView,
  ɵɵrestoreView,
  ɵɵstyleMap,
  ɵɵtext,
  ɵɵtextInterpolate1
} from "./chunk-KM6KLH7M.js";

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
  }, inputs: { key: [1, "key"] }, ngContentSelectors: _c0, decls: 5, vars: 2, consts: [[1, "lg-selectable-section"], [3, "size", "formControl", "value"], [1, "lg-selectable-section__inner"], [3, "style", "size", "icon"], [3, "onCheckboxChanged", "size", "formControl", "value"], [3, "click", "size", "icon"], ["aria-hidden", "false", "fontIcon", "close"]], template: function SelectableSectionComponent_Template(rf, ctx) {
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

// src/app/shared/view/ui/grouping-tails/grouping-header.directive.ts
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

// src/app/shared/view/ui/grouping-tails/grouping-tails.component.ts
var _c02 = (a0) => ({ $implicit: a0 });
var _forTrack0 = ($index, $item) => $item == null ? null : $item.field;
function GroupingTailsComponent_For_2_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementContainer(0, 3);
  }
  if (rf & 2) {
    const group_r1 = \u0275\u0275nextContext().$implicit;
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275property("ngTemplateOutlet", ctx_r1.groupingHeaderDirective.templateRef)("ngTemplateOutletContext", \u0275\u0275pureFunction1(2, _c02, group_r1 == null ? null : group_r1.field));
  }
}
function GroupingTailsComponent_For_2_Conditional_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "lg-title", 4);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const group_r1 = \u0275\u0275nextContext().$implicit;
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275property("level", 3);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", (group_r1 == null ? null : group_r1.field) || ctx_r1.translateService.instant("unknown"), " ");
  }
}
function GroupingTailsComponent_For_2_For_6_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "lg-selectable-section", 7)(1, "div", 8);
    \u0275\u0275elementContainer(2, 3);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const tail_r3 = \u0275\u0275nextContext().$implicit;
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275property("key", tail_r3.uuid);
    \u0275\u0275advance(2);
    \u0275\u0275property("ngTemplateOutlet", ctx_r1.groupingTailDirective.templateRef)("ngTemplateOutletContext", \u0275\u0275pureFunction1(3, _c02, tail_r3));
  }
}
function GroupingTailsComponent_For_2_For_6_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 8);
    \u0275\u0275elementContainer(1, 3);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const tail_r3 = \u0275\u0275nextContext().$implicit;
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275property("ngTemplateOutlet", ctx_r1.groupingTailDirective.templateRef)("ngTemplateOutletContext", \u0275\u0275pureFunction1(2, _c02, tail_r3));
  }
}
function GroupingTailsComponent_For_2_For_6_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 6);
    \u0275\u0275conditionalCreate(1, GroupingTailsComponent_For_2_For_6_Conditional_1_Template, 3, 5, "lg-selectable-section", 7)(2, GroupingTailsComponent_For_2_For_6_Conditional_2_Template, 2, 4, "div", 8);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r1.selectable ? 1 : 2);
  }
}
function GroupingTailsComponent_For_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "section", 1)(1, "header", 2);
    \u0275\u0275conditionalCreate(2, GroupingTailsComponent_For_2_Conditional_2_Template, 1, 4, "ng-container", 3)(3, GroupingTailsComponent_For_2_Conditional_3_Template, 2, 2, "lg-title", 4);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "div", 5);
    \u0275\u0275repeaterCreate(5, GroupingTailsComponent_For_2_For_6_Template, 3, 1, "div", 6, \u0275\u0275repeaterTrackByIdentity);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const group_r1 = ctx.$implicit;
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(2);
    \u0275\u0275conditional(ctx_r1.groupingHeaderDirective ? 2 : 3);
    \u0275\u0275advance(3);
    \u0275\u0275repeater(group_r1 == null ? null : group_r1.items);
  }
}
var GroupingTailsComponent = class _GroupingTailsComponent {
  selectionZoneService;
  translateService;
  constructor(selectionZoneService, translateService) {
    this.selectionZoneService = selectionZoneService;
    this.translateService = translateService;
  }
  sortResult;
  selectable = false;
  groupingTailDirective;
  groupingHeaderDirective;
  static \u0275fac = function GroupingTailsComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _GroupingTailsComponent)(\u0275\u0275directiveInject(SelectionZoneService, 8), \u0275\u0275directiveInject(TranslateService));
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _GroupingTailsComponent, selectors: [["lg-grouping-tails"]], contentQueries: function GroupingTailsComponent_ContentQueries(rf, ctx, dirIndex) {
    if (rf & 1) {
      \u0275\u0275contentQuery(dirIndex, GroupingTailDirective, 5);
      \u0275\u0275contentQuery(dirIndex, GroupingHeaderDirective, 5);
    }
    if (rf & 2) {
      let _t;
      \u0275\u0275queryRefresh(_t = \u0275\u0275loadQuery()) && (ctx.groupingTailDirective = _t.first);
      \u0275\u0275queryRefresh(_t = \u0275\u0275loadQuery()) && (ctx.groupingHeaderDirective = _t.first);
    }
  }, inputs: { sortResult: "sortResult", selectable: "selectable" }, decls: 3, vars: 0, consts: [[1, "grouping-tails"], [1, "grouping-tails__section"], [1, "grouping-tails__header"], [3, "ngTemplateOutlet", "ngTemplateOutletContext"], [3, "level"], [1, "grouping-tails__content"], [1, "grouping-tails__item"], [3, "key"], [1, "grouping-tails__item-inner"]], template: function GroupingTailsComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "section", 0);
      \u0275\u0275repeaterCreate(1, GroupingTailsComponent_For_2_Template, 7, 1, "section", 1, _forTrack0);
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
  ], styles: ["\n\n.grouping-tails[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 32px;\n}\n.grouping-tails__section[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 24px;\n}\n.grouping-tails__content[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 16px;\n}\n.grouping-tails__item[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: stretch;\n  width: 100%;\n}\n.grouping-tails__item-inner[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: stretch;\n  width: 100%;\n}\n/*# sourceMappingURL=grouping-tails.component.css.map */"] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(GroupingTailsComponent, [{
    type: Component,
    args: [{ selector: "lg-grouping-tails", standalone: true, template: `
    <section class="grouping-tails">
      @for (group of sortResult?.groups; track group?.field) {
        <section class="grouping-tails__section">
          <header class="grouping-tails__header">
            @if (groupingHeaderDirective) {
              <ng-container [ngTemplateOutlet]="groupingHeaderDirective.templateRef"
                            [ngTemplateOutletContext]="{ $implicit: group?.field }">
              </ng-container>
            } @else {
              <lg-title [level]="3">
                {{ group?.field || translateService.instant('unknown') }}
              </lg-title>
            }
          </header>

          <div class="grouping-tails__content">
            @for (tail of group?.items; track tail) {
              <div class="grouping-tails__item">
                @if (selectable) {
                  <lg-selectable-section [key]="tail.uuid">
                    <div class="grouping-tails__item-inner">
                      <ng-container [ngTemplateOutlet]="groupingTailDirective!.templateRef"
                                    [ngTemplateOutletContext]="{ $implicit: tail }">
                      </ng-container>
                    </div>
                  </lg-selectable-section>
                } @else {
                  <div class="grouping-tails__item-inner">
                    <ng-container [ngTemplateOutlet]="groupingTailDirective!.templateRef"
                                  [ngTemplateOutletContext]="{ $implicit: tail }">
                    </ng-container>
                  </div>
                }
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
    ], styles: ["/* angular:styles/component:scss;6d134fb20b02b6ded791a50593fe101963a13a2dd9d81d54ac81d990a3b36126;/Users/khripunovpavel/Documents/my/lasagna/lasagna/src/app/shared/view/ui/grouping-tails/grouping-tails.component.ts */\n.grouping-tails {\n  display: flex;\n  flex-direction: column;\n  gap: 32px;\n}\n.grouping-tails__section {\n  display: flex;\n  flex-direction: column;\n  gap: 24px;\n}\n.grouping-tails__content {\n  display: flex;\n  flex-direction: column;\n  gap: 16px;\n}\n.grouping-tails__item {\n  display: flex;\n  align-items: stretch;\n  width: 100%;\n}\n.grouping-tails__item-inner {\n  display: flex;\n  align-items: stretch;\n  width: 100%;\n}\n/*# sourceMappingURL=grouping-tails.component.css.map */\n"] }]
  }], () => [{ type: SelectionZoneService, decorators: [{
    type: Optional
  }] }, { type: TranslateService }], { sortResult: [{
    type: Input
  }], selectable: [{
    type: Input
  }], groupingTailDirective: [{
    type: ContentChild,
    args: [GroupingTailDirective]
  }], groupingHeaderDirective: [{
    type: ContentChild,
    args: [GroupingHeaderDirective]
  }] });
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(GroupingTailsComponent, { className: "GroupingTailsComponent", filePath: "src/app/shared/view/ui/grouping-tails/grouping-tails.component.ts", lineNumber: 95 });
})();

export {
  GroupingTailDirective,
  GroupingHeaderDirective,
  GroupingTailsComponent
};
//# sourceMappingURL=chunk-BB6GYXW3.js.map
