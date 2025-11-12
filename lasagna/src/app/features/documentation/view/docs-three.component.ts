import {AfterViewInit, Component, ElementRef, Renderer2, signal, viewChild} from '@angular/core';
import {AsyncPipe, NgTemplateOutlet} from '@angular/common';
import {NavigationEnd, Router, RouterLink} from '@angular/router';
import {MatIcon} from '@angular/material/icon';
import {combineLatestWith, defer, filter, of, startWith, switchMap} from 'rxjs';
import {TranslatePipe} from '@ngx-translate/core';
import {ButtonComponent} from '../../../shared/view/ui/button/button.component';
import {DropdownComponent} from '../../controls/dropdown/dropdown.component';
import {DocsService} from '../service/docs.service';


@Component({
  selector: 'lg-docs-three',
  template: `
    @if (placeholderHeight()) {
      <div [style.height.px]="placeholderHeight()"></div>
    }
    <lg-dropdown [style.left.px]="position()?.left"
                 [style.position]="position()?.position"
                 [style.top.px]="position()?.top">
      <lg-button [size]="'small'"
                 [style]="'transcluent'"
                 lgDropdownAnchor>
        <mat-icon aria-hidden="false" fontIcon="auto_stories"></mat-icon>
      </lg-button>


      <div class="lg-documentation-container">
        @for (item of tree | async; track item) {
          <ng-container [ngTemplateOutlet]="itemTpl"
                        [ngTemplateOutletContext]="{ $implicit: item,level:0 }"></ng-container>
        }
      </div>

    </lg-dropdown>


    <ng-template #itemTpl let-item let-level="level">
      <div
        (click)="toggle(item)"
        [style.padding-left.px]="level * 16"
        class="doc-tree-item">
        @if (item.type === 'folder') {
          <div class="doc-tree-toggle">
            {{ item._expanded ? '▼' : '▶' }}
          </div>
        } @else {
          <div class="doc-tree-empty-icon"></div>
        }

        @if (item.path) {
          <a [routerLink]="getPath(item.path)" class="doc-tree-link">
            {{ (nameToTitleMap[item.name] ?? item.title ?? item.name) | translate }}
          </a>
        } @else {
          <div class="doc-tree-folder-name">
            {{ (nameToTitleMap[item.name] ?? item.title ?? item.name) | translate }}
          </div>
        }
      </div>

      @if (item.children && item._expanded) {
        @for (child of item.children; track child) {
          <ng-container
            [ngTemplateOutlet]="itemTpl"
            [ngTemplateOutletContext]="{ $implicit: child, level: level + 1 }"/>
        }
      }
    </ng-template>
  `,
  imports: [
    AsyncPipe,
    NgTemplateOutlet,
    RouterLink,
    ButtonComponent,
    DropdownComponent,
    MatIcon,
    TranslatePipe,
  ],
  styles: [`
    .lg-documentation-container {
      font-size: 14px;
      line-height: 1.5;
    }

    .doc-tree-item {
      display: flex;
      align-items: center;
      gap: 4px;
      cursor: pointer;
      user-select: none;
      padding: 2px 0;
      white-space: nowrap;
    }

    .doc-tree-toggle {
      width: 16px;
      display: inline-block;
      cursor: pointer;
      font-size: 12px;
    }

    .doc-tree-empty-icon {
      width: 16px;
      display: inline-block;
    }

    .doc-tree-link {
      color: #2a2a2a;
      text-decoration: none;
      transition: color 0.2s;
    }

    .doc-tree-link:hover {
      text-decoration: underline;
      color: #000;
    }

    .doc-tree-folder-name {
      font-weight: 600;
    }
  `]
})
export class DocsThreeComponent
  implements AfterViewInit {
  constructor(
    public docsService: DocsService,
    private _router: Router,
    private _renderer2: Renderer2,
  ) {
  }

  dropdownComponent = viewChild(DropdownComponent);
  dropdownElementRef = viewChild(DropdownComponent, {read: ElementRef});
  nameToTitleMap: Record<string, string> = {
    'getting-started': 'docs.getting-started',
    'invoices': 'docs.invoices',
    'settings': 'docs.settings',
    'recipes': 'docs.recipes',
    'storage': 'docs.storage',
  };

  onNavigationEnd = defer(() => this._router.events.pipe(
    filter(event => event instanceof NavigationEnd),
    startWith(null) // Ensure initial value
  ));

  tree = defer(() => this.docsService.getTree())
    .pipe(
      combineLatestWith(this.onNavigationEnd),
      switchMap(([tree]) => {
        // Ensure all items are expanded if the current route matches
        const currentPath = this._router.url.split('?')[0];
        const expandAll = (items: any[], path: string) => {
          items.forEach(item => {
            item._expanded = item.path ? currentPath.startsWith(this.getPath(item.path)) : false;
            if (item.children) {
              expandAll(item.children, path);
            }
          });
        };
        expandAll(tree, currentPath);
        this.dropdownComponent()?.closeDropdown();
        return of(tree);
      }),
    );
  placeholderHeight = signal(0);
  position = signal<{
    top: number
    left: number
    position: string
  } | null>(null);

  getPath(item: string) {
    const segments = item.split('/');
    const mapped = segments.map(segment => segment.replace('.md', ''));
    return ['/docs'].concat(mapped.filter(Boolean)).join('/');
  }

  toggle(item: any) {
    if (item.type !== 'folder') return;
    item._expanded = !item._expanded;
  }

  ngAfterViewInit() {
    setTimeout(() => {
      const dropdown = this.dropdownElementRef();
      if (dropdown) {
        const rect = dropdown.nativeElement.getBoundingClientRect();
        const height = rect.height;
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        const scrollLeft = window.pageXOffset || document.documentElement.scrollLeft;
        this.placeholderHeight.set(height + 32);
        this.position.set({
          top: rect.top + scrollTop,
          left: rect.left + scrollLeft,
          position: 'fixed',
        });
      }
      this.dropdownComponent()?.closeDropdown();
    });
  }
}
