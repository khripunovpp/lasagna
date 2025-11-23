import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {DexieIndexDbService} from '../db/dexie-index-db.service';
import {DEMO_MODE} from '../tokens/demo-mode.token';
import {firstValueFrom} from 'rxjs';
import {WINDOW} from '../tokens/window.token';

@Injectable({
  providedIn: 'root'
})
export class DemoService {
  constructor(
    private _http: HttpClient,
    private _dbService: DexieIndexDbService,
  ) {
  }

  isDemo = inject(DEMO_MODE);
  private readonly _window = inject(WINDOW);

  async loadDemoData() {
    try {
      if (!this.isDemo) {
        return;
      }
      if (this._window?.localStorage.getItem('demo_data_loaded') === 'true') {
        console.log('Demo data already loaded');
        return;
      }
      const dump = await firstValueFrom(this._http.get<any>('./dump/demo_dump.json'));
      await this._dbService.restoreAllData(dump);
      this._window?.localStorage.setItem('demo_data_loaded', 'true');
      console.log({dump})
    } catch (error) {
      console.error('Error loading demo data:', error);
      throw new Error('Failed to load demo data');
    }
  }

  switchOnDemoMode() {
    try {
      if (!this._window) {
        throw new Error('Window is not available');
      }
      this._window.localStorage.setItem('demo', 'true');
      const url = new URL(this._window.location.href);
      url.searchParams.delete('demo');
      this._window.history.replaceState({}, '', url.toString());
      this._window?.location.reload();
    } catch (e) {
      console.error('Error switching to demo mode:', e);
    }
  }

  switchOffDemoMode() {
    try {
      this._window?.localStorage.removeItem('demo');
      this._window?.location.reload();
    } catch (e) {
      console.error('Error switching off demo mode:', e);
    }
  }
}
