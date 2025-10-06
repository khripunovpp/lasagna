import {SyncTransactionResult} from "./estimate-sync-changes-transaction";

export interface SyncStrategy {
  prepareSyncData(): Promise<any[]>;
  markAllAsSynced(items: any[]): Promise<void>;
  getSyncStatus(): Promise<{ total: number; synced: number; notSynced: number; lastSync: number | null }>;
  getEntities(serverData: any[], localData: any[]): Promise<SyncTransactionResult>;
}
