import {Component, effect, Inject, input, OnInit, signal, ViewEncapsulation} from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';

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

import {AmountWidgetsComponent} from '../../widgets/amount-widgets.component';
import {ParseMathDirective} from '../../directives/parse-math.directive';
import {GapRowComponent} from '../../ui/layout/gap-row.component';
import {ButtonGroupItem, ButtonsGroupComponent} from '../../ui/form/buttons-group.component';
import {ExpandDirective} from '../../directives/expand.directive';

import {ChipsListComponent} from '../../ui/form/chips-list.component';
import {NotificationsService} from '../../../service/services/notifications.service';
import {AutocompleteComponent} from '../../ui/form/autocomplete.component';
import {JsonPipe} from '@angular/common';
import {InputComponent} from '../../ui/form/input.component';

export type ProductFormValue = Omit<Product, 'uuid'>

@Component({
  selector: 'lg-add-product-form',
  standalone: true,
  templateUrl: './add-product-form.component.html',
  imports: [
    ReactiveFormsModule,
    ControlComponent,
    GapColumnComponent,
    ButtonComponent,
    MultiselectComponent,
    NumberInputComponent,
    TooltipComponent,
    AmountWidgetsComponent,
    ParseMathDirective,
    GapRowComponent,
    ButtonsGroupComponent,
    ExpandDirective,
    ChipsListComponent,
    AutocompleteComponent,
    JsonPipe,
    InputComponent
  ],
  styles: [
    `
      lg-eggs-widget {
        min-width: 300px;
      }
    `
  ],
  encapsulation: ViewEncapsulation.None,

})
export class AddProductFormComponent
  implements OnInit {
  constructor(
    public _productsRepository: ProductsRepository,
    public _selectResourcesService: SelectResourcesService,
    private _router: Router,
    private _notificationsService: NotificationsService,
  ) {
  }

  form = new FormGroup({
    name: new FormControl<string | null>(null, Validators.required),
    amount: new FormControl<number | null>(null, Validators.required),
    price: new FormControl<number | null>(null, Validators.required),
    unit: new FormControl('gram'),
    source: new FormControl<string | null>(null),
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

  private get _defFormValue() {
    return {
      name: null,
      amount: null,
      price: null,
      source: null,
      category_id: null,
      unit: 'gram',
    };
  }

  eggsChanged(event: any) {
    this.form.patchValue({
      amount: event
    });
  }

  ngOnInit() {
    this._loadUsingHistory();
  }

  addProduct(
    values: ProductFormValue
  ) {
    this._productsRepository.addProduct(flaterizeObjectWithUuid<ProductDbValue>(values)).then(() => {
      this.form.reset(this._defFormValue);
      this._notificationsService.success('Product added');
      this._loadUsingHistory();

      console.log('form', this.form.value);
    });
  }

  editProduct(
    values: ProductFormValue
  ) {
    this._productsRepository.editProduct(this.uuid(), flaterizeObjectWithUuid<ProductDbValue>(values)).then(() => {
      this._notificationsService.success('Product edited');
      this._loadUsingHistory();
    });
  }

  ngAfterViewInit() {
    this._selectResourcesService.load().then(resources => {
    })
  }

  private _loadUsingHistory() {
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

}
