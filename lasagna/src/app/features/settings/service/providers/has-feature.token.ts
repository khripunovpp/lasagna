import {inject, InjectionToken} from '@angular/core';
import {FeatureFlag, FeatureFlagsService} from '../../../../shared/service/services/feature-flags.service';

export const HAS_FEATURE = new InjectionToken<(feature: FeatureFlag) => boolean>('hasFeature', {
  factory: () => {
    const featureFlagsService = inject(FeatureFlagsService);
    return (feature: FeatureFlag) => {
      return featureFlagsService.getFlagValue(feature);
    };
  }
});
