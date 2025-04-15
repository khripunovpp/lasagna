import {ActivatedRouteSnapshot, RedirectCommand, ResolveFn, Router, RouterStateSnapshot} from '@angular/router';
import {inject} from '@angular/core';
import {ProductsRepository} from '../repositories/products.repository';
import {RecipesRepository} from '../repositories/recipes.repository';

export const recipeDraftResolver: ResolveFn<any> = async (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot,
) => {
  const uuid = route.params['uuid'];
  const router = inject(Router);
  const recipesRepository = inject(RecipesRepository);
  const draft = recipesRepository?.getDraftRecipe(uuid);

  if (draft?.length) {
    return draft[0];
  } else {
    const recipesAdd = router.parseUrl("/recipes/add");
    return new RedirectCommand(recipesAdd);
  }
};
