import {Stores} from '../const/stores';
import {Transaction} from 'dexie';
import {ProductDTO} from '../../../../features/products/service/Product.scheme';
import {CategoryProductDTO} from '../shemes/CategoryProduct.scheme';

export const migrations: {
  version: number
  schema: Record<any, any>
  update?: (tx: Transaction) => Promise<void>
}[] = [
  {
    version: 1,
    schema: {
      [Stores.PRODUCTS]: '++uuid,name',
      [Stores.RECIPES]: '++uuid,name',
      [Stores.CATEGORIES]: '++uuid,name',
    },
  },
  {
    version: 2,
    schema: {
      [Stores.PRODUCTS]: '++uuid,name',
      [Stores.RECIPES]: '++uuid,name',
      [Stores.CATEGORIES]: '++uuid,name',
      [Stores.PRODUCTS_CATEGORIES]: '++uuid,name',
    },
    update: tx => {
      return new Promise(async (resolve) => {
        const old = await tx.table(Stores.CATEGORIES).toArray();
        const newTable = tx.table(Stores.PRODUCTS_CATEGORIES);
        await Promise.all(old.map((item: any) => newTable.add(item)));
        await tx.table(Stores.CATEGORIES).clear(); // optionally clear old table
      })
    }
  },
  {
    version: 3,
    schema: {
      [Stores.PRODUCTS]: '++uuid,name',
      [Stores.RECIPES]: '++uuid,name',
      [Stores.PRODUCTS_CATEGORIES]: '++uuid,name',
      [Stores.RECIPES_CATEGORIES]: '++uuid,name',
    },
  },
  {
    version: 4,
    schema: {
      [Stores.PRODUCTS]: '++uuid,name',
      [Stores.RECIPES]: '++uuid,name',
      [Stores.PRODUCTS_CATEGORIES]: '++uuid,name',
      [Stores.RECIPES_CATEGORIES]: '++uuid,name',
    },
  },
  {
    version: 5,
    schema: {
      [Stores.PRODUCTS]: '++uuid,name',
      [Stores.RECIPES]: '++uuid,name',
      [Stores.PRODUCTS_CATEGORIES]: '++uuid,name',
      [Stores.RECIPES_CATEGORIES]: '++uuid,name',
    },
    update: tx => {
      // rename some categoies and add new ones in the same table
      return new Promise(async (resolve) => {
        const newCategories = [
          {uuid: 'Уксусы', name: 'Уксусы'},
        ];
        const categoriesToDelete = [
          'Сиропы и пропитки',
        ];
        const renameCategories = [
          {old: 'Разрыхлители и стабилизаторы', new: 'Разрыхлители и соды'},
        ];

        const categoriesTable = tx.table(Stores.PRODUCTS_CATEGORIES);
        const categories = await categoriesTable.toArray();
        const categoriesToDeleteUuids = categories.filter((item: any) => categoriesToDelete.includes(item.name)).map((item: any) => item.uuid);
        const categoriesToRename = categories.filter((item: any) => renameCategories.map(item => item.old).includes(item.name));

        await Promise.all(categoriesToRename.map((item: any) => {
          const newName = renameCategories.find((i) => i.old === item.name)?.new;
          return categoriesTable.update(item.uuid, {name: newName});
        }));

        await Promise.all(categoriesToDeleteUuids.map((uuid: string) => categoriesTable.delete(uuid)));

        await Promise.all(newCategories.map((item: any) => categoriesTable.add(item)));
      })
    }
  },
  {
    version: 6,
    schema: {
      [Stores.PRODUCTS]: '++uuid,name',
      [Stores.RECIPES]: '++uuid,name,source',
      [Stores.PRODUCTS_CATEGORIES]: '++uuid,name',
      [Stores.RECIPES_CATEGORIES]: '++uuid,name',
    },
  },
  {
    version: 7,
    schema: {
      [Stores.PRODUCTS]: '++uuid,name,source',
      [Stores.RECIPES]: '++uuid,name,source',
      [Stores.PRODUCTS_CATEGORIES]: '++uuid,name,color,system',
      [Stores.RECIPES_CATEGORIES]: '++uuid,name,system',
    },
    update: tx => {
      return new Promise(async (resolve) => {
        // Добавляем флаг system к существующим категориям продуктов
        const productCategoriesTable = tx.table(Stores.PRODUCTS_CATEGORIES);
        const productCategories = await productCategoriesTable.toArray();

        await Promise.all(productCategories.map((category: any) => {
          if (category.system === undefined) {
            return productCategoriesTable.update(category.uuid, { system: false });
          }
          return Promise.resolve();
        }));

        // Добавляем флаг system к существующим категориям рецептов
        const recipeCategoriesTable = tx.table(Stores.RECIPES_CATEGORIES);
        const recipeCategories = await recipeCategoriesTable.toArray();

        await Promise.all(recipeCategories.map((category: any) => {
          if (category.system === undefined) {
            return recipeCategoriesTable.update(category.uuid, { system: false });
          }
          return Promise.resolve();
        }));

        resolve();
      })
    }
  },
  // migrate categories to new format
  // uuid should replced with the same as name
  // also update products and recipes with the new categories
  {
    version: 8,
    schema: {
      [Stores.PRODUCTS]: '++uuid,name,source',
      [Stores.RECIPES]: '++uuid,name',
      [Stores.PRODUCTS_CATEGORIES]: '++uuid,name,color,system',
      [Stores.RECIPES_CATEGORIES]: '++uuid,name,system',
    },
    update: tx => {
      const tables = [
        Stores.PRODUCTS,
        Stores.RECIPES,
        Stores.PRODUCTS_CATEGORIES,
        Stores.RECIPES_CATEGORIES,
      ];
      return Promise.all([
        new Promise<void>(async (resolve) => {
          const categoriesTable = tx.table<CategoryProductDTO>(Stores.PRODUCTS_CATEGORIES);
          const categories = await categoriesTable.toArray();
          const productsTable = tx.table<ProductDTO>(Stores.PRODUCTS);
          const products = await productsTable.toArray();

          // first update products with the new uuid
          await Promise.all(products.map((item: any) => {
            const category = categories.find((i) => i.uuid === item.category_id);
            if (category) {
              return productsTable.update(item.uuid, {category_id: category.name});
            }
            return Promise.resolve();
          }));

          // update categories with the new uuid
          await Promise.all(categories.map((item: any) => {
            return categoriesTable.update(item.uuid, {uuid: item.name});
          }));

          resolve();
        }),

        new Promise<void>(async (resolve) => {
          const categoriesTable = tx.table<CategoryProductDTO>(Stores.RECIPES_CATEGORIES);
          const categories = await categoriesTable.toArray();
          const recipesTable = tx.table<ProductDTO>(Stores.RECIPES);
          const recipes = await recipesTable.toArray();

          // first update recipes with the new categories
          await Promise.all(recipes.map((item: any) => {
            const category = categories.find((i) => i.uuid === item.category_id);
            if (category) {
              return recipesTable.update(item.uuid, {category_id: category.name});
            }
            return Promise.resolve();
          }));

          // update categories with the new uuid
          await Promise.all(categories.map((item: any) => {
            return categoriesTable.update(item.uuid, {uuid: item.name});
          }));

          resolve();
        }),
      ]).then(() => {
      })
    }
  },
  {
    version: 9,
    schema: {
      [Stores.PRODUCTS]: '++uuid,name,source',
      [Stores.RECIPES]: '++uuid,name',
      [Stores.PRODUCTS_CATEGORIES]: '++uuid,name',
      [Stores.RECIPES_CATEGORIES]: '++uuid,name',
      [Stores.INDICES]: '++uuid',
    },
  },
  {
    version: 10,
    schema: {
      [Stores.PRODUCTS]: '++uuid,name,source',
      [Stores.RECIPES]: '++uuid,name',
      [Stores.PRODUCTS_CATEGORIES]: '++uuid,name',
      [Stores.RECIPES_CATEGORIES]: '++uuid,name',
      [Stores.INDICES]: '++uuid',
      [Stores.DOCUMENTATION]: '++key',
    },
  },
  {
    version: 11,
    schema: {
      [Stores.PRODUCTS]: '++uuid,name,source',
      [Stores.RECIPES]: '++uuid,name',
      [Stores.PRODUCTS_CATEGORIES]: '++uuid,name',
      [Stores.RECIPES_CATEGORIES]: '++uuid,name',
      [Stores.INDICES]: '++uuid',
      [Stores.DOCUMENTATION]: '++key',
      [Stores.TAGS]: '++name',
    },
  },
  {
    version: 12,
    schema: {
      [Stores.PRODUCTS]: '++uuid,name,source',
      [Stores.RECIPES]: '++uuid,name',
      [Stores.PRODUCTS_CATEGORIES]: '++uuid,name',
      [Stores.RECIPES_CATEGORIES]: '++uuid,name',
      [Stores.INDICES]: '++uuid',
      [Stores.DOCUMENTATION]: '++key',
      [Stores.TAGS]: '++name',
      [Stores.TAXES]: '++uuid',
    },
  },
  {
    version: 13,
    schema: {
      [Stores.PRODUCTS]: '++uuid,name,source',
      [Stores.RECIPES]: '++uuid,name',
      [Stores.PRODUCTS_CATEGORIES]: '++uuid,name',
      [Stores.RECIPES_CATEGORIES]: '++uuid,name',
      [Stores.INDICES]: '++uuid',
      [Stores.DOCUMENTATION]: '++key',
      [Stores.TAGS]: '++name',
      [Stores.TAXES]: '++uuid',
      [Stores.SETTINGS]: '++key',
    },
  },
  {
    version: 14,
    schema: {
      [Stores.PRODUCTS]: '++uuid,name,source',
      [Stores.RECIPES]: '++uuid,name',
      [Stores.PRODUCTS_CATEGORIES]: '++uuid,name',
      [Stores.RECIPES_CATEGORIES]: '++uuid,name',
      [Stores.INDICES]: '++uuid',
      [Stores.DOCUMENTATION]: '++key',
      [Stores.TAGS]: '++name',
      [Stores.TAXES]: '++uuid',
      [Stores.SETTINGS]: '++key',
      [Stores.INVOICES]: '++uuid',
    },
  },
  {
    version: 15,
    schema: {
      [Stores.PRODUCTS]: '++uuid,name,source',
      [Stores.RECIPES]: '++uuid,name',
      [Stores.PRODUCTS_CATEGORIES]: '++uuid,name',
      [Stores.RECIPES_CATEGORIES]: '++uuid,name',
      [Stores.INDICES]: '++uuid',
      [Stores.DOCUMENTATION]: '++key',
      [Stores.TAGS]: '++name',
      [Stores.TAXES]: '++uuid',
      [Stores.SETTINGS]: '++key',
      [Stores.INVOICES]: '++uuid',
      [Stores.CREDENTIALS]: '++uuid',
    },
  },
  {
    version: 16,
    schema: {
      [Stores.PRODUCTS]: '++uuid,name,source',
      [Stores.RECIPES]: '++uuid,name',
      [Stores.PRODUCTS_CATEGORIES]: '++uuid,name',
      [Stores.RECIPES_CATEGORIES]: '++uuid,name',
      [Stores.INDICES]: '++uuid',
      [Stores.DOCUMENTATION]: '++key',
      [Stores.TAGS]: '++name',
      [Stores.TAXES]: '++uuid',
      [Stores.SETTINGS]: '++key',
      [Stores.INVOICES]: '++uuid',
      [Stores.CREDENTIALS]: '++uuid,type',
    },
  },
  {
    version: 17,
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
]
