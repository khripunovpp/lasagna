import {SortStrategy} from '../types/sorting.types';

export class BaseGrouping<T = any>
  implements SortStrategy<T> {
  sort(
    a: T,
    b: T,
    direction: 'asc' | 'desc' = 'asc'
  ) {
    if (direction === 'asc') {
      return JSON.stringify(a).localeCompare(JSON.stringify(b));
    } else {
      return JSON.stringify(b).localeCompare(JSON.stringify(a));
    }
  }

  groupBy(item: T): string {
    return JSON.stringify(item);
  }
}
