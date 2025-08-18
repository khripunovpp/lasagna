import {Component, computed, inject, model, Signal} from '@angular/core';
import {SettingsService} from '../../service/services/settings.service';
import {TranslatePipe} from '@ngx-translate/core';
import {FlexColumnComponent} from '../../../../shared/view/ui/layout/flex-column.component';
import {FlexRowComponent} from '../../../../shared/view/ui/layout/flex-row.component';
import {FormsModule} from '@angular/forms';
import {RadioComponent} from '../../../controls/form/radio.component';
import {CurrencySelectComponent} from '../../../controls/form/currency-select.component';
import {SelfStartDirective} from '../../../../shared/view/directives/self-start.directive';
import {NotificationsService} from '../../../../shared/service/services';
import {errorHandler} from '../../../../shared/helpers';
import {ControlComponent} from '../../../controls/form/control-item/control.component';


@Component({
  selector: 'lg-language-settings',
  standalone: true,
  template: `
    <lg-flex-column size="medium">
      <lg-control [label]="'language.settings.language-title' | translate">
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
      </lg-control>

      <lg-currency-select
        (ngModelChange)="changeCurrency($event)"
        [lang]="selectedLang()"
        [ngModel]="currency()">
      </lg-currency-select>
    </lg-flex-column>
  `,
  styles: [``],
  imports: [
    FlexRowComponent,
    FlexColumnComponent,
    FormsModule,
    RadioComponent,
    CurrencySelectComponent,
    TranslatePipe,
    FlexColumnComponent,
    SelfStartDirective,
    ControlComponent
  ]
})
export class LocalisationSettingsComponent {
  constructor() {
    this.selectedLangModel.update(oldValue => {
      return this._settingsService.languages.map((value => this._settingsService.settingsSignal()?.getSetting<string>('lang')?.data === value));
    });

    this.currency.set(this._settingsService.settingsSignal()?.getSetting<string>('currency')?.data || 'USD');
  }

  readonly currency = model('EUR');
  readonly langsMap: Record<string, string> = {
    'en': 'settings.language.english',
    'pt': 'settings.language.portuguese',
    'ru': 'settings.language.russian',
  };
  readonly selectedLangModel = model<boolean[]>([]);
  private readonly _notificationsService = inject(NotificationsService);
  private readonly _settingsService = inject(SettingsService);
  readonly selectedLang: Signal<string> = this._settingsService.lang;
  readonly languages = computed(() => {
    return this._settingsService.languages
      .map((lang: string) => ({
        code: lang,
        name: this.langsMap[lang] ? this.langsMap[lang] : lang,
      }));
  });

  async changeLang(lang: string) {
    try {
      await this._settingsService.changeLang(lang);
      this._notificationsService.success('settings.language.changed');
    } catch (error) {
      this._notificationsService.error(errorHandler(error));
    }
  }

  async changeCurrency(currency: string) {
    try {
      await this._settingsService.changeCurrency(String(currency).toUpperCase());
      this._notificationsService.success('settings.currency.changed');
    } catch (error) {
      this._notificationsService.error(errorHandler(error));
    }
  }
}
