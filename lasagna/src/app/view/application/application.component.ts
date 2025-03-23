import {Component} from '@angular/core';
import {ContainerComponent} from '../ui/container/container.component';
import {RouterLink, RouterLinkActive} from '@angular/router';

@Component({
  selector: 'app-application',
  standalone: true,
  templateUrl: './application.component.html',
  styleUrl: './application.component.scss',
  imports: [
    ContainerComponent,
    RouterLink,
    RouterLinkActive
  ]
})
export class ApplicationComponent {
  title = 'lasagna';
}
