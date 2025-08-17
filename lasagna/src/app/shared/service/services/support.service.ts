import {inject, Injectable, signal} from '@angular/core';
import {Observable, of, throwError} from 'rxjs';
import {catchError, map} from 'rxjs/operators';
import {SendPulseEmailData, SendPulseService} from './sendpulse.service';
import {LoggerService} from '../../../features/logger/logger.service';
import {AnalyticsService} from './analytics.service';
export interface SupportMessageData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export interface SupportSendResult {
  success: boolean;
  message: string;
  rateLimited?: boolean;
}

interface RateLimitEntry {
  timestamp: number;
  count: number;
}

/**
 * Service for handling support messages with rate limiting
 */
@Injectable({
  providedIn: 'root'
})
export class SupportService {
  private readonly sendPulseService = inject(SendPulseService);
  private readonly analyticsService = inject(AnalyticsService);
  private readonly logger = inject(LoggerService).withContext({
    color: '#2196F3',
    label: 'Support'
  });

  // Rate limiting: max 3 messages per 5 minutes
  private readonly maxMessages = 3;
  private readonly timeWindowMs = 5 * 60 * 1000; // 5 minutes
  private readonly rateLimitKey = 'support_rate_limit';

  // Signals for tracking state
  private readonly isInitialized = signal(false);
  private readonly supportEmail = signal('');
  private readonly supportFromEmail = signal('');

  /**
   * Initialize support service with SendPulse configuration
   */
  initialize(config: {
    smtp: {
      apiKey: string
      apiSecret: string
      domain: string
      supportEmail: string
      senderEmail: string
      senderName: string
    }
  }): void {
    this.sendPulseService.initialize(config.smtp);

    if (config.smtp.supportEmail) {
      this.supportEmail.set(config.smtp.supportEmail);
    }

    if (config.smtp.senderEmail) {
      this.supportFromEmail.set(config.smtp.senderEmail);
    }

    this.isInitialized.set(true);
    this.logger.log('Support service initialized', {
      supportEmail: this.supportEmail(),
      senderEmail: this.supportFromEmail()
    });
  }

  /**
   * Send support message with rate limiting
   */
  sendSupportMessage(messageData: SupportMessageData): Observable<SupportSendResult> {
    if (!this.isInitialized()) {
      this.logger.error('Support service not initialized');
      return throwError(() => new Error('Support service not initialized'));
    }

    // Check rate limiting
    const rateLimitCheck = this.checkRateLimit();
    if (!rateLimitCheck.allowed) {
      this.logger.warn('Rate limit exceeded', {
        currentCount: rateLimitCheck.currentCount,
        timeRemaining: rateLimitCheck.timeUntilReset
      });

      return of({
        success: false,
        message: `Too many messages sent. Please wait ${Math.ceil(rateLimitCheck.timeUntilReset / 60000)} minutes before sending another message.`,
        rateLimited: true
      });
    }

    // Prepare email data
    const emailData: SendPulseEmailData = {
      templateId: 39092,
      to: {
        email: this.supportEmail(),
      },
      from: {
        email: this.supportFromEmail(),
      },
      subject: `Support Request: ${messageData.subject}`,
      message: messageData.message,
      clientName: messageData.name,
      clientEmail: messageData.email
    };

    this.logger.log('Sending support message', {
      name: messageData.name,
      email: messageData.email,
      subject: messageData.subject
    });

    return this.sendPulseService.sendEmail(emailData).pipe(
      map(response => {
        // SendPulse API returns success when HTTP status is 200
        // Record successful send for rate limiting
        this.recordMessageSent();
        this.sendAnalyticsEvent();

        this.logger.log('Support message sent successfully');
        return {
          success: true,
          message: 'Your support message has been sent successfully. We will get back to you soon!'
        };
      }),
      catchError(error => {
        this.logger.error('Error sending support message', error);
        return of({
          success: false,
          message: 'An error occurred while sending your message. Please try again later.'
        });
      })
    );
  }

  /**
   * Check if user can send a message (rate limiting)
   */
  checkRateLimit(): { allowed: boolean; currentCount: number; timeUntilReset: number } {
    const now = Date.now();
    const rateLimitData = this.getRateLimitData();

    // Clean up old entries outside the time window
    const validEntries = rateLimitData.filter(entry =>
      now - entry.timestamp < this.timeWindowMs
    );

    // Save cleaned data
    this.saveRateLimitData(validEntries);

    const currentCount = validEntries.length;
    const allowed = currentCount < this.maxMessages;

    // Calculate time until oldest entry expires (when user can send again)
    let timeUntilReset = 0;
    if (!allowed && validEntries.length > 0) {
      const oldestEntry = validEntries[0];
      timeUntilReset = this.timeWindowMs - (now - oldestEntry.timestamp);
    }

    return {
      allowed,
      currentCount,
      timeUntilReset: Math.max(0, timeUntilReset)
    };
  }

  /**
   * Get remaining messages count
   */
  getRemainingMessages(): number {
    const rateLimitCheck = this.checkRateLimit();
    return Math.max(0, this.maxMessages - rateLimitCheck.currentCount);
  }

  /**
   * Clear rate limit data (for testing purposes)
   */
  clearRateLimit(): void {
    localStorage.removeItem(this.rateLimitKey);
    this.logger.log('Rate limit data cleared');
  }

  /**
   * Send analytics event for support message
   * @param additionalData Дополнительные данные для события
   * */
  sendAnalyticsEvent(additionalData?: any): void {
    if (!this.analyticsService.isAnalyticsAvailable()) {
      this.logger.warn('Analytics not available, skipping event tracking');
      return;
    }

    this.analyticsService.trackSupportMessageSent(additionalData);

    this.logger.log('Analytics event sent for support message', {additionalData});
  }

  /**
   * Record that a message was sent
   */
  private recordMessageSent(): void {
    const rateLimitData = this.getRateLimitData();
    rateLimitData.push({
      timestamp: Date.now(),
      count: 1
    });
    this.saveRateLimitData(rateLimitData);
  }

  /**
   * Get rate limit data from localStorage
   */
  private getRateLimitData(): RateLimitEntry[] {
    try {
      const data = localStorage.getItem(this.rateLimitKey);
      return data ? JSON.parse(data) : [];
    } catch (error) {
      this.logger.error('Failed to parse rate limit data', error);
      return [];
    }
  }

  /**
   * Save rate limit data to localStorage
   */
  private saveRateLimitData(data: RateLimitEntry[]): void {
    try {
      localStorage.setItem(this.rateLimitKey, JSON.stringify(data));
    } catch (error) {
      this.logger.error('Failed to save rate limit data', error);
    }
  }
}
