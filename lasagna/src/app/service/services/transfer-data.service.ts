import {Injectable} from '@angular/core';
import {CsvReaderService} from './csv-reader.service';
import {DexieIndexDbService} from '../db/dexie-index-db.service';
import {Stores} from '../const/stores';

@Injectable({
  providedIn: 'root'
})
export class TransferDataService {
  constructor(
    private _indexDbService: DexieIndexDbService,
    private _csvReaderService: CsvReaderService
  ) {
  }

  exportTable(
    source: Stores,
    fileType: 'csv' | 'json' = 'csv',
  ) {
    return this._indexDbService.getAll(source).then(data => {
      if (fileType === 'json') {
        this._csvReaderService.saveToJSONFile(data, this._getFileName(source, fileType));
        return;
      }
      this._csvReaderService.saveToCSVFile(data, this._getFileName(source, fileType));
    });
  }

  private _getFileName(
    source: Stores,
    fileType: 'csv' | 'json',
  ) {
    const date = new Date().toISOString();
    return `${source}_export_${date}.${fileType}`;
  }

  makeCsv(
    data: any[],
  ) {
    return this._csvReaderService.makeCsv(data);
  }
}
