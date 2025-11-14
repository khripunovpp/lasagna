import {
  NgClass
} from "./chunk-KBRICXTE.js";
import {
  Component,
  input,
  setClassMetadata,
  ɵsetClassDebugInfo,
  ɵɵclassProp,
  ɵɵdefineComponent,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵprojection,
  ɵɵprojectionDef,
  ɵɵproperty
} from "./chunk-Z5TNFCCP.js";

// src/app/shared/view/layout/title.component.ts
var _c0 = ["*"];
var TitleComponent = class _TitleComponent {
  level = input(1, ...ngDevMode ? [{ debugName: "level" }] : []);
  flat = input(false, ...ngDevMode ? [{ debugName: "flat" }] : []);
  static \u0275fac = function TitleComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _TitleComponent)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _TitleComponent, selectors: [["lg-title"]], inputs: { level: [1, "level"], flat: [1, "flat"] }, ngContentSelectors: _c0, decls: 2, vars: 3, consts: [["role", "heading", 1, "title", 3, "ngClass"]], template: function TitleComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275projectionDef();
      \u0275\u0275elementStart(0, "p", 0);
      \u0275\u0275projection(1);
      \u0275\u0275elementEnd();
    }
    if (rf & 2) {
      \u0275\u0275classProp("title--flat", ctx.flat());
      \u0275\u0275property("ngClass", "title--" + ctx.level());
    }
  }, dependencies: [NgClass], styles: ["\n\n.title[_ngcontent-%COMP%] {\n  font-size: 1.9em;\n  line-height: 1.2;\n  font-weight: bold;\n  margin: 0;\n}\n.title--2[_ngcontent-%COMP%] {\n  font-size: 1.75em;\n}\n.title--3[_ngcontent-%COMP%] {\n  font-size: 1.5em;\n}\n.title--4[_ngcontent-%COMP%] {\n  font-size: 1.25em;\n}\n.title--5[_ngcontent-%COMP%] {\n  font-size: 1.125em;\n}\n.title--6[_ngcontent-%COMP%] {\n  font-size: 1em;\n}\n.title--flat[_ngcontent-%COMP%] {\n  font-weight: normal;\n}\n/*# sourceMappingURL=title.component.css.map */"] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(TitleComponent, [{
    type: Component,
    args: [{ selector: "lg-title", standalone: true, template: `
      <p [class.title--flat]="flat()"
         [ngClass]="'title--' + level()"
         class="title"
         role="heading">
          <ng-content></ng-content>
      </p>`, imports: [
      NgClass
    ], styles: ["/* angular:styles/component:scss;45fd800d1ab22c224062ec1eac1d5d6f0eff5476cfda8323750b3587419c27bb;/Users/khripunovpavel/Documents/my/lasagna/lasagna/src/app/shared/view/layout/title.component.ts */\n.title {\n  font-size: 1.9em;\n  line-height: 1.2;\n  font-weight: bold;\n  margin: 0;\n}\n.title--2 {\n  font-size: 1.75em;\n}\n.title--3 {\n  font-size: 1.5em;\n}\n.title--4 {\n  font-size: 1.25em;\n}\n.title--5 {\n  font-size: 1.125em;\n}\n.title--6 {\n  font-size: 1em;\n}\n.title--flat {\n  font-weight: normal;\n}\n/*# sourceMappingURL=title.component.css.map */\n"] }]
  }], null, null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(TitleComponent, { className: "TitleComponent", filePath: "src/app/shared/view/layout/title.component.ts", lineNumber: 53 });
})();

export {
  TitleComponent
};
//# sourceMappingURL=chunk-T6NLT234.js.map
