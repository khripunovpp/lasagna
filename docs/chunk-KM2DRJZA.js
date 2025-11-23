import {
  Injectable,
  ReplaySubject,
  setClassMetadata,
  shareReplay,
  signal,
  ɵɵdefineInjectable
} from "./chunk-IYCVPBRB.js";

// src/app/shared/service/services/selection-zone.service.ts
var SelectionZoneService = class _SelectionZoneService {
  constructor() {
  }
  selectionMode = signal("default", ...ngDevMode ? [{ debugName: "selectionMode" }] : []);
  selectAll = signal(false, ...ngDevMode ? [{ debugName: "selectAll" }] : []);
  deselectAll = signal(false, ...ngDevMode ? [{ debugName: "deselectAll" }] : []);
  selected = signal(/* @__PURE__ */ new Set(), ...ngDevMode ? [{ debugName: "selected" }] : []);
  selectedData = signal(/* @__PURE__ */ new Map(), ...ngDevMode ? [{ debugName: "selectedData" }] : []);
  deleteAll = signal(false, ...ngDevMode ? [{ debugName: "deleteAll" }] : []);
  deleteSelected = signal(false, ...ngDevMode ? [{ debugName: "deleteSelected" }] : []);
  _deleteSubject = new ReplaySubject();
  get onDelete() {
    return this._deleteSubject.asObservable().pipe(shareReplay(1));
  }
  onSelection() {
    this.selectionMode.set(this.selectionMode() === "default" ? "selection" : "default");
    this.selected.set(/* @__PURE__ */ new Set());
    this.selectedData.set(/* @__PURE__ */ new Map());
  }
  onAllSelection() {
    this.selectAll.set(true);
    this.deselectAll.set(false);
  }
  onDeselectAll() {
    this.selectAll.set(false);
    this.deselectAll.set(true);
  }
  onDeleteAll() {
    this.deleteAll.set(true);
    this.deleteSelected.set(false);
  }
  onDeleteSelected() {
    this.deleteAll.set(false);
    this.deleteSelected.set(true);
  }
  putSelected(selected) {
    const [checked, uuid, data] = selected;
    this.selected.update((value) => {
      if (checked) {
        value.add(uuid);
        this.selectedData().set(uuid, data);
      } else {
        value.delete(uuid);
        this.selectedData().delete(uuid);
      }
      return value;
    });
  }
  putDelete(key, data) {
    this._deleteSubject.next([key, data]);
  }
  static \u0275fac = function SelectionZoneService_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _SelectionZoneService)();
  };
  static \u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _SelectionZoneService, factory: _SelectionZoneService.\u0275fac });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(SelectionZoneService, [{
    type: Injectable
  }], () => [], null);
})();

export {
  SelectionZoneService
};
//# sourceMappingURL=chunk-KM2DRJZA.js.map
