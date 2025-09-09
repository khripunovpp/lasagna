import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  effect,
  input,
  OnInit,
  signal,
  viewChild,
  viewChildren
} from '@angular/core';
import {FormArray, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {ControlGroupComponent} from '../../../controls/form/control-group.component';
import {FlexColumnComponent} from '../../../../shared/view/layout/flex-column.component';
import {ButtonComponent} from '../../../../shared/view/ui/button.component';
import {TextareaComponent} from '../../../controls/form/textarea.component';
import {debounceTime} from 'rxjs';
import {RecipesRepository} from '../../service/recipes.repository';
import {MultiselectComponent} from '../../../controls/form/multiselect.component';
import {SelectResourcesService} from '../../../../shared/service/services/select-resources.service';
import {ActivatedRoute, Router} from '@angular/router';
import {NumberInputComponent} from '../../../controls/form/number-input.component';
import {ControlsRowComponent} from '../../../controls/form/controls-row.component';
import {ExpandDirective} from '../../../../shared/view/directives/expand.directive';
import {ParseMathDirective} from '../../../../shared/view/directives/parse-math.directive';
import {NotificationsService} from '../../../../shared/service/services/notifications.service';
import {TooltipComponent} from '../../../../shared/view/ui/tooltip.component';
import {ProductWidgetsComponent} from '../../../widgets/product-widgets.component';
import {injectParams} from '../../../../shared/helpers/route.helpers';
import {ChipsListComponent} from '../../../controls/form/chips-list.component';
import {AutocompleteComponent} from '../../../controls/form/autocomplete.component';
import {Recipe} from '../../service/models/Recipe';
import {Ingredient} from '../../service/models/Ingredient';
import {recipeToFormValue} from '../../../../shared/helpers/recipe.helpers';
import {RecipeDTO} from '../../service/Recipe.scheme';
import {MatIcon} from '@angular/material/icon';
import {TranslatePipe} from "@ngx-translate/core";
import {UnitSwitcherComponent} from '../../../../shared/view/ui/unit-switcher.component';
import {CardComponent} from '../../../../shared/view/ui/card/card.component';
import {ControlExtraTemplateDirective} from "../../../controls/form/control-extra-template.directive";
import {TagsControlComponent} from '../../../controls/form/tags-control.component';
import {FlexRowComponent} from '../../../../shared/view/layout/flex-row.component';
import {ControlComponent} from "../../../controls/form/control-item/control.component";
import {UnitValue} from '../../../../shared/view/const/units.const';
import {EntityItemSelectorComponent} from '@invoices/view/add-invoice/parts/entity-item-selector.component';
import {SwitchComponent} from '../../../controls/form/switch.component';

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
    TextareaComponent,
    MultiselectComponent,
    NumberInputComponent,
    ControlsRowComponent,
    ExpandDirective,
    ParseMathDirective,
    ChipsListComponent,
    AutocompleteComponent,
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
    SwitchComponent
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
    private _router: Router,
    private _aRoute: ActivatedRoute,
    private _notificationsService: NotificationsService
  ) {
  }

  recipe = input<Recipe | undefined>(undefined);
  uuid = injectParams<string>('uuid');
  form = new FormGroup({
    name: new FormControl<string | null>(null, Validators.required),
    description: new FormControl(''),
    outcome_amount: new FormControl<number | string | null>(null),
    outcome_unit: new FormControl<string>(''),
    ingredients: new FormArray([
      this._getIngredientGroup(),
    ]),
    category_id: new FormControl<any>(null),
    tags: new FormControl<string[]>([]),
    master: new FormControl<boolean>(false),
  }, (group) => {
    const recipeTmpModel = Recipe.fromRaw(group.value);

    if (recipeTmpModel.outcomeAmountGreaterThanIngredients) {
      return {outcomeAmountGreaterThanIngredients: true};
    }
    return null;
  })
  recipeFieldState = signal<Record<number, boolean>>({});
  tooltipComponent = viewChildren<TooltipComponent>('tooltipComponent');
  productsWidget = viewChildren<ProductWidgetsComponent>('products');
  productsSelector = viewChildren<MultiselectComponent>('productsSelector');
  nameField = viewChild<AutocompleteComponent>('nameField');
  topCategories = signal<any[]>([]);
  protected readonly UnitValue = UnitValue;
  private recipeEffect = effect(() => {
    if (this.recipe()) {
      this.fillForm(this.recipe()!);
    }
  });

  get ingredients() {
    return this.form.get('ingredients') as FormArray;
  }

  private get _formValid() {
    return this.form.valid && !this.checkCycleRecipe(this.form.getRawValue().ingredients, this.uuid());
  }

  fillForm(
    recipe?: Recipe
  ) {
    this.form.reset({
      ingredients: [],
    });
    this.ingredients.clear();

    if (!recipe) {
      return;
    }
    this.form.reset({
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

    this.form.updateValueAndValidity();
    this.form.markAsPristine();
  }

  resetForm(
    recipe?: Recipe
  ) {
    this.fillForm(recipe);
    this._loadUsingHistory();
    this.form.markAsPristine();
  }

  validateForm() {
    if (!this._formValid) {
      this._notificationsService.error(this._notificationsService.parseFormErrors(this.form).join(', '));
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
          this._notificationsService.error('notifications.recipe.cycle-error');
        }
      }
    });
  }

  ngAfterViewInit() {
    this._selectResourcesService.load().then(resources => {

    });

    if (!this.recipe()?.uuid) {
      this.nameField()!.focus();
    }
  }

  addIngredient() {
    this.ingredients.push(this._getIngredientGroup());
    this.form.markAsDirty();
  }

  deleteIngredient(index: number) {
    this.ingredients.removeAt(index);
    this.form.markAsDirty();
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

  checkCycleRecipe(
    ingredients: RecipeDTO['ingredients'],
    recipeUUID: string
  ) {
    let match = false;
    for (const ingr of ingredients) {
      const hasSubRecipe = ingr.recipe_id?.uuid;
      if (hasSubRecipe && hasSubRecipe === recipeUUID) {
        match = true;
        break;
      }
    }
    return match;
  }

  private _getLastRowType(): string {
    if (!this.form) return 'product';
    const lastRow = this.ingredients.at(this.ingredients.length - 1);
    if (lastRow && lastRow.value) {
      return lastRow.value.active_tab;
    }
    return 'product';
  }

  private _loadUsingHistory() {
    this._recipesRepository.getTopCategories().then(categories => {
      this.topCategories.set(categories.map(category => ({
        label: category.name,
        value: {
          uuid: category.uuid,
          name: category.name,
        },
      })));
    });
  }

  private _getIngredientGroup(
    ingredient?: Recipe['ingredients'][number]
  ) {
    let active_tab = this._getLastRowType();

    if (ingredient?.recipe_id) {
      active_tab = 'recipe';
    } else if (ingredient?.product_id) {
      active_tab = 'product';
    }

    return new FormGroup({
      name: new FormControl(ingredient?.name),
      amount: new FormControl(ingredient?.amount?.toString() ?? null),
      product_id: new FormControl(ingredient?.product_id ? ingredient.product_id : null),
      recipe_id: new FormControl(ingredient?.recipe_id ? ingredient.recipe_id : null),
      active_tab: new FormControl(active_tab),
      unit: new FormControl(ingredient?.unit ?? UnitValue.GRAM),
    }, (group) => {
      const ingredient = Ingredient.fromRaw(group.value);
      if (ingredient.allEmpty) {
        return null
      }
      if (ingredient.typeSelected && !ingredient.amountValid) {
        return {
          ingredientAmountRequired: true
        }
      }
      if (!this.uuid) return null;
      const uuid = this.uuid();
      if (this.checkCycleRecipe([group.value], uuid)) {
        return {cycleRecipe: true};
      }

      if (!ingredient.typeSelected) {
        return {ingredientRequired: true};
      }

      return null;
    });
  }
}
