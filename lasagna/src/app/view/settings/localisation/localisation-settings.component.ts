import {Component, computed, model, Signal} from '@angular/core';


import {GapRowComponent} from '@view/ui/layout/gap-row.component';
import {GapColumnComponent} from '@view/ui/layout/gap-column.component';

import {FormsModule} from '@angular/forms';

import {RadioComponent} from '@view/ui/form/radio.component';
import {InputComponent} from '@view/ui/form/input.component';
import {TitleComponent} from '@view/ui/layout/title/title.component';
import {SettingsService} from '@view/settings/settings.service';
import {TranslatePipe} from '@ngx-translate/core';


@Component({
  selector: 'lg-language-settings',
  standalone: true,
  template: `
    <lg-gap-column size="medium">
      <lg-title [level]="6">{{ 'language.settings.language-title'|translate }}</lg-title>

      <section class="language-settings">
        <lg-gap-column [size]="'medium'">

          <lg-gap-column [size]="'small'">
            @for (lang of languages(); track lang.code; let i = $index) {
              <lg-gap-row [center]="true" [mobileMode]="true" [size]="'small'">
                <lg-radio [markOnHover]="true"
                          [radio]="true"
                          [name]="'lang'"
                          [value]="lang.code"
                          [ngModel]="selectedLangModel()[i]"
                          (change)="changeLang(lang.code)"
                          [size]="'small'"
                          [noMark]="true">
                  {{ lang.name }}
                </lg-radio>
              </lg-gap-row>
            }
          </lg-gap-column>
        </lg-gap-column>
      </section>

      <lg-title [level]="6">
        {{ 'language.settings.currency-title'|translate }}
        (<a href="https://en.wikipedia.org/wiki/ISO_4217" target="_blank">ISO 4217</a>)
      </lg-title>

      <lg-input [(ngModel)]="currency"
                (ngModelChange)="changeCurrency($event)"
      ></lg-input>
    </lg-gap-column>
  `,
  styles: [``],
  imports: [
    GapRowComponent,
    GapColumnComponent,
    FormsModule,
    RadioComponent,
    InputComponent,
    TitleComponent,
    TranslatePipe
  ]
})
export class LocalisationSettingsComponent {
  constructor(
    private _settingsService: SettingsService,
  ) {
    this.selectedLang = this._settingsService.lang;

    this.selectedLangModel.update(oldValue => {
      return this._settingsService.languages.map((value => this.selectedLang() === value));
    });

    this.currency.set(this._settingsService.settingsSignal()?.getSetting<string>('currency')?.data || 'USD');
  }

  currency = model('EUR');
  langsMap: Record<string, string> = {
    'en': 'English',
    'pt': 'Português',
    'ru': 'Русский',
  };
  selectedLang: Signal<string>;
  selectedLangModel = model<boolean[]>([]);
  languages = computed(() => {
    return this._settingsService.languages
      .map((lang: string) => ({
        code: lang,
        name: this.langsMap[lang] || lang,
      }));
  });

  changeLang(lang: string): void {
    this._settingsService.changeLang(lang);
  }

  changeCurrency(currency: string): void {
    this._settingsService.changeCurrency(String(currency).toUpperCase());
  }
}
