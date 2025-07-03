
export type ActionType = 'add' | 'subtract' | 'round';
export type UnitType = 'currency' | 'percent';
export type ModifierType = 'per_unit' | 'total';

export abstract class BasePriceModifier {
  abstract action: ActionType;
  abstract unit: UnitType;
  abstract value: number;
  abstract type: ModifierType;

  abstract apply(...args: any[]): number;
}
