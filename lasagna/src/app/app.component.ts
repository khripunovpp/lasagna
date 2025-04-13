import {Component} from '@angular/core';
import {RouterOutlet} from '@angular/router';




import {PwaInstallComponent} from './view/application/pwa-install.component';
import {HeaderComponent} from './view/ui/layout/header.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {FadeInComponent} from './view/ui/fade-in.component';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    PwaInstallComponent,
    HeaderComponent,
    FadeInComponent
  ],
  templateUrl: './app.component.html',
  standalone: true,
  styleUrl: './app.component.scss',
  providers: []
})
export class AppComponent {
  title = 'lasagna';
}
