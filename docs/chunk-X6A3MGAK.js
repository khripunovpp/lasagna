import {
  TimeAgoPipe
} from "./chunk-N6SHWPG5.js";
import {
  FlexRowComponent
} from "./chunk-VVGY6OUS.js";
import {
  PullDirective
} from "./chunk-V7C6GQ6Z.js";
import {
  ProductsRepository
} from "./chunk-CFCFQO5U.js";
import "./chunk-RBDPPOGX.js";
import "./chunk-BUGRPEBT.js";
import "./chunk-BPMAQ256.js";
import "./chunk-OGDPSEDB.js";
import {
  NotificationsService,
  productLabelFactoryProvider
} from "./chunk-6WNKKHFO.js";
import "./chunk-NLONWH5J.js";
import "./chunk-MV7X5YHM.js";
import "./chunk-QHJLSFIB.js";
import "./chunk-3UJV2MM3.js";
import "./chunk-UG5XPMCB.js";
import "./chunk-XXA7PPXB.js";
import {
  errorHandler
} from "./chunk-XIU3WVPC.js";
import "./chunk-T5CRNY7R.js";
import "./chunk-IWOUTMKL.js";
import "./chunk-R5O3TEDB.js";
import "./chunk-KM2DRJZA.js";
import "./chunk-2S3NUMNU.js";
import "./chunk-PHCOZAXM.js";
import "./chunk-AWZMWU52.js";
import "./chunk-5WJUMO7X.js";
import {
  TitleComponent
} from "./chunk-3AYILQJD.js";
import {
  FlexColumnComponent
} from "./chunk-K37ECZYU.js";
import "./chunk-AESGXZO7.js";
import "./chunk-2CTN2MPX.js";
import "./chunk-NJX644NS.js";
import "./chunk-CFXQGSQM.js";
import {
  TranslatePipe
} from "./chunk-755Q3QHA.js";
import {
  RouterLink
} from "./chunk-L34DFTMV.js";
import "./chunk-USF337CA.js";
import "./chunk-VVQKNBNV.js";
import "./chunk-X2X7GTPW.js";
import "./chunk-PZQLIUCM.js";
import "./chunk-7YWLATDR.js";
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  setClassMetadata,
  signal,
  ɵsetClassDebugInfo,
  ɵɵadvance,
  ɵɵdefineComponent,
  ɵɵdirectiveInject,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵnextContext,
  ɵɵpipe,
  ɵɵpipeBind1,
  ɵɵproperty,
  ɵɵpureFunction1,
  ɵɵrepeater,
  ɵɵrepeaterCreate,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1
} from "./chunk-IYCVPBRB.js";
import "./chunk-46DXP6YY.js";

// src/app/features/home/view/last-edited-products/last-edited-products.component.ts
var _c0 = (a0) => ["/products/edit/", a0];
var _forTrack0 = ($index, $item) => $item.product.uuid;
function LastEditedProductsComponent_For_7_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "lg-flex-row", 4)(1, "a", 6);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "small", 7);
    \u0275\u0275text(4);
    \u0275\u0275pipe(5, "timeAgo");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const item_r1 = ctx.$implicit;
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275property("size", "medium")("mobileMode", true);
    \u0275\u0275advance();
    \u0275\u0275property("routerLink", \u0275\u0275pureFunction1(7, _c0, item_r1.product.uuid));
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r1.productLabelFactory(item_r1.product), " ");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind1(5, 5, item_r1 == null ? null : item_r1.updatedAt), " ");
  }
}
function LastEditedProductsComponent_ForEmpty_8_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 5);
    \u0275\u0275text(1);
    \u0275\u0275pipe(2, "translate");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind1(2, 1, "no-products"), " ");
  }
}
var LastEditedProductsComponent = class _LastEditedProductsComponent {
  _productsRepository;
  constructor(_productsRepository) {
    this._productsRepository = _productsRepository;
  }
  products = signal([], ...ngDevMode ? [{ debugName: "products" }] : []);
  productLabelFactory = inject(productLabelFactoryProvider);
  _notificationsService = inject(NotificationsService);
  ngOnInit() {
    this._productsRepository.getLastProducts().then((products) => {
      this.products.set(products);
    }).catch((error) => {
      this._notificationsService.error(errorHandler(error));
    });
  }
  static \u0275fac = function LastEditedProductsComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _LastEditedProductsComponent)(\u0275\u0275directiveInject(ProductsRepository));
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _LastEditedProductsComponent, selectors: [["lg-last-edited-products"]], decls: 9, vars: 6, consts: [["size", "medium"], [3, "level"], [1, "last-edited-recipes"], [3, "size"], [3, "size", "mobileMode"], [1, "last-edited-recipe-name"], [1, "last-edited-product", 3, "routerLink"], ["lgPull", "", 1, "text-muted", "text-right", "text-cursive"]], template: function LastEditedProductsComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "lg-flex-column", 0)(1, "lg-title", 1);
      \u0275\u0275text(2);
      \u0275\u0275pipe(3, "translate");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(4, "div", 2)(5, "lg-flex-column", 3);
      \u0275\u0275repeaterCreate(6, LastEditedProductsComponent_For_7_Template, 6, 9, "lg-flex-row", 4, _forTrack0, false, LastEditedProductsComponent_ForEmpty_8_Template, 3, 3, "div", 5);
      \u0275\u0275elementEnd()()();
    }
    if (rf & 2) {
      \u0275\u0275advance();
      \u0275\u0275property("level", 4);
      \u0275\u0275advance();
      \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(3, 4, "main.last-products"));
      \u0275\u0275advance(3);
      \u0275\u0275property("size", "medium");
      \u0275\u0275advance();
      \u0275\u0275repeater(ctx.products());
    }
  }, dependencies: [
    FlexColumnComponent,
    RouterLink,
    TitleComponent,
    FlexRowComponent,
    PullDirective,
    TimeAgoPipe,
    TranslatePipe
  ], styles: ["\n\n[_nghost-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  width: 100%;\n}\n/*# sourceMappingURL=last-edited-products.component.css.map */"], changeDetection: 0 });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(LastEditedProductsComponent, [{
    type: Component,
    args: [{ selector: "lg-last-edited-products", template: `
    <lg-flex-column size="medium">
      <lg-title [level]="4">{{ 'main.last-products'|translate }}</lg-title>

      <div class="last-edited-recipes">
        <lg-flex-column [size]="'medium'">
          @for (item of products(); track item.product.uuid) {
            <lg-flex-row [size]="'medium'" [mobileMode]="true">
              <a [routerLink]="['/products/edit/', item.product.uuid]"
                 class="last-edited-product">
                {{ productLabelFactory(item.product) }}
              </a>

              <small class="text-muted text-right text-cursive" lgPull>
                {{ (item?.updatedAt) | timeAgo }}
              </small>
            </lg-flex-row>
          } @empty {
            <div class="last-edited-recipe-name">
              {{ 'no-products'|translate }}
            </div>
          }
        </lg-flex-column>
      </div>
    </lg-flex-column>
  `, imports: [
      FlexColumnComponent,
      RouterLink,
      TitleComponent,
      TimeAgoPipe,
      FlexRowComponent,
      PullDirective,
      TranslatePipe
    ], changeDetection: ChangeDetectionStrategy.OnPush, styles: ["/* angular:styles/component:scss;fd4110a686213ca38958bccd5259b139826bf60ce6ef84cb199ef0dbbe65aacb;/Users/khripunovpavel/Documents/my/lasagna/lasagna/src/app/features/home/view/last-edited-products/last-edited-products.component.ts */\n:host {\n  display: flex;\n  flex-direction: column;\n  width: 100%;\n}\n/*# sourceMappingURL=last-edited-products.component.css.map */\n"] }]
  }], () => [{ type: ProductsRepository }], null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(LastEditedProductsComponent, { className: "LastEditedProductsComponent", filePath: "src/app/features/home/view/last-edited-products/last-edited-products.component.ts", lineNumber: 64 });
})();
export {
  LastEditedProductsComponent
};
//# sourceMappingURL=chunk-X6A3MGAK.js.map
