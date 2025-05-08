import {DexieIndexDbService} from '../service/db/dexie-index-db.service';
import {DB_NAME} from '../service/tokens/db-name.token';
import {NotificationsService} from '../service/services';

export const defaultProviders = [
  DexieIndexDbService,
  NotificationsService,
  {provide: DB_NAME, useValue: 'TestDB'},
]
