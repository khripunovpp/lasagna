import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UsingHistoryService {

  constructor() {
  }

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
      const topValue = JSON.parse(localStorage.getItem(prefix + '_top') || '{}');
      const recentValue = JSON.parse(localStorage.getItem(prefix + '_recent') || '{}');
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
    if (!objectKey) return;

    const key = prefix + '_history';
    const recentKey = prefix + '_recent';
    const topKey = prefix + '_top';

    let sources: Record<string, {
      count: number;
      updatedAt: number
    }> = JSON.parse(localStorage.getItem(key) || '{}');

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
    localStorage.setItem(key, JSON.stringify(Object.fromEntries(filteredSources)));
    localStorage.setItem(recentKey, JSON.stringify(Object.fromEntries(recentSources)));
    localStorage.setItem(topKey, JSON.stringify(Object.fromEntries(topSources)));
  }
}
