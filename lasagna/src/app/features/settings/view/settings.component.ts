import {Component} from '@angular/core';
import {ContainerComponent} from '../../../shared/view/ui/layout/container/container.component';
import {GapRowComponent} from '../../../shared/view/ui/layout/gap-row.component';
import {TitleComponent} from '../../../shared/view/ui/layout/title/title.component';
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


@Component({
  selector: 'lg-settings',
  standalone: true,
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
  imports: [
    ContainerComponent,
    GapRowComponent,
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
    TaxesSettingsComponent
  ]
})
export class SettingsComponent {
  constructor(
    public settingsService: SettingsService,
  ) {
  }
}
