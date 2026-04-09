import {ChangeDetectionStrategy, Component, inject, output, signal, viewChild} from '@angular/core';
import {DialogComponent} from '../../../../shared/view/ui/dialogs/dialog.component';
import {FlexColumnComponent} from '../../../../shared/view/layout/flex-column.component';
import {TranslateDirective, TranslatePipe} from '@ngx-translate/core';
import {NotificationsService} from '../../../../shared/service/services/notifications.service';
import {FoldersRepository} from '../../service/providers/folders.repository';
import {Folder} from '../../service/models/Folder';
import {errorHandler} from '../../../../shared/helpers';

@Component({
  selector: 'lg-folder-delete-dialog',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    DialogComponent,
    FlexColumnComponent,
    TranslatePipe,
    TranslateDirective,
  ],
  template: `
    <lg-dialog
      name="folder-delete"
      [confirmButtonText]="'delete-label' | translate"
      [cancelButtonText]="'cancel-label' | translate"
      [closeOnConfirm]="false"
      (onConfirm)="confirm()">
      <lg-flex-column [size]="'medium'">
        @if (loading()) {
          <span class="text-muted">{{ 'loading-label' | translate }}</span>
        } @else {
          <div [translateParams]="{name: folder()?.name}"
               [translate]="'folders.delete-message'"></div>

          @if (descendantFolders() > 0 || descendantRecipes() > 0) {
            <div class="text-muted text-small"
                 [translateParams]="{folders: descendantFolders(), recipes: descendantRecipes()}"
                 [translate]="'folders.delete-contents'"></div>
          }
        }
      </lg-flex-column>
    </lg-dialog>
  `,
})
export class FolderDeleteDialogComponent {
  private readonly _foldersRepository = inject(FoldersRepository);
  private readonly _notificationsService = inject(NotificationsService);
  private readonly _dialogRef = viewChild(DialogComponent);

  readonly onDeleted = output<Folder>();

  readonly folder = signal<Folder | null>(null);
  readonly loading = signal(false);
  readonly descendantFolders = signal(0);
  readonly descendantRecipes = signal(0);

  async open(folder: Folder) {
    this.folder.set(folder);
    this.loading.set(true);
    this._dialogRef()?.open();

    try {
      const counts = await this._foldersRepository.countDescendants(folder.uuid!);
      this.descendantFolders.set(counts.folders - 1); // exclude the folder itself
      this.descendantRecipes.set(counts.recipes);
    } catch (e) {
      this._notificationsService.error(errorHandler(e));
    } finally {
      this.loading.set(false);
    }
  }

  async confirm() {
    const folder = this.folder();
    if (!folder?.uuid) return;

    try {
      await this._foldersRepository.deleteRecursive(folder.uuid);
      this._dialogRef()?.close();
      this.onDeleted.emit(folder);
    } catch (e) {
      this._notificationsService.error(errorHandler(e));
    }
  }
}
