import {
  RouterLink,
  RouterLinkActive
} from "./chunk-SHM3W5T3.js";
import {
  NgClass,
  NgTemplateOutlet
} from "./chunk-7I2CR6I6.js";
import {
  Component,
  ViewEncapsulation,
  input,
  output,
  setClassMetadata,
  viewChild,
  ɵsetClassDebugInfo,
  ɵɵadvance,
  ɵɵattribute,
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
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵviewQuerySignal
} from "./chunk-RQATVJ2P.js";

// src/app/shared/view/ui/button/button.component.ts
var _c0 = ["*"];
var _c1 = () => ["route-active"];
function ButtonComponent_Conditional_1_ng_container_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementContainer(0);
  }
}
function ButtonComponent_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "a", 5);
    \u0275\u0275template(1, ButtonComponent_Conditional_1_ng_container_1_Template, 1, 0, "ng-container", 6);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    const content_r2 = \u0275\u0275reference(5);
    \u0275\u0275classProp("active", ctx_r0.active())("flat", ctx_r0.flat())("transparent", ctx_r0.transparent())("disabled", ctx_r0.disabled())("outlined", ctx_r0.outlined())("icon", ctx_r0.icon())("no-bottom-radius", ctx_r0.noBottomRadius())("no-left-radius", ctx_r0.noLeftRadius())("no-radius", ctx_r0.noRadius())("no-right-radius", ctx_r0.noRightRadius())("no-top-radius", ctx_r0.noTopRadius())("no-scale", ctx_r0.noScale());
    \u0275\u0275property("ngClass", ctx_r0.style() + " " + ctx_r0.size())("routerLink", ctx_r0.link() ? ctx_r0.link() : null)("routerLinkActive", \u0275\u0275pureFunction0(28, _c1));
    \u0275\u0275advance();
    \u0275\u0275property("ngTemplateOutlet", content_r2);
  }
}
function ButtonComponent_Conditional_2_ng_container_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementContainer(0);
  }
}
function ButtonComponent_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    const _r3 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 7);
    \u0275\u0275listener("click", function ButtonComponent_Conditional_2_Template_button_click_0_listener($event) {
      \u0275\u0275restoreView(_r3);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.onClickHandler($event));
    });
    \u0275\u0275template(1, ButtonComponent_Conditional_2_ng_container_1_Template, 1, 0, "ng-container", 6);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    const content_r2 = \u0275\u0275reference(5);
    \u0275\u0275classProp("active", ctx_r0.active())("flat", ctx_r0.flat())("transparent", ctx_r0.transparent())("disabled", ctx_r0.disabled())("outlined", ctx_r0.outlined())("icon", ctx_r0.icon())("no-bottom-radius", ctx_r0.noBottomRadius())("no-left-radius", ctx_r0.noLeftRadius())("no-radius", ctx_r0.noRadius())("no-right-radius", ctx_r0.noRightRadius())("no-top-radius", ctx_r0.noTopRadius())("no-scale", ctx_r0.noScale());
    \u0275\u0275property("ngClass", ctx_r0.style() + " " + ctx_r0.size())("disabled", ctx_r0.disabled());
    \u0275\u0275attribute("type", ctx_r0.type());
    \u0275\u0275advance();
    \u0275\u0275property("ngTemplateOutlet", content_r2);
  }
}
function ButtonComponent_Conditional_3_Template(rf, ctx) {
  if (rf & 1) {
    const _r4 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "span", 8);
    \u0275\u0275listener("click", function ButtonComponent_Conditional_3_Template_span_click_0_listener($event) {
      \u0275\u0275restoreView(_r4);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.onClickHandler($event));
    });
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275property("routerLink", ctx_r0.link() ? ctx_r0.link() : null)("routerLinkActive", \u0275\u0275pureFunction0(3, _c1));
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r0.label());
  }
}
function ButtonComponent_ng_template_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 9);
    \u0275\u0275projection(1);
    \u0275\u0275elementEnd();
  }
}
var ButtonComponent = class _ButtonComponent {
  constructor() {
  }
  onClick = output();
  style = input("default", ...ngDevMode ? [{ debugName: "style" }] : []);
  type = input("button", ...ngDevMode ? [{ debugName: "type" }] : []);
  size = input("regular", ...ngDevMode ? [{ debugName: "size" }] : []);
  outlined = input(false, ...ngDevMode ? [{ debugName: "outlined" }] : []);
  icon = input(false, ...ngDevMode ? [{ debugName: "icon" }] : []);
  flat = input(false, ...ngDevMode ? [{ debugName: "flat" }] : []);
  transparent = input(false, ...ngDevMode ? [{ debugName: "transparent" }] : []);
  link = input("", ...ngDevMode ? [{ debugName: "link" }] : []);
  noRightRadius = input(false, ...ngDevMode ? [{ debugName: "noRightRadius" }] : []);
  noLeftRadius = input(false, ...ngDevMode ? [{ debugName: "noLeftRadius" }] : []);
  noRadius = input(false, ...ngDevMode ? [{ debugName: "noRadius" }] : []);
  noTopRadius = input(false, ...ngDevMode ? [{ debugName: "noTopRadius" }] : []);
  noBottomRadius = input(false, ...ngDevMode ? [{ debugName: "noBottomRadius" }] : []);
  active = input(false, ...ngDevMode ? [{ debugName: "active" }] : []);
  disabled = input(false, ...ngDevMode ? [{ debugName: "disabled" }] : []);
  routerLinkActive = viewChild(RouterLinkActive, ...ngDevMode ? [{ debugName: "routerLinkActive" }] : []);
  noScale = input(false, ...ngDevMode ? [{ debugName: "noScale" }] : []);
  label = input("", ...ngDevMode ? [{ debugName: "label" }] : []);
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
  }, inputs: { style: [1, "style"], type: [1, "type"], size: [1, "size"], outlined: [1, "outlined"], icon: [1, "icon"], flat: [1, "flat"], transparent: [1, "transparent"], link: [1, "link"], noRightRadius: [1, "noRightRadius"], noLeftRadius: [1, "noLeftRadius"], noRadius: [1, "noRadius"], noTopRadius: [1, "noTopRadius"], noBottomRadius: [1, "noBottomRadius"], active: [1, "active"], disabled: [1, "disabled"], noScale: [1, "noScale"], label: [1, "label"] }, outputs: { onClick: "onClick" }, ngContentSelectors: _c0, decls: 6, vars: 2, consts: [["content", ""], [1, "button-wrap"], [1, "button", 3, "active", "flat", "transparent", "disabled", "outlined", "icon", "no-bottom-radius", "no-left-radius", "no-radius", "no-right-radius", "no-top-radius", "no-scale", "ngClass", "routerLink", "routerLinkActive"], ["type", "button", 1, "button", 3, "active", "flat", "transparent", "disabled", "outlined", "icon", "no-bottom-radius", "no-left-radius", "no-radius", "no-right-radius", "no-top-radius", "no-scale", "ngClass"], [1, "button__label", 3, "routerLink", "routerLinkActive"], [1, "button", 3, "ngClass", "routerLink", "routerLinkActive"], [4, "ngTemplateOutlet"], ["type", "button", 1, "button", 3, "click", "ngClass", "disabled"], [1, "button__label", 3, "click", "routerLink", "routerLinkActive"], [1, "button__content"]], template: function ButtonComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275projectionDef();
      \u0275\u0275elementStart(0, "div", 1);
      \u0275\u0275conditionalCreate(1, ButtonComponent_Conditional_1_Template, 2, 29, "a", 2)(2, ButtonComponent_Conditional_2_Template, 2, 28, "button", 3);
      \u0275\u0275conditionalCreate(3, ButtonComponent_Conditional_3_Template, 2, 4, "span", 4);
      \u0275\u0275template(4, ButtonComponent_ng_template_4_Template, 2, 0, "ng-template", null, 0, \u0275\u0275templateRefExtractor);
      \u0275\u0275elementEnd();
    }
    if (rf & 2) {
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.link() ? 1 : 2);
      \u0275\u0275advance(2);
      \u0275\u0275conditional(ctx.label() ? 3 : -1);
    }
  }, dependencies: [
    NgClass,
    RouterLink,
    NgTemplateOutlet,
    RouterLinkActive
  ], styles: ['/* src/app/shared/view/ui/button/button.component.scss */\n.button-wrap {\n  display: flex;\n  gap: 8px;\n  position: relative;\n}\n.button-wrap:hover {\n  cursor: pointer;\n}\n.button {\n  z-index: 1;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  background-color: var(--card-bg);\n  color: var(--text-color);\n  padding: 14px 22px;\n  font-size: 1rem;\n  font-family: inherit;\n  border: 1px solid transparent;\n  border-radius: 16px;\n  cursor: pointer;\n  appearance: none;\n  text-decoration: none;\n  transition: all 0.4s;\n  transition-timing-function: var(--bounce-bezier);\n  white-space: nowrap;\n}\n.button__content {\n  position: relative;\n  z-index: 1;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  gap: 8px;\n}\n.button.disabled {\n  opacity: 0.5;\n  -webkit-user-select: none;\n  user-select: none;\n  pointer-events: none;\n}\n.button:focus {\n  outline-color: var(--active-color);\n}\n.button:active:not(.no-scale) {\n  transform: scale(0.95);\n}\n@media (hover: hover) {\n  .button:hover:not(.no-scale) {\n    transform: scale(0.95);\n  }\n}\n.button.no-radius {\n  border-radius: 0 !important;\n}\n.button.no-top-radius {\n  border-top-left-radius: 0 !important;\n  border-top-right-radius: 0 !important;\n}\n.button.no-bottom-radius {\n  border-bottom-left-radius: 0 !important;\n  border-bottom-right-radius: 0 !important;\n}\n.button.no-right-radius {\n  border-top-right-radius: 0 !important;\n  border-bottom-right-radius: 0 !important;\n}\n.button.no-left-radius {\n  border-top-left-radius: 0 !important;\n  border-bottom-left-radius: 0 !important;\n}\n.button.active::before {\n  content: "";\n  position: absolute;\n  top: 0;\n  left: 0;\n  right: 0;\n  bottom: 0;\n  background-color: var(--button-flat-overlay);\n  border-radius: inherit;\n}\n.button.active.flat {\n  color: var(--active-color);\n}\n.button.active.flat::before {\n  display: none;\n}\n.button.transparent {\n  background-color: transparent !important;\n}\n.button.default {\n  background-color: var(--button-default-bg);\n  color: var(--button-default-text);\n}\n.button.default.flat {\n  color: var(--button-default-bg);\n}\n.button.default.outlined {\n  background-color: transparent;\n  border-color: var(--button-default-bg);\n  color: var(--button-default-bg);\n}\n.button.solid {\n  background-color: var(--button-solid-text);\n  color: var(--button-solid-text);\n}\n.button.solid.flat {\n  color: var(--button-solid-bg);\n}\n.button.solid.outlined {\n  background-color: transparent;\n  border-color: var(--button-solid-bg);\n}\n.button.primary {\n  background-color: var(--button-primary-bg);\n  color: var(--button-primary-text);\n}\n.button.primary.flat {\n  color: var(--button-primary-bg);\n}\n.button.primary.outlined {\n  background-color: transparent;\n  border-color: var(--button-primary-bg);\n  color: var(--button-primary-bg);\n}\n.button.secondary {\n  background-color: var(--button-secondary-bg);\n}\n.button.secondary.flat {\n  color: var(--button-secondary-bg);\n}\n.button.secondary.outlined {\n  background-color: transparent;\n  border-color: var(--button-secondary-bg);\n  color: var(--button-secondary-bg);\n}\n.button.secondary-dark {\n  background-color: var(--button-secondary-dark-bg);\n}\n.button.secondary-dark.flat {\n  color: var(--button-secondary-dark-bg);\n}\n.button.secondary-dark.outlined {\n  background-color: transparent;\n  border-color: var(--button-secondary-dark-bg);\n  color: var(--button-secondary-dark-bg);\n}\n.button.success {\n  background-color: var(--button-success-bg);\n  color: var(--button-success-text);\n}\n.button.success.flat {\n  color: var(--button-success-bg);\n}\n.button.danger {\n  background-color: var(--button-danger-bg);\n  color: var(--button-danger-text);\n}\n.button.danger.flat {\n  color: var(--button-danger-bg);\n}\n.button.warning {\n  background-color: var(--button-warning-bg);\n}\n.button.warning.flat {\n  color: var(--button-warning-bg);\n}\n.button.warning.transparent {\n  color: var(--button-warning-bg);\n}\n.button.info {\n  background-color: var(--button-info-bg);\n}\n.button.info.flat {\n  color: var(--button-info-bg);\n}\n.button.small {\n  padding: 11px 16px;\n  font-size: 14px;\n  border-radius: 12px;\n}\n.button.tiny {\n  padding: 4px 8px;\n  font-size: 0.8rem;\n  border-radius: 8px;\n}\n.button.transcluent {\n  -webkit-backdrop-filter: blur(3px);\n  backdrop-filter: blur(3px);\n  background-color: var(--button-transcluent-bg);\n}\n.button.icon {\n  border-radius: 50%;\n  padding: 16px;\n}\n.button.icon.medium {\n  padding: 10px;\n}\n.button.icon.medium .mat-icon {\n  font-size: 16px;\n}\n.button.icon.small {\n  padding: 0;\n}\n.button.icon.small .mat-icon {\n  font-size: 16px;\n}\n.button.icon.tiny {\n  padding: 2px;\n}\n.button.icon.tiny .mat-icon {\n  font-size: 16px;\n  width: 16px;\n  height: 16px;\n}\n.button.icon .mat-icon {\n  font-size: 24px;\n  width: 24px;\n  height: 24px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n}\n.button.flat {\n  padding: 0;\n  background-color: transparent;\n}\n/*# sourceMappingURL=button.component.css.map */\n'], encapsulation: 2 });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(ButtonComponent, [{
    type: Component,
    args: [{ selector: "lg-button", standalone: true, encapsulation: ViewEncapsulation.None, imports: [
      NgClass,
      RouterLink,
      NgTemplateOutlet,
      RouterLinkActive
    ], template: `<div class="button-wrap">
  @if (link()) {
    <a [class.active]="active()"
       [class.flat]="flat()"
       [class.transparent]="transparent()"
       [class.disabled]="disabled()"
       [class.outlined]="outlined()"
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
            [class.transparent]="transparent()"
            [attr.type]="type()"
            [class.disabled]="disabled()"
            [class.outlined]="outlined()"
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

  @if (label()) {
    <span class="button__label"
          (click)="onClickHandler($event)"
          [routerLink]="link() ? link() : null"
          [routerLinkActive]="['route-active']">{{ label() }}</span>
  }

  <ng-template #content>
    <div class="button__content">
      <ng-content></ng-content>
    </div>
  </ng-template>

</div>
`, styles: ['/* src/app/shared/view/ui/button/button.component.scss */\n.button-wrap {\n  display: flex;\n  gap: 8px;\n  position: relative;\n}\n.button-wrap:hover {\n  cursor: pointer;\n}\n.button {\n  z-index: 1;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  background-color: var(--card-bg);\n  color: var(--text-color);\n  padding: 14px 22px;\n  font-size: 1rem;\n  font-family: inherit;\n  border: 1px solid transparent;\n  border-radius: 16px;\n  cursor: pointer;\n  appearance: none;\n  text-decoration: none;\n  transition: all 0.4s;\n  transition-timing-function: var(--bounce-bezier);\n  white-space: nowrap;\n}\n.button__content {\n  position: relative;\n  z-index: 1;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  gap: 8px;\n}\n.button.disabled {\n  opacity: 0.5;\n  -webkit-user-select: none;\n  user-select: none;\n  pointer-events: none;\n}\n.button:focus {\n  outline-color: var(--active-color);\n}\n.button:active:not(.no-scale) {\n  transform: scale(0.95);\n}\n@media (hover: hover) {\n  .button:hover:not(.no-scale) {\n    transform: scale(0.95);\n  }\n}\n.button.no-radius {\n  border-radius: 0 !important;\n}\n.button.no-top-radius {\n  border-top-left-radius: 0 !important;\n  border-top-right-radius: 0 !important;\n}\n.button.no-bottom-radius {\n  border-bottom-left-radius: 0 !important;\n  border-bottom-right-radius: 0 !important;\n}\n.button.no-right-radius {\n  border-top-right-radius: 0 !important;\n  border-bottom-right-radius: 0 !important;\n}\n.button.no-left-radius {\n  border-top-left-radius: 0 !important;\n  border-bottom-left-radius: 0 !important;\n}\n.button.active::before {\n  content: "";\n  position: absolute;\n  top: 0;\n  left: 0;\n  right: 0;\n  bottom: 0;\n  background-color: var(--button-flat-overlay);\n  border-radius: inherit;\n}\n.button.active.flat {\n  color: var(--active-color);\n}\n.button.active.flat::before {\n  display: none;\n}\n.button.transparent {\n  background-color: transparent !important;\n}\n.button.default {\n  background-color: var(--button-default-bg);\n  color: var(--button-default-text);\n}\n.button.default.flat {\n  color: var(--button-default-bg);\n}\n.button.default.outlined {\n  background-color: transparent;\n  border-color: var(--button-default-bg);\n  color: var(--button-default-bg);\n}\n.button.solid {\n  background-color: var(--button-solid-text);\n  color: var(--button-solid-text);\n}\n.button.solid.flat {\n  color: var(--button-solid-bg);\n}\n.button.solid.outlined {\n  background-color: transparent;\n  border-color: var(--button-solid-bg);\n}\n.button.primary {\n  background-color: var(--button-primary-bg);\n  color: var(--button-primary-text);\n}\n.button.primary.flat {\n  color: var(--button-primary-bg);\n}\n.button.primary.outlined {\n  background-color: transparent;\n  border-color: var(--button-primary-bg);\n  color: var(--button-primary-bg);\n}\n.button.secondary {\n  background-color: var(--button-secondary-bg);\n}\n.button.secondary.flat {\n  color: var(--button-secondary-bg);\n}\n.button.secondary.outlined {\n  background-color: transparent;\n  border-color: var(--button-secondary-bg);\n  color: var(--button-secondary-bg);\n}\n.button.secondary-dark {\n  background-color: var(--button-secondary-dark-bg);\n}\n.button.secondary-dark.flat {\n  color: var(--button-secondary-dark-bg);\n}\n.button.secondary-dark.outlined {\n  background-color: transparent;\n  border-color: var(--button-secondary-dark-bg);\n  color: var(--button-secondary-dark-bg);\n}\n.button.success {\n  background-color: var(--button-success-bg);\n  color: var(--button-success-text);\n}\n.button.success.flat {\n  color: var(--button-success-bg);\n}\n.button.danger {\n  background-color: var(--button-danger-bg);\n  color: var(--button-danger-text);\n}\n.button.danger.flat {\n  color: var(--button-danger-bg);\n}\n.button.warning {\n  background-color: var(--button-warning-bg);\n}\n.button.warning.flat {\n  color: var(--button-warning-bg);\n}\n.button.warning.transparent {\n  color: var(--button-warning-bg);\n}\n.button.info {\n  background-color: var(--button-info-bg);\n}\n.button.info.flat {\n  color: var(--button-info-bg);\n}\n.button.small {\n  padding: 11px 16px;\n  font-size: 14px;\n  border-radius: 12px;\n}\n.button.tiny {\n  padding: 4px 8px;\n  font-size: 0.8rem;\n  border-radius: 8px;\n}\n.button.transcluent {\n  -webkit-backdrop-filter: blur(3px);\n  backdrop-filter: blur(3px);\n  background-color: var(--button-transcluent-bg);\n}\n.button.icon {\n  border-radius: 50%;\n  padding: 16px;\n}\n.button.icon.medium {\n  padding: 10px;\n}\n.button.icon.medium .mat-icon {\n  font-size: 16px;\n}\n.button.icon.small {\n  padding: 0;\n}\n.button.icon.small .mat-icon {\n  font-size: 16px;\n}\n.button.icon.tiny {\n  padding: 2px;\n}\n.button.icon.tiny .mat-icon {\n  font-size: 16px;\n  width: 16px;\n  height: 16px;\n}\n.button.icon .mat-icon {\n  font-size: 24px;\n  width: 24px;\n  height: 24px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n}\n.button.flat {\n  padding: 0;\n  background-color: transparent;\n}\n/*# sourceMappingURL=button.component.css.map */\n'] }]
  }], () => [], null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(ButtonComponent, { className: "ButtonComponent", filePath: "src/app/shared/view/ui/button/button.component.ts", lineNumber: 35 });
})();

export {
  ButtonComponent
};
//# sourceMappingURL=chunk-4JEN4JYG.js.map
