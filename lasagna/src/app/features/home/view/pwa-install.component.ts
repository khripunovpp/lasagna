import {ChangeDetectionStrategy, Component, computed, inject, OnInit, signal} from '@angular/core';
import {TranslatePipe} from '@ngx-translate/core';
import {AnalyticsService} from '../../../shared/service/services/analytics.service';

@Component({
  selector: 'lg-pwa-install',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    @if (showButton()) {
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
    TranslatePipe,
  ]
})
export class PwaInstallComponent implements OnInit {
  readonly showButton = signal(false);
  readonly isPwa = computed(() => {
    return window.matchMedia('(display-mode: standalone)').matches
      || (window.navigator as any)['standalone'] === true;
  });
  private readonly analyticsService = inject(AnalyticsService);
  private _deferredPrompt: any = null;

  ngOnInit(): void {
    if (this._alreadyDeclined()) {
      return;
    }
    window.addEventListener('beforeinstallprompt', (e: Event) => {
      if (this._alreadyDeclined()) {
        return;
      }
      this._deferredPrompt = e;
      this.showButton.set(true);
    });

    window.addEventListener('appinstalled', () => {
      this._onSuccess();
    });
  }

  async installPWA(): Promise<void> {
    if (!this._deferredPrompt) return;
    this._deferredPrompt.preventDefault();

    this._deferredPrompt.prompt();

    const {outcome} = await this._deferredPrompt.userChoice;
    if (outcome === 'accepted') {
      this._onSuccess();
    } else {
      this._onDecline();
    }

    this._deferredPrompt = null;
    this.showButton.set(false);
  }

  private _alreadyDeclined(): boolean {
    try {
      return localStorage.getItem('pwa-install-declined') === 'true';
    } catch {
      return false;
    }
  }

  private _setDeclinedStatus(value: boolean): void {
    try {
      localStorage.setItem('pwa-install-declined', value ? 'true' : 'false');
    } catch {
      // ignore
    }
  }

  private _onSuccess() {
    console.log('PWA installed!');
    this.showButton.set(false);
    this.analyticsService.trackPwaInstallAccepted();
  }

  private _onDecline() {
    console.log('User declined installation');
    this.showButton.set(false);
    this._setDeclinedStatus(true);
    this.analyticsService.trackPwaInstallDeclined();
  }
}
