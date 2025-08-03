import {DocFile, SharedDocLoaderService, TreeNode} from "./docs-loader.service";
import {Stores} from '../../../shared/service/db/const/stores';
import {BehaviorSubject} from 'rxjs';
import {inject, Injectable} from "@angular/core";
import {USER_LANGUAGE} from '../../settings/service/providers/user-language.token';

@Injectable({providedIn: 'root'})
export class DocsService {
  constructor() {
  }

  orderTitles: Record<string, number> = {
    'getting-started': 1,
    'invoices': 4,
    'settings': 5,
    'recipes': 3,
    'storage': 2,
  };
  private docs$ = new BehaviorSubject<DocFile[]>([]);
  private tree$ = new BehaviorSubject<TreeNode[]>([]);
  private _userLang = inject(USER_LANGUAGE);
  private _sharedLoader = inject(SharedDocLoaderService);

  getDocsView() {
    return this.docs$.getValue();
  }

  async init() {
    try {
      const {docs, tree} = await this._sharedLoader.load('./docs', Stores.DOCUMENTATION);
      const filteredTree = this._filterLanguage(tree, this._userLang());
      this.tree$.next(this._sortTree(filteredTree));
      this.docs$.next(docs);
    } catch (e) {
      console.error('DocsService init failed', e);
    }
  }

  getDocs() {
    return this.docs$.asObservable();
  }

  getTree() {
    return this.tree$.asObservable();
  }

  private _filterLanguage(nodes: TreeNode[], lang: string): TreeNode[] {
    return nodes
      .map(node => this._sharedLoader.filterLanguage(node, lang))
      .filter((n): n is TreeNode => !!n);
  }

  private _sortTree(nodes: TreeNode[]): TreeNode[] {
    return nodes.toSorted((a, b) => (this.orderTitles[a.name || ''] || 0) - (this.orderTitles[b.name || ''] || 0));
  }
}
