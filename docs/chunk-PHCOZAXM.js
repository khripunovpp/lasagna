import {
  toSignal
} from "./chunk-AWZMWU52.js";
import {
  ActivatedRoute,
  NavigationEnd
} from "./chunk-L34DFTMV.js";
import {
  assertInInjectionContext,
  filter,
  inject,
  map,
  pairwise,
  startWith,
  take,
  tap
} from "./chunk-IYCVPBRB.js";

// src/app/shared/helpers/route.helpers.ts
function injectParams(keyOrTransform) {
  assertInInjectionContext(injectParams);
  const route = inject(ActivatedRoute);
  if (typeof keyOrTransform === "function") {
    return toSignal(route.params.pipe(map(keyOrTransform)), { requireSync: true });
  }
  const getParam = (params) => keyOrTransform ? params?.[keyOrTransform] ?? null : params;
  return toSignal(route.params.pipe(map(getParam)), { requireSync: true });
}
function injectQueryParams(keyOrTransform) {
  assertInInjectionContext(injectParams);
  const route = inject(ActivatedRoute);
  if (typeof keyOrTransform === "function") {
    return toSignal(route.queryParams.pipe(map(keyOrTransform)), { requireSync: true });
  }
  const getParam = (params) => keyOrTransform ? params?.[keyOrTransform] ?? null : params;
  return toSignal(route.queryParams.pipe(map(getParam)), { requireSync: true });
}
function injectFragment() {
  assertInInjectionContext(injectFragment);
  const route = inject(ActivatedRoute);
  return toSignal(route.fragment.pipe(take(1)));
}
function routeChangeSignal(router, compareStrictly = true) {
  return toSignal(router.events.pipe(filter((event) => event instanceof NavigationEnd), startWith({ url: "" }), map((event) => {
    const url = event.url;
    return String(compareStrictly ? url : url.split("?")[0].split("#")[0]);
  }), pairwise(), filter((urls) => urls[0] !== urls[1]), tap((event) => console.log("Router event:", event))));
}
var getURLWithoutParams = (url) => {
  return url.split("?")[0].split("#")[0];
};
var findRouteData = (route) => {
  let currentRoute = route;
  while (currentRoute) {
    if (currentRoute.snapshot.data && Object.keys(currentRoute.snapshot.data).length > 0) {
      return currentRoute.snapshot.data;
    }
    if (currentRoute.firstChild) {
      currentRoute = currentRoute.firstChild;
    } else {
      break;
    }
  }
  return {};
};

export {
  injectParams,
  injectQueryParams,
  injectFragment,
  routeChangeSignal,
  getURLWithoutParams,
  findRouteData
};
//# sourceMappingURL=chunk-PHCOZAXM.js.map
