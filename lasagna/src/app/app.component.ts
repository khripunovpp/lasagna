import {APP_INITIALIZER, Component, provideAppInitializer} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {GapColumnComponent} from './view/ui/layout/gap-column.component';
import {ContainerComponent} from './view/ui/layout/container/container.component';
import {ButtonComponent} from './view/ui/layout/button.component';
import {GapRowComponent} from './view/ui/layout/gap-row.component';
import {PwaInstallComponent} from './view/application/pwa-install.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, GapColumnComponent, ContainerComponent, ButtonComponent, GapRowComponent, PwaInstallComponent],
  templateUrl: './app.component.html',
  standalone: true,
  styleUrl: './app.component.scss',
  providers:[
  ]
})
export class AppComponent {
  title = 'lasagna';
}
