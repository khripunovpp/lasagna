import {Injectable} from '@angular/core';
import {SettingsRepositoryService} from '@service/repositories/settings-repository.service';
import {LocalisationService} from '@service/services';
import {Settings} from '@service/models/Settings';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {
  constructor(
    private _settingsRepository: SettingsRepositoryService,
  ) {
  }

  settingsModel?: Settings;

  loadSettings() {
    return this._settingsRepository.getAll().then((settings) => {
      this.settingsModel = settings;
      return settings;
    });
  }

  saveSettings() {
    if (this.settingsModel) {
      return this._settingsRepository.updateSettings(this.settingsModel);
    } else {
      return Promise.resolve()
    }
  }
}
