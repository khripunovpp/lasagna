import {
  Component,
  computed,
  contentChildren,
  ElementRef,
  forwardRef,
  input,
  output,
  signal,
  ViewChild
} from '@angular/core';
import {ControlValueAccessor, FormsModule, NG_VALUE_ACCESSOR} from '@angular/forms';
import {removeAllNonMathSymbols} from '../../../helpers/strings.helper';
import {ParseMathDirective} from '../../directives/parse-math.directive';
import {ControlExtraTemplateDirective} from './control-extra-template.directive';
import {NgTemplateOutlet} from '@angular/common';

@Component({
  selector: 'lg-number-input',
  standalone: true,
  template: `
      <div [class.disabled]="disable()"
           class="lg-number-input">
           @if (beforeExtraTpl()?.templateRef) {
              <div class="lg-number-input__before">
                  <ng-container *ngTemplateOutlet="beforeExtraTpl()!.templateRef"></ng-container>
              </div>
          }
          <input #input
                 (change)="onInputChange.emit(value)"
                 (input)="onChangeInput($event)"
                 (keydown)="onKeydown.emit()"
                 [disabled]="disable()"
                 [placeholder]="placeholder()"
                 [value]="value"
                 class="input"
                 type="tel">
          @if (afterExtraTpl()?.templateRef) {
              <div class="lg-number-input__after">
                  <ng-container *ngTemplateOutlet="afterExtraTpl()!.templateRef"></ng-container>
              </div>
          }

      </div>

  `,
  styles: [
    `
      :host {
        display: flex;
        flex: 1;
      }


      .lg-number-input__after {
        display: flex;
        align-items: center;
        gap: 16px;
        padding: 0 16px 0 0;
      }
      .lg-number-input__before {
        display: flex;
        align-items: center;
        gap: 16px;
        padding: 0 0 0 16px;
      }

      .lg-number-input {
        display: flex;
        flex: 1;
        background-color: var(--control-bg);
        border-radius: 12px;
        gap: 16px;
      }

      .lg-number-input.disabled {
        opacity: 0.7;
      }

      .input {
        flex: 1;
        border: none;
        padding: 16px;
        font-family: inherit;
        font-size: inherit;
        background-color: transparent;
        border-radius: 12px;
        width: 100%;
      }

      .input::placeholder {
        color: var(--placeholder);
      }

      .input:focus {
        outline: none;
        box-shadow: var(--focus-shadow);
      }
    `
  ],
  imports: [
    FormsModule,
    NgTemplateOutlet
  ],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => NumberInputComponent),
      multi: true
    }
  ]
})

export class NumberInputComponent
  implements ControlValueAccessor {
  constructor() {
  }

  @ViewChild('input', {static: true}) input: ElementRef<HTMLInputElement> | undefined;
  value: string = '';
  placeholder = input('Enter text here');
  disable = input<boolean>(false);
  onKeydown = output();
  onInputChange = output<string>(); extraTpl = contentChildren(ControlExtraTemplateDirective, {descendants: true});
  afterExtraTpl = computed(() => {
    return this.extraTpl().find(tpl => tpl.place() === 'after');
  });
  beforeExtraTpl = computed(() => {
    return this.extraTpl().find(tpl => tpl.place() === 'before');
  });

  onChange: (value: string) => void = () => {
  };

  onTouched: () => void = () => {
  };

  writeValue(value: string): void {
    this._change(value);
  }

  registerOnChange(fn: any) {
    this.onChange = fn;
  }

  registerOnTouched(fn: any) {
    this.onTouched = fn;
  }

  onChangeInput(
    event: Event
  ) {
    this._change((event.target as HTMLInputElement).value);
  }

  focus() {
    this.input?.nativeElement.focus();
  }

  ngAfterViewInit() {
  }

  private _change(value: string) {
    this.value = value ? removeAllNonMathSymbols(value) : '';
    if (this.input?.nativeElement) {
      this.input.nativeElement.value = this.value;
    }
    this.onChange(this.value);
  }
}
