import {DexieIndexDbService} from '../shared/service/db/dexie-index-db.service';
import {DB_NAME} from '../shared/service/tokens/db-name.token';
import {NotificationsService} from '../shared/service/services';
import {provideNoopAnimations} from '@angular/platform-browser/animations';

export const defaultProviders = [
  DexieIndexDbService,
  NotificationsService,
  {provide: DB_NAME, useValue: 'TestDB'},
  provideNoopAnimations(),
]
