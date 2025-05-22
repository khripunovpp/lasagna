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

export const waterCalculationFromMass = (jellyAmount: number) => {
  return jellyAmount * 5;
}

export const waterCalculationToMass = (waterAmount: number) => {
  return waterAmount * 5 / 6;
}

export const bloomRatio = (fromBloom: number, toBloom: number) => {
  return fromBloom / toBloom;
}

export class JellyCalculationModel {
  constructor(
    public type: JellyBaseType,
    public bloom: number = 1,
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
      return waterCalculationFromMass(jellyAmount);
    } else if (type === 'mass') {
      return waterCalculationToMass(jellyAmount);
    }
    return 0;
  }
}
