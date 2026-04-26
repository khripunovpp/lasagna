import {ChangeDetectionStrategy, Component, computed, HostBinding, inject, input, OnInit, signal} from '@angular/core';
import {RouterLink} from '@angular/router';
import {TranslatePipe} from '@ngx-translate/core';
import {FlexRowComponent} from '../../../shared/view/layout/flex-row.component';
import {ButtonComponent} from '../../../shared/view/ui/button/button.component';
import {CardListComponent} from '../../../shared/view/ui/card/card-list.component';
import {CardListItemDirective} from '../../../shared/view/ui/card/card-list-item.directive';
import {TimeAgoPipe} from '../../../shared/view/pipes/time-ago.pipe';
import {ExpandDirective} from '../../../shared/view/directives/expand.directive';
import {PullDirective} from '../../../shared/view/directives/pull.directive';
import {ExpanderComponent} from '../../../shared/view/ui/expander.component';
import {InlineSeparatedGroupComponent, InlineSeparatedGroupDirective} from '../../../shared/view/ui/inline-separated-group.component';
import {SelectionZoneService} from '../../../shared/service/services/selection-zone.service';
import {NotificationsService} from '../../../shared/service/services/notifications.service';
import {DraftForm, DraftFormsService, DraftLifecycle} from '../../../shared/service/services/draft-forms.service';
import {ProductsRepository} from '../../products/service/products.repository';
import {RecipesRepository} from '../../recipes/service/providers/recipes.repository';
import {SettingsService} from '../../settings/service/services/settings.service';
import {IS_CLIENT} from '../../../shared/service/tokens/isClient.token';
import {errorHandler} from '../../../shared/helpers';
import {FlexColumnComponent} from '../../../shared/view/layout/flex-column.component';

export type DraftListType = 'product' | 'recipe';

interface DraftListItem {
  uuid: string;
  name: string;
  hasOriginal: boolean;
  editedAt: number;
  lifecycle: DraftLifecycle;
  isStale: boolean;
}

interface DraftStrategy {
  store: string;
  routePrefix: string;
  u2ePrefix: string;
  removeOne: (uuid: string) => Promise<unknown> | void;
  removeMany: (uuids: string[]) => Promise<unknown>;
  getOriginalUpdatedAt: (uuid: string) => Promise<number | undefined>;
}

@Component({
  selector: 'lg-drafts-list',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    FlexRowComponent,
    ButtonComponent,
    CardListComponent,
    CardListItemDirective,
    RouterLink,
    TimeAgoPipe,
    ExpandDirective,
    PullDirective,
    TranslatePipe,
    ExpanderComponent,
    InlineSeparatedGroupComponent,
    InlineSeparatedGroupDirective,
    FlexColumnComponent,
  ],
  providers: [SelectionZoneService],
  template: `
    @if (items().length) {
      <lg-expander [attr.data-u2e]="strategy.u2ePrefix + '.expander'"
                   [closeLabel]="'drafts-close-label' | translate"
                   [openLabel]="'drafts-label' | translate:{length: items().length}">

        <lg-inline-separated-group>
          <ng-template lgInlineSeparatedGroup>
            <lg-button (click)="selectionZoneService.onSelection()"
                       [flat]="true"
                       [size]="'small'"
                       [style]="'success'">
              {{ 'select-many-label' | translate }}
            </lg-button>
          </ng-template>

          <ng-template lgInlineSeparatedGroup>
            <lg-button (click)="onDeleteAll()"
                       [flat]="true"
                       [size]="'small'"
                       [style]="'danger'">
              {{ 'delete-all-label' | translate }}
            </lg-button>
          </ng-template>

          @if (selectionZoneService.selected(); as selected) {
            <ng-template lgInlineSeparatedGroup>
              <lg-button (click)="onDeleteSelected(selected)"
                         [disabled]="!selected?.size"
                         [flat]="true"
                         [size]="'small'"
                         [style]="'danger'">
                {{ 'delete-selected-label' | translate }}
              </lg-button>
            </ng-template>
          }
        </lg-inline-separated-group>

        <lg-card-list (onDeleteOne)="onDeleteOne($event.uuid)"
                      (onSelected)="selectionZoneService.putSelected($event)"
                      [attr.data-u2e]="strategy.u2ePrefix + '.card-list'"
                      [deselectAll]="selectionZoneService.deselectAll()"
                      [mode]="selectionZoneService.selectionMode()"
                      [selectAll]="selectionZoneService.selectAll()"
                      style="--card-list-bg: var(--card-bg-draft)">
          @for (item of items(); track item.uuid; let index = $index) {
            <ng-template [uuid]="item.uuid" lgCardListItem type="draft">
              <lg-flex-row [attr.data-u2e]="strategy.u2ePrefix + '.item-' + index">
                <lg-flex-column [size]="'small'">
                  <a [routerLink]="strategy.routePrefix + item.uuid" lgExpand>
                    @if (item.hasOriginal) {
                      {{ 'draft.list-prefix.existing' | translate }}
                    } @else {
                      {{ 'draft.list-prefix.new' | translate }}
                    }
                    {{ item.name }}
                  </a>


                  @if (item.lifecycle.status === 'expiring') {
                    <small [attr.data-u2e]="strategy.u2ePrefix + '.item-expiring-' + index"
                           class="text-warning">
                      {{ 'drafts.expiring-in' | translate:{days: daysFromMs(item.lifecycle.remainingMs)} }}
                    </small>
                  } @else if (item.lifecycle.status === 'grace') {
                    <lg-flex-row [center]="true" [size]="'small'">
                      <small [attr.data-u2e]="strategy.u2ePrefix + '.item-grace-' + index"
                             class="text-danger"
                             lgExpand>
                        {{ 'drafts.grace-message' | translate:{hours: hoursFromMs(item.lifecycle.remainingMs)} }}
                      </small>
                      <lg-button (click)="onDeleteOne(item.uuid)"
                                 [attr.data-u2e]="strategy.u2ePrefix + '.item-delete-now-' + index"
                                 [flat]="true"
                                 [size]="'small'"
                                 [style]="'danger'">
                        {{ 'drafts.delete-now' | translate }}
                      </lg-button>
                    </lg-flex-row>
                  }

                  @if (item.isStale) {
                    <small [attr.data-u2e]="strategy.u2ePrefix + '.item-stale-' + index"
                           class="text-warning">
                      {{ 'drafts.stale-warning' | translate }}
                    </small>
                  }
                </lg-flex-column>

                <small [attr.data-u2e]="strategy.u2ePrefix + '.item-edited-at-' + index" class="text-muted text-cursive"
                       lgPull>
                  {{ 'edited-at-label' | translate }} {{ item.editedAt | timeAgo }}
                </small>
              </lg-flex-row>

            </ng-template>
          }
        </lg-card-list>
      </lg-expander>
    }
  `,
})
export class DraftsListComponent implements OnInit {
  type = input.required<DraftListType>();

  protected readonly selectionZoneService = inject(SelectionZoneService);
  private readonly _draftFormsService = inject(DraftFormsService);
  private readonly _settingsService = inject(SettingsService);
  private readonly _productsRepository = inject(ProductsRepository);
  private readonly _recipesRepository = inject(RecipesRepository);
  private readonly _notificationsService = inject(NotificationsService);
  private readonly _isClient = inject(IS_CLIENT);

  private readonly _drafts = signal<DraftForm<any>[]>([]);
  private readonly _lifecycleByUuid = signal<Map<string, DraftLifecycle>>(new Map());
  private readonly _staleUuids = signal<Set<string>>(new Set());

  protected strategy: DraftStrategy = null as unknown as DraftStrategy;

  readonly items = computed<DraftListItem[]>(() => {
    const lifecycles = this._lifecycleByUuid();
    const stale = this._staleUuids();
    return this._drafts()
      .map<DraftListItem>((d) => ({
        uuid: d.uuid,
        name: (d.data as any)?.name ?? '',
        hasOriginal: !!d.meta?.['uuid'],
        editedAt: d.updatedAt ?? d.createdAt,
        lifecycle: lifecycles.get(d.uuid) ?? {status: 'ok', remainingMs: 0},
        isStale: stale.has(d.uuid),
      }))
      .sort((a, b) => b.editedAt - a.editedAt);
  });

  @HostBinding('attr.hidden') get hidden() {
    return this.items().length === 0 ? true : null;
  }

  ngOnInit() {
    if (!this._isClient) return;
    this.strategy = this._buildStrategy(this.type());
    void this._reload();
  }

  protected daysFromMs(ms: number): number {
    return Math.max(1, Math.ceil(ms / (24 * 60 * 60 * 1000)));
  }

  protected hoursFromMs(ms: number): number {
    return Math.max(1, Math.ceil(ms / (60 * 60 * 1000)));
  }

  protected onDeleteOne(uuid: string) {
    if (!uuid) return;
    Promise.resolve(this.strategy.removeOne(uuid))
      .then(() => {
        this._drafts.update(list => list.filter(d => d.uuid !== uuid));
      })
      .catch((e) => this._notificationsService.error(errorHandler(e)));
  }

  protected onDeleteSelected(selected: Set<string>) {
    if (!selected?.size) return;
    this.strategy.removeMany(Array.from(selected))
      .then(() => {
        this._drafts.update(list => list.filter(d => !selected.has(d.uuid)));
        this._notificationsService.success('notifications.drafts.deleted');
        this.selectionZoneService.onDeselectAll();
      })
      .catch((e) => this._notificationsService.error(errorHandler(e)));
  }

  protected onDeleteAll() {
    const uuids = this._drafts().map(d => d.uuid);
    if (!uuids.length) return;
    this.strategy.removeMany(uuids)
      .then(() => {
        this._drafts.set([]);
        this._notificationsService.success('notifications.drafts.deleted');
        this.selectionZoneService.onDeselectAll();
      })
      .catch((e) => this._notificationsService.error(errorHandler(e)));
  }

  private async _reload() {
    const {enabled, ttlDays} = this._settingsService.getDraftsSettings();
    if (!enabled) {
      this._drafts.set([]);
      this._lifecycleByUuid.set(new Map());
      this._staleUuids.set(new Set());
      return;
    }
    try {
      const {drafts, lifecycleByUuid, staleUuids} = await this._draftFormsService.loadAndCategorize(
        this.strategy.store,
        ttlDays,
        this.strategy.getOriginalUpdatedAt,
      );
      this._drafts.set(drafts);
      this._lifecycleByUuid.set(lifecycleByUuid);
      this._staleUuids.set(staleUuids);
    } catch (e) {
      this._notificationsService.error(errorHandler(e));
    }
  }

  private _buildStrategy(type: DraftListType): DraftStrategy {
    if (type === 'product') {
      const repo = this._productsRepository;
      return {
        store: 'draft_products',
        routePrefix: '/products/draft/',
        u2ePrefix: 'draft-products-list',
        removeOne: (uuid) => repo.removeDraftProduct(uuid),
        removeMany: (uuids) => repo.removeDraftMany(uuids) as Promise<unknown>,
        getOriginalUpdatedAt: async (uuid) => {
          const original = await repo.getOne(uuid).catch(() => undefined);
          return (original as any)?.updatedAt;
        },
      };
    }
    const repo = this._recipesRepository;
    return {
      store: 'draft_recipes',
      routePrefix: '/recipes/draft/',
      u2ePrefix: 'draft-recipes-list',
      removeOne: (uuid) => repo.removeDraftRecipe(uuid),
      removeMany: (uuids) => repo.removeDraftMany(uuids) as Promise<unknown>,
      getOriginalUpdatedAt: async (uuid) => {
        const original = await repo.getOne(uuid).catch(() => undefined);
        return (original as any)?.updatedAt;
      },
    };
  }
}
