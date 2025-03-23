import {Component} from '@angular/core';
import {ContainerComponent} from '../ui/container/container.component';
import {RouterLink, RouterLinkActive} from '@angular/router';
import {CardComponent} from '../ui/card/card.component';
import {TitleComponent} from '../ui/title/title.component';

@Component({
  selector: 'app-application',
  standalone: true,
  templateUrl: './application.component.html',
  styleUrl: './application.component.scss',
  imports: [
    ContainerComponent,
    RouterLink,
    RouterLinkActive,
    CardComponent,
    TitleComponent
  ]
})
export class ApplicationComponent {
  title = 'lasagna';
}
