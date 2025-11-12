import {ProductsRepository} from './products.repository';
import {BaseSyncStrategy} from '../../sync/service/sync-strategy';
import {DexieIndexDbService} from "../../../shared/service/db/dexie-index-db.service";
import {Stores} from "../../../shared/service/db/const/stores";

export class ProductSyncStrategy
  extends BaseSyncStrategy {
  constructor(
    private _productsRepo: ProductsRepository,
    private _dexieService: DexieIndexDbService,
  ) {
    super(Stores.PRODUCTS, _productsRepo, _dexieService);
  }
}
