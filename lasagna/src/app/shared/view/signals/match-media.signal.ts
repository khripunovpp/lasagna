import {effect, inject, signal} from '@angular/core';
import {WINDOW} from '../../service/tokens/window.token';

export function matchMediaSignal(
    width: number,
    direction: 'max' | 'min' = 'max'
) {
  const windowRef = inject(WINDOW);
  if (!windowRef) {
    return signal<boolean>(false);
  }
  const result = signal<boolean>(false);

  const query = `(${direction}-width: ${direction === 'min' ? width + 1 : width}px)`;
  const mediaQuery = windowRef.matchMedia(query);

  result.set(mediaQuery.matches);

  const listener = (e: MediaQueryListEvent) => {
    result.set(e.matches);
  };

  mediaQuery.addEventListener('change', listener);

  effect(() => {
    return () => {
      mediaQuery.removeEventListener('change', listener);
    };
  });

  return result;
}
