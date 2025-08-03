import {
  effect,
  signal
} from "./chunk-UQVCVPTQ.js";

// src/app/shared/view/signals/match-media.signal.ts
function matchMediaSignal(width, direction = "max") {
  const windowRef = window;
  const result = signal(false);
  const query = `(${direction}-width: ${direction === "min" ? width + 1 : width}px)`;
  const mediaQuery = windowRef.matchMedia(query);
  result.set(mediaQuery.matches);
  const listener = (e) => {
    result.set(e.matches);
  };
  mediaQuery.addEventListener("change", listener);
  effect(() => {
    return () => {
      mediaQuery.removeEventListener("change", listener);
    };
  });
  return result;
}

// src/app/shared/view/const/breakpoints.ts
var mobileBreakpoint = 768;

export {
  matchMediaSignal,
  mobileBreakpoint
};
//# sourceMappingURL=chunk-YIUZO3M7.js.map
