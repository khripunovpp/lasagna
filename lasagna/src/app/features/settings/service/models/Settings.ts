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

  static fromRaw(dto: any) {
    if (dto instanceof Settings) {
      return dto;
    }

    const settings = new Settings();
    if (Array.isArray(dto)) {
      dto.forEach((setting: SettingGroup<unknown>) => {
        settings.addSetting(setting.key, setting.data);
      });
    } else {
      Object.entries(dto).forEach(([key, data]) => {
        settings.addSetting(key, data);
      });
    }
    return settings;
  }

  addSetting<T>(key: string, data: T) {
    this.settings.set(key, {key, data});
  }

  getSetting<T>(key: string): SettingGroup<T> | undefined {
    return this.settings.get(key) as SettingGroup<T>;
  }

  getAllSettings(): SettingGroup<unknown>[] {
    return Array.from(this.settings.values());
  }

  getSettingsMap(): Record<string, any> {
    return this.getAllSettings().reduce((acc, setting) => {
      acc[setting.key] = setting.data
      return acc;
    }, {} as Record<string, any>);
  }

  removeSetting(key: string) {
    this.settings.delete(key);
  }

  toDTO() {
    return {
      settings: Array.from(this.settings.values())
    };
  }

}
