import {Component, effect, Inject, input, OnInit, signal, ViewEncapsulation} from '@angular/core';
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
import {JsonPipe} from '@angular/common';
import {ChipsListComponent} from '../../ui/form/chips-list.component';

export type ProductFormValue = Omit<Product, 'uuid'>

@Component({
  selector: 'lg-add-product-form',
  standalone: true,
  templateUrl: './add-product-form.component.html',
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
    JsonPipe,
    ChipsListComponent,
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
  uuid = input<string>('');
  topCategories = signal<any[]>([]);
  topSources = signal<any[]>([]);
  private uuidEffect = effect(() => {
    if (!this.uuid()) {
      return;
    }
    this._productsRepository.getOne(this.uuid()).then(product => {
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
    this._productsRepository.getTopCategories().then(categories => {
      this.topCategories.set(categories.map(category => ({
        label: category.name,
        value: category.uuid,
      })));
    });

    this._productsRepository.getTopSources().then(sources => {
      this.topSources.set(sources.map(source => ({
        label: source,
        value: source,
      })));
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
    this._productsRepository.editProduct(this.uuid(), flaterizeObjectWithUuid<ProductDbValue>(values)).then(() => {
      this._router.navigate(['/products']);
    });
  }

  ngAfterViewInit() {
    this._selectResourcesService.load().then(resources => {
    })
  }

}
