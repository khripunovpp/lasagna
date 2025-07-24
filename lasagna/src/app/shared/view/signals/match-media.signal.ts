import {effect, signal} from '@angular/core';

export function matchMediaSignal(
    width: number,
    direction: 'max' | 'min' = 'max'
) {
  const windowRef = window;
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
