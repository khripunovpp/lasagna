import {
  Directive,
  ElementRef,
  InjectionToken,
  setClassMetadata,
  ɵɵdefineDirective,
  ɵɵdirectiveInject
} from "./chunk-UQVCVPTQ.js";

// src/app/shared/view/ui/focus-trap.directive.ts
var FocusTrapDirective = class _FocusTrapDirective {
  el;
  constructor(el) {
    this.el = el;
  }
  ngAfterViewInit() {
    this.trapFocus(this.el.nativeElement);
  }
  trapFocus(element) {
    element.addEventListener("keydown", function(e) {
      const getActiveElement = () => {
        if (document.activeElement?.shadowRoot) {
          return document.activeElement.shadowRoot.activeElement;
        } else {
          return document.activeElement;
        }
      };
      const isTabPressed = e.keyCode === 9;
      if (!isTabPressed)
        return;
      const focusableEls1 = element.querySelectorAll('a[href], button, textarea, input[type="text"],input[type="radio"], input[type="checkbox"], select');
      const focusableEls = Array.from(focusableEls1).filter((el) => !el.disabled);
      const firstFocusableEl = focusableEls[0];
      const lastFocusableEl = focusableEls[focusableEls.length - 1];
      if (e.shiftKey) {
        if (getActiveElement() === firstFocusableEl) {
          lastFocusableEl.focus();
          e.preventDefault();
        }
      } else {
        if (getActiveElement() === lastFocusableEl) {
          firstFocusableEl.focus();
          e.preventDefault();
        }
      }
    });
  }
  static \u0275fac = function FocusTrapDirective_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _FocusTrapDirective)(\u0275\u0275directiveInject(ElementRef));
  };
  static \u0275dir = /* @__PURE__ */ \u0275\u0275defineDirective({ type: _FocusTrapDirective, selectors: [["", "lgFocusTrap", ""]] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(FocusTrapDirective, [{
    type: Directive,
    args: [{
      selector: "[lgFocusTrap]",
      standalone: true
    }]
  }], () => [{ type: ElementRef }], null);
})();

// src/app/shared/service/providers/body-locker.provider.ts
var BODY_LOCKER = new InjectionToken("BODY_LOCKER", {
  factory: () => {
    return {
      lock: () => {
        document.body.style.overflow = "hidden";
      },
      unlock: () => {
        document.body.style.overflow = "";
      }
    };
  }
});

export {
  FocusTrapDirective,
  BODY_LOCKER
};
//# sourceMappingURL=chunk-ZLF4HQCJ.js.map
