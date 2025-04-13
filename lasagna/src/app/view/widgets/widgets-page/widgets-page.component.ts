import {Component} from '@angular/core';
import {EggsWidgetComponent} from '../eggs-widget/eggs-widget.component';


import {ContainerComponent} from '../../ui/layout/container/container.component';
import {GapRowComponent} from '../../ui/layout/gap-row.component';
import {TitleComponent} from '../../ui/layout/title/title.component';
import {CardComponent} from '../../ui/card/card.component';

import {BarcodeSeekerWidgetComponent} from '../barcode-seeker/barcode-seeker.component';
import {FadeInComponent} from '../../ui/fade-in.component';

@Component({
  selector: 'lg-widgets-page',
  standalone: true,
  template: `
      <lg-fade-in>
          <lg-container>
              <lg-gap-row [center]="true">
                  <lg-title>
                      Widgets
                  </lg-title>
              </lg-gap-row>

              <lg-card>
                  <lg-barcode-add-product-widget></lg-barcode-add-product-widget>
              </lg-card>
              <lg-card>
                  <lg-eggs-widget></lg-eggs-widget>
              </lg-card>
              <!--          <lg-card>-->
              <!--              <lg-jelly-widget></lg-jelly-widget>-->
              <!--          </lg-card>-->
          </lg-container>
      </lg-fade-in>
  `,
  imports: [
    EggsWidgetComponent,
    ContainerComponent,
    GapRowComponent,
    TitleComponent,
    CardComponent,
    BarcodeSeekerWidgetComponent,
    FadeInComponent
  ]
})
export class WidgetsPageComponent {
}
