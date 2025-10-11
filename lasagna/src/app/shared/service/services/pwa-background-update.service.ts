import {inject, Injectable} from '@angular/core';
import {SwUpdate} from '@angular/service-worker';

@Injectable({providedIn: 'root'})
export class PwaBackgroundUpdateService {
  constructor() {
  }

  private readonly _swUpdate = inject(SwUpdate);

  observe() {
    this._swUpdate.versionUpdates
      .subscribe((evt) => {
        console.log(evt);
      });
  }
}
