import {Injectable} from '@angular/core';
import {DexieIndexDbService} from '../../shared/service/db/dexie-index-db.service';
import {Stores} from '../../shared/service/db/const/stores';
import {ChangeLogDTO} from './ChangeLogEntry.scheme';

@Injectable({
  providedIn: 'root'
})
export class ChangesLogService {
  constructor(
    public _indexDbService: DexieIndexDbService,
  ) {
  }

  addOne(entry: ChangeLogDTO) {
    return this._indexDbService.addData(Stores.CHANGES_LOG, entry);
  }

  getOne(id: string) {
    return this._indexDbService.getOne(Stores.CHANGES_LOG, id);
  }

  getAllByEntity(entity: string) {
    return this._indexDbService.table(Stores.CHANGES_LOG)
      .where('entity')
      .equals(entity)
      .toArray();
  }

  getChanges(entity: string, entityId: string) {
    return this._indexDbService.table(Stores.CHANGES_LOG)
      .where('entity')
      .equals(entity)
      .and(entry => entry.entityId === entityId)
      .toArray() as Promise<ChangeLogDTO[]>;
  }

  removeFirst(entity: string) {
    return this._indexDbService.table(Stores.CHANGES_LOG)
      .where('entity')
      .equals(entity)
      .first()
      .then(entry => {
        if (entry && entry.id != null) {
          return this._indexDbService.remove(Stores.CHANGES_LOG, entry.id);
        }
        return Promise.resolve();
      });
  }

  removeOne(id: string) {
    return this._indexDbService.remove(Stores.CHANGES_LOG, id);
  }
}
