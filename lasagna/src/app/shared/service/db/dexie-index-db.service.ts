import {inject, Inject, Injectable} from '@angular/core';
import Dexie, {Table, Transaction} from 'dexie';
import {Stores} from './const/stores';
import {migrations} from './migrations';
import {generateUuid} from '../../helpers/attribute.helper';
import {FlexsearchIndexService} from './flexsearch-index.service';
import {BuckupData} from '../services/transfer-data.service';
import {relationsMap} from './const/relations-maps';
import {DB_NAME} from '../tokens/db-name.token';
import {LoggerService} from '../../../features/logger/logger.service';
import {IndexHandlersManager} from './handlers/index-handlers.manager';

@Injectable({
  providedIn: 'root',
})
export class DexieIndexDbService extends Dexie {
  constructor(
    private flexsearchIndexService: FlexsearchIndexService,
    private indexHandlersManager: IndexHandlersManager,
    @Inject(DB_NAME) dbName: string,
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
      this.logger.log(`Migration ${migration.version} applied`);
    }
  }

  private _loggerClass = inject(LoggerService);
  logger = this._loggerClass.withContext({
    color: '#7f81fb',
    label: 'IndexDB'
  });
  indexLogger = this._loggerClass.withContext({
    color: '#7fdb7f',
    label: 'IndexDB:Index'
  });
  readonly #_fieldsMap: Partial<Record<string, string[]>> = {
    [Stores.INVOICES]: [
      'uuid',
      'name',
      'prefix',
      'invoice_number',
      'credential_from_string',
      'credential_to_string',
      'full_invoice_number',
      'searchable_text'
    ],
    [Stores.DOCUMENTATION]: [
      'title',
      'html',
      'path',
      'language',
      'name'
    ],
  }

  async initIndexes(): Promise<void> {
    try {
      // Инициализируем индексы последовательно для лучшей отладки
      const tables = [
        Stores.PRODUCTS,
        Stores.RECIPES,
        Stores.PRODUCTS_CATEGORIES,
        Stores.RECIPES_CATEGORIES,
        Stores.TAGS,
        Stores.TAXES,
        Stores.DOCUMENTATION,
        Stores.SETTINGS,
        Stores.INVOICES,
        Stores.CREDENTIALS,
      ];

      for (const table of tables) {
        await this.initIndex(table);
      }

      this.logger.log('All indexes initialized successfully');
    } catch (error) {
      this.logger.error('Error initializing indexes:', error);
      // Не выбрасываем ошибку, чтобы не прерывать работу приложения
      // throw error;
    }
  }

  async initIndex(table: string): Promise<void> {
    try {
      this.indexLogger.log(`Initializing index for table: ${table}`);

      await this.flexsearchIndexService.initIndex(
        this.getStore(table as Stores),
        table,
        this.#_fieldsMap[table] || ['name', 'uuid']
      );
      const indexData = await this.getOne(Stores.INDICES, table);

      if (indexData) {
        this.indexLogger.log(`Importing existing index for table: ${table}`);
        await this.flexsearchIndexService.importIndex(table, indexData.indexData);
      } else {
        this.indexLogger.log(`Creating new index for table: ${table}`);
        const data = await this.getAll(table as Stores);
        this.indexLogger.log(`Found ${data.length} items in table: ${table}`, {data: data.slice(0, 2)});

        if (data.length > 0) {
          await this._addBalkIndexWithTransform(table as Stores, data);

          if (data.length > 0) {
            try {
              await this.saveIndex(table);
            } catch (error) {
              this.indexLogger.error(`Error saving index for table ${table}:`, error);
            }
          } else {
            this.indexLogger.log(`No data to index for table: ${table}, skipping save`);
          }
        } else {
          this.indexLogger.log(`No data found for table: ${table}, skipping index creation`);
        }
      }
    } catch (error) {
      this.indexLogger.error(`Error initializing index for table ${table}:`, error);
      // Не выбрасываем ошибку, чтобы не прерывать инициализацию других индексов
      // throw error;
    }
  }

  async saveIndex(table: string) {
    try {
      const indexData = this.flexsearchIndexService.getIndex(table);
      if (!indexData) {
        this.indexLogger.error('No index data found for table:', table);
        return;
      } else {
        const data = await this.flexsearchIndexService.exportIndex(table);
        if (data && data.length > 0) {
          this.indexLogger.log(table, 'Saving index data:', {
            dataLength: data.length,
            dataPreview: data.substring(0, 100)
          });
          const newData = {
            table,
            indexData: data,
          };
          await this.replaceData(Stores.INDICES, table, newData);

          this.indexLogger.log(table, 'Index data saved successfully', {newData});
        } else {
          this.indexLogger.warn(table, 'No data to save for index');
          // Удаляем запись индекса, если данных нет
          try {
            await this.remove(Stores.INDICES, table);
          } catch (e) {
            // Игнорируем ошибки при удалении несуществующей записи
          }
        }
      }

    } catch (error) {
      this.indexLogger.error('Error saving index:', error);
      // Не выбрасываем ошибку, чтобы не прерывать работу приложения
      // throw error;
    }
  }

  async getOne<T = any>(
    storeKey: Stores,
    uuid: string,
  ): Promise<T> {
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
    const item = await this.getOne(storeKey, uuid, false);
    if (!item) {
      return Promise.resolve({
        data: null,
        relations: {},
      });
    }

    const relations: Record<string, Record<string, any>> = {};
    const rel = await this._collectRelations(item, relations);
    this._putRelationsInto(item, rel);
    this.logger.log(storeKey, 'Got one item from store with all relations:', {item, relations});

    return {
      data: item,
      relations,
    }
  }

  async getMany<T = any>(storeKey: Stores, uuids: string[]): Promise<T[]> {
    // @ts-ignore
    const table = (this[storeKey] as Table<any>);
    const result = await table.where('uuid')
      .anyOf(uuids)
      .toArray();
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
      const rel = await this._collectRelations(item, relations);
      this._putRelationsInto(item, rel);
    }
    return {
      data: items,
      relations,
    };
  }

  async getAll<T = any>(storeKey: Stores): Promise<T[]> {
    // @ts-ignore
    return (this[storeKey] as Table<any>).toArray();
  }

  async getAllWithRelations<T = any>(storeKey: Stores): Promise<{
    data: T[],
    relations: Record<string, Record<string, any>>,
  }> {
    // @ts-ignore
    const items = await this.getAll(storeKey);
    const relations: Record<string, Record<string, any>> = {};
    for (const item of items) {
      const rel = await this._collectRelations(item, relations);
      this._putRelationsInto(item, rel);
    }
    return {
      data: items,
      relations,
    };
  }

  async addData<T = any>(storeKey: Stores, value: T, customUUID?: string): Promise<string> {
    try {
      const uuid = customUUID || this._generateUuid();
      const obj = {...value, uuid};
      // @ts-ignore
      await (this[storeKey] as Table<any>).put(obj);
      if (storeKey === Stores.INDICES) {
        return uuid;
      }
      await this._addBalkIndexWithTransform(storeKey, [obj]);
      // Сохраняем индекс только если есть данные
      try {
        await this.saveIndex(storeKey);
      } catch (error) {
        this.logger.error(`Error saving index for ${storeKey}:`, error);
      }
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
    await this._addBalkIndexWithTransform(storeKey, [obj]);

    // Сохраняем индекс только если есть данные
    try {
      await this.saveIndex(storeKey);
    } catch (error) {
      this.logger.error(`Error saving index for ${storeKey}:`, error);
    }
  }

  async replaceManyData<T = any>(storeKey: Stores, values: T[]): Promise<void> {
    // @ts-ignore
    const valuesWithUuid = values.map((value: any) => ({
      ...value,
      uuid: value.uuid || this._generateUuid(),
    }));
    // @ts-ignore
    await (this[storeKey] as Table<any>).bulkPut(valuesWithUuid);
    if (storeKey === Stores.INDICES) {
      return;
    }
    await this._addBalkIndexWithTransform(storeKey, valuesWithUuid);
    // Сохраняем индекс только если есть данные
    if (valuesWithUuid.length > 0) {
      try {
        await this.saveIndex(storeKey);
      } catch (error) {
        this.logger.error(`Error saving index for ${storeKey}:`, error);
      }
    }
  }

  async search(storeKey: Stores, indexField: string, value: string): Promise<any[]> {
    // @ts-ignore
    const result = await (this[storeKey] as Table<any>).where(indexField)
      .equals(value)
      .toArray();
    this.logger.log(storeKey, 'Search result:', {indexField, value, result});
    return result;
  }

  async filter(storeKey: Stores, indexField: string, value: string, exactMatch = false): Promise<any[]> {
    const valueIsBoolean = value === 'true' || value === 'false';

    // @ts-ignore
    return (this[storeKey] as Table<any>).filter((item: any) => {
      if (exactMatch) {
        if (valueIsBoolean) {
          return item[indexField] === (value === 'true');
        }
        return item[indexField] === value;
      }
      return item[indexField]?.toLowerCase().includes(value.toLowerCase())
    }).toArray();
  }


  getStore(storeKey: Stores): Table<any, string> {
    // @ts-ignore
    return this[storeKey] as Table<any, string>;
  }

  async getLength(storeKey: Stores): Promise<number> {
    // @ts-ignore
    return (this[storeKey] as Table<any>).count();
  }

  async remove(storeKey: Stores, uuid: string): Promise<void> {
    // @ts-ignore
    await (this[storeKey] as Table<any>).delete(uuid);
    if (storeKey === Stores.INDICES) {
      return;
    }
    await this.flexsearchIndexService.removeFromIndex(storeKey, uuid);
    // Сохраняем индекс только если есть данные
    try {
      await this.saveIndex(storeKey);
    } catch (error) {
      this.logger.error(`Error saving index for ${storeKey}:`, error);
    }
  }

  async removeMany(storeKey: Stores, uuids: string[]): Promise<void> {
    // @ts-ignore
    await (this[storeKey] as Table<any>).bulkDelete(uuids);

    if (storeKey === Stores.INDICES) {
      return;
    }
    await this.flexsearchIndexService.removeFromIndex(storeKey, uuids);
    // Сохраняем индекс только если есть данные
    if (uuids.length > 0) {
      try {
        await this.saveIndex(storeKey);
      } catch (error) {
        this.logger.error(`Error saving index for ${storeKey}:`, error);
      }
    }
  }

  async clear(storeKey: Stores): Promise<void> {
    // @ts-ignore
    await (this[storeKey] as Table<any>).clear();

    if (storeKey !== Stores.INDICES) {
      await this._resetIndex(storeKey);
    }
  }

  async balkAdd(storeKey: Stores, values: any[], autoUUID = true): Promise<void> {
    this.logger.log(`Bulk adding ${values.length} items to ${storeKey}`, {autoUUID});

    const valuesWithUuid = values.map(value => ({
      ...value,
      uuid: autoUUID ? this._generateUuid() : (value.uuid || this._generateUuid()),
    }));

    // @ts-ignore
    await (this[storeKey] as Table<any>).bulkPut(valuesWithUuid);

    if (storeKey === Stores.INDICES) {
      return;
    }

    this.logger.log(`Adding ${valuesWithUuid.length} items to index for ${storeKey}`);
    await this._addBalkIndexWithTransform(storeKey, valuesWithUuid);
    // Сохраняем индекс только если есть данные
    if (valuesWithUuid.length > 0) {
      try {
        await this.saveIndex(storeKey);
      } catch (error) {
        this.logger.error(`Error saving index for ${storeKey}:`, error);
      }
    }
    this.logger.log(`Successfully bulk added ${valuesWithUuid.length} items to ${storeKey}`);
  }

  async uniqueKeys(storeKey: Stores, indexField: string): Promise<any[]> {
    // @ts-ignore
    return (this[storeKey] as Table<any>).orderBy(indexField).uniqueKeys();
  }

  async getVersion(): Promise<number> {
    return (this as any).idbdb?.version ?? 0;
  }

  async restoreAllData(data: BuckupData[]): Promise<void> {
    const currentVersion = await this.getVersion();
    const stores = (Object.values(Stores) as Stores[]).filter((store) => store !== Stores.INDICES);
    for (const store of stores) {
      const items = data.find(item => item.store === store);
      if (items) {
        if (items.version > currentVersion) {
          throw new Error(`Backup version ${items.version} is newer than current DB version ${currentVersion}. Please update the application.`);
        }
        // TODO validate schema
        await this.clear(store);
        await this.balkAdd(store, items.data, false);
      } else {
        // throw new Error(`Store ${store} not found in backup data`);
      }
    }
    // Инициализируем индексы после восстановления всех данных
    try {
      await this.initIndexes();
    } catch (error) {
      this.logger.error('Error initializing indexes after restore:', error);
    }
  }

  async flushCache(): Promise<void> {
    await this.clear(Stores.INDICES);
  }

  async deleteAllData(): Promise<void> {
    this.delete();
  }

  private async _addBalkIndexWithTransform(storeKey: Stores, data: any[]) {
    const transformedItem = this.indexHandlersManager.transformData(storeKey, data);

    for (const item of transformedItem.data) {
      await this.flexsearchIndexService.addToIndex(storeKey, item);
    }
  }

  private async _collectRelations(obj: Record<any, any>, relations: Record<string, Record<string, any>> = {}) {
    const entries = Object.entries(obj ?? {});
    for (const [key, value] of entries) {
      if (Array.isArray(value)) {
        for (const subItem of obj[key]) {
          const rel = await this._collectRelations(subItem, relations);
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

  private _putRelationsInto(obj: Record<any, any>, relations: Record<string, Record<string, any>> = {}) {
    const entries = Object.entries(obj ?? {});
    for (const [key, value] of entries) {
      if (Array.isArray(value)) {
        for (const subItem of obj[key]) {
          this._putRelationsInto(subItem, relations);
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

  private _generateUuid(): string {
    return generateUuid();
  }

  private async _resetIndex(storeKey: Stores): Promise<void> {
    await this.flexsearchIndexService.clearIndex(storeKey);
    // Не сохраняем пустой индекс
    // await this.saveIndex(storeKey);
  }

  private _parseRelations(string: string) {
    const [tableName, key] = string.split('.');
    return {
      tableName,
      key,
    };
  }

  async withTransaction<T = any>(storeKeys: Stores[], fn: (tx: Transaction) => Promise<T>): Promise<T> {
    return this.transaction<T>('rw', storeKeys, fn);
  }
}
