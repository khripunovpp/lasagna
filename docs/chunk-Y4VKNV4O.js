import {
  FlexColumnComponent
} from "./chunk-54ALPN33.js";
import {
  injectQueryParams
} from "./chunk-RPP3IG6S.js";
import {
  Router
} from "./chunk-GF4GEWLC.js";
import {
  NgTemplateOutlet
} from "./chunk-U34SFCSO.js";
import {
  Component,
  ContentChildren,
  Directive,
  Input,
  TemplateRef,
  ViewEncapsulation,
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
  ɵɵcontentQuery,
  ɵɵdefineComponent,
  ɵɵdefineDirective,
  ɵɵdirectiveInject,
  ɵɵelementContainer,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵgetCurrentView,
  ɵɵlistener,
  ɵɵloadQuery,
  ɵɵnextContext,
  ɵɵproperty,
  ɵɵqueryRefresh,
  ɵɵrepeater,
  ɵɵrepeaterCreate,
  ɵɵresetView,
  ɵɵrestoreView,
  ɵɵtemplate,
  ɵɵtext,
  ɵɵtextInterpolate1
} from "./chunk-KM6KLH7M.js";

// src/app/shared/view/ui/tabs/tab.directive.ts
var TabDirective = class _TabDirective {
  templateRef;
  constructor(templateRef) {
    this.templateRef = templateRef;
  }
  label;
  alias;
  static \u0275fac = function TabDirective_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _TabDirective)(\u0275\u0275directiveInject(TemplateRef));
  };
  static \u0275dir = /* @__PURE__ */ \u0275\u0275defineDirective({ type: _TabDirective, selectors: [["ng-template", "lgTab", ""]], inputs: { label: "label", alias: "alias" } });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(TabDirective, [{
    type: Directive,
    args: [{
      selector: "ng-template[lgTab]",
      standalone: true
    }]
  }], () => [{ type: TemplateRef }], { label: [{
    type: Input,
    args: [{ required: true }]
  }], alias: [{
    type: Input,
    args: [{ required: true }]
  }] });
})();

// src/app/shared/view/ui/tabs/tabs.component.ts
var _forTrack0 = ($index, $item) => $item.label;
function TabsComponent_For_3_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 4);
    \u0275\u0275listener("click", function TabsComponent_For_3_Template_button_click_0_listener() {
      const \u0275$index_5_r2 = \u0275\u0275restoreView(_r1).$index;
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.selectTab(\u0275$index_5_r2));
    });
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const tab_r4 = ctx.$implicit;
    const \u0275$index_5_r2 = ctx.$index;
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275classProp("active", ctx_r2.activated()[\u0275$index_5_r2]);
    \u0275\u0275attribute("aria-selected", ctx_r2.activated()[\u0275$index_5_r2])("aria-controls", "tab-" + \u0275$index_5_r2)("id", "tab-" + \u0275$index_5_r2);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", tab_r4.label, " ");
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
  tabTemplates;
  router = inject(Router);
  tabs = signal([]);
  flat = input(false);
  silent = input(false);
  activated = signal([]);
  selectedIndex = signal(0);
  tabQuery = injectQueryParams("tab");
  tabQueryEffect = effect(() => {
    const tab = this.tabQuery();
    if (tab) {
      const index = this.tabs().findIndex((t) => t.alias?.toLowerCase()?.includes(tab.toString().toLowerCase() ?? ""));
      if (index !== -1) {
        this.selectTab(index);
      }
    }
  });
  ngAfterContentInit() {
    const allTabs = this.tabTemplates.toArray();
    this.tabs.set(allTabs);
    this.activated.set(allTabs.map((_, i) => i === 0));
  }
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
      \u0275\u0275contentQuery(dirIndex, TabDirective, 4);
    }
    if (rf & 2) {
      let _t;
      \u0275\u0275queryRefresh(_t = \u0275\u0275loadQuery()) && (ctx.tabTemplates = _t);
    }
  }, inputs: { flat: [1, "flat"], silent: [1, "silent"] }, decls: 6, vars: 5, consts: [[1, "tabs"], [1, "tabs__labels"], [3, "active"], [1, "tabs__body"], [3, "click"], [3, "size"], [4, "ngTemplateOutlet"]], template: function TabsComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "div", 0)(1, "div", 1);
      \u0275\u0275repeaterCreate(2, TabsComponent_For_3_Template, 2, 6, "button", 2, _forTrack0);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(4, "div", 3);
      \u0275\u0275conditionalCreate(5, TabsComponent_Conditional_5_Template, 1, 1);
      \u0275\u0275elementEnd()();
    }
    if (rf & 2) {
      \u0275\u0275classProp("flat", ctx.flat());
      \u0275\u0275attribute("aria-label", "Tabs")("role", "tablist");
      \u0275\u0275advance(2);
      \u0275\u0275repeater(ctx.tabs());
      \u0275\u0275advance(3);
      \u0275\u0275conditional(ctx.tabs().length > 0 ? 5 : -1);
    }
  }, dependencies: [
    NgTemplateOutlet,
    FlexColumnComponent
  ], styles: ["/* angular:styles/component:scss;f3c8f5865dd6cd7a4cb12de8399c371dbadfd2bbb1c197d1537bf112d19fdc5c;/Users/khripunovpavel/Documents/my/lasagna/lasagna/src/app/shared/view/ui/tabs/tabs.component.ts */\n.tabs {\n  display: flex;\n  flex-direction: column;\n}\n.tabs.flat {\n  gap: 12px;\n}\n.tabs.flat .tabs__labels {\n  border-radius: 0;\n  border-bottom: none;\n  padding: 0;\n  background-color: transparent;\n}\n.tabs.flat .tabs__body {\n  border-radius: 0;\n  background-color: transparent;\n  padding: 0;\n}\n.tabs.flat .tabs__labels button:not(.active) {\n  background-color: #efefef;\n}\n.tabs__labels {\n  display: flex;\n  gap: 8px;\n  padding: 16px;\n  background-color: var(--tabs-labels-bg);\n  border-bottom: 2px solid var(--tabs-labels-border);\n  overflow-x: auto;\n  white-space: nowrap;\n  scroll-behavior: smooth;\n  scroll-snap-type: x mandatory;\n  overscroll-behavior-x: contain;\n  -webkit-overflow-scrolling: touch;\n  border-radius: 12px 12px 0 0;\n}\n.tabs__labels button {\n  background: var(--tabs-label-bg);\n  border: none;\n  border-radius: 12px;\n  padding: 0.5rem 1rem;\n  cursor: pointer;\n  font-size: 1rem;\n  transition: background-color 0.3s ease;\n  font-family: inherit;\n  text-decoration: none;\n  position: relative;\n  z-index: 1;\n}\n.tabs__labels button:hover {\n  background-color: var(--tabs-label-hover-bg);\n}\n.tabs__labels button:focus {\n  outline: 2px solid var(--tabs-label-focus);\n}\n.tabs__labels button.active {\n  background-color: var(--accent-color);\n  color: var(--tabs-label-active-text);\n}\n.tabs__body {\n  display: flex;\n  flex-direction: column;\n  gap: 12px;\n  padding: 24px 16px;\n  background-color: var(--tabs-body-bg);\n  border-radius: 0 0 12px 12px;\n}\n.tabs__body > * {\n  flex: 1;\n}\n/*# sourceMappingURL=tabs.component.css.map */\n"], encapsulation: 2 });
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
           class="tabs">
          <div class="tabs__labels">
              @for (tab of tabs();track tab.label;let i = $index) {
                  <button (click)="selectTab(i)"
                          [class.active]="activated()[i]"
                          [attr.aria-selected]="activated()[i]"
                          [attr.aria-controls]="'tab-' + i"
                          [attr.id]="'tab-' + i">
                      {{ tab.label }}
                  </button>
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
  `, encapsulation: ViewEncapsulation.None, styles: ["/* angular:styles/component:scss;f3c8f5865dd6cd7a4cb12de8399c371dbadfd2bbb1c197d1537bf112d19fdc5c;/Users/khripunovpavel/Documents/my/lasagna/lasagna/src/app/shared/view/ui/tabs/tabs.component.ts */\n.tabs {\n  display: flex;\n  flex-direction: column;\n}\n.tabs.flat {\n  gap: 12px;\n}\n.tabs.flat .tabs__labels {\n  border-radius: 0;\n  border-bottom: none;\n  padding: 0;\n  background-color: transparent;\n}\n.tabs.flat .tabs__body {\n  border-radius: 0;\n  background-color: transparent;\n  padding: 0;\n}\n.tabs.flat .tabs__labels button:not(.active) {\n  background-color: #efefef;\n}\n.tabs__labels {\n  display: flex;\n  gap: 8px;\n  padding: 16px;\n  background-color: var(--tabs-labels-bg);\n  border-bottom: 2px solid var(--tabs-labels-border);\n  overflow-x: auto;\n  white-space: nowrap;\n  scroll-behavior: smooth;\n  scroll-snap-type: x mandatory;\n  overscroll-behavior-x: contain;\n  -webkit-overflow-scrolling: touch;\n  border-radius: 12px 12px 0 0;\n}\n.tabs__labels button {\n  background: var(--tabs-label-bg);\n  border: none;\n  border-radius: 12px;\n  padding: 0.5rem 1rem;\n  cursor: pointer;\n  font-size: 1rem;\n  transition: background-color 0.3s ease;\n  font-family: inherit;\n  text-decoration: none;\n  position: relative;\n  z-index: 1;\n}\n.tabs__labels button:hover {\n  background-color: var(--tabs-label-hover-bg);\n}\n.tabs__labels button:focus {\n  outline: 2px solid var(--tabs-label-focus);\n}\n.tabs__labels button.active {\n  background-color: var(--accent-color);\n  color: var(--tabs-label-active-text);\n}\n.tabs__body {\n  display: flex;\n  flex-direction: column;\n  gap: 12px;\n  padding: 24px 16px;\n  background-color: var(--tabs-body-bg);\n  border-radius: 0 0 12px 12px;\n}\n.tabs__body > * {\n  flex: 1;\n}\n/*# sourceMappingURL=tabs.component.css.map */\n"] }]
  }], null, { tabTemplates: [{
    type: ContentChildren,
    args: [TabDirective]
  }] });
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(TabsComponent, { className: "TabsComponent", filePath: "src/app/shared/view/ui/tabs/tabs.component.ts", lineNumber: 138 });
})();

export {
  TabDirective,
  TabsComponent
};
//# sourceMappingURL=chunk-Y4VKNV4O.js.map
