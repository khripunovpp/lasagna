import {computed} from '@angular/core';

export const mediaMobMax = (
  breakpoint: string | number = 768
) => {
  return window.matchMedia(`(max-width: ${breakpoint}px)`).matches;
}

export const isPwa = computed(() => {
  return window.matchMedia('(display-mode: standalone)').matches
    || (window.navigator as any)['standalone'] === true;
});
