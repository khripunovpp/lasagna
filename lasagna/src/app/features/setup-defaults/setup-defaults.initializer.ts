import {inject} from '@angular/core';
import {SetupDefaultsService} from './setup-defaults.service';

export const setupDefaultsInitializer = () => {
  const setupDefaultsService = inject(SetupDefaultsService);


  return Promise.all([
    setupDefaultsService.setupRecipesCategories(),
    setupDefaultsService.setupProductsCategories(),
    setupDefaultsService.setupProducts(),
    setupDefaultsService.setUserUUID(),
  ]);
};
