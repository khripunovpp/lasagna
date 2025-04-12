import {Component} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {GapColumnComponent} from './view/ui/layout/gap-column.component';



import {PwaInstallComponent} from './view/application/pwa-install.component';
import {HeaderComponent} from './view/ui/layout/header.component';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    GapColumnComponent,
    PwaInstallComponent,
    HeaderComponent
],
  templateUrl: './app.component.html',
  standalone: true,
  styleUrl: './app.component.scss',
  providers: []
})
export class AppComponent {
  title = 'lasagna';
}
