import {Component, computed, DestroyRef, effect, inject, OnInit, signal, viewChild} from '@angular/core';
import {RecipesRepository} from '../../service/providers/recipes.repository';
import {FlexRowComponent} from '../../../../shared/view/layout/flex-row.component';
import {ButtonComponent} from '../../../../shared/view/ui/button/button.component';
import {Router, RouterLink} from '@angular/router';
import {MatIcon} from '@angular/material/icon';
import {ContainerComponent} from '../../../../shared/view/layout/container.component';
import {TitleComponent} from '../../../../shared/view/layout/title.component';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';
import {NotificationsService, SelectionZoneService, TransferDataService} from '../../../../shared/service/services';
import {Stores} from '../../../../shared/service/db/const/stores';
import {ImportComponent} from '../../../../shared/view/ui/import/import.component';
import {ImportRowTplDirective} from '../../../../shared/view/ui/import/import-row-tpl.directive';
import {FadeInComponent} from '../../../../shared/view/ui/fade-in.component';
import {ControlsBarComponent} from '../../../../shared/view/ui/controls-bar/controls-bar.component';
import {SelectionToolsComponent} from '../../../controls/form/selection-tools.component';
import {TimeAgoPipe} from '../../../../shared/view/pipes/time-ago.pipe';
import {RecipeDTO, RecipeScheme} from '../../service/schemes/Recipe.scheme';
import {PullDirective} from '../../../../shared/view/directives/pull.directive';
import {TranslateDirective, TranslatePipe} from '@ngx-translate/core';
import {DraftRecipesListComponent} from './draft-recipes-list.component';
import {
  InlineSeparatedGroupComponent,
  InlineSeparatedGroupDirective
} from '../../../../shared/view/ui/inline-separated-group.component';
import {GroupingSortingComponent} from '../../../../shared/view/ui/grouping-sorting/grouping-sorting.component';
import {GroupingTilesComponent} from '../../../../shared/view/ui/grouping-tiles/grouping-tiles.component';
import {CATEGORIZED_RECIPES_LIST, provideRecipes} from '../../service/providers/categorized-recipes-list.token';
import {GroupingTileDirective} from '../../../../shared/view/ui/grouping-tiles/grouping-tile.directive';
import {FlexColumnComponent} from '../../../../shared/view/layout/flex-column.component';
import {CardComponent} from '../../../../shared/view/ui/card/card.component';
import {RecipesFiltersComponent} from './recipes-filters.component';
import {matchMediaSignal} from '../../../../shared/view/signals/match-media.signal';
import {mobileBreakpoint} from '../../../../shared/view/const/breakpoints';
import {IS_CLIENT} from '../../../../shared/service/tokens/isClient.token';
import {errorHandler, injectParams} from '../../../../shared/helpers';
import {SyncBadgeComponent} from '../../../../shared/view/ui/sync/sync-badge.component';
import {FeatureFlagsService} from '../../../../shared/service/services/feature-flags.service';
import {SettingsService} from '../../../settings/service/services/settings.service';
import {FoldersRepository} from '../../service/providers/folders.repository';
import {Folder} from '../../service/models/Folder';
import {FolderTilesComponent} from '../folders/folder-tiles.component';
import {FolderBreadcrumbComponent} from '../folders/folder-breadcrumb.component';
import {FolderEditDialogComponent} from '../folders/folder-edit-dialog.component';
import {FolderDeleteDialogComponent} from '../folders/folder-delete-dialog.component';
import {FolderMoveDialogComponent} from '../folders/folder-move-dialog.component';
import {ReactiveFormsModule} from '@angular/forms';
import {AsyncPipe} from '@angular/common';


@Component({
  selector: 'lg-recipes-list',
  templateUrl: './recipes-list.component.html',
  providers: [
    SelectionZoneService,
    provideRecipes,
  ],
  imports: [
    FlexRowComponent,
    ButtonComponent,
    RouterLink,
    MatIcon,
    ContainerComponent,
    TitleComponent,
    ImportComponent,
    ImportRowTplDirective,
    FadeInComponent,
    ControlsBarComponent,
    SelectionToolsComponent,
    TimeAgoPipe,
    PullDirective,
    TranslatePipe,
    DraftRecipesListComponent,
    InlineSeparatedGroupComponent,
    InlineSeparatedGroupDirective,
    GroupingSortingComponent,
    GroupingTilesComponent,
    GroupingTileDirective,
    FlexColumnComponent,
    CardComponent,
    RecipesFiltersComponent,
    TranslateDirective,
    SyncBadgeComponent,
    FolderTilesComponent,
    FolderBreadcrumbComponent,
    FolderEditDialogComponent,
    FolderDeleteDialogComponent,
    FolderMoveDialogComponent,
    ReactiveFormsModule,
    AsyncPipe,
  ],
  styles: [
    `:host {
      display: block;
    }

    .view-mode-switcher {
      display: flex;
      gap: 4px;
    }
    `
  ]
})
export class RecipesListComponent implements OnInit {
  constructor(
    private _recipesRepository: RecipesRepository,
    private _notificationsService: NotificationsService,
    private _transferDataService: TransferDataService,
    public selectionZoneService: SelectionZoneService,
  ) {
    this.selectionZoneService.onDelete$.pipe(
      takeUntilDestroyed(this.destroyRef),
    ).subscribe(([key, data]) => {
      this.deleteMany([data]);
    });

    this.selectionZoneService.onDeleteSelected$.pipe(
      takeUntilDestroyed(this.destroyRef),
    ).subscribe((items) => {
      this.deleteMany(items);
    });

    effect(() => {
      const uuid = this.folderUuid();
      const folderView = this.isFolderView();
      if (!this.isClient || !folderView) return;
      this.loadFolderContent();
    });
  }

  readonly destroyRef = inject(DestroyRef);
  readonly isClient = inject(IS_CLIENT);
  readonly recipes = inject(CATEGORIZED_RECIPES_LIST);
  readonly isMobile = matchMediaSignal(mobileBreakpoint);
  readonly folderUuid = injectParams<string | null>('folderUuid');
  readonly isInFolderRoute = computed(() => !!this.folderUuid());
  readonly viewMode = signal<'folders' | 'groupings'>('folders');
  readonly childFolders = signal<Folder[]>([]);
  readonly folderDialog = viewChild(FolderEditDialogComponent);
  readonly folderDeleteDialog = viewChild(FolderDeleteDialogComponent);
  readonly folderMoveDialog = viewChild(FolderMoveDialogComponent);
  readonly isFolderView = computed(() =>
    this.foldersAllowed() && (this.isInFolderRoute() || this.viewMode() === 'folders')
  );
  protected readonly Stores = Stores;
  protected readonly RecipeScheme = RecipeScheme;
  private readonly _featureFlags = inject(FeatureFlagsService);
  readonly foldersAllowed = computed(() => this._featureFlags.getFlagValue('folders'));
  private readonly _settingsService = inject(SettingsService);
  readonly foldersEnabled = computed(() => this._settingsService.getRecipesViewMode() === 'folders' && this.viewMode() === 'folders');
  private readonly _foldersRepository = inject(FoldersRepository);
  private readonly _router = inject(Router);

  ngOnInit() {
    if (!this.isClient) {
      return;
    }

    this.viewMode.set(this._settingsService.getRecipesViewMode());
  }

  async loadFolderContent() {
    const uuid = this.folderUuid();
    const allFolders = await this._foldersRepository.getAll(true);
    this.childFolders.set(this._foldersRepository.getChildren(uuid, allFolders));
  }

  switchViewMode(mode: 'folders' | 'groupings') {
    this.viewMode.set(mode);
    this._settingsService.setRecipesViewMode(mode);
    if (mode === 'folders') {
      this.loadFolderContent();
    }
    this.loadRecipes();
  }

  addRecipe() {
    const folderUuid = this.folderUuid();
    this._router.navigate(['/recipes/add'], {
      queryParams: folderUuid ? {folder_uuid: folderUuid} : {},
    });
  }

  createFolder() {
    this.folderDialog()?.openCreate(this.folderUuid());
  }

  onEditFolder(folder: Folder) {
    this.folderDialog()?.openEdit(folder);
  }

  onFolderSaved() {
    this.loadFolderContent();
  }

  onDeleteFolder(folder: Folder) {
    this.folderDeleteDialog()?.open(folder);
  }

  onFolderDeleted() {
    this.loadRecipes();
    this.loadFolderContent();
  }

  openMoveDialog() {
    const uuids = Array.from(this.selectionZoneService.selected());
    this.folderMoveDialog()?.open(uuids, this.folderUuid());
  }

  onRecipesMoved() {
    this.selectionZoneService.onDeselectAll();
    this.selectionZoneService.onSelection(); // exit selection mode
    this.loadRecipes();
  }

  deleteMany(recipes: RecipeDTO[]) {
    if (!recipes.length) {
      return;
    }
    this._recipesRepository.deleteMany(recipes.map(recipe => this._recipesRepository.factory(recipe)))
      .then(() => {
        this._notificationsService.success('recipe.deleted');
        this.loadRecipes();
        this.selectionZoneService.onDeselectAll();
      })
      .catch((e) => {
        this._notificationsService.error(errorHandler(e));
      });
  }

  loadRecipes() {
    return this._recipesRepository.loadAll()
      .catch((e) => {
        this._notificationsService.error(errorHandler(e));
      });
  }

  exportRecipes(
    selected: Set<string>,
  ) {
    return this._transferDataService.exportDataFor(Stores.RECIPES, {
      selected: Array.from(selected || []),
    })
      .catch((e) => {
        this._notificationsService.error(errorHandler(e));
      });
  }
}
