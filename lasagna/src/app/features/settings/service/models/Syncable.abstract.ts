export abstract class CanSync {
  syncedAt?: number | undefined;
  updatedAt?: number | undefined;
  cloud_uuid?: string | undefined;
  uuid?: string | undefined;
  dirtyToSync?: boolean;

  markAsSynced(
    cloud_uuid?: string,
    date: number = Date.now(),
  ) {
    this.syncedAt = date;
    this.dirtyToSync = false;
    this.updatedAt = this.syncedAt;
    if (!cloud_uuid) return;
    this.cloud_uuid = cloud_uuid;
  }

  markAsNeedSync() {
    this.syncedAt = undefined;
  }

  toCloudDTO() {
    return {
      syncedAt: this.syncedAt,
      updatedAt: this.updatedAt,
      cloud_uuid: this.cloud_uuid,
      clientId: this.uuid,
    };
  }

  update(
    dto: any,
  ) {
    this.markAsNeedSync();
  }

  invalidateSync() {
    this.syncedAt = undefined;
    this.cloud_uuid = undefined;
    this.dirtyToSync = true;
  }
}

