import {effect, inject, Injectable, signal} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {firstValueFrom} from 'rxjs';
import {WINDOW} from '../tokens/window.token';

export interface AppEnv {
  version: string;
}

@Injectable({providedIn: 'root'})
export class VersionService {
  constructor(private http: HttpClient) {
  }

  private readonly versionSignal = signal<string>('Unknown');
  private readonly _window = inject(WINDOW);
  private _windowEffect = effect(() => {
    this._window?.document.body.setAttribute('data-build-version', this.versionSignal());
  });

  get version() {
    return this.versionSignal;
  }

  async load(): Promise<void> {
    try {
      const env = await firstValueFrom(this.http.get<AppEnv>('./ver.json', {withCredentials: false}));
      this.versionSignal.set(env?.version ?? 'Unknown');
    } catch {
      this.versionSignal.set('Unknown');
    }
  }
}


