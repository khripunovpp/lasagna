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
        <lg-flex-column>
          <lg-title [level]="4">{{ 'onboarding.title' | translate }}</lg-title>

          <p class="no-margin">
            Hello! Welcome to Lasagna! To get better know the app, please complete the following steps.
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
                <lg-button [disabled]="!step.done && !isCurrentStep(step)"
                          (onClick)="step.action()">
                  {{ step.done ? ('onboarding.done' | translate) : (isCurrentStep(step) ? ('onboarding.go' | translate) : ('onboarding.unavailable' | translate)) }}
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

    .onboarding {
      --onboarding-bg: var(--color-bg, var(--onboarding-bg));
      --onboarding-border: var(--color-border, var(--onboarding-border));
    }

    .onboarding__step {
      display: flex;
      align-items: center;
      justify-content: space-between;
      background: var(--color-bg-secondary, var(--onboarding-bg-secondary));
      border-radius: 0.5rem;
      padding: 1rem;
      border: 1px solid var(--onboarding-border);
      transition: background 0.2s;
    }

    .onboarding__step--done {
      background: var(--color-success-bg, var(--onboarding-success-bg));
      opacity: 0.7;
    }

    .onboarding__step--disabled {
      background: var(--color-bg-disabled, var(--onboarding-bg-disabled));
      opacity: 0.5;
    }

    .onboarding__step-content {
      display: flex;
      flex-direction: column;
      gap: 0.25rem;
    }

    .onboarding__step-label {
      font-weight: 600;
      font-size: 1.1rem;
    }

    .onboarding__step-desc {
      font-size: 0.95rem;
      color: var(--color-text-secondary, var(--onboarding-text-secondary));
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
