import {
  DexieIndexDbService,
  HttpClient,
  Stores
} from "./chunk-UGLIF2MQ.js";
import {
  BehaviorSubject,
  Injectable,
  firstValueFrom,
  setClassMetadata,
  ɵɵdefineInjectable,
  ɵɵinject
} from "./chunk-6AETQSBA.js";

// src/app/shared/service/services/docs.service.ts
var DocsService = class _DocsService {
  _http;
  _indexedDB;
  constructor(_http, _indexedDB) {
    this._http = _http;
    this._indexedDB = _indexedDB;
  }
  docs$ = new BehaviorSubject([]);
  tree$ = new BehaviorSubject([]);
  async init() {
    const remoteMeta = await firstValueFrom(this._http.get("./docs/meta.json"));
    const localData = await this._indexedDB.getAll(Stores.DOCUMENTATION);
    const localMeta = localData?.find((item) => item.key === "meta")?.value;
    const needsUpdate = !localMeta || new Date(remoteMeta.updatedAt) > new Date(localMeta.updatedAt);
    if (needsUpdate) {
      const [data, tree] = await Promise.all([
        firstValueFrom(this._http.get("./docs/data.json")),
        firstValueFrom(this._http.get("./docs/tree.json"))
      ]);
      await this._indexedDB.balkAdd(Stores.DOCUMENTATION, [
        {
          key: "meta",
          value: remoteMeta
        },
        {
          key: "data",
          value: data
        },
        {
          key: "tree",
          value: tree
        }
      ]);
      this.docs$.next(data);
      this.tree$.next(tree);
    } else {
      const docsRecords = await this._indexedDB.getAll(Stores.DOCUMENTATION);
      const tree = docsRecords?.find((item) => item.key === "tree")?.value;
      const docs = docsRecords?.find((item) => item.key === "data")?.value;
      this.tree$.next(tree);
      this.docs$.next(docs);
    }
  }
  getDocs() {
    return this.docs$.asObservable();
  }
  getTree() {
    return this.tree$.asObservable();
  }
  async getDocByPath(path) {
  }
  static \u0275fac = function DocsService_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _DocsService)(\u0275\u0275inject(HttpClient), \u0275\u0275inject(DexieIndexDbService));
  };
  static \u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _DocsService, factory: _DocsService.\u0275fac, providedIn: "root" });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(DocsService, [{
    type: Injectable,
    args: [{ providedIn: "root" }]
  }], () => [{ type: HttpClient }, { type: DexieIndexDbService }], null);
})();

export {
  DocsService
};
//# sourceMappingURL=chunk-XLVGBYUT.js.map
