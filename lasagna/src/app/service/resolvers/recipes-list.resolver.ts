import {ActivatedRouteSnapshot, ResolveFn, RouterStateSnapshot} from '@angular/router';
import {RecipesRepository} from '../repositories/recipes.repository';
import {inject} from '@angular/core';

export const recipesListResolver: ResolveFn<any> = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot,
) => {
  return inject(RecipesRepository)?.getRecipes();
};
