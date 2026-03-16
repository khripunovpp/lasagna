import {inject, Injectable, signal} from '@angular/core';
import {WINDOW} from '../tokens/window.token';

export const featureFlagsList = [
  'invoices',
  'registration',
  'synchronization',
] as const;

export type FeatureFlag = typeof featureFlagsList[number];

const STORAGE_KEY = 'feature_flags';

@Injectable({
  providedIn: 'root'
})
export class FeatureFlagsService {
  readonly flags = signal<[FeatureFlag, boolean][]>([]);
  private readonly _window = inject(WINDOW);

  setFlag(flag: FeatureFlag, value: boolean): void {
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
      const parsed: Partial<Record<FeatureFlag, boolean>> = JSON.parse(stored ?? '{}');
      this.flags.set(featureFlagsList.map(key => ([
        key as FeatureFlag,
        parsed[key as FeatureFlag] as boolean
      ])));
      return this.flags();
    } catch (error) {
      console.error('Error filling feature flags state:', error);
      return [];
    }
  }

  getFlagValue(flag: FeatureFlag): boolean {
    const currentFlags = new Map(this.flags());
    return currentFlags.get(flag) ?? false;
  }
}
