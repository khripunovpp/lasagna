import {ChangeDetectionStrategy, Component, inject, output, signal, viewChild} from '@angular/core';
import {DialogComponent} from '../../../../shared/view/ui/dialogs/dialog.component';
import {FlexColumnComponent} from '../../../../shared/view/layout/flex-column.component';
import {MatIcon} from '@angular/material/icon';
import {TranslatePipe} from '@ngx-translate/core';
import {NotificationsService} from '../../../../shared/service/services/notifications.service';
import {FoldersRepository} from '../../service/providers/folders.repository';
import {Folder} from '../../service/models/Folder';
import {errorHandler} from '../../../../shared/helpers';
import {FolderColorKey, folderColorVar} from '../../service/const/folder-colors.const';
import {AnalyticsService} from '../../../../shared/service/services/analytics.service';

@Component({
  selector: 'lg-folder-move-dialog',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    DialogComponent,
    FlexColumnComponent,
    MatIcon,
    TranslatePipe,
  ],
  template: `
    <lg-dialog
      name="folder-move"
      [confirmButtonText]="'folders.move-confirm-btn' | translate"
      [cancelButtonText]="'cancel-label' | translate"
      [confirmButtonStyle]="'primary'"
      [closeOnConfirm]="false"
      (onConfirm)="confirm()">

      <lg-flex-column [size]="'medium'">
        <strong>{{ 'folders.move-title' | translate }}</strong>

        <div class="folder-list">
          <button
            type="button"
            class="folder-list__item"
            [class.selected]="targetUuid() === null"
            (click)="targetUuid.set(null)">
            <mat-icon>home</mat-icon>
            <span>{{ 'folders.move-root' | translate }}</span>
          </button>

          @for (folder of folders(); track folder.uuid) {
            @if (folder.uuid !== excludeUuid()) {
              <button
                type="button"
                class="folder-list__item"
                [class.selected]="targetUuid() === folder.uuid"
                (click)="targetUuid.set(folder.uuid!)">
                <mat-icon [style.color]="colorVar(folder.color)">{{ folder.icon }}</mat-icon>
                <span>{{ folder.name }}</span>
              </button>
            }
          }
        </div>
      </lg-flex-column>
    </lg-dialog>
  `,
  styles: [`
    .folder-list {
      display: flex;
      flex-direction: column;
      gap: 4px;
      max-height: 320px;
      overflow-y: auto;
    }

    .folder-list__item {
      display: flex;
      align-items: center;
      gap: 8px;
      padding: 8px 12px;
      border-radius: 8px;
      border: 2px solid transparent;
      background: transparent;
      cursor: pointer;
      text-align: left;
      font-family: inherit;
      font-size: 14px;
      transition: background 0.15s ease;

      &:hover {
        background: var(--p-6);
      }

      &.selected {
        border-color: var(--p-3);
        background: var(--p-6);
      }
    }
  `],
})
export class FolderMoveDialogComponent {
  readonly onMoved = output<void>();
  readonly folders = signal<Folder[]>([]);
  readonly targetUuid = signal<string | null>(null);
  readonly excludeUuid = signal<string | null>(null);
  private readonly _foldersRepository = inject(FoldersRepository);
  private readonly _notificationsService = inject(NotificationsService);
  private readonly _dialogRef = viewChild(DialogComponent);
  private readonly _analyticsService = inject(AnalyticsService);
  private _recipeUuids: string[] = [];

  readonly colorVar = (color: string) => folderColorVar(color as FolderColorKey);

  async open(recipeUuids: string[], excludeFolderUuid: string | null = null) {
    this._recipeUuids = recipeUuids;
    this.targetUuid.set(null);
    this.excludeUuid.set(excludeFolderUuid);

    try {
      const all = await this._foldersRepository.getAll(true);
      this.folders.set(all.sort((a, b) => a.name.localeCompare(b.name)));
    } catch (e) {
      this._notificationsService.error(errorHandler(e));
    }

    this._dialogRef()?.open();
  }

  async confirm() {
    if (!this._recipeUuids.length) return;

    try {
      await this._foldersRepository.bulkMoveRecipes(this._recipeUuids, this.targetUuid());
      this._dialogRef()?.close();
      this.onMoved.emit();
      this._analyticsService.trackEvent('folder_moved', {
        recipes_count: this._recipeUuids.length,
        uuid: this.targetUuid(),
        event_category: 'folders',
        event_label: 'move',
      });
    } catch (e) {
      this._notificationsService.error(errorHandler(e));
    }
  }
}
