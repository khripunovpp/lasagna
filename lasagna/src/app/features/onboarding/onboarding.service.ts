import { Injectable, signal, computed, inject } from '@angular/core';
import { PageTimeTrackerService } from '../../shared/service/services/page-time-tracker.service';

@Injectable({
  providedIn: 'root'
})
export class OnboardingService {
  private _pageTimeTracker = inject(PageTimeTrackerService);
  private static readonly FAQ_PAGE_KEY = 'onboarding_faq';
  private static readonly FAQ_REQUIRED_TIME = 120000; // 2 minutes
  // Сигналы для хранения состояния шагов
  private _settingsDone = signal(!!localStorage.getItem('onboarding_settings_done'));
  private _productDone = signal(!!localStorage.getItem('onboarding_product_done'));
  private _recipeDone = signal(!!localStorage.getItem('onboarding_recipe_done'));
  private _faqDone = signal(!!localStorage.getItem('onboarding_faq_done'));

  // Computed для общего статуса
  isOnboardingComplete = computed(() =>
    this._settingsDone() && this._productDone() && this._recipeDone() && this._faqDone()
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

  private _onFaqCompleted = () => {
    this.markFaqDone();
  };

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
