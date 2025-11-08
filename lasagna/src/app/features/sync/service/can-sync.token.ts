import {computed, inject, InjectionToken} from '@angular/core';
import {AuthService} from '../../account/auth.service';

export const CAN_SYNC = new InjectionToken('canSync', {
  factory: () => {
    const authService = inject(AuthService);
    return computed(() => {
      const user = authService.currentUser();
      return !!(authService.isAuthenticated()
        && user?.canBuy);
    });
  }
});
