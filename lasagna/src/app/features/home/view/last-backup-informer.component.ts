import {Component, computed, HostBinding, HostListener, inject, signal} from '@angular/core';
import {TimeAgoPipe} from '../../../shared/view/pipes/time-ago.pipe';
import {TitleCasePipe} from '@angular/common';
import {RouterLink} from '@angular/router';
import {UserService} from '../../settings/service/services/user.service';
import {TranslatePipe} from '@ngx-translate/core';

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
    :host { display: contents; }

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
  userService = inject(UserService);
  storedBackupDate = signal<string | null>(localStorage.getItem('lastBackupDate'));
  today: Date = new Date();
  lastBackupDate = computed(() => this.storedBackupDate()
    ? new Date(this.storedBackupDate()!) :
    undefined);
  showButton = computed(() => {
    if (location.hostname === 'localhost') {
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
    if (diffInMilliseconds < this.oneDayInMilliseconds) {
      return false
    }

    if (!this.lastBackupDate()) {
      return true
    }
    const lastBackupDateTs = this.lastBackupDate()!.getTime();

    return lastBackupDateTs < sinceDateTs ||
      lastBackupDateTs < todayTs - this.oneDayInMilliseconds;
  });

  hide() {
    this.storedBackupDate.set(null);
  }

  @HostListener('click', ['$event']) onClick(event: Event) {
    setTimeout(() => {
      this.storedBackupDate.set(localStorage.getItem('lastBackupDate'));
    }, 500);
  }
}
