import {SortStrategy} from '../types/sorting.types';

export class BaseGrouping<T = any>
  implements SortStrategy<T> {
  innerSort(
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

  groupingSort(
    a: string,
    b: string,
    direction: 'asc' | 'desc' = 'asc'
  ): number {
    if (direction === 'asc') {
      return a.localeCompare(b);
    } else {
      return b.localeCompare(a);
    }
  }

  groupBy(item: T): string | string[] {
    return JSON.stringify(item);
  }

  fieldTransform?(field: string): string | Promise<string> {
    return field;
  }
}
