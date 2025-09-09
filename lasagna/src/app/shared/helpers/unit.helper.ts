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

