import {
  EggsWidgetComponent
} from "./chunk-BSV4AW4C.js";
import {
  UnitStringPipe
} from "./chunk-FZZIUM3T.js";
import {
  ReadonlyControlComponent
} from "./chunk-X2C45353.js";
import {
  CurrencySymbolPipe
} from "./chunk-6NO4QLV3.js";
import {
  WidthDirective
} from "./chunk-2F4SUGZC.js";
import {
  InputComponent
} from "./chunk-FWO7KYGH.js";
import "./chunk-LLE5CVLK.js";
import {
  PortalComponent
} from "./chunk-LWSH7HL2.js";
import {
  AutocompleteComponent,
  ChipsListComponent
} from "./chunk-TTTFEVUQ.js";
import {
  UnitSwitcherComponent
} from "./chunk-UOXMPTFF.js";
import {
  MultiselectComponent
} from "./chunk-65UJWWGW.js";
import {
  SelfStartDirective
} from "./chunk-KE4M3C52.js";
import {
  ShrinkDirective
} from "./chunk-K7HOJ46B.js";
import {
  NumberInputComponent,
  ParseMathDirective,
  smaller
} from "./chunk-YOK6IM6K.js";
import {
  ROUTER_MANAGER
} from "./chunk-3VKINZ24.js";
import {
  AnalyticsService
} from "./chunk-4ER4XFVT.js";
import {
  ControlComponent,
  ControlLabelTemplateDirective
} from "./chunk-MIHJPSYK.js";
import {
  ControlExtraTemplateDirective
} from "./chunk-E4VJ6P46.js";
import "./chunk-EROQRXO4.js";
import {
  InlineSeparatedGroupComponent,
  InlineSeparatedGroupDirective
} from "./chunk-EFTFGIS4.js";
import {
  ExpandDirective
} from "./chunk-M2YGHT4C.js";
import {
  MatIcon
} from "./chunk-L5RYK3YF.js";
import {
  ContainerComponent
} from "./chunk-5DOA7JWI.js";
import {
  FlexRowComponent
} from "./chunk-VT7H7QDZ.js";
import {
  CardComponent
} from "./chunk-JBMQGOGT.js";
import {
  TimeAgoPipe
} from "./chunk-AI45K3G4.js";
import {
  FlexColumnComponent
} from "./chunk-P5TU7LMT.js";
import {
  FadeInComponent
} from "./chunk-NYW6IVNI.js";
import "./chunk-R4FNXVZE.js";
import {
  TitleComponent
} from "./chunk-2FAMYL7R.js";
import {
  ProductsRepository,
  SelectResourcesService
} from "./chunk-TNNH66C3.js";
import "./chunk-2JX3723C.js";
import "./chunk-GYGQEGQM.js";
import "./chunk-HO3BXY6Z.js";
import {
  NotificationsService,
  Product,
  SETTINGS,
  UnitValue,
  productToFormValue
} from "./chunk-BDWFQHRO.js";
import "./chunk-T5CRNY7R.js";
import {
  FormControl,
  FormControlName,
  FormGroup,
  FormGroupDirective,
  NgControlStatus,
  NgControlStatusGroup,
  ReactiveFormsModule,
  Validators,
  ɵNgNoValidate
} from "./chunk-CT346LCA.js";
import "./chunk-IWOUTMKL.js";
import {
  ButtonComponent
} from "./chunk-ZB5UPSW5.js";
import "./chunk-WSDGGV5V.js";
import "./chunk-5WJUMO7X.js";
import {
  TranslateDirective,
  TranslatePipe
} from "./chunk-CQ4TEOHT.js";
import {
  ActivatedRoute,
  Router
} from "./chunk-OJVTGBZ3.js";
import "./chunk-3B7JG6VR.js";
import {
  CurrencyPipe,
  DecimalPipe,
  NgClass
} from "./chunk-S3HQU7AK.js";
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
} from "./chunk-FOZDM4WI.js";
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
  gap = input(16, ...ngDevMode ? [{ debugName: "gap" }] : []);
  displayed = signal(false, ...ngDevMode ? [{ debugName: "displayed" }] : []);
  full = input(false, ...ngDevMode ? [{ debugName: "full" }] : []);
  position = input("top", ...ngDevMode ? [{ debugName: "position" }] : []);
  element = viewChild("element", ...ngDevMode ? [{ debugName: "element" }] : []);
  onClose = output();
  coordinates = signal({ x: 0, y: 0 }, ...ngDevMode ? [{ debugName: "coordinates" }] : []);
  maxWidth = signal(0, ...ngDevMode ? [{ debugName: "maxWidth" }] : []);
  coordinatesEffect = effect(() => {
    this.renderer.setProperty(document.body, "style", `
      --tooltip-x: ${this.coordinates().x}px;
      --tooltip-y: ${this.coordinates().y}px;
      --tooltip-width: ${this.maxWidth()}px;
      `);
  }, ...ngDevMode ? [{ debugName: "coordinatesEffect" }] : []);
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
  selectedWidget = signal(null, ...ngDevMode ? [{ debugName: "selectedWidget" }] : []);
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
var _c12 = ["amountField"];
var _c22 = ["priceField"];
var _c3 = (a0) => ({ unit: a0 });
var _c4 = () => ({ currency: "EUR" });
function AddProductFormComponent_ng_template_14_Template(rf, ctx) {
  if (rf & 1) {
    const _r3 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "lg-flex-row", 23)(1, "lg-tooltip", 24)(2, "lg-button", 25);
    \u0275\u0275element(3, "mat-icon", 26);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "div", 27)(5, "lg-amount-widgets", 28);
    \u0275\u0275listener("eggsChanged", function AddProductFormComponent_ng_template_14_Template_lg_amount_widgets_eggsChanged_5_listener($event) {
      \u0275\u0275restoreView(_r3);
      const ctx_r3 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r3.eggsChanged($event));
    });
    \u0275\u0275elementEnd()()();
    \u0275\u0275element(6, "lg-unit-switcher", 29);
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
function AddProductFormComponent_ng_template_19_Template(rf, ctx) {
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
function AddProductFormComponent_ng_template_21_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span");
    \u0275\u0275text(1);
    \u0275\u0275pipe(2, "currencySymbol");
    \u0275\u0275elementEnd();
    \u0275\u0275element(3, "span", 30);
    \u0275\u0275pipe(4, "unitString");
    \u0275\u0275pipe(5, "translate");
  }
  if (rf & 2) {
    let tmp_8_0;
    const ctx_r3 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(2, 3, ctx_r3.userSettings()["currency"]));
    \u0275\u0275advance(2);
    \u0275\u0275property("translateParams", \u0275\u0275pureFunction1(9, _c3, \u0275\u0275pipeBind1(5, 7, \u0275\u0275pipeBind1(4, 5, (tmp_8_0 = ctx_r3.product()) == null ? null : tmp_8_0.unit))))("translate", "per-unit.label");
  }
}
function AddProductFormComponent_Conditional_38_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "lg-chips-list", 21);
  }
  if (rf & 2) {
    const ctx_r3 = \u0275\u0275nextContext();
    const categorySelect_r6 = \u0275\u0275reference(37);
    \u0275\u0275property("control", categorySelect_r6)("items", ctx_r3.topCategories());
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
  product = input(null, ...ngDevMode ? [{ debugName: "product" }] : []);
  topCategories = signal([], ...ngDevMode ? [{ debugName: "topCategories" }] : []);
  topSources = signal([], ...ngDevMode ? [{ debugName: "topSources" }] : []);
  nameField = viewChild("nameField", ...ngDevMode ? [{ debugName: "nameField" }] : []);
  amountField = viewChild("amountField", ...ngDevMode ? [{ debugName: "amountField" }] : []);
  priceField = viewChild("priceField", ...ngDevMode ? [{ debugName: "priceField" }] : []);
  smaller = smaller;
  UnitValue = UnitValue;
  productEffect = effect(() => {
    if (!this.product() || this.form.dirty) {
      return;
    }
    this.form.reset(productToFormValue(this.product()));
    this.form.markAsPristine();
  }, ...ngDevMode ? [{ debugName: "productEffect" }] : []);
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
    this._focusFirstEmptyControl();
    this.form.markAsPristine();
  }
  _focusFirstEmptyControl() {
    if (!this.form.value.name?.length) {
      this.nameField().focus();
    } else if (!this.form.value.amount) {
      this.amountField().focus();
    } else if (!this.form.value.price) {
      this.priceField().focus();
    } else {
      this.nameField().focus();
    }
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
  static \u0275fac = function AddProductFormComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _AddProductFormComponent)(\u0275\u0275directiveInject(ProductsRepository), \u0275\u0275directiveInject(SelectResourcesService), \u0275\u0275directiveInject(Router), \u0275\u0275directiveInject(NotificationsService));
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _AddProductFormComponent, selectors: [["lg-add-product-form"]], viewQuery: function AddProductFormComponent_Query(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275viewQuerySignal(ctx.nameField, _c02, 5);
      \u0275\u0275viewQuerySignal(ctx.amountField, _c12, 5);
      \u0275\u0275viewQuerySignal(ctx.priceField, _c22, 5);
    }
    if (rf & 2) {
      \u0275\u0275queryAdvance(3);
    }
  }, inputs: { product: [1, "product"] }, decls: 39, vars: 40, consts: [["nameField", ""], ["amountField", ""], ["priceField", ""], ["sourceInput", ""], ["sourceChips", ""], ["categorySelect", ""], [3, "formGroup"], [3, "label"], ["formControlName", "name", "placeholder", ""], [3, "center", "mobileMode"], ["lgExpand", "", 3, "label"], ["formControlName", "amount", "lgParseMath", "", "placeholder", "", 3, "onInputChange"], ["lgExtraTpl", "", "place", "after"], ["lgWidth", "40%", 3, "label"], ["formControlName", "price", "lgParseMath", "", "placeholder", ""], ["lgWidth", "40%"], ["lgControlLabelTemplate", ""], [3, "placeholder", "value"], [2, "--control-bg", "var(--hr-bg-strong)", 3, "equal", "mobileMode", "top"], ["appendTo", "body", "formControlName", "source", "placeholder", "", 3, "onSelected", "noLoad", "resource"], [3, "hidden"], [3, "control", "items"], ["appendTo", "body", "formControlName", "category_id", "placeholder", "", 3, "resource"], [3, "center", "size"], [3, "position"], [3, "flat", "icon"], ["aria-hidden", "false", "fontIcon", "add"], ["ngProjectAs", "content", 5, ["content"]], [3, "eggsChanged"], ["formControlName", "unit"], [3, "translateParams", "translate"]], template: function AddProductFormComponent_Template(rf, ctx) {
    if (rf & 1) {
      const _r1 = \u0275\u0275getCurrentView();
      \u0275\u0275elementStart(0, "form", 6)(1, "lg-flex-column")(2, "lg-card")(3, "lg-flex-column")(4, "lg-control", 7);
      \u0275\u0275pipe(5, "translate");
      \u0275\u0275element(6, "lg-input", 8, 0);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(8, "lg-flex-row", 9)(9, "lg-control", 10);
      \u0275\u0275pipe(10, "translate");
      \u0275\u0275pipe(11, "translate");
      \u0275\u0275elementStart(12, "lg-number-input", 11, 1);
      \u0275\u0275listener("onInputChange", function AddProductFormComponent_Template_lg_number_input_onInputChange_12_listener() {
        \u0275\u0275restoreView(_r1);
        const priceField_r2 = \u0275\u0275reference(18);
        return \u0275\u0275resetView(priceField_r2.focus());
      });
      \u0275\u0275template(14, AddProductFormComponent_ng_template_14_Template, 7, 7, "ng-template", 12);
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(15, "lg-control", 13);
      \u0275\u0275pipe(16, "translate");
      \u0275\u0275elementStart(17, "lg-number-input", 14, 2);
      \u0275\u0275template(19, AddProductFormComponent_ng_template_19_Template, 3, 3, "ng-template", 12);
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(20, "lg-control", 15);
      \u0275\u0275template(21, AddProductFormComponent_ng_template_21_Template, 6, 11, "ng-template", 16);
      \u0275\u0275element(22, "lg-readonly-control", 17);
      \u0275\u0275pipe(23, "number");
      \u0275\u0275elementEnd()()()();
      \u0275\u0275elementStart(24, "lg-flex-row", 18)(25, "lg-control", 7);
      \u0275\u0275pipe(26, "translate");
      \u0275\u0275elementStart(27, "lg-flex-column")(28, "lg-autocomplete", 19, 3);
      \u0275\u0275listener("onSelected", function AddProductFormComponent_Template_lg_autocomplete_onSelected_28_listener() {
        \u0275\u0275restoreView(_r1);
        const sourceChips_r5 = \u0275\u0275reference(32);
        return \u0275\u0275resetView(sourceChips_r5.clearSelected());
      });
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(30, "div", 20);
      \u0275\u0275element(31, "lg-chips-list", 21, 4);
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(33, "lg-control", 7);
      \u0275\u0275pipe(34, "translate");
      \u0275\u0275elementStart(35, "lg-flex-column");
      \u0275\u0275element(36, "lg-multiselect", 22, 5);
      \u0275\u0275conditionalCreate(38, AddProductFormComponent_Conditional_38_Template, 1, 2, "lg-chips-list", 21);
      \u0275\u0275elementEnd()()()()();
    }
    if (rf & 2) {
      let tmp_13_0;
      const sourceInput_r7 = \u0275\u0275reference(29);
      \u0275\u0275property("formGroup", ctx.form);
      \u0275\u0275advance(4);
      \u0275\u0275property("label", \u0275\u0275pipeBind1(5, 20, "product.form.name.placeholder"));
      \u0275\u0275advance(4);
      \u0275\u0275property("center", true)("mobileMode", true);
      \u0275\u0275advance();
      \u0275\u0275property("label", \u0275\u0275pipeBind2(11, 24, "product.form.amount.placeholder", \u0275\u0275pureFunction1(37, _c3, \u0275\u0275pipeBind1(10, 22, "unit.long." + (ctx.form.value.unit || ctx.UnitValue.GRAM)))));
      \u0275\u0275advance(6);
      \u0275\u0275property("label", \u0275\u0275pipeBind2(16, 27, "product.form.price.placeholder", \u0275\u0275pureFunction0(39, _c4)));
      \u0275\u0275advance(7);
      \u0275\u0275property("placeholder", "")("value", \u0275\u0275pipeBind2(23, 30, (tmp_13_0 = ctx.product()) == null ? null : tmp_13_0.pricePerUnit, "1.0-5"));
      \u0275\u0275advance(2);
      \u0275\u0275property("equal", true)("mobileMode", true)("top", true);
      \u0275\u0275advance();
      \u0275\u0275property("label", \u0275\u0275pipeBind1(26, 33, "product.form.source.placeholder"));
      \u0275\u0275advance(3);
      \u0275\u0275property("noLoad", true)("resource", "sources");
      \u0275\u0275advance(2);
      \u0275\u0275property("hidden", !ctx.topSources().length);
      \u0275\u0275advance();
      \u0275\u0275property("control", sourceInput_r7)("items", ctx.topSources());
      \u0275\u0275advance(2);
      \u0275\u0275property("label", \u0275\u0275pipeBind1(34, 35, "product.form.category_id.placeholder"));
      \u0275\u0275advance(3);
      \u0275\u0275property("resource", "product-categories");
      \u0275\u0275advance(2);
      \u0275\u0275conditional(ctx.topCategories().length ? 38 : -1);
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
    CardComponent,
    MatIcon,
    ButtonComponent,
    WidthDirective,
    UnitSwitcherComponent,
    InputComponent,
    ControlExtraTemplateDirective,
    ControlComponent,
    ReadonlyControlComponent,
    ControlLabelTemplateDirective,
    TranslateDirective,
    TranslatePipe,
    CurrencySymbolPipe,
    UnitStringPipe,
    DecimalPipe
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
      ReadonlyControlComponent,
      UnitStringPipe,
      ControlLabelTemplateDirective,
      TranslateDirective,
      DecimalPipe
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
          <lg-control
            [label]="'product.form.amount.placeholder'|translate:{unit:('unit.long.'+(form.value.unit || UnitValue.GRAM)|translate)}"
            lgExpand>
            <lg-number-input #amountField
                             (onInputChange)="priceField.focus()"
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
            <lg-number-input #priceField
                             formControlName="price"
                             lgParseMath
                             placeholder="">
              <ng-template lgExtraTpl place="after">
                <span>{{ userSettings()['currency']|currencySymbol }}</span>
              </ng-template>
            </lg-number-input>
          </lg-control>

          <lg-control lgWidth="40%">
            <ng-template lgControlLabelTemplate>
              <span>{{ userSettings()['currency']|currencySymbol }}</span>
              <span [translateParams]="{unit:product()?.unit | unitString | translate}"
                    [translate]="'per-unit.label'"></span>
            </ng-template>

            <lg-readonly-control [placeholder]="''"
                                 [value]="product()?.pricePerUnit | number:'1.0-5' ">
            </lg-readonly-control>
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
                          [resource]="'product-categories'"
                          appendTo="body"
                          formControlName="category_id"
                          placeholder="">
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
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(AddProductFormComponent, { className: "AddProductFormComponent", filePath: "src/app/features/products/view/add-product/add-product-form.component.ts", lineNumber: 96 });
})();

// src/app/features/products/view/add-product/add-product.component.ts
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
function AddProductComponent_Conditional_7_ng_template_0_Template(rf, ctx) {
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
function AddProductComponent_Conditional_7_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275template(0, AddProductComponent_Conditional_7_ng_template_0_Template, 3, 3, "ng-template", 3);
  }
}
function AddProductComponent_ng_template_8_Conditional_0_Template(rf, ctx) {
  if (rf & 1) {
    const _r2 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "lg-button", 10);
    \u0275\u0275listener("click", function AddProductComponent_ng_template_8_Conditional_0_Template_lg_button_click_0_listener() {
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
function AddProductComponent_ng_template_8_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    const _r3 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "lg-button", 10);
    \u0275\u0275listener("click", function AddProductComponent_ng_template_8_Conditional_1_Template_lg_button_click_0_listener() {
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
function AddProductComponent_ng_template_8_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275conditionalCreate(0, AddProductComponent_ng_template_8_Conditional_0_Template, 3, 6, "lg-button", 9)(1, AddProductComponent_ng_template_8_Conditional_1_Template, 3, 6, "lg-button", 9);
  }
  if (rf & 2) {
    let tmp_1_0;
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275conditional(ctx_r0.isDraftRoute() ? 0 : ((tmp_1_0 = ctx_r0.product()) == null ? null : tmp_1_0.uuid) ? 1 : -1);
  }
}
function AddProductComponent_Conditional_9_Template(rf, ctx) {
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
function AddProductComponent_Conditional_12_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275text(0);
    \u0275\u0275pipe(1, "translate");
  }
  if (rf & 2) {
    \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind1(1, 1, "product.form.save-btn.edit.active"), " ");
  }
}
function AddProductComponent_Conditional_12_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275text(0);
    \u0275\u0275pipe(1, "translate");
  }
  if (rf & 2) {
    \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind1(1, 1, "product.form.save-btn.edit.disabled"), " ");
  }
}
function AddProductComponent_Conditional_12_Template(rf, ctx) {
  if (rf & 1) {
    const _r4 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "lg-button", 11);
    \u0275\u0275listener("click", function AddProductComponent_Conditional_12_Template_lg_button_click_0_listener() {
      \u0275\u0275restoreView(_r4);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.onEditProduct());
    });
    \u0275\u0275conditionalCreate(1, AddProductComponent_Conditional_12_Conditional_1_Template, 2, 3)(2, AddProductComponent_Conditional_12_Conditional_2_Template, 2, 3);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    let tmp_2_0;
    let tmp_3_0;
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275styleMap("primary");
    \u0275\u0275property("disabled", !((tmp_2_0 = ctx_r0.formComponent()) == null ? null : tmp_2_0.form == null ? null : tmp_2_0.form.dirty) && !ctx_r0.draftRef());
    \u0275\u0275advance();
    \u0275\u0275conditional(((tmp_3_0 = ctx_r0.formComponent()) == null ? null : tmp_3_0.form == null ? null : tmp_3_0.form.dirty) || ctx_r0.draftRef() ? 1 : 2);
  }
}
function AddProductComponent_Conditional_13_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275text(0);
    \u0275\u0275pipe(1, "translate");
  }
  if (rf & 2) {
    \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind1(1, 1, "product.form.save-btn.add.active"), " ");
  }
}
function AddProductComponent_Conditional_13_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275text(0);
    \u0275\u0275pipe(1, "translate");
  }
  if (rf & 2) {
    \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind1(1, 1, "product.form.save-btn.add.disabled"), " ");
  }
}
function AddProductComponent_Conditional_13_Template(rf, ctx) {
  if (rf & 1) {
    const _r5 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "lg-button", 11);
    \u0275\u0275listener("click", function AddProductComponent_Conditional_13_Template_lg_button_click_0_listener() {
      \u0275\u0275restoreView(_r5);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.onAddProduct());
    });
    \u0275\u0275conditionalCreate(1, AddProductComponent_Conditional_13_Conditional_1_Template, 2, 3)(2, AddProductComponent_Conditional_13_Conditional_2_Template, 2, 3);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    let tmp_2_0;
    let tmp_3_0;
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275styleMap("primary");
    \u0275\u0275property("disabled", !((tmp_2_0 = ctx_r0.formComponent()) == null ? null : tmp_2_0.form == null ? null : tmp_2_0.form.dirty) && !ctx_r0.draftRef());
    \u0275\u0275advance();
    \u0275\u0275conditional(((tmp_3_0 = ctx_r0.formComponent()) == null ? null : tmp_3_0.form == null ? null : tmp_3_0.form.dirty) || ctx_r0.draftRef() ? 1 : 2);
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
  draftOrProductUUID = signal(void 0, ...ngDevMode ? [{ debugName: "draftOrProductUUID" }] : []);
  product = signal(null, ...ngDevMode ? [{ debugName: "product" }] : []);
  formComponent = viewChild(AddProductFormComponent, ...ngDevMode ? [{ debugName: "formComponent" }] : []);
  draftRef = signal(null, ...ngDevMode ? [{ debugName: "draftRef" }] : []);
  draftByExistingProduct = computed(() => {
    return this.draftRef().meta?.["uuid"];
  }, ...ngDevMode ? [{ debugName: "draftByExistingProduct" }] : []);
  isDraftRoute = signal(false, ...ngDevMode ? [{ debugName: "isDraftRoute" }] : []);
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
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _AddProductComponent, selectors: [["lg-add-product"]], viewQuery: function AddProductComponent_Query(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275viewQuerySignal(ctx.formComponent, AddProductFormComponent, 5);
    }
    if (rf & 2) {
      \u0275\u0275queryAdvance();
    }
  }, features: [\u0275\u0275ProvidersFeature([
    CurrencyPipe
  ])], decls: 14, vars: 9, consts: [["size", "medium"], [3, "center", "mobileMode"], ["lgSelfStart", ""], ["lgInlineSeparatedGroup", ""], [1, "text-muted", "text-cursive"], [3, "product"], [3, "mobileMode", "relaxed"], ["lgShrink", "", 3, "disabled", "style"], ["lgShrink", "", 3, "style", "disabled"], ["lgShrink", "", 3, "style", "flat"], ["lgShrink", "", 3, "click", "flat"], ["lgShrink", "", 3, "click", "disabled"]], template: function AddProductComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "lg-fade-in")(1, "lg-container")(2, "lg-flex-column", 0)(3, "lg-flex-row", 1);
      \u0275\u0275conditionalCreate(4, AddProductComponent_Conditional_4_Template, 2, 1, "lg-title", 2)(5, AddProductComponent_Conditional_5_Template, 3, 3, "lg-title", 2);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(6, "lg-inline-separated-group");
      \u0275\u0275conditionalCreate(7, AddProductComponent_Conditional_7_Template, 1, 0, null, 3);
      \u0275\u0275template(8, AddProductComponent_ng_template_8_Template, 2, 1, "ng-template", 3);
      \u0275\u0275elementEnd();
      \u0275\u0275conditionalCreate(9, AddProductComponent_Conditional_9_Template, 4, 6, "small", 4);
      \u0275\u0275elementEnd();
      \u0275\u0275element(10, "lg-add-product-form", 5);
      \u0275\u0275elementStart(11, "lg-flex-row", 6);
      \u0275\u0275conditionalCreate(12, AddProductComponent_Conditional_12_Template, 3, 4, "lg-button", 7)(13, AddProductComponent_Conditional_13_Template, 3, 4, "lg-button", 8);
      \u0275\u0275elementEnd()()();
    }
    if (rf & 2) {
      let tmp_2_0;
      let tmp_3_0;
      let tmp_4_0;
      \u0275\u0275advance(3);
      \u0275\u0275property("center", true)("mobileMode", true);
      \u0275\u0275advance();
      \u0275\u0275conditional(((tmp_2_0 = ctx.product()) == null ? null : tmp_2_0.uuid) && !ctx.draftRef() || ctx.draftRef() && ctx.draftByExistingProduct() ? 4 : 5);
      \u0275\u0275advance(3);
      \u0275\u0275conditional(ctx.draftRef() && ((tmp_3_0 = ctx.formComponent()) == null ? null : tmp_3_0.form == null ? null : tmp_3_0.form.dirty) ? 7 : -1);
      \u0275\u0275advance(2);
      \u0275\u0275conditional(((tmp_4_0 = ctx.product()) == null ? null : tmp_4_0.updatedAt) ? 9 : -1);
      \u0275\u0275advance();
      \u0275\u0275property("product", ctx.product());
      \u0275\u0275advance();
      \u0275\u0275property("mobileMode", true)("relaxed", true);
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.product() && !ctx.draftRef() || ctx.draftRef() && ctx.draftByExistingProduct() ? 12 : 13);
    }
  }, dependencies: [
    ContainerComponent,
    TitleComponent,
    AddProductFormComponent,
    FlexRowComponent,
    FadeInComponent,
    ButtonComponent,
    ShrinkDirective,
    FlexColumnComponent,
    InlineSeparatedGroupComponent,
    InlineSeparatedGroupDirective,
    SelfStartDirective,
    TimeAgoPipe,
    TranslatePipe
  ], encapsulation: 2 });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(AddProductComponent, [{
    type: Component,
    args: [{ selector: "lg-add-product", standalone: true, imports: [
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
      InlineSeparatedGroupComponent,
      InlineSeparatedGroupDirective,
      SelfStartDirective
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
                       [style]="'primary'"
                       (click)="onEditProduct()">
              @if (formComponent()?.form?.dirty || draftRef()) {
                {{ 'product.form.save-btn.edit.active'|translate }}
              } @else {
                {{ 'product.form.save-btn.edit.disabled'|translate }}
              }
            </lg-button>
          } @else {
            <lg-button lgShrink
                       [style]="'primary'"
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
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(AddProductComponent, { className: "AddProductComponent", filePath: "src/app/features/products/view/add-product/add-product.component.ts", lineNumber: 136 });
})();
export {
  AddProductComponent
};
//# sourceMappingURL=chunk-AZYMJRIE.js.map
