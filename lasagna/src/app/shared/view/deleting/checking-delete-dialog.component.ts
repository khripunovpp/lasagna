import {Component, inject, OnInit} from '@angular/core';
import {DeletingService} from '../../service/services/deleting.service';
import {NotificationsService} from '../../service/services';
import {errorHandler} from '../../helpers';
import {AUTHENTICATED} from '../../../features/account/account.token';
import {ConfirmationPopoverComponent} from '../ui/confirmation-popover/confirmation-popover.component';
import {ConfirmationService} from '../ui/confirmation-popover/confirmation.service';

@Component({
  selector: 'lg-checking-delete-dialog',
  template: `
    <lg-confirmation-popover></lg-confirmation-popover>
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
  private readonly _checkToDeleteService = inject(DeletingService);
  private readonly _notificationsService = inject(NotificationsService);
  private readonly _authenticated = inject(AUTHENTICATED);
  private readonly _notAuthenticatedMessage = '\n\nAlso note that you are not authenticated. So any items linked to your account will not be deleted from the server. Please log in to ensure complete deletion.';
  private readonly _timeout = 1000 * 1;
  async ngOnInit() {
    setTimeout(() => {
      this._runEstimation();
    }, this._timeout);
  }

  private async _runEstimation() {
    try {
      const {
        itemsToDeleteInCloud: cloudItems, itemsToDelete: items, count
      } = await this._checkToDeleteService.estimateItemsToDelete();
      console.log('Items to delete:', items);
      if (!count) return;

      this._deleteConfirmationService.configure({

        message: `You have ${count} items marked for deletion because 30 days have passed since they were moved to trash.${this._authenticated() ? '' : this._notAuthenticatedMessage}\n\nDo you want to proceed?`,
        onCancel: () => {
          console.log('Deletion cancelled');
        },
        onSuccess: () => {
          this._checkToDeleteService.performCleanup(items, cloudItems)
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
