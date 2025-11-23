import {Component, computed, HostListener, inject, signal} from '@angular/core';
import {TimeAgoPipe} from '../../../shared/view/pipes/time-ago.pipe';
import {TitleCasePipe} from '@angular/common';
import {RouterLink} from '@angular/router';
import {UserService} from '../../settings/service/services/user.service';
import {TranslatePipe} from '@ngx-translate/core';
import {NotificationsService} from '../../../shared/service/services';
import {errorHandler} from '../../../shared/helpers';
import {WINDOW} from '../../../shared/service/tokens/window.token';

@Component({
  selector: 'lg-last-backup-informer',
  standalone: true,
  template: `
    @if (showButton()) {
      <a [routerLink]="['/settings']"
         (click)="hide()"
         [queryParams]="{download_backup: true,tab:'backup'}">
        @if (lastBackupDate()) {
          {{ lastBackupDate() | timeAgo | titlecase }}
        } @else {
          {{ 'backup.no-backup' | translate }}
        }
      </a>
    }
  `,
  styles: [`
    :host {
      display: contents;
    }

    a {
      background-image: linear-gradient(45deg, #de2c51, #fff400);
      color: white;
      border: none;
      padding: 10px 20px;
      cursor: pointer;
      text-align: center;
      text-decoration: none;
      border-radius: 0 16px 16px 0;
      background-size: calc(100% + 70px) 100%;
      transition: background-position 0.3s ease;
      white-space: nowrap;
    }

    a:hover {
      background-position: -70px 0;
    }
  `],
  imports: [
    TimeAgoPipe,
    TitleCasePipe,
    RouterLink,
    TranslatePipe
  ]
})
export class LastBackupInformerComponent {
  constructor() {
  }

  oneDayInMilliseconds = 24 * 60 * 60 * 1000;
  twoWeeksInMilliseconds = 14 * this.oneDayInMilliseconds;
  userService = inject(UserService);
  storedBackupDate = signal<string | null>(this._getStoredDate());
  today: Date = new Date();
  lastBackupDate = computed(() => this.storedBackupDate()
    ? new Date(this.storedBackupDate()!) :
    undefined);
  private readonly _notificationsService = inject(NotificationsService);
  showButton = computed(() => {
    try {
      if (this._window?.location.hostname === 'localhost') {
        return false;
      }
      const sinceDate = this.userService.isUserFirstDate;
      if (!sinceDate) {
        return false
      }
      const todayTs = this.today.getTime();
      const sinceDateTs = sinceDate.getTime();
      const diffInMilliseconds = todayTs - sinceDateTs;
      if (diffInMilliseconds < 0) {
        return false; // Since date is in the future
      }
      if (diffInMilliseconds < this.twoWeeksInMilliseconds) {
        return false
      }

      if (!this.lastBackupDate()) {
        return true
      }
      const lastBackupDateTs = this.lastBackupDate()!.getTime();

      return lastBackupDateTs < sinceDateTs ||
        lastBackupDateTs < todayTs - this.twoWeeksInMilliseconds;
    } catch (e) {
      this._notificationsService.error(errorHandler(e));
      return false;
    }
  });
  private readonly _window = inject(WINDOW);

  hide() {
    this.storedBackupDate.set(null);
  }

  @HostListener('click', ['$event']) onClick(event: Event) {
    setTimeout(() => {
      this.storedBackupDate.set(this._getStoredDate());
    }, 500);
  }

  private _getStoredDate() {
    try {
      return this._window?.localStorage.getItem('lastBackupDate') || null;
    } catch (e) {
      console.log('e', e);
      return null
    }
  }
}
