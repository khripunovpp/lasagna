import {
  APP_SERVER_IS_RU
} from "./chunk-GRS3SI4M.js";
import {
  Injectable,
  computed,
  inject,
  setClassMetadata,
  signal,
  ɵɵdefineInjectable
} from "./chunk-Z5TNFCCP.js";

// src/app/features/onboarding/onboarding.service.ts
var OnboardingService = class _OnboardingService {
  constructor() {
    try {
      this._settingsDone = signal(!!localStorage.getItem("onboarding_settings_done"), ...ngDevMode ? [{ debugName: "_settingsDone" }] : []);
      this._productDone = signal(!!localStorage.getItem("onboarding_product_done"), ...ngDevMode ? [{ debugName: "_productDone" }] : []);
      this._recipeDone = signal(!!localStorage.getItem("onboarding_recipe_done"), ...ngDevMode ? [{ debugName: "_recipeDone" }] : []);
      this._faqDone = signal(!!localStorage.getItem("onboarding_faq_done"), ...ngDevMode ? [{ debugName: "_faqDone" }] : []);
    } catch (e) {
      console.error("Failed to initialize onboarding service", e);
    }
  }
  _settingsDone = signal(false, ...ngDevMode ? [{ debugName: "_settingsDone" }] : []);
  _productDone = signal(false, ...ngDevMode ? [{ debugName: "_productDone" }] : []);
  _recipeDone = signal(false, ...ngDevMode ? [{ debugName: "_recipeDone" }] : []);
  _faqDone = signal(false, ...ngDevMode ? [{ debugName: "_faqDone" }] : []);
  _isRuRegion = inject(APP_SERVER_IS_RU);
  isOnboardingComplete = computed(() => {
    if (this._productDone() && this._recipeDone() && this._faqDone()) {
      return this._isRuRegion ? true : this._settingsDone();
    }
    return false;
  }, ...ngDevMode ? [{ debugName: "isOnboardingComplete" }] : []);
  markProductDone() {
    try {
      localStorage.setItem("onboarding_product_done", "1");
      this._productDone.set(true);
    } catch (e) {
      console.error("Failed to mark product onboarding as done", e);
    }
  }
  markRecipeDone() {
    try {
      localStorage.setItem("onboarding_recipe_done", "1");
      this._recipeDone.set(true);
    } catch (e) {
      console.error("Failed to mark product onboarding as done", e);
    }
  }
  markSettingsDone() {
    try {
      localStorage.setItem("onboarding_settings_done", "1");
      this._settingsDone.set(true);
    } catch (e) {
      console.error("Failed to mark product onboarding as done", e);
    }
  }
  markFaqDone() {
    try {
      localStorage.setItem("onboarding_faq_done", "1");
      this._faqDone.set(true);
    } catch (e) {
      console.error("Failed to mark product onboarding as done", e);
    }
  }
  isProductDone() {
    return this._productDone();
  }
  isRecipeDone() {
    return this._recipeDone();
  }
  isSettingsDone() {
    return this._settingsDone();
  }
  isFaqDone() {
    return this._faqDone();
  }
  static \u0275fac = function OnboardingService_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _OnboardingService)();
  };
  static \u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _OnboardingService, factory: _OnboardingService.\u0275fac, providedIn: "root" });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(OnboardingService, [{
    type: Injectable,
    args: [{
      providedIn: "root"
    }]
  }], () => [], null);
})();

export {
  OnboardingService
};
//# sourceMappingURL=chunk-PWIGGAMT.js.map
