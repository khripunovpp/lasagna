import {inject, Injectable, signal} from '@angular/core';
import {SettingsRepository} from '../repositories/settings.repository';
import {LanguageService} from './language.service';
import {Settings} from '../models/Settings';
import {SettingsKeysConst} from '../../const/settings-keys.const';
import {LoggerService} from '../../../logger/logger.service';
import {generateRandomInvoicePrefix} from '../../../../shared/helpers/pdf-generators/prefix-generator';
import {APP_SERVER_IS_RU} from '../../../../shared/service/tokens/app-server-region.token';
import {WINDOW} from '../../../../shared/service/tokens/window.token';
import {AnalyticsService} from '../../../../shared/service/services/analytics.service';

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
  private readonly _isRuRegion = inject(APP_SERVER_IS_RU);
  private readonly _window = inject(WINDOW);
  private readonly _analyticsService = inject(AnalyticsService);

  get lang() {
    return this._localisationService.lang;
  }

  get currency() {
    return this.settingsSignal()?.getSetting<string>(SettingsKeysConst.currency)?.data;
  }

  get languages(): string[] {
    if (this._isRuRegion) {
      return Array.from(new Set(['ru', this._localisationService.currentLang]))
    }
    return this._localisationService.languages;
  }

  loadSettings() {
    return this._settingsRepository.getAll().then((settings) => {
      this.settingsModel = settings;
      this.settingsSignal.set(settings);
      // Sync language to localStorage for JavaScript files
      const lang = settings?.getSetting<string>(SettingsKeysConst.lang)?.data;
      if (lang) {
        this._window?.localStorage.setItem('lang', lang);
      }
      this._logger.log('Settings loaded', settings);
      return settings;
    });
  }

  async saveSettings() {
    if (this.settingsModel) {
      this.settingsSignal.set(this.settingsModel);
      await this._settingsRepository.updateSettings(this.settingsModel);
      this._logger.log('Settings saved', this.settingsModel);
      return this.settingsModel;
    } else {
      return Promise.resolve<undefined>(undefined)
    }
  }

  setDefaultSettings() {
    let changed = false;
    if (!this.settingsSignal()?.getSetting<string>(SettingsKeysConst.lang)?.data) {
      const defaultLang = this._localisationService.lang();
      this.settingsModel?.addSetting(SettingsKeysConst.lang, defaultLang);
      // Store language in localStorage for JavaScript files
      this._window?.localStorage.setItem('lang', defaultLang);
      changed = true;
    }
    if (!this.settingsSignal()?.getSetting<string>(SettingsKeysConst.currency)?.data) {
      const currency = this._isRuRegion ? 'RUB' : 'USD';
      this.settingsModel?.addSetting(SettingsKeysConst.currency, currency);
      changed = true;
    }
    if (!this.settingsSignal()?.getSetting<string>(SettingsKeysConst.invoicePrefix)?.data) {
      this.settingsModel?.addSetting(SettingsKeysConst.invoicePrefix, generateRandomInvoicePrefix());
      changed = true;
    }

    if (!changed) {
      this._logger.log('Default settings already set');
      return Promise.resolve(this.settingsModel);
    }
    return this.saveSettings();
  }

  changeLang(
    lang: string,
    silent = false,
  ) {
    this._localisationService.changeLang(lang);
    // Store language in localStorage for JavaScript files
    this._window?.localStorage.setItem('lang', lang);

    this._analyticsService.trackEvent('language_change', {
      saved_language: lang,
      current_language: this.lang(),
      event_category: 'settings',
      event_label: 'language',
    });

    if (silent) {
      return Promise.resolve();
    }

    this.settingsModel?.addSetting(SettingsKeysConst.lang, lang);
    return this.saveSettings();
  }

  changeCurrency(currency: string) {
    this.settingsModel?.addSetting(SettingsKeysConst.currency, currency);
    this._analyticsService.trackEvent('currency_change', {
      saved_currency: currency,
      current_currency: this.currency,
      event_category: 'settings',
      event_label: 'currency',
    });
    return this.saveSettings();
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
    precision: number | null,
  ) {
    this.settingsModel?.addSetting(SettingsKeysConst.pricePrecision, precision);
  }

  getInvoicePrecision(): [number, number] {
    const precision = this.settingsModel?.getSetting<number>(SettingsKeysConst.pricePrecision)?.data;

    return [precision ?? 2, precision ?? 2];
  }

  getRecipesViewMode(): 'folders' | 'groupings' {
    return (this.settingsModel?.getSetting<string>(SettingsKeysConst.recipesViewMode)?.data as any) ?? 'folders';
  }

  setRecipesViewMode(mode: 'folders' | 'groupings') {
    this.settingsModel?.addSetting(SettingsKeysConst.recipesViewMode, mode);
    this._analyticsService.trackEvent('recipes_mode_change', {
      saved_mode: mode,
      current_mode: this.getRecipesViewMode(),
      event_category: 'settings',
      event_label: 'recipes-mode',
    });
    return this.saveSettings();
  }
}
