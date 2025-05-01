import {Component, computed, HostListener, signal} from '@angular/core';
import {TimeAgoPipe} from '@view/pipes/time-ago.pipe';
import {TitleCasePipe} from '@angular/common';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'lg-last-backup-informer',
  standalone: true,
  template: `
      @if (showButton()) {
          <a [routerLink]="['/settings']" [queryParams]="{download_backup: true}">
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

  storedBackupDate = signal<string | null>(localStorage.getItem('lastBackupDate'));
  today: Date = new Date();
  lastBackupDate = computed(() => this.storedBackupDate()
    ? new Date(this.storedBackupDate()!) :
    undefined);
  showButton = computed(() => !this.lastBackupDate()
    || (this.today.getTime() - this.lastBackupDate()!.getTime()) > (24 * 60 * 60 * 1000)// 24 hours in milliseconds
  );

  @HostListener('click', ['$event']) onClick(event: Event) {
    setTimeout(() => {
      this.storedBackupDate.set(localStorage.getItem('lastBackupDate'));
    }, 500);
  }
}
