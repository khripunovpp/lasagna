import {
  Directive,
  HostBinding,
  setClassMetadata,
  ɵɵdefineDirective,
  ɵɵstyleProp
} from "./chunk-Z5TNFCCP.js";

// src/app/shared/view/directives/expand.directive.ts
var ExpandDirective = class _ExpandDirective {
  constructor() {
  }
  width = "100%";
  flex = "1 1 100%";
  static \u0275fac = function ExpandDirective_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _ExpandDirective)();
  };
  static \u0275dir = /* @__PURE__ */ \u0275\u0275defineDirective({ type: _ExpandDirective, selectors: [["", "lgExpand", ""]], hostVars: 4, hostBindings: function ExpandDirective_HostBindings(rf, ctx) {
    if (rf & 2) {
      \u0275\u0275styleProp("width", ctx.width)("flex", ctx.flex);
    }
  } });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(ExpandDirective, [{
    type: Directive,
    args: [{
      standalone: true,
      selector: "[lgExpand]"
    }]
  }], () => [], { width: [{
    type: HostBinding,
    args: ["style.width"]
  }], flex: [{
    type: HostBinding,
    args: ["style.flex"]
  }] });
})();

export {
  ExpandDirective
};
//# sourceMappingURL=chunk-STX6NIUK.js.map
