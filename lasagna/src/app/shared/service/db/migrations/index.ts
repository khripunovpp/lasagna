import {Stores} from '../const/stores';
import {Transaction} from 'dexie';
import {RecipeDTO} from '../../../../features/recipes/service/Recipe.scheme';

export const migrations: {
  version: number
  schema: Record<any, any>
  update?: (tx: Transaction) => Promise<void>
}[] = [
  {
    version: 1,
    schema: {
      [Stores.PRODUCTS]: '++uuid,name,source',
      [Stores.RECIPES]: '++uuid,name',
      [Stores.PRODUCTS_CATEGORIES]: '++uuid,name',
      [Stores.RECIPES_CATEGORIES]: '++uuid,name',
      [Stores.INDICES]: '++uuid',
      [Stores.DOCUMENTATION]: '++key',
      [Stores.FAQ]: '++key',
      [Stores.TAGS]: '++name',
      [Stores.TAXES]: '++uuid',
      [Stores.SETTINGS]: '++key',
      [Stores.INVOICES]: '++uuid',
      [Stores.CREDENTIALS]: '++uuid,type',
    },
  },
  {
    version: 2,
    schema: {
      [Stores.PRODUCTS]: '++uuid,name,source',
      [Stores.RECIPES]: '++uuid,name',
      [Stores.PRODUCTS_CATEGORIES]: '++uuid,name',
      [Stores.RECIPES_CATEGORIES]: '++uuid,name',
      [Stores.INDICES]: '++uuid',
      [Stores.DOCUMENTATION]: '++key',
      [Stores.FAQ]: '++key',
      [Stores.TAGS]: '++name',
      [Stores.TAXES]: '++uuid',
      [Stores.SETTINGS]: '++key',
      [Stores.INVOICES]: '++uuid',
      [Stores.CREDENTIALS]: '++uuid,type',
    },
    update: tx => {
      // Миграция для установки поля master в false, если оно не установлено
      return new Promise(async (resolve) => {
        const recipesTable = tx.table(Stores.RECIPES);
        const recipes = await recipesTable.toArray();

        await Promise.all(recipes.map((recipe: RecipeDTO) => {
          if (recipe.master == null) {
            return recipesTable.update(recipe.uuid, {master: false});
          }
          return Promise.resolve();
        }));

        resolve();
      })
    }
  },
  {
    version: 3,
    schema: {
      [Stores.PRODUCTS]: '++uuid,name,source,brand',
      [Stores.RECIPES]: '++uuid,name',
      [Stores.PRODUCTS_CATEGORIES]: '++uuid,name',
      [Stores.RECIPES_CATEGORIES]: '++uuid,name',
      [Stores.INDICES]: '++uuid',
      [Stores.DOCUMENTATION]: '++key',
      [Stores.FAQ]: '++key',
      [Stores.TAGS]: '++name',
      [Stores.TAXES]: '++uuid',
      [Stores.SETTINGS]: '++key',
      [Stores.INVOICES]: '++uuid',
      [Stores.CREDENTIALS]: '++uuid,type',
    },
  },
]
