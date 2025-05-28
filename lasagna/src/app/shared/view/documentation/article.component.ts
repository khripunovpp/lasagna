import {Component} from '@angular/core';
import {DocFile, DocsService} from '../../service/services/docs.service';
import {defer, filter, map, startWith, switchMap} from 'rxjs';
import {AsyncPipe} from '@angular/common';
import {ActivatedRoute, NavigationEnd, Router} from '@angular/router';

@Component({
  selector: 'lg-article',
  template: `
      <div class="lg-article">
          @if (content | async;as contentHTML) {
              <div [innerHTML]="contentHTML"></div>
          }

      </div>
  `,
  standalone: true,
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

  content = defer(() => this.router.events.pipe(
    filter(event => event instanceof NavigationEnd),
    startWith(null),
    switchMap(() => this._docsService.getDocs()),
    map((data) => ({
      data,
      url: this.route.snapshot.url.map(segment => segment.path).join('/'),
    })),
    map(({data,url}) => {
      if (!url) {
        return 'Start';
      }
      const doc = data.find(doc => doc.path.includes(url));
      return doc?.html || '404 Not Found';
    }),
  ));
}
