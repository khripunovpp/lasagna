import {
  Directive,
  HostBinding,
  Input,
  setClassMetadata,
  ɵɵdefineDirective,
  ɵɵstyleProp
} from "./chunk-6AETQSBA.js";

// src/app/shared/helpers/match-media.helper.ts
var mediaMobMax = (breakpoint = 600) => {
  return window.matchMedia(`(max-width: ${breakpoint}px)`).matches;
};

// src/app/shared/view/directives/width.directive.ts
var WidthDirective = class _WidthDirective {
  constructor() {
  }
  lgWidth = 0;
  get widthVar() {
    if (mediaMobMax()) {
      return "100%";
    }
    return this.lgWidth;
  }
  get maxWidth() {
    if (mediaMobMax()) {
      return "100%";
    }
    return "calc(var(--lg-width, 100%) - var(--gap, 0px))";
  }
  get flex() {
    if (mediaMobMax()) {
      return "auto";
    }
    return `1 0 ${this.lgWidth}`;
  }
  get alignSelf() {
    if (mediaMobMax()) {
      return "stretch";
    }
    return null;
  }
  static \u0275fac = function WidthDirective_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _WidthDirective)();
  };
  static \u0275dir = /* @__PURE__ */ \u0275\u0275defineDirective({ type: _WidthDirective, selectors: [["", "lgWidth", ""]], hostVars: 8, hostBindings: function WidthDirective_HostBindings(rf, ctx) {
    if (rf & 2) {
      \u0275\u0275styleProp("--lg-width", ctx.widthVar)("max-width", ctx.maxWidth)("flex", ctx.flex)("align-self", ctx.alignSelf);
    }
  }, inputs: { lgWidth: "lgWidth" } });
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
  }], widthVar: [{
    type: HostBinding,
    args: ["style.--lg-width"]
  }], maxWidth: [{
    type: HostBinding,
    args: ["style.max-width"]
  }], flex: [{
    type: HostBinding,
    args: ["style.flex"]
  }], alignSelf: [{
    type: HostBinding,
    args: ["style.align-self"]
  }] });
})();

export {
  WidthDirective
};
//# sourceMappingURL=chunk-X7MIVF3B.js.map
