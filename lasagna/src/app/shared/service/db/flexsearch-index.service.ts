import {Injectable} from '@angular/core';
import {Document} from 'flexsearch';


@Injectable({
  providedIn: 'root'
})
export class FlexsearchIndexService {
  constructor() {
  }

  private indices: { [table: string]: Document } = {};

  async initIndex(tableData: any, tableName: string, fields: string[]) {
    console.log(`FlexsearchIndexService: Initializing index for ${tableName}`, {fields});
    this.indices[tableName] = this.createIndex(fields);
    console.log(`FlexsearchIndexService: Index created for ${tableName}`);
  }

  async search(
    table: string,
    query: string,
    options?: { limit?: number; enrich?: boolean; }
  ) {
    const index = this.indices[table];
    if (index) {
      console.log(`FlexsearchIndexService: Searching in ${table} for "${query}"`);
      const results = await index.searchAsync(query, {limit: 10, enrich: true, ...options});
      console.log(`FlexsearchIndexService: Search results for ${table}`, {
        index,
        query,
        results,
        resultsCount: Array.isArray(results) ? results.length : 'unknown',
        flatResults: (results as any[]).flatMap((result) => ({...result})),
      });

      return (results as any[]).flatMap((result) => ({...result}));
    }
    console.warn(`FlexsearchIndexService: No index found for table ${table}`);
    return undefined;
  }

  getIndex(table: string) {
    const index = this.indices[table];
    console.log(`FlexsearchIndexService: Getting index for ${table}`, {exists: !!index});
    return index;
  }

  async addToIndex(table: string, record: any) {
    const index = this.indices[table];

    if (index) {
      index.add(record);
      console.log(`FlexsearchIndexService: Added record to index ${table}`, {uuid: record.uuid, record});
    } else {
      console.warn(`FlexsearchIndexService: No index found for table ${table}`);
    }
  }

  async importIndex(table: string, indexData: string) {
    try {
      const index = this.indices[table];

      if (!indexData || indexData.trim() === '') {
        console.warn(`FlexsearchIndexService: Empty index data for table ${table}`);
        return;
      }

      const parsedData = JSON.parse(indexData);
      console.log(`FlexsearchIndexService: Importing index for ${table}`, {chunksCount: parsedData?.length});

      if (index && parsedData && parsedData.length > 0) {
        for (const chunk of parsedData) {
          await index.import(chunk.key, chunk.data);
        }
        console.log(`FlexsearchIndexService: Successfully imported index for ${table}`);
      } else {
        console.warn(`FlexsearchIndexService: No index or data for import in ${table}`);
      }
    } catch (e) {
      console.error(`FlexsearchIndexService: Error importing index for table ${table}:`, e);
      throw new Error(`Error importing index for table ${table}: ${e}`);
    }
  }

  async exportIndex(table: string): Promise<string> {
    const index = this.indices[table];
    if (!index) throw new Error(`No index found for table ${table}`);

    const chunks: {
      key: string
      data: string
    }[] = [];

    await index.export((key, data) => {
      chunks.push({
        key: key.toString(),
        data: data as string
      });
    });

    console.log(`FlexsearchIndexService: Exported index for ${table}`, {
      chunksCount: chunks.length,
      dataLength: JSON.stringify(chunks).length
    });

    if (chunks.length === 0) {
      console.warn(`FlexsearchIndexService: No data to export for table ${table}`);
      return '';
    }

    return JSON.stringify(chunks); // это и надо потом в import
  }

  async removeFromIndex(table: string, record: any | string[]) {
    const index = this.indices[table];
    if (index) {
      if (Array.isArray(record)) {
        // Remove multiple records by UUIDs
        for (const uuid of record) {
          index.remove(uuid);
        }
        console.log(`FlexsearchIndexService: Removed ${record.length} records from index ${table}`);
      } else {
        // Remove single record
        index.remove(record);
        console.log(`FlexsearchIndexService: Removed record from index ${table}`, {uuid: record.uuid});
      }
    } else {
      console.warn(`FlexsearchIndexService: No index found for table ${table} when removing record`);
    }
  }

  async clearIndex(table: string) {
    // Удаляем индекс полностью, он будет пересоздан при следующей инициализации
    if (this.indices[table]) {
      delete this.indices[table];
      console.log(`FlexsearchIndexService: Cleared index for ${table}`);
    } else {
      console.warn(`FlexsearchIndexService: No index found for table ${table} when clearing`);
    }
  }

  async removeIndex(table: string) {
    if (this.indices[table]) {
      delete this.indices[table];
      console.log(`FlexsearchIndexService: Removed index for ${table}`);
    } else {
      console.warn(`FlexsearchIndexService: No index found for table ${table} when removing`);
    }
  }

  private createIndex(fields: string[]) {
    console.log(`FlexsearchIndexService: Creating index with fields:`, fields);
    const index = new Document({
      tokenize: 'forward',
      cache: true,
      document: {
        id: 'uuid',
        index: fields
      }
    });
    console.log(`FlexsearchIndexService: Index created successfully`);
    return index;
  }
}
