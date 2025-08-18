import {Component, OnInit, inject} from '@angular/core';
import {TranslatePipe} from '@ngx-translate/core';
import {AnalyticsService} from '../../../shared/service/services/analytics.service';

@Component({
  selector: 'lg-pwa-install',
  standalone: true,
  template: `
    @if (showButton) {
      <button (click)="installPWA()">
        {{ 'pwa.install' | translate }}
      </button>
    }
  `,
  styles: [`
    :host {
      display: contents;
    }

    button {
      background-image: linear-gradient(45deg, #3F51B5, #9C27B0);
      color: white;
      border: none;
      padding: 10px 20px;
      cursor: pointer;
      box-shadow: -15px 6px 8px 0px #eed2f0;
      border-radius: 0 16px 16px 0;
      background-size: calc(100% + 70px) 100%;
      transition: background-position 0.3s ease;
      text-decoration: none;
      white-space: nowrap;
    }

    button:hover {
      background-position: -70px 0;
    }
  `],
  imports: [
    TranslatePipe
  ]
})
export class PwaInstallComponent implements OnInit {
  private readonly analyticsService = inject(AnalyticsService);
  deferredPrompt: any = null;
  showButton = false;

  ngOnInit(): void {
    window.addEventListener('beforeinstallprompt', (e: Event) => {
      e.preventDefault();
      this.deferredPrompt = e;
      this.showButton = true;
    });
  }

  async installPWA(): Promise<void> {
    if (!this.deferredPrompt) return;

    this.deferredPrompt.prompt();

    const {outcome} = await this.deferredPrompt.userChoice;
    if (outcome === 'accepted') {
      this.showButton = false;
      console.log('PWA installed!');
      this.analyticsService.trackPwaInstallAccepted();
    } else {
      console.log('User declined installation');
      this.analyticsService.trackPwaInstallDeclined();
    }

    this.deferredPrompt = null;
    this.showButton = false;
  }
}
