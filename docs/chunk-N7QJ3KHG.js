import {
  isPlatformBrowser
} from "./chunk-X2X7GTPW.js";
import {
  InjectionToken,
  PLATFORM_ID,
  computed,
  inject
} from "./chunk-IYCVPBRB.js";

// src/app/shared/helpers/match-media.helper.ts
var IS_MOBILE_MEDIA_MATCHED = new InjectionToken("mediaMobMax", {
  factory: () => {
    const isBrowser = isPlatformBrowser(inject(PLATFORM_ID));
    return (breakpoint = 768) => {
      if (isBrowser) {
        return window.matchMedia(`(max-width: ${breakpoint}px)`).matches;
      } else {
        return false;
      }
    };
  }
});
var IS_PWA = new InjectionToken("isPWA", {
  factory: () => {
    const isBrowser = isPlatformBrowser(inject(PLATFORM_ID));
    if (!isBrowser) {
      return computed(() => false);
    }
    return computed(() => {
      return window.matchMedia("(display-mode: standalone)").matches || window.navigator["standalone"] === true;
    });
  }
});

export {
  IS_MOBILE_MEDIA_MATCHED,
  IS_PWA
};
//# sourceMappingURL=chunk-N7QJ3KHG.js.map
