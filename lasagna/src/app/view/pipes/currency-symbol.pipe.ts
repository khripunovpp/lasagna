// currency-symbol.pipe.ts
import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'currencySymbol'
})
export class CurrencySymbolPipe implements PipeTransform {
  transform(value: string): string {
    // Пример: value = 'USD' или 'RUB'
    try {
      return Intl.NumberFormat('en', {
        style: 'currency',
        currency: value
      }).formatToParts().find(part => part.type === 'currency')?.value ?? '';
    } catch {
      return value; // если не найдёт — вернёт исходную строку
    }
  }
}
