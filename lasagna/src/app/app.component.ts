import {Component} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {HeaderComponent} from '@view/ui/layout/header.component';
import {FadeInComponent} from '@view/ui/fade-in.component';
import {PwaInstallComponent} from '@view/ui/pwa-install.component';
import {GlobalSearchComponent} from '@view/ui/global-search.component';
import {LastBackupInformerComponent} from '@view/ui/last-backup-informer.component';
import {TranslateModule} from '@ngx-translate/core';

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

}
