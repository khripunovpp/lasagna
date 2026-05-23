import {ChangeDetectionStrategy, Component, computed, HostBinding, inject, input, OnInit, signal} from '@angular/core';
import {RouterLink} from '@angular/router';
import {marker as _} from '@colsen1991/ngx-translate-extract-marker';
import {TranslatePipe} from '@ngx-translate/core';
import {differenceInCalendarDays, isToday, isYesterday} from 'date-fns';
import {FlexRowComponent} from '../../../shared/view/layout/flex-row.component';
import {ButtonComponent} from '../../../shared/view/ui/button/button.component';
import {SelectionListComponent} from '../../../shared/view/ui/selection-list/selection-list.component';
import {SelectionListItemDirective} from '../../../shared/view/ui/selection-list/selection-list-item.directive';
import {ExpandDirective} from '../../../shared/view/directives/expand.directive';
import {ExpanderComponent} from '../../../shared/view/ui/expander.component';
import {
  InlineSeparatedGroupComponent,
  InlineSeparatedGroupDirective
} from '../../../shared/view/ui/inline-separated-group.component';
import {DraftForm, DraftLifecycle, NotificationsService, SelectionZoneService} from '../../../shared/service/services';
import {ProductsRepository} from '../../products/service/products.repository';
import {RecipesRepository} from '../../recipes/service/providers/recipes.repository';
import {IS_CLIENT} from '../../../shared/service/tokens/isClient.token';
import {errorHandler} from '../../../shared/helpers';
import {FlexColumnComponent} from '../../../shared/view/layout/flex-column.component';
import {RepositoryAbstract} from '../../../shared/service/services/repository/repository.abstract';

export type DraftListType = 'product' | 'recipe';

interface DraftListItem {
  uuid: string;
  name: string;
  hasOriginal: boolean;
  editedAt: number;
  lifecycle: DraftLifecycle;
  isStale: boolean;
}

type DraftGroupKey = 'today' | 'yesterday' | 'last-7-days' | 'last-30-days' | 'older';

interface DraftGroup {
  key: DraftGroupKey;
  labelKey: string;
  items: DraftListItem[];
}

const GROUP_ORDER: DraftGroupKey[] = ['today', 'yesterday', 'last-7-days', 'last-30-days', 'older'];

const GROUP_LABEL_KEYS: Record<DraftGroupKey, string> = {
  'today': _('drafts.group.today'),
  'yesterday': _('drafts.group.yesterday'),
  'last-7-days': _('drafts.group.last-7-days'),
  'last-30-days': _('drafts.group.last-30-days'),
  'older': _('drafts.group.older'),
};

function bucketFor(editedAt: number, now: Date): DraftGroupKey {
  const date = new Date(editedAt);
  if (isToday(date)) return 'today';
  if (isYesterday(date)) return 'yesterday';
  const days = differenceInCalendarDays(now, date);
  if (days <= 7) return 'last-7-days';
  if (days <= 30) return 'last-30-days';
  return 'older';
}

@Component({
  selector: 'lg-drafts-list',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    FlexRowComponent,
    ButtonComponent,
    SelectionListComponent,
    SelectionListItemDirective,
    RouterLink,
    ExpandDirective,
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

        @for (group of groups(); track group.key) {
          <div class="drafts-group-header"
               [attr.data-u2e]="strategy.u2ePrefix + '.group-' + group.key">
            {{ group.labelKey | translate }}
          </div>

          <lg-selection-list (onDeleteOne)="onDeleteOne($event.uuid)"
                             (onSelected)="selectionZoneService.putSelected($event)"
                             [attr.data-u2e]="strategy.u2ePrefix + '.card-list-' + group.key"
                             [deselectAll]="selectionZoneService.deselectAll()"
                             [flat]="true"
                             [mode]="selectionZoneService.selectionMode()"
                             [selectAll]="selectionZoneService.selectAll()">
            @for (item of group.items; track item.uuid; let index = $index) {
              <ng-template [uuid]="item.uuid" lgSelectionListItem type="draft">
                <lg-flex-row [attr.data-u2e]="strategy.u2ePrefix + '.item-' + group.key + '-' + index">
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
                      <small [attr.data-u2e]="strategy.u2ePrefix + '.item-expiring-' + group.key + '-' + index"
                             class="text-warning">
                        {{ 'drafts.expiring-in' | translate:{days: daysFromMs(item.lifecycle.remainingMs)} }}
                      </small>
                    } @else if (item.lifecycle.status === 'grace') {
                      <lg-flex-row [center]="true" [size]="'small'">
                        <small [attr.data-u2e]="strategy.u2ePrefix + '.item-grace-' + group.key + '-' + index"
                               class="text-danger"
                               lgExpand>
                          {{ 'drafts.grace-message' | translate:{hours: hoursFromMs(item.lifecycle.remainingMs)} }}
                        </small>
                        <lg-button (click)="onDeleteOne(item.uuid)"
                                   [attr.data-u2e]="strategy.u2ePrefix + '.item-delete-now-' + group.key + '-' + index"
                                   [flat]="true"
                                   [size]="'small'"
                                   [style]="'danger'">
                          {{ 'drafts.delete-now' | translate }}
                        </lg-button>
                      </lg-flex-row>
                    }

                    @if (item.isStale) {
                      <small [attr.data-u2e]="strategy.u2ePrefix + '.item-stale-' + group.key + '-' + index"
                             class="text-warning">
                        {{ 'drafts.stale-warning' | translate }}
                      </small>
                    }
                  </lg-flex-column>
                </lg-flex-row>

              </ng-template>
            }
          </lg-selection-list>
        }
      </lg-expander>
    }
  `,
  styles: [`
    .drafts-group-header {
      margin: 12px 0 4px;
      color: var(--text-color-muted, #666);
    }

    .drafts-group-header:first-of-type {
      margin-top: 0;
    }
  `],
})
export class DraftsListComponent implements OnInit {
  type = input.required<DraftListType>();
  readonly groups = computed<DraftGroup[]>(() => {
    const now = new Date();
    const buckets = new Map<DraftGroupKey, DraftListItem[]>();
    for (const item of this.items()) {
      const key = bucketFor(item.editedAt, now);
      const list = buckets.get(key) ?? [];
      list.push(item);
      buckets.set(key, list);
    }
    return GROUP_ORDER
      .filter(key => buckets.has(key))
      .map(key => ({key, labelKey: GROUP_LABEL_KEYS[key], items: buckets.get(key)!}));
  });
  protected readonly selectionZoneService = inject(SelectionZoneService);
  private readonly _productsRepository = inject(ProductsRepository);
  private readonly _recipesRepository = inject(RecipesRepository);
  private readonly _notificationsService = inject(NotificationsService);
  private readonly _isClient = inject(IS_CLIENT);
  private readonly _drafts = signal<DraftForm<any>[]>([]);
  private readonly _lifecycleByUuid = signal<Map<string, DraftLifecycle>>(new Map());
  private readonly _staleUuids = signal<Set<string>>(new Set());
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

  protected get routePrefix(): string {
    return this.type() === 'product' ? '/products/draft/' : '/recipes/draft/';
  }

  protected get u2ePrefix(): string {
    return this.type() === 'product' ? 'draft-products-list' : 'draft-recipes-list';
  }

  protected get strategy() {
    // Backwards-compat shim for template references; kept until template is migrated.
    return {routePrefix: this.routePrefix, u2ePrefix: this.u2ePrefix};
  }

  ngOnInit() {
    if (!this._isClient) return;
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
    this._repo().removeDraft(uuid)
      .then(() => {
        this._drafts.update(list => list.filter(d => d.uuid !== uuid));
      })
      .catch((e) => this._notificationsService.error(errorHandler(e)));
  }

  protected onDeleteSelected(selected: Set<string>) {
    if (!selected?.size) return;
    this._repo().removeDraft(Array.from(selected))
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
    this._repo().removeDraft(uuids)
      .then(() => {
        this._drafts.set([]);
        this._notificationsService.success('notifications.drafts.deleted');
        this.selectionZoneService.onDeselectAll();
      })
      .catch((e) => this._notificationsService.error(errorHandler(e)));
  }

  private _repo(): RepositoryAbstract<any, any> {
    return (this.type() === 'product' ? this._productsRepository : this._recipesRepository) as unknown as RepositoryAbstract<any, any>;
  }

  private async _reload() {
    try {
      const {drafts, lifecycleByUuid, staleUuids} = await this._repo().loadAndCategorizeDrafts();
      this._drafts.set(drafts);
      this._lifecycleByUuid.set(lifecycleByUuid);
      this._staleUuids.set(staleUuids);
    } catch (e) {
      this._notificationsService.error(errorHandler(e));
    }
  }
}
