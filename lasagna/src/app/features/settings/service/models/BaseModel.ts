import {CanSync} from './Syncable.abstract';
import {CanBeStoredIndexDbAbstract} from './CanBeStoredIndexDb.abstract';

export abstract class BaseModel
  implements CanSync, CanBeStoredIndexDbAbstract {
  syncedAt?: number | undefined;
  updatedAt?: number | undefined;
  createdAt?: number | undefined;
  cloud_uuid?: string | undefined;
  uuid?: string | undefined;
  dirtyToSync?: boolean;

  markAsSynced(
    cloud_uuid?: string,
  ) {
    this.dirtyToSync = false;
    this.syncedAt = Date.now();
    this.updatedAt = this.syncedAt;
    if (!cloud_uuid) return;
    this.cloud_uuid = cloud_uuid;
  }

  markAsNeedSync() {
    this.dirtyToSync = true;
  }

  needSync() {
    if (!this.syncedAt || !this.cloud_uuid || this.dirtyToSync) return true;
    const updatedAt = new Date(this.updatedAt || Date.now());
    const syncedAt = new Date(this.syncedAt || Date.now());
    const diff = updatedAt.getTime() - syncedAt.getTime();
    const diffInSeconds = Math.floor(diff / 1000);

    return this.updatedAt
      ? (diffInSeconds < 0 && diffInSeconds < -(60 * 60 * 24 * 7))
      : true;
  }

  update(
    dto: any,
  ) {
    this.markAsNeedSync();
  }

  toCloudDTO() {
    return {
      syncedAt: this.syncedAt,
      updatedAt: this.updatedAt,
      cloud_uuid: this.cloud_uuid,
      clientId: this.uuid,
    };
  }

  toDTO(): Record<any, any> {
    return {
      syncedAt: this.syncedAt,
      updatedAt: this.updatedAt,
      createdAt: this.createdAt,
      cloud_uuid: this.cloud_uuid,
      uuid: this.uuid,
      dirtyToSync: this.dirtyToSync,
    };
  }

  invalidateSync() {
    this.syncedAt = undefined;
    this.cloud_uuid = undefined;
    this.dirtyToSync = true;
  }
}
