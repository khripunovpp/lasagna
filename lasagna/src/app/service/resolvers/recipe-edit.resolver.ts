import {ActivatedRouteSnapshot, ResolveFn, RouterStateSnapshot} from '@angular/router';
import {inject} from '@angular/core';
import {CalculateRecipeService} from '../services/calulate-recipe.service';
import {RecipesRepository} from '../repositories/recipes.repository';

export const recipeEditResolver: ResolveFn<any> = async (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot,
) => {
  const uuid = route.paramMap.get('uuid')!;
  return inject(RecipesRepository)?.getOne(uuid);
};
