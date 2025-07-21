import {Injectable} from '@angular/core';
import {SortResult, SortResultGroup, SortStrategy} from '../types/sorting.types';

@Injectable({
  providedIn: 'root'
})
export class GroupSortService {
  async groupItems<T>(
    items: T[],
    strategy: SortStrategy<T>,
    direction: 'asc' | 'desc' = 'asc',
    field: string = 'name',
  ): Promise<SortResult<T>> {
    const groupsMap = new Map<string, T[]>();

    const checkFn = (key: string, item: T) => {
      if (!groupsMap.has(key)) {
        groupsMap.set(key, []);
      }
      groupsMap.get(key)!.push(item);
    }

    for (const item of items) {
      const key = strategy.groupBy(item);
      // could be array, string, number, etc.
      if (Array.isArray(key)) {
        for (const subKey of key) {
          checkFn(subKey, item);
        }
      } else {
        checkFn(key, item);
      }
    }

    const result: SortResultGroup<T>[] = [];

    for (const [name, groupItems] of groupsMap.entries()) {
      let sortedItems: T[] = groupItems;
      if (strategy.innerSort) {
        sortedItems = groupItems.toSorted((a, b) => {
          return strategy.innerSort?.(a, b, direction, field) || 0;
        });
      }

      const fieldName = strategy?.fieldTransform ? await strategy.fieldTransform(name) : name;
      result.push({field: fieldName, items: sortedItems});
    }

    return new SortResult(result.toSorted((a, b) => {
      // compare field key, but if one of this is empty, put it at the end
      if (strategy.groupingSort) {
        return strategy.groupingSort(a.field, b.field, direction);
      }
      if (a.field === '' && b.field !== '') {
        return 1;
      } else if (b.field === '' && a.field !== '') {
        return -1;
      }
      return a.field.localeCompare(b.field);
    }));
  }
}
