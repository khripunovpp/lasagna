import {
  WidthDirective
} from "./chunk-X7MIVF3B.js";
import {
  CheckboxComponent
} from "./chunk-47THLFJI.js";
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
  InputComponent
} from "./chunk-MGKNDLQM.js";
import {
  MatIcon
} from "./chunk-JVNP6C27.js";
import {
  GapColumnComponent
} from "./chunk-5CDCXM6R.js";
import {
  GapRowComponent
} from "./chunk-RWMLY22Y.js";
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
  NgControlStatus,
  NgControlStatusGroup,
  NotificationsService,
  ReactiveFormsModule,
  errorHandler,
  takeUntilDestroyed,
  taxDTOFromFormValue
} from "./chunk-EH6A44OR.js";
import {
  DexieIndexDbService,
  Stores
} from "./chunk-UGLIF2MQ.js";
import {
  Component,
  Directive,
  HostBinding,
  Injectable,
  computed,
  effect,
  setClassMetadata,
  signal,
  ɵsetClassDebugInfo,
  ɵɵadvance,
  ɵɵclassProp,
  ɵɵconditional,
  ɵɵconditionalCreate,
  ɵɵdefineComponent,
  ɵɵdefineDirective,
  ɵɵdefineInjectable,
  ɵɵdirectiveInject,
  ɵɵelement,
  ɵɵelementContainerEnd,
  ɵɵelementContainerStart,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵgetCurrentView,
  ɵɵinject,
  ɵɵlistener,
  ɵɵnextContext,
  ɵɵproperty,
  ɵɵrepeater,
  ɵɵrepeaterCreate,
  ɵɵresetView,
  ɵɵrestoreView,
  ɵɵstyleMap,
  ɵɵstyleProp,
  ɵɵtext
} from "./chunk-6AETQSBA.js";

// src/app/shared/view/directives/self-center.directive.ts
var SelfCenterDirective = class _SelfCenterDirective {
  constructor() {
  }
  selfAlign = "center";
  static \u0275fac = function SelfCenterDirective_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _SelfCenterDirective)();
  };
  static \u0275dir = /* @__PURE__ */ \u0275\u0275defineDirective({ type: _SelfCenterDirective, selectors: [["", "lgSelfCenter", ""]], hostVars: 2, hostBindings: function SelfCenterDirective_HostBindings(rf, ctx) {
    if (rf & 2) {
      \u0275\u0275styleProp("align-self", ctx.selfAlign);
    }
  } });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(SelfCenterDirective, [{
    type: Directive,
    args: [{
      standalone: true,
      selector: "[lgSelfCenter]"
    }]
  }], () => [], { selfAlign: [{
    type: HostBinding,
    args: ["style.align-self"]
  }] });
})();

// src/app/features/settings/service/models/Tax.ts
var Tax = class _Tax {
  constructor(props) {
    this.name = String(props.name).trim();
    this.amount = parseFloat(String(props.amount));
    this.percentage = props.percentage;
    this.description = String(props.description || "").trim();
    this.items = props.items;
    this.uuid = props.uuid;
  }
  name;
  amount;
  percentage;
  description;
  items;
  uuid;
  static fromRaw(dto) {
    return new _Tax({
      name: dto?.name || "",
      amount: dto?.amount || 0,
      percentage: dto?.percentage || false,
      description: dto?.description || "",
      items: dto?.items || [],
      uuid: dto?.uuid || ""
    });
  }
  static empty() {
    return new _Tax({
      name: "",
      amount: 0,
      percentage: true,
      description: "",
      items: [],
      uuid: ""
    });
  }
  update(dto) {
    this.name = dto.name || this.name;
    this.amount = dto.amount || this.amount;
    this.percentage = dto.percentage || this.percentage;
    this.description = dto.description || this.description;
    this.items = dto.items || this.items;
    this.uuid = dto.uuid || this.uuid;
    return this;
  }
  toDTO() {
    return {
      name: this.name || "",
      amount: this.amount || 0,
      percentage: this.percentage || false,
      description: this.description || "",
      items: this.items || [],
      uuid: this.uuid || ""
    };
  }
};

// src/app/features/settings/service/repositories/taxes.repository.ts
var TaxesRepository = class _TaxesRepository {
  _indexDbService;
  constructor(_indexDbService) {
    this._indexDbService = _indexDbService;
  }
  addOne(tax) {
    return this._indexDbService.addData(Stores.TAXES, tax.toDTO());
  }
  updateOne(uuid, tax) {
    return this._indexDbService.replaceData(Stores.TAXES, uuid, tax.toDTO());
  }
  async getOne(uuid) {
    return new Promise(async (resolve, reject) => {
      uuid = typeof uuid === "string" ? uuid : uuid.uuid;
      if (!uuid) {
        resolve(void 0);
        return;
      }
      await this._indexDbService.getOne(Stores.TAXES, uuid).then((result) => {
        resolve(Tax.fromRaw(result));
      });
    });
  }
  getAll() {
    return this._indexDbService.getAll(Stores.TAXES).then((taxes) => taxes.map((tax) => Tax.fromRaw(tax)));
  }
  addMany(taxes) {
    return this._indexDbService.balkAdd(Stores.TAXES, taxes.map((tax) => tax.toDTO()), false);
  }
  deleteOne(uuid) {
    return this._indexDbService.remove(Stores.TAXES, uuid);
  }
  static \u0275fac = function TaxesRepository_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _TaxesRepository)(\u0275\u0275inject(DexieIndexDbService));
  };
  static \u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _TaxesRepository, factory: _TaxesRepository.\u0275fac, providedIn: "root" });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(TaxesRepository, [{
    type: Injectable,
    args: [{
      providedIn: "root"
    }]
  }], () => [{ type: DexieIndexDbService }], null);
})();

// src/app/features/settings/view/finance-settings/taxes/taxes-settings.component.ts
var _forTrack0 = ($index, $item) => $item.name + $item.uuid;
function TaxesSettingsComponent_For_4_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "section", 2)(1, "div", 5)(2, "lg-gap-row", 6);
    \u0275\u0275element(3, "lg-input", 7)(4, "lg-textarea", 8);
    \u0275\u0275elementStart(5, "lg-checkbox", 9);
    \u0275\u0275listener("onCheckboxChanged", function TaxesSettingsComponent_For_4_Template_lg_checkbox_onCheckboxChanged_5_listener() {
      const \u0275$index_7_r2 = \u0275\u0275restoreView(_r1).$index;
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.onTaxValueChange(\u0275$index_7_r2));
    });
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "lg-number-input", 10);
    \u0275\u0275listener("onInputChange", function TaxesSettingsComponent_For_4_Template_lg_number_input_onInputChange_6_listener() {
      const \u0275$index_7_r2 = \u0275\u0275restoreView(_r1).$index;
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.onTaxValueChange(\u0275$index_7_r2));
    });
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "lg-button", 11);
    \u0275\u0275listener("click", function TaxesSettingsComponent_For_4_Template_lg_button_click_7_listener() {
      const \u0275$index_7_r2 = \u0275\u0275restoreView(_r1).$index;
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.deleteTxRow(\u0275$index_7_r2));
    });
    \u0275\u0275element(8, "mat-icon", 12);
    \u0275\u0275elementEnd()()()();
  }
  if (rf & 2) {
    const \u0275$index_7_r2 = ctx.$index;
    const ctx_r2 = \u0275\u0275nextContext();
    ctx_r2.taxesForm.controls.rows.controls[\u0275$index_7_r2];
    \u0275\u0275property("formGroupName", \u0275$index_7_r2);
    \u0275\u0275advance();
    \u0275\u0275classProp("taxes__row--odd", \u0275$index_7_r2 % 2 !== 0);
    \u0275\u0275advance();
    \u0275\u0275property("top", true)("fit", true);
    \u0275\u0275advance();
    \u0275\u0275property("placeholder", "Name");
    \u0275\u0275advance();
    \u0275\u0275property("rows", 3)("placeholder", "Description");
    \u0275\u0275advance();
    \u0275\u0275property("customMark", "%");
    \u0275\u0275advance();
    \u0275\u0275property("placeholder", "Value");
    \u0275\u0275advance();
    \u0275\u0275styleMap("danger");
    \u0275\u0275property("size", "tiny")("icon", true);
  }
}
function TaxesSettingsComponent_Conditional_7_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275text(0, " Save changes ");
  }
}
function TaxesSettingsComponent_Conditional_8_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275text(0, " No changes ");
  }
}
var TaxesSettingsComponent = class _TaxesSettingsComponent {
  _taxesRepository;
  _notificationService;
  constructor(_taxesRepository, _notificationService) {
    this._taxesRepository = _taxesRepository;
    this._notificationService = _notificationService;
  }
  taxes = signal([]);
  rows = computed(() => this.taxes().map((tax) => Tax.fromRaw(tax)));
  taxesForm = new FormGroup({
    rows: new FormArray([
      this._getRowGroup()
    ])
  });
  rowsEffect = effect(() => {
    this._rowsFormArray.clear();
    this.rows().forEach((row, index) => {
      this._rowsFormArray.push(this._getRowGroup(row));
    });
    this.taxesForm.updateValueAndValidity();
    this.taxesForm.markAsPristine();
  });
  totalTaxes = signal(0);
  formValues = this.taxesForm.valueChanges.pipe(takeUntilDestroyed());
  get _rowsFormArray() {
    return this.taxesForm.get("rows");
  }
  ngOnInit() {
    this._taxesRepository.getAll().then((taxes) => {
      this.taxes.set(taxes);
    });
  }
  onTaxValueChange(index) {
  }
  deleteTxRow(index) {
    const tax = this.taxesForm.value.rows?.[index]?.uuid;
    this._rowsFormArray.removeAt(index);
    this.taxesForm.markAsDirty();
    if (tax) {
      this._taxesRepository.deleteOne(tax);
    }
  }
  addTaxRow() {
    this._rowsFormArray.push(this._getRowGroup());
    this.taxesForm.markAsDirty();
  }
  async saveTaxes() {
    try {
      const taxes = this.taxesForm.value.rows?.map((item) => Tax.fromRaw(taxDTOFromFormValue(item))) ?? [];
      await this._taxesRepository.addMany(taxes);
      this._notificationService.success("Taxes saved successfully");
      this.taxesForm.markAsPristine();
    } catch (e) {
      this._notificationService.error(errorHandler(e));
    }
  }
  _getRowGroup(value) {
    return new FormGroup({
      name: new FormControl(value?.name || ""),
      description: new FormControl(value?.description || ""),
      value: new FormControl(value?.amount || 0),
      amount: new FormControl(0),
      percentage: new FormControl(value?.percentage || false),
      uuid: new FormControl(value?.uuid || "")
    });
  }
  static \u0275fac = function TaxesSettingsComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _TaxesSettingsComponent)(\u0275\u0275directiveInject(TaxesRepository), \u0275\u0275directiveInject(NotificationsService));
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _TaxesSettingsComponent, selectors: [["lg-taxes-settings"]], decls: 11, vars: 7, consts: [[3, "formGroup"], ["formArrayName", "rows"], [1, "taxes", 3, "formGroupName"], ["lgSelfCenter", "", "lgShrink", "", 3, "click", "disabled"], ["lgSelfCenter", "", "lgShrink", "", 3, "click"], [1, "taxes__row"], [3, "top", "fit"], ["formControlName", "name", "lgWidth", "35%", 3, "placeholder"], ["lgWidth", "35%", "formControlName", "description", 3, "rows", "placeholder"], ["lgShrink", "", "formControlName", "percentage", 3, "onCheckboxChanged", "customMark"], ["lgParseMath", "", "formControlName", "value", 3, "onInputChange", "placeholder"], ["lgShrink", "", 3, "click", "size", "icon"], ["aria-hidden", "false", "aria-label", "Example home icon", "fontIcon", "close"]], template: function TaxesSettingsComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "lg-gap-column");
      \u0275\u0275elementContainerStart(1, 0)(2, 1);
      \u0275\u0275repeaterCreate(3, TaxesSettingsComponent_For_4_Template, 9, 14, "section", 2, _forTrack0);
      \u0275\u0275elementContainerEnd()();
      \u0275\u0275elementStart(5, "lg-gap-row")(6, "lg-button", 3);
      \u0275\u0275listener("click", function TaxesSettingsComponent_Template_lg_button_click_6_listener() {
        return ctx.saveTaxes();
      });
      \u0275\u0275conditionalCreate(7, TaxesSettingsComponent_Conditional_7_Template, 1, 0)(8, TaxesSettingsComponent_Conditional_8_Template, 1, 0);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(9, "lg-button", 4);
      \u0275\u0275listener("click", function TaxesSettingsComponent_Template_lg_button_click_9_listener() {
        return ctx.addTaxRow();
      });
      \u0275\u0275text(10, " Add tax ");
      \u0275\u0275elementEnd()()();
    }
    if (rf & 2) {
      \u0275\u0275advance();
      \u0275\u0275property("formGroup", ctx.taxesForm);
      \u0275\u0275advance(2);
      \u0275\u0275repeater(ctx.taxes());
      \u0275\u0275advance(3);
      \u0275\u0275styleMap("success");
      \u0275\u0275property("disabled", !ctx.taxesForm.dirty);
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.taxesForm.dirty ? 7 : 8);
      \u0275\u0275advance(2);
      \u0275\u0275styleMap("warning");
    }
  }, dependencies: [
    GapRowComponent,
    CheckboxComponent,
    FormsModule,
    NgControlStatus,
    NgControlStatusGroup,
    ButtonComponent,
    InputComponent,
    MatIcon,
    NumberInputComponent,
    ParseMathDirective,
    ReactiveFormsModule,
    FormGroupDirective,
    FormControlName,
    FormGroupName,
    FormArrayName,
    SelfCenterDirective,
    ShrinkDirective,
    TextareaComponent,
    WidthDirective,
    GapColumnComponent
  ], encapsulation: 2 });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(TaxesSettingsComponent, [{
    type: Component,
    args: [{ selector: "lg-taxes-settings", standalone: true, template: `
      <lg-gap-column>
          <ng-container [formGroup]="taxesForm">
              <ng-container formArrayName="rows">
                  @for (taxRow of taxes();track (taxRow.name + taxRow.uuid);let i = $index, odd = $odd) {

                      @let tacControl = taxesForm.controls.rows.controls[i];
                      <section class="taxes" [formGroupName]="i">
                          <div class="taxes__row"
                               [class.taxes__row--odd]="odd">
                              <lg-gap-row [top]="true" [fit]="true">
                                  <lg-input
                                          formControlName="name"
                                          lgWidth="35%"
                                          [placeholder]="'Name'"></lg-input>

                                  <lg-textarea [rows]="3"
                                               lgWidth="35%"
                                               formControlName="description"
                                               [placeholder]="'Description'"></lg-textarea>

                                  <lg-checkbox
                                          (onCheckboxChanged)="onTaxValueChange(i)"
                                          [customMark]="'%'"
                                          lgShrink
                                          formControlName="percentage"></lg-checkbox>

                                  <lg-number-input
                                          lgParseMath
                                          (onInputChange)="onTaxValueChange(i)"
                                          formControlName="value"
                                          [placeholder]="'Value'"></lg-number-input>

                                  <lg-button [style]="'danger'"
                                             lgShrink
                                             [size]="'tiny'"
                                             [icon]="true"
                                             (click)="deleteTxRow(i)">
                                      <mat-icon aria-hidden="false" aria-label="Example home icon"
                                                fontIcon="close"></mat-icon>
                                  </lg-button>
                              </lg-gap-row>
                          </div>
                      </section>
                  }
              </ng-container>
          </ng-container>

          <lg-gap-row>
              <lg-button (click)="saveTaxes()"
                         [disabled]="!taxesForm.dirty"
                         [style]="'success'"
                         lgSelfCenter
                         lgShrink>
                  @if (taxesForm.dirty) {
                      Save changes
                  } @else {
                      No changes
                  }
              </lg-button>

              <lg-button (click)="addTaxRow()"
                         [style]="'warning'"
                         lgSelfCenter
                         lgShrink>
                  Add tax
              </lg-button>
          </lg-gap-row>
      </lg-gap-column>
  `, imports: [
      GapRowComponent,
      CheckboxComponent,
      FormsModule,
      ButtonComponent,
      InputComponent,
      MatIcon,
      NumberInputComponent,
      ParseMathDirective,
      ReactiveFormsModule,
      SelfCenterDirective,
      ShrinkDirective,
      TextareaComponent,
      WidthDirective,
      GapColumnComponent,
      GapColumnComponent,
      ReactiveFormsModule,
      GapRowComponent,
      InputComponent,
      TextareaComponent,
      CheckboxComponent,
      NumberInputComponent,
      ButtonComponent,
      MatIcon,
      SelfCenterDirective,
      ShrinkDirective
    ] }]
  }], () => [{ type: TaxesRepository }, { type: NotificationsService }], null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(TaxesSettingsComponent, { className: "TaxesSettingsComponent", filePath: "src/app/features/settings/view/finance-settings/taxes/taxes-settings.component.ts", lineNumber: 127 });
})();

export {
  SelfCenterDirective,
  TaxesSettingsComponent
};
//# sourceMappingURL=chunk-E6NCLLWD.js.map
