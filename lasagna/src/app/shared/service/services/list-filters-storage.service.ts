import {inject, Injectable} from '@angular/core';
import {WINDOW} from '../tokens/window.token';

export interface StoredListFilters {
  field?: string;
  value?: string;
}

@Injectable({providedIn: 'root'})
export class ListFiltersStorageService {
  private readonly _window = inject(WINDOW);
  private readonly prefix = 'list-filters:';

  /**
   * Returns null when the user never touched the filters, and an object
   * (possibly empty) once a choice was made — including "show all".
   */
  read(scope: string): StoredListFilters | null {
    try {
      const raw = this._window?.localStorage.getItem(this.prefix + scope);
      if (!raw) return null;
      const parsed = JSON.parse(raw);
      if (!parsed || typeof parsed !== 'object') return null;
      const field = typeof parsed.field === 'string' && parsed.field ? parsed.field : undefined;
      const value = typeof parsed.value === 'string' && parsed.value ? parsed.value : undefined;
      return {field, value};
    } catch {
      return null;
    }
  }

  write(scope: string, value: StoredListFilters): void {
    try {
      this._window?.localStorage.setItem(this.prefix + scope, JSON.stringify({
        field: value.field ?? null,
        value: value.value ?? null,
      }));
    } catch {
      // localStorage unavailable / quota — silently ignore
    }
  }
}
