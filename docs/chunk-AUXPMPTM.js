import {
  SharedDocLoaderService
} from "./chunk-I546HKDL.js";
import {
  Stores,
  USER_LANGUAGE
} from "./chunk-OOJ6JS4B.js";
import {
  BehaviorSubject,
  Injectable,
  inject,
  setClassMetadata,
  ɵɵdefineInjectable
} from "./chunk-RQATVJ2P.js";

// src/app/features/documentation/service/docs.service.ts
var DocsService = class _DocsService {
  constructor() {
  }
  orderTitles = {
    "getting-started": 1,
    "invoices": 4,
    "settings": 5,
    "recipes": 3,
    "storage": 2
  };
  docs$ = new BehaviorSubject([]);
  tree$ = new BehaviorSubject([]);
  _userLang = inject(USER_LANGUAGE);
  _sharedLoader = inject(SharedDocLoaderService);
  getDocsView() {
    return this.docs$.getValue();
  }
  async init() {
    try {
      const { docs, tree } = await this._sharedLoader.load("./docs", Stores.DOCUMENTATION);
      const filteredTree = this._filterLanguage(tree, this._userLang());
      this.tree$.next(this._sortTree(filteredTree));
      this.docs$.next(docs);
    } catch (e) {
      console.error("DocsService init failed", e);
    }
  }
  getDocs() {
    return this.docs$.asObservable();
  }
  getTree() {
    return this.tree$.asObservable();
  }
  _filterLanguage(nodes, lang) {
    return nodes.map((node) => this._sharedLoader.filterLanguage(node, lang)).filter((n) => !!n);
  }
  _sortTree(nodes) {
    return nodes.toSorted((a, b) => (this.orderTitles[a.name || ""] || 0) - (this.orderTitles[b.name || ""] || 0));
  }
  static \u0275fac = function DocsService_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _DocsService)();
  };
  static \u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _DocsService, factory: _DocsService.\u0275fac, providedIn: "root" });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(DocsService, [{
    type: Injectable,
    args: [{ providedIn: "root" }]
  }], () => [], null);
})();

export {
  DocsService
};
//# sourceMappingURL=chunk-AUXPMPTM.js.map
