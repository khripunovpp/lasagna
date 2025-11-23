import {
  WINDOW
} from "./chunk-CFXQGSQM.js";
import {
  Injectable,
  inject,
  setClassMetadata,
  signal,
  ɵɵdefineInjectable
} from "./chunk-IYCVPBRB.js";
import {
  __spreadProps,
  __spreadValues
} from "./chunk-46DXP6YY.js";

// src/app/features/home/service/storage-quota.service.ts
var StorageQuotaService = class _StorageQuotaService {
  constructor() {
    this.refresh();
  }
  static DEFAULT_LOCAL_STORAGE_QUOTA_BYTES = 5 * 1024 * 1024;
  // ~5MB
  _window = inject(WINDOW);
  snapshotSignal = signal({
    timestamp: Date.now(),
    supported: this._window ? {
      storageEstimate: typeof this._window.navigator !== "undefined" && !!this._window.navigator.storage && !!this._window.navigator.storage.estimate,
      indexedDB: typeof this._window.indexedDB !== "undefined",
      localStorage: typeof this._window.localStorage !== "undefined"
    } : {
      storageEstimate: false,
      indexedDB: false,
      localStorage: false
    },
    total: { usageBytes: null, quotaBytes: null, availableBytes: null },
    indexedDb: { usageBytes: null },
    localStorage: {
      usageBytes: 0,
      quotaBytesApprox: _StorageQuotaService.DEFAULT_LOCAL_STORAGE_QUOTA_BYTES,
      availableBytesApprox: _StorageQuotaService.DEFAULT_LOCAL_STORAGE_QUOTA_BYTES
    }
  }, ...ngDevMode ? [{ debugName: "snapshotSignal" }] : []);
  get snapshot() {
    return this.snapshotSignal;
  }
  async refresh() {
    await Promise.all([this.refreshEstimatePart(), this.refreshLocalStoragePart()]);
  }
  // No periodic tracking by design; call refresh() manually when needed
  async refreshEstimatePart() {
    const supportsEstimate = typeof this._window?.navigator !== "undefined" && !!this._window.navigator.storage && !!this._window.navigator.storage.estimate;
    if (!supportsEstimate) {
      this.snapshotSignal.update((prev) => __spreadProps(__spreadValues({}, prev), {
        timestamp: Date.now(),
        supported: __spreadProps(__spreadValues({}, prev.supported), { storageEstimate: false }),
        total: { usageBytes: null, quotaBytes: null, availableBytes: null },
        indexedDb: { usageBytes: null }
      }));
      return;
    }
    try {
      const estimate = await this._window?.navigator.storage.estimate();
      const usage = estimate?.usage ?? null;
      const quota = estimate?.quota ?? null;
      const usageDetails = estimate.usageDetails;
      const idbUsage = usageDetails?.["indexedDB"] ?? null;
      const available = usage != null && quota != null ? Math.max(quota - usage, 0) : null;
      this.snapshotSignal.update((prev) => __spreadProps(__spreadValues({}, prev), {
        timestamp: Date.now(),
        supported: __spreadProps(__spreadValues({}, prev.supported), { storageEstimate: true }),
        total: { usageBytes: usage, quotaBytes: quota, availableBytes: available },
        indexedDb: { usageBytes: idbUsage }
      }));
    } catch {
      this.snapshotSignal.update((prev) => __spreadProps(__spreadValues({}, prev), {
        timestamp: Date.now(),
        supported: __spreadProps(__spreadValues({}, prev.supported), { storageEstimate: true }),
        total: { usageBytes: null, quotaBytes: null, availableBytes: null },
        indexedDb: { usageBytes: null }
      }));
    }
  }
  refreshLocalStoragePart() {
    const supportsLs = typeof this._window?.localStorage !== "undefined";
    if (!supportsLs) {
      this.snapshotSignal.update((prev) => __spreadProps(__spreadValues({}, prev), {
        timestamp: Date.now(),
        supported: __spreadProps(__spreadValues({}, prev.supported), { localStorage: false }),
        localStorage: {
          usageBytes: 0,
          quotaBytesApprox: _StorageQuotaService.DEFAULT_LOCAL_STORAGE_QUOTA_BYTES,
          availableBytesApprox: _StorageQuotaService.DEFAULT_LOCAL_STORAGE_QUOTA_BYTES
        }
      }));
      return;
    }
    const usageBytes = this.computeLocalStorageUsageBytesSafely();
    const quotaBytesApprox = _StorageQuotaService.DEFAULT_LOCAL_STORAGE_QUOTA_BYTES;
    const availableBytesApprox = Math.max(quotaBytesApprox - usageBytes, 0);
    this.snapshotSignal.update((prev) => __spreadProps(__spreadValues({}, prev), {
      timestamp: Date.now(),
      supported: __spreadProps(__spreadValues({}, prev.supported), { localStorage: true }),
      localStorage: { usageBytes, quotaBytesApprox, availableBytesApprox }
    }));
  }
  computeLocalStorageUsageBytesSafely() {
    try {
      if (!this._window) {
        return 0;
      }
      const encoder = typeof TextEncoder !== "undefined" ? new TextEncoder() : null;
      let bytes = 0;
      for (let i = 0; i < this._window.localStorage.length; i++) {
        const key = this._window.localStorage.key(i);
        if (!key)
          continue;
        const value = this._window.localStorage.getItem(key) ?? "";
        if (encoder) {
          bytes += encoder.encode(key).length + encoder.encode(value).length;
        } else {
          bytes += (key.length + value.length) * 2;
        }
      }
      return bytes;
    } catch {
      return 0;
    }
  }
  static \u0275fac = function StorageQuotaService_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _StorageQuotaService)();
  };
  static \u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _StorageQuotaService, factory: _StorageQuotaService.\u0275fac, providedIn: "root" });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(StorageQuotaService, [{
    type: Injectable,
    args: [{ providedIn: "root" }]
  }], () => [], null);
})();

export {
  StorageQuotaService
};
//# sourceMappingURL=chunk-RBDPPOGX.js.map
