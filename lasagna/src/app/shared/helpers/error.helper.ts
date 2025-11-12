import {HttpErrorResponse} from '@angular/common/http';
import {ZodError, ZodIssue} from "zod";

export const errorHandler = (error: unknown): string => {
  // стандартная JS ошибка
  if (error instanceof Error) {
    return error.message;
  }

  // если строка
  if (typeof error === 'string') {
    return error;
  }

  // HTTP ошибка Angular
  if (error instanceof HttpErrorResponse) {
    const err = error.error;
    if (err?.error?.details?.errors && Array.isArray(err.error.details.errors)) {
      return err.error.details.errors
        .map((e: any) => {
          const path = e.path?.join('.') || 'unknown';
          const message = e.message || 'Unknown validation error';
          const value = e.value !== undefined ? ` (value: ${e.value})` : '';
          return errorReplacer(path, message, e.value);
        })
        .join('; ');
    }
    return err?.error?.message || error.message;
  }

  // если объект
  if (typeof error === 'object' && error !== null) {
    if ('error' in error && 'details' in (error as any).error) {
      const details = (error as any).error.details;
      if (details.errors && Array.isArray(details.errors)) {
        return details.errors
          .map((e: any) => {
            const path = e.path?.join('.') || 'unknown';
            const message = e.message || 'Unknown validation error';
            const value = e.value !== undefined ? ` (value: ${e.value})` : '';
            return errorReplacer(path, message, e.value);
          })
          .join('; ');
      }
      return (error as any).error.message || JSON.stringify(error);
    }
    return JSON.stringify(error);
  }

  return 'Unknown error';
};

export const parseZodError = (error?: ZodError): string => {
  if (!error) {
    return 'Unknown validation error';
  }
  return error.errors.map((issue: ZodIssue) => {
    const path = issue.path.length > 0 ? issue.path.join(" → ") : "root";
    return errorReplacer(path, issue.message);
  }).join('\n');
}

export const errorIs404 = (error: unknown): boolean => {
  if (error instanceof HttpErrorResponse) {
    return error.status === 404;
  }
  return false;
}

export const errorReplacer = (
  path: string,
  message: string,
  value?: any
): string => {
  let result = `${path}:`;
  if (messageIsAlreadyExists(message)) {
    result += ` Already exists, please do sync data.`;
  } else {
    result += ` ${message}`;
  }

  if (value !== undefined) {
    result += ` (value: ${value})`;
  }
  return result;
}

export const messageIsAlreadyExists = (str: string): boolean => {
  str = str.toLowerCase();
  return (/unique/i.test(str)
      || /exists/i.test(str))
    && (/uuid/i.test(str)
      || /id/i.test(str))
}
