import {
  DexieIndexDbService,
  HttpClient,
  Stores,
  USER_LANGUAGE
} from "./chunk-GF4GEWLC.js";
import {
  BehaviorSubject,
  Injectable,
  firstValueFrom,
  inject,
  setClassMetadata,
  ɵɵdefineInjectable,
  ɵɵinject
} from "./chunk-KM6KLH7M.js";
import {
  __spreadProps,
  __spreadValues
} from "./chunk-46DXP6YY.js";

// src/app/shared/service/services/docs.service.ts
var DocsService = class _DocsService {
  _http;
  _indexedDB;
  constructor(_http, _indexedDB) {
    this._http = _http;
    this._indexedDB = _indexedDB;
  }
  orderTitles = {
    "getting-started": 1,
    "invoices": 4,
    "settings": 5,
    "recipes": 3,
    "storage": 2
  };
  _userLang = inject(USER_LANGUAGE);
  docs$ = new BehaviorSubject([]);
  tree$ = new BehaviorSubject([]);
  async init() {
    try {
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
        const docsRecords = await this._getStoredDocs();
        this.tree$.next(docsRecords.tree);
        this.docs$.next(docsRecords.docs);
      }
    } catch (error) {
      console.error("Failed to initialize docs service:", error);
    }
  }
  filterLanguage(node, lang) {
    if (node.language && node.language !== lang) {
      return null;
    }
    if (node.type === "file") {
      return node;
    }
    const filteredChildren = (node.children || []).reduce((acc, child) => {
      const filteredChild = this.filterLanguage(child, lang);
      if (filteredChild) {
        acc.push(filteredChild);
      }
      return acc;
    }, []);
    if (filteredChildren.length > 0) {
      return __spreadProps(__spreadValues({}, node), {
        children: filteredChildren.toSorted((a, b) => {
          return (a.order || 0) - (b.order || 0);
        })
      });
    }
    return null;
  }
  getDocsView() {
    return this.docs$.getValue();
  }
  getDocs() {
    return this.docs$.asObservable();
  }
  getTree() {
    return this.tree$.asObservable();
  }
  async getDocByPath(path) {
  }
  async _getStoredDocs() {
    const docsRecords = await this._indexedDB.getAll(Stores.DOCUMENTATION);
    const tree = (docsRecords?.find((item) => item.key === "tree")?.value.reduce((acc, item) => {
      const filteredNode = this.filterLanguage(item, this._userLang());
      if (filteredNode) {
        acc.push(filteredNode);
      }
      return acc;
    }, []) || []).toSorted((a, b) => (this.orderTitles[a.name || ""] || 0) - (this.orderTitles[b.name || ""] || 0));
    const docs = docsRecords?.find((item) => item.key === "data")?.value;
    return {
      tree,
      docs
    };
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
//# sourceMappingURL=chunk-HRKLZBBB.js.map
