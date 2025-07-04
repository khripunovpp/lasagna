import {InjectionToken, Signal} from '@angular/core';
import {Observable} from 'rxjs';
import {Settings} from '../models/Settings';

export const USER_CURRENCY = new InjectionToken<Signal<Settings>>('UserCurrency');
