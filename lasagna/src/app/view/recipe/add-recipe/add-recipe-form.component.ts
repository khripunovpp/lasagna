import {Component, effect, input, OnInit, signal} from '@angular/core';
import {FormArray, FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {InputComponent} from '../../ui/form/input.component';
import {ControlComponent} from '../../ui/form/control.component';
import {ControlGroupComponent} from '../../ui/form/control-group.component';
import {GapColumnComponent} from '../../ui/layout/gap-column.component';
import {ButtonComponent} from '../../ui/layout/button.component';
import {TextareaComponent} from '../../ui/form/textarea.component';
import {debounceTime} from 'rxjs';
import {Recipe, RecipeDbValue, RecipesRepository} from '../../../service/repositories/recipes.repository';
import {MultiselectComponent} from '../../ui/form/multiselect.component';
import {SelectResourcesService} from '../../../service/services/select-resources.service';
import {NgClass} from '@angular/common';
import {Router} from '@angular/router';
import {clearEmpties, flaterizeObjectWithUuid} from '../../../helpers/attribute.helper';
import {NumberInputComponent} from '../../ui/form/number-input.component';
import {ControlsRowComponent} from '../../ui/form/controls-row.component';
import {ExpandDirective} from '../../directives/expand.directive';

export type RecipeFormValue = Omit<Recipe, 'uuid'>

@Component({
  selector: 'lg-add-recipe-form',
  standalone: true,
  template: `
      <form [formGroup]="form">
          <lg-gap-column [position]="'start'">
              <lg-control label="Name" lgExpand>
                  <lg-input (onInputChanged)="desc.focus()"
                            [placeholder]="'Your recipe name'"
                            formControlName="name"></lg-input>
              </lg-control>

              <lg-control label="Description" lgExpand>
                  <lg-textarea #desc
                               [placeholder]="'Describe your recipe, how to make it, what to pay attention to, etc.'"
                               formControlName="description"></lg-textarea>
              </lg-control>

              <lg-controls-row lgExpand>
                  <lg-control label="Amount of the outcome" lgExpand>
                      <lg-number-input #amount
                                       [placeholder]="form.value.outcome_unit || 'Here you can write the amount of the outcome (e.g. 100, 12, etc.)'"
                                       formControlName="outcome_amount"></lg-number-input>
                  </lg-control>

                  <lg-control label="Outcome unit" lgExpand>
                      <lg-input [placeholder]="'And here the unit of the outcome (e.g. grams, pieces, etc.)'"
                                formControlName="outcome_unit"></lg-input>
                  </lg-control>
              </lg-controls-row>

              <lg-control-group label="Ingredients" lgExpand>
                  <lg-gap-column [position]="'start'">
                      <lg-gap-column formArrayName="ingredients" lgExpand>
                          @for (control of ingredients.controls;track (control.value.product_id?.id
                                  || control.value.name
                                  || control.value.amount
                          );let i = $index) {
                              <ng-container [formGroupName]="i">
                                  <lg-controls-row>
                                      @if (textFieldState()[i]) {
                                          <lg-gap-column [size]="'small'">
                                              <lg-control label="Name">
                                                  <ng-container ngProjectAs="endLabelTpl">
                                                      <span (click)="closeTextField(i)">Hide</span>
                                                  </ng-container>

                                                  <lg-input
                                                          [placeholder]="'Here you can write the name of the ingredient'"
                                                          formControlName="name"></lg-input>
                                              </lg-control>
                                          </lg-gap-column>

                                      } @else {

                                          <lg-gap-column [size]="'small'">
                                              <lg-control>
                                                  <ng-container ngProjectAs="labelTpl">
                                                      <span (click)="closeRecipeField(i)"
                                                            [ngClass]="!recipeFieldState()[i] ? 'text-active text-bold' : ''">
                                                          Product
                                                      </span>
                                                  </ng-container>

                                                  <ng-container ngProjectAs="afterLabelTpl">
                                                      <span (click)="openRecipeField(i)"
                                                            [ngClass]="recipeFieldState()[i] ? 'text-active text-bold' : ''">Recipe</span>
                                                  </ng-container>

                                                  <ng-container ngProjectAs="endLabelTpl">
                                                      <span (click)="openTextField(i)">As text</span>
                                                  </ng-container>

                                                  @if (recipeFieldState()[i]) {
                                                      <lg-multiselect [resource]="'recipes'"
                                                                      (onSelected)="amount.focus()"
                                                                      [autoLoad]="true"
                                                                      formControlName="recipe_id"></lg-multiselect>
                                                  } @else {
                                                      <lg-multiselect [resource]="'products'"
                                                                      (onSelected)="amount.focus()"
                                                                      [autoLoad]="true"
                                                                      formControlName="product_id"></lg-multiselect>
                                                  }

                                              </lg-control>
                                          </lg-gap-column>
                                      }

                                      <lg-control label="Amount">
                                          <lg-number-input #amount
                                                           (onKeydown)="addLast()"
                                                           [placeholder]="'In grams'"
                                                           formControlName="amount"></lg-number-input>
                                      </lg-control>

                                      <ng-container ngProjectAs="rowActions">
                                          <lg-button (click)="deleteIngredient(i)"
                                                     [style]="'danger'"
                                                     [size]="'small'">
                                              Delete Ingredient
                                          </lg-button>
                                      </ng-container>

                                  </lg-controls-row>
                              </ng-container>
                          }
                      </lg-gap-column>

                      <lg-button (click)="addIngredient()"
                                 [size]="'small'"
                                 [style]="'success'">
                          Add Ingredient
                      </lg-button>
                  </lg-gap-column>
              </lg-control-group>

              @if (uuid()) {
                  <lg-button (click)="editRecipe(value)">
                      Edit Recipe
                  </lg-button>
              } @else {
                  <lg-button (click)="addRecipe(value)">
                      Add Recipe
                  </lg-button>
              }
          </lg-gap-column>
      </form>
  `,
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
  ) {
  }

  form = new FormGroup({
    name: new FormControl<string | null>(null, Validators.required),
    description: new FormControl('', Validators.required),
    outcome_amount: new FormControl<number | string | null>(null, Validators.required),
    outcome_unit: new FormControl<string>('', Validators.required),
    ingredients: new FormArray([
      this._getIngredientGroup(),
    ]),
  });
  uuid = input<string>('');
  textFieldState = signal<Record<number, boolean>>({});
  recipeFieldState = signal<Record<number, boolean>>({});
  private uuidEffect = effect(() => {
    if (!this.uuid()) {
      return;
    }
    this._recipesRepository.getOne(this.uuid(), recipe => {
      this.form.reset({
        ...recipe,
        ingredients: [],
      });
      (this.form.get('ingredients') as FormArray).clear();

      recipe.ingredients.forEach((ingredient: Recipe['ingredients'][number], index: number) => {
        this.ingredients.push(this._getIngredientGroup(ingredient));
        //openRecipeField
        if (ingredient.recipe_id) {
          this.openRecipeField(index);
        }
        if (ingredient.name) {
          this.openTextField(index);
        }
      })

      this.form.updateValueAndValidity();
    });
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

  addLast() {
    const lastControl = this.ingredients.at(this.ingredients.length - 1);
    // if last control is empty, skip, if not, add new control
    if (lastControl.value.name || lastControl.value.amount || lastControl.value.product_id) {
      this.addIngredient();
    }
  }

  ngOnInit() {
    this.form.valueChanges.pipe(
      debounceTime(500),
    ).subscribe({
      next: values => {
        console.log(values)
      }
    });
  }

  ngAfterViewInit() {
    this._selectResourcesService.load().then(resources => {

    })
  }

  addIngredient() {
    this.ingredients.push(new FormGroup({
      name: new FormControl('', Validators.required),
      amount: new FormControl(0, Validators.required),
      product_id: new FormControl('', Validators.required),
    }));
  }

  deleteIngredient(index: number) {
    this.ingredients.removeAt(index);
  }

  addRecipe(
    values: RecipeFormValue
  ) {
    this._recipesRepository.addRecipe(this._values).then(() => {

      this._router.navigate(['/recipes']);
    });
  }

  editRecipe(
    values: RecipeFormValue
  ) {
    this._recipesRepository.editRecipe(this.uuid(), this._values).then(() => {

      this._router.navigate(['/recipes']);
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

    this.ingredients.at(index).patchValue({
      product_id: null,
      recipe_id: null,
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

    this.ingredients.at(index).patchValue({
      product_id: null,
      recipe_id: null,
      name: '',
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

    this.ingredients.at(index).patchValue({
      name: '',
      product_id: null,
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

    this.ingredients.at(index).patchValue({
      name: '',
      product_id: null,
    });
  }

  private _getIngredientGroup(
    ingredient?: Recipe['ingredients'][number]
  ) {
    return new FormGroup({
      name: new FormControl(ingredient?.name),
      amount: new FormControl(ingredient?.amount.toString() ?? null, Validators.required),
      product_id: new FormControl(ingredient?.product_id ? {uuid: ingredient.product_id} : null, Validators.required),
      recipe_id: new FormControl(ingredient?.recipe_id ? {uuid: ingredient.recipe_id} : null, Validators.required),
    });
  }
}
