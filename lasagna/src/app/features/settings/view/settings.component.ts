import {Component, OnInit, inject} from '@angular/core';
import {ContainerComponent} from '../../../shared/view/layout/container.component';
import {FlexRowComponent} from '../../../shared/view/layout/flex-row.component';
import {TitleComponent} from '../../../shared/view/layout/title.component';
import {RouterLink, RouterLinkActive} from '@angular/router';
import {FadeInComponent} from '../../../shared/view/ui/fade-in.component';
import {ExpandDirective} from '../../../shared/view/directives/expand.directive';
import {LocalisationSettingsComponent} from './localisation/localisation-settings.component';
import {BackupSettingsComponent} from './backup/backup-settings.component';
import {TranslatePipe} from '@ngx-translate/core';
import {TabDirective} from '../../../shared/view/ui/tabs/tab.directive';
import {TabsComponent} from '../../../shared/view/ui/tabs/tabs.component';

import {SettingsService} from '../service/services/settings.service';
import {InvoicesSettingsComponent} from "./finance-settings/invoices-settings/invoices-settings.component";
import {CredentialSettingsComponent} from './finance-settings/credentials/credential-settings.component';
import {TaxesSettingsComponent} from './finance-settings/taxes/taxes-settings.component';
import {OnboardingService} from '../../onboarding/onboarding.service';
import {LogCenterPageComponent} from './log-center/log-center-page.component';

@Component({
  selector: 'lg-settings',
  standalone: true,
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
  imports: [
    ContainerComponent,
    FlexRowComponent,
    TitleComponent,
    RouterLink,
    RouterLinkActive,
    FadeInComponent,
    ExpandDirective,
    LocalisationSettingsComponent,
    BackupSettingsComponent,
    TranslatePipe,
    TabDirective,
    TabsComponent,
    InvoicesSettingsComponent,
    CredentialSettingsComponent,
    TaxesSettingsComponent,
    LogCenterPageComponent
  ]
})
export class SettingsComponent implements OnInit {
  private _onboardingService = inject(OnboardingService);

  constructor(
    public settingsService: SettingsService,
  ) {
  }

  ngOnInit() {
    // Отмечаем шаг настроек как завершённый при посещении страницы
    this._onboardingService.markSettingsDone();
  }
}
