import {
  SETTINGS
} from "./chunk-RRJNJAOU.js";
import {
  CurrencyPipe
} from "./chunk-AL3DWPLK.js";
import {
  Pipe,
  inject,
  setClassMetadata,
  ɵɵdefinePipe
} from "./chunk-UQVCVPTQ.js";

// src/app/shared/view/pipes/userCurrency.pipe.ts
var UserCurrencyPipe = class _UserCurrencyPipe {
  currencyPipe = inject(CurrencyPipe);
  userSettings = inject(SETTINGS);
  transform(value, digitInfo = "1.0-0") {
    const currency = this.userSettings()["currency"] || "USD";
    return this.currencyPipe.transform(value, currency, "symbol-narrow", digitInfo);
  }
  static \u0275fac = function UserCurrencyPipe_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _UserCurrencyPipe)();
  };
  static \u0275pipe = /* @__PURE__ */ \u0275\u0275definePipe({ name: "userCurrency", type: _UserCurrencyPipe, pure: true });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(UserCurrencyPipe, [{
    type: Pipe,
    args: [{
      name: "userCurrency",
      standalone: true
    }]
  }], null, null);
})();

export {
  UserCurrencyPipe
};
//# sourceMappingURL=chunk-UMJL6Q7G.js.map
