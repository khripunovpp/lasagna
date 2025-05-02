// 📁 src/app/services/docs.service.ts
import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, firstValueFrom} from 'rxjs';
import {DexieIndexDbService} from '../db/dexie-index-db.service';
import {Stores} from '../db/const/stores';

export interface DocFile {
  type: 'file';
  name: string;
  path: string;
  title: string;
  html: string;
}

export interface TreeNode {
  type: 'folder' | 'file';
  name: string;
  path?: string;
  title?: string;
  children?: TreeNode[];
}

interface MetaInfo {
  updatedAt: string;
}


@Injectable({providedIn: 'root'})
export class DocsService {
  constructor(
    private _http: HttpClient,
    private _indexedDB: DexieIndexDbService,
  ) {
  }

  private docs$ = new BehaviorSubject<DocFile[]>([]);
  private tree$ = new BehaviorSubject<TreeNode[]>([]);

  async init() {
    const remoteMeta = await firstValueFrom(this._http.get<MetaInfo>('./docs/meta.json'));
    const localData = await this._indexedDB.getAll(Stores.DOCUMENTATION);
    const localMeta = localData?.find((item:any) => item.key === 'meta')?.value;

    const needsUpdate = !localMeta || new Date(remoteMeta.updatedAt) > new Date(localMeta.updatedAt);

    console.warn({
      localMeta,
      remoteMeta,
      needsUpdate,
    });


    if (needsUpdate) {
      const [data, tree]: [
        DocFile[],
        TreeNode[]
      ] = await Promise.all([
        firstValueFrom(this._http.get<DocFile[]>('./docs/data.json')),
        firstValueFrom(this._http.get<TreeNode[]>('./docs/tree.json')),
      ]);

      await this._indexedDB.balkAdd(Stores.DOCUMENTATION, [
        {
          key: 'meta',
          value: remoteMeta,
        },
        {
          key: 'data',
          value: data,
        },
        {
          key: 'tree',
          value: tree,
        },
      ]);

      this.docs$.next(data);
      this.tree$.next(tree);
    } else {
      const docsRecords = await this._indexedDB.getAll(Stores.DOCUMENTATION);

      const tree = docsRecords?.find((item:any) => item.key === 'tree')?.value;
      const docs = docsRecords?.find((item:any) => item.key === 'data')?.value;

      this.tree$.next(tree);
      this.docs$.next(docs);
    }
  }

  getDocs() {
    return this.docs$.asObservable();
  }

  getTree() {
    return this.tree$.asObservable();
  }

  async getDocByPath(path: string) {
    // return await this.db.docs.get(path);
  }
}
