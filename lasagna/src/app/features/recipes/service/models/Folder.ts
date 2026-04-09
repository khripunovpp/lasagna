import {BaseModel} from '../../../sync/service/BaseModel';
import {FolderDTO} from '../schemes/Folder.scheme';

export class Folder extends BaseModel {
  parent_uuid: string | null = null;
  color: string = 'brand-3-500';
  icon: string = 'folder';

  constructor(props: Partial<FolderDTO>) {
    super();
    this.update(props, true);
    this.dirtyToSync = props.dirtyToSync ?? false;
  }

  override update(dto: Partial<FolderDTO>, doNotMarkDirty: boolean = false) {
    super.update(dto, doNotMarkDirty);
    this.parent_uuid = dto.parent_uuid !== undefined ? dto.parent_uuid : this.parent_uuid;
    this.color = dto.color ?? this.color;
    this.icon = dto.icon ?? this.icon;
  }

  override toDTO(): FolderDTO {
    return {
      ...super.toDTO(),
      name: this.name,
      parent_uuid: this.parent_uuid,
      color: this.color,
      icon: this.icon,
    };
  }

  static fromRaw(dto: Partial<FolderDTO>): Folder {
    return new Folder(dto);
  }

  static empty(parent_uuid: string | null = null): Folder {
    return new Folder({
      parent_uuid,
      name: '',
      color: 'brand-3-500',
      icon: 'folder',
    });
  }
}
