export interface SortStrategy<T> {
  groupBy(item: T): string
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
