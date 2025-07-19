import {Injectable} from '@angular/core';
import {HotToastService} from '@ngxpert/hot-toast';
import {FormArray, FormGroup} from '@angular/forms';
import {LogLevel} from '../../../features/settings/service/models/LogEntry';
import {LogCenterService} from '../../../features/settings/service/services/log-center.service';

@Injectable({
  providedIn: 'root'
})
export class NotificationsService {
  constructor(
    private _toast: HotToastService,
    private _logCenter: LogCenterService
  ) {
  }

  success(message: string, logToCenter: boolean = false, source?: string) {
    this._toast.success(message);
    if (logToCenter) {
      this._logCenter.addLog(LogLevel.SUCCESS, message, undefined, source);
    }
  }

  error(message: string, logToCenter: boolean = true, source?: string) {
    this._toast.error(message);
    if (logToCenter) {
      this._logCenter.addLog(LogLevel.ERROR, message, undefined, source);
    }
  }

  warning(message: string, logToCenter: boolean = true, source?: string) {
    this._toast.warning(message);
    if (logToCenter) {
      this._logCenter.addLog(LogLevel.WARNING, message, undefined, source);
    }
  }

  info(message: string, logToCenter: boolean = false, source?: string) {
    this._toast.info(message);
    if (logToCenter) {
      this._logCenter.addLog(LogLevel.INFO, message, undefined, source);
    }
  }

  show(message: string, logToCenter: boolean = false, source?: string) {
    this._toast.show(message);
    if (logToCenter) {
      this._logCenter.addLog(LogLevel.INFO, message, undefined, source);
    }
  }

  loading(message: string) {
    return this._toast.loading(message);
  }

  showJsonErrors(
    errors: unknown[],
    title: string = 'Errors',
    logToCenter: boolean = true,
    source?: string
  ) {
    const errorMessages = errors.map((error) => {
      if (typeof error === 'string') {
        return error;
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

  // Методы для прямого логирования в лог-центр
  logInfo(message: string, data?: any, source?: string) {
    this._logCenter.addLog(LogLevel.INFO, message, data, source);
  }

  logWarning(message: string, data?: any, source?: string) {
    this._logCenter.addLog(LogLevel.WARNING, message, data, source);
  }

  logError(message: string, data?: any, source?: string) {
    this._logCenter.addLog(LogLevel.ERROR, message, data, source);
  }

  logSuccess(message: string, data?: any, source?: string) {
    this._logCenter.addLog(LogLevel.SUCCESS, message, data, source);
  }
}
