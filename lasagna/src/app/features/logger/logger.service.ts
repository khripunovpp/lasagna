// logger.service.ts
import {Inject, Injectable, isDevMode, Optional} from '@angular/core';
import {DISABLE_LOGGER, LOGGER_CONTEXT, LoggerContext} from './logger-context.provider';


@Injectable()
export class LoggerService {
  constructor(
    @Optional() @Inject(DISABLE_LOGGER) private disableLogger: boolean,
    @Optional() @Inject(LOGGER_CONTEXT) private context: LoggerContext
  ) {
    this._enabled = this.disableLogger !== true && isDevMode() && (this.context?.enabled !== false);
  }

  private _enabled: boolean;

  log(msg: any, ...args: any[]) {
    this._print('log', msg, ...args);
  }

  info(msg: any, ...args: any[]) {
    this._print('info', msg, ...args);
  }

  warn(msg: any, ...args: any[]) {
    this._print('warn', msg, ...args);
  }

  error(msg: any, ...args: any[]) {
    this._print('error', msg, ...args);
  }

  withContext(
    context: Partial<LoggerContext>
  ): LoggerService {
    const newContext: LoggerContext = {
      ...this.context,
      ...context,
    };
    return new LoggerService(this.disableLogger, newContext);
  }

  private _print(
    level: 'log' | 'info' | 'warn' | 'error',
    message: any,
    ...args: any[]
  ) {
    if (!this._enabled) return;

    const label = this.context?.label ?? 'Logger';
    const color = this.context?.color ?? '#3498db';
    const style = `color: ${color}; font-weight: bold;`;

    console[level](`%c[${label}]`, style, message, args.length ? ' - ' : '', ...args);
  }
}
