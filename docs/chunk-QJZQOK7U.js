import {
  WINDOW
} from "./chunk-CFXQGSQM.js";
import {
  Component,
  ElementRef,
  Input,
  Renderer2,
  inject,
  setClassMetadata,
  ɵsetClassDebugInfo,
  ɵɵNgOnChangesFeature,
  ɵɵdefineComponent,
  ɵɵdirectiveInject
} from "./chunk-IYCVPBRB.js";

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
  _window = inject(WINDOW);
  get _appendTarget() {
    if (!this.appendTarget) {
      return this._elementRef.nativeElement;
    }
    return this.appendTarget === "body" ? this._window?.document.body : this.appendTarget;
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
    args: [{ selector: "lg-portal", standalone: true, template: "", styles: ["/* angular:styles/component:scss;bd54c89edc42bdd32f8479c69ccf61b18b42d381a93623ef0b46c57ec95eccdc;/Users/khripunovpavel/Documents/my/lasagna/lasagna/src/app/shared/view/ui/portal.component.ts */\n:host {\n  display: flex;\n  height: 100%;\n  width: 100%;\n}\n/*# sourceMappingURL=portal.component.css.map */\n"] }]
  }], () => [{ type: Renderer2 }, { type: ElementRef }], { targetElement: [{
    type: Input
  }], appendTarget: [{
    type: Input
  }], wrapClass: [{
    type: Input
  }] });
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(PortalComponent, { className: "PortalComponent", filePath: "src/app/shared/view/ui/portal.component.ts", lineNumber: 28 });
})();

export {
  PortalComponent
};
//# sourceMappingURL=chunk-QJZQOK7U.js.map
