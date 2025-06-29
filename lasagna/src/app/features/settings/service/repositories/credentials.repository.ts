import {Injectable} from '@angular/core';
import {DexieIndexDbService} from '../../../../shared/service/db/dexie-index-db.service';
import {Stores} from '../../../../shared/service/db/const/stores';
import {Credential} from '../models/Credential';
import {CredentialDTO} from '../schemes/Credential.scheme';

@Injectable({
  providedIn: 'root'
})
export class CredentialsRepository {
  constructor(
    public _indexDbService: DexieIndexDbService,
  ) {
  }

  addOne(
    credential: Credential
  ) {
    return this._indexDbService.addData(Stores.CREDENTIALS, credential.toDTO())
  }

  updateOne(
    uuid: string,
    credential: Credential
  ) {
    return this._indexDbService.replaceData(Stores.CREDENTIALS, uuid, credential.toDTO());
  }

  updateMany(
    credentials: Credential[]
  ) {
    return this._indexDbService.replaceManyData(Stores.CREDENTIALS, credentials.map((credential) => credential.toDTO()));
  }

  async getOne(
    uuid: Credential | string | undefined,
  ) {
    return new Promise<Credential | undefined>(async (resolve, reject) => {
      uuid = typeof uuid === 'string' ? uuid : (uuid as Credential).uuid;
      if (!uuid) {
        resolve(undefined);
        return;
      }
      await this._indexDbService.getOne(Stores.CREDENTIALS, uuid).then((result: CredentialDTO) => {
        resolve(Credential.fromRaw(result));
      });
    });
  }

  getAll() {
    return this._indexDbService.getAll<CredentialDTO>(Stores.CREDENTIALS)
      .then((taxes: CredentialDTO[]) => taxes.map((credential) => Credential.fromRaw(credential)))
  }

  addMany(
    taxes: Credential[]
  ) {
    return this._indexDbService.balkAdd(Stores.CREDENTIALS, taxes.map((credential) => credential.toDTO()), false);
  }

  deleteOne(
    uuid: string
  ) {
    return this._indexDbService.remove(Stores.CREDENTIALS, uuid);
  }

  getAllByType(type: 'system' | 'customer') {
    return this._indexDbService.search(Stores.CREDENTIALS, 'type', type)
      .then((credentials: CredentialDTO[]) => credentials.map((credential) => Credential.fromRaw(credential)));
  }


  getAllSystemCredentials() {
    return this._indexDbService.search(Stores.CREDENTIALS, 'type', 'system')
      .then((credentials: CredentialDTO[]) => credentials.map((credential) => Credential.fromRaw(credential)));
  }

  getAllCustomersCredentials() {
    return this._indexDbService.search(Stores.CREDENTIALS, 'type', 'customer')
      .then((credentials: CredentialDTO[]) => credentials.map((credential) => Credential.fromRaw(credential)));
  }
}
