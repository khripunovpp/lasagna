import {InjectionToken} from '@angular/core';
import {environment} from '../../../../environments/environment';

export const APP_SERVER_REGION = new InjectionToken('App Server Region', {
  factory: () => {
    return environment.region;
  }
});

export const APP_SERVER_IS_RU = new InjectionToken('App Server is RU Server', {
  factory: () => {
    return environment.region === 'ru';
  }
});
