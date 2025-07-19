import {Injectable} from '@angular/core';
import {CategoryRecipe} from '../models/CategoryRecipe';
import {TranslateService} from '@ngx-translate/core';

@Injectable({
  providedIn: 'root'
})
export class CategoryRecipeFactory {
  constructor(private _translateService: TranslateService) {}

  fromRaw(dto: any): CategoryRecipe {
    const category = CategoryRecipe.fromRaw(dto);

    // Для системных категорий показываем переведенное название
    if (category.system) {
      const translatedName = this._translateService.instant('category.recipe.' + category.name);
      // Используем setName для установки переведенного названия
      category.setName(translatedName);
    }

    return category;
  }
}
