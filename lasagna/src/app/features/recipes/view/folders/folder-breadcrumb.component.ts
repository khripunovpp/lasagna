import {ChangeDetectionStrategy, Component, computed, inject, OnInit, signal} from '@angular/core';
import {RouterLink} from '@angular/router';
import {MatIcon} from '@angular/material/icon';
import {injectParams} from '../../../../shared/helpers';
import {FoldersRepository} from '../../service/providers/folders.repository';
import {Folder} from '../../service/models/Folder';
import {TranslatePipe} from '@ngx-translate/core';

@Component({
  selector: 'lg-folder-breadcrumb',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink, MatIcon, TranslatePipe],
  template: `
    <nav class="folder-breadcrumb">
      <a class="folder-breadcrumb__item folder-breadcrumb__item--link"
         [routerLink]="['/recipes']">
        {{ 'folders.breadcrumb.root' | translate }}
      </a>

      @for (folder of ancestors(); track folder.uuid; let last = $last) {
        <mat-icon class="folder-breadcrumb__separator">chevron_right</mat-icon>

        @if (last) {
          <span class="folder-breadcrumb__item folder-breadcrumb__item--current">
            {{ folder.name }}
          </span>
        } @else {
          <a class="folder-breadcrumb__item folder-breadcrumb__item--link"
             [routerLink]="['/recipes/folder', folder.uuid]">
            {{ folder.name }}
          </a>
        }
      }
    </nav>
  `,
  styles: [`
    .folder-breadcrumb {
      display: flex;
      align-items: center;
      gap: 4px;
      flex-wrap: wrap;
    }

    .folder-breadcrumb__item {
      font-size: 14px;
      line-height: 1;
    }

    .folder-breadcrumb__item--link {
      color: var(--p-3);
      text-decoration: none;
      cursor: pointer;

      &:hover {
        text-decoration: underline;
      }
    }

    .folder-breadcrumb__item--current {
      color: var(--p-1);
      font-weight: 500;
    }

    .folder-breadcrumb__separator {
      font-size: 16px;
      width: 16px;
      height: 16px;
      color: var(--secondary-color);
    }
  `],
})
export class FolderBreadcrumbComponent implements OnInit {
  private readonly _foldersRepository = inject(FoldersRepository);
  private readonly _folderUuid = injectParams<string | null>('folderUuid');
  private readonly _allFolders = signal<Folder[]>([]);

  readonly ancestors = computed(() => {
    const uuid = this._folderUuid();
    if (!uuid) return [];
    return this._foldersRepository.getAncestors(uuid, this._allFolders());
  });

  async ngOnInit() {
    const folders = await this._foldersRepository.getAll(true);
    this._allFolders.set(folders);
  }
}
