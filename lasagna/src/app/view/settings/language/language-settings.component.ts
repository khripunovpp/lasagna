import {Component, computed, model, Signal} from '@angular/core';
import {LocalisationService} from '@service/services/localisation.service';
import {TitleComponent} from '@view/ui/layout/title/title.component';
import {CardComponent} from '@view/ui/card/card.component';
import {GapRowComponent} from '@view/ui/layout/gap-row.component';
import {GapColumnComponent} from '@view/ui/layout/gap-column.component';
import {CheckboxComponent} from '@view/ui/form/chckbox.component';
import {FormsModule} from '@angular/forms';
import {JsonPipe} from '@angular/common';


@Component({
  selector: 'lg-language-settings',
  standalone: true,
  template: `
      <section class="language-settings">
          <lg-card>
              <lg-gap-column [size]="'medium'">

                  <lg-gap-column [size]="'small'">
                      @for (lang of languages();track lang.code;let i= $index) {
                          <lg-gap-row [center]="true" [mobileMode]="true" [size]="'small'">
                              <lg-checkbox [markOnHover]="true"
                                           [radio]="true"
                                           [name]="'lang'"
                                           [value]="lang.code"
                                           [ngModel]="selectedLangModel()[i]"
                                           (change)="changeLang(lang.code)"
                                           [size]="'small'"
                                           [noMark]="true">
                                  {{ lang.name }}
                              </lg-checkbox>
                          </lg-gap-row>
                      }
                  </lg-gap-column>
              </lg-gap-column>
          </lg-card>
      </section>
  `,
  styles: [``],
  imports: [
    TitleComponent,
    CardComponent,
    GapRowComponent,
    GapColumnComponent,
    CheckboxComponent,
    FormsModule,
    JsonPipe
  ]
})
export class LanguageSettingsComponent {
  constructor(
    private _localisationService: LocalisationService,
  ) {
    this.selectedLang = this._localisationService.lang;


    this.selectedLangModel.update(oldValue => {
      return this._localisationService.languages.map((value => this.selectedLang() === value));
    })

    console.log({
      selectedLang: this.selectedLang(),
      selectedLangModel: this.selectedLangModel(),
      languages: this._localisationService.languages,
    })
  }

  langsMap: Record<string, string> = {
    'en': 'English',
    'pt': 'Português',
    'ru': 'Русский',
  };
  selectedLang: Signal<string>;
  selectedLangModel = model<boolean[]>([]);

  // get languages(): {
  //   code: string
  //   name: string
  // }[] {
  //   return this._localisationService.languages
  //     .filter((lang: string) => lang !== this._localisationService.lang)
  //     .map((lang: string) => ({
  //       code: lang,
  //       name: this.langsMap[lang] || lang,
  //     }));
  // }


  languages = computed(() => {
    return this._localisationService.languages
      .map((lang: string) => ({
        code: lang,
        name: this.langsMap[lang] || lang,
      }));
  });

  changeLang(lang: string): void {
    this._localisationService.changeLang(lang);
  }
}
