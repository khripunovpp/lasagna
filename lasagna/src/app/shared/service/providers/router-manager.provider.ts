import {InjectionToken} from '@angular/core';
import {Router} from '@angular/router';

export const ROUTER_MANAGER = new InjectionToken<{
  replace: (command: any[] | any) => void
  navigateWithReset: (command: any[] | any) => void
  navigate: (command: any[] | any) => void
}>('RouterManager');

export const ROUTER_MANAGER_PROVIDER = {
  provide: ROUTER_MANAGER,
  useFactory: (
    router: Router
  ) => {
    return {
      navigateWithReset: function (command: any[] | any) {
        this.navigate(command);
        this.replace(command);
      },
      replace: function (command: any[] | any) {
        window.history
          .replaceState(
            {},
            '',
            router.createUrlTree(command).toString()
          );
      },
      navigate: function (command: any[] | any) {
        router.navigate(command);
      }
    }
  },
  deps: [
    Router
  ]
};
