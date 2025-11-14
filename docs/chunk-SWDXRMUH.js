import {
  SelfEndDirective,
  TaxesRepository
} from "./chunk-NQAJZBIJ.js";
import {
  TextareaComponent
} from "./chunk-X2FLGATP.js";
import {
  matchMediaSignal,
  mobileBreakpoint
} from "./chunk-UBZBNBVI.js";
import {
  ControlBoxComponent
} from "./chunk-GGP5XEQ3.js";
import {
  WidthDirective
} from "./chunk-4BCA4DDF.js";
import {
  ShrinkDirective
} from "./chunk-PGGOXQOC.js";
import {
  ParseMathDirective
} from "./chunk-RC7AXQYB.js";
import {
  NumberInputComponent
} from "./chunk-MBRLPJFV.js";
import "./chunk-BO3IID47.js";
import {
  ControlComponent
} from "./chunk-CXFBFKL5.js";
import {
  InputComponent
} from "./chunk-JQT6LO7R.js";
import "./chunk-FLD2PPMH.js";
import "./chunk-EROQRXO4.js";
import {
  CheckboxComponent
} from "./chunk-ZVJRZSZB.js";
import {
  MatIcon
} from "./chunk-INPR6HOC.js";
import {
  FlexRowComponent
} from "./chunk-WJNK66FX.js";
import "./chunk-NMSYXSQT.js";
import "./chunk-TSXZ5ARA.js";
import "./chunk-AUXPMPTM.js";
import "./chunk-I546HKDL.js";
import {
  NotificationsService,
  Tax,
  errorHandler,
  taxDTOFromFormValue
} from "./chunk-5PDR5QLJ.js";
import "./chunk-E7RSJ4O4.js";
import "./chunk-OOJ6JS4B.js";
import "./chunk-T5CRNY7R.js";
import "./chunk-5WJUMO7X.js";
import {
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
  ReactiveFormsModule,
  takeUntilDestroyed
} from "./chunk-RTCNHMN6.js";
import {
  ButtonComponent
} from "./chunk-4JEN4JYG.js";
import {
  TranslatePipe
} from "./chunk-DXRFKXPR.js";
import "./chunk-SHM3W5T3.js";
import "./chunk-VBFW7QHU.js";
import "./chunk-IWOUTMKL.js";
import {
  FlexColumnComponent
} from "./chunk-L3Q75KKL.js";
import {
  NgTemplateOutlet
} from "./chunk-7I2CR6I6.js";
import {
  Component,
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
  ɵɵdirectiveInject,
  ɵɵelement,
  ɵɵelementContainer,
  ɵɵelementContainerEnd,
  ɵɵelementContainerStart,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵgetCurrentView,
  ɵɵlistener,
  ɵɵnextContext,
  ɵɵpipe,
  ɵɵpipeBind1,
  ɵɵproperty,
  ɵɵreference,
  ɵɵrepeater,
  ɵɵrepeaterCreate,
  ɵɵresetView,
  ɵɵrestoreView,
  ɵɵstyleMap,
  ɵɵtemplate,
  ɵɵtemplateRefExtractor,
  ɵɵtext,
  ɵɵtextInterpolate1
} from "./chunk-RQATVJ2P.js";
import "./chunk-PZQLIUCM.js";
import "./chunk-7YWLATDR.js";
import "./chunk-46DXP6YY.js";

// src/app/features/settings/view/finance-settings/taxes/taxes-settings.component.ts
var _forTrack0 = ($index, $item) => $item.name + $item.uuid + $index;
function TaxesSettingsComponent_Conditional_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275text(0);
    \u0275\u0275pipe(1, "translate");
  }
  if (rf & 2) {
    \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind1(1, 1, "settings.taxes.title"), " ");
  }
}
function TaxesSettingsComponent_For_5_Conditional_0_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275text(0);
    \u0275\u0275pipe(1, "translate");
  }
  if (rf & 2) {
    \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind1(1, 1, "settings.taxes.fees"), " ");
  }
}
function TaxesSettingsComponent_For_5_Conditional_2_ng_container_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementContainer(0);
  }
}
function TaxesSettingsComponent_For_5_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "lg-control-box")(1, "lg-flex-column", 7);
    \u0275\u0275template(2, TaxesSettingsComponent_For_5_Conditional_2_ng_container_2_Template, 1, 0, "ng-container", 8);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    \u0275\u0275nextContext();
    const rowTpl_r3 = \u0275\u0275reference(5);
    \u0275\u0275advance(2);
    \u0275\u0275property("ngTemplateOutlet", rowTpl_r3);
  }
}
function TaxesSettingsComponent_For_5_Conditional_3_ng_container_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementContainer(0);
  }
}
function TaxesSettingsComponent_For_5_Conditional_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 9);
    \u0275\u0275template(1, TaxesSettingsComponent_For_5_Conditional_3_ng_container_1_Template, 1, 0, "ng-container", 8);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const \u0275$index_10_r4 = \u0275\u0275nextContext().$index;
    const rowTpl_r3 = \u0275\u0275reference(5);
    \u0275\u0275classProp("taxes__row--odd", \u0275$index_10_r4 % 2 !== 0);
    \u0275\u0275advance();
    \u0275\u0275property("ngTemplateOutlet", rowTpl_r3);
  }
}
function TaxesSettingsComponent_For_5_ng_template_4_Conditional_14_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275text(0);
    \u0275\u0275pipe(1, "translate");
  }
  if (rf & 2) {
    \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind1(1, 1, "settings.taxes.delete"), " ");
  }
}
function TaxesSettingsComponent_For_5_ng_template_4_Conditional_15_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "mat-icon", 19);
  }
}
function TaxesSettingsComponent_For_5_ng_template_4_Template(rf, ctx) {
  if (rf & 1) {
    const _r5 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "lg-flex-row", 10)(1, "lg-control", 11);
    \u0275\u0275pipe(2, "translate");
    \u0275\u0275element(3, "lg-input", 12);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "lg-control", 11);
    \u0275\u0275pipe(5, "translate");
    \u0275\u0275element(6, "lg-textarea", 13);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "lg-control", 14);
    \u0275\u0275pipe(8, "translate");
    \u0275\u0275elementStart(9, "lg-checkbox", 15);
    \u0275\u0275listener("onCheckboxChanged", function TaxesSettingsComponent_For_5_ng_template_4_Template_lg_checkbox_onCheckboxChanged_9_listener() {
      \u0275\u0275restoreView(_r5);
      const \u0275$index_10_r4 = \u0275\u0275nextContext().$index;
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.onTaxValueChange(\u0275$index_10_r4));
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(10, "lg-control", 16);
    \u0275\u0275pipe(11, "translate");
    \u0275\u0275elementStart(12, "lg-number-input", 17);
    \u0275\u0275listener("onInputChange", function TaxesSettingsComponent_For_5_ng_template_4_Template_lg_number_input_onInputChange_12_listener() {
      \u0275\u0275restoreView(_r5);
      const \u0275$index_10_r4 = \u0275\u0275nextContext().$index;
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.onTaxValueChange(\u0275$index_10_r4));
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(13, "lg-button", 18);
    \u0275\u0275listener("click", function TaxesSettingsComponent_For_5_ng_template_4_Template_lg_button_click_13_listener() {
      \u0275\u0275restoreView(_r5);
      const \u0275$index_10_r4 = \u0275\u0275nextContext().$index;
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.deleteTxRow(\u0275$index_10_r4));
    });
    \u0275\u0275conditionalCreate(14, TaxesSettingsComponent_For_5_ng_template_4_Conditional_14_Template, 2, 3)(15, TaxesSettingsComponent_For_5_ng_template_4_Conditional_15_Template, 1, 0, "mat-icon", 19);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r5 = \u0275\u0275nextContext();
    const taxRow_r7 = ctx_r5.$implicit;
    const \u0275$index_10_r4 = ctx_r5.$index;
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275property("fit", true)("mobileMode", true)("top", true);
    \u0275\u0275advance();
    \u0275\u0275property("label", \u0275\u0275pipeBind1(2, 15, "settings.taxes.name"));
    \u0275\u0275advance(3);
    \u0275\u0275property("label", \u0275\u0275pipeBind1(5, 17, "settings.taxes.description"));
    \u0275\u0275advance(2);
    \u0275\u0275property("rows", 4);
    \u0275\u0275advance();
    \u0275\u0275property("label", \u0275\u0275pipeBind1(8, 19, "settings.taxes.percentage"));
    \u0275\u0275advance(2);
    \u0275\u0275property("customMark", "%")("name", taxRow_r7.name + \u0275$index_10_r4);
    \u0275\u0275advance();
    \u0275\u0275property("label", \u0275\u0275pipeBind1(11, 21, "settings.taxes.value"));
    \u0275\u0275advance(3);
    \u0275\u0275styleMap("danger");
    \u0275\u0275property("icon", !ctx_r1.isMobile())("size", "tiny");
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r1.isMobile() ? 14 : 15);
  }
}
function TaxesSettingsComponent_For_5_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275conditionalCreate(0, TaxesSettingsComponent_For_5_Conditional_0_Template, 2, 3);
    \u0275\u0275elementStart(1, "section", 5);
    \u0275\u0275conditionalCreate(2, TaxesSettingsComponent_For_5_Conditional_2_Template, 3, 1, "lg-control-box")(3, TaxesSettingsComponent_For_5_Conditional_3_Template, 2, 3, "div", 6);
    \u0275\u0275template(4, TaxesSettingsComponent_For_5_ng_template_4_Template, 16, 23, "ng-template", null, 0, \u0275\u0275templateRefExtractor);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const \u0275$index_10_r4 = ctx.$index;
    const ctx_r1 = \u0275\u0275nextContext();
    ctx_r1.taxesForm.controls.rows.controls[\u0275$index_10_r4];
    \u0275\u0275conditional(ctx_r1.feesIndex() === \u0275$index_10_r4 ? 0 : -1);
    \u0275\u0275advance();
    \u0275\u0275property("formGroupName", \u0275$index_10_r4);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r1.isMobile() ? 2 : 3);
  }
}
function TaxesSettingsComponent_ForEmpty_6_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "lg-flex-column", 3);
    \u0275\u0275text(1);
    \u0275\u0275pipe(2, "translate");
    \u0275\u0275elementStart(3, "lg-button", 20);
    \u0275\u0275listener("click", function TaxesSettingsComponent_ForEmpty_6_Template_lg_button_click_3_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.addTaxRow());
    });
    \u0275\u0275text(4);
    \u0275\u0275pipe(5, "translate");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind1(2, 5, "settings.taxes.empty-state.text"), " ");
    \u0275\u0275advance(2);
    \u0275\u0275styleMap("primary");
    \u0275\u0275property("size", "medium");
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind1(5, 7, "settings.taxes.empty-state.btn"), " ");
  }
}
function TaxesSettingsComponent_Conditional_7_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275text(0);
    \u0275\u0275pipe(1, "translate");
  }
  if (rf & 2) {
    \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind1(1, 1, "settings.taxes.save-changes"), " ");
  }
}
function TaxesSettingsComponent_Conditional_7_Conditional_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275text(0);
    \u0275\u0275pipe(1, "translate");
  }
  if (rf & 2) {
    \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind1(1, 1, "settings.taxes.no-changes"), " ");
  }
}
function TaxesSettingsComponent_Conditional_7_Template(rf, ctx) {
  if (rf & 1) {
    const _r8 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "lg-flex-row", 4)(1, "lg-button", 21);
    \u0275\u0275listener("click", function TaxesSettingsComponent_Conditional_7_Template_lg_button_click_1_listener() {
      \u0275\u0275restoreView(_r8);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.saveTaxes());
    });
    \u0275\u0275conditionalCreate(2, TaxesSettingsComponent_Conditional_7_Conditional_2_Template, 2, 3)(3, TaxesSettingsComponent_Conditional_7_Conditional_3_Template, 2, 3);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "lg-button", 22);
    \u0275\u0275listener("click", function TaxesSettingsComponent_Conditional_7_Template_lg_button_click_4_listener() {
      \u0275\u0275restoreView(_r8);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.addTaxRow());
    });
    \u0275\u0275element(5, "mat-icon", 23);
    \u0275\u0275text(6);
    \u0275\u0275pipe(7, "translate");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275property("mobileMode", true)("top", true);
    \u0275\u0275advance();
    \u0275\u0275styleMap("primary");
    \u0275\u0275property("disabled", !ctx_r1.taxesForm.dirty);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r1.taxesForm.dirty ? 2 : 3);
    \u0275\u0275advance(2);
    \u0275\u0275styleMap("default");
    \u0275\u0275property("outlined", true);
    \u0275\u0275advance();
    \u0275\u0275property("inline", true);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind1(7, 11, "settings.taxes.add-tax"), " ");
  }
}
var TaxesSettingsComponent = class _TaxesSettingsComponent {
  _taxesRepository;
  _notificationService;
  constructor(_taxesRepository, _notificationService) {
    this._taxesRepository = _taxesRepository;
    this._notificationService = _notificationService;
  }
  taxesAndFees = signal([], ...ngDevMode ? [{ debugName: "taxesAndFees" }] : []);
  feesIndex = computed(() => {
    return this.taxesAndFees().findIndex((tax) => !tax.percentage);
  }, ...ngDevMode ? [{ debugName: "feesIndex" }] : []);
  isMobile = matchMediaSignal(mobileBreakpoint);
  taxesForm = new FormGroup({
    rows: new FormArray([
      this._getRowGroup()
    ])
  });
  rowsEffect = effect(() => {
    this._rowsFormArray.clear();
    this.taxesAndFees().forEach((row, index) => {
      this._rowsFormArray.push(this._getRowGroup(row));
    });
    this.taxesForm.updateValueAndValidity();
    this.taxesForm.markAsPristine();
  }, ...ngDevMode ? [{ debugName: "rowsEffect" }] : []);
  totalTaxes = signal(0, ...ngDevMode ? [{ debugName: "totalTaxes" }] : []);
  formValues = this.taxesForm.valueChanges.pipe(takeUntilDestroyed());
  get _rowsFormArray() {
    return this.taxesForm.get("rows");
  }
  ngOnInit() {
    this._taxesRepository.getAll().then((taxes) => {
      this.taxesAndFees.set(taxes.toSorted((a, b) => a?.name?.localeCompare(b?.name) && +b.percentage - +a.percentage));
    });
  }
  onTaxValueChange(index) {
  }
  deleteTxRow(index) {
    const tax = this.taxesForm.value.rows?.[index]?.uuid;
    this._rowsFormArray.removeAt(index);
    this.taxesAndFees.update((current) => current.filter((t) => t.uuid !== tax));
    this.taxesForm.markAsDirty();
    if (tax) {
      this._taxesRepository.deleteOne(tax);
    }
  }
  addTaxRow() {
    const tax = Tax.empty();
    this._rowsFormArray.push(this._getRowGroup(tax));
    this.taxesAndFees.update((current) => [...current, tax]);
    this.taxesForm.markAsDirty();
  }
  async saveTaxes() {
    try {
      const taxes = this.taxesForm.value.rows?.map((item) => Tax.fromRaw(taxDTOFromFormValue(item))) ?? [];
      await this._taxesRepository.addMany(taxes);
      this._notificationService.success("settings.taxes.saved-success");
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
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _TaxesSettingsComponent, selectors: [["lg-taxes-settings"]], decls: 8, vars: 4, consts: [["rowTpl", ""], [3, "formGroup"], ["formArrayName", "rows"], ["position", "center", "size", "medium"], ["size", "medium", 3, "mobileMode", "top"], [1, "taxes", 3, "formGroupName"], [1, "taxes__row", 3, "taxes__row--odd"], [2, "--control-bg", "white"], [4, "ngTemplateOutlet"], [1, "taxes__row"], [3, "fit", "mobileMode", "top"], ["lgShrink", "", "lgWidth", "35%", 3, "label"], ["formControlName", "name", "placeholder", ""], ["formControlName", "description", "placeholder", "", 3, "rows"], ["lgShrink", "", "lgWidth", "15%", 3, "label"], ["formControlName", "percentage", 3, "onCheckboxChanged", "customMark", "name"], ["lgWidth", "15%", 3, "label"], ["formControlName", "value", "lgParseMath", "", "placeholder", "", 3, "onInputChange"], ["lgSelfEnd", "", "lgShrink", "", 3, "click", "icon", "size"], ["aria-hidden", "false", "aria-label", "Delete", "fontIcon", "close"], [3, "click", "size"], ["lgShrink", "", 3, "click", "disabled"], ["lgShrink", "", 3, "click", "outlined"], ["aria-hidden", "false", "fontIcon", "add", 3, "inline"]], template: function TaxesSettingsComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "lg-flex-column");
      \u0275\u0275elementContainerStart(1, 1)(2, 2);
      \u0275\u0275conditionalCreate(3, TaxesSettingsComponent_Conditional_3_Template, 2, 3);
      \u0275\u0275repeaterCreate(4, TaxesSettingsComponent_For_5_Template, 6, 3, null, null, _forTrack0, false, TaxesSettingsComponent_ForEmpty_6_Template, 6, 9, "lg-flex-column", 3);
      \u0275\u0275elementContainerEnd()();
      \u0275\u0275conditionalCreate(7, TaxesSettingsComponent_Conditional_7_Template, 8, 13, "lg-flex-row", 4);
      \u0275\u0275elementEnd();
    }
    if (rf & 2) {
      \u0275\u0275advance();
      \u0275\u0275property("formGroup", ctx.taxesForm);
      \u0275\u0275advance(2);
      \u0275\u0275conditional(ctx.taxesAndFees().length ? 3 : -1);
      \u0275\u0275advance();
      \u0275\u0275repeater(ctx.taxesAndFees());
      \u0275\u0275advance(3);
      \u0275\u0275conditional(ctx.taxesAndFees().length ? 7 : -1);
    }
  }, dependencies: [
    FlexRowComponent,
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
    ShrinkDirective,
    TextareaComponent,
    WidthDirective,
    FlexColumnComponent,
    ControlComponent,
    ControlBoxComponent,
    NgTemplateOutlet,
    SelfEndDirective,
    TranslatePipe
  ], encapsulation: 2 });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(TaxesSettingsComponent, [{
    type: Component,
    args: [{ selector: "lg-taxes-settings", standalone: true, template: `
    <lg-flex-column>
      <ng-container [formGroup]="taxesForm">
        <ng-container formArrayName="rows">
          @if (taxesAndFees().length) {
            {{ 'settings.taxes.title' | translate }}
          }

          @for (taxRow of taxesAndFees(); track (taxRow.name + taxRow.uuid + i); let i = $index, odd = $odd) {
            @let tacControl = taxesForm.controls.rows.controls[i];

            @if (feesIndex() === i) {
              {{ 'settings.taxes.fees' | translate }}
            }

            <section [formGroupName]="i" class="taxes">
              @if (isMobile()) {
                <lg-control-box>
                  <lg-flex-column style="--control-bg: white">
                    <ng-container *ngTemplateOutlet="rowTpl"></ng-container>
                  </lg-flex-column>
                </lg-control-box>
              } @else {
                <div [class.taxes__row--odd]="odd"
                     class="taxes__row">
                  <ng-container *ngTemplateOutlet="rowTpl"></ng-container>
                </div>
              }

              <ng-template #rowTpl>
                <lg-flex-row [fit]="true"
                             [mobileMode]="true"
                             [top]="true">
                  <lg-control [label]="'settings.taxes.name' | translate"
                              lgShrink
                              lgWidth="35%">
                    <lg-input formControlName="name"
                              placeholder=""></lg-input>
                  </lg-control>

                  <lg-control [label]="'settings.taxes.description' | translate"
                              lgShrink
                              lgWidth="35%">
                    <lg-textarea [rows]="4"
                                 formControlName="description"
                                 placeholder=""></lg-textarea>
                  </lg-control>

                  <lg-control [label]="'settings.taxes.percentage' | translate"
                              lgShrink
                              lgWidth="15%">
                    <lg-checkbox
                      (onCheckboxChanged)="onTaxValueChange(i)"
                      [customMark]="'%'"
                      [name]="taxRow.name+i"
                      formControlName="percentage"
                    ></lg-checkbox>
                  </lg-control>


                  <lg-control [label]="'settings.taxes.value' | translate"
                              lgWidth="15%">
                    <lg-number-input
                      (onInputChange)="onTaxValueChange(i)"
                      formControlName="value"
                      lgParseMath
                      placeholder=""></lg-number-input>
                  </lg-control>

                  <lg-button (click)="deleteTxRow(i)"
                             [icon]="!isMobile()"
                             [size]="'tiny'"
                             [style]="'danger'"
                             lgSelfEnd
                             lgShrink>
                    @if (isMobile()) {
                      {{ 'settings.taxes.delete'|translate }}
                    } @else {
                      <mat-icon aria-hidden="false" aria-label="Delete"
                                fontIcon="close"></mat-icon>
                    }
                  </lg-button>
                </lg-flex-row>
              </ng-template>
            </section>
          } @empty {
            <lg-flex-column position="center"
                            size="medium">
              {{ 'settings.taxes.empty-state.text'|translate }}

              <lg-button [size]="'medium'"
                         [style]="'primary'"
                         (click)="addTaxRow()">
                {{ 'settings.taxes.empty-state.btn'|translate }}
              </lg-button>
            </lg-flex-column>
          }
        </ng-container>
      </ng-container>

      @if (taxesAndFees().length) {
        <lg-flex-row [mobileMode]="true"
                     [top]="true"
                     size="medium">
          <lg-button (click)="saveTaxes()"
                     [disabled]="!taxesForm.dirty"
                     [style]="'primary'"
                     lgShrink>
            @if (taxesForm.dirty) {
              {{ 'settings.taxes.save-changes' | translate }}
            } @else {
              {{ 'settings.taxes.no-changes' | translate }}
            }
          </lg-button>

          <lg-button (click)="addTaxRow()"
                     [style]="'default'"
                     [outlined]="true"
                     lgShrink>
            <mat-icon aria-hidden="false"
                      [inline]="true"
                      fontIcon="add"></mat-icon>
            {{ 'settings.taxes.add-tax' | translate }}
          </lg-button>
        </lg-flex-row>
      }
    </lg-flex-column>
  `, imports: [
      FlexRowComponent,
      CheckboxComponent,
      FormsModule,
      ButtonComponent,
      InputComponent,
      MatIcon,
      NumberInputComponent,
      ParseMathDirective,
      ReactiveFormsModule,
      ShrinkDirective,
      TextareaComponent,
      WidthDirective,
      FlexColumnComponent,
      FlexColumnComponent,
      ReactiveFormsModule,
      FlexRowComponent,
      InputComponent,
      TextareaComponent,
      CheckboxComponent,
      NumberInputComponent,
      ButtonComponent,
      MatIcon,
      ShrinkDirective,
      TranslatePipe,
      ControlComponent,
      ControlBoxComponent,
      NgTemplateOutlet,
      SelfEndDirective
    ] }]
  }], () => [{ type: TaxesRepository }, { type: NotificationsService }], null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(TaxesSettingsComponent, { className: "TaxesSettingsComponent", filePath: "src/app/features/settings/view/finance-settings/taxes/taxes-settings.component.ts", lineNumber: 196 });
})();
export {
  TaxesSettingsComponent
};
//# sourceMappingURL=chunk-SWDXRMUH.js.map
