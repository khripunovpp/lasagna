import {AfterViewInit, Component, effect, HostBinding, signal} from '@angular/core';

import {MatIcon} from '@angular/material/icon';
import {AutocompleteComponent} from '../../ui/form/autocomplete.component';
import {ReactiveFormsModule} from '@angular/forms';
import {MultiselectComponent} from '../../ui/form/multiselect.component';
import {TextareaComponent} from '../../ui/form/textarea.component';
import {GapColumnComponent} from '../../ui/layout/gap-column.component';
import {ButtonComponent} from '../../ui/layout/button.component';


import {GapRowComponent} from '../../ui/layout/gap-row.component';
import {TitleComponent} from '../../ui/layout/title/title.component';
import {RouterLink} from '@angular/router';
import {ControlsTableComponent} from '../../ui/controls-table/controls-table.component';

import {ControlsTableRowComponent} from '../../ui/controls-table/controls-table-row.component';
import {ControlsTableColumnDirective} from '../../ui/controls-table/controls-table-column.directive';
import {ControlsTableLastRowDirective} from '../../ui/controls-table/controls-table-last-row.directive';
import {CommonRecipeSectionComponent} from './common/common-recipe-section.component';

@Component({
  standalone: true,
  selector: 'lg-recipe-page',
  templateUrl: './recipe-page.component.html',
  styleUrls: ['./recipe-page.component.scss'],
  imports: [
    MatIcon,
    AutocompleteComponent,
    ReactiveFormsModule,
    MultiselectComponent,
    TextareaComponent,
    GapColumnComponent,
    ButtonComponent,
    GapRowComponent,
    TitleComponent,
    RouterLink,
    ControlsTableComponent,
    ControlsTableRowComponent,
    ControlsTableColumnDirective,
    ControlsTableLastRowDirective,
    CommonRecipeSectionComponent
  ],
})
export class RecipePageComponent
  implements AfterViewInit {
  constructor() {
  }

  @HostBinding('style.--left-column-width-percent') leftColumnWidthPercent = '0.05';

  collapse = signal(false);
  collapseEffect = effect(() => {
    this.leftColumnWidthPercent = this.collapse() ? '0.05' : '0.3';
  })
  recipes = signal<any>([
    {
      category: 'sfd', recipes: [{name: 'Lasagna', ingredients: ['Pasta', 'Cheese', 'Tomato Sauce']},
        {name: 'Pizza', ingredients: ['Dough', 'Tomato Sauce', 'Cheese']},
        {name: 'Salad', ingredients: ['Lettuce', 'Tomato', 'Cucumber']}]
    }
  ]);

  toggleCollapse() {
    this.collapse.update(value => !value);
  }

  ngAfterViewInit() {
    document.body.style.setProperty('--app-content-top-padding', '0px');
    document.body.style.setProperty('--app-content-bottom-padding', '0px');
  }
}
