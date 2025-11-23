import {
  isPlatformBrowser
} from "./chunk-X2X7GTPW.js";
import {
  InjectionToken,
  PLATFORM_ID,
  inject
} from "./chunk-IYCVPBRB.js";

// src/app/shared/service/tokens/window.token.ts
var WINDOW = new InjectionToken("WindowToken", {
  providedIn: "root",
  factory: () => {
    const isBrowser = isPlatformBrowser(inject(PLATFORM_ID));
    if (!isBrowser) {
      return void 0;
    }
    return typeof window !== "undefined" ? window : void 0;
  }
});

export {
  WINDOW
};
//# sourceMappingURL=chunk-CFXQGSQM.js.map
