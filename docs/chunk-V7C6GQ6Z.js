import {
  Directive,
  HostBinding,
  setClassMetadata,
  ɵɵdefineDirective,
  ɵɵstyleProp
} from "./chunk-IYCVPBRB.js";

// src/app/shared/view/directives/pull.directive.ts
var PullDirective = class _PullDirective {
  constructor() {
  }
  marginLeft = "auto";
  static \u0275fac = function PullDirective_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _PullDirective)();
  };
  static \u0275dir = /* @__PURE__ */ \u0275\u0275defineDirective({ type: _PullDirective, selectors: [["", "lgPull", ""]], hostVars: 2, hostBindings: function PullDirective_HostBindings(rf, ctx) {
    if (rf & 2) {
      \u0275\u0275styleProp("margin-left", ctx.marginLeft);
    }
  } });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(PullDirective, [{
    type: Directive,
    args: [{
      standalone: true,
      selector: "[lgPull]"
    }]
  }], () => [], { marginLeft: [{
    type: HostBinding,
    args: ["style.margin-left"]
  }] });
})();

export {
  PullDirective
};
//# sourceMappingURL=chunk-V7C6GQ6Z.js.map
