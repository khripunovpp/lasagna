import {Pipe, PipeTransform} from '@angular/core';
import {differenceInSeconds, formatDistanceToNow} from 'date-fns';
import {LanguageService} from '@service/services';
import {enUS, pt, ru} from 'date-fns/locale';
import {marker as _} from '@colsen1991/ngx-translate-extract-marker';


const localesMap: Record<string, any> = {
  en: enUS,
  ru: ru,
  pt: pt,
};

@Pipe({
  name: 'timeAgo',
  pure: false,// обновляется при изменении времени,
  standalone: true,
})
export class TimeAgoPipe
  implements PipeTransform {
  constructor(
    private _localisationService: LanguageService
  ) {
  }

  transform(value: any): string {
    if (!value) return this._localisationService.getTranslate(_('unknown'));

    const date = value instanceof Date
      ? value
      : new Date(value.seconds ? value.seconds * 1000 : value);

    return this.customFormat(date);
  }

  customFormat(date: Date): string {
    const diffInSeconds = differenceInSeconds(new Date(), date);

    if (diffInSeconds < 60) {
      return this._localisationService.getTranslate(_('just-now'));
    }

    return formatDistanceToNow(date, {
      addSuffix: true,
      locale: localesMap[this._localisationService.lang() || 'en'],
    });
  }
}
