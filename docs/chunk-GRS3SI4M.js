import {
  InjectionToken
} from "./chunk-Z5TNFCCP.js";

// src/environments/environment.ts
var environment = {
  production: false,
  region: "global",
  googleSheets: {
    appsScriptUrl: ""
  },
  policies: {
    privacyPolicyUrl: "https://github.com/khripunovpp/lasagna/blob/master/privacy-policy.md",
    termsOfServiceUrl: "https://github.com/khripunovpp/lasagna/blob/master/terms-of-service.md",
    cookiePolicyUrl: "https://github.com/khripunovpp/lasagna/blob/master/cookie-policy.md"
  },
  smtp: {
    apiKey: "",
    apiSecret: "",
    domain: "",
    supportEmail: "",
    senderEmail: "",
    senderName: ""
  },
  version: "0.0.0"
};

// src/app/shared/service/tokens/app-server-region.token.ts
var APP_SERVER_REGION = new InjectionToken("App Server Region", {
  factory: () => {
    return environment.region;
  }
});
var APP_SERVER_IS_RU = new InjectionToken("App Server is RU Server", {
  factory: () => {
    return environment.region === "ru";
  }
});

export {
  environment,
  APP_SERVER_IS_RU
};
//# sourceMappingURL=chunk-GRS3SI4M.js.map
