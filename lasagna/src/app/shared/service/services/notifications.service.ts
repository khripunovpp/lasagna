import {Injectable} from '@angular/core';
import {HotToastService, ToastOptions} from '@ngxpert/hot-toast';
import {FormArray, FormGroup} from '@angular/forms';
import {LogLevel} from '../../../features/settings/service/models/LogEntry';
import {LogCenterService} from '../../../features/settings/service/services/log-center.service';
import {TranslateService} from '@ngx-translate/core';

@Injectable({
  providedIn: 'root'
})
export class NotificationsService {
  constructor(
    private _toast: HotToastService,
    private _logCenter: LogCenterService,
    private _translate: TranslateService
  ) {
  }

  private _options: ToastOptions<any> = {
    duration: 5000,
    position: 'top-right' as const,
    dismissible: true,
  };

  success(message: string, logToCenter: boolean = false, source?: string) {
    this._toast.success(this._withTranslation(message), this._options);
    if (logToCenter) {
      this._logCenter.addLog(LogLevel.SUCCESS, this._withTranslation(message), undefined, source);
    }
  }

  error(message: string, logToCenter: boolean = true, source?: string) {
    this._toast.error(this._withTranslation(message), this._options);
    if (logToCenter) {
      this._logCenter.addLog(LogLevel.ERROR, this._withTranslation(message), undefined, source);
    }
  }

  warning(message: string, logToCenter: boolean = true, source?: string) {
    this._toast.warning(this._withTranslation(message), this._options);
    if (logToCenter) {
      this._logCenter.addLog(LogLevel.WARNING, this._withTranslation(message), undefined, source);
    }
  }

  info(message: string, logToCenter: boolean = false, source?: string) {
    this._toast.info(this._withTranslation(message), this._options);
    if (logToCenter) {
      this._logCenter.addLog(LogLevel.INFO, this._withTranslation(message), undefined, source);
    }
  }

  show(message: string, logToCenter: boolean = false, source?: string) {
    this._toast.show(this._withTranslation(message), this._options);
    if (logToCenter) {
      this._logCenter.addLog(LogLevel.INFO, this._withTranslation(message), undefined, source);
    }
  }

  loading(message: string) {
    return this._toast.loading(this._withTranslation(message), this._options);
  }

  showJsonErrors(
    errors: unknown[],
    title: string = 'Errors',
    logToCenter: boolean = true,
    source?: string
  ) {
    const errorMessages = errors.map((error) => {
      if (typeof error === 'string') {
        return this._withTranslation(error);
      } else if (typeof error === 'object' && error !== null) {
        return JSON.stringify(error, null, 2);
      }
      return String(error);
    });

    const fullMessage = errorMessages.join('\n');
    this._toast.error(fullMessage, {
      duration: 10000,
      style: {
        whiteSpace: 'pre-wrap',
        maxHeight: '300px',
        overflowY: 'auto',
      },
    });

    if (logToCenter) {
      this._logCenter.addLog(LogLevel.ERROR, `${title}: ${fullMessage}`, errors, source);
    }
  }

  parseFormErrors(
    control: FormGroup | FormArray,
    logToCenter: boolean = true,
    source?: string
  ): string[] {
    const errors = [];
    if (control.errors) {
      errors.push(...Object.entries(control.errors).map(([key, value]) => {
        return `Form: ${key}`;
      }));
    }
    for (const controlKey in control.controls) {
      const childControl = (control.controls as any)[controlKey];
      if (childControl instanceof FormGroup || childControl instanceof FormArray) {
        errors.push(...this.parseFormErrors(childControl as any));
      }
      if (childControl.errors) {
        errors.push(...Object.entries(childControl.errors).map(([key, value]) => {
          return `${controlKey}: ${key}`;
        }));
      }
    }

    if (logToCenter && errors.length > 0) {
      this._logCenter.addLog(LogLevel.ERROR, `Form validation errors: ${errors.join(', ')}`, errors, source);
    }

    return errors;
  }

  private _withTranslation(message: string): string {
    return this._translate.instant(message);
  }
}
