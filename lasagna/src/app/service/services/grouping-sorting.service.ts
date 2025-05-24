import {Injectable} from '@angular/core';
import {SortResult, SortResultGroup, SortStrategy} from '@service/types/sorting.types';

@Injectable({
  providedIn: 'root'
})
export class GroupSortService {
   sort<T>(items: T[], strategy: SortStrategy<T>): SortResult<T> {
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
      // const sortedItems = strategy.sort(groupItems);
      result.push({ field, items: groupItems });
    }

    return new SortResult(result);
  }
}
