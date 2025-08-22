import {Component, computed, inject} from '@angular/core';
import {CommonModule} from '@angular/common';
import {Router} from '@angular/router';
import {ButtonComponent} from '../../shared/view/ui/layout/button.component';
import {TitleComponent} from '../../shared/view/ui/layout/title/title.component';
import {OnboardingService} from '../onboarding/onboarding.service';
import {FlexColumnComponent} from '../../shared/view/ui/layout/flex-column.component';
import {TranslatePipe} from '@ngx-translate/core';

interface OnboardingStep {
  key: string;
  label: string;
  description: string;
  done: boolean;
  action: () => void;
}

@Component({
  selector: 'lg-onboarding',
  standalone: true,
  imports: [
    CommonModule,
    ButtonComponent,
    TitleComponent,
    FlexColumnComponent,
    TranslatePipe
  ],
  template: `
    @if (!allDone()) {
      <section class="onboarding">
        <lg-flex-column size="medium">
          <lg-title [level]="4">{{ 'onboarding.title' | translate }}</lg-title>

          <p class="no-margin">
            {{ 'onboarding.welcome' | translate }}
          </p>

          <lg-flex-column [size]="'medium'">
            @for (step of steps(); track step.key) {
              <div class="onboarding__step"
                   [class.onboarding__step--done]="step.done"
                   [class.onboarding__step--disabled]="!step.done && !isCurrentStep(step)">
                <div class="onboarding__step-content">
                  <span class="onboarding__step-label">{{ step.label | translate }}</span>
                  <span class="onboarding__step-desc">{{ step.description | translate }}</span>
                </div>

                <lg-button [disabled]="step.done || !isCurrentStep(step)"
                           [style]="step.done ? 'secondary' : 'default'"
                           (onClick)="step.action()">
                  @if (step.done) {
                    {{ 'onboarding.done' | translate }}
                  } @else if (isCurrentStep(step)) {
                    {{ 'onboarding.go' | translate }}
                  } @else {
                    {{ 'onboarding.unavailable' | translate }}
                  }
                </lg-button>
              </div>
            }
          </lg-flex-column>
        </lg-flex-column>
      </section>
    }
  `,
  styles: [
    `:host {
      display: block;
    }

    .onboarding__step {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 8px;
      background: var(--onboarding-bg);
      border-radius: 16px;
      padding: 16px;
      border: 1px solid var(--onboarding-border);
      transition: background 0.2s;

      @media screen and (max-width: 600px) {
        flex-direction: column;

        lg-button {
          align-self: flex-end;
        }
      }
    }

    .onboarding__step--done {
      background: var(--onboarding-success-bg);

      .onboarding__step-content {
        opacity: 0.5;
      }
    }

    .onboarding__step--disabled .onboarding__step-content {
      opacity: 0.5;
    }

    .onboarding__step-content {
      display: flex;
      flex-direction: column;
      gap: 4px;
    }

    .onboarding__step-label {
      font-weight: 600;
    }

    .onboarding__step-desc {
      color: var(--onboarding-text);
    }
    `
  ]
})
export class OnboardingComponent {
  private _router = inject(Router);
  private _onboarding = inject(OnboardingService);

  steps = computed<OnboardingStep[]>(() => [
    {
      key: 'settings',
      label: 'onboarding.settings.label',
      description: 'onboarding.settings.description',
      done: this._onboarding.isSettingsDone(),
      action: () => this.goToSettings()
    },
    {
      key: 'product',
      label: 'onboarding.product.label',
      description: 'onboarding.product.description',
      done: this._onboarding.isProductDone(),
      action: () => this.goToAddProduct()
    },
    {
      key: 'recipe',
      label: 'onboarding.recipe.label',
      description: 'onboarding.recipe.description',
      done: this._onboarding.isRecipeDone(),
      action: () => this.goToAddRecipe()
    }
  ]);

  // Текущий активный шаг (первый незавершённый)
  currentStep = computed(() => {
    return this.steps().find(step => !step.done);
  });

  // Используем сигнал из сервиса напрямую
  allDone = this._onboarding.isOnboardingComplete;

  // Проверка, является ли шаг текущим активным
  isCurrentStep(step: OnboardingStep): boolean {
    return !step.done && step.key === this.currentStep()?.key;
  }

  goToSettings() {
    this._router.navigate(['/settings']);
  }
  goToAddProduct() {
    this._router.navigate(['/products/add']);
  }
  goToAddRecipe() {
    this._router.navigate(['/recipes/add']);
  }
}
