import {
  injectQueryParams
} from "./chunk-RTCNHMN6.js";
import {
  Router
} from "./chunk-SHM3W5T3.js";
import {
  FlexColumnComponent
} from "./chunk-L3Q75KKL.js";
import {
  NgTemplateOutlet
} from "./chunk-7I2CR6I6.js";
import {
  Component,
  Directive,
  Input,
  TemplateRef,
  ViewEncapsulation,
  contentChildren,
  effect,
  inject,
  input,
  setClassMetadata,
  signal,
  ɵsetClassDebugInfo,
  ɵɵadvance,
  ɵɵattribute,
  ɵɵclassProp,
  ɵɵconditional,
  ɵɵconditionalCreate,
  ɵɵcontentQuerySignal,
  ɵɵdefineComponent,
  ɵɵdefineDirective,
  ɵɵdirectiveInject,
  ɵɵelementContainer,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵgetCurrentView,
  ɵɵlistener,
  ɵɵnextContext,
  ɵɵproperty,
  ɵɵqueryAdvance,
  ɵɵrepeater,
  ɵɵrepeaterCreate,
  ɵɵresetView,
  ɵɵrestoreView,
  ɵɵtemplate,
  ɵɵtext,
  ɵɵtextInterpolate1
} from "./chunk-RQATVJ2P.js";

// src/app/shared/view/ui/tabs/tab.directive.ts
var TabDirective = class _TabDirective {
  templateRef;
  constructor(templateRef) {
    this.templateRef = templateRef;
  }
  label;
  alias;
  display = true;
  static \u0275fac = function TabDirective_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _TabDirective)(\u0275\u0275directiveInject(TemplateRef));
  };
  static \u0275dir = /* @__PURE__ */ \u0275\u0275defineDirective({ type: _TabDirective, selectors: [["ng-template", "lgTab", ""]], inputs: { label: "label", alias: "alias", display: "display" } });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(TabDirective, [{
    type: Directive,
    args: [{
      selector: "ng-template[lgTab]"
    }]
  }], () => [{ type: TemplateRef }], { label: [{
    type: Input,
    args: [{ required: true }]
  }], alias: [{
    type: Input,
    args: [{ required: true }]
  }], display: [{
    type: Input,
    args: [{ required: false }]
  }] });
})();

// src/app/shared/view/ui/tabs/tabs.component.ts
var _forTrack0 = ($index, $item) => $item.label;
function TabsComponent_For_3_Conditional_0_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 4);
    \u0275\u0275listener("click", function TabsComponent_For_3_Conditional_0_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r1);
      const \u0275$index_5_r2 = \u0275\u0275nextContext().$index;
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.selectTab(\u0275$index_5_r2));
    });
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r3 = \u0275\u0275nextContext();
    const tab_r5 = ctx_r3.$implicit;
    const \u0275$index_5_r2 = ctx_r3.$index;
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275classProp("active", ctx_r2.activated()[\u0275$index_5_r2]);
    \u0275\u0275attribute("aria-selected", ctx_r2.activated()[\u0275$index_5_r2])("aria-controls", "tab-" + \u0275$index_5_r2)("id", "tab-" + \u0275$index_5_r2);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", tab_r5.label, " ");
  }
}
function TabsComponent_For_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275conditionalCreate(0, TabsComponent_For_3_Conditional_0_Template, 2, 6, "button", 3);
  }
  if (rf & 2) {
    const tab_r5 = ctx.$implicit;
    \u0275\u0275conditional(tab_r5.display ? 0 : -1);
  }
}
function TabsComponent_Conditional_5_Conditional_0_ng_container_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementContainer(0);
  }
}
function TabsComponent_Conditional_5_Conditional_0_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "lg-flex-column", 5);
    \u0275\u0275template(1, TabsComponent_Conditional_5_Conditional_0_ng_container_1_Template, 1, 0, "ng-container", 6);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext(2);
    \u0275\u0275property("size", "small");
    \u0275\u0275advance();
    \u0275\u0275property("ngTemplateOutlet", ctx_r2.tabs()[ctx_r2.selectedIndex()].templateRef);
  }
}
function TabsComponent_Conditional_5_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275conditionalCreate(0, TabsComponent_Conditional_5_Conditional_0_Template, 2, 2, "lg-flex-column", 5);
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275conditional(ctx_r2.activated()[ctx_r2.selectedIndex()] ? 0 : -1);
  }
}
var TabsComponent = class _TabsComponent {
  tabTemplates = contentChildren(TabDirective, ...ngDevMode ? [{ debugName: "tabTemplates" }] : []);
  router = inject(Router);
  tabs = signal([], ...ngDevMode ? [{ debugName: "tabs" }] : []);
  flat = input(false, ...ngDevMode ? [{ debugName: "flat" }] : []);
  silent = input(false, ...ngDevMode ? [{ debugName: "silent" }] : []);
  scrollable = input(true, ...ngDevMode ? [{ debugName: "scrollable" }] : []);
  activated = signal([], ...ngDevMode ? [{ debugName: "activated" }] : []);
  selectedIndex = signal(0, ...ngDevMode ? [{ debugName: "selectedIndex" }] : []);
  tabQuery = injectQueryParams("tab");
  tabQueryEffect = effect(() => {
    const tab = this.tabQuery();
    if (tab) {
      const index = this.tabs().findIndex((t) => t.alias?.toLowerCase()?.includes(tab.toString().toLowerCase() ?? ""));
      if (index !== -1) {
        this.selectTab(index);
      }
    }
  }, ...ngDevMode ? [{ debugName: "tabQueryEffect" }] : []);
  tabsEffect = effect(() => {
    const allTabs = this.tabTemplates();
    this.tabs.set(allTabs);
    this.activated.set(allTabs.map((_, i) => i === this.selectedIndex()));
  }, ...ngDevMode ? [{ debugName: "tabsEffect" }] : []);
  selectTab(index) {
    this.selectedIndex.set(index);
    this.activated.update((old) => {
      return old.map((_, i) => i === index);
    });
    if (this.silent()) {
      return;
    }
    this.router.navigate([], {
      queryParams: { tab: this.tabs()[index].alias },
      queryParamsHandling: "merge"
    });
  }
  static \u0275fac = function TabsComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _TabsComponent)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _TabsComponent, selectors: [["lg-tabs"]], contentQueries: function TabsComponent_ContentQueries(rf, ctx, dirIndex) {
    if (rf & 1) {
      \u0275\u0275contentQuerySignal(dirIndex, ctx.tabTemplates, TabDirective, 4);
    }
    if (rf & 2) {
      \u0275\u0275queryAdvance();
    }
  }, inputs: { flat: [1, "flat"], silent: [1, "silent"], scrollable: [1, "scrollable"] }, decls: 6, vars: 7, consts: [[1, "tabs"], [1, "tabs__labels"], [1, "tabs__body"], [3, "active"], [3, "click"], [3, "size"], [4, "ngTemplateOutlet"]], template: function TabsComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "div", 0)(1, "div", 1);
      \u0275\u0275repeaterCreate(2, TabsComponent_For_3_Template, 1, 1, null, null, _forTrack0);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(4, "div", 2);
      \u0275\u0275conditionalCreate(5, TabsComponent_Conditional_5_Template, 1, 1);
      \u0275\u0275elementEnd()();
    }
    if (rf & 2) {
      \u0275\u0275classProp("flat", ctx.flat())("scrollable", ctx.scrollable());
      \u0275\u0275attribute("aria-label", "Tabs")("role", "tablist");
      \u0275\u0275advance(2);
      \u0275\u0275repeater(ctx.tabs());
      \u0275\u0275advance(3);
      \u0275\u0275conditional(ctx.tabs().length > 0 ? 5 : -1);
    }
  }, dependencies: [
    NgTemplateOutlet,
    FlexColumnComponent
  ], styles: ["/* angular:styles/component:scss;ceab4533df25c8c619ca7b477012fdfd748d5b9b4b1377c62d691ef24fab66f3;/Users/khripunovpavel/Documents/my/lasagna/lasagna/src/app/shared/view/ui/tabs/tabs.component.ts */\n.tabs {\n  display: flex;\n  flex-direction: column;\n}\n.tabs.flat {\n  gap: 12px;\n  margin: -2px;\n}\n.tabs.scrollable .tabs__labels {\n  overflow-x: auto;\n  white-space: nowrap;\n  scroll-behavior: smooth;\n  scroll-snap-type: x mandatory;\n  overscroll-behavior-x: contain;\n  -webkit-overflow-scrolling: touch;\n}\n.tabs.flat .tabs__labels {\n  border-radius: 0;\n  border-bottom: 1px solid #f5f5f5;\n  padding: 2px 2px 12px;\n  background-color: transparent;\n}\n.tabs__labels {\n  display: flex;\n  gap: 8px;\n  padding: 16px;\n  background-color: var(--tabs-labels-bg);\n  border-radius: 32px 32px 0 0;\n  border-bottom: 1px solid #ececec;\n}\n.tabs__labels button {\n  background: var(--tabs-label-bg);\n  color: var(--tabs-label-color);\n  border: 1px solid transparent;\n  border-radius: 16px;\n  padding: 12px;\n  cursor: pointer;\n  font-size: 14px;\n  transition: background-color 0.3s ease;\n  font-family: inherit;\n  text-decoration: none;\n  position: relative;\n  z-index: 1;\n}\n.tabs__labels button:hover {\n  background-color: var(--tabs-label-hover-bg);\n}\n.tabs__labels button:focus {\n  outline: 2px solid var(--tabs-label-focus);\n}\n.tabs__labels button.active {\n  background-color: var(--tabs-label-active-bg);\n  color: var(--tabs-label-active-text);\n}\n.tabs.flat .tabs__labels button {\n  padding: 8px 12px;\n  border-radius: 6px;\n}\n.tabs.flat .tabs__labels button:not(.active) {\n  background-color: transparent;\n  color: var(--tabs-label-flat-text);\n}\n.tabs.flat .tabs__labels button:not(.active):hover {\n  background-color: var(--tabs-label-flat-active-hover-bg);\n}\n.tabs.flat .tabs__labels button.active {\n  background-color: var(--tabs-label-flat-active-bg);\n  color: var(--tabs-label-flat-text);\n}\n.tabs__body {\n  display: flex;\n  flex-direction: column;\n  padding: 16px;\n  background-color: var(--tabs-body-bg);\n  border-radius: 0 0 32px 32px;\n}\n.tabs__body > * {\n  flex: 1;\n}\n.tabs.flat .tabs__body {\n  border-radius: 0;\n  background-color: transparent;\n  padding: 0;\n}\n/*# sourceMappingURL=tabs.component.css.map */\n"], encapsulation: 2 });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(TabsComponent, [{
    type: Component,
    args: [{ selector: "lg-tabs", standalone: true, imports: [
      NgTemplateOutlet,
      FlexColumnComponent
    ], template: `
    <div [attr.aria-label]="'Tabs'"
         [attr.role]="'tablist'"
         [class.flat]="flat()"
         [class.scrollable]="scrollable()"
         class="tabs">
      <div class="tabs__labels">
        @for (tab of tabs(); track tab.label; let i = $index) {
          @if (tab.display) {
            <button (click)="selectTab(i)"
                    [class.active]="activated()[i]"
                    [attr.aria-selected]="activated()[i]"
                    [attr.aria-controls]="'tab-' + i"
                    [attr.id]="'tab-' + i">
              {{ tab.label }}
            </button>
          }
        }
      </div>

      <div class="tabs__body">
        @if (tabs().length > 0) {
          @if (activated()[selectedIndex()]) {
            <lg-flex-column [size]="'small'">
              <ng-container *ngTemplateOutlet="tabs()[selectedIndex()].templateRef">
              </ng-container>
            </lg-flex-column>
          }
        }
      </div>
    </div>
  `, encapsulation: ViewEncapsulation.None, styles: ["/* angular:styles/component:scss;ceab4533df25c8c619ca7b477012fdfd748d5b9b4b1377c62d691ef24fab66f3;/Users/khripunovpavel/Documents/my/lasagna/lasagna/src/app/shared/view/ui/tabs/tabs.component.ts */\n.tabs {\n  display: flex;\n  flex-direction: column;\n}\n.tabs.flat {\n  gap: 12px;\n  margin: -2px;\n}\n.tabs.scrollable .tabs__labels {\n  overflow-x: auto;\n  white-space: nowrap;\n  scroll-behavior: smooth;\n  scroll-snap-type: x mandatory;\n  overscroll-behavior-x: contain;\n  -webkit-overflow-scrolling: touch;\n}\n.tabs.flat .tabs__labels {\n  border-radius: 0;\n  border-bottom: 1px solid #f5f5f5;\n  padding: 2px 2px 12px;\n  background-color: transparent;\n}\n.tabs__labels {\n  display: flex;\n  gap: 8px;\n  padding: 16px;\n  background-color: var(--tabs-labels-bg);\n  border-radius: 32px 32px 0 0;\n  border-bottom: 1px solid #ececec;\n}\n.tabs__labels button {\n  background: var(--tabs-label-bg);\n  color: var(--tabs-label-color);\n  border: 1px solid transparent;\n  border-radius: 16px;\n  padding: 12px;\n  cursor: pointer;\n  font-size: 14px;\n  transition: background-color 0.3s ease;\n  font-family: inherit;\n  text-decoration: none;\n  position: relative;\n  z-index: 1;\n}\n.tabs__labels button:hover {\n  background-color: var(--tabs-label-hover-bg);\n}\n.tabs__labels button:focus {\n  outline: 2px solid var(--tabs-label-focus);\n}\n.tabs__labels button.active {\n  background-color: var(--tabs-label-active-bg);\n  color: var(--tabs-label-active-text);\n}\n.tabs.flat .tabs__labels button {\n  padding: 8px 12px;\n  border-radius: 6px;\n}\n.tabs.flat .tabs__labels button:not(.active) {\n  background-color: transparent;\n  color: var(--tabs-label-flat-text);\n}\n.tabs.flat .tabs__labels button:not(.active):hover {\n  background-color: var(--tabs-label-flat-active-hover-bg);\n}\n.tabs.flat .tabs__labels button.active {\n  background-color: var(--tabs-label-flat-active-bg);\n  color: var(--tabs-label-flat-text);\n}\n.tabs__body {\n  display: flex;\n  flex-direction: column;\n  padding: 16px;\n  background-color: var(--tabs-body-bg);\n  border-radius: 0 0 32px 32px;\n}\n.tabs__body > * {\n  flex: 1;\n}\n.tabs.flat .tabs__body {\n  border-radius: 0;\n  background-color: transparent;\n  padding: 0;\n}\n/*# sourceMappingURL=tabs.component.css.map */\n"] }]
  }], null, null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(TabsComponent, { className: "TabsComponent", filePath: "src/app/shared/view/ui/tabs/tabs.component.ts", lineNumber: 152 });
})();

export {
  TabDirective,
  TabsComponent
};
//# sourceMappingURL=chunk-WSSSM74D.js.map
