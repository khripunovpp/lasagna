import {inject, InjectionToken} from '@angular/core';
import {Recipe, RecipesRepository} from '../repositories/recipes.repository';
import {CategoryRecipesRepository} from '../repositories/category-recipes-repository.service';
import {from, map, mergeMap, Observable, switchMap} from 'rxjs';
import {groupBy} from '../../helpers/grouping.helper';

export const CATEGORIZED_RECIPES_LIST = new InjectionToken<Observable<any>>('CategorizedRecipesList', {
  factory: () => {
    const recipesRepository = inject(RecipesRepository);
    const categoryRepository = inject(CategoryRecipesRepository);
    const recipes = from(recipesRepository.loadRecipes()).pipe(
      switchMap(() => recipesRepository.recipes$),
    );

    return recipes.pipe(
      map((recipes: Recipe[]) => recipes.toSorted((a: Recipe, b: Recipe) => a.name.localeCompare(b.name))),
      map((recipes: Recipe[]) => groupBy(recipes, 'category_id')),
      mergeMap(async (grouped: Record<string, Recipe[]>) => {
          const list = [];

          for (const category in grouped) {
            const recipes = grouped[category];
            const categoryName = await categoryRepository.getOne(category);

            list.push({
              category: categoryName?.name,
              recipes: recipes,
            });
          }

          if (!list.length) return [];

          const [first, ...sortedList] = list.toSorted((a, b) => a.category > b.category ? 1 : -1);

          // без категории всегда внизу
          if (first?.category) {
            return [first].concat(sortedList);
          }

          return sortedList.concat([first]);
        }
      ),
    );
  }
})
