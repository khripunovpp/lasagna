import {ChangeDetectionStrategy, Component, computed, inject, output, signal, viewChild} from '@angular/core';
import {DialogComponent} from '../../../../shared/view/ui/dialogs/dialog.component';
import {FlexColumnComponent} from '../../../../shared/view/layout/flex-column.component';
import {MatIcon} from '@angular/material/icon';
import {FormsModule} from '@angular/forms';
import {TranslatePipe} from '@ngx-translate/core';
import {NotificationsService} from '../../../../shared/service/services/notifications.service';
import {FoldersRepository} from '../../service/providers/folders.repository';
import {Folder} from '../../service/models/Folder';
import {errorHandler} from '../../../../shared/helpers';
import {
  DEFAULT_FOLDER_COLOR,
  FOLDER_COLOR_GROUPS,
  FolderColorKey,
  folderColorVar,
} from '../../service/const/folder-colors.const';
import {DEFAULT_FOLDER_ICON, FOLDER_ICONS, FolderIconKey} from '../../service/const/folder-icons.const';
import {InputComponent} from '../../../controls/form/input.component';
import {AnalyticsService} from '../../../../shared/service/services/analytics.service';

@Component({
  selector: 'lg-folder-edit-dialog',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    DialogComponent,
    FlexColumnComponent,
    MatIcon,
    FormsModule,
    TranslatePipe,
    InputComponent,
  ],
  template: `
    <lg-dialog
      name="folder-edit"
      [confirmButtonText]="'save-label' | translate"
      [cancelButtonText]="'cancel-label' | translate"
      [confirmButtonStyle]="'primary'"
      [closeOnConfirm]="false"
      (onConfirm)="save()"
      (onCancel)="reset()">

      <lg-flex-column [size]="'medium'">
        <strong>
          {{ isEditMode() ? ('folders.edit-title' | translate) : ('folders.create-title' | translate) }}
        </strong>

        <lg-input
          [ngModel]="name()"
          (ngModelChange)="name.set($event)"
          name="folder-name"
          [placeholder]="'folders.name-placeholder' | translate">
        </lg-input>

        <div>
          <div class="picker-label">{{ 'folders.color-label' | translate }}</div>
          <div class="color-picker">
            @for (group of colorGroups; track group.brand) {
              <div class="color-picker__row">
                @for (key of group.keys; track key) {
                  <button type="button"
                          class="color-swatch"
                          [class.active]="color() === key"
                          [style.background]="colorVar(key)"
                          (click)="color.set(key)">
                  </button>
                }
              </div>
            }
          </div>
        </div>

        <div>
          <div class="picker-label">{{ 'folders.icon-label' | translate }}</div>
          <div class="icon-picker"
               [style.--icon-color]="folderColorVar(color())">
            @for (ic of icons; track ic) {
              <button type="button"
                      class="icon-swatch"
                      [class.active]="icon() === ic"
                      (click)="icon.set(ic)">
                <mat-icon>{{ ic }}</mat-icon>
              </button>
            }
          </div>
        </div>
      </lg-flex-column>
    </lg-dialog>
  `,
  styles: [`
    .picker-label {
      font-size: 13px;
      color: var(--secondary-color);
      margin-bottom: 8px;
    }

    .color-picker {
      display: flex;
      flex-direction: column;
      gap: 4px;
    }

    .color-picker__row {
      display: flex;
      gap: 4px;
    }

    .color-swatch {
      width: 24px;
      height: 24px;
      border-radius: 50%;
      border: 2px solid transparent;
      cursor: pointer;
      padding: 0;
      transition: transform 0.15s ease, border-color 0.15s ease;

      &:hover {
        transform: scale(1.15);
      }

      &.active {
        border-color: var(--p-1);
        transform: scale(1.15);
      }
    }

    .icon-picker {
      display: flex;
      flex-wrap: wrap;
      gap: 4px;
    }

    .icon-swatch {
      width: 40px;
      height: 40px;
      border-radius: 8px;
      background: var(--card-bg, #f5f5f5);
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 0;
      border: 2px solid var(--icon-color);
      transition: background 0.15s ease, border-color 0.15s ease;

      &:hover {
        color: var(--icon-color);
      }

      &.active {
        color: var(--icon-color);
      }
    }
  `],
})
export class FolderEditDialogComponent {
  readonly onSaved = output<Folder>();
  readonly name = signal('');
  readonly color = signal<FolderColorKey>(DEFAULT_FOLDER_COLOR);
  readonly icon = signal<FolderIconKey>(DEFAULT_FOLDER_ICON);
  readonly colorGroups = FOLDER_COLOR_GROUPS;
  readonly icons = FOLDER_ICONS;
  readonly colorVar = folderColorVar;
  protected readonly folderColorVar = folderColorVar;
  private readonly _foldersRepository = inject(FoldersRepository);
  private readonly _notificationsService = inject(NotificationsService);
  private readonly _analyticsService = inject(AnalyticsService);
  private readonly _dialogRef = viewChild(DialogComponent);
  private _folder: Folder | null = null;
  readonly isEditMode = computed(() => !!this._folder);
  private _parentUuid: string | null = null;

  openCreate(parentUuid: string | null = null) {
    this._folder = null;
    this._parentUuid = parentUuid;
    this.name.set('');
    this.color.set(DEFAULT_FOLDER_COLOR);
    this.icon.set(DEFAULT_FOLDER_ICON);
    this._dialogRef()?.open();
  }

  openEdit(folder: Folder) {
    this._folder = folder;
    this._parentUuid = null;
    this.name.set(folder.name);
    this.color.set((folder.color as FolderColorKey) ?? DEFAULT_FOLDER_COLOR);
    this.icon.set((folder.icon as FolderIconKey) ?? DEFAULT_FOLDER_ICON);
    this._dialogRef()?.open();
  }

  async save() {
    const name = this.name().trim();
    if (!name) return;

    try {
      if (this._folder) {
        this._folder.update({name, color: this.color(), icon: this.icon()});
        const resp = await this._foldersRepository.updateOne(this._folder.uuid!, this._folder);
        this._dialogRef()?.close();
        this.onSaved.emit(resp.data);
        this._analyticsService.trackEvent('folder_created', {
          with_parent: !!this._folder.parent_uuid,
          color: this._folder.color,
          icon: this._folder.icon,
          name: this._folder.name,
          uuid: resp.data.uuid,
          event_category: 'folders',
          event_label: 'create',
        });
      } else {
        const folder = Folder.empty(this._parentUuid);
        folder.update({name, color: this.color(), icon: this.icon()});
        const resp = await this._foldersRepository.addOne(folder);
        if (resp.data) {
          this._dialogRef()?.close();
          this.onSaved.emit(resp.data);
          this._analyticsService.trackEvent('folder_updated', {
            uuid: resp.data.uuid,
            event_category: 'folders',
            event_label: 'update',
          });
        }
      }
    } catch (e) {
      this._notificationsService.error(errorHandler(e));
    }
  }

  reset() {
    this._folder = null;
    this._parentUuid = null;
  }
}
