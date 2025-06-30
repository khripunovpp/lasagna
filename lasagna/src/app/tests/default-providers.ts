import {DexieIndexDbService} from '../shared/service/db/dexie-index-db.service';
import {NotificationsService} from '../shared/service/services';
import {provideNoopAnimations} from '@angular/platform-browser/animations';

export const defaultProviders = [
  DexieIndexDbService,
  NotificationsService,
  provideNoopAnimations(),
]
