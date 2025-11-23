import {
  NoWrapDirective
} from "./chunk-XJBWEQOY.js";
import {
  matchMediaSignal,
  mobileBreakpoint
} from "./chunk-443BUU7J.js";
import {
  ExpandDirective
} from "./chunk-NZ2BIUGW.js";
import {
  FlexRowComponent
} from "./chunk-VVGY6OUS.js";
import {
  InputComponent
} from "./chunk-USP6G3VL.js";
import {
  ControlComponent
} from "./chunk-UFGIB7QO.js";
import "./chunk-4ABBJ6BG.js";
import "./chunk-R64U7JLD.js";
import {
  CategoryProductsRepository
} from "./chunk-CFCFQO5U.js";
import "./chunk-RBDPPOGX.js";
import "./chunk-BUGRPEBT.js";
import "./chunk-BPMAQ256.js";
import "./chunk-OGDPSEDB.js";
import {
  CategoryProduct,
  NotificationsService
} from "./chunk-6WNKKHFO.js";
import "./chunk-NLONWH5J.js";
import "./chunk-MV7X5YHM.js";
import "./chunk-QHJLSFIB.js";
import "./chunk-3UJV2MM3.js";
import "./chunk-UG5XPMCB.js";
import "./chunk-XXA7PPXB.js";
import {
  categoryProductDTOFromFormValue,
  categoryProductToFormValue,
  errorHandler
} from "./chunk-XIU3WVPC.js";
import "./chunk-T5CRNY7R.js";
import "./chunk-IWOUTMKL.js";
import "./chunk-R5O3TEDB.js";
import "./chunk-KM2DRJZA.js";
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
} from "./chunk-2S3NUMNU.js";
import "./chunk-PHCOZAXM.js";
import {
  takeUntilDestroyed
} from "./chunk-AWZMWU52.js";
import "./chunk-5WJUMO7X.js";
import {
  FadeInComponent
} from "./chunk-TPJKAC4G.js";
import "./chunk-2JX6TDC6.js";
import "./chunk-57RA4QZQ.js";
import {
  ButtonComponent
} from "./chunk-MP6JNYP6.js";
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
import "./chunk-L34DFTMV.js";
import "./chunk-USF337CA.js";
import "./chunk-VVQKNBNV.js";
import "./chunk-X2X7GTPW.js";
import "./chunk-PZQLIUCM.js";
import "./chunk-7YWLATDR.js";
import {
  Component,
  DestroyRef,
  EventEmitter,
  Input,
  Output,
  effect,
  inject,
  input,
  setClassMetadata,
  signal,
  ɵsetClassDebugInfo,
  ɵɵadvance,
  ɵɵconditional,
  ɵɵconditionalCreate,
  ɵɵdefineComponent,
  ɵɵdirectiveInject,
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
} from "./chunk-IYCVPBRB.js";
import "./chunk-46DXP6YY.js";

// src/app/features/settings/view/categories/category-product/add-category/add-category-form.component.ts
function AddCategoryFormComponent_Conditional_11_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275text(0);
    \u0275\u0275pipe(1, "translate");
  }
  if (rf & 2) {
    \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind1(1, 1, "settings.category.save"), " ");
  }
}
function AddCategoryFormComponent_Conditional_11_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275text(0);
    \u0275\u0275pipe(1, "translate");
  }
  if (rf & 2) {
    \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind1(1, 1, "settings.category.no-changes"), " ");
  }
}
function AddCategoryFormComponent_Conditional_11_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "lg-button", 8);
    \u0275\u0275listener("click", function AddCategoryFormComponent_Conditional_11_Template_lg_button_click_0_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.editCategory());
    });
    \u0275\u0275conditionalCreate(1, AddCategoryFormComponent_Conditional_11_Conditional_1_Template, 2, 3)(2, AddCategoryFormComponent_Conditional_11_Conditional_2_Template, 2, 3);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275styleMap("primary");
    \u0275\u0275property("disabled", !ctx_r1.form.dirty)("size", ctx_r1.isMobile() ? "small" : "regular");
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r1.form.dirty ? 1 : 2);
  }
}
function AddCategoryFormComponent_Conditional_12_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275text(0);
    \u0275\u0275pipe(1, "translate");
  }
  if (rf & 2) {
    \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind1(1, 1, "settings.category.add"), " ");
  }
}
function AddCategoryFormComponent_Conditional_12_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275text(0);
    \u0275\u0275pipe(1, "translate");
  }
  if (rf & 2) {
    \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind1(1, 1, "settings.category.enter-name"), " ");
  }
}
function AddCategoryFormComponent_Conditional_12_Template(rf, ctx) {
  if (rf & 1) {
    const _r3 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "lg-button", 8);
    \u0275\u0275listener("click", function AddCategoryFormComponent_Conditional_12_Template_lg_button_click_0_listener() {
      \u0275\u0275restoreView(_r3);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.addCategory());
    });
    \u0275\u0275conditionalCreate(1, AddCategoryFormComponent_Conditional_12_Conditional_1_Template, 2, 3)(2, AddCategoryFormComponent_Conditional_12_Conditional_2_Template, 2, 3);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275styleMap("primary");
    \u0275\u0275property("disabled", !ctx_r1.form.dirty)("size", ctx_r1.isMobile() ? "small" : "regular");
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
  isMobile = matchMediaSignal(mobileBreakpoint);
  form = new FormGroup({
    name: new FormControl("", Validators.required)
  });
  category = signal(void 0, ...ngDevMode ? [{ debugName: "category" }] : []);
  uuid = input("", ...ngDevMode ? [{ debugName: "uuid" }] : []);
  onSaved = new EventEmitter();
  uuidEffect = effect(() => {
    if (!this.uuid()) {
      this.category.set(CategoryProduct.empty());
      return;
    }
    this._categoryRepository.getOne(this.uuid()).then((category) => {
      this.reset(category);
    }).catch((error) => {
      this._notificationsService.error(errorHandler(error));
    });
  }, ...ngDevMode ? [{ debugName: "uuidEffect" }] : []);
  _destroyRef = inject(DestroyRef);
  reset(category) {
    this.form.reset(categoryProductToFormValue(category));
    this.category.set(category);
    this.form.markAsPristine();
  }
  ngOnInit() {
    this.form.valueChanges.pipe(takeUntilDestroyed(this._destroyRef)).subscribe((values) => {
      this.category()?.update(categoryProductDTOFromFormValue(values));
    });
  }
  addCategory() {
    if (!this.category() || !this.form.dirty) {
      return Promise.resolve();
    }
    return this._categoryRepository.addOne(this.category()).then(() => {
      this.onSaved.emit(this.uuid());
      this.form.reset({
        name: ""
      });
      this._notificationsService.success("settings.category.added");
      this.form.markAsPristine();
      this._categoryRepository.loadAll();
    }).catch((error) => {
      this._notificationsService.error(errorHandler(error));
    });
  }
  editCategory() {
    if (!this.category() || !this.form.dirty) {
      return Promise.resolve();
    }
    return this._categoryRepository.updateOne(this.uuid(), this.category()).then(() => {
      this.onSaved.emit(this.uuid());
      this.form.reset({
        name: ""
      });
      this._notificationsService.success("settings.category.edited");
      this.form.markAsPristine();
      this._categoryRepository.loadAll();
    }).catch((error) => {
      this._notificationsService.error(errorHandler(error));
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
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _AddCategoryFormComponent, selectors: [["lg-add-category-form"]], inputs: { uuid: [1, "uuid"] }, outputs: { onSaved: "onSaved" }, decls: 13, vars: 12, consts: [[3, "size"], [1, "text-small"], [3, "formGroup"], [3, "bottom", "size"], ["lgExpand", ""], ["formControlName", "name", 3, "onEnter", "placeholder", "size"], ["lgNoWrap", ""], [3, "disabled", "style", "size"], [3, "click", "disabled", "size"]], template: function AddCategoryFormComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "lg-fade-in")(1, "lg-flex-column", 0)(2, "div", 1);
      \u0275\u0275text(3);
      \u0275\u0275pipe(4, "translate");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(5, "form", 2)(6, "lg-flex-row", 3)(7, "lg-control", 4)(8, "lg-input", 5);
      \u0275\u0275pipe(9, "translate");
      \u0275\u0275listener("onEnter", function AddCategoryFormComponent_Template_lg_input_onEnter_8_listener() {
        return ctx.onEnter();
      });
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(10, "div", 6);
      \u0275\u0275conditionalCreate(11, AddCategoryFormComponent_Conditional_11_Template, 3, 5, "lg-button", 7)(12, AddCategoryFormComponent_Conditional_12_Template, 3, 5, "lg-button", 7);
      \u0275\u0275elementEnd()()()()();
    }
    if (rf & 2) {
      \u0275\u0275advance();
      \u0275\u0275property("size", "small");
      \u0275\u0275advance(2);
      \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(4, 8, "categories.add-recipe"));
      \u0275\u0275advance(2);
      \u0275\u0275property("formGroup", ctx.form);
      \u0275\u0275advance();
      \u0275\u0275property("bottom", true)("size", "medium");
      \u0275\u0275advance(2);
      \u0275\u0275property("placeholder", \u0275\u0275pipeBind1(9, 10, "settings.category.placeholder"))("size", ctx.isMobile() ? "small" : "normal");
      \u0275\u0275advance(3);
      \u0275\u0275conditional(ctx.uuid() ? 11 : 12);
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
    FadeInComponent,
    FlexColumnComponent,
    TranslatePipe
  ], encapsulation: 2 });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(AddCategoryFormComponent, [{
    type: Component,
    args: [{ selector: "lg-add-category-form", standalone: true, template: `
    <lg-fade-in>
      <lg-flex-column [size]="'small'">
        <div class="text-small">{{ 'categories.add-recipe' | translate }}</div>

        <form [formGroup]="form">
          <lg-flex-row [bottom]="true"
                       [size]="'medium'">
            <lg-control lgExpand>
              <lg-input (onEnter)="onEnter()"
                        [placeholder]="'settings.category.placeholder' | translate"
                        [size]="isMobile() ? 'small' : 'normal'"
                        formControlName="name"></lg-input>
            </lg-control>

            <div lgNoWrap>
              @if (uuid()) {
                <lg-button [disabled]="!form.dirty"
                           [style]="'primary'"
                           [size]="isMobile() ? 'small' : 'regular'"
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
                           [size]="isMobile() ? 'small' : 'regular'"
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
      </lg-flex-column>
    </lg-fade-in>
  `, imports: [
      ReactiveFormsModule,
      InputComponent,
      ControlComponent,
      ButtonComponent,
      FlexRowComponent,
      ExpandDirective,
      NoWrapDirective,
      TranslatePipe,
      FadeInComponent,
      FlexColumnComponent
    ] }]
  }], () => [{ type: CategoryProductsRepository }, { type: NotificationsService }], { uuid: [{ type: Input, args: [{ isSignal: true, alias: "uuid", required: false }] }], onSaved: [{
    type: Output
  }] });
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(AddCategoryFormComponent, { className: "AddCategoryFormComponent", filePath: "src/app/features/settings/view/categories/category-product/add-category/add-category-form.component.ts", lineNumber: 88 });
})();
export {
  AddCategoryFormComponent
};
//# sourceMappingURL=chunk-3QNACHDK.js.map
