import {
  CardComponent
} from "./chunk-C7YIU4ER.js";
import {
  ButtonComponent
} from "./chunk-PTCGLHTR.js";
import {
  Component,
  Directive,
  ElementRef,
  InjectionToken,
  effect,
  inject,
  input,
  output,
  setClassMetadata,
  signal,
  ɵsetClassDebugInfo,
  ɵɵadvance,
  ɵɵconditional,
  ɵɵconditionalCreate,
  ɵɵdefineComponent,
  ɵɵdefineDirective,
  ɵɵdirectiveInject,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵgetCurrentView,
  ɵɵlistener,
  ɵɵnextContext,
  ɵɵprojection,
  ɵɵprojectionDef,
  ɵɵresetView,
  ɵɵrestoreView,
  ɵɵstyleMap,
  ɵɵstyleProp,
  ɵɵtext,
  ɵɵtextInterpolate1
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

// src/app/shared/view/ui/dialog/dialog.component.ts
var _c0 = ["*"];
function DialogComponent_Conditional_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "button", 4);
    \u0275\u0275text(1, " Close ");
    \u0275\u0275elementEnd();
  }
}
function DialogComponent_Conditional_9_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 8)(1, "lg-button", 9);
    \u0275\u0275listener("click", function DialogComponent_Conditional_9_Template_lg_button_click_1_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.onCancelClick());
    });
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "lg-button", 10);
    \u0275\u0275listener("click", function DialogComponent_Conditional_9_Template_lg_button_click_3_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.onConfirmClick());
    });
    \u0275\u0275text(4);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275styleMap("secondary");
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r1.cancelButtonText(), " ");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", ctx_r1.confirmButtonText(), " ");
  }
}
var DialogComponent = class _DialogComponent {
  constructor() {
  }
  displayed = signal(false);
  closeButton = input(true);
  cancelButtonText = input("Cancel");
  confirmButtonText = input("Confirm");
  closeOnConfirm = input(true);
  displayFooter = input(true);
  onCancel = output();
  onConfirm = output();
  #_bodyLocker = inject(BODY_LOCKER);
  displayedEffect = effect(() => {
    if (this.displayed()) {
      this.#_bodyLocker.lock();
    } else {
      this.#_bodyLocker.unlock();
    }
  });
  onEscKeyDown(event) {
    console.log(event);
    this.close();
  }
  onCancelClick() {
    this.onCancel.emit();
    this.close();
  }
  onConfirmClick() {
    this.onConfirm.emit();
    if (!this.closeOnConfirm())
      return;
    this.close();
  }
  open() {
    this.displayed.set(true);
  }
  close() {
    this.displayed.set(false);
  }
  static \u0275fac = function DialogComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _DialogComponent)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _DialogComponent, selectors: [["lg-dialog"]], inputs: { closeButton: [1, "closeButton"], cancelButtonText: [1, "cancelButtonText"], confirmButtonText: [1, "confirmButtonText"], closeOnConfirm: [1, "closeOnConfirm"], displayFooter: [1, "displayFooter"] }, outputs: { onCancel: "onCancel", onConfirm: "onConfirm" }, ngContentSelectors: _c0, decls: 10, vars: 4, consts: [[1, "dialog", 3, "click"], [1, "dialog__container"], [1, "dialog__wrap"], ["lgFocusTrap", "", 1, "dialog__box"], ["aria-label", "Close dialog", 1, "dialog__close-button"], [3, "click"], [1, "dialog__inner-container"], [1, "dialog__inner"], [1, "dialog__footer"], [1, "dialog__cancel-button", 3, "click"], [1, "dialog__confirm-button", 3, "click"]], template: function DialogComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275projectionDef();
      \u0275\u0275elementStart(0, "div", 0);
      \u0275\u0275listener("click", function DialogComponent_Template_div_click_0_listener() {
        return ctx.close();
      });
      \u0275\u0275elementStart(1, "div", 1)(2, "div", 2)(3, "div", 3);
      \u0275\u0275conditionalCreate(4, DialogComponent_Conditional_4_Template, 2, 0, "button", 4);
      \u0275\u0275elementStart(5, "lg-card", 5);
      \u0275\u0275listener("click", function DialogComponent_Template_lg_card_click_5_listener($event) {
        return $event.stopPropagation();
      });
      \u0275\u0275elementStart(6, "div", 6)(7, "div", 7);
      \u0275\u0275projection(8);
      \u0275\u0275elementEnd();
      \u0275\u0275conditionalCreate(9, DialogComponent_Conditional_9_Template, 5, 4, "div", 8);
      \u0275\u0275elementEnd()()()()()();
    }
    if (rf & 2) {
      \u0275\u0275styleProp("display", ctx.displayed() ? "flex" : "none");
      \u0275\u0275advance(4);
      \u0275\u0275conditional(ctx.closeButton() ? 4 : -1);
      \u0275\u0275advance(5);
      \u0275\u0275conditional(ctx.displayFooter() ? 9 : -1);
    }
  }, dependencies: [
    CardComponent,
    ButtonComponent,
    FocusTrapDirective
  ], styles: ["\n\n.dialog[_ngcontent-%COMP%] {\n  display: flex;\n  position: fixed;\n  z-index: 9;\n  top: 0;\n  left: 0;\n  width: 100%;\n  height: 100%;\n  background-color: rgba(0, 0, 0, 0.5);\n  justify-content: center;\n  align-items: center;\n  overflow-y: auto;\n}\n.dialog__container[_ngcontent-%COMP%] {\n  width: clamp(300px, 100%, 800px);\n  height: 100%;\n}\n.dialog__box[_ngcontent-%COMP%] {\n  width: 100%;\n}\n.dialog__wrap[_ngcontent-%COMP%] {\n  padding: 96px 32px 32px;\n  display: flex;\n  justify-content: center;\n  align-items: center;\n}\n.dialog__inner-container[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 16px;\n}\n.dialog__footer[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 16px;\n  border-top: 1px solid #f5f5f5;\n  padding-top: 16px;\n}\n.dialog__close-button[_ngcontent-%COMP%] {\n  appearance: none;\n  border: none;\n  background: #f5f5f5;\n  font-family: inherit;\n  font-size: 16px;\n  line-height: 1;\n  padding: 4px 8px;\n  border-radius: 8px;\n  margin-bottom: 16px;\n  transition: transform 0.2s ease-in-out;\n  cursor: pointer;\n}\n.dialog__close-button[_ngcontent-%COMP%]:hover {\n  transform: scale(0.9);\n}\n/*# sourceMappingURL=dialog.component.css.map */"] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(DialogComponent, [{
    type: Component,
    args: [{ selector: "lg-dialog", standalone: true, template: `
    <div [style.display]="displayed() ? 'flex' : 'none'"
         class="dialog" (click)="close()">
      <div class="dialog__container">
        <div class="dialog__wrap">
          <div class="dialog__box" lgFocusTrap>
            @if (closeButton()) {
              <button class="dialog__close-button"
                      aria-label="Close dialog">
                Close
              </button>
            }
            <lg-card (click)="$event.stopPropagation()">
              <div class="dialog__inner-container">

                <div class="dialog__inner">
                  <ng-content></ng-content>
                </div>

                @if (displayFooter()) {
                  <div class="dialog__footer">
                    <lg-button (click)="onCancelClick()"
                               [style]="'secondary'"
                               class="dialog__cancel-button">
                      {{ cancelButtonText() }}
                    </lg-button>

                    <lg-button (click)="onConfirmClick()"
                               class="dialog__confirm-button">
                      {{ confirmButtonText() }}
                    </lg-button>
                  </div>
                }
              </div>
            </lg-card>
          </div>
        </div>
      </div>
    </div>
  `, imports: [
      CardComponent,
      ButtonComponent,
      FocusTrapDirective
    ], styles: ["/* angular:styles/component:scss;2d408a472963e46f183eb5141780c08b42748af2cdf3baff71633a08d4176b85;/Users/khripunovpavel/Documents/my/lasagna/lasagna/src/app/shared/view/ui/dialog/dialog.component.ts */\n.dialog {\n  display: flex;\n  position: fixed;\n  z-index: 9;\n  top: 0;\n  left: 0;\n  width: 100%;\n  height: 100%;\n  background-color: rgba(0, 0, 0, 0.5);\n  justify-content: center;\n  align-items: center;\n  overflow-y: auto;\n}\n.dialog__container {\n  width: clamp(300px, 100%, 800px);\n  height: 100%;\n}\n.dialog__box {\n  width: 100%;\n}\n.dialog__wrap {\n  padding: 96px 32px 32px;\n  display: flex;\n  justify-content: center;\n  align-items: center;\n}\n.dialog__inner-container {\n  display: flex;\n  flex-direction: column;\n  gap: 16px;\n}\n.dialog__footer {\n  display: flex;\n  align-items: center;\n  gap: 16px;\n  border-top: 1px solid #f5f5f5;\n  padding-top: 16px;\n}\n.dialog__close-button {\n  appearance: none;\n  border: none;\n  background: #f5f5f5;\n  font-family: inherit;\n  font-size: 16px;\n  line-height: 1;\n  padding: 4px 8px;\n  border-radius: 8px;\n  margin-bottom: 16px;\n  transition: transform 0.2s ease-in-out;\n  cursor: pointer;\n}\n.dialog__close-button:hover {\n  transform: scale(0.9);\n}\n/*# sourceMappingURL=dialog.component.css.map */\n"] }]
  }], () => [], null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(DialogComponent, { className: "DialogComponent", filePath: "src/app/shared/view/ui/dialog/dialog.component.ts", lineNumber: 123 });
})();

export {
  FocusTrapDirective,
  BODY_LOCKER,
  DialogComponent
};
//# sourceMappingURL=chunk-5WGFG7NC.js.map
