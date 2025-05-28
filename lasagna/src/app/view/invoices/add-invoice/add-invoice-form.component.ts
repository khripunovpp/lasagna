import {AfterViewInit, Component, effect, inject, input, OnInit, viewChild, ViewEncapsulation} from '@angular/core';
import {FormArray, FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {GapColumnComponent} from '../../ui/layout/gap-column.component';
import {SelectResourcesService} from '@service/services/select-resources.service';
import {NotificationsService} from '@service/services/notifications.service';
import {AutocompleteComponent} from '../../ui/form/autocomplete.component';
import {debounceTime, tap} from 'rxjs';
import {TranslatePipe} from '@ngx-translate/core';
import {SETTINGS} from '@service/tokens/settings.token';
import {Invoice} from '@service/models/Invoice';
import {InvoiceItem} from '@service/models/InvoiceItem';
import {ButtonComponent} from '@view/ui/layout/button.component';
import {ControlsRowComponent} from '@view/ui/form/controls-row.component';
import {ExpandDirective} from '@view/directives/expand.directive';
import {NumberInputComponent} from '@view/ui/form/number-input.component';
import {ParseMathDirective} from '@view/directives/parse-math.directive';
import {UnitSwitcherComponent} from '@view/ui/unit-switcher.component';
import {MatIcon} from '@angular/material/icon';
import {InputComponent} from '@view/ui/form/input.component';
import {CurrencySymbolPipe} from '@view/pipes/currency-symbol.pipe';
import {InvoiceItemSelectorComponent} from '@view/invoices/add-invoice/invoice-item-selector.component';
import {MultiselectComponent} from '@view/ui/form/multiselect.component';
import {GapRowComponent} from "@view/ui/layout/gap-row.component";
import {WidthDirective} from "@view/directives/width.directive";
import {TextareaComponent} from "@view/ui/form/textarea.component";
import {InvoiceItemDTO} from '@service/db/shemes/Good.scheme';
import {InvoiceDTO} from '@service/db/shemes/Invoice.scheme';

@Component({
  selector: 'lg-add-invoice-form',
  standalone: true,
  templateUrl: './add-invoice-form.component.html',
  imports: [
    ReactiveFormsModule,
    GapColumnComponent,
    AutocompleteComponent,
    TranslatePipe,
    ButtonComponent,
    ControlsRowComponent,
    ExpandDirective,
    MatIcon,
    NumberInputComponent,
    ParseMathDirective,
    UnitSwitcherComponent,
    InputComponent,
    CurrencySymbolPipe,
    InvoiceItemSelectorComponent,
    MultiselectComponent,
    GapRowComponent,
    WidthDirective,
    TextareaComponent,
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
    public _selectResourcesService: SelectResourcesService,
    private _notificationsService: NotificationsService,
  ) {
  }

  form = new FormGroup({
    name: new FormControl<string | null>(null, Validators.required),
    rows: new FormArray([
      this._getGoodGroup(),
    ]),
    credential_from: new FormControl<string | null>(null),
    credential_to: new FormControl<string | null>(null),
    date_issued: new FormControl<number | string | null>(null),
    date_due: new FormControl<number | string | null>(null),
    notes: new FormControl<string | null>(null),
    terms: new FormControl<string | null>(null),
    invoice_number: new FormControl<string | null>(null),
    prefix: new FormControl<string | null>(null),
  });
  userSettings = inject(SETTINGS)
  invoice = input<Invoice | null>(null);
  nameField = viewChild<AutocompleteComponent>('nameField');

  private invoiceEffect = effect(() => {
    if (!this.invoice() || this.form.dirty) {
      return;
    }
    this.fillForm(this.invoice()!);
  });

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
    this.form.valueChanges.pipe(
      tap((v) => console.log('Form value changed', v)),
      debounceTime(100),
    ).subscribe(values => {
      if (!this.form.dirty) {
        return
      }
      debugger
      this.invoice()?.update(this.fromFormToInvoice(values));
      console.log('invoice', this.invoice())
      console.log(values)
      console.log(this.fromFormToInvoice(values))
    })
  }

  fromFormToInvoice(
    formValue: any
  ): InvoiceDTO {
    return {
      name: formValue.name || '',
      rows: formValue.rows.map((item: any) => {
        debugger
        const payload: any = {};
        if (item.payload?.recipe_id) {
          payload.type = 'recipe';
          payload.data = {uuid: item.payload.recipe_id?.uuid}
        } else if (item.payload?.product_id) {
          payload.type = 'product';
          payload.data = {uuid: item.payload.product_id?.uuid}
        } else if (item.payload?.free_name && item.payload?.free_price) {
          payload.type = 'freeStyle';
          payload.data = {
            name: item.payload.free_name,
            price: parseFloat(item.payload.free_price),
          };
        } else {
          payload.type = 'freeStyle';
          payload.data = {
            name: '',
            price: 0,
          };
        }
        return {
          amount: parseFloat(item.amount),
          unit: item.unit || 'gram',
          payload,
        }
      }),
      credential_from: formValue.credential_from || '',
      credential_to: formValue.credential_to || '',
      date_issued: formValue.date_issued,
      date_due: formValue.date_due,
      notes: formValue.notes || '',
      terms: formValue.terms || '',
      invoice_number: formValue.invoice_number || '',
      prefix: formValue.prefix || '',
    };
  }

  invoiceToFormValue(
    invoice: Invoice
  ): any {
debugger

    return {
      name: invoice.name,
      rows: invoice.rows.map(item => {
        const payload = {
          recipe_id: null,
          product_id: null,
          free_name: null,
          free_price: null,
        };

        if (item.payload?.type === 'recipe') {
          payload.recipe_id = item.payload.data.uuid;
        } else if (item.payload?.type === 'product') {
          payload.product_id = item.payload.data.uuid;
        } else if (item.payload?.type === 'freeStyle') {
          payload.free_name = item.payload.data.name;
          payload.free_price = item.payload.data.price?.toString() ?? null;
        }

        return {
          amount: item.amount?.toString() ?? null,
          unit: item.unit ?? 'gram',
          payload: payload,
        }
      }),
      credential_from: invoice.credential_from || '',
      credential_to: invoice.credential_to || '',
      date_issued: invoice.date_issued ? new Date(invoice.date_issued).toISOString() : null,
      date_due: invoice.date_due ? new Date(invoice.date_due).toISOString() : null,
      notes: invoice.notes || '',
      terms: invoice.terms || '',
      invoice_number: invoice.invoice_number || '',
      prefix: invoice.prefix || '',
    };
  }

  resetForm(
    value?: Invoice
  ) {
    // console.log('Reset form', value);
    // this.form.reset(value ? invoiceToFormValue(value) : this._defFormValue);
    // this.form.markAsPristine();
  }

  validateForm() {
    if (!this._formValid) {
      this._notificationsService.error(this._notificationsService.parseFormErrors(this.form).join(', '));
      return false;
    }
    return true
  }

  ngAfterViewInit() {
    this._selectResourcesService.load().then(resources => {
    });

    if (!this.invoice()?.uuid) {
      this.nameField()!.focus();
    }
    this.form.markAsPristine()
  }

  addGood() {
    this.rows.push(this._getGoodGroup());
    this.form.markAsDirty();
  }

  deleteGood(index: number) {
    this.rows.removeAt(index);
    this.form.markAsDirty();
  }

  fillForm(
    invoice?: Invoice
  ) {
    this.form.reset({});
    this.rows.clear();

    if (!invoice) {
      return;
    }
    this.form.reset(this.invoiceToFormValue(invoice));

    if (invoice.rows.length) {
      invoice.rows.forEach((good: InvoiceItem, index: number) => {
        this.rows.push(this._getGoodGroup(good));
      })
    } else {
      this.rows.push(this._getGoodGroup());
    }

    this.form.updateValueAndValidity();
    this.form.markAsPristine();
  }

  private _getGoodGroup(
    good?: Invoice['rows'][number]
  ) {
    return new FormGroup({
      amount: new FormControl(good?.amount?.toString() ?? null),
      unit: new FormControl(good?.unit ?? 'gram'),
      payload: new FormGroup({
        recipe_id: new FormControl(good?.payload?.type === 'recipe' ? good?.payload?.data?.uuid : null),
        product_id: new FormControl(good?.payload?.type === 'product' ? good?.payload?.data?.uuid : null),
        free_name: new FormControl(good?.payload?.type === 'freeStyle' ? good?.payload?.data?.name : null),
        free_price: new FormControl({
          disabled: good?.payload?.type !== 'freeStyle',
          value: good?.payload?.type === 'freeStyle' ? good?.payload?.data?.price?.toString() ?? null : null,
        }),
        activeTab: new FormControl(good?.payload?.type || 'recipe'),
      }),
    });
  }
}
