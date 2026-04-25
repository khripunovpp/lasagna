import {Component, computed, effect, forwardRef, input, signal, ViewEncapsulation} from '@angular/core';
import {ControlValueAccessor, FormControl, FormGroup, NG_VALUE_ACCESSOR, ReactiveFormsModule} from '@angular/forms';
import {toSignal} from '@angular/core/rxjs-interop';
import {TranslatePipe} from '@ngx-translate/core';
import {marker} from '@colsen1991/ngx-translate-extract-marker';
import {UnitGroupItem, UnitSwitcherComponent} from '../../../../../shared/view/ui/unit-switcher.component';
import {NumberInputComponent} from '../../../../controls/form/number-input.component';
import {ControlExtraTemplateDirective} from '../../../../controls/form/control-extra-template.directive';
import {ParseMathDirective} from '../../../../../shared/view/directives/parse-math.directive';
import {ShrinkageValue} from '../../../service/models/Recipe';
import {FlexRowComponent} from '../../../../../shared/view/layout/flex-row.component';
import {matchMediaSignal} from '../../../../../shared/view/signals/match-media.signal';
import {mobileBreakpoint} from '../../../../../shared/view/const/breakpoints';
import {QuestionMarkComponent} from '../../../../../shared/view/ui/question-mark.component';

@Component({
  selector: 'lg-shrinkage-control',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    UnitSwitcherComponent,
    NumberInputComponent,
    ControlExtraTemplateDirective,
    ParseMathDirective,
    TranslatePipe,
    FlexRowComponent,
    QuestionMarkComponent,
  ],
  template: `
    <lg-flex-row [formGroup]="form">
      <lg-number-input [max]="maxValue()"
                       [min]="0"
                       [moveBeforeAbove]="isMobile()"
                       [placeholder]="'0'"
                       [right]="true"
                       formControlName="value"
                       lgParseMath
                       name="shrinkage-value">
        <ng-template lgExtraTpl place="before">
          <div>{{ labelKey() | translate }}</div>
        </ng-template>

        <ng-template lgExtraTpl place="after">
          <lg-unit-switcher [items]="modeItems" formControlName="mode"></lg-unit-switcher>

          <lg-question [text]="'recipe.calculation.shrinkage.info' | translate"></lg-question>
        </ng-template>
      </lg-number-input>
    </lg-flex-row>
  `,
  styles: [`
    .shrinkage-control__view {
      cursor: pointer;
      display: flex;
      align-items: center;
      gap: 4px;
    }

    .shrinkage-control__percent {
      text-decoration: underline;
      text-decoration-style: dashed;
      color: var(--active-color);
    }

  `],
  encapsulation: ViewEncapsulation.None,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => ShrinkageControlComponent),
      multi: true,
    }
  ]
})
export class ShrinkageControlComponent implements ControlValueAccessor {
  totalWeight = input<number>(0);
  isMobile = matchMediaSignal(mobileBreakpoint);
  form = new FormGroup({
    value: new FormControl<number | string>(0),
    mode: new FormControl<'percent' | 'weight'>('percent'),
  });
  modeItems: UnitGroupItem[] = [
    {label: '%', value: 'percent', style: 'secondary'},
    {label: marker('unit.gram'), value: 'weight', style: 'secondary'},
  ];
  formValues = toSignal(this.form.valueChanges);
  private _value = signal<ShrinkageValue>({value: 0, mode: 'percent'});
  maxValue = computed(() =>
    this._value().mode === 'weight' ? this.totalWeight() * 2 : 100
  );

  labelKey = computed(() =>
    this._value().mode === 'weight'
      ? marker('recipe.calculation.shrinkage.label.weight')
      : marker('recipe.calculation.shrinkage.label')
  );

  onChangeFn: (value: ShrinkageValue) => void = () => {
  };

  changesEffect = effect(() => {
    const v = this.formValues();
    if (!v) return;
    const newValue: ShrinkageValue = {
      value: parseFloat(v.value as any) || 0,
      mode: (v.mode as 'percent' | 'weight') || 'percent',
    };
    this._value.set(newValue);
    this.onChangeFn(newValue);
  });

  onTouched: () => void = () => {
  };

  writeValue(value: ShrinkageValue): void {
    if (value) {
      this._value.set({value: value.value || 0, mode: value.mode || 'percent'});
      this.form.patchValue({value: value.value || 0, mode: value.mode || 'percent'}, {emitEvent: false});
    }
  }

  registerOnChange(fn: any) {
    this.onChangeFn = fn;
  }

  registerOnTouched(fn: any) {
    this.onTouched = fn;
  }
}
