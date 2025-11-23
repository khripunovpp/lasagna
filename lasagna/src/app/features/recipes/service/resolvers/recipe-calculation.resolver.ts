import {ActivatedRouteSnapshot, ResolveFn, RouterStateSnapshot} from '@angular/router';
import {inject} from '@angular/core';
import {CalculateRecipeService} from '../providers/calulate-recipe.service';
import {IS_CLIENT} from '../../../../shared/service/tokens/isClient.token';

export const recipeCalculationResolver: ResolveFn<any> = async (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot,
) => {
  const isBrowser = inject(IS_CLIENT);
  if (!isBrowser) {
    return Promise.resolve(null);
  }
  const uuid = route.paramMap.get('uuid')!;
  return inject(CalculateRecipeService)?.calculateRecipe(uuid);
};
