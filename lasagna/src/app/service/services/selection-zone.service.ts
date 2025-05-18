import {Injectable, signal} from '@angular/core';
import {CardListSelectionEvent} from '@view/ui/card/card-list.component';

export type SelectionType = CardListSelectionEvent['type']

@Injectable()
export class SelectionZoneService {

  constructor() {
  }

  selectionMode = signal<'default' | 'selection'>('default');
  selectAll = signal<Record<SelectionType, boolean>>({});
  deselectAll = signal<Record<SelectionType, boolean>>({});
  selected = signal<Record<SelectionType, Set<string>>>({});

  onSelection() {
    this.selectionMode.set(this.selectionMode() === 'default' ? 'selection' : 'default');
    this.selected.set({});
  }

  onAllSelection(
    type: SelectionType[]
  ) {
    for (const t of type) {
      this._toggleAll(true, t);
    }
  }

  onDeselectAll(
    type: SelectionType[]
  ) {
    for (const t of type) {
      this._toggleAll(false, t);
    }
  }

  putSelected(selected: CardListSelectionEvent) {
    this.selected.update(value => {
      const selectedSet = value[selected.type] ?? new Set<string>();
      if (selected.selected) {
        selectedSet.add(selected.uuid);
      } else {
        selectedSet.delete(selected.uuid);
      }
      value[selected.type] = selectedSet;
      return value;
    });
  }

  private _toggleAll(
    state: boolean,
    type: SelectionType
  ) {
    this.selectAll.update(value => {
      value[type] = state;
      return value;
    });
    this.deselectAll.update(value => {
      value[type] = !state;
      return value;
    });
  }
}
