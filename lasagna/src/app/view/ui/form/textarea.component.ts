import {Component} from '@angular/core';
import {ControlValueAccessor, FormsModule, NG_VALUE_ACCESSOR} from '@angular/forms';

@Component({
  selector: 'lg-textarea',
  standalone: true,
  template: `
      <textarea (ngModelChange)="onChange($event)"
                [ngModel]="value"
                class="textarea"></textarea>
  `,
  styles: [
    `
          :host {
        display: flex;
        flex: 1;
      }
      .textarea {

        flex: 1;
        border: none;
        border-radius: 12px;
        padding: 16px;
        background-color: var(--control-bg);
        font-family: inherit;
        font-size: inherit;
      }

      .textarea::placeholder {
        color: var(--placeholder);
      }

      .textarea:focus {
        outline: none;
        box-shadow: var(--focus-shadow);
      }
    `
  ],
  imports: [
    FormsModule
  ],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: TextareaComponent,
      multi: true
    }
  ]
})

export class TextareaComponent
  implements ControlValueAccessor {
  constructor() {
  }

  value: string = '';
  onChange: (value: string) => void = () => {
  };
  onTouched: () => void = () => {
  };

  writeValue(value: string): void {
    this.value = value;
    this.onChange(this.value);
  }

  registerOnChange(fn: any) {
    this.onChange = fn;
  }

  registerOnTouched(fn: any) {
    this.onTouched = fn;
  }

  onChangeInput(value: string) {
    this.onChange(value);
  }
}
