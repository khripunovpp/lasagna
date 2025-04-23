import {Pipe, PipeTransform} from '@angular/core';
import {differenceInSeconds, formatDistanceToNow} from 'date-fns';

@Pipe({
  name: 'timeAgo',
  pure: false,// обновляется при изменении времени,
  standalone: true,
})
export class TimeAgoPipe implements PipeTransform {

  transform(value: any): string {
    if (!value) return 'unknown';

    const date = value instanceof Date
      ? value
      : new Date(value.seconds ? value.seconds * 1000 : value);

    return this.customFormat(date);
  }

  customFormat(date: Date): string {
    const diffInSeconds = differenceInSeconds(new Date(), date);

    if (diffInSeconds < 60) {
      return 'Just now';
    }

    return formatDistanceToNow(date, {addSuffix: true});
  }
}
