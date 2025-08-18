import { Injectable, signal } from '@angular/core';

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

@Injectable({ providedIn: 'root' })
export class StorageQuotaService {
  private static readonly DEFAULT_LOCAL_STORAGE_QUOTA_BYTES = 5 * 1024 * 1024; // ~5MB

  private readonly snapshotSignal = signal<StorageQuotaSnapshot>({
    timestamp: Date.now(),
    supported: {
      storageEstimate: typeof navigator !== 'undefined' && !!navigator.storage && !!navigator.storage.estimate,
      indexedDB: typeof indexedDB !== 'undefined',
      localStorage: typeof localStorage !== 'undefined',
    },
    total: { usageBytes: null, quotaBytes: null, availableBytes: null },
    indexedDb: { usageBytes: null },
    localStorage: {
      usageBytes: 0,
      quotaBytesApprox: StorageQuotaService.DEFAULT_LOCAL_STORAGE_QUOTA_BYTES,
      availableBytesApprox: StorageQuotaService.DEFAULT_LOCAL_STORAGE_QUOTA_BYTES,
    },
  });

  constructor() {
    this.refresh();
  }

  get snapshot() {
    return this.snapshotSignal;
  }

  async refresh(): Promise<void> {
    await Promise.all([this.refreshEstimatePart(), this.refreshLocalStoragePart()]);
  }

  // No periodic tracking by design; call refresh() manually when needed

  private async refreshEstimatePart(): Promise<void> {
    const supportsEstimate = typeof navigator !== 'undefined' && !!navigator.storage && !!navigator.storage.estimate;

    if (!supportsEstimate) {
      this.snapshotSignal.update((prev) => ({
        ...prev,
        timestamp: Date.now(),
        supported: { ...prev.supported, storageEstimate: false },
        total: { usageBytes: null, quotaBytes: null, availableBytes: null },
        indexedDb: { usageBytes: null },
      }));
      return;
    }

    try {
      const estimate = await navigator.storage.estimate();
      const usage = estimate.usage ?? null;
      const quota = estimate.quota ?? null;
      const usageDetails: any = (estimate as any).usageDetails;
      const idbUsage = usageDetails?.['indexedDB'] ?? null;

      const available = usage != null && quota != null ? Math.max(quota - usage, 0) : null;

      this.snapshotSignal.update((prev) => ({
        ...prev,
        timestamp: Date.now(),
        supported: { ...prev.supported, storageEstimate: true },
        total: { usageBytes: usage, quotaBytes: quota, availableBytes: available },
        indexedDb: { usageBytes: idbUsage },
      }));
    } catch {
      this.snapshotSignal.update((prev) => ({
        ...prev,
        timestamp: Date.now(),
        supported: { ...prev.supported, storageEstimate: true },
        total: { usageBytes: null, quotaBytes: null, availableBytes: null },
        indexedDb: { usageBytes: null },
      }));
    }
  }

  private refreshLocalStoragePart(): void {
    const supportsLs = typeof localStorage !== 'undefined';
    if (!supportsLs) {
      this.snapshotSignal.update((prev) => ({
        ...prev,
        timestamp: Date.now(),
        supported: { ...prev.supported, localStorage: false },
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
      supported: { ...prev.supported, localStorage: true },
      localStorage: { usageBytes, quotaBytesApprox, availableBytesApprox },
    }));
  }

  private computeLocalStorageUsageBytesSafely(): number {
    try {
      const encoder = typeof TextEncoder !== 'undefined' ? new TextEncoder() : null;
      let bytes = 0;
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (!key) continue;
        const value = localStorage.getItem(key) ?? '';
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


