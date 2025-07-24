import {Component, effect} from '@angular/core';
import {NotificationsService} from '../../../../../shared/service/services';
import {CredentialsRepository} from '../../../service/repositories/credentials.repository';
import {CredentialsType} from '../../../service/types/credentials.types';
import {TabsComponent} from '../../../../../shared/view/ui/tabs/tabs.component';
import {CreateCredentialComponent} from './create-credential.component';
import {TabDirective} from '../../../../../shared/view/ui/tabs/tab.directive';
import {TranslatePipe} from '@ngx-translate/core';

@Component({
  selector: 'lg-credentials-settings',
  standalone: true,
  template: `
      <lg-tabs [flat]="true" [silent]="true">
          <ng-template alias="system" [label]="'settings.credentials.system' | translate" lgTab>
              <lg-create-credential [type]="CredentialsType.system"></lg-create-credential>
          </ng-template>

          <ng-template alias="customers" [label]="'settings.credentials.customer' | translate" lgTab>
              <lg-create-credential [type]="CredentialsType.customer"></lg-create-credential>
          </ng-template>
      </lg-tabs>
  `,
  styles: [``],
  imports: [
    TabsComponent,
    CreateCredentialComponent,
    TabDirective,
    TranslatePipe
  ]
})
export class CredentialSettingsComponent {
  constructor(
    private _credentialsRepository: CredentialsRepository,
    private _notificationService: NotificationsService,
  ) {
  }
  protected readonly CredentialsType = CredentialsType;
}
