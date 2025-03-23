import {Component, Inject, OnInit} from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {InputComponent} from '../../ui/form/input.component';
import {ControlComponent} from '../../ui/form/control.component';
import {ControlGroupComponent} from '../../ui/form/control-group.component';
import {GapColumnComponent} from '../../ui/layout/gap-column.component';
import {ButtonComponent} from '../../ui/layout/button.component';
import {TextareaComponent} from '../../ui/form/textarea.component';
import {GapRowComponent} from '../../ui/layout/gap-row.component';
import {Recipe} from '../../../service/repositories/recipes.repository';
import {ProductsRepository} from '../../../service/repositories/products.repository';
import {SelectResourcesService} from '../../../service/services/select-resources.service';

export type ProductFormValue = Omit<Recipe, 'uuid'>

@Component({
  selector: 'lg-add-product-form',
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

              <lg-button (click)="addProduct(value)">
                  Add Product
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
  ],
})
export class AddProductFormComponent
  implements OnInit {
  constructor(
    public _productsRepository: ProductsRepository,
    @Inject(SelectResourcesService) public _selectResourcesService: SelectResourcesService
  ) {
  }

  form = new FormGroup({
    name: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required),
  });

  get value() {
    return this.form.value as ProductFormValue;
  }

  ngOnInit() {
  }

  addProduct(
    values: ProductFormValue
  ) {
    this._productsRepository.addProduct(values).then(() => {
      console.log('Recipe added');
      this.form.reset();
    });
  }
}
