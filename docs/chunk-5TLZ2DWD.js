import {
  Component,
  Directive,
  ElementRef,
  EventEmitter,
  HostListener,
  Output,
  setClassMetadata,
  signal,
  ɵsetClassDebugInfo,
  ɵɵclassProp,
  ɵɵdefineComponent,
  ɵɵdefineDirective,
  ɵɵdirectiveInject,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵlistener,
  ɵɵprojection,
  ɵɵprojectionDef,
  ɵɵresolveDocument
} from "./chunk-IYCVPBRB.js";

// src/app/shared/view/directives/click-outside.directive.ts
var ClickOutsideDirective = class _ClickOutsideDirective {
  elementRef;
  constructor(elementRef) {
    this.elementRef = elementRef;
  }
  lgClickOutside = new EventEmitter();
  onClick(event) {
    if (!this.elementRef.nativeElement.contains(event.target)) {
      this.lgClickOutside.emit(event);
    }
  }
  static \u0275fac = function ClickOutsideDirective_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _ClickOutsideDirective)(\u0275\u0275directiveInject(ElementRef));
  };
  static \u0275dir = /* @__PURE__ */ \u0275\u0275defineDirective({ type: _ClickOutsideDirective, selectors: [["", "lgClickOutside", ""]], hostBindings: function ClickOutsideDirective_HostBindings(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275listener("click", function ClickOutsideDirective_click_HostBindingHandler($event) {
        return ctx.onClick($event);
      }, \u0275\u0275resolveDocument)("touchstart", function ClickOutsideDirective_touchstart_HostBindingHandler($event) {
        return ctx.onClick($event);
      }, \u0275\u0275resolveDocument)("mousedown", function ClickOutsideDirective_mousedown_HostBindingHandler($event) {
        return ctx.onClick($event);
      }, \u0275\u0275resolveDocument)("mouseup", function ClickOutsideDirective_mouseup_HostBindingHandler($event) {
        return ctx.onClick($event);
      }, \u0275\u0275resolveDocument);
    }
  }, outputs: { lgClickOutside: "lgClickOutside" } });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(ClickOutsideDirective, [{
    type: Directive,
    args: [{
      selector: "[lgClickOutside]",
      standalone: true,
      host: {
        "(document:click)": "onClick($event)",
        "(document:touchstart)": "onClick($event)",
        "(document:mousedown)": "onClick($event)",
        "(document:mouseup)": "onClick($event)"
      }
    }]
  }], () => [{ type: ElementRef }], { lgClickOutside: [{
    type: Output
  }] });
})();

// src/app/features/controls/dropdown/dropdown.component.ts
var _c0 = [[["", "lgDropdownAnchor", ""]], "*"];
var _c1 = ["[lgDropdownAnchor]", "*"];
var DropdownComponent = class _DropdownComponent {
  constructor() {
  }
  display = signal(false, ...ngDevMode ? [{ debugName: "display" }] : []);
  onClick(event) {
    event.stopPropagation();
  }
  toggleDropdown() {
    this.display.set(!this.display());
  }
  closeDropdown() {
    this.display.set(false);
  }
  static \u0275fac = function DropdownComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _DropdownComponent)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _DropdownComponent, selectors: [["lg-dropdown"]], hostBindings: function DropdownComponent_HostBindings(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275listener("click", function DropdownComponent_click_HostBindingHandler($event) {
        return ctx.onClick($event);
      });
    }
  }, ngContentSelectors: _c1, decls: 5, vars: 2, consts: [[1, "lg-dropdown", 3, "lgClickOutside"], [1, "lg-dropdown-anchor", 3, "click"], [1, "lg-dropdown-content"]], template: function DropdownComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275projectionDef(_c0);
      \u0275\u0275elementStart(0, "div", 0);
      \u0275\u0275listener("lgClickOutside", function DropdownComponent_Template_div_lgClickOutside_0_listener() {
        return ctx.closeDropdown();
      });
      \u0275\u0275elementStart(1, "div", 1);
      \u0275\u0275listener("click", function DropdownComponent_Template_div_click_1_listener() {
        return ctx.toggleDropdown();
      });
      \u0275\u0275projection(2);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(3, "div", 2);
      \u0275\u0275projection(4, 1);
      \u0275\u0275elementEnd()();
    }
    if (rf & 2) {
      \u0275\u0275classProp("lg-dropdown-open", ctx.display());
    }
  }, dependencies: [ClickOutsideDirective], styles: ["\n\n[_nghost-%COMP%] {\n  display: block;\n  position: relative;\n}\n.lg-dropdown[_ngcontent-%COMP%] {\n  position: relative;\n  display: inline-block;\n}\n.lg-dropdown-content[_ngcontent-%COMP%] {\n  display: none;\n  position: absolute;\n  top: calc(100% + 8px);\n  background-color: #f9f9f9;\n  min-width: 160px;\n  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);\n  z-index: 2;\n  border-radius: 16px;\n  padding: 16px;\n}\n.lg-dropdown-open[_ngcontent-%COMP%]   .lg-dropdown-content[_ngcontent-%COMP%] {\n  display: block;\n}\n.lg-dropdown-item[_ngcontent-%COMP%] {\n  color: black;\n  padding: 12px 16px;\n  text-decoration: none;\n  display: block;\n}\n.lg-dropdown-item[_ngcontent-%COMP%]:hover {\n  background-color: #f1f1f1;\n}\n/*# sourceMappingURL=dropdown.component.css.map */"] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(DropdownComponent, [{
    type: Component,
    args: [{ selector: "lg-dropdown", standalone: true, template: `
    <div class="lg-dropdown"
         (lgClickOutside)="closeDropdown()"
         [class.lg-dropdown-open]="display()">
      <div class="lg-dropdown-anchor" (click)="toggleDropdown()">
        <ng-content select="[lgDropdownAnchor]"></ng-content>
      </div>

      <div class="lg-dropdown-content">
        <ng-content></ng-content>
      </div>
    </div>
  `, imports: [
      ClickOutsideDirective
    ], styles: ["/* angular:styles/component:scss;576ec8a45cd8390a2c8bb44292f6e9a404ed3ea28e6f7c9970ddf8dc81d1e179;/Users/khripunovpavel/Documents/my/lasagna/lasagna/src/app/features/controls/dropdown/dropdown.component.ts */\n:host {\n  display: block;\n  position: relative;\n}\n.lg-dropdown {\n  position: relative;\n  display: inline-block;\n}\n.lg-dropdown-content {\n  display: none;\n  position: absolute;\n  top: calc(100% + 8px);\n  background-color: #f9f9f9;\n  min-width: 160px;\n  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);\n  z-index: 2;\n  border-radius: 16px;\n  padding: 16px;\n}\n.lg-dropdown-open .lg-dropdown-content {\n  display: block;\n}\n.lg-dropdown-item {\n  color: black;\n  padding: 12px 16px;\n  text-decoration: none;\n  display: block;\n}\n.lg-dropdown-item:hover {\n  background-color: #f1f1f1;\n}\n/*# sourceMappingURL=dropdown.component.css.map */\n"] }]
  }], () => [], { onClick: [{
    type: HostListener,
    args: ["click", ["$event"]]
  }] });
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(DropdownComponent, { className: "DropdownComponent", filePath: "src/app/features/controls/dropdown/dropdown.component.ts", lineNumber: 62 });
})();

export {
  DropdownComponent
};
//# sourceMappingURL=chunk-5TLZ2DWD.js.map
