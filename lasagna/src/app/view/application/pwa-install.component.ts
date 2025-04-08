import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'lg-pwa-install',
  standalone: true,
  template: `
      @if (showButton) {
          <button (click)="installPWA()">Установить PWA</button>
      }
  `,
  styles: [`
    lg-pwa-install {
      display: flex;
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
      this.showButton = false;
      console.log('PWA установлена!');
    } else {
      console.log('Пользователь отказался от установки');
    }

    this.deferredPrompt = null;
    this.showButton = false;
  }
}
