import {
  RouterLink,
  RouterLinkActive
} from "./chunk-JRXEEUAD.js";
import {
  NgClass,
  NgTemplateOutlet
} from "./chunk-76JI64DZ.js";
import {
  Component,
  ViewEncapsulation,
  input,
  output,
  setClassMetadata,
  viewChild,
  ɵsetClassDebugInfo,
  ɵɵadvance,
  ɵɵclassProp,
  ɵɵconditional,
  ɵɵconditionalCreate,
  ɵɵdefineComponent,
  ɵɵelementContainer,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵgetCurrentView,
  ɵɵlistener,
  ɵɵnextContext,
  ɵɵprojection,
  ɵɵprojectionDef,
  ɵɵproperty,
  ɵɵpureFunction0,
  ɵɵqueryAdvance,
  ɵɵreference,
  ɵɵresetView,
  ɵɵrestoreView,
  ɵɵtemplate,
  ɵɵtemplateRefExtractor,
  ɵɵviewQuerySignal
} from "./chunk-UQVCVPTQ.js";

// src/app/shared/view/ui/layout/button.component.ts
var _c0 = ["*"];
var _c1 = () => ["route-active"];
function ButtonComponent_Conditional_0_ng_container_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementContainer(0);
  }
}
function ButtonComponent_Conditional_0_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "a", 3);
    \u0275\u0275template(1, ButtonComponent_Conditional_0_ng_container_1_Template, 1, 0, "ng-container", 4);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    const content_r2 = \u0275\u0275reference(3);
    \u0275\u0275classProp("active", ctx_r0.active())("flat", ctx_r0.flat())("disabled", ctx_r0.disabled())("icon", ctx_r0.icon())("no-bottom-radius", ctx_r0.noBottomRadius())("no-left-radius", ctx_r0.noLeftRadius())("no-radius", ctx_r0.noRadius())("no-right-radius", ctx_r0.noRightRadius())("no-top-radius", ctx_r0.noTopRadius())("no-scale", ctx_r0.noScale());
    \u0275\u0275property("ngClass", ctx_r0.style() + " " + ctx_r0.size())("routerLink", ctx_r0.link() ? ctx_r0.link() : null)("routerLinkActive", \u0275\u0275pureFunction0(24, _c1));
    \u0275\u0275advance();
    \u0275\u0275property("ngTemplateOutlet", content_r2);
  }
}
function ButtonComponent_Conditional_1_ng_container_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementContainer(0);
  }
}
function ButtonComponent_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    const _r3 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 5);
    \u0275\u0275listener("click", function ButtonComponent_Conditional_1_Template_button_click_0_listener($event) {
      \u0275\u0275restoreView(_r3);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.onClickHandler($event));
    });
    \u0275\u0275template(1, ButtonComponent_Conditional_1_ng_container_1_Template, 1, 0, "ng-container", 4);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    const content_r2 = \u0275\u0275reference(3);
    \u0275\u0275classProp("active", ctx_r0.active())("flat", ctx_r0.flat())("disabled", ctx_r0.disabled())("icon", ctx_r0.icon())("no-bottom-radius", ctx_r0.noBottomRadius())("no-left-radius", ctx_r0.noLeftRadius())("no-radius", ctx_r0.noRadius())("no-right-radius", ctx_r0.noRightRadius())("no-top-radius", ctx_r0.noTopRadius())("no-scale", ctx_r0.noScale());
    \u0275\u0275property("ngClass", ctx_r0.style() + " " + ctx_r0.size())("disabled", ctx_r0.disabled());
    \u0275\u0275advance();
    \u0275\u0275property("ngTemplateOutlet", content_r2);
  }
}
function ButtonComponent_ng_template_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 6);
    \u0275\u0275projection(1);
    \u0275\u0275elementEnd();
  }
}
var ButtonComponent = class _ButtonComponent {
  constructor() {
  }
  onClick = output();
  style = input("default");
  size = input("default");
  icon = input(false);
  flat = input(false);
  link = input("");
  noRightRadius = input(false);
  noLeftRadius = input(false);
  noRadius = input(false);
  noTopRadius = input(false);
  noBottomRadius = input(false);
  active = input(false);
  disabled = input(false);
  routerLinkActive = viewChild(RouterLinkActive);
  noScale = input(false);
  onClickHandler(event) {
    if (this.disabled()) {
      event.preventDefault();
      return;
    }
    this.onClick.emit(event);
  }
  static \u0275fac = function ButtonComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _ButtonComponent)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _ButtonComponent, selectors: [["lg-button"]], viewQuery: function ButtonComponent_Query(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275viewQuerySignal(ctx.routerLinkActive, RouterLinkActive, 5);
    }
    if (rf & 2) {
      \u0275\u0275queryAdvance();
    }
  }, inputs: { style: [1, "style"], size: [1, "size"], icon: [1, "icon"], flat: [1, "flat"], link: [1, "link"], noRightRadius: [1, "noRightRadius"], noLeftRadius: [1, "noLeftRadius"], noRadius: [1, "noRadius"], noTopRadius: [1, "noTopRadius"], noBottomRadius: [1, "noBottomRadius"], active: [1, "active"], disabled: [1, "disabled"], noScale: [1, "noScale"] }, outputs: { onClick: "onClick" }, ngContentSelectors: _c0, decls: 4, vars: 1, consts: [["content", ""], [1, "button", 3, "active", "flat", "disabled", "icon", "no-bottom-radius", "no-left-radius", "no-radius", "no-right-radius", "no-top-radius", "no-scale", "ngClass", "routerLink", "routerLinkActive"], ["type", "button", 1, "button", 3, "active", "flat", "disabled", "icon", "no-bottom-radius", "no-left-radius", "no-radius", "no-right-radius", "no-top-radius", "no-scale", "ngClass"], [1, "button", 3, "ngClass", "routerLink", "routerLinkActive"], [4, "ngTemplateOutlet"], ["type", "button", 1, "button", 3, "click", "ngClass", "disabled"], [1, "button__content"]], template: function ButtonComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275projectionDef();
      \u0275\u0275conditionalCreate(0, ButtonComponent_Conditional_0_Template, 2, 25, "a", 1)(1, ButtonComponent_Conditional_1_Template, 2, 23, "button", 2);
      \u0275\u0275template(2, ButtonComponent_ng_template_2_Template, 2, 0, "ng-template", null, 0, \u0275\u0275templateRefExtractor);
    }
    if (rf & 2) {
      \u0275\u0275conditional(ctx.link() ? 0 : 1);
    }
  }, dependencies: [
    NgClass,
    RouterLink,
    NgTemplateOutlet,
    RouterLinkActive
  ], styles: ['/* angular:styles/component:scss;8ac13ad11ffba4a768451e725b28d24ea2f67453251848b0eb7f24a1666db557;/Users/khripunovpavel/Documents/my/lasagna/lasagna/src/app/shared/view/ui/layout/button.component.ts */\n.button {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  background-color: var(--card-bg);\n  color: var(--text-color);\n  padding: 16px 24px;\n  font-size: 1rem;\n  font-family: inherit;\n  border: none;\n  border-radius: 16px;\n  cursor: pointer;\n  appearance: none;\n  text-decoration: none;\n  transition: all 0.4s;\n  transition-timing-function: var(--bounce-bezier);\n  position: relative;\n  white-space: nowrap;\n}\n.button__content {\n  position: relative;\n  z-index: 1;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  gap: 8px;\n}\n.button.disabled {\n  opacity: 0.5;\n  -webkit-user-select: none;\n  user-select: none;\n  pointer-events: none;\n}\n.button:focus {\n  outline-color: var(--active-color);\n}\n.button:active:not(.no-scale) {\n  transform: scale(0.95);\n}\n@media (hover: hover) {\n  .button:hover:not(.no-scale) {\n    transform: scale(0.95);\n  }\n}\n.button.no-radius {\n  border-radius: 0 !important;\n}\n.button.no-top-radius {\n  border-top-left-radius: 0 !important;\n  border-top-right-radius: 0 !important;\n}\n.button.no-bottom-radius {\n  border-bottom-left-radius: 0 !important;\n  border-bottom-right-radius: 0 !important;\n}\n.button.no-right-radius {\n  border-top-right-radius: 0 !important;\n  border-bottom-right-radius: 0 !important;\n}\n.button.no-left-radius {\n  border-top-left-radius: 0 !important;\n  border-bottom-left-radius: 0 !important;\n}\n.button.active::before {\n  content: "";\n  position: absolute;\n  top: 0;\n  left: 0;\n  right: 0;\n  bottom: 0;\n  background-color: var(--button-flat-overlay);\n  border-radius: inherit;\n}\n.button.active.flat {\n  color: var(--active-color);\n}\n.button.active.flat::before {\n  display: none;\n}\n.button.default {\n  background-color: var(--button-default-bg);\n}\n.button.primary {\n  background-color: var(--button-primary-bg);\n}\n.button.primary.flat {\n  color: var(--button-primary-bg);\n}\n.button.secondary {\n  background-color: var(--button-secondary-bg);\n}\n.button.secondary.flat {\n  color: var(--button-secondary-bg);\n}\n.button.success {\n  background-color: var(--button-success-bg);\n  color: var(--button-success-text);\n}\n.button.success.flat {\n  color: var(--button-success-bg);\n}\n.button.danger {\n  background-color: var(--button-danger-bg);\n  color: var(--button-danger-text);\n}\n.button.danger.flat {\n  color: var(--button-danger-bg);\n}\n.button.warning {\n  background-color: var(--button-warning-bg);\n}\n.button.warning.flat {\n  color: var(--button-warning-bg);\n}\n.button.info {\n  background-color: var(--button-info-bg);\n}\n.button.info.flat {\n  color: var(--button-info-bg);\n}\n.button.small {\n  padding: 8px 16px;\n  font-size: 0.9rem;\n  border-radius: 12px;\n}\n.button.tiny {\n  padding: 4px 8px;\n  font-size: 0.8rem;\n  border-radius: 8px;\n}\n.button.transcluent {\n  -webkit-backdrop-filter: blur(3px);\n  backdrop-filter: blur(3px);\n  background-color: var(--button-transcluent-bg);\n}\n.button.icon {\n  border-radius: 50%;\n  padding: 16px;\n}\n.button.icon.medium {\n  padding: 10px;\n}\n.button.icon.medium .mat-icon {\n  font-size: 16px;\n}\n.button.icon.small {\n  padding: 0;\n}\n.button.icon.small .mat-icon {\n  font-size: 16px;\n}\n.button.icon.tiny {\n  padding: 2px;\n}\n.button.icon.tiny .mat-icon {\n  font-size: 10px;\n  width: 16px;\n  height: 16px;\n}\n.button.icon .mat-icon {\n  font-size: 24px;\n  width: 24px;\n  height: 24px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n}\n.button.flat {\n  padding: 0;\n  background-color: transparent;\n}\n/*# sourceMappingURL=button.component.css.map */\n'], encapsulation: 2 });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(ButtonComponent, [{
    type: Component,
    args: [{ selector: "lg-button", standalone: true, template: `
    @if (link()) {
      <a [class.active]="active()"
         [class.flat]="flat()"
         [class.disabled]="disabled()"
         [class.icon]="icon()"
         [class.no-bottom-radius]="noBottomRadius()"
         [class.no-left-radius]="noLeftRadius()"
         [class.no-radius]="noRadius()"
         [class.no-right-radius]="noRightRadius()"
         [class.no-top-radius]="noTopRadius()"
         [class.no-scale]="noScale()"
         [ngClass]="style() + ' ' + size()"
         [routerLink]="link() ? link() : null"
         [routerLinkActive]="['route-active']"
         class="button">
        <ng-container *ngTemplateOutlet="content"></ng-container>
      </a>
    } @else {
      <button (click)="onClickHandler($event)"
              [class.active]="active()"
              [class.flat]="flat()"
              [class.disabled]="disabled()"
              [class.icon]="icon()"
              [class.no-bottom-radius]="noBottomRadius()"
              [class.no-left-radius]="noLeftRadius()"
              [class.no-radius]="noRadius()"
              [class.no-right-radius]="noRightRadius()"
              [class.no-top-radius]="noTopRadius()"
              [class.no-scale]="noScale()"
              [ngClass]="style() + ' ' + size()"
              [disabled]="disabled()"
              class="button"
              type="button">
        <ng-container *ngTemplateOutlet="content"></ng-container>
      </button>
    }

    <ng-template #content>
         <span class="button__content">
              <ng-content></ng-content>
         </span>
    </ng-template>
  `, encapsulation: ViewEncapsulation.None, imports: [
      NgClass,
      RouterLink,
      NgTemplateOutlet,
      RouterLinkActive
    ], styles: ['/* angular:styles/component:scss;8ac13ad11ffba4a768451e725b28d24ea2f67453251848b0eb7f24a1666db557;/Users/khripunovpavel/Documents/my/lasagna/lasagna/src/app/shared/view/ui/layout/button.component.ts */\n.button {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  background-color: var(--card-bg);\n  color: var(--text-color);\n  padding: 16px 24px;\n  font-size: 1rem;\n  font-family: inherit;\n  border: none;\n  border-radius: 16px;\n  cursor: pointer;\n  appearance: none;\n  text-decoration: none;\n  transition: all 0.4s;\n  transition-timing-function: var(--bounce-bezier);\n  position: relative;\n  white-space: nowrap;\n}\n.button__content {\n  position: relative;\n  z-index: 1;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  gap: 8px;\n}\n.button.disabled {\n  opacity: 0.5;\n  -webkit-user-select: none;\n  user-select: none;\n  pointer-events: none;\n}\n.button:focus {\n  outline-color: var(--active-color);\n}\n.button:active:not(.no-scale) {\n  transform: scale(0.95);\n}\n@media (hover: hover) {\n  .button:hover:not(.no-scale) {\n    transform: scale(0.95);\n  }\n}\n.button.no-radius {\n  border-radius: 0 !important;\n}\n.button.no-top-radius {\n  border-top-left-radius: 0 !important;\n  border-top-right-radius: 0 !important;\n}\n.button.no-bottom-radius {\n  border-bottom-left-radius: 0 !important;\n  border-bottom-right-radius: 0 !important;\n}\n.button.no-right-radius {\n  border-top-right-radius: 0 !important;\n  border-bottom-right-radius: 0 !important;\n}\n.button.no-left-radius {\n  border-top-left-radius: 0 !important;\n  border-bottom-left-radius: 0 !important;\n}\n.button.active::before {\n  content: "";\n  position: absolute;\n  top: 0;\n  left: 0;\n  right: 0;\n  bottom: 0;\n  background-color: var(--button-flat-overlay);\n  border-radius: inherit;\n}\n.button.active.flat {\n  color: var(--active-color);\n}\n.button.active.flat::before {\n  display: none;\n}\n.button.default {\n  background-color: var(--button-default-bg);\n}\n.button.primary {\n  background-color: var(--button-primary-bg);\n}\n.button.primary.flat {\n  color: var(--button-primary-bg);\n}\n.button.secondary {\n  background-color: var(--button-secondary-bg);\n}\n.button.secondary.flat {\n  color: var(--button-secondary-bg);\n}\n.button.success {\n  background-color: var(--button-success-bg);\n  color: var(--button-success-text);\n}\n.button.success.flat {\n  color: var(--button-success-bg);\n}\n.button.danger {\n  background-color: var(--button-danger-bg);\n  color: var(--button-danger-text);\n}\n.button.danger.flat {\n  color: var(--button-danger-bg);\n}\n.button.warning {\n  background-color: var(--button-warning-bg);\n}\n.button.warning.flat {\n  color: var(--button-warning-bg);\n}\n.button.info {\n  background-color: var(--button-info-bg);\n}\n.button.info.flat {\n  color: var(--button-info-bg);\n}\n.button.small {\n  padding: 8px 16px;\n  font-size: 0.9rem;\n  border-radius: 12px;\n}\n.button.tiny {\n  padding: 4px 8px;\n  font-size: 0.8rem;\n  border-radius: 8px;\n}\n.button.transcluent {\n  -webkit-backdrop-filter: blur(3px);\n  backdrop-filter: blur(3px);\n  background-color: var(--button-transcluent-bg);\n}\n.button.icon {\n  border-radius: 50%;\n  padding: 16px;\n}\n.button.icon.medium {\n  padding: 10px;\n}\n.button.icon.medium .mat-icon {\n  font-size: 16px;\n}\n.button.icon.small {\n  padding: 0;\n}\n.button.icon.small .mat-icon {\n  font-size: 16px;\n}\n.button.icon.tiny {\n  padding: 2px;\n}\n.button.icon.tiny .mat-icon {\n  font-size: 10px;\n  width: 16px;\n  height: 16px;\n}\n.button.icon .mat-icon {\n  font-size: 24px;\n  width: 24px;\n  height: 24px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n}\n.button.flat {\n  padding: 0;\n  background-color: transparent;\n}\n/*# sourceMappingURL=button.component.css.map */\n'] }]
  }], () => [], null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(ButtonComponent, { className: "ButtonComponent", filePath: "src/app/shared/view/ui/layout/button.component.ts", lineNumber: 292 });
})();

export {
  ButtonComponent
};
//# sourceMappingURL=chunk-PTCGLHTR.js.map
