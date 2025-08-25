import {Component, inject, OnInit} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {PwaInstallComponent} from './features/home/view/pwa-install.component';
import {GlobalSearchComponent} from './features/global-search/global-search.component';
import {LastBackupInformerComponent} from './features/home/view/last-backup-informer.component';
import {TranslateModule} from '@ngx-translate/core';
import {FontTesterComponent} from './features/home/view/font-tester.component';
import {DemoService} from './shared/service/services/demo.service';
import {FooterComponent} from './shared/view/ui/layout/footer.component';
import {HeaderComponent} from './shared/view/ui/layout/header.component';
import {OverlayActionsComponent} from './shared/view/ui/overlay-actions/overlay-actions.component';
import {StorageQuotaWarningComponent} from './features/home/view/storage-quota-warning.component';
import {SatisfactionPopupComponent} from './features/home/view/satisfaction-popup.component';

import {DecimalPipe} from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    HeaderComponent,
    PwaInstallComponent,
    GlobalSearchComponent,
    LastBackupInformerComponent,
    TranslateModule,
    FontTesterComponent,
    FooterComponent,
    OverlayActionsComponent,
    StorageQuotaWarningComponent,
    SatisfactionPopupComponent,
    ],
  templateUrl: './app.component.html',
  standalone: true,
  styleUrl: './app.component.scss',
  providers: [
    DecimalPipe
  ]
})
export class AppComponent
  implements OnInit {
  constructor() {
  }

  private readonly demoService = inject(DemoService);

  async ngOnInit() {
    await this.demoService.loadDemoData();
  }
}
