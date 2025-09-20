import {
  AfterViewInit,
  Component,
  computed,
  effect,
  inject,
  input,
  OnInit,
  signal,
  viewChild,
  ViewEncapsulation
} from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';

import {FlexColumnComponent} from '../../../../shared/view/layout/flex-column.component';
import {ProductsRepository} from '../../service/products.repository';
import {SelectResourcesService} from '../../../../shared/service/services/select-resources.service';
import {Router} from '@angular/router';
import {MultiselectComponent} from '../../../controls/form/multiselect.component';
import {NumberInputComponent} from '../../../controls/form/number-input.component';
import {TooltipComponent} from '../../../../shared/view/ui/tooltip.component';
import {AmountWidgetsComponent} from '../../../widgets/amount-widgets.component';
import {ParseMathDirective} from '../../../../shared/view/directives/parse-math.directive';
import {FlexRowComponent} from '../../../../shared/view/layout/flex-row.component';
import {ExpandDirective} from '../../../../shared/view/directives/expand.directive';
import {ChipsListComponent} from '../../../controls/form/chips-list.component';
import {NotificationsService} from '../../../../shared/service/services/notifications.service';
import {AutocompleteComponent} from '../../../controls/form/autocomplete.component';
import {Product} from '../../service/Product';
import {hasMicroPrice, productToFormValue} from '../../../../shared/helpers/product.helpers';
import {debounceTime} from 'rxjs';
import {TranslateDirective, TranslatePipe} from '@ngx-translate/core';
import {CardComponent} from '../../../../shared/view/ui/card/card.component';
import {MatIcon} from '@angular/material/icon';
import {ButtonComponent} from '../../../../shared/view/ui/button.component';
import {WidthDirective} from '../../../../shared/view/directives/width.directive';
import {UnitSwitcherComponent} from '../../../../shared/view/ui/unit-switcher.component';
import {SETTINGS} from '../../../settings/service/providers/settings.token';
import {CurrencySymbolPipe} from '../../../../shared/view/pipes/currency-symbol.pipe';
import {smaller} from 'mathjs';
import {InputComponent} from '../../../controls/form/input.component';
import {ControlExtraTemplateDirective} from "../../../controls/form/control-extra-template.directive";
import {ControlComponent} from '../../../controls/form/control-item/control.component';
import {UnitValue} from "../../../../shared/view/const/units.const";
import {ReadonlyControlComponent} from '../../../controls/form/readonly-control.component';
import {UnitStringPipe} from '../../../../shared/view/pipes/unitString.pipe';
import {ControlLabelTemplateDirective} from '../../../controls/form/control-item/control-label-template.directive';
import {DecimalPipe} from '@angular/common';
import {TextareaComponent} from '../../../controls/form/textarea.component';
import {SettingsKeysConst} from '../../../settings/const/settings-keys.const';
import {SettingsService} from '../../../settings/service/services/settings.service';
import {errorHandler} from '../../../../shared/helpers';


@Component({
  selector: 'lg-add-product-form',
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
    ReadonlyControlComponent,
    UnitStringPipe,
    ControlLabelTemplateDirective,
    TranslateDirective,
    DecimalPipe,
    TextareaComponent,
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
    private _settingsService: SettingsService,
  ) {
  }

  readonly precisions = computed(() => this._settingsService.settingsSignal()?.getSetting(SettingsKeysConst.pricePrecision)?.data ?? 2);
  readonly pipesDigits = computed(() => `1.0-${this.precisions()}`);
  form = new FormGroup({
    name: new FormControl<string | null>(null, Validators.required),
    amount: new FormControl<number | null>(null, Validators.required),
    price: new FormControl<number | null>(null, Validators.required),
    unit: new FormControl('gram'),
    source: new FormControl<string | null>(null),
    brand: new FormControl<string | null>(null),
    notes: new FormControl<string | null>(null),
    category_id: new FormControl<any>(null),
  });
  userSettings = inject(SETTINGS)
  product = input<Product | null>(null);
  readonly hasMicroPrice = computed(() => {
    return hasMicroPrice(this.product()?.pricePerUnit ?? 0)
  });
  editMode = input(false);
  topCategories = signal<{
    label: string
    value: string
    color: string
  }[]>([]);
  topSources = signal<any[]>([]);
  topBrands = signal<any[]>([]);
  nameField = viewChild<InputComponent>('nameField');
  amountField = viewChild<NumberInputComponent>('amountField');
  priceField = viewChild<NumberInputComponent>('priceField');
  protected readonly smaller = smaller;
  protected readonly UnitValue = UnitValue;
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
      brand: null,
      notes: null,
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
      this._focusFirstEmptyControl();
      this.form.markAsPristine()
    }).catch(err => {
      this._notificationsService.error(errorHandler(err));
    });
  }

  private _focusFirstEmptyControl() {
    if (this.editMode()) {
      return
    }

    if (!this.form.value.name?.length) {
      this.nameField()!.focus();
    } else if (!this.form.value.amount) {
      this.amountField()!.focus();
    } else if (!this.form.value.price) {
      this.priceField()!.focus();
    } else {
      this.nameField()!.focus();
    }
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

    this._productsRepository.getTopBrands().then(brands => {
      this.topBrands.set(brands.map(brand => ({
        label: brand,
        value: brand,
      })));
    });
  }
}
