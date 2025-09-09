import {Component, forwardRef, input, model,} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ControlValueAccessor, FormsModule, NG_VALUE_ACCESSOR, ReactiveFormsModule,} from '@angular/forms';
import {TranslatePipe} from '@ngx-translate/core';
import {MultiselectComponent} from './multiselect.component';
import {ControlComponent} from './control-item/control.component';
import {ExpandDirective} from '../../../shared/view/directives/expand.directive';
import {FlexColumnComponent} from '../../../shared/view/layout/flex-column.component';

interface CurrencyOption {
  code: string;
  label: string;
  name: string;
}

@Component({
  selector: 'lg-currency-select',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    TranslatePipe,
    MultiselectComponent,
    ControlComponent,
    ExpandDirective,
    FlexColumnComponent
  ],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: forwardRef(() => CurrencySelectComponent),
    },
  ],
  template: `
    <lg-flex-column [size]="'small'">
      <lg-control [label]="'language.settings.currency-title' | translate"
                  lgExpand>
        <lg-multiselect
          (onSelected)="onCurrencySelected($event)"
          [multi]="false"
          [ngModel]="selectedCurrency()"
          [placeholder]="'currency.select-placeholder' | translate"
          [staticItems]="currencyList"
          compareField="code">
        </lg-multiselect>
      </lg-control>
      <small class="text-small text-muted">
        {{'language.settings.currency-informer' | translate}}

      </small>
    </lg-flex-column>
  `,
  styles: [`
    :host {
      display: flex;

      flex: 1;
    }
  `],
})
export class CurrencySelectComponent implements ControlValueAccessor {
  // Язык передаётся через input-сигнал
  lang = input<string>('en');

  readonly currencyList: CurrencyOption[] = [
    {code: 'USD', label: 'US Dollar', name: 'US Dollar'},
    {code: 'EUR', label: 'Euro', name: 'Euro'},
    {code: 'RUB', label: 'Russian Ruble', name: 'Russian Ruble'},
    {code: 'BRL', label: 'Brazilian Real', name: 'Brazilian Real'},
    {code: 'GBP', label: 'British Pound', name: 'British Pound'},
    {code: 'JPY', label: 'Japanese Yen', name: 'Japanese Yen'},
    {code: 'CNY', label: 'Chinese Yuan', name: 'Chinese Yuan'},
    {code: 'INR', label: 'Indian Rupee', name: 'Indian Rupee'},
    {code: 'KZT', label: 'Kazakhstani Tenge', name: 'Kazakhstani Tenge'},
    {code: 'UAH', label: 'Ukrainian Hryvnia', name: 'Ukrainian Hryvnia'},
    {code: 'PLN', label: 'Polish Zloty', name: 'Polish Zloty'},
    {code: 'TRY', label: 'Turkish Lira', name: 'Turkish Lira'},
  ];

  selectedCurrency = model<string | Partial<CurrencyOption>>('USD');

  writeValue(obj: string): void {
    const currencyCode = obj || 'USD';
    this.selectedCurrency.set(currencyCode);

    // Найти объект валюты в списке
    const foundCurrency = this.currencyList.find(c => c.code === currencyCode);

    if (foundCurrency) {
      // Установить объект валюты вместо кода
      this.selectedCurrency.set(foundCurrency.code);
    }
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    // Реализация при необходимости
  }

  onCurrencySelected(currency: any) {
    const currencyCode = typeof currency === 'string' ? currency : currency?.code;
    this.selectedCurrency.set(currency);
    this.onChange(currencyCode);
    this.onTouched();
  }

  private onChange = (val: string) => {
  };

  private onTouched = () => {
  };
}
