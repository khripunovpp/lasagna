import {assertInInjectionContext, inject, Signal} from '@angular/core';
import {ActivatedRoute, Params} from '@angular/router';
import {toSignal} from '@angular/core/rxjs-interop';
import {map} from 'rxjs';

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
