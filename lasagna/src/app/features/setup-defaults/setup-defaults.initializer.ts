import {inject} from '@angular/core';
import {SetupDefaultsService} from './setup-defaults.service';
import {NotificationsService} from '../../shared/service/services';
import {errorHandler} from '../../shared/helpers';
import {SettingsService} from '../settings/service/services/settings.service';
import {Title} from '@angular/platform-browser';
import {TranslateService} from '@ngx-translate/core';

export const setupDefaultsInitializer = async () => {
  const setupDefaultsService = inject(SetupDefaultsService);
  const notificationsService = inject(NotificationsService);
  const settingsService = inject(SettingsService);
  const title = inject(Title);
  const translateService = inject(TranslateService);

  try {
    return await Promise.all([
      setupDefaultsService.setupRecipesCategories(),
      setupDefaultsService.setupProductsCategories(),
      setupDefaultsService.setupProducts(),
      setupDefaultsService.setUserUUID(),
      settingsService.loadSettings()
        .then((settings) => settingsService.setDefaultSettings())
        .then(async (settings) => {
          const lang = settings?.getSetting<string>('lang')?.data || 'en';
          await settingsService.changeLang(lang);
          title.setTitle(translateService.instant('app.title'));
        }),
    ]);
  } catch (error) {
    return notificationsService.error(errorHandler(error));
  }
};
