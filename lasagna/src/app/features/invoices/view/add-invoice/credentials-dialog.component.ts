import {Component, effect, input, output, signal, viewChild} from '@angular/core';
import {DialogComponent} from '../../../../shared/view/ui/dialog/dialog.component';
import {CredentialsType} from '../../../settings/service/types/credentials.types';
import {CredentialsRepository} from '../../../settings/service/repositories/credentials.repository';
import {NotificationsService} from '../../../../shared/service/services';
import {Credential} from '../../../settings/service/models/Credential';
import {GapColumnComponent} from '../../../../shared/view/ui/layout/gap-column.component';

import {ButtonComponent} from '../../../../shared/view/ui/layout/button.component';

@Component({
  selector: 'lg-credentials-dialog',
  standalone: true,
  template: `
      <lg-dialog [displayFooter]="false">
          <lg-gap-column size="small">
              @for (credential of credentials();track (credential.uuid)) {
                  <lg-button (click)="onSelect(credential)">
                      {{ credential.name }}
                  </lg-button>
              }
          </lg-gap-column>
      </lg-dialog>
  `,
  styles: [``],
  imports: [
    DialogComponent,
    GapColumnComponent,
    ButtonComponent
  ]
})
export class CredentialsDialogComponent {
  constructor(
    private _credentialsRepository: CredentialsRepository,
    private _notificationService: NotificationsService,
  ) {
  }

  dialog = viewChild(DialogComponent);
  credentials = signal<Credential[]>([]);
  type = input(CredentialsType.system);
  selected = output<Credential>();
  typeEffect = effect(() => {
    this._credentialsRepository.getAllByType(this.type())
      .then((credentials) => {
        this.credentials.set(credentials);
      });
  });

  open() {
    this.dialog()?.open();
  }

  close() {
    this.dialog()?.close();
  }

  onSelect(credential: Credential) {
    this.selected.emit(credential);
    this.close();
  }
}
