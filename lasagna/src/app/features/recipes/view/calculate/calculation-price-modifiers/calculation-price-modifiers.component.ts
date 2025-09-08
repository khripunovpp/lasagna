import {Component, computed, effect, forwardRef, inject, input, output} from '@angular/core';
import {RecipePriceModifier} from '../../../service/PriceModifier';
import {NumberInputComponent} from '../../../../controls/form/number-input.component';
import {ParseMathDirective} from '../../../../../shared/view/directives/parse-math.directive';
import {ControlValueAccessor, FormControl, FormGroup, NG_VALUE_ACCESSOR, ReactiveFormsModule} from '@angular/forms';
import {UnitGroupItem, UnitSwitcherComponent} from '../../../../../shared/view/ui/unit-switcher.component';
import {ControlExtraTemplateDirective} from '../../../../controls/form/control-extra-template.directive';
import {SETTINGS} from '../../../../settings/service/providers/settings.token';
import {toSignal} from '@angular/core/rxjs-interop';
import {CurrencySymbolPipe} from '../../../../../shared/view/pipes/currency-symbol.pipe';
import {RecipeCost} from '../../../service/models/RecipeCost';
import {FlexRowComponent} from '../../../../../shared/view/layout/flex-row.component';
import {matchMediaSignal} from '../../../../../shared/view/signals/match-media.signal';
import {mobileBreakpoint} from '../../../../../shared/view/const/breakpoints';
import {currencyStringToSymbol} from '../../../../../shared/helpers/assets/currency.helper';
import {marker} from '@colsen1991/ngx-translate-extract-marker';
import {TranslatePipe} from '@ngx-translate/core';

@Component({
  selector: 'lg-calculation-price-modifiers',
  imports: [
    NumberInputComponent,
    ParseMathDirective,
    ReactiveFormsModule,
    UnitSwitcherComponent,
    ControlExtraTemplateDirective,
    CurrencySymbolPipe,
    FlexRowComponent,
    TranslatePipe
  ],
  template: `
    <lg-flex-row [formGroup]="recipePriceAdditionsForm">
      <lg-number-input [moveBeforeAbove]="isMobile()"
                       [placeholder]="'price-modifier.placeholder' | translate"
                       formControlName="value"
                       lgParseMath>
        <ng-template lgExtraTpl place="before">
          <lg-unit-switcher [items]="additionalPriceType"
                            formControlName="type">
          </lg-unit-switcher>
          <lg-unit-switcher [items]="additionalPriceAction"
                            formControlName="action">
          </lg-unit-switcher>
        </ng-template>


        @if (roundActionSelected()) {
          <ng-template lgExtraTpl place="after">
            {{ userSettings()['currency']|currencySymbol }}
          </ng-template>
        } @else {
          <ng-template lgExtraTpl place="after">
            <lg-unit-switcher formControlName="unit"
                              [items]="additionalPriceUnit">
            </lg-unit-switcher>
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
  constructor() {
  }
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
      label: currencyStringToSymbol(this.userSettings()['currency'] || 'USD'),
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
      label: marker('price-modifier.add'),
      value: 'add',
      style: 'secondary',
    },
    {
      label: marker('price-modifier.round'),
      value: 'round',
      style: 'secondary',
    },
  ];
  additionalPriceType: UnitGroupItem[] = [
    {
      label: marker('price-modifier.per-unit'),
      value: 'per_unit',
      style: 'secondary',
    },
    {
      label: marker('price-modifier.total'),
      value: 'total',
      style: 'secondary',
    },
  ];
  onChanged = output<RecipePriceModifier[]>();
  isMobile = matchMediaSignal(mobileBreakpoint);

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
    });
  }
}
