import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class BrowserTabTrackingService {
  constructor() {
    this.initBeforeUnloadListener();
  }

  hasUnsavedChanges = false;

  /**
   * Включает предупреждение при закрытии вкладки
   */
  enableProtection(): void {
    this.hasUnsavedChanges = true;
  }

  /**
   * Отключает предупреждение при закрытии вкладки
   */
  disableProtection(): void {
    this.hasUnsavedChanges = false;
  }

  /**
   * Подписка на системное событие `beforeunload`
   */
  private initBeforeUnloadListener(): void {
    window.addEventListener('beforeunload', (event) => {
      if (this.hasUnsavedChanges) {
        event.preventDefault();
        event.returnValue = ''; // Стандартный текст будет показан браузером
        this.disableProtection(); // Отключаем защиту после предупреждения
      } else {
        // Если нет несохраненных изменений, можно не делать ничего
        // или можно вызвать disableProtection() для явного отключения
        this.disableProtection();
      }
    });
  }
}
