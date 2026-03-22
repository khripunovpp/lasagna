import { Injectable } from '@angular/core';
import { PopoverRef } from './popover.types';

@Injectable({ providedIn: 'root' })
export class PopoverService {
  private _popups = new Set<PopoverRef>();

  register(popup: PopoverRef) {
    this._popups.add(popup);
  }

  unregister(popup: PopoverRef) {
    this._popups.delete(popup);
  }

  closeOthers(except: PopoverRef) {
    this._popups.forEach(p => {
      if (p !== except && p.closeOnOther) {
        p.close();
      }
    });
  }

  closeAll() {
    [...this._popups].forEach(p => p.close());
  }
}