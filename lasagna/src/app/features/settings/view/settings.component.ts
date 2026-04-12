import {Component, inject, OnInit, signal} from '@angular/core';
import {Router} from '@angular/router';
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
import {IS_CLIENT} from '../../../shared/service/tokens/isClient.token';

import {SyncSettingsComponent} from '../../sync/view/sync-settings.component';
import {CAN_SYNC, HAS_SYNC_FEATURE} from '../../sync/service/can-sync.token';
import {HAS_FEATURE} from '../service/providers/has-feature.token';
import {DeletedDataStorageViewComponent} from '../../../shared/view/deleting/deleted-data-storage-view.component';
import {AccountSettingsComponent} from '../../account/account-settings.component';
import {CredentialSettingsComponent} from './finance-settings/credentials/credential-settings.component';
import {TaxesSettingsComponent} from './finance-settings/taxes/taxes-settings.component';


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
    AddCategoryRecipeFormComponent,
    LogCenterPageComponent,
    SyncSettingsComponent,
    DeletedDataStorageViewComponent,
    AccountSettingsComponent,
    CredentialSettingsComponent,
    TaxesSettingsComponent,
  ]
})
export class SettingsComponent implements OnInit {
  constructor(
    public settingsService: SettingsService,
  ) {
  }

  isClient = inject(IS_CLIENT);
  editedCategoryProduct = signal('')
  editedCategoryRecipe = signal('')
  canSync = inject(CAN_SYNC);
  hasSyncFeature = inject(HAS_SYNC_FEATURE);
  hasAuthFeature = inject(HAS_FEATURE)('registration');
  hasInvoicesFeature = inject(HAS_FEATURE)('invoices');
  private _onboardingService = inject(OnboardingService);
  private _router = inject(Router);
  private _titleTapCount = 0;
  private _titleTapTimer: ReturnType<typeof setTimeout> | null = null;

  onTitleTap() {
    this._titleTapCount++;
    if (this._titleTapTimer) {
      clearTimeout(this._titleTapTimer);
    }
    if (this._titleTapCount >= 8) {
      this._titleTapCount = 0;
      this._router.navigate(['/dev-settings']);
      return;
    }
    this._titleTapTimer = setTimeout(() => {
      this._titleTapCount = 0;
    }, 1500);
  }

  ngOnInit() {
    if (!this.isClient) {
      return;
    }
    // Отмечаем шаг настроек как завершённый при посещении страницы
    this._onboardingService.markSettingsDone();
  }
}
