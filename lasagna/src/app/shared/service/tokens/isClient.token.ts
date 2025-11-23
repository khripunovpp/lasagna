import {inject, InjectionToken, PLATFORM_ID} from '@angular/core';
import {isPlatformBrowser} from '@angular/common';

export const IS_CLIENT = new InjectionToken<boolean>('indicates if the code is running on the client side', {
  providedIn: 'root',
  factory: () => isPlatformBrowser(inject(PLATFORM_ID))
});
