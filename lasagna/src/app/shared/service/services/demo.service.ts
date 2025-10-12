import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {DexieIndexDbService} from '../db/dexie-index-db.service';
import {DEMO_MODE} from '../tokens/demo-mode.token';
import {firstValueFrom} from 'rxjs';

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

  async loadDemoData() {
    try {
      if (!this.isDemo) {
        return;
      }
      if (localStorage.getItem('demo_data_loaded') === 'true') {
        console.log('Demo data already loaded');
        return;
      }
      const dump = await firstValueFrom(this._http.get<any>('./dump/demo_dump.json'));
      await this._dbService.restoreAllData(dump);
      localStorage.setItem('demo_data_loaded', 'true');
      console.log({dump})
    } catch (error) {
      console.error('Error loading demo data:', error);
      throw new Error('Failed to load demo data');
    }
  }

  switchOnDemoMode() {
    try {
      localStorage.setItem('demo', 'true');
      const url = new URL(window.location.href);
      url.searchParams.delete('demo');
      window.history.replaceState({}, '', url.toString());
      window.location.reload();
    } catch (e) {
      console.error('Error switching to demo mode:', e);
    }
  }

  switchOffDemoMode() {
    try {
      localStorage.removeItem('demo');
      window.location.reload();
    } catch (e) {
      console.error('Error switching off demo mode:', e);
    }
  }
}
