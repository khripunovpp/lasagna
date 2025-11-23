import {
  DexieIndexDbService
} from "./chunk-QHJLSFIB.js";
import {
  WINDOW
} from "./chunk-CFXQGSQM.js";
import {
  HttpClient
} from "./chunk-VVQKNBNV.js";
import {
  Injectable,
  InjectionToken,
  firstValueFrom,
  inject,
  setClassMetadata,
  ɵɵdefineInjectable,
  ɵɵinject
} from "./chunk-IYCVPBRB.js";

// src/app/shared/service/tokens/demo-mode.token.ts
var DEMO_MODE = new InjectionToken("DEMO_MODE");

// src/app/shared/service/services/demo.service.ts
var DemoService = class _DemoService {
  _http;
  _dbService;
  constructor(_http, _dbService) {
    this._http = _http;
    this._dbService = _dbService;
  }
  isDemo = inject(DEMO_MODE);
  _window = inject(WINDOW);
  async loadDemoData() {
    try {
      if (!this.isDemo) {
        return;
      }
      if (this._window?.localStorage.getItem("demo_data_loaded") === "true") {
        console.log("Demo data already loaded");
        return;
      }
      const dump = await firstValueFrom(this._http.get("./dump/demo_dump.json"));
      await this._dbService.restoreAllData(dump);
      this._window?.localStorage.setItem("demo_data_loaded", "true");
      console.log({ dump });
    } catch (error) {
      console.error("Error loading demo data:", error);
      throw new Error("Failed to load demo data");
    }
  }
  switchOnDemoMode() {
    try {
      if (!this._window) {
        throw new Error("Window is not available");
      }
      this._window.localStorage.setItem("demo", "true");
      const url = new URL(this._window.location.href);
      url.searchParams.delete("demo");
      this._window.history.replaceState({}, "", url.toString());
      this._window?.location.reload();
    } catch (e) {
      console.error("Error switching to demo mode:", e);
    }
  }
  switchOffDemoMode() {
    try {
      this._window?.localStorage.removeItem("demo");
      this._window?.location.reload();
    } catch (e) {
      console.error("Error switching off demo mode:", e);
    }
  }
  static \u0275fac = function DemoService_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _DemoService)(\u0275\u0275inject(HttpClient), \u0275\u0275inject(DexieIndexDbService));
  };
  static \u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _DemoService, factory: _DemoService.\u0275fac, providedIn: "root" });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(DemoService, [{
    type: Injectable,
    args: [{
      providedIn: "root"
    }]
  }], () => [{ type: HttpClient }, { type: DexieIndexDbService }], null);
})();

export {
  DEMO_MODE,
  DemoService
};
//# sourceMappingURL=chunk-YWPUYK7V.js.map
