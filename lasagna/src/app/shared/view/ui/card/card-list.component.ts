import {Component, ContentChildren, effect, input, output, QueryList, ViewEncapsulation} from '@angular/core';

import {CardListItemDirective} from './card-list-item.directive';
import {NgClass, NgTemplateOutlet} from '@angular/common';
import {CheckboxComponent} from '../../../../features/controls/form/chckbox.component';
import {FormArray, FormControl, FormGroup, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {ButtonComponent} from '../layout/button.component';
import {MatIcon} from '@angular/material/icon';

@Component({
  selector: 'lg-card-list',
  standalone: true,
  imports: [
    NgTemplateOutlet,
    CheckboxComponent,
    FormsModule,
    ReactiveFormsModule,
    ButtonComponent,
    MatIcon,
    NgClass,
  ],
  template: `
    <section [formGroup]="selected" class="lg-card-list">
      <section class="lg-card-list__inner" formArrayName="items">
        @for (item of items; track (item?.uuid ?? '') + $index; let i = $index, even = $even) {
          <div class="lg-card-list__item"
               [class.colored]="!even">
            @if (mode() === 'selection') {
              <lg-checkbox [formControlName]="i"
                           [size]="'medium'"
                           [value]="buildValueString(i, item)"
                           (onCheckboxChanged)="onChanges($event,i)"></lg-checkbox>
            }
            <div [style.--card-list-bg]="item.bgColor"
              class="lg-card-list__item__inner">
              <ng-container [ngTemplateOutlet]="item.template"></ng-container>
            </div>
            @if (mode() === 'selection') {
              <lg-button [style]="'danger'"
                         [size]="'tiny'"
                         [icon]="true"
                         (click)="onDeleteOne.emit({uuid: item.uuid!, type: item.type})">
                <mat-icon aria-hidden="false"
                          fontIcon="close"></mat-icon>
              </lg-button>
            }
          </div>
        } @empty {
          <div style="padding:16px 24px;">No items found</div>
        }
      </section>
    </section>
  `,
  styles: [
    `
      :host {
        display: flex;
        width: 100%;
      }


      .lg-card-list {
      }

      .lg-checkbox {
        --control-bg: var(--card-list-checkbox-bg);
        --control-bg-selected: var(--card-list-checkbox-bg);
      }

      .lg-card-list__inner {
        display: flex;
        flex-direction: column;
        width: 100%;
        overflow: hidden;
        gap: 16px;
      }

      .lg-card-list__item {
        display: flex;
        gap: 8px;
        align-items: center;
      }

      .lg-card-list__item__inner {
        flex: 1;
        overflow-x: auto;
        display: flex;
        align-items: center;
        padding: 16px;
        gap: 8px;
        background-color: var(--card-list-bg);
        border-radius: 32px;
        white-space: nowrap;

        & > * {
          flex: 1;
        }
      }

      .lg-card-list__item.colored {
        //background-color: #f6f6f6
      }

    `
  ],
  encapsulation: ViewEncapsulation.None,
})
export class CardListComponent {

  constructor() {
  }

  mode = input<'default' | 'selection'>('default');
  selectAll = input<boolean>(false);
  deselectAll = input<boolean>(false);
  onSelected = output<[boolean, string]>();
  onDeleteOne = output<{
    uuid: string, type: string
  }>();
  @ContentChildren(CardListItemDirective) items!: QueryList<CardListItemDirective>;
  selected = new FormGroup({
    items: new FormArray([])
  });

  effectMode = effect(() => {
    const items = (this.selected.get('items') as FormArray);
    if (this.mode() === 'selection') {
      items.clear();
      items.reset();
      this.items?.forEach((item, index) => {
        items.push(new FormControl(false));
      });
    }
  });
  effectSelectAll = effect(() => {
    const items = (this.selected.get('items') as FormArray);
    if (this.selectAll()) {
      items?.controls.forEach((item) => {
        item.setValue(true);
      });
    }
  });
  effectDeselectAll = effect(() => {
    const items = (this.selected.get('items') as FormArray);
    if (this.deselectAll()) {
      items?.controls.forEach((item) => {
        item.setValue(false);
      });
    }
  });

  buildValueString(
    index: number,
    item: CardListItemDirective,
  ) {
    return String(`${item?.type}-${index}-${item?.uuid}`);
  }

  onChanges(
    value: boolean | string,
    index: number
  ) {
    const item = this.items.toArray()?.[index];
    this.onSelected.emit([value as boolean, item?.uuid || '']);
  }
}
