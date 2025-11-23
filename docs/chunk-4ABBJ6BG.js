import {
  Directive,
  Input,
  TemplateRef,
  input,
  setClassMetadata,
  ɵɵdefineDirective,
  ɵɵdirectiveInject
} from "./chunk-IYCVPBRB.js";

// src/app/features/controls/form/control-extra-template.directive.ts
var ControlExtraTemplateDirective = class _ControlExtraTemplateDirective {
  templateRef;
  constructor(templateRef) {
    this.templateRef = templateRef;
  }
  place = input("after", ...ngDevMode ? [{ debugName: "place" }] : []);
  static \u0275fac = function ControlExtraTemplateDirective_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _ControlExtraTemplateDirective)(\u0275\u0275directiveInject(TemplateRef));
  };
  static \u0275dir = /* @__PURE__ */ \u0275\u0275defineDirective({ type: _ControlExtraTemplateDirective, selectors: [["", "lgExtraTpl", ""]], inputs: { place: [1, "place"] } });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(ControlExtraTemplateDirective, [{
    type: Directive,
    args: [{
      selector: "[lgExtraTpl]",
      standalone: true
    }]
  }], () => [{ type: TemplateRef }], { place: [{ type: Input, args: [{ isSignal: true, alias: "place", required: false }] }] });
})();

export {
  ControlExtraTemplateDirective
};
//# sourceMappingURL=chunk-4ABBJ6BG.js.map
