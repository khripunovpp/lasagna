import {Component, ElementRef, input, ViewChild} from '@angular/core';
import {ControlValueAccessor, FormsModule, NG_VALUE_ACCESSOR} from '@angular/forms';

@Component({
  selector: 'lg-textarea',
  standalone: true,
  template: `
      <div [class.textarea--flatten]="flatten()"
           [attr.data-replicated-value]="value"
           class="textarea">
           <textarea #input
                     (input)="onChangeInput($event)"
                     [placeholder]="placeholder()"
                     [value]="value"
                     class="textarea__control"
           ></textarea>
      </div>
  `,
  styles: [
    `
      :host {
        display: flex;
        flex: 1;
      }

      .textarea {
        display: grid;
        width: 100%;
      }

      .textarea::after {
        /* Note the weird space! Needed to preventy jumpy behavior */
        content: attr(data-replicated-value) " ";

        /* This is how textarea text behaves */
        white-space: pre-wrap;

        /* Hidden from view, clicks, and screen readers */
        visibility: hidden;
      }

      .textarea__control,
      .textarea::after {
        /* Identical styling required!! */
        border: 1px solid black;
        font: inherit;

        /* Place on top of each other */
        grid-area: 1 / 1 / 2 / 2;
      }

      .textarea__control {
        /* You could leave this, but after a user resizes, then it ruins the auto sizing */
        resize: none;

        /* Firefox shows scrollbar on growth, you can hide like this. */
        overflow: hidden;
        flex: 1;
        border: none;
        border-radius: 12px;
        padding: 16px;
        background-color: var(--control-bg);
        font-family: inherit;
        font-size: var(--control-font-size);
        field-sizing: normal;
      }

      .textarea__control::placeholder {
        color: var(--placeholder);
      }

      .textarea__control:focus {
        outline: none;
        box-shadow: var(--focus-shadow);
      }

      .textarea--flatten .textarea__control {
        border-radius: 0;
        background-color: transparent;
        padding: 0;
      }

      .textarea--flatten .textarea__control:focus,
      .textarea--flatten .textarea__control:hover{
        box-shadow: var(--control-hover-focus-shadow);
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

  autoHeight = input<boolean>(false);
  flatten = input<boolean>(false);
  rows = input<number>(5);
  @ViewChild('input', {static: true}) input: ElementRef<HTMLInputElement> | undefined;
  value: string = '';
  placeholder = input('Enter text here');

  onChange: (value: string) => void = () => {
  };

  onTouched: () => void = () => {
  };

  writeValue(value: string): void {
    this.changeValue(value);
  }

  registerOnChange(fn: any) {
    this.onChange = fn;
  }

  focus() {
    this.input?.nativeElement.focus();
  }

  registerOnTouched(fn: any) {
    this.onTouched = fn;
  }

  changeValue(value: string): void {
    this.value = value;
    this.onChange(this.value);
  }

  onChangeInput(
    event: Event
  ) {
    this.changeValue((event.target as HTMLInputElement).value);
  }
}
