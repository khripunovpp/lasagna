import {
  NoWrapDirective
} from "./chunk-V3HUHKPT.js";
import {
  ControlComponent
} from "./chunk-UG57K3PX.js";
import {
  InputComponent
} from "./chunk-5T3D763N.js";
import "./chunk-PMLGVE7W.js";
import {
  ExpandDirective
} from "./chunk-MZW34F72.js";
import {
  ContainerComponent
} from "./chunk-I5TV5PZO.js";
import {
  FlexRowComponent
} from "./chunk-HD3CIKT2.js";
import {
  CardComponent
} from "./chunk-5WBLL5RM.js";
import "./chunk-R64U7JLD.js";
import {
  FadeInComponent
} from "./chunk-CFXO4QN2.js";
import "./chunk-R4FNXVZE.js";
import {
  TitleComponent
} from "./chunk-XDUS4EDS.js";
import {
  CategoryRecipesRepository,
  SelectResourcesService
} from "./chunk-UR2JK3SC.js";
import "./chunk-B7U2Y5MS.js";
import "./chunk-2EB4YEVS.js";
import "./chunk-M36IWQ2M.js";
import {
  CategoryRecipe,
  NotificationsService,
  categoryRecipeDTOFromFormValue,
  categoryRecipeToFormValue
} from "./chunk-47KQBWHW.js";
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
} from "./chunk-35FYRUF7.js";
import "./chunk-IWOUTMKL.js";
import {
  ButtonComponent
} from "./chunk-WXEPVKGR.js";
import "./chunk-2WAYXBXK.js";
import "./chunk-5WJUMO7X.js";
import {
  TranslatePipe
} from "./chunk-5DXDC4YK.js";
import {
  ActivatedRoute,
  Router
} from "./chunk-4GIPLJK3.js";
import "./chunk-GWD65WQG.js";
import "./chunk-NOT5QO64.js";
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
  ɵɵpipe,
  ɵɵpipeBind1,
  ɵɵproperty,
  ɵɵresetView,
  ɵɵrestoreView,
  ɵɵstyleMap,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1
} from "./chunk-CHNANXCD.js";
import "./chunk-PZQLIUCM.js";
import "./chunk-7YWLATDR.js";
import "./chunk-46DXP6YY.js";

// src/app/features/settings/view/categories/category-recipe/add-category/add-category-recipe-form.component.ts
function AddCategoryRecipeFormComponent_Conditional_7_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275text(0);
    \u0275\u0275pipe(1, "translate");
  }
  if (rf & 2) {
    \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind1(1, 1, "settings.category.save"), " ");
  }
}
function AddCategoryRecipeFormComponent_Conditional_7_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275text(0);
    \u0275\u0275pipe(1, "translate");
  }
  if (rf & 2) {
    \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind1(1, 1, "settings.category.no-changes"), " ");
  }
}
function AddCategoryRecipeFormComponent_Conditional_7_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "lg-button", 6);
    \u0275\u0275listener("click", function AddCategoryRecipeFormComponent_Conditional_7_Template_lg_button_click_0_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.editCategory());
    });
    \u0275\u0275conditionalCreate(1, AddCategoryRecipeFormComponent_Conditional_7_Conditional_1_Template, 2, 3)(2, AddCategoryRecipeFormComponent_Conditional_7_Conditional_2_Template, 2, 3);
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
function AddCategoryRecipeFormComponent_Conditional_8_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275text(0);
    \u0275\u0275pipe(1, "translate");
  }
  if (rf & 2) {
    \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind1(1, 1, "settings.category.add"), " ");
  }
}
function AddCategoryRecipeFormComponent_Conditional_8_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275text(0);
    \u0275\u0275pipe(1, "translate");
  }
  if (rf & 2) {
    \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind1(1, 1, "settings.category.enter-name"), " ");
  }
}
function AddCategoryRecipeFormComponent_Conditional_8_Template(rf, ctx) {
  if (rf & 1) {
    const _r3 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "lg-button", 6);
    \u0275\u0275listener("click", function AddCategoryRecipeFormComponent_Conditional_8_Template_lg_button_click_0_listener() {
      \u0275\u0275restoreView(_r3);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.addCategory());
    });
    \u0275\u0275conditionalCreate(1, AddCategoryRecipeFormComponent_Conditional_8_Conditional_1_Template, 2, 3)(2, AddCategoryRecipeFormComponent_Conditional_8_Conditional_2_Template, 2, 3);
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
  category = signal(void 0, ...ngDevMode ? [{ debugName: "category" }] : []);
  uuid = input("", ...ngDevMode ? [{ debugName: "uuid" }] : []);
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
  }, ...ngDevMode ? [{ debugName: "uuidEffect" }] : []);
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
      this._notificationsService.success("settings.category.added");
      this.form.markAsPristine();
    });
  }
  editCategory() {
    if (!this.category() || !this.form.dirty) {
      return Promise.resolve();
    }
    return this._categoryRepository.editCategory(this.uuid(), this.category()).then(() => {
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
  static \u0275fac = function AddCategoryRecipeFormComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _AddCategoryRecipeFormComponent)(\u0275\u0275directiveInject(CategoryRecipesRepository), \u0275\u0275directiveInject(SelectResourcesService), \u0275\u0275directiveInject(Router), \u0275\u0275directiveInject(NotificationsService));
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _AddCategoryRecipeFormComponent, selectors: [["lg-add-category-recipe-form"]], inputs: { uuid: [1, "uuid"] }, decls: 9, vars: 10, consts: [[3, "formGroup"], [3, "bottom", "mobileMode"], ["lgExpand", "", 3, "label"], ["formControlName", "name", 3, "onEnter", "placeholder"], ["lgNoWrap", ""], [3, "disabled", "style"], [3, "click", "disabled"]], template: function AddCategoryRecipeFormComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "form", 0)(1, "lg-flex-row", 1)(2, "lg-control", 2);
      \u0275\u0275pipe(3, "translate");
      \u0275\u0275elementStart(4, "lg-input", 3);
      \u0275\u0275pipe(5, "translate");
      \u0275\u0275listener("onEnter", function AddCategoryRecipeFormComponent_Template_lg_input_onEnter_4_listener() {
        return ctx.onEnter();
      });
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(6, "div", 4);
      \u0275\u0275conditionalCreate(7, AddCategoryRecipeFormComponent_Conditional_7_Template, 3, 4, "lg-button", 5)(8, AddCategoryRecipeFormComponent_Conditional_8_Template, 3, 4, "lg-button", 5);
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
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(AddCategoryRecipeFormComponent, [{
    type: Component,
    args: [{ selector: "lg-add-category-recipe-form", standalone: true, template: `
    <form [formGroup]="form">
      <lg-flex-row [bottom]="true" [mobileMode]="true">
        <lg-control [label]="'settings.category.name' | translate" lgExpand>
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
          }
        </div>
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
  }], () => [{ type: CategoryRecipesRepository }, { type: SelectResourcesService, decorators: [{
    type: Inject,
    args: [SelectResourcesService]
  }] }, { type: Router }, { type: NotificationsService }], null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(AddCategoryRecipeFormComponent, { className: "AddCategoryRecipeFormComponent", filePath: "src/app/features/settings/view/categories/category-recipe/add-category/add-category-recipe-form.component.ts", lineNumber: 69 });
})();

// src/app/features/settings/view/categories/category-recipe/add-category/add-category-recipe.component.ts
var AddCategoryRecipeComponent = class _AddCategoryRecipeComponent {
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
  static \u0275fac = function AddCategoryRecipeComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _AddCategoryRecipeComponent)(\u0275\u0275directiveInject(ActivatedRoute));
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _AddCategoryRecipeComponent, selectors: [["lg-add-category-recipe"]], decls: 9, vars: 7, consts: [[3, "center"], [3, "uuid"]], template: function AddCategoryRecipeComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "lg-fade-in")(1, "lg-container")(2, "lg-flex-row", 0)(3, "lg-title");
      \u0275\u0275text(4);
      \u0275\u0275pipe(5, "translate");
      \u0275\u0275pipe(6, "translate");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(7, "lg-card");
      \u0275\u0275element(8, "lg-add-category-recipe-form", 1);
      \u0275\u0275elementEnd()()();
    }
    if (rf & 2) {
      \u0275\u0275advance(2);
      \u0275\u0275property("center", true);
      \u0275\u0275advance(2);
      \u0275\u0275textInterpolate(ctx.uuid() ? \u0275\u0275pipeBind1(5, 3, "categories.edit-recipe") : \u0275\u0275pipeBind1(6, 5, "categories.add-recipe"));
      \u0275\u0275advance(4);
      \u0275\u0275property("uuid", ctx.uuid());
    }
  }, dependencies: [
    FadeInComponent,
    ContainerComponent,
    FlexRowComponent,
    TitleComponent,
    AddCategoryRecipeFormComponent,
    CardComponent,
    TranslatePipe
  ], encapsulation: 2 });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(AddCategoryRecipeComponent, [{
    type: Component,
    args: [{ selector: "lg-add-category-recipe", standalone: true, imports: [
      FadeInComponent,
      ContainerComponent,
      FlexRowComponent,
      TitleComponent,
      AddCategoryRecipeFormComponent,
      CardComponent,
      TranslatePipe
    ], template: `
    <lg-fade-in>
      <lg-container>
        <lg-flex-row [center]="true">
          <lg-title>{{ uuid() ? ('categories.edit-recipe' | translate) : ('categories.add-recipe' | translate) }}</lg-title>
        </lg-flex-row>

        <lg-card>
          <lg-add-category-recipe-form [uuid]="uuid()"></lg-add-category-recipe-form>
        </lg-card>
      </lg-container>
    </lg-fade-in>
  ` }]
  }], () => [{ type: ActivatedRoute }], null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(AddCategoryRecipeComponent, { className: "AddCategoryRecipeComponent", filePath: "src/app/features/settings/view/categories/category-recipe/add-category/add-category-recipe.component.ts", lineNumber: 41 });
})();
export {
  AddCategoryRecipeComponent
};
//# sourceMappingURL=chunk-SZPOJ2DG.js.map
