import {
  InlineSeparatedGroupComponent,
  InlineSeparatedGroupDirective
} from "./chunk-ZVGHHFKR.js";
import {
  SelectionZoneService
} from "./chunk-5PDR5QLJ.js";
import {
  ButtonComponent
} from "./chunk-4JEN4JYG.js";
import {
  TranslatePipe
} from "./chunk-DXRFKXPR.js";
import {
  Component,
  Input,
  Optional,
  setClassMetadata,
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
  ɵɵresetView,
  ɵɵrestoreView,
  ɵɵstyleMap,
  ɵɵtemplate,
  ɵɵtext,
  ɵɵtextInterpolate1
} from "./chunk-RQATVJ2P.js";

// src/app/features/controls/form/selection-tools.component.ts
var _c0 = ["*"];
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
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _SelectionToolsComponent, selectors: [["lg-selection-tools"]], inputs: { selectionTypes: "selectionTypes" }, ngContentSelectors: _c0, decls: 4, vars: 1, consts: [["lgInlineSeparatedGroup", ""], [3, "click", "flat", "size"], [3, "click", "flat", "disabled", "size"]], template: function SelectionToolsComponent_Template(rf, ctx) {
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
    InlineSeparatedGroupComponent,
    InlineSeparatedGroupDirective,
    TranslatePipe
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
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(SelectionToolsComponent, { className: "SelectionToolsComponent", filePath: "src/app/features/controls/form/selection-tools.component.ts", lineNumber: 87 });
})();

export {
  SelectionToolsComponent
};
//# sourceMappingURL=chunk-4VIOKKDW.js.map
