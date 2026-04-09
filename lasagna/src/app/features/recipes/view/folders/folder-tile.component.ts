import {ChangeDetectionStrategy, Component, ElementRef, inject, input, output,} from '@angular/core';
import {RouterLink} from '@angular/router';
import {MatIcon} from '@angular/material/icon';
import {TranslatePipe} from '@ngx-translate/core';
import {Folder} from '../../service/models/Folder';
import {folderColorVar} from '../../service/const/folder-colors.const';
import {ButtonComponent} from '../../../../shared/view/ui/button/button.component';
import {FlexColumnComponent} from '../../../../shared/view/layout/flex-column.component';
import {PopoverDirective} from '../../../../shared/view/ui/popover/popover.directive';

@Component({
  selector: 'lg-folder-tile',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink, MatIcon, TranslatePipe, ButtonComponent, FlexColumnComponent, PopoverDirective],
  template: `
    <a class="folder-tile"
       [routerLink]="['/recipes/folder', folder().uuid]"
       [queryParamsHandling]="'preserve'"
       [style.--folder-color]="color()">
      <div class="folder-tile__body">
        <mat-icon class="folder-tile__icon">{{ folder().icon }}</mat-icon>
        <span class="folder-tile__name">{{ folder().name }}</span>
      </div>

      <lg-button [icon]="true"
                 [silent]="true"
                 [flat]="true"
                 class="folder-tile__menu-btn"
                 [lgPopover]="popoverContent"
                 [lgPopoverCloseOnInnerClick]="true"
                 [size]="'small'">
        <mat-icon>more_vert</mat-icon>
      </lg-button>

      <ng-template #popoverContent>
        <lg-flex-column [size]="'small'">
          <lg-button (onClick)="onEdit($event)"
                     [flat]="true"
                     [size]="'small'">
            <mat-icon>edit</mat-icon>
            {{ 'folders.actions.edit' | translate }}
          </lg-button>

          <lg-button (onClick)="onDelete($event)"
                     [flat]="true"
                     [size]="'small'"
                     [style]="'danger'">
            <mat-icon>delete</mat-icon>
            {{ 'folders.actions.delete' | translate }}
          </lg-button>
        </lg-flex-column>
      </ng-template>
    </a>
  `,
  styles: [`
    :host {
      display: flex;
    }

    .folder-tile {
      position: relative;
      display: flex;
      width: 100%;
      border-radius: 32px;
      overflow: hidden;
      background: var(--card-bg);
      text-decoration: none;
      cursor: pointer;
      border: 4px solid var(--folder-color, var(--p-3));

      &:hover {
        .folder-tile__menu-btn {
          opacity: 1;
        }
      }
    }

    .folder-tile__body {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      width: 100%;
      gap: 8px;
      padding: 20px;
    }

    .folder-tile__icon {
      color: var(--folder-color, var(--p-3));
      font-size: 28px;
      width: 28px;
      height: 28px;
    }

    .folder-tile__name {
      font-size: 14px;
      font-weight: 500;
      color: var(--p-1);
      word-break: break-word;
    }

    .folder-tile__menu-btn {
      position: absolute;
      top: 16px;
      right: 12px;
      opacity: 0.5;
      transition: opacity 0.15s ease;
    }
  `],
})
export class FolderTileComponent {
  folder = input.required<Folder>();
  edit = output<Folder>();
  delete = output<Folder>();
  private readonly _elRef = inject(ElementRef);

  color() {
    return folderColorVar(this.folder().color as any);
  }

  onEdit(event: MouseEvent) {
    this.edit.emit(this.folder());
  }

  onDelete(event: MouseEvent) {
    this.delete.emit(this.folder());
  }
}
