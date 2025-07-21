import {Component, HostBinding, inject, OnInit, signal, Signal} from '@angular/core';
import {FlexRowComponent} from '../../../../shared/view/ui/layout/flex-row.component';
import {ButtonComponent} from '../../../../shared/view/ui/layout/button.component';

import {CardListComponent} from '../../../../shared/view/ui/card/card-list.component';
import {CardListItemDirective} from '../../../../shared/view/ui/card/card-list-item.directive';
import {RouterLink} from '@angular/router';
import {TimeAgoPipe} from '../../../../shared/view/pipes/time-ago.pipe';
import {ExpandDirective} from '../../../../shared/view/directives/expand.directive';
import {PullDirective} from '../../../../shared/view/directives/pull.directive';
import {TranslatePipe} from '@ngx-translate/core';
import {ExpanderComponent} from '../../../../shared/view/ui/expander.component';
import {DraftForm, NotificationsService, SelectionZoneService} from '../../../../shared/service/services';
import {ProductsRepository} from '../../../../shared/service/repositories';
import {Product} from '../../service/Product';
import {toSignal} from '@angular/core/rxjs-interop';
import {CATEGORIZED_PRODUCTS_LIST} from '../../../../shared/service/tokens/categorized-products-list.token';
import {ProductDTO, ProductScheme} from '../../service/Product.scheme';
import {InlineSeparatedGroupComponent, InlineSeparatedGroupDirective} from '../../../../shared/view/ui/inline-separated-group.component';

@Component({
  selector: 'lg-draft-products-list',
  standalone: true,
  template: `
    @if (drafts()?.length) {
      <lg-expander [closeLabel]="'drafts-close-label'|translate"
                   [openLabel]="'drafts-label'|translate:{length:drafts()?.length}">

        <lg-inline-separated-group>
          <ng-template lgInlineSeparatedGroup>
            <lg-button (click)="selectionZoneService.onSelection()"
                       [flat]="true"
                       [size]="'small'"
                       [style]="'success'">
              {{ 'select-many-label'|translate }}
            </lg-button>
          </ng-template>

          <ng-template lgInlineSeparatedGroup>
            <lg-button [flat]="true"
                       [size]="'small'"
                       [style]="'danger'"
                       (click)="deleteAllDrafts()">
              {{ 'delete-all-label' | translate }}
            </lg-button>
          </ng-template>

          @if (selectionZoneService.selected(); as selected) {
            <ng-template lgInlineSeparatedGroup>
              <lg-button [flat]="true"
                         [disabled]="!selected?.size"
                         [size]="'small'"
                         [style]="'danger'"
                         (click)="deletedSelectedDrafts()">
                {{ 'delete-selected-label' | translate }}
              </lg-button>
            </ng-template>
          }
        </lg-inline-separated-group>

        <lg-card-list [mode]="selectionZoneService.selectionMode()"
                      (onSelected)="selectionZoneService.putSelected($event)"
                      (onDeleteOne)="deleteDraft($event?.uuid)"
                      [selectAll]="selectionZoneService.selectAll()"
                      [deselectAll]="selectionZoneService.deselectAll()"
                      style="--card-bg: var(--card-bg-draft)">
          @for (item of drafts(); track item.uuid) {
            <ng-template lgCardListItem [uuid]="item.uuid" type="draft">
              <lg-flex-row [center]="true">
                <a [routerLink]="'/products/draft/' + item?.uuid" lgExpand>
                  @if (item?.meta?.['uuid']) {
                    {{ 'draft.list-prefix.existing'|translate }}
                  } @else {
                    {{ 'draft.list-prefix.new'|translate }}
                  }
                  {{ item?.data?.name || 'Unknown' }}
                </a>

                <small class="text-muted text-cursive" lgPull>
                  {{ 'edited-at-label'|translate }} {{ (item?.updatedAt || item?.createdAt) | timeAgo }}
                </small>
              </lg-flex-row>
            </ng-template>
          }
        </lg-card-list>
      </lg-expander>
    }
  `,
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
    InlineSeparatedGroupDirective
  ],
  providers: [
    SelectionZoneService,
  ],
  styles: [
    ``
  ]
})
export class DraftProductsListCompoent
  implements OnInit {
  constructor(
    public _productsRepository: ProductsRepository,
    private _notificationsService: NotificationsService,
    public selectionZoneService: SelectionZoneService,
  ) {
  }

  products: Signal<{
    category: string
    products: Product[]
  }[]> = toSignal(inject(CATEGORIZED_PRODUCTS_LIST));
  drafts = signal<(DraftForm<ProductDTO>)[]>([]);
  protected readonly ProductDbInputScheme = ProductScheme;

  @HostBinding('attr.hidden') get hidden() {
    return this.drafts()?.length === 0 ? true : null;
  }

  deleteDraft(
    draftUUID?: string
  ) {
    if (!draftUUID) {
      return;
    }
    this._productsRepository.removeDraftProduct(draftUUID);
    this.drafts.update((drafts) => {
      return drafts.filter((item) => item?.uuid !== draftUUID);
    });
  }


  deleteAllDrafts() {
    this._productsRepository.removeDraftMany(this.drafts().map((item) => item.uuid)).then(() => {
      this.drafts.set([]);
      this._notificationsService.success('Drafts deleted');
    })
  }

  deletedSelectedDrafts() {
    const selected = this.selectionZoneService.selected();
    if (!selected) return;
    this._productsRepository.removeDraftMany(Array.from(selected)).then(() => {
      this.drafts.update((drafts) => {
        return drafts.filter((item) => !selected.has(item.uuid));
      });
      this._notificationsService.success('Drafts deleted');
    })
  }


  ngOnInit() {
    const draft = this._productsRepository.getDraftProducts();
    if (draft) {
      this.drafts.set(draft);
    }
  }

}
