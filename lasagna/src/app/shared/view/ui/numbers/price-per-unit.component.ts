import {Component, computed, inject, input} from '@angular/core';
import {CurrencySymbolPipe} from '../../pipes/currency-symbol.pipe';
import {TranslateDirective, TranslatePipe} from '@ngx-translate/core';
import {UnitStringPipe} from '../../pipes/unitString.pipe';
import {UserCurrencyPipe} from '../../pipes/userCurrency.pipe';
import {hasMicroPrice} from '../../../helpers';
import {SETTINGS} from '../../../../features/settings/service/providers/settings.token';
import {SettingsKeysConst} from '../../../../features/settings/const/settings-keys.const';

@Component({
  selector: 'lg-price-per-unit',
  imports: [
    CurrencySymbolPipe,
    TranslatePipe,
    UnitStringPipe,
    UserCurrencyPipe,
    TranslateDirective
  ],
  template: `
    @if (hasMicroPrice(price())) {
      {{ 'micro-amount'|translate }}
      {{ userSettings()['currency']|currencySymbol }}
    } @else {
      {{ price() | userCurrency:pipesDigits() }}
    }
    <span [translateParams]="{unit:unit() | unitString | translate}"
          [translate]="'per-unit.label'"></span>
  `,
  styles:`
    :host {
      display: inline
    }
  `,
})
export class PricePerUnitComponent {
  constructor() {
  }

  price = input.required<number>();
  unit = input<string>('');
  readonly userSettings = inject(SETTINGS);
  readonly precisions = computed(() => this.userSettings()[SettingsKeysConst.pricePrecision] ?? 2);
  readonly pipesDigits = computed(() => `1.0-${this.precisions()}`);
  protected readonly hasMicroPrice = hasMicroPrice;
}
