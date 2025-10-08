import {Component, inject} from "@angular/core";
import {FlexColumnComponent} from '../../shared/view/layout/flex-column.component';
import {TitleComponent} from '../../shared/view/layout/title.component';
import {ButtonComponent} from '../../shared/view/ui/button.component';
import {FlexRowComponent} from '../../shared/view/layout/flex-row.component';
import {TranslatePipe} from '@ngx-translate/core';
import {AuthService} from './auth.service';
import {NotificationsService} from '../../shared/service/services';

@Component({
  selector: 'lg-profile',
  standalone: true,
  template: `
    <lg-flex-column [size]="'small'">
      @if ((authService.currentUser()); as user) {
        <lg-flex-column [size]="'small'">
          <div><b>{{ 'account.username' | translate }}:</b> {{ user.username }}</div>
          <div><b>{{ 'account.email' | translate }}:</b> {{ user.email }}</div>
          <lg-button (click)="onLogout()" [style]="'danger'">
            {{ 'account.logout' | translate }}
          </lg-button>
        </lg-flex-column>
      } @else {
        <p>{{ 'account.not-logged-in' | translate }}</p>
      }
    </lg-flex-column>
  `,
  styles: [
    `

    `
  ],
  imports: [
    FlexColumnComponent,
    TitleComponent,
    ButtonComponent,
    FlexRowComponent,
    TranslatePipe
  ]
})
export class ProfileComponent {
  constructor() {
  }

  authService = inject(AuthService);
  notificationsService = inject(NotificationsService);

  onLogout() {
    this.authService.logout();
    this.notificationsService.success('account.logged-out');
  }
}
