import {Component, HostBinding, OnInit, signal} from '@angular/core';
import {RecipesRepository} from '@service/repositories';
import {DraftForm, NotificationsService, SelectionZoneService} from '@service/services';
import {RecipeDTO} from '@service/db/shemes/Recipe.scheme';
import {ProductDTO} from '@service/db/shemes/Product.scheme';
import {Stores} from '@service/db/const/stores';
import {GapRowComponent} from '@view/ui/layout/gap-row.component';
import {ButtonComponent} from '@view/ui/layout/button.component';
import {MatIcon} from '@angular/material/icon';
import {CardListComponent} from '@view/ui/card/card-list.component';
import {CardListItemDirective} from '@view/ui/card/card-list-item.directive';
import {RouterLink} from '@angular/router';
import {TimeAgoPipe} from '@view/pipes/time-ago.pipe';
import {ExpandDirective} from '@view/directives/expand.directive';
import {TranslatePipe} from '@ngx-translate/core';
import {ExpanderComponent} from '@view/ui/expander.component';
import {InlineSeparatedGroupComponent, InlineSeparatedGroupDirective} from '@view/ui/inline-separated-group.component';

@Component({
  selector: 'lg-draft-recipes-list',
  standalone: true,
  imports: [
    GapRowComponent,
    ButtonComponent,
    MatIcon,
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
              Delete all
            </lg-button>
          </ng-template>

          @if (selectionZoneService.selected(); as selected) {
            <ng-template lgInlineSeparatedGroup>
              <lg-button [flat]="true"
                         [disabled]="!selected['draft']?.size"
                         [size]="'small'"
                         [style]="'danger'"
                         (click)="deletedSelectedDrafts()">
                Delete selected
              </lg-button>
            </ng-template>
          }
        </lg-inline-separated-group>

        <lg-card-list [mode]="selectionZoneService.selectionMode()"
                      (onDeleteOne)="deleteDraft($event?.uuid)"
                      (onSelected)="selectionZoneService.putSelected($event)"
                      [selectAll]="selectionZoneService.selectAll()['draft']"
                      [deselectAll]="selectionZoneService.deselectAll()['draft']"
                      style="--card-bg: #bee5ff">
          @for (item of drafts(); track item.uuid) {
            <ng-template lgCardListItem [uuid]="item.uuid" type="draft">
              <lg-gap-row [center]="true">
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
              </lg-gap-row>
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
      this._notificationsService.success('Drafts deleted');
    })
  }

  deletedSelectedDrafts() {
    const selected = this.selectionZoneService.selected()['draft'];
    if (!selected) return;
    this._recipesRepository.removeDraftMany(Array.from(selected)).then(() => {
      this.drafts.update((drafts) => {
        return drafts.filter((item) => !selected.has(item.uuid));
      });
      this._notificationsService.success('Drafts deleted');
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
