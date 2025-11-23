import {
  TranslatePipe
} from "./chunk-755Q3QHA.js";
import {
  Component,
  setClassMetadata,
  setClassMetadataAsync,
  ɵsetClassDebugInfo,
  ɵɵadvance,
  ɵɵdefer,
  ɵɵdeferOnIdle,
  ɵɵdefineComponent,
  ɵɵdomTemplate,
  ɵɵelement,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵpipe,
  ɵɵpipeBind1,
  ɵɵproperty,
  ɵɵtemplate,
  ɵɵtext,
  ɵɵtextInterpolate1
} from "./chunk-IYCVPBRB.js";
import "./chunk-46DXP6YY.js";

// src/app/features/widgets/widgets-page/widgets-page.component.ts
var WidgetsPageComponent_Defer_2_DepsFn = () => [import("./chunk-ZMU7NPPF.js").then((m) => m.EggsWidgetComponent), import("./chunk-LGSX6LCO.js").then((m) => m.ContainerComponent), import("./chunk-5EMI5HZE.js").then((m) => m.FlexRowComponent), import("./chunk-SYAF33FD.js").then((m) => m.TitleComponent), import("./chunk-Y7ECYNDZ.js").then((m) => m.FadeInComponent), import("./chunk-S4BENQO2.js").then((m) => m.TabDirective), import("./chunk-GJSVK3AJ.js").then((m) => m.TabsComponent), import("./chunk-DJ7D2QE5.js").then((m) => m.JellyWidgetComponent), TranslatePipe];
function WidgetsPageComponent_Defer_0_ng_template_7_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "lg-jelly-widget");
  }
}
function WidgetsPageComponent_Defer_0_ng_template_9_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "lg-eggs-widget");
  }
}
function WidgetsPageComponent_Defer_0_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "lg-fade-in")(1, "lg-container")(2, "lg-flex-row", 0)(3, "lg-title");
    \u0275\u0275text(4);
    \u0275\u0275pipe(5, "translate");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(6, "lg-tabs");
    \u0275\u0275template(7, WidgetsPageComponent_Defer_0_ng_template_7_Template, 1, 0, "ng-template", 1);
    \u0275\u0275pipe(8, "translate");
    \u0275\u0275template(9, WidgetsPageComponent_Defer_0_ng_template_9_Template, 1, 0, "ng-template", 2);
    \u0275\u0275pipe(10, "translate");
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    \u0275\u0275advance(2);
    \u0275\u0275property("center", true);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind1(5, 4, "widgets.page.title"), " ");
    \u0275\u0275advance(3);
    \u0275\u0275property("label", \u0275\u0275pipeBind1(8, 6, "widgets.page.jelly-calculator"));
    \u0275\u0275advance(2);
    \u0275\u0275property("label", \u0275\u0275pipeBind1(10, 8, "widgets.page.eggs-calculator"));
  }
}
function WidgetsPageComponent_DeferError_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275text(0);
    \u0275\u0275pipe(1, "translate");
  }
  if (rf & 2) {
    \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind1(1, 1, "widgets.defer-load-error"), " ");
  }
}
var WidgetsPageComponent = class _WidgetsPageComponent {
  static \u0275fac = function WidgetsPageComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _WidgetsPageComponent)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _WidgetsPageComponent, selectors: [["lg-widgets-page"]], decls: 4, vars: 0, consts: [[3, "center"], ["alias", "jelly-calculator", "lgTab", "", 3, "label"], ["alias", "eggs-calculator", "lgTab", "", 3, "label"]], template: function WidgetsPageComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275domTemplate(0, WidgetsPageComponent_Defer_0_Template, 11, 10)(1, WidgetsPageComponent_DeferError_1_Template, 2, 3);
      \u0275\u0275defer(2, 0, WidgetsPageComponent_Defer_2_DepsFn, null, null, 1);
      \u0275\u0275deferOnIdle();
    }
  }, dependencies: [TranslatePipe], encapsulation: 2 });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadataAsync(WidgetsPageComponent, () => [import("./chunk-ZMU7NPPF.js").then((m) => m.EggsWidgetComponent), import("./chunk-LGSX6LCO.js").then((m) => m.ContainerComponent), import("./chunk-5EMI5HZE.js").then((m) => m.FlexRowComponent), import("./chunk-SYAF33FD.js").then((m) => m.TitleComponent), import("./chunk-Y7ECYNDZ.js").then((m) => m.FadeInComponent), import("./chunk-S4BENQO2.js").then((m) => m.TabDirective), import("./chunk-GJSVK3AJ.js").then((m) => m.TabsComponent), import("./chunk-DJ7D2QE5.js").then((m) => m.JellyWidgetComponent)], (EggsWidgetComponent, ContainerComponent, FlexRowComponent, TitleComponent, FadeInComponent, TabDirective, TabsComponent, JellyWidgetComponent) => {
    setClassMetadata(WidgetsPageComponent, [{
      type: Component,
      args: [{
        selector: "lg-widgets-page",
        standalone: true,
        template: `
    @defer {
      <lg-fade-in>
        <lg-container>
          <lg-flex-row [center]="true">
            <lg-title>
              {{ 'widgets.page.title' | translate }}
            </lg-title>
          </lg-flex-row>

          <lg-tabs>
            <ng-template [label]="'widgets.page.jelly-calculator' | translate" alias="jelly-calculator" lgTab>
              <lg-jelly-widget></lg-jelly-widget>
            </ng-template>

            <ng-template [label]="'widgets.page.eggs-calculator' | translate" alias="eggs-calculator" lgTab>
              <lg-eggs-widget></lg-eggs-widget>
            </ng-template>

            <!--          <ng-template [label]="'widgets.page.barcode-seeker' | translate" alias="barcode-seeker" lgTab>-->
            <!--              <lg-barcode-add-product-widget></lg-barcode-add-product-widget>-->
            <!--          </ng-template>-->
          </lg-tabs>
        </lg-container>
      </lg-fade-in>
    } @error {
      {{ 'widgets.defer-load-error' | translate }}
    }
  `,
        imports: [
          EggsWidgetComponent,
          ContainerComponent,
          FlexRowComponent,
          TitleComponent,
          FadeInComponent,
          TabDirective,
          TabsComponent,
          JellyWidgetComponent,
          TranslatePipe
        ]
      }]
    }], null, null);
  });
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(WidgetsPageComponent, { className: "WidgetsPageComponent", filePath: "src/app/features/widgets/widgets-page/widgets-page.component.ts", lineNumber: 62 });
})();
export {
  WidgetsPageComponent
};
//# sourceMappingURL=chunk-C7GN2TGH.js.map
