import {inject, Injectable, signal} from '@angular/core';
import {WINDOW} from '../tokens/window.token';

export const featureFlagsList = [
  'invoices',
  'registration',
  'synchronization',
  'synchronizationUrlStr',
] as const;

export type FeatureFlag = typeof featureFlagsList[number];

const STORAGE_KEY = 'feature_flags';
const allowedFlags = Object.fromEntries(featureFlagsList.map(f => [f, true])) as Record<FeatureFlag, true>;

@Injectable({
  providedIn: 'root'
})
export class FeatureFlagsService {
  readonly flags = signal<[FeatureFlag, boolean | string][]>([]);
  private readonly _window = inject(WINDOW);

  setFlag(flag: FeatureFlag, value: boolean | string): void {
    if (!allowedFlags[flag]) {
      return;
    }

    debugger

    try {
      const currentFlags = new Map(this.flags());
      currentFlags.set(flag, value);
      this.flags.set(Array.from(currentFlags.entries()));
      this._window?.localStorage.setItem(STORAGE_KEY, JSON.stringify(Object.fromEntries(currentFlags)));
    } catch (error) {
      console.error('Error setting feature flag:', error);
    }
  }

  async fillState() {
    try {
      const stored = this._window?.localStorage.getItem(STORAGE_KEY);
      const parsed: Partial<Record<FeatureFlag, boolean | string>> = JSON.parse(stored ?? '{}');
      console.log({parsed})
      this.flags.set(featureFlagsList.map(key => ([
        key as FeatureFlag,
        parsed[key as FeatureFlag] as boolean | string
      ])));
      console.log({flags: this.flags()})
      return this.flags();
    } catch (error) {
      console.error('Error filling feature flags state:', error);
      return [];
    }
  }

  getFlagValue(flag: FeatureFlag): boolean {
    const currentFlags = new Map(this.flags());
    return currentFlags.get(flag) as boolean ?? false;
  }
}
