import {ActivatedRouteSnapshot, ResolveFn, RouterStateSnapshot} from '@angular/router';
import {inject} from '@angular/core';
import {RecipesRepository} from '../providers/recipes.repository';
import {IS_CLIENT} from '../../../../shared/service/tokens/isClient.token';

export const recipeEditResolver: ResolveFn<any> = async (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot,
) => {
  const isBrowser = inject(IS_CLIENT);
  if (!isBrowser) {
    return Promise.resolve(null);
  }
  const uuid = route.paramMap.get('uuid')!;
  return inject(RecipesRepository)?.getOne(uuid);
};
