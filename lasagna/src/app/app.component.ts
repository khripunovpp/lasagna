import {Component} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {HeaderComponent} from './view/ui/layout/header.component';
import {FadeInComponent} from './view/ui/fade-in.component';
import {PwaUpdateComponent} from './view/application/pwa-update.component';
import {PwaInstallComponent} from './view/application/pwa-install.component';
import {GlobalSearchComponent} from './view/ui/layout/global-search.component';


@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    HeaderComponent,
    FadeInComponent,
    PwaUpdateComponent,
    PwaInstallComponent,
    GlobalSearchComponent,
  ],
  templateUrl: './app.component.html',
  standalone: true,
  styleUrl: './app.component.scss',
  providers: []
})
export class AppComponent {
  title = 'lasagna';
}
