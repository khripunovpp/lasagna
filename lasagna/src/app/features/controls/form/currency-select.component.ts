import {
  Component,
  Signal,
  input,
  effect,
  signal,
  inject,
  computed,
  forwardRef,
  ViewEncapsulation,
  model,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ControlValueAccessor,
  NG_VALUE_ACCESSOR,
  ReactiveFormsModule,
  FormsModule,
} from '@angular/forms';
import { TranslatePipe } from '@ngx-translate/core';
import { FlexColumnComponent } from '../../../shared/view/ui/layout/flex-column.component';
import { TitleComponent } from '../../../shared/view/ui/layout/title/title.component';
import { MultiselectComponent } from './multiselect.component';
import {ControlComponent} from './control-item/control.component';
import {WidthDirective} from '../../../shared/view/directives/width.directive';
import {ExpandDirective} from '../../../shared/view/directives/expand.directive';

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
    FlexColumnComponent,
    TitleComponent,
    ControlComponent,
    WidthDirective,
    ExpandDirective
  ],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: forwardRef(() => CurrencySelectComponent),
    },
  ],
  template: `
    <lg-control [label]="'language.settings.currency-title' | translate"
                lgExpand>
      <lg-multiselect
        (onSelected)="onCurrencySelected($event)"
        [(ngModel)]="selectedCurrency"
        [multi]="false"
        [placeholder]="'currency.select-placeholder' | translate"
        [staticItems]="displayedCurrencies()">
      </lg-multiselect>
    </lg-control>
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

  private currencyList: CurrencyOption[] = [
    { code: 'USD', label: 'US Dollar', name: 'US Dollar' },
    { code: 'EUR', label: 'Euro', name: 'Euro' },
    { code: 'RUB', label: 'Russian Ruble', name: 'Russian Ruble' },
    { code: 'BRL', label: 'Brazilian Real', name: 'Brazilian Real' },
    { code: 'GBP', label: 'British Pound', name: 'British Pound' },
    { code: 'JPY', label: 'Japanese Yen', name: 'Japanese Yen' },
    { code: 'CNY', label: 'Chinese Yuan', name: 'Chinese Yuan' },
    { code: 'INR', label: 'Indian Rupee', name: 'Indian Rupee' },
    { code: 'KZT', label: 'Kazakhstani Tenge', name: 'Kazakhstani Tenge' },
    { code: 'UAH', label: 'Ukrainian Hryvnia', name: 'Ukrainian Hryvnia' },
    { code: 'PLN', label: 'Polish Zloty', name: 'Polish Zloty' },
    { code: 'TRY', label: 'Turkish Lira', name: 'Turkish Lira' },
  ];

  private langPopularMap: Record<string, string[]> = {
    en: ['USD', 'EUR', 'GBP', 'JPY'],
    ru: ['RUB', 'USD', 'EUR', 'UAH', 'KZT'],
    pt: ['EUR', 'BRL', 'USD'],
  };

  selectedCurrency = model<string | CurrencyOption>('USD');

  // Популярные валюты для текущего языка
  displayedCurrencies = computed(() => {
    const popularCodes = this.langPopularMap[this.lang()] || ['USD', 'EUR'];
    const codes = new Set([...popularCodes, 'USD', 'EUR']); // Всегда включаем USD и EUR

    return this.currencyList.filter((c) => codes.has(c.code));
  });

  private onChange = (val: string) => {};
  private onTouched = () => {};

  writeValue(obj: string): void {
    const currencyCode = obj || 'USD';
    this.selectedCurrency.set(currencyCode);

    // Найти объект валюты в списке
    const currencies = this.displayedCurrencies();
    const foundCurrency = currencies.find(c => c.code === currencyCode);
    if (foundCurrency) {
      // Установить объект валюты вместо кода
      this.selectedCurrency.set(foundCurrency);
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
}
