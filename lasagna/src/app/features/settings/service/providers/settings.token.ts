import {InjectionToken, Signal} from '@angular/core';
import {Settings} from '../models/Settings';

export const SETTINGS = new InjectionToken<Signal<Record<string, any>>>('Settings');
