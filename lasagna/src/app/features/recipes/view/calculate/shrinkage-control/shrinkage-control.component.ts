import {Component, effect, forwardRef, input, signal, ViewEncapsulation} from '@angular/core';
import {ControlValueAccessor, FormControl, FormGroup, NG_VALUE_ACCESSOR, ReactiveFormsModule, Validators} from '@angular/forms';
import {toSignal} from '@angular/core/rxjs-interop';
import {computed} from '@angular/core';
import {DecimalPipe} from '@angular/common';
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
    DecimalPipe,
    FlexRowComponent,
  ],
  template: `
    @if (isEditing()) {
      <lg-flex-row [formGroup]="form">
        <lg-number-input lgParseMath
                         [moveBeforeAbove]="isMobile()"
                         name="shrinkage-value"
                         [placeholder]="'0'"
                         [min]="0"
                         [max]="maxValue()"
                         formControlName="value">
          <ng-template lgExtraTpl place="before">
            <div>{{ labelKey() | translate }}</div>
          </ng-template>

          <ng-template lgExtraTpl place="after">
            <lg-unit-switcher [items]="modeItems" formControlName="mode"></lg-unit-switcher>
          </ng-template>
        </lg-number-input>

      </lg-flex-row>
    } @else {
      <div class="shrinkage-control__view" (click)="startEditing()">
        {{ labelKey() | translate }}:
        <span class="shrinkage-control__percent">{{ displayPercent() | number: '1.0-1' }}%</span>
      </div>
    }
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
  isEditing = signal(false);
  isMobile = matchMediaSignal(mobileBreakpoint);

  private _value = signal<ShrinkageValue>({value: 0, mode: 'percent'});

  form = new FormGroup({
    value: new FormControl<number | string>(0),
    mode: new FormControl<'percent' | 'weight'>('percent'),
  });

  modeItems: UnitGroupItem[] = [
    {label: '%', value: 'percent', style: 'secondary'},
    {label: marker('unit.gram'), value: 'weight', style: 'secondary'},
  ];

  formValues = toSignal(this.form.valueChanges);

  maxValue = computed(() =>
    this._value().mode === 'weight' ? this.totalWeight() : 100
  );

  labelKey = computed(() =>
    this._value().mode === 'weight'
      ? marker('recipe.calculation.shrinkage.label.weight')
      : marker('recipe.calculation.shrinkage.label')
  );

  displayPercent = computed(() => {
    const v = this._value();
    if (v.mode === 'percent') return v.value || 0;
    const tw = this.totalWeight();
    if (!tw || !v.value || v.value >= tw) return 0;
    return ((tw - v.value) / tw) * 100;
  });

  onChangeFn: (value: ShrinkageValue) => void = () => {
  };
  onTouched: () => void = () => {
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

  startEditing() {
    this.isEditing.set(true);
  }

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
