import {HttpErrorResponse} from '@angular/common/http';

import {ZodError, ZodIssue} from "zod";

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

export const parseZodError = (error?: ZodError): string => {
  if (!error) {
    return 'Unknown validation error';
  }
  return error.errors.map((issue: ZodIssue) => {
    const path = issue.path.length > 0 ? issue.path.join(" → ") : "root";
    return `${path}: ${issue.message}`;
  }).join('\n');
}

export const errorIs404 = (error: unknown): boolean => {
  if (error instanceof HttpErrorResponse) {
    return error.status === 404;
  }
  return false;
}
