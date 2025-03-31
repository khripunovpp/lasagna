import {Injectable} from '@angular/core';
import {CsvReaderService} from './csv-reader.service';
import {DexieIndexDbService} from './dexie-index-db.service';
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
    source: Stores
  ) {
    return this._indexDbService.getAll(source).then(data => {
      this._csvReaderService.saveToFile(data, `${source}_export_${new Date().toISOString()}.csv`);
    });
  }

  makeCsv(
    data: any[],
  ) {
    return this._csvReaderService.makeCsv(data);
  }
}
