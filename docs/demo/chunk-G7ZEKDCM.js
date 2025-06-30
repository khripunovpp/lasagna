import {
  Directive,
  HostBinding,
  setClassMetadata,
  ɵɵdefineDirective,
  ɵɵstyleProp
} from "./chunk-6AETQSBA.js";

// src/app/shared/view/directives/shrink.directive.ts
var ShrinkDirective = class _ShrinkDirective {
  constructor() {
  }
  flex = "0 1 auto";
  // @HostBinding('style.align-self') alignSelf = 'flex-start';
  width = "auto";
  static \u0275fac = function ShrinkDirective_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _ShrinkDirective)();
  };
  static \u0275dir = /* @__PURE__ */ \u0275\u0275defineDirective({ type: _ShrinkDirective, selectors: [["", "lgShrink", ""]], hostVars: 4, hostBindings: function ShrinkDirective_HostBindings(rf, ctx) {
    if (rf & 2) {
      \u0275\u0275styleProp("flex", ctx.flex)("width", ctx.width);
    }
  } });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(ShrinkDirective, [{
    type: Directive,
    args: [{
      standalone: true,
      selector: "[lgShrink]"
    }]
  }], () => [], { flex: [{
    type: HostBinding,
    args: ["style.flex"]
  }], width: [{
    type: HostBinding,
    args: ["style.width"]
  }] });
})();

export {
  ShrinkDirective
};
//# sourceMappingURL=chunk-G7ZEKDCM.js.map
