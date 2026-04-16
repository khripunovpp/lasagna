import {inject, Injectable, signal} from '@angular/core';
import {ReplaySubject, shareReplay} from 'rxjs';
import {AnalyticsService} from './analytics.service';

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
  private readonly _analyticsService = inject(AnalyticsService);

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

    this._analyticsService.trackEvent('items_selection', {
      event_category: 'selection',
      event_label: 'mode',
      mode: this.selectionMode() === 'default' ? 'selection_on' : 'selection_off',
    });
  }

  onAllSelection() {
    this.selectAll.set(true);
    this.deselectAll.set(false);

    this._analyticsService.trackEvent('items_selection_all', {
      event_category: 'selection',
      event_label: 'all',
    });
  }

  onDeselectAll() {
    this.selectAll.set(false);
    this.deselectAll.set(true);

    this._analyticsService.trackEvent('items_selection_deselect_all', {
      event_category: 'selection',
      event_label: 'all',
    });
  }

  onDeleteSelected() {
    const items = Array.from(this.selectedData().values());
    this._deleteManySubject.next(items);

    this._analyticsService.trackEvent('items_delete_selected', {
      event_category: 'selection',
      event_label: 'delete',
      items_count: items.length,
    });
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
