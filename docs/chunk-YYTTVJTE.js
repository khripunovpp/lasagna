import {
  BODY_LOCKER,
  FocusTrapDirective
} from "./chunk-IY7DTGCX.js";
import {
  CardComponent
} from "./chunk-CV7QKEF5.js";
import {
  ButtonComponent
} from "./chunk-RPP3IG6S.js";
import {
  Component,
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
} from "./chunk-KM6KLH7M.js";

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
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _DialogComponent, selectors: [["lg-dialog"]], inputs: { closeButton: [1, "closeButton"], cancelButtonText: [1, "cancelButtonText"], confirmButtonText: [1, "confirmButtonText"], displayFooter: [1, "displayFooter"] }, outputs: { onCancel: "onCancel", onConfirm: "onConfirm" }, ngContentSelectors: _c0, decls: 10, vars: 4, consts: [[1, "dialog", 3, "click"], [1, "dialog__container"], [1, "dialog__wrap"], ["lgFocusTrap", "", 1, "dialog__box"], ["aria-label", "Close dialog", 1, "dialog__close-button"], [3, "click"], [1, "dialog__inner-container"], [1, "dialog__inner"], [1, "dialog__footer"], [1, "dialog__cancel-button", 3, "click"], [1, "dialog__confirm-button", 3, "click"]], template: function DialogComponent_Template(rf, ctx) {
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
  ], styles: ["\n\n.dialog[_ngcontent-%COMP%] {\n  display: flex;\n  position: fixed;\n  z-index: 9;\n  top: 0;\n  left: 0;\n  width: 100%;\n  height: 100%;\n  background-color: rgba(0, 0, 0, 0.5);\n  justify-content: center;\n  align-items: center;\n  overflow-y: auto;\n}\n.dialog__container[_ngcontent-%COMP%] {\n  max-width: 80%;\n  min-width: 300px;\n  width: 100%;\n  height: 100%;\n}\n.dialog__box[_ngcontent-%COMP%] {\n  width: 100%;\n}\n.dialog__wrap[_ngcontent-%COMP%] {\n  padding: 96px 32px 32px;\n  display: flex;\n  justify-content: center;\n  align-items: center;\n}\n.dialog__inner-container[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 16px;\n}\n.dialog__footer[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 16px;\n  border-top: 1px solid #f5f5f5;\n  padding-top: 16px;\n}\n.dialog__close-button[_ngcontent-%COMP%] {\n  appearance: none;\n  border: none;\n  background: #f5f5f5;\n  font-family: inherit;\n  font-size: 16px;\n  line-height: 1;\n  padding: 4px 8px;\n  border-radius: 8px;\n  margin-bottom: 16px;\n  transition: transform 0.2s ease-in-out;\n  cursor: pointer;\n}\n.dialog__close-button[_ngcontent-%COMP%]:hover {\n  transform: scale(0.9);\n}\n/*# sourceMappingURL=dialog.component.css.map */"] });
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
    ], styles: ["/* angular:styles/component:scss;f779ec0755570ef5244137a53a15a22d266ba9e84e85f06c13a4a15ab3ae9c7c;/Users/khripunovpavel/Documents/my/lasagna/lasagna/src/app/shared/view/ui/dialog/dialog.component.ts */\n.dialog {\n  display: flex;\n  position: fixed;\n  z-index: 9;\n  top: 0;\n  left: 0;\n  width: 100%;\n  height: 100%;\n  background-color: rgba(0, 0, 0, 0.5);\n  justify-content: center;\n  align-items: center;\n  overflow-y: auto;\n}\n.dialog__container {\n  max-width: 80%;\n  min-width: 300px;\n  width: 100%;\n  height: 100%;\n}\n.dialog__box {\n  width: 100%;\n}\n.dialog__wrap {\n  padding: 96px 32px 32px;\n  display: flex;\n  justify-content: center;\n  align-items: center;\n}\n.dialog__inner-container {\n  display: flex;\n  flex-direction: column;\n  gap: 16px;\n}\n.dialog__footer {\n  display: flex;\n  align-items: center;\n  gap: 16px;\n  border-top: 1px solid #f5f5f5;\n  padding-top: 16px;\n}\n.dialog__close-button {\n  appearance: none;\n  border: none;\n  background: #f5f5f5;\n  font-family: inherit;\n  font-size: 16px;\n  line-height: 1;\n  padding: 4px 8px;\n  border-radius: 8px;\n  margin-bottom: 16px;\n  transition: transform 0.2s ease-in-out;\n  cursor: pointer;\n}\n.dialog__close-button:hover {\n  transform: scale(0.9);\n}\n/*# sourceMappingURL=dialog.component.css.map */\n"] }]
  }], () => [], null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(DialogComponent, { className: "DialogComponent", filePath: "src/app/shared/view/ui/dialog/dialog.component.ts", lineNumber: 125 });
})();

export {
  DialogComponent
};
//# sourceMappingURL=chunk-YYTTVJTE.js.map
