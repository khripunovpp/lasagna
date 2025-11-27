import {Component, inject} from '@angular/core';
import {ContainerComponent} from '../../../../shared/view/layout/container.component';
import {CardComponent} from '../../../../shared/view/ui/card/card.component';
import {TitleComponent} from '../../../../shared/view/layout/title.component';
import {FadeInComponent} from '../../../../shared/view/ui/fade-in.component';
import {LastEditedRecipesComponent} from '../last-edited-recipes/last-edited-recipes.component';
import {LastEditedProductsComponent} from '../last-edited-products/last-edited-products.component';
import {FlexRowComponent} from '../../../../shared/view/layout/flex-row.component';
import {TranslatePipe} from '@ngx-translate/core';
import {ProductsRepository, RecipesRepository} from '../../../../shared/service/repositories';
import {AsyncPipe} from '@angular/common';
import {OnboardingComponent} from '../../../onboarding/onboarding.component';
import {OnboardingService} from '../../../onboarding/onboarding.service';
import {IS_CLIENT} from '../../../../shared/service/tokens/isClient.token';


@Component({
  selector: 'app-application',
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
  ],
})
export class ApplicationComponent {
  title = 'lasagna';
  recipes = inject(RecipesRepository);
  products = inject(ProductsRepository);
  private _onboardingService = inject(OnboardingService);
  readonly isClient = inject(IS_CLIENT);
  // Используем сигнал из сервиса напрямую
  isOnboardingComplete = this._onboardingService.isOnboardingComplete;
}
