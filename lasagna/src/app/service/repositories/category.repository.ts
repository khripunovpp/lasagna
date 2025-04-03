import {Injectable} from '@angular/core';
import {CategoryFormValue} from '../../view/category/add-category/add-category-form.component';
import {DexieIndexDbService} from '../services/dexie-index-db.service';
import {Stores} from '../const/stores';

export interface Category {
  uuid: string
  name: string
}

@Injectable({
  providedIn: 'root'
})
export class CategoryRepository {
  constructor(
    public _indexDbService: DexieIndexDbService,
  ) {
  }

  addCategory(product: CategoryFormValue) {
    return this._indexDbService.addData(Stores.CATEGORIES, product);
  }

  async getOne(
    uuid: string,
  ) {
    return this._indexDbService.getOne(Stores.CATEGORIES, uuid);
  }


  getCategories() {
    return this._indexDbService.getAll(Stores.CATEGORIES) as Promise<Category[]>;
  }

  getManyCategories(
    uuids: string[],
  ) {
    return this._indexDbService.getMany(Stores.CATEGORIES, uuids);
  }

  editCategory(uuid: string, category: CategoryFormValue) {
    return this._indexDbService.replaceData(Stores.CATEGORIES, uuid, category);
  }

  deleteCategory(uuid: string) {
    return this._indexDbService.remove(Stores.CATEGORIES, uuid);
  }

  async preloadCategories() {
    const categoriesInstalled = localStorage.getItem('categoriesInstalled');
    if (categoriesInstalled) {
      return;
    }
    const categories = await this.getCategories();
    if (categories.length === 0) {
      const defaultCategories = [
        'Молочные продукты', 'Мясо', 'Рыба и морепродукты', 'Овощи', 'Фрукты',
        'Зелень', 'Яйца', 'Крупы и злаки', 'Макаронные изделия', 'Мука',
        'Сахар и сладости', 'Мед', 'Орехи и семена', 'Бобовые', 'Грибы',
        'Масла и жиры', 'Специи и приправы', 'Соусы и уксусы', 'Консервы',
        'Замороженные продукты', 'Напитки безалкогольные', 'Кофе и чай',
        'Алкогольные напитки', 'Хлеб и выпечка', 'Мясные изделия (колбасы, ветчина)',
        'Сыры', 'Фастфуд и полуфабрикаты', 'Диетические продукты',
        'Детское питание', 'Супы и бульоны'
      ].map((name, index) => ({id: index + 1, name}));

      await this._indexDbService.balkAdd(Stores.CATEGORIES, defaultCategories);
      localStorage.setItem('categoriesInstalled', 'true');
    }
  }

}
