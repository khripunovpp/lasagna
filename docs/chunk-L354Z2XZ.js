import {
  Injectable,
  setClassMetadata,
  signal,
  ɵɵdefineInjectable
} from "./chunk-IYCVPBRB.js";

// src/app/shared/view/ui/delete-confirmation-popover/delete-confirmation.service.ts
var DeleteConfirmationService = class _DeleteConfirmationService {
  settings = signal(null, ...ngDevMode ? [{ debugName: "settings" }] : []);
  configure({ onSuccess, onCancel, message, confirmText, cancelText, withLock }) {
    this.settings.set({ onSuccess, onCancel, message, confirmText, cancelText, withLock });
  }
  static \u0275fac = function DeleteConfirmationService_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _DeleteConfirmationService)();
  };
  static \u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _DeleteConfirmationService, factory: _DeleteConfirmationService.\u0275fac });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(DeleteConfirmationService, [{
    type: Injectable
  }], null, null);
})();

export {
  DeleteConfirmationService
};
//# sourceMappingURL=chunk-L354Z2XZ.js.map
