import {Pipe, PipeTransform} from '@angular/core';
import {formatDistanceToNow} from 'date-fns';
import {ru} from 'date-fns/locale';

@Pipe({
  name: 'timeAgo',
  pure: false,// обновляется при изменении времени,
  standalone: true,
})
export class TimeAgoPipe implements PipeTransform {
  transform(value: any): string {
    if (!value) return '';

    const date = value instanceof Date ? value : new Date(value.seconds ? value.seconds * 1000 : value);

    return formatDistanceToNow(date, {addSuffix: true, locale: ru});
  }
}
