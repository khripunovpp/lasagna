export type JellyBaseType = 'powder' | 'leaf' | 'mass';

export const convertPairs: Partial<Record<JellyBaseType, Partial<Record<JellyBaseType, (amount: number) => number>>>> = {
  powder: {
    mass: (amount: number) => {
      return amount * 5 + amount;
    },
  },
  leaf: {
    mass: (amount: number) => {
      return amount * 5 + amount;
    },
  },
  mass: {
    powder: (amount: number) => {
      return amount / 6;
    },
    leaf: (amount: number) => {
      return amount / 6;
    },
  },
}
export const waterCalculationFromMass = (jellyAmount: number, ratio: number = 5) => {
  return jellyAmount * ratio;
}

export const waterCalculationToMass = (waterAmount: number, ratio: number = 5) => {
  return waterAmount * ratio / 6;
}

export const bloomRatio = (fromBloom: number, toBloom: number) => {
  return fromBloom / toBloom;
}

export class JellyCalculationModel {
  constructor(
    public type: JellyBaseType,
    public bloom: number = 1,
    public ratio: number = 5, // выбираем 1:5 или 1:6
  ) {
  }

  convertToBase(
    type: JellyBaseType,
    amount: number,
    bloomTo: number = 1,
  ): number {
    const ratio = bloomRatio(this.bloom, bloomTo);
    const handlers = convertPairs[this.type];
    return (handlers?.[type]?.(amount) || amount) * ratio;
  }

  convertToWater(type: JellyBaseType, jellyAmount: number): number {
    if (this.type === 'mass' && type === 'mass'
      || this.type === 'leaf'
      || type === 'leaf'
    ) {
      return 0
    }
    if (this.type === 'mass') {
      return waterCalculationFromMass(jellyAmount, this.ratio);
    } else if (type === 'mass') {
      return waterCalculationToMass(jellyAmount, this.ratio);
    }
    return 0;
  }
}
