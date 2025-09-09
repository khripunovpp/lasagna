import {Component, HostBinding, OnInit, signal} from '@angular/core';
import {RecipesRepository} from '../../../../shared/service/repositories';
import {DraftForm, NotificationsService, SelectionZoneService} from '../../../../shared/service/services';
import {RecipeDTO} from '../../service/schemes/Recipe.scheme';
import {ProductDTO} from '../../../products/service/Product.scheme';
import {Stores} from '../../../../shared/service/db/const/stores';
import {FlexRowComponent} from '../../../../shared/view/layout/flex-row.component';
import {ButtonComponent} from '../../../../shared/view/ui/button.component';

import {CardListComponent} from '../../../../shared/view/ui/card/card-list.component';
import {CardListItemDirective} from '../../../../shared/view/ui/card/card-list-item.directive';
import {RouterLink} from '@angular/router';
import {TimeAgoPipe} from '../../../../shared/view/pipes/time-ago.pipe';
import {ExpandDirective} from '../../../../shared/view/directives/expand.directive';
import {TranslatePipe} from '@ngx-translate/core';
import {ExpanderComponent} from '../../../../shared/view/ui/expander.component';
import {InlineSeparatedGroupComponent, InlineSeparatedGroupDirective} from '../../../../shared/view/ui/inline-separated-group.component';

@Component({
  selector: 'lg-draft-recipes-list',
  standalone: true,
  imports: [
    FlexRowComponent,
    ButtonComponent,
    CardListComponent,
    CardListItemDirective,
    RouterLink,
    TimeAgoPipe,
    ExpandDirective,
    TranslatePipe,
    ExpanderComponent,
    InlineSeparatedGroupComponent,
    InlineSeparatedGroupDirective
],
  providers: [
    SelectionZoneService,
  ],
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
                      (onDeleteOne)="deleteDraft($event?.uuid)"
                      (onSelected)="selectionZoneService.putSelected($event)"
                      [selectAll]="selectionZoneService.selectAll()"
                      [deselectAll]="selectionZoneService.deselectAll()"
                      style="--card-bg: var(--card-bg-draft)">
          @for (item of drafts(); track item.uuid) {
            <ng-template lgCardListItem [uuid]="item.uuid" type="draft">
              <lg-flex-row [center]="true">
                <a [routerLink]="'/recipes/draft/' + item?.uuid" lgExpand>
                  @if (item?.meta?.['uuid']) {
                    {{ 'draft.list-prefix.existing'|translate }}
                  } @else {
                    {{ 'draft.list-prefix.new'|translate }}
                  }
                  {{ item?.data?.name ?? '' }}
                </a>

                <small class="text-muted text-cursive">
                  {{ 'edited-at-label'|translate }} {{ (item?.updatedAt || item?.createdAt) | timeAgo }}
                </small>
              </lg-flex-row>
            </ng-template>
          }
        </lg-card-list>
      </lg-expander>
    }
  `,
})

export class DraftRecipesListComponent
  implements OnInit {
  constructor(
    private _recipesRepository: RecipesRepository,
    private _notificationsService: NotificationsService,
    public selectionZoneService: SelectionZoneService,
  ) {
  }


  drafts = signal<Array<DraftForm<RecipeDTO>>>([]);
  protected readonly Stores = Stores;

  @HostBinding('attr.hidden') get hidden() {
    return this.drafts()?.length === 0 ? true : null;
  }

  ngOnInit() {
    const draft = this._recipesRepository.getDraftRecipe();
    if (draft) {
      this.drafts.set(draft);
    }
  }

  deleteAllDrafts() {
    this._recipesRepository.removeDraftMany(this.drafts().map((item) => item.uuid)).then(() => {
      this.drafts.set([]);
      this._notificationsService.success('notifications.drafts.deleted');
    })
  }

  deletedSelectedDrafts() {
    const selected = this.selectionZoneService.selected();
    if (!selected) return;
    this._recipesRepository.removeDraftMany(Array.from(selected)).then(() => {
      this.drafts.update((drafts) => {
        return drafts.filter((item) => !selected.has(item.uuid));
      });
      this._notificationsService.success('notifications.drafts.deleted');
    })
  }

  deleteDraft(
    draftUUID?: string
  ) {
    if (!draftUUID) {
      return;
    }
    this._recipesRepository.removeDraftRecipe(draftUUID);
    this.drafts.update((drafts) => {
      return drafts.filter((item) => item?.uuid !== draftUUID);
    });
  }
}
