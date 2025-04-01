import {Component, effect, Inject, input, OnInit, ViewEncapsulation} from '@angular/core';
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
import {TooltipComponent} from '../../ui/tooltip.component';
import {EggsWidgetComponent} from '../../widgets/eggs-widget/eggs-widget.component';
import {AmountWidgetsComponent} from '../../widgets/amount-widgets.component';
import {ParseMathDirective} from '../../directives/parse-math.directive';
import {GapRowComponent} from '../../ui/layout/gap-row.component';
import {ButtonGroupItem, ButtonsGroupComponent} from '../../ui/form/buttons-group.component';
import {ExpandDirective} from '../../directives/expand.directive';

export type ProductFormValue = Omit<Product, 'uuid'>

@Component({
  selector: 'lg-add-product-form',
  standalone: true,
  template: `
      <form [formGroup]="form">
          <lg-gap-column>
              <lg-control label="Name">
                  <lg-input [placeholder]="'Your product name'"
                            formControlName="name"></lg-input>
              </lg-control>

              <lg-control label="Amount">
                  <lg-number-input [placeholder]="'In grams'"
                                   (onInputChange)="priceInput.focus()"
                                   formControlName="amount"
                                   lsParseMath>

                      <div ngProjectAs="after">
                          <lg-tooltip>
                              Widgets

                              <div ngProjectAs="content">
                                  <lg-amount-widgets (eggsChanged)="eggsChanged($event)"></lg-amount-widgets>
                              </div>
                          </lg-tooltip>
                      </div>
                  </lg-number-input>
              </lg-control>

              <lg-gap-row [bottom]="true">
                  <lg-control label="Price per unit" lgExpand>
                      <lg-number-input [placeholder]="'In your currency'"
                                       #priceInput
                                       formControlName="price"
                                       lsParseMath></lg-number-input>
                  </lg-control>

                  <lg-buttons-group [items]="buttons"
                                    formControlName="unit">
                  </lg-buttons-group>
              </lg-gap-row>

              <lg-control label="Source">
                  <lg-input [placeholder]="'Where do you buy it?'"
                            formControlName="source"></lg-input>
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
    TooltipComponent,
    EggsWidgetComponent,
    AmountWidgetsComponent,
    ParseMathDirective,
    GapRowComponent,
    ButtonsGroupComponent,
    ExpandDirective,
  ],
  styles: [
    `
      lg-eggs-widget {
        min-width: 300px;
      }
    `
  ],
  encapsulation: ViewEncapsulation.None,
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
    unit: new FormControl('gram'),
    source: new FormControl(''),
    category_id: new FormControl<any>(null, Validators.required),
  });

  buttons:ButtonGroupItem[] = [
    {
      label: 'Gram',
      value: 'gram',
      style:'secondary',
      onClick: () => {
        console.log('Grams');
      },
    },
    {
      label: 'Portion',
      value: 'portion',
      style:'secondary',
      onClick: () => {
        console.log('Portion');
      }
    },
  ];
  uuid = input<string>('');
  private uuidEffect = effect(() => {
    if (!this.uuid()) {
      return;
    }
    this._productsRepository.getOne(this.uuid()).then(product => {
      debugger
      this.form.reset(product);
    });
  });

  get value() {
    return this.form.value as ProductFormValue;
  }

  eggsChanged(event: any) {
    this.form.patchValue({
      amount: event
    });
  }

  ngOnInit() {
    this.form.valueChanges.subscribe(value => {
      console.log(value);
    });
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
    debugger
    this._productsRepository.editProduct(this.uuid(), flaterizeObjectWithUuid<ProductDbValue>(values)).then(() => {
      this._router.navigate(['/products']);
    });
  }

  ngAfterViewInit() {
    this._selectResourcesService.load().then(resources => {
    })
  }
}
