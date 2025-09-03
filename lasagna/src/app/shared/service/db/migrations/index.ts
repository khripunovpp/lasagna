import {Stores} from '../const/stores';
import {Transaction} from 'dexie';

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
  }
]
