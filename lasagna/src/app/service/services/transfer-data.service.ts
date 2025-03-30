import {Injectable} from '@angular/core';
import {IndexDbService} from './index-db.service';
import {CsvReaderService} from './csv-reader.service';
import {ZodObject} from 'zod';

@Injectable({
  providedIn: 'root'
})
export class TransferDataService {
  constructor(
    private _indexDbService: IndexDbService,
    private _csvReaderService: CsvReaderService
  ) {
  }

  exportTable(
    source: string,
  ) {
    this._indexDbService.openDb(async db => {
      const transaction = db.transaction(source, 'readonly');
      const store = transaction.objectStore(source);
      const request = store.getAll();
      request.onsuccess = (event: any) => {
        const data = event.target.result;
        this._csvReaderService.saveToFile(data, 'export.csv');
      }
    });
  }

  importTable(
    source: string,
    file: File,
    schema?: ZodObject<any, any, any>,
  ) {
    return this._csvReaderService.readFromFile(file).then(async (items) => {
      for (const item of items) {
        // await this._indexDbService.addData(source, item, schema);
      }
    });
  }

  makeCsv(
    data: any[],
  ) {
    return this._csvReaderService.makeCsv(data);
  }
}
