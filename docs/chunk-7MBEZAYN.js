import {
  NgLabelTemplateDirective,
  NgOptionTemplateDirective,
  NgSelectComponent,
  NgTagTemplateDirective
} from "./chunk-OS24NFVI.js";
import {
  SelectResourcesService
} from "./chunk-TANJAAUF.js";
import {
  FormsModule,
  NG_VALUE_ACCESSOR,
  NgControlStatus,
  NgModel
} from "./chunk-FGMQFOLX.js";
import {
  TranslatePipe
} from "./chunk-BW4AJP7C.js";
import {
  Component,
  HostBinding,
  Input,
  Optional,
  Subject,
  ViewEncapsulation,
  debounceTime,
  forwardRef,
  input,
  of,
  output,
  setClassMetadata,
  signal,
  switchMap,
  viewChild,
  ɵsetClassDebugInfo,
  ɵɵProvidersFeature,
  ɵɵadvance,
  ɵɵattribute,
  ɵɵclassProp,
  ɵɵdefineComponent,
  ɵɵdirectiveInject,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵgetCurrentView,
  ɵɵlistener,
  ɵɵnextContext,
  ɵɵpipe,
  ɵɵpipeBind1,
  ɵɵproperty,
  ɵɵqueryAdvance,
  ɵɵrepeater,
  ɵɵrepeaterCreate,
  ɵɵresetView,
  ɵɵrestoreView,
  ɵɵstyleProp,
  ɵɵtemplate,
  ɵɵtext,
  ɵɵtextInterpolate1,
  ɵɵviewQuerySignal
} from "./chunk-UQVCVPTQ.js";

// src/app/features/controls/form/chips-list.component.ts
var _forTrack0 = ($index, $item) => $item.label;
function ChipsListComponent_For_2_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "span", 2);
    \u0275\u0275listener("click", function ChipsListComponent_For_2_Template_span_click_0_listener() {
      const item_r2 = \u0275\u0275restoreView(_r1).$implicit;
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.onSelect(item_r2));
    });
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const item_r2 = ctx.$implicit;
    const \u0275$index_3_r4 = ctx.$index;
    const \u0275$count_3_r5 = ctx.$count;
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275styleProp("--chip-color", item_r2.color);
    \u0275\u0275classProp("selected", item_r2.value === ctx_r2.value);
    \u0275\u0275attribute("data-last", \u0275$index_3_r4 === \u0275$count_3_r5 - 1 ? true : null);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", item_r2.label, " ");
  }
}
var ChipsListComponent = class _ChipsListComponent {
  constructor() {
  }
  chipColor = "var(--chip-default-bg)";
  control = input();
  items = [];
  onChangeFn;
  value;
  selectedItem;
  onSelect = (item) => {
    this.applyValue(item.value);
  };
  registerOnChange(fn) {
    this.onChangeFn = fn;
  }
  registerOnTouched(fn) {
  }
  writeValue(obj) {
    this.applyValue(obj);
  }
  applyValue(value) {
    this.value = value;
    this.onChangeFn?.(value);
    this.control()?.writeValue(value);
  }
  ngOnInit() {
  }
  clearSelected() {
    this.value = null;
  }
  static \u0275fac = function ChipsListComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _ChipsListComponent)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _ChipsListComponent, selectors: [["lg-chips-list"]], hostVars: 2, hostBindings: function ChipsListComponent_HostBindings(rf, ctx) {
    if (rf & 2) {
      \u0275\u0275styleProp("--chip-color", ctx.chipColor);
    }
  }, inputs: { control: [1, "control"], items: "items" }, features: [\u0275\u0275ProvidersFeature([
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => _ChipsListComponent),
      multi: true
    }
  ])], decls: 3, vars: 0, consts: [[1, "chips-list"], [1, "chip", 3, "--chip-color", "selected"], [1, "chip", 3, "click"]], template: function ChipsListComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "div", 0);
      \u0275\u0275repeaterCreate(1, ChipsListComponent_For_2_Template, 2, 6, "span", 1, _forTrack0);
      \u0275\u0275elementEnd();
    }
    if (rf & 2) {
      \u0275\u0275advance();
      \u0275\u0275repeater(ctx.items);
    }
  }, styles: ["\n\n.chips-list[_ngcontent-%COMP%] {\n  display: flex;\n  flex-wrap: wrap;\n  gap: 8px;\n}\n.chip[_ngcontent-%COMP%] {\n  background-color: var(--chip-color);\n  color: #fff;\n  padding: 4px 8px;\n  border-radius: 16px;\n  font-size: 0.875rem;\n  display: inline-block;\n  cursor: pointer;\n  transition: all 0.2s;\n  transition-timing-function: cubic-bezier(0.47, 1.64, 0.41, 0.8);\n}\n.chip.selected[_ngcontent-%COMP%] {\n  opacity: 0.5;\n}\n.chip[_ngcontent-%COMP%]:hover {\n  transform: scale(1.1);\n}\n/*# sourceMappingURL=chips-list.component.css.map */"] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(ChipsListComponent, [{
    type: Component,
    args: [{ selector: "lg-chips-list", standalone: true, template: `
      <div class="chips-list">
          @for (item of items;track item.label;let last = $last) {
              <span class="chip"
                    [style.--chip-color]="item.color"
                    (click)="onSelect(item)"
                    [class.selected]="item.value === value"
                    [attr.data-last]="last ? true : null">
                  {{ item.label }}
              </span>
          }
      </div>
  `, providers: [
      {
        provide: NG_VALUE_ACCESSOR,
        useExisting: forwardRef(() => ChipsListComponent),
        multi: true
      }
    ], imports: [], styles: ["/* angular:styles/component:scss;7777a42021a68d218ff8fb9b2102972de2059f6854fb59cb8a43fbea6e671dc0;/Users/khripunovpavel/Documents/my/lasagna/lasagna/src/app/features/controls/form/chips-list.component.ts */\n.chips-list {\n  display: flex;\n  flex-wrap: wrap;\n  gap: 8px;\n}\n.chip {\n  background-color: var(--chip-color);\n  color: #fff;\n  padding: 4px 8px;\n  border-radius: 16px;\n  font-size: 0.875rem;\n  display: inline-block;\n  cursor: pointer;\n  transition: all 0.2s;\n  transition-timing-function: cubic-bezier(0.47, 1.64, 0.41, 0.8);\n}\n.chip.selected {\n  opacity: 0.5;\n}\n.chip:hover {\n  transform: scale(1.1);\n}\n/*# sourceMappingURL=chips-list.component.css.map */\n"] }]
  }], () => [], { chipColor: [{
    type: HostBinding,
    args: ["style.--chip-color"]
  }], items: [{
    type: Input
  }] });
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(ChipsListComponent, { className: "ChipsListComponent", filePath: "src/app/features/controls/form/chips-list.component.ts", lineNumber: 60 });
})();

// src/app/features/controls/form/autocomplete.component.ts
function AutocompleteComponent_ng_template_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275text(0);
  }
  if (rf & 2) {
    const item_r1 = ctx.item;
    \u0275\u0275textInterpolate1(" ", (item_r1 == null ? null : item_r1.name) ?? (item_r1 == null ? null : item_r1.value) ?? item_r1, " ");
  }
}
function AutocompleteComponent_ng_template_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275text(0);
  }
  if (rf & 2) {
    const item_r2 = ctx.item;
    \u0275\u0275textInterpolate1(" ", (item_r2 == null ? null : item_r2.name) ?? (item_r2 == null ? null : item_r2.value) ?? item_r2, " ");
  }
}
function AutocompleteComponent_ng_template_5_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275text(0);
  }
  if (rf & 2) {
    const searchTerm_r3 = ctx.searchTerm;
    \u0275\u0275textInterpolate1(" ", searchTerm_r3, " ");
  }
}
var AutocompleteComponent = class _AutocompleteComponent {
  _selectResourcesService;
  constructor(_selectResourcesService) {
    this._selectResourcesService = _selectResourcesService;
  }
  placeholder = "";
  noLoad = input(false);
  resource = input("");
  key = input("");
  appendTo = input("");
  strict = input(false);
  multi = input(false);
  loadedList = signal([]);
  onSelected = output();
  selectComponent = viewChild(NgSelectComponent);
  value = null;
  initialList = signal([]);
  _onSearch$ = new Subject();
  _currentSearchTerm = null;
  onChange = () => {
  };
  onTouched = () => {
  };
  searchFn = (term, item) => {
    const val = item;
    if (typeof val === "string") {
      return val.toLowerCase().includes(term?.toLowerCase() ?? "");
    }
    return val.name?.toLowerCase().includes(term?.toLowerCase() ?? "");
  };
  compareWith = (a, b) => {
    const valA = a;
    const valB = b;
    if (!a || !b) {
      return false;
    }
    if (typeof valA !== "string" && typeof valB !== "string") {
      return valA?.name === valB?.name || valA?.uuid === valB?.uuid;
    }
    if (typeof valA === "string" && typeof valB !== "string") {
      return valA === valB?.name || valA === valB?.uuid;
    }
    if (typeof valA !== "string" && typeof valB === "string") {
      return valA?.name === valB || valA?.uuid === valB;
    }
    return false;
  };
  writeValue(value) {
    this.change(value);
    this.selectComponent().searchTerm = "";
  }
  change(value) {
    this.value = value;
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
    const val = typeof value === "string" ? value : value?.[this.key()];
    this.change(val);
    this.onSelected.emit(val);
  }
  onSearch(event) {
    if (!event.term) {
      this.writeValue("");
      return;
    }
    this._currentSearchTerm = event.term;
    if (!this.noLoad()) {
      this._onSearch$.next(event);
    }
    if (event.items.length === 0) {
      this.loadedList.set([{ name: event.term, value: event.term }]);
    } else {
      this.loadedList.set(event.items);
    }
    this.selectComponent().searchTerm = this._capitalizeFirstLetter(event.term);
  }
  onBlur() {
    const select = this.selectComponent();
    if (select?.searchTerm) {
      const searchValue = select.searchTerm.trim();
      if (searchValue) {
        const tag = { name: searchValue, value: searchValue };
        this.loadedList.set([tag]);
        this.change(searchValue);
        this.onSelected.emit(searchValue);
      }
    }
  }
  ngOnInit() {
    this._selectResourcesService.register(this.resource());
    this._onSearch$.asObservable().pipe(debounceTime(300)).subscribe((event) => {
      this._selectResourcesService.autocomplete(this.resource(), this.key(), event.term);
    });
    this._selectResourcesService.registryStream.pipe(switchMap((registry) => {
      const res = registry.get(this.resource());
      return res?.stream ?? of([]);
    })).subscribe((items) => {
      this.loadedList.set(items);
      if (this.initialList().length)
        return;
      this.initialList.set(items);
    });
  }
  reload() {
  }
  focus() {
    const select = this.selectComponent();
    if (select) {
      select.focus();
    }
  }
  _capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
  static \u0275fac = function AutocompleteComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _AutocompleteComponent)(\u0275\u0275directiveInject(SelectResourcesService, 8));
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _AutocompleteComponent, selectors: [["lg-autocomplete"]], viewQuery: function AutocompleteComponent_Query(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275viewQuerySignal(ctx.selectComponent, NgSelectComponent, 5);
    }
    if (rf & 2) {
      \u0275\u0275queryAdvance();
    }
  }, inputs: { placeholder: "placeholder", noLoad: [1, "noLoad"], resource: [1, "resource"], key: [1, "key"], appendTo: [1, "appendTo"], strict: [1, "strict"], multi: [1, "multi"] }, outputs: { onSelected: "onSelected" }, features: [\u0275\u0275ProvidersFeature([
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => _AutocompleteComponent),
      multi: true
    }
  ])], decls: 6, vars: 13, consts: [[1, "autocomplete"], ["bindLabel", "name", 3, "blur", "change", "search", "addTag", "bindValue", "appendTo", "compareWith", "editableSearchTerm", "items", "multiple", "ngModel", "placeholder", "searchFn", "notFoundText"], ["ng-label-tmp", ""], ["ng-option-tmp", ""], ["ng-tag-tmp", ""]], template: function AutocompleteComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "div", 0)(1, "ng-select", 1);
      \u0275\u0275pipe(2, "translate");
      \u0275\u0275listener("blur", function AutocompleteComponent_Template_ng_select_blur_1_listener() {
        return ctx.onBlur();
      })("change", function AutocompleteComponent_Template_ng_select_change_1_listener($event) {
        return ctx.onChangeSelect($event);
      })("search", function AutocompleteComponent_Template_ng_select_search_1_listener($event) {
        return ctx.onSearch($event);
      });
      \u0275\u0275template(3, AutocompleteComponent_ng_template_3_Template, 1, 1, "ng-template", 2)(4, AutocompleteComponent_ng_template_4_Template, 1, 1, "ng-template", 3)(5, AutocompleteComponent_ng_template_5_Template, 1, 1, "ng-template", 4);
      \u0275\u0275elementEnd()();
    }
    if (rf & 2) {
      \u0275\u0275advance();
      \u0275\u0275property("addTag", true)("bindValue", ctx.key())("appendTo", ctx.appendTo())("compareWith", ctx.compareWith)("editableSearchTerm", true)("items", ctx.loadedList())("multiple", ctx.multi())("ngModel", ctx.value)("placeholder", ctx.placeholder)("searchFn", ctx.searchFn)("notFoundText", \u0275\u0275pipeBind1(2, 11, "search.not-found"));
    }
  }, dependencies: [
    NgSelectComponent,
    FormsModule,
    NgControlStatus,
    NgModel,
    NgOptionTemplateDirective,
    NgLabelTemplateDirective,
    NgTagTemplateDirective,
    TranslatePipe
  ], styles: ["/* angular:styles/component:scss;8db79f2d60abff424e3e33b16f211108e837096ab2ea4478366ed98bbe3daf19;/Users/khripunovpavel/Documents/my/lasagna/lasagna/src/app/features/controls/form/autocomplete.component.ts */\nlg-autocomplete {\n  display: flex;\n  flex: 1;\n  min-width: 150px;\n}\n.autocomplete {\n  flex: 1;\n  width: 100%;\n}\n.autocomplete .ng-select.ng-select-single .ng-select-container {\n  height: 51px;\n}\n.autocomplete .ng-select.ng-select-focused .ng-select-container {\n  outline: none;\n  box-shadow: var(--focus-shadow);\n  border-radius: 12px;\n}\n.autocomplete .ng-select .ng-select-container {\n  border: none;\n  border-radius: 12px;\n  background-color: var(--control-bg);\n}\n.autocomplete .ng-select .ng-select-container .ng-input {\n  top: 16px !important;\n  padding-right: 10px !important;\n}\n.autocomplete .ng-select .ng-select-container .ng-input > input {\n  color: var(--text);\n  font-family: inherit;\n  font-size: inherit;\n}\n.autocomplete .ng-dropdown-panel {\n  border: none;\n  box-shadow: 0 4px 16px 0 rgba(0, 0, 0, 0.1);\n  border-radius: 12px;\n  overflow: hidden;\n}\n.autocomplete .ng-dropdown-panel .ng-option {\n  padding: 16px;\n  border-radius: 12px;\n}\n.autocomplete .ng-arrow-wrapper {\n  display: none;\n}\n.autocomplete .ng-clear-wrapper {\n  display: none;\n}\n/*# sourceMappingURL=autocomplete.component.css.map */\n"], encapsulation: 2 });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(AutocompleteComponent, [{
    type: Component,
    args: [{ selector: "lg-autocomplete", standalone: true, template: `
    <div class="autocomplete">
      <ng-select (blur)="onBlur()"
                 (change)="onChangeSelect($event)"
                 (search)="onSearch($event)"
                 [addTag]="true"
                 [bindValue]="key()"
                 [appendTo]="appendTo()"
                 [compareWith]="compareWith"
                 [editableSearchTerm]="true"
                 [items]="loadedList()"
                 [multiple]="multi()"
                 [ngModel]="value"
                 [placeholder]="placeholder"
                 [searchFn]="searchFn"
                 bindLabel="name"
                 [notFoundText]="'search.not-found' | translate">
        <ng-template let-item="item" ng-label-tmp>
          {{ item?.name ?? item?.value ?? item }}
        </ng-template>
        <ng-template let-item="item" ng-option-tmp>
          {{ item?.name ?? item?.value ?? item }}
        </ng-template>
        <ng-template let-searchTerm="searchTerm" ng-tag-tmp>
          {{ searchTerm }}
        </ng-template>
      </ng-select>
    </div>
  `, imports: [
      NgSelectComponent,
      FormsModule,
      NgOptionTemplateDirective,
      NgLabelTemplateDirective,
      NgTagTemplateDirective,
      TranslatePipe
    ], providers: [
      {
        provide: NG_VALUE_ACCESSOR,
        useExisting: forwardRef(() => AutocompleteComponent),
        multi: true
      }
    ], encapsulation: ViewEncapsulation.None, styles: ["/* angular:styles/component:scss;8db79f2d60abff424e3e33b16f211108e837096ab2ea4478366ed98bbe3daf19;/Users/khripunovpavel/Documents/my/lasagna/lasagna/src/app/features/controls/form/autocomplete.component.ts */\nlg-autocomplete {\n  display: flex;\n  flex: 1;\n  min-width: 150px;\n}\n.autocomplete {\n  flex: 1;\n  width: 100%;\n}\n.autocomplete .ng-select.ng-select-single .ng-select-container {\n  height: 51px;\n}\n.autocomplete .ng-select.ng-select-focused .ng-select-container {\n  outline: none;\n  box-shadow: var(--focus-shadow);\n  border-radius: 12px;\n}\n.autocomplete .ng-select .ng-select-container {\n  border: none;\n  border-radius: 12px;\n  background-color: var(--control-bg);\n}\n.autocomplete .ng-select .ng-select-container .ng-input {\n  top: 16px !important;\n  padding-right: 10px !important;\n}\n.autocomplete .ng-select .ng-select-container .ng-input > input {\n  color: var(--text);\n  font-family: inherit;\n  font-size: inherit;\n}\n.autocomplete .ng-dropdown-panel {\n  border: none;\n  box-shadow: 0 4px 16px 0 rgba(0, 0, 0, 0.1);\n  border-radius: 12px;\n  overflow: hidden;\n}\n.autocomplete .ng-dropdown-panel .ng-option {\n  padding: 16px;\n  border-radius: 12px;\n}\n.autocomplete .ng-arrow-wrapper {\n  display: none;\n}\n.autocomplete .ng-clear-wrapper {\n  display: none;\n}\n/*# sourceMappingURL=autocomplete.component.css.map */\n"] }]
  }], () => [{ type: SelectResourcesService, decorators: [{
    type: Optional
  }] }], { placeholder: [{
    type: Input
  }] });
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(AutocompleteComponent, { className: "AutocompleteComponent", filePath: "src/app/features/controls/form/autocomplete.component.ts", lineNumber: 141 });
})();

export {
  ChipsListComponent,
  AutocompleteComponent
};
//# sourceMappingURL=chunk-7MBEZAYN.js.map
