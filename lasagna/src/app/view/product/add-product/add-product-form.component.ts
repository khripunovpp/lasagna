import {AfterViewInit, Component, effect, input, OnInit, signal, viewChild, ViewEncapsulation} from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {ControlComponent} from '../../ui/form/control.component';
import {GapColumnComponent} from '../../ui/layout/gap-column.component';
import {ProductsRepository} from '@service/repositories/products.repository';
import {SelectResourcesService} from '@service/services/select-resources.service';
import {Router} from '@angular/router';
import {MultiselectComponent} from '../../ui/form/multiselect.component';
import {NumberInputComponent} from '../../ui/form/number-input.component';
import {TooltipComponent} from '../../ui/tooltip.component';
import {AmountWidgetsComponent} from '../../widgets/amount-widgets.component';
import {ParseMathDirective} from '../../directives/parse-math.directive';
import {GapRowComponent} from '../../ui/layout/gap-row.component';
import {ButtonGroupItem, ButtonsGroupComponent} from '../../ui/form/buttons-group.component';
import {ExpandDirective} from '../../directives/expand.directive';
import {ChipsListComponent} from '../../ui/form/chips-list.component';
import {NotificationsService} from '@service/services/notifications.service';
import {AutocompleteComponent} from '../../ui/form/autocomplete.component';
import {TagsControlComponent} from '../../ui/form/tags-control.component';
import {Product} from '@service/models/Product';
import {productToFormValue} from '@helpers/product.helpers';

import {debounceTime} from 'rxjs';
import {TranslatePipe} from '@ngx-translate/core';

@Component({
  selector: 'lg-add-product-form',
  standalone: true,
  templateUrl: './add-product-form.component.html',
  imports: [
    ReactiveFormsModule,
    ControlComponent,
    GapColumnComponent,
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
    TagsControlComponent,
    TranslatePipe
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
  implements OnInit,
    AfterViewInit {
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
    tags: new FormControl<string[]>([]),
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
  product = input<Product | null>(null);
  topCategories = signal<any[]>([]);
  topSources = signal<any[]>([]);
  nameField = viewChild<AutocompleteComponent>('nameField');

  private productEffect = effect(() => {
    if (!this.product() || this.form.dirty) {
      return;
    }
    this.form.reset(productToFormValue(this.product()!));
    this.form.markAsPristine();
  });

  private get _defFormValue() {
    return {
      name: null,
      amount: null,
      price: null,
      source: null,
      category_id: null,
      unit: 'gram',
      tags: [],
    };
  }

  private get _formValid() {
    return this.form.valid;
  }

  eggsChanged(event: any) {
    this.form.patchValue({
      amount: event
    });
  }

  ngOnInit() {
    this._loadUsingHistory();
    this.form.valueChanges.pipe(
      debounceTime(100),
    ).subscribe(values => {
      if (!this.form.dirty) {
        return
      }
      this.product()?.update(values);
    })
  }

  resetForm(
    value?: Product
  ) {
    this.form.reset(value ? value?.toDTO() as any : this._defFormValue);
    this.form.markAsPristine();
    this._loadUsingHistory();
  }

  validateForm() {
    if (!this._formValid) {
      this._notificationsService.error(this._notificationsService.parseFormErrors(this.form).join(', '));
      return false;
    }
    return true
  }

  ngAfterViewInit() {
    this._selectResourcesService.load().then(resources => {
    });


    // this.nameField()!.focus();
    this.form.markAsPristine()
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
