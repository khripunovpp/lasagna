import {InjectionToken} from '@angular/core';
import {environment} from '../../../../environments/environment';

export const ENV_TOKEN = new InjectionToken<{
  production: boolean;
  dbName: string
}>('ENV_TOKEN', {
  factory: () => {
    return environment
  }
})
