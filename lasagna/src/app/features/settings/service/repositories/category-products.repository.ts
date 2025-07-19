import {Injectable} from '@angular/core';
import {DexieIndexDbService} from '../../../../shared/service/db/dexie-index-db.service';
import {Stores} from '../../../../shared/service/db/const/stores';
import {CategoryProduct} from '../models/CategoryProduct';
import {CategoryProductDTO} from '../../../../shared/service/db/shemes/CategoryProduct.scheme';
import {CategoryProductFactory} from '../factories/category-product.factory';

@Injectable({
  providedIn: 'root'
})
export class CategoryProductsRepository {
  constructor(
    public _indexDbService: DexieIndexDbService,
    private _categoryProductFactory: CategoryProductFactory,
  ) {
  }

  addOne(product: CategoryProduct) {
    return this._indexDbService.addData(Stores.PRODUCTS_CATEGORIES, product.toDTO(), product.name);
  }

  updateOne(uuid: string, category: CategoryProduct) {
    if (category.system) {
      category.system = false;
    }
    return this._indexDbService.replaceData(Stores.PRODUCTS_CATEGORIES, uuid, category.toDTO());
  }

  async getOne(
    uuid: string,
  ) {
    return this._indexDbService
      .getOne<CategoryProductDTO>(Stores.PRODUCTS_CATEGORIES, uuid)
      .then(category => {
        return this._categoryProductFactory.fromRaw(category);
      });
  }

  getAll() {
    return this._indexDbService.getAll<CategoryProduct>(Stores.PRODUCTS_CATEGORIES)
      .then(categories => categories.map(category => this._categoryProductFactory.fromRaw(category)));
  }

  getMany(
    uuids: string[],
  ) {
    return this._indexDbService.getMany<CategoryProduct>(Stores.PRODUCTS_CATEGORIES, uuids)
      .then(categories => categories.map(category => this._categoryProductFactory.fromRaw(category)));
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
        "creams-fillings",
        "glazes-coatings",
        "syrups-soaking",
        "fruit-berry",
        "nuts-seeds",
        "chocolate-cocoa",
        "flour-starches",
        "sweeteners",
        "fats-oils",
        "eggs-egg-products",
        "dairy",
        "flavors-spices",
        "leavening-stabilizers",
        "gelling-agents",
        "decorations",
        "baking-forms",
        "confectionery-additives",
        "gluten-free",
        "vegan-alternatives",
        "dietary-low-calorie",
        "frozen-semi-finished",
        "beverages-liqueurs",
        "vegetables",
        "pasta",
        "salt"
      ].map((name) => CategoryProduct.fromRaw({
        uuid: name,
        name,
        system: true,
      }).toDTO());
      await this._indexDbService.balkAdd(Stores.PRODUCTS_CATEGORIES, defaultCategories, false);
      localStorage.setItem('categoriesInstalled', 'true');
    }
  }

}
