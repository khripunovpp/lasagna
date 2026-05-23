import {ChangeDetectionStrategy, Component, computed, effect, HostBinding, inject, input, signal} from '@angular/core';
import {Router, RouterLink} from '@angular/router';
import {TranslatePipe} from '@ngx-translate/core';
import {FlexRowComponent} from '../../shared/view/layout/flex-row.component';
import {ButtonComponent} from '../../shared/view/ui/button/button.component';
import {ExpandDirective} from '../../shared/view/directives/expand.directive';
import {DraftForm, DraftLifecycle, getDraftLifecycle} from '../../shared/service/services/draft-forms.service';
import {NotificationsService} from '../../shared/service/services/notifications.service';
import {SettingsService} from '../settings/service/services/settings.service';
import {IS_CLIENT} from '../../shared/service/tokens/isClient.token';
import {errorHandler} from '../../shared/helpers';
import {ProductsRepository} from '../products/service/products.repository';
import {RecipesRepository} from '../recipes/service/providers/recipes.repository';
import {RepositoryAbstract, RepositoryDraftType} from '../../shared/service/services/repository/repository.abstract';

export type DraftStatusType = RepositoryDraftType;

/**
 * Inline draft-status notice rendered next to a product/recipe form. The
 * component picks its display from inputs:
 *
 * - {@link draft} is set — the user is editing the draft itself. Renders
 *   lifecycle warnings (`expiring`, `grace`) and, in grace, an optional
 *   "Delete now" button that removes the draft and navigates to the entity
 *   list. Also shows a stale warning when the original entity has been
 *   edited after the draft was last saved.
 *
 * - {@link draft} is null but {@link originalUuid} is set — the user is on
 *   the edit route of an existing entity. The component loads the closest
 *   draft for that uuid via the matching repository and renders a banner:
 *     - fresh draft → "this {entity} has an unsaved draft" + a link to the
 *       draft route;
 *     - stale draft → warning that saving the draft would overwrite newer
 *       changes + an inline "Delete the draft" action that removes the draft
 *       and reloads the next closest.
 *   Multi-draft case is conveyed by the `count` placeholder in the `-many`
 *   translation variant.
 *
 * The host element auto-hides (`[attr.hidden]`) when there is nothing to show,
 * so callers can render it unconditionally without producing phantom flex gaps.
 */
@Component({
  selector: 'lg-draft-status',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    FlexRowComponent,
    ButtonComponent,
    ExpandDirective,
    TranslatePipe,
    RouterLink,
  ],
  styles: [`
    :host {
      display: block;
      padding: 10px 14px;
      border-radius: 8px;
      border: 1px solid var(--warning-color);
      background: var(--warning-bg);
      line-height: 1.4;
    }

    :host([hidden]) {
      display: none !important;
    }

    :host(.severity-danger) {
      border-color: var(--danger-color);
      background: var(--danger-bg);
    }

    :host small {
      display: block;
      color: inherit;
    }

    :host a {
      cursor: pointer;
      font-weight: 600;
      text-decoration: underline;
      margin-left: 4px;
      color: inherit;
    }
  `],
  template: `
    @if (draft()) {
      @if (lifecycle(); as lc) {
        @if (lc.status === 'expiring') {
          <small class="text-warning"
                 data-u2e="draft-status.expiring">
            {{ 'drafts.expiring-in' | translate:{ days: daysFromMs(lc.remainingMs) } }}
          </small>
        } @else if (lc.status === 'grace') {
          <lg-flex-row [center]="true" [size]="'small'">
            <small class="text-danger"
                   lgExpand
                   data-u2e="draft-status.grace">
              {{ 'drafts.grace-message' | translate:{ hours: hoursFromMs(lc.remainingMs) } }}
            </small>
            @if (showDeleteButton()) {
              <lg-button [size]="'small'"
                         [style]="'danger'"
                         [flat]="true"
                         data-u2e="draft-status.delete-now"
                         (click)="onDeleteCurrentDraft()">
                {{ 'drafts.delete-now' | translate }}
              </lg-button>
            }
          </lg-flex-row>
        }
      }

      @if (draftStale()) {
        <small class="text-warning"
               data-u2e="draft-status.stale">
          {{ 'drafts.stale-warning' | translate }}
        </small>
      }
    } @else if (closest(); as info) {
      <small class="text-warning"
             data-u2e="draft-status.existing">
        @if (info.isStale) {
          {{ (info.total > 1 ? keys().staleMessageMany : keys().staleMessage) | translate:{count: info.total} }}
          <a (click)="onDropClosest()"
             data-u2e="draft-status.existing-delete"
             style="cursor: pointer; text-decoration: underline">
            {{ (info.total > 1 ? keys().deleteMany : keys().delete) | translate:{count: info.total} }}
          </a>
        } @else {
          {{ (info.total > 1 ? keys().messageMany : keys().message) | translate:{count: info.total} }}
          <a [routerLink]="openLink(info.draft.uuid)"
             data-u2e="draft-status.existing-switch">
            {{ keys().switch | translate }}
          </a>
        }
      </small>
    }
  `,
})
export class DraftStatusComponent {
  type = input.required<DraftStatusType>();
  /** Active draft, used on the draft route. */
  draft = input<DraftForm<any> | null>(null);
  /** Original entity uuid, used on the edit route to self-load the closest draft. */
  originalUuid = input<string | undefined>(undefined);
  showDeleteButton = input<boolean>(true);

  private readonly _settingsService = inject(SettingsService);
  private readonly _productsRepository = inject(ProductsRepository);
  private readonly _recipesRepository = inject(RecipesRepository);
  private readonly _notificationsService = inject(NotificationsService);
  private readonly _router = inject(Router);
  private readonly _isClient = inject(IS_CLIENT);

  private readonly _draftStale = signal<boolean>(false);
  private readonly _closest = signal<{
    draft: DraftForm<any>;
    isStale: boolean;
    total: number;
  } | null>(null);

  readonly lifecycle = computed<DraftLifecycle | null>(() => {
    const d = this.draft();
    if (!d) return null;
    const {ttlDays} = this._settingsService.getDraftsSettings();
    return getDraftLifecycle(d, ttlDays);
  });

  readonly draftStale = computed(() => this._draftStale());
  readonly closest = computed(() => this._closest());

  protected readonly keys = computed(() => {
    const root = this.type() === 'product'
      ? 'product.form.existing-draft'
      : 'recipe.form.existing-draft';
    return {
      message: `${root}.message`,
      messageMany: `${root}.message-many`,
      staleMessage: `${root}.stale-message`,
      staleMessageMany: `${root}.stale-message-many`,
      switch: `${root}.switch`,
      delete: `${root}.delete`,
      deleteMany: `${root}.delete-many`,
    };
  });

  @HostBinding('attr.hidden') get hidden() {
    if (this.draft()) {
      const lc = this.lifecycle();
      const visible = (lc && (lc.status === 'expiring' || lc.status === 'grace')) || this.draftStale();
      return visible ? null : true;
    }
    return this._closest() ? null : true;
  }

  @HostBinding('class.severity-danger') get severityDanger() {
    if (this.draft()) {
      // Grace lifecycle and stale draft warrant the strong (danger) tint.
      return this.lifecycle()?.status === 'grace' || this.draftStale();
    }
    return !!this._closest()?.isStale;
  }

  protected onDropClosest() {
    const info = this._closest();
    const uuid = this.originalUuid();
    if (!info || !uuid) return;
    // Stale closest implies every sibling draft for the same original is also
    // stale (older edited-at) — wipe them all so the user doesn't have to
    // click N times.
    const removal = info.isStale
      ? this._repo().removeDraftsByOriginal(uuid)
      : this._repo().removeDraft(info.draft.uuid);
    Promise.resolve(removal)
      .then(() => {
        this._notificationsService.success('notifications.drafts.deleted');
        return this._reloadClosest();
      })
      .catch(e => this._notificationsService.error(errorHandler(e)));
  }

  protected onDeleteCurrentDraft() {
    const d = this.draft();
    if (!d) return;
    this._repo().removeDraft(d.uuid)
      .then(() => {
        this._notificationsService.success('notifications.drafts.deleted');
        void this._router.navigate([this.type() === 'product' ? '/products' : '/recipes']);
      })
      .catch(e => this._notificationsService.error(errorHandler(e)));
  }

  protected openLink(uuid: string): string {
    return this.type() === 'product'
      ? `/products/draft/${uuid}`
      : `/recipes/draft/${uuid}`;
  }

  protected daysFromMs(ms: number): number {
    return Math.max(1, Math.ceil(ms / (24 * 60 * 60 * 1000)));
  }

  protected hoursFromMs(ms: number): number {
    return Math.max(1, Math.ceil(ms / (60 * 60 * 1000)));
  }

  private _repo(): RepositoryAbstract<any, any> {
    return (this.type() === 'product' ? this._productsRepository : this._recipesRepository) as unknown as RepositoryAbstract<any, any>;
  }

  private async _reloadClosest(): Promise<void> {
    const uuid = this.originalUuid();
    if (!this._isClient || !uuid) {
      this._closest.set(null);
      return;
    }
    try {
      const result = await this._repo().getClosestDraft(uuid);
      this._closest.set(result ? {draft: result.draft, isStale: result.isStale, total: result.total} : null);
    } catch (e) {
      this._closest.set(null);
      this._notificationsService.error(errorHandler(e));
    }
  }

  private readonly _editEffect = effect(() => {
    // Edit-mode lookup runs only when there's no active draft on the form.
    if (this.draft()) {
      this._closest.set(null);
      return;
    }
    void this._reloadClosest();
  });

  private readonly _draftStaleEffect = effect(async () => {
    const d = this.draft();
    if (!this._isClient || !d) {
      this._draftStale.set(false);
      return;
    }
    const originalUuid = d.meta?.['uuid'] as string | undefined;
    if (!originalUuid) {
      this._draftStale.set(false);
      return;
    }
    try {
      const originalUpdatedAt = await this._repo().getOriginalUpdatedAt(originalUuid);
      const draftEditedAt = d.updatedAt ?? d.createdAt;
      this._draftStale.set(!!originalUpdatedAt && originalUpdatedAt > draftEditedAt);
    } catch {
      this._draftStale.set(false);
    }
  });
}
