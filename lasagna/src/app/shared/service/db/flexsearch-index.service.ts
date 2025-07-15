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
    this.indices[tableName] = this.createIndex(fields);
  }

  async search(
    table: string,
    query: string,
    options?: { limit?: number; enrich?: boolean; }
  ) {
    const index = this.indices[table];
    if (index) {
      const results = await index.searchAsync(query, {limit: 10, enrich: true, ...options});
      console.log({results,index,table})

      return (results as any[]).flatMap((result) => ({...result}));
    }
    return undefined;
  }

  getIndex(table: string) {
    return this.indices[table];
  }

  async addToIndex(table: string, record: any) {
    const index = this.indices[table];

    if (index) {
      index.add(record);
    }
  }

  async importIndex(table: string, indexData: string) {
    try {
      const index = this.indices[table];
      const parsedData = JSON.parse(indexData);
      if (index && parsedData) {
        for (const chunk of parsedData) {
          await index.import(chunk.key, chunk.data);
        }
      }
    } catch (e) {
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

    return JSON.stringify(chunks); // это и надо потом в import
  }

  async removeFromIndex(table: string, record: any) {
    const index = this.indices[table];
    if (index) {
      index.remove(record);
    }
  }

  async clearIndex(table: string) {
    this.indices[table] = this.createIndex(['name', 'uuid']);
  }

  async removeIndex(table: string) {
    if (this.indices[table]) {
      delete this.indices[table];
    }
  }

  private createIndex(fields: string[]) {
    return new Document({
      tokenize: 'forward',
      cache: true,
      document: {
        id: 'uuid',
        index: fields
      }
    });
  }
}
