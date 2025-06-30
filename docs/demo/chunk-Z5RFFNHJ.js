import {
  AutocompleteComponent,
  ChipsListComponent
} from "./chunk-ADYDI73K.js";
import {
  ControlComponent
} from "./chunk-7D43YVDH.js";
import {
  ControlsRowComponent
} from "./chunk-N24V6TGK.js";
import {
  MultiselectComponent,
  NgLabelTemplateDirective,
  NgMultiLabelTemplateDirective,
  NgOptionTemplateDirective,
  NgSelectComponent
} from "./chunk-VP5OUIG4.js";
import {
  UnitSwitcherComponent
} from "./chunk-L4SAC6OU.js";
import {
  TextareaComponent
} from "./chunk-YD3BFRRH.js";
import {
  ShrinkDirective
} from "./chunk-G7ZEKDCM.js";
import {
  NumberInputComponent,
  ParseMathDirective
} from "./chunk-WBQUPP7L.js";
import {
  ROUTER_MANAGER
} from "./chunk-3MBTB52C.js";
import {
  ControlExtraTemplateDirective,
  InputComponent
} from "./chunk-MGKNDLQM.js";
import "./chunk-EROQRXO4.js";
import "./chunk-7YWLATDR.js";
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
import {
  CardComponent
} from "./chunk-YLXBTOXB.js";
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
  SelectResourcesService
} from "./chunk-LVU2JMH2.js";
import "./chunk-XLVGBYUT.js";
import {
  ButtonComponent,
  FormArray,
  FormArrayName,
  FormControl,
  FormControlName,
  FormGroup,
  FormGroupDirective,
  FormGroupName,
  FormsModule,
  Ingredient,
  NG_VALUE_ACCESSOR,
  NgControlStatus,
  NgControlStatusGroup,
  NgModel,
  NotificationsService,
  ReactiveFormsModule,
  Recipe,
  Tag,
  Validators,
  errorHandler,
  injectParams,
  recipeToFormValue,
  ɵNgNoValidate
} from "./chunk-EH6A44OR.js";
import {
  ActivatedRoute,
  Router,
  RouterLink
} from "./chunk-UGLIF2MQ.js";
import "./chunk-Q4M4NLQD.js";
import "./chunk-5WJUMO7X.js";
import {
  NgStyle
} from "./chunk-5MHPI2FA.js";
import {
  Component,
  Input,
  Optional,
  ViewEncapsulation,
  combineLatest,
  computed,
  debounceTime,
  effect,
  forwardRef,
  inject,
  input,
  output,
  setClassMetadata,
  signal,
  viewChild,
  viewChildren,
  ɵsetClassDebugInfo,
  ɵɵProvidersFeature,
  ɵɵadvance,
  ɵɵconditional,
  ɵɵconditionalCreate,
  ɵɵdefineComponent,
  ɵɵdirectiveInject,
  ɵɵelement,
  ɵɵelementContainerEnd,
  ɵɵelementContainerStart,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵgetCurrentView,
  ɵɵinterpolate,
  ɵɵinterpolate1,
  ɵɵlistener,
  ɵɵnextContext,
  ɵɵpipe,
  ɵɵpipeBind1,
  ɵɵpipeBind2,
  ɵɵprojection,
  ɵɵprojectionDef,
  ɵɵproperty,
  ɵɵpureFunction1,
  ɵɵqueryAdvance,
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
  ɵɵtextInterpolate2,
  ɵɵviewQuerySignal
} from "./chunk-6AETQSBA.js";
import "./chunk-PZQLIUCM.js";
import {
  __spreadProps,
  __spreadValues
} from "./chunk-46DXP6YY.js";

// src/app/shared/view/ui/form/control-group.component.ts
var _c0 = ["*"];
function ControlGroupComponent_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 1);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r0.label(), " ");
  }
}
var ControlGroupComponent = class _ControlGroupComponent {
  constructor() {
  }
  label = input("");
  static \u0275fac = function ControlGroupComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _ControlGroupComponent)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _ControlGroupComponent, selectors: [["lg-control-group"]], inputs: { label: [1, "label"] }, ngContentSelectors: _c0, decls: 4, vars: 1, consts: [[1, "control-group"], [1, "control-group__label"], [1, "control-group__content"]], template: function ControlGroupComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275projectionDef();
      \u0275\u0275elementStart(0, "div", 0);
      \u0275\u0275conditionalCreate(1, ControlGroupComponent_Conditional_1_Template, 2, 1, "p", 1);
      \u0275\u0275elementStart(2, "div", 2);
      \u0275\u0275projection(3);
      \u0275\u0275elementEnd()();
    }
    if (rf & 2) {
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.label() ? 1 : -1);
    }
  }, styles: ["\n\n[_nghost-%COMP%] {\n  display: flex;\n  flex: 1;\n}\n.control-group[_ngcontent-%COMP%] {\n  flex: 1;\n  display: flex;\n  flex-direction: column;\n  gap: 16px;\n}\n.control-group__label[_ngcontent-%COMP%] {\n  font-size: 1.2rem;\n  margin: 0;\n}\n.control-group__content[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 8px;\n  align-items: flex-end;\n}\n.control-group__content[_ngcontent-%COMP%]    > *[_ngcontent-%COMP%] {\n  flex: 1;\n}\n/*# sourceMappingURL=control-group.component.css.map */"] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(ControlGroupComponent, [{
    type: Component,
    args: [{ selector: "lg-control-group", standalone: true, template: `
      <div class="control-group">
          @if (label()) {
              <p class="control-group__label"> {{ label() }} </p>
          }
          <div class="control-group__content">
              <ng-content></ng-content>
          </div>
      </div>
  `, styles: ["/* angular:styles/component:scss;8ceb84cd2997b24e01afe66158c8310aebfc9a9cf678a556dbd8fda32d27ee07;/Users/khripunovpavel/Documents/my/lasagna/lasagna/src/app/shared/view/ui/form/control-group.component.ts */\n:host {\n  display: flex;\n  flex: 1;\n}\n.control-group {\n  flex: 1;\n  display: flex;\n  flex-direction: column;\n  gap: 16px;\n}\n.control-group__label {\n  font-size: 1.2rem;\n  margin: 0;\n}\n.control-group__content {\n  display: flex;\n  gap: 8px;\n  align-items: flex-end;\n}\n.control-group__content > * {\n  flex: 1;\n}\n/*# sourceMappingURL=control-group.component.css.map */\n"] }]
  }], () => [], null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(ControlGroupComponent, { className: "ControlGroupComponent", filePath: "src/app/shared/view/ui/form/control-group.component.ts", lineNumber: 47 });
})();

// src/app/shared/view/ui/form/tags-control.component.ts
var _c02 = (a0) => ({ background: a0 });
var _forTrack0 = ($index, $item) => ($item == null ? null : $item.name) ?? ($item == null ? null : $item.label) ?? $item;
function TagsControlComponent_ng_template_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275text(0);
  }
  if (rf & 2) {
    const item_r1 = ctx.item;
    \u0275\u0275textInterpolate1(" ", (item_r1 == null ? null : item_r1.name) ?? (item_r1 == null ? null : item_r1.label) ?? item_r1, " ");
  }
}
function TagsControlComponent_ng_template_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275text(0);
  }
  if (rf & 2) {
    const item_r2 = ctx.item;
    \u0275\u0275textInterpolate1(" ", (item_r2 == null ? null : item_r2.name) ?? (item_r2 == null ? null : item_r2.label) ?? item_r2, " ");
  }
}
function TagsControlComponent_ng_template_4_For_1_Template(rf, ctx) {
  if (rf & 1) {
    const _r3 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 5)(1, "span", 6);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "span", 7);
    \u0275\u0275listener("click", function TagsControlComponent_ng_template_4_For_1_Template_span_click_3_listener() {
      const item_r4 = \u0275\u0275restoreView(_r3).$implicit;
      const clear_r5 = \u0275\u0275nextContext().clear;
      return \u0275\u0275resetView(clear_r5(item_r4));
    });
    \u0275\u0275text(4, "\xD7");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const item_r4 = ctx.$implicit;
    \u0275\u0275property("ngStyle", \u0275\u0275pureFunction1(2, _c02, (item_r4 == null ? null : item_r4.color) ? item_r4 == null ? null : item_r4.color : null));
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", (item_r4 == null ? null : item_r4.name) ?? (item_r4 == null ? null : item_r4.label) ?? item_r4, " ");
  }
}
function TagsControlComponent_ng_template_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275repeaterCreate(0, TagsControlComponent_ng_template_4_For_1_Template, 5, 4, "div", 5, _forTrack0);
  }
  if (rf & 2) {
    const items_r6 = ctx.items;
    \u0275\u0275repeater(items_r6);
  }
}
var TagsControlComponent = class _TagsControlComponent {
  _selectResourcesService;
  constructor(_selectResourcesService) {
    this._selectResourcesService = _selectResourcesService;
  }
  placeholder = "";
  resource = input("");
  autoLoad = input(false);
  multi = input(false);
  loadedList = signal([]);
  onSelected = output();
  value = null;
  selectComponent = viewChild(NgSelectComponent);
  addTagFn(name) {
    return Tag.fromRaw(name);
  }
  onChange = () => {
  };
  onTouched = () => {
  };
  searchFn = (term, item) => {
    const val = item;
    return val?.toString().toLowerCase().includes(term.toLowerCase());
  };
  compareWith = (a, b) => {
    const valA = a;
    const valB = b;
    return valA === valB;
  };
  writeValue(value) {
    this.change(value);
  }
  change(value) {
    if (Array.isArray(value)) {
      this.value = value.map((item) => Tag.fromRaw(item).toDTO());
    } else {
      this.value = Tag.fromRaw(value).toDTO();
    }
    console.log("new tags value", value);
    this.onChange(this.value);
  }
  registerOnChange(fn) {
    this.onChange = fn;
  }
  registerOnTouched(fn) {
    this.onTouched = fn;
  }
  onChangeInput(value) {
    this.change(value);
  }
  onChangeSelect(value) {
    this.change(value);
    this.onSelected.emit(value);
  }
  ngOnInit() {
    this._selectResourcesService.register(this.resource());
    if (this.autoLoad()) {
      this._selectResourcesService.load([this.resource()]);
    }
    this._selectResourcesService.subscribe((registry) => {
      const items = registry.get(this.resource())?.list ?? [];
      this.loadedList.set(items);
    });
  }
  reload() {
    return this._selectResourcesService.load([this.resource()], true);
  }
  static \u0275fac = function TagsControlComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _TagsControlComponent)(\u0275\u0275directiveInject(SelectResourcesService, 8));
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _TagsControlComponent, selectors: [["lg-tags-control"]], viewQuery: function TagsControlComponent_Query(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275viewQuerySignal(ctx.selectComponent, NgSelectComponent, 5);
    }
    if (rf & 2) {
      \u0275\u0275queryAdvance();
    }
  }, inputs: { placeholder: "placeholder", resource: [1, "resource"], autoLoad: [1, "autoLoad"], multi: [1, "multi"] }, outputs: { onSelected: "onSelected" }, features: [\u0275\u0275ProvidersFeature([
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => _TagsControlComponent),
      multi: true
    }
  ])], decls: 5, vars: 8, consts: [[1, "tags-control"], [3, "change", "ngModelChange", "addTag", "appendTo", "compareWith", "items", "multiple", "ngModel", "placeholder", "searchFn"], ["ng-label-tmp", ""], ["ng-option-tmp", ""], ["ng-multi-label-tmp", ""], [1, "ng-value", 3, "ngStyle"], [1, "ng-value-label"], ["aria-hidden", "true", 1, "ng-value-icon", "right", 3, "click"]], template: function TagsControlComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "div", 0)(1, "ng-select", 1);
      \u0275\u0275listener("change", function TagsControlComponent_Template_ng_select_change_1_listener($event) {
        return ctx.onChangeSelect($event);
      })("ngModelChange", function TagsControlComponent_Template_ng_select_ngModelChange_1_listener($event) {
        return ctx.onChangeInput($event);
      });
      \u0275\u0275template(2, TagsControlComponent_ng_template_2_Template, 1, 1, "ng-template", 2)(3, TagsControlComponent_ng_template_3_Template, 1, 1, "ng-template", 3)(4, TagsControlComponent_ng_template_4_Template, 2, 0, "ng-template", 4);
      \u0275\u0275elementEnd()();
    }
    if (rf & 2) {
      \u0275\u0275advance();
      \u0275\u0275property("addTag", ctx.addTagFn)("appendTo", "body")("compareWith", ctx.compareWith)("items", ctx.loadedList())("multiple", ctx.multi())("ngModel", ctx.value)("placeholder", ctx.placeholder)("searchFn", ctx.searchFn);
    }
  }, dependencies: [
    NgSelectComponent,
    FormsModule,
    NgControlStatus,
    NgModel,
    NgOptionTemplateDirective,
    NgLabelTemplateDirective,
    NgMultiLabelTemplateDirective,
    NgStyle
  ], styles: ["/* angular:styles/component:scss;350aa6bbb8a2cb7071496b299ed22ed5e400c6b80bbedf06b89e270c9e36d21c;/Users/khripunovpavel/Documents/my/lasagna/lasagna/src/app/shared/view/ui/form/tags-control.component.ts */\nlg-tags-control {\n  display: flex;\n  flex: 1;\n  min-width: 150px;\n}\n.tags-control {\n  flex: 1;\n  width: 100%;\n}\n.tags-control .ng-select .ng-select-container {\n  height: 51px;\n}\n.tags-control .ng-select .ng-select-container {\n  border: none;\n  border-radius: 12px;\n  background-color: var(--control-bg);\n}\n.tags-control .ng-select .ng-select-container .ng-input {\n  top: 16px !important;\n}\n.tags-control .ng-select .ng-select-container .ng-input > input {\n  color: var(--text);\n  font-family: inherit;\n  font-size: inherit;\n}\n.tags-control .ng-dropdown-panel {\n  border: none;\n  box-shadow: 0 4px 16px 0 rgba(0, 0, 0, 0.1);\n  border-radius: 12px;\n  overflow: hidden;\n}\n.tags-control .ng-dropdown-panel .ng-option {\n  padding: 16px;\n  border-radius: 12px;\n}\n/*# sourceMappingURL=tags-control.component.css.map */\n"], encapsulation: 2 });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(TagsControlComponent, [{
    type: Component,
    args: [{ selector: "lg-tags-control", standalone: true, template: `
      <div class="tags-control">
          <ng-select (change)="onChangeSelect($event)"
                     (ngModelChange)="onChangeInput($event)"
                     [addTag]="addTagFn"
                     [appendTo]="'body'"
                     [compareWith]="compareWith"
                     [items]="loadedList()"
                     [multiple]="multi()"
                     [ngModel]="value"
                     [placeholder]="placeholder"
                     [searchFn]="searchFn">
              <ng-template let-item="item" ng-label-tmp>
                  {{ $any(item)?.name ?? $any(item)?.label ?? item }}
              </ng-template>
              <ng-template let-item="item" ng-option-tmp>
                  {{ $any(item)?.name ?? $any(item)?.label ?? item }}
              </ng-template>
              <ng-template let-clear="clear" let-items="items" ng-multi-label-tmp>
                  @for (item of items;track $any(item)?.name ?? $any(item)?.label ?? item) {
                      <div class="ng-value"
                           [ngStyle]="{background: $any(item)?.color ? $any(item)?.color : null}">
                          <span class="ng-value-label">
                              {{ $any(item)?.name ?? $any(item)?.label ?? item }}
                          </span>
                          <span class="ng-value-icon right" (click)="clear(item)" aria-hidden="true">\xD7</span>
                      </div>
                  }

              </ng-template>
          </ng-select>
      </div>
  `, imports: [
      NgSelectComponent,
      FormsModule,
      NgOptionTemplateDirective,
      NgLabelTemplateDirective,
      NgMultiLabelTemplateDirective,
      NgStyle
    ], providers: [
      {
        provide: NG_VALUE_ACCESSOR,
        useExisting: forwardRef(() => TagsControlComponent),
        multi: true
      }
    ], encapsulation: ViewEncapsulation.None, styles: ["/* angular:styles/component:scss;350aa6bbb8a2cb7071496b299ed22ed5e400c6b80bbedf06b89e270c9e36d21c;/Users/khripunovpavel/Documents/my/lasagna/lasagna/src/app/shared/view/ui/form/tags-control.component.ts */\nlg-tags-control {\n  display: flex;\n  flex: 1;\n  min-width: 150px;\n}\n.tags-control {\n  flex: 1;\n  width: 100%;\n}\n.tags-control .ng-select .ng-select-container {\n  height: 51px;\n}\n.tags-control .ng-select .ng-select-container {\n  border: none;\n  border-radius: 12px;\n  background-color: var(--control-bg);\n}\n.tags-control .ng-select .ng-select-container .ng-input {\n  top: 16px !important;\n}\n.tags-control .ng-select .ng-select-container .ng-input > input {\n  color: var(--text);\n  font-family: inherit;\n  font-size: inherit;\n}\n.tags-control .ng-dropdown-panel {\n  border: none;\n  box-shadow: 0 4px 16px 0 rgba(0, 0, 0, 0.1);\n  border-radius: 12px;\n  overflow: hidden;\n}\n.tags-control .ng-dropdown-panel .ng-option {\n  padding: 16px;\n  border-radius: 12px;\n}\n/*# sourceMappingURL=tags-control.component.css.map */\n"] }]
  }], () => [{ type: SelectResourcesService, decorators: [{
    type: Optional
  }] }], { placeholder: [{
    type: Input
  }] });
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(TagsControlComponent, { className: "TagsControlComponent", filePath: "src/app/shared/view/ui/form/tags-control.component.ts", lineNumber: 128 });
})();

// src/app/features/recipes/view/add-recipe/add-recipe-form.component.ts
var _c03 = ["tooltipComponent"];
var _c1 = ["products"];
var _c2 = ["productsSelector"];
var _c3 = ["nameField"];
var _c4 = (a0) => ({ unit: a0 });
var _forTrack02 = ($index, $item) => $item.value.amount + $index + 1;
function AddRecipeFormComponent_ng_template_14_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "lg-unit-switcher", 19);
  }
}
function AddRecipeFormComponent_For_20_Conditional_12_Template(rf, ctx) {
  if (rf & 1) {
    const _r5 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "lg-multiselect", 32);
    \u0275\u0275listener("onSelected", function AddRecipeFormComponent_For_20_Conditional_12_Template_lg_multiselect_onSelected_0_listener() {
      \u0275\u0275restoreView(_r5);
      const \u0275$index_33_r3 = \u0275\u0275nextContext().$index;
      const amount_r6 = \u0275\u0275reference(15);
      const ctx_r3 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r3.onIngredientSelected(amount_r6, \u0275$index_33_r3, ["product_id", "name"]));
    });
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    \u0275\u0275property("resource", "recipes")("autoLoad", true);
  }
}
function AddRecipeFormComponent_For_20_Conditional_13_Template(rf, ctx) {
  if (rf & 1) {
    const _r7 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "lg-multiselect", 33, 3);
    \u0275\u0275listener("onSelected", function AddRecipeFormComponent_For_20_Conditional_13_Template_lg_multiselect_onSelected_0_listener() {
      \u0275\u0275restoreView(_r7);
      const \u0275$index_33_r3 = \u0275\u0275nextContext().$index;
      const amount_r6 = \u0275\u0275reference(15);
      const ctx_r3 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r3.onIngredientSelected(amount_r6, \u0275$index_33_r3, ["recipe_id", "name"]));
    });
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    \u0275\u0275property("resource", "products")("autoLoad", true);
  }
}
function AddRecipeFormComponent_For_20_ng_template_17_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "lg-unit-switcher", 34);
  }
}
function AddRecipeFormComponent_For_20_Conditional_21_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "hr", 31);
  }
}
function AddRecipeFormComponent_For_20_Template(rf, ctx) {
  if (rf & 1) {
    const _r2 = \u0275\u0275getCurrentView();
    \u0275\u0275elementContainerStart(0, 12);
    \u0275\u0275elementStart(1, "lg-controls-row", 20)(2, "lg-gap-column", 21)(3, "lg-control");
    \u0275\u0275elementContainerStart(4, 22);
    \u0275\u0275elementStart(5, "lg-button", 23);
    \u0275\u0275listener("click", function AddRecipeFormComponent_For_20_Template_lg_button_click_5_listener() {
      const \u0275$index_33_r3 = \u0275\u0275restoreView(_r2).$index;
      const ctx_r3 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r3.closeRecipeField(\u0275$index_33_r3));
    });
    \u0275\u0275text(6);
    \u0275\u0275pipe(7, "translate");
    \u0275\u0275elementEnd();
    \u0275\u0275elementContainerEnd();
    \u0275\u0275elementContainerStart(8, 24);
    \u0275\u0275elementStart(9, "lg-button", 23);
    \u0275\u0275listener("click", function AddRecipeFormComponent_For_20_Template_lg_button_click_9_listener() {
      const \u0275$index_33_r3 = \u0275\u0275restoreView(_r2).$index;
      const ctx_r3 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r3.openRecipeField(\u0275$index_33_r3));
    });
    \u0275\u0275text(10);
    \u0275\u0275pipe(11, "translate");
    \u0275\u0275elementEnd();
    \u0275\u0275elementContainerEnd();
    \u0275\u0275conditionalCreate(12, AddRecipeFormComponent_For_20_Conditional_12_Template, 1, 2, "lg-multiselect", 25)(13, AddRecipeFormComponent_For_20_Conditional_13_Template, 2, 2, "lg-multiselect", 26);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(14, "lg-number-input", 27, 1);
    \u0275\u0275pipe(16, "translate");
    \u0275\u0275listener("onKeydown", function AddRecipeFormComponent_For_20_Template_lg_number_input_onKeydown_14_listener() {
      \u0275\u0275restoreView(_r2);
      const ctx_r3 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r3.addLast());
    });
    \u0275\u0275template(17, AddRecipeFormComponent_For_20_ng_template_17_Template, 1, 0, "ng-template", 9);
    \u0275\u0275elementEnd();
    \u0275\u0275elementContainerStart(18, 28);
    \u0275\u0275elementStart(19, "lg-button", 29);
    \u0275\u0275listener("click", function AddRecipeFormComponent_For_20_Template_lg_button_click_19_listener() {
      const \u0275$index_33_r3 = \u0275\u0275restoreView(_r2).$index;
      const ctx_r3 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r3.deleteIngredient(\u0275$index_33_r3));
    });
    \u0275\u0275element(20, "mat-icon", 30);
    \u0275\u0275elementEnd();
    \u0275\u0275elementContainerEnd();
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(21, AddRecipeFormComponent_For_20_Conditional_21_Template, 1, 0, "hr", 31);
    \u0275\u0275elementContainerEnd();
  }
  if (rf & 2) {
    const \u0275$index_33_r3 = ctx.$index;
    const \u0275$count_33_r8 = ctx.$count;
    const ctx_r3 = \u0275\u0275nextContext();
    \u0275\u0275property("formGroupName", \u0275$index_33_r3);
    \u0275\u0275advance();
    \u0275\u0275property("mobileMode", true);
    \u0275\u0275advance();
    \u0275\u0275property("size", "small");
    \u0275\u0275advance(3);
    \u0275\u0275property("flat", true)("size", "small")("active", !ctx_r3.recipeFieldState()[\u0275$index_33_r3]);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind1(7, 18, "recipe.form.ingredients.product_id.label"), " ");
    \u0275\u0275advance(3);
    \u0275\u0275property("flat", true)("size", "small")("active", ctx_r3.recipeFieldState()[\u0275$index_33_r3]);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind1(11, 20, "recipe.form.ingredients.recipe_id.label"), " ");
    \u0275\u0275advance(2);
    \u0275\u0275conditional(ctx_r3.recipeFieldState()[\u0275$index_33_r3] ? 12 : 13);
    \u0275\u0275advance(2);
    \u0275\u0275property("placeholder", \u0275\u0275pipeBind2(16, 22, "recipe.form.ingredients.amount.placeholder", \u0275\u0275pureFunction1(25, _c4, (ctx_r3.form.value.ingredients == null ? null : ctx_r3.form.value.ingredients[\u0275$index_33_r3] == null ? null : ctx_r3.form.value.ingredients[\u0275$index_33_r3].unit) || "gram")));
    \u0275\u0275advance(5);
    \u0275\u0275styleMap("danger");
    \u0275\u0275property("size", "tiny")("icon", true);
    \u0275\u0275advance(2);
    \u0275\u0275conditional(!(\u0275$index_33_r3 === \u0275$count_33_r8 - 1) ? 21 : -1);
  }
}
function AddRecipeFormComponent_Conditional_28_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "lg-chips-list", 17);
  }
  if (rf & 2) {
    const ctx_r3 = \u0275\u0275nextContext();
    const categorySelect_r9 = \u0275\u0275reference(27);
    \u0275\u0275property("control", categorySelect_r9)("items", ctx_r3.topCategories());
  }
}
var AddRecipeFormComponent = class _AddRecipeFormComponent {
  _recipesRepository;
  _selectResourcesService;
  _router;
  _aRoute;
  _notificationsService;
  constructor(_recipesRepository, _selectResourcesService, _router, _aRoute, _notificationsService) {
    this._recipesRepository = _recipesRepository;
    this._selectResourcesService = _selectResourcesService;
    this._router = _router;
    this._aRoute = _aRoute;
    this._notificationsService = _notificationsService;
  }
  recipe = input(void 0);
  uuid = injectParams("uuid");
  form = new FormGroup({
    name: new FormControl(null, Validators.required),
    description: new FormControl(""),
    outcome_amount: new FormControl(null),
    outcome_unit: new FormControl(""),
    ingredients: new FormArray([
      this._getIngredientGroup()
    ]),
    category_id: new FormControl(null),
    tags: new FormControl([])
  }, (group) => {
    const recipeTmpModel = Recipe.fromRaw(group.value);
    if (recipeTmpModel.outcomeAmountGreaterThanIngredients) {
      return { outcomeAmountGreaterThanIngredients: true };
    }
    return null;
  });
  recipeFieldState = signal({});
  tooltipComponent = viewChildren("tooltipComponent");
  productsWidget = viewChildren("products");
  productsSelector = viewChildren("productsSelector");
  nameField = viewChild("nameField");
  topCategories = signal([]);
  recipeEffect = effect(() => {
    if (this.recipe()) {
      this.fillForm(this.recipe());
    }
  });
  get ingredients() {
    return this.form.get("ingredients");
  }
  get _formValid() {
    return this.form.valid && !this.checkCycleRecipe(this.form.getRawValue().ingredients, this.uuid());
  }
  fillForm(recipe) {
    this.form.reset({
      ingredients: []
    });
    this.ingredients.clear();
    if (!recipe) {
      return;
    }
    console.log("newformValue", recipeToFormValue(recipe));
    this.form.reset(__spreadProps(__spreadValues({}, recipeToFormValue(recipe)), {
      ingredients: []
    }));
    if (recipe.ingredients.length) {
      recipe.ingredients.forEach((ingredient, index) => {
        this.ingredients.push(this._getIngredientGroup(ingredient));
        if (ingredient.recipe_id) {
          this.openRecipeField(index);
        }
      });
    } else {
      this.ingredients.push(this._getIngredientGroup());
    }
    this.form.updateValueAndValidity();
    this.form.markAsPristine();
  }
  resetForm(recipe) {
    this.fillForm(recipe);
    this._loadUsingHistory();
    this.form.markAsPristine();
  }
  validateForm() {
    if (!this._formValid) {
      this._notificationsService.error(this._notificationsService.parseFormErrors(this.form).join(", "));
      return false;
    }
    return true;
  }
  addLast() {
    const lastControl = this.ingredients.at(this.ingredients.length - 1);
    if (lastControl.value.name || lastControl.value.amount || lastControl.value.product_id) {
      this.addIngredient();
    }
  }
  ngOnInit() {
    this._loadUsingHistory();
    this.form.valueChanges.pipe(debounceTime(100)).subscribe({
      next: (values) => {
        console.log("form values", values);
        if (!this.form.dirty) {
          return;
        }
        this.recipe()?.update(this.form.getRawValue());
        const hasCycledRecipe = this.checkCycleRecipe(this.form.getRawValue().ingredients, this.uuid());
        if (hasCycledRecipe) {
          this._notificationsService.error("You cannot add a recipe to itself");
        }
      }
    });
  }
  ngAfterViewInit() {
    this._selectResourcesService.load().then((resources) => {
    });
    if (!this.recipe()?.uuid) {
      this.nameField().focus();
    }
  }
  addIngredient() {
    this.ingredients.push(this._getIngredientGroup());
    this.form.markAsDirty();
  }
  deleteIngredient(index) {
    this.ingredients.removeAt(index);
    this.form.markAsDirty();
  }
  onIngredientSelected(amount, index, clearField) {
    amount.focus();
    const value = this.ingredients.at(index).value;
    this.ingredients.at(index).patchValue(__spreadProps(__spreadValues({}, Array.isArray(clearField) ? clearField.reduce((acc, field) => __spreadProps(__spreadValues({}, acc), {
      [field]: null
    }), {}) : { [clearField]: null }), {
      unit: value.product_id?.unit || value.recipe_id?.unit || "gram"
    }));
  }
  openRecipeField(index) {
    this.recipeFieldState.update((value) => {
      return __spreadProps(__spreadValues({}, value), {
        [index]: true
      });
    });
  }
  closeRecipeField(index) {
    this.recipeFieldState.update((value) => {
      return __spreadProps(__spreadValues({}, value), {
        [index]: false
      });
    });
  }
  checkCycleRecipe(ingredients, recipeUUID) {
    let match = false;
    for (const ingr of ingredients) {
      const hasSubRecipe = ingr.recipe_id?.uuid;
      if (hasSubRecipe && hasSubRecipe === recipeUUID) {
        match = true;
        break;
      }
    }
    return match;
  }
  _loadUsingHistory() {
    this._recipesRepository.getTopCategories().then((categories) => {
      this.topCategories.set(categories.map((category) => ({
        label: category.name,
        value: {
          uuid: category.uuid,
          name: category.name
        }
      })));
    });
  }
  _getIngredientGroup(ingredient) {
    return new FormGroup({
      name: new FormControl(ingredient?.name),
      amount: new FormControl(ingredient?.amount?.toString() ?? null),
      product_id: new FormControl(ingredient?.product_id ? ingredient.product_id : null),
      recipe_id: new FormControl(ingredient?.recipe_id ? ingredient.recipe_id : null),
      unit: new FormControl(ingredient?.unit ?? "gram")
    }, (group) => {
      const ingredient2 = Ingredient.fromRaw(group.value);
      if (ingredient2.allEmpty) {
        return null;
      }
      if (ingredient2.typeSelected && !ingredient2.amountValid) {
        return {
          ingredientAmountRequired: true
        };
      }
      if (!this.uuid)
        return null;
      const uuid = this.uuid();
      if (this.checkCycleRecipe([group.value], uuid)) {
        return { cycleRecipe: true };
      }
      if (!ingredient2.typeSelected) {
        return { ingredientRequired: true };
      }
      return null;
    });
  }
  static \u0275fac = function AddRecipeFormComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _AddRecipeFormComponent)(\u0275\u0275directiveInject(RecipesRepository), \u0275\u0275directiveInject(SelectResourcesService), \u0275\u0275directiveInject(Router), \u0275\u0275directiveInject(ActivatedRoute), \u0275\u0275directiveInject(NotificationsService));
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _AddRecipeFormComponent, selectors: [["lg-add-recipe-form"]], viewQuery: function AddRecipeFormComponent_Query(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275viewQuerySignal(ctx.tooltipComponent, _c03, 5);
      \u0275\u0275viewQuerySignal(ctx.productsWidget, _c1, 5);
      \u0275\u0275viewQuerySignal(ctx.productsSelector, _c2, 5);
      \u0275\u0275viewQuerySignal(ctx.nameField, _c3, 5);
    }
    if (rf & 2) {
      \u0275\u0275queryAdvance(4);
    }
  }, inputs: { recipe: [1, "recipe"] }, features: [\u0275\u0275ProvidersFeature([
    {
      provide: SelectResourcesService,
      useClass: SelectResourcesService
    }
  ])], decls: 30, vars: 34, consts: [["nameField", ""], ["amount", ""], ["categorySelect", ""], ["productsSelector", ""], [3, "formGroup"], [3, "position"], ["appendTo", "body", "formControlName", "name", "lgExpand", "", 3, "key", "placeholder", "resource"], ["formControlName", "description", "lgExpand", "", 3, "placeholder"], ["formControlName", "outcome_amount", "lgExpand", "", "lgParseMath", "", 3, "placeholder"], ["lgExtraTpl", "", "place", "after"], ["lgExpand", "", 3, "label"], ["formArrayName", "ingredients", "lgExpand", "", 3, "size"], [3, "formGroupName"], [3, "click", "size"], [2, "--control-bg", "#ffffff", 3, "equal", "mobileMode"], [3, "position", "size"], ["appendTo", "body", "formControlName", "category_id", "lgExpand", "", 3, "resource"], [3, "control", "items"], ["formControlName", "tags", 3, "multi", "resource"], ["formControlName", "outcome_unit"], [3, "mobileMode"], [3, "size"], ["ngProjectAs", "labelTpl", 5, ["labelTpl"]], [3, "click", "flat", "size", "active"], ["ngProjectAs", "afterLabelTpl", 5, ["afterLabelTpl"]], ["appendTo", "body", "formControlName", "recipe_id", 3, "resource", "autoLoad"], ["appendTo", "body", "formControlName", "product_id", 3, "resource", "autoLoad"], ["lgParseMath", "", "formControlName", "amount", 3, "onKeydown", "placeholder"], ["ngProjectAs", "rowActions", 5, ["rowActions"]], [3, "click", "size", "icon"], ["aria-hidden", "false", "fontIcon", "close"], ["size", "2", "lgExpand", "", "color", "#fafafa"], ["appendTo", "body", "formControlName", "recipe_id", 3, "onSelected", "resource", "autoLoad"], ["appendTo", "body", "formControlName", "product_id", 3, "onSelected", "resource", "autoLoad"], ["formControlName", "unit"]], template: function AddRecipeFormComponent_Template(rf, ctx) {
    if (rf & 1) {
      const _r1 = \u0275\u0275getCurrentView();
      \u0275\u0275elementStart(0, "form", 4)(1, "lg-gap-column")(2, "lg-card")(3, "lg-gap-column", 5);
      \u0275\u0275element(4, "lg-autocomplete", 6, 0);
      \u0275\u0275pipe(6, "translate");
      \u0275\u0275element(7, "lg-textarea", 7);
      \u0275\u0275pipe(8, "translate");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(9, "lg-card")(10, "lg-gap-column", 5)(11, "lg-number-input", 8, 1);
      \u0275\u0275pipe(13, "translate");
      \u0275\u0275template(14, AddRecipeFormComponent_ng_template_14_Template, 1, 0, "ng-template", 9);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(15, "lg-control-group", 10);
      \u0275\u0275pipe(16, "translate");
      \u0275\u0275elementStart(17, "lg-gap-column", 5)(18, "lg-gap-column", 11);
      \u0275\u0275repeaterCreate(19, AddRecipeFormComponent_For_20_Template, 22, 27, "ng-container", 12, _forTrack02);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(21, "lg-button", 13);
      \u0275\u0275listener("click", function AddRecipeFormComponent_Template_lg_button_click_21_listener() {
        \u0275\u0275restoreView(_r1);
        return \u0275\u0275resetView(ctx.addIngredient());
      });
      \u0275\u0275text(22);
      \u0275\u0275pipe(23, "translate");
      \u0275\u0275elementEnd()()()()();
      \u0275\u0275elementStart(24, "lg-gap-row", 14)(25, "lg-gap-column", 15);
      \u0275\u0275element(26, "lg-multiselect", 16, 2);
      \u0275\u0275conditionalCreate(28, AddRecipeFormComponent_Conditional_28_Template, 1, 2, "lg-chips-list", 17);
      \u0275\u0275elementEnd();
      \u0275\u0275element(29, "lg-tags-control", 18);
      \u0275\u0275elementEnd()()();
    }
    if (rf & 2) {
      \u0275\u0275property("formGroup", ctx.form);
      \u0275\u0275advance(3);
      \u0275\u0275property("position", "start");
      \u0275\u0275advance();
      \u0275\u0275property("key", "name")("placeholder", \u0275\u0275pipeBind1(6, 24, "recipe.form.name.placeholder"))("resource", "recipes-names");
      \u0275\u0275advance(3);
      \u0275\u0275property("placeholder", \u0275\u0275pipeBind1(8, 26, "recipe.form.description.placeholder"));
      \u0275\u0275advance(3);
      \u0275\u0275property("position", "start");
      \u0275\u0275advance();
      \u0275\u0275property("placeholder", \u0275\u0275pipeBind1(13, 28, "recipe.form.outcome_amount.placeholder"));
      \u0275\u0275advance(4);
      \u0275\u0275property("label", \u0275\u0275interpolate(\u0275\u0275pipeBind1(16, 30, "recipe.form.ingredients.label")));
      \u0275\u0275advance(2);
      \u0275\u0275property("position", "start");
      \u0275\u0275advance();
      \u0275\u0275property("size", "medium");
      \u0275\u0275advance();
      \u0275\u0275repeater(ctx.ingredients.controls);
      \u0275\u0275advance(2);
      \u0275\u0275styleMap("success");
      \u0275\u0275property("size", "small");
      \u0275\u0275advance();
      \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind1(23, 32, "recipe.form.ingredients.add-btn"), " ");
      \u0275\u0275advance(2);
      \u0275\u0275property("equal", true)("mobileMode", true);
      \u0275\u0275advance();
      \u0275\u0275property("position", "start")("size", "medium");
      \u0275\u0275advance();
      \u0275\u0275property("resource", "recipes-categories");
      \u0275\u0275advance(2);
      \u0275\u0275conditional(ctx.topCategories().length ? 28 : -1);
      \u0275\u0275advance();
      \u0275\u0275property("multi", true)("resource", "tags");
    }
  }, dependencies: [
    ReactiveFormsModule,
    \u0275NgNoValidate,
    NgControlStatus,
    NgControlStatusGroup,
    FormGroupDirective,
    FormControlName,
    FormGroupName,
    FormArrayName,
    ControlComponent,
    ControlGroupComponent,
    GapColumnComponent,
    ButtonComponent,
    TextareaComponent,
    MultiselectComponent,
    NumberInputComponent,
    ControlsRowComponent,
    ExpandDirective,
    ParseMathDirective,
    ChipsListComponent,
    AutocompleteComponent,
    FormsModule,
    MatIcon,
    TranslatePipe,
    UnitSwitcherComponent,
    CardComponent,
    ControlExtraTemplateDirective,
    TagsControlComponent,
    GapRowComponent
  ], encapsulation: 2 });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(AddRecipeFormComponent, [{
    type: Component,
    args: [{ selector: "lg-add-recipe-form", standalone: true, imports: [
      ReactiveFormsModule,
      InputComponent,
      ControlComponent,
      ControlGroupComponent,
      GapColumnComponent,
      ButtonComponent,
      TextareaComponent,
      MultiselectComponent,
      NumberInputComponent,
      ControlsRowComponent,
      ExpandDirective,
      ParseMathDirective,
      ChipsListComponent,
      AutocompleteComponent,
      FormsModule,
      MatIcon,
      TranslatePipe,
      UnitSwitcherComponent,
      CardComponent,
      ControlExtraTemplateDirective,
      TagsControlComponent,
      GapRowComponent
    ], providers: [
      {
        provide: SelectResourcesService,
        useClass: SelectResourcesService
      }
    ], template: `<form [formGroup]="form">
  <lg-gap-column>
    <lg-card>
      <lg-gap-column [position]="'start'">
        <lg-autocomplete #nameField
                         [key]="'name'" [placeholder]="'recipe.form.name.placeholder'|translate"
                         [resource]="'recipes-names'"
                         appendTo="body"
                         formControlName="name"
                         lgExpand></lg-autocomplete>

        <lg-textarea [placeholder]="'recipe.form.description.placeholder'|translate"
                     formControlName="description"
                     lgExpand></lg-textarea>
      </lg-gap-column>
    </lg-card>
    <lg-card>

      <lg-gap-column [position]="'start'">

        <lg-number-input #amount
                         [placeholder]="'recipe.form.outcome_amount.placeholder'|translate"
                         formControlName="outcome_amount"
                         lgExpand
                         lgParseMath>
          <ng-template lgExtraTpl place="after">
            <lg-unit-switcher formControlName="outcome_unit">
            </lg-unit-switcher>
          </ng-template>
        </lg-number-input>

        <lg-control-group label="{{ 'recipe.form.ingredients.label'|translate }}" lgExpand>
          <lg-gap-column [position]="'start'">
            <lg-gap-column [size]="'medium'" formArrayName="ingredients" lgExpand>
              @for (control of ingredients.controls; track (control.value.amount + i + 1); let i = $index,
                last = $last) {
                <ng-container [formGroupName]="i">
                  <lg-controls-row [mobileMode]="true">
                    <lg-gap-column [size]="'small'">

                      <lg-control>
                        <ng-container ngProjectAs="labelTpl">
                          <lg-button (click)="closeRecipeField(i)"
                                     [flat]="true"
                                     [size]="'small'"
                                     [active]="!recipeFieldState()[i]">
                            {{ 'recipe.form.ingredients.product_id.label'|translate }}
                          </lg-button>
                        </ng-container>

                        <ng-container ngProjectAs="afterLabelTpl">
                          <lg-button (click)="openRecipeField(i)"
                                     [flat]="true"
                                     [size]="'small'"
                                     [active]="recipeFieldState()[i]">
                            {{ 'recipe.form.ingredients.recipe_id.label'|translate }}
                          </lg-button>
                        </ng-container>

                        @if (recipeFieldState()[i]) {
                          <lg-multiselect [resource]="'recipes'"
                                          (onSelected)="onIngredientSelected(amount, i, ['product_id', 'name'])"
                                          [autoLoad]="true"
                                          appendTo="body"
                                          formControlName="recipe_id"></lg-multiselect>
                        } @else {
                          <lg-multiselect [resource]="'products'"
                                          (onSelected)="onIngredientSelected(amount, i, ['recipe_id', 'name'])"
                                          [autoLoad]="true"
                                          #productsSelector
                                          appendTo="body"
                                          formControlName="product_id">
                          </lg-multiselect>
                        }

                      </lg-control>
                    </lg-gap-column>

                    <lg-number-input #amount
                                     lgParseMath
                                     (onKeydown)="addLast()"
                                     [placeholder]="'recipe.form.ingredients.amount.placeholder'|translate:{unit:(form.value.ingredients?.[i]?.unit || 'gram')}"
                                     formControlName="amount">
                      <ng-template lgExtraTpl place="after">
                        <lg-unit-switcher formControlName="unit">
                        </lg-unit-switcher>
                      </ng-template>
                    </lg-number-input>

                    <ng-container ngProjectAs="rowActions">
                      <lg-button [style]="'danger'"
                                 [size]="'tiny'"
                                 [icon]="true"
                                 (click)="deleteIngredient(i)">
                        <mat-icon aria-hidden="false" fontIcon="close"></mat-icon>
                      </lg-button>
                    </ng-container>
                  </lg-controls-row>
                  @if (!last) {
                    <hr size="2" lgExpand color="#fafafa"/>
                  }
                </ng-container>
              }
            </lg-gap-column>

            <lg-button (click)="addIngredient()"
                       [size]="'small'"
                       [style]="'success'">
              {{ 'recipe.form.ingredients.add-btn'|translate }}
            </lg-button>
          </lg-gap-column>
        </lg-control-group>
      </lg-gap-column>
    </lg-card>

    <lg-gap-row [equal]="true" [mobileMode]="true" style="--control-bg: #ffffff">
      <lg-gap-column [position]="'start'" [size]="'medium'">
        <lg-multiselect #categorySelect
                        [resource]="'recipes-categories'"
                        appendTo="body"
                        formControlName="category_id"
                        lgExpand></lg-multiselect>

        @if (topCategories().length) {
          <lg-chips-list [control]="categorySelect" [items]="topCategories()"></lg-chips-list>
        }
      </lg-gap-column>

      <lg-tags-control [multi]="true"
                       [resource]="'tags'"
                       formControlName="tags"></lg-tags-control>
    </lg-gap-row>
  </lg-gap-column>
</form>
` }]
  }], () => [{ type: RecipesRepository }, { type: SelectResourcesService }, { type: Router }, { type: ActivatedRoute }, { type: NotificationsService }], null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(AddRecipeFormComponent, { className: "AddRecipeFormComponent", filePath: "src/app/features/recipes/view/add-recipe/add-recipe-form.component.ts", lineNumber: 74 });
})();

// src/app/features/recipes/view/add-recipe/add-recipe.component.ts
function AddRecipeComponent_Conditional_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p");
    \u0275\u0275text(1, "You just added new recipe. ");
    \u0275\u0275elementStart(2, "a", 4);
    \u0275\u0275text(3, "Want to have a look?");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    \u0275\u0275advance(2);
    \u0275\u0275property("routerLink", \u0275\u0275interpolate1("/recipes/edit/", ctx));
  }
}
function AddRecipeComponent_Conditional_4_ng_template_5_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "lg-button", 9);
    \u0275\u0275text(1);
    \u0275\u0275pipe(2, "translate");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    let tmp_4_0;
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275styleMap("primary");
    \u0275\u0275property("flat", true)("link", "/recipes/calculate/" + ((tmp_4_0 = ctx_r0.recipe()) == null ? null : tmp_4_0.uuid))("size", "small");
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind1(2, 6, "recipe.calculate-btn"), " ");
  }
}
function AddRecipeComponent_Conditional_4_Conditional_6_ng_template_0_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "lg-fade-in");
    \u0275\u0275text(1);
    \u0275\u0275pipe(2, "translate");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind1(2, 1, "saved-draft-label"), " ");
  }
}
function AddRecipeComponent_Conditional_4_Conditional_6_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275template(0, AddRecipeComponent_Conditional_4_Conditional_6_ng_template_0_Template, 3, 3, "ng-template", 7);
  }
}
function AddRecipeComponent_Conditional_4_ng_template_7_Conditional_0_Template(rf, ctx) {
  if (rf & 1) {
    const _r2 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "lg-button", 11);
    \u0275\u0275listener("click", function AddRecipeComponent_Conditional_4_ng_template_7_Conditional_0_Template_lg_button_click_0_listener() {
      \u0275\u0275restoreView(_r2);
      const ctx_r0 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r0.onRemoveDraft());
    });
    \u0275\u0275text(1);
    \u0275\u0275pipe(2, "translate");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    \u0275\u0275styleMap("danger");
    \u0275\u0275property("flat", true);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind1(2, 4, "recipe.form.delete-draft-btn"), " ");
  }
}
function AddRecipeComponent_Conditional_4_ng_template_7_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    const _r3 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "lg-button", 11);
    \u0275\u0275listener("click", function AddRecipeComponent_Conditional_4_ng_template_7_Conditional_1_Template_lg_button_click_0_listener() {
      \u0275\u0275restoreView(_r3);
      const ctx_r0 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r0.onDeleteRecipe());
    });
    \u0275\u0275text(1);
    \u0275\u0275pipe(2, "translate");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    \u0275\u0275styleMap("danger");
    \u0275\u0275property("flat", true);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind1(2, 4, "recipe.form.delete-btn"), " ");
  }
}
function AddRecipeComponent_Conditional_4_ng_template_7_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275conditionalCreate(0, AddRecipeComponent_Conditional_4_ng_template_7_Conditional_0_Template, 3, 6, "lg-button", 10)(1, AddRecipeComponent_Conditional_4_ng_template_7_Conditional_1_Template, 3, 6, "lg-button", 10);
  }
  if (rf & 2) {
    let tmp_2_0;
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275conditional(ctx_r0.isDraftRoute() ? 0 : ((tmp_2_0 = ctx_r0.recipe()) == null ? null : tmp_2_0.uuid) ? 1 : -1);
  }
}
function AddRecipeComponent_Conditional_4_Conditional_8_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "small", 8);
    \u0275\u0275text(1);
    \u0275\u0275pipe(2, "translate");
    \u0275\u0275pipe(3, "timeAgo");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    let tmp_2_0;
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate2(" ", \u0275\u0275pipeBind1(2, 2, "edited-at-label"), " ", \u0275\u0275pipeBind1(3, 4, (tmp_2_0 = ctx_r0.recipe()) == null ? null : tmp_2_0.updatedAt), " ");
  }
}
function AddRecipeComponent_Conditional_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "lg-gap-row", 5)(1, "lg-title")(2, "span", 6);
    \u0275\u0275text(3);
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(4, "lg-inline-separated-group");
    \u0275\u0275template(5, AddRecipeComponent_Conditional_4_ng_template_5_Template, 3, 8, "ng-template", 7);
    \u0275\u0275conditionalCreate(6, AddRecipeComponent_Conditional_4_Conditional_6_Template, 1, 0, null, 7);
    \u0275\u0275template(7, AddRecipeComponent_Conditional_4_ng_template_7_Template, 2, 1, "ng-template", 7);
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(8, AddRecipeComponent_Conditional_4_Conditional_8_Template, 4, 6, "small", 8);
  }
  if (rf & 2) {
    let tmp_3_0;
    let tmp_4_0;
    let tmp_5_0;
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275property("mobileMode", true)("center", true);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate((tmp_3_0 = ctx_r0.recipe()) == null ? null : tmp_3_0.name);
    \u0275\u0275advance(3);
    \u0275\u0275conditional(ctx_r0.draftRef() && ((tmp_4_0 = ctx_r0.formComponent()) == null ? null : tmp_4_0.form == null ? null : tmp_4_0.form.dirty) ? 6 : -1);
    \u0275\u0275advance(2);
    \u0275\u0275conditional(((tmp_5_0 = ctx_r0.recipe()) == null ? null : tmp_5_0.updatedAt) ? 8 : -1);
  }
}
function AddRecipeComponent_Conditional_5_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "lg-title");
    \u0275\u0275text(1);
    \u0275\u0275pipe(2, "translate");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind1(2, 1, "recipe.form.title"), " ");
  }
}
function AddRecipeComponent_Conditional_8_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275text(0);
    \u0275\u0275pipe(1, "translate");
  }
  if (rf & 2) {
    \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind1(1, 1, "recipe.form.save-btn.edit.active"), " ");
  }
}
function AddRecipeComponent_Conditional_8_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275text(0);
    \u0275\u0275pipe(1, "translate");
  }
  if (rf & 2) {
    \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind1(1, 1, "recipe.form.save-btn.edit.disabled"), " ");
  }
}
function AddRecipeComponent_Conditional_8_Template(rf, ctx) {
  if (rf & 1) {
    const _r4 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "lg-button", 12);
    \u0275\u0275listener("click", function AddRecipeComponent_Conditional_8_Template_lg_button_click_0_listener() {
      \u0275\u0275restoreView(_r4);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.onEditRecipe());
    });
    \u0275\u0275conditionalCreate(1, AddRecipeComponent_Conditional_8_Conditional_1_Template, 2, 3)(2, AddRecipeComponent_Conditional_8_Conditional_2_Template, 2, 3);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    let tmp_1_0;
    let tmp_2_0;
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275property("disabled", !((tmp_1_0 = ctx_r0.formComponent()) == null ? null : tmp_1_0.form == null ? null : tmp_1_0.form.dirty) && !ctx_r0.draftRef());
    \u0275\u0275advance();
    \u0275\u0275conditional(((tmp_2_0 = ctx_r0.formComponent()) == null ? null : tmp_2_0.form == null ? null : tmp_2_0.form.dirty) || ctx_r0.draftRef() ? 1 : 2);
  }
}
function AddRecipeComponent_Conditional_9_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275text(0);
    \u0275\u0275pipe(1, "translate");
  }
  if (rf & 2) {
    \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind1(1, 1, "recipe.form.save-btn.add.active"), " ");
  }
}
function AddRecipeComponent_Conditional_9_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275text(0);
    \u0275\u0275pipe(1, "translate");
  }
  if (rf & 2) {
    \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind1(1, 1, "recipe.form.save-btn.add.disabled"), " ");
  }
}
function AddRecipeComponent_Conditional_9_Template(rf, ctx) {
  if (rf & 1) {
    const _r5 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "lg-button", 12);
    \u0275\u0275listener("click", function AddRecipeComponent_Conditional_9_Template_lg_button_click_0_listener() {
      \u0275\u0275restoreView(_r5);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.onAddRecipe());
    });
    \u0275\u0275conditionalCreate(1, AddRecipeComponent_Conditional_9_Conditional_1_Template, 2, 3)(2, AddRecipeComponent_Conditional_9_Conditional_2_Template, 2, 3);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    let tmp_1_0;
    let tmp_2_0;
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275property("disabled", !((tmp_1_0 = ctx_r0.formComponent()) == null ? null : tmp_1_0.form == null ? null : tmp_1_0.form.dirty) && !ctx_r0.draftRef());
    \u0275\u0275advance();
    \u0275\u0275conditional(((tmp_2_0 = ctx_r0.formComponent()) == null ? null : tmp_2_0.form == null ? null : tmp_2_0.form.dirty) || ctx_r0.draftRef() ? 1 : 2);
  }
}
var AddRecipeComponent = class _AddRecipeComponent {
  _aRoute;
  _recipesRepository;
  _notificationsService;
  constructor(_aRoute, _recipesRepository, _notificationsService) {
    this._aRoute = _aRoute;
    this._recipesRepository = _recipesRepository;
    this._notificationsService = _notificationsService;
  }
  draftOrRecipeUUID = signal(void 0);
  recipe = signal(void 0);
  formComponent = viewChild(AddRecipeFormComponent);
  draftRef = signal(void 0);
  draftByExistingRecipe = computed(() => {
    return this.draftRef().meta?.["uuid"];
  });
  isDraftRoute = signal(false);
  draftRecipeModel;
  addedRecipeInformerUUID = signal(null);
  _routerManager = inject(ROUTER_MANAGER);
  ngOnInit() {
    combineLatest([
      this._aRoute.params,
      this._aRoute.data
    ]).subscribe(([params, data]) => {
      const draft = data["draft"];
      this.draftOrRecipeUUID.set(params["uuid"]);
      if (draft) {
        this.draftRef.set(draft);
        this.recipe.set(draft.data);
      } else if (data["recipe"]) {
        this.recipe.set(data["recipe"]);
      } else if (this.draftOrRecipeUUID()) {
        this._loadRecipe(this.draftOrRecipeUUID());
      } else {
        this.recipe.set(Recipe.empty());
      }
      this.isDraftRoute.set(!!data["draftRoute"]);
    });
  }
  ngAfterViewInit() {
    this.formComponent()?.form.valueChanges.pipe(debounceTime(500)).subscribe((value) => {
      if (!this.formComponent().form.dirty) {
        return;
      }
      if (this.draftRef()?.uuid) {
        this._recipesRepository.updateDraftRecipe(this.draftRef().uuid, this.recipe(), this.draftRef().meta?.["uuid"]);
      } else if (this.recipe()) {
        this.draftRef.set(this._recipesRepository.saveDraftRecipe(this.recipe(), this.draftOrRecipeUUID() ?? ""));
        if (!this.isDraftRoute()) {
          this._routerManager.replace(["recipes/draft/" + this.draftRef().uuid]);
        }
      }
    });
  }
  async onAddRecipe() {
    try {
      if (!this.formComponent()?.validateForm() || !this.recipe()) {
        return;
      }
      const newUUID = await this._addRecipe(this.recipe());
      this.addedRecipeInformerUUID.set(newUUID);
    } catch (e) {
      this._notificationsService.error(errorHandler(e));
    }
  }
  async onEditRecipe() {
    if (!this.formComponent()?.validateForm() || !this.recipe()) {
      return;
    }
    await this._editRecipe(this.recipe());
  }
  onRemoveDraft() {
    this._removeDraft();
    this._routerManager.navigate(["recipes"]);
  }
  onDeleteRecipe() {
    if (!this.recipe()?.uuid) {
      return;
    }
    this._recipesRepository.deleteOne(this.recipe().uuid).then(() => {
      this._notificationsService.success("Recipe deleted");
      this._routerManager.navigate(["recipes"]);
    });
  }
  _addRecipe(recipe) {
    return this._recipesRepository.addRecipe(recipe).then((newUUID) => {
      this.formComponent()?.resetForm();
      this._notificationsService.success("Recipe added");
      this.recipe.set(void 0);
      if (this.draftRef()) {
        this._removeDraft();
      }
      this._routerManager.navigateWithReset(["recipes", "edit", newUUID]);
      return newUUID;
    });
  }
  _editRecipe(recipe) {
    if (!this.draftOrRecipeUUID()) {
      return Promise.resolve();
    }
    let recipeUUID = this.draftRef()?.meta?.["uuid"] ?? this.draftOrRecipeUUID();
    return this._recipesRepository.editRecipe(recipeUUID, recipe).then(() => {
      this.formComponent()?.resetForm(recipe);
      this._notificationsService.success("Recipe edited");
      if (this.draftRef()) {
        this._removeDraft();
      }
      this._routerManager.navigateWithReset(["recipes", "edit", recipeUUID]);
    });
  }
  _removeDraft() {
    if (!this.draftRef()) {
      return;
    }
    this._recipesRepository.removeDraftRecipe(this.draftRef().uuid);
    this.draftRef.set(void 0);
  }
  _loadRecipe(uuid) {
    if (!uuid) {
      return;
    }
    this._recipesRepository.getOne(uuid).then((recipe) => {
      if (!recipe) {
        return;
      }
      this.recipe.set(recipe);
    });
  }
  static \u0275fac = function AddRecipeComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _AddRecipeComponent)(\u0275\u0275directiveInject(ActivatedRoute), \u0275\u0275directiveInject(RecipesRepository), \u0275\u0275directiveInject(NotificationsService));
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _AddRecipeComponent, selectors: [["app-add-recipe"]], viewQuery: function AddRecipeComponent_Query(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275viewQuerySignal(ctx.formComponent, AddRecipeFormComponent, 5);
    }
    if (rf & 2) {
      \u0275\u0275queryAdvance();
    }
  }, decls: 10, vars: 6, consts: [["size", "medium"], [3, "recipe"], [3, "mobileMode", "relaxed"], ["lgShrink", "", 3, "disabled"], [3, "routerLink"], [3, "mobileMode", "center"], [1, "text-active"], ["lgInlineSeparatedGroup", ""], [1, "text-muted", "text-cursive"], [3, "flat", "link", "size"], ["lgShrink", "", 3, "style", "flat"], ["lgShrink", "", 3, "click", "flat"], ["lgShrink", "", 3, "click", "disabled"]], template: function AddRecipeComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "lg-fade-in")(1, "lg-container")(2, "lg-gap-column", 0);
      \u0275\u0275conditionalCreate(3, AddRecipeComponent_Conditional_3_Template, 4, 2, "p");
      \u0275\u0275conditionalCreate(4, AddRecipeComponent_Conditional_4_Template, 9, 5)(5, AddRecipeComponent_Conditional_5_Template, 3, 3, "lg-title");
      \u0275\u0275elementEnd();
      \u0275\u0275element(6, "lg-add-recipe-form", 1);
      \u0275\u0275elementStart(7, "lg-gap-row", 2);
      \u0275\u0275conditionalCreate(8, AddRecipeComponent_Conditional_8_Template, 3, 2, "lg-button", 3)(9, AddRecipeComponent_Conditional_9_Template, 3, 2, "lg-button", 3);
      \u0275\u0275elementEnd()()();
    }
    if (rf & 2) {
      let tmp_0_0;
      let tmp_1_0;
      let tmp_5_0;
      \u0275\u0275advance(3);
      \u0275\u0275conditional((tmp_0_0 = ctx.addedRecipeInformerUUID()) ? 3 : -1, tmp_0_0);
      \u0275\u0275advance();
      \u0275\u0275conditional(((tmp_1_0 = ctx.recipe()) == null ? null : tmp_1_0.uuid) && !ctx.draftRef() || ctx.draftRef() && ctx.draftByExistingRecipe() ? 4 : 5);
      \u0275\u0275advance(2);
      \u0275\u0275property("recipe", ctx.recipe());
      \u0275\u0275advance();
      \u0275\u0275property("mobileMode", true)("relaxed", true);
      \u0275\u0275advance();
      \u0275\u0275conditional(((tmp_5_0 = ctx.recipe()) == null ? null : tmp_5_0.uuid) && !ctx.draftRef() || ctx.draftRef() && ctx.draftByExistingRecipe() ? 8 : 9);
    }
  }, dependencies: [
    ContainerComponent,
    TitleComponent,
    AddRecipeFormComponent,
    ButtonComponent,
    GapRowComponent,
    FadeInComponent,
    ShrinkDirective,
    TimeAgoPipe,
    GapColumnComponent,
    TranslatePipe,
    RouterLink,
    InlineSeparatedGroupComponent,
    InlineSeparatedGroupDirective
  ], encapsulation: 2 });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(AddRecipeComponent, [{
    type: Component,
    args: [{ selector: "app-add-recipe", standalone: true, imports: [
      ContainerComponent,
      TitleComponent,
      AddRecipeFormComponent,
      ButtonComponent,
      GapRowComponent,
      FadeInComponent,
      ShrinkDirective,
      TimeAgoPipe,
      GapColumnComponent,
      TranslatePipe,
      RouterLink,
      InlineSeparatedGroupComponent,
      InlineSeparatedGroupDirective
    ], template: `

      <lg-fade-in>
          <lg-container>
              <lg-gap-column size="medium">
                  @if (addedRecipeInformerUUID();as uuid) {
                      <p>You just added new recipe. <a routerLink="/recipes/edit/{{ uuid }}">Want to have a look?</a>
                      </p>
                  }
                  @if ((recipe()?.uuid && !draftRef()) || (draftRef() && draftByExistingRecipe())) {
                      <lg-gap-row [mobileMode]="true" [center]="true">
                          <lg-title>
                              <span class="text-active">{{ recipe()?.name }}</span>
                          </lg-title>
                      </lg-gap-row>

                      <lg-inline-separated-group>
                          <ng-template lgInlineSeparatedGroup>
                              <lg-button [flat]="true"
                                         [link]="'/recipes/calculate/' + recipe()?.uuid"
                                         [size]="'small'"
                                         [style]="'primary'">
                                  {{ 'recipe.calculate-btn'|translate }}
                              </lg-button>
                          </ng-template>

                          @if (draftRef() && formComponent()?.form?.dirty) {
                              <ng-template lgInlineSeparatedGroup>
                                  <lg-fade-in>
                                      {{ 'saved-draft-label'|translate }}
                                  </lg-fade-in>
                              </ng-template>
                          }

                          <ng-template lgInlineSeparatedGroup>
                              @if (isDraftRoute()) {
                                  <lg-button lgShrink [style]="'danger'"
                                             [flat]="true"
                                             (click)="onRemoveDraft()">
                                      {{ 'recipe.form.delete-draft-btn'|translate }}
                                  </lg-button>
                              } @else if (recipe()?.uuid) {
                                  <lg-button lgShrink [style]="'danger'"
                                             [flat]="true"
                                             (click)="onDeleteRecipe()">
                                      {{ 'recipe.form.delete-btn'|translate }}
                                  </lg-button>
                              }
                          </ng-template>
                      </lg-inline-separated-group>

                      @if (recipe()?.updatedAt) {
                          <small class="text-muted text-cursive">
                              {{ 'edited-at-label'|translate }} {{ recipe()?.updatedAt | timeAgo }}
                          </small>
                      }
                  } @else {
                      <lg-title>
                          {{ 'recipe.form.title'|translate }}
                      </lg-title>
                  }
              </lg-gap-column>

              <lg-add-recipe-form [recipe]="recipe()"></lg-add-recipe-form>

              <lg-gap-row [mobileMode]="true" [relaxed]="true">
                  @if ((recipe()?.uuid && !draftRef()) || (draftRef() && draftByExistingRecipe())) {
                      <lg-button [disabled]="!formComponent()?.form?.dirty && !draftRef()"
                                 lgShrink
                                 (click)="onEditRecipe()">
                          @if (formComponent()?.form?.dirty || draftRef()) {
                              {{ 'recipe.form.save-btn.edit.active'|translate }}
                          } @else {
                              {{ 'recipe.form.save-btn.edit.disabled'|translate }}
                          }
                      </lg-button>
                  } @else {
                      <lg-button [disabled]="!formComponent()?.form?.dirty && !draftRef()"
                                 lgShrink
                                 (click)="onAddRecipe()">
                          @if (formComponent()?.form?.dirty || draftRef()) {
                              {{ 'recipe.form.save-btn.add.active'|translate }}
                          } @else {
                              {{ 'recipe.form.save-btn.add.disabled'|translate }}
                          }
                      </lg-button>
                  }


              </lg-gap-row>
          </lg-container>
      </lg-fade-in>
  ` }]
  }], () => [{ type: ActivatedRoute }, { type: RecipesRepository }, { type: NotificationsService }], null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(AddRecipeComponent, { className: "AddRecipeComponent", filePath: "src/app/features/recipes/view/add-recipe/add-recipe.component.ts", lineNumber: 138 });
})();
export {
  AddRecipeComponent
};
//# sourceMappingURL=chunk-Z5RFFNHJ.js.map
