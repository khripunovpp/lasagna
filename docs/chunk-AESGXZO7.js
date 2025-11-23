import {
  APP_SERVER_IS_RU
} from "./chunk-2CTN2MPX.js";
import {
  WINDOW
} from "./chunk-CFXQGSQM.js";
import {
  TranslateService
} from "./chunk-755Q3QHA.js";
import {
  Injectable,
  inject,
  setClassMetadata,
  signal,
  ɵɵdefineInjectable,
  ɵɵinject
} from "./chunk-IYCVPBRB.js";

// src/app/features/settings/service/services/language.service.ts
var allowedLanguages = ["pt", "ru", "en"];
var LanguageService = class _LanguageService {
  translate;
  constructor(translate) {
    this.translate = translate;
    this.translate.addLangs(allowedLanguages);
    const lang = this._defaultLang;
    this.translate.setDefaultLang(lang);
    this.changeLang(lang);
  }
  _lang = signal(this._defaultLang, ...ngDevMode ? [{ debugName: "_lang" }] : []);
  _isRuRegion = inject(APP_SERVER_IS_RU);
  _window = inject(WINDOW);
  get lang() {
    return this._lang;
  }
  get currentLang() {
    return this.translate.currentLang;
  }
  get languages() {
    return this.translate.getLangs();
  }
  get _defaultLang() {
    if (this._isRuRegion) {
      return "ru";
    }
    return this.translate?.getBrowserLang() || "en";
  }
  getTranslate(key) {
    return this.translate.instant(key);
  }
  changeLang(lang) {
    try {
      if (!this.languages.includes(lang))
        return;
      this.translate.use(lang);
      this._lang.set(lang);
      this._window?.localStorage.setItem("lang", lang);
    } catch (e) {
      console.error("Error changing language:", e);
      this.translate.use(this._defaultLang);
    }
  }
  static \u0275fac = function LanguageService_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _LanguageService)(\u0275\u0275inject(TranslateService));
  };
  static \u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _LanguageService, factory: _LanguageService.\u0275fac, providedIn: "root" });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(LanguageService, [{
    type: Injectable,
    args: [{
      providedIn: "root"
    }]
  }], () => [{ type: TranslateService }], null);
})();

export {
  LanguageService
};
//# sourceMappingURL=chunk-AESGXZO7.js.map
