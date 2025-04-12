import {Injectable} from '@angular/core';
import {CategoryFormValue} from '../../view/settings/category/add-category/add-category-form.component';
import {DexieIndexDbService} from '../db/dexie-index-db.service';
import {Stores} from '../const/stores';

export interface CategoryProduct {
  uuid: string
  name: string
}

@Injectable({
  providedIn: 'root'
})
export class CategoryProductsRepository {
  constructor(
    public _indexDbService: DexieIndexDbService,
  ) {
  }

  addCategory(product: CategoryFormValue) {
    return this._indexDbService.addData(Stores.PRODUCTS_CATEGORIES, product);
  }

  async getOne(
    uuid: string,
  ) {
    return this._indexDbService.getOne(Stores.PRODUCTS_CATEGORIES, uuid);
  }


  getCategories() {
    return this._indexDbService.getAll(Stores.PRODUCTS_CATEGORIES) as Promise<CategoryProduct[]>;
  }

  getManyCategories(
    uuids: string[],
  ) {
    return this._indexDbService.getMany(Stores.PRODUCTS_CATEGORIES, uuids);
  }

  editCategory(uuid: string, category: CategoryFormValue) {
    return this._indexDbService.replaceData(Stores.PRODUCTS_CATEGORIES, uuid, category);
  }

  deleteCategory(uuid: string) {
    return this._indexDbService.remove(Stores.PRODUCTS_CATEGORIES, uuid);
  }

  async preloadCategories() {
    const categoriesInstalled = localStorage.getItem('categoriesInstalled');
    if (categoriesInstalled) {
      return;
    }
    const categories = await this.getCategories();
    if (categories.length === 0) {
      const defaultCategories = [
        "Кремы и начинки",
        "Глазури и покрытия",
        "Сиропы и пропитки",
        "Фруктовые и ягодные компоненты",
        "Орехи и семена",
        "Шоколад и какао-продукты",
        "Мука и крахмалы",
        "Подсластители (сахар, мед, сиропы)",
        "Жиры и масла",
        "Яйца и яичные продукты",
        "Молочные продукты",
        "Ароматизаторы и специи",
        "Разрыхлители и стабилизаторы",
        "Желирующие вещества (агар, желатин, пектин)",
        "Украшения и декор",
        "Формы для выпечки и инвентарь",
        "Кондитерские добавки и эмульгаторы",
        "Безглютеновые ингредиенты",
        "Веганские и растительные альтернативы",
        "Диетические и низкокалорийные продукты",
        "Замороженные и полуфабрикаты",
        "Напитки и ликеры для десертов",
        "Овощи",
        "Пасты",
        "Соль"
      ].map((name, index) => ({
        uuid: '' + index,
        name,
      }));
      await this._indexDbService.balkAdd(Stores.PRODUCTS_CATEGORIES, defaultCategories, false);
      localStorage.setItem('categoriesInstalled', 'true');
    }
  }

}
