import {Component, inject} from '@angular/core';
import {defer, filter, map, startWith, switchMap} from 'rxjs';
import {AsyncPipe} from '@angular/common';
import {ActivatedRoute, NavigationEnd, Router} from '@angular/router';
import {USER_LANGUAGE} from '../../settings/service/providers/user-language.token';
import {DocsService} from '../service/docs.service';
import {TranslatePipe} from '@ngx-translate/core';

@Component({
  selector: 'lg-article',
  template: `
    @defer {
      <div class="lg-article">
        @if (content | async; as contentHTML) {
          <div [innerHTML]="contentHTML"></div>
        }
      </div>
    } @error {
      {{ 'article.defer-load-error' | translate }}
    }
  `,
  styles: [
    `
      .lg-article {
        display: flex;
      }
    `
  ],
  imports: [
    AsyncPipe,
    TranslatePipe
  ]
})
export class ArticleComponent {
  constructor(
    private _docsService: DocsService,
    private route: ActivatedRoute,
    private router: Router,
  ) {
  }

  private _userLang = inject(USER_LANGUAGE);
  content = defer(() => this.router.events.pipe(
    filter(event => event instanceof NavigationEnd),
    startWith(null),
    switchMap(() => this._docsService.getDocs()),
    map((data) => ({
      data,
      url: this.route.snapshot.url.map(segment => segment.path).join('/'),
    })),
    map(({data, url}) => {
      if (!url) {
        return '';
      }
      const doc = data.filter(doc => doc.path.includes(url));
      const targetByLang = doc.find(d => d.language === this._userLang());
      if (!doc.length) {
        return 'Start'
      }
      if (doc.length > 1 && targetByLang) {
        return targetByLang.html;
      }
      return doc[0]?.html || '404 Not Found';
    }),
  ));
}
