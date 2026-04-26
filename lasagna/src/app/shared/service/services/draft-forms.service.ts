import {inject, Injectable} from '@angular/core';
import {generateUuid} from '../../helpers/attribute.helper';
import {WINDOW} from '../tokens/window.token';
import {errorHandler} from '../../helpers';
import {NotificationsService} from './notifications.service';
import {SettingsService} from '../../../features/settings/service/services/settings.service';

// ключами временных форм будут timestamp

export interface DraftForm<T extends Record<string, any>> {
  createdAt: number
  updatedAt?: number
  data: DraftFormData<T>
  mode: 'edit' | 'add'
  meta: Record<any, any>
  uuid: string
  // Marked when the user first sees the draft past TTL.
  // Actual deletion happens 24h after this moment, not after TTL.
  graceStartedAt?: number
}

export type DraftFormData<T extends Record<string, any>> = T

export const DRAFT_GRACE_MS = 24 * 60 * 60 * 1000;
export const DAY_MS = 24 * 60 * 60 * 1000;

export type DraftLifecycleStatus = 'ok' | 'expiring' | 'grace' | 'expired';

export interface DraftLifecycle {
  status: DraftLifecycleStatus;
  remainingMs: number;
}

export const getDraftLifecycle = <T extends Record<string, any>>(
  draft: DraftForm<T>,
  ttlDays: number,
  now: number = Date.now(),
): DraftLifecycle => {
  const base = draft.updatedAt ?? draft.createdAt;
  const ttlMs = ttlDays * DAY_MS;
  const expiresAt = base + ttlMs;

  if (now < expiresAt) {
    const warnFrom = expiresAt - Math.floor(ttlMs / 3);
    if (now < warnFrom) {
      return {status: 'ok', remainingMs: expiresAt - now};
    }
    return {status: 'expiring', remainingMs: expiresAt - now};
  }

  // TTL expired — grace runs from the moment the user first sees the expired draft.
  if (!draft.graceStartedAt) {
    return {status: 'grace', remainingMs: DRAFT_GRACE_MS};
  }
  const graceEnd = draft.graceStartedAt + DRAFT_GRACE_MS;
  if (now < graceEnd) {
    return {status: 'grace', remainingMs: graceEnd - now};
  }
  return {status: 'expired', remainingMs: 0};
};

@Injectable({
  providedIn: 'root'
})
export class DraftFormsService {
  constructor() {
  }

  private readonly _window = inject(WINDOW);
  private readonly _notificationsService = inject(NotificationsService);
  private readonly _settingsService = inject(SettingsService);

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
    if (!this._settingsService.getDraftsSettings().enabled) {
      return undefined;
    }
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
    if (!this._settingsService.getDraftsSettings().enabled) {
      return;
    }
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
      // Any user edit clears the grace mark — it's no longer expired.
      delete (newFormValue as any).graceStartedAt;

      valueToStore![key] = newFormValue;
    }

    try {
      this._window?.localStorage.setItem(store, JSON.stringify(valueToStore));
    } catch (e) {
      this._notificationsService.error(errorHandler(e));
    }
  }

  /**
   * Loads drafts and builds {lifecycle, stale} maps for the rendered list.
   * Resolves original.updatedAt for drafts that reference an existing entity
   * (meta.uuid) and marks them stale when the original is newer.
   */
  async loadAndCategorize<T extends Record<string, any>>(
    store: string,
    ttlDays: number,
    getOriginalUpdatedAt: (uuid: string) => Promise<number | undefined>,
    now: number = Date.now(),
  ): Promise<{
    drafts: DraftForm<T>[];
    lifecycleByUuid: Map<string, DraftLifecycle>;
    staleUuids: Set<string>;
  }> {
    const drafts = this.pruneAndLoad<T>(store, ttlDays, now);
    const lifecycleByUuid = new Map<string, DraftLifecycle>();
    const staleUuids = new Set<string>();

    for (const draft of drafts) {
      lifecycleByUuid.set(draft.uuid, getDraftLifecycle(draft, ttlDays, now));
      const originalUuid = draft.meta?.['uuid'] as string | undefined;
      if (!originalUuid) continue;
      try {
        const originalUpdatedAt = await getOriginalUpdatedAt(originalUuid);
        const draftEditedAt = draft.updatedAt ?? draft.createdAt;
        if (originalUpdatedAt && originalUpdatedAt > draftEditedAt) {
          staleUuids.add(draft.uuid);
        }
      } catch {
        // ignore lookup errors — leave non-stale
      }
    }

    return {drafts, lifecycleByUuid, staleUuids};
  }

  /**
   * Reads drafts from the store, deletes those past their grace window,
   * marks newly-expired drafts with graceStartedAt (so 24h countdown begins
   * the first time the user sees them), persists the result, and returns
   * the surviving drafts.
   */
  pruneAndLoad = <T extends Record<string, any>>(
    store: string,
    ttlDays: number,
    now: number = Date.now(),
  ): DraftForm<T>[] => {
    const map = this.getDraftForms<T>(store);
    if (!map) return [];

    let mutated = false;
    const survivors: Record<string, DraftForm<T>> = {};

    for (const [key, draft] of Object.entries(map)) {
      const lc = getDraftLifecycle(draft, ttlDays, now);
      if (lc.status === 'expired') {
        mutated = true;
        continue;
      }
      if (lc.status === 'grace' && !draft.graceStartedAt) {
        survivors[key] = {...draft, graceStartedAt: now};
        mutated = true;
      } else {
        survivors[key] = draft;
      }
    }

    if (mutated) {
      try {
        if (Object.keys(survivors).length === 0) {
          this._window?.localStorage.removeItem(store);
        } else {
          this._window?.localStorage.setItem(store, JSON.stringify(survivors));
        }
      } catch (e) {
        this._notificationsService.error(errorHandler(e));
      }
    }

    return Object.values(survivors);
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
