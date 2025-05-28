import {inject, InjectionToken} from '@angular/core';
import {from, map, mergeMap, Observable, switchMap} from 'rxjs';
import {groupBy} from '../../../../shared/helpers/grouping.helper';
import {InvoicesRepository} from '../../service/Invoices.repository';
import {Invoice} from '../../service/Inovice/Invoice';

export const CATEGORIZED_INVOICES_LIST = new InjectionToken<Observable<any>>('CategorizedInvoicesList', {
  factory: () => {
    const invoicesRepository = inject(InvoicesRepository);
    const invoices = from(invoicesRepository.loadToObservable()).pipe(
      switchMap(() => invoicesRepository.items$),
    );

    return invoices.pipe(
      map((invoices: Invoice[]) => invoices.toSorted((a: Invoice, b: Invoice) => a.prefix.localeCompare(b.prefix))),
      map((invoices: Invoice[]) => groupBy(invoices, 'prefix')),
      mergeMap(async (grouped: Record<string, Invoice[]>) => {
          const list = [];

          for (const groupedKey in grouped) {
            list.push({
              group_key: groupedKey,
              items: grouped[groupedKey]?.toSorted((a, b) => a.createdAt > b.createdAt ? -1 : 1) || [],
            });
          }

          if (!list.length) return [];

          const [first, ...sortedList] = list.toSorted((a, b) => a.group_key > b.group_key ? 1 : -1);

          // без категории всегда внизу
          if (first?.group_key) {
            return [first].concat(sortedList);
          }

          return sortedList.concat([first]);
        }
      ),
    );
  }
})
