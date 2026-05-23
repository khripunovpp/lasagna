import {ActivatedRouteSnapshot, RedirectCommand, ResolveFn, Router, RouterStateSnapshot} from '@angular/router';
import {inject} from '@angular/core';
import {RecipesRepository} from '../providers/recipes.repository';
import {IS_CLIENT} from '../../../../shared/service/tokens/isClient.token';

export const recipeDraftResolver: ResolveFn<any> = async (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot,
) => {
  const isBrowser = inject(IS_CLIENT);
  if (!isBrowser) {
    return Promise.resolve(null);
  }
  const uuid = route.params['uuid'];
  const router = inject(Router);
  const recipesRepository = inject(RecipesRepository);
  const draft = recipesRepository?.getDraft(uuid);

  if (draft) {
    return draft;
  } else {
    const recipesAdd = router.parseUrl("/recipes/add");
    return new RedirectCommand(recipesAdd);
  }
};
