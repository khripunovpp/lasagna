import {Page} from "@playwright/test";
import {Stores} from '../../src/app/shared/service/db/const/stores';
import {CategoryProduct} from '../../src/app/features/settings/service/models/CategoryProduct';
import {CategoryRecipe} from '../../src/app/features/settings/service/models/CategoryRecipe';

/**
 * Помощник для записи данных в IndexedDB
 * @param page
 * @param dbName
 * @param storeName
 * @param items
 */
export const putDbItems = async (
  page: Page,
  dbName: string,
  storeName: string,
  items: unknown[],
): Promise<any> => {
  await page.evaluate(
    (args) => {
      const [db, storeKey, objects] = args as [string, string, unknown[]];

      return new Promise((resolve, reject) => {
        const request = indexedDB.open(db);
        request.onerror = () => reject(request.error);
        request.onsuccess = () => {
          const db = request.result;
          const transaction = db.transaction(storeKey, "readwrite");
          const store = transaction.objectStore(storeKey);
          objects.forEach((item) => store.put(item));
          transaction.oncomplete = () => {
            console.log(`All items have been added to the store ${storeKey} in database ${db}`);
            console.log({
              db,
              storeKey,
              itemsCount: objects.length,
            })


            // check added items
            const checkTransaction = db.transaction(storeKey, "readonly");
            const checkStore = checkTransaction.objectStore(storeKey);
            const getAllRequest = checkStore.getAll();
            getAllRequest.onsuccess = () => {
              for (const item of getAllRequest.result) {
                console.log(`Item in store ${storeKey}:`, JSON.stringify(item));
              }

              console.log(`Total items in store ${storeKey}:`, getAllRequest.result.length);

            resolve(null);
            };
            getAllRequest.onerror = () => {
              console.error(`Failed to retrieve items from the store ${storeKey}:`, getAllRequest.error);
              reject(getAllRequest.error);
            };
          }
          transaction.onerror = () => reject(transaction.error);
        };
      });
    },
    [dbName, storeName, items],
  );
}

export const logDb = async (
  page: Page,
  dbName: string,
  tablesNames?: string[],
): Promise<any> => {
  await page.evaluate(
    (args) => {
      const [db, tables] = args as [string, string[] | undefined];
      const request = indexedDB.open(db);
      request.onerror = () => console.error('Failed to open database:', request.error);
      request.onsuccess = () => {
        const db = request.result;
        const objectStoreNames = tables && tables.length > 0 ? tables : Array.from(db.objectStoreNames);

        objectStoreNames.forEach((storeName) => {
          const transaction = db.transaction(storeName, "readonly");
          const store = transaction.objectStore(storeName);
          const getAllRequest = store.getAll();
          getAllRequest.onsuccess = () => {
            console.log(`--- Items in store ${storeName} ---`);
            for (const item of getAllRequest.result) {
              console.log(`Item in store ${storeName}:`, JSON.stringify(item));
            }

            console.log(`Total items in store ${storeName}:`, getAllRequest.result.length);
          };
          getAllRequest.onerror = () => {
            console.error(`Failed to retrieve items from the store ${storeName}:`, getAllRequest.error);
          };
        });
      }
    },
    [dbName, tablesNames]
  );
}

/**
 * Заполнение категорий продуктов и рецептов. Названия обязетльно нужно начинать с буквы "А"
 * для того чтобы в списке они отображались первыми
 * @param page
 */
export async function seedCategories(page: Page) {
  await putDbItems(page, 'lasagna-db', Stores.PRODUCTS_CATEGORIES, [
    CategoryProduct.fromRaw({
      name: categoryProductAlphaName,
      uuid: categoryProductAlphaId,
      createdAt: Date.now(),
    }).toDTO(),
  ]);

  await putDbItems(page, 'lasagna-db', Stores.RECIPES_CATEGORIES, [
    CategoryRecipe.fromRaw({
      name: categoryRecipeAlphaName,
      uuid: categoryRecipeAlphaId,
      createdAt: Date.now(),
    }).toDTO(),
  ]);
}

export const categoryProductAlphaId = 'alpha-category-id';
export const categoryProductAlphaName = 'Alpha Category';
export const categoryRecipeAlphaId = 'alpha-recipe-category-id';
export const categoryRecipeAlphaName = 'Alpha Recipe Category';

export async function seedProducts(page: Page, products: unknown[]) {
  await putDbItems(page, 'lasagna-db', Stores.PRODUCTS, products);
}

export async function getDbVersion(page: Page, dbName: string): Promise<number> {
  return await page.evaluate(
    (name) => {
      return new Promise<number>((resolve, reject) => {
        const request = indexedDB.open(name);
        request.onerror = () => reject(request.error);
        request.onsuccess = () => {
          const db = request.result;
          const version = db.version;
          resolve(version);
        };
      });
    },
    dbName,
  );
}
