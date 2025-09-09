import {
  Injectable,
  computed,
  inject,
  setClassMetadata,
  signal,
  ɵɵdefineInjectable
} from "./chunk-FOZDM4WI.js";

// src/app/shared/service/services/page-time-tracker.service.ts
var PageTimeTrackerService = class _PageTimeTrackerService {
  _trackers = /* @__PURE__ */ new Map();
  /**
   * Start tracking time for a specific page
   * @param pageKey - Unique identifier for the page
   * @param requiredTimeMs - Required time in milliseconds to consider complete
   * @param onComplete - Callback function when required time is reached
   */
  startTracking(pageKey, requiredTimeMs, onComplete) {
    if (this.isCompleted(pageKey)) {
      return;
    }
    const existingTracker = this._trackers.get(pageKey);
    if (existingTracker?.isActive) {
      return;
    }
    const tracker = {
      startTime: Date.now(),
      totalTime: existingTracker?.totalTime || 0,
      isActive: true,
      requiredTime: requiredTimeMs,
      onComplete
    };
    this._trackers.set(pageKey, tracker);
    this._setupVisibilityTracking(pageKey);
  }
  /**
   * Stop tracking time for a specific page
   * @param pageKey - Unique identifier for the page
   */
  stopTracking(pageKey) {
    const tracker = this._trackers.get(pageKey);
    if (!tracker || !tracker.isActive) {
      return;
    }
    if (tracker.startTime) {
      const sessionTime = Date.now() - tracker.startTime;
      tracker.totalTime += sessionTime;
    }
    tracker.isActive = false;
    tracker.startTime = void 0;
    if (tracker.totalTime >= tracker.requiredTime && tracker.onComplete) {
      tracker.onComplete();
    }
    this._cleanupVisibilityHandler(pageKey);
  }
  /**
   * Check if the required time has been reached for a page
   * @param pageKey - Unique identifier for the page
   * @returns true if required time has been reached
   */
  isCompleted(pageKey) {
    const tracker = this._trackers.get(pageKey);
    return tracker ? tracker.totalTime >= tracker.requiredTime : false;
  }
  /**
   * Get current progress (0-1) for a page
   * @param pageKey - Unique identifier for the page
   * @returns progress as a number between 0 and 1
   */
  getProgress(pageKey) {
    const tracker = this._trackers.get(pageKey);
    if (!tracker)
      return 0;
    let currentTotal = tracker.totalTime;
    if (tracker.isActive && tracker.startTime) {
      currentTotal += Date.now() - tracker.startTime;
    }
    return Math.min(currentTotal / tracker.requiredTime, 1);
  }
  /**
   * Get total time spent on a page in milliseconds
   * @param pageKey - Unique identifier for the page
   * @returns total time in milliseconds
   */
  getTotalTime(pageKey) {
    const tracker = this._trackers.get(pageKey);
    if (!tracker)
      return 0;
    let currentTotal = tracker.totalTime;
    if (tracker.isActive && tracker.startTime) {
      currentTotal += Date.now() - tracker.startTime;
    }
    return currentTotal;
  }
  /**
   * Reset tracking data for a specific page
   * @param pageKey - Unique identifier for the page
   */
  resetTracking(pageKey) {
    const tracker = this._trackers.get(pageKey);
    if (tracker) {
      this._cleanupVisibilityHandler(pageKey);
      this._trackers.delete(pageKey);
    }
  }
  /**
   * Reset all tracking data
   */
  resetAllTracking() {
    for (const [pageKey] of this._trackers) {
      this.resetTracking(pageKey);
    }
  }
  _setupVisibilityTracking(pageKey) {
    const tracker = this._trackers.get(pageKey);
    if (!tracker)
      return;
    const handleVisibilityChange = () => {
      const currentTracker = this._trackers.get(pageKey);
      if (!currentTracker?.isActive)
        return;
      if (document.hidden) {
        if (currentTracker.startTime) {
          const sessionTime = Date.now() - currentTracker.startTime;
          currentTracker.totalTime += sessionTime;
          currentTracker.startTime = void 0;
        }
      } else {
        currentTracker.startTime = Date.now();
      }
      if (currentTracker.totalTime >= currentTracker.requiredTime && currentTracker.onComplete) {
        currentTracker.onComplete();
      }
    };
    tracker.visibilityHandler = handleVisibilityChange;
    document.addEventListener("visibilitychange", handleVisibilityChange);
    tracker.cleanupTimeout = window.setTimeout(() => {
      this._cleanupVisibilityHandler(pageKey);
    }, 6e5);
  }
  _cleanupVisibilityHandler(pageKey) {
    const tracker = this._trackers.get(pageKey);
    if (tracker?.visibilityHandler) {
      document.removeEventListener("visibilitychange", tracker.visibilityHandler);
      tracker.visibilityHandler = void 0;
    }
    if (tracker?.cleanupTimeout) {
      clearTimeout(tracker.cleanupTimeout);
      tracker.cleanupTimeout = void 0;
    }
  }
  static \u0275fac = function PageTimeTrackerService_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _PageTimeTrackerService)();
  };
  static \u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _PageTimeTrackerService, factory: _PageTimeTrackerService.\u0275fac, providedIn: "root" });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(PageTimeTrackerService, [{
    type: Injectable,
    args: [{
      providedIn: "root"
    }]
  }], null, null);
})();

// src/app/features/onboarding/onboarding.service.ts
var OnboardingService = class _OnboardingService {
  _pageTimeTracker = inject(PageTimeTrackerService);
  static FAQ_PAGE_KEY = "onboarding_faq";
  static FAQ_REQUIRED_TIME = 12e4;
  // 2 minutes
  // Сигналы для хранения состояния шагов
  _settingsDone = signal(!!localStorage.getItem("onboarding_settings_done"), ...ngDevMode ? [{ debugName: "_settingsDone" }] : []);
  _productDone = signal(!!localStorage.getItem("onboarding_product_done"), ...ngDevMode ? [{ debugName: "_productDone" }] : []);
  _recipeDone = signal(!!localStorage.getItem("onboarding_recipe_done"), ...ngDevMode ? [{ debugName: "_recipeDone" }] : []);
  _faqDone = signal(!!localStorage.getItem("onboarding_faq_done"), ...ngDevMode ? [{ debugName: "_faqDone" }] : []);
  // Computed для общего статуса
  isOnboardingComplete = computed(() => this._settingsDone() && this._productDone() && this._recipeDone() && this._faqDone(), ...ngDevMode ? [{ debugName: "isOnboardingComplete" }] : []);
  markProductDone() {
    localStorage.setItem("onboarding_product_done", "1");
    this._productDone.set(true);
  }
  markRecipeDone() {
    localStorage.setItem("onboarding_recipe_done", "1");
    this._recipeDone.set(true);
  }
  markSettingsDone() {
    localStorage.setItem("onboarding_settings_done", "1");
    this._settingsDone.set(true);
  }
  markFaqDone() {
    localStorage.setItem("onboarding_faq_done", "1");
    this._faqDone.set(true);
  }
  _onFaqCompleted = () => {
    this.markFaqDone();
  };
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
  // Методы для отслеживания времени на FAQ странице
  startFaqTimeTracking() {
    this._pageTimeTracker.startTracking(_OnboardingService.FAQ_PAGE_KEY, _OnboardingService.FAQ_REQUIRED_TIME, this._onFaqCompleted);
  }
  stopFaqTimeTracking() {
    this._pageTimeTracker.stopTracking(_OnboardingService.FAQ_PAGE_KEY);
  }
  getFaqProgress() {
    return this._pageTimeTracker.getProgress(_OnboardingService.FAQ_PAGE_KEY);
  }
  getFaqTotalTime() {
    return this._pageTimeTracker.getTotalTime(_OnboardingService.FAQ_PAGE_KEY);
  }
  // Метод для сброса онбординга
  resetOnboarding() {
    localStorage.removeItem("onboarding_settings_done");
    localStorage.removeItem("onboarding_product_done");
    localStorage.removeItem("onboarding_recipe_done");
    localStorage.removeItem("onboarding_faq_done");
    this._settingsDone.set(false);
    this._productDone.set(false);
    this._recipeDone.set(false);
    this._faqDone.set(false);
    this._pageTimeTracker.resetTracking(_OnboardingService.FAQ_PAGE_KEY);
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
  }], null, null);
})();

export {
  OnboardingService
};
//# sourceMappingURL=chunk-2JX3723C.js.map
