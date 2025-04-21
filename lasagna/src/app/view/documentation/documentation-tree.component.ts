import {Component} from '@angular/core';
import {DocsService} from '../../service/services/docs.service';
import {AsyncPipe, JsonPipe, NgTemplateOutlet} from '@angular/common';
import {ActivatedRoute, RouterLink, RouterOutlet} from '@angular/router';

@Component({
  selector: 'lg-documentation-tree',
  template: `
      <div class="lg-documentation-tree">
          @for (item of docsService.getTree() | async;track item) {
              <!--              <div class="lg-documentation-tree__item">-->
                      <!--                  <a [routerLink]="['/docs', item.path]">-->
                      <!--                      {{ item.title }}-->
                      <!--                  </a>-->
                      <!--              </div>-->

                      <!--              <pre>{{item|json}}</pre>-->

              <ng-container [ngTemplateOutlet]="itemTpl"
                            [ngTemplateOutletContext]="{ $implicit: item,level:0 }"></ng-container>
          }
      </div>

      <ng-template #itemTpl let-item let-level="level">
          <div [style.padding-left.px]="level*5">
              @if (item.path) {
                  <a [routerLink]="getPath(item.path)">
                      {{ nameToTitleMap[item.name] ?? item.name }}
                  </a>
              } @else {

                  {{ nameToTitleMap[item.name] ?? item.name }}
              }
          </div>


          @if (item.children) {
              @for (child of item.children;track child) {
                  <ng-container [ngTemplateOutlet]="itemTpl"
                                [ngTemplateOutletContext]="{ $implicit: child,level:level + 1 }"></ng-container>
              }
          }
      </ng-template>

      <router-outlet></router-outlet>
  `,
  standalone: true,
  imports: [
    AsyncPipe,
    RouterLink,
    JsonPipe,
    NgTemplateOutlet,
    RouterOutlet
  ],
})
export class DocumentationTreeComponent {
  constructor(
    public docsService: DocsService,
    private route: ActivatedRoute,
  ) {
  }

  getPath(item: string) {
    const segments = item.split('/');
    const mapped = segments.map(segment => segment.replace('.md', ''));
    return ['/docs'].concat(mapped.filter(Boolean)).join('/');
  }

  nameToTitleMap: Record<string, string> = {
    'getting-started': 'Getting Started',
    'intro.md': 'Introduction',
    'install': 'Installation',
    'requirenments.md': 'Requirements',
  };
}
