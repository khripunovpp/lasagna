import {ChangeDetectionStrategy, Component, HostBinding, inject, input, output, signal} from '@angular/core';
import {Folder} from '../../service/models/Folder';
import {FolderTileComponent} from './folder-tile.component';
import {FoldersRepository} from '../../service/providers/folders.repository';

@Component({
  selector: 'lg-folder-tiles',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [FolderTileComponent],
  template: `
    @if (folders().length) {
      <div class="folder-tiles">
        @for (folder of sorted(); track folder.uuid) {
          <lg-folder-tile [folder]="folder"
                          (edit)="edit.emit($event)"
                          (delete)="delete.emit($event)"/>
        }
      </div>
    }
  `,
  styles: [`
    .folder-tiles {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
      gap: 16px;
    }
  `],
})
export class FolderTilesComponent {
  folders = input.required<Folder[]>();
  edit = output<Folder>();
  delete = output<Folder>();
  readonly counts = signal<Record<string, number>>({});
  private readonly _foldersRepository = inject(FoldersRepository);

  @HostBinding('attr.hidden') get hidden() {
    return this.folders().length === 0 ? '' : null;
  }

  get sorted(): () => Folder[] {
    return () => [...this.folders()].sort((a, b) => a.name.localeCompare(b.name));
  }
}
