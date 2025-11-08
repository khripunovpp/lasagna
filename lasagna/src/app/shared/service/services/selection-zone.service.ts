import {Injectable, signal} from '@angular/core';
import {ReplaySubject, shareReplay} from 'rxjs';

@Injectable()
export class SelectionZoneService {

  constructor() {
  }

  selectionMode = signal<'default' | 'selection'>('default');
  selectAll = signal<boolean>(false);
  deselectAll = signal<boolean>(false);
  selected = signal<Set<string>>(new Set());
  selectedData = signal<Map<string, any>>(new Map());
  deleteAll = signal<boolean>(false);
  deleteSelected = signal<boolean>(false);
  private _deleteSubject = new ReplaySubject<[string, any]>();

  get onDelete() {
    return this._deleteSubject.asObservable().pipe(
      shareReplay(1),
    );
  }

  onSelection() {
    this.selectionMode.set(this.selectionMode() === 'default' ? 'selection' : 'default');
    this.selected.set(new Set());
    this.selectedData.set(new Map());
  }

  onAllSelection() {
    this.selectAll.set(true);
    this.deselectAll.set(false);
  }

  onDeselectAll() {
    this.selectAll.set(false);
    this.deselectAll.set(true);
  }

  onDeleteAll() {
    this.deleteAll.set(true);
    this.deleteSelected.set(false);
  }

  onDeleteSelected() {
    this.deleteAll.set(false);
    this.deleteSelected.set(true);
  }

  putSelected(selected: [boolean, string, any]) {
    const [checked, uuid, data] = selected;
    this.selected.update(value => {
      if (checked) {
        value.add(uuid);
        this.selectedData().set(uuid, data);
      } else {
        value.delete(uuid);
        this.selectedData().delete(uuid);
      }
      return value;
    })
  }

  putDelete(key: string, data: any) {
    this._deleteSubject.next([key, data]);
  }
}
