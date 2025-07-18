import {InjectionToken} from '@angular/core';

export const BODY_LOCKER = new InjectionToken('BODY_LOCKER', {
  factory: () => {
    return {
      lock: () => {
        document.body.style.overflow = 'hidden';
      },
      unlock: () => {
        document.body.style.overflow = '';
      }
    };
  }
})
