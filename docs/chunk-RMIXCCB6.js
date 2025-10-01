import {
  SETTINGS,
  currencyStringToSymbol
} from "./chunk-QWNL3ZQ3.js";
import {
  DecimalPipe
} from "./chunk-OWAANQ2P.js";
import {
  Pipe,
  inject,
  setClassMetadata,
  ɵɵdefinePipe
} from "./chunk-LM33AOL5.js";

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

// src/app/shared/view/pipes/currency-symbol.pipe.ts
var CurrencySymbolPipe = class _CurrencySymbolPipe {
  transform(value) {
    return currencyStringToSymbol(value);
  }
  static \u0275fac = function CurrencySymbolPipe_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _CurrencySymbolPipe)();
  };
  static \u0275pipe = /* @__PURE__ */ \u0275\u0275definePipe({ name: "currencySymbol", type: _CurrencySymbolPipe, pure: true });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(CurrencySymbolPipe, [{
    type: Pipe,
    args: [{
      name: "currencySymbol",
      standalone: true
    }]
  }], null, null);
})();

export {
  UserCurrencyPipe,
  CurrencySymbolPipe
};
//# sourceMappingURL=chunk-RMIXCCB6.js.map
