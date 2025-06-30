import {
  LanguageService
} from "./chunk-63WB3IEN.js";
import {
  DexieIndexDbService,
  LoggerService,
  Stores
} from "./chunk-UGLIF2MQ.js";
import {
  toString
} from "./chunk-Q4M4NLQD.js";
import {
  Injectable,
  inject,
  setClassMetadata,
  signal,
  ɵɵdefineInjectable,
  ɵɵinject
} from "./chunk-6AETQSBA.js";

// src/app/features/settings/const/settings-keys.const.ts
var SettingsKeysConst;
(function(SettingsKeysConst2) {
  SettingsKeysConst2["invoicePrefix"] = "invoicePrefix";
  SettingsKeysConst2["invoiceLogo"] = "invoiceLogo";
  SettingsKeysConst2["invoicePrecisionRows"] = "invoicePrecisionRows";
  SettingsKeysConst2["invoicePrecisionTotals"] = "invoicePrecisionTotals";
  SettingsKeysConst2["currency"] = "currency";
  SettingsKeysConst2["lang"] = "lang";
})(SettingsKeysConst || (SettingsKeysConst = {}));

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
  settingsSignal = signal(void 0);
  _logger = inject(LoggerService).withContext({
    label: "SettingsService",
    color: "#4CAF50"
  });
  get lang() {
    return this._localisationService.lang;
  }
  get languages() {
    return this._localisationService.languages;
  }
  loadSettings() {
    return this._settingsRepository.getAll().then((settings) => {
      this.settingsModel = settings;
      this.settingsSignal.set(settings);
      this._logger.log("Settings loaded", settings);
      return settings;
    });
  }
  saveSettings() {
    if (this.settingsModel) {
      this.settingsSignal.set(this.settingsModel);
      return this._settingsRepository.updateSettings(this.settingsModel).then(() => {
        this._logger.log("Settings saved", this.settingsModel);
      });
    } else {
      return Promise.resolve();
    }
  }
  changeLang(lang) {
    this._localisationService.changeLang(lang);
    this.settingsModel?.addSetting(SettingsKeysConst.lang, lang);
    this.saveSettings();
  }
  changeCurrency(currency) {
    this.settingsModel?.addSetting(SettingsKeysConst.currency, currency);
    this.saveSettings();
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
  setInvoicePrecisions(precisionRows, precisionTotals) {
    this.settingsModel?.addSetting(SettingsKeysConst.invoicePrecisionRows, precisionRows);
    this.settingsModel?.addSetting(SettingsKeysConst.invoicePrecisionTotals, precisionTotals);
  }
  getInvoicePrecision() {
    const precisionRows = this.settingsModel?.getSetting(SettingsKeysConst.invoicePrecisionRows)?.data;
    const precisionTotals = this.settingsModel?.getSetting(SettingsKeysConst.invoicePrecisionTotals)?.data;
    return [precisionRows ?? 2, precisionTotals ?? 2];
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

// src/app/features/settings/service/types/credentials.types.ts
var CredentialsType;
(function(CredentialsType2) {
  CredentialsType2["customer"] = "customer";
  CredentialsType2["system"] = "system";
})(CredentialsType || (CredentialsType = {}));

// src/app/features/settings/service/models/Credential.ts
var Credential = class _Credential {
  constructor(dto) {
    this.update(dto || {});
  }
  type = CredentialsType.customer;
  name = "";
  privateName = "";
  country = "";
  address = "";
  taxId;
  phone = "";
  email = "";
  uuid;
  static fromRaw(dto) {
    if (typeof dto === "string") {
      return new _Credential({
        uuid: dto
      });
    }
    return new _Credential({
      type: dto?.type || CredentialsType.customer,
      name: dto?.name || "",
      privateName: dto?.privateName || "",
      country: dto?.country || "",
      address: dto?.address || "",
      taxId: dto?.taxId || "",
      phone: dto?.phone || "",
      email: dto?.email || "",
      uuid: dto?.uuid || ""
    });
  }
  static empty() {
    return new _Credential();
  }
  update(dto) {
    this.uuid = toString(dto.uuid || this.uuid);
    this.name = toString(dto.name || this.name);
    this.privateName = toString(dto.privateName || this.privateName);
    this.country = toString(dto.country || this.country);
    this.address = toString(dto.address || this.address);
    this.taxId = toString(dto.taxId || this.taxId);
    this.phone = toString(dto.phone || this.phone);
    this.email = toString(dto.email || this.email);
    this.type = dto.type || this.type || CredentialsType.customer;
    return this;
  }
  toDTO() {
    return {
      name: this.name || "",
      privateName: this.privateName || "",
      country: this.country || "",
      address: this.address || "",
      taxId: this.taxId || "",
      phone: this.phone || "",
      email: this.email || "",
      uuid: this.uuid || "",
      type: this.type
    };
  }
  toFormattedString() {
    let string = "";
    if (this.name) {
      string += `
${this.name}`;
    }
    if (this.address) {
      string += `
${this.address}`;
    }
    if (this.country) {
      string += `, ${this.country}`;
    }
    if (this.phone) {
      string += `
${this.phone}`;
    }
    if (this.email) {
      string += `
${this.email}`;
    }
    if (this.taxId) {
      string += `
Tax ID: ${this.taxId}`;
    }
    return string;
  }
};

export {
  CredentialsType,
  Credential,
  SettingsKeysConst,
  SettingsService
};
//# sourceMappingURL=chunk-NDBDMDB3.js.map
