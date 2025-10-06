import {Stores} from '../const/stores';
import {Transaction} from 'dexie';
import {RecipeDTO} from '../../../../features/recipes/service/schemes/Recipe.scheme';
import {UnitValue} from '../../../view/const/units.const';

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
  {
    version: 4,
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
    update: tx => {
      return new Promise(async (resolve) => {
        const recipesTable = tx.table(Stores.RECIPES);
        const recipes = await recipesTable.toArray();

        await Promise.all(recipes.map((recipe: any) => {
          return recipesTable.update(recipe.uuid, {
            portions: recipe.outcome_unit === UnitValue.PIECE && Number(recipe.outcome_amount) > 0
              ? Number(recipe.outcome_amount)
              : 0,
            outcome_unit: undefined,
            outcome_amount: undefined,
          });
        }));

        resolve();
      })
    },
  },

  {
    version: 5,
    schema: {
      [Stores.PRODUCTS]: '++uuid,name,source,brand',
      [Stores.RECIPES]: '++uuid,name,*ingredientsUUIDs',
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
      return new Promise(async (resolve) => {
        const recipesTable = tx.table(Stores.RECIPES);
        const recipes = await recipesTable.toArray();
        const getIngredientsUUIDs = (recipe: any): string[] => {

          const uuids = new Set<string>();
          for (const ingredient of recipe.ingredients) {
            if (ingredient.product_id) {
              uuids.add(ingredient.product_id);
            }
            if (ingredient.recipe_id) {
              uuids.add(ingredient.recipe_id);
            }
          }
          return Array.from(uuids);
        }

        await Promise.all(recipes.map((recipe: any) => {
          return recipesTable.update(recipe.uuid, {
            ingredientsUUIDs: getIngredientsUUIDs(recipe),
          });
        }));

        resolve();
      })
    },
  },
  {
    version: 6,
    schema: {
      [Stores.PRODUCTS]: '++uuid,name,source,brand',
      [Stores.RECIPES]: '++uuid,name,*ingredientsUUIDs',
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
      [Stores.CHANGES_LOG]: '++uuid,entity,entityId,timestamp',
    },
  },
  {
    version: 7,
    schema: {
      [Stores.PRODUCTS]: '++uuid,name,source,brand,cloud_uuid',
      [Stores.RECIPES]: '++uuid,name,*ingredientsUUIDs,cloud_uuid',
      [Stores.PRODUCTS_CATEGORIES]: '++uuid,name,cloud_uuid',
      [Stores.RECIPES_CATEGORIES]: '++uuid,name,cloud_uuid',
      [Stores.INDICES]: '++uuid',
      [Stores.DOCUMENTATION]: '++key',
      [Stores.FAQ]: '++key',
      [Stores.TAGS]: '++name,cloud_uuid',
      [Stores.TAXES]: '++uuid,cloud_uuid',
      [Stores.SETTINGS]: '++key,cloud_uuid',
      [Stores.INVOICES]: '++uuid,cloud_uuid',
      [Stores.CREDENTIALS]: '++uuid,type,cloud_uuid',
      [Stores.CHANGES_LOG]: '++uuid,entity,entityId,timestamp,cloud_uuid',
    },
    update: tx => {
      return new Promise(async (resolve) => {
        const table = tx.table(Stores.PRODUCTS);
        const array = await table.toArray();

        await Promise.all(array.map((item: any) => {
          return table.update(item.uuid, {
            cloud_uuid: '',
          });
        }));

        resolve();
      })
    },
  }
]
