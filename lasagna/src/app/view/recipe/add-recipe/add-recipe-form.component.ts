import {Component, effect, OnInit, signal, viewChildren} from '@angular/core';
import {FormArray, FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {InputComponent} from '../../ui/form/input.component';
import {ControlComponent} from '../../ui/form/control.component';
import {ControlGroupComponent} from '../../ui/form/control-group.component';
import {GapColumnComponent} from '../../ui/layout/gap-column.component';
import {ButtonComponent} from '../../ui/layout/button.component';
import {TextareaComponent} from '../../ui/form/textarea.component';
import {debounceTime} from 'rxjs';
import {Ingredient, Recipe, RecipeDbValue, RecipesRepository} from '../../../service/repositories/recipes.repository';
import {MultiselectComponent} from '../../ui/form/multiselect.component';
import {SelectResourcesService} from '../../../service/services/select-resources.service';
import {JsonPipe, NgClass} from '@angular/common';
import {ActivatedRoute, Router} from '@angular/router';
import {clearEmpties, flaterizeObjectWithUuid} from '../../../helpers/attribute.helper';
import {NumberInputComponent} from '../../ui/form/number-input.component';
import {ControlsRowComponent} from '../../ui/form/controls-row.component';
import {ExpandDirective} from '../../directives/expand.directive';
import {ParseMathDirective} from '../../directives/parse-math.directive';
import {NotificationsService} from '../../../service/services/notifications.service';
import {ButtonGroupItem, ButtonsGroupComponent} from '../../ui/form/buttons-group.component';
import {TooltipComponent} from '../../ui/tooltip.component';
import {ProductWidgetsComponent} from '../../widgets/product-widgets.component';
import {ShrinkDirective} from '../../directives/shrink.directive';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';
import {injectParams} from '../../../helpers/route.helpers';

export type RecipeFormValue = Omit<Recipe, 'uuid'>

@Component({
  selector: 'lg-add-recipe-form',
  standalone: true,
  templateUrl: './add-recipe-form.component.html',
  imports: [
    ReactiveFormsModule,
    InputComponent,
    ControlComponent,
    ControlGroupComponent,
    GapColumnComponent,
    ButtonComponent,
    TextareaComponent,
    MultiselectComponent,
    NumberInputComponent,
    ControlsRowComponent,
    ExpandDirective,
    NgClass,
    ParseMathDirective,
    ButtonsGroupComponent,
    ProductWidgetsComponent,
    TooltipComponent,
    ProductWidgetsComponent,
    ShrinkDirective,
    JsonPipe,
  ],
  styles: [
    `
    `
  ],

  providers: [
    {
      provide: SelectResourcesService,
      useClass: SelectResourcesService,
    }
  ],
})
export class AddRecipeFormComponent
  implements OnInit {
  constructor(
    public _recipesRepository: RecipesRepository,
    public _selectResourcesService: SelectResourcesService,
    private _router: Router,
    private _aRoute: ActivatedRoute,
    private _notificationsService: NotificationsService
  ) {
    this._aRoute.data.pipe(
      takeUntilDestroyed(),
    ).subscribe((data) => {
      this.recipe.set(data['recipe'] || null);
    });
  }

  recipe = signal<Recipe | null>(null);
  uuid = injectParams<string>('uuid');
  form = new FormGroup({
    name: new FormControl<string | null>(null, Validators.required),
    description: new FormControl(''),
    outcome_amount: new FormControl<number | string | null>(null),
    outcome_unit: new FormControl<string>(''),
    ingredients: new FormArray([
      this._getIngredientGroup(),
    ]),
  }, (group) => {
    const outcomeAmount = group.value?.outcome_amount;
    const ingredientsAmount = group.value?.ingredients?.reduce((acc: number, item: Ingredient) => {
      if (item.unit !== 'gram') return acc;

      return acc + (+item.amount || 0);
    }, 0) || 0;
    if (outcomeAmount && outcomeAmount > ingredientsAmount) {
      return {outcomeAmountGreaterThanIngredients: true};
    }
    return null;
  })
  textFieldState = signal<Record<number, boolean>>({});
  recipeFieldState = signal<Record<number, boolean>>({});
  buttons: ButtonGroupItem[] = [
    {
      label: 'Grams',
      value: 'gram',
      style: 'secondary',
      onClick: () => {
        console.log('Grams');
      },
    },
    {
      label: 'Pieces',
      value: 'piece',
      style: 'secondary',
      onClick: () => {
        console.log('Piece');
      }
    },
  ];
  tooltipComponent = viewChildren<TooltipComponent>('tooltipComponent');
  productsWidget = viewChildren<ProductWidgetsComponent>('products');
  productsSelector = viewChildren<MultiselectComponent>('productsSelector');
  private recipeEffect = effect(() => {
    if (!this.recipe()) {
      return;
    }
    this.form.reset({
      ...this.recipe(),
      ingredients: [],
    });
    (this.form.get('ingredients') as FormArray).clear();

    this.recipe()?.ingredients.forEach((ingredient: Recipe['ingredients'][number], index: number) => {
      this.ingredients.push(this._getIngredientGroup(ingredient));

      if (ingredient.recipe_id) {
        this.openRecipeField(index);
      }
      if (ingredient.name) {
        this.openTextField(index);
      }
    })

    this.form.updateValueAndValidity();
  });

  get ingredients() {
    return this.form.get('ingredients') as FormArray;
  }

  get value() {
    return this.form.value as any;
  }

  private get _values() {
    const values = this.form.value;
    return clearEmpties(flaterizeObjectWithUuid<RecipeDbValue>(values));
  }

  private get _formValid() {
    return this.form.valid && !this.checkCycleRecipe(this.form.value.ingredients as any, this.uuid());
  }

  async productAdded(
    product: {
      uuid: string
      name: string
    },
    index: number
  ) {
    await this._selectResourcesService.load();
    this.tooltipComponent()?.at(index)?.close();
    this.productsWidget()?.at(index)?.stopCamera();
    this.ingredients.at(index).get('product_id')?.reset({uuid: product.uuid, name: product.name});
  }

  addLast() {
    const lastControl = this.ingredients.at(this.ingredients.length - 1);
    // if last control is empty, skip, if not, add new control
    if (lastControl.value.name || lastControl.value.amount || lastControl.value.product_id) {
      this.addIngredient();
    }
  }

  ngOnInit() {
    this.form.valueChanges.pipe(
      debounceTime(100),
    ).subscribe({
      next: values => {
        const hasCycledRecipe = this.checkCycleRecipe(values.ingredients as any, this.uuid());
        if (hasCycledRecipe) {
          this._notificationsService.error('You cannot add a recipe to itself');
        }
        console.log(values)
      }
    });
  }

  ngAfterViewInit() {
    this._selectResourcesService.load().then(resources => {

    })
  }

  addIngredient() {
    this.ingredients.push(this._getIngredientGroup());
  }

  deleteIngredient(index: number) {
    this.ingredients.removeAt(index);
  }

  addRecipe(
    values: RecipeFormValue
  ) {
    if (!this._formValid) {
      this._notificationsService.error(this._notificationsService.parseFormErrors(this.form).join(', '));
      return;
    }
    this._recipesRepository.addRecipe(this._values).then(() => {
      this._router.navigate(['/recipes']);
    });
  }

  editRecipe(
    values: RecipeFormValue
  ) {
    if (!this._formValid) {
      this._notificationsService.error(this._notificationsService.parseFormErrors(this.form).join(', '));
      return;
    }
    this._recipesRepository.editRecipe(this.uuid(), this._values).then(() => {
      this._router.navigate(['/recipes']);
    }).catch(error => {
      console.error(error);
    });
  }

  onIngredientSelected(
    amount: NumberInputComponent,
    index: number,
    clearField: string | string[],
  ) {
    amount.focus();

    const value = this.ingredients.at(index).value;
    const inGrams = value.product_id?.unit === 'gram' || value.recipe_id?.unit === 'gram';

    console.log({value})

    this.ingredients.at(index).patchValue({
      ...(Array.isArray(clearField) ? clearField.reduce((acc, field) => ({
        ...acc,
        [field]: null
      }), {}) : {[clearField]: null}),
      unit: value.product_id?.unit || value.recipe_id?.unit || 'gram'
    });
  }

  openTextField(
    index: number
  ) {
    this.textFieldState.update((value) => {
      return {
        ...value,
        [index]: true,
      }
    });
  }

  closeTextField(
    index: number
  ) {
    this.textFieldState.update((value) => {
      return {
        ...value,
        [index]: false,
      }
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
    ingredients: Recipe['ingredients'][number][],
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

  private _getIngredientGroup(
    ingredient?: Recipe['ingredients'][number]
  ) {
    return new FormGroup({
      name: new FormControl(ingredient?.name),
      amount: new FormControl(ingredient?.amount?.toString() ?? null),
      product_id: new FormControl(ingredient?.product_id ? {uuid: ingredient.product_id} : null),
      recipe_id: new FormControl(ingredient?.recipe_id ? {uuid: ingredient.recipe_id} : null),
      unit: new FormControl(ingredient?.unit ?? 'gram'),
    }, (group) => {
      if (!group.value.product_id && !group.value.name && !group.value.recipe_id && !parseInt(group.value.amount)) {
        return null
      }
      if ((group.value.product_id || group.value.name || group.value.recipe_id) && !parseInt(group.value.amount)) {
        return {
          ingredientAmountRequired: true
        }
      }
      if (!this.uuid) return null;
      const uuid = this.uuid();
      if (this.checkCycleRecipe([group.value], uuid)) {
        return {cycleRecipe: true};
      }

      if (!group.value.product_id && !group.value.name && !group.value.recipe_id) {
        return {ingredientRequired: true};
      }

      return null;
    });
  }
}
