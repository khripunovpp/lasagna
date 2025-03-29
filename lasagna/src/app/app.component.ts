import { Component } from '@angular/core';
import {RouterLink, RouterLinkActive, RouterOutlet} from '@angular/router';
import {ExpandDirective} from './view/directives/expand.directive';
import {GapColumnComponent} from './view/ui/layout/gap-column.component';
import {ContainerComponent} from './view/ui/layout/container/container.component';
import {ButtonComponent} from './view/ui/layout/button.component';
import {GapRowComponent} from './view/ui/layout/gap-row.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, GapColumnComponent, ContainerComponent, ButtonComponent, GapRowComponent],
  templateUrl: './app.component.html',
  standalone: true,
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'lasagna';
}
