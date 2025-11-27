import {inject, Injectable} from '@angular/core';
import {CsvReaderService} from './csv-reader.service';
import {DexieIndexDbService} from '../db/dexie-index-db.service';
import {Stores} from '../db/const/stores';
import {WINDOW} from '../tokens/window.token';

export interface BuckupData {
  store: string
  data: any[]
  version: number
  createdAt: number
}

@Injectable({
  providedIn: 'root'
})
export class TransferDataService {
  constructor(
    private _indexDbService: DexieIndexDbService,
    private _csvReaderService: CsvReaderService
  ) {
  }

  private readonly _window = inject(WINDOW);
  get currenBackupDate() {
    try {
      const date = this._window?.localStorage.getItem('lastBackupDate');
      if (!date) return null;
      return new Date(Number(date));
    } catch (e) {
      console.error('Error accessing localStorage:', e);
      return null;
    }
  }

  async exportTable(
    source: Stores,
    fileType: 'csv' | 'json' = 'csv',
    options: { selected?: string[] } = {},
  ) {
    let data: any[] = [];
    if (options.selected?.length) {
      data = await this._indexDbService.getMany(source, options.selected);
    } else {
      data = await this._indexDbService.getAll(source);
    }
    const writeObjects: BuckupData = {
      store: source,
      data,
      version: await this._indexDbService.getVersion(),
      createdAt: Date.now(),
    };
    if (fileType === 'json') {
      this._csvReaderService.saveToJSONFile(writeObjects, this._getFileName(source, fileType));
      return;
    }
    this._csvReaderService.saveToCSVFile(data, this._getFileName(source, fileType));
  }

  async exportAll(
    fileType: 'csv' | 'json' = 'csv',
  ) {
    const data: BuckupData[] = [];
    const source = (Object.values(Stores) as Stores[]).filter((store) => store !== Stores.INDICES);
    for (const store of source) {
      const items = await this._indexDbService.getAll(store);
      const version = await this._indexDbService.getVersion();
      const createdAt = Date.now()
      data.push({
        store,
        data: items,
        version,
        createdAt,
      });
    }
    if (fileType === 'json') {
      this._csvReaderService.saveToJSONFile(data, this._getFileName('buckup' as any, fileType));
      return;
    }
    this._csvReaderService.saveToCSVFile(data, this._getFileName('buckup' as any, fileType));
  }

  async restoreAllData(
    files?: File[],
  ) {
    if (files?.length && files.length > 1) {
      throw new Error('Only one file is allowed');
      return;
    }
    const data = await this._csvReaderService.readFromJSONFile<BuckupData[]>(files![0]);
    await this._indexDbService.restoreAllData(data);
    await this._indexDbService.flushCache();
  }

  makeCsv(
    data: any[],
  ) {
    return this._csvReaderService.makeCsv(data);
  }

  private _getFileName(
    source: string,
    fileType: 'csv' | 'json',
  ) {
    const date = new Date().toISOString();
    return `${source}_export_${date}.${fileType}`;
  }
}
