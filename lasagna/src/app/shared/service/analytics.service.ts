import { Injectable } from '@angular/core';

export interface AnalyticsEvent {
  event_category: string;
  event_label?: string;
  value?: number;
  [key: string]: any;
}

export interface AnalyticsGoal {
  goal_id: string;
  goal_name: string;
  event_category: string;
  event_label?: string;
}

@Injectable({
  providedIn: 'root'
})
export class AnalyticsService {
  private readonly GOALS = {
    RECIPE_CREATED: {
      goal_id: 'recipe_created',
      goal_name: 'Recipe Created',
      event_category: 'recipe',
      event_label: 'recipe_creation'
    },
    PRODUCT_CREATED: {
      goal_id: 'product_created', 
      goal_name: 'Product Created',
      event_category: 'product',
      event_label: 'product_creation'
    },
    RECIPE_CALCULATED: {
      goal_id: 'recipe_calculated',
      goal_name: 'Recipe Calculated',
      event_category: 'recipe',
      event_label: 'recipe_calculation'
    },
    INVOICE_CREATED: {
      goal_id: 'invoice_created',
      goal_name: 'Invoice Created', 
      event_category: 'invoice',
      event_label: 'invoice_creation'
    }
  };

  constructor() {}

  /**
   * Track a custom event
   */
  trackEvent(eventName: string, parameters: AnalyticsEvent): void {
    if (typeof window !== 'undefined' && window.gtag) {
      // Check if analytics storage is granted
      const consent = localStorage.getItem('cookie-consent');
      if (consent === 'all' || consent === 'analytics') {
        window.gtag('event', eventName, parameters);
        console.log('Analytics event tracked:', eventName, parameters);
      } else {
        console.warn('Analytics consent not granted for event:', eventName);
      }
    } else {
      console.warn('Google Analytics not available for event:', eventName);
    }
  }

  /**
   * Track recipe creation
   */
  trackRecipeCreated(recipeName?: string, additionalData?: any): void {
    const eventData: AnalyticsEvent = {
      event_category: this.GOALS.RECIPE_CREATED.event_category,
      event_label: this.GOALS.RECIPE_CREATED.event_label,
      value: 1
    };

    if (recipeName) {
      eventData['recipe_name'] = recipeName;
    }

    if (additionalData) {
      Object.assign(eventData, additionalData);
    }

    this.trackEvent('recipe_created', eventData);
  }

  /**
   * Track product creation
   */
  trackProductCreated(productName?: string, additionalData?: any): void {
    const eventData: AnalyticsEvent = {
      event_category: this.GOALS.PRODUCT_CREATED.event_category,
      event_label: this.GOALS.PRODUCT_CREATED.event_label,
      value: 1
    };

    if (productName) {
      eventData['product_name'] = productName;
    }

    if (additionalData) {
      Object.assign(eventData, additionalData);
    }

    this.trackEvent('product_created', eventData);
  }

  /**
   * Track recipe calculation
   */
  trackRecipeCalculated(recipeName?: string, servings?: number, additionalData?: any): void {
    const eventData: AnalyticsEvent = {
      event_category: this.GOALS.RECIPE_CALCULATED.event_category,
      event_label: this.GOALS.RECIPE_CALCULATED.event_label,
      value: 1
    };

    if (recipeName) {
      eventData['recipe_name'] = recipeName;
    }

    if (servings) {
      eventData['servings'] = servings;
    }

    if (additionalData) {
      Object.assign(eventData, additionalData);
    }

    this.trackEvent('recipe_calculated', eventData);
  }

  /**
   * Track invoice creation
   */
  trackInvoiceCreated(invoiceNumber?: string, totalAmount?: number, additionalData?: any): void {
    const eventData: AnalyticsEvent = {
      event_category: this.GOALS.INVOICE_CREATED.event_category,
      event_label: this.GOALS.INVOICE_CREATED.event_label,
      value: 1
    };

    if (invoiceNumber) {
      eventData['invoice_number'] = invoiceNumber;
    }

    if (totalAmount) {
      eventData['total_amount'] = totalAmount;
    }

    if (additionalData) {
      Object.assign(eventData, additionalData);
    }

    this.trackEvent('invoice_created', eventData);
  }

  /**
   * Track page view
   */
  trackPageView(pageTitle: string, pagePath?: string): void {
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('config', 'G-GWN769JKRP', {
        page_title: pageTitle,
        page_path: pagePath || window.location.pathname
      });
      console.log('Page view tracked:', pageTitle);
    }
  }

  /**
   * Track user engagement
   */
  trackUserEngagement(action: string, category: string, label?: string, value?: number): void {
    this.trackEvent('user_engagement', {
      event_category: category,
      event_label: label,
      action: action,
      value: value
    });
  }

  /**
   * Track error events
   */
  trackError(errorType: string, errorMessage: string, additionalData?: any): void {
    const eventData: AnalyticsEvent = {
      event_category: 'error',
      event_label: errorType,
      error_message: errorMessage
    };

    if (additionalData) {
      Object.assign(eventData, additionalData);
    }

    this.trackEvent('exception', eventData);
  }

  /**
   * Get available goals
   */
  getGoals(): Record<string, AnalyticsGoal> {
    return this.GOALS;
  }

  /**
   * Check if analytics is available and consented
   */
  isAnalyticsAvailable(): boolean {
    if (typeof window === 'undefined') return false;
    
    const consent = localStorage.getItem('cookie-consent');
    const hasConsent = consent === 'all' || consent === 'analytics';
    const hasGtag = typeof window.gtag === 'function';
    
    return hasConsent && hasGtag;
  }

  /**
   * Get analytics status for debugging
   */
  getAnalyticsStatus(): { available: boolean; consent: string | null; gtag: boolean } {
    if (typeof window === 'undefined') {
      return { available: false, consent: null, gtag: false };
    }
    
    const consent = localStorage.getItem('cookie-consent');
    const hasGtag = typeof window.gtag === 'function';
    
    return {
      available: (consent === 'all' || consent === 'analytics') && hasGtag,
      consent,
      gtag: hasGtag
    };
  }
}

// Extend Window interface for TypeScript
declare global {
  interface Window {
    gtag: (...args: any[]) => void;
  }
} 