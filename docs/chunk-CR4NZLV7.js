import {
  computed
} from "./chunk-Z5TNFCCP.js";

// src/app/shared/helpers/match-media.helper.ts
var mediaMobMax = (breakpoint = 768) => {
  return window.matchMedia(`(max-width: ${breakpoint}px)`).matches;
};
var isPwa = computed(() => {
  return window.matchMedia("(display-mode: standalone)").matches || window.navigator["standalone"] === true;
}, ...ngDevMode ? [{ debugName: "isPwa" }] : []);

export {
  mediaMobMax,
  isPwa
};
//# sourceMappingURL=chunk-CR4NZLV7.js.map
