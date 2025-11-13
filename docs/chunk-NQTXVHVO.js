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

// src/app/features/documentation/service/faq.service.ts
var FaqService = class _FaqService {
  faqs$ = new BehaviorSubject([]);
  tree$ = new BehaviorSubject([]);
  _userLang = inject(USER_LANGUAGE);
  _sharedLoader = inject(SharedDocLoaderService);
  constructor() {
  }
  async init() {
    try {
      const { docs, tree } = await this._sharedLoader.load("./faq", Stores.FAQ);
      const filteredTree = this._filterLanguage(tree, this._userLang());
      this.tree$.next(filteredTree);
      this.faqs$.next(docs);
    } catch (e) {
      console.error("FaqService init failed", e);
    }
  }
  _filterLanguage(nodes, lang) {
    return nodes.map((node) => this._sharedLoader.filterLanguage(node, lang)).filter((n) => !!n);
  }
  getFaqs() {
    return this.faqs$.asObservable();
  }
  getTree() {
    return this.tree$.asObservable();
  }
  getFaqsView() {
    return this.faqs$.getValue();
  }
  static \u0275fac = function FaqService_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _FaqService)();
  };
  static \u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _FaqService, factory: _FaqService.\u0275fac, providedIn: "root" });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(FaqService, [{
    type: Injectable,
    args: [{ providedIn: "root" }]
  }], () => [], null);
})();

export {
  FaqService
};
//# sourceMappingURL=chunk-NQTXVHVO.js.map
