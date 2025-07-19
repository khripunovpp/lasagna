// 📁 src/app/services/docs.service.ts
import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, firstValueFrom} from 'rxjs';
import {DexieIndexDbService} from '../db/dexie-index-db.service';
import {Stores} from '../db/const/stores';
import {USER_LANGUAGE} from '../../../features/settings/service/providers/user-language.token';

export interface DocFile {
  type: 'file';
  name: string;
  path: string;
  title: string;
  html: string;
  language?: string;
  order?: number; // Used for sorting, not stored in DB
}

export interface TreeNode {
  type: 'folder' | 'file';
  name: string;
  path?: string;
  title?: string;
  language?: string;
  children?: TreeNode[];
  _expanded?: boolean; // Used for UI state, not stored in DB
  order?: number; // Used for sorting, not stored in DB
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

  orderTitles: Record<string, number> = {
    'getting-started': 1,
    'invoices': 4,
    'settings': 5,
    'recipes': 3,
    'storage': 2,
  };
  private _userLang = inject(USER_LANGUAGE);
  private docs$ = new BehaviorSubject<DocFile[]>([]);
  private tree$ = new BehaviorSubject<TreeNode[]>([]);

  async init() {
    try {
      const remoteMeta = await firstValueFrom(this._http.get<MetaInfo>('./docs/meta.json'));
      const localData = await this._indexedDB.getAll(Stores.DOCUMENTATION);
      const localMeta = localData?.find((item: any) => item.key === 'meta')?.value;

      const needsUpdate = !localMeta || new Date(remoteMeta.updatedAt) > new Date(localMeta.updatedAt);

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
        const docsRecords = await this._getStoredDocs();

        this.tree$.next(docsRecords.tree);
        this.docs$.next(docsRecords.docs);
      }
    } catch (error) {
      console.error('Failed to initialize docs service:', error);
      // Не выбрасываем ошибку, чтобы не прерывать работу приложения
      // throw new Error(`Failed to initialize docs service: ${error}`);
    }
  }

  filterLanguage(node: TreeNode, lang: string): TreeNode | null {
    if (node.language && node.language !== lang) {
      return null;
    }
    if (node.type === 'file') {
      return node;
    }

    const filteredChildren: TreeNode[] = (node.children || []).reduce((acc: TreeNode[], child: TreeNode) => {
      const filteredChild = this.filterLanguage(child, lang);

      if (filteredChild) {
        acc.push(filteredChild);
      }
      return acc;
    }, []);

    if (filteredChildren.length > 0) {
      return {
        ...node,
        children: filteredChildren
          .toSorted((a: TreeNode, b: TreeNode) => {
            return (a.order || 0) - (b.order || 0);
          }),
      };
    }

    return null;
  }

  getDocsView() {
    return this.docs$.getValue();
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

  private async _getStoredDocs() {
    const docsRecords = await this._indexedDB.getAll(Stores.DOCUMENTATION);

    const tree = (docsRecords
      ?.find((item: any) => item.key === 'tree')?.value.reduce((acc: any, item: TreeNode) => {
        const filteredNode = this.filterLanguage(item, this._userLang());
        if (filteredNode) {
          acc.push(filteredNode);
        }
        return acc;
      }, []) || []).toSorted((a: TreeNode, b: TreeNode) =>
      (this.orderTitles[a.name || ''] || 0) - (this.orderTitles[b.name || ''] || 0));
    const docs = docsRecords?.find((item: any) => item.key === 'data')?.value;

    return {
      tree,
      docs,
    };
  }
}
