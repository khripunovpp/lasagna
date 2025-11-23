import {
  ExpandDirective
} from "./chunk-NZ2BIUGW.js";
import {
  TextareaComponent
} from "./chunk-RJSN5CQV.js";
import {
  AnalyticsService
} from "./chunk-KXZ2SBHP.js";
import {
  DialogComponent
} from "./chunk-SAGRZL2K.js";
import "./chunk-QX25EV4N.js";
import {
  VersionService
} from "./chunk-CFCFQO5U.js";
import "./chunk-RBDPPOGX.js";
import "./chunk-BUGRPEBT.js";
import "./chunk-BPMAQ256.js";
import "./chunk-OGDPSEDB.js";
import {
  NotificationsService
} from "./chunk-6WNKKHFO.js";
import "./chunk-NLONWH5J.js";
import "./chunk-MV7X5YHM.js";
import "./chunk-QHJLSFIB.js";
import "./chunk-3UJV2MM3.js";
import "./chunk-UG5XPMCB.js";
import "./chunk-XXA7PPXB.js";
import {
  errorHandler
} from "./chunk-XIU3WVPC.js";
import "./chunk-T5CRNY7R.js";
import "./chunk-IWOUTMKL.js";
import "./chunk-R5O3TEDB.js";
import "./chunk-KM2DRJZA.js";
import {
  FormsModule,
  MaxLengthValidator,
  NgControlStatus,
  NgModel
} from "./chunk-2S3NUMNU.js";
import "./chunk-PHCOZAXM.js";
import "./chunk-AWZMWU52.js";
import "./chunk-5WJUMO7X.js";
import "./chunk-G3SIWE5M.js";
import {
  TitleComponent
} from "./chunk-3AYILQJD.js";
import "./chunk-MP6JNYP6.js";
import {
  FlexColumnComponent
} from "./chunk-K37ECZYU.js";
import "./chunk-AESGXZO7.js";
import {
  environment
} from "./chunk-2CTN2MPX.js";
import "./chunk-NJX644NS.js";
import {
  WINDOW
} from "./chunk-CFXQGSQM.js";
import {
  TranslatePipe,
  TranslateService
} from "./chunk-755Q3QHA.js";
import "./chunk-L34DFTMV.js";
import "./chunk-USF337CA.js";
import {
  HttpClient
} from "./chunk-VVQKNBNV.js";
import "./chunk-X2X7GTPW.js";
import "./chunk-PZQLIUCM.js";
import "./chunk-7YWLATDR.js";
import {
  Component,
  Injectable,
  Observable,
  ViewChild,
  catchError,
  forwardRef,
  inject,
  setClassMetadata,
  signal,
  throwError,
  viewChild,
  ɵsetClassDebugInfo,
  ɵɵadvance,
  ɵɵconditional,
  ɵɵconditionalCreate,
  ɵɵdefineComponent,
  ɵɵdefineInjectable,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵgetCurrentView,
  ɵɵinject,
  ɵɵlistener,
  ɵɵnextContext,
  ɵɵpipe,
  ɵɵpipeBind1,
  ɵɵproperty,
  ɵɵqueryAdvance,
  ɵɵresetView,
  ɵɵrestoreView,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1,
  ɵɵtwoWayBindingSet,
  ɵɵtwoWayListener,
  ɵɵtwoWayProperty,
  ɵɵviewQuerySignal
} from "./chunk-IYCVPBRB.js";
import "./chunk-46DXP6YY.js";

// src/app/shared/service/services/google-sheets.service.ts
var GoogleSheetsService = class _GoogleSheetsService {
  http;
  translateService = inject(TranslateService);
  constructor(http) {
    this.http = http;
  }
  /**
   * Отправляет данные обратной связи через Google Apps Script
   * @param config Конфигурация с URL Apps Script
   * @param feedbackData Данные обратной связи
   * @returns Observable с результатом операции
   */
  sendFeedback(config, feedbackData) {
    const params = new URLSearchParams();
    params.append("timestamp", feedbackData.timestamp);
    params.append("userId", feedbackData.userId);
    params.append("satisfied", feedbackData.satisfied.toString());
    params.append("feedback", feedbackData.feedback);
    params.append("userAgent", feedbackData.userAgent);
    params.append("appVersion", feedbackData.appVersion);
    const url = `${config.appsScriptUrl}?${params.toString()}`;
    return this.http.get(url).pipe(catchError(this._handleError));
  }
  _handleError(error) {
    let errorMessage = this.translateService.instant("errors.google-sheets.general");
    if (error.error?.error) {
      const googleError = error.error.error;
      switch (googleError.code) {
        case 400:
          errorMessage = this.translateService.instant("errors.google-sheets.invalid-parameters");
          break;
        case 401:
          errorMessage = this.translateService.instant("errors.google-sheets.authorization");
          break;
        case 403:
          errorMessage = this.translateService.instant("errors.google-sheets.no-access");
          break;
        case 404:
          errorMessage = this.translateService.instant("errors.google-sheets.not-found");
          break;
        case 429:
          errorMessage = this.translateService.instant("errors.google-sheets.rate-limit");
          break;
        default:
          errorMessage = googleError.message || errorMessage;
      }
    }
    return throwError(() => new Error(errorMessage));
  }
  static \u0275fac = function GoogleSheetsService_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _GoogleSheetsService)(\u0275\u0275inject(HttpClient));
  };
  static \u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _GoogleSheetsService, factory: _GoogleSheetsService.\u0275fac, providedIn: "root" });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(GoogleSheetsService, [{
    type: Injectable,
    args: [{
      providedIn: "root"
    }]
  }], () => [{ type: HttpClient }], null);
})();

// src/app/features/home/service/user-satisfaction.service.ts
var UserSatisfactionService = class _UserSatisfactionService {
  googleSheetsService = inject(GoogleSheetsService);
  analyticsService = inject(AnalyticsService);
  versionService = inject(VersionService);
  storageKey = "user-satisfaction-data";
  config = null;
  _window = inject(WINDOW);
  /**
   * Инициализирует сервис с конфигурацией
   * @param config Конфигурация для сбора обратной связи
   */
  initialize(config) {
    this.config = config;
  }
  /**
   * Обрабатывает положительный ответ пользователя
   */
  handlePositiveFeedback() {
    this.sendAnalyticsGoal("user_satisfaction_positive");
    this.recordVote(true);
  }
  /**
   * Отправляет цель в Analytics при нажатии на отрицательный смайлик
   */
  handleNegativeClick() {
    this.sendAnalyticsGoal("user_satisfaction_negative");
    this.recordVote(false);
  }
  /**
   * Обрабатывает отправку отрицательного отзыва с текстом
   * @param feedback Текстовый отзыв пользователя
   */
  handleNegativeFeedback(feedback) {
    return new Observable((observer) => {
      this.recordInteraction(false, feedback).then(() => {
        observer.next();
        observer.complete();
      }).catch((error) => {
        console.error("Error sending feedback:", error);
        observer.error(error);
      });
    });
  }
  /**
   * Записывает факт закрытия попапа без ответа
   */
  recordPopupClosed() {
    const data = this.getStorageData();
    data.lastClosed = Date.now();
    this.saveStorageData(data);
  }
  /**
   * Сбрасывает данные о взаимодействиях (для тестирования)
   */
  resetInteractionData() {
    try {
      this._window?.localStorage.removeItem(this.storageKey);
    } catch (error) {
      console.error("Error resetting interaction data:", error);
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
  hasUserVoted() {
    const data = this.getStorageData();
    return data.hasVoted;
  }
  /**
   * Проверяет, нужно ли ждать неделю после последнего закрытия
   */
  shouldWaitAfterClose() {
    const data = this.getStorageData();
    if (!data.lastClosed) {
      return false;
    }
    const now = Date.now();
    const weekInMs = 7 * 24 * 60 * 60 * 1e3;
    return now - data.lastClosed < weekInMs;
  }
  /**
   * Проверяет, нужно ли ждать неделю после первого входа в приложение
   */
  shouldWaitAfterFirstTime() {
    try {
      const isFirstTime = this._window?.localStorage.getItem("isUserFirstTime");
      if (!isFirstTime) {
        return false;
      }
      let firstTimeTimestamp;
      try {
        const firstTimeData = JSON.parse(isFirstTime);
        if (firstTimeData.timestamp) {
          firstTimeTimestamp = firstTimeData.timestamp;
        } else if (typeof firstTimeData === "number") {
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
      const weekInMs = 7 * 24 * 60 * 60 * 1e3;
      const timeDiff = now - firstTimeTimestamp;
      const daysAgo = Math.floor(timeDiff / (24 * 60 * 60 * 1e3));
      return timeDiff < weekInMs;
    } catch (error) {
      console.error("\u274C Error reading isUserFirstTime:", error);
      return false;
    }
  }
  /**
   * Записывает факт голосования без отправки в Google Таблицы (для положительного отзыва)
   */
  recordVote(satisfied) {
    const data = this.getStorageData();
    const now = Date.now();
    data.hasVoted = true;
    data.voteDate = now;
    data.interactions.push({
      timestamp: (/* @__PURE__ */ new Date()).toISOString(),
      satisfied,
      feedback: void 0
    });
    this.saveStorageData(data);
  }
  /**
   * Записывает взаимодействие с отправкой в Google Таблицы (для отрицательного отзыва с текстом)
   */
  async recordInteraction(satisfied, feedback) {
    await this.sendToGoogleSheets(satisfied, feedback);
    const data = this.getStorageData();
    const now = Date.now();
    data.hasVoted = true;
    data.voteDate = now;
    data.interactions.push({
      timestamp: (/* @__PURE__ */ new Date()).toISOString(),
      satisfied,
      feedback: feedback || "empty"
    });
    this.saveStorageData(data);
  }
  async sendToGoogleSheets(satisfied, feedback) {
    if (!this.config) {
      throw new Error("Service not initialized");
    }
    const feedbackData = {
      timestamp: (/* @__PURE__ */ new Date()).toISOString(),
      userId: this.getUserId() ?? "anonymous",
      satisfied,
      feedback: feedback || "",
      userAgent: this._window?.navigator.userAgent || "unknown",
      appVersion: this.versionService.version()
    };
    try {
      await this.googleSheetsService.sendFeedback(this.config.googleSheets, feedbackData).toPromise();
    } catch (error) {
      console.error("Error sending data to Google Sheets:", error);
      throw error;
    }
  }
  sendAnalyticsGoal(goalName) {
    try {
      this.analyticsService.trackEvent(goalName, {
        event_category: "user_satisfaction",
        event_label: goalName,
        value: 1
      });
    } catch (error) {
      console.error("Error sending goal to Analytics:", error);
    }
  }
  getStorageData() {
    const stored = this.getStoredData();
    if (stored) {
      try {
        const data = JSON.parse(stored);
        if (data.firstLaunch && !data.hasOwnProperty("hasVoted")) {
          return {
            hasVoted: data.interactions && data.interactions.length > 0,
            voteDate: data.lastShown || null,
            lastClosed: null,
            interactions: data.interactions || []
          };
        }
        if (!data.hasOwnProperty("lastClosed")) {
          data.lastClosed = null;
        }
        return data;
      } catch {
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
  saveStorageData(data) {
    try {
      this._window?.localStorage.setItem(this.storageKey, JSON.stringify(data));
    } catch (error) {
      console.error("Error saving data to localStorage:", error);
    }
  }
  getUserId() {
    try {
      return this._window?.localStorage.getItem("user-id") || void 0;
    } catch {
      return void 0;
    }
  }
  getStoredData() {
    try {
      return this._window?.localStorage.getItem(this.storageKey);
    } catch (error) {
      console.error("Error reading storage data:", error);
      return void 0;
    }
  }
  static \u0275fac = function UserSatisfactionService_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _UserSatisfactionService)();
  };
  static \u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _UserSatisfactionService, factory: _UserSatisfactionService.\u0275fac, providedIn: "root" });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(UserSatisfactionService, [{
    type: Injectable,
    args: [{
      providedIn: "root"
    }]
  }], null, null);
})();

// src/app/features/home/view/satisfaction-popup.component.ts
function SatisfactionPopupComponent_Conditional_6_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 3);
    \u0275\u0275text(1, "\u2764\uFE0F");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(2, "lg-title", 4);
    \u0275\u0275text(3);
    \u0275\u0275pipe(4, "translate");
    \u0275\u0275elementEnd();
    \u0275\u0275text(5);
    \u0275\u0275pipe(6, "translate");
  }
  if (rf & 2) {
    \u0275\u0275advance(2);
    \u0275\u0275property("level", 2);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind1(4, 3, "satisfaction.thank-you.title"), " ");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind1(6, 5, "satisfaction.thank-you.description"), " ");
  }
}
function SatisfactionPopupComponent_Conditional_7_Template(rf, ctx) {
  if (rf & 1) {
    const _r2 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "lg-title", 4);
    \u0275\u0275text(1);
    \u0275\u0275pipe(2, "translate");
    \u0275\u0275elementEnd();
    \u0275\u0275text(3);
    \u0275\u0275pipe(4, "translate");
    \u0275\u0275elementStart(5, "div", 5)(6, "lg-textarea", 6);
    \u0275\u0275pipe(7, "translate");
    \u0275\u0275twoWayListener("ngModelChange", function SatisfactionPopupComponent_Conditional_7_Template_lg_textarea_ngModelChange_6_listener($event) {
      \u0275\u0275restoreView(_r2);
      const ctx_r2 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r2.feedbackText, $event) || (ctx_r2.feedbackText = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "div", 7);
    \u0275\u0275text(9);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275property("level", 2);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind1(2, 8, "satisfaction.feedback-form.title"), " ");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind1(4, 10, "satisfaction.feedback-form.description"), " ");
    \u0275\u0275advance(3);
    \u0275\u0275twoWayProperty("ngModel", ctx_r2.feedbackText);
    \u0275\u0275property("maxlength", 300)("rows", 4)("placeholder", \u0275\u0275pipeBind1(7, 12, "satisfaction.feedback-form.placeholder"));
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1(" ", ctx_r2.feedbackText().length, "/300 ");
  }
}
function SatisfactionPopupComponent_Conditional_8_Template(rf, ctx) {
  if (rf & 1) {
    const _r4 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "lg-title", 4);
    \u0275\u0275text(1);
    \u0275\u0275pipe(2, "translate");
    \u0275\u0275elementEnd();
    \u0275\u0275text(3);
    \u0275\u0275pipe(4, "translate");
    \u0275\u0275elementStart(5, "div", 8)(6, "button", 9);
    \u0275\u0275listener("click", function SatisfactionPopupComponent_Conditional_8_Template_button_click_6_listener() {
      \u0275\u0275restoreView(_r4);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.onPositiveFeedback());
    });
    \u0275\u0275elementStart(7, "span", 10);
    \u0275\u0275text(8, "\u{1F60A}");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(9, "span", 11);
    \u0275\u0275text(10);
    \u0275\u0275pipe(11, "translate");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(12, "button", 12);
    \u0275\u0275listener("click", function SatisfactionPopupComponent_Conditional_8_Template_button_click_12_listener() {
      \u0275\u0275restoreView(_r4);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.onNegativeFeedback());
    });
    \u0275\u0275elementStart(13, "span", 10);
    \u0275\u0275text(14, "\u{1F61E}");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(15, "span", 11);
    \u0275\u0275text(16);
    \u0275\u0275pipe(17, "translate");
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    \u0275\u0275property("level", 2);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind1(2, 5, "satisfaction.rating.title"), " ");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind1(4, 7, "satisfaction.rating.description"), " ");
    \u0275\u0275advance(7);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(11, 9, "satisfaction.rating.positive-button"));
    \u0275\u0275advance(6);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(17, 11, "satisfaction.rating.negative-button"));
  }
}
var SatisfactionPopupComponent = class _SatisfactionPopupComponent {
  constructor() {
  }
  dialog = viewChild(DialogComponent, ...ngDevMode ? [{ debugName: "dialog" }] : []);
  showFeedbackForm = signal(false, ...ngDevMode ? [{ debugName: "showFeedbackForm" }] : []);
  showThankYou = signal(false, ...ngDevMode ? [{ debugName: "showThankYou" }] : []);
  feedbackText = signal("", ...ngDevMode ? [{ debugName: "feedbackText" }] : []);
  isSubmitting = signal(false, ...ngDevMode ? [{ debugName: "isSubmitting" }] : []);
  satisfactionService = inject(UserSatisfactionService);
  notificationsService = inject(NotificationsService);
  translateService = inject(TranslateService);
  async ngOnInit() {
    this.satisfactionService.initialize({
      googleSheets: {
        appsScriptUrl: environment.googleSheets.appsScriptUrl
      }
    });
    setTimeout(() => {
      const should = !!this.satisfactionService.checkAndShowPopup();
      if (should) {
        this.open();
      }
    }, 2e3);
  }
  open() {
    this.dialog()?.open();
  }
  closeWithRecord() {
    try {
      this.satisfactionService.recordPopupClosed();
      this.dialog()?.close();
    } catch (error) {
      this.notificationsService.error(errorHandler(error));
    }
  }
  onPositiveFeedback() {
    try {
      this.showThankYou.set(true);
      this.satisfactionService.handlePositiveFeedback();
      setTimeout(() => {
        this.closeInternal();
      }, 2e3);
    } catch (error) {
      this.notificationsService.error(errorHandler(error));
    }
  }
  onNegativeFeedback() {
    try {
      this.satisfactionService.handleNegativeClick();
      this.showFeedbackForm.set(true);
    } catch (error) {
      this.notificationsService.error(errorHandler(error));
    }
  }
  onBackToRating() {
    this.showFeedbackForm.set(false);
    this.feedbackText.set("");
  }
  onSubmitFeedback() {
    if (this.isSubmitting())
      return;
    const feedback = this.feedbackText().trim();
    this.isSubmitting.set(true);
    this.satisfactionService.handleNegativeFeedback(feedback).subscribe({
      next: () => {
        this.isSubmitting.set(false);
        this.showFeedbackForm.set(false);
        this.showThankYou.set(true);
        setTimeout(() => {
          this.closeInternal();
        }, 2e3);
      },
      error: (error) => {
        this.isSubmitting.set(false);
        this.notificationsService.error(errorHandler(error));
        this.closeWithRecord();
      }
    });
  }
  onDialogBackdropClick(event) {
    if (event.target.classList.contains("dialog")) {
      this.closeWithRecord();
    }
  }
  closeInternal() {
    try {
      this.dialog()?.close();
      this.resetForm();
    } catch (error) {
      this.notificationsService.error(errorHandler(error));
    }
  }
  resetForm() {
    this.showFeedbackForm.set(false);
    this.showThankYou.set(false);
    this.feedbackText.set("");
    this.isSubmitting.set(false);
  }
  static \u0275fac = function SatisfactionPopupComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _SatisfactionPopupComponent)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _SatisfactionPopupComponent, selectors: [["lg-satisfaction-popup"]], viewQuery: function SatisfactionPopupComponent_Query(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275viewQuerySignal(ctx.dialog, DialogComponent, 5);
    }
    if (rf & 2) {
      \u0275\u0275queryAdvance();
    }
  }, decls: 9, vars: 12, consts: [["dialog", ""], [3, "click", "onCancel", "onConfirm", "cancelButtonText", "closeButton", "closeOnConfirm", "confirmButtonText", "displayFooter"], ["position", "center", "size", "medium"], [1, "satisfaction-content__heart"], [3, "level"], ["lgExpand", "", 1, "satisfaction-content__form"], [3, "ngModelChange", "ngModel", "maxlength", "rows", "placeholder"], [1, "satisfaction-content__char-count"], [1, "satisfaction-content__buttons"], ["type", "button", 1, "satisfaction-content__button", "satisfaction-content__button--positive", 3, "click"], [1, "satisfaction-content__emoji"], [1, "satisfaction-content__button-text"], ["type", "button", 1, "satisfaction-content__button", "satisfaction-content__button--negative", 3, "click"]], template: function SatisfactionPopupComponent_Template(rf, ctx) {
    if (rf & 1) {
      const _r1 = \u0275\u0275getCurrentView();
      \u0275\u0275elementStart(0, "lg-dialog", 1, 0);
      \u0275\u0275pipe(2, "translate");
      \u0275\u0275pipe(3, "translate");
      \u0275\u0275pipe(4, "translate");
      \u0275\u0275listener("click", function SatisfactionPopupComponent_Template_lg_dialog_click_0_listener($event) {
        \u0275\u0275restoreView(_r1);
        return \u0275\u0275resetView(ctx.onDialogBackdropClick($event));
      })("onCancel", function SatisfactionPopupComponent_Template_lg_dialog_onCancel_0_listener() {
        \u0275\u0275restoreView(_r1);
        return \u0275\u0275resetView(ctx.onBackToRating());
      })("onConfirm", function SatisfactionPopupComponent_Template_lg_dialog_onConfirm_0_listener() {
        \u0275\u0275restoreView(_r1);
        return \u0275\u0275resetView(ctx.onSubmitFeedback());
      });
      \u0275\u0275elementStart(5, "lg-flex-column", 2);
      \u0275\u0275conditionalCreate(6, SatisfactionPopupComponent_Conditional_6_Template, 7, 7)(7, SatisfactionPopupComponent_Conditional_7_Template, 10, 14)(8, SatisfactionPopupComponent_Conditional_8_Template, 18, 13);
      \u0275\u0275elementEnd()();
    }
    if (rf & 2) {
      \u0275\u0275property("cancelButtonText", \u0275\u0275pipeBind1(2, 6, "satisfaction.back-button"))("closeButton", !ctx.showThankYou())("closeOnConfirm", false)("confirmButtonText", ctx.isSubmitting() ? \u0275\u0275pipeBind1(3, 8, "satisfaction.submitting") : \u0275\u0275pipeBind1(4, 10, "satisfaction.submit-button"))("displayFooter", ctx.showFeedbackForm());
      \u0275\u0275advance(6);
      \u0275\u0275conditional(ctx.showThankYou() ? 6 : ctx.showFeedbackForm() ? 7 : 8);
    }
  }, dependencies: [FormsModule, NgControlStatus, MaxLengthValidator, NgModel, DialogComponent, TitleComponent, FlexColumnComponent, ExpandDirective, TextareaComponent, TranslatePipe], styles: ["\n\n.satisfaction-content[_ngcontent-%COMP%] {\n  text-align: center;\n}\n.satisfaction-content__buttons[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 16px;\n  justify-content: center;\n  flex-wrap: wrap;\n}\n.satisfaction-content__button[_ngcontent-%COMP%] {\n  background: var(--surface-secondary-color, #f8f9fa);\n  border: 2px solid var(--border-color, #e9ecef);\n  border-radius: 12px;\n  padding: 16px 20px;\n  cursor: pointer;\n  transition: all 0.2s ease;\n  min-width: 120px;\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  gap: 8px;\n}\n.satisfaction-content__button[_ngcontent-%COMP%]:hover {\n  transform: translateY(-2px);\n  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);\n}\n.satisfaction-content__button[_ngcontent-%COMP%]:focus {\n  outline: 2px solid var(--primary-color, #007bff);\n  outline-offset: 2px;\n}\n.satisfaction-content__button--positive[_ngcontent-%COMP%]:hover {\n  border-color: var(--success-color, #28a745);\n  background-color: var(--success-light-color, #d4edda);\n}\n.satisfaction-content__button--negative[_ngcontent-%COMP%]:hover {\n  border-color: var(--warning-color, #ffc107);\n  background-color: var(--warning-light-color, #fff3cd);\n}\n.satisfaction-content__emoji[_ngcontent-%COMP%] {\n  font-size: 32px;\n  line-height: 1;\n}\n.satisfaction-content__button-text[_ngcontent-%COMP%] {\n  font-size: 14px;\n  font-weight: 500;\n  color: var(--text-primary-color, #333333);\n}\n.satisfaction-content__form[_ngcontent-%COMP%] {\n  text-align: left;\n}\n.satisfaction-content__textarea[_ngcontent-%COMP%] {\n  width: 100%;\n  padding: 12px;\n  border: 2px solid var(--border-color, #e9ecef);\n  border-radius: 8px;\n  font-size: 14px;\n  font-family: inherit;\n  resize: vertical;\n  min-height: 100px;\n  transition: border-color 0.2s ease;\n  box-sizing: border-box;\n}\n.satisfaction-content__textarea[_ngcontent-%COMP%]:focus {\n  outline: none;\n  border-color: var(--primary-color, #007bff);\n}\n.satisfaction-content__textarea[_ngcontent-%COMP%]::placeholder {\n  color: var(--text-tertiary-color, #999999);\n}\n.satisfaction-content__char-count[_ngcontent-%COMP%] {\n  text-align: right;\n  font-size: 12px;\n  color: var(--text-tertiary-color, #999999);\n  margin-top: 4px;\n}\n.satisfaction-content__thank-you[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  gap: 16px;\n  padding: 20px 0;\n}\n.satisfaction-content__heart[_ngcontent-%COMP%] {\n  font-size: 48px;\n  line-height: 48px;\n  animation: _ngcontent-%COMP%_heartBeat 1.5s ease-in-out infinite;\n}\n@keyframes _ngcontent-%COMP%_heartBeat {\n  0% {\n    transform: scale(1);\n  }\n  14% {\n    transform: scale(1.1);\n  }\n  28% {\n    transform: scale(1);\n  }\n  42% {\n    transform: scale(1.1);\n  }\n  70% {\n    transform: scale(1);\n  }\n}\n@media (max-width: 480px) {\n  .satisfaction-content__buttons[_ngcontent-%COMP%] {\n    gap: 12px;\n  }\n  .satisfaction-content__button[_ngcontent-%COMP%] {\n    min-width: 100px;\n    padding: 14px 16px;\n  }\n  .satisfaction-content__emoji[_ngcontent-%COMP%] {\n    font-size: 28px;\n  }\n  .satisfaction-content__button-text[_ngcontent-%COMP%] {\n    font-size: 13px;\n  }\n}\n/*# sourceMappingURL=satisfaction-popup.component.css.map */"] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(SatisfactionPopupComponent, [{
    type: Component,
    args: [{ selector: "lg-satisfaction-popup", standalone: true, imports: [FormsModule, DialogComponent, TranslatePipe, TitleComponent, FlexColumnComponent, ExpandDirective, TextareaComponent], template: `
    <lg-dialog #dialog
               (click)="onDialogBackdropClick($event)"
               (onCancel)="onBackToRating()"
               (onConfirm)="onSubmitFeedback()"
               [cancelButtonText]="'satisfaction.back-button' | translate"
               [closeButton]="!showThankYou()"
               [closeOnConfirm]="false"
               [confirmButtonText]="isSubmitting() ? ('satisfaction.submitting' | translate) : ('satisfaction.submit-button' | translate)"
               [displayFooter]="showFeedbackForm()">
      <lg-flex-column position="center"
                      size="medium">
        @if (showThankYou()) {
          <span class="satisfaction-content__heart">\u2764\uFE0F</span>

          <lg-title [level]="2">
            {{ 'satisfaction.thank-you.title' | translate }}
          </lg-title>

          {{ 'satisfaction.thank-you.description' | translate }}
        } @else if (showFeedbackForm()) {
          <lg-title [level]="2">
            {{ 'satisfaction.feedback-form.title' | translate }}
          </lg-title>

          {{ 'satisfaction.feedback-form.description' | translate }}

          <div class="satisfaction-content__form" lgExpand>
            <lg-textarea [(ngModel)]="feedbackText"
                         [maxlength]="300"
                         [rows]="4"
                         [placeholder]="'satisfaction.feedback-form.placeholder' | translate"></lg-textarea>

            <div class="satisfaction-content__char-count">
              {{ feedbackText().length }}/300
            </div>
          </div>
        } @else {
          <lg-title [level]="2">
            {{ 'satisfaction.rating.title' | translate }}
          </lg-title>

          {{ 'satisfaction.rating.description' | translate }}

          <div class="satisfaction-content__buttons">
            <button type="button"
                    class="satisfaction-content__button satisfaction-content__button--positive"
                    (click)="onPositiveFeedback()">
              <span class="satisfaction-content__emoji">\u{1F60A}</span>
              <span
                class="satisfaction-content__button-text">{{ 'satisfaction.rating.positive-button' | translate }}</span>
            </button>

            <button type="button"
                    class="satisfaction-content__button satisfaction-content__button--negative"
                    (click)="onNegativeFeedback()">
              <span class="satisfaction-content__emoji">\u{1F61E}</span>
              <span
                class="satisfaction-content__button-text">{{ 'satisfaction.rating.negative-button' | translate }}</span>
            </button>
          </div>
        }
      </lg-flex-column>
    </lg-dialog>
  `, styles: ["/* angular:styles/component:scss;155ae9681d39903f2e8f2607a4beea96f45431c824cab904345798ce51332f05;/Users/khripunovpavel/Documents/my/lasagna/lasagna/src/app/features/home/view/satisfaction-popup.component.ts */\n.satisfaction-content {\n  text-align: center;\n}\n.satisfaction-content__buttons {\n  display: flex;\n  gap: 16px;\n  justify-content: center;\n  flex-wrap: wrap;\n}\n.satisfaction-content__button {\n  background: var(--surface-secondary-color, #f8f9fa);\n  border: 2px solid var(--border-color, #e9ecef);\n  border-radius: 12px;\n  padding: 16px 20px;\n  cursor: pointer;\n  transition: all 0.2s ease;\n  min-width: 120px;\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  gap: 8px;\n}\n.satisfaction-content__button:hover {\n  transform: translateY(-2px);\n  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);\n}\n.satisfaction-content__button:focus {\n  outline: 2px solid var(--primary-color, #007bff);\n  outline-offset: 2px;\n}\n.satisfaction-content__button--positive:hover {\n  border-color: var(--success-color, #28a745);\n  background-color: var(--success-light-color, #d4edda);\n}\n.satisfaction-content__button--negative:hover {\n  border-color: var(--warning-color, #ffc107);\n  background-color: var(--warning-light-color, #fff3cd);\n}\n.satisfaction-content__emoji {\n  font-size: 32px;\n  line-height: 1;\n}\n.satisfaction-content__button-text {\n  font-size: 14px;\n  font-weight: 500;\n  color: var(--text-primary-color, #333333);\n}\n.satisfaction-content__form {\n  text-align: left;\n}\n.satisfaction-content__textarea {\n  width: 100%;\n  padding: 12px;\n  border: 2px solid var(--border-color, #e9ecef);\n  border-radius: 8px;\n  font-size: 14px;\n  font-family: inherit;\n  resize: vertical;\n  min-height: 100px;\n  transition: border-color 0.2s ease;\n  box-sizing: border-box;\n}\n.satisfaction-content__textarea:focus {\n  outline: none;\n  border-color: var(--primary-color, #007bff);\n}\n.satisfaction-content__textarea::placeholder {\n  color: var(--text-tertiary-color, #999999);\n}\n.satisfaction-content__char-count {\n  text-align: right;\n  font-size: 12px;\n  color: var(--text-tertiary-color, #999999);\n  margin-top: 4px;\n}\n.satisfaction-content__thank-you {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  gap: 16px;\n  padding: 20px 0;\n}\n.satisfaction-content__heart {\n  font-size: 48px;\n  line-height: 48px;\n  animation: heartBeat 1.5s ease-in-out infinite;\n}\n@keyframes heartBeat {\n  0% {\n    transform: scale(1);\n  }\n  14% {\n    transform: scale(1.1);\n  }\n  28% {\n    transform: scale(1);\n  }\n  42% {\n    transform: scale(1.1);\n  }\n  70% {\n    transform: scale(1);\n  }\n}\n@media (max-width: 480px) {\n  .satisfaction-content__buttons {\n    gap: 12px;\n  }\n  .satisfaction-content__button {\n    min-width: 100px;\n    padding: 14px 16px;\n  }\n  .satisfaction-content__emoji {\n    font-size: 28px;\n  }\n  .satisfaction-content__button-text {\n    font-size: 13px;\n  }\n}\n/*# sourceMappingURL=satisfaction-popup.component.css.map */\n"] }]
  }], () => [], { dialog: [{ type: ViewChild, args: [forwardRef(() => DialogComponent), { isSignal: true }] }] });
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(SatisfactionPopupComponent, { className: "SatisfactionPopupComponent", filePath: "src/app/features/home/view/satisfaction-popup.component.ts", lineNumber: 228 });
})();
export {
  SatisfactionPopupComponent
};
//# sourceMappingURL=chunk-OALQXT6A.js.map
