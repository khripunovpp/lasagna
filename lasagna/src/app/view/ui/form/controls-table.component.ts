import {Component, ContentChildren, effect, Injector, input, output, QueryList, ViewEncapsulation} from '@angular/core';

import {FormArray, FormControl, FormGroup, ReactiveFormsModule} from '@angular/forms';
import {CheckboxComponent} from './chckbox.component';
import {NgTemplateOutlet} from '@angular/common';
import {ControlsTableRowComponent} from './controls-table-row.component';

@Component({
  selector: 'lg-controls-table',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CheckboxComponent,
    NgTemplateOutlet
],
  template: `
      <section [formGroup]="selected" class="lg-controls-table">
          <div class="lg-controls-table__header">
              @for (column of items.first.columns;track $index;let i = $index) {
                  <div [style.flex-basis.%]="column.width"
                       [style.justify-content]="column.align === 'start' ? 'flex-start' : column.align === 'center' ? 'center' : 'flex-end'">
                      {{ column.label }}
                  </div>
              }
          </div>
          <section class="lg-controls-table__inner" formArrayName="items">
              @for (item of items;track $index;let i = $index, even = $even) {
                  <div class="lg-controls-table__item"
                       [class.colored]="!even">
                      @if (mode() === 'selection') {
                          <lg-checkbox [formControlName]="i"
                                       (onCheckboxChanged)="onChanges($event,i)"></lg-checkbox>
                      }
                      <div class="lg-controls-table__item__inner">
                          <ng-container [ngTemplateOutlet]="item.template"
                                        [ngTemplateOutletContext]="{ $implicit: item,cols:columns()}"
                          ></ng-container>
                      </div>
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


      .lg-controls-table {
        overflow-x: auto;
        border-radius: 32px;
        background-color: #FBFBFB;
      }


      .lg-checkbox {
        --control-bg: #abc2ff;
        --control-bg-selected: #abc2ff;
      }

      .lg-controls-table__inner {
        display: flex;
        flex-direction: column;
        min-width: fit-content;
        width: 100%;
        overflow: hidden;
        white-space: nowrap;
        padding: 16px 0;
        border-radius: 16px;
        background-color: #F6F6F6;
        gap: 16px;
      }

      .lg-controls-table__item {
        display: flex;
        align-items: center;
        gap: 8px;
        font-size: 18px;
      }

      .lg-controls-table__item__inner {
        flex: 1;
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0 24px;

        a {
          text-decoration: none;
          &:hover {
            text-decoration: underline;
          }
        }
      }

      .lg-controls-table__item.colored {
        //background-color: #f6f6f6
      }

      .lg-controls-table__header {
        display: flex;
        padding: 24px 24px 16px;
        justify-content: space-between;
        font-size: 13px;
        color: #6B6B6B;
        font-weight: 500;
      }

      .lg-controls-table__header div {
        flex: 1;
        display: flex;
      }
    `
  ],
  encapsulation: ViewEncapsulation.None,
})
export class ControlsTableComponent {
  constructor(
    public injector: Injector,
  ) {
  }


  mode = input<'default' | 'selection'>('default');
  selectAll = input<boolean>(false);
  deselectAll = input<boolean>(false);
  columns = input<[string, number][]>([]);
  onSelected = output<[boolean, string]>();
  @ContentChildren(ControlsTableRowComponent) items!: QueryList<ControlsTableRowComponent>;
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

  ngAfterContentInit() {
    console.log('items', this.items);
  }

  onChanges(
    value: boolean,
    index: number
  ) {
    this.onSelected.emit([value, this.items.toArray()?.[index]?.uuid ?? '']);
  }
}
