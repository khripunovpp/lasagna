import {
  Directive,
  Input,
  TemplateRef,
  setClassMetadata,
  ɵɵdefineDirective,
  ɵɵdirectiveInject
} from "./chunk-IYCVPBRB.js";

// src/app/shared/view/ui/tabs/tab.directive.ts
var TabDirective = class _TabDirective {
  templateRef;
  constructor(templateRef) {
    this.templateRef = templateRef;
  }
  label;
  alias;
  display = true;
  static \u0275fac = function TabDirective_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _TabDirective)(\u0275\u0275directiveInject(TemplateRef));
  };
  static \u0275dir = /* @__PURE__ */ \u0275\u0275defineDirective({ type: _TabDirective, selectors: [["ng-template", "lgTab", ""]], inputs: { label: "label", alias: "alias", display: "display" } });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(TabDirective, [{
    type: Directive,
    args: [{
      selector: "ng-template[lgTab]"
    }]
  }], () => [{ type: TemplateRef }], { label: [{
    type: Input,
    args: [{ required: true }]
  }], alias: [{
    type: Input,
    args: [{ required: true }]
  }], display: [{
    type: Input,
    args: [{ required: false }]
  }] });
})();

export {
  TabDirective
};
//# sourceMappingURL=chunk-IBTYJAEJ.js.map
