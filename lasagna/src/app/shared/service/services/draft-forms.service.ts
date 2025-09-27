import {Injectable} from '@angular/core';
import {generateUuid} from '../../helpers/attribute.helper';

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

  getDraftForms = <T extends Record<string, any>>(store: string): Record<string, DraftForm<T>> | null => {
    const draftForm = localStorage.getItem(store);
    if (!draftForm) {
      return null;
    }
    return JSON.parse(draftForm);
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

    localStorage.setItem(store, JSON.stringify(valueToStore));

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


    localStorage.setItem(store, JSON.stringify(valueToStore));
  }

  removeDraftForm = async (
    store: string,
    key?: string | string[]
  ) => {
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
      localStorage.removeItem(store);
      return;
    }

    localStorage.setItem(store, JSON.stringify(draftForm));
  }
}
