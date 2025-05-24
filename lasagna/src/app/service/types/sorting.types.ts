export interface SortStrategy<T> {
  groupBy(item: T): string
  sort?(a: T, b: T,direction: 'asc' | 'desc'): number
}

export interface SortResultGroup<T> {
  field: string;
  items: T[];
}

export class SortResult<T> {
  constructor(
    public groups: SortResultGroup<T>[],
  ) {
  }
}
