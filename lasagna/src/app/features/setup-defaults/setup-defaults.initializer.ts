import {inject, PLATFORM_ID} from '@angular/core';
import {SetupDefaultsService} from './setup-defaults.service';
import {NotificationsService} from '../../shared/service/services';
import {errorHandler} from '../../shared/helpers';
import {SettingsService} from '../settings/service/services/settings.service';
import {WINDOW} from '../../shared/service/tokens/window.token';
import {isPlatformBrowser} from '@angular/common';

export const setupDefaultsInitializer = async () => {
  const isBrowser = isPlatformBrowser(inject(PLATFORM_ID));
  if (!isBrowser) {
    return;
  }
  const setupDefaultsService = inject(SetupDefaultsService);
  const notificationsService = inject(NotificationsService);
  const settingsService = inject(SettingsService);
  const window = inject(WINDOW);
  const disableSetupProducts = new URLSearchParams(window?.location.search ?? '').get('dsp') === '';

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
        }),
    ]);
  } catch (error) {
    return notificationsService.error(errorHandler(error));
  }
};
