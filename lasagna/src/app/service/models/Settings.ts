export interface SettingGroup<T> {
  key: string
  data: T
}

export class Settings {
  constructor(
    settings?: any,
  ) {
    if (settings && Array.isArray(settings)) {

    }
  }

  settings = new Map<string, SettingGroup<unknown>>();

  static empty() {
    return new Settings();
  }

  addSetting<T>(key: string, data: T) {
    if (this.settings.has(key)) {
      throw new Error(`Setting with key ${key} already exists`);
    }
    this.settings.set(key, {key, data});
  }

  getSetting<T>(key: string): SettingGroup<T> | undefined {
    return this.settings.get(key) as SettingGroup<T>;
  }

  getAllSettings(): SettingGroup<unknown>[] {
    return Array.from(this.settings.values());
  }

  removeSetting(key: string) {
    if (!this.settings.has(key)) {
      throw new Error(`Setting with key ${key} does not exist`);
    }
    this.settings.delete(key);
  }

  toDTO() {
    return {
      settings: Array.from(this.settings.entries()).map(([key, data]) => ({
        key,
        data,
      })),
    };
  }

}
