import {computed, inject, InjectionToken} from '@angular/core';
import {HAS_FEATURE} from '../../settings/service/providers/has-feature.token';
import {AuthService} from '../../account/auth.service';

export const CAN_SYNC = new InjectionToken('canSync', {
  factory: () => {
    const hasFeature = inject(HAS_FEATURE);
    const authService = inject(AuthService);

    return computed(() => {
      return authService.canSync()
        && hasFeature('synchronization');
    });
  }
});

export const HAS_SYNC_FEATURE = new InjectionToken('hasSyncFeature', {
  factory: () => {
    return inject(HAS_FEATURE)('synchronization')
  }
});
