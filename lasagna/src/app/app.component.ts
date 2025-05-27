import {Component, HostBinding, inject, Renderer2} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {HeaderComponent} from '@view/ui/layout/header.component';
import {FadeInComponent} from '@view/ui/fade-in.component';
import {PwaInstallComponent} from '@view/ui/pwa-install.component';
import {GlobalSearchComponent} from '@view/ui/global-search.component';
import {LastBackupInformerComponent} from '@view/ui/last-backup-informer.component';
import {TranslateModule} from '@ngx-translate/core';
import {UserService} from '@service/services/user.service';
import {GapRowComponent} from '@view/ui/layout/gap-row.component';
import {ButtonComponent} from '@view/ui/layout/button.component';

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
    GapRowComponent,
    ButtonComponent,
  ],
  templateUrl: './app.component.html',
  standalone: true,
  styleUrl: './app.component.scss',
  providers: []
})
export class AppComponent {
  constructor() {
  }

  isUserFirstTime = inject(UserService).isUserFirstTime;
  renderer = inject(Renderer2);
  title = 'lasagna';


  ngOnInit() {
    this.renderer.setAttribute(document.body, 'class', 'palette-' + new URLSearchParams(window.location.search).get('palette'));
  }

  palettes = Array.from({length: 10}, (_, i) => i + 1).map(i => `palette-${i}`);
  onPalletClick(palette: string|number) {
    history.pushState({}, '', `?palette=${palette}`);
    window.location.reload();
  }
}
