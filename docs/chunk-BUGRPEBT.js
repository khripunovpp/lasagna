import {
  APP_SERVER_IS_RU
} from "./chunk-2CTN2MPX.js";
import {
  WINDOW
} from "./chunk-CFXQGSQM.js";
import {
  Injectable,
  computed,
  inject,
  setClassMetadata,
  signal,
  ɵɵdefineInjectable
} from "./chunk-IYCVPBRB.js";

// src/app/features/onboarding/onboarding.service.ts
var OnboardingService = class _OnboardingService {
  constructor() {
    try {
      this._settingsDone = signal(!!this._window?.localStorage.getItem("onboarding_settings_done"), ...ngDevMode ? [{ debugName: "_settingsDone" }] : []);
      this._productDone = signal(!!this._window?.localStorage.getItem("onboarding_product_done"), ...ngDevMode ? [{ debugName: "_productDone" }] : []);
      this._recipeDone = signal(!!this._window?.localStorage.getItem("onboarding_recipe_done"), ...ngDevMode ? [{ debugName: "_recipeDone" }] : []);
      this._faqDone = signal(!!this._window?.localStorage.getItem("onboarding_faq_done"), ...ngDevMode ? [{ debugName: "_faqDone" }] : []);
    } catch (e) {
      console.error("Failed to initialize onboarding service", e);
    }
  }
  _window = inject(WINDOW);
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
      this._window?.localStorage.setItem("onboarding_product_done", "1");
      this._productDone.set(true);
    } catch (e) {
      console.error("Failed to mark product onboarding as done", e);
    }
  }
  markRecipeDone() {
    try {
      this._window?.localStorage.setItem("onboarding_recipe_done", "1");
      this._recipeDone.set(true);
    } catch (e) {
      console.error("Failed to mark product onboarding as done", e);
    }
  }
  markSettingsDone() {
    try {
      this._window?.localStorage.setItem("onboarding_settings_done", "1");
      this._settingsDone.set(true);
    } catch (e) {
      console.error("Failed to mark product onboarding as done", e);
    }
  }
  markFaqDone() {
    try {
      this._window?.localStorage.setItem("onboarding_faq_done", "1");
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
//# sourceMappingURL=chunk-BUGRPEBT.js.map
