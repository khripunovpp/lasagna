import {ChangeDetectionStrategy, Component, inject} from '@angular/core';
import {ContainerComponent} from '../../../shared/view/layout/container.component';
import {CardComponent} from '../../../shared/view/ui/card/card.component';
import {TitleComponent} from '../../../shared/view/layout/title.component';
import {FadeInComponent} from '../../../shared/view/ui/fade-in.component';
import {TranslatePipe} from '@ngx-translate/core';
import {OnboardingComponent} from '../../onboarding/onboarding.component';
import {OnboardingService} from '../../onboarding/onboarding.service';
import {IS_CLIENT} from '../../../shared/service/tokens/isClient.token';
import {LatestWidgetComponent} from './latest-widget.component';

@Component({
  selector: 'app-application',
  template: `
    <lg-fade-in>
      <lg-container>
        <lg-title>{{ 'main.title' | translate }}</lg-title>

        @if (!isOnboardingComplete()) {
          <lg-card [hidden]="!isClient">
            <lg-onboarding></lg-onboarding>
          </lg-card>
        }

        @defer {
          <lg-latest-widget></lg-latest-widget>
        } @error {
          {{ 'main.defer-load-error' | translate }}
        }
      </lg-container>
    </lg-fade-in>
  `,
  styles: [`
  `],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    ContainerComponent,
    CardComponent,
    TitleComponent,
    FadeInComponent,
    TranslatePipe,
    OnboardingComponent,
    LatestWidgetComponent
  ],
})
export class ApplicationComponent {
  constructor() {
  }

  readonly isClient = inject(IS_CLIENT);
  private _onboardingService = inject(OnboardingService);
  // Используем сигнал из сервиса напрямую
  isOnboardingComplete = this._onboardingService.isOnboardingComplete;
}
