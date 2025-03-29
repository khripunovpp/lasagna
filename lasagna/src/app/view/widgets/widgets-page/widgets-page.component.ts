import {Component} from '@angular/core';
import {EggsWidgetComponent} from '../eggs-widget/eggs-widget.component';
import {ButtonComponent} from '../../ui/layout/button.component';
import {CardListComponent} from '../../ui/card/card-list.component';
import {ContainerComponent} from '../../ui/layout/container/container.component';
import {GapRowComponent} from '../../ui/layout/gap-row.component';
import {TitleComponent} from '../../ui/layout/title/title.component';
import {CardComponent} from '../../ui/card/card.component';

@Component({
  selector: 'lg-widgets-page',
  standalone: true,
  template: `
      <lg-container>
          <lg-gap-row [center]="true">
              <lg-title>
                  Widgets
              </lg-title>
          </lg-gap-row>

          <lg-card>
              <lg-eggs-widget></lg-eggs-widget>
          </lg-card>
      </lg-container>

  `,
  imports: [
    EggsWidgetComponent,
    ButtonComponent,
    CardListComponent,
    ContainerComponent,
    GapRowComponent,
    TitleComponent,
    CardComponent
  ]
})
export class WidgetsPageComponent {
}
