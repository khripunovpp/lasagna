import {Component, computed, DestroyRef, inject, input, OnInit, signal} from '@angular/core';
import {ButtonComponent} from '../../../../shared/view/ui/button/button.component';
import {FlexRowComponent} from '../../../../shared/view/layout/flex-row.component';
import {MatIcon} from '@angular/material/icon';
import {CardListComponent} from '../../../../shared/view/ui/card/card-list.component';
import {CardListItemDirective} from '../../../../shared/view/ui/card/card-list-item.directive';
import {FadeInComponent} from '../../../../shared/view/ui/fade-in.component';
import {NotificationsService, SelectionZoneService} from '../../../../shared/service/services';
import {TranslatePipe} from '@ngx-translate/core';
import {ExpandDirective} from '../../../../shared/view/directives/expand.directive';
import {errorHandler} from '../../../../shared/helpers';
import {defer} from 'rxjs';
import {AsyncPipe} from '@angular/common';
import {FlexColumnComponent} from '../../../../shared/view/layout/flex-column.component';
import {IS_CLIENT} from '../../../../shared/service/tokens/isClient.token';
import {CategoryRepository, CategoryType} from '../../service/repositories/category.repository';
import {CategoryAddFormComponent} from './category-add-form.component';
import {SelectionToolsComponent} from '../../../controls/form/selection-tools.component';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';

@Component({
  selector: 'lg-category-list',
  standalone: true,
  template: `
    <lg-fade-in>
      <lg-flex-column [size]="'small'">
        <div class="text-small">{{ titleKey() | translate }}</div>
        @let cats = (categories() | async) ?? [];

        @if (cats.length) {
          <lg-selection-tools></lg-selection-tools>
        }

        <lg-card-list (onDeleteOne)="deleteCategoryByUuid($event.uuid)"
                      (onSelected)="selectionZoneService.putSelected($event)"
                      [deselectAll]="selectionZoneService.deselectAll()"
                      [mode]="selectionZoneService.selectionMode()"
                      [selectAll]="selectionZoneService.selectAll()"
                      style="--card-list-bg: var(--control-bg)">
          @for (category of cats; track category.uuid ?? i; let i = $index) {
            <ng-template [type]="type()" [uuid]="category.uuid" lgCardListItem>
              @if (editingUuid() === category.uuid) {
                <lg-category-add-form (onSaved)="stopEdit()"
                                      [type]="type()"
                                      [uuid]="category.uuid"
                                      style="--control-bg: white;"
                                      titleKey="categories.edit-hint"></lg-category-add-form>
              } @else {
                <lg-flex-row [center]="true">
                  <div (click)="startEdit(category.uuid)" lgExpand style="cursor: pointer;">
                    {{ category.name }}
                  </div>

                  <lg-button (click)="startEdit(category.uuid)"
                             [icon]="true"
                             [size]="'tiny'"
                             [style]="'warning'">
                    <mat-icon aria-hidden="false" aria-label="Edit"
                              fontIcon="edit"></mat-icon>
                  </lg-button>
                </lg-flex-row>
              }
            </ng-template>
          }
        </lg-card-list>
      </lg-flex-column>
    </lg-fade-in>
  `,
  imports: [
    FlexRowComponent,
    ButtonComponent,
    MatIcon,
    CardListComponent,
    CardListItemDirective,
    FadeInComponent,
    TranslatePipe,
    ExpandDirective,
    AsyncPipe,
    FlexColumnComponent,
    CategoryAddFormComponent,
    SelectionToolsComponent,
  ],
  providers: [
    SelectionZoneService,
  ],
  styles: [
    `:host {
      display: block;
    }`
  ],
})
export class CategoryListComponent implements OnInit {
  type = input.required<CategoryType>();
  titleKey = input.required<string>();
  editingUuid = signal<string | null>(null);
  readonly selectionZoneService = inject(SelectionZoneService);
  private readonly _categoryRepository = inject(CategoryRepository);
  readonly categories = computed(() => defer(() => this._categoryRepository.categories$(this.type())));
  private readonly _notificationsService = inject(NotificationsService);
  private readonly _isClient = inject(IS_CLIENT);
  private readonly _destroyRef = inject(DestroyRef);

  startEdit(uuid: string | undefined) {
    if (!uuid) return;
    this.editingUuid.set(uuid);
  }

  stopEdit() {
    this.editingUuid.set(null);
  }

  async deleteCategoryByUuid(uuid: string | undefined) {
    if (!uuid) return Promise.resolve();
    if (this.editingUuid() === uuid) {
      this.stopEdit();
    }
    try {
      await this._categoryRepository.deleteOne(uuid, this.type());
      this.loadCategory();
      this._notificationsService.success('categories.deleted');
    } catch (e) {
      this._notificationsService.error(errorHandler(e));
    }
  }

  ngOnInit() {
    if (!this._isClient) {
      return;
    }
    this.selectionZoneService.onDeleteSelected$
      .pipe(takeUntilDestroyed(this._destroyRef))
      .subscribe(items => this._deleteMany(items));

    this.loadCategory();
  }

  async loadCategory() {
    try {
      await this._categoryRepository.loadAll(this.type());
    } catch (e) {
      this._notificationsService.error(errorHandler(e));
    }
  }

  private async _deleteMany(items: any[]) {
    const uuids = (items ?? [])
      .map(item => item?.uuid as string | undefined)
      .filter((uuid): uuid is string => !!uuid);
    if (!uuids.length) return;
    try {
      for (const uuid of uuids) {
        if (this.editingUuid() === uuid) this.stopEdit();
        await this._categoryRepository.deleteOne(uuid, this.type());
      }
      await this.loadCategory();
      this._notificationsService.success('categories.deleted');
      this.selectionZoneService.onDeselectAll();
    } catch (e) {
      this._notificationsService.error(errorHandler(e));
    }
  }
}
