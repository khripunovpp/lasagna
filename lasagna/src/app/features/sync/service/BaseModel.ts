import {CanSync} from './CanSync.abstract';
import {CanBeStoredIndexDbAbstract} from './CanBeStoredIndexDb.abstract';

export abstract class BaseModel
  implements CanSync, CanBeStoredIndexDbAbstract {
  syncedAt?: number | undefined;
  updatedAt?: number | undefined;
  createdAt?: number | undefined;
  cloud_uuid?: string | undefined;
  uuid?: string | undefined;
  dirtyToSync?: boolean;
  deleted?: boolean | undefined;
  deletedAt?: number | undefined;

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
    this.dirtyToSync = true;
  }

  markAsDeleted() {
    this.updatedAt = Date.now();
    this.deleted = true;
    this.deletedAt = this.updatedAt;
    this.markAsNeedSync();
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
    doNotMarkDirty: boolean = false,
  ) {
    this.updatedAt = dto?.updatedAt || Date.now();
    this.createdAt = dto?.createdAt
      ? Number(dto.createdAt)
      : this.createdAt;
    this.syncedAt = dto?.syncedAt
      ? Number(dto.syncedAt)
      : this.syncedAt;
    this.cloud_uuid = dto?.cloud_uuid || this.cloud_uuid;
    this.uuid = dto?.uuid || this.uuid;
    this.deleted = parseInt(dto?.deleted) === 1 ? true : this.deleted;
    this.deletedAt = dto?.deletedAt
      ? Number(dto.deletedAt)
      : this.deletedAt;

    if (doNotMarkDirty) return;
    this.markAsNeedSync();
  }

  toCloudDTO() {
    return {
      uuid: this.uuid,
      deleted: this.deleted ? 1 : 0,
      deletedAt: this.deletedAt,
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
      deleted: this.deleted ? 1 : 0,
      deletedAt: this.deletedAt,
    };
  }

  invalidateSync() {
    this.syncedAt = undefined;
    this.cloud_uuid = undefined;
    this.dirtyToSync = true;
  }
}
