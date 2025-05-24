import {Injectable} from '@angular/core';
import {SortResult, SortResultGroup, SortStrategy} from '@service/types/sorting.types';

@Injectable({
  providedIn: 'root'
})
export class GroupSortService {
  sort<T>(
    items: T[],
    strategy: SortStrategy<T>,
    direction: 'asc' | 'desc' = 'asc'
  ): SortResult<T> {
    const groupsMap = new Map<string, T[]>();

    for (const item of items) {
      const key = strategy.groupBy(item);
      if (!groupsMap.has(key)) {
        groupsMap.set(key, []);
      }
      groupsMap.get(key)!.push(item);
    }

    const result: SortResultGroup<T>[] = [];

    for (const [field, groupItems] of groupsMap.entries()) {
      let sortedItems: T[] = groupItems;
      if (strategy.sort) {
        sortedItems = groupItems.toSorted((a, b) => strategy.sort?.(a, b, direction) ?? 0);
      }
      result.push({field, items: sortedItems});
    }

    return new SortResult(result.toSorted((a, b) => {
      if (direction === 'asc') {
        return a.field.localeCompare(b.field);
      } else {
        return b.field.localeCompare(a.field);
      }
    }));
  }
}
