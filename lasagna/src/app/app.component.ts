import {Component, inject, OnInit} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {PwaInstallComponent} from './shared/view/ui/pwa-install.component';
import {GlobalSearchComponent} from './features/global-search/global-search.component';
import {LastBackupInformerComponent} from './shared/view/ui/last-backup-informer.component';
import {TranslateModule} from '@ngx-translate/core';
import {FontTesterComponent} from './shared/view/ui/font-tester.component';
import {DemoService} from './shared/service/services/demo.service';
import {FooterComponent} from './shared/view/ui/layout/footer.component';
import {HeaderComponent} from './shared/view/ui/layout/header.component';
import {OverlayActionsComponent} from './shared/view/ui/overlay-actions/overlay-actions.component';
import {StorageQuotaWarningComponent} from './shared/view/ui/storage-quota-warning.component';

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
  ],
  templateUrl: './app.component.html',
  standalone: true,
  styleUrl: './app.component.scss',
  providers: []
})
export class AppComponent
  implements OnInit {
  constructor() {
  }

  demoService = inject(DemoService);

  async ngOnInit() {
    await this.demoService.loadDemoData();
    console.log('AppComponent rendered');
  }
}
