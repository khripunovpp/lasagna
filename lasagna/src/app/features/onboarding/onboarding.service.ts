import {computed, inject, Injectable, signal} from '@angular/core';
import {APP_SERVER_IS_RU} from '../../shared/service/tokens/app-server-region.token';
import {WINDOW} from '../../shared/service/tokens/window.token';

@Injectable({
  providedIn: 'root'
})
export class OnboardingService {
  constructor() {
    try {
      this._settingsDone = signal(!!this._window?.localStorage.getItem('onboarding_settings_done'));
      this._productDone = signal(!!this._window?.localStorage.getItem('onboarding_product_done'));
      this._recipeDone = signal(!!this._window?.localStorage.getItem('onboarding_recipe_done'));
      this._faqDone = signal(!!this._window?.localStorage.getItem('onboarding_faq_done'));
    } catch (e) {
      console.error('Failed to initialize onboarding service', e);
    }
  }

  private readonly _window = inject(WINDOW);

  private _settingsDone = signal(false);
  private _productDone = signal(false);
  private _recipeDone = signal(false);
  private _faqDone = signal(false);
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
    try {
      this._window?.localStorage.setItem('onboarding_product_done', '1');
      this._productDone.set(true);
    } catch (e) {
      console.error('Failed to mark product onboarding as done', e);
    }
  }

  markRecipeDone() {
    try {
      this._window?.localStorage.setItem('onboarding_recipe_done', '1');
      this._recipeDone.set(true);
    } catch (e) {
      console.error('Failed to mark product onboarding as done', e);
    }
  }

  markSettingsDone() {
    try {
      this._window?.localStorage.setItem('onboarding_settings_done', '1');
      this._settingsDone.set(true);
    } catch (e) {
      console.error('Failed to mark product onboarding as done', e);
    }
  }

  markFaqDone() {
    try {
      this._window?.localStorage.setItem('onboarding_faq_done', '1');
      this._faqDone.set(true);
    } catch (e) {
      console.error('Failed to mark product onboarding as done', e);
    }
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
