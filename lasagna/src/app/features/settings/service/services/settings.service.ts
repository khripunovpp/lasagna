import {inject, Injectable, signal} from '@angular/core';
import {SettingsRepository} from '../repositories/settings.repository';
import {LanguageService} from './language.service';
import {Settings} from '../models/Settings';
import {SettingsKeysConst} from '../../const/settings-keys.const';
import {LoggerService} from '../../../logger/logger.service';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {
  constructor(
    private _settingsRepository: SettingsRepository,
    private _localisationService: LanguageService,
  ) {
  }

  settingsModel?: Settings;
  settingsSignal = signal<Settings | undefined>(undefined);
  private _logger = inject(LoggerService).withContext({
    label: 'SettingsService',
    color: '#4CAF50',
  })

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
      this._logger.log('Settings loaded', settings);
      return settings;
    });
  }

  saveSettings() {
    if (this.settingsModel) {
      this.settingsSignal.set(this.settingsModel);
      return this._settingsRepository.updateSettings(this.settingsModel).then(() => {
        this._logger.log('Settings saved', this.settingsModel);
      });
    } else {
      return Promise.resolve()
    }
  }

  changeLang(lang: string) {
    this._localisationService.changeLang(lang);
    this.settingsModel?.addSetting(SettingsKeysConst.lang, lang);
    this.saveSettings();
  }

  changeCurrency(currency: string) {
    this.settingsModel?.addSetting(SettingsKeysConst.currency, currency);
    this.saveSettings();
  }

  getInvoicePrefix(): string | undefined {
    return this.settingsModel?.getSetting<string>(SettingsKeysConst.invoicePrefix)?.data;
  }

  setInvoicePrefix(
    prefix: string
  ) {
    this.settingsModel?.addSetting(SettingsKeysConst.invoicePrefix, prefix);
  }

  getInvoiceLogo(): string | undefined {
    return this.settingsModel?.getSetting<string>(SettingsKeysConst.invoiceLogo)?.data;
  }

  setInvoiceLogo(
    logo: string | null
  ) {
    this.settingsModel?.addSetting(SettingsKeysConst.invoiceLogo, logo);
  }

  setInvoicePrecisions(
    precisionRows: number | null,
    precisionTotals: number | null
  ) {
    this.settingsModel?.addSetting(SettingsKeysConst.invoicePrecisionRows, precisionRows);
    this.settingsModel?.addSetting(SettingsKeysConst.invoicePrecisionTotals, precisionTotals);
  }

  getInvoicePrecision(): [number, number] {
    const precisionRows = this.settingsModel?.getSetting<number>(SettingsKeysConst.invoicePrecisionRows)?.data;
    const precisionTotals = this.settingsModel?.getSetting<number>(SettingsKeysConst.invoicePrecisionTotals)?.data;

    return [precisionRows ?? 2, precisionTotals ?? 2];
  }
}
