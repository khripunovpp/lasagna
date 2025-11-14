import {
  mediaMobMax
} from "./chunk-CR4NZLV7.js";
import {
  Directive,
  HostBinding,
  Input,
  setClassMetadata,
  ɵɵdefineDirective,
  ɵɵstyleProp
} from "./chunk-Z5TNFCCP.js";

// src/app/shared/view/directives/width.directive.ts
var WidthDirective = class _WidthDirective {
  constructor() {
  }
  lgWidth = 0;
  noResponsive = false;
  get widthVar() {
    if (this._isMobile) {
      return "100%";
    }
    return this.lgWidth;
  }
  get maxWidth() {
    if (this._isMobile) {
      return "100%";
    }
    return "calc(var(--lg-width, 100%) - (var(--gap, 0px) / 2))";
  }
  get flexGrow() {
    if (this._isMobile) {
      return "auto";
    }
    return 1;
  }
  get flexBasis() {
    if (this._isMobile) {
      return "auto";
    }
    return this.lgWidth;
  }
  get alignSelf() {
    if (this._isMobile) {
      return "stretch";
    }
    return null;
  }
  get _isMobile() {
    return this.noResponsive ? false : mediaMobMax();
  }
  static \u0275fac = function WidthDirective_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _WidthDirective)();
  };
  static \u0275dir = /* @__PURE__ */ \u0275\u0275defineDirective({ type: _WidthDirective, selectors: [["", "lgWidth", ""]], hostVars: 10, hostBindings: function WidthDirective_HostBindings(rf, ctx) {
    if (rf & 2) {
      \u0275\u0275styleProp("--lg-width", ctx.widthVar)("max-width", ctx.maxWidth)("flex-grow", ctx.flexGrow)("flex-basis", ctx.flexBasis)("align-self", ctx.alignSelf);
    }
  }, inputs: { lgWidth: "lgWidth", noResponsive: "noResponsive" } });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(WidthDirective, [{
    type: Directive,
    args: [{
      standalone: true,
      selector: "[lgWidth]"
    }]
  }], () => [], { lgWidth: [{
    type: Input
  }], noResponsive: [{
    type: Input
  }], widthVar: [{
    type: HostBinding,
    args: ["style.--lg-width"]
  }], maxWidth: [{
    type: HostBinding,
    args: ["style.max-width"]
  }], flexGrow: [{
    type: HostBinding,
    args: ["style.flex-grow"]
  }], flexBasis: [{
    type: HostBinding,
    args: ["style.flex-basis"]
  }], alignSelf: [{
    type: HostBinding,
    args: ["style.align-self"]
  }] });
})();

export {
  WidthDirective
};
//# sourceMappingURL=chunk-LRBNXK2T.js.map
