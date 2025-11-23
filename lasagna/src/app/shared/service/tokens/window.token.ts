import {inject, InjectionToken, PLATFORM_ID} from '@angular/core';
import {isPlatformBrowser} from '@angular/common';

export const WINDOW = new InjectionToken<(Window & Record<string, unknown>) | undefined>('WindowToken', {
  providedIn: 'root',
  factory: () => {
    const isBrowser = isPlatformBrowser(inject(PLATFORM_ID));
    if (!isBrowser) {
      return undefined
    }
    return typeof window !== 'undefined'
      ? window as any
      : undefined
  }
});
