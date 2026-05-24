import {inject, Injectable} from '@angular/core';
import {WINDOW} from '../tokens/window.token';

export interface StoredGroupingSorting {
  field: string;
  direction: 'asc' | 'desc';
  group: string;
}

@Injectable({providedIn: 'root'})
export class GroupingSortingStorageService {
  private readonly _window = inject(WINDOW);
  private readonly prefix = 'grouping-sorting:';

  read(scope: string): StoredGroupingSorting | null {
    try {
      const raw = this._window?.localStorage.getItem(this.prefix + scope);
      if (!raw) return null;
      const parsed = JSON.parse(raw);
      if (!parsed || typeof parsed !== 'object') return null;
      const direction = parsed.direction === 'asc' || parsed.direction === 'desc' ? parsed.direction : null;
      const field = typeof parsed.field === 'string' && parsed.field ? parsed.field : null;
      const group = typeof parsed.group === 'string' && parsed.group ? parsed.group : null;
      if (!field || !direction || !group) return null;
      return {field, direction, group};
    } catch {
      return null;
    }
  }

  write(scope: string, value: StoredGroupingSorting): void {
    try {
      this._window?.localStorage.setItem(this.prefix + scope, JSON.stringify(value));
    } catch {
      // localStorage unavailable / quota — silently ignore
    }
  }
}
