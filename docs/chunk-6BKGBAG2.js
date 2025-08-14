import {
  currencyStringToSymbol
} from "./chunk-OOSA4LBM.js";
import {
  Pipe,
  setClassMetadata,
  ɵɵdefinePipe
} from "./chunk-UQVCVPTQ.js";

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
//# sourceMappingURL=chunk-6BKGBAG2.js.map
