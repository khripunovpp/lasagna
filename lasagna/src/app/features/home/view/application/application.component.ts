import {Component, inject} from '@angular/core';
import {ContainerComponent} from '../../../../shared/view/ui/layout/container/container.component';
import {CardComponent} from '../../../../shared/view/ui/card/card.component';
import {TitleComponent} from '../../../../shared/view/ui/layout/title/title.component';
import {FadeInComponent} from '../../../../shared/view/ui/fade-in.component';
import {LastEditedRecipesComponent} from '../last-edited-recipes/last-edited-recipes.component';
import {LastEditedProductsComponent} from '../last-edited-products/last-edited-products.component';
import {FlexRowComponent} from '../../../../shared/view/ui/layout/flex-row.component';
import {TranslatePipe} from '@ngx-translate/core';
import {ProductsRepository, RecipesRepository} from '../../../../shared/service/repositories';
import {AsyncPipe} from '@angular/common';
import {OnboardingComponent} from '../../../onboarding/onboarding.component';
import {OnboardingService} from '../../../onboarding/onboarding.service';


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
    OnboardingComponent
  ]
})
export class ApplicationComponent {
  title = 'lasagna';
  recipes = inject(RecipesRepository).length;
  products = inject(ProductsRepository).length;
  private _onboardingService = inject(OnboardingService);
  // Используем сигнал из сервиса напрямую
  isOnboardingComplete = this._onboardingService.isOnboardingComplete;
}
