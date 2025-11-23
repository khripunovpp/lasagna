import {
  Directive,
  TemplateRef,
  setClassMetadata,
  ɵɵdefineDirective,
  ɵɵdirectiveInject
} from "./chunk-IYCVPBRB.js";

// src/app/shared/view/ui/import/import-row-tpl.directive.ts
var ImportRowTplDirective = class _ImportRowTplDirective {
  templateRef;
  constructor(templateRef) {
    this.templateRef = templateRef;
  }
  static \u0275fac = function ImportRowTplDirective_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _ImportRowTplDirective)(\u0275\u0275directiveInject(TemplateRef));
  };
  static \u0275dir = /* @__PURE__ */ \u0275\u0275defineDirective({ type: _ImportRowTplDirective, selectors: [["", "lgImportRowTpl", ""]] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(ImportRowTplDirective, [{
    type: Directive,
    args: [{
      selector: "[lgImportRowTpl]",
      standalone: true
    }]
  }], () => [{ type: TemplateRef }], null);
})();

export {
  ImportRowTplDirective
};
//# sourceMappingURL=chunk-NSYSC6G7.js.map
