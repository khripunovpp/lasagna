import {Component} from '@angular/core';
import {ContainerComponent} from '../ui/layout/container/container.component';
import {RouterLink, RouterLinkActive} from '@angular/router';
import {CardComponent} from '../ui/card/card.component';
import {TitleComponent} from '../ui/layout/title/title.component';
import {FadeInComponent} from '../ui/fade-in.component';
import {LastEditedRecipesComponent} from './last-edited-recipes/last-edited-recipes.component';
import {LastEditedProductsComponent} from './last-edited-products/last-edited-products.component';


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
    FadeInComponent,
    LastEditedRecipesComponent,
    LastEditedProductsComponent,
  ]
})
export class ApplicationComponent {
  title = 'lasagna';
}
