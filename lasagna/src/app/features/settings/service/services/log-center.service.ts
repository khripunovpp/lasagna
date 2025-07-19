import {Injectable} from '@angular/core';
import {LogEntry, LogEntryModel, LogLevel} from '../models/LogEntry';

@Injectable({
  providedIn: 'root'
})
export class LogCenterService {
  private readonly STORAGE_KEY = 'app_logs';
  private readonly MAX_LOGS = 1000; // Максимальное количество логов для хранения

  constructor() {}

  /**
   * Добавляет новую запись в лог
   */
  addLog(level: LogLevel, message: string, data?: any, source?: string): void {
    const logEntry = new LogEntryModel(level, message, data, source, this.getCurrentUrl());
    const logs = this.getLogs();

    logs.unshift(logEntry); // Добавляем в начало

    // Ограничиваем количество логов
    if (logs.length > this.MAX_LOGS) {
      logs.splice(this.MAX_LOGS);
    }

    this.saveLogs(logs);
  }

  /**
   * Получает все логи
   */
  getLogs(): LogEntryModel[] {
    try {
      const stored = localStorage.getItem(this.STORAGE_KEY);
      if (!stored) return [];

      const logs = JSON.parse(stored);
      return logs.map((log: LogEntry) => LogEntryModel.fromJSON(log));
    } catch (error) {
      console.error('Error loading logs:', error);
      return [];
    }
  }

  /**
   * Получает логи по уровню
   */
  getLogsByLevel(level: LogLevel): LogEntryModel[] {
    return this.getLogs().filter(log => log.level === level);
  }

  /**
   * Получает логи за последние N дней
   */
  getLogsByDays(days: number): LogEntryModel[] {
    const cutoffDate = new Date();
    cutoffDate.setDate(cutoffDate.getDate() - days);

    return this.getLogs().filter(log => log.timestamp >= cutoffDate);
  }

  /**
   * Получает логи по источнику
   */
  getLogsBySource(source: string): LogEntryModel[] {
    return this.getLogs().filter(log => log.source === source);
  }

  /**
   * Очищает все логи
   */
  clearLogs(): void {
    localStorage.removeItem(this.STORAGE_KEY);
  }

  /**
   * Очищает логи старше N дней
   */
  clearOldLogs(days: number): void {
    const cutoffDate = new Date();
    cutoffDate.setDate(cutoffDate.getDate() - days);

    const logs = this.getLogs().filter(log => log.timestamp >= cutoffDate);
    this.saveLogs(logs);
  }

  /**
   * Удаляет конкретную запись лога
   */
  removeLog(logId: string): void {
    const logs = this.getLogs().filter(log => log.id !== logId);
    this.saveLogs(logs);
  }

  /**
   * Экспортирует логи в JSON
   */
  exportLogs(): string {
    return JSON.stringify(this.getLogs().map(log => log.toJSON()), null, 2);
  }

  /**
   * Импортирует логи из JSON
   */
  importLogs(jsonData: string): void {
    try {
      const logs = JSON.parse(jsonData);
      const logModels = logs.map((log: LogEntry) => LogEntryModel.fromJSON(log));
      this.saveLogs(logModels);
    } catch (error) {
      console.error('Error importing logs:', error);
      throw new Error('Invalid log data format');
    }
  }

  /**
   * Получает статистику логов
   */
  getLogStats(): { total: number; byLevel: Record<LogLevel, number> } {
    const logs = this.getLogs();
    const byLevel: Record<LogLevel, number> = {
      [LogLevel.INFO]: 0,
      [LogLevel.WARNING]: 0,
      [LogLevel.ERROR]: 0,
      [LogLevel.SUCCESS]: 0
    };

    logs.forEach(log => {
      byLevel[log.level]++;
    });

    return {
      total: logs.length,
      byLevel
    };
  }

  private getCurrentUrl(): string {
    return window.location.href;
  }

  private saveLogs(logs: LogEntryModel[]): void {
    try {
      const jsonData = logs.map(log => log.toJSON());
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(jsonData));
    } catch (error) {
      console.error('Error saving logs:', error);
    }
  }
}
