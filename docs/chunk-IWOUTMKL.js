// src/app/shared/helpers/strings.helper.ts
var removeAllNonLetters = (str) => {
  return str.replace(/[^a-zA-Zа-яА-ЯёЁ0-9\s-:()]/g, "");
};
var removeAllNonMathSymbols = (str) => {
  return String(str || "").replace(/[^0-9%.,+\-*/^() ]/g, "").replace(",", ".");
};
var toString = (value) => {
  return String(value || "").trim();
};

export {
  removeAllNonLetters,
  removeAllNonMathSymbols,
  toString
};
//# sourceMappingURL=chunk-IWOUTMKL.js.map
