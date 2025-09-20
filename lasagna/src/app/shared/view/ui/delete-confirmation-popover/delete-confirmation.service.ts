import {Injectable, signal} from '@angular/core';

@Injectable()
export class DeleteConfirmationService {
  readonly settings = signal<{
    onSuccess: () => void
    onCancel?: () => void
    message?: string
    confirmText?: string
    cancelText?: string
    withLock?: boolean
  } | null>(null);

  configure({
              onSuccess,
              onCancel,
              message,
              confirmText ,
              cancelText,
    withLock,
            }: {
    onSuccess: () => void | Promise<void>,
    onCancel?: () => void | Promise<void>,
    message?: string,
    confirmText?: string,
    cancelText?: string,
    withLock?: boolean
  }) {
    this.settings.set({onSuccess, onCancel, message, confirmText, cancelText,withLock});
  }
}
