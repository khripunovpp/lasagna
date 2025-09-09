export interface SortStrategy<T> {
  groupBy(item: T): string | string[]

  innerSort?(a: T, b: T, direction: 'asc' | 'desc', field: string): number

  groupingSort?(a: string, b: string, direction: 'asc' | 'desc'): number

  fieldTransform?: (field: string) => Promise<string> | string;
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

  get length() {
    return this.groups.reduce((acc, group) => acc + group.items.length, 0);
  }
}
