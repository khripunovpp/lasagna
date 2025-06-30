import {
  Router
} from "./chunk-UGLIF2MQ.js";
import {
  InjectionToken
} from "./chunk-6AETQSBA.js";

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
//# sourceMappingURL=chunk-3MBTB52C.js.map
