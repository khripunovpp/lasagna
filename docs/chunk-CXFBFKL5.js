import {
  NgTemplateOutlet
} from "./chunk-7I2CR6I6.js";
import {
  Component,
  Directive,
  TemplateRef,
  ViewEncapsulation,
  computed,
  contentChildren,
  inject,
  input,
  setClassMetadata,
  ɵsetClassDebugInfo,
  ɵɵadvance,
  ɵɵattribute,
  ɵɵconditional,
  ɵɵconditionalCreate,
  ɵɵcontentQuerySignal,
  ɵɵdefineComponent,
  ɵɵdefineDirective,
  ɵɵelementContainer,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵnextContext,
  ɵɵprojection,
  ɵɵprojectionDef,
  ɵɵproperty,
  ɵɵqueryAdvance,
  ɵɵstyleProp,
  ɵɵtemplate,
  ɵɵtext,
  ɵɵtextInterpolate1
} from "./chunk-RQATVJ2P.js";

// src/app/features/controls/form/control-item/control-label-template.directive.ts
var ControlLabelTemplateDirective = class _ControlLabelTemplateDirective {
  templateRef = inject(TemplateRef);
  /**
   * Position of the label in the control.
   * Possible values: 'before', 'after', 'end'.
   */
  position = input(null, ...ngDevMode ? [{ debugName: "position" }] : []);
  static \u0275fac = function ControlLabelTemplateDirective_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _ControlLabelTemplateDirective)();
  };
  static \u0275dir = /* @__PURE__ */ \u0275\u0275defineDirective({ type: _ControlLabelTemplateDirective, selectors: [["", "lgControlLabelTemplate", ""]], inputs: { position: [1, "position"] }, exportAs: ["lgControlLabelTemplate"] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(ControlLabelTemplateDirective, [{
    type: Directive,
    args: [{
      selector: "[lgControlLabelTemplate]",
      exportAs: "lgControlLabelTemplate",
      host: {}
    }]
  }], null, null);
})();

// src/app/features/controls/form/control-item/control.component.ts
var _c0 = ["*"];
function ControlComponent_Conditional_1_ng_container_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementContainer(0);
  }
}
function ControlComponent_Conditional_1_Conditional_3_ng_container_0_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementContainer(0);
  }
}
function ControlComponent_Conditional_1_Conditional_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275template(0, ControlComponent_Conditional_1_Conditional_3_ng_container_0_Template, 1, 0, "ng-container", 3);
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275property("ngTemplateOutlet", ctx_r0.commonLabelTpl());
  }
}
function ControlComponent_Conditional_1_Conditional_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275text(0);
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275textInterpolate1(" ", ctx_r0.label(), " ");
  }
}
function ControlComponent_Conditional_1_ng_container_5_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementContainer(0);
  }
}
function ControlComponent_Conditional_1_Conditional_6_ng_container_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementContainer(0);
  }
}
function ControlComponent_Conditional_1_Conditional_6_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 5);
    \u0275\u0275template(1, ControlComponent_Conditional_1_Conditional_6_ng_container_1_Template, 1, 0, "ng-container", 3);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275property("ngTemplateOutlet", ctx_r0.endLabelTpl());
  }
}
function ControlComponent_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "label", 1);
    \u0275\u0275template(1, ControlComponent_Conditional_1_ng_container_1_Template, 1, 0, "ng-container", 3);
    \u0275\u0275elementStart(2, "span", 4);
    \u0275\u0275conditionalCreate(3, ControlComponent_Conditional_1_Conditional_3_Template, 1, 1, "ng-container")(4, ControlComponent_Conditional_1_Conditional_4_Template, 1, 1);
    \u0275\u0275elementEnd();
    \u0275\u0275template(5, ControlComponent_Conditional_1_ng_container_5_Template, 1, 0, "ng-container", 3);
    \u0275\u0275conditionalCreate(6, ControlComponent_Conditional_1_Conditional_6_Template, 2, 1, "span", 5);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275attribute("for", ctx_r0.labelFor());
    \u0275\u0275advance();
    \u0275\u0275property("ngTemplateOutlet", ctx_r0.beforeLabelTpl());
    \u0275\u0275advance(2);
    \u0275\u0275conditional(ctx_r0.commonLabelTpl() ? 3 : ctx_r0.label() ? 4 : -1);
    \u0275\u0275advance(2);
    \u0275\u0275property("ngTemplateOutlet", ctx_r0.afterLabelTpl());
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r0.endLabelTpl() ? 6 : -1);
  }
}
var ControlComponent = class _ControlComponent {
  constructor() {
  }
  label = input("", ...ngDevMode ? [{ debugName: "label" }] : []);
  flow = input("column", ...ngDevMode ? [{ debugName: "flow" }] : []);
  labelFor = input(null, ...ngDevMode ? [{ debugName: "labelFor" }] : []);
  labelTpls = contentChildren(ControlLabelTemplateDirective, ...ngDevMode ? [{ debugName: "labelTpls" }] : []);
  beforeLabelTpl = computed(() => {
    return this.labelTpls().find((tpl) => tpl.position() === "before")?.templateRef || null;
  }, ...ngDevMode ? [{ debugName: "beforeLabelTpl" }] : []);
  afterLabelTpl = computed(() => {
    return this.labelTpls().find((tpl) => tpl.position() === "after")?.templateRef || null;
  }, ...ngDevMode ? [{ debugName: "afterLabelTpl" }] : []);
  endLabelTpl = computed(() => {
    return this.labelTpls().find((tpl) => tpl.position() === "end")?.templateRef || null;
  }, ...ngDevMode ? [{ debugName: "endLabelTpl" }] : []);
  commonLabelTpl = computed(() => {
    return this.labelTpls().find((tpl) => !tpl.position())?.templateRef || null;
  }, ...ngDevMode ? [{ debugName: "commonLabelTpl" }] : []);
  static \u0275fac = function ControlComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _ControlComponent)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _ControlComponent, selectors: [["lg-control"]], contentQueries: function ControlComponent_ContentQueries(rf, ctx, dirIndex) {
    if (rf & 1) {
      \u0275\u0275contentQuerySignal(dirIndex, ctx.labelTpls, ControlLabelTemplateDirective, 4);
    }
    if (rf & 2) {
      \u0275\u0275queryAdvance();
    }
  }, inputs: { label: [1, "label"], flow: [1, "flow"], labelFor: [1, "labelFor"] }, ngContentSelectors: _c0, decls: 4, vars: 3, consts: [[1, "control"], [1, "control__label"], [1, "control__content"], [4, "ngTemplateOutlet"], [1, "control__label-string"], [1, "control__label-end"]], template: function ControlComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275projectionDef();
      \u0275\u0275elementStart(0, "div", 0);
      \u0275\u0275conditionalCreate(1, ControlComponent_Conditional_1_Template, 7, 5, "label", 1);
      \u0275\u0275elementStart(2, "div", 2);
      \u0275\u0275projection(3);
      \u0275\u0275elementEnd()();
    }
    if (rf & 2) {
      \u0275\u0275styleProp("flex-direction", ctx.flow());
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.label() || ctx.commonLabelTpl() ? 1 : -1);
    }
  }, dependencies: [NgTemplateOutlet], styles: ["/* angular:styles/component:scss;58dc7f3abddb48b3164d5d9b4653e5d2b3c81b3d4b02eee4c11b5bb7e84be4d8;/Users/khripunovpavel/Documents/my/lasagna/lasagna/src/app/features/controls/form/control-item/control.component.ts */\n:host {\n  display: flex;\n  width: 100%;\n}\n.control {\n  display: flex;\n  flex-direction: column;\n  gap: 8px;\n}\n.control__label {\n  font-size: 14px;\n  display: flex;\n  align-items: flex-end;\n  gap: 8px;\n  min-width: 0;\n}\n.control__label-end {\n  display: flex;\n  align-items: flex-end;\n  gap: 8px;\n  margin-left: auto;\n}\n.control__label-end:empty {\n  display: none;\n}\n.control__label-string:empty {\n  display: none;\n}\n.control__content {\n  display: flex;\n}\n/*# sourceMappingURL=control.component.css.map */\n"], encapsulation: 2 });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(ControlComponent, [{
    type: Component,
    args: [{ selector: "lg-control", template: `
    <div [style.flex-direction]="flow()"
         class="control">
      @if (label() || commonLabelTpl()) {
        <label [attr.for]="labelFor()" class="control__label">
          <ng-container *ngTemplateOutlet="beforeLabelTpl()"></ng-container>

          <span class="control__label-string">
          @if (commonLabelTpl()) {
            <ng-container *ngTemplateOutlet="commonLabelTpl()"></ng-container>
          } @else if (label()) {
            {{ label() }}
          }
        </span>
          <ng-container *ngTemplateOutlet="afterLabelTpl()"></ng-container>

          @if (endLabelTpl()) {
            <span class="control__label-end">
            <ng-container *ngTemplateOutlet="endLabelTpl()"></ng-container>
          </span>
          }
        </label>
      }

      <div class="control__content">
        <ng-content></ng-content>
      </div>
    </div>
  `, imports: [
      NgTemplateOutlet
    ], encapsulation: ViewEncapsulation.None, styles: ["/* angular:styles/component:scss;58dc7f3abddb48b3164d5d9b4653e5d2b3c81b3d4b02eee4c11b5bb7e84be4d8;/Users/khripunovpavel/Documents/my/lasagna/lasagna/src/app/features/controls/form/control-item/control.component.ts */\n:host {\n  display: flex;\n  width: 100%;\n}\n.control {\n  display: flex;\n  flex-direction: column;\n  gap: 8px;\n}\n.control__label {\n  font-size: 14px;\n  display: flex;\n  align-items: flex-end;\n  gap: 8px;\n  min-width: 0;\n}\n.control__label-end {\n  display: flex;\n  align-items: flex-end;\n  gap: 8px;\n  margin-left: auto;\n}\n.control__label-end:empty {\n  display: none;\n}\n.control__label-string:empty {\n  display: none;\n}\n.control__content {\n  display: flex;\n}\n/*# sourceMappingURL=control.component.css.map */\n"] }]
  }], () => [], null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(ControlComponent, { className: "ControlComponent", filePath: "src/app/features/controls/form/control-item/control.component.ts", lineNumber: 85 });
})();

export {
  ControlLabelTemplateDirective,
  ControlComponent
};
//# sourceMappingURL=chunk-CXFBFKL5.js.map
