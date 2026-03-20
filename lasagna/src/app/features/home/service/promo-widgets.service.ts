import {computed, inject, Injectable, signal} from '@angular/core';
import {SettingsService} from '../../settings/service/services/settings.service';
import {SettingsKeysConst} from '../../settings/const/settings-keys.const';
import {IS_TELEGRAM} from '../../../shared/service/providers/is-telegram-env.token';

export enum PromoWidget {
  tgBot = 'tgBot'
}

@Injectable({
  providedIn: 'root'
})
export class PromoWidgetsService {
  readonly isTg = inject(IS_TELEGRAM);
  readonly widgets = signal<Record<PromoWidget, { visible: boolean; disabled: boolean }>>({
    [PromoWidget.tgBot]: {
      visible: false,
      disabled: this.isTg,
    },
  });
  readonly hasUnread = computed(() =>
    Object.values(this.widgets()).some(w => w.visible && !w.disabled)
  );
  private readonly _settingsService = inject(SettingsService);

  init() {
    const saved = this._settingsService.settingsSignal()
      ?.getSetting<Record<string, boolean>>(SettingsKeysConst.promoWidgets)?.data ?? {};

    this.widgets.update(current => {
      const updated = {...current};
      (Object.keys(updated) as PromoWidget[]).forEach(key => {
        if (!updated[key].disabled) {
          updated[key] = {...updated[key], visible: !saved[key]};
        }
      });
      return updated;
    });
  }

  dismiss(key: PromoWidget) {
    this.widgets.update(current => ({
      ...current,
      [key]: {...current[key], visible: false},
    }));

    const current = this._settingsService.settingsSignal()
      ?.getSetting<Record<string, boolean>>(SettingsKeysConst.promoWidgets)?.data ?? {};
    this._settingsService.settingsModel?.addSetting(SettingsKeysConst.promoWidgets, {
      ...current,
      [key]: true,
    });
    this._settingsService.saveSettings();
  }
}
