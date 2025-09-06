import {AfterViewInit, Component, inject, OnInit, viewChild, viewChildren, ViewEncapsulation} from '@angular/core';
import {FormArray, FormGroup, ReactiveFormsModule} from '@angular/forms';
import {FlexColumnComponent} from '../../../../shared/view/layout/flex-column.component';
import {NotificationsService, SelectResourcesService} from '../../../../shared/service/services';
import {AutocompleteComponent} from '../../../controls/form/autocomplete.component';
import {debounceTime} from 'rxjs';
import {SETTINGS} from '../../../settings/service/providers/settings.token';
import {ButtonComponent} from '../../../../shared/view/ui/button.component';
import {ControlsRowComponent} from '../../../controls/form/controls-row.component';
import {ExpandDirective} from '../../../../shared/view/directives/expand.directive';
import {NumberInputComponent} from '../../../controls/form/number-input.component';
import {ParseMathDirective} from '../../../../shared/view/directives/parse-math.directive';
import {UnitSwitcherComponent} from '../../../../shared/view/ui/unit-switcher.component';
import {MatIcon} from '@angular/material/icon';
import {InputComponent} from '../../../controls/form/input.component';
import {EntityItemSelectorComponent} from './parts/entity-item-selector.component';
import {MultiselectComponent} from '../../../controls/form/multiselect.component';
import {FlexRowComponent} from "../../../../shared/view/layout/flex-row.component";
import {WidthDirective} from "../../../../shared/view/directives/width.directive";
import {TextareaComponent} from "../../../controls/form/textarea.component";
import {ReadonlyControlComponent} from '../../../controls/form/readonly-control.component';
import {DatePickerComponent} from '../../../controls/form/date-picker.component';
import {Invoice} from '../../service/Inovice/Invoice';
import {InvoiceBuilderService} from '../invoice-builder.service';
import {InvoiceItemBase} from '../../service/InvoiceItem/InvoiceItemBase.abstract';
import {
  fromFormToDTO,
  fromInvoiceToFormValue,
  invoiceFormShape,
  makeInvoiceItemFormGroup
} from '../../helpers/invoices-forms.helper';

import {UserCurrencyPipe} from '../../../../shared/view/pipes/userCurrency.pipe';
import {Product} from '../../../products/service/Product';
import {Recipe} from '../../../recipes/service/models/Recipe';
import {InvoiceItemType} from '@invoices/service/InvoiceItem/InvoiceItem.types';
import {LoggerService} from '../../../logger/logger.service';


import {CredentialsType} from '../../../settings/service/types/credentials.types';

import {Credential} from '../../../settings/service/models/Credential';
import {CredentialFieldComponent} from '@invoices/view/add-invoice/parts/credential-field.component';
import {ControlExtraTemplateDirective} from "../../../controls/form/control-extra-template.directive";
import {ControlComponent} from '../../../controls/form/control-item/control.component';
import {BrowserTabTrackingService} from '../../../../shared/service/services/browser-tab-tracking.service';
import {DatePipe, DecimalPipe} from '@angular/common';
import {InvoiceTaxesAndFeesComponent} from '@invoices/view/add-invoice/parts/invoice-taxes-and-fees.component';
import {TranslatePipe} from '@ngx-translate/core';
import {matchMediaSignal} from '../../../../shared/view/signals/match-media.signal';
import {mobileBreakpoint} from '../../../../shared/view/const/breakpoints';
import {CurrencySymbolPipe} from '../../../../shared/view/pipes/currency-symbol.pipe';


@Component({
  selector: 'lg-add-invoice-form',
  standalone: true,
  templateUrl: './add-invoice-form.component.html',
  imports: [
    ReactiveFormsModule,
    FlexColumnComponent,
    ButtonComponent,
    ControlsRowComponent,
    ExpandDirective,
    MatIcon,
    NumberInputComponent,
    ParseMathDirective,
    UnitSwitcherComponent,
    InputComponent,
    EntityItemSelectorComponent,
    MultiselectComponent,
    FlexRowComponent,
    WidthDirective,
    TextareaComponent,
    ReadonlyControlComponent,
    DatePickerComponent,
    UserCurrencyPipe,
    CredentialFieldComponent,
    ControlExtraTemplateDirective,
    ControlComponent,
    DatePipe,
    InvoiceTaxesAndFeesComponent,
    TranslatePipe,
    CurrencySymbolPipe,
    DecimalPipe,
  ],
  styles: [
    `
    `
  ],
  encapsulation: ViewEncapsulation.None,
})
export class AddInvoiceFormComponent
  implements OnInit,
    AfterViewInit {
  constructor(
    public selectResourcesService: SelectResourcesService,
    public invoiceBuilderService: InvoiceBuilderService,
    private _notificationsService: NotificationsService,
    private _logger: LoggerService,
    private _browserTabTrackingService: BrowserTabTrackingService,
  ) {
  }

  readonly form = new FormGroup(invoiceFormShape);
  readonly userSettings = inject(SETTINGS);
  readonly nameField = viewChild<AutocompleteComponent>('nameField');
  readonly amountField = viewChildren<NumberInputComponent>('amount');
  readonly isMobile = matchMediaSignal(mobileBreakpoint);
  protected readonly CredentialsType = CredentialsType;

  get rows() {
    return this.form.get('rows') as FormArray;
  }

  private get _defFormValue() {
    return {
      name: null,
      rows: [],
    };
  }

  private get _formValid() {
    return this.form.valid;
  }

  ngOnInit() {
    this.fillForm(this.invoiceBuilderService.invoice());
    if (!this.invoiceBuilderService.invoice()?.canBeUpdated) {
      return
    }

    this.form.valueChanges.pipe(
      debounceTime(100),
    ).subscribe(values => {
      if (!this.form.dirty) {
        return
      }
      this._browserTabTrackingService.enableProtection();
      this._logger.log('Form value changed', values);
      this.invoiceBuilderService.patchInvoice(fromFormToDTO(this.form.getRawValue()) as any);
    });
  }

  resetForm(
    value?: Invoice
  ) {
    this.form.reset(value ? fromInvoiceToFormValue(value) : this._defFormValue);
    this.rows.clear();
    this.form.markAsPristine();
  }

  validateForm() {
    if (!this._formValid) {
      this._notificationsService.error(this._notificationsService.parseFormErrors(this.form).join(', '));
      return false;
    }
    return true
  }

  ngAfterViewInit() {
    this.selectResourcesService.load().then(resources => {
    });

    if (!this.invoiceBuilderService.invoice()?.uuid) {
      this.nameField()!.focus();
    }
  }

  addGood() {
    if (!this.invoiceBuilderService.invoice()?.canBeUpdated) {
      return
    }

    const newRow = this.invoiceBuilderService.addRow(this._getLastRowType());
    this.rows.push(this._getInvoiceItemFromGroup(newRow));
    this.form.markAsDirty();
  }

  deleteGood(index: number) {
    if (!this.invoiceBuilderService.invoice()?.canBeUpdated) {
      return
    }

    this.rows.removeAt(index);
    this.invoiceBuilderService.removeRow(index);
    this.form.markAsDirty();
  }

  fillForm(
    invoice?: Invoice
  ) {
    this.form.reset({});
    this.rows.clear();

    if (invoice) {
      const newValue = fromInvoiceToFormValue(invoice);
      this.form.reset(newValue);

      if (invoice.rows.length) {
        invoice.rows.forEach((good: InvoiceItemBase) => {
          this.rows.push(this._getInvoiceItemFromGroup(good));
        })
      } else {
        const newRow = this.invoiceBuilderService.addRow(this._getLastRowType());
        this.rows.push(this._getInvoiceItemFromGroup(newRow));
      }
    }

    this.form.updateValueAndValidity();
    this.form.markAsPristine();
    this._logger.log('Invoice form filled', this.form.value);
  }

  onRecipeSelected(
    recipe: any,
    index: number
  ) {
    if (!this.invoiceBuilderService.invoice()?.canBeUpdated) {
      return
    }

    this.invoiceBuilderService.setRecipePayload(index, Recipe.fromRaw(recipe)).then((row) => {
      this.amountField()?.at(index)?.focus();
      this.rows.at(index).patchValue({
        unit: row?.unit || 'gram',
        amount: row?.defaultOutcome,
      });

      setTimeout(() => {
        this.recalculateRows();
      }, 200);
    });
  }

  onProductSelected(
    product: any,
    index: number
  ) {
    if (!this.invoiceBuilderService.invoice()?.canBeUpdated) {
      return
    }

    const row = this.invoiceBuilderService.setProductPayload(index, Product.fromRaw(product));
    this.amountField()?.at(index)?.focus();
    this.rows.at(index).patchValue({
      unit: row?.unit || 'gram',
    });
  }

  onItemChanged(
    type: string,
    index: number
  ) {
    if (!this.invoiceBuilderService.invoice()?.canBeUpdated) {
      return
    }

    this.invoiceBuilderService.changeRowType(index, type as InvoiceItemType);
    this.rows.at(index).patchValue({
      recipe_id: null,
      product_id: null,
      pricePerUnit: null,
      totalPrice: null,
    })
  }

  recalculateRows() {
    const invoiceRows = this.invoiceBuilderService.invoice()?.rows || [];
    this.rows.controls.forEach((row, index) => {
      const item = invoiceRows[index];
      if (item) {
        row.patchValue({
          pricePerUnit: item.pricePerUnitModified || null,
          totalPrice: item.totalPrice || null,
        }, {
          emitEvent: false,
          onlySelf: true,
        });
      }
    });
    this.form.markAsDirty();
  }

  onCredentialSelected(
    credential: Credential | undefined
  ) {
    if (!this.invoiceBuilderService.invoice()?.canBeUpdated) {
      return
    }

    this.form.markAsDirty();
    this.invoiceBuilderService.setCredential(credential);
  }

  onCredentialDeleted(
    type: 'system' | 'customer'
  ) {
    if (!this.invoiceBuilderService.invoice()?.canBeUpdated) {
      return
    }

    this.form.markAsDirty();
    this.invoiceBuilderService.deleteCredential(type);
  }

  onTotalPriceChange(
    event: any,
    index: number
  ) {
    this.invoiceBuilderService.invoice()?.pinPricePerUnitByTotal(index, event);
    this.recalculateRows();
  }

  onPerUnitPriceChange(
    event: any,
    index: number
  ) {
    this.invoiceBuilderService.invoice()?.pinPricePerUnit(index, event);
    this.recalculateRows();
  }

  onTotalPriceWithTaxesAndFeesChange(
    event: any,
    index: number
  ) {
    // this.invoiceBuilderService.invoice()?.pinPricePerUnitByTotal(index, event);
    this.recalculateRows();
  }

  onAmountChange(
    event: any,
    index: number
  ) {
    this.recalculateRows();
  }

  private _getLastRowType(): InvoiceItemType {
    const lastRow = this.rows.at(this.rows.length - 1);
    if (lastRow && lastRow.value) {
      return lastRow.value.activeTab as InvoiceItemType;
    }
    return InvoiceItemType.Recipe;
  }

  private _getInvoiceItemFromGroup(
    item?: Invoice['rows'][number],
    invoice?: Invoice
  ) {
    return makeInvoiceItemFormGroup(item, invoice);
  }
}
