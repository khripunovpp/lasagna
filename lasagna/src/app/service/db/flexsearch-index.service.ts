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
    console.log('Index created:', tableName, this.indices[tableName]);
  }

  async search(table: string, query: string) {
    const index = this.indices[table];
    if (index) {
      console.log('Searching in index:', table, index, query);
      const results = await index.searchAsync(query, {limit: 10, enrich: true});
      console.log('Search results:', results);
      return results;
    }
    return [];
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
      console.log('Parsed index data:', parsedData);
      if (index && parsedData) {
        for (const chunk of parsedData) {
          console.log('Importing index for table:', table, {chunk});
          await index.import(chunk.key, chunk.data);
          console.log('Index imported successfully for table:', index);
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
    this.indices[table] = this.createIndex(['name']);
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
