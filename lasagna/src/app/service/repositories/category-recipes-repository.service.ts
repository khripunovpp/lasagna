import {Injectable} from '@angular/core';
import {DexieIndexDbService} from '../db/dexie-index-db.service';
import {CategoryRecipe} from '../models/CategoryRecipe';
import {CategoryRecipeDTO} from '@service/db/shemes/CategoryRecipe.scheme';
import {Stores} from '@service/db/const/stores';

@Injectable({
  providedIn: 'root'
})
export class CategoryRecipesRepository {
  constructor(
    public _indexDbService: DexieIndexDbService,
  ) {
  }

  addCategory(category: CategoryRecipe) {
    return this._indexDbService.addData<CategoryRecipeDTO>(Stores.RECIPES_CATEGORIES, category.toDTO(), category.name);
  }

  editCategory(uuid: string, category: CategoryRecipe) {
    return this._indexDbService.replaceData(Stores.RECIPES_CATEGORIES, uuid, category.toDTO());
  }

  async getOne(
    uuid: string,
  ) {
    return this._indexDbService
      .getOne<CategoryRecipe>(Stores.RECIPES_CATEGORIES, uuid)
      .then(category => {
        return CategoryRecipe.fromRaw(category);
      });
  }


  getCategories() {
    return this._indexDbService.getAll<CategoryRecipe>(Stores.RECIPES_CATEGORIES).then(categories => {
      return categories.map(category => CategoryRecipe.fromRaw(category));
    });
  }

  getManyCategories(
    uuids: string[],
  ) {
    return this._indexDbService.getMany<CategoryRecipe>(Stores.RECIPES_CATEGORIES, uuids)
      .then(categories => {
        return categories.map(category => CategoryRecipe.fromRaw(category));
      })
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
      ].map((name, index) => CategoryRecipe.fromRaw({
        uuid: name,
        name,
      }).toDTO());
      await this._indexDbService.balkAdd(Stores.RECIPES_CATEGORIES, defaultCategories, false);
      localStorage.setItem('categoriesRecipesInstalled', 'true');
    }
  }

}
