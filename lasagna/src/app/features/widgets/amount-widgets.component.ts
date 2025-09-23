import {Component, output, signal, viewChild} from '@angular/core';
import {EggsWidgetComponent} from './eggs-widget/eggs-widget.component';
import {TranslatePipe} from '@ngx-translate/core';
import {DialogComponent} from '../../shared/view/ui/dialogs/dialog.component';
import {ButtonComponent} from '../../shared/view/ui/button.component';
import {MatIcon} from '@angular/material/icon';

@Component({
  selector: 'lg-amount-widgets',
  standalone: true,
  template: `
    <lg-button (click)="open()"
               [flat]="true"
               [icon]="true"
               [style]="'success'">
      <mat-icon aria-hidden="false" fontIcon="add"></mat-icon>
    </lg-button>

    <lg-dialog #dialog
               (onCancel)="onCancel()"
               (onConfirm)="onConfirm()"
               [centerButtons]="true"
               [showConfirmButton]="false"
               [displayFooter]="false"
               [columnButtons]="false">
      <div [class.selected]="selectedWidget() != null"
           class="amount-widgets">
        <div class="amount-widgets__buttons">
          <button (click)="onWidgetSelect('eggs')"
                  class="amount-widgets__button">{{ 'widgets.eggs.title' | translate }}
          </button>
        </div>
        @if (selectedWidget() === 'eggs') {
          <div class="amount-widgets__wrapper">
            <lg-eggs-widget (changed)="onEggsChanged($event)"></lg-eggs-widget>
          </div>
        }
      </div>
    </lg-dialog>
  `,
  imports: [
    EggsWidgetComponent,
    TranslatePipe,
    DialogComponent,
    ButtonComponent,
    MatIcon,
    MatIcon,
  ],
  styles: [
    `
      .amount-widgets {
        display: flex;
        gap: 16px;
        flex-direction: column;
      }

      .amount-widgets__input {
        flex: 1;
      }

      .amount-widgets__buttons {
        display: flex;
        gap: 16px;
        flex-wrap: wrap;
        padding: 16px;
        background-color: #fafafa;
        border-radius: 12px;
        margin: -16px;
      }

      .amount-widgets.selected .amount-widgets__buttons {
        margin-bottom: 0;
      }

      .amount-widgets__button {
        display: flex;
        padding: 8px 16px;
        border-radius: 16px;
        background-color: #e5de38;
        appearance: none;
        border: none;
        font-family: inherit;
        font-size: inherit;
      }
    `
  ]
})

export class AmountWidgetsComponent {
  constructor() {
  }

  eggsChanged = output<number | null>();
  selectedWidget = signal<string | null>(null);
  readonly dialog = viewChild(DialogComponent);

  onWidgetSelect(event: any) {
    this.selectedWidget.set(event);
  }


  onEggsChanged(event: any) {
    if (!event) return;
    this.eggsChanged.emit(event);
  }

  onConfirm() {

  }

  onCancel() {

  }

  open() {
    this.dialog()?.open();
  }

  close() {
    this.dialog()?.close();
  }
}
