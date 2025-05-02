import {Injectable} from '@angular/core';
import {DexieIndexDbService} from '../db/dexie-index-db.service';
import {CategoryProduct} from '../models/CategoryProduct';
import {Stores} from '@service/db/const/stores';

@Injectable({
  providedIn: 'root'
})
export class CategoryProductsRepository {
  constructor(
    public _indexDbService: DexieIndexDbService,
  ) {
  }

  addOne(product: CategoryProduct) {
    return this._indexDbService.addData(Stores.PRODUCTS_CATEGORIES, product.toDTO(), product.name);
  }

  updateOne(uuid: string, category: CategoryProduct) {
    return this._indexDbService.replaceData(Stores.PRODUCTS_CATEGORIES, uuid, category.toDTO());
  }

  async getOne(
    uuid: string,
  ) {
    return this._indexDbService
      .getOne<CategoryProduct>(Stores.PRODUCTS_CATEGORIES, uuid)
      .then(category => {
        return CategoryProduct.fromRaw(category);
      });
  }

  getAll() {
    return this._indexDbService.getAll<CategoryProduct>(Stores.PRODUCTS_CATEGORIES)
      .then(categories => categories.map(category => CategoryProduct.fromRaw(category)));
  }

  getMany(
    uuids: string[],
  ) {
    return this._indexDbService.getMany<CategoryProduct>(Stores.PRODUCTS_CATEGORIES, uuids)
      .then(categories => categories.map(category => CategoryProduct.fromRaw(category)));
  }

  deleteOne(uuid: string) {
    return this._indexDbService.remove(Stores.PRODUCTS_CATEGORIES, uuid);
  }

  async preloadCategories() {
    const categoriesInstalled = localStorage.getItem('categoriesInstalled');
    if (categoriesInstalled) {
      return;
    }
    const categories = await this.getAll();
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
      ].map((name, index) => CategoryProduct.fromRaw({
        uuid: name,
        name,
      }).toDTO());
      await this._indexDbService.balkAdd(Stores.PRODUCTS_CATEGORIES, defaultCategories, false);
      localStorage.setItem('categoriesInstalled', 'true');
    }
  }

}
