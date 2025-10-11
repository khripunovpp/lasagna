import {computed, inject, Injectable, signal} from '@angular/core';
import {APP_SERVER_IS_RU} from '../../shared/service/tokens/app-server-region.token';

@Injectable({
  providedIn: 'root'
})
export class OnboardingService {
  private _settingsDone = signal(!!localStorage.getItem('onboarding_settings_done'));
  private _productDone = signal(!!localStorage.getItem('onboarding_product_done'));
  private _recipeDone = signal(!!localStorage.getItem('onboarding_recipe_done'));
  private _faqDone = signal(!!localStorage.getItem('onboarding_faq_done'));
  private readonly _isRuRegion = inject(APP_SERVER_IS_RU);
  readonly isOnboardingComplete = computed(() => {
      if (this._productDone()
        && this._recipeDone()
        && this._faqDone()) {
        return this._isRuRegion ? true : this._settingsDone();
      }
      return false;
    }
  );

  markProductDone() {
    localStorage.setItem('onboarding_product_done', '1');
    this._productDone.set(true);
  }

  markRecipeDone() {
    localStorage.setItem('onboarding_recipe_done', '1');
    this._recipeDone.set(true);
  }

  markSettingsDone() {
    localStorage.setItem('onboarding_settings_done', '1');
    this._settingsDone.set(true);
  }

  markFaqDone() {
    localStorage.setItem('onboarding_faq_done', '1');
    this._faqDone.set(true);
  }

  isProductDone(): boolean {
    return this._productDone();
  }

  isRecipeDone(): boolean {
    return this._recipeDone();
  }

  isSettingsDone(): boolean {
    return this._settingsDone();
  }

  isFaqDone(): boolean {
    return this._faqDone();
  }
}
