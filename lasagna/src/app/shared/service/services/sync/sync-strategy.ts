export interface SyncStrategy {
  prepareSyncData(): Promise<any[]>;
  markAllAsSynced(items: any[]): Promise<void>;
  getSyncStatus(): Promise<{ total: number; synced: number; dirty: number; lastSync: number | null }>;
  syncFromCloud(serverData: any[], localData: any[]): Promise<void>;
}
