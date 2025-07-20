export abstract class CanBeStoredIndexDbAbstract {
  updatedAt?: number | undefined;

  toDTO():Record<any, any> {
    return {
      updatedAt: this.updatedAt,
    };
  }

  update(
    dto: any,
  ) {
  }

}

