import {InjectionToken} from '@angular/core';
import {environment} from '../../../../environments/environment';

export interface Environment {
  production: boolean
}
export const ENV = new InjectionToken<Environment>('ENV', {
  factory: () => {
    return environment;
  }
})
