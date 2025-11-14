import {
  generateUuid
} from "./chunk-5WJUMO7X.js";
import {
  NgTemplateOutlet
} from "./chunk-7I2CR6I6.js";
import {
  Component,
  Directive,
  TemplateRef,
  contentChildren,
  setClassMetadata,
  ɵsetClassDebugInfo,
  ɵɵadvance,
  ɵɵconditional,
  ɵɵconditionalCreate,
  ɵɵcontentQuerySignal,
  ɵɵdefineComponent,
  ɵɵdefineDirective,
  ɵɵdirectiveInject,
  ɵɵelementContainer,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵproperty,
  ɵɵqueryAdvance,
  ɵɵrepeater,
  ɵɵrepeaterCreate,
  ɵɵtext
} from "./chunk-RQATVJ2P.js";

// src/app/shared/view/ui/inline-separated-group.component.ts
var _forTrack0 = ($index, $item) => $item == null ? null : $item.uuid;
function InlineSeparatedGroupComponent_For_2_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 2);
    \u0275\u0275text(1, " | ");
    \u0275\u0275elementEnd();
  }
}
function InlineSeparatedGroupComponent_For_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementContainer(0, 1);
    \u0275\u0275conditionalCreate(1, InlineSeparatedGroupComponent_For_2_Conditional_1_Template, 2, 0, "span", 2);
  }
  if (rf & 2) {
    const item_r1 = ctx.$implicit;
    const \u0275$index_3_r2 = ctx.$index;
    const \u0275$count_3_r3 = ctx.$count;
    \u0275\u0275property("ngTemplateOutlet", item_r1.templateRef);
    \u0275\u0275advance();
    \u0275\u0275conditional(!(\u0275$index_3_r2 === \u0275$count_3_r3 - 1) ? 1 : -1);
  }
}
var InlineSeparatedGroupDirective = class _InlineSeparatedGroupDirective {
  templateRef;
  constructor(templateRef) {
    this.templateRef = templateRef;
  }
  uuid = generateUuid();
  static \u0275fac = function InlineSeparatedGroupDirective_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _InlineSeparatedGroupDirective)(\u0275\u0275directiveInject(TemplateRef));
  };
  static \u0275dir = /* @__PURE__ */ \u0275\u0275defineDirective({ type: _InlineSeparatedGroupDirective, selectors: [["", "lgInlineSeparatedGroup", ""]] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(InlineSeparatedGroupDirective, [{
    type: Directive,
    args: [{
      selector: "[lgInlineSeparatedGroup]",
      standalone: true
    }]
  }], () => [{ type: TemplateRef }], null);
})();
var InlineSeparatedGroupComponent = class _InlineSeparatedGroupComponent {
  constructor() {
  }
  items = contentChildren(InlineSeparatedGroupDirective, ...ngDevMode ? [{ debugName: "items" }] : []);
  static \u0275fac = function InlineSeparatedGroupComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _InlineSeparatedGroupComponent)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _InlineSeparatedGroupComponent, selectors: [["lg-inline-separated-group"]], contentQueries: function InlineSeparatedGroupComponent_ContentQueries(rf, ctx, dirIndex) {
    if (rf & 1) {
      \u0275\u0275contentQuerySignal(dirIndex, ctx.items, InlineSeparatedGroupDirective, 4);
    }
    if (rf & 2) {
      \u0275\u0275queryAdvance();
    }
  }, decls: 3, vars: 0, consts: [[1, "inline-separated-group"], [3, "ngTemplateOutlet"], [1, "inline-separated-group__separator"]], template: function InlineSeparatedGroupComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "div", 0);
      \u0275\u0275repeaterCreate(1, InlineSeparatedGroupComponent_For_2_Template, 2, 2, null, null, _forTrack0);
      \u0275\u0275elementEnd();
    }
    if (rf & 2) {
      \u0275\u0275advance();
      \u0275\u0275repeater(ctx.items());
    }
  }, dependencies: [NgTemplateOutlet], styles: ["\n\n.inline-separated-group[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 8px;\n  align-items: center;\n  white-space: nowrap;\n  flex-wrap: wrap;\n}\n.inline-separated-group__separator[_ngcontent-%COMP%] {\n  color: var(--color-text);\n  font-size: 12px;\n  font-weight: 500;\n  opacity: 0.5;\n}\n/*# sourceMappingURL=inline-separated-group.component.css.map */"] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(InlineSeparatedGroupComponent, [{
    type: Component,
    args: [{ selector: "lg-inline-separated-group", standalone: true, template: `
    <div class="inline-separated-group">
      @for (item of items(); track item?.uuid; let i = $index, last = $last) {
        <ng-container [ngTemplateOutlet]="item.templateRef"></ng-container>
        @if (!last) {
          <span class="inline-separated-group__separator"> | </span>
        }
      }
    </div>
  `, imports: [
      NgTemplateOutlet
    ], styles: ["/* angular:styles/component:scss;be33ef11b8782a1e817e8efe442ab9b0f0de33efa9a808708a6482b66debef65;/Users/khripunovpavel/Documents/my/lasagna/lasagna/src/app/shared/view/ui/inline-separated-group.component.ts */\n.inline-separated-group {\n  display: flex;\n  gap: 8px;\n  align-items: center;\n  white-space: nowrap;\n  flex-wrap: wrap;\n}\n.inline-separated-group__separator {\n  color: var(--color-text);\n  font-size: 12px;\n  font-weight: 500;\n  opacity: 0.5;\n}\n/*# sourceMappingURL=inline-separated-group.component.css.map */\n"] }]
  }], () => [], null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(InlineSeparatedGroupComponent, { className: "InlineSeparatedGroupComponent", filePath: "src/app/shared/view/ui/inline-separated-group.component.ts", lineNumber: 53 });
})();

export {
  InlineSeparatedGroupDirective,
  InlineSeparatedGroupComponent
};
//# sourceMappingURL=chunk-ZVGHHFKR.js.map
