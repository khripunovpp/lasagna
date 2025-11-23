import {
  WINDOW
} from "./chunk-CFXQGSQM.js";
import {
  effect,
  inject,
  signal
} from "./chunk-IYCVPBRB.js";

// src/app/shared/view/signals/match-media.signal.ts
function matchMediaSignal(width, direction = "max") {
  const windowRef = inject(WINDOW);
  if (!windowRef) {
    return signal(false);
  }
  const result = signal(false, ...ngDevMode ? [{ debugName: "result" }] : []);
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
//# sourceMappingURL=chunk-443BUU7J.js.map
