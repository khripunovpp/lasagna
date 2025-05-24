import {SortStrategy} from '@service/types/sorting.types';
import {RecipeDTO} from '@service/db/shemes/Recipe.scheme';

export class CategoryRecipeSortStrategy
  implements SortStrategy<RecipeDTO> {
  groupBy(item: RecipeDTO): string {
    return item.category_id ?? 'uncategorized';
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
