import {ActivatedRouteSnapshot, ResolveFn, RouterStateSnapshot} from '@angular/router';
import {Recipe, RecipesRepository} from '../repositories/recipes.repository';
import {inject} from '@angular/core';
import {groupBy} from '../../helpers/grouping.helper';
import {CategoryRecipesRepository} from '../repositories/category-recipes-repository.service';

export const recipesListResolver: ResolveFn<any> = async (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot,
) => {
  const productsRepository = inject(RecipesRepository);
  const categoryRepository = inject(CategoryRecipesRepository);
  const recipes = await productsRepository.getRecipes()
  const sorted = recipes.toSorted((a: Recipe, b: Recipe) => a.name.localeCompare(b.name));
  const grouped = groupBy(sorted, 'category_id');
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
};
