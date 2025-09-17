import {Component, effect, inject, viewChild} from '@angular/core';
import {DeleteConfirmationService} from './delete-confirmation.service';
import {DialogComponent} from '../dialogs/dialog.component';
import {TranslatePipe} from '@ngx-translate/core';
import {CheckboxComponent} from '../../../../features/controls/form/chckbox.component';
import {FormControl, ReactiveFormsModule} from '@angular/forms';
import {timer} from 'rxjs';
import {FlexColumnComponent} from '../../layout/flex-column.component';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';

@Component({
  selector: 'lg-delete-confirmation-popover',
  template: `
    <lg-dialog (onCancel)="onCancel()"
               (onConfirm)="onConfirm()"
               [cancelButtonStyle]="'primary'"
               [cancelButtonText]="'delete-close-label'|translate"
               [centerButtons]="true"
               [columnButtons]="false"
               [confirmButtonStyle]="'secondary'"
               [confirmButtonText]="'delete-confirm-label'|translate">
      <lg-flex-column [position]="'center'" [size]="'small'">
        <div>{{ settings()?.message }}</div>

        @if (settings()?.withLock) {
          <lg-checkbox [formControl]="locked"
                       [size]="'medium'"
                       name="disable-deletion">
            {{ 'delete-lock-label' | translate }}
          </lg-checkbox>
        }
      </lg-flex-column>
    </lg-dialog>
  `,
  imports: [
    DialogComponent,
    TranslatePipe,
    CheckboxComponent,
    ReactiveFormsModule,
    FlexColumnComponent
  ]
})
export class DeleteConfirmationPopoverComponent {
  readonly _service = inject(DeleteConfirmationService);
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

  private _emit(confirmed: boolean) {
    if (confirmed) {
      this.settings()?.onSuccess();
    } else {
      this.settings()?.onCancel?.();
    }
    this.settings.set(null);
  }
}
