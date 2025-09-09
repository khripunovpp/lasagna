import {
  computed
} from "./chunk-FOZDM4WI.js";

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
//# sourceMappingURL=chunk-LLE5CVLK.js.map
