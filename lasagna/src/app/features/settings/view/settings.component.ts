import {Component, inject, OnInit, signal} from '@angular/core';
import {ContainerComponent} from '../../../shared/view/layout/container.component';
import {TitleComponent} from '../../../shared/view/layout/title.component';
import {FadeInComponent} from '../../../shared/view/ui/fade-in.component';
import {LocalisationSettingsComponent} from './localisation/localisation-settings.component';
import {BackupSettingsComponent} from './backup/backup-settings.component';
import {TranslatePipe} from '@ngx-translate/core';
import {TabDirective} from '../../../shared/view/ui/tabs/tab.directive';
import {TabsComponent} from '../../../shared/view/ui/tabs/tabs.component';

import {SettingsService} from '../service/services/settings.service';
import {InvoicesSettingsComponent} from "./finance-settings/invoices-settings/invoices-settings.component";


import {OnboardingService} from '../../onboarding/onboarding.service';
import {LogCenterPageComponent} from './log-center/log-center-page.component';
import {CategoryListComponent} from './categories/category-product/list/category-list.component';
import {CategoryRecipeListComponent} from './categories/category-recipe/list/category-recipe-list.component';
import {FlexColumnComponent} from '../../../shared/view/layout/flex-column.component';
import {AddCategoryFormComponent} from './categories/category-product/add-category/add-category-form.component';
import {
  AddCategoryRecipeFormComponent
} from './categories/category-recipe/add-category/add-category-recipe-form.component';

@Component({
  selector: 'lg-settings',
  standalone: true,
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
  imports: [
    ContainerComponent,
    TitleComponent,
    FadeInComponent,
    LocalisationSettingsComponent,
    BackupSettingsComponent,
    TranslatePipe,
    TabDirective,
    TabsComponent,
    InvoicesSettingsComponent,
    LogCenterPageComponent,
    CategoryListComponent,
    CategoryRecipeListComponent,
    FlexColumnComponent,
    AddCategoryFormComponent,
    AddCategoryRecipeFormComponent
  ]
})
export class SettingsComponent implements OnInit {
  constructor(
    public settingsService: SettingsService,
  ) {
  }

  editedCategoryProduct = signal('')
  editedCategoryRecipe = signal('')
  private _onboardingService = inject(OnboardingService);

  ngOnInit() {
    // Отмечаем шаг настроек как завершённый при посещении страницы
    this._onboardingService.markSettingsDone();
  }
}
