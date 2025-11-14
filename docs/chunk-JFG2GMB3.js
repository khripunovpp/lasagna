import {
  Router
} from "./chunk-SHM3W5T3.js";
import {
  InjectionToken
} from "./chunk-RQATVJ2P.js";

// src/app/shared/service/providers/router-manager.provider.ts
var ROUTER_MANAGER = new InjectionToken("RouterManager");
var ROUTER_MANAGER_PROVIDER = {
  provide: ROUTER_MANAGER,
  useFactory: (router) => {
    return {
      navigateWithReset: async function(command) {
        this.navigate(command);
        this.replace(command);
      },
      replace: function(command) {
        return router.navigateByUrl("/", { skipLocationChange: true }).then(() => {
          return router.navigate([router.createUrlTree(command).toString()]);
        });
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
//# sourceMappingURL=chunk-JFG2GMB3.js.map
