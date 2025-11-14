import {
  Injectable,
  setClassMetadata,
  ɵɵdefineInjectable
} from "./chunk-Z5TNFCCP.js";
import {
  __spreadProps,
  __spreadValues
} from "./chunk-46DXP6YY.js";

// src/app/shared/service/services/analytics.service.ts
var AnalyticsService = class _AnalyticsService {
  constructor() {
  }
  GOALS = {
    RECIPE_CREATED: {
      goal_id: "recipe_created",
      goal_name: "Recipe Created",
      event_category: "recipe",
      event_label: "recipe_creation"
    },
    PRODUCT_CREATED: {
      goal_id: "product_created",
      goal_name: "Product Created",
      event_category: "product",
      event_label: "product_creation"
    },
    RECIPE_CALCULATED: {
      goal_id: "recipe_calculated",
      goal_name: "Recipe Calculated",
      event_category: "recipe",
      event_label: "recipe_calculation"
    },
    INVOICE_CREATED: {
      goal_id: "invoice_created",
      goal_name: "Invoice Created",
      event_category: "invoice",
      event_label: "invoice_creation"
    },
    PWA_INSTALL_ACCEPTED: {
      goal_id: "pwa_install_accepted",
      goal_name: "PWA Install Accepted",
      event_category: "pwa",
      event_label: "install_accepted"
    },
    PWA_INSTALL_DECLINED: {
      goal_id: "pwa_install_declined",
      goal_name: "PWA Install Declined",
      event_category: "pwa",
      event_label: "install_declined"
    },
    SUPPORT_MESSAGE_SENT: {
      goal_id: "support_message_sent",
      goal_name: "Support Message Sent",
      event_category: "support",
      event_label: "message_sent"
    }
  };
  /**
   * Track a custom event
   */
  trackEvent(eventName, parameters) {
    if (typeof window !== "undefined" && window.gtag && window.gtagLoaded) {
      const consent = this._getCookieConsent();
      if (consent === "all" || consent === "analytics") {
        window.gtag("event", eventName, __spreadProps(__spreadValues({}, parameters), {
          user_weak_uuid: this._getUserUUID()
        }));
        console.log("Analytics event tracked:", eventName, parameters);
      } else {
        console.warn("Analytics consent not granted for event:", eventName);
      }
    } else {
      console.warn("Google Analytics not available for event:", eventName);
    }
  }
  /**
   * Track recipe creation
   */
  trackRecipeCreated(recipeName, additionalData) {
    const eventData = {
      event_category: this.GOALS.RECIPE_CREATED.event_category,
      event_label: this.GOALS.RECIPE_CREATED.event_label,
      value: 1
    };
    if (recipeName) {
      eventData["recipe_name"] = recipeName;
    }
    if (additionalData) {
      Object.assign(eventData, additionalData);
    }
    this.trackEvent("recipe_created", eventData);
  }
  /**
   * Track product creation
   */
  trackProductCreated(productName, additionalData) {
    const eventData = {
      event_category: this.GOALS.PRODUCT_CREATED.event_category,
      event_label: this.GOALS.PRODUCT_CREATED.event_label,
      value: 1
    };
    if (productName) {
      eventData["product_name"] = productName;
    }
    if (additionalData) {
      Object.assign(eventData, additionalData);
    }
    this.trackEvent("product_created", eventData);
  }
  /**
   * Track recipe calculation
   */
  trackRecipeCalculated(recipeName, servings, additionalData) {
    const eventData = {
      event_category: this.GOALS.RECIPE_CALCULATED.event_category,
      event_label: this.GOALS.RECIPE_CALCULATED.event_label,
      value: 1
    };
    if (recipeName) {
      eventData["recipe_name"] = recipeName;
    }
    if (servings) {
      eventData["servings"] = servings;
    }
    if (additionalData) {
      Object.assign(eventData, additionalData);
    }
    this.trackEvent("recipe_calculated", eventData);
  }
  /**
   * Track invoice creation
   */
  trackInvoiceCreated(invoiceNumber, totalAmount, additionalData) {
    const eventData = {
      event_category: this.GOALS.INVOICE_CREATED.event_category,
      event_label: this.GOALS.INVOICE_CREATED.event_label,
      value: 1
    };
    if (invoiceNumber) {
      eventData["invoice_number"] = invoiceNumber;
    }
    if (totalAmount) {
      eventData["total_amount"] = totalAmount;
    }
    if (additionalData) {
      Object.assign(eventData, additionalData);
    }
    this.trackEvent("invoice_created", eventData);
  }
  /**
   * Track user engagement
   */
  trackUserEngagement(action, category, label, value) {
    this.trackEvent("user_engagement", {
      event_category: category,
      event_label: label,
      action,
      value
    });
  }
  /**
   * Track PWA install acceptance
   */
  trackPwaInstallAccepted(additionalData) {
    const eventData = {
      event_category: this.GOALS.PWA_INSTALL_ACCEPTED.event_category,
      event_label: this.GOALS.PWA_INSTALL_ACCEPTED.event_label,
      value: 1
    };
    if (additionalData) {
      Object.assign(eventData, additionalData);
    }
    this.trackEvent("pwa_install_accepted", eventData);
  }
  /**
   * Track PWA install decline
   */
  trackPwaInstallDeclined(additionalData) {
    const eventData = {
      event_category: this.GOALS.PWA_INSTALL_DECLINED.event_category,
      event_label: this.GOALS.PWA_INSTALL_DECLINED.event_label,
      value: 1
    };
    if (additionalData) {
      Object.assign(eventData, additionalData);
    }
    this.trackEvent("pwa_install_declined", eventData);
  }
  /**
   * Track support message sent
   */
  trackSupportMessageSent(additionalData) {
    const eventData = {
      event_category: this.GOALS.SUPPORT_MESSAGE_SENT.event_category,
      event_label: this.GOALS.SUPPORT_MESSAGE_SENT.event_label,
      value: 1
    };
    if (additionalData) {
      Object.assign(eventData, additionalData);
    }
    this.trackEvent("support_message_sent", eventData);
  }
  /**
   * Track error events
   */
  trackError(errorType, errorMessage, additionalData) {
    const eventData = {
      event_category: "error",
      event_label: errorType,
      error_message: errorMessage
    };
    if (additionalData) {
      Object.assign(eventData, additionalData);
    }
    this.trackEvent("exception", eventData);
  }
  /**
   * Get available goals
   */
  getGoals() {
    return this.GOALS;
  }
  /**
   * Check if analytics is available and consented
   */
  isAnalyticsAvailable() {
    if (typeof window === "undefined")
      return false;
    const consent = this._getCookieConsent();
    const hasConsent = consent === "all" || consent === "analytics";
    const hasGtag = typeof window.gtag === "function";
    return hasConsent && hasGtag;
  }
  /**
   * Get analytics status for debugging
   */
  getAnalyticsStatus() {
    if (typeof window === "undefined") {
      return { available: false, consent: null, gtag: false };
    }
    const consent = this._getCookieConsent();
    const hasGtag = typeof window.gtag === "function";
    return {
      available: (consent === "all" || consent === "analytics") && hasGtag,
      consent,
      gtag: hasGtag
    };
  }
  _getCookieConsent() {
    try {
      return String(localStorage.getItem("cookie-consent")).trim() || "unknown";
    } catch {
      return "unknown";
    }
  }
  _getUserUUID() {
    try {
      return String(localStorage.getItem("userUUID")).trim() || "unknown";
    } catch {
      return "unknown";
    }
  }
  static \u0275fac = function AnalyticsService_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _AnalyticsService)();
  };
  static \u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _AnalyticsService, factory: _AnalyticsService.\u0275fac, providedIn: "root" });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(AnalyticsService, [{
    type: Injectable,
    args: [{
      providedIn: "root"
    }]
  }], () => [], null);
})();

export {
  AnalyticsService
};
//# sourceMappingURL=chunk-PF6RY5D3.js.map
