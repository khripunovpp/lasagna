import {
  Router
} from "./chunk-GF4GEWLC.js";
import {
  InjectionToken
} from "./chunk-KM6KLH7M.js";

// src/app/shared/service/providers/router-manager.provider.ts
var ROUTER_MANAGER = new InjectionToken("RouterManager");
var ROUTER_MANAGER_PROVIDER = {
  provide: ROUTER_MANAGER,
  useFactory: (router) => {
    return {
      navigateWithReset: function(command) {
        this.navigate(command);
        this.replace(command);
      },
      replace: function(command) {
        window.history.replaceState({}, "", router.createUrlTree(command).toString());
      },
      navigate: function(command) {
        router.navigate(command);
      }
    };
  },
  deps: [
    Router
  ]
};

export {
  ROUTER_MANAGER,
  ROUTER_MANAGER_PROVIDER
};
//# sourceMappingURL=chunk-7SDCJP3V.js.map
