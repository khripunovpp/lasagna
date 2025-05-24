import {SortStrategy} from '@service/types/sorting.types';
import {RecipeDTO} from '@service/db/shemes/Recipe.scheme';
import {BaseGrouping} from '@service/groupings/base-grouping';

export class CategoryRecipeSortStrategy
  extends BaseGrouping<RecipeDTO> {
  override groupBy(item: RecipeDTO): string {
    return item.category_id ?? 'uncategorized';
  }

  override sort(a: RecipeDTO, b: RecipeDTO, direction: 'asc' | 'desc'): number {
    if (direction === 'asc') {
      return a.name.localeCompare(b.name);
    } else {
      return b.name.localeCompare(a.name);
    }
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
}
