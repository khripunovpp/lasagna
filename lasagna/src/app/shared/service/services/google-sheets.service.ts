import {Injectable, inject} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {TranslateService} from '@ngx-translate/core';

export interface GoogleSheetsConfig {
  appsScriptUrl: string;
}

export interface FeedbackData {
  timestamp: string;
  userId: string;
  satisfied: boolean;
  feedback: string;
  userAgent: string;
  appVersion: string;
}

export interface AppsScriptResponse {
  result: 'success' | 'error';
  message?: string;
  data?: any;
}

@Injectable({
  providedIn: 'root'
})
export class GoogleSheetsService {
  private readonly translateService = inject(TranslateService);

  constructor(private http: HttpClient) {
  }

  /**
   * Отправляет данные обратной связи через Google Apps Script
   * @param config Конфигурация с URL Apps Script
   * @param feedbackData Данные обратной связи
   * @returns Observable с результатом операции
   */
  sendFeedback(
    config: GoogleSheetsConfig,
    feedbackData: FeedbackData
  ): Observable<AppsScriptResponse> {
    // Используем GET запрос с параметрами для обхода CORS
    const params = new URLSearchParams();
    params.append('timestamp', feedbackData.timestamp);
    params.append('userId', feedbackData.userId);
    params.append('satisfied', feedbackData.satisfied.toString());
    params.append('feedback', feedbackData.feedback);
    params.append('userAgent', feedbackData.userAgent);
    params.append('appVersion', feedbackData.appVersion);

    const url = `${config.appsScriptUrl}?${params.toString()}`;

    return this.http.get<AppsScriptResponse>(url).pipe(
      catchError(this._handleError)
    );
  }

  private _handleError(
    error: any,
  ): Observable<never> {

    let errorMessage = this.translateService.instant('errors.google-sheets.general');

    if (error.error?.error) {
      const googleError = error.error.error;
      switch (googleError.code) {
        case 400:
          errorMessage = this.translateService.instant('errors.google-sheets.invalid-parameters');
          break;
        case 401:
          errorMessage = this.translateService.instant('errors.google-sheets.authorization');
          break;
        case 403:
          errorMessage = this.translateService.instant('errors.google-sheets.no-access');
          break;
        case 404:
          errorMessage = this.translateService.instant('errors.google-sheets.not-found');
          break;
        case 429:
          errorMessage = this.translateService.instant('errors.google-sheets.rate-limit');
          break;
        default:
          errorMessage = googleError.message || errorMessage;
      }
    }

    return throwError(() => new Error(errorMessage));
  }
}
