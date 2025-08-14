import {Component, effect, inject, input, output, signal} from '@angular/core';
import {CardComponent} from '../card/card.component';
import {ButtonComponent} from '../layout/button.component';
import {FocusTrapDirective} from '../focus-trap.directive';
import {BODY_LOCKER} from '../../../service/providers/body-locker.provider';

@Component({
  selector: 'lg-dialog',
  standalone: true,
  template: `
    <div [style.display]="displayed() ? 'flex' : 'none'"
         class="dialog" (click)="close()">
      <div class="dialog__container">
        <div class="dialog__wrap">
          <div class="dialog__box" lgFocusTrap>
            @if (closeButton()) {
              <button class="dialog__close-button"
                      aria-label="Close dialog">
                Close
              </button>
            }
            <lg-card (click)="$event.stopPropagation()">
              <div class="dialog__inner-container">

                <div class="dialog__inner">
                  <ng-content></ng-content>
                </div>

                @if (displayFooter()) {
                  <div class="dialog__footer">
                    <lg-button (click)="onCancelClick()"
                               [style]="'secondary'"
                               class="dialog__cancel-button">
                      {{ cancelButtonText() }}
                    </lg-button>

                    <lg-button (click)="onConfirmClick()"
                               class="dialog__confirm-button">
                      {{ confirmButtonText() }}
                    </lg-button>
                  </div>
                }
              </div>
            </lg-card>
          </div>
        </div>
      </div>
    </div>
  `,
  imports: [
    CardComponent,
    ButtonComponent,
    FocusTrapDirective
  ],
  styles: [`
    .dialog {
      display: flex;
      position: fixed;
      z-index: 9;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: rgba(0, 0, 0, 0.5);
      justify-content: center;
      align-items: center;
      overflow-y: auto;
    }

    .dialog__container {
      width: clamp(300px, 100%, 800px);
      height: 100%;
    }

    .dialog__box {
      width: 100%;
    }

    .dialog__wrap {
      padding: 96px 32px 32px;
      display: flex;
      justify-content: center;
      align-items: center;
    }

    .dialog__box {
    }

    .dialog__inner-container {
      display: flex;
      flex-direction: column;
      gap: 16px;
    }

    .dialog__footer {
      display: flex;
      align-items: center;
      gap: 16px;
      border-top: 1px solid #f5f5f5;
      padding-top: 16px;
    }

    .dialog__close-button {
      appearance: none;
      border: none;
      background: #f5f5f5;
      font-family: inherit;
      font-size: 16px;
      line-height: 1;
      padding: 4px 8px;
      border-radius: 8px;
      margin-bottom: 16px;
      transition: transform 0.2s ease-in-out;
      cursor: pointer;

      &:hover {
        transform: scale(0.9);
      }
    }
  `]

})
export class DialogComponent {
  constructor() {
  }

  displayed = signal(false);
  closeButton = input(true);
  cancelButtonText = input('Cancel');
  confirmButtonText = input('Confirm');
  closeOnConfirm = input(true);
  displayFooter = input(true);
  onCancel = output<void>();
  onConfirm = output<void>();
  readonly #_bodyLocker = inject(BODY_LOCKER);
  displayedEffect = effect(() => {
    if (this.displayed()) {
      this.#_bodyLocker.lock();
    } else {
      this.#_bodyLocker.unlock();
    }
  });

  onEscKeyDown(event: unknown) {
    console.log(event)
    this.close();
  }

  onCancelClick() {
    this.onCancel.emit();
    this.close();
  }

  onConfirmClick() {
    this.onConfirm.emit();
    if (!this.closeOnConfirm()) return;
    this.close();
  }

  open() {
    this.displayed.set(true);
  }

  close() {
    this.displayed.set(false);
  }
}
