import {Component} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {HeaderComponent} from './shared/view/ui/layout/header.component';
import {FadeInComponent} from './shared/view/ui/fade-in.component';
import {PwaInstallComponent} from './shared/view/ui/pwa-install.component';
import {GlobalSearchComponent} from './shared/view/ui/global-search.component';
import {LastBackupInformerComponent} from './shared/view/ui/last-backup-informer.component';
import {TranslateModule} from '@ngx-translate/core';
import {FontTesterComponent} from './shared/view/ui/font-tester.component';
import {DemoInformerComponent} from './shared/view/ui/demo-informer.component';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    HeaderComponent,
    FadeInComponent,
    PwaInstallComponent,
    GlobalSearchComponent,
    LastBackupInformerComponent,
    TranslateModule,
    FontTesterComponent,
    DemoInformerComponent,

  ],
  templateUrl: './app.component.html',
  standalone: true,
  styleUrl: './app.component.scss',
  providers: []
})
export class AppComponent {
  constructor() {
  }

  title = 'lasagna';

  ngOnInit() {
  }
}
