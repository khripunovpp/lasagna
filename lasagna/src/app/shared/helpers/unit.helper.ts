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

export const unitMarkersMap: Record<string, string> = {
  [UnitValue.GRAM]: marker('unit.gram'),
  [UnitValue.KILOGRAM]: marker('unit.kilogram'),
  [UnitValue.PIECE]: marker('unit.piece'),
};

export const getUnitMarker = (unit: string | undefined): string => {
  return unit
    ? unitMarkersMap[unit] || unit
    : marker('unit.unknown');
}
