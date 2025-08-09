import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';

export interface AppEnv {
  version: string;
}

@Injectable({ providedIn: 'root' })
export class VersionService {
  private readonly versionSignal = signal<string | null>('Unknown');

  constructor(private http: HttpClient) {}

  get version() {
    return this.versionSignal;
  }

  async load(): Promise<void> {
    try {
      const env = await this.http.get<AppEnv>('./env.json', { withCredentials: false }).toPromise();
      this.versionSignal.set(env?.version ?? 'Unknown');
    } catch {
      this.versionSignal.set('Unknown');
    }
  }
}


