import {UnitValue} from '../view/const/units.const';
import {marker} from '@colsen1991/ngx-translate-extract-marker';

export const isWeightUnit = (unit: unknown): boolean => {
  return unit === 'gram'
    || unit === 'kilogram'
}

export const isCountUnit = (unit: unknown): boolean => {
  return unit === 'piece';
}

export const isKilogramUnit = (unit: unknown): boolean => {
  return unit === 'kilogram'
}

export const isGramUnit = (unit: unknown): boolean => {
  return unit === 'gram'
}

export const convertKilogramToGram = (amount: number): number => {
  return amount * 1000;
}

export const convertGramToKilogram = (amount: number): number => {
  if (amount == 0) return 0;
  return amount / 1000;
}

export const convertPriceOfGramToKilogram = (price: number): number => {
  return price * 1000;
}

export const convertPriceOfKilogramToGram = (price: number): number => {
  if (price == 0) return 0;
  return price / 1000;
}

export const pricePerGramFromPiece = (pricePerPiece: number, gramsPerPiece: number): number => {
  if (!gramsPerPiece || gramsPerPiece <= 0) return 0;
  return pricePerPiece / gramsPerPiece;
}

export const unitMarkersMap: Record<string, string> = {
  [UnitValue.GRAM]: marker('unit.gram'),
  [UnitValue.KILOGRAM]: marker('unit.kilogram'),
  [UnitValue.PIECE]: marker('unit.piece'),
  'portion': marker('unit.portion'),
};

export const unitMarkersSingularMap: Record<string, string> = {
  [UnitValue.GRAM]: marker('unit.gram.singular'),
  [UnitValue.KILOGRAM]: marker('unit.kilogram.singular'),
  [UnitValue.PIECE]: marker('unit.piece.singular'),
  'portion': marker('unit.portion.singular'),
};

export const unitMarkersPluralMap: Record<string, string> = {
  [UnitValue.GRAM]: marker('unit.gram.plural'),
  [UnitValue.KILOGRAM]: marker('unit.kilogram.plural'),
  [UnitValue.PIECE]: marker('unit.piece.plural'),
  'portion': marker('unit.portion.plural'),
};

export const getUnitMarker = (
  unit: string | undefined,
  count?: number,
): string => {
  if (!unit) return marker('unit.unknown');
  if (count === undefined) {
    return unitMarkersMap[unit] || unit;
  }
  const map = count == 1 ? unitMarkersSingularMap : unitMarkersPluralMap;
  return map[unit] || unitMarkersMap[unit] || unit;
}
