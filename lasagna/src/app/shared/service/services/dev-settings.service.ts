import {inject, Injectable, signal} from '@angular/core';
import {WINDOW} from '../tokens/window.token';

export const devSettingsList = [
  'ga_analytics_disabled'
] as const;

export type DevSetting = typeof devSettingsList[number];

const STORAGE_KEY = 'dev_settings';
const allowedSettings = Object.fromEntries(devSettingsList.map(f => [f, true])) as Record<DevSetting, true>;

@Injectable({
  providedIn: 'root'
})
export class DevSettingsService {
  readonly settings = signal<[DevSetting, boolean | string][]>([]);
  private readonly _window = inject(WINDOW);

  setSetting(setting: DevSetting, value: boolean | string): void {
    if (!allowedSettings[setting]) {
      return;
    }

    try {
      const currentSettings = new Map(this.settings());
      currentSettings.set(setting, value);
      this.settings.set(Array.from(currentSettings.entries()));
      this._window?.localStorage.setItem(STORAGE_KEY, JSON.stringify(Object.fromEntries(currentSettings)));
    } catch (error) {
      console.error('Error setting dev setting:', error);
    }
  }

  async fillState() {
    try {
      const stored = this._window?.localStorage.getItem(STORAGE_KEY);
      const parsed: Partial<Record<DevSetting, boolean | string>> = JSON.parse(stored ?? '{}');
      this.settings.set(devSettingsList.map(key => ([
        key as DevSetting,
        parsed[key as DevSetting] as boolean | string
      ])));
      return this.settings();
    } catch (error) {
      console.error('Error filling dev settings state:', error);
      return [];
    }
  }

  getSettingValue(setting: DevSetting): boolean {
    const currentSettings = new Map(this.settings());
    return currentSettings.get(setting) as boolean ?? false;
  }

  getSettingString(setting: DevSetting): string | undefined {
    const currentSettings = new Map(this.settings());
    const value = currentSettings.get(setting);
    return typeof value === 'string' && value ? value : undefined;
  }
}
