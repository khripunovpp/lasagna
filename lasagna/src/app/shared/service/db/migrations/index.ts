import {Stores} from '../const/stores';
import {Transaction} from 'dexie';
import {RecipeDTO} from '../../../../features/recipes/service/schemes/Recipe.scheme';
import {UnitValue} from '../../../view/const/units.const';

export const migrations: {
  version: number
  schema: Record<any, any>
  update?: (tx: Transaction) => Promise<void>
}[] = [
  // Начальная версия базы данных
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
  // Миграция для установки поля master в false, если оно не установлено
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
  // Добавление brand в продукты
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
  // Упразднение outcome_amount и outcome_unit на portions
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
  // Добавление ingredientsUUIDs в рецепты для оптимизации поиска по ингредиентам
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
  // Добавление CHANGES_LOG для отслеживания изменений
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
  // Добавление cloud_uuid для синхронизации с облаком
  // Инициализация cloud_uuid пустой строкой для всех существующих записей
  // Создание хранилища удаленных элементов для синхронизации удалений с облаком
  {
    version: 7,
    schema: {
      [Stores.PRODUCTS]: '++uuid,name,source,brand,cloud_uuid,deleted',
      [Stores.RECIPES]: '++uuid,name,*ingredientsUUIDs,cloud_uuid,deleted',
      [Stores.PRODUCTS_CATEGORIES]: '++uuid,name,cloud_uuid,deleted',
      [Stores.RECIPES_CATEGORIES]: '++uuid,name,cloud_uuid,deleted',
      [Stores.INDICES]: '++uuid,deleted',
      [Stores.DOCUMENTATION]: '++key,deleted',
      [Stores.FAQ]: '++key,deleted',
      [Stores.TAGS]: '++name,cloud_uuid,deleted',
      [Stores.TAXES]: '++uuid,cloud_uuid,deleted',
      [Stores.SETTINGS]: '++key,cloud_uuid,deleted',
      [Stores.INVOICES]: '++uuid,cloud_uuid,deleted',
      [Stores.CREDENTIALS]: '++uuid,type,cloud_uuid,deleted',
      [Stores.CHANGES_LOG]: '++uuid,entity,entityId,timestamp,cloud_uuid,deleted',
      [Stores.DELETES_STORE]: '++uuid,entity,entityId,timestamp,deleted',
    },
    update: tx => {
      const setupDefaults = (tableName: Stores) => {
        return new Promise<void>(async (resolve) => {
          const table = tx.table(tableName);
          const array = await table.toArray();

          await Promise.all(array.map((item: any) => {
            return table.update(item.uuid, {
              cloud_uuid: '',
              syncedAt: 0,
              deleted: 0,
              deletedAt: 0,
            });
          }));

          resolve();
        })
      };
      return new Promise(async (resolve) => {
        await setupDefaults(Stores.PRODUCTS);
        await setupDefaults(Stores.RECIPES);
        await setupDefaults(Stores.PRODUCTS_CATEGORIES);
        await setupDefaults(Stores.RECIPES_CATEGORIES);
        await setupDefaults(Stores.TAGS);
        await setupDefaults(Stores.TAXES);
        await setupDefaults(Stores.SETTINGS);
        await setupDefaults(Stores.INVOICES);
        await setupDefaults(Stores.CREDENTIALS);
        await setupDefaults(Stores.CHANGES_LOG);
        resolve();
      })
    },
  },
]
