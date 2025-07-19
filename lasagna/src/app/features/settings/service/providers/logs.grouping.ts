import {SortStrategy} from '../../../../shared/service/types/sorting.types';
import {LogEntryModel} from '../models/LogEntry';

export class LogsByMinuteGroupingStrategy implements SortStrategy<LogEntryModel> {
  groupBy(item: LogEntryModel): string {
    const date = new Date(item.timestamp);

    // Группируем по минуте: YYYY-MM-DD HH:MM
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');

    return `${year}-${month}-${day} ${hours}:${minutes}`;
  }

  innerSort(
    a: LogEntryModel,
    b: LogEntryModel,
    direction: 'asc' | 'desc' = 'desc',
    field: string = 'timestamp'
  ): number {
    const dateA = new Date(a.timestamp);
    const dateB = new Date(b.timestamp);

    if (direction === 'asc') {
      return dateA.getTime() - dateB.getTime();
    } else {
      return dateB.getTime() - dateA.getTime();
    }
  }

  groupingSort(
    a: string,
    b: string,
    direction: 'asc' | 'desc' = 'desc'
  ): number {
    const dateA = new Date(a);
    const dateB = new Date(b);

    if (direction === 'asc') {
      return dateA.getTime() - dateB.getTime();
    } else {
      return dateB.getTime() - dateA.getTime();
    }
  }
}
