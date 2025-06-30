import {
  Credential
} from "./chunk-NDBDMDB3.js";
import {
  DexieIndexDbService,
  Stores
} from "./chunk-UGLIF2MQ.js";
import {
  Injectable,
  setClassMetadata,
  ɵɵdefineInjectable,
  ɵɵinject
} from "./chunk-6AETQSBA.js";

// src/app/features/settings/service/repositories/credentials.repository.ts
var CredentialsRepository = class _CredentialsRepository {
  _indexDbService;
  constructor(_indexDbService) {
    this._indexDbService = _indexDbService;
  }
  addOne(credential) {
    return this._indexDbService.addData(Stores.CREDENTIALS, credential.toDTO());
  }
  updateOne(uuid, credential) {
    return this._indexDbService.replaceData(Stores.CREDENTIALS, uuid, credential.toDTO());
  }
  updateMany(credentials) {
    return this._indexDbService.replaceManyData(Stores.CREDENTIALS, credentials.map((credential) => credential.toDTO()));
  }
  async getOne(uuid) {
    return new Promise(async (resolve, reject) => {
      uuid = typeof uuid === "string" ? uuid : uuid.uuid;
      if (!uuid) {
        resolve(void 0);
        return;
      }
      await this._indexDbService.getOne(Stores.CREDENTIALS, uuid).then((result) => {
        resolve(Credential.fromRaw(result));
      });
    });
  }
  getAll() {
    return this._indexDbService.getAll(Stores.CREDENTIALS).then((taxes) => taxes.map((credential) => Credential.fromRaw(credential)));
  }
  addMany(taxes) {
    return this._indexDbService.balkAdd(Stores.CREDENTIALS, taxes.map((credential) => credential.toDTO()), false);
  }
  deleteOne(uuid) {
    return this._indexDbService.remove(Stores.CREDENTIALS, uuid);
  }
  getAllByType(type) {
    return this._indexDbService.search(Stores.CREDENTIALS, "type", type).then((credentials) => credentials.map((credential) => Credential.fromRaw(credential)));
  }
  getAllSystemCredentials() {
    return this._indexDbService.search(Stores.CREDENTIALS, "type", "system").then((credentials) => credentials.map((credential) => Credential.fromRaw(credential)));
  }
  getAllCustomersCredentials() {
    return this._indexDbService.search(Stores.CREDENTIALS, "type", "customer").then((credentials) => credentials.map((credential) => Credential.fromRaw(credential)));
  }
  static \u0275fac = function CredentialsRepository_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _CredentialsRepository)(\u0275\u0275inject(DexieIndexDbService));
  };
  static \u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _CredentialsRepository, factory: _CredentialsRepository.\u0275fac, providedIn: "root" });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(CredentialsRepository, [{
    type: Injectable,
    args: [{
      providedIn: "root"
    }]
  }], () => [{ type: DexieIndexDbService }], null);
})();

export {
  CredentialsRepository
};
//# sourceMappingURL=chunk-D4V74QBD.js.map
