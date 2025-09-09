import {ActivatedRouteSnapshot, ResolveFn, RouterStateSnapshot} from '@angular/router';
import {inject} from '@angular/core';
import {CalculateRecipeService} from '../providers/calulate-recipe.service';

export const recipeCalculationResolver: ResolveFn<any> = async (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot,
) => {
  const uuid = route.paramMap.get('uuid')!;
  return inject(CalculateRecipeService)?.calculateRecipe(uuid);
};
