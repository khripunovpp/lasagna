import {Component, computed, HostListener, inject, signal} from '@angular/core';
import {TimeAgoPipe} from '@view/pipes/time-ago.pipe';
import {TitleCasePipe} from '@angular/common';
import {RouterLink} from '@angular/router';
import {UserService} from '@service/services/user.service';

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
          So far no backup, click to create one
        }
      </a>
    }
  `,
  styles: [`
    :host {
      display: flex;
      position: fixed;
      z-index: 8;
      bottom: 0;
      left: 0;
      right: 0;
    }

    a {
      background-color: #007bff;
      color: white;
      border: none;
      padding: 10px 20px;
      cursor: pointer;
      width: 100%;
      text-align: center;
      text-decoration: none;
    }

    a:hover {
      background-color: #0056b3;
    }
  `],
  imports: [
    TimeAgoPipe,
    TitleCasePipe,
    RouterLink
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
    debugger
    const sinceDate = this.userService.isUserFirstDate;
    if (!sinceDate){
      return false
    }
    const sinceDateDays = Math.floor((this.today.getTime() - sinceDate.getTime()) / this.oneDayInMilliseconds);

    if (sinceDateDays < 1) {
      return false
    }

    if (!this.lastBackupDate()) {
      return true
    }

    return (this.today.getTime() - this.lastBackupDate()!.getTime()) > this.oneDayInMilliseconds
  });

  hide(){
    this.storedBackupDate.set(null);
  }

  @HostListener('click', ['$event']) onClick(event: Event) {
    setTimeout(() => {
      this.storedBackupDate.set(localStorage.getItem('lastBackupDate'));
    }, 500);
  }
}
