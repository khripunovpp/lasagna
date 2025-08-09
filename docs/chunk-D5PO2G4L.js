import {
  Directive,
  HostBinding,
  setClassMetadata,
  ɵɵdefineDirective,
  ɵɵstyleProp
} from "./chunk-UQVCVPTQ.js";

// src/app/shared/view/directives/self-start.directive.ts
var SelfStartDirective = class _SelfStartDirective {
  constructor() {
  }
  selfAlign = "start";
  static \u0275fac = function SelfStartDirective_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _SelfStartDirective)();
  };
  static \u0275dir = /* @__PURE__ */ \u0275\u0275defineDirective({ type: _SelfStartDirective, selectors: [["", "lgSelfStart", ""]], hostVars: 2, hostBindings: function SelfStartDirective_HostBindings(rf, ctx) {
    if (rf & 2) {
      \u0275\u0275styleProp("align-self", ctx.selfAlign);
    }
  } });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(SelfStartDirective, [{
    type: Directive,
    args: [{
      standalone: true,
      selector: "[lgSelfStart]"
    }]
  }], () => [], { selfAlign: [{
    type: HostBinding,
    args: ["style.align-self"]
  }] });
})();

export {
  SelfStartDirective
};
//# sourceMappingURL=chunk-D5PO2G4L.js.map
