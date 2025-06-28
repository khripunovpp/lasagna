import {AfterViewInit, Component, inject, OnInit, viewChild, viewChildren, ViewEncapsulation} from '@angular/core';
import {FormArray, FormGroup, ReactiveFormsModule} from '@angular/forms';
import {GapColumnComponent} from '../../../../shared/view/ui/layout/gap-column.component';
import {NotificationsService, SelectResourcesService} from '../../../../shared/service/services';
import {AutocompleteComponent} from '../../../../shared/view/ui/form/autocomplete.component';
import {debounceTime} from 'rxjs';
import {SETTINGS} from '../../../settings/service/providers/settings.token';
import {ButtonComponent} from '../../../../shared/view/ui/layout/button.component';
import {ControlsRowComponent} from '../../../../shared/view/ui/form/controls-row.component';
import {ExpandDirective} from '../../../../shared/view/directives/expand.directive';
import {NumberInputComponent} from '../../../../shared/view/ui/form/number-input.component';
import {ParseMathDirective} from '../../../../shared/view/directives/parse-math.directive';
import {UnitSwitcherComponent} from '../../../../shared/view/ui/unit-switcher.component';
import {MatIcon} from '@angular/material/icon';
import {InputComponent} from '../../../../shared/view/ui/form/input.component';
import {InvoiceItemSelectorComponent} from './invoice-item-selector.component';
import {MultiselectComponent} from '../../../../shared/view/ui/form/multiselect.component';
import {GapRowComponent} from "../../../../shared/view/ui/layout/gap-row.component";
import {WidthDirective} from "../../../../shared/view/directives/width.directive";
import {TextareaComponent} from "../../../../shared/view/ui/form/textarea.component";
import {ReadonlyControlComponent} from '../../../../shared/view/ui/form/readonly-control.component';
import {DatePickerComponent} from '../../../../shared/view/ui/form/date-picker.component';
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
import {CredentialFieldComponent} from '@invoices/view/add-invoice/credential-field.component';
import {ControlExtraTemplateDirective} from "../../../../shared/view/ui/form/control-extra-template.directive";

@Component({
  selector: 'lg-add-invoice-form',
  standalone: true,
  templateUrl: './add-invoice-form.component.html',
  imports: [
    ReactiveFormsModule,
    GapColumnComponent,
    ButtonComponent,
    ControlsRowComponent,
    ExpandDirective,
    MatIcon,
    NumberInputComponent,
    ParseMathDirective,
    UnitSwitcherComponent,
    InputComponent,
    InvoiceItemSelectorComponent,
    MultiselectComponent,
    GapRowComponent,
    WidthDirective,
    TextareaComponent,
    ReadonlyControlComponent,
    DatePickerComponent,
    UserCurrencyPipe,
    CredentialFieldComponent,
    ControlExtraTemplateDirective,

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
  ) {
  }

  form = new FormGroup(invoiceFormShape);
  userSettings = inject(SETTINGS);
  nameField = viewChild<AutocompleteComponent>('nameField');
  amountField = viewChildren<NumberInputComponent>('amount');
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

    this.form.valueChanges.pipe(
      debounceTime(100),
    ).subscribe(values => {
      if (!this.form.dirty) {
        return
      }
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
    const newRow = this.invoiceBuilderService.addRow(this._getLastRowType());
    this.rows.push(this._getInvoiceItemFromGroup(newRow));
    this.form.markAsDirty();
  }

  deleteGood(index: number) {
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
      this.form.reset(fromInvoiceToFormValue(invoice));

      if (invoice.rows.length) {
        invoice.rows.forEach((good: InvoiceItemBase) => {
          this.rows.push(this._getInvoiceItemFromGroup(good));
        })
      } else {
        this.rows.push(this._getInvoiceItemFromGroup());
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
    this.invoiceBuilderService.setRecipePayload(index, Recipe.fromRaw(recipe)).then((row) => {
      this.amountField()?.at(index)?.focus();
      this.rows.at(index).patchValue({
        unit: row?.unit || 'gram',
      });
    });
  }

  onProductSelected(
    product: any,
    index: number
  ) {
    const row = this.invoiceBuilderService.setProductPayload(index, Product.fromRaw(product));
    this.amountField()?.at(index)?.focus();
    this.rows.at(index).patchValue({
      unit: row?.unit || 'gram',
    });
  }

  onItemChanged(
    type: InvoiceItemType,
    index: number
  ) {
    this.invoiceBuilderService.changeRowType(index, type);
    this.rows.at(index).patchValue({
      recipe_id: null,
      product_id: null,
    })
  }

  onCredentialSelected(
    credential: Credential | undefined
  ) {
    this.form.markAsDirty();
    this.invoiceBuilderService.setCredential(credential);
  }

  private _getLastRowType(): InvoiceItemType {
    const lastRow = this.rows.at(this.rows.length - 1);
    if (lastRow && lastRow.value) {
      return lastRow.value.activeTab as InvoiceItemType;
    }
    return InvoiceItemType.Recipe;
  }

  private _getInvoiceItemFromGroup(
    item?: Invoice['rows'][number]
  ) {
    return makeInvoiceItemFormGroup(item);
  }
}
