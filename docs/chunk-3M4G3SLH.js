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
  RecipesRepository
} from "./chunk-CFCFQO5U.js";
import "./chunk-RBDPPOGX.js";
import "./chunk-BUGRPEBT.js";
import "./chunk-BPMAQ256.js";
import "./chunk-OGDPSEDB.js";
import {
  NotificationsService
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

// src/app/features/home/view/last-edited-recipes/last-edited-recipes.component.ts
var _c0 = (a0) => ["/recipes/edit/", a0];
var _forTrack0 = ($index, $item) => $item.recipe.uuid;
function LastEditedRecipesComponent_For_6_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "lg-flex-row", 3)(1, "a", 5);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "small", 6);
    \u0275\u0275text(4);
    \u0275\u0275pipe(5, "timeAgo");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const item_r1 = ctx.$implicit;
    \u0275\u0275property("size", "medium")("mobileMode", true);
    \u0275\u0275advance();
    \u0275\u0275property("routerLink", \u0275\u0275pureFunction1(7, _c0, item_r1.recipe.uuid));
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", item_r1.recipe.name, " ");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind1(5, 5, item_r1 == null ? null : item_r1.updatedAt), " ");
  }
}
function LastEditedRecipesComponent_ForEmpty_7_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 4);
    \u0275\u0275text(1);
    \u0275\u0275pipe(2, "translate");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind1(2, 1, "no-recipes"), " ");
  }
}
var LastEditedRecipesComponent = class _LastEditedRecipesComponent {
  _recipesRepository;
  constructor(_recipesRepository) {
    this._recipesRepository = _recipesRepository;
  }
  recipes = signal([], ...ngDevMode ? [{ debugName: "recipes" }] : []);
  _notificationsService = inject(NotificationsService);
  ngOnInit() {
    this._recipesRepository.getLastRecipes().then((recipes) => {
      this.recipes.set(recipes);
    }).catch((error) => {
      this._notificationsService.error(errorHandler(error));
    });
  }
  static \u0275fac = function LastEditedRecipesComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _LastEditedRecipesComponent)(\u0275\u0275directiveInject(RecipesRepository));
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _LastEditedRecipesComponent, selectors: [["lg-last-edited-recipes"]], decls: 8, vars: 6, consts: [["size", "medium"], [3, "level"], [3, "size"], [3, "size", "mobileMode"], [1, "last-edited-recipe-name"], [1, "last-edited-recipe", 3, "routerLink"], ["lgPull", "", 1, "text-muted", "text-right", "text-cursive"]], template: function LastEditedRecipesComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "lg-flex-column", 0)(1, "lg-title", 1);
      \u0275\u0275text(2);
      \u0275\u0275pipe(3, "translate");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(4, "lg-flex-column", 2);
      \u0275\u0275repeaterCreate(5, LastEditedRecipesComponent_For_6_Template, 6, 9, "lg-flex-row", 3, _forTrack0, false, LastEditedRecipesComponent_ForEmpty_7_Template, 3, 3, "div", 4);
      \u0275\u0275elementEnd()();
    }
    if (rf & 2) {
      \u0275\u0275advance();
      \u0275\u0275property("level", 4);
      \u0275\u0275advance();
      \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(3, 4, "main.last-recipes"));
      \u0275\u0275advance(2);
      \u0275\u0275property("size", "medium");
      \u0275\u0275advance();
      \u0275\u0275repeater(ctx.recipes());
    }
  }, dependencies: [
    FlexColumnComponent,
    RouterLink,
    TitleComponent,
    FlexRowComponent,
    PullDirective,
    TimeAgoPipe,
    TranslatePipe
  ], styles: ["\n\n[_nghost-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  width: 100%;\n}\n/*# sourceMappingURL=last-edited-recipes.component.css.map */"] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(LastEditedRecipesComponent, [{
    type: Component,
    args: [{ selector: "lg-last-edited-recipes", template: `
    <lg-flex-column size="medium">
      <lg-title [level]="4">{{ 'main.last-recipes'|translate }}</lg-title>

      <lg-flex-column [size]="'medium'">
        @for (item of recipes(); track item.recipe.uuid) {
          <lg-flex-row [size]="'medium'" [mobileMode]="true">
            <a [routerLink]="['/recipes/edit/', item.recipe.uuid]" class="last-edited-recipe">
              {{ item.recipe.name }}
            </a>

            <small class="text-muted text-right text-cursive" lgPull>
              {{ (item?.updatedAt) | timeAgo }}
            </small>
          </lg-flex-row>
        } @empty {
          <div class="last-edited-recipe-name">
            {{ 'no-recipes'|translate }}
          </div>
        }
      </lg-flex-column>
    </lg-flex-column>
  `, standalone: true, imports: [
      FlexColumnComponent,
      RouterLink,
      TitleComponent,
      TimeAgoPipe,
      FlexRowComponent,
      PullDirective,
      TranslatePipe
    ], styles: ["/* angular:styles/component:scss;fd4110a686213ca38958bccd5259b139826bf60ce6ef84cb199ef0dbbe65aacb;/Users/khripunovpavel/Documents/my/lasagna/lasagna/src/app/features/home/view/last-edited-recipes/last-edited-recipes.component.ts */\n:host {\n  display: flex;\n  flex-direction: column;\n  width: 100%;\n}\n/*# sourceMappingURL=last-edited-recipes.component.css.map */\n"] }]
  }], () => [{ type: RecipesRepository }], null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(LastEditedRecipesComponent, { className: "LastEditedRecipesComponent", filePath: "src/app/features/home/view/last-edited-recipes/last-edited-recipes.component.ts", lineNumber: 60 });
})();
export {
  LastEditedRecipesComponent
};
//# sourceMappingURL=chunk-3M4G3SLH.js.map
