import {inject} from '@angular/core';
import {SetupDefaultsService} from './setup-defaults.service';
import {NotificationsService} from '../../shared/service/services';
import {errorHandler} from '../../shared/helpers';

export const setupDefaultsInitializer = () => {
  const setupDefaultsService = inject(SetupDefaultsService);
  const notificationsService = inject(NotificationsService);

  return Promise.all([
    setupDefaultsService.setupRecipesCategories(),
    setupDefaultsService.setupProductsCategories(),
    setupDefaultsService.setupProducts(),
    setupDefaultsService.setUserUUID(),
  ]).catch(error => notificationsService.error(errorHandler(error)));
};
