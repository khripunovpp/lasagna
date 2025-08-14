import {Injectable, signal} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';

const allowedLanguages = ['pt', 'ru', 'en'];

@Injectable({
  providedIn: 'root'
})
export class LanguageService {
  constructor(
    private translate: TranslateService,
  ) {
    this.translate.addLangs(allowedLanguages);
    this.translate.setDefaultLang('en');

    const lang = this._defaultLang;
    this.changeLang(lang);
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

  getTranslate(key: string): string {
    return this.translate.instant(key);
  }

  changeLang(lang: string): void {
    if (!this.languages.includes(lang)) return;
    this.translate.use(lang);
    this._lang.set(lang);
    // Store language in localStorage for JavaScript files
    localStorage.setItem('lang', lang);
  }
}
