import {Injectable, signal} from '@angular/core';
import {SettingsRepositoryService} from '@service/repositories/settings-repository.service';
import {LanguageService} from '@service/services';
import {Settings} from '@service/models/Settings';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {
  constructor(
    private _settingsRepository: SettingsRepositoryService,
    private _localisationService: LanguageService,
  ) {
  }

  settingsModel?: Settings;
  settingsSignal = signal<Settings | undefined>(undefined);

  get lang() {
    return this._localisationService.lang;
  }

  get languages(): string[] {
    return this._localisationService.languages;

  }

  loadSettings() {
    return this._settingsRepository.getAll().then((settings) => {
      this.settingsModel = settings;
      this.settingsSignal.set(settings);
      return settings;
    });
  }

  saveSettings() {
    if (this.settingsModel) {
      debugger
      this.settingsSignal.set(this.settingsModel);
      return this._settingsRepository.updateSettings(this.settingsModel);
    } else {
      return Promise.resolve()
    }
  }

  changeLang(lang: string) {
    this._localisationService.changeLang(lang);
    this.settingsModel?.addSetting('lang', lang);
    this.saveSettings();
  }

  changeCurrency(currency: string) {
    this.settingsModel?.addSetting('currency', currency);
    this.saveSettings();
  }

}
