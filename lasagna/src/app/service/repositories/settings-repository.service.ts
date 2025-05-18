import {Injectable} from '@angular/core';
import {DexieIndexDbService} from '../db/dexie-index-db.service';
import {Stores} from '../db/const/stores';
import {Settings} from '@service/models/Settings';
import {SettingsDTO} from '@service/db/shemes/Settings.scheme';

@Injectable({
  providedIn: 'root'
})
export class SettingsRepositoryService {
  constructor(
    public _indexDbService: DexieIndexDbService,
  ) {
  }

  async updateSettings(settings: Settings) {
    await this._indexDbService.clear(Stores.SETTINGS);
    return this._indexDbService.balkAdd(Stores.SETTINGS, settings.toDTO().settings);
  }

  getOne(key: string) {
    return this._indexDbService.search(Stores.SETTINGS, 'key', key).then((settings) => {
      if (settings) {
        return settings[0] as SettingsDTO['settings']
      } else {
        return null;
      }
    })
  }

  getAll() {
    return this._indexDbService.getAll(Stores.SETTINGS).then((settings) => {
      return Settings.fromRaw(settings);
    })
  }
}
