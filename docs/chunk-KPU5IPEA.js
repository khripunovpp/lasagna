import {
  NoWrapDirective
} from "./chunk-IBWRU7E4.js";
import {
  ControlComponent
} from "./chunk-EUCCNRYX.js";
import {
  InputComponent
} from "./chunk-RUDWEOA4.js";
import "./chunk-UH4J6CQQ.js";
import {
  ExpandDirective
} from "./chunk-WO5SLTWO.js";
import {
  ContainerComponent
} from "./chunk-SIJ5SQPQ.js";
import {
  FlexRowComponent
} from "./chunk-762QLXRY.js";
import {
  CardComponent
} from "./chunk-IPWOX6HU.js";
import "./chunk-R64U7JLD.js";
import {
  FadeInComponent
} from "./chunk-3T7K5NWK.js";
import "./chunk-R4FNXVZE.js";
import {
  TitleComponent
} from "./chunk-SR74O6FC.js";
import {
  CategoryProductsRepository
} from "./chunk-5XLRY5CG.js";
import "./chunk-TWG2IXFB.js";
import "./chunk-DUO4BCO4.js";
import "./chunk-WFNLLS7W.js";
import {
  CategoryProduct,
  NotificationsService,
  categoryProductDTOFromFormValue,
  categoryProductToFormValue
} from "./chunk-EK72OMQD.js";
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
} from "./chunk-327AMEVI.js";
import "./chunk-IWOUTMKL.js";
import {
  ButtonComponent
} from "./chunk-IOX7FG5S.js";
import "./chunk-PEC2LDWJ.js";
import "./chunk-5WJUMO7X.js";
import {
  TranslatePipe
} from "./chunk-MFZJAREX.js";
import {
  ActivatedRoute
} from "./chunk-MVY2ZCDC.js";
import "./chunk-ZEJD7QNI.js";
import "./chunk-7YPRH2YU.js";
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
  ɵɵstyleMap,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1
} from "./chunk-LCJZUNO3.js";
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
    \u0275\u0275styleMap("primary");
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
    \u0275\u0275styleMap("primary");
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
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _AddCategoryFormComponent, selectors: [["lg-add-category-form"]], inputs: { uuid: [1, "uuid"] }, decls: 9, vars: 10, consts: [[3, "formGroup"], [3, "bottom", "mobileMode"], ["lgExpand", "", 3, "label"], ["formControlName", "name", 3, "onEnter", "placeholder"], ["lgNoWrap", ""], [3, "disabled", "style"], [3, "click", "disabled"]], template: function AddCategoryFormComponent_Template(rf, ctx) {
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
      \u0275\u0275conditionalCreate(7, AddCategoryFormComponent_Conditional_7_Template, 3, 4, "lg-button", 5)(8, AddCategoryFormComponent_Conditional_8_Template, 3, 4, "lg-button", 5);
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
                       [style]="'primary'"
                       (click)="editCategory()">
              @if (form.dirty) {
                {{ 'settings.category.save' | translate }}
              } @else {
                {{ 'settings.category.no-changes' | translate }}
              }
            </lg-button>
          } @else {
            <lg-button [disabled]="!form.dirty"
                       [style]="'primary'"
                       (click)="addCategory()">
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
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(AddCategoryFormComponent, { className: "AddCategoryFormComponent", filePath: "src/app/features/settings/view/categories/category-product/add-category/add-category-form.component.ts", lineNumber: 68 });
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
//# sourceMappingURL=chunk-KPU5IPEA.js.map
