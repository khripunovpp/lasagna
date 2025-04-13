import {Component, ContentChildren, effect, input, output, QueryList, ViewEncapsulation} from '@angular/core';
import {CardComponent} from './card.component';
import {CardListItemDirective} from './card-list-item.directive';
import {NgTemplateOutlet} from '@angular/common';
import {CheckboxComponent} from '../form/chckbox.component';
import {FormArray, FormControl, FormGroup, FormsModule, ReactiveFormsModule} from '@angular/forms';

@Component({
  selector: 'lg-card-list',
  standalone: true,
  imports: [
    CardComponent,
    NgTemplateOutlet,
    CheckboxComponent,
    FormsModule,
    ReactiveFormsModule,
  ],
  template: `
      <lg-card [flat]="true">
          <section [formGroup]="selected" class="lg-card-list">
              <section class="lg-card-list__inner" formArrayName="items">
                  @for (item of items;track $index;let i = $index, even = $even) {
                      <div class="lg-card-list__item"
                           [class.colored]="!even">
                          @if (mode() === 'selection') {
                              <lg-checkbox [formControlName]="i"
                                           (onCheckboxChanged)="onChanges($event,i)"></lg-checkbox>
                          }
                          <div class="lg-card-list__item__inner">
                              <ng-container [ngTemplateOutlet]="item.template"></ng-container>
                          </div>
                      </div>
                  } @empty {
                      <div style="padding:16px 24px;">No items found</div>
                  }
              </section>
          </section>
      </lg-card>
  `,
  styles: [
    `
      :host {
        display: flex;
        width: 100%;
      }


      .lg-card-list {
        overflow-x: auto;
        --control-bg: #abc2ff;
        --control-bg-selected: #abc2ff;
      }

      .lg-card-list__inner {
        display: flex;
        flex-direction: column;
        min-width: fit-content;
        width: 100%;
        overflow: hidden;
        white-space: nowrap;
      }

      .lg-card-list__item {
        display: flex;
        align-items: center;
        padding: 16px;
        gap: 8px;
      }

      .lg-card-list__item__inner {
        flex: 1;
        padding: 0 8px;
      }

      .lg-card-list__item.colored {
        background-color: #f6f6f6
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

  onChanges(
    value: boolean,
    index: number
  ) {
    this.onSelected.emit([value, this.items.toArray()?.[index]?.uuid() ?? '']);
  }
}
