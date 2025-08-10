import {
  InlineSeparatedGroupComponent,
  InlineSeparatedGroupDirective
} from "./chunk-T6J5UPYT.js";
import {
  animate,
  style,
  transition,
  trigger
} from "./chunk-HNJAQDA3.js";
import {
  SelectionZoneService
} from "./chunk-RRJNJAOU.js";
import {
  ButtonComponent
} from "./chunk-UXLMBQY2.js";
import {
  TranslatePipe
} from "./chunk-UMVMUCIR.js";
import {
  Component,
  HostBinding,
  Input,
  Optional,
  Renderer2,
  inject,
  setClassMetadata,
  viewChild,
  ɵsetClassDebugInfo,
  ɵɵadvance,
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
  ɵɵproperty,
  ɵɵqueryAdvance,
  ɵɵresetView,
  ɵɵrestoreView,
  ɵɵstyleMap,
  ɵɵstyleProp,
  ɵɵtemplate,
  ɵɵtext,
  ɵɵtextInterpolate1,
  ɵɵviewQuerySignal
} from "./chunk-UQVCVPTQ.js";

// src/app/shared/view/ui/controls-bar/controls-bar.component.ts
var _c0 = ["bar"];
var _c1 = ["*"];
var ControlsBarComponent = class _ControlsBarComponent {
  elementRef = viewChild("bar");
  renderer = inject(Renderer2);
  bottomPosition = "10px";
  ngAfterViewInit() {
  }
  setHeight() {
    const height = this.elementRef()?.nativeElement?.offsetHeight;
    const shift = parseInt(this.bottomPosition) + (height || 0);
    const copyStyleAttribute = document.body.getAttribute("style") || "";
    this.renderer.setAttribute(document.body, "style", `--controls-bar-space:${shift || 0}px; ${copyStyleAttribute}`);
  }
  ngOnDestroy() {
    const oldStyle = document.body.getAttribute("style") || "";
    const newStyle = oldStyle.replace(/--controls-bar-space:\d+px;/, "").trim();
    this.renderer.setAttribute(document.body, "style", newStyle);
  }
  static \u0275fac = function ControlsBarComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _ControlsBarComponent)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _ControlsBarComponent, selectors: [["lg-controls-bar"]], viewQuery: function ControlsBarComponent_Query(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275viewQuerySignal(ctx.elementRef, _c0, 5);
    }
    if (rf & 2) {
      \u0275\u0275queryAdvance();
    }
  }, hostVars: 2, hostBindings: function ControlsBarComponent_HostBindings(rf, ctx) {
    if (rf & 2) {
      \u0275\u0275styleProp("--controls-bar-shift", ctx.bottomPosition);
    }
  }, ngContentSelectors: _c1, decls: 4, vars: 1, consts: [["bar", ""], [1, "lg-controls-bar"], [1, "lg-controls-bar__content"]], template: function ControlsBarComponent_Template(rf, ctx) {
    if (rf & 1) {
      const _r1 = \u0275\u0275getCurrentView();
      \u0275\u0275projectionDef();
      \u0275\u0275elementStart(0, "div", 1, 0);
      \u0275\u0275listener("@fromLeft.done", function ControlsBarComponent_Template_div_animation_fromLeft_done_0_listener() {
        \u0275\u0275restoreView(_r1);
        return \u0275\u0275resetView(ctx.setHeight());
      });
      \u0275\u0275elementStart(2, "div", 2);
      \u0275\u0275projection(3);
      \u0275\u0275elementEnd()();
    }
    if (rf & 2) {
      \u0275\u0275property("@fromLeft", void 0);
    }
  }, styles: ["\n\n.lg-controls-bar[_ngcontent-%COMP%] {\n  position: fixed;\n  z-index: 5;\n  right: 50%;\n  bottom: var(--controls-bar-shift, 0);\n  transform: translateX(50%);\n  display: flex;\n  gap: 8px;\n  border-radius: 100px;\n  -webkit-backdrop-filter: blur(4px);\n  backdrop-filter: blur(4px);\n  background-color: rgba(255, 255, 255, 0.8);\n  padding: 12px;\n  align-items: center;\n  justify-content: center;\n  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);\n}\n.lg-controls-bar__content[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  position: relative;\n  gap: 12px;\n  white-space: nowrap;\n}\n/*# sourceMappingURL=controls-bar.component.css.map */"], data: { animation: [
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
    <div @fromLeft
         (@fromLeft.done)="setHeight()"
         #bar
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
    ], styles: ["/* angular:styles/component:scss;026614d81194cb3dc5adcecb080073c717784d30efe4bc5c59de970a9479a19c;/Users/khripunovpavel/Documents/my/lasagna/lasagna/src/app/shared/view/ui/controls-bar/controls-bar.component.ts */\n.lg-controls-bar {\n  position: fixed;\n  z-index: 5;\n  right: 50%;\n  bottom: var(--controls-bar-shift, 0);\n  transform: translateX(50%);\n  display: flex;\n  gap: 8px;\n  border-radius: 100px;\n  -webkit-backdrop-filter: blur(4px);\n  backdrop-filter: blur(4px);\n  background-color: rgba(255, 255, 255, 0.8);\n  padding: 12px;\n  align-items: center;\n  justify-content: center;\n  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);\n}\n.lg-controls-bar__content {\n  display: flex;\n  align-items: center;\n  position: relative;\n  gap: 12px;\n  white-space: nowrap;\n}\n/*# sourceMappingURL=controls-bar.component.css.map */\n"] }]
  }], null, { bottomPosition: [{
    type: HostBinding,
    args: ["style.--controls-bar-shift"]
  }] });
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(ControlsBarComponent, { className: "ControlsBarComponent", filePath: "src/app/shared/view/ui/controls-bar/controls-bar.component.ts", lineNumber: 68 });
})();

// src/app/shared/view/ui/form/selection-tools.component.ts
var _c02 = ["*"];
function SelectionToolsComponent_Conditional_2_ng_template_0_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "lg-button", 1);
    \u0275\u0275listener("click", function SelectionToolsComponent_Conditional_2_ng_template_0_Template_lg_button_click_0_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.selectionZoneService.onSelection());
    });
    \u0275\u0275text(1);
    \u0275\u0275pipe(2, "translate");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    \u0275\u0275styleMap("success");
    \u0275\u0275property("flat", true)("size", "small");
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind1(2, 5, "hide-selection-label"), " ");
  }
}
function SelectionToolsComponent_Conditional_2_ng_template_1_Template(rf, ctx) {
  if (rf & 1) {
    const _r3 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "lg-button", 1);
    \u0275\u0275listener("click", function SelectionToolsComponent_Conditional_2_ng_template_1_Template_lg_button_click_0_listener() {
      \u0275\u0275restoreView(_r3);
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.selectionZoneService.onAllSelection());
    });
    \u0275\u0275text(1);
    \u0275\u0275pipe(2, "translate");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    \u0275\u0275styleMap("warning");
    \u0275\u0275property("flat", true)("size", "small");
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind1(2, 5, "select-all-label"), " ");
  }
}
function SelectionToolsComponent_Conditional_2_Conditional_2_ng_template_0_Template(rf, ctx) {
  if (rf & 1) {
    const _r4 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "lg-button", 2);
    \u0275\u0275listener("click", function SelectionToolsComponent_Conditional_2_Conditional_2_ng_template_0_Template_lg_button_click_0_listener() {
      \u0275\u0275restoreView(_r4);
      const ctx_r1 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r1.selectionZoneService.onDeselectAll());
    });
    \u0275\u0275text(1);
    \u0275\u0275pipe(2, "translate");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const selected_r5 = \u0275\u0275nextContext();
    \u0275\u0275styleMap("warning");
    \u0275\u0275property("flat", true)("disabled", !(selected_r5 == null ? null : selected_r5.size))("size", "small");
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind1(2, 6, "deselect-all-label"), " ");
  }
}
function SelectionToolsComponent_Conditional_2_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275template(0, SelectionToolsComponent_Conditional_2_Conditional_2_ng_template_0_Template, 3, 8, "ng-template", 0);
  }
}
function SelectionToolsComponent_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275template(0, SelectionToolsComponent_Conditional_2_ng_template_0_Template, 3, 7, "ng-template", 0)(1, SelectionToolsComponent_Conditional_2_ng_template_1_Template, 3, 7, "ng-template", 0);
    \u0275\u0275conditionalCreate(2, SelectionToolsComponent_Conditional_2_Conditional_2_Template, 1, 0, null, 0);
  }
  if (rf & 2) {
    let tmp_1_0;
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(2);
    \u0275\u0275conditional((tmp_1_0 = ctx_r1.selectionZoneService.selected()) ? 2 : -1, tmp_1_0);
  }
}
function SelectionToolsComponent_Conditional_3_ng_template_0_Template(rf, ctx) {
  if (rf & 1) {
    const _r6 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "lg-button", 1);
    \u0275\u0275listener("click", function SelectionToolsComponent_Conditional_3_ng_template_0_Template_lg_button_click_0_listener() {
      \u0275\u0275restoreView(_r6);
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.selectionZoneService.onSelection());
    });
    \u0275\u0275text(1);
    \u0275\u0275pipe(2, "translate");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    \u0275\u0275styleMap("success");
    \u0275\u0275property("flat", true)("size", "small");
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind1(2, 5, "select-many-label"), " ");
  }
}
function SelectionToolsComponent_Conditional_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275template(0, SelectionToolsComponent_Conditional_3_ng_template_0_Template, 3, 7, "ng-template", 0);
  }
}
var SelectionToolsComponent = class _SelectionToolsComponent {
  selectionZoneService;
  constructor(selectionZoneService) {
    this.selectionZoneService = selectionZoneService;
  }
  selectionTypes = [];
  static \u0275fac = function SelectionToolsComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _SelectionToolsComponent)(\u0275\u0275directiveInject(SelectionZoneService, 8));
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _SelectionToolsComponent, selectors: [["lg-selection-tools"]], inputs: { selectionTypes: "selectionTypes" }, ngContentSelectors: _c02, decls: 4, vars: 1, consts: [["lgInlineSeparatedGroup", ""], [3, "click", "flat", "size"], [3, "click", "flat", "disabled", "size"]], template: function SelectionToolsComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275projectionDef();
      \u0275\u0275projection(0);
      \u0275\u0275elementStart(1, "lg-inline-separated-group");
      \u0275\u0275conditionalCreate(2, SelectionToolsComponent_Conditional_2_Template, 3, 1)(3, SelectionToolsComponent_Conditional_3_Template, 1, 0, null, 0);
      \u0275\u0275elementEnd();
    }
    if (rf & 2) {
      \u0275\u0275advance(2);
      \u0275\u0275conditional(ctx.selectionZoneService.selectionMode() === "selection" ? 2 : 3);
    }
  }, dependencies: [
    ButtonComponent,
    TranslatePipe,
    InlineSeparatedGroupComponent,
    InlineSeparatedGroupDirective
  ], encapsulation: 2 });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(SelectionToolsComponent, [{
    type: Component,
    args: [{
      selector: "lg-selection-tools",
      standalone: true,
      template: `
    <ng-content></ng-content>

    <lg-inline-separated-group>
      @if (selectionZoneService.selectionMode() === 'selection') {

        <ng-template lgInlineSeparatedGroup>
          <lg-button (click)="selectionZoneService.onSelection()"
                     [flat]="true"
                     [size]="'small'"
                     [style]="'success'">
            {{ 'hide-selection-label'|translate }}
          </lg-button>
        </ng-template>

        <ng-template lgInlineSeparatedGroup>
          <lg-button (click)="selectionZoneService.onAllSelection()"
                     [flat]="true"
                     [size]="'small'"
                     [style]="'warning'">
            {{ 'select-all-label'|translate }}
          </lg-button>
        </ng-template>

        @if (selectionZoneService.selected(); as selected) {
          <ng-template lgInlineSeparatedGroup>
            <lg-button (click)="selectionZoneService.onDeselectAll()"
                       [flat]="true"
                       [disabled]="!selected?.size"
                       [size]="'small'"
                       [style]="'warning'">
              {{ 'deselect-all-label'|translate }}
            </lg-button>
          </ng-template>


        <!--        <ng-template lgInlineSeparatedGroup>-->
          <!--          <lg-button [flat]="true"-->
          <!--                     [size]="'small'"-->
          <!--                     [style]="'danger'"-->
          <!--                     (click)="selectionZoneService.onDeleteAll()">-->
          <!--            {{ 'delete-all-label' | translate }}-->
          <!--          </lg-button>-->
          <!--        </ng-template>-->

<!--          <ng-template lgInlineSeparatedGroup>-->
<!--            <lg-button [flat]="true"-->
<!--                       [disabled]="!selected?.size"-->
<!--                       [size]="'small'"-->
<!--                       [style]="'danger'"-->
<!--                       (click)="selectionZoneService.onDeleteSelected()">-->
<!--              {{ 'delete-selected-label' | translate }}-->
<!--            </lg-button>-->
<!--          </ng-template>-->
        }
      } @else {
        <ng-template lgInlineSeparatedGroup>
          <lg-button (click)="selectionZoneService.onSelection()"
                     [flat]="true"
                     [size]="'small'"
                     [style]="'success'">
            {{ 'select-many-label'|translate }}
          </lg-button>
        </ng-template>
      }
    </lg-inline-separated-group>

  `,
      imports: [
        ButtonComponent,
        TranslatePipe,
        InlineSeparatedGroupComponent,
        InlineSeparatedGroupDirective
      ]
    }]
  }], () => [{ type: SelectionZoneService, decorators: [{
    type: Optional
  }] }], { selectionTypes: [{
    type: Input
  }] });
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(SelectionToolsComponent, { className: "SelectionToolsComponent", filePath: "src/app/shared/view/ui/form/selection-tools.component.ts", lineNumber: 87 });
})();

export {
  ControlsBarComponent,
  SelectionToolsComponent
};
//# sourceMappingURL=chunk-V7TP5YI4.js.map
