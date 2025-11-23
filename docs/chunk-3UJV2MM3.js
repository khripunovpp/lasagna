import {
  UnitValue
} from "./chunk-UG5XPMCB.js";
import {
  marker
} from "./chunk-NJX644NS.js";

// src/app/shared/helpers/unit.helper.ts
var isWeightUnit = (unit) => {
  return unit === "gram" || unit === "kilogram";
};
var isCountUnit = (unit) => {
  return unit === "piece";
};
var isKilogramUnit = (unit) => {
  return unit === "kilogram";
};
var isGramUnit = (unit) => {
  return unit === "gram";
};
var convertKilogramToGram = (amount) => {
  return amount * 1e3;
};
var convertPriceOfGramToKilogram = (price) => {
  return price * 1e3;
};
var convertPriceOfKilogramToGram = (price) => {
  if (price == 0)
    return 0;
  return price / 1e3;
};
var unitMarkersMap = {
  [UnitValue.GRAM]: marker("unit.gram"),
  [UnitValue.KILOGRAM]: marker("unit.kilogram"),
  [UnitValue.PIECE]: marker("unit.piece")
};
var getUnitMarker = (unit) => {
  return unit ? unitMarkersMap[unit] || unit : marker("unit.unknown");
};

export {
  isWeightUnit,
  isCountUnit,
  isKilogramUnit,
  isGramUnit,
  convertKilogramToGram,
  convertPriceOfGramToKilogram,
  convertPriceOfKilogramToGram,
  getUnitMarker
};
//# sourceMappingURL=chunk-3UJV2MM3.js.map
