import {Component} from '@angular/core';

import {ContainerComponent} from '../ui/layout/container/container.component';
import {GapRowComponent} from '../ui/layout/gap-row.component';
import {TitleComponent} from '../ui/layout/title/title.component';
import {RouterLink, RouterLinkActive} from '@angular/router';

import {FadeInComponent} from "../ui/fade-in.component";
import {ExpandDirective} from '@view/directives/expand.directive';


import {LocalisationSettingsComponent} from '@view/settings/localisation/localisation-settings.component';
import {BackupSettingsComponent} from '@view/settings/backup/backup-settings.component';
import {TranslatePipe} from '@ngx-translate/core';
import {TabDirective} from '@view/ui/tabs/tab.directive';
import {TabsComponent} from '@view/ui/tabs/tabs.component';

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
    TabsComponent
  ]
})
export class SettingsComponent {
  constructor() {
  }
}
