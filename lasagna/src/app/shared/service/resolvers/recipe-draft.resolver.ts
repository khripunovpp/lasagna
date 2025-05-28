import {ActivatedRouteSnapshot, RedirectCommand, ResolveFn, Router, RouterStateSnapshot} from '@angular/router';
import {inject} from '@angular/core';
import {RecipesRepository} from '../repositories/recipes.repository';
import {Recipe} from '../models/Recipe';
import {DraftForm} from '../services/draft-forms.service';

export const recipeDraftResolver: ResolveFn<any> = async (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot,
) => {
  const uuid = route.params['uuid'];
  const router = inject(Router);
  const recipesRepository = inject(RecipesRepository);
  const draft = recipesRepository?.getDraftRecipe(uuid);

  if (draft?.length && draft[0]) {
    return <DraftForm<Recipe>>{
      ...draft[0],
      data: Recipe.fromRaw(draft[0]?.data),
    }
  } else {
    const recipesAdd = router.parseUrl("/recipes/add");
    return new RedirectCommand(recipesAdd);
  }
};
