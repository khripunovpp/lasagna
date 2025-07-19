import {Injectable} from '@angular/core';
import {CategoryProduct} from '../models/CategoryProduct';
import {TranslateService} from '@ngx-translate/core';

@Injectable({
  providedIn: 'root'
})
export class CategoryProductFactory {
  constructor(private _translateService: TranslateService) {}

  fromRaw(dto: any): CategoryProduct {
    const category = CategoryProduct.fromRaw(dto);

    // Для системных категорий показываем переведенное название
    if (category.system) {
      const translatedName = this._translateService.instant('category.product.' + category.name);
      // Используем setName для установки переведенного названия
      category.setName(translatedName);
    }

    return category;
  }
}
