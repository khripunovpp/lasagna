import {ChangeDetectionStrategy, Component, computed, effect, HostBinding, inject, input, output, signal} from '@angular/core';
import {TranslatePipe} from '@ngx-translate/core';
import {FlexRowComponent} from '../../shared/view/layout/flex-row.component';
import {ButtonComponent} from '../../shared/view/ui/button/button.component';
import {ExpandDirective} from '../../shared/view/directives/expand.directive';
import {DraftForm, DraftLifecycle, getDraftLifecycle} from '../../shared/service/services/draft-forms.service';
import {SettingsService} from '../settings/service/services/settings.service';
import {ProductsRepository} from '../products/service/products.repository';
import {RecipesRepository} from '../recipes/service/providers/recipes.repository';
import {IS_CLIENT} from '../../shared/service/tokens/isClient.token';

export type DraftFormBannerType = 'product' | 'recipe';

@Component({
  selector: 'lg-draft-form-banner',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    FlexRowComponent,
    ButtonComponent,
    ExpandDirective,
    TranslatePipe,
  ],
  template: `
    @if (lifecycle(); as lc) {
      @if (lc.status === 'expiring') {
        <small class="text-warning"
               data-u2e="draft-form-banner.expiring">
          {{ 'drafts.expiring-in' | translate:{ days: daysFromMs(lc.remainingMs) } }}
        </small>
      } @else if (lc.status === 'grace') {
        <lg-flex-row [center]="true" [size]="'small'">
          <small class="text-danger"
                 lgExpand
                 data-u2e="draft-form-banner.grace">
            {{ 'drafts.grace-message' | translate:{ hours: hoursFromMs(lc.remainingMs) } }}
          </small>
          @if (showDeleteButton()) {
            <lg-button [size]="'small'"
                       [style]="'danger'"
                       [flat]="true"
                       data-u2e="draft-form-banner.delete-now"
                       (click)="deleteNow.emit()">
              {{ 'drafts.delete-now' | translate }}
            </lg-button>
          }
        </lg-flex-row>
      }
    }

    @if (isStale()) {
      <small class="text-warning"
             data-u2e="draft-form-banner.stale">
        {{ 'drafts.stale-warning' | translate }}
      </small>
    }
  `,
})
export class DraftFormBannerComponent {
  type = input.required<DraftFormBannerType>();
  draft = input<DraftForm<any> | null>(null);
  showDeleteButton = input<boolean>(true);
  deleteNow = output<void>();

  private readonly _settingsService = inject(SettingsService);
  private readonly _productsRepository = inject(ProductsRepository);
  private readonly _recipesRepository = inject(RecipesRepository);
  private readonly _isClient = inject(IS_CLIENT);

  private readonly _staleSignal = signal<boolean>(false);

  readonly lifecycle = computed<DraftLifecycle | null>(() => {
    const d = this.draft();
    if (!d) return null;
    const {ttlDays} = this._settingsService.getDraftsSettings();
    return getDraftLifecycle(d, ttlDays);
  });

  readonly isStale = computed(() => this._staleSignal());

  @HostBinding('attr.hidden') get hidden() {
    const lc = this.lifecycle();
    const visible = (lc && (lc.status === 'expiring' || lc.status === 'grace')) || this.isStale();
    return visible ? null : true;
  }

  private readonly _staleEffect = effect(async () => {
    const d = this.draft();
    if (!this._isClient || !d) {
      this._staleSignal.set(false);
      return;
    }
    const originalUuid = d.meta?.['uuid'] as string | undefined;
    if (!originalUuid) {
      this._staleSignal.set(false);
      return;
    }
    try {
      const repo = this.type() === 'product' ? this._productsRepository : this._recipesRepository;
      const original = await (repo as any).getOne(originalUuid).catch(() => undefined);
      const originalUpdatedAt = original?.updatedAt as number | undefined;
      const draftEditedAt = d.updatedAt ?? d.createdAt;
      this._staleSignal.set(!!originalUpdatedAt && originalUpdatedAt > draftEditedAt);
    } catch {
      this._staleSignal.set(false);
    }
  });

  protected daysFromMs(ms: number): number {
    return Math.max(1, Math.ceil(ms / (24 * 60 * 60 * 1000)));
  }

  protected hoursFromMs(ms: number): number {
    return Math.max(1, Math.ceil(ms / (60 * 60 * 1000)));
  }
}
