import {
  WINDOW
} from "./chunk-CFXQGSQM.js";
import {
  Injectable,
  inject,
  setClassMetadata,
  ɵɵdefineInjectable
} from "./chunk-IYCVPBRB.js";

// src/app/features/settings/service/services/user.service.ts
var UserService = class _UserService {
  constructor() {
  }
  isUserFirstTime = !this.isUserFirstTimeValue;
  _window = inject(WINDOW);
  get isUserFirstTimeValue() {
    try {
      return this._window?.localStorage.getItem("isUserFirstTime");
    } catch (e) {
      console.error("Error accessing localStorage:", e);
      return null;
    }
  }
  get isUserFirstDate() {
    try {
      const date = this.isUserFirstTimeValue;
      if (date) {
        return new Date(parseInt(date));
      }
      return void 0;
    } catch (e) {
      console.error("Error parsing date from localStorage:", e);
      return void 0;
    }
  }
  setUserFirstTime(value) {
    try {
      this._window?.localStorage.setItem("isUserFirstTime", Date.now().toString());
    } catch (e) {
      console.error("Error accessing localStorage:", e);
    }
  }
  static \u0275fac = function UserService_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _UserService)();
  };
  static \u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _UserService, factory: _UserService.\u0275fac, providedIn: "root" });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(UserService, [{
    type: Injectable,
    args: [{
      providedIn: "root"
    }]
  }], () => [], null);
})();

export {
  UserService
};
//# sourceMappingURL=chunk-CMRNWKEI.js.map
