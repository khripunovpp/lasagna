import {
  EggsWidgetComponent
} from "./chunk-MBG6V7EL.js";
import {
  UnitStringPipe
} from "./chunk-IFTH7MAK.js";
import {
  CurrencySymbolPipe
} from "./chunk-52XJO4F6.js";
import {
  WidthDirective
} from "./chunk-F2QJ6SGJ.js";
import {
  UserCurrencyPipe
} from "./chunk-MTFF6LZJ.js";
import {
  InputComponent
} from "./chunk-24GIFUTY.js";
import {
  PortalComponent
} from "./chunk-OAK3DILL.js";
import {
  AutocompleteComponent,
  ChipsListComponent
} from "./chunk-I2TZH5QI.js";
import {
  UnitSwitcherComponent
} from "./chunk-MGR3OES4.js";
import {
  ControlTemplateDirective,
  MultiselectComponent
} from "./chunk-44AY56MU.js";
import {
  ShrinkDirective
} from "./chunk-4VYWNF2J.js";
import {
  NumberInputComponent,
  ParseMathDirective,
  smaller
} from "./chunk-J5CAWNTD.js";
import {
  SelfStartDirective
} from "./chunk-D5PO2G4L.js";
import {
  ROUTER_MANAGER
} from "./chunk-XHSUMN4D.js";
import {
  AnalyticsService
} from "./chunk-5JBPEQZK.js";
import {
  ControlComponent
} from "./chunk-PCNJOXTY.js";
import {
  ControlExtraTemplateDirective
} from "./chunk-222CPMRQ.js";
import "./chunk-EROQRXO4.js";
import {
  InlineSeparatedGroupComponent,
  InlineSeparatedGroupDirective
} from "./chunk-VWS7U6ZE.js";
import {
  ExpandDirective
} from "./chunk-OCPTIUJK.js";
import {
  MatIcon
} from "./chunk-DHMDFBEO.js";
import {
  ContainerComponent
} from "./chunk-UX3GX3WK.js";
import {
  FlexRowComponent
} from "./chunk-TYQOT2W3.js";
import {
  CardComponent
} from "./chunk-C7YIU4ER.js";
import {
  TimeAgoPipe
} from "./chunk-VGY5V7FI.js";
import {
  FlexColumnComponent
} from "./chunk-WKEFA3OS.js";
import {
  FadeInComponent
} from "./chunk-GKY6K6EK.js";
import "./chunk-HNJAQDA3.js";
import {
  TitleComponent
} from "./chunk-LKA4ZC5L.js";
import {
  ProductsRepository,
  SelectResourcesService
} from "./chunk-7DS6BZJV.js";
import "./chunk-HLCLXN3F.js";
import "./chunk-UFXGBGSU.js";
import {
  FormControl,
  FormControlName,
  FormGroup,
  FormGroupDirective,
  NgControlStatus,
  NgControlStatusGroup,
  NotificationsService,
  Product,
  ReactiveFormsModule,
  SETTINGS,
  Validators,
  productToFormValue,
  ɵNgNoValidate
} from "./chunk-FGMQFOLX.js";
import "./chunk-Q4M4NLQD.js";
import {
  ButtonComponent
} from "./chunk-PTCGLHTR.js";
import {
  TranslateDirective,
  TranslatePipe
} from "./chunk-BW4AJP7C.js";
import "./chunk-CTLQRZYU.js";
import "./chunk-5WJUMO7X.js";
import {
  ActivatedRoute,
  Router
} from "./chunk-JRXEEUAD.js";
import "./chunk-5MLLJAOM.js";
import {
  CurrencyPipe,
  NgClass
} from "./chunk-76JI64DZ.js";
import {
  Component,
  HostListener,
  Renderer2,
  ViewEncapsulation,
  combineLatest,
  computed,
  debounceTime,
  effect,
  inject,
  input,
  output,
  setClassMetadata,
  signal,
  take,
  viewChild,
  ɵsetClassDebugInfo,
  ɵɵProvidersFeature,
  ɵɵadvance,
  ɵɵclassProp,
  ɵɵconditional,
  ɵɵconditionalCreate,
  ɵɵdefineComponent,
  ɵɵdirectiveInject,
  ɵɵelement,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵgetCurrentView,
  ɵɵlistener,
  ɵɵnextContext,
  ɵɵpipe,
  ɵɵpipeBind1,
  ɵɵpipeBind2,
  ɵɵprojection,
  ɵɵprojectionDef,
  ɵɵproperty,
  ɵɵpureFunction0,
  ɵɵpureFunction1,
  ɵɵqueryAdvance,
  ɵɵreference,
  ɵɵresetView,
  ɵɵresolveDocument,
  ɵɵresolveWindow,
  ɵɵrestoreView,
  ɵɵstyleMap,
  ɵɵstyleProp,
  ɵɵtemplate,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1,
  ɵɵtextInterpolate2,
  ɵɵviewQuerySignal
} from "./chunk-UQVCVPTQ.js";
import "./chunk-PZQLIUCM.js";
import "./chunk-7YWLATDR.js";
import "./chunk-46DXP6YY.js";

// src/app/shared/view/ui/tooltip.component.ts
var _c0 = ["element"];
var _c1 = ["*", [["content"]]];
var _c2 = ["*", "content"];
function TooltipComponent_Conditional_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 4, 0);
    \u0275\u0275projection(2, 1);
    \u0275\u0275elementEnd();
    \u0275\u0275element(3, "lg-portal", 5);
  }
  if (rf & 2) {
    const element_r1 = \u0275\u0275reference(1);
    \u0275\u0275advance(3);
    \u0275\u0275property("appendTarget", "body")("targetElement", element_r1)("wrapClass", "tooltip tooltip--ejected");
  }
}
var TooltipComponent = class _TooltipComponent {
  constructor() {
    setInterval(() => {
      this._calculateBoundaries();
    }, 500);
  }
  renderer = inject(Renderer2);
  gap = input(16);
  displayed = signal(false);
  full = input(false);
  position = input("top");
  element = viewChild("element");
  onClose = output();
  coordinates = signal({ x: 0, y: 0 });
  maxWidth = signal(0);
  coordinatesEffect = effect(() => {
    this.renderer.setProperty(document.body, "style", `
      --tooltip-x: ${this.coordinates().x}px;
      --tooltip-y: ${this.coordinates().y}px;
      --tooltip-width: ${this.maxWidth()}px;
      `);
  });
  toggle(event) {
    this.displayed.set(!this.displayed());
    if (!this.displayed()) {
      this.onClose.emit();
    }
    if (event) {
      event.stopPropagation();
      const [x, y] = [event.clientX, event.clientY];
      console.log("x", x, "y", y);
      setTimeout(() => {
        this.coordinates.set({ x, y });
        this._calculateBoundaries();
      });
    }
  }
  close() {
    this.displayed.set(false);
    this.onClose.emit();
  }
  onClick(event) {
    if (event.target instanceof HTMLElement) {
      if (!event.target.closest(".tooltip")) {
        this.displayed.set(false);
        this.onClose.emit();
      }
    }
  }
  onKeydown(event) {
    if (event.key === "Escape") {
      this.displayed.set(false);
      this.onClose.emit();
    }
  }
  // hide on scroll
  onScroll(event) {
    this.displayed.set(false);
    this.onClose.emit();
  }
  _calculateBoundaries() {
    const tooltip = this.element()?.nativeElement;
    if (!tooltip)
      return;
    const tooltipRect = tooltip.getBoundingClientRect();
    const tooltipWidth = tooltipRect.width;
    const tooltipHeight = tooltipRect.height;
    const screenWidth = window.innerWidth;
    const screenHeight = window.innerHeight;
    const offset = 16;
    let newX = this.coordinates().x;
    let newY = this.coordinates().y;
    console.log({
      newX,
      newY,
      tooltipWidth,
      tooltipHeight,
      screenWidth,
      screenHeight
    });
    if (newX + tooltipWidth + offset > screenWidth) {
      newX = screenWidth - tooltipWidth - offset;
    }
    if (newY + tooltipHeight + offset > screenHeight) {
      newY = screenHeight - tooltipHeight - offset;
    }
    if (newX - tooltipWidth - offset < 0) {
      newX = offset;
    }
    if (newY - tooltipHeight - offset < 0) {
      newY = offset;
    }
    this.coordinates.set({ x: newX, y: newY });
  }
  static \u0275fac = function TooltipComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _TooltipComponent)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _TooltipComponent, selectors: [["lg-tooltip"]], viewQuery: function TooltipComponent_Query(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275viewQuerySignal(ctx.element, _c0, 5);
    }
    if (rf & 2) {
      \u0275\u0275queryAdvance();
    }
  }, hostBindings: function TooltipComponent_HostBindings(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275listener("click", function TooltipComponent_click_HostBindingHandler($event) {
        return ctx.onClick($event);
      }, \u0275\u0275resolveDocument)("keydown", function TooltipComponent_keydown_HostBindingHandler($event) {
        return ctx.onKeydown($event);
      }, \u0275\u0275resolveDocument)("scroll", function TooltipComponent_scroll_HostBindingHandler($event) {
        return ctx.onScroll($event);
      }, \u0275\u0275resolveWindow);
    }
  }, inputs: { gap: [1, "gap"], full: [1, "full"], position: [1, "position"] }, outputs: { onClose: "onClose" }, ngContentSelectors: _c2, decls: 5, vars: 6, consts: [["element", ""], [1, "tooltip", 3, "ngClass"], [1, "tooltip__anchor"], [3, "click"], [1, "tooltip__content"], [3, "appendTarget", "targetElement", "wrapClass"]], template: function TooltipComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275projectionDef(_c1);
      \u0275\u0275elementStart(0, "div", 1)(1, "div", 2)(2, "div", 3);
      \u0275\u0275listener("click", function TooltipComponent_Template_div_click_2_listener($event) {
        return ctx.toggle($event);
      });
      \u0275\u0275projection(3);
      \u0275\u0275elementEnd();
      \u0275\u0275conditionalCreate(4, TooltipComponent_Conditional_4_Template, 4, 3);
      \u0275\u0275elementEnd()();
    }
    if (rf & 2) {
      \u0275\u0275styleProp("--gap", ctx.gap(), "px");
      \u0275\u0275classProp("fullscreen", ctx.full());
      \u0275\u0275property("ngClass", ctx.position());
      \u0275\u0275advance(4);
      \u0275\u0275conditional(ctx.displayed() ? 4 : -1);
    }
  }, dependencies: [
    NgClass,
    PortalComponent
  ], styles: ["/* angular:styles/component:scss;e934ef40a966c2a0863b3928357eae093790478a786f5bb3d689f067873363d5;/Users/khripunovpavel/Documents/my/lasagna/lasagna/src/app/shared/view/ui/tooltip.component.ts */\nlg-tooltip {\n  flex: 1;\n  display: flex;\n}\n.tooltip {\n  display: inline-block;\n}\n.tooltip--ejected .tooltip__content {\n  top: calc(var(--tooltip-y) + 16px);\n  left: calc(var(--tooltip-x) + 16px);\n  position: fixed;\n  z-index: 6;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n}\n.tooltip__anchor {\n  position: relative;\n}\n.tooltip__content {\n  position: absolute;\n  background-color: #ffffff;\n  border-radius: 16px;\n  padding: 16px;\n  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);\n  z-index: 100;\n}\n.tooltip.top .tooltip__content {\n  bottom: calc(100% + var(--gap));\n  right: 50%;\n  transform: translateX(50%);\n}\n.tooltip.bottom .tooltip__content {\n  bottom: calc(100% + var(--gap));\n  right: 50%;\n  transform: translateX(50%);\n}\n.tooltip.left .tooltip__content {\n  bottom: 50%;\n  right: calc(100% + var(--gap));\n  transform: translateY(50%);\n}\n.tooltip.right .tooltip__content {\n  bottom: 50%;\n  left: calc(100% + var(--gap));\n  transform: translateY(-50%);\n}\n.tooltip.fullscreen .tooltip__content {\n  position: fixed;\n  top: 0;\n  left: 0;\n  right: 0;\n  bottom: 0;\n  background-color: #ffffff;\n  border-radius: 0;\n  padding: 32px;\n  transform: none;\n  overflow-y: auto;\n}\n/*# sourceMappingURL=tooltip.component.css.map */\n"], encapsulation: 2 });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(TooltipComponent, [{
    type: Component,
    args: [{ selector: "lg-tooltip", standalone: true, template: `
    <div [class.fullscreen]="full()"
         [ngClass]="position()"
         [style.--gap.px]="gap()"
         class="tooltip">
      <div class="tooltip__anchor">
        <div (click)="toggle($event)">
          <ng-content></ng-content>
        </div>
        @if (displayed()) {
          <div class="tooltip__content" #element>
            <ng-content select="content"></ng-content>
          </div>
          <lg-portal [appendTarget]="'body'"
                     [targetElement]="element"
                     [wrapClass]="'tooltip tooltip--ejected'">
          </lg-portal>
        }

      </div>
    </div>
  `, imports: [
      NgClass,
      PortalComponent
    ], encapsulation: ViewEncapsulation.None, styles: ["/* angular:styles/component:scss;e934ef40a966c2a0863b3928357eae093790478a786f5bb3d689f067873363d5;/Users/khripunovpavel/Documents/my/lasagna/lasagna/src/app/shared/view/ui/tooltip.component.ts */\nlg-tooltip {\n  flex: 1;\n  display: flex;\n}\n.tooltip {\n  display: inline-block;\n}\n.tooltip--ejected .tooltip__content {\n  top: calc(var(--tooltip-y) + 16px);\n  left: calc(var(--tooltip-x) + 16px);\n  position: fixed;\n  z-index: 6;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n}\n.tooltip__anchor {\n  position: relative;\n}\n.tooltip__content {\n  position: absolute;\n  background-color: #ffffff;\n  border-radius: 16px;\n  padding: 16px;\n  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);\n  z-index: 100;\n}\n.tooltip.top .tooltip__content {\n  bottom: calc(100% + var(--gap));\n  right: 50%;\n  transform: translateX(50%);\n}\n.tooltip.bottom .tooltip__content {\n  bottom: calc(100% + var(--gap));\n  right: 50%;\n  transform: translateX(50%);\n}\n.tooltip.left .tooltip__content {\n  bottom: 50%;\n  right: calc(100% + var(--gap));\n  transform: translateY(50%);\n}\n.tooltip.right .tooltip__content {\n  bottom: 50%;\n  left: calc(100% + var(--gap));\n  transform: translateY(-50%);\n}\n.tooltip.fullscreen .tooltip__content {\n  position: fixed;\n  top: 0;\n  left: 0;\n  right: 0;\n  bottom: 0;\n  background-color: #ffffff;\n  border-radius: 0;\n  padding: 32px;\n  transform: none;\n  overflow-y: auto;\n}\n/*# sourceMappingURL=tooltip.component.css.map */\n"] }]
  }], () => [], { onClick: [{
    type: HostListener,
    args: ["document:click", ["$event"]]
  }], onKeydown: [{
    type: HostListener,
    args: ["document:keydown", ["$event"]]
  }], onScroll: [{
    type: HostListener,
    args: ["window:scroll", ["$event"]]
  }] });
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(TooltipComponent, { className: "TooltipComponent", filePath: "src/app/shared/view/ui/tooltip.component.ts", lineNumber: 126 });
})();

// src/app/features/widgets/amount-widgets.component.ts
function AmountWidgetsComponent_Conditional_5_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 3)(1, "lg-eggs-widget", 4);
    \u0275\u0275listener("changed", function AmountWidgetsComponent_Conditional_5_Template_lg_eggs_widget_changed_1_listener($event) {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.onEggsChanged($event));
    });
    \u0275\u0275elementEnd()();
  }
}
var AmountWidgetsComponent = class _AmountWidgetsComponent {
  constructor() {
  }
  eggsChanged = output();
  selectedWidget = signal(null);
  onWidgetSelect(event) {
    this.selectedWidget.set(event);
  }
  onEggsChanged(event) {
    if (!event)
      return;
    this.eggsChanged.emit(event);
  }
  static \u0275fac = function AmountWidgetsComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _AmountWidgetsComponent)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _AmountWidgetsComponent, selectors: [["lg-amount-widgets"]], outputs: { eggsChanged: "eggsChanged" }, decls: 6, vars: 6, consts: [[1, "amount-widgets"], [1, "amount-widgets__buttons"], [1, "amount-widgets__button", 3, "click"], [1, "amount-widgets__wrapper"], [3, "changed"]], template: function AmountWidgetsComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "div", 0)(1, "div", 1)(2, "button", 2);
      \u0275\u0275listener("click", function AmountWidgetsComponent_Template_button_click_2_listener() {
        return ctx.onWidgetSelect("eggs");
      });
      \u0275\u0275text(3);
      \u0275\u0275pipe(4, "translate");
      \u0275\u0275elementEnd()();
      \u0275\u0275conditionalCreate(5, AmountWidgetsComponent_Conditional_5_Template, 2, 0, "div", 3);
      \u0275\u0275elementEnd();
    }
    if (rf & 2) {
      \u0275\u0275classProp("selected", ctx.selectedWidget() != null);
      \u0275\u0275advance(3);
      \u0275\u0275textInterpolate1("", \u0275\u0275pipeBind1(4, 4, "widgets.eggs.title"), " ");
      \u0275\u0275advance(2);
      \u0275\u0275conditional(ctx.selectedWidget() === "eggs" ? 5 : -1);
    }
  }, dependencies: [
    EggsWidgetComponent,
    TranslatePipe
  ], styles: ["\n\n.amount-widgets[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 16px;\n  flex-direction: column;\n}\n.amount-widgets__input[_ngcontent-%COMP%] {\n  flex: 1;\n}\n.amount-widgets__buttons[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 16px;\n  flex-wrap: wrap;\n  padding: 16px;\n  background-color: #fafafa;\n  border-radius: 12px;\n  margin: -16px;\n}\n.amount-widgets.selected[_ngcontent-%COMP%]   .amount-widgets__buttons[_ngcontent-%COMP%] {\n  margin-bottom: 0;\n}\n.amount-widgets__button[_ngcontent-%COMP%] {\n  display: flex;\n  padding: 8px 16px;\n  border-radius: 16px;\n  background-color: #e5de38;\n  appearance: none;\n  border: none;\n  font-family: inherit;\n  font-size: inherit;\n}\n/*# sourceMappingURL=amount-widgets.component.css.map */"] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(AmountWidgetsComponent, [{
    type: Component,
    args: [{ selector: "lg-amount-widgets", standalone: true, template: `
      <div [class.selected]="selectedWidget() != null"
           class="amount-widgets">
          <div class="amount-widgets__buttons">
              <button (click)="onWidgetSelect('eggs')"
                      class="amount-widgets__button">{{ 'widgets.eggs.title' | translate }}
              </button>
          </div>
          @if (selectedWidget() === 'eggs') {
              <div class="amount-widgets__wrapper">
                  <lg-eggs-widget (changed)="onEggsChanged($event)"></lg-eggs-widget>
              </div>
          }
      </div>
  `, imports: [
      EggsWidgetComponent,
      TranslatePipe
    ], styles: ["/* angular:styles/component:scss;8c3c71c12b5351fce86054c47a3f04356ee3671cb81c8812cb3ea3add97ffeff;/Users/khripunovpavel/Documents/my/lasagna/lasagna/src/app/features/widgets/amount-widgets.component.ts */\n.amount-widgets {\n  display: flex;\n  gap: 16px;\n  flex-direction: column;\n}\n.amount-widgets__input {\n  flex: 1;\n}\n.amount-widgets__buttons {\n  display: flex;\n  gap: 16px;\n  flex-wrap: wrap;\n  padding: 16px;\n  background-color: #fafafa;\n  border-radius: 12px;\n  margin: -16px;\n}\n.amount-widgets.selected .amount-widgets__buttons {\n  margin-bottom: 0;\n}\n.amount-widgets__button {\n  display: flex;\n  padding: 8px 16px;\n  border-radius: 16px;\n  background-color: #e5de38;\n  appearance: none;\n  border: none;\n  font-family: inherit;\n  font-size: inherit;\n}\n/*# sourceMappingURL=amount-widgets.component.css.map */\n"] }]
  }], () => [], null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(AmountWidgetsComponent, { className: "AmountWidgetsComponent", filePath: "src/app/features/widgets/amount-widgets.component.ts", lineNumber: 67 });
})();

// src/app/features/products/view/add-product/add-product-form.component.ts
var _c02 = ["nameField"];
var _c12 = (a0) => ({ unit: a0 });
var _c22 = () => ({ currency: "EUR" });
function AddProductFormComponent_ng_template_12_Template(rf, ctx) {
  if (rf & 1) {
    const _r3 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "lg-flex-row", 21)(1, "lg-tooltip", 22)(2, "lg-button", 23);
    \u0275\u0275element(3, "mat-icon", 24);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "div", 25)(5, "lg-amount-widgets", 26);
    \u0275\u0275listener("eggsChanged", function AddProductFormComponent_ng_template_12_Template_lg_amount_widgets_eggsChanged_5_listener($event) {
      \u0275\u0275restoreView(_r3);
      const ctx_r3 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r3.eggsChanged($event));
    });
    \u0275\u0275elementEnd()()();
    \u0275\u0275element(6, "lg-unit-switcher", 27);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    \u0275\u0275property("center", true)("size", "small");
    \u0275\u0275advance();
    \u0275\u0275property("position", "left");
    \u0275\u0275advance();
    \u0275\u0275styleMap("success");
    \u0275\u0275property("flat", true)("icon", true);
  }
}
function AddProductFormComponent_ng_template_17_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span");
    \u0275\u0275text(1);
    \u0275\u0275pipe(2, "currencySymbol");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r3 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(2, 1, ctx_r3.userSettings()["currency"]));
  }
}
function AddProductFormComponent_ng_template_32_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span");
    \u0275\u0275text(1);
    \u0275\u0275pipe(2, "translate");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const item_r6 = ctx.$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(item_r6.system ? \u0275\u0275pipeBind1(2, 1, "category.product." + item_r6.name) : item_r6.name);
  }
}
function AddProductFormComponent_ng_template_33_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span");
    \u0275\u0275text(1);
    \u0275\u0275pipe(2, "translate");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const item_r7 = ctx.$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(item_r7.system ? \u0275\u0275pipeBind1(2, 1, "category.product." + item_r7.name) : item_r7.name);
  }
}
function AddProductFormComponent_Conditional_34_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "lg-chips-list", 17);
  }
  if (rf & 2) {
    const ctx_r3 = \u0275\u0275nextContext();
    const categorySelect_r8 = \u0275\u0275reference(31);
    \u0275\u0275property("control", categorySelect_r8)("items", ctx_r3.topCategories());
  }
}
var AddProductFormComponent = class _AddProductFormComponent {
  _productsRepository;
  _selectResourcesService;
  _router;
  _notificationsService;
  constructor(_productsRepository, _selectResourcesService, _router, _notificationsService) {
    this._productsRepository = _productsRepository;
    this._selectResourcesService = _selectResourcesService;
    this._router = _router;
    this._notificationsService = _notificationsService;
  }
  form = new FormGroup({
    name: new FormControl(null, Validators.required),
    amount: new FormControl(null, Validators.required),
    price: new FormControl(null, Validators.required),
    unit: new FormControl("gram"),
    source: new FormControl(null),
    category_id: new FormControl(null)
  });
  userSettings = inject(SETTINGS);
  product = input(null);
  topCategories = signal([]);
  topSources = signal([]);
  nameField = viewChild("nameField");
  productEffect = effect(() => {
    if (!this.product() || this.form.dirty) {
      return;
    }
    this.form.reset(productToFormValue(this.product()));
    this.form.markAsPristine();
  });
  get _defFormValue() {
    return {
      name: null,
      amount: null,
      price: null,
      source: null,
      category_id: null,
      unit: "gram"
    };
  }
  get _formValid() {
    return this.form.valid;
  }
  eggsChanged(event) {
    this.form.patchValue({
      amount: event
    });
  }
  ngOnInit() {
    this._loadUsingHistory();
    this.form.valueChanges.pipe(debounceTime(100)).subscribe((values) => {
      if (!this.form.dirty) {
        return;
      }
      this.product()?.update(values);
    });
  }
  resetForm(value) {
    this.form.reset(value ? productToFormValue(value) : this._defFormValue);
    this.form.markAsPristine();
    this._loadUsingHistory();
  }
  validateForm() {
    if (!this._formValid) {
      this._notificationsService.error(this._notificationsService.parseFormErrors(this.form).join(", "));
      return false;
    }
    return true;
  }
  ngAfterViewInit() {
    this._selectResourcesService.load().then((resources) => {
    });
    if (!this.product()?.uuid) {
      this.nameField().focus();
    }
    this.form.markAsPristine();
  }
  _loadUsingHistory() {
    this._productsRepository.getTopCategories().then((categories) => {
      this.topCategories.set(categories.map((category) => ({
        label: category.name,
        value: category.uuid ?? "",
        color: category.ownColor
      })));
    });
    this._productsRepository.getTopSources().then((sources) => {
      this.topSources.set(sources.map((source) => ({
        label: source,
        value: source
      })));
    });
  }
  smaller = smaller;
  static \u0275fac = function AddProductFormComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _AddProductFormComponent)(\u0275\u0275directiveInject(ProductsRepository), \u0275\u0275directiveInject(SelectResourcesService), \u0275\u0275directiveInject(Router), \u0275\u0275directiveInject(NotificationsService));
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _AddProductFormComponent, selectors: [["lg-add-product-form"]], viewQuery: function AddProductFormComponent_Query(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275viewQuerySignal(ctx.nameField, _c02, 5);
    }
    if (rf & 2) {
      \u0275\u0275queryAdvance();
    }
  }, inputs: { product: [1, "product"] }, decls: 35, vars: 33, consts: [["nameField", ""], ["priceInput", ""], ["sourceInput", ""], ["sourceChips", ""], ["categorySelect", ""], [3, "formGroup"], [3, "label"], ["formControlName", "name", "placeholder", ""], [3, "center", "mobileMode"], ["lgExpand", "", 3, "label"], ["formControlName", "amount", "lgParseMath", "", "placeholder", "", 3, "onInputChange"], ["lgExtraTpl", "", "place", "after"], ["lgWidth", "40%", 3, "label"], ["formControlName", "price", "lgParseMath", "", "placeholder", ""], [2, "--control-bg", "var(--hr-bg-strong)", 3, "equal", "mobileMode", "top"], ["appendTo", "body", "formControlName", "source", "placeholder", "", 3, "onSelected", "noLoad", "resource"], [3, "hidden"], [3, "control", "items"], ["appendTo", "body", "formControlName", "category_id", "placeholder", "", 3, "resource"], ["lgControlTpl", "", "type", "label"], ["lgControlTpl", "", "type", "option"], [3, "center", "size"], [3, "position"], [3, "flat", "icon"], ["aria-hidden", "false", "fontIcon", "add"], ["ngProjectAs", "content", 5, ["content"]], [3, "eggsChanged"], ["formControlName", "unit"]], template: function AddProductFormComponent_Template(rf, ctx) {
    if (rf & 1) {
      const _r1 = \u0275\u0275getCurrentView();
      \u0275\u0275elementStart(0, "form", 5)(1, "lg-flex-column")(2, "lg-card")(3, "lg-flex-column")(4, "lg-control", 6);
      \u0275\u0275pipe(5, "translate");
      \u0275\u0275element(6, "lg-input", 7, 0);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(8, "lg-flex-row", 8)(9, "lg-control", 9);
      \u0275\u0275pipe(10, "translate");
      \u0275\u0275elementStart(11, "lg-number-input", 10);
      \u0275\u0275listener("onInputChange", function AddProductFormComponent_Template_lg_number_input_onInputChange_11_listener() {
        \u0275\u0275restoreView(_r1);
        const priceInput_r2 = \u0275\u0275reference(16);
        return \u0275\u0275resetView(priceInput_r2.focus());
      });
      \u0275\u0275template(12, AddProductFormComponent_ng_template_12_Template, 7, 7, "ng-template", 11);
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(13, "lg-control", 12);
      \u0275\u0275pipe(14, "translate");
      \u0275\u0275elementStart(15, "lg-number-input", 13, 1);
      \u0275\u0275template(17, AddProductFormComponent_ng_template_17_Template, 3, 3, "ng-template", 11);
      \u0275\u0275elementEnd()()()()();
      \u0275\u0275elementStart(18, "lg-flex-row", 14)(19, "lg-control", 6);
      \u0275\u0275pipe(20, "translate");
      \u0275\u0275elementStart(21, "lg-flex-column")(22, "lg-autocomplete", 15, 2);
      \u0275\u0275listener("onSelected", function AddProductFormComponent_Template_lg_autocomplete_onSelected_22_listener() {
        \u0275\u0275restoreView(_r1);
        const sourceChips_r5 = \u0275\u0275reference(26);
        return \u0275\u0275resetView(sourceChips_r5.clearSelected());
      });
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(24, "div", 16);
      \u0275\u0275element(25, "lg-chips-list", 17, 3);
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(27, "lg-control", 6);
      \u0275\u0275pipe(28, "translate");
      \u0275\u0275elementStart(29, "lg-flex-column")(30, "lg-multiselect", 18, 4);
      \u0275\u0275template(32, AddProductFormComponent_ng_template_32_Template, 3, 3, "ng-template", 19)(33, AddProductFormComponent_ng_template_33_Template, 3, 3, "ng-template", 20);
      \u0275\u0275elementEnd();
      \u0275\u0275conditionalCreate(34, AddProductFormComponent_Conditional_34_Template, 1, 2, "lg-chips-list", 17);
      \u0275\u0275elementEnd()()()()();
    }
    if (rf & 2) {
      const sourceInput_r9 = \u0275\u0275reference(23);
      \u0275\u0275property("formGroup", ctx.form);
      \u0275\u0275advance(4);
      \u0275\u0275property("label", \u0275\u0275pipeBind1(5, 18, "product.form.name.placeholder"));
      \u0275\u0275advance(4);
      \u0275\u0275property("center", true)("mobileMode", true);
      \u0275\u0275advance();
      \u0275\u0275property("label", \u0275\u0275pipeBind2(10, 20, "product.form.amount.placeholder", \u0275\u0275pureFunction1(30, _c12, ctx.form.value.unit)));
      \u0275\u0275advance(4);
      \u0275\u0275property("label", \u0275\u0275pipeBind2(14, 23, "product.form.price.placeholder", \u0275\u0275pureFunction0(32, _c22)));
      \u0275\u0275advance(5);
      \u0275\u0275property("equal", true)("mobileMode", true)("top", true);
      \u0275\u0275advance();
      \u0275\u0275property("label", \u0275\u0275pipeBind1(20, 26, "product.form.source.placeholder"));
      \u0275\u0275advance(3);
      \u0275\u0275property("noLoad", true)("resource", "sources");
      \u0275\u0275advance(2);
      \u0275\u0275property("hidden", !ctx.topSources().length);
      \u0275\u0275advance();
      \u0275\u0275property("control", sourceInput_r9)("items", ctx.topSources());
      \u0275\u0275advance(2);
      \u0275\u0275property("label", \u0275\u0275pipeBind1(28, 28, "product.form.category_id.placeholder"));
      \u0275\u0275advance(3);
      \u0275\u0275property("resource", "categories");
      \u0275\u0275advance(4);
      \u0275\u0275conditional(ctx.topCategories().length ? 34 : -1);
    }
  }, dependencies: [
    ReactiveFormsModule,
    \u0275NgNoValidate,
    NgControlStatus,
    NgControlStatusGroup,
    FormGroupDirective,
    FormControlName,
    FlexColumnComponent,
    MultiselectComponent,
    NumberInputComponent,
    TooltipComponent,
    AmountWidgetsComponent,
    ParseMathDirective,
    FlexRowComponent,
    ExpandDirective,
    ChipsListComponent,
    AutocompleteComponent,
    TranslatePipe,
    CardComponent,
    MatIcon,
    ButtonComponent,
    WidthDirective,
    UnitSwitcherComponent,
    CurrencySymbolPipe,
    InputComponent,
    ControlExtraTemplateDirective,
    ControlComponent,
    ControlTemplateDirective
  ], styles: ["/* angular:styles/component:scss;e479f686f9038c11f5e097ca886a471be12ee124d83d30d03e810e678247c71f;/Users/khripunovpavel/Documents/my/lasagna/lasagna/src/app/features/products/view/add-product/add-product-form.component.ts */\nlg-eggs-widget {\n  min-width: 300px;\n}\n/*# sourceMappingURL=add-product-form.component.css.map */\n"], encapsulation: 2 });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(AddProductFormComponent, [{
    type: Component,
    args: [{ selector: "lg-add-product-form", standalone: true, imports: [
      ReactiveFormsModule,
      FlexColumnComponent,
      MultiselectComponent,
      NumberInputComponent,
      TooltipComponent,
      AmountWidgetsComponent,
      ParseMathDirective,
      FlexRowComponent,
      ExpandDirective,
      ChipsListComponent,
      AutocompleteComponent,
      TranslatePipe,
      CardComponent,
      MatIcon,
      ButtonComponent,
      WidthDirective,
      UnitSwitcherComponent,
      CurrencySymbolPipe,
      InputComponent,
      ControlExtraTemplateDirective,
      ControlComponent,
      ControlTemplateDirective
    ], encapsulation: ViewEncapsulation.None, template: `<form [formGroup]="form">
  <lg-flex-column>
    <lg-card>
      <lg-flex-column>
        <lg-control [label]="'product.form.name.placeholder'|translate">
          <lg-input #nameField
                    formControlName="name"
                    placeholder=""></lg-input>
        </lg-control>

        <lg-flex-row [center]="true" [mobileMode]="true">
          <lg-control [label]="'product.form.amount.placeholder'|translate:{unit:form.value.unit}"
                      lgExpand>
            <lg-number-input (onInputChange)="priceInput.focus()"
                             formControlName="amount"
                             lgParseMath
                             placeholder="">
              <ng-template lgExtraTpl place="after">
                <lg-flex-row [center]="true" [size]="'small'">
                  <lg-tooltip [position]="'left'">
                    <lg-button [flat]="true"
                               [icon]="true"
                               [style]="'success'">
                      <mat-icon aria-hidden="false" fontIcon="add"></mat-icon>
                    </lg-button>

                    <div ngProjectAs="content">
                      <lg-amount-widgets (eggsChanged)="eggsChanged($event)"></lg-amount-widgets>
                    </div>
                  </lg-tooltip>
                  <lg-unit-switcher formControlName="unit">
                  </lg-unit-switcher>
                </lg-flex-row>
              </ng-template>
            </lg-number-input>
          </lg-control>

          <lg-control [label]="'product.form.price.placeholder'|translate:{currency:'EUR'}"
                      lgWidth="40%">
            <lg-number-input #priceInput formControlName="price"
                             lgParseMath
                             placeholder="">
              <ng-template lgExtraTpl place="after">
                <span>{{ userSettings()['currency']|currencySymbol }}</span>
              </ng-template>
            </lg-number-input>
          </lg-control>
        </lg-flex-row>
      </lg-flex-column>
    </lg-card>

    <lg-flex-row [equal]="true" [mobileMode]="true" [top]="true" style="--control-bg: var(--hr-bg-strong)">
      <lg-control [label]="'product.form.source.placeholder'|translate">
        <lg-flex-column>
          <lg-autocomplete #sourceInput
                           (onSelected)="sourceChips.clearSelected()"
                           [noLoad]="true"
                           [resource]="'sources'"
                           appendTo="body"
                           formControlName="source"
                           placeholder=""></lg-autocomplete>
          <div [hidden]="!topSources().length">
            <lg-chips-list #sourceChips [control]="sourceInput" [items]="topSources()"></lg-chips-list>
          </div>
        </lg-flex-column>
      </lg-control>

      <lg-control [label]="'product.form.category_id.placeholder'|translate">
        <lg-flex-column>
          <lg-multiselect #categorySelect
                          [resource]="'categories'"
                          appendTo="body"
                          formControlName="category_id"
                          placeholder="">
            <ng-template let-item lgControlTpl type="label">
              <span>{{ item.system ? (('category.product.' + item.name) | translate) : item.name }}</span>
            </ng-template>
            <ng-template let-item lgControlTpl type="option">
              <span>{{ item.system ? (('category.product.' + item.name) | translate) : item.name }}</span>
            </ng-template>
          </lg-multiselect>

          @if (topCategories().length) {
            <lg-chips-list [control]="categorySelect" [items]="topCategories()"></lg-chips-list>
          }
        </lg-flex-column>
      </lg-control>
    </lg-flex-row>
  </lg-flex-column>
</form>
`, styles: ["/* angular:styles/component:scss;e479f686f9038c11f5e097ca886a471be12ee124d83d30d03e810e678247c71f;/Users/khripunovpavel/Documents/my/lasagna/lasagna/src/app/features/products/view/add-product/add-product-form.component.ts */\nlg-eggs-widget {\n  min-width: 300px;\n}\n/*# sourceMappingURL=add-product-form.component.css.map */\n"] }]
  }], () => [{ type: ProductsRepository }, { type: SelectResourcesService }, { type: Router }, { type: NotificationsService }], null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(AddProductFormComponent, { className: "AddProductFormComponent", filePath: "src/app/features/products/view/add-product/add-product-form.component.ts", lineNumber: 88 });
})();

// src/app/features/products/view/add-product/add-product.component.ts
var _c03 = (a0) => ({ unit: a0 });
function AddProductComponent_Conditional_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "lg-title", 2);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    let tmp_1_0;
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", (tmp_1_0 = ctx_r0.product()) == null ? null : tmp_1_0.name, " ");
  }
}
function AddProductComponent_Conditional_5_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "lg-title", 2);
    \u0275\u0275text(1);
    \u0275\u0275pipe(2, "translate");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind1(2, 1, "product.form.title"), " ");
  }
}
function AddProductComponent_Conditional_6_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 2);
    \u0275\u0275text(1);
    \u0275\u0275pipe(2, "userCurrency");
    \u0275\u0275element(3, "span", 8);
    \u0275\u0275pipe(4, "unitString");
    \u0275\u0275pipe(5, "translate");
    \u0275\u0275text(6, ") ");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    let tmp_1_0;
    let tmp_3_0;
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" (", \u0275\u0275pipeBind2(2, 3, (tmp_1_0 = ctx_r0.product()) == null ? null : tmp_1_0.pricePerUnit, "1.0-5"), " ");
    \u0275\u0275advance(2);
    \u0275\u0275property("translate", "per-unit.label")("translateParams", \u0275\u0275pureFunction1(10, _c03, \u0275\u0275pipeBind1(5, 8, \u0275\u0275pipeBind1(4, 6, (tmp_3_0 = ctx_r0.product()) == null ? null : tmp_3_0.unit))));
  }
}
function AddProductComponent_Conditional_8_ng_template_0_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span");
    \u0275\u0275text(1);
    \u0275\u0275pipe(2, "translate");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(2, 1, "saved-draft-label"));
  }
}
function AddProductComponent_Conditional_8_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275template(0, AddProductComponent_Conditional_8_ng_template_0_Template, 3, 3, "ng-template", 3);
  }
}
function AddProductComponent_ng_template_9_Conditional_0_Template(rf, ctx) {
  if (rf & 1) {
    const _r2 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "lg-button", 10);
    \u0275\u0275listener("click", function AddProductComponent_ng_template_9_Conditional_0_Template_lg_button_click_0_listener() {
      \u0275\u0275restoreView(_r2);
      const ctx_r0 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r0.onRemoveDraft());
    });
    \u0275\u0275text(1);
    \u0275\u0275pipe(2, "translate");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    \u0275\u0275styleMap("danger");
    \u0275\u0275property("flat", true);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind1(2, 4, "product.form.delete-draft-btn"), " ");
  }
}
function AddProductComponent_ng_template_9_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    const _r3 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "lg-button", 10);
    \u0275\u0275listener("click", function AddProductComponent_ng_template_9_Conditional_1_Template_lg_button_click_0_listener() {
      \u0275\u0275restoreView(_r3);
      const ctx_r0 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r0.onDeleteProduct());
    });
    \u0275\u0275text(1);
    \u0275\u0275pipe(2, "translate");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    \u0275\u0275styleMap("danger");
    \u0275\u0275property("flat", true);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind1(2, 4, "product.form.delete-btn"), " ");
  }
}
function AddProductComponent_ng_template_9_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275conditionalCreate(0, AddProductComponent_ng_template_9_Conditional_0_Template, 3, 6, "lg-button", 9)(1, AddProductComponent_ng_template_9_Conditional_1_Template, 3, 6, "lg-button", 9);
  }
  if (rf & 2) {
    let tmp_1_0;
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275conditional(ctx_r0.isDraftRoute() ? 0 : ((tmp_1_0 = ctx_r0.product()) == null ? null : tmp_1_0.uuid) ? 1 : -1);
  }
}
function AddProductComponent_Conditional_10_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "small", 4);
    \u0275\u0275text(1);
    \u0275\u0275pipe(2, "translate");
    \u0275\u0275pipe(3, "timeAgo");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    let tmp_1_0;
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275textInterpolate2(" ", \u0275\u0275pipeBind1(2, 2, "edited-at-label"), " ", \u0275\u0275pipeBind1(3, 4, (tmp_1_0 = ctx_r0.product()) == null ? null : tmp_1_0.updatedAt), " ");
  }
}
function AddProductComponent_Conditional_13_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275text(0);
    \u0275\u0275pipe(1, "translate");
  }
  if (rf & 2) {
    \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind1(1, 1, "product.form.save-btn.edit.active"), " ");
  }
}
function AddProductComponent_Conditional_13_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275text(0);
    \u0275\u0275pipe(1, "translate");
  }
  if (rf & 2) {
    \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind1(1, 1, "product.form.save-btn.edit.disabled"), " ");
  }
}
function AddProductComponent_Conditional_13_Template(rf, ctx) {
  if (rf & 1) {
    const _r4 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "lg-button", 11);
    \u0275\u0275listener("click", function AddProductComponent_Conditional_13_Template_lg_button_click_0_listener() {
      \u0275\u0275restoreView(_r4);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.onEditProduct());
    });
    \u0275\u0275conditionalCreate(1, AddProductComponent_Conditional_13_Conditional_1_Template, 2, 3)(2, AddProductComponent_Conditional_13_Conditional_2_Template, 2, 3);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    let tmp_1_0;
    let tmp_2_0;
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275property("disabled", !((tmp_1_0 = ctx_r0.formComponent()) == null ? null : tmp_1_0.form == null ? null : tmp_1_0.form.dirty) && !ctx_r0.draftRef());
    \u0275\u0275advance();
    \u0275\u0275conditional(((tmp_2_0 = ctx_r0.formComponent()) == null ? null : tmp_2_0.form == null ? null : tmp_2_0.form.dirty) || ctx_r0.draftRef() ? 1 : 2);
  }
}
function AddProductComponent_Conditional_14_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275text(0);
    \u0275\u0275pipe(1, "translate");
  }
  if (rf & 2) {
    \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind1(1, 1, "product.form.save-btn.add.active"), " ");
  }
}
function AddProductComponent_Conditional_14_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275text(0);
    \u0275\u0275pipe(1, "translate");
  }
  if (rf & 2) {
    \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind1(1, 1, "product.form.save-btn.add.disabled"), " ");
  }
}
function AddProductComponent_Conditional_14_Template(rf, ctx) {
  if (rf & 1) {
    const _r5 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "lg-button", 11);
    \u0275\u0275listener("click", function AddProductComponent_Conditional_14_Template_lg_button_click_0_listener() {
      \u0275\u0275restoreView(_r5);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.onAddProduct());
    });
    \u0275\u0275conditionalCreate(1, AddProductComponent_Conditional_14_Conditional_1_Template, 2, 3)(2, AddProductComponent_Conditional_14_Conditional_2_Template, 2, 3);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    let tmp_1_0;
    let tmp_2_0;
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275property("disabled", !((tmp_1_0 = ctx_r0.formComponent()) == null ? null : tmp_1_0.form == null ? null : tmp_1_0.form.dirty) && !ctx_r0.draftRef());
    \u0275\u0275advance();
    \u0275\u0275conditional(((tmp_2_0 = ctx_r0.formComponent()) == null ? null : tmp_2_0.form == null ? null : tmp_2_0.form.dirty) || ctx_r0.draftRef() ? 1 : 2);
  }
}
var AddProductComponent = class _AddProductComponent {
  _router;
  _aRoute;
  _productsRepository;
  _notificationsService;
  _analyticsService;
  constructor(_router, _aRoute, _productsRepository, _notificationsService, _analyticsService) {
    this._router = _router;
    this._aRoute = _aRoute;
    this._productsRepository = _productsRepository;
    this._notificationsService = _notificationsService;
    this._analyticsService = _analyticsService;
  }
  draftOrProductUUID = signal(void 0);
  product = signal(null);
  formComponent = viewChild(AddProductFormComponent);
  draftRef = signal(null);
  draftByExistingProduct = computed(() => {
    return this.draftRef().meta?.["uuid"];
  });
  isDraftRoute = signal(false);
  _routerManager = inject(ROUTER_MANAGER);
  ngOnDestroy() {
  }
  ngOnInit() {
    combineLatest([
      this._aRoute.params,
      this._aRoute.data
    ]).pipe(take(1)).subscribe(([params, data]) => {
      this.draftOrProductUUID.set(params["uuid"]);
      if (data["draft"]) {
        this.draftRef.set(data["draft"]);
        this.product.set(Product.fromRaw(data["draft"].data));
      } else if (this.draftOrProductUUID()) {
        this._loadProduct(this.draftOrProductUUID());
      } else {
        this.product.set(Product.empty());
      }
      this.isDraftRoute.set(!!data["draftRoute"]);
    });
  }
  ngAfterViewInit() {
    this.formComponent()?.form.valueChanges.pipe(debounceTime(500)).subscribe((value) => {
      if (!this.formComponent().form.dirty || !this.product()) {
        return;
      }
      if (this.draftRef()?.uuid) {
        this._productsRepository.updateDraftProduct(this.draftRef().uuid, this.product(), this.draftRef().meta?.["uuid"]);
      } else if (this.product()) {
        this.draftRef.set(this._productsRepository.saveDraftProduct(this.product(), this.draftOrProductUUID() ?? ""));
        if (!this.isDraftRoute()) {
          this._routerManager.replace(["products/draft/" + this.draftRef().uuid]);
        }
      }
    });
  }
  onAddProduct() {
    if (!this.formComponent()?.validateForm() || !this.product()) {
      return;
    }
    this._addProduct(this.product());
  }
  onEditProduct() {
    if (!this.formComponent()?.validateForm() || !this.product()) {
      return;
    }
    this._editProduct(this.product());
  }
  onRemoveDraft() {
    this._removeDraft();
    this._routerManager.navigate(["products"]);
  }
  onDeleteProduct() {
    if (!this.product()?.uuid) {
      return;
    }
    this._productsRepository.deleteProduct(this.product().uuid).then(() => {
      this._notificationsService.success("notifications.product.deleted");
      this._routerManager.navigate(["products"]);
    });
  }
  _addProduct(product) {
    this._productsRepository.addOne(product).then((newUUID) => {
      this._analyticsService.trackProductCreated(product.name, {
        product_uuid: newUUID,
        price_per_unit: product.pricePerUnit,
        unit: product.unit,
        category: product.category_id?.name
      });
      this.formComponent()?.resetForm();
      this._notificationsService.success("notifications.product.added");
      this.product.set(null);
      if (this.draftRef()) {
        this._removeDraft();
      }
      this._routerManager.replace(["products/edit/" + newUUID]);
    });
  }
  _editProduct(product) {
    if (!this.draftOrProductUUID()) {
      return;
    }
    let productUUID = this.draftRef()?.meta?.["uuid"] ?? this.draftOrProductUUID();
    this._productsRepository.updateOne(productUUID, product).then(() => {
      this.formComponent()?.resetForm(product);
      this._notificationsService.success("notifications.product.edited");
      if (this.draftRef()) {
        this._removeDraft();
      }
      this._routerManager.replace(["products", "edit", productUUID]);
    });
  }
  _removeDraft() {
    if (!this.draftRef()) {
      return;
    }
    this._productsRepository.removeDraftProduct(this.draftRef().uuid);
    this.draftRef.set(null);
  }
  _loadProduct(uuid) {
    if (!uuid) {
      return;
    }
    this._productsRepository.getOne(uuid, true).then((product) => {
      if (!product) {
        return;
      }
      this.product.set(product);
    });
  }
  static \u0275fac = function AddProductComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _AddProductComponent)(\u0275\u0275directiveInject(Router), \u0275\u0275directiveInject(ActivatedRoute), \u0275\u0275directiveInject(ProductsRepository), \u0275\u0275directiveInject(NotificationsService), \u0275\u0275directiveInject(AnalyticsService));
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _AddProductComponent, selectors: [["app-add-recipe"]], viewQuery: function AddProductComponent_Query(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275viewQuerySignal(ctx.formComponent, AddProductFormComponent, 5);
    }
    if (rf & 2) {
      \u0275\u0275queryAdvance();
    }
  }, features: [\u0275\u0275ProvidersFeature([
    CurrencyPipe
  ])], decls: 15, vars: 10, consts: [["size", "medium"], [3, "center", "mobileMode"], ["lgSelfStart", ""], ["lgInlineSeparatedGroup", ""], [1, "text-muted", "text-cursive"], [3, "product"], [3, "mobileMode", "relaxed"], ["lgShrink", "", 3, "disabled"], [3, "translate", "translateParams"], ["lgShrink", "", 3, "style", "flat"], ["lgShrink", "", 3, "click", "flat"], ["lgShrink", "", 3, "click", "disabled"]], template: function AddProductComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "lg-fade-in")(1, "lg-container")(2, "lg-flex-column", 0)(3, "lg-flex-row", 1);
      \u0275\u0275conditionalCreate(4, AddProductComponent_Conditional_4_Template, 2, 1, "lg-title", 2)(5, AddProductComponent_Conditional_5_Template, 3, 3, "lg-title", 2);
      \u0275\u0275conditionalCreate(6, AddProductComponent_Conditional_6_Template, 7, 12, "span", 2);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(7, "lg-inline-separated-group");
      \u0275\u0275conditionalCreate(8, AddProductComponent_Conditional_8_Template, 1, 0, null, 3);
      \u0275\u0275template(9, AddProductComponent_ng_template_9_Template, 2, 1, "ng-template", 3);
      \u0275\u0275elementEnd();
      \u0275\u0275conditionalCreate(10, AddProductComponent_Conditional_10_Template, 4, 6, "small", 4);
      \u0275\u0275elementEnd();
      \u0275\u0275element(11, "lg-add-product-form", 5);
      \u0275\u0275elementStart(12, "lg-flex-row", 6);
      \u0275\u0275conditionalCreate(13, AddProductComponent_Conditional_13_Template, 3, 2, "lg-button", 7)(14, AddProductComponent_Conditional_14_Template, 3, 2, "lg-button", 7);
      \u0275\u0275elementEnd()()();
    }
    if (rf & 2) {
      let tmp_2_0;
      let tmp_3_0;
      let tmp_4_0;
      let tmp_5_0;
      \u0275\u0275advance(3);
      \u0275\u0275property("center", true)("mobileMode", true);
      \u0275\u0275advance();
      \u0275\u0275conditional(((tmp_2_0 = ctx.product()) == null ? null : tmp_2_0.uuid) && !ctx.draftRef() || ctx.draftRef() && ctx.draftByExistingProduct() ? 4 : 5);
      \u0275\u0275advance(2);
      \u0275\u0275conditional(((tmp_3_0 = ctx.product()) == null ? null : tmp_3_0.pricePerUnit) ? 6 : -1);
      \u0275\u0275advance(2);
      \u0275\u0275conditional(ctx.draftRef() && ((tmp_4_0 = ctx.formComponent()) == null ? null : tmp_4_0.form == null ? null : tmp_4_0.form.dirty) ? 8 : -1);
      \u0275\u0275advance(2);
      \u0275\u0275conditional(((tmp_5_0 = ctx.product()) == null ? null : tmp_5_0.updatedAt) ? 10 : -1);
      \u0275\u0275advance();
      \u0275\u0275property("product", ctx.product());
      \u0275\u0275advance();
      \u0275\u0275property("mobileMode", true)("relaxed", true);
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.product() && !ctx.draftRef() || ctx.draftRef() && ctx.draftByExistingProduct() ? 13 : 14);
    }
  }, dependencies: [
    ContainerComponent,
    TitleComponent,
    AddProductFormComponent,
    FlexRowComponent,
    FadeInComponent,
    ButtonComponent,
    ShrinkDirective,
    TimeAgoPipe,
    TranslatePipe,
    FlexColumnComponent,
    UserCurrencyPipe,
    InlineSeparatedGroupComponent,
    InlineSeparatedGroupDirective,
    SelfStartDirective,
    UnitStringPipe,
    TranslateDirective
  ], encapsulation: 2 });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(AddProductComponent, [{
    type: Component,
    args: [{ selector: "app-add-recipe", standalone: true, imports: [
      ContainerComponent,
      TitleComponent,
      AddProductFormComponent,
      FlexRowComponent,
      FadeInComponent,
      ButtonComponent,
      ShrinkDirective,
      TimeAgoPipe,
      TranslatePipe,
      FlexColumnComponent,
      UserCurrencyPipe,
      InlineSeparatedGroupComponent,
      InlineSeparatedGroupDirective,
      SelfStartDirective,
      UnitStringPipe,
      TranslateDirective
    ], template: `
    <lg-fade-in>
      <lg-container>
        <lg-flex-column size="medium">
          <lg-flex-row [center]="true" [mobileMode]="true">
            @if ((product()?.uuid && !draftRef()) || (draftRef() && draftByExistingProduct())) {
              <lg-title lgSelfStart>
                {{ product()?.name }}
              </lg-title>
            } @else {
              <lg-title lgSelfStart>
                {{ 'product.form.title'|translate }}
              </lg-title>
            }

            @if (product()?.pricePerUnit) {
              <span
                lgSelfStart>
                ({{ product()?.pricePerUnit | userCurrency:'1.0-5' }}
                <span [translate]="'per-unit.label'"
                       [translateParams]="{unit:product()?.unit | unitString | translate}"></span>)
              </span>
            }
          </lg-flex-row>

          <lg-inline-separated-group>
            @if (draftRef() && formComponent()?.form?.dirty) {
              <ng-template lgInlineSeparatedGroup>
                <span>{{ 'saved-draft-label'|translate }}</span>
              </ng-template>
            }

            <ng-template lgInlineSeparatedGroup>
              @if (isDraftRoute()) {
                <lg-button lgShrink [style]="'danger'"
                           [flat]="true"
                           (click)="onRemoveDraft()">
                  {{ 'product.form.delete-draft-btn'|translate }}
                </lg-button>
              } @else if (product()?.uuid) {
                <lg-button lgShrink [style]="'danger'"
                           [flat]="true"
                           (click)="onDeleteProduct()">
                  {{ 'product.form.delete-btn'|translate }}
                </lg-button>
              }
            </ng-template>
          </lg-inline-separated-group>

          @if (product()?.updatedAt) {
            <small class="text-muted text-cursive">
              {{ 'edited-at-label'|translate }} {{ product()?.updatedAt | timeAgo }}
            </small>
          }

        </lg-flex-column>

        <lg-add-product-form [product]="product()"></lg-add-product-form>

        <lg-flex-row [mobileMode]="true" [relaxed]="true">
          @if ((product() && !draftRef()) || (draftRef() && draftByExistingProduct())) {
            <lg-button [disabled]="!formComponent()?.form?.dirty && !draftRef()"
                       lgShrink
                       (click)="onEditProduct()">
              @if (formComponent()?.form?.dirty || draftRef()) {
                {{ 'product.form.save-btn.edit.active'|translate }}
              } @else {
                {{ 'product.form.save-btn.edit.disabled'|translate }}
              }
            </lg-button>
          } @else {
            <lg-button lgShrink
                       [disabled]="!formComponent()?.form?.dirty && !draftRef()"
                       (click)="onAddProduct()">
              @if (formComponent()?.form?.dirty || draftRef()) {
                {{ 'product.form.save-btn.add.active'|translate }}
              } @else {
                {{ 'product.form.save-btn.add.disabled'|translate }}
              }
            </lg-button>
          }

        </lg-flex-row>
      </lg-container>
    </lg-fade-in>
  `, providers: [
      CurrencyPipe
    ] }]
  }], () => [{ type: Router }, { type: ActivatedRoute }, { type: ProductsRepository }, { type: NotificationsService }, { type: AnalyticsService }], null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(AddProductComponent, { className: "AddProductComponent", filePath: "src/app/features/products/view/add-product/add-product.component.ts", lineNumber: 146 });
})();
export {
  AddProductComponent
};
//# sourceMappingURL=chunk-WRTA6WA6.js.map
