import {Injectable} from '@angular/core';
import {DexieIndexDbService} from '../db/dexie-index-db.service';
import {Stores} from '../const/stores';

export interface Tag {
  name: string
  style: string // CSS color or string token
}

@Injectable({
  providedIn: 'root'
})
export class TagsRepositoryService {
  constructor(
    public _indexDbService: DexieIndexDbService,
  ) {
  }

  addOne(tag: Tag) {
    return this._indexDbService.addData(Stores.TAGS, tag);
  }

  async getOne(
    uuid: string,
  ) {
    return this._indexDbService.getOne(Stores.TAGS, uuid);
  }


  getAll() {
    return this._indexDbService.getAll(Stores.TAGS) as Promise<Tag[]>;
  }

  getMany(
    uuids: string[],
  ) {
    return this._indexDbService.getMany(Stores.TAGS, uuids);
  }

  editOne(uuid: string, tag: Tag) {
    return this._indexDbService.replaceData(Stores.TAGS, uuid, tag);
  }

  deleteOne(uuid: string) {
    return this._indexDbService.remove(Stores.TAGS, uuid);
  }
}
