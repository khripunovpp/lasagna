import {Stores} from '../../const/stores';
import {Transaction} from 'dexie';

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
      [Stores.RECIPES]: '++uuid,name',
      [Stores.PRODUCTS_CATEGORIES]: '++uuid,name',
      [Stores.RECIPES_CATEGORIES]: '++uuid,name',
    },
  }
]
