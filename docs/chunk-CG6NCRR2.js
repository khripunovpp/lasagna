import {
  SETTINGS,
  currencyStringToSymbol
} from "./chunk-47KQBWHW.js";
import {
  DecimalPipe
} from "./chunk-NOT5QO64.js";
import {
  Pipe,
  inject,
  setClassMetadata,
  ɵɵdefinePipe
} from "./chunk-CHNANXCD.js";

// src/app/shared/view/pipes/userCurrency.pipe.ts
var UserCurrencyPipe = class _UserCurrencyPipe {
  decimalPipe = inject(DecimalPipe);
  userSettings = inject(SETTINGS);
  transform(value, digitInfo = "1.0-0") {
    const currency = this.userSettings()["currency"] || "USD";
    const currencySymbol = currencyStringToSymbol(currency);
    return this.decimalPipe.transform(value, digitInfo) + " " + currencySymbol;
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
//# sourceMappingURL=chunk-CG6NCRR2.js.map
