import {Component, effect, input, OnInit, signal} from '@angular/core';
import {FormArray, FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {InputComponent} from '../../ui/form/input.component';
import {ControlComponent} from '../../ui/form/control.component';
import {ControlGroupComponent} from '../../ui/form/control-group.component';
import {GapColumnComponent} from '../../ui/layout/gap-column.component';
import {ButtonComponent} from '../../ui/layout/button.component';
import {TextareaComponent} from '../../ui/form/textarea.component';
import {GapRowComponent} from '../../ui/layout/gap-row.component';
import {debounceTime} from 'rxjs';
import {Recipe, RecipeDbValue, RecipesRepository} from '../../../service/repositories/recipes.repository';
import {MultiselectComponent} from '../../ui/form/multiselect.component';
import {SelectResourcesService} from '../../../service/services/select-resources.service';
import {JsonPipe} from '@angular/common';
import {Router} from '@angular/router';
import {flaterizeObjectWithUuid} from '../../../helpers/attribute.helper';

export type RecipeFormValue = Omit<Recipe, 'uuid'>

@Component({
  selector: 'lg-add-recipe-form',
  standalone: true,
  template: `
      <form [formGroup]="form">
          <lg-gap-column>
              <lg-control label="Name">
                  <lg-input formControlName="name"></lg-input>
              </lg-control>

              <lg-control label="Description">
                  <lg-input formControlName="description"></lg-input>
              </lg-control>

              <lg-control-group label="Ingredients">
                  <lg-gap-column>
                      <lg-gap-column formArrayName="ingredients">
                          @for (control of ingredients.controls;track $index;let i = $index) {
                              <ng-container [formGroupName]="i">

                                  <lg-control label="Name">
                                      <lg-gap-column [size]="'medium'">
                                          @if (displayTextName()) {
                                              <lg-input formControlName="name"></lg-input>
                                              <span (click)="displayTextName.set(false)">Hide</span>
                                          } @else {
                                              <lg-multiselect [resource]="'products'"
                                                              formControlName="product_id"></lg-multiselect>
                                              <span (click)="displayTextName.set(true)">Show text field</span>
                                          }

                                          <lg-multiselect [resource]="'recepies'"
                                                          formControlName="recipe_id"></lg-multiselect>
                                      </lg-gap-column>
                                  </lg-control>

                                  <lg-control label="Amount">
                                      <lg-input formControlName="amount"></lg-input>
                                  </lg-control>

                                  <lg-button (click)="deleteIngredient(i)"
                                             [style]="'danger'"
                                             [size]="'small'">
                                      Delete Ingredient
                                  </lg-button>
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
    GapRowComponent,
    MultiselectComponent,
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
  ) {
  }

  form = new FormGroup({
    name: new FormControl<string | null>(null, Validators.required),
    description: new FormControl('', Validators.required),
    ingredients: new FormArray([
      this._getIngredientGroup(),
    ]),
  });
  uuid = input<string>('');
  displayTextName = signal(false);
  private uuidEffect = effect(() => {
    if (!this.uuid()) {
      return;
    }
    this._recipesRepository.getOne(this.uuid(), recipe => {
      this.form.reset(recipe);
      (this.form.get('ingredients') as FormArray).clear();

      recipe.ingredients.forEach((ingredient: Recipe['ingredients'][number]) => {
        this.ingredients.push(this._getIngredientGroup(ingredient));
      })
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
    return flaterizeObjectWithUuid<RecipeDbValue>(values);
  }

  ngOnInit() {
    this.form.valueChanges.pipe(
      debounceTime(500),
    ).subscribe({
      next: values => {
        console.log({values})

      }
    });
  }

  ngAfterViewInit() {
    this._selectResourcesService.load().then(resources => {
      console.log({resources})
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

      this._router.navigate(['/home']);
    });
  }

  editRecipe(
    values: RecipeFormValue
  ) {
    this._recipesRepository.editRecipe(this.uuid(), this._values).then(() => {

      this._router.navigate(['/home']);
    });
  }

  private _getIngredientGroup(
    ingredient?: Recipe['ingredients'][number]
  ) {
    console.log({ingredient})
    return new FormGroup({
      name: new FormControl(ingredient?.name),
      amount: new FormControl(ingredient?.amount, Validators.required),
      product_id: new FormControl(ingredient?.product_id ? {uuid: ingredient.product_id} : null, Validators.required),
      recipe_id: new FormControl(ingredient?.recipe_id ? {uuid: ingredient.recipe_id} : null, Validators.required),
    });
  }
}
