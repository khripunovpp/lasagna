import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  effect,
  inject,
  input,
  OnInit,
  signal,
  viewChild
} from '@angular/core';
import {ControlContainer, FormArray, FormGroup, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {ControlGroupComponent} from '../../../controls/form/control-group.component';
import {FlexColumnComponent} from '../../../../shared/view/layout/flex-column.component';
import {ButtonComponent} from '../../../../shared/view/ui/button/button.component';
import {debounceTime} from 'rxjs';
import {RecipesRepository} from '../../service/providers/recipes.repository';
import {MultiselectComponent} from '../../../controls/form/multiselect.component';
import {SelectResourcesService} from '../../../../shared/service/services/select-resources.service';
import {NumberInputComponent} from '../../../controls/form/number-input.component';
import {ExpandDirective} from '../../../../shared/view/directives/expand.directive';
import {ParseMathDirective} from '../../../../shared/view/directives/parse-math.directive';
import {NotificationsService} from '../../../../shared/service/services/notifications.service';
import {injectParams} from '../../../../shared/helpers/route.helpers';
import {ChipsListComponent} from '../../../controls/form/chips-list.component';
import {AutocompleteComponent} from '../../../controls/form/autocomplete.component';
import {Recipe} from '../../service/models/Recipe';
import {Ingredient} from '../../service/models/Ingredient';
import {getIngredientGroup, recipeToFormValue} from '../../service/helpers/recipe.helpers';
import {MatIcon} from '@angular/material/icon';
import {TranslatePipe, TranslateService} from "@ngx-translate/core";
import {UnitSwitcherComponent} from '../../../../shared/view/ui/unit-switcher.component';
import {CardComponent} from '../../../../shared/view/ui/card/card.component';
import {ControlExtraTemplateDirective} from "../../../controls/form/control-extra-template.directive";
import {TagsControlComponent} from '../../../controls/form/tags-control.component';
import {FlexRowComponent} from '../../../../shared/view/layout/flex-row.component';
import {ControlComponent} from "../../../controls/form/control-item/control.component";
import {UnitValue} from '../../../../shared/view/const/units.const';
import {EntityItemSelectorComponent} from '@invoices/view/add-invoice/parts/entity-item-selector.component';
import {SwitchComponent} from '../../../controls/form/switch.component';
import {InputComponent} from '../../../controls/form/input.component';
import {ControlBoxComponent} from '../../../controls/form/control-box.component';
import {SelfStartDirective} from '../../../../shared/view/directives/self-start.directive';
import {WidthDirective} from '../../../../shared/view/directives/width.directive';
import {productLabelFactoryProvider} from '../../../../shared/factories/entity-labels/product.label.factory';
import {errorHandler} from '../../../../shared/helpers';
import {HtmlEditorComponent} from '../../../../shared/view/ui/html-editor/html-editor.component';
import {ControlTemplateDirective} from '../../../controls/form/control-template.directive';
import {SettingsKeysConst} from '../../../settings/const/settings-keys.const';
import {SettingsService} from '../../../settings/service/services/settings.service';
import {UserCurrencyPipe} from '../../../../shared/view/pipes/userCurrency.pipe';
import {UnitStringPipe} from '../../../../shared/view/pipes/unitString.pipe';
import {getIngredientGroup} from './add-recipe.helpers';
import {PricePerUnitComponent} from '../../../../shared/view/ui/numbers/price-per-unit.component';
import {IS_CLIENT} from '../../../../shared/service/tokens/isClient.token';

@Component({
  selector: 'lg-add-recipe-form',
  standalone: true,
  templateUrl: './add-recipe-form.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    ReactiveFormsModule,
    ControlGroupComponent,
    FlexColumnComponent,
    ButtonComponent,
    MultiselectComponent,
    NumberInputComponent,
    ExpandDirective,
    ParseMathDirective,
    ChipsListComponent,
    FormsModule,
    MatIcon,
    TranslatePipe,
    UnitSwitcherComponent,
    CardComponent,
    ControlExtraTemplateDirective,
    TagsControlComponent,
    FlexRowComponent,
    ControlComponent,
    EntityItemSelectorComponent,
    SwitchComponent,
    InputComponent,
    ControlBoxComponent,
    SelfStartDirective,
    WidthDirective,
    HtmlEditorComponent,
    ControlTemplateDirective,
    PricePerUnitComponent
  ],
  providers: [
    {
      provide: SelectResourcesService,
      useClass: SelectResourcesService,
    }
  ],
})
export class AddRecipeFormComponent
  implements OnInit,
    AfterViewInit {
  constructor(
    public _recipesRepository: RecipesRepository,
    public _selectResourcesService: SelectResourcesService,
    private _notificationsService: NotificationsService,
    private _settingsService: SettingsService,
    private _controlContainer: ControlContainer,
    private _translateService: TranslateService,
  ) {
  }

  editMode = input(false);
  recipe = input<Recipe | undefined>(undefined);
  uuid = injectParams<string>('uuid');
  form?: FormGroup;
  recipeFieldState = signal<Record<number, boolean>>({});
  nameField = viewChild<AutocompleteComponent>('nameField');
  topCategories = signal<any[]>([]);
  isClient = inject(IS_CLIENT);
  protected readonly UnitValue = UnitValue;
  protected readonly productLabelFactory = inject(productLabelFactoryProvider);
  private recipeEffect = effect(() => {
    if (this.recipe()) {
      this.fillForm(this.recipe()!);
    }
  });

  get ingredients() {
    return this.form?.get('ingredients') as FormArray || undefined;
  }

  ngOnInit() {
    this.form = this._controlContainer.control as FormGroup;
    this._loadUsingHistory();
  }

  ngAfterViewInit() {
    this._selectResourcesService.load().then(resources => {
      if (!this.editMode()) {
        this.nameField()!.focus();
      }
    }).catch(err => {
      this._notificationsService.error(errorHandler(err));
    });
  }

  fillForm(
    recipe?: Recipe
  ) {
    this.form?.reset({
      ingredients: [],
    });
    this.ingredients.clear();

    if (!recipe) {
      return;
    }
    this.form?.reset({
      ...recipeToFormValue(recipe),
      ingredients: [],
    });

    if (recipe.ingredients.length) {
      recipe.ingredients.forEach((ingredient: Ingredient, index: number) => {
        this.ingredients.push(this._getIngredientGroup(ingredient));

        if (ingredient.recipe_id) {
          this.openRecipeField(index);
        }
      })
    } else {
      this.ingredients.push(this._getIngredientGroup());
    }

    this.form?.updateValueAndValidity();
    this.form?.markAsPristine();
  }

  resetForm(
    recipe?: Recipe
  ) {
    this.fillForm(recipe);
    this._loadUsingHistory();
    this.form?.markAsPristine();
  }

  validateForm() {
    if (!this._formValid) {
      const errors = this._notificationsService.parseFormErrors(this.form, {
        keysMap: {
          required: this._translateService.instant('form.error.required'),
          ingredientAmountRequired: this._translateService.instant('recipe.form.error.ingredient-amount-required'),
          ingredientRequired: this._translateService.instant('recipe.form.error.ingredient-required'),
          cycleRecipe: this._translateService.instant('recipe.form.error.cycle-recipe'),
        },
        controlsMap: {
          name: this._translateService.instant('recipe.form.validation-name.name'),
          portions: this._translateService.instant('recipe.form.validation-name.portions'),
          ingredients: this._translateService.instant('recipe.form.validation-name.ingredients'),
          category_id: this._translateService.instant('recipe.form.validation-name.category'),
          tags: this._translateService.instant('recipe.form.validation-name.tags'),
        },
      });
      this._notificationsService.error(errors.join('\n'));
      return false;
    }
    return true
  }

  addLast() {
    const lastControl = this.ingredients.at(this.ingredients.length - 1);
    // if last control is empty, skip, if not, add new control
    if (lastControl.value.name || lastControl.value.amount || lastControl.value.product_id) {
      this.addIngredient();
    }
  }

  ngOnInit() {
    if (!this.isClient) {
      return;
    }
    this._loadUsingHistory();
    this.form.valueChanges.pipe(
      debounceTime(100),
    ).subscribe({
      next: values => {
        if (!this.form.dirty) {
          return
        }
        this.recipe()?.update(this.form.getRawValue());
        const hasCycledRecipe = this.checkCycleRecipe(this.form.getRawValue().ingredients, this.uuid());
        if (hasCycledRecipe) {
          this._notificationsService.error('recipe.form.error.cycle-recipe');
        }
      }
    });
  }

  ngAfterViewInit() {
    this._selectResourcesService.load().then(resources => {
      if (!this.editMode()) {
        this.nameField()!.focus();
      }
    }).catch(err => {
      this._notificationsService.error(errorHandler(err));
    });
  }

  addIngredient() {
    this.ingredients.push(this._getIngredientGroup());
    this.form?.markAsDirty();
  }

  deleteIngredient(index: number) {
    this.ingredients.removeAt(index);
    this.form?.markAsDirty();
  }

  onIngredientSelected(
    amount: NumberInputComponent,
    index: number,
    clearField: string | string[],
  ) {
    amount.focus();

    const value = this.ingredients.at(index).value;

    this.ingredients.at(index).patchValue({
      ...(Array.isArray(clearField) ? clearField.reduce((acc, field) => ({
        ...acc,
        [field]: null
      }), {}) : {[clearField]: null}),
      unit: value.product_id?.unit || value.recipe_id?.unit || UnitValue.GRAM
    });
  }

  openRecipeField(
    index: number
  ) {
    this.recipeFieldState.update((value) => {
      return {
        ...value,
        [index]: true,
      }
    });
  }

  closeRecipeField(
    index: number
  ) {
    this.recipeFieldState.update((value) => {
      return {
        ...value,
        [index]: false,
      }
    });
  }

  private _getIngredientGroup = (
    ingredient?: Recipe['ingredients'][number],
  ) => {
    return getIngredientGroup(
      this.form!,
      ingredient,
      this.uuid(),
    );
  }

  private _loadUsingHistory() {
    this._recipesRepository.getTopCategories()
      .then(categories => {
        this.topCategories.set(categories.map(category => ({
          label: category.name,
          value: {
            uuid: category.uuid,
            name: category.name,
          },
        })));
      }).catch(err => {
      this._notificationsService.error(errorHandler(err));
    });
  }

}
