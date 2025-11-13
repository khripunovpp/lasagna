import {
  computed
} from "./chunk-RQATVJ2P.js";

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
//# sourceMappingURL=chunk-BO3IID47.js.map
