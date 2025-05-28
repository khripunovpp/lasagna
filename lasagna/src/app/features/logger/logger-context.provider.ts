import {InjectionToken} from '@angular/core';

export interface LoggerContext {
  label?: string
  color?: string
  enabled?: boolean
}

export const LOGGER_CONTEXT = new InjectionToken<LoggerContext>('LOGGER_CONTEXT', {
  factory: () => ({
    label: 'Logger',
    color: '#3498db',
  }),
});
export const DISABLE_LOGGER = new InjectionToken<boolean>('DISABLE_LOGGER', {
  factory: () => true
});
