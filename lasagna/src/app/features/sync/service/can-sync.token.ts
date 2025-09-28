import {computed, inject, InjectionToken} from '@angular/core';
import {ACCOUNT, AUTHENTICATED} from '../../account/account.token';
import {HAS_FEATURE} from '../../settings/service/providers/has-feature.token';

export const CAN_SYNC = new InjectionToken('canSync', {
  factory: () => {
    const hasFeatureSync = inject(HAS_FEATURE)('synchronization');
    const auth = inject(AUTHENTICATED);
    const acc = inject(ACCOUNT);
    return computed(() => {
      return hasFeatureSync
        && !!(acc()?.canBuy && auth());
    });
  }
});

export const HAS_SYNC_FEATURE = new InjectionToken('hasSyncFeature', {
  factory: () => {
    return inject(HAS_FEATURE)('synchronization')
  }
});
