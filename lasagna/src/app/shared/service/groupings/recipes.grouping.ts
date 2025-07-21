import {SortStrategy} from '../types/sorting.types';
import {RecipeDTO} from '../../../features/recipes/service/Recipe.scheme';
import {BaseGrouping} from './base-grouping';
import {CategoryRecipesRepository} from '../../../features/settings/service/repositories/category-recipes.repository';

export class CategoryRecipeSortStrategy
  extends BaseGrouping<RecipeDTO> {
  constructor(
    public categoryRecipesRepository: CategoryRecipesRepository,
  ) {
    super();
  }

  override groupBy(item: RecipeDTO): string {
    return item.category_id || '';
  }

  override innerSort(
    a: RecipeDTO,
    b: RecipeDTO,
    direction: 'asc' | 'desc',
    field: string = 'name'
  ): number {
    return recipeInnerSortFunction(a, b);
  }

  override groupingSort(
    a: string,
    b: string,
    direction: 'asc' | 'desc',
  ): number {
    if (direction === 'asc') {
      return a.localeCompare(b);
    } else {
      return b.localeCompare(a);
    }
  }

  override async fieldTransform(field: string) {
    const category = await this.categoryRecipesRepository.getOne(field);
    return category?.name || field;
  }
}

export class TagsRecipeSortStrategy
  extends BaseGrouping<RecipeDTO> {
  override groupBy(item: RecipeDTO) {
    return item.tags?.map(tag => tag.toString()) || '';
  }

  override innerSort(
    a: RecipeDTO,
    b: RecipeDTO,
    direction: 'asc' | 'desc',
    field: string = 'name'
  ): number {
    return recipeInnerSortFunction(a, b);
  }
}

export class RecipeAlphabeticalSortStrategy
  extends BaseGrouping<RecipeDTO> {
  override groupBy(item: RecipeDTO): string {
    return item.name.toLowerCase().charAt(0);
  }

  override innerSort(
    a: RecipeDTO,
    b: RecipeDTO,
    direction: 'asc' | 'desc',
    field: string = 'name'
  ): number {
    return recipeInnerSortFunction(a, b);
  }

  override groupingSort(
    a: string,
    b: string,
    direction: 'asc' | 'desc',
  ): number {
    if (direction === 'asc') {
      return a.localeCompare(b);
    } else {
      return b.localeCompare(a);
    }
  }
}

export class RecipeCreatedAtMonthSortStrategy
  implements SortStrategy<RecipeDTO> {
  groupBy(item: RecipeDTO): string {
    const date = item.createdAt ? new Date(item.createdAt) : new Date();
    return `${date.getFullYear()}-${date.getMonth() + 1}-${('0' + date.getDate()).slice(-2)}`;
  }

  innerSort(
    a: RecipeDTO,
    b: RecipeDTO,
    direction: 'asc' | 'desc',
    field: string = 'createdAt'
  ): number {
    return recipeInnerSortFunction(a, b);
  }

  groupingSort(
    a: string,
    b: string,
    direction: 'asc' | 'desc',
  ): number {
    const [yearA, monthA, dayA] = a.split('-').map(Number);
    const [yearB, monthB, dayB] = b.split('-').map(Number);
    const dateA = new Date(yearA, monthA - 1, dayA);
    const dateB = new Date(yearB, monthB - 1, dayB);
    if (direction === 'asc') {
      return dateA.getTime() - dateB.getTime();
    } else {
      return dateB.getTime() - dateA.getTime();
    }
  }
}

export const recipeInnerSortFunction = (
  a: RecipeDTO,
  b: RecipeDTO,
  direction: 'asc' | 'desc' = 'asc',
  field: string = 'name'
): number => {
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
