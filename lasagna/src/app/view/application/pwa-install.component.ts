import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-pwa-install',
  standalone: true,
  template: `
      @if (showButton) {
          <button (click)="installPWA()">Установить PWA</button>
      }
  `,
})
export class PwaInstallComponent implements OnInit {
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
      console.log('PWA установлена!');
    } else {
      console.log('Пользователь отказался от установки');
    }

    this.deferredPrompt = null;
    this.showButton = false;
  }
}
