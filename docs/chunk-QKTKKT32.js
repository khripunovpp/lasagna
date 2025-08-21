import {
  NoWrapDirective
} from "./chunk-GGK24M5V.js";
import {
  InputComponent
} from "./chunk-BEOO26FI.js";
import {
  ControlComponent
} from "./chunk-L6LNU7WI.js";
import "./chunk-RSTLHIV7.js";
import {
  ExpandDirective
} from "./chunk-RDIOWZFB.js";
import {
  ContainerComponent
} from "./chunk-XBHHMU37.js";
import {
  FlexRowComponent
} from "./chunk-BDLCG26E.js";
import {
  CardComponent
} from "./chunk-KWEJJNRF.js";
import "./chunk-R64U7JLD.js";
import {
  FadeInComponent
} from "./chunk-TFPBWSA6.js";
import "./chunk-R4FNXVZE.js";
import {
  TitleComponent
} from "./chunk-S3LHKJVR.js";
import {
  CategoryProductsRepository
} from "./chunk-MUCTVFUK.js";
import "./chunk-CDODNEUR.js";
import "./chunk-A44TAXVW.js";
import {
  CategoryProduct,
  FormControl,
  FormControlName,
  FormGroup,
  FormGroupDirective,
  NgControlStatus,
  NgControlStatusGroup,
  NotificationsService,
  ReactiveFormsModule,
  Validators,
  categoryProductDTOFromFormValue,
  categoryProductToFormValue,
  ɵNgNoValidate
} from "./chunk-2XO3IHHJ.js";
import "./chunk-Q4M4NLQD.js";
import {
  ButtonComponent
} from "./chunk-T3BLSHK3.js";
import {
  TranslatePipe
} from "./chunk-K2AXQEJL.js";
import "./chunk-HL3YEUI2.js";
import "./chunk-5WJUMO7X.js";
import {
  ActivatedRoute
} from "./chunk-O3OB56H2.js";
import "./chunk-GCNVZWZ6.js";
import "./chunk-3W3KDUL6.js";
import {
  Component,
  effect,
  input,
  setClassMetadata,
  signal,
  ɵsetClassDebugInfo,
  ɵɵadvance,
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
  ɵɵproperty,
  ɵɵresetView,
  ɵɵrestoreView,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1
} from "./chunk-S2UUPSJN.js";
import "./chunk-PZQLIUCM.js";
import "./chunk-7YWLATDR.js";
import "./chunk-46DXP6YY.js";

// src/app/features/settings/view/categories/category-product/add-category/add-category-form.component.ts
function AddCategoryFormComponent_Conditional_7_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275text(0);
    \u0275\u0275pipe(1, "translate");
  }
  if (rf & 2) {
    \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind1(1, 1, "settings.category.save"), " ");
  }
}
function AddCategoryFormComponent_Conditional_7_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275text(0);
    \u0275\u0275pipe(1, "translate");
  }
  if (rf & 2) {
    \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind1(1, 1, "settings.category.no-changes"), " ");
  }
}
function AddCategoryFormComponent_Conditional_7_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "lg-button", 6);
    \u0275\u0275listener("click", function AddCategoryFormComponent_Conditional_7_Template_lg_button_click_0_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.editCategory());
    });
    \u0275\u0275conditionalCreate(1, AddCategoryFormComponent_Conditional_7_Conditional_1_Template, 2, 3)(2, AddCategoryFormComponent_Conditional_7_Conditional_2_Template, 2, 3);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275property("disabled", !ctx_r1.form.dirty);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r1.form.dirty ? 1 : 2);
  }
}
function AddCategoryFormComponent_Conditional_8_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275text(0);
    \u0275\u0275pipe(1, "translate");
  }
  if (rf & 2) {
    \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind1(1, 1, "settings.category.add"), " ");
  }
}
function AddCategoryFormComponent_Conditional_8_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275text(0);
    \u0275\u0275pipe(1, "translate");
  }
  if (rf & 2) {
    \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind1(1, 1, "settings.category.enter-name"), " ");
  }
}
function AddCategoryFormComponent_Conditional_8_Template(rf, ctx) {
  if (rf & 1) {
    const _r3 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "lg-button", 6);
    \u0275\u0275listener("click", function AddCategoryFormComponent_Conditional_8_Template_lg_button_click_0_listener() {
      \u0275\u0275restoreView(_r3);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.addCategory());
    });
    \u0275\u0275conditionalCreate(1, AddCategoryFormComponent_Conditional_8_Conditional_1_Template, 2, 3)(2, AddCategoryFormComponent_Conditional_8_Conditional_2_Template, 2, 3);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275property("disabled", !ctx_r1.form.dirty);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r1.form.dirty ? 1 : 2);
  }
}
var AddCategoryFormComponent = class _AddCategoryFormComponent {
  _categoryRepository;
  _notificationsService;
  constructor(_categoryRepository, _notificationsService) {
    this._categoryRepository = _categoryRepository;
    this._notificationsService = _notificationsService;
  }
  form = new FormGroup({
    name: new FormControl("", Validators.required)
  });
  category = signal(void 0, ...ngDevMode ? [{ debugName: "category" }] : []);
  uuid = input("", ...ngDevMode ? [{ debugName: "uuid" }] : []);
  uuidEffect = effect(() => {
    if (!this.uuid()) {
      this.category.set(CategoryProduct.empty());
      return;
    }
    this._categoryRepository.getOne(this.uuid()).then((category) => {
      this.reset(category);
    });
  }, ...ngDevMode ? [{ debugName: "uuidEffect" }] : []);
  reset(category) {
    this.form.reset(categoryProductToFormValue(category));
    this.category.set(category);
    this.form.markAsPristine();
  }
  ngOnInit() {
    this.form.valueChanges.subscribe((values) => {
      this.category()?.update(categoryProductDTOFromFormValue(values));
    });
  }
  addCategory() {
    if (!this.category() || !this.form.dirty) {
      return Promise.resolve();
    }
    return this._categoryRepository.addOne(this.category()).then(() => {
      this.form.reset({
        name: ""
      });
      this._notificationsService.success("settings.category.added");
      this.form.markAsPristine();
    });
  }
  editCategory() {
    if (!this.category() || !this.form.dirty) {
      return Promise.resolve();
    }
    return this._categoryRepository.updateOne(this.uuid(), this.category()).then(() => {
      this._notificationsService.success("settings.category.edited");
      this.form.markAsPristine();
    });
  }
  onEnter() {
    if (this.uuid()) {
      this.editCategory();
    } else {
      this.addCategory();
    }
  }
  static \u0275fac = function AddCategoryFormComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _AddCategoryFormComponent)(\u0275\u0275directiveInject(CategoryProductsRepository), \u0275\u0275directiveInject(NotificationsService));
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _AddCategoryFormComponent, selectors: [["lg-add-category-form"]], inputs: { uuid: [1, "uuid"] }, decls: 9, vars: 10, consts: [[3, "formGroup"], [3, "bottom", "mobileMode"], ["lgExpand", "", 3, "label"], ["formControlName", "name", 3, "onEnter", "placeholder"], ["lgNoWrap", ""], [3, "disabled"], [3, "click", "disabled"]], template: function AddCategoryFormComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "form", 0)(1, "lg-flex-row", 1)(2, "lg-control", 2);
      \u0275\u0275pipe(3, "translate");
      \u0275\u0275elementStart(4, "lg-input", 3);
      \u0275\u0275pipe(5, "translate");
      \u0275\u0275listener("onEnter", function AddCategoryFormComponent_Template_lg_input_onEnter_4_listener() {
        return ctx.onEnter();
      });
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(6, "div", 4);
      \u0275\u0275conditionalCreate(7, AddCategoryFormComponent_Conditional_7_Template, 3, 2, "lg-button", 5)(8, AddCategoryFormComponent_Conditional_8_Template, 3, 2, "lg-button", 5);
      \u0275\u0275elementEnd()()();
    }
    if (rf & 2) {
      \u0275\u0275property("formGroup", ctx.form);
      \u0275\u0275advance();
      \u0275\u0275property("bottom", true)("mobileMode", true);
      \u0275\u0275advance();
      \u0275\u0275property("label", \u0275\u0275pipeBind1(3, 6, "settings.category.name"));
      \u0275\u0275advance(2);
      \u0275\u0275property("placeholder", \u0275\u0275pipeBind1(5, 8, "settings.category.placeholder"));
      \u0275\u0275advance(3);
      \u0275\u0275conditional(ctx.uuid() ? 7 : 8);
    }
  }, dependencies: [
    ReactiveFormsModule,
    \u0275NgNoValidate,
    NgControlStatus,
    NgControlStatusGroup,
    FormGroupDirective,
    FormControlName,
    InputComponent,
    ControlComponent,
    ButtonComponent,
    FlexRowComponent,
    ExpandDirective,
    NoWrapDirective,
    TranslatePipe
  ], encapsulation: 2 });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(AddCategoryFormComponent, [{
    type: Component,
    args: [{ selector: "lg-add-category-form", standalone: true, template: `
    <form [formGroup]="form">
      <lg-flex-row [bottom]="true" [mobileMode]="true">
        <lg-control [label]="'settings.category.name' | translate"
                    lgExpand>
          <lg-input (onEnter)="onEnter()"
                    [placeholder]="'settings.category.placeholder' | translate"
                    formControlName="name"></lg-input>
        </lg-control>

        <div lgNoWrap>
          @if (uuid()) {
            <lg-button [disabled]="!form.dirty"
                       (click)="editCategory()">
              @if (form.dirty) {
                {{ 'settings.category.save' | translate }}
              } @else {
                {{ 'settings.category.no-changes' | translate }}
              }
            </lg-button>
          } @else {
            <lg-button [disabled]="!form.dirty" (click)="addCategory()">
              @if (form.dirty) {
                {{ 'settings.category.add' | translate }}
              } @else {
                {{ 'settings.category.enter-name' | translate }}
              }
            </lg-button>
          }</div>
      </lg-flex-row>
    </form>
  `, imports: [
      ReactiveFormsModule,
      InputComponent,
      ControlComponent,
      ButtonComponent,
      FlexRowComponent,
      ExpandDirective,
      NoWrapDirective,
      TranslatePipe
    ] }]
  }], () => [{ type: CategoryProductsRepository }, { type: NotificationsService }], null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(AddCategoryFormComponent, { className: "AddCategoryFormComponent", filePath: "src/app/features/settings/view/categories/category-product/add-category/add-category-form.component.ts", lineNumber: 65 });
})();

// src/app/features/settings/view/categories/category-product/add-category/add-category.component.ts
var AddCategoryComponent = class _AddCategoryComponent {
  _aRoute;
  constructor(_aRoute) {
    this._aRoute = _aRoute;
  }
  uuid = signal("", ...ngDevMode ? [{ debugName: "uuid" }] : []);
  ngOnInit() {
    this._aRoute.params.subscribe((params) => {
      this.uuid.set(params["uuid"]);
    });
  }
  static \u0275fac = function AddCategoryComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _AddCategoryComponent)(\u0275\u0275directiveInject(ActivatedRoute));
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _AddCategoryComponent, selectors: [["lg-add-category"]], decls: 9, vars: 7, consts: [[3, "center"], [3, "uuid"]], template: function AddCategoryComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "lg-fade-in")(1, "lg-container")(2, "lg-flex-row", 0)(3, "lg-title");
      \u0275\u0275text(4);
      \u0275\u0275pipe(5, "translate");
      \u0275\u0275pipe(6, "translate");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(7, "lg-card");
      \u0275\u0275element(8, "lg-add-category-form", 1);
      \u0275\u0275elementEnd()()();
    }
    if (rf & 2) {
      \u0275\u0275advance(2);
      \u0275\u0275property("center", true);
      \u0275\u0275advance(2);
      \u0275\u0275textInterpolate(ctx.uuid() ? \u0275\u0275pipeBind1(5, 3, "categories.edit-product") : \u0275\u0275pipeBind1(6, 5, "categories.add-product"));
      \u0275\u0275advance(4);
      \u0275\u0275property("uuid", ctx.uuid());
    }
  }, dependencies: [
    ContainerComponent,
    CardComponent,
    TitleComponent,
    AddCategoryFormComponent,
    FlexRowComponent,
    FadeInComponent,
    TranslatePipe
  ], encapsulation: 2 });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(AddCategoryComponent, [{
    type: Component,
    args: [{ selector: "lg-add-category", standalone: true, imports: [
      ContainerComponent,
      CardComponent,
      TitleComponent,
      AddCategoryFormComponent,
      FlexRowComponent,
      FadeInComponent,
      TranslatePipe
    ], template: `
      <lg-fade-in>
          <lg-container>
              <lg-flex-row [center]="true">
                  <lg-title>{{ uuid() ? ('categories.edit-product' | translate) : ('categories.add-product' | translate) }}</lg-title>
              </lg-flex-row>

              <lg-card>
                  <lg-add-category-form [uuid]="uuid()"></lg-add-category-form>
              </lg-card>
          </lg-container>
      </lg-fade-in>
  ` }]
  }], () => [{ type: ActivatedRoute }], null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(AddCategoryComponent, { className: "AddCategoryComponent", filePath: "src/app/features/settings/view/categories/category-product/add-category/add-category.component.ts", lineNumber: 41 });
})();
export {
  AddCategoryComponent
};
//# sourceMappingURL=chunk-QKTKKT32.js.map
