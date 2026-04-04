import {computed, inject, InjectionToken, Signal} from '@angular/core';
import {AuthService, Profile} from './auth.service';

export const ACCOUNT = new InjectionToken<Signal<Profile | null>>('Account info', {
  factory: () => {
    const authService = inject(AuthService);
    return authService.currentUser;
  }
});

export const AUTHENTICATED = new InjectionToken<Signal<boolean>>('Is authenticated', {
  factory: () => {
    const acc = inject(ACCOUNT);
    return computed(() => {
      return !!acc();
    });
  }
});
