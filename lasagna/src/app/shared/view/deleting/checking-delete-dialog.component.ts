import {Component, inject, OnInit} from '@angular/core';
import {DeletingService} from '../../service/services/deleting.service';
import {NotificationsService} from '../../service/services';
import {errorHandler} from '../../helpers';
import {AUTHENTICATED} from '../../../features/account/account.token';
import {ConfirmationPopoverComponent} from '../ui/confirmation-popover/confirmation-popover.component';
import {ConfirmationService} from '../ui/confirmation-popover/confirmation.service';
import {HAS_SYNC_FEATURE} from '../../../features/sync/service/can-sync.token';
import {TranslateService} from '@ngx-translate/core';
import {Router} from '@angular/router';

@Component({
  selector: 'lg-checking-delete-dialog',
  template: `
    <lg-confirmation-popover name="checking-delete-dialog"></lg-confirmation-popover>
  `,
  standalone: true,
  providers: [
    ConfirmationService,
  ],
  imports: [
    ConfirmationPopoverComponent
  ]
})
export class CheckingDeleteDialogComponent
  implements OnInit {
  constructor() {
  }

  private readonly _deleteConfirmationService = inject(ConfirmationService);
  private readonly _deletingService = inject(DeletingService);
  private readonly _notificationsService = inject(NotificationsService);
  private readonly _authenticated = inject(AUTHENTICATED);
  private readonly _hasSync = inject(HAS_SYNC_FEATURE);
  private readonly _translate = inject(TranslateService);
  private readonly _router = inject(Router);
  private readonly _timeout = 1000;

  ngOnInit() {
    setTimeout(() => {
      this._runEstimation();
    }, this._timeout);
  }

  private async _runEstimation() {
    try {
      await this._deletingService.ensureLoaded();
      const count = this._deletingService.expiredCount();
      if (!count) return;

      const showAuthNote = !this._authenticated() && this._hasSync;
      const message =
        this._translate.instant('deleted-data.confirm.message', {count})
        + (showAuthNote ? '\n\n' + this._translate.instant('deleted-data.confirm.not-authenticated') : '')
        + '\n\n' + this._translate.instant('deleted-data.confirm.proceed');

      this._deleteConfirmationService.configure({
        message,
        extraAction: {
          label: this._translate.instant('deleted-data.confirm.view-list'),
          handler: () => {
            this._router.navigate(['/settings'], {queryParams: {'data-settings': 'deleted', tab: 'data'}});
          },
        },
        onCancel: () => {
        },
        onSuccess: () => {
          this._deletingService.performExpiredCleanup()
            .then(() => {
              this._notificationsService.success(this._translate.instant('deleted-data.deleted-success'));
            })
            .catch(err => {
              this._notificationsService.error(errorHandler(err));
            });
        },
      });
    } catch (err) {
      this._notificationsService.error(errorHandler(err));
    }
  }
}
