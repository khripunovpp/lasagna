import {
  Directive,
  Input,
  TemplateRef,
  setClassMetadata,
  ɵɵdefineDirective,
  ɵɵdirectiveInject
} from "./chunk-IYCVPBRB.js";

// src/app/shared/view/ui/card/card-list-item.directive.ts
var CardListItemDirective = class _CardListItemDirective {
  template;
  constructor(template) {
    this.template = template;
  }
  uuid = "";
  type = "";
  bgColor = "";
  static \u0275fac = function CardListItemDirective_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _CardListItemDirective)(\u0275\u0275directiveInject(TemplateRef));
  };
  static \u0275dir = /* @__PURE__ */ \u0275\u0275defineDirective({ type: _CardListItemDirective, selectors: [["", "lgCardListItem", ""]], inputs: { uuid: "uuid", type: "type", bgColor: "bgColor" } });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(CardListItemDirective, [{
    type: Directive,
    args: [{
      selector: "[lgCardListItem]",
      standalone: true
    }]
  }], () => [{ type: TemplateRef }], { uuid: [{
    type: Input
  }], type: [{
    type: Input
  }], bgColor: [{
    type: Input
  }] });
})();

export {
  CardListItemDirective
};
//# sourceMappingURL=chunk-GFM7A3VZ.js.map
