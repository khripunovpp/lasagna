import {Component, effect, Inject, input, OnInit} from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {InputComponent} from '../../ui/form/input.component';
import {ControlComponent} from '../../ui/form/control.component';
import {GapColumnComponent} from '../../ui/layout/gap-column.component';
import {ButtonComponent} from '../../ui/layout/button.component';
import {Product, ProductDbValue, ProductsRepository} from '../../../service/repositories/products.repository';
import {SelectResourcesService} from '../../../service/services/select-resources.service';
import {Router} from '@angular/router';
import {MultiselectComponent} from '../../ui/form/multiselect.component';
import {flaterizeObjectWithUuid} from '../../../helpers/attribute.helper';
import {NumberInputComponent} from '../../ui/form/number-input.component';

export type ProductFormValue = Omit<Product, 'uuid'>

@Component({
  selector: 'lg-add-product-form',
  standalone: true,
  template: `
      <form [formGroup]="form">
          <lg-gap-column>
              <lg-control label="Name">
                  <lg-input formControlName="name"
                            [placeholder]="'Your product name'"></lg-input>
              </lg-control>

              <lg-control label="Amount">
                  <lg-number-input [placeholder]="'In grams'"
                          formControlName="amount"></lg-number-input>
              </lg-control>

              <lg-control label="Price per unit">
                  <lg-number-input formControlName="price"
                          [placeholder]="'In your currency'"></lg-number-input>
              </lg-control>

              <lg-control label="Source">
                  <lg-input formControlName="source"
                            [placeholder]="'Where do you buy it?'"></lg-input>
              </lg-control>

              <lg-control label="Category">
                  <lg-multiselect [resource]="'categories'"
                                  formControlName="category_id"></lg-multiselect>
              </lg-control>

              @if (uuid()) {
                  <lg-button (click)="editProduct(value)">
                      Edit Product
                  </lg-button>
              } @else {
                  <lg-button (click)="addProduct(value)">
                      Add Product
                  </lg-button>
              }
          </lg-gap-column>
      </form>
  `,
  imports: [
    ReactiveFormsModule,
    InputComponent,
    ControlComponent,
    GapColumnComponent,
    ButtonComponent,
    MultiselectComponent,
    NumberInputComponent,
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
export class AddProductFormComponent
  implements OnInit {
  constructor(
    public _productsRepository: ProductsRepository,
    @Inject(SelectResourcesService) public _selectResourcesService: SelectResourcesService,
    private _router: Router,
  ) {
  }

  form = new FormGroup({
    name: new FormControl('', Validators.required),
    amount: new FormControl<number | null>(null, Validators.required),
    price: new FormControl<number | null>(null, Validators.required),
    source: new FormControl(''),
    category_id: new FormControl<any>(null, Validators.required),
  });


  uuid = input<string>('');
  private uuidEffect = effect(() => {
    if (!this.uuid()) {
      return;
    }
    this._productsRepository.getOne(this.uuid(), product => {
      this.form.reset(product);
    });
  });

  get value() {
    return this.form.value as ProductFormValue;
  }

  ngOnInit() {
  }

  addProduct(
    values: ProductFormValue
  ) {
    this._productsRepository.addProduct(flaterizeObjectWithUuid<ProductDbValue>(values)).then(() => {
      this._router.navigate(['/products']);
    });
  }

  editProduct(
    values: ProductFormValue
  ) {
    this._productsRepository.editProduct(this.uuid(), flaterizeObjectWithUuid<ProductDbValue>(values)).then(() => {
      this._router.navigate(['/products']);
    });
  }

  ngAfterViewInit() {
    this._selectResourcesService.load().then(resources => {
    })
  }
}
