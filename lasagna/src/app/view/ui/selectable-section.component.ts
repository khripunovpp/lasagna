import {Component, ContentChildren, effect, input, output, QueryList} from '@angular/core';
import {CardListItemDirective} from '@view/ui/card/card-list-item.directive';
import {FormControl, ReactiveFormsModule} from '@angular/forms';
import {CheckboxComponent} from '@view/ui/form/chckbox.component';
import {ButtonComponent} from '@view/ui/layout/button.component';
import {MatIcon} from '@angular/material/icon';

@Component({
  selector: 'lg-selectable-section',
  standalone: true,
  template: `
    <section class="lg-selectable-section">
      @if (mode() === 'selection') {
        <lg-checkbox [size]="'medium'"
                     [formControl]="selected"
                     [value]="selectionValue()"
                     (onCheckboxChanged)=" onChanges(selectionValue())"></lg-checkbox>
      }
      <div class="lg-selectable-section__inner">
        <ng-content></ng-content>
      </div>
      @if (mode() === 'selection') {
        <lg-button [style]="'danger'"
                   [size]="'tiny'"
                   [icon]="true"
                   (click)="onDeleteOne.emit(selectionValue())">
          <mat-icon aria-hidden="false"
                    fontIcon="close"></mat-icon>
        </lg-button>
      }
    </section>
  `,
  styles: [
    `

      .lg-card-list {
      }

      .lg-checkbox {
        --control-bg: #abc2ff;
        --control-bg-selected: #abc2ff;
      }

      .lg-selectable-section {
        display: flex;
        gap: 8px;
        align-items: center;
      }

    `
  ],
  imports: [
    ReactiveFormsModule,
    CheckboxComponent,
    ButtonComponent,
    MatIcon
  ]
})
export class SelectableSectionComponent {

  mode = input<'default' | 'selection'>('default');
  selectionValue = input<string>('');
  onSelected = output<string>();
  onDeleteOne = output<string>();
  @ContentChildren(CardListItemDirective) items!: QueryList<CardListItemDirective>;
  selected = new FormControl()

  effectMode = effect(() => {
    if (this.mode() === 'selection') {
      this.selected.reset();
    }
  });

  buildValueString(
    index: number,
    item: CardListItemDirective,
  ) {
    return String(`${item?.type}-${index}-${item?.uuid}`);
  }

  onChanges(
    value: string,
  ) {
    this.onSelected.emit(value as string);
  }
}
