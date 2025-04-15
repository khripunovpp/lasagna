import {Injectable} from '@angular/core';
import {CategoryFormValue} from '../../view/settings/category/add-category/add-category-form.component';
import {DexieIndexDbService} from '../db/dexie-index-db.service';
import {Stores} from '../const/stores';

export interface CategoryRecipe {
  uuid: string
  name: string
}

@Injectable({
  providedIn: 'root'
})
export class CategoryRecipesRepository {
  constructor(
    public _indexDbService: DexieIndexDbService,
  ) {
  }

  addCategory(product: CategoryFormValue) {
    return this._indexDbService.addData(Stores.RECIPES_CATEGORIES, product);
  }

  async getOne(
    uuid: string,
  ) {
    return this._indexDbService.getOne(Stores.RECIPES_CATEGORIES, uuid);
  }


  getCategories() {
    return this._indexDbService.getAll(Stores.RECIPES_CATEGORIES) as Promise<CategoryRecipe[]>;
  }

  getManyCategories(
    uuids: string[],
  ) {
    return this._indexDbService.getMany(Stores.RECIPES_CATEGORIES, uuids);
  }

  editCategory(uuid: string, category: CategoryFormValue) {
    return this._indexDbService.replaceData(Stores.RECIPES_CATEGORIES, uuid, category);
  }

  deleteCategory(uuid: string) {
    return this._indexDbService.remove(Stores.RECIPES_CATEGORIES, uuid);
  }

  async preloadCategories() {
    const categoriesInstalled = localStorage.getItem('categoriesRecipesInstalled');
    if (categoriesInstalled) {
      return;
    }
    const categories = await this.getCategories();
    if (categories.length === 0) {
      const defaultCategories = [
        'Бисквиты',
        'Песочное тесто',
        'Заварное тесто',
        'Слоёное тесто',
        'Дрожжевое тесто',
        'Бриошь и сдоба',
        'Меренги',
        'Кремы',
        'Начинки',
        'Глазури и покрытия',
        'Торты',
        'Пирожные',
        'Кексы и маффины',
        'Чизкейки',
        'Тарты',
        'Макарон',
        'Печенье',
        'Рулеты',
        'Шоколадные изделия',
        'Карамель',
        'Муссы',
        'Панна котта',
        'Желе и конфитюры',
        'Суфле',
        'Десерты в стаканах',
        'Выпечка без глютена',
        'Выпечка без сахара',
        'Веганские десерты',
        'Завтраки',
        'Авторские десерты'
      ].map((name, index) => ({
        uuid: name,
        name,
      }));
      await this._indexDbService.balkAdd(Stores.RECIPES_CATEGORIES, defaultCategories, false);
      localStorage.setItem('categoriesRecipesInstalled', 'true');
    }
  }

}
