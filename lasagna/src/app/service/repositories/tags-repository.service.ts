import {Injectable} from '@angular/core';
import {DexieIndexDbService} from '../db/dexie-index-db.service';
import {Stores} from '../const/stores';
import {Tag} from '@service/models/Tag';
import {TagDTO} from '@service/shemes/Tag.scheme';

@Injectable({
  providedIn: 'root'
})
export class TagsRepositoryService {
  constructor(
    public _indexDbService: DexieIndexDbService,
  ) {
  }

  addOne(tag: Tag) {
    return this._indexDbService.addData<TagDTO>(Stores.TAGS, tag.toDTO(), tag.name);
  }

  async getOne(
    uuid: string,
  ) {
    return this._indexDbService.getOne<TagDTO>(Stores.TAGS, uuid);
  }

  getAll() {
    return this._indexDbService.getAll<TagDTO>(Stores.TAGS);
  }

  getMany(
    uuids: string[],
  ) {
    return this._indexDbService.getMany<TagDTO>(Stores.TAGS, uuids);
  }

  editOne(uuid: string, tag: Tag) {
    return this._indexDbService.replaceData<TagDTO>(Stores.TAGS, uuid, tag.toDTO());
  }

  deleteOne(uuid: string) {
    return this._indexDbService.remove(Stores.TAGS, uuid);
  }
}
