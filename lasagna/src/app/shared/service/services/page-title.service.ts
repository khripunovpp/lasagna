import {effect, inject, Injectable} from '@angular/core';
import {Title} from '@angular/platform-browser';
import {TranslateService} from '@ngx-translate/core';
import {Router} from '@angular/router';
import {routeChangeSignal} from '../../helpers';

@Injectable({
  providedIn: 'root'
})
export class PageTitleService {
  readonly routeChanged = routeChangeSignal(inject(Router), false);
  private title: string = '';
  private readonly _titleProvider = inject(Title);
  private readonly _translateService = inject(TranslateService);

  setTitle(newTitle: string) {
    this.title = newTitle || this._getDefaultTitle();
    this._titleProvider.setTitle(this.title);
  }

  getTitle(): string {
    return this.title;
  }

  updateRecipeTitle(recipeName: string) {
    const recipeTitle = this._translateService.instant('recipe.title', {
      name: recipeName
    });
    this.setTitle(recipeTitle || this._getDefaultTitle());
  }

  private _getDefaultTitle(): string {
    return this._translateService.instant('app.title');
  }
}
