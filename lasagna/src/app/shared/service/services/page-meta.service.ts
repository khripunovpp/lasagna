import {effect, inject, Injectable} from '@angular/core';
import {Meta, Title} from '@angular/platform-browser';
import {TranslateService} from '@ngx-translate/core';
import {Router} from '@angular/router';
import {routeChangeSignal} from '../../helpers';
import {appMeta} from '../../../app.meta';

@Injectable({
  providedIn: 'root'
})
export class PageMetaService {
  constructor() {
  }

  readonly routeChanged = routeChangeSignal(inject(Router), false);
  private readonly _appMeta = appMeta;
  private title: string = '';
  private readonly _titleProvider = inject(Title);
  private readonly _meta = inject(Meta);
  private readonly _translateService = inject(TranslateService);
  private readonly _onRouteChanged = effect(() => {
    const route = this.routeChanged();
    if (!route) {
      return;
    }
    this._setupMetaTags();
  });

  setTitle(newTitle: string) {
    this.title = newTitle || this._getDefaultTitle();
    this._titleProvider.setTitle(this.title);
  }

  getTitle(): string {
    return this.title;
  }

  private _setupMetaTags() {
    const url = this.routeChanged()?.[1];
    const routeKeys = (url?.split('/') || []).filter(Boolean);
    const definitions = this._appMeta[routeKeys[0]] || this._appMeta['default'] || [];

    definitions.forEach(def => {
      this._meta.updateTag(def);
    });
  }

  private _getDefaultTitle(): string {
    return this._translateService.instant('app.title');
  }
}
