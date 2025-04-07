import {Injectable} from '@angular/core';
import {HotToastService} from '@ngxpert/hot-toast';
import {FormArray, FormGroup} from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class NotificationsService {
  constructor(
    private _toast: HotToastService
  ) {
  }

  success(message: string) {
    this._toast.success(message);
  }

  error(message: string) {
    this._toast.error(message);
  }

  warning(message: string) {
    this._toast.warning(message);
  }

  info(message: string) {
    this._toast.info(message);
  }

  show(message: string) {
    this._toast.show(message);
  }

  loading(message: string) {
    this._toast.loading(message);
  }

  parseFormErrors(
    control: FormGroup | FormArray
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
    return errors;
  }

}
