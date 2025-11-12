import {inject} from '@angular/core';
import {SetupDefaultsService} from './setup-defaults.service';
import {NotificationsService} from '../../shared/service/services';
import {errorHandler} from '../../shared/helpers';
import {SettingsService} from '../settings/service/services/settings.service';
import {PageTitleService} from '../../shared/service/services/page-title.service';
import {ActivatedRoute} from '@angular/router';

export const setupDefaultsInitializer = async () => {
  const setupDefaultsService = inject(SetupDefaultsService);
  const notificationsService = inject(NotificationsService);
  const settingsService = inject(SettingsService);
  const title = inject(PageTitleService);

  const disableSetupProducts = new URLSearchParams(window.location.search).get('dsp') === '';

  if (disableSetupProducts) {
    try {
      localStorage.setItem('productsInstalled', 'true');
    } catch {
      // Ignore
    }
  }

  try {
    return await Promise.all([
      setupDefaultsService.setupRecipesCategories(),
      setupDefaultsService.setupProductsCategories(),
      (disableSetupProducts ? Promise.resolve() : setupDefaultsService.setupProducts()),
      setupDefaultsService.setUserUUID(),
      settingsService.loadSettings()
        .then((settings) => settingsService.setDefaultSettings())
        .then(async (settings) => {
          const lang = settings?.getSetting<string>('lang')?.data || 'en';
          await settingsService.changeLang(lang);
          title.setTitle('');
        }),
    ]);
  } catch (error) {
    return notificationsService.error(errorHandler(error));
  }
};
