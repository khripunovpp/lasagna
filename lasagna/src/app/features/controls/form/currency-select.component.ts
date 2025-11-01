import {Component, computed, forwardRef, inject, input, model,} from '@angular/core';

import {ControlValueAccessor, FormsModule, NG_VALUE_ACCESSOR, ReactiveFormsModule,} from '@angular/forms';
import {TranslatePipe, TranslateService} from '@ngx-translate/core';
import {MultiselectComponent} from './multiselect.component';
import {ControlComponent} from './control-item/control.component';
import {ExpandDirective} from '../../../shared/view/directives/expand.directive';
import {FlexColumnComponent} from '../../../shared/view/layout/flex-column.component';
import {APP_SERVER_IS_RU} from '../../../shared/service/tokens/app-server-region.token';

interface CurrencyOption {
  code: string;
  name: string;
}

@Component({
  selector: 'lg-currency-select',
  standalone: true,
  imports: [
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
          [staticItems]="currencyList()"
          compareField="code">
        </lg-multiselect>
      </lg-control>
      <small class="text-small text-muted">
        {{ 'language.settings.currency-informer' | translate }}

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
  constructor(
    private _translate: TranslateService,
  ) {
  }

  // Язык передаётся через input-сигнал
  lang = input<string>('en');
  readonly globalCurrencyList = computed<CurrencyOption[]>(() => {
    return [
      {code: 'USD', name: this._translate.instant('currency.USD')},
      {code: 'EUR', name: this._translate.instant('currency.EUR')},
      {code: 'RUB', name: this._translate.instant('currency.RUB')},
      {code: 'GBP', name: this._translate.instant('currency.GBP')},
      {code: 'JPY', name: this._translate.instant('currency.JPY')},
      {code: 'CNY', name: this._translate.instant('currency.CNY')},
      {code: 'INR', name: this._translate.instant('currency.INR')},
      {code: 'KZT', name: this._translate.instant('currency.KZT')},
      {code: 'UAH', name: this._translate.instant('currency.UAH')},
      {code: 'PLN', name: this._translate.instant('currency.PLN')},
      {code: 'TRY', name: this._translate.instant('currency.TRY')},
      {code: 'ILS', name: this._translate.instant('currency.ILS')},
    ]
  });
  readonly ruRegion = inject(APP_SERVER_IS_RU);
  readonly ruRegionCurrency = computed<CurrencyOption[]>(() => {
    return [
      {code: 'RUB', name: this._translate.instant('currency.RUB')},
      {code: 'USD', name: this._translate.instant('currency.USD')},
      {code: 'EUR', name: this._translate.instant('currency.EUR')},
    ]
  });
  readonly currencyList = computed<CurrencyOption[]>(() => {
    return this.ruRegion ? this.ruRegionCurrency() : this.globalCurrencyList();
  });

  selectedCurrency = model<string | Partial<CurrencyOption>>('USD');

  writeValue(obj: string): void {
    const currencyCode = obj || 'USD';
    this.selectedCurrency.set(currencyCode);

    // Найти объект валюты в списке
    const foundCurrency = this.currencyList().find(c => c.code === currencyCode);

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
