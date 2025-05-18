import {CurrencyPipe} from '@angular/common';
import {inject, Pipe} from '@angular/core';
import {USER_CURRENCY} from '@service/tokens/user-currency.token';

@Pipe({
  name: 'userCurrency',
  standalone: true,
})
export class UserCurrencyPipe {
  currencyPipe = inject(CurrencyPipe);
  userCurrency = inject(USER_CURRENCY);

  transform(value?: string | number, digitInfo: string = '1.0-0') {
    const currency: string = this.userCurrency()?.getSetting<string>('currency')?.data || 'USD';
    return this.currencyPipe.transform(value, currency, 'symbol-narrow', digitInfo);

  }
}
