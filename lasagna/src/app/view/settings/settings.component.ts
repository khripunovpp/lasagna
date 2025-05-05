import {Component} from '@angular/core';
import {CardComponent} from '../ui/card/card.component';
import {ContainerComponent} from '../ui/layout/container/container.component';
import {GapRowComponent} from '../ui/layout/gap-row.component';
import {TitleComponent} from '../ui/layout/title/title.component';
import {RouterLink, RouterLinkActive} from '@angular/router';

import {FadeInComponent} from "../ui/fade-in.component";
import {ExpandDirective} from '@view/directives/expand.directive';



import {LanguageSettingsComponent} from '@view/settings/language/language-settings.component';
import {BackupSettingsComponent} from '@view/settings/backup/backup-settings.component';
import {TranslatePipe} from '@ngx-translate/core';

@Component({
  selector: 'lg-settings',
  standalone: true,
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
  imports: [
    CardComponent,
    ContainerComponent,
    GapRowComponent,
    TitleComponent,
    RouterLink,
    RouterLinkActive,
    FadeInComponent,
    ExpandDirective,
    LanguageSettingsComponent,
    BackupSettingsComponent,
    TranslatePipe
]
})
export class SettingsComponent {
  constructor() {
  }
}
