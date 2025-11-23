import {inject, Injectable} from '@angular/core';
import {WINDOW} from '../tokens/window.token';

@Injectable({
  providedIn: 'root'
})
export class UsingHistoryService {

  constructor() {
  }

  private readonly _window = inject(WINDOW);

  read(
    prefix: string
  ): {
    top: Record<string, {
      updatedAt: number
      count: number
    }>;
    recent: Record<string, {
      updatedAt: number
      count: number
    }>;
  } {
    try {
      const topValue = JSON.parse(this._window?.localStorage.getItem(prefix + '_top') || '{}');
      const recentValue = JSON.parse(this._window?.localStorage.getItem(prefix + '_recent') || '{}');
      return {
        top: topValue,
        recent: recentValue
      };
    } catch (e) {
      console.error('Error reading from localStorage:', e);
      return {
        top: {},
        recent: {}
      };
    }
  }

  count(
    prefix: string,
    objectKey: string
  ) {
    try {

      if (!objectKey) return;

      const key = prefix + '_history';
      const recentKey = prefix + '_recent';
      const topKey = prefix + '_top';

      let sources: Record<string, {
        count: number;
        updatedAt: number
      }> = JSON.parse(this._window?.localStorage.getItem(key) || '{}');

      const now = Date.now();
      const oneMonthAgo = now - 30 * 24 * 60 * 60 * 1000; // 30 дней в миллисекундах

      // Обновляем или добавляем категорию
      sources[objectKey] = {
        count: (sources[objectKey]?.count || 0) + 1,
        updatedAt: now
      };

      // Фильтруем записи старше 30 дней
      let filteredSources = Object.entries(sources)
        .filter(([_, data]) => data.updatedAt >= oneMonthAgo);

      // Сортируем для разных списков:
      // 1️⃣ Самые свежие (по дате обновления)
      const recentSources = filteredSources
        .sort((a, b) => b[1].updatedAt - a[1].updatedAt)
        .slice(0, 5);

      // 2️⃣ Самые популярные (по количеству использований, затем по свежести)
      const topSources = filteredSources
        .sort((a, b) => b[1].count - a[1].count || b[1].updatedAt - a[1].updatedAt)
        .slice(0, 5);

      // Преобразуем обратно в объект и сохраняем
      this._window?.localStorage.setItem(key, JSON.stringify(Object.fromEntries(filteredSources)));
      this._window?.localStorage.setItem(recentKey, JSON.stringify(Object.fromEntries(recentSources)));
      this._window?.localStorage.setItem(topKey, JSON.stringify(Object.fromEntries(topSources)));
    } catch (e) {
      console.error('Error updating localStorage:', e);
      return;
    }
  }
}
