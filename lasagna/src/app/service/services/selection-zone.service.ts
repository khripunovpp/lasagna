import {Injectable, signal} from '@angular/core';

@Injectable()
export class SelectionZoneService {

  constructor() {
  }

  selectionMode = signal<'default' | 'selection'>('default');
  selectAll = signal<boolean>(false);
  deselectAll = signal<boolean>(false);
  selected = signal<Set<string>>(new Set());

  onSelection() {
    this.selectionMode.set(this.selectionMode() === 'default' ? 'selection' : 'default');
    this.selected.set(new Set());
  }

  onAllSelection() {
    this.selectAll.set(true);
    this.deselectAll.set(false);
  }

  onDeselectAll() {
    this.selectAll.set(false);
    this.deselectAll.set(true);
  }

  putSelected(selected: [boolean, string]) {
    const [checked, uuid] = selected;
    this.selected.update(value => {
      if (checked) {
        value.add(uuid);
      } else {
        value.delete(uuid);
      }
      return value;
    })
  }
}
