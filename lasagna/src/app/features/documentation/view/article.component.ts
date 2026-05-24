import {ChangeDetectionStrategy, Component, inject} from '@angular/core';
import {defer, filter, map, startWith, switchMap} from 'rxjs';
import {ActivatedRoute, NavigationEnd, Router} from '@angular/router';
import {toSignal} from '@angular/core/rxjs-interop';
import {USER_LANGUAGE} from '../../settings/service/providers/user-language.token';
import {DocsService} from '../service/docs.service';
import {TranslatePipe} from '@ngx-translate/core';
import {ArticleFeedbackComponent} from './article-feedback.component';

interface ResolvedArticle {
  html: string;
  path: string;
  valid: boolean;
}

const EMPTY_RESOLVED: ResolvedArticle = {html: '', path: '', valid: false};

@Component({
  selector: 'lg-article',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    @defer {
      <div class="lg-article">
        @if (resolved().html) {
          <div [innerHTML]="resolved().html"></div>
        }
      </div>
      @if (resolved().valid) {
        <lg-article-feedback [path]="resolved().path"></lg-article-feedback>
      }
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
    TranslatePipe,
    ArticleFeedbackComponent
  ]
})
export class ArticleComponent {
  private _docsService = inject(DocsService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private _userLang = inject(USER_LANGUAGE);

  readonly resolved = toSignal(
    defer(() => this.router.events.pipe(
      filter(event => event instanceof NavigationEnd),
      startWith(null),
      switchMap(() => this._docsService.getDocs()),
      map((data): ResolvedArticle => {
        const url = this.route.snapshot.url.map(segment => segment.path).join('/');
        if (!url) return EMPTY_RESOLVED;
        const docs = data.filter(d => d.path.includes(url));
        if (!docs.length) return {html: 'Start', path: url, valid: false};
        const target = docs.find(d => d.language === this._userLang());
        const html = (docs.length > 1 && target ? target.html : docs[0]?.html) ?? '';
        return {html: html || '404 Not Found', path: url, valid: !!html};
      }),
    )),
    {initialValue: EMPTY_RESOLVED},
  );
}
