// shared-doc-loader.service.ts
import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {firstValueFrom} from 'rxjs';
import {DexieIndexDbService} from '../../../shared/service/db/dexie-index-db.service';
import {Stores} from '../../../shared/service/db/const/stores';

export interface DocFile {
  type: 'file';
  name: string;
  path: string;
  title: string;
  html: string;
  language?: string;
  order?: number;
}

export interface TreeNode {
  type: 'folder' | 'file';
  name: string;
  path?: string;
  title?: string;
  language?: string;
  children?: TreeNode[];
  _expanded?: boolean;
  order?: number;
}

interface MetaInfo {
  updatedAt: string;
}

@Injectable({providedIn: 'root'})
export class SharedDocLoaderService {
  constructor(
    private _http: HttpClient,
    private _indexedDB: DexieIndexDbService
  ) {
  }

  async load(
    sourcePath: string,
    storeKey: Stores
  ): Promise<{ docs: DocFile[]; tree: TreeNode[] }> {
    const remoteMeta = await firstValueFrom(
      this._http.get<MetaInfo>(`${sourcePath}/meta.json`)
    );
    const localData = await this._indexedDB.getAll(storeKey);
    const localMeta = localData?.find((item: any) => item.key === 'meta')?.value;

    const needsUpdate = !localMeta || new Date(remoteMeta.updatedAt) > new Date(localMeta.updatedAt);

    if (needsUpdate) {
      const [data, tree]: [DocFile[], TreeNode[]] = await Promise.all([
        firstValueFrom(this._http.get<DocFile[]>(`${sourcePath}/data.json`)),
        firstValueFrom(this._http.get<TreeNode[]>(`${sourcePath}/tree.json`)),
      ]);

      await this._indexedDB.balkAdd(storeKey, [
        {key: 'meta', value: remoteMeta},
        {key: 'data', value: data},
        {key: 'tree', value: tree},
      ]);

      return {docs: data, tree};
    } else {
      const docs = localData?.find((item: any) => item.key === 'data')?.value || [];
      const tree = localData?.find((item: any) => item.key === 'tree')?.value || [];
      return {docs, tree};
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
        children: filteredChildren.sort((a, b) => (a.order || 0) - (b.order || 0)),
      };
    }

    return null;
  }
}
