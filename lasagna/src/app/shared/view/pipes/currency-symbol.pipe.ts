// currency-symbol.pipe.ts
import {Pipe, PipeTransform} from '@angular/core';
import {currencyStringToSymbol} from '../../helpers/assets/currency.helper';

@Pipe({
  name: 'currencySymbol',
  standalone: true,
})
export class CurrencySymbolPipe implements PipeTransform {
  transform(value: string): string {
    return currencyStringToSymbol(value);
  }
}
