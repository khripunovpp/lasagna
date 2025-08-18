import {Component, forwardRef, ViewEncapsulation} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInput} from '@angular/material/input';
import {MAT_DATE_FORMATS, MatNativeDateModule, provideNativeDateAdapter} from '@angular/material/core';
import {CUSTOM_DATE_FORMATS} from '../../../shared/helpers/date-formats.helper';

@Component({
  selector: 'lg-date-picker',
  standalone: true,
  template: `
    <mat-form-field appearance="outline" class="lg-date-picker">
      <input
        matInput
        [matDatepicker]="picker"
        [value]="value"
        (dateChange)="onDateChange($event)"
        (blur)="onTouched()"
        [disabled]="disabled"
      >
      <mat-datepicker-toggle matIconSuffix [for]="picker"></mat-datepicker-toggle>
      <mat-datepicker #picker></mat-datepicker>
    </mat-form-field>
  `,
  imports: [
    MatFormFieldModule,
    MatDatepickerModule,
    MatInput
  ],
  encapsulation: ViewEncapsulation.None,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DatePickerComponent),
      multi: true
    },

  ],
  styles: [`

    lg-date-picker {
      display: flex;
      width: 100%;
    }

    .lg-date-picker {
      flex: 1;
      width: 100%;
      --mat-form-field-container-height: 51px;
      --mat-form-field-container-vertical-padding: 12px;

      .mat-mdc-text-field-wrapper {
        border-radius: 12px;
        background-color: #fff;
      }

      .mdc-text-field__input {
        font-family: var(--text-font) !important;
      }

      .mdc-notched-outline__trailing {
        border-radius: 0 12px 12px 0;
        border-color: transparent !important;
      }

      .mdc-notched-outline__leading {
        border-radius: 12px 0 0 12px;
        border-color: transparent !important;
      }

      .mat-mdc-form-field-subscript-wrapper {
        display: none;
      }
    }
  `]
})
export class DatePickerComponent implements ControlValueAccessor {
  value: Date | null = null;
  disabled = false;

  onChange: (value: Date | null) => void = () => {
  };
  onTouched: () => void = () => {
  };

  onDateChange(event: any) {
    this.value = event.value;
    this.onChange(this.value);
  }

  writeValue(value: Date | null): void {
    this.value = value;
  }

  registerOnChange(fn: (value: Date | null) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }
}
