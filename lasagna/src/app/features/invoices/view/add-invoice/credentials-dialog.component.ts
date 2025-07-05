import {Component, effect, input, output, signal, viewChild} from '@angular/core';
import {DialogComponent} from '../../../../shared/view/ui/dialog/dialog.component';
import {CredentialsType} from '../../../settings/service/types/credentials.types';
import {CredentialsRepository} from '../../../settings/service/repositories/credentials.repository';
import {NotificationsService} from '../../../../shared/service/services';
import {Credential} from '../../../settings/service/models/Credential';
import {FlexColumnComponent} from '../../../../shared/view/ui/layout/flex-column.component';

import {ButtonComponent} from '../../../../shared/view/ui/layout/button.component';
import {FlexRowComponent} from '../../../../shared/view/ui/layout/flex-row.component';
import {CardComponent} from '../../../../shared/view/ui/card/card.component';
import {WidthDirective} from '../../../../shared/view/directives/width.directive';

@Component({
  selector: 'lg-credentials-dialog',
  standalone: true,
  template: `
    <lg-dialog [displayFooter]="false">
      <lg-flex-row size="small"
                  cols="2"
                  [wrap]="true">
        @for (credential of credentials(); track (credential.uuid)) {
          <button class="credential-item"
                  (click)="onSelect(credential)">
            <b class="credential-item__name">{{ credential.privateName }}</b>
            <div class="text-wrap credential-item__inner">{{ credential.toFormattedString() }}</div>
          </button>
        }
      </lg-flex-row>
    </lg-dialog>
  `,
  styles: [`
    .credential-item {
      display: flex;
      flex-direction: column;
      gap: 8px;
      background-color: var(--accent-light-color);
      appearance: none;
      font-family: inherit;
      font-size: 16px;
      padding: 16px;
      border-radius: 16px;
      border: none;
    }

    .credential-item__inner {
      text-align: left;
    }
  `],
  imports: [
    DialogComponent,
    FlexColumnComponent,
    ButtonComponent,
    FlexRowComponent,
    CardComponent,
    WidthDirective
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
