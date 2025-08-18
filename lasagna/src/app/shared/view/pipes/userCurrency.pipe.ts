import {DecimalPipe} from '@angular/common';
import {inject, Pipe} from '@angular/core';
import {SETTINGS} from '../../../features/settings/service/providers/settings.token';
import {currencyStringToSymbol} from '../../helpers/assets/currency.helper';

@Pipe({
  name: 'userCurrency',
  standalone: true,
})
export class UserCurrencyPipe {
  decimalPipe = inject(DecimalPipe);
  userSettings = inject(SETTINGS);

  transform(value?: string | number, digitInfo: string = '1.0-0') {
    const currency: string = this.userSettings()['currency'] || 'USD';
    const currencySymbol = currencyStringToSymbol(currency);

    return this.decimalPipe.transform(value, digitInfo) + ' ' + currencySymbol;

  }
}
