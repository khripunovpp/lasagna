import {ActivatedRouteSnapshot, ResolveFn, RouterStateSnapshot} from '@angular/router';
import {inject} from '@angular/core';
import {FormTemplateService} from '../services/form-templates.service';
import {RecipesRepository} from '../repositories/recipes.repository';

export const recipeCalculationTemplateResolver: ResolveFn<any> = async (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot,
) => {
  const uuid = route.paramMap.get('uuid')!;
  const repo = inject(RecipesRepository);
  const tplService = inject(FormTemplateService);
  const recipe = await repo.getOne(uuid);
  const taxTemplateName = recipe?.taxTemplateName;

  if (!taxTemplateName) {
    return null;
  }

  return tplService.getTemplateByName('tax', taxTemplateName);
};
