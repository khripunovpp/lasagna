import {Injectable} from '@angular/core';
import Dexie, {Table} from 'dexie';
import {Stores} from '../const/stores';
import {migrations} from './migrations';

@Injectable({
  providedIn: 'root'
})
export class DexieIndexDbService extends Dexie {
  constructor() {
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
  }

  productsStore!: Table<any, string>;
  recipesStore!: Table<any, string>;
  categoryStore!: Table<any, string>;

  async addData(storeKey: Stores, value: any): Promise<string> {
    const uuid = this.generateUuid();
    // @ts-ignore
    await (this[storeKey] as Table<any>).put({...value, uuid});
    return uuid;
  }

  async replaceData(storeKey: Stores, uuid: string, value: any): Promise<void> {
    // @ts-ignore
    await (this[storeKey] as Table<any>).put({...value, uuid});
  }

  async search(storeKey: Stores, indexField: string, value: string): Promise<any[]> {
    // @ts-ignore
    return (this[storeKey] as Table<any>).where(indexField).equals(value).toArray();
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
  }

  generateUuid(): string {
    return Math.random().toString(36).substring(2) + Date.now().toString(36);
  }

  async balkAdd(storeKey: Stores, values: any[], autoUUID = true): Promise<void> {
    // @ts-ignore
    await (this[storeKey] as Table<any>).bulkPut(values.map(value => ({
      ...value,
      uuid: autoUUID ? this.generateUuid() : value.uuid,
    })));
  }
}
