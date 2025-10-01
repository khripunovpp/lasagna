import {
  animate,
  style,
  transition,
  trigger
} from "./chunk-R4FNXVZE.js";
import {
  Component,
  HostBinding,
  setClassMetadata,
  ɵsetClassDebugInfo,
  ɵɵdefineComponent,
  ɵɵdomElementEnd,
  ɵɵdomElementStart,
  ɵɵprojection,
  ɵɵprojectionDef,
  ɵɵproperty,
  ɵɵstyleProp
} from "./chunk-LM33AOL5.js";

// src/app/shared/view/ui/controls-bar/controls-bar.component.ts
var _c0 = ["*"];
var ControlsBarComponent = class _ControlsBarComponent {
  bottomPosition = "40px";
  ngAfterViewInit() {
  }
  ngOnDestroy() {
  }
  static \u0275fac = function ControlsBarComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _ControlsBarComponent)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _ControlsBarComponent, selectors: [["lg-controls-bar"]], hostVars: 2, hostBindings: function ControlsBarComponent_HostBindings(rf, ctx) {
    if (rf & 2) {
      \u0275\u0275styleProp("--controls-bar-shift", ctx.bottomPosition);
    }
  }, ngContentSelectors: _c0, decls: 4, vars: 1, consts: [["bar", ""], [1, "lg-controls-bar"], [1, "lg-controls-bar__content"]], template: function ControlsBarComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275projectionDef();
      \u0275\u0275domElementStart(0, "div", 1, 0)(2, "div", 2);
      \u0275\u0275projection(3);
      \u0275\u0275domElementEnd()();
    }
    if (rf & 2) {
      \u0275\u0275property("@fromLeft", void 0);
    }
  }, styles: ["\n\n.lg-controls-bar[_ngcontent-%COMP%] {\n  position: fixed;\n  z-index: 5;\n  right: 50%;\n  bottom: var(--controls-bar-shift, 0);\n  transform: translateX(50%);\n  max-width: 90%;\n  width: max-content;\n  display: flex;\n  gap: 6px;\n  border-radius: 100px;\n  -webkit-backdrop-filter: blur(4px);\n  backdrop-filter: blur(4px);\n  background-color: rgba(255, 255, 255, 0.8);\n  padding: 10px 12px;\n  align-items: center;\n  justify-content: center;\n}\n.lg-controls-bar__content[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  position: relative;\n  gap: 12px;\n  white-space: nowrap;\n}\n/*# sourceMappingURL=controls-bar.component.css.map */"], data: { animation: [
    trigger("fromLeft", [
      transition(":enter", [
        style({ transform: "translate3d(50%, 100%, 0)" }),
        animate("0.3s ease-in-out", style({ transform: "translate3d(50%, 0, 0)" }))
      ])
    ])
  ] } });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(ControlsBarComponent, [{
    type: Component,
    args: [{ selector: "lg-controls-bar", template: `
    <div #bar
         @fromLeft
         class="lg-controls-bar">
      <div class="lg-controls-bar__content">
        <ng-content></ng-content>
      </div>
    </div>
  `, standalone: true, imports: [], animations: [
      trigger("fromLeft", [
        transition(":enter", [
          style({ transform: "translate3d(50%, 100%, 0)" }),
          animate("0.3s ease-in-out", style({ transform: "translate3d(50%, 0, 0)" }))
        ])
      ])
    ], styles: ["/* angular:styles/component:scss;690413656036f0913ec0cca6cdeaf01dd210173c27b436a1efd26f8867cc5df0;/Users/khripunovpavel/Documents/my/lasagna/lasagna/src/app/shared/view/ui/controls-bar/controls-bar.component.ts */\n.lg-controls-bar {\n  position: fixed;\n  z-index: 5;\n  right: 50%;\n  bottom: var(--controls-bar-shift, 0);\n  transform: translateX(50%);\n  max-width: 90%;\n  width: max-content;\n  display: flex;\n  gap: 6px;\n  border-radius: 100px;\n  -webkit-backdrop-filter: blur(4px);\n  backdrop-filter: blur(4px);\n  background-color: rgba(255, 255, 255, 0.8);\n  padding: 10px 12px;\n  align-items: center;\n  justify-content: center;\n}\n.lg-controls-bar__content {\n  display: flex;\n  align-items: center;\n  position: relative;\n  gap: 12px;\n  white-space: nowrap;\n}\n/*# sourceMappingURL=controls-bar.component.css.map */\n"] }]
  }], null, { bottomPosition: [{
    type: HostBinding,
    args: ["style.--controls-bar-shift"]
  }] });
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(ControlsBarComponent, { className: "ControlsBarComponent", filePath: "src/app/shared/view/ui/controls-bar/controls-bar.component.ts", lineNumber: 59 });
})();

export {
  ControlsBarComponent
};
//# sourceMappingURL=chunk-F7EUKNJH.js.map
