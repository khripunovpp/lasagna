import {Component, OnInit} from '@angular/core';
import {SwUpdate} from '@angular/service-worker';
import {NotificationsService} from '../../service/services/notifications.service';
import {errorHandler} from '../../helpers/error.helper';

@Component({
  selector: 'lg-pwa-update',
  standalone: true,
  template: `
      @if (showButton) {
          <button (click)="updatePWA()">Ваша версия устарела. Нажмите чтобы обновить</button>
      }
  `,
  styles: [`
    :host {
      display: flex;
      position: fixed;
      bottom: 0;
      left: 0;
      width: 100%;
    }

    button {
      background-color: #007bff;
      color: white;
      border: none;
      padding: 10px 20px;
      cursor: pointer;
      width: 100%;
    }

    button:hover {
      background-color: #0056b3;
    }
  `],
})
export class PwaUpdateComponent implements OnInit {
  constructor(
    private swUpdate: SwUpdate,
    private notification: NotificationsService,
  ) {
  }

  showButton = false;

  ngOnInit(): void {
    this.swUpdate.versionUpdates.subscribe(event => {
      if (event.type === 'VERSION_READY') {
        this.showButton = true;
      }
    });
  }

  async updatePWA(): Promise<void> {
    try {
      await this.swUpdate.activateUpdate();
      document.location.reload()
    } catch (e) {
      this.notification.error(errorHandler(e));
    }
  }
}
