import {
  NoWrapDirective
} from "./chunk-V5NOU6G6.js";
import {
  ControlComponent
} from "./chunk-7D43YVDH.js";
import {
  InputComponent
} from "./chunk-MGKNDLQM.js";
import {
  ExpandDirective
} from "./chunk-MJ7CZNNR.js";
import {
  CardComponent
} from "./chunk-YLXBTOXB.js";
import {
  ContainerComponent
} from "./chunk-U5POLJOC.js";
import {
  GapRowComponent
} from "./chunk-RWMLY22Y.js";
import "./chunk-R64U7JLD.js";
import {
  FadeInComponent
} from "./chunk-JNX3I5QY.js";
import "./chunk-HNJAQDA3.js";
import {
  TitleComponent
} from "./chunk-F2TP5Q2W.js";
import {
  CategoryRecipesRepository,
  SelectResourcesService
} from "./chunk-LVU2JMH2.js";
import "./chunk-XLVGBYUT.js";
import {
  ButtonComponent,
  CategoryRecipe,
  FormControl,
  FormControlName,
  FormGroup,
  FormGroupDirective,
  NgControlStatus,
  NgControlStatusGroup,
  NotificationsService,
  ReactiveFormsModule,
  Validators,
  categoryRecipeDTOFromFormValue,
  categoryRecipeToFormValue,
  ɵNgNoValidate
} from "./chunk-EH6A44OR.js";
import {
  ActivatedRoute,
  Router
} from "./chunk-UGLIF2MQ.js";
import "./chunk-Q4M4NLQD.js";
import "./chunk-5WJUMO7X.js";
import "./chunk-5MHPI2FA.js";
import {
  Component,
  Inject,
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
  ɵɵproperty,
  ɵɵresetView,
  ɵɵrestoreView,
  ɵɵtext,
  ɵɵtextInterpolate1
} from "./chunk-6AETQSBA.js";
import "./chunk-PZQLIUCM.js";
import "./chunk-46DXP6YY.js";

// src/app/features/settings/view/categories/category-recipe/add-category/add-category-recipe-form.component.ts
function AddCategoryRecipeFormComponent_Conditional_5_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275text(0, " Save category ");
  }
}
function AddCategoryRecipeFormComponent_Conditional_5_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275text(0, " No changes ");
  }
}
function AddCategoryRecipeFormComponent_Conditional_5_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "lg-button", 6);
    \u0275\u0275listener("click", function AddCategoryRecipeFormComponent_Conditional_5_Template_lg_button_click_0_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.editCategory());
    });
    \u0275\u0275conditionalCreate(1, AddCategoryRecipeFormComponent_Conditional_5_Conditional_1_Template, 1, 0)(2, AddCategoryRecipeFormComponent_Conditional_5_Conditional_2_Template, 1, 0);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275property("disabled", !ctx_r1.form.dirty);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r1.form.dirty ? 1 : 2);
  }
}
function AddCategoryRecipeFormComponent_Conditional_6_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275text(0, " Add category ");
  }
}
function AddCategoryRecipeFormComponent_Conditional_6_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275text(0, " Enter a name ");
  }
}
function AddCategoryRecipeFormComponent_Conditional_6_Template(rf, ctx) {
  if (rf & 1) {
    const _r3 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "lg-button", 6);
    \u0275\u0275listener("click", function AddCategoryRecipeFormComponent_Conditional_6_Template_lg_button_click_0_listener() {
      \u0275\u0275restoreView(_r3);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.addCategory());
    });
    \u0275\u0275conditionalCreate(1, AddCategoryRecipeFormComponent_Conditional_6_Conditional_1_Template, 1, 0)(2, AddCategoryRecipeFormComponent_Conditional_6_Conditional_2_Template, 1, 0);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275property("disabled", !ctx_r1.form.dirty);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r1.form.dirty ? 1 : 2);
  }
}
var AddCategoryRecipeFormComponent = class _AddCategoryRecipeFormComponent {
  _categoryRepository;
  _selectResourcesService;
  _router;
  _notificationsService;
  constructor(_categoryRepository, _selectResourcesService, _router, _notificationsService) {
    this._categoryRepository = _categoryRepository;
    this._selectResourcesService = _selectResourcesService;
    this._router = _router;
    this._notificationsService = _notificationsService;
  }
  form = new FormGroup({
    name: new FormControl("", Validators.required)
  });
  category = signal(void 0);
  uuid = input("");
  uuidEffect = effect(() => {
    if (!this.uuid()) {
      this.category.set(CategoryRecipe.empty());
      return;
    }
    this._categoryRepository.getOne(this.uuid()).then((category) => {
      this.form.reset(categoryRecipeToFormValue(category));
      this.category.set(category);
      this.form.markAsPristine();
    });
  });
  ngOnInit() {
    this.form.valueChanges.subscribe((values) => {
      this.category()?.update(categoryRecipeDTOFromFormValue(values));
    });
  }
  addCategory() {
    if (!this.category() || !this.form.dirty) {
      return Promise.resolve();
    }
    return this._categoryRepository.addCategory(this.category()).then(() => {
      this.form.reset({
        name: ""
      });
      this._notificationsService.success("Category added");
      this.form.markAsPristine();
    });
  }
  editCategory() {
    if (!this.category() || !this.form.dirty) {
      return Promise.resolve();
    }
    return this._categoryRepository.editCategory(this.uuid(), this.category()).then(() => {
      this._notificationsService.success("Category edited");
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
  static \u0275fac = function AddCategoryRecipeFormComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _AddCategoryRecipeFormComponent)(\u0275\u0275directiveInject(CategoryRecipesRepository), \u0275\u0275directiveInject(SelectResourcesService), \u0275\u0275directiveInject(Router), \u0275\u0275directiveInject(NotificationsService));
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _AddCategoryRecipeFormComponent, selectors: [["lg-add-category-recipe-form"]], inputs: { uuid: [1, "uuid"] }, decls: 7, vars: 5, consts: [[3, "formGroup"], [3, "bottom", "mobileMode"], ["label", "Name", "lgExpand", ""], ["formControlName", "name", 3, "onEnter", "placeholder"], ["lgNoWrap", ""], [3, "disabled"], [3, "click", "disabled"]], template: function AddCategoryRecipeFormComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "form", 0)(1, "lg-gap-row", 1)(2, "lg-control", 2)(3, "lg-input", 3);
      \u0275\u0275listener("onEnter", function AddCategoryRecipeFormComponent_Template_lg_input_onEnter_3_listener() {
        return ctx.onEnter();
      });
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(4, "div", 4);
      \u0275\u0275conditionalCreate(5, AddCategoryRecipeFormComponent_Conditional_5_Template, 3, 2, "lg-button", 5)(6, AddCategoryRecipeFormComponent_Conditional_6_Template, 3, 2, "lg-button", 5);
      \u0275\u0275elementEnd()()();
    }
    if (rf & 2) {
      \u0275\u0275property("formGroup", ctx.form);
      \u0275\u0275advance();
      \u0275\u0275property("bottom", true)("mobileMode", true);
      \u0275\u0275advance(2);
      \u0275\u0275property("placeholder", "Your category name");
      \u0275\u0275advance(2);
      \u0275\u0275conditional(ctx.uuid() ? 5 : 6);
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
    GapRowComponent,
    ExpandDirective,
    NoWrapDirective
  ], encapsulation: 2 });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(AddCategoryRecipeFormComponent, [{
    type: Component,
    args: [{ selector: "lg-add-category-recipe-form", standalone: true, template: `
      <form [formGroup]="form">
          <lg-gap-row [bottom]="true" [mobileMode]="true">
              <lg-control label="Name" lgExpand>
                  <lg-input (onEnter)="onEnter()"
                            [placeholder]="'Your category name'"
                            formControlName="name"></lg-input>
              </lg-control>

              <div lgNoWrap>
                  @if (uuid()) {
                      <lg-button [disabled]="!form.dirty"
                                 (click)="editCategory()">
                          @if (form.dirty) {
                              Save category
                          } @else {
                              No changes
                          }
                      </lg-button>
                  } @else {
                      <lg-button [disabled]="!form.dirty" (click)="addCategory()">
                          @if (form.dirty) {
                              Add category
                          } @else {
                              Enter a name
                          }
                      </lg-button>
                  }
              </div>
          </lg-gap-row>
      </form>
  `, imports: [
      ReactiveFormsModule,
      InputComponent,
      ControlComponent,
      ButtonComponent,
      GapRowComponent,
      ExpandDirective,
      NoWrapDirective
    ] }]
  }], () => [{ type: CategoryRecipesRepository }, { type: SelectResourcesService, decorators: [{
    type: Inject,
    args: [SelectResourcesService]
  }] }, { type: Router }, { type: NotificationsService }], null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(AddCategoryRecipeFormComponent, { className: "AddCategoryRecipeFormComponent", filePath: "src/app/features/settings/view/categories/category-recipe/add-category/add-category-recipe-form.component.ts", lineNumber: 64 });
})();

// src/app/features/settings/view/categories/category-recipe/add-category/add-category-recipe.component.ts
var AddCategoryRecipeComponent = class _AddCategoryRecipeComponent {
  _aRoute;
  constructor(_aRoute) {
    this._aRoute = _aRoute;
  }
  uuid = signal("");
  ngOnInit() {
    this._aRoute.params.subscribe((params) => {
      this.uuid.set(params["uuid"]);
    });
  }
  static \u0275fac = function AddCategoryRecipeComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _AddCategoryRecipeComponent)(\u0275\u0275directiveInject(ActivatedRoute));
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _AddCategoryRecipeComponent, selectors: [["lg-add-category-recipe"]], decls: 7, vars: 3, consts: [[3, "center"], [3, "uuid"]], template: function AddCategoryRecipeComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "lg-fade-in")(1, "lg-container")(2, "lg-gap-row", 0)(3, "lg-title");
      \u0275\u0275text(4);
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(5, "lg-card");
      \u0275\u0275element(6, "lg-add-category-recipe-form", 1);
      \u0275\u0275elementEnd()()();
    }
    if (rf & 2) {
      \u0275\u0275advance(2);
      \u0275\u0275property("center", true);
      \u0275\u0275advance(2);
      \u0275\u0275textInterpolate1("", ctx.uuid() ? "Edit" : "Add", " recipe category");
      \u0275\u0275advance(2);
      \u0275\u0275property("uuid", ctx.uuid());
    }
  }, dependencies: [
    FadeInComponent,
    ContainerComponent,
    GapRowComponent,
    TitleComponent,
    AddCategoryRecipeFormComponent,
    CardComponent
  ], encapsulation: 2 });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(AddCategoryRecipeComponent, [{
    type: Component,
    args: [{ selector: "lg-add-category-recipe", standalone: true, imports: [
      FadeInComponent,
      ContainerComponent,
      GapRowComponent,
      TitleComponent,
      AddCategoryRecipeFormComponent,
      CardComponent
    ], template: `
      <lg-fade-in>
          <lg-container>
              <lg-gap-row [center]="true">
                  <lg-title>{{ uuid() ? 'Edit' : 'Add' }} recipe category</lg-title>
              </lg-gap-row>

              <lg-card>
                  <lg-add-category-recipe-form [uuid]="uuid()"></lg-add-category-recipe-form>
              </lg-card>
          </lg-container>
      </lg-fade-in>
  ` }]
  }], () => [{ type: ActivatedRoute }], null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(AddCategoryRecipeComponent, { className: "AddCategoryRecipeComponent", filePath: "src/app/features/settings/view/categories/category-recipe/add-category/add-category-recipe.component.ts", lineNumber: 39 });
})();
export {
  AddCategoryRecipeComponent
};
//# sourceMappingURL=chunk-FZ6HUJYS.js.map
