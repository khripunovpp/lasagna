import {Component, effect, inject, input, viewChild} from '@angular/core';
import {ConfirmationService} from './confirmation.service';
import {DialogComponent} from '../dialogs/dialog.component';
import {TranslatePipe} from '@ngx-translate/core';

import {FormControl, ReactiveFormsModule} from '@angular/forms';
import {timer} from 'rxjs';
import {FlexColumnComponent} from '../../layout/flex-column.component';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';
import {ButtonComponent} from '../button/button.component';

@Component({
  selector: 'lg-confirmation-popover',
  template: `
    <lg-dialog (onCancel)="onCancel()"
               (onConfirm)="onConfirm()"
               [cancelButtonStyle]="'primary'"
               [cancelButtonText]="settings()?.cancelText ?? ('confirm-close-label'|translate)"
               [centerButtons]="true"
               [columnButtons]="false"
               [confirmButtonStyle]="'secondary'"
               [confirmButtonText]="settings()?.confirmText ?? ('confirm-confirm-label'|translate)"
               [name]="name()">
      <lg-flex-column [position]="'center'" [size]="'small'">
        <div class="text-wrap">{{ settings()?.message }}</div>
        @if (settings()?.extraAction; as extra) {
          <lg-button [flat]="true"
                     [style]="'info'"
                     [attr.data-u2e]="'dialog-' + name() + '.extra-action'"
                     (onClick)="onExtraAction(extra.handler)">
            {{ extra.label }}
          </lg-button>
        }
      </lg-flex-column>
    </lg-dialog>
  `,
  imports: [
    DialogComponent,
    TranslatePipe,
    ReactiveFormsModule,
    FlexColumnComponent,
    ButtonComponent
  ]
})
export class ConfirmationPopoverComponent {
  readonly _service = inject(ConfirmationService);
  readonly settings = this._service.settings;
  readonly dialogRef = viewChild(DialogComponent);
  readonly locked = new FormControl(false);
  eff = effect(() => {
    if (this.settings() && !this.locked.value) {
      this.dialogRef()?.open();
    } else {
      this.dialogRef()?.close();
    }
  });
  name = input('confirmation-popover');

  onConfirm() {
    this._emit(true);

    if (this.locked.value) {
      timer(50000).pipe(takeUntilDestroyed()).subscribe(() => {
        this.locked.setValue(false);
      })
    }
  }

  onCancel() {
    this._emit(false);
    this.locked.setValue(false);
  }

  onExtraAction(handler: () => void) {
    handler();
    this.settings.set(null);
  }

  private _emit(confirmed: boolean) {
    if (confirmed) {
      this.settings()?.onSuccess();
    } else {
      this.settings()?.onCancel?.();
    }
    this.settings.set(null);
  }
}
