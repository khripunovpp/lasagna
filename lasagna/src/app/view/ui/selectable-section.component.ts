import {Component, ContentChildren, effect, input, Optional, output, QueryList, SkipSelf} from '@angular/core';
import {CardListItemDirective} from '@view/ui/card/card-list-item.directive';
import {FormControl, ReactiveFormsModule} from '@angular/forms';
import {CheckboxComponent} from '@view/ui/form/chckbox.component';
import {ButtonComponent} from '@view/ui/layout/button.component';
import {MatIcon} from '@angular/material/icon';
import {SelectionZoneService} from '@service/services';
import {generateUuid} from '@helpers/attribute.helper';

@Component({
  selector: 'lg-selectable-section',
  standalone: true,
  template: `
    <section class="lg-selectable-section">
      @if (selectionZoneService.selectionMode() === 'selection') {
        <lg-checkbox [size]="'medium'"
                     [formControl]="selected"
                     [value]="key()"
                     (onCheckboxChanged)="onChanges($event)"></lg-checkbox>
      }
      <div class="lg-selectable-section__inner">
        <ng-content></ng-content>
      </div>
      @if (selectionZoneService.selectionMode() === 'selection') {
        <lg-button [style]="'danger'"
                   [size]="'tiny'"
                   [icon]="true"
                   (click)="selectionZoneService.putDelete(key())">
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
  constructor(
    @Optional() @SkipSelf() public selectionZoneService: SelectionZoneService
  ) {
  }

  key = input<string>(generateUuid());
  @ContentChildren(CardListItemDirective) items!: QueryList<CardListItemDirective>;
  selected = new FormControl()

  effectMode = effect(() => {
    console.log('Selection mode changed', this.selectionZoneService.selectionMode());
    if (this.selectionZoneService.selectionMode()) {
      this.selected.reset();
    }
  });

  effectSelectAll = effect(() => {
    if (this.selectionZoneService.selectAll()) {
      this.selected.setValue(true);
    } else if (this.selectionZoneService.deselectAll()) {
      this.selected.setValue(false);
    }
  })

  onChanges(
    event: boolean | string | null | undefined
  ) {
    this.selectionZoneService.putSelected([!!event, this.key()]);
  }
}
