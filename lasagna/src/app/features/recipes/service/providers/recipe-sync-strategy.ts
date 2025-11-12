import {BaseSyncStrategy} from '../../../sync/service/sync-strategy';
import {RecipesRepository} from '../../../../shared/service/repositories';
import {DexieIndexDbService} from '../../../../shared/service/db/dexie-index-db.service';
import {Stores} from '../../../../shared/service/db/const/stores';

export class RecipeSyncStrategy
  extends BaseSyncStrategy {
  constructor(
    private _recipesRepo: RecipesRepository,
    private _dexieService: DexieIndexDbService,
  ) {
    super(Stores.RECIPES, _recipesRepo, _dexieService);
  }
}
