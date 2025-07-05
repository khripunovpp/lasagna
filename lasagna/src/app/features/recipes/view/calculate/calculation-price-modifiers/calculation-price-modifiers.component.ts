import {Component, computed, effect, forwardRef, inject, input, output} from '@angular/core';
import {RecipePriceModifier} from '../../../../price-modifiers/service/PriceModifier';
import {NumberInputComponent} from '../../../../../shared/view/ui/form/number-input.component';
import {ParseMathDirective} from '../../../../../shared/view/directives/parse-math.directive';
import {ControlValueAccessor, FormControl, FormGroup, NG_VALUE_ACCESSOR, ReactiveFormsModule} from '@angular/forms';
import {UnitGroupItem, UnitSwitcherComponent} from '../../../../../shared/view/ui/unit-switcher.component';
import {ControlExtraTemplateDirective} from '../../../../../shared/view/ui/form/control-extra-template.directive';
import {SETTINGS} from '../../../../settings/service/providers/settings.token';
import {toSignal} from '@angular/core/rxjs-interop';
import {CurrencySymbolPipe} from '../../../../../shared/view/pipes/currency-symbol.pipe';
import {RecipeCost} from '../../../service/models/RecipeCost';
import {FlexRowComponent} from '../../../../../shared/view/ui/layout/flex-row.component';

@Component({
  selector: 'lg-calculation-price-modifiers',
  imports: [
    NumberInputComponent,
    ParseMathDirective,
    ReactiveFormsModule,
    UnitSwitcherComponent,
    ControlExtraTemplateDirective,
    CurrencySymbolPipe,
    FlexRowComponent
  ],
  template: `
    <lg-flex-row [formGroup]="recipePriceAdditionsForm">
      <lg-number-input formControlName="value"
                       lgParseMath
                       placeholder="extra price">
        <ng-template lgExtraTpl place="before">
          <lg-unit-switcher [items]="additionalPriceType"
                            formControlName="type">
          </lg-unit-switcher>
          <lg-unit-switcher [items]="additionalPriceAction"
                            formControlName="action">
          </lg-unit-switcher>
        </ng-template>

        @if (showPriceAdditionUnits()) {
          <ng-template lgExtraTpl place="after">
            <lg-unit-switcher formControlName="unit"
                              [items]="additionalPriceUnit">
            </lg-unit-switcher>
          </ng-template>
        }

        @if (roundActionSelected()) {
          <ng-template lgExtraTpl place="after">
            <b>{{ userSettings()['currency']|currencySymbol }}
              /
              {{ recipeCost()?.outcomeUnit }}
            </b>
          </ng-template>
        }
      </lg-number-input>
    </lg-flex-row>

  `,
  styles: [`
    :host {
      width: 100%;
    }
  `],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CalculationPriceModifiersComponent),
      multi: true,
    },
  ]
})
export class CalculationPriceModifiersComponent
  implements ControlValueAccessor {
  recipePriceAdditionsForm = new FormGroup({
    action: new FormControl<'add' | 'round'>('add'),
    value: new FormControl<number | string>(0),
    unit: new FormControl<'currency' | 'percent'>('currency'),
    type: new FormControl<'per_unit' | 'total'>('per_unit'),
  });
  recipeCost = input<RecipeCost | null>();
  values = toSignal(this.recipePriceAdditionsForm.valueChanges);
  userSettings = inject(SETTINGS);
  additionalPriceUnit: UnitGroupItem[] = [
    {
      label: '$',
      value: 'currency',
      style: 'secondary',
    },
    {
      label: '%',
      value: 'percent',
      style: 'secondary',
    },
  ];
  additionalPriceAction: UnitGroupItem[] = [
    {
      label: 'Add',
      value: 'add',
      style: 'secondary',
    },
    {
      label: 'Round to',
      value: 'round',
      style: 'secondary',
    },
  ];
  additionalPriceType: UnitGroupItem[] = [
    {
      label: 'Per unit',
      value: 'per_unit',
      style: 'secondary',
    },
    {
      label: 'Total',
      value: 'total',
      style: 'secondary',
    },
  ];
  onChanged = output<RecipePriceModifier[]>();

  showPriceAdditionUnits = computed(() => {

    return true;
  });
  roundActionSelected = computed(() => {
    return this.values()?.action === 'round';
  });

  onChangeFn: (...args: any[]) => void = () => {
  };

  changesEffect = effect(() => {
    this.onChangeFn(this.values());
  })

  registerOnChange(fn: any): void {
    this.onChangeFn = fn;
  }

  registerOnTouched(fn: any): void {
  }

  writeValue(obj: any): void {
    this.recipePriceAdditionsForm.patchValue({
      action: obj?.action || 'add',
      value: obj?.value || 0,
      unit: obj?.unit || 'currency',
      type: obj?.type || 'per_unit',
    }, {emitEvent: false});
  }
}
