import {Component, forwardRef, input, model,} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ControlValueAccessor, FormsModule, NG_VALUE_ACCESSOR, ReactiveFormsModule,} from '@angular/forms';
import {TranslatePipe} from '@ngx-translate/core';
import {FlexColumnComponent} from '../layout/flex-column.component';
import {MultiselectComponent} from './multiselect.component';
import {currencyList} from '../../../helpers/localization.helpers';
import {ControlComponent} from './control-item/control.component';

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
    ControlComponent
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
      <lg-control [label]="'language.settings.currency-title' | translate">
        <lg-multiselect
          (onSelected)="onCurrencySelected($event)"
          [clearable]="false"
          [multi]="false"
          [ngModel]="selectedCurrency()"
          [placeholder]="'currency.select-placeholder' | translate"
          [staticItems]="currencyList"
          bindLabel="label"
          bindValue="code">
        </lg-multiselect>
      </lg-control>
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
  readonly lang = input<string>('en');
  readonly selectedCurrency = model({
    code: 'USD',
  });
  readonly currencyList = currencyList;

  writeValue(obj: string): void {
    const currencyCode = obj || 'USD';

    this.selectedCurrency.set({
      code: currencyCode
    });
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
    this.selectedCurrency.set(currencyCode);
    this.onChange(currencyCode);
    this.onTouched();
  }

  private onChange = (val: string) => {
  };

  private onTouched = () => {
  };
}
