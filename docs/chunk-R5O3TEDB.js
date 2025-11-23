// src/app/shared/helpers/assets/currency.helper.ts
var currencyStringToSymbol = (currency) => {
  try {
    const symbol = Intl.NumberFormat("en", {
      style: "currency",
      currency
    }).formatToParts().find((part) => part.type === "currency")?.value ?? "";
    return currencyMapToHumanReadable[currency] || symbol;
  } catch {
    return currency;
  }
};
var currencyMapToHumanReadable = {
  RUB: "\u0440\u0443\u0431.",
  USD: "$",
  EUR: "\u20AC",
  GBP: "\xA3",
  CNY: "\xA5",
  JPY: "\xA5",
  INR: "\u20B9",
  KRW: "\u20A9",
  AUD: "A$",
  CAD: "C$"
};

export {
  currencyStringToSymbol
};
//# sourceMappingURL=chunk-R5O3TEDB.js.map
