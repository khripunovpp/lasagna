import {inject, Injectable} from '@angular/core';
import {CategoryRecipe} from '../settings/service/models/CategoryRecipe';
import {Stores} from '../../shared/service/db/const/stores';
import {CategoryRecipesRepository} from '../settings/service/repositories/category-recipes.repository';
import {CategoryProductsRepository} from '../settings/service/repositories/category-products.repository';
import {DexieIndexDbService} from '../../shared/service/db/dexie-index-db.service';
import {CategoryProduct} from '../settings/service/models/CategoryProduct';
import {Product} from '../products/service/Product';
import {generateUuid} from '../../shared/helpers';
import * as Sentry from '@sentry/angular';

@Injectable({
  providedIn: 'root'
})
export class SetupDefaultsService {
  private readonly _categoryRecipesRepository = inject(CategoryRecipesRepository);
  private readonly _categoryProductsRepository = inject(CategoryProductsRepository);
  private readonly _indexDbService = inject(DexieIndexDbService);

  async setupRecipesCategories() {
    const categoriesInstalled = localStorage.getItem('categoriesRecipesInstalled');
    if (categoriesInstalled) {
      return;
    }
    const categories = await this._categoryRecipesRepository.getLength();
    if (categories) return;

    const defaultCategories = [
      'biscuits',
      'shortcrust-pastry',
      'choux-pastry',
      'puff-pastry',
      'yeast-dough',
      'brioche-sweet-bread',
      'meringues',
      'creams',
      'fillings',
      'glazes-coatings',
      'cakes',
      'pastries',
      'cupcakes-muffins',
      'cheesecakes',
      'tarts',
      'macarons',
      'cookies',
      'rolls',
      'chocolate-products',
      'caramel',
      'mousses',
      'panna-cotta',
      'jellies-jams',
      'souffles',
      'glass-desserts',
      'gluten-free-baking',
      'sugar-free-baking',
      'vegan-desserts',
      'breakfasts',
      'author-desserts'
    ].map((name) => CategoryRecipe.fromRaw({
      uuid: name,
      name,
      system: true,
      createdAt: Date.now(),
    }).toDTO());

    await this._indexDbService.balkAdd(Stores.RECIPES_CATEGORIES, defaultCategories, false);
    localStorage.setItem('categoriesRecipesInstalled', 'true');
  }

  async setupProductsCategories() {
    const categoriesInstalled = localStorage.getItem('categoriesInstalled');
    if (categoriesInstalled) {
      return;
    }
    const categories = await this._categoryProductsRepository.getLength();
    if (categories) return;

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
      createdAt: Date.now(),
    }).toDTO());

    await this._indexDbService.balkAdd(Stores.PRODUCTS_CATEGORIES, defaultCategories, false);
    localStorage.setItem('categoriesInstalled', 'true');
  }

  async setupProducts() {
    const productsInstalled = localStorage.getItem('productsInstalled');
    if (productsInstalled) {
      return;
    }
    const products = await this._indexDbService.getLength(Stores.PRODUCTS);
    if (products) return;

    const categoryMap: Record<string, string> = {
      // creams & fillings
      "heavy-cream-35": "dairy",
      "whipping-cream-30": "dairy",
      "sour-cream": "dairy",
      "cream-cheese": "dairy",

      // dairy powders
      "milk-powder": "dairy",
      "condensed-milk": "dairy",

      // chocolate
      "white-chocolate": "chocolate-cocoa",
      "dark-chocolate": "chocolate-cocoa",
      "milk-chocolate": "chocolate-cocoa",
      "cocoa-powder": "chocolate-cocoa",
      "cocoa-butter": "chocolate-cocoa",

      // nuts & seeds
      "almonds": "nuts-seeds",
      "hazelnuts": "nuts-seeds",
      "walnuts": "nuts-seeds",
      "pistachios": "nuts-seeds",
      "cashews": "nuts-seeds",
      "sunflower-seeds": "nuts-seeds",
      "pumpkin-seeds": "nuts-seeds",
      "sesame-seeds": "nuts-seeds",

      // gelling agents
      "gelatin-powder": "gelling-agents",
      "agar-agar": "gelling-agents",
      "pectin": "gelling-agents",

      // flours & starches
      "corn-starch": "flour-starches",
      "potato-starch": "flour-starches",
      "rice-flour": "flour-starches",
      "almond-flour": "flour-starches",
      "coconut-flour": "flour-starches",
      "all-purpose-flour": "flour-starches",
      "bread-flour": "flour-starches",

      // sugars & sweeteners
      "sugar": "sweeteners",
      "brown-sugar": "sweeteners",
      "powdered-sugar": "sweeteners",
      "invert-sugar": "sweeteners",
      "glucose-syrup": "sweeteners",
      "honey": "sweeteners",
      "maple-syrup": "sweeteners",
      "corn-syrup": "sweeteners",
      "golden-syrup": "sweeteners",

      // salt
      "salt": "salt",
      "sea-salt": "salt",

      // leavening & stabilizers
      "baking-powder": "leavening-stabilizers",
      "baking-soda": "leavening-stabilizers",
      "dry-yeast": "leavening-stabilizers",
      "fresh-yeast": "leavening-stabilizers",
      "cream-of-tartar": "leavening-stabilizers",
      "xanthan-gum": "leavening-stabilizers",
      "guar-gum": "leavening-stabilizers",
      "stabilizer-pastry": "leavening-stabilizers",

      // additives
      "lecithin": "confectionery-additives",

      // flavors & spices
      "vanilla-pod": "flavors-spices",
      "vanilla-extract": "flavors-spices",
      "vanillin": "flavors-spices",
      "cinnamon": "flavors-spices",
      "nutmeg": "flavors-spices",
      "cloves": "flavors-spices",
      "cardamom": "flavors-spices",
      "ginger-powder": "flavors-spices",

      // fruits & berries
      "fruit-puree-raspberry": "fruit-berry",
      "fruit-puree-strawberry": "fruit-berry",
      "fruit-puree-mango": "fruit-berry",
      "fruit-puree-passion-fruit": "fruit-berry",
      "fruit-puree-apricot": "fruit-berry",
      "fruit-puree-cherry": "fruit-berry",
      "frozen-berries-mix": "frozen-semi-finished",
      "candied-fruits": "fruit-berry",
      "orange-zest": "fruit-berry",
      "lemon-zest": "fruit-berry",

      // liqueurs & beverages
      "liqueur-cointreau": "beverages-liqueurs",
      "liqueur-rum": "beverages-liqueurs",
      "liqueur-kahlua": "beverages-liqueurs",
      "liqueur-amaretto": "beverages-liqueurs",
      "liqueur-grand-marnier": "beverages-liqueurs",
      "espresso-coffee": "beverages-liqueurs",
      "matcha-powder": "beverages-liqueurs",
      "instant-coffee": "beverages-liqueurs",

      // eggs
      "egg-whites": "eggs-egg-products",
      "egg-yolks": "eggs-egg-products",
      "whole-eggs": "eggs-egg-products",
      "dried-egg-powder": "eggs-egg-products",

      // marzipan & almond products
      "almond-paste": "nuts-seeds",
      "marzipan": "nuts-seeds",

      // decorations
      "isomalt": "decorations",
      "fondant": "decorations",
      "sprinkles": "decorations",
      "colored-sugar": "decorations",
      "food-coloring-gel": "decorations",
      "edible-gold": "decorations",
      "wafer-paper": "decorations",
      "chocolate-transfer-sheet": "decorations",

      // baking forms & consumables
      "molds-silicone": "baking-forms",
      "baking-paper": "baking-forms",
      "acetate-sheet": "baking-forms",
    };

    const defaultProducts = Object.keys(categoryMap).map((name) => Product.fromRaw({
      uuid: name,
      name,
      category_id: categoryMap[name],
      system: true,
      createdAt: Date.now(),
    }).toDTO());

    await this._indexDbService.balkAdd(Stores.PRODUCTS, defaultProducts, false);
    localStorage.setItem('productsInstalled', 'true');
  }

  async setUserUUID() {
    let userUUID = localStorage.getItem('userUUID');
    if (!userUUID) {
      userUUID = generateUuid();
      localStorage.setItem('userUUID', userUUID);
    }
  }
}
