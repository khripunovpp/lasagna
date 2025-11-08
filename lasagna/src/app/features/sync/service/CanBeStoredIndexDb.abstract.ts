export abstract class CanBeStoredIndexDbAbstract {
  updatedAt?: number | undefined;
  createdAt?: number | undefined;
  deletedAt?: number | undefined;
  deleted?: boolean | undefined;
  uuid?: string | undefined;

  toDTO(): any {
  }

  update(
    dto: any,
  ) {
  }


  markAsDeleted() {
    this.updatedAt = Date.now();
    this.deleted = true;
    this.deletedAt = this.updatedAt;
  }
}

