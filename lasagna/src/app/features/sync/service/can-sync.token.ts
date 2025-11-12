import {computed, inject, InjectionToken} from '@angular/core';
import {AuthService} from '../../account/auth.service';
import {ACCOUNT, AUTHENTICATED} from '../../account/account.token';

export const CAN_SYNC = new InjectionToken('canSync', {
  factory: () => {
    const auth = inject(AUTHENTICATED);
    const acc = inject(ACCOUNT);
    return computed(() => {
      return !!(acc()?.canBuy
        && auth());
    });
  }
});
