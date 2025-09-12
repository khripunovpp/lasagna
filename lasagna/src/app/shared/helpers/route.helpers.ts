import {assertInInjectionContext, computed, inject, signal, Signal} from '@angular/core';
import {ActivatedRoute, NavigationEnd, Params, Router} from '@angular/router';
import {toSignal} from '@angular/core/rxjs-interop';
import {filter, map, pairwise, take} from 'rxjs';

export function injectParams<T = Params | string | null>(
  keyOrTransform?: string | ((params: Params) => T),
): Signal<T> {
  assertInInjectionContext(injectParams);
  const route = inject(ActivatedRoute);

  if (typeof keyOrTransform === 'function') {
    return toSignal(route.params.pipe(map(keyOrTransform)), {requireSync: true});
  }

  const getParam = (params: Params) =>
    keyOrTransform ? params?.[keyOrTransform] ?? null : params;

  return toSignal(route.params.pipe(map(getParam)), {requireSync: true});
}

export function injectQueryParams<T = Params | string | null>(
  keyOrTransform?: string | ((params: Params) => T),
): Signal<T> {
  assertInInjectionContext(injectParams);
  const route = inject(ActivatedRoute);

  if (typeof keyOrTransform === 'function') {
    return toSignal(route.queryParams.pipe(map(keyOrTransform)), {requireSync: true});
  }

  const getParam = (params: Params) =>
    keyOrTransform ? params?.[keyOrTransform] ?? null : params;

  return toSignal(route.queryParams.pipe(map(getParam)), {requireSync: true});
}

export function injectFragment() {
  assertInInjectionContext(injectFragment);
  const route = inject(ActivatedRoute);

  return toSignal(route.fragment.pipe(take(1)));
}

/**
 * Фабрика для создания сигнала, который отслеживает изменения маршрута.
 * @param router
 * @param compareStrictly - если true, сравнивает URL строго с учетом параметров
 */
export function routeChangeSignal(
  router: Router,
  compareStrictly: boolean = true,
) {
  const routes = signal<[string | null, string | null]>(['', '']);

  router.events.pipe(
    filter(event => event instanceof NavigationEnd),
    map(event => {
      const url = (event as NavigationEnd).url;

      return compareStrictly
        ? url
        : url.split('?')[0].split('#')[0]
    }),
    pairwise(),
  ).subscribe((urls) => {
    if (urls[0] !== urls[1]) {
      routes.set(urls);
    }
  });

  return computed(() => routes());
}

export const getURLWithoutParams = (url: string): string => {
  return url.split('?')[0].split('#')[0];
}

export const findRouteData = (route: ActivatedRoute): any => {
  let currentRoute = route;

  // Идем по всему дереву маршрутов и собираем все данные
  while (currentRoute) {
    if (currentRoute.snapshot.data && Object.keys(currentRoute.snapshot.data).length > 0) {
      return currentRoute.snapshot.data;
    }

    // Переходим к дочернему маршруту
    if (currentRoute.firstChild) {
      currentRoute = currentRoute.firstChild;
    } else {
      break;
    }
  }

  return {};
};
