import {inject, InjectionToken} from '@angular/core';
import {from, map, Observable, shareReplay, switchMap} from 'rxjs';
import {RecipeDTO} from '../schemes/Recipe.scheme';
import {SortResult, SortStrategy} from '../../../../shared/service/types/sorting.types';
import {GroupSortService} from '../../../../shared/service/services/grouping-sorting.service';
import {RecipesRepository} from './recipes.repository';
import {injectQueryParams} from '../../../../shared/helpers';
import {CategoryRecipesRepository} from '../../../settings/service/repositories/category-recipes.repository';
import {Recipe} from '../models/Recipe';
import {
  CategoryRecipeSortStrategy,
  RecipeAlphabeticalSortStrategy,
  RecipeCreatedAtMonthSortStrategy,
  TagsRecipeSortStrategy
} from '../../../../shared/service/groupings/recipes.grouping';

export const CATEGORIZED_RECIPES_LIST = new InjectionToken<Observable<SortResult<RecipeDTO>>>('CategorizedRecipesList', {
  factory: () => {
    const groupSortService = inject(GroupSortService);
    const recipesRepository = inject(RecipesRepository);
    const groupingParam = injectQueryParams('groupBy');
    const sortDirection = injectQueryParams<string | null>('sortDirection');
    const sortField = injectQueryParams('sortField');
    const filterField = injectQueryParams('filterField');
    const filterValue = injectQueryParams('filterValue');
    const filterOperator = injectQueryParams('filterOperator');
    const categoryRepository = inject(CategoryRecipesRepository);
    const recipes = from(recipesRepository.loadAll({
      key: filterField() as keyof Recipe,
      value: filterValue(),
      operator: 'equals'
    })).pipe(
      switchMap(() => recipesRepository.getStream$),
      map((recipes: Recipe[]) => recipes.map((recipe: Recipe) => recipe.toDTO())),
    );
    const groupingMap: Record<string, () => any> = {
      'createdAt': () => new RecipeCreatedAtMonthSortStrategy(),
      'category': () => new CategoryRecipeSortStrategy(categoryRepository),
      'alphabetical': () => new RecipeAlphabeticalSortStrategy(),
      'tag': () => new TagsRecipeSortStrategy(),
    }

    return recipes.pipe(
      switchMap((recipes: RecipeDTO[]) => {
        const grouping = groupingParam() as string;
        const strategy: SortStrategy<any> = groupingMap[grouping]?.() ?? groupingMap['category']();

        return groupSortService.groupItems<RecipeDTO>(
          recipes,
          strategy,
          (sortDirection() as any) ?? 'asc',
          (sortField() as any) ?? 'name',
        );
      }),
      shareReplay(1),
    );
  },
});
