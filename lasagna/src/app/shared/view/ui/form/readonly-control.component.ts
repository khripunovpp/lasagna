import {Component, ElementRef, Input, input, signal, ViewChild} from '@angular/core';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'lg-readonly-control',
  standalone: true,
  template: `
      <div class="lg-readonly-control">
          <input #input
                 [disabled]="true"
                 [placeholder]="placeholder()"
                 [readonly]="true"
                 [value]="value"
                 class="input"
                 type="text">

          <div [style.display]="noAfter() ? 'none' : 'flex'"
               class="lg-readonly-control__after">
              <ng-content select="after"></ng-content>
          </div>
      </div>
  `,
  styles: [
    `
      :host {
        display: flex;
        user-select: none;
        pointer-events: none;
      }

      .lg-readonly-control {
        display: flex;
        border-radius: 12px;
        gap: 16px;
        position: relative;
        opacity: 0.99;
        border: 1px solid var(--control-bg);

        &::after {
          content: '';
          position: absolute;
          z-index: -1;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background-color: var(--control-bg);
          border-radius: 12px;
          opacity: 0.4;
        }
      }

      .lg-readonly-control__after {
        display: flex;
        align-items: center;
        gap: 16px;
        padding: 0 16px;
        white-space: nowrap;
        flex: 0 0 auto;
      }

      .input {
        border: none;
        padding: 15px;
        border-radius: 12px;
        font-family: inherit;
        font-size: inherit;
        background-color: transparent;
        width: 100%;
        pointer-events: none;
        user-select: none;
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
    FormsModule
  ],
})

export class ReadonlyControlComponent {
  constructor() {
  }

  @ViewChild('input', {static: true}) input: ElementRef<HTMLInputElement> | undefined;
  @Input() value: string | number | null | undefined = '';
  placeholder = input('Enter text here');
  noAfter = signal(false);

  focus() {
    this.input?.nativeElement.focus();
  }

  ngAfterViewInit() {
    const after = this.input?.nativeElement.nextElementSibling;
    if (after?.childElementCount === 0) {
      this.noAfter.set(true);
    }
  }
}
