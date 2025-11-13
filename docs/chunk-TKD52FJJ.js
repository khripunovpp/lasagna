import {
  CheckboxComponent
} from "./chunk-ZVJRZSZB.js";
import {
  MatIcon
} from "./chunk-INPR6HOC.js";
import {
  FormArray,
  FormArrayName,
  FormControl,
  FormControlName,
  FormGroup,
  FormGroupDirective,
  FormsModule,
  NgControlStatus,
  NgControlStatusGroup,
  ReactiveFormsModule
} from "./chunk-RTCNHMN6.js";
import {
  ButtonComponent
} from "./chunk-X7NFO2XP.js";
import {
  NgTemplateOutlet
} from "./chunk-7I2CR6I6.js";
import {
  Component,
  ContentChildren,
  Directive,
  Input,
  TemplateRef,
  ViewEncapsulation,
  effect,
  input,
  output,
  setClassMetadata,
  ɵsetClassDebugInfo,
  ɵɵadvance,
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
  ɵɵproperty,
  ɵɵqueryRefresh,
  ɵɵrepeater,
  ɵɵrepeaterCreate,
  ɵɵresetView,
  ɵɵrestoreView,
  ɵɵstyleMap,
  ɵɵstyleProp,
  ɵɵtext
} from "./chunk-RQATVJ2P.js";

// src/app/shared/view/ui/card/card-list-item.directive.ts
var CardListItemDirective = class _CardListItemDirective {
  template;
  constructor(template) {
    this.template = template;
  }
  uuid = "";
  type = "";
  bgColor = "";
  static \u0275fac = function CardListItemDirective_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _CardListItemDirective)(\u0275\u0275directiveInject(TemplateRef));
  };
  static \u0275dir = /* @__PURE__ */ \u0275\u0275defineDirective({ type: _CardListItemDirective, selectors: [["", "lgCardListItem", ""]], inputs: { uuid: "uuid", type: "type", bgColor: "bgColor" } });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(CardListItemDirective, [{
    type: Directive,
    args: [{
      selector: "[lgCardListItem]",
      standalone: true
    }]
  }], () => [{ type: TemplateRef }], { uuid: [{
    type: Input
  }], type: [{
    type: Input
  }], bgColor: [{
    type: Input
  }] });
})();

// src/app/shared/view/ui/card/card-list.component.ts
var _forTrack0 = ($index, $item) => (($item == null ? null : $item.uuid) ?? "") + $index;
function CardListComponent_For_3_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "lg-checkbox", 9);
    \u0275\u0275listener("onCheckboxChanged", function CardListComponent_For_3_Conditional_1_Template_lg_checkbox_onCheckboxChanged_0_listener($event) {
      \u0275\u0275restoreView(_r1);
      const \u0275$index_5_r2 = \u0275\u0275nextContext().$index;
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.onChanges($event, \u0275$index_5_r2));
    });
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r3 = \u0275\u0275nextContext();
    const item_r5 = ctx_r3.$implicit;
    const \u0275$index_5_r2 = ctx_r3.$index;
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275property("formControlName", \u0275$index_5_r2)("size", "medium")("value", ctx_r2.buildValueString(\u0275$index_5_r2, item_r5));
  }
}
function CardListComponent_For_3_Conditional_4_Template(rf, ctx) {
  if (rf & 1) {
    const _r6 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "lg-button", 10);
    \u0275\u0275listener("click", function CardListComponent_For_3_Conditional_4_Template_lg_button_click_0_listener() {
      \u0275\u0275restoreView(_r6);
      const item_r5 = \u0275\u0275nextContext().$implicit;
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.onDeleteOne.emit({ uuid: item_r5.uuid, type: item_r5.type }));
    });
    \u0275\u0275element(1, "mat-icon", 11);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    \u0275\u0275styleMap("danger");
    \u0275\u0275property("size", "tiny")("icon", true);
  }
}
function CardListComponent_For_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 4);
    \u0275\u0275conditionalCreate(1, CardListComponent_For_3_Conditional_1_Template, 1, 3, "lg-checkbox", 5);
    \u0275\u0275elementStart(2, "div", 6);
    \u0275\u0275elementContainer(3, 7);
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(4, CardListComponent_For_3_Conditional_4_Template, 2, 4, "lg-button", 8);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const item_r5 = ctx.$implicit;
    const \u0275$index_5_r2 = ctx.$index;
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275classProp("colored", !(\u0275$index_5_r2 % 2 === 0));
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r2.mode() === "selection" ? 1 : -1);
    \u0275\u0275advance();
    \u0275\u0275styleProp("--card-list-bg", item_r5.bgColor);
    \u0275\u0275advance();
    \u0275\u0275property("ngTemplateOutlet", item_r5.template);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r2.mode() === "selection" ? 4 : -1);
  }
}
function CardListComponent_ForEmpty_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 3);
    \u0275\u0275text(1, "No items found");
    \u0275\u0275elementEnd();
  }
}
var CardListComponent = class _CardListComponent {
  constructor() {
  }
  mode = input("default", ...ngDevMode ? [{ debugName: "mode" }] : []);
  selectAll = input(false, ...ngDevMode ? [{ debugName: "selectAll" }] : []);
  deselectAll = input(false, ...ngDevMode ? [{ debugName: "deselectAll" }] : []);
  onSelected = output();
  onDeleteOne = output();
  items;
  selected = new FormGroup({
    items: new FormArray([])
  });
  effectMode = effect(() => {
    const items = this.selected.get("items");
    if (this.mode() === "selection") {
      items.clear();
      items.reset();
      this.items?.forEach((item, index) => {
        items.push(new FormControl(false));
      });
    }
  }, ...ngDevMode ? [{ debugName: "effectMode" }] : []);
  effectSelectAll = effect(() => {
    const items = this.selected.get("items");
    if (this.selectAll()) {
      items?.controls.forEach((item) => {
        item.setValue(true);
      });
    }
  }, ...ngDevMode ? [{ debugName: "effectSelectAll" }] : []);
  effectDeselectAll = effect(() => {
    const items = this.selected.get("items");
    if (this.deselectAll()) {
      items?.controls.forEach((item) => {
        item.setValue(false);
      });
    }
  }, ...ngDevMode ? [{ debugName: "effectDeselectAll" }] : []);
  buildValueString(index, item) {
    return String(`${item?.type}-${index}-${item?.uuid}`);
  }
  onChanges(value, index) {
    const item = this.items.toArray()?.[index];
    this.onSelected.emit([value, item?.uuid || "", item]);
  }
  static \u0275fac = function CardListComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _CardListComponent)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _CardListComponent, selectors: [["lg-card-list"]], contentQueries: function CardListComponent_ContentQueries(rf, ctx, dirIndex) {
    if (rf & 1) {
      \u0275\u0275contentQuery(dirIndex, CardListItemDirective, 4);
    }
    if (rf & 2) {
      let _t;
      \u0275\u0275queryRefresh(_t = \u0275\u0275loadQuery()) && (ctx.items = _t);
    }
  }, inputs: { mode: [1, "mode"], selectAll: [1, "selectAll"], deselectAll: [1, "deselectAll"] }, outputs: { onSelected: "onSelected", onDeleteOne: "onDeleteOne" }, decls: 5, vars: 2, consts: [[1, "lg-card-list", 3, "formGroup"], ["formArrayName", "items", 1, "lg-card-list__inner"], [1, "lg-card-list__item", 3, "colored"], [2, "padding", "16px 24px"], [1, "lg-card-list__item"], [3, "formControlName", "size", "value"], [1, "lg-card-list__item__inner"], [3, "ngTemplateOutlet"], [3, "style", "size", "icon"], [3, "onCheckboxChanged", "formControlName", "size", "value"], [3, "click", "size", "icon"], ["aria-hidden", "false", "fontIcon", "close"]], template: function CardListComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "section", 0)(1, "section", 1);
      \u0275\u0275repeaterCreate(2, CardListComponent_For_3_Template, 5, 7, "div", 2, _forTrack0, false, CardListComponent_ForEmpty_4_Template, 2, 0, "div", 3);
      \u0275\u0275elementEnd()();
    }
    if (rf & 2) {
      \u0275\u0275property("formGroup", ctx.selected);
      \u0275\u0275advance(2);
      \u0275\u0275repeater(ctx.items);
    }
  }, dependencies: [
    NgTemplateOutlet,
    CheckboxComponent,
    FormsModule,
    NgControlStatus,
    NgControlStatusGroup,
    ReactiveFormsModule,
    FormGroupDirective,
    FormControlName,
    FormArrayName,
    ButtonComponent,
    MatIcon
  ], styles: ["/* angular:styles/component:scss;78b2634ad74f07419c446ab926e4c4bf806fa7fe5e23f38da569a3280084caea;/Users/khripunovpavel/Documents/my/lasagna/lasagna/src/app/shared/view/ui/card/card-list.component.ts */\n:host {\n  display: flex;\n  width: 100%;\n}\n.lg-checkbox {\n  --control-bg: var(--card-list-checkbox-bg);\n  --control-bg-selected: var(--card-list-checkbox-bg);\n}\n.lg-card-list__inner {\n  display: flex;\n  flex-direction: column;\n  width: 100%;\n  overflow: hidden;\n  gap: 16px;\n}\n.lg-card-list__item {\n  display: flex;\n  gap: 8px;\n  align-items: center;\n}\n.lg-card-list__item__inner {\n  flex: 1;\n  overflow-x: auto;\n  display: flex;\n  align-items: center;\n  padding: 16px;\n  gap: 8px;\n  background-color: var(--card-list-bg);\n  border-radius: 32px;\n  white-space: nowrap;\n}\n.lg-card-list__item__inner > * {\n  flex: 1;\n}\n/*# sourceMappingURL=card-list.component.css.map */\n"], encapsulation: 2 });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(CardListComponent, [{
    type: Component,
    args: [{ selector: "lg-card-list", standalone: true, imports: [
      NgTemplateOutlet,
      CheckboxComponent,
      FormsModule,
      ReactiveFormsModule,
      ButtonComponent,
      MatIcon
    ], template: `
    <section [formGroup]="selected" class="lg-card-list">
      <section class="lg-card-list__inner" formArrayName="items">
        @for (item of items; track (item?.uuid ?? '') + $index; let i = $index, even = $even) {
          <div class="lg-card-list__item"
               [class.colored]="!even">
            @if (mode() === 'selection') {
              <lg-checkbox [formControlName]="i"
                           [size]="'medium'"
                           [value]="buildValueString(i, item)"
                           (onCheckboxChanged)="onChanges($event,i)"></lg-checkbox>
            }
            <div [style.--card-list-bg]="item.bgColor"
                 class="lg-card-list__item__inner">
              <ng-container [ngTemplateOutlet]="item.template"></ng-container>
            </div>
            @if (mode() === 'selection') {
              <lg-button [style]="'danger'"
                         [size]="'tiny'"
                         [icon]="true"
                         (click)="onDeleteOne.emit({uuid: item.uuid!, type: item.type})">
                <mat-icon aria-hidden="false"
                          fontIcon="close"></mat-icon>
              </lg-button>
            }
          </div>
        } @empty {
          <div style="padding:16px 24px;">No items found</div>
        }
      </section>
    </section>
  `, encapsulation: ViewEncapsulation.None, styles: ["/* angular:styles/component:scss;78b2634ad74f07419c446ab926e4c4bf806fa7fe5e23f38da569a3280084caea;/Users/khripunovpavel/Documents/my/lasagna/lasagna/src/app/shared/view/ui/card/card-list.component.ts */\n:host {\n  display: flex;\n  width: 100%;\n}\n.lg-checkbox {\n  --control-bg: var(--card-list-checkbox-bg);\n  --control-bg-selected: var(--card-list-checkbox-bg);\n}\n.lg-card-list__inner {\n  display: flex;\n  flex-direction: column;\n  width: 100%;\n  overflow: hidden;\n  gap: 16px;\n}\n.lg-card-list__item {\n  display: flex;\n  gap: 8px;\n  align-items: center;\n}\n.lg-card-list__item__inner {\n  flex: 1;\n  overflow-x: auto;\n  display: flex;\n  align-items: center;\n  padding: 16px;\n  gap: 8px;\n  background-color: var(--card-list-bg);\n  border-radius: 32px;\n  white-space: nowrap;\n}\n.lg-card-list__item__inner > * {\n  flex: 1;\n}\n/*# sourceMappingURL=card-list.component.css.map */\n"] }]
  }], () => [], { items: [{
    type: ContentChildren,
    args: [CardListItemDirective]
  }] });
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(CardListComponent, { className: "CardListComponent", filePath: "src/app/shared/view/ui/card/card-list.component.ts", lineNumber: 107 });
})();

export {
  CardListItemDirective,
  CardListComponent
};
//# sourceMappingURL=chunk-TKD52FJJ.js.map
