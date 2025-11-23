import {
  DexieIndexDbService,
  LoggerService,
  Stores
} from "./chunk-QHJLSFIB.js";
import {
  LanguageService
} from "./chunk-AESGXZO7.js";
import {
  APP_SERVER_IS_RU
} from "./chunk-2CTN2MPX.js";
import {
  WINDOW
} from "./chunk-CFXQGSQM.js";
import {
  Injectable,
  inject,
  setClassMetadata,
  signal,
  ɵɵdefineInjectable,
  ɵɵinject
} from "./chunk-IYCVPBRB.js";

// src/app/features/settings/const/settings-keys.const.ts
var SettingsKeysConst;
(function(SettingsKeysConst2) {
  SettingsKeysConst2["invoicePrefix"] = "invoicePrefix";
  SettingsKeysConst2["invoiceLogo"] = "invoiceLogo";
  SettingsKeysConst2["pricePrecision"] = "pricePrecision";
  SettingsKeysConst2["currency"] = "currency";
  SettingsKeysConst2["lang"] = "lang";
})(SettingsKeysConst || (SettingsKeysConst = {}));

// src/app/shared/helpers/pdf-generators/prefix-generator.ts
var generateRandomInvoicePrefix = () => {
  const getRandIdx = () => Math.floor(Math.random() * letters.length);
  const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  return `${letters[getRandIdx()]}${letters[getRandIdx()]}-${letters[getRandIdx()]}${letters[getRandIdx()]}`;
};
var generateInvoiceNumber = (invoice) => {
  const createdAt = /* @__PURE__ */ new Date();
  return `${createdAt.getFullYear()}${String(createdAt.getMonth() + 1).padStart(2, "0")}${String(createdAt.getDate()).padStart(2, "0")}-${invoice?.uuid?.slice(0, 2)}`;
};

// src/app/features/settings/service/models/Settings.ts
var Settings = class _Settings {
  constructor(settings) {
    if (settings && Array.isArray(settings)) {
    }
  }
  settings = /* @__PURE__ */ new Map();
  static empty() {
    return new _Settings();
  }
  static fromRaw(dto) {
    if (dto instanceof _Settings) {
      return dto;
    }
    const settings = new _Settings();
    if (Array.isArray(dto)) {
      dto.forEach((setting) => {
        settings.addSetting(setting.key, setting.data);
      });
    } else {
      Object.entries(dto).forEach(([key, data]) => {
        settings.addSetting(key, data);
      });
    }
    return settings;
  }
  addSetting(key, data) {
    this.settings.set(key, { key, data });
  }
  getSetting(key) {
    return this.settings.get(key);
  }
  getAllSettings() {
    return Array.from(this.settings.values());
  }
  getSettingsMap() {
    return this.getAllSettings().reduce((acc, setting) => {
      acc[setting.key] = setting.data;
      return acc;
    }, {});
  }
  removeSetting(key) {
    this.settings.delete(key);
  }
  toDTO() {
    return {
      settings: Array.from(this.settings.values())
    };
  }
};

// src/app/features/settings/service/repositories/settings.repository.ts
var SettingsRepository = class _SettingsRepository {
  _indexDbService;
  constructor(_indexDbService) {
    this._indexDbService = _indexDbService;
  }
  async updateSettings(settings) {
    await this._indexDbService.clear(Stores.SETTINGS);
    return this._indexDbService.balkAdd(Stores.SETTINGS, settings.toDTO().settings);
  }
  getOne(key) {
    return this._indexDbService.search(Stores.SETTINGS, "key", key).then((settings) => {
      if (settings) {
        return settings[0];
      } else {
        return null;
      }
    });
  }
  getAll() {
    return this._indexDbService.getAll(Stores.SETTINGS).then((settings) => {
      return Settings.fromRaw(settings);
    });
  }
  static \u0275fac = function SettingsRepository_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _SettingsRepository)(\u0275\u0275inject(DexieIndexDbService));
  };
  static \u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _SettingsRepository, factory: _SettingsRepository.\u0275fac, providedIn: "root" });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(SettingsRepository, [{
    type: Injectable,
    args: [{
      providedIn: "root"
    }]
  }], () => [{ type: DexieIndexDbService }], null);
})();

// src/app/features/settings/service/services/settings.service.ts
var SettingsService = class _SettingsService {
  _settingsRepository;
  _localisationService;
  constructor(_settingsRepository, _localisationService) {
    this._settingsRepository = _settingsRepository;
    this._localisationService = _localisationService;
  }
  settingsModel;
  settingsSignal = signal(void 0, ...ngDevMode ? [{ debugName: "settingsSignal" }] : []);
  _logger = inject(LoggerService).withContext({
    label: "SettingsService",
    color: "#4CAF50"
  });
  _isRuRegion = inject(APP_SERVER_IS_RU);
  _window = inject(WINDOW);
  get lang() {
    return this._localisationService.lang;
  }
  get languages() {
    if (this._isRuRegion) {
      return Array.from(/* @__PURE__ */ new Set(["ru", this._localisationService.currentLang]));
    }
    return this._localisationService.languages;
  }
  loadSettings() {
    return this._settingsRepository.getAll().then((settings) => {
      this.settingsModel = settings;
      this.settingsSignal.set(settings);
      const lang = settings?.getSetting(SettingsKeysConst.lang)?.data;
      if (lang) {
        this._window?.localStorage.setItem("lang", lang);
      }
      this._logger.log("Settings loaded", settings);
      return settings;
    });
  }
  async saveSettings() {
    if (this.settingsModel) {
      this.settingsSignal.set(this.settingsModel);
      await this._settingsRepository.updateSettings(this.settingsModel);
      this._logger.log("Settings saved", this.settingsModel);
      return this.settingsModel;
    } else {
      return Promise.resolve(void 0);
    }
  }
  setDefaultSettings() {
    let changed = false;
    if (!this.settingsSignal()?.getSetting(SettingsKeysConst.lang)?.data) {
      const defaultLang = this._localisationService.lang();
      this.settingsModel?.addSetting(SettingsKeysConst.lang, defaultLang);
      this._window?.localStorage.setItem("lang", defaultLang);
      changed = true;
    }
    if (!this.settingsSignal()?.getSetting(SettingsKeysConst.currency)?.data) {
      const currency = this._isRuRegion ? "RUB" : "USD";
      this.settingsModel?.addSetting(SettingsKeysConst.currency, currency);
      changed = true;
    }
    if (!this.settingsSignal()?.getSetting(SettingsKeysConst.invoicePrefix)?.data) {
      this.settingsModel?.addSetting(SettingsKeysConst.invoicePrefix, generateRandomInvoicePrefix());
      changed = true;
    }
    if (!changed) {
      this._logger.log("Default settings already set");
      return Promise.resolve(this.settingsModel);
    }
    return this.saveSettings();
  }
  changeLang(lang) {
    this._localisationService.changeLang(lang);
    this.settingsModel?.addSetting(SettingsKeysConst.lang, lang);
    this._window?.localStorage.setItem("lang", lang);
    return this.saveSettings();
  }
  changeCurrency(currency) {
    this.settingsModel?.addSetting(SettingsKeysConst.currency, currency);
    return this.saveSettings();
  }
  getInvoicePrefix() {
    return this.settingsModel?.getSetting(SettingsKeysConst.invoicePrefix)?.data;
  }
  setInvoicePrefix(prefix) {
    this.settingsModel?.addSetting(SettingsKeysConst.invoicePrefix, prefix);
  }
  getInvoiceLogo() {
    return this.settingsModel?.getSetting(SettingsKeysConst.invoiceLogo)?.data;
  }
  setInvoiceLogo(logo) {
    this.settingsModel?.addSetting(SettingsKeysConst.invoiceLogo, logo);
  }
  setInvoicePrecisions(precision) {
    this.settingsModel?.addSetting(SettingsKeysConst.pricePrecision, precision);
  }
  getInvoicePrecision() {
    const precision = this.settingsModel?.getSetting(SettingsKeysConst.pricePrecision)?.data;
    return [precision ?? 2, precision ?? 2];
  }
  static \u0275fac = function SettingsService_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _SettingsService)(\u0275\u0275inject(SettingsRepository), \u0275\u0275inject(LanguageService));
  };
  static \u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _SettingsService, factory: _SettingsService.\u0275fac, providedIn: "root" });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(SettingsService, [{
    type: Injectable,
    args: [{
      providedIn: "root"
    }]
  }], () => [{ type: SettingsRepository }, { type: LanguageService }], null);
})();

export {
  SettingsKeysConst,
  generateRandomInvoicePrefix,
  generateInvoiceNumber,
  SettingsService
};
//# sourceMappingURL=chunk-MV7X5YHM.js.map
