import {Injectable, signal} from '@angular/core';

@Injectable()
export class ConfirmationService {
  readonly settings = signal<{
    onSuccess: () => void
    onCancel?: () => void
    message?: string
    confirmText?: string
    cancelText?: string
  } | null>(null);

  configure({
              onSuccess,
              onCancel,
              message,
              confirmText ,
              cancelText,
            }: {
    onSuccess: () => void | Promise<void>,
    onCancel?: () => void | Promise<void>,
    message?: string,
    confirmText?: string,
    cancelText?: string,
  }) {
    this.settings.set({onSuccess, onCancel, message, confirmText, cancelText});
  }
}
