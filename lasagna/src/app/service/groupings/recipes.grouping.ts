import {SortStrategy} from '@service/types/sorting.types';
import {RecipeDTO} from '@service/db/shemes/Recipe.scheme';
import {BaseGrouping} from '@service/groupings/base-grouping';

export class CategoryRecipeSortStrategy
  extends BaseGrouping<RecipeDTO> {
  override groupBy(item: RecipeDTO): string {
    return item.category_id ?? 'uncategorized';
  }

  override sort(
    a: RecipeDTO,
    b: RecipeDTO,
    direction: 'asc' | 'desc',
    field: string = 'name'
  ): number {
    if (!a || !b) return 0;
    if (field === 'name') {
      if (direction === 'asc') {
        return (a as any)[field]?.toString()?.localeCompare((b as any)[field]) || 0;
      } else {
        return (b as any)[field]?.toString()?.localeCompare((a as any)[field]) || 0;
      }
    } else if (field === 'createdAt') {
      const dateA = new Date((a as any)[field]);
      const dateB = new Date((b as any)[field]);
      return direction === 'asc' ? dateA.getTime() - dateB.getTime() : dateB.getTime() - dateA.getTime();
    }
    return 0
  }
}

export class RecipeNameSortStrategy
  implements SortStrategy<RecipeDTO> {
  groupBy(item: RecipeDTO): string {
    return item.name.toLowerCase().charAt(0);
  }
}

export class RecipeCreatedAtMonthSortStrategy
  implements SortStrategy<RecipeDTO> {
  groupBy(item: RecipeDTO): string {
    const date = item.createdAt ? new Date(item.createdAt) : new Date();
    return `${date.getFullYear()}-${date.getMonth() + 1}-${('0' + date.getDate()).slice(-2)}`;
  }

  sort(
    a: RecipeDTO,
    b: RecipeDTO,
    direction: 'asc' | 'desc',
    field: string = 'createdAt'
  ): number {
    if (!a || !b) return 0;
    if (field === 'name') {
      if (direction === 'asc') {
        return (a as any)[field]?.toString()?.localeCompare((b as any)[field]) || 0;
      } else {
        return (b as any)[field]?.toString()?.localeCompare((a as any)[field]) || 0;
      }
    } else if (field === 'createdAt') {
      const dateA = new Date((a as any)[field]);
      const dateB = new Date((b as any)[field]);
      return direction === 'asc' ? dateA.getTime() - dateB.getTime() : dateB.getTime() - dateA.getTime();
    }
    return 0
  }
}
