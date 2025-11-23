import {
  estimateColor
} from "./chunk-T5CRNY7R.js";
import "./chunk-IWOUTMKL.js";
import {
  generateUuid
} from "./chunk-5WJUMO7X.js";
import {
  NgStyle
} from "./chunk-X2X7GTPW.js";
import {
  Component,
  setClassMetadata,
  signal,
  ɵsetClassDebugInfo,
  ɵɵadvance,
  ɵɵdefineComponent,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵproperty,
  ɵɵpureFunction1,
  ɵɵrepeater,
  ɵɵrepeaterCreate,
  ɵɵrepeaterTrackByIdentity,
  ɵɵtext,
  ɵɵtextInterpolate1
} from "./chunk-IYCVPBRB.js";
import "./chunk-46DXP6YY.js";

// src/app/shared/view/dev/color-palette.component.ts
var _c0 = (a0) => ({ backgroundColor: a0 });
function ColorPaletteComponent_For_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 1);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const color_r1 = ctx.$implicit;
    \u0275\u0275property("ngStyle", \u0275\u0275pureFunction1(2, _c0, color_r1));
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", color_r1, " ");
  }
}
var ColorPaletteComponent = class _ColorPaletteComponent {
  colors = signal(Array.from({ length: 200 }, (_, i) => estimateColor(generateUuid())), ...ngDevMode ? [{ debugName: "colors" }] : []);
  static \u0275fac = function ColorPaletteComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _ColorPaletteComponent)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _ColorPaletteComponent, selectors: [["lg-color-palette"]], decls: 3, vars: 0, consts: [[1, "lg-color-palette"], [1, "lg-color-palette__color", 3, "ngStyle"]], template: function ColorPaletteComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "div", 0);
      \u0275\u0275repeaterCreate(1, ColorPaletteComponent_For_2_Template, 2, 4, "div", 1, \u0275\u0275repeaterTrackByIdentity);
      \u0275\u0275elementEnd();
    }
    if (rf & 2) {
      \u0275\u0275advance();
      \u0275\u0275repeater(ctx.colors());
    }
  }, dependencies: [NgStyle], styles: ["\n\n.lg-color-palette[_ngcontent-%COMP%] {\n  display: flex;\n  flex-wrap: wrap;\n  gap: 10px;\n}\n.lg-color-palette__color[_ngcontent-%COMP%] {\n  width: 50px;\n  height: 50px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  color: white;\n  font-size: 12px;\n  border-radius: 4px;\n}\n/*# sourceMappingURL=color-palette.component.css.map */"] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(ColorPaletteComponent, [{
    type: Component,
    args: [{ selector: "lg-color-palette", standalone: true, template: `
      <div class="lg-color-palette">
          @for (color of colors();track color) {
              <div class="lg-color-palette__color"
                   [ngStyle]="{backgroundColor: color}">
                   {{ color }}
              </div>
          }
      </div>
  `, imports: [
      NgStyle
    ], styles: ["/* angular:styles/component:scss;a3ad8a6058959f26f824ad4d259d523693e7dc06b0f5ce30637a8633787b9a98;/Users/khripunovpavel/Documents/my/lasagna/lasagna/src/app/shared/view/dev/color-palette.component.ts */\n.lg-color-palette {\n  display: flex;\n  flex-wrap: wrap;\n  gap: 10px;\n}\n.lg-color-palette__color {\n  width: 50px;\n  height: 50px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  color: white;\n  font-size: 12px;\n  border-radius: 4px;\n}\n/*# sourceMappingURL=color-palette.component.css.map */\n"] }]
  }], null, null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(ColorPaletteComponent, { className: "ColorPaletteComponent", filePath: "src/app/shared/view/dev/color-palette.component.ts", lineNumber: 41 });
})();
export {
  ColorPaletteComponent
};
//# sourceMappingURL=chunk-36HSETI3.js.map
