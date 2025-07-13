import {Component, inject} from '@angular/core';
import {DocsService} from '../../service/services/docs.service';
import {defer, filter, map, startWith, switchMap} from 'rxjs';
import {AsyncPipe} from '@angular/common';
import {ActivatedRoute, NavigationEnd, Router} from '@angular/router';
import {USER_LANGUAGE} from '../../../features/settings/service/providers/user-language.token';

@Component({
  selector: 'lg-article',
  template: `
    <div class="lg-article">
      @if (content | async; as contentHTML) {
        <div [innerHTML]="contentHTML"></div>
      }
    </div>
  `,
  styles:[
    `
      .lg-article {
        display: flex;
      }
    `
  ],
  imports: [
    AsyncPipe
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
      const doc = data.filter(doc => doc.path.includes(url || '/start-page'));
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
