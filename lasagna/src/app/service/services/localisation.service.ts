import {Injectable, signal} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';

const allowedLanguages = ['pt', 'ru', 'en'];

@Injectable({
  providedIn: 'root'
})
export class LocalisationService {
  constructor(
    private translate: TranslateService,
  ) {
    this.translate.addLangs(allowedLanguages);
    this.translate.setDefaultLang('en');

    const lang = localStorage.getItem('lang') || this._defaultLang;
    this.changeLang(lang);
  }

  private readonly _lang = signal(this._defaultLang);

  get lang() {
    return this._lang;
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
    localStorage.setItem('lang', lang);
    this._lang.set(lang);
  }
}
