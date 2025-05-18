import {Injectable, signal} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import {SettingsService} from '@view/settings/settings.service';

const allowedLanguages = ['pt', 'ru', 'en'];

@Injectable({
  providedIn: 'root'
})
export class LocalisationService {
  constructor(
    private translate: TranslateService,
    private _settingsService: SettingsService,
  ) {
    this.translate.addLangs(allowedLanguages);
    this.translate.setDefaultLang('en');

    const setting = this._settingsService.settingsModel?.getSetting<string>('lang');
    const lang = setting?.data || this._defaultLang;
    this.changeLang(lang);
  }

  getTranslate(key: string): string {
    return this.translate.instant(key);
  }

  private readonly _lang = signal(this._defaultLang);

  get lang() {
    return this._lang;
  }

  get currentLang(): string {
    return this.translate.currentLang;
  }

  get languages(): string[] {
    return this.translate.getLangs();
  }

  private get _defaultLang(): string {
    return this.translate?.getBrowserLang() || "en"
  }

  changeLang(lang: string): void {
    if (!this.languages.includes(lang)) return;
    this.translate.use(lang);
    this._settingsService.settingsModel?.addSetting('lang', lang);
    this._settingsService.saveSettings();
    this._lang.set(lang);
  }
}
