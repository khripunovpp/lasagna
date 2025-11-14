import {
  DropdownComponent
} from "./chunk-Z3LTI72N.js";
import {
  MatIcon
} from "./chunk-MKQIBRI6.js";
import {
  DocsService
} from "./chunk-ETIKHZBE.js";
import "./chunk-IGVRSL6U.js";
import "./chunk-7REZCGNQ.js";
import "./chunk-5WJUMO7X.js";
import {
  ButtonComponent
} from "./chunk-IHCVSUQN.js";
import {
  TranslatePipe
} from "./chunk-KKROIGFS.js";
import {
  NavigationEnd,
  Router,
  RouterLink
} from "./chunk-UUUEGOMT.js";
import "./chunk-CE7BC4LB.js";
import {
  AsyncPipe,
  NgTemplateOutlet
} from "./chunk-KBRICXTE.js";
import {
  Component,
  ElementRef,
  Renderer2,
  combineLatestWith,
  defer,
  filter,
  of,
  setClassMetadata,
  signal,
  startWith,
  switchMap,
  viewChild,
  ɵsetClassDebugInfo,
  ɵɵadvance,
  ɵɵconditional,
  ɵɵconditionalCreate,
  ɵɵdefineComponent,
  ɵɵdirectiveInject,
  ɵɵelement,
  ɵɵelementContainer,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵgetCurrentView,
  ɵɵlistener,
  ɵɵnextContext,
  ɵɵpipe,
  ɵɵpipeBind1,
  ɵɵproperty,
  ɵɵpureFunction1,
  ɵɵpureFunction2,
  ɵɵqueryAdvance,
  ɵɵreference,
  ɵɵrepeater,
  ɵɵrepeaterCreate,
  ɵɵrepeaterTrackByIdentity,
  ɵɵresetView,
  ɵɵrestoreView,
  ɵɵstyleMap,
  ɵɵstyleProp,
  ɵɵtemplate,
  ɵɵtemplateRefExtractor,
  ɵɵtext,
  ɵɵtextInterpolate1,
  ɵɵviewQuerySignal
} from "./chunk-Z5TNFCCP.js";
import "./chunk-PZQLIUCM.js";
import "./chunk-46DXP6YY.js";

// src/app/features/documentation/view/docs-three.component.ts
var _c0 = (a0) => ({ $implicit: a0, level: 0 });
var _c1 = (a0, a1) => ({ $implicit: a0, level: a1 });
function DocsThreeComponent_Conditional_0_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "div");
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275styleProp("height", ctx_r0.placeholderHeight(), "px");
  }
}
function DocsThreeComponent_For_6_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementContainer(0, 5);
  }
  if (rf & 2) {
    const item_r2 = ctx.$implicit;
    \u0275\u0275nextContext();
    const itemTpl_r3 = \u0275\u0275reference(9);
    \u0275\u0275property("ngTemplateOutlet", itemTpl_r3)("ngTemplateOutletContext", \u0275\u0275pureFunction1(2, _c0, item_r2));
  }
}
function DocsThreeComponent_ng_template_8_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 7);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const item_r5 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", item_r5._expanded ? "\u25BC" : "\u25B6", " ");
  }
}
function DocsThreeComponent_ng_template_8_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "div", 8);
  }
}
function DocsThreeComponent_ng_template_8_Conditional_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "a", 9);
    \u0275\u0275text(1);
    \u0275\u0275pipe(2, "translate");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const item_r5 = \u0275\u0275nextContext().$implicit;
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275property("routerLink", ctx_r0.getPath(item_r5.path));
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind1(2, 2, ctx_r0.nameToTitleMap[item_r5.name] ?? item_r5.title ?? item_r5.name), " ");
  }
}
function DocsThreeComponent_ng_template_8_Conditional_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 10);
    \u0275\u0275text(1);
    \u0275\u0275pipe(2, "translate");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const item_r5 = \u0275\u0275nextContext().$implicit;
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind1(2, 1, ctx_r0.nameToTitleMap[item_r5.name] ?? item_r5.title ?? item_r5.name), " ");
  }
}
function DocsThreeComponent_ng_template_8_Conditional_5_For_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementContainer(0, 5);
  }
  if (rf & 2) {
    const child_r6 = ctx.$implicit;
    const level_r7 = \u0275\u0275nextContext(2).level;
    \u0275\u0275nextContext();
    const itemTpl_r3 = \u0275\u0275reference(9);
    \u0275\u0275property("ngTemplateOutlet", itemTpl_r3)("ngTemplateOutletContext", \u0275\u0275pureFunction2(2, _c1, child_r6, level_r7 + 1));
  }
}
function DocsThreeComponent_ng_template_8_Conditional_5_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275repeaterCreate(0, DocsThreeComponent_ng_template_8_Conditional_5_For_1_Template, 1, 5, "ng-container", 5, \u0275\u0275repeaterTrackByIdentity);
  }
  if (rf & 2) {
    const item_r5 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275repeater(item_r5.children);
  }
}
function DocsThreeComponent_ng_template_8_Template(rf, ctx) {
  if (rf & 1) {
    const _r4 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 6);
    \u0275\u0275listener("click", function DocsThreeComponent_ng_template_8_Template_div_click_0_listener() {
      const item_r5 = \u0275\u0275restoreView(_r4).$implicit;
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.toggle(item_r5));
    });
    \u0275\u0275conditionalCreate(1, DocsThreeComponent_ng_template_8_Conditional_1_Template, 2, 1, "div", 7)(2, DocsThreeComponent_ng_template_8_Conditional_2_Template, 1, 0, "div", 8);
    \u0275\u0275conditionalCreate(3, DocsThreeComponent_ng_template_8_Conditional_3_Template, 3, 4, "a", 9)(4, DocsThreeComponent_ng_template_8_Conditional_4_Template, 3, 3, "div", 10);
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(5, DocsThreeComponent_ng_template_8_Conditional_5_Template, 2, 0);
  }
  if (rf & 2) {
    const item_r5 = ctx.$implicit;
    const level_r7 = ctx.level;
    \u0275\u0275styleProp("padding-left", level_r7 * 16, "px");
    \u0275\u0275advance();
    \u0275\u0275conditional(item_r5.type === "folder" ? 1 : 2);
    \u0275\u0275advance(2);
    \u0275\u0275conditional(item_r5.path ? 3 : 4);
    \u0275\u0275advance(2);
    \u0275\u0275conditional(item_r5.children && item_r5._expanded ? 5 : -1);
  }
}
var DocsThreeComponent = class _DocsThreeComponent {
  docsService;
  _router;
  _renderer2;
  constructor(docsService, _router, _renderer2) {
    this.docsService = docsService;
    this._router = _router;
    this._renderer2 = _renderer2;
  }
  dropdownComponent = viewChild(DropdownComponent, ...ngDevMode ? [{ debugName: "dropdownComponent" }] : []);
  dropdownElementRef = viewChild(DropdownComponent, ...ngDevMode ? [{ debugName: "dropdownElementRef", read: ElementRef }] : [{ read: ElementRef }]);
  nameToTitleMap = {
    "getting-started": "docs.getting-started",
    "invoices": "docs.invoices",
    "settings": "docs.settings",
    "recipes": "docs.recipes",
    "storage": "docs.storage"
  };
  onNavigationEnd = defer(() => this._router.events.pipe(
    filter((event) => event instanceof NavigationEnd),
    startWith(null)
    // Ensure initial value
  ));
  tree = defer(() => this.docsService.getTree()).pipe(combineLatestWith(this.onNavigationEnd), switchMap(([tree]) => {
    const currentPath = this._router.url.split("?")[0];
    const expandAll = (items, path) => {
      items.forEach((item) => {
        item._expanded = item.path ? currentPath.startsWith(this.getPath(item.path)) : false;
        if (item.children) {
          expandAll(item.children, path);
        }
      });
    };
    expandAll(tree, currentPath);
    this.dropdownComponent()?.closeDropdown();
    return of(tree);
  }));
  placeholderHeight = signal(0, ...ngDevMode ? [{ debugName: "placeholderHeight" }] : []);
  position = signal(null, ...ngDevMode ? [{ debugName: "position" }] : []);
  getPath(item) {
    const segments = item.split("/");
    const mapped = segments.map((segment) => segment.replace(".md", ""));
    return ["/docs"].concat(mapped.filter(Boolean)).join("/");
  }
  toggle(item) {
    if (item.type !== "folder")
      return;
    item._expanded = !item._expanded;
  }
  ngAfterViewInit() {
    setTimeout(() => {
      const dropdown = this.dropdownElementRef();
      if (dropdown) {
        const rect = dropdown.nativeElement.getBoundingClientRect();
        const height = rect.height;
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        const scrollLeft = window.pageXOffset || document.documentElement.scrollLeft;
        this.placeholderHeight.set(height + 32);
        this.position.set({
          top: rect.top + scrollTop,
          left: rect.left + scrollLeft,
          position: "fixed"
        });
      }
      this.dropdownComponent()?.closeDropdown();
    });
  }
  static \u0275fac = function DocsThreeComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _DocsThreeComponent)(\u0275\u0275directiveInject(DocsService), \u0275\u0275directiveInject(Router), \u0275\u0275directiveInject(Renderer2));
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _DocsThreeComponent, selectors: [["lg-docs-three"]], viewQuery: function DocsThreeComponent_Query(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275viewQuerySignal(ctx.dropdownComponent, DropdownComponent, 5);
      \u0275\u0275viewQuerySignal(ctx.dropdownElementRef, DropdownComponent, 5, ElementRef);
    }
    if (rf & 2) {
      \u0275\u0275queryAdvance(2);
    }
  }, decls: 10, vars: 12, consts: [["itemTpl", ""], [3, "height"], ["lgDropdownAnchor", "", 3, "size"], ["aria-hidden", "false", "fontIcon", "auto_stories"], [1, "lg-documentation-container"], [3, "ngTemplateOutlet", "ngTemplateOutletContext"], [1, "doc-tree-item", 3, "click"], [1, "doc-tree-toggle"], [1, "doc-tree-empty-icon"], [1, "doc-tree-link", 3, "routerLink"], [1, "doc-tree-folder-name"]], template: function DocsThreeComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275conditionalCreate(0, DocsThreeComponent_Conditional_0_Template, 1, 2, "div", 1);
      \u0275\u0275elementStart(1, "lg-dropdown")(2, "lg-button", 2);
      \u0275\u0275element(3, "mat-icon", 3);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(4, "div", 4);
      \u0275\u0275repeaterCreate(5, DocsThreeComponent_For_6_Template, 1, 4, "ng-container", 5, \u0275\u0275repeaterTrackByIdentity);
      \u0275\u0275pipe(7, "async");
      \u0275\u0275elementEnd()();
      \u0275\u0275template(8, DocsThreeComponent_ng_template_8_Template, 6, 5, "ng-template", null, 0, \u0275\u0275templateRefExtractor);
    }
    if (rf & 2) {
      let tmp_2_0;
      let tmp_3_0;
      let tmp_4_0;
      \u0275\u0275conditional(ctx.placeholderHeight() ? 0 : -1);
      \u0275\u0275advance();
      \u0275\u0275styleProp("left", (tmp_2_0 = ctx.position()) == null ? null : tmp_2_0.left, "px")("position", (tmp_3_0 = ctx.position()) == null ? null : tmp_3_0.position)("top", (tmp_4_0 = ctx.position()) == null ? null : tmp_4_0.top, "px");
      \u0275\u0275advance();
      \u0275\u0275styleMap("transcluent");
      \u0275\u0275property("size", "small");
      \u0275\u0275advance(3);
      \u0275\u0275repeater(\u0275\u0275pipeBind1(7, 10, ctx.tree));
    }
  }, dependencies: [
    NgTemplateOutlet,
    RouterLink,
    ButtonComponent,
    DropdownComponent,
    MatIcon,
    AsyncPipe,
    TranslatePipe
  ], styles: ["\n\n.lg-documentation-container[_ngcontent-%COMP%] {\n  font-size: 14px;\n  line-height: 1.5;\n}\n.doc-tree-item[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 4px;\n  cursor: pointer;\n  -webkit-user-select: none;\n  user-select: none;\n  padding: 2px 0;\n  white-space: nowrap;\n}\n.doc-tree-toggle[_ngcontent-%COMP%] {\n  width: 16px;\n  display: inline-block;\n  cursor: pointer;\n  font-size: 12px;\n}\n.doc-tree-empty-icon[_ngcontent-%COMP%] {\n  width: 16px;\n  display: inline-block;\n}\n.doc-tree-link[_ngcontent-%COMP%] {\n  color: #2a2a2a;\n  text-decoration: none;\n  transition: color 0.2s;\n}\n.doc-tree-link[_ngcontent-%COMP%]:hover {\n  text-decoration: underline;\n  color: #000;\n}\n.doc-tree-folder-name[_ngcontent-%COMP%] {\n  font-weight: 600;\n}\n/*# sourceMappingURL=docs-three.component.css.map */"] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(DocsThreeComponent, [{
    type: Component,
    args: [{ selector: "lg-docs-three", template: `
    @if (placeholderHeight()) {
      <div [style.height.px]="placeholderHeight()"></div>
    }
    <lg-dropdown [style.left.px]="position()?.left"
                 [style.position]="position()?.position"
                 [style.top.px]="position()?.top">
      <lg-button [size]="'small'"
                 [style]="'transcluent'"
                 lgDropdownAnchor>
        <mat-icon aria-hidden="false" fontIcon="auto_stories"></mat-icon>
      </lg-button>


      <div class="lg-documentation-container">
        @for (item of tree | async; track item) {
          <ng-container [ngTemplateOutlet]="itemTpl"
                        [ngTemplateOutletContext]="{ $implicit: item,level:0 }"></ng-container>
        }
      </div>

    </lg-dropdown>


    <ng-template #itemTpl let-item let-level="level">
      <div
        (click)="toggle(item)"
        [style.padding-left.px]="level * 16"
        class="doc-tree-item">
        @if (item.type === 'folder') {
          <div class="doc-tree-toggle">
            {{ item._expanded ? '\u25BC' : '\u25B6' }}
          </div>
        } @else {
          <div class="doc-tree-empty-icon"></div>
        }

        @if (item.path) {
          <a [routerLink]="getPath(item.path)" class="doc-tree-link">
            {{ (nameToTitleMap[item.name] ?? item.title ?? item.name) | translate }}
          </a>
        } @else {
          <div class="doc-tree-folder-name">
            {{ (nameToTitleMap[item.name] ?? item.title ?? item.name) | translate }}
          </div>
        }
      </div>

      @if (item.children && item._expanded) {
        @for (child of item.children; track child) {
          <ng-container
            [ngTemplateOutlet]="itemTpl"
            [ngTemplateOutletContext]="{ $implicit: child, level: level + 1 }"/>
        }
      }
    </ng-template>
  `, imports: [
      AsyncPipe,
      NgTemplateOutlet,
      RouterLink,
      ButtonComponent,
      DropdownComponent,
      MatIcon,
      TranslatePipe
    ], styles: ["/* angular:styles/component:scss;c7bd6d79526e8fad77ddcb9a77b0c738aca181662f174ab68031fcce754fa795;/Users/khripunovpavel/Documents/my/lasagna/lasagna/src/app/features/documentation/view/docs-three.component.ts */\n.lg-documentation-container {\n  font-size: 14px;\n  line-height: 1.5;\n}\n.doc-tree-item {\n  display: flex;\n  align-items: center;\n  gap: 4px;\n  cursor: pointer;\n  -webkit-user-select: none;\n  user-select: none;\n  padding: 2px 0;\n  white-space: nowrap;\n}\n.doc-tree-toggle {\n  width: 16px;\n  display: inline-block;\n  cursor: pointer;\n  font-size: 12px;\n}\n.doc-tree-empty-icon {\n  width: 16px;\n  display: inline-block;\n}\n.doc-tree-link {\n  color: #2a2a2a;\n  text-decoration: none;\n  transition: color 0.2s;\n}\n.doc-tree-link:hover {\n  text-decoration: underline;\n  color: #000;\n}\n.doc-tree-folder-name {\n  font-weight: 600;\n}\n/*# sourceMappingURL=docs-three.component.css.map */\n"] }]
  }], () => [{ type: DocsService }, { type: Router }, { type: Renderer2 }], null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(DocsThreeComponent, { className: "DocsThreeComponent", filePath: "src/app/features/documentation/view/docs-three.component.ts", lineNumber: 124 });
})();
export {
  DocsThreeComponent
};
//# sourceMappingURL=chunk-KEQAJCH3.js.map
