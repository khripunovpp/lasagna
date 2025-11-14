import {
  TranslatePipe
} from "./chunk-DXRFKXPR.js";
import {
  FlexColumnComponent
} from "./chunk-L3Q75KKL.js";
import {
  Component,
  ElementRef,
  Input,
  Renderer2,
  input,
  setClassMetadata,
  signal,
  ɵsetClassDebugInfo,
  ɵɵNgOnChangesFeature,
  ɵɵadvance,
  ɵɵclassProp,
  ɵɵconditional,
  ɵɵconditionalCreate,
  ɵɵdefineComponent,
  ɵɵdirectiveInject,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵgetCurrentView,
  ɵɵlistener,
  ɵɵnextContext,
  ɵɵpipe,
  ɵɵpipeBind1,
  ɵɵprojection,
  ɵɵprojectionDef,
  ɵɵresetView,
  ɵɵrestoreView,
  ɵɵtext,
  ɵɵtextInterpolate1
} from "./chunk-RQATVJ2P.js";

// src/app/shared/view/ui/portal.component.ts
var PortalComponent = class _PortalComponent {
  renderer;
  _elementRef;
  constructor(renderer, _elementRef) {
    this.renderer = renderer;
    this._elementRef = _elementRef;
  }
  targetElement;
  appendTarget = "";
  wrapClass = "";
  portalContainer;
  get _appendTarget() {
    if (!this.appendTarget) {
      return this._elementRef.nativeElement;
    }
    return this.appendTarget === "body" ? document.body : this.appendTarget;
  }
  ngOnChanges(changes) {
    if (changes["wrapClass"] && this.portalContainer) {
      if (this.wrapClass) {
        const classes = this.wrapClass.split(" ");
        classes.forEach((c) => this.renderer.addClass(this.portalContainer, c));
      } else {
        this.portalContainer.className = "";
      }
    }
  }
  ngAfterViewInit() {
    this.portalContainer = this.renderer.createElement("div");
    this.renderer.appendChild(this._appendTarget, this.portalContainer);
    if (this.targetElement) {
      if (this.wrapClass) {
        const classes = this.wrapClass.split(" ");
        classes.forEach((c) => this.renderer.addClass(this.portalContainer, c));
      }
      this.renderer.appendChild(this.portalContainer, this.targetElement);
    }
  }
  ngOnDestroy() {
    if (this.targetElement) {
      this.renderer.removeChild(this.portalContainer, this.targetElement);
    }
    this.renderer.removeChild(this._appendTarget, this.portalContainer);
  }
  static \u0275fac = function PortalComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _PortalComponent)(\u0275\u0275directiveInject(Renderer2), \u0275\u0275directiveInject(ElementRef));
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _PortalComponent, selectors: [["lg-portal"]], inputs: { targetElement: "targetElement", appendTarget: "appendTarget", wrapClass: "wrapClass" }, features: [\u0275\u0275NgOnChangesFeature], decls: 0, vars: 0, template: function PortalComponent_Template(rf, ctx) {
  }, styles: ["\n\n[_nghost-%COMP%] {\n  display: flex;\n  height: 100%;\n  width: 100%;\n}\n/*# sourceMappingURL=portal.component.css.map */"] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(PortalComponent, [{
    type: Component,
    args: [{ selector: "lg-portal", standalone: true, template: "", styles: ["/* angular:styles/component:scss;4be5c09aa79d793d8f4230f5407196404f9e2f51a19d4a33d4469266cd1ad10a;/Users/khripunovpavel/Documents/my/lasagna/lasagna/src/app/shared/view/ui/portal.component.ts */\n:host {\n  display: flex;\n  height: 100%;\n  width: 100%;\n}\n/*# sourceMappingURL=portal.component.css.map */\n"] }]
  }], () => [{ type: Renderer2 }, { type: ElementRef }], { targetElement: [{
    type: Input
  }], appendTarget: [{
    type: Input
  }], wrapClass: [{
    type: Input
  }] });
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(PortalComponent, { className: "PortalComponent", filePath: "src/app/shared/view/ui/portal.component.ts", lineNumber: 26 });
})();

// src/app/shared/view/ui/expander.component.ts
var _c0 = ["*"];
function ExpanderComponent_Conditional_1_Conditional_0_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275text(0);
    \u0275\u0275pipe(1, "translate");
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(3);
    \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind1(1, 1, ctx_r1.openLabel ?? "open-label"), " ");
  }
}
function ExpanderComponent_Conditional_1_Conditional_0_Conditional_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275text(0);
    \u0275\u0275pipe(1, "translate");
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(3);
    \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind1(1, 1, ctx_r1.closeLabel ?? "close-label"), " ");
  }
}
function ExpanderComponent_Conditional_1_Conditional_0_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 1)(1, "div", 4);
    \u0275\u0275listener("click", function ExpanderComponent_Conditional_1_Conditional_0_Template_div_click_1_listener($event) {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.toggle($event));
    });
    \u0275\u0275conditionalCreate(2, ExpanderComponent_Conditional_1_Conditional_0_Conditional_2_Template, 2, 3)(3, ExpanderComponent_Conditional_1_Conditional_0_Conditional_3_Template, 2, 3);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(2);
    \u0275\u0275conditional(ctx_r1.flat() ? 2 : 3);
  }
}
function ExpanderComponent_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275conditionalCreate(0, ExpanderComponent_Conditional_1_Conditional_0_Template, 4, 1, "div", 1);
    \u0275\u0275elementStart(1, "div", 2)(2, "lg-flex-column", 3);
    \u0275\u0275projection(3);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275conditional(!ctx_r1.once() ? 0 : -1);
  }
}
function ExpanderComponent_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    const _r3 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 1)(1, "div", 5);
    \u0275\u0275listener("click", function ExpanderComponent_Conditional_2_Template_div_click_1_listener($event) {
      \u0275\u0275restoreView(_r3);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.toggle($event));
    });
    \u0275\u0275text(2);
    \u0275\u0275pipe(3, "translate");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind1(3, 1, ctx_r1.openLabel ?? "open-label"), " ");
  }
}
var ExpanderComponent = class _ExpanderComponent {
  constructor() {
  }
  size = signal("medium", ...ngDevMode ? [{ debugName: "size" }] : []);
  opened = signal(false, ...ngDevMode ? [{ debugName: "opened" }] : []);
  flat = input(false, ...ngDevMode ? [{ debugName: "flat" }] : []);
  once = input(false, ...ngDevMode ? [{ debugName: "once" }] : []);
  openLabel = "Open";
  closeLabel = "Close";
  toggle(event) {
    if (event) {
      event.preventDefault();
      event.stopPropagation();
    }
    this.opened.set(!this.opened());
  }
  static \u0275fac = function ExpanderComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _ExpanderComponent)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _ExpanderComponent, selectors: [["lg-expander"]], inputs: { flat: [1, "flat"], once: [1, "once"], openLabel: "openLabel", closeLabel: "closeLabel" }, ngContentSelectors: _c0, decls: 3, vars: 5, consts: [[1, "expander"], [1, "expander__header"], [1, "expander__content"], ["size", "medium"], [1, "expander__close", 3, "click"], [1, "expander__trigger", 3, "click"]], template: function ExpanderComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275projectionDef();
      \u0275\u0275elementStart(0, "div", 0);
      \u0275\u0275conditionalCreate(1, ExpanderComponent_Conditional_1_Template, 4, 1)(2, ExpanderComponent_Conditional_2_Template, 4, 3, "div", 1);
      \u0275\u0275elementEnd();
    }
    if (rf & 2) {
      \u0275\u0275classProp("flat", ctx.flat())("opened", ctx.opened());
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.opened() ? 1 : 2);
    }
  }, dependencies: [
    FlexColumnComponent,
    TranslatePipe
  ], styles: ["\n\n.expander[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  border-radius: 32px;\n  background-color: #fff;\n  overflow: hidden;\n}\n.expander__trigger[_ngcontent-%COMP%], \n.expander__close[_ngcontent-%COMP%] {\n  cursor: pointer;\n}\n.expander__close[_ngcontent-%COMP%] {\n  text-align: right;\n}\n.expander__header[_ngcontent-%COMP%] {\n  padding: 24px;\n}\n.expander__content[_ngcontent-%COMP%] {\n  padding: 24px;\n}\n.expander.opened[_ngcontent-%COMP%]   .expander__header[_ngcontent-%COMP%] {\n  background-color: var(--control-bg);\n}\n.expander.flat[_ngcontent-%COMP%] {\n  background-color: transparent;\n  border-radius: 0;\n}\n.expander.flat.opened[_ngcontent-%COMP%]   .expander__header[_ngcontent-%COMP%] {\n  background-color: transparent;\n}\n.expander.flat.opened[_ngcontent-%COMP%]   .expander__close[_ngcontent-%COMP%] {\n  text-align: left;\n}\n.expander.flat[_ngcontent-%COMP%]   .expander__content[_ngcontent-%COMP%] {\n  padding: 0;\n}\n.expander.flat[_ngcontent-%COMP%]   .expander__header[_ngcontent-%COMP%] {\n  padding: 0;\n}\n/*# sourceMappingURL=expander.component.css.map */"] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(ExpanderComponent, [{
    type: Component,
    args: [{ selector: "lg-expander", standalone: true, template: `
    <div [class.flat]="flat()"
         [class.opened]="opened()"
         class="expander">
      @if (opened()) {
        @if (!once()) {
          <div class="expander__header">
            <div (click)="toggle($event)" class="expander__close">
              @if (flat()) {
                {{ (openLabel ?? 'open-label') | translate }}
              } @else {
                {{ (closeLabel ?? 'close-label') | translate }}
              }
            </div>
          </div>
        }

        <div class="expander__content">
          <lg-flex-column size="medium">
            <ng-content></ng-content>
          </lg-flex-column>
        </div>
      } @else {
        <div class="expander__header">
          <div (click)="toggle($event)" class="expander__trigger">
            {{ (openLabel ?? 'open-label') | translate }}
          </div>
        </div>
      }
    </div>
  `, imports: [
      FlexColumnComponent,
      TranslatePipe
    ], styles: ["/* angular:styles/component:scss;1d96a8b96135aa4d1ce3e7126bbc19f46954a1a3ca3346a4a72b2e98a4830113;/Users/khripunovpavel/Documents/my/lasagna/lasagna/src/app/shared/view/ui/expander.component.ts */\n.expander {\n  display: flex;\n  flex-direction: column;\n  border-radius: 32px;\n  background-color: #fff;\n  overflow: hidden;\n}\n.expander__trigger,\n.expander__close {\n  cursor: pointer;\n}\n.expander__close {\n  text-align: right;\n}\n.expander__header {\n  padding: 24px;\n}\n.expander__content {\n  padding: 24px;\n}\n.expander.opened .expander__header {\n  background-color: var(--control-bg);\n}\n.expander.flat {\n  background-color: transparent;\n  border-radius: 0;\n}\n.expander.flat.opened .expander__header {\n  background-color: transparent;\n}\n.expander.flat.opened .expander__close {\n  text-align: left;\n}\n.expander.flat .expander__content {\n  padding: 0;\n}\n.expander.flat .expander__header {\n  padding: 0;\n}\n/*# sourceMappingURL=expander.component.css.map */\n"] }]
  }], () => [], { openLabel: [{
    type: Input
  }], closeLabel: [{
    type: Input
  }] });
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(ExpanderComponent, { className: "ExpanderComponent", filePath: "src/app/shared/view/ui/expander.component.ts", lineNumber: 101 });
})();

export {
  PortalComponent,
  ExpanderComponent
};
//# sourceMappingURL=chunk-5SBCRB6Y.js.map
