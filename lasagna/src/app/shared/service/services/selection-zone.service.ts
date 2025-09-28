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
  private _deleteSubject = new ReplaySubject<[string, any]>();
  private _deleteManySubject = new ReplaySubject<any[]>();

  get onDelete$() {
    return this._deleteSubject.asObservable().pipe(
      shareReplay(1),
    );
  }

  get onDeleteSelected$() {
    return this._deleteManySubject.asObservable().pipe(
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

  onDeleteSelected() {
    this._deleteManySubject.next(Array.from(this.selectedData().values()));
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
