import {
  WINDOW
} from "./chunk-CFXQGSQM.js";
import {
  isPlatformBrowser
} from "./chunk-X2X7GTPW.js";
import {
  Directive,
  ElementRef,
  InjectionToken,
  PLATFORM_ID,
  inject,
  setClassMetadata,
  ɵɵdefineDirective,
  ɵɵdirectiveInject
} from "./chunk-IYCVPBRB.js";

// src/app/shared/view/directives/focus-trap.directive.ts
var FocusTrapDirective = class _FocusTrapDirective {
  el;
  constructor(el) {
    this.el = el;
  }
  _window = inject(WINDOW);
  ngAfterViewInit() {
    this.trapFocus(this.el.nativeElement);
  }
  trapFocus(element) {
    element.addEventListener("keydown", (e) => {
      const getActiveElement = () => {
        if (this._window?.document.activeElement?.shadowRoot) {
          return this._window.document.activeElement.shadowRoot.activeElement;
        } else {
          return this._window?.document.activeElement;
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
    const isBrowser = isPlatformBrowser(inject(PLATFORM_ID));
    if (!isBrowser) {
      return {
        lock: () => {
        },
        unlock: () => {
        }
      };
    }
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
//# sourceMappingURL=chunk-QX25EV4N.js.map
