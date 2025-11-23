import {inject, Injectable, signal} from '@angular/core';
import {WINDOW} from '../../../shared/service/tokens/window.token';

export interface StorageQuotaSnapshot {
  timestamp: number;
  supported: {
    storageEstimate: boolean;
    indexedDB: boolean;
    localStorage: boolean;
  };
  total: {
    usageBytes: number | null;
    quotaBytes: number | null;
    availableBytes: number | null;
  };
  indexedDb: {
    usageBytes: number | null;
  };
  localStorage: {
    usageBytes: number;
    quotaBytesApprox: number;
    availableBytesApprox: number;
  };
}

@Injectable({providedIn: 'root'})
export class StorageQuotaService {
  constructor() {
    this.refresh();
  }

  private static readonly DEFAULT_LOCAL_STORAGE_QUOTA_BYTES = 5 * 1024 * 1024; // ~5MB
  private readonly _window = inject(WINDOW);
  private readonly snapshotSignal = signal<StorageQuotaSnapshot>({
    timestamp: Date.now(),
    supported: this._window ? {
      storageEstimate: typeof this._window.navigator !== 'undefined' && !!this._window.navigator.storage && !!this._window.navigator.storage.estimate,
      indexedDB: typeof this._window.indexedDB !== 'undefined',
      localStorage: typeof this._window.localStorage !== 'undefined',
    } : {
      storageEstimate: false,
      indexedDB: false,
      localStorage: false,
    },
    total: {usageBytes: null, quotaBytes: null, availableBytes: null},
    indexedDb: {usageBytes: null},
    localStorage: {
      usageBytes: 0,
      quotaBytesApprox: StorageQuotaService.DEFAULT_LOCAL_STORAGE_QUOTA_BYTES,
      availableBytesApprox: StorageQuotaService.DEFAULT_LOCAL_STORAGE_QUOTA_BYTES,
    },
  });

  get snapshot() {
    return this.snapshotSignal;
  }

  async refresh(): Promise<void> {
    await Promise.all([this.refreshEstimatePart(), this.refreshLocalStoragePart()]);
  }

  // No periodic tracking by design; call refresh() manually when needed

  private async refreshEstimatePart(): Promise<void> {
    const supportsEstimate = typeof this._window?.navigator !== 'undefined' && !!this._window.navigator.storage && !!this._window.navigator.storage.estimate;

    if (!supportsEstimate) {
      this.snapshotSignal.update((prev) => ({
        ...prev,
        timestamp: Date.now(),
        supported: {...prev.supported, storageEstimate: false},
        total: {usageBytes: null, quotaBytes: null, availableBytes: null},
        indexedDb: {usageBytes: null},
      }));
      return;
    }

    try {
      const estimate = await this._window?.navigator.storage.estimate();
      const usage = estimate?.usage ?? null;
      const quota = estimate?.quota ?? null;
      const usageDetails: any = (estimate as any).usageDetails;
      const idbUsage = usageDetails?.['indexedDB'] ?? null;

      const available = usage != null && quota != null ? Math.max(quota - usage, 0) : null;

      this.snapshotSignal.update((prev) => ({
        ...prev,
        timestamp: Date.now(),
        supported: {...prev.supported, storageEstimate: true},
        total: {usageBytes: usage, quotaBytes: quota, availableBytes: available},
        indexedDb: {usageBytes: idbUsage},
      }));
    } catch {
      this.snapshotSignal.update((prev) => ({
        ...prev,
        timestamp: Date.now(),
        supported: {...prev.supported, storageEstimate: true},
        total: {usageBytes: null, quotaBytes: null, availableBytes: null},
        indexedDb: {usageBytes: null},
      }));
    }
  }

  private refreshLocalStoragePart(): void {
    const supportsLs = typeof this._window?.localStorage !== 'undefined';
    if (!supportsLs) {
      this.snapshotSignal.update((prev) => ({
        ...prev,
        timestamp: Date.now(),
        supported: {...prev.supported, localStorage: false},
        localStorage: {
          usageBytes: 0,
          quotaBytesApprox: StorageQuotaService.DEFAULT_LOCAL_STORAGE_QUOTA_BYTES,
          availableBytesApprox: StorageQuotaService.DEFAULT_LOCAL_STORAGE_QUOTA_BYTES,
        },
      }));
      return;
    }

    const usageBytes = this.computeLocalStorageUsageBytesSafely();
    const quotaBytesApprox = StorageQuotaService.DEFAULT_LOCAL_STORAGE_QUOTA_BYTES;
    const availableBytesApprox = Math.max(quotaBytesApprox - usageBytes, 0);

    this.snapshotSignal.update((prev) => ({
      ...prev,
      timestamp: Date.now(),
      supported: {...prev.supported, localStorage: true},
      localStorage: {usageBytes, quotaBytesApprox, availableBytesApprox},
    }));
  }

  private computeLocalStorageUsageBytesSafely(): number {
    try {
      if (!this._window) {
        return 0;
      }
      const encoder = typeof TextEncoder !== 'undefined' ? new TextEncoder() : null;
      let bytes = 0;
      for (let i = 0; i < this._window.localStorage.length; i++) {
        const key = this._window.localStorage.key(i);
        if (!key) continue;
        const value = this._window.localStorage.getItem(key) ?? '';
        if (encoder) {
          // Count both key and value bytes
          bytes += encoder.encode(key).length + encoder.encode(value).length;
        } else {
          // Fallback rough estimate (2 bytes per char)
          bytes += (key.length + value.length) * 2;
        }
      }
      return bytes;
    } catch {
      return 0;
    }
  }
}


