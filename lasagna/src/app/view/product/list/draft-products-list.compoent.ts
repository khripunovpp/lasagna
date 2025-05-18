import {Component, HostBinding, inject, OnInit, signal, Signal} from '@angular/core';
import {GapRowComponent} from '@view/ui/layout/gap-row.component';
import {ButtonComponent} from '@view/ui/layout/button.component';
import {MatIcon} from '@angular/material/icon';
import {CardListComponent} from '@view/ui/card/card-list.component';
import {CardListItemDirective} from '@view/ui/card/card-list-item.directive';
import {RouterLink} from '@angular/router';
import {TimeAgoPipe} from '@view/pipes/time-ago.pipe';
import {ExpandDirective} from '@view/directives/expand.directive';
import {PullDirective} from '@view/directives/pull.directive';
import {TranslatePipe} from '@ngx-translate/core';
import {ExpanderComponent} from '@view/ui/expander.component';
import {DraftForm, SelectionZoneService} from '@service/services';
import {ProductsRepository} from '@service/repositories';
import {Product} from '@service/models/Product';
import {toSignal} from '@angular/core/rxjs-interop';
import {CATEGORIZED_PRODUCTS_LIST} from '@service/tokens/categorized-products-list.token';
import {ProductDTO, ProductScheme} from '@service/db/shemes/Product.scheme';

@Component({
  selector: 'lg-draft-products-list',
  standalone: true,
  template: `
    @if (drafts()?.length) {
      <lg-expander [closeLabel]="'drafts-close-label'|translate"
                   [openLabel]="'drafts-label'|translate:{length:drafts()?.length}">

        <lg-card-list [mode]="selectionZoneService.selectionMode()"
                      (onSelected)="selectionZoneService.putSelected($event)"
                      [selectAll]="selectionZoneService.selectAll()['draft']"
                      [deselectAll]="selectionZoneService.deselectAll()['draft']"
                      style="--card-bg: #bee5ff">
          @for (item of drafts(); track item.uuid) {
            <ng-template lgCardListItem [uuid]="item.uuid" type="draft">
              <lg-gap-row [center]="true">
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

                <lg-button [style]="'danger'"
                           [size]="'tiny'"
                           [icon]="true"
                           (click)="deleteDraft($any(item))">
                  <mat-icon aria-hidden="false"
                            fontIcon="close"></mat-icon>
                </lg-button>
              </lg-gap-row>
            </ng-template>
          }
        </lg-card-list>
      </lg-expander>
    }
  `,
  imports: [
    GapRowComponent,
    ButtonComponent,
    MatIcon,
    CardListComponent,
    CardListItemDirective,
    RouterLink,
    TimeAgoPipe,
    ExpandDirective,
    PullDirective,
    TranslatePipe,
    ExpanderComponent
  ],
  providers: [
    SelectionZoneService,
  ],
  styles: [
    `:host {
      display: block;
    }
    `
  ]
})
export class DraftProductsListCompoent
  implements OnInit {
  constructor(
    public _productsRepository: ProductsRepository,
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
    draft: DraftForm<ProductDTO>,
  ) {
    this._productsRepository.removeDraftProduct(draft.uuid);
    this.drafts.update((drafts) => {
      return drafts.filter((item) => item?.uuid !== draft.uuid);
    });
  }

  ngOnInit() {
    const draft = this._productsRepository.getDraftProducts();
    if (draft) {
      this.drafts.set(draft);
    }
  }

}
