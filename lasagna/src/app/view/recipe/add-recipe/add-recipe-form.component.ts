import {Component, OnInit} from '@angular/core';
import {FormArray, FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {InputComponent} from '../../ui/form/input.component';
import {ControlComponent} from '../../ui/form/control.component';
import {ControlGroupComponent} from '../../ui/form/control-group.component';
import {GapColumnComponent} from '../../ui/layout/gap-column.component';
import {ButtonComponent} from '../../ui/layout/button.component';
import {TextareaComponent} from '../../ui/form/textarea.component';
import {GapRowComponent} from '../../ui/layout/gap-row.component';

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

              <lg-gap-row>
                  <lg-control-group label="Ingredients">
                      <lg-gap-column>
                          <lg-gap-column formArrayName="ingredients">
                              @for (control of ingredients.controls;track $index;let i = $index) {
                                  <ng-container [formGroupName]="i">
                                      <lg-control label="Name">
                                          <lg-input formControlName="name"></lg-input>
                                      </lg-control>

                                      <lg-control label="Amount">
                                          <lg-input formControlName="amount"></lg-input>
                                      </lg-control>

                                      <lg-control label="Unit">
                                          <lg-input formControlName="unit"></lg-input>
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

                  <lg-control-group label="Steps">
                      <lg-gap-column>
                          <lg-gap-column formArrayName="steps">
                              @for (control of steps.controls;track $index;let i = $index) {
                                  <lg-control label="Step">
                                      <lg-textarea formControlName="{{i}}"></lg-textarea>
                                  </lg-control>

                                  <lg-button (click)="deleteStep(i)"
                                             [style]="'danger'"
                                             [size]="'small'">
                                      Delete Step
                                  </lg-button>
                              }
                          </lg-gap-column>

                          <lg-button (click)="addStep()"
                                     [size]="'small'"
                                     [style]="'success'">
                              Add Step
                          </lg-button>
                      </lg-gap-column>
                  </lg-control-group>
              </lg-gap-row>

              <lg-button>
                  Add Recipe
              </lg-button>
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
  ],
  styles: [
    `
    `
  ]
})
export class AddRecipeFormComponent
  implements OnInit {
  constructor() {
  }

  form = new FormGroup({
    name: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required),
    ingredients: new FormArray([
      new FormGroup({
        name: new FormControl('', Validators.required),
        amount: new FormControl(0, Validators.required),
        unit: new FormControl('', Validators.required)
      })
    ]),
    steps: new FormArray([
      new FormControl('', Validators.required)
    ])
  });

  get ingredients() {
    return this.form.get('ingredients') as FormArray;
  }

  get steps() {
    return this.form.get('steps') as FormArray;
  }

  ngOnInit() {
    this.form.valueChanges.subscribe({
      next: values => {
        console.log({values})
      }
    })
  }

  addIngredient() {
    this.ingredients.push(new FormGroup({
      name: new FormControl('', Validators.required),
      amount: new FormControl(0, Validators.required),
      unit: new FormControl('', Validators.required)
    }));
  }

  deleteIngredient(index: number) {
    this.ingredients.removeAt(index);
  }

  addStep() {
    this.steps.push(new FormControl('', Validators.required));
  }

  deleteStep(index: number) {
    this.steps.removeAt(index);
  }
}
