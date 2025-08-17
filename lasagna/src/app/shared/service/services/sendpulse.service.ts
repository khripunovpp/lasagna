import {inject, Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {BehaviorSubject, Observable, throwError} from 'rxjs';
import {catchError, switchMap, tap} from 'rxjs/operators';
import {LoggerService} from '../../../features/logger/logger.service';

export interface SendPulseEmailData {
  to: {
    name?: string
    email: string
  }
  from: {
    name?: string
    email: string
  }
  subject: string
  message: string
  clientName?: string
  clientEmail: string
  templateId: number
}

export interface SendPulseResponse {
  success: boolean
  message?: string
  error?: string
}

interface SendPulseTokenResponse {
  access_token: string
  token_type: string
  expires_in: number
}

/**
 * Service for sending emails through SendPulse API
 * Based on official SendPulse API documentation
 */
@Injectable({
  providedIn: 'root'
})
export class SendPulseService {
  private readonly httpClient = inject(HttpClient);
  private readonly logger = inject(LoggerService).withContext({
    color: '#4CAF50',
    label: 'SendPulse'
  });

  private baseUrl = '';

  private get tokenEndpoint(): string {
    return `${this.baseUrl}/oauth/access_token`;
  }

  private get emailEndpoint(): string {
    return `${this.baseUrl}/smtp/emails`;
  }

  private apiKey: string = '';
  private apiSecret: string = '';
  private accessToken$ = new BehaviorSubject<string | null>(null);
  private tokenExpiryTime = 0;

  /**
   * Initialize SendPulse service with API credentials
   */
  initialize(config: {
    apiKey: string
    apiSecret: string
    domain: string
  }): void {
    this.apiKey = config.apiKey;
    this.apiSecret = config.apiSecret;
    this.baseUrl = config.domain;
    this.logger.log('SendPulse service initialized');
  }

  /**
   * Send email through SendPulse API
   */
  sendEmail(emailData: SendPulseEmailData): Observable<SendPulseResponse> {
    if (!this.apiKey || !this.apiSecret) {
      this.logger.error('SendPulse API credentials not configured');
      return throwError(() => new Error('SendPulse API credentials not configured'));
    }

    return this.sendEmailDirect(emailData);
  }

  /**
   * Send email directly through SendPulse API
   */
  private sendEmailDirect(emailData: SendPulseEmailData): Observable<SendPulseResponse> {
    return this.getValidAccessToken().pipe(
      switchMap(token => {
        // Correct SendPulse API format according to documentation
        const payload = {
          template: {
            id: emailData.templateId,
            variables: {
              clientName: emailData.clientName || '',
              clientEmail: emailData.clientEmail || '',
              message: emailData.message.replace(/\n/g, '<br>') // Replace newlines with <br> for HTML
            }
          },
          subject: emailData.subject,
          from: {
            name: emailData.from.name ?? 'Lasagna App Support',
            email: emailData.from.email,
          },
          to: [
            {
              name: emailData.to.name ?? 'Support Team',
              email: emailData.to.email,
            }
          ]
        };

        const headers = new HttpHeaders({
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        });

        this.logger.log('Sending email via direct API', {payload});

        return this.httpClient.post<any>(this.emailEndpoint, {email: payload}, {headers}).pipe(
          tap(response => {
            this.logger.log('Email sent successfully via direct API', response);
          }),
          switchMap(() => [{
            success: true,
            message: 'Email sent successfully'
          }]),
          catchError(error => {
            this.logger.error('Failed to send email via direct API', error);
            return throwError(() => error);
          })
        );
      })
    );
  }


  /**
   * Format email content as HTML
   */
  private formatEmailContent(emailData: SendPulseEmailData): string {
    // Экранируем email и делаем ссылку mailto:
    const clientEmailHtml = emailData.clientEmail
      ? `<p><strong>Email:</strong> <a href="mailto:${emailData.clientEmail}">${emailData.clientEmail}</a></p>`
      : '';

    const clientNameHtml = emailData.clientName
      ? `<p><strong>From:</strong> ${emailData.clientName}</p>`
      : '';

    // Форматируем текст сообщения с переносами строк
    const messageHtml = emailData.message
      ? emailData.message.replace(/\n/g, '<br>')
      : '';

    return `
    <html>
      <body style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
        <h2 style="color: #333; border-bottom: 2px solid #e1e1e1; padding-bottom: 10px;">
          ${emailData.subject}
        </h2>

        ${clientNameHtml}
        ${clientEmailHtml}

        <div style="background-color: #f9f9f9; padding: 20px; border-radius: 8px; margin: 20px 0;">
          ${messageHtml}
        </div>

        <footer style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e1e1e1; font-size: 12px; color: #666;">
          <p>This message was sent through Lasagna App support system.</p>
        </footer>
      </body>
    </html>
  `;
  }

  /**
   * Get valid access token, refresh if needed
   */
  private getValidAccessToken(): Observable<string> {
    const now = Date.now();
    const currentToken = this.accessToken$.value;

    // Check if we have a valid token that's not expired
    if (currentToken && now < this.tokenExpiryTime) {
      return this.accessToken$.asObservable().pipe(
        switchMap(token => token ? [token] : this.fetchNewAccessToken())
      );
    }

    // Need to fetch a new token
    return this.fetchNewAccessToken();
  }

  /**
   * Fetch new access token from SendPulse API
   */
  private fetchNewAccessToken(): Observable<string> {
    const body = new URLSearchParams();
    body.set('grant_type', 'client_credentials');
    body.set('client_id', this.apiKey);
    body.set('client_secret', this.apiSecret);

    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded'
    });

    this.logger.log('Fetching new access token');

    return this.httpClient.post<SendPulseTokenResponse>(this.tokenEndpoint, body.toString(), {headers}).pipe(
      tap(response => {
        this.logger.log('Access token received', {expires_in: response.expires_in});

        // Store token with expiry time (subtract 60 seconds for safety margin)
        this.tokenExpiryTime = Date.now() + (response.expires_in - 60) * 1000;
        this.accessToken$.next(response.access_token);
      }),
      switchMap(response => [response.access_token]),
      catchError(error => {
        this.logger.error('Failed to get access token', error);
        return throwError(() => error);
      })
    );
  }
}
