import {BehaviorSubject} from 'rxjs';
import {DocFile, SharedDocLoaderService, TreeNode} from './docs-loader.service';
import {USER_LANGUAGE} from '../../settings/service/providers/user-language.token';
import {inject, Injectable} from '@angular/core';
import {Stores} from '../../../shared/service/db/const/stores';
import {NotificationsService} from '../../../shared/service/services';
import {errorHandler} from '../../../shared/helpers';

@Injectable({providedIn: 'root'})
export class FaqService {
  constructor() {
  }

  private faqs$ = new BehaviorSubject<DocFile[]>([]);
  private tree$ = new BehaviorSubject<TreeNode[]>([]);
  private _userLang = inject(USER_LANGUAGE);
  private _sharedLoader = inject(SharedDocLoaderService);
  private _notificationsService = inject(NotificationsService);

  async init() {
    try {
      const {docs, tree} = await this._sharedLoader.load('./faq', Stores.FAQ);
      const filteredTree = this._filterLanguage(tree, this._userLang());
      this.tree$.next(filteredTree);
      this.faqs$.next(docs);
    } catch (e) {
      this._notificationsService.error(errorHandler(e));
    }
  }

  getFaqs() {
    return this.faqs$.asObservable();
  }

  getTree() {
    return this.tree$.asObservable();
  }

  getFaqsView() {
    return this.faqs$.getValue();
  }

  private _filterLanguage(nodes: TreeNode[], lang: string): TreeNode[] {
    return nodes
      .map(node => this._sharedLoader.filterLanguage(node, lang))
      .filter((n): n is TreeNode => !!n);
  }
}
