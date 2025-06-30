// src/app/shared/helpers/assets/currency.helper.ts
var currencyStringToSymbol = (currency) => {
  try {
    return Intl.NumberFormat("en", {
      style: "currency",
      currency
    }).formatToParts().find((part) => part.type === "currency")?.value ?? "";
  } catch {
    return currency;
  }
};

export {
  currencyStringToSymbol
};
//# sourceMappingURL=chunk-OY2YJNFS.js.map
