import {IndexDataHandler} from '../types/index-handlers.types';
import {Stores} from '../const/stores';
import {TranslateService} from '@ngx-translate/core';
import {inject} from '@angular/core';
import {CategoryRecipeDTO} from '../shemes/CategoryRecipe.scheme';

export class RecipesCategoriesIndexHandler
  implements IndexDataHandler<CategoryRecipeDTO, CategoryRecipeDTO> {

  private readonly _translateService = inject(TranslateService);

  canHandle(table: string, data: CategoryRecipeDTO[]): boolean {
    return table === Stores.RECIPES_CATEGORIES;
  }

  transform(data: CategoryRecipeDTO[]): CategoryRecipeDTO[] {
    return data.map(item => {
      if (item.system) {
        item.name = this._translateService.instant('category.recipe.' + item.name);
      }
      return item;
    })
  }

  getName(): string {
    return 'RecipesCategoriesIndexHandler';
  }
}


