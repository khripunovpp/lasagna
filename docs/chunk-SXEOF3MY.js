import {
  FaqService
} from "./chunk-JUF37WUJ.js";
import {
  OnboardingService
} from "./chunk-PWIGGAMT.js";
import "./chunk-IGVRSL6U.js";
import "./chunk-GRS3SI4M.js";
import {
  USER_LANGUAGE
} from "./chunk-7REZCGNQ.js";
import "./chunk-5WJUMO7X.js";
import {
  TitleComponent
} from "./chunk-T6NLT234.js";
import {
  TranslatePipe
} from "./chunk-KKROIGFS.js";
import {
  DomSanitizer
} from "./chunk-CE7BC4LB.js";
import "./chunk-KBRICXTE.js";
import {
  Component,
  Pipe,
  computed,
  inject,
  setClassMetadata,
  ɵsetClassDebugInfo,
  ɵɵadvance,
  ɵɵdefineComponent,
  ɵɵdefinePipe,
  ɵɵdirectiveInject,
  ɵɵelement,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵpipe,
  ɵɵpipeBind1,
  ɵɵproperty,
  ɵɵrepeater,
  ɵɵrepeaterCreate,
  ɵɵsanitizeHtml,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1
} from "./chunk-Z5TNFCCP.js";
import "./chunk-PZQLIUCM.js";
import "./chunk-46DXP6YY.js";

// src/app/shared/view/pipes/safehtml.pipe.ts
var SafeHtmlPipe = class _SafeHtmlPipe {
  sanitizer;
  constructor(sanitizer) {
    this.sanitizer = sanitizer;
  }
  transform(value) {
    return this.sanitizer.bypassSecurityTrustHtml(value);
  }
  static \u0275fac = function SafeHtmlPipe_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _SafeHtmlPipe)(\u0275\u0275directiveInject(DomSanitizer, 16));
  };
  static \u0275pipe = /* @__PURE__ */ \u0275\u0275definePipe({ name: "safeHtml", type: _SafeHtmlPipe, pure: true });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(SafeHtmlPipe, [{
    type: Pipe,
    args: [{ name: "safeHtml", standalone: true }]
  }], () => [{ type: DomSanitizer }], null);
})();

// src/app/features/documentation/view/faq.component.ts
var _forTrack0 = ($index, $item) => $item.path;
function FaqComponent_For_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "section", 0)(1, "h3");
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275element(3, "div", 1);
    \u0275\u0275pipe(4, "safeHtml");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const section_r1 = ctx.$implicit;
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(section_r1.title);
    \u0275\u0275advance();
    \u0275\u0275property("innerHTML", \u0275\u0275pipeBind1(4, 2, section_r1.html), \u0275\u0275sanitizeHtml);
  }
}
var FaqComponent = class _FaqComponent {
  faqService = inject(FaqService);
  lang = inject(USER_LANGUAGE);
  localizedFaqs = computed(() => this.faqService.getFaqsView().filter((section) => section.language === this.lang()), ...ngDevMode ? [{ debugName: "localizedFaqs" }] : []);
  _onboarding = inject(OnboardingService);
  ngOnInit() {
    this._onboarding.markFaqDone();
  }
  static \u0275fac = function FaqComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _FaqComponent)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _FaqComponent, selectors: [["lg-faq"]], decls: 5, vars: 3, consts: [[1, "faq-block"], [3, "innerHTML"]], template: function FaqComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "lg-title");
      \u0275\u0275text(1);
      \u0275\u0275pipe(2, "translate");
      \u0275\u0275elementEnd();
      \u0275\u0275repeaterCreate(3, FaqComponent_For_4_Template, 5, 4, "section", 0, _forTrack0);
    }
    if (rf & 2) {
      \u0275\u0275advance();
      \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind1(2, 1, "faq.title"), " ");
      \u0275\u0275advance(2);
      \u0275\u0275repeater(ctx.localizedFaqs());
    }
  }, dependencies: [TitleComponent, SafeHtmlPipe, TranslatePipe], encapsulation: 2 });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(FaqComponent, [{
    type: Component,
    args: [{ selector: "lg-faq", standalone: true, imports: [SafeHtmlPipe, SafeHtmlPipe, TranslatePipe, TitleComponent], template: `
    <lg-title>
      {{ 'faq.title' | translate }}
    </lg-title>

    @for (section of localizedFaqs(); track section.path) {
      <section class="faq-block">
        <h3>{{ section.title }}</h3>
        <div [innerHTML]="section.html | safeHtml"></div>
      </section>
    }
  ` }]
  }], null, null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(FaqComponent, { className: "FaqComponent", filePath: "src/app/features/documentation/view/faq.component.ts", lineNumber: 29 });
})();
export {
  FaqComponent
};
//# sourceMappingURL=chunk-SXEOF3MY.js.map
