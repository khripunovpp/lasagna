import {inject, InjectionToken} from '@angular/core';
import {environment} from '../../../environments/environment';
import {FeatureFlagsService} from '../../shared/service/services/feature-flags.service';

export const API_BASE_URL = new InjectionToken('API_BASE_URL', {
  factory: () => {
    return inject(FeatureFlagsService).getFlagString('synchronizationUrlStr')
      ?? (environment.api.baseUrl || undefined)
      ?? '';
  }
});
