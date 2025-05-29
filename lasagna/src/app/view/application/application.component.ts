import {Component, inject} from '@angular/core';
import {ContainerComponent} from '../ui/layout/container/container.component';

import {CardComponent} from '../ui/card/card.component';
import {TitleComponent} from '../ui/layout/title/title.component';
import {FadeInComponent} from '../ui/fade-in.component';
import {LastEditedRecipesComponent} from './last-edited-recipes/last-edited-recipes.component';
import {LastEditedProductsComponent} from './last-edited-products/last-edited-products.component';
import {GapRowComponent} from '../ui/layout/gap-row.component';
import {TranslatePipe} from '@ngx-translate/core';
import {ProductsRepository, RecipesRepository} from '@service/repositories';
import {AsyncPipe} from '@angular/common';
import {ButtonComponent} from '@view/ui/layout/button.component';
import {FontTesterComponent} from '@view/ui/font-tester.component';


@Component({
  selector: 'app-application',
  standalone: true,
  templateUrl: './application.component.html',
  styleUrl: './application.component.scss',
  imports: [
    ContainerComponent,
    CardComponent,
    TitleComponent,
    FadeInComponent,
    LastEditedRecipesComponent,
    LastEditedProductsComponent,
    GapRowComponent,
    TranslatePipe,
    AsyncPipe,
    ButtonComponent,
    FontTesterComponent
  ]
})
export class ApplicationComponent {
  title = 'lasagna';

  recipes = inject(RecipesRepository).length;
  products = inject(ProductsRepository).length;
}
