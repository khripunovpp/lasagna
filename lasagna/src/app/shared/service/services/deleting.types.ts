import {z} from 'zod';
import {Stores} from '../db/const/stores';
import {DeleteRecordScheme} from '../db/shemes/DeleteRecord.scheme';

export type DeleteRecord = z.infer<typeof DeleteRecordScheme>;

export enum DeletingKey {
  products = 'products',
  recipes = 'recipes',
}

export const tablToDeletingKeyMap: Partial<Record<Stores, DeletingKey>> = {
  [Stores.PRODUCTS]: DeletingKey.products,
  [Stores.RECIPES]: DeletingKey.recipes,
};

export const deletingKeyToTableMap: Partial<Record<DeletingKey, Stores>> = {
  [DeletingKey.products]: Stores.PRODUCTS,
  [DeletingKey.recipes]: Stores.RECIPES,
};

export type DeletedRecordView = {
  record: DeleteRecord,
  model: any | null,
  data: any | null,
  isExpired: boolean,
};
