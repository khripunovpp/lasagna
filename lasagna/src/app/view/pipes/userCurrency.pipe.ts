import {CurrencyPipe} from '@angular/common';
import {inject, Pipe} from '@angular/core';
import {USER_CURRENCY} from '@service/tokens/user-currency.token';
import {SETTINGS} from '@service/tokens/settings.token';

@Pipe({
  name: 'userCurrency',
  standalone: true,
})
export class UserCurrencyPipe {
  currencyPipe = inject(CurrencyPipe);
  userSettings = inject(SETTINGS);

  transform(value?: string | number, digitInfo: string = '1.0-0') {
    const currency: string = this.userSettings()['currency'] || 'USD';
    return this.currencyPipe.transform(value, currency, 'symbol-narrow', digitInfo);

  }
}
