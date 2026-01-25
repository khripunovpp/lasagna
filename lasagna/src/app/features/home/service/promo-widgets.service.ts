import {Injectable, signal} from '@angular/core';

export enum PromoWidget {
  tgBot = 'tgBot'
}

@Injectable({
  providedIn: 'root'
})
export class PromoWidgetsService {
  constructor() {
  }

  readonly widgets = signal<Record<PromoWidget, {
    visible: boolean
    disabled: boolean
  }>>({
    [PromoWidget.tgBot]: {
      visible: false,
      disabled: true
    }
  })

  init() {
    Object.entries(this.widgets())
      .forEach((widget) => {
        try {
          this.widgets.update(value => {
            value[widget[0] as PromoWidget].visible = localStorage.getItem(widget[0]) !== '1';
            return value;
          });
        } catch {

        }
      })

  }

  saveStorage(
    key: PromoWidget,
  ) {
    try {
      localStorage.setItem(key, '1');
      this.widgets.update(value => {
        value[key].visible = false;
        return value;
      });
    } catch {

    }
  }
}
