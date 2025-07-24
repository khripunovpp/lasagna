import {Component, computed, model, Signal} from '@angular/core';
import {SettingsService} from '../../service/services/settings.service';
import {TranslatePipe} from '@ngx-translate/core';
import {FlexColumnComponent} from '../../../../shared/view/ui/layout/flex-column.component';
import {FlexRowComponent} from '../../../../shared/view/ui/layout/flex-row.component';
import {FormsModule} from '@angular/forms';
import {RadioComponent} from '../../../../shared/view/ui/form/radio.component';
import {InputComponent} from '../../../../shared/view/ui/form/input.component';
import {TitleComponent} from '../../../../shared/view/ui/layout/title/title.component';
import {SelfStartDirective} from '../../../../shared/view/directives/self-start.directive';


@Component({
  selector: 'lg-language-settings',
  standalone: true,
  template: `
    <lg-flex-column size="medium">
      <lg-title [level]="6">{{ 'language.settings.language-title'|translate }}</lg-title>

      <section class="language-settings">
        <lg-flex-column [size]="'small'">
          @for (lang of languages(); track lang.code; let i = $index) {
            <lg-flex-row [center]="true"
                         [mobileMode]="true"
                         [size]="'small'">
              <lg-radio [markOnHover]="true"
                        [radio]="true"
                        lgSelfStart
                        [name]="'lang'"
                        [value]="lang.code"
                        [ngModel]="selectedLangModel()[i]"
                        (change)="changeLang(lang.code)"
                        [size]="'small'"
                        [noMark]="true">
                {{ lang.name | translate }}
              </lg-radio>
            </lg-flex-row>
          }
        </lg-flex-column>
      </section>

      <lg-title [level]="6">
        {{ 'language.settings.currency-title'|translate }}
        (<a href="https://en.wikipedia.org/wiki/ISO_4217" target="_blank">ISO 4217</a>)
      </lg-title>

      <lg-input (ngModelChange)="changeCurrency($event)"
                [(ngModel)]="currency"></lg-input>
    </lg-flex-column>
  `,
  styles: [``],
  imports: [
    FlexRowComponent,
    FlexColumnComponent,
    FormsModule,
    RadioComponent,
    InputComponent,
    TitleComponent,
    TranslatePipe,
    FlexColumnComponent,
    SelfStartDirective
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
    'en': 'settings.language.english',
    'pt': 'settings.language.portuguese',
    'ru': 'settings.language.russian',
  };
  selectedLang: Signal<string>;
  selectedLangModel = model<boolean[]>([]);
  languages = computed(() => {
    return this._settingsService.languages
      .map((lang: string) => ({
        code: lang,
        name: this.langsMap[lang] ? this.langsMap[lang] : lang,
      }));
  });

  changeLang(lang: string): void {
    this._settingsService.changeLang(lang);
  }

  changeCurrency(currency: string): void {
    this._settingsService.changeCurrency(String(currency).toUpperCase());
  }
}
