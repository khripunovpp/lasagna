import {inject, Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {
  FeedbackData,
  GoogleSheetsConfig,
  GoogleSheetsService
} from '../../../shared/service/services/google-sheets.service';
import {AnalyticsService} from '../../../shared/service/services/analytics.service';
import {VersionService} from '../../../shared/service/services/version.service';
import {WINDOW} from '../../../shared/service/tokens/window.token';

export interface SatisfactionData {
  timestamp: string;
  userId?: string;
  satisfied: boolean;
  feedback?: string;
  userAgent: string;
  appVersion: string;
}

export interface SatisfactionConfig {
  googleSheets: GoogleSheetsConfig;
}

@Injectable({
  providedIn: 'root'
})
export class UserSatisfactionService {
  private readonly googleSheetsService = inject(GoogleSheetsService);
  private readonly analyticsService = inject(AnalyticsService);
  private readonly versionService = inject(VersionService);

  private readonly storageKey = 'user-satisfaction-data';
  private config: SatisfactionConfig | null = null;
  private readonly _window = inject(WINDOW);

  /**
   * Инициализирует сервис с конфигурацией
   * @param config Конфигурация для сбора обратной связи
   */
  initialize(config: SatisfactionConfig): void {
    this.config = config;
  }

  /**
   * Обрабатывает положительный ответ пользователя
   */
  handlePositiveFeedback(): void {
    this.sendAnalyticsGoal('user_satisfaction_positive');
    this.recordVote(true);
  }

  /**
   * Отправляет цель в Analytics при нажатии на отрицательный смайлик
   */
  handleNegativeClick(): void {
    this.sendAnalyticsGoal('user_satisfaction_negative');
    this.recordVote(false);
  }

  /**
   * Обрабатывает отправку отрицательного отзыва с текстом
   * @param feedback Текстовый отзыв пользователя
   */
  handleNegativeFeedback(feedback: string): Observable<void> {
    return new Observable(observer => {
      this.recordInteraction(false, feedback)
        .then(() => {
          observer.next();
          observer.complete();
        })
        .catch(error => {
          console.error('Error sending feedback:', error);
          observer.error(error);
        });
    });
  }

  /**
   * Записывает факт закрытия попапа без ответа
   */
  recordPopupClosed(): void {
    const data = this.getStorageData();
    data.lastClosed = Date.now();
    this.saveStorageData(data);
  }

  /**
   * Сбрасывает данные о взаимодействиях (для тестирования)
   */
  resetInteractionData(): void {
    try {
      this._window?.localStorage.removeItem(this.storageKey);
    } catch (error) {
      console.error('Error resetting interaction data:', error);
    }
  }

  /**
   * Проверяет и показывает попап при инициализации
   */
  checkAndShowPopup() {
    if (this.hasUserVoted()) {
      return;
    }

    if (this.shouldWaitAfterClose()) {
      return;
    }

    if (this.shouldWaitAfterFirstTime()) {
      return;
    }
    return true;
  }

  /**
   * Проверяет, голосовал ли пользователь
   */
  private hasUserVoted(): boolean {
    const data = this.getStorageData();
    return data.hasVoted;
  }

  /**
   * Проверяет, нужно ли ждать неделю после последнего закрытия
   */
  private shouldWaitAfterClose(): boolean {
    const data = this.getStorageData();
    if (!data.lastClosed) {
      return false; // Никогда не закрывали
    }

    const now = Date.now();
    const weekInMs = 7 * 24 * 60 * 60 * 1000; // 7 дней в миллисекундах

    return (now - data.lastClosed) < weekInMs;
  }

  /**
   * Проверяет, нужно ли ждать неделю после первого входа в приложение
   */
  private shouldWaitAfterFirstTime(): boolean {
    try {
      const isFirstTime = this._window?.localStorage.getItem('isUserFirstTime');

      if (!isFirstTime) {
        return false;
      }

      let firstTimeTimestamp: number;

      // Пытаемся парсить как JSON объект
      try {
        const firstTimeData = JSON.parse(isFirstTime);

        if (firstTimeData.timestamp) {
          firstTimeTimestamp = firstTimeData.timestamp;
        } else if (typeof firstTimeData === 'number') {
          firstTimeTimestamp = firstTimeData;
        } else {
          return false;
        }
      } catch {
        const parsed = parseInt(isFirstTime);
        if (isNaN(parsed)) {
          return false;
        }
        firstTimeTimestamp = parsed;
      }

      const now = Date.now();
      const weekInMs = 7 * 24 * 60 * 60 * 1000; // 7 дней в миллисекундах
      const timeDiff = now - firstTimeTimestamp;
      const daysAgo = Math.floor(timeDiff / (24 * 60 * 60 * 1000));

      return timeDiff < weekInMs;
    } catch (error) {
      console.error('❌ Error reading isUserFirstTime:', error);
      return false;
    }
  }

  /**
   * Записывает факт голосования без отправки в Google Таблицы (для положительного отзыва)
   */
  private recordVote(satisfied: boolean): void {
    const data = this.getStorageData();
    const now = Date.now();

    data.hasVoted = true;
    data.voteDate = now;
    data.interactions.push({
      timestamp: new Date().toISOString(),
      satisfied,
      feedback: undefined
    });

    this.saveStorageData(data);
  }

  /**
   * Записывает взаимодействие с отправкой в Google Таблицы (для отрицательного отзыва с текстом)
   */
  private async recordInteraction(satisfied: boolean, feedback?: string): Promise<void> {
    await this.sendToGoogleSheets(satisfied, feedback);
    const data = this.getStorageData();
    const now = Date.now();

    data.hasVoted = true;
    data.voteDate = now;
    data.interactions.push({
      timestamp: new Date().toISOString(),
      satisfied,
      feedback: feedback || 'empty'
    });

    this.saveStorageData(data);
  }

  private async sendToGoogleSheets(satisfied: boolean, feedback?: string): Promise<void> {
    if (!this.config) {
      throw new Error('Service not initialized');
    }

    const feedbackData: FeedbackData = {
      timestamp: new Date().toISOString(),
      userId: this.getUserId() ?? 'anonymous',
      satisfied,
      feedback: feedback || '',
      userAgent: this._window?.navigator.userAgent || 'unknown',
      appVersion: this.versionService.version(),
    };

    try {
      await this.googleSheetsService.sendFeedback(
        this.config.googleSheets,
        feedbackData
      ).toPromise();
    } catch (error) {
      console.error('Error sending data to Google Sheets:', error);
      throw error;
    }
  }

  private sendAnalyticsGoal(goalName: string): void {
    try {
      this.analyticsService.trackEvent(goalName, {
        event_category: 'user_satisfaction',
        event_label: goalName,
        value: 1
      });
    } catch (error) {
      console.error('Error sending goal to Analytics:', error);
    }
  }

  private getStorageData(): {
    hasVoted: boolean;
    voteDate: number | null;
    lastClosed: number | null;
    interactions: Array<{
      timestamp: string;
      satisfied: boolean;
      feedback?: string;
    }>;
  } {
    const stored = this.getStoredData();

    if (stored) {
      try {
        const data = JSON.parse(stored);
        // Мигрируем старые данные если есть
        if (data.firstLaunch && !data.hasOwnProperty('hasVoted')) {
          return {
            hasVoted: data.interactions && data.interactions.length > 0,
            voteDate: data.lastShown || null,
            lastClosed: null,
            interactions: data.interactions || []
          };
        }
        // Добавляем lastClosed если его нет
        if (!data.hasOwnProperty('lastClosed')) {
          data.lastClosed = null;
        }
        return data;
      } catch {
        // Если данные повреждены, создаем новые
      }
    }

    const defaultData = {
      hasVoted: false,
      voteDate: null,
      lastClosed: null,
      interactions: []
    };

    this.saveStorageData(defaultData);
    return defaultData;
  }

  private saveStorageData(data: any): void {
    try {
      this._window?.localStorage.setItem(this.storageKey, JSON.stringify(data));
    } catch (error) {
      console.error('Error saving data to localStorage:', error);
    }
  }

  private getUserId(): string | undefined {
    try {
      return this._window?.localStorage.getItem('user-id') || undefined;
    } catch {
      return undefined;
    }
  }

  private getStoredData() {
    try {
      return this._window?.localStorage.getItem(this.storageKey);
    } catch (error) {
      console.error('Error reading storage data:', error);
      return undefined;
    }
  }
}
