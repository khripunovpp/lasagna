import {inject, Injectable} from '@angular/core';
import {generateUuid} from '../../helpers/attribute.helper';
import {WINDOW} from '../tokens/window.token';
import {errorHandler} from '../../helpers';
import {NotificationsService} from './notifications.service';

// ключами временных форм будут timestamp

export interface DraftForm<T extends Record<string, any>> {
  createdAt: number
  updatedAt?: number
  data: DraftFormData<T>
  mode: 'edit' | 'add'
  meta: Record<any, any>
  uuid: string
}

export type DraftFormData<T extends Record<string, any>> = T

@Injectable({
  providedIn: 'root'
})
export class DraftFormsService {
  constructor() {
  }

  private readonly _window = inject(WINDOW);
  private readonly _notificationsService = inject(NotificationsService);

  getDraftForms = <T extends Record<string, any>>(store: string): Record<string, DraftForm<T>> | null => {
    try {
      const draftForm = this._window?.localStorage.getItem(store);
      if (!draftForm) {
        return null;
      }
      return JSON.parse(draftForm);
    } catch (e) {
      this._notificationsService.error(errorHandler(e));
      return null;
    }
  }

  setDraftForm = <T extends Record<string, any>>(
    store: string,
    data: DraftFormData<T>,
    mode: 'edit' | 'add',
    meta: Record<any, any> = {}
  ) => {
    const draftForm = this.getDraftForms<T>(store);

    const ts = Date.now();
    const uuid = generateUuid();
    const value = {
      uuid,
      createdAt: ts,
      data,
      mode,
      meta
    } as DraftForm<T>;

    let valueToStore = {
      ...draftForm,
      [uuid]: value,
    };

    try {
      this._window?.localStorage.setItem(store, JSON.stringify(valueToStore));
    } catch (e) {
      this._notificationsService.error(errorHandler(e));
    }

    return value;
  }

  updateDraftForm = <T extends Record<string, any>>(
    store: string,
    data: DraftFormData<T>,
    key: string,
    mode: 'edit' | 'add',
    meta: Record<any, any> = {}
  ) => {
    const draftForm = this.getDraftForms<T>(store);
    let newFormValue = {} as DraftForm<T>;
    let valueToStore = draftForm
    if (draftForm?.[key]) {
      newFormValue = {
        ...draftForm?.[key],
        updatedAt: Date.now(),
        data: {
          ...draftForm?.[key].data,
          ...data,
        },
        mode,
        meta
      };

      valueToStore![key] = newFormValue;
    }

    try {
      this._window?.localStorage.setItem(store, JSON.stringify(valueToStore));
    } catch (e) {
      this._notificationsService.error(errorHandler(e));
    }
  }

  removeDraftForm = async (
    store: string,
    key?: string | string[]
  ) => {
    try {
      const draftForm = this.getDraftForms(store);
      if (!draftForm) {
        return;
      }
      if (key) {
        if (Array.isArray(key)) {
          key.forEach((k) => {
            delete draftForm[k];
          });
        } else if (draftForm[key]) {
          delete draftForm[key];
        }
      } else {
        this._window?.localStorage.removeItem(store);
        return;
      }

      this._window?.localStorage.setItem(store, JSON.stringify(draftForm));
    } catch (e) {
      this._notificationsService.error(errorHandler(e));
    }
  }
}
