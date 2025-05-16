import {
  ChangeDetectionStrategy,
  Component,
  ContentChildren,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  QueryList,
  SimpleChanges,
  ViewEncapsulation
} from '@angular/core';

import {CardListItemDirective} from './card-list-item.directive';
import {NgTemplateOutlet} from '@angular/common';
import {CheckboxComponent} from '../form/chckbox.component';
import {FormArray, FormControl, FormGroup, FormsModule, ReactiveFormsModule} from '@angular/forms';

export interface CardListSelectionEvent {
  selected: boolean
  uuid: string
  type: string
}

@Component({
  selector: 'lg-card-list',
  standalone: true,
  imports: [
    NgTemplateOutlet,
    CheckboxComponent,
    FormsModule,
    ReactiveFormsModule
],
  template: `
      <section [formGroup]="selected" class="lg-card-list">
          <section class="lg-card-list__inner" formArrayName="items">
              @for (item of items;track item?.uuid;let i = $index, even = $even) {
                  <div class="lg-card-list__item"
                       [class.colored]="!even">
                      @if (mode === 'selection') {
                          <lg-checkbox [formControlName]="i"
                                       [value]="buildValueString(i, item)"
                                       (onCheckboxChanged)=" onChanges($event,i)"></lg-checkbox>
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
  `,
  styles: [
    `
      :host {
        display: flex;
        width: 100%;
      }


      .lg-card-list {
        overflow-x: auto;
      }

      .lg-checkbox {
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
        gap: 16px;
      }

      .lg-card-list__item {
        display: flex;
        align-items: center;
        padding: 16px;
        gap: 8px;
        background-color: #eed2f0;
        border-radius: 32px;
      }

      .lg-card-list__item__inner {
        flex: 1;
        padding: 0 8px;
      }

      .lg-card-list__item.colored {
        //background-color: #f6f6f6
      }

    `
  ],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CardListComponent
  implements OnChanges {

  constructor() {
  }

  @Input() mode: 'default' | 'selection' = 'default';
  @Input() selectAll = false;
  @Input() deselectAll = false;
  @Output() onSelected = new EventEmitter<CardListSelectionEvent>();
  @ContentChildren(CardListItemDirective) items!: QueryList<CardListItemDirective>;
  selected = new FormGroup({
    items: new FormArray([])
  });

  ngOnChanges(changes: SimpleChanges) {
    if (changes['selectAll']) {
      this.effectSelectAll();
    }

    if (changes['deselectAll']) {
      this.effectDeselectAll();
    }

    if (changes['mode']) {
      this.effectMode();
    }
  }

  buildValueString(
    index: number,
    item: CardListItemDirective,
  ) {
    return String(`${item?.type}-${index}-${item?.uuid}`);
  }

  effectMode = () => {
    const items = (this.selected.get('items') as FormArray);
    if (this.mode === 'selection') {
      items.clear();
      items.reset();
      this.items?.forEach((item, index) => {
        items.push(new FormControl(false));
      });
    }
  };
  effectSelectAll = () => {
    const items = (this.selected.get('items') as FormArray);
    if (this.selectAll) {
      items?.controls.forEach((item) => {
        item.setValue(true);
      });
    }
  };
  effectDeselectAll = () => {
    const items = (this.selected.get('items') as FormArray);
    if (this.deselectAll) {
      items?.controls.forEach((item) => {
        item.setValue(false);
      });
    }
  };

  onChanges(
    value: boolean | string,
    index: number
  ) {
    const item = this.items.toArray()?.[index];
    this.onSelected.emit({
      selected: !!value,
      uuid: item?.uuid ?? '',
      type: item?.type ?? ''
    });
  }
}
