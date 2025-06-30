import {
  DocsService
} from "./chunk-XLVGBYUT.js";
import {
  ActivatedRoute,
  RouterLink,
  RouterOutlet
} from "./chunk-UGLIF2MQ.js";
import "./chunk-5WJUMO7X.js";
import {
  AsyncPipe,
  NgTemplateOutlet
} from "./chunk-5MHPI2FA.js";
import {
  Component,
  setClassMetadata,
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
  ɵɵnextContext,
  ɵɵpipe,
  ɵɵpipeBind1,
  ɵɵproperty,
  ɵɵpureFunction1,
  ɵɵpureFunction2,
  ɵɵreference,
  ɵɵrepeater,
  ɵɵrepeaterCreate,
  ɵɵrepeaterTrackByIdentity,
  ɵɵstyleProp,
  ɵɵtemplate,
  ɵɵtemplateRefExtractor,
  ɵɵtext,
  ɵɵtextInterpolate1
} from "./chunk-6AETQSBA.js";
import "./chunk-PZQLIUCM.js";
import "./chunk-46DXP6YY.js";

// src/app/shared/view/documentation/documentation-tree.component.ts
var _c0 = (a0) => ({ $implicit: a0, level: 0 });
var _c1 = (a0, a1) => ({ $implicit: a0, level: a1 });
function DocumentationTreeComponent_For_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementContainer(0, 2);
  }
  if (rf & 2) {
    const item_r1 = ctx.$implicit;
    \u0275\u0275nextContext();
    const itemTpl_r2 = \u0275\u0275reference(5);
    \u0275\u0275property("ngTemplateOutlet", itemTpl_r2)("ngTemplateOutletContext", \u0275\u0275pureFunction1(2, _c0, item_r1));
  }
}
function DocumentationTreeComponent_ng_template_4_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "a", 3);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const item_r3 = \u0275\u0275nextContext().$implicit;
    const ctx_r3 = \u0275\u0275nextContext();
    \u0275\u0275property("routerLink", ctx_r3.getPath(item_r3.path));
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r3.nameToTitleMap[item_r3.name] ?? item_r3.name, " ");
  }
}
function DocumentationTreeComponent_ng_template_4_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275text(0);
  }
  if (rf & 2) {
    const item_r3 = \u0275\u0275nextContext().$implicit;
    const ctx_r3 = \u0275\u0275nextContext();
    \u0275\u0275textInterpolate1(" ", ctx_r3.nameToTitleMap[item_r3.name] ?? item_r3.name, " ");
  }
}
function DocumentationTreeComponent_ng_template_4_Conditional_3_For_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementContainer(0, 2);
  }
  if (rf & 2) {
    const child_r5 = ctx.$implicit;
    const level_r6 = \u0275\u0275nextContext(2).level;
    \u0275\u0275nextContext();
    const itemTpl_r2 = \u0275\u0275reference(5);
    \u0275\u0275property("ngTemplateOutlet", itemTpl_r2)("ngTemplateOutletContext", \u0275\u0275pureFunction2(2, _c1, child_r5, level_r6 + 1));
  }
}
function DocumentationTreeComponent_ng_template_4_Conditional_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275repeaterCreate(0, DocumentationTreeComponent_ng_template_4_Conditional_3_For_1_Template, 1, 5, "ng-container", 2, \u0275\u0275repeaterTrackByIdentity);
  }
  if (rf & 2) {
    const item_r3 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275repeater(item_r3.children);
  }
}
function DocumentationTreeComponent_ng_template_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div");
    \u0275\u0275conditionalCreate(1, DocumentationTreeComponent_ng_template_4_Conditional_1_Template, 2, 2, "a", 3)(2, DocumentationTreeComponent_ng_template_4_Conditional_2_Template, 1, 1);
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(3, DocumentationTreeComponent_ng_template_4_Conditional_3_Template, 2, 0);
  }
  if (rf & 2) {
    const item_r3 = ctx.$implicit;
    const level_r6 = ctx.level;
    \u0275\u0275styleProp("padding-left", level_r6 * 5, "px");
    \u0275\u0275advance();
    \u0275\u0275conditional(item_r3.path ? 1 : 2);
    \u0275\u0275advance(2);
    \u0275\u0275conditional(item_r3.children ? 3 : -1);
  }
}
var DocumentationTreeComponent = class _DocumentationTreeComponent {
  docsService;
  route;
  constructor(docsService, route) {
    this.docsService = docsService;
    this.route = route;
  }
  getPath(item) {
    const segments = item.split("/");
    const mapped = segments.map((segment) => segment.replace(".md", ""));
    return ["/docs"].concat(mapped.filter(Boolean)).join("/");
  }
  nameToTitleMap = {
    "getting-started": "Getting Started",
    "intro.md": "Introduction",
    "install": "Installation",
    "requirenments.md": "Requirements"
  };
  static \u0275fac = function DocumentationTreeComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _DocumentationTreeComponent)(\u0275\u0275directiveInject(DocsService), \u0275\u0275directiveInject(ActivatedRoute));
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _DocumentationTreeComponent, selectors: [["lg-documentation-tree"]], decls: 7, vars: 2, consts: [["itemTpl", ""], [1, "lg-documentation-tree"], [3, "ngTemplateOutlet", "ngTemplateOutletContext"], [3, "routerLink"]], template: function DocumentationTreeComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "div", 1);
      \u0275\u0275repeaterCreate(1, DocumentationTreeComponent_For_2_Template, 1, 4, "ng-container", 2, \u0275\u0275repeaterTrackByIdentity);
      \u0275\u0275pipe(3, "async");
      \u0275\u0275elementEnd();
      \u0275\u0275template(4, DocumentationTreeComponent_ng_template_4_Template, 4, 4, "ng-template", null, 0, \u0275\u0275templateRefExtractor);
      \u0275\u0275element(6, "router-outlet");
    }
    if (rf & 2) {
      \u0275\u0275advance();
      \u0275\u0275repeater(\u0275\u0275pipeBind1(3, 0, ctx.docsService.getTree()));
    }
  }, dependencies: [
    AsyncPipe,
    RouterLink,
    NgTemplateOutlet,
    RouterOutlet
  ], encapsulation: 2 });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(DocumentationTreeComponent, [{
    type: Component,
    args: [{
      selector: "lg-documentation-tree",
      template: `
      <div class="lg-documentation-tree">
          @for (item of docsService.getTree() | async;track item) {
              <!--              <div class="lg-documentation-tree__item">-->
                      <!--                  <a [routerLink]="['/docs', item.path]">-->
                      <!--                      {{ item.title }}-->
                      <!--                  </a>-->
                      <!--              </div>-->

                      <!--              <pre>{{item|json}}</pre>-->

              <ng-container [ngTemplateOutlet]="itemTpl"
                            [ngTemplateOutletContext]="{ $implicit: item,level:0 }"></ng-container>
          }
      </div>

      <ng-template #itemTpl let-item let-level="level">
          <div [style.padding-left.px]="level*5">
              @if (item.path) {
                  <a [routerLink]="getPath(item.path)">
                      {{ nameToTitleMap[item.name] ?? item.name }}
                  </a>
              } @else {

                  {{ nameToTitleMap[item.name] ?? item.name }}
              }
          </div>


          @if (item.children) {
              @for (child of item.children;track child) {
                  <ng-container [ngTemplateOutlet]="itemTpl"
                                [ngTemplateOutletContext]="{ $implicit: child,level:level + 1 }"></ng-container>
              }
          }
      </ng-template>

      <router-outlet></router-outlet>
  `,
      standalone: true,
      imports: [
        AsyncPipe,
        RouterLink,
        NgTemplateOutlet,
        RouterOutlet
      ]
    }]
  }], () => [{ type: DocsService }, { type: ActivatedRoute }], null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(DocumentationTreeComponent, { className: "DocumentationTreeComponent", filePath: "src/app/shared/view/documentation/documentation-tree.component.ts", lineNumber: 55 });
})();
export {
  DocumentationTreeComponent
};
//# sourceMappingURL=chunk-CMBCEYIZ.js.map
