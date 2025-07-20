import {HttpErrorResponse} from '@angular/common/http';

export const errorHandler = (error: unknown): string => {
  if (error instanceof Error) {
    return error.message;
  }
  if (error instanceof HttpErrorResponse) {
    return error.message;
  }
  if (typeof error === 'string') {
    return error;
  }
  if (typeof error === 'object' && error !== null) {
    return JSON.stringify(error);
  }
  return 'Unknown error';
}

export const errorIs404 = (error: unknown): boolean => {
  if (error instanceof HttpErrorResponse) {
    return error.status === 404;
  }
  return false;
}
