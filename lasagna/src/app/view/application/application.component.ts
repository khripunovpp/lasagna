import {Component} from '@angular/core';
import {ContainerComponent} from '../ui/layout/container/container.component';
import {RouterLink, RouterLinkActive} from '@angular/router';
import {CardComponent} from '../ui/card/card.component';
import {TitleComponent} from '../ui/layout/title/title.component';
import {GapColumnComponent} from '../ui/layout/gap-column.component';

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
    TitleComponent,
  ]
})
export class ApplicationComponent {
  title = 'lasagna';
}
