import {
  AfterViewInit,
  Component,
  effect,
  inject,
  input,
  OnInit,
  signal,
  viewChild,
  ViewEncapsulation
} from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';

import {FlexColumnComponent} from '../../../../shared/view/ui/layout/flex-column.component';
import {ProductsRepository} from '../../service/products.repository';
import {SelectResourcesService} from '../../../../shared/service/services/select-resources.service';
import {Router} from '@angular/router';
import {MultiselectComponent} from '../../../../shared/view/ui/form/multiselect.component';
import {NumberInputComponent} from '../../../../shared/view/ui/form/number-input.component';
import {TooltipComponent} from '../../../../shared/view/ui/tooltip.component';
import {AmountWidgetsComponent} from '../../../../shared/view/widgets/amount-widgets.component';
import {ParseMathDirective} from '../../../../shared/view/directives/parse-math.directive';
import {FlexRowComponent} from '../../../../shared/view/ui/layout/flex-row.component';
import {ExpandDirective} from '../../../../shared/view/directives/expand.directive';
import {ChipsListComponent} from '../../../../shared/view/ui/form/chips-list.component';
import {NotificationsService} from '../../../../shared/service/services/notifications.service';
import {AutocompleteComponent} from '../../../../shared/view/ui/form/autocomplete.component';
import {Product} from '../../service/Product';
import {productToFormValue} from '../../../../shared/helpers/product.helpers';
import {debounceTime, tap} from 'rxjs';
import {TranslatePipe} from '@ngx-translate/core';
import {CardComponent} from '../../../../shared/view/ui/card/card.component';
import {MatIcon} from '@angular/material/icon';
import {ButtonComponent} from '../../../../shared/view/ui/layout/button.component';
import {WidthDirective} from '../../../../shared/view/directives/width.directive';
import {UnitSwitcherComponent} from '../../../../shared/view/ui/unit-switcher.component';
import {USER_CURRENCY} from '../../../settings/service/providers/user-currency.token';
import {SETTINGS} from '../../../settings/service/providers/settings.token';
import {CurrencySymbolPipe} from '../../../../shared/view/pipes/currency-symbol.pipe';
import {smaller} from 'mathjs';


import {InputComponent} from '../../../../shared/view/ui/form/input.component';
import {ControlExtraTemplateDirective} from "../../../../shared/view/ui/form/control-extra-template.directive";
import {ControlComponent} from '../../../../shared/view/ui/form/control-item/control.component';



@Component({
  selector: 'lg-add-product-form',
  standalone: true,
  templateUrl: './add-product-form.component.html',
  imports: [
    ReactiveFormsModule,
    FlexColumnComponent,
    MultiselectComponent,
    NumberInputComponent,
    TooltipComponent,
    AmountWidgetsComponent,
    ParseMathDirective,
    FlexRowComponent,
    ExpandDirective,
    ChipsListComponent,
    AutocompleteComponent,
    TranslatePipe,
    CardComponent,
    MatIcon,
    ButtonComponent,
    WidthDirective,
    UnitSwitcherComponent,
    CurrencySymbolPipe,
    InputComponent,
    ControlExtraTemplateDirective,
    ControlComponent,
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
    category_id: new FormControl<any>(null),
  });
  userSettings = inject(SETTINGS)
  product = input<Product | null>(null);
  topCategories = signal<{
    label: string
    value: string
    color: string
  }[]>([]);
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
    this.form.reset(value ? productToFormValue(value) : this._defFormValue);
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

    if (!this.product()?.uuid) {
      this.nameField()!.focus();
    }
    this.form.markAsPristine()
  }

  private _loadUsingHistory() {
    this._productsRepository.getTopCategories().then(categories => {
      this.topCategories.set(categories.map(category => ({
        label: category.name,
        value: category.uuid ?? '',
        color: category.ownColor,
      })));
    });

    this._productsRepository.getTopSources().then(sources => {
      this.topSources.set(sources.map(source => ({
        label: source,
        value: source,
      })));
    });
  }

  protected readonly smaller = smaller;
}
