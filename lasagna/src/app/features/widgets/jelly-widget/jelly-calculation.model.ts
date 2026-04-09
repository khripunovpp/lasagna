export type JellyBaseType = 'powder' | 'leaf' | 'mass';

export const convertPairs: Partial<Record<
  JellyBaseType,
  Partial<Record<
    JellyBaseType,
    (amount: number, divisor: number) => number>
  >>> = {
  powder: {
    mass: (amount: number, jellyToWaterRatio: number) => {
      return amount * jellyToWaterRatio + amount;
    },
  },
  leaf: {
    mass: (amount: number, jellyToWaterRatio: number) => {
      return amount * jellyToWaterRatio + amount;
    },
  },
  mass: {
    powder: (amount: number, jellyToWaterRatio: number) => {
      return amount / (jellyToWaterRatio + 1);
    },
    leaf: (amount: number, jellyToWaterRatio: number) => {
      return amount / (jellyToWaterRatio + 1);
    },
  },
}
export const waterCalculationFromMass = (jellyAmount: number, ratio: number = 5) => {
  return jellyAmount * ratio;
}

export const waterCalculationToMass = (jellyAmount: number, ratio: number = 5) => {
  return jellyAmount * ratio / (ratio + 1);
}

export const getBloomRatio = (fromBloom: number, toBloom: number) => {
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
    const bloomRatio = getBloomRatio(this.bloom, bloomTo);
    const handlers = convertPairs[this.type];

    return (handlers?.[type]?.(amount, this.ratio) || amount) * bloomRatio;
  }

  getWaterIncluded(type: JellyBaseType, jellyAmount: number): number {
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
