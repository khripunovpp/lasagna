import {Injectable, signal} from '@angular/core';

@Injectable()
export class ConfirmationService {
  readonly settings = signal<{
    onSuccess: () => void
    onCancel?: () => void
    message?: string
    extraAction?: { label: string; handler: () => void }
    confirmText?: string
    cancelText?: string
  } | null>(null);

  configure({
              onSuccess,
              onCancel,
              message,
              extraAction,
              confirmText ,
              cancelText,
            }: {
    onSuccess: () => void | Promise<void>,
    onCancel?: () => void | Promise<void>,
    message?: string,
    extraAction?: { label: string; handler: () => void },
    confirmText?: string,
    cancelText?: string,
  }) {
    this.settings.set({onSuccess, onCancel, message, extraAction, confirmText, cancelText});
  }
}
