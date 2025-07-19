import { Injectable, signal, computed } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class OnboardingService {
  // Сигналы для хранения состояния шагов
  private _settingsDone = signal(!!localStorage.getItem('onboarding_settings_done'));
  private _productDone = signal(!!localStorage.getItem('onboarding_product_done'));
  private _recipeDone = signal(!!localStorage.getItem('onboarding_recipe_done'));

  // Computed для общего статуса
  isOnboardingComplete = computed(() => 
    this._settingsDone() && this._productDone() && this._recipeDone()
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

  isProductDone(): boolean {
    return this._productDone();
  }

  isRecipeDone(): boolean {
    return this._recipeDone();
  }

  isSettingsDone(): boolean {
    return this._settingsDone();
  }

  // Метод для сброса онбординга
  resetOnboarding() {
    localStorage.removeItem('onboarding_settings_done');
    localStorage.removeItem('onboarding_product_done');
    localStorage.removeItem('onboarding_recipe_done');
    
    this._settingsDone.set(false);
    this._productDone.set(false);
    this._recipeDone.set(false);
  }
} 