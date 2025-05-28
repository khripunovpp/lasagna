import {InjectionToken, Signal} from '@angular/core';

export const USER_LANGUAGE = new InjectionToken<Signal<string>>('UserLanguage');
