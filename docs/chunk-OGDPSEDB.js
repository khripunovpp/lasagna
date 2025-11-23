import {
  DexieIndexDbService
} from "./chunk-QHJLSFIB.js";
import {
  HttpClient
} from "./chunk-VVQKNBNV.js";
import {
  Injectable,
  firstValueFrom,
  setClassMetadata,
  ɵɵdefineInjectable,
  ɵɵinject
} from "./chunk-IYCVPBRB.js";
import {
  __spreadProps,
  __spreadValues
} from "./chunk-46DXP6YY.js";

// src/app/features/documentation/service/docs-loader.service.ts
var SharedDocLoaderService = class _SharedDocLoaderService {
  _http;
  _indexedDB;
  constructor(_http, _indexedDB) {
    this._http = _http;
    this._indexedDB = _indexedDB;
  }
  async load(sourcePath, storeKey) {
    const remoteMeta = await firstValueFrom(this._http.get(`${sourcePath}/meta.json`));
    const localData = await this._indexedDB.getAll(storeKey);
    const localMeta = localData?.find((item) => item.key === "meta")?.value;
    const needsUpdate = !localMeta || new Date(remoteMeta.updatedAt) > new Date(localMeta.updatedAt);
    if (needsUpdate) {
      const [data, tree] = await Promise.all([
        firstValueFrom(this._http.get(`${sourcePath}/data.json`)),
        firstValueFrom(this._http.get(`${sourcePath}/tree.json`))
      ]);
      await this._indexedDB.balkAdd(storeKey, [
        { key: "meta", value: remoteMeta },
        { key: "data", value: data },
        { key: "tree", value: tree }
      ]);
      return { docs: data, tree };
    } else {
      const docs = localData?.find((item) => item.key === "data")?.value || [];
      const tree = localData?.find((item) => item.key === "tree")?.value || [];
      return { docs, tree };
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
        children: filteredChildren.sort((a, b) => (a.order || 0) - (b.order || 0))
      });
    }
    return null;
  }
  static \u0275fac = function SharedDocLoaderService_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _SharedDocLoaderService)(\u0275\u0275inject(HttpClient), \u0275\u0275inject(DexieIndexDbService));
  };
  static \u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _SharedDocLoaderService, factory: _SharedDocLoaderService.\u0275fac, providedIn: "root" });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(SharedDocLoaderService, [{
    type: Injectable,
    args: [{ providedIn: "root" }]
  }], () => [{ type: HttpClient }, { type: DexieIndexDbService }], null);
})();

export {
  SharedDocLoaderService
};
//# sourceMappingURL=chunk-OGDPSEDB.js.map
