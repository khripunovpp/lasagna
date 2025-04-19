import {Injectable} from '@angular/core';
import Dexie, {Table} from 'dexie';
import {Stores} from '../const/stores';
import {migrations} from './migrations';
import {generateUuid} from '../../helpers/attribute.helper';
import {FlexsearchIndexService} from './flexsearch-index.service';

@Injectable({
  providedIn: 'root'
})
export class DexieIndexDbService extends Dexie {
  constructor(
    private flexsearchIndexService: FlexsearchIndexService
  ) {
    super('lasagna-db');

    const seen = new Set();
    for (const migration of migrations) {
      if (seen.has(migration.version)) {
        throw new Error(`Duplicate migration version: ${migration.version}`);
      }
      seen.add(migration.version);
      const schema = this.version(migration.version).stores(migration.schema);
      if (migration.update) {
        schema.upgrade(migration.update);
      }
      console.log(`Migration ${migration.version} applied`);
    }
    setTimeout(() => {
      this.initIndexes();
    });
  }

  productsStore!: Table<any, string>;
  recipesStore!: Table<any, string>;
  categoryStore!: Table<any, string>;

  initIndexes(): Promise<void> {
    return Promise.all([
      this.initIndex(Stores.PRODUCTS),
      this.initIndex(Stores.RECIPES),
      this.initIndex(Stores.PRODUCTS_CATEGORIES),
      this.initIndex(Stores.RECIPES_CATEGORIES),
    ]).then(() => {

    });
  }

  async initIndex(table: string): Promise<void> {
    await this.flexsearchIndexService.initIndex(this.getStore(table as Stores), table, ['name']);
    const indexData = await this.getOne(Stores.INDICES, table);

    if (indexData) {
      console.log('Index loaded:', table, indexData);
      await this.flexsearchIndexService.importIndex(table, indexData.indexData);
    } else {
      console.log('No index found for table:', table);
      await this.getAll(table as Stores).then(async (data) => {
        for (const item of data) {
          await this.flexsearchIndexService.addToIndex(table, item);
        }
        console.log('Index created for table:', table);
      });

      await this.saveIndex(table);
    }

    // await this.saveIndex(table);
  }

  async saveIndex(table: string) {
    try {
      const indexData = this.flexsearchIndexService.getIndex(table);
      if (!indexData) {
        console.error('No index data found for table:', table);
        return;
      } else {
        const data = await this.flexsearchIndexService.exportIndex(table);
        await this.replaceData(Stores.INDICES, table, {
          table,
          indexData: data,
        });
      }
    } catch (error) {
      console.error('Error saving index:', error);
      throw error;
    }
  }


  async loadIndex(table: string) {
    const indexData = await this.filter(Stores.INDICES, 'table', table, true);

    console.log('Index data:', indexData);

    if (indexData?.[0]) {
      return indexData[0].indexData;
    }
    return null;
  }

  async addData(storeKey: Stores, value: any, customUUID?: string): Promise<string> {
    try {
      const uuid = customUUID || this.generateUuid();
      const obj = {...value, uuid};
      // @ts-ignore
      await (this[storeKey] as Table<any>).put(obj);
      if (storeKey === Stores.INDICES) {
        return uuid;
      }
      await this.flexsearchIndexService.addToIndex(storeKey, obj);
      await this.saveIndex(storeKey);
      return uuid;
    } catch (error) {
      throw error;
    }
  }

  async replaceData(storeKey: Stores, uuid: string, value: any): Promise<void> {
    const obj = {...value, uuid};
    // @ts-ignore
    await (this[storeKey] as Table<any>).put(obj);
    if (storeKey === Stores.INDICES) {
      return;
    }
    await this.flexsearchIndexService.addToIndex(storeKey, obj);
    await this.saveIndex(storeKey);
  }

  async search(storeKey: Stores, indexField: string, value: string): Promise<any[]> {
    // @ts-ignore
    return (this[storeKey] as Table<any>).where(indexField).equals(value).toArray();
  }

  async filter(storeKey: Stores, indexField: string, value: string, exactMatch = false): Promise<any[]> {
    // @ts-ignore
    return (this[storeKey] as Table<any>).filter((item: any) => {
      if (exactMatch) {
        return item[indexField] === value;
      }
      return item[indexField]?.toLowerCase().includes(value.toLowerCase())
    }).toArray();
  }

  getStore(storeKey: Stores): Table<any, string> {
    // @ts-ignore
    return this[storeKey] as Table<any, string>;
  }

  async getOne(storeKey: Stores, uuid: string): Promise<any> {
    // @ts-ignore
    return (this[storeKey] as Table<any>).get(uuid);
  }

  async getAll(storeKey: Stores): Promise<any[]> {
    // @ts-ignore
    const table = (this[storeKey] as Table<any>)
    return table.toArray();
  }

  async getMany(storeKey: Stores, uuids: string[]): Promise<any[]> {
    // @ts-ignore
    const table = (this[storeKey] as Table<any>)
    return table.where('uuid').anyOf(uuids).toArray();
  }

  async remove(storeKey: Stores, uuid: string): Promise<void> {
    // @ts-ignore
    await (this[storeKey] as Table<any>).delete(uuid);
    if (storeKey === Stores.INDICES) {
      return;
    }
    await this.flexsearchIndexService.removeFromIndex(storeKey, uuid);
    await this.saveIndex(storeKey);
  }

  async clear(storeKey: Stores): Promise<void> {
    // @ts-ignore
    await (this[storeKey] as Table<any>).clear();
    await this.flexsearchIndexService.clearIndex(storeKey);
    await this.saveIndex(storeKey);
  }

  generateUuid(): string {
    return generateUuid();
  }

  async balkAdd(storeKey: Stores, values: any[], autoUUID = true): Promise<void> {
    // @ts-ignore
    await (this[storeKey] as Table<any>).bulkPut(values.map(value => ({
      ...value,
      uuid: autoUUID ? this.generateUuid() : value.uuid,
    })));
    //
    // values.forEach(value => {
    //   this.flexsearchIndexService.add(value.uuid, value);
    // });
  }

  async uniqueKeys(storeKey: Stores, indexField: string): Promise<any[]> {
    // @ts-ignore
    return (this[storeKey] as Table<any>).orderBy(indexField).uniqueKeys();
  }
}
