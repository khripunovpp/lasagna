import {Component, inject} from '@angular/core';
import {ContainerComponent} from '../ui/layout/container/container.component';

import {CardComponent} from '../ui/card/card.component';
import {TitleComponent} from '../ui/layout/title/title.component';
import {FadeInComponent} from '../ui/fade-in.component';
import {LastEditedRecipesComponent} from './last-edited-recipes/last-edited-recipes.component';
import {LastEditedProductsComponent} from './last-edited-products/last-edited-products.component';
import {FlexRowComponent} from '../ui/layout/flex-row.component';
import {TranslatePipe} from '@ngx-translate/core';
import {ProductsRepository, RecipesRepository} from '../../service/repositories';
import {AsyncPipe} from '@angular/common';
import {ButtonComponent} from '../ui/layout/button.component';
import {FontTesterComponent} from '../ui/font-tester.component';
import {OnboardingComponent} from '../../../features/onboarding/onboarding.component';
import {OnboardingService} from '../../../features/onboarding/onboarding.service';


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
    FlexRowComponent,
    TranslatePipe,
    AsyncPipe,
    ButtonComponent,
    OnboardingComponent
  ]
})
export class ApplicationComponent {
  title = 'lasagna';

  private _onboardingService = inject(OnboardingService);
  recipes = inject(RecipesRepository).length;
  products = inject(ProductsRepository).length;

  // Используем сигнал из сервиса напрямую
  isOnboardingComplete = this._onboardingService.isOnboardingComplete;
}
