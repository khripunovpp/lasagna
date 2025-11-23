import {
  Directive,
  TemplateRef,
  setClassMetadata,
  ɵɵdefineDirective,
  ɵɵdirectiveInject
} from "./chunk-IYCVPBRB.js";

// src/app/shared/view/ui/grouping-tiles/grouping-tile.directive.ts
var GroupingTileDirective = class _GroupingTileDirective {
  templateRef;
  constructor(templateRef) {
    this.templateRef = templateRef;
  }
  static \u0275fac = function GroupingTileDirective_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _GroupingTileDirective)(\u0275\u0275directiveInject(TemplateRef));
  };
  static \u0275dir = /* @__PURE__ */ \u0275\u0275defineDirective({ type: _GroupingTileDirective, selectors: [["", "lgGroupingTile", ""]] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(GroupingTileDirective, [{
    type: Directive,
    args: [{
      selector: "[lgGroupingTile]",
      standalone: true
    }]
  }], () => [{ type: TemplateRef }], null);
})();

export {
  GroupingTileDirective
};
//# sourceMappingURL=chunk-MQSB7PK6.js.map
