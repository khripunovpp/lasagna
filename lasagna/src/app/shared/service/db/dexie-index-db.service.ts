import {inject, Inject, Injectable} from '@angular/core';
import Dexie, {Table} from 'dexie';
import {Stores} from './const/stores';
import {migrations} from './migrations';
import {generateUuid} from '../../helpers/attribute.helper';
import {FlexsearchIndexService} from './flexsearch-index.service';
import {BuckupData} from '../services/transfer-data.service';
import {relationsMap} from './const/relations-maps';
import {DB_NAME} from '../tokens/db-name.token';
import {LoggerService} from '../../../features/logger/logger.service';

@Injectable({
  providedIn: 'root',
})
export class DexieIndexDbService extends Dexie {
  constructor(
    private flexsearchIndexService: FlexsearchIndexService,
    @Inject(DB_NAME) dbName: string,
    private _loggerService: LoggerService,
  ) {
    super(dbName);

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
      // console.log(`Migration ${migration.version} applied`);
    }
    setTimeout(() => {
      this.initIndexes();
    });
  }

  logger = inject(LoggerService).withContext({
    color: '#7f81fb',
    label: 'IndexDB'
  })
  productsStore!: Table<any, string>;
  recipesStore!: Table<any, string>;
  categoryStore!: Table<any, string>;
  relations = new Map<string, string[]>();

  initIndexes(): Promise<void> {
    return Promise.all([
      this.initIndex(Stores.PRODUCTS),
      this.initIndex(Stores.RECIPES),
      this.initIndex(Stores.PRODUCTS_CATEGORIES),
      this.initIndex(Stores.RECIPES_CATEGORIES),
      this.initIndex(Stores.TAGS),
      this.initIndex(Stores.TAXES),
      this.initIndex(Stores.DOCUMENTATION),
      this.initIndex(Stores.SETTINGS),
      this.initIndex(Stores.INVOICES),
      this.initIndex(Stores.CREDENTIALS),
    ]).then(() => {
    });
  }

  async initIndex(table: string): Promise<void> {
    await this.flexsearchIndexService.initIndex(this.getStore(table as Stores), table, ['name']);
    const indexData = await this.getOne(Stores.INDICES, table);

    if (indexData) {
      await this.flexsearchIndexService.importIndex(table, indexData.indexData);
    } else {
      await this.getAll(table as Stores).then(async (data) => {
        for (const item of data) {
          await this.flexsearchIndexService.addToIndex(table, item);
        }
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

    if (indexData?.[0]) {
      return indexData[0].indexData;
    }
    return null;
  }

  async getLength(storeKey: Stores): Promise<number> {
    // @ts-ignore
    return (this[storeKey] as Table<any>).count();
  }

  async addData<T = any>(storeKey: Stores, value: T, customUUID?: string): Promise<string> {
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

  async replaceData<T = any>(storeKey: Stores, uuid: string, value: T): Promise<void> {
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
    const result = await (this[storeKey] as Table<any>).where(indexField).equals(value).toArray();
    this.logger.log(storeKey, 'Search result:', {indexField, value, result});
    return result;
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

  async getOne<T = any>(storeKey: Stores, uuid: string): Promise<T> {
    // @ts-ignore
    const response = await (this[storeKey] as Table<any>).get(uuid);
    this.logger.log(storeKey, 'Got one item from store:', {response});
    return response
  }

  async getOneWithRelations<T = any>(storeKey: Stores, uuid: string): Promise<{
    data: T | null,
    relations: Record<string, Record<string, any>>,
  }> {
    // @ts-ignore
    const table = (this[storeKey] as Table<any>)
    const item = await table.get(uuid);
    if (!item) {
      return Promise.resolve({
        data: null,
        relations: {},
      });
    }

    const relations: Record<string, Record<string, any>> = {};
    const rel = await this.parse(item, relations);
    this.apply(item, rel);
    this.logger.log(storeKey, 'Got one item from store with all relations:', {item, relations});

    return {
      data: item,
      relations,
    }
  }

  async parse(obj: Record<any, any>, relations: Record<string, Record<string, any>> = {}) {
    const entries = Object.entries(obj ?? {});
    for (const [key, value] of entries) {
      if (Array.isArray(value)) {
        for (const subItem of obj[key]) {
          const rel = await this.parse(subItem, relations);
        }
      } else {
        const relation = relationsMap[key];
        if (relation && value) {
          const {tableName, key: uniqKey} = this._parseRelations(relation);
          const response = await this.getOneWithRelations(tableName as any, value);

          const newItem = {
            [value]: response.data,
          };

          relations[key] = {
            ...(relations[key] || {}),
            ...newItem
          };
        }
      }

    }

    return relations;
  }

  apply(obj: Record<any, any>, relations: Record<string, Record<string, any>> = {}) {
    const entries = Object.entries(obj ?? {});
    for (const [key, value] of entries) {
      if (Array.isArray(value)) {
        for (const subItem of obj[key]) {
          this.apply(subItem, relations);
        }
      } else {
        const relationsStore = relations[key];
        const relation = relationsMap[key];
        if (!relation) {
          continue;
        }
        obj[key] = relationsStore?.[obj[key]]
      }
    }
  }

  async getAll<T = any>(storeKey: Stores): Promise<T[]> {
    // @ts-ignore
    const table = (this[storeKey] as Table<any>)
    return table.toArray();
  }

  async getFirst(storeKey: Stores): Promise<any> {
    // @ts-ignore
    const table = (this[storeKey] as Table<any>)
    return table.toCollection().first();
  }

  async getMany<T = any>(storeKey: Stores, uuids: string[]): Promise<T[]> {
    // @ts-ignore
    const table = (this[storeKey] as Table<any>);
    const result = await table.where('uuid').anyOf(uuids).toArray()

    this.logger.log(storeKey, 'Got many:', {result});
    return result;
  }

  async getManyWithRelations<T = any>(storeKey: Stores, uuids: string[]): Promise<{
    data: T[],
    relations: Record<string, Record<string, any>>,
  }> {
    // @ts-ignore
    const table = (this[storeKey] as Table<any>);
    const items = await table.where('uuid').anyOf(uuids).toArray();
    const relations: Record<string, Record<string, any>> = {};
    for (const item of items) {
      const rel = await this.parse(item, relations);
      this.apply(item, rel);
    }
    return {
      data: items,
      relations,
    };
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

  async removeMany(storeKey: Stores, uuids: string[]): Promise<void> {
    // @ts-ignore
    await (this[storeKey] as Table<any>).bulkDelete(uuids);
    if (storeKey === Stores.INDICES) {
      return;
    }
    await this.flexsearchIndexService.removeFromIndex(storeKey, uuids);
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
      uuid: autoUUID ? this.generateUuid() : (value.uuid || this.generateUuid()),
    })));
  }

  async uniqueKeys(storeKey: Stores, indexField: string): Promise<any[]> {
    // @ts-ignore
    return (this[storeKey] as Table<any>).orderBy(indexField).uniqueKeys();
  }

  async getVersion(storeKey: Stores): Promise<number> {
    return (this as any).idbdb.version;
  }

  async restoreAllData(data: BuckupData[]): Promise<void> {
    const stores = (Object.values(Stores) as Stores[]).filter((store) => store !== Stores.INDICES);
    for (const store of stores) {
      const items = data.find(item => item.store === store);
      if (items) {
        // TODO validate schema
        await this.clear(store);
        await this.balkAdd(store, items.data, false);
      } else {
        throw new Error(`Store ${store} not found in backup data`);
      }
    }
  }

  private _parseRelations(string: string) {
    const [tableName, key] = string.split('.');
    return {
      tableName,
      key,
    };
  }
}
