import {
  Directive,
  HostBinding,
  setClassMetadata,
  ɵɵdefineDirective,
  ɵɵstyleProp
} from "./chunk-IYCVPBRB.js";

// src/app/shared/view/directives/no-wrap.directive.ts
var NoWrapDirective = class _NoWrapDirective {
  constructor() {
  }
  whiteSpace = "nowrap";
  static \u0275fac = function NoWrapDirective_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _NoWrapDirective)();
  };
  static \u0275dir = /* @__PURE__ */ \u0275\u0275defineDirective({ type: _NoWrapDirective, selectors: [["", "lgNoWrap", ""]], hostVars: 2, hostBindings: function NoWrapDirective_HostBindings(rf, ctx) {
    if (rf & 2) {
      \u0275\u0275styleProp("white-space", ctx.whiteSpace);
    }
  } });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(NoWrapDirective, [{
    type: Directive,
    args: [{
      standalone: true,
      selector: "[lgNoWrap]"
    }]
  }], () => [], { whiteSpace: [{
    type: HostBinding,
    args: ["style.white-space"]
  }] });
})();

export {
  NoWrapDirective
};
//# sourceMappingURL=chunk-XJBWEQOY.js.map
