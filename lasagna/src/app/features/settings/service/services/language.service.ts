import {inject, Injectable, signal} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import {APP_SERVER_IS_RU} from '../../../../shared/service/tokens/app-server-region.token';

const allowedLanguages = ['pt', 'ru', 'en'];

@Injectable({
  providedIn: 'root'
})
export class LanguageService {
  constructor(
    private translate: TranslateService,
  ) {
    this.translate.addLangs(allowedLanguages);
    const lang = this._defaultLang;
    this.translate.setDefaultLang(lang);
    this.changeLang(lang);
  }

  private readonly _lang = signal(this._defaultLang);
  private readonly _isRuRegion = inject(APP_SERVER_IS_RU);

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
    if (this._isRuRegion) {
      return 'ru';
    }
    return this.translate?.getBrowserLang() || "en"
  }

  getTranslate(key: string): string {
    return this.translate.instant(key);
  }

  changeLang(lang: string): void {
    try {
      if (!this.languages.includes(lang)) return;
      this.translate.use(lang);
      this._lang.set(lang);
      // Store language in localStorage for JavaScript files
      localStorage.setItem('lang', lang);
    } catch (e) {
      console.error('Error changing language:', e);
      this.translate.use(this._defaultLang);
    }
  }
}
