import {
  currencyStringToSymbol
} from "./chunk-RPP3IG6S.js";
import {
  Pipe,
  setClassMetadata,
  ɵɵdefinePipe
} from "./chunk-KM6KLH7M.js";

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
  CurrencySymbolPipe
};
//# sourceMappingURL=chunk-SY7JBMPH.js.map
