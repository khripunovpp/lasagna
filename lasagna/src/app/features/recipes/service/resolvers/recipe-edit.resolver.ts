import {ActivatedRouteSnapshot, ResolveFn, RouterStateSnapshot} from '@angular/router';
import {inject} from '@angular/core';
import {CalculateRecipeService} from '../providers/calulate-recipe.service';
import {RecipesRepository} from '../providers/recipes.repository';

export const recipeEditResolver: ResolveFn<any> = async (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot,
) => {
  const uuid = route.paramMap.get('uuid')!;
  return inject(RecipesRepository)?.getOne(uuid);
};
