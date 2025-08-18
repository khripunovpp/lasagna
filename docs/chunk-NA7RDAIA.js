import {
  Tax
} from "./chunk-3FS5QDEG.js";
import {
  DexieIndexDbService,
  Stores
} from "./chunk-CTLQRZYU.js";
import {
  Injectable,
  setClassMetadata,
  ɵɵdefineInjectable,
  ɵɵinject
} from "./chunk-UQVCVPTQ.js";

// src/app/features/settings/service/repositories/taxes.repository.ts
var TaxesRepository = class _TaxesRepository {
  _indexDbService;
  constructor(_indexDbService) {
    this._indexDbService = _indexDbService;
  }
  addOne(tax) {
    return this._indexDbService.addData(Stores.TAXES, tax.toDTO());
  }
  updateOne(uuid, tax) {
    return this._indexDbService.replaceData(Stores.TAXES, uuid, tax.toDTO());
  }
  async getOne(uuid) {
    return new Promise(async (resolve, reject) => {
      uuid = typeof uuid === "string" ? uuid : uuid.uuid;
      if (!uuid) {
        resolve(void 0);
        return;
      }
      await this._indexDbService.getOne(Stores.TAXES, uuid).then((result) => {
        resolve(Tax.fromRaw(result));
      });
    });
  }
  getAll() {
    return this._indexDbService.getAll(Stores.TAXES).then((taxes) => taxes.map((tax) => Tax.fromRaw(tax)));
  }
  addMany(taxes) {
    return this._indexDbService.balkAdd(Stores.TAXES, taxes.map((tax) => tax.toDTO()), false);
  }
  deleteOne(uuid) {
    return this._indexDbService.remove(Stores.TAXES, uuid);
  }
  static \u0275fac = function TaxesRepository_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _TaxesRepository)(\u0275\u0275inject(DexieIndexDbService));
  };
  static \u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _TaxesRepository, factory: _TaxesRepository.\u0275fac, providedIn: "root" });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(TaxesRepository, [{
    type: Injectable,
    args: [{
      providedIn: "root"
    }]
  }], () => [{ type: DexieIndexDbService }], null);
})();

export {
  TaxesRepository
};
//# sourceMappingURL=chunk-NA7RDAIA.js.map
